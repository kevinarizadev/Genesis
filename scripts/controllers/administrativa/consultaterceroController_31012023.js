'use strict';
angular.module('GenesisApp')
  .controller('consultaterceroController', ['$scope', '$http',
    function ($scope, $http) {
      $(document).ready(function () {
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
        $scope.Cargar_Clase();
        setTimeout(() => {
          $scope.$apply();
        }, 500);
        //////////////////////////////////////////////////////////
      });
      // 12964797
      $scope.Hoja_Limpiar = function () {
        $scope.Form = {
          Status: 0,

          Nit: '',
          Nit_Ips: '',
          Tipo_Doc: '',
          Documento: '',
          Nombre: '',
          Representante: '',
          Direccion: '',
          Telefono: '',
          Municipio: '',
          Especialidad: '',
          Grupo_Cuenta: '',
          Tipo_Impuesto: '',
          Proveedor: '',
          Prestador_Salud: '',
          F_Ingreso: '',
          Estado: '',
          Clase: '',
          Prestador_salud: '',
          Prestador_tecnologia: '',
          Naturaleza: '',
          UnionTemporal: '',
        };

        ///
        document.querySelectorAll(".Valid_Campo").forEach(e => {
          e.classList.remove("Valid_Campo");
        });
        setTimeout(() => {
          // $scope.Form.Nit_Ips = '900600256';
          $scope.Form.Nit_Ips = '';
          $scope.$apply();
        }, 100);
      }

      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      $scope.KeyFind_Ips = function (keyEvent) {
        if (keyEvent.which === 13)
          $scope.Buscar_Ips();
      }
      $scope.Buscar_Ips = function () {
        document.querySelector("#Form_Nit_Ips").classList.remove("Valid_Campo");
        if ($scope.Form.Nit_Ips.length > 2) {
          swal({ title: 'Cargando...' });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/administrativa/consultatercero.php",
            data: {
              function: 'P_OBTENER_TERCERO',
              Nit: $scope.Form.Nit_Ips,
            }
          }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data[0] != undefined) {
                $scope.Datos = response.data;
                if ($scope.Datos.length == 1) {
                  $scope.Mostrar_Form(0);
                } else {
                  $scope.Form.Status = 1;
                }
                swal.close();
                ////////////////////////////////////////////////////////////////////////
                setTimeout(() => {
                  $scope.$apply();
                }, 2000);
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
          document.querySelector("#Form_Nit_Ips").classList.add("Valid_Campo");
          Materialize.toast('¡Digite el Nit del Tercero a consultar!', 3000);
        }
      }

      $scope.Cargar_Clase = function () {
        $http({
          method: 'POST',
          url: "php/administrativa/consultatercero.php",
          data: {
            function: 'P_LISTA_CLASE_IPS'
          }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br') {
            if (response.data[0] != undefined) {
              $scope.List_Clase = response.data;
              ////////////////////////////////////////////////////////////////////////
              setTimeout(() => {
                $scope.$apply();
              }, 200);
            }
          } else {
            swal({
              title: "¡Importante!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }

      $scope.Mostrar_Form = function (index) {
        $scope.Form.Status = 2;
        $scope.Form.Nit = $scope.Form.Nit_Ips;
        $scope.Form.Tipo_Doc = $scope.Datos[index].tipo_documento;
        $scope.Form.Documento = $scope.Datos[index].codigo;
        $scope.Form.Nombre = $scope.Datos[index].razon_social;
        $scope.Form.Representante = $scope.Datos[index].representante;
        $scope.Form.Direccion = $scope.Datos[index].direccion;
        $scope.Form.Telefono = $scope.Datos[index].telefono;
        $scope.Form.Municipio = $scope.Datos[index].ubicacion_geografica;
        $scope.Form.Especialidad = $scope.Datos[index].especialidad;
        $scope.Form.Grupo_Cuenta = $scope.Datos[index].grupo_cuenta;
        $scope.Form.Tipo_Impuesto = $scope.Datos[index].tipo_impuesto;
        $scope.Form.Proveedor = $scope.Datos[index].proveedor;
        $scope.Form.Prestador_Salud = $scope.Datos[index].prestador_salud;
        var fecha_ingreso = new Date($scope.Datos[index].fecha_ingreso);
        $scope.Form.F_Ingreso = fecha_ingreso;
        $scope.Form.Estado = $scope.Datos[index].estado;
        $scope.Form.Clase = $scope.Datos[index].clase_ips;
        $scope.Form.Prestador_salud = ($scope.Datos[index].prestador_salud == '' || $scope.Datos[index].prestador_salud == 'N' ? 'N' : 'S');
        $scope.Form.Prestador_tecnologia = ($scope.Datos[index].prestador_tecnologia == '' || $scope.Datos[index].prestador_tecnologia == 'N' ? 'N' : 'S');
        $scope.Form.Naturaleza = $scope.Datos[index].naturaleza;
        $scope.Form.UnionTemporal = $scope.Datos[index].union_temporal;

        setTimeout(() => {
          document.querySelector("#Form_Telefono").dispatchEvent(new KeyboardEvent('keyup'));
          $scope.Bloquear_Campos();
        }, 500);
      }

      $scope.Volver = function () {
        if ($scope.Datos.length == 1) {
          $scope.Form.Status = 0;
        }
        if ($scope.Datos.length > 1) {
          $scope.Form.Status == 2 ? $scope.Form.Status = 1 : $scope.Form.Status = 0;
        }
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////

      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////

      $scope.Bloquear_Campos = function () {
        angular.forEach(document.querySelectorAll('.Form_Desactivados input'), function (i) {
          i.setAttribute("readonly", true);
        });
      }


      $scope.Actualiza_Info = function () {
        swal({
          title: 'Importante',
          text: "¿Desea actualizar la información?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then(function (result) {
          if (result) {
            swal({ title: 'Cargando...' });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/administrativa/consultatercero.php",
              data: {
                function: 'P_UI_TERCERO_MINUTA',
                Nit: $scope.Form.Nit_Ips,
                Clase: $scope.Form.Clase,
                Prestador_salud: $scope.Form.Prestador_salud,
                Prestador_tecnologia: $scope.Form.Prestador_tecnologia,
                Naturaleza: $scope.Form.Naturaleza
              }
            }).then(function (response) {
              swal.close();
              if (response.data.toString().substr(0, 3) != '<br') {
                if (response.data.Codigo != undefined) {
                  swal({
                    title: "¡Importante!",
                    text: response.data.Nombre,
                    type: "success"
                  }).catch(swal.noop);
                  setTimeout(function () { $scope.Buscar_Ips(); }, 2000);
                  ////////////////////////////////////////////////////////////////////////
                  setTimeout(() => {
                    $scope.$apply();
                  }, 200);
                } else {
                  swal({
                    title: "¡Importante!",
                    text: response.data,
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
          }
        });
      }
      //////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////

      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////

      $scope.FormatSoloNumeroTelefono = function (NID) {
        const input_2 = document.getElementById('' + NID + '');
        const valor = input_2.value.replace(/[^0-9]/g, '');
        input_2.value = valor;

        const target = input_2;
        const input = input_2.value.replace(/\D/g, '').substring(0, 10);
        const zip = input.substring(0, 3);
        const last = input.substring(3, 7);

        if (input.length > 3) { target.value = `${zip} - ${last}`; }
        else if (input.length > 0) { target.value = `${zip}`; }
        document.querySelector("#" + NID).classList.remove("Valid_Campo");
        if (target.value.length != 10) {
          document.querySelector("#" + NID).classList.add("Valid_Campo");
        }
      }

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

    }]);
