'use strict';
angular.module('GenesisApp')
    .controller('adminprocesosController', ['$scope', '$http', 'ngDialog', '$timeout', '$q', 'upload', '$controller', '$rootScope', '$window',
        function ($scope, $http, ngDialog, $timeout, $q, $controller, $rootScope, $window) {
            $scope.panel = { titulo: '', id: '', level: null, btn: null, edit: false, archivos: [], file: {}, name: "", ext: "" };

            $scope.switch = false;
            $scope.file_file = "";
            $scope.admin = false;
            $scope.configurar = false;
            $scope.macroprocesos_edit = "";
            $.getJSON("php/obtenersession.php", { prov: 'navb' }).done(function (respuesta) {
                if (respuesta.rolcod == "0") {
                    $scope.admin = true;
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log("Error obteniendo variables de session");
            });
            $scope.btn_configurar = function () {
                $scope.configurar = !$scope.configurar;
                if ($scope.configurar && typeof $scope.macroprocesos === 'object') {
                    $scope.macroprocesos_edit = angular.toJson($scope.macroprocesos);
                }
            }
            $scope.modificar_procesos = function (string) {
                if (typeof string === "string") {
                    $scope.macroprocesos = JSON.parse(string);
                }
            }
            $scope.getJson = function () {
                $http({
                    method: 'POST',
                    url: "php/intranet/intranet_procesos.php",
                    data: {
                        function: 'getJson'
                    }
                }).then(function (response) {
                    $scope.macroprocesos = response.data.procesos;
                    // for (const i in $scope.macroprocesos) {
                    //     if ($scope.macroprocesos.hasOwnProperty(i)) {
                    //         $scope.macroprocesos[i].icono = $scope.iconos[i].icono;
                    //         for (const j in $scope.macroprocesos[i].opciones) {
                    //             if ($scope.macroprocesos[i].opciones.hasOwnProperty(j)) {
                    //                 $scope.macroprocesos[i].opciones[j].icono = $scope.iconos[i].opciones[j].icono;
                    //             }
                    //         }
                    //     }
                    // }
                    $scope.cloneHeadFixed();
                });
            }
            $scope.getJson();
            $scope.seeProcesses = function (proceso, titulo, id) {
                $scope.procesoSelect = proceso;
                $scope.panel.titulo = titulo;
                $scope.panel.id = id;
                $scope.cloneHeadFixed();
                $scope.panel.level = null;
                $scope.switch_tipo = [];
                $scope.panel.add = null;
            }
            $scope.seeFiles = function (indice, documentos, formatos, value) {
                $scope.panel.level = ($scope.panel.level != indice) ? indice : null;
                if ($scope.panel.level != null) {
                    $scope.switch_tipo = (value) ? formatos : documentos;
                }
            }
            $scope.changeType = function (value, documentos, formatos) {
                $scope.switch_tipo = (value) ? formatos : documentos;
            }
            $scope.fileToBase64 = function (filesSelected, name, ext, macro_id, proce_id, tipo, id) {
                if (filesSelected.length > 0) {
                    var fileToLoad = filesSelected[0];
                    var fileReader = new FileReader();
                    fileReader.onload = function (fileLoadedEvent) {
                        var array = { base64: fileLoadedEvent.target.result, name: $scope.url_auto(name, macro_id, proce_id, tipo), ext: ext, macro: macro_id, proce: proce_id, tipo: tipo, id: id };
                        $scope.panel.archivos.push(array);
                    };
                    fileReader.readAsDataURL(fileToLoad);
                }
            }
            $scope.url_auto = function (texto, macro_id, proce_id, tipo) {
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
                url = url.replace(/.ppt/gi, "");
                url = url.replace(/.pptx/gi, "");
                return macro_id + "_" + proce_id + "_" + tipo + "_" + url.replace(/\s/g, "_").toLowerCase();
            }
            $scope.addProcesses = function (index, add = false, name = '', type = '', stade = '', titulo = '') {
                $scope.panel.add = ($scope.panel.add != index) ? index : null;
                if (add) {
                    if ($scope.panel.file != "" && name != "" && stade != "" && type != "") {
                        for (const i in $scope.macroprocesos[$scope.panel.id].opciones) {
                            if ($scope.macroprocesos[$scope.panel.id].opciones.hasOwnProperty(i)) {
                                if ($scope.macroprocesos[$scope.panel.id].opciones[i].id == index) {
                                    $scope.fileToBase64($scope.panel.file[0].files, $scope.panel.name, $scope.panel.ext, $scope.panel.id, index, type, $scope.macroprocesos[$scope.panel.id].opciones[index][type].length);
                                    $scope.macroprocesos[$scope.panel.id].opciones[i][type].push({ "titulo": name.toUpperCase(), "url": $scope.panel.name, "estado": stade, "id": $scope.macroprocesos[$scope.panel.id].opciones[i][type].length });
                                }
                            }
                        }
                        // swal('Completado', 'Agregado en el proceso de ' + titulo + ' (' + type + ')', 'success');
                    } else {
                        swal('Información', 'Debe llenar todos los campos para agregar en ' + titulo, 'info');
                    }
                }
                $scope.panel.name = "";
                $scope.panel.ext = "";
                $scope.panel.file = "";
                $('input[type="file"]').val("");
            }
            $scope.icono = function (url) {
                if (url != undefined && url != null) {
                    var ext;
                    if (url.indexOf(".") > 0) {
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
                } else {
                    return "icon-help";
                }
            }
            $scope.changeStade = function (padre_id, id, tipo) {
                $scope.type = (tipo) ? "formatos" : "documentos";
                for (const i in $scope.macroprocesos[$scope.panel.id].opciones[padre_id][$scope.type]) {
                    if ($scope.macroprocesos[$scope.panel.id].opciones[padre_id][$scope.type].hasOwnProperty(i)) {
                        if ($scope.macroprocesos[$scope.panel.id].opciones[padre_id][$scope.type][i].id == id) {
                            $scope.macroprocesos[$scope.panel.id].opciones[padre_id][$scope.type][i].estado = ($scope.macroprocesos[$scope.panel.id].opciones[padre_id][$scope.type][i].estado == "Publicar") ? "Revisar" : ($scope.macroprocesos[$scope.panel.id].opciones[padre_id][$scope.type][i].estado == "Revisar") ? "No Publicar" : "Publicar";
                        }
                    }
                }
            }
            $scope.estadoChange = function (value) {
                if (value == "Publicar") {
                    return { "background": "#56b949" };
                } else if (value == "Revisar") {
                    return { "background": "#f0a42f" };
                } else {
                    return { "background": "#ee4035" };
                }
            }
            $scope.editProcesses = function (caso, index, titulo, estado, url, tipo) {
                if (caso) {
                    $scope.panel.edit = true;
                    $scope.id_edit = index;
                    $scope.name_edit = titulo;
                    $scope.stade_edit = estado;
                    $scope.url_edit = url;
                    $scope.panel.name = "";
                    $scope.panel.ext = "";
                    $scope.panel.file = "";
                    $('input[type="file"]').val("");
                } else {
                    if (titulo != "" && estado != "") {
                        $scope.type = (tipo) ? "formatos" : "documentos";
                        if ($scope.panel.file != "") {
                            $scope.fileToBase64($scope.panel.file[0].files, $scope.panel.name, $scope.panel.ext, $scope.panel.id, index, $scope.type, $scope.id_edit);
                        }
                        for (const i in $scope.macroprocesos[$scope.panel.id].opciones) {
                            if ($scope.macroprocesos[$scope.panel.id].opciones.hasOwnProperty(i)) {
                                if ($scope.macroprocesos[$scope.panel.id].opciones[i].id == index) {
                                    $scope.macroprocesos[$scope.panel.id].opciones[i][$scope.type][$scope.id_edit] = { "titulo": titulo.toUpperCase(), "url": $scope.url_edit, "estado": estado, "id": $scope.id_edit };
                                }
                            }
                        }
                        $scope.panel.edit = false;
                        swal('Completado', '', 'success');
                    } else {
                        swal('Información', 'Debe llenar todos los campos para editar', 'info');
                    }
                }

            }
            $scope.deleteProcesses = function (padre_id, id, tipo) {
                $scope.type = (tipo) ? "formatos" : "documentos";
                for (const i in $scope.macroprocesos[$scope.panel.id].opciones[padre_id][$scope.type]) {
                    if ($scope.macroprocesos[$scope.panel.id].opciones[padre_id][$scope.type].hasOwnProperty(i)) {
                        if ($scope.macroprocesos[$scope.panel.id].opciones[padre_id][$scope.type][i].id == id) {
                            $scope.macroprocesos[$scope.panel.id].opciones[padre_id][$scope.type].splice(i, 1);
                        }
                    }
                }
                for (const j in $scope.macroprocesos[$scope.panel.id].opciones[padre_id][$scope.type]) {
                    if ($scope.macroprocesos[$scope.panel.id].opciones[padre_id][$scope.type].hasOwnProperty(j)) {
                        $scope.macroprocesos[$scope.panel.id].opciones[padre_id][$scope.type][j].id = j;
                    }
                }
                if ($scope.panel.archivos.length > 0) {
                    for (const k in $scope.panel.archivos) {
                        if ($scope.panel.archivos.hasOwnProperty(k)) {
                            const element = $scope.panel.archivos[k];
                            if ($scope.panel.archivos[k].id == id) {
                                $scope.panel.archivos.splice(k, 1);
                            }
                        }
                    }
                }
            }
            $scope.getRutaTemp = function (ruta) {
                $http({
                    method: 'POST',
                    //url: "php/juridica/tutelas/functutelas.php",
                    url: "php/intranet/intranet_procesos.php",
                    data: {
                        function: 'descargaAdjunto_sgc',
                        ruta: ruta
                    }
                }).then(function (response) {
                    window.open("temp/" + response.data);
                });
            }
            $scope.show = function () {
                console.log($scope.panel.archivos);
                console.log($scope.macroprocesos[$scope.panel.id]);
            }
            $scope.BtnGuardar = function () {
                if ($scope.panel.archivos.length == 0) {
                    $http({
                        method: 'POST',
                        url: "php/intranet/intranet_procesos.php",
                        data: {
                            function: 'updateJson',
                            json: JSON.stringify({ procesos: angular.copy($scope.macroprocesos) })
                        }
                    }).then(function (response) {
                        if (response.data.Codigo == "0") {
                            swal("Completado", response.data.Nombre, "success");
                        } else {
                            swal("Error", "Guardando los cambios: " + JSON.stringify(response.data), "error");
                        }

                    });

                } else if ($scope.panel.archivos.length > 0) {
                    // $http({
                    //     method: 'POST',
                    //     url: "php/intranet/intranet_procesos.php",
                    //     data: {
                    //         function: 'JsonFilesUrls',
                    //         PDFs: JSON.stringify($scope.panel.archivos)
                    //     }
                    // }).then(function (response) {
                    //     $scope.urls = response.data;
                    //     if ($scope.urls.length > 0 && $scope.urls.isArray()) {
                    //         for (const i in $scope.urls) {
                    //             if ($scope.urls.hasOwnProperty(i)) {
                    //                 const element = $scope.urls[i];
                    //                 for (const i in $scope.macroprocesos[element.macro].opciones[element.proce][element.tipo]) {
                    //                     if ($scope.macroprocesos[element.macro].opciones[element.proce][element.tipo].hasOwnProperty(i)) {
                    //                         if ($scope.macroprocesos[element.macro].opciones[element.proce][element.tipo][i].id == element.id) {
                    //                             $scope.macroprocesos[element.macro].opciones[element.proce][element.tipo][i].url = element.url;
                    //                         }
                    //                     }
                    //                 }
                    //             }
                    //         }
                    //         $scope.panel.archivos = [];
                    //         $scope.BtnGuardar();
                    //     } else {
                    //         swal('Advertencia', 'Los archivos no se subieron correctamente al FTP', 'warning');
                    //     }
                    // });
                    for (const i in $scope.panel.archivos) {
                        if ($scope.panel.archivos.hasOwnProperty(i)) {
                            $scope.respuestaUrl($scope.panel.archivos[i], i, $scope.panel.archivos.length);
                        }
                    }
                }
            }
            $scope.respuestaUrl = function (element, i, length) {
                $http({
                    method: 'POST',
                    url: "php/intranet/intranet_procesos.php",
                    data: {
                        function: 'JsonFileUrl_sgc',
                        file: JSON.stringify(element)
                    }
                }).then(function (response) {
                    element.url = response.data.url;
                    $scope.res = response.data.url;
                    for (const i in $scope.macroprocesos[element.macro].opciones[element.proce][element.tipo]) {
                        if ($scope.macroprocesos[element.macro].opciones[element.proce][element.tipo].hasOwnProperty(i)) {
                            if ($scope.macroprocesos[element.macro].opciones[element.proce][element.tipo][i].id == element.id) {
                                $scope.macroprocesos[element.macro].opciones[element.proce][element.tipo][i].url = $scope.res;
                            }
                        }
                    }
                    if ((length - 1) == i) {
                        $scope.panel.archivos = [];
                        $scope.BtnGuardar();
                    }
                });
            }
            $scope.cloneHeadFixed = function () {
                setTimeout(() => {
                    var original = $('#tablaOriginal>thead');
                    var clone = $('#tablaOriginal>thead').clone();
                    var list = original[0].children[0].children;
                    for (var i = 0; i < list.length; i++) {
                        clone[0].children[0].children[i].style.width = list[i].offsetWidth + "px";
                    }
                    $('#tablaClone').html(clone).css("width", original[0].parentElement.offsetWidth + "px");;
                }, 150);
            }
            $(".scroll_x").on("scroll", function () {
                $(".scroll_x").scrollLeft($(this).scrollLeft());
            });
            $(window).resize(function () {
                $scope.cloneHeadFixed();
            });
            $scope.loadFile = function () {
                console.log('Consola');
                $scope.panel.name = $scope.panel.file[0].files[0].name;
                var extencion = $scope.panel.file[0].files[0].name.split(".");
                $scope.panel.ext = extencion[extencion.length - 1];

            }
        }]).directive("selectNgFile1", function () {
            return {
                require: "ngModel",
                link: function postLink($scope, elem, attrs, ngModel) {
                    $scope.panel.name = "";
                    $scope.panel.ext = "";
                    $scope.panel.file = "";
                    elem.on("change", function (e) {
                        var files = elem[0].files;
                        var clear = false;
                        if ($(this)["0"].files.length > 0) {
                            if (files && (this.files[0].type == "application/pdf" 
                                || this.files[0].type == "application/msword" 
                                || this.files[0].type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                                || this.files[0].type == "application/vnd.ms-excel" 
                                || this.files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                                || this.files[0].type == "application/vnd.openxmlformats-officedocument.presentationml.presentation" 
                                || this.files[0].type == "application/vnd.ms-powerpoint"
                                )) {
                                if (this.files[0].size > 20000320) {
                                    swal('Advertencia', 'El archivo excede el peso limite (20 MB)', 'warning');
                                    clear = true;
                                } else {
                                    $scope.panel.file = elem;
                                    ngModel.$setViewValue(files);
                                }
                            } else {
                                swal('Advertencia', 'El archivo no es un formato valido (PDF, Point, Excel, Word)', 'warning');
                                clear = true;
                            }
                        } else {
                            clear = true;
                        }
                        if (clear) {
                            $scope.panel.name = "";
                            $scope.panel.ext = "";
                            $scope.panel.file = "";
                            $(this).val("");
                        }
                        $scope.$apply();
                    })
                }
            }
        });