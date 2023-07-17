'use strict';
angular.module('GenesisApp')
    .controller('modalEditarSuperSalud', ['$scope', '$timeout', 'pqrHttp', function ($scope, $timeout, pqrHttp) {
        console.log($scope.dataPqrExcel);
        $scope.sujeto = true;
        $scope.pqrDataSuper = {
            selectedCriteriObjetivo: null,
            selectedCriterioSubjetivo: null,
            selectedCriteriComplementario: null,
            selectedSujetosProteccionEspecial: null,
            selectedServicios: null,
            selectedMedicamentos: null,
            pqrfile: null,
            adjunto: null,
            ext: null,
            codigosuper: null,
            reporta: 'S'
        }
        $scope.sformato = null;
        $scope.validar = false;
        $scope.validateSave = function () {
            console.log($scope.pqrDataSuper.adjunto);
            console.log($scope.pqrDataSuper.ext);
            if ($scope.pqrDataSuper.reporta == 'S') {
                if ($scope.validateFile() == true) {

                } else {
                    if ($scope.dataPqrExcel.RIESGO == 'S') {
                        if (($scope.pqrDataSuper.selectedCriteriObjetivo == null || $scope.pqrDataSuper.selectedCriteriObjetivo == '') &&
                            ($scope.pqrDataSuper.selectedCriterioSubjetivo == null || $scope.pqrDataSuper.selectedCriterioSubjetivo == '') &&
                            ($scope.pqrDataSuper.selectedCriteriComplementario == null || $scope.pqrDataSuper.selectedCriteriComplementario == '') &&
                            ($scope.pqrDataSuper.selectedServicios == null || $scope.pqrDataSuper.selectedServicios == '') &&
                            ($scope.pqrDataSuper.selectedMedicamentos == null || $scope.pqrDataSuper.selectedMedicamentos == '')) {
                            console.log("No es valido");
                            $scope.validar = true;
                            swal('No completado', 'Revise que alguna opción de riesgo de vida este selecionada!', 'error'
                            ).then(function () { }).catch(swal.noop);
                        } else {
                            $scope.validateFile();
                            if ($scope.pqrDataSuper.selectedCriteriComplementario == '3') {
                                if ($scope.pqrDataSuper.selectedSujetosProteccionEspecial == 0 ||
                                    $scope.pqrDataSuper.selectedSujetosProteccionEspecial == null
                                    || $scope.pqrDataSuper.selectedSujetosProteccionEspecial == '') {
                                    console.log("No es valido");
                                    swal('No completado', 'La opción sujetos de especial protección no puede estar vacia!', 'error'
                                    ).then(function () { }).catch(swal.noop);
                                    $scope.validar = true;
                                } else {
                                    $scope.validar = false;

                                }

                            }

                        }
                    } else {
                        $scope.validateFile();
                    }
                }





                if ($scope.validar == false) {
                    console.log("ENVIA LA PETICION");
                    $scope.saveSuperSalud();
                } else {
                    console.log("NO ENVIES LA PETICION");
                }
            } else {
                $scope.saveSuperSalud();
            }
        }

        $scope.validateFile = function () {
            if ($scope.pqrDataSuper.adjunto == null && $scope.pqrDataSuper.ext == null) {
                swal('No completado', 'El soporte del PQR es obligatorio!', 'error'
                ).then(function () { }).catch(swal.noop);
                return $scope.validar = true;

            } else {
                return $scope.validar = false;
            }
        }
        $scope.saveSuperSalud = function () {

            $scope.json = JSON.parse(JSON.stringify({
                'criterioobjetivo': $scope.pqrDataSuper.selectedCriteriObjetivo,
                'criteriosubjetivo': $scope.pqrDataSuper.selectedCriterioSubjetivo,
                'critericomplementario': $scope.pqrDataSuper.selectedCriteriComplementario,
                'sujetosproteccionespecial': $scope.pqrDataSuper.selectedSujetosProteccionEspecial,
                'servicios': $scope.pqrDataSuper.selectedServicios,
                'medicamentos': $scope.pqrDataSuper.selectedMedicamentos,
                'pqrfileFtp': "/cargue_ftp/Digitalizacion/Genesis/TempPQR/" + $scope.dataPqrExcel.CODIGOSUPER + "/",
                'pqrfile': "/cargue_ftp/Digitalizacion/Genesis/TempPQR/" + $scope.dataPqrExcel.CODIGOSUPER + "/" + $scope.dataPqrExcel.CODIGOSUPER + '.' + $scope.pqrDataSuper.ext,
                'adjunto': $scope.pqrDataSuper.adjunto,
                'extension': $scope.pqrDataSuper.ext,
                'codigosuper': $scope.dataPqrExcel.CODIGOSUPER,
                'reporta': $scope.pqrDataSuper.reporta
            }));

            console.log($scope.json);
            swal({ title: 'Cargando datos del PQR' }).catch(swal.noop);
            swal.showLoading();
            pqrHttp.postPQRSuperSalud($scope.json).then(function (res) {
                console.log(res);
                swal(res.data.Codigo == '1' ? 'Completado' : 'No completado', res.data.Nombre, res.data.Codigo == '1' ? 'success' : 'error'
                ).then(function () {
                    if (res.data.Codigo == '1') {
                        $timeout(function () {
                            $scope.pqrDataSuper = {
                                selectedCriteriObjetivo: null,
                                selectedCriterioSubjetivo: null,
                                selectedCriteriComplementario: null,
                                selectedSujetosProteccionEspecial: null,
                                selectedServicios: null,
                                selectedMedicamentos: null,
                                pqrfile: null,
                                adjunto: null,
                                ext: null,
                                codigosuper: null,
                                reporta: 'S'
                            }
                            $scope.sujeto = true;
                            $scope.closeThisDialog();
                        }, 100)
                    }
                }).catch(swal.noop);
            })
        }

        $scope.changeComplement = function (criterio) {
            console.log(criterio);
            if (criterio != '3') {
                $scope.pqrDataSuper.selectedSujetosProteccionEspecial = null;
                $scope.sujeto = true;
            } else {
                $scope.sujeto = false;
                $scope.pqrDataSuper.selectedSujetosProteccionEspecial = "0";
            }
        }//Fin

        $scope.cancelarSuper = function () {
            swal({
                title: 'Confirmar Proceso',
                text: '¿Desea cancelar la tabulación?',
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then(function () {
                console.log("jp");
                $timeout(function () {
                    $scope.sujeto = true;
                    $scope.pqrDataSuper = {
                        selectedCriteriObjetivo: null,
                        selectedCriterioSubjetivo: null,
                        selectedCriteriComplementario: null,
                        selectedSujetosProteccionEspecial: null,
                        selectedServicios: null,
                        selectedMedicamentos: null,
                        pqrfile: null,
                        adjunto: null,
                        ext: null,
                        codigosuper: null,
                        reporta: 'S'
                    }

                    $scope.sformato = null;
                    $scope.fileBase64 = null;
                    $scope.fileBasExt = null;
                    if (document.getElementById('inputFilePlaceHolder')) {
                        document.getElementById('inputFilePlaceHolder').value = '';
                    }
                    if (document.getElementById('pqrfile')) {
                        document.getElementById('pqrfile').value = '';
                    }

                }, 100);
            }).catch(swal.noop);

        }
    }])
    .directive("selectFilesSuper", function ($timeout) {
        return {
            require: "ngModel",
            link: function postLink($scope, elem, attrs, ngModel) {
                elem.on("change", function (e) {
                    var files = elem[0].files;
                    console.log(files);
                    $scope.somefunction = function (files) {
                        var reader = new FileReader();
                        reader.readAsDataURL(files[0]);
                        reader.onload = function () {
                            $scope.fileBase64 = event.target.result; //Asigna el file al ng-model pqrFile
                            $scope.fileBasExt = files[0].name.split('.').pop().toLowerCase();//Asigna la extension del pqrFile                                    
                        };
                        reader.onerror = function (error) {
                            console.log('Error: ', error);
                        };
                    }

                    if (files.length > 0) {
                        console.log(files[0].name);
                        if (files[0].name.split('.').pop().toLowerCase() in { 'pdf': 'pdf' }) {
                            if (files[0].size > 5242880) {
                                $timeout(function () {
                                    $scope.sformato = 'El archivo excede el peso limite (5MB)';
                                    $scope.requireAdjuntar = true;
                                    $scope.validar = true;
                                }, 100)
                            } else {
                                $scope.somefunction(files);
                                $timeout(function () {
                                    $scope.pqrDataSuper.adjunto = $scope.fileBase64;
                                    $scope.pqrDataSuper.ext = $scope.fileBasExt;
                                    console.log($scope.pqrDataSuper.adjunto);
                                    console.log($scope.pqrDataSuper.ext);
                                }, 100);
                                $timeout(function () {
                                    $scope.sformato = 'Dentro Del Peso Limite y Formato Validado';
                                    $scope.requireAdjuntar = false;
                                    $scope.validar = false;
                                }, 100)
                            }
                        } else {
                            $timeout(function () {
                                $scope.sformato = 'Formato Invalido solo puedes adjuntar archivos con extensión .pdf';
                                $scope.pqrDataSuper.adjunto = null;
                                $scope.requireAdjuntar = true;
                                $scope.validar = true;
                            }, 100)
                        }
                    } else {
                        $timeout(function () {
                            $scope.fileBase64 = null; $scope.fileBasExt = null; $scope.requireAdjuntar = false;
                            $scope.pqrDataSuper.adjunto = $scope.pqrDataSuper.ext = null;
                            $scope.validar = true;
                            $scope.sformato = null;
                        }, 100)
                    }
                })

            }

        }
    });

