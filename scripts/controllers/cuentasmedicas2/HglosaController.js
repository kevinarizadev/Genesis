'use strict';
angular.module('GenesisApp')
  .controller('modalHglosactrl', ['$scope', '$http', 'ngDialog', 'censoHttp', function ($scope, $http, ngDialog, censoHttp) {
    // console.log($scope.info);

    $http({
      method: 'POST',
      url: "php/censo/censo.php",
      data: {
        function: 'obtener_glosas',
        numero: $scope.detalleCenso.censo,
        ubicacion: $scope.detalleCenso.ubicacion
      }
    }).then(function (response) {
      if ($scope.tablitatablon == 'A') {
        $scope.tableinformacion.destroy();
      }
      $scope.tablitatablon = 'A';
      $scope.hglosado = response.data;
      setTimeout(function () {
        $scope.tableinformacion = $('#informacion').DataTable({
          dom: 'Bfrtip',
          responsive: true,
          buttons: ['copy', 'csv', 'excel', 'print'],
          language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
          lengthMenu: [[10, 50, -1], [10, 50, 'Todas']],
          order: [[0, "asc"]]
        });
        swal.close();
      }, 500);
    });


  }]);
