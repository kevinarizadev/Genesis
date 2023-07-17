'use strict';
angular.module('GenesisApp')
.controller('acastranfercontroller',['$scope','$http','acasHttp','$rootScope','communication','ngDialog','notification',
 function($scope,$http,acasHttp,$rootScope,communication,ngDialog,notification) {
  
  $scope.mostrarusuario = function (){
  	acasHttp.mostrarUsuario($scope.nombrefiltro).then(function (response) {
           $scope.datos = response.data;
        })
	}
   
   $scope.tranfer = function (nombre,tercero){
    $scope.terceros = tercero;
      acasHttp.tranferirTercero('RE',$scope.numeroacas,$scope.ubicacionacas,$scope.terceros).then(function (response) {
           if(response.data.codigo == 1){
             notification.getNotification('success', response.data.mensaje + nombre,'Notificación');
           }else{
             notification.getNotification('error',"Error al transferir el servicio "+ $scope.numeroacas +" a el usuario "+ nombre ,'Notificación');
           }
        })
  		ngDialog.closeAll();
  	}

}]);
