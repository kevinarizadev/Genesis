'use strict';
angular.module('GenesisApp').controller('medicamentos_ipsController', ['$scope', '$http', '$filter', 'ngDialog', function ($scope, $http, $filter, ngDialog) {
    $scope.qr = false;
    $scope.qr_t = "Lector QR";
    $(document).ready(function () {
        $scope.scanner = new Instascan.Scanner({ video: document.getElementById('vista_camara') });
        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                $scope.qr = false;
                $scope.scanner.start(cameras[0]);
                $scope.qr_t = "Escanea el codigo QR";
            } else {
                $scope.qr = true;
                $scope.qr_t = "Conecte un lector QR";
            }
        }).catch(function (e) {
            console.log(e);
            $scope.qr = true;
            $scope.scanner.stop();
            $scope.qr_t = "No se encontro un lector QR";
        });
        $scope.scanner.addListener('scan', function (content) {
            if (typeof (content) == 'string') {
                var datos = JSON.parse(content);
                if (typeof (datos) == 'object') {
                    /* $scope.buscar_autorizacion(datos.Autorizacion, datos.Ubicacion); */
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
                        url: "php/autorizaciones/medicamentos/gestion_medicamentos.php",
                        data: {
                            function: "buscar_autorizacion_ips",
                            ubicacion: datos.Ubicacion,
                            nit: sessionStorage.getItem('nit'),
                            numero_aut: datos.Autorizacion
                        }
                    }).then(function (response) {
                        swal.close();
                        $scope.currentPage = 0;
                        if (validar_json(angular.toJson(response.data))) {
                            $scope.medicamentos.vista = 5;
                            $scope.autorizaciones = response.data;
                            if ($scope.autorizaciones.length > 0) {
                                $scope.abrir_modal(3, $scope.autorizaciones[0]);
                            }
                        } else {
                            $scope.listar_departamento();
                            $scope.medicamentos.vista = 1;
                            $scope.autorizaciones = new Array();
                            swal('Mensaje', 'Error buscando las autorizaciones', 'error');
                        }
                    });
                } else {
                    swal("Importante", "Informacion incorrecta en QR", "info");
                }
            } else {
                swal("Importante", "Informacion incorrecta en QR", "info");
            }
        });
        $scope.mostrar_scanner = function () {
            if ($scope.qr) {
                $scope.qr = true;
                $scope.scanner.stop();
                $scope.qr_t = "Encender lector QR";
            } else {
                Instascan.Camera.getCameras().then(function (cameras) {
                    if (cameras.length > 0) {
                        $scope.qr = false;
                        $scope.scanner.start(cameras[0]);
                        $scope.qr_t = "Escanea el codigo QR";
                    } else {
                        $scope.qr = true;
                        $scope.qr_t = "Conecte un lector QR";
                    }
                    $scope.$apply();
                }).catch(function (e) {
                    console.log(e);
                    $scope.qr = true;
                    $scope.scanner.stop();
                    $scope.qr_t = "No se encontro un lector QR";
                    $scope.$apply();
                });
            }
        }
    });
    $scope.medicamentos = {
        vista: 1,
        seccional: "",
        municipio: "",
        radio_estado: "PE",
        switch: false,
        fecha_mes: new Date(),
        switchaut: false
    };

    $scope.array_seccionales = new Array();
    $scope.array_municipios = new Array();
    $scope.autorizaciones = new Array();

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
    $scope.listar_departamento = function () {
        if (sessionStorage.getItem('nit') != undefined && sessionStorage.getItem('nit') != "") {
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
                url: "php/autorizaciones/medicamentos/gestion_medicamentos.php",
                data: {
                    function: "listar_departamentos_ips",
                    nit: sessionStorage.getItem('nit'),
                    estado: ($scope.medicamentos.switchaut == false ? "P" : "X")
                }
            }).then(function (response) {
                swal.close();
                if (validar_json(angular.toJson(response.data))) {
                    if (response.data.codigo == 1 || response.data == 0) {
                        $scope.array_seccionales = new Array();
                        if (response.data.mensaje != undefined) {
                            swal('Advertencia', response.data.mensaje, 'warning');
                        }
                    } else {
                        $scope.array_seccionales = response.data;
                    }
                } else {
                    $scope.array_seccionales = new Array();
                    swal('Mensaje', 'Error validando el JSON de los departamentos', 'error');
                }
                $scope.medicamentos.municipio = "";
            });
        } else {
            $scope.array_seccionales = new Array();
            swal('Advertencia', 'Nit no valido', 'warning');
        }
    }
    $scope.listar_departamento();
    $scope.listar_municipios = function () {
        if ($scope.medicamentos.seccional != "") {
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
                url: "php/autorizaciones/medicamentos/gestion_medicamentos.php",
                data: {
                    function: "listar_municipio_ips",
                    departamento: $scope.medicamentos.seccional,
                    nit: sessionStorage.getItem('nit'),
                    estado: ($scope.medicamentos.switchaut == false ? "P" : "X")
                }
            }).then(function (response) {
                swal.close();
                if (validar_json(angular.toJson(response.data))) {
                    if (response.data.codigo == 1 || response.data == 0) {
                        $scope.array_municipios = new Array();
                        if (response.data.mensaje != undefined) {
                            swal('Advertencia', response.data.mensaje, 'warning');
                        }
                    } else {
                        $scope.array_municipios = response.data;
                    }
                } else {
                    $scope.array_municipios = new Array();
                    swal('Mensaje', 'Error validando el JSON de los municipio', 'error');
                }
                // $scope.medicamentos.municipio = "";
                // document.querySelector('#medicamentos_municipio').value = "";
            });
        } else {
            swal('Advertencia', 'Ingrese: Departamento', 'warning');
        }
    }
    $scope.listar_autorizaciones_ips = function () {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        $scope.q = "";
        var mes = $scope.medicamentos.fecha_mes.getMonth() + 1;
        var año = $scope.medicamentos.fecha_mes.getFullYear();
        if($scope.medicamentos.municipio!=""){
            $http({
                method: 'POST',
                url: "php/autorizaciones/medicamentos/gestion_medicamentos.php",
                data: {
                    function: "listar_autorizaciones_ips",
                    ubicacion: $scope.medicamentos.municipio,
                    nit: sessionStorage.getItem('nit'),
                    filtro: ($scope.medicamentos.switch == false) ? "T" : año + '/' + ((mes < 10) ? ('0' + mes) : mes),
                    estado: $scope.medicamentos.radio_estado,
                    tipo: ($scope.medicamentos.switchaut == false ? "P" : "X")
                }
            }).then(function (response) {
                swal.close();
                $scope.currentPage = 0;
                if (validar_json(angular.toJson(response.data))) {
                    $scope.autorizaciones = response.data;
                } else {
                    $scope.autorizaciones = [];
                    swal('Mensaje', 'Error listando las autorizaciones', 'error');
                }
            });
        } else {
            swal('Mensaje', 'Seleccioné una ubicación', 'warning');
        }
    }
    // $scope.listar_autorizaciones_ips();
    $scope.listar_autorizaciones_ips_mes = function () {
        $scope.medicamentos.switch = true;
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        var mes = $scope.medicamentos.fecha_mes.getMonth() + 1;
        var año = $scope.medicamentos.fecha_mes.getFullYear();
        $http({
            method: 'POST',
            url: "php/autorizaciones/medicamentos/gestion_medicamentos.php",
            data: {
                function: "listar_autorizaciones_ips",
                ubicacion: $scope.medicamentos.municipio,
                nit: sessionStorage.getItem('nit'),
                filtro: ($scope.medicamentos.switch == false) ? "T" : año + '/' + ((mes < 10) ? ('0' + mes) : mes),
                estado: $scope.medicamentos.radio_estado,
                tipo: ($scope.medicamentos.switchaut == false ? "P" : "X")
            }
        }).then(function (response) {
            swal.close();
            $scope.currentPage = 0;
            if (validar_json(angular.toJson(response.data))) {
                $scope.autorizaciones = response.data;
            } else {
                $scope.autorizaciones = [];
                swal('Mensaje', 'Error listando las autorizaciones', 'error');
            }
        });
    }
    $scope.abrir_modal = function (vista, datos) {
        if (vista != undefined) {
            $http({
                method: 'POST',
                url: "php/autorizaciones/medicamentos/gestion_medicamentos.php",
                data: {
                    function: "ver_detalle_autorizacion",
                    numero: datos.codigo,
                    ubicacion: datos.ubi_aut
                }
            }).then(function (response) {
                swal.close();
                if (validar_json(angular.toJson(response.data)) && response.data.codigo != 0) {
                    $scope.vista = vista;
                    $scope.datos = Object.assign(response.data, { "datos": datos });
                    ngDialog.open({
                        template: 'views/autorizaciones/modal_gestion_medicamentos.html',
                        className: 'ngdialog-theme-plain',
                        controller: 'modal_gestion_medicamentos_controller',
                        scope: $scope,
                        preCloseCallback: function (response_2) {
                            console.log(response_2);
                            if(response_2!="$escape"){
                                if (response_2.codigo == 0) {
                                    swal('Completado', response_2.mensaje, 'success');
                                    setTimeout(() => {
                                        if ($scope.buscar_activo==true) {
                                            $scope.listar_departamento();
                                            $scope.medicamentos.vista=1;
                                            $scope.codigo_autorizacion='';
                                            $scope.buscar_activo=false;
                                        } else {
                                            $scope.listar_autorizaciones_ips();
                                        }
                                    }, 2000);
                                } else {
                                    if ($scope.buscar_activo==true) {
                                        $scope.listar_departamento();
                                        $scope.medicamentos.vista=1;
                                        $scope.codigo_autorizacion='';
                                        $scope.buscar_activo=false;
                                    } else {
                                        $scope.listar_autorizaciones_ips();
                                    }
                                }
                            } else {
                                swal.close();
                            }
                            return true;
                        }
                    });
                } else {
                    swal('Mensaje', 'Error listando las autorizaciones', 'error');
                }
            });
        }
    }
    $scope.calcular_porcentaje = function (array, value) {
        if (array != undefined && value != undefined && array != null && value != null && array != "" && value != "") {
            var sum = 0;
            $scope[array].forEach(function (element) {
                sum += Number(element.cantidad);
            });
            return { width: (value * 100 / sum).toFixed(3) + '%' };
        }
    }
    $scope.titulo_ips = function (seccional, municipio) {
        if (seccional != undefined && municipio != undefined && seccional != null && municipio != null && seccional != "" && municipio != "") {
            return $scope.array_seccionales.filter(element => element.codigo == seccional)[0].nombre + " / " + $scope.array_municipios.filter(element => element.codigo == municipio)[0].nombre;
        }
    }
    $scope.buscar_activo = false;
    $scope.buscar_autorizacion = function (codigo, ubicacion = sessionStorage.getItem('ubicacion')) {
        $scope.q = "";
        if (codigo != undefined) {
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
                url: "php/autorizaciones/medicamentos/gestion_medicamentos.php",
                data: {
                    function: "buscar_autorizacion_ips",
                    ubicacion: ubicacion,
                    nit: sessionStorage.getItem('nit'),
                    numero_aut: codigo
                }
            }).then(function (response) {
                swal.close();
                $scope.currentPage = 0;
                if (validar_json(angular.toJson(response.data))) {
                    $scope.medicamentos.vista = 5;
                    $scope.autorizaciones = response.data;
                    $scope.buscar_activo = true;
                } else {
                    $scope.listar_departamento();
                    $scope.medicamentos.vista = 1;
                    $scope.autorizaciones = new Array();
                    swal('Mensaje', 'Error buscando las autorizaciones', 'error');
                    $scope.buscar_activo = false;
                }
            });
        }
    }
    // Paginacion
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.q = "";
    $scope.getData = function () {
        return $filter('filter')($scope.autorizaciones, $scope.q);
    }
    $scope.numberOfPages = function () {
        return Math.ceil($scope.getData().length / $scope.pageSize);
    }
    $scope.$watch('q', function (newValue, oldValue) {
        if (oldValue != newValue) {
            $scope.currentPage = 0;
        }
    }, true);
    $scope.btns_paginacion = function (value) {
        $scope.currentPage = value;
        // window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}]).filter('startFrom', function () {
    return function (input, start) {
        if (input != undefined) {
            start = +start;
            return input.slice(start);
        }
    }
});