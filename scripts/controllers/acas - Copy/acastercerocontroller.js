'use strict';
angular.module('GenesisApp')
.controller('acastercerocontroller',['$scope','$http','acasHttp','$rootScope','communication','ngDialog',
 function($scope,$http,acasHttp,$rootScope,communication,ngDialog) {
  $scope.mostrarusuario = function (){
  	acasHttp.mostrarUsuario($scope.nombrefiltro).then(function (response) {
           $scope.datos = response.data;
        })
	}
   
   $scope.asignacion = function (nombre, ubicacion,cedula){
  		communication.data.tercero_nombre    = nombre;
  		communication.data.tercero_ubicacion  = ubicacion;
  		communication.data.tercero_cedula =  cedula;
  		communication.data.value = true;
  		ngDialog.closeAll();
  	}

}]);
