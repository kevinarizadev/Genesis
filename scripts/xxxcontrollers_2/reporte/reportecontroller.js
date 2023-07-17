'use strict';
angular.module('GenesisApp').controller('reportecontroller', ['$scope', '$http', '$localStorage', '$controller', 'reporteHttp', '$sce', function ($scope, $http, $localStorage, $controller, reporteHttp, $sce) {
  $scope.obtenerurlreporte = function (codigo) {
    reporteHttp.obtenerurl(codigo).then(function (response) {
      $scope.urls = $sce.trustAsResourceUrl(response[0].TIPO);
    })
  };
  $(document).ready(function () {
    $scope.header = $scope.name;
    $scope.obtenerurlreporte($scope.codigo);
  });
}]);
