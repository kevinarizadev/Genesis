'use strict';
angular.module('GenesisApp')
    .controller('verAgendaController', ['$scope', '$rootScope', '$http', '$filter', '$window', 'ngDialog', function ($scope, $rootScope, $http, $filter, $window, ngDialog) {

        $scope.listaCompromisos = function (idComite) {
            swal({
                title: 'Cargando información...',
                allowEscapeKey: false,
                allowOutsideClick: false
            });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/planeacion/altagerencia.php",
                data: {
                    function: 'obtenerCompromisosComite',
                    comite: Number(idComite)
                }
            }).then(function (response) {
                swal.close();
                console.log(response.data);
                if (response.data.length) {
                    $scope.compromisos = response.data;
                    $scope.paginacion(response.data);
                } else {
                    $scope.compromisos = [];
                }
            });
        }
        $scope.listaCompromisos($scope.dataAgenda.codigo);

        $scope.descargarArchivo = function (idCompromiso) {
            swal({
                title: 'Cargando información...',
                allowEscapeKey: false,
                allowOutsideClick: false
            });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/planeacion/altagerencia.php",
                data: {
                    function: 'obtenerArchivosCompromisos',
                    idCompromiso: Number(idCompromiso)
                }
            }).then(function (response) {
                swal.close();
                if (response.data.length) {
                    for (let i = 0; i < response.data.length; i++) {
                        $http({
                            method: 'POST',
                            url: "php/planeacion/altagerencia.php",
                            data: {
                                function: 'descargaAdjunto',
                                ruta: response.data[i].Ruta + response.data[i].Nombre
                            }
                        }).then(function (response) {
                            window.open("temp/" + response.data + "?page=hsn#toolbar=0");
                        });
                    }
                } else {
                    swal('No se encontró archivo relacionado a este compromiso.', '', 'error').catch(swal.noop);
                }
            });
        }

        $scope.paginacion = function (data) {
            console.log(data);
            $scope.currentPage = 0;
            $scope.pageSize = 10;
            $scope.q = "";
            $scope.getData = function () {
                // if ($scope.medicamentos.orden != "") {
                //   return $filter('filter')($filter('orderBy')($scope.historial.listado, 'RADICADO'), $scope.q);
                // } else {
                return $filter('filter')(data, $scope.q);
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
