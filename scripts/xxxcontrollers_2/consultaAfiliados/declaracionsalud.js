'use strict';
   angular.module('GenesisApp')
   .controller('declaracionsaludctrl',['$scope','consultaHTTP','notification','$timeout','$rootScope','$http','$window',
   function($scope,consultaHTTP,notification,$timeout,$rootScope,$http,$window) {
      //
      $scope.panelpreguntas = false;
      $scope.select = {};


      $scope.Obtener_Tipos_Documentos = function () {
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Tipos_Documentos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
$scope.Obtener_Tipos_Documentos();


      $scope.busquedaAfiliado = function(tipo,numero){
         if ($scope.type == "0" || $scope.type === null) {
            notification.getNotification('info','Seleccione tipo de documento','Notificación');
         }else if ($scope.id === undefined || $scope.id == "") {
            notification.getNotification('info','Ingrese número de identificación','Notificación');
         }else{
            $scope.panelnucleo = false;
            $scope.panelpreguntas = false;
            $http({
               method:'POST',
               url:"php/consultaAfiliados/funcdeclaracion.php",
               data: {function:'carganucleo',type:$scope.type,
                                             id:$scope.id}
            }).then(function(response){
               if (response.data.length == "0") {
                  notification.getNotification('info','No se encontro afiliado','Notificación');
               }else{
                  $scope.afildata = response.data;
                  $scope.panelnucleo = true;
               }
            });
         }
      }

      $http({
         method:'POST',
         url:"php/consultaAfiliados/funcdeclaracion.php",
         data: {function:'cargapreguntas'}
      }).then(function(response){
         $scope.Preguntas = response.data;
      });
      if ($scope.afiliacion == "" || $scope.afiliacion === undefined) {
         $scope.panelbusqueda = true;
         $scope.type = '0';
      }else{
         $scope.panelbusqueda = false;
         $scope.type = $scope.param.type;
         $scope.id = $scope.param.id;
         $scope.busquedaAfiliado();
      }
      
      $scope.showEncuesta = function(tipodoc,numdoc,nombreafil){
         $scope.select.tipo_documento = tipodoc;
         $scope.select.documento = numdoc;
         $scope.select.nombre_afiliado = nombreafil;
         $scope.panelnucleo = false;
         $scope.optcambiar = true;
         $scope.panelpreguntas = true;
      }
      $scope.cambiarAfil = function(){
         $scope.panelnucleo = true;
         $scope.panelpreguntas = false;
      }
      $scope.imprimeEncuesta = function(){
         $window.open('views/formularios/encuesta.php?tipo='+$scope.type+'&id='+$scope.id, '_blank', "width=1080,height=1100");
      }
      $scope.enviarEncuesta = function(){
         var valres;
         swal({
            title: 'Confirmar',
            text: "Se guardara encuesta en la base de datos",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3ADF00',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
         }).then(function () {
            var frm = document.getElementById("preguntasdeclaracion");
            var cant = 0;
            for (var i = 1 ; i <= frm.length; i++) {
               var e = document.getElementById("resp"+i).checked;
               if (e === true) {e='S'}else{e='N'}
               $http({
                  method:'POST',
                  url:"php/consultaAfiliados/funcdeclaracion.php",
                  data: {function:'enviarenglon',tipo_doc:$scope.select.tipo_documento,
                                                documento:$scope.select.documento,
                                                renglon:i,
                                                respuesta:e,}
               }).then(function(response){
                  if (response.data == "1") {       
                     if (valres != "NA") {
                        notification.getNotification('success','Información registrada exitosamente!','Notificacion');
                        $scope.busquedaAfiliado();
                        $scope.panelnucleo = true;
                        $scope.panelpreguntas = false;
                        valres = "NA";
                        document.getElementById("preguntasdeclaracion").reset();
                     }
                  }else{
					  if (valres != "NA") {
                        notification.getNotification('error','Declaración de salud ya fue generada','Error');
                        valres = "NA";
                     }
				  }
               });
            }
         })
      }
   }
]);