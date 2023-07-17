'use strict';
angular.module('GenesisApp')
  .controller('historicourgenciacontroller', ['$scope', 'notification', 'cfpLoadingBar', '$http', function ($scope, notification, cfpLoadingBar, $http) {
    $(document).ready(function () {
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('#modal12').modal();
    });
    $scope.filtro = "";
    $scope.inactive2 = true;
    $scope.tipoDoc = "0";
    $scope.inactive1 = true;

    $scope.abrirmodal = function (data) {
      $scope.info = data;
      $scope.inactive2 = false;
      $('#modal12').modal('open');
    }

    $scope.descargar = function (ruta) {
      $http({
        method: 'POST',
        url: "php/juridica/tutelas/functutelas.php",
        data: {
          function: 'descargaAdjunto',
          ruta: ruta
        }
      }).then(function (response) {
        //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
        window.open("temp/" + response.data);
      });
    }

    $scope.obtenerhistorico = function () {
      if ($scope.filtro != "" && $scope.filtro != null && $scope.filtro != undefined) {
        $http({
          method: 'POST',
          url: "php/siau/CodigoUrgencia/Rcodigourgencia.php",
          data: { function: 'obtenerhistorico', coincidencia: $scope.filtro }
        }).then(function (response) {
          if (response.data["0"].length > 0) {
            $scope.HistoricoUrgencia = response.data["0"];
            $scope.Nombre = $scope.HistoricoUrgencia["0"].Nombre;
            $scope.total = $scope.HistoricoUrgencia.length;
            if ($scope.total <= 10) {
              $scope.quantity = $scope.total;
            }
            else {
              $scope.quantity = 10;
            }
            $scope.inactive1 = false;
          } else {
            notification.getNotification('info', 'No se encontraron urgencias!', 'Notificacion');
          }
        });
      } else {
        notification.getNotification('warning', 'Por favor proporciene un filtro', 'Notificacion');
      }
    }
  }])
