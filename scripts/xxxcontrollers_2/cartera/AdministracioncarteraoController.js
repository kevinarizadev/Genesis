'use strict';
angular.module('GenesisApp')
.controller('AdministracioncarteraoController', ['$scope', '$rootScope', '$http', '$filter','$window','afiliacionHttp', 'ngDialog',function ($scope, $rootScope,$http,$filter,$window,afiliacionHttp,ngDialog) {

	$scope.ListarGestionCartera = function () {
		$http({
			method: 'POST',
			url: "php/cartera/funcartera.php",
			data: { function: 'ListarGestionCartera' }
		}).then(function (response) {
			$scope.duplicar = response.data;
		});	
	}
	$scope.GenerarAccionCartera = function (accion, data) {
		if (accion == 'L') { data = { codigo: '',responsable: '',estado:''}}
			if (accion == 'S') { var datatemp = data; data = { codigo: '',responsable: '',estado:''}}
		if (accion == 'I') { if (data.estado == 'INACTIVO') { data.estado = 'A' } else {  data.estado = 'I' } }
			swal({
				html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Carganado Informacion...</p>',
				width: 200,
				allowOutsideClick: false,
				allowEscapeKey: false,
				showConfirmButton: false,
				animation: false
			});
		$http({
			method: 'POST',
			url: "php/cartera/funcartera.php",
			data: { function: 'GenerarAccionCartera', accion:accion, codigo:data.codigo, estado:data.estado, responsable:data.responsable}
		}).then(function (response) {
			swal.close();
			if (accion == 'L') {
				$scope.funcionarios = response.data;	
			} else if (accion == 'S') {
				$scope.select = response.data;
				$scope.EditarSegmentaciOn(datatemp);
			} else {
				$scope.respuesta = response.data;
				if ($scope.respuesta.codigo == 0) {
					swal('Notificacion',$scope.respuesta.mensaje,'success').then((result) => {
						if (result) { $scope.GenerarAccionCartera('L','');}
					})
				} else {
					swal('Notificacion',$scope.respuesta.mensaje,'info');
				}
			}
		});	
	}
	$scope.EditarSegmentaciOn = function (informacion) {
		$scope.array = {};
		for (var i = 0; i < $scope.select.length; i++) {
			 var key = $scope.select[i].codigo;
			var val = $scope.select	[i].nombre;
			$scope.array[key] = val;
		}
		swal({
			title: 'Seleccionar Segmentacion De Cartera',
			input: 'select',
			inputOptions: $scope.array,
			inputPlaceholder: 'Seleccionar',
			showCancelButton: true,
		}).then((result) => {
			if (result) {
				$http({
					method: 'POST',
					url: "php/cartera/funcartera.php",
					data: { function: 'GenerarAccionCartera', accion:'E', codigo:informacion.codigo, estado:'', responsable:result}
				}).then(function (response) {
					$scope.respuesta = response.data;
					if ($scope.respuesta.codigo == 0) {
						swal('Notificacion',$scope.respuesta.mensaje,'success').then((result) => {
							if (result) {
								$scope.GenerarAccionCartera('L','');
								$scope.ListarGestionCartera();
							}
						})
					} else {
						swal('Notificacion',$scope.respuesta.mensaje,'info');
					}
				});	
			}
		})
	}
	$scope.ConsultarFuncionario = function () {
		swal({
			title: 'Consultar Funcionario',
			html: '<form name="f1" id="f1"><input type="text" name="f1t1" id="f1t1"class="border-none input-text-new" placeholder="Documento" style="height:2rem;width:20em;"></form>',
			inputPlaceholder: 'Documento Identidad',
			showCancelButton: true,
			allowOutsideClick: false,
			allowEscapeKey: false,
			confirmButtonText: 'Consultar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result) {
				var datos = document.getElementById("f1t1").value
				if (datos === null || datos === undefined || datos === '') {
					swal('Notificación','Debe Digitar Un Documento','info').then((result) => {
						if (result) { $scope.ConsultarFuncionario();}
					})					
				} else {
					$http({
						method: 'POST',
						url: "php/cartera/funcartera.php",
						data: { function: 'GenerarAccionCartera', accion:'C', codigo:'', estado:'', responsable:datos}
					}).then(function (response) {
						$scope.datainfo = response.data;
						if ($scope.datainfo.codigo == 0) {
							swal({
								title: $scope.datainfo.nombre,
								showCancelButton: true,
								allowOutsideClick: false,
								allowEscapeKey: false,
								confirmButtonText: 'Registrar',
								cancelButtonText: 'Cancelar',
							}).then((result) => {
								$http({
									method: 'POST',
									url: "php/cartera/funcartera.php",
									data: { function: 'GenerarAccionCartera', accion:'R', codigo:'', estado:'', responsable:$scope.datainfo.responsable}
								}).then(function (response) {
									if (response.data.mensaje) {
										swal('Notificacion',response.data.mensaje,'success');
									} else {
										swal('Notificacion',response.data.mensaje,'info');			
									}
								});	
							})
							
						} else {
							swal('Notificacion',$scope.datainfo.mensaje,'info');
						}
					});	
				}
			}
		})
	}
	$scope.CalcularPorcentaje = function (info) {
		swal({
			title: 'Elegir porcertanje de la meta?',
			icon: 'question',
			input: 'range',
			inputAttributes: {
				min: 1,
				max: 100,
				step: 1
			},
			inputValue: info.porcentaje
		}).then((result) => {
			$http({
				method: 'POST',
				url: "php/cartera/funcartera.php",
				data: { function: 'GenerarAccionCartera', accion:'P', codigo:info.codigo, estado:result, responsable:info.responsable}
			}).then(function (response) {
				if (response.data.mensaje) {
					swal('Notificacion',response.data.mensaje,'success').then((result) => {
						if (result) { 
							$scope.GenerarAccionCartera('L','');
							$scope.ListarGestionCartera();
						}
					})	
				} else {
					swal('Notificacion',response.data.mensaje,'info');			
				}
			});
		})
	}

}]);










