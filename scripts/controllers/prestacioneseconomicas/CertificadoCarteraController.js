'use strict';
angular.module('GenesisApp', [])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .controller('CertificadoCarteraController', ['$scope', '$http', '$location', '$timeout',
        function ($scope, $http, $location, $timeout) {


            $http({
                method: 'POST',
                url: "../../../php/prestaciones/funprestaciones.php",
                data: { function: 'ConsultarCertificadoCartera', nit: $location.search().nit }
            }).then(function (res) {
                if (res.data.length == 0) {
                    alert('No Hay Informacion');
                } else {
                    $scope.res = res.data;
                    $scope.NOMBRE_EMPRESA = $scope.res[0].NOMBRE_EMPRESA;
                    $scope.APO_DIRECCION = $scope.res[0].APO_DIRECCION;
                    $scope.APO_TELEFONO = $scope.res[0].APO_TELEFONO;
                    $scope.DEPARTAMENTO = $scope.res[0].DEPARTAMENTO;
                    $scope.MUNICIPIO = $scope.res[0].MUNICIPIO;
                    $http({
                        method: 'POST',
                        url: "../../../php/prestaciones/funprestaciones.php",
                        data: { function: 'ConsultarCertificadoCarteraDetalle', nit: $location.search().nit }
                    }).then(function (res) {
                        $scope.informacion = res.data;                        
                    })
                    $timeout(function () {
                        print(true);
                    }, 1000);
                }
            })
        }
    ]);



