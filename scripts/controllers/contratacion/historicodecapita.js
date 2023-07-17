'use strict';
angular.module('GenesisApp')
    .controller('historicodecapita', ['$scope', '$http', 'ngDialog', 'notification', 'ausentismoHttp', '$timeout', '$q', 'communication', '$controller', '$rootScope', '$window', '$filter',
        function ($scope, $http, ngDialog, notification, ausentismoHttp, $timeout, $q, communication, $controller, $rootScope, $window, $filter) {

            $(document).ready(function () {

                $scope.datostabla();
                $scope.datostabla2();
                $scope.setTab(1);
                $scope.Ciudades_Estado = false;
            });



            $scope.vertabla = function () {
                $http({
                    method: 'POST',
                    url: "php/contratacion/generaciondecapita.php",
                    data: { function: 'vertabla' }
                }).then(function (response) {
                    $scope.estado = response.data[0].estado;
                });
            }


            // $scope.vertabla2 = function () {
            //     $http({
            //         method: 'POST',
            //         url: "php/contratacion/generaciondecapita.php",
            //         data: { function: 'vertabla2' }
            //     }).then(function (response) {
            //         $scope.listacontrol2 = response.data;
            //         // $scope.initPaginacion2(response.data);
            //     });
            // }

            $scope.setTab = function (newTab) {
                $scope.tab = newTab;
                $(".tabI").removeClass("tabactiva");
                $(".tabII").removeClass("tabactiva");
                switch (newTab) {
                    case 1:
                        $(".tabI").addClass("tabactiva");
                        $scope.mostrar_gestion = false;
                        // $scope.limpiar_gestion();
                        break;
                    case 2:
                        $(".tabII").addClass("tabactiva");
                        // $scope.cargar_datos();
                        $scope.regimen_contrato = "0";
                        $scope.contrato_contrato = null;
                        $scope.producto = '';
                        $scope.producto = "0";
                        $scope.producto_nombre = "";
                        // $scope.limpiar_gestion();
                        break;
                    default:
                }
            }
            $scope.isSet = function (tabNum) {
                return $scope.tab === tabNum;
            }
            // $scope.setTab(1);

            $scope.titulo = 'VALIDACIONES CAPITA';
            // $scope.vistas = null;

            $scope.titulo = 'VALIDACIONES CAPITA';


            //OBTENER datostabla   2 
            $scope.datostabla = function (type) {
                $http({
                    method: 'POST',
                    url: "php/contratacion/generaciondecapita.php",
                    data: { function: 'vertabla' }

                }).then(function (res) {
                    $scope.listacontrol = res.data;
                    $scope.initPaginacion(res.data);
                })
            }

            //OBTENER datostabla   2 
            $scope.datostabla2 = function (type) {
                $http({
                    method: 'POST',
                    url: "php/contratacion/generaciondecapita.php",
                    data: { function: 'vertabla2' }

                }).then(function (res) {
                    $scope.Datos_Tabla2 = res.data;
                    $scope.Change_FiltarEstado($scope.Ciudades_Estado == true ? 'S':'N');
                    // $scope.listacontrol2 = res.data;
                    // $scope.initPaginacion2(res.data);
                })
            }


            $scope.Change_FiltarEstado = function(estado){
                swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                });
                console.log(estado);
                $scope.listacontrol2 = null;
                setTimeout(() => {
                    $scope.listacontrol2=[];
                    $scope.$apply();
                    $scope.Datos_Tabla2.forEach(e => {
                        if(e.estado == estado){
                            $scope.listacontrol2.push(e);
                        }
                    });
                }, 300);



                setTimeout(() => {
                    $scope.initPaginacion2($scope.listacontrol2);
                    swal.close();
                    $scope.$apply();
                }, 1000);
                // setTimeout(() => {
                //     $scope.$apply();
                // }, 3000);

            }


            $scope.variables = function (index) {
                $scope.ciudad = $scope.listDatosTemp2[index].ciudad;
                $scope.departamento = $scope.listDatosTemp2[index].depa;
            }

            $scope.cambiarestado = function (row) {
                // $scope.estado = "S";

                swal({
                    title: 'Confirmar Proceso',
                    text: "Seguro que quiere cambiar el estado??",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar'
                }).then(function (result) {
                    if (result) {
                        $http({
                            method: 'POST',
                            url: "php/contratacion/generaciondecapita.php",
                            data: {
                                function: 'cambiarestado',
                                departamento: row.depa,
                                ciudad: row.ciudad,
                                estado: (row.estado == 'S' ? 'N':'S')

                            }
                        }).then(function (res) {
                            if (res.data.Codigo == 1) {
                                swal({
                                    title: res.data.Mensaje,
                                    timer: 3000,
                                    type: 'success'
                                }).catch(swal.noop);
                                setTimeout(() => {
                                    $scope.datostabla2();
                                }, 1000);


                            } else {
                                if (res.data.Codigo == 0) {
                                    swal('', res.data.Mensaje, 'error')
                                }
                            }
                        });

                        $scope.mostrarexamenfisico = true;
                    }
                    $scope.$apply();
                }).catch(swal.noop);
            }

            $scope.initPaginacion2 = function (info) {
                $scope.listDatosTemp2 = info;
                $scope.currentPage2 = 0;
                $scope.pageSize2 = 50;
                $scope.valmaxpag2 = 20;
                $scope.pages2 = [];
                $scope.configPages2();
            }
            $scope.filter2 = function (val) {
                $scope.listDatosTemp2 = $filter('filter')($scope.listacontrol2, val);
                $scope.configPages2();
            }
            $scope.configPages2 = function () {
                $scope.pages2.length = 0;
                var ini = $scope.currentPage2 - 4;
                var fin = $scope.currentPage2 + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.listDatosTemp2.length / $scope.pageSize2) > $scope.valmaxpag2)
                        fin = 15;
                    else
                        fin = Math.ceil($scope.listDatosTemp2.length / $scope.pageSize2);
                } else {
                    if (ini >= Math.ceil($scope.listDatosTemp2.length / $scope.pageSize2) - $scope.valmaxpag2) {
                        ini = Math.ceil($scope.listDatosTemp2.length / $scope.pageSize2) - $scope.valmaxpag2;
                        fin = Math.ceil($scope.listDatosTemp2.length / $scope.pageSize2);
                    }
                }
                if (ini < 1) ini = 1;
                for (var i = ini; i <= fin; i++) {
                    $scope.pages2.push({
                        no: i
                    });
                }
                if ($scope.currentPage2 >= $scope.pages2.length)
                    $scope.currentPage2 = $scope.pages2.length - 1;
                if ($scope.currentPage2 < 0) { $scope.currentPage2 = 0; }
            }
            $scope.setPage2 = function (index) {
                $scope.currentPage2 = index - 1;
                if ($scope.pages2.length % 2 == 0) {
                    var resul2 = $scope.pages2.length / 2;
                } else {
                    var resul2 = ($scope.pages2.length + 1) / 2;
                }
                var i = index - resul2;
                if ($scope.listDatosTemp2.length % $scope.pageSize2 == 0) {
                    var tamanomax = parseInt($scope.listDatosTemp2.length / $scope.pageSize2);
                } else {
                    var tamanomax = parseInt($scope.listDatosTemp2.length / $scope.pageSize2) + 1;
                }
                var fin = ($scope.pages2.length + i) - 1;
                if (fin > tamanomax) {
                    fin = tamanomax;
                    i = tamanomax - 9;
                }
                if (index > resul2) {
                    $scope.calcular2(i, fin);
                }
            }
            $scope.paso2 = function (tipo) {
                if (tipo == 'next') {
                    var i = $scope.pages2[0].no + 1;
                    if ($scope.pages2.length > 9) {
                        var fin = $scope.pages2[9].no + 1;
                    } else {
                        var fin = $scope.pages2.length;
                    }

                    $scope.currentPage2 = $scope.currentPage2 + 1;
                    if ($scope.listDatosTemp2.length % $scope.pageSize2 == 0) {
                        var tamanomax = parseInt($scope.listDatosTemp2.length / $scope.pageSize2);
                    } else {
                        var tamanomax = parseInt($scope.listDatosTemp2.length / $scope.pageSize2) + 1;
                    }
                    if (fin > tamanomax) {
                        fin = tamanomax;
                        i = tamanomax - 9;
                    }
                } else {
                    var i = $scope.pages2[0].no - 1;
                    if ($scope.pages2.length > 9) {
                        var fin = $scope.pages2[9].no - 1;
                    } else {
                        var fin = $scope.pages2.length;
                    }

                    $scope.currentPage2 = $scope.currentPage2 - 1;
                    if (i <= 1) {
                        i = 1;
                        fin = $scope.pages2.length;
                    }
                }
                $scope.calcular2(i, fin);
            }
            $scope.calcular2 = function (i, fin) {
                if (fin > 9) {
                    i = fin - 9;
                } else {
                    i = 1;
                }
                $scope.pages2 = [];
                for (i; i <= fin; i++) {
                    $scope.pages2.push({
                        no: i
                    });
                }
            }


            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            $scope.initPaginacion = function (info) {
                $scope.listDatosTemp = info;
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.valmaxpag = 10;
                $scope.pages = [];
                $scope.configPages();
            }
            $scope.filter = function (val) {
                $scope.listDatosTemp = $filter('filter')($scope.listacontrol, val);
                $scope.configPages();
            }
            $scope.configPages = function () {
                $scope.pages.length = 0;
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.listDatosTemp.length / $scope.pageSize) > $scope.valmaxpag)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                        ini = Math.ceil($scope.listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag;
                        fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize);
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
                if ($scope.currentPage < 0) { $scope.currentPage = 0; }
            }
            $scope.setPage = function (index) {
                $scope.currentPage = index - 1;
                if ($scope.pages.length % 2 == 0) {
                    var resul = $scope.pages.length / 2;
                } else {
                    var resul = ($scope.pages.length + 1) / 2;
                }
                var i = index - resul;
                if ($scope.listDatosTemp.length % $scope.pageSize == 0) {
                    var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize);
                } else {
                    var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize) + 1;
                }
                var fin = ($scope.pages.length + i) - 1;
                if (fin > tamanomax) {
                    fin = tamanomax;
                    i = tamanomax - 9;
                }
                if (index > resul) {
                    $scope.calcular(i, fin);
                }
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
                    if ($scope.listDatosTemp.length % $scope.pageSize == 0) {
                        var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize);
                    } else {
                        var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize) + 1;
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






            $scope.arrayFiles = [];




        }])








    .filter('inicio', function () {
        return function (input, start) {
            if (input != undefined && start != NaN) {
                start = +start;
                return input.slice(start);
            } else {
                return null;
            }

        }

    });


