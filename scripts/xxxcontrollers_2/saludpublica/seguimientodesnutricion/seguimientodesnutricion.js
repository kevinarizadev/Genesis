'use strict';
angular.module('GenesisApp')
    .controller('seguimientodesnutricion', ['$scope', '$http', 'ngDialog', 'notification', 'ausentismoHttp', '$timeout', '$q', 'communication', '$controller', '$rootScope', '$window', '$filter',
        function ($scope, $http, ngDialog, notification, ausentismoHttp, $timeout, $q, communication, $controller, $rootScope, $window, $filter) {

            $(document).ready(function () {
                $('#modalsemana').modal();
                $scope.datosips();
                $('#modalsoporte').modal();
                $('#modalvisual').modal();
                $("#modalesquemavacunacion").modal();

                $scope.dato.responsable = sessionStorage.getItem('cedula')

                // if (sessionStorage.getItem('nit') === null || sessionStorage.getItem('cedula') === null) {
                //     location.href = '/Genesis/index.html';
                // }

            });


            $scope.cambiar_profesion = function (cod) {

                $scope.title = $scope.profe.find(x => x.CODIGO == cod).NOMBRE;
            }

            $scope.titulo = 'SEGUIMIENTO DE DESNUTRICIÓN';
            $scope.vistas = null;

            $scope.MostrarSelect = false;
            $scope.cambiar_profesion = function (cod) {
                if (cod != undefined && cod != "") {
                    $scope.title = $scope.profe.find(x => x.CODIGO == cod).NOMBRE;
                    if ($scope.temp != cod) {
                        $scope.dato.campnombre = '';
                    }
                    $scope.temp = cod;
                    $scope.MostrarSelect = true;
                } else {
                    $scope.MostrarSelect = false;
                }
            }



     
            $scope.arrayFiles = [];

            $('input[type=file].file-upload-field').change(function () {
                switch ($(this)[0].id) {
                    case 'historiaclinica2':
                        $scope.tiposop = 1;
                        break;
                    case 'confirmaciondiagnostico2':
                        $scope.tiposop = 2;
                        break;
                    case 'visitasdomiciliarias2':
                        $scope.tiposop = 3;
                        break;

                    case 'seguimientotelefonico2':
                        $scope.tiposop = 4;
                        break;
                    case 'esquemadevacunacion2':
                        $scope.tiposop = 5;
                        break;

                    case 'formulamedica':
                        $scope.tiposop = 6;
                        break;

                    default:
                        break;
                }
                $scope.fileToBase64($(this)["0"].files, $(this)[0].id, $(this)["0"].files["0"].type.split('/').pop(), $scope.tiposop);
            });


            $http({
                method: 'POST',
                url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                data: { function: 'obtenerprofesion' }
            }).then(function (response) {
                $scope.profe = response.data;
            });

            //OBTENER DETALLES DE CONTROL   
            $scope.detalle = function (type) {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerdetalle', type: type }
                }).then(function (res) {
                    $scope.detalles = res.data;
                })
            }


            $scope.estadoanexo = function (ruta, ftp) {
                if (ftp == 1) {
                    $http({
                        method: 'POST',
                        url: "php/juridica/tutelas/functutelas.php",
                        data: { function: 'descargaAdjunto', ruta: ruta }
                    }).then(function (response) {
                        if (response.data.length == '0') {
                            swal('Error', response.data, 'error');
                        } else {
                            $('#modalvisual').modal('open');
                            $scope.MostrarArchivo = false;
                            $scope.file = ('temp/' + response.data);
                            var tipo = $scope.file.split(".");
                            tipo = tipo[tipo.length - 1];
                            if (tipo.toUpperCase() == "PDF") {
                                $scope.tipoImgPdf = false;
                            } else if (tipo.toUpperCase() == "JPG" || tipo.toUpperCase() == "JPEG" || tipo.toUpperCase() == "PNG" || tipo.toUpperCase() == "TIFF" || tipo.toUpperCase() == "BMP") {
                                $scope.tipoImgPdf = true;
                                setTimeout(function () { $scope.zoom(); }, 1000);
                            } else {
                                swal('Error', response.data, 'error');
                            }
                        }
                    });
                }
            }

            $scope.validarexamen = function () {
                if ($scope.dato.examenapetito == 2) {
                    $scope.dato.ftlc = 2;
                    $scope.dato.resultadoseguimiento = 1;
                    $scope.validarexamendsb = true;
                    $scope.resultadosdsb = true;


                } else {
                    $scope.dato.ftlc = 1;
                    $scope.dato.resultadoseguimiento = '';
                    $scope.validarexamendsb = true;
                    $scope.resultadosdsb = false;

                }
            }

            $scope.validarresultados = function () {
                if ($scope.dato.resultadoseguimiento == 5 || $scope.dato.resultadoseguimiento == 1) {
                    $scope.proximocontroldsb = true;



                } else {
                    $scope.proximocontroldsb = false;
                }
            }



            $scope.open_modal = function (modal, semana, codigo) {

                switch (modal) {
                    case "EV":
                        //$scope.get_vacunas(codigo,semana);
                        $scope.dialogDiag = ngDialog.open({
                            template: 'views/saludpublica/modal/modalEsquema.html',
                            className: 'ngdialog-theme-plain',
                            controller: 'modalEsquemaController',
                            scope: $scope
                        });
                        break;

                    default:
                        break;
                }
            }

            $scope.get_vacunas = function (semana, codigo) {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: {
                        function: 'OBTENER_VALORES_EVAC',
                        codigo: codigo,
                        codigosemana: semana
                    }
                }).then(function (res) {
                    $scope.esquema = res.data;
                    $scope.open_modal("EV", codigo, semana)
                })
            }

            $scope.mostrarSoportes = function (cod_semana, codigo) {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'mostrarSoportes', codigo: codigo, codigosemana: cod_semana }
                }).then(function (res) {
                    $scope.soportereg = res.data;
                })
            }

            // resultados del perimetro
            $scope.KeyFind = function (keyEvent) {
                if (keyEvent.which === 13)
                    $scope.resultadoperimetro();
            }

            $scope.resultadoperimetro = function () {
                if (parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) <= 11.5) {
                    $scope.dato.perimetrobraquial = "desnutricion aguda severa";

                }

                if (parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) > 11.5 && parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) <= 12.5) {
                    $scope.dato.perimetrobraquial = "desnutricion aguda moderada";
                }

                if (parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) > 12.5 && parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) <= 13.5) {
                    $scope.dato.perimetrobraquial = "desnutricion aguda leve o riesgo";
                }

                if (parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) > 13.5) {
                    $scope.dato.perimetrobraquial = "Normal";
                }
            }

            $scope.versoportes = function (CODSEMANA, codigo) {
                console.log("asad");
                $scope.codigodesarrollomodal = codigo;
                $scope.cod_semanamodal = CODSEMANA;
                if ($scope.versoporte == true) {
                    $scope.versoporte = false;
                } else {
                    $scope.mostrarSoportes(CODSEMANA, codigo);
                    $scope.versoporte = true;

                }
            }

            

            //LIMPIAR REPORTES
            $scope.limpiarreportes = function () {
                $scope.cambiar_profesion = '';
                $scope.soporte.formulamedicat = '';
                $scope.soporte.formulamedia = '';
                $scope.dato.nombreprofesional2 = '';
                $scope.soporte.historiaclinica2 = '';
                $scope.soporte.visitasdomiciliarias2 = '';
                $scope.soporte.confirmaciondiagnostico2 = '';
                $scope.soporte.esquema = '';
                $scope.soporte.seguimientotelefonico2 = '';

                document.getElementById("profesion").value = "";

                document.getElementById("formulamedica").value = "";
                document.getElementById("formulamedicat").classList.remove("valid")


                document.getElementById("historiaclinica2").value = "";
                document.getElementById("historiaclinica2t").classList.remove("valid")

                document.getElementById("nombrecampo2").value = "";
                document.getElementById("nombrecampo2").classList.remove("valid")

                document.getElementById("visitasdomiciliarias2").value = "";
                document.getElementById("visitasdomiciliarias2t").classList.remove("valid")

                document.getElementById("confirmaciondiagnostico2").value = "";
                document.getElementById("confirmaciondiagnostico2t").classList.remove("valid")

                document.getElementById("esquemadevacunacion2").value = "";
                document.getElementById("esquemadevacunacion2t").classList.remove("valid")

                document.getElementById("seguimientotelefonico2").value = "";
                document.getElementById("seguimientotelefonico2t").classList.remove("valid")


                document.getElementById("formulamedicat").value = "";
                document.getElementById("historiaclinica2t").value = "";
                document.getElementById("visitasdomiciliarias2t").value = "";
                document.getElementById("confirmaciondiagnostico2t").value = "";
                document.getElementById("esquemadevacunacion2t").value = "";
                document.getElementById("seguimientotelefonico2t").value = "";

                // document.querySelector('#historiaclinica2').value='';

                // document.querySelector('#historiaclinica2t').value = '';

            }



            $scope.cambiarVista = function (vista = null, Subtitulo_Soportede, CODIGODES, item) {
                $scope.vistas = vista;
                $scope.codigoDesnu = CODIGODES;
                if (item != undefined) {
                    var x = item.DOCUMENTO.split('-');
                    $scope.dato.tipo = x[0];
                    $scope.dato.numeroid = x[1];
                }

                switch (vista) {
                    case 1:
                        $scope.titulo = '';
                        $scope.subtitulo = '';
                        break;
                    case 2:
                        $scope.titulo = '';
                        if (Subtitulo_Soportede != undefined) {
                            $scope.subtitulo = 'Control de seguimiento de: ' + Subtitulo_Soportede;
                            $scope.detalle(CODIGODES);
                            $scope.versoporte = false;
                        }
                        break;
                    default:
                        $scope.titulo = 'SEGUIMIENTO DE DESNUTRICIÓN';
                        $scope.subtitulo = '';
                        $scope.historico = true;
                        $scope.limpiardatosbasicos();
                        $scope.dato_fechaingreso = '';
                        $scope.dato_fechacontrol = '';
                        $scope.dato_fechanotificacion = '';
                        $scope.dato_fechaconsulta = '';
                        $scope.dato_proximocontrol = '';
                        $scope.limpiarreportes();
                        break;
                }
            }

            $scope.limpiardatosbasicos = function () {
                $scope.dato = {
                    tipo: '',
                    numeroid: '',
                    ips: '',
                    sexo: '',

                    
                    ftlc: '',
                    fechaconsulta: '',
                    medicamentos: '',
                    medicamentos2: '',
                    medicamentos2: '',
                    requerimientoenergia: '',
                    cantidadsobre: '',
                    cantidadsobres: '',

                    mesentrega: '',
                    peso: '',
                    talla: '',
                    perimetrobrazo: '',
                    perimetrobraquial: '',
                    emacion: '',
                    puntajez: '',
                    clasificaciontalla: '',
                    edema: '',
                    profesion: '',
                    nombreprofesional: '',
                    resultadoseguimiento: '',
                    esquema: '',
                    tipocasos: '',
                    observacionb: '',





                    
                    historiaclinicas: '',
                    proximocontrol: '',
                    codigosemana: ''

                }
            }

            $scope.limpiardatosbasicos();


            $scope.KeyFind_puntajez = function (keyEvent) {

                if (keyEvent.which === 13)
                    $scope.puntajez();
            }



            // OBTENER PUNTAJE Z
            $scope.puntajez = function () {
                var sexs = $scope.dato.sexo.substring(0, 1);
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerpuntajez', sexo: $scope.dato.sexo, peso: $scope.dato.peso, talla: $scope.dato.talla }
                }).then(function (res) {
                    if (res.data.length > 0) {
                        $scope.dato.puntajez = res.data[0].PUNTAJEZ;
                        $scope.dato.clasificaciontalla = res.data[0].CLASIFICACION;

                    } else {

                    }

                })
            }

            //OBTENER datosips    
            $scope.datosips = function (type) {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerdatosips', type: type }

                }).then(function (res) {
                    $scope.listacontrol = res.data;
                    $scope.initPaginacion(res.data);
                    // $scope.dato.reporta  = data.FUENTE;

                })
            }


            $scope.abrirModal = function (ia) {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerdetalle', type: ia.CODIGODES }
                }).then(function (res) {
                    $scope.cod_semanamodal = (res.data.length + 1);


                })

                $('#modalsemana').modal('open');
                var x = ia.DOCUMENTO.split('-');

                $scope.codigodesarrollomodal = ia.CODIGODES;

                $scope.dato.tipo = x[0];
                $scope.dato.numeroid = x[1];
                $scope.dato.ips = ia.NIT;
                $scope.dato.edad = ia.EDAD;
                $scope.dato.sexo = ia.GENERO;
                $scope.verfuente = ia.FUENTE;


                // document.querySelector('#diagnosticoSelectModal').focus();

                document.querySelector('.modal-overlay').addEventListener('click', () => {

                });
            }




            $scope.abrirsemana = null;

            $scope.cerrarModal = function () {
                $('#modalsemana').modal('close');
            }


            // // MODAL DE SOPORTES
            $scope.abrirModalpdf = function () {
                $('#modalsoporte').modal('open');
                // document.querySelector('#diagnosticoSelectModal').focus();

                // document.querySelector('.modal-overlay').addEventListener('click', () => {

                // });
            }

            $scope.subirsoporte = null;



            $scope.cerrarModalpdf = function () {
                $('#modalsoporte').modal('close');

            }

            $scope.enviarreportes = function () {
                var vacio_control = false;

                // && $scope.dato.historiaclinicas != null && $scope.dato.historiaclinicas != '' &&
                //         $scope.dato.historiaclinicas != undefined
                // if ($scope.dato.peso != null {                    
                if ($scope.dato.ftlc != null && $scope.dato.ftlc != '' && $scope.dato.ftlc != undefined && $scope.dato.medicamentos != null && $scope.dato.medicamentos != '' && $scope.dato.medicamentos != undefined &&
                    $scope.dato.medicamentos2 != null && $scope.dato.medicamentos2 != '' && $scope.dato.medicamentos2 != undefined && $scope.dato.emacion != null && $scope.dato.emacion != ''
                    && $scope.dato.emacion != undefined && $scope.dato.edema != null && $scope.dato.edema != '' && $scope.dato.edema != undefined &&
                    $scope.dato.resultadoseguimiento != null && $scope.dato.resultadoseguimiento != '' && $scope.dato.resultadoseguimiento != undefined && $scope.dato.observacionb != null && $scope.dato.observacionb != '' &&
                    $scope.dato.observacionb != undefined &&

                    !$("#pesoletra").hasClass('requerido') && $scope.dato.peso != null && $scope.dato.peso != undefined && $scope.dato.peso != '' &&
                    !$("#tallaletra").hasClass('requerido') && $scope.dato.talla != null && $scope.dato.talla != undefined && $scope.dato.talla != '' &&
                    // !$("#perimetrobrazoletra").hasClass('requerido') && $scope.dato.perimetrobrazo != null && $scope.dato.perimetrobrazo != undefined && $scope.dato.perimetrobrazo != '' &&
                    // !$("#perimetrobraquialletra").hasClass('requerido') && $scope.dato.perimetrobraquial != null && $scope.dato.perimetrobraquial != undefined && $scope.dato.perimetrobraquial != '' &&
                    $scope.dato_fechaconsulta != undefined && $scope.dato_fechaconsulta != null && $scope.dato_fechaconsulta != ''
                    // $scope.dato_fechacontrol != undefined && $scope.dato_fechacontrol != null && $scope.dato_fechacontrol != '' &&
                    // $scope.dato_proximocontrol != undefined && $scope.dato_proximocontrol != null && $scope.dato_proximocontrol != ''
                ) {


                    if ($scope.dato.ftlc == 1) {
                        if ($scope.dato.requerimientoenergia == null || $scope.dato.requerimientoenergia == '' || $scope.dato.cantidadsobre == null || $scope.dato.cantidadsobre == ''
                            || $scope.dato.cantidadsobre == '' || $scope.dato.mesentrega == null || $scope.dato.mesentrega == '') {
                            vacio_control = true;
                        } else {
                            vacio_control = false;
                        }
                    };

                    if ($scope.dato.edad > 6) {
                        if ($scope.dato.perimetrobrazo == null || $scope.dato.perimetrobrazo == '' || $scope.dato.perimetrobraquial == null || $scope.dato.perimetrobraquial == '') {
                            vacio_control = true;
                        } else {
                            vacio_control = false;
                        }
                    };

                    if (vacio_control == false && $scope.esquemaVacunacion != undefined) {
                        const datos = $scope.dato;
                        if ($scope.dato.ipsvalue == 'undefined') {
                            datos.ips = $scope.dato.ipsvalue;
                            delete datos.ipsvalue;
                        } else {
                            datos.ips = $scope.dato.ips;
                        }

                        // console.log(JSON.stringify(datos));
                        // if (Encontrar_Vacios == false) {
                        // $scope.dato.fechaingreso = (($scope.dato_fechaingreso.getDate() < 10) ? '0' + $scope.dato_fechaingreso.getDate() : $scope.dato_fechaingreso.getDate())
                        //     + '/' + ((($scope.dato_fechaingreso.getMonth() + 1) < 10) ? '0' + ($scope.dato_fechaingreso.getMonth() + 1) : ($scope.dato_fechaingreso.getMonth() + 1)) + '/' + $scope.dato_fechaingreso.getFullYear();

                        $scope.dato.fechaconsulta = (($scope.dato_fechaconsulta.getDate() < 10) ? '0' + $scope.dato_fechaconsulta.getDate() : $scope.dato_fechaconsulta.getDate())
                            + '/' + ((($scope.dato_fechaconsulta.getMonth() + 1) < 10) ? '0' + ($scope.dato_fechaconsulta.getMonth() + 1) : ($scope.dato_fechaconsulta.getMonth() + 1)) + '/' + $scope.dato_fechaconsulta.getFullYear();

                        // $scope.dato.fechacontrol = (($scope.dato_fechacontrol.getDate() < 10) ? '0' + $scope.dato_fechacontrol.getDate() : $scope.dato_fechacontrol.getDate())
                        //     + '/' + ((($scope.dato_fechacontrol.getMonth() + 1) < 10) ? '0' + ($scope.dato_fechacontrol.getMonth() + 1) : ($scope.dato_fechacontrol.getMonth() + 1)) + '/' + $scope.dato_fechacontrol.getFullYear();

                        if ($scope.dato.resultadoseguimiento != '1' && $scope.dato.resultadoseguimiento != '5') {
                            $scope.dato.proximocontrol = (($scope.dato_proximocontrol.getDate() < 10) ? '0' + $scope.dato_proximocontrol.getDate() : $scope.dato_proximocontrol.getDate())
                                + '/' + ((($scope.dato_proximocontrol.getMonth() + 1) < 10) ? '0' + ($scope.dato_proximocontrol.getMonth() + 1) : ($scope.dato_proximocontrol.getMonth() + 1)) + '/' + $scope.dato_proximocontrol.getFullYear();
                        }

                        $scope.dato.responsable = sessionStorage.getItem('cedula')

                        $http({
                            method: 'POST',
                            url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                            data: {
                                function: 'enviarreporte', datos: JSON.stringify(datos), type: 'D',
                                adj: JSON.stringify($scope.resultado),
                                lenadjunto: $scope.arrayFiles.length
                            }
                        }).then(function (res) {
                            if (res.data.Codigo == 1) {
                                // if ($scope.esquemaVacunacion != undefined) {
                                $scope.esquemaVacunacion.forEach(item => {
                                    item.respuesta = item.RESPUESTA ? 'S' : 'N',
                                        item.codigo = item.CODIGO
                                });
                                const newRes = res;
                                $scope.codigoDesnutricion = res.data.codigo_des;
                                $scope.codigoSSemana = res.data.codigo_semana;
                                $http({
                                    method: 'POST',
                                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                                    data: {
                                        function: 'insertarEsquemaVacunacion',
                                        codigo_desnutricion: res.data.codigo_des,
                                        codigosemana: res.data.codigo_semana,
                                        data: $scope.esquemaVacunacion,
                                        responsable: sessionStorage.getItem('cedula')
                                    }
                                }).then(function (res) {
                                    swal({
                                        title: newRes.data.Nombre,
                                        timer: 3000,
                                        type: 'success'
                                    }).catch(swal.noop);
                                    $('#modalsemana').modal('close');
                                    $scope.segundaparte = false;
                                    $scope.limpiardatosbasicos();
                                    $scope.dato_fechaingreso = '';
                                    $scope.dato_fechacontrol = '';
                                    $scope.dato_fechanotificacion = '';
                                    $scope.dato_fechaconsulta = '';
                                    $scope.dato_proximocontrol = '';
                                })
                                // }

                            } else {
                                swal({
                                    title: res.data.Nombre,
                                    timer: 3000,
                                    type: 'error'
                                }).catch(swal.noop);
                            }
                        });

                    } else {
                        if ($scope.esquemaVacunacion == undefined) {
                            swal({
                                title: '!Verificar esquema de vacunacion¡',
                                timer: 3000,
                                type: 'info'
                            }).catch(swal.noop);
                        }
                        else {
                            swal({
                                title: '!Complete todos los Campos del formulario!',
                                timer: 3000,
                                type: 'info'
                            }).catch(swal.noop);
                        }
                    }






                } else {
                    swal({
                        title: '¡COMPLETE EL FORMULARIO!',
                        timer: 3000,
                        type: 'warning'
                    }).catch(swal.noop);
                }
                // } else {
                //     swal({
                //         title: '!Complete los campos del formulario!',
                //         timer: 3000,
                //         type: 'success'
                //     }).catch(swal.noop);
                // }
            }

            $scope.pesocolor = function () {
                var expreg = new RegExp("^[\\d]{1,2}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.peso)) {
                    $("#pesoletra").removeClass('requerido');
                    $("#pesoletra").addClass('normal');
                }
                else {
                    $("#pesoletra").removeClass('normal');
                    $("#pesoletra").addClass('requerido');
                }
            }

            $scope.tallacolor = function () {
                var expreg = new RegExp("^[\\d]{1,3}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.talla)) {
                    $("#tallaletra").removeClass('requerido');
                    $("#tallaletra").addClass('normal');
                }
                else {
                    $("#tallaletra").removeClass('normal');
                    $("#tallaletra").addClass('requerido');
                }
            }

            $scope.perimetrocolor = function () {
                var expreg = new RegExp("^[\\d]{1,2}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.perimetrobrazo)) {
                    $("#perimetrobrazoletra").removeClass('requerido');
                    $("#perimetrobrazoletra").addClass('normal');
                }
                else {
                    $("#perimetrobrazoletra").removeClass('normal');
                    $("#perimetrobrazoletra").addClass('requerido');
                }

                $scope.dato.perimetrobraquial = "";
                $scope.Class_perimetrobraquial = '';
                if (parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) <= 11.5) {
                    $scope.dato.perimetrobraquial = "Des. aguda severa"; 3

                    $scope.Class_perimetrobraquial = 'Class_perimetrobraquial_Rojo';
                }

                if (parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) > 11.5 && parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) <= 12.5) {
                    $scope.dato.perimetrobraquial = "Des. aguda moderada";
                    $scope.Class_perimetrobraquial = 'Class_perimetrobraquial_Amarillo';
                }


                if (parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) > 12.5 && parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) <= 13.5) {
                    $scope.dato.perimetrobraquial = "Des. aguda leve o riesgo";
                    $scope.Class_perimetrobraquial = 'Class_perimetrobraquial_Verde';
                }


                if (parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) > 13.5) {
                    $scope.dato.perimetrobraquial = "Normal";
                    $scope.Class_perimetrobraquial = 'Class_perimetrobraquial_Verde';
                }
            }

            // $scope.perimetrocolor = function () {



            // }






            $scope.braquialcolor = function () {
                // var expreg = new RegExp("^[\\d]{1,2}\\,[\\d]{1,2}$");
                // if (expreg.test($scope.dato.perimetrobraquial)) {
                //     $("#perimetrobraquialletra").removeClass('requerido');
                //     $("#perimetrobraquialletra").addClass('normal');
                // }
                // else {
                //     $("#perimetrobraquialletra").removeClass('normal');
                //     $("#perimetrobraquialletra").addClass('requerido');
                // }
            }


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



            

            $scope.fileToBase64 = function (filesSelected, name, ext, tiposop) {

                if (filesSelected.length > 0) {
                    var fileToLoad = filesSelected[0];
                    var fileReader = new FileReader();
                    fileReader.onload = function (fileLoadedEvent) {
                        if ($scope.profesion == "" || $scope.profesion == undefined) {
                            var profesion = '';
                        } else {
                            var profesion = $scope.profesion;
                            // $scope.profesion = '';
                            $scope.MostrarSelect = true;
                        }
                        var array = {
                            src: fileLoadedEvent.target.result,
                            name: name.toUpperCase(),
                            ext: ext,
                            tiposop: tiposop,
                            profesion: profesion
                        };
                        $scope.arrayFiles.push(array);
                    };
                    fileReader.readAsDataURL(fileToLoad);
                }

            }

            // #region "Esquema Vacunación"
            $scope.cargarEsquemaVacunacion = function () {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerEsquemaVacunacion', codigo: $scope.codigoDesnutricion, codigosemana: $scope.codigoSSemana, meses: $scope.dato.edad }
                }).then(function (res) {
                    res.data.forEach(item => {
                        item.RESPUESTA = item.RESPUESTA === "S"
                    });
                    $scope.esquemaVacunacion = res.data;
                    $scope.mostrarModalEsquemaVacunacion();
                })
            }

            $scope.cambiarRespuestaEsquemaEvaluacion = function (index) {
                console.log(index);
            }

            $scope.mostrarModalEsquemaVacunacion = function () {
                $('#modalsemana').modal('close');

                setTimeout(() => {
                    $('#modalesquemavacunacion').modal('open');
                }, 100);
            }

            $scope.cerrarModalEsquemaVacunacion = function () {
                $('#modalesquemavacunacion').modal('close');
                setTimeout(() => {
                    $('#modalsemana').modal('open');
                }, 100);
            }
            //#endregion



            // OBTENER TIPOS DE CASOS
            $scope.obtenerCasos = function () {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerCasos' }
                }).then(function (response) {

                    $scope.tipodecaso = response.data;

                })
            }

            $scope.EnviarSoporte = function () {
                if ($scope.arrayFiles.length == 0) {
                    swal('Notificacion', 'Debe Adjuntar Un Soporte', 'info');
                } else {
                    $http({
                        method: 'POST',
                        url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                        data: { function: 'subir_soporte_denustricion', data: $scope.arrayFiles }// JSON.stringify($scope.arrayFiles)}
                    }).then(function (res) {
                        $scope.arraysoporte = res.data;
                        $scope.limpiarreportes();
                        $scope.arrayFiles = [];

                        if (res.data.length == 0) {
                            $scope.arrayFiles
                            swal('Notificacion', 'Error Supiendo Los Soportes', 'error');
                        } else {

                            for (var i = 0; i < res.data.length; i++) {
                                $http({
                                    method: 'POST',
                                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                                    data: {
                                        function: 'cargarsoporte', codigo_desnutricion: $scope.codigodesarrollomodal, codigoSemana: $scope.cod_semanamodal, respo: $scope.dato.responsable, rutas: res.data[i].ruta, tipo: res.data[i].tipo, tipo_profesion: res.data[i].profesion
                                    }
                                }).then(function (response) {
                                    $scope.resultado = response.data;
                                    $scope.mostrarSoportes($scope.cod_semanamodal, $scope.codigodesarrollomodal);

                                    var z = 0;
                                    if (z != 0) {
                                        var z = z++
                                    }
                                    if (res.data.length == z) {
                                        swal('Notificacion', 'Soporte Cargado Correctamente', 'success');
                                        $('#modalsoporte').modal('close');
                                    }
                                });
                            }
                        }
                        swal('Notificacion', 'Soporte Cargado Correctamente', 'success');
                        $('#modalsoporte').modal('close');
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