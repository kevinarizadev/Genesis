'use strict';
angular.module('GenesisApp', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('formatonegacionController', ['$scope', '$http', '$location', '$timeout',
    function ($scope, $http, $location, $timeout) {
        
      $scope.datosNA = [];
      $scope.numero = $location.search().numero;
      $scope.ubicacion = $location.search().ubicacion;
      $scope.impresion;
      $http({
        method: 'POST',
        url: "../../php/formatonegacion/formato.php",
        data: { function: 'p_obtener_negacion_web', numero: $scope.numero, ubicacion: $scope.ubicacion }
      }).then(function (response) {
        console.log(response.data);
        $scope.datosNA = response.data;    
      })

        // setTimeout(function () {
        //   window.print();
        //   setTimeout(function () {
        //     window.close();
        //   }, 100);
        // }, 1000);
      


    }]);
