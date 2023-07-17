'use strict';
angular.module('GenesisApp')
    .controller('consultagesnotglosaController', ['$scope', '$http', '$window', '$filter', 'ngDialog',
        function ($scope, $http, $window, $filter, ngDialog) {
            $(document).ready(function () {
                console.clear();
                $('.modal').modal();
                $('.tabs').tabs();
                $scope.Tabs = 'GLOSA';
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
                $scope.Listado.Filtro = "";
                $scope.panel = { activo: 1, titulo: "" };
                $scope.acaspordepts = [];
                $scope.Listado.Lista = [];
                ///////////////////////////////////////////////////////////////////////////////////////////////


                $scope.Vista2 = {
                    Numero: '',
                };
                $scope.Vista3 = {
                    Estado: '',
                    Numero: '',
                    Ubicacion: '',
                    F_Inicio: $scope.SysDay,
                    F_Fin: $scope.SysDay,
                    Nit: ''
                };

                $scope.Rol_Nit = sessionStorage.getItem('nit');
                var x = $scope.Rol_Nit == '0' ? '' : $scope.Rol_Nit;
                $scope.Vista3.Nit = x;
                console.log($scope.Rol_Nit);
                console.log($scope.Vista3.Nit);

                $scope.Busqueda = {
                    Vista1_Res: {
                        Listado: null,
                        Filtro: null
                    },
                    Vista3_Res: {
                        Listado: null,
                        Filtro: null
                    },
                    Vista3_Rem: {
                        Listado: null,
                        Filtro: null
                    }
                }
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




            $scope.Clic = function () {
                var x = "views/Cuentasmedicas/formatos/formato_notificacionglosa.php?datos=%7B%22numero%22:%221404%22,%22ubicacion%22:%2213430%22,%22nit%22:%22900196347%22,%22direcion%22:%22%22,%22cedula%22:%221140819735%22,%22cargo%22:%22ASISTENTE%20NACIONAL%20DE%20TIC%22,%22nombre%22:%22Senior%20Arrieta%20Kevin%20David%22%7D";
                // var x = "views/Cuentasmedicas/formatos/formato_notificacionglosa.php?datos=%7B%22numero%22:%221404%22,%22ubicacion%22:%2213430%22,%22nit%22:%22900196347%22,%22direcion%22:%22%22,%22cedula%22:%221140819735%22,%22cargo%22:%22ASISTENTE%20NACIONAL%20DE%20TIC%22,%22nombre%22:%22Senior%20Arrieta%20Kevin%20David%22%7D";
                var win = window.open(x, '_blank');
                win.focus();
            }
            $scope.KeyFind = function (keyEvent) {
                if (keyEvent.which === 13) {
                    if ($scope.Tabs == 'FUNC') {
                        if ($scope.Vista1.Responsable != null && $scope.Vista1.Responsable != undefined && $scope.Vista1.Responsable != '' && $scope.Vista1.Responsable.length > 6) {
                            $scope.Obt_Vista_Consultar_Acas();
                        }
                    }
                    if ($scope.Tabs == 'TICKET') {
                        if ($scope.Vista2.Numero != null && $scope.Vista2.Numero != undefined && $scope.Vista2.Numero != '' && $scope.Vista2.Numero.length > 0) {
                            $scope.Obt_Vista_Consultar_Acas();
                        }
                    }
                }
            }

            $scope.Obt_Vista_Consultar = function () {
                setTimeout(() => {
                    $scope.$apply();
                }, 100);
                if ($scope.Tabs == 'FUNC') {
                    // $scope.Consultar_Acas();
                    // window.open('views/acas/formatos/formato_consulta_acas.php?data=' + data, '_blank', "width=900,height=1100");
                }
                if ($scope.Tabs == 'GLOSA') {
                    if ($scope.Vista2.Numero != '' && $scope.Vista2.Ubicacion != '') {
                        $scope.Consulta_EPS_IPS();
                    } else {
                        swal({
                            title: 'Importante',
                            text: 'Los campos requeridos no pueden estar vacios',
                            type: 'info',
                        }).catch(swal.noop);
                    }
                }
                if ($scope.Tabs == 'AVANZADO') {
                    if ($scope.Vista3.F_Inicio <= $scope.Vista3.F_Fin) {
                        $scope.Consulta_EPS_IPS();
                        // $scope.Datos.responsable = $scope.Rol_Cedula;
                        // $scope.Datos.remitente = $scope.Rol_Cedula;
                        // setTimeout(() => {
                        //     $scope.$apply();
                        //     var data = JSON.stringify($scope.Datos);
                        //     window.open('views/acas/formatos/formato_consulta_acas.php?data=' + data, '_blank', "width=900,height=1100");
                        // }, 500);

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
                                text: 'Ingrese una fecha de cierre valida.',
                                type: 'info',
                            }).catch(swal.noop);
                        }
                        if ($scope.Vista3.F_Inicio != undefined && $scope.Vista3.F_Fin != undefined) {
                            swal({
                                title: 'Importante',
                                text: 'La fecha de inicio no debe ser mayor a la cierre.',
                                type: 'info',
                            }).catch(swal.noop);
                        }
                    }
                }
            }

            $scope.Consulta_EPS_IPS = function () {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/consultagesnotglosa.php",
                    data: {
                        function: $scope.Rol_Nit == '0' ? 'Consulta_EPS' : 'Consulta_IPS',
                        Estado: $scope.Vista3.Estado,
                        Num: $scope.Vista3.Numero,
                        Ubi: $scope.Vista3.Ubicacion,
                        F_Inicio: $scope.Tabs == 'GLOSA' ? '' : $scope.GetFecha('F_Inicio'),
                        F_Fin: $scope.Tabs == 'GLOSA' ? '' : $scope.GetFecha('F_Fin'),
                        Nit: $scope.Vista3.Nit
                    }
                }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                        if (response.data.length != 0) {
                            setTimeout(() => {
                                $scope.Listado.Lista = response.data;
                                $scope.Listado.ListaTemp = response.data;
                                $scope.currentPage = 0;
                                $scope.pageSize = 10;
                                $scope.valmaxpag = 10;
                                $scope.pages = [];
                                $scope.configPages();
                                $scope.$apply();
                            }, 500);
                            swal.close();
                        } else {
                            $scope.Listado.Lista = [];
                            $scope.Listado.ListaTemp = [];
                            swal({
                                title: "¡No se encontraron registros!",
                                type: "info"
                            }).catch(swal.noop);
                        }
                    } else {
                        $scope.Listado.Lista = [];
                        $scope.Listado.ListaTemp = [];
                        swal({
                            title: "¡Ocurrio un error!",
                            text: response.data,
                            type: "warning"
                        }).catch(swal.noop);
                    }
                })
            }


            $scope.Ver_Glosas_Detalle = function (row) {
                $scope.Glosa_Descripcion = row.DETALLE_GLOSA;
                $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/gesnotificacionglosa.php",
                    data: { function: 'Obtener_Glosas_Detalle', numero: row.NUMERO, ubicacion: row.UBICACION, renglon: row.RENGLON }
                }).then(function (response) {
                    if (response.data[0] != undefined) {
                        // console.table(response.data);
                        $scope.List_Glosas_Detalle = response.data;
                        $('#modalglosadetalle').modal('open');
                    } else {
                        swal({
                            title: "¡Ocurrio un error!",
                            text: response.data.Nombre,
                            type: "warning"
                        }).catch(swal.noop);
                    }
                })
            }
            $scope.Ver_Glosas_Comentarios = function (row) {
                $scope.List_Comentarios = [];
                $scope.Glosa_Descripcion = row.DETALLE_GLOSA;
                $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/gesnotificacionglosa.php",
                    data: { function: 'Obtener_Comentarios', numero: row.NUMERO, ubicacion: row.UBICACION, renglon: row.RENGLON }
                }).then(function (response) {
                    $('#modalcomentarios').modal('open');
                    if (response.data[0] != undefined) {
                        var Height = document.querySelector("#pantalla").offsetHeight;
                        $scope.List_Comentarios = response.data;
                        setTimeout(function () {
                            var Width = document.querySelector(".chat_titulo").offsetWidth;
                            if (document.querySelector('.chat_triangle_der') != null) {
                                angular.forEach(document.querySelectorAll('.chat_triangle_der'), function (i) {
                                    i.style.marginLeft = (Width - 30) + 'px';
                                });
                            }
                            document.querySelector('#modalcomentarios').style.top = 3 + '%';
                            document.querySelector('#modalcomentarios').style.maxHeight = (Height + 20) + 'px';
                        }, 600);
                    } else {

                    }
                })
            }


            ////////////////////////////////////////////////////////////////////////////////////////////


            //////////////////////////////////////////////
            $scope.ValFecha = function (SCOPE) {
                if ($scope.Vista3[SCOPE] == undefined) {
                    $scope.Vista3[SCOPE] = $scope.SysDay;
                }
                if ($scope.Vista3[SCOPE] > $scope.SysDay) {
                    $scope.Vista3[SCOPE] = $scope.SysDay;
                }
                var Difference_In_Time = $scope.Vista3.F_Fin.getTime() - $scope.Vista3.F_Inicio.getTime();
                var days = Difference_In_Time / (1000 * 3600 * 24);
                if (days > 60) {
                    $scope.Vista3.F_Inicio = $scope.SysDay;
                    $scope.Vista3.F_Fin = $scope.SysDay;
                    Materialize.toast('¡El rango de fechas no puede ser mayor a 60 dias!', 5000); $('.toast').addClass('default-background-dark');
                }
                console.log(days);
            }
            $scope.GetFecha = function (SCOPE) {
                var ahora_ano = $scope.Vista3[SCOPE].getFullYear();
                var ahora_mes = ((($scope.Vista3[SCOPE].getMonth() + 1) < 10) ? '0' + ($scope.Vista3[SCOPE].getMonth() + 1) : ($scope.Vista3[SCOPE].getMonth() + 1));
                var ahora_dia = ((($scope.Vista3[SCOPE].getDate()) < 10) ? '0' + ($scope.Vista3[SCOPE].getDate()) : ($scope.Vista3[SCOPE].getDate()));
                return ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
            }
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