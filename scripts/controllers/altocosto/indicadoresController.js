'use strict';
angular.module('GenesisApp')
.controller('indicadoresController', ['$scope', '$http', 'altocostoHttp','ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller','$rootScope','$window',
function ($scope, $http, altocostoHttp, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
var vm = this;

    $scope.year = "0";
    $scope.DetalleIndicador = true;
    $scope.tituloindicador = 'Detalle';
    $scope.cargaryear = function(){
      $http({
         method:'POST',
         url:"php/altocosto/indicadores/indicadores.php",
         data: {function:'obteneryear'}
      }).then(function(response){
        $scope.years = response.data;
        $scope.year = $scope.years["0"].Codigo;
        $scope.carga = false;
      });
    }
    $scope.vergraficosindicadores = function(){
      $scope.DetalleIndicador = true;
      $scope.carga = false;
      if($scope.year == "0" || $scope.year == null || $scope.year == undefined){
        $scope.year = "0";
      }
      $http({
         method:'POST',
         url:"php/altocosto/indicadores/indicadores.php",
         data: {function:'obtenerindicadores',year:$scope.year}
      }).then(function(response){
         $scope.Indicadores = response.data;
         $scope.carga = true;
         $scope.calcularColor('CHTA', Number($scope.Indicadores.porcentajehtacap));
         $scope.calcularColor('CDM',Number($scope.Indicadores.porcentajedmcap));
         $scope.calcularColor('EHTA', Number($scope.Indicadores.porcentajehtaest));
         $scope.calcularColor('EDM',Number($scope.Indicadores.porcentajedmest));
         vm.hc5 = angular.element('#Indicadores').highcharts({
            chart: {
               type: 'pie',
               options3d: {
                  enabled: true,
                  alpha: 45,
                  beta: 0
               }
            },
            title: {
               text: 'INDICADORES '+$scope.year
            },
            tooltip: {
               pointFormat: '{series.name}'
            },
            plotOptions: {
              pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  depth: 45,
                  dataLabels: {
                      enabled: false,
                      format: '{point.name}'
                  },
                  showInLegend: true
              },
            },
            series: [{
               type: 'pie',
               name: 'Indicador',
               dataLabels:{
                  enabled:false,
                  formatter:function(){
                     if(this.y > 0)
                        return this.point.name;
                  }
               },
               data: [
                  {
                     name: $scope.Indicadores.Captacionhta,
                     y: 25,//Number($scope.Indicadores.cantparcialhtacaptados),
                     color: '#4CAF50',
                     //color: $scope.colorchta,
                     events: {
                        click: function () {
                          $scope.DetalleIndicador = false;
                          $scope.vergraficodetalle('CHTA');
                          $scope.tituloindicador = $scope.Indicadores.Captacionhta;
                        }
                     }
                  },
                  {
                     name: $scope.Indicadores.Captaciondm,
                     y: 25,//Number($scope.Indicadores.cantparcialdmcaptados),
                     color: '#8BC34A',
                     events: {
                        click: function () {
                          $scope.DetalleIndicador = false;
                          $scope.vergraficodetalle('CDM');
                          $scope.tituloindicador = $scope.Indicadores.Captaciondm;
                        }
                     }
                  },
                  {
                     name: $scope.Indicadores.Estudiohta,
                     y: 25,
                     color: '#CDDC39',
                     events: {
                        click: function () {
                           $scope.DetalleIndicador = false;
                           $scope.vergraficodetalle('EHTA');
                           $scope.tituloindicador = $scope.Indicadores.Estudiohta;
                        }
                     }
                  },
                  {
                     name: $scope.Indicadores.Estudiodm,
                     y: 25,
                     color: '#FFEB3B',
                     events: {
                        click: function () {
                         $scope.DetalleIndicador = false;
                         $scope.vergraficodetalle('EDM');
                         $scope.tituloindicador = $scope.Indicadores.Estudiodm;
                        }
                     }
                  }
               ]
            }]
         });
      });
    }
    $scope.vergraficodetalle = function(tipo){
      $http({
        method:'GET',
        url:"json/altocosto/renal/comodines.json"
      }).then(function(response){
        switch (tipo) {
          case 'CHTA':
             vm.hc3 = angular.element('#Detalleindicadores').highcharts({
               title: {
                   text: ''
               },
               xAxis: {
                   type: 'category'
               },
               yAxis: {
                 title: {
                         text: 'Cantidad de hipertensos captados'
                        }
               },
               labels: {
                   items: [{
                       html: 'Consolidado Captación Hipertensos',
                       style: {
                           left: '100px',
                           top: '2px',
                           color: 'black'
                       }
                   }]
               },
               lang: {
                    drillUpText: '< Atras',
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
               series: [
                         {
                           name: 'Hipertensos',
                           type: 'column',
                           colorByPoint: true,
                           data: [
                                   {
                                     name: 'HTA Reportados',
                                     y: Number($scope.Indicadores.cantparcialhtacaptados),
                                     color: $scope.colorchta,
                                     drilldown: 'Seccionales',
                                     events: {
                                        click: function () {
                                            $scope.tituloindicador = 'Hipertensos captados por Seccional';
                                        }
                                     }
                                   },
                                   {
                                        name: 'HTA Meta',
                                        y: Number($scope.Indicadores.cantidadtotalHipertenso),
                                        color: '#64DD17'
                                    }
                                 ]
                           },
                           {
                               type: 'spline',
                               name: 'Meta Indicador',
                               data: [Math.round(Number($scope.Indicadores.cantidadtotalHipertenso)*0.6), Math.round(Number($scope.Indicadores.cantidadtotalHipertenso)*0.6)],
                               color: 'black',
                               marker: {
                                   lineWidth: 5,
                                   lineColor: $scope.colorchta,//Highcharts.getOptions().colors[3],
                                   fillColor: 'white'
                               }
                           },
                           {
                              type: 'pie',
                              name: 'Porcentaje',
                              data: [{
                                  name: 'Reportados',
                                  y: Number($scope.Indicadores.porcentajehtacap),
                                  color: $scope.colorchta
                              }, {
                                  name: 'Meta',
                                  y: 100-Number($scope.Indicadores.porcentajehtacap),
                                  color: '#E0E0E0'
                              }],
                              center: [1, 10],
                              size: 50,
                              border: 1,
                              showInLegend: false,
                              dataLabels: {
                                  enabled: false
                              },
                              tooltip: {
                                 pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                              }
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
                    series: [{
                        type: 'column',
                        name: 'HTA Reportados',
                        id: 'Seccionales',
                        data: [
                            [
                              $scope.Indicadores.namehtacap8,
                              Number($scope.Indicadores.valhtacap8),
                              '#64DD17'
                            ],
                            [
                              $scope.Indicadores.namehtacap7,
                              Number($scope.Indicadores.valhtacap7),
                              '#FFD600'
                            ],
                            [
                              $scope.Indicadores.namehtacap6,
                              Number($scope.Indicadores.valhtacap6),
                              '#FF6D00'
                            ],
                            [
                              $scope.Indicadores.namehtacap5,
                              Number($scope.Indicadores.valhtacap5),
                              '#FF3D00'
                            ],
                            [
                              $scope.Indicadores.namehtacap4,
                              Number($scope.Indicadores.valhtacap4),
                              '#D50000'
                            ],
                            [
                              $scope.Indicadores.namehtacap3,
                              Number($scope.Indicadores.valhtacap3),
                              '#C51162'
                            ],
                            [
                              $scope.Indicadores.namehtacap2,
                              Number($scope.Indicadores.valhtacap2),
                              '#AA00FF'
                            ],
                            [
                              $scope.Indicadores.namehtacap1,
                              Number($scope.Indicadores.valhtacap1),
                              '#6200EA'
                            ]
                        ]
                    }
                    ]
                  }
             });
            break;
          case 'CDM':
            vm.hc3 = angular.element('#Detalleindicadores').highcharts({
              title: {
                  text: ''
              },
              xAxis: {
                   type: 'category'
              },
              yAxis: {
                title: {
                        text: 'Cantidad de diabeticos captados'
                       }
              },
              labels: {
                  items: [{
                      html: 'Consolidado Captación Diabeticos',
                      style: {
                          left: '100px',
                          top: '2px',
                          color: 'black' //(Highcharts.theme && Highcharts.theme.textColor) || 'black'
                      }
                  }]
              },
              lang: {
                   drillUpText: '< Atras'
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
              series: [
                          {
                            name: 'Diabetes mellitus',
                            type: 'column',
                            colorByPoint: true,
                            data: [
                                    {
                                      name: 'DM Reportados',
                                      y: Number($scope.Indicadores.cantparcialdmcaptados),
                                      color: $scope.colorcdm,
                                      drilldown: 'Seccionales',
                                      events: {
                                         click: function () {
                                           $scope.tituloindicador = 'Diabeticos captados por Seccional';
                                         }
                                      }
                                    },
                                    {
                                      name: 'DM Meta',
                                      y: Number($scope.Indicadores.cantidadtotalDiabeticos),
                                      color: '#64DD17'
                                     }
                                  ]
                            },
                            {
                                type: 'spline',
                                name: 'Meta Indicador',
                                data: [Math.round(Number($scope.Indicadores.cantidadtotalDiabeticos)*0.6), Math.round(Number($scope.Indicadores.cantidadtotalDiabeticos)*0.6)],
                                color: 'black',
                                marker: {
                                    lineWidth: 5,
                                    lineColor: $scope.colorcdm,//Highcharts.getOptions().colors[3],
                                    fillColor: 'white'
                                }
                            },
                            {
                               type: 'pie',
                               name: 'Porcentaje',
                               data: [{
                                   name: 'Reportados',
                                   y: Number($scope.Indicadores.porcentajedmcap),
                                   color: $scope.colorcdm
                               }, {
                                   name: 'Meta',
                                   y: 100-Number($scope.Indicadores.porcentajedmcap),
                                   color: '#E0E0E0'
                               }],
                               center: [1, 10],
                               size: 50,
                               border: 1,
                               showInLegend: false,
                               dataLabels: {
                                   enabled: false
                               }
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
                  series: [{
                      type: 'column',
                      name: 'DM Reportados',
                      id: 'Seccionales',
                      data: [
                          [
                            $scope.Indicadores.namedmcap8,
                            Number($scope.Indicadores.valdmcap8),
                            '#64DD17'
                          ],
                          [
                            $scope.Indicadores.namedmcap7,
                            Number($scope.Indicadores.valdmcap7),
                            '#FFD600'
                          ],
                          [
                            $scope.Indicadores.namedmcap6,
                            Number($scope.Indicadores.valdmcap6),
                            '#FF6D00'
                          ],
                          [
                            $scope.Indicadores.namedmcap5,
                            Number($scope.Indicadores.valdmcap5),
                            '#FF3D00'
                          ],
                          [
                            $scope.Indicadores.namedmcap4,
                            Number($scope.Indicadores.valdmcap4),
                            '#D50000'
                          ],
                          [
                            $scope.Indicadores.namedmcap3,
                            Number($scope.Indicadores.valdmcap3),
                            '#C51162'
                          ],
                          [
                            $scope.Indicadores.namedmcap2,
                            Number($scope.Indicadores.valdmcap2),
                            '#AA00FF'
                          ],
                          [
                            $scope.Indicadores.namedmcap1,
                            Number($scope.Indicadores.valdmcap1),
                            '#6200EA'
                          ]
                      ]
                  }
                  ]
                }
            });
            break;
          case 'EHTA':
            vm.hc3 = angular.element('#Detalleindicadores').highcharts({
              title: {
                  text: ''
              },
              xAxis: {
                  type: 'category'
              },
              yAxis: {
                title: {
                        text: 'Cantidad de hipertensos Estudiados'
                       }
              },
              labels: {
                  items: [{
                      html: 'Consolidado Estudio Hipertensos',
                      style: {
                          left: '100px',
                          top: '2px',
                          color: 'black'
                      }
                  }]
              },
              lang: {
                   drillUpText: '< Atras'
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
              series: [
                        {
                          name: 'Hipertensos',
                          type: 'column',
                          colorByPoint: true,
                          data: [
                                  {
                                    name: 'HTA Reportados',
                                    y: Number($scope.Indicadores.cantparcialhtaestudiados),
                                    color: $scope.colorehta,
                                    drilldown: 'HTA Reportados',
                                    events: {
                                       click: function () {
                                         $scope.tituloindicador = 'Hipertensos estudiados por Estadios';
                                       }
                                    }
                                  },
                                  {
                                       name: 'HTA Meta',
                                       y: Number($scope.Indicadores.cantparcialhtacaptados),
                                       color: '#64DD17'
                                   }
                                ]
                          },
                          // {
                          //     type: 'spline',
                          //     name: 'Meta Indicador',
                          //     data: [Math.round(Number($scope.Indicadores.cantparcialhtacaptados)*0.6), Math.round(Number($scope.Indicadores.cantparcialhtacaptados)*0.6)],
                          //     color: 'black',
                          //     marker: {
                          //         lineWidth: 5,
                          //         lineColor: $scope.colorehta,//Highcharts.getOptions().colors[3],
                          //         fillColor: 'white'
                          //     }
                          // },
                          {
                             type: 'pie',
                             name: 'Porcentaje',
                             data: [{
                                 name: 'Reportados',
                                 y: Number($scope.Indicadores.porcentajehtaest),
                                 color: $scope.colorehta
                             }, {
                                 name: 'Meta',
                                 y: 100-Number($scope.Indicadores.porcentajehtaest),
                                 color: '#E0E0E0'
                             }],
                             center: [1, 10],
                             size: 50,
                             border: 1,
                             showInLegend: false,
                             dataLabels: {
                                 enabled: false
                             },
                             tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                             }
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
                    series: [{
                        type: 'column',
                        name: 'HTA Reportados',
                        id: 'HTA Reportados',
                        data: [
                            [
                              $scope.Indicadores.namehtaest8,
                              Number($scope.Indicadores.valhtaest8),
                              '#64DD17'
                            ],
                            [
                              $scope.Indicadores.namehtaest7,
                              Number($scope.Indicadores.valhtaest7),
                              '#FFD600'
                            ],
                            [
                              $scope.Indicadores.namehtaest6,
                              Number($scope.Indicadores.valhtaest6),
                              '#FF6D00'
                            ],
                            [
                              $scope.Indicadores.namehtaest5,
                              Number($scope.Indicadores.valhtaest5),
                              '#FF3D00'
                            ],
                            [
                              $scope.Indicadores.namehtaest4,
                              Number($scope.Indicadores.valhtaest4),
                              '#D50000'
                            ],
                            [
                              $scope.Indicadores.namehtaest3,
                              Number($scope.Indicadores.valhtaest3),
                              '#C51162'
                            ],
                            [
                              $scope.Indicadores.namehtaest2,
                              Number($scope.Indicadores.valhtaest2),
                              '#AA00FF'
                            ],
                            [
                              $scope.Indicadores.namehtaest1,
                              Number($scope.Indicadores.valhtaest1),
                              '#6200EA'
                            ]
                        ]
                    }
                    ]
                  }
            });
            break;
          case 'EDM':
            vm.hc3 = angular.element('#Detalleindicadores').highcharts({
              chart: {
                  type: 'column'
              },
              title: {
                  text: ''
              },
              xAxis: {
                  type: 'category'
              },
              yAxis: {
                  title: {
                      text: 'Cantidad de diabeticos Estudiados'
                  }

              },
              labels: {
                  items: [{
                      html: 'Consolidado Estudio Diabeticos',
                      style: {
                          left: '100px',
                          top: '2px',
                          color: 'black'
                      }
                  }]
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
              lang: {
                  drillUpText: '< Atras'
              },
              navigation: {
                  buttonOptions: {
                      verticalAlign: 'bottom',
                      y: -20
                  }
              },
              series: [
                {
                  name: 'Diabeticos',
                  type: 'column',
                  colorByPoint: true,
                  data: [
                          {
                            name: 'DM Reportados',
                            y: Number($scope.Indicadores.cantparcialdmestudiados),
                            drilldown: 'DM Reportados',
                            color: $scope.coloredm,
                            events: {
                               click: function () {
                                 $scope.tituloindicador = 'Diabeticos estudiados por Seccional';
                               }
                            }
                          },
                          {
                               name: 'DM Meta',
                               y: Number($scope.Indicadores.cantparcialdmcaptados),
                               color: '#64DD17'
                           }
                        ]
                  },
                  // {
                  //     type: 'spline',
                  //     name: 'Meta Indicador',
                  //     data: [Math.round(Number($scope.Indicadores.cantparcialdmcaptados)*0.6), Math.round(Number($scope.Indicadores.cantparcialdmcaptados)*0.6)],
                  //     color: 'black',
                  //     marker: {
                  //         lineWidth: 5,
                  //         lineColor: $scope.coloredm,//Highcharts.getOptions().colors[3],
                  //         fillColor: 'white'
                  //     }
                  // },
                  {
                     type: 'pie',
                     name: 'Porcentaje',
                     data: [{
                         name: 'Reportados',
                         y: Number($scope.Indicadores.porcentajedmest),
                         color: $scope.coloredm
                     }, {
                         name: 'Meta',
                         y: 100-Number($scope.Indicadores.porcentajedmest),
                         color: '#E0E0E0'
                     }],
                     center: [1, 10],
                     size: 50,
                     border: 1,
                     showInLegend: false,
                     dataLabels: {
                         enabled: false
                     },
                     tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                     }
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
                  series: [{
                      type: 'column',
                      name: 'DM Reportados',
                      id: 'DM Reportados',
                      data: [
                          [
                            $scope.Indicadores.namedmest8,
                            Number($scope.Indicadores.valdmest8),
                            '#64DD17'
                          ],
                          [
                            $scope.Indicadores.namedmest7,
                            Number($scope.Indicadores.valdmest7),
                            '#FFD600'
                          ],
                          [
                            $scope.Indicadores.namedmest6,
                            Number($scope.Indicadores.valdmest6),
                            '#FF6D00'
                          ],
                          [
                            $scope.Indicadores.namedmest5,
                            Number($scope.Indicadores.valdmest5),
                            '#FF3D00'
                          ],
                          [
                            $scope.Indicadores.namedmest4,
                            Number($scope.Indicadores.valdmest4),
                            '#D50000'
                          ],
                          [
                            $scope.Indicadores.namedmest3,
                            Number($scope.Indicadores.valdmest3),
                            '#C51162'
                          ],
                          [
                            $scope.Indicadores.namedmest2,
                            Number($scope.Indicadores.valdmest2),
                            '#AA00FF'
                          ],
                          [
                            $scope.Indicadores.namedmest1,
                            Number($scope.Indicadores.valdmest1),
                            '#6200EA'
                          ]
                      ]
                  }
                  ]
                }
              });
            break;
          default:
        }
        });
    }
    $scope.calcularColor = function(tipo,val){
      if(val>=60){$scope.color = '#64DD17'}
      else if(val>=50){$scope.color = '#FFEA00'}
      else if(val>=40){$scope.color = '#FF9100'}
      else if(val>=30){$scope.color = '#FF3D00'}
      else if(val>=20){$scope.color = '#DD2C00'}
      else {$scope.color = '#FF1744'}
      switch (tipo) {
        case 'CHTA':
          $scope.colorchta = $scope.color;
          break;
        case 'CDM':
          $scope.colorcdm = $scope.color;
          break;
        case 'EHTA':
          $scope.colorehta = $scope.color;
          break;
        case 'EDM':
          $scope.coloredm = $scope.color;
          break;
        default:
      }
    }
}])
