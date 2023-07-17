'use strict';
	angular.module('GenesisApp',[])
	.config(function($locationProvider) {
     	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
		});
    })
 	.controller('carnetcontroller',['$scope','$http','$location','$timeout','communication',
 	function($scope,$http,$location,$timeout,communication) {
 		$scope.obtenerParam = function(tipo,numero){
 			if ($location.search().carn == "false") {
 				$http({
			         method:'GET',
			         url:"../../../php/consultaafiliados/soportes/entregacarne.php",
			         params: {
			   			type: $location.search().tipo,
			            id: $location.search().id
		            }
			      }).then(function(resp){
			         if (resp.data == 1) {
			         	communication.carne = 1;
						$timeout(function () {
							print(true);
						}, 2000);
			         }
			      })
 			}
 			$http({
	         method:'GET',
	         url:"../../../php/consultaafiliados/soportes/obtenercarnet.php",
	         params: {type: $location.search().tipo,
	                  id: $location.search().id
	                  }
	      }).then(function(data){
	         $scope.cabeza = data.data;
			 communication.carne = 1;
			$timeout(function () {
				print(true);
			}, 2000);
	      })
	      
 		}
 		var mediaQueryList = window.matchMedia('print');
			mediaQueryList.addListener(function(mql) {
					if (mql.matches) {
							console.log('se hizo antes de imprimir');
					} else {
							console.log('se hizo despues de imprimir');
							setTimeout(function () {
								window.close();
							}, 10);
					}
			});
	}
]);