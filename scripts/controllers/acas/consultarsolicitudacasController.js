'use strict';
angular.module('GenesisApp')
    .controller('consultarsolicitudacasController', ['$scope', '$http', '$window', '$filter', 'ngDialog',
        function ($scope, $http, $window, $filter, ngDialog) {
            $(document).ready(function () {
                console.clear();
                $('.modal').modal();
                $('.tabs').tabs();
                $scope.Tabs = 'TICKET';
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
                $scope.Listado.Acas = [];
                ///////////////////////////////////////////////////////////////////////////////////////////////


                //console.log($scope.Vista1);
                $scope.Vista2 = {
                    Numero: '',
                    Filtrar: ''
                };
                $scope.Vista3 = {
                    F_Inicio: $scope.SysDay,
                    F_Fin: $scope.SysDay,
                    Estado: '',
                    Responsable_Cod: '',
                    Responsable: '',
                    Remitente_Cod: '',
                    Remitente: '',
                    Tipo: 'S',
                    Filtrar: ''
                };

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
                Acas: [],
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

            $scope.Obt_Vista_Consultar_Acas = function () {
                $scope.Datos = {
                    user: $scope.Rol_Cedula,
                    numero: '',
                    filtro: '',
                    responsable: '',
                    fecha_ini: '',
                    fecha_fin: '',
                    estado: '',
                    remitente: ''
                };
                setTimeout(() => {
                    $scope.$apply();
                }, 100);
                if ($scope.Tabs == 'FUNC') {
                    $scope.Datos.filtro = 'F';
                    $scope.Datos.responsable = $scope.Vista1.Responsable_Cod;
                    // $scope.Consultar_Acas();
                    var data = JSON.stringify($scope.Datos);
                    window.open('views/acas/formatos/formato_consulta_acas.php?data=' + data, '_blank', "width=900,height=1100");
                }
                if ($scope.Tabs == 'TICKET') {
                    $scope.Datos.filtro = 'N';
                    $scope.Datos.numero = $scope.Vista2.Numero;
                    $scope.Consultar_Acas();
                }
                if ($scope.Tabs == 'AVANZADO') {
                    if ($scope.Vista3.F_Inicio <= $scope.Vista3.F_Fin) {
                        $scope.Datos.filtro = 'A';
                        $scope.Datos.fecha_ini = $scope.GetFecha('F_Inicio');
                        $scope.Datos.fecha_fin = $scope.GetFecha('F_Fin');
                        $scope.Datos.estado = $scope.Vista3.Estado;
                        if ($scope.Vista3.Tipo == 'S') {
                            $scope.Datos.remitente = $scope.Rol_Cedula;
                            
                        } else {
                            $scope.Datos.responsable = $scope.Rol_Cedula;
                        }
                        // $scope.Datos.responsable = $scope.Rol_Cedula;
                        // $scope.Datos.remitente = $scope.Rol_Cedula;
                        // $scope.Consultar_Acas();
                        setTimeout(() => {
                            $scope.$apply();
                            var data = JSON.stringify($scope.Datos);
                            window.open('views/acas/formatos/formato_consulta_acas.php?data=' + data, '_blank', "width=900,height=1100");
                        }, 500);

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

            $scope.Consultar_Acas = function () {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/acas/consultarsolicitudacas.php",
                    data: {
                        function: 'Obt_Acas',
                        xdata: JSON.stringify($scope.Datos)
                    }
                }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                        if (response.data.length != 0) {
                            setTimeout(() => {
                                $scope.Listado.Acas = response.data;
                                $scope.$apply();
                            }, 500);
                            swal.close();
                        } else {
                            swal({
                                title: "¡No se encontraron registros!",
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

            $scope.verdescripcion = function (desc, ticket, ubicacion) {
                $scope.desc = desc;
                $scope.ticket = ticket;
                $scope.ubicacion = ubicacion;
                ngDialog.open({
                    template: 'views/tic/modal/ModalDetalles.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'gestionacasticModalController',
                    scope: $scope
                });
            }
            ////////////////////////////////////////////////////////////////////////////////////////////
            $scope.KeyFind_Funcionario = function (keyEvent, Vista, Cod, Nom, Busqueda) {
                if (keyEvent.which === 13)
                    $scope.Buscar_Funcionario(Vista, Cod, Nom, Busqueda);
            }
            $scope.Buscar_Funcionario = function (Vista, Cod, Nom, Busqueda) {
                if ($scope[Vista][Nom] != null && $scope[Vista][Nom] != '' && $scope[Vista][Nom].length > 4) {
                    $http({
                        method: 'POST',
                        url: "php/acas/consultarsolicitudacas.php",
                        data: {
                            function: 'Obt_Funcs',
                            Coincidencia: $scope[Vista][Nom].toUpperCase(),
                        }
                    }).then(function (response) {
                        if (response.data.length == 1 && response.data.toString().substr(0, 3) != '<br') {
                            $scope[Vista][Cod] = response.data[0].DOCUMENTO;
                            $scope.FillTextbox_Listado_Funcionario(Vista, Cod, Nom, response.data[0].DOCUMENTO, response.data[0].NOMBRE, Busqueda);
                            $scope.Busqueda[Busqueda].Listado = null;
                            $scope.Busqueda[Busqueda].Filtro = null;
                        }
                        if (response.data.length > 1 && response.data.toString().substr(0, 3) != '<br') {
                            $scope.Busqueda[Busqueda].Listado = response.data;
                            $scope.Busqueda[Busqueda].Filtro = response.data;
                            $('#list-group-func-' + Vista + '_' + Nom).css({ width: $('#' + Vista + '_' + Nom)[0].offsetWidth });
                        }
                        if (response.data.length == 0) {
                            swal({
                                title: "¡No se encontró ningún funcionario!",
                                type: "info",
                                timer: 1000
                            }).catch(swal.noop);
                        }
                    });
                } else {
                    Materialize.toast('¡Digite el nombre del funcionario o coincidencia!', 1000); $('.toast').addClass('default-background-dark');
                }
            }
            $scope.Complete_Listado_Funcionario = function (Vista, Cod, Nom, string, Busqueda) {
                if ($scope[Vista][Nom] != undefined && string != undefined && $scope.Busqueda[Busqueda].Listado != null) {
                    $('#list-group-func-' + Vista + '_' + Nom).css({ width: $('#' + Vista + '_' + Nom)[0].offsetWidth });
                    var output = [];
                    angular.forEach($scope.Busqueda[Busqueda].Listado, function (Listado) {
                        if (Listado.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                            output.push({ "DOCUMENTO": Listado.DOCUMENTO, "NOMBRE": Listado.NOMBRE.toUpperCase() });
                        }
                    });
                    $scope.Busqueda[Busqueda].Filtro = output;
                }
            }
            $scope.FillTextbox_Listado_Funcionario = function (Vista, Cod, Nom, codigo, nombre, Busqueda) {
                $scope[Vista][Cod] = codigo;
                $scope[Vista][Nom] = nombre;
                $scope.Busqueda[Busqueda].Filtro = null;
            }

            //////////////////////////////////////////////
            $scope.ValFecha = function (SCOPE) {
                if ($scope.Vista3[SCOPE] == undefined) {
                    $scope.Vista3[SCOPE] = $scope.SysDay;
                }
                if ($scope.Vista3[SCOPE] > $scope.SysDay) {
                    $scope.Vista3[SCOPE] = $scope.SysDay;
                }
            }

            $scope.GetFecha = function (SCOPE) {
                var ahora_ano = $scope.Vista3[SCOPE].getFullYear();
                var ahora_mes = ((($scope.Vista3[SCOPE].getMonth() + 1) < 10) ? '0' + ($scope.Vista3[SCOPE].getMonth() + 1) : ($scope.Vista3[SCOPE].getMonth() + 1));
                var ahora_dia = ((($scope.Vista3[SCOPE].getDate()) < 10) ? '0' + ($scope.Vista3[SCOPE].getDate()) : ($scope.Vista3[SCOPE].getDate()));
                return ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
            }


            $scope.SetTab = function (x) {
                if (x != $scope.Tabs) {
                    $scope.Listado.Acas = [];
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


            $scope.Abrir_Modal_Soportes = function (ruta) {
                $scope.Listado.Url = '';
                $http({
                    method: 'POST',
                    url: "php/acas/consultarsolicitudacas.php",
                    data: {
                        function: 'descargaAdjunto',
                        ruta: ruta
                    }
                }).then(function (response) {
                    $scope.Listado.Url = "temp/" + response.data;
                    if (ruta.split('.')[ruta.split('.').length - 1] == 'pdf') {
                        (function () {
                            $('#Modal_Soportes').modal();
                        }());
                        $('#Modal_Soportes').modal('open');
                        setTimeout(function () {
                            document.querySelector('#Modal_Soportes').style.top = 2 + '%';
                            $scope.$apply();
                            // console($scope.Form.Url);
                        }, 500);
                    } else if(ruta.split('.')[ruta.split('.').length - 1] != 'zip') {
                        window.open($scope.Listado.Url);
                    }
                });

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
            $scope.cloneHeadFixed = function () {
                setTimeout(() => {
                    var original = $('#tablaByCN>thead');
                    var clone = $('#tablaByCN>thead').clone();
                    var list = original[0].children[0].children;
                    for (var i = 0; i < list.length; i++) {
                        clone[0].children[0].children[i].style.width = list[i].offsetWidth + "px";
                    }
                    $('#tablaClone').html(clone).css("width", original[0].parentElement.offsetWidth + "px");;
                }, 500);
            }
            $(".scroll_x").on("scroll", function () {
                $(".scroll_x").scrollLeft($(this).scrollLeft());
            });
            $(window).resize(function () {
                $scope.cloneHeadFixed();
            });

            $scope.getData = function () {
                return $filter('filter')($scope.Listado.Acas, $scope.Listado.Filtro);
            }
            $scope.numberOfPages = function () {
                return Math.ceil($scope.getData().length / $scope.pageSize);
            }
            $scope.$watch('Listado.Filtro', function (newValue, oldValue) {
                if (oldValue != newValue) {
                    $scope.currentPage = 0;
                }
            }, true);
            $scope.btns_paginacion = function (value) {
                $scope.currentPage = value;
                $scope.cloneHeadFixed();
                //window.scrollTo({ top: 0, behavior: 'smooth' });
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