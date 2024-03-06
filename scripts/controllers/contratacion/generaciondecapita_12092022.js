'use strict';
angular.module('GenesisApp')
    .controller('generaciondecapita', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$rootScope',
        function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $rootScope) {

            $(document).ready(function () {

                $scope.responsable = sessionStorage.getItem('cedula')
                $scope.tiposdeconcepto1();
                $scope.estadodelperiodo();
                $scope.validarperiodo();
                // $scope.validarperiodo();
                $scope.estadocapita();

            });

            $scope.periodocapita = "Capita no generada aun";
            $scope.periodo2 = new Date();


            $scope.primeraparte = true;

            $scope.Generarperiodo = function () {
                $scope.primeraparte = false;
                $scope.segundaparte = true;


            }




            $scope.crearcapita = function () {


                swal('Guardar', '¡Capita creada!', 'success')

                $scope.fechainicio = "";
                $scope.fechafinal = "";
                $scope.primeraparte = false;
                $scope.segundaparte = false;
                $scope.terceraparte = true;



            }


            // $scope.responsable = "1143457336";
            $scope.fechainicio = new Date();
            $scope.fechafinal = new Date();



            // LISTAR

            $scope.tiposdeconcepto1 = function () {
                $http({
                    method: 'POST',
                    url: "php/contratacion/generaciondecapita.php",
                    data: { function: 'obtenerconcepto' }
                }).then(function (response) {

                    $scope.conceptos = response.data;

                });
            }

            $scope.validarperiodo = function () {
                $http({
                    method: 'POST',
                    url: "php/contratacion/generaciondecapita.php",
                    data: { function: 'validarperiodo' }
                }).then(function (response) {
                    $scope.periodo = response.data[0].periodo;
                });
            }

            $scope.estadoperiodo = "12/2022";
            $scope.periodo = "12/2022";

            $scope.estadodelperiodo = function () {
                $http({
                    method: 'POST',
                    url: "php/contratacion/generaciondecapita.php",
                    data: {
                        function: 'estadodelperiodo',
                        estadoperiodo: $scope.estadoperiodo
                    }
                }).then(function (response) {
                    $scope.estadodelperiodopn = response.data[0].periodo;
                    $scope.estadoperiodomensaje = response.data[0].mensaje;
                    $scope.estadodelperiodo = response.data[0].estado;

                    if ($scope.estadodelperiodo == "A") {
                        $scope.texto_estado = "Abierto";
                    } else {
                        $scope.texto_estado = "No generado";

                    }


                });
            }

            $scope.regimen = '';

            $scope.descargarconsolidar = function () {
                window.open('php/capita/archivos/descargueconsolidar.php?periodo=' + $scope.estadoperiodo);

            }


            $scope.descargarconceptocapita = function () {
                var Encontrar_Vacios = false;
                if ($scope.regimen == null || $scope.regimen == '') { Encontrar_Vacios = true; }


                if (Encontrar_Vacios == true) {
                    swal('Advertencia', '¡Debe seleccionar el regimen! ', 'warning')


                    return;
                }
                var key = $scope.tipos_concepto;


                switch (key) {
                    case "1":
                        window.open('php/capita/archivos/retroactivo.php?periodo=' + $scope.estadoperiodo + '&regimen=' + $scope.regimen);

                        break;

                    case "2":


                        window.open('php/capita/archivos/homonimo.php?periodo=' + $scope.estadoperiodo + '&regimen=' + $scope.regimen);

                        break;

                    case "3":
                        window.open('php/capita/archivos/incumplimiento_actividades.php?periodo=' + $scope.estadoperiodo + '&regimen=' + $scope.regimen);

                        break;


                    case "4":
                        window.open('php/capita/archivos/recobro_capita.php?periodo=' + $scope.estadoperiodo + '&regimen=' + $scope.regimen);

                        break;

                    case "5":
                        window.open('php/capita/archivos/otros_descuentos.php?periodo=' + $scope.estadoperiodo + '&regimen=' + $scope.regimen);

                        break;

                    case "6":
                        window.open('php/capita/archivos/otros_ajustes.php?periodo=' + $scope.estadoperiodo + '&regimen=' + $scope.regimen);

                        break;

                    case "7":
                        window.open('php/capita/archivos/asignacion_contrato.php?periodo=' + $scope.estadoperiodo + '&regimen=' + $scope.regimen);

                        break;

                    default:
                        alert("Debe seleccionar");
                        break;
                }
            }


            $scope.estadocapita = function () {
                $http({
                    method: 'POST',
                    url: "php/contratacion/generaciondecapita.php",
                    data: {
                        function: 'estadocapita',
                        estadocapita: $scope.estadoperiodo
                    }
                }).then(function (response) {

                    $scope.estadocapitamensaje = response.data[0].mensaje;
                    $scope.estaddodelacapita = response.data[0].estado;
                    if ($scope.estaddodelacapita == "A") {
                        $scope.textocapita = "Activa";
                    } else {
                        $scope.textocapita = "No generada";

                    }


                });
            }


            //Cargar matriz de capita
            $scope.Cargarcapita = function () {
                if ($scope.tipodeconcepto3 == null || $scope.tipodeconcepto3 == '' || $scope.tipodeconcepto3 == undefined || $scope.regimenc == ''
                    || $scope.regimenc == null || $scope.regimenc == undefined || $scope.json_file.length == 0) {
                    swal('Advertencia', '¡Debe seleccionar tipos de concepto y/o regimen! ', 'warning')
                } else {
                    $http({
                        method: 'POST',
                        url: "php/contratacion/generaciondecapita.php",
                        data: {
                            function: 'cargarmatriz',
                            cargue_concepto: $scope.tipodeconcepto3,
                            cargue_json: JSON.stringify($scope.json_file),
                            cargue_cantidad: $scope.json_file.length

                        }
                    }).then(function (response) {
                        if (response.data.Codigo == 1) {
                            swal({ title: 'Mensaje!', text: response.data.Mensaje, type: 'success' })

                        } else {
                            swal({ title: '!Mensaje!', text: response.data.Mensaje, type: 'warning' })
                        }
                    })
                }
            }

            /// cargue de archivos ///

            $scope.arrayFiles = [];


            $("form").on("change", ".file-upload-field", function () {

                if ($scope.tipodeconcepto3 == null || $scope.tipodeconcepto3 == '' || $scope.tipodeconcepto3 == undefined || $scope.regimenc == ''
                    || $scope.regimenc == null || $scope.regimenc == undefined) {
                    swal('Advertencia', '¡Debe seleccionar tipos de concepto y/o regimen! ', 'warning')
                }
                else {
                    var archivo = $(this).val().replace(/.*(\/|\\)/, '').split(".");
                    var pperiodo = $scope.conceptos.find(x => x.codigo == $scope.tipodeconcepto3);
                    var nombre = pperiodo.nombre;
                    var ext = archivo[1];
                    if ($(this)["0"].files.length > 0) { // se valida que exista el archivo
                        if ($(this)["0"].files["0"].size <= 3000000) { // se valida el tamaño del archivo
                            if (ext.toUpperCase() == 'TXT') { //se valida el tipo del archivo
                                $("#periodo").parent(".file-upload-wrapper").attr("data-text", archivo[0] + '.' + archivo[1]);
                                // $scope.fileToBase64($(this)["0"].files, nombre);
                                $scope.readCT($(this)["0"].files["0"], pperiodo.codigo, $(this), nombre);
                            } else {
                                $(this).val().replace(/.*(\/|\\)/, '');
                                $("#" + $(this)[0].id).val(null);
                                swal('Advertencia', '¡Tipo de archivo incorrecto', 'warning')
                            }
                        } else {
                            $(this).val().replace(/.*(\/|\\)/, '');
                            $("#" + $(this)[0].id).val(null);
                            swal('Advertencia', '¡El tamaño del archivo es demasiado grande', 'warning')
                        }
                    } else {
                        $(this).val().replace(/.*(\/|\\)/, '');
                        $("#" + $(this)[0].id).val(null);
                        swal('Advertencia', '¡Debe agregar algún adjunto!', 'warning')
                    }
                }
            });

            $scope.fileToBase64 = function (filesSelected, name) {
                if (filesSelected.length > 0) {
                    var fileToLoad = filesSelected[0];
                    var fileReader = new FileReader();
                    fileReader.onload = function (fileLoadedEvent) {
                        var array = {
                            src: fileLoadedEvent.target.result,
                            name: name
                        };
                        var x = [];
                        x = $scope.arrayFiles.findIndex(x => x.name === array.name);
                        if (x == -1) {
                            $scope.arrayFiles.push(array);
                        } else {
                            $scope.arrayFiles[x].src = array.src;
                        }
                        console.log($scope.arrayFiles)
                    };
                    fileReader.readAsDataURL(fileToLoad);
                }
            }

            // cargar fase 2 //
            $scope.readCT = function (data, concepto, thisfile, nombre) {
                var file = data;
                $scope.resumenct = [];
                $scope.estado = true;
                var reader = new FileReader();

                reader.onload = function (progressEvent) {
                    // By lines

                    var lines = this.result.split('\n');
                    var datos;
                    var mensaje = '';
                    var info = '';
                    $scope.json_file = [];

                    var tamaño = 0;
                    switch (concepto) {
                        case 1:
                            tamaño = 9;
                            break;
                        case 2:
                            tamaño = 9;
                            break;
                        case 3:
                            tamaño = 9;
                            break;
                        case 4:
                            tamaño = 9;
                            break;
                        case 5:
                            tamaño = 9;
                            break;
                        case 6:
                            tamaño = 9;
                            break;
                        case 7:
                            tamaño = 11;
                            break;
                        default:
                            alert("Debe seleccionar");
                            break;
                    }
                    for (var line = 0; line < lines.length; line++) {
                        info = lines[line];
                        if (info.trim() == "" || info.trim() == undefined || info.trim() == null || info.trim() == 'undefined') { // Se valida que no existan saltos de linea en la estructura
                            $scope.estado = false;
                            mensaje = "El archivo contiene saltos de lineas, por favor depurarlos";
                            break;
                        } else {
                            datos = lines[line].split(',');
                            if (datos.length != tamaño) { // se valida que la estructura tenga la cantidad de campos requeridos
                                $scope.estado = false;
                                mensaje = 'el archivo ' + nombre + ' presenta error de estructura tiene mas columnas de las ' + tamaño + ' esperadas.'
                                break;
                            } else {
                                if (concepto == 7) {
                                    $scope.json_file.push({
                                        id: line + 1,
                                        per_capitacion: $scope.periodo,
                                        nit_prestador: datos[1].trim(),
                                        tip_regimen: datos[5].trim(),
                                        num_contrato: datos[6].trim(),
                                        cod_centrocostos: datos[7].trim(),
                                        tip_servicio: datos[8].trim(),
                                        grupoetareo: datos[9].trim(),
                                        dato_mod: datos[10].trim()
                                    });
                                } else {
                                    $scope.json_file.push({
                                        id: line + 1,
                                        per_capitacion: $scope.periodo,
                                        nit_prestador: datos[1].trim(),
                                        tip_regimen: datos[5].trim(),
                                        num_contrato: datos[6].trim(),
                                        cod_centrocostos: datos[7].trim(),
                                        tip_servicio: '',
                                        dato_mod: datos[8].trim()
                                    });
                                }
                            }
                        }
                    }
                    if ($scope.estado == true) { // VALIDAR QUE LA ESTRUCTURA ESTE BIEN
                        console.log(JSON.stringify($scope.json_file));

                    } else {
                        $scope.json_file = [];
                        $("#periodo").parent(".file-upload-wrapper").attr("data-text", "Subir archivo");
                        thisfile.val().replace(/.*(\/|\\)/, '');
                        $("#" + thisfile[0].id).val(null);
                        swal('IMPORTANTE', mensaje, 'info')
                    }
                    // if ($scope.estado == true) {
                    //     thisfile.parent(".file-upload-wrapper").attr("data-text", nombre + '.txt');
                    //     $scope.fileToBase64(thisfile["0"].files, nombre);
                    //     $scope.limpiarArchivos();
                    //     $scope.listct = $scope.resumenct;
                    //     $scope.switcharchivos = false;
                    //     $scope.ctlleno = true;

                    //     $scope.$apply();
                    // } else {
                    //     if (tipoval == '2') {
                    //         swal('IMPORTANTE', 'el archivo ' + nombre.substr(0, 2) + ' presenta error de estructura tiene mas columnas de las ' + tamaño + ' esperadas.', 'info')
                    //     } else if (tipoval == '3') {
                    //         swal('IMPORTANTE', 'El archivo ' + sigla + ' actualmente no esta configurado para cargarlo, favor comunicarse con el area de cuentas medicas o modificar el archivo CT.', 'info')
                    //         thisfile.val("");
                    //         thisfile.parent(".file-upload-wrapper").attr("data-text", 'Archivo (' + thisfile["0"].id + ')');
                    //         $scope.switcharchivos = true;
                    //         $scope.ctlleno = false;
                    //         $scope.$apply();
                    //     } else {
                    //         swal('IMPORTANTE', 'El codigo de habilitacion del archivo (CT) no coincide con el ingresado en el paso anterior.', 'info')
                    //         thisfile.val("");
                    //         thisfile.parent(".file-upload-wrapper").attr("data-text", 'Archivo (' + thisfile["0"].id + ')');
                    //         $scope.switcharchivos = true;
                    //         $scope.ctlleno = false;
                    //         $scope.$apply();
                    //     }
                    // }
                }
                reader.readAsText(file);
            }
            // $scope.validarEstructura = function (progressEvent, tamaño, thisfile, nombre) {
            //     var file = progressEvent;
            //     var reader = new FileReader();
            //     reader.onload = function (progressEvent) {
            //         $scope.estado = false;
            //         var lines = this.result.split('\n');
            //         var array = [];
            //         var sigla;
            //         var datos;
            //         for (var line = 0; line < lines.length; line++) {
            //             datos = lines[line].split(',');
            //             if (datos != '' && datos != undefined && datos != null) {
            //                 if (datos.length == tamaño) {
            //                     $scope.estado = true;
            //                 } else {
            //                     $scope.estado = false;
            //                     break;
            //                 }
            //             }
            //         }
            //         if ($scope.estado == true) {
            //             thisfile.parent(".file-upload-wrapper").attr("data-text", nombre + '.txt');
            //             $scope.fileToBase64(thisfile["0"].files, nombre);
            //             $scope.marcarArchivoCargado(nombre.substr(0, 2), $scope.estado)
            //         } else {
            //             swal('IMPORTANTE', 'el archivo ' + nombre.substr(0, 2) + ' presenta error de estructura tiene mas columnas de las ' + tamaño + ' esperadas.', 'info')
            //             thisfile.val("");
            //             thisfile.parent(".file-upload-wrapper").attr("data-text", 'Archivo (' + thisfile["0"].id + ')');
            //             $scope.marcarArchivoCargado(nombre.substr(0, 2), $scope.estado)
            //         }
            //     };
            //     reader.readAsText(file);
            // }



            $scope.crearperiodog = function () {
                swal({
                    title: 'Confirmar Proceso',
                    text: "Está seguro que desea abrir el periodo?",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar'
                }).then(function (result) {
                    if (result) {
                        var xFechav = $scope.fechainicio;
                        var fechainicio = xFechav.getUTCDate() + '/' + (((xFechav.getMonth() + 1) < 10) ? '0' + (xFechav.getMonth() + 1) : (xFechav.getMonth() + 1)) + '/' + xFechav.getFullYear();


                        var xFechav1 = $scope.fechafinal;
                        var fechafinal = xFechav1.getUTCDate() + '/' + (((xFechav1.getMonth() + 1) < 10) ? '0' + (xFechav1.getMonth() + 1) : (xFechav1.getMonth() + 1)) + '/' + xFechav1.getFullYear();

                        var periodo_cap = (((xFechav1.getMonth() + 1) < 10) ? '0' + (xFechav1.getMonth() + 1) : (xFechav1.getMonth() + 1)) + '/' + xFechav1.getFullYear();


                        $http({
                            method: 'POST',
                            url: "php/contratacion/generaciondecapita.php",
                            data: {
                                function: 'crearperiodo',
                                periodo_cap: periodo_cap,
                                fechainicio: fechainicio,
                                fechafinal: fechafinal,
                                responsable: $scope.responsable


                            }
                        }).then(function (response) {
                            if (response.data.codigo == "0") {
                                // $scope.GenerarExcel();
                                swal({
                                    title: 'Mensaje!',
                                    text: response.data.mensaje,
                                    type: 'error'
                                }).catch(swal.noop);

                            } else {
                                $scope.dato = response.data;
                                $scope.ocultartabla = false;
                                $scope.primeraparte = true;
                                $scope.segundaparte = false;

                                swal({
                                    title: '!Mensaje!',
                                    text: response.data.mensaje,
                                    // timer: 100,
                                    type: 'success'
                                })

                            }
                           
                        });
                    }
                   
                    // $scope.$apply();
                })
                setTimeout(() => {
                    $scope.validarperiodo();
                }, 100);

                // $scope.tiposdeconcepto1();
                // $scope.estadodelperiodo();
                // $scope.validarperiodo();
                // $scope.estadocapita();
                

            }



            $scope.generarcapitab = function () {

                swal({
                    title: 'Confirmar Proceso',
                    text: "Está seguro que desea generar la precapita?",
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
                            url: "php/contratacion/generaciondecapita.php",
                            data: {
                                function: 'generarcapita',
                                periodoc: $scope.periodo,
                                usuarior: $scope.responsable


                            }
                        }).then(function (response) {
                            if (response.data.codigo == "0") {
                                // $scope.GenerarExcel();
                                swal({
                                    title: 'Mensaje!',
                                    text: response.data.mensaje,
                                    type: 'error'
                                }).catch(swal.noop);


                            } else {
                                $scope.dato = response.data;
                                $scope.ocultartabla = false;


                                swal({
                                    title: '!Mensaje!',
                                    text: response.data.mensaje,
                                    // timer: 100,
                                    type: 'success'
                                }).catch(swal.noop);
                                $scope.estadocapita();

                            }
                        });
                    }
                    $scope.$apply();
                }).catch(swal.noop);


            }



            $scope.limpiar_gestion = function () {
                $scope.regimen_contrato = "0";
                $scope.contrato_contrato = null;
                $scope.producto = '';
                $scope.producto = "0";
                $scope.producto_nombre = "";
                $scope.gestion = {
                    CONTRATO: "",
                    CLASIFICACIÖN: "",
                    COD_REGIMEN: "",
                    DESCUENTO: "",
                    NOM_CLASIFICACION: "",
                    NOM_PRODUCTO: "",
                    NOM_TARIFA: "",
                    NUMERO: "",
                    P_DESCUENTO: 0,
                    REGIMEN: "",
                    TARIFA: "",
                    VALOR: "",
                    ESTADO: '',
                    VAL_TARIFA: 0,

                }
                $scope.Listar_gestion = null;
            }
            $scope.limpiar_gestion();
            $scope.setTab = function (newTab) {
                $scope.tab = newTab;
                $(".tabI").removeClass("tabactiva");
                $(".tabII").removeClass("tabactiva");
                switch (newTab) {
                    case 1:
                        $(".tabI").addClass("tabactiva");
                        $scope.mostrar_gestion = false;
                        $scope.limpiar_gestion();
                        break;
                    case 2:
                        $(".tabII").addClass("tabactiva");
                        $scope.cargar_datos();
                        $scope.regimen_contrato = "0";
                        $scope.contrato_contrato = null;
                        $scope.producto = '';
                        $scope.producto = "0";
                        $scope.producto_nombre = "";
                        $scope.limpiar_gestion();
                        break;
                    default:
                }
            }
            $scope.isSet = function (tabNum) {
                return $scope.tab === tabNum;
            }
            $scope.setTab(1);

            $scope.gestiona_contratos = function (cod) {
                $scope.mostrar_gestion = true;
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                    data: { function: 'listar_unico', codigo: cod }
                }).then(function (response) {
                    console.log(response.data);
                    $scope.numero = response.data[0].NUMERO;
                    $scope.seccional = response.data[0].SECCIONAL;
                    $scope.adjunto = response.data[0].ADJUNTO;
                    $scope.prestador = response.data[0].IPS;
                    $scope.regimen = response.data[0].REGIMEN;
                    $scope.codregimen = response.data[0].COD_REGIMEN;
                    $scope.contrato = response.data[0].CONTRATO;
                    $scope.producto = response.data[0].NOMBRE_PRODUCTO;
                    $scope.gestion.PRODUCTO = response.data[0].PRODUCTO;
                    $scope.clasificacion = response.data[0].NOMBRE_CLASIFICACION;
                    $scope.clasificacion_cod = response.data[0].CLASIFICACION;
                    $scope.gestion.NOM_CLASIFICACION = response.data[0].NOMBRE_CLASIFICACION;
                    $scope.gestion.CLASIFICACION = response.data[0].CLASIFICACION;
                    $scope.valor = response.data[0].VALOR;
                    $scope.gestion.VALOR = parseInt(response.data[0].VALOR);
                    $scope.observacion = response.data[0].OBSERVACION;
                    $scope.adjunto = response.data[0].ADJUNTO;
                    $scope.fecha = response.data[0].FECHA;
                })
            }
            $scope.guardar = function (accion) {
                if (accion == 'U') {
                    if (
                        $scope.numero == "" || $scope.numero == undefined ||
                        $scope.codregimen == "" || $scope.codregimen == undefined ||
                        $scope.contrato == "" || $scope.contrato == undefined ||
                        $scope.gestion.PRODUCTO == 0 || $scope.gestion.PRODUCTO == undefined ||
                        $scope.gestion.VALOR == undefined || $scope.gestion.VALOR == null ||
                        $scope.gestion.TARIFA == "" || $scope.gestion.TARIFA == undefined || $scope.gestion.TARIFA == null ||
                        $scope.gestion.P_DESCUENTO == undefined || $scope.gestion.P_DESCUENTO == null ||
                        $scope.gestion.DESCUENTO == "" || $scope.gestion.DESCUENTO == undefined || $scope.gestion.DESCUENTO == null ||
                        $scope.gestion.mensaje == "" || $scope.gestion.mensaje == undefined || $scope.gestion.mensaje == null
                    ) {
                        swal('Informacion!', 'Todos los campos deben estar lleno para realizar la acción', 'warning');
                        return;
                    }
                }
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                    data: {
                        function: 'P_UI_PROD_CONTRATO',
                        numero: $scope.numero,
                        regimen: $scope.codregimen,
                        contrato: $scope.contrato,
                        producto: $scope.gestion.PRODUCTO,
                        clasificacion: $scope.gestion.CLASIFICACION,
                        valor: $scope.gestion.VALOR,
                        tarifa: $scope.gestion.TARIFA,
                        ajuste: $scope.gestion.P_DESCUENTO,
                        porcentaje: $scope.gestion.DESCUENTO,
                        comentario: $scope.mensaje,
                        accion: accion
                    }
                }).then(function (response) {
                    if (response.data.Codigo == 0) {
                        swal('Completado', response.data.Nombre, 'success');

                    } else {
                        swal('Información', response.data.Nombre, 'error');
                    }

                });
            }
            $scope.guardar2 = function (accion) {

                if (accion == 'U') {
                    if (
                        $scope.gestion.COD_REGIMEN == "" || $scope.gestion.COD_REGIMEN == undefined ||
                        $scope.gestion.CONTRATO == "" || $scope.gestion.CONTRATO == undefined ||
                        $scope.gestion.PRODUCTO == "" || $scope.gestion.PRODUCTO == undefined ||
                        $scope.gestion.CLASIFICACION == 0 || $scope.gestion.CLASIFICACION == undefined ||
                        $scope.gestion.VALOR == undefined || $scope.gestion.VALOR == null ||
                        $scope.gestion.TARIFA == "" || $scope.gestion.TARIFA == undefined || $scope.gestion.TARIFA == null ||
                        $scope.gestion.P_DESCUENTO == undefined || $scope.gestion.P_DESCUENTO == null ||
                        $scope.gestion.DESCUENTO == "" || $scope.gestion.DESCUENTO == undefined || $scope.gestion.DESCUENTO == null
                    ) {
                        swal('Informacion!', 'Todos los campos deben estar lleno para realizar la acción', 'warning');
                        return;
                    } else {
                        accion = $scope.gestion.ESTADO == 'NUEVO' ? 'I' : 'U';
                        $scope.gestion.RENGLON = $scope.gestion.ESTADO == 'NUEVO' ? '' : $scope.gestion.RENGLON;
                    }
                }
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                    data: {
                        function: 'contratos_ui',
                        regimen: $scope.gestion.COD_REGIMEN,
                        contrato: $scope.gestion.CONTRATO,
                        renglon: $scope.gestion.RENGLON,
                        producto: $scope.gestion.PRODUCTO,
                        clasificacion: $scope.gestion.CLASIFICACION,
                        valor: $scope.gestion.VALOR,
                        tarifa: $scope.gestion.TARIFA,
                        ajuste: $scope.gestion.P_DESCUENTO,
                        porcentaje: $scope.gestion.DESCUENTO,
                        accion: accion
                    }
                }).then(function (response) {
                    if (response.data.Codigo == 0) {
                        swal('Completado', response.data.Nombre, 'success');
                        if (accion == 'D') {
                            $scope.limpiar_gestion();
                        } else {
                            $scope.buscar_contratos();
                        }

                    } else {
                        swal('Información', response.data.Nombre, 'error');
                    }

                });
            }
            $scope.guardar3 = function (accion, i) {

                if (accion == 'U') {
                    if (
                        $scope.Listar_gestion[i].COD_REGIMEN == "" || $scope.Listar_gestion[i].COD_REGIMEN == undefined ||
                        $scope.Listar_gestion[i].NUMERO == "" || $scope.Listar_gestion[i].NUMERO == undefined ||
                        $scope.Listar_gestion[i].PRODUCTO == "" || $scope.Listar_gestion[i].PRODUCTO == undefined ||
                        $scope.Listar_gestion[i].CLASIFICACION == 0 || $scope.Listar_gestion[i].CLASIFICACION == undefined ||
                        $scope.Listar_gestion[i].VALOR == undefined || $scope.Listar_gestion[i].VALOR == null ||
                        $scope.Listar_gestion[i].TARIFA == "" || $scope.Listar_gestion[i].TARIFA == undefined || $scope.Listar_gestion[i].TARIFA == null ||
                        $scope.Listar_gestion[i].P_DESCUENTO == undefined || $scope.Listar_gestion[i].P_DESCUENTO == null ||
                        $scope.Listar_gestion[i].DESCUENTO == "" || $scope.Listar_gestion[i].DESCUENTO == undefined || $scope.Listar_gestion[i].DESCUENTO == null
                    ) {
                        swal('Informacion!', 'Todos los campos deben estar lleno para realizar la acción', 'warning');
                        return;
                    } else {
                        accion = $scope.Listar_gestion[i].ESTADO == 'NUEVO' ? 'I' : 'U';
                    }
                }
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                    data: {
                        function: 'contratos_ui',
                        regimen: $scope.Listar_gestion[i].COD_REGIMEN,
                        contrato: $scope.contrato_contrato,
                        renglon: $scope.Listar_gestion[i].RENGLON,
                        producto: $scope.Listar_gestion[i].PRODUCTO,
                        clasificacion: $scope.Listar_gestion[i].CLASIFICACION,
                        valor: $scope.Listar_gestion[i].VALOR,
                        tarifa: $scope.Listar_gestion[i].TARIFA,
                        ajuste: $scope.Listar_gestion[i].P_DESCUENTO,
                        porcentaje: $scope.Listar_gestion[i].DESCUENTO,
                        accion: accion
                    }
                }).then(function (response) {
                    if (response.data.Codigo == 0) {
                        swal('Completado', response.data.Nombre, 'success');
                        $scope.buscar_contratos();

                    } else {
                        swal('Información', response.data.Nombre, 'error');
                    }

                });
            }
            $http({
                method: 'POST',
                url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                data: {
                    function: 'obtenerSeccionales',
                }
            }).then(function (response) {
                $scope.lista_seccional = response.data;
            });

            $http({
                method: 'POST',
                url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                data: {
                    function: 'obtenerIps',
                }
            }).then(function (response) {
                $scope.lista_prestador = response.data;
            });

            $http({
                method: 'POST',
                url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                data: {
                    function: 'obtenerlistaRegimen',
                }
            }).then(function (response) {
                $scope.lista_regimen = response.data;
            });


            $scope.Buscar_productos = function () {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                    data: {
                        function: 'obtenerProductos',
                        ips: $scope.prestador
                    }
                }).then(function (response) {
                    $scope.lista_regimen = response.data;
                });
            }
            $scope.Buscar_clasificacion = function () {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                    data: {
                        function: 'obtenerClasificacion',
                        ips: $scope.prestador
                    }
                }).then(function (response) {
                    $scope.lista_regimen = response.data;
                });
            }
            $scope.buscar_contratos = function () {
                if ($scope.regimen_contrato != '0' && $scope.regimen_contrato != null &&
                    $scope.contrato_contrato != null &&
                    $scope.producto != '0'
                ) {
                    $scope.gestion.ESTADO = '';
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                        data: {
                            function: 'listar_contratos_contratacion',
                            regimen: $scope.regimen_contrato,
                            contrato: $scope.contrato_contrato,
                            producto: $scope.producto
                        }
                    }).then(function (response) {
                        $scope.TOTAL_REGISTROS = "";
                        console.log(response.data);
                        if (response.data.Codigo == 1) {
                            swal({
                                title: 'Producto no existe en el contrato',
                                text: "¿Desea agregar el Producto a este contrato?",
                                type: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Confirmar'
                            }).then((result) => {
                                if (result) {
                                    $scope.gestion.CONTRATO = $scope.contrato_contrato;
                                    $scope.gestion.REGIMEN = $scope.regimen_nombre;
                                    $scope.gestion.NOM_PRODUCTO = $scope.producto_nombre;
                                    $scope.gestion.PRODUCTO = $scope.producto;
                                    $scope.gestion.ESTADO = "NUEVO";
                                    $scope.gestion.CLASIFICACION = '';
                                    $scope.gestion.COD_REGIMEN = $scope.regimen_contrato;
                                    $scope.gestion.DESCUENTO = '';
                                    $scope.gestion.NOM_CLASIFICACION = '';
                                    $scope.gestion.NOM_TARIFA = '';
                                    $scope.gestion.NUMERO = '';
                                    $scope.gestion.P_DESCUENTO = 0;
                                    $scope.gestion.TARIFA = '';
                                    $scope.gestion.VALOR = '';
                                    $scope.Listar_gestion = null;
                                    $scope.$apply();
                                }
                            })
                        } else if (response.data.Codigo == "0") {
                            swal('Informacion!', response.data.Mensaje, 'warning');
                            $scope.limpiar_gestion();
                        } else if (response.data[0]) {
                            console.log(response.data.length);
                            $scope.TOTAL_REGISTROS = response.data.length;
                            if (response.data.length == 1) {
                                $scope.gestion.CONTRATO = $scope.contrato_contrato;
                                $scope.gestion.CLASIFICACION = response.data[0].CLASIFICACION;
                                $scope.gestion.COD_REGIMEN = response.data[0].COD_REGIMEN;
                                $scope.gestion.DESCUENTO = response.data[0].DESCUENTO;
                                $scope.gestion.RENGLON = response.data[0].RENGLON;
                                $scope.gestion.NOM_CLASIFICACION = response.data[0].NOM_CLASIFICACION;
                                $scope.gestion.NOM_PRODUCTO = response.data[0].NOM_PRODUCTO;
                                $scope.gestion.PRODUCTO = response.data[0].PRODUCTO;
                                $scope.gestion.NOM_TARIFA = response.data[0].NOM_TARIFA;
                                $scope.gestion.NUMERO = response.data[0].NUMERO;
                                $scope.gestion.P_DESCUENTO = response.data[0].P_DESCUENTO;
                                $scope.gestion.REGIMEN = response.data[0].REGIMEN;
                                $scope.gestion.TARIFA = response.data[0].TARIFA;
                                $scope.gestion.VAL_TARIFA = response.data[0].VALOR_TARIFA;
                                $scope.gestion.VALOR = response.data[0].VALOR;
                                $scope.gestion.ESTADO = "VIEJO";
                                $scope.Listar_gestion = null;
                            } else {
                                $scope.Listar_gestion = response.data;
                            }

                        } else {
                            swal('Informacion!', 'Error en la consulta, favor vuelva a intentar', 'warning');
                            $scope.limpiar_gestion();
                        }
                    });
                } else {
                    swal('Informacion!', 'Todos los campos deben estar lleno para solicitar el servicio', 'warning');
                }
            }
            $scope.obtenerBase = function () {
                if ($("#adjunto")[0].files[0].size > 62914560) {
                    swal('Advertencia', 'El archivo excede el peso limite (7 MB)', 'warning')
                    // notification.getNotification('warning','El archivo excede el peso limite (7 MB)','Notificación');
                    $("#adjunto")[0].value = "";
                    $scope.archivobase = "";
                    $scope.extensionarchivo = "";
                } else {
                    if ($("#adjunto")[0].files && $("#adjunto")[0].files[0]) {
                        var FR = new FileReader();
                        FR.addEventListener("load", function (e) {
                            $scope.adjunto = $("#adjunto")[0].value;
                            $scope.archivobase = e.target.result;
                            var name = $("#adjunto")[0].files[0].name;
                            $scope.extensionarchivo = name.split('.').pop();
                        });
                        FR.readAsDataURL($("#adjunto")[0].files[0]);
                    }
                }
            }
            $scope.mostrar_modal_detalle = function (numero, producto, clasificiacion, observacion) {
                $('#modal1').modal('open');
                $scope.numero_modal = numero;
                $scope.modal_producto = producto;
                $scope.modal_clasificacion = clasificiacion;
                $scope.modal_observacion = observacion;
            }
            $scope.modal_filtrar = function (tipo, ind) {
                $scope.tipo = tipo;
                $scope.ind = ind;
                if (tipo == 'P') {
                    $scope.nombre_tipo = "Selecciona el Producto"
                } else if (tipo == 'T') {
                    $scope.nombre_tipo = "Selecciona la Tarifa"
                } else {
                    $scope.nombre_tipo = "Selecciona la Clasificación"
                }
                $scope.dialogNewAfil = ngDialog.open({
                    template: 'views/autorizaciones/modal_filtrar.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope
                });
            }
            $scope.removeSeleccion = function () {

                if ($scope.tipo == 'C') {
                    $('#DM' + $scope.diagnostico1).removeClass('eleacti');
                    if ($scope.ind != undefined) {
                        $scope.Listar_gestion[$scope.ind].CLASIFICACION = "0";
                        $scope.Listar_gestion[$scope.ind].NOM_CLASIFICACION = "";
                    } else {
                        $scope.gestion.CLASIFICACION = "0";
                        $scope.gestion.NOM_CLASIFICACION = "";
                    }
                } else if ($scope.tipo == 'T') {
                    $('#DM' + $scope.diagnostico1).removeClass('eleacti');

                    if ($scope.ind != undefined) {
                        $scope.Listar_gestion[$scope.ind].TARIFA = "0";
                        $scope.Listar_gestion[$scope.ind].NOM_TARIFA = "";
                        $scope.Listar_gestion[$scope.ind].VALOR_TARIFA = "";
                    } else {
                        $scope.gestion.TARIFA = "0";
                        $scope.gestion.NOM_TARIFA = "";
                        $scope.gestion.VAL_TARIFA = null;
                    }
                } else {
                    $('#DM' + $scope.diagnostico2).removeClass('eleacti');
                    $scope.producto = "0";
                    $scope.producto_nombre = "";
                }
            }
            $scope.elegir = function (codigo, nombre, valor) {
                $("#DM" + codigo).addClass('eleacti');
                $('#DM' + codigo).siblings().removeClass('eleacti');
                // $scope.hovering=true;
                if ($scope.tipo == 'C') {
                    if ($scope.ind != undefined) {
                        $scope.Listar_gestion[$scope.ind].CLASIFICACION = codigo;
                        $scope.Listar_gestion[$scope.ind].NOM_CLASIFICACION = nombre;
                    } else {
                        $scope.gestion.CLASIFICACION = codigo;
                        $scope.gestion.NOM_CLASIFICACION = nombre;
                    }
                } else if ($scope.tipo == 'T') {
                    $('#DM' + $scope.diagnostico1).removeClass('eleacti');
                    if ($scope.ind != undefined) {
                        $scope.Listar_gestion[$scope.ind].TARIFA = codigo;
                        $scope.Listar_gestion[$scope.ind].NOM_TARIFA = nombre;
                        $scope.Listar_gestion[$scope.ind].VALOR_TARIFA = valor;
                    } else {
                        $scope.gestion.TARIFA = codigo;
                        $scope.gestion.NOM_TARIFA = nombre;
                        $scope.gestion.VAL_TARIFA = valor;
                    }
                } else {
                    $scope.producto = codigo;
                    $scope.producto_nombre = nombre;
                }
            }
            $scope.tarifa_calcular = function (op, i) {
                if ($scope.switch_view) {
                    var calcular = 0;
                    if (
                        $scope.gestion.VAL_TARIFA != 0 && $scope.gestion.DESCUENTO != '' &&
                        $scope.gestion.P_DESCUENTO != undefined
                    ) {
                        calcular = (parseInt($scope.gestion.VAL_TARIFA) * parseInt($scope.gestion.P_DESCUENTO)) / 100;

                        if ($scope.gestion.DESCUENTO == 'S') {
                            calcular = calcular + parseInt($scope.gestion.VAL_TARIFA);
                        } else {
                            calcular = parseInt($scope.gestion.VAL_TARIFA) - calcular;
                        }
                        $scope.gestion.VALOR = calcular | 0;

                    }
                } else {
                    var calcular = 0;
                    if (
                        $scope.gestion.VAL_TARIFA != 0 && $scope.gestion.VALOR != '' &&
                        $scope.gestion.VALOR != undefined
                    ) {
                        if ($scope.gestion.VAL_TARIFA < $scope.gestion.VALOR) {
                            $scope.gestion.DESCUENTO = 'S';
                            calcular = (parseInt($scope.gestion.VALOR) - parseInt($scope.gestion.VAL_TARIFA)) * 100;
                        } else {
                            $scope.gestion.DESCUENTO = 'R'
                            calcular = (parseInt($scope.gestion.VAL_TARIFA) - parseInt($scope.gestion.VALOR)) * 100;
                        }
                        calcular = calcular / parseInt($scope.gestion.VAL_TARIFA);
                        $scope.gestion.P_DESCUENTO = calcular | 0;
                    }
                }
                if (op == 0) {
                    var calcular = 0;
                    if (
                        $scope.Listar_gestion[i].VALOR_TARIFA != 0 && $scope.Listar_gestion[i].DESCUENTO != '' &&
                        $scope.Listar_gestion[i].P_DESCUENTO != undefined
                    ) {
                        calcular = (parseInt($scope.Listar_gestion[i].VALOR_TARIFA) * parseInt($scope.Listar_gestion[i].P_DESCUENTO)) / 100;

                        if ($scope.Listar_gestion[i].DESCUENTO == 'S') {
                            calcular = calcular + parseInt($scope.Listar_gestion[i].VALOR_TARIFA);
                        } else {
                            calcular = parseInt($scope.Listar_gestion[i].VALOR_TARIFA) - calcular;
                        }
                        $scope.Listar_gestion[i].VALOR = calcular | 0;

                    }
                } else if (op == 1) {
                    var calcular = 0;
                    if (
                        $scope.Listar_gestion[i].VALOR_TARIFA != 0 && $scope.Listar_gestion[i].VALOR != '' &&
                        $scope.Listar_gestion[i].VALOR != undefined
                    ) {
                        if ($scope.Listar_gestion[i].VALOR_TARIFA < $scope.Listar_gestion[i].VALOR) {
                            $scope.Listar_gestion[i].DESCUENTO = 'S';
                            calcular = (parseInt($scope.Listar_gestion[i].VALOR) - parseInt($scope.Listar_gestion[i].VALOR_TARIFA)) * 100;
                        } else {
                            $scope.Listar_gestion[i].DESCUENTO = 'R'
                            calcular = (parseInt($scope.Listar_gestion[i].VALOR_TARIFA) - parseInt($scope.Listar_gestion[i].VALOR)) * 100;
                        }
                        calcular = calcular / parseInt($scope.Listar_gestion[i].VALOR_TARIFA);
                        $scope.Listar_gestion[i].P_DESCUENTO = calcular | 0;
                    }
                }
                $scope.$apply();
            }
            $scope.cargarListados = function (texto) {
                $scope.coincidencia1 = texto
                $scope.gestion.PRODUCTO = $scope.ind == undefined ? $scope.gestion.PRODUCTO : $scope.Listar_gestion[$scope.ind].PRODUCTO;
                if ($scope.tipo == 'C') {
                    if (($scope.coincidencia1 != "" && $scope.coincidencia1.length >= 3)) {
                        $http({
                            method: 'POST',
                            url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                            data: {
                                function: 'obtenerClasificacion',
                                codigo: $scope.coincidencia1
                            }
                        }).then(function (response) {
                            if (response.data == "-1") {
                                $scope.ListarResultado = "";
                            } else {
                                $scope.ListarResultado = response.data;
                            }
                        });
                    }
                } else if ($scope.tipo == 'T') {
                    if (($scope.coincidencia1 != "" && $scope.coincidencia1.length >= 1)) {
                        $http({
                            method: 'POST',
                            url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                            data: {
                                function: 'obtenerTarifa',
                                codigo: $scope.coincidencia1,
                                producto: $scope.gestion.PRODUCTO
                            }
                        }).then(function (response) {
                            if (response.data == "-1") {
                                $scope.ListarResultado = "";
                            } else {
                                $scope.ListarResultado = response.data;
                            }
                        });
                    }
                } else {
                    if (($scope.coincidencia1 != "" && $scope.coincidencia1.length >= 3)) {
                        $http({
                            method: 'POST',
                            url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                            data: {
                                function: 'obtenerProducto',
                                codigo: $scope.coincidencia1
                            }
                        }).then(function (response) {
                            if (response.data == "-1") {
                                $scope.ListarResultado = "";
                            } else {
                                $scope.ListarResultado = response.data;
                            }
                        });
                    }
                }
            }
            $scope.limpiar = function () {
                $scope.seccional = '0';
                $scope.prestador = '0';
                $scope.regimen = '0';
                $scope.contrato = '0';
                $scope.producto = '0';
                $scope.producto_nombre = '';
                $scope.clasificacion = '0';
                $scope.Gestion = '';
                $scope.valor = 0;
                $scope.descripcion = '';
                $scope.fileName = '';
                $scope.nombreadjunto = "";

                // $("#adjunto")[0].files[0].val()="";
            }
            $scope.descargafile = function (ruta) {
                $http({
                    method: 'POST',
                    url: "php/juridica/tutelas/functutelas.php",
                    data: {
                        function: 'descargaAdjunto',
                        ruta: ruta
                    }
                }).then(function (response) {
                    //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
                    window.open("temp/" + response.data);
                });
            }
            $scope.subir_adjunto = function () {
                // var nombre_tipo=$('#tipo').find(option[$('#tipo').val()].text());
                // combo.options[combo.selectedIndex].text

                if ($scope.archivobase != null &&
                    $scope.seccional != '0' &&
                    $scope.prestador != '0' &&
                    $scope.regimen != '0' &&
                    $scope.contrato != '0' &&
                    $scope.producto != '0' &&
                    $scope.clasificacion != '0' &&
                    $scope.descripcion != '' &&
                    $scope.valor != 0
                ) {
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                        data: {
                            function: 'subir_adjunto',
                            achivobase: $scope.archivobase,
                            ext: $scope.extensionarchivo
                        }
                    }).then(function (response) {
                        console.log(response.data);
                        $scope.envar_datos(response.data);
                    });
                } else {
                    swal('Informacion!', 'Todos los campos deben estar lleno para solicitar el servicio', 'warning');
                }

            }
            $scope.envar_datos = function (ruta) {
                var ruta_k = ruta;
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                    data: {
                        function: 'enviarDatos',
                        seccional: $scope.seccional,
                        prestador: $scope.prestador,
                        regimen: $scope.regimen,
                        ruta: ruta_k,
                        contrato: $scope.contrato,
                        producto: $scope.producto,
                        clasificacion: $scope.clasificacion,
                        valor: $scope.valor,
                        descripcion: $scope.descripcion
                    }
                }).then(function (response) {
                    if (response.data.Codigo == 0) {
                        swal('Completado', response.data.Nombre, 'success');
                        $scope.limpiar();
                    } else {
                        swal('Información', response.data.Nombre, 'error');
                    }

                });
            }
            // tabla inicial
            $scope.filter = function (val) {
                $scope.listaRIPSTemp = $filter('filter')($scope.listaRIPS, val);
                $scope.configPages();
            }
            $scope.cargar_datos = function () {
                $http({
                    //           method: 'GET',
                    //   url: "json/ejemplo_s.json"
                    method: 'POST',
                    url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                    data: { function: 'listar', codigo: '' }
                }).then(function (response) {
                    $scope.mesasayudas = response.data;
                    $scope.initPaginacion($scope.mesasayudas);

                })
            }
            $scope.cargar_datos();
            $scope.initPaginacion = function (info) {
                $scope.mesasayudasTemp = info;
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.valmaxpag = 10;
                $scope.pages = [];
                $scope.configPages();
            }
            $scope.filter = function (val) {
                $scope.mesasayudasTemp = $filter('filter')($scope.mesasayudas, val);
                $scope.configPages();
            }
            $scope.configPages = function () {
                $scope.pages.length = 0;
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize) > $scope.valmaxpag)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                        ini = Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize) - $scope.valmaxpag;
                        fin = Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize);
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
            };
            $scope.setPage = function (index) {
                $scope.currentPage = index - 1;
                if ($scope.pages.length % 2 == 0) {
                    var resul = $scope.pages.length / 2;
                } else {
                    var resul = ($scope.pages.length + 1) / 2;
                }
                var i = index - resul;
                if ($scope.mesasayudasTemp.length % $scope.pageSize == 0) {
                    var tamanomax = parseInt($scope.mesasayudasTemp.length / $scope.pageSize);
                } else {
                    var tamanomax = parseInt($scope.mesasayudasTemp.length / $scope.pageSize) + 1;
                }
                // var tamanomax= $scope.mesasayudasTemp.length/$scope.pageSize;
                console.log(tamanomax);
                var fin = ($scope.pages.length + i) - 1;
                if (fin > tamanomax) {
                    fin = tamanomax;
                    i = tamanomax - 10;
                }
                if (index > resul) {
                    $scope.calcular(i, fin);
                }
                console.log($scope.mesasayudas.length / $scope.pageSize - 1);
            };
            $scope.paso = function (tipo) {
                if (tipo == 'next') {
                    var i = $scope.pages[0].no + 1;
                    if ($scope.pages.length > 9) {
                        var fin = $scope.pages[9].no + 1;
                    } else {
                        var fin = $scope.pages.length;
                    }

                    $scope.currentPage = $scope.currentPage + 1;
                    if ($scope.mesasayudasTemp.length % $scope.pageSize == 0) {
                        var tamanomax = parseInt($scope.mesasayudasTemp.length / $scope.pageSize);
                    } else {
                        var tamanomax = parseInt($scope.mesasayudasTemp.length / $scope.pageSize) + 1;
                    }
                    if (fin > tamanomax) {
                        fin = tamanomax;
                        i = tamanomax - 10;
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





