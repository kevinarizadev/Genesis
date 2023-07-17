'use strict';
angular.module('GenesisApp')
   .controller('recoveryctrl', ['$scope', '$http',
      function ($scope, $http) {
         $scope.hide_email_params = true;
         $scope.r_cel = '';
         $scope.obtenerDocumento = function () {
            $http({
               method: 'POST',
               url: "php/login/login_new.php",
               data: {
                  function: 'Obtener_Tipos_Documentos'
               }
            }).then(function ({ data }) {
               $scope.Documentos = data;
               $scope.r_tipo_documento = "CC";
            })
         }
         function formatDate(date) {
            var month = date.getMonth() + 1;
            date = date.getDate() + "/" + month + "/" + date.getFullYear();
            return date;
         }

         $scope.recuperarPass = function () {
            if ($scope.r_tipo_documento == null || $scope.r_tipo_documento == "" || $scope.r_documento == null || $scope.r_documento == "" ||
               $scope.f_expedicion == null || $scope.f_expedicion == "") {
               swal('Notificación', 'Ingrese los datos solicitados', 'info').catch(swal.noop);
               return
            }
            const f_expedicion = formatDate($scope.f_expedicion, 1);
            $scope.pasa_fecha = $scope.f_expedicion;
            $http({
               method: 'POST',
               url: "php/login/recuperarpass.php",
               data: {
                  function: 'verificarPass',
                  type: $scope.r_tipo_documento,
                  id: $scope.r_documento,
                  expedicion: f_expedicion
               }
            }).then(function ({ data }) {
               if (data.error == 0) {
                  $scope.hide_recover_params = true;
                  $scope.hide_email_params = false;
                  $scope.r_cel = '';
               } else {
                  swal('Notificación', data.mensaje, 'warning').catch(swal.noop);
               }
            })
         }
         $scope.enviarPass = function () {
            if ($scope.r_cel.toString().length != 16) {
               swal('Notificación', 'Debe ingresar el número', 'info').catch(swal.noop);
               return
            }
            swal({
               html: `<div class="loading_swal">
               <div class="boob"><img src="./assets/images/icon_humanos.svg" alt="x"></div>
               <div class="boob"><img src="./assets/images/icon_humanos.svg" alt="x"></div>
               <div class="boob"><img src="./assets/images/icon_humanos.svg" alt="x"></div>
             </div>`,
               width: 200,
               allowOutsideClick: false,
               showConfirmButton: false,
            }).catch(swal.noop);

            $http({
               method: 'POST',
               url: "php/login/login_new.php",
               data: {
                  function: 'enviarPass',
                  movil: $scope.r_cel.replace(/[^0-9]/g, '')
               }
            }).then(function ({ data }) {
               if(data.Codigo != 0){
                 swal('Notificación', data.Mensaje, 'info').catch(swal.noop);
                 return;
               }
               swal('Notificación', data.Mensaje, 'success').catch(swal.noop);
               $scope.closeThisDialog({valueUser: $scope.r_documento, valuePass: data.userPass});

            })
         }

         $scope.FormatSoloNumeroCelular = function (NID) {
            const input_2 = document.getElementById('' + NID + '');
            const valor = input_2.value.replace(/[^0-9]/g, '');
            input_2.value = valor;

            const target = input_2;
            const input = input_2.value.replace(/\D/g, '').substring(0, 10);
            const zip = input.substring(0, 3);
            const middle = input.substring(3, 6);
            const last = input.substring(6, 10);

            if (input.length > 6) { target.value = `(${zip}) ${middle} - ${last}`; }
            else if (input.length > 3) { target.value = `(${zip}) ${middle}`; }
            else if (input.length > 0) { target.value = `(${zip}`; }
         }
         //  $scope.passwordrecoveryips = function () {
         //     $scope.dialogrecover = ngDialog.open({
         //        template: 'recoverpassips.html',
         //        className: 'ngdialog-theme-plain',
         //        scope: $scope
         //     });
         //     $scope.dialogrecover.closePromise.then(function (data) {
         //        console.log(data)
         //     });
         //  }
      }
   ])
   .controller('recoveryipsctrl', ['$scope', '$http', 'ngDialog',
      function ($scope, $http, ngDialog) {
         $scope.correopanel = true;
         $scope.recueprarpassips = function () {
            $http({
               method: 'POST',
               url: "php/login/recuperarpass.php",
               data: {
                  function: 'verificapassips',
                  nit: $scope.r_nit,
                  usuario: $scope.r_usuario
               }
            }).then(function (res) {
               $scope.response = res.data;
               if (($scope.response.error == 0) || ($scope.response.error == 2)) {
                  $scope.dis_r_nit = true;
                  $scope.dis_r_usuario = true;
                  $scope.correopanel = false;
               } else {
                  swal('Notificación', data.MSJ, 'warning');
               }
            })

         }
         $scope.cargausuarios = function () {
            $http({
               method: 'POST',
               url: "php/login/cargausersips.php",
               data: { nit: $scope.r_nit }
            }).then(function ({ data }) {
               $scope.usuarios = data;
            })
         }
         $scope.actualizacorreo = function () {
            $http({
               method: 'POST',
               url: "php/login/recuperarpass.php",
               data: {
                  function: 'actualizacorreoips',
                  nit: $scope.r_nit,
                  usuario: $scope.r_usuario,
                  new_correo: $scope.r_correo
               }
            }).then(function (res) {
               swal('Notificación', 'Se envió un correo con la contraseña', 'success');
               ngDialog.closeAll();
            });
         }
      }
   ]);
