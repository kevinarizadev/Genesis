'use strict';
angular.module('GenesisApp')
.controller('pasillocontroller',['$scope','$http','bodegaHttp','notification','pasilloHttp',
 function($scope,$http,bodegaHttp,notification,pasilloHttp) {
  
  $scope.lista_Bodega_Pasillo=' ';
  $scope.bestado_pasillo=' ';

  bodegaHttp.mostrarBodega().then(function (response) {
      $scope.bodegas = response;
    })

  $scope.insertarPasillo = function () {
  pasilloHttp.insertarPasillo( $scope.lista_Bodega_Pasillo,$scope.mnombre_pasillo,$scope.mdescripcion_pasillo,$scope.bestado_pasillo).then(function (response) {
       if (response.codigo==1){
         notification.getNotification('success', response.mensaje, 'Notificacion');
         $scope.obtenerPasillo();
       }else{
          notification.getNotification('error', response, 'Notificacion');
       }
    })
  }

}]);
