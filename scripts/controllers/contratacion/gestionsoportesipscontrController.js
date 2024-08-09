'use strict';
angular.module('GenesisApp')
  .controller('gestionsoportesipscontrController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {
        console.log($(window).width());
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_Pantalla();
        $('.modal').modal();

        $scope.Rol_Nit = sessionStorage.getItem('nit');
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $scope.SysDay = new Date();
        $scope.Hoja1Limpiar();

        $scope.obtenerListado();

        setTimeout(() => {
          $scope.$apply();
        }, 500);

        //////////////////////////////////////////////////////////
      }
      $scope.Hoja1Limpiar = function () {
        $scope.Hoja1 = {
          datos: ''
        };
        $scope.List1 = {};

        setTimeout(() => {
          $scope.$apply();
        }, 300);
      }

      $scope.obtenerListado = function (x) {
        $scope.itemSeleccionado = '';
        $scope.List1.listadoContratoss = [];

        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_LISTA_SOPORTES_CONTRATOS_IPS',
            nit: $scope.Rol_Nit
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          $scope.List1.listadoContratoss = data;
          setTimeout(() => { $scope.$apply(); }, 500);
        });
      }

      $scope.seleccionarContrato = function (x) {
        $scope.itemSeleccionado = x.OSOV_NUMERO + '_' + x.OSON_RENGLON;
        $scope.Hoja1.datos = x;
        $scope.tiposAdjuntoEnv = []
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_LISTA_SOPORTES_CONTRATOS_DETALLE',
            nit: $scope.Rol_Nit,
            renglon: x.OSON_RENGLON
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length > 0) {
            $scope.tiposAdjuntoEnv = data;


            if (x.OSOV_ESTADO == 'A') {
              setTimeout(() => {
                $scope.cargarFileUnico();
                setTimeout(() => { $scope.$apply(); }, 500);
              }, 2500);
            }
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })

        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.filterAdjuntoEnv = function (x) {
        if ($scope.Hoja1.datos.OSOV_ESTADO == 'A') {
          return x.TIPC_IPS_ENTREGA
        } else {
          return ''
        }
      }

      $scope.cargarFileUnico = function () {
        document.querySelectorAll('.fileSoportesUnico').forEach((filef) => filef.addEventListener('change', function (e) {
          var files = e.target.files;
          const id = e.target.id.split('_')[1];

          var index = $scope.tiposAdjuntoEnv.findIndex(x => x.OSOV_TIPO_SOPORTE == id);
          $scope.tiposAdjuntoEnv[index].soporteB64 = '';

          setTimeout(() => { $scope.$apply(); }, 500);
          if (files.length != 0) {
            for (let i = 0; i < files.length; i++) {
              const x = files[i].name.split('.'), ext = x[x.length - 1].toUpperCase();
              if (ext == 'PDF' || ext == 'DOCX' || ext == 'XLS' || ext == 'XLSX') {
                if (files[i].size < 5485760 && files[i].size > 0) {
                  $scope.getBase64(files[i]).then(function (result) {
                    $scope.tiposAdjuntoEnv[index].soporteExt = ext.toLowerCase();
                    $scope.tiposAdjuntoEnv[index].soporteB64 = result;
                    $scope.tiposAdjuntoEnv[index].ruta = '';
                    setTimeout(function () { $scope.$apply(); }, 300);
                  });
                  setTimeout(() => { $scope.$apply(); }, 500);
                } else {
                  e.target.value = '';
                  swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (5MB)!', 'info');
                }
              } else {
                e.target.value = '';
                swal('Advertencia', '¡Solo se admiten archivos (PDF, .DOCX, .XLS, .XLSX)!', 'info');
              }
            }
          }
        })
        )

      }

      $scope.validarSoporteVacios = function () {
        return new Promise((resolve) => {
          var vacios = 0
          $scope.tiposAdjuntoEnv.forEach(element => {
            if (element.TIPC_IPS_ENTREGA == 'S' && !element.soporteB64) { vacios++ }
          });
          resolve(vacios);
        });
      }

      $scope.guardarAdjuntoEnviados = function () {
        $scope.validarSoporteVacios().then((validSoportes) => { // Validar campos vacios
          if (!validSoportes) {
            swal({
              title: 'Confirmar',
              text: '¿Seguro que desea guardar los soportes?',
              type: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmar'
            }).then((result) => {
              if (result) {

                swal({
                  html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando soportes...</p>',
                  width: 200,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  showConfirmButton: false,
                  animation: false
                });

                var promesas = [];
                $scope.tiposAdjuntoEnv.forEach((e, index) => {
                  if (e.soporteB64) {

                    promesas.push($scope.cargarSoporte(index));
                  }
                })
                Promise.all(promesas).then(response => {
                  // Cuando todas las promesas se resuelvan, imprimimos las respuestas
                  var errors = 0
                  response.forEach(element => {
                    if (element.substr(0, 1) != '/') {
                      errors++;
                    }
                  });
                  setTimeout(() => { $scope.$apply(); }, 500);
                  if (errors == 0) {//GUARDA EN BD

                    var data = []

                    $scope.tiposAdjuntoEnv.forEach(e => {

                      data.push({
                        documento: $scope.Hoja1.datos.OSOC_DOCUMENTO,
                        numero: $scope.Hoja1.datos.OSOV_NUMERO,
                        ubicacion: $scope.Hoja1.datos.OSON_UBICACION,
                        tercero: $scope.Hoja1.datos.OSON_TERCERO,
                        renglon: $scope.Hoja1.datos.OSON_RENGLON,

                        tipo_soporte: e.OSOV_TIPO_SOPORTE,
                        ruta_soporte: e.ruta ? e.ruta : e.OSOV_RUTA_SOPORTE_EPS,

                        opcion: 'A',
                        tipo: 'I'
                      })
                    });
                    console.table(data);

                    $http({
                      method: 'POST',
                      url: "php/contratacion/funccontratacion.php",
                      data: {
                        function: 'P_U_SOPORTE_CONTRATO',
                        datos: JSON.stringify(data),
                        cantidad: data.length
                      }
                    }).then(function ({ data }) {
                      if (data.toString().substr(0, 3) == '<br' || data == 0) {
                        swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                      }
                      if (data.codigo == 0) {
                        swal('¡Mensaje!', data.nombre, 'success').catch(swal.noop);
                        $scope.obtenerListado(1);
                        setTimeout(() => { $scope.$apply(); }, 500);
                      }
                      if (data.codigo == 1) {
                        swal("Mensaje", data.nombre, "warning").catch(swal.noop);
                      }
                    })
                    // console.log($scope.tiposAdjuntoEnv);
                  } else {
                    swal("Error", 'Ocurrio un inconveniente al cargar los archivos, intentar nuevamente', "warning").catch(swal.noop); return
                  }
                  // Aquí puedes imprimir cualquier mensaje que desees después de recibir todas las respuestas
                  console.log('Todas las peticiones completadas');
                });
                //////////////////////
              }
            })


          } else {
            swal('Información', 'Cargue los soportes requeridos', 'info');
          }
        })

      }

      $scope.cargarSoporte = function (index) {
        return new Promise((resolve) => {
          if (!$scope.tiposAdjuntoEnv[index].soporteB64) { resolve(''); return }
          if ($scope.tiposAdjuntoEnv[index].ruta != '') { resolve('/'); return }

          $http({
            method: 'POST',
            url: "php/contratacion/funccontratacion.php",
            data: {
              function: "cargarSoporteAdjuntoEnv",
              carpeta: `${$scope.Hoja1.datos.OSOC_DOCUMENTO}_${$scope.Hoja1.datos.OSOV_NUMERO}_${$scope.Hoja1.datos.OSON_UBICACION}`,
              name: `${$scope.tiposAdjuntoEnv[index].OSOV_TIPO_SOPORTE}`,
              base64: $scope.tiposAdjuntoEnv[index].soporteB64,
              ext: $scope.tiposAdjuntoEnv[index].soporteExt
            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              $scope.tiposAdjuntoEnv[index].ruta = data;
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }





      $scope.devolverAdjuntos = function () {
        $scope.soporteDevolucion = {
          observacion: '',
          soporteExt: '',
          soporteB64: ''
        }
        swal({
          title: 'Devolución de soportes',
          html: `
          <div class="col s12 no-padding label-new m-b m-t" style="margin-top: 2rem;margin-bottom: 5.5rem;">
            <textarea class="white input-text-new input-out-new w-100 margin m-l m-r" maxlength="4000"
              style="height: 100px;text-transform:uppercase;text-align: justify;" autocomplete="off"
              placeholder="Observación" id="observacionDevolucion"></textarea>
          </div>
          <div class="col s12 m12 l12 m-b" style="margin-bottom: 1.5rem;">
            <div class="col s6 no-padding label-new m-b" id="AdjustSop">
              <div class="file-field input-field gray-input m-l input-file-radiu input-file-radius-opcional"
                style="margin: 0;width: -webkit-fill-available;">
                <div class="right">
                  <span class="black-text"><i class="icon-folder-open-1 default-color"
                    style="line-height: 2rem;"></i></span>
                    <input type="file" id="SoporteProces" ng-change="loadFile()">
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path Soport" type="text" placeholder="Adjunte un archivo (PDF)"
                    readonly style="border-radius: 0;height: 2rem;border-bottom: 0;"
                    ng-change="loadFile()">
                </div>
              </div>
            </div>
          </div>
                `,

          width: '500px',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',

          preConfirm: function () {
            return new Promise(function (resolve) {
              resolve(
                {
                  observacion: $('#observacionDevolucion').val(),
                  soporte: $('#SoporteProces').val(),
                }
              )
            })
          }
        }).then(function (result) {
          if (!result.observacion) {
            swal("info", '¡La observacion no puede ir vacia!', "warning").catch(swal.noop); return
          }
          console.log(result)
          $scope.soporteDevolucion.observacion = result.observacion
          $scope.soporteDevolucion.soporte = document.querySelector('#SoporteProces')
          //
          swal({
            title: 'Confirmar',
            text: '¿Seguro que desea devolver los soportes?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result) {
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              });
              $scope.loadFileDevolucion()
            }
          })
          //
        })
      }

      $scope.loadFileDevolucion = function () {
        $scope.soporteDevolucion.soporteB64 = '';
        var fileInput = $scope.soporteDevolucion.soporte;

        if (fileInput.files.length == 0) {
          $scope.subirFTPDevolucion();
          return;
        }
        var x = fileInput.files[0].name.split('.'), ext = x[x.length - 1].toUpperCase();

        if (fileInput.files[0].size < 10485760 && fileInput.files[0].size > 0) {
          if (ext == 'PDF') {
            $scope.getBase64(fileInput.files[0]).then(function (result) {
              $scope.soporteDevolucion.soporteB64 = result;
              $scope.soporteDevolucion.soporteExt = ext.toLowerCase();
              //
              $scope.subirFTPDevolucion();
              //
            });
          } else {
            swal('Advertencia', '¡El archivo seleccionado deber ser formato PDF!', 'info');
            $scope.soporteDevolucion.soporteB64 = '';
          }
        } else {
          swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (10MB)!', 'info');
          $scope.soporteDevolucion.soporteB64 = '';
        }
      }

      $scope.subirFTPDevolucion = function () {
        if ($scope.soporteDevolucion.soporteB64 == '') {
          $scope.guardarDevolucion('');
        }

        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: "cargarSoporteAdjuntoEnv",
            carpeta: `${$scope.Hoja1.datos.OSOC_DOCUMENTO}_${$scope.Hoja1.datos.OSOV_NUMERO}_${$scope.Hoja1.datos.OSON_UBICACION}`,
            name: 'Devolucion_IPS',
            base64: $scope.soporteDevolucion.soporteB64,
            ext: $scope.soporteDevolucion.soporteExt
          }
        }).then(function ({ data }) {
          if (data.substr(0, 1) != '0') {
            $scope.guardarDevolucion(data);
          } else {
            swal('Advertencia', '¡Ocurrio un error, Intente nuevamente!', 'info');
          }
        });
      }

      $scope.guardarDevolucion = function (ruta) {

        const datos = [
          {
            documento: $scope.Hoja1.datos.OSOC_DOCUMENTO,
            numero: $scope.Hoja1.datos.OSOV_NUMERO,
            ubicacion: $scope.Hoja1.datos.OSON_UBICACION,
            tercero: $scope.Hoja1.datos.OSON_TERCERO,
            renglon: $scope.Hoja1.datos.OSON_RENGLON,

            ruta_soporte: ruta,

            observacion: $scope.soporteDevolucion.observacion,
            responsable: $scope.Rol_Cedula,
            opcion: 'D',
            tipo: 'I'
          }
        ]

        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_U_SOPORTE_CONTRATO',
            datos: JSON.stringify(datos),
            cantidad: 1
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.codigo == 0) {
            swal("Mensaje", data.nombre, "success").catch(swal.noop);
            setTimeout(() => {
              $scope.obtenerListado(1);
            }, 2500);
            setTimeout(() => { $scope.$apply(); }, 500);
          }
          if (data.codigo == 1) {
            swal("Mensaje", data.nombre, "warning").catch(swal.noop);
          }
        })
      }


      $scope.verObs = function (text) {
        swal({
          title: 'Observación de devolución',
          input: 'textarea',
          cancelButtonText: 'Cerrar',
          // inputPlaceholder: 'Escribe un comentario...',
          showCancelButton: true,
          showConfirmButton: false,
          inputValue: text
        }).then(function (result) {
          $(".confirm").attr('disabled', 'disabled');
        }).catch(swal.noop);
        document.querySelector('.swal2-textarea').setAttribute("readonly", true);
        document.querySelector('.swal2-textarea').style.height = '300px';
      }

      $scope.modalRespuestas = function () {
        $scope.listadoRespuestas = []
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
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_LISTA_DEVOLUCIONES_RESPUESTAS',
            nit: $scope.Rol_Nit,
            renglon: $scope.Hoja1.datos.OSON_RENGLON
          }
        }).then(function ({ data }) {
          swal.close()
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length > 0) {
            $scope.openModal('modal_Respuestas');
            $scope.listadoRespuestas = data;
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })

        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.descargafile = function (ruta) {
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
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          swal.close()
          window.open("temp/" + response.data);
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
      $scope.openModal = function (modal) {
        $(`#${modal}`).modal('open');
        setTimeout(() => { document.querySelector(`#${modal}`).style.top = 1 + '%'; }, 600);
      }
      $scope.closeModal = function () {
        $(".modal").modal("close");
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

    }]);


