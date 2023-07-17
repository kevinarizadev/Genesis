'use strict';
angular.module('GenesisApp').controller('consulta_usuario_ips_controller', ['$scope', '$http', function ($scope, $http) {
    $scope.consulta_usuario_ips = { usuarios_ips: new Array(), nit: "", nombre: "" };
    $scope.buscar_usuario_ips = function (nit) {
        if (nit != "" && nit != undefined) {
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
                url: "php/cuentasmedicas/consulta_usuario_ips.php",
                data: {
                    function: 'buscar_usuario_ips',
                    nit: nit
                }
            }).then(function (response) {
                swal.close();
                if (validar_json(angular.toJson(response.data))) {
                    if (response.data.length == 0) {
                        swal('Mensaje', 'No se encontro ningun resultado para la busqueda del NIT: ' + nit, 'info');
                        $scope.consulta_usuario_ips.usuarios_ips = new Array();
                        $scope.consulta_usuario_ips.nit = "";
                        $scope.consulta_usuario_ips.nombre = "";
                    } else {
                        $scope.consulta_usuario_ips.usuarios_ips = response.data;
                        $scope.consulta_usuario_ips.nit = response.data[0].NIT;
                        $scope.consulta_usuario_ips.nombre = response.data[0].NOMBRE_IPS;
                    }                
                } else {
                    $scope.consulta_usuario_ips.usuarios_ips = new Array();
                    $scope.consulta_usuario_ips.nit = "";
                    $scope.consulta_usuario_ips.nombre = "";
                    swal('Error', 'Error al realizar la busqueda de los usuarios del NIT: ' + nit, 'error');
                }
            });
        } else {
            swal('Advertencia', 'Ingrese un NIT valido para realizar la busqueda', 'warning');
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
}]);