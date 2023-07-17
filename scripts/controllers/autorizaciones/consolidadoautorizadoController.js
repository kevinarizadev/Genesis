'use strict';
angular.module('GenesisApp')
    .controller('consolidadoautorizadoController', ['$http', '$timeout', '$scope', 'ngDialog', 'consultaHTTP', 'afiliacionHttp', 'notification', 'cfpLoadingBar', '$rootScope', '$controller', 'communication',
        function($http, $timeout, $scope, ngDialog, consultaHTTP, afiliacionHttp, notification, cfpLoadingBar, $rootScope, $controller, communication) {
            var vm = this;
            $scope.Temp = [];
            $scope.listConsolidadoProSec = [];
                $scope.listConsolidadotemp = [];
                $scope.listConsolidadoGrupo = [];
            $scope.total = 0;
            $scope.totallist = 0;
            $scope.canttotal = 0;
            $scope.ubicacion = Number(sessionStorage.getItem('municipio'));

            $scope.loadInfo = function(ubi) {
                $scope.ubicaciont = ubi;
                $scope.listConsolidadoProSec = [];
                $scope.listConsolidadotemp = [];
                $scope.listConsolidadoGrupo = [];
                $scope.Temp = [];
                $scope.total = 0;
                $scope.totallist = 0;
                $scope.canttotal = 0;
                swal({ title: 'Consolidando Información' });
                swal.showLoading();
                $scope.anno = Number(new Date().getFullYear());
                $scope.periodo = Number(new Date().getMonth()) + 1;
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacion/funcautorizacion.php",
                    data: { function: 'obtenerConsolidadoProyeccionSec', ubicacion: $scope.ubicaciont, periodo: $scope.periodo, anno: $scope.anno }
                }).then(function(response) {
                    $scope.listConsolidadoProSec = response.data[0];
                })
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacion/funcautorizacion.php",
                    data: { function: 'obtenerConsolidadoAutorizadoDia', ubicacion: $scope.ubicaciont }
                }).then(function(response) {
                    $scope.listConsolidadotemp = response.data;
                    for (const i in $scope.listConsolidadotemp) {
                        $scope.listConsolidadotemp[i].VALOR = Number($scope.listConsolidadotemp[i].VALOR.replace(",", "."));
                        $scope.totallist = $scope.totallist + $scope.listConsolidadotemp[i].VALOR;
                        $scope.canttotal = $scope.canttotal + Number($scope.listConsolidadotemp[i].CANTIDAD);
                    }
                    $scope.listConsolidado = $scope.listConsolidadotemp;

                })
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacion/funcautorizacion.php",
                    data: { function: 'obtenerConsolidadoAutorizadoGrupo', ubicacion: $scope.ubicaciont }
                }).then(function(response) {
                    $scope.listConsolidadoGrupo = response.data;

                    for (const i in $scope.listConsolidadoGrupo) {
                        $scope.total = $scope.total + Number($scope.listConsolidadoGrupo[i].VALOR)
                    }
                    for (const i in $scope.listConsolidadoGrupo) {
                        $scope.Temp.push({
                            name: $scope.listConsolidadoGrupo[i].MUNICIPIO,
                            y: Number((Number($scope.listConsolidadoGrupo[i].VALOR) / $scope.total).toFixed(2)) * 100,
                            valor: $scope.listConsolidadoGrupo[i].VALOR_SF
                        });
                    }
                    swal.close();
                    vm.hc4 = angular.element('#container').highcharts({
                        chart: {
                            type: 'pie',
                            options3d: {
                                enabled: true,
                                alpha: 45
                            }
                        },
                        title: {
                            text: "Porcentaje Autorizado"
                        },
                        tooltip: {
                            pointFormat: 'Porcentaje: <b>{point.y} %</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                depth: 45,
                                dataLabels: {
                                    enabled: true,
                                    format: '<b style="font-size: inherit;">{point.name} </b> <b><strong style="font-size: inherit;">{point.valor}</strong></b>',
                                    style: {
                                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                    },
                                    connectorColor: 'silver'
                                },
                                showInLegend: false
                            }
                        },
                        series: [{
                            name: 'Autorizaciones',
                            data: $scope.Temp
                        }]
                    });

                })
            }
            $scope.loadInfo($scope.ubicacion);
            $scope.calcWidthPers = function(width) {
                if (width === undefined) {
                    return;
                }
                var val = width.toFixed(2) + '%'
                return { 'width': val }

            }

        }
    ]).filter('total', function() {
        return function(input, property) {
            function currencyFormat(num) {
                return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            }
            var i = input.length;
            var total = 0;
            while (i--)
                total += input[i][property];
            return currencyFormat(total);
        }
    });