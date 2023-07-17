'use strict';
angular.module('GenesisApp')
    .controller('modalConfigResponsables', ['$scope', 'pqrHttp', function ($scope, pqrHttp) {
        $scope.responsableFilter = '';
        $scope.selecionablesFilter = '';
        $scope.responsablesSelecionables = null;
        $scope.getResponsables = function () {
            pqrHttp.getResponsables().then(function (res) {
                $scope.responsablesSelecionables = res;
            })
        }
        $scope.getResponsables();

        $scope.chgBusquedaListado = function (keyword) {
            if ((keyword === undefined) || (keyword.length > 3)) {
                pqrHttp.postSearchUsuarios(keyword).then(function (res) {
                    $scope.responsables = res.data;
                })
            } else {
                $scope.responsables = null;
            }
        }
        $scope.saveResponsable = function (responsable, estado) {
            if (estado == 'A') {
                pqrHttp.postResponsableSeleccionables(responsable.cedula, estado).then(function (res) {
                    $scope.getResponsables();
                })
            } else {
                swal({
                    title: 'Confirmar Proceso',
                    text: '¿Desea remover el responsable?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result) {
                        pqrHttp.postResponsableSeleccionables(responsable.cedula, estado).then(function (res) {
                            $scope.getResponsables();
                        })
                    }
                }).catch(swal.noop);
            }
        }
        $scope.element = {
            area: null,
            cargo: null,
            cedula: null,
            estado: null,
            nom: null,
            nombre: null,
            tipo: null,
            ubicacion: null
        }
        $scope.selectResponsable = function (res) {
            var temp = [];
            $scope.element = res;
            $scope.element.save = true;
            temp.push($scope.element);
            $scope.closeThisDialog(temp);
        }
    }])

