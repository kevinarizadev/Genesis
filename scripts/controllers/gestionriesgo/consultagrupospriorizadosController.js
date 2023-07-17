'use strict';
angular.module('GenesisApp')
    .controller('consultagrupospriorizadosController', ['$scope', '$http', '$filter',
        function ($scope, $http, $filter) {
            $(document).ready(function () {
                console.clear();
                $('.modal').modal();
                $('.tabs').tabs();
                $scope.Tabs = 'HOJA3';
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
                document.getElementById("pantalla").parentElement.parentElement.parentElement.style.paddingBottom = '0px';
                document.getElementById("pantalla").parentElement.parentElement.parentElement.style.backgroundColor = 'white';
                //$scope.Rol_Cedula = sessionStorage.getItem('cedula');
                $http({
                    method: 'POST',
                    url: "php/gestionriesgo/consultagrupospriorizados.php",
                    data: {
                        function: 'Obt_Cedula'
                    }
                }).then(function (response) {
                    $scope.Rol_Cedula = response.data;
                });
                $http({
                    method: 'POST',
                    url: "php/gestionriesgo/consultagrupospriorizados.php",
                    data: {
                        function: 'Obt_Ubi'
                    }
                }).then(function (response) {
                    $scope.Rol_Ubicacion = response.data;
                });

                ///////////////////////////
                $scope.SysDay = new Date();
                //////////////////////
                $scope.currentPage = 0;
                $scope.pageSize = 15;
                $scope.valmaxpag = 10;
                $scope.pages = [];
                $scope.Listado.Lista = [];
                $scope.Listado.ListaTemp = "";
                ///////////////////////////////////////////////////////////////////////////////////////////////

                $scope.Vista3 = {
                    F_Inicio: $scope.SysDay,
                    F_Fin: $scope.SysDay
                };

                ///////////////////////////////////////////////////////////////////////////////////////////////
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
            });
            $scope.Listado = {
                Lista: [],
                ListaTemp: [],
            };

            $scope.KeyFind = function () {
                if ($scope.Tabs == 'HOJA3') {
                    if ($scope.Vista3.F_Inicio <= $scope.Vista3.F_Fin) {
                        $scope.Hoja3_Consultar();
                    } else {
                        if ($scope.Vista3.F_Inicio == undefined) {
                            swal({
                                title: 'Importante',
                                text: 'Ingrese una fecha de inicio valida.',
                                type: 'info',
                            }).catch(swal.noop);
                        }
                        if ($scope.Vista3.F_Fin == undefined) {
                            swal({
                                title: 'Importante',
                                text: 'Ingrese una fecha fin valida.',
                                type: 'info',
                            }).catch(swal.noop);
                        }
                        if ($scope.Vista3.F_Inicio != undefined && $scope.Vista3.F_Fin != undefined) {
                            swal({
                                title: 'Importante',
                                text: 'La fecha de inicio no debe ser mayor a la fecha fin.',
                                type: 'info',
                            }).catch(swal.noop);
                        }
                    }

                }
            }

            $scope.Hoja3_Consultar = function () {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                var F_Inicio = $scope.GetFecha('F_Inicio');
                var F_Fin = $scope.GetFecha('F_Fin');
                var Ubicacion = $scope.Rol_Ubicacion == '1' ? '' : $scope.Rol_Ubicacion;

                window.open('views/gestionriesgo/formatos/formato_consultagrupospriorizados.php?Ubicacion=' + Ubicacion + '&Responsable=' + $scope.Rol_Cedula + '&F_Inicio=' + F_Inicio + '&F_Fin=' + F_Fin, '_blank', "width=900,height=1100");
                
                setTimeout(() => {
                    swal.close(); 
                }, 3000);
                /*$http({
                    method: 'POST',
                    url: "php/gestionriesgo/consultagrupospriorizados.php",
                    data: {
                        function: 'Descargar_Excel',
                        F_Inicio: F_Inicio,
                        F_Fin: F_Fin,
                        Ubicacion: Ubicacion,
                        Responsable: $scope.Rol_Cedula
                    }
                }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                        if (response.data.Codigo == undefined) {
                            console.log(response.data);
                            swal.close();
                        } else {
                            swal({
                                title: "¡IMPORTANTE!",
                                text: response.data.Nombre,
                                type: "warning",
                            }).catch(swal.noop);
                        }
                    } else {
                        swal({
                            title: "¡IMPORTANTE!",
                            text: response.data,
                            type: "info",
                        }).catch(swal.noop);
                    }
                });*/
            }

            ////////////////////////////////////////////////////////////////////////////////////////////


            $scope.GetFecha = function (SCOPE) {
                var ahora_ano = $scope.Vista3[SCOPE].getFullYear();
                var ahora_mes = ((($scope.Vista3[SCOPE].getMonth() + 1) < 10) ? '0' + ($scope.Vista3[SCOPE].getMonth() + 1) : ($scope.Vista3[SCOPE].getMonth() + 1));
                var ahora_dia = ((($scope.Vista3[SCOPE].getDate()) < 10) ? '0' + ($scope.Vista3[SCOPE].getDate()) : ($scope.Vista3[SCOPE].getDate()));
                return ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
            }
            $scope.SetTab = function (x) {
                if (x != $scope.Tabs) {
                    $scope.Listado.Lista = [];
                    $scope.Listado.ListaTemp = '';
                    $scope.Listado.Filtro = '';
                }
                $scope.Tabs = x;
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
            }
            $scope.FormatSoloNumero = function (NID) {
                const input = document.getElementById('' + NID + '');
                var valor = input.value;
                valor = valor.replace(/[^0-9]/g, '');
                input.value = valor;
            }
            $scope.FormatPesoNumero = function (num) {
                if (num) {
                    var regex2 = new RegExp("\\.");
                    if (regex2.test(num)) {
                        num = num.toString().replace('.', ',');
                        num = num.split(',');
                        num[0] = num[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
                        num[0] = num[0].split('').reverse().join('').replace(/^[\.]/, '');
                        if (num[1].length > 1 && num[1].length > 2) {
                            num[1] = num[1].toString().substr(0, 2);
                        }
                        if (num[1].length == 1) {
                            num[1] = num[1] + '0';
                        }
                        return num[0] + ',' + num[1];
                    } else {
                        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
                        num = num.split('').reverse().join('').replace(/^[\.]/, '');
                        return num + ',00';
                    }
                } else {
                    return "0"
                }
            }
            $scope.closeModal = function () {
                $('.modal').modal('close');
            }
            ////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////
            $scope.Estado_Solicitud_Color = function (Estado) {
                if (Estado != undefined) {
                    if (Estado.toString().toUpperCase() == 'A') {
                        return { "background-color": "rgb(251, 93, 1) !important;" }
                    }
                    if (Estado.toString().toUpperCase() == 'P') {
                        return { "background-color": "rgb(6, 152, 20)!important" }
                    }
                }
            }
            // Paginacion
            $scope.filter = function (val) {
                $scope.Listado.ListaTemp = $filter('filter')($scope.Listado.Lista, ($scope.filter_save == val) ? '' : val);
                if ($scope.Listado.ListaTemp.length > 0) {
                    $scope.setPage(1);
                }
                $scope.configPages();
                $scope.filter_save = val;
            }
            $scope.closeModal = function () {
                $('.modal').modal('close');
            }
            $scope.configPages = function () {
                $scope.pages.length = 0;
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize) > $scope.valmaxpag)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                        ini = Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize) - $scope.valmaxpag;
                        fin = Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize);
                    }
                }
                if (ini < 1) ini = 1;
                for (var i = ini; i <= fin; i++) {
                    $scope.pages.push({
                        no: i
                    });
                }

                if ($scope.currentPage >= $scope.pages.length)
                    $scope.currentPage = $scope.pages.length - 1;
            }
            $scope.setPage = function (index) {
                $scope.currentPage = index - 1;
                // console.log($scope.Listado.Lista.length / $scope.pageSize - 1)
            }
            $scope.paso = function (tipo) {
                if (tipo == 'next') {
                    var i = $scope.pages[0].no + 1;
                    if ($scope.pages.length > 9) {
                        var fin = $scope.pages[9].no + 1;
                    } else {
                        var fin = $scope.pages.length;
                    }

                    $scope.currentPage = $scope.currentPage + 1;
                    if ($scope.Listado.ListaTemp.length % $scope.pageSize == 0) {
                        var tamanomax = parseInt($scope.Listado.ListaTemp.length / $scope.pageSize);
                    } else {
                        var tamanomax = parseInt($scope.Listado.ListaTemp.length / $scope.pageSize) + 1;
                    }
                    if (fin > tamanomax) {
                        fin = tamanomax;
                        i = tamanomax - 9;
                    }
                } else {
                    var i = $scope.pages[0].no - 1;
                    if ($scope.pages.length > 9) {
                        var fin = $scope.pages[9].no - 1;
                    } else {
                        var fin = $scope.pages.length;
                    }

                    $scope.currentPage = $scope.currentPage - 1;
                    if (i <= 1) {
                        i = 1;
                        fin = $scope.pages.length;
                    }
                }
                $scope.calcular(i, fin);
            }
            $scope.calcular = function (i, fin) {
                if (fin > 9) {
                    i = fin - 9;
                } else {
                    i = 1;
                }
                $scope.pages = [];
                for (i; i <= fin; i++) {
                    $scope.pages.push({
                        no: i
                    });
                }
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