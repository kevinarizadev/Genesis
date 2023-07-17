'use strict';
angular.module('GenesisApp', [])
	.config(function ($locationProvider) {
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	})
	.controller('actaController', ['$scope', '$http', '$location', '$timeout',
		function ($scope, $http, $location, $timeout) {

			if ($location.search().estado == 'AF') {

				$scope.a = JSON.parse($location.search().info);
				$scope.name_c = $scope.a.primer_nombre + ' ' + $scope.a.segundo_nombre + ' ' + $scope.a.primer_apellido + ' ' + $scope.a.segundo_apellido;
				$scope.tipo_documento = $scope.a.tipo_documento;
				$scope.numero_documento = $scope.a.documento;
				$scope.fecha_nacimiento = $scope.a.nacimiento;
				$scope.direccion = $scope.a.direccion;
				$scope.barrio = $scope.a.localidad;
				$scope.municipio = $scope.a.municipio;
				$scope.correo = $scope.a.correo;
				$scope.tel_fijo = $scope.a.fijo;
				$scope.tel_celular = $scope.a.celular;
				$timeout(function () { print(true); }, 1000);
			} else if ($location.search().estado == 'BE') {

				$scope.a = JSON.parse($location.search().info);

				$scope.name_c = $scope.a.primer_nombre + ' ' + $scope.a.segundo_nombre + ' ' + $scope.a.primer_apellido + ' ' + $scope.a.segundo_apellido;
				$scope.tipo_documento = $scope.a.tipo_documento;
				$scope.numero_documento = $scope.a.documento;
				$scope.fecha_nacimiento = $scope.a.nacimiento;
				$http({
					method: 'GET',
					url: "../../../php/consultaafiliados/soportes/obtenercarnet.php",
					params: {
						type: $location.search().tipo,
						id: $location.search().id
					}
				}).then(function (data) {
					$scope.direccion = data.data.DIRECCION;
					$scope.barrio = data.data.LOCALIDAD;
					$scope.municipio = data.data.MUNICIPIO;
					$scope.correo = data.data.CORREO;
					$scope.tel_fijo = data.data.TELEFONO;
					$scope.tel_celular = data.data.CELULAR;
					$timeout(function () { print(true); }, 1000);

				})

			} else {
				$http({
					method: 'GET',
					url: "../../../php/consultaafiliados/soportes/obtenercarnet.php",
					params: {
						type: $location.search().tipo,
						id: $location.search().id
					}
				}).then(function (data) {
					$scope.name_c = data.data.NOMBRE;
					$scope.tipo_documento = data.data.TIPODOCUMENTO;
					$scope.numero_documento = data.data.DOCUMENTO;
					$scope.fecha_nacimiento = data.data.NACIMIENTO;
					$scope.direccion = data.data.DIRECCION;
					$scope.barrio = data.data.LOCALIDAD;
					$scope.municipio = data.data.MUNICIPIO;
					$scope.correo = data.data.CORREO;
					$scope.tel_fijo = data.data.TELEFONO;
					$scope.tel_celular = data.data.CELULAR;
					$timeout(function () { print(true); }, 1000);

				})
			}






		}]);