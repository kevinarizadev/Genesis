'use strict';
angular.module('GenesisApp')
.controller('AnexoDigitalizacionController',['$http','$scope','ngDialog','consultaHTTP','afiliacionHttp','notification','cfpLoadingBar','$window','$sce','$timeout',
	function($http,$scope,ngDialog,consultaHTTP,afiliacionHttp,notification,cfpLoadingBar,$window,$sce,$timeout) {
		swal({title: 'Cargando Anexo'});
		swal.showLoading();
		$http({
         method: 'POST',
         url: "php/juridica/tutelas/functutelas.php",
         data: {
            function: 'descargaAdjunto',
            ruta: $scope.editruta
         }
      }).then(function (response) {
      	//window.open("temp/"+response.data);
			$scope.file = 'temp/'+response.data;
			swal.close();
      });

		$scope.descargafile = function(ruta){
   		$http({
	         method: 'POST',
	         url: "php/juridica/tutelas/functutelas.php",
	         data: {
	            function: 'descargaAdjunto',
	            ruta: ruta
	         }
	      }).then(function (response) {
	      	//window.open("https://genesis.cajacopieps.com//temp/"+response.data);
				window.open("temp/"+response.data);
				swal.close();
	      });
   	}
   }
]);
