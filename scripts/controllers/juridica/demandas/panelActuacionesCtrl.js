'use strict';
angular.module('GenesisApp')
   .controller('panelactuacionesctrl', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar',
      function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar) {
         $scope.msjtable = true;
         $scope.descargafile = function (ruta, caso, tipo) {
            switch (caso) {
               case 1:
                  $http({
                     method: 'POST',
                     url: "php/juridica/tutelas/functutelas.php",
                     data: {
                        function: 'descargaAdjuntoGlobal',//tipo == 'FTP1' ? 'descargaAdjunto' : 'descargaAdjuntoftp3',
                        ruta: ruta
                     }
                  }).then(function (response) {
                     //window.open("https://www.cajacopieps.com/genesis/temp/"+response.data);
                     window.open("temp/" + response.data);
                  });
               break;
               case 2:
                  window.open(ruta);
               break;
               default:
               break;
            }
            // $http({
            //    method: 'POST',
            //    url: "php/juridica/tutelas/functutelas.php",
            //    data: {
            //       function: 'descargaAdjunto',
            //       ruta: ruta
            //    }
            // }).then(function (response) {
            // //    //window.open("https://www.cajacopieps.com/genesis/temp/"+response.data);
            //    window.open("temp/" + response.data);
            // });
         }

         $scope.cloneHeadFixed = function () {
            setTimeout(() => {
               var original = $('#tablaActuaciones>thead');
               var clone = $('#tablaActuaciones>thead').clone();
               var list = original[0].children[0].children;
               for (var i = 0; i < list.length; i++) {
                  clone[0].children[0].children[i].style.width = list[i].offsetWidth + "px";
               }
               $('#tablaClone').html(clone).css("width", original[0].parentElement.offsetWidth + "px");
            }, 150);
         }

         //LISTA ACTUACIONES REGISTRADAS EN DEMANDA SELECCIONADA
         $scope.listaActuaciones = function () {
            $http({
               method: 'POST',
               url: "php/juridica/demandas/funcdemandas.php",
               data: {
                  function: 'listaactuaciones',
                  codigo_demanda: $scope.codigo_demanda_seleccionada
               }
            }).then(function (response) {
               $scope.Actuaciones = response.data;
               if ($scope.Actuaciones.length < 1) {
                  $scope.hdeBtnPanelActuaciones = true;
                  $scope.msjtable = false; 
               }
            });
         }
         $scope.listaActuaciones();
      }
   ]);