'use strict';
angular.module('GenesisApp').controller('reportemedicamentosController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $scope.url = $sce.trustAsResourceUrl('https://app.powerbi.com/view?r=eyJrIjoiNGUzMzlhOTEtZjY3NS00OTE1LTk3MDAtMGEyMjBhZTkyNDFmIiwidCI6ImMyNGM3OGQ4LWM0YWYtNDc2MC1hMzFiLTJlNmY4MzM0YmQ0MCJ9');
}]);
