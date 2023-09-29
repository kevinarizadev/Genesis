'use strict';
angular.module('GenesisApp', []).config(function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }).controller('infodemandactrl', ['$scope', '$http', '$location', '$timeout',
        function ($scope, $http, $location, $timeout) {
            $scope.cod_demanda = $location.search().codigo_demanda;

            $http({
                method: 'POST',
                url: "../../../../php/juridica/demandas/funcdemandas.php",
                data: {
                    function: 'obtenerdemanda',
                    numerodemanda: $scope.cod_demanda
                }
            }).then(function (response) {
                $scope.registro = response.data;
            });

            $scope.listaActuaciones = function () {
                $http({
                    method: 'POST',
                    url: "../../../../php/juridica/demandas/funcdemandas.php",
                    data: {
                        function: 'listaactuaciones',
                        codigo_demanda: $scope.cod_demanda
                    }
                }).then(function (response) {
                    $scope.Actuaciones = response.data;
                });
            }
            $scope.listaActuaciones();
        }
    ]);