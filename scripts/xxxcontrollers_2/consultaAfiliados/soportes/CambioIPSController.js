'use strict';
	angular.module('GenesisApp',[])
	.config(function($locationProvider) {
     	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
		});
    })
 	.controller('CambioIPSController',['$scope','$http','$location','$timeout',
 	function($scope,$http,$location,$timeout) {

        var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

 		$http({
         method:'GET',
         url:"../../../php/consultaafiliados/soportes/obtenercarnet.php",
         params: {type: $location.search().tipo,id: $location.search().id}
      }).then(function(res){
          console.log(res.data);
        $scope.info=res.data;
          
        var fecha = new Date ();
        $scope.dia = fecha.getDate();
        $scope.mes = meses[fecha.getMonth()];
        $scope.ano = fecha.getFullYear();        
          $timeout(function () {
            print(true);
        	 }, 1000);
         
      })
		}
]);