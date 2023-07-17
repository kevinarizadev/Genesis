'use strict';
angular.module('GenesisApp')
    .controller('validacionprecontractualController', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$rootScope',
        function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $rootScope) {

            $scope.lista_errores = [];
            $scope.hoy = new Date();

            //buscar por ips, unicaicon o prestado
            $scope.buscar = function () {

                if (
                    ($scope.busqueda.numero == null) &&
                    ($scope.busqueda.prestador == "")
                ) {
                    swal('Información', "Por lo menos digitar un campo de busqueda valido", 'info');
                    $scope.ListarResultado = "";
                    $scope.inactivecontratos = true;

                } else {
                    if (($scope.busqueda.estado == "") || ($scope.busqueda.regimen == "")) {
                        swal('Información', "El campo Estado y Regimen Debe ser Obligatorio", 'info');
                        $scope.ListarResultado = "";
                        $scope.inactivecontratos = true;
                    } else {
                        swal({
                            title: 'Cargando información...',
                            allowEscapeKey: false,
                            allowOutsideClick: false
                        });
                        swal.showLoading();
                        $http({
                            method: 'POST',
                            url: "php/contratacion/tarifacategoria.php",
                            data: {
                                function: 'P_BUSCAR_CONTRATOS',
                                codigo: $scope.busqueda.numero,
                                prestador: $scope.busqueda.prestador,
                                regimen: $scope.busqueda.regimen,
                                estado: $scope.busqueda.estado,
                            }
                        }).then(function (response) {
                            swal.close();
                            if (response.data.CODIGO == 0) {
                                var mensaje = response.data.NOMBRE == null ? "No se encontrarón Resultados " : response.data.NOMBRE;
                                swal('Información', mensaje, 'info');
                                $scope.inactivecontratos = true;
                            } else {
                                $scope.json_contratos = response.data;
                                $scope.inactivecontratos = false;
                                $scope.paso = 1;
                            }
                        });
                    }

                }

            }

            $scope.mostrar_formulario_validador = function (x) {
                $scope.checktodos_ser = false;
                $scope.checktodos = false;
                if (x) {
                    $scope.v_ptercero_nombre = x.nit
                    $scope.buscar_listado_select();

                    $scope.v_pregimen = x.documento_id == 'KS' ? 'S' : 'C';
                    $scope.documento_id = x.documento_id;
                    $scope.numero = x.numero
                    $scope.ubicacion = x.ubicacion
                    $scope.regimen_nombre = x.regimen
                    $scope.objeto = 'A';
                } else {
                    $scope.objeto = 'N';
                    $scope.regimen_nombre = '';
                    $scope.documento_id = '';
                    $scope.numero = '';
                    $scope.ubicacion = '';
                }
                $scope.paso_validor = 1;


            }

            $scope.borrar_busqueda_contrato = function () {
                //VARIABLES INICIALES
                $scope.busqueda = {
                    numero: null,
                    estado: "",
                    regimen: "",
                    prestador: "",
                    prestador_nombre: ""
                };
                $scope.inactivecontratos = true;
            }


            $("form").on("change", ".file-upload-field", function () {
                var archivo = $(this).val().replace(/.*(\/|\\)/, '').split(".");
                var nombre = archivo[0];
                var ext = archivo[1];
                if ($(this)["0"].files.length > 0) { // se valida que exista el archivo
                    if ($(this)["0"].files["0"].size <= 3000000) { // se valida el tamaño del archivo
                        if (ext.toUpperCase() == 'TXT') { //se valida el tipo del archivo
                            $scope.validarEstructura($(this)["0"].files["0"], 6, $(this), nombre);
                        } else {
                            swal('Tipo de archivo incorrecto', 'Extension del archivo incorrecta debe ser .txt', 'warning')
                            $(this).val("");
                            $(this).parent(".file-upload-wrapper").attr("data-text", 'Subir Archivo');
                            if ($(this)["0"].id == 'CT') {
                                $scope.switcharchivos = true;
                                $scope.ctlleno = false;
                            }

                        }
                    } else {
                        swal('TAMAÑO EXCEDIDO', 'Archivo no debe superar los 3 megabytes', 'error')
                        $(this).val().replace(/.*(\/|\\)/, '');
                        if ($(this)["0"].id == 'CT') {
                            $scope.switcharchivos = true;
                            $scope.ctlleno = false;
                        }

                    }
                } else {
                    $(this).val("");
                    $(this).parent(".file-upload-wrapper").attr("data-text", 'Subir Archivo');
                    if ($(this)["0"].id == 'CT') {
                        $scope.switcharchivos = true;
                        $scope.ctlleno = false;
                    }

                }
                $scope.$apply();;
            });

            $scope.validarEstructura = function (progressEvent, tamaño, thisfile, nombre) {
                $scope.thisfile = thisfile;
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
                    } else {
                        swal('IMPORTANTE', 'el archivo ' + nombre + ' presenta error de estructura tiene diferente columnas de las ' + tamaño + ' esperadas.', 'info')
                        thisfile.val("");
                        thisfile.parent(".file-upload-wrapper").attr("data-text", 'Subir Archivo');
                    }
                };
                reader.readAsText(file);
            }

            $scope.validacion_cod_hab = function () {
                if (0 != $scope.v_phabilitacion.length) {
                    if (12 != $scope.v_phabilitacion.length) {
                        $scope.v_phabilitacion = '';
                        swal('Información', 'El Codigo de Habiliatación es de 12 Digitos', 'info')
                    }
                }
            }
            $scope.buscar_tarifa = function () {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: {
                        function: 'P_LISTAR_TARIFA_BASE'
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data[0] != undefined) {
                        $scope.listado_tarifas = response.data;
                    } else {
                        $scope.listado_tarifas = []
                    }
                })
            }
            $scope.buscar_tarifa();
            $scope.listado_elegido = [];
            $scope.eligir_cod_habilitacion = function (x) {
                if (x == -1) {
                    $scope.listado_elegido = [];
                    for (let index = 0; index < $scope.listar_cod_habilitacion.length; index++) {
                        $scope.listar_cod_habilitacion[index].estado = $scope.checktodos == true ? true : false;
                        if ($scope.checktodos == true) {
                            $scope.listado_elegido.push($scope.listar_cod_habilitacion[index]);
                        }
                    }
                } else {
                    var ind = $scope.listar_cod_habilitacion.findIndex(obj => obj.ubicacion == x);
                    if ($scope.listar_cod_habilitacion[ind].estado == true) {
                        $scope.listado_elegido.push($scope.listar_cod_habilitacion[ind]);
                    } else {
                        $scope.listado_elegido.splice(ind, 1);
                    }
                }


            }
            $scope.listado_elegido_ser = [];
            $scope.eligir_ser_habilitacion = function (x) {
                if (x == -1) {
                    $scope.listado_elegido_ser = [];
                    if ($scope.checktodos_ser == true) {
                        for (let index = 0; index < $scope.listar_ser_habilitacion.length; index++) {
                            $scope.listar_ser_habilitacion[index].estado = $scope.checktodos_ser = true;
                            $scope.listado_elegido_ser.push($scope.listar_ser_habilitacion[index]);
                        }
                    } else {
                        for (let index = 0; index < $scope.listar_ser_habilitacion.length; index++) {
                            $scope.listar_ser_habilitacion[index].estado = $scope.checktodos_ser == true ? true : false;
                            if ($scope.listar_ser_habilitacion[index].estado_nuevo == true) {
                                $scope.listar_ser_habilitacion[index].estado = $scope.checktodos_ser = true;

                            }

                        }
                    }
                } else {
                    var ind = $scope.listar_ser_habilitacion.findIndex(obj => obj.Clasificacion == x);
                    if ($scope.listar_ser_habilitacion[ind].estado == true) {
                        $scope.listado_elegido_ser.push($scope.listar_ser_habilitacion[ind]);
                    } else {
                        $scope.listado_elegido_ser.splice(ind, 1);
                    }
                }


            }
            $scope.buscar_listado_select = function () {
                $scope.listar_cod_habilitacion = [];
                $scope.listado_elegido = [];
                $scope.listado_elegido_ser = [];
                $scope.listar_cod_habilitacion_tempo = [];
                $scope.checktodos = false;
                if ($scope.v_ptercero_nombre.length >= 6) {
                    $http({
                        method: 'POST',
                        url: "php/contratacion/gestioncontrato.php",
                        data: {
                            function: 'P_OBTENER_IPS',
                            codigo: $scope.v_ptercero_nombre
                        }
                    }).then(function (response) {
                        if (response.data.length == 0) {
                            $scope.ListarResultado = "";
                        } else {
                            if (response.data[0].codigo == 1) {
                                $scope.json_prestador = [];
                            } else {

                                $scope.seleccion_opcion(response.data[0].codigo, response.data[0].nombre, response.data[0]);

                            }


                        }
                    });
                }
            }
            $scope.eliminar_etiqueta = function (x) {
                $scope.listar_cod_habilitacion.push($scope.listado_elegido[x]);
                $scope.listado_elegido.splice(x, 1);
                $scope.v_phabilitacion = '';
            }
            $scope.eliminar_etiqueta_ser = function (x) {
                $scope.listar_ser_habilitacion.push($scope.listado_elegido_ser[x]);
                $scope.listado_elegido_ser.splice(x, 1);
                $scope.v_phabilitacion = '';
            }
            $scope.seleccion_opcion = function (codigo, nombre, data) {
                $scope.v_ptercero = codigo;
                $scope.v_ptercero_nombre = codigo;
                $scope.infoContrato = data;
                $scope.json_prestador = [];
                $scope.listar_codHabilitacion();
            }
            $scope.listar_codHabilitacion = function () {
                $scope.v_phabilitacion = '';
                if ('' != $scope.v_ptercero) {
                    swal({
                        title: 'Cargando información...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/contratacion/gestioncontrato.php",
                        data: {
                            function: 'P_OBTENER_UBIC_PRESTACION',
                            v_ptercero: $scope.v_ptercero,
                        }
                    }).then(function (response) {
                        swal.close();
                        if (response.data[0] != undefined) {
                            $scope.listar_cod_habilitacion = response.data;
                            $scope.listar_cod_habilitacion_tempo = response.data;
                            for (let index = 0; index < $scope.listar_cod_habilitacion.length; index++) {
                                $scope.listar_cod_habilitacion[index].estado = false;
                            }
                            $scope.checktodos = false;
                            $scope.p_lista_serv_habilitados_val();
                        } else {
                            swal('Información', 'No se Encontraron datos con los Criterios Buscados', 'info')
                            $scope.listar_cod_habilitacion = []
                        }
                    })

                }
            }
            $scope.p_lista_serv_habilitados_val = function () {
                $scope.v_phabilitacion = '';

                if ('' != $scope.v_ptercero) {
                    swal({
                        title: 'Cargando información...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    if ($scope.objeto == 'N') {
                        $http({
                            method: 'POST',
                            url: "php/contratacion/gestioncontrato.php",
                            data: {
                                function: 'p_lista_serv_habilitados_val',
                                v_ptercero: $scope.v_ptercero,
                            }
                        }).then(function (response) {
                            swal.close();
                            if (response.data[0] != undefined) {
                                $scope.listar_ser_habilitacion = response.data;
                                $scope.listar_ser_habilitacion_tempo = response.data;
                                for (let index = 0; index < $scope.listar_ser_habilitacion.length; index++) {
                                    $scope.listar_ser_habilitacion[index].estado = false;
                                    $scope.listar_ser_habilitacion[index].clasificacion_nueva = ''
                                    $scope.listar_ser_habilitacion[index].estado_nuevo = false;

                                }
                                $scope.checktodos_ser = false;

                            } else {
                                swal('Información', 'No se Encontraron datos con los Criterios Buscados', 'info')
                                $scope.listar_cod_habilitacion = []
                            }
                        })
                    } else {
                        $http({
                            method: 'POST',
                            url: "php/contratacion/gestioncontrato.php",
                            data: {
                                function: 'P_LISTA_SERV_HABILITADOS_VAL_ADICION',
                                v_ptercero: $scope.v_ptercero,
                                v_pnumero: $scope.numero,
                                v_pubicacion: $scope.ubicacion,
                                v_pdocumento: $scope.v_pregimen == 'S' ? 'KS' : 'KC',
                            }
                        }).then(function (response) {
                            swal.close();
                            if (response.data[0] != undefined) {
                                $scope.listar_ser_habilitacion = response.data;
                                $scope.listar_ser_habilitacion_tempo = response.data;
                                for (let index = 0; index < $scope.listar_ser_habilitacion.length; index++) {
                                    if ($scope.listar_ser_habilitacion[index].clasificacion_nueva == 'N') {
                                        $scope.listar_ser_habilitacion[index].estado = true;
                                        $scope.listar_ser_habilitacion[index].estado_nuevo = true;

                                    } else {
                                        $scope.listar_ser_habilitacion[index].estado = false;
                                        $scope.listar_ser_habilitacion[index].estado_nuevo = false;
                                    }

                                }
                                $scope.checktodos_ser = false;

                            } else {
                                swal('Información', 'No se Encontraron datos con los Criterios Buscados', 'info')
                                $scope.listar_cod_habilitacion = []
                            }
                        })
                    }


                }
            }




            $scope.descarga = function (tipo, JSONData, ReportTitle, ShowLabel) {
                switch (tipo) {
                    // excel
                    case 1:
                        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
                        var CSV = ',' + '\r\n\n';
                        if (ShowLabel) {
                            var row = "";
                            for (var index in arrData[0]) {
                                row += index.toLocaleUpperCase() + ',';
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

                        var fileName = "Reporte de ";

                        // var fileName = "Historial de cambios de implementos de oficina del municipio ";
                        fileName += ReportTitle.replace(/ /g, "_");
                        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
                        var link = document.createElement("a");
                        link.href = uri;
                        link.style = "visibility:hidden";
                        link.download = fileName + ".csv";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        break;
                    // pdf
                    case 2:
                        var fileName = "Reporte de ";
                        fileName += ReportTitle.replace(/ /g, "_");
                        var doc = new jsPDF();
                        JSONData.forEach(function (data, i) {
                            doc.text(20, 10 + (i * 10),
                                "DESCRIPCION" + data.error +
                                "CODIGO" + data.Dato_errado +
                                "NOMBRE" + data.Descripcion_dato_errado +
                                "Fila" + data.Fila);
                        });
                        doc.save(fileName + '.pdf');
                        break;
                    // csv
                    case 3:
                        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
                        var CSV = ',' + '\r\n\n';
                        if (ShowLabel) {
                            var row = "";
                            for (var index in arrData[0]) {
                                row += index.toLocaleUpperCase + ',';
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

                        var fileName = "Reporte de ";

                        // var fileName = "Historial de cambios de implementos de oficina del municipio ";
                        fileName += ReportTitle.replace(/ /g, "_");
                        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
                        var link = document.createElement("a");
                        link.href = uri;
                        link.style = "visibility:hidden";
                        link.download = fileName + ".pdf";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        break;
                    default:
                        break;
                }
            }

            $scope.fileToBase64 = function (filesSelected, name) {
                $scope.mostrar_guardar = true;
                if (filesSelected.length > 0) {
                    var fileToLoad = filesSelected[0];
                    var fileReader = new FileReader();
                    fileReader.onload = function (fileLoadedEvent) {
                        $scope.archivo = fileLoadedEvent.target.result
                    };
                    fileReader.readAsDataURL(fileToLoad);

                }
                $scope.$apply();;
            }
            $scope.elegir_clasificaciones = function () {
                for (let index = 0; index < $scope.listar_ser_habilitacion.length; index++) {
                    if ($scope.listar_ser_habilitacion[index].estado_nuevo == true) {
                        $scope.listado_elegido_ser.push($scope.listar_ser_habilitacion[index]);
                    }
                }
            }
            $scope.guardar = function () {

                if (
                    ('' != $scope.v_ptercero) &&
                    ('' != $scope.v_pregimen) &&
                    ('' != $scope.v_ptarifa) &&
                    ('' != $scope.v_poperador)
                ) {
                    var cantidad = $scope.listado_elegido_ser.length == 1 ? ' Servicio ' : ' Servicios ';
                    var mensaje = '¿Seguro que Desea Agregar ' + $scope.listado_elegido_ser.length + cantidad + 'a esta Validación Precontractual?';
                    $scope.elegir_clasificaciones();
                    swal({
                        title: 'Confirmar',
                        text: mensaje,
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Confirmar'
                    }).then((result) => {
                        if (result) {
                            $http({
                                method: 'POST',
                                url: "php/contratacion/gestioncontrato.php",
                                data: {
                                    function: 'P_I_INSERTAR_PRODUCTO',
                                    v_panno: $scope.hoy.getFullYear(),
                                    v_pperiodo: ($scope.hoy.getMonth() + 1) < 10 ? '0' + ($scope.hoy.getMonth() + 1) : '' + ($scope.hoy.getMonth() + 1),
                                    v_ptercero: $scope.v_ptercero,
                                    v_pubi_prestacion: JSON.stringify($scope.listado_elegido),
                                    v_pcant_ubic_prestacion: $scope.listado_elegido.length,
                                    v_pclasificacion: JSON.stringify($scope.listado_elegido_ser),
                                    v_pcant_clasificacion: $scope.listado_elegido_ser.length,
                                    v_pregimen: $scope.v_pregimen,
                                    v_ptarifa: $scope.v_ptarifa,
                                    v_poperador: $scope.v_poperador,
                                    v_pporcentaje: $scope.v_pporcentaje,
                                    v_pobjeto: $scope.objeto,
                                    archivo: $scope.archivo,
                                    v_pnumero: $scope.numero,
                                    v_pubicacion: $scope.ubicacion,
                                    v_pdocumento: $scope.documento_id
                                }
                            }).then(function (response) {
                                if (response.data.Codigo == 1) {
                                    var mensaje = response.data.Nombre == null ? "No se Guardo el Archivo, Favor intente nuevamente " : response.data.Nombre;
                                    swal('Información', mensaje, 'info');
                                } else if (response.data[0].Codigo == 1) {
                                    var mensaje = response.data[0].Nombre == null ? "No se Guardo el Archivo, Favor intente nuevamente " : response.data[0].Nombre;
                                    swal('Información', mensaje, 'info');
                                } else if (response.data[0].Codigo == 0) {
                                    var mensaje = response.data[0].Nombre + '</br>' + 'PROCESO: ' + response.data[0].Proceso + '</br>' + 'FECHA: ' + response.data[0].Fecha
                                    var proceso = response.data[0].Proceso
                                    // swal({
                                    //     title: "Completado!",
                                    //     text: mensaje,
                                    //     html: mensaje,
                                    //     type: "success"
                                    // }).then(function () {
                                    $scope.p_lista_errores_producto(proceso);
                                    $scope.thisfile.val("");
                                    $scope.thisfile.parent(".file-upload-wrapper").attr("data-text", 'Subir Archivo');
                                    // })
                                } else {
                                    var mensaje = "No se Guardo el Archivo, No hubo Respuesta. Favor intente nuevamente ";
                                    swal('Información', mensaje, 'info');
                                }
                            });
                        }
                    })

                } else {
                    swal('Información', 'Recuerde Llenar Todos los Campos Antes', 'info')

                }

            }

            $scope.limpiar = function () {
                $scope.v_panno = '';
                $scope.v_pperiodo = '';
                $scope.v_ptercero = '';
                $scope.v_phabilitacion = '';
                $scope.archivo = '';
                $scope.mostrar_guardar = false;
                $scope.lista_errores = [];
                $scope.mostrar_consulta = true;
                $scope.lista_archivos = [];
                $scope.listado_datos = [];
                $scope.v_ptercero_nombre = '';
                $scope.infoContrato = {};
                $scope.listado_datos_validos = [];
                $scope.listado_elegido = [];
                $scope.listado_elegido_ser = [];
                $scope.listar_ser_habilitacion = [];
                $scope.listar_cod_habilitacion = [];
                $scope.v_pregimen = '';
                $scope.v_ptarifa = '';
                $scope.v_poperador = '';
                $scope.v_pporcentaje = '';
                $scope.checktodos = false;
                $scope.checktodos_ser = false;
                $scope.paso_validor = 0;
                setTimeout(() => {
                    $scope.$apply();
                }, 300);
            }
            $scope.limpiar();

            $scope.p_lista_errores_producto = function (proceso) {
                $scope.nuevos_productos = [];
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: {
                        function: 'p_lista_errores_producto',
                        v_pcodigo_proceso: proceso,
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data[0] != undefined) {
                        $scope.lista_errores = response.data;
                        $scope.paso_validor = 2;
                    } else {
                        // swal({
                        //     title: "Completado!",
                        //     text: response.data.Nombre,
                        //     type: "success"
                        // }).then(function () {
                        $scope.limpiar();
                        $scope.thisfile.val("");
                        $scope.thisfile.parent(".file-upload-wrapper").attr("data-text", 'Subir Archivo');
                        swal({
                            title: 'Cargando información...',
                            allowEscapeKey: false,
                            allowOutsideClick: false
                        });
                        swal.showLoading();
                        $http({
                            method: 'POST',
                            url: "php/contratacion/gestioncontrato.php",
                            data: {
                                function: 'P_LISTAR_PRODUC_VALIDADO',
                                v_pcodigo_proceso: proceso,
                            }
                        }).then(function (response) {
                            swal.close();
                            if (response.data[0] != undefined) {
                                $scope.listado_datos_validos = response.data;
                                $scope.paso_validor = 3;
                            } else {
                                swal('Información', response.data.Nombre, 'info')
                                $scope.limpiar();
                            }
                        })
                        // })
                    }
                })
            }

            $scope.consulta_validacion = function (x) {
                if (!x) {
                    swal({
                        title: 'Cargando información...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                }
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: {
                        function: 'P_LISTAR_ARCHIVO_VALIDADO'
                    }
                }).then(function (response) {
                    if (!x) {
                        swal.close();
                    }
                    if (response.data[0] != undefined) {
                        $scope.lista_archivos = response.data;
                        $scope.lista_archivosTemp = $scope.lista_archivos;
                        $scope.currentPage = 0;
                        $scope.pageSize = 10;
                        $scope.valmaxpag = 10;
                        $scope.pages = [];
                        $scope.configPages();
                    } else {
                        // swal('Información', 'No se Encontraron datos con los Criterios Buscados', 'info')
                        $scope.lista_archivos = []
                    }
                })
            }

            $scope.propertyName = 'proceso';
            $scope.reverse = true;

            $scope.sortBy = function (propertyName) {
                $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
                $scope.propertyName = propertyName;
            };

            $scope.p_listar_produc_validado = function (data) {
                $scope.seleccionado = data;
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: {
                        function: 'P_LISTAR_PRODUC_VALIDADO',
                        v_pcodigo_proceso: data.proceso,
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data[0] != undefined) {
                        $scope.listado_datos = response.data;
                    } else {
                        swal('Información', response.data.Nombre, 'info')
                        $scope.limpiar();
                    }
                })
            }

            $scope.p_ui_validacion_contractual = function (data) {
                swal({
                    title: '¿Desea Eliminar el Archivo validado?',
                    text: data.proceso,
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonText: "Confirmar",
                    cancelButtonText: "Cancelar",
                    allowOutsideClick: false
                }).then(function (result) {
                    if (result) {
                        swal({ title: 'Cargando...' });
                        swal.showLoading();
                        $http({
                            method: 'POST',
                            url: "php/contratacion/gestioncontrato.php",
                            data: { function: 'P_UI_VALIDACION_CONTRACTUAL', codigo_proceso: data.proceso }
                        }).then(function (response) {
                            if (response.data.toString().substr(0, 3) != '<br') {
                                if (response.data.Codigo != "1") {
                                    swal('¡Mensaje!', response.data.Nombre, 'success').catch(swal.noop);
                                    $scope.consulta_validacion(1);
                                } else {
                                    swal('¡Importante!', response.data.Nombre, 'warning').catch(swal.noop);
                                }
                            } else {
                                swal(
                                    '¡Importante!',
                                    'Por favor, Contactar con Oficina TIC Nacional',
                                    'warning'
                                ).catch(swal.noop);
                            }
                        })
                    }
                });
            }

            $scope.filter = function (val) {
                $scope.lista_archivosTemp = $filter('filter')($scope.lista_archivos, val);
                if ($scope.lista_archivosTemp.length > 0) {
                    $scope.setPage(1);
                }
                $scope.configPages();
            }
            $scope.configPages = function () {
                $scope.pages.length = 0;
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.lista_archivosTemp.length / $scope.pageSize) > $scope.valmaxpag)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.lista_archivosTemp.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.lista_archivosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                        ini = Math.ceil($scope.lista_archivosTemp.length / $scope.pageSize) - $scope.valmaxpag;
                        fin = Math.ceil($scope.lista_archivosTemp.length / $scope.pageSize);
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
            }
            $scope.setPage = function (index) {
                $scope.currentPage = index - 1;
                console.log($scope.lista_archivos.length / $scope.pageSize - 1)
            }
        }])