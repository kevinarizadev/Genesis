'use strict';
angular.module('GenesisApp')
.controller('gestionctrl', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar',
	function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar) {
		$(document).ready(function () {
			$(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({ "margin-top": "0px", "margin-top": "7px" });
			$(window).on('resize', function () {

			})
			$('#height').on('input change', function () {
				var height = $(this).val();
				if (height >= 30) {
					var leftOffset = (Math.tan(45 * (Math.PI / 180)) * (height / 2) + 3) * -1;
					$('.steps').css('height', height).css('line-height', height + "px").css('left', leftOffset + "px");

				}
			});
				//$.fn.dataTable.moment();
				$scope.btnActualizarTutela = true;
				$.getJSON("php/obtenersession.php").done(function (respuesta) {
					$scope.sesdata = respuesta;
					$scope.cedulalog = $scope.sesdata.cedula;
					if ($scope.sesdata.cedula == 22515239 || $scope.sesdata.cedula == 1096211358 || $scope.sesdata.cedula == 1045250310 || $scope.sesdata.cedula == 72286345 || $scope.sesdata.cedula == 1045739217) {
						$scope.btnDwnInformes = false;
					} else {
						$scope.btnDwnInformes = true;
					}
				})
			});
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		dd < 10 ? dd = '0' + dd : dd = dd
		mm < 10 ? mm = '0' + mm : mm = mm
		today = dd + '/' + mm + '/' + yyyy;
		$scope.restart = function () {
			$scope.hdeAdjuntarFallo = false;
			$scope.hdeMotivo = true;
			$scope.hdeAdjuntarfile = true;
			$scope.hdeGuardaTut = true;
			$scope.hdeDetallesAccion = true;
			$scope.hdeDetallesAccionSeg = true;
			$scope.hdeImpugnacion = true;
			$scope.hdeRegistro = true;
			$scope.hdeCumplimiento = true;
			$scope.hdeIncidentes = true;
			$scope.hdeMotivoLbl = true;
			$scope.hdeTablaResultados = false;
			$scope.hdeDiagnostico = true;
			$scope.hdeVBrespuestatutela = true;
			$scope.hdeBtnPanelAdjuntos = true;
			$scope.hdeAdjuntarImpugnacion = false;
			$scope.dsbImpugnado2 = false;
			$scope.hdefallo = false;
			$scope.hdecumpli = false;
			$scope.dsbDetalles = false;
			$scope.dsbImpugnacion = false;
			$scope.dsbRegistro = false;
			$scope.dsbNombreIps = false;
				//DECLARO VARIABLE HIDE FECHA MEDIDA PROVISIONAL CNVU 10/12/2019
				$scope.hdeFechaMedida = true;
				//DECLARO VARIABLES PARA MOSTRAR O NO LOS CAMPOS DE MEDIO RECEPCION DE TODAS LAS ETAPAS CNVU 12/12/2019
				$scope.hdeMedioRecepcionRespuesta = true;
				$scope.hdeMedioRecepcionFallo = true;
				$scope.hdeMedioRecepcionSegunda = true;
				$scope.hdeMedioRecepcionImpugnacion = true;
				$scope.hdeMedioRecepcionCumplimiento = true;
				$scope.hdeMedioRecepcionFImpugnacion = true;
				$scope.hdeMedioRecepcionRqPrevio = true;
				$scope.hdeMedioRecepcionRespuestaRq = true;
				$scope.hdeMedioRecepcionAdmision = true;
				$scope.hdeMedioRecepcionRespuestaInc = true;
				$scope.hdeMedioRecepcionDecisionInc = true;
				$scope.hdeMedioRecepcionConsultaInc = true;
				$scope.hdeMedioRecepcionCierreInc = true;
				$scope.hdeMedioRecepcionAdmisionTut = true;
				$scope.hdeMedioRecepcionEstadoTutela = true;
				$scope.hdeFechaFallo = false;
				$scope.ModalEstadoTutela = false;
				$scope.btn = {
					GuardaRegistro: false
				}
				$scope.detalles = {
					fallotutela: false,
					tratamientointegral: false,
					impugnado: false,
					seguimiento: false,
					falloimpugnacionfc: false
				}
				$scope.detallesetpdos = {
					fallotutelainstdos: false
				}

			}
			$scope.restart();
			$("#admisiontutela").change(function () {
				if (this.files[0].size > 15000320) {
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#recibidorespuestatutela").change(function () {
				if (this.files[0].size > 15000320) {
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#fallotutela").change(function () {
				if (this.files[0].size > 15000320) {
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#archivoimpugnacion").change(function () {
				if (this.files[0].size > 15000320) {
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#archivocumplimensual").change(function () {
				if (this.files[0].size > 15000320) {
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#fallotutela").change(function () {
				if (this.files[0].size > 15000320) {
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#falloimpugnacion").change(function () {
				if (this.files[0].size > 15000320) {
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#archivofechareqpre").change(function () {
				if (this.files[0].size > 15000320) {
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#archivofechareqpreres").change(function () {
				if (this.files[0].size > 15000320) {
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#archivofechreqpro").change(function () {
				if (this.files[0].size > 15000320) {
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#archivofechreqprores").change(function () {
				if (this.files[0].size > 15000320) {
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#archivofalinc").change(function () {
				if (this.files[0].size > 15000320) {
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#archivofechaconinc").change(function () {
				if (this.files[0].size > 15000320) {
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#archivofechaautinc").change(function () {
				if (this.files[0].size > 15000320) {
					//7340032
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			//VALIDA EL PESO MAXIMO DEL ADJUNTO CNVU
			$("#medioRecepcionAdmisionTutAdjunto").change(function () {
				if (this.files[0].size > 15000320) {
					//7340032
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#medioRecepcionRespuestaAdjunto").change(function () {
				if (this.files[0].size > 15000320) {
					//7340032
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#medioRecepcionFalloAdjunto").change(function () {
				if (this.files[0].size > 15000320) {
					//7340032
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#medioRecepcionSegundaAdjunto").change(function () {
				if (this.files[0].size > 15000320) {
					//7340032
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#medioRecepcionImpugnacionAdjunto").change(function () {
				if (this.files[0].size > 15000320) {
					//7340032
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#medioRecepcionCumplimientoAdjunto").change(function () {
				if (this.files[0].size > 15000320) {
					//7340032
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#medioRecepcionFImpugnacionAdjunto").change(function () {
				if (this.files[0].size > 15000320) {
					//7340032
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#medioRecepcionRqPrevioAdjunto").change(function () {
				if (this.files[0].size > 15000320) {
					//7340032
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#medioRecepcionRespuestaRqAdjunto").change(function () {
				if (this.files[0].size > 15000320) {
					//7340032
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#medioRecepcionAdmisionAdjunto").change(function () {
				if (this.files[0].size > 15000320) {
					//7340032
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#medioRecepcionRespuestaIncAdjunto").change(function () {
				if (this.files[0].size > 15000320) {
					//7340032
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#medioRecepcionDecisionIncAdjunto").change(function () {
				if (this.files[0].size > 15000320) {
					//7340032
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#medioRecepcionConsultaIncAdjunto").change(function () {
				if (this.files[0].size > 15000320) {
					//7340032
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#medioRecepcionCierreIncAdjunto").change(function () {
				if (this.files[0].size > 15000320) {
					//7340032
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#idarchivoEstadoTutela").change(function () {
				if (this.files[0].size > 15000320) {
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			$("#medioEstadoTutelaAdjunto").change(function () {
				if (this.files[0].size > 15000320) {
					swal('Advertencia', 'El archivo excede el peso limite (15 MB)', 'warning')
					this.value = "";
				}
			});
			var f_recepcion = $("#dteFechaRecepcion").data("kendoDatePicker");
			var f_vencimiento = $("#dteFechaVencimiento").data("kendoDatePicker");
			var f_recibidorespuestatutela = $("#dteFechaRecepcionRespuesta").data("kendoDatePicker");
			$scope.initVar = function () {
				// $("#dteFechaRecepcion").val(today);
				$scope.reqMotivo = "";
				$scope.juzgado = {};
				$scope.registro = { anioconsecutivo: '2019', consecutivo: 0, accionante: 1, motivo: '' };
				$scope.diagnostico = {};
			}
			$scope.initVar();

			var lisTutelas = $('#resultTutelas').DataTable({
				dom: 'lBsfrtip',
				select: true,
				buttons: [{ extend: 'copy', text: 'Copiar' }, 'csv', 'excel'],
				searching: true,
				ajax: {
					url: 'php/juridica/tutelas/listtutelas.php',
					dataSrc: ''
				},
				columns: [
				{ data: "numero" },
				{ data: "radicado" },
				{ data: "ubicacion" },
				{ data: "accionante" },
				{ data: "afil_nombre" },
				{ data: "juzgado" },
				{ data: "causa" },
				{ data: "motivo" },
				{ data: "fecha_vencimiento" },
				{ data: "estado" }
				],
				language: {
					"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
				},
				lengthMenu: [[10, 30, 50, -1], [10, 30, 50, 'Todas']],
				order: [[8, "desc"]]
			});

			$scope.dwinforme = function () {
				window.open('php/juridica/tutelas/informe_tutelas.php');
			}

			$scope.busqueda = function () {
				cfpLoadingBar.start();
				$scope.hdeRegistro = true;
				$scope.hdeDiagnostico = true;
				$scope.hdeTablaResultados = false;
				lisTutelas.ajax.reload();
				$scope.hdeVBrespuestatutela = true;
				$scope.hdeDetallesAccion = true;
				$scope.hdeImpugnacion = true;
				$scope.hdeCumplimiento = true;
				$scope.hdeIncidentes = true;
				$scope.labelotraepsAdmisionTut = false;
				$scope.registro.diferenteepsAdmisionTut = false;
				$scope.hdeModalEstadoTutela = false;
				cfpLoadingBar.complete();
			}
			$scope.crear = function () {
				document.getElementById('cons_juzgado').disabled = false;
				document.getElementById('aniocons_juzgado').disabled = false;
				document.getElementById('tipoidafiliado').disabled = false;
				document.getElementById('diferenteepsAdmisionTut').disabled = false;
				$scope.restart();
				$scope.btnActualizarTutela = true;
				$scope.hdeRegistro = false;
				$scope.despl1 = true;
				$scope.hdeTablaResultados = true;
				$scope.initVar();
				var f_recepcion = $("#dteFechaRecepcion").data("kendoDatePicker");
				f_recepcion.enable(true);
				$scope.hdeMotivoLbl = true;
				$scope.hdeAdjuntarfile = false;
				$scope.hdeGuardaTut = false;
				$scope.hdeMotivo = false;
				$scope.dsbRegistro = false;
				$scope.hdeDiagnostico = true;
				$scope.hdeVBrespuestatutela = true;
				$scope.hdeDetallesAccion = true;
				$scope.hdeImpugnacion = true;
				$scope.hdeCumplimiento = true;
				$scope.hdeIncidentes = true;
				$scope.hdeModalEstadoTutela = true;
				$scope.archivoadminision = '';
				// EJECUTA LA FUNCION DESHABILITAR CNVU 12/12/2019
				$scope.deshabilitarInfoTutela();
				// LIMPIA CAMPOS RECEPCION ADMISION TUTELA CNVU
				// $("#dteFechaMedioRecepcionAdmisionTut").val() = "";
				$scope.Medioarchivoadminision = '';
				$scope.Limpiar_Inputs_Files();//Limpia todos los inputs type file
				//

				// CNVU - 23/01/2020 
				setTimeout(function () {
					// console.log($scope.sesdata);
					if ($scope.sesdata.cedula == '1129521065' || $scope.sesdata.cedula == '1140902160') {
						setTimeout(function(){
							$scope.btn.GuardaRegistro = true;
							$scope.btnActualizarTutela = true;
							$scope.hdeGuardaTut = true;
							$scope.$apply();
						}, 500);
					}
				}, 1000);
			}

			$scope.RegistroDone = function () {
				$scope.dsbRegistro = true;
				$scope.btnActualizarTutela = false;
				$scope.hdeRegistro = false;
				var f_recepcion = $("#dteFechaRecepcion").data("kendoDatePicker");
				f_recepcion.enable(false);
				$scope.hdeMotivoLbl = false;
				$scope.hdeBtnPanelAdjuntos = false;
				setTimeout(function () { $(document).scrollTop($('#panelListado2').height() + 100); }, 500);
				/////////////////////////
				$scope.hdeAdjuntarRespuesta = true; // Boton Enviar
				$scope.hdeAdjuntarFallo = false; // Boton Enviar
				$scope.hdeAdjuntarFalloSegInst = false; // Boton Enviar
				$scope.hdeAdjuntarImpugnacion = false; // Boton Enviar
				$scope.hdeAdjuntarFalloImpugnacion = false; // Boton Enviar
			}

			$scope.habilitarInfo = function () {
				$.getJSON("php/obtenersession.php").done(function (respuesta) {
					$scope.sesdata = respuesta;
					if ($scope.sesdata.cedula == "1096211358" || $scope.sesdata.cedula == "1045739217" || $scope.sesdata.cedula == "1045250310") {
						$scope.dsbRegistro = false;
					} else {
						$scope.dsbRegistro = true;
					}
				})
				$scope.hdeMotivoLbl = true;
				switch ($scope.registro.causa) {
					case 'AS': case 'DP': case 'OT': case 'PE': case 'TS': case 'VT':
					$scope.hdeMotivo = false;
					$scope.registro.motivolbl = $scope.registro.motivo;
					break;
					case 'CN': case 'CP': case 'IN': case 'IP': case 'MN': case 'MP': case 'PN': case 'PP':
					$scope.hdeDiagnostico = false;
					$scope.nomDiagnostico();
					break;
				}
				//CONFIGURA INPUTS PARA MODIFICACION
				document.getElementById('dteFechaRecepcion').disabled = false;
				//document.getElementById('cons_juzgado').disabled = true; 
				//document.getElementById('aniocons_juzgado').disabled = true;
				document.getElementById('nombreips').disabled = true;
			}

			//VALIDACION PARA HABILITAR O NO CAMPS AL ACTUALIZAR TUTELA CNVU 02/12/2019
			$scope.habilitarInfoFalloTutela = function () {
				if ($scope.sesdata.cedula != "1096211358" && $scope.sesdata.cedula != "1045250310" && $scope.sesdata.cedula != "1045739217") {
					$scope.dsbRegistro = false;
					$scope.hdeAdjuntarfile = true;
					document.getElementById('cons_juzgado').disabled = true;
					document.getElementById('aniocons_juzgado').disabled = true;
					document.getElementById('medioRecepcionAdmisionTut').disabled = true;
					document.getElementById('diferenteepsAdmisionTut').disabled = true;
					// document.getElementById('dteFechaMedioRecepcionAdmisionTut').disabled = true;
					document.getElementById('accionante').disabled = true;
					document.getElementById('tipoidafiliado').disabled = true;
					document.getElementById('documento').disabled = true;
					document.getElementById('juzgado').disabled = true;
					document.getElementById('dteFechaRecepcion').disabled = true;
					document.getElementById('plazo').disabled = true;
					document.getElementById('medidaprovisional').disabled = true;
					document.getElementById('dteFechaRecepcionMedida').disabled = true;
					document.getElementById('plazoMedida').disabled = true;
					document.getElementById('causa').disabled = true;
					document.getElementById('diagnostico').disabled = true;
					document.getElementById('motivo').disabled = true;
					if ($scope.registro.status > 2) {
						document.getElementById('btnActualizaTutela').disabled = false;
					} else {
						document.getElementById('btnActualizaTutela').disabled = true;
					}
					// $("#dteFechaMedioRecepcionAdmisionTut+span").css({ "pointer-events": "none", "opacity": ".2"});
					// $("#dteFechaRecepcion+span").css({ "pointer-events": "none", "opacity": ".2"});
					// $("#dteFechaRecepcionMedida+span").css({ "pointer-events": "none", "opacity": ".2" });
					// var f_recepcion = $("#dteFechaRecepcionMedida").data("kendoDatePicker").enable(true);
				} else {
					// VALIDA MOSTRAR O NO INPUT ADMISION CNVU 14/01/2020
					if ($scope.registro.rutaadmision == '' || $scope.registro.rutaadmision == null || $scope.registro.rutaadmision == undefined) {
						$scope.hdeAdjuntarfile = false;
					} else {
						$scope.hdeAdjuntarfile = true;
					}
					document.getElementById('dteFechaRecepcion').disabled = false;
					$("#dteFechaRecepcion").data("kendoDatePicker").enable(true);
				}
			}

			//VALIDACION PARA DESHABILITAR CAMPOS AL ACTUALIZAR TUTELA CNVU
			$scope.deshabilitarInfoTutela = function () {
				if ($scope.sesdata.cedula != "1096211358" && $scope.sesdata.cedula != "1045250310" && $scope.sesdata.cedula != "1045739217") {
					$scope.dsbRegistro = false;
					document.getElementById('cons_juzgado').disabled = false;
					document.getElementById('aniocons_juzgado').disabled = false;
					document.getElementById('medioRecepcionAdmisionTut').disabled = false;
					//document.getElementById('dteFechaMedioRecepcionAdmisionTut').disabled = false;
					// document.getElementById('medioRecepcionAdmisionTutAdjunto').disabled = false;
					document.getElementById('accionante').disabled = false;
					// document.getElementById('admisiontutela').disabled = false;
					document.getElementById('tipoidafiliado').disabled = false;
					document.getElementById('documento').disabled = false;
					document.getElementById('nit').disabled = false;
					document.getElementById('nombreips').disabled = false;
					document.getElementById('nombreagente').disabled = false;
					document.getElementById('otroaccionante').disabled = false;
					document.getElementById('juzgado').disabled = false;
					document.getElementById('dteFechaRecepcion').disabled = false;
					document.getElementById('plazo').disabled = false;
					document.getElementById('medidaprovisional').disabled = false;
					document.getElementById('dteFechaRecepcionMedida').disabled = false;
					document.getElementById('plazoMedida').disabled = false;
					document.getElementById('causa').disabled = false;
					document.getElementById('diagnostico').disabled = false;
					document.getElementById('motivo').disabled = false;
					//$("#dteFechaMedioRecepcionAdmisionTut+span").css({ "pointer-events": "all", "opacity": "initial" });
					$("#dteFechaRecepcion+span").css({ "pointer-events": "all", "opacity": "initial" });
					$("#dteFechaRecepcionMedida+span").css({ "pointer-events": "all", "opacity": "initial" });
				}
			}

			//CLIC EN TUTELA SELECCIONADA
			$('#resultTutelas tbody').on('click', 'tr', function () {
				$scope.despl1 = true;
				var data = lisTutelas.row(this).data();
				$scope.registro.accionante = data.accionante;
				$scope.Limpiar_Inputs_Files();//Limpia todos los inputs type file
				$scope.labelotraepsAdmisionTut = false;//label que muestra si el afiliado es de otra eps
				var Etapa = 0;
				if (data === undefined) {
					return;
				}
				$scope.restart();
				swal({
					title: 'Cargando información de tutela'
				});
				swal.showLoading();
				$http({
					method: 'POST',
					url: "php/juridica/tutelas/functutelas.php",
					data: {
						function: 'obtenerTutela',
						numerotutela: data.numero
					}
				}).then(function (response) {
					// CNVU - PERMISOS FUNCIONARIOS 23/01/2020
					setTimeout(function () {
						// console.log($scope.sesdata);
						if ($scope.sesdata.cedula == '1129521065' || $scope.sesdata.cedula == '1140902160') {
							setTimeout(function () {
								$scope.btn.GuardaRegistro = true;
								$scope.btnActualizarTutela = true;
								$scope.hdeGuardaTut = true;
								$scope.$apply();
							}, 500);
						}
					}, 3000);
					$scope.registro = response.data;
					$scope.registro_motivo = $scope.registro.motivo;
					$("#dteFechaRecepcion").val($scope.registro.f_recepcion);
					$("#dteFechaVencimiento").val($scope.registro.f_vencimiento);
					//SET VALOR DE FECHAS FALLO CNVU 02/12/2019
					$("#dteFechaFalloAc").val($scope.registro.f_fallo);
					$("#dteFechaVencimientoFalloAc").val($scope.registro.f_fallo_plazo);
					$scope.registro.plazofalloac = $scope.registro.plazo_fallo;
					//SET VALOR DE FECHAS MEDIDA CNVU 10/12/2019
					$("#dteFechaRecepcionMedida").val($scope.registro.fecha_recepcion_medida_prov);
					$("#dteFechaVencimientoMedida").val($scope.registro.fecha_vencimiento_medida_prov);
					$scope.lstMotivos();
					// VALIDA MOSTRAR O NO CAMPOS DE FECHA MEDIDA PROVISIONAL CNVU 10/12/2019
					$scope.changeMedida("1");
					$scope.changeMedida("3");
					$scope.changeMedida("5");
					$scope.changeMedida("15");
					$scope.RegistroDone();
					$scope.habilitarInfo();

					if (parseInt($scope.registro.anioconsecutivo) < 2018 || $scope.registro.diferenteepsAdmisionTut == true) {//-- VALIDAR TAMBIEN QUE SEAN DE OTRAS EPS
						$scope.BuscarOmitirEtapasTut();//Buscar Etapas para habilitar
					} else {
						$scope.hdebtnOmitirEtapas = false;
					}
					// VALIDA MOSTRAR O NO CAMPOS DE FALLO TUTELA CNVU 12/12/2019
					if ($scope.registro.status > 2) {
						$scope.hdeFechaFallo = true;
					}

					//DESHABILITAR INFORMACION CNVU 02/12/2019
					setTimeout(function () {
						$scope.setNombreAfil();
						$scope.habilitarInfoFalloTutela();
					}, 300);
					$scope.juzgado = {
						codigo: $scope.registro.codigo_juzgado,
						ubicacion: $scope.registro.ubicacion_juzgado,
						nombre: $scope.registro.nombre_juzgado
					}
					$scope.juzgado.seleccion = $scope.juzgado.codigo + ' - ' + $scope.juzgado.nombre;
					$scope.diagnostico = {
						codigo: $scope.registro.codigo_dx,
						nombre: $scope.registro.nombre_dx
					}
					$scope.nomDiagnostico();
					swal.close();
					$scope.detalles.fallotutela = $scope.registro.fallo.fallotutela;
					if (response.data.rutarecibidorespuestatutela == null) {
						$scope.hdeVBrespuestatutela = false;
						$scope.hdeAdjuntarRespuesta = false;
						setTimeout(function () { $(document).scrollTop($('#panelListado2').height() + 1000); }, 500);
						$scope.despl2 = true;
						Etapa = 3;
						return;
					} else {
						$scope.hdeVBrespuestatutela = true;
						$scope.hdeAdjuntarRespuesta = true;
					}
					if ($scope.registro.status == "2") {
						$scope.hdeFechaFallo = false;
						$scope.hdeDetallesAccion = false;
						// $scope.despl1 = false;
						$scope.despl3 = true;
						setTimeout(function () { $(document).scrollTop($('#panelListado3').height() + 1200); }, 500);
						Etapa = 2;
						// $scope.DesactivarBotonesAdjuntar();//Quitar botones
						setTimeout(function () { $scope.ActivarBotonesAdjuntar(Etapa); }, 500);
						// console.log("Etapa: " + Etapa);
						return;
					}

					
					$scope.detallesetpdos.fallotutelainstdos = $scope.registro.fallo.fallo_seg_instancia;
					$scope.detalles.tratamientointegral = $scope.registro.fallo.tratamiento_integral;
					$scope.detalles.seguimiento = $scope.registro.fallo.seguimiento;
					$scope.detalles.impugnado = $scope.registro.fallo.impugnado;
					$scope.hdefallo = !$scope.registro.fallo.impugnado;

					if ($scope.registro.status == "3") {

						if ($scope.registro.fallo.fallotutela == true) {
							//$scope.hdeImpugnacion = true;
							$scope.hdeDetallesAccionSeg = false;
							$scope.despl7 = true;
							setTimeout(function () { $(document).scrollTop($('#panelListado7').height() + 1200); }, 500);
							Etapa = 14;
						} else {
							$scope.hdeImpugnacion = false;
							$scope.hdeDetallesAccionSeg = true;
							$scope.despl4 = true;
							setTimeout(function () { $(document).scrollTop($('#panelListado4').height() + 1200); }, 500);
							Etapa = 4;
						}
						if ($scope.registro.fallo.fallo_seg_instancia == null) {
							$scope.dsbDetallesSegInst = false;
							$scope.hdeAdjuntarFalloSegInst = false;
							Etapa = 14;
						} else {
							$scope.dsbDetallesSegInst = true;
							$scope.hdeAdjuntarFalloSegInst = true;
							$scope.hdeImpugnacion = false;
							Etapa = 4;
							if ($scope.registro.fallo.fallo_seg_instancia == false) {
								$scope.despl3 = false;
								$scope.despl7 = false;
								$scope.despl4 = true;
								$scope.hdeImpugnacion = false;
								setTimeout(function () { $(document).scrollTop($('#panelListado4').height() + 1100); }, 500);
							} else {
								$scope.despl3 = true;
								$scope.despl7 = true;
								$scope.despl4 = false;
								setTimeout(function () { $(document).scrollTop($('#panelListado3').height() + 1100); }, 500);
							}
						}
						// Se muestran los paneles
						$scope.hdeDetallesAccion = false;
						$scope.hdeRegistro = false;
						// Se bloquean los formularios que ya se completaron
						$scope.dsbDetalles = true;
						$scope.hdeAdjuntarFallo = true;
					}
					////////////IMPUGNADO LISTO, AHORA MUESTRA CUMPLIMIENTO
					if ($scope.registro.status == "4") {
						$scope.selec_inci = $scope.registro.status_desacato;
						$scope.tabselect = parseInt($scope.registro.status_desacato) + 1;
						$scope.vertab(parseInt($scope.registro.status_desacato) + 1);
						$scope.csstab(parseInt($scope.registro.status_desacato) + 1);

						// Se muestran los paneles
						$scope.hdeRegistro = false;
						$scope.hdeDetallesAccion = false;
						$scope.hdeImpugnacion = false;
						$scope.hdeIncidentes = false;
						//Se bloquean
						$scope.dsbDetalles = true;
						$scope.hdeAdjuntarFallo = true;
						$scope.dsbImpugnacion = true;
						$scope.hdeAdjuntarImpugnacion = true;
						// Se Agrupan los paneles
						// $scope.despl1 = false;
						$scope.despl3 = false;
						$scope.despl4 = false;
						$scope.despl6 = true;
						//Se Activan

						$scope.hdeCumplimiento = false;
						$scope.despl5 = true;
						$scope.hdecumpli = false;
						setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1500); }, 500);
						Etapa = 44;
						if ($scope.hdefallo == false) {
							Etapa = 6;
						}
					}
					////////////CUMPLIMIENTO MENSUAL LISTO, AHORA MUESTRA CUMPLIMIENTO - FALLO DE IMPUGNACION
					if ($scope.registro.status == "5") {
						$scope.selec_inci = $scope.registro.status_desacato;
						$scope.tabselect = parseInt($scope.registro.status_desacato) + 1;
						$scope.vertab(parseInt($scope.registro.status_desacato) + 1);
						$scope.csstab(parseInt($scope.registro.status_desacato) + 1);

						// Se muestran los paneles
						$scope.hdeRegistro = false;
						$scope.hdeDetallesAccion = false;
						$scope.hdeImpugnacion = false;
						$scope.hdeIncidentes = false;
						//Se bloquean
						$scope.dsbDetalles = true;
						$scope.hdeAdjuntarFallo = true;
						$scope.dsbImpugnacion = true;
						$scope.hdeAdjuntarImpugnacion = true;
						$scope.hdefallo = true;
						// Se Agrupan los paneles
						// $scope.despl1 = false;
						$scope.despl3 = false;
						$scope.despl4 = false;
						$scope.despl6 = true;
						//Se Activan
						$scope.hdeCumplimiento = false;
						$scope.despl5 = true;
						$scope.hdecumpli = false;
						setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1500); }, 500);
						Etapa = 55;
					}

					if (Etapa != 55 && Etapa != 44) {
						$scope.DesactivarBotonesAdjuntar();//Quitar botones
						setTimeout(function () { $scope.ActivarBotonesAdjuntar(Etapa); }, 500);
					}
					// console.log("Etapa: " + Etapa);
					//DESACTIVA y OCULTA LAS ETAPAS SI EL ESTADO DE LA TUTELA ES ARCHIVADO
					if ($scope.registro.estadoTutela == true) {
						$scope.hdeVBrespuestatutela = true;
						$scope.dsbDetalles = true;
						$scope.dsbDetallesSegInst = true;
						$scope.dsbImpugnacion = true;
						$scope.hdeCumplimiento = true;
						$scope.hdeIncidentes = true;
					}
				});
});
			//FIN CLIC TUTELA SELECCIONADA

			consultaHTTP.obtenerDocumento().then(function (response) {
				$scope.Documentos = response;
			})
			$scope.buscarTutelas = function () {
				$http({
					method: 'POST',
					url: "php/juridica/tutelas/functutelas.php",
					data: {
						function: 'buscaTutelas',
						keywordtutelas: $scope.keywordtutelas
					}
				}).then(function (response) {
					$scope.Tutelas = response.data;
				});
			}
			$scope.listaCausas = function () {
				$http({
					method: 'POST',
					url: "php/juridica/tutelas/functutelas.php",
					data: {
						function: 'listaCausas'
					}
				}).then(function (response) {
					$scope.Causas = response.data;
					$scope.registro.causa = "";
				});
			}
			$scope.listaCausas();
			$scope.listaAccionantes = function () {
				$http({
					method: 'POST',
					url: "php/juridica/tutelas/functutelas.php",
					data: {
						function: 'listaAccionantes'
					}
				}).then(function (response) {
					$scope.Accionantes = response.data;
					// $scope.registro.accionante = 1;
				});
			}
			$scope.listaAccionantes();
			$scope.lstMotivos = function () {
				if ($scope.registro.causa != "") {
					$http({
						method: 'POST',
						url: "php/juridica/tutelas/functutelas.php",
						data: {
							function: 'listaMotivos',
							causa: $scope.registro.causa
						}
					}).then(function (response) {
						$scope.Motivos = response.data;
						if ($scope.Motivos.length == 1) {
							$scope.hdeMotivo = true;
							$scope.hdeDiagnostico = false;
						} else {
							$scope.hdeMotivo = false;
							$scope.hdeDiagnostico = true;
						}
					});
				}
			}
			$scope.lmpAccionante = function () {
				$scope.hdeIdafiliado = true;
				$scope.hdeInfoempresa = true;
				$scope.hdeNombreAO = true;
				$scope.hdeOtro = true;
			}
			$scope.chgAccionante = function () {
				$scope.lmpAccionante();
				switch ($scope.registro.accionante) {
					case '1':
					$scope.hdeIdafiliado = false;
					break;
					case '2':
					$scope.hdeInfoempresa = false;
					break;
					case '3':
					$scope.hdeNombreAO = false;
					$scope.hdeIdafiliado = false;
					break;
					case '4':
					$scope.hdeOtro = false;
					break;
					default:
					$scope.lmpAccionante();
				}
			}
			$scope.chgAccionante();
			$scope.modalJuzgados = function () {
				$scope.dialogJuz = ngDialog.open({
					template: 'views/juridica/modal/modalJuzgados.html',
					className: 'ngdialog-theme-plain',
					controller: 'modalJuzgadosctrl',
					scope: $scope
				});
				$scope.dialogJuz.closePromise.then(function (data) {
					if (data.value != "$document") {
						$scope.juzgado = {
							codigo: data.value.codigo,
							ubicacion: data.valueubicacion,
							nombre: data.value.nombre
						}
						$scope.nomJuzgado();
					}
				});
			}
			$scope.modalDiagnosticos = function () {
				$scope.dialogDiag = ngDialog.open({
					template: 'views/juridica/modal/modalDiagnosticos.html',
					className: 'ngdialog-theme-plain',
					controller: 'modalDiagnosticosctrl',
					scope: $scope
				});
				$scope.dialogDiag.closePromise.then(function (data) {
					if (data.value != "$document") {
						$scope.diagnostico = {
							codigo: data.value.codigo,
							nombre: data.value.nombre
						}
						$scope.nomDiagnostico();
					}
				});
			}
			$scope.nomJuzgado = function () {
				if ($scope.juzgado.codigo === undefined || $scope.juzgado.codigo == "") {
					$scope.juzgado.seleccion = "SELECCIONAR";
				} else {
					$scope.juzgado.seleccion = $scope.juzgado.codigo + ' - ' + $scope.juzgado.nombre
				}
			}
			$scope.nomJuzgado();
			$scope.nomDiagnostico = function () {
				if ($scope.diagnostico.codigo === undefined || $scope.diagnostico.codigo == "") {
					$scope.diagnostico.seleccion = "SELECCIONAR";
				} else {
					$scope.diagnostico.seleccion = $scope.diagnostico.codigo + ' - ' + $scope.diagnostico.nombre;
				}
			}
			$scope.nomDiagnostico();
			$scope.setNombreAfil = function () {
				$http({
					method: 'POST',
					url: "php/juridica/tutelas/functutelas.php",
					data: {
						function: 'nombreAfiliado',
						tipo_documento: $scope.registro.tipoidafiliado,
						documento: $scope.registro.idafiliado
					}
				}).then(function (response) {
					if (response.data.length == 0) {
						$scope.registro.nombreafiliado = "";
					} else {
						$scope.registro.nombreafiliado = response.data["0"].NOMBRE;
						$scope.nombre_otraeps = response.data["0"].NOMBRE_OTRAEPS;
						if (response.data["0"].OTRAEPS == 'S') {
							$scope.labelotraepsAdmisionTut = true;
							$scope.registro.diferenteepsAdmisionTut = true;
						}else{
							$scope.labelotraepsAdmisionTut = false;
							$scope.registro.diferenteepsAdmisionTut = false;
						}
					}
				});
			}
			$scope.setNombreIps = function () {
				$http({
					method: 'POST',
					url: "php/juridica/tutelas/functutelas.php",
					data: {
						function: 'nombreIps',
						nit_empresa: $scope.registro.nitips
					}
				}).then(function (response) {
					if (response.data.length == 0) {
						$scope.registro.nombreips = "";
						$scope.dsbNombreIps = false;
					} else {
						$scope.registro.nombreips = response.data["0"].NOMBRE;
						$scope.dsbNombreIps = true;
					}
				});
			}
			$scope.setFechaVencimiento = function () {
				$scope.registro.f_recepcion = $("#dteFechaRecepcion").val();
				$http({
					method: 'POST',
					url: "php/juridica/tutelas/functutelas.php",
					data: {
						function: 'fechaVencimiento',
						f_recepcion: $scope.registro.f_recepcion,
						plazo: $scope.registro.plazo
					}
				}).then(function (response) {
					$("#dteFechaVencimiento").val(response.data);
					$scope.registro.f_vencimiento = $("#dteFechaVencimiento").val();
				});
			}
			function setFechaVencimientoClose() { $scope.setFechaVencimiento() }
			$http({
				method: 'POST',
				url: "php/juridica/tutelas/functutelas.php",
				data: {
					function: 'listaFestivos'
				}
			}).then(function (response) {
				$scope.festivos = response.data;
				$("#dteFechaRecepcion").kendoDatePicker({
					format: "dd/MM/yyyy",
					max: new Date(),
					culture: "es-MX",
					close: setFechaVencimientoClose
				});
			});

			$("#dteFechaVencimiento").kendoDatePicker({
				format: "dd/MM/yyyy",
				culture: "es-MX",
				disableDates: ["su", "sa"]
			});

			// FUNCION PLAZO MEDIDA CNVU 10/12/2019
			$scope.setFechaVencimientoMedida = function () {
				$scope.registro.f_medida = $("#dteFechaRecepcionMedida").val();
				$http({
					method: 'POST',
					url: "php/juridica/tutelas/functutelas.php",
					data: {
						function: 'fechaVencimiento',
						f_recepcion: $scope.registro.f_medida,
						plazo: $scope.registro.plazo_medida_prov
					}
				}).then(function (response) {
					$("#dteFechaVencimientoMedida").val(response.data);
					$scope.registro.f_vencimientomedida = $("#dteFechaVencimientoMedida").val();
				});
			}
			function setFechaVencimientoMedidaClose() { $scope.setFechaVencimientoMedida() }
			$http({
				method: 'POST',
				url: "php/juridica/tutelas/functutelas.php",
				data: {
					function: 'listaFestivos'
				}
			}).then(function (response) {
				$scope.festivos = response.data;
				$("#dteFechaRecepcionMedida").kendoDatePicker({
					format: "dd/MM/yyyy",
					max: new Date(),
					culture: "es-MX",
					close: setFechaVencimientoMedidaClose
				});
			});
			$("#dteFechaVencimientoMedida").kendoDatePicker({
				format: "dd/MM/yyyy",
				max: new Date(),
				culture: "es-MX",
				disableDates: ["su", "sa"]
			});

			// FUNCION PLAZO FALLO AC CNVU 02/12/2019
			$scope.setFechaVencimientoFalloAc = function () {
				$scope.registro.f_falloac = $("#dteFechaFalloAc").val();
				$http({
					method: 'POST',
					url: "php/juridica/tutelas/functutelas.php",
					data: {
						function: 'fechaVencimiento',
						f_recepcion: $scope.registro.f_falloac,
						plazo: $scope.registro.plazofalloac
					}
				}).then(function (response) {
					$("#dteFechaVencimientoFalloAc").val(response.data);
					$scope.registro.f_vencimientofalloac = $("#dteFechaVencimientoFalloAc").val();
				});
			}
			function setFechaVencimientoAcClose() { $scope.setFechaVencimientoFalloAc() }
			$http({
				method: 'POST',
				url: "php/juridica/tutelas/functutelas.php",
				data: {
					function: 'listaFestivos'
				}
			}).then(function (response) {
				$scope.festivos = response.data;
				$("#dteFechaFalloAc").kendoDatePicker({
					format: "dd/MM/yyyy",
					max: new Date(),
					culture: "es-MX",
					close: setFechaVencimientoAcClose
				});
			});
			$("#dteFechaVencimientoFalloAc").kendoDatePicker({
				format: "dd/MM/yyyy",
				culture: "es-MX",
				disableDates: ["su", "sa"]
			});

			// FUNCION PLAZO FALLO CNVU 02/12/2019
			$scope.setFechaVencimientoFallo = function () {
				$scope.detalles.f_fallo = $("#dteFechaFallo").val();
				$http({
					method: 'POST',
					url: "php/juridica/tutelas/functutelas.php",
					data: {
						function: 'fechaVencimiento',
						f_recepcion: $scope.detalles.f_fallo,
						plazo: $scope.detalles.plazofallo
					}
				}).then(function (response) {
					$("#dteFechaVencimientoFallo").val(response.data);
					if ($scope.detalles.fallotutela == true) {
						$("#dteFechaVencimientoFallo").val('');
						$scope.detalles.f_vencimientofallo = '';
					} else {
						$scope.detalles.f_vencimientofallo = $("#dteFechaVencimientoFallo").val();
					}
				});
			}
			function setFechaVencimientoFalloClose() { $scope.setFechaVencimientoFallo() }
			$http({
				method: 'POST',
				url: "php/juridica/tutelas/functutelas.php",
				data: {
					function: 'listaFestivos'
				}
			}).then(function (response) {
				$scope.festivos = response.data;
				$("#dteFechaFallo").kendoDatePicker({
					format: "dd/MM/yyyy",
					max: new Date(),
					culture: "es-MX",
					close: setFechaVencimientoFalloClose
				});
			});
			$("#dteFechaVencimientoFallo").kendoDatePicker({
				format: "dd/MM/yyyy",
				culture: "es-MX",
				disableDates: ["su", "sa"]
			});

			function readFile() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.registro.adjuntotutela = e.target.result;
						$scope.registro.adjuntotutelaext = '';
						var name = document.getElementById('admisiontutela').files[0].name;
						$scope.registro.adjuntotutelaext = name.split('.').pop();
						document.querySelector('#inputAdmisionTutela').classList.replace('invalid', 'valid');
					});
					FR.readAsDataURL(this.files[0]);
				}else{
					$scope.registro.adjuntotutela = '';
					$scope.registro.adjuntotutelaext = '';
				}
			}
			function convertRecibidoRespuestaTutela() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivorecibidotutela = e.target.result;
						$scope.archivorecibidotutelaext = '';
						var name = document.getElementById('recibidorespuestatutela').files[0].name;
						$scope.archivorecibidotutelaext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFallo() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivofallotutela = e.target.result;
						var name = document.getElementById('fallotutela').files[0].name;
						$scope.archivofallotutelaext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFalloInstDos() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivofallotutelaseginst = e.target.result;
						var name = document.getElementById('filefallotutelainstdos').files[0].name;
						$scope.archivofallotutelaseginstext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileImpugnacion() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoimpugnacion = e.target.result;
						var name = document.getElementById('archivoimpugnacion').files[0].name;
						$scope.archivoimpugnacionext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			//////////////////////////////////////////
			//////////////////////////////////////////
			function readFileCumpliMensual() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivocumplimensual = e.target.result;
						var name = document.getElementById('archivocumplimensual').files[0].name;
						$scope.archivocumplimensualext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileFalloImpugnado() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivofalloimpug = e.target.result;
						var name = document.getElementById('falloimpugnacion').files[0].name;
						$scope.archivofalloimpugext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileRequerimientopre() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivorequerimientopre = e.target.result;
						var name = document.getElementById('archivofechareqpre').files[0].name;
						$scope.archivorequerimientopreext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileRequerimientopreres() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivorequerimientopreres = e.target.result;
						var name = document.getElementById('archivofechareqpreres').files[0].name;
						$scope.archivorequerimientopreresext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileProcesoincDesa() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoprocesoincidentes = e.target.result;
						var name = document.getElementById('archivofechreqpro').files[0].name;
						$scope.archivoprocesoincidentesext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileProcesoincDesaRes() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoprocesoincidentesres = e.target.result;
						var name = document.getElementById('archivofechreqprores').files[0].name;
						$scope.archivoprocesoincidentesresext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileFalloincDesaRes() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivofalincdes = e.target.result;
						var name = document.getElementById('archivofalinc').files[0].name;
						$scope.archivofalincdesext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}

			function readFileConsultaincDesaRes() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoconincdes = e.target.result;
						var name = document.getElementById('archivofechaconinc').files[0].name;
						$scope.archivoconincdesext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileCierreincDesaRes() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivocieincdes = e.target.result;
						var name = document.getElementById('archivofechaautinc').files[0].name;
						$scope.archivocieincdesext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}

			// FUNCION DE ARCHIVOS MEDIO RECEPCIÓN CNVU 12/12/2019
			function readFileRecepcionAdmisionTut() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoAdmisionTut = e.target.result;
						var name = document.getElementById('medioRecepcionAdmisionTutAdjunto').files[0].name;
						$scope.archivoAdmisionTutext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileRecepcionRespuesta() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoRespuesta = e.target.result;
						var name = document.getElementById('medioRecepcionRespuestaAdjunto').files[0].name;
						$scope.archivoRespuestaext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileRecepcionFallo() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoFallo = e.target.result;
						var name = document.getElementById('medioRecepcionFalloAdjunto').files[0].name;
						$scope.archivoFalloext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileRecepcionSegunda() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoSegunda = e.target.result;
						var name = document.getElementById('medioRecepcionSegundaAdjunto').files[0].name;
						$scope.archivoSegundaext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}


			function readFileRecepcionImpugnacion() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoRecImpugnacion = e.target.result;
						var name = document.getElementById('medioRecepcionImpugnacionAdjunto').files[0].name;
						$scope.archivoRecImpugnacionext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileRecepcionCumplimiento() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoRecCumplimiento = e.target.result;
						var name = document.getElementById('medioRecepcionCumplimientoAdjunto').files[0].name;
						$scope.archivoRecCumplimientoext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}



			function readFileRecepcionFImpugnacion() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoFImpugnacion = e.target.result;
						var name = document.getElementById('medioRecepcionFImpugnacionAdjunto').files[0].name;
						$scope.archivoFImpugnacionext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileRecepcionRqPrevio() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoRqPrevio = e.target.result;
						var name = document.getElementById('medioRecepcionRqPrevioAdjunto').files[0].name;
						$scope.archivoRqPrevioext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileRecepcionRespuestaRq() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoRespuestaRq = e.target.result;
						var name = document.getElementById('medioRecepcionRespuestaRqAdjunto').files[0].name;
						$scope.archivoRespuestaRqext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileRecepcionAdmision() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoAdmision = e.target.result;
						var name = document.getElementById('medioRecepcionAdmisionAdjunto').files[0].name;
						$scope.archivoAdmisionext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileRecepcionRespuestaInc() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoRespuestaInc = e.target.result;
						var name = document.getElementById('medioRecepcionRespuestaIncAdjunto').files[0].name;
						$scope.archivoRespuestaIncext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileRecepcionDecisionInc() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoDecisionInc = e.target.result;
						var name = document.getElementById('medioRecepcionDecisionIncAdjunto').files[0].name;
						$scope.archivoDecisionIncext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileRecepcionConsultaInc() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoConsultaInc = e.target.result;
						var name = document.getElementById('medioRecepcionConsultaIncAdjunto').files[0].name;
						$scope.archivoConsultaIncext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileRecepcionCierreInc() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoCierreInc = e.target.result;
						var name = document.getElementById('medioRecepcionCierreIncAdjunto').files[0].name;
						$scope.archivoCierreIncext = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileEstadoTutela() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoEstadoTutela = e.target.result;
						var name = document.getElementById('idarchivoEstadoTutela').files[0].name;
						$scope.archivoEstadoTutelaExt = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			function readFileMedioEstadoTutela() {
				if (this.files && this.files[0]) {
					var FR = new FileReader();
					FR.addEventListener("load", function (e) {
						$scope.archivoMedioEstadoTutela = e.target.result;
						var name = document.getElementById('medioEstadoTutelaAdjunto').files[0].name;
						$scope.archivoMedioEstadoTutelaExt = name.split('.').pop();
					});
					FR.readAsDataURL(this.files[0]);
				}
			}
			// Read file para segunda etapa
			// Fin
			document.getElementById("fallotutela").addEventListener("change", readFallo);
			document.getElementById("filefallotutelainstdos").addEventListener("change", readFalloInstDos);
			document.getElementById("admisiontutela").addEventListener("change", readFile);
			document.getElementById("recibidorespuestatutela").addEventListener("change", convertRecibidoRespuestaTutela);
			document.getElementById("archivoimpugnacion").addEventListener("change", readFileImpugnacion);
			document.getElementById("archivocumplimensual").addEventListener("change", readFileCumpliMensual);
			document.getElementById("falloimpugnacion").addEventListener("change", readFileFalloImpugnado);
			document.getElementById("archivofechareqpre").addEventListener("change", readFileRequerimientopre);
			document.getElementById("archivofechareqpreres").addEventListener("change", readFileRequerimientopreres);
			document.getElementById("archivofechreqpro").addEventListener("change", readFileProcesoincDesa);
			document.getElementById("archivofechreqprores").addEventListener("change", readFileProcesoincDesaRes);
			document.getElementById("archivofalinc").addEventListener("change", readFileFalloincDesaRes);
			document.getElementById("archivofechaconinc").addEventListener("change", readFileConsultaincDesaRes);
			document.getElementById("archivofechaautinc").addEventListener("change", readFileCierreincDesaRes);
			//PARA NUEVOS CAMPOS DE ADJUNTO DE MEDIO DE RECEPCION CNVU 12/12/2019
			document.getElementById("medioRecepcionAdmisionTutAdjunto").addEventListener("change", readFileRecepcionAdmisionTut);
			document.getElementById("medioRecepcionRespuestaAdjunto").addEventListener("change", readFileRecepcionRespuesta);
			document.getElementById("medioRecepcionFalloAdjunto").addEventListener("change", readFileRecepcionFallo);
			document.getElementById("medioRecepcionSegundaAdjunto").addEventListener("change", readFileRecepcionSegunda);
			document.getElementById("medioRecepcionImpugnacionAdjunto").addEventListener("change", readFileRecepcionImpugnacion);
			document.getElementById("medioRecepcionCumplimientoAdjunto").addEventListener("change", readFileRecepcionCumplimiento);
			document.getElementById("medioRecepcionFImpugnacionAdjunto").addEventListener("change", readFileRecepcionFImpugnacion);
			document.getElementById("medioRecepcionRqPrevioAdjunto").addEventListener("change", readFileRecepcionRqPrevio);
			document.getElementById("medioRecepcionRespuestaRqAdjunto").addEventListener("change", readFileRecepcionRespuestaRq);
			document.getElementById("medioRecepcionAdmisionAdjunto").addEventListener("change", readFileRecepcionAdmision);
			document.getElementById("medioRecepcionRespuestaIncAdjunto").addEventListener("change", readFileRecepcionRespuestaInc);
			document.getElementById("medioRecepcionDecisionIncAdjunto").addEventListener("change", readFileRecepcionDecisionInc);
			document.getElementById("medioRecepcionConsultaIncAdjunto").addEventListener("change", readFileRecepcionConsultaInc);
			document.getElementById("medioRecepcionCierreIncAdjunto").addEventListener("change", readFileRecepcionCierreInc);
			document.getElementById("idarchivoEstadoTutela").addEventListener("change", readFileEstadoTutela);
        	document.getElementById("medioEstadoTutelaAdjunto").addEventListener("change", readFileMedioEstadoTutela);
			function completarForm() {
				swal('Información', 'Complete toda la información para registrar la tutela', 'info');
			}
			function paddy(n, p, c) {
				var pad_char = typeof c !== 'undefined' ? c : '0';
				var pad = new Array(1 + p).join(pad_char);
				var res = (pad + n).slice(-pad.length);
				return res;
			}
			$scope.validaCons = function () {
				$scope.registro.consecutivo = paddy($scope.registro.consecutivo, 5);
			}

			// FUNCION PARA MINIMIZAR CODIGO OMITIR ADMISION CNVU 14/01/2020
			$scope.omitirAdmisionTut = function (mensajeerror, codigotut){
				if ($scope.registro.anioconsecutivo < 2018 || $scope.registro.diferenteepsAdmisionTut == true) {
					if (document.getElementById("admisiontutela").files.length > 0) {
						$http({
							method: 'POST',
							url: "php/upload_file/upload.php",
							data: {
								constutela: codigotut,
								path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
								type: $scope.registro.adjuntotutelaext,
								file: $scope.registro.adjuntotutela,
								db: 'GTUT01',
								typefile: '1',
								ori: true
							}
						}).then(function (response) {
							if (response.data.codigo == "1") {
						// REGISTRA MEDIO RECEPCION ADMISIÓN TUTELA ADJUNTO CNVU
						$scope.registro.adjuntotutela = '';
						$scope.registro.adjuntotutelaext = '';
						$http({
							method: 'POST',
							url: "php/upload_file/upload.php",
							data: {
								db: 'GMREC',
								path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
								constutela: $scope.registro.codigotutela,
								type: ($scope.registro.medioRecepcionAdmisionTut == false) ? "" : $scope.archivoAdmisionTutext,
								file: ($scope.registro.medioRecepcionAdmisionTut == false) ? "" : $scope.archivoAdmisionTut,
								fecha_reqpre: $("#dteFechaRecepcion").val(),
								typefile: '26',
								medio: ($scope.registro.medioRecepcionAdmisionTut == true) ? true : false,
								ori: ($scope.registro.medioRecepcionAdmisionTut == true) ? true : false
							}
						}).then(function (response) {
							if (response.data.codigo == "1") {
								swal('Completado', mensajeerror, 'success')
								$scope.dsbRegistro = true;
								$scope.hdeVBrespuestatutela = false;
								$scope.hdeAdjuntarRespuesta = false;
								$scope.hdeBtnPanelAdjuntos = false;
								$scope.despl2 = true;
								setTimeout(function () { $(document).scrollTop($('#panelListado2').height() + 100); }, 500);
								$scope.despl1 = true;
								$scope.archivoadminision = '';
								$scope.hdeAdjuntarfile = true;
								$scope.registro.adjuntotutela = '';
								$scope.registro.adjuntotutelaext = '';
								$scope.busqueda();
								$('#resultTutelas_filter input').val(codigotut).trigger('keyup');
								// LIMPIA CAMPOS RECEPCION ADMISION TUTELA CNVU
								// $("#dteFechaMedioRecepcionAdmisionTut").val() = "";
								$scope.Medioarchivoadminision = '';
								//
							} else {
								swal('Error', response.data.observacion_err, 'warning')
							}
						});
					} else {
						swal('Error', response.data.observacion_err, 'warning')
					}
				});
					} else {
						swal('Completado', mensajeerror, 'success');
						$scope.registro.adjuntotutela = '';
						$scope.registro.adjuntotutelaext = '';
						$scope.busqueda();
						$('#resultTutelas_filter input').val(codigotut).trigger('keyup');
					}
				}else{
					if (document.getElementById("admisiontutela").files.length > 0) {
						$http({
							method: 'POST',
							url: "php/upload_file/upload.php",
							data: {
								constutela: codigotut,
								path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
								type: $scope.registro.adjuntotutelaext,
								file: $scope.registro.adjuntotutela,
								db: 'GTUT01',
								typefile: '1',
								ori: true
							}
						}).then(function (response) {
							if (response.data.codigo == "1") {
						// REGISTRA MEDIO RECEPCION ADMISIÓN TUTELA ADJUNTO CNVU
						$scope.registro.adjuntotutela = '';
						$scope.registro.adjuntotutelaext = '';
						$http({
							method: 'POST',
							url: "php/upload_file/upload.php",
							data: {
								db: 'GMREC',
								path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
								constutela: $scope.registro.codigotutela,
								type: ($scope.registro.medioRecepcionAdmisionTut == false) ? "" : $scope.archivoAdmisionTutext,
								file: ($scope.registro.medioRecepcionAdmisionTut == false) ? "" : $scope.archivoAdmisionTut,
								fecha_reqpre: $("#dteFechaRecepcion").val(),
								typefile: '26',
								medio: ($scope.registro.medioRecepcionAdmisionTut == true) ? true : false,
								ori: ($scope.registro.medioRecepcionAdmisionTut == true) ? true : false
							}
						}).then(function (response) {
							if (response.data.codigo == "1") {
								swal('Completado', mensajeerror, 'success')
								$scope.dsbRegistro = true;
								$scope.hdeVBrespuestatutela = false;
								$scope.hdeAdjuntarRespuesta = false;
								$scope.hdeBtnPanelAdjuntos = false;
								$scope.despl2 = true;
								setTimeout(function () { $(document).scrollTop($('#panelListado2').height() + 100); }, 500);
								$scope.despl1 = true;
								$scope.archivoadminision = '';
								$scope.hdeAdjuntarfile = true;
								$scope.registro.adjuntotutela = '';
								$scope.registro.adjuntotutelaext = '';
								$scope.busqueda();
								$('#resultTutelas_filter input').val(codigotut).trigger('keyup');
								// LIMPIA CAMPOS RECEPCION ADMISION TUTELA CNVU
								// $("#dteFechaMedioRecepcionAdmisionTut").val() = "";
								$scope.Medioarchivoadminision = '';
								//
							} else {
								swal('Error', response.data.observacion_err, 'warning')
							}
						});
					} else {
						swal('Error', response.data.observacion_err, 'warning')
					}
				});
					} else {
						swal('Completado', mensajeerror, 'success');
						$scope.registro.adjuntotutela = '';
						$scope.registro.adjuntotutelaext = '';
						$scope.busqueda();
						$('#resultTutelas_filter input').val(codigotut).trigger('keyup');
					}
			// swal('Información', 'Complete toda la información para registrar la tutela', 'info');
		}
	}

	$scope.registraTutela = function () {
		$scope.btn.GuardaRegistro = true;
		$scope.registro.diagnostico = $scope.diagnostico.codigo;
		$scope.registro.juzgado = $scope.juzgado.codigo;
		$scope.registro.consecutivojuzgado = $scope.registro.consecutivo + '-' + $scope.registro.anioconsecutivo;
		if (($scope.hdeMotivo == false && ($scope.registro.motivo == "" || $scope.registro.motivo === undefined)) ||
					// ($("#dteFechaRecepcion").val() == "" || $("#dteFechaRecepcion").val() === undefined) ||
					// ($("#dteFechaVencimiento").val() == "" || $("#dteFechaVencimiento").val() === undefined) ||
			($scope.registro.juzgado === undefined || $scope.registro.juzgado == "") || 
			($scope.hdeDiagnostico == false && ($scope.registro.diagnostico == "" || $scope.registro.diagnostico === undefined))) {
			$scope.btn.GuardaRegistro = false;
		return completarForm();
	} else if (($scope.registro.diferenteepsAdmisionTut == false || $scope.registro.diferenteepsAdmisionTut == undefined) 
		&& $scope.registro.anioconsecutivo > 2018 && document.getElementById("admisiontutela").files.length == 0) {
		swal('Información', 'Adjunte la Admisión de Tutela', 'info');
		$scope.btn.GuardaRegistro = false;
	} else if ($scope.registro.medioRecepcionAdmisionTut == true && document.getElementById("medioRecepcionAdmisionTutAdjunto").files.length == 0) {
		swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
		$scope.btn.GuardaRegistro = false;
	} else {
		$scope.registro.actividad = 'I';
		var dataRegistro = JSON.stringify($scope.registro);
		$http({
			method: 'POST',
			url: "php/juridica/tutelas/functutelas.php",
			data: {
				function: 'registraTutela',
				dataRegistro: dataRegistro
			}
		}).then(function (response) {
			$scope.btn.GuardaRegistro = false;
			if (response.data.codigo_err == "0") {
				swal('Error', response.data.observacion_err, 'error');
			} else if (response.data.codigo_err == "1") {
				var mensajeerror = response.data.observacion_err;
				$scope.registro.codigotutela = response.data.consecutivo;
				$scope.omitirAdmisionTut(mensajeerror, $scope.registro.codigotutela);
							// $scope.btn.GuardaRegistro = true;

							// if (document.getElementById("admisiontutela").files.length > 0 && $scope.archivoadminision != '') {
							// 	$http({
							// 		method: 'POST',
							// 		url: "php/upload_file/upload.php",
							// 		data: {
							// 			constutela: response.data.consecutivo,
							// 			path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
							// 			type: $scope.registro.adjuntotutelaext,
							// 			file: $scope.registro.adjuntotutela,
							// 			db: 'GTUT01',
							// 			typefile: '1',
							// 			ori: true
							// 		}
							// 	}).then(function (response) {
							// 		if (response.data.codigo == "1") {
							// 			// REGISTRA MEDIO RECEPCION ADMISIÓN TUTELA ADJUNTO CNVU
							// 			$scope.registro.adjuntotutela = '';
							// 			$scope.registro.adjuntotutelaext = '';
							// 			$http({
							// 				method: 'POST',
							// 				url: "php/upload_file/upload.php",
							// 				data: {
							// 					db: 'GMREC',
							// 					path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
							// 					constutela: $scope.registro.codigotutela,
							// 					type: ($scope.registro.medioRecepcionAdmisionTut == false) ? "" : $scope.archivoAdmisionTutext,
							// 					file: ($scope.registro.medioRecepcionAdmisionTut == false) ? "" : $scope.archivoAdmisionTut,
							// 					fecha_reqpre: $("#dteFechaRecepcion").val(),
							// 					typefile: '26',
							// 					medio: ($scope.registro.medioRecepcionAdmisionTut == true) ? true : false,
							// 					ori: ($scope.registro.medioRecepcionAdmisionTut == true) ? true : false
							// 				}
							// 			}).then(function (response) {
							// 				if (response.data.codigo == "1") {
							// 					swal('Completado', mensajeerror, 'success')
							// 					$scope.dsbRegistro = true;
							// 					$scope.hdeVBrespuestatutela = false;
							// 					$scope.hdeAdjuntarRespuesta = false;
							// 					$scope.hdeBtnPanelAdjuntos = false;
							// 					$scope.despl2 = true;
							// 					setTimeout(function () { $(document).scrollTop($('#panelListado2').height() + 100); }, 500);
							// 					$scope.despl1 = true;
							// 					$scope.archivoadminision = '';
							// 					// LIMPIA CAMPOS RECEPCION ADMISION TUTELA CNVU
							// 					// $("#dteFechaMedioRecepcionAdmisionTut").val() = "";
							// 					$scope.Medioarchivoadminision = '';
							// 					//
							// 				} else {
							// 					swal('Error', response.data.observacion_err, 'warning')
							// 				}
							// 			});
							// 		} else {
							// 			swal('Error', response.data.observacion_err, 'warning')
							// 		}
							// 	});
							// }else{
							// 	swal('Completado', mensajeerror, 'success');
							// 	$scope.registro.adjuntotutela = '';
							// 	$scope.registro.adjuntotutelaext = '';
							// 	$scope.busqueda();
							// 	$('#resultTutelas_filter input').val(response.data.consecutivo).trigger('keyup');
							// }
						}
					});
	}
}
$scope.ActualizarTutela = function () {
	$scope.registro.motivo = ($scope.registro.motivo == 'SELECCIONAR') ? $scope.registro_motivo : $scope.registro.motivo;
				//VALIDACION DE CAMPOS DE FECHA DE FALLO DE TUTELA CNVU 02/12/2019
				if ($scope.sesdata.cedula == "1096211358" || $scope.sesdata.cedula == "1045250310" || $scope.sesdata.cedula == "1045739217" || $scope.registro.status > 2) {
					var Habilitar_Paso = false;
					if ($("#dteFechaRecepcion").val() != "" && $("#dteFechaRecepcion").val() != null && $("#dteFechaRecepcion").val() != undefined) {
						if ($scope.Validar_Fecha($("#dteFechaRecepcion").val()) == 'si') {
							var fecha_falloac = $("#dteFechaFalloAc").val().split("/");

							var fecha_tutelacreacion = $scope.registro.f_recepcion.split("/");

							var newdateftutela = new Date(fecha_tutelacreacion[2], (fecha_tutelacreacion[1] - 1), fecha_tutelacreacion[0]);
							var timeftutela = newdateftutela.getTime();

							var newdateinput = new Date(fecha_falloac[2], (fecha_falloac[1] - 1), fecha_falloac[0]);
							var timeinput = newdateinput.getTime();

							var fecha_actual = new Date();
							var time_actual = fecha_actual.getTime();

							if (timeinput <= timeftutela) {
								swal({
									title: '¡Información!',
									text: 'La fecha del Fallo de Tutela no puede ser menor o igual a la fecha de la Tutela.',
									type: 'info',
									confirmButtonText: 'Cerrar',
									confirmButtonColor: '#174791'
								});
								Habilitar_Paso = false;
							} else if (timeinput > time_actual) {
								swal({
									title: '¡Información!',
									text: 'La fecha del Fallo de Tutela no puede ser mayor a la fecha de hoy.',
									type: 'info',
									confirmButtonText: 'Cerrar',
									confirmButtonColor: '#174791'
								});
								Habilitar_Paso = false;
							}else{
								Habilitar_Paso = true;
							}
						}
					}else{
						Habilitar_Paso = true;
					}
					if (Habilitar_Paso == true) {
						$scope.registro.motivolbl = $scope.registro.motivo;
						$scope.registro.diagnostico = $scope.diagnostico.codigo;
						$scope.registro.juzgado = $scope.juzgado.codigo;
						$scope.registro.consecutivojuzgado = $scope.registro.consecutivo + '-' + $scope.registro.anioconsecutivo;
						if (
							// ($("#dteFechaRecepcion").val() == "" || $("#dteFechaRecepcion").val() === undefined) ||
							// ($("#dteFechaVencimiento").val() == "" || $("#dteFechaVencimiento").val() === undefined) ||
							($scope.registro.juzgado === undefined || $scope.registro.juzgado == "")) {
							return completarForm();
					} else {
						$scope.registro.actividad = 'U';
						if ($scope.registro.accionante == '2') {
							$scope.registro.tipoidafiliado = null;
							$scope.registro.idafiliado = null;
							$scope.registro.nombreafiliado = null;
							$scope.registro.nombreagente = null;
							$scope.registro.otroaccionante = null;
						} else if ($scope.registro.accionante == '4') {
							$scope.registro.tipoidafiliado = null;
							$scope.registro.idafiliado = null;
							$scope.registro.nombreafiliado = null;
							$scope.registro.nombreagente = null;
							$scope.registro.nitips = null;
							$scope.registro.nombreips = null;
						} else if ($scope.registro.accionante == '3') {
							$scope.registro.nitips = null;
							$scope.registro.nombreips = null;
							$scope.registro.otroaccionante = null;
						} else if ($scope.registro.accionante == '1') {
							$scope.registro.nombreagente = null;
							$scope.registro.nitips = null;
							$scope.registro.nombreips = null;
							$scope.registro.otroaccionante = null;
						}
						switch ($scope.registro.causa) {
							case 'CN': case 'CP': case 'IN': case 'IP': case 'MN': case 'MP': case 'PN': case 'PP':
							$scope.registro.motivo = null;
							break;
						}
						var dataRegistro = JSON.stringify($scope.registro);
							// console.log(dataRegistro);
							$http({
								method: 'POST',
								url: "php/juridica/tutelas/functutelas.php",
								data: {
									function: 'registraTutela',
									dataRegistro: dataRegistro
								}
							}).then(function (response) {
								if (response.data.codigo_err == "0") {
									swal('Error', response.data.observacion_err, 'error');
									$scope.btn.GuardaRegistro = false;
								} else if (response.data.codigo_err == "1") {
									var mensajeerror = response.data.observacion_err;
									$scope.registro.codigotutela = response.data.consecutivo;
									swal('Completado', mensajeerror, 'success');
									$scope.btn.GuardaRegistro = false;
									// $scope.hdeVBrespuestatutela = true;
									$scope.hdeBtnPanelAdjuntos = false;
									// $scope.despl2 = true;
									setTimeout(function () { $(document).scrollTop($('#panelListado2').height() + 100); }, 500);
									$scope.despl1 = true;
									$scope.archivoadminision = '';
									$scope.omitirAdmisionTut(mensajeerror, $scope.registro.codigotutela);
								}
							});
						}
					}
				}
			}
			$scope.adjuntaRecibidoTutela = function () {
				if ($("#dteFechaRecepcionRespuesta").val() == "") {
					swal('Información', 'Ingrese la fecha de radicación', 'info');
				} else if ($scope.registro.medioRecepcionRespuesta == true && document.getElementById("medioRecepcionRespuestaAdjunto").files.length == 0) {
					swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
				} else {
					swal({
						title: 'Confirmar',
						text: "¿Desea guardar los detalles de la tutela?",
						type: 'question',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Continuar',
						cancelButtonText: 'Cancelar'
					}).then((result) => {
						if (result) {
							$scope.btn.GuardaRegistro = true;
							$http({
								method: 'POST',
								url: "php/upload_file/upload.php",
								data: {
									db: 'RRT01',
									path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
									constutela: $scope.registro.codigotutela,
									type: $scope.archivorecibidotutelaext,
									file: $scope.archivorecibidotutela,
									fecha_recepcion: $("#dteFechaRecepcionRespuesta").val(),
									typefile: '3',
									ori: true
								}
							}).then(function (response) {
								if (response.data.codigo == "1") {
									// REGISTRA MEDIO RECEPCION RESPUESTA TUTELA ADJUNTO CNVU
									$http({
										method: 'POST',
										url: "php/upload_file/upload.php",
										data: {
											db: 'GMREC',
											path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
											constutela: $scope.registro.codigotutela,
											type: ($scope.registro.medioRecepcionRespuesta == false) ? "" : $scope.archivoRespuestaext,
											file: ($scope.registro.medioRecepcionRespuesta == false) ? "" : $scope.archivoRespuesta,
											fecha_reqpre: $("#dteFechaRecepcionRespuesta").val(),
											typefile: '27',
											medio: ($scope.registro.medioRecepcionRespuesta == true) ? true : false,
											ori: ($scope.registro.medioRecepcionRespuesta == true) ? true : false
										}
									}).then(function (response) {
										$scope.btn.GuardaRegistro = false;
										if (response.data.codigo == "1") {
											$scope.CargaTabsEtapas(3);
											swal('Completado', response.data.observacion_err, 'success');
											$scope.hdeFechaFallo = false;
										} else {
											swal('Error', response.data.observacion_err, 'warning');
											$scope.btn.GuardaRegistro = false;
										}
									});
								} else {
									swal('Error', response.data.observacion_err, 'warning')
								}
							});
						}
					})
				}
			}
			$scope.changeFallo = function () {
				$scope.detalles.tratamientointegral = false;
				$scope.detalles.seguimiento = false;
				// if ($scope.detalles.fallotutela == true) {
				// 	$scope.hdeFechaFallo = true;
				// } else {
				// 	$scope.hdeFechaFallo = false;
				// }
			}

			//OCULTA O MUESTRA FECHA DE MEDIDA PROVISIONAL CNVU 10/12/2019
			$scope.changeMedida = function (variable) {
				switch (variable) {
					case "1":
					if ($scope.registro.medidaprovisional == true) {
						$scope.hdeFechaMedida = false;
							// ASIGNAR SYSDATE CNVU 13/01/2020
							$("#dteFechaRecepcionMedida").val(today);
						} else {
							$scope.hdeFechaMedida = true;
							$scope.registro.medidaprovisional = "";
						}
						break;
						case "2":
						if ($scope.registro.medioRecepcionRespuesta == true) {
							$scope.hdeMedioRecepcionRespuesta = false;
						} else {
							$scope.hdeMedioRecepcionRespuesta = true;
						}
						break;
						case "3":
						if ($scope.registro.medioRecepcionFallo == true) {
							$scope.hdeMedioRecepcionFallo = false;
						} else {
							$scope.hdeMedioRecepcionFallo = true;
						}
						break;
						case "4":
						if ($scope.registro.medioRecepcionSegunda == true) {
							$scope.hdeMedioRecepcionSegunda = false;
						} else {
							$scope.hdeMedioRecepcionSegunda = true;
						}
						break;
						case "5":
						if ($scope.registro.medioRecepcionImpugnacion == true) {
							$scope.hdeMedioRecepcionImpugnacion = false;
						} else {
							$scope.hdeMedioRecepcionImpugnacion = true;
						}
						break;
						case "6":
						if ($scope.registro.medioRecepcionCumplimiento == true) {
							$scope.hdeMedioRecepcionCumplimiento = false;
						} else {
							$scope.hdeMedioRecepcionCumplimiento = true;
						}
						break;
						case "7":
						if ($scope.registro.medioRecepcionFImpugnacion == true) {
							$scope.hdeMedioRecepcionFImpugnacion = false;
						} else {
							$scope.hdeMedioRecepcionFImpugnacion = true;
						}
						break;
						case "8":
						if ($scope.registro.medioRecepcionRqPrevio == true) {
							$scope.hdeMedioRecepcionRqPrevio = false;
						} else {
							$scope.hdeMedioRecepcionRqPrevio = true;
						}
						break;
						case "9":
						if ($scope.registro.medioRecepcionRespuestaRq == true) {
							$scope.hdeMedioRecepcionRespuestaRq = false;
						} else {
							$scope.hdeMedioRecepcionRespuestaRq = true;
						}
						break;
						case "10":
						if ($scope.registro.medioRecepcionAdmision == true) {
							$scope.hdeMedioRecepcionAdmision = false;
						} else {
							$scope.hdeMedioRecepcionAdmision = true;
						}
						break;
						case "11":
						if ($scope.registro.medioRecepcionRespuestaInc == true) {
							$scope.hdeMedioRecepcionRespuestaInc = false;
						} else {
							$scope.hdeMedioRecepcionRespuestaInc = true;
						}
						break;
						case "12":
						if ($scope.registro.medioRecepcionDecisionInc == true) {
							$scope.hdeMedioRecepcionDecisionInc = false;
						} else {
							$scope.hdeMedioRecepcionDecisionInc = true;
						}
						break;
						case "13":
						if ($scope.registro.medioRecepcionConsultaInc == true) {
							$scope.hdeMedioRecepcionConsultaInc = false;
						} else {
							$scope.hdeMedioRecepcionConsultaInc = true;
						}
						break;
						case "14":
						if ($scope.registro.medioRecepcionCierreInc == true) {
							$scope.hdeMedioRecepcionCierreInc = false;
						} else {
							$scope.hdeMedioRecepcionCierreInc = true;
						}
						break;
						case "15":
						if ($scope.registro.medioRecepcionAdmisionTut == true) {
							$scope.hdeMedioRecepcionAdmisionTut = false;
						} else {
							$scope.hdeMedioRecepcionAdmisionTut = true;
						}
						break;
						case "16":
							if ($scope.registro.medioRecepcionEstadoTutela == true) {
								$scope.hdeMedioRecepcionEstadoTutela = false;
							} else {
								$scope.hdeMedioRecepcionEstadoTutela = true;
							}
						break;
					// default:
				}
			}

			// $scope.registraDetalles = function () {
			// 	$scope.btn.GuardaRegistro = true;
			// 	//VALIDACION DE CAMPOS DE FECHA DE FALLO DE TUTELA CNVU 02/12/2019
			// 	var Habilitar_Paso = false;
			// 	if ($scope.detalles.fallotutela == false && $scope.detalles.fallotutela != undefined) {
			// 		if ($scope.Validar_Fecha($("#dteFechaFallo").val()) == 'si') {
			// 			Habilitar_Paso = true;
			// 		}
			// 	} else {
			// 		Habilitar_Paso = true;
			// 	}
			// 	if ($scope.detalles.fallotutela == undefined) { $scope.hdeFechaFallo = false; }

			// 	if (Habilitar_Paso == true) {
			// 		var fecha_fallo = $("#dteFechaFallo").val().split("/");
			// 		var fecha_tutelacreacion = $scope.registro.f_recepcion.split("/");

			// 		var newdateftutela = new Date(fecha_tutelacreacion[2], (fecha_tutelacreacion[1] - 1), fecha_tutelacreacion[0]);
			// 		var timeftutela = newdateftutela.getTime();

			// 		var newdateinput = new Date(fecha_fallo[2], (fecha_fallo[1] - 1), fecha_fallo[0]);
			// 		var timeinput = newdateinput.getTime();

			// 		var fecha_actual = new Date();
			// 		var time_actual = fecha_actual.getTime();

			// 		if (timeinput <= timeftutela) {
			// 			swal({
			// 				title: '¡Información!',
			// 				text: 'La fecha del Fallo de Tutela no puede ser menor o igual a la fecha de la Tutela.',
			// 				type: 'info',
			// 				confirmButtonText: 'Cerrar',
			// 				confirmButtonColor: '#174791'
			// 			});
			// 			$scope.btn.GuardaRegistro = false;
			// 		} else if (timeinput > time_actual) {
			// 			swal({
			// 				title: '¡Información!',
			// 				text: 'La fecha del Fallo de Tutela no puede ser mayor a la fecha de hoy.',
			// 				type: 'info',
			// 				confirmButtonText: 'Cerrar',
			// 				confirmButtonColor: '#174791'
			// 			});
			// 			$scope.btn.GuardaRegistro = false;
			// 		} else if ($scope.registro.medioRecepcionFallo == true && document.getElementById("medioRecepcionFalloAdjunto").files.length == 0) {
			// 			swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
			// 			$scope.btn.GuardaRegistro = false;
			// 		} else {
			// 			swal({
			// 				title: 'Confirmar',
			// 				text: "¿Desea guardar los detalles de la tutela?",
			// 				type: 'question',
			// 				showCancelButton: true,
			// 				confirmButtonColor: '#3085d6',
			// 				cancelButtonColor: '#d33',
			// 				confirmButtonText: 'Continuar',
			// 				cancelButtonText: 'Cancelar'
			// 			}).then((result) => {
			// 				if (result) {
			// 					var dataDetalle = JSON.stringify($scope.detalles);
			// 					// Hace la Peticion cuando crea la tutela y sigue el flujo porque no se guarda la ubicacion de la tutela
			// 					if ($scope.registro.ubicacion == undefined) {
			// 						$.getJSON("php/obtenersession.php").done(function (respuesta) {
			// 							$scope.registro.ubicacion = respuesta;
			// 							// console.log($scope.registro);
			// 						})
			// 					}
			// 					$http({
			// 						method: 'POST',
			// 						url: "php/juridica/tutelas/functutelas.php",
			// 						data: {
			// 							function: 'registraEtapa2',
			// 							dataDetalle: dataDetalle,
			// 							codigotutela: $scope.registro.codigotutela,
			// 							ubicacion_tutela: $scope.registro.ubicacion
			// 						}
			// 					}).then(function (response) {
			// 						if (response.data.codigo == "1") {
			// 							$http({
			// 								method: 'POST',
			// 								url: "php/upload_file/upload.php",
			// 								data: {
			// 									db: 'uplRutaDb',
			// 									path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
			// 									constutela: $scope.registro.codigotutela,
			// 									type: $scope.archivofallotutelaext,
			// 									file: $scope.archivofallotutela,
			// 									typefile: '2',
			// 									ori: true
			// 								}
			// 							}).then(function (response) {
			// 								if (response.data.codigo == "1") {
			// 									// REGISTRA MEDIO RECEPCION FALLO TUTELA ADJUNTO CNVU
			// 									$http({
			// 										method: 'POST',
			// 										url: "php/upload_file/upload.php",
			// 										data: {
			// 											db: 'GMREC',
			// 											path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
			// 											constutela: $scope.registro.codigotutela,
			// 											type: ($scope.registro.medioRecepcionFallo == false) ? "" : $scope.archivoFalloext,
			// 											file: ($scope.registro.medioRecepcionFallo == false) ? "" : $scope.archivoFallo,
			// 											fecha_reqpre: $("#dteFechaFallo").val(),
			// 											typefile: '28',
			// 											medio: ($scope.registro.medioRecepcionFallo == true) ? true : false,
			// 											ori: ($scope.registro.medioRecepcionFallo == true) ? true : false
			// 										}
			// 									}).then(function (response) {
			// 										$scope.btn.GuardaRegistro = false;
			// 										if (response.data.codigo == "1") {
			// 											$scope.CargaTabsEtapas(2);
			// 											swal('Completado', response.data.observacion_err, 'success');
			// 										} else {
			// 											swal('Error', response.data.observacion_err, 'warning');
			// 										}
			// 									});
			// 								} else {
			// 									swal('Error', response.data.observacion_err, 'warning');
			// 								}
			// 							});
			// 						} else {
			// 							swal('Error', response.data.observacion_err, 'warning');
			// 						}
			// 					});
			// 				}
			// 			})
			// 		}

			// 	} else {
			// 		swal('Información', 'Digite los campos de Fecha Fallo de Tutela', 'info');
			// 		$scope.btn.GuardaRegistro = false;
			// 	}

			// }

			$scope.registraDetalles = function () {
				//VALIDACION DE CAMPOS DE FECHA DE FALLO DE TUTELA CNVU 02/12/2019
				var Habilitar_Paso = false;
				if ($scope.detalles.fallotutela == false && $scope.detalles.fallotutela != undefined) {
					if ($scope.Validar_Fecha($("#dteFechaFallo").val()) == 'si') {
						Habilitar_Paso = true;
					}
				} else {
					Habilitar_Paso = true;
				}
				if ($scope.detalles.fallotutela == undefined) { $scope.hdeFechaFallo = false; }
				
				if (Habilitar_Paso == true) {
					if ($scope.Validar_Fecha($scope.registro.f_recepcion) == 'si') {
						
						var fecha_fallo = $("#dteFechaFallo").val().split("/");
						var fecha_tutelacreacion = $scope.registro.f_recepcion.split("/");
						
						var newdateftutela = new Date(fecha_tutelacreacion[2], (fecha_tutelacreacion[1] - 1), fecha_tutelacreacion[0]);
						var timeftutela = newdateftutela.getTime();
						
						var newdateinput = new Date(fecha_fallo[2], (fecha_fallo[1] - 1), fecha_fallo[0]);
						var timeinput = newdateinput.getTime();
						
						var fecha_actual = new Date();
						var time_actual = fecha_actual.getTime();
						
						if (timeinput <= timeftutela) {
							swal({
								title: '¡Información!',
								text: 'La fecha del Fallo de Tutela no puede ser menor o igual a la fecha de la Tutela.',
								type: 'info',
								confirmButtonText: 'Cerrar',
								confirmButtonColor: '#174791'
							});
						} else if (timeinput > time_actual) {
							swal({
								title: '¡Información!',
								text: 'La fecha del Fallo de Tutela no puede ser mayor a la fecha de hoy.',
								type: 'info',
								confirmButtonText: 'Cerrar',
								confirmButtonColor: '#174791'
							});
						} else if ($scope.registro.medioRecepcionFallo == true && document.getElementById("medioRecepcionFalloAdjunto").files.length == 0) {
							swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
						}
						$scope.registraDetallesComplemento();
					} else {
						$scope.registraDetallesComplemento();
					}					
				} else {
					//Habilitar_Paso
					swal('Información', 'Digite los campos de Fecha Fallo de Tutela', 'info');
				}
			}

			$scope.registraDetallesComplemento = function (){
				swal({
					title: 'Confirmar',
					text: "¿Desea guardar los detalles de la tutela?",
					type: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Continuar',
					cancelButtonText: 'Cancelar'
				}).then((result) => {
					if (result) {
						$scope.btn.GuardaRegistro = true;
						var dataDetalle = JSON.stringify($scope.detalles);
						// Hace la Peticion cuando crea la tutela y sigue el flujo porque no se guarda la ubicacion de la tutela
						if ($scope.registro.ubicacion == undefined) {
							$.getJSON("php/obtenersession.php").done(function (respuesta) {
								$scope.registro.ubicacion = respuesta;
								// console.log($scope.registro);
							})
						}
						$http({
							method: 'POST',
							url: "php/juridica/tutelas/functutelas.php",
							data: {
								function: 'registraEtapa2',
								dataDetalle: dataDetalle,
								codigotutela: $scope.registro.codigotutela,
								ubicacion_tutela: $scope.registro.ubicacion
							}
						}).then(function (response) {
							if (response.data.codigo == "1") {
								$http({
									method: 'POST',
									url: "php/upload_file/upload.php",
									data: {
										db: 'uplRutaDb',
										path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
										constutela: $scope.registro.codigotutela,
										type: $scope.archivofallotutelaext,
										file: $scope.archivofallotutela,
										typefile: '2',
										ori: true
									}
								}).then(function (response) {
									if (response.data.codigo == "1") {
										// REGISTRA MEDIO RECEPCION FALLO TUTELA ADJUNTO CNVU
										$http({
											method: 'POST',
											url: "php/upload_file/upload.php",
											data: {
												db: 'GMREC',
												path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
												constutela: $scope.registro.codigotutela,
												type: ($scope.registro.medioRecepcionFallo == false) ? "" : $scope.archivoFalloext,
												file: ($scope.registro.medioRecepcionFallo == false) ? "" : $scope.archivoFallo,
												fecha_reqpre: $("#dteFechaFallo").val(),
												typefile: '28',
												medio: ($scope.registro.medioRecepcionFallo == true) ? true : false,
												ori: ($scope.registro.medioRecepcionFallo == true) ? true : false
											}
										}).then(function (response) {
											if (response.data.codigo == "1") {
												$scope.btn.GuardaRegistro = false;
												$scope.CargaTabsEtapas(2);
												swal('Completado', response.data.observacion_err, 'success');
											} else {
												swal('Error', response.data.observacion_err, 'warning');
											}
										});
									} else {
										swal('Error', response.data.observacion_err, 'warning');
									}
								});
							} else {
								swal('Error', response.data.observacion_err, 'warning')
							}
						});
					}
				})
			}

			$scope.registraDetallesInstDos = function () {
				if ($scope.registro.medioRecepcionSegunda == true && document.getElementById("medioRecepcionSegundaAdjunto").files.length == 0) {
					swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
					$scope.btn.GuardaRegistro = false;
				} else {
					swal({
						title: 'Confirmar',
						text: "¿Desea guardar los detalles de la tutela?",
						type: 'question',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Continuar',
						cancelButtonText: 'Cancelar'
					}).then((result) => {
						if (result) {
							$scope.btn.GuardaRegistro = true;
							$http({
								method: 'POST',
								url: "php/upload_file/upload.php",
								data: {
									db: 'uplRutaDb',
									path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
									constutela: $scope.registro.codigotutela,
									type: $scope.archivofallotutelaseginstext,
									file: $scope.archivofallotutelaseginst,
									typefile: '14',
									ori: true,
									fallo_seg: $scope.detallesetpdos.fallotutelainstdos == true ? true : false
								}
							}).then(function (response) {
								$scope.btn.GuardaRegistro = false;
								if (response.data.codigo == "1") {
									// REGISTRA MEDIO RECEPCION SEGUNDA ADJUNTO CNVU 13/12/2019
									$http({
										method: 'POST',
										url: "php/upload_file/upload.php",
										data: {
											db: 'GMREC',
											path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
											constutela: $scope.registro.codigotutela,
											type: $scope.registro.medioRecepcionSegunda == false ? "" : $scope.archivoSegundaext,
											file: $scope.registro.medioRecepcionSegunda == false ? "" : $scope.archivoSegunda,
											fecha_reqpre: "",
											typefile: '29',
											medio: $scope.registro.medioRecepcionSegunda == true ? true : false,
											ori: $scope.registro.medioRecepcionSegunda == true ? true : false
										}
									}).then(function (response) {
										$scope.btn.GuardaRegistro = false;
										if (response.data.codigo == "1") {
											$scope.CargaTabsEtapas(14);
											swal('Completado', response.data.observacion_err, 'success')
										} else {
											swal('Error', response.data.observacion_err, 'warning')
										}
									});
								} else {
									swal('Error', response.data.observacion_err, 'warning')
								}
							});
						}
					});
				}
			}
			// 


			$scope.registraImpugnacion = function () {
				if ($scope.registro.medioRecepcionImpugnacion == true && (document.getElementById("medioRecepcionImpugnacionAdjunto").files.length == 0
					|| $scope.Validar_Fecha($("#dteMedioRecepcionImpugnacion").val()) == 'no')) {
					swal('Información', 'Digite Fecha y Adjunte el soporte de Medio de Recepción', 'info');
			} else {
				swal({
					title: 'Confirmar',
					text: "¿Confirma el registro de la información?",
					type: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Continuar',
					cancelButtonText: 'Cancelar'
				}).then((result) => {
					if (result) {
						$scope.btn.GuardaRegistro = true;
						$http({
							method: 'POST',
							url: "php/juridica/tutelas/functutelas.php",
							data: {
								function: 'registraImpugnacion',
								impugnado: $scope.detalles.impugnado,
								codigotutela: $scope.registro.codigotutela
							}
						}).then(function (response) {
							if (response.data.codigo == "1") {
								if ($scope.detalles.impugnado == true) {
									$http({
										method: 'POST',
										url: "php/upload_file/upload.php",
										data: {
											db: 'uplRutaDb',
											path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
											constutela: $scope.registro.codigotutela,
											type: $scope.archivoimpugnacionext,
											file: $scope.archivoimpugnacion,
											typefile: '4',
											ori: true
										}
									}).then(function (response) {
										if (response.data.codigo == "1") {
												// REGISTRA MEDIO RECEPCION IMPUGNACION ADJUNTO CNVU 13/12/2019
												$http({
													method: 'POST',
													url: "php/upload_file/upload.php",
													data: {
														db: 'GMREC',
														path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
														constutela: $scope.registro.codigotutela,
														type: $scope.registro.medioRecepcionImpugnacion == false ? "" : $scope.archivoRecImpugnacionext,
														file: $scope.registro.medioRecepcionImpugnacion == false ? "" : $scope.archivoRecImpugnacion,
														fecha_reqpre: $scope.registro.medioRecepcionImpugnacion,
														typefile: '30',
														medio: ($scope.registro.medioRecepcionImpugnacion == true) ? true : false,
														ori: ($scope.registro.medioRecepcionImpugnacion == true) ? true : false
													}
												}).then(function (response) {
													$scope.btn.GuardaRegistro = false;
													if (response.data.codigo == "1") {
														$scope.CargaTabsEtapas(4);
														swal('Completado', response.data.observacion_err, 'success')
													} else {
														swal('Error', response.data.observacion_err, 'warning')
													}
												});
											} else {
												swal('Error', response.data.observacion_err, 'warning')
											}
										});
								} else {
									$scope.CargaTabsEtapas(4);
									swal('Completado', response.data.observacion_err, 'success')
								}
							} else {
								swal('Error', response.data.observacion_err, 'warning')
							}
						});
					}
				})
			}
		}

		$scope.registraCumplimientoMensual = function () {
			if ($("#FechaSegMen").val() == "") {
				swal('Información', 'Ingrese la fecha de radicación', 'info');
			} else if ($scope.registro.medioRecepcionCumplimiento == true && document.getElementById("medioRecepcionCumplimientoAdjunto").files.length == 0) {
				swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
			} else {
				swal({
					title: 'Confirmar',
					text: "¿Desea guardar los campos de cumplimiento?",
					type: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Continuar',
					cancelButtonText: 'Cancelar'
				}).then((result) => {
					if (result) {
						$scope.btn.GuardaRegistro = true;
						$http({
							method: 'POST',
							url: "php/upload_file/upload.php",
							data: {
								db: 'CM01',
								path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
								constutela: $scope.registro.codigotutela,
								type: $scope.archivocumplimensualext,
								file: $scope.archivocumplimensual,
								fecha_fechasegmen: $("#FechaSegMen").val(),
								typefile: '5',
								ori: true
							}
						}).then(function (response) {
							if (response.data.codigo == "1") {
									// REGISTRA MEDIO RECEPCION CUMPLIMIENTO ADJUNTO CNVU 13/12/2019
									$http({
										method: 'POST',
										url: "php/upload_file/upload.php",
										data: {
											db: 'GMREC',
											path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
											constutela: $scope.registro.codigotutela,
											type: $scope.registro.medioRecepcionCumplimiento == false ? "" : $scope.archivoRecCumplimientoext,
											file: $scope.registro.medioRecepcionCumplimiento == false ? "" : $scope.archivoRecCumplimiento,
											fecha_reqpre: $("#FechaSegMen").val(),
											typefile: '31',
											medio: ($scope.registro.medioRecepcionCumplimiento == true) ? true : false,
											ori: ($scope.registro.medioRecepcionCumplimiento == true) ? true : false
										}
									}).then(function (response) {
										$scope.btn.GuardaRegistro = false;
										if (response.data.codigo == "1") {
											swal('Completado', response.data.observacion_err, 'success');
											/////
											$scope.hdeVBrespuestatutela = true;
											$scope.hdeDetallesAccion = false;
											$scope.dsbDetalles = true;
											$scope.despl3 = false;
											if ($scope.detalles.fallotutela == true) {
												$scope.hdeDetallesAccionSeg = false; $scope.dsbDetallesSegInst = true; $scope.despl7 = false;
											} else { $scope.hdeDetallesAccionSeg = true; }
											$scope.hdeAdjuntarFalloSegInst = true;
											$scope.dsbDetallesSegInst = true;
											/////
											$scope.hdeImpugnacion = false;
											$scope.dsbImpugnacion = true;
											$scope.hdeAdjuntarImpugnacion = true;
											$scope.despl4 = false;
											/////
											$scope.DesactivarBotonesAdjuntar();
											$scope.despl5 = true;
											if ($scope.registro.status == "5") {
												$scope.hdefallo = true;
											} else {
												$scope.hdeCumplimiento = true;
												$scope.hdefallo = false;
												// Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
											}
											/////
											if ($scope.hdefallo == true) {
												$scope.hdeCumplimiento = true;
												$scope.despl5 = false;
											}
											if ($scope.detalles.impugnado == true) {
												$scope.hdecumpli = true;
												$scope.despl5 = false;
											}
											$("#FechaSegMen").val('');
											
											$scope.hdeIncidentes = false;
											$scope.despl6 = true;
											$scope.selec_inci = 0;
											$scope.tabselect = 1;
											$(paso1).addClass('active');
											$(paso2).removeClass('active');
											$(paso3).removeClass('active');
											$(paso4).removeClass('active');
											$(paso5).removeClass('active');
											$(paso6).removeClass('active');
											$(paso7).removeClass('active');
											setTimeout(function () { $scope.$apply(); }, 500);
										} else {
											swal('Error', response.data.observacion_err, 'warning')
										}
									});
								} else {
									swal('Error', response.data.observacion_err, 'warning')
								}
							});
					}
				})
			}
		}

		$scope.registrafechafalloimpugnacion = function () {
			if ($("#FechaFallImp").val() == "") {
				swal('Información', 'Ingrese la fecha de radicación', 'info');
			} else if ($scope.registro.medioRecepcionFImpugnacion == true && document.getElementById("medioRecepcionFImpugnacionAdjunto").files.length == 0) {
				swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
			} else {
				swal({
					title: 'Confirmar',
					text: "¿Desea guardar los campos de fallo de impugnación?",
					type: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Continuar',
					cancelButtonText: 'Cancelar'
				}).then((result) => {
					if (result) {
						$scope.btn.GuardaRegistro = true;
						$http({
							method: 'POST',
							url: "php/upload_file/upload.php",
							data: {
								db: 'FLI01',
								path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
								constutela: $scope.registro.codigotutela,
								type: $scope.archivofalloimpugext,
								file: $scope.archivofalloimpug,
								fecha_fechafallimp: $("#FechaFallImp").val(),
								falloimpugnacionfc: $scope.detalles.falloimpugnacionfc,
								typefile: '6',
								ori: true
							}
						}).then(function (response) {
							if (response.data.codigo == "1") {
									// REGISTRA MEDIO RECEPCION FALLO IMPUGNACION ADJUNTO CNVU 13/12/2019
									$http({
										method: 'POST',
										url: "php/upload_file/upload.php",
										data: {
											db: 'GMREC',
											path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
											constutela: $scope.registro.codigotutela,
											type: $scope.registro.medioRecepcionFImpugnacion == false ? "" : $scope.archivoFImpugnacionext,
											file: $scope.registro.medioRecepcionFImpugnacion == false ? "" : $scope.archivoFImpugnacion,
											fecha_reqpre: $("#FechaFallImp").val(),
											typefile: '32',
											medio: ($scope.registro.medioRecepcionFImpugnacion == true) ? true : false,
											ori: ($scope.registro.medioRecepcionFImpugnacion == true) ? true : false
										}
									}).then(function (response) {
										$scope.btn.GuardaRegistro = false;
										if (response.data.codigo == "1") {
											$scope.CargaTabsEtapas(6);
											swal('Completado', response.data.observacion_err, 'success');
										} else {
											swal('Error', response.data.observacion_err, 'warning')
										}
									});
								} else {
									swal('Error', response.data.observacion_err, 'warning')
								}
							});
					}
				})
			}
		}

		$scope.registrarequerimientopre = function () {
			if ($("#FechaReqPre").val() == "") {
				swal('Información', 'Ingrese la fecha de radicación', 'info');
			} else if ($scope.registro.medioRecepcionRqPrevio == true && document.getElementById("medioRecepcionRqPrevioAdjunto").files.length == 0) {
				swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
			} else {
				swal({
					title: 'Confirmar',
					text: "¿Desea guardar los campos de requerimiento previo?",
					type: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Continuar',
					cancelButtonText: 'Cancelar'
				}).then((result) => {
					if (result) {
						$scope.btn.GuardaRegistro = true;
						$http({
							method: 'POST',
							url: "php/upload_file/upload.php",
							data: {
								db: 'RP01',
								path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
								constutela: $scope.registro.codigotutela,
								type: $scope.archivorequerimientopreext,
								file: $scope.archivorequerimientopre,
								fecha_reqpre: $("#FechaReqPre").val(),
								typefile: '7',
								ori: true
							}
						}).then(function (response) {
							if (response.data.codigo == "1") {
									// REGISTRA MEDIO RECEPCION RQ ADJUNTO CNVU 13/12/2019
									$http({
										method: 'POST',
										url: "php/upload_file/upload.php",
										data: {
											db: 'GMREC',
											path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
											constutela: $scope.registro.codigotutela,
											type: $scope.registro.medioRecepcionRqPrevio == false ? "" : $scope.archivoRqPrevioext,
											file: $scope.registro.medioRecepcionRqPrevio == false ? "" : $scope.archivoRqPrevio,
											fecha_reqpre: $("#FechaReqPre").val(),
											typefile: '33',
											medio: ($scope.registro.medioRecepcionRqPrevio == true) ? true : false,
											ori: ($scope.registro.medioRecepcionRqPrevio == true) ? true : false
										}
									}).then(function (response) {
										$scope.btn.GuardaRegistro = false;
										if (response.data.codigo == "1") {
											swal('Completado', response.data.observacion_err, 'success');
											//
											$scope.hdeVBrespuestatutela = true;
											$scope.hdeDetallesAccion = false;
											$scope.dsbDetalles = true;
											$scope.despl3 = false;
											$scope.hdeDetallesAccionSeg = true;
											$scope.dsbDetallesSegInst = true;
											/////
											$scope.hdeImpugnacion = false;
											$scope.dsbImpugnacion = true;
											$scope.despl4 = false;

											$scope.hdeCumplimiento = false;
											$scope.hdecumpli = false;// Cumplimiento Mensual
											//
											$scope.despl5 = true;
											if ($scope.registro.status = "5") {
												$scope.hdefallo = true;
											} else {
												$scope.hdefallo = false;
												// Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
											}
											//
											$scope.archivorequepre = '';
											$("#FechaReqPre").val('');
											// SET VALORES VACIOS RQ INC CNVU 13/12/2019
											$scope.registro.medioRecepcionRqPrevio = false;
											$scope.changeMedida("8");
											// $("#dteMedioRecepcionRqPrevio").val('');
											$scope.Medioarchivorequepre = '';
											//
											$scope.hdeIncidentes = false;
											$scope.despl6 = true;
											$scope.selec_inci = $scope.tabselect;
											$scope.tabselect = parseInt($scope.tabselect) + 1;
											$scope.vertab($scope.tabselect);
											$scope.csstab($scope.tabselect);
											//
											setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1000); }, 500);
										} else {
											swal('Error', response.data.observacion_err, 'warning')
										}
									});
								} else {
									swal('Error', response.data.observacion_err, 'warning')
								}
							});
					}
				})
			}
		}

		$scope.registrarequerimientopreres = function () {
			if ($("#FechaReqPreRes").val() == "") {
				swal('Información', 'Ingrese la fecha de radicación', 'info');
			} else if ($scope.registro.medioRecepcionRespuestaRq == true && document.getElementById("medioRecepcionRespuestaRqAdjunto").files.length == 0) {
				swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
			} else {
				swal({
					title: 'Confirmar',
					text: "¿Desea guardar los campos de respuesta de requerimiento previo?",
					type: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Continuar',
					cancelButtonText: 'Cancelar'
				}).then((result) => {
					if (result) {
						$scope.btn.GuardaRegistro = true;
						$http({
							method: 'POST',
							url: "php/upload_file/upload.php",
							data: {
								db: 'RPR01',
								path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
								constutela: $scope.registro.codigotutela,
								type: $scope.archivorequerimientopreresext,
								file: $scope.archivorequerimientopreres,
								fecha_reqpreres: $("#FechaReqPreRes").val(),
								typefile: '8',
								ori: true
							}
						}).then(function (response) {
							if (response.data.codigo == "1") {
									// REGISTRA MEDIO RECEPCION RESPUESTA RQ ADJUNTO CNVU 13/12/2019
									$http({
										method: 'POST',
										url: "php/upload_file/upload.php",
										data: {
											db: 'GMREC',
											path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
											constutela: $scope.registro.codigotutela,
											type: $scope.registro.medioRecepcionRespuestaRq == false ? "" : $scope.archivoRespuestaRqext,
											file: $scope.registro.medioRecepcionRespuestaRq == false ? "" : $scope.archivoRespuestaRq,
											fecha_reqpre: $("#FechaReqPreRes").val(),
											typefile: '34',
											medio: ($scope.registro.medioRecepcionRespuestaRq == true) ? true : false,
											ori: ($scope.registro.medioRecepcionRespuestaRq == true) ? true : false
										}
									}).then(function (response) {
										$scope.btn.GuardaRegistro = false;
										if (response.data.codigo == "1") {
											swal('Completado', response.data.observacion_err, 'success');
											//
											$scope.hdeVBrespuestatutela = true;
											$scope.hdeDetallesAccion = false;
											$scope.dsbDetalles = true;
											$scope.despl3 = false;
											$scope.hdeDetallesAccionSeg = true;
											$scope.dsbDetallesSegInst = true;
											/////
											$scope.hdeImpugnacion = false;
											$scope.dsbImpugnacion = true;
											$scope.despl4 = false;

											$scope.hdeCumplimiento = false;
											$scope.hdecumpli = false;// Cumplimiento Mensual
											//
											$scope.despl5 = true;
											if ($scope.registro.status = "5") {
												$scope.hdefallo = true;
											} else {
												$scope.hdefallo = false;
												// Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
											}
											//
											$scope.archivorequepreres = '';
											$("#FechaReqPreRes").val('');
											// SET VALORES VACIOS RESPUESTA RQ INC CNVU 13/12/2019
											$scope.registro.medioRecepcionRespuestaRq = false;
											$scope.changeMedida("9");
											// $("#dteMedioRecepcionRespuestaRq").val('');
											$scope.Medioarchivorequepreres = '';
											//
											$scope.hdeIncidentes = false;
											$scope.despl6 = true;
											//
											$scope.selec_inci = $scope.tabselect;
											$scope.tabselect = parseInt($scope.tabselect) + 1;
											$scope.vertab($scope.tabselect);
											$scope.csstab($scope.tabselect);
											//
											setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1000); $scope.$apply(); }, 500);
										} else {
											swal('Error', response.data.observacion_err, 'warning')
										}
									});
								} else {
									swal('Error', response.data.observacion_err, 'warning')
								}
							});
					}
				})
			}
		}

		$scope.registraprocesoincidente = function () {
			if ($("#FechaReqPro").val() == "") {
				swal('Información', 'Ingrese la fecha de radicación', 'info');
			} else if ($scope.registro.medioRecepcionAdmision == true && document.getElementById("medioRecepcionAdmisionAdjunto").files.length == 0) {
				swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
			} else {
				swal({
					title: 'Confirmar',
					text: "¿Desea guardar los campos de incidente de desacato?",
					type: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Continuar',
					cancelButtonText: 'Cancelar'
				}).then((result) => {
					if (result) {
						$scope.btn.GuardaRegistro = true;
						$http({
							method: 'POST',
							url: "php/upload_file/upload.php",
							data: {
								db: 'PID01',
								path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
								constutela: $scope.registro.codigotutela,
								type: $scope.archivoprocesoincidentesext,
								file: $scope.archivoprocesoincidentes,
								fecha_proincdes: $("#FechaReqPro").val(),
								typefile: '9',
								ori: true
							}
						}).then(function (response) {
							if (response.data.codigo == "1") {
									// REGISTRA MEDIO RECEPCION ADMISION INC ADJUNTO CNVU 13/12/2019
									$http({
										method: 'POST',
										url: "php/upload_file/upload.php",
										data: {
											db: 'GMREC',
											path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
											constutela: $scope.registro.codigotutela,
											type: $scope.registro.medioRecepcionAdmision == false ? "" : $scope.archivoAdmisionext,
											file: $scope.registro.medioRecepcionAdmision == false ? "" : $scope.archivoAdmision,
											fecha_reqpre: $("#FechaReqPro").val(),
											typefile: '35',
											medio: ($scope.registro.medioRecepcionAdmision == true) ? true : false,
											ori: ($scope.registro.medioRecepcionAdmision == true) ? true : false
										}
									}).then(function (response) {
										$scope.btn.GuardaRegistro = false;
										if (response.data.codigo == "1") {
											swal('Completado', response.data.observacion_err, 'success');
											//
											$scope.hdeVBrespuestatutela = true;
											$scope.hdeDetallesAccion = false;
											$scope.dsbDetalles = true;
											$scope.despl3 = false;
											$scope.hdeDetallesAccionSeg = true;
											$scope.dsbDetallesSegInst = true;
											/////
											$scope.hdeImpugnacion = false;
											$scope.dsbImpugnacion = true;
											$scope.despl4 = false;

											$scope.hdeCumplimiento = false;
											$scope.hdecumpli = false;// Cumplimiento Mensual
											//
											$scope.despl5 = true;
											if ($scope.registro.status = "5") {
												$scope.hdefallo = true;
											} else {
												$scope.hdefallo = false;
												// Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
											}
											//
											$scope.archivoproincdes = '';
											$("#FechaReqPro").val('');
											// SET VALORES VACIOS ADMISION INC CNVU 13/12/2019
											$scope.registro.medioRecepcionAdmision = false;
											$scope.changeMedida("10");
											// $("#dteMedioRecepcionAdmision").val('');
											$scope.Medioarchivoproincdes = '';
											//
											$scope.hdeIncidentes = false;
											$scope.despl6 = true;
											//
											$scope.selec_inci = $scope.tabselect;
											$scope.tabselect = parseInt($scope.tabselect) + 1;
											$scope.vertab($scope.tabselect);
											$scope.csstab($scope.tabselect);
											//
											setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1000); }, 500);
										} else {
											swal('Error', response.data.observacion_err, 'warning')
										}
									});
								} else {
									swal('Error', response.data.observacion_err, 'warning')
								}
							});
					}
				})
			}
		}

		$scope.registraprocesoincidenteres = function () {
			if ($("#FechaReqProRes").val() == "") {
				swal('Información', 'Ingrese la fecha de radicación', 'info');
			} else if ($scope.registro.medioRecepcionRespuestaInc == true && document.getElementById("medioRecepcionRespuestaIncAdjunto").files.length == 0) {
				swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
			} else {
				swal({
					title: 'Confirmar',
					text: "¿Desea guardar los campos de respuesta de incidente de desacato?",
					type: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Continuar',
					cancelButtonText: 'Cancelar'
				}).then((result) => {
					if (result) {
						$scope.btn.GuardaRegistro = true;
						$http({
							method: 'POST',
							url: "php/upload_file/upload.php",
							data: {
								db: 'PID02',
								path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
								constutela: $scope.registro.codigotutela,
								type: $scope.archivoprocesoincidentesresext,
								file: $scope.archivoprocesoincidentesres,
								fecha_proincdesres: $("#FechaReqProRes").val(),
								typefile: '10',
								ori: true
							}
						}).then(function (response) {
							if (response.data.codigo == "1") {
									// REGISTRA MEDIO RECEPCION RESPUESTA ADMISION INC ADJUNTO CNVU 13/12/2019
									$http({
										method: 'POST',
										url: "php/upload_file/upload.php",
										data: {
											db: 'GMREC',
											path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
											constutela: $scope.registro.codigotutela,
											type: $scope.registro.medioRecepcionRespuestaInc == false ? "" : $scope.archivoRespuestaIncext,
											file: $scope.registro.medioRecepcionRespuestaInc == false ? "" : $scope.archivoRespuestaInc,
											fecha_reqpre: $("#FechaReqProRes").val(),
											typefile: '36',
											medio: ($scope.registro.medioRecepcionRespuestaInc == true) ? true : false,
											ori: ($scope.registro.medioRecepcionRespuestaInc == true) ? true : false
										}
									}).then(function (response) {
										$scope.btn.GuardaRegistro = false;
										if (response.data.codigo == "1") {
											swal('Completado', response.data.observacion_err, 'success');
											//
											$scope.hdeVBrespuestatutela = true;
											$scope.hdeDetallesAccion = false;
											$scope.dsbDetalles = true;
											$scope.despl3 = false;
											$scope.hdeDetallesAccionSeg = true;
											$scope.dsbDetallesSegInst = true;
											/////
											$scope.hdeImpugnacion = false;
											$scope.dsbImpugnacion = true;
											$scope.despl4 = false;

											$scope.hdeCumplimiento = false;
											$scope.hdecumpli = false;// Cumplimiento Mensual
											//
											$scope.despl5 = true;
											if ($scope.registro.status = "5") {
												$scope.hdefallo = true;
											} else {
												$scope.hdefallo = false;
												// Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
											}
											//
											$scope.archivoproincdesres = '';
											$("#FechaReqPro").val('');
											// SET VALORES VACIOS RESPUESTA ADMISION INC CNVU 13/12/2019
											$scope.registro.medioRecepcionRespuestaInc = false;
											$scope.changeMedida("11");
											// $("#dteMedioRecepcionRespuestaInc").val('');
											$scope.Medioarchivoproincdesres = '';
											//
											$scope.hdeIncidentes = false;
											$scope.despl6 = true;
											//
											$scope.selec_inci = $scope.tabselect;
											$scope.tabselect = parseInt($scope.tabselect) + 1;
											$scope.vertab($scope.tabselect);
											$scope.csstab($scope.tabselect);
											//
											setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1000); }, 500);
										} else {
											swal('Error', response.data.observacion_err, 'warning')
										}
									});
								} else {
									swal('Error', response.data.observacion_err, 'warning')
								}
							});
					}
				})
			}
		}

		$scope.registrafalloincidente = function () {
			if ($("#FechaFalInc").val() == "") {
				swal('Información', 'Ingrese la fecha de radicación', 'info');
			} else if ($scope.registro.medioRecepcionDecisionInc == true && document.getElementById("medioRecepcionDecisionIncAdjunto").files.length == 0) {
				swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
			} else {
				swal({
					title: 'Confirmar',
					text: "¿Desea guardar los campos de fallo de incidente de desacato?",
					type: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Continuar',
					cancelButtonText: 'Cancelar'
				}).then((result) => {
					if (result) {
						$scope.btn.GuardaRegistro = true;
						$http({
							method: 'POST',
							url: "php/upload_file/upload.php",
							data: {
								db: 'PID03',
								path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
								constutela: $scope.registro.codigotutela,
								type: $scope.archivofalincdesext,
								file: $scope.archivofalincdes,
								fecha_fallincdes: $("#FechaFalInc").val(),
								typefile: '11',
								ori: true
							}
						}).then(function (response) {
							if (response.data.codigo == "1") {
									// REGISTRA MEDIO RECEPCION DECISION INC ADJUNTO CNVU 13/12/2019
									$http({
										method: 'POST',
										url: "php/upload_file/upload.php",
										data: {
											db: 'GMREC',
											path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
											constutela: $scope.registro.codigotutela,
											type: $scope.registro.medioRecepcionDecisionInc == false ? "" : $scope.archivoDecisionIncext,
											file: $scope.registro.medioRecepcionDecisionInc == false ? "" : $scope.archivoDecisionInc,
											fecha_reqpre: $("#FechaFalInc").val(),
											typefile: '37',
											medio: ($scope.registro.medioRecepcionDecisionInc == true) ? true : false,
											ori: ($scope.registro.medioRecepcionDecisionInc == true) ? true : false
										}
									}).then(function (response) {
										$scope.btn.GuardaRegistro = false;
										if (response.data.codigo == "1") {
											swal('Completado', response.data.observacion_err, 'success');
											//
											$scope.hdeVBrespuestatutela = true;
											$scope.hdeDetallesAccion = false;
											$scope.dsbDetalles = true;
											$scope.despl3 = false;
											$scope.hdeDetallesAccionSeg = true;
											$scope.dsbDetallesSegInst = true;
											/////
											$scope.hdeImpugnacion = false;
											$scope.dsbImpugnacion = true;
											$scope.despl4 = false;

											$scope.hdeCumplimiento = false;
											$scope.hdecumpli = false;// Cumplimiento Mensual
											//
											$scope.despl5 = true;
											if ($scope.registro.status = "5") {
												$scope.hdefallo = true;
											} else {
												$scope.hdefallo = false;
												// Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
											}
											//
											$scope.archivofallincdes = '';
											$("#FechaFalInc").val('');
											// SET VALORES VACIOS DECISION INC CNVU 13/12/2019
											$scope.registro.medioRecepcionDecisionInc = false;
											$scope.changeMedida("12");
											// $("#dteMedioRecepcionDecisionInc").val('');
											$scope.Medioarchivofallincdes = '';
											//
											$scope.hdeIncidentes = false;
											$scope.despl6 = true;
											//
											$scope.selec_inci = $scope.tabselect;
											$scope.tabselect = parseInt($scope.tabselect) + 1;
											$scope.vertab($scope.tabselect);
											$scope.csstab($scope.tabselect);
											//
											setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1000); }, 500);
										} else {
											swal('Error', response.data.observacion_err, 'warning')
										}
									});
								} else {
									swal('Error', response.data.observacion_err, 'warning')
								}
							});
					}
				})
			}
		}

		$scope.registraconsultaincidente = function () {
			if ($("#FechaConInc").val() == "") {
				swal('Información', 'Ingrese la fecha de radicación', 'info');
			} else if ($scope.registro.medioRecepcionConsultaInc == true && document.getElementById("medioRecepcionConsultaIncAdjunto").files.length == 0) {
				swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
			} else {
				swal({
					title: 'Confirmar',
					text: "¿Desea guardar los campos de consulta de incidente de desacato?",
					type: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Continuar',
					cancelButtonText: 'Cancelar'
				}).then((result) => {
					if (result) {
						$scope.btn.GuardaRegistro = true;
						$http({
							method: 'POST',
							url: "php/upload_file/upload.php",
							data: {
								db: 'PID04',
								path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
								constutela: $scope.registro.codigotutela,
								type: $scope.archivoconincdesext,
								file: $scope.archivoconincdes,
								fecha_conincdes: $("#FechaConInc").val(),
								typefile: '12',
								ori: true
							}
						}).then(function (response) {
							if (response.data.codigo == "1") {
									// REGISTRA MEDIO RECEPCION CONSULTA INC ADJUNTO CNVU 13/12/2019
									$http({
										method: 'POST',
										url: "php/upload_file/upload.php",
										data: {
											db: 'GMREC',
											path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
											constutela: $scope.registro.codigotutela,
											type: $scope.registro.medioRecepcionConsultaInc == false ? "" : $scope.archivoConsultaIncext,
											file: $scope.registro.medioRecepcionConsultaInc == false ? "" : $scope.archivoConsultaInc,
											fecha_reqpre: $("#FechaConInc").val(),
											typefile: '38',
											medio: ($scope.registro.medioRecepcionConsultaInc == true) ? true : false,
											ori: ($scope.registro.medioRecepcionConsultaInc == true) ? true : false
										}
									}).then(function (response) {
										$scope.btn.GuardaRegistro = false;
										if (response.data.codigo == "1") {
											swal('Completado', response.data.observacion_err, 'success');
											//
											$scope.hdeVBrespuestatutela = true;
											$scope.hdeDetallesAccion = false;
											$scope.dsbDetalles = true;
											$scope.despl3 = false;
											$scope.hdeDetallesAccionSeg = true;
											$scope.dsbDetallesSegInst = true;
											/////
											$scope.hdeImpugnacion = false;
											$scope.dsbImpugnacion = true;
											$scope.despl4 = false;

											$scope.hdeCumplimiento = false;
											$scope.hdecumpli = false;// Cumplimiento Mensual
											//
											$scope.despl5 = true;
											if ($scope.registro.status = "5") {
												$scope.hdefallo = true;
											} else {
												$scope.hdefallo = false;
												// Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
											}
											//
											$scope.archivoconincdes = '';
											$("#FechaConInc").val('');
											// SET VALORES VACIOS CONSULTA INC CNVU 13/12/2019
											$scope.registro.medioRecepcionConsultaInc = false;
											$scope.changeMedida("13");
											// $("#dteMedioRecepcionConsultaInc").val('');
											$scope.Medioarchivoconincdes = '';
											//
											$scope.hdeIncidentes = false;
											$scope.despl6 = true;
											//
											$scope.selec_inci = $scope.tabselect;
											$scope.tabselect = parseInt($scope.tabselect) + 1;
											$scope.vertab($scope.tabselect);
											$scope.csstab($scope.tabselect);
											//
											setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1000); }, 500);
										} else {
											swal('Error', response.data.observacion_err, 'warning')
										}
									});
								} else {
									swal('Error', response.data.observacion_err, 'warning')
								}
							});
					}
				})
			}
		}

		$scope.registracierreincidente = function () {
			if ($("#FechaAutInc").val() == "") {
				swal('Información', 'Ingrese la fecha de radicación', 'info');
			} else if ($scope.registro.medioRecepcionCierreInc == true && document.getElementById("medioRecepcionCierreIncAdjunto").files.length == 0) {
				swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
			} else {
				swal({
					title: 'Confirmar',
					text: "¿Desea guardar los campos de cierre de incidente de desacato?",
					type: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Continuar',
					cancelButtonText: 'Cancelar'
				}).then((result) => {
					if (result) {
						$scope.btn.GuardaRegistro = true;
						$http({
							method: 'POST',
							url: "php/upload_file/upload.php",
							data: {
								db: 'PID05',
								path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
								constutela: $scope.registro.codigotutela,
								type: $scope.archivocieincdesext,
								file: $scope.archivocieincdes,
								fecha_cieincdes: $("#FechaAutInc").val(),
								typefile: '13',
								ori: true
							}
						}).then(function (response) {
							if (response.data.codigo == "1") {
									// REGISTRA MEDIO RECEPCION CIERRE INC ADJUNTO CNVU 13/12/2019
									$http({
										method: 'POST',
										url: "php/upload_file/upload.php",
										data: {
											db: 'GMREC',
											path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
											constutela: $scope.registro.codigotutela,
											type: $scope.registro.medioRecepcionCierreInc == false ? "" : $scope.archivoCierreIncext,
											file: $scope.registro.medioRecepcionCierreInc == false ? "" : $scope.archivoCierreInc,
											fecha_reqpre: $("#FechaAutInc").val(),
											typefile: '39',
											medio: ($scope.registro.medioRecepcionCierreInc == true) ? true : false,
											ori: ($scope.registro.medioRecepcionCierreInc == true) ? true : false
										}
									}).then(function (response) {
										$scope.btn.GuardaRegistro = false;
										if (response.data.codigo == "1") {
											swal('Completado', response.data.observacion_err, 'success');
											//
											$scope.hdeVBrespuestatutela = true;
											$scope.hdeDetallesAccion = false;
											$scope.dsbDetalles = true;
											$scope.despl3 = false;
											$scope.hdeDetallesAccionSeg = true;
											$scope.dsbDetallesSegInst = true;
											/////
											$scope.hdeImpugnacion = false;
											$scope.dsbImpugnacion = true;
											$scope.despl4 = false;

											$scope.hdeCumplimiento = false;
											$scope.hdecumpli = false;// Cumplimiento Mensual
											//
											$scope.despl5 = true;
											if ($scope.registro.status = "5") {
												$scope.hdefallo = true;
											} else {
												$scope.hdefallo = false;
												// Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
											}
											//
											$scope.archivocieincdes = '';
											$("#FechaAutInc").val('');
											// SET VALORES VACIOS CIERRE INC CNVU 13/12/2019
											$scope.registro.medioRecepcionCierreInc = false;
											$scope.changeMedida("14");
											// $("#dteMedioRecepcionCierreInc").val('');
											$scope.Medioarchivocieincdes = '';
											//
											$scope.hdeIncidentes = false;
											$scope.despl6 = true;
											//
											$scope.selec_inci = 0;
											$scope.tabselect = 1;
											$scope.vertab($scope.tabselect);
											$scope.csstab($scope.tabselect);
											$scope.registro.desacato = parseInt($scope.registro.desacato) + 1;
											//
											setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1000); }, 500);
										} else {
											swal('Error', response.data.observacion_err, 'warning')
										}
									});
								} else {
									swal('Error', response.data.observacion_err, 'warning')
								}
							});
					}
				})
			}
		}




		$scope.vertab = function (value) {
				// if (value < (parseInt($scope.selec_inci) + 1)) {
				// } else {
					if (isNaN(value)) {
						value = 1;
					}
					$scope.tabselect = value;
					$('.steps').removeClass('active');
					for (let i = 1; i <= value; i++) {
						$("#paso" + i).addClass('active');
					}
				//for (var i = (parseInt($scope.selec_inci) + 1); i <= 7; i++) {
					// $("#paso" + (parseInt(i) + 1)).css('cursor', 'pointer');
				//}
				// }
			}
			$scope.csstab = function (value) {
				// $('.steps').css('cursor', 'not-allowed');
				$('.steps').removeClass('pulsate');
				for (var i = value; i <= 7; i++) {
					if (i == value) {
						$("#paso" + i).addClass('pulsate');
					}
					// $("#paso" + i).css('cursor', 'pointer');
				}
			}

			//VALIDACION PLAZO INFERIOR A 0 CNVU 02/12/2019
			$scope.formatNumberFalloAc = function () {
				if ($scope.registro.plazofalloac != "" || $scope.registro.plazofalloac != undefined || $scope.registro.plazofalloac != null) {
					$scope.registro.plazofalloac = $scope.registro.plazofalloac.replace(/[^0-9]+$/, '');
				}
			}

			//VALIDACION PLAZO INFERIOR A 0 CNVU 02/12/2019
			$scope.formatNumberFallo = function () {
				if ($scope.detalles.plazofallo != "" || $scope.detalles.plazofallo != undefined || $scope.detalles.plazofallo != null) {
					$scope.detalles.plazofallo = $scope.detalles.plazofallo.replace(/[^0-9]+$/, '');
				}
			}

			//FUNCION PARA VALIDAR CAMPO FECHA CNVU
			$scope.validaFechas = function (id, texto) {
				if ($("#dteFechaRecepcion").val() != "" || $("#dteFechaRecepcion").val() != null || $("#dteFechaRecepcion").val() != undefined) {
					if ($scope.Validar_Fecha($("#dteFechaRecepcion").val()) == 'si') {
						var fecha_id = $("#" + id).val().split("/");
						var fecha_tutelacreacion = $scope.registro.f_recepcion.split("/");
						
						var newdateftutela = new Date(fecha_tutelacreacion[2], (fecha_tutelacreacion[1] - 1), fecha_tutelacreacion[0]);
						var timeftutela = newdateftutela.getTime();
						
						var newdateinput = new Date(fecha_id[2], (fecha_id[1] - 1), fecha_id[0]);
						var timeinput = newdateinput.getTime();
						
						var fecha_actual = new Date();
						var time_actual = fecha_actual.getTime();
						if (id == 'dteFechaRecepcionRespuesta' || id == 'FechaReqPreRes' || id == 'FechaReqProRes') {
							if (timeinput < timeftutela) {
								swal({
									title: '¡Información!',
									text: 'La fecha de radicación de ' + texto + ' de Tutela no puede ser menor a la fecha de la Tutela.',
									type: 'info',
									confirmButtonText: 'Cerrar',
									confirmButtonColor: '#174791'
								});
								$scope.btn.GuardaRegistro = false;
							} else if (timeinput > time_actual) {
								swal({
									title: '¡Información!',
									text: 'La fecha de radicación de ' + texto + ' de Tutela no puede ser mayor a la fecha de hoy.',
									type: 'info',
									confirmButtonText: 'Cerrar',
									confirmButtonColor: '#174791'
								});
								$scope.btn.GuardaRegistro = false;
							}
						}else{
							if (timeinput <= timeftutela) {
								swal({
									title: '¡Información!',
									text: 'La fecha de radicación de ' + texto + ' de Tutela no puede ser menor o igual a la fecha de la Tutela.',
									type: 'info',
									confirmButtonText: 'Cerrar',
									confirmButtonColor: '#174791'
								});
								$scope.btn.GuardaRegistro = false;
							} else if (timeinput > time_actual) {
								swal({
									title: '¡Información!',
									text: 'La fecha de radicación de ' + texto + ' de Tutela no puede ser mayor a la fecha de hoy.',
									type: 'info',
									confirmButtonText: 'Cerrar',
									confirmButtonColor: '#174791'
								});
								$scope.btn.GuardaRegistro = false;
							}
						}				
					}
				}
			};

			$("#dteFechaRecepcionRespuesta").kendoDatePicker({
				format: "dd/MM/yyyy",
				culture: "es-MX",
				disableDates: ["su", "sa"],
				max: new Date(),
			});
			$("#dteMedioRecepcionImpugnacion").kendoDatePicker({
				format: "dd/MM/yyyy",
				culture: "es-MX",
				disableDates: ["su", "sa"],
				max: new Date(),
			});
			$("#FechaSegMen").kendoDatePicker({
				format: "dd/MM/yyyy",
				culture: "es-MX",
				disableDates: ["su", "sa"],
				max: new Date(),
			});
			$("#FechaFallImp").kendoDatePicker({
				format: "dd/MM/yyyy",
				culture: "es-MX",
				disableDates: ["su", "sa"],
				max: new Date(),
			});
			$("#FechaRad").kendoDatePicker({
				format: "dd/MM/yyyy",
				culture: "es-MX",
				disableDates: ["su", "sa"],
				max: new Date(),
			});
			$("#FechaReqPre").kendoDatePicker({
				format: "dd/MM/yyyy",
				culture: "es-MX",
				disableDates: ["su", "sa"],
				max: new Date(),
			});
			$("#FechaReqPreRes").kendoDatePicker({
				format: "dd/MM/yyyy",
				culture: "es-MX",
				disableDates: ["su", "sa"],
				max: new Date(),
			});
			$("#FechaReqPro").kendoDatePicker({
				format: "dd/MM/yyyy",
				culture: "es-MX",
				disableDates: ["su", "sa"],
				max: new Date(),
			});
			$("#FechaReqProRes").kendoDatePicker({
				format: "dd/MM/yyyy",
				culture: "es-MX",
				disableDates: ["su", "sa"],
				max: new Date(),
			});
			$("#FechaFalInc").kendoDatePicker({
				format: "dd/MM/yyyy",
				culture: "es-MX",
				disableDates: ["su", "sa"],
				max: new Date(),
			});
			$("#FechaConInc").kendoDatePicker({
				format: "dd/MM/yyyy",
				culture: "es-MX",
				disableDates: ["su", "sa"],
				max: new Date(),
			});
			$("#FechaAutInc").kendoDatePicker({
				format: "dd/MM/yyyy",
				culture: "es-MX",
				disableDates: ["su", "sa"],
				max: new Date(),
			});

			$("#dteFechaRecepcionRespuesta").kendoDatePicker({
				format: "dd/MM/yyyy",
				culture: "es-MX",
				disableDates: ["su", "sa"],
				max: new Date(),
			});

			$scope.openPanelAdjuntos = function () {
				ngDialog.open({
					template: 'views/juridica/modal/modalAdjuntos.html',
					className: 'ngdialog-theme-plain',
					controller: 'paneladjuntosctrl',
					scope: $scope
				});
			}
			$scope.openPanelVb = function () {
				ngDialog.open({
					template: 'views/juridica/modal/modalVistoBueno.html',
					className: 'ngdialog-theme-plain',
					controller: 'panelvbctrl',
					height: '90%',
					showClose: false,
					scope: $scope
				});
			}


			$scope.Validar_Fecha = function (v_fecha) {
				var expreg = new RegExp("^(([0]{1}[1-9]{1})|([1-2]{1}[0-9]{1})|([3]{1}[0-1]{1}))\/(([0]{1}[1-9]{1})|([1]{1}[0-2]{1}))\/([1-2]{1}[0-9]{3})$");
				if (expreg.test(v_fecha)) {
					return 'si'
				} else {
					return 'no'
				}

			}

			$scope.Limpiar_Inputs_Files = function () {
				// Respuesta de Tutela
				$("#admisiontutela")[0].value = "";
				$("#medioRecepcionAdmisionTutAdjunto")[0].value = "";

				// Respuesta de Tutela
				$("#recibidorespuestatutela")[0].value = "";
				$("#medioRecepcionRespuestaAdjunto")[0].value = "";

				//Detalles de Acción de Tutela
				$("#fallotutela")[0].value = "";
				$("#medioRecepcionFalloAdjunto")[0].value = "";

				// Acción de Tutela - Segunda Instancia
				$("#filefallotutelainstdos")[0].value = "";
				$("#medioRecepcionSegundaAdjunto")[0].value = "";

				// Impugnación de Tutela
				$("#archivoimpugnacion")[0].value = "";
				$("#medioRecepcionImpugnacionAdjunto")[0].value = "";

				// Cumplimiento
				$("#archivocumplimensual")[0].value = "";
				$("#medioRecepcionCumplimientoAdjunto")[0].value = "";

				// Fallo de Impugnación
				$("#falloimpugnacion")[0].value = "";
				$("#medioRecepcionFImpugnacionAdjunto")[0].value = "";

				// Requerimiento Previo
				$("#archivofechareqpre")[0].value = "";
				$("#medioRecepcionRqPrevioAdjunto")[0].value = "";

				// Respuesta de Requerimiento Previo
				$("#archivofechareqpreres")[0].value = "";
				$("#medioRecepcionRespuestaRqAdjunto")[0].value = "";

				// Admisión de Incidente de Desacato
				$("#archivofechreqpro")[0].value = "";
				$("#medioRecepcionAdmisionAdjunto")[0].value = "";

				// Respuesta de Incidente de Desacato
				$("#archivofechreqprores")[0].value = "";
				$("#medioRecepcionRespuestaIncAdjunto")[0].value = "";

				// Decisión de Incidente de Desacato
				$("#archivofalinc")[0].value = "";
				$("#medioRecepcionDecisionIncAdjunto")[0].value = "";

				// Consulta de Incidente
				$("#archivofechaconinc")[0].value = "";
				$("#medioRecepcionConsultaIncAdjunto")[0].value = "";

				// Cierre de Incidente
				$("#archivofechaautinc")[0].value = "";
				$("#medioRecepcionCierreIncAdjunto")[0].value = "";

				$("#idarchivoEstadoTutela")[0].value = "";
        		$("#medioEstadoTutelaAdjunto")[0].value = "";

				// Limpiar linea verde
				angular.forEach(document.querySelectorAll('.file-path'), function (i) {
					if (i.classList.contains('valid') == true) {
						i.classList.remove("valid");
						i.value = "";
					}
					// i.setAttribute("readonly", true);
				});


			}

			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			$scope.nohe = function () {
				$('#resultTutelas_filter input').val('NOHEMI').trigger('keyup');
			}

			$scope.CargaTabsEtapas = function (etapa) {
				if (etapa == 3) {// Respuesta de Tutela
					$scope.hdeVBrespuestatutela = true;
					$scope.despl2 = false;
					//
					$scope.hdeDetallesAccion = false;
					$scope.dsbDetalles = false;
					$scope.despl3 = true;
					//Ocultar Etapas
					$scope.hdeDetallesAccionSeg = true;
					$scope.hdeImpugnacion = true;
					$scope.hdeCumplimiento = true;
					$scope.hdeIncidentes = true;
					//
					$scope.DesactivarBotonesAdjuntar();//Quitar botones
					// Activar boton ETAPA=2 de $scope.hdeAdjuntarFallo = false;
					$('#frmArchivoRespuestaTutela')[0].reset();
					setTimeout(function () { $scope.ActivarBotonesAdjuntar(2); }, 500);
				}

				// $scope.registraDetalles()
				if (etapa == 2) {// Detalles de Acción de Tutela
					$scope.hdeVBrespuestatutela = true;
					//
					$scope.hdeDetallesAccion = false;
					$scope.dsbDetalles = true;
					$scope.despl3 = false;
					//	//Ocultar Etapas
					$scope.hdeImpugnacion = true;
					$scope.hdeCumplimiento = true;
					$scope.hdeIncidentes = true;
					//
					$scope.DesactivarBotonesAdjuntar();//Quitar botones
					$scope.archivodetalletut = '';
					//DSB CAMPO FECHA FALLO CNVU 02/12/2019
					$("#dteFechaFallo+span").css({ "pointer-events": "none", "opacity": ".2" });
					if ($scope.detalles.fallotutela == true) {
						setTimeout(function () { $(document).scrollTop($('#panelListado7').height() + 400); $scope.$apply(); }, 500);
						// $scope.despl1 = false;
						// $scope.despl2 = false;
						$scope.despl7 = true;
						$scope.hdeDetallesAccionSeg = false;
						$scope.dsbDetallesSegInst = false;
						// Activar boton ETAPA=14 de $scope.hdeAdjuntarFalloSegInst = false;
						setTimeout(function () { $scope.ActivarBotonesAdjuntar(14); }, 500);
					} else {
						$scope.hdeImpugnacion = false;
						$scope.dsbImpugnacion = false;
						$scope.despl4 = true;
						$scope.hdeDetallesAccionSeg = true;
						$scope.dsbDetallesSegInst = true;
						// Activar boton ETAPA=4 de $scope.hdeAdjuntarImpugnacion = false;
						setTimeout(function () { $(document).scrollTop($('#panelListado4').height() + 400); $scope.$apply(); }, 500);
						setTimeout(function () { $scope.ActivarBotonesAdjuntar(4); }, 500);
					}
				}



				// $scope.registraDetallesInstDos()
				if (etapa == 14) {// Acción de Tutela - Segunda Instancia
					$scope.hdeVBrespuestatutela = true;
					$scope.hdeDetallesAccion = false;
					$scope.dsbDetalles = true;
					$scope.despl3 = false;
					$scope.hdeDetallesAccionSeg = true;
					$scope.dsbDetallesSegInst = true;
					$scope.filefallotutelainstdos = '';
					$scope.dsbDetallesSegInst = true;
					$scope.hdeImpugnacion = false;
					$scope.dsbImpugnacion = false;
					$scope.despl4 = true;
					$scope.hdeCumplimiento = true;
					$scope.hdeIncidentes = true;
					//
					$scope.DesactivarBotonesAdjuntar();
					// Activar boton ETAPA=4 de $scope.hdeAdjuntarImpugnacion = false;
					setTimeout(function () { $(document).scrollTop($('#panelListado7').height() + 700); $scope.$apply(); }, 800);
					setTimeout(function () { $scope.ActivarBotonesAdjuntar(4); }, 500);
				}



				// $scope.registraImpugnacion()
				if (etapa == 4) {// Impugnación de Tutela
					$scope.hdeVBrespuestatutela = true;
					$scope.hdeDetallesAccion = false;
					$scope.dsbDetalles = true;
					$scope.despl3 = false;
					$scope.hdeDetallesAccionSeg = true;
					$scope.dsbDetallesSegInst = true;
					/////
					$scope.hdeImpugnacion = false;
					$scope.dsbImpugnacion = true;
					$scope.despl4 = false;

					$scope.hdeCumplimiento = false;
					$scope.hdecumpli = false;// Cumplimiento Mensual
					//
					$scope.despl5 = true;
					$scope.DesactivarBotonesAdjuntar();
					if ($scope.detalles.impugnado == false) {
						$scope.hdefallo = true;
					} else {
						$scope.hdefallo = false;
						// Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
					}
					//
					$scope.hdeIncidentes = false;
					$scope.despl6 = true;
					$scope.selec_inci = 0;
					$scope.tabselect = 1;
					$(paso1).addClass('active');
					$(paso2).removeClass('active');
					$(paso3).removeClass('active');
					$(paso4).removeClass('active');
					$(paso5).removeClass('active');
					$(paso6).removeClass('active');
					$(paso7).removeClass('active');
					setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1000); $scope.$apply(); }, 500);
					setTimeout(function () { $scope.ActivarBotonesAdjuntar(6); }, 500);
				}


				// $scope.registrafechafalloimpugnacion()
				if (etapa == 6) {// Fallo de Impugnación
					$scope.hdeVBrespuestatutela = true;
					$scope.hdeDetallesAccion = false;
					$scope.dsbDetalles = true;
					$scope.despl3 = false;
					$scope.hdeDetallesAccionSeg = true;
					$scope.dsbDetallesSegInst = true;
					/////
					$scope.hdeImpugnacion = false;
					$scope.dsbImpugnacion = true;
					$scope.despl4 = false;
					/////											
					$scope.registro.status = "5";
					/////
					$scope.DesactivarBotonesAdjuntar();
					if ($scope.detalles.seguimiento == true) {
						$scope.hdeCumplimiento = false;
						$scope.hdecumpli = false;
						$scope.despl5 = true;
						$scope.hdefallo = true;
					}
					if ($scope.detalles.seguimiento == false) {
						$scope.hdeCumplimiento = true;
					}
					$("#FechaFallImp").val('');
					$scope.hdeIncidentes = false;
					$scope.despl6 = true;

					$scope.hdeIncidentes = false;
					$scope.despl6 = true;
					$scope.selec_inci = 0;
					$scope.tabselect = 1;
					$(paso1).addClass('active');
					$(paso2).removeClass('active');
					$(paso3).removeClass('active');
					$(paso4).removeClass('active');
					$(paso5).removeClass('active');
					$(paso6).removeClass('active');
					$(paso7).removeClass('active');
				}


				if (parseInt($scope.registro.anioconsecutivo) < 2018 || $scope.registro.diferenteepsAdmisionTut == true) {//-- VALIDAR TAMBIEN QUE SEAN DE OTRAS EPS
					$scope.BuscarOmitirEtapasTut();//Buscar Etapas para habilitar
				} else {
					$scope.hdebtnOmitirEtapas = false;
				}
			}

			$scope.ActivarBotonesAdjuntar = function (etapa) {
				$scope.DesactivarBotonesAdjuntar();
				$http({
					method: 'POST',
					url: "php/juridica/tutelas/functutelas.php",
					data: {
						function: 'BuscarOmitirEtapasTut',
						codigotutela: $scope.registro.codigotutela
					}
				}).then(function (response) {
					// console.log('Etapa-ActivarBotonesAdjuntar: ' + etapa)
					if (etapa == 14) {
						if ($scope.detalles.fallotutela == false) {
							etapa = 4;
						}
					}
					var Array_Response = response.data;
					Array_Response.forEach(element => {
						if (etapa == element.id) {
							if (element.exist == 0) {
								if (etapa == 3) {
									$scope.hdeAdjuntarRespuesta = false; // Boton Enviar Etapa=3
								}
								if (etapa == 2) {
									$scope.hdeAdjuntarFallo = false; // Boton Enviar Etapa=2
								}
								if (etapa == 14) {
									$scope.hdeAdjuntarFalloSegInst = false; // Boton Enviar Etapa=14
								}
								if (etapa == 4) {
									$scope.hdeAdjuntarImpugnacion = false; // Boton Enviar Etapa=4
								}
								if (etapa == 6) {
									$scope.hdeAdjuntarFalloImpugnacion = false; // Boton Enviar Etapa=6
								}
							}
							if (element.exist == 1) {
								// if (etapa == 3) {
								// 	$scope.shwBtnOmitirDetalle = true; // Boton Enviar Etapa=3
								// }
								if (etapa == 2) {
									$scope.shwBtnOmitirDetalle = true; // Boton Enviar Etapa=2
									$scope.dsbDetalles = true;
								}
								if (etapa == 14) {
									$scope.shwBtnOmitirFalloSegInst = true; // Boton Enviar Etapa=14
								}
								if (etapa == 4) {
									$scope.shwBtnOmitirImpugnacion = true; // Boton Enviar Etapa=4
									$scope.dsbImpugnacion = true;
								}
								if (etapa == 6) {
									$scope.shwBtnOmitirFalloImpugnacion = true; // Boton Enviar Etapa=6
									$scope.hdefallo = true;
								}
							}
						}
					});
				});
			}
			$scope.DesactivarBotonesAdjuntar = function () {
				$scope.hdeAdjuntarRespuesta = true; // Boton Enviar Etapa=3
				$scope.hdeAdjuntarFallo = true; // Boton Enviar Etapa=2
				$scope.hdeAdjuntarFalloSegInst = true; // Boton Enviar Etapa=14
				$scope.hdeAdjuntarImpugnacion = true; // Boton Enviar Etapa=4
				$scope.hdeAdjuntarFalloImpugnacion = true; // Boton Enviar Etapa=6
				//
				$scope.shwBtnOmitirDetalle = false; // Boton Enviar Etapa=2
				$scope.shwBtnOmitirFalloSegInst = false; // Boton Enviar Etapa=14
				$scope.shwBtnOmitirImpugnacion = false; // Boton Enviar Etapa=4
				$scope.shwBtnOmitirFalloImpugnacion = false; // Boton Enviar Etapa=6

			}
			$scope.BuscarOmitirEtapasTut = function () {
				$scope.xArray = [
				{
					id: 3,
					exist: 0,
					name: 'Respuesta de Tutela'
				},
				{
					id: 2,
					exist: 0,
					name: 'Detalles de Acción de Tutela - (Fallo de Tutela)'
				},
				{
					id: 14,
					exist: 0,
					name: 'Acción de Tutela - Segunda Instancia'
				},
				{
					id: 4,
					exist: 0,
					name: 'Impugnación de Tutela'
				},
				{
					id: 5,
					exist: 0,
					name: 'Cumplimiento'
				},
				{
					id: 6,
					exist: 0,
					name: 'Fallo de Impugnación'
				},
				{
					id: 7,
					exist: 0,
					name: 'Proceso de Incidentes'
				}
				]
				$http({
					method: 'POST',
					url: "php/juridica/tutelas/functutelas.php",
					data: {
						function: 'BuscarOmitirEtapasTut',
						codigotutela: $scope.registro.codigotutela
					}
				}).then(function (response) {
					// console.log(response.data);
					var Array_Response = response.data;
					$scope.xArray.forEach(element => {
						Array_Response.forEach(element2 => {
							if (element.id == element2.id) {
								element.exist = element2.exist;
							}
						});
					});
					// console.log($scope.xArray);
					var Encontrar_Faltantes = 0;
					$scope.xArray.forEach(element => {
						if (element.exist == 0) {
							Encontrar_Faltantes++;
						}
					});
					// console.log(Encontrar_Faltantes);
					if (Encontrar_Faltantes <= 2) {
						$scope.hdebtnOmitirEtapas = false;
					} else {
						$scope.hdebtnOmitirEtapas = true;
					}
				});
			}

			////////////////////////////////////////
			$scope.OmitirEtapasTut = function () {
				var options = {};
				$.map($scope.xArray,
					function (o) {
						if (o.exist == 0) {
							options[o.id] = o.name;
						}
					});
				// console.log(options);
				swal({
					title: 'Seleccione la etapa a Elegir',
					input: 'select',
					inputOptions: options,
					inputPlaceholder: 'Seleccionar',
					showCancelButton: true,
					allowOutsideClick: false,
					width: 'auto',
					inputValidator: function (value) {
						return new Promise(function (resolve, reject) {
							if (value !== '') {
								resolve();
							} else {
								swal.close();
							}
						})
					}
				}).then(function (result) {

					if (result) {
						$scope.DesactivarEtapasTut();

						setTimeout(function () {
							$scope.ActivarEtapaTut(result);
							$scope.$apply();
						}, 1000);
					}

				}).catch(swal.noop);
			}

			$scope.DesactivarEtapasTut = function () {
				$scope.hdeVBrespuestatutela = true;// Hoja de respuesta
				// $scope.hdeAdjuntarRespuesta = true; // Boton Enviar
				$scope.despl2 = false; // Desplegar
				///////////////////////////////////////
				$scope.dsbDetalles = true;// Hoja de Detalle de accion
				$scope.hdeDetallesAccion = true;// Hoja de Detalle de accion
				// $scope.hdeAdjuntarFallo = true; // Boton Enviar
				$scope.despl3 = false; // Desplegar
				///////////////////////////////////////
				$scope.dsbDetallesSegInst = true;// Hoja Segunda Instancia
				$scope.hdeDetallesAccionSeg = true;// Hoja Segunda Instancia
				// $scope.hdeAdjuntarFalloSegInst = true; // Boton Enviar
				$scope.despl7 = false; // Desplegar
				///////////////////////////////////////
				$scope.dsbImpugnacion = true;// Hoja Principal Impugnación
				$scope.hdeImpugnacion = true;// Hoja Principal Impugnación
				// $scope.hdeAdjuntarImpugnacion = true; // Boton Enviar
				$scope.despl4 = false; // Desplegar
				// 1167767
				///////////////////////////////////////
				$scope.hdeCumplimiento = true;// Hoja Principal Impugnación
				$scope.despl5 = false; // Desplegar
				$scope.hdecumpli = true;// Cumplimiento Mensual
				$scope.hdefallo = true;// Fallo de Impugnacion
				// $scope.hdeAdjuntarFalloImpugnacion = true; // Boton Enviar
				///////////////////////////////////////
				$scope.hdeIncidentes = true;// Hoja Principal Impugnación
				$scope.despl6 = false; // Desplegar
			}
			$scope.ActivarEtapaTut = function (etapa) {
				if (etapa == 3) {// Respuesta de Tutela
					$scope.hdeVBrespuestatutela = false;// Hoja de respuesta
					// $scope.hdeAdjuntarRespuesta = true; // Boton Enviar
					$scope.despl2 = true; // Desplegar
					$scope.ActivarBotonesAdjuntar(etapa);
				}
				if (etapa == 2) {// Detalles de Acción de Tutela
					$scope.dsbDetalles = false;// Hoja de Detalle de accion
					$scope.hdeDetallesAccion = false;// Hoja de Detalle de accion
					// $scope.hdeAdjuntarFallo = false; // Boton Enviar
					$scope.despl3 = true; // Desplegar
					$scope.ActivarBotonesAdjuntar(etapa);
				}
				if (etapa == 14) {// Acción de Tutela - Segunda Instancia
					$scope.dsbDetallesSegInst = false;// Hoja Segunda Instancia
					$scope.hdeDetallesAccionSeg = false;// Hoja Segunda Instancia
					// $scope.hdeAdjuntarFalloSegInst = false; // Boton Enviar
					$scope.despl7 = true; // Desplegar
					$scope.ActivarBotonesAdjuntar(etapa);
				}
				if (etapa == 4) {// Impugnación de Tutela
					$scope.dsbImpugnacion = false;// Hoja Principal Impugnación
					$scope.hdeImpugnacion = false;// Hoja Principal Impugnación
					// $scope.hdeAdjuntarImpugnacion = false; // Boton Enviar
					$scope.despl4 = true; // Desplegar
					$scope.ActivarBotonesAdjuntar(etapa);
				}
				if (etapa == 5) {// Cumplimiento
					$scope.hdeCumplimiento = false;// Hoja Principal Impugnación
					$scope.hdecumpli = false;// Cumplimiento Mensual
					$scope.despl5 = true; // Desplegar
				}
				if (etapa == 6) {// Fallo de Impugnación
					$scope.hdeCumplimiento = false;// Hoja Principal Impugnación
					$scope.hdefallo = false;// Fallo de Impugnacion
					// $scope.hdeAdjuntarFalloImpugnacion = false; // Boton Enviar
					$scope.despl5 = true; // Desplegar
					$scope.ActivarBotonesAdjuntar(etapa);
				}
				if (etapa == 7) {// Proceso de Incidentes
					$scope.hdeIncidentes = false;// Hoja Principal Incidentes
					$scope.despl6 = true; // Desplegar
					$scope.selec_inci = 0;
					$scope.tabselect = 1;
					$scope.vertab($scope.tabselect);
					$scope.csstab($scope.tabselect);
				}
			}




			$scope.OmitirEtapa_SaltarEtapa = function (Etapa) {
				swal({
					title: 'Confirmar',
					text: "¿Desea omitir esta etapa?",
					type: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Continuar',
					cancelButtonText: 'Cancelar'
				}).then((result) => {
					if (result) {
						$http({
							method: 'POST',
							url: "php/juridica/tutelas/functutelas.php",
							data: {
								function: 'OmitirEtapa_SaltarEtapa',
								codigotutela: $scope.registro.codigotutela,
								etapa: Etapa
							}
						}).then(function (response) {
							// console.log(response.data);
							if(response.data){
								if(response.data[0].Codigo=="1"){
									$scope.CargaTabsEtapas(response.data[0].Etapa);
								}else{
									swal('Error', response.data[0].Mensaje, 'warning');
								}
							}else{
								swal('Error', response.data[0].Mensaje, 'warning');
							}
						});
					}
				});
			}

			// CNVU ELIMINA TUTELA 23/01/2020
			$scope.eliminartutela = function(){
				swal({
					title: 'Confirmar',
					text: "¿Desea eliminar esta tutela?",
					type: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Continuar',
					cancelButtonText: 'Cancelar'
				}).then((result) => {
					if (result) {
						$http({
							method: 'POST',
							url: "php/juridica/tutelas/functutelas.php",
							data: {
								function: 'EliminarTutela',
								codigotutela: $scope.registro.codigotutela,
								usucedula: $scope.cedulalog
							}
						}).then(function (response) {
							if (response.data[0].Codigo == "1") {
								swal('Completado', response.data[0].Mensaje, 'success');
								$scope.hdeRegistro = true;
								$scope.hdeVBrespuestatutela = true;
								$scope.hdeDetallesAccion = true;
								$scope.hdeDetallesAccionSeg = true;
								$scope.hdeImpugnacion = true;
								$scope.hdeCumplimiento = true;
								$scope.hdeIncidentes = true;
								$('#resultTutelas_filter input').val($scope.registro.codigotutela).trigger('keyup');
							} else {
								swal('Error', response.data[0].Mensaje, 'warning');
							}
						});
					}
				})				
			};

			$scope.abrirModal = function (valor,modal) {
				if (valor == true) {
					if (modal == 1) {
						(function () {
							$('#modalEstadoTutela').modal();
						 }());
						 $('#modalEstadoTutela').modal('open');
						 $scope.registro.estadoTutelaModal = true;
					}
				}else{
					if (modal == 2) {
						(function () {
							$('#modalNulidad').modal();
						 }());
						 $('#modalNulidad').modal('open');
					}
				}
			};

			$scope.cerrarModal = function (valor) {
				switch (valor) {
					case '1':
						$('#modalEstadoTutela').modal('close');	
					break;
					case '2':
						$('#modalNulidad').modal('close');	
					break;
					default:
					break;
				}
			};

			$scope.registrarEstadoTutela = function () {
				if ($scope.registro.descripcionEstadoTutela == "" || $scope.registro.descripcionEstadoTutela == null ||
					$scope.registro.descripcionEstadoTutela == undefined) {
					swal('Información', 'Ingrese la descripción.', 'info');
				} else if ($scope.registro.medioRecepcionEstadoTutela == true && document.getElementById("medioEstadoTutelaAdjunto").files.length == 0) {
					swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
				} else {
					swal({
						title: 'Confirmar',
						text: "¿Desea guardar el estado de la tutela?",
						type: 'question',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Continuar',
						cancelButtonText: 'Cancelar'
					}).then((result) => {
						if (result) {
							$scope.btn.GuardaRegistro = true;
							$http({
								method: 'POST',
								url: "php/upload_file/upload.php",
								data: {
									db: 'ET01',
									path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
									constutela: $scope.registro.codigotutela,
									type: $scope.archivoEstadoTutelaExt,
									file: $scope.archivoEstadoTutela,
									observacion: $scope.registro.descripcionEstadoTutela,
									estado: $scope.registro.estadoTutelaModal == true ? 'A' : 'I',
									fecha_estadotutela: today,//$("#FechaEstadoTutela").val(),
									typefile: $scope.registro.estadoTutelaModal == true ? '48' : '40',
									ori: true
								}
							}).then(function (response) {
								if (response.data.codigo == "1") {
									// REGISTRA MEDIO RECEPCION CIERRE INC ADJUNTO CNVU 13/12/2019
									$http({
										method: 'POST',
										url: "php/upload_file/upload.php",
										data: {
											db: 'GMREC',
											path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
											constutela: $scope.registro.codigotutela,
											type: $scope.registro.medioRecepcionEstadoTutela == false ? "" : $scope.archivoMedioEstadoTutelaExt,
											file: $scope.registro.medioRecepcionEstadoTutela == false ? "" : $scope.archivoMedioEstadoTutela,
											fecha_reqpre: $("#FechaEstadoTutela").val(),
											typefile: $scope.registro.estadoTutelaModal == true ? '49' : '41',
											medio: ($scope.registro.medioRecepcionEstadoTutela == true) ? true : false,
											ori: ($scope.registro.medioRecepcionEstadoTutela == true) ? true : false
										}
									}).then(function (response) {
										$scope.btn.GuardaRegistro = false;
										if (response.data.codigo == "1") {
											swal('Completado', response.data.observacion_err, 'success');
											$scope.btn.GuardaRegistro = false;
											$scope.archivoEstadoTutelaNom = '';
											// $("#FechaEstadoTutela").val('');
											$scope.registro.medioRecepcionEstadoTutela = false;
											$scope.registro.descripcionEstadoTutela = '';
											$scope.changeMedida("16");
											$scope.cerrarModal("1");
											lisTutelas.ajax.reload();
											$scope.archivoMedioEstadoTutelaNom = '';
										} else {
											swal('Error', response.data.observacion_err, 'warning');
											$scope.btn.GuardaRegistro = false;
											$scope.archivoEstadoTutelaNom = '';
											// $("#FechaEstadoTutela").val('');
											$scope.registro.medioRecepcionEstadoTutela = false;
											$scope.registro.descripcionEstadoTutela = '';
											$scope.changeMedida("16");
											$scope.archivoMedioEstadoTutelaNom = '';
										}
									});
								} else {
									swal('Error', response.data.observacion_err, 'warning');
									$scope.btn.GuardaRegistro = false;
									$scope.archivoEstadoTutelaNom = '';
									// $("#FechaEstadoTutela").val('');
									$scope.registro.medioRecepcionEstadoTutela = false;
									$scope.registro.descripcionEstadoTutela = '';
									$scope.changeMedida("16");
									$scope.archivoMedioEstadoTutelaNom = '';
								}
							});
						}
					})
				}
			};
	}
]);