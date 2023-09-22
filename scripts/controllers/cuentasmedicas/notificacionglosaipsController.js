'use strict';
angular.module('GenesisApp')
  .controller('notificacionglosaipsController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {
      $scope.Inicio = function () {
        console.log($(window).width());
        setTimeout(() => {
          document.querySelector("#content").style.backgroundColor = "white";
        }, 2000);
        $scope.Ajustar_Pantalla();
        $('.modal').modal();
        $scope.Rol_Nit = sessionStorage.getItem('nit');
        // $scope.Rol_Nit = 900465319;
        console.log(sessionStorage.getItem('nit'));
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        console.log($scope.Rol_Cedula);
        console.log($scope.nombre);
        $scope.Vista = 0;

        $scope.verNotificaciones();
      };


      $scope.verNotificaciones = function (msg) {
        if (msg == null) {
          swal({ title: 'Cargando...', allowOutsideClick: false });
          swal.showLoading();
        }
        $scope.listadoNotificaciones = [];
        $scope.listadoNotificacionesTemp = [];
        $scope.filtroNotificaciones = '';
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/notificacionglosaips.php",
          data: { function: 'p_lista_glosas_estado_resp_agru', nit: $scope.Rol_Nit }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Mensaje", 'No existen glosas para mostrar', "warning").catch(swal.noop); return
          }
          if (data.length) {
            $scope.listadoNotificaciones = data;
            $scope.listadoNotificacionesTemp = data;

            $scope.currentPage = 0;
            $scope.pageSize = 10;
            $scope.valmaxpag = 10;
            $scope.pages = [];
            $scope.configPages();
            // $scope.Vista = 0;
            setTimeout(() => { $scope.$apply(); }, 500);
            if (msg == null) { swal.close(); }
          } else {
            swal.close();
          }
        })
      }

      $scope.verNotificacionesDetalle = function (row, msg) {
        if (msg == null) {
          swal({ title: 'Cargando...', allowOutsideClick: false });
          swal.showLoading();
        }
        $scope.ngSeleccionada = row;
        $scope.listadoNotificacionesDetalle = [];
        $scope.filtroNotificacionesDetalle = '';
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/notificacionglosaips.php",
          data: { function: 'p_lista_glosas_estado_resp', estado: 'PE', nit: $scope.Rol_Nit, numero: row.NTDN_NUMERO, ubicacion: row.NTDN_UBICACION }
        }).then(function ({ data }) {
          if (data != undefined) {
            if (data.length) {
              $scope.listadoNotificacionesDetalle = data;
              $scope.Vista = 1;
              setTimeout(() => { $scope.$apply(); }, 500);
              if (msg == null) { swal.close(); }
            } else {
              swal("Mensaje", 'No existen glosas para mostrar', "info").catch(swal.noop); return
            }
          } else {
            swal.close();
          }
        })
      }

      $scope.descargarFormatoNotificacion = function (x) {

        window.open('views/Cuentasmedicas/formatos/formato_notificacionglosaips.php?documento=' + x.NTDC_DOCUMENTO +
          '&numero=' + x.NTDN_NUMERO +
          '&ubicacion=' + x.NTDN_UBICACION
          , '_blank', "width=1080,height=1100");

      }


      $scope.obtenerDetalleGlosas = function (row) {
        const xx = $scope.nombre.toString().split('-');
        const nombre = xx[xx.length - 1]
        // $scope.cedula

        $scope.modalGestion = {
          listadoServicios: [],

          numero: row.NUMERO,
          ubicacion: row.UBICACION,
          numeroFD: row.NUM_FD,
          ubicacionFD: row.UBI_FD,
          renglon: row.NTDN_RENGLON,

          numeroFactura: row.FACC_FACTURA.trim(),
          valorGlosa: `$ ${$scope.FormatPesoNumero(row.VALOR_GLOSA.replace(/\,/g, '.'))}`,

          auditorIPS: nombre,
          numeroCredito: row.FACV_VALOR_FN,
          valorAceptado: 0,
          observacion: '',

          soporteExt: '',
          soporteB64: '',

        }
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();

        $http({
          method: 'POST',
          url: "php/cuentasmedicas/notificacionglosaips.php",
          data: { function: 'p_lista_glosas_estado_resp_detalle', renglon: row.NTDN_RENGLON, numero: row.NUMERO, ubicacion: row.UBICACION }
        }).then(function ({ data }) {
          if (data != undefined) {
            data.forEach(e => {
              e.VALOR_ACEPTADO = 0
            })
            $scope.modalGestion.listadoServicios = data;
            $scope.openModal('modalGestion');
            swal.close()
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })

        angular.forEach(document.querySelectorAll('.formGestion input'), function (i) {
          i.setAttribute("readonly", true);
        });

      }

      document.querySelector('#fileSoporte').addEventListener('change', function (e) {
        $scope.modalGestion.soporteB64 = "";
        setTimeout(() => { $scope.$apply(); }, 500);
        var files = e.target.files;
        if (files.length != 0) {
          for (let i = 0; i < files.length; i++) {
            const x = files[i].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'ZIP') {
              if (files[i].size < 15485760 && files[i].size > 0) {
                $scope.getBase64(files[i]).then(function (result) {
                  $scope.modalGestion.soporteExt = x[x.length - 1].toLowerCase();
                  $scope.modalGestion.soporteB64 = result;
                  setTimeout(function () { $scope.$apply(); }, 300);
                });
              } else {
                document.querySelector('#fileSoporte').value = '';
                swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
              }
            } else {
              document.querySelector('#fileSoporte').value = '';
              swal('Advertencia', '¡El archivo seleccionado debe ser formato ZIP!', 'info');
            }
          }
        }
      });
      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      $scope.cargarSoporte = function () {
        return new Promise((resolve) => {
          if (!$scope.modalGestion.soporteB64) { resolve(''); return }
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Guardando Soporte...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/cuentasmedicas/notificacionglosaips.php",
            data: {
              function: "cargarSoporte",
              codigo: `${$scope.modalGestion.numero}_${$scope.modalGestion.ubicacion}_${$scope.modalGestion.renglon}`,

              base64: $scope.modalGestion.soporteB64
            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }

      $scope.validarGestion = function () {
        return new Promise((resolve) => {

          // if (!$scope.modalGestion.nombre) resolve(false);
          // if (!$scope.modalGestion.descripcion) resolve(false);
          // if (!$scope.modalGestion.fechaInicio) resolve(false);
          // if (!$scope.modalGestion.valorAceptado) resolve(false);
          // if (!$scope.modalGestion.observacion) resolve(false);

          $scope.modalGestion.listadoServicios.forEach(e => {
            e.error = false

            if (e.VALOR_ACEPTADO === undefined || e.VALOR_ACEPTADO === null || e.VALOR_ACEPTADO === '0' || e.VALOR_ACEPTADO === 0) {
              e.error = true
              resolve(false)
            }

            if (parseFloat(e.VALOR_GLOSA.toString().replace(',', '.')) <
              (parseFloat(e.VALOR_ACEPTADO.toString().replace(/\./g, '').replace(/\,/g, '.')))
            ) {
              e.error = true
              resolve(false)
            }
          });

          resolve(true)
        });
      }

      $scope.guardarGestion = function () {
        $scope.validarGestion().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }

          swal({
            title: 'Confirmar',
            text: '¿Guardar gestion realizada?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {

              $scope.cargarSoporte().then((resultSoporte) => {

                var data = []
                $scope.modalGestion.listadoServicios.forEach(e => {
                  data.push({
                    renglon: e.RENGLON_FD,
                    servicio: e.PRODUCTO,
                    valor_fd: e.VALOR_GLOSA,
                    valor_gl: 0,
                    valor_gi: ((e.VALOR_ACEPTADO.toString().replace(/\./g, '')).replace(/\,/g, '.')),
                    observacion: e.GLOSA,
                    comentario: e.COMENTARIO
                  })
                });

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
                  url: "php/cuentasmedicas/notificacionglosaips.php",
                  data: {
                    function: 'p_guardar_servicios_glosas_resp_ips',

                    documento: 'FD',
                    numero: $scope.modalGestion.numeroFD,
                    ubicacion: $scope.modalGestion.ubicacionFD,
                    datos: JSON.stringify(data),
                    cantidad: data.length,

                    soporte: resultSoporte,

                    responsable: $scope.Rol_Cedula
                  }
                }).then(function ({ data }) {
                  if (data.toString().substr(0, 3) == '<br' || data == 0) {
                    swal("Mensaje", 'No existen glosas para mostrar', "warning").catch(swal.noop); return
                  }
                  if (data.Codigo == 0) {
                    swal("Mensaje", "Glosa Gestionada", "success").catch(swal.noop);
                    $scope.closeModal();
                    setTimeout(() => {
                      // swal.close()
                      $scope.verNotificaciones('x');
                      $scope.verNotificacionesDetalle($scope.ngSeleccionada);
                    }, 2000);
                  }
                  if (data.Codigo == 1) {
                    swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                  }
                })
              })
            }
          })


        })
      }

      $scope.openModal = function (modal) {
        $(`#${modal}`).modal('open');
        setTimeout(() => { document.querySelector(`#${modal}`).style.top = 1 + '%'; }, 600);
      }
      $scope.closeModal = function () {
        $('.modal').modal('close');
      }

      $scope.filter = function (val) {
        $scope.listadoNotificacionesTemp = $filter('filter')($scope.listadoNotificaciones, val);
        if ($scope.listadoNotificacionesTemp.length > 0) {
          $scope.setPage(1);
        }
        $scope.filter_save = val;
      }

      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.listadoNotificacionesTemp.length / $scope.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope.listadoNotificacionesTemp.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.listadoNotificacionesTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.listadoNotificacionesTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.listadoNotificacionesTemp.length / $scope.pageSize);
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
        // console.log($scope.Lista_Glosa.length / $scope.pageSize - 1)
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
          if ($scope.listadoNotificacionesTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.listadoNotificacionesTemp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.listadoNotificacionesTemp.length / $scope.pageSize) + 1;
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

      $scope.Atras = function (X) {
        $scope.Vista = X;

        setTimeout(() => {
          $scope.$apply();
        }, 1000);
      }

      $scope.FormatPesoNumero = function (num) {
        if (num) {
          var regex2 = new RegExp("\\.");
          if (regex2.test(num)) {
            num = num.toString().replace('.', ',');
            num = num.split(',');
            num[0] = num[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num[0] = num[0].split('').reverse().join('').replace(/^[\.]/, '');
            if (num[1].length > 1 && num[1].length > 2) {
              num[1] = num[1].toString().substr(0, 2);
            }
            if (num[1].length == 1) {
              num[1] = num[1] + '0';
            }
            return num[0] + ',' + num[1];
          } else {
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num = num.split('').reverse().join('').replace(/^[\.]/, '');
            return num + ',00';
          }
        } else {
          return "0"
        }
      }
      $scope.FormatPeso = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[^0-9,]/g, '');
        var array = null;
        var regex = new RegExp("\\,");
        if (!regex.test(valor)) {
          valor = valor.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
          valor = valor.split('').reverse().join('').replace(/^[\.]/, '');
        } else {
          array = valor.toString().split(',');
          if (array.length > 2) {
            input.value = 0;
          } else {
            array[0] = array[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            array[0] = array[0].split('').reverse().join('').replace(/^[\.]/, '');
            if (array[1].length > 2) {
              array[1] = array[1].substr(0, 2);
            }
          }
        }
        if (!regex.test(valor)) {
          input.value = valor;
        } else {
          if (valor == ',') {
            input.value = 0;
          } else {
            if (valor.substr(0, 1) == ',') {
              input.value = 0 + ',' + array[1];
            } else {
              input.value = array[0] + ',' + array[1];
            }
          }
        }
      }

      $scope.getNum = function (val) {
        var val2 = parseInt(val.toString());
        if (isNaN(val)) {
          return 0;
        }
        return val2;
      }

      $scope.Obtener_ClaseDias = function (x) {
        // if (x == 5) {
        //   return 'AMARILLO'
        // }
        if (x > 15) {
          return 'ROJO'
        }
        return 'VERDE'
      }


      $scope.Ajustar_Pantalla = function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100) {
          document.querySelector("#pantalla").style.zoom = 0.8;
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

    }]).filter('inicio', function () {
      return function (input, start) {
        if (input != undefined && start != NaN) {
          start = +start;
          return input.slice(start);
        } else {
          return null;
        }
      }
    });
