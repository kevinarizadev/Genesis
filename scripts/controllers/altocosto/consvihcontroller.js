'use strict';
angular.module('GenesisApp')
  .controller('consvihcontroller', ['$scope', '$http', 'renalHttp', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
    function ($scope, $http, renalHttp, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
      $(document).ready(function () {
        $(".fechas").kendoDatePicker({
          culture: "es-MX",
          format: "dd/MM/yyyy",
          dateInput: false,
          max: new Date()
        });
        $("#tabs").tabs();
        $scope.setTab(1);
        $scope.tab = 1;

        document.getElementById('fechas').readOnly = true;
        $http({
          method: 'POST',
          url: "php/altocosto/vih/VIH.php",
          data: {
            function: 'obtenercodigo'
          }
        }).then(function (response) {
          $scope.codmuni = response.data;

          if ($scope.codmuni == 1) {
            $scope.mostrarmunipios = '1';
          }
          if ($scope.codmuni.substr(0, 2) == 80 || $scope.codmuni.substr(0, 1) == 8) {
            $scope.mostrarmunipios = '8';
          }
          if ($scope.codmuni.substr(0, 2) != 80 && $scope.codmuni.substr(0, 1) != 8 && $scope.codmuni != 1) {
            $scope.mostrarmunipios = $scope.codmuni.substr(0, 2);
          }
          $scope.Obtenernumeros();

          // $scope.ElegirGrafico();         


        });

        // $scope.verseccionales();

      });
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////            
      $scope.setTab = function (newTab) {
        // document.getElementById("tabscroll").scrollIntoView({ block: 'start', behavior: 'smooth' });
        $scope.tab = newTab;
        $(".tabI").removeClass("tabactiva");
        $(".tabII").removeClass("tabactiva");
        switch (newTab) {
          case 1:
            $(".tabI").addClass("tabactiva");
            break;
          case 2:
            $(".tabII").addClass("tabactiva");
            break;
          default:

        }
      }
      $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
      }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

      $scope.Obtenernumeros = function () {
        $scope.total = 0;
        $scope.atlantico = 0;
        $scope.bolivar = 0;
        $scope.cesar = 0;
        $scope.cordoba = 0;
        $scope.guajira = 0;
        $scope.magdalena = 0;
        $scope.meta = 0;
        $scope.sucre = 0;
        $http({
          method: 'POST',
          url: "php/altocosto/vih/VIH.php",
          data: {
            function: 'InformeSecc'
          }
        }).then(function (response) {
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].Seccional == 'ATLANTICO') {
              $scope.atlantico = response.data[i].Afiliados;
            }
            if (response.data[i].Seccional == 'BOLIVAR') {
              $scope.bolivar = response.data[i].Afiliados;
            }
            if (response.data[i].Seccional == 'CESAR') {
              $scope.cesar = response.data[i].Afiliados;
            }
            if (response.data[i].Seccional == 'CORDOBA') {
              $scope.cordoba = response.data[i].Afiliados;
            }
            if (response.data[i].Seccional == 'LA GUAJIRA') {
              $scope.guajira = response.data[i].Afiliados;
            }
            if (response.data[i].Seccional == 'MAGDALENA') {
              $scope.magdalena = response.data[i].Afiliados;
            }
            if (response.data[i].Seccional == 'META') {
              $scope.meta = response.data[i].Afiliados;
            }
            if (response.data[i].Seccional == 'SUCRE') {
              $scope.sucre = response.data[i].Afiliados;
            }
            $timeout(function () {
              $scope.ElegirGrafico();
            }, 500)

          }

          $scope.total = $scope.atlantico + $scope.bolivar + $scope.cesar + $scope.cordoba + $scope.guajira + $scope.magdalena + $scope.meta + $scope.sucre;
          // console.log($scope.atlantico);
          // console.log($scope.bolivar);
          // console.log($scope.cesar);
          // console.log($scope.cordoba);
          // console.log($scope.guajira);
          // console.log($scope.magdalena);
          // console.log($scope.meta);
          // console.log($scope.sucre);
          // console.log($scope.total);

          // $timeout(function () {
          //   $scope.vergrafico();
          // }, 30000)
        });
      }

      $scope.ElegirGrafico = function () {
        $scope.color= $('.foot4').css('background-color');
        if ($scope.mostrarmunipios == 1) {
          $scope.grafico();
          $scope.dpto = '';
        }
        if ($scope.mostrarmunipios == 8) {
          $scope.verseccionales('ATLANTICO', 'atlantico');
          $scope.dpto = 'ATLANTICO';
        }
        if ($scope.mostrarmunipios == 13) {
          $scope.verseccionales('BOLIVAR', 'bolivar');
          $scope.dpto = 'BOLIVAR';
        }
        if ($scope.mostrarmunipios == 20) {
          $scope.verseccionales('CESAR', 'cesar');
          $scope.dpto = 'CESAR';
        }
        if ($scope.mostrarmunipios == 23) {
          $scope.verseccionales('CORDOBA', 'cordoba');
          $scope.dpto = 'CORDOBA';
        }
        if ($scope.mostrarmunipios == 44) {
          $scope.verseccionales('GUAJIRA', 'guajira');
          $scope.dpto = 'LA GUAJIRA';
        }
        if ($scope.mostrarmunipios == 47) {
          $scope.verseccionales('MAGDALENA', 'magdalena');
          $scope.dpto = 'MAGDALENA';
        }
        if ($scope.mostrarmunipios == 50) {
          $scope.verseccionales('META', 'meta');
          $scope.dpto = 'META';
        }
        if ($scope.mostrarmunipios == 70) {
          $scope.verseccionales('SUCRE', 'sucre');
          $scope.dpto = 'SUCRE';
        }
      }

      $scope.Consultar = function () {
        var valida = false;
        if ($scope.tipo == undefined || $scope.tipo == null || $scope.tipo == '') {
          valida = true;
          swal({
            title: '!Seleccione el área!',
            timer: 3000,
            type: 'warning'
          }).catch(swal.noop);
        }
        if ($scope.fecha == undefined || $scope.fecha == null) {
          valida = true;
          swal({
            title: '!Seleccione la fecha a consultar!',
            timer: 3000,
            type: 'warning'
          }).catch(swal.noop);
        }


        if (valida == false) {
          if ($scope.tipo == 'A') {
            window.open('php/altocosto/vih/VIH-excel_Aut.php? &fecha=' + $scope.fecha +
              '&tipo=' + $scope.tipo + '&dpto=' + $scope.dpto);
          } else {
            window.open('php/altocosto/vih/VIH-excel_Sal.php? &fecha=' + $scope.fecha +
              '&tipo=' + $scope.tipo + '&dpto=' + $scope.dpto);
          }

        }
      }



      $scope.grafico = function () {
        Highcharts.chart('container', {
          chart: {
            type: 'column'
          },
          title: {
            text: 'VIH 2019 - SALUD PUBLICA'
          },
          xAxis: {
            type: 'category'
          },
          yAxis: {
            title: {
              text: 'Cantidad de personas cargadas'
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
                format: '<span class="btn" style="color:{point.color};font-size:20px">{point.y:.0f}</span>',
              }
            },
            column: {
              colorByPoint: true,
              borderRadius: 9,
              shadow: true,
              animation: {
                duration: 1500
              }

            }
          },
          credits: {
            enabled: false
          },
          colors: ['#1a2e63', '#1565c0', '#00abc0', '#558a2f', '#6a1b99',
            '#f0a42f', '#2e2e2e', '#e14242'],
          lang: {
            drillUpText: '< Atras',
          },

          tooltip: {
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b> registros cargados.<br/>'
          },
          "series": [
            {
              "name": "Browsers",
              "colorByPoint": true,
              "data": [
                {
                  "name": "Estado actual",
                  "y": $scope.total,
                  "drilldown": "Secc",
                  "color": $scope.color
                }
              ]
            }
          ],
          "drilldown": {
            "series": [
              {
                "name": "Seccionales",
                "id": "Secc",
                "data": [
                  [
                    "ATLANTICO",
                    $scope.atlantico
                  ],
                  [
                    "BOLIVAR",
                    $scope.bolivar
                  ],
                  [
                    "CESAR",
                    $scope.cesar
                  ],
                  [
                    "CORDOBA",
                    $scope.cordoba
                  ],
                  [
                    "GUAJIRA",
                    $scope.guajira
                  ],
                  [
                    "MAGDALENA",
                    $scope.magdalena
                  ],
                  [
                    "META",
                    $scope.meta
                  ],
                  [
                    "SUCRE",
                    $scope.sucre
                  ]
                ]
              }
            ]
          }
        });
      }

      $scope.verseccionales = function (nombreseccional, seccional) {
        Highcharts.chart('container', {
          chart: {
            type: 'column'
          },
          title: {
            text: 'VIH 2019 - SALUD PUBLICA'
          },
          xAxis: {
            type: 'category'
          },
          yAxis: {
            title: {
              text: 'Cantidad de personas cargadas'
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
                format: '{point.y:.0f}'
              }
            },
            column: {
              colorByPoint: true,
              borderRadius: 9,
              shadow: true,
              animation: {
                duration: 1500
              }

            }
          },
          credits: {
            enabled: false
          },
          colors: ['#1a2e63', '#1565c0', '#00abc0', '#558a2f', '#6a1b99',
            '#f0a42f', '#2e2e2e', '#e14242'],
          lang: {
            drillUpText: '< Atras',
          },

          tooltip: {
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b> registros cargados.<br/>'
          },
          "series": [
            {
              "name": "Browsers",
              "colorByPoint": true,
              "data": [
                {
                  "name": "Estado actual",
                  "y": $scope.total,
                  "drilldown": "Secc",
                  "color": $scope.color,
                }
              ]
            }
          ],
          "drilldown": {
            "series": [
              {
                "name": "Seccional",
                "id": "Secc",
                "data": [
                  [
                    nombreseccional,
                    $scope[seccional]
                  ]
                ]
              }
            ]
          }
        });
      }
    }])



