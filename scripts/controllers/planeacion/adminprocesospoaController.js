'use strict';
angular.module('GenesisApp')
  .controller('adminprocesospoaController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {
        console.log($(window).width());
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_Pantalla();

        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $('.tabs').tabs();
        $scope.Tabs = 1;
        $scope.SysDay = new Date();
        $scope.hoja1Limpiar();
        $scope.obtenerListadoFuncs();
        $('.modal').modal();
        setTimeout(() => {
          $scope.$apply();
        }, 500);

        //////////////////////////////////////////////////////////
      }
      $scope.hoja1Limpiar = function () {
        $scope.Hoja1 = {
          Filtro: '',
        };
        $scope.List = {};

        setTimeout(() => {
          $scope.$apply();
        }, 300);
      }

      $scope.obtenerListadoFuncs = function (x) {
        // Recibe x para no mostrar swalLoading
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $scope.List.listadoFuncionarios = [];

        // if (!x) swal.close();
        $http({
          method: 'POST',
          url: "php/planeacion/adminprocesospoa.php",
          data: {
            function: 'p_consulta_usuario'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          $scope.List.listadoFuncionarios = data;
          console.log(data);
          setTimeout(() => { $scope.$apply(); }, 500);
        });
      }


      $scope.obtenerTipoUsuario = function (tipoUsuario) {

        const tipos = {
          AS: "Administrador del Sistema",
          AM: "Administrador del Módulo",
          US: "Usuario",
          // UP: "Usuario Sin Permiso de Edición",
          IN: "Invitado"
        };

        return tipos[tipoUsuario] || "Tipo de usuario desconocido";

      }


      $scope.agregarUsuario = function () {
        swal({
          title: 'Agregar Nuevo Usuario',
          text: 'Ingrese la cédula del funcionario',
          input: 'text',
          inputPlaceholder: 'Ingrese la cédula...',
          showCancelButton: false,
          confirmButtonText: "Aceptar",
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
              width: 200,
              showConfirmButton: false,
              animation: false
            });
            $http({
              method: 'POST',
              url: "php/planeacion/adminprocesospoa.php",
              data: {
                function: 'p_actualiza_funcs',
                codigo: result,
                tipo: 'IN',
                estado: 'A',
                responsable: $scope.Rol_Cedula
              }
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) == '<br' || data == 0) {
                swal("Error", 'Sin datos', "warning").catch(swal.noop); return
              }
              if (data.Codigo == 0) {
                swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                $scope.obtenerListadoFuncs(1);
              }
              if (data.Codigo == 1) {
                swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
              }
            });
          }
        }).catch(swal.noop);
      }

      $scope.editarUsuario = function (data) {
        $scope.modalUsuario = {}
        $scope.modalUsuario.cedula = data.TERV_CODIGO;
        $scope.modalUsuario.nombre = data.TERC_NOMBRE;
        $scope.modalUsuario.estado = data.TERC_ESTADO_ADMIN_PLANEACION;
        $scope.modalUsuario.tipoUsuario = data.TERC_TIPO_ADMIN_PLANEACION;
        // $scope.modalUsuario.fechaRegistro = data.FECHA_REGISTRO;
        $scope.openModal('modalUsuario')
        setTimeout(() => { $scope.$apply(); }, 500);
      }


      $scope.modificarUsuario = function (x) {
        swal({
          title: '¿Desea actualizar el estado del funcionario?',
          text: x.nombre,
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
              width: 200,
              showConfirmButton: false,
              animation: false
            });
            $http({
              method: 'POST',
              url: "php/planeacion/adminprocesospoa.php",
              data: {
                function: 'p_actualiza_funcs',
                codigo: x.cedula,
                tipo: x.tipoUsuario,
                estado: x.estado,
                responsable: $scope.Rol_Cedula
              }
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) == '<br' || data == 0) {
                swal("Error", 'Sin datos', "warning").catch(swal.noop); return
              }
              if (data.Codigo == 0) {
                swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                $scope.closeModal();
                $scope.obtenerListadoFuncs(1);
              }
              if (data.Codigo == 1) {
                swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
              }
            });
          }
        }).catch(swal.noop);
      }





      $scope.openModal = function (modal) {
        $(`#${modal}`).modal('open');
      }
      $scope.closeModal = function () {
        $(".modal").modal("close");
      }

      $scope.SetTab = function (x) {
        $scope.Tabs = x;
      }

      $scope.Ajustar_Pantalla = function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        // if ($(window).width() < 1100) {
        //   document.querySelector("#pantalla").style.zoom = 0.7;
        // }
        // if ($(window).width() > 1100 && $(window).width() < 1300) {
        //   document.querySelector("#pantalla").style.zoom = 0.7;
        // }
        // if ($(window).width() > 1300 && $(window).width() < 1500) {
        //   document.querySelector("#pantalla").style.zoom = 0.8;
        // }
        // if ($(window).width() > 1500) {
        //   document.querySelector("#pantalla").style.zoom = 0.9;
        // }
      }

      $(window).on('resize', function () {
        $scope.Ajustar_Pantalla();
      });

      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

    }]);
