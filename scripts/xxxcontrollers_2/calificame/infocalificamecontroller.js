'use strict';
angular.module('GenesisApp')
.controller('infocalificamecontroller',['$scope','$http','calificacionHttp','$rootScope',
 function($scope,$http,calificacionHttp,$rootScope) {
  $rootScope.$on('ngDialog.opened', function (e, $dialog) { 
    $(".ngdialog-content").css({"width": "70%"});})
  $scope.identificacion = $scope.cedula; 
  calificacionHttp.mostrarreporte($scope.identificacion).then(function (response) {
     $scope.solicitudes = response.data;
  })

}]);
