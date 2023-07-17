'use strict';
angular.module('GenesisApp', []).config(function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}).controller('certificadorpctrl', ['$scope', '$http', '$location', '$timeout',
    function ($scope, $http, $location, $timeout) {

        var fechaFin = new Date();
        $scope.datosFormatos = {
            dia: fechaFin.getDate(),
            mes: fechaFin.getMonth()+1,
            anno: fechaFin.getFullYear()
        };
        $scope.obtnNombreSemana = function (){
            switch ($scope.datosFormatos.mes) {
                case 1:
                    $scope.nombreSemana = "enero";
                    break;
                case 2:
                    $scope.nombreSemana = "febrero";
                    break;
                case 3:
                    $scope.nombreSemana = "marzo";                    
                    break;
                case 4:
                    $scope.nombreSemana = "abril";                    
                    break;
                case 5:
                    $scope.nombreSemana = "mayo";                    
                    break;
                case 6:
                    $scope.nombreSemana = "junio";                    
                    break;
                case 7:
                    $scope.nombreSemana = "julio";                    
                    break;
                case 8:
                    $scope.nombreSemana = "agosto";                    
                    break;
                case 9:
                    $scope.nombreSemana = "septiembre";                    
                    break;
                case 10:
                    $scope.nombreSemana = "octubre";                    
                    break;
                case 11:
                    $scope.nombreSemana = "noviembre";                    
                    break;
                case 12:
                    $scope.nombreSemana = "diciembre";                    
                    break;
                default:
            }
        }
        $scope.obtnNombreSemana();
        $scope.semana = $location.search().semana;

        $http({
            method: 'POST',
            url: "../../../php/aseguramiento/Reporte_Crecimiento/reportecrecimiento.php",
            data: {
                function: 'obtnMunicipio'
            }
        }).then(function (response) {
            $scope.municipio = response.data[0].MUNICIPIO;
        });
    }
]);