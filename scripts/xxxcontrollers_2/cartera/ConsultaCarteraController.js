'use strict';
angular.module('GenesisApp')
.controller('ConsultaCarteraController', ['$scope', '$rootScope', '$http', '$filter','$window','afiliacionHttp', 'ngDialog',function ($scope, $rootScope,$http,$filter,$window,afiliacionHttp,ngDialog) {

	$(document).ready(function(){$('#modalactualizar').modal();});
	$scope.typedoc = 'N';
	$scope.doc= null;
	$scope.OcultarImagen=true;
	$scope.OcultarOpciones=false;
	$scope.OcultarInfoBasica = false;
	$scope.OcultarActualizar = false;

	$scope.VisualizarInformacion  = function (id) {
		switch (id) {
			case 'I':
			if ($scope.InfoCotizante) {
				$scope.InfoCotizante = false;
			} else {
				$scope.InfoCotizante = true;
			}
			break;
			case 'IP':
			if ($scope.InforIncumplimientoPago) {
				$scope.InforIncumplimientoPago = false;
			} else {
				$scope.InforIncumplimientoPago = true;
			}
			break;
			case 'AP':
			if ($scope.InfoAvisoIncumplimientoPago) {
				$scope.InfoAvisoIncumplimientoPago = false;
			} else {
				$scope.InfoAvisoIncumplimientoPago = true;
			}
			break;	
			case 'HA':
			if ($scope.HistoricoInformacion) {
				$scope.HistoricoInformacion = false;
			} else {
				$scope.HistoricoInformacion = true;
			}
			break;
			case 'RL':
			if ($scope.InfoRegistroLlamadas) {
				$scope.InfoRegistroLlamadas = false;
			} else {
				$scope.InfoRegistroLlamadas = true;
			}
			break;
			default:
			break;
		}
	}


	$scope.CambioBusqueda = function () {
		$scope.OcultarImagen=true;
		$scope.OcultarOpciones=false;
		$scope.OcultarInfoBasica = false;
		$scope.OcultarInfoAviso= false;
		$scope.OcultarNotiFechaLimite = false;
	}

	$scope.Consultar = function () {
		if($scope.typedoc === 'S'  || $scope.doc === null || $scope.doc === undefined ) {
			swal('Información','Debe Seleccionar  Un Tipo y Documento','info');
		} else {
			swal({
				html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Consultando Información...</p>',
				width: 200,
				allowOutsideClick: false,
				allowEscapeKey: false,
				showConfirmButton: false,
				animation: false
			});
			$http({
				method: 'POST',
				url: "php/cartera/funcartera.php",
				data: { function: 'ConsultarInfoAportante',tipo:$scope.typedoc ,documento: $scope.doc }
			}).then(function (response) {
				if (response.data.codigo == 0) {
					$scope.aportante = response.data;
					console.log($scope.aportante);
					$scope.aportantetemp = response.data;
					$scope.OcultarImagen=false;
					$scope.OcultarOpciones=true;
					$scope.OcultarInfoBasica = true;	
					$scope.ObtenerCantidadesCarta();
					$scope.ObtengoCotizante();
					$scope.InformacionIncumplimiento();
					$scope.InformacionAvisoIncumplimiento();
					$scope.InformacionHistorico();
					$scope.ObtenerRegistroLlamadas();
					swal.close();
				} else {
					swal('Genesis informa',response.data.mensaje,'info');
				}

			});
		}
	}


	$scope.ObtengoCotizante = function () {
		$http({
			method: 'POST',
			url: "php/cartera/funcartera.php",
			data: { function: 'ObtengoCotizante',documento: $scope.doc }
		}).then(function (response) {
			if ($scope.estadocotizante == 'C') {
				$scope.tablacotizante.destroy();
			}
			$scope.afiliados = response.data;
			$scope.estadocotizante = 'C';
			setTimeout(function () {
				$scope.tablacotizante = $('#tablacotizante').DataTable({
					language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
					lengthMenu: [[5, 50, -1], [5, 50, 'Todas']]
				});

			}, 500);

		});		
	}

	//$scope.Consultar();

	$scope.InformacionIncumplimiento = function () {
		$http({
			method: 'POST',
			url: "php/cartera/funcartera.php",
			data: { function: 'ObtenerInformacionIncumplimiento',documento: $scope.doc }
		}).then(function (response) {
			if ($scope.estadoincumplimiento == 'I') {
				$scope.tablaincumplimiento.destroy();
			}
			$scope.estadoincumplimiento =='I';
			$scope.infoincumplimiento = response.data;
			setTimeout(function () {
				$scope.tablaincumplimiento = $('#tablaincumplimiento').DataTable({
					language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
					lengthMenu: [[5, 50, -1], [5, 50, 'Todas']]
				});
			}, 500);
		});	
	}

	$scope.InformacionAvisoIncumplimiento = function () {
		$http({
			method: 'POST',
			url: "php/cartera/funcartera.php",
			data: { function: 'ObtenerInformacionAvisoIncumplimiento',documento: $scope.doc }
		}).then(function (response) {
			if ($scope.estadoavisoincumplimiento == 'AC') {
				$scope.tablaaviso.destroy();
			}
			$scope.estadoavisoincumplimiento =='AC';
			$scope.infoaviso = response.data;
			setTimeout(function () {
				$scope.tablaaviso = $('#tablaaviso').DataTable({
					language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
					lengthMenu: [[5, 50, -1], [5, 50, 'Todas']]
				});
			}, 500);
		});	
	}

	$scope.InformacionHistorico = function () {
		$http({
			method: 'POST',
			url: "php/cartera/funcartera.php",
			data: { function: 'ObtenerHistorico',documento: $scope.doc }
		}).then(function (response) {
			if ($scope.estadohistorico == 'H') {
				$scope.tablahistorico.destroy();
			}
			$scope.estadohistorico = 'H';
			$scope.infoavisoH = response.data;
			setTimeout(function () {
				$scope.tablahistorico = $('#tablahistorico').DataTable({
					language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
					lengthMenu: [[5, 50, -1], [5, 50, 'Todas']]
				});
			}, 500);		
		});	
	}	

	$scope.ObtenerRegistroLlamadas = function () {
		$http({
			method: 'POST',
			url: "php/cartera/funcartera.php",
			data: { function: 'ObtenerRegistroLlamadas',documento: $scope.doc }
		}).then(function (response) {
			if ($scope.estadocall == 'H') {
				$scope.tablallamadas.destroy();
			}
			$scope.estadocall = 'L';
			$scope.infollamadas = response.data;
			setTimeout(function () {
				$scope.tablallamadas = $('#tablallamadas').DataTable({
					language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
					lengthMenu: [[5, 10, -1], [5, 50, 'Todas']]
				});
			}, 500);		
		});	
	}	



	$scope.ObtenerCantidadesCarta = function () {
		$http({
			method: 'POST',
			url: "php/cartera/funcartera.php",
			data: { function: 'ObtenerCantidadesCarta',documento: $scope.doc }
		}).then(function (response) {
			$scope.afiliados = response.data;		
			$scope.sms_correcto_aviso= response.data.sms_correcto_aviso;
			$scope.fallo_de_envio_aviso= response.data.fallo_de_envio_aviso;
			$scope.sms_correcto_incumplimiento= response.data.sms_correcto_incumplimiento;
			$scope.fallo_de_envio_incumplimiento= response.data.fallo_de_envio_incumplimiento;
			$scope.sms_correcto_historico= response.data.sms_correcto_historico;
			$scope.fallo_de_envio_historico= response.data.fallo_de_envio_historico;
			$scope.llamada_recibida = response.data.llamada_recibida;
			$scope.llamada_realizada = response.data.llamada_realizada;
		});		
	}

	$scope.EnviarCartaConsolidado = function () {
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
				data: { function: 'SendMailAportante', 
				json_aportante: JSON.stringify($scope.aportantetemp), 
				responsable: sessionStorage.getItem('cedula'),
				tipo_proceso:'1',
				cantidad: 1}
			}).then(function (response) {
				$scope.respuesta = response.data;
				if ($scope.respuesta.codigo == 0) {
					swal.close();
					swal('Notificación',$scope.respuesta.mensaje,'success');
				} else {
					swal.close();
					swal('Notificación',$scope.respuesta.mensaje,'info');
				}
			});
		}
	}

	$scope.EnviarCartaNoti = function (informacion) {
		console.log(JSON.stringify(informacion));
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
				data: { function: 'SendMailIncumplimiento', 
				json_aportante: JSON.stringify(informacion), 
				responsable: sessionStorage.getItem('cedula'),
				tipo_proceso:'2',
				cantidad: '1'}
			}).then(function (response) {
				$scope.respuesta = response.data;
				if ($scope.respuesta.codigo == 0) {
					swal.close();
					swal('Notificación',$scope.respuesta.mensaje,'success');
				} else {
					swal.close();
					swal('Notificación',$scope.respuesta.mensaje,'info');
				}
			});
		}
	}

	$scope.EnviarCartaAviso = function () {
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
				json_aportante: JSON.stringify($scope.aportantetemp), 
				responsable: sessionStorage.getItem('cedula'),
				tipo_proceso:'8',
				cantidad: '1'}
			}).then(function (response) {
				$scope.respuesta = response.data;
				if ($scope.respuesta.codigo == 0) {
					swal.close();
					swal('Notificación',$scope.respuesta.mensaje,'success');
				} else {
					swal.close();
					swal('Notificación',$scope.respuesta.mensaje,'info');
				}
			});
		}
	}

	$scope.PrintCarta = function (info,estado) {
		if (estado == 'IP') {
			switch (estado) {	
				case 'IP':
				if (info.tipo_cotizante == '3' || '4'||'16'||'34'||'35'||'36'||'42'||'43'||'52'||'53'||'56'||'57'||'58'||'59') {
					$window.open('views/cartera/print/avisomoraindepe.html?estado='+estado+'&tipo='+info.tipo_doc_aportante+'&id='+info.doc_aportante+'&data='+info.fecha_limite,'_blank', "width=1080,height=1100");					
				} else {
					$window.open('views/cartera/print/avisomora.html?estado='+estado+'&tipo='+info.tipo_doc_aportante+'&id='+info.doc_aportante+'&data='+info.fecha_limite,'_blank', "width=1080,height=1100");
					
				}			
				break;
				default:
				break;
			}
		} else {
			swal({
				title: 'Imprimir Carta',
				input: 'select',
				inputOptions: {
					'CG': 'Consolidado General',
					'AC': 'Aviso Incumplimiento'
				},
				inputPlaceholder: 'Seleccionar',
				showCancelButton: true,
				inputValidator: function (value) {
					return new Promise(function (resolve, reject) {
						if (value !== '') {
							resolve();
						} else {
							reject('You need to select a Tier');
						}
					});
				}
			}).then(function (result) {
				switch (result) {
					case 'CG':
					if (info.tipo_cotizante == '3' || '4'||'16'||'34'||'35'||'36'||'42'||'43'||'52'||'53'||'56'||'57'||'58'||'59') {     
						$window.open('views/cartera/print/printhistoricoind.html?estado='+result+'&tipo='+$scope.typedoc+'&id='+$scope.doc,'_blank', "width=1080,height=1100");
					} else {
						$window.open('views/cartera/print/printhistorico.html?estado='+result+'&tipo='+$scope.typedoc+'&id='+$scope.doc,'_blank', "width=1080,height=1100");
					}
					
					break;	
					case 'IP':
					if (info.tipo_cotizante == '3' || '4'||'16'||'34'||'35'||'36'||'42'||'43'||'52'||'53'||'56'||'57'||'58'||'59') {
						$window.open('views/cartera/print/avisomoraindepe.html?estado='+result+'&tipo='+info.tipo_doc_aportante+'&id='+info.doc_aportante+'&data='+info.fecha_limite,'_blank', "width=1080,height=1100");
						
					} else {
						$window.open('views/cartera/print/avisomora.html?estado='+result+'&tipo='+info.tipo_doc_aportante+'&id='+info.doc_aportante+'&data='+info.fecha_limite,'_blank', "width=1080,height=1100");
					}			
					break;
					case 'AC':
					if (info.tipo_cotizante == '3' || '4'||'16'||'34'||'35'||'36'||'42'||'43'||'52'||'53'||'56'||'57'||'58'||'59') {
						$window.open('views/cartera/print/avisoempresaindepe.html?estado='+result+'&tipo='+$scope.typedoc+'&id='+$scope.doc,'_blank', "width=1080,height=1100");
					} else {
						$window.open('views/cartera/print/avisoempresa.html?estado='+result+'&tipo='+$scope.typedoc+'&id='+$scope.doc,'_blank', "width=1080,height=1100");
					}
					break;
					default:
					break;
				}

			});
		}
	}

	$scope.GeneracionCarta = function () {
		swal({
			title: 'Generacion Carta',
			input: 'select',
			inputOptions: {
				'CG': 'Consolidado General',
				'AC': 'Aviso Incumplimiento'
			},
			inputPlaceholder: 'SELECCIONAR',
			showCancelButton: true,
			inputValidator: function (value) {
				return new Promise(function (resolve, reject) {
					if (value !== '') {
						resolve();
					} else {
						reject('You need to select a Tier');
					}
				});
			}
		}).then(function (result) {
			switch (result) {
				case 'CG':
				$scope.EnviarCartaConsolidado();
				break;	
				case 'IP':
				console.log('Error');
				break;
				case 'AC':
				$scope.EnviarCartaAviso();
				break;
				default:
				break;
			}

		});
	}

	$scope.EditarInformacion = function (p) {
		$('#modalactualizar').modal('open');
		$scope.p_tipo_doc =p.tipo_doc;
		$scope.p_doc_aportante =p.doc_aportante;
		$scope.p_tipo_doc_aportante =p.tipo_doc_aportante;
		$scope.p_nombre_aportante =p.nombre_aportante;
		$scope.p_nombre_dpto_aportante =p.nombre_dpto_aportante;
		$scope.p_departamento_aportante =p.departamento_aportante;
		$scope.p_municipio_aportante =p.municipio_aportante;
		$scope.p_correo_aportante =p.correo_aportante;
		$scope.p_celular_aportante =p.celular_aportante;
		$scope.p_fijo_aportante = p.telefono_aportante;
		$scope.p_direccion =p.direccion;
		$scope.p_nombre_mun_aportante =p.nombre_mun_aportante;
		$scope.Act_Zona= {Codigo:''};
		$scope.ViaPrincipal={Codigo:''};
		$scope.Letra={Codigo:''};
		$scope.Cuadrante={Codigo:''};
		$scope.CuadranteVG={Codigo:''};
		$scope.SelectLetraVG={Codigo:''};
		$scope.Bis= false;
		$("#deptos option[value='?']").remove();		
		$scope.BuscoMunicipio();
		afiliacionHttp.obtenerViaPrincipal().then(function (response) {
			$scope.viaprincipal = response;
		})
		afiliacionHttp.obtenerLetra().then(function (response) {
			$scope.letras = response;
		})
		afiliacionHttp.obtenerNumero().then(function (response) {
			$scope.Numeros = response;
		})
		afiliacionHttp.obtenerCuadrante().then(function (response) {
			$scope.Cuadrantes = response;
		})
	}


	$scope.AbrirModalDireccion=function(){
		$scope.dialogDiagreg=ngDialog.open({
			template: 'views/consultaAfiliados/nucleofamiliar/modal/modalDireccion.html',
			className: 'ngdialog-theme-plain',
			controller: 'ConsultaCarteraController',
			closeByDocument:false,
			closeByEscape:false,
			scope: $scope
		});
		$scope.dialogDiagreg.closePromise.then(function (data) {
			if (data.value != "$closeButton") {
				$scope.p_direccion=data.value;
			}
		});
	}

	$scope.GuardarDireccion=function(ViaPrincipal,NumViaPrincipal,Letra,Numero,Bis,Cuadrante,NumeroVG,SelectLetraVG,NumeroPlaca,CuadranteVG,Complemento){
		console.log($('#direcciond').val());
		$scope.closeThisDialog($('#direcciond').val());
		$scope.closeThisDialog($('#barrio').val());
	}

	$scope.ListarDepartamento = function () {
		$http({
			method: 'POST',
			url: "php/cartera/funcartera.php",
			data: { function: 'ListarDepartamento' }
		}).then(function (response) {
			$scope.depto = response.data;
			console.log($scope.depto);
		});
	}

	$scope.BuscoMunicipio = function (cod) {
		$http({
			method: 'POST',
			url: "php/cartera/funcartera.php",
			data: { function: 'ListarMunicipio', departamento: $scope.p_departamento_aportante }
		}).then(function (response) {
			$scope.muni = response.data;
			setTimeout(function() {
				$("#municipio option[value='?']").remove();
			}, 200);
		});
	}

	$scope.ActualizarInfor = function () {
		$http({
			method: 'POST',
			url: "php/cartera/funcartera.php",
			data: { function: 'ActualizarInformacion',tipo:$scope.typedoc,
			nit:$scope.p_doc_aportante,
			direccion:$scope.p_direccion,
			telefono:$scope.p_celular_aportante,
			fijo: $scope.p_fijo_aportante,
			correo:$scope.p_correo_aportante,
			ubicacion:$scope.p_municipio_aportante}
		}).then(function (response) {
			if (response.data.codigo == '0' ){
				swal('Notificación',response.data.mensaje,'success');
			} else {
				swal('Notificación',response.data.mensaje,'success');
			}
		});
	}


	$scope.ActualizarCartera = function () {
		swal({
			title: 'Confirmar',
			text: '¿Desea Confimar El Cargue?',
			type: 'info',
			showCancelButton: true,
			allowEscapeKey: false,
			allowOutsideClick: false,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Cargar',
			cancelButtonText: 'Regresar'
		}).then(function () {
			swal({
				html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando informacion....</p>',
				width: 200,
				allowOutsideClick: false,
				allowEscapeKey: false,
				showConfirmButton: false,
				animation: false
			});
			$http({
				method: 'POST',
				url: "php/cartera/funcartera.php",
				data: { function: 'ActualizarCartera'}
			}).then(function (response) {
				if (response.data.codigo=='0') {
					swal.close();
					setTimeout(function() {
						swal('Genesis Informa',response.data.mensaje,'success');
					}, 500);
				} else {
					swal.close();
					setTimeout(function() {
						swal('Genesis Informa',response.data.mensaje,'info');
					}, 500);

				}
			});
		}, function (dismiss) {
			if (dismiss === 'cancel') {
			}
		})
	}


	$scope.ValidaUsuarioCargue = function () {
		if (sessionStorage.getItem('cedula') == '1143450658' || '72358057' || '37899633' || '77186751' || '79218502' || '1140889298') {
			$scope.OcultarActualizar = true;
		} else {
			$scope.OcultarActualizar = false;
		}
	}



	$scope.RegistrarLlamadas=function(data){
		$scope.dialogDiagreg = ngDialog.open({
			template: 'views/cartera/SoporteCartera/GestionLlamada.html',
			className: 'ngdialog-theme-plain',
			controller: 'GestionLLamadasCartera',
			closeByDocument:false,
			closeByEscape:false,
			scope: $scope
		});

		// $scope.dialogDiagreg.closePromise.then(function (data) {
		// 	if (data.value != "$closeButton") {
		// 		$scope.Act_Direccion2=data.value;
		// 		$scope.Act_Direccion=$scope.Act_Direccion2;
		// 		$scope.Localaidad2=$('#barrio').val();
		// 		$scope.Act_Barrio=$scope.Localaidad2

		// 	}else{
		// 		$scope.Act_Direccion;
		// 		$scope.Act_Barrio= $scope.barrio;
		// 	}
		// });
	}

	

	$scope.ListarGestionCartera = function () {
		$http({
			method: 'POST',
			url: "php/cartera/funcartera.php",
			data: { function: 'ListarGestionCartera',documento:sessionStorage.getItem('cedula') }
		}).then(function (response) {
			$scope.duplicar = response.data;
		}); 
	}


	$scope.ValidaUsuarioCargue();
	$scope.ListarGestionCartera();






}]);










