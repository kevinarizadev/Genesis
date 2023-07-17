'use strict';
const tic_informeProyecto_providers = ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter', 'FileProcessor'];
tic_informeProyecto_providers.push(($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter, FileProcessor) => {

});

angular.module('GenesisApp').controller('informeProyectoController', tic_informeProyecto_providers);
