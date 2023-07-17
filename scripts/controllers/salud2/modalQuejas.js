//modalQuejasctrls
'use strict';
angular.module('GenesisApp')
  .controller('modalQuejasctrls', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar', 'pqrHttp',
    function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar, pqrHttp) {
      $scope.mot_especificos = ' ';
      pqrHttp.getMotivosEspecificos().then(function (response) {
        $scope.mot_especificos = response;
      })

      

      $scope.actualiza_queja = function () {
        // console.log($scope.array_queja);
        $http({
          method: 'POST',
          url: "php/censo/nuevas_funciones.php",
          data: {
            function: 'insertar_queja',
            pcodigo: $scope.array_queja.codigo,
            descripcion: $scope.array_queja.descripcion,
            id: $scope.array_queja.id,
            pnumero: $scope.array_queja.numero,
            pubicacion: $scope.array_queja.ubicacion
          }
        }).then(function (response) {
          codigo
          if (response.data.codigo == 0) {
            swal('Notificacion', response.data.mensaje, 'success');
            ngDialog.close();
          } else {

          }

        });

      }
      
$scope.desc=$scope.listevolucionpaciente[$scope.array_queja.id-1].DESQUEJAS;

      $scope.gestion_queja = function(){
        $http({
          method: 'POST',
          url: "php/censo/nuevas_funciones.php",
          data: {
            function: 'ACTUALIZAR_RESPUESTA_QUEJAS',
            pnumero: $scope.array_queja.numero,
            pubicacion: $scope.array_queja.ubicacion,
            id: $scope.array_queja.id,
            descripcion: $scope.respuesta
          }
        }).then(function (response) {
          swal('Notificacion', response.data.mensaje, 'success');
          ngDialog.close();
        });
      }
    }
  ]);

