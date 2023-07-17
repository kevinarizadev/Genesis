'use strict';

angular.module('GenesisApp')

    .controller('solicitudautafiliadosController', ['$scope', '$http', '$location', '$filter', 'ngDialog', '$timeout', 'pqrHttp', 'afiliacionHttp', 'consultaHTTP', function ($scope, $http, $location, $filter, ngDialog, $timeout, pqrHttp, afiliacionHttp, consultaHTTP) {

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
                $scope.obtienenucleo();

            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log("Error obteniendo session variables");
            });

        $scope.obtienenucleo = function () {
            consultaHTTP.obtenerNucleo('CAON', $scope.sesdata.tipo, $scope.sesdata.cedula).then(function (response) {
                if (response == "0") {
                    //notification.getNotification('error','Error en el sistema, contactar servicio al cliente.','Notificacion');
                    return;
                } else {
                    $scope.afildata = response;
                    return;
                }
            })
        }

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





        $scope.viewdataAut = true;
        $scope.viewdataAutprog = true;
        $scope.verAutorizaciones = false;
        $scope.verAutorizacionesEdit = false;
        $scope.inactivebarraproedit = true;
        $scope.jsonautorizacion = {
            tipodocumento: '',
            documentoavanzado: ''
        }




        $scope.tempjsonaut = {};

        $scope.buscarAutorizaciones = function () {
            $scope.nameaut = 'Solicitud de Autorizaciones';
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
                url: "php/autorizaciones/afiliado/solicitud_autorizacion.php",
                data: {
                    function: 'p_obtener_datos_basicos_afi', tipodocumento: $scope.jsonautorizacion.tipodocumento,
                    documento: $scope.jsonautorizacion.documentoavanzado,
                }
            }).then(function (response) {
                if (response.data == '0') {
                    $scope.verAutorizaciones = true;
                    $scope.infoafiliadoautedit = [];
                    swal('Importante', response.data.info.NOMBRE, 'info');
                    $scope.listarAutorizaciones = [];

                } else {

                    swal.close();

                    $scope.infoafiliadoautedit = response.data;

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


        $scope.solitudAfiliado = {
            tipodocumento: "",
            documento: "",
            telefono: "",
            celular: "",
            correo: "",
            observacion: "",
            soporte: "",
            ext: "",
            ftp: "4"
        }

        $scope.data = {
            formato: '',
            requiredFile: false
        }
        $('#inputFileSolicitudAfi').change(function () {//Detecta los cambios que sufre el input file            
            $timeout(function () {//Usado para validar el file en tiempo real
                var file = document.getElementById('inputFileSolicitudAfi').files[0];//Obtiene el file del input para validarlo
                console.log('solFile:', file);
                $scope.data.formato = '';
                if (file) {//Valida si existe el archivo en el input file
                    if (file.size <= 5242880) {//valida que el size del file sea <= 5 mb                                                         
                        if (file.name.split('.').pop().toLowerCase() == 'pdf') {//Obtiene la extension del file y valida que sea un pdf                      
                            $scope.data.formato = 'Dentro Del Peso Limite y Formato Validado';
                            $scope.data.requiredFile = false;
                            var reader = new FileReader();
                            reader.onload = function (event) {
                                $timeout(function () {
                                    $scope.solitudAfiliado.solFile = event.target.result; //Asigna el file al ng-model solFile
                                    $scope.solitudAfiliado.ext = file.name.split('.').pop().toLowerCase();//Asigna la extension del solFile
                                })
                            };
                            reader.readAsDataURL(file);
                        } else {
                            $scope.data.formato = 'Formato Invalido solo puedes adjuntar archivos con extensión .pdf';
                            $scope.solitudAfiliado.soporte = null;
                            $scope.solitudAfiliado.solFile = null;//Asigna null al ng-model  
                            $scope.solitudAfiliado.ext = null;//Asigna null a la extension 
                            $scope.data.requiredFile = true;
                        }
                    } else {
                        $scope.data.formato = 'Limite de Peso Excedido';
                        $scope.solitudAfiliado.soporte = null;
                        $scope.solitudAfiliado.solFile = null;//Asigna null al ng-model   
                        $scope.solitudAfiliado.ext = null;//Asigna null a la extension   
                        $scope.data.requiredFile = true;
                    }
                } else {
                    $scope.data.formato = '';
                    $scope.solitudAfiliado.soporte = null;
                    $scope.solitudAfiliado.solFile = null;//Asigna null al ng-model    
                    $scope.solitudAfiliado.ext = null;//Asigna null a la extension  
                    $scope.data.requiredFile = false;
                }
            }, 100);
        })


        $scope.saveSolicitud = function () {
            if ($scope.afildata.length > 1) {
                $scope.solitudAfiliado.tipodocumento = $scope.jsonautorizacion.tipodocumento;
                $scope.solitudAfiliado.documento = $scope.jsonautorizacion.documentoavanzado;
            }

            if ($scope.afildata.length == 1) {
                $scope.solitudAfiliado.tipodocumento = $scope.sesdata.tipo;
                $scope.solitudAfiliado.documento = $scope.sesdata.cedula;
            }
            console.log(JSON.stringify($scope.solitudAfiliado));

       

            if ($scope.solitudAfiliado.solFile != null) {
                swal({
                    title: 'Confirmar',
                    text: '¿Está seguro que desea continuar con la creación de la solicitud?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {

                    swal({
                        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                        width: 200,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        animation: false
                    });

                    var hoy = $scope.formatDate(new Date());
                    var fecha = hoy.split('_');
                    var file = 'solicitud_aut_afiliado_' + $scope.solitudAfiliado.tipodocumento + '_' + $scope.solitudAfiliado.documento + '_' + hoy + '.' + $scope.solitudAfiliado.ext;
                    $http({
                        method: 'POST',
                        url: "php/sftp_cloud/UploadFile.php",
                        data: {
                            function: 'UploadFile',
                            base64: $scope.solitudAfiliado.solFile,
                            file: file,
                            dir: 'Autorizaciones/ESAA/' + fecha[0]                           
                        }
                    }).then(function (response) {
                        console.log(response);
                        $scope.solitudAfiliado.soporte = response.data;
                        $scope.solitudAfiliado.solFile = "";
                        var data = JSON.stringify($scope.solitudAfiliado);
                        if ($scope.solitudAfiliado.soporte != '') {
                            $http({
                                method: 'POST',
                                url: "php/autorizaciones/afiliado/solicitud_autorizacion.php",
                                data: { function: 'p_ui_esaa', data: data }
                            }).then(function (response) {
                                const { Codigo, Nombre } = response.data;
                                swal({ title: Codigo == '0' ? "Completado" : "No completado", text: Nombre, type: Codigo == '0' ? "success" : "error", timer: 800 });

                                if (Codigo == '0') {
                                    $scope.restart();
                                }


                            })
                        } else {
                            swal("Importante", "No se cargo el archivo correctamente. Favor intente nuevamente", "info");
                        }

                    });
                })
            } else {
                swal("Importante", "No se cargo el archivo correctamente. Favor intente nuevamente", "info");
            }




        }


        $scope.formatDate = function (date) {
            var dd = ('0' + date.getDate()).slice(-2);
            var mm = ('0' + (date.getMonth() + 1)).slice(-2);
            var yyyy = date.getFullYear();
            var hh = date.getHours();
            var mi = date.getMinutes();
            var sg = date.getSeconds();
            return dd + mm + yyyy + '_' + hh + mi + sg; //+' '+hh+':'+mi+':00';
        }

        //   console.log(formatDate(new Date()));

        $scope.getAfiliado = function (param) {
            console.log(param);
            $scope.jsonautorizacion = {
                tipodocumento: param.TIPODOCUMENTO,
                documentoavanzado: param.DOCUMENTO
            }

            $scope.buscarAutorizaciones();
        }

        $scope.FormatSoloTextoNumero = function (NID) {
            const input = document.getElementById('' + NID + '');
            var valor = input.value;
            input.value = valor.replace(/[^\wÑñ,.\s]/g, '');
        }

        $scope.restart = function () {
            $scope.solitudAfiliado = {
                tipodocumento: "",
                documento: "",
                telefono: "",
                celular: "",
                correo: "",
                observacion: "",
                soporte: "",
                ext: "",
                ftp: "4"
            }

            $scope.data = {
                formato: '',
                requiredFile: false
            }

            document.getElementById('placeinputFileSolicitudAfi').value = "";
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