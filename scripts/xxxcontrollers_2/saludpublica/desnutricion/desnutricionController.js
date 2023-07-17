'use strict';
angular.module('GenesisApp')
    .controller('desnutricionController', ['$scope', '$http', 'ngDialog', 'notification', 'ausentismoHttp', '$timeout', '$q', 'communication', '$controller', '$rootScope', '$window', '$filter',
        function ($scope, $http, ngDialog, notification, ausentismoHttp, $timeout, $q, communication, $controller, $rootScope, $window, $filter) {

            $(document).ready(function () {
                $('#modalsemana').modal();
                $('#modalsemanah').modal();
                $('#modalsemana1').modal();
                $('#modalsoporte').modal();
                $('#modalcontrol').modal();
                $('#modalvisual').modal();
                $('#modalesquemavacunacion').modal({
                    dismissible: false
                });
                $scope.sysdate = new Date();
                $scope.dato.responsable = sessionStorage.getItem('cedula')

            });

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
            

            $scope.KeyFind = function (keyEvent) {
                if (keyEvent.which === 13)
                    $scope.resultadoperimetro();
            }

            $('.toast').addClass('default-background-dark');

            // resultados del perimetro
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

            // resultados del perimetro hospitalario
            $scope.resultadoperimetroh = function () {
                if (parseFloat($scope.dato.perimetrobrazoh.replace(/\,/g, '.')) <= 11.5) {
                    $scope.dato.perimetrobraquialh = "desnutricion aguda severa";
                }

                if (parseFloat($scope.dato.perimetrobrazoh.replace(/\,/g, '.')) > 11.5 && parseFloat($scope.dato.perimetrobrazoh.replace(/\,/g, '.')) <= 12.5) {
                    $scope.dato.perimetrobraquialh = "desnutricion aguda moderada";
                }

                if (parseFloat($scope.dato.perimetrobrazoh.replace(/\,/g, '.')) > 12.5 && parseFloat($scope.dato.perimetrobrazoh.replace(/\,/g, '.')) <= 13.5) {
                    $scope.dato.perimetrobraquialh = "desnutricion aguda leve o riesgo";
                }

                if (parseFloat($scope.dato.perimetrobrazoh.replace(/\,/g, '.')) > 13.5) {
                    $scope.dato.perimetrobraquialh = "Normal";
                }
            }

            $scope.cambiar_profesion = function (cod) {

                $scope.title = $scope.profe.find(x => x.CODIGO == cod).NOMBRE;
            }

            $scope.obtenerArchivo = function (id, tipoDocumentos) {
                return new Promise((resolve, reject) => {
                    if ($('#' + id)[0].files[0].size > 7340032) {
                        notification.getNotification('warning', 'El archivo excede el peso limite (7 MB)', 'Notificación');
                        $('#' + id)[0].value = "";
                    } else {
                        const datoArchivo = {};
                        if (document.querySelector(`#${id}`).files && document.querySelector(`#${id}`).files[0]) {
                            var FR = new FileReader();
                            FR.addEventListener("load", function (e) {
                                datoArchivo.archivobase = e.target.result;
                                // $scope.archivos[$scope.profesion].archivobase = e.target.result;
                                var name = $('#' + id)[0].files[0].name;
                                datoArchivo.extensionarchivo = name.split('.').pop();
                                datoArchivo.nombre = name;
                                tipoDocumentos.forEach(item => {
                                    const temp = item.NOMBRE.toLowerCase().replace(/ /g, '')
                                    if (id === "VISITAS DOMICILIARIA") {
                                        temp = "visitasdomiciliarias";
                                    }
                                    if (temp === id) {
                                        datoArchivo.tipo = item.CODIGO
                                    }
                                })
                                resolve(datoArchivo);
                            });
                            FR.readAsDataURL($('#' + id)[0].files[0]);
                        }
                    }
                });
            }


            //FECHA ACTUAL
            var f = new Date();
            var mes = String(f.getMonth() + 1).padStart(2, '0');
            $scope.fecharealizacion = f.getDate() + '/' + mes + '/' + f.getFullYear();

            // $scope.fecharealizacion = f.getDate() + '/' + mes + '/' + f.getFullYear() + '  ' + f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds();


            //OBTENER DETALLES  DE CONTROL 
            $scope.detalle = function (type) {

                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerdetalle', type: type }
                }).then(function (res) {
                    $scope.detalles = res.data;
                    // $scope.initPaginacion(res.data);

                })
                // $http({
                //     method: 'POST',
                //     url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                //     data: { function: 'obtenerestancia', id: $scope.dato.numeroid }
                // }).then(function (res) {
                //     $scope.tiempodeespera = res.data[0].DIAS;
                //     $scope.seguimiento = res.data[0].SEGUIMIENTO;

                // })
            }
            //OBTENER DETALLES  DE CONTROL HOSPITALARIO
            $scope.detalleh = function (type) {

                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerdetalleh', type: type }
                }).then(function (res) {
                    $scope.detallesh = res.data;
                    // $scope.initPaginacion(res.data);

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
                            } else {
                                swal('Error', response.data, 'error');
                            }
                        }
                    });
                }
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

            //    LIMPIAR REPORTES
            $scope.limpiarreportes = function () {
                $scope.cambiar_profesion = '';
                $scope.soporte.formulamedicat = '';
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

            }

            $scope.KeyFind_puntajez = function (keyEvent) {

                if (keyEvent.which === 13)
                    $scope.puntajez();
            }

            $scope.versoportes = function (CODSEMANA, codigo, FECHACONSULTA) {
                console.log(FECHACONSULTA);
                $scope.codigodesarrollomodal = codigo;
                $scope.cod_semanamodal = CODSEMANA;
                $scope.fecha_consulta = FECHACONSULTA;
                if ($scope.versoporte == true) {
                    $scope.versoporte = false;
                } else {
                    $scope.mostrarSoportes(CODSEMANA, codigo, FECHACONSULTA);
                    $scope.versoporte = true;
                }
            }

            $scope.loadJS = (url) => {
                return new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = url;
                    // script.async = true;

                    script.onload = () => {
                        resolve();
                    }

                    script.onerror = () => {
                        reject();
                    }
                    document.body.appendChild(script);
                });
            }

            $scope.limpiardatosbasicos = function () {
                $scope.dato = {
                    fechaevolucionh: '',

                    tipo: '',

                    tipoh: '',
                    numeroidh: '',
                    reportah: '',
                    celular: '',
                    numeroid: '',
                    reporta: '',
                    numero: '',
                    fechanotificacion: '',
                    periodonoti: '',
                    semananoti: '',
                    pnombre: '',
                    snombre: '',
                    papellido: '',
                    sapellido: '',
                    paisorigin: '',
                    departamento: '',
                    municipio: '',
                    codzona: '',
                    direccion: '',
                    telefono: '',
                    corregimiento: '',
                    ips: '',
                    fechaingreso: '',
                    regimen: '',
                    sexo: '',
                    fechanacimiento: '',
                    edad: '',
                    eps: '',
                    observaciona: '',
                    historiaclinica: '',

                    examenapetito: '',
                    ftlc: '',
                    fechaconsulta: '',
                    medicamentos: '',
                    medicamentos2: '',
                    requerimientoenergia: '',
                    cantidadsobre: '',
                    cantidadsobres: '',
                    sobresentregados: '',
                    mesentrega: '',
                    peso: '',
                    talla: '',
                    perimetrobrazo: '',
                    perimetrobraquial: '',
                    emacion: '',
                    puntajez: '',
                    clasificaciontalla: '',
                    edema: '',
                    tipodeedema: '',
                    profesion: '',
                    nombreprofesional: '',
                    resultadoseguimiento: '',
                    totalconsumo: '',
                    fechacontrol: '',
                    esquema: '',
                    tipocasos: '',
                    ajuste: '',
                    observacionb: '',
                    historiaclinicas: '',
                    proximocontrol: '',

                    apetitohh: '',
                    f75h: '',
                    messuministroh: '',
                    pesoh: '',
                    tallah: '',
                    puntajezh: '',
                    clasificaciontallah: '',
                    perimetrobrazoh: '',
                    perimetrobraquialh: '',
                    edemah: '',
                    emaciacionh: '',
                    alteracionesh: '',
                    fiebreh: '',
                    vomitoh: '',
                    hipoglesimiah: '',
                    diarreah: '',
                    hipotermiah: '',
                    deshidratacionh: '',
                    letargicoh: '',
                    f75mlh: '',
                    tomasdiariash: '',
                    diasconsumoh: '1',
                    totalconsumoh: '0',
                    resultadoseguimientoh: '',
                    medicamentos1h: '',
                    medicamentos2h: '',
                    medicamentos3h: '',
                    medicamentos4h: '',
                    profesionh: '',
                    nombredelprofesionalh: '',
                    apetitot: '',
                    ftlct: '',
                    fechacontrolt: '',
                    requerimientoenergiat: '',
                    pesot: '',
                    tallat: '',
                    perimetrobrazot: '',
                    perimetrobraquialt: '',
                    puntajezt: '',
                    clasificaciontallat: '',
                    sobrepordiat: '',
                    diasdeconsumot: '1',
                    totalconsumot: '',
                    messuminitrot: '',
                    medicamentos1t: '',
                    medicamentos2t: '',
                    medicamentos3t: '',
                    medicamentos4t: '',
                    resultadoseguimientot: '',
                    profesiont: '',
                    nombreprofesionalt: '',
                    pesoe: '',
                    tallae: '',
                    puntajeze: '',
                    clasificaciontallae: '',
                    perimetrobrazoe: '',
                    perimetrobraquiale: '',
                    requerimientoenergiae: '',
                    sobrepordiae: '',
                    sobresentregadose: '',
                    mesentregaf75e: '',
                    consumototale: '',
                    consumototaleg: '',
                    consumototalet: '',
                    consumototalftlce: '',
                    observacionah: '',
                    observacionh: ''

                }
            }

            $scope.limpiardatosbasicos();

            $scope.limpiardatoscontrol = function () {
                $scope.dato.examenapetito = '';
                $scope.dato.ftlc = '';
                $scope.dato.fechaconsulta = '';
                $scope.dato.medicamentos = '';
                $scope.dato.medicamentos2 = '';
                $scope.dato.medicamentos3 = '';
                $scope.dato.requerimientoenergia = '';
                $scope.dato.cantidadsobre = '';
                $scope.dato.cantidadsobres = '';
                $scope.dato.sobresentregados = '';
                $scope.dato.mesentrega = '';
                $scope.dato.peso = '';
                $scope.dato.talla = '';
                $scope.dato.perimetrobrazo = '';
                $scope.dato.perimetrobraquial = '';
                $scope.dato.emacion = '';
                $scope.dato.puntajez = '';
                $scope.dato.clasificaciontalla = '';
                $scope.dato.edema = '';
                $scope.dato.profesion = '';
                $scope.dato.nombreprofesional = '';
                $scope.dato.resultadoseguimiento = '';
                $scope.dato.totalconsumo = '';
                $scope.dato.fechacontrol = '';
                $scope.dato.esquema = '';
                $scope.dato.tipocasos = '';
                $scope.dato.ajuste = '';
                $scope.dato.observacionb = '';
                $scope.dato.historiaclinicas = '';
                $scope.dato.proximocontrol = '';
            }

            $scope.limpiardatoscontrolh = function () {

                $scope.dato.apetitohh = '',
                    $scope.dato.f75h = '',
                    $scope.dato.messuministroh = '',
                    $scope.dato.pesoh = '',
                    $scope.dato.tallah = '',
                    $scope.dato.puntajezh = '',
                    $scope.dato.clasificaciontallah = '',
                    $scope.dato.perimetrobrazoh = '',
                    $scope.dato.perimetrobraquialh = '',
                    $scope.dato.edemah = '',
                    $scope.dato.emaciacionh = '',
                    $scope.dato.alteracionesh = '',
                    $scope.dato.fiebreh = '',
                    $scope.dato.vomitoh = '',
                    $scope.dato.hipoglesimiah = '',
                    $scope.dato.diarreah = '',
                    $scope.dato.hipotermiah = '',
                    $scope.dato.deshidratacionh = '',
                    $scope.dato.letargicoh = '',
                    $scope.dato.f75mlh = '',
                    $scope.dato.tomasdiariash = '',
                    $scope.dato.diasconsumoh = '1',
                    $scope.dato.totalconsumoh = '',
                    $scope.dato.resultadoseguimientoh = '',
                    $scope.dato.medicamentos1h = '',
                    $scope.dato.medicamentos2h = '',
                    $scope.dato.medicamentos3h = '',
                    $scope.dato.medicamentos4h = '',
                    $scope.dato.profesionh = '',
                    $scope.dato.nombredelprofesionalh = '',
                    $scope.dato.apetitot = '',
                    $scope.dato.ftlct = '',
                    $scope.dato.fechacontrolt = '',
                    $scope.dato.requerimientoenergiat = '',
                    $scope.dato.pesot = '',
                    $scope.dato.tallat = '',
                    $scope.dato.perimetrobrazot = '',
                    $scope.dato.perimetrobraquialt = '',
                    $scope.dato.puntajezt = '',
                    $scope.dato.clasificaciontallat = '',
                    $scope.dato.sobrepordiat = '',
                    $scope.dato.diasdeconsumot = '1',
                    $scope.dato.totalconsumot = '',
                    $scope.dato.messuminitrot = '',
                    $scope.dato.medicamentos1t = '',
                    $scope.dato.medicamentos2t = '',
                    $scope.dato.medicamentos3t = '',
                    $scope.dato.medicamentos4t = '',
                    $scope.dato.resultadoseguimientot = '',
                    $scope.dato.profesiont = '',
                    $scope.dato.nombreprofesionalt = '',
                    $scope.dato.pesoe = '',
                    $scope.dato.tallae = '',
                    $scope.dato.puntajeze = '',
                    $scope.dato.clasificaciontallae = '',
                    $scope.dato.perimetrobrazoe = '',
                    $scope.dato.perimetrobraquiale = '',
                    $scope.dato.requerimientoenergiae = '',
                    $scope.dato.sobrepordiae = '',
                    $scope.dato.sobresentregadose = '',
                    $scope.dato.mesentregaf75e = '',
                    $scope.dato.consumototale = '',
                    $scope.dato.consumototaleg = '',
                    $scope.dato.consumototalet = '',
                    $scope.dato.consumototalftlce = '',
                    $scope.dato.observacionah = '',
                    $scope.dato.observacionh = ''
            }

            $scope.vistas = null;
            $scope.titulo = 'RUTA INTEGRAL DE ATENCIÓN DE ALTERACIONES NUTRICIONALES';

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

            $scope.tablaesquema = function (MESES) {
                if (MESES == 0) {
                    return "Recien nacido"
                }

                if (MESES > 0 && MESES <= 2) {
                    return "A los 2 meses"
                }
                if (MESES > 2 && MESES <= 4) {
                    return "A los 4 meses"
                }
                if (MESES > 4 && MESES <= 6) {
                    return "A los 6 meses"
                }
                if (MESES > 6 && MESES <= 7) {
                    return "A los 7 meses"
                }
                if (MESES > 7 && MESES <= 12) {
                    return "A los 12 meses"
                }
                if (MESES > 12 && MESES <= 18) {
                    return "A los 18 meses"
                }

            }

            $scope.cambiarVista = function (vista = null, Subtitulo_Soportede, CODIGODES, item) {
                $scope.vistas = vista;

                switch (vista) {
                    case 1:
                        $scope.titulo = '';
                        $scope.subtitulo = 'CONTROL DE INGRESO AMBULATORIO';
                        // $scope.loadJS("https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js").then(() => {
                        //     document.querySelector('#fechanotificacion').setAttribute('max', moment().format('YYYY-MM-DD'));
                        //     // document.querySelector('#fechanotificacion').setAttribute('min', moment().subtract(3, 'days').format('YYYY-MM-DD'));
                        // });
                        $scope.loadJS("https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js").then(() => {
                            document.querySelector('#fechaconsulta').setAttribute('max', moment().format('YYYY-MM-DD'));
                        });
                        break;
                    case 2:
                        $scope.titulo = '';
                        $scope.subtitulo = 'CONTROL DE INGRESO HOSPITALARIO';
                        break;
                    case 3:
                        $scope.titulo = '';
                        $scope.subtitulo = 'REPORTES ';
                        $scope.obtener_reporte();
                        break;

                    case 4:
                        $scope.titulo = '';
                        $scope.subtitulo = 'CONTROL DE SEGUIMIENTO';
                        // $http({
                        //     method: 'POST',
                        //     url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                        //     data: { function: 'obtenercontrol', type: $scope.dato.tipo, id: $scope.dato.numeroid }
                        // }).then(function (res) {
                        //     $scope.listacontrol = res.data;
                        // })
                        break;
                    case 5:
                        $scope.desnutrido_seg = CODIGODES;
                        // $scope.dato.ips = item.NIT;
                        $scope.dato.sexo = item.SEXO;
                        $scope.codigo_fuente = item.CODFUENTE;
                        var x = item.DOCUMENTO.split('-');
                        $scope.dato.tipo = x[0];
                        $scope.dato.numeroid = x[1];
                        $scope.titulo = '';
                        if (Subtitulo_Soportede != undefined) {
                            $scope.subtitulo = 'Control de seguimiento de: ' + Subtitulo_Soportede;
                            $scope.detalle(CODIGODES);
                            $scope.versoporte = false;
                            $scope.nombrecompleto = Subtitulo_Soportede;
                            $scope.edadafi = item.EDAD;
                        }
                        break;

                    case 6:
                        $scope.titulo = '';
                        $scope.subtitulo = 'CONTROL DE SEGUIMIENTO';

                        break;

                    case 7:
                        $scope.desnutrido_seg = CODIGODES;
                        // $scope.dato.ips = item.NIT;
                        $scope.dato.sexo = item.SEXO;
                        $scope.codigo_fuente = item.CODFUENTE;
                        var x = item.DOCUMENTO.split('-');
                        $scope.dato.tipoh = x[0];
                        $scope.dato.numeroidh = x[1];
                        $scope.titulo = '';
                        if (Subtitulo_Soportede != undefined) {
                            $scope.subtitulo = 'Control de seguimiento de: ' + Subtitulo_Soportede;
                            $scope.detalleh(CODIGODES);
                            $scope.versoporte = false;
                        }
                        $timeout(function () {
                            $scope.$apply();
                        }, 1000);
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
                        $scope.segundaparte = false;
                        $scope.mostrarexamenfisico = false;
                        // $scope.limpiarFormularios();
                        break;
                }
            }

            // #region "Esquema Vacunación"
            // $scope.cargarEsquemaVacunacion = function () {
            //     if (typeof $scope.esquemaVacunacion === "undefined") {
            //         $http({
            //             method: 'POST',
            //             url: "php/saludpublica/desnutricion/funcDesnutricion.php",
            //             data: { function: 'obtenerEsquemaVacunacion', codigo: $scope.codigoDesnutricion, codigosemana: $scope.codigoSSemana, meses: $scope.dato.edad }
            //         }).then(function (res) {
            //             res.data.forEach(item => {
            //                 item.RESPUESTA = item.RESPUESTA === "S"
            //             });
            //             $scope.esquemaVacunacion = res.data;
            //             $scope.mostrarModalEsquemaVacunacion();
            //         })
            //     } else {
            //         $scope.mostrarModalEsquemaVacunacion();
            //     }
            // }

            $scope.cambiarRespuestaEsquemaEvaluacion = function (index) { }

            $scope.mostrarModalEsquemaVacunacion = function () {
                $('#modalsemana').modal('close');

                setTimeout(() => {
                    $('#modalesquemavacunacion').modal('open');
                }, 100);
            }

            $scope.cerrarModalEsquemaVacunacion = function () {

                // $http({
                //     method: 'POST',
                //     url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                //     data: {
                //         function: 'enviaresquemavacunacion', datos: JSON.stringify(datos), type: 'C'
                //     }
                // }).then( {

                // });


                $('#modalesquemavacunacion').modal('close');
                setTimeout(() => {
                    $('#modalsemana').modal('open');
                }, 100);
            }


            //GUARDAR EXAMEN FISICO
            $scope.guardarexamenfisico = function () {
                console.clear();
                $scope.vistas = 0;

                var Encontrar_Vacios = false;
                if ($scope.dato.edad == undefined || $scope.dato.edad == null || $scope.dato.edad == '') { Encontrar_Vacios = true; }
                if ($scope.dato.peso == undefined || $scope.dato.peso == null || $scope.dato.peso == '') { Encontrar_Vacios = true; }

                if (Encontrar_Vacios == false) {
                    var json = {
                        edad: $scope.dato.edad,
                        peso: $scope.dato.peso,
                        talla: $scope.dato.talla,
                        perimetrobraquial: $scope.dato.perimetrobrazo,
                        puntajez: $scope.dato.puntajez,
                        edema: $scope.dato.edema,
                        tipoedema: $scope.dato.tipodeedema,
                        vomito: $scope.dato.vomitoe,
                        convulsion: $scope.dato.consulsionese,
                        diarrea: $scope.dato.diarreae,
                        latargico: $scope.dato.letargico_inconsciente,
                        pruebaapetito: $scope.dato.examenapetito
                    };

                    // const datos = $scope.dato;
                    // datos.ips = $scope.dato.ipsvalue;
                    // delete datos.ipsvalue;
                    // $http({
                    //     method: 'POST',
                    //     url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    //     data: {
                    //         function: 'enviarreporte',
                    //         datos: JSON.stringify(datos),
                    //         type: 'C'
                    //     }
                    // }).then(function (res) {
                    //     if (res.data.Codigo == 1) {
                    //         swal({
                    //             title: '!Datos guardados!',
                    //             timer: 3000,
                    //             type: 'success'
                    //         }).catch(swal.noop);
                    // $scope.segundaparte = false;
                    // $scope.mostrarexamenfisico = false;

                    // $scope.limpiardatosbasicos();
                    // $scope.dato_fechaingreso = '';
                    // $scope.dato_fechacontrol = '';
                    // $scope.dato_fechanotificacion = '';

                    // } else {
                    // if (res.data.Codigo == 0) {
                    //     // swal('', res.data.Nombre, 'error')
                    // }
                    //     }
                    // });

                    $http({
                        method: 'POST',
                        url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                        data: {
                            function: 'guardarexamenfisico',
                            datos: JSON.stringify(json)
                        }
                    }).then(function (res) {
                        if (res.data.Codigo == 0) {
                            console.log(res.data);
                            swal({
                                title: '¡Mensaje!',
                                text: res.data.Mensaje,
                                type: 'info',
                                confirmButtonText: 'Si',
                                showCancelButton: true,
                                cancelButtonText: 'No',
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result) {
                                    $scope.CalcularVista_guardarexamenfisico(res.data.Valor);
                                }
                            }, function (dismiss) {
                                if (dismiss === 'cancel') { // you might also handle 'close' or 'timer' if you used those

                                    $scope.CalcularVista_guardarexamenfisico_CasoNo(res.data.Valor);
                                    // $scope.vista = 0;
                                    $timeout(function () {
                                        $scope.$apply();
                                    }, 500);
                                } else {
                                    throw dismiss;
                                }
                            }).catch(swal.noop);

                        } else {
                            if (res.data.Codigo == 0) {
                                // swal('', res.data.Nombre, 'error')
                            }
                        }
                    });
                } else {
                    Materialize.toast('¡Complete los campos', 2000);
                }
                //  console.log(JSON.stringify(json));
            }

            $scope.CalcularVista_guardarexamenfisico = function (valor) {
                if (valor == 'H') {
                    // $scope.cambiarVista(7);
                    $scope.cambiarVista(6);
                    // $scope.vistas = 7;
                    $timeout(function () {
                        $scope.$apply();
                    }, 1000);
                }
                if (valor == 'A') {
                    $scope.cambiarVista(4);
                    $timeout(function () {
                        $scope.$apply();
                    }, 1000);
                }
                if (valor == 'B') {
                    // $scope.ocultar = true;
                    // $timeout(function() {
                    //     $scope.$apply();
                    // }, 1000);            
                    swal({
                        title: '!Este afiliado quedó en busqueda activa institucional!',
                        timer: 3000,
                        type: 'success'
                    }).catch(swal.noop);
                    $('#modalsoporte').modal('close');
                }

            }

            $scope.CalcularVista_guardarexamenfisico_CasoNo = function (valor) {
                if (valor != undefined) {
                    var xArray = [
                        { id: 'H', name: 'Hospitalario' },
                        { id: 'A', name: 'Ambulatiorio' },
                        { id: 'B', name: 'Busqueda Activa' }
                    ];
                    xArray.splice(xArray.findIndex(obj => obj.id == valor), 1);
                    console.log(xArray);
                    var options = {};
                    $.map(xArray,
                        function (o) {
                            options[o.id] = o.name;
                        });
                    swal({
                        title: 'Eliga que control debe ir el paciente',
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
                    }).then(function (result) {
                        if (result) {
                            // title: '¿Por qué determina que es por medio del control?',
                            var texto = '¿Por qué determina que es por medio del control ' + ((result == 'A') ? 'Ambulatiorio' : (result == 'B') ? 'Busqueda Activa' : 'Hospitalario') + '?';
                            // debugger
                            swal({
                                title: texto,
                                input: 'textarea',
                                inputPlaceholder: 'Escribe un comentario...',
                                showCancelButton: true,
                                allowOutsideClick: false
                            }).then(function (xresult) {
                                if (xresult !== '' && xresult.length >= 15 && xresult.length < 500) {
                                    $scope.CalcularVista_guardarexamenfisico(result);
                                } else {
                                    Materialize.toast('El comentario debe contener al menos 15 caracteres y menos de 500!', 1000); $('.toast').addClass('default-background-dark');
                                }
                            }).catch(swal.noop);

                        }


                    }).catch(swal.noop);

                }
            }

            //#endregion
            $scope.CapturaFechaActual = function () {
                var date = new Date();
                var day = date.getDate()
                var month = date.getMonth() + 1
                var year = date.getFullYear()
                if (month < 10) {
                    if (day < 10) {
                        $scope.dato.fechatemporal = 0 + day + '/' + 0 + month + '/' + year;
                    } else {
                        $scope.dato.fechatemporal = day + '/' + 0 + month + '/' + year;
                    }
                } else {
                    $scope.dato.fechatemporal = day + '/' + month + '/' + year;
                }

            }
            $scope.CapturaFechaActual();

            //MODAL CONTROL SEMANAL AMBULATORIO
            $scope.abrirModal = function () {

                $('#modalsemana').modal('open');


                document.querySelector('.modal-overlay').addEventListener('click', () => { });
            }
            // $http({
            //     method: 'POST',
            //     url: "php/saludpublica/desnutricion/funcDesnutricion.php",
            //     data: { function: 'obtenerdetalle', type: ia.CODIGODES }
            // }).then(function (res) {
            //     $scope.cod_semanamodal = (res.data.length + 1);


            // })

            // var x = ia.DOCUMENTO.split('-');
            // $scope.codigodesarrollomodal = ia.CODIGODES;
            // var x = item.DOCUMENTO.split('-');
            // $scope.dato.tipo = x[0];
            // $scope.dato.numeroid = x[1];
            // $scope.dato.ips = item.NIT;
            // $scope.dato.edad = item.EDAD;
            // $scope.dato.sexo = item.GENERO;

            // var x = ia.DOCUMENTO.split('-');
            // $scope.codigodesarrollomodal = ia.CODIGODES;
            // $scope.dato.tipo = x[0];
            // $scope.dato.numeroid = x[1];
            // $scope.dato.ips = ia.NIT;
            // $scope.dato.edad = ia.EDAD;
            // $scope.dato.sexo = ia.GENERO;
            // $scope.verfuente = ia.FUENTE;
            $scope.abrirsemana = null;

            $scope.cerrarModal = function () {
                $('#modalsemana').modal('close');
            }

            // // MODAL DE SOPORTES
            $scope.abrirModalpdf = function () {
                $('#modalsoporte').modal('open');
                document.querySelector('.modal-overlay').addEventListener('click', () => {

                });
            }
            $scope.subirsoporte = null;


            $scope.cerrarModalpdf = function () {
                $('#modalsoporte').modal('close');
            }

            //MODAL DE CONTROL SE SEGUIMIENTO
            $scope.abrirModalcontrol = function () {
                $('#modalcontrol').modal('open');
                document.querySelector('.modal-overlay').addEventListener('click', () => { });
            }


            $scope.cerrarModalcontrol = function () {
                $('#modalcontrol').modal('close');

            }

            // #region "Esquema Vacunación"
            $scope.cargarEsquemaVacunacion = function () {
                if (typeof $scope.esquemaVacunacion === "undefined") {
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
                } else {
                    $scope.mostrarModalEsquemaVacunacion();
                }
            }



            $scope.mostrarModalEsquemaVacunacion = function () {
                $('#modalsemana').modal('close');

                setTimeout(() => {
                    $('#modalesquemavacunacion').modal('open');
                }, 100);
            }

            // $scope.cerrarModalEsquemaVacunacion = function () {
            //     $('#modalesquemavacunacion').modal('close');
            //     setTimeout(() => {
            //         $('#modalsemana').modal('open');
            //     }, 100);
            // }

            //#endregion
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


            //MODAL HOSPITALARIO
            $scope.abrirModalh = function () {
                $('#modalsemanah').modal('open');
                // document.querySelector('#diagnosticoSelectModal').focus();
                $scope.dato.perimetrobraquialh = '';
                $scope.dato.perimetrobraquialt = '';
                $scope.dato.perimetrobraquiale = '';

                document.querySelector('.modal-overlay').addEventListener('click', () => {

                });
            }

            $scope.abrirsemanah = null;

            $scope.cerrarModalh = function () {
                $('#modalsemanah').modal('close');

            }
            $scope.cerrarModald = function () {
                $('#AbrirModalDireccion').modal('close');

            }
            // $scope.dato.tipocasos != null && $scope.dato.tipocasos != '' && $scope.dato.tipocasos != undefined &&

            // MODAL INSERT SEMANA
            $scope.enviarreportes = function () {
                swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                });
                var vacio_control = false;
                // && $scope.dato.historiaclinicas != null && $scope.dato.historiaclinicas != '' &&
                //         $scope.dato.historiaclinicas != undefined
                // if ($scope.dato.peso != null {                    
                if ($scope.dato.ftlc != null && $scope.dato.ftlc != '' && $scope.dato.ftlc != undefined && $scope.dato.medicamentos != null && $scope.dato.medicamentos != '' && $scope.dato.medicamentos != undefined &&
                    $scope.dato.medicamentos2 != null && $scope.dato.medicamentos2 != '' && $scope.dato.medicamentos2 != undefined && $scope.dato.emacion != null && $scope.dato.emacion != '' &&
                    $scope.dato.emacion != undefined && $scope.dato.edema != null && $scope.dato.edema != '' && $scope.dato.edema != undefined &&
                    $scope.dato.resultadoseguimiento != null && $scope.dato.resultadoseguimiento != '' && $scope.dato.resultadoseguimiento != undefined &&
                    $scope.dato.observacionb != null && $scope.dato.observacionb != '' && $scope.dato.observacionb != undefined &&

                    !$("#pesoletra").hasClass('requerido') && $scope.dato.peso != null && $scope.dato.peso != undefined && $scope.dato.peso != '' &&
                    !$("#tallaletra").hasClass('requerido') && $scope.dato.talla != null && $scope.dato.talla != undefined && $scope.dato.talla != '' &&
                    // !$("#perimetrobrazoletra").hasClass('requerido') && $scope.dato.perimetrobrazo != null && $scope.dato.perimetrobrazo != undefined && $scope.dato.perimetrobrazo != '' &&
                    // !$("#perimetrobraquialletra").hasClass('requerido') && $scope.dato.perimetrobraquial != null && $scope.dato.perimetrobraquial != undefined && $scope.dato.perimetrobraquial != '' &&
                    $scope.dato_fechaconsulta != undefined && $scope.dato_fechaconsulta != null && $scope.dato_fechaconsulta != '' &&
                    $scope.dato_fechaingreso != undefined && $scope.dato_fechaingreso != '' && $scope.dato_fechaingreso != null
                    //  $scope.dato_fechacontrol != undefined && $scope.dato_fechacontrol != null && $scope.dato_fechacontrol != '' &&
                    // && $scope.dato_proximocontrol != undefined && $scope.dato_proximocontrol != null && $scope.dato_proximocontrol != ''
                ) {


                    if ($scope.dato.ftlc == 1) {
                        if ($scope.dato.requerimientoenergia == null || $scope.dato.requerimientoenergia == '' || $scope.dato.cantidadsobre == null || $scope.dato.cantidadsobre == '' ||
                            $scope.dato.cantidadsobre == '' || $scope.dato.mesentrega == null || $scope.dato.mesentrega == '') {
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

                        // const datos = $scope.dato;
                        // datos.ips = $scope.dato.ipsvalue;
                        // delete datos.ipsvalue;

                        $scope.dato.fechaconsulta = (($scope.dato_fechaconsulta.getDate() < 10) ? '0' + $scope.dato_fechaconsulta.getDate() : $scope.dato_fechaconsulta.getDate()) +
                            '/' + ((($scope.dato_fechaconsulta.getMonth() + 1) < 10) ? '0' + ($scope.dato_fechaconsulta.getMonth() + 1) : ($scope.dato_fechaconsulta.getMonth() + 1)) + '/' + $scope.dato_fechaconsulta.getFullYear();

                        $scope.dato.fechaingreso = (($scope.dato_fechaingreso.getDate() < 10) ? '0' + $scope.dato_fechaingreso.getDate() : $scope.dato_fechaingreso.getDate()) +
                            '/' + ((($scope.dato_fechaingreso.getMonth() + 1) < 10) ? '0' + ($scope.dato_fechaingreso.getMonth() + 1) : ($scope.dato_fechaingreso.getMonth() + 1)) + '/' + $scope.dato_fechaingreso.getFullYear();
                        $scope.dato.fechacontrol = (($scope.dato_fechacontrol.getDate() < 10) ? '0' + $scope.dato_fechacontrol.getDate() : $scope.dato_fechacontrol.getDate()) +
                            '/' + ((($scope.dato_fechacontrol.getMonth() + 1) < 10) ? '0' + ($scope.dato_fechacontrol.getMonth() + 1) : ($scope.dato_fechacontrol.getMonth() + 1)) + '/' + $scope.dato_fechacontrol.getFullYear();
                        if ($scope.dato.resultadoseguimiento != '1' && $scope.dato.resultadoseguimiento != '5') {
                            $scope.dato.proximocontrol = (($scope.dato_proximocontrol.getDate() < 10) ? '0' + $scope.dato_proximocontrol.getDate() : $scope.dato_proximocontrol.getDate()) +
                                '/' + ((($scope.dato_proximocontrol.getMonth() + 1) < 10) ? '0' + ($scope.dato_proximocontrol.getMonth() + 1) : ($scope.dato_proximocontrol.getMonth() + 1)) + '/' + $scope.dato_proximocontrol.getFullYear();
                        }
                        $scope.dato.responsable = sessionStorage.getItem('cedula')

                        $http({
                            method: 'POST',
                            url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                            data: {
                                function: 'enviarreporte',
                                datos: JSON.stringify($scope.dato),
                                type: 'D',
                                adj: JSON.stringify($scope.resultado),
                                lenadjunto: $scope.arrayFiles.length
                            }
                        }).then(function (res) {
                            if (res.data.Codigo == 1) {
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
                                    $scope.detalle($scope.desnutrido_seg);
                                    $scope.segundaparte = false;
                                    $scope.mostrarexamenfisico = false;
                                    // $scope.limpiardatosbasicos();
                                    $scope.limpiardatoscontrol();
                                    $scope.dato_fechaingreso = '';
                                    $scope.dato_fechacontrol = '';
                                    $scope.dato_fechanotificacion = '';
                                    $scope.dato_fechaconsulta = '';
                                    $scope.dato_proximocontrol = '';
                                })

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
                        } else {
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

            //SUBIR SOPORTES
            $scope.subirsoportes = function () {
                swal({
                    title: '!SOPORTES CARGADOS!',
                    timer: 3000,
                    type: 'success'
                }).catch(swal.noop);
                $('#modalsoporte').modal('close');
            }


            // VALIDACION DEL DECIMAL AMBULATORIA
            $scope.pesocolor = function () {
                var expreg = new RegExp("^[\\d]{1,2}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.peso)) {
                    if (parseFloat($scope.dato.peso.toString().replace('\,', '.')) >= 1.7 && parseFloat($scope.dato.peso.toString().replace('\,', '.')) <= 30) {
                        $("#pesoletra").removeClass('requerido');
                        $("#pesoletra").addClass('normal');
                    } else {
                        $("#pesoletra").removeClass('normal');
                        $("#pesoletra").addClass('requerido');
                    }
                } else {
                    $("#pesoletra").removeClass('normal');
                    $("#pesoletra").addClass('requerido');
                }
            }

            $scope.tallacolor = function () {
                var expreg = new RegExp("^[\\d]{1,3}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.talla)) {
                    if (parseFloat($scope.dato.talla.toString().replace('\,', '.')) >= 45 && parseFloat($scope.dato.talla.toString().replace('\,', '.')) <= 120) {
                        $("#tallaletra").removeClass('requerido');
                        $("#tallaletra").addClass('normal');
                    } else {
                        $("#tallaletra").removeClass('normal');
                        $("#tallaletra").addClass('requerido');
                    }

                } else {
                    $("#tallaletra").removeClass('normal');
                    $("#tallaletra").addClass('requerido');
                }
            }


            // VALIDACION DEL DECIMAL HOSPITALARIO
            $scope.pesocolorh = function () {
                var expreg = new RegExp("^[\\d]{1,2}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.pesoh)) {
                    $("#pesoletrah").removeClass('requerido');
                    $("#pesoletrah").addClass('normal');
                } else {
                    $("#pesoletrah").removeClass('normal');
                    $("#pesoletrah").addClass('requerido');
                }
            }

            $scope.tallacolorh = function () {
                var expreg = new RegExp("^[\\d]{1,3}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.tallah)) {
                    $("#tallaletrah").removeClass('requerido');
                    $("#tallaletrah").addClass('normal');
                } else {
                    $("#tallaletrah").removeClass('normal');
                    $("#tallaletrah").addClass('requerido');
                }
            }


            // VALIDACION DEL DECIMAL TRANSICIÓN
            $scope.pesocolort = function () {
                var expreg = new RegExp("^[\\d]{1,2}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.pesot)) {
                    $("#pesoletrat").removeClass('requerido');
                    $("#pesoletrat").addClass('normal');
                } else {
                    $("#pesoletrat").removeClass('normal');
                    $("#pesoletrat").addClass('requerido');
                }
            }

            $scope.tallacolort = function () {
                var expreg = new RegExp("^[\\d]{1,3}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.tallat)) {
                    $("#tallaletrat").removeClass('requerido');
                    $("#tallaletrat").addClass('normal');
                } else {
                    $("#tallaletrat").removeClass('normal');
                    $("#tallaletrat").addClass('requerido');
                }
            }


            // VALIDACION DEL DECIMAL EGRESO
            $scope.pesocolore = function () {
                var expreg = new RegExp("^[\\d]{1,2}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.pesoe)) {
                    $("#pesoletrae").removeClass('requerido');
                    $("#pesoletrae").addClass('normal');
                } else {
                    $("#pesoletrae").removeClass('normal');
                    $("#pesoletrae").addClass('requerido');
                }
            }

            $scope.tallacolore = function () {
                var expreg = new RegExp("^[\\d]{1,3}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.tallae)) {
                    $("#tallaletrae").removeClass('requerido');
                    $("#tallaletrae").addClass('normal');
                } else {
                    $("#tallaletrae").removeClass('normal');
                    $("#tallaletrae").addClass('requerido');
                }
            }


            $scope.dato.perimetrobraquial = "NO APLICA";
            $scope.Class_perimetrobraquial = 'NO APLICA';
            $scope.perimetrocolor = function () {
                var expreg = new RegExp("^[\\d]{1,2}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.perimetrobrazo)) {
                    $("#perimetrobrazoletra").removeClass('requerido');
                    $("#perimetrobrazoletra").addClass('normal');
                } else {
                    $("#perimetrobrazoletra").removeClass('normal');
                    $("#perimetrobrazoletra").addClass('requerido');
                }


                $scope.dato.perimetrobraquial = "NO APLICA";
                $scope.Class_perimetrobraquial = 'NO APLICA';
                if (parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) <= 11.5) {
                    $scope.dato.perimetrobraquial = "------------------------- ";
                    $scope.Class_perimetrobraquial = 'Class_perimetrobraquial_Rojo';
                }

                if (parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) > 11.5 && parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) <= 12.5) {
                    $scope.dato.perimetrobraquial = "------------------------- ";
                    $scope.Class_perimetrobraquial = 'Class_perimetrobraquial_Amarillo';
                }


                if (parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) > 12.5 && parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) <= 13.5) {
                    $scope.dato.perimetrobraquial = "------------------------- ";
                    $scope.Class_perimetrobraquial = 'Class_perimetrobraquial_Verde';
                }


                if (parseFloat($scope.dato.perimetrobrazo.replace(/\,/g, '.')) > 13.5 && $scope.dato.perimetrobrazo.replace(/\,/g, '.') < 20.0) {
                    $scope.dato.perimetrobraquial = "------------------------- ";
                    $scope.Class_perimetrobraquial = 'Class_perimetrobraquial_Verde';
                }
            }

            $scope.perimetrocolorh = function () {
                var expreg = new RegExp("^[\\d]{1,2}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.perimetrobrazoh)) {
                    $("#perimetrobrazoletrah").removeClass('requerido');
                    $("#perimetrobrazoletrah").addClass('normal');
                } else {
                    $("#perimetrobrazoletrah").removeClass('normal');
                    $("#perimetrobrazoletrah").addClass('requerido');
                }

                $scope.dato.perimetrobraquialh = "";
                $scope.Class_perimetrobraquialh = '';
                if (parseFloat($scope.dato.perimetrobrazoh.replace(/\,/g, '.')) <= 11.5) {
                    $scope.dato.perimetrobraquialh = "Des. aguda severa";
                    3

                    $scope.Class_perimetrobraquialh = 'Class_perimetrobraquial_Rojoh';
                }

                if (parseFloat($scope.dato.perimetrobrazoh.replace(/\,/g, '.')) > 11.5 && parseFloat($scope.dato.perimetrobrazoh.replace(/\,/g, '.')) <= 12.5) {
                    $scope.dato.perimetrobraquialh = "Des. aguda moderada";
                    $scope.Class_perimetrobraquialh = 'Class_perimetrobraquial_Amarilloh';
                }


                if (parseFloat($scope.dato.perimetrobrazoh.replace(/\,/g, '.')) > 12.5 && parseFloat($scope.dato.perimetrobrazoh.replace(/\,/g, '.')) <= 13.5) {
                    $scope.dato.perimetrobraquialh = "Des. aguda leve o riesgo";
                    $scope.Class_perimetrobraquialh = 'Class_perimetrobraquial_Verdeh';
                }


                if (parseFloat($scope.dato.perimetrobrazoh.replace(/\,/g, '.')) > 13.5) {
                    $scope.dato.perimetrobraquialh = "Normal";
                    $scope.Class_perimetrobraquialh = 'Class_perimetrobraquial_Verdeh';
                }
            }

            $scope.perimetrocolort = function () {
                var expreg = new RegExp("^[\\d]{1,2}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.perimetrobrazot)) {
                    $("#perimetrobrazoletrat").removeClass('requerido');
                    $("#perimetrobrazoletrat").addClass('normal');
                } else {
                    $("#perimetrobrazoletrat").removeClass('normal');
                    $("#perimetrobrazoletrat").addClass('requerido');
                }

                $scope.dato.perimetrobraquialt = "";
                $scope.Class_perimetrobraquialt = '';
                if (parseFloat($scope.dato.perimetrobrazot.replace(/\,/g, '.')) <= 11.5) {
                    $scope.dato.perimetrobraquialt = "Des. aguda severa";
                    3
                    $scope.Class_perimetrobraquialt = 'Class_perimetrobraquial_Rojot';
                }

                if (parseFloat($scope.dato.perimetrobrazot.replace(/\,/g, '.')) > 11.5 && parseFloat($scope.dato.perimetrobrazot.replace(/\,/g, '.')) <= 12.5) {
                    $scope.dato.perimetrobraquialt = "Des. aguda moderada";
                    $scope.Class_perimetrobraquialt = 'Class_perimetrobraquial_Amarillot';
                }


                if (parseFloat($scope.dato.perimetrobrazot.replace(/\,/g, '.')) > 12.5 && parseFloat($scope.dato.perimetrobrazot.replace(/\,/g, '.')) <= 13.5) {
                    $scope.dato.perimetrobraquialt = "Des. aguda leve o riesgo";
                    $scope.Class_perimetrobraquialt = 'Class_perimetrobraquial_Verdet';
                }


                if (parseFloat($scope.dato.perimetrobrazot.replace(/\,/g, '.')) > 13.5) {
                    $scope.dato.perimetrobraquialt = "Normal";
                    $scope.Class_perimetrobraquialt = 'Class_perimetrobraquial_Verdet';
                }
            }

            $scope.perimetrocolore = function () {
                var expreg = new RegExp("^[\\d]{1,2}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.perimetrobrazoe)) {
                    $("#perimetrobrazoletrae").removeClass('requerido');
                    $("#perimetrobrazoletrae").addClass('normal');
                } else {
                    $("#perimetrobrazoletrae").removeClass('normal');
                    $("#perimetrobrazoletrae").addClass('requerido');
                }

                $scope.dato.perimetrobraquiale = "";
                $scope.Class_perimetrobraquiale = '';
                if (parseFloat($scope.dato.perimetrobrazoe.replace(/\,/g, '.')) <= 11.5) {
                    $scope.dato.perimetrobraquiale = "Des. aguda severa";
                    3
                    $scope.Class_perimetrobraquiale = 'Class_perimetrobraquial_Rojoe';
                }

                if (parseFloat($scope.dato.perimetrobrazoe.replace(/\,/g, '.')) > 11.5 && parseFloat($scope.dato.perimetrobrazoe.replace(/\,/g, '.')) <= 12.5) {
                    $scope.dato.perimetrobraquiale = "Des. aguda moderada";
                    $scope.Class_perimetrobraquiale = 'Class_perimetrobraquial_Amarilloe';
                }


                if (parseFloat($scope.dato.perimetrobrazoe.replace(/\,/g, '.')) > 12.5 && parseFloat($scope.dato.perimetrobrazoe.replace(/\,/g, '.')) <= 13.5) {
                    $scope.dato.perimetrobraquiale = "Des. aguda leve o riesgo";
                    $scope.Class_perimetrobraquiale = 'Class_perimetrobraquial_Verdee';
                }


                if (parseFloat($scope.dato.perimetrobrazoe.replace(/\,/g, '.')) > 13.5) {
                    $scope.dato.perimetrobraquiale = "Normal";
                    $scope.Class_perimetrobraquiale = 'Class_perimetrobraquial_Verdee';
                }
            }


            $scope.braquialcolor = function () {
                var expreg = new RegExp("^[\\d]{1,2}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.perimetrobraquial)) {
                    $("#perimetrobraquialletra").removeClass('requerido');
                    $("#perimetrobraquialletra").addClass('normal');
                } else {
                    $("#perimetrobraquialletra").removeClass('normal');
                    $("#perimetrobraquialletra").addClass('requerido');
                }
            }

            $scope.braquialcolorh = function () {
                var expreg = new RegExp("^[\\d]{1,2}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.perimetrobraquialh)) {
                    $("#perimetrobraquialletrah").removeClass('requerido');
                    $("#perimetrobraquialletrah").addClass('normal');
                } else {
                    $("#perimetrobraquialletrah").removeClass('normal');
                    $("#perimetrobraquialletrah").addClass('requerido');
                }
            }


            $scope.braquialcolore = function () {
                var expreg = new RegExp("^[\\d]{1,2}\\,[\\d]{1,2}$");
                if (expreg.test($scope.dato.perimetrobraquiale)) {
                    $("#perimetrobraquialletrae").removeClass('requerido');
                    $("#perimetrobraquialletrae").addClass('normal');
                } else {
                    $("#perimetrobraquialletrae").removeClass('normal');
                    $("#perimetrobraquialletrae").addClass('requerido');
                }
            }

            //MODAL HOSPITALARIO SEMANA1/2
            $scope.abrirModals1 = function () {
                $('#modalsemana1').modal('open');
                document.querySelector('.modal-overlay').addEventListener('click', () => {

                });
            }

            $scope.abrirsemana1 = null;


            $scope.cerrarModals1 = function () {
                $('#modalsemana1').modal('close');
            }

            $scope.limpiarFormularioAmbulatoria = function () {
                $scope.dato.numeroid = null;
                $scope.segundaparte = null;
                $scope.mostrarexamenfisico = false;
                $scope.dato.tipo = null;
                $scope.dato.tipoingreso = null;
                $scope.dato.fechanotificacion = null;
                $scope.dato.numero = null;
                $scope.dato.semananotificacion = null;
                $scope.dato.direccion = null;
            }

            $scope.limpiarFormularioHospitalaria = function () {
                $scope.dato.numeroidh = null;
                $scope.segundaparteh = null;
                $scope.dato.tipoh = null;
                $scope.dato.tipoingresoh = null;
                $scope.dato.fechanotificacionh = null;
                $scope.dato.numeroh = null;
                $scope.dato.semananotificacionh = null;
                $scope.dato.direccionh = null;
            }

            $scope.limpiarFormularios = function () {
                $scope.limpiarFormularioAmbulatoria();
                $scope.limpiarFormularioHospitalaria();
                $scope.limpiarFormularioReportes();
            }
            $scope.SegundaParte = false;
            $scope.mostrarexamenfisico = false;

            // TIPO DE INGRESO SERÁ INTERNO
            $scope.obtenerTipoingreso = function () {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerTipoingreso' }
                }).then(function (response) {

                    $scope.tipodeingreso = response.data;

                })
            }

            // OBTENER TIPO DE AJUSTE
            $scope.obtenerAjuste = function () {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerAjuste' }
                }).then(function (response) {

                    $scope.tipodeajuste = response.data;

                })
            }

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

            // OBTENER ENTIDADES
            $scope.obtenerEntidades = function () {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerEntidades' }
                }).then(function (response) {

                    $scope.tipoentidades = response.data;
                })
            }

            $scope.obtenerEntidades();
            $scope.obtenerCasos();
            $scope.obtenerAjuste();
            $scope.obtenerTipoingreso();


            // OBTENER ENTIDADES
            // $scope.obtenerparentesco = function () {
            //     $http({
            //         method: 'POST',
            //         url: "json\parentescos.json",

            //     }).then(function (response) {

            //         $scope.Parentesco = response.data;
            //     })
            // }

            // afiliacionHttp.obtenerparentesco().then(function (response){
            //     $scope.Parentesco = response;
            //    })




            // ABRIR MODAL DE DIRECCION AMBULATORIO
            $scope.AbrirModalDireccion = function () {
                $scope.dialogDiagreg = ngDialog.open({
                    template: 'views/consultaAfiliados/nucleofamiliar/modal/modalDireccion.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'actualizarinformacion',
                    closeByDocument: false,
                    closeByEscape: false,
                    scope: $scope
                });
                $scope.dialogDiagreg.closePromise.then(function (data) {
                    if (data.value != "$closeButton") {
                        $scope.Act_Direccion2 = data.value;
                        $scope.dato.direccion = $scope.Act_Direccion2;
                        $scope.Localaidad2 = $('#barrio').val();
                        $scope.Act_Barrio = $scope.Localaidad2
                        $scope.$apply();
                    } else {
                        $scope.Act_Direccion;
                        $scope.Act_Barrio = $scope.barrio;
                    }
                });
            }

            // ABRIR MODAL DE IPS
            $scope.mostrarModalcenso = function (type, renglon) {
                $scope.renglon = renglon;
                $scope.dialogDiag = ngDialog.open({
                    template: 'views/salud/modal/modalIps.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'modalIpsctrl',
                    scope: $scope
                });
                $scope.dialogDiag.closePromise.then(function (data) {
                    if (data.value != "$closeButton") {
                        $scope.ips = {
                            codigo: data.value.codigo,
                            nombre: data.value.nombre,
                            ubicacion: data.value.ubicacion
                        }
                        if (typeof $scope.ips.codigo === "undefined" || typeof $scope.ips.nombre === "undefined") {
                            $scope.dato.ips = "";
                            $scope.dato.ipsvalue = null;
                        } else {
                            $scope.dato.ips = $scope.ips.codigo + ' - ' + $scope.ips.nombre;
                            $scope.dato.ipsvalue = $scope.ips.codigo;
                        }
                    }

                });

            }

            // ABRIR MODAL DE DIRECCION HOSPITALARIO
            $scope.AbrirModalDireccionh = function () {
                $scope.dialogDiagregh = ngDialog.open({
                    template: 'views/consultaAfiliados/nucleofamiliar/modal/modalDireccion.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'actualizarinformacion',
                    closeByDocument: false,
                    closeByEscape: false,
                    scope: $scope
                });
                $scope.dialogDiagregh.closePromise.then(function (data) {
                    if (data.value != "$closeButton") {
                        $scope.Act_Direccion2h = data.value;
                        $scope.dato.direccionh = $scope.Act_Direccion2h;
                        $scope.Localaidad2 = $('#barrio').val();
                        $scope.Act_Barrio = $scope.Localaidad2
                        $scope.$apply();
                    } else {
                        $scope.Act_Direccion;
                        $scope.Act_Barrio = $scope.barrio;
                    }
                });
            }






            // INSERT DE  SEMANA AMBULATORIA
            $scope.enviarreporte = function () {
                $scope.mostrarexamenfisico = false;
                swal({
                    title: 'Confirmar Proceso',
                    text: "Actualizó correctamente los datos basicos?",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar'
                }).then(function (result) {
                    if (result) {
                        $http({
                            method: 'POST',
                            url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                            data: {
                                function: 'enviarreporte',
                                datos: JSON.stringify($scope.dato),
                                type: 'C'
                            }
                        }).then(function (res) {
                            if (res.data.Codigo == 1) {
                                swal({
                                    title: Nombre,
                                    timer: 3000,
                                    type: 'success'
                                }).catch(swal.noop);
                                // $scope.segundaparte = false;
                                // $scope.limpiardatosbasicos();
                                // $scope.dato_fechaingreso = '';
                                // $scope.dato_fechacontrol = '';
                                // $scope.dato_fechanotificacion = '';

                            } else {
                                if (res.data.Codigo == 0) {
                                    swal('', res.data.Nombre, 'error')
                                }
                            }
                        });

                        $scope.mostrarexamenfisico = true;
                    }
                    $scope.$apply();
                }).catch(swal.noop);

                var Encontrar_Vacios = false;
                if ($scope.dato.telefono != undefined && $scope.dato.telefono != '' &&
                    $scope.dato.telefono != null) {
                    if ($scope.dato.reporta == 1) { //Fuente de informacion == 1

                        if ($scope.dato_fechanotificacion == undefined || $scope.dato_fechanotificacion == null || $scope.dato.semananoti == undefined || $scope.dato.semananoti == null || $scope.dato.semananoti == '') {
                            Encontrar_Vacios = true;
                            $scope.dato.fechanotificacion = '';
                        } else {
                            Encontrar_Vacios = false;
                            $scope.dato.fechanotificacion = (($scope.dato_fechanotificacion.getDate() < 10) ? '0' + $scope.dato_fechanotificacion.getDate() : $scope.dato_fechanotificacion.getDate()) +
                                '/' + ((($scope.dato_fechanotificacion.getMonth() + 1) < 10) ? '0' + ($scope.dato_fechanotificacion.getMonth() + 1) : ($scope.dato_fechanotificacion.getMonth() + 1)) + '/' + $scope.dato_fechanotificacion.getFullYear();
                        }
                    }
                    if (Encontrar_Vacios == false) {




                    } else {

                        swal({
                            title: '!COMPLETE TODOS LOS CAMPOS!',
                            timer: 3000,
                            type: 'info'
                        }).catch(swal.noop);
                    }
                } else {
                    swal('Información', '¡COMPLETE TODOS LOS DATOS BASICOS!', 'warning');
                }
            }

            $scope.GuardarDireccion = function (ViaPrincipal, NumViaPrincipal, Letra, Numero, Bis, Cuadrante, NumeroVG, SelectLetraVG, NumeroPlaca, CuadranteVG, Complemento) {
                $scope.closeThisDialog($('#direcciond').val());
                $scope.closeThisDialog($('#barrio').val());
            }

            $scope.validarexament = function () {
                if ($scope.dato.apetitot == 1) {
                    $scope.dato.ftlct = 1;

                } else {
                    $scope.dato.ftlct = '';

                }
            }


            $scope.validardocumento = function () {
                if ($scope.dato.tipo == "PE") {
                    $scope.dato.paisorigin = "VENEZUELA";

                } else {
                    $scope.dato.paisorigin = "COLOMBIA";

                }
            }

            //ENVIAR CABEZA HOSPITALARIOS
            $scope.enviarreporteh = function () {
                $scope.dato.responsable = sessionStorage.getItem('cedula')

                var Encontrar_Vaciosh = false;
                if ($scope.dato.reportah != null && $scope.dato.reportah != '' && $scope.dato.paisorigin != null && $scope.dato.paisorigin != '' && $scope.dato.telefono != undefined && $scope.dato.telefono != '' &&
                    $scope.dato.telefono != null && $scope.dato.ips != undefined && $scope.dato.ips != '' && $scope.dato.ips != null) {
                    if ($scope.dato.reportah == 1) { //Fuente de informacion == 1

                    }
                    if (Encontrar_Vaciosh == false) {
                        const datos = $scope.dato;
                        datos.ips = $scope.dato.ipsvalue;
                        delete datos.ipsvalue;

                        $http({
                            method: 'POST',
                            url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                            data: {
                                function: 'enviarreporteh',
                                datos: JSON.stringify($scope.dato),
                                type: 'C'
                            }
                        }).then(function (res) {
                            if (res.data.Codigo == 1) {
                                swal({
                                    title: '!Datos guardados!',
                                    timer: 3000,
                                    type: 'success'
                                }).catch(swal.noop);
                                $scope.segundaparte = false;
                                $scope.limpiardatosbasicos();
                                $scope.dato_fechaingreso = '';
                                $scope.dato_fechacontrol = '';
                                $scope.dato_fechanotificacion = '';

                            } else {
                                if (res.data.Codigo == 0) {
                                    swal('', res.data.Nombre, 'error')
                                }
                            }
                        });

                    } else {

                        swal({
                            title: '!COMPLETE TODOS LOS CAMPOS!',
                            timer: 3000,
                            type: 'info'
                        }).catch(swal.noop);
                    }
                } else {
                    swal('Información', '¡COMPLETE TODOS LOS DATOS BASICOS!', 'warning');
                }

            }

            $scope.formatNumero = function (NID) {
                const input = document.getElementById('' + NID + '');
                var num = input.value.replace(/[^0-9]/g, '');
                if (!isNaN(num)) {
                    input.value = num;
                } else {
                    input.value = input.value.replace(/[^0-9]*/g, '');
                }
            }

            $scope.totalf75 = function () {
                $scope.dato.tomasdiariash = ($scope.dato.tomasdiariash == undefined) ? 0 : $scope.dato.tomasdiariash;
                $scope.dato.f75mlh = ($scope.dato.f75mlh == undefined) ? 0 : $scope.dato.f75mlh;
                $timeout(
                    function () {
                        $scope.dato.totalconsumoh = $scope.dato.tomasdiariash * $scope.dato.f75mlh;
                    }, 200
                )
            }

            $scope.fecha_mes = function () {
                if ($scope.dato.f75h == 1 || $scope.dato.f75h == '') {
                    $scope.dato.messuministroh = $scope.dato_fechaevolucionh.getMonth() + 1;
                }

            }

            //ENVIAR DETALLES HOSPITALARIOS
            $scope.dato.diasconsumoh = '1';
            $scope.dato.diasdeconsumot = '1';
            $scope.enviarreportesh = function () {
                var Encontrar_Vaciosh = false;
                if ($scope.dato.f75h != null && $scope.dato.f75h != '' && $scope.dato.apetitohh != null && $scope.dato.apetitohh != '' && $scope.dato.apetitohh != undefined &&
                    $scope.dato.pesoh != null && $scope.dato.pesoh != '' && $scope.dato.pesoh != undefined &&
                    $scope.dato.tallah != null && $scope.dato.tallah != '' && $scope.dato.tallah != undefined &&
                    $scope.dato.puntajezh != null && $scope.dato.puntajezh !== '' && $scope.dato.puntajezh != undefined &
                    $scope.dato.clasificaciontallah != null && $scope.dato.clasificaciontallah != '' && $scope.dato.clasificaciontallah != undefined &&
                    $scope.dato.perimetrobrazoh != null && $scope.dato.perimetrobrazoh != '' && $scope.dato.perimetrobrazoh != undefined &&
                    $scope.dato.edemah != null && $scope.dato.edemah != '' && $scope.dato.edemah != undefined &&
                    $scope.dato.emaciacionh != null && $scope.dato.emaciacionh != '' && $scope.dato.emaciacionh != undefined &&
                    $scope.dato.alteracionesh != null && $scope.dato.alteracionesh != '' && $scope.dato.alteracionesh != undefined &&
                    $scope.dato.fiebreh != null && $scope.dato.fiebreh != '' && $scope.dato.fiebreh != undefined &&
                    $scope.dato.vomitoh != null && $scope.dato.vomitoh != '' && $scope.dato.vomitoh != undefined &&
                    $scope.dato.hipoglesimiah != null && $scope.dato.hipoglesimiah != '' && $scope.dato.hipoglesimiah != undefined &&
                    $scope.dato.diarreah != null && $scope.dato.diarreah != '' && $scope.dato.diarreah != undefined &&
                    $scope.dato.hipotermiah != null && $scope.dato.hipotermiah != '' && $scope.dato.hipotermiah != undefined &&
                    $scope.dato.deshidratacionh != null && $scope.dato.deshidratacionh != '' && $scope.dato.deshidratacionh != undefined &&
                    $scope.dato.letargicoh != null && $scope.dato.letargicoh != '' && $scope.dato.letargicoh != undefined &&
                    $scope.dato.f75mlh != null && $scope.dato.f75mlh != '' && $scope.dato.f75mlh != undefined &&
                    $scope.dato.tomasdiariash != null && $scope.dato.tomasdiariash != '' && $scope.dato.tomasdiariash != undefined &&
                    $scope.dato.diasconsumoh != null && $scope.dato.diasconsumoh != '' && $scope.dato.diasconsumoh != undefined &&
                    $scope.dato.totalconsumoh != null && $scope.dato.totalconsumoh != '' && $scope.dato.totalconsumoh != undefined &&
                    $scope.dato.resultadoseguimientoh != null && $scope.dato.resultadoseguimientoh != '' && $scope.dato.resultadoseguimientoh != undefined &&
                    $scope.dato.medicamentos1h != null && $scope.dato.medicamentos1h != '' && $scope.dato.medicamentos1h != undefined &&
                    $scope.dato.profesionh != null && $scope.dato.profesionh != '' && $scope.dato.profesionh != undefined &&
                    $scope.dato.nombredelprofesionalh != null && $scope.dato.nombredelprofesionalh != '' && $scope.dato.nombredelprofesionalh != undefined) {

                    if ($scope.dato_fechaevolucionh == undefined || $scope.dato_fechaevolucionh == null) {
                        Encontrar_Vaciosh = true;
                        $scope.dato.fechaevolucionh = '';
                    } else {
                        Encontrar_Vaciosh = false;
                        $scope.dato.fechaevolucionh = (($scope.dato_fechaevolucionh.getDate() < 10) ? '0' + $scope.dato_fechaevolucionh.getDate() : $scope.dato_fechaevolucionh.getDate()) +
                            '/' + ((($scope.dato_fechaevolucionh.getMonth() + 1) < 10) ? '0' + ($scope.dato_fechaevolucionh.getMonth() + 1) : ($scope.dato_fechaevolucionh.getMonth() + 1)) + '/' + $scope.dato_fechaevolucionh.getFullYear();
                    }

                    if ($scope.dato.apetitot == 1) { //Fuente de informacion == 1

                        if ($scope.dato_fechacontrolt == undefined || $scope.dato_fechacontrolt == null) {
                            Encontrar_Vaciosh = true;
                            $scope.dato.fechacontrolt = '';
                        } else {
                            Encontrar_Vaciosh = false;
                            $scope.dato.fechacontrolt = (($scope.dato_fechacontrolt.getDate() < 10) ? '0' + $scope.dato_fechacontrolt.getDate() : $scope.dato_fechacontrolt.getDate()) +
                                '/' + ((($scope.dato_fechacontrolt.getMonth() + 1) < 10) ? '0' + ($scope.dato_fechacontrolt.getMonth() + 1) : ($scope.dato_fechacontrolt.getMonth() + 1)) + '/' + $scope.dato_fechacontrolt.getFullYear();
                        }
                    }

                    // if (Encontrar_Vaciosh == false) {
                    //     const datos = $scope.dato;
                    //     datos.ips = $scope.dato.ipsvalue;
                    //     delete datos.ipsvalue;
                    $scope.dato.responsable = sessionStorage.getItem('cedula')
                    if (Encontrar_Vaciosh == false) {
                        $scope.dato.ftlct = $scope.dato.ftlct === '' ? '2' : $scope.dato.ftlct = '1'
                        $http({
                            method: 'POST',
                            url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                            data: {
                                function: 'enviarreporteh',
                                datos: JSON.stringify($scope.dato),
                                type: 'D',
                                adj: JSON.stringify($scope.resultado),
                                lenadjunto: $scope.arrayFiles.length
                            }

                        }).then(function (res) {
                            if (res.data.Codigo == 1) {
                                swal({
                                    title: '!Datos guardados!',
                                    timer: 3000,
                                    type: 'success'

                                }).catch(swal.noop);
                                $('#modalsemanah').modal('close');
                                $scope.dato_fechaevolucionh = '';
                                $scope.detalleh($scope.desnutrido_seg);
                                $scope.limpiardatoscontrolh();
                                $scope.dato_fechaevolucionh = '';

                            } else {
                                if (res.data.Codigo == 0) {
                                    swal('', res.data.Nombre, 'error')
                                }
                            }
                        });
                    } else {

                        swal({
                            title: '!COMPLETE TODOS LOS CAMPOS!',
                            timer: 3000,
                            type: 'info'
                        }).catch(swal.noop);
                    }
                } else {
                    swal('Información', '¡COMPLETE TODOS LOS DATOS !', 'warning');
                }
            }

            //PINTAR SUMINISTRO
            $scope.mostrar_suministro = function () {
                if ($scope.F75 == 1) {
                    $scope.mostrar_suministro = 'F75';
                } else {
                    $scope.mostrar_suministro = 'FTLC';
                }

            }

            // VALIDACION DE EXAMEN FTLC
            $scope.validarexamen = function () {
                if ($scope.dato.examenapetito == 1) {
                    $scope.dato.ftlc = 1;
                    $scope.dato.resultadoseguimiento = '';
                    $scope.validarexamendsb = true;
                    $scope.resultadosdsb = false;

                } else {
                    $scope.dato.ftlc = "";

                }
            }

            // $scope.validarexamen = function () {
            //     if ($scope.dato.examenapetito == 2) {
            //         $scope.dato.ftlc = 2;
            //         $scope.dato.resultadoseguimiento = 1;
            //         $scope.validarexamendsb = true;
            //         $scope.resultadosdsb = true;

            //     } else {
            //         $scope.dato.ftlc = 1;
            //         $scope.dato.resultadoseguimiento = '';
            //         $scope.validarexamendsb = true;
            //         $scope.resultadosdsb = false;

            //     }
            // }


            // VALIDACION DE EDEMA
            $scope.validaredemadsb = true;
            $scope.validaredema = function () {
                if ($scope.dato.edema == 2) {
                    $scope.validaredemadsb = true;
                    $scope.dato.tipodeedema = '';


                } else {
                    $scope.validaredemadsb = false;


                }
            }

            // VALIDACION DE SUMINISTRO F75
            $scope.validarsuministro = function () {
                if ($scope.dato.f75h == 2) {
                    $scope.dato.messuministroh = 0;
                    $scope.validarsuministrodsb = true;

                } else {
                    // $scope.dato.messuministroh = '';
                    $scope.fecha_mes();
                    $scope.validarsuministrodsb = false;

                }
            }

            $scope.validarresultados = function () {
                if ($scope.dato.resultadoseguimiento == 5 || $scope.dato.resultadoseguimiento == 1) {
                    $scope.proximocontroldsb = true;


                } else {
                    $scope.proximocontroldsb = false;
                }
            }

            //traer datos del afiliado AMBULATORIA
            $scope.consulta = function () {
                $scope.mostrarseguimiento = false;
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'buscaafiliado', type: $scope.dato.tipo, id: $scope.dato.numeroid }
                }).then(function (res) {

                    if (res.data.length > 0) {

                        
                        // $scope.mostrarseguimiento = false;
                        $scope.segundaparte = true;
                        $scope.dato.nombremadre = (res.data[0].NOMBREMADRE == null) ? 'NO APLICA' : res.data[0].NOMBREMADRE;
                        $scope.dato.pnombre = res.data[0].PNOMBRE;
                        $scope.dato.snombre = res.data[0].SNOMBRE;
                        $scope.dato.papellido = res.data[0].PAPELLIDO;
                        $scope.dato.sapellido = res.data[0].SAPELLIDO;
                        $scope.dato.municipio = res.data[0].MUNICIPIOS;
                        $scope.dato.departamento = res.data[0].DEPARTAMENTO;
                        $scope.dato.direccion = res.data[0].DIRECCION;
                        $scope.dato.regimen = res.data[0].REGIMEN;
                        $scope.dato.sexo = res.data[0].SEXO;
                        $scope.dato.fechanacimiento = res.data[0].FECHANAC;
                        $scope.dato.zona = res.data[0].ZONA;
                        $scope.dato.eps = res.data[0].EPS;
                        $scope.dato.edad = res.data[0].EDAD;
                        $scope.dato.celular = res.data[0].CELULAR;
                        $scope.dato.telefono = res.data[0].TELEFONO;
                        $scope.dato.codzona = res.data[0].CODZONA;
                    } else {
                        swal('Información', '¡DOCUMENTO INVALIDO!', 'error')
                        $scope.segundaparte = false;
                        $scope.mostrarexamenfisico = false;
                        // $scope.limpiardatosbasicos();
                        $scope.dato_fechaingreso = '';
                        $scope.dato_fechacontrol = '';
                        $scope.dato_fechanotificacion = '';
                    }

                    if ($scope.dato.edad > 59) {
                        $scope.segundaparte = false;
                        swal({
                            title: '!EL NIÑO NO PUEDE INGRESAR A EL PROGRAMA, ES MAYOR A 5 AÑOS!',
                            timer: 5000,
                            type: 'error'

                        }).catch(swal.noop);
                    }

                })

                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenercontrol', type: $scope.dato.tipo, id: $scope.dato.numeroid }
                }).then(function (res) {
                    $scope.listacontrol = res.data;
                })

                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerestancia', id: $scope.dato.numeroid }
                }).then(function (res) {
                    $scope.tiempodeespera = res.data[0].DIAS;
                    $scope.seguimiento = res.data[0].SEGUIMIENTO;

                })


                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerips', type: $scope.dato.tipo, id: $scope.dato.numeroid }
                }).then(function (res) {
                    $scope.dato.mostrarips = res.data[0].IPSASIGNADA;
                    $scope.dato.ips = res.data[0].NIT;

                })

                $http({
                    method: 'POST',
                    url: "json/parentescos.json",

                }).then(function (response) {

                    $scope.Parentesco = response.data;
                    console.log(response.data)
                })

                  $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'llamar_parentesco', }


                }).then(function (response) {

                    $scope.Parentesco = response.data;
                    console.log(response.data)
                })
            }




            $scope.mostrarexamenfisicoclick = function () {
                $scope.mostrarexamenfisico = false;
                swal({
                    title: 'Confirmar Proceso',
                    text: "Actualizó correctamente los datos basicos?",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar'
                }).then(function (result) {
                    if (result) {
                        $scope.mostrarexamenfisico = true;
                    }
                    $scope.$apply();
                }).catch(swal.noop);
            }


            $scope.busquedaDetalles = function () {
                $scope.segundaparte = false;
                $scope.mostrarexamenfisico = false;
                $scope.vistas = false;
                $scope.busquedaXdetalles = ngDialog.open({
                    template: 'views/saludpublica/modal/modalbusquedaafiliado.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'modalbusquedaafiliado',
                    closeByEscape: false,
                    closeByDocument: false

                });
                $scope.busquedaXdetalles.closePromise.then(function (response) {
                    if (response.value === undefined) { return; }
                    if (response.value != "$closeButton") {
                        $scope.type = response.value.tipo;
                        $scope.id = response.value.documento;
                        // $scope.busquedaAfiliado();
                    }
                });
            }

            $scope.diasdeespera = function () {
                if ($scope.tiempodeespera >= 10) {

                }
            }



            $scope.dato.parentesco = "";



            $scope.semana_noti = function () {
                var f = $scope.dato_fechanotificacion;
                var v_dia = (f.getDate() <= 9) ? '0' + f.getDate() : f.getDate();

                var v_mes = ((f.getMonth() + 1) <= 9) ? '0' + (f.getMonth() + 1) : (f.getMonth() + 1);

                var v_ano = f.getFullYear();
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenersemana', ano: v_ano, mes: v_mes, dia: v_dia }
                }).then(function (res) {
                    // console.log(res.data)
                    $scope.dato.periodonoti = res.data[0].PERIODO;
                    $scope.dato.semananoti = res.data[0].SEMANA;

                })
            }

            //traer datos del afiliado HOSPITALARIO
            $scope.consultah = function () {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'buscaafiliado', type: $scope.dato.tipoh, id: $scope.dato.numeroidh }
                }).then(function (res) {

                    if (res.data.length > 0) {

                        $scope.segundaparte = true;
                        $scope.dato.nombremadre = res.data[0].NOMBREMADRE;
                        $scope.dato.pnombre = res.data[0].PNOMBRE;
                        $scope.dato.snombre = res.data[0].SNOMBRE;
                        $scope.dato.papellido = res.data[0].PAPELLIDO;
                        $scope.dato.sapellido = res.data[0].SAPELLIDO;
                        $scope.dato.municipio = res.data[0].MUNICIPIOS;
                        $scope.dato.departamento = res.data[0].DEPARTAMENTO;
                        $scope.dato.direccion = res.data[0].DIRECCION;
                        $scope.dato.regimen = res.data[0].REGIMEN;
                        $scope.dato.sexo = res.data[0].SEXO;
                        $scope.dato.fechanacimiento = res.data[0].FECHANAC;
                        $scope.dato.zona = res.data[0].ZONA;
                        $scope.dato.eps = res.data[0].EPS;
                        $scope.dato.edad = res.data[0].EDAD;
                        $scope.dato.telefono = res.data[0].TELEFONO;
                        $scope.dato.celular = res.data[0].CELULAR;
                        $scope.dato.codzona = res.data[0].CODZONA;
                    } else {
                        swal('Información', '¡DOCUMENTO INVALIDO!', 'error')
                        $scope.segundaparte = false;
                        $scope.dato_fechaingreso = '';
                        $scope.dato_fechacontrol = '';
                        $scope.dato_fechanotificacion = '';
                    }

                    if ($scope.dato.edad > 59) {
                        $scope.segundaparte = false;
                        swal({
                            // title: '!EL NIÑO NO PUEDE INGRESAR A EL PROGRAMA, ES MAYOR A 5 AÑOS!',
                            text: '!EL NIÑO NO PUEDE INGRESAR A EL PROGRAMA, ES MAYOR A 5 AÑOS!',
                            timer: 5000,
                            type: 'error'

                        }).catch(swal.noop);
                    }

                })

                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenercontrolh', type: $scope.dato.tipoh, id: $scope.dato.numeroidh }
                }).then(function (res) {
                    $scope.listacontrol = res.data;
                })
            }

                // $http({
                //     method: 'POST',
                //     url: "json/parentescos.json",

                // }).then(function (response) {

                //     $scope.Parentesco = response.data;
                // })




            //OBTENER SOPORTES
            $scope.archivo = function () {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'archivos', type: $scope.dato.tipo, id: $scope.dato.numeroid }
                }).then(function (res) {
                    if (res.data.length > 0) {
                        $scope.dato.abrirsoportes = res.data[0];
                        $scope.abrirsoportes = true;
                    } else {
                        notification.getNotification('info', res.data.MENSAJE, 'Notificación');
                    }

                })
            }


            //OBTENER REPORTES
            $scope.obtener_reporte = function () {
                $scope.listareporte = '';
                if ($scope.tabla_reporte != undefined) {
                    $scope.tabla_reporte.destroy();
                    console.log($scope.tabla_reporte);
                }
                console.log($scope.listareporte);
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'reporte_total' }
                }).then(function (res) {
                    $scope.listareporte = res.data;
                    $timeout(
                        function () {
                            $scope.tabla_reporte = $('#tabla_reporte').DataTable({
                                dom: 'lBsfrtip',
                                select: true,
                                buttons: [{
                                    extend: 'excelHtml5',
                                    messageTop: 'Reportes Desnutricion',
                                    // exportOptions: {
                                    //     modifer: {
                                    //         page: 'all'
                                    //     }
                                    // },
                                    // columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]
                                }],
                                language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                                lengthMenu: [
                                    [10, 20, 50, -1],
                                    [10, 20, 50, 'Todas']
                                ],
                                "scrollX": true,
                                order: [
                                    [0, "asc"]
                                ],
                                "columnDefs": [{
                                    "targets": [23, 30],
                                    "visible": false
                                }],
                            });
                            $scope.tabla_reporte.draw();

                            $timeout(
                                function () {
                                    document.querySelector('button.buttons-excel').classList.add("btn");
                                    document.querySelector('button.buttons-excel').classList.add('white-text');
                                }, 300
                            )
                        }, 500
                    )


                })
            }

            //BOTON DE SUBIR SOPORTES
            $scope.subirsoportes1 = () => {
                if ($scope.dato.profesion == " " || $scope.dato.profesion == "") {
                    let tipoDocumentos = [];
                    $http({
                        method: 'POST',
                        url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                        data: { function: 'obtener_esquema_soportes' }
                    }).then(async (response) => {
                        tipoDocumentos = response.data;
                        const files = {
                            historiaclinica: $scope.dato.historiaclinica,
                            visitasdomiciliarias: $scope.dato.visitasdomiciliarias,
                            confirmaciondiagnostico: $scope.dato.confirmaciondiagnostico,
                            esquemadevacunacion: $scope.dato.esquemadevacunacion,
                            seguimientotelefonico: $scope.dato.seguimientotelefonico
                        }
                        const archivos = [];
                        if (files.historiaclinica) {
                            archivos.push(await $scope.obtenerArchivo('historiaclinica', tipoDocumentos));
                        }
                        if (files.visitasdomiciliarias) {
                            archivos.push(await $scope.obtenerArchivo('visitasdomiciliarias', tipoDocumentos));
                        }
                        if (files.confirmaciondiagnostico) {
                            archivos.push(await $scope.obtenerArchivo('confirmaciondiagnostico', tipoDocumentos));
                        }
                        if (files.esquemadevacunacion) {
                            archivos.push(await $scope.obtenerArchivo('esquemadevacunacion', tipoDocumentos));
                        }
                        if (files.seguimientotelefonico) {
                            archivos.push(await $scope.obtenerArchivo('seguimientotelefonico', tipoDocumentos));
                        }
                        $http({
                            method: 'POST',
                            url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                            data: {
                                function: 'subir_soporte_adicionales',
                                codigo_desnutricion: $scope.codigoDesnu,
                                codigoSemana: $scope.numerodesemana,
                                data: archivos,
                                id: $scope.dato.numeroid
                            }

                        }).then(function (response) {
                            if (response.data.Codigo == '1') {
                                swal('Notifiacion', response.data.Nombre, 'success');
                                $scope.mostrarSoportes($scope.numerodesemana, $scope.codigoDesnu);
                                // $scope.limpiarreportes();
                            } else {
                                swal('Notifiacion', response.data.Nombre, 'error');
                            }

                        });
                    });
                } else {
                    $scope.datainfo = [];
                    var adjunto = $("#soppro");
                    var nombrecampo = $("#nombrecampo")[0].innerText;
                    if (adjunto[0].value == null || adjunto[0].value == undefined || adjunto[0].value == '') {
                        swal('Notificacion', 'Debe Adjuntar Un Soporte', 'error');
                    } else {
                        var FR = new FileReader();
                        FR.addEventListener("load", function (e) {
                            $scope.archivobase = e.target.result;
                            $scope.extensionarchivo = adjunto[0].files[0].name.split('.').pop();
                            $scope.datainfo.push({ "tipo": 6, "tipo_profesion": $scope.dato.profesion, "archivobase": $scope.archivobase, "nombre": nombrecampo, "extensionarchivo": $scope.extensionarchivo });
                            $scope.SubirSoporte($scope.datainfo);
                        });
                        FR.readAsDataURL(adjunto[0].files[0]);
                    }

                }

            }

            $scope.SubirSoporte = function (data) {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: {
                        function: 'subir_soporte_adicionales',
                        codigo_desnutricion: $scope.codigoDesnu,
                        codigoSemana: $scope.numerodesemana,
                        data: data,
                        id: $scope.dato.numeroid
                    }

                }).then(function (response) {
                    if (response.data.Codigo == '1') {
                        swal('Notifiacion', response.data.Nombre, 'success');
                        $scope.mostrarSoportes($scope.numerodesemana, $scope.codigoDesnu);
                        // $scope.limpiarreportes();
                    } else {
                        swal('Notifiacion', response.data.Nombre, 'error');
                    }
                });
            }


            //OBTENER PUNTAJE Z AMBULATORIO
            $scope.puntajez = function () {
                var sexs = $scope.dato.sexo.substring(0, 1);
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerpuntajez', sexo: sexs, peso: $scope.dato.peso, talla: $scope.dato.talla }
                }).then(function (res) {
                    if (res.data.length > 0) {
                        $scope.dato.puntajez = res.data[0].PUNTAJEZ;
                        $scope.dato.clasificaciontalla = res.data[0].CLASIFICACION;
                        $scope.diagnostico = "Se determina por la desviación estandar este paciente debe ir control hospitalario";
                    } else {
                        swal('Informacion', 'Error Calculando El Puntanje', 'info');
                        $scope.dato.puntajez = '';
                        $scope.dato.clasificaciontalla = '';
                        $scope.diagnostico = "";


                    }
                })
            }


            //OBTENER PUNTAJE Z HOSPITALARIO
            $scope.puntajezh = function () {
                var sexsh = $scope.dato.sexo.substring(0, 1);
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerpuntajez', sexo: sexsh, peso: $scope.dato.pesoh, talla: $scope.dato.tallah }
                }).then(function (res) {
                    if (res.data.length > 0) {
                        $scope.dato.puntajezh = res.data[0].PUNTAJEZ;
                        $scope.dato.clasificaciontallah = res.data[0].CLASIFICACION;
                    } else {
                        swal('Informacion', 'Error Calculando El Puntanje', 'info');
                    }
                })
            }


            //OBTENER PUNTAJE Z HOSPITALARIO TRANSICIÓN
            $scope.puntajezt = function () {
                var sexst = $scope.dato.sexo.substring(0, 1);
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerpuntajez', sexo: sexst, peso: $scope.dato.pesot, talla: $scope.dato.tallat }
                }).then(function (res) {
                    if (res.data.length > 0) {
                        $scope.dato.puntajezt = res.data[0].PUNTAJEZ;
                        $scope.dato.clasificaciontallat = res.data[0].CLASIFICACION;
                    } else {
                        swal('Informacion', 'Error Calculando El Puntanje', 'info');
                    }
                })
            }



            //OBTENER PUNTAJE Z HOSPITALARIO EGRESO
            $scope.puntajeze = function () {
                var sexse = $scope.dato.sexo.substring(0, 1);
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerpuntajez', sexo: sexse, peso: $scope.dato.pesoe, talla: $scope.dato.tallae }
                }).then(function (res) {
                    if (res.data.length > 0) {
                        $scope.dato.puntajeze = res.data[0].PUNTAJEZ;
                        $scope.dato.clasificaciontallae = res.data[0].CLASIFICACION;
                    } else {
                        swal('Informacion', 'Error Calculando El Puntanje', 'info');
                    }
                })
            }


            // $scope.consultah = function () {
            //     $http({
            //         method: 'POST',
            //         url: "php/novedades/funcnovedades.php",
            //         data: { function: 'buscaafiliado', type: $scope.dato.tipoh, id: $scope.dato.numeroidh }
            //     }).then(function (res) {
            //         if (res.data.length > 0) {
            //             // PRIMERA FILA
            //             $scope.dato.tipoingresoh = res.data.TIPOINGRESO;
            //             $scope.dato.fechanotificacionh = res.data.FECHANITIFICACION;
            //             $scope.dato.numeroconsecutivo = res.data.NUMEROCONSECUTIVO;
            //             $scope.dato.semananotificacionh = res.data.SEMANANOTIFICACION;
            //             // SEGUNDA FILA 
            //             $scope.dato.abrirsemanah = res.data.ABRIRSEMANA;
            //             //SEGUNDA PARTE
            //             $scope.segundaparteh = true;
            //             //FILA UNO
            //             $scope.dato.pnombreh = res.data.PRIMERNOMBRE;
            //             $scope.dato.snombreh = res.data.SEGUNDONOMBRE;
            //             $scope.dato.papellidoh = res.data.PRIMERAPELLIDO;
            //             $scope.dato.sapellidoh = res.data.SEGUNDOAPELLIDO;
            //             //FILA DOS
            //             $scope.dato.paisorigenh = res.data.PAISORIGEN;
            //             $scope.dato.municipioh = res.data.NOMBRE_DEPARTAMENTO;
            //             $scope.dato.departamentoh = res.data.NOMBRE_MUNICIPIO;
            //             $scope.dato.direccionh = res.data.DIRECCION;
            //             $scope.dato.regimenh = res.data.REGIMEN;
            //             $scope.dato.sexoh = res.data.SEXO;
            //             $scope.dato.fechanacimientoh = res.data.NACIMIENTO;
            //             $scope.dato.zonah = res.data.ZONA;
            //             $scope.dato.entidadeapbh = "CC055";
            //             $scope.dato.epsh = "CAJACOPI";
            //         } else {
            //             swal('Información', 'Documento invalido', 'error')
            //         }
            //     })
            // }

            $http({
                method: 'PSOT',
                url: "php/consultaafiliados/funcnovedadacb.php",
                data: { function: 'cargaDepartamentos' }
            }).then(function (response) {
                $scope.Depto = response.data;
            });


            $http({
                method: 'PSOT',
                url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                data: { function: 'obtenerprofesion' }
            }).then(function (response) {
                $scope.profe = response.data;
            });

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

            // $("form").on("change", ".file-upload-field", function () {
            //     console.log();
            // switch ($(this)[0].id) {
            //     case 'historiaclinica2':
            //         $scope.tiposop = 1;
            //         break;
            //     case 'confirmaciondiagnostico2':
            //         $scope.tiposop = 2;
            //         break;
            //     case 'visitasdomiciliarias2':
            //         $scope.tiposop = 3;
            //         break;

            //     case 'seguimientotelefonico2':
            //         $scope.tiposop = 4;
            //         break;
            //     case 'esquemadevacunacion2':
            //         $scope.tiposop = 5;
            //         break;

            //     case 'formulamedica':
            //         $scope.tiposop = 6;
            //         break;

            //     default:
            //         break;
            // }

            //     $scope.fileToBase64($(this)["0"].files, $(this)[0].id, $(this)["0"].files["0"].type.split('/').pop(), $scope.tiposop);
            // });

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

            $scope.EnviarSoporte = function () {
                if ($scope.arrayFiles.length == 0) {
                    swal('Notificacion', 'Debe Adjuntar Un Soporte', 'info');
                } else {
                    $http({
                        method: 'POST',
                        url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                        data: { function: 'subir_soporte_denustricion', data: $scope.arrayFiles } // JSON.stringify($scope.arrayFiles)}
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
                                        function: 'cargarsoporte',
                                        codigo_desnutricion: $scope.codigodesarrollomodal,
                                        codigoSemana: $scope.cod_semanamodal,
                                        respo: $scope.dato.responsable,
                                        rutas: res.data[i].ruta,
                                        tipo: res.data[i].tipo,
                                        tipo_profesion: res.data[i].profesion
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

        }
    ]);