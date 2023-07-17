'use strict';
angular.module('GenesisApp')
    .controller('modalgestion_graficaCtrl', ['$scope', '$http', 'altocostoHttp', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
        function ($scope, $http, altocostoHttp, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
     
            // $scope.series_diarias=[["25/01/2019", 20],["24/01/2019", 27],["23/01/2019", 24],["22/01/2019", 15]]
            var vm = this;


            $http({
                method: 'POST',
                url: "php/movilidad/funcmovilidad.php",
                data: { function: 'Carga_Cantidades_Gestiones_mensual' }
            }).then(function (response) {
                $scope.gestiones_info_totales_mensual=response.data;
            });



            $scope.tendencia = function () {
                $http({
                    method: 'POST',
                    url: "php/movilidad/funcmovilidad.php",
                    data: { function: 'Carga_Cantidades_Gestiones_diarias' }
                }).then(function (response) {
                    $scope.gestiones_info_totales_diarias=response.data;
                    console.log($scope.gestiones_info_totales_diarias);
                    vm.hc5 = angular.element('#gestion_grafica').highcharts({
                        chart: {
                            type: 'column',
                            options3d: {
                                enabled: true,
                                alpha: 20,
                                beta: 0
                            }
                        },
                        title: {
                            text: 'Consolidado de Registro Empresas'
                        },
                        xAxis: {
                            type: 'category'
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Cantidad De Registro'
                            }
                        },
                        labels: {
                            items: [{
                                html: '',
                                style: {
                                    left: '100px',
                                    top: '2px',
                                    color: 'black'
                                }
                            }]
                        },
                        lang: {
                            drillUpText: ' << MESES',
                          
                        },
                        
                        plotOptions: {
                            series: {
                                borderWidth: 0,
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.y}'
                                }
                            }
                        },
                        navigation: {
                            buttonOptions: {
                                verticalAlign: 'bottom',
                                y: -20
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:14px;color:{series.color}">{point.y} Registro de Nuevas Empresas</span><table>',
                            pointFormat: '<tr></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            series: {
                                borderWidth: 0,
                                dataLabels: {
                                    enabled: true,
                                    format: '<spam style="font-size: larger;">{point.y}</spam>'
                                }
                            }
                        },
                        series: [
                            {
                                "name": "Meses",
                                "colorByPoint": true,
                                "data": $scope.gestiones_info_totales_mensual
                            }
                        ],
                        drilldown: {
                            drillUpButton: {
                                relativeTo: 'spacingBox',
                                position: {
                                    y: -9,
                                    x: -45
                                },
                                theme: {
                                     fill: '#BDBDBD',
                                     'stroke-width': 2,
                                     stroke: '#757575',
                                     r: 0,
                                     states: {
                                        hover: {
                                             fill: '#757575',
                                             stroke: '#BDBDBD'
                                        },
                                         select: {
                                             stroke: '#757575',
                                             fill: '#BDBDBD'
                                        }
                                    }
                               }
                            },
                            series: $scope.gestiones_info_totales_diarias
                        }
                    });
                   
              
                });
            }
           


        }])