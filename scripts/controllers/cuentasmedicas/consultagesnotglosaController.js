'use strict';
angular.module('GenesisApp')
  .controller('consultagesnotglosaController', ['$scope', '$http', '$filter', '$window',
    function ($scope, $http, $filter, $window) {
      $scope.Inicio = function () {
        console.clear();
        $('.modal').modal();
        // $('.tabs').tabs();
        $scope.Ajustar_Pantalla();
        $scope.Rol_Nit = sessionStorage.getItem('nit');
        // $scope.Rol_Nit = 900465319;
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $scope.Vista = 0;

        $scope.verNotificaciones();
        //////////////////////

        setTimeout(() => { $scope.$apply(); }, 500);
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
          url: "php/cuentasmedicas/consultagesnotglosa.php",
          data: { function: 'p_lista_glosas_estado_resp_agru_consulta', nit: $scope.Rol_Nit }
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
          url: "php/cuentasmedicas/consultagesnotglosa.php",
          data: { function: 'p_lista_glosas_estado_resp_consulta', nit: $scope.Rol_Nit, numero: row.NTDN_NUMERO, ubicacion: row.NTDN_UBICACION }
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


      $scope.generalExcel = function (row) {
        let datos = []

        row.forEach(e => {
          datos.push({
            "RAZON SOCIAL": e.IPS,
            "FECHA RADICACION": e.FECHA_RADICACION,

            "FACTURA": e.FACC_FACTURA,
            "VALOR FACTURA": e.VALOR_FACTURA,

            "ESTADO GLOSA": $scope.obtenerNombreEstado(e.NOTC_ESTADO1),

            "DOCUMENTO GLOSA": `${e.DOC_FD}-${e.NUM_FD}-${e.UBI_FD}`,
            "FECHA NOTIFICACION GLOSA": e.FECHA_NOTIFICACION,
            "VALOR GLOSA": e.VALOR_GLOSA,

            "FECHA RESPUESTA IPS": e.FECHA_RESPUESTA_IPS,
            "VALOR ACEPTADO IPS": e.NTDV_VALOR_GI_IPS,
            "COMENTARIO_IPS": e.COMENTARIO_IPS,


            "FECHA RESPUESTA EPS": e.FECHA_RESPUESTA_EPS,
            "VALOR ACEPTADO EPS": e.NTDV_VALOR_GL_EPS,
            "COMENTARIO_EPS": e.COMENTARIO_EPS,

            "VALOR MANTENIDO": e.NTDV_VALOR_MANTENIDA1,
          })
        });

        var ws = XLSX.utils.json_to_sheet(datos);
        /* add to workbook */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
        /* write workbook and force a download */
        XLSX.writeFile(wb, "Reporte notificacion glosas.xlsx");
        const text = `Registros encontrados ${data.length}`
        swal('¡Mensaje!', text, 'success').catch(swal.noop);

        swal.close();

      }

      $scope.abrirModalCargueFormato = function (x) {
        $scope.Soportes = {}
        $scope.Soportes.documento = x.DOC_NOTIFICACION.split('-')[0];
        $scope.Soportes.numero = x.DOC_NOTIFICACION.split('-')[1];
        $scope.Soportes.ubicacion = x.DOC_NOTIFICACION.split('-')[2];
        $scope.Soportes.Soporte_B64 = '';

        swal({
          title: 'Cargar Soporte',
          html: `
          <div class="col s12 m12 l12 m-b" style="margin-bottom: 1.5rem;">
              <div class="col s6 no-padding label-new m-b" id="AdjustSop">
                <div class="file-field input-field gray-input m-l input-file-radiu input-file-radius-opcional"
                  style="margin: 0;width: -webkit-fill-available;">
                  <div class="right">
                    <span class="black-text"><i class="icon-folder-open-1 default-color"
                      style="line-height: 2rem;"></i></span>
                      <input type="file" id="SoporteProces">
                  </div>
                <div class="file-path-wrapper">
                  <input class="file-path Soport" type="text" placeholder="Adjunte un archivo (zip)"
                    readonly style="border-radius: 0;height: 2rem;border-bottom: 0;"
                   >
                </div>
              </div>
            </div>
          </div>
          `,

          width: '500px',

          preConfirm: function () {
            return new Promise(function (resolve) {
              resolve(
                {
                  soporte: $('#SoporteProces').val(),
                }
              )
            })
          }
        }).then(function (result) {
          $scope.loadFile();
        })
      }


      $scope.loadFile = function () {
        var fileInput = document.querySelector('#SoporteProces');
        if (fileInput.files.length != 0) {
          var x = fileInput.files[0].name.split('.');
          if (x[x.length - 1].toUpperCase() == 'ZIP') {
            if (fileInput.files.length > 0) {
              if (fileInput.files[0].size < 10485760 && fileInput.files[0].size > 0) {
                $scope.getBase64(fileInput.files[0]).then(function (result) {
                  $scope.Soportes.Soporte_B64 = result;
                  swal({
                    title: "¿Cargar el soporte?",
                    type: "question",
                    showCancelButton: true,
                    allowOutsideClick: false
                  }).catch(swal.noop)
                    .then((willDelete) => {
                      if (willDelete) {
                        $scope.SubirFTP();
                      }
                    });
                  setTimeout(function () { $scope.$apply(); }, 300);
                });
              } else {
                swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (10MB)!', 'info');
                $scope.Soportes.Soporte_B64 = '';
                setTimeout(function () { $scope.$apply(); }, 300);
              }
            }
          } else {
            swal('Advertencia', '¡El archivo seleccionado deber ser formato ZIP!', 'info');
            $scope.Soportes.Soporte_B64 = '';
            setTimeout(function () { $scope.$apply(); }, 300);
          }
        } else {
          $scope.Soportes.Soporte_B64 = '';
          setTimeout(function () { $scope.$apply(); }, 300);
        }
      }

      $scope.SubirFTP = function () {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/consultagesnotglosa.php",
          data: {
            function: 'cargarSoporte',
            base64: $scope.Soportes.Soporte_B64,
            codigo: `${$scope.Soportes.numero}_${$scope.Soportes.ubicacion}`
          }
        }).then(function ({ data }) {
          $http({
            method: 'POST',
            url: "php/cuentasmedicas/consultagesnotglosa.php",
            data: {
              function: 'p_adjunto_glosa',
              documento: $scope.Soportes.documento,
              numero: $scope.Soportes.numero,
              ubicacion: $scope.Soportes.ubicacion,
              adjunto: data,
              responsable: $scope.Rol_Cedula
            }
          }).then(function ({ data }) {
            if (data) {
              swal({
                title: "¡Mensaje!",
                text: 'Soporte Actualizado Exitosamente',
                type: "success",
              }).catch(swal.noop);
              setTimeout(() => {
                $scope.verNotificaciones();
              }, 2500);
            }
          });
        });
      }

      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }


      $scope.generarFormato = function (x) {
        $window.open('views/cuentasmedicas/formatos/formato_conciliacion_respuesta_glosa.php?documento=' + 'NG' + '&numero=' + x.DOC_NOTIFICACION.split('-')[1]
          + '&ubicacion=' + x.DOC_NOTIFICACION.split('-')[2] + '&responsable=' + $scope.Rol_Cedula, '_blank', "width=1080,height=1100");
      }

      ////////////////////////////////////////////////////////////////////////////////////////////
      $scope.descargaAdjunto = function (ruta) {
        // alert(ruta);
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/consultagesnotglosa.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          window.open("temp/" + response.data);
        });
      }


      $scope.obtenerNombreEstado = function (estado) {
        const listado = {
          PE: 'PENDIENTE',
          RI: 'RESPUESTA X IPS',
          CO: 'COMPLETA',
        }
        return listado[estado]
      }
      //////////////////////////////////////////////



      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, '');
        input.value = valor;
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
      ////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////
      $scope.Atras = function (X) {
        $scope.Vista = X;

        setTimeout(() => {
          $scope.$apply();
        }, 1000);
      }
      // Paginacion
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


    }
  ]).filter('startFrom', function () {
    return function (input, start) {
      if (input != undefined) {
        start = +start;
        return input.slice(start);
      }
    }
  });
