'use strict';
angular.module('GenesisApp')
   .controller('paneladjuntosctrl', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar', '$timeout',
      function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar, $timeout) {
         $(document).ready(function () {
            $('.collapsible').collapsible();
            $timeout(
               function () {
                  document.querySelector('#AdjuntosDIVseg').style.height = document.querySelector('#AdjuntosDIV').offsetHeight + 'px';
                  document.querySelector('#AdjuntosDIVseg').style.maxHeight = document.querySelector('#AdjuntosDIV').offsetHeight + 'px';
               }, 300
            );
            $scope.listaNulidades($scope.registro.codigotutela);
            $scope.obtenerAdjuntos();
            $('.tabs').tabs();
            $('#tabadj_1').click();
         });
         $scope.hdedetalle = false;
         document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.collapsible');
            var instances = M.Collapsible.init(elems, options);
         });

         // carga los archivos de la tutela
         // $http({
         //    method: 'POST',
         //    url: "php/juridica/tutelas/functutelas.php",
         //    data: {
         //       function: 'listaAdjuntosCargados',
         //       codigotutela: $scope.registro.codigotutela
         //    }
         // }).then(function (response) {
         //    $scope.Adjuntos = response.data;
         //    var groupBy = function (miarray, prop) {
         //       return miarray.reduce(function (groups, item) {
         //          var val = item[prop];
         //          groups[val] = groups[val] || { INCIDENTE: item.INCIDENTE, LISTA: [] };
         //          groups[val].LISTA = angular.copy(miarray.filter(function (el) {
         //             return el.INCIDENTE == item.INCIDENTE;
         //          }));
         //          return groups;
         //       }, {});
         //    }
         //    $scope.grupo = groupBy($scope.Adjuntos.filter(function (el) {
         //       return el.INCIDENTE != -1;
         //    }), 'INCIDENTE');
         //    console.log($scope.grupo);
         // });
         // $http({
         //    method: 'POST',
         //    url: "php/juridica/tutelas/functutelas.php",
         //    data: {
         //       function: 'listaAdjuntosCargadosMensual',
         //       codigotutela: $scope.registro.codigotutela
         //    }
         // }).then(function (response) {
         //    $scope.AdjuntosMensual = response.data;
         // });

         // $http({
         //    method: 'POST',
         //    url: "php/juridica/tutelas/functutelas.php",
         //    data: {
         //       function: 'listaAdjuntosCargadosRevisiones',
         //       codigotutela: $scope.registro.codigotutela
         //    }
         // }).then(function (response) {
         //    $scope.AdjuntosRevisiones = response.data;
         // });

         //CNVU CC ABRIL 2021
         $scope.ver_detalle = function (valor) {
            // console.log(valor);
            $scope.observacion_estado = valor.OBSERVACION == null ? 'NO REGISTRA.' : valor.OBSERVACION;
            $scope.responsable_estado = valor.NOMBRE_RESPONSABLE;
            swal('Detalle Estado Tutela', 'Observación: ' + $scope.observacion_estado + '<br>' + 'Responsable: ' + $scope.responsable_estado, 'info');
         };

         $scope.listaNulidades = function (codigo) {
            $http({
               method: 'POST',
               url: "php/juridica/tutelas/functutelas.php",
               data: {
                  function: 'listaAdjuntosCargadosNulidad',
                  constutela: codigo
               }
            }).then(function (response) {
               $scope.cant_nulidades = response.data;
            });
         };

         // $scope.obtenerAdjuntos = function (codigo){
         //    $scope.consnulidad = codigo;
         //    $http({
         //       method: 'POST',
         //       url: "php/juridica/tutelas/functutelas.php",
         //       data: {
         //          function: 'listaAdjuntosCargadosMensual',
         //          codigotutela: $scope.registro.codigotutela,
         //          consnulidad: $scope.consnulidad
         //       }
         //    }).then(function (response) {
         //       $scope.AdjuntosMensual = response.data;
         //    });

         //    $http({
         //       method: 'POST',
         //       url: "php/juridica/tutelas/functutelas.php",
         //       data: {
         //          function: 'listaAdjuntosCargados',
         //          codigotutela: $scope.registro.codigotutela,
         //          consnulidad: $scope.consnulidad
         //       }
         //    }).then(function (response) {
         //       $scope.Adjuntos = response.data;
         //       var groupBy = function (miarray, prop) {
         //          return miarray.reduce(function (groups, item) {
         //             var val = item[prop];
         //             groups[val] = groups[val] || { INCIDENTE: item.INCIDENTE, LISTA: [] };
         //             groups[val].LISTA = angular.copy(miarray.filter(function (el) {
         //                return el.INCIDENTE == item.INCIDENTE;
         //             }));
         //             return groups;
         //          }, {});
         //       }
         //       $scope.grupo = groupBy($scope.Adjuntos.filter(function (el) {
         //          return el.INCIDENTE != -1;
         //       }), 'INCIDENTE');
         //       console.log($scope.grupo);
         //    });
         // }

         $scope.obtenerAdjuntos = function (codigo) {
            $scope.consnulidad = codigo;
            $http({
               method: 'POST',
               url: "php/juridica/tutelas/functutelas.php",
               data: {
                  function: 'listaAdjuntosCargadosNew',
                  codigotutela: $scope.registro.codigotutela,
                  consnulidad: $scope.consnulidad
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
               $scope.grupo = groupBy($scope.Adjuntos.INCIDENTES.filter(function (el) {
                  return el.INCIDENTE != -1;
               }), 'INCIDENTE');
               console.log($scope.grupo,$scope.Adjuntos.INCIDENTES.length);
            });
         }

         $scope.obtenerAdjuntosNulidad = function (codigo) {
            $scope.consnulidad = codigo;
            $http({
               method: 'POST',
               url: "php/juridica/tutelas/functutelas.php",
               data: {
                  function: 'listaAdjuntosCargadosNulidad',
                  codigotutela: $scope.registro.codigotutela,
                  consnulidad: $scope.consnulidad
               }
            }).then(function (response) {
               $scope.AdjuntosNulidad = response.data;
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
               $scope.grupo_nul = groupBy($scope.AdjuntosNulidad.INCIDENTES.filter(function (el) {
                  return el.INCIDENTE != -1;
               }), 'INCIDENTE');
               console.log($scope.grupo_nul);
               // if ($scope.AdjuntosNulidad.length != undefined) {
               //    for (let i = 0; i < $scope.AdjuntosNulidad.length; i++) {
               //       if ($scope.AdjuntosNulidad[i].length == 0) {
               //          $scope.msjAdjuntosVacios = false;
               //       }else{
               //          $scope.msjAdjuntosVacios = true;
               //       }
               //    }
               // }else{
               //    $scope.msjAdjuntosVacios = true;
               // }
            });
         }

         // $scope.descargafile = function (ruta, tipo) {
         //    $http({
         //       method: 'POST',
         //       url: "php/juridica/tutelas/functutelas.php",
         //       data: {
         //          function: tipo == 'FTP1' ? 'descargaAdjunto' : 'descargaAdjuntoftp3',
         //          ruta: ruta
         //       }
         //    }).then(function (response) {
         //       //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
         //       window.open("temp/" + response.data);
         //    });
         // }

         $scope.UrlSoporte = '';
         $scope.descargafile = function (ruta,obs) {
            $scope.UrlSoporte = '';
            $http({
               method: 'POST',
               url: "php/juridica/tutelas/functutelas.php",
               data: {
                  function: 'descargaAdjuntoGlobal',
                  ruta: ruta
               }
            }).then(function (response) {
               setTimeout(() => {
                  $scope.UrlSoporte = "temp/" + response.data + "?page=hsn#toolbar=0";
                  if (obs != '' && obs != null && obs != undefined) {
                     swal('Detalle', 'Observación: ' + obs, 'info');
                  }
                  $scope.$apply();
               }, 500);
            });
         }
      }
   ]);