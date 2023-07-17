'use strict';
angular.module('GenesisApp')
 .controller('modalValorglosactrl',['$scope','censoHttp','ngDialog',function($scope,censoHttp,ngDialog) {
 $scope.motivoglosa = ' ';
 
 censoHttp.obtenerMotivoglosa().then(function(response){
     $scope.listmotivoglosa =  response.data;
    })

 $scope.guardarParamGlosas = function (){
 	$scope.glosa = {
 	cantidad:$scope.valobjecion,
    nombre:$scope.Descripcionobjecion,
    motivo: $scope.motivoglosa
 	}
 }

}]);