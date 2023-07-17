'use strict';
	angular.module('carnetApp',['ngStorage'])
 	.controller('carnetController',['$scope','$http','$localStorage','$timeout',
 	function($scope,$http,$localStorage,$timeout) {
 		$timeout(function () {
            $scope.datos = $localStorage.fuarbef;
            $scope.cabeza = $localStorage.fuar;
        }, 2000);
	}
]);