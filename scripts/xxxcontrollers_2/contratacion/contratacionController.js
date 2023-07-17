'use strict';
angular.module('GenesisApp')
    .controller('contratacionController', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$rootScope',
        function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $rootScope) {
            $(document).ready(function () {
                $('#modal1').modal();
            });

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
                        if(accion=='D'){
                            $scope.limpiar_gestion();
                        }else{
                            $scope.buscar_contratos();
                        }
                       
                    } else {
                        swal('Información', response.data.Nombre, 'error');
                    }

                });
            }
            $scope.guardar3 = function (accion,i) {

                if (accion == 'U') {
                    if (
                       $scope.Listar_gestion[i].COD_REGIMEN == "" ||$scope.Listar_gestion[i].COD_REGIMEN == undefined ||
                       $scope.Listar_gestion[i].NUMERO == "" ||$scope.Listar_gestion[i].NUMERO == undefined ||
                       $scope.Listar_gestion[i].PRODUCTO == "" ||$scope.Listar_gestion[i].PRODUCTO == undefined ||
                       $scope.Listar_gestion[i].CLASIFICACION == 0 ||$scope.Listar_gestion[i].CLASIFICACION == undefined ||
                       $scope.Listar_gestion[i].VALOR == undefined ||$scope.Listar_gestion[i].VALOR == null ||
                       $scope.Listar_gestion[i].TARIFA == "" ||$scope.Listar_gestion[i].TARIFA == undefined ||$scope.Listar_gestion[i].TARIFA == null ||
                       $scope.Listar_gestion[i].P_DESCUENTO == undefined ||$scope.Listar_gestion[i].P_DESCUENTO == null ||
                       $scope.Listar_gestion[i].DESCUENTO == "" ||$scope.Listar_gestion[i].DESCUENTO == undefined ||$scope.Listar_gestion[i].DESCUENTO == null
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
                        $scope.TOTAL_REGISTROS="";
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
                            $scope.TOTAL_REGISTROS=response.data.length;
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
                } else if (op ==1) {
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





