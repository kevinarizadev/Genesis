'use strict';
angular.module('GenesisApp')
.controller('uniticcontroller',['$scope','$http','$localStorage','$controller','reporteHttp','$sce',
 function($scope,$http,$localStorage,$controller,reporteHttp,$sce) {
$scope.redireccionar = function(){
  window.locationf="https://cajacopieps.milaulas.com";
}
}]);
