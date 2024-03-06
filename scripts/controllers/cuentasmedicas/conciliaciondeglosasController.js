'use strict';
angular.module('GenesisApp')
  .controller('conciliaciondeglosasController', ['$scope', '$http', '$filter', '$window',
    function ($scope, $http, $filter, $window) {
      $scope.Inicio = function () {
        $scope.Ajustar_Pantalla();
        $('.modal').modal();
        $('.tabs').tabs();
        $scope.Rol_Nit = sessionStorage.getItem('nit');
        // $scope.Rol_Nit = 900465319;
        console.log(sessionStorage.getItem('nit'));
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $scope.tabs = 1;
        $scope.Lista_Glosa = [];
        $scope.Lista_GlosaTemp = [];

        $scope.listarGlosasIPS();
        // $scope.listarGlosasIPSConsulta();

        $scope.Vista = 0;
        $scope.VistaConsulta = 0;

        $scope.SysDay = new Date();
        $scope.Responder_NOIPS_Fecha = new Date();

        // PENDIENTE
        // EN CONCILIACION
        // CONCILIADA

      };


      $scope.listarGlosasIPS = function (msg) {
        if (msg == null) {
          swal({ title: 'Cargando...', allowOutsideClick: false });
          swal.showLoading();
        }
        $scope.glosaSeleccionadas = []
        $scope.statusGrupo = 0;
        $scope.filtroEstado = '';
        $scope.Lista_Glosa = [];
        $scope.Lista_GlosaTemp = [];
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/conciliaciondeglosas.php",
          data: { function: 'listarGlosasIPS', marcaConciliada: 'N' }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            if (data.length) {
              data.forEach(e => {
                e.SELECCIONADO = false;
              })
              data.forEach(e => {
                e.NOTC_STATUS1 = e.NOTC_STATUS1.trim()
                e.ESTADO_TEXTO = $scope.obtenerEstado(e.NOTC_STATUS1.trim())
              })

              $scope.Lista_Glosa = data;
              // $scope.Lista_Glosa = datos;
              $scope.Lista_GlosaTemp = $scope.Lista_Glosa;
              $scope.currentPage = 0;
              $scope.pageSize = 10;
              $scope.valmaxpag = 10;
              $scope.pages = [];
              $scope.configPages();

              if (msg == null) { $scope.Vista = 0; swal.close(); }
            } else {
              swal("Mensaje", "No existen glosas para mostrar", "info").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "info").catch(swal.noop);
          }
        })
        setTimeout(() => { $scope.$apply(); }, 500);

      }


      $scope.modalPorcentajeConciliar = function (x) {
        $scope.valoresGlosa = {
          porcentajeGL: 50,
          porcentajeGI: 50,
          valorFD: $scope.FormatPesoNumero(x.NTDV_VALOR_MANTENIDA),
          observacion: '',
        };
        $scope.datosConciliarFacturaGlosas = x;
        $('#modalPorcentajeConciliar').modal('open');
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.guardarPorcentajeConciliar = function () {
        if (parseInt($scope.valoresGlosa.porcentajeGL) + parseInt($scope.valoresGlosa.porcentajeGI) != 100) {
          swal("Mensaje", "Debe validar los valores", "info").catch(swal.noop); return;
        }
        if (!$scope.valoresGlosa.observacion) {
          swal("Mensaje", "Debe digitar una observación", "info").catch(swal.noop); return;
        }
        const text = `Desea conciliar las (${$scope.datosConciliarFacturaGlosas.CANTIDAD}) Glosas?`
        swal({
          title: 'Confirmar',
          text,
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {

            swal({ title: 'Cargando...', allowOutsideClick: false });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/cuentasmedicas/conciliaciondeglosas.php",
              data: {
                function: 'p_genera_conc_porc',
                documento: $scope.datosConciliarFacturaGlosas.DOC_NOT.split('-')[0],
                numero: $scope.datosConciliarFacturaGlosas.DOC_NOT.split('-')[1],
                ubicacion: $scope.datosConciliarFacturaGlosas.DOC_NOT.split('-')[2],
                valorFD: $scope.datosConciliarFacturaGlosas.TOTAL_GLOSA,
                observacion: $scope.valoresGlosa.observacion,
                porcentajeGL: $scope.valoresGlosa.porcentajeGL,
                porcentajeGI: $scope.valoresGlosa.porcentajeGI,
                responsable: $scope.Rol_Cedula
              }
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) == '<br' || data == 0) {
                swal("Mensaje", data || 'Sin datos', "warning").catch(swal.noop); return
              }
              if (data.Codigo == 0) {
                swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                $scope.listarGlosasIPS(1);
                $scope.closeModal()
              }
              if (data.Codigo == 1) {
                swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
              }
            })
          }
        })
      }

      // $scope.seleccionarTodos = function () {
      //   $scope.seleccionadosTodos = !$scope.seleccionadosTodos;
      //   $scope.listaGlosaIPS.forEach(e => {
      //     e.SELECCIONADO = $scope.seleccionadosTodos;
      //   })
      //   const text = $scope.seleccionadosTodos ? `Facturas Marcadas (${$scope.listaGlosaIPS.length})` : `Facturas Desmarcadas (${$scope.listaGlosaIPS.length})`
      //   $scope.listaGlosaIPS
      //   swal("Mensaje", text, "info").catch(swal.noop);
      //   setTimeout(() => { $scope.$apply(); }, 500);
      // }

      // $scope.aceptarGlosasMasivo = function () {
      //   var exists = 0
      //   $scope.listaGlosaIPS.forEach(e => {
      //     exists = (e.SELECCIONADO ? exists + 1 : exists)
      //   })
      //   if (exists == 0) {
      //     swal("Mensaje", "No existen glosas para mostrar", "info").catch(swal.noop); return
      //   }
      //   $scope.aprobarGlosasMasivo()
      // }
      // $scope.aprobarGlosasMasivo = function () {
      //   alert(1)
      // }



      $scope.validarMarcado = function (x) {

        if (x.NTDV_VALOR_MANTENIDA != 0) {
          swal("Mensaje", "El total mantenido debe estar en 0", "error").catch(swal.noop);
          return
        }
        if ($scope.glosaSeleccionadas.length && !$scope.glosaSeleccionadas.some(e => e.NIT === x.NIT)) {
          swal("Mensaje", "La Glosa no pertenece al mismo grupo del prestador seleccionado", "error").catch(swal.noop);
          return
        }
        if ($scope.glosaSeleccionadas.length && !$scope.glosaSeleccionadas.some(e => e.DOC_ACT === x.DOC_ACT)) {
          swal("Mensaje", "La Glosa ya tiene grupo relacionado", "error").catch(swal.noop);
          return
        }
        $scope.statusGrupo = 0;
        const index = $scope.glosaSeleccionadas.findIndex(e => e.DOC_NOT === x.DOC_NOT);
        // $scope.glosaSeleccionadas.push(x)
        if (!x.SELECCIONADO) {
          if (index === -1) $scope.glosaSeleccionadas.push(x);
        } else {
          if (index !== -1) $scope.glosaSeleccionadas.splice(index, 1);
        }
        x.SELECCIONADO = !x.SELECCIONADO;
        if ($scope.glosaSeleccionadas.length == 0) { $scope.filter(''); return }

        if (x.DOC_ACT != '--') {
          $scope.filter(x.DOC_ACT)
          $scope.statusGrupo = 2;
          // $scope.Lista_Glosa.forEach(e => {
          //   if (e.DOC_ACT === x.DOC_ACT) e.SELECCIONADO = true
          // })
        } else {
          $scope.statusGrupo = 1
        }

        //   const seleccionados = x.NOTC_STATUS1 === '0' ? $scope.seleccionadosPendientes : $scope.seleccionadosConciliacion;
        //   const index = seleccionados.findIndex(e => e.DOC_NOT === x.DOC_NOT);

        //   if (!x.SELECCIONADO) {
        //     if (index === -1) seleccionados.push(x);
        //   } else {
        //     if (index !== -1) seleccionados.splice(index, 1);
        //   }

        // x.SELECCIONADO = !x.SELECCIONADO;

        setTimeout(() => { $scope.$apply(); }, 500);
      }


      $scope.AgruparGrupo = function () {
        swal({
          title: 'Confirmar',
          text: 'Desea crear el grupo las Glosas seleccionadas?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {

            var data = []
            $scope.glosaSeleccionadas.forEach((e, index) => {
              data.push({
                num_ng: e.DOC_NOT.split('-')[1],
                ubi_ng: e.DOC_NOT.split('-')[2],
                renglon: (index + 1).toString()
              })
            });

            swal({ title: 'Cargando...', allowOutsideClick: false });
            swal.showLoading();

            $http({
              method: 'POST',
              url: "php/cuentasmedicas/conciliaciondeglosas.php",
              data: {
                function: 'p_agru_acta_conc',
                nit: $scope.glosaSeleccionadas[0].NIT,
                datos: JSON.stringify(data),
                cantidad: data.length,
                responsable: $scope.Rol_Cedula
              }
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) != '<br') {
                if (data.Codigo == 0) {
                  // $scope.Atras(0);
                  $scope.listarGlosasIPS('x');

                  $scope.closeModal();
                  swal("Mensaje", "Glosa gestionada!", "success").catch(swal.noop);
                } else {
                  swal("Mensaje", data.Nombre, "info").catch(swal.noop);
                }
              } else {
                swal("Mensaje", data, "info").catch(swal.noop);
              }
            });
          }
        });
      }

      $scope.generarActaGrupo = function (x) {
        // $scope.glosaSeleccionadas[0]
        $window.open('views/cuentasmedicas/formatos/formato_conciliacion_glosa.php?documento=' + 'AG' + '&numero=' + x.DOC_ACT.split('-')[1]
          + '&ubicacion=' + x.DOC_ACT.split('-')[2] + '&responsable=' + $scope.Rol_Cedula, '_blank', "width=1080,height=1100");

      }

      $scope.cargarSoporteGrupo = function () {

        $http({
          method: 'POST',
          url: "php/cuentasmedicas/conciliaciondeglosas.php",
          data: {
            function: 'p_adjunto_glosa_agru',
            documento: 'AG',
            numero: $scope.glosaSeleccionadas[0].DOC_ACT.split('-')[1],
            ubicacion: $scope.glosaSeleccionadas[0].DOC_ACT.split('-')[2],
            responsable: $scope.Rol_Cedula,
            adjunto: $scope.Comentario_Adjunto.Url
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            if (data.Codigo == 0) {
              // $scope.Comentario_Observacion = '';
              $scope.Comentario_Model_Adjunto = '';
              $scope.Comentario_Adjunto.Base = '';
              $scope.Comentario_Adjunto.Url = '';

              swal("¡Mensaje!", "Acta cargado correctamente", "success").catch(swal.noop);
              setTimeout(function () { $scope.$apply(); }, 300);
              $scope.closeModal()

              setTimeout(() => {
                $scope.listarGlosasIPS('x');
              }, 3000);
            } else {
              swal("Mensaje", data.Nombre, "info").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "info").catch(swal.noop);
          }
        });
      }

      $scope.listarGlosasIPSDetalle = function (x, msg) {
        if (msg == null) {
          swal({ title: 'Cargando...', allowOutsideClick: false });
          swal.showLoading();
        }
        $scope.listadoGlosasDetalle = [];
        $scope.ipsSeleccionada = x;
        $scope.filtroPorIps = x.DOC_NOT;
        $scope.filtroDetalle = ''
        console.log(x);
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/conciliaciondeglosas.php",
          data: { function: 'listarGlosasIPSDetalle', numero: x.DOC_NOT.split('-')[1], ubicacion: x.DOC_NOT.split('-')[2], marcaConciliada: 'N' }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            if (data.length) {
              let TOTAL_FACTURA = 0
              let TOTAL_GLOSA = 0
              let NTDV_VALOR_MANTENIDA = 0
              data.forEach(element => {
                TOTAL_FACTURA += parseFloat(element.TOTAL_FACTURA);
                TOTAL_GLOSA += parseFloat(element.TOTAL_GLOSA);

                NTDV_VALOR_MANTENIDA += parseFloat(element.NTDV_VALOR_MANTENIDA.toString().replace(',', '.'));
              });
              console.log("TOTAL_FACTURA", TOTAL_FACTURA);
              console.log("TOTAL_GLOSA", TOTAL_GLOSA);
              console.log("NTDV_VALOR_MANTENIDA", NTDV_VALOR_MANTENIDA);

              $scope.listadoGlosasDetalle = data;


              if (msg == null) { $scope.Vista = 1; swal.close(); }
            } else {
              swal("Mensaje", "No existen glosas para mostrar", "info").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "info").catch(swal.noop);
          }
        })

      }

      $scope.listarGlosasServicios = function (row) {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $scope.Array_ListadoGlosas = [];
        $scope.Array_ListadoGlosasTraza = undefined;
        $scope.glosaSeleccionada = row
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/conciliaciondeglosas.php",
          data: {
            function: 'listarGlosasServicios',
            documento: row.DOCUMENTO_FD.toString(),
            numero: row.NUMERO_FD.toString(),
            ubicacion: row.UBICACION_FD.toString(),
          }
        }).then(function ({ data }) {
          if (data) {
            if (data.length == 0 || data[0].Codigo != undefined) {
              swal("Mensaje", "¡No se encontraron glosas!", "info").catch(swal.noop);
            } else {
              data.forEach(element => {
                // element.VALOR_GLOSAR_EPS = parseFloat(element.FCDV_GLOSA_GL);
                // element.VALOR_GLOSAR_IPS = parseFloat(element.FCDV_GLOSA_GI);
                element.VALOR_GLOSAR_EPS = 0;
                element.VALOR_GLOSAR_IPS = 0;
                element.COMENTARIO = '';
              });
              $scope.Array_ListadoGlosas = data;
              $('#modal_Listado_Glosas_Servicios').modal('open');
              swal.close();
            }
          }
        })

      }

      $scope.guardarValoresGlosaDetalle = function () {
        var errorEncontrado = 0;
        $scope.Array_ListadoGlosas.forEach(e => {
          e.error = false
          if (parseFloat(e.MANT.toString().replace(',', '.')) <
            (parseFloat(e.VALOR_GLOSAR_EPS.toString().replace(/\./g, '').replace(/\,/g, '.')) +
              parseFloat(e.VALOR_GLOSAR_IPS.toString().replace(/\./g, '').replace(/\,/g, '.')))) {
            errorEncontrado++
            e.error = true
          }

        });
        if (errorEncontrado) {
          swal({
            title: "¡Mensaje!",
            text: 'No debe exceder el valor mantenido',
            type: "info"
          }).catch(swal.noop);
          return
        }
        /////////

        swal({
          title: 'Confirmar',
          text: 'Desea conciliar la Glosa?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {

            var data = []
            $scope.Array_ListadoGlosas.forEach(e => {
              data.push({
                renglon: e.FCDN_RENGLON,
                servicio: e.FCDV_PRODUCTO,
                valor_fd: e.MANT,
                valor_gl: ((e.VALOR_GLOSAR_EPS.toString().replace(/\./g, '')).replace(/\,/g, '.')),
                valor_gi: ((e.VALOR_GLOSAR_IPS.toString().replace(/\./g, '')).replace(/\,/g, '.')),
                observacion: e.FCDC_OBSERVACION,
                comentario: e.COMENTARIO
              })
            });


            swal({ title: 'Cargando...', allowOutsideClick: false });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/cuentasmedicas/conciliaciondeglosas.php",
              data: {
                function: 'guardarValoresGlosaDetalle',
                documento: $scope.glosaSeleccionada.DOCUMENTO_FD,
                numero: $scope.glosaSeleccionada.NUMERO_FD,
                ubicacion: $scope.glosaSeleccionada.UBICACION_FD,
                datos: JSON.stringify(data),
                cantidad: data.length,
                responsable: $scope.Rol_Cedula
              }
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) != '<br') {
                if (data.Codigo == 0) {
                  // $scope.Atras(0);
                  $scope.listarGlosasIPS('x');
                  $scope.listarGlosasIPSDetalle($scope.ipsSeleccionada, 'x');
                  $scope.closeModal();
                  swal("Mensaje", "Glosa gestionada!", "success").catch(swal.noop);
                } else {
                  swal("Mensaje", data.Nombre, "info").catch(swal.noop);
                }
              } else {
                swal("Mensaje", data, "info").catch(swal.noop);
              }
            });
          }
        });
      }

      // CONSULTA //
      $scope.listarGlosasIPSConsulta = function (msg) {
        if (msg == null) {
          swal({ title: 'Cargando...', allowOutsideClick: false });
          swal.showLoading();
        }
        $scope.filtroConsulta = ''
        $scope.listadoGlosasConsulta = [];
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/conciliaciondeglosasips.php",
          data: { function: 'p_lista_glosas_estado_conc_agru_consulta', nit: 0, marcaConciliada: 'N' }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            if (data.length) {
              $scope.listadoGlosasConsulta = data;

              if (msg == null) { $scope.VistaConsulta = 0; swal.close(); }
            } else {
              swal("Mensaje", "No existen glosas para mostrar", "info").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "info").catch(swal.noop);
          }
        })
        setTimeout(() => { $scope.$apply(); }, 500);

      }
      $scope.listarGlosasIPSDetalleConsulta = function (x, msg) {
        if (msg == null) {
          swal({ title: 'Cargando...', allowOutsideClick: false });
          swal.showLoading();
        }
        $scope.listadoGlosasDetalleConsulta = [];
        $scope.filtroDetalleConsulta = ''
        console.log(x);
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/conciliaciondeglosasips.php",
          data: { function: 'p_lista_glosas_estado_conc_consulta', numero: x.DOC_NOT.split('-')[1], ubicacion: x.DOC_NOT.split('-')[2], marcaConciliada: 'N' }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            if (data.length) {
              $scope.listadoGlosasDetalleConsulta = data;
              if (msg == null) { $scope.VistaConsulta = 1; swal.close(); }
            } else {
              swal("Mensaje", "No existen glosas para mostrar", "info").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "info").catch(swal.noop);
          }
        })

      }
      // CONSULTA //

      $scope.abrirModalCargueFormato = function (x) {
        $('#modalCargueFormato').modal('open');
        $scope.datosCargueFormato = x;
        $scope.Comentario_Adjunto = {}
        $scope.Comentario_Adjunto = {
          Base: '',
          Ruta: '',
          Ext: ''
        }
        document.querySelector('#Comentario_Adjunto').value = '';

        $scope.Comentario_Observacion = '';
        $scope.Comentario_Model_Adjunto = '';
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

      $scope.Antes_Inserta_CargueFormato = function () {
        // if ($scope.Comentario_Observacion.length > 0 && $scope.Comentario_Adjunto.Base != '') {
        if ($scope.Comentario_Adjunto.Base != '') {
          swal({
            title: 'Importante',
            text: '¿Está seguro que desea guardar el soporte?',
            type: "info",
            showCancelButton: true,
          }).catch(swal.noop)
            .then((willDelete) => {
              if (willDelete) {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $scope.Cargar_Soporte_FTP().then(function (resultado) {
                  var Archivos_Error = false;
                  for (var x = 0; x < resultado.length; x++) {
                    if (resultado[x].substr(0, 3) == '<br' || (resultado[x] == '' && $scope.Comentario_Adjunto.Base != '')) {
                      Archivos_Error = true;
                      swal('¡Error al subir un archivo!', 'Nota: Si el error persiste, por favor actualizar la página (CONTROL + F5).', 'warning').catch(swal.noop);
                    }
                  }
                  if (Archivos_Error == false) {
                    if (!$scope.glosaSeleccionadas.length) {
                      $scope.Inserta_CargueFormato();
                    } else {
                      $scope.cargarSoporteGrupo();
                    }
                  }
                });
              }
            });
        } else {
          // title: '¡Debe escribir un comentario y Cargar el soporte firmado del ACTA DE CONCILIACION DE GLOSAS!',
          swal({
            title: '¡Debe cargar el soporte firmado del ACTA DE CONCILIACION DE GLOSAS!',
            type: 'info'
          }).catch(swal.noop);
        }
      }


      $scope.Cargar_Soporte_FTP = function () {
        return new Promise((resolve, reject) => {
          if ($scope.Comentario_Adjunto.Base != '') {
            $http({
              method: 'POST',
              url: "php/cuentasmedicas/conciliaciondeglosas.php",
              data: {
                function: 'cargarSoporte',
                base: $scope.Comentario_Adjunto.Base,
                ext: $scope.Comentario_Adjunto.Ext,
                name: !$scope.glosaSeleccionadas.length ? $scope.datosCargueFormato.NIT : $scope.glosaSeleccionadas[0].NIT
              }
            }).then(function (response) {
              $scope.Comentario_Adjunto.Url = response.data;
              resolve(response.data);
            });
          } else {
            resolve('xxx');
          }
        });
      }

      $scope.Inserta_CargueFormato = function () {
        // swal({ title: 'Cargando...', allowOutsideClick: false });
        // swal.showLoading();

        $http({
          method: 'POST',
          url: "php/cuentasmedicas/conciliaciondeglosas.php",
          data: {
            // function: 'guardarFacturaGlosa', documento: 'NG', numero: parseInt($scope.datosCargueFormato.NUMERO), ubicacion: parseInt($scope.datosCargueFormato.UBICACION),
            // responsable: parseInt($scope.Rol_Cedula), adjunto: $scope.Comentario_Adjunto.Url
            function: 'guardarFacturaGlosa', documento: 'NG', numero: $scope.datosCargueFormato.DOC_NOT.split('-')[1],
            ubicacion: $scope.datosCargueFormato.DOC_NOT.split('-')[2],
            responsable: $scope.Rol_Cedula, adjunto: $scope.Comentario_Adjunto.Url
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            if (data.Codigo == 0) {
              // $scope.Comentario_Observacion = '';
              $scope.Comentario_Model_Adjunto = '';
              $scope.Comentario_Adjunto.Base = '';
              $scope.Comentario_Adjunto.Url = '';
              swal("¡Mensaje!", "Acta cargado correctamente", "success").catch(swal.noop);
              setTimeout(function () { $scope.$apply(); }, 300);
              $scope.closeModal()

              setTimeout(() => {
                $scope.listarGlosasIPS('x');
                $scope.listarGlosasIPSDetalle($scope.ipsSeleccionada, 'x');
              }, 3000);
            } else {
              swal("Mensaje", data.Nombre, "info").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "info").catch(swal.noop);
          }
        });
        /**/

      }


      $scope.DescargarRespuesta = function (ruta) {
        // alert(ruta);
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/conciliaciondeglosas.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          window.open("temp/" + response.data);
        });
      }

      $scope.generarFormato = function (x) {
        // $window.open('views/cuentasmedicas/formatos/formato_conciliacion_glosa.php?numero=' + Consecutivo + '&tipo=' + TipoDoc + '&doc=' + NumeroDoc, '_blank', "width=1080,height=1100");
        $window.open('views/cuentasmedicas/formatos/formato_conciliacion_glosa.php?documento=' + 'NG' + '&numero=' + x.DOC_NOT.split('-')[1]
          + '&ubicacion=' + x.DOC_NOT.split('-')[2] + '&responsable=' + $scope.Rol_Cedula, '_blank', "width=1080,height=1100");
      }

      $scope.Ver_Glosas_Comentarios = function (row) {
        $scope.List_Comentarios = [];
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/gesnotificacionglosa.php",
          data: { function: 'Obtener_Comentarios', numero: row.NUMERO, ubicacion: row.UBICACION, renglon: row.RENGLON }
        }).then(function (response) {
          $('#modalcomentarios').modal('open');
          if (response.data[0] != undefined) {
            var Height = document.querySelector("#pantalla").offsetHeight;
            $scope.List_Comentarios = response.data;
            setTimeout(function () {
              var Width = document.querySelector(".chat_titulo").offsetWidth;
              if (document.querySelector('.chat_triangle_der') != null) {
                angular.forEach(document.querySelectorAll('.chat_triangle_der'), function (i) {
                  i.style.marginLeft = (Width - 30) + 'px';
                });
              }
              document.querySelector('#modalcomentarios').style.top = 3 + '%';
              document.querySelector('#modalcomentarios').style.maxHeight = (Height + 20) + 'px';
            }, 600);
          } else {
            swal({
              title: "¡Mensaje!",
              text: 'No existen comentarios para visualizar',
              type: "info"
            }).catch(swal.noop);
          }
        })

      }

      $scope.verObservacion = function (text) {
        swal({ title: 'Descripción de la Glosa', text, width: '1000px' });
      }

      $scope.verTraza = function (json) {
        const json2 = JSON.parse(json)
        if ($scope.Array_ListadoGlosasTraza) { $scope.Array_ListadoGlosasTraza = undefined; return }
        $scope.Array_ListadoGlosasTraza = json2
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.generalExcel = function (row) {
        let datos = []

        row.forEach(e => {
          datos.push({
            "RAZON SOCIAL": `${e.NIT} - ${e.RAZON_SOCIAL}`,
            "FECHA RADICACION": e.FECHA_RADICACION,

            "FACTURA": e.FACTURA,
            "VALOR FACTURA": e.TOTAL_FACTURA,

            "ESTADO GLOSA": $scope.obtenerEstado(e.NTDC_STATUS),

            "DOCUMENTO GLOSA": `${e.DOCUMENTO_FD}-${e.NUMERO_FD}-${e.UBICACION_FD}`,
            "FECHA NOTIFICACION GLOSA": e.FECHA_NOTIFICACION,
            "VALOR GLOSA": e.TOTAL_GLOSA,

            "FECHA RESPUESTA IPS": e.FECHA_RESPUESTA_IPS,
            "VALOR ACEPTADO IPS NOTIF": e.NTDV_VALOR_GI_IPS,
            "VALOR LEVANTADO EPS NOTIF": e.NTDV_VALOR_GL_EPS,
            // "COMENTARIO_IPS": e.COMENTARIO_IPS,


            "FECHA RESPUESTA EPS": e.FECHA_RESPUESTA_EPS,
            "VALOR ACEPTADO IPS": e.NTDV_VALOR_GI,
            "VALOR LEVANTADO EPS": e.NTDV_VALOR_GL,
            // "COMENTARIO_EPS": e.COMENTARIO_EPS,

            "VALOR MANTENIDO": e.NTDV_VALOR_MANTENIDA,
          })
        });

        var ws = XLSX.utils.json_to_sheet(datos);
        /* add to workbook */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
        /* write workbook and force a download */
        XLSX.writeFile(wb, "Reporte conciliacion glosas.xlsx");
        const text = `Registros encontrados ${datos.length}`
        swal('¡Mensaje!', text, 'success').catch(swal.noop);

        swal.close();

      }

      $scope.setTab = function (tab) {
        $scope.tabs = tab;
        if (!$scope.listadoGlosasConsulta) $scope.listarGlosasIPSConsulta();
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.filter = function (val) {
        // $scope.Lista_Glosa.forEach(e => {
        //   if (e.NOTC_STATUS1 == $scope.filtroEstado || $scope.filtroEstado == "") glosas.push(e)
        // });
        $scope.Lista_GlosaTemp = $filter('filter')($scope.Lista_Glosa, $scope.filtroEstado);
        $scope.Lista_GlosaTemp = $filter('filter')($scope.Lista_GlosaTemp, val);
        // $scope.Lista_GlosaTemp = $filter('filter')($scope.Lista_Glosa, ($scope.filter_save == val) ? '' : val);
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
      $scope.AtrasConsulta = function (X) {
        $scope.VistaConsulta = X;

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

      $scope.obtenerEstado = function (x) {
        if (x == 0) {
          return 'PENDIENTE'
        }
        if (x == 1) {
          return 'ENCONCILIACION'
        }
        return 'CONCILIADA'
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
