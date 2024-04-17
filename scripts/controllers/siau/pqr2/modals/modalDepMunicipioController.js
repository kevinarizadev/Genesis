'use strict';
angular.module('GenesisApp')
    .controller('modalDepartamentoMunicipio', ['$scope', 'pqrHttp', function ($scope, pqrHttp) {
        $scope.depMunicipio = { codigo: null, nombre: null };
        $scope.stylesrowsearch = null;

        pqrHttp.getDepartamentosMunicipios().then(function (response) {
            $scope.departamentosMunicipios = response;
            $scope.departamentosMunicipiosCopy = response;
        })


        $scope.selectDepMunicipio = function (codigo, nombre) {//Funcion para seleccionar el municipio
            $scope.codTemp = codigo;
            $scope.nomTemp = nombre;
            $('#DM' + codigo).addClass('arr');
            $('#DM' + codigo).siblings().removeClass('arr');
            $scope.depMunicipio = { codigo: codigo, nombre: nombre };
            $scope.selecteditem = true;
        }//Fin
        $scope.removeSeleccion = function () {//Funcion para remover el municipio
            $('#DM' + $scope.codTemp).removeClass('arr');
            $scope.depMunicipio = { codigo: null, nombre: null };
            $scope.codTemp = null; $scope.nomTemp = null; $scope.selecteditem = false;
        }//Fin

        $scope.$watch('results', function () {
            if ($scope.results != undefined) {
                $scope.depMunicipio = { codigo: null, nombre: null };
                $scope.selecteditem = false; $scope.codTemp = null; $scope.nomTemp = null;
                $scope.stylesrowsearch = { 'margin-bottom': $scope.results.length == 0 ? '120px' : '70px' };
            } else {
                $scope.selecteditem = false;
            }
        });

        $scope.searchMunicipio = function () {
            $scope.tempDepartamentosMunicipios = $scope.departamentosMunicipiosCopy.filter((item) => {
                return (((item.NOMBRE.toLowerCase()).indexOf($scope.keyword.toLowerCase()) > -1) || ((item.CODIGO.toLowerCase()).indexOf($scope.keyword.toLowerCase()) > -1));
            });

            if ($scope.tempDepartamentosMunicipios.length == $scope.departamentosMunicipiosCopy.length) {
                $scope.tempDepartamentosMunicipios = null;
            }
            $scope.results = $scope.tempDepartamentosMunicipios;
        }//Fin
    }])

