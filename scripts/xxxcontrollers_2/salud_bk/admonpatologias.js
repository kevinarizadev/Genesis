'use strict';
angular.module('GenesisApp')
.controller('admonpatologiasctrl',['$scope','consultaHTTP','notification','cfpLoadingBar','$http',function($scope,consultaHTTP,notification,cfpLoadingBar,$http) {
	$scope.paneladdpatologia = false;
   $http({
     	method:'POST',
     	url:"php/salud/poblacionespecial/funcpoblacionesp.php",
     	data: {function:'cargapatologias'}
  	}).then(function(response){
     	$scope.Patologias = response.data;
  	});
   
  	$('#listpatologia').on('click', 'tbody tr', function(event) {
      $(this).addClass('arr').siblings().removeClass('arr');
   });
}]);
