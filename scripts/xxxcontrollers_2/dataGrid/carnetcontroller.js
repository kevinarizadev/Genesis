'use strict';
	angular.module('carnetApp',['ngStorage'])
 	.controller('carnetController',['$scope','$http','$localStorage','$timeout',
 	function($scope,$http,$localStorage,$timeout) {
 		$timeout(function () {
 			$scope.cabeza = $localStorage.fuar;
 			$http({
            method: 'POST',
            url: "../../php/aseguramiento/Rafiliacion.php",
            data: {
               function: 'obtenerbeneficiario',
               tipodoc: $scope.cabeza.TIPODOCUMENTO,
               documento: $scope.cabeza.DOCUMENTO
            }
         }).then(function(response) {
            $scope.datos = response.data;
         })
     }, 2000);
	}
]);