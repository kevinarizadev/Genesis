'use strict';
angular.module('GenesisApp')
  .controller('confdefuncionariosController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {
        $scope.Tabs = 1;
        console.log($(window).width());
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1300 && $(window).width() < 1500) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1500) {
          document.querySelector("#pantalla").style.zoom = 0.9;
        }
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Tabs = 0;
        $('.tabs').tabs();
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');

        $scope.Vista = 0;

        $scope.SysDay = new Date();
        $scope.Hoja_Limpiar();
        setTimeout(() => {
          $scope.$apply();
        }, 500);
        //////////////////////////////////////////////////////////
      }
      // 12964797
      $scope.Hoja_Limpiar = function () {
        $scope.Form = {
          Status: 0,

          Cedula: '',
          Cedula_Usu: '',
          Nombre_Usu: '',
          Area: '',
          Cargo: '',
          Rol: '',
          Seccional: '',
          Sede: '',

          Roles: []

        };
        $scope.Busqueda = {
          Usuario: {
            Filtro: [],
            Listado: null,
            SAVE: null,
            Seleccion: 9999
          }
        };
        $scope.Obtener_Roles();
        ///

        $scope.Observacion_Permisos = '';
        document.querySelectorAll(".Valid_Campo").forEach(e => {
          e.classList.remove("Valid_Campo");
        });
        angular.forEach(document.querySelectorAll('.Form_Desactivados input'), function (i) {
          i.setAttribute("readonly", true);
        });
        setTimeout(() => {
          $scope.Form.Cedula = '';
          $scope.$apply();
        }, 100);
      }

      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      $scope.KeyFind_Usuario = function (keyEvent) {
        if (keyEvent.which === 13)
          $scope.Buscar_Usuario(1);
      }
      $scope.Buscar_Usuario = function (X) {
        if ($scope.Form.Cedula.length > 3) {
          if (X) {
            swal({ title: 'Cargando...' });
            swal.showLoading();
          }
          $http({
            method: 'POST',
            url: "php/talentohumano/confdefuncionarios.php",
            data: {
              function: 'Buscar_Usuario',
              Cedula: $scope.Form.Cedula,
            }
          }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data[0] != undefined) {
                if (response.data.length == 1 && response.data[0].Codigo == undefined) {
                  $scope.Form.Cedula_Usu = response.data[0].Documento;
                  $scope.Form.Nombre_Usu = response.data[0].Nombre;
                  $scope.Form.Usuario = response.data[0].Usuario;
                  $scope.Form.Area = response.data[0].Area;
                  $scope.Form.Cargo = response.data[0].Cargo;
                  $scope.Form.Rol = response.data[0].Rol;
                  $scope.Form.Seccional = response.data[0].Seccional;
                  $scope.Form.Sede = response.data[0].Municipio;
                  $scope.Form.Status = 1;
                } else {
                  $scope.Form.Status = 0;
                   swal({
                    title: "¡Importante!",
                    text: "No se encontraron registros",
                    type: "warning"
                  }).catch(swal.noop);
                }
                if (X) {
                  swal.close();
                }
                ////////////////////////////////////////////////////////////////////////
                setTimeout(() => {
                  $scope.$apply();
                }, 2000);
              } else {
                swal({
                  title: "¡Importante!",
                  text: "No se encontraron registros",
                  type: "warning"
                }).catch(swal.noop);
              }
            } else {
              swal({
                title: "¡Importante!",
                text: response.data,
                type: "warning"
              }).catch(swal.noop);
            }
          });
        } else {
          Materialize.toast('¡Ingrese una cedula valida!', 3000);
        }
      }

      $scope.Obtener_Roles = function () {
        $http({
          method: 'POST',
          url: "php/talentohumano/confdefuncionarios.php",
          data: {
            function: 'Obtener_Roles'
          }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br') {
            if (response.data[0] != undefined) {
              $scope.Form.Roles = response.data;
            }
          }
        });
      }

      $scope.Cambiar_Rol = function () {
        var xArray = $scope.Form.Roles;
        var options = {};
        $.map(xArray,
          function (o) {
            options[o.codigo] = o.Nombre;
          });
        swal({
          title: 'Seleccione el rol',
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
        }).then(function (cod) {
          if (cod) {
            swal({ title: 'Cargando...', allowOutsideClick: false });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/talentohumano/confdefuncionarios.php",
              data: {
                function: 'Guardar_R_C_H',
                Accion: 'R',
                Rol: cod,
                Clave: '',
                Usu: $scope.Form.Usuario,
                Doc: $scope.Form.Cedula_Usu,
                Homologo: ''
              }
            }).then(function (response) {
              $scope.Buscar_Usuario();
              if (response.data[0].Codigo != undefined) {
                if (response.data[0].Codigo == 1) {
                  $scope.Observacion = '';
                  swal({
                    title: "Mensaje",
                    text: '¡Rol Actualizado Correctamente!',
                    type: "success",
                  }).catch(swal.noop);
                } else {
                  swal({
                    title: 'Importante',
                    text: 'Ocurrio un error',
                    type: "warning",
                  }).catch(swal.noop);
                }
              }
            });
          } else {
            Materialize.toast('¡Seleccion una opcion valida!', 3000);
          }
        }).catch(swal.noop);
      }

      $scope.Cambiar_Pass = function () {
        swal({
          title: 'Nueva Contraseña',
          text: 'La contraseña debe ser minimo de 8 caracteres y debe contener al menos una letra en mayuscula, un numero y un caracter especial',
          input: 'text',
          inputPlaceholder: 'Escribe la nueva contraseña...',
          showCancelButton: true,
          allowOutsideClick: false,
          inputValue: 'Cajacopi2021.',
          inputAttributes: {
            id: "textarea_swal_Pass",
            onkeyup: "Format_Pass()"
          }
        }).then(function (result) {
          $scope.Observacion_Pass = result;
          if ($scope.Observacion_Pass.length > 7) {
            var Regex = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$");
            if (Regex.test(result.toString())) {
              swal({ title: 'Cargando...', allowOutsideClick: false }).catch(swal.noop);
              swal.showLoading();
              $http({
                method: 'POST',
                url: "php/talentohumano/confdefuncionarios.php",
                data: {
                  function: 'Guardar_R_C_H',
                  Accion: 'C',
                  Rol: '',
                  Clave: result,
                  Usu: $scope.Form.Usuario,
                  Doc: $scope.Form.Cedula_Usu,
                  Homologo: ''
                }
              }).then(function (response) {
                $scope.Buscar_Usuario();
                if (response.data[0].Codigo != undefined) {
                  if (response.data[0].Codigo == 1) {
                    $scope.Observacion_Pass = '';
                    swal({
                      title: "Mensaje",
                      text: '¡Clave Actualizada Correctamente!',
                      type: "success",
                    }).catch(swal.noop);
                  } else {
                    swal({
                      title: 'Importante',
                      text: 'Ocurrio un error',
                      type: "warning",
                    }).catch(swal.noop);
                  }
                }
              });
            } else {
              Materialize.toast('¡Contraseña Invalida!', 3000);
            }
          } else {
            Materialize.toast('¡Longitud de la Contraseña Invalida!', 3000);
          }
        }).catch(swal.noop);
      }

      $scope.Cambiar_Permisos = function () {
        swal({
          title: 'Asignar Permisos',
          text: 'Ingrese la cédula del funcionario para copiar sus modulos.',
          input: 'text',
          inputPlaceholder: 'Ingrese la cédula...',
          showCancelButton: false,
          confirmButtonText: "Aceptar",
          inputValue: $scope.Observacion_Permisos,
          allowOutsideClick: false
        }).then(function (result) {
          $scope.Observacion_Permisos = result;
          if (result && result != $scope.Rol_Cedula) {
            swal({ title: 'Cargando...', allowOutsideClick: false });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/talentohumano/confdefuncionarios.php",
              data: {
                function: 'Guardar_R_C_H',
                Accion: 'H',
                Rol: '',
                Clave: '',
                Usu: $scope.Form.Usuario,
                Doc: $scope.Form.Cedula_Usu,
                Homologo: result
              }
            }).then(function (response) {
              $scope.Buscar_Usuario();
              if (response.data[0].Codigo != undefined) {
                if (response.data[0].Codigo == 1) {
                  $scope.Observacion_Permisos = '';
                  swal({
                    title: "Mensaje",
                    text: '¡Modulos Actualizados Correctamente!',
                    type: "success",
                  }).catch(swal.noop);
                } else {
                  swal({
                    title: 'Importante',
                    text: 'Ocurrio un error',
                    type: "warning",
                  }).catch(swal.noop);
                }
              }
            });

          } else {
            Materialize.toast('¡Ingrese una Cedula!', 3000);
          }
        }).catch(swal.noop);
      }

      $scope.Volver = function () {
        $scope.Form.Status = $scope.Form.Status - 1;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
      //////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
      //CONSULTA USUARIO ASIGNADA
      $scope.KeyFind_ObUsuario = function (keyEvent) {
        if ($scope.Busqueda.Ips.Filtro != null && $scope.Busqueda.Ips.Filtro.length != 0) {
          if (keyEvent.which === 40) {
            $scope.Busqueda.Ips.Seleccion = $scope.Busqueda.Ips.Seleccion >= ($scope.Busqueda.Ips.Filtro.length - 1) ? 0 : $scope.Busqueda.Ips.Seleccion + 1;
            document.querySelector('.Clase_Listar_Ips').scrollTo(0, document.querySelector('#Ips' + $scope.Busqueda.Ips.Seleccion).offsetTop);
          } else if (keyEvent.which === 38) {
            $scope.Busqueda.Ips.Seleccion = $scope.Busqueda.Ips.Seleccion <= 0 || $scope.Busqueda.Ips.Seleccion == 9999 ? $scope.Busqueda.Ips.Filtro.length - 1 : $scope.Busqueda.Ips.Seleccion - 1;
            document.querySelector('.Clase_Listar_Ips').scrollTo(0, document.querySelector('#Ips' + $scope.Busqueda.Ips.Seleccion).offsetTop)
          } else if (keyEvent.which === 13 && $scope.Busqueda.Ips.Seleccion != 9999) {
            var x = $scope.Busqueda.Ips.Filtro[$scope.Busqueda.Ips.Seleccion];
            $scope.FillTextbox_Listado_Usuario(x.Cedula, x.nombre_ips);
          }
        } else {
          if (keyEvent.which === 13)
            $scope.Buscar_ObUsuario();
        }
      }
      $scope.Buscar_ObUsuario = function () {
        if ($scope.Form.Cedula.length > 2) {
          $http({
            method: 'POST',
            url: "php/talentohumano/confdefuncionarios.php",
            data: {
              function: 'Obtener_Usuario',
              Coinc: $scope.Form.Cedula.toUpperCase(),
            }
          }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data[0] != undefined && response.data.length > 1) {
                $scope.Busqueda.Usuario.Filtro = response.data;
                $scope.Busqueda.Usuario.Listado = response.data;
                $('.Clase_Listar_Usuario').css({ width: $('#Form_Cedula')[0].offsetWidth });
              }
              if (response.data.length == 1) {
                if (response.data[0].Codigo == '1') {
                  swal({
                    title: "¡Mensaje!",
                    text: response.data[0].Nombre,
                    type: "info",
                  }).catch(swal.noop);
                  $scope.Busqueda.Usuario.Filtro = null;
                  $scope.Busqueda.Usuario.Listado = null;
                } else {
                  $scope.FillTextbox_Listado_Usuario(response.data[0].codigo, response.data[0].nombre);
                }
              } else if (response.data.length == 0) {
                swal({
                  title: "¡Importante!",
                  text: "No se encontro el funcionario",
                  type: "info",
                }).catch(swal.noop);
              }
            } else {
              swal({
                title: "¡IMPORTANTE!",
                text: response.data,
                type: "warning"
              }).catch(swal.noop);
            }
          })
        } else {
          Materialize.toast('¡Digite al menos 3 caracteres!', 1000);
        }
      }
      $scope.Complete_Listado_Usuario = function (keyEvent, string) {
        if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
          if ($scope.Form.Cedula_Usu != undefined && string != undefined && $scope.Busqueda.Ips.Listado != undefined) {
            $('.Clase_Listar_Usuario').css({ width: $('#Form_Cedula')[0].offsetWidth });
            var output = [];
            angular.forEach($scope.Busqueda.Ips.Listado, function (x) {
              if (x.nombre.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.codigo.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                output.push({ "codigo": x.codigo, "nombre": x.nombre.toUpperCase() });
              }
            });
            $scope.Busqueda.Usuario.Filtro = output;
            $scope.Busqueda.Usuario.Seleccion = 9999;
          }
        }
      }
      $scope.FillTextbox_Listado_Usuario = function (codigo) {
        $scope.Form.Cedula_Usu = codigo;
        setTimeout(() => {
          $scope.Buscar_Usuario(1);
        }, 500);
        $scope.Busqueda.Usuario.Listado = null;
        $scope.Busqueda.Usuario.Filtro = null;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////

      $(window).on('resize', function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1300 && $(window).width() < 1500) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1500) {
          document.querySelector("#pantalla").style.zoom = 0.9;
        }
      });

      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

    }]);
function Format_Pass() {
  const input = document.querySelectorAll('#textarea_swal_Pass')[5];
  var valor = input.value;
  // valor = valor.replace(/[|!¡¿?°"#%{}*&''`´¨<>]/g, '');
  valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
  input.value = valor;
}
