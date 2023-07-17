'use strict';
angular.module('GenesisApp')
    .controller('modalgestion_grafica_solicitudCtrl', ['$scope', '$http', 'altocostoHttp', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
        function ($scope, $http, altocostoHttp, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {

            // $scope.series_diarias=[["25/01/2019", 20],["24/01/2019", 27],["23/01/2019", 24],["22/01/2019", 15]]
            var vm = this;

            $scope.tendencia = function () {
                $http({
                    method: 'POST',
                    url: "php/movilidad/funcmovilidad.php",
                    data: { function: 'Carga_Cantidades_Gestiones_mensual_solicitud' }
                }).then(function (response) {
                    $scope.gestiones_info_totales_mensual = response.data;
                });
                $http({
                    method: 'POST',
                    url: "php/movilidad/funcmovilidad.php",
                    data: { function: 'Carga_Cantidades_Gestiones_anual_solicitud' }
                }).then(function (response) {
                    $scope.gestiones_info_totales_anual = response.data;
                });
                $http({
                    method: 'POST',
                    url: "php/movilidad/funcmovilidad.php",
                    data: { function: 'Carga_Cantidades_Gestiones_diarias_solicitud' }
                }).then(function (response) {
                    $scope.gestiones_info_totales_diarias = response.data;
                    if (($scope.gestiones_info_totales_diarias != undefined) ||
                        ($scope.gestiones_info_totales_anual != undefined) ||
                        ($scope.gestiones_info_totales_mensual != undefined)) {
                            var gestiones_info_totales_mensual = JSON.stringify($scope.gestiones_info_totales_mensual);
                            var gestiones_info_totales_diarias = JSON.stringify($scope.gestiones_info_totales_diarias);
                            gestiones_info_totales_mensual=gestiones_info_totales_mensual.slice(1, (gestiones_info_totales_mensual.length-1));
                            gestiones_info_totales_diarias=gestiones_info_totales_diarias.slice(1, (gestiones_info_totales_diarias.length-1));
                            console.log( gestiones_info_totales_mensual);
                            console.log( gestiones_info_totales_diarias);
                            $scope.res = "["+gestiones_info_totales_mensual+","+gestiones_info_totales_diarias +"]";
                        
                        console.log( $scope.res);
                        $scope.res = JSON.parse($scope.res);
                        $scope.grafica();
                    }
                });
               
            }

            $scope.tendencia();

            $scope.grafica = function () {
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
                        text: 'Consolidado de Registro de Afiliaciones'
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
                        drillUpText: ' << ATRAS',

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
                            "name": "AÑOS",
                            "colorByPoint": true,
                            "data": $scope.gestiones_info_totales_anual
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
                        series:   $scope.res
                        /*,
                 {
                   id: 'Hours',
                   data: [1, 2, 3]
               }*/
                    }
                });
            }



        }])