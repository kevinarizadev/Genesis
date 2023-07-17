'use strict';
angular.module('GenesisApp')
    .controller('LineaEticaDenunciaController', ['$scope', '$rootScope', '$http', '$filter', '$window', function ($scope, $rootScope, $http, $filter, $window) {

        $scope.Denuncias = [];
        $scope.detalle = false;

        //LISTA DEPARTAMENTOS
        $scope.listaDepartamentos = function () {
            $http({
                method: 'POST',
                url: "php/juridica/lineaeticadenuncia.php",
                data: {
                    function: 'obtenerDepartamentos'
                }
            }).then(function (response) {
                $scope.Departamentos = response.data;
            });
        }
        $scope.listaDepartamentos();

        //LISTA MUNICIPIOS DEPENDIENDO EL DEPARTAMENTO SELECCIONADO
        $scope.listaMunicipios = function (cod_departamento) {
            swal({
                title: 'Cargando información...',
                allowEscapeKey: false,
                allowOutsideClick: false
            });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/juridica/lineaeticadenuncia.php",
                data: {
                    function: 'obtenerCiudades',
                    departamento: cod_departamento
                }
            }).then(function (response) {
                swal.close();
                $scope.Municipios = response.data;
            });
        }

        //Obtenemos las denuncias
        $scope.listaDenuncias = function (cod_departamento, municipio) {
            swal({
                title: 'Cargando información...',
                allowEscapeKey: false,
                allowOutsideClick: false
            });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/juridica/lineaeticadenuncia.php",
                data: {
                    function: 'obtenerDenuncias',
                    departamento: Number(cod_departamento),
                    municipio: Number(municipio)
                }
            }).then(function (response) {
                $scope.detalle = false;
                swal.close();
                if (response.data[0].Codigo === 0) {
                    $scope.Denuncias = response.data;
                    $scope.paginacion();
                } else {
                    $scope.Denuncias = [];
                }
            });
        }

        $scope.verDetalle = function (denuncia) {
            $scope.detalle = true;
            $scope.denunciaDetalle = denuncia;
        }

        $scope.paginacion = function () {
            $scope.currentPage = 0;
            $scope.pageSize = 10;
            $scope.q = "";
            $scope.getData = function () {
                // if ($scope.medicamentos.orden != "") {
                //   return $filter('filter')($filter('orderBy')($scope.historial.listado, 'RADICADO'), $scope.q);
                // } else {
                return $filter('filter')($scope.Denuncias, $scope.q);
                // }
            }
            $scope.numberOfPages = function () {
                return Math.ceil($scope.getData().length / $scope.pageSize);
            }
            $scope.$watch('q', function (newValue, oldValue) {
                if (oldValue != newValue) {
                    $scope.currentPage = 0;
                }
            }, true);
            $scope.btns_paginacion = function (value) {
                $scope.currentPage = value;
                // window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }]);