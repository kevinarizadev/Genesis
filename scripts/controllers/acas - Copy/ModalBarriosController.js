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

  $scope.enviar_recorrido = function (type){
    if (type=='I'){
      $scope.barrioTrayecto = {
        barrioida : $scope.barrio,
        barriovuelta: ''
      };

       $scope.closeThisDialog($scope.barrioTrayecto);
   }else{
        $scope.barrioTrayecto = {
        barrioida : $scope.barrio1,
        barriovuelta: $scope.barrio2
      } 
     
       $scope.closeThisDialog($scope.barrioTrayecto);
   }
  }
}])