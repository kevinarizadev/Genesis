'use strict';
angular.module('GenesisApp')
    .controller('censodetalle', ['$scope','censoHttp', function ($scope,censoHttp) {
        // console.log($scope.detalleCenso);
        
    $scope.zeroresults=true;
        censoHttp.detailcensos($scope.detalleCenso.censo, $scope.detalleCenso.ubicacion).then(function (response) {
            $scope.detallecen = response;
            $scope.numerocen= response[0].numeroCenso;
            $scope.estadocen= response[0].estado;
            $scope.diagnostico = response[0].diagnostico;
            $scope.responsable= response[0].nombre;
            // console.log(response);
            $scope.zeroresults=false;
          });
    }])
