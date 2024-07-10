'use strict';
angular.module('GenesisApp')
  .controller('gestionsoportesipscontrController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {
        console.log($(window).width());
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_Pantalla();

        $scope.Rol_Nit = sessionStorage.getItem('nit');
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

      $scope.seleccionarContrato = function (x, index) {
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

                        opcion: 'I'
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

      $scope.descargafile = function (ruta) {
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          //window.open("https://www.cajacopieps.com/genesis/temp/"+response.data);
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


