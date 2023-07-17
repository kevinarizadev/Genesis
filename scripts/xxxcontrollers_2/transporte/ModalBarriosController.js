'use strict';
angular.module('GenesisApp')
.controller('ModalBarriosController', ['$scope', '$http',
function ($scope, $http) {

  $scope.barrio=' ';
  $scope.barrio1 = ' ';
  $scope.barrio2 = ' ';

  $http({
    method: 'POST',
    url: "php/transporte/transporte.php",
    data: {function: 'obtener_barrios'}
  }).then(function (response) {
    $scope.barrios = response.data;

  });

  $scope.switch = function(){
    $scope.ida=!$scope.ida;
  }
}])
