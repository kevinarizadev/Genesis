'use strict';
angular.module('GenesisApp')
 .controller('censohospitalariocontroller',['$scope','censoHttp','ngDialog','$controller',function($scope,censoHttp,ngDialog,$controller) {
  
  $(document).ready(function () {
    $scope.evolucion =  true;
    $scope.pendiente = false;
    $scope.censo = true;
    $scope.autorizacion = true;
      $('#modalservicio').modal();
       /*$("#tabI").removeClass("tabactiva");
        $("#tabII").removeClass("tabactiva");
        $("#tabIII").removeClass("tabactiva");
        $("#tabIV").removeClass("tabactiva");*/
  });

    $scope.eventTabs =  function(type){
     switch(type) {
       /* $('#tabI').removeClass("tabactiva");
        $('#tabII').removeClass("tabactiva");
        $('#tabIII').removeClass("tabactiva");
        $('#tabIV').removeClass("tabactiva");*/

            case "P":
                //$('#tabI').addClass("tabactiva");
                $scope.evolucion =  true;
                $scope.pendiente = false;
                $scope.censo = true;
               /* $scope.autorizacion = true;
                 $controller('censocontroller', {
                $scope: $scope
                });
                 $scope.obtener_censos_activos();
*/
              break;
            case "C":
                //$('#tabII').addClass("tabactiva");
                $scope.evolucion =  true;
                $scope.pendiente = true;
                $scope.censo = false;
                $scope.autorizacion = true;
              break;
            case "E":
                 //$('#tabIII').addClass("tabactiva");
                $scope.evolucion =  false;
                $scope.pendiente = true;
                $scope.censo = true;
                $scope.autorizacion = true;
                 $controller('evoluciontabcontroller', {
                $scope: $scope
                });
                $scope.obtenerEvolucionPaciente($scope.idcenso.NOMBRE_AFILIADO,$scope.idcenso.CENN_UBICACION,$scope.idcenso.CENN_NUMERO,$scope.modalestado,$scope.idcenso.SEXO,$scope.idcenso.EDAD,$scope.idcenso.CENC_HIJO);
                  $('#modalservicio').modal('close');
              break;
              case "A":
                //$('#tabIV').addClass("tabactiva");
                $scope.evolucion =  true;
                $scope.pendiente = true;
                $scope.censo = true;
                $scope.autorizacion = false;
                 $controller('autorizaciontabcontroller', {
                $scope: $scope
                });
                $scope.obtenerautorizacion($scope.idcenso.TIPODOCUMENTO,$scope.idcenso.DOCUMENTO,$scope.idcenso.FECHAINGRESO,$scope.idcenso.FECHAEGRESO);
                //$scope.obtenerautorizacion('CC','22655263','3/04/2018','');
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
     
     censoHttp.obtenerFichaPaciente($scope.idcenso.CENN_UBICACION,$scope.idcenso.CENN_NUMERO).then(function(response){  
     if (response.data.length == 0){
        $scope.zeroevoresults = false;   
     }else{
         $scope.modalafiliado = response.data[0].NOMBRE;
         $scope.modalsexo = response.data[0].SEXO;
         $scope.modalestado =  response.data[0].ESTADO;
         $scope.modaldiagnostico = response.data[0].DIAGNOSTICO;
         $scope.modalobservacion = response.data[0].OBSERVACION;
         $scope.modalaltocosto = response.data[0].ALTOCOSTO;
         $scope.modalriesgo = response.data[0].RIESGO;
         $scope.zeroevoresults = true;    
     }
      $('#modalservicio').modal('open');
     })
  }
}]);
