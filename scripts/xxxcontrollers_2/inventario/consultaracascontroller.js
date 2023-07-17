'use strict';
angular.module('GenesisApp')
.controller('consultaracascontroller', ['$scope', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'communication', '$controller','$rootScope','$window','inventarioHttp',
function ($scope, $http, ngDialog, notification, $timeout, $q, communication, $controller, $rootScope, $window, inventarioHttp) {
  $scope.documento = '';
  $scope.ocultarinfo =  true;
  $scope.periodo = "0";
  $http({
    method:'POST',
    url:"php/inventario/buscarinventario.php",
    data: {function:'obtenerperiodos'}
  }).then(function(response){
      $scope.periodos = response.data;
  })
  $scope.buscaracasusuarios = function(){
    if($scope.periodo != "0" && $scope.periodo != undefined && $scope.periodo != null && $scope.periodo != " "){
      $http({
        method:'POST',
        url:"php/inventario/buscarinventario.php",
        data: {function:'obtenerinventario',doc:$scope.documento, per:$scope.periodo}
      }).then(function(response){
        if(response.data.length == 0){
          $scope.ocultarinfo =  true;
          notification.getNotification('info', 'Usuario no registra!', 'Notificacion');
        }else{
          $scope.acas = response.data;
          $scope.documento = '';
          $scope.ocultarinfo =  false;
        }
      })
    }
    else{
      notification.getNotification('info', 'Complete el campo periodo!', 'Notificacion');
    }
  }
}])
