'use strict';
angular.module('GenesisApp')
  .controller('admintutelasController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {
        console.log($(window).width());
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_Pantalla();

        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $('.tabs').tabs();
        $scope.Tabs = 1;
        $scope.SysDay = new Date();
        $scope.listLimpiar();
        $scope.hoja1Limpiar();
        $scope.hoja2Limpiar();
        $scope.obtenerListadoFuncs();
        $scope.obtenerListadoCausas();
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

        setTimeout(() => {
          $scope.$apply();
        }, 300);
      }


      $scope.listLimpiar = function () {
        $scope.List = {
          listadoFuncionarios: [],
          listadoCausas: [
            {
              CODIGO: '1',
              NOMBRE: 'SALUD',
              CANTIDAD: '5',
              ESTADO: 'A',
            }
          ],
          listadoMotivos: [],
        };
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
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/admintutelas.php",
          data: {
            function: 'p_listar_funcs'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            $scope.List.listadoFuncionarios = data;
          } else {
            if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            swal("¡Importante!", data, "warning").catch(swal.noop);
          }
        });
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
            $http({
              method: 'POST',
              url: "php/juridica/tutelas/admintutelas.php",
              data: {
                function: 'p_insertar_funcs',
                cedula: result,
                responsable: $scope.Rol_Cedula
              }
            }).then(function ({ data }) {
              if (data != undefined) {
                if (data.codigo == 0) {
                  swal({
                    title: "Mensaje",
                    text: data.mensaje,
                    type: "success",
                  }).catch(swal.noop);
                  $scope.obtenerListadoFuncs(1);
                }
                if (data.codigo == 1) {
                  swal({
                    title: "Mensaje",
                    text: data.mensaje,
                    type: "warning",
                  }).catch(swal.noop);
                }
              }
            });
          }
        }).catch(swal.noop);
      }

      $scope.modificarUsuario = function (x, accion, estado) {
        // swal({
        //   title: '¿Desea actualizar el estado del funcionario?',
        //   text: X.NOMBRE,
        //   showCancelButton: true,
        //   confirmButtonText: "Confirmar",
        //   cancelButtonText: "Cancelar",
        //   allowOutsideClick: false
        // }).then(function (result) {
        //   if (result) {
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/admintutelas.php",
          data: {
            function: 'p_actualiza_funcs',
            cedula: x.CEDULA,
            accion,
            estado,
            responsable: $scope.Rol_Cedula
          }
        }).then(function ({ data }) {
          if (data != undefined) {
            if (data.codigo == 0) {
              swal({
                title: "Mensaje",
                text: data.mensaje,
                type: "success",
                timer: 1000
              }).catch(swal.noop);
              $scope.obtenerListadoFuncs(1);
            }
            if (data.codigo == 1) {
              swal({
                title: "Mensaje",
                text: data.mensaje,
                type: "warning",
              }).catch(swal.noop);
            }
          }
        });
        //   }
        // }).catch(swal.noop);
      }



      //////////// CAUSAS ////////////
      $scope.hoja2Limpiar = function () {
        $scope.Hoja2 = {
          FiltroCausa: '',
          idCausa: '',
          nombreCausa: '',
          estadoCausa: '',
          seleccionadoCausa: '',


          FiltroMotivo: '',
          idMotivo: '',
          nombreMotivo: '',
          estadoMotivo: '',


        };

        setTimeout(() => {
          $scope.$apply();
        }, 300);
      }

      $scope.obtenerListadoCausas = function (x) {
        // Recibe x para no mostrar swalLoading
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });

        $http({
          method: 'POST',
          url: "php/juridica/tutelas/admintutelas.php",
          data: {
            function: 'p_lista_concepto'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            $scope.List.listadoCausas = data;
            $scope.Hoja2.seleccionadoCausa = '';
            $scope.List.listadoMotivos = [];
            setTimeout(() => { $scope.$apply(); }, 500);
          } else {
            if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            swal("¡Importante!", data, "warning").catch(swal.noop);
          }
        });
      }

      $scope.agregarCausa = function () {
        swal({
          title: 'Agregar Nueva Causas',
          input: 'text',
          inputPlaceholder: 'Ingrese el nombre...',
          showCancelButton: false,
          confirmButtonText: "Aceptar",
          // allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            $http({
              method: 'POST',
              url: "php/juridica/tutelas/admintutelas.php",
              data: {
                function: 'p_ui_conceptos',
                
                causa: result.toString().substr(0,2),
                nombre: result,
                estado: 'A',
                accion: 'I' // UPDATE
              }
            }).then(function ({ data }) {
              if (data != undefined) {
                if (data.Codigo == 0) {
                  swal({
                    title: "Mensaje",
                    text: data.Nombre,
                    type: "success",
                  }).catch(swal.noop);
                  $scope.obtenerListadoCausas(1);
                }
                if (data.Codigo == 1) {
                  swal({
                    title: "Mensaje",
                    text: data.Nombre,
                    type: "warning",
                  }).catch(swal.noop);
                }
              }
            });
          }
        }).catch(swal.noop);
      }

      $scope.editarCausa = function (x) {
        // return
        $scope.Hoja2.idCausa = x.CONCEPTO;
        $scope.Hoja2.nombreCausa = x.NOMBRE;
        $scope.Hoja2.estadoCausa = x.ESTADO;
        $scope.openModal('modal_Causa');
        $scope.Hoja2.seleccionadoCausa = '';
        $scope.List.listadoMotivos = [];
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.modificarCausa = function () {
        if ($scope.Hoja2.nombreCausa.toString().length == 0) {
          swal("¡Importante!", "Complete todos los datos", "info").catch(swal.noop);
        }
        if ($scope.Hoja2.estadoCausa.toString().length == 0) {
          swal("¡Importante!", "Complete todos los datos", "info").catch(swal.noop);
        }
        // swal({
        //   title: '¿Desea actualizar el estado del funcionario?',
        //   text: X.NOMBRE,
        //   showCancelButton: true,
        //   confirmButtonText: "Confirmar",
        //   cancelButtonText: "Cancelar",
        //   allowOutsideClick: false
        // }).then(function (result) {
        //   if (result) {
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/admintutelas.php",
          data: {
            function: 'p_ui_conceptos',
            causa: $scope.Hoja2.idCausa,
            nombre: $scope.Hoja2.nombreCausa,
            estado: $scope.Hoja2.estadoCausa,
            accion: 'U'
            
          }
        }).then(function ({ data }) {
          if (data != undefined) {
            if (data.Codigo == 0) {
              swal({
                title: "Mensaje",
                text: data.Nombre,
                type: "success",
                timer: 1000
              }).catch(swal.noop);
              $scope.obtenerListadoCausas(1);
              $scope.closeModal();
            }
            if (data.Codigo == 1) {
              swal({
                title: "Mensaje",
                text: data.Nombre,
                type: "warning",
              }).catch(swal.noop);
            }
          }
        });
        //   }
        // }).catch(swal.noop);
      }


      //////////// MOTIVOS ////////////
      $scope.obtenerListadoMotivos = function (idCausa, x) {
        // Recibe x para no mostrar swalLoading
        if (!x) {
          if ($scope.Hoja2.seleccionadoCausa != idCausa) {
            $scope.Hoja2.seleccionadoCausa = idCausa;
          } else {
            $scope.Hoja2.seleccionadoCausa = '';
            $scope.List.listadoMotivos = []; return
          }
        }

        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $scope.List.listadoMotivos = [];
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/admintutelas.php",
          data: {
            function: 'p_listar_motivos',
            idCausa
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            $scope.List.listadoMotivos = data;
          } else {
            if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            swal("¡Importante!", data, "warning").catch(swal.noop);
          }
        });
      }
      $scope.agregaMotivo = function () {
        swal({
          title: 'Agregar Nuevo Motivo',
          input: 'text',
          inputPlaceholder: 'Ingrese el nombre...',
          showCancelButton: false,
          confirmButtonText: "Aceptar",
          // allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            $http({
              method: 'POST',
              url: "php/juridica/tutelas/admintutelas.php",
              data: {
                function: 'p_ui_motivos',

                idCausa: $scope.Hoja2.seleccionadoCausa,
                idMotivo: '',
                nombre: result,
                estado: 'A',
                accion: 'I' // UPDATE
              }
            }).then(function ({ data }) {
              if (data != undefined) {
                if (data.Codigo == 0) {
                  swal({
                    title: "Mensaje",
                    text: data.Nombre,
                    type: "success",
                    timer: 1000
                  }).catch(swal.noop);
                  $scope.obtenerListadoMotivos($scope.Hoja2.seleccionadoCausa, '1');
                  $scope.closeModal();
                }
                if (data.Codigo == 1) {
                  swal({
                    title: "Mensaje",
                    text: data.Mensaje,
                    type: "warning",
                  }).catch(swal.noop);
                }
              }
            });
          }
        }).catch(swal.noop);
      }

      $scope.editarMotivo = function (x) {
        // COD_ESTADO: "A"
        // CONCEPTO: "TS"
        // ESTADO: "Activo"
        // MOTIVO: 1
        // NOMBRE: "CONSULTA NO PBS"
        $scope.Hoja2.idMotivo = x.MOTIVO;
        $scope.Hoja2.nombreMotivo = x.NOMBRE;
        $scope.Hoja2.estadoMotivo = x.COD_ESTADO;
        $scope.openModal('modal_Motivo');
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.modificarMotivo = function () {
        if ($scope.Hoja2.nombreMotivo.toString().length == 0) {
          swal("¡Importante!", "Complete todos los datos", "info").catch(swal.noop);
        }
        if ($scope.Hoja2.estadoMotivo.toString().length == 0) {
          swal("¡Importante!", "Complete todos los datos", "info").catch(swal.noop);
        }
        // swal({
        //   title: '¿Desea actualizar el estado del funcionario?',
        //   text: X.NOMBRE,
        //   showCancelButton: true,
        //   confirmButtonText: "Confirmar",
        //   cancelButtonText: "Cancelar",
        //   allowOutsideClick: false
        // }).then(function (result) {
        //   if (result) {
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/admintutelas.php",
          data: {
            function: 'p_ui_motivos',
            idCausa: $scope.Hoja2.seleccionadoCausa,
            idMotivo: $scope.Hoja2.idMotivo,
            nombre: $scope.Hoja2.nombreMotivo,
            estado: $scope.Hoja2.estadoMotivo,
            accion: 'U' // UPDATE
            // responsable: $scope.Rol_Cedula
          }
        }).then(function ({ data }) {
          if (data != undefined) {
            if (data.Codigo == 0) {
              swal({
                title: "Mensaje",
                text: data.Nombre,
                type: "success",
                timer: 1000
              }).catch(swal.noop);
              $scope.obtenerListadoMotivos($scope.Hoja2.seleccionadoCausa, '1');
              $scope.closeModal();
            }
            if (data.Codigo == 1) {
              swal({
                title: "Mensaje",
                text: data.Mensaje,
                type: "warning",
              }).catch(swal.noop);
            }
          }
        });
        //   }
        // }).catch(swal.noop);
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
