'use strict';
	angular.module('GenesisApp',[])
	.config(function($locationProvider) {
     	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
		});
    })
 	.controller('satisfaccioncontroller',['$scope','$http','$location','$timeout',
 	function($scope,$http,$location,$timeout) {
      $http({
         method:'GET',
         url:"../../../php/consultaafiliados/soportes/obtenerencsatisfaccion.php",
         params: {type: $location.search().tipo,id: $location.search().id}
      }).then(function(data){
         $scope.info = data.data;
         $http({
            method:'GET',
            url:"../../../php/consultaafiliados/soportes/obtenerencsatisfaccion_DET.php",
            params: {type: $location.search().tipo,id: $location.search().id}
         }).then(function(res){
            $scope.det = res.data;
            if ($scope.det["0"].RECOMIENDA == "S") {
               $scope.recomienda = "X"
            }else if ($scope.det["0"].RECOMIENDA == "N") {
               $scope.norecomienda = "X"
            }
            $timeout(function () {
               print(true);
            }, 1000);
         })
      })
      
	}
]);