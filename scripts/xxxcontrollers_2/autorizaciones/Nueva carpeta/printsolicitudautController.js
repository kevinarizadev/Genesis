'use strict';
angular.module('GenesisApp',[])
.config(function($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
})
.controller('printsolicitudautController',['$scope','$http','$location','$timeout',
function($scope,$http,$location,$timeout) {
  $scope.datosAU = [];
  $scope.numero = $location.search().numero;
  $scope.prestador = $location.search().prestador;
  $http({
    method:'POST',
    url: "../../php/autorizaciones/autorizacion/funcautorizacionips.php",
    data: {function:'obtenersolicitudprint',numero:$scope.numero,prestador:$scope.prestador}
  }).then(function(response){
    $scope.datosAU = response.data;
    setTimeout(function () {
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
          setTimeout(function () {
            window.close();
          }, 10);
      }
  });
}]);
