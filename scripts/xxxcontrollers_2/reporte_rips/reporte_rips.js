'use strict';
angular.module('GenesisApp').controller('reporte_rips_controller',['$scope','$sce',function($scope, $sce) {
    $scope.url_r = $sce.trustAsResourceUrl('');
    $scope.url_r = $sce.trustAsResourceUrl('https://app.powerbi.com/view?r=eyJrIjoiNjkyNzNkNjEtOGQ1My00YjU2LThlNWMtZWY0YjY4OTNlMzE1IiwidCI6ImMyNGM3OGQ4LWM0YWYtNDc2MC1hMzFiLTJlNmY4MzM0YmQ0MCJ9&chave='+sessionStorage.getItem('nit'));
    $scope.url_v = $sce.trustAsResourceUrl('');
    $scope.url_v = $sce.trustAsResourceUrl('https://app.powerbi.com/view?r=eyJrIjoiNDM0MWI4MmItMzI0MS00M2ExLTg2YWQtYzBlNzc4MWFlNzQ0IiwidCI6ImMyNGM3OGQ4LWM0YWYtNDc2MC1hMzFiLTJlNmY4MzM0YmQ0MCJ9&chave='+sessionStorage.getItem('nit'));
}]);
