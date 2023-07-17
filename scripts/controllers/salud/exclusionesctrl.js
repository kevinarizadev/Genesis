'use strict';
angular.module('GenesisApp')
    .controller('exclusionesctrl', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$timeout', '$filter', 'communication', '$rootScope',
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
            $scope.buscar_listado_diagnostico_sin_producto = function (cadena) {
                if (cadena.length > 3) {
                    $http({
                        method: 'POST',
                        url: "php/salud/productos.php",
                        data: {
                            function: 'P_LISTA_DX_EXCLUSION',
                            producto: $scope.producto_codigo,
                            codigo: cadena
                        }
                    }).then(function (response) {
                        $scope.listado_diagnosticos_busqueda = "";
                        $scope.listado_diagnosticos_busqueda = null;
                        if (response.data.length == 0) {
                            $scope.listado_diagnosticos_busqueda = "";
                        } else {

                            $scope.listado_diagnosticos_busqueda = response.data;
                            // $scope.filtroEspeciliadad = response.data;

                        }
                    });
                }
 
            }
            $scope.seleccionar = function (codigo, nombre) {
                $scope.listado_diagnosticos_busqueda = null;
                $scope.nueva_diagnostico.NOMBRE = nombre;
                $scope.nueva_diagnostico.NOMBRE_TEMPORAL = nombre;
                $scope.nueva_diagnostico.CODIGO = codigo;
            }
            $scope.borrar_listado = function () {
                setTimeout(function () {
                    $scope.listado_diagnosticos_busqueda = null;
                }, 200)

            }

            // GUARDAR -I- ACTUALIZAS -U- EDITAR CAMPO -E- ELIMINAR -D-
            $scope.accion_diagnostico = function (tipo, i) {
                $scope.mostrar_nueva_diagnostico = 0;
                switch (tipo) {
                    case 'E':
                        for (var key in $scope.listado_diagnostico) {
                            $scope.listado_diagnostico[key].EDITAR = 'S';
                        }
                        $scope.listado_diagnostico[i].EDITAR = 'N';
                        break;
                    case 'I':
                        swal({
                            title: 'Confirmar',
                            text: "¿Desea Agregar el Diagnostico al Producto?",
                            type: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Confirmar'
                        }).then((result) => {
                            if (result) {
                                $http({
                                    method: 'POST',
                                    url: "php/salud/productos.php",
                                    data: {
                                        function: 'P_UI_EXCLUSION',
                                        v_pcodigo: $scope.producto_codigo,
                                        v_pestado: 'A',
                                        v_paccion: 'I',
                                        v_pdiagnostico: $scope.nueva_diagnostico.CODIGO,
                                    }
                                }).then(function (response) {
                                    if (response.data.Codigo == 1) {
                                        swal("¡Error!", response.data.Mensaje, "error");
                                        $scope.mostrar_nueva_diagnostico = 0;
                                    } else {
                                        $scope.nueva_diagnostico = {};
                                        swal('Completado', response.data.Mensaje, 'success');
                                        $scope.buscar_productos($scope.producto_codigo, $scope.producto_nombre);
                                        $scope.mostrar_nueva_diagnostico = 0;
                                    }

                                })
                            }
                        });
                        break;
                    default:
                        swal({
                            title: 'Confirmar',
                            text: "¿Desea Actualizar el Diagnostico al Producto?",
                            type: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Confirmar'
                        }).then((result) => {
                            if (result) {
                                $http({
                                    method: 'POST',
                                    url: "php/salud/productos.php",
                                    data: {
                                        function: 'P_UI_EXCLUSION',
                                        v_pcodigo: $scope.producto_codigo,
                                        v_pestado: $scope.listado_diagnostico[i].ESTADO,
                                        v_paccion: 'U',
                                        v_pdiagnostico: $scope.listado_diagnostico[i].CODIGO,
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
                $scope.mostrar_nueva_diagnostico = 1;
            }
            $scope.buscar_productos = function (CODIGO) {
                $scope.tab = 3;
                $http({
                    method: 'POST',
                    url: "php/salud/productos.php",
                    data: {
                        function: 'P_LISTA_PROD_NOPBS',
                        producto: CODIGO,
                        codigo: ''
                    }
                }).then(function (response) {
                    console.log(response.data);
                    $scope.producto_codigo = response.data.Cabeza[0].CODIGO;
                    $scope.producto_nombre = response.data.Cabeza[0].NOMBRE;
                    $scope.producto_clasificacion = response.data.Cabeza[0].CLASIFICACION;
                    $scope.producto_pos = response.data.Cabeza[0].POS == 'S' ? 'APLICA' : 'NO APLICA';
                    $scope.listado_diagnostico = response.data.detalle[0];
                    for (var key in $scope.listado_diagnostico) {
                        $scope.listado_diagnostico[key].EDITAR = 'S';
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
                    url: "php/salud/productos.php",
                    data: {
                        function: 'P_LISTA_OBTENER_NOPBS',
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





