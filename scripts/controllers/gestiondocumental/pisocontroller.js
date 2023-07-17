'use strict';
angular.module('GenesisApp')
.controller('pisocontroller',['$scope','$http','bodegaHttp','notification','pasilloHttp','pisoHttp',
 function($scope,$http,bodegaHttp,notification,pasilloHttp,pisoHttp) {
  
  $scope.lista_Bodega_piso=' ';
  $scope.lista_pasillo_piso=' ';
  $scope.bestado_pasillo=' ';

  bodegaHttp.mostrarBodega().then(function (response) {
      $scope.bodegas = response;
    })

  $scope.filtrobodega =  function () {
  $scope.obtenerPasillo($scope.lista_Bodega_piso);
  }

  $scope.obtenerPasillo = function (codigo_bodega){
  pasilloHttp.mostrarPasillo(codigo_bodega).then(function (response) {
      $scope.pasillos = response;
    })
}


  $scope.insertarpiso = function () {
  pisoHttp.insertarPiso( $scope.lista_Bodega_piso,$scope.lista_pasillo_piso,$scope.mnombre_piso,$scope.mdescripcion_piso,$scope.pestado_piso).then(function (response) {
       if (response.codigo==1){
         notification.getNotification('success', response.mensaje, 'Notificacion');
         $scope.obtenerPiso($scope.lista_Bodega_piso, $scope.lista_pasillo_piso);
       }else{
          notification.getNotification('error', response, 'Notificacion');
       }
    })
  }

}]);


