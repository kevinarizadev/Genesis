'use strict';
angular.module('GenesisApp')
    .controller('reservastecnicasController', ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter',
        function($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter) {

            $(function() {
                $('#modalafi').modal();
                $('#modal_ver').modal();


                $scope.anno = '0';
                $scope.periodo = '1';
                $scope.cedula = '0';
                $scope.ver_descarga = true;
                //datos de sesion como cedula y ubicacion
                var dat = { prov: 'navb' }
                $.getJSON("php/obtenersession.php", dat)
                    .done(function(respuesta) {
                        $scope.cedula = $scope.sesdata.cedula;
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log("navbar error obteniendo variables");
                    });
                //Fin datos de sesion como cedula y ubicacion
            });

            $http({
                method: 'POST',
                url: "php/financiera/pagosips.php",
                data: { function: 'obteneranno' }
            }).then(function(response) {
                $scope.annos = response.data;
                $scope.anno = new Date().getFullYear();
                $scope.obtenerperiodo();
            })


            $scope.Calacular = function() {
                // if(){

                // }
                $http({
                    method: 'POST',
                    url: "php/financiera/reservastecnicas.php",
                    data: { function: 'calcular', panno: $scope.anno, pperiodo: $scope.periodo, pconsecutivo: $scope.consecutivo, pcedula: $scope.cedula }
                }).then(function(response) {
                    if (response.data.codigo_err == "0") {
                        swal('Completado', response.data.observacion_err, 'success');
                    } else {
                        swal('Importante', response.data.observacion_err, 'warning');
                    }
                })

            }

            $scope.RestablecerValores = function() {

                $http({
                    method: 'POST',
                    url: "php/financiera/reservastecnicas.php",
                    data: { function: 'restaurarvalores', panno: $scope.anno, pperiodo: $scope.periodo, pbase: $scope.base, pllave: $scope.llave, pconsecutivo: $scope.consecutivo, pcedula: $scope.cedula }
                }).then(function(response) {
                    if (response.data.codigo_err == "0") {
                        swal('Completado', "Registro de Reserva Realizado", 'success');
                        $('#modalafi').modal('close');
                    } else {
                        swal('Importante', response.data.observacion_err, 'warning');
                    }
                })

            }


            $scope.obtenerperiodo = function() {
                if ($scope.anno != null && $scope.anno != undefined && $scope.anno != '' && $scope.anno != ' ' && $scope.anno != '0') {
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/financiera/pagosips.php",
                        data: { function: 'obtenerperiodo', panno: $scope.anno }
                    }).then(function(response) {
                        $scope.periodos = response.data;
                        swal.close();
                    })
                }
                  $scope.periodo = "1";
            }

            $scope.openmodal = function(base, codigo) {
                $scope.base = base;
                $('#modalafi').modal("open");
                if (codigo == '1') {
                    $scope.Ocultar = false;
                } else {
                    $scope.Ocultar = true;
                }


            }


            $scope.modal_ver = function(codigo) {
                $scope.ver_ajustes = [];
                $http({
                    method: 'POST',
                    url: "php/financiera/reservastecnicas.php",
                    data: {
                        function: 'p_obtener_ajuste',
                        codigo: codigo,
                        consecutivo: $scope.consecutivo
                    }
                }).then(function(response) {
                    if (response.data[0].ERROR == 1) {
                        swal('Importante', response.data[0].MENSAJE, 'warning');
                    } else {
                        console.log(response.data);
                        $scope.ver_ajustes = response.data;
                        $('#modal_ver').modal("open");
                        if (codigo == '1') {
                            $scope.Ocultar = false;
                        } else {
                            $scope.Ocultar = true;
                        }
                    }
                })
            }

            $scope.BuscarReserva = function() {
                $scope.ver_descarga = true;
                $http({
                    method: 'POST',
                    url: "php/financiera/reservastecnicas.php",
                    data: { function: 'validareservagen', panno: $scope.anno, pperiodo: $scope.periodo }
                }).then(function(response) {
                    if (response.data == "0") {
                        $scope.InsertaReserva();
                        //alert('Hola1');
                    } else {
                        //alert('Hola2');
                        $scope.consecutivo = response.data;
                        //alert($scope.consecutivo);
                        $scope.obtenerlistareserva();
                    }

                })
            }

            $scope.obtenerlistareserva = function() {
                $scope.periodo=  $scope.periodo ==undefined?'1': $scope.periodo;
                swal.showLoading();
                $scope.ver_descarga = false;
                $http({
                    method: 'POST',
                    url: "php/financiera/reservastecnicas.php",
                    data: { function: 'obtenerlistareserva', panno: $scope.anno, pperiodo: $scope.periodo }
                }).then(function(response) {
                    $scope.reservas = response.data.base;
                    $scope.IBNR = response.data.ibnr[0].IBNR;
                    swal.close();
                })
            }

            $scope.InsertaReserva = function() {
                swal({
                    title: 'Confirmar',
                    text: "Se generará Reservas Tecnicas para el periodo: " + $scope.anno + "-" + $scope.periodo,
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result) {
                        $http({
                            method: 'POST',
                            url: "php/financiera/reservastecnicas.php",
                            data: { function: 'InsertaReserva', panno: $scope.anno, pperiodo: $scope.periodo, cedula: $scope.cedula }
                        }).then(function(response) {
                            if (response.data.codigo_err == "1") {
                                //notification.getNotification('error', "Inconvenientes en Registro de Reserva - "+response.data.observacion_err, 'Notificacion');
                                swal('Importante', "Inconvenientes en Registro de Reserva - " + response.data.observacion_err, 'warning')
                            } else {
                                //notification.getNotification('success', "Registro de Reserva Realizado", 'Notificacion');
                                swal('Completado', "Registro de Reserva Realizado", 'success')
                                $scope.limpiar();
                            }
                        })
                    }
                })
            }

            $scope.limpiar = function() {
                $scope.anno = '0';
                $scope.periodo = '0';
                $scope.ver_descarga = true;
            }

            $scope.reGenerarReserva = function() {
                swal({
                    title: 'Confirmar',
                    text: "Se perderán los datos generados, se generará nuevamente las bases en el periodo: " + $scope.anno + "-" + $scope.periodo,
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result) {
                        $http({
                            method: 'POST',
                            url: "php/financiera/reservastecnicas.php",
                            data: { function: 'ActualizaReserva', panno: $scope.anno, pperiodo: $scope.periodo, cedula: $scope.cedula }
                        }).then(function(response) {
                            if (response.data.codigo_err == "1") {
                                swal('Importante', "Inconvenientes en Registro de Reserva - " + response.data.observacion_err, 'warning')
                                    //notification.getNotification('Advertencia', "Inconvenientes en Registro de Reserva - "+response.data.observacion_err, 'Notificacion');
                            } else {
                                //notification.getNotification('success', "Registro de Reserva Realizado", 'Notificacion');
                                swal('Completado', "Registro de Reserva Realizado", 'success')
                                $scope.limpiar();
                            }
                        })
                    }
                })
            }

            //Descarga de Base
            $scope.DescargaTxt = function(res) {
                swal.showLoading();
                window.open("php/financiera/baseReservaTxt.php?panno=" + $scope.anno +
                    "&pperiodo=" + $scope.periodo +
                    "&pbase=" + res.NUMERO +
                    "&pconsulta_base=" + res.CONSULTA_BASE);
                swal.close();
            }

            //Descarga del Triangulo
            $scope.DescargaXls = function(res) {
                swal.showLoading();
                window.open("php/financiera/baseReservaTri.php?panno=" + $scope.anno +
                    "&pperiodo=" + $scope.periodo +
                    "&pbase=" + res.NUMERO +
                    "&pconsulta_triangulo=" + res.CONSULTA_TRIANGULO);
                swal.close();
            }

            //Descarga del Triangulo Consolidado
            $scope.DescargaXlsCon = function(res) {
                swal.showLoading();
                window.open("php/financiera/baseReservaTriCon.php?panno=" + $scope.anno +
                    "&pperiodo=" + $scope.periodo);
                swal.close();
            }

            //Descarga del Triangulo Consolidado
            $scope.DescargaXlsLog = function(res) {
                swal.showLoading();
                window.open("php/financiera/baseReservaTriLog.php?panno=" + $scope.anno +
                    "&pperiodo=" + $scope.periodo);
                swal.close();
            }

            //Generacion del Triangulo
            $scope.Gentri = function(res) {

                swal({
                    title: 'Confirmar',
                    text: "Se generará El triangulo " + res.NUMERO + " para el periodo: " + $scope.anno + "-" + $scope.periodo,
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result) {
                        swal({
                            title: 'Por favor Espere.',
                            text: 'Construccion de Trangulo',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false,
                            onOpen: () => {
                                swal.showLoading()
                            }
                        })
                        $http({
                            method: 'POST',
                            url: "php/financiera/reservastecnicas.php",
                            data: { function: 'GeneraTriangulo', panno: $scope.anno, pperiodo: $scope.periodo, ptriangulo: res.NUMERO }
                        }).then(function(response) {
                            if (response.data.codigo_err == "1") {
                                swal('Importante', response.data.observacion_err, 'warning')
                                    //notification.getNotification('Advertencia', "Inconvenientes en Registro de Reserva - "+response.data.observacion_err, 'Notificacion');
                            } else {
                                //notification.getNotification('success', "Registro de Reserva Realizado", 'Notificacion');
                                swal('Completado', "Registro de Reserva Realizado", 'success')
                            }
                        })
                    }
                })
            }

            $scope.GenCon = function(res) {
                swal({
                    title: 'Confirmar',
                    text: "Se generará Consolidacion para el periodo: " + $scope.anno + "-" + $scope.periodo,
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result) {
                        swal({
                            title: 'Por favor Espere.',
                            text: 'Construccion de Consolidacion de Trangulo',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false,
                            onOpen: () => {
                                swal.showLoading()
                            }
                        })
                        $http({
                            method: 'POST',
                            url: "php/financiera/reservastecnicas.php",
                            data: { function: 'ConsolidaTriangulo', panno: $scope.anno, pperiodo: $scope.periodo }
                        }).then(function(response) {
                            if (response.data.codigo_err == "1") {
                                swal('Importante', response.data.observacion_err, 'warning')
                                    //notification.getNotification('Advertencia', "Inconvenientes en Registro de Reserva - "+response.data.observacion_err, 'Notificacion');
                            } else {
                                //notification.getNotification('success', "Registro de Reserva Realizado", 'Notificacion');
                                swal('Completado', "Registro de Reserva Realizado", 'success')
                            }
                        })
                    }
                })
            }

            $scope.GenCom = function(res) {
                swal({
                    title: 'Confirmar',
                    text: "Se generará Comentarios para el periodo: " + $scope.anno + "-" + $scope.periodo,
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result) {
                        swal({
                            title: 'Por favor Espere.',
                            text: 'Generando Comentarios de Trangulo',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false,
                            onOpen: () => {
                                swal.showLoading()
                            }
                        })
                        $http({
                            method: 'POST',
                            url: "php/financiera/reservastecnicas.php",
                            data: { function: 'ComentariosTriangulo', panno: $scope.anno, pperiodo: $scope.periodo, pconsecutivo: $scope.consecutivo }
                        }).then(function(response) {
                            if (response.data.codigo_err == "1") {
                                swal('Importante', response.data.observacion_err, 'warning')
                                    //notification.getNotification('Advertencia', "Inconvenientes en Registro de Reserva - "+response.data.observacion_err, 'Notificacion');
                            } else {
                                //notification.getNotification('success', "Registro de Reserva Realizado", 'Notificacion');
                                swal('Completado', "Registro de Reserva Realizado", 'success')
                            }
                        })
                    }
                })
            }

            $scope.ActualizaBase = function() {
                swal({
                    title: 'Confirmar',
                    text: "Se realizara ajuste para la base " + $scope.base + " en el periodo: " + $scope.anno + "-" + $scope.periodo,
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result) {
                        swal({
                            title: 'Por favor Espere.',
                            text: 'Realizando Actualizacion',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false,
                            onOpen: () => {
                                swal.showLoading()
                            }
                        })
                        $http({
                            method: 'POST',
                            url: "php/financiera/reservastecnicas.php",
                            data: { function: 'ActualizacionBase', panno: $scope.anno, pperiodo: $scope.periodo, pbase: $scope.base, pllave: $scope.llave, pvalor: $scope.valor, pconsecutivo: $scope.consecutivo, pcedula: $scope.cedula }
                        }).then(function(response) {
                            if (response.data.codigo_err == "1") {
                                swal('Importante', response.data.observacion_err, 'warning')
                                    //notification.getNotification('Advertencia', "Inconvenientes en Registro de Reserva - "+response.data.observacion_err, 'Notificacion');
                            } else {
                                //notification.getNotification('success', "Registro de Reserva Realizado", 'Notificacion');
                                swal('Completado', "Registro de Reserva Realizado", 'success')
                            }
                        })
                    }
                })
            }

        }
    ]);