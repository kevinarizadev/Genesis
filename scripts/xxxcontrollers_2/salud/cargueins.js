'use strict';

(() => {
  const providers = ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter', 'FileProcessor'];
  providers.push(($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter, FileProcessor) => {
    $scope.estado = "PROCESAR";
    $scope.enProgreso = false;

    $scope.total_cargues = 0
    $scope.afiliados_encontrados = 0
    $scope.afiliados_no_encontrados = 0
    $scope.total_afiliados = 0

    $scope.vistaResumen = 'registros'

    $scope.detalles = false

    $scope.filtro = {
      activo: false,
      encontrados: true,
      nuevos: true,
      actualizados: true,
      inconsistencias: true,
      no_encontrados: true
    }

    let gestion = null

    $scope.carguePendiente = false
    $scope.cargueExitoso = false
    let cargue = '__ALL__'

    $scope.cargueSeleccionado = null

    $scope.filtrar = false
    $scope.encontrados = true

    $scope.listaGestion = null
    $scope.ultimaListaGestion = null

    $scope.tabla = []
    $scope.consolidado = false

    $scope.cargandoDatos = true
    $scope.$apply()

    let timeoutId = null;
    const showWaiting = (timeout) => {
      timeoutId = setTimeout(() => {
        swal('Genesis informa', 'Por favor espere, dependiendo del  tamaño del archivo este proceso puede tomar algunos minutos', 'info').then(() => {
          showWaiting(30000);
        });
      }, timeout);
    }

    $scope.chequearFiltro = () => {
      if ($scope.filtro.activo === false) {
        $scope.filtro.encontrados = true
        $scope.filtro.nuevos = true
        $scope.filtro.actualizados = true
        $scope.filtro.inconsistencias = true
        $scope.filtro.no_encontrados = true
        mostrarTabla()
      }
    }

    $scope.chequearFiltroCargue = () => {
      if ($scope.consolidado === true) {
        $scope.tabla = $scope.listaGestion
      } else {
        $scope.tabla = $scope.ultimaListaGestion
      }
      if ($scope.filtro.activo === true) {
        $scope.filtrar()
      }
    }

    $scope.filtrar = () => {
      mostrarTabla()
    }

    $scope.hayCargues = false

    $scope.gestionINS = async () => {
      try {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Consultando Información...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        })
        const response = await $http({
          method: 'POST',
          url: '/php/genesis/funcgenesis.php',
          data: {
            function: 'listaCargueINS'
          }
        })
        swal.close()
        // console.log(response.data)
        // $scope.afiliados_encontrados = response.data.data.AFILIADO_ENCONTRADO
        // $scope.afiliados_no_encontrados = response.data.data.AFILIADO_NO_ENCONTRADO

        // const totalCargues = parseInt(response.data.data.TOTAL_CARGUE)
        // const totalAfiliados = parseInt(response.data.data.TOTAL_AFILIADO)
        // const afiliadosEncontrados = parseInt(response.data.data.AFILIADO_ENCONTRADO)
        // const afiliadosNoEncontrados = parseInt(response.data.data.AFILIADO_NO_ENCONTRADO)



        const selectContainerDiv = document.querySelector('#select-container')
        selectContainerDiv.innerHTML = ''

        const select = document.createElement('select')

        // const generalOption = document.createElement('option')
        // generalOption.value = '__ALL__'
        // generalOption.innerHTML = `Consolidado`
        // select.add(generalOption)
        select.id = 'cargue-select'

        // let cargueIndex = 0
        if (response.data.data === null) {
          swal('Genesis informa', 'No se han realizado cargues', 'info')
          return
        }

        $scope.hayCargues = true
        response.data.data.sort((a, b) => {
          return parseInt(a.ID_CARGUE) - parseInt(b.ID_CARGUE)
        }).reverse().forEach((item) => {
          const option = document.createElement('option')
          option.value = item.ID_CARGUE
          option.innerHTML = `Cargue # ${item.ID_CARGUE}`
          select.add(option)
        })

        selectContainerDiv.appendChild(select)

        $('select').material_select();

        $("#cargue-select").on('change', function () {
          const cargueSelect = $(this).get()[0]

          cargue = cargueSelect.options[cargueSelect.selectedIndex].value

          // $scope.cargarContadores()

          $scope.cargarDatos()
        });

        cargue = response.data.data[0].ID_CARGUE
        // mostrarTabla()
        $scope.cargarDatos()
      }
      catch (e) {
        swal.close()
        console.error(e)
      }
    }

    $scope.cargarContadores = async () => {
      try {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Consultando Información...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        })
        const response = await $http({
          method: 'POST',
          url: '/php/genesis/funcgenesis.php',
          data: {
            function: 'contadoresINS',
            data: {
              cargue: cargue
            }
          }
        })
        swal.close()

        document.querySelector('#total_cargues').innerHTML = response.data.v_total
        // const countTotalCargues = new CountUp('total_cargues', 0, response.data.v_total)
        // countTotalCargues.start()

        document.querySelector('#total_afiliados').innerHTML = response.data.v_cruza_eafi

        // const countTotalAfiliados = new CountUp('total_afiliados', 0, response.data.v_cruza_eafi)
        // countTotalAfiliados.start()

        document.querySelector('#afiliados_actualizados').innerHTML = response.data.v_actualiza_estado

        // const countAfiliadosActualizados = new CountUp('afiliados_actualizados', 0, response.data.v_actualiza_estado)
        // countAfiliadosActualizados.start()




        document.querySelector('#afiliados_nuevos').innerHTML = response.data.v_nuevos
        // const countAfiliadosNuevos = new CountUp('afiliados_nuevos', 0, response.data.v_nuevos)
        // countAfiliadosNuevos.start()

        document.querySelector('#afiliados_inconsistentes').innerHTML = response.data.v_inconsistentes

        // const countAfiliadosInconsistentes = new CountUp('afiliados_inconsistentes', 0, response.data.v_inconsistentes)
        // countAfiliadosInconsistentes.start()
      } catch (exception) {
        swal.close()
      }
    }

    $scope.cargarDatos = async () => {
      try {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Consultando Información...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        })
        const response = await $http({
          method: 'POST',
          url: '/php/genesis/funcgenesis.php',
          data: {
            function: 'gestionINS',
            data: {
              cargue: cargue
            }
          }
        })
        swal.close()

        gestion = response.data.data

        $scope.cargarContadores()



        mostrarTabla()
      } catch (exception) {
        swal.close()
      }
    }

    // $scope.ultimoListadoGestionINS = async () => {
    //   try {
    //     const response = await $http({
    //       method: 'POST',
    //       url: '/Genesis_covid/php/genesis/funcgenesis.php',
    //       data: {
    //         function: 'ultimoListadoGestionINS'
    //       }
    //     })
    //     $scope.ultimaListaGestion = response.data.data.map((item) => {
    //       item.NOMBRE_COMPLETO = item.PRIMERNOMBRE + (item.SEGUNDONOMBRE !== null ? ' ' + item.SEGUNDONOMBRE : '') + ' ' + item.PRIMERAPELLIDO + (item.SEGUNDOAPELLIDO !== null ? ' ' + item.SEGUNDOAPELLIDO : '')
    //       return item
    //     })

    //     $scope.ultimoCargueTotal = $scope.ultimaListaGestion.length
    //     $scope.ultimoCargueEncontrados = $scope.ultimaListaGestion.filter((item) => item.ESTADO_AFILIADO === 'AFILIADO ENCONTRADO')
    //     $scope.ultimoCargueNoEncontrados = $scope.ultimaListaGestion.filter((item) => item.ESTADO_AFILIADO === 'AFILIADO NO ENCONTRADO')

    //     $scope.carguePendiente = false;
    //     $scope.cargueExitoso = true;
    //   }
    //   catch (e) {

    //   }
    // }

    $scope.validarCargue = async () => {
      try {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Consultando Información...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        })
        const response = await $http({
          method: 'POST',
          url: '/php/genesis/funcgenesis.php',
          data: {
            function: 'validarCargue'
          }
        })
        swal.close()
        $scope.carguePendiente = response.data.data.codigo === '1'
      }
      catch (e) {
        swal.close()
      }
    }

    let dataTable = null

    $scope.exportarDatos = () => {
      dataTable.export({
        type: 'csv',
        download: true
      })
    }

    const mostrarTabla = () => {
      document.querySelector('#table-container').innerHTML = '<table id="datatable" class="striped table-bordered"></table>'
      const d = gestion.filter((item) => {
        if ($scope.filtro.activo === false) {
          return item
        } else {
          return item.CRITERIO === '1' && $scope.filtro.encontrados === true || item.CRITERIO !== '1' && $scope.filtro.no_encontrados === true
        }
      }).map((item) => {
        return Object.values({
          ID_CARGUE: item['ID_CARGUE'],
          TIPO_DOCUMENTO: item['TIPO'],
          DOCUMENTO: item['DOCUMENTO'],
          NOMBRE: item['PRIMERNOMBRE'] + (item['SEGUNDONOMBRE'] === null ? '' : ' ' + item['SEGUNDONOMBRE']) + ' ' + item['PRIMERAPELLIDO'] + (item['SEGUNDOAPELLIDO'] === null ? '' : ' ' + item['SEGUNDOAPELLIDO']),
          FECHA_MUESTRA: item['FECHAMUESTRA'],
          FECHA_RESULTADO: item['FECHA_RESULTADO'],
          ESTADO: item['ESTADO'],
          LABORATORIO: item['LABORATORIO'],
          Criterio: item['CRITERIO'],
          NombreCriterio: item['NOM_CRITERIO']
        })
      })

      dataTable = new simpleDatatables.DataTable(document.querySelector('#datatable'), {
        data: {
          headings: [
            'ID CARGUE',
            'TIPO DOCUMENTO',
            'NUMERO DOCUMENTO',
            'NOMBRE',
            'FECHA MUESTRA',
            'FECHA RESULTADO',
            'ESTADO',
            'LABORATORIO',
            'CRITERIO',
            'DESCRIPCION CRITERIO'
          ],
          data: d
        },
        perPageSelect: null,
        perPage: 15,
        labels: {
          placeholder: 'Buscar',
          perPage: '{select} registros por página',
          noRows: 'No se encontraron registros con los parametros solicitados',
          info: 'Registro {start} hasta {end} de {rows}'
        },
        layout: {
          top: ''
        }
      });


    }

    $scope.listadoGestionINS = async () => {
      try {
        const response = await $http({
          method: 'POST',
          url: '/php/genesis/funcgenesis.php',
          data: {
            function: 'listadoGestionINS'
          }
        })

        gestion = response.data.data.map((item) => {
          item.ID_CARGUE = parseInt(item.ID_CARGUE)
          return item
        }).sort((a, b) => {
          return b.ID_CARGUE - a.ID_CARGUE
        })

        // mostrarTabla()
      }
      catch (e) {

      }
    }

    $scope.zipSoportes = () => {
      descargarSoportes()
    }

    const descargarSoportes = () => {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Consultando Información...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      })
      axios({
        url: `/php/saludpublica/covid/funccovid.php`,
        method: 'post',
        data: {
          function: 'descargaDocumentos'
        },
        responseType: 'blob',
      }).then((response) => {
        swal.close()
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'SISMUESTRAS.zip')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link);
      })
    }

    $scope.procesar = async () => {
      // showWaiting(1000);
      const response = await $http({
        method: 'POST',
        url: '/php/genesis/funcgenesis.php',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          function: 'procesarArchivoINS'
        }
      })
      clearTimeout(timeoutId);



      if (response.data.data.codigo === '0') {
        const mensajeSplit = response.data.data.mensaje.split('.')
        swal('Genesis informa', mensajeSplit[1], 'success').then(() => {
          $scope.ultimoListadoGestionINS()
          $scope.listadoGestionINS()

          descargarSoportes()
        })
      } else {
        swal('Genesis informa', response.data.data.mensaje, 'error')
      }

      $scope.gestionINS();
    }

    const archivoSivigilaInput = document.querySelector('#inputFilePlaceHolderMasiv')
    archivoSivigilaInput.addEventListener('change', () => {
      const cargadoArchivoSivigila = archivoSivigilaInput.files.length > 0;

      if (cargadoArchivoSivigila === false) {

      } else {
        // $scope.enProgreso = true;
        // $scope.estado = "CARGANDO INFORMACIÓN";
        const archivoSivigila = archivoSivigilaInput.files[0];

        const file = archivoSivigila

        if (file !== null) {
        //   const data = new FormData();
        //   data.append('soporte', file);

        //   showWaiting(1000);

        //   axios({
        //     url: `/genesis/php/genesis/func_soporte_covid.php?tipo=ins&fuente=M&usuario=${sessionStorage.getItem('cedula')}`,
        //     method: 'post',
        //     data
        //   }).then((response) => {
        //     swal.close()
        //     clearTimeout(timeoutId)

            // swal('Genesis informa', response.data.mensaje, 'info')

            // if (response.data.codigo === '0') {
            // $scope.enProgreso = false;
            // $scope.estado = "CARGAR";
            // if (response.data.error) {
            //   swal('Genesis informa', response.data.error.message, 'error').then(() => {
            //     if (response.data.error.details) {
            //       let csv = ''
            //       response.data.error.details.forEach((errorDetalle) => {
            //         csv += errorDetalle.registro
            //       })
            //       const url = window.URL.createObjectURL(new Blob([csv]))
            //       const link = document.createElement('a')
            //       link.href = url
            //       link.setAttribute('download', 'errores.csv')
            //       document.body.appendChild(link)
            //       link.click()
            //       document.body.removeChild(link);
            //     }
            //   })
            // } else {
            // swal('Genesis informa', 'Se ha cargado el archivo al sistema. Recibirá en su correo la información del cargue. El tiempo estimado de cargue es de 30 - 55 minutos, esto puede variar basado en la cantidad de registros del archivo. (Basado en cargue de 300.000 registros)', 'success').then(() => {
            //   $scope.gestionINS()
            // }).then(() => {
            //   axios({
            //     url: `/genesis/php/saludpublica/covid/funccovid.php`,
            //     method: 'post',
            //     data: {
            //       function: 'ProcesarArchivoINS'
            //     }
            //   })
            // })
            // }

            // .then(() => {
            //   $scope.carguePendiente = true;
            //   $scope.$apply();
            // })
            // .catch(() => {
            //   window.location.reload();
            // });
            // } else {
            //   console.log(response)
            //   swal('Genesis informa', response.data.mensaje, 'error')
            // }

            // } else if (response.data.error) {
            //   swal('Genesis infoma', response.data.error.message, 'error');
            //   return;
            // }


        //   })
        //     .catch(error => {
        //       console.log(error)

        //       swal('El archivo no se pudo cargar', '', 'error');
        //       $scope.enProgreso = false;
        //       $scope.estado = "CARGAR";
        //     })
        } else {
          swal('Debe seleccionar un archivo para cargar', '', 'warning');
        }
      }
    })


    $scope.cargarArchivo = () => {
      archivoSivigilaInput.click()
    }


    // $scope.listadoGestionINS();

    // $scope.validarCargue();

    $(document).ready(function () {
      $scope.gestionINS();

      const fileDrop = document.querySelector('#file-drop')

      fileDrop.addEventListener('dragover', (event) => {
        event.preventDefault()
      })

      fileDrop.addEventListener('drop', (event) => {
        event.preventDefault()

        if (event.dataTransfer.files) {
          const file = Array.from(event.dataTransfer.files).length > 0 ? Array.from(event.dataTransfer.files)[0] : null

          if (file !== null) {
            // const data = new FormData();
            // data.append('soporte', file);

            // showWaiting(1000);

            // axios({
            //   url: '/genesis/php/genesis/func_soporte_covid.php?tipo=ins',
            //   method: 'post',
            //   data
            // }).then((response) => {
            //   clearTimeout(timeoutId);

            //   if (response.data.data) {
            //     $scope.enProgreso = false;
            //     $scope.estado = "CARGAR";
            //     swal('Genesis informa', response.data.data.message, 'success')
            //       .then(() => {
            //         $scope.carguePendiente = true;
            //         $scope.$apply();
            //       })
            //       .catch(() => {
            //         window.location.reload();
            //       });
            //   } else if (response.data.error) {
            //     swal('Genesis infoma', response.data.error.message, 'error');
            //     return;
            //   }
            // })
            //   .catch(error => {
            //     swal('El archivo no se pudo cargar', '', 'error');
            //     $scope.enProgreso = false;
            //     $scope.estado = "CARGAR";
            //   })
          } else {
            swal('Debe seleccionar un archivo para cargar', '', 'warning');
          }
        }
      })
    });
  });

  angular.module('GenesisApp').controller('cargueins', providers);

})();
