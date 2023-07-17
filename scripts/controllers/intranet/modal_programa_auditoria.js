'use strict';
angular.module('GenesisApp').controller('modal_programa_auditoriaController', ['$scope', '$http', 'ngDialog', 'acasHttp', function ($scope, $http, ngDialog, acasHttp) {
    $scope.auditoria = { codigo: "", objetivo: "", riesgos: "", oportunidades: "", alcance: "", recursos: "", equipo: new Array(), auditado: new Array(), metodo: "", responsabilidades: "", observaciones: "", tipo_auditoria: "", fecha: "", adjunto: "" };
    $scope.input_data_default = { auditoria: "", validate: [{ size: 10, ext: ".pdf|.doc|.docx|.xls|.xlsx|.zip|.7z|.rar" }] };
    $scope.cambiarVista = function (tipo, detalles = []) {
        $scope.datos.vista = tipo;
        if (tipo == 0 && detalles.length > 0) {
            $scope.titulo = "Vista Previa";
        } else if (tipo == 1 && detalles.length == 0) {
            $scope.titulo = "Crear Auditoria";
            $scope.dia_num_select;
            $scope.dia_nombre_select;
            $scope.mes_nombre_select;
            $scope.mes_num_select;
            $scope.año_select;
            $scope.auditoria = { codigo: "", objetivo: "", riesgos: "", oportunidades: "", alcance: "", recursos: "", equipo: new Array(), auditado: new Array(), metodo: "", responsabilidades: "", observaciones: "", tipo_auditoria: "", fecha: "", adjunto: "" };
            $scope.agenda_fecha = new Date($scope.año_select, ($scope.mes_num_select - 1), $scope.dia_num_select);
            /* setTimeout(() => {
                const textarea = document.querySelectorAll("#programa_auditorias_modal textarea");
                textarea.forEach(element => {
                    element.onpaste = function (e) {
                        e.preventDefault();
                    }
                });
            }, 100); */
        } else if (tipo == 1 && detalles != "") {
            $scope.titulo = "Editar Auditoria";
            $http({
                method: 'POST',
                url: "php/intranet/programa_auditoria.php",
                data: {
                    function: 'listar_auditoria',
                    codigo: detalles
                }
            }).then(function (response) {
                console.log("Editar", response.data);
                $scope.auditoria = { codigo: response.data[0].CODIGO, objetivo: response.data[0].OBJETIVO, riesgos: response.data[0].RIESGOS, oportunidades: response.data[0].OPORTUNIDADES, alcance: response.data[0].ALCANCE, recursos: response.data[0].RECURSOS, equipo: new Array(), auditado: new Array(), metodo: response.data[0].METODO, responsabilidades: response.data[0].RESPONSABILIDADES, observaciones: response.data[0].OBSERVACION, tipo_auditoria: response.data[0].TIPO, fecha: response.data[0].FECHA, adjunto: response.data[0].ADJUNTO };
                $scope.agenda_fecha = new Date($scope.año_select, ($scope.mes_num_select - 1), $scope.dia_num_select);
                if (response.data[0].EQ_AUDITADO != undefined && response.data[0].EQ_AUDITADO != null && response.data[0].EQ_AUDITADO != "") {
                    $http({
                        method: 'POST',
                        url: "php/tic/paneladmin/paneladmin.php",
                        data: {
                            function: 'getModuloUser',
                            user: parseInt(response.data[0].EQ_AUDITADO)
                        }
                    }).then(function (response) {
                        if (response.data[0].Codigo == 404) {
                            swal('Advertencia', 'El usuario no esta registrado' + response.data[0].EQ_AUDITADO, 'warning');
                        } else {
                            $scope.agregar_usuario({ cedula: response.data[0].CEDULA, nombre: response.data[0].USUARIO, cargo: "ROL(" + response.data[0].CODIGO + ")" }, 'auditado', 'resultados_aud');
                        }
                    });
                }
                if (response.data[0].EQ_AUDITOR != undefined && response.data[0].EQ_AUDITOR != null && response.data[0].EQ_AUDITOR != "") {
                    JSON.parse(response.data[0].EQ_AUDITOR).forEach(element => {
                        $http({
                            method: 'POST',
                            url: "php/tic/paneladmin/paneladmin.php",
                            data: {
                                function: 'getModuloUser',
                                user: element
                            }
                        }).then(function (response) {
                            if (response.data[0].Codigo == 404) {
                                swal('Advertencia', 'El usuario no esta registrado' + element, 'warning');
                            } else {
                                $scope.agregar_usuario({ cedula: response.data[0].CEDULA, nombre: response.data[0].USUARIO, cargo: "ROL(" + response.data[0].CODIGO + ")" }, 'equipo', 'resultados');
                            }
                        });
                    });
                }
            });
        } else if (tipo == 2 && detalles != "") {
            $scope.titulo = "Ver Auditoria";
            $http({
                method: 'POST',
                url: "php/intranet/programa_auditoria.php",
                data: {
                    function: 'listar_auditoria',
                    codigo: detalles
                }
            }).then(function (response) {
                console.log("Ver", response.data);
                $scope.auditoria = { codigo: response.data[0].CODIGO, objetivo: response.data[0].OBJETIVO, riesgos: response.data[0].RIESGOS, oportunidades: response.data[0].OPORTUNIDADES, alcance: response.data[0].ALCANCE, recursos: response.data[0].RECURSOS, equipo: new Array(), auditado: new Array(), metodo: response.data[0].METODO, responsabilidades: response.data[0].RESPONSABILIDADES, observaciones: response.data[0].OBSERVACION, tipo_auditoria: response.data[0].TIPO, fecha: response.data[0].FECHA, adjunto: response.data[0].ADJUNTO };
                $scope.agenda_fecha = new Date($scope.año_select, ($scope.mes_num_select - 1), $scope.dia_num_select);
                if (response.data[0].EQ_AUDITADO != undefined && response.data[0].EQ_AUDITADO != null && response.data[0].EQ_AUDITADO != "") {
                    $http({
                        method: 'POST',
                        url: "php/tic/paneladmin/paneladmin.php",
                        data: {
                            function: 'getModuloUser',
                            user: parseInt(response.data[0].EQ_AUDITADO)
                        }
                    }).then(function (response) {
                        if (response.data[0].Codigo == 404) {
                            swal('Advertencia', 'El usuario no esta registrado: ' + response.data[0].EQ_AUDITADO, 'warning');
                        } else {
                            $scope.agregar_usuario({ cedula: response.data[0].CEDULA, nombre: response.data[0].USUARIO, cargo: "ROL(" + response.data[0].CODIGO + ")" }, 'auditado', 'resultados_aud');
                        }
                    });
                }
                if (response.data[0].EQ_AUDITOR != undefined && response.data[0].EQ_AUDITOR != null && response.data[0].EQ_AUDITOR != "") {
                    JSON.parse(response.data[0].EQ_AUDITOR).forEach(element => {
                        $http({
                            method: 'POST',
                            url: "php/tic/paneladmin/paneladmin.php",
                            data: {
                                function: 'getModuloUser',
                                user: element
                            }
                        }).then(function (response) {
                            if (response.data[0].Codigo == 404) {
                                swal('Advertencia', 'El usuario no esta registrado' + element, 'warning');
                            } else {
                                $scope.agregar_usuario({ cedula: response.data[0].CEDULA, nombre: response.data[0].USUARIO, cargo: "ROL(" + response.data[0].CODIGO + ")" }, 'equipo', 'resultados');
                            }
                        });
                    });
                }
            });
        }
    }
    $scope.ver_icono = function (url) {
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
                } else {
                    return "icon-attention-alt";
                }
            } else {
                return "icon-help";
            }
        }
    }
    $scope.modalClose = function () {
        $scope.closeThisDialog("");
    }
    $scope.nombre_archivo_ftp = function (texto) {
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
    $scope.obtener_base_64 = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function () { resolve(reader.result); };
            reader.onerror = function () { reject(file[0].name); };
            reader.readAsDataURL(file[0]);
        });
    }
    $scope.obtener_url_ftp = function (base64, name, ext, location = "") {
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
    $scope.guardar_auditoria = function (fecha) {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        var cedulas = new Array();
        $scope.auditoria.equipo.forEach(element => {
            cedulas.push(element.cedula);
        });
        if ($scope.auditoria.objetivo != "" && $scope.auditoria.riesgos != "" && $scope.auditoria.oportunidades != "" && $scope.auditoria.alcance != "" && $scope.auditoria.recursos != "" && $scope.auditoria.equipo.length > 0 && $scope.auditoria.auditado.length == 1 && $scope.auditoria.metodo != "" && $scope.auditoria.responsabilidades != "" && $scope.auditoria.observaciones != "" && $scope.auditoria.tipo_auditoria != "" && fecha != "") {
            if ($scope.auditoria.codigo == "") {
                if ($scope.input_data_default.auditoria.files != undefined && $scope.input_data_default.auditoria.files != null && $scope.input_data_default.auditoria.files.length > 0) {
                    $scope.obtener_base_64($scope.input_data_default.auditoria.files).then(function (base64) {
                        var extencion = $scope.input_data_default.auditoria.files[0].name.split(".");
                        $scope.obtener_url_ftp(base64, $scope.nombre_archivo_ftp($scope.input_data_default.auditoria.files[0].name), extencion[extencion.length - 1], "Calidad/Auditoria").then(function (url_ftp) {
                            console.log(url_ftp);
                            $http({
                                method: 'POST',
                                url: "php/intranet/programa_auditoria.php",
                                data: {
                                    function: "guardar_auditoria",
                                    objetivo: $scope.auditoria.objetivo,
                                    riesgos: $scope.auditoria.riesgos,
                                    oportunidades: $scope.auditoria.oportunidades,
                                    alcance: $scope.auditoria.alcance,
                                    recursos: $scope.auditoria.recursos,
                                    tipo: $scope.auditoria.tipo_auditoria,
                                    metodo: $scope.auditoria.metodo,
                                    responsabilidades: $scope.auditoria.responsabilidades,
                                    eq_auditorar: angular.toJson(cedulas),
                                    eq_auditado: $scope.auditoria.auditado[0].cedula,
                                    user_elaboracion: sessionStorage.getItem('cedula'),
                                    observacion: $scope.auditoria.observaciones,
                                    adjunto: url_ftp,
                                    fecha: $scope.formatDate(fecha, 0)
                                }
                            }).then(function (response) {
                                console.log(response.data);
                                if (response.data.codigo == 0) {
                                    swal.close();
                                    $scope.closeThisDialog(response.data);
                                } else {
                                    swal.close();
                                    swal('Mensaje', response.data.mensaje, 'warning');
                                };
                            });
                        }).catch(reason_ftp => {
                            swal('Mensaje', 'No se pudo subir el archivo al servidor ftp: ' + reason_ftp, 'error');
                        });
                    }).catch(reason_b64 => {
                        swal('Mensaje', 'No se pudo obtener el base64 del archivo: ' + reason_b64, 'error');
                    });
                } else {
                    $http({
                        method: 'POST',
                        url: "php/intranet/programa_auditoria.php",
                        data: {
                            function: "guardar_auditoria",
                            objetivo: $scope.auditoria.objetivo,
                            riesgos: $scope.auditoria.riesgos,
                            oportunidades: $scope.auditoria.oportunidades,
                            alcance: $scope.auditoria.alcance,
                            recursos: $scope.auditoria.recursos,
                            tipo: $scope.auditoria.tipo_auditoria,
                            metodo: $scope.auditoria.metodo,
                            responsabilidades: $scope.auditoria.responsabilidades,
                            eq_auditorar: angular.toJson(cedulas),
                            eq_auditado: $scope.auditoria.auditado[0].cedula,
                            user_elaboracion: sessionStorage.getItem('cedula'),
                            observacion: $scope.auditoria.observaciones,
                            adjunto: "",
                            fecha: $scope.formatDate(fecha, 0)
                        }
                    }).then(function (response) {
                        console.log(response.data);
                        if (response.data.codigo == 0) {
                            swal.close();
                            $scope.closeThisDialog(response.data);
                        } else {
                            swal.close();
                            swal('Mensaje', response.data.mensaje, 'warning');
                        };
                    });
                    //swal('Mensaje', 'El archivo no se ha seleccionado', 'error');
                }
            } else if ($scope.auditoria.codigo != undefined && $scope.auditoria.codigo != "" && $scope.input_data_default.auditoria.files != undefined && $scope.input_data_default.auditoria.files != null && $scope.input_data_default.auditoria.files.length > 0) {
                $scope.obtener_base_64($scope.input_data_default.auditoria.files).then(function (base64) {
                    var extencion = $scope.input_data_default.auditoria.files[0].name.split(".");
                    $scope.obtener_url_ftp(base64, $scope.nombre_archivo_ftp($scope.input_data_default.auditoria.files[0].name), extencion[extencion.length - 1], "Calidad/Auditoria").then(function (url_ftp) {
                        console.log(url_ftp);
                        $http({
                            method: 'POST',
                            url: "php/intranet/programa_auditoria.php",
                            data: {
                                function: "actualizar_auditoria",
                                codigo: $scope.auditoria.codigo,
                                objetivo: $scope.auditoria.objetivo,
                                riesgos: $scope.auditoria.riesgos,
                                oportunidades: $scope.auditoria.oportunidades,
                                alcance: $scope.auditoria.alcance,
                                recursos: $scope.auditoria.recursos,
                                tipo: $scope.auditoria.tipo_auditoria,
                                metodo: $scope.auditoria.metodo,
                                responsabilidades: $scope.auditoria.responsabilidades,
                                eq_auditorar: angular.toJson(cedulas),
                                eq_auditado: $scope.auditoria.auditado[0].cedula,
                                user_elaboracion: sessionStorage.getItem('cedula'),
                                observacion: $scope.auditoria.observaciones,
                                adjunto: url_ftp,
                                fecha: $scope.formatDate(fecha, 0)
                            }
                        }).then(function (response) {
                            console.log(response.data);
                            if (response.data.codigo == 0) {
                                swal.close();
                                $scope.closeThisDialog(response.data);
                            } else {
                                swal.close();
                                swal('Mensaje', response.data.mensaje, 'warning');
                            };
                        });
                    }).catch(reason_ftp => {
                        swal('Mensaje', 'No se pudo subir el archivo al servidor ftp: ' + reason_ftp, 'error');
                    });
                }).catch(reason_b64 => {
                    swal('Mensaje', 'No se pudo obtener el base64 del archivo: ' + reason_b64, 'error');
                });
            } else if ($scope.auditoria.codigo != undefined && $scope.auditoria.codigo != "") {
                $http({
                    method: 'POST',
                    url: "php/intranet/programa_auditoria.php",
                    data: {
                        function: "actualizar_auditoria",
                        codigo: $scope.auditoria.codigo,
                        objetivo: $scope.auditoria.objetivo,
                        riesgos: $scope.auditoria.riesgos,
                        oportunidades: $scope.auditoria.oportunidades,
                        alcance: $scope.auditoria.alcance,
                        recursos: $scope.auditoria.recursos,
                        tipo: $scope.auditoria.tipo_auditoria,
                        metodo: $scope.auditoria.metodo,
                        responsabilidades: $scope.auditoria.responsabilidades,
                        eq_auditorar: angular.toJson(cedulas),
                        eq_auditado: $scope.auditoria.auditado[0].cedula,
                        user_elaboracion: sessionStorage.getItem('cedula'),
                        observacion: $scope.auditoria.observaciones,
                        adjunto: $scope.auditoria.adjunto,
                        fecha: $scope.formatDate(fecha, 0)
                    }
                }).then(function (response) {
                    console.log(response.data);
                    if (response.data.codigo == 0) {
                        swal.close();
                        $scope.closeThisDialog(response.data);
                    } else {
                        swal.close();
                        swal('Mensaje', response.data.mensaje, 'warning');
                    };
                });
            }
        } else {
            swal.close();
            swal('Campos vacios', 'Por favor, llenar todos los campos obligatorios *', 'warning');
        }
    }
    $scope.desactivar_auditoria = function (numero) {
        swal({
            title: 'Confirmar Proceso',
            text: "¿Desea eliminar la auditoria #" + numero + " ?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then(function (result) {
            if (result) {
                $http({
                    method: 'POST',
                    url: "php/intranet/programa_auditoria.php",
                    data: {
                        function: 'desactivar_auditoria',
                        codigo: numero
                    }
                }).then(function (response) {
                    if (response.data.codigo == 0) {
                        $scope.closeThisDialog(response.data);
                    } else {
                        swal('Mensaje', response.data.mensaje, 'warning');
                    };
                });
            } else {
                swal('Mensaje', 'No se desactivo la auditoria', 'warning');
            };
        }).catch(swal.noop);
    }
    $scope.IdentList = function (description) {
        var str = description;
        var newStr = "";
        var temp = "";
        var bo = true;
        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) == '-' && bo == true) {
                temp = '<li>';
                bo = false;
            } else if (str.charAt(i) == '.' && bo == false) {
                temp = '.</li>';
                bo = true;
            } else {
                temp = str.charAt(i)
            }
            newStr += temp;
        }
        return newStr;
    }
    $scope.formatDate = function (date, tipo) {
        if (tipo == 7) {
            var temp = new Date(date.substring(0, 1));
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
    if ($scope.tipo == false) {
        $scope.datos = { vista: null };
        $scope.titulo = "";
        $scope.cambiarVista($scope.tipoVista, $scope.id_detalles);
    }
    $scope.abrir_ruta_ftp = function (ruta) {
        if (ruta != "" && ruta != null && ruta != undefined && ruta.length > 10) {
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
        } else {
            swal('Url no válida', 'No se encontró ningún archivo', 'warning');
        }
    }
    // New
    $scope.filtro = { resultados: false, resultados_aud: false };
    $scope.listar_resultado = new Array();
    $scope.listar_resultado_aud = new Array();
    $scope.search_user = function (user_name, vrespuesta, vista) {
        if (user_name != undefined && user_name != null && user_name != "") {
            $scope[vrespuesta] = new Array();
            if (user_name.indexOf(".") > 0 || Number.isInteger(parseInt(user_name))) {
                $http({
                    method: 'POST',
                    url: "php/tic/paneladmin/paneladmin.php",
                    data: {
                        function: 'getModuloUser',
                        user: user_name
                    }
                }).then(function (response) {
                    if (response.data[0].Codigo == 404) {
                        swal('Advertencia', 'El usuario no esta registrado', 'warning');
                        $scope[vrespuesta] = [];
                        $scope.filtro[vista] = false;
                    } else {
                        $scope[vrespuesta] = [{ cedula: response.data[0].CEDULA, nombre: response.data[0].USUARIO, cargo: "ROL(" + response.data[0].CODIGO + ")" }];
                        $scope.filtro[vista] = true;
                    }
                });
            } else {
                acasHttp.mostrarUsuario(user_name).then(function (response) {
                    if (response.data != undefined && response.data != null && response.data != "" && Array.isArray(response.data) && response.data.length > 0) {
                        $scope[vrespuesta] = response.data;
                        $scope.filtro[vista] = true;
                    } else {
                        swal("Advertencia", "No hubo coincidencias(" + user_name + ")", "warning");
                        $scope[vrespuesta] = [];
                        $scope.filtro[vista] = false;
                    }
                })
            }
        } else {
            swal("Advertencia", "No puede ser vacio el parametro de busqueda", "warning");
        }
    }
    $scope.agregar_usuario = function (user, vlistado, vista) {
        if (user != undefined && $scope.auditoria[vlistado] != undefined && $scope.filtro[vista] != undefined) {
            if (vlistado != "auditado") {
                let i = $scope.auditoria[vlistado].findIndex(elemt => elemt.cedula == user.cedula);
                if (i == -1) {
                    $scope.auditoria[vlistado].push(user);
                } else {
                    swal("Advertencia", "El usuario ya se encuentra agregado", "warning");
                }
            } else {
                if ($scope.auditoria[vlistado].length < 1) {
                    let i = $scope.auditoria[vlistado].findIndex(elemt => elemt.cedula == user.cedula);
                    if (i == -1) {
                        $scope.auditoria[vlistado].push(user);
                    } else {
                        swal("Advertencia", "El usuario ya se encuentra agregado", "warning");
                    }
                } else {
                    swal("Advertencia", "Solo se puede agregar un auditado", "warning");
                }
            }
        } else {
            swal("Advertencia", "Error agregando el usuario", "warning");
        }
        $scope.filtro[vista] = false;
    }
    $scope.borrar_usuario = function (user, vlistado) {
        if (user != undefined && $scope.auditoria[vlistado] != undefined) {
            let i = $scope.auditoria[vlistado].findIndex(elemt => elemt.cedula == user.cedula);
            if (i != -1) {
                $scope.auditoria[vlistado].splice(i, 1);
            }
        } else {
            swal("Advertencia", "Error borrando el usuario", "warning");
        }
    }
}]);