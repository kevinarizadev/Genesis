
'use strict';
angular.module('GenesisApp', [])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .controller('ControladorIMP', ['$scope', '$http', '$timeout', '$location', '$sce',
        function ($scope, $http, $timeout, $location, $sce) {
            $(document).ready(function () {
                $scope.trustSrc = function (src) {
                    return $sce.trustAsResourceUrl(src);
                }

                $scope.Ejemplo();

            });

            $scope.Ejemplo = function () {
                $scope.Servicio = {
                    UBICACION_PACIENTE: 'CONSULTA EXTERNA',
                    ORIGEN: 'ENFERMEDAD GENERAL',
                    ENT_NUMERO: 'UNO',
                    ENT_FECHA_INI: '15/08/2019',
                    ENT_FECHA_FINAL: '13/09/2019',
                    PIE_NUMERO: '02',
                    PIE_CODIGO: '2681144',
                    PIE_EPS: 'EPS FAMISANAR',
                    PIE_FUNCIONARIO: 'DIANA MARCELA PARRA RUBIO',
                    PIE_CARGO: 'PROFESIONAL UNIVERSITARIO',
                };

                $scope.$apply();
                console.log($scope.Servicio);
            }
            ////////////////////////////////////////////////

            // $scope.Get_Det_Ant = function () {
            //     $http({
            //         method: 'POST',
            //         url: "../../../php/autorizaciones/anticipos/anticipos_formatos.php",
            //         data: {
            //             function: 'Obt_Anticipo',
            //             Numero: $scope.binaryToString($location.search().numero.toString()),
            //             TipoDoc: $scope.binaryToString($location.search().tipo.toString()),
            //             NumeroDoc: $scope.binaryToString($location.search().doc.toString())
            //         }
            //     }).then(function (response) {
            //         if (response.data != undefined) {
            //             if (response.data[0] != undefined) {

            //             }
            //         } else {
            //             setTimeout(function () {
            //                 window.close();
            //             }, 10);
            //         }
            //     });
            // }

            // document.addEventListener('contextmenu', event => event.preventDefault());
            // const body = document.querySelector('body');

            // body.onkeydown = function (e) {
            //     if (e.keyCode === 17 || e.keyCode === 80) {
            //     } else {
            //         return false;
            //     }
            // }
            // var mediaQueryList = window.matchMedia('print');
            // mediaQueryList.addListener(function (mql) {
            //     if (mql.matches) {
            //         console.log('se hizo antes de imprimir');
            //     } else {
            //         console.log('se hizo despues de imprimir');
            //         setTimeout(function () {
            //             window.close();
            //         }, 10);
            //     }
            // });

        }]); 
