'use strict';
angular.module('GenesisApp')
  .controller('recoveryfuncctrl', ['$scope', '$http',
    function ($scope, $http) {
      $scope.recuperarpassfunc = function () {
        if (!$scope.r_documento || $scope.r_documento.toString().length <= 5) {
          swal('Notificación', 'Ingrese un documento válido', 'info').catch(swal.noop);
          return;
        }
        swal({
          html: `<div class="loading_swal">
          <div class="boob"><img src="./assets/images/icon_humanos.svg" alt="x"></div>
          <div class="boob"><img src="./assets/images/icon_humanos.svg" alt="x"></div>
          <div class="boob"><img src="./assets/images/icon_humanos.svg" alt="x"></div>
        </div>`,
          width: 200,
          allowOutsideClick: false,
          showConfirmButton: false,
        }).catch(swal.noop);
        $http({
          method: 'POST',
          url: "php/login/recuperarpass.php",
          data: {
            function: 'verificapassfunc',
            id: $scope.r_documento
          }
        }).then(function ({ data }) {
          if (data.codigo == 0) {
            swal('Notificación', data.mensaje, 'success').catch(swal.noop);
            $scope.closeThisDialog();
          } else {
            swal('Notificación', data.mensaje, 'warning').catch(swal.noop);
          }
        });
      }

    }
  ]);
