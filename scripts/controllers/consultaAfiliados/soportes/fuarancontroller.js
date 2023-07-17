'use strict';
	angular.module('GenesisApp',[])
	.config(function($locationProvider) {
     	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
		});
    })
 	.controller('fuarancontroller',['$scope','$http','$location','$timeout',
 	function($scope,$http,$location,$timeout) {
		$http({
         method:'GET',
         url:"../../../php/consultaafiliados/soportes/obtenerfuaran.php",
         params: {type: $location.search().tipo,
                  id: $location.search().id
                  }
      }).then(function(data){
      	$scope.info = data.data;
      	$scope.usergenera =$location.search().user;
      	$scope.ubicaciongenera = $location.search().ubicacion;
        $timeout(function () {
          print(true);
        }, 1000);
      })
	}
]);