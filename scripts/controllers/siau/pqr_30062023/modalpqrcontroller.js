'use strict';
angular.module('GenesisApp')
    .controller('modalpqrcontroller', ['$scope','pqrHttp', function ($scope, pqrHttp) {
        // console.log($scope.detalleCenso);
        
    $scope.zeroresults=true;
    pqrHttp.detallepqrs($scope.codigo).then(function (response) {
        $scope.detalle = response;
        $scope.zeroresults=false;
      });

      $scope.descargafile = function (ruta,ftp) {
        pqrHttp.dowloadfile(ruta,ftp).then(function (response) {
            window.open("temp/" + response.data);
        });
    }
    }])

