'use strict';
angular.module('GenesisApp')
.controller('detallecarpetacontroller',['$rootScope','$scope','$http','carpetaHttp','notification',
 function($rootScope,$scope,$http,carpetaHttp,notification) {
  $scope.codigo_rango = $scope.idbox;
  $rootScope.$on('ngDialog.opened', function (e, $dialog) { $(".ngdialog-content").css({"width": "650px"});  })

  carpetaHttp.mostrarDetalleCarpeta($scope.codigo_rango).then(function (response) {
      $scope.detalles = response;
    })

}]);
