'use strict';
angular.module('GenesisApp', [])
    .config(function($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .controller('liquidacion_soporteController', ['$scope', '$http', '$location', '$timeout',
        function($scope, $http, $location, $timeout) {

          
            $.getJSON("../../../obtenersession.php").done(function (respuesta) {
                $scope.sesdata = respuesta;
              
            })

            
            $scope.cargo = sessionStorage.getItem('cargo');
            $scope.hoy = new Date();
            $scope.cargo = sessionStorage.getItem('cargo');
            $scope.doc_funcionario = sessionStorage.getItem('cedula');


            $scope.nombre_funcionario=sessionStorage.getItem('nombre');
            $scope.impresion = [];
            $scope.mostrar_registro = function() {
                swal({
                    title: 'Cargando información...'
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "../../../php/aseguramiento/liquidacion.php",
                    data: {
                        function: 'p_mostrar_radicado',
                        ubicacion: $location.search().ubicacion,
                        numero: $location.search().numero,
                        radicado: '',
                        concepto: '',
                    }
                }).then(function(response) {
                    swal.close();
                    if (response.data.datos.length != 0) {
                        response.data.datos[0].duracion = parseInt(response.data.datos[0].duracion);
                        var fecha_for = response.data.datos[0].fecha_incapacidad.split("-");
                        response.data.datos[0].fecha_incapacidad = new Date(fecha_for[0], Number(fecha_for[1]) - 1, fecha_for[2]);
                        var fecha_for1 = response.data.datos[0].fecha_recibido.split("-");
                        response.data.datos[0].fecha_recibido = new Date(fecha_for1[0], Number(fecha_for1[1]) - 1, fecha_for1[2]);
                        var fecha_for2 = response.data.datos[0].fecha_accidente.split("-");
                        response.data.datos[0].fecha_accidente = new Date(fecha_for2[0], Number(fecha_for2[1]) - 1, fecha_for2[2]);
                        var fecha_for3 = response.data.datos[0].probable_parto.split("-");
                        response.data.datos[0].fecha_posible_parto = new Date(fecha_for3[0], Number(fecha_for3[1]) - 1, fecha_for3[2]);
                        var fecha_for4 = response.data.datos[0].ultima_mens.split("-");
                        response.data.datos[0].fecha_ultima_mestruacion = new Date(fecha_for4[0], Number(fecha_for4[1]) - 1, fecha_for4[2]);
                        $scope.impresion = response.data.datos[0];
                        $scope.impresion.concepto = response.data.datos[0].concepto;
                        $scope.impresion.motivo = response.data.datos[0].motivo;
                        // $scope.impresion.fecha_posible_parto = response.data.datos[0].probable_parto;
                        // $scope.impresion.fecha_ultima_mestruacion = response.data.datos[0].ultima_mens;
                        $scope.impresion.partomul = response.data.datos[0].parto_multiple == 'S' ? true : false;
                        $scope.impresion.semana_gestacion = response.data.datos[0].semanas;
                        $scope.impresion.dias_prematuros = response.data.datos[0].prematuro;
                        $scope.impresion.proroga = response.data.prec_prorroga == 'N' ? 'NO APLICA' : 'APLICA';
                        $scope.impresion.proroga_numero = response.data.pren_numero_pro;
                        $scope.impresion.proroga_ubicacion = response.data.pren_ubicacion_pro;
                        // $scope.impresion.proroga_dias = response.data.;
                        // $scope.impresion.dias_prematuros = response.data.datos[0].semanas;
                        setTimeout(function() {
                            window.print();
                        }, 500);
                    }
                });


            }
            $scope.mostrar_registro();

            var mediaQueryList = window.matchMedia('print');
            mediaQueryList.addListener(function(mql) {
                if (mql.matches) {
                    console.log('se hizo antes de imprimir');
                } else {
                    console.log('se hizo despues de imprimir');
                    setTimeout(function() {
                        window.close();
                    }, 10);
                }
            });
        }
    ])