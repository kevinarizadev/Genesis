'use strict';

(() => {
  const providers = ['$scope', '$http'];
  providers.push(($scope, $http) => {

    $scope.data= {
      informe: '005',
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
  });

angular.module('GenesisApp').controller('circular017Controller', providers);

})();
