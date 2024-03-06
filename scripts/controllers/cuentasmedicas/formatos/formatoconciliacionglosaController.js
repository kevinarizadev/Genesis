
'use strict';
angular.module('GenesisApp', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('formatoconciliacionglosaController', ['$scope', '$http', '$timeout', '$location', '$sce',
    function ($scope, $http, $timeout, $location, $sce) {
      $(document).ready(function () {
        $scope.trustSrc = function (src) {
          return $sce.trustAsResourceUrl(src);
        }
        // $scope.limpiar();
        $scope.generarActa();
      });

      ////////////////////////////////////////////////
      $scope.generarActa = function () {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "../../../php/cuentasmedicas/conciliaciondeglosas.php",
          data: {
            function: $location.search().documento.toString() == 'NG' ? 'generarActaConciliacion' : 'p_genera_acta_conciliacion_glo_agru',
            documento: $location.search().documento.toString(),
            numero: $location.search().numero.toString(),
            ubicacion: $location.search().ubicacion.toString(),
            responsable: $location.search().responsable.toString(),
          }
        }).then(function ({ data }) {
          if (data != undefined) {
            swal.close()
            $scope.datosCabeza = data.cabeza[0];
            $scope.datosDetalle = data.detalle;

            $scope.totalValorGlosa = 0;
            $scope.totalValorMantenida = 0;
            $scope.totalRespValorIps = 0;
            $scope.totalRespValorEps = 0;
            $scope.totalValorIps = 0;
            $scope.totalValorEps = 0;

            $scope.datosDetalle.forEach(element => {
              element.VAL_GLOSA_RESP_IPS = element.VAL_GLOSA_RESP_IPS === null ? 0 : element.VAL_GLOSA_RESP_IPS;
              element.VAL_GLOSA_RESP_EPS = element.VAL_GLOSA_RESP_EPS === null ? 0 : element.VAL_GLOSA_RESP_EPS;

              $scope.totalValorGlosa += parseFloat(element.VAL_GLOSA.toString().replace(',', '.'));
              $scope.totalValorMantenida += parseFloat(element.VAL_GLOSA_MANTENIDA.toString().replace(',', '.'));
              $scope.totalRespValorIps += parseFloat(element.VAL_GLOSA_RESP_IPS.toString().replace(',', '.'));
              $scope.totalRespValorEps += parseFloat(element.VAL_GLOSA_RESP_EPS.toString().replace(',', '.'));
              $scope.totalValorIps += parseFloat(element.VAL_GLOSA_ACEP_IPS.toString().replace(',', '.'));
              $scope.totalValorEps += parseFloat(element.VAL_GLOSA_ACEP_EPS.toString().replace(',', '.'));
            });


            $timeout(function () {
              $scope.$apply();
            }, 100);
            $timeout(function () {
              window.print();
            }, 300);

          } else {
            setTimeout(function () {
              window.close();
            }, 10);
          }
        });
      }
      $scope.formatPeso2 = function (num) {
        if (num != undefined) {
          num = num.toString().replace(',', '.');
          var regex2 = new RegExp("\\.");
          if (regex2.test(num)) {
            num = num.toString().replace('.', ',');
            num = num.split(',');
            num[0] = num[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num[0] = num[0].split('').reverse().join('').replace(/^[\.]/, '');
            if (num[1].length > 1 && num[1].length > 2) {
              num[1] = num[1].toString().substr(0, 2);
            }
            if (num[1].length == 1) {
              num[1] = num[1] + '0';
            }
            return num[0] + ',' + num[1];
          } else {
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num = num.split('').reverse().join('').replace(/^[\.]/, '');
            return num + ',00';
          }
        }
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
