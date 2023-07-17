'use strict';
angular.module('GenesisApp')
    .controller('modalips', ['$scope', 'pqrHttp', '$filter', function ($scope, pqrHttp) {
        $scope.stylesrowsearch = null;
        $scope.idSelected = null;
        $scope.tempIps = null;
        $scope.chgBusquedaListado = function (keyword) {
            if ((keyword === undefined) || (keyword.length > 3)) {
                pqrHttp.postSearchIps(keyword).then(function (res) {
                    $scope.ips = res.data;
                })
            } else {
                $scope.ips = null;
                $scope.selecteditem = false;
                $scope.idSelected = null;
            }
        }

        $scope.selectIps = function (i) {//Funcion para seleccionar el municipio
            $scope.codTemp = i.CODIGO;;
            $('#I' + i.CODIGO).addClass('arr');
            $('#I' + i.CODIGO).siblings().removeClass('arr');
            $scope.selecteditem = true;
            $scope.tempIps = i;
        }//Fin
        $scope.removeSeleccion = function () {//Funcion para remover el municipio
            $('#I' + $scope.codTemp).removeClass('arr');
            $scope.codTemp = null; $scope.selecteditem = false;
            $scope.tempIps = null;
        }//Fin

    }])

