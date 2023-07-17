'use strict';
angular.module('GenesisApp')
.controller('ProcesosBDUAController', ['$scope', '$rootScope', '$http', '$filter', '$window', function ($scope, $rootScope, $http,$filter,$window) {

	$scope.EjecutarJob = function () {
		swal({
			html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Ejecutando Procesos</p>',
			width: 200,
			allowOutsideClick: false,
			allowEscapeKey: false,
			showConfirmButton: false,
			animation: false
		});
		$http({
			method: 'POST',
			url: "php/basededatos/funcbdua.php",
			data: { function: 'EjecutarJob'}
		}).then(function (response) {
			swal.close();
			if (response.data.codigo == 0) {
				swal('Genesis informa',response.data.mensaje,'success');
			} else {
				swal('Genesis informa',response.data.mensaje,'info');
			}
		});
	}

	$scope.PlanVacunacion = function () {
		swal({
			html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Ejecutando Procesos</p>',
			width: 200,
			allowOutsideClick: false,
			allowEscapeKey: false,
			showConfirmButton: false,
			animation: false
		});
		$http({
			method: 'POST',
			url: "php/basededatos/funcbdua.php",
			data: { function: 'EjecutarJob2'}
		}).then(function (response) {
			swal.close();
			if (response.data.codigo == 0) {
				swal('Genesis informa',response.data.mensaje,'success');
			} else {
				swal('Genesis informa',response.data.mensaje,'info');
			}
		});

	}





}]);
