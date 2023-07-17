'use strict';
angular.module('GenesisApp').controller('serviciosipscontroller', ['$scope', '$http', function ($scope, $http) {
    $scope.filtro = { tipo: false, boton: false, datos: "", codigo: "" };
    $scope.titulo = "";
    $scope.filtro.datos = "";
    $scope.listar_resultado = [];
    $scope.departamentos = [];
    $scope.municipios = [];
    $scope.contenido = { titulo: "", activo: 1 };
    $scope.datos_ips = [];
    $scope.buscar = function (filtro, texto) {
        $scope.filtrar_datos = "";
        if (filtro != undefined && texto != "") {
            $http({
                method: 'POST',
                url: "php/salud/servicios_ips.php",
                data: {
                    function: 'buscar_servicios_contra',
                    tipo: (filtro) ? 'P' : 'P',
                    texto: texto
                }
            }).then(function (response) {
                if (validar_json(angular.toJson(response.data)) && response.data.length > 0 && response.data.length != "") {
                    $scope.filtro.boton = true;
                    $scope.listar_resultado = response.data;
                } else {
                    $scope.contenido.activo = 1;
                    $scope.departamentos = [];
                    $scope.filtro.codigo = "";
                    $scope.filtro.boton = false;
                    $scope.listar_resultado = [];
                    swal('404', 'Sin resultados para la busqueda de ' + texto, 'error');
                }
            });
        } else {
            swal('Error', 'Ingreso un campo vacio', 'error');
        }
    }
    $scope.listar_departamento = function (filtro, texto, titulo) {
        $scope.filtro.datos = "";
        if (filtro != undefined && texto != "") {
            $http({
                method: 'POST',
                url: "php/salud/servicios_ips.php",
                data: {
                    function: 'listar_departamento',
                    tipo: (filtro) ? 'P' : 'P',
                    texto: texto
                }
            }).then(function (response) {
                if (validar_json(angular.toJson(response.data)) && response.data.length > 0 && response.data.length != "") {
                    $scope.texto = "";
                    $scope.filtro.codigo = texto;
                    $scope.filtro.boton = false;
                    $scope.contenido.activo = 1;
                    $scope.contenido.titulo = "Departamento:";
                    $scope.titulo = titulo + " (" + texto + ")";
                    $scope.listar_resultado = [];
                    $scope.departamentos = response.data;
                    $scope.municipios = [];
                } else {
                    $scope.titulo = "";
                    $scope.filtro.codigo = "";
                    $scope.departamentos = [];
                    swal('404', 'Sin resultados para la busqueda de ' + texto, 'error');
                }
            });
        } else {
            swal('Error', 'Ingreso un campo vacio', 'error');
        }
    }
    $scope.listar_municipios = function (filtro, texto, cod_departamento, departamento) {
        $scope.filtro.datos = "";
        $http({
            method: 'POST',
            url: "php/salud/servicios_ips.php",
            data: {
                function: 'listar_municipios',
                tipo: (filtro) ? 'P' : 'P',
                texto: texto,
                departamento: cod_departamento
            }
        }).then(function (response) {
            if (validar_json(angular.toJson(response.data)) && response.data.length > 0 && response.data.length != "") {
                $scope.contenido.activo = 2;
                $scope.contenido.titulo = departamento + " / ";
                $scope.municipios = response.data;
            } else {
                swal('Error', 'No se encontraron municipios para el departamento:' + departamento, 'error');
            }
        });
    }
    $scope.listar_ips = function (filtro, texto, cod_municipio, municipio) {
        $scope.filtro.datos = "";
        $http({
            method: 'POST',
            url: "php/salud/servicios_ips.php",
            data: {
                function: 'listar_ips',
                tipo: (filtro) ? 'P' : 'P',
                texto: texto,
                municipio: cod_municipio,
            }
        }).then(function (response) {
            if (validar_json(angular.toJson(response.data)) && response.data.length > 0 && response.data.length != "") {
                $scope.contenido.activo = 3;
                $scope.contenido.titulo = $scope.contenido.titulo + municipio;
                $scope.datos_ips = response.data;
            } else {
                swal('Error', 'No se encontraron municipios para el departamento:' + departamento, 'error');
            }
        });
    }
    $scope.atras = function (contenido_activo) {
        $scope.contenido.activo = contenido_activo - 1;
        $scope.filtro.datos = "";
        switch (contenido_activo) {
            case 2:
                $scope.contenido.titulo = "Departamento:";
                break;
            case 3:
                $scope.contenido.titulo = $scope.contenido.titulo.substring($scope.contenido.titulo.indexOf("/") + 2, 0);
                break;
            default:
                break;
        }
    }
    angular.element(document).ready(function () {
        document.querySelector("#theme-settings").hidden = true;
    });
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
}]);