'use strict';

angular.module('GenesisApp')

    .controller('consultaautorizacionafiliadosController', ['$scope', '$http', '$location', '$filter', 'ngDialog', '$timeout', 'pqrHttp', 'afiliacionHttp', function ($scope, $http, $location, $filter, ngDialog, $timeout, pqrHttp, afiliacionHttp) {

        $(document).ready(function () {
            $('#modaldiagnostico').modal();
            $('#modaldetalle').modal();
            $('#modalnovedades').modal();
            $("#modaldocumentos").modal();
            $("#modalhistoricochat").modal();
        });

        //variables de control

        // variables TAB I
        //secciones de ng hide        
        $scope.inactiveseccion4tab4 = false;
        $scope.activetipotabIV = true;
        $scope.nofindproductstabI = false;
        $scope.nofindproductstabIV = false;
        $scope.inactimiprestab1 = true;
        $scope.inactimiprestab4 = true;
        $scope.inactivetagmipres = true;
        $scope.inactivetagctc = true;
        $scope.inactivetagtutela = true;
        $scope.inactivetagsiniestro = true;
        $scope.nameservicio = 'de orden'
        $scope.inactivebarrapro = true;
        $scope.verAutorizaciones = true;


        // wizard

        $scope.invsolicitudtabI = true;
        $scope.invproductotabI = true;
        $scope.invfinalizartabI = true;
        $scope.invfinalizartabIV = true;

        // variables TAB II
        //secciones de ng hide
        $scope.inactiveseccion1tab2 = false;
        $scope.inactiveseccion2tab2 = true;
        $scope.productosagregadostabII = [];
        $scope.nofindproductstabII = false;
        // wizard
        $scope.invsolicitudtabII = true;
        $scope.invproductotabII = true;
        $scope.invfinalizartabII = true;


        $scope.novedades = null;
        $scope.datosAfiModalNov = null;
        $scope.tutelaParam = null;
        $scope.siniestroParam = null;
        $scope.maxDate = null;
        $scope.documentosAfiliado = null;
        $scope.v_encabezado = null;
        $scope.fechactual = null;

        //Se valida fecha actual

        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth() + 1; //hoy es 0!
        var yyyy = hoy.getFullYear();

        $scope.fechactual = hoy;

        if (dd < 10) {
            dd = '0' + dd
        }



        if (mm < 10) {
            mm = '0' + mm
        }



        $scope.maxDate = yyyy + '-' + mm + '-' + dd;




        $scope.filterOptions = 'AFILIADO';
        $scope.autdocumento = null;
        $scope.autnumero = null;
        $scope.autubicacion = null;
        $scope.autnitips = null;

        $scope.jsonautorizacion
        $.getJSON("php/obtenersession.php")
            .done(function (respuesta) {
                console.log(respuesta);
                $scope.sesdata = respuesta;

                $scope.jsonautorizacion = {
                    tipodocumento: $scope.sesdata.tipo,
                    documentoavanzado: $scope.sesdata.cedula
                }
                $scope.buscarAutorizaciones();

            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log("Error obteniendo session variables");
            });


        function validate_fecha(fecha) {
            var patron = new RegExp("^(19|20)+([0-9]{2})([-])([0-9]{1,2})([-])([0-9]{1,2})$");
            if (fecha.search(patron) == 0) {
                var values = fecha.split("-");
                if (isValidDate(values[2], values[1], values[0])) {
                    return true;
                }
            }
            return false;
        }

        function isValidDate(day, month, year) {
            var dteDate;
            month = month - 1;
            dteDate = new Date(year, month, day);
            //Devuelva true o false...
            return ((day == dteDate.getDate()) && (month == dteDate.getMonth()) && (year == dteDate.getFullYear()));
        }


        $scope.calcularEdad = function (date, tipo) {
            //var fecha=document.getElementById("user_date").value;
            var fecha = date.split("/").reverse().join("-");
            if (validate_fecha(fecha) == true) {
                // Si la fecha es correcta, calculamos la edad
                var values = fecha.split("-");
                var dia = values[2];
                var mes = values[1];
                var ano = values[0];

                // cogemos los valores actuales
                var fecha_hoy = new Date();
                var ahora_ano = fecha_hoy.getYear();
                var ahora_mes = fecha_hoy.getMonth() + 1;
                var ahora_dia = fecha_hoy.getDate();

                // realizamos el calculo
                var edad = (ahora_ano + 1900) - ano;
                if (ahora_mes < mes) {
                    edad--;
                }

                if ((mes == ahora_mes) && (ahora_dia < dia)) {
                    edad--;
                }

                if (edad > 1900) {
                    edad -= 1900;
                }



                // calculamos los meses
                var meses = 0;
                if (ahora_mes > mes)
                    meses = ahora_mes - mes;
                if (ahora_mes < mes)
                    meses = 12 - (mes - ahora_mes);
                if (ahora_mes == mes && dia > ahora_dia)
                    meses = 11;

                // calculamos los dias
                var dias = 0;
                if (ahora_dia > dia)
                    dias = ahora_dia - dia;
                if (ahora_dia < dia) {
                    var ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
                    dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
                }

                if (tipo == 1) {
                    if (edad > 0) {
                        $scope.cantidadanosaut = 'años'
                        if (edad == 1) {
                            $scope.cantidadanosaut = 'años'
                        }

                        $scope.edadaut = edad;

                    } else {

                        if (meses > 0) {

                            $scope.cantidadanosaut = 'meses'

                            if (meses == 1) {

                                $scope.cantidadanosaut = 'mes'

                            }

                            $scope.edadaut = meses;

                        } else {

                            if (dias > 0) {

                                $scope.cantidadanosaut = 'dias'

                                if (dias == 1) {

                                    $scope.cantidadanosaut = 'dia'

                                }

                                $scope.edadaut = dias;

                            }

                        }

                    }

                } else if (tipo == 3) {

                    if (edad > 0) {

                        $scope.cantidadanosautedit = 'años'

                        if (edad == 1) {

                            $scope.cantidadanosautedit = 'años'

                        }

                        $scope.edadautedit = edad;

                    } else {

                        if (meses > 0) {

                            $scope.cantidadanosautedit = 'meses'

                            if (meses == 1) {

                                $scope.cantidadanosautedit = 'mes'

                            }

                            $scope.edadautedit = meses;

                        } else {

                            if (dias > 0) {

                                $scope.cantidadanosautedit = 'dias'

                                if (dias == 1) {

                                    $scope.cantidadanosautedit = 'dia'

                                }

                                $scope.edadautedit = dias;

                            }

                        }

                    }

                } else {

                    if (edad > 0) {

                        $scope.cantidadanosautpro = 'años'

                        if (edad == 1) {

                            $scope.cantidadanosautpro = 'años'

                        }

                        $scope.edadautpro = edad;

                    } else {

                        if (meses > 0) {

                            $scope.cantidadanosautpro = 'meses'

                            if (meses == 1) {

                                $scope.cantidadanosautpro = 'mes'

                            }

                            $scope.edadautpro = meses;

                        } else {

                            if (dias > 0) {

                                $scope.cantidadanosautpro = 'dias'

                                if (dias == 1) {

                                    $scope.cantidadanosautpro = 'dia'

                                }

                                $scope.edadautpro = dias;

                            }

                        }

                    }

                }



            }

        }

        $scope.buscarAfiliado = function (tipo, tipodocumento, documento) {
            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: { function: 'obtenerafiliados', tipodocumento: tipodocumento, documento: documento }
            }).then(function (response) {
                if (response.data.CODIGO != "0") {
                    if (tipo == '3') {

                        $scope.infoafiliadoautedit = null;

                        $scope.infoafiliadoautedit = response.data;

                        if ($scope.infoafiliadoautedit.Estado != 'ACTIVO') {

                            $scope.informacionmodaledit = 'Afiliado no se encuentra activo en base de datos';

                            swal('Importante', 'Afiliado no se encuentra activo en la base de datos.', 'info');

                        } else {

                            // $scope.afirownumIV = 1;

                            // if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {

                            //   $scope.afirownumIV = $scope.afirownumIV + 1;

                            // }

                            // if ($scope.infoafiliadoautedit.TUTELA == 'true') {

                            //   $scope.afirownumIV = $scope.afirownumIV + 1;

                            // }

                            $scope.afirownumIV = 1;

                            if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {

                                $scope.afirownumIV = $scope.afirownumIV + 1;

                            }

                            if ($scope.infoafiliadoautedit.TUTELA == 'true') {

                                $scope.afirownumIV = $scope.afirownumIV + 1;

                            }

                            if ($scope.infoafiliadoautedit.PORTABILIDAD == 'S') {

                                $scope.afirownumIV = $scope.afirownumIV + 1;

                            }
                            if ($scope.infoafiliadoautedit.ERROR_50 == 'true') {

                                $scope.afirownumIV = $scope.afirownumIV + 1;

                            }

                            if ($scope.infoafiliadoautedit.AFIC_T045 == 'S') {

                                $scope.afirownumIV = $scope.afirownumIV + 1;

                            }



                            $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento, tipo);

                            $scope.sexoafitabIV = $scope.infoafiliadoautedit.SexoCodigo;

                            $scope.edadafitabIV = $scope.infoafiliadoautedit.EdadDias;

                            $scope.regimenafitabIV = $scope.infoafiliadoautedit.CodigoRegimen;

                            $scope.datosAfiModalNov = $scope.infoafiliadoautedit;

                            $scope.inactiveseccion1tab4 = true;

                            $scope.inactiveseccion2tab4 = false;

                            $scope.productosagregadostabIV = [];

                        }

                    }
                    // $scope.$apply();

                } else {

                    swal('Importante', response.data.NOMBRE, 'info')

                }

            });

        }

        $scope.valservicio = false;
        $scope.valespecialidad = false;
        $scope.openmodals = function (tipo, opcion) {
            $scope.buscard1 = "";
            $scope.buscard2 = "";
            $scope.buscarpro = "";
            $scope.tipoaut = opcion;
            switch (tipo) {

                case 'modaldetalle':
                    $scope.v_detallev = null;
                    $scope.v_encabezadov = null;
                    $scope.dAuto = null;
                    $scope.sumPrint = 0;
                    $scope.buscarAfiliado('3', opcion.TIPO_DOC, opcion.DOCUMENTO);
                    $scope.consultarAutorizacion(opcion.NUMERO, opcion.UBICACION, 'C');
                    $("#modaldetalle").modal("open");
                    break;
                case 'modaldetalleprograma':
                    $scope.v_detallev = null;
                    $scope.v_encabezadov = null;
                    $scope.verPrintDetalle = true;
                    $scope.buscarAfiliado('3', opcion.TIPO_DOC, opcion.DOCUMENTO);
                    $scope.dAuto = opcion;
                    $scope.detalleAutorizacionProg(opcion.NUMERO, opcion.UBICACION);
                    $("#modaldetalle").modal("open");
                    break;
                case 'modalnovedades':
                    $scope.buscarnovedades();
                    $("#modalnovedades").modal("open");
                    break;
                case 'modaldocumentos':
                    $scope.buscardocumentos();
                    $("#modaldocumentos").modal("open");
                    break;
                case 'modalhistoricochat':
                    $scope.tempcenso = opcion;
                    $http({
                        method: 'POST',
                        url: "php/censo/censo.php",
                        data: { function: 'obtenerChat', proceso: 1, numerocenso: opcion.CODIGOCENSO, ubicacion: opcion.UBICACION }
                    }).then(function (response) {
                        $scope.comentarios = response.data;
                    })
                    $("#modalhistoricochat").modal("open");
                    break;
                default:
            }
        }

        $scope.closemodals = function (tipo) {
            switch (tipo) {

                case 'modaldocumentos':
                    $("#modaldocumentos").modal("close");
                    break;



                case 'modaldetalle':
                    $("#modaldetalle").modal("close");
                    break;
                case 'modalnovedades':
                    $("#modalnovedades").modal("close");
                    break;

                case 'limpiartabIV':
                    $scope.viewdataAut = true;
                    $scope.viewdataAutprog = true;
                    $scope.switchtable = false;
                    $scope.check_option_2 = false;
                    $scope.check_option = false;
                    $scope.nameaut = 'Ordinarias';
                    $scope.listarAutorizaciones = [];
                    $scope.listarAutorizacionesprog = [];
                    $scope.numautprocesada = null;
                    $scope.numautprocesadaIV = null;
                    $scope.ubicacionPrint = null;
                    break;
                case 'modalhistoricochat':
                    $("#modalhistoricochat").modal("close");
                    break;

                default:
            }
        }


        $scope.capita = null;
        $scope.buscarnovedades = function () {
            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: {
                    function: 'obtener_novedades', documento: $scope.infoafiliadoautedit.Documento,
                    tipodocumento: $scope.infoafiliadoautedit.TipoDocumento
                }
            }).then(function (response) {
                $scope.novedades = response.data;
            })
            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: {
                    function: 'obtener_capita', documento: $scope.infoafiliadoautedit.Documento,
                    tipodocumento: $scope.infoafiliadoautedit.TipoDocumento
                }
            }).then(function (response) {
                $scope.capita = response.data;
            })
        }
        $scope.buscardocumentos = function () {
            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: {
                    function: 'obtener_soportes', documento: $scope.infoafiliadoautedit.Documento,
                    tipodocumento: $scope.infoafiliadoautedit.TipoDocumento
                }
            }).then(function (response) {
                $scope.documentosAfiliado = response.data;
            })

        }

        $scope.viewDocument = function (ruta, ftp) {
            if (ftp == 1) {
                $http({
                    method: 'POST',
                    url: "php/juridica/tutelas/functutelas.php",
                    data: { function: 'descargaAdjunto', ruta: ruta }
                }).then(function (response) {
                    window.open("temp/" + response.data);
                });
            }
            if (ftp == 2) {
                $http({
                    method: 'POST',
                    url: "php/getfileSFtp.php",
                    data: { function: 'descargaAdjunto', ruta: ruta }
                }).then(function (response) {
                    window.open("temp/" + response.data);
                });
            }
        }






        $scope.limpiar = function () {

            $scope.verAutorizaciones = true;
            $scope.verAutorizacionesEdit = false;
            $scope.inactiveseccion4tab4 = false;
            $scope.check_option = false;
            $scope.autdocumento = null;
            $scope.autnumero = null;
            $scope.autubicacion = null;
            $scope.filtaut = null
            $scope.showsenso = -1;
            $scope.listarAutorizacionesTemp = [];
            $scope.listarAutorizaciones = [];
            $scope.filterOptions = $scope.tempfilterOptions;
        }

        // Funciones TABI

        $scope.buscarAutorizacionesDetalle = function (producto, ubicacion) {
            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: { function: 'obtenerDetalleAut', producto: producto, ubicacion: ubicacion }
            }).then(function (response) {
                if (response.data.length > 0) {
                    $scope.productosagregadostabIV = response.data;
                }
            })
        }

        $scope.detalleAutorizacionProg = function (num, ubic) {
            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: { function: 'obtener_detalle_programada', numero: num, ubicacion: ubic }
            }).then(function (response) {
                // if (response.data.length > 0) {        
                $scope.v_encabezadov = response.data.cabeza;
                $scope.v_detallev = response.data.detalle;

                $scope.v_detallev.forEach(element => {
                    $scope.v_detallev = element;
                });

                // }
            })
        }


        $scope.downloadFileAut = function (pdf) {
            pqrHttp.dowloadfile(pdf,'1').then(function (response) {
                window.open("temp/" + response.data);
            });

        }


        $scope.viewdataAut = true;
        $scope.viewdataAutprog = true;
        $scope.verAutorizaciones = true;
        $scope.verAutorizacionesEdit = false;
        $scope.inactivebarraproedit = true;
        $scope.jsonautorizacion = {
            tipodocumento: '',
            documentoavanzado: ''
        }


        function formatDate(date) {
            var dd = ('0' + date.getDate()).slice(-2);
            var mm = ('0' + (date.getMonth() + 1)).slice(-2);
            var yyyy = date.getFullYear();
            var hh = date.getHours();
            var mi = date.getMinutes();
            return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
        }


        $scope.tempjsonaut = {};

        $scope.buscarAutorizaciones = function () {
            $scope.nameaut = 'Autorizaciones';
            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
            });

            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: { function: 'p_consulta_autorizaciones_usuario_avanzado', autorizacion: JSON.stringify($scope.jsonautorizacion) }
            }).then(function (response) {
                if (response.data.info.CODIGO == '0') {
                    $scope.verAutorizaciones = true;
                    $scope.infoafiliadoautedit = [];
                    swal('Importante', response.data.info.NOMBRE, 'info');
                    $scope.listarAutorizaciones = [];

                } else {


                    $scope.verAutorizaciones = false;
                    swal.close();

                    $scope.infoafiliadoautedit = response.data.info;
                    $scope.listarAutorizaciones = response.data.aut;
                    $scope.initPaginacion($scope.listarAutorizaciones);

                    if (response.data.tipo != 'IPS') {
                        $scope.afirownumIV = 1;

                        if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {

                            $scope.afirownumIV = $scope.afirownumIV + 1;

                        }

                        if ($scope.infoafiliadoautedit.TUTELA == 'true') {

                            $scope.afirownumIV = $scope.afirownumIV + 1;

                        }

                        if ($scope.infoafiliadoautedit.PORTABILIDAD == 'S') {

                            $scope.afirownumIV = $scope.afirownumIV + 1;

                        }
                        if ($scope.infoafiliadoautedit.ERROR_50 == 'true') {

                            $scope.afirownumIV = $scope.afirownumIV + 1;

                        }

                        if ($scope.infoafiliadoautedit.AFIC_T045 == 'S') {

                            $scope.afirownumIV = $scope.afirownumIV + 1;

                        }
                        $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento);
                    }

                    $scope.validatefiltros = true;

                }
            })
        }


        $scope.initPaginacion = function (info) {
            $scope.listarAutorizacionesTemp = info;
            $scope.currentPage = 0;
            $scope.pageSize = 10;
            $scope.valmaxpag = 10;
            $scope.pages = [];
            $scope.configPages();
        }
        $scope.configPages = function () {
            $scope.pages.length = 0;
            var ini = $scope.currentPage - 4;
            var fin = $scope.currentPage + 5;
            if (ini < 1) {
                ini = 1;
                if (Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize) > $scope.valmaxpag)
                    fin = 10;
                else
                    fin = Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize);
            } else {
                if (ini >= Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                    ini = Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize) - $scope.valmaxpag;
                    fin = Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize);
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
            if ($scope.listarAutorizacionesTemp.length % $scope.pageSize == 0) {
                var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize);
            } else {
                var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize) + 1;
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
                if ($scope.listarAutorizacionesTemp.length % $scope.pageSize == 0) {
                    var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize);
                } else {
                    var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize) + 1;
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

        $scope.filter = function (val) {
            $scope.listarAutorizacionesTemp = $filter('filter')($scope.listarAutorizaciones, val);
            if ($scope.listarAutorizacionesTemp.length > 0) {
                $scope.setPage(1);
            }
            $scope.configPages();
        }



        $scope.calcularEdad = function (date) {
            //var fecha=document.getElementById("user_date").value;
            var fecha = date.split("/").reverse().join("-");
            if (validate_fecha(fecha) == true) {
                // Si la fecha es correcta, calculamos la edad
                var values = fecha.split("-");
                var dia = values[2];
                var mes = values[1];
                var ano = values[0];

                // cogemos los valores actuales
                var fecha_hoy = new Date();
                var ahora_ano = fecha_hoy.getYear();
                var ahora_mes = fecha_hoy.getMonth() + 1;
                var ahora_dia = fecha_hoy.getDate();

                // realizamos el calculo
                var edad = (ahora_ano + 1900) - ano;
                if (ahora_mes < mes) {
                    edad--;
                }

                if ((mes == ahora_mes) && (ahora_dia < dia)) {
                    edad--;
                }

                if (edad > 1900) {
                    edad -= 1900;
                }



                // calculamos los meses
                var meses = 0;
                if (ahora_mes > mes)
                    meses = ahora_mes - mes;
                if (ahora_mes < mes)
                    meses = 12 - (mes - ahora_mes);
                if (ahora_mes == mes && dia > ahora_dia)
                    meses = 11;

                // calculamos los dias
                var dias = 0;
                if (ahora_dia > dia)
                    dias = ahora_dia - dia;
                if (ahora_dia < dia) {
                    var ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
                    dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
                }



                if (edad > 0) {

                    $scope.cantidadanosautedit = 'años'

                    if (edad == 1) {

                        $scope.cantidadanosautedit = 'años'

                    }

                    $scope.edadautedit = edad;

                } else {

                    if (meses > 0) {

                        $scope.cantidadanosautedit = 'meses'

                        if (meses == 1) {

                            $scope.cantidadanosautedit = 'mes'

                        }

                        $scope.edadautedit = meses;

                    } else {

                        if (dias > 0) {

                            $scope.cantidadanosautedit = 'dias'

                            if (dias == 1) {

                                $scope.cantidadanosautedit = 'dia'

                            }

                            $scope.edadautedit = dias;

                        }

                    }

                }
            }

        }
        $scope.v_encabezado = null;
        $scope.v_detalle = null;
        $scope.v_encabezadov = null;
        $scope.v_detallev = null;
        $scope.consultarAutorizacion = function (numero, ubicacion, accion) {
            swal({ title: 'Buscando...' });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: { function: 'obtener_Uautorizaciones', numero: numero, ubicacion: ubicacion }
            }).then(function (response) {
                if (accion == 'C') {
                    $scope.v_encabezadov = response.data.cabeza;
                    $scope.v_detallev = response.data.detalle;

                    if ($scope.v_encabezadov.ESTADO == 'A') {
                        $scope.verPrintDetalle = true;
                    } else {
                        $scope.verAutorizaciones = false;
                        $scope.numautprocesada = $scope.v_encabezadov.NUM_OASIS;
                        $scope.ubicacionPrint = $scope.v_encabezadov.UBI_OASIS;
                        if ($scope.v_encabezadov.IMPRESION == 'false') {
                            $scope.verPrintDetalle = true;
                        }
                        if ($scope.v_encabezadov.IMPRESION == 'true') {
                            $scope.verPrintDetalle = false;
                        }
                    }
                }
                swal.close();
            })
        }


        $scope.busquedaDetalles = function () {
            $scope.busquedaXdetalles = ngDialog.open({
                template: 'views/consultaAfiliados/modalBusquedaDetalles.html',
                className: 'ngdialog-theme-plain',
                controller: 'modalBusquedaxnombres',
                closeByEscape: false,
                closeByDocument: false
            });
            $scope.busquedaXdetalles.closePromise.then(function (response) {
                if (response.value === undefined) { return; }
                if (response.value != "$closeButton") {
                    $scope.type = response.value.tipo;
                    $scope.id = response.value.documento;
                    $scope.autdocumento = $scope.id;
                    $scope.buscarAutorizaciones($scope.id, '', '');

                }
            });
        }


        $scope.showcenso = -1;
        $scope.censos = null;
        $scope.tempaut = null;
        $scope.obtenercenso = function (aut, index) {
            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: { function: 'p_obtener_censo', documento: aut.DOCUMENTO, prestador: aut.NIT }
            }).then(function (response) {
                if (response.data.Codigo == '0') {
                    swal('Importante', 'No hay Censos Hospitalarios!', 'info');
                } else {
                    $scope.showcenso = index;
                    $scope.tempaut = aut;
                    $scope.censos = response.data;
                }

            });

        }

        $scope.detalleCenso = { 'censo': null, 'ubicacion': null };
        $scope.detail_censo = function (censo, ubicacion) {
            $scope.detalleCenso.censo = censo;
            $scope.detalleCenso.ubicacion = ubicacion;
            ngDialog.open({
                template: 'views/salud/modal/censodetail.html', className: 'ngdialog-theme-plain',
                controller: 'censodetalle',
                scope: $scope
            });//.closePromise.then(function (data) {});

        }

        $scope.backAut = function () {
            $scope.showcenso = -1;
        }

        $scope.formatPeso = function (num) {
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
        }
        $scope.getTotal = function (aut) {
            $scope.autjulio = $scope.listarAutorizacionesTemp.find(x => x.NUMERO === aut.NUMERO);
            var tempdetalle = $scope.autjulio.DETALLES;
            var sumtemp = 0;
            for (var i = 0; i < tempdetalle.length; i++) {

                if (tempdetalle[i].total != null) {
                    sumtemp += parseFloat(tempdetalle[i].total);
                }

            }

            return $scope.formatPeso(sumtemp);
        }
        $scope.printAut = function (numero, ubicacion) {
            window.open('views/autorizaciones/formatoautorizacionPrint.php?numero=' + numero + '&ubicacion=' + ubicacion, '_blank');
    
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