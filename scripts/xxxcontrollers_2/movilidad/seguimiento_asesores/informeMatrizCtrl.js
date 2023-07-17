'use strict';
angular.module('GenesisApp', []).config(function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}).controller('informeMatrizCtrl', ['$scope', '$http', '$location', '$timeout',
    function ($scope, $http, $location, $timeout) {
        $scope.fecha = $location.search().fecha;
        $scope.cod_asesor = $location.search().cod_asesor;
        $scope.tipo_proceso = $location.search().tipo_proceso;


        switch ($scope.tipo_proceso) {
            case 'A':
                $http({
                    method: 'POST',
                    url: "../../../php/movilidad/seguimiento_asesores/funcseguimiento.php",
                    data: {
                        function: 'consultarAfiliacion',
                        fecha: $scope.fecha,
                        codigo_asesor: $scope.cod_asesor,
                        tipo_proceso: 'A'
                    }
                }).then(function (response) {
                    $scope.dataRegistrosAfiliacion = response.data;
                    $scope.totalFormularios = $scope.dataRegistrosAfiliacion.length;
                    if (response.data.length > 0) {
                        // swal('Error', response.data.mensaje, 'error');
                        setTimeout(function () {
                            window.print();
                        }, 500);
                    }
                    //  else {
                    //     $scope.hdeTablaAfiliacion = false;
                    // }
                });
                break;
            case 'E':
                $http({
                    method: 'POST',
                    url: "../../../php/movilidad/seguimiento_asesores/funcseguimiento.php",
                    data: {
                        function: 'consultarAfiliacion',
                        fecha: $scope.fecha,
                        codigo_asesor: $scope.cod_asesor,
                        tipo_proceso: 'E'
                    }
                }).then(function (response) {
                    $scope.dataRegistrosAfiliacion = response.data;
                    $scope.totalFormularios = $scope.dataRegistrosAfiliacion.length;
                    if (response.data.length > 0) {
                        // swal('Error', response.data.mensaje, 'error');
                        setTimeout(function () {
                            window.print();
                        }, 500);
                    }
                    //  else {
                    //     $scope.hdeTablaAfiliacion = false;
                    // }
                });
                break;        
            default:
                break;
        }
        
    }
]);