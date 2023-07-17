'use strict';
angular.module('GenesisApp').controller('resolucion_4505_controller', ['$scope', '$http', function ($scope, $http) {
    $(document).ready(function () {
        $('.tabs').tabs();
    });
    $scope.tabs = { select: 1, historial: 1 };
    $scope.seleccionar = function (tab_numer) {
        $scope.tabs.select = tab_numer;
        switch (tab_numer) {
            case 1:
                $scope.tabs.historial = 1;
                break;
            case 2:
                indicadores();
                break;

            default:
                break;
        }
    }
    // Historial Cargue
    $scope.trimestre = "";
    $scope.trimestre_visual = "";
    $scope.CurrentDate = new Date();
    $scope.year = $scope.CurrentDate.getFullYear();
    $scope.yearNext = function () {
        $scope.year++;
    }
    $scope.yearPrev = function () {
        $scope.year--;
    }
    $scope.select_trimestre = function (trimestre) {
        $scope.trimestre = trimestre;
        switch (trimestre) {
            case 1:

                break;
            case 2:

                break;
            case 3:

                break;
            case 4:

                break;

            default:
                break;
        }
    }
    $scope.tab_cargue = { vista: false };
    // Indicadores
    function indicadores() {
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Cargue Trimestral Resolución 4505. 2019'
            },
            subtitle: {
                text: 'Clic en las columnas para ver las IPS.'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Total porcentaje cargado'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> del total<br/>'
            },

            series: [
                {
                    name: "Trimestres",
                    colorByPoint: true,
                    data: [
                        {
                            name: "Primer trimestre",
                            y: 62.74,
                            drilldown: "trimestre1",
                            color: "#00796b"
                        },
                        {
                            name: "Segundo trimestre",
                            y: 50.57,
                            drilldown: "trimestre2",
                            color: "#00796b"
                        },
                        {
                            name: "Tercer trimestre",
                            y: 80.23,
                            drilldown: "trimestre3",
                            color: "#00796b"
                        },
                        {
                            name: "Cuarto trimestre",
                            y: 37.62,
                            drilldown: null,
                            color: "#00796b"
                        }
                    ]
                }
            ],
            drilldown: {
                series: [
                    {
                        name: "Primer trimestre",
                        id: "trimestre1",
                        data: [
                            [
                                "DOMEDICAL SA",
                                30.1
                            ],
                            [
                                "APORTA TU GRANITO",
                                1.3
                            ],
                            [
                                "OISAMED",
                                53.02
                            ],
                            [
                                "ATLANMED",
                                1.4
                            ],
                            [
                                "JAMEDICAL",
                                0.88
                            ]
                        ]
                    },
                    {
                        name: "Segundo trimestre",
                        id: "trimestre2",
                        data: [
                            [
                                "v58.0",
                                1.02
                            ],
                            [
                                "v57.0",
                                7.36
                            ],
                            [
                                "v56.0",
                                0.35
                            ],
                            [
                                "v55.0",
                                0.11
                            ]
                        ]
                    },
                    {
                        name: "Tercer trimestre",
                        id: "trimestre3",
                        data: [
                            [
                                "v11.0",
                                6.2
                            ],
                            [
                                "v10.0",
                                0.29
                            ],
                            [
                                "v9.0",
                                0.27
                            ],
                            [
                                "v8.0",
                                0.47
                            ]
                        ]
                    }
                ]
            }
        });
    }
}]);