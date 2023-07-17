'use strict';
angular.module('GenesisApp').controller('consulta_usuario_ips_controller', ['$scope', '$http', 'consultaHTTP', function ($scope, $http, consultaHTTP) {

  $scope.Inicio = function () {
    $scope.consulta_usuario_ips = { usuarios_ips: new Array(), nit: "", nombre: "" };
    $('.modal').modal();
    $scope.fil = { q: '' };

    $scope.limpiarForm = function () {
      $scope.form = {
        nit: "",
        tipoDocumento: [],
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
    }

    $scope.limpiarForm();

    setTimeout(() => {
      consultaHTTP.obtenerDocumento().then(function (response) {
        $scope.tipo_documento = response.Documento;
      });
    }, 1000);
  }

  if (document.readyState !== 'loading') {
    $scope.Inicio();
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      $scope.Inicio();
    });
  }




  $scope.buscar_usuario_ips = function (nit) {
    if (nit != "" && nit != undefined) {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      $http({
        method: 'POST',
        url: "php/cuentasmedicas/consulta_usuario_ips.php",
        data: {
          function: 'buscar_usuario_ips',
          nit: nit
        }
      }).then(function (response) {
        swal.close();
        if (validar_json(angular.toJson(response.data))) {
          if (response.data.length == 0) {
            swal('Mensaje', 'No se encontro ningun resultado para la busqueda del NIT: ' + nit, 'info');
            $scope.consulta_usuario_ips.usuarios_ips = new Array();
            $scope.consulta_usuario_ips.nit = "";
            $scope.consulta_usuario_ips.nombre = "";
          } else {
            $scope.consulta_usuario_ips.usuarios_ips = response.data;
            $scope.consulta_usuario_ips.nit = response.data[0].NIT;
            $scope.consulta_usuario_ips.nombre = response.data[0].NOMBRE_IPS;

            setTimeout(function () {
              document.querySelector('#filtro').value = '';
              $scope.fil = { q: '' };
              $scope.$apply();
              console.log(1)
            }, 1000);

          }
        } else {
          $scope.consulta_usuario_ips.usuarios_ips = new Array();
          $scope.consulta_usuario_ips.nit = "";
          $scope.consulta_usuario_ips.nombre = "";
          swal('Error', 'Error al realizar la busqueda de los usuarios del NIT: ' + nit, 'error');
        }
      });
    } else {
      swal('Advertencia', 'Ingrese un NIT valido para realizar la busqueda', 'warning');
    }
  }
  function validar_json(str) {
    try {
      if (typeof str !== "string") {
        return false;
      } else {
        return (typeof JSON.parse(str) === 'object');
      }
    } catch (e) {
      return false;
    }
  }

  $scope.actualizarAdmin = function (x) {
    swal({
      title: "MENSAJE",
      text: '¿Desea asiganar a ' + x.NOMBRE_USUARIO + ' como administrador?',
      type: "question",
      showCancelButton: true,
      allowOutsideClick: false
    }).catch(swal.noop)
      .then((willDelete) => {
        if (willDelete) {
          var admin = $scope.consulta_usuario_ips.usuarios_ips.find(user => user.TIPO_USUARIO == 'ADMINISTRADOR').USUARIO;
          // swal({ title: 'Cargando...', allowOutsideClick: false });
          // swal.showLoading();
          if (admin != '' && admin != undefined && admin != null) {
            $http({
              method: 'POST',
              url: "php/cuentasmedicas/consulta_usuario_ips.php",
              data: {
                function: 'ActualizarAdmin',
                nit: $scope.NIT_IPS,
                adminAct: admin.toString(),
                adminNew: x.USUARIO,
              }
            }).then(function (response) {

              if (response.data.toString().substr(0, 3) != '<br') {
                if (response.data[0].codigo == '0') {
                  swal({
                    title: "¡Importante!",
                    text: response.data[0].mensaje,
                    type: "success",
                    allowOutsideClick: false
                  }).catch(swal.noop);
                } else {
                  swal({
                    title: "¡Importante!",
                    text: response.data[0].mensaje,
                    type: "warning",
                    allowOutsideClick: false
                  }).catch(swal.noop);
                }
              } else {
                swal({
                  title: "¡Importante!",
                  text: "Ocurrio un error, favor reportar al area TIC nacional",
                  type: "warning",
                }).catch(swal.noop);
              }
              setTimeout(() => {
                $scope.consulta_usuario_ips.usuarios_ips = '';
                $scope.buscar_usuario_ips($scope.NIT_IPS);
              }, 2000);
            });
          }


          setTimeout(() => {
            $scope.$apply();
            // $scope.guardaRutas();
          }, 1000);
        } else {
          swal({
            title: "Mensaje",
            text: 'Operacion Cancelada',
            type: "error",
          }).catch(swal.noop);
        }
      })
  }

  $scope.registrarUserAdmin = function () {
    if ($scope.form.tipoDocumento != "" && $scope.form.numeroId != "" && $scope.form.nombreUser != "" && $scope.form.contrasenna_0 != "" && $scope.form.contrasenna_1 != "" && $scope.form.celular != "" && $scope.form.telefono != "" && $scope.form.correo != "" && $scope.form.cargo != "" && $scope.form.modulos != "" && $scope.form.tipo != "") {
      if ($scope.form.nit != $scope.form.numeroId) {
        if ($scope.form.nombreUser != $scope.form.nombreIps) {
          if ($scope.form.contrasenna_0 == $scope.form.contrasenna_1) {
            if ($scope.form.contrasenna_0.length >= 6) {
              if ($scope.form.celular.toString().length == 10) {
                if ((/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test($scope.form.correo)) {
                  $scope.form.nit = $scope.consulta_usuario_ips.nit;
                  // console.log($scope.form);
                  $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/consulta_usuario_ips.php",
                    data: {
                      function: "registrarUserAdmin",
                      json: JSON.stringify($scope.form)
                    }
                  }).then(function (response) {

                    //   console.log($scope.form);
                    swal.close();
                    if (response.data.Codigo == 0) {
                      swal({
                        title: "Usuario Administrador IPS Creado!",
                        html: "<div class='swal_ips'>Ahora debes iniciar sesion como IPS con los siguientes datos:<br><br>NIT: " + $scope.form.nit + "<br>Usuario: " + $scope.form.numeroId + "<br>Contraseña: " + $scope.form.contrasenna_0 + "</div>",
                        type: "success",
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonText: "Aceptar",
                      }).then(function () {
                        $('#Modal_Nuevo_Admin').modal('close');
                        $scope.consulta_usuario_ips.usuarios_ips = '';
                        $scope.buscar_usuario_ips($scope.NIT_IPS);
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
                        $('#Modal_Nuevo_Admin').modal('close');
                        $scope.consulta_usuario_ips.usuarios_ips = '';
                        $scope.buscar_usuario_ips($scope.NIT_IPS);
                        $scope.limpiarForm();
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

  $scope.Modal_nuevoAdmin = function () {
    $('#Modal_Nuevo_Admin').modal('open');
    setTimeout(() => {
      $scope.$apply();
    }, 500);
  }

  $scope.closeModal = function () {
    $('#Modal_Nuevo_Admin').modal('close');
  }

}]);
