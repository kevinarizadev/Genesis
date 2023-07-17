'use strict';
angular.module('GenesisApp')
.controller('InforController', ['$scope', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller','$rootScope','$window',
function ($scope, $http, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {


//alert($scope.a.Nombre_Sala);
console.log($scope.a);
$scope.a = JSON.parse($scope.a);

$scope.Titulo=$scope.a[0].Nombre_Sala;
$scope.Sub_Menu=$scope.a[0].sub_menu;
$scope.Item=$scope.a[0].intem;
$scope.Item1=$scope.a[0].intem1;
$scope.Item2=$scope.a[0].intem2;


}])
