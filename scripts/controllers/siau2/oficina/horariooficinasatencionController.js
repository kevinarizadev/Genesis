'use strict';
angular.module('GenesisApp')
  .controller('horariooficinasatencionController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {
        console.log($(window).width());
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_Pantalla();
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');

        $scope.Vista = 0;
        $scope.SysDay = new Date();
        $scope.formLimpiar();
        $scope.listLimpiar();
        $scope.obtenerListadoProyectos();
        setTimeout(() => {
          $scope.$apply();
        }, 500);


        //////////////////////////////////////////////////////////
      }
      // 12964797
      $scope.formLimpiar = function () {
        $scope.Form = {
          Status: 0,
          Filtro: '',

          codUbi: '',
          consUbi: '',
          oficina: '',
          direccion: '',
          horario: '',
        };

        setTimeout(() => {
          $scope.$apply();
        }, 300);
      }

      $scope.listLimpiar = function () {
        $scope.List = {
          listadoOficinas: [],
        };
      }
      $scope.obtenerListadoProyectos = function () {
        $scope.listadoOficinas = [];
        $http({
          method: 'POST',
          url: "php/siau/oficina/horariooficinasatencion.php",
          data: {
            function: 'p_obtener_oficinas_siau'
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            $scope.listadoOficinas = data;
          } else {
            if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            swal("¡Importante!", data, "warning").catch(swal.noop);
          }
        });
      }

      $scope.editarOficina = function (x) {
        // console.log(x);
        $scope.Form.codUbi = x.COD_UBI;
        $scope.Form.consUbi = x.CONS_UBI;
        $scope.Form.oficina = 'Oficina: ' + x.DEPARTAMENTO + ' > ' + x.MUNICIPIO + ' > ' + x.UBGC_NOMBRE;
        $scope.Form.direccion = 'Dirección: ' + x.DIRECCION;
        $scope.Form.horario = x.HORARIO;
        $scope.Form.mananaHoraEntrada = x.MANANAHORAENTRADA;
        $scope.Form.mananaHorasalida = x.MANANAHORASALIDA;
        $scope.Form.tardeHoraEntrada = x.TARDEHORAENTRADA;
        $scope.Form.tardeHorasalida = x.TARDEHORASALIDA;
        $scope.Form.jornadaContinua = x.JORNADACONTINUA == 'S' ? true : false;

        $scope.Form.Status = 1;

        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.actualizarOficina = function () {
        if (!$scope.Form.jornadaContinua && (!$scope.Form.mananaHoraEntrada || !$scope.Form.mananaHorasalida || !$scope.Form.tardeHoraEntrada || !$scope.Form.tardeHorasalida)) {
          Materialize.toast('¡Debe ingresar un horario valido!', 3000);
          return
        }
        // if ($scope.Form.horario == '' || $scope.Form.horario == null) {
        // }
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/siau/oficina/horariooficinasatencion.php",
          data: {
            function: "p_actualiza_oficina_siau",
            cod_ubi: $scope.Form.codUbi,
            cons_ubi: $scope.Form.consUbi,
            horario: $scope.Form.horario,
            mananahoraentrada: $scope.Form.mananaHoraEntrada,
            mananahorasalida: $scope.Form.mananaHorasalida,
            tardehoraentrada: $scope.Form.tardeHoraEntrada,
            tardehorasalida: $scope.Form.tardeHorasalida,
            jornadacontinua: $scope.Form.jornadaContinua == true ? 'S' : 'N',
            responsable: $scope.Rol_Cedula
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            if (data.codigo == 0) {
              $scope.formLimpiar();
              $scope.obtenerListadoProyectos();
              swal("¡Mensaje!", data.mensaje, "success").catch(swal.noop);
            } else {
              swal("¡Importante!", data.error, "warning").catch(swal.noop);
            }
          }
        })

      }


      $scope.calcularHorario = function () {
        if (($scope.Form.jornadaContinua && $scope.Form.mananaHorasalida) || ($scope.Form.jornadaContinua && $scope.Form.tardeHoraEntrada)) {
          $scope.Form.jornadaContinua = false;
        }
        if ($scope.Form.jornadaContinua) {
          $scope.Form.horario = "Lunes a Viernes de " + $scope.obtenerHora($scope.Form.mananaHoraEntrada) + ' a ' + $scope.obtenerHora($scope.Form.tardeHorasalida) + ' - Jornada Continua ';
        } else {
          $scope.Form.horario = "Lunes a Viernes de " + $scope.obtenerHora($scope.Form.mananaHoraEntrada) + ' a ' + $scope.obtenerHora($scope.Form.mananaHorasalida) + ' y de ' +
            $scope.obtenerHora($scope.Form.tardeHoraEntrada) + ' a ' + $scope.obtenerHora($scope.Form.tardeHorasalida);
        }
      }

      var array = [{ "cod": "4AM", "name": "4:00 AM" },
      { "cod": "5AM", "name": "5:00 AM" },
      { "cod": "6AM", "name": "6:00 AM" },
      { "cod": "7AM", "name": "7:00 AM" },
      { "cod": "8AM", "name": "8:00 AM" },
      { "cod": "9AM", "name": "9:00 AM" },
      { "cod": "10AM", "name": "10:00 AM" },
      { "cod": "11AM", "name": "11:00 AM" },
      { "cod": "12PM", "name": "12:00 PM" },
      { "cod": "12PM", "name": "12:00 PM" },
      { "cod": "1PM", "name": "1:00 PM" },
      { "cod": "2PM", "name": "2:00 PM" },
      { "cod": "3PM", "name": "3:00 PM" },
      { "cod": "4PM", "name": "4:00 PM" },
      { "cod": "5PM", "name": "5:00 PM" },
      { "cod": "6PM", "name": "6:00 PM" }]

      $scope.obtenerHora = function (hora) {
        if (!hora) { return '00AMPM' }
        return array[array.findIndex(e => e.cod == hora)].name;
      }

      $scope.atras = function () {
        $scope.Form.Status = 0;
        setTimeout(function () { $scope.$apply(); }, 500);
      }


      $scope.Ajustar_Pantalla = function () {
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
