'use strict';
angular.module('GenesisApp')
.controller('nivelcontroller',['$scope','$http','bodegaHttp','notification','pasilloHttp','pisoHttp','nivelHttp',
 function($scope,$http,bodegaHttp,notification,pasilloHttp,pisoHttp,nivelHttp) {
  
  $scope.lista_Bodega_nivel=' ';
  $scope.lista_pasillo_nivel=' ';
  $scope.lista_piso_nivel = ' ';
  $scope.bestado_pasillo=' ';
  $scope.blista_nivel=' '

  bodegaHttp.mostrarBodega().then(function (response) {
      $scope.bodegasm = response;
    })

 $scope.filtrobodegam =  function () {
  $scope.obtenerPasillomodal($scope.lista_Bodega_nivel);
}

$scope.filtropasillom =  function () {
  $scope.obtenerPisomodal($scope.lista_Bodega_nivel,$scope.lista_pasillo_nivel);
}

$scope.obtenerPasillomodal = function (codigo_bodega){
  pasilloHttp.mostrarPasillo(codigo_bodega).then(function (response) {
      $scope.pasillos = response;
    })
}

$scope.obtenerPisomodal = function (codigo_bodega,codigo_pasillo){
 pisoHttp.mostrarPiso(codigo_bodega,codigo_pasillo).then(function (response) {
      $scope.pisos = response;
    })
}

  $scope.insertarNivel = function () {
  nivelHttp.insertarNivel( $scope.lista_Bodega_nivel, $scope.lista_pasillo_nivel,$scope.lista_piso_nivel,
                           $scope.mnombre_nivel,$scope.mdescripcion_nivel,$scope.bestado_nivel).then(function (response) {
       if (response.codigo==1){
         notification.getNotification('success', response.mensaje, 'Notificacion');
         $scope.obtenerNivel($scope.lista_Bodega_nivel,$scope.lista_pasillo_nivel,$scope.lista_piso_nivel);
       }else{
          notification.getNotification('error', response, 'Notificacion');
       }
    })
  }

}]);
