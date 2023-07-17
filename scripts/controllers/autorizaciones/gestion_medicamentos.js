'use strict';
angular.module('GenesisApp').controller('gestionmedicamentosController', ['$scope', '$http', '$filter', 'ngDialog', function ($scope, $http, $filter, ngDialog) {
    $scope.medicamentos = {
        vista: 1,
        seccional: "",
        municipio: "",
        radio_estado: "",
        switch: false,
        switchaut: false,
        fecha_mes: new Date(),
        estado: ""
    };
    $scope.array_seccionales = new Array();
    $scope.array_municipios = new Array();
    $scope.array_lista_ips = new Array();
    $scope.array_autorizaciones = new Array();

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
        if (sessionStorage.getItem('municipio') != "") {
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
                    function: "listar_departamento",
                    ubicacion: sessionStorage.getItem('municipio'),
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
                    swal('Mensaje', 'Error en el JSON que lista los Departamento', 'error');
                }
                $scope.medicamentos.municipio = "";
                // document.querySelector('#medicamentos_municipio').value = "";
            });
        } else {
            swal('Advertencia', 'Ingrese: Ubicacion', 'warning');
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
                    function: "listar_municipios",
                    departamento: $scope.medicamentos.seccional,
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
                    swal('Mensaje', 'Error en el JSON que lista los Municipios', 'error');
                }
                $scope.medicamentos.municipio = "";
                // document.querySelector('#medicamentos_municipio').value = "";
            });
        } else {
            swal('Advertencia', 'Ingrese: Departamento', 'warning');
        }
    }
    $scope.listar_ips = function () {
        if (sessionStorage.getItem('municipio') != "" && $scope.medicamentos.seccional != "" && $scope.medicamentos.municipio != "") {
            $scope.medicamentos.estado = "";
            $scope.medicamentos.vista = 3;
            $scope.currentPage = 0;
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
                    function: "listar_ips",
                    municipio: $scope.medicamentos.municipio,
                    estado: ($scope.medicamentos.switchaut == false ? "P" : "X")
                }
            }).then(function (response) {
                swal.close();
                if (validar_json(angular.toJson(response.data))) {
                    if (response.data.codigo == 1) {
                        $scope.array_lista_ips = new Array();
                        if (response.data.mensaje != undefined) {
                            swal('Advertencia', response.data.mensaje, 'warning');
                        }
                    } else {
                        $scope.array_lista_ips = response.data;
                    }
                } else {
                    $scope.array_lista_ips = new Array();
                    swal('Mensaje', 'Error en el JSON que lista las IPS', 'error');
                }
            });
        } else {
            swal('Advertencia', 'Ingrese: Ubicacion, Seccional, Municipio', 'warning');
        }
    }
    $scope.ips_select = {};
    $scope.ver_autorizaciones = function (estado, ips) {
        if (sessionStorage.getItem('municipio') != "" && $scope.medicamentos.seccional != "" && $scope.medicamentos.municipio != "" && ips.nit != "") {
            $scope.q = "";
            $scope.ips_select = ips;
            $scope.medicamentos.estado = estado;
            $scope.medicamentos.vista = 4;
            $scope.currentPage = 0;
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
                    function: "listar_autorizaciones_fun",
                    ubicacion: $scope.medicamentos.municipio,
                    nit: ips.nit,
                    filtro: ($scope.medicamentos.switch == false) ? "T" : año + '/' + ((mes < 10) ? ('0' + mes) : mes),
                    estado: estado,
                    tipo: ($scope.medicamentos.switchaut == false ? "P" : "X")
                }
            }).then(function (response) {
                swal.close();
                if (validar_json(angular.toJson(response.data))) {
                    if (response.data.codigo == 1) {
                        $scope.array_autorizaciones = new Array();
                        if (response.data.mensaje != undefined) {
                            swal('Advertencia', response.data.mensaje, 'warning');
                        }
                    } else {
                        $scope.array_autorizaciones = response.data;
                    }
                } else {
                    $scope.array_autorizaciones = new Array();
                    swal('Mensaje', 'Error en el JSON que lista las IPS', 'error');
                }
            });
        } else {
            swal('Advertencia', 'Ingrese: Ubicacion, Seccional, Municipio', 'warning');
        }
    }
    $scope.titulo_ips = function (seccional, municipio) {
        if (seccional != undefined && municipio != undefined && seccional != null && municipio != null && seccional != "" && municipio != "") {
            return $scope.array_seccionales.filter(element => element.codigo == seccional)[0].nombre + " / " + $scope.array_municipios.filter(element => element.codigo == municipio)[0].nombre;
        }
    }

    $scope.titulo_autorizaciones = function (estado) {
        if (estado != undefined && estado != null && estado != "") {
            switch (estado) {
                case "PE":
                    estado = "Pendiente";
                    break;
                case "PA":
                    estado = "Parcial";
                    break;
                case "TO":
                    estado = "Total";
                    break;
                case "CO":
                    estado = "Confirmado";
                    break;
                case "AN":
                    estado = "Anulado";
                    break;
                default:
                    estado = "Estado no valido";
                    break;
            }
            return estado;
        }
    }

    $scope.listar_autorizaciones_fun = function () {
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
                function: "listar_autorizaciones",
                ubicacion: sessionStorage.getItem('municipio'),
                filtro: ($scope.medicamentos.switch == false) ? "T" : año + '/' + ((mes < 10) ? ('0' + mes) : mes),
                tipo: ($scope.medicamentos.switchaut == false ? "P" : "X"),
                paginacion: parseInt($scope.pageSize),
                actual: 0
            }
        }).then(function (response) {
            swal.close();
            $scope.currentPage = 0;
            if (validar_json(angular.toJson(response.data))) {
                $scope.array_autorizaciones = response.data;
            } else {
                $scope.array_autorizaciones = [];
                swal('Mensaje', 'Error listando las autorizaciones', 'error');
            }
        });
    }

    // $scope.listar_autorizaciones();
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
                            /* $scope.ver_autorizaciones($scope.medicamentos.estado, $scope.ips_select); */
                            return true;
                        }
                    });
                } else {
                    swal('Mensaje', 'Error listando la autorizacion', 'error');
                }
            });
        }
    }
    //
    $scope.calcular_porcentaje = function (array, value) {
        if (array != undefined && value != undefined && array != null && value != null && array != "" && value != "") {
            var sum = 0;
            $scope[array].forEach(function (element) {
                sum += Number(element.cantidad);
            });
            return { width: (value * 100 / sum).toFixed(3) + '%' };
        }
    }
    $scope.buscar_autorizacion = function (codigo) {
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
                    function: "buscar_autorizacion",
                    ubicacion: sessionStorage.getItem('municipio'),
                    nit: "F",
                    numero_aut: codigo
                }
            }).then(function (response) {
                swal.close();
                $scope.currentPage = 0;
                if (validar_json(angular.toJson(response.data))) {
                    $scope.medicamentos.vista = 5;
                    $scope.array_autorizaciones = response.data;
                } else {
                    $scope.listar_departamento();
                    $scope.medicamentos.vista = 1;
                    $scope.array_autorizaciones = new Array();
                    swal('Mensaje', 'Error buscando las autorizaciones', 'error');
                }
            });
        }
    }


    // Paginacion
    $scope.currentPage = 0;
    $scope.currentPage_2 = 0;
    $scope.pageSize = 10;
    $scope.q = "";
    $scope.getData = function () {
        return $filter('filter')($scope.array_lista_ips, $scope.q);
    }
    $scope.numberOfPages = function (array) {
        return Math.ceil(array.length / $scope.pageSize);
    }
    $scope.$watch('q', function (newValue, oldValue) {
        if (oldValue != newValue) {
            $scope.currentPage = 0;
        }
    }, true);
    $scope.btns_paginacion = function (value, loading, pagina_actual) {
        $scope[pagina_actual] = value;
        document.querySelector("#" + loading).hidden = false;
        setInterval(() => {
            document.querySelector("#" + loading).hidden = true;
        }, 500);
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