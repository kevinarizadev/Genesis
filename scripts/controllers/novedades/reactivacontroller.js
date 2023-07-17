'use strict';
angular.module('GenesisApp')
    .controller('reactivacontroller', ['$http', '$scope', 'ngDialog', 'notification', 'cfpLoadingBar', '$window', '$timeout', '$rootScope',
        function ($http, $scope, ngDialog, notification, cfpLoadingBar, $window, $timeout, $rootScope) {
            $scope.btnGuarda = true;
            $scope.btnValidarDocumento = true;
            $scope.btnGn = true;
            $scope.causal == "B"
            $scope.shw_fecha_afiliacion_adres = true;
            $scope.OcultarSoporte = true;
            $scope.form = {
                metodologia_grup_pob: '',
                grupo_sisbeniv: '',
                subgrupo_sisbeniv: '',
                causal_oficio_sisbeniv: '',
                puntajesisben: ''
            }
            $http({
                method: 'POST',
                url: "php/funclistas.php",
                data: { function: 'cargaDepartamentos' }
            }).then(function (response) {
                $scope.NewDepartamentos = response.data;
                $scope.departamento = "";
            });

            $scope.chg_departamento = function () {
                swal({
                    title: 'Buscando afiliados...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                $http({
                    method: 'POST',
                    url: "php/funclistas.php",
                    data: { function: 'cargaMunicipios', depa: $scope.departamento }
                }).then(function (response) {
                    $scope.NewMunicipios = response.data;
                    $scope.municipio = "";
                    swal.close();
                });
            }

            $scope.chg_municipio = function () {
                $http({
                    method: 'POST',
                    url: "php/novedades/funcnovedades.php",
                    data: { function: 'obtenerescenarios', ubicacion: $scope.municipio }
                }).then(function (response) {
                    $scope.NewEscenarios = response.data;
                    $scope.chg_boton();
                });
            }



            $http({
                method: 'POST',
                url: "php/novedades/funcnovedades.php",
                data: { function: 'cargacausales' }
            }).then(function (response) {
                $scope.Causales = response.data;
                $scope.causal = $scope.Causales[0].CODIGO;
            });
            function formatDate(date) {
                var month = date.getUTCMonth() + 1;
                date = date.getDate() + "/" + month + "/" + date.getFullYear();
                return date;
            }
            $scope.habilitafin = function () {
                if ($("#docidm")[0].value == "" || $("#docsisbenm")[0].value == "") {
                    $scope.btnGuarda = true;
                } else {
                    $scope.btnGuarda = false;
                }
            }
            // $scope.chg_causal = function () {

            //     if ($scope.causal == "B") {
            //         $scope.chg_boton();
            //         $scope.shw_fecha_afiliacion_adres = true;
            //     } else {
            //         $scope.shw_fecha_afiliacion_adres = false;
            //     }
            // }





            $scope.chg_boton = function () {
                if ($scope.causal == "B") {
                    if ($scope.fecha_afiliacion == '' || $scope.fecha_afiliacion == null || $scope.fecha_afiliacion == undefined) {
                        $scope.btnGuarda = true;
                        $scope.btnValidarDocumento = true;
                        $scope.btnGn = true;
                    } else {
                        $scope.btnGuarda = true;
                        $scope.btnGn = true;
                        $scope.btnValidarDocumento = false;
                    }
                } else {
                    $scope.btnGuarda = true;
                    $scope.btnGn = true;
                    $scope.btnValidarDocumento = false;
                }
            }

            $scope.ValidarDocumento = function () {
                $scope.validar_sisben_v2().then(function (result) {
                    if (!result) {
                        $http({
                            method: 'POST',
                            url: "php/novedades/funcnovedades.php",
                            data: { function: 'ValidaSoporteCargado', tipo_documento: $scope.type, documento: $scope.id }
                        }).then(function (response) {
                            $scope.valida = response.data.valida;
                            $scope.soporte = response.data.soporte;
                            if ($scope.valida.codigo < 5) {
                                swal('Notificación', 'El Usuario No Tiene Cargado Todos Los Soportes', 'info');
                                $scope.btnGuarda = false;
                                $scope.btnValidarDocumento = true;
                                $scope.btnGn = true;
                                $scope.OcultarSoporte = false;
                            } else {
                                $scope.btnGuarda = true;
                                $scope.btnValidarDocumento = true;
                                $scope.btnGn = false;
                                $scope.OcultarSoporte = true;
                            }
                        });
                    }
                });
            }




            $scope.ModalDigitalizacion = function (numero) {
                switch ($scope.causal) {
                    case 'B':
                        $scope.paquete = numero;
                        $scope.tipo_documento = $scope.type;
                        $scope.documento = $scope.id;
                        $scope.TipoRes = 'NA';
                        ngDialog.open({
                            template: 'views/digitalizacion/modal/cargaanexo.html',
                            className: 'ngdialog-theme-plain',
                            controller: 'DigitalizacionController',
                            scope: $scope
                        })
                        break;
                    case 'P':
                    case 'S':
                    case 'T':
                    case 'N':   
                        if ($scope.escenario == '' || $scope.escenario == null || $scope.escenario == undefined) {
                            swal('Notificación', 'Debe Seleccionar El Escenario', 'error');
                        } else {
                            $scope.paquete = numero;
                            $scope.tipo_documento = $scope.type;
                            $scope.documento = $scope.id;
                            $scope.TipoRes = 'NA';
                            ngDialog.open({
                                template: 'views/digitalizacion/modal/cargaanexo.html',
                                className: 'ngdialog-theme-plain',
                                controller: 'DigitalizacionController',
                                scope: $scope
                            })
                        }
                        break;
                    default:
                }
            }

            $rootScope.$on('NovedadesActivar', function (event, args) {
                if (args == '0') {
                    $scope.reactivaafiliado();
                }
            });

            $scope.ValidarMetodoGPob = function () {
                // $scope.form.METODOLOGIA_G_POBLACIONAL = $scope.info.METODOLOGIA_G_POBLACIONAL.split('-')[0];
                $scope.obtenerGrupoPoblacional(1);
                if ($scope.info.METODOLOGIA_G_POBLACIONAL.split('-')[0] == '1') {
                    $scope.form.GRUPO_SISBENIV = '';
                    $scope.form.SUBGRUPO_SISBENIV = '';
                    $scope.form.CAUSAL_OFICIO = '';
                }
                if ($scope.info.METODOLOGIA_G_POBLACIONAL.split('-')[0] == '2') {
                    $scope.form.PUNTAJE_SISBEN = '';
                    $scope.form.NIVELSISBEN = '';
                    $scope.form.CAUSAL_OFICIO = '';
                    $scope.CalcularSubgrupoSisben(1);
                }
                if ($scope.info.METODOLOGIA_G_POBLACIONAL.split('-')[0] == '3') {
                    $scope.form.FICHASISBEN = '';
                    $scope.form.PUNTAJE_SISBEN = '';
                    $scope.form.NIVELSISBEN = '';
                    $scope.form.GRUPO_SISBENIV = '';
                    $scope.form.SUBGRUPO_SISBENIV = '';
                    $scope.form.CAUSAL_OFICIO = '';
                }
                if ($scope.info.METODOLOGIA_G_POBLACIONAL.split('-')[0] == '4') {
                    $scope.form.CAUSAL_OFICIO = '';
                }
            }
            $scope.validar_sisben_v2 = function () {
                return new Promise((resolve) => {
                    if ($scope.form.METODOLOGIA_G_POBLACIONAL == '' || $scope.form.METODOLOGIA_G_POBLACIONAL == null) {
                        swal('Información', 'Debe seleccionar la Metodologia Grupo Poblacional.', 'info'); return;
                    }
                    if ($scope.form.METODOLOGIA_G_POBLACIONAL == '1') { //SISBEN III
                        if ($scope.form.FICHASISBEN == '' || $scope.form.FICHASISBEN == null) {
                            swal('Información', 'Debe digitar la Ficha de SISBEN.', 'info'); return;
                        }
                        if ($scope.form.GPOBLACIONAL == '' || $scope.form.GPOBLACIONAL == null) {
                            swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
                        }
                        if ($scope.form.NIVELSISBEN == '' || $scope.form.NIVELSISBEN == null) {
                            swal('Información', 'Debe digitar el Nivel del SISBEN.', 'info'); return;
                        }
                        if ($scope.form.PUNTAJE_SISBEN == '' || $scope.form.PUNTAJE_SISBEN == null) {
                            swal('Información', 'Debe digitar el Nivel del SISBEN', 'info'); return;
                        }
                    }
                    if ($scope.form.METODOLOGIA_G_POBLACIONAL == '2') { //SISBEN IV
                        if ($scope.form.FICHASISBEN == '' || $scope.form.FICHASISBEN == null) {
                            swal('Información', 'Debe digitar la Ficha de SISBENIV.', 'info'); return;
                        }
                        if ($scope.form.FICHASISBEN.length != 20) {
                            swal('Información', 'La Ficha de SISBENIV debe contener 20 digitos.', 'info'); return;
                        }
                        if ($scope.form.GPOBLACIONAL == '' || $scope.form.GPOBLACIONAL == null) {
                            swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
                        }
                        if ($scope.form.GRUPO_SISBENIV == '' || $scope.form.GRUPO_SISBENIV == null) {
                            swal('Información', 'Debe seleccionar el Grupo de SISBEN IV.', 'info'); return;
                        }
                        if ($scope.form.SUBGRUPO_SISBENIV == '' || $scope.form.SUBGRUPO_SISBENIV == null) {
                            swal('Información', 'Debe seleccionar el Subgrupo de SISBEN IV.', 'info'); return;
                        }
                    }
                    if ($scope.form.METODOLOGIA_G_POBLACIONAL == '3') { //Listado Censales
                        if ($scope.form.GPOBLACIONAL == '' || $scope.form.GPOBLACIONAL == null) {
                            swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
                        }
                    }
                    if ($scope.form.METODOLOGIA_G_POBLACIONAL == '4') { //Afiliacion Oficio
                        if ($scope.form.GPOBLACIONAL == '' || $scope.form.GPOBLACIONAL == null) {
                            swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
                        }
                        if ($scope.form.GPOBLACIONAL == '31') {
                            if ($scope.form.CAUSAL_OFICIO == '' || $scope.form.CAUSAL_OFICIO == null) {
                                swal('Información', 'Debe seleccionar causal de afiliacion de oficio.', 'info'); return;
                            }
                        }
                    }
                    resolve(false);
                });
            }

            $scope.obtenergrupoSisben = function () {
                $http({
                    method: 'POST',
                    url: "php/aseguramiento/Rafiliacion.php",
                    data: { function: 'obtenergruposisbeniv' }
                }).then(function (response) {
                    $scope.Listado_GrupoSisben_v2 = response.data;
                });
            }
            $scope.obtenergrupoSisben()
            $scope.CalcularSubgrupoSisben = function () {
                $scope.form.SUBGRUPO_SISBENIV = '';
                $http({
                    method: 'POST',
                    url: "php/aseguramiento/Rafiliacion.php",
                    data: { function: 'obtenersubgruposisbeniv', tipo: $scope.form.GRUPO_SISBENIV }
                }).then(function (response) {
                    $scope.Listado_SubGrupoSisben_v2 = response.data;
                }, function errorCallback(response) {
                    swal('Mensaje', response.data, 'error')
                });
            }

            $scope.obtenerGrupoPoblacional = function (x) {
                $scope.Listado_Gpoblacional = [];
                // $scope.new.BSELECTPOBLACIONAL = '';
                if (!x) {
                    $scope.form.FICHASISBEN = '';
                    $scope.form.PUNTAJE_SISBEN = '';
                    $scope.form.NIVELSISBEN = '';
                    $scope.form.GRUPO_SISBENIV = '';
                    $scope.form.SUBGRUPO_SISBENIV = '';
                    $scope.form.CAUSAL_OFICIO = '';
                    $scope.mostrar_Listado_Gpoblacional_31_v2 = false;
                }
                // $scope.new.PUNTAJE_SISBEN = '';
                // $scope.new.NIVELSISBEN = '';
                //
                $scope.form.METODOLOGIA_G_POBLACIONAL == '1' ? $scope.mostrar_sisbeniii_v2 = true : $scope.mostrar_sisbeniii_v2 = false;
                $scope.form.METODOLOGIA_G_POBLACIONAL == '2' ? $scope.mostrar_sisbeniv_v2 = true : $scope.mostrar_sisbeniv_v2 = false;
                $http({
                    method: 'POST',
                    url: "php/aseguramiento/Rafiliacion.php",
                    data: { function: 'obteneragrupoPoblacional', metodo: $scope.form.METODOLOGIA_G_POBLACIONAL }
                }).then(function (response) {
                    $scope.Listado_Gpoblacional_v2 = response.data;
                    //    setTimeout(function () {
                    //       if (x) {
                    //          setTimeout(function () { $scope.CalcularGpoblacional(); }, 500);
                    //          setTimeout(function () { $scope.$apply(); }, 500);
                    //       } else {
                    //          $scope.form.GPOBLACIONAL = '';
                    //       }
                    //    }, 1000);

                    setTimeout(function () { $scope.$apply(); }, 500);
                }, function errorCallback(response) {
                    swal('Mensaje', response.data, 'error')
                });
            }


            $scope.CalcularGpoblacional = function () {
                if ($scope.form.GPOBLACIONAL == '31') {
                    $scope.mostrar_Listado_Gpoblacional_31_v2 = true;
                    $scope.Listado_Gpoblacional_31_v2 = [
                        { "CODIGO": "O", "NOMBRE": 'AFILIACION DE OFICION SIN ENCUESTA NI POBLACION' },
                        { "CODIGO": "A", "NOMBRE": 'AFILIACION DE OFICION CON SISBEN NIVEL 1' },
                        { "CODIGO": "B", "NOMBRE": 'AFILIACION DE OFICION CON SISBEN NIVEL 2' },
                        { "CODIGO": "C", "NOMBRE": 'AFILIACION DE OFICION POBLACION ESPECIAL' }
                    ];
                    setTimeout(function () { $scope.$apply(); }, 500);
                } else {
                    $scope.mostrar_Listado_Gpoblacional_31_v2 = false;
                }
            }

               $scope.activar_formulario = function() {
                $window.open('views/consultaafiliados/soportes/fuar.php?tipo=' +
                $scope.type + '&id=' + $scope.id + '&ori=N', '_blank', "width=1080,height=1100");

              }

            $scope.reactivaafiliado = function () {
                if ($scope.fecha_afiliacion == '' || $scope.fecha_afiliacion == null || $scope.fecha_afiliacion == undefined) {
                    var fecha = new Date();
                    var fecha_afiliacion = formatDate(fecha);
                } else {
                    var fecha_afiliacion = formatDate($scope.fecha_afiliacion);
                }
                $http({
                    method: 'POST',
                    url: "php/novedades/funcnovedades.php",
                    data: {
                        function: 'guardacambiosIA',
                        type: $scope.type,
                        id: $scope.id,
                        p_nombre: $scope.new.PRIMERNOMBRE,
                        s_nombre: $scope.new.SEGUNDONOMBRE,
                        p_apellido: $scope.new.PRIMERAPELLIDO,
                        s_apellido: $scope.new.SEGUNDOAPELLIDO,
                        sexo: $scope.new.SEXO,
                        municipio: $scope.municipio,
                        escenario: $scope.escenario,
                        f_nacimiento: formatDate($scope.new.NACIMIENTO),
                        estado: $scope.new.ESTADO,
                        t_documento: $scope.new.TIPODOCUMENTO,
                        n_documento: $scope.new.DOCUMENTO,
                        ficha_sisben: $scope.form.FICHASISBEN,
                        n_sisben: $scope.form.NIVELSISBEN,
                        discapacidad: $scope.new.DISCAPACIDAD,
                        gpoblacional: $scope.form.GPOBLACIONAL,
                        zona: $scope.new.ZONA,
                        f_activacion: fecha_afiliacion,
                        reactiva: 'S',
                        causal: $scope.causal,
                        metodologia_grup_pob: $scope.form.METODOLOGIA_G_POBLACIONAL,
                        grupo_sisbeniv: $scope.form.GRUPO_SISBENIV,
                        subgrupo_sisbeniv: $scope.form.SUBGRUPO_SISBENIV,
                        causal_oficio_sisbeniv: $scope.form.CAUSAL_OFICIO,
                        puntajesisben: $scope.form.PUNTAJE_SISBEN
                    }
                }).then(function (res) {
                    if (res.data.MENSAJE == '1') {
                        notification.getNotification('success', 'Afiliado activado correctamente', 'Notificación');
                        ngDialog.closeAll();
                        $scope.activar_formulario();
                    } else {
                        notification.getNotification('error', res.data.MENSAJE, 'Notificación');
                    }
                })
            }
            $scope.guardaadjuntos = function () {
                var img = new FormData($("#frmActivacion")[0]);
                $.ajax({
                    url: "php/novedades/uploadanexos.php",
                    type: "POST",
                    data: img,
                    contentType: false,
                    processData: false,
                    dataType: 'json'
                }).done(function (data) {
                    if (data.IDRES == 1 || data.SISBENRES == 1 || data.FUARRES == 1) {
                        $scope.reactivaafiliado();
                    }
                });
            }


            $scope.FormatTexto = function (SCOPE) {
                const input = $scope.form[SCOPE];
                var valor = input;
                valor = valor.replace(/[a-zA-Z]/g, '');
                valor = valor.replace(/[|!¿¡?°"#/()=$%&''´¨´¨¨¨<>]/g, '');
                valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
                $scope.form[SCOPE] = valor.toString();
              }

        }]);