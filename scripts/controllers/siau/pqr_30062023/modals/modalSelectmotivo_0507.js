'use strict';
angular.module('GenesisApp')
    .controller('modalselectmotivo', ['$scope', 'pqrHttp', '$filter', function ($scope, pqrHttp) {
        $scope.stylesrowsearch = null;

        pqrHttp.getMotivosEspecificosTiposol($scope.pqrData.selectedtipoSolicitud).then(function (response) {
            $scope.motivosEspecificos = response;
            // $scope.motivosEspecificosCopy = response;
        })

        $scope.selectMotivo = function (codigo, nombre) {//Funcion para seleccionar el motivo
            $scope.codTemp = codigo;
            $scope.nomTemp = nombre;
            $('#M' + codigo).addClass('arr');
            $('#M' + codigo).siblings().removeClass('arr');
            $scope.motivoEspecifico = { codigo: codigo, nombre: nombre };
            $scope.selecteditem = true;
        }//Fin
        $scope.removeSeleccion = function () {//Funcion para remover el motivo
            $('#M' + $scope.codTemp).removeClass('arr');
            $scope.motivoEspecifico = { codigo: null, nombre: null };
            $scope.codTemp = null;
            $scope.nomTemp = null;
            $scope.selecteditem = false;
        }//Fin
        $scope.$watch('results', function () {
            if ($scope.results != undefined) {
                $scope.motivoEspecifico = { codigo: null, nombre: null };
                $scope.selecteditem = false; $scope.codTemp = null; $scope.nomTemp = null;
                $scope.stylesrowsearch = { 'margin-bottom': $scope.results.length == 0 ? '120px' : '70px' };
            } else {
                $scope.selecteditem = false;
            }
        });

        // $scope.searchMotivo = function () {
        //     $scope.tempMotivosEspecificos = $scope.motivosEspecificosCopy.filter((item) => {
        //         return (((item.NOMBRE.toLowerCase()).indexOf($scope.keyword.toLowerCase()) > -1) || ((item.CODIGO.toLowerCase()).indexOf($scope.keyword.toLowerCase()) > -1));
        //     });

        //     if ($scope.tempMotivosEspecificos.length == $scope.motivosEspecificos.length) {
        //         $scope.tempMotivosEspecificos = null;
        //     }
        //     $scope.results = $scope.tempMotivosEspecificos;
        // }//Fin
    }])

