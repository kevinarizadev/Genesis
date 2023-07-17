'use strict';

angular.module('GenesisApp')
.controller('pqrreportecontroller', ['$scope', 'pqrHttp', 'ngDialog', '$controller', '$http', 'Messages', '$window', function ($scope, pqrHttp, ngDialog, $controller, $http, Messages, $window) {
    $scope.body = true;
    $scope.zeroresults = true;
    $scope.buscar = function () {
        pqrHttp.buscarpqrs($scope.codigo).then(function (response) {
            $scope.pqr = response[0];
            $scope.body = false;
        })
    }

    $scope.detailpqr = function () {
        ngDialog.open({
            template: 'views/siau/pqr/detailpqr.html', className: 'ngdialog-theme-plain',
            controller: 'modalpqrcontroller', scope: $scope
        });
    }
}]);

