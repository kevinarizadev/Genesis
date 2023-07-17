'use strict';
angular.module('GenesisApp')
 .controller('detalleautcontroller',['$scope','censoHttp','$http','ngDialog',function($scope,censoHttp,$http,ngDialog) {
      censoHttp.obtenerautdeta($scope.codigodetalleaut).then(function(response){
         if (response.data.codigo != '-1'){
             $scope.detalleautorizaciones = response.data;
             $scope.zeroresults = true;
         }else{
             $scope.zeroresults = false;
         }
    })
}]);