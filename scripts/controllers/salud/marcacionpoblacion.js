'use strict';
angular.module('GenesisApp')
.controller('marcacioncontroller',['$scope','consultaHTTP','notification','cfpLoadingBar','$http',
   function($scope,consultaHTTP,notification,cfpLoadingBar,$http) {
      var vm = this;
      $scope.panelafiliados = false;
      $scope.titulo = false;
      $scope.btnReversa = false;
      $scope.btngeneratxt = "Aprobar";
      $scope.paneladjuntos = true;
      $scope.activedx = 'active';
      $scope.panelinfoadicional = false;
      $scope.disAprueba = false;
      $scope.disReversa = false;
      $scope.disRechaza = false;

      $('#tablaafiliados').on('click', 'tbody tr', function(event) {
         $(this).addClass('arr').siblings().removeClass('arr');
      });

      $scope.graficos = function (){
         $http({
            method:'POST',
            url:"php/salud/poblacionespecial/funcpoblacionesp.php",
            data: {function:'obtenercantidades'}
         }).then(function(response){
            $scope.Pendientes = response.data[0];
            $scope.Procesados = response.data[1];
            $scope.vergraficos();
         });
      }
      $scope.muestrDetalleAfil = function(type,id,fecha){
         $scope.type_afil = type;
         $scope.id_afil = id;
         $scope.fecha_afil = fecha;
         $scope.btnReversa = false;
         $http({
            method:'POST',
            url:"php/salud/poblacionespecial/funcpoblacionesp.php",
            data: {function:'detaafil',type:type,id:id,patologia:$scope.patologiaselecta}
         }).then(function(response){
            $scope.detaafil = response.data;
            
            if ($scope.detaafil.ea == "0" && $scope.detaafil.hc == "0"){
               $scope.disAprueba = true;
            }else{
               $scope.disAprueba = false;
            }
            
            if ($scope.detaafil.error == "0") {
               if (fecha != "31/12/2999" && $scope.listado != 'Activos') {
                  $scope.btnReversa = true;
               }else{
                  $scope.btnReversa = false;
               }
               $scope.paneldetaafil = true;
            }else{
               $scope.paneldetaafil = false;
            }
         });
         $http({
            method:'POST',
            url:"php/salud/poblacionespecial/funcpoblacionesp.php",
            data: {function:'dxanexos',type:type,id:id,patologia:$scope.patologiaselecta}
         }).then(function(response){
            $scope.Diagnosticos = response.data;
            $scope.panelinfoadicional = true;
            $scope.paneladjuntos = false; 
            $scope.paneldx = true;
            $scope.activead = 'none';
            $scope.activedx = 'active';
         });
         $http({
            method:'POST',
            url:"php/salud/poblacionespecial/funcpoblacionesp.php",
            data: {function:'docanexos',type:type,id:id}
         }).then(function(response){
            $scope.Anexos = response.data;
         });
      }
      $scope.verlistado = function(patologia,estado){
         $scope.busqueda = "";
         $scope.busquedaafil = "";
         $scope.patologia = "";
         $scope.paneldetaafil = false;
         $scope.paneladjuntos = false;
         $scope.detaafil = "";
         $scope.patologiaselecta = patologia;
         $scope.estadoselected = estado;
         $scope.panelinfoadicional = false;
         if (estado == "A") {
            $scope.listado = 'Activos'; 
            $scope.btnAprueba = true;
            $scope.btnReversa = false;
            $scope.btnRechazar = true;
         }else{
            $scope.listado='Procesados';
            $scope.btnAprueba = false;
            $scope.btnReversa = true;
            $scope.btnRechazar = false;
         }
         if (patologia == "EM") {$scope.patologia = 'Embarazo'}
         if (patologia == "CA") {$scope.patologia = 'Cancer'}
         if (patologia == "HA") {$scope.patologia = 'Hipertension Arterial'}
         if (patologia == "ER") {$scope.patologia = 'Enfermedad Renal'}
         if (patologia == "HF") {$scope.patologia = 'Hemofilia'}
         if (patologia == "AR") {$scope.patologia = 'Artritis'}
         if (patologia == "DM") {$scope.patologia = 'Diabetes'}
         if (patologia == "VH") {$scope.patologia = 'VIH'}
         if (patologia == "EH") {$scope.patologia = 'Enfermedad Huerfana'}
         if (patologia == "TB") {$scope.patologia = 'Tuberculosis'}
         if (patologia == "PS") {$scope.patologia = 'Psiquiatria'}
         if (patologia == "DN") {$scope.patologia = 'Desnutrición'}
         if (patologia == "TP") {$scope.patologia = 'Transplantes'}
         $http({
            method:'POST',
            url:"php/salud/poblacionespecial/funcpoblacionesp.php",
            data: {function:'obtenerafiliados',patologia:patologia,estado:estado}
         }).then(function(response){
            $scope.Afiliados = response.data;
            $scope.panelafiliados = true;
            $scope.total = $scope.Afiliados.length;
            $scope.titulo = true;
         });
      }
      $scope.marca = function(accion){
         $http({
            method:'POST',
            url:"php/salud/poblacionespecial/funcpoblacionesp.php",
            data: {function:'marcaafiliado',accion:accion,type:$scope.detaafil.tipo_documento,id:$scope.detaafil.documento,patologia:$scope.patologiaselecta}
         }).then(function(response){
            if (response.data == 1) {
               if (accion == 'X') {notification.getNotification('info', '¡Registro Actualizado!', 'Notificación')}
               if (accion == 'P') {notification.getNotification('success', '¡Afiliado Aprobado!', 'Notificación')}
               if (accion == 'A') {notification.getNotification('success', '¡Afiliado movido a revisión!', 'Notificación')}
               $scope.graficos();
               $scope.verlistado($scope.patologiaselecta,$scope.estadoselected);
            }
         });
      }
      $scope.veranexo = function(ruta){
            window.open(ruta, '_blank');
      }
      $scope.vergraficos = function(){
         vm.hc3 = angular.element('#pietotales').highcharts({
            chart: {
               type: 'column'
            },
            xAxis: {
               categories: ["EM","HA","CA","ER","HF","AR","DM","VH","EH","PS","TB","DN","TP"]
            },
            title: {
               text: 'Afiliados Procesados'
            },
            plotOptions: {
               series: {
                  cursor: 'pointer',
                  name: 'Patologías',
                  point: {
                     events: {
                        click: function () {
                           $scope.verlistado(this.category,'P');
                        }
                     }
                  }
               }
            },

            series: [{
                     dataLabels:{
                        enabled:true,
                        formatter: function(){
                             var val = this.y;
                             if (val > 0) {
                                 return val;
                             }
                             return '';
                         }
                     },
               data: [$scope.Procesados.EM,$scope.Procesados.HA,$scope.Procesados.CA,$scope.Procesados.ER,$scope.Procesados.HF,$scope.Procesados.AR,
               $scope.Procesados.DM,$scope.Procesados.VH,$scope.Procesados.EH,$scope.Procesados.PS,$scope.Procesados.TB,$scope.Procesados.DN,$scope.Procesados.TP]
            }]
         });

         vm.hc5 = angular.element('#piependientes').highcharts({
            chart: {
               type: 'pie',
               options3d: {
                  enabled: true,
                  alpha: 45,
                  beta: 0
               }
            },
            title: {
               text: 'Pendientes por Revisión'
            },
            tooltip: {
               pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
               pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  depth: 35
               }
            },
            series: [{
               type: 'pie',
               name: 'Pendientes',
               dataLabels:{
                  enabled:true,
                  formatter:function(){
                     if(this.y > 0)
                        return this.point.name;
                  }
               },
               data: [
                  {
                     name: 'Cancer',
                     y: $scope.Pendientes.CA,
                     events: {
                        click: function () {
                           $scope.verlistado('CA','A');
                           $scope.panelafiliados = true;
                        }            
                     }
                  },
                  {
                     name: 'VIH',
                     y: $scope.Pendientes.VH,
                     events: {
                        click: function () {
                           $scope.verlistado('VH','A');
                           $scope.panelafiliados = true;
                        }            
                     }
                  },
                  {
                     name: 'Hipertensos ',
                     y: $scope.Pendientes.HA,
                     selected: true,
                     events: {
                        click: function () {
                           $scope.verlistado('HA','A');
                           $scope.panelafiliados = true;
                        }            
                     }
                  },
                  {
                     name: 'Enfermedad renal crónica ',
                     y: $scope.Pendientes.ER,
                     events: {
                        click: function () {
                           $scope.verlistado('ER','A');
                           $scope.panelafiliados = true;
                        }            
                     }
                  },
                  {
                     name: 'Hemofílicos',
                     y: $scope.Pendientes.HF,
                     events: {
                        click: function () {
                           $scope.verlistado('HF','A');
                           $scope.panelafiliados = true;
                        }            
                     }
                  },
                  {
                     name: 'Artritis',
                     y: $scope.Pendientes.AR,
                     events: {
                        click: function () {
                           $scope.verlistado('AR','A');
                           $scope.panelafiliados = true;
                        }            
                     }
                  },
                  {
                     name: 'Diabetes',
                     y: $scope.Pendientes.DM,
                     events: {
                        click: function () {
                           $scope.verlistado('DM','A');
                           $scope.panelafiliados = true;
                        }            
                     }
                  },
                  {
                     name: 'Enfermedad Huerfana',
                     y: $scope.Pendientes.EH,
                     events: {
                        click: function () {
                           $scope.verlistado('EH','A');
                           $scope.panelafiliados = true;
                        }            
                     }
                  },
                  {
                     name: 'Tuberculosis',
                     y: $scope.Pendientes.TB,
                     events: {
                        click: function () {
                           $scope.verlistado('TB','A');
                           $scope.panelafiliados = true;
                        }            
                     }
                  },
                  {
                     name: 'Psiquiatria',
                     y: $scope.Pendientes.PS,
                     events: {
                        click: function () {
                           $scope.verlistado('PS','A');
                           $scope.panelafiliados = true;
                        }            
                     }
                  },
                  {
                     name: 'Desnutrición',
                     y: $scope.Pendientes.DN,
                     events: {
                        click: function () {
                           $scope.verlistado('DN','A');
                           $scope.panelafiliados = true;
                        }            
                     }
                  },
                  {
                     name: 'Transplantes',
                     y: $scope.Pendientes.TP,
                     events: {
                        click: function () {
                           $scope.verlistado('TP','A');
                           $scope.panelafiliados = true;
                        }            
                     }
                  },
                  {
                     name: 'Embarazo',
                     y: $scope.Pendientes.EM,
                     events: {
                        click: function () {
                           $scope.verlistado('EM','A');
                           $scope.panelafiliados = true;
                        }            
                     }
                  }
               ]
            }]
         });
      }
      $scope.filtrar = function(){
         cfpLoadingBar.start();
         $scope.busqueda = $scope.busquedaafil;
         cfpLoadingBar.complete();
      }
      $scope.cargapatologias = function(){
         $http({
            method:'POST',
            url:"php/salud/poblacionespecial/funcpoblacionesp.php",
            data: {function:'cargapatologias'}
         }).then(function(response){
            $scope.Patologias = response.data;
         });
      }
      $scope.filtrardxnoas = function(){
         if ($scope.patologiadx === undefined) {
            notification.getNotification('info', 'Seleccione patología', 'Notificación');
         }else{
            $http({
               method:'POST',
               url:"php/salud/poblacionespecial/funcpoblacionesp.php",
               data: {function:'cargadxs',patologia:$scope.patologiadx,list:'2',keyword:$scope.busquedanoas}
            }).then(function(response){
               $scope.DiagnosticosNoAs = response.data;
            });
         }
      }
      $scope.cargadxs = function(patologia){
         $scope.patologiadx = patologia;
         $http({
            method:'POST',
            url:"php/salud/poblacionespecial/funcpoblacionesp.php",
            data: {function:'cargadxs',patologia:patologia,list:'1',keyword:'//'}
         }).then(function(response){
            $scope.DiagnosticosAs = response.data;
         });
      }
      $scope.eliminadx = function(dx){
         $http({
            method:'POST',
            url:"php/salud/poblacionespecial/funcpoblacionesp.php",
            data: {function:'eliminadx',patologia:$scope.patologiadx,dx:dx}
         }).then(function(response){
            if (response.data == 1) {
               notification.getNotification('success', 'Diagnostivo removido', 'Notificación');
               $scope.cargadxs($scope.patologiadx);
            }
         });
      }
      $scope.agregadx = function(dx){
         $http({
            method:'POST',
            url:"php/salud/poblacionespecial/funcpoblacionesp.php",
            data: {function:'agregadx',patologia:$scope.patologiadx,dx:dx}
         }).then(function(response){
            if (response.data == 1) {
               notification.getNotification('success', 'Diagnostivo agregado', 'Notificación');
               $scope.cargadxs($scope.patologiadx);
            }
         });
      }
      $scope.creapatologia = function(){
         if (($scope.codigo_patologia == "" || $scope.codigo_patologia === undefined) || ($scope.nombre_patologia == "" || $scope.nombre_patologia === undefined)) {
            notification.getNotification('info', 'Digite los campos requeridos', 'Notificación');
         }else{
            $http({
               method:'POST',
               url:"php/salud/poblacionespecial/funcpoblacionesp.php",
               data: {function:'creapatologia',codigo:$scope.codigo_patologia,nombre:$scope.nombre_patologia}
            }).then(function(response){
               if (response.data == 1) {
                  notification.getNotification('success', 'Patología agregada', 'Notificación');
                  $scope.cargapatologias();
               }else{
                  notification.getNotification('error', 'Error creando patología', 'Notificación');
               }
            });
         }
      }
      $scope.eliminapatologia = function(codigo){
         $http({
            method:'POST',
            url:"php/salud/poblacionespecial/funcpoblacionesp.php",
            data: {function:'eliminapatologia',patologia:codigo}
         }).then(function(response){
            if (response.data == 1) {
               notification.getNotification('success', 'Patología Eliminada', 'Notificación');
               $scope.cargapatologias();
            }
         });
      }
      $scope.tipodocs = function(){
         $http({
            method:'POST',
            url:"php/salud/poblacionespecial/funcpoblacionesp.php",
            data: {function:'obtenertipodocs'}
         }).then(function(response){
            $scope.Documentos = response.data;
         });
      }
      $scope.subeanexos = function(){
         var img = new FormData($("#anexos_cac")[0]);
         $.ajax({
            url: "php/salud/uploadanexos.php",
            type: "POST",
            data: img,
            contentType: false,
            processData: false,
            dataType: 'json'
         }).done(function(response) {
            if (response == "1") {
               notification.getNotification('success', 'Archivo cargado', 'Notificación');
               $('#anexos_cac')[0].reset();
               $scope.muestrDetalleAfil($scope.type_afil,$scope.id_afil,$scope.fecha_afil);
            }else{
               notification.getNotification('success', 'Error cargando anexo', 'Notificación');
            }
         });
      }
   }
]);