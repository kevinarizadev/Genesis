'use strict';
angular.module('GenesisApp')
.controller('bodegacontroller',['$scope','$http','bodegaHttp','notification',
 function($scope,$http,bodegaHttp,notification) {

  $scope.insertarBodega = function () {
  bodegaHttp.insertarBodega( $scope.mnombre_bodega,$scope.mdescripcion_bodega,$scope.bestado).then(function (response) {
       if (response.codigo==1){
         notification.getNotification('success', response.mensaje, 'Notificacion');
         $scope.obtenerbodega();
       }else{
          notification.getNotification('error', response, 'Notificacion');
       }
    })
  }

}]);
