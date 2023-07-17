'use strict';
   angular.module('GenesisApp')
   .controller('modalDetallesSolMovCtrl',['$scope','$http','$window','ngDialog',
   function($scope,$http,$window,ngDialog) {
      console.log($scope.gestion);
      $scope.descargafile = function(ruta){
         $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
               function: 'descargaAdjunto',
               ruta: ruta
            }
         }).then(function (response) {
            window.open("temp/"+response.data);
            //$scope.file = response.data;
         });
      }
   }
]);