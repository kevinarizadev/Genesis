'use strict';
angular.module('GenesisApp')
.controller('mensajeController', ['$scope', '$http','ngDialog', 'notification', '$timeout', '$q', 'communication', '$controller','$rootScope','$window',
function ($scope, $http, ngDialog, notification, $timeout, $q, communication, $controller, $rootScope, $window) {

    $scope.numero = "";
    $scope.descripcion = "";

    $scope.enviarMensaje = function(){
      if($scope.numero != "" && $scope.descripcion != ""){
        $http({
          method:'POST',
          url:"https://api.infobip.com/sms/1/text/single",
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
            'accept' : 'application/json'
          },
          data: {
            "from": "CajacopiEPS",
            "to": "57"+$scope.numero,
            "text": $scope.descripcion
          }
        }).then(function(response){
          console.log(response);
          notification.getNotification('success', 'Mensaje Enviado', 'Notificacion')
        });
      }else{
        swal('Por favor Complete los campos requeridos');
      }
    }
}])
