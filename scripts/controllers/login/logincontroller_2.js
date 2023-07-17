
'use strict';
angular.module('GenesisApp', ['ngStorage', 'toastr', 'ngDialog', 'chieffancypants.loadingBar'])
   .config(function (cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
   })
   .config(function ($locationProvider) {
      $locationProvider.html5Mode({
         enabled: true,
         requireBase: false
      });
   })
   .controller('loginController',
      ['$scope', '$http', '$rootScope', '$location', 'AuthenticationService', 'notification', 'ngDialog', '$localStorage', '$timeout', 'cfpLoadingBar',
         function ($scope, $http, $rootScope, $location, AuthenticationService, notification, ngDialog, $localStorage, $timeout, cfpLoadingBar) {
            sessionStorage.clear();
            $scope.content = 'funcionario';
            $scope.userips = "0";
            // $scope.inactiveautorizacion = true;
            if ($location.search().tipo == "afiliado") {
               $scope.afil = true;
            } else {
               $scope.afil = false;
            }
            $scope.obtenerDocumento = function () {
               var request = $http({
                  method: 'get',
                  url: "json/tipodocumento.json"
               });
               $scope.Documentos = request;
               console.log($scope.Documentos.then(handleSuccess));
            }
            $scope.loginAfiliado = function () {
               if ($scope.idafiliado == "" || $scope.passafiliado == "") {
                  notification.getNotification('error', 'Ingrese número de identifiación y/o contraseña', 'Notificacion');
               } else {
                  //Validación de ususario
               }

            }

            // Set the default value of inputType
            $scope.inputType = 'password';

            // Hide & show password function
            $scope.hideShowPassword = function (dato) {
               if ($scope.inputType == 'password')
                  $scope.inputType = 'text';
               else
                  $scope.inputType = 'password';
            }
            $scope.loginAfiliado = function () {
               if ($scope.idafiliado == "" || $scope.passafiliado == "") {
                  notification.getNotification('error', 'Ingrese número de identifiación y/o contraseña', 'Notificacion');
               } else {
                  $http({
                     method: 'GET',
                     url: "php/login/afillogin.php",
                     params: {
                        user: $scope.idafiliado,
                        pass: $scope.passafiliado
                     }
                  }).then(function (res) {
                     if (res.data.RES == 1) {
                        sessionStorage.setItem("home", "inicioafiliados");
                        window.location.href = 'app.php#/inicioafiliados';
                     } else {
                        notification.getNotification('error', res.data.MSJ, 'Notificacion');
                     }
                     cfpLoadingBar.complete();
                  })
               }
            }

            $scope.login = function () {
               if ($scope.username == null || $scope.username == "" || $scope.password == null || $scope.password == "") {
                  notification.getNotification('error', 'Ingrese usuario y/o contraseña', 'Notificacion');
               } else {
                  cfpLoadingBar.start();
                  $http({
                     method: 'POST',
                     url: "php/login/login_new.php",
                     data: {
                        function: 'autenticacion',
                        json: JSON.stringify({
                           nit: "0",
                           user: $scope.username,
                           pass: $scope.password
                        })
                     }
                  }).then(function (response) {
                     if (response.data.Codigo == "0") {
                        var temp_se = JSON.parse(response.data.Sesion);
                        sessionStorage.setItem("cedula", temp_se.cedula);
                        sessionStorage.setItem("usuario", $scope.username);
                        sessionStorage.setItem("ente_territorial", 'X');
                        sessionStorage.setItem("nit", "0");
                        sessionStorage.setItem("municipio", temp_se.codmunicipio);
                        sessionStorage.setItem("home", "inicio");
                        sessionStorage.setItem("nombre",temp_se.nombre);
                        sessionStorage.setItem("cargo",temp_se.cargo);
                        sessionStorage.setItem("dpto",temp_se.coddepartamento);
                        sessionStorage.setItem("video", "1");
                        sessionStorage.setItem("rolcod",temp_se.rolcod);    
                        sessionStorage.setItem("sexo",response.data.Sexo);                        
                        sessionStorage.setItem("departamento",response.data.Departamento);                     
                        window.location.href = 'app.php#/inicio';
                     } else {
                        notification.getNotification('error', response.data.Mensaje, 'Notificacion');
                        cfpLoadingBar.complete();
                     }
                  });
               }
            }
            $scope.login_ips = function () {
               if ($scope.nit == null || $scope.useripsaut == null || $scope.passipsaut == null || $scope.nit == "" || $scope.useripsaut == "" || $scope.passipsaut == "" || $scope.nit == undefined || $scope.useripsaut == undefined || $scope.passipsaut == undefined) {
                  notification.getNotification('error', 'Ingrese NIT, USUARIO y CONTRASEÑA', 'Notificación');
               } else {
                  cfpLoadingBar.start();
                  $http({
                     method: 'POST',
                     url: "php/login/login_new.php",
                     data: {
                        function: "autenticacion",
                        json: JSON.stringify({
                           nit: $scope.nit,
                           user: $scope.useripsaut,
                           pass: $scope.passipsaut
                        })
                     }
                  }).then(function (response) {
                     if (response.data.Codigo == "0") {
                        var temp_se = JSON.parse(response.data.Sesion);
                        sessionStorage.setItem("cedula", temp_se.documento);
                        sessionStorage.setItem("usuario", $scope.useripsaut);
                        sessionStorage.setItem("nit", $scope.nit);
                        sessionStorage.setItem("ente_territorial", temp_se.ente_territorial);
                        sessionStorage.setItem("ubicacion", temp_se.ubicacion);
                        sessionStorage.setItem("home", "inicioips");
                        window.location.href = 'app.php#/inicioips';
                     } else if (response.data.Codigo == 1) {
                        swal('Importante', response.data.Mensaje, response.data.tipo);
                     } else if (response.data.Codigo == 2) {
                        /* console.log(562151); */
                        swal({
                           title: response.data.Mensaje,
                           input: 'number',
                           inputClass: 'input-codigo',
                           inputValue: '',
                           inputAttributes: {
                              min: 1,
                              max: 10
                           },
                           confirmButtonText: "Enviar",
                           showCancelButton: true
                        }).then(function (result) {
                           if (result > 0) {
                              $http({
                                 method: 'POST',
                                 url: "php/login/login_new.php",
                                 data: {
                                    function: "verificacion_IPS",
                                    json: JSON.stringify({
                                       nit: $scope.nit,
                                       user: $scope.useripsaut,
                                       pass: $scope.passipsaut,
                                       codigo: result
                                    })
                                 }
                              }).then(function (response) {
                                 if (response.data.Codigo == "0") {
                                    var sesion = response.data.Sesion;
                                    sessionStorage.setItem("cedula", sesion.cedula);
                                    sessionStorage.setItem("usuario", sesion.usu);
                                    sessionStorage.setItem("nit", sesion.nit);
                                    sessionStorage.setItem("home", "inicioips");
                                    window.location.href = 'app.php#/inicioips';
                                 } else {
                                    notification.getNotification('error', response.data.Mensaje, 'Notificación');
                                 }
                                 cfpLoadingBar.complete();
                              })

                           } else {
                              swal('Importante', response.data.Mensaje, response.data.tipo);
                           }
                        })

                     } else if (response.data.Codigo = "3") {
                        swal({
                           text: response.data.Mensaje,
                           type: response.data.tipo,
                           showCancelButton: true,
                           confirmButtonClass: "btn-danger",
                           confirmButtonText: "Desbloquear con un celular registrado",
                           cancelButtonText: "Cerrar"
                        }).then(function (response_0) {
                           if (response_0 == true) {
                              $http({
                                 method: 'POST',
                                 url: "php/login/login_new.php",
                                 data: {
                                    function: "enviarMensajeAlMovil",
                                    json: JSON.stringify({
                                       nombre: response.data.Nombre,
                                       movil: response.data.Celular
                                    })
                                 }
                              }).then(function (response_1) {
                                 if (response_1.data.messages!=undefined && response_1.data.messages.length > 0) {
                                    swal({
                                       title: "Mensaje enviado!",
                                       text: "Ingresa el codigo de verificacion enviado al celular del usuario: " + $scope.useripsaut,
                                       input: 'number',
                                       inputClass: 'input-codigo',
                                       inputValue: '',
                                       inputAttributes: {
                                          min: 1,
                                          max: 10
                                       },
                                       confirmButtonText: "Enviar",
                                       showCancelButton: true
                                    }).then(function (result) {
                                       if (result > 0) {
                                          $http({
                                             method: 'POST',
                                             url: "php/login/login_new.php",
                                             data: {
                                                function: "desbloquear_usuario",
                                                json: JSON.stringify({
                                                   nit: $scope.nit,
                                                   cedula: response.data.Cedula,
                                                   codigo: result
                                                })
                                             }
                                          }).then(function (response_1) {
                                             if (response_1.data.Codigo == "0") {
                                                swal('Importante', response_1.data.Mensaje, response_1.data.tipo);
                                                // var sesion = response.data.Sesion;
                                                // sessionStorage.setItem("cedula", sesion.cedula);
                                                // sessionStorage.setItem("usuario", sesion.usu);
                                                // sessionStorage.setItem("nit", sesion.nit);
                                                // sessionStorage.setItem("ubicacion", sesion.ubicacion);
                                                // sessionStorage.setItem("home", "inicioips");
                                                // window.location.href = 'app.php#/inicioips';
                                             } else {
                                                notification.getNotification('error', response.data.Mensaje, 'Notificación');
                                             }
                                             cfpLoadingBar.complete();
                                          })
                                       } else {
                                          notification.getNotification('error', "Ingrese un codigo de verificacion valido", 'Notificación');
                                       }
                                    });
                                 } else {
                                    notification.getNotification('error', response.data.Mensaje, 'Notificación');
                                 }
                              })
                           }
                        });
                     }
                     // if (res.data == "1") {
                     //    cfpLoadingBar.complete();
                     //    window.location.href = 'app.php';
                     // } else {
                     //    notification.getNotification('error', res.data, 'Notificación');
                     // }
                  })
               }
            }
            $scope.modal_ips=function(){
               swal({ title: '¡El ingreso de IPS a nuestro portal ha cambiado!',
               text: "",
               imageUrl: 'assets/images/ips_login.svg',
               imageWidth: 200,
               imageHeight: 200,
               padding: 10,
               closeOnEsc: false,
               allowOutsideClick: false,
               showCancelButton: false,
               confirmButtonColor: '#32436C',
               confirmButtonText: 'Mira Nuestro Instructivo'
               }).then(function() {
               window.open('https://genesis.cajacopieps.com//assets/instructivo/GTIC-015-FR%20-%20%20Instructivo%20%20Login%20Funcionarios%20IPS.pdf','_blank');
               })
            }
               
            // $scope.cargausuarios = function () {
            //    $http({
            //       method: 'POST',
            //       url: "php/login/cargausersips.php",
            //       data: { nit: $scope.nit }
            //    }).then(function (res) {
            //       $scope.usuarios = res.data;
            //    })
            // }
            // $scope.moduloips = function () {
            //    if ($scope.userips == 'autorizaciones') {
            //       $scope.inactiveautorizacion = false;
            //    } else {
            //       $scope.inactiveautorizacion = true;
            //    }
            // }
            // $scope.loginIPS = function () {
            //    cfpLoadingBar.start();
            //    if ($scope.nit == null || $scope.nit == "" || $scope.userips == null || $scope.userips == "" || $scope.passips == null || $scope.passips == "") {
            //       notification.getNotification('error', 'Ingrese usuario y/o contraseña', 'Notificación');
            //    }
            //    else {
            //       $http({
            //          method: 'GET',
            //          url: "php/login/ipslogin.php",
            //          params: { nit: $scope.nit, user: $scope.userips, pass: $scope.passips }
            //       }).then(function (res) {
            //          if (res.data == "1") {
            //             cfpLoadingBar.complete();
            //             window.location.href = 'app.php';
            //          } else {
            //             notification.getNotification('error', res.data, 'Notificación');
            //          }
            //       })
            //    }
            // }
            // $scope.loginIPSAUT = function () {
            //    cfpLoadingBar.start();
            //    if ($scope.nit == null || $scope.userips == null || $scope.useripsaut == null || $scope.passipsaut == null || $scope.nit == "" || $scope.userips == "" || $scope.useripsaut == "" || $scope.passipsaut == "" || $scope.nit == undefined || $scope.userips == undefined || $scope.useripsaut == undefined || $scope.passipsaut == undefined) {
            //       notification.getNotification('error', 'Ingrese usuario y/o contraseña', 'Notificación');
            //    }
            //    else {
            //       $http({
            //          method: 'GET',
            //          url: "php/login/ipsloginaut.php",
            //          params: { nit: $scope.nit, user: $scope.useripsaut, pass: $scope.passipsaut }
            //       }).then(function (res) {
            //          if (res.data == "1") {
            //             cfpLoadingBar.complete();
            //             window.location.href = 'app.php';
            //          } else {
            //             notification.getNotification('error', res.data, 'Notificación');
            //          }
            //       })
            //    }
            // }
            $scope.loginEmpresa = function () {
               cfpLoadingBar.start();
               if ($scope.nitempresa == null || $scope.nitempresa == "" || $scope.passempresa == null || $scope.passempresa == "") {
                  notification.getNotification('error', 'Ingrese usuario y/o contraseña', 'Notificación');
               }
               else {
                  $http({
                     method: 'GET',
                     url: "php/login/empresalogin.php",
                     params: { nit: $scope.nitempresa, pass: $scope.passempresa }
                  }).then(function (res) {
                     if (res.data == "1") {
                        cfpLoadingBar.complete();
                        sessionStorage.setItem("home", "inicioempresas");
                        window.location.href = 'app.php#/inicioempresas';
                     } else {
                        notification.getNotification('error', 'usuario y/o contraseña invalida', 'Notificación');
                     }
                  })
               }
            }
            function loadingButton(type) {
               switch (type) {
                  case "valida":
                     $scope.enable = "false";
                     var $icon = $(this).find(".icon-arrows-cw"),
                        animateClass = "icon-refresh-animate";
                     $icon.addClass(animateClass);
                     $scope.loginButtonText = "Iniciando...";
                     $timeout(function () {
                        $scope.enable = "true";
                        $scope.loginButtonText = "Iniciar Sesion";
                     }, 2000);
                     break;
               }
            }

            $scope.help = function () {
               ngDialog.open({
                  template: 'views/ayuda/ayuda.html',
                  className: 'ngdialog-theme-plain',
                  //controller: 'verdetallescontroller',
                  //controllerAs: 'ipctrl',
                  scope: $scope
               });
            }

            $scope.passwordrecoveryfunc = function () {
               $scope.dialogrecover = ngDialog.open({
                  template: 'recoverpassfunc.html',
                  className: 'ngdialog-theme-plain',
                  scope: $scope
               });
               $scope.dialogrecover.closePromise.then(function (data) {
                  console.log(data);
               });
            }

            $scope.usuario_bloqueado = function () {
               swal({
                  title: "Mensaje",
                  text: "Ingrese el usuario bloqueado:",
                  input: "text",
                  inputClass: "input-codigo",
                  inputValue: "",
                  confirmButtonText: "Enviar",
                  showCancelButton: true
               }).then(function (result) {
                  if (result != "") {
                     $http({
                        method: 'POST',
                        url: "php/login/login_new.php",
                        data: {
                           function: "desbloquear_funcionario",
                           usuario: result
                        }
                     }).then(function (response) {
                        if (response.data.codigo == 0) {
                           swal("Completado", response.data.mensaje, "success");
                        } else {
                           swal("Error", response.data.mensaje, "warning");
                        }
                        cfpLoadingBar.complete();
                     })
                  } else {
                     swal("Mensaje", "El nombre de usuario no puede ser vacio.", "warning");
                  }
               })
            }

            $scope.passwordrecovery = function () {
               $scope.dialogrecover = ngDialog.open({
                  template: 'recoverpass.html',
                  className: 'ngdialog-theme-plain',
                  scope: $scope
               });
               $scope.dialogrecover.closePromise.then(function (data) {
                  if (data.value != "$document") {
                     $scope.idafiliado = data.value["0"];
                     $scope.passafiliado = data.value["1"];
                     $scope.loginAfiliado();
                  }
               });
            }

            // modal de registro de Empresas
            $scope.nuevaempresa = function () {
               $scope.dialogrecover = ngDialog.open({
                  template: 'nuevaempresa.html',
                  className: 'ngdialog-theme-plain',
                  scope: $scope,
                  closeByEscape: false,
                  closeByDocument: false

               });
               $scope.dialogrecover.closePromise.then(function (data) {
                  console.log(data)
               });
            }

            $scope.passwordrecoveryips = function () {
               $scope.dialogrecover = ngDialog.open({
                  template: 'recoverpassips.html',
                  className: 'ngdialog-theme-plain',
                  scope: $scope
               });
               $scope.dialogrecover.closePromise.then(function (data) {
                  console.log(data)
               });
            }

            $scope.resetAnimation = function(){
               $("#foot-lnk").addClass("rotacionEfecto");
               if ($scope.content != '') {
                  setTimeout(() => {
                     $("#foot-lnk").removeClass("rotacionEfecto");
                  }, 700);
               }
            }
            $scope.resetAnimation();
         }]);



