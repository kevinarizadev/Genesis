'use strict';
angular.module('GenesisApp')
    .controller('acasinfocontroller', ['$scope', '$http', 'acasHttp', '$rootScope', 'communication', 'ngDialog', 'notification',
        function ($scope, $http, acasHttp, $rootScope, communication, ngDialog, notification) {
            $scope.panelIC = false;
            $scope.cod_acas = $scope.numeroacas;
            $scope.cod_estado = $scope.estadoacas;
            $scope.cod_motivo = $scope.motivoacas;
            $scope.cod_concepto = $scope.conceptoacas;
            $scope.codigo_concepto = $scope.codigo_concepto;
            $scope.cod_descripcion = $scope.descripcionacas;
            $scope.cod_adjunto = $scope.adjuntoacas;
            $scope.cod_oficina = $scope.oficina;
            $scope.cod_fecha = $scope.fecha;
            $scope.cod_misacas = $scope.estadoopciones;
            $scope.observacion = '';
            $scope.cod_check_option = $scope.check_option;
            $scope.numeroserial = '';
            $scope.serialverequipo = $scope.serialequipo;

            console.log($scope.cod_check_option)
            // alert($scope.codigo_concepto);
            $http({
                method: 'POST',
                url: "php/acas/obtener_infor_afiltemp.php",
                data: {
                    acas_codigo: $scope.numeroacas
                }
            }).then(function (response) {
                if (response.data.hide == 1) {
                    $scope.infoAfiliado = false;
                    $scope.data_afil_temp = response.data;
                    $scope.infocartera = true;
                } else if (response.data.hide_cartera == 1) {
                    $scope.infocartera = false;
                    $scope.data_cartera = response.data;
                    $scope.infoAfiliado = true;
                } else {
                    $scope.infocartera = true;
                    $scope.infoAfiliado = true;

                }
            });

            $scope.descargafile = function (ruta) {
                $http({
                    method: 'POST',
                    url: "php/acas/getfileFtp.php",
                    data: {
                        ruta: ruta
                    }
                }).then(function (response) {
                    //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
                    window.open("temp/" + response.data);
                });
            }
            acasHttp.mostrarcomentarios('RE', $scope.numeroacas, $scope.ubicacionacas, $scope.codigo_concepto).then(function (response) {
                $scope.estadopanelopciones();
                if (response.data.codigo == -1) {
                    $scope.cod_comentario = 0;
                } else {
                    $scope.comentarios = response.data;
                    $scope.cod_comentario = $scope.comentarios.length;
                    setTimeout(function () {
                        $("#chat_comment")[0].scrollTop = $("#chat_comment")[0].scrollHeight;
                    }, 300);
                }
            })
            $scope.estadopanelopciones = function () {
                if ($scope.cod_adjunto == null) { $scope.ifadj = true; } else { $scope.ifadj = false; }
                if ($scope.valorgestion == 'gestion') { $scope.panelOP = false; } else { $scope.panelOP = true; }
            }

            $scope.mostrarPanel = function (estado) {
                if (estado == 'I') { $scope.panelIC = false; } else { $scope.panelIC = true; }
            }

            $scope.insertarComentario = function (Cerrar_acas) {
                swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                });
                return new Promise(resolve => {
                    if ($scope.cod_comentario == 0) { $scope.tipo = 'R' } else { if ($scope.tipo == 'C') { $scope.tipo = 'C' } else { $scope.tipo = 'A' } }

                    if ($scope.DocumentoRes == undefined) {

                        acasHttp.insertarcomentario('RE', $scope.numeroacas, $scope.ubicacionacas, $scope.tipo, $scope.cedula, $scope.observacion, '', 'N', $scope.cod_check_option == false ? 'C' : 'R', $scope.numeroserial).then(function (response) {
                            $scope.re_comentario = response.data;
                            if ($scope.re_comentario.codigo == 0) {
                                swal('Error', $scope.re_comentario.mensaje, 'error');
                                resolve('0');
                            } else {
                                $scope.observacion = '';
                                if (!Cerrar_acas) { swal('Notificación', $scope.re_comentario.mensaje, 'success'); $scope.Mostrarcomentarios(); }
                                resolve('1');
                            }
                        })
                    } else if ($scope.DocumentoRes.length != '0') {
                        acasHttp.insertarcomentario('RE', $scope.numeroacas, $scope.ubicacionacas, $scope.tipo, $scope.cedula, $scope.observacion, $scope.ruta, 'N', $scope.cod_check_option == false ? 'C' : 'R', $scope.numeroserial).then(function (response) {
                            $scope.re_comentario = response.data;
                            if ($scope.re_comentario.codigo == 0) {
                                reject;
                                swal('Error', $scope.re_comentario.mensaje, 'error');
                                resolve('0');
                            } else {
                                $scope.observacion = '';
                                $scope.DocumentoRes = [];
                                $scope.DocumentoAbjunto = '';
                                $scope.adjuntocab = '';
                                document.getElementById('adjuntocab').value = '';
                                if (!Cerrar_acas) { swal('Notificación', $scope.re_comentario.mensaje, 'success'); $scope.Mostrarcomentarios(); }
                                resolve('1');
                            }
                        })

                    } else {
                        if ($scope.observacion.length <= 10) {
                            swal('Error', 'Su comentario no se publico correctamente. Debe ingresar un comentario de mínimo 10 caracteres', 'error');
                            resolve('0');
                        } else {
                            acasHttp.insertarcomentario('RE', $scope.numeroacas, $scope.ubicacionacas, $scope.tipo, $scope.cedula, $scope.observacion, '', 'N', $scope.cod_check_option == false ? 'C' : 'R', $scope.numeroserial).then(function (response) {
                                $scope.re_comentario = response.data;
                                if ($scope.re_comentario.codigo == 0) {
                                    swal('Error', $scope.re_comentario.mensaje, 'error');
                                    resolve('0');
                                } else {
                                    $scope.observacion = '';
                                    if (!Cerrar_acas) { swal('Notificación', $scope.re_comentario.mensaje, 'success'); $scope.Mostrarcomentarios(); }
                                    resolve('1');
                                }
                            })
                        }
                    }

                });
            }


            $scope.Cerraracas = function () {
                if ($scope.observacion.length <= 10) {
                    swal('Error', 'Su servicio no se cerró correctamente. Debe ingresar un comentario de cierre de mínimo 10 caracteres', 'error');
                } else {
                    swal({
                        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                        width: 200,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        animation: false
                    });
                    acasHttp.insertarcomentario('RE', $scope.numeroacas, $scope.ubicacionacas, 'C', $scope.cedula, $scope.observacion, '', 'S', 'R', $scope.numeroserial).then(function (response) {
                        $scope.re_comentario = response.data;
                        if ($scope.re_comentario.codigo == 0) {
                            swal('Error', $scope.re_comentario.mensaje, 'error');
                        } else {
                            $scope.celularacas = response.data.celular;
                            $scope.nombreacas = response.data.nombre;
                            $scope.numeroacas = $scope.numeroacas;
                            swal('Notificación', response.data.mensaje, 'success');
                            setTimeout(function () {
                                // $http({
                                //     method: 'POST',
                                //     url: "https://api.infobip.com/sms/1/text/single",
                                //     headers: {
                                //         'Content-Type': 'application/json',
                                //         'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
                                //         'accept': 'application/json'
                                //     },
                                //     data: {
                                //         "from": "CajacopiEPS",
                                //         "to": "57" + $scope.celularacas,
                                //         "text": "Sr(a). " + $scope.nombreacas + " Solicitud  con número " + $scope.numeroacas + " fue cerrado correctamente. Gracias por utilizar nuestra plataforma. "
                                //     }
                                // }).then(function (response) {
                                //     console.log(response);
                                    $scope.gifsolicitudacas = false;
                                    $scope.solicitudacas = false;
                                    $scope.nombre_acas = 'Generar Acas';
                                // });
                                ngDialog.closeAll();
                            }, 1000);
                        }
                    })
                }
            }
            $scope.Mostrarcomentarios = function () {
                acasHttp.mostrarcomentarios('RE', $scope.numeroacas, $scope.ubicacionacas, $scope.codigo_concepto).then(function (response) {
                    $scope.comentarios = response.data;
                    if ($scope.comentarios.codigo == -1)
                        $scope.cod_comentario = 0;
                    else
                        $scope.cod_comentario = $scope.comentarios.length;
                });
            }

            $scope.CargarSoportesRespuesta = function () {
                swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Subiendo soporte.</p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                });
                $http({
                    method: 'POST',
                    url: "php/acas/CargarSoportes.php",
                    data: {
                        function: 'CargarSoportes',
                        numero: $scope.cedula,
                        archivos: JSON.stringify($scope.DocumentoRes)
                    }
                }).then(function (response) {
                    $scope.respuesta = response.data[0];
                    if ($scope.respuesta.codigo == '0') {
                        $scope.ruta = $scope.respuesta.ruta;
                        $scope.insertarComentario();
                    } else {

                        swal('Notificacion', $scope.respuesta, 'info');
                    }
                });



            }

            $scope.SubirSoporteCabeza = function () {
                $scope.DocumentoRes = [];
                $scope.adjuntocab = $("#adjuntocab");
                if ($scope.adjuntocab[0].value == null || $scope.adjuntocab[0].value == undefined || $scope.adjuntocab[0].value == '') {
                    $scope.insertarComentario();
                } else {
                    swal({
                        title: 'Confirmar',
                        text: "¿Confirmar el soporte de Respuesta",
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Continuar',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result) {
                            var FR = new FileReader();
                            FR.addEventListener("load", function (e) {
                                $scope.adjuntoafiliadocabeza = e.target.result;
                                $scope.extensioncabeza = $scope.adjuntocab[0].files[0].name.split('.').pop();
                                $scope.DocumentoRes.push({ "base64": $scope.adjuntoafiliadocabeza, "extension": $scope.extensioncabeza });
                                $scope.CargarSoportesRespuesta();
                            });
                            FR.readAsDataURL($scope.adjuntocab[0].files[0]);
                        }
                    })
                }
            }


            $scope.CrearComentario = function () {
                if ($scope.observacion.length <= 10) {
                    swal('Error', 'Su comentario no se publico correctamente. Debe ingresar un comentario de mínimo 10 caracteres', 'error');
                } else {
                    $scope.SubirSoporteCabeza();
                }

            }

            $scope.DescargarRespuesta = function (ruta) {
                $http({
                    method: 'POST',
                    url: "php/acas/getfileFtp.php",
                    data: {
                        ruta: ruta
                    }
                }).then(function (response) {
                    //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
                    window.open("temp/" + response.data);
                });



            }



        }
    ]);
