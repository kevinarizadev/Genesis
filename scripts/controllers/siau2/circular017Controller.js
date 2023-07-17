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
        url: `php/siau/funccircular017.php?fecha_inicio=${fecha_inicio.getDate().toString().padStart(2, '0')}/${(fecha_inicio.getMonth() + 1).toString().padStart(2, '0')}/${fecha_inicio.getFullYear()}&fecha_fin=${fecha_fin.getDate().toString().padStart(2, '0')}/${(fecha_fin.getMonth() + 1).toString().padStart(2, '0')}/${fecha_fin.getFullYear()}&informe=${$scope.data.informe}`
      }).then((response) => {
        // console.log(response.data);
        JSONToCSVConvertor_Seccionales(response.data, 'Circular '+$scope.data.informe, true)
      })
    }

 function JSONToCSVConvertor_Seccionales(JSONData, ReportTitle, ShowLabel) {
      var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
      var CSV = '';
      if (ShowLabel) {
        var row = "";
        for (var index in arrData[0]) {
          row += index + ',';
        }
        row = row.slice(0, -1);
        CSV += row + '\r\n';
      }
      for (var i = 0; i < arrData.length; i++) {
        var row = "", row2='';
        for (var index in arrData[i]) {
          row += '' + arrData[i][index] + ',';
        }
        // row.slice(0, row.length - 2);
        row2 = row.substr(0, row.length -1);
        CSV += row2 + '\r\n';
      }
      if (CSV == '') {
        return;
      }
      var fileName = "Reporte - ";
      fileName += ReportTitle.replace(/ /g, "_");
      var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
      var link = document.createElement("a");
      link.href = uri;
      link.style = "visibility:hidden";
      link.download = fileName + ".csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

  });

angular.module('GenesisApp').controller('circular017Controller', providers);

})();
