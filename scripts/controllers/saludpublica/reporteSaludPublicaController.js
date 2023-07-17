'use strict';

(() => {
  const providers = ['$scope', '$http', 'notify'];
  providers.push(($scope, $http, notify) => {

    $scope.data = {
      fecha_inicio: null,
      fecha_fin: null
    }

    $scope.obtenerReporte  = async () => {
      notify.show('loading')
      const fecha_inicio = new Date($scope.data.fecha_inicio);
      const fecha_fin = new Date($scope.data.fecha_fin);

      const response = await $http({
        url: '/php/saludpublica/funcreporte.php',
        method: 'post',
        data: {
          function: 'obtenerLista',
          fecha_inicio: `${fecha_inicio.getDate().toString().padStart(2, '0')}/${(fecha_inicio.getMonth() + 1).toString().padStart(2, '0')}/${fecha_inicio.getFullYear()}`,
          fecha_fin: `${fecha_fin.getDate().toString().padStart(2, '0')}/${(fecha_fin.getMonth() + 1).toString().padStart(2, '0')}/${fecha_fin.getFullYear()}`,
        }
      })
      notify.close()
        var element = document.createElement('a');
  element.setAttribute('href', 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(response.data));
  element.setAttribute('download', `reporte.xls`);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
    }
  });

  angular.module('GenesisApp').controller('reporteSaludPublicaController', providers);
})();
