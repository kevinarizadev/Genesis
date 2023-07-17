'use strict';
angular.module('GenesisApp')
.controller('secuenciacontroller',['$scope','$http','bodegaHttp','notification','pasilloHttp','pisoHttp','nivelHttp','secuenciaHttp',
 function($scope,$http,bodegaHttp,notification,pasilloHttp,pisoHttp,nivelHttp,secuenciaHttp) {
  
  $scope.lista_Bodega_sec=' ';
  $scope.lista_pasillo_sec=' ';
  $scope.lista_piso_sec = ' ';
  $scope.lista_nivel_sec = ' ';
  $scope.bestado_sec=' ';
  

  bodegaHttp.mostrarBodega().then(function (response) {
      $scope.bodegas = response;
    })

$scope.filtrobodega =  function () {
  $scope.obtenerPasillomodal($scope.lista_Bodega_sec);
}

$scope.filtropasillo =  function () {
  $scope.obtenerPisomodal($scope.lista_Bodega_sec,$scope.lista_pasillo_sec);
}

$scope.filtropiso =  function () {
  $scope.obtenerNivelmodal($scope.lista_Bodega_sec,$scope.lista_pasillo_sec,$scope.lista_piso_sec);
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

$scope.obtenerNivelmodal = function (codigo_bodega,codigo_pasillo,codigo_piso){
 nivelHttp.mostrarNivel(codigo_bodega,codigo_pasillo,codigo_piso).then(function (response) {
      $scope.niveles = response;
    })
}

  $scope.insertarSecuencia = function () {
  secuenciaHttp.insertarSecuencia( $scope.lista_Bodega_sec, $scope.lista_pasillo_sec,$scope.lista_piso_sec, $scope.lista_nivel_sec,
                           $scope.bnombre_secuencia,$scope.bdescripcion_secuencia,$scope.bestado_secuencia).then(function (response) {
       if (response.codigo==1){
         notification.getNotification('success', response.mensaje, 'Notificacion');
         $scope.obtenerSecuencia($scope.lista_Bodega_sec,$scope.lista_Pasillo_sec,$scope.lista_piso_sec,$scope.lista_nivel_sec);
       }else{
          notification.getNotification('error', response, 'Notificacion');
       }
    })
  }

}]);
