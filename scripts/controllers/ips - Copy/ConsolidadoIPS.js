'use strict';
angular.module('GenesisApp')
    .controller('ConsolidadoIPS', ['$scope', '$http',function ($scope, $http, ) {


            
            $scope.VisualizarInformacion = function (estado,nombre) {
                $scope.title = nombre;
                if (estado == 'R') {
                    $scope.OcultarColumna = false;
                } else {
                    $scope.OcultarColumna = true;
                }
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'VisualizarDetalleIPS', nit: sessionStorage.getItem('nit'), estado: estado}
                }).then(function (response) {
                    $scope.resultado = response.data;
                });
            }

            $scope.DetalleIPS = function () {
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'detalle_ips', nit: sessionStorage.getItem('nit') }
                    //data: { function: 'detalle_ips', nit: '802016357' }
                    //data: { function: 'detalle_ips',  ubicacion: sessionStorage.getItem('ubicacion'), nit: sessionStorage.getItem('cedula')}                    
                }).then(function (response) {
                    $scope.pendientes = response.data[0].pendientes;
                    $scope.rechazados = response.data[0].rechazados;
                    $scope.gestionados = response.data[0].gestionados;
                });
            }

            $scope.DetalleIPS();         

            $scope.VisualizarInformacion('P','Gestionados');
   
        }]);