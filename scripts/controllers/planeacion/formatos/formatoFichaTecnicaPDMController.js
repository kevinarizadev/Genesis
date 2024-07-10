
'use strict';
angular.module('GenesisApp', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('formatoFichaTecnicaPDMController', ['$scope', '$http', '$timeout', '$location', '$sce', '$q',
    function ($scope, $http, $location, $sce, $q) {
      $(document).ready(function () {
        $scope.trustSrc = function (src) {
          return $sce.trustAsResourceUrl(src);
        }
        $scope.getData()
      });


      ////////////////////////////////////////////////

      $scope.getData = function () {
        $http({
          method: 'POST',
          url: "../../../php/planeacion/procesospoa.php",
          data: {
            function: 'P_DESCARGA_FICHA_TECNICA_PDM',
            cod_pdm: $location.search().cod_pdm.toString()
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br' || data != 0) {
            $scope.datos = data[0];
            $scope.datosMeses = JSON.parse(data[0].DATOS);
            $scope.generarGrafica($scope.datos, $scope.datosMeses);
            // console.log(data[0])
            // console.log(JSON.parse(data[0].DATOS));

            setTimeout(() => {
              window.print()
             }, 3500);

          } else {
            // setTimeout(function () {
            //   window.close();
            // }, 10);
          }
        });
      }

      $scope.generarGrafica = function (x, data) {
        $scope.modalGraficoVars = {
          listado: data
        }
        setTimeout(() => {
          var dataMeses, dataSerie, dataMeta = [], dataPlotBands, dato1_Max, dato2_Min, dato2_Max, dato3_Min

          if (x.TIPO.split('-')[0] == 'A') { // Orden Ascendente
            dato1_Max = parseFloat(x.REGC_DATO1);
            dato2_Min = dato1_Max
            dato2_Max = dato2_Min + parseFloat(x.REGC_DATO2);
            dato3_Min = dato2_Max;

            $scope.datos.valorAlto = [dato3_Min, parseFloat(x.REGC_DATOMAX)].join(' - ');
            $scope.datos.valorMedio = [dato2_Min, dato2_Max].join(' - ');
            $scope.datos.valorBajo = [0, dato1_Max].join(' - ');

            dataPlotBands = [
              {
                color: 'hsl(206deg 90% 69.5% / 10%)', // Color value
                from: parseFloat(x.REGC_DATOMAX),
                to: 10000000,
                label: {
                  text: 'Exceso'
                }
              },
              { // Light air
                from: 0,
                to: dato1_Max,
                color: 'rgba(255, 0, 0, 0.2)',
                label: {
                  text: 'Baja',
                  style: {
                    color: '#000000'
                  }
                }

              }, { // Light breeze
                from: dato2_Min,
                to: dato2_Max,
                color: 'rgba(255, 255, 0, 0.3)',
                label: {
                  text: 'Media',
                  style: {
                    color: '#000000'
                  }
                }
              }, { // Light breeze
                from: dato3_Min,
                to: parseFloat(x.REGC_DATOMAX),
                color: 'rgba(0, 128, 0, 0.3)',
                label: {
                  text: 'Alta',
                  style: {
                    color: '#000000'
                  }
                }
              }
            ]
          } else { // Orden Descendente
            dato3_Min = parseFloat(x.REGC_DATOMAX) - parseFloat(x.REGC_DATO1);
            dato2_Max = dato3_Min
            dato2_Min = dato2_Max - parseFloat(x.REGC_DATO2);
            dato1_Max = dato2_Min;

            $scope.datos.valorAlto = [parseFloat(x.REGC_DATOMAX), dato3_Min].join(' - ');
            $scope.datos.valorMedio = [dato2_Max, dato2_Min].join(' - ');
            $scope.datos.valorBajo = [dato1_Max, 0].join(' - ');

            dataPlotBands = [
              { // Light air
                from: dato3_Min,
                to: parseFloat(x.REGC_DATOMAX),
                color: 'rgba(255, 0, 0, 0.2)',
                label: {
                  text: 'Alta',
                  style: {
                    color: '#000000'
                  }
                }
              }, { // Light breeze
                from: dato2_Min,
                to: dato2_Max,
                color: 'rgba(255, 255, 0, 0.3)',
                label: {
                  text: 'Media',
                  style: {
                    color: '#000000'
                  }
                }
              }, { // Light breeze
                from: 0,
                to: dato1_Max,
                color: 'rgba(0, 128, 0, 0.3)',
                label: {
                  text: 'Baja',
                  style: {
                    color: '#000000'
                  }
                }
              }
            ]
          }
          // M:Mensual; B:Bimestral; T:Trimestral; S:Semestral; A:Anual;
          if (x.FRECUENCIA.split('-')[0] == 'M') {// Mensual
            dataMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            dataSerie = [
              // $scope.filtrarPeriodoAcumulado(1) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
              $scope.filtrarPeriodoAcumulado(1),
              $scope.filtrarPeriodoAcumulado(2),
              $scope.filtrarPeriodoAcumulado(3),
              $scope.filtrarPeriodoAcumulado(4),
              $scope.filtrarPeriodoAcumulado(5),
              $scope.filtrarPeriodoAcumulado(6),
              $scope.filtrarPeriodoAcumulado(7),
              $scope.filtrarPeriodoAcumulado(8),
              $scope.filtrarPeriodoAcumulado(9),
              $scope.filtrarPeriodoAcumulado(10),
              $scope.filtrarPeriodoAcumulado(11),
              $scope.filtrarPeriodoAcumulado(12)
            ];
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(1))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(2))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(3))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(4))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(5))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(6))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(7))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(8))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(9))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(10))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(11))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(12))
          }
          if (x.FRECUENCIA.split('-')[0] == 'B') {// Bimestral
            dataMeses = ['Feb', 'Abr', 'Jun', 'Ago', 'Oct', 'Dic'];
            dataSerie = [
              // $scope.filtrarPeriodoAcumulado(2) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
              $scope.filtrarPeriodoAcumulado(2),
              $scope.filtrarPeriodoAcumulado(4),
              $scope.filtrarPeriodoAcumulado(6),
              $scope.filtrarPeriodoAcumulado(8),
              $scope.filtrarPeriodoAcumulado(10),
              $scope.filtrarPeriodoAcumulado(12)
            ];
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(2))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(4))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(6))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(8))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(10))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(12))
          }
          if (x.FRECUENCIA.split('-')[0] == 'T') {// Trimestral
            dataMeses = ['Mar', 'Jun', 'Sep', 'Dic'];
            dataSerie = [
              // $scope.filtrarPeriodoAcumulado(3) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
              $scope.filtrarPeriodoAcumulado(3),
              $scope.filtrarPeriodoAcumulado(6),
              $scope.filtrarPeriodoAcumulado(9),
              $scope.filtrarPeriodoAcumulado(12)
            ];
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(3))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(6))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(9))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(12))
          }
          if (x.FRECUENCIA.split('-')[0] == 'S') {// Semestral
            dataMeses = ['Jun', 'Dic'];
            dataSerie = [
              // $scope.filtrarPeriodoAcumulado(6) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
              $scope.filtrarPeriodoAcumulado(6),
              $scope.filtrarPeriodoAcumulado(12)
            ];
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(6))
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(12))
          }
          if (x.FRECUENCIA.split('-')[0] == 'A') {// Anual
            dataMeses = ['Dic'];
            dataSerie = [
              // $scope.filtrarPeriodoAcumulado(12)
              $scope.filtrarPeriodoAcumulado(12) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.'))
            ];
            dataMeta.push($scope.filtrarPeriodoMetaVigencia(12))
          }

          //GENERAR GRAFICO
          $scope.graficoIndicador = Highcharts.chart('graficoIndicador', {
            chart: {
              type: 'line',
              width: 600
            },
            title: {
              text: $scope.modalGraficoVars.REGN_NOM_INDICADOR
            },
            xAxis: {
              categories: dataMeses
            },
            yAxis: {
              min: 0,
              // max: 110,
              // tickInterval: 10,
              gridLineColor: '',
              title: {
                text: ''
              },
              plotBands: dataPlotBands
            },

            plotOptions: {
              line: {
                dataLabels: {
                  enabled: true
                },
              }
            },
            series: [
              {
                name: 'Periodo',
                color: '#00e8ff',
                lineWidth: 3,
                data: dataSerie
              },
              {
                type: 'line',
                name: 'META',
                color: '#32ff08',
                lineWidth: 4,
                data: dataMeta,
                marker: {
                  enabled: false
                },
                // enableMouseTracking: false,
              },
              //
              // {
              //   name: 'Linea base',
              //   //color: '#00e8ff',
              //   dashStyle: 'ShortDash',
              //   lineWidth: 3,
              //   data: [[0, parseFloat(x.REGN_LINEA_BASE.toString().replace(',', '.'))], [dataSerie.length - 1, parseFloat(x.REGN_LINEA_BASE.toString().replace(',', '.'))]],
              // }
              //
            ],
            exporting: { enabled: false },
            credits: { enabled: false },
          });
          //GENERAR GRAFICO

        }, 500);
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.filtrarPeriodoAcumulado = function (periodo) {
        // const dato = parseFloat((($scope.modalGraficoVars.listado.filter(e => parseInt(e.GESN_PERIODO) == periodo))[0].GESN_RESULTADO.toString()).replace(',', '.'));
        // return dato == 0 ? null : dato

        const dato = parseFloat((($scope.modalGraficoVars.listado.filter(e => parseInt(e.GESN_PERIODO) == periodo))[0].GESN_RESULTADO.toString()).replace(',', '.'));

        const observacion = ($scope.modalGraficoVars.listado.filter(e => parseInt(e.GESN_PERIODO) == periodo))[0].GESC_OBSERVACION;
        if (observacion === null) {
          return null
        }
        return dato == 0 ? 0 : dato
      }
      $scope.filtrarPeriodoMetaVigencia = function (periodo) {
        const dato = parseFloat((($scope.modalGraficoVars.listado.filter(e => parseInt(e.GESN_PERIODO) == periodo))[0].GESN_META.toString()).replace(',', '.'));
        return dato == 0 ? null : dato
      }

      // document.addEventListener('contextmenu', event => event.preventDefault());
      // const body = document.querySelector('body');

      // body.onkeydown = function (e) {
      //   if (e.keyCode === 17 || e.keyCode === 80) {
      //   } else {
      //     return false;
      //   }
      // }
      // var mediaQueryList = window.matchMedia('print');
      // mediaQueryList.addListener(function (mql) {
      //   if (mql.matches) {
      //     console.log('se hizo antes de imprimir');
      //   } else {
      //     console.log('se hizo despues de imprimir');
      //     setTimeout(function () {
      //       window.close();
      //     }, 10);
      //   }
      // });

    }]);
