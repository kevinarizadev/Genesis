'use strict';



angular.module('GenesisApp')
    .controller('gestionpermisosController', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$rootScope',
        function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $rootScope) {





            $scope.consulta_funcionarios = function () {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: {
                        function: 'P_LISTA_ADM_ACCIONES'
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data[0] != undefined) {
                        $scope.lista = response.data;
                    } else {
                        // swal('Información', 'No se Encontraron datos con los Criterios Buscados', 'info')
                        $scope.lista = []
                    }
                })
            }

            $scope.consulta_funcionarios();

            $scope.propertyName = 'proceso';
            $scope.reverse = true;

            $scope.sortBy = function (propertyName) {
                $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
                $scope.propertyName = propertyName;
            };

            $(document).ready(function () {
                $('#modal_proceso1').modal();
            })
            $scope.mostrar_modal = function (r) {
                $scope.data = r;
                $scope.data.crearData = $scope.data.crear == 'S' ? true : false
                $scope.data.procesarData = $scope.data.procesar == 'S' ? true : false
                $scope.data.procesar_excepcionData = $scope.data.procesar_excepcion == 'S' ? true : false
                $scope.data.anularData = $scope.data.anular == 'S' ? true : false
                $scope.data.terminarData = $scope.data.terminar == 'S' ? true : false
                $('#modal_proceso1').modal('open');
            }
            $scope.guardar_infor_modal = function () {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: {
                        function: 'P_ADMIN_ACCIONES_CONTRATO',
                        v_pfuncionario: $scope.data.cedula,
                        v_pcrear: $scope.data.crearData == true ? 'S' : 'N',
                        v_pprocesar: $scope.data.procesarData == true ? 'S' : 'N',
                        v_pprocesar_exp: $scope.data.procesar_excepcionData == true ? 'S' : 'N',
                        v_panular: $scope.data.anularData == true ? 'S' : 'N',
                        v_pterminar: $scope.data.terminarData == true ? 'S' : 'N',
                        v_pliquidar: 'N',
                    }
                }).then(function (response) {

                    swal.close();
                    if (response.data.Codigo == 0) {
                        swal({
                            title: "Completado!",
                            text: response.data.Nombre,
                            type: "success"
                        }).then(function () {
                            $('#modal_proceso1').modal('close');
                            $scope.consulta_funcionarios();
                        })
                    } else {
                        swal({
                            title: "¡Error!",
                            text: response.data.Nombre,
                            type: "error"
                        }).then(function () {
                        })
                    }



                })

            }


        }])