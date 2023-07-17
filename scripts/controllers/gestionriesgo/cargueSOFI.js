'use strict';
const providers = ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter', 'FileProcessor'];
providers.push(($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter, FileProcessor) => {
  $scope.estado = "CARGAR";
  $scope.enProgreso = false;
  $scope.cargarArchivo = () => {
    const archivoSivigilaInput = document.querySelector('#archivoSivigila');
    const cargadoArchivoSivigila = archivoSivigilaInput.files.length > 0;

    if (cargadoArchivoSivigila === false) {
      swal('Debe seleccionar un archivo para cargar', '', 'warning');
    } else {
      $scope.enProgreso = true;
      $scope.estado = "CARGANDO INFORMACIÓN";
      const archivoSivigila = archivoSivigilaInput.files[0];

      FileProcessor.read(archivoSivigila)
      .then(data => {
        let timeoutId = null;
        const showWaiting = (timeout) => {
          timeoutId = setTimeout(() => {
            swal('Por favor espere', 'Dependiendo del  tamaño del archivo este proceso puede tomar algunos minutos', 'info').then(() => {
              showWaiting(30000);
            });
          }, timeout);
        }

        showWaiting(1000);
        
        $http({
          method: 'POST',
          url: '/Genesis/php/func_gestionriesgo.php',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            function: 'procesarArchivoSivigila',
            file: data
          }
        }).then((success, error) => {
          clearTimeout(timeoutId);
          $scope.enProgreso = false;
          $scope.estado = "CARGAR";
          if (error) {
            swal('El archivo no se pudo cargar', '', 'error');
            return;
          }
          swal('Archivo cargado exitosamente', '', 'success')
          .then(() => {
            window.location.reload();
          })
          .catch(() => {
            window.location.reload();
          });
        })
        .catch(err => {
          swal('El archivo no se pudo cargar', '', 'error');
          $scope.enProgreso = false;
          $scope.estado = "CARGAR";
        });
      })
      .catch(err => {
        $scope.enProgreso = false;
        $scope.estado = "CARGAR";
      });
    }
  }
});

angular.module('GenesisApp').controller('cargueSOFIController', providers);
