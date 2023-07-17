'use strict';
   angular.module('GenesisApp')
   .controller('solicitudautcontroller',['$scope','$http','acasHttp','notification','$timeout','$rootScope','$http','$window','ngDialog',
   function($scope,$http,acasHttp,notification,$timeout,$rootScope,$window,ngDialog) {
    $scope.solicitud = $scope.autValor.data.filter(function(el) {
      return el.IMPRESO == "N";
  });
      
      $scope.procesarAut = function(numero,ubicacion){
         //if ($scope.icons=='print'){
          //  window.open('views/autorizaciones/formatoautorizacionpre.php?numero='+codigo,'_blank');
            window.open('views/autorizaciones/formatoautorizacionPrint.php?numero=' + numero + '&ubicacion=' + ubicacion, '_blank');
            $scope.icons = 'not_interested';
           //}
      }
}]);