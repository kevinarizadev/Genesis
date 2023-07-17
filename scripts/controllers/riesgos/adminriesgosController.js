'use strict';
angular.module('GenesisApp')
  .controller('adminriesgosController', ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', function ($scope, consultaHTTP, notification, cfpLoadingBar, $http) {
    $scope.modulos = [];
    $scope.collapseActive = null;
    $scope.usuario = null;
    $scope.buscarUsuarioValue = '';

    $scope.collapse = function (index) {
      $scope.collapseActive = $scope.collapseActive != index ? index : null;
    }

    $scope.opcionEstado = function (opcion) {



       $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'guardar_permisos',
          P_V_ESTADO: opcion.Permisos.toString(),
          P_V_USUARIO_PERMISO: $scope.buscarUsuarioValue,
          P_V_ACCION_ID: opcion.IdAccion,
          P_V_USUARIO_CREACION: sessionStorage.getItem("usuario"),
        }
      }).then(({ data }) => {
        console.log('data', data);
      });
    }

    $scope.buscarUsuario = function () {
      $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'buscar_usuario',
          V_PUSUARIO: $scope.buscarUsuarioValue
        }
      }).then(({ data }) => {
        if (data[0].Codigo == 404) {
          swal('Información', 'Usuario no encontrado, porfavor intente nuevamente.', 'error');
        } else {
          $scope.usuario = data[0];
          $scope.getModulos();
        }
      });
    }

    $scope.getModulos = function () {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
    });
      $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'permisos_modulos',
          P_V_USUARIO: $scope.buscarUsuarioValue
        }
      }).then(({data}) => {
        $scope.modulos = data;
        swal.close();
      });
    }

  }]);












