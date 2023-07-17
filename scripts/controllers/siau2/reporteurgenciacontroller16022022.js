'use strict';
angular.module('GenesisApp')
  .controller('reporteurgenciacontroller', ['$scope', 'notification', 'cfpLoadingBar', '$http', function ($scope, notification, cfpLoadingBar, $http) {
    $(document).ready(function () {
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('#modal12').modal();
    });
    $scope.filtro = "";
    $scope.inactive2 = true;
    $scope.tipoDoc = "0";
    $scope.inactive1 = true;

    $scope.descarga = function () {
      //Creamos un Elemento Temporal en forma de enlace
      var tmpElemento = document.createElement('a');
      // obtenemos la información desde el div que lo contiene en el html
      // Obtenemos la información de la tabla
      var data_type = 'data:application/vnd.ms-excel';
      var tabla_div = document.getElementById('reporte');
      var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
      tmpElemento.href = data_type + ', ' + tabla_html;
      //Asignamos el nombre a nuestro EXCEL
      tmpElemento.download = 'Reporte_urgencias.xls';
      // Simulamos el click al elemento creado para descargarlo
      tmpElemento.click();
    }

    $scope.obtenerhistorico = function () {
      if (
        $scope.nitips != "" && $scope.nitips != null && $scope.nitips != undefined &&
        $scope.fechai != "" && $scope.fechai != null && $scope.fechai != undefined &&
        $scope.fechaf != "" && $scope.fechaf != null && $scope.fechaf != undefined &&
        $scope.fechaf >= $scope.fechai
      ) {
        $http({
          method: 'POST',
          url: "php/siau/CodigoUrgencia/Ccodigourgenciaips.php",
          data: {
            function: 'obtener_reporte',
            nitips: $scope.nitips,
            fechai: $scope.fechai,
            fechaf: $scope.fechaf
          }
        }).then(function (response) {
          $scope.HistoricoUrgencia = response.data;
          if ($scope.HistoricoUrgencia["0"].ips) {
            $scope.HistoricoUrgencia = response.data;
            $scope.Nombre = $scope.HistoricoUrgencia["0"].ips;
            $scope.total = $scope.HistoricoUrgencia.length;
            if ($scope.total <= 10) {
              $scope.quantity = $scope.total;
            }
            else {
              $scope.quantity = 10;
            }
            $scope.inactive1 = false;
          } else {
            $scope.HistoricoUrgencia=null;
            $scope.inactive1 = true;
            swal('Informanción', 'Error En la Consulta. Favor digite los campos nuevamente', 'error');
          }
        });
      } else {
        $scope.HistoricoUrgencia=null;
        $scope.inactive1 = true;
        swal('Informanción', 'Error digitación de los campos, favor validar', 'error');
      }
    }
  }])
