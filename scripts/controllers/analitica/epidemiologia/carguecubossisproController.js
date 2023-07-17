'use strict';
angular.module('GenesisApp')
  .controller('carguecubossisproController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {
        console.log($(window).width());
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_Pantalla();

        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $('.tabs').tabs();
        // $scope.Tabs = 1;
        $scope.SysDay = new Date();
        $scope.listLimpiar();
        $scope.hoja1Limpiar();
        $scope.hoja2Limpiar();
        // $scope.hoja3Limpiar();
        $scope.obtenerPermisos();
        $scope.obtenerListadoCargues();
        $scope.obtenerListadoFuncs();
        $('.modal').modal();
        setTimeout(() => {
          $scope.$apply();
        }, 500);

        //////////////////////////////////////////////////////////
      }
      $scope.hoja1Limpiar = function () {
        $scope.hoja1 = {
          tipoCubo: '',
          anio: '',
          mes: 'x',
          archivoB64: '',

          nombreFile: '',
          textoFile: 'Cargar Archivo'
        };

        $scope.btnGuardarDsb = false;
        setTimeout(() => {
          $scope.$apply();
        }, 700);
      }

      $scope.hoja1LimpiarFile = (x) => {
        $scope.hoja1.archivoB64 = '';
        document.querySelector('#files_cargue').value = '';
        if (!x) {
          $scope.hoja1.nombreFile = ($scope.hoja1.tipoCubo && $scope.hoja1.anio && $scope.hoja1.mes && $scope.hoja1.mes != 'x') ? `${$scope.hoja1.tipoCubo}_${$scope.hoja1.mes}${$scope.hoja1.anio}.txt` : '';
          $scope.hoja1.textoFile = ($scope.hoja1.tipoCubo && $scope.hoja1.anio && $scope.hoja1.mes && $scope.hoja1.mes != 'x') ? `Cargar Archivo (${$scope.hoja1.nombreFile})` : 'Cargar Archivo';
        }
        setTimeout(() => { $scope.$apply(); }, 500);
      }


      $scope.listLimpiar = function () {
        $scope.list = {
          listadoAnio: [],
          listadoMes: [],
          listadoCargues: [],
          listadoFuncionarios: []
        };

        for (let i = 2018; i <= $scope.SysDay.getFullYear(); i++) {
          $scope.list.listadoAnio.push({ 'codigo': i });
        }

      }
      ///////// HOJA 1
      $scope.obtenerMeses = (anio) => {
        if (anio) {

          $scope.list.listadoMes = []
          // Calcular mes max
          let mesCod = 12, mesNombre = '';
          if (anio == $scope.SysDay.getFullYear()) {
            mesCod = $scope.SysDay.getMonth() + 1;
          }
          for (let i = 1; i <= mesCod; i++) {
            let newFecha = new Date();
            newFecha.setMonth(i - 1)
            mesNombre = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(newFecha);
            $scope.list.listadoMes.push({ 'codigo': (i <= 9) ? `0${i}` : i, 'nombre': mesNombre.charAt(0).toUpperCase() + mesNombre.slice(1) });
          }
          setTimeout(() => {
            $scope.hoja1.mes = 'x'
            $scope.$apply();
          }, 500);
        }
      }

      $scope.calcularNombreArchivo = () => {
        if ($scope.hoja1.tipoCubo && $scope.hoja1.anio && $scope.hoja1.mes && $scope.hoja1.mes != 'x') {
          $scope.hoja1.nombreFile = `${$scope.hoja1.tipoCubo}_${$scope.hoja1.mes}${$scope.hoja1.anio}.txt`;
          $scope.hoja1.textoFile = `Cargar Archivo (${$scope.hoja1.nombreFile})`;
          $scope.hoja1LimpiarFile(1)
        } else {
          $scope.hoja1LimpiarFile()
        }
      }
      $scope.$watch("hoja1.tipoCubo", function (newValue, oldValue) {
        $scope.calcularNombreArchivo()
      });
      $scope.$watch("hoja1.anio", function (newValue, oldValue) {
        $scope.calcularNombreArchivo()
      });
      $scope.$watch("hoja1.mes", function (newValue, oldValue) {
        $scope.calcularNombreArchivo()
      });

      document.querySelector('#files_cargue').addEventListener('change', function (e) {
        $scope.Data = [];
        var files = e.target.files;
        if (files.length != 0 && files[0].size > 0) {
          swal({ title: 'Validando archivo...' });
          swal.showLoading();
          const ext = files[0].name.split('.').pop(), name = files[0].name.toString().toUpperCase();
          // if($scope.hoja1.nombreFile == )
          if (ext.toUpperCase() != 'TXT') {
            $scope.hoja1LimpiarFile()
            swal('Advertencia', '¡El archivo seleccionado debe ser formato TXT!', 'info');
            return;
          }
          if (files[0].size > 15485760) {
            $scope.hoja1LimpiarFile()
            swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (15MB)!', 'info');
            return;
          }
          if (name != $scope.hoja1.nombreFile.toUpperCase()) {
            $scope.hoja1LimpiarFile()
            swal('Advertencia', '¡Debe corregir el nombre del archivo!', 'info');
            return;
          }
          // if (files[0].size > 0) {
          $scope.validarEstructura(files[0], 8);
          // }
        } else {
          $scope.hoja1LimpiarFile()
        }
      });
      $scope.validarEstructura = function (progressEvent, tamaño) {
        var file = progressEvent;
        var reader = new FileReader();
        reader.onload = function (progressEvent) {
          $scope.estado = true;
          var lines = this.result.split('\r\n');
          var datos;

          for (var line = 0; line < lines.length; line++) {
            datos = lines[line].split('|');

            if (datos != '' && datos != undefined && datos != null) {
              if (datos.length == tamaño) {
                $scope.estado = true;
              } else {
                $scope.estado = false;
                break;
              }
            }
          }

          if ($scope.estado == true) {
            $scope.hoja1.textoFile = 'Archivo Cargado';
            $scope.getBase64(file).then(function (result) {
              $scope.hoja1.archivoB64 = result;
              swal("Mensaje", "El archivo cumple con la cantidad de columnas!", "success").catch(swal.noop);
              setTimeout(function () { $scope.$apply(); }, 300);
            });

            setTimeout(() => { $scope.$apply(); }, 500);
          } else {
            $scope.hoja1LimpiarFile()
            // $scope.Data = [];
            swal('Advertencia', 'el archivo presenta error de estructura tiene mas columnas de las ' + tamaño + ' esperadas.', 'info')
          }
        };
        reader.readAsText(file);
      }
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
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Guardando Soporte...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          const nombreCarpeta = `${$scope.hoja1.mes}${$scope.hoja1.anio}`;
          const nombreArchivo = `${$scope.hoja1.tipoCubo}_${$scope.hoja1.mes}${$scope.hoja1.anio}`;
          $http({
            method: 'POST',
            url: "php/epidemiologia/carguecubossispro.php",
            data: { function: "cargarSoporte", nombreCarpeta, nombreArchivo, base64: $scope.hoja1.archivoB64 }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }

      $scope.guardarCargue = () => {
        $scope.btnGuardarDsb = true;
        // $scope.hoja1.tipoCubo
        // $scope.hoja1.anio
        // $scope.hoja1.mes
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $scope.cargarSoporte().then((result) => {
          console.log(result);
          if (result) {
            // swal("Mensaje", "Soporte Guardado!", "success").catch(swal.noop);
            const datos = {
              Tipo_reporte: $scope.hoja1.tipoCubo == 'NAC' ? '1' : '2',
              Ano: $scope.hoja1.anio,
              Mes: $scope.hoja1.mes,
              Url: result,
              Responsable: $scope.Rol_Cedula
            }
            $http({
              method: 'POST',
              url: "php/epidemiologia/carguecubossispro.php",
              data: {
                function: "p_ui_cargue",
                datos: JSON.stringify(datos)
              }
            }).then(function ({ data }) {
              $scope.btnGuardarDsb = false;
              if (data.toString().substr(0, 3) != '<br') {
                if (data.Codigo == 0) {
                  $scope.hoja1Limpiar();
                  $scope.hoja1LimpiarFile();

                  $scope.obtenerListadoCargues(1);
                  swal("¡Mensaje!", data.Nombre, "success").catch(swal.noop);
                } else if (data.length > 0 && data.length < 1001) {

                  var list = "<ul class='collapsible' style='max-height: 50vh;overflow: auto;'>";
                  list += "<li class='left-align'><div class='collapsible-header blue-text'><i class='material-icons'>error</i><small class='float-right red-text'> Errores encontrados: " + data.length + "</small>" + "</div><div class='collapsible-body'>";
                  data.forEach(function (error, index) {
                    list += "<p style='padding: .5rem;'><span><b>Error #" + (index + 1) + ":</b> " + error.Nombre + "</span></p>";
                  });
                  list += "</div></li></ul>";
                  swal({
                    title: "Advertencia",
                    width: 600, html: list,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonText: 'Descargar Errores',
                    confirmButtonColor: '#188038',
                    // showCancelButton: true,
                    type: "warning"
                  }).then(function (result) {
                    if (result) {
                      var csv = data.map(function (d) {
                        return (d.Nombre);
                      }).join('\n')
                        .replace(/(^\[)|(\]$)/mg, '');
                      const url = URL.createObjectURL(new Blob([csv]))
                      const link = document.createElement('a')
                      link.href = url
                      link.setAttribute('download', `Errores CUBOS SISPRO ${new Date().toLocaleDateString()}.txt`)
                      document.body.appendChild(link)
                      link.click()
                    }
                  }).catch(swal.noop);
                  $(document).ready(function () {
                    $('.collapsible').collapsible();
                  });
                } else if (data.length > 1000) {
                  const text = `Errores encontrados (${data.length})`;
                  swal("¡Mensaje!", text, "success").catch(swal.noop);

                  var csv = data.map(function (d) {
                    return (d.Nombre);
                  }).join('\n')
                    .replace(/(^\[)|(\]$)/mg, '');
                  const url = URL.createObjectURL(new Blob([csv]))
                  const link = document.createElement('a')
                  link.href = url
                  link.setAttribute('download', `Errores CUBOS SISPRO ${new Date().toLocaleDateString()}.txt`)
                  document.body.appendChild(link)
                  link.click()

                } else {
                  swal("¡Importante!", data.Nombre, "warning").catch(swal.noop);
                }
              } else {
                swal("¡Importante!", data, "warning").catch(swal.noop);
              }
            })
          } else {
            $scope.btnGuardarDsb = false;
          }
        })
      }


      // const datos = [
      //   {
      //     "Codigo": "1",
      //     "Nombre": "Campo municipio solo se permite caracter (-). Error en la linea 1"
      //   },
      //   {
      //     "Codigo": "1",
      //     "Nombre": "Campo grupo etareo solo se permite caracter (-). Error en la linea 1"
      //   },
      //   {
      //     "Codigo": "1",
      //     "Nombre": "Campo municipio solo se permite caracter (-). Error en la linea 2"
      //   },
      //   {
      //     "Codigo": "1",
      //     "Nombre": "Campo grupo etareo solo se permite caracter (-). Error en la linea 2"
      //   },
      //   {
      //     "Codigo": "1",
      //     "Nombre": "Campo municipio solo se permite caracter (-). Error en la linea 3"
      //   }
      // ];

      ///////// HOJA 1
      ///////// HOJA 2
      $scope.hoja2Limpiar = function () {
        $scope.hoja2 = {
          filtro: ''
        };
        setTimeout(() => {
          $scope.$apply();
        }, 300);
      }

      $scope.obtenerListadoCargues = (x) => {
        $scope.list.listadoCargues = [];
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
          url: "php/epidemiologia/carguecubossispro.php",
          data: {
            function: 'p_consulta_cargue'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            $scope.list.listadoCargues = data;
          } else {
            // if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            if (data != 0) { swal("¡Importante!", data, "warning").catch(swal.noop); return }
          }
        });
      }


      ///////// HOJA 2
      ///////// HOJA 3
      $scope.hoja3Limpiar = function () {
        $scope.hoja3 = {
          filtro: ''
        };
        setTimeout(() => {
          $scope.$apply();
        }, 300);
      }

      $scope.obtenerPermisos = function () {
        $http({
          method: 'POST',
          url: "php/epidemiologia/carguecubossispro.php",
          data: {
            function: 'p_ver_permisos_funcs',
            cedula: $scope.Rol_Cedula
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            $scope.permisos = data;
            setTimeout(() => {
              if ($scope.permisos.CARGAR_REPORTE === undefined) {
                $scope.Tabs = 2;
                $('#tabConsulta').click();
              } else {
                $scope.Tabs = 1;
                $('#tabCargue').click();
              }
              setTimeout(() => {
                $('.tabs').tabs();
                $scope.$apply();
              }, 500);
            }, 1000);
          } else {
            if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            swal("¡Importante!", data, "warning").catch(swal.noop);
          }
        });
      }
      $scope.obtenerListadoFuncs = function (x) {
        $scope.list.listadoFuncionarios = [];
        // Recibe x para no mostrar swalLoading
        // $scope.list.listadoFuncionarios = [];
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $http({
          method: 'POST',
          url: "php/epidemiologia/carguecubossispro.php",
          data: {
            function: 'p_listar_funcs'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            $scope.list.listadoFuncionarios = data;
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
              url: "php/epidemiologia/carguecubossispro.php",
              data: {
                function: 'p_ui_funcs',
                cedula: result
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
          url: "php/epidemiologia/carguecubossispro.php",
          data: {
            function: 'p_ui_funcs',
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
