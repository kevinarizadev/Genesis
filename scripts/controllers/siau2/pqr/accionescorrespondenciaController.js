'use strict';
angular.module('GenesisApp')
    .controller('accionescorrespondenciaController', ['$scope', 'pqrHttp', function ($scope, pqrHttp) {

        $(document).ready(function () {
            $("#modaldetallepqr").modal();
            $("#modalaccionescorrepondencia").modal();
            $("#modalcorrespondencia").modal();
            
        });

        $scope.filterEstados = '';
        $scope.tempaccion = '';
        $scope.vnumpqr = '';
        $scope.accionboolean = false;
        $scope.accionobservaciones = null;
        $scope.showpqrlist= true;
        $scope.buscarcorrespondencia = function (param) {

            if (param) {
            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
            });
            pqrHttp.get_correpondencia_x_estado(param).then(function (response) {


        
                    $scope.dpqrs = response;
                    $scope.showpqrlist= false;
                    if ($scope.dpqrs.length==0) {
                         $scope.dpqrs = [];
                         $scope.showpqrlist= true;
                         swal('Genesis informa', 'Correspondencia no encontrada', 'info');
                    }
                    $scope.filterEstados= response[0].ESTADO_NORMAL;
                    swal.close();
               
                         
            })  }else{
                swal('Genesis informa', 'No pueden haber campos vacios.', 'info');
            }
        }

      
        $scope.changepqrother = function () {
            pqrHttp.get_correpondencia_x_estado($scope.filterPQRSA).then(function (response) {
                $scope.dpqrs = response
            })
        }


        $scope.openmodals = function (params, pqr) {            
            switch (params) {
                case 'modaldetallepqr':
                    $("#modaldetallepqr").modal("open");
                    break;
                   case 'modalcorrespondencia':
                    swal({
                        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                        width: 200,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        animation: false
                    });
                    pqrHttp.get_detalle_correspondencia(pqr.CONSECUTIVO).then(function (response) {                        
                        $scope.detallecorrespondencia = response;

                        pqrHttp.get_func_areas($scope.detallecorrespondencia.area_correspondencia, 0).then(function (response) {
                            $scope.responsablesdetalles = response;

                        })
                        swal.close();
                        $("#modalcorrespondencia").modal("open");

                    })

                    break;
                case 'modalaccionescorrepondencia':
                    $("#modalaccionescorrepondencia").modal("open");
                    break;
                default:
                    break;
            }
        }
        $scope.closemodals = function (params) {
            switch (params) {
                case 'modaldetallepqr':
                    $("#modaldetallepqr").modal("close");
                    break;

                case 'modalaccionescorrepondencia':
                    $("#modalaccionescorrepondencia").modal("close");
                    break;
                    case 'modalcorrespondencia':
                    $("#modalcorrespondencia").modal("close");
                    break;
                default:
                    break;
            }
        }
        $scope.descargafile = function (ruta,ftp) {
            pqrHttp.dowloadfile(ruta,ftp).then(function (response) {
                window.open("temp/" + response.data);
            });
        }

        $scope.accioncorrespondencia = function (params, estado) {            
            $scope.tempaccion = estado;
            $scope.temparams = params;
            if (estado == 'D') {
                pqrHttp.getInfoAseguramientoPQR(params.CODIGO).then(function (response) {
                    $scope.dpqr = response.data[0];
                    $scope.openmodals('modalcorrespondencia',params);
                })

                
            } else {
                $scope.motivoaccion = '';
                $scope.jutificacion = '';
                pqrHttp.get_motivosacciones(estado, 'C').then(function (response) {
                    $scope.listMotivos = response.data;
                })
                $scope.openmodals("modalaccionescorrepondencia");
            }
        }
        $scope.showpqr = true;
        $scope.search_correspondencia = function (params) {
            pqrHttp.get_correspondencia_numero(params).then(function (response) {

                if (response.data.length == 0) {
                    swal('Genesis informa', 'Correspondencia no encontrada', 'error');
                    $scope.datapqr = [];
                    $scope.showpqr = true;
                } else {
                    $scope.datapqr = response.data;
                    $scope.showpqr = false;
                }
            })
        }
        $scope.tempqr = '';
        $scope.select_pqr = function (params) {
            $scope.tempqr = params.CODIGO;
        }

        $scope.removerpqr = function () {
            $scope.tempqr = '';
            $scope.datapqr = [];
            $scope.showpqr = true;
            $scope.accionboolean = false;
        }

        $scope.save_acciones = function () {
            $scope.motivo_anulacion = '';
            $scope.motivo_activacion = '';
            var tempaccion = '';
            if ($scope.tempaccion == 'X') {
                tempaccion = 'ANULAR';
                $scope.motivo_anulacion = $scope.motivoaccion;
                $scope.numasociado = $scope.tempqr;
                if ($scope.motivo_anulacion) {
                    if ($scope.motivo_anulacion == '1' && $scope.tempaccion == 'X') {
                        if ($scope.numasociado == '') {
                            $scope.accionboolean = true;
                        } else {
                            $scope.accionboolean = false;
                        }

                    } else {
                        $scope.accionboolean = false;
                    }
                } else {
                    $scope.accionboolean = true;
                }


            }
            if ($scope.tempaccion == 'A') {
                tempaccion = 'ACTIVAR';
                $scope.motivo_activacion = $scope.motivoaccion;

                if ($scope.motivo_activacion == '') {
                    $scope.accionboolean = true;
                }
            }

            if ($scope.accionobservaciones) {
                $scope.accionboolean = false;
            } else {
                $scope.accionboolean = true;
            }


            if ($scope.accionboolean == true) {
                swal('Genesis informa', 'No pueden haber campos vacios!', 'error');
            } else {
                swal({
                    title: 'Confirmar',
                    text: '¿Desea ' + tempaccion + '?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ACEPTAR',
                    cancelButtonText: 'CANCELAR'
                }).then(function () {
                    swal({
                        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                        width: 200,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        animation: false
                    });
                    pqrHttp.postEstadoSOL({
                        'pqr': $scope.temparams.CODIGO, 'responsable': sessionStorage.getItem('cedula'), 'estado_anterior': $scope.temparams.ESTADO_NORMAL, 'estado_nuevo': $scope.tempaccion,
                        motivo_anulacion: $scope.motivo_anulacion,
                        motivo_activacion: $scope.motivo_activacion,
                        pqr_asociada: $scope.numasociado,
                        modulo: 'C',
                        observacion: $scope.accionobservaciones
                    }).then(function (response) {
                        swal.close();
                        if (response.data.codigo == 0) {
                            swal('Genesis informa', response.data.mensaje, 'success');
                            $scope.changepqrother();
                            $scope.showpqr = true;
                            $scope.datapqr = [];
                            $scope.closemodals('modalaccionescorrepondencia');
                        }
                        if (response.data.codigo == 1) {
                            swal('Genesis informa', response.data.mensaje, 'error');

                        }

                    })
                }).catch(swal.noop);
            }



        }

   

    }])
