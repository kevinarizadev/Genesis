'use strict';
angular.module('GenesisApp')
 .controller('evoluciondetallecontroller',['$scope','censoHttp','ngDialog',function($scope,censoHttp,ngDialog) {
    
    censoHttp.obtenerEvolucionDetalleHospitalizacion($scope.renglon,$scope.ubicacionpac,$scope.numerocenso).then(function(response){
     $scope.paciente = response.data[0].NOMBRE;
     $scope.auditor = response.data[0].AUDITOR;
     $scope.analisis = response.data[0].OBSERVACION;
     $scope.diagnostico = response.data[0].DIAGNOSTICO;
     $scope.fecharegistro = response.data[0].FECHA; 
     $scope.moglosa = response.data[0].MOTIVO; 
     $scope.obsglosa = response.data[0].OBSGLOSA; 
     $scope.valglosa = response.data[0].VALOR; 
     $scope.evento = response.data[0].EVENTO;
     $scope.relacion =  response.data[0].RELACION;
    })

}]);