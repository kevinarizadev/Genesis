
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

      $scope.limpiar = function () {

        // $scope.listadoGlosas = [
        //   {
        //     FACTURA: 'OC89489489',
        //     VALOR_GLOSA: '100000000',
        //     VALOR_GLOSA_MANTENIDA: '50000000',
        //     VALOR_GLOSA_IPS: '30000000',
        //     VALOR_GLOSA_EPS: '20000000',
        //     OBSERVACION: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        //   },
        //   {
        //     FACTURA: 'OC89489489',
        //     VALOR_GLOSA: '10000000',
        //     VALOR_GLOSA_MANTENIDA: '0',
        //     VALOR_GLOSA_IPS: '3000000',
        //     VALOR_GLOSA_EPS: '7000000',
        //     OBSERVACION: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)'
        //   },
        //   {
        //     FACTURA: 'OC89489489',
        //     VALOR_GLOSA: '1000000',
        //     VALOR_GLOSA_MANTENIDA: '500000',
        //     VALOR_GLOSA_IPS: '300000',
        //     VALOR_GLOSA_EPS: '200000',
        //     OBSERVACION: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        //   },

        // ];

        $scope.totalValorGlosa = 0;
        $scope.totalValorMantenida = 0;
        $scope.totalValorIps = 0;
        $scope.totalValorEps = 0;
        // $scope.listadoGlosas.forEach(element => {
        //   $scope.totalValorGlosa += parseInt(element.VALOR_GLOSA);
        //   $scope.totalValorMantenida += parseInt(element.VALOR_GLOSA_MANTENIDA);
        //   $scope.totalValorIps += parseInt(element.VALOR_GLOSA_IPS);
        //   $scope.totalValorEps += parseInt(element.VALOR_GLOSA_EPS);

        // });
        setTimeout(() => { $scope.$apply(); }, 500);
        // $timeout(function () {
        //   window.print();
        // }, 1000);

        // debugger
      }
      ////////////////////////////////////////////////
      $scope.generarActa = function () {
        $http({
          method: 'POST',
          url: "../../../php/cuentasmedicas/conciliaciondeglosas.php",
          data: {
            function: 'generarActaConciliacion',
            documento: $location.search().documento.toString(),
            numero: $location.search().numero.toString(),
            ubicacion: $location.search().ubicacion.toString(),
            responsable: $location.search().responsable.toString(),
          }
        }).then(function ({ data }) {
          if (data != undefined) {

            $scope.datosCabeza = data.cabeza[0];
            $scope.datosDetalle = data.detalle;

            $scope.totalValorGlosa = 0;
            $scope.totalValorMantenida = 0;
            $scope.totalValorIps = 0;
            $scope.totalValorEps = 0;

            $scope.datosDetalle.forEach(element => {
              $scope.totalValorGlosa += parseFloat(element.VAL_GLOSA.toString().replace(',', '.'));
              $scope.totalValorMantenida += parseFloat(element.VAL_GLOSA_MANTENIDA.toString().replace(',', '.'));
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
      document.addEventListener('contextmenu', event => event.preventDefault());
      const body = document.querySelector('body');

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
