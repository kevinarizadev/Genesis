'use strict';
angular.module('GenesisApp')
    .controller('modalEditarSuperSalud', ['$scope', '$http', '$timeout', 'pqrHttp', function ($scope, $http, $timeout, pqrHttp) {
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
        if ($scope.dataPqrExcel.EDAD_DIAS == '') {
            $scope.dataPqrExcel.OBLIG_AUT = 'N';
            setTimeout(() => { $scope.$apply(); }, 500);
        }

        $scope.validateSave = function () {
            console.log($scope.pqrDataSuper.adjunto);
            console.log($scope.pqrDataSuper.ext);
            if ($scope.pqrDataSuper.reporta == 'S') {
                
                // if ($scope.dataPqrExcel.OBLIG_AUT == 'S' && $scope.listServicios.length == 0) {
                //     swal('No completado', '¡Debe cargar el servicio!', 'error').catch(swal.noop);
                //     return
                // }
                if($scope.validateFile() == true) {
                
                } else {
                    $scope.saveSuperSalud();
                
            }
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
                    console.log(res.data)
                    if (res.data.Codigo == '1') {
                        $scope.guardarProductoServicio(res.data.Numero);
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

        /////////////// XSERVICIOS ///////////////
        /////////////// XSERVICIOS ///////////////
        /////////////// XSERVICIOS ///////////////
        $scope.limpiarProductos = function () {
            $scope.pqrServicios = {
                obligAut: 'N',

                buscarProducto: '',
                codProducto: '',
                nomProducto: '',
                listProductos: [],

                mostrarSubclase: '',
                buscarProductoSubclase: '',
                codProductoSubclase: '',
                nomProductoSubclase: '',
                listProductosSubclase: [],

                reqAut: 'N'
            }

            $scope.listServicios = [];
        }
        $scope.limpiarProductos();

        $scope.obtenerProductoServicio = function () {

            $scope.pqrServicios.listProductos = [];
            $scope.pqrServicios.codProducto = '';
            $scope.pqrServicios.nomProducto = '';
            $scope.pqrServicios.mostrarSubclase = '';

            $scope.pqrServicios.listProductosSubclase = [];
            $scope.pqrServicios.buscarProductoSubclase = '';
            $scope.pqrServicios.codProductoSubclase = '';
            $scope.pqrServicios.nomProductoSubclase = '';

            if ($scope.pqrServicios.buscarProducto == '') {
                swal("Mensaje", 'Debe digitar un producto', "warning").catch(swal.noop);
                return;
            }

            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
            });
            $http({
                method: 'POST',
                url: "php/siau/pqr/Rpqr.php",
                data: {
                    function: "p_buscar_productos_cierre",
                    coinc: $scope.pqrServicios.buscarProducto,
                    edadDias: $scope.dataPqrExcel.EDAD_DIAS,
                    sexoCodigo: $scope.dataPqrExcel.SEXO_CODIGO
                }
            }).then(function ({ data }) {
                if (data && data.toString().substr(0, 3) != '<br') {
                    if (data.length && data[0].CODIGO != '-1') {
                        swal.close();
                        $scope.pqrServicios.listProductos = data;
                        if (data.length == 1) {
                            $scope.pqrServicios.buscarProducto = data[0].NOMBRE;
                            $scope.changeBuscarProductoServicio();
                            return
                        }
                    } else {
                        $scope.pqrServicios.listProductos = [];
                        swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
                    }
                } else {
                    swal("Mensaje", data, "warning").catch(swal.noop);
                }
            })
            setTimeout(() => { $scope.$apply(); }, 500);
        }

        $scope.changeBuscarProductoServicio = function () {
            if ($scope.pqrServicios) {
                $scope.pqrServicios.listProductos.forEach(e => {
                    if (e.NOMBRE == $scope.pqrServicios.buscarProducto) {
                        $scope.pqrServicios.buscarProducto = e.NOMBRE;
                        $scope.pqrServicios.codProducto = e.CODIGO;
                        $scope.pqrServicios.nomProducto = e.NOMBRE;
                        $scope.pqrServicios.mostrarSubclase = e.SUBCLASIFICACION;
                        $scope.pqrServicios.reqAut = 'N';
                        if (e.SUBCLASIFICACION == 'S') { $scope.obtenerProductoServicio_Subclase(); }
                        // CODIGO: "883401"
                        // EDAD: "0 - 100"
                        // GENERO: "AMBOS"
                        // NOMBRE: "RESONANCIA MAGNETICA DE ABDOMEN"
                        // SUBCLASIFICACION: "S"
                        setTimeout(() => { $scope.$apply(); }, 500);
                    }
                });
            }
        }

        $scope.obtenerProductoServicio_Subclase = function () {
            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
            });
            $http({
                method: 'POST',
                url: "php/siau/pqr/Rpqr.php",
                data: {
                    function: "p_obtener_subcategorias",
                    coinc: $scope.pqrServicios.codProducto
                }
            }).then(function ({ data }) {
                console.log(data)
                if (data && data.toString().substr(0, 3) != '<br') {
                    if (data.length) {
                        swal.close();
                        $scope.pqrServicios.listProductosSubclase = data;
                        document.getElementById("buscarProductoSubclase").focus();
                    } else {
                        $scope.pqrServicios.listProductosSubclase = [];
                        swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
                    }
                } else {
                    swal("Mensaje", data, "warning").catch(swal.noop);
                }
            })
            setTimeout(() => { $scope.$apply(); }, 500);
        }


        $scope.changeBuscarProductoServicio_Subclase = function () {
            if ($scope.pqrServicios) {
                $scope.pqrServicios.listProductosSubclase.forEach(e => {
                    if (e.nombre == $scope.pqrServicios.buscarProductoSubclase) {
                        $scope.pqrServicios.buscarProductoSubclase = e.nombre;
                        $scope.pqrServicios.codProductoSubclase = e.codigo;
                        $scope.pqrServicios.nomProductoSubclase = e.nombre;
                        setTimeout(() => { $scope.$apply(); }, 500);
                    }
                });
            }
        }

        $scope.agregarProductoServicio = function () {
            if ($scope.pqrServicios.codProducto == '') {
                swal("Mensaje", 'Debe escoger un producto', "warning").catch(swal.noop);
                return;
            }
            var encontrado = false;
            $scope.listServicios.forEach(e => {
                if (e.COD_PRODUCTO == $scope.pqrServicios.codProducto && e.COD_SUBCLASE == $scope.pqrServicios.codProductoSubclase) {
                    swal("Mensaje", 'Producto repetido', "warning").catch(swal.noop);
                    encontrado = true;
                    return;
                }
            });
            // $scope.pqrServicios.codProducto
            // $scope.pqrServicios.codProductoSubclase

            if (encontrado == false) {
                $scope.pqrServicios.listProductos.some(function (e) {
                    if (e.NOMBRE == $scope.pqrServicios.buscarProducto) {
                        $scope.listServicios.push({
                            COD_PRODUCTO: $scope.pqrServicios.codProducto, NOM_PRODUCTO: $scope.pqrServicios.nomProducto,
                            COD_SUBCLASE: $scope.pqrServicios.codProductoSubclase, NOM_SUBCLASE: $scope.pqrServicios.nomProductoSubclase,
                            REQUIEREAUT: $scope.pqrServicios.reqAut
                        })
                        $scope.limpiarProductoServicio();
                        return true;
                    }
                });
            }

        }

        $scope.quitarProductoServicio = function (index) {
            $scope.listServicios.splice(index, 1);
            setTimeout(() => { $scope.$apply(); }, 500);
        }

        $scope.limpiarProductoServicio = function () {
            $scope.pqrServicios.listProductos = [];
            $scope.pqrServicios.buscarProducto = '';
            $scope.pqrServicios.codProducto = '';
            $scope.pqrServicios.nomProducto = '';
            $scope.pqrServicios.reqAut = 'N';
            //
            $scope.pqrServicios.mostrarSubclase = '';
            $scope.pqrServicios.listProductosSubclase = [];
            $scope.pqrServicios.buscarProductoSubclase = '';
            $scope.pqrServicios.codProductoSubclase = '';
            $scope.pqrServicios.nomProductoSubclase = '';
            //
            setTimeout(() => { $scope.$apply(); }, 500);
        }

        $scope.guardarProductoServicio = function (numeroPQR) {
            if ($scope.listServicios.length > 0) {
                // console.log($scope.listServicios);
                var data = [];
                $scope.listServicios.forEach(e => {
                    console.log()
                    data.push({
                        CODIGO: e.COD_PRODUCTO,
                        CODIGO_SUBCLASE: e.COD_SUBCLASE ? e.COD_SUBCLASE : '0',
                        REQ_AUT: e.REQUIEREAUT,
                        REQ_AUT_GEST: e.xxx,
                        NUM_AUT: '',
                        UBI_AUT: '',
                        SERV_PGP: '',
                        FECHA_PRESTACION: '',
                    })
                });

                $http({
                    method: 'POST',
                    url: "php/siau/pqr/Rpqr.php",
                    data: {
                        function: "p_insertar_productos_pqr",
                        productos: JSON.stringify(data),
                        cantidad: data.length,
                        numeroPQR: numeroPQR,
                        responsable: $scope.cedulausuario,
                        gestion: 'I'
                    }
                }).then(function ({ data }) {
                    console.log(data)
                    // if (data && data.toString().substr(0, 3) != '<br') {
                    //   // if (data.Codigo == 0) {

                    //   // }
                    // } else {
                    //   swal("Mensaje", data, "warning").catch(swal.noop);
                    // }
                })
            }
        }
        /////////////// XSERVICIOS ///////////////
        /////////////// XSERVICIOS ///////////////
        /////////////// XSERVICIOS ///////////////
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

