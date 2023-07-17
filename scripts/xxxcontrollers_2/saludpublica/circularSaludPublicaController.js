'use strict';

(() => {
  const providers = ['$scope', '$http', 'notify'];
  providers.push(($scope, $http, notify) => {

    $scope.data = {
      tipo_reportes: null,
      informe: '',
      circular: '',
      fecha_inicio: null,
      fecha_fin: null,
      exportar: false
    }

    let dataTable = null

    $scope.exportarDatos = () => {
      dataTable.export({
        type: 'csv',
        download: true
      })
    }

    const mostrarTabla = (data) => {
      document.querySelector('#table-container').innerHTML = '<table id="datatable" class="striped table-bordered"></table>'
      data.map((item) => {
        return Object.values(item)
      })

      dataTable = new simpleDatatables.DataTable(document.querySelector('#datatable'), {
        data: {
          headings: Object.keys(data[0]),
          data: data.map((item) => {
            return Object.values(item)
          })
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
     $scope.data.exportar = true
    }

    $scope.obtenerDatos = () => {
      $scope.data.exportar = false
      const fecha_inicio = new Date($scope.data.fecha_inicio);
      const fecha_fin = new Date($scope.data.fecha_fin);

      $http({
        url: `/php/siau/funccircular017.php?fecha_inicio=${fecha_inicio.getDate().toString().padStart(2, '0')}/${(fecha_inicio.getMonth() + 1).toString().padStart(2, '0')}/${fecha_inicio.getFullYear()}&fecha_fin=${fecha_fin.getDate().toString().padStart(2, '0')}/${(fecha_fin.getMonth() + 1).toString().padStart(2, '0')}/${fecha_fin.getFullYear()}&informe=${$scope.data.informe}`
      }).then((response) => {
        mostrarTabla(response.data)
      })
    }

    $scope.obtenerTipoReporte  = async () => {
      notify.show('loading')
      const response = await $http({
        url: '/php/saludpublica/funccircular.php',
        method: 'post',
        data: {
          function: 'obtenerTipo'
        }
      })
      notify.close()
      $scope.data.tipo_reportes = Object.keys(response.data).map((key) => {
        return {
          id: key,
          value: response.data[key]
        }
      })
    }

    $scope.obtenerReporte  = async () => {
      if ($scope.data.informe != 'GS') {

      notify.show('loading')
      const fecha_inicio = new Date($scope.data.fecha_inicio);
      const fecha_fin = new Date($scope.data.fecha_fin);

      const response = await $http({
        url: '/php/saludpublica/funccircular.php',
        method: 'post',
        data: {
          function: 'obtenerLista',
          fecha_inicio: `${fecha_inicio.getDate().toString().padStart(2, '0')}/${(fecha_inicio.getMonth() + 1).toString().padStart(2, '0')}/${fecha_inicio.getFullYear()}`,
          fecha_fin: `${fecha_fin.getDate().toString().padStart(2, '0')}/${(fecha_fin.getMonth() + 1).toString().padStart(2, '0')}/${fecha_fin.getFullYear()}`,
          informe: $scope.data.informe
        }
      })
      notify.close()
        var element = document.createElement('a');
        if ($scope.data.informe === 'PT024') {
element.setAttribute('href', 'data:plain/text;charset=utf-8,' + encodeURIComponent(response.data));
  element.setAttribute('download', `${$scope.data.informe}.txt`);
        } else {
    element.setAttribute('href', 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(response.data));
  element.setAttribute('download', `${$scope.data.informe}.xls`);        
        }
  

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
      } else {
         notify.show('loading')
      const fecha_inicio = new Date($scope.data.fecha_inicio);
      const fecha_fin = new Date($scope.data.fecha_fin);

      const response = await $http({
        url: '/php/saludpublica/funccircular.php',
        method: 'post',
        data: {
          function: 'obtenerLista',         
          informe: $scope.data.informe
        }
      })
      notify.close()
        var element = document.createElement('a');
        if ($scope.data.informe === 'PT024') {
element.setAttribute('href', 'data:plain/text;charset=utf-8,' + encodeURIComponent(response.data));
  element.setAttribute('download', `${$scope.data.informe}.txt`);
        } else {
    element.setAttribute('href', 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(response.data));
  element.setAttribute('download', `${$scope.data.informe}.xls`);        
        }
  

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
      }
    }


    $scope.obtenerTipoReporte()
  });

  angular.module('GenesisApp').controller('circularSaludPublicaController', providers);
})();
