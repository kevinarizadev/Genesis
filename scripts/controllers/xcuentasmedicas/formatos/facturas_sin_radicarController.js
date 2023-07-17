angular.module('GenesisApp', []).config(function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}).controller('facturas_sin_radicarController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
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
    $scope.datos = new Array();
    $scope.total = 0;
    $scope.consecutivo = "";
    $scope.fecha = "";
    if (validar_json($location.search().datos)) {
        $http({
            method: 'POST',
            url: "../../../php/cuentasmedicas/rips/funcRips.php",
            data: {
                function: 'obtener_factura',
                nit: JSON.parse($location.search().datos).nit,
                habilitacion: JSON.parse($location.search().datos).habilitacion,
                recibo: JSON.parse($location.search().datos).recibo,
                proceso: JSON.parse($location.search().datos).codigo
            }
        }).then(function (response) {
            if (response.data.detalle.length > 0) {
                $scope.datos = response.data.detalle;
                $scope.datos.forEach(element => {
                    $scope.total += parseInt(element.valor_fact);
                });
            } else {
                $scope.datos = new Array();
            }
            $scope.consecutivo = response.data.consecutivo;
            $scope.fecha = response.data.fecha;
        })
        // $scope.datos = JSON.parse($location.search().datos).detalle;
    } else {
        window.close();
    }
    $scope.formatPeso2 = function (num) {
        if (num != undefined && num != null && num != "") {
            var regex2 = new RegExp("\\.");
            if (regex2.test(num)) {
                num = num.toString().replace('.', ',');
                num = num.split(',');
                num[0] = num[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
                num[0] = num[0].split('').reverse().join('').replace(/^[\.]/, '');
                if (num[1].length > 1 && num[1].length > 2) {
                    num[1] = num[1].toString().substr(0, 2);
                }
                if (num[1].length == 1) {
                    num[1] = num[1] + '0';
                }
                return num[0] + ',' + num[1];
            } else {
                num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
                num = num.split('').reverse().join('').replace(/^[\.]/, '');
                return num + ',00';
            }
        }
    }
}]);