'use strict';
angular.module('GenesisApp')
.controller('ConsultaAfiliadoCovidController', ['$http', '$timeout', '$scope', 'ngDialog', 'consultaHTTP', 'afiliacionHttp', 'notification', 'cfpLoadingBar', '$rootScope', '$controller', 'communication', 'digitalizacionHTTP',
	function ($http, $timeout, $scope, ngDialog, consultaHTTP, afiliacionHttp, notification, cfpLoadingBar, $rootScope, $controller, communication, digitalizacionHTTP) {
		$(document).ready(function(){$('#modalactualizar').modal();});

		$scope.type = "SELECCIONAR";

		$scope.obtenerDocumento = function () {

			consultaHTTP.obtenerDocumento().then(function (response) {
				$scope.Documentos = response;
			})
		}



		$scope.ConsultarAfiliado = function () {
			swal({
				html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Consultando Información...</p>',
				width: 200,
				allowOutsideClick: false,
				allowEscapeKey: false,
				showConfirmButton: false,
				animation: false
			});
			
			$scope.afildata = "";
			if ($scope.type == "SELECCIONAR") {
				swal('Notificación','Seleccione tipo de documento','info');
			} else if ($scope.id === undefined || $scope.id == "") {
				swal('Notificación','Ingrese número de identificación','info');
			} else {
				$http({
					method: 'POST',
					url: "php/cartera/funcartera.php",
					data: { function: 'BuscaAfiliado',tipo:$scope.type ,documento: $scope.id }
				}).then(function (response) {
					swal.close();
					if (response.data.codigo == 0) {
						$scope.afildato = response.data;
						$scope.ValidaInformacion = true;
						$scope.estado = $scope.afildato.estado;
						$scope.fuente = $scope.afildato.fuente;
						$scope.fecha_sospecha = $scope.afildato.fecha_sospecha;
					} else {
						swal('Genesis informa',response.data.mensaje,'info');
					}
				});
			}
		}

		$scope.ConfirmarAfiliado = function () {
			$scope.EstadoInformacion = true;
			$scope.OcultarEvolucion=false
			$scope.ListadoEvoluciones = false;
			$(function () {
				$(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({
					"border-style": "none",
					"border-bottom-style": "dotted"
				});
				var date = new Date();
				var formattedDate = moment(date).format('YYYY-MM');
				$(".datepicker_inicio").kendoDatePicker({
					animation: {
						close: {
							effects: "zoom:out",
							duration: 300
						},
						open: {
							effects: "zoom:in",
							duration: 300
						}
					}
				});
				$(document).ready(function () {
					var inicial = $("#fecha_sospecha").kendoDatePicker({
						format: "dd/MM/yyyy",
						culture: "es-MX",
						max: new Date()
					}).data("kendoDatePicker");


				});
			});
		}

		$scope.Registrar = function (estado,fuente,fecha_sospecha) {
			if (estado == "SELECCIONAR") {
				swal('Notificación','Seleccione el estado a registrar','info');
			} else if  (fuente == "SELECCIONAR") {
				swal('Notificación','Seleccione la fuente a registrar','info');
			} else if (fecha_sospecha == null || fecha_sospecha == undefined || fecha_sospecha == '') {
				swal('Notificación','Seleccione la fecha de sospecha para su registro','info');
			} else {
				$http({
					method: 'POST',
					url: "php/cartera/funcartera.php",
					data: { function: 'MarcarUsuario',tipo:$scope.type,documento: $scope.id,estado:estado ,fuente:fuente, fecha_sospecha:fecha_sospecha }
				}).then(function (response) {
					if (response.data.codigo == 0) {
						swal('Genesis informa',response.data.mensaje,'success');
						$scope.limpiar();
					} else {
						swal('Genesis informa',response.data.mensaje,'info');
					}
				});
			}
		}

		$scope.limpiar = function () {
			$scope.type = "SELECCIONAR";
			$scope.id = null;
			$scope.estado  = "SELECCIONAR";
			$scope.fuente  = "SELECCIONAR";
			$scope.fecha_sospecha = null;
			$scope.ValidaInformacion = false;
			$scope.EstadoInformacion = false;
			$scope.OcultarEvolucion=false
			$scope.ListadoEvoluciones = false;
		}

		$scope.EditarInformacion = function (p) {
			$('#modalactualizar').modal('open');
			$scope.p_tipo =p.tipo_documento;
			$scope.p_documento =p.documento;
			$scope.p_nombre =p.nombre_afiliado;
			$scope.p_celular =p.celular;
			$scope.p_celular2 =p.celular2;
			$scope.p_direccion =p.direccion;
			$scope.p_barrio = p.barrio;
			$scope.Act_Zona= {Codigo:''};
			$scope.ViaPrincipal={Codigo:''};
			$scope.Letra={Codigo:''};
			$scope.Cuadrante={Codigo:''};
			$scope.CuadranteVG={Codigo:''};
			$scope.SelectLetraVG={Codigo:''};
			$scope.Bis= false;
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
				controller: 'ConsultaAfiliadoCovidController',
				closeByDocument:false,
				closeByEscape:false,
				scope: $scope
			});
			$scope.dialogDiagreg.closePromise.then(function (data) {
				if (data.value != "$closeButton") {
					$scope.p_direccion=data.value;
					$scope.p_barrio = $('#barrio').val();
				}
			});
		}

		$scope.GuardarDireccion=function(ViaPrincipal,NumViaPrincipal,Letra,Numero,Bis,Cuadrante,NumeroVG,SelectLetraVG,NumeroPlaca,CuadranteVG,Complemento){
			console.log($('#direcciond').val());
			$scope.closeThisDialog($('#direcciond').val());
			$scope.closeThisDialog($('#barrio').val());
		}

		$scope.ActualizarInfor = function () {
			$http({
				method: 'POST',
				url: "php/cartera/funcartera.php",
				data: { function: 'GeneraNovedad',	documento:$scope.id,
				tipo: $scope.type,
				direccion:$scope.p_direccion,
				barrio:$scope.p_barrio, 
				celular:$scope.p_celular,
				celular2: $scope.p_celular2 }
			}).then(function (response) {
				if (response.data.codigo == 0) {
					swal('Genesis informa',response.data.mensaje,'success');
					$('#modalactualizar').modal('close');
					$scope.ConsultarAfiliado();
				} else {
					swal('Genesis informa',response.data.mensaje,'info');
				}
			});
		}

		$scope.CrearEvolucion = function () {
			$scope.OcultarEvolucion = true;
			$scope.EstadoInformacion = false;
			$scope.ListadoEvoluciones = false;
			$(function () {
				$(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({
					"border-style": "none",
					"border-bottom-style": "dotted"
				});
				var date = new Date();
				var formattedDate = moment(date).format('YYYY-MM');
				$(".datepicker_inicio").kendoDatePicker({
					animation: {
						close: {
							effects: "zoom:out",
							duration: 300
						},
						open: {
							effects: "zoom:in",
							duration: 300
						}
					}
				});
				$(document).ready(function () {
					var inicial = $("#fecha_evolucion").kendoDatePicker({
						format: "dd/MM/yyyy",
						culture: "es-MX",
						max: new Date()
					}).data("kendoDatePicker");


				});
			});
		}

		$scope.Crear = function (fecha, observacion) {
			if (fecha == null || fecha == undefined || fecha == '') {
				swal('Notificación','Seleccione la fecha de sospecha para su registro','info');
			} else if (observacion == null || observacion == undefined || observacion == '') {
				swal('Notificación','Digitar Una Observación','info');
			} else {
				$http({
					method: 'POST',
					url: "php/cartera/funcartera.php",
					data: { function: 'CrearEvolucion',tipo:$scope.type,documento: $scope.id,fecha:fecha ,observacion:observacion, usuario:sessionStorage.getItem('cedula') }
				}).then(function (response) {
					if (response.data.codigo == 0) {
						swal('Genesis informa',response.data.mensaje,'success');
						$scope.OcultarEvolucion=false
						$scope.ValidaInformacion = true;
						$scope.ListadoEvoluciones = false;
					} else {
						swal('Genesis informa',response.data.mensaje,'info');
					}
				});
			}
		}

		$scope.VerEvolucion = function (estado) {
			if (estado == 'comenzar') { swal({ title: 'Cargando Informacion' }); swal.showLoading(); }
			$http({
				method: 'POST',
				url: "php/cartera/funcartera.php",
				data: { function: 'VerEvolucion',tipo:$scope.type,documento: $scope.id}
			}).then(function (res) {
				if (res.data.codigo == 1) {
					swal.close();
					swal('Genesis informa',res.data.mensaje,'info');
				} else {
					if (res.data.length > 0) {
						if ($scope.estado == 'destruir') {
							$scope.tableinformacion.destroy();
						}
						$scope.ListadoEvoluciones = true;
						$scope.OcultarEvolucion = false;
						$scope.informacion = res.data;
						$scope.estado = 'destruir';
						setTimeout(function () {
							$scope.tableinformacion = $('#informacion').DataTable({
								language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
								lengthMenu: [[10, 50, -1], [10, 50, 'Todas']],
								order: [[0, "asc"]]
							});
							
						}, 500);
						swal.close();
					} else {
						swal('Genesis informa', 'No hay Informacion para Mostrar', 'warning');
					}
				}
				
			});
		}

	}]);
