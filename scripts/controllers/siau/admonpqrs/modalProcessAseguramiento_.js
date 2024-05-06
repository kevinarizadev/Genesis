'use strict';
angular.module('GenesisApp')
    .controller('modalProcessAseguramiento', ['$scope', '$timeout', 'pqrHttp', function ($scope, $timeout, pqrHttp) {
        //Objects
        $scope.datAseguramiento = {
            motivo: null, causales: null, tiposCausales: null, subTiposCausales: null, accionesTraslado: null,
            descripcion: null, respuestaTraslado: null, adjunto: null, extension: null
        }
        $scope.filterCausal = '';
        $scope.textareaBoolean = true;
        $scope.motivoCausal = false;
        $scope.subTipoCausal = false;
        $scope.booleanValidate = false;
        $scope.enableFiels = false;
        $scope.errorFile = false;
        pqrHttp.getInfoAseguramientoPQR($scope.dataPqr.CODIGO).then(function (response) {
            $scope.dpqr = response.data[0];
        })
        pqrHttp.getGestionAseguramientoPQR($scope.dataPqr.CODIGO).then(function (response) {
            $timeout(function () {
                if (response.data[0] == 0) {
                    $scope.enableFiels = false;
                } else {
                    $scope.datAseguramiento.motivo = response.data[0].MOTIVO;
                    $scope.datAseguramiento.causales = response.data[0].CAUSAL;
                    $scope.datAseguramiento.tiposCausales = response.data[0].TIPOCAUSAL;
                    $scope.datAseguramiento.subTiposCausales = response.data[0].SUBTIPOCAUSAL;
                    $scope.datAseguramiento.accionesTraslado = response.data[0].ACCIONTRASLADO;
                    $scope.datAseguramiento.descripcion = response.data[0].DESCRIPCION;
                    $scope.datAseguramiento.respuestaTraslado = response.data[0].APROBARTRASLADO;
                    $scope.validations();
                    $scope.enableFiels = true;
                }
            }, 100);

        })

        //Requests to the server
        pqrHttp.getMotivosAseguramiento().then(function (response) {
            $scope.motivosAseguramiento = response;
        })
        pqrHttp.getCausales().then(function (response) {
            $scope.causalesAseguramiento = response;
        })
        pqrHttp.get_TiposCausales().then(function (response) {
            $scope.tiposCausalesAseguramiento = response;
        })
        pqrHttp.getSubTiposCausales().then(function (response) {
            $scope.subTiposCausalesAseguramiento = response;
        })
        pqrHttp.getAccionesTraslado().then(function (response) {
            $scope.accionesTrasladoAseguramiento = response;
        })
        pqrHttp.getRespuestaTraslado().then(function (response) {
            $scope.resTrasladoAseguramiento = response;
        })
        pqrHttp.getSession().then(function (response) {
            $scope.responsable = response.cedula;
        })
        $scope.changeMotivoPQR = function (motivo) {
            if (motivo == 'P') {
                $scope.filterCausal = '0';
            }
            if (motivo in { 'C': 'C', 'S': 'S' }) {
                $scope.filterCausal = '1';
            }
            if (motivo == '') {
                $scope.filterCausal = '-1';
            }
        }
        $scope.descargafile = function (ruta,ftp) {
            pqrHttp.dowloadfile(ruta,ftp).then(function (response) {
                window.open("temp/" + response.data);
            });
        }

        $scope.validateFiels = function () {
            if ($scope.datAseguramiento.motivo == null || $scope.datAseguramiento.motivo == '') {
                $scope.booleanValidate = true;
                swal('No completado', 'Motivo PQR no puede estar vacio', 'error');
            } else {
                if ($scope.datAseguramiento.causales == null || $scope.datAseguramiento.causales == '') {
                    $scope.booleanValidate = true;
                    swal('No completado', 'Causal no puede estar vacio', 'error');
                } else {
                    $scope.booleanValidate = false;
                    // if ($scope.datAseguramiento.motivo == 'C') {
                    //     if ($scope.datAseguramiento.causales) {
                    //         if ($scope.datAseguramiento.causales == 'TR') {
                    //             if ($scope.datAseguramiento.tiposCausales == null || $scope.datAseguramiento.tiposCausales == '') {
                    //                 $scope.booleanValidate = true;
                    //                 swal('No completado', 'Tipo Causal no puede estar vacio', 'error');
                    //             } else {
                    //                 $scope.booleanValidate = false;
                    //             }
                    //         } else {
                    //             $scope.booleanValidate = false;
                    //         }
                    //     }
                    // }
                    // if ($scope.datAseguramiento.motivo == 'S') {
                    //     if ($scope.datAseguramiento.causales) {
                    //         if (($scope.datAseguramiento.causales in { 'TR': 'TR', 'CI': 'CI' })) {
                    //             if ($scope.datAseguramiento.tiposCausales == null || $scope.datAseguramiento.tiposCausales == '') {
                    //                 $scope.booleanValidate = true;
                    //                 swal('No completado', 'Tipo Causal no puede estar vacio', 'error');
                    //             } else {
                    //                 $scope.booleanValidate = false;
                    //             }
                    //         } else {
                    //             $scope.booleanValidate = false;
                    //         }
                    //     }
                    // }
                    if ($scope.datAseguramiento.motivo == 'P') {
                        $scope.booleanValidate = false;
                    }
                    if ($scope.datAseguramiento.tiposCausales in { 'LI': 'LI', 'RD': 'RD', 'SS': 'SS' }) {
                        if ($scope.datAseguramiento.subTiposCausales == null || $scope.datAseguramiento.subTiposCausales == '') {
                            $scope.booleanValidate = true;
                            swal('No completado', 'Sub tipo Causal no puede estar vacio', 'error');
                        } else {
                            $scope.booleanValidate = false;
                        }
                    }
                }
            }
            if ($scope.errorFile == true) {
                swal('No completado', 'Por favor validar el archivo que se esta adjuntando!', 'error');
                $scope.booleanValidate = true;
            } else {
                $scope.booleanValidate = false;
            }
        }
        $scope.saveAseguramiento = function () {
            $scope.validateFiels();            
            if (!$scope.booleanValidate) {
                $scope.json = JSON.stringify({
                    'pqr': $scope.dataPqr.CODIGO,
                    'motivo': $scope.datAseguramiento.motivo,
                    'causal': $scope.datAseguramiento.causales,
                    'tipoCausal': $scope.datAseguramiento.tiposCausales,
                    'subTipoCausal': $scope.datAseguramiento.subTiposCausales,
                    'accionTraslado': $scope.datAseguramiento.accionesTraslado,
                    'descripcion': $scope.datAseguramiento.descripcion,
                    'respuestaTraslado': $scope.datAseguramiento.respuestaTraslado,
                    'responsable': $scope.responsable,                                        
                    'extension':$scope.datAseguramiento.ext ? $scope.datAseguramiento.ext : null,
                    'ftp': '3'
                });
                console.log($scope.json);
                swal({ title: 'Cargando datos del PQR' }).catch(swal.noop);
                swal.showLoading();
                pqrHttp.postAseguramientoPqr($scope.json,$scope.datAseguramiento.file, $scope.datAseguramiento.ext ).then(function (res) {
                    swal(res.data.Codigo == '0' ? 'Completado' : 'No completado', res.data.Nombre, res.data.Codigo == '0' ? 'success' : 'error').then(function (response) {
                        console.log(res.data);
                        if (res.data.Codigo == 0) {
                            $scope.cleanForm();
                            $scope.closeThisDialog({data:0});
                        }
                    }).catch(swal.noop);
                })
            }
        }
        $scope.cleanForm = function () {
            $scope.datAseguramiento = {
                motivo: null, causales: null, tiposCausales: null, subTiposCausales: null, accionesTraslado: null,
                descripcion: null, respuestaTraslado: null
            }

            $timeout(function () {
                document.getElementById("ppqrAsegSoportefile").value = "";
                $scope.textareaBoolean = false;
            }, 100);
            $timeout(function () {
                $scope.textareaBoolean = true;
            }, 100);
            $scope.motivoCausal = false;
            $scope.subTipoCausal = false;
            $scope.filterCausal = '';
            $scope.booleanValidate = false;
            $scope.formatearAseg = '';
        }

        $scope.validations = function () {
            if ($scope.datAseguramiento.motivo == '' || $scope.datAseguramiento.motivo == null) {
                $scope.cleanForm();
            }
            if ($scope.datAseguramiento.motivo == 'P') {
                $scope.datAseguramiento.tiposCausales = null;
                $scope.datAseguramiento.subTiposCausales = null;
                $scope.datAseguramiento.accionesTraslado = null;
            } else {
                if ($scope.datAseguramiento.motivo == 'C') {
                    if ($scope.datAseguramiento.causales) {
                        if ($scope.datAseguramiento.causales == 'TR') {
                            $scope.motivoCausal = false;
                        } else {
                            $scope.motivoCausal = true;
                            $scope.datAseguramiento.tiposCausales = null;
                            $scope.datAseguramiento.subTiposCausales = null;
                            $scope.datAseguramiento.accionesTraslado = null;
                        }
                    } else {
                        $scope.motivoCausal = false;
                    }
                }
                if ($scope.datAseguramiento.motivo == 'S') {
                    if ($scope.datAseguramiento.causales) {
                        if (($scope.datAseguramiento.causales in { 'TR': 'TR', 'CI': 'CI' })) {
                            $scope.motivoCausal = false;
                        } else {
                            $scope.motivoCausal = true;
                            $scope.datAseguramiento.tiposCausales = null;
                            $scope.datAseguramiento.subTiposCausales = null;
                            $scope.datAseguramiento.accionesTraslado = null;
                        }
                    } else {
                        $scope.motivoCausal = false;
                    }
                }
                if ($scope.datAseguramiento.tiposCausales && $scope.datAseguramiento.causales) {
                    if ($scope.datAseguramiento.tiposCausales in { 'LI': 'LI', 'RD': 'RD', 'SS': 'SS' }) {
                        $scope.subTipoCausal = false;
                    } else {
                        $scope.subTipoCausal = true;
                        $scope.datAseguramiento.subTiposCausales = null;
                    }
                }
                if ($scope.datAseguramiento.causales == '' || $scope.datAseguramiento.causales == null) {
                    $scope.datAseguramiento.tiposCausales = null
                    $scope.datAseguramiento.subTiposCausales = null;
                }
                if ($scope.datAseguramiento.tiposCausales == '' || $scope.datAseguramiento.tiposCausales == null) {
                    $scope.subTipoCausal = false;
                    $scope.datAseguramiento.subTiposCausales = null;
                }
            }
        }//Fin
        setTimeout(() => {
            $('#observacionesA').change(function () {//Remueve espacios en al campo observaciones            
                var s = document.getElementById('observacionesA').value;//Obtiene el valor del campo observaciones
                s = s.replace(/(^\s*)|(\s*$)/gi, "");
                s = s.replace(/[ ]{2,}/gi, " ");
                s = s.replace(/\n /, "\n");
                document.getElementById('observacionesA').value = s;//Asigna las observaciones sin espacios en blanco 
            })
        }, 100);


        $scope.pasteAseguramiento = function (e) {
            swal({
                type: 'error',
                title: 'No completado',
                text: 'No puedes pegar en este campo!',
                timer: 1000
            }).catch(swal.noop);
            e.preventDefault();
            return false
        }

        
    }]).directive("selectFilesAseguramiento", function ($timeout) {
        return {
            require: "ngModel",
            link: function postLink($scope, elem, attrs, ngModel) {
                elem.on("change", function (e) {
                    var files = elem[0].files;
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
                        if (files[0].name.split('.').pop().toLowerCase() in { 'docx': 'docx', 'doc': 'doc', 'pdf': 'pdf' }) {
                            if (files[0].size > 3000000) {
                                $timeout(function () {
                                    $scope.formatearAseg = 'Peso limite excedido 3(MB)';
                                    $scope.errorFile = true;
                                }, 100)
                            } else {
                                $scope.somefunction(files);
                                setTimeout(() => {
                                    $scope.datAseguramiento.file = $scope.fileBase64;
                                    $scope.datAseguramiento.ext = $scope.fileBasExt;
                                }, 100);
                                $timeout(function () {
                                    $scope.formatearAseg = 'Formato Validado';
                                    $scope.errorFile = false;
                                }, 100)
                            }
                        } else {
                            $timeout(function () {
                                $scope.formatearAseg = 'Formato Invalido, permitidos doc(x) o pdf';
                                $scope.datAseguramiento.file = null;
                                $scope.errorFile = true;           
                            }, 100)
                        }
                    } else {
                        $timeout(function () {
                            document.getElementById("ppqrAsegSoportefile").value = "";
                            $scope.fileBase64 = null; $scope.fileBasExt = null; $scope.datAseguramiento.file = null;
                            $scope.datAseguramiento.ext = null; $scope.formatearAseg = null;
                            $scope.errorFile = false;
                        }, 100)
                    }

                })

            }
        }
    });

