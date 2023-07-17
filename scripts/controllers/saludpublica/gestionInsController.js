'use strict';

const saludPublica_gestionIns_providers = ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter', 'notify'];
saludPublica_gestionIns_providers.push(($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter, notify) => {

  $scope.listaSeleccionada = 'Afiliados nuve'

  $scope.listaTemp = null

  $scope.gestionar = false


  $scope.lista = null

  $scope.dataTable = null

  $scope.buscar = false

  $scope.data = {
    fechaSeleccionada: null,
    filtro: null
  }

  $scope.paginar = (lista, inicio, fin) => {
    if (typeof lista === 'undefined' || lista === null) {
      return []
    }
    return lista.slice(inicio, fin)
  }

  $scope.anterior = () => {
    if ($scope.listaFin === $scope.lista.length) {
      $scope.listaFin = parseInt($scope.listaInicio)

      $scope.listaInicio -= 10
    } else {
      if ($scope.listaInicio >= 10) {
        $scope.listaInicio -= 10
        $scope.listaFin -= 10
      }
    }
  }

  $scope.filtrarResultados = () => {
    $scope.listaTemp = $scope.lista.filter((item) => {
      return item.PRIMERNOMBRE.includes($scope.data.filtro.toUpperCase()) ||
        (item.SEGUNDONOMBRE !== null && item.SEGUNDONOMBRE.includes($scope.data.filtro.toUpperCase())) ||
        item.PRIMERAPELLIDO.includes($scope.data.filtro.toUpperCase()) ||
        (item.SEGUNDOAPELLIDO !== null && item.SEGUNDOAPELLIDO.includes($scope.data.filtro.toUpperCase())) ||
        // item.MUNICIPIO.includes($scope.data.filtro.toUpperCase()) ||
        item.DOCUMENTO.includes($scope.data.filtro.toUpperCase())
      // item.GRUPO_DE_RIEGOS.includes($scope.filtro.toUpperCase())
    })

    console.log($scope.listaTemp)
    mostrarTabla()
  }

  $scope.siguiente = () => {
    if ($scope.listaFin < $scope.lista.length) {
      if (($scope.listaFin + 10) < $scope.lista.length) {
        $scope.listaFin += 10
      } else {
        $scope.listaFin = $scope.lista.length
      }
      $scope.listaInicio += 10
    }

    console.log(`inicio: ${$scope.listaInicio} fin: ${$scope.listaFin}`)
  }

  $scope.formatNumber = (number) => {
    if (number === NaN) {
      return 0
    }
    return parseFloat(number).toFixed(2)
  }

  $scope.formatBigNumber = (number) => {
    if (number === NaN) {
      return 0
    }
    return numeral(number).format('0,0').replace(',', '.')
  }

  const cargarContadores = () => {

    axios({
      url: '',
      method: 'post',
      data: {
        function: 'cargarContadores'
      }
    }).then((response) => {
      $scope.listaTemp = []
      notify.close()
    })
  }

  const formatFecha = (fecha) => {
    return `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`
  }

  const formatFechaInput = (fecha) => {
    return `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`
  }

  const mostrarTabla = () => {
    document.querySelector('#table-container').innerHTML = '<table id="datatable"></table>'
    const d = $scope.listaTemp.map((item) => {
      return Object.values({

        TIPO_DOCUMENTO: item['TIPO'],
        DOCUMENTO: item['DOCUMENTO'],
        NOMBRE: item['PRIMERNOMBRE'] + (item['SEGUNDONOMBRE'] === null ? '' : ' ' + item['SEGUNDONOMBRE']) + ' ' + item['PRIMERAPELLIDO'] + (item['SEGUNDOAPELLIDO'] === null ? '' : ' ' + item['SEGUNDOAPELLIDO']),
        FECHA_MUESTRA: item['FECHAMUESTRA'],
        FECHA_RESULTADO: item['FECHA_RESULTADO'],
        ESTADO: item['ESTADO'],
        IPS: item['IPS'],
        LABORATORIO: item['LABORATORIO']
      })
    })
     let datatable = new simpleDatatables.DataTable(document.querySelector('#datatable'), {
      data: {
        headings: [
          'TD',
          'NUMERO DOCUMENTO',
          'NOMBRE',
          'FECHA MUESTRA',
          'FECHA RESULTADO',
          'ESTADO',
          'IPS',
          'LABORATORIO'
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
      },
      fixedHeight: true
    });

    $scope.exportarDatos = () => {
      datatable.export({
        type: 'csv',
        download: true
      })
    }
  }

  const cargarDatos = (estado) => {
    if ($scope.data.fechaSeleccionada === null) {
      notify.show('info', 'Debe de seleccionar una fecha para cargar la información')
      return
    }
    notify.show('loading')
    $scope.listaTemp = null
    axios({
      url: '/Genesis/php/saludpublica/covid/funccovid.php',
      method: 'post',
      data: {
        function: 'obtenerAfiliadosNuevosPorFechaDeCargue',
        data: {
          fecha: formatFecha($scope.data.fechaSeleccionada),
          ubicacion: sessionStorage.getItem('municipio') === '1' ? '' : sessionStorage.getItem('municipio')
        }
      }
    }).then((response) => {
      notify.close()
      $scope.lista = response.data.data
      $scope.listaTemp = $scope.lista
      if (response.data.data === null) {
        notify.show('info', 'No se han encontrado registros con los parametros solicitados')
      }
      // $scope.buscar = true

      $scope.$apply()
      mostrarTabla()
    })
    // $scope.gestionar = false
  }

  $scope.cargarDatos = cargarDatos

  document.querySelector('#fecha-cargue-input').setAttribute('max', formatFechaInput(new Date()))

  $scope.data.fechaSeleccionada = new Date()
  cargarDatos()
});

angular.module('GenesisApp').controller('gestionInsController', saludPublica_gestionIns_providers)
