'use strict';
angular.module('GenesisApp')
.controller('controlproyectosController', ['$scope', '$http', 'altocostoHttp','ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller','$rootScope','$window',
function ($scope, $http, altocostoHttp, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
  (function() {
      $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
              opacity: 0, // Opacity of modal background
              inDuration: 300, // Transition in duration
              outDuration: 200, // Transition out duration
              startingTop: '4%', // Starting top style attribute
              endingTop: '10%' // Ending top style attribute
              // ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
              //   alert("Ready");
              //   console.log(modal, trigger);
              // },
              // complete: function() { alert('Closed'); } // Callback for Modal close
            });
    }());
$scope.estado = "0";
$scope.inactive1 = true;

  $http({
     method:'POST',
     url:"php/tic/controlproyectos/Rproyectos.php",
     data: {function:'obtenerproyectos',estado:$scope.estado}
  }).then(function(response){
      $scope.quantity = 107;
      $scope.total = response.data.length;
      $scope.inactive1 = false;

     $scope.info = response.data;
  })

  $http({
     method:'POST',
     url:"php/tic/controlproyectos/Rproyectos.php",
     data: {function:'obtenerconteo'}
  }).then(function(response){
     $scope.conteo = response.data;
  })

$scope.cargarfase = function(id,proyecto){
  $http({
     method:'POST',
     url:"php/tic/controlproyectos/Rproyectos.php",
     data: {function:'obtenerfases',id:id}
  }).then(function(response){
     $scope.fases = response.data;
     $scope.nameproyecto = proyecto;
  })
}

}])
