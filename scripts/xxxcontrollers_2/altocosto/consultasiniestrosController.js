'use strict';
angular.module('GenesisApp')
    .controller('consultasiniestrosController', ['$scope', '$http', '$filter', '$q',
        function ($scope, $http, $filter, $q) {
            $(document).ready(function () {
                // console.clear();
                $('.modal').modal();
                $('.tabs').tabs();
                $scope.Tabs = 'HOJA1';
                $scope.Tabs_Actualizar = 1;
                console.log($(window).width());
                if ($(window).width() < 1100) {
                    document.querySelector("#versionamiento").style.zoom = 0.7;
                }
                if ($(window).width() > 1100 && $(window).width() < 1300) {
                    document.querySelector("#versionamiento").style.zoom = 0.8;
                }
                if ($(window).width() > 1300) {
                    document.querySelector("#versionamiento").style.zoom = 0.9;
                }
                document.getElementById("versionamiento").parentElement.parentElement.parentElement.style.paddingBottom = '0px';
                document.getElementById("versionamiento").parentElement.parentElement.parentElement.style.backgroundColor = 'white';
                //$scope.Rol_Cedula = sessionStorage.getItem('cedula');
                $http({
                    method: 'POST',
                    url: "php/altocosto/siniestros/consultasiniestros.php",
                    data: {
                        function: 'Obt_Cedula'
                    }
                }).then(function (response) {
                    $scope.Rol_Cedula = response.data;
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

                $scope.Vista1 = {
                    Tipo_Doc: '',
                    Num_Doc: '',
                    Obs: '',

                    Modal_Consulta_Radicado: '',
                    Modal_Consulta_Cod_Cohorte: '',
                    Modal_Consulta_Diagnostico: '',
                    Modal_Consulta_Diagnostico_Cod: '',
                    Modal_Consulta_Diagnostico_Save: '',
                    Modal_Consulta_Clase: '',

                    Modal_Consulta_Fecha_inicio_IpsAsig: '',
                    Modal_Consulta_Fecha_inicio_IpsAsig_Save: '',
                    Modal_Consulta_IpsAsig: '',
                    Modal_Consulta_IpsAsig_Cod: '',
                    Modal_Consulta_IpsAsig_Save: '',

                    Modal_Consulta_Regimen: '',

                    Busqueda: {
                        Diagnostico: {
                            Filtro: [],
                            Listado: null,
                            SAVE: null,
                            Seleccion: 9999
                        },
                        IpsAsig: {
                            Filtro: [],
                            Listado: null,
                            SAVE: null,
                            Seleccion: 9999
                        }
                    },
                    Listado: null,
                    Datos: null
                };
                $scope.Vista2 = {
                    Estado: '',
                    Ubicacion: '',
                    Cohorte: '',
                    F_Inicio: $scope.SysDay,
                    F_Fin: $scope.SysDay
                };

                ///////////////////////////////////////////////////////////////////////////////////////////////
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
                $scope.Array_Patologias = [
                    { CODIGO: 'AR', NOMBRE: 'ARTRITIS' },
                    { CODIGO: 'CA', NOMBRE: 'CANCER' },
                    { CODIGO: 'ER', NOMBRE: 'ENFERMEDAD RENAL' },
                    { CODIGO: 'HF', NOMBRE: 'HEMOFILIA' },
                    { CODIGO: 'HC', NOMBRE: 'HEPATITIS C' },
                    { CODIGO: 'VH', NOMBRE: 'VIH' },
                    { CODIGO: 'EH', NOMBRE: 'ENFERMEDADES HUERFANAS' },
                    { CODIGO: 'TP', NOMBRE: 'TRASPLANTES' },
                    { CODIGO: 'X', NOMBRE: 'TODAS' },
                ]
            });
            $scope.Listado = {
                Lista: [],
                ListaTemp: [],
            };

            $scope.KeyFind = function () {
                if ($scope.Tabs == 'HOJA1') {
                    if ($scope.Vista1.Tipo_Doc != null && $scope.Vista1.Tipo_Doc != undefined && $scope.Vista1.Num_Doc != '' && $scope.Vista1.Num_Doc.length > 5) {
                        $scope.Hoja1_Consultar_Siniestros();
                    }
                }
                if ($scope.Tabs == 'HOJA2') {
                    if ($scope.Vista2.Estado != null && $scope.Vista2.Estado != '' && $scope.Vista2.Ubicacion != '' && $scope.Vista2.Cohorte != '') {
                        $scope.Hoja2_Consultar_Siniestros();
                    }
                }
            }

            $scope.Hoja1_Consultar_Siniestros = function () {
                $scope.Listado.Lista = [];
                $scope.Listado.ListaTemp = [];
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/altocosto/siniestros/consultasiniestros.php",
                    data: {
                        function: 'Hoja1_Consultar_Siniestros',
                        Tipo_Doc: $scope.Vista1.Tipo_Doc,
                        Num_Doc: $scope.Vista1.Num_Doc
                    }
                }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                        if (response.data[0].Codigo == undefined) {
                            $scope.Listado.Lista = response.data;
                            $scope.Listado.ListaTemp = response.data;
                            $scope.configPages();
                            swal.close();
                        } else {
                            swal({
                                title: "¡IMPORTANTE!",
                                text: response.data[0].Nombre,
                                type: "warning",
                            }).catch(swal.noop);
                            document.getElementById("Num_Doc").focus();
                        }
                    } else {
                        swal({
                            title: "¡IMPORTANTE!",
                            text: response.data,
                            type: "info",
                        }).catch(swal.noop);
                        document.getElementById("Num_Doc").focus();
                    }
                });
            }

            $scope.Hoja2_Consultar_Siniestros = function () {
                var Ubicacion = $scope.Vista2.Ubicacion == 'X' ? '' : $scope.Vista2.Ubicacion;
                var Cohorte = $scope.Vista2.Cohorte == 'X' ? '' : $scope.Vista2.Cohorte;
                var F_Inicio = $scope.GetFecha('F_Inicio');
                var F_Fin = $scope.GetFecha('F_Fin');
                window.open('views/altocosto/formatos/formato_consultasiniestros.php?Estado=' + $scope.Vista2.Estado + '&Ubicacion=' + Ubicacion +
                    '&Cohorte=' + Cohorte + '&F_Inicio=' + F_Inicio + '&F_Fin=' + F_Fin, '_blank', "width=900,height=1100");
                // $http({
                //     method: 'POST',
                //     url: "php/altocosto/siniestros/consultasiniestros.php",
                //     data: {
                //         function: 'Descargar_Excel',
                //         Estado: $scope.Vista2.Estado,
                //         Ubicacion: Ubicacion,
                //         Cohorte: Cohorte,
                //         F_Inicio: F_Inicio,
                //         F_Fin: F_Fin
                //     }
                // }).then(function (response) {
                //     if (response.data && response.data.toString().substr(0, 3) != '<br') {
                //         if (response.data.Codigo == undefined) {
                //         } else {
                //             swal({
                //                 title: "¡IMPORTANTE!",
                //                 text: response.data.Nombre,
                //                 type: "warning",
                //             }).catch(swal.noop);
                //             document.getElementById("Num_Doc").focus();
                //         }
                //     } else {
                //         swal({
                //             title: "¡IMPORTANTE!",
                //             text: response.data,
                //             type: "info",
                //         }).catch(swal.noop);
                //         document.getElementById("Num_Doc").focus();
                //     }
                // });
            }

            $scope.Get_Fecha_Retiro = function (cod) {
                var defered = $q.defer();
                var promise = defered.promise;
                var SysDay = $scope.GetFechaSys('SysDay');
                if (cod == 'R') {
                    swal({
                        title: "Fecha",
                        html: '<input id="datetimepicker" type="date" class="form-control"  max="' + SysDay + '" autofocus>',
                        width: '300px',
                        inputValidator: function (value) {
                            return new Promise(function (resolve, reject) {
                                if (value !== '') {
                                    resolve();
                                } else {
                                    swal.close();
                                }
                            })
                        }
                    }).then(function () {
                        if ($('#datetimepicker').val() != '') {
                            var fecha = $('#datetimepicker').val().toString().split('-');
                            var Fecha_Inicio = fecha[2] + '-' + fecha[1] + '-' + fecha[0];
                            defered.resolve(Fecha_Inicio);
                        } else {
                            swal({
                                title: "Mensaje",
                                text: "¡Debe ingresar una fecha!",
                                type: "warning",
                            }).catch(swal.noop);
                        }
                    }).catch(swal.noop);
                } else {
                    defered.resolve('');
                }
                return promise;
            }

            $scope.Hoja1_Anular_Siniestros = function (X) {
                var xArray = [
                    {
                        id: 'X',
                        name: 'ANULAR SINIESTRO'
                    },
                    {
                        id: 'R',
                        name: 'RETIRAR AFILIADO DE LA COHORTE'
                    }
                ];
                var options = {};
                $.map(xArray,
                    function (o) {
                        options[o.id] = o.name;
                    });
                swal({
                    title: 'Seleccione una opción',
                    input: 'select',
                    inputOptions: options,
                    inputPlaceholder: 'Seleccionar',
                    showCancelButton: true,
                    allowOutsideClick: false,
                    width: 'auto',
                    inputValidator: function (value) {
                        return new Promise(function (resolve, reject) {
                            if (value !== '') {
                                resolve();
                            } else {
                                swal.close();
                            }
                        })
                    }
                }).then(function (cod) {
                    var promise = $scope.Get_Fecha_Retiro(cod);
                    promise.then(function (Fecha_Inicio) {
                        swal({
                            title: 'Observacion de Anulación',
                            input: 'textarea',
                            inputPlaceholder: 'Escribe un comentario...',
                            showCancelButton: true,
                            allowOutsideClick: false,
                            inputValue: $scope.Vista1.Obs
                        }).then(function (result) {
                            $scope.Vista1.Obs = result;
                            if (result !== '' && result.length >= 20 && result.length < 500) {
                                swal({ title: 'Cargando...', allowOutsideClick: false });
                                swal.showLoading();
                                $http({
                                    method: 'POST',
                                    url: "php/altocosto/siniestros/consultasiniestros.php",
                                    data: {
                                        function: 'Hoja1_Anular_Siniestros',
                                        Rad: X.RADICADO,
                                        Obs: result,
                                        Ced: $scope.Rol_Cedula,
                                        Tipo: cod,
                                        Fecha_Retiro: Fecha_Inicio
                                    }
                                }).then(function (response) {
                                    if (response.data.Codigo != undefined) {
                                        if (response.data.Codigo == 0) {
                                            swal({
                                                title: "Mensaje",
                                                text: response.data.Nombre,
                                                type: "success",
                                            }).catch(swal.noop);
                                        } else {
                                            swal({
                                                title: response.data.Nombre,
                                                type: "warning",
                                            }).catch(swal.noop);
                                        }
                                        setTimeout(() => {
                                            $scope.Hoja1_Consultar_Siniestros();
                                        }, 2000);
                                    }
                                });
                            } else {
                                Materialize.toast('¡El comentario debe contener al menos 20 caracteres!', 1000); $('.toast').addClass('default-background-dark');
                            }
                        })
                    })
                }).catch(swal.noop);
            }

            $scope.Hoja1_Abrir_Modal_Actualizar = function (X) {
                $('#Modal_NuevaGestion').modal('open');
                $scope.Tabs_Actualizar = 1;
                setTimeout(() => {
                    $("#Tab_Act1").click();
                }, 500);
                /*Diagnostico*/
                angular.forEach(document.querySelectorAll('.Form_Consulta input'), function (i) {
                    i.setAttribute("readonly", true);
                });
                angular.forEach(document.querySelectorAll('.Form_Consulta select'), function (i) {
                    i.setAttribute("disabled", true);
                });
                $scope.Vista1.Modal_Consulta_Radicado = X.RADICADO;
                $scope.Vista1.Modal_Consulta_Cod_Cohorte = X.COHORTE;
                $scope.Vista1.Modal_Consulta_Diagnostico = X.DIAGNO;
                $scope.Vista1.Modal_Consulta_Diagnostico_Cod = (X.DIAGNO.toString().split('-')[0]).toString().trim();
                $scope.Vista1.Modal_Consulta_Diagnostico_Save = (X.DIAGNO.toString().split('-')[0]).toString().trim();
                $scope.Vista1.Busqueda.Diagnostico.SAVE = X.DIAGNO;
                $scope.Vista1.Busqueda.Diagnostico.Listado = null;
                $scope.Vista1.Busqueda.Diagnostico.Filtro = null;
                $scope.Vista1.Modal_Consulta_Clase = X.COD_CLASE_CONCEPTO;

                /*Ips Asignada*/
                if (X.COD_IPS_ATENCION != '') {
                    var FECHA_IPS = new Date(X.FECHA_IPS_ATENCION);
                    var FECHA_MIN = new Date(X.FECHA_IPS_ATENCION);
                    $scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig = FECHA_IPS;
                    $scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig_Save = FECHA_MIN;
                    $scope.Vista1.Modal_Consulta_IpsAsig = X.COD_IPS_ATENCION + ' - ' + X.NOM_IPS_ATENCION;
                    $scope.Vista1.Modal_Consulta_IpsAsig_Cod = X.COD_IPS_ATENCION;
                    $scope.Vista1.Modal_Consulta_IpsAsig_Save = X.COD_IPS_ATENCION;
                    $scope.Vista1.Busqueda.IpsAsig.SAVE = X.COD_IPS_ATENCION + ' - ' + X.NOM_IPS_ATENCION;
                    $scope.Vista1.Busqueda.IpsAsig.Listado = null;
                    $scope.Vista1.Busqueda.IpsAsig.Filtro = null;
                    $scope.Vista1.Modal_Consulta_Regimen = X.REGIMEN;
                } else {
                    var XFECHA_MIN = X.FECHA_NACIMIENTO.toString().split('/');
                    var FECHA_MIN = new Date(XFECHA_MIN[2], XFECHA_MIN[1] - 1, XFECHA_MIN[0]);
                    $scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig_Save = FECHA_MIN;
                    $scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig = $scope.SysDay;
                    $scope.Vista1.Modal_Consulta_IpsAsig = '';
                    $scope.Vista1.Modal_Consulta_IpsAsig_Cod = '';
                    $scope.Vista1.Modal_Consulta_IpsAsig_Save = '';
                    $scope.Vista1.Busqueda.IpsAsig.SAVE = '';
                    $scope.Vista1.Busqueda.IpsAsig.Listado = null;
                    $scope.Vista1.Busqueda.IpsAsig.Filtro = null;
                    $scope.Vista1.Modal_Consulta_Regimen = X.REGIMEN;
                }
            }

            $scope.Hoja1_Actualiza_Diag = function () {
                if ($scope.Vista1.Modal_Consulta_Diagnostico_Cod != $scope.Vista1.Modal_Consulta_Diagnostico_Save) {
                    angular.forEach(document.querySelectorAll('#Modal_NuevaGestion .red-text'), function (i) {
                        i.classList.remove('red-text');
                    });
                    var Campos_Empty = false;
                    if ($scope.Vista1.Modal_Consulta_Diagnostico_Cod == undefined || $scope.Vista1.Modal_Consulta_Diagnostico_Cod == null || $scope.Vista1.Modal_Consulta_Diagnostico_Cod == '') {
                        Campos_Empty = true; document.querySelector('#Modal_Consulta_Cod_Diag_Label').classList.add('red-text');
                    }
                    if (Campos_Empty == false) {
                        swal({
                            title: '¿Está seguro que desea actualizar el Diagnostico?',
                            // text: "¿Acepta registrar la gestión realizada?",
                            type: "question",
                            showCancelButton: true,
                            allowOutsideClick: false
                        }).catch(swal.noop)
                            .then((willDelete) => {
                                if (willDelete) {
                                    swal({ title: 'Cargando...', allowOutsideClick: false });
                                    swal.showLoading();
                                    $http({
                                        method: 'POST',
                                        url: "php/altocosto/siniestros/consultasiniestros.php",
                                        data: {
                                            function: 'Hoja1_Actualiza_Diag',
                                            Rad: $scope.Vista1.Modal_Consulta_Radicado,
                                            Tipo_Doc: $scope.Vista1.Tipo_Doc,
                                            Num_Doc: $scope.Vista1.Num_Doc,
                                            Ced: $scope.Rol_Cedula,
                                            Diag: $scope.Vista1.Modal_Consulta_Diagnostico_Cod
                                        }
                                    }).then(function (response) {
                                        if (response.data && response.data.toString().substr(0, 3) != '<br') {
                                            if (response.data.Codigo == 0) {
                                                $scope.closeModal();
                                                swal({
                                                    title: "Mensaje",
                                                    text: response.data.Nombre,
                                                    type: "success",
                                                }).catch(swal.noop);
                                            } else {
                                                swal({
                                                    title: response.data.Nombre,
                                                    type: "warning",
                                                }).catch(swal.noop);
                                            }
                                            setTimeout(() => {
                                                $scope.Hoja1_Consultar_Siniestros();
                                            }, 2000);
                                        }
                                    });
                                }
                            })
                    }
                } else {
                    swal({
                        title: 'El diagnostico seleccionado es el mismo al actual.',
                        type: "info",
                    }).catch(swal.noop);
                }
            }
            $scope.Hoja1_Actualiza_IpsAsig = function () {
                if ($scope.Vista1.Modal_Consulta_IpsAsig_Cod != $scope.Vista1.Modal_Consulta_IpsAsig_Save) {
                    angular.forEach(document.querySelectorAll('#Modal_NuevaGestion .red-text'), function (i) {
                        i.classList.remove('red-text');
                    });
                    var Campos_Empty = false;
                    if ($scope.Vista1.Modal_Consulta_IpsAsig_Cod == undefined || $scope.Vista1.Modal_Consulta_IpsAsig_Cod == null || $scope.Vista1.Modal_Consulta_IpsAsig_Cod == '') {
                        Campos_Empty = true; document.querySelector('#Vista1_Modal_Consulta_IpsAsig_Label').classList.add('red-text');
                    }
                    if ($scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig == undefined || $scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig == null || $scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig == '') {
                        Campos_Empty = true; document.querySelector('#Vista1_Modal_Consulta_Fecha_inicio_IpsAsig_Label').classList.add('red-text');
                    }
                    if (Campos_Empty == false) {
                        swal({
                            title: '¿Está seguro que desea actualizar la Ips Integral?',
                            type: "question",
                            showCancelButton: true,
                            allowOutsideClick: false
                        }).catch(swal.noop)
                            .then((willDelete) => {
                                if (willDelete) {
                                    swal({ title: 'Cargando...', allowOutsideClick: false });
                                    swal.showLoading();
                                    if ($scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig_Save.toISOString().substring(0, 10) == $scope.SysDay.toISOString().substring(0, 10)) {
                                       $scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig.setDate($scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig.getDate() + 1);
                                    }
                                    var xFecha_inicio = $scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig;
                                    var Fecha_inicio = xFecha_inicio.getDate() + '-' + (((xFecha_inicio.getMonth() + 1) < 10) ? '0' + (xFecha_inicio.getMonth() + 1) : (xFecha_inicio.getMonth() + 1)) + '-' + xFecha_inicio.getFullYear();
                                    $http({
                                        method: 'POST',
                                        url: "php/altocosto/siniestros/consultasiniestros.php",
                                        data: {
                                            function: 'Hoja1_Actualiza_Ips',
                                            Rad: $scope.Vista1.Modal_Consulta_Radicado,
                                            Ced: $scope.Rol_Cedula,
                                            Ips: $scope.Vista1.Modal_Consulta_IpsAsig_Cod,
                                            Fecha_Inicio: Fecha_inicio
                                        }
                                    }).then(function (response) {
                                        if (response.data && response.data.toString().substr(0, 3) != '<br') {
                                            if (response.data != 0) {
                                                if (response.data.Codigo == 0) {
                                                    $scope.closeModal();
                                                    swal({
                                                        title: "Mensaje",
                                                        text: response.data.Nombre,
                                                        type: "success",
                                                    }).catch(swal.noop);
                                                } else {
                                                    swal({
                                                        title: response.data.Nombre,
                                                        type: "warning",
                                                    }).catch(swal.noop);
                                                }
                                                setTimeout(() => {
                                                    $scope.Hoja1_Consultar_Siniestros();
                                                }, 2000);
                                            } else {
                                                swal({
                                                    title: 'Error al guardar la ips',
                                                    type: "warning",
                                                }).catch(swal.noop);
                                            }
                                        }
                                    });
                                }
                            })
                    }
                } else {
                    swal({
                        title: 'La Ips seleccionada es la misma a la actual.',
                        type: "info",
                    }).catch(swal.noop);
                }
            }

            $scope.Hoja1_Ver_Traza = function (X) {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $scope.Vista1.Listado = null;
                $http({
                    method: 'POST',
                    url: "php/altocosto/siniestros/consultasiniestros.php",
                    data: {
                        function: 'Hoja1_Ver_Traza',
                        Rad: X.RADICADO,
                        Ced: $scope.Rol_Cedula
                    }
                }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                        if (response.data.length > 0) {
                            $('#Modal_Trazabilidad').modal('open');
                            $scope.Vista1.Listado = response.data[0];
                            $scope.Vista1.Datos = response.data[0];
                            swal.close();
                        } else {
                            swal({
                                title: response.data.Nombre,
                                type: "warning",
                            }).catch(swal.noop);
                        }

                    }
                });
            }


            //CONSULTA DIAGNOSTICO
            $scope.KeyFind_ObDiag = function (keyEvent) {
                if ($scope.Vista1.Busqueda.Diagnostico.Filtro != null && $scope.Vista1.Busqueda.Diagnostico.Filtro.length != 0) {
                    if (keyEvent.which === 40) {
                        $scope.Vista1.Busqueda.Diagnostico.Seleccion = $scope.Vista1.Busqueda.Diagnostico.Seleccion >= ($scope.Vista1.Busqueda.Diagnostico.Filtro.length - 1) ? 0 : $scope.Vista1.Busqueda.Diagnostico.Seleccion + 1;
                        document.querySelector('.Clase_Listar_Diags').scrollTo(0, document.querySelector('#Diagnostico' + $scope.Vista1.Busqueda.Diagnostico.Seleccion).offsetTop);
                    } else if (keyEvent.which === 38) {
                        $scope.Vista1.Busqueda.Diagnostico.Seleccion = $scope.Vista1.Busqueda.Diagnostico.Seleccion <= 0 || $scope.Vista1.Busqueda.Diagnostico.Seleccion == 9999 ? $scope.Vista1.Busqueda.Diagnostico.Filtro.length - 1 : $scope.Vista1.Busqueda.Diagnostico.Seleccion - 1;
                        document.querySelector('.Clase_Listar_Diags').scrollTo(0, document.querySelector('#Diagnostico' + $scope.Vista1.Busqueda.Diagnostico.Seleccion).offsetTop)
                    } else if (keyEvent.which === 13 && $scope.Vista1.Busqueda.Diagnostico.Seleccion != 9999) {
                        var x = $scope.Vista1.Busqueda.Diagnostico.Filtro[$scope.Vista1.Busqueda.Diagnostico.Seleccion];
                        $scope.FillTextbox_Listado_Diag(x.DIAGNOSTICO, x.DESCRIPCION, x.COD_COHORTE, x.COD_CLASE_COHORTE, x.NOM_CLASE_COHORTE);
                    }
                } else {
                    if (keyEvent.which === 13)
                        $scope.Buscar_Diag();
                }
            }
            $scope.Buscar_Diag = function () {
                if ($scope.Vista1.Modal_Consulta_Diagnostico.length > 2) {
                    $http({
                        method: 'POST',
                        url: "php/altocosto/siniestros/consultasiniestros.php",
                        data: {
                            function: 'Obtener_Diagnostico_F',
                            Conc: $scope.Vista1.Modal_Consulta_Diagnostico.toUpperCase(),
                            Coh: $scope.Vista1.Modal_Consulta_Cod_Cohorte,
                            Cla: $scope.Vista1.Modal_Consulta_Clase
                        }
                    }).then(function (response) {
                        if (response.data.toString().substr(0, 3) != '<br') {
                            if (response.data[0] != undefined && response.data.length > 1) {
                                $scope.Vista1.Busqueda.Diagnostico.Filtro = response.data;
                                $scope.Vista1.Busqueda.Diagnostico.Listado = response.data;
                                $('.Clase_Listar_Diags').css({ width: $('#Modal_Consulta_Diagnostico')[0].offsetWidth });
                            }
                            if (response.data.length == 1) {
                                if (response.data[0].DIAGNOSTICO == '-1') {
                                    swal({
                                        title: "¡Mensaje!",
                                        text: response.data[0].Nombre,
                                        type: "info",
                                    }).catch(swal.noop);
                                    $scope.Vista1.Busqueda.Diagnostico.Filtro = null;
                                    $scope.Vista1.Busqueda.Diagnostico.Listado = null;
                                } else {
                                    $scope.FillTextbox_Listado_Diag(response.data[0].DIAGNOSTICO, response.data[0].DESCRIPCION);
                                }
                            } else if (response.data.length == 0) {
                                swal({
                                    title: "¡Importante!",
                                    text: "No se encontro el diagnostico",
                                    type: "info",
                                }).catch(swal.noop);
                            }
                        } else {
                            swal({
                                title: "¡IMPORTANTE!",
                                text: response.data,
                                type: "warning"
                            }).catch(swal.noop);
                        }
                    })
                } else {
                    Materialize.toast('¡Digite al menos 3 caracteres!', 1000); $('.toast').addClass('default-background-dark');
                }
            }
            $scope.Complete_Listado_Diag = function (keyEvent, string) {
                if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
                    if ($scope.Vista1.Modal_Consulta_Diagnostico != undefined && string != undefined && $scope.Vista1.Busqueda.Diagnostico.Listado != undefined) {
                        $('.Clase_Listar_Diags').css({ width: $('#Modal_Consulta_Diagnostico')[0].offsetWidth });
                        var output = [];
                        angular.forEach($scope.Vista1.Busqueda.Diagnostico.Listado, function (x) {
                            if (x.DESCRIPCION.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.DIAGNOSTICO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                                output.push({ "DIAGNOSTICO": x.DIAGNOSTICO, "DESCRIPCION": x.DESCRIPCION.toUpperCase() });
                            }
                        });
                        $scope.Vista1.Busqueda.Diagnostico.Filtro = output;
                        $scope.Vista1.Busqueda.Diagnostico.Seleccion = 9999;
                    }
                }
            }
            $scope.FillTextbox_Listado_Diag = function (codigo, nombre) {
                $scope.Vista1.Modal_Consulta_Diagnostico_Cod = codigo;
                $scope.Vista1.Modal_Consulta_Diagnostico = codigo + ' - ' + nombre;
                $scope.Vista1.Busqueda.Diagnostico.SAVE = codigo + ' - ' + nombre;
                $scope.Vista1.Busqueda.Diagnostico.Filtro = null;
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
            }
            $scope.Blur_Diag = function () {
                setTimeout(() => {
                    if ($scope.Vista1.Modal_Consulta_Diagnostico != null && $scope.Vista1.Modal_Consulta_Diagnostico != undefined) {
                        if (($scope.Vista1.Busqueda.Diagnostico.Filtro == null || $scope.Vista1.Busqueda.Diagnostico.Filtro.length == 0)
                            && $scope.Vista1.Modal_Consulta_Diagnostico != $scope.Vista1.Busqueda.Diagnostico.SAVE) {
                            $scope.Vista1.Modal_Consulta_Diagnostico = $scope.Vista1.Busqueda.Diagnostico.SAVE;
                        }
                        if ($scope.Vista1.Modal_Consulta_Diagnostico == '') {
                            $scope.Vista1.Modal_Consulta_Diagnostico = $scope.Vista1.Busqueda.Diagnostico.SAVE;
                            $scope.Vista1.Busqueda.Diagnostico.Filtro = null;
                        }
                    }
                    $scope.$apply();
                }, 300);
            }

            //CONSULTA IPS ASIGNADA
            $scope.KeyFind_ObIpsAsig = function (keyEvent, HOJA) {
                if ($scope[HOJA].Busqueda.IpsAsig.Filtro != null && $scope[HOJA].Busqueda.IpsAsig.Filtro.length != 0) {
                    if (keyEvent.which === 40) {
                        $scope[HOJA].Busqueda.IpsAsig.Seleccion = $scope[HOJA].Busqueda.IpsAsig.Seleccion >= ($scope[HOJA].Busqueda.IpsAsig.Filtro.length - 1) ? 0 : $scope[HOJA].Busqueda.IpsAsig.Seleccion + 1;
                        document.querySelector('.Clase_Listar_IpsAsig').scrollTo(0, document.querySelector('#IpsAsig' + $scope[HOJA].Busqueda.IpsAsig.Seleccion).offsetTop);
                    } else if (keyEvent.which === 38) {
                        $scope[HOJA].Busqueda.IpsAsig.Seleccion = $scope[HOJA].Busqueda.IpsAsig.Seleccion <= 0 || $scope[HOJA].Busqueda.IpsAsig.Seleccion == 9999 ? $scope[HOJA].Busqueda.IpsAsig.Filtro.length - 1 : $scope[HOJA].Busqueda.IpsAsig.Seleccion - 1;
                        document.querySelector('.Clase_Listar_IpsAsig').scrollTo(0, document.querySelector('#IpsAsig' + $scope[HOJA].Busqueda.IpsAsig.Seleccion).offsetTop)
                    } else if (keyEvent.which === 13 && $scope[HOJA].Busqueda.IpsAsig.Seleccion != 9999) {
                        var x = $scope[HOJA].Busqueda.IpsAsig.Filtro[$scope[HOJA].Busqueda.IpsAsig.Seleccion];
                        $scope.FillTextbox_Listado_IpsAsig(x.CODIGO, x.NOMBRE, HOJA);
                    }
                } else {
                    if (keyEvent.which === 13)
                        $scope.Buscar_IpsAsig(HOJA);
                }
            }
            $scope.Buscar_IpsAsig = function (HOJA) {
                if ($scope[HOJA].Modal_Consulta_IpsAsig.length > 2) {
                    $http({
                        method: 'POST',
                        url: "php/altocosto/siniestros/gestionsiniestros.php",
                        data: {
                            function: 'Obt_Ips_Asignada',
                            Conc: $scope[HOJA].Modal_Consulta_IpsAsig.toUpperCase(),
                            Regimen: $scope[HOJA].Modal_Consulta_Regimen,
                            Cohorte: $scope[HOJA].Modal_Consulta_Cod_Cohorte
                        }
                    }).then(function (response) {
                        if (response.data.toString().substr(0, 3) != '<br') {
                            if (response.data[0] != undefined && response.data.length > 1) {
                                $scope[HOJA].Busqueda.IpsAsig.Filtro = response.data;
                                $scope[HOJA].Busqueda.IpsAsig.Listado = response.data;
                                $('.Clase_Listar_IpsAsig').css({ width: $('#' + HOJA + '_Modal_Consulta_IpsAsig')[0].offsetWidth });
                            }
                            if (response.data.length == 1) {
                                if (response.data[0].Codigo == '1') {
                                    swal({
                                        title: "¡Mensaje!",
                                        text: response.data[0].Nombre,
                                        type: "info",
                                    }).catch(swal.noop);
                                    $scope[HOJA].Busqueda.IpsAsig.Filtro = null;
                                    $scope[HOJA].Busqueda.IpsAsig.Listado = null;
                                } else {
                                    $scope.FillTextbox_Listado_IpsAsig(response.data[0].CODIGO, response.data[0].NOMBRE, HOJA);
                                }
                            } else if (response.data.length == 0) {
                                swal({
                                    title: "¡Importante!",
                                    text: "No se encontro la Ips",
                                    type: "info",
                                }).catch(swal.noop);
                            }
                        } else {
                            swal({
                                title: "¡IMPORTANTE!",
                                text: response.data,
                                type: "warning"
                            }).catch(swal.noop);
                        }
                    })
                } else {
                    Materialize.toast('¡Digite al menos 3 caracteres!', 1000); $('.toast').addClass('default-background-dark');
                }
            }
            $scope.Complete_Listado_IpsAsig = function (keyEvent, string, HOJA) {
                if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
                    if ($scope[HOJA].Modal_Consulta_IpsAsig != undefined && string != undefined && $scope[HOJA].Busqueda.IpsAsig.Listado != undefined) {
                        $('.Clase_Listar_IpsAsig').css({ width: $('#' + HOJA + '_Modal_Consulta_IpsAsig')[0].offsetWidth });
                        var output = [];
                        angular.forEach($scope[HOJA].Busqueda.IpsAsig.Listado, function (x) {
                            if (x.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.CODIGO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                                output.push({ "CODIGO": x.CODIGO, "NOMBRE": x.NOMBRE.toUpperCase() });
                            }
                        });
                        $scope[HOJA].Busqueda.IpsAsig.Filtro = output;
                        $scope[HOJA].Busqueda.IpsAsig.Seleccion = 9999;
                    }
                }
            }
            $scope.FillTextbox_Listado_IpsAsig = function (codigo, nombre, HOJA) {
                $scope[HOJA].Modal_Consulta_IpsAsig_Cod = codigo;
                $scope[HOJA].Modal_Consulta_IpsAsig = codigo + ' - ' + nombre;
                $scope[HOJA].Busqueda.IpsAsig.SAVE = codigo + ' - ' + nombre;
                $scope[HOJA].Busqueda.IpsAsig.Filtro = null;
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
            }
            $scope.Blur_IpsAsig = function (HOJA) {
                setTimeout(() => {
                    if ($scope[HOJA] != null && $scope[HOJA].Form != undefined) {
                        if (($scope[HOJA].Busqueda.IpsAsig.Filtro == null || $scope[HOJA].Busqueda.IpsAsig.Filtro.length == 0)
                            && $scope[HOJA].Modal_Consulta_IpsAsig != $scope[HOJA].Busqueda.IpsAsig.SAVE) {
                            $scope[HOJA].Modal_Consulta_IpsAsig = $scope[HOJA].Busqueda.IpsAsig.SAVE;
                        }
                        if ($scope[HOJA].Modal_Consulta_IpsAsig == '') {
                            $scope[HOJA].Modal_Consulta_IpsAsig = $scope[HOJA].Busqueda.IpsAsig.SAVE;
                            $scope[HOJA].Busqueda.IpsAsig.Filtro = null;
                        }
                    }
                    $scope.$apply();
                }, 300);
            }
            ////////////////////////////////////////////////////////////////////////////////////////////
            $scope.Descargar_Soporte = function (ruta, ftp) {
                $http({
                    method: 'POST',
                    url: "php/altocosto/siniestros/gestionsiniestros.php",
                    data: {
                        function: 'descargaAdjunto',
                        ruta: ruta,
                        ftp: ftp
                    }
                }).then(function (response) {
                    var win = window.open("temp/" + response.data, '_blank');
                    win.focus();
                });
            }

            $scope.ValFecha = function (SCOPE) {
                if ($scope.Vista2[SCOPE] == undefined) {
                    $scope.Vista2[SCOPE] = $scope.SysDay;
                }
                if ($scope.Vista2[SCOPE] > $scope.SysDay) {
                    $scope.Vista2[SCOPE] = $scope.SysDay;
                }
            }
            $scope.GetFecha = function (SCOPE) {
                var ahora_ano = $scope.Vista2[SCOPE].getFullYear();
                var ahora_mes = ((($scope.Vista2[SCOPE].getMonth() + 1) < 10) ? '0' + ($scope.Vista2[SCOPE].getMonth() + 1) : ($scope.Vista2[SCOPE].getMonth() + 1));
                var ahora_dia = ((($scope.Vista2[SCOPE].getDate()) < 10) ? '0' + ($scope.Vista2[SCOPE].getDate()) : ($scope.Vista2[SCOPE].getDate()));
                return ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
            }
            $scope.GetFechaSys = function (SCOPE) {
                var ahora_ano = $scope[SCOPE].getFullYear();
                var ahora_mes = ((($scope[SCOPE].getMonth() + 1) < 10) ? '0' + ($scope[SCOPE].getMonth() + 1) : ($scope[SCOPE].getMonth() + 1));
                var ahora_dia = ((($scope[SCOPE].getDate()) < 10) ? '0' + ($scope[SCOPE].getDate()) : ($scope[SCOPE].getDate()));
                return ahora_ano + '-' + ahora_mes + '-' + ahora_dia;
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
            $scope.setTab_Actualizar = function (x) {
                $scope.Tabs_Actualizar = x;
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
            $scope.FormatPeso = function (NID) {
                const input = document.getElementById('' + NID + '');
                var valor = input.value;
                valor = valor.replace(/[^0-9,]/g, '');
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
            $scope.Obtener_Tipos_Documentos = function () {
                $http({
                  method: 'POST',
                  url: "php/genesis/funcgenesis.php",
                  data: {
                    function: 'Obtener_Tipos_Documentos',
                    Tipo: 'S'
                  }
                }).then(function (response) {
                  if (response.data && response.data.toString().substr(0, 3) != '<br') {
                    $scope.Tipos_Documentos = response.data;
                  } else {
                    swal({
                      title: "¡Ocurrio un error!",
                      text: response.data,
                      type: "warning"
                    }).catch(swal.noop);
                  }
                });
              }
              $scope.Obtener_Tipos_Documentos();


        }
    ]).filter('startFrom', function () {
        return function (input, start) {
            if (input != undefined) {
                start = +start;
                return input.slice(start);
            }
        }
    });