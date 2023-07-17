'use strict';
angular.module('GenesisApp')
    .controller('modificarpqrController', ['$scope', 'pqrHttp', '$filter', function ($scope, pqrHttp, $filter) {

        $(document).ready(function () {
            $("#modalselecresponsable").modal();
        });





        $scope.hideedicion = true;
        $scope.hidesearch = true;
        $scope.datapqr = null;
        $scope.list_pqr_patologia = null;
        $scope.list_pqr_motivo_res = null;
        $scope.list_pqr_tecno_altocosto = null;
        $scope.tempqr = null;
        $scope.postData = {
            pqr: null,
            estado: null,
            fecha_creacion: null,
            patologia: null,
            motivo_res: null,
            tecno_altocosto: null,
            otra_respuesta_motivo: null,
            fase:null
        }

        $scope.buscarpqr = function (params) {            
            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
            });
            pqrHttp.p_obtener_pqr_super(params).then(function (response) {                
                if (response.length == 0) {
                    swal('Genesis informa', 'No se encontraron resultados!', 'error');
                } else {
                    $scope.tempfasespqr = response;
                    swal.close();
                }
            })
        }
        $scope.showeditarpqr = function (param) {
            $scope.tempqr = param;
            $scope.hideedicion = false;
            $scope.hidesearch = false;

            $scope.postData.fecha_creacion_temp = new Date(param.FECHA_CREACION);
            console.log($scope.postData.fecha_creacion_temp);            
            pqrHttp.p_obtener_pqr_patologia().then(response => {
                $scope.list_pqr_patologia = response;
            })
            pqrHttp.p_obtener_pqr_motivo_res().then(response => {
                $scope.list_pqr_motivo_res = response;
            })
            pqrHttp.p_obtener_pqr_tecno_altocosto().then(response => {
                $scope.list_pqr_tecno_altocosto = response;
            })
        }

        $scope.getOtroMotivoRespuesta = function (params) {            
            var tempmotivorespuesta = $scope.list_pqr_motivo_res.find(item => item.CODIGO == params);            
            $scope.postData.otra_respuesta_motivo = tempmotivorespuesta.ACCION;
        }

        $scope.back_list_pqrs = function () {
            $scope.hideedicion = true;
            $scope.hidesearch = true;

        }


        $scope.descargafile = function (ruta,ftp) {
            pqrHttp.dowloadfile(ruta,ftp).then(function (response) {
                window.open("temp/" + response.data);
            });
        }

        $scope.saveEdicion = function () {
            $scope.postData.pqr = $scope.tempqr.NUMERO;
            $scope.postData.fase = $scope.tempqr.FASE;
            $scope.postData.estado = $scope.tempqr.ESTADO;
            $scope.postData.fecha_creacion = $filter('date')($scope.postData.fecha_creacion_temp, 'dd/MM/yyyy hh:mm:ss');
            console.log($scope.postData.fecha_creacion);
            console.log(JSON.stringify($scope.postData));
            pqrHttp.p_actualizar_pqr_solicitud(JSON.stringify($scope.postData)).then(function (response) {                              
                swal(response.Codigo == '0' ? 'Completado' : 'No completado', response.Nombre, response.Codigo == '0' ? 'success' : 'error').then(function () {
                    if (response.Codigo == '0') {
                        $scope.hideedicion = true;
                        $scope.hidesearch = true;
                        $scope.postData = {
                            pqr: null,
                            estado: null,
                            fecha_creacion: null,
                            patologia: null,
                            motivo_res: null,
                            tecno_altocosto: null,
                            otra_respuesta_motivo: null,
                            fase: null
                        }
    
                        $scope.buscarpqr($scope.tempqr.NUMERO);
    
                    }
                }).catch(swal.noop);                
            });

        }




    }])
