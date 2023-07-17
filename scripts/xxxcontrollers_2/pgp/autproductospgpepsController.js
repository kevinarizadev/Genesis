'use strict';
angular.module('GenesisApp')
  .controller('autproductospgpepsController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {
        console.log($(window).width());
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1300) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.SysDay = new Date();
        $scope.Listado = [];
        $scope.Hoja1_Limpiar();
        setTimeout(() => {
          $scope.$apply();
          $scope.Cargar_Anios();
        }, 2000);
      }
      $scope.Hoja1_Limpiar = function () {
        $scope.Hoja1 = {
          Nit: '',
          Nit_Cod: '',
          Anio: '',
          Periodo: '',
          Nombre_Periodo: '',
          Regimen: '',

          List_Anio: [],
          List_Periodo: [],

          Listado: '',

          Filtrar_HP: false,
          Filtrar: ''
        };

        $scope.Busqueda = {
          Ips: {
            Filtro: [],
            Listado: null,
            SAVE: null,
            Seleccion: 9999
          }
        };

        document.querySelectorAll(".Valid_Campo").forEach(e => {
          e.classList.remove("Valid_Campo");
        });
      }

      $scope.Cargar_Anios = function () {
        $http({
          method: 'POST',
          url: "php/financiera/funcfinanciera.php",
          data: { function: 'cargaannos' }
        }).then(function (res) {
          res.data.forEach(e => {
            if (parseInt(e.ANNO) >= 2021) {
              $scope.Hoja1.List_Anio.push({ ANIO: e.ANNO });
            }
          });
          setTimeout(() => {
            $scope.Hoja1.Anio = $scope.SysDay.getFullYear();
            $scope.$apply();
          }, 200);
        });
        setTimeout(() => {
          $scope.Cargar_Periodos($scope.Hoja1.List_Anio[$scope.Hoja1.List_Anio.length - 1].ANIO, 'Hoja1');
        }, 1000);
      }
      $scope.Cargar_Periodos = function (anio, hoja) {
        $http({
          method: 'POST',
          url: "php/financiera/funcfinanciera.php",
          data: { function: 'cargaperiodos', anno: anio }
        }).then(function (res) {
          $scope[hoja].List_Periodo = res.data;
          setTimeout(() => {
            $scope.$apply();
          }, 200);
        })
      }


      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      $scope.Consultar_Soportes = function (x) {
        if ($scope.Hoja1.Periodo && $scope.Hoja1.Nit_Cod && $scope.Hoja1.Regimen) {
          if (!x) {
            swal({ title: 'Cargando...', allowOutsideClick: false });
            swal.showLoading();
          }
          $http({
            method: 'POST',
            url: "php/pgp/autproductospgpeps.php",
            data: {
              function: 'P_AUTORIZACIONES_PRODUCTOS_PGP',
              v_panno: $scope.Hoja1.Anio,
              v_pperiodo: $scope.Hoja1.Periodo,
              v_pnit: $scope.Hoja1.Nit_Cod,
              v_pregimen: $scope.Hoja1.Regimen
            }
          }).then(function (response) {
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
              if (response.data.Codigo == undefined) {
                if (response.data.length != 0) {
                  window.open('views/pgp/formatos/formato_autproductospgpeps.php?v_panno=' + $scope.Hoja1.Anio +
                    '&v_pperiodo=' + $scope.Hoja1.Periodo +
                    '&v_pnit=' + $scope.Hoja1.Nit_Cod +
                    '&v_pregimen=' + $scope.Hoja1.Regimen, '_blank', "width=900,height=1100");
                  if (!x) {
                    swal.close();
                  }
                } else {
                  swal({
                    title: "¡Importante!",
                    text: "No se encontraron registros.",
                    type: "info",
                  }).catch(swal.noop);
                }
              } else {
                swal({
                  title: "¡Importante!",
                  text: response.data.Nombre,
                  type: "warning",
                }).catch(swal.noop);
              }
            } else {
              swal({
                title: "¡Importante!",
                text: response.data,
                type: "info",
              }).catch(swal.noop);
            }
          });
        } else {
          Materialize.toast('¡Complete todos los campos!', 1000);
        }
      }

      $scope.KeyFind_ObIps = function (keyEvent) {
        if ($scope.Busqueda.Ips.Filtro != null && $scope.Busqueda.Ips.Filtro.length != 0) {
          if (keyEvent.which === 40) {
            $scope.Busqueda.Ips.Seleccion = $scope.Busqueda.Ips.Seleccion >= ($scope.Busqueda.Ips.Filtro.length - 1) ? 0 : $scope.Busqueda.Ips.Seleccion + 1;
            document.querySelector('.Clase_Listar_Ips').scrollTo(0, document.querySelector('#Ips' + $scope.Busqueda.Ips.Seleccion).offsetTop);
          } else if (keyEvent.which === 38) {
            $scope.Busqueda.Ips.Seleccion = $scope.Busqueda.Ips.Seleccion <= 0 || $scope.Busqueda.Ips.Seleccion == 9999 ? $scope.Busqueda.Ips.Filtro.length - 1 : $scope.Busqueda.Ips.Seleccion - 1;
            document.querySelector('.Clase_Listar_Ips').scrollTo(0, document.querySelector('#Ips' + $scope.Busqueda.Ips.Seleccion).offsetTop)
          } else if (keyEvent.which === 13 && $scope.Busqueda.Ips.Seleccion != 9999) {
            var x = $scope.Busqueda.Ips.Filtro[$scope.Busqueda.Ips.Seleccion];
            $scope.FillTextbox_Listado_Ips(x.nit, x.nombre_ips);
          }
        } else {
          if (keyEvent.which === 13)
            $scope.Buscar_ObIps();
        }
      }
      $scope.Buscar_ObIps = function () {
        if ($scope.Hoja1.Nit.length > 2) {
          $http({
            method: 'POST',
            url: "php/pgp/autproductospgpeps.php",
            data: {
              function: 'Buscar_Ips',
              Coinc: $scope.Hoja1.Nit.toUpperCase(),
            }
          }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data[0] != undefined && response.data.length > 1) {
                $scope.Busqueda.Ips.Filtro = response.data;
                $scope.Busqueda.Ips.Listado = response.data;
                $('.Clase_Listar_Ips').css({ width: $('#Hoja1_Nit')[0].offsetWidth });
              }
              if (response.data.length == 1) {
                if (response.data[0].Codigo == '1') {
                  swal({
                    title: "¡Mensaje!",
                    text: response.data[0].Nombre,
                    type: "info",
                  }).catch(swal.noop);
                  $scope.Busqueda.Ips.Filtro = null;
                  $scope.Busqueda.Ips.Listado = null;
                } else {
                  $scope.FillTextbox_Listado_Ips(response.data[0].nit, response.data[0].nombre_ips);
                }
              } else if (response.data.length == 0) {
                swal({
                  title: "¡Importante!",
                  text: "No se encontro la Ips",
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
      $scope.Complete_Listado_Ips = function (keyEvent, string) {
        if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
          if ($scope.Hoja1.Nit != undefined && string != undefined && $scope.Busqueda.Ips.Listado != undefined) {
            $('.Clase_Listar_Ips').css({ width: $('#Hoja1_Nit')[0].offsetWidth });
            var output = [];
            angular.forEach($scope.Busqueda.Ips.Listado, function (x) {
              if (x.nombre_ips.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.nit.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                output.push({ "nit": x.nit, "nombre_ips": x.nombre_ips.toUpperCase() });
              }
            });
            $scope.Busqueda.Ips.Filtro = output;
            $scope.Busqueda.Ips.Seleccion = 9999;
          }
        }
      }
      $scope.FillTextbox_Listado_Ips = function (codigo, nombre) {
        $scope.Hoja1.Nit = codigo + ' - ' + nombre;
        $scope.Hoja1.Nit_Cod = codigo;
        // setTimeout(() => {
        //     $scope.Buscar_Ips();
        // }, 500);
        $scope.Busqueda.Ips.Listado = null;
        $scope.Busqueda.Ips.Filtro = null;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }


      $scope.closeModal = function () {
        $('.modal').modal('close');
      }
      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

    }])
