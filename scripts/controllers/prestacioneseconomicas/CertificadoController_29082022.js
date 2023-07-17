'use strict';
angular.module('GenesisApp', [])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .controller('CertificadoController', ['$scope', '$http', '$location', '$timeout',
        function ($scope, $http, $location, $timeout) {
            $http({
                method: 'POST',
                url: "../../../php/prestaciones/funprestaciones.php",
                data: { function: 'ConsultarCertificado', tipo: $location.search().tipo, documento: $location.search().documento, inicial: $location.search().inicial, final: $location.search().final }
            }).then(function (res) {

                if (res.data.length == 0) {
                    alert('No Hay Informacion');
                } else {
                    $scope.res = res.data;
                    $scope.Inicial = $location.search().inicial;
                    $scope.Final = $location.search().final;
                    $scope.Tipo = $location.search().tipo;

                    if ($scope.Tipo == 'A') {
                        $scope.empresa = "Que el Afiliado";
                        $scope.nombreempresa = res.data[0].NOMBRE_AFILIADO;
                        $scope.tipo_afiliado = res.data[0].PREC_AFILIADO_TIPO;
                        $scope.doc_afiliado = res.data[0].PREC_AFILIADO_DOC;
                        $scope.nit = res.data[0].PREC_AFILIADO;
                    } else {
                        $scope.nit = "NIT " + res.data[0].NIT;
                        $scope.nombreempresa = res.data[0].NOMBREEMPRESA;
                        $scope.nombreempresa2 = res.data[0].EMPRESA;
                        $scope.tipo_documento_empresa = res.data[0].TIPODOCUMENTO;
                        $scope.nit2 = res.data[0].NIT;
                        $scope.empresa = "Que la empresa";
                    }

                    if ($scope.Inicial == '' || $scope.Final == '') {
                        $scope.punto = ":";
                    } else {
                        $scope.rango = "para el rango " + $scope.Inicial + " a " + $scope.Final + " :";
                    }
                    console.log(res.data);
                    $timeout(function () {
                        print(true);
                    }, 1000);
                }
            })
        }
    ]);



