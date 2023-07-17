'use strict';
angular.module('GenesisApp')
  .controller('modalgestionacascontratacion', ['$scope', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
    function ($scope, $http, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
      $http({
        method: 'POST',
        url: "php/contratacion/gestionacascontratacion.php",
        data: { function: 'obtenerAcasDetalleXticket', ticket: Number($scope.ticket), ubicacion: Number($scope.ubicacion) }
      }).then(function (response) {
        $scope.listacasdetalle = response.data;
        setTimeout(function () {
          $("#chat_comment")[0].scrollTop = $("#chat_comment")[0].scrollHeight;
        }, 300);
      })
    }])
