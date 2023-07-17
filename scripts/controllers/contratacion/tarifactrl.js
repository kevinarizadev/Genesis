'use strict';
angular.module('GenesisApp')
    .controller('tarifactrl', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$timeout', '$filter', 'communication', '$rootScope',
        function ($scope, $http, notification, acasHttp, ngDialog, $timeout, $filter, communication, $rootScope) {
            $(document).ready(function () {
                $('#modal1').modal();
            });
            // VAIABLES INICIALES
            $scope.tab = 0;
            // estola lista
            $scope.captura_evento_teclado = function (keyEvent, tipo) {
                if (keyEvent.which === 13)
                    $scope.buscar_listados(tipo);
            }
            $scope.buscar_listado_tarifa_sin_producto = function (cadena) {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/contratacion/configuracion_tarifa.php",
                    data: {
                        function: 'p_lista_tarifa_producto',
                        producto: $scope.producto_codigo,
                        codigo: cadena
                    }
                }).then(function (response) {
                    $scope.listado_tarifas_busqueda = "";
                    $scope.listado_tarifas_busqueda = null;
                    if (response.data.length == 0) {
                        $scope.listado_tarifas_busqueda = "";
                    } else {

                        $scope.listado_tarifas_busqueda = response.data;
                        // $scope.filtroEspeciliadad = response.data;

                    }
                });
            }
            $scope.seleccionar = function (codigo, nombre) {
                $scope.listado_tarifas_busqueda = null;
                $scope.nueva_tarifa.NOMBRE = nombre;
                $scope.nueva_tarifa.NOMBRE_TEMPORAL = nombre;
                $scope.nueva_tarifa.CODIGO = codigo;
            }
            $scope.borrar_listado = function () {
                setTimeout(function () {
                    $scope.listado_tarifas_busqueda = null;
                }, 200)

            }
            $scope.formatearPorcentaje = function (NID) {
                const input = document.getElementById('' + NID + '');
                var num = input.value.replace(/\,/g, '');
                if (!isNaN(num)) {
                    input.value = num;
                }
                else {
                    input.value = input.value.replace(/[^\d\.]*/g, '');
                }
            }
            $scope.FormatearPeso = function (NID) {
                const input = document.getElementById('' + NID + '');
                var valor = input.value;
                valor = valor.replace(/[^0-9-,]/g, '');
                var array = null;
                var regex = new RegExp("\\,");
                if (!regex.test(valor)) {
                    valor = valor.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
                    valor = valor.split('').reverse().join('').replace(/^[\.]/, '');
                } else {
                    array = valor.toString().split(',');
                    if (array.length > 2) {
                        input.value = 0;
                    } else {
                        array[0] = array[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
                        array[0] = array[0].split('').reverse().join('').replace(/^[\.]/, '');
                        if (array[1].length > 2) {
                            array[1] = array[1].substr(0, 2);
                        }
                    }
                }
                if (!regex.test(valor)) {
                    input.value = valor;
                } else {
                    if (valor == ',') {
                        input.value = 0;
                    } else {
                        if (valor.substr(0, 1) == ',') {
                            input.value = 0 + ',' + array[1];
                        } else {
                            input.value = array[0] + ',' + array[1];
                        }
                    }
                }
            }

            // GUARDAR -I- ACTUALIZAS -U- EDITAR CAMPO -E- ELIMINAR -D-
            $scope.accion_tarifa = function (tipo, i) {


                $scope.mostrar_nueva_tarifa = 0;
                switch (tipo) {
                    case 'E':
                        for (var key in $scope.listado_tarifa) {
                            $scope.listado_tarifa[key].EDITAR = 'S';
                        }
                        $scope.listado_tarifa[i].EDITAR = 'N';
                        break;
                    case 'I':
                        swal({
                            title: 'Confirmar',
                            text: "¿Desea Guardar la tarifa?",
                            type: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Confirmar'
                        }).then((result) => {
                            if (result) {
                                $http({
                                    method: 'POST',
                                    url: "php/autorizaciones/contratacion/configuracion_tarifa.php",
                                    data: {
                                        function: 'P_UID_TARIFA',
                                        v_TRDN_TARIFA: $scope.nueva_tarifa.CODIGO,
                                        v_TRDC_PRODUCTO: $scope.producto_codigo,
                                        v_TRDV_VALOR: $scope.nueva_tarifa.VALOR.toString().replace(/\./g, ','),
                                        v_TRDC_ESTADO: 'A',
                                        v_paccion: tipo
                                    }
                                }).then(function (response) {
                                    if (response.data.Codigo == 1) {
                                        swal("¡Error!", response.data.Mensaje, "error");
                                        $scope.mostrar_nueva_tarifa = 0;
                                    } else {
                                        $scope.nueva_tarifa = {};
                                        swal('Completado', response.data.Mensaje, 'success');
                                        $scope.buscar_productos($scope.producto_codigo, $scope.producto_nombre);
                                        $scope.mostrar_nueva_tarifa = 0;
                                    }

                                })
                            }
                        });
                        break;
                    default:
                        swal({
                            title: 'Confirmar',
                            text: "¿Desea Actualizar la tarifa?",
                            type: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Confirmar'
                        }).then((result) => {
                            if (result) {
                                $http({
                                    method: 'POST',
                                    url: "php/autorizaciones/contratacion/configuracion_tarifa.php",
                                    data: {
                                        function: 'P_UID_TARIFA',
                                        v_TRDN_TARIFA: $scope.listado_tarifa[i].CODIGO,
                                        v_TRDC_PRODUCTO: $scope.producto_codigo,
                                        v_TRDV_VALOR: $scope.listado_tarifa[i].VALOR.toString().replace(/\./g, ','),
                                        v_TRDC_ESTADO: $scope.listado_tarifa[i].ESTADO,
                                        v_paccion: tipo
                                    }
                                }).then(function (response) {
                                    if (response.data.Codigo == 1) {
                                        swal("¡Error!", response.data.Mensaje, "error");
                                    } else {
                                        swal('Completado', response.data.Mensaje, 'success');
                                        $scope.buscar_productos($scope.producto_codigo, $scope.producto_nombre);
                                    }

                                })
                            }
                        })
                        break;

                }


            }

            $scope.buscar_listado = function () {
                $scope.tab = 2;
            }

            $scope.mostrar_nueva_campos = function () {
                $scope.mostrar_nueva_tarifa = 1;
            }
            $scope.buscar_productos = function (CODIGO, NOMBRE) {

                $scope.producto_codigo = CODIGO
                $scope.producto_nombre = NOMBRE
                $scope.tab = 3;
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/contratacion/configuracion_tarifa.php",
                    data: {
                        function: 'p_lista_tarifa',
                        producto: $scope.producto_codigo,
                        codigo: ''
                    }
                }).then(function (response) {
                    console.log(response.data);
                    $scope.listado_tarifa = response.data;
                    for (var key in response.data) {
                        $scope.listado_tarifa[key].VALOR.toString().replace(/\./g, ','),
                        $scope.listado_tarifa[key].EDITAR = 'S';
                    }
                })
            }
            // tabla inicial
            $scope.filter = function (val) {
                $scope.listaRIPSTemp = $filter('filter')($scope.listaRIPS, val);
                $scope.configPages();
            }
            $scope.p_lista_producto = function (id) {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/contratacion/configuracion_tarifa.php",
                    data: {
                        function: 'p_lista_producto',
                        id: id
                    }
                }).then(function (response) {
                    $scope.reporte = response.data;
                    $scope.initPaginacion($scope.reporte);
                    $scope.buscar_listado();

                })
            }

            $scope.initPaginacion = function (info) {
                $scope.reporteTemp = info;
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.valmaxpag = 10;
                $scope.pages = [];
                $scope.configPages();
            }
            $scope.filter = function (val) {
                $scope.reporteTemp = $filter('filter')($scope.reporte, val);
                $scope.configPages();
            }
            $scope.configPages = function () {
                $scope.pages.length = 0;
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.reporteTemp.length / $scope.pageSize) > $scope.valmaxpag)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.reporteTemp.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.reporteTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                        ini = Math.ceil($scope.reporteTemp.length / $scope.pageSize) - $scope.valmaxpag;
                        fin = Math.ceil($scope.reporteTemp.length / $scope.pageSize);
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
            };
            $scope.setPage = function (index) {
                $scope.currentPage = index - 1;
                if ($scope.pages.length % 2 == 0) {
                    var resul = $scope.pages.length / 2;
                } else {
                    var resul = ($scope.pages.length + 1) / 2;
                }
                var i = index - resul;
                if ($scope.reporteTemp.length % $scope.pageSize == 0) {
                    var tamanomax = parseInt($scope.reporteTemp.length / $scope.pageSize);
                } else {
                    var tamanomax = parseInt($scope.reporteTemp.length / $scope.pageSize) + 1;
                }
                // var tamanomax= $scope.reporteTemp.length/$scope.pageSize;
                console.log(tamanomax);
                var fin = ($scope.pages.length + i) - 1;
                if (fin > tamanomax) {
                    fin = tamanomax;
                    i = tamanomax - 10;
                }
                if (index > resul) {
                    $scope.calcular(i, fin);
                }
                console.log($scope.reporte.length / $scope.pageSize - 1);
            };
            $scope.paso = function (tipo) {
                if (tipo == 'next') {
                    var i = $scope.pages[0].no + 1;
                    if ($scope.pages.length > 9) {
                        var fin = $scope.pages[9].no + 1;
                    } else {
                        var fin = $scope.pages.length;
                    }

                    $scope.currentPage = $scope.currentPage + 1;
                    if ($scope.reporteTemp.length % $scope.pageSize == 0) {
                        var tamanomax = parseInt($scope.reporteTemp.length / $scope.pageSize);
                    } else {
                        var tamanomax = parseInt($scope.reporteTemp.length / $scope.pageSize) + 1;
                    }
                    if (fin > tamanomax) {
                        fin = tamanomax;
                        i = tamanomax - 10;
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





