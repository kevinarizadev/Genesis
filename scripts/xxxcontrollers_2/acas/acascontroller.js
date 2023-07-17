'use strict';
angular.module('GenesisApp')
    .controller('acascontroller', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', 'communication', '$rootScope',
        function ($scope, $http, notification, acasHttp, ngDialog, communication, $rootScope) {
            $scope.cardips = true;
            $scope.gifsolicitudacas = false;
            $scope.solicitudacas = false;
            $scope.filtroarea = ' ';
            $scope.valormodal = '1';
            $scope.barrio = '1';
            $scope.descripcion = '';
            $scope.filtroconcepto = ' ';
            $scope.filtromotivo = ' ';
            $scope.filtroasunto = ' ';
            $scope.vw_prioridad = true;
            $scope.caracteres = 0;
            $scope.nombre_acas = 'Generar Servicio';
            $scope.filtro = {
                tercero: false,
                act_correo: false
            };
            $scope.descripcion = '';
            $scope.count = 0;

            $scope.OcultarCampoCartera = false;
            // $scope.tipoaportante = '0';
            // $scope.numaportante = ' ';


            var dat = { prov: 'navb' }
            $.getJSON("php/obtenersession.php", dat)
                .done(function (respuesta) {
                    $scope.sesdata = respuesta;
                    $scope.cedula = $scope.sesdata.cedula;
                    $scope.ubicacion = $scope.sesdata.codmunicipio;
                    $scope.nombre_comp = $scope.sesdata.nombre;
                    /*acasHttp.obtenerCalificacion($scope.cedula).then(function (response) {
                        $scope.calificaciones = response.data;
                        if ($scope.calificaciones.codigo == '1') {
                            notification.getNotification('warning', $scope.calificaciones.mensaje, 'Notificacion');
                        } else {
                            //esperado a que texto se le pone.
                            //notification.getNotification('warning', $scope.calificaciones.mensaje,'Notificacion');
                        }
                    })*/
                    acasHttp.obtenerInformacionCOCE($scope.cedula).then(function (response) {
                        if (response.data.codigo == 0) {
                            $scope.celular_info = response.data.celular;
                            $scope.correo_info = response.data.correo;
                            ngDialog.open({
                                template: 'views/acas/actualizarinfofuncionario.html',
                                className: 'ngdialog-theme-default',
                                width: '80%',
                                controller: 'actinfofuncionariocontroller',
                                controllerAs: 'actinfoctrl',
                                scope: $scope
                            })
                        }
                    })
                    acasHttp.obtenerArea().then(function (response) {
                        $scope.areas = response.data;
                    })
                    acasHttp.obtenerPrestador($scope.ubicacion).then(function (response) {
                        $scope.prestadores = response.data;
                    })

                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.log("navbar error obteniendo variables");
                });

            $scope.actualizar_funcionario = function () {
                ngDialog.open({
                    template: 'views/acas/actualizarinfofuncionario.html',
                    className: 'ngdialog-theme-default',
                    width: '80%',
                    controller: 'actinfofuncionariocontroller',
                    controllerAs: 'actinfoctrl',
                    scope: $scope
                })
            }


            $scope.notpaastenot = function () {
                var Evoldesc = document.getElementById('exampleFormControlTextarea6');
                Evoldesc.onpaste = function (e) {
                    e.preventDefault();
                    swal('Notificacion', "La accion pegar no esta permitida en este campo. ", 'error');
                }

                Evoldesc.oncopy = function (e) {
                    e.preventDefault();
                    swal('Notificacion', "La accion copiar no esta permitida en este campo. ", 'error');
                }
            }

            acasHttp.obtenerBarrios().then(function (response) {
                $scope.barriostest = response.data;
                //$scope.barriostest.sort();
            })


            $scope.limpiar = function () {
                $scope.filtroarea = ' ';
                $scope.filtroconcepto = ' ';
                $scope.filtromotivo = ' ';
                $scope.filtroasunto = ' ';
                $scope.vw_prioridad = true;
                $scope.descripcion = '';
                $scope.filtro = {
                    tercero: false
                };
                $scope.clase = "status white darken-4 tag";
                $scope.terceros = '';
                $('#anexo2adj')[0].value = '';
                $('input[type=file]')[0].value = '';
                $scope.count = 0;

                $scope.OcultarCampoCartera = false;
                $scope.tipoaportante = '0';
                $scope.numaportante = '';
                $scope.conceptos = [];
                $scope.motivos = [];
                $scope.asuntos = [];
                $scope.nuevonombre = '';
                $('#textadj')[0].value = '';
                $scope.$apply();


            }
            $scope.handleKeyPress = function (e) {
                if ($scope.descripcion == null || $scope.descripcion == undefined || $scope.descripcion == '') { $scope.count = 0; }
                if ($scope.descripcion.length < $scope.count) { $scope.count = $scope.descripcion.length }
                else ($scope.descripcion.length > $scope.count)
                { $scope.count = $scope.descripcion.length }


                if (e.keyCode == 8) {
                    if ($scope.count == 0) {
                        $scope.count = 0;
                    }
                    else {
                        $scope.count = $scope.count - 1;
                    }
                } else {
                    $scope.count = $scope.count + 1;
                }
            }

            $scope.HabilitarCampoCartera = function () {
                if ($scope.filtroarea == '31' && $scope.filtroconcepto == 'CE') {
                    $scope.OcultarCampoCartera = true;
                } else {
                    $scope.OcultarCampoCartera = false;
                }
            }



            $scope.obtenerconcepto = function () {
                if ($scope.filtroarea != '0' && $scope.filtroarea != '? undefined:undefined ?') {
                    $scope.textarea = $('#areaid option:selected').text();
                    $scope.HabilitarCampoCartera();
                    acasHttp.obtenerConcepto($scope.filtroarea).then(function (response) {
                        $scope.conceptos = response.data;
                    })
                    $scope.obtenermotivo();
                }
            }

            $scope.obtenermotivo = function () {

                if ($scope.filtroconcepto != '0' && $scope.filtroconcepto != '? undefined:undefined ?') {
                    if ($scope.filtroarea == '18') { $scope.docval = 'RE'; } else { $scope.docval = 'RE'; }
                    $scope.HabilitarCampoCartera();
                    $scope.motivos = [];
                    acasHttp.obtenerMotivo($scope.docval, $scope.filtroconcepto).then(function (response) {
                        $scope.motivos = response.data;
                    })
                }
                $scope.obtenerasunto();
            }

            $scope.obtenerasunto = function () {
                if ($scope.filtroarea == '18') { $scope.docval = 'RE'; } else { $scope.docval = 'RE'; }
                $scope.asuntos = [];
                acasHttp.obtenerAsunto($scope.docval, $scope.filtroconcepto, $scope.filtromotivo).then(function (response) {
                    $scope.asuntos = response.data;
                })
            }

            $scope.obtenercorreo = function () {
                acasHttp.obtenercorreo($scope.lista_prestador).then(function (response) {
                    $scope.correo_prestador = response.data[0].EMAIL;
                })
            }

            $scope.actualizarcorreoips = function () {
                acasHttp.actualizarcorreoips($scope.lista_prestador, $scope.correo_prestador).then(function (response) {
                    if (response.data.codigo == 1) {
                        notification.getNotification('success', response.data.mensaje, 'Notificación');
                        $scope.obtenercorreo();
                    } else {
                        notification.getNotification('error', response.data.mensaje, 'Notificación')
                    }
                })
            }

            $scope.obtenercorreoips = function () {
                if ($scope.filtroconcepto != '0' && $scope.filtroconcepto != '? undefined:undefined ?') {
                    acasHttp.obtenerMotivo('RE', $scope.filtroconcepto).then(function (response) {
                        $scope.motivos = response.data;
                    })
                }
            }

            $scope.validaradjunto = function () {
                if ($('#anexo2adj').val() == '') {
                    $scope.adjanexo2 = false;
                } else {
                    $scope.adjanexo2 = true;
                }
            }

            $scope.validainsertaaca = function () {
                $scope.ruta = $scope.ftp + $scope.folder + $scope.fechacarpeta + $scope.nuevonombre;
                $scope.asuntoacas = $('#asuntoid option:selected').text();
                if ($scope.filtro.tercero == true) {
                    if ($scope.filtroarea == '18') { $scope.docval = 'RE'; } else { $scope.docval = 'RE'; }
                    $scope.barrio = '1';
                    //if ($scope.tipoaportante == '0') {$scope.tipoaportante = ''}
                    acasHttp.insertarAcas($scope.docval,
                        communication.data.tercero_ubicacion,
                        $scope.filtroconcepto,
                        $scope.filtromotivo, '',
                        $scope.descripcion.toString().toUpperCase(), communication.data.tercero_cedula, $scope.filtroasunto, $scope.prioridad.substr(0, 1), $scope.barrio, $scope.tipoaportante, $scope.numaportante).then(function (response) {
                            swal.close();
                            if (response.data.codigo == 1) {
                                $scope.numeroacascel = response.data.mensaje;
                                $scope.celularacas = response.data.celular;
                                $scope.nombreacas = response.data.nombre;
                                notification.getNotification('success', "Su número " + response.data.mensaje + " fue realizado correctamente. Gracias por utilizar nuestra mesa de servicio Web ", 'Notificación');
                                if ($scope.celularacas == 0) {
                                    notification.getNotification('info', "Por favor actualice su número de celular en mi hoja de vida ", 'Notificación');
                                }
                                setTimeout(function () {
                                    $http({
                                        method: 'POST',
                                        url: "https://api.infobip.com/sms/1/text/single",
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
                                            'accept': 'application/json'
                                        },
                                        data: {
                                            "from": "CajacopiEPS",
                                            "to": "57" + $scope.celularacas,
                                            "text": "Sr(a). " + $scope.nombreacas + " Solicitud  con número " + $scope.numeroacascel + " fue registrado correctamente. Sera atendido por nuestra mesa de servicio. Gracias por utilizar nuestra plataforma. CajacopiEPS "
                                        }
                                    }).then(function (response) {
                                        console.log(response);
                                        $scope.gifsolicitudacas = false;
                                        $scope.solicitudacas = false;
                                        $scope.nombre_acas = 'Generar Servicio';
                                    });
                                }, 500);
                                $scope.limpiar();

                            } else {
                                if (response.data.codigo == 2) {
                                    notification.getNotification('error', response.data.mensaje, 'Notificación');
                                    $scope.actualizar_funcionario();
                                } else {
                                    notification.getNotification('error', response.data.mensaje, 'Notificación');
                                }
                            }
                        })
                } else {
                    if ($scope.filtroarea == '18') {
                        $scope.docval = 'RE';
                    } else {
                        $scope.docval = 'RE';
                    }
                    // if ($scope.tipoaportante == '0') {$scope.tipoaportante = ''}
                    acasHttp.insertarAcas($scope.docval, $scope.ubicacion, $scope.filtroconcepto, $scope.filtromotivo, '', $scope.descripcion.toString().toUpperCase(), $scope.cedula, $scope.filtroasunto, $scope.prioridad.substr(0, 1), $scope.barrio, $scope.tipoaportante, $scope.numaportante).then(function (response) {
                        swal.close();
                        if (response.data.codigo == 1) {
                            $scope.numeroacascel = response.data.mensaje;
                            $scope.celularacas = response.data.celular;
                            $scope.nombreacas = response.data.nombre;
                            if ($scope.celularacas == 0) {
                                notification.getNotification('info', "Por favor actualice su número de celular en mi hoja de vida ", 'Notificación');
                            }
                            swal('Notificacion', "Su solicitud fue realizada correctamente. <br> Su codigo de servicio es " + response.data.mensaje + " <br> Gracias por utilizar nuestra mesa de servicio web ", 'success')
                            //notification.getNotification('success', "Su número "+ response.data.mensaje  +" fue realizado correctamente. Gracias por utilizar nuestra mesa de servicio web ",'Notificacion');
                            setTimeout(function () {
                                $http({
                                    method: 'POST',
                                    url: "https://api.infobip.com/sms/1/text/single",
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
                                        'accept': 'application/json'
                                    },
                                    data: {
                                        "from": "CajacopiEPS",
                                        "to": "57" + $scope.celularacas,
                                        "text": "Sr(a). " + $scope.nombreacas + " Solicitud  con número " + $scope.numeroacascel + " fue registrado correctamente . Será atendido por nuestra mesa de servicio. Gracias por utilizar nuestra plataforma. CajacopiEPS "
                                    }
                                }).then(function (response) {
                                    console.log(response);
                                    $scope.gifsolicitudacas = false;
                                    $scope.solicitudacas = false;
                                    $scope.nombre_acas = 'Generar Servicio';
                                });
                            }, 500);
                            $scope.limpiar();

                        } else {
                            if (response.data.codigo == 2) {
                                notification.getNotification('error', response.data.mensaje, 'Notificación');
                                $scope.actualizar_funcionario();
                            } else {
                                notification.getNotification('error', response.data.mensaje, 'Notificación');
                            }
                        }
                    })
                }
            }


            $scope.llenavariables = function () {
                var filename = $('input[type=file]').val();
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();
                dd < 10 ? dd = '0' + dd : dd = dd
                mm < 10 ? mm = '0' + mm : mm = mm
                var hora = today.getHours();
                var min = today.getMinutes();
                var seg = today.getSeconds();
                $scope.fechacarpeta = dd + mm + yyyy + "/";
                $scope.ext = filename.split('.').pop();
                $scope.tipodocumentoa = 'CC';
                if ($scope.filtro.tercero == true) {
                    $scope.documentoa = communication.data.tercero_cedula;
                    $scope.doct = communication.data.tercero_ubicacion;
                } else {
                    $scope.documentoa = $scope.cedula;
                    $scope.doct = $scope.ubicacion;
                }
                $scope.ftp = $PATH_FILE;
                $scope.folder = "MesaAyuda/" + $scope.textarea.trim().replace(' ', '') + "/";
                $scope.nuevonombre = '132_' + $scope.tipodocumentoa + "_" + $scope.documentoa + "_" + dd + mm + yyyy + hora + min + seg + "." + $scope.ext;

                $scope.obs = $scope.descripcion;
                $scope.conc = $scope.filtroconcepto;
                $scope.mot = $scope.filtromotivo;
                $scope.asunto = $scope.filtroasunto;
                $scope.priori = $scope.prioridad.substr(0, 1);



            }


            $scope.insertaracas = function (id) {
                console.log(id);
                var validador_alerta = false;
                if ($scope.filtroarea == '35' && ($scope.filtroconcepto == 'TA' || $scope.filtroconcepto == 'AE') && (document.querySelector("#anexo2adj").files.length == 0)) {
                    validador_alerta = true;
                }

                if (validador_alerta == false) {
                    swal({
                        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                        width: 200,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        animation: false
                    });
                    $scope.nombre_acas = 'Enviando Servicio..';
                    $scope.gifsolicitudacas = true;
                    $scope.solicitudacas = true;
                    //debugger
                    if ($scope.filtroconcepto != '0' && $scope.filtroconcepto != '0' && $scope.filtroconcepto != '0' && $scope.descripcion != '' && $scope.filtroasunto != '' && $scope.filtroasunto != '0') {
                        $scope.validaradjunto();
                        if ($scope.filtroarea == '6' || $scope.adjanexo2 == true) {
                            if ($scope.adjanexo2 == true) {
                                if ($scope.descripcion.length >= 30) {
                                    $scope.llenavariables();
                                    setTimeout(function () {
                                        var anexo = new FormData($("#anexo2")[0]);
                                        $.ajax({
                                            url: "php/acas/uploadanexoacas.php",
                                            type: "POST",
                                            data: anexo,
                                            contentType: false,
                                            processData: false,
                                            dataType: 'json'
                                        }).done(function (data) {
                                            swal.close();
                                            if (data.codigo == "1") {
                                                $scope.numeroacascel = data.mensaje;
                                                $scope.celularacas = data.celular;
                                                $scope.nombreacas = data.nombre;
                                                notification.getNotification('success', "Su número " + data.mensaje + " y su archivo adjunto fueron cargados correctamente. Gracias por utilizar nuestra mesa de servicio web ", 'Notificación');
                                                if ($scope.celularacas == 0) {
                                                    notification.getNotification('info', "Por favor actualice su número de celular en mi hoja de vida ", 'Notificación');
                                                }
                                                setTimeout(function () {
                                                    $http({
                                                        method: 'POST',
                                                        url: "https://api.infobip.com/sms/1/text/single",
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
                                                            'accept': 'application/json'
                                                        },
                                                        data: {
                                                            "from": "CajacopiEPS",
                                                            "to": "57" + $scope.celularacas,
                                                            "text": "Sr(a). " + $scope.nombreacas + " Solicitud  con número " + $scope.numeroacascel + " fue registrado correctamente. Sera atendido por nuestra mesa de servicio. Gracias por utilizar nuestra plataforma. CajacopiEPS "
                                                        }
                                                    }).then(function (response) {
                                                        console.log(response);
                                                        $scope.gifsolicitudacas = false;
                                                        $scope.solicitudacas = false;
                                                        $scope.nombre_acas = 'Generar Solicitud';
                                                    });
                                                }, 500);
                                                $scope.limpiar();
                                            } else {
                                                if (data.codigo == 2) {
                                                    notification.getNotification('error', data.mensaje, 'Notificación');
                                                    $scope.actualizar_funcionario();
                                                } else {
                                                    if (data.mensaje == undefined) {
                                                        notification.getNotification('warning', 'Por favor intente de nuevo para subir el archivo adjunto...', 'Notificación');
                                                    } else {
                                                        notification.getNotification('error', data.mensaje, 'Notificación');
                                                    }
                                                }
                                            }
                                        })
                                    }, 100);
                                } else {
                                    swal.close();
                                    notification.getNotification('error', 'La Descripcion de la solicitud no puede ser menor a 30 Caracteres', 'Notificación')
                                }
                            } else {
                                swal.close();
                                notification.getNotification('error', 'Por favor adjuntar los documentos correspodiente', 'Notificación')
                            }
                        } else {
                            $scope.validainsertaaca();
                        }
                    } else {
                        swal.close();
                        notification.getNotification('error', "Su servicio no se realizo correctamente, por favor llenar los campos obligatorios. ", 'Notificación');
                    }
                    $scope.gifsolicitudacas = false;
                    $scope.solicitudacas = false;
                    $scope.nombre_acas = 'Generar Solicitud';

                } else {
                    swal('Notificacion', "¡Debe diligenciar el formato de Reporte de alerta temprana y adjuntarlo!", 'info');
                }
            }

            $rootScope.$on('ngDialog.closed', function (e, $dialog) {
                if (communication.data.value == true) {
                    $scope.terceros = communication.data.tercero_nombre;
                    notification.getNotification('info', $scope.terceros + " asignado correctamente! ", 'Notificación');
                    communication.data.value = false;
                } else { $scope.filtro.tercero = false; }
            });



            $scope.barriosForm = function () {
                if ($scope.filtroconcepto == 'AX' && $scope.filtromotivo == '5') {
                    $scope.dialog = ngDialog.open({
                        template: 'views/acas/modal/modalbarrios.html',
                        className: 'ngdialog-theme-default',
                        controller: 'ModalBarriosController',
                        scope: $scope
                    });
                    $scope.dialog.closePromise.then(function (data) {
                        if (data.value != "$document") {
                            $scope.barriomodal = {
                                barrio1: data.value.barrioida,
                                barrio2: data.value.barriovuelta
                            }
                            $scope.barrio = $scope.barriomodal.barrio1 + '-' + $scope.barriomodal.barrio2;
                            console.log($scope.barrio);
                        }
                    });
                }
            }



            $scope.obtenerprioridad = function () {

                if ($scope.filtroconcepto == 'AU' && $scope.filtromotivo == '2') {
                    var effect = $('.effect');
                    effect.animate({ opacity: '0.4' }, "slow");
                    effect.animate({ width: '100%', opacity: '0.8' }, "slow");
                    $scope.cardips = false;
                } else {
                    $scope.cardips = true;
                }
                if ($scope.filtroarea == '18') { $scope.docval = 'TH'; } else { $scope.docval = 'RE'; }
                acasHttp.obtenerPrioridad($scope.docval, $scope.filtroconcepto, $scope.filtromotivo, $scope.filtroasunto).then(function (response) {
                    $scope.prioridad = response.data[0].PRIORIDAD;
                    $scope.vw_prioridad = false;
                    switch ($scope.prioridad) {
                        case "A":
                            $scope.prioridad = "Alta";
                            $scope.clase = "status red darken-4 tag";
                            break;
                        case "M":
                            $scope.prioridad = "Media";
                            $scope.clase = "status orange darken-4 tag";
                            break;
                        case "B":
                            $scope.prioridad = "Baja";
                            $scope.clase = "status green darken-4 tag";
                            break;
                        default:
                    }

                    if ($scope.filtroconcepto == 'AX' && $scope.filtromotivo == '5') {
                        $scope.barriosForm();
                    }
                    if ($scope.filtroconcepto == 'AX' && $scope.filtromotivo == "3") {
                        //if ($scope.filtroasunto == '1374' || $scope.filtroasunto == '1408' || $scope.filtroasunto == '1410' || $scope.filtroasunto == '4053') {
                        if ($scope.filtroasunto == '4089' || $scope.filtroasunto == '4086' || $scope.filtroasunto == '4091' || $scope.filtroasunto == '4053') {
                            $scope.Administrativa_Prod();
                        }
                    }
                })

            }


            $scope.close = function () {
                $scope.cardips = true;
            }

            $scope.obtenertercero = function () {
                if ($scope.filtro.tercero == true) {
                    ngDialog.open({
                        template: 'views/acas/acastercero.html',
                        controller: 'acastercerocontroller',
                        controllerAs: 'atcoctrl',
                        scope: $scope
                    });
                } else { $scope.terceros = ''; }
            }

            $scope.Administrativa_Prod = function () {
                (function () {
                    $('#modal_Productos').modal();
                }());
                $('#modal_Productos').modal('open');
                //
                var concepto = ($scope.filtroasunto == '4086') ? 'PA' : ($scope.filtroasunto == '4089') ? 'AC' : ($scope.filtroasunto == '4091') ? 'BOT' : 'PB';
                //var concepto = ($scope.filtroasunto == '1374') ? 'PA' : ($scope.filtroasunto == '1408') ? 'AC' : ($scope.filtroasunto == '1410') ? 'BOT' : 'PB';
                $http({
                    method: 'POST',
                    url: "php/gestiondocumental/adminventario.php",
                    data: {
                        function: 'BuscarProductoAcas',
                        concepto: concepto
                    }
                }).then(function (response) {
                    $scope.Lista_MD_Productos = response.data;
                    $scope.Filter_Productos = response.data;
                    $('#list-group-producto').css({ width: $('#MPproducto')[0].offsetWidth });
                });
            }

            $scope.Abrirmodal = function () {
                (function () {
                    $('#modal_Productos').modal();
                }());
                $('#modal_Productos').modal('open');
            }
            $scope.Cerrar_modal_Productos = function () {
                $('#modal_Productos').modal('close');
            }
            $scope.Complete_Productos = function (string) {
                $('#list-group-producto').css({ width: $('#MPproducto')[0].offsetWidth });
                if ($scope.MPproducto != null && $scope.MPproducto != '') {
                    if ($scope.Lista_MD_Productos != null && $scope.Lista_MD_Productos != 0) {
                        var output = [];
                        angular.forEach($scope.Lista_MD_Productos, function (Lista_MD_Productos) {
                            if (Lista_MD_Productos.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                                output.push({
                                    "NOMBRE": Lista_MD_Productos.NOMBRE.toUpperCase()
                                });
                            }
                        });
                        $scope.Filter_Productos = output;
                    }
                }
                if ($scope.MPproducto == '' || $scope.MPproducto == undefined) {
                    $scope.Filter_Productos = $scope.Lista_MD_Productos;
                }
            }
            $scope.FillTextbox_Productos = function (nombre) {
                $scope.MPproducto = nombre;
                $scope.MPproducto_SAVE = nombre;
                $scope.MPcantidad = 1;
                $scope.Filter_Productos = null;
            }
            $scope.MP_Anadir = function () {
                if ($scope.MPproducto_SAVE != '' && $scope.MPcantidad <= 1000 && $scope.MPproducto_SAVE != undefined) {
                    if ($scope.descripcion == '') {
                        $scope.descripcion = '(' + $scope.MPcantidad + ') ' + $scope.MPproducto;
                    } else {
                        $scope.descripcion = $scope.descripcion + ', (' + $scope.MPcantidad + ') ' + $scope.MPproducto;
                    }
                    $scope.MPproducto = '';
                    $scope.MPproducto_SAVE = '';
                    $scope.MPcantidad = 1;
                    $scope.Filter_Productos = $scope.Lista_MD_Productos;
                }
            }

        }
    ]);