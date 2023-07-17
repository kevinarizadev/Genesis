'use strict';
angular.module('GenesisApp').controller('modal_gestion_medicamentos_controller', ['$scope', '$http', function ($scope, $http) {
    $scope.datos = { vista: $scope.vista, autorizacion: $scope.datos, fecha_entrega: new Date(), soportes_cargados: new Array() };
    $scope.input_data_default = { archivo_soporte: "", validate: [{ size: 3, ext: ".pdf" }] };
    $scope.listar_soportes = function () {
        $http({
            method: 'POST',
            url: "php/autorizaciones/medicamentos/gestion_medicamentos.php",
            data: {
                function: "ver_soportes_cargados",
                ubicacion: $scope.datos.autorizacion.cabeza.UBI_OASIS,
                numero: $scope.datos.autorizacion.cabeza.NUM_OASIS
            }
        }).then(function (response) {
            if (validar_json(angular.toJson(response.data)) && response.data.codigo != 1) {
                $scope.datos.soportes_cargados = response.data;
            } else {
                $scope.datos.soportes_cargados = new Array();
            }
        });
    }
    $scope.celular = "";
    $scope.correo = "";
    $scope.actualizar_datos = function () {
        $scope.celular = "";
        $scope.correo = "";
        swal({
            title: 'Recuerda!',
            type: 'info',
            html: '<span>Actualizar los datos de contacto del <strong>afiliado</strong></span>' +
                '<div style="width: 79%;margin: auto;margin-top: 15px;font-weight: bold;text-align: left;">' +
                '<div>' +
                '<label for="celular">Celular *</label>' +
                '<input type="number" id="celular" value="' + $scope.datos.autorizacion.cabeza.CONTACTO + '" style="height: 2rem;" maxlength="10" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">' +
                '</div>' +
                '<div>' +
                '<label for="correo" class="">Correo</label>' +
                '<input type="email" id="correo" value="' + $scope.datos.autorizacion.cabeza.EMAIL + '" style="height: 2rem;">' +
                '</div>' +
                '<small>Se identifica que durante los últimos 15 días, no se evidencia una actualización de los datos complementarios</small>' +
                '</div>',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Actualizar',
            allowEscapeKey: false,
            allowOutsideClick: false,
            preConfirm: function () {
                return new Promise(function (resolve) {
                    resolve([
                        $('#celular').val(),
                        $('#correo').val()
                    ])
                })
            }
        }).then(function (result) {
            console.log(result[0], $scope.datos.autorizacion.cabeza.CONTACTO, result[1], $scope.datos.autorizacion.cabeza.EMAIL);
            if (result[0] != "") {
                if (result[0] != $scope.datos.autorizacion.cabeza.CONTACTO || result[1] != $scope.datos.autorizacion.cabeza.EMAIL) {
                    var numero = [300, 301, 302, 303, 304, 305, 306, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 350, 351].findIndex(elemt => elemt == (result[0].substring(0, 3)));
                    var expresion = /^3[\d]{9}$/;
                    if (isNaN(result[0]) || !expresion.test(result[0]) || numero == -1) {
                        swal({
                            title: "Advertencia!",
                            text: "Ingrese un numero celular valido",
                            type: "warning",
                            showConfirmButton: false
                        });
                        setTimeout(() => {
                            $scope.actualizar_datos();
                        }, 3000);
                    } else {
                        if (result[1] != "") {
                            if ((/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(result[1])) {
                                $scope.celular = result[0];
                                $scope.datos.autorizacion.cabeza.CONTACTO = result[0];
                                $scope.correo = result[1];
                                $scope.datos.autorizacion.cabeza.EMAIL = result[1];
                                $scope.$apply();
                                // swal({
                                //     title: "Completado",
                                //     text: "Los datos de contacto seran actualizados despues de presionar el boton GUARDAR ENTREGA DE SOPORTE",
                                //     type: "success"
                                // });
                            } else {
                                swal({
                                    title: "Advertencia!",
                                    text: "Ingrese un correo valido",
                                    type: "warning",
                                    showConfirmButton: false
                                });
                                setTimeout(() => {
                                    $scope.actualizar_datos();
                                }, 3000);
                            }
                        } else {
                            $scope.celular = result[0];
                            $scope.datos.autorizacion.cabeza.CONTACTO = result[0];
                            $scope.correo = result[1];
                            $scope.datos.autorizacion.cabeza.EMAIL = result[1];
                            $scope.$apply();
                        }
                    }
                }
            } else {
                swal({
                    title: "Advertencia!",
                    text: "Es obligatorio ingresar el celular del Afiliado",
                    type: "warning",
                    showConfirmButton: false
                });
                setTimeout(() => {
                    $scope.actualizar_datos();
                }, 3000);
            }
        }).catch(swal.noop);
    }
    switch ($scope.vista) {
        case 1:
            $scope.titulo = "Detalle de la Autorizacion - " + $scope.datos.autorizacion.cabeza.NUMERO;
            break;
        case 2:
            $scope.titulo = "Detalle de la Autorizacion - " + $scope.datos.autorizacion.cabeza.NUMERO;
            break;
        case 3:
            $scope.titulo = "Cargar Soportes de la Autorizacion - " + $scope.datos.autorizacion.cabeza.NUMERO;
            $scope.listar_soportes();
            if ($scope.datos.autorizacion.cabeza.ACTUALIZAR == "S") {
                $scope.actualizar_datos();
            }
            break;
        case 4:
            $scope.titulo = "Ver Soportes de la Autorizacion - " + $scope.datos.autorizacion.cabeza.NUMERO;
            $scope.listar_soportes();
            break;
        case 5:
            $scope.titulo = "Tranferir IPS de la Autorizacion - " + $scope.autorizacion.datos.cabeza.NUMERO;
            break;
        default:
            $scope.closeThisDialog("1");
            break;
    }
    $scope.modalClose = function (value = 1) {
        $scope.closeThisDialog(value);
    }
    $scope.select_all = false;
    $scope.checkboxAllSelect = function (value) {
        if (value) {
            $scope.datos.autorizacion.detalle.forEach(function (productos, index) {
                if (productos.CANTIDAD != productos.CANTIDAD_ENTREGADAS) {
                    var cant = Number(productos.CANTIDAD) - Number(productos.CANTIDAD_ENTREGADAS);
                    $scope.especificar_cantidad_medicamento($scope.datos.autorizacion,productos,index,cant);
                    $scope.input_cant[index] = cant;
                }
            });
        } else {
            $scope.datos.autorizacion.detalle.forEach(function (productos, index) {
                if (productos.CANTIDAD != productos.CANTIDAD_ENTREGADAS) {
                    $scope.especificar_cantidad_medicamento($scope.datos.autorizacion,productos,index,0);
                }
            });
        }
    }
    $scope.input_cant = {};
    $scope.producto_entrega = new Array();
    $scope.especificar_cantidad_medicamento = function (datos_aut, producto, index, cantidad) {
        if (datos_aut.cabeza.NUM_OASIS != "" && datos_aut.cabeza.UBI_OASIS != "") {
            if (producto.CODIGO != "") {
                if (cantidad <= Number(producto.CANTIDAD)) {
                    if (cantidad != undefined && cantidad != null && cantidad != "" && cantidad != 0) {
                        var i = $scope.producto_entrega.findIndex(elemt => elemt.codigo == producto.CODIGO);
                        if (i == -1) {
                            $scope.producto_entrega.push({ codigo: producto.CODIGO, cantidad_entrega: cantidad, cantidad: producto.CANTIDAD });
                        } else {
                            $scope.producto_entrega[i] = { codigo: producto.CODIGO, cantidad_entrega: cantidad, cantidad: producto.CANTIDAD };
                        }
                    } else {
                        if (producto.CODIGO != undefined) {
                            var i = $scope.producto_entrega.findIndex(elemt => elemt.codigo == producto.CODIGO);
                            if (i != -1) {
                                $scope.producto_entrega.splice(i, 1);
                            }
                        }
                        $scope.input_cant[index] = 0;
                        document.querySelector("#input_cant" + index).value = 0;
                    }
                } else {
                    $scope.input_cant[index] = 0;
                    document.querySelector("#input_cant" + index).value = 0;
                }

            } else {
                swal("Error", "El producto no tiene codigo valido", "error");
            }
        } else {
            swal("Error", "La autorizacion puede tener datos vacios como Codigo Autorizacion o Ubicacion Autorizacion", "error");
        }
    }
    $scope.camara = false;
    $scope.capturar_foto = function () {
        $scope.scanner_2 = new Instascan.Scanner({ video: document.getElementById('vista_camara_2') });
        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                $scope.camara = true;
                $scope.scanner_2.start(cameras[0]);
            } else {
                $scope.camara = false;
                swal("Error", "Conecte una camara", "error");
            }
            $scope.$apply();
        }).catch(function (e) {
            console.log(e);
            $scope.camara = false;
            $scope.scanner_2.stop();
            swal("Error", "No se encontro una camara", "error");
            $scope.$apply();
        });
    }
    $scope.cerrar_modal = function () {
        setTimeout(() => {
            $scope.camara = false;
            $scope.scanner_2.stop();
            $scope.$apply(); 
        }, 100);
    }
    // $scope.capturarimagen1 = function () {
    //     //Pausar reproducción
    //     video.pause();
    //     //Obtener contexto del canvas y dibujar sobre él
    //     var contexto = $canvas.getContext("2d");
    //     $canvas.width = $video.videoWidth;
    //     $canvas.height = $video.videoHeight;
    //     contexto.drawImage($video, 0, 0, $canvas.width, $canvas.height);
    //     var foto = $canvas.toDataURL(); //Esta es la foto, en base 64
    //     var $img = $("<img/>");
    //     $("#scream").attr("src", foto);
    //     var img45 = document.getElementById("scream");
    // };
    $scope.foto = "";
    $scope.capturar_imagen = function () {
        const video = document.getElementById('vista_camara_2');
        const canvas = document.getElementById('canvas');
        //Pausar reproducción
        video.pause();
        //Obtener contexto del canvas y dibujar sobre él
        var context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        $scope.foto = canvas.toDataURL(); //Esta es la foto, en base 64
        $("#scream").attr("src", $scope.foto);
        var img45 = document.getElementById("scream");
        $scope.cerrar_modal();
    }
    $scope.borrar_img = function () {
        $("#scream").attr("src", "");
        $scope.foto = "";
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
                } else if (ext[ext.length - 1].toUpperCase() == "JPG" || ext[ext.length - 1].toUpperCase() == "PNG") {
                    return "icon-file-image orange-text";
                } else {
                    return "icon-attention-alt";
                }
            } else {
                return "icon-help";
            }
        }
    }
    $scope.CurrentDate = new Date();
    $scope.guardar_soportes = function (datos_aut) {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        // console.log(datos_aut, $scope.producto_entrega);
        // Validar si esta vacion o no el input
        if ($scope.producto_entrega.length > 0) {
            if (($scope.input_data_default.archivo_soporte.files != undefined && $scope.input_data_default.archivo_soporte.files != null && $scope.input_data_default.archivo_soporte.files.length > 0) || ($scope.foto != undefined && $scope.foto != null && $scope.foto != "")) {
                var temp = document.querySelector("#datos_fecha_entrega");
                if (temp != undefined && new Date(temp.valueAsDate.getFullYear(), temp.valueAsDate.getMonth(), (temp.valueAsDate.getDate() + 1)).getTime() >= new Date(temp.min.split("-")[0], (temp.min.split("-")[1] - 1), temp.min.split("-")[2]).getTime() && new Date(temp.valueAsDate.getFullYear(), temp.valueAsDate.getMonth(), (temp.valueAsDate.getDate() + 1)).getTime() <= new Date($scope.CurrentDate.getFullYear(), $scope.CurrentDate.getMonth(), $scope.CurrentDate.getDate()).getTime()) {
                    if ($scope.foto == "") {
                        $scope.obtener_base_64($scope.input_data_default.archivo_soporte.files).then(function (base64) {
                            var extencion = $scope.input_data_default.archivo_soporte.files[0].name.split(".");
                            $scope.obtener_url_ftp(base64, $scope.input_data_default.archivo_soporte.files[0].name, extencion[extencion.length - 1], "Medicamentos").then(function (url_ftp) {
                                $http({
                                    method: 'POST',
                                    url: "php/autorizaciones/medicamentos/gestion_medicamentos.php",
                                    data: {
                                        function: "insertar_soporte_medicamento",
                                        productos: angular.toJson($scope.producto_entrega),
                                        producto_length: $scope.producto_entrega.length,
                                        fecha_entrega: $scope.formatDate(document.querySelector("#datos_fecha_entrega").value),
                                        ubicacion: datos_aut.cabeza.UBI_OASIS,
                                        numero_autorizacion: datos_aut.cabeza.NUM_OASIS,
                                        responsable: Number(sessionStorage.getItem('cedula')),
                                        url_soporte: url_ftp,
                                        tipo_doc_afi: datos_aut.cabeza.TIPO_DOC,
                                        documento_afi: datos_aut.cabeza.DOCUMENTO,
                                        correo: datos_aut.cabeza.EMAIL,
                                        contacto: datos_aut.cabeza.CONTACTO,
                                        nit: sessionStorage.getItem('nit')
                                    }
                                }).then(function (response) {
                                    swal.close();
                                    if (validar_json(angular.toJson(response.data)) && response.data.codigo != 1) {
                                        $scope.modalClose(response.data);
                                    } else {
                                        swal('Error', response.data.mensaje, 'error');
                                    }
                                });
                                swal.close();
                            }).catch(reason_ftp => {
                                swal.close();
                                swal('Mensaje', 'No se pudo subir el archivo al servidor ftp: ' + reason_ftp, 'error');
                            });
                        }).catch(reason_b64 => {
                            swal.close();
                            swal('Mensaje', 'No se pudo obtener el base64 del archivo: ' + reason_b64, 'error');
                        });
                    } else {
                        $scope.obtener_url_ftp($scope.foto, sessionStorage.getItem('cedula'), "jpg", "Medicamentos").then(function (url_ftp) {
                            $http({
                                method: 'POST',
                                url: "php/autorizaciones/medicamentos/gestion_medicamentos.php",
                                data: {
                                    function: "insertar_soporte_medicamento",
                                    productos: angular.toJson($scope.producto_entrega),
                                    producto_length: $scope.producto_entrega.length,
                                    fecha_entrega: $scope.formatDate(document.querySelector("#datos_fecha_entrega").value),
                                    ubicacion: datos_aut.cabeza.UBI_OASIS,
                                    numero_autorizacion: datos_aut.cabeza.NUM_OASIS,
                                    responsable: Number(sessionStorage.getItem('cedula')),
                                    url_soporte: url_ftp,
                                    tipo_doc_afi: datos_aut.cabeza.TIPO_DOC,
                                    documento_afi: datos_aut.cabeza.DOCUMENTO,
                                    correo: datos_aut.cabeza.EMAIL,
                                    contacto: datos_aut.cabeza.CONTACTO,
                                    nit: sessionStorage.getItem('nit')
                                }
                            }).then(function (response) {
                                swal.close();
                                if (validar_json(angular.toJson(response.data)) && response.data.codigo != 1) {
                                    $scope.modalClose(response.data);
                                } else {
                                    swal('Error', response.data.mensaje, 'error');
                                }
                            });
                            swal.close();
                        }).catch(reason_ftp => {
                            swal.close();
                            swal('Mensaje', 'No se pudo subir la imagen al servidor ftp: ' + reason_ftp, 'error');
                        });
                    }
                } else {
                    var a = ($scope.datos.autorizacion.datos.fecha_entrega != "" && $scope.datos.autorizacion.datos.fecha_entrega != null);
                    swal('Mensaje', 'Ingrese una fecha valida (mayor o igual a ' + (a ? $scope.datos.autorizacion.datos.fecha_entrega : $scope.datos.autorizacion.cabeza.FECHA_AUTORIZACION) + ' y menor o igual que el dia de hoy)', 'error');
                }
            } else {
                swal.close();
                swal('Mensaje', 'El archivo no se ha seleccionado', 'error');
            }
        } else {
            swal.close();
            swal('Advertencia', 'Especifique la Cantidad de Entregada de cada medicamento', 'warning');
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
    $scope.formatDate = function (date) {
        var dia = date.split("-")[2];
        var mes = date.split("-")[1];
        var año = date.split("-")[0];
        return año + '/' + mes + '/' + dia;
    }
    $scope.validar_fecha = function (date, tipo) {
        if (date != undefined && tipo != undefined && date != "" && tipo != "" && date != null && tipo != null) {
            if (tipo == 1) {
                // Fecha de base de datos(dia/mes/año) a input
                if ($scope.datos.autorizacion.datos.fecha_entrega == "" || $scope.datos.autorizacion.datos.fecha_entrega == null) {
                    return date.split("/").reverse().join("-");
                } else {
                    return $scope.datos.autorizacion.datos.fecha_entrega.split("/").reverse().join("-");
                }
            } else if (tipo == 2) {
                var dia = date.getDate();
                var mes = date.getMonth() + 1;
                var año = date.getFullYear();
                return año + '/' + ((mes < 10) ? ('0' + mes) : mes) + '/' + ((dia < 10) ? ('0' + dia) : dia);
            } else if (tipo == 3) {
                // Fecha actual
                date = new Date();
                var dia = date.getDate();
                var mes = date.getMonth() + 1;
                var año = date.getFullYear();
                return año + '-' + ((mes < 10) ? ('0' + mes) : mes) + '-' + ((dia < 10) ? ('0' + dia) : dia);
            }
        }
    }
    $scope.limpiar_input_ng_file = function (id) {
        if (id != undefined && id != null && id != "" && document.querySelector("#" + id) != undefined) {
            var input = document.querySelector("#" + id);
            $scope.input_data_default[id] = "";
            input.value = "";
            input.parentElement.dataset.file = input.dataset.name_default;
        } else {
            console.log("Error con el input file id:" + id);
        }
    }
    // Funcion que recibe el id del input file para limpiar sus valores.
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
}]);