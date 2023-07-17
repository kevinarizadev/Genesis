'use strict';
const saludPublica_cargueSismuestras_providers = ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter', 'FileProcessor'];
saludPublica_cargueSismuestras_providers.push(($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter, FileProcessor) => {
  $scope.estado = "PROCESAR";
  $scope.enProgreso = false;

  $scope.total_cargues = 0
  $scope.afiliados_encontrados = 0
  $scope.afiliados_no_encontrados = 0
  $scope.total_afiliados = 0

  $scope.detalles = false

  $scope.filtro = {
    activo: false
  }

  $scope.carguePendiente = false
  $scope.cargueExitoso = false

  $scope.cargues = []

  $scope.cargueSeleccionado = null

  $scope.filtrar = false
  $scope.encontrados = true

  $scope.listaGestion = null
  $scope.ultimaListaGestion = null

  $scope.tabla = []
  $scope.consolidado = false

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
      $scope.encontrados = true
      $scope.chequearFiltroCargue()
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
    if ($scope.filtro.activo === true) {
      if ($scope.consolidado === true) {
        const items = $scope.listaGestion.filter((item) => {
          if ($scope.encontrados === true) {
            return item.ESTADO_AFILIADO === 'AFILIADO ENCONTRADO'
          } else {
            return item.ESTADO_AFILIADO === 'AFILIADO NO ENCONTRADO'
          }
        })
        $scope.tabla = items.length > 0 ? items : []
      } else {
        const items = $scope.ultimaListaGestion.filter((item) => {
          if ($scope.encontrados === true) {
            return item.ESTADO_AFILIADO === 'AFILIADO ENCONTRADO'
          } else {
            return item.ESTADO_AFILIADO === 'AFILIADO NO ENCONTRADO'
          }
        })
        $scope.tabla = items.length > 0 ? items : []
      }
    }
  }

  $scope.gestionINS = async () => {
    try {
      const response = await $http({
        method: 'POST',
        url: '/php/genesis/funcgenesis.php',
        data: {
          function: 'gestionINS'
        }
      })
      $scope.afiliados_encontrados = response.data.data.AFILIADO_ENCONTRADO
      $scope.afiliados_no_encontrados = response.data.data.AFILIADO_NO_ENCONTRADO

      const totalCargues = parseInt(response.data.data.TOTAL_CARGUE)
      const totalAfiliados = parseInt(response.data.data.TOTAL_AFILIADO)
      const afiliadosEncontrados = parseInt(response.data.data.AFILIADO_ENCONTRADO)
      const afiliadosNoEncontrados = parseInt(response.data.data.AFILIADO_NO_ENCONTRADO)

      const countTotalCargues = new CountUp('total_cargues', 0, totalCargues)
      countTotalCargues.start()

      const countTotalAfiliados = new CountUp('total_afiliados', 0, totalAfiliados)
      countTotalAfiliados.start()

      const countAfiliadosEncontrados = new CountUp('afiliados_encontrados', 0, afiliadosEncontrados)
      countAfiliadosEncontrados.start()

      const countAfiliadosNoEncontrados = new CountUp('afiliados_no_encontrados', 0, afiliadosNoEncontrados)
      countAfiliadosNoEncontrados.start()

      const selectContainerDiv = document.querySelector('#select-container')
      selectContainerDiv.innerHTML = ''

      const select = document.createElement('select')

      let cargue = 1
      while (select.options.length < totalCargues) {
        const option = document.createElement('option')
        option.value = cargue
        option.innerHTML = `Cargue # ${cargue}`
        select.add(option)

        cargue++
      }

      selectContainerDiv.appendChild(select)
    }
    catch (e) {

    }
  }

  $scope.ultimoListadoGestionINS = async () => {
    try {
      const response = await $http({
        method: 'POST',
        url: '/php/genesis/funcgenesis.php',
        data: {
          function: 'ultimoListadoGestionINS'
        }
      })
      $scope.ultimaListaGestion = response.data.data
    }
    catch (e) {

    }
  }

  $scope.validarCargue = async () => {
    try {
      const response = await $http({
        method: 'POST',
        url: '/php/genesis/funcgenesis.php',
        data: {
          function: 'validarCargue'
        }
      })
      $scope.carguePendiente = response.data.data.codigo === '1'
    }
    catch (e) {

    }
  }

  $scope.showSelect = false

  let dataTable = null

  $scope.listadoGestionINS = async () => {
    try {
      const response = await $http({
        method: 'POST',
        url: '/php/genesis/funcgenesis.php',
        data: {
          function: 'listadoGestionINS'
        }
      })

      const listaGestion = response.data.data.sort((a, b) => {
        return a.ID_CARGUE - b.ID_CARGUE
      })

      $scope.listaGestion = listaGestion

      while ($scope.cargues.length < $scope.listaGestion.reverse()[0].ID_CARGUE) {
        $scope.cargues.push({
          id: $scope.cargues.length + 1,
          label: `Cargue #${$scope.cargues.length + 1}`
        })
      }

      $scope.tabla = $scope.listaGestion

      $scope.ultimaListaGestion = $scope.listaGestion.filter((item) => String(item.ID_CARGUE) === $scope.cargues.slice(-1)[0])

      const d = listaGestion.map((item) => {
        return Object.values({
          ID_CARGUE: item['ID_CARGUE'],
          TIPO_DOCUMENTO: item['TIPO'],
          DOCUMENTO: item['DOCUMENTO'],
          RESPONSABLE: item['PRIMERNOMBRE'] + (item['SEGUNDONOMBRE'] === null ? '' : ' ' + item['SEGUNDONOMBRE']) + ' ' + item['PRIMERAPELLIDO'] + (item['SEGUNDOAPELLIDO'] === null ? '' : ' ' + item['SEGUNDOAPELLIDO']),
          Estado: item['ESTADO_AFILIADO']
        })
      })

      dataTable = new simpleDatatables.DataTable(document.querySelector('#datatable'), {
        data: {
          headings: [
            '# Cargue'
            ,
            'Tipo Documento',
            'Documento',
            'Nombre',
            'Estado'
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
    catch (e) {

    }
  }

  $scope.cargarArchivoo = () => {
    document.querySelector('#inputFilePlaceHolderMasiv').click()
    setTimeout(() => {
      swal('Archivo cargado exitosamente', '', 'success')
      $scope.carguePendiente = true
      $scope.$apply()
    }, 4500)
  }

  $scope.procesar = async () => {
    // setTimeout(() => {
    //   swal('Archivo procesado exitosamente', '', 'success')
    //   $scope.carguePendiente = false
    //   $scope.cargueExitoso = true
    //   $scope.$apply()
    // }, 1500)

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

    console.log(response)

    $scope.carguePendiente = false;
    $scope.cargueExitoso = true;

    $scope.gestionINS();
  }

  $scope.cargando = false;
  $scope.reintento = false;

  let actual = 0

  let puedeMostrar = true

  const usuario = sessionStorage.getItem('cedula')

  const mostrarNotificacion = (texto) => {
    Notification.requestPermission().then(function (result) {
      if (result === 'granted') {
        new Notification('Genesis informa', {
          body: texto
        })
      }
    })
  }

  let ventanaActiva = true

  document.addEventListener("visibilitychange", (event) => {
    ventanaActiva = !document.hidden
  })

  const cargarArchivoIndividual = (archivos) => {
    
    const file = archivos.pop();
    console.log(file);
    const filename = file.name;
    const regex = /^([\d\w]+)-[\d\w]+SisMuestras.pdf$/gm;
    const matches = regex.exec(filename);
    console.log(matches);
    let documento = null

    if (matches === null) {
      swal('Genesis informa', 'El archivo que intenta cargar no cumple con el formato de SISMUESTRAS', 'warning');
      $scope.cargando = false;
      $scope.$apply();
      return;
    } else {
      if (typeof matches[1] === 'undefined' || matches[1] === null || matches[1] === '') {
        swal('Genesis informa', 'El archivo que intenta cargar no cumple con el formato de SISMUESTRAS', 'warning');
        $scope.cargando = false;
        $scope.$apply();
      } else {
        documento = matches[1]
      }
    }

    $scope.actual = actual
    $scope.$apply();

    const data = new FormData();
    data.append('soporte', file);

    axios({
      url: '/php/genesis/func_soporte_covid.php?tipo=sismuestras&fuente=M&usuario=' + usuario + '&documento=' + documento,
      method: 'post',
      data
    }).then((response) => {
      if (response.data.data.code === 200) {
        const barraCarga = document.querySelector('#progreso_carga')
        $scope.reintento = false;
        $scope.$apply();
        barraCarga.setAttribute('value', actual + 1)

        actual++
        $scope.actual = actual
        $scope.$apply();

        if (archivos.length > 0) {
          if (puedeMostrar === false) {
            puedeMostrar = true
          }
          cargarArchivoIndividual(archivos)
        } else {
          $scope.cargando = false;
          $scope.actual = 0
          $scope.todos = 0
          barraCarga.setAttribute('max', '0')
          barraCarga.setAttribute('value', '0')
          $scope.$apply();
          actual = 0

          if (ventanaActiva === false) {
            mostrarNotificacion('Ha finalizado el cargue de los archivos de SISMUESTRAS')
          }
          swal('Genesis informa', 'Ha finalizado el cargue de los archivos de SISMUESTRAS', 'success')
        }
      } else {
        const barraCarga = document.querySelector('#progreso_carga')
        $scope.reintento = true;
        $scope.$apply();
        archivos.push(file)

        if (puedeMostrar === true) {
          mostrarNotificacion('Ha fallado la subida del archivo ' + actual + '. Se esta reintentando')
          puedeMostrar = false
        }

        if (archivos.length > 0) {
          cargarArchivoIndividual(archivos)
        } else {
          $scope.cargando = false;
          $scope.actual = 0
          $scope.todos = 0
          barraCarga.setAttribute('max', '0')
          barraCarga.setAttribute('value', '0')
          $scope.$apply()
          actual = 0
          
          if (ventanaActiva === false) {
            mostrarNotificacion('Ha finalizado el cargue de los archivos de SISMUESTRAS')
          }
          swal('Genesis informa', 'Ha finalizado el cargue de los archivos de SISMUESTRAS', 'success')
        }
      }
    })
      .catch((error) => {
        const barraCarga = document.querySelector('#progreso_carga')
        $scope.reintento = true;
        $scope.$apply();
        archivos.push(file)

        if (puedeMostrar === true) {
          mostrarNotificacion('Ha fallado la subida del archivo ' + actual + '. Se esta reintentando')
          puedeMostrar = false
        }

        if (archivos.length > 0) {
          cargarArchivoIndividual(archivos)
        } else {
          $scope.cargando = false;
          $scope.$apply();

          
        }
      })
  }

  const archivoSivigilaInput = document.querySelector('#inputFilePlaceHolderMasiv')
  archivoSivigilaInput.addEventListener('change', () => {
    const cargadoArchivoSivigila = archivoSivigilaInput.files.length > 0;

    if (cargadoArchivoSivigila === false) {

    } else {
      $scope.cargando = true;
      $scope.$apply();
      const archivosSismuestras = archivoSivigilaInput.files;

      if (archivosSismuestras.length > 0) {

        const barraCarga = document.querySelector('#progreso_carga')
        barraCarga.setAttribute('max', String(archivosSismuestras.length))
        $scope.todos = archivosSismuestras.length
        $scope.$apply();

        cargarArchivoIndividual(Array.from(archivosSismuestras))
      } else {
        swal('Debe seleccionar un archivo para cargar', '', 'warning');
      }
    }
  })




  $scope.cargarArchivo = () => {
    archivoSivigilaInput.click()
  }


  $scope.listadoGestionINS();
  $scope.ultimoListadoGestionINS();
  $scope.validarCargue();

  $(document).ready(function () {
    // $scope.gestionINS();

    const fileDrop = document.querySelector('#file-drop')

    fileDrop.addEventListener('dragover', (event) => {
      event.preventDefault()
    })

    fileDrop.addEventListener('drop', (event) => {
      event.preventDefault()

      if (event.dataTransfer.files) {
        const file = Array.from(event.dataTransfer.files).length > 0 ? Array.from(event.dataTransfer.files)[0] : null

        if (file !== null) {
          const data = new FormData();
          data.append('soporte', file);

          showWaiting(1000);

          axios({
            url: '/php/genesis/func_soporte_covid.php?tipo=sismuestras',
            method: 'post',
            data
          }).then((response) => {
            clearTimeout(timeoutId);

            if (response.data.data) {
              $scope.enProgreso = false;
              $scope.estado = "CARGAR";
              swal('Genesis informa', response.data.data.message, 'success')
                .then(() => {
                  $scope.carguePendiente = true;
                  $scope.$apply();
                })
                .catch(() => {
                  window.location.reload();
                });
            } else if (response.data.error) {
              swal('Genesis infoma', response.data.error.message, 'error');
              return;
            }
          })
            .catch(error => {
              swal('El archivo no se pudo cargar', '', 'error');
              $scope.enProgreso = false;
              $scope.estado = "CARGAR";
            })
        } else {
          swal('Debe seleccionar un archivo para cargar', '', 'warning');
        }
      }
    })
  });
});

angular.module('GenesisApp').controller('CargueSismuestrasController', saludPublica_cargueSismuestras_providers);
