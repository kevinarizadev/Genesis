
'use strict';
angular.module('GenesisApp')
    .controller('censodetalle', ['$scope','censoHttp','$http','$window', function ($scope,censoHttp,$http,$window) {
        // console.log($scope.detalleCenso);
        
    $scope.zeroresults=true;
        censoHttp.detailcensos($scope.detalleCenso.censo, $scope.detalleCenso.ubicacion).then(function (response) {
            $scope.detallecen = response;
            $scope.numerocen= response[0].NUMEROCENSO;
            $scope.estadocen= response[0].ESTADO;
            $scope.diagnostico = response[0].DIAGNOSTICO;
            $scope.responsable= response[0].NOMBRE;
            $scope.ubicacion= response[0].UBICACION;
            // console.log(response);
            $scope.zeroresults=false;
          });




          $scope.print = function (renglon) {

           
                $window.open('views/salud/print/formato_adverso.html?v_preglon='+renglon+'&v_pnocenso='+$scope.numerocen+'&v_pubicacion='+$scope.ubicacion,'_blank', "width=1080,height=1100");
        
            }

                              
                            
               
    }])

