'use strict';
angular.module('GenesisApp')
  .controller('gestiontipoproductopgpController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {

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
        /*swal(
            '¡Acceso no Permitido!',
            'Por favor contactar con el Area de Redes.',
            'info'
          ).catch(swal.noop);*/
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

          Nit: '',
          Nit_Ips: '',
          Nombre_Ips: '',
          Empresa: '',
          Documento: '',
          Numero: '',
          Ubicacion: '',

          Producto: '',
          Tipo_Producto: '',
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
        ///
        $scope.Observacion = '';
        document.querySelectorAll(".Valid_Campo").forEach(e => {
          e.classList.remove("Valid_Campo");
        });
        setTimeout(() => {
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
            url: "php/pgp/gestiontipoproductopgp.php",
            data: {
              function: 'Obtener_Ips',
              Nit: $scope.Form.Nit_Ips,
            }
          }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data[0] != undefined) {
                $scope.Datos = response.data;
                if ($scope.Datos.length == 1) {
                  $scope.Mostrar_Ips(0);
                } else {
                  $scope.Form.Status = 1;
                }
                swal.close();
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
          document.querySelector("#Form_Nit_Ips").classList.add("Valid_Campo");
          Materialize.toast('¡Digite el Nit del Tercero a consultar!', 3000);
        }
      }

      $scope.Mostrar_Ips = function (index) {
        $scope.Form.Nit = $scope.Form.Nit_Ips;
        $scope.Form.Nombre_Ips = $scope.Datos[index].nombre_ips;
        $scope.Form.Empresa = $scope.Datos[index].cntn_empresa;
        $scope.Form.Documento = $scope.Datos[index].cntc_documento;
        $scope.Form.Numero = $scope.Datos[index].cntn_numero;
        $scope.Form.Ubicacion = $scope.Datos[index].cntn_ubicacion;
        $scope.Mostrar_Productos();
      }

      $scope.Mostrar_Productos = function (x) {
        if (!x) {
          swal({ title: 'Cargando...' });
          swal.showLoading();
        }
        $http({
          method: 'POST',
          url: "php/pgp/gestiontipoproductopgp.php",
          data: {
            function: 'Obtener_Producto_Detalle',
            Empresa: $scope.Form.Empresa,
            Doc: $scope.Form.Documento,
            Numero: $scope.Form.Numero,
            Ubicacion: $scope.Form.Ubicacion
          }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br') {
            if (response.data[0] != undefined) {
              $scope.Lista_Tabla = response.data;
              $scope.Lista_Tabla_SAVE = response.data;
              $scope.initPaginacion($scope.Lista_Tabla);
              $scope.Form.Status = 2;
              if (!x) {
                swal.close();
              }
              ////////////////////////////////////////////////////////////////////////
              setTimeout(() => {
                $scope.$apply();
              }, 1000);
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

      $scope.Guardar_Tipo_Producto = function (x) {
        console.table(x);
        if (x.tipo_producto_pgp == "DIRECTO" || x.tipo_producto_pgp == "MIXTO") {
          var Tipo = x.tipo_producto_pgp == "DIRECTO" ? 'M' : 'D';
          var Texto = x.tipo_producto_pgp == "DIRECTO" ? 'Mixto' : 'Directo';
          swal({
            title: 'Observacion',
            input: 'textarea',
            inputPlaceholder: 'Escribe un comentario...',
            showCancelButton: true,
            allowOutsideClick: false,
            inputValue: $scope.Observacion
          }).then(function (result) {
            result = result.replace(/[|!¡¿?°"#%{}*&''`´¨<>]/g, '');
            result = result.replace(/(\r\n|\n|\r)/g, ' ');
            result = result.replace(/[\t\n]+/g, ' ');
            result = result.toString().toUpperCase();
            $scope.Observacion = result;
            if (result !== '' && result.length >= 20 && result.length < 500) {
              swal({
                title: "¿Está seguro que desea cambiar el tipo del producto?",
                text: "El producto: " + x.proc_nombre + " - Se cambiará al Tipo: " + Texto,
                type: "question",
                showCancelButton: true,
                allowOutsideClick: false
              }).catch(swal.noop)
                .then((willDelete) => {
                  if (willDelete) {
                    swal({ title: 'Cargando...', allowOutsideClick: false });
                    swal.showLoading();
                    $http({
                      method: 'POST',
                      url: "php/pgp/gestiontipoproductopgp.php",
                      data: {
                        function: 'Guardar_Producto_Detalle',
                        Empresa: x.cndn_empresa,
                        Doc: x.cndc_documento,
                        Numero: x.cndn_numero,
                        Ubicacion: x.cndn_ubicacion,
                        Producto: x.cndc_producto,
                        Tipo: Tipo,
                        Obs: result.toString().toUpperCase()
                      }
                    }).then(function (response) {
                      if (response.data) {
                        if (response.data.Codigo == 0) {
                          swal({
                            title: response.data.Nombre,
                            type: "success",
                          }).catch(swal.noop);
                          $scope.Observacion = '';
                          $scope.Mostrar_Productos(1);
                          setTimeout(() => {
                            $scope.$apply();
                          }, 1500);
                        } else {
                          if (response.data.Codigo == 1) {
                            swal({
                              title: "¡Importante!",
                              text: response.data.Nombre,
                              type: "warning",
                            }).catch(swal.noop);
                          } else {
                            swal({
                              title: "¡Importante!",
                              text: response.data,
                              type: "warning",
                            }).catch(swal.noop);
                          }
                        }
                      } else {
                        swal({
                          title: "¡Importante!",
                          text: response.data,
                          type: "info",
                        }).catch(swal.noop);
                      }
                    });
                  }
                }).catch(swal.noop);
            } else {
              Materialize.toast('El comentario debe contener al menos 20 caracteres y menos de 500!', 1000);
            }
          }).catch(swal.noop);;
        }
      }
      $scope.Volver = function () {
        $scope.Form.Status = $scope.Form.Status - 1;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
      //////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
      //CONSULTA IPS ASIGNADA
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
        if ($scope.Form.Nit_Ips.length > 2) {
          $http({
            method: 'POST',
            url: "php/pgp/gestiontipoproductopgp.php",
            data: {
              function: 'Buscar_Ips',
              Coinc: $scope.Form.Nit_Ips.toUpperCase(),
            }
          }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data[0] != undefined && response.data.length > 1) {
                $scope.Busqueda.Ips.Filtro = response.data;
                $scope.Busqueda.Ips.Listado = response.data;
                $('.Clase_Listar_Ips').css({ width: $('#Form_Nit_Ips')[0].offsetWidth });
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
          if ($scope.Form.Nit_Ips != undefined && string != undefined && $scope.Busqueda.Ips.Listado != undefined) {
            $('.Clase_Listar_Ips').css({ width: $('#Form_Nit_Ips')[0].offsetWidth });
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
      $scope.FillTextbox_Listado_Ips = function (codigo) {
        $scope.Form.Nit_Ips = codigo;
        setTimeout(() => {
          $scope.Buscar_Ips();
        }, 500);
        $scope.Busqueda.Ips.Listado = null;
        $scope.Busqueda.Ips.Filtro = null;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      $scope.initPaginacion = function (info) {
        $scope.Lista_Tabla_Temp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
      }
      $scope.chg_filtrar = function () {
        $scope.filter($scope.Form.Filtrar);
      }
      $scope.filter = function (val) {
        val = ($scope.filter_save == val) ? '' : val;
        if (val == 'Otra') {
          if ($scope.filter_save != val) {
            $scope.Lista_Tabla_Temp = $scope.Lista_Tabla.filter(function (e) {
              return e.FUENTE == 'O';
            });
          } else {
            $scope.Lista_Tabla_Temp = $filter('filter')($scope.Lista_Tabla, '');
          }
        } else {
          $scope.Lista_Tabla_Temp = $filter('filter')($scope.Lista_Tabla, ($scope.filter_save == val) ? '' : val);
        }
        if ($scope.Lista_Tabla_Temp.length > 0) {
          $scope.setPage(1);
        }
        $scope.configPages();
        $scope.filter_save = val;
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }

        if ($scope.currentPage >= $scope.pages.length)
          $scope.currentPage = $scope.pages.length - 1;
      }
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
      }
      $scope.paso = function (tipo) {
        if (tipo == 'next') {
          var i = $scope.pages[0].no + 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no + 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage + 1;
          if ($scope.Lista_Tabla_Temp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.Lista_Tabla_Temp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.Lista_Tabla_Temp.length / $scope.pageSize) + 1;
          }
          if (fin > tamanomax) {
            fin = tamanomax;
            i = tamanomax - 9;
          }
        } else {
          var i = $scope.pages[0].no - 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no - 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage - 1;
          if (i <= 1) {
            i = 1;
            fin = $scope.pages.length;
          }
        }
        $scope.calcular(i, fin);
      }
      $scope.calcular = function (i, fin) {
        if (fin > 9) {
          i = fin - 9;
        } else {
          i = 1;
        }
        $scope.pages = [];
        for (i; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }
      }

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

      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

    }]);
