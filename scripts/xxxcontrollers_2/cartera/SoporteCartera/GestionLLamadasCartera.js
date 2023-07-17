angular.module('GenesisApp')
.controller('GestionLLamadasCartera', ['$scope', '$rootScope', '$http', 'afiliacionHttp', 'ngDialog',
	function ($scope, $rootScope, $http, afiliacionHttp, ngDialog) {

		$scope.FormularioDeLlamada = false;
		$scope.SegundaParte = false;
		$scope.CampoRazonSocial = true;
		$scope.reloj = false;
		$scope.MostrarSede = false;
		$scope.OcultarInforme = false;

		$scope.tipodocumento = '0';
		$scope.typecall = '0';


		$scope.info = {
			fecha: '',
			fechatemporal: '',
			hora: '',
			duracion: '00:00:00',
			documento: '',
			razonsocial: '',
			telefono: '',
			celular: '',
			direccion: '',
			correo: '',
			personacontacto: '',
			observacion: '',
			motivo: '0',
			tipollamada: '0',
			sede: '0',
			departamento: '0',
			municipio: '0',
			reglon:''
		}
		$scope.CapturaFechaActual = function () {
			var date = new Date();
			var day = date.getDate()
			var month = date.getMonth() + 1
			var year = date.getFullYear()
			if (month < 10) {
				if (day < 10) {
					$scope.info.fecha = 0 + day + '/' + 0 + month + '/' + year;
				} else {
					$scope.info.fecha = day + '/' + 0 + month + '/' + year;
				}
			} else {
				$scope.info.fecha = day + '/' + month + '/' + year;
			}
		}
		$scope.CapturaHoraActual = function () {
			function formatTime(n) {
				return (n < 10) ? "0" + n : n;
			};
			var today = new Date(),
			month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
			h = formatTime(today.getHours()),
			min = formatTime(today.getMinutes()),
			seg = formatTime(today.getSeconds()),
			hour = h,
			w = "A.M";

			if (hour >= 12) {
				hour = formatTime(hour - 12);
				w = "P.M";
			};

			if (hour == 0) {
				hour = 12;
			};

			$scope.info.fechatemporal = today.getDate() + ' / ' + month[today.getMonth()] + ' / ' + today.getFullYear();
			$scope.info.hora = hour + ":" + min + ":" + seg + ' ' + w
		}
		$scope.ListarMotivos = function () {
			$http({
				method: 'POST',
				url: "php/cartera/funcartera.php",
				data: {
					function: 'ListarMotivosLLamadas'
				}
			}).then(function (respose) {
				$scope.lmotivos = respose.data;
			})
		}
		$scope.ValidoFechaMinima = function () {
			var hoy = new Date();
			var dd = hoy.getDate();
			var mm = hoy.getMonth() + 1; 
			var yyyy = hoy.getFullYear();
			if (dd < 10) { 
				dd = '0' + dd 
			}
			if (mm < 10) { mm = '0' + mm }
				$scope.maxDate = yyyy + '-' + mm + '-' + dd;
		}
		$scope.RegistrarLLamada = function () {
			$scope.BotonRegistroLlamada = false;
			$scope.FormularioDeLlamada = true;
			$scope.OcultarInforme = false;
			$scope.CapturaFechaActual();
			$scope.CapturaHoraActual();
			$scope.ListarMotivos();
			$scope.ValidoFechaMinima();
		}
		$scope.ConsultarSedeAportante = function () {
			$http({
				method: 'POST',
				url: "php/cartera/funcartera.php",
				data: {
					function: 'ConsultarSedeAportante',
					tipo: $scope.tipodocumento,
					documento: $scope.info.documento
				}
			}).then(function (res) {
				$scope.infosede = res.data;
				$scope.MostrarSede = true;

			})
		}
		$scope.ObtenerInformacionAportante = function (sede) {
			$scope.info.sede = sede;
			if (sede == 0) {
				swal('Notificacion', 'Debe Elegir Una Sede', 'info');
			} else {
				$http({
					method: 'POST',
					url: "php/cartera/funcartera.php",
					data: {
						function: 'ObtenerInformacionAportante',
						tipo: $scope.tipodocumento,
						documento: $scope.info.documento,
						sede: sede
					}
				}).then(function (res) {
					if (res.data.codigo == '0') {
						$scope.codigo = res.data.codigo;
						$scope.Cronometro();
						$scope.SegundaParte = true;
						$scope.CampoRazonSocial = true;
						$scope.reloj = true;
						$scope.On = true;
						setTimeout(() => {
							$scope.departamento = res.data.departamento;
							$scope.numero = res.data.numero;
							console.log($scope.numero);
							$scope.BuscoMunicipio($scope.departamento);
							$scope.info.razonsocial = res.data.razon_social;
							$scope.info.celular = res.data.celular;
							$scope.info.direccion = res.data.direccion;
							$scope.info.personacontacto = res.data.persona_contancto;
							$scope.info.telefono = res.data.telefono;
							$scope.info.correo = res.data.correo;
							$scope.proceso = 'E';
							$scope.municipio = res.data.municipio;
							$scope.$apply();
						}, 500);
					} else {
						swal('Notificacion', res.data.mensaje, 'info');
					}
				})
			}
		}
		$scope.ConsultarAportante = function () {
			$http({
				method: 'POST',
				url: "php/cartera/funcartera.php",
				data: {
					function: 'ConsultarAportante',
					tipo: $scope.tipodocumento,
					documento: $scope.info.documento
				}
			}).then(function (res) {
				if (res.data.codigo == '0') {
					$scope.ConsultarSedeAportante();
				} else {
					swal({
						title: res.data.mensaje,
						type: 'info',
						showCancelButton: true,
						allowEscapeKey: false,
						allowOutsideClick: false,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Registrar',
						cancelButtonText: 'Consultar'
					}).then(function () {
						$scope.Cronometro();
						$scope.SegundaParte = true;
						$scope.CampoRazonSocial = false;
						$scope.reloj = true;
						$scope.departamento = '0';
						$scope.municipio = '0';
						$scope.proceso = 'N';
						$scope.On = false;
						$scope.$apply();
					}, function (dismiss) {
						if (dismiss === 'cancel') {

						}
					})
				}
			})
		}
		$scope.Cronometro = function () {
			$(document).ready(function () {
				if (document.querySelector("#duracion") != undefined && document.querySelector("#duracion") != null) {
					$scope.cronometro = document.querySelector("#duracion");
					document.querySelector("[for=duracion]").classList.add("active");
					$scope.emp = new Date();
					$scope.elcrono = setInterval(tiempo, 10);

					function tiempo() {
						var actual = new Date();
						$scope.cro = actual - $scope.emp;
						var cr = new Date();
						cr.setTime($scope.cro);
						var cs = cr.getMilliseconds();
						cs = cs / 10;
						cs = Math.round(cs);
						var sg = cr.getSeconds();
						var mn = cr.getMinutes();
						var ho = cr.getHours() - 1;
						if (cs < 10) { cs = "0" + cs; }
						if (sg < 10) { sg = "0" + sg; }
						if (mn < 10) { mn = "0" + mn; }
						if (ho < 10) { ho = "0" + ho; }

						$scope.cronometro.innerHTML = '00' + ":" + mn + ":" + sg;
					}
				}
			});
		}
		$scope.FinalizarLlamadas = function (info) {
			console.log($scope.info.sede,$scope.numero);
			$scope.info.duracion = $scope.cronometro.value;
			if ($scope.proceso == 'N') {
				$scope.municipio = $("#municipio")[0].value;
				$scope.info.sede = 99;
			}
			$http({
				method: 'POST',
				url: "php/cartera/funcartera.php",
				data: {
					function: 'InsertarRegistroLlamadas',
					tipo_documento: $scope.tipodocumento,
					documento: $scope.info.documento,
					razon_social: $scope.info.razonsocial,
					fecha_registro: $scope.info.fecha,
					hora_registro: $scope.info.hora,
					duracion_llamada: $scope.cronometro.innerHTML,
					cod_dpto: $scope.municipio,
					telefono: $scope.info.telefono,
					celular: $scope.info.celular,
					direccion: $scope.info.direccion,
					correo: $scope.info.correo,
					motivo: $scope.info.motivo,
					tipo_llamada: $scope.info.tipollamada,
					persona_contacto: $scope.info.personacontacto,
					observacion: $scope.info.observacion,
					responsable: sessionStorage.getItem('cedula'),
					proceso: $scope.proceso,
					sede: $scope.info.sede,
					numero: $scope.numero
				}
			}).then(function (res) {
				if (res.data.codigo == '0') {
					swal('Notificacion', res.data.mensaje, 'success');
					clearInterval($scope.elcrono);
					$scope.Limpiar();
					$scope.CantidadPorPersona();
				} else {
					swal('Notificacion', res.data.mensaje, 'error');
				}
			})
		}
		$scope.Limpiar = function () {
			$scope.departamento = '0';
			$scope.FormularioDeLlamada = false;
			$scope.SegundaParte = false;
			$scope.CampoRazonSocial = true;
			$scope.MostrarSede = false;
			$scope.reloj = false;
			$scope.On = false;
			$scope.OcultarInforme = false;
			$scope.tipodocumento = '0';
			$scope.info = {
				fecha: '',
				fechatemporal: '',
				hora: '',
				duracion: '00:00:00',
				tipodocumento: '0',
				documento: '',
				razonsocial: '',
				telefono: '',
				celular: '',
				direccion: '',
				correo: '',
				motivo: '0',
				tipollamada: '0',
				personacontacto: '',
				observacion: '',
				sede: '0'
			}
		}
		$scope.ListarNomenclatura = function () {
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

			afiliacionHttp.obtenerZona().then(function (response) {
				$scope.Zonas = response.Zona;
			})
		}
		$scope.AbrirModalDireccion = function () {
			$scope.Act_Zona = { Codigo: '' };
			$scope.ViaPrincipal = { Codigo: '' };
			$scope.Letra = { Codigo: '' };
			$scope.Cuadrante = { Codigo: '' };
			$scope.CuadranteVG = { Codigo: '' };
			$scope.SelectLetraVG = { Codigo: '' };
			$scope.Bis = false;
			$scope.ListarNomenclatura();
			$scope.dialogDiagreg = ngDialog.open({
				template: 'views/consultaAfiliados/nucleofamiliar/modal/modalDireccion.html',
				className: 'ngdialog-theme-plain',
				controller: 'LlamadaRecibidaController',
				closeByDocument: false,
				closeByEscape: false,
				scope: $scope
			});
			$scope.dialogDiagreg.closePromise.then(function (data) {
				if (data.value != "$closeButton") {
					$scope.info.direccion = data.value;
				}
			});
		}
		$scope.GuardarDireccion = function (ViaPrincipal, NumViaPrincipal, Letra, Numero, Bis, Cuadrante, NumeroVG, SelectLetraVG, NumeroPlaca, CuadranteVG, Complemento) {
			$scope.closeThisDialog($('#direcciond').val());
		}
		$scope.listardepartamento = function () {
			$http({
				method: 'POST',
				url: "php/consultaafiliados/funcnovedadacb.php",
				data: { function: 'cargaDepartamentos' }
			}).then(function (response) {
				$scope.depto = response.data;
			});
		}
		$scope.BuscoMunicipio = function (cod) {
			$http({
				method: 'PSOT',
				url: "php/consultaafiliados/funcnovedadacb.php",
				data: { function: 'cargaMunicipios', depa: cod }
			}).then(function (response) {
				$scope.muni = response.data;
				if ($scope.codigo == '0') {
					$(document).ready(function () {
						$("#munic").val($scope.municipio);
						console.log($("#munic").val($scope.municipio));
					});
				}
			});
		}
		$scope.CantidadPorPersona = function () {
			$http({
				method: 'POST',
				url: "php/cartera/funcartera.php",
				data: {
					function: 'CantidadxPersona', documento: sessionStorage.getItem('cedula'),
				}
			}).then(function (respose) {
				$scope.infodata = respose.data;
				console.log($scope.infodata);
			})
		}

		$scope.RegistrarLLamada();
		$scope.listardepartamento();
		$scope.Cronometro();


		}]);