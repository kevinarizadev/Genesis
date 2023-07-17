'use strict';
angular.module('GenesisApp')
.controller('modalDireccionctrl',['$scope','$http','ngDialog','afiliacionHttp',function($scope,$http,ngDialog,afiliacionHttp) {

   $scope.dir = {
    bis: false
  };

  afiliacionHttp.obtenerViaPrincipal().then(function (response) {
    $scope.viaprincipal = response;
  })


  afiliacionHttp.obtenerLetra().then(function (response) {
    $scope.letras = response;
  })



  afiliacionHttp.obtenerNumero().then(function (response) {
    $scope.Numeros = response;
  })



  afiliacionHttp.obtenerCuadrante().then(function (response) {
    $scope.Cuadrantes = response;
  })

   $scope.selectDireccion = function(){
    $scope.closeThisDialog($('#direcciond').val());
      }

}]);
