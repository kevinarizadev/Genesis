'use strict';
angular.module('GenesisApp')
.controller('AvisoinCumplimientoController', ['$scope', '$rootScope', '$http', '$filter', '$window', function ($scope, $rootScope, $http,$filter,$window) {

	$(document).ready(function(){$('#modaltablaincumplimiento').modal();});

	$scope.ValidaEmpresaPanelTabla = false;
	$scope.ConsolidadoEmpresaPanelTabla = false;
	$scope.AportanteMarcado = [];
	$scope.check_user = [];
	$scope.select_all=false;


	$scope.TipoReporte = function (tipo) {
		switch (tipo) {
			case 'CE':
			$scope.ValidaEmpresaPanelTabla = false;
			$scope.ConsolidadoEmpresaPanelTabla = true;
			break;
			case 'GC':
			if  ($scope.AportanteMarcado.length == 0) {
				swal('notificacion','Debe Marcar Al Menos Un Aportante Para Poder Generar La Carta','info');
			} else {
				$scope.EnviarCarta();
			}
			break;
			default:
			break;
		}
	}


	$scope.VisualizarDetalle = function (informacion) {
		$('#modaltablaincumplimiento').modal('open');
		$http({
			method: 'POST',
			url: "php/cartera/funcartera.php",
			data: { function: 'ObtenerDetalle', documento: informacion.doc_aportante}
		}).then(function (response) {
			$scope.inforespuesta = response.data;

		});
	}


	$scope.ListarConsolidadoIncumplimiento = function (estado) {
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
			data: { function: 'ObtenerListadoMensual' }
		}).then(function (response) {
			if (response.data.length > 0) {
				if (estado == 'destruir') {
					$scope.tableinformaciontemp.destroy();
				}
				$scope.data = response.data;
				$scope.infodatatemp = $scope.data;
				$scope.cantidadtemp = response.data.length;
				swal.close();
			} else {
				swal('Genesis informa', 'No hay Informacion para Mostrar', 'warning');
			}
		});
	}

	$scope.VerDetalle = function (info) {
		$scope.info = info;
		$('#modaltablaincumplimiento').modal('open');
	}

	$scope.checkboxAllSelect = function (check_value) {
		if (check_value) {
			$scope.infodatatemp.forEach(function (element, index) {
				var i = $scope.AportanteMarcado.findIndex(elemt => elemt.nit == element.nit);
				if (i == -1) {
					$scope.AportanteMarcado.push(element);
				} else {
					console.log("Aportante repetido: " + element.nit);
				}
				$scope.check_user[index] = check_value;
				$scope.infodatatemp[index].checked = check_value;
			});
		} else {
			$scope.infodatatemp.forEach(function (element, index) {
				var i = $scope.AportanteMarcado.findIndex(elemt => elemt.nit == element.nit);
				if (i != -1) {
					$scope.AportanteMarcado.splice(i, 1);
				}
				$scope.check_user[index] = check_value;
				$scope.infodatatemp[index].checked = check_value;
				console.log($scope.AportanteMarcado);
			});
		}
	}

	$scope.checkbox_select_users = function (index, check_value, cd) {
		if (check_value) {
			var i = $scope.AportanteMarcado.findIndex(elemt => elemt.nit == cd.nit);
			if (i == -1) {
				$scope.AportanteMarcado.push(cd);
			} else {
				console.log("Aportante repetido: " + cd.nit);
			}
		} else {
			var i = $scope.AportanteMarcado.findIndex(elemt => elemt.nit == cd.nit);
			if (i != -1) {
				$scope.AportanteMarcado.splice(i, 1);
			}
		}
		console.log($scope.AportanteMarcado);
	}

	$scope.CerrarModal = function () {
		$('#modaltablaincumplimiento').modal('close');
	}


	$scope.checkoption = function(info,cod) {
		if ( $('#aportante2_'+cod).prop('checked')) {
			$scope.AportanteMarcado.push(info);
		} else {
			for (var i = 0; i < $scope.AportanteMarcado.length; i++) {
				if ($scope.AportanteMarcado[i].documento_afiliado == info.documento_afiliado) {
					$scope.AportanteMarcado.splice(i, 1);
				}
			}
		}
		$scope.validarmarcacion();
	}

	$scope.seleccionarOpcion = function() {
		if ( $('#filled-in-box-servicheck2').prop('checked')) {
			for (var i = 0; i < $scope.infodatatemp.length; i++) {
				var x = null;
				for (var z = 0; z < $scope.AportanteMarcado.length; z++) {
					if ($scope.AportanteMarcado[z].doc_aportante == $scope.infodatatemp[i].doc_aportante ){
						x = 1;
						break;
					}
				}
				if (x == null) {
					$scope.infodatatemp[i].checked = true; 
					$scope.AportanteMarcado.push($scope.infodatatemp[i]);  
				}
			}
			$(".aportante").prop('checked',true);
		} else {
			for (var i = 0; i < $scope.infodatatemp.length; i++) {
				$scope.infodatatemp[i].checked = false; 
			}
			$scope.AportanteMarcado = [];
			$(".aportante").prop('checked',false);
		}
		console.log($scope.AportanteMarcado);
		$scope.validarmarcacion();
	}

	$scope.filter = function (val) {
		$scope.infodatatemp = $filter('filter')($scope.data, val);
	}

	$scope.validarmarcacion = function () {
		if ($scope.cantidadtemp == $scope.AportanteMarcado.length) {
			$('#filled-in-box-servicheck2').prop('checked',true);
		} else {
			$('#filled-in-box-servicheck2').prop('checked',false);
		}
	}   

	$scope.EnviarCarta = function () {
		if (sessionStorage.getItem('cedula') === null || sessionStorage.getItem('cedula') === 0 || sessionStorage.getItem('cedula') == undefined) {
			swal('Genesis informa', 'Ingresar A Nuestro Portal Genesis', 'info');
		} else {
			swal({
				html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Enviando Notificaciones...</p>',
				width: 200,
				allowOutsideClick: false,
				allowEscapeKey: false,
				showConfirmButton: false,
				animation: false
			});
			$http({
				method: 'POST',
				url: "php/cartera/funcartera.php",
				data: { function: 'SendMailMoraMensual', 
				json_aportante: JSON.stringify($scope.AportanteMarcado), 
				responsable: sessionStorage.getItem('cedula'),
				tipo_proceso:'8',
				cantidad: $scope.AportanteMarcado.length}
			}).then(function (response) {
				$scope.respuesta = response.data;
				if ($scope.respuesta.codigo == 0) {
					swal.close();
					$scope.AportanteMarcado = [];
					$scope.check_user = [];
					$scope.infodata = [];
					swal('Notificación',$scope.respuesta.mensaje,'success').then((result) => {
						if (result) {
							//$scope.Limpiar();
							$scope.TipoReporte('CE');
							$scope.ListarConsolidadoIncumplimiento('comenzar');
							//$scope.EnviarSmsAportante();
						}
					})
					
					
					
				} else {
					swal.close();
					swal('Notificación',$scope.respuesta.mensaje,'info');
				}
			});
		}
	}


	$scope.Limpiar = function () {
		for (var i = 0; i < $scope.infodatatemp.length; i++) {
			$scope.infodatatemp[i].checked = false; 
		}
		$scope.AportanteMarcado = [];
		$(".aportante").prop('checked',false);
	}

	$scope.EnviarSmsAportante = function(){
		const result = [];
		const map = new Map();
		for (const item of $scope.AportanteMarcado) {
			if(!map.has(item.doc_aportante)){
		        map.set(item.doc_aportante, true); // set any value to Map
		        result.push({
		        	id: item.doc_aportante,
		        	tipo: item.tipo_doc_aportante,
		        	celular: item.celular_afiliado,
		        	fecha_limite: item.fecha_limite
		        });
		    }
		}
		for (var i = 0; i < result.length; i++) {
			if (result[i].celular === undefined || result[i].celular === null ){
				
			} else {
				if (result[i].tipo === 'N' || result[i].tipo === 'C') {
					$scope.texto = "Sr(a) Aportante su fecha limite de pago en aportes a su salud CAJACOPI EPS es "+result[i].fecha_limite+". Efectuar pago oportuno evita Mora, si hizo su aporte hacer caso Omiso.";
				}else {
					$scope.texto = "Sr(a) Usuario a la fecha no se ha recibido el pago de su aporte en salud por parte de su empleador a CAJACOPIE EPS.";			
				}
				$http({
					method:'POST',
					url:"https://api.infobip.com/sms/1/text/single",
					headers: {
						'Content-Type': 'application/json',
						'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
						'accept' : 'application/json'
					},
					data: {
						"from": "Notificación Incumplimiento Pago",
						"to": "57"+'3007502735',
						"text": $scope.texto
					}
				}).then(function(response){
					
				})	
			}
		}
	}

	$scope.PrintCarta = function (d,estado) {
		if (d.tipo_doc_aportante === 'N') {
			
			$window.open('views/cartera/print/avisoempresa.html?estado='+estado+'&tipo='+d.tipo_doc_aportante+'&id='+d.doc_aportante,'_blank', "width=1080,height=1100");
		} else {
			$window.open('views/cartera/print/avisoempresaindepe.html?estado='+estado+'&tipo='+d.tipo_doc_aportante+'&id='+d.doc_aportante,'_blank', "width=1080,height=1100");
		}
		
	}

	$scope.TipoReporte('CE');
	$scope.ListarConsolidadoIncumplimiento('comenzar');



}]).filter('inicio', function () {
	return function (input, start) {
		if (input != undefined && start != NaN) {
			start = +start;
			return input.slice(start);
		} else {
			return null;
		}
	}
});
