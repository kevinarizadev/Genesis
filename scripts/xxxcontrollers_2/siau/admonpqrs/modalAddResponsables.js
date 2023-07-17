'use strict';
angular.module('GenesisApp')
    .controller('modalAddResponsables', ['$scope', 'pqrHttp', function ($scope, pqrHttp) {
        //Objects and Variables
        $scope.responsableFilter = '';
        $scope.seleccionablesFilter = '';
        $scope.countR = 0;
        $scope.countS = 0;
        $scope.getResponsables = function () {
            pqrHttp.getResponsables().then(function (res) {
                $scope.responsablesSelecionables = res;
            })
        }

        $scope.getResponsablesIps = function () {
            pqrHttp.get_responsables_ips().then(function (res) {
                $scope.responsablesSelecionablesIps = res;
            })
        }
        $scope.getResponsablesPQR = function () {
            if ($scope.dataPqr) {
                pqrHttp.getResponsablesPQR($scope.dataPqr.CODIGO).then(function (res) {
                    $scope.secondResponsables = res.data;
                })
            }
        }
        $scope.getResponsables();
        $scope.getResponsablesIps();
        $scope.getResponsablesPQR();

        $scope.saveResponbleSecundario = function (responsable, estado) {
            if (estado == 'A') {
                swal({
                    text: "Ingrese un Comentario para Especificar los Requerimientos",
                    input: 'textarea',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Guardar',
                    cancelButtonText: 'Cancelar',
                    customClass: 'swal-wide'
                }).then((result) => {
                    if (result) {
                        var data = {
                            pqr: $scope.dataPqr.CODIGO,
                            documento: responsable.cedula,
                            comentario: result,
                            estado: 'A',
                            documento_rem: sessionStorage.getItem('cedula')

                            
                        }
                        pqrHttp.postCrudSalud(JSON.stringify(data)).then(function (res) {
                            swal(res.Codigo == '1' ? 'Completado' : 'No Completado', res.Nombre, res.Codigo == '1' ? 'success' : 'error');
                            $scope.getResponsablesPQR();
                            pqrHttp.postViewNotification($scope.dataPqr.CODIGO, $scope.responsable).then(function (res) {
                                // console.log(res.data);
                            })
                        })
                    }
                }).catch(swal.noop);
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

                        var data = {
                            pqr: $scope.dataPqr.CODIGO,
                            documento: responsable.DOCUMENTO,                            
                            estado: estado

                            
                        }


                        pqrHttp.postCrudSalud(JSON.stringify(data)).then(function (res) {
                            $scope.getResponsablesPQR();
                        })
                    }
                }).catch(swal.noop);
            }
        }


        $scope.reAsignResponsable = function (responsable) {
            swal({
                title: 'Confirmar Proceso',
                text: '¿Deseas reasignar el PQR N° ' + $scope.dataPqr.CODIGO + ' al responsable: ' + responsable.nombre + '?',
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result) {

                    swal({
                        title: 'Para transferir debe redactar un comentario',
                        input: 'textarea',
                        inputAttributes: {
                            autocapitalize: 'off'
                        },
                        showCancelButton: true,
                        confirmButtonText: 'GUARDAR',
                        showLoaderOnConfirm: true,
                        preConfirm: (comment) => {
                            console.log(comment);
                            if (comment) {
                                pqrHttp.postReasignarResponsablePqr(responsable.cedula, $scope.dataPqr.CODIGO, comment, sessionStorage.getItem('cedula')).then(function (res) {
                                    swal(res.data.codigo == '0' ? 'Completado' : 'No Completado', res.data.mensaje, res.data.codigo == '0' ? 'success' : 'error').then(function (response) {
                                        if (res.data.codigo == '0') {
                                            $scope.getResponsablesPQR();
                                            $scope.closeThisDialog();
                                        }
                                    }).catch(swal.noop);
                                })
                            } else {
                                swal('No Completado', 'Comentario no puede estar vacio', 'error').catch(swal.noop);
                            }

                        }
                    });
                }
            }).catch(swal.noop);

        }
        $scope.$watch('results', function () {
            if ($scope.results && $scope.results.length == 0) {
                $scope.countS = 0;
            }
        });
        $scope.$watch('resultsR', function () {
            if ($scope.resultsR && $scope.resultsR.length == 0) {
                $scope.countR = 0;
            }
        });
    }])

