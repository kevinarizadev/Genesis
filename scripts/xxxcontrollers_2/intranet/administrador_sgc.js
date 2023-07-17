'use strict';
angular.module('GenesisApp').controller('administrador_sgcController', ['$scope', '$http', function ($scope, $http) {
    $(document).ready(function () {
        $('.tabs').tabs();
    });
    $scope.show = false;
    $scope.tabs = { select: 1 };
    $scope.seleccionar = function (tab_numer) {
        $scope.tabs.select = tab_numer;
        $scope.macroproceso = -1;
        $scope.documentos_json = new Array();
        switch (tab_numer) {
            case 1:

                break;
            case 2:

                break;
            case 3:
                $scope.listar_plantillas("A");
                break;
        }
    }

    $scope.input_data_default = { macroprocesos: "", plantilla: "", validate: [{ size: 20, ext: ".pdf|.doc|.docx|.xls|.xlsx|.zip|.7z|.rar" }, { size: 20, ext: ".pdf|.doc|.docx|.xls|.xlsx|.ppt|.pptx|.zip|.7z|.rar" }] };

    // ------------------------------------------------------------------------------------------------------------- TAB.MACROPROCESOS
    $scope.tab_macroprocesos = { proceso_select: -1, subproceso_select: -1, tipo_documento_select: -1, filtro: "", id: "", url: "", macroproceso: "", proceso: "", subproceso: "", codigo: "", nombre: "", version: 1, fecha_ultima_version: new Date(), estado: "", tipo_documento: "", origen_documento: "", boton_activo: false };
    $scope.limpiar = function () {
        $scope.tab_macroprocesos = { proceso_select: -1, subproceso_select: -1, tipo_documento_select: -1, filtro: "", id: "", url: "", macroproceso: "", proceso: "", subproceso: "", codigo: "", nombre: "", version: 1, fecha_ultima_version: new Date(), estado: "", tipo_documento: "", origen_documento: "", boton_activo: false };
        $scope.tab_macroprocesos.boton_activo = false;
        $scope.limpiar_input_ng_file('macroprocesos');
    }
    $scope.macroprocesos_select = new Array();
    $scope.listar_macroprocesos = function () {
        $http({
            method: 'POST',
            url: "php/intranet/intranet_procesos.php",
            data: {
                function: 'listar_macroprocesos'
            }
        }).then(function (response) {
            if (validar_json(angular.toJson(response.data)) && response.data.length > 0 && response.data != "" && response.data.Codigo != 1) {
                $scope.macroprocesos_select = response.data;
            } else {
                $scope.macroprocesos_select = new Array();
                swal('Error', 'No se encontraron macroprocesos', 'error');
            }
        });
    }
    $scope.listar_macroprocesos();
    $scope.proceso_select_all = new Array();
    $scope.listar_procesos = function () {
        [1, 2, 3].forEach(function (macroproceso) {
            $http({
                method: 'POST',
                url: "php/intranet/intranet_procesos.php",
                data: {
                    function: 'listar_procesos',
                    macroproceso: macroproceso
                }
            }).then(function (response) {
                if (validar_json(angular.toJson(response.data)) && response.data.length > 0 && response.data != "" && response.data.Codigo != 1) {
                    $scope.proceso_select_all[macroproceso] = response.data;
                } else {
                    $scope.proceso_select_all = new Array();
                    // swal('Error', 'No se encontraron procesos', 'error');
                }
            });
        });
    }
    $scope.listar_procesos();
    $scope.proceso_select = new Array();
    $scope.cambiar_tipo_macroproceso = function (macroproceso) {
        if (validar_json(angular.toJson($scope.proceso_select_all[macroproceso])) && $scope.proceso_select_all[macroproceso] != undefined && macroproceso != null && macroproceso != "") {
            $scope.proceso_select = $scope.proceso_select_all[macroproceso];
        } else {
            $scope.proceso_select = new Array();
        }
    }


    $scope.subproceso_select_all = new Array();
    $scope.listar_subprocesos = function () {
        [1, 8, 13].forEach(function (element) {
            $http({
                method: 'POST',
                url: "php/intranet/intranet_procesos.php",
                data: {
                    function: 'listar_subprocesos',
                    proceso: element
                }
            }).then(function (response) {
                if (validar_json(angular.toJson(response.data)) && response.data.length > 0 && response.data != "" && response.data.Codigo != 1) {
                    $scope.subproceso_select_all[element] = response.data;
                } else {
                    $scope.subproceso_select_all = new Array();
                    // swal('Error', 'No se encontraron subprocesos', 'error');
                }
            });
        });
    }
    $scope.listar_subprocesos();
    $scope.subproceso_select = new Array();
    $scope.cambiar_tipo_proceso = function (proceso) {
        if (validar_json(angular.toJson($scope.subproceso_select_all[proceso])) && $scope.subproceso_select_all[proceso] != undefined && proceso != null && proceso != "") {
            $scope.subproceso_select = $scope.subproceso_select_all[proceso];
        } else {
            $scope.tab_macroprocesos.subproceso = "";
            $scope.subproceso_select = new Array();
        }

    }

    $scope.generar_codigo = function (proceso, tdocumento) {
        if (tdocumento != undefined && tdocumento != null && tdocumento != "" && proceso != undefined && proceso != null && proceso != "") {
            var i = $scope.proceso_select.findIndex(elemt => elemt.ID == proceso);
            var j = $scope.subproceso_select.findIndex(elemt => elemt.ID == $scope.tab_macroprocesos.subproceso);
            if (i != -1) {
                $scope.tab_macroprocesos.codigo = ($scope.proceso_select[i].CODIFICACION + "-" + tdocumento + "-00" + ((j != -1) ? "-" + $scope.subproceso_select[j].CODIFICACION : "")).toUpperCase();
            }
        }
    }


    $scope.tipo_documento_select = [
        { nombre: "Caracterización", codigo: "CA" },
        { nombre: "Procedimiento", codigo: "PR" },
        { nombre: "Manual", codigo: "MA" },
        { nombre: "Instructivo", codigo: "IN" },
        { nombre: "Matriz", codigo: "MZ" },
        { nombre: "Política", codigo: "PO" },
        { nombre: "Reglamento", codigo: "RE" },
        { nombre: "Documento Interno", codigo: "DI" },
        { nombre: "Documento Externo", codigo: "DE" },
        { nombre: "Otros", codigo: "OT" },
        { nombre: "Formato Interno", codigo: "FR" },
        { nombre: "Formato Externo", codigo: "FE" }
    ];
    $scope.nombre_tdocumento = function (cod) {
        var i = $scope.tipo_documento_select.findIndex(elemt => elemt.codigo == cod);
        if (i != -1) {
            return $scope.tipo_documento_select[i].nombre;
        } else {
            return "Sin tipo documento:" + cod;
        }
    }
    $scope.estado_select = [
        { nombre: "Publicado", codigo: "P" },
        { nombre: "En Gestión", codigo: "G" },
        { nombre: "Inactivo", codigo: "I" }
    ];
    $scope.origen_documento = [
        { nombre: "Interno", codigo: "I" },
        { nombre: "Externo", codigo: "E" }
    ];


    $scope.obtener_procesos = function (macroproceso_codigo) {
        return new Promise(function (resolve, reject) {
            $http({
                method: 'POST',
                url: "php/intranet/intranet_procesos.php",
                data: {
                    function: 'listar_documentos',
                    macroproceso: macroproceso_codigo
                }
            }).then(function (macroproceso) {
                if (validar_json(angular.toJson(macroproceso.data)) && macroproceso.data != undefined && macroproceso.data != null && macroproceso.data != "" && macroproceso.data.length > 0 && macroproceso.data.codigo != 1) {
                    macroproceso.data[0].procesos.forEach(function (item_procesos, i) {
                        $http({
                            method: 'POST',
                            url: "php/intranet/intranet_procesos.php",
                            data: {
                                function: 'listar_sub_documentos',
                                macroproceso: macroproceso_codigo,
                                proceso: macroproceso.data[0].procesos[i].codigo
                            }
                        }).then(function (subproceso) {
                            if (validar_json(angular.toJson(subproceso.data)) && subproceso.data != undefined && subproceso.data != null && subproceso.data != "" && subproceso.data.length > 0 && subproceso.data.codigo != 1) {
                                macroproceso.data[0].procesos[i].subprocesos = angular.copy(subproceso.data);
                                macroproceso.data[0].procesos[i].subprocesos.forEach(function (item_subprocesos, j) {
                                    if (item_subprocesos.tipo_documento != undefined && item_subprocesos.tipo_documento != null && item_subprocesos.tipo_documento != "" && item_subprocesos.tipo_documento.length > 0) {
                                        macroproceso.data[0].procesos[i].subprocesos[j] = item_subprocesos;
                                    } else {
                                        if (macroproceso.data[0].procesos[i].subprocesos[j].codigo != -1) {
                                            macroproceso.data[0].procesos[i].subprocesos[j].tipo_documento = new Array();
                                        } else {
                                            macroproceso.data[0].procesos[i].subprocesos.splice(j, 1);
                                        }
                                    }
                                });

                            } else {
                                macroproceso.data[0].procesos[i].subprocesos = new Array();
                            }
                            if (i == (macroproceso.data[0].procesos.length - 1)) {
                                resolve(macroproceso.data);
                            }
                        });
                    });
                }
            });
        });
    }

    $scope.macroproceso = -1;
    $scope.documentos_json = new Array();
    $scope.macroproceso_json = new Array();
    $scope.radio_tipo_macroproceso = function (macroproceso) {
        if (macroproceso != undefined && macroproceso != null && macroproceso != "") {
            $scope.tab_macroprocesos.proceso_select = -1;
            $scope.macroproceso_json = new Array();
            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
            });
            var promise = $scope.obtener_procesos(macroproceso);
            promise.then(function (result) {
                $scope.macroproceso_json = result;
                swal.close();
            });
        }
    }
    $scope.listar_documentos = function (macroproceso, proceso, subproceso, tdocumento) {
        if (macroproceso != undefined && macroproceso != null && macroproceso != "" && proceso != undefined && proceso != null && proceso != "" && subproceso != undefined && subproceso != null && subproceso != "" && tdocumento != undefined && tdocumento != null && tdocumento != "") {
            $scope.tab_macroprocesos.proceso_select = -1;
            $http({
                method: 'POST',
                url: "php/intranet/intranet_procesos.php",
                data: {
                    function: 'listar_documentos',
                    macroproceso: macroproceso,
                    proceso: proceso,
                    subproceso: subproceso,
                    tdocumento: tdocumento
                }
            }).then(function (response) {
                if (validar_json(angular.toJson(response.data)) && response.data.length > 0 && response.data != "") {
                    console.log(response.data);
                    // var i = $scope.macroprocesos_select.findIndex(elemt => elemt.ID == macroproceso);
                    // $scope.documentos_json = new Array({ codigo: macroproceso, nombre: "Macroproceso " + $scope.macroprocesos_select[i].NOMBRE, icono: "", procesos: response.data });
                } else {
                    $scope.documentos_json = new Array();
                    swal('Error', 'Listando los documentos', 'error');
                }
            });
        }
    }
    $scope.estado_actual = function (value) {
        if (value == "P") {
            return { "background": "#56b949" };
        } else if (value == "G") {
            return { "background": "#f0a42f" };
        } else {
            return { "background": "#ee4035" };
        }
    }

    $scope.insertar_documento = function (macroprocesos, proceso, subproceso, tdocumento, nombre, codigo, version, fecha, estado, origen) {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        if (macroprocesos != undefined && macroprocesos != null && macroprocesos != "" && proceso != undefined && proceso != null && proceso != "" && tdocumento != undefined && tdocumento != null && tdocumento != "" && nombre != undefined && nombre != null && nombre != "" && codigo != undefined && codigo != null && codigo != "" && version != undefined && version != null && version !== "" && fecha != undefined && fecha != null && fecha != "" && estado != undefined && estado != null && estado != "" && origen != undefined && origen != null && origen != "") {
            if ($scope.input_data_default.macroprocesos.files != undefined && $scope.input_data_default.macroprocesos.files != null && $scope.input_data_default.macroprocesos.files.length > 0) {
                getBase64($scope.input_data_default.macroprocesos.files).then(function (result) {
                    var extencion = $scope.input_data_default.macroprocesos.files[0].name.split(".");
                    respuestaUrl(result, $scope.url_auto($scope.input_data_default.macroprocesos.files[0].name), extencion[extencion.length - 1], "Calidad/Macroprocesos").then(function (result) {
                        $http({
                            method: 'POST',
                            url: "php/intranet/intranet_procesos.php",
                            data: {
                                function: 'guardar_documento',
                                subproceso: ((subproceso != "") ? subproceso : '-1'),
                                nombre: nombre,
                                codigo: codigo,
                                version: version,
                                fecha: $scope.formatDate(fecha, 0),
                                origen: origen,
                                estado: estado,
                                url: result,
                                responsable: sessionStorage.getItem('cedula'),
                                macroprocesos: macroprocesos,
                                proceso: proceso,
                                tipo_documento: tdocumento
                            }
                        }).then(function (response) {
                            if (validar_json(angular.toJson(response.data)) && response.data.codigo == 0 && response.data.length != "") {
                                swal.close();
                                swal('Completado', response.data.mensaje, 'success');
                                $scope.tab_macroprocesos = { proceso_select: -1, subproceso_select: -1, tipo_documento_select: -1, filtro: "", macroproceso: "", proceso: "", subproceso: "", codigo: "", nombre: "", version: 1, fecha_ultima_version: new Date(), estado: "", tipo_documento: "", origen_documento: "", boton_activo: false };
                                $scope.macroproceso = macroprocesos;
                                $scope.radio_tipo_macroproceso(macroprocesos);
                                $scope.limpiar_input_ng_file("macroprocesos");
                            } else {
                                swal.close();
                                swal('Error', response.data.mensaje, 'error');
                            }
                        });
                    }).catch(reason => {
                        swal.close();
                        swal('Mensaje', 'No se pudo subir el archivo al servidor ftp: ' + reason, 'error');
                    });
                }).catch(reason => {
                    swal.close();
                    swal('Mensaje', 'No se pudo obtener el base64 del archivo: ' + reason, 'error');
                });
            } else {
                swal.close();
                swal('Mensaje', 'El archivo no se ha seleccionado', 'error');
            }
        } else {
            swal.close();
            swal('Mensaje', 'Llene todos los campos', 'error');
        }
    }
    $scope.editar_documento = function (doc) {
        $scope.tab_macroprocesos.boton_activo = true;
        $scope.tab_macroprocesos.id = doc.codigo_documento;
        $scope.tab_macroprocesos.macroproceso = doc.codigo_macro;
        $scope.cambiar_tipo_macroproceso(doc.codigo_macro);
        setTimeout(() => {
            $scope.tab_macroprocesos.proceso = doc.codigo_proceso;
            $scope.cambiar_tipo_proceso(doc.codigo_proceso);
            $scope.$apply();
        }, 500);
        setTimeout(() => {
            $scope.tab_macroprocesos.subproceso = doc.codigo_subprocesos;
            // document.querySelector("#tab_macroprocesos_subproceso").value = doc.codigo_subprocesos;
            $scope.tab_macroprocesos.codigo = doc.codigo;
            $scope.$apply();
        }, 1000);
        $scope.tab_macroprocesos.tipo_documento = doc.tipo_documento;
        $scope.tab_macroprocesos.nombre = doc.nombre;
        $scope.tab_macroprocesos.version =  parseInt(doc.version);
        $scope.tab_macroprocesos.fecha_ultima_version = $scope.formatDate(doc.fecha_act, 7);
        $scope.tab_macroprocesos.estado = doc.estado;
        $scope.tab_macroprocesos.origen_documento = doc.origen_documento;
        $scope.tab_macroprocesos.url = doc.url;
        $scope.limpiar_input_ng_file('macroprocesos');
    }

    $scope.actualizar_documento = function (id, url, macroprocesos, proceso, subproceso, tdocumento, nombre, codigo, version, fecha, estado, origen) {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        if (id != undefined && id != null && id != "" && macroprocesos != undefined && macroprocesos != null && macroprocesos != "" && proceso != undefined && proceso != null && proceso != "" && tdocumento != undefined && tdocumento != null && tdocumento != "" && nombre != undefined && nombre != null && nombre != "" && codigo != undefined && codigo != null && codigo != "" && version != undefined && version != null && version !== "" && fecha != undefined && fecha != null && fecha != "" && estado != undefined && estado != null && estado != "" && origen != undefined && origen != null && origen != "") {
            if ($scope.input_data_default.macroprocesos.files != undefined && $scope.input_data_default.macroprocesos.files != null && $scope.input_data_default.macroprocesos.files.length > 0) {
                getBase64($scope.input_data_default.macroprocesos.files).then(function (result) {
                    var extencion = $scope.input_data_default.macroprocesos.files[0].name.split(".");
                    respuestaUrl(result, $scope.url_auto($scope.input_data_default.macroprocesos.files[0].name), extencion[extencion.length - 1], "Calidad/Macroprocesos").then(function (result) {
                        $http({
                            method: 'POST',
                            url: "php/intranet/intranet_procesos.php",
                            data: {
                                function: 'actualizar_documento',
                                id: id,
                                subproceso: ((subproceso != "") ? subproceso : '-1'),
                                nombre: nombre,
                                codigo: codigo,
                                version: version,
                                fecha: $scope.formatDate(fecha, 0),
                                origen: origen,
                                estado: estado,
                                url: result,
                                responsable: sessionStorage.getItem('cedula'),
                                macroprocesos: macroprocesos,
                                proceso: proceso,
                                tipo_documento: tdocumento
                            }
                        }).then(function (response) {
                            if (validar_json(angular.toJson(response.data)) && response.data.codigo == 0 && response.data.length != "") {
                                swal.close();
                                swal('Completado', response.data.mensaje, 'success');
                                $scope.tab_macroprocesos = { proceso_select: -1, subproceso_select: -1, tipo_documento_select: -1, filtro: "", macroproceso: "", proceso: "", subproceso: "", codigo: "", nombre: "", version: 1, fecha_ultima_version: new Date(), estado: "", tipo_documento: "", origen_documento: "", boton_activo: false };
                                $scope.radio_tipo_macroproceso(macroprocesos);
                                $scope.limpiar_input_ng_file("macroprocesos");
                            } else {
                                swal.close();
                                swal('Error', response.data.mensaje, 'error');
                            }
                        });
                    }).catch(reason => {
                        swal.close();
                        swal('Mensaje', 'No se pudo subir el archivo al servidor ftp: ' + reason, 'error');
                    });
                }).catch(reason => {
                    swal.close();
                    swal('Mensaje', 'No se pudo obtener el base64 del archivo: ' + reason, 'error');
                });
            } else {
                $http({
                    method: 'POST',
                    url: "php/intranet/intranet_procesos.php",
                    data: {
                        function: 'actualizar_documento',
                        id: id,
                        subproceso: ((subproceso != "") ? subproceso : '-1'),
                        nombre: nombre,
                        codigo: codigo,
                        version: version,
                        fecha: $scope.formatDate(fecha, 0),
                        origen: origen,
                        estado: estado,
                        url: url,
                        responsable: sessionStorage.getItem('cedula'),
                        macroprocesos: macroprocesos,
                        proceso: proceso,
                        tipo_documento: tdocumento
                    }
                }).then(function (response) {
                    if (validar_json(angular.toJson(response.data)) && response.data.codigo == 0 && response.data.length != "") {
                        swal.close();
                        swal('Completado', response.data.mensaje, 'success');
                        $scope.tab_macroprocesos = { proceso_select: -1, subproceso_select: -1, tipo_documento_select: -1, filtro: "", macroproceso: "", proceso: "", subproceso: "", codigo: "", nombre: "", version: 1, fecha_ultima_version: new Date(), estado: "", tipo_documento: "", origen_documento: "", boton_activo: false };
                        $scope.radio_tipo_macroproceso(macroprocesos);
                        $scope.limpiar_input_ng_file("macroprocesos");
                    } else {
                        swal.close();
                        swal('Error', response.data.mensaje, 'error');
                    }
                });
            }
        } else {
            swal.close();
            swal('Mensaje', 'Llene todos los campos', 'error');
        }
    }



    $scope.formatDate = function (date, tipo) {
        if (tipo == 7) {
            return new Date(date);
        } else {
            var dia = date.getDate();
            var mes = date.getMonth() + 1;
            var año = date.getFullYear();
            if (tipo == 0) {
                return ((dia < 10) ? ("0" + dia) : dia) + '/' + ((mes < 10) ? ('0' + mes) : mes) + '/' + año;
            } else if (tipo == 1) {
                return año + '/' + mes + '/' + dia;
            } else if (tipo == 2) {
                var resultado = new Date(año, (mes - 1), (dia - 1));
                dia = resultado.getDate();
                mes = resultado.getMonth() + 1;
                año = resultado.getFullYear();
                return año + '-' + ((mes < 10) ? ('0' + mes) : mes) + '-' + ((dia < 10) ? ("0" + dia) : dia);
            } else if (tipo == 3) {
                return año + '-' + ((mes < 10) ? ('0' + mes) : mes) + '-' + ((dia < 10) ? ("0" + dia) : dia);
            } else if (tipo == 4) {
                return año;
            } else if (tipo == 5) {
                return mes;
            } else if (tipo == 6) {
                return dia;
            }
        }
    }

    $scope.icono = function (url) {
        if (url != undefined && url != "") {
            var ext;
            if (url != undefined && url.indexOf(".") > 0) {
                ext = url.split(".");
            } else {
                ext = 0;
            }
            if (ext.length > 0 && Array.isArray(ext)) {
                if (ext[ext.length - 1].toUpperCase() == "PDF") {
                    return "icon-file-pdf red-text";
                } else if (ext[ext.length - 1].toUpperCase() == "DOC" || ext[ext.length - 1].toUpperCase() == "DOCX") {
                    return "icon-file-word blue-text";
                } else if (ext[ext.length - 1].toUpperCase() == "XLS" || ext[ext.length - 1].toUpperCase() == "XLSX") {
                    return "icon-file-excel green-text";
                } else if (ext[ext.length - 1].toUpperCase() == "PPT" || ext[ext.length - 1].toUpperCase() == "PPTX") {
                    return "icon-file-powerpoint orange-text";
                } else {
                    return "icon-attention-alt";
                }
            } else {
                return "icon-help";
            }
        }
    }


    $scope.descargar_archivo = function (ruta) {
        $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
                function: 'descargaAdjunto',
                ruta: ruta
            }
        }).then(function (response) {
            window.open("temp/" + response.data);
        });
    }
    function getBase64(file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function () { resolve(reader.result); };
            reader.onerror = function () { reject(file[0].name); };
            reader.readAsDataURL(file[0]);
        });
    }
    function respuestaUrl(base64, name, ext, location = "") {
        return new Promise(function (resolve, reject) {
            $http({
                method: 'POST',
                url: "php/intranet/intranet_procesos.php",
                data: {
                    function: 'get_url_ftp',
                    base64: angular.toJson(base64),
                    name: name,
                    ext: ext,
                    location: location
                }
            }).then(function (response) {
                if (response.data != "0") {
                    resolve(response.data.url);
                } else {
                    reject(element.name);
                }
            });
        });
    }
    $scope.url_auto = function (texto) {
        var url = texto;
        url = url.replace(/á/gi, "a");
        url = url.replace(/é/gi, "e");
        url = url.replace(/í/gi, "i");
        url = url.replace(/ó/gi, "o");
        url = url.replace(/ú/gi, "u");
        url = url.replace(/ñ/gi, "n");
        url = url.replace(/-/gi, "_");
        url = url.replace(/.pdf/gi, "");
        url = url.replace(/.docx/gi, "");
        url = url.replace(/.doc/gi, "");
        url = url.replace(/.xls/gi, "");
        url = url.replace(/.xlsx/gi, "");
        url = url.replace(/.zip/gi, "");
        url = url.replace(/.rar/gi, "");
        url = url.replace(/.7z/gi, "");
        return url.replace(/\s/g, "_").toLowerCase();
    }
    $scope.descargar_archivo = function (ruta) {
        if (ruta != "" && ruta != null && ruta != undefined && ruta.length > 10) {
            $http({
                method: 'POST',
                url: "php/intranet/intranet_procesos.php",
                data: {
                    function: 'descargaAdjunto',
                    ruta: ruta
                }
            }).then(function (response) {
                window.open("temp/" + response.data);
            });
        } else {
            swal('Url no válida', 'No se encontró ningún archivo', 'warning');
        }
    }
    // ------------------------------------------------------------------------------------------------------------- TAB.INDICADORES
    $scope.checkbox_indicadores = function(){
        if ($scope.tab_indicadores.vista) {
            $scope.listar_historial_documentos();
        }else {
            $scope.listar_indicadores();
        }
    }
    $scope.listar_indicadores = function() {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        var series = new Array();
        $http({
            method: 'POST',
            url: "php/intranet/intranet_procesos.php",
            data: {
                function: 'grafica_tipo_documentos'
            }
        }).then(function (tipo_d) {
            if (validar_json(angular.toJson(tipo_d.data)) && tipo_d.data.length > 0 && tipo_d.data != "" && tipo_d.data.codigo != 1) {
                tipo_d.data.forEach(function (element_tipo_d, i) {
                    var promise = new Promise(function (resolve, reject) {
                        $http({
                            method: 'POST',
                            url: "php/intranet/intranet_procesos.php",
                            data: {
                                function: 'grafica_procesos',
                                tipo_d: element_tipo_d.drilldown
                            }
                        }).then(function (procesos) {
                            if (validar_json(angular.toJson(procesos.data)) && procesos.data.length > 0 && procesos.data != "" && procesos.data.Codigo != 1) {
                                series = series.concat([{
                                    name: element_tipo_d.name,
                                    id: element_tipo_d.drilldown,
                                    data: procesos.data
                                }]);
                                if ((tipo_d.data.length - 1) == i) {
                                    resolve(series);
                                }
                            } else {
                                procesos.data = [];
                                if ((tipo_d.data.length - 1) == i) {
                                    resolve(series);
                                }
                            }
                        });
                    });
                    promise.then(function (result) {
                        if (result.length > 0) {
                            var temp = [];
                            var promise2 = new Promise(function (resolve, reject) {
                                result.forEach(function (element_procesos, j) {
                                    element_procesos.data.forEach(function (element_procesos_2, j_2) {
                                        $http({
                                            method: 'POST',
                                            url: "php/intranet/intranet_procesos.php",
                                            data: {
                                                function: 'grafica_documentos',
                                                tipo_d: element_procesos_2.drilldown.split("/")[0],
                                                proceso: element_procesos_2.drilldown.split("/")[1]
                                            }
                                        }).then(function (documentos) {
                                            if (validar_json(angular.toJson(documentos.data)) && documentos.data.length > 0 && documentos.data != "" && documentos.data.Codigo != 1) {
                                                var a = [];
                                                documentos.data.forEach(function (element_documentos, k) {
                                                    // Object.assign({ name: element_documentos.nombre, y: (k + 1)}, element_documentos)
                                                    a.push(Object.assign({ name: element_documentos.nombre, y: (k + 1) }, element_documentos));
                                                });
                                                temp = temp.concat([{
                                                    name: element_procesos_2.name,
                                                    id: element_procesos_2.drilldown,
                                                    data: a
                                                }]);
                                                if ((result.length - 1) == j && (element_procesos.data.length - 1) == j_2) {
                                                    resolve(temp);
                                                }
                                            } else {
                                                if ((result.length - 1) == j && (element_procesos.data.length - 1) == j_2) {
                                                    resolve(temp);
                                                }
                                            }
                                        })
                                    });
                                });
                            });
                            promise2.then(function (result_2) {
                                result = result.concat(result_2);
                                if ((tipo_d.data.length - 1) == i) {
                                    swal.close();
                                    console.log(tipo_d.data, result);
                                    result; Highcharts.chart('container', {
                                        chart: {
                                            type: 'column'
                                        },
                                        title: {
                                            text: ''
                                        },
                                        subtitle: {
                                            // text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
                                        },
                                        xAxis: {
                                            type: 'category',
                                            title: {
                                                text: 'Tipo de documento'
                                            }
                                        },
                                        yAxis: {
                                            title: {
                                                text: 'Cantidad'
                                            }
                                        },
                                        legend: {
                                            enabled: false
                                        },
                                        plotOptions: {
                                            series: {
                                                borderWidth: 0,
                                                dataLabels: {
                                                    enabled: true,
                                                    format: '{point.y}'
                                                }
                                            }
                                        },

                                        tooltip: {
                                            // formatter: function () {
                                            //     return this.point.y.reduce(function (s, point) {
                                            //         return s + '<br/>' + point.series.name + ': ' +
                                            //             point.y + 'm';
                                            //     }, '<b>' + this.x + '</b>');
                                            // }
                                            // ,
                                            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                                            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
                                        },

                                        series: [
                                            {
                                                name: "Tipo Documento",
                                                colorByPoint: true,
                                                data: tipo_d.data
                                            }
                                        ],
                                        drilldown: {
                                            series: result
                                        }
                                    });
                                } else {
                                    swal.close();
                                    swal('Error', 'Cargando la grafica', 'error');
                                }
                            })
                        } else {
                            swal.close();
                            swal('Mensaje', 'No se encontraron documentos', 'info');
                        }
                    });
                });
            } else {
                swal.close();
                swal('Error', 'Cargando la grafica', 'error');
                $scope.proceso_select_all = new Array();
            }
        });
    }
    $scope.tab_indicadores = { vista: false, documentos: new Array() }
    $scope.listar_historial_documentos = function () {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        $http({
            method: 'POST',
            url: "php/intranet/intranet_procesos.php",
            data: {
                function: 'listar_historial_documentos'
            }
        }).then(function (response) {
            swal.close();
            if (validar_json(angular.toJson(response.data)) && response.data.length > 0 && response.data != "") {
                response.data.forEach(function (elemnt, i) {
                    response.data[i].estado = $scope.estado_select.filter(es => es.codigo == elemnt.estado)[0].nombre;
                    response.data[i].origen_documento = $scope.origen_documento.filter(or => or.codigo == elemnt.origen_documento)[0].nombre;
                });
                $scope.tab_indicadores.documentos = response.data;
            } else {
                $scope.tab_indicadores.documentos = new Array();
                swal('Mensaje', 'No se encontraron documentos', 'info');
            }
        });
    }
    $scope.exportar = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = typeof JSONData != 'object' ? JSON.parse(angular.toJson(JSONData)) : JSON.parse(angular.toJson(JSONData));
        arrData.forEach(function (element, i) {
            arrData[i] = {
                ID: element.codigo_documento,
                Macroproceso: element.codigo_macro,
                Proceso: element.codigo_proceso,
                Subprocesos: (element.codigo_subprocesos != null) ? element.codigo_subprocesos : "",
                Tipo_Documento: element.tipo_documento,
                Nombre: element.nombre,
                Codigo: element.codigo,
                Version: element.version,
                Fecha_Actualizacion: element.fecha_act,
                Origen: element.origen_documento,
                Estado: element.estado,
                Cedula_Responsable: element.id_responsable,
                Nombre_Responsable: element.nombre_responsable,
                Url: element.url
            };
        });
        var CSV = ',' + '\r\n\n';
        if (ShowLabel) {
            var row = "";
            for (var index in arrData[0]) {
                row += index + ',';
            }
            row = row.slice(0, -1);
            CSV += row + '\r\n';
        }
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }
            row.slice(0, row.length - 1);
            CSV += row + '\r\n';
        }
        if (CSV == '') {
            return;
        }
        var fileName = "Reporte general - ";
        fileName += ReportTitle.replace(/ /g, "_") + " (" + $scope.formatDate(new Date(), 3) + ")";
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    // ------------------------------------------------------------------------------------------------------------- TAB.PLANTILLAS
    $scope.plantillas = new Array();
    $scope.listar_plantillas = function (estado) {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        $scope.tab_plantillas.switch = (estado == 'A') ? false : true;
        $http({
            method: 'POST',
            url: "php/intranet/intranet_procesos.php",
            data: {
                function: 'listar_plantilla',
                estado: estado
            }
        }).then(function (response) {
            swal.close();
            if (validar_json(angular.toJson(response.data)) && response.data.length > 0 && response.data != "") {
                $scope.plantillas = response.data;
            } else {
                $scope.plantillas = new Array();
                swal('Mensaje', 'No se encontraron plantillas', 'info');
            }
        });
    }


    $scope.tab_plantillas = { filtro: "", codigo: "", nombre: "", archivo: "", estado: "", url: "", switch: false, boton_activo: false };
    $scope.guardar_plantilla = function (nombre, estado) {
        if (nombre != undefined && nombre != null && nombre != "" && estado != undefined && estado != null && estado != "") {
            if ($scope.input_data_default.plantilla.files != undefined && $scope.input_data_default.plantilla.files != null && $scope.input_data_default.plantilla.files.length > 0) {
                getBase64($scope.input_data_default.plantilla.files).then(function (result) {
                    var extencion = $scope.input_data_default.plantilla.files[0].name.split(".");
                    respuestaUrl(result, $scope.url_auto($scope.input_data_default.plantilla.files[0].name), extencion[extencion.length - 1], "Calidad/Plantillas").then(function (result) {
                        $http({
                            method: 'POST',
                            url: "php/intranet/intranet_procesos.php",
                            data: {
                                function: 'guardar_plantilla',
                                nombre: nombre,
                                url: result,
                                responsable: sessionStorage.getItem('cedula'),
                                estado: estado
                            }
                        }).then(function (response) {
                            if (validar_json(angular.toJson(response.data)) && response.data.codigo == 0 && response.data.length != "") {
                                swal('Completado', response.data.mensaje, 'success');
                                $scope.tab_plantillas.boton_activo = false;
                                $scope.tab_plantillas.codigo = "";
                                $scope.tab_plantillas.nombre = "";
                                $scope.tab_plantillas.estado = "";
                                $scope.tab_plantillas.url = "";
                                $scope.limpiar_input_ng_file("plantilla");
                            } else {
                                swal('Error', response.data.mensaje, 'error');
                            }
                            $scope.listar_plantillas(estado);
                        });
                    }).catch(reason => {
                        swal('Mensaje', 'No se pudo subir el archivo al servidor ftp: ' + reason, 'error');
                    });
                }).catch(reason => {
                    swal('Mensaje', 'No se pudo obtener el base64 del archivo: ' + reason, 'error');
                });
            } else {
                swal('Mensaje', 'El archivo no se ha seleccionado', 'error');
            }
        } else {
            swal('Mensaje', 'El nombre del documento o el estado no puede ser vacio', 'error');
        }
    }

    $scope.editar_plantilla = function (plantilla) {
        $scope.tab_plantillas.boton_activo = true;
        $scope.tab_plantillas.codigo = plantilla.ID;
        $scope.tab_plantillas.nombre = plantilla.NOMBRE;
        $scope.tab_plantillas.estado = plantilla.ESTADO;
        $scope.tab_plantillas.url = plantilla.URL;
        $scope.limpiar_input_ng_file("plantilla");
    }

    $scope.limpiar_input_ng_file = function (id) {
        if (id != undefined && id != null && id != "") {
            var input = document.querySelector("#" + id);
            $scope.input_data_default[id] = "";
            input.value = "";
            input.parentElement.dataset.file = input.dataset.name_default;
        } else {
            console.log("Error Files:" + id);
        }
    }

    $scope.actualizar_plantilla = function (codigo, nombre, estado, url) {
        console.log(codigo, nombre, estado, $scope.input_data_default.plantilla);
        if (codigo != undefined && codigo != null && codigo != "" && nombre != undefined && nombre != null && nombre != "" && estado != undefined && estado != null && estado != "") {
            if ($scope.input_data_default.plantilla.files != undefined && $scope.input_data_default.plantilla.files != null && $scope.input_data_default.plantilla.files.length > 0) {
                getBase64($scope.input_data_default.plantilla.files).then(function (result) {
                    var extencion = $scope.input_data_default.plantilla.files[0].name.split(".");
                    respuestaUrl(result, $scope.url_auto($scope.input_data_default.plantilla.files[0].name), extencion[extencion.length - 1], "Calidad/Plantillas").then(function (result) {
                        $http({
                            method: 'POST',
                            url: "php/intranet/intranet_procesos.php",
                            data: {
                                function: 'actualizar_plantilla',
                                codigo: codigo,
                                nombre: nombre,
                                url: result,
                                responsable: sessionStorage.getItem('cedula'),
                                estado: estado
                            }
                        }).then(function (response) {
                            if (validar_json(angular.toJson(response.data)) && response.data.codigo == 0 && response.data.length != "") {
                                swal('Completado', response.data.mensaje, 'success');
                                $scope.tab_plantillas.boton_activo = false;
                                $scope.tab_plantillas.codigo = "";
                                $scope.tab_plantillas.nombre = "";
                                $scope.tab_plantillas.estado = "";
                                $scope.tab_plantillas.url = "";
                                $scope.input_data_default.plantilla = "";
                            } else {
                                swal('Error', response.data.mensaje, 'error');
                            }
                            $scope.listar_plantillas(estado);
                        });
                    }).catch(reason => {
                        swal('Mensaje', 'No se pudo subir el archivo al servidor ftp: ' + reason, 'error');
                    });
                }).catch(reason => {
                    swal('Mensaje', 'No se pudo obtener el base64 del archivo: ' + reason, 'error');
                });
            } else {
                $http({
                    method: 'POST',
                    url: "php/intranet/intranet_procesos.php",
                    data: {
                        function: 'actualizar_plantilla',
                        codigo: codigo,
                        nombre: nombre,
                        url: url,
                        responsable: sessionStorage.getItem('cedula'),
                        estado: estado
                    }
                }).then(function (response) {
                    if (validar_json(angular.toJson(response.data)) && response.data.codigo == 0 && response.data.length != "") {
                        swal('Completado', response.data.mensaje, 'success');
                        $scope.tab_plantillas.boton_activo = false;
                        $scope.tab_plantillas.codigo = "";
                        $scope.tab_plantillas.nombre = "";
                        $scope.tab_plantillas.estado = "";
                        $scope.tab_plantillas.url = "";
                        $scope.input_data_default.plantilla = "";
                    } else {
                        swal('Error', response.data.mensaje, 'error');
                    }
                    $scope.listar_plantillas(estado);
                });
            }
        } else {
            swal('Mensaje', 'El codigo, nombre o el estado del documento no puede ser vacio', 'error');
        }
    }
    function validar_json(str) {
        try {
            if (typeof str !== "string") {
                return false;
            } else {
                return (typeof JSON.parse(str) === 'object');
            }
        } catch (e) {
            return false;
        }
    }
}]).directive("inputNgFile", function () {
    return {
        link: function postLink($scope, elem) {
            elem.on("change", function (e) {
                if (!this.multiple) {
                    var files = this.files;
                    if (files.length > 0) {
                        var extencion = false;
                        var patt = new RegExp("(" + $scope.input_data_default.validate[this.dataset.index].ext + ")$");
                        if (patt.exec(this.value)) {
                            extencion = true;
                        } else {
                            extencion = false;
                        }
                        if (files && extencion) {
                            if (files[0].size > 0 && files[0].size <= (($scope.input_data_default.validate[this.dataset.index].size * 1024) * 1024)) {
                                this.parentElement.dataset.file = files[0].name;
                                $scope.input_data_default[this.id] = this;
                            } else {
                                swal('Advertencia', 'El archivo excede el peso limite de ' + $scope.input_data_default.validate[this.dataset.index].size + 'MB (' + files[0].size + ')', 'warning');
                                $(this).val("");
                                this.parentElement.dataset.file = this.dataset.name_default;
                                $scope.input_data_default[this.id] = "";
                            }
                        } else {
                            swal('Advertencia', 'El archivo no es un formato valido: ' + $scope.input_data_default.validate[this.dataset.index].ext + '(' + files[0].name + ')', 'warning');
                            $(this).val("");
                            this.parentElement.dataset.file = this.dataset.name_default;
                            $scope.input_data_default[this.id] = "";
                        }
                    } else {
                        $(this).val("");
                        this.parentElement.dataset.file = this.dataset.name_default;
                        $scope.input_data_default[this.id] = "";
                    }
                    $scope.$apply();
                } else {
                    console.log("La directiva aun no soporta multiples archivos :( by Cesar Nuñez");
                }
            })
        }
    }
});