'use strict';
angular.module('GenesisApp',[])
.config(function($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
})
.controller('formatautorizacionController',['$scope','$http','$location','$timeout',
function($scope,$http,$location,$timeout) {
  $scope.datosAU = [];
  $scope.numero = $location.search().numero;
  $http({
    method:'POST',
    url:"../../php/autorizaciones/print/Rautorizaciones.php",
    data: {function:'obtenerautorizacion',numero:$scope.numero}
  }).then(function(response){
      $scope.varios =[{nombre:"pepe",edad:20},
        {nombre:"angel",edad:30},{nombre:"maria",edad:35},{nombre:"gema",edad:25}];
      //$scope.varios = JSON.parse($scope.varios);//'['++']';
    $scope.datosAU = response.data;
    $scope.quantity = 3;

    setTimeout(function () {
      //$("html").print();
      window.print();
      setTimeout(function () {
        //window.close();
      }, 10);
    }, 10);
  })
  var mediaQueryList = window.matchMedia('print');
  mediaQueryList.addListener(function(mql) {
      if (mql.matches) {
          console.log('se hizo antes de imprimir');
      } else {
          console.log('se hizo despues de imprimir');
          $http({
            method:'POST',
            url:"../../php/autorizaciones/print/Uautorizaciones.php",
            data: {function:'cerrarimpresion',numero:$scope.numero}
          }).then(function(response){
            window.close();
          })
      }
  });
}]);
