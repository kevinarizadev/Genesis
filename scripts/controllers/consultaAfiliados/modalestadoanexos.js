'use strict';
angular.module('GenesisApp')
.controller('estadoanexoctrl', ['$http', '$scope', 'ngDialog', 'consultaHTTP', 'afiliacionHttp', 'notification', 'cfpLoadingBar', '$window', '$sce', '$timeout', 'digitalizacionHTTP',
	function ($http, $scope, ngDialog, consultaHTTP, afiliacionHttp, notification, cfpLoadingBar, $window, $sce, $timeout, digitalizacionHTTP) {

		$scope.OcultarAccion = false;
		$scope.HabilitarTipo = false;

		$scope.ito = {
			tiporechazo:'',
			estado:''
		}

		
		if ($scope.ftp == 1) {
			$http({
				method: 'POST',
				url: "php/juridica/tutelas/functutelas.php",
				data: { function: 'descargaAdjunto', ruta: $scope.editruta }
			}).then(function (response) {
				if (response.data.length == '0') {
					swal('Error', response.data, 'error');
				} else {
					$scope.file = 'temp/' + response.data;
					var tipo = $scope.file.split(".");
					tipo = tipo[tipo.length - 1];
					if (tipo.toUpperCase() == "PDF") {
						$scope.tipoImgPdf = false;
					} else if (tipo.toUpperCase() == "JPG" || tipo.toUpperCase() == "JPEG" || tipo.toUpperCase() == "PNG" || tipo.toUpperCase() == "TIFF" || tipo.toUpperCase() == "BMP") {
						$scope.tipoImgPdf = true;
						setTimeout(function(){ $scope.zoom();  }, 1000);    
					} else {
						swal('Error', response.data, 'error');
					}
				}
			});
		}
		if ($scope.ftp == 2) {
			$http({
				method: 'POST',
				url: "php/getfileSFtp.php",
				data: { function: 'descargaAdjunto', ruta: $scope.editruta }
			}).then(function (response) {
				if (response.data.length == '0') {
					swal('Error', response.data, 'error');
				} else {
					$scope.file = 'temp/' + response.data;
					var tipo = $scope.file.split(".");
					tipo = tipo[tipo.length - 1];
					if (tipo.toUpperCase() == "PDF") {
						$scope.tipoImgPdf = false;
					} else if (tipo.toUpperCase() == "JPG" || tipo.toUpperCase() == "JPEG" || tipo.toUpperCase() == "PNG" || tipo.toUpperCase() == "TIFF" || tipo.toUpperCase() == "BMP") {
						$scope.tipoImgPdf = true;
						setTimeout(function(){ $scope.zoom();  }, 1000);    
					} else {
						swal('Error', response.data, 'error');
					}
				}
			});
		}

		if ($scope.ftp == 3) {
			$http({
				method: 'POST',
				url: "php/juridica/tutelas/functutelas.php",
				data: { function: 'descargaAdjuntoftp3', ruta: $scope.editruta }
			}).then(function (response) {
				if (response.data.length == '0') {
					swal('Error', response.data, 'error');
				} else {
					$scope.file = 'temp/' + response.data;
					var tipo = $scope.file.split(".");
					tipo = tipo[tipo.length - 1];
					if (tipo.toUpperCase() == "PDF") {
						$scope.tipoImgPdf = false;
					} else if (tipo.toUpperCase() == "JPG" || tipo.toUpperCase() == "JPEG" || tipo.toUpperCase() == "PNG" || tipo.toUpperCase() == "TIFF" || tipo.toUpperCase() == "BMP") {
						$scope.tipoImgPdf = true;
						setTimeout(function(){ $scope.zoom();  }, 1000);    
					} else {
						swal('Error', response.data, 'error');
					}
				}
			});
		}

/*

			$http({
				method: 'POST',
				url: "php/juridica/tutelas/functutelas.php",
				data: {
					function: 'descargaAdjunto',
					ruta: $scope.editruta
				}
			}).then(function (response) {
				//window.open("temp/"+response.data);
				$scope.file = 'temp/' + response.data;

				var tipo = $scope.file.split(".");
				tipo = tipo[tipo.length - 1];
				if (tipo.toUpperCase() == "PDF") {
					$scope.tipoImgPdf = false;
				} else if (tipo.toUpperCase() == "JPG" || tipo.toUpperCase() == "JPEG" || tipo.toUpperCase() == "PNG" || tipo.toUpperCase() == "TIFF" || tipo.toUpperCase() == "BMP") {
					$scope.tipoImgPdf = true;
					setTimeout(function () { $scope.zoom(); }, 1000);
				} else {
					swal('Error', response.data, 'error');
				}

			});
			*/
			digitalizacionHTTP.listado_rechazo().then(function (response) {
				$scope.proceso = response;
				$scope.validaaccion();
			})

			$scope.guardaEstado = function () {
				if ($scope.estado == 'ACTIVO') { $scope.estado = 'A'; } else { $scope.estado = 'R'; }
				$http({
					method: 'POST',
					url: "php/consultaAfiliados/funcnovedadacb.php",
					data: {
						function: 'cambio_estado_soporte', ruta: $scope.editruta,
						estado: $scope.ito.estado,
						tipo_rechazo: $scope.ito.tiporechazo,
						responsable: sessionStorage.getItem("cedula")
					}
				}).then(function (response) {
					if (response.data.codigo == '0') {
						notification.getNotification('success', response.data.mensaje, 'Notificación');
						ngDialog.closeAll();
					} else {
						notification.getNotification('success', response.data.mensaje, 'Notificación');
					}
					
				});
			}

			$scope.VisualizarDocumento = function (ruta) {
				window.open(ruta);
			}

			$scope.descargafile = function (ruta) {
				$http({
					method: 'POST',
					url: "php/juridica/tutelas/functutelas.php",
					data: {
						function: 'descargaAdjunto',
						ruta: ruta
					}
				}).then(function (response) {
					//window.open("https://genesis.cajacopieps.com//temp/"+response.data);
					window.open("temp/" + response.data);
				});
			}

			$scope.validaaccion = function () {
				if (sessionStorage.getItem("cedula") == '8521697' || sessionStorage.getItem("cedula") == '22523027' || sessionStorage.getItem("cedula") == '8646049' || sessionStorage.getItem("cedula") == '1143450658') {
					$scope.OcultarAccion = true;
				} else {
					$scope.OcultarAccion = false;
				}
			}

			$scope.HabilitarTipoRechazo = function (estado) {
				if (estado == 'R') {
					$scope.HabilitarTipo = true;
				} else {
					$scope.HabilitarTipo = false;
				}
			}




		}]);