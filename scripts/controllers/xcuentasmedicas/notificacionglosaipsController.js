'use strict';
angular.module('GenesisApp')
  .controller('notificacionglosaipsController', ['$scope', 'notification', '$http', '$filter', '$q',
    function ($scope, notification, $http, $filter, $q) {
      $(document).ready(function () {
        $('.modal').modal();
        $scope.Rol_Nit = sessionStorage.getItem('nit');
        // $scope.Rol_Nit = 900465319;
        console.log(sessionStorage.getItem('nit'));
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        console.log($scope.Rol_Cedula);
        console.log($scope.nombre);
        // $scope.Cont_Notificaciones = {
        //   not: 0,
        //   ace: 0,
        //   con: 0
        // }
        $scope.Lista_Glosa = [];
        $scope.Lista_GlosaTemp = [];

        // $scope.Ver_Glosas();
        $scope.Cargar_Estado();
        $scope.Vista = 0;
      });

      $scope.Cargar_Estado = function () {
        // console.log(row);
        $scope.List_Estados_CantTotal = 0;
        $scope.List_Estados = [];
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/notificacionglosaips.php",
          data: { function: 'Obtener_Cantidad_Glosas', origen: 'I', nit: $scope.Rol_Nit }
        }).then(function (response) {
          if (response.data[0] != undefined) {
            // console.table(response.data);
            response.data.forEach(e => {
              $scope.List_Estados_CantTotal += parseInt(e.CANTIDAD);
            });
            setTimeout(() => {
              response.data.forEach(e => {
                $scope.List_Estados.push({ CODIGO: e.CODIGO, NOMBRE: e.NOMBRE, CANTIDAD: e.CANTIDAD, PORCENTAJE: ($scope.List_Estados_CantTotal == 0) ? 0 : (((parseInt(e.CANTIDAD) * 100) / $scope.List_Estados_CantTotal).toFixed(1)) })
              });
              // console.table($scope.List_Estados);
              $scope.$apply();
            }, 500);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data.Nombre,
              type: "warning"
            }).catch(swal.noop);
          }
        })
      }


      $scope.Ver_Glosas = function (row, msg) {
        if (row.CANTIDAD != 0) {
          if (msg == null) {
            swal({ title: 'Cargando...', allowOutsideClick: false });
            swal.showLoading();
          }
          $scope.EstadoGlosa = row.NOMBRE;
          $scope.EstadoGlosaCod = row.CODIGO;
          $scope.Lista_Glosa = [];
          $http({
            method: 'POST',
            url: "php/cuentasmedicas/notificacionglosaips.php",
            data: { function: 'Obtener_Glosas', Estado: row.CODIGO, Nit: $scope.Rol_Nit }
          }).then(function (response) {
            if (response.data != undefined) {
              $scope.Lista_Glosa = response.data;
              $scope.Lista_GlosaTemp = $scope.Lista_Glosa;
              $scope.currentPage = 0;
              $scope.pageSize = 10;
              $scope.valmaxpag = 10;
              $scope.pages = [];
              $scope.configPages();
              $scope.Vista = 1;
              if (msg == null) { swal.close(); }
            } else {
              swal.close();
            }
          })
        } else {

        }
      }

      $scope.Descargar_Notificacion = function (row) {
        swal({
          title: '¿Está seguro que desea aceptar la Notificación?',
          type: "info",
          showCancelButton: true,
        }).catch(swal.noop)
          .then((willDelete) => {
            if (willDelete) {
              swal({
                title: 'Observación',
                input: 'textarea',
                inputPlaceholder: 'Escribe una observación...',
                showCancelButton: true,
                allowOutsideClick: false,
              }).then(function (result_obs) {
                if (result_obs !== '') {
                  swal({ title: 'Cargando...', allowOutsideClick: false });
                  swal.showLoading();
                  $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/notificacionglosaips.php",
                    data: {
                      function: 'DescargarNotificacion', numero: row.NUMERO, ubicacion: row.UBICACION, renglon: row.RENGLON, responsable: $scope.Rol_Cedula,
                      observacion: result_obs
                    }
                  }).then(function (response) {
                    if (response.data.Codigo == "0") {
                      swal({
                        title: "¡Glosa aceptada con exito!",
                        type: "success"
                      }).catch(swal.noop);
                      setTimeout(() => {
                        var data = {
                          CODIGO: $scope.EstadoGlosaCod, NOMBRE: $scope.EstadoGlosa
                        }
                        $scope.Cargar_Estado();
                        $scope.Ver_Glosas(data);
                      }, 3000);
                    } else {
                      swal({
                        title: "¡Ocurrio un error!",
                        text: response.data.Nombre,
                        type: "warning"
                      }).catch(swal.noop);
                    }
                  });
                }
              });
            }
          });
      }


      $scope.Ver_Glosas_Detalle = function (row) {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/notificacionglosaips.php",
          data: {
            function: 'Obtener_Listado_Glosas',
            Num: row.NUMERO.toString(),
            Ubi: row.UBICACION.toString(),
            Renglon: row.RENGLON.toString(),
          }
        }).then(function (response) {
          if (response.data) {
            if (response.data.length == 0 || response.data[0].Codigo != undefined) {
              $scope.Array_ListadoGlosas = [];
              swal({
                title: "¡No se encontraron glosas!",
                type: "info"
              }).catch(swal.noop);
            } else {
              $scope.Array_ListadoGlosas = response.data;
              $('#modal_Listado_Glosas').modal('open');
              swal.close();
            }
          }
        })
        // $scope.Glosa_Descripcion = row.DETALLE_GLOSA;
        // $('#modalglosadetalle').modal('open');
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/notificacionglosaips.php",
          data: { function: 'Marcar_Usu', Empresa: row.EMPRESA, Doc: row.DOCUMENTO, Numero: row.NUMERO, Ubi: row.UBICACION, Renglon: row.RENGLON, Cedula: $scope.Rol_Cedula }
        }).then(function (response) {
          if (response.data != undefined) {
            // console.table(response.data);
            console.log(response.data)
            // $scope.List_Glosas_Detalle = response.data;
          } else {
            // swal({
            //   title: "¡Ocurrio un error!",
            //   text: response.data.Nombre,
            //   type: "warning"
            // }).catch(swal.noop);
          }
        })
      }

      $scope.Ver_Glosas_Comentarios = function (row, save) {
        $scope.Comentario_R = 'N';
        $scope.Datos_Comentario = row;
        $scope.Glosa_Descripcion = row.DETALLE_GLOSA;
        $scope.Comentario_Adjunto = {
          Base: '',
          Ruta: '',
          Ext: '',
          Act: (save == 'G') ? false : true
        }
        $scope.Comentario_Observacion = '';
        document.querySelector('#Comentario_Adjunto').value = '';
        $scope.List_Comentarios = [];
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/notificacionglosaips.php",
          data: { function: 'Obtener_Comentarios', numero: row.NUMERO, ubicacion: row.UBICACION, renglon: row.RENGLON }
        }).then(function (response) {
          setTimeout(() => {
            $scope.Comentario_R = row.RESPONDER;
            $scope.$apply();
          }, 500);
          $('#modalcomentarios').modal('open');
          if (response.data[0] != undefined) {
            $scope.List_Comentarios = response.data;
            var Height = document.querySelector("#notglosa").offsetHeight;
            setTimeout(function () {
              var Width = document.querySelector(".chat_titulo").offsetWidth;
              angular.forEach(document.querySelectorAll('.chat_triangle_der'), function (i) {
                i.style.marginLeft = (Width - 30) + 'px';
              });
              // document.querySelector('.chat_triangle_der').style.marginLeft = (Width - 30) + 'px';
              document.querySelector('#modalcomentarios').style.top = 1 + '%';
              document.querySelector('#modalcomentarios').style.maxHeight = (Height + 20) + 'px';
            }, 600);
          } else {

          }
        })
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/notificacionglosaips.php",
          data: {
            function: 'Obtener_Listado_Glosas',
            Num: row.NUMERO.toString(),
            Ubi: row.UBICACION.toString(),
            Renglon: row.RENGLON.toString(),
          }
        }).then(function (response) {
          if (response.data) {
            if (response.data.length == 0 || response.data[0].Codigo != undefined) {
            } else {
              $scope.Array_ListadoGlosas = response.data;
            }
          }
        })
      }

      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      $scope.loadFile = function () {
        var fileInput = document.querySelector('#Comentario_Adjunto');
        if (fileInput.files.length != 0) {
          var x = fileInput.files[0].name.split('.');
          // debugger
          if ((x[x.length - 1].toUpperCase() == 'PDF') || (x[x.length - 1].toUpperCase() == 'ZIP')) {
            if (fileInput.files[0].size < 7340032 && fileInput.files[0].size > 0) {
              $scope.getBase64(fileInput.files[0]).then(function (result) {
                $scope.Comentario_Adjunto.Base = result;
                $scope.Comentario_Adjunto.Ext = x[x.length - 1].toUpperCase();
                setTimeout(function () { $scope.$apply(); }, 300);
              });
            } else {
              swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (7MB)!', 'info');
              fileInput.value = '';
              $scope.Comentario_Model_Adjunto = '';
              $scope.Comentario_Adjunto.Base = '';
              $scope.Comentario_Adjunto.Url = '';
              setTimeout(function () { $scope.$apply(); }, 300);
            }
          } else {
            swal('Advertencia', '¡El archivo seleccionado deber ser formato PDF o ZIP!', 'info');
            fileInput.value = '';
            $scope.Comentario_Model_Adjunto = '';
            $scope.Comentario_Adjunto.Base = '';
            $scope.Comentario_Adjunto.Url = '';
            setTimeout(function () { $scope.$apply(); }, 300);
          }
        }
      }


      $scope.Antes_Inserta_Comentario = function () {
        if ($scope.Comentario_Observacion.length > 0) {
          swal({
            title: 'Importante',
            text: '¿Está seguro que desea guardar el comentario?',
            type: "info",
            showCancelButton: true,
          }).catch(swal.noop)
            .then((willDelete) => {
              if (willDelete) {
                var Subir_Soportes = [
                  $scope.Cargar_Soporte_FTP(),
                ];
                $q.all(Subir_Soportes).then(function (resultado) {
                  var Archivos_Error = false;
                  for (var x = 0; x < resultado.length; x++) {
                    if (resultado[x].substr(0, 3) == '<br' || (resultado[x] == '' && $scope.Comentario_Adjunto.Base != '')) {
                      Archivos_Error = true;
                      swal({
                        title: '¡Error al subir un archivo!',
                        text: 'Nota: Si el error persiste, por favor actualizar la página (CONTROL + F5).',
                        type: 'warning'
                      }).catch(swal.noop);
                    }
                  }
                  if (Archivos_Error == false) {
                    $scope.Inserta_Comentario();
                  }
                });
              }
            });
        } else {
          swal({
            title: '¡Debe escribir un comentario!',
            type: 'info'
          }).catch(swal.noop);
        }
      }


      $scope.Cargar_Soporte_FTP = function () {
        var defered = $q.defer();
        var promise = defered.promise;
        if ($scope.Comentario_Adjunto.Base != '') {
          $http({
            method: 'POST',
            url: "php/cuentasmedicas/notificacionglosa_Subir.php",
            data: {
              function: 'Upload',
              base: $scope.Comentario_Adjunto.Base,
              ext: $scope.Comentario_Adjunto.Ext,
              name: $scope.Rol_Nit + '_' + $scope.Rol_Cedula
            }
          }).then(function (response) {
            $scope.Comentario_Adjunto.Url = response.data;
            console.log(response.data);
            defered.resolve(response.data);
          });
        } else {
          defered.resolve('xxx');
        }
        return promise;
      }

      $scope.Inserta_Comentario = function () {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/notificacionglosaips.php",
          data: {
            function: 'Inserta_Comentario', numero: $scope.Datos_Comentario.NUMERO, ubicacion: $scope.Datos_Comentario.UBICACION,
            renglon: $scope.Datos_Comentario.RENGLON, responsable: $scope.Rol_Cedula,
            comentario: $scope.Comentario_Observacion, adjunto: $scope.Comentario_Adjunto.Url, origen: 'I', fecha: ''
          }
        }).then(function (response) {
          if (response.data.Codigo == "0") {
            $scope.Comentario_Observacion = '';
            $scope.Comentario_Model_Adjunto = '';
            $scope.Comentario_Adjunto.Base = '';
            $scope.Comentario_Adjunto.Url = '';
            $scope.Comentario_Adjunto.Act = false;
            setTimeout(function () { $scope.$apply(); }, 300);
            var text = 'Radicado: '+response.data.Radicado;
            swal({
              title: "¡Comentario agregado con exito!",
              text: text,
              type: "success"
            }).catch(swal.noop);
            setTimeout(() => {
              // $scope.Ver_Glosas($scope.Datos_Glosa);
              $scope.Cargar_Estado();
              $scope.Ver_Glosas_Comentarios($scope.Datos_Comentario, 'G');
            }, 3000);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data.Nombre,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }



      $scope.DescargarRespuesta = function (ruta) {
        // alert(ruta);
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/notificacionglosaips.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          window.open("temp/" + response.data);
        });
      }

      $scope.Abrir = function () {
        $('#modalcomentarios').modal('open');
        setTimeout(function () {
          var Width = document.querySelector(".chat_titulo").offsetWidth;
          document.querySelector('.chat_triangle_der').style.marginLeft = (Width - 30) + 'px';
          document.querySelector('#modalcomentarios').style.top = 1 + '%';
          document.querySelector('#modalcomentarios').style.maxHeight = (Height + 20) + 'px';
        }, 600);

      }


      $scope.Ver_Glosa_Informacion = function (x) {
        swal({
          title: 'Información de la Glosa',
          input: 'textarea',
          inputValue: x.DETALLE_GLOSA,
          showCancelButton: true,
          cancelButtonText: 'Cerrar',
          showConfirmButton: false,
          customClass: 'swal-wide'
        }).then(function (result) {
          $(".confirm").attr('disabled', 'disabled');
        }).catch(swal.noop);
        document.querySelector('.swal2-textarea').setAttribute("readonly", true);
        document.querySelector('.swal2-textarea').style.height = '300px';
      }

      $scope.filter = function (val) {
        $scope.Lista_GlosaTemp = $filter('filter')($scope.Lista_Glosa, ($scope.filter_save == val) ? '' : val);
        if ($scope.Lista_GlosaTemp.length > 0) {
          $scope.setPage(1);
        }
        $scope.configPages();
        $scope.filter_save = val;
      }
      $scope.closeModal = function () {
        $('.modal').modal('close');
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.Lista_GlosaTemp.length / $scope.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope.Lista_GlosaTemp.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.Lista_GlosaTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.Lista_GlosaTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.Lista_GlosaTemp.length / $scope.pageSize);
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
          if ($scope.Lista_GlosaTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.Lista_GlosaTemp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.Lista_GlosaTemp.length / $scope.pageSize) + 1;
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

      $scope.getNum = function (val) {
        var val2 = parseInt(val.toString());
        console.log(val2);
        console.log((val2 / $scope.List_Estados_CantTotal).toFixed(1));
        if (isNaN(val)) {
          return 0;
        }
        return val2;
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
