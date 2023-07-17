'use strict';
angular.module('GenesisApp')
    .controller('IndicadoresController', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar', '$window',
        function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar, $window) {
            $('.carousel.carousel-slider').carousel({
                fullWidth: true,
                indicators: true
              });
                    
              $scope.hide = 0;
              $scope.mes = ' ';
              $scope.pestana = function(valor){
                $scope.hide = valor-1;
              }
              $scope.actualizapie = function(){
                 swal('Ha ocurrido algo', 'Estamos trabajando en este proceso', 'error')
              }
            //   $scope.anno = ;
            //   $scope.mes = ;
            var vm = this;
            $scope.pietickets = function () {
                $http({
                    method: 'POST',
                    url: "php/talentohumano/Indicadores.php",
                    data: { function: 'P_OBTENER_REP_EVENTOPRO',
                            ano:'2018',
                            mes: ''}
                }).then(function (response) {
                    //   [{"cantidad":3,"evento":"EDUCACION"},{"cantidad":9,"evento":"REINDUCCION"},
                    //   {"cantidad":12,"evento":"ENTRENAMIENTO"},{"cantidad":151,"evento":"INDUCCION"},{"cantidad":290,"evento":"CAPACITACION"},{"cantidad":465,"evento":"TOTAL EVENTO PROGRAMADO"}]
                    /*[{"ACTIVOS":1341,"PROCESADOS":359,"TOTAL":1700}]*/
                    $scope.respuesta = response.data;
                    $scope.EDUCACION = response.data[0].cantidad;
                    $scope.REINDUCCION = response.data[1].cantidad;
                    $scope.ENTRENAMIENTO = response.data[2].cantidad;
                    $scope.INDUCCION = response.data[3].cantidad;
                    $scope.CAPACITACION = response.data[4].cantidad;
                    $scope.TOTAL = response.data[5].cantidad;




                    vm.hc4 = angular.element('#pietickets').highcharts({
                        chart: {
                            type: 'column',
                        },
                        xAxis: {
                            type: 'category'
                        },
                        yAxis: {
                            title: {
                                text: 'Cantidad'
                            }
                        },
                        title: {
                            text: 'Total eventos programados: ' + Number($scope.TOTAL)
                        },

                        colors: ['rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')'],
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.y}</b>'
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
                        series: [{
                            name: ['Eventos Programados'],
                            type: 'column',
                            colorByPoint: true,
                            data: [
                                { name: $scope.respuesta["0"].evento, y: Number($scope.EDUCACION) },
                                { name: $scope.respuesta["1"].evento, y: Number($scope.REINDUCCION) },
                                { name: $scope.respuesta["2"].evento, y: Number($scope.ENTRENAMIENTO) },
                                { name: $scope.respuesta["3"].evento, y: Number($scope.INDUCCION) },
                                { name: $scope.respuesta["4"].evento, y: Number($scope.CAPACITACION) }
                            ]
                        }]
                    });


                });
            }
            $scope.barranoprog = function () {
                $http({
                    method: 'POST',
                    url: "php/talentohumano/Indicadores.php",
                    data: { function: 'P_OBTENER_REP_EVENTONOPRO' }
                }).then(function (response) {

                    $scope.totalnoprog = Number(response.data["0"].cantidad) + Number(response.data["1"].cantidad);
                    vm.hc4 = angular.element('#barranoprog').highcharts({
                        chart: {
                            type: 'column',
                        },
                        xAxis: {
                            type: 'category'
                        },
                        yAxis: {
                            title: {
                                text: 'Cantidad'
                            }
                        },
                        title: {
                            text: 'Total eventos NO programados: ' + Number($scope.totalnoprog)
                        },

                        colors: ['rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')'],
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.y}</b>'
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
                        series: [{
                            name: ['Eventos No Programados'],
                            type: 'column',
                            colorByPoint: true,
                            data: [
                                { name: response.data["0"].evento, y: Number(response.data["0"].cantidad) },
                                { name: response.data["1"].evento, y: Number(response.data["1"].cantidad) }
                            ]
                        }]
                    });


                });
            }
            $scope.randomnumber = function () {
                return Math.floor((Math.random() * 255) + 1);
            }
            $scope.radar = function () {

                $http({
                    method: 'POST',
                    url: "php/talentohumano/Indicadores.php",
                    data: { function: 'P_OBTENER_REP_DISTRIBUCION' }
                }).then(function (response) {
                    $scope.totalradar = response.data[0].cantidad + 
                    response.data[1].cantidad + 
                    response.data[2].cantidad + 
                    response.data[3].cantidad + 
                    response.data[4].cantidad +
                    response.data[5].cantidad + 
                    response.data[6].cantidad + 
                    response.data[7].cantidad ;
                    $scope.totalnacional = response.data[7].cantidad;
                   
                
                    vm.hc4 = angular.element('#radar').highcharts({
                        chart:
                        {
                            polar: true,
                            type: 'line'
                        },

                        title: {
                            text: 'Eventos en sede nacional: ' +$scope.totalnacional,
                            x: -80
                        },

                        pane: {
                            size: '80%'
                        },

                        xAxis: {
                            categories: [response.data[0].sede,
                             response.data[1].sede,
                              response.data[2].sede, response.data[3].sede, 
                              response.data[4].sede],
                            tickmarkPlacement: 'on',
                            lineWidth: 0
                        },

                        yAxis: {
                            gridLineInterpolation: 'polygon',
                            lineWidth: 0,
                            min: 0
                        },

                        tooltip: {
                            shared: true,
                            pointFormat: '<span style="color:{black}">{series.name}: <b>{point.y}</b><br/>'
                        },

                        legend: {
                            align: 'right',
                            verticalAlign: 'top',
                            y: 70,
                            layout: 'vertical'
                        },

                        series: [{
                            name: 'Eventos por oficina',
                            data: [
                                { name: response.data[0].sede, y: Number(response.data[0].cantidad)},
                                { name: response.data[1].sede, y: Number(response.data[1].cantidad)},
                                { name: response.data[2].sede, y: Number(response.data[2].cantidad)},
                                { name: response.data[3].sede, y: Number(response.data[3].cantidad)},
                                { name: response.data[4].sede, y: Number(response.data[4].cantidad)},
                                { name: response.data[5].sede, y: Number(response.data[5].cantidad)},
                                 { name: response.data[6].sede, y: Number(response.data[6].cantidad)}
                                //  ,
                                // { name: response.data[7].sede, y: Number(response.data[7].cantidad)},
                            ],
                            pointPlacement: 'on'
                        }]


                    });


                });

            }
            $scope.drill = function () {
                $http({
                    method: 'POST',
                    url: "php/talentohumano/Indicadores.php",
                    data: { function: 'P_OBTENER_REP_AREAFUNCIONAL' }
                }).then(function (response) {
                    $scope.totalpie = Number(response.data["0"].cantidad) +
                        Number(response.data["1"].cantidad) +
                        Number(response.data["2"].cantidad) +
                        Number(response.data["3"].cantidad) +
                        Number(response.data["4"].cantidad) +
                        Number(response.data["5"].cantidad) +
                        Number(response.data["6"].cantidad) +
                        Number(response.data["7"].cantidad) +
                        Number(response.data["8"].cantidad) +
                        Number(response.data["9"].cantidad) +
                        Number(response.data["10"].cantidad) +
                        Number(response.data["11"].cantidad) +
                        Number(response.data["12"].cantidad) +
                        Number(response.data["13"].cantidad) +
                        Number(response.data["14"].cantidad) +
                        Number(response.data["15"].cantidad) +
                        Number(response.data["16"].cantidad) +
                        Number(response.data["17"].cantidad) +
                        Number(response.data["18"].cantidad);

                    $scope.y = Number(response.data["0"].cantidad) +
                        Number(response.data["1"].cantidad) +
                        Number(response.data["2"].cantidad) +
                        Number(response.data["3"].cantidad) +
                        Number(response.data["4"].cantidad) +
                        Number(response.data["5"].cantidad) +
                        Number(response.data["6"].cantidad) +
                        Number(response.data["7"].cantidad) +
                        Number(response.data["8"].cantidad);

                    Highcharts.setOptions({
                        lang: {
                            drillUpText: '<Volver a vista General'
                        }
                    });

                    vm.hc4 = angular.element('#drill').highcharts({

                        chart: {
                            type: 'pie'
                        },
                        colors: ['rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')'],
                        title: {
                            text: 'Concentracion por area funcional'
                        },
                        plotOptions: {
                            series: {
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.name}: {point.y}'
                                }
                            }
                        },

                        tooltip: {
                            headerFormat: '<span style="font-size:11px">Area funcional</span><br>',
                            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> de ' + $scope.totalpie
                        },

                        "series": [
                            {
                                "name": "Browsers",
                                "colorByPoint": true,
                                data: [
                                    {
                                        "name": "Otros",
                                        "y": $scope.y,
                                        "drilldown": "others"
                                    },
                                    { name: response.data["9"].area, y: Number(response.data["9"].cantidad) },
                                    { name: response.data["10"].area, y: Number(response.data["10"].cantidad) },
                                    { name: response.data["11"].area, y: Number(response.data["11"].cantidad) },
                                    { name: response.data["12"].area, y: Number(response.data["12"].cantidad) },
                                    { name: response.data["13"].area, y: Number(response.data["13"].cantidad) },
                                    { name: response.data["14"].area, y: Number(response.data["14"].cantidad) },
                                    { name: response.data["15"].area, y: Number(response.data["15"].cantidad) },
                                    { name: response.data["16"].area, y: Number(response.data["16"].cantidad) },
                                    { name: response.data["17"].area, y: Number(response.data["17"].cantidad) },
                                    { name: response.data["18"].area, y: Number(response.data["18"].cantidad) }
                                ]
                            }
                        ],
                        "drilldown": {
                            "series": [
                                {
                                    "name": "Otros",
                                    "id": "others",
                                    "data": [
                                        { name: response.data["0"].area, y: Number(response.data["0"].cantidad) },
                                        { name: response.data["1"].area, y: Number(response.data["1"].cantidad) },
                                        { name: response.data["2"].area, y: Number(response.data["2"].cantidad) },
                                        { name: response.data["3"].area, y: Number(response.data["3"].cantidad) },
                                        { name: response.data["4"].area, y: Number(response.data["4"].cantidad) },
                                        { name: response.data["5"].area, y: Number(response.data["5"].cantidad) },
                                        { name: response.data["6"].area, y: Number(response.data["6"].cantidad) },
                                        { name: response.data["7"].area, y: Number(response.data["7"].cantidad) },
                                        { name: response.data["8"].area, y: Number(response.data["8"].cantidad) }
                                    ]
                                }
                            ]
                        }

                    });


                });

            }
            $scope.piefac  = function () {
                $http({
                    method: 'POST',
                    url: "php/talentohumano/Indicadores.php",
                    data: { function: 'P_OBTENER_REP_INTERNO' }
                }).then(function (response) {
                    [{"interno":117,"externo":349}]
                    $scope.totalfac = Number(response.data[0].interno) + Number(response.data[0].externo);
                    vm.hc4 = angular.element('#piefac').highcharts({
                      
                        chart: {
                            type: 'pie'
                        },
                        colors: ['rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')',
                        'rgb(' + $scope.randomnumber() + ',' + $scope.randomnumber() + ',' + $scope.randomnumber() + ')'],
                        title: {
                            text: 'Distribución de acuerdo a tipo de facilitador'
                        },
                        plotOptions: {
                            series: {
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.name}: {point.y}'
                                }
                            }
                        },

                        tooltip: {
                            headerFormat: '<span style="font-size:11px">Distribucion por facilitador</span><br>',
                            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> de ' + $scope.totalfac
                        },

                        "series": [
                            {
                                "name": "Browsers",
                                "colorByPoint": true,
                                data: [
                                    { name: 'Internos', y: Number(response.data["0"].interno) },
                                    { name: 'Externos', y: Number(response.data["0"].externo) }
                                ]
                            }
                        ]

                     });


                });
            }

            
            

        }]);