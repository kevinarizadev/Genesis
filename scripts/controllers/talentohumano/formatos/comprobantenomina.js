'use strict';
	angular.module('GenesisApp',[])
	.config(function($locationProvider) {
     	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
		});
   })
 	.controller('comprobanteCtrl',['$scope','$http','$location','$timeout',
 	function($scope,$http,$location,$timeout) {  
      $scope.anio = $location.search().anio;
      $scope.per = $location.search().per;
      $scope.mestext = $location.search().mestext;
		$http({
         method:'POST',
         url:"../../../php/talentohumano/nomina/funcnomina.php",
         data: {anio: Number($location.search().anio),
               mes: Number($location.search().mes),
               per: Number($location.search().per),
               function: 'volantePago'
         }
      }).then(function(response){
      	$scope.Conceptos = response.data.conceptos;
         $scope.Afiliaciones = response.data.afiliaciones[0];
         $scope.Totales = response.data;
         if ($scope.Totales.totales[0].naturaleza == "D") {
            $scope.totalesDev = $scope.Totales.totales[0].valor;
         }
         if ($scope.Totales.totales[1].naturaleza == "D") {
            $scope.totalesDev = $scope.Totales.totales[1].valor;
         }
         if ($scope.Totales.totales[0].naturaleza == "C") {
            $scope.totalesDed = $scope.Totales.totales[0].valor;
         }
         if ($scope.Totales.totales[1].naturaleza == "C") {
            $scope.totalesDed = $scope.Totales.totales[1].valor;
         }
         //$scope.totalesDed = $scope.Totales.totales[0].valor;
         
         if ($scope.per == "1") {            
            $scope.periodo_pago = "Primer periodo del mes " + $scope.mestext + " de " + $scope.anio;
         }else{
            $scope.periodo_pago = "Segundo periodo del mes " + $scope.mestext + " de " + $scope.anio;
         }
         $timeout(function () {
            print(true);
         }, 1000);
      })
	}
]);