'use strict';
angular.module('GenesisApp')
 .controller('censohospitalariocontroller',['$scope','censoHttp','ngDialog','$controller',function($scope,censoHttp,ngDialog,$controller) {
  
  $(document).ready(function () {
    $scope.evolucion =  true;
    $scope.pendiente = false;
    $scope.censo = true;
    $scope.autorizacion = true;
      $('#modalservicio').modal();
  });

    $scope.eventTabs =  function(type){
     switch(type) {
            case "P":
                $scope.evolucion =  true;
                $scope.pendiente = false;
                $scope.censo = true;
                $scope.autorizacion = true;
              break;
            case "C":
                $scope.evolucion =  true;
                $scope.pendiente = true;
                $scope.censo = false;
                $scope.autorizacion = true;
              break;
            case "E":
                $scope.evolucion =  false;
                $scope.pendiente = true;
                $scope.censo = true;
                $scope.autorizacion = true;
                 $controller('evoluciontabcontroller', {
                $scope: $scope
                });
                $scope.obtenerEvolucionPaciente($scope.idcenso.UBICACION,$scope.idcenso.CODIGOCENSO,$scope.modalestado);
                  $('#modalservicio').modal('close');
              break;
            default:
                $scope.evolucion =  true;
                $scope.pendiente = true;
                $scope.censo = true;
                $scope.autorizacion = false;
            }
        }

  $scope.showmodalcenso = function(id){
     $scope.idcenso = id;
     censoHttp.obtenerFichaPaciente($scope.idcenso.UBICACION,$scope.idcenso.CODIGOCENSO).then(function(response){  
     if (response.data.length == 0){
        $scope.zeroevoresults = false;   
     }else{
         $scope.modalafiliado = response.data[0].AFILIADO;
         $scope.modalsexo = response.data[0].SEXO;
         $scope.modalestado =  response.data[0].ESTADO;
         $scope.modaldiagnostico = response.data[0].DIAGNOSTICO;
         $scope.modalobservacion = response.data[0].OBSERVACION;
         $scope.zeroevoresults = true;    
     }
      $('#modalservicio').modal('open');
     })
  }
}]);
