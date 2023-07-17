'use strict';
angular.module('GenesisApp')
.controller('detallecajacontroller',['$rootScope','$scope','$http','cajaHttp','notification',
 function($rootScope,$scope,$http,cajaHttp,notification) {
 $scope.codigo_rango = $scope.idbox;
 $scope.activedelete = true;
/*$(document).ready(function () {
          
         });*/
 $rootScope.$on('ngDialog.opened', function (e, $dialog) { 
  if ($scope.gestion == 1){$scope.activedelete = true } else {$scope.activedelete = false;}
  $(".ngdialog-content").css({"width": "650px"});})

 cajaHttp.mostrarDetalleCaja($scope.codigo_rango).then(function (response) {
      $scope.detalles = response;
    })



 $scope.eliminarCaja = function(){
 cajaHttp.eliminarCaja($scope.codigo_rango).then(function(response){
  if (response[0].codigo==1){
         notification.getNotification('success', response[0].mensaje, 'Notificacion');
       	 $scope.obtenercaja();
       }else{
          notification.getNotification('error', response, 'Notificacion');
       }
 })}
 
}]);
