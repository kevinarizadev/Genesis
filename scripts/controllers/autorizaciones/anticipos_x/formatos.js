
'use strict';
angular.module('GenesisApp', [])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .controller('ControladorIMP', ['$scope', '$http', '$timeout', '$location', '$sce', '$q',
        function ($scope, $http, $timeout, $location) {
            $(document).ready(function () {
                if ($scope.Hoja == 'ANT') {

                }
            });

        }]); 
