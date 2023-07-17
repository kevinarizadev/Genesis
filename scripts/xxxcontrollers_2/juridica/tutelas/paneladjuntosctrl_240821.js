'use strict';
angular.module('GenesisApp')
   .controller('paneladjuntosctrl', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar','$timeout',
      function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar, $timeout) {


         $(document).ready(function () {
            $('.collapsible').collapsible();
            $timeout(
               function(){
                  document.querySelector('#AdjuntosDIVseg').style.height=document.querySelector('#AdjuntosDIV').offsetHeight+'px';
                  document.querySelector('#AdjuntosDIVseg').style.maxHeight=document.querySelector('#AdjuntosDIV').offsetHeight + 'px';
               },300
            );
         });
         $scope.hdedetalle = false;
         document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.collapsible');
            var instances = M.Collapsible.init(elems, options);
          });
         $scope.descargafile = function (ruta) {
            $http({
               method: 'POST',
               url: "php/juridica/tutelas/functutelas.php",
               data: {
                  function: 'descargaAdjunto',
                  ruta: ruta
               }
            }).then(function (response) {
               //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
               window.open("temp/" + response.data);
            });
         }
         // carga los archivos de la tutela
         $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
               function: 'listaAdjuntosCargados',
               codigotutela: $scope.registro.codigotutela
            }
         }).then(function (response) {
            $scope.Adjuntos = response.data;
            var groupBy = function (miarray, prop) {
               return miarray.reduce(function (groups, item) {
                  var val = item[prop];
                  groups[val] = groups[val] || { INCIDENTE: item.INCIDENTE, LISTA: [] };
                  groups[val].LISTA = angular.copy(miarray.filter(function (el) {
                     return el.INCIDENTE == item.INCIDENTE;
                  }));
                  return groups;
               }, {});
            }
            $scope.grupo = groupBy($scope.Adjuntos.filter(function (el) {
               return el.INCIDENTE != -1;
            }), 'INCIDENTE');
            console.log($scope.grupo);
         });
         $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
               function: 'listaAdjuntosCargadosMensual',
               codigotutela: $scope.registro.codigotutela
            }
         }).then(function (response) {
            $scope.AdjuntosMensual = response.data;
         });

         $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
               function: 'listaAdjuntosCargadosRevisiones',
               codigotutela: $scope.registro.codigotutela
            }
         }).then(function (response) {
            $scope.AdjuntosRevisiones = response.data;
         });
      
         //CNVU CC ABRIL 2021
         $scope.ver_detalle = function (valor) {
            // console.log(valor);
            $scope.observacion_estado = valor.OBSERVACION == null ? 'NO REGISTRA.' : valor.OBSERVACION;
            $scope.responsable_estado = valor.NOMBRE_RESPONSABLE;
            swal('Detalle Estado Tutela', 'Observación: ' + $scope.observacion_estado + '<br>' + 'Responsable: ' + $scope.responsable_estado, 'info');
         };
      }
   ]);