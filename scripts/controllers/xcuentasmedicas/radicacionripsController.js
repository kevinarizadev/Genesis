'use strict';
angular.module('GenesisApp')
    .controller('radicacionripsController', ['$scope', 'notification', 'consultaHTTP', 'upload', 'afiliacionHttp', '$http',
        function ($scope, notification, consultaHTTP, upload, afiliacionHttp, $http) {
            $(document).ready(function () {
                $('#modalpopUp').modal();
            });

            setTimeout(() => {
                $('#modalpopUp').modal("open");
            }, 500);
            $scope.nit = sessionStorage.getItem('nit');
            $scope.paneldx = true;
            $scope.activedx = 'active';
            $scope.activead = 'none';
            $scope.inactivepaso2 = true;
            $scope.inactivepaso3 = true;
            $(".paso1").addClass("default-background");
            $('.content-step1').addClass('animated slideInRight');
            $scope.inactivepaso1 = false;
            $scope.inactivemodalidad = true;
            $scope.inactiveperiodo = true;
            $scope.inactivecampos = true;
            $scope.rip = {
                habilitacion: '',
                regimen: '',
                tipocontrato: '',
                tipocontrato_Sel: '',
                contrato: '',
                clasecontrato: '',
                vigcontrato: '',
                val_aut: '',
                val_prefactura: '',
                anno: '',
                mes: '',
                modalidad: '',
                recibo: '',
                nopbs: '',
                ubicacion: '',
                codigo_habilitacion: ''
            }
            $scope.switcharchivos = true;
            $scope.activo_ips = false;
            $scope.limpiar = function () {
                $('.content-step1').removeClass('animated slideInRight slideOutLeft');
                $('.content-step2').removeClass('animated slideInRight slideOutLeft');
                $('.content-step3').removeClass('animated slideInRight slideOutLeft');
                $scope.paneldx = true;
                $scope.activedx = 'active';
                $scope.activead = 'none';
                $scope.inactivepaso2 = true;
                $scope.inactivepaso3 = true;
                $(".paso1").addClass("default-background");
                $('.content-step1').addClass('animated slideInRight');
                $scope.inactivepaso1 = false;
                $scope.inactivemodalidad = true;
                $scope.inactiveperiodo = true;
                $scope.inactivecampos = true;
                $scope.rip = {
                    habilitacion: '',
                    regimen: '',
                    tipocontrato: '',
                    tipocontrato_Sel: '',
                    contrato: '',
                    clasecontrato: '',
                    vigcontrato: '',
                    val_aut: '',
                    val_prefactura: '',
                    anno: '',
                    mes: '',
                    modalidad: '',
                    recibo: '',
                    nopbs: '',
                    ubicacion: '',
                    codigo_habilitacion: ''
                }
                $scope.switcharchivos = true;
                $scope.inactivect = true;
                $scope.inactiveaf = true;
                $scope.inactiveus = true;
                $scope.inactiveac = false;
                $scope.inactiveap = false;
                $scope.inactiveah = false;
                $scope.inactiveau = false;
                $scope.inactivean = false;
                $scope.inactiveam = false;
                $scope.inactiveat = false;
            }
            $scope.wizardstep = function (op, ac) {
                $('.content-step1').removeClass('animated slideInRight slideOutLeft');
                $('.content-step2').removeClass('animated slideInRight slideOutLeft');
                $('.content-step3').removeClass('animated slideInRight slideOutLeft');
                switch (op) {
                    case "paso1":
                        $scope.validarContrato();
                        break;
                    case "paso2":
                        if (ac == "next") {
                            $scope.subir();
                        } else {
                            $scope.inactivepaso2 = true;
                            $scope.inactivebtn2 = true;
                            $scope.inactivepaso1 = false;
                            $scope.inactivebtn1 = false;
                            $(".paso2").removeClass("default-background");
                            $(".paso1").removeClass("default-background").addClass("default-background");
                            $('.content-step1').addClass('animated slideInLeft');
                        }
                        break;
                    case "paso3":
                        $scope.limpiar();
                        swal({ title: "Completado", text: "Proceso Finalizado.", showConfirmButton: false, type: "success", timer: 1500 });
                        break;
                    default:
                }
            }
            $scope.loadfunction = function () {
                $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/rips/funcRips.php",
                    data: { function: 'obtenerUbicacionHab', nit: $scope.nit }
                }).then(function (response) {
                    $scope.listHabilitacion = [];
                    if (response.data.hasOwnProperty('Codigo')) {
                        swal('Mensaje', response.data.Nombre, 'warning');
                    } else {
                        $scope.activo_ips = true;
                        $scope.listHabilitacion = response.data;
                    }
                })

                // $http({
                //     method: 'POST',
                //     url: "php/cuentasmedicas/rips/funcRips.php",
                //     data: { function: 'obtenerYear', nit: $scope.nit,  }
                // }).then(function (response) {
                //     $scope.listanno = [];
                //     if (!response.data.hasOwnProperty('Codigo')) {
                //         $scope.listanno = response.data;
                //     }
                // })
            }

            $scope.ObtenerContratos = function () {
                $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/rips/funcRips.php",
                    data: { function: 'obtenerContratos', nit: $scope.nit, tipo: $scope.rip.tipocontrato_Sel }
                }).then(function (response) {
                    $scope.listcontratos = [];
                    if (!response.data.hasOwnProperty('Codigo')) {
                        $scope.listcontratos = response.data;

                    }
                })
            }
            // LOGICA PARA EL PASO 1
            $scope.obtenerRegimen = function (contrato) {
                console.log(contrato);
                $scope.rip.vigcontrato = $scope.listcontratos[$scope.listcontratos.findIndex(obj => obj.CODIGO == contrato)].VIGENCIA;
                $scope.rip.val_aut = $scope.listcontratos[$scope.listcontratos.findIndex(obj => obj.CODIGO == contrato)].AUT;
                $scope.rip.tipocontrato = $scope.listcontratos[$scope.listcontratos.findIndex(obj => obj.CODIGO == contrato)].CONCEPTO;
                $scope.rip.clasecontrato = $scope.listcontratos[$scope.listcontratos.findIndex(obj => obj.CODIGO == contrato)].CLASE;
                $scope.rip.ubicacion = $scope.listHabilitacion[$scope.listHabilitacion.findIndex(obj => obj.CODIGO == $scope.rip.habilitacion)].UBICACION;
                $scope.rip.codigo_habilitacion = $scope.listHabilitacion[$scope.listHabilitacion.findIndex(obj => obj.CODIGO == $scope.rip.habilitacion)].HABILITACION;
                $scope.rip.val_prefactura = $scope.listcontratos[$scope.listcontratos.findIndex(obj => obj.CODIGO == contrato)].PREFACTURA;
                console.log("Ubicacion: " + $scope.rip.ubicacion);
                console.log("Habilitacion: " + $scope.rip.codigo_habilitacion);
                console.log("Clase: " + $scope.rip.clasecontrato);
                console.log("Val Aut: " + $scope.rip.val_aut);
                console.log("Val Prefactura: " + $scope.rip.val_prefactura);
                if ($scope.rip.tipocontrato_Sel == 'E') {
                    $scope.nombreTipoContrato = "EVENTO";
                } else {
                    $scope.nombreTipoContrato = "CAPITA";
                }
                // $scope.rip.tipocontrato = $scope.listcontratos[$scope.listcontratos.findIndex(obj => obj.CODIGO == contrato)].CODIGO;
                $scope.activarModalidad($scope.rip.val_prefactura);
                $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/rips/funcRips.php",
                    data: { function: 'obtenerRegimen', nit: $scope.nit, contrato: contrato }
                }).then(function (response) {
                    setTimeout(function () {
                        if (response.data[0].CODIGO) {
                            $scope.regimen = response.data[0].NOMBRE;
                            $scope.rip.regimen = response.data[0].CODIGO;
                            $scope.$apply();
                        }
                    }, 300);
                    $scope.inactivecampos = false;
                    // } else {
                    //     $scope.inactivecampos = false;
                    //     $scope.regimen = '';
                    //     $scope.rip.regimen = '';
                    //     $scope.rip.tipocontrato = '';
                    // }
                })

                $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/rips/funcRips.php",
                    data: { function: 'obtenerYear', nit: $scope.nit, contrato: contrato }
                }).then(function (response) {
                    $scope.listanno = [];
                    if (!response.data.hasOwnProperty('Codigo')) {
                        $scope.listanno = response.data;
                    }
                })
                $scope.obtenerModalidad();
            }
            // $scope.obtenerTipoContrato = function() {
            //     $http({
            //         method: 'POST',
            //         url: "php/cuentasmedicas/rips/funcRips.php",
            //         data: { function: 'obtenerTipoContrato', nit: $scope.nit, regimen: $scope.rip.regimen, contrato: $scope.rip.contrato }
            //     }).then(function(response) {
            //         $scope.listtipoContrato = [];
            //         $scope.listtipoContrato = response.data;
            //         $scope.inactivecampos = false;
            //         if ($scope.listtipoContrato.length > 0) {
            //             $scope.clase = $scope.listtipoContrato[0].CLASE;
            //             $scope.nombreTipoContrato = $scope.listtipoContrato[0].NOMBRE;
            //             $scope.rip.tipocontrato = $scope.listtipoContrato[0].CODIGO;
            //             $scope.activarModalidad($scope.clase);
            //         } else {
            //             $scope.rip.tipocontrato = '';
            //         }
            //     })
            // }
            $scope.obtenerModalidad = function () {
                $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/rips/funcRips.php",
                    data: { function: 'obtenerModalidad', nit: $scope.nit, contrato: $scope.rip.contrato }
                }).then(function (response) {
                    $scope.listModalidad = [];
                    $scope.listModalidad = response.data;
                })
            }
            $scope.cargarMes = function (anno) {
                $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/rips/funcRips.php",
                    data: { function: 'obtenerPeriodo', anno: anno, nit: $scope.nit, contrato: $scope.rip.contrato }
                }).then(function (response) {
                    $scope.listmes = [];
                    if (!response.data.hasOwnProperty('Codigo')) {
                        $scope.listmes = response.data;
                    }
                })
            }
            $scope.activarModalidad = function (tipo) {
                if (tipo == 'N') {
                    $scope.inactivemodalidad = false;
                    $scope.inactiveperiodo = true;
                } else {
                    $scope.inactivemodalidad = true;
                    $scope.inactiveperiodo = false;
                }
            }
            $scope.validarContrato = function () {
                var pasa = true;
                $(".valid").removeClass('invalid');
                if ($scope.rip.recibo == undefined) {
                    var pasa = false;
                    $("#recibo").addClass('invalid');
                } else {
                    if ($scope.rip.recibo.length != 6) {
                        var pasa = false;
                        $("#recibo").addClass('invalid');
                    }
                }

                if ($scope.rip.habilitacion == '' || $scope.rip.habilitacion == undefined) {
                    var pasa = false;
                    $("#habilitacion").addClass('invalid');
                }
                if ($scope.rip.regimen == '' || $scope.rip.regimen == undefined) {
                    var pasa = false;
                    $("#regimen").addClass('invalid');
                }
                if ($scope.rip.tipocontrato == '' || $scope.rip.tipocontrato == undefined) {
                    var pasa = false;
                    $("#tipocontrato").addClass('invalid');
                }
                if ($scope.rip.contrato == '' || $scope.rip.contrato == undefined) {
                    var pasa = false;
                    $("#contrato").addClass('invalid');
                }

                if ($scope.inactiveperiodo == true) {
                    if ($scope.rip.modalidad == '' || $scope.rip.modalidad == undefined) {
                        var pasa = false;
                        $("#modalidad").addClass('invalid');
                    }
                    if ($scope.rip.nopbs == '' || $scope.rip.nopbs == undefined) {
                        var pasa = false;
                    }
                } else {
                    if ($scope.rip.anno == '' || $scope.rip.anno == undefined) {
                        var pasa = false;
                        $("#anno").addClass('invalid');
                    }
                    if ($scope.rip.mes == '' || $scope.rip.mes == undefined) {
                        var pasa = false;
                        $("#mes").addClass('invalid');
                    }
                }
                if (pasa == true) {
                    $http({
                        method: 'POST',
                        url: "php/cuentasmedicas/rips/funcRips.php",
                        data: {
                            function: 'validarRad',
                            nit: $scope.nit,
                            anno: $scope.rip.anno,
                            mes: $scope.rip.mes,
                            recibo: $scope.rip.recibo,
                            clase: $scope.rip.clasecontrato,
                            contrato: $scope.rip.contrato,
                            ubicacion: $scope.rip.ubicacion
                        }
                    }).then(function (response) {
                        console.log(response.data);
                        if (response.data.Codigo == '0') {
                            $http({
                                method: 'POST',
                                url: "php/cuentasmedicas/rips/funcRips.php",
                                data: {
                                    function: 'validarContrato',
                                    nit: $scope.nit,
                                    regimen: $scope.rip.regimen,
                                    tipocontrato: $scope.rip.tipocontrato,
                                    modalidad: $scope.rip.modalidad,
                                    anno: $scope.rip.anno,
                                    mes: $scope.rip.mes,
                                    contrato: $scope.rip.contrato,
                                    recibo: $scope.rip.recibo
                                }
                            }).then(function (response) {
                                if (response.data.Codigo == '1') {
                                    $scope.archivoscargue();
                                } else {
                                    swal({ title: "Ocurrio un error", text: response.data.Nombre, showConfirmButton: true, type: "warning" });
                                }
                            })
                        } else {
                            swal({ title: "Ocurrio un error", text: response.data.Nombre, showConfirmButton: true, type: "warning" });
                        }
                    })






                } else {
                    notification.getNotification('warning', 'Debe diligencias todos los campos requeridos', 'Notificacion');
                }
            }
            // LOGICA PASO 2
            $scope.archivoscargue = function () {
                $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/rips/funcRips.php",
                    data: { function: 'obtenerArchivos', nit: $scope.nit }
                }).then(function (response) {
                    if (response.data[0].CODIGO != '0') {
                        $scope.listArchivos = [];
                        $scope.listArchivos = response.data;
                        var sigla;
                        for (var i = 0; i < $scope.listArchivos.length; i++) {
                            sigla = $scope.listArchivos[i].SIGLA;
                            $("#" + sigla).val('');
                            $("#" + sigla).parent(".file-upload-wrapper").attr("data-text", 'Archivo (' + sigla + ')');
                            switch ($scope.listArchivos[i].SIGLA) {
                                case 'CT':
                                    $scope.ct = JSON.parse($scope.listArchivos[i].ESTADO);
                                    break;
                                case 'AF':
                                    $scope.af = JSON.parse($scope.listArchivos[i].ESTADO);
                                    break;
                                case 'US':
                                    $scope.us = JSON.parse($scope.listArchivos[i].ESTADO);
                                    break;
                                case 'AC':
                                    $scope.ac = JSON.parse($scope.listArchivos[i].ESTADO);
                                    break;
                                case 'AP':
                                    $scope.ap = JSON.parse($scope.listArchivos[i].ESTADO);
                                    break;
                                case 'AH':
                                    $scope.ah = JSON.parse($scope.listArchivos[i].ESTADO);
                                    break;
                                case 'AU':
                                    $scope.au = JSON.parse($scope.listArchivos[i].ESTADO);
                                    break;
                                case 'AN':
                                    $scope.an = JSON.parse($scope.listArchivos[i].ESTADO);
                                    break;
                                case 'AM':
                                    $scope.am = JSON.parse($scope.listArchivos[i].ESTADO);
                                    break;
                                case 'AT':
                                    $scope.at = JSON.parse($scope.listArchivos[i].ESTADO);
                                    break;
                                default:

                            }
                        }
                        $scope.arrayFiles = [];
                        if ($scope.rip.tipocontrato == 'EV' && ($scope.rip.modalidad == '4' || $scope.rip.modalidad == '5')) {
                            $scope.modurgencia = true;
                            $scope.inactiveau = true;
                            $scope.inactiveac = true;
                        } else {
                            $scope.modurgencia = false;
                        }
                        $(".paso1").removeClass("default-background").addClass("default-background");
                        $(".paso2").addClass("default-background");
                        $('.content-step2').addClass('animated slideInRight');
                        $scope.inactivepaso1 = true;
                        $scope.inactivepaso2 = false;
                        $scope.switcharchivos = true;
                        $scope.ctlleno = false;
                    } else {
                        swal({ title: "Importante", text: response.data[0].NOMBRE, showConfirmButton: true, type: "warning" });
                    }
                })
            }
            $("form").on("change", ".file-upload-field", function () {
                var archivo = $(this).val().replace(/.*(\/|\\)/, '').split(".");
                var nombre = archivo[0];
                var ext = archivo[1];
                if ($(this)["0"].files.length > 0) { // se valida que exista el archivo
                    if ($(this)["0"].files["0"].size <= 253600000) { // se valida el tamaño del archivo
                        if (ext.toUpperCase() == 'TXT') { //se valida el tipo del archivo
                            if (nombre.substr(0, 2) !== nombre.substr(0, 2).toUpperCase()) { // se valida si las primeras dos letras estan en mayuscula
                                nombre = nombre.toUpperCase();
                            }
                            if (nombre.substr(0, 2) == $(this)["0"].id) { // se valida si las dos primeras letras coinciden con el input donde se esta cargando
                                if (nombre.substr(2, 8) == $scope.rip.recibo) { // se valida que los 6 ultimos caractereses sean iguales al recibo cargando en el paso anterior
                                    if (nombre.substr(0, 2) == 'CT') { // se validad si el archivo es el CT
                                        $scope.inactiveac = false;
                                        $scope.inactiveap = false;
                                        $scope.inactiveah = false;
                                        $scope.inactiveau = false;
                                        $scope.inactivean = false;
                                        $scope.inactiveam = false;
                                        $scope.inactiveat = false;
                                        $scope.readCT($(this)["0"].files["0"], 4, $(this), nombre); // se envia a procesar la informacion del CT
                                    } else {
                                        switch (nombre.substr(0, 2)) { // aca un switch que envia a validar la estructura de los demas archivos
                                            case 'AF':
                                                $scope.validarEstructura($(this)["0"].files["0"], 17, $(this), nombre);
                                                break;
                                            case 'US':
                                                $scope.validarEstructura($(this)["0"].files["0"], 14, $(this), nombre);
                                                break;
                                            case 'AC':
                                                $scope.validarEstructura($(this)["0"].files["0"], 17, $(this), nombre);
                                                break;
                                            case 'AP':
                                                $scope.validarEstructura($(this)["0"].files["0"], 15, $(this), nombre);
                                                break;
                                            case 'AH':
                                                $scope.validarEstructura($(this)["0"].files["0"], 19, $(this), nombre);
                                                break;
                                            case 'AU':
                                                $scope.validarEstructura($(this)["0"].files["0"], 17, $(this), nombre);
                                                break;
                                            case 'AN':
                                                $scope.validarEstructura($(this)["0"].files["0"], 14, $(this), nombre);
                                                break;
                                            case 'AM':
                                                $scope.validarEstructura($(this)["0"].files["0"], 14, $(this), nombre);
                                                break;
                                            case 'AT':
                                                $scope.validarEstructura($(this)["0"].files["0"], 11, $(this), nombre);
                                                break;
                                            default:
                                        }
                                    }
                                } else {
                                    swal('IMPORTANTE', 'numero del recibo no coincide con el nombre del archivo', 'info')
                                    $(this).val("");
                                    $(this).parent(".file-upload-wrapper").attr("data-text", 'Archivo (' + $(this)["0"].id + ')');
                                    if ($(this)["0"].id == 'CT') {
                                        $scope.switcharchivos = true;
                                        $scope.ctlleno = false;
                                    }
                                }
                            } else {
                                swal('IMPORTANTE', 'El archivo ' + nombre.substr(0, 2) + ' que esta intentado subir no pertenece a esta seccion recuerde que aqui debe ir el archivo ' + $(this)["0"].id, 'info')
                                $(this).val("");
                                $(this).parent(".file-upload-wrapper").attr("data-text", 'Archivo (' + $(this)["0"].id + ')');
                                if ($(this)["0"].id == 'CT') {
                                    $scope.switcharchivos = true;
                                    $scope.ctlleno = false;
                                }

                            }
                        } else {
                            swal('Tipo de archivo incorrecto', 'Extension del archivo incorrecta debe ser .txt', 'warning')
                            $(this).val("");
                            $(this).parent(".file-upload-wrapper").attr("data-text", 'Archivo (' + $(this)["0"].id + ')');
                            if ($(this)["0"].id == 'CT') {
                                $scope.switcharchivos = true;
                                $scope.ctlleno = false;
                            }

                        }
                    } else {
                        swal('TAMAÑO EXCEDIDO', 'Archivo no debe superar los 11 megabytes', 'error')
                        $(this).val().replace(/.*(\/|\\)/, '');
                        if ($(this)["0"].id == 'CT') {
                            $scope.switcharchivos = true;
                            $scope.ctlleno = false;
                        }

                    }
                } else {
                    $(this).val("");
                    $(this).parent(".file-upload-wrapper").attr("data-text", 'Archivo (' + $(this)["0"].id + ')');
                    if ($(this)["0"].id == 'CT') {
                        $scope.switcharchivos = true;
                        $scope.ctlleno = false;
                    }

                }
                $scope.$apply();
            });
            $scope.readCT = function (data, tamaño, thisfile, nombre) {
                var file = data;
                $scope.resumenct = [];
                $scope.estado = true;
                var reader = new FileReader();
                reader.onload = function (progressEvent) {
                    // By lines

                    var lines = this.result.split('\n');
                    var array = [];
                    var sigla;
                    var tipoval;
                    var datos;
                    var estado;
                    var enc_af = false, enc_us = false;
                    for (var line = 0; line < lines.length; line++) {
                        datos = lines[line].split(',');
                        if (datos != "") {
                            sigla = datos[2].substr(0, 2);
                            estado = 0;
                            for (var i = 0; i < $scope.listArchivos.length; i++) {
                                if (sigla == $scope.listArchivos[i].SIGLA && $scope.listArchivos[i].ESTADO.trim() == "true") {
                                    estado = 1;
                                }
                            }
                            if (estado == 0) {
                                $scope.estado = false;
                                tipoval = '3';
                                break;
                            }
                            if (enc_af == false && sigla == 'AF') {
                                enc_af = true;
                            }
                            if (enc_us == false && sigla == 'US') {
                                enc_us = true;
                            }
                        } else {
                            $scope.estado = false;
                            tipoval = '-1';
                            break;
                        }
                    }
                    if ($scope.estado == true) {
                        for (var line = 0; line < lines.length; line++) {
                            datos = lines[line].split(',');
                            if (datos != '' && datos != undefined && datos != null) {
                                if (datos.length == 4) {
                                    if (datos[0] == $scope.rip.codigo_habilitacion) {
                                        sigla = datos[2].substr(0, 2);
                                        switch (sigla) {
                                            case 'AF':
                                                array = { cantidad: Number(datos[3]), nombre: 'Archivo de facturas (' + sigla + ')', codigo: sigla, ruta: '', estado: false };
                                                break;
                                            case 'US':
                                                array = { cantidad: Number(datos[3]), nombre: 'Archivo de usuarios (' + sigla + ')', codigo: sigla, ruta: '', estado: false };
                                                break;
                                            case 'AC':
                                                array = { cantidad: Number(datos[3]), nombre: 'Archivo de consultas (' + sigla + ')', codigo: sigla, ruta: '', estado: false };
                                                $scope.inactiveac = true;
                                                break;
                                            case 'AP':
                                                array = { cantidad: Number(datos[3]), nombre: 'Archivo de procedimientos (' + sigla + ')', codigo: sigla, ruta: '', estado: false };
                                                $scope.inactiveap = true;
                                                break;
                                            case 'AH':
                                                array = { cantidad: Number(datos[3]), nombre: 'Archivo de hospitalizaciones (' + sigla + ')', codigo: sigla, ruta: '', estado: false };
                                                $scope.inactiveah = true;
                                                break;
                                            case 'AU':
                                                array = { cantidad: Number(datos[3]), nombre: 'Archivo de urgencias (' + sigla + ')', codigo: sigla, ruta: '', estado: false };
                                                $scope.inactiveau = true;
                                                break;
                                            case 'AN':
                                                array = { cantidad: Number(datos[3]), nombre: 'Archivo de recien nacidos (' + sigla + ')', codigo: sigla, ruta: '', estado: false };
                                                $scope.inactivean = true;
                                                break;
                                            case 'AM':
                                                array = { cantidad: Number(datos[3]), nombre: 'Archivo de medicamentos (' + sigla + ')', codigo: sigla, ruta: '', estado: false };
                                                $scope.inactiveam = true;
                                                break;
                                            case 'AT':
                                                array = { cantidad: Number(datos[3]), nombre: 'Archivo otros servicios (' + sigla + ')', codigo: sigla, ruta: '', estado: false };
                                                $scope.inactiveat = true;
                                                break;
                                            default:
                                        }
                                    } else {
                                        $scope.estado = false;
                                        tipoval = '1';
                                        break;
                                    }
                                } else {
                                    $scope.estado = false;
                                    tipoval = '2';
                                    break;
                                }
                                $scope.resumenct.push(array);
                            }
                        }
                    }

                    if ($scope.estado == true) {
                        thisfile.parent(".file-upload-wrapper").attr("data-text", nombre + '.txt');
                        $scope.fileToBase64(thisfile["0"].files, nombre);
                        $scope.limpiarArchivos();
                        $scope.listct = $scope.resumenct;
                        $scope.switcharchivos = false;
                        $scope.ctlleno = true;

                        $scope.$apply();
                    } else {
                        if (tipoval == '-1') {
                            swal('IMPORTANTE', 'El archivo ' + nombre.substr(0, 2) + ' esta vacio o tiene un salto de linea en la fila ' + (line + 1), "info");
                            thisfile.val("");
                            thisfile.parent(".file-upload-wrapper").attr("data-text", 'Archivo (' + thisfile["0"].id + ')');
                        } else if (tipoval == '2') {
                            swal('IMPORTANTE', 'el archivo ' + nombre.substr(0, 2) + ' presenta error de estructura tiene mas columnas de las ' + tamaño + ' esperadas.', 'info')
                        } else if (tipoval == '3') {
                            swal('IMPORTANTE', 'El archivo ' + sigla + ' actualmente no esta configurado para cargarlo, favor comunicarse con el area de cuentas medicas o modificar el archivo CT.', 'info')
                            thisfile.val("");
                            thisfile.parent(".file-upload-wrapper").attr("data-text", 'Archivo (' + thisfile["0"].id + ')');
                            $scope.switcharchivos = true;
                            $scope.ctlleno = false;
                            $scope.$apply();
                        } else if (enc_af == true && enc_us == true) {
                            swal('IMPORTANTE', 'El codigo de habilitacion del archivo (CT) no coincide con el ingresado en el paso anterior.', 'info')
                            thisfile.val("");
                            thisfile.parent(".file-upload-wrapper").attr("data-text", 'Archivo (' + thisfile["0"].id + ')');
                            $scope.switcharchivos = true;
                            $scope.ctlleno = false;
                            $scope.$apply();
                        }
                    }
                    if (enc_af == false) {
                        swal('IMPORTANTE', 'Falta relacionar el archivo (AF).', 'info')
                        thisfile.val("");
                        thisfile.parent(".file-upload-wrapper").attr("data-text", 'Archivo (' + thisfile["0"].id + ')');
                        $scope.switcharchivos = true;
                        $scope.ctlleno = false;
                        $scope.$apply();
                    }
                    if (enc_us == false) {
                        swal('IMPORTANTE', 'Falta relacionar el archivo (US).', 'info')
                        thisfile.val("");
                        thisfile.parent(".file-upload-wrapper").attr("data-text", 'Archivo (' + thisfile["0"].id + ')');
                        $scope.switcharchivos = true;
                        $scope.ctlleno = false;
                        $scope.$apply();
                    }
                }
                reader.readAsText(file);
            }
            $scope.validarEstructura = function (progressEvent, tamaño, thisfile, nombre) {
                var file = progressEvent;
                var reader = new FileReader();
                reader.onload = function (progressEvent) {
                    $scope.estado = false;
                    var lines = this.result.split('\n');
                    var array = [];
                    var sigla;
                    var datos;
                    for (var line = 0; line < lines.length; line++) {
                        datos = lines[line].split(',');
                        if (datos != '' && datos != undefined && datos != null) {
                            if (datos.length == tamaño) {
                                $scope.estado = true;
                            } else {
                                $scope.estado = false;
                                break;
                            }
                        }
                    }
                    if ($scope.estado == true) {
                        thisfile.parent(".file-upload-wrapper").attr("data-text", nombre + '.txt');
                        $scope.fileToBase64(thisfile["0"].files, nombre);
                        $scope.marcarArchivoCargado(nombre.substr(0, 2), $scope.estado)
                    } else {
                        swal('IMPORTANTE', 'el archivo ' + nombre.substr(0, 2) + ' presenta error de estructura tiene mas columnas de las ' + tamaño + ' esperadas.', 'info')
                        thisfile.val("");
                        thisfile.parent(".file-upload-wrapper").attr("data-text", 'Archivo (' + thisfile["0"].id + ')');
                        $scope.marcarArchivoCargado(nombre.substr(0, 2), $scope.estado)
                    }
                };
                reader.readAsText(file);
            }
            $scope.marcarArchivoCargado = function (codigo, value) {
                for (var i = 0; i < $scope.listct.length; i++) {
                    if ($scope.listct[i].codigo == codigo) {
                        $scope.listct[i].estado = value;
                        break;
                    }
                }
            }
            $scope.fileToBase64 = function (filesSelected, name) {
                if (filesSelected.length > 0) {
                    var fileToLoad = filesSelected[0];
                    var fileReader = new FileReader();
                    fileReader.onload = function (fileLoadedEvent) {
                        var array = {
                            src: fileLoadedEvent.target.result,
                            name: name
                        };
                        $scope.arrayFiles.push(array);
                    };
                    fileReader.readAsDataURL(fileToLoad);
                }
            }
            $scope.limpiarArchivos = function () {
                for (var i = 0; i < $scope.listArchivos.length; i++) {
                    if ($scope.listArchivos[i].SIGLA != 'CT') {
                        $('#' + $scope.listArchivos[i].SIGLA).val("");
                        $('#' + $scope.listArchivos[i].SIGLA).parent(".file-upload-wrapper").attr("data-text", 'Archivo (' + $scope.listArchivos[i].SIGLA + ')');
                    }
                }
            }
            // LOGICA PASO 3
            $scope.subir = function () {
                if ($scope.ctlleno == true) {
                    var continuar = true;
                    for (var j = 0; j < $scope.listct.length; j++) {
                        if ($scope.listct[j].estado == false) {
                            continuar = false;
                            notification.getNotification('warning', 'Falta cargar el archivo ' + $scope.listct[j].codigo + ' reportado en su archivo CT', 'Notificacion');
                        }
                    }
                    if (continuar == true) {
                        swal({ title: 'Procesando...' });
                        swal.showLoading();
                        var archivos = JSON.stringify($scope.arrayFiles);
                        $http({
                            method: 'POST',
                            url: "php/cuentasmedicas/rips/funcRips.php",
                            data: { function: 'subirAdjuntoValidacion', archivos: archivos, nit: $scope.nit, recibo: $scope.rip.recibo, val_aut: $scope.rip.val_aut }
                        }).then(function (response) {
                            if (response.data.codigo == 0) {
                                for (var i = 0; i < response.data.rutas.length; i++) {
                                    for (var j = 0; j < $scope.listct.length; j++) {
                                        if (response.data.rutas[i].archivo == $scope.listct[j].codigo) {
                                            $scope.listct[j].ruta = response.data.rutas[i].ruta;
                                        }
                                    }
                                }
                                var datos = JSON.stringify($scope.rip);
                                var archivos = JSON.stringify($scope.listct);
                                if (sessionStorage.getItem('cedula') != "") {
                                    $http({
                                        method: 'POST',
                                        url: "php/cuentasmedicas/rips/funcRips.php",
                                        data: { function: 'guardarSolicitud', archivos: archivos, datos: datos, nit: $scope.nit, responsable: sessionStorage.getItem('cedula'), cantidad: $scope.listct.length }
                                    }).then(function (response) {
                                        if (response.data["0"].Codigo == '0') {
                                            $scope.validacion = response.data["0"].Validacion;
                                            $scope.fecha = response.data["0"].Fecha;
                                            $scope.turnos = response.data["0"].Turnos;
                                            swal.close();
                                            $(".paso2").removeClass("default-background").addClass("default-background");
                                            $(".paso3").addClass("default-background");
                                            $scope.inactivepaso2 = true;
                                            $scope.inactivepaso3 = false;
                                            $('.content-step3').addClass('animated slideInRight');
                                            $scope.$apply();
                                        } else {
                                            swal({ title: "Completado", text: "No se pudo procesar su radicacion", showConfirmButton: false, type: "warning", timer: 800 });
                                        }
                                    })
                                } else {
                                    swal({ title: "Error", text: "Usuario de la IPS invalido, intente reiniciar la sesion del usuario.", type: "error" });
                                }
                                swal.close();
                                // swal({ title: "Completado", text: response.data.mensaje, type: "success" });
                            } else if (response.data.codigo < 0) {
                                swal({ title: "Error", text: response.data.mensaje, type: "error" });
                            } else if (response.data.codigo > 0) {
                                if (response.data.hasOwnProperty('archivos')) {
                                    var list = "<ul class='collapsible' style='max-height: 50vh;overflow: auto;'>";
                                    response.data.archivos.forEach(function (archivo, i) {
                                        list += "<li class='left-align'><div class='collapsible-header blue-text'><i class='material-icons'>error</i>" + archivo.nombre + " <small class='float-right red-text'> Errores: " + archivo.errores.length + "</small>" + "</div><div class='collapsible-body'>";
                                        archivo.errores.forEach(function (error, j) {
                                            list += "<p style='padding: 1rem;'><span><b>Fila:</b>" + error.fila + ", <b>Columna:</b>" + error.columna + ", <b>Valor:</b>" + error.valor + "</span><br><b>Dato:</b>" + error.dato + ", <b>Error:</b>" + error.mensaje + "</p>";
                                        });
                                        list += "</div></li>";
                                    });
                                    swal({
                                        title: "Advertencia",
                                        width: 800, html: "<b>" + response.data.mensaje + "</b><br><small>Clic en  en nombre del archivo para obtener una vista previa</small><br>" + list + "</ul>",
                                        allowOutsideClick: false,
                                        allowEscapeKey: false,
                                        confirmButtonText: 'Descargar Errores',
                                        confirmButtonColor: '#188038',
                                        // showCancelButton: true,
                                        type: "warning"
                                    }).then(function (result) {
                                        if (result) {
                                            var jsonError = new Array();
                                            response.data.archivos.forEach(function (archivo, i) {
                                                archivo.errores.forEach(function (error, j) {
                                                    jsonError.push(Object.assign({ archivo: archivo.nombre.substr(0, 2) }, error));
                                                });
                                            });
                                            // window.open('php/cuentasmedicas/rips/error_rips_new.php?archivo=' +  JSON.stringify(jsonError) + '&recibo=' + $scope.rip.recibo);
                                            var f = document.getElementById('TheForm');
                                            f.archivo.value = JSON.stringify(jsonError);
                                            f.recibo.value = $scope.rip.recibo;
                                            // window.open('', 'TheWindow');
                                            f.submit();
                                        }
                                    }).catch(swal.noop);
                                    $(document).ready(function () {
                                        $('.collapsible').collapsible();
                                    });
                                }
                            } else {
                                swal({ title: "Error", text: "El proceso de validacion fallo, intentelo de nuevo mas tarde.<br>" + response.data, type: "error" });
                            }
                        })
                    }
                } else {
                    notification.getNotification('warning', 'Falta cargar el archivo CT', 'Notificacion');
                }
            }
            $scope.subir2 = function () {
                if ($scope.ctlleno == true) {
                    var continuar = true;
                    for (var j = 0; j < $scope.listct.length; j++) {
                        if ($scope.listct[j].estado == false) {
                            continuar = false;
                            notification.getNotification('warning', 'Falta cargar el archivo ' + $scope.listct[j].codigo + ' reportado en su archivo CT', 'Notificacion');
                        }
                    }
                    if (continuar == true) {
                        swal({ title: 'Procesando...' });
                        swal.showLoading();
                        var archivos = JSON.stringify($scope.arrayFiles);
                        $http({
                            method: 'POST',
                            url: "php/cuentasmedicas/rips/funcRips.php",
                            data: { function: 'subirAdjunto', archivos: archivos, nit: $scope.nit, recibo: $scope.rip.recibo }
                        }).then(function (response) {
                            if (response.data != '0') {
                                for (var i = 0; i < response.data.length; i++) {
                                    for (var j = 0; j < $scope.listct.length; j++) {
                                        if (response.data[i].archivo == $scope.listct[j].codigo) {
                                            $scope.listct[j].ruta = response.data[i].ruta;
                                        }
                                    }
                                }
                                var datos = JSON.stringify($scope.rip);
                                var archivos = JSON.stringify($scope.listct);
                                $http({
                                    method: 'POST',
                                    url: "php/cuentasmedicas/rips/funcRips.php",
                                    data: { function: 'guardarSolicitud', archivos: archivos, datos: datos, nit: $scope.nit, responsable: sessionStorage.getItem('cedula'), cantidad: $scope.listct.length }
                                }).then(function (response) {
                                    if (response.data["0"].Codigo == '0') {
                                        $scope.validacion = response.data["0"].Validacion;
                                        $scope.fecha = response.data["0"].Fecha;
                                        $scope.turnos = response.data["0"].Turnos;
                                        swal.close();
                                        $(".paso2").removeClass("default-background").addClass("default-background");
                                        $(".paso3").addClass("default-background");
                                        $scope.inactivepaso2 = true;
                                        $scope.inactivepaso3 = false;
                                        $('.content-step3').addClass('animated slideInRight');
                                        $scope.$apply();
                                    } else {
                                        swal({ title: "Completado", text: "No se pudo procesar su radicacion", showConfirmButton: false, type: "warning", timer: 800 });
                                    }
                                })
                            } else {
                                swal({ title: "Completado", text: "Error de conexion, archivos no subieron", showConfirmButton: false, type: "warning", timer: 800 });
                            }
                        })
                    }
                } else {
                    notification.getNotification('warning', 'Falta cargar el archivo CT', 'Notificacion');
                }
            }
            $scope.loadfunction();
        }
    ])