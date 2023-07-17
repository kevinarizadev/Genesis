'use strict';
angular.module('GenesisApp')
	.controller('navbarcontroller', ['$scope', 'versionamientoHttp', '$localStorage', 'ngDialog', '$http', '$interval',
		function ($scope, versionamientoHttp, $localStorage, ngDialog, $http, $interval) {
			$scope.home_user = sessionStorage.getItem("home");
			  $scope.user = sessionStorage.getItem("cedula");
			  $scope.tic = sessionStorage.getItem("inicio_perfil");
			$scope.inputType = {
				"current": "password",
				"new": "password",
				"verify": "password"
			};
			$scope.tic = JSON.parse($scope.tic);
			 //if($scope.tic.cod_cargo =='22'){
		    //if($scope.user == '1045679099'){
		       if($scope.home_user === 'inicio'){
				//Original
		        $scope.verOriginal = true;
		      }else{
				// Diseños de fiestas
		        $scope.verOriginal = true;
		      }

			//if ($scope.home_user == 'inicio') {
		        $scope.verConffeti = false;
		    //  }

			$scope.removersidebar = function () {
				const element = document.getElementById("barra_de_menu_principal");
				element == null ? '' : element.remove();
			}

			setTimeout(() => {
				if ($scope.home_user == 'inicioafiliados') {
					document.querySelector("#content").style.paddingLeft="0px";
					$scope.removersidebar();
				}
			}, 2500);

			$scope.clearChanges = function () {
				$scope.alerts = { n1: false, n2: false, n3: false, mensaje: "La nueva contraseña debe tener como mínimo 6 caracteres e incluir por lo menos 1 letra en mayúscula, 1 número y 1 carácter especial (~!$%^&*_=+.@/-)" };
				$scope.inputType = {
					"current": "password",
					"new": "password",
					"verify": "password"
				};
				$scope.configureProfile =
					{
						"passwordCurrent": "",
						"passwordNew": "",
						"passwordVerify": "",
						"img": "",
						"ext": ""
					};
			}
			$scope.clearChanges();
			$scope.deleteImg = function () {
				$scope.configureProfile.img = 'assets/images/users/default-user.png';
				$scope.sesdata.imagen = 'assets/images/users/default-user.png';
			}
			// Traer 10 notificaiones de la BD
			$scope.notification_load = function (value) {
				$http({
					method: 'POST',
					url: "php/genesis/versionamiento/versionamiento.php",
					data: {
						function: 'obtenerNotificaciones',
						cantidad: 10
					}
				}).then(function (response) {
					$scope.notifications = response.data;
					$scope.notif_num = 0;
					for (var key in $scope.notifications) {
						if ($scope.notifications[key].visto == 'N') {
							$scope.notif_num++;
						}
					}
					if ($scope.notif_num > 0 && value) {
						$(document).ready(function () {
							setTimeout(() => {
								$("#notification_genesis>.dropdown-toggle").addClass("active");
								$("#notification_genesis>.dropdown-menu").show().scrollTop(0);
							}, 2000);
						});
					}
				});
			}
			// Traer informacion del funcionario
			if ($scope.home_user != 'inicioafiliados') {
				$http({
					method: 'POST',
					url: "php/genesis/funcgenesis.php",
					data: { function: 'cargaInicio' }
				}).then(function (response) {
					$scope.result_perfil = response.data.perfil;
				});
			}
			// Click en el icono de notificaiones
			$scope.notification_click = function () {
				$scope.notification_load(false);
			}
			$scope.viewMenu = false;
			$scope.configProfile = function () {
				console.log(1)
				$scope.viewMenu = !$scope.viewMenu;
				$scope.clearChanges();
				setTimeout(() => { $scope.$apply(); }, 500);
			};
			$scope.solution1 = true;
			$scope.saveChanges = function () {
				if ($scope.solution1 == true) {
					if ($scope.configureProfile.passwordCurrent != "" || $scope.configureProfile.passwordNew != "" || $scope.configureProfile.passwordVerify != "" || $scope.configureProfile.img != "") {
						var json = JSON.stringify($scope.configureProfile);
						$http({
							method: 'POST',
							url: "php/genesis/funcgenesis.php",
							data: {
								function: 'configurarCuenta',
								data: json
							}
						}).then(function (response) {
							if (response.data.codigo == 0) {
								inicio(response.data.mensaje, 'success');
							} else if (response.data.codigo == 1) {
								$scope.alerts.mensaje = response.data.mensaje;
								switch (response.data.cod_err) {
									default:
										alert("Nada");
										break;
									case "1":
										$scope.alerts.n2 = true;
										break;
									case "2":
										$scope.alerts.n3 = true;
										break;
									case "3":
										$scope.alerts.n1 = true;
										break;
									case "4":
										$scope.alerts.n2 = true;
										break;
									case "5":
										$scope.alerts.n3 = true;
										break;
									case "6":
										$scope.alerts.n2 = true;
										break;
									case "7":
										$scope.alerts.n2 = true;
										break;
									case "8":
										$scope.alerts.n2 = true;
										break;
								}
							};
						});
					} else {
						swal('Mensaje', 'No se modifico nada en tu cuenta', 'warning');
					}
					$scope.solution1 = false;
				} else {
					$scope.solution1 = true;
				}
			};
			// LLamado del modal al dar clic sobre una notificaion
			$scope.see_notifi = function (id) {
				$scope.id = id;
				$http({
					method: 'POST',
					url: "php/genesis/versionamiento/versionamiento.php",
					data: {
						function: 'estadoNotificaciones',
						id: id
					}
				}).then(function (response) {
					$scope.notification_load(false);
				});
				// Envio el case para elegir que modal mostrar
				$scope.case = 2;
				ngDialog.open({
					template: 'views/tic/modal/modalversionamiento.html',
					className: 'ngdialog-theme-plain',
					controller: 'modalversionamiento',
					scope: $scope
				})
			};
			// Dropdown CLICK
			jQuery(document).ready(function (e) {
				function t(t) {
					e(t).bind("click", function (t) {
						t.preventDefault();
						e(this).parent().fadeOut()
					})
				}
				e(".dropdown-toggle, .dropdown-menu a:not(.disabled):not(.other), .dropdown-menu button").click(function () {
					var t = e(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
					e(".button-dropdown .dropdown-menu").hide();
					e(".button-dropdown .dropdown-toggle").removeClass("active");
					if (t) {
						e(this).parents(".button-dropdown").children(".dropdown-menu").toggle().parents(".button-dropdown").children(".dropdown-toggle").addClass("active");
						e(".dropdown-menu").scrollTop(0);
					}
				});
				e(document).bind("click", function (t) {
					var n = e(t.target);
					if (!n.parents().hasClass("button-dropdown")) {
						e(".button-dropdown .dropdown-menu").hide();
						e(".button-dropdown .dropdown-toggle").removeClass("active");
					}
				});
			});
			// ------------------------------------------------------------------------------------------------------------------
			$scope.toolsdat = true;
			$scope.inactivehome = true;
			var dat = { prov: 'navb' }
			$scope.inst_ips = false;
			$scope.notificacion_funcionario = false;
			$scope.obtenerSession = function () {
				$.getJSON("php/obtenersession.php", dat).done(function (respuesta) {
					$scope.sesdata = respuesta;
					$scope.nombre = $scope.sesdata.nombre;
					$scope.codigorol = $scope.sesdata.rol;
					$scope.codigorol2 = $scope.sesdata.rolcod;
					$scope.usuariobd = $scope.sesdata.usu;
					if ($scope.codigorol2 == '140' || $scope.codigorol == 'IPS' || $scope.codigorol2 == '141' || $scope.codigorol2 == '-1' || $scope.codigorol2 == "-2") {
						$scope.inactivehome = true;
						$scope.isDirecto = true;
					} else {
						$scope.inactivehome = false;
					}
					if ($scope.codigorol2 == -2) {
						$scope.inst_ips = true;
					}
					if ($scope.codigorol == "Funcionario") {
						// Mostrar notificaciones
						$scope.notificacion_funcionario = true;
						$scope.notification_load(true);
						$(document).ready(function () {
							var header = $("#notifications_dropdown");
							$(window).scroll(function () {
								if ($("#notification_genesis>.dropdown-toggle").hasClass("active")) {
									var scroll = $(window).scrollTop();
									if (scroll >= 1) {
										header.css({ "top": "0px", "max-height": "80vh" });
									} else {
										header.css({ "top": "59px", "max-height": "calc(80vh - 64px)" });
									}
								}
							});
						});
							//setInterval(modalFM, 10800000);

					}
					// notificar sobre el error de los correos
					// if ($scope.codigorol == "Funcionario") {
					// 	swal({
					// 		title: "Notificación",
					// 		html: "<div class='justify-align'>Se informa que la incidencia presentada con el correo electrónico, fue resuelta de manera completa.  La falla masiva se debió a un correo que contenía una URL sospechosa que no alcanzo a propagarse, y por seguridad hubo que deshabilitar los servicios y liberar mensajes de manera programada. Todos los correos que usted considere importantes y que han sido enviados en estos días, si no tiene la certeza de su envío, por favor confirme con su destinatario.<br><br>Poder proteger el correo electrónico contra el spam, el phishing y las amenazas avanzadas, es un reto de día a día  que requiere el compromiso de todos. Tener en cuenta que todo el correo entrante y saliente del dominio cajacopieps.com es analizado por una plataforma en la nube que ofrece protección instantánea contra amenazas avanzadas.<br><br><b>Si aun presenta inconvenientes, por favor generar un ticket a soporte técnico.</b><br><br><b>Dpto. de tecnología Cajacopi EPS</b></div>",
					// 		width: 700,
					// 		allowOutsideClick: false,
					// 		allowEscapeKey: false,
					// 		showConfirmButton: true,
					// 		confirmButtonText: "Aceptar",
					// 		animation: true
					// 	});
					// }
				}).fail(function (jqXHR, textStatus, errorThrown) {
					console.log("navbar error obteniendo variables");
					$scope.sesdata = {};
				});
			}
			$scope.obtenerSession();
			//setTimeout(modalFM,5000)

			$scope.listado = function () {
				ngDialog.open({
					template: 'views/instructivos/listado.html',
					className: 'ngdialog-theme-plain',
					controller: 'listadoinstructivosctrl'
				});
			}

			setInterval(inicio, $TIMER_SESSION);

			function modalFM() {
				let sex=	sessionStorage.getItem('sexo');
				let ubicacion= sessionStorage.getItem('departamento');
				 if((sex=='F')&& (ubicacion == 'ATLANTICO' )){
					swal({
						text: 'Interesados comunicarse al numero 3002501673 ',
						imageUrl: 'assets/images/fm.jpg',
						timer: 10000,
						onOpen: () => {
							swal.showLoading()
						}
					});
				 }
				
			}
				function inicio(titulo = 'Su sesion de Genesis ha caducado', tipo = 'warning') {
					if (tipo == 'success') {
		          swal({
		            text: 'Contraseña actualizada correctamente. Cerrando sesion...',
		            timer: 5000,
		            onOpen: () => {
		              swal.showLoading()
		            }
		          });
		          setTimeout(() => {
		            window.location.href = 'php/cerrarsession.php';
		           }, 5000);
		        } else {
					$scope.extender = false;
					swal({
						title: 'Confirmar',
						text: '¿Desea Extender la sesion de Genesis?',
						type: 'question',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Confirmar'
					}).then((result) => {
						$scope.extender = true;
						return;
					}).catch(function (error) {
						window.location.href = 'php/cerrarsession.php';
					});
					setTimeout(() => {
						if ($scope.extender == false) {
							swal({
								title: titulo,
								type: tipo,
								text: 'En 5 segundos terminara su sesion',
								timer: 5000,
								onOpen: () => {
									swal.showLoading()
								}
							}).then((result) => {
								if (result.dismiss === 'timer') {
									window.location.href = 'php/cerrarsession.php';
								}
							}).catch(function (error) {
								window.location.href = 'php/cerrarsession.php';
							});
						}
					}, 300000);
				}
			}

			$scope.cambiarcontrasena = function () {
				$scope.abrir();
			}
			$scope.abrir = function () {
				ngDialog.open({
					template: 'views/consultaAfiliados/modalcambiarcontrasena.html',
					className: 'ngdialog-theme-plain',
					controller: 'modalcambiarcontrasenacontroller',
					scope: $scope
				});
			}
			$scope.descargaVolante = function () {
				$scope.dialogJuz = ngDialog.open({
					template: 'views/talentohumano/formatos/modalSelectPeriodos.html',
					className: 'ngdialog-theme-plain',
					controller: 'modalSelectPeriodosCtrl'
				});
			}

			if (!sessionStorage.getItem("mostrarVolante")) {
		        $http({
		          method: 'POST',
		          url: "php/genesis/inicio.php",
		          data: {
		            function: 'obtenerPermisoVolante',
		            cedula: sessionStorage.getItem("cedula")
		          }
		        }).then(function ({ data }) {
					if(data.Codigo){
						return;
					}
		          $scope.mostrarVolantes = data[0].nomina != undefined ? data[0].nomina : '';
		          sessionStorage.setItem("mostrarVolante", data[0].nomina);
		        //   console.log(data)
		        });
		      } else {
		        $scope.mostrarVolantes = sessionStorage.getItem("mostrarVolante");
		      }

		}]).directive('selectNgFilesImg', function () {
			return {
				require: "ngModel",
				link: function postLink($scope, elem, attrs, ngModel) {
					elem.on("change", function (e) {
						var files = elem[0].files;
						if (files && this.files[0].type == "image/png" || this.files[0].type == "image/jpeg" || this.files[0].type == "image/jpg" || this.files[0].type == "image/gif") {
							if (this.files[0].size > 7340032) {
								swal('Advertencia', 'El archivo excede el peso limite (7 MB)', 'warning')
							} else {
								ngModel.$setViewValue(files);
								var selectedFile = e.target.files[0];
								var reader = new FileReader();
								$scope.imgtag = document.getElementById("profile-img");
								$scope.imgtag.title = selectedFile.name;
								reader.onload = function (event) {
									$scope.imgtag.src = event.target.result;
									$scope.configureProfile.img = $("#profile-img")[0].src;
									$scope.configureProfile.ext = $("#profile-img")[0].title.split('.').pop();
								};
								reader.readAsDataURL(selectedFile);
							}
						} else {
							swal('Advertencia', 'El archivo no es una imagen valida', 'warning');
						}
					})
				}
			};
		});