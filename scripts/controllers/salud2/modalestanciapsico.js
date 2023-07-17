// modalestanciapsico
'use strict';
angular.module('GenesisApp')
  .controller('modalestanciapsico', ['$scope', '$http', 'ngDialog',
    function ($scope, $http, ngDialog) {
      // obtenerPreguntasPsi
      $http({
        method: 'POST',
        url: "php/censo/censo.php",
        data: { function: 'obtenerPreguntasPsi' }
      }).then(function (response) {
        $scope.preguntas = response.data;

        $scope.newarray = $scope.preguntas.map(function (item) {
          item.modelo = '';
          return item;
        });

      });

      $scope.guardar = function (preguntas) {
        swal({
          title: 'Espere un momento',
          text: 'Guardando Encuesta',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          onOpen: () => {
              swal.showLoading()
          }
      });
      setTimeout(() => {
        swal.close();
      }, 2000);
        $scope.respuestas = {
          respuestas: preguntas
        }

        // console.log($scope.respuestas);
       $scope.closeThisDialog($scope.respuestas);
        //ngDialog.close();
      }
    }]);