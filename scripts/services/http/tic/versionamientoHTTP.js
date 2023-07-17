'use strict';
/**
* @ngdoc service
* @name GenesisApp.service:versionamientoHttp
* @description
* # servicio http para el llamado al web services con todos los procedimientos
* para el versionamiento.
*/
angular.module('GenesisApp').service('versionamientoHttp', function ($http, $q) {
    return ({
      obtenerNotifications: function () {
        var request = $http({
          method: 'get',
          url: "json/tic/versionamiento.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      statusNotifications: function () {
        var request = $http({
          method: 'POST',
          url: "php/genesis/versionamiento/versionamiento.php",
          data: {
            function: 'obtenerNotificaciones',
            cantidad: 10
          }
        });
        return (request.then(handleSuccess, handleError));
      },
      obtenerJsonIconos: function () {
        var request = $http({
          method: 'get',
          url: 'json/tic/versionamiento_iconos.json'
        });
        return (request.then(handleSuccess, handleError));
      }
    })
    function handleSuccessPost(response) {
      return (response);
    }
    function handleSuccess(response) {
      return (response.data);
    }
    function handleError(error) {
      if (error == null) {
        return ($q.reject(error));
      } else if (error.errorMessage !== undefined) {
        return ($q.reject(error.errorMessage));
      } else {
        return ($q.reject(error.responseJSON.ExceptionMessage));
      }
    }
  });