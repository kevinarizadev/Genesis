'use strict';
angular.module('GenesisApp')
    .controller('consultaautradController', ['$scope', '$http', '$window', '$filter', 'ngDialog',
        function ($scope, $http, $window, $filter, ngDialog) {
            $(document).ready(function () {
                console.clear();
                $('.modal').modal();
                $('.tabs').tabs();
                $scope.Tabs = 'AUT';
                console.log($(window).width());
                if ($(window).width() < 1100) {
                    document.querySelector("#pantalla").style.zoom = 0.7;
                }
                if ($(window).width() > 1100 && $(window).width() < 1300) {
                    document.querySelector("#pantalla").style.zoom = 0.8;
                }
                if ($(window).width() > 1300) {
                    document.querySelector("#pantalla").style.zoom = 0.9;
                }
                document.querySelector("#content").style.backgroundColor = "white";
                //$scope.Rol_Cedula = sessionStorage.getItem('cedula');
                $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/auditoriacuentas.php",
                    data: {
                        function: 'Obt_Cedula'
                    }
                }).then(function (response) {
                    $scope.Rol_Cedula = response.data;
                    //////////////////////
                    $scope.Vista1 = {
                        Numero: '',
                        Responsable_Cod: $scope.Rol_Cedula,
                        Responsable: '',
                        Filtrar: ''
                    };
                });

                ///////////////////////////

                $scope.Vista = 0;
                $scope.SysDay = new Date();
                //////////////////////
                $scope.currentPage = 0;
                $scope.pageSize = 15;
                ///////////////////////////////////////////////////////////////////////////////////////////////

                ///////////////////////////////////////////////////////////////////////////////////////////////
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
            });
            $scope.Listado = {
                Lista: [],
                ListaTemp: [],
                Filtro: '',
                Titulo: '',
                Url: ''
            };

            $scope.Obt_Vista_Consultar = function () {
                setTimeout(() => {
                    $scope.$apply();
                }, 100);
                if ($scope.Tabs == 'AUT') {
                    if ($scope.Vista1.Numero != '') {
                        $scope.Consultar();
                    } else {
                        swal({
                            title: 'Importante',
                            text: 'Los campos requeridos no pueden estar vacios',
                            type: 'info',
                        }).catch(swal.noop);
                    }
                }
            }

            $scope.Consultar = function () {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/consultaautrad.php",
                    data: {
                        function: 'Consulta_Aut_Rad',
                        Num: $scope.Vista1.Numero,
                    }
                }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                        if (response.data.Codigo != 1) {
                            swal({
                                title: "¡Importante!",
                                text: response.data.Nombre,
                                type: "info"
                            }).catch(swal.noop);
                        } else {
                            swal({
                                title: "¡Importante!",
                                text: response.data.Nombre,
                                type: "info"
                            }).catch(swal.noop);
                        }
                    } else {
                        swal({
                            title: "¡Ocurrio un error!",
                            text: response.data,
                            type: "warning"
                        }).catch(swal.noop);
                    }
                })
            }

            ////////////////////////////////////////////////////////////////////////////////////////////


            $scope.SetTab = function (x) {
                if (x != $scope.Tabs) {
                    $scope.Listado.Lista = [];
                    $scope.Listado.Titulo = '';
                    $scope.Listado.Filtro = '';
                }
                $scope.Tabs = x;
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
            }
            $scope.closeModal = function () {
                $('.modal').modal('close');
            }
        }
    ]).filter('startFrom', function () {
        return function (input, start) {
            if (input != undefined) {
                start = +start;
                return input.slice(start);
            }
        }
    });