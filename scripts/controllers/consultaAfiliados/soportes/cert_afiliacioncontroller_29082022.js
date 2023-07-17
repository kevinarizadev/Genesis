'use strict';
	angular.module('GenesisApp',[])
	.config(function($locationProvider) {
     	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
		});
   })
 	.controller('cert_afiliacioncontroller',['$scope','$http','$location','$timeout',
 	function($scope,$http,$location,$timeout) {
		$http({
         method:'GET',
         url:"../../../php/consultaafiliados/soportes/getcertafil.php",
         params: {type: $location.search().tipo,
                  id: $location.search().id
                  }
      }).then(function(data){
      	$scope.cert = data.data;
         $timeout(function () {
            print(true);
         }, 1000);
      })
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