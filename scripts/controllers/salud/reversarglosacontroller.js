'use strict';
angular.module('GenesisApp')
 .controller('reversarglosacontroller',['$scope','censoHttp','ngDialog',function($scope,censoHttp,ngDialog) {
    censoHttp.obtenerEvolucionDetalleHospitalizacion($scope.renglon,$scope.ubicacionpac,$scope.numerocenso).then(function(response){
	 $scope.reglosaanterior = response.data[0].OBSERVACIONGLOSA;
     $scope.valoranteriorglosa = response.data[0].VALORGLOSA;
    })

    $scope.reversarglosa = function (){
      censoHttp.reversarglosa($scope.renglon,$scope.ubicacionpac,$scope.numerocenso,$scope.reglosanueva,$scope.valorglosa).then(function(response){
         if (response.data.codigo != 0){
            swal('Completado',response.data.mensaje,'success');
            ngDialog.close();
          }else{
            swal('Completado',response.data.mensaje,'error');
          }  
    })
    }

}]);