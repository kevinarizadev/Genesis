'use strict';
angular.module('GenesisApp')
.controller(
    'covid19Controller',
    ['$scope', '$http', 'ngDialog', 'notification', 'ausentismoHttp', '$timeout', '$q', 'communication', '$controller', '$rootScope', '$window', '$filter', function ($scope, $http, ngDialog, notification, ausentismoHttp, $timeout, $q, communication, $controller, $rootScope, $window, $filter) {
        $scope.mapa = '1';
}]);
