'use strict';
angular.module('GenesisApp')
  .controller('usuarioadministradorController', ['$scope', '$http', 'consultaHTTP', 'menuopcioneshttp', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window', '$location', '$anchorScroll',
    function ($scope, $http, consultaHTTP, menuopcioneshttp, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window, $location, $anchorScroll) {
      $scope.vista = { form: true };
      $scope.form = {
        nit: "",
        nombreIps: "",
        tipoDocumento: "",
        numeroId: "",
        nombreUser: "",
        contrasenna_0: "",
        contrasenna_1: "",
        celular: "",
        telefono: "",
        correo: "",
        cargo: "",
        modulos: '[{"titulo":"Autorización","icono":"icon-ok-outline","options":[{"titulo":"Solicitud","url":"mara.autorizacion","id":""}]},{"titulo":"Consulta Afiliado","icono":"icon-user","options":[{"titulo":"Datos Básicos IPS","url":"mara.consulta-afiliadoips","id":""}]},{"titulo":"Mesa de Ayuda","icono":"icon-slideshare-1","options":[{"titulo":"Mesa de ayuda ips","url":"mara.mesadeayudaips","id":""}],"id":""},{"titulo":"Siau","icono":"icon-headphones","options":[{"titulo":"Codigo Urgencia ips","url":"mara.codigourgenciaips","id":""}],"id":""},{"titulo":"Cuentas Medicas","icono":"icon-clipboard-2","options":[{"titulo":"Radicacion de RIPS","url":"mara.radicacionrips","id":"5-0"},{"titulo":"Mis Cargues","url":"mara.carguesrips","id":"5-1"},{"titulo":"Reporte Validado","url":"mara.ripsvalidado","id":""},{"titulo":"Reporte Radicado","url":"mara.ripsradicado","id":""}],"id":5},{"titulo":"Administrar Acceso","icono":"icon-key-4","options":[{"titulo":"Lista de usuarios IPS","url":"mara.listarcuentas","id":""}]},{"titulo":"Financiera","icono":"icon-dollar","options":[{"titulo":"Pagos IPS","url":"mara.pagosips","id":""}]},{"titulo":"Sesion","icono":"icon-logout-3","options":[{"titulo":"Cerrar Sesión","url":"mara.logout","id":""}]}]',
        tipo: "A"
      };
      $http({
        method: 'GET',
        url: "php/obtenersession.php"
      }).then(function (response) {
        $scope.form.nit = response.data.nit;
        $scope.form.nombreIps = response.data.nomips;
      });
      consultaHTTP.obtenerDocumento().then(function (response) {
        $scope.tipo_documento = response.Documento;
      });
      $scope.registrarUserAdmin = function () {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        if ($scope.form.nit != "" && $scope.form.nombreIps != "" && $scope.form.tipoDocumento != "" && $scope.form.numeroId != "" && $scope.form.nombreUser != "" && $scope.form.contrasenna_0 != "" && $scope.form.contrasenna_1 != "" && $scope.form.celular != "" && $scope.form.telefono != "" && $scope.form.correo != "" && $scope.form.cargo != "" && $scope.form.modulos != "" && $scope.form.tipo != "") {
          if ($scope.form.nit != $scope.form.numeroId) {
            if ($scope.form.nombreUser != $scope.form.nombreIps) {
            if ($scope.form.contrasenna_0 == $scope.form.contrasenna_1) {
              if ($scope.form.contrasenna_0.length >= 6) {
                if ($scope.form.celular.toString().length == 10) {
                  if ((/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test($scope.form.correo)) {
                    $http({
                      method: 'POST',
                      url: "php/adminusuariosIPS/usuarioadministrador/usuarioadministrador.php",
                      data: {
                        function: "registrarUserAdmin",
                        json: JSON.stringify($scope.form)
                      }
                    }).then(function (response) {
                      console.log($scope.form);
                      swal.close();
                      if (response.data.Codigo == 0) {
                        swal({
                          title: "Usuario Administrador IPS Creado!",
                          html: "<div class='swal_ips'>Ahora debes iniciar sesion como IPS con los siguientes datos:<br><br>NIT: " + $scope.form.nit + "<br>Usuario: " + $scope.form.numeroId + "<br>Contraseña: " + $scope.form.contrasenna_0 + "</div>",
                          type: "success",
                          allowOutsideClick: false,
                          allowEscapeKey: false,
                          confirmButtonText: "Aceptar",
                          className: "swal_ips"
                        }).then(function () {
                          window.location.href = 'php/cerrarsession.php';
                        });
                      } else {
                        swal({
                          title: "Error Creando Usuario Administrador IPS",
                          type: "error",
                          allowOutsideClick: false,
                          allowEscapeKey: false,
                          confirmButtonText: "Aceptar",
                          className: "swal_ips"
                        }).then(function () {
                          window.location.href = 'php/cerrarsession.php';
                        });
                      }
                    });
                  } else {
                    swal.close();
                    swal('Error de correo', 'Correo ingresado no valido.', 'warning');
                  }
                } else {
                  swal.close();
                  swal('Error de celular', 'Numero ingresado no valido.', 'warning');
                }
              } else {
                swal.close();
                swal('Error de contraseñas', 'La contraseña debe ser mayor o igual a 6 dígitos.', 'warning');
              }
            } else {
              swal.close();
              swal('Error de contraseñas', 'La contraseña de verificación no coincide.', 'warning');
            }
          } else {
            swal.close();
            swal('Error de Nombre del Usuario', 'El Nombre Completo del Usuario no puede ser igual al Nombre de la IPS.', 'warning');
          }
          } else {
            swal.close();
            swal('Error de Número de Identificación', 'El Número de Identificación no puede ser igual al NIT.', 'warning');
          }
        } else {
          swal.close();
          swal('Campos vacios', 'Por favor, llenar todos los campos obligatorios *', 'warning');
        }
      }
    }])