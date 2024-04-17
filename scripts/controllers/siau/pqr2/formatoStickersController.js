'use strict';
angular.module('GenesisApp', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('formatoStickersController',  ['$scope', 'pqrHttp', '$location', '$timeout',
  function ($scope, pqrHttp, $location, $timeout) {


      $scope.numero = $location.search().numero;
      $scope.sticker = {};
      console.log($scope.numero);


      swal({ title: 'Cargando datos del Formato' }).catch(swal.noop);
      swal.showLoading();
      pqrHttp.get_info_sticker($scope.numero).then(function (response) {
        console.log(response);
        $scope.sticker = response;
        setTimeout(function () {
          JsBarcode(".barcode", $scope.sticker.consecutivo, {
            width: 2,
            height: 40,
            displayValue: false
          });
        }, 10);

        swal.close();
        setTimeout(function () {
          window.print();
          setTimeout(function () {
            window.close();
          }, 100);
        }, 500);

      })


    }]);
