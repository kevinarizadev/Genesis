'use strict';
angular.module('GenesisApp')
.controller('GestionNacimientoIPS', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar', 'afiliacionHttp',
	function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar, afiliacionHttp) {
		
		$scope.VisualizarInformacion  = function (id) {
			switch (id) {
				case 'GR':
				if ($scope.GestionRechazo) {
					$scope.GestionRechazo = false;
				} else {
					$scope.GestionRechazo = true;
				}
				break;
				case 'GI':
				if ($scope.GestionIPS) {
					$scope.GestionIPS = false;
				} else {
					$scope.GestionIPS = true;
				}
				break;
				case 'GF':
				if ($scope.GestionFuncionario) {
					$scope.GestionFuncionario = false;
				} else {
					$scope.GestionFuncionario = true;
				}
				break;	
				default:
				break;
			}
		}

		$scope.CantidadRechazados = function () {
			swal({
				html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Información...</p>',
				width: 200,
				allowOutsideClick: false,
				allowEscapeKey: false,
				showConfirmButton: false,
				animation: false
			});
			$http({
				method: 'POST',
				url: "php/ips/func3047.php",
				data: { function: 'CantidadRechazados' }
			}).then(function (response) {
				$scope.data = response.data;
				swal.close();
			});	
		}

		$scope.IPSRechazo = function () {
			$http({
				method: 'POST',
				url: "php/ips/func3047.php",
				data: { function: 'IPSRechazo' }
			}).then(function (response) {
				if ($scope.estadoips == 'Z') {
					$scope.idips.destroy();
				}
				$scope.infoips = response.data;
				$scope.estadoips = 'Z';
				setTimeout(function () {
					$scope.idips = $('#idips').DataTable({
						dom: 'lBsfrtip',
						select: true,
						buttons: ['csv', 'excel'],
						language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
						destroy: true,
						responsive: true,
						lengthMenu: [
						[5, 20, -1],
						[10, 50, 'Todas']
						],
						order: [
						[0, "desc"]
						]
					});
				}, 500);
			});
		}

		$scope.FuncionarioRechazo = function () {
			$http({
				method: 'POST',
				url: "php/ips/func3047.php",
				data: { function: 'FuncionarioRechazo' }
			}).then(function (response) {
				if ($scope.estadofunc == 'F') {
					$scope.idfunc.destroy();
				}
				$scope.infofunc = response.data;
				$scope.estadofunc = 'F';
				setTimeout(function () {
					$scope.idfunc = $('#idfunc').DataTable({
						dom: 'lBsfrtip',
						select: true,
						buttons: ['csv', 'excel'],
						language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
						destroy: true,
						responsive: true,
						lengthMenu: [
						[5, 20, -1],
						[10, 50, 'Todas']
						],
						order: [
						[0, "desc"]
						]
					});
				}, 500);
			});
		}

	}]);

