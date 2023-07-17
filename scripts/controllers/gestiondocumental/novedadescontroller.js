'use strict';
   angular.module('GenesisApp')
   .controller('novedadescontroller',['$scope','consultaHTTP','afiliacionHttp','notification','$timeout','$rootScope','$http','$window','$filter','ngDialog','cfpLoadingBar',
   function($scope,consultaHTTP,afiliacionHttp,notification,$timeout,$rootScope,$http,$window,$filter,ngDialog,cfpLoadingBar) {
      $scope.type = "SELECCIONAR";
      $scope.paneldatos = false;
      $scope.busqueda = false;
      $scope.btnreactivar = false;
      $scope.panelanexos = false;
      $scope.btnFinalizar = true;
      $scope.adjuntoid = false;
      $scope.adjuntosisben = false;
      $scope.adjuntofuar = false;
      $scope.datos = false;
      $scope.dsbestado = true;
      $scope.panelopciones = false;
      //$scope.new = {tipo_documento : '0', sexo : '0'};
      $scope.obtenerDocumento = function () {
         consultaHTTP.obtenerDocumento().then(function (response) {
            $scope.Documentos = response;
         })
      }
      $scope.obtenerGrupoPoblacional = function(){
         $http({    
            method:'POST',    
            url:"php/aseguramiento/Rafiliacion.php",    
            data: {function:'obteneragrupoPoblacional'}  
         }).then(function(response){    
            $scope.Gpoblacional = response.data;  
         });
      }
      $scope.obtenerZona = function () {
         afiliacionHttp.obtenerZona().then(function (response) {
            $scope.Zonas = response;
         })
      }
      $scope.obtenerMunicipios = function(){
         $scope.function = 'cargamunicipios';
         $http({
            method:'POST',
            url:"php/novedades/funcnovedades.php",
            data: {function:$scope.function}
         }).then(function(response){
            $scope.Municipios = response.data;
         });
      }
      $scope.obtenerEscenarios = function(){
         $http({
            method:'POST',
            url:"php/novedades/funcnovedades.php",
            data: {function:'obtenerescenarios',ubicacion:$scope.new.MUNICIPIO}
         }).then(function(response){
            $scope.Escenarios = response.data;
            if ($scope.municipioactual == $scope.new.MUNICIPIO) {
               $scope.dsbescenario = true;
               $scope.new.ESCENARIO = $scope.escenarioactual;
            }else{
               $scope.dsbescenario = false;
               $scope.new.ESCENARIO = $scope.Escenarios[0].CODIGO;
            }
         });
      }
      $scope.solobusqueda = function(){
         $scope.paneldatos = false;
         $scope.panelcomplementarios = false;
         $scope.panelanexos = false;
         $scope.panelopciones = false;
      }
      $scope.habilall = function(){
         $scope.dsbnombres = false;
         $scope.dsbsexo = false;
         $scope.dsbmunicipio = false;
         $scope.dsbescenario = false;
         $scope.dsbnacimiento = false;
         $scope.dsbid = false;
         $scope.dsbsisben = false;
      }
      $scope.dsball = function(){
         $scope.dsbnombres = true;
         $scope.dsbsexo = true;
         $scope.dsbmunicipio = true;
         $scope.dsbescenario = true;
         $scope.dsbnacimiento = true;
         $scope.dsbid = true;
         $scope.dsbsisben = true;
      }
      $scope.busquedaAfiliado = function(){
         if ($scope.type == "SELECCIONAR") {
            notification.getNotification('info','Seleccione tipo de documento','Notificacion');
         }else if ($scope.id === undefined || $scope.id == "") {
            notification.getNotification('error','Ingrese número de identificación','Notificacion');
         }else{
            $scope.new = {};
            $http({
               method:'POST',
               url:"php/novedades/funcnovedades.php",
               data: {function:'buscaafiliado',type:$scope.type,id:$scope.id}
            }).then(function(res){
               if (res.data.MENSAJE == 1) {
                  $scope.btncancelar = false;
                  $scope.paneldatos = true;
                  $scope.panelcomplementarios = true;
                  $scope.panelanexos = false;
                  $scope.panelopciones = true;
                  $scope.new = res.data;
                  $scope.municipioactual = $scope.new.MUNICIPIO;
                  $scope.escenarioactual = $scope.new.ESCENARIO;
                  $scope.obtenerEscenarios();
                  var parts = $scope.new.NACIMIENTO.split('-');
                  var fecha_nacimiento =  new Date(parts[1]+'-'+parts[0]+'-'+parts[2]);
                  $scope.new.NACIMIENTO = fecha_nacimiento;
                  if ($scope.new.REG == 'V') {
                     if ($scope.new.TIPODOCUMENTO == "TI" || $scope.new.DOCUMENTO == "RC") {
                        $scope.habilall();
                     }else{
                        $scope.habilall();
                        $scope.dsbid = true;
                        $scope.dsbnombres = true;
                        $scope.dsbsexo = true;
                        $scope.dsbnacimiento = true;
                     }
                  }else{
                     $scope.habilall();
                  }
               }else{
                  notification.getNotification('info',res.data.MENSAJE,'Notificación');
                  $scope.paneldatos = false;
                  $scope.panelcomplementarios = false;
                  $scope.panelanexos = false;
                  $scope.panelopciones = false;
               }
               if ($scope.new.ESTADO == 'RE' || $scope.new.ESTADO == 'AF') {
                  $scope.btnreactivar = true;
                  $scope.btncancelar = true;
                  $scope.btncambiodir = true;
                  $scope.btnretiro = true;
                  $scope.btnguardarcambios = true;
                  $scope.alldata = true;
               }else{
                  $scope.btnreactivar = false;
                  $scope.btncancelar = false;
                  $scope.btncambiodir = false;
                  $scope.btnretiro = false;
                  $scope.btnguardarcambios = false;
                  $scope.alldata = false;
               }
            })
         }
      }
      $rootScope.$on('ngDialog.closed', function (e, $dialog) {
         if ($scope.activa == 1 ) {
            $scope.activa = 0;
            $scope.busquedaAfiliado();
         }
      });
      $scope.activar = function(){
         $scope.activa = 1;
         ngDialog.open({
            template: 'views/novedades/causalingreso.html',
            className: 'ngdialog-theme-plain',
            controller: 'reactivacontroller',
            scope: $scope
         });
      }
      $scope.validasisben = function(){
         if ($scope.new.NIVELSISBEN > 2)  {
            $scope.new.NIVELSISBEN = "";
         }
      }
      $scope.validadocs = function(){
         //console.log($scope.new);
         if ($scope.new.PRIMERNOMBRE == "" || $scope.new.PRIMERAPELLIDO == "" || $scope.new.DOCUMENTO == "") {
            notification.getNotification('info','Verificar los datos','Notificación');
         }else{
            $scope.new.F_NACIMIENTO = $filter('date')(new Date($scope.new.NACIMIENTO), 'dd/MM/yyyy');
            $scope.petvalida();            
         }
      }
      $scope.petvalida = function(){
         $http({
            method:'POST',
            url:"php/novedades/funcnovedades.php",
            data: {
               function:'validadocs',
               type:$scope.type,
               id:$scope.id,
               p_nombre:$scope.new.PRIMERNOMBRE,
               s_nombre:$scope.new.SEGUNDONOMBRE,
               p_apellido:$scope.new.PRIMERAPELLIDO,
               s_apellido:$scope.new.SEGUNDOAPELLIDO,
               sexo:$scope.new.SEXO,
               municipio:$scope.new.MUNICIPIO,
               escenario:$scope.new.ESCENARIO,
               f_nacimiento:$scope.new.F_NACIMIENTO,
               estado:$scope.new.ESTADO,
               t_documento:$scope.new.TIPODOCUMENTO,
               n_documento:$scope.new.DOCUMENTO,
               ficha_sisben:$scope.new.FICHASISBEN,
               n_sisben:$scope.new.NIVELSISBEN,
               discapacidad:$scope.new.DISCAPACIDAD,
               gpoblacional:$scope.new.GPOBLACIONAL,
               zona:$scope.new.ZONA,
               causal:'N',
               reactiva:'N'
            }
         }).then(function(res){
            if (res.data.ID == false && res.data.SISBEN == false && res.data.FUAR == false && res.data.SISBENAVAL == false && res.data.CERTMEDICO == false){
               if (res.data.CAMBIO == true) {
                  $scope.guardacambiosIA();
               }else{
                  $scope.panelanexos = false;
                  notification.getNotification('info','No se han hecho cambios','Notificación');
               }
            }else{
               $scope.adjuntoid = res.data.ID;
               $scope.adjuntosisben = res.data.SISBEN;
               $scope.adjuntofuar = res.data.FUAR;
               $scope.adjuntosisbenaval = res.data.SISBENAVAL;
               $scope.adjuntocertmedico = res.data.CERTMEDICO;
               $scope.adjuntoafilreg = false;
               $scope.adjuntocertdefuncion = false;
               $scope.panelopciones = false;
               $scope.panelanexos = true;
               $scope.habilitafin();
            }
         })
      }
      $scope.habilitafin = function(){
         if (($("#docid")[0].value == "" && $scope.adjuntoid == true) ||($("#docsisben")[0].value == "" && $scope.adjuntosisben == true) ) {
            $scope.btnFinalizar = true;
         }else{
            $scope.btnFinalizar = false;
         }
      }
      $scope.cambiardir = function(){
         $scope.nombre_afiliado = $scope.new.PRIMERNOMBRE + ' ' + $scope.new.PRIMERAPELLIDO;
         $scope.tipo_documento = $scope.new.TIPODOCUMENTO;
         $scope.documento = $scope.new.DOCUMENTO;
         ngDialog.open({
            template: 'views/consultaAfiliados/modaleditardatos.html',
            className: 'ngdialog-theme-plain',
            controller: 'editardatosctrl',
            scope: $scope
         });
      }

      $scope.guardacambiosIA = function(){
         $scope.nombre_afiliado = $scope.new.PRIMERNOMBRE + ' ' + $scope.new.PRIMERAPELLIDO;
         $scope.tipo_documento = $scope.new.TIPODOCUMENTO;
         $scope.documento = $scope.new.DOCUMENTO;
         $scope.new.F_NACIMIENTO = $filter('date')(new Date($scope.new.NACIMIENTO), 'dd/MM/yyyy');
         if ($scope.dsbescenario == false) {
            var modaldir = ngDialog.open({
               template: 'views/consultaAfiliados/modaleditardatos.html',
               className: 'ngdialog-theme-plain',
               controller: 'editardatosctrl',
               closeByEscape: false,
               closeByDocument: false,
               scope: $scope
            });
            modaldir.closePromise.then(function(data) {
               $scope.new.DIRECCION = data.value;
               $scope.petguarda();
            });
         }else{
            //$scope.new.DIRECCION = '0';
            $scope.petguarda();
         }
      }
      $scope.retirarafil = function(){
         swal({
            title: 'Seleccionar Motivo',
            input: 'select',
            inputOptions: {
               'RDC': 'Retiro de Afiliado Docente o Magisterio',
               'RFM': 'Retiro de Afiliado Fuerza Militares',
               'N09': 'Retiro por Muerte'
            },
            inputPlaceholder: 'SELECCIONAR',
            showCancelButton: true
         }).then(function (result) {
            $scope.motivoretiro = result;
            $scope.adjuntoafilreg = false;
            $scope.adjuntodefuncion = false;
            if (result == 'RDC') {
               $scope.adjuntoafilreg = true;
               $scope.adjuntocertdefuncion = false;
            } else if (result == 'RFM') {
               $scope.adjuntoafilreg = true;
               $scope.adjuntocertdefuncion = false;
            }else if(result == 'N09'){
               $scope.adjuntocertdefuncion = true;
               $scope.adjuntoafilreg = false;
            }         
            $timeout(function () {
               $scope.isretiro();
            }, 500);
         })
      }
      $scope.isretiro = function() {
         $scope.panelanexos = true;
         $scope.panelopciones = false;
      }
      $scope.petguarda = function(){
         $http({
            method:'POST',
            url:"php/novedades/funcnovedades.php",
            data: {function:'guardacambiosIA',
                  type:$scope.type,
                  id:$scope.id,
                  p_nombre:$scope.new.PRIMERNOMBRE,
                  s_nombre:$scope.new.SEGUNDONOMBRE,
                  p_apellido:$scope.new.PRIMERAPELLIDO,
                  s_apellido:$scope.new.SEGUNDOAPELLIDO,
                  sexo:$scope.new.SEXO,
                  municipio:$scope.new.MUNICIPIO,
                  escenario:$scope.new.ESCENARIO,
                  f_nacimiento:$scope.new.F_NACIMIENTO,
                  estado:$scope.new.ESTADO,
                  t_documento:$scope.new.TIPODOCUMENTO,
                  n_documento:$scope.new.DOCUMENTO,
                  ficha_sisben:$scope.new.FICHASISBEN,
                  n_sisben:$scope.new.NIVELSISBEN,
                  direccion:$scope.new.DIRECCION,
                  discapacidad:$scope.new.DISCAPACIDAD,
                  gpoblacional:$scope.new.GPOBLACIONAL,
                  zona:$scope.new.ZONA,
                  causal:'N',
                  reactiva:'N'
                  }
         }).then(function(res){
            if (res.data.MENSAJE == '1') {
               notification.getNotification('success','Cambios realizados correctamente','Notificación');
               $window.open('views/consultaafiliados/soportes/fuar.php?tipo='+$scope.new.TIPODOCUMENTO   
                                                                        +'&id='+$scope.new.DOCUMENTO
                                                                        +'&ori=N','_blank', "width=1080,height=1100");
               $scope.new = {};
               $scope.busqueda = false;
               $scope.paneldatos = false;
               $scope.panelcomplementarios = false;
               $scope.panelanexos = false;
               $scope.panelopciones = false;
               $('#frmAnexos')[0].reset();
            }else{
               notification.getNotification('error',res.data,'Notificación');
            }
         })
      }
      $scope.subedocs = function(){
         var img = new FormData($("#frmAnexos")[0]);
         $.ajax({
            url: "php/novedades/uploadanexos.php",
            type: "POST",
            data: img,
            contentType: false,
            processData: false,
            dataType: 'json'
         }).done(function(data) {
            if (data.IDRES == 1 || data.SISBENRES == 1 || data.FUARRES == 1 || data.CERTMEDICORES == 1 || data.SISBENRES2 == 1) {
               $scope.guardacambiosIA();
            }else if (data.CERTAFILREG == 1 || data.CERTDEFUNCIONRES == 1) {
               $http({
                  method:'POST',
                  url:"php/novedades/funcnovedades.php",
                  data: {function:'retirarafil',
                        type:$scope.type,
                        id:$scope.id,
                        retiro:$scope.motivoretiro
                        }
               }).then(function(res){
                  if (res.data.MENSAJE == '1') {
                     notification.getNotification('success','Cambios realizados correctamente','Notificación');
                     $scope.new = {};
                     $scope.busquedaAfiliado();
                     $('#frmAnexos')[0].reset();
                  }else{
                     notification.getNotification('error',res.data,'Notificación');
                  }
               })
            }
         });
      }
   }
]);