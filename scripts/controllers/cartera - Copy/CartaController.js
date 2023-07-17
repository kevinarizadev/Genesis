'use strict';
angular.module('GenesisApp', [])
.config(function ($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
})
.controller('CartaController', ['$scope', '$http', '$location', '$timeout',
	function ($scope, $http, $location, $timeout) {

		if ($location.search().estado === 'CG') {
			$http({
				method: 'POST',
				url: "../../../php/cartera/funcartera.php",
				data: { function: 'ObtenerInformacionXImprimir',estado: $location.search().estado, tipo: $location.search().tipo ,documento: $location.search().id,data: ''}
			}).then(function (res) {
				$scope.fecha = res.data.fecha;
				$scope.nombre= res.data.nombre;
				$scope.documento = res.data.documento;
				$scope.dirrecion = res.data.dirrecion;
				$scope.telefono =  res.data.telefono;
				$scope.ubicacion = res.data.ubicacion;				
				$scope.cotizante = res.data.cotizante;
				$timeout(function () {
					print(true);
				}, 1000);
			})
		} else if ($location.search().estado === 'AC') {
			$http({
				method: 'POST',
				url: "../../../php/cartera/funcartera.php",
				data: { function: 'ObtenerInformacionXImprimir',estado: $location.search().estado, tipo: $location.search().tipo , documento: $location.search().id,data: '' }
			}).then(function (res) {
				$scope.fecha = res.data.fecha;
				$scope.fecha_limite = res.data.fecha_limite;
				$scope.doc_aportante = res.data.doc_aportante;
				$scope.nombre_aportante = res.data.nombre_aportante;
				$scope.ubicacion = res.data.ubicacion;
				$scope.periodo = res.data.periodo;
				$scope.ano = res.data.ano;
				$scope.cotizante = res.data.cotizante;
				console.log(res.data);
				$timeout(function () {
					print(true);
				}, 1000);
			})
		} else if ($location.search().estado === 'IP') {
			$http({
				method: 'POST',
				url: "../../../php/cartera/funcartera.php",
				data: { function: 'ObtenerInformacionXImprimir',estado: $location.search().estado, tipo: $location.search().tipo , documento: $location.search().id, data:$location.search().data }
			}).then(function (res) {
				$scope.documento_aportante = res.data.documento_aportante;
				$scope.nombre_aportante = res.data.nombre_aportante;
				$scope.ubicacion_aportante = res.data.ubicacion_aportante;
				$scope.periodo = res.data.periodo;
				$scope.anno = res.data.anno;
				$scope.fecha_limite = res.data.fecha_limite;
				$scope.v_dia_habil = res.data.v_dia_habil;
				$scope.v_dos_digito = res.data.v_dos_digito;
				$scope.v_fecha = res.data.v_fecha;
				$timeout(function () {
					print(true);
				}, 1000);
			})
		}  else {

		}


	}
	]);



