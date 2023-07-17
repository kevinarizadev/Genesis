'use strict';
	angular.module('GenesisApp',[])
	.config(function($locationProvider) {
     	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
		});
   })
 	.controller('cert_portabilidadctrl',['$scope','$http','$location','$timeout',
 	function($scope,$http,$location,$timeout) {
		$http({
         method:'GET',
         url:"../../../php/consultaafiliados/soportes/getcertport.php",
         params: {type: $location.search().tipo,
                  id: $location.search().id
                  }
      }).then(function(data){
         console.log(data);
      	$scope.data = data.data;
         $timeout(function () {
            print(true);
         }, 1000);
      })
	}
]);