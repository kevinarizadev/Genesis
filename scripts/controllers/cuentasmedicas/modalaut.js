'use strict';
angular.module('GenesisApp')
    .controller('modalaut', ['$scope', '$http', 'ngDialog', 'censoHttp', '$filter', function ($scope, $http, ngDialog, censoHttp, $filter) {

        $('#ha').DataTable();
        // $('#historial_aut').DataTable();

        $scope.viewdataAut = false;
        $http({
            method: 'POST',
            url: "php/censo/nuevas_funciones.php",
            data: {
                function: 'obtener_aut',
                v_pdocumento: $scope.autdoc,
                v_pnumero: '0',
                v_pubicacion: '0'
            }
        }).then(function (response) {
            $scope.viewdataAut = true;
            $scope.listarAutorizaciones = response.data.ordinaria;
            //historial_aut
        });

        $scope.consultarAutorizacion = function (numero, ubicacion, accion) {
            swal({ title: 'Buscando...' });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: { function: 'obtener_Uautorizaciones', numero: numero, ubicacion: ubicacion }
            }).then(function (response) {
                console.log(response.data.cabeza);
                if (accion == 'C') {
                    $scope.v_encabezadov = response.data.cabeza;
                    $scope.v_detallev = response.data.detalle;
                    $scope.v_detallev.forEach(element => {
                        $scope.v_detallev = element;
                    });
                    if ($scope.v_encabezadov.ESTADO == 'A') {
                        $scope.verPrintDetalle = true;
                    } else {
                        $scope.verAutorizaciones = false;
                        $scope.numautprocesada = $scope.v_encabezadov.NUM_OASIS;
                        $scope.ubicacionPrint = $scope.v_encabezadov.UBI_OASIS;
                        if ($scope.v_encabezadov.IMPRESION == 'false') {
                            $scope.verPrintDetalle = true;
                        }
                        if ($scope.v_encabezadov.IMPRESION == 'true') {
                            $scope.verPrintDetalle = false;
                        }

                    }



                }
                if (accion == 'E') {
                    $scope.verAutorizaciones = true;
                    $scope.v_encabezado = response.data.cabeza;
                    $scope.v_detalle = response.data.detalle;
                    $scope.cargarContratoTabI($scope.v_encabezado.NIT_ASIGNADA, $scope.regimentabIV, 'tab4');//faltan parametros.
                    setTimeout(() => {
                        console.log($scope.v_encabezado);
                        var ftemp = $scope.v_encabezado.FECHA_ORDEN.split("/");
                        $scope.obtenerServiciosTabI($scope.v_encabezado.CONTRATO, 'tab4');
                        $scope.autedit.numero = $scope.v_encabezado.NUM_OASIS;
                        $scope.autedit.ubicacion = $scope.v_encabezado.UBI_OASIS;
                        $scope.autedit.tipodocumento = $scope.infoafiliadoautedit.TipoDocumento;
                        $scope.autedit.documento = $scope.infoafiliadoautedit.Documento;
                        $scope.autedit.diagnom1 = $scope.v_encabezado.DX + ' - ' + $scope.v_encabezado.NOMBRE_DX;
                        $scope.autedit.diagnom2 = $scope.v_encabezado.DX1 == 'N' ? '' : $scope.v_encabezado.DX1 + ' - ' + $scope.v_encabezado.NOMBRE_DX1;
                        $scope.autedit.diagcod1 = $scope.v_encabezado.DX;
                        $scope.autedit.diagcod2 = $scope.v_encabezado.DX1;
                        $scope.autedit.ipsasignada = $scope.v_encabezado.ASIGNADA;
                        $scope.autedit.ipscodasignada = $scope.v_encabezado.NIT_ASIGNADA;
                        $scope.autedit.ipsasignadadireccion = 0;
                        $scope.autedit.contrato = $scope.v_encabezado.CONTRATO;
                        $scope.autedit.ubicacioncontrato = $scope.v_encabezado.UBICACION_CONTRATO;
                        $scope.autedit.documentocontrato = $scope.v_encabezado.CONTRATO;
                        $scope.autedit.servicio = $scope.v_encabezado.CLASIFICACION;
                        $scope.autedit.fechasolicitud = new Date(ftemp[2], (ftemp[1] - 1), ftemp[0]);
                        $scope.autedit.fechasolicitudparseada = '';
                        $scope.autedit.origen = $scope.v_encabezado.ORIGEN;
                        $scope.autedit.tiposervicio = $scope.v_encabezado.TIPO_SERVICIO;
                        $scope.autedit.ubicacionpaciente = $scope.v_encabezado.UBICACION_SOL;
                        $scope.autedit.ipssolicita = $scope.v_encabezado.SOLICITANTE;
                        $scope.autedit.ipscodsolicita = $scope.v_encabezado.NIT_SOLICITANTE;
                        $scope.autedit.nombremedico = $scope.v_encabezado.MEDICO;
                        $scope.autedit.especialidadmedico = $scope.v_encabezado.ESPECIALIDAD;
                        $scope.autedit.observacion = $scope.v_encabezado.OBSERVACION;
                        $scope.autedit.nopos = $scope.v_encabezado.POSS == 'TRUE' ? true : false;
                        $scope.autedit.valornopos = '';
                        $scope.autedit.valortipo = '';
                        // $scope.autedit.mipres = false;
                        setTimeout(() => {
                            $scope.autedit.valormipres = $scope.v_encabezado.MIPRES;

                            if ($scope.autedit.valormipres != 0) {
                                $scope.inactimiprestab4 = false;
                                $scope.autedit.mipres = true;
                            } else {
                                $scope.autedit.mipres = false;
                                $scope.inactimiprestab4 = true;
                            }
                        }, 100);

                        // $scope.autedit.ctc = $scope.v_encabezado.CTC == 'TRUE' ? true : false;

                        // $scope.autedit.valorctc = $scope.v_encabezado.NUM_CTC
                        // $scope.autedit.valormipres= $scope.autedit.valorctc;

                        $scope.autedit.tutela = $scope.v_encabezado.TUTELA == 'TRUE' ? true : false;
                        $scope.autedit.valortutela = '';
                        $scope.autedit.anticipo = $scope.v_encabezado.ANTICIPO == 'TRUE' ? true : false;
                        $scope.autedit.valoranticipo = '';
                        $scope.autedit.siniestro = $scope.v_encabezado.SINIESTRO == 'TRUE' ? true : false;
                        $scope.autedit.valorsiniestro = '';
                        $scope.autedit.altocosto = '';
                        $scope.autedit.prioridad = $scope.v_encabezado.PRIORIDAD == 'TRUE' ? true : false;
                        $scope.autedit.valorprioridad = '';
                        $scope.autedit.accion = 'U';

                        $scope.v_detalle.forEach((element, index) => {
                            $scope.productosagregadostabIV.push(element[index]);
                        });
                        $scope.setParametros('noposp', $scope.infoafiliadoautedit.TipoDocumento, $scope.infoafiliadoautedit.Documento);

                    }, 100);
                }

                swal.close();

            })
        }


    }]);