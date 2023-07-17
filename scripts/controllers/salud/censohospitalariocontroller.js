'use strict';
angular.module('GenesisApp')
 .controller('censohospitalariocontroller',['$scope','censoHttp','ngDialog','$controller','$http',function($scope,censoHttp,ngDialog,$controller,$http) {
  
  $(document).ready(function () {
    $scope.evolucion =  true;
    $scope.pendiente = false;
    $scope.censo = true;
    $scope.autorizacion = true;
    $scope.reporteTab = true;
      $('#modalservicio').modal();
       /*$("#tabI").removeClass("tabactiva");
        $("#tabII").removeClass("tabactiva");
        $("#tabIII").removeClass("tabactiva");
        $("#tabIV").removeClass("tabactiva");*/
  });

    $scope.eventTabs =  function(type){
      $scope.evolucion = true;
      $scope.censo = true;
      $scope.pendiente = true;
      $scope.autorizacion = true;
      $scope.reporteTab = true;
     switch(type) {
       /* $('#tabI').removeClass("tabactiva");
        $('#tabII').removeClass("tabactiva");
        $('#tabIII').removeClass("tabactiva");
        $('#tabIV').removeClass("tabactiva");*/

            case "P":
                //$('#tabI').addClass("tabactiva");
                $scope.pendiente = false;
               /* $scope.autorizacion = true;
                 $controller('censocontroller', {
                $scope: $scope
                });
                 $scope.obtener_censos_activos();
*/
              break;
            case "C":
                //$('#tabII').addClass("tabactiva");
                $scope.censo = false;
              break;
            case "E":
                 //$('#tabIII').addClass("tabactiva");
                $scope.evolucion =  false;
                 $controller('evoluciontabcontroller', {
                $scope: $scope
                });
                $scope.obtenerEvolucionPaciente($scope.idcenso.NOMBRE_AFILIADO,$scope.idcenso.CENN_UBICACION,$scope.idcenso.CENN_NUMERO,$scope.modalestado,$scope.idcenso.SEXO,$scope.idcenso.EDAD,$scope.idcenso.CENC_HIJO);
                  $('#modalservicio').modal('close');
              break;
              case "A":
                //$('#tabIV').addClass("tabactiva");
                $scope.autorizacion = false;
                 $controller('autorizaciontabcontroller', {
                $scope: $scope
                });
                $scope.obtenerautorizacion($scope.idcenso.TIPODOCUMENTO,$scope.idcenso.DOCUMENTO,$scope.idcenso.FECHAINGRESO,$scope.idcenso.FECHAEGRESO);
                //$scope.obtenerautorizacion('CC','22655263','3/04/2018','');
                  $('#modalservicio').modal('close');
              break;
              case "R":
              //$('#tabII').addClass("tabactiva");
              $scope.reporteTab = false;
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

  $scope.generarReporte = function () {
    swal({
      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
      width: 200,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      animation: false
    });

    $http({
      method: 'POST',
      url: 'php/censo/censo.php',
      data: {
        function: 'p_eventos_adversos',
        fechaInicio: formatDate($scope.fechaInicio),
        fechaFin: formatDate($scope.fechaFin)
      }
    }).then(function ({ data }) {
      const text = `Registros encontrados (${data.length})`;
      swal('Mensaje', text, 'info').catch(swal.noop);

      var ws = XLSX.utils.json_to_sheet(data);
      /* add to workbook */
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
      /* write workbook and force a download */
      XLSX.writeFile(wb, "Exportado Eventos Adversos.xlsx");

    });
    $scope.fechaInicio = '';
    $scope.fechaFin = '';
  }

  function formatDate(date) {
    var dd = ('0' + date.getDate()).slice(-2);
    var mm = ('0' + (date.getMonth() + 1)).slice(-2);
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var mi = date.getMinutes();
    return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
  }


}]);
