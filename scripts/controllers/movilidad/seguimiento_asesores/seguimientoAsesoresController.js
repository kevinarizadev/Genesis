'use strict';
angular.module('GenesisApp')
    .controller('seguimientoAsesoresController', ['$scope', 'consultaHTTP', 'notification', '$timeout', '$rootScope', '$http', '$window', 'ngDialog',
        function ($scope, consultaHTTP, notification, $timeout, $rootScope, $http, $window, ngDialog) {

            $(document).ready(function () {
                $('#modalConsultaAfiliacion').modal();
                $('#modalConsultaEmpresas').modal();

                //variables de control
                $scope.tabI = true;
                $scope.tabII = false;
                // $scope.tabIII = false;
                // $scope.tabIV = false;
                $scope.activeI = 'active final white-text';
                $scope.activeII = 'none';
                // $scope.activeIII = 'none';
                // $scope.activeIV = 'none';
                $scope.activeIcolor = 'foot4';
                $scope.activeIIcolor = '';
                // $scope.activeIIIcolor = '';
                // $scope.activeIVcolor = '';
                $scope.Fecha = '';
                $scope.codigo_asesor = '';
                $scope.tipo_doc_usuario = '';
                $scope.doc_usuario = '';
                $scope.tipo_doc_empresa = '';
                $scope.codigo_empresa = '';
                $scope.observacion = ''; dteFechaConsultaAfiliacion
                $scope.dteFechaConsultaAfiliacion = '';
                $scope.cod_asesor = '';

                $scope.dteFechaEmpresas = '';
                $scope.codigo_asesor_empresas = '';
                $scope.tdoc_empresa = '';
                $scope.cod_empresas = '';
                $scope.observacion_empresas = '';
                $scope.dteFechaConsultaEmpresas = '';
                $scope.cod_asesor_empresas = '';
                $scope.hdeTablaAfiliacion = true;
                $scope.hdeInfoAfiliado = true;
                $scope.hdeInfoEmpresa = true;
                $scope.hdeInfoEmpresaAfiliacion = true;
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();
                dd < 10 ? dd = '0' + dd : dd = dd;
                mm < 10 ? mm = '0' + mm : mm = mm;
                today = dd + '/' + mm + '/' + yyyy;
                $("#dteFecha").val(today);
                $("#dteFechaEmpresas").val(today);
                //$scope.tipo_doc_usuario = 'CC';
                $scope.tipo_doc_empresa = 'N';
                $scope.tdoc_empresa = 'N';
                $("#dteFechaConsultaAfiliacion").val(today);
                $scope.dteFechaConsultaAfiliacion = $("#dteFechaConsultaAfiliacion").val(today);
                $("#dteFechaConsultaEmpresas").val(today);
                $scope.dteFechaConsultaEmpresas = $("#dteFechaConsultaEmpresas").val(today);
                
                
                $.getJSON("php/obtenersession.php").done(function (respuesta) {
                    $scope.sesdata = respuesta;
                    $scope.cedulalog = $scope.sesdata.cedula;
                    $scope.codigo_asesor = $scope.cedulalog;
                    $scope.cod_asesor = $scope.cedulalog;
                    $scope.codigo_asesor_empresas = $scope.cedulalog;
                    $scope.cod_asesor_empresas = $scope.cedulalog;
                    $scope.ubicacionlog = $scope.sesdata.codmunicipio;
                })
                $scope.tipodocumento = {
                    "Documento":
                        [
                        {
                            "Codigo": "CC",
                            "Nombre": "CEDULA DE CIUDADANÍA"
                        },
                        {
                            "Codigo": "TI",
                            "Nombre": "TARJETA DE IDENTIDAD"
                        },
                        {
                            "Codigo": "RC",
                            "Nombre": "REGISTRO CIVIL"
                        },
                        {
                            "Codigo": "CN",
                            "Nombre": "CERTIFICADO NACIDO VIVO"
                        },
                        {
                            "Codigo": "CE",
                            "Nombre": "CEDULA DE EXTRANJERÍA"
                        },
                        {
                            "Codigo": "PA",
                            "Nombre": "PASAPORTE"
                        },
                        {
                            "Codigo": "PE",
                            "Nombre": "PERMISO ESPECIAL DE PERMANENCIA"
                        },
                        {
                            "Codigo": "AS",
                            "Nombre": "ADULTO SIN IDENTIFICACIÓN"
                        },
                        {
                            "Codigo": "MS",
                            "Nombre": "MENOR SIN IDENTIFICACIÓN"
                        },
                        {
                            "Codigo": "SC",
                            "Nombre": "SALVO CONDUCTO"
                        }
                        ]
                }
            });

            //LISTA TIPOS DE OBSERVACION
            $scope.listaTiposObservacion = function () {
                $http({
                    method: 'POST',
                    url: "php/movilidad/seguimiento_asesores/funcseguimiento.php",
                    data: {
                        function: 'listaTiposObservacion'
                    }
                }).then(function (response) {
                    $scope.tiposObservacion = response.data;
                });
            }
            $scope.listaTiposObservacion();

            // $scope.setNombreAfil = function (tipo) {
            //     $http({
            //         method: 'POST',
            //         url: "php/movilidad/seguimiento_asesores/funcseguimiento.php",
            //         data: {
            //             function: 'lista_datos_afiliado',
            //             documento: $scope.doc_usuario,
            //             doc_empresa: $scope.cod_empresas,
            //             tipo: tipo
            //         }
            //     }).then(function (response) {
            //         if (response.data == 'null') {
            //             swal({
            //                 title: 'Importante!',
            //                 text: 'El afiliado no existe en nuestra base de datos.',
            //                 type: 'info',
            //                 confirmButtonText: 'Cerrar',
            //                 confirmButtonColor: '#174791'
            //             });
            //             $scope.hdeInfoAfiliado = true;
            //             $scope.pnombre_usuario = "";
            //             $scope.snombre_usuario = "";
            //             $scope.papellido_usuario = "";
            //             $scope.sapellido_usuario = "";
            //         } else {
            //             $scope.hdeInfoAfiliado = false;
            //             $scope.pnombre_usuario = response.data.PRIMER_NOMBRE;
            //             $scope.snombre_usuario = response.data.SEGUNDO_NOMBRE;
            //             $scope.papellido_usuario = response.data.PRIMER_APELLIDO;
            //             $scope.sapellido_usuario = response.data.SEGUNDO_APELLIDO;

            //         }
            //     });
            // }

            $scope.setNombreAfil = function (tipo) {
                if ($scope.tabI == true) {
                    $scope.codigo_empresa_validado = $scope.codigo_empresa;
                }else{
                    $scope.codigo_empresa_validado = $scope.cod_empresas;
                }
                console.log($scope.tabI);
                $http({
                    method: 'POST',
                    url: "php/movilidad/seguimiento_asesores/funcseguimiento.php",
                    data: {
                        function: 'lista_datos_afiliado',
                        documento: $scope.doc_usuario,
                        doc_empresa: $scope.codigo_empresa_validado,
                        tipo: tipo
                    }
                }).then(function (response) {
                    if (response.data == 'null') {
                        if (tipo == 'A') {
                            swal({
                                title: 'Importante!',
                                text: 'El afiliado no existe en nuestra base de datos.',
                                type: 'info',
                                confirmButtonText: 'Cerrar',
                                confirmButtonColor: '#174791'
                            });
                            $scope.hdeInfoAfiliado = true;
                            $scope.pnombre_usuario = "";
                            $scope.snombre_usuario = "";
                            $scope.papellido_usuario = "";
                            $scope.sapellido_usuario = "";
                        }else{
                            swal({
                                title: 'Confirmar Proceso',
                                html: 'El aportante no existe en nuestra base de datos. ¿Qué desea hacer?',
                                type: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Registrar',
                                cancelButtonText: 'Cancelar'
                            }).then((result) => {
                                if (result == true) {
                                    // console.log(result);
                                    if ($scope.tabI == true) {
                                        $scope.hdeInfoEmpresaAfiliacion = false;
                                        $scope.nombre_empresa_afiliacion = "";
                                        document.getElementById('nombre_empresa_afiliacion').disabled = false;
                                        $scope.$apply();
                                    }else{
                                        $scope.hdeInfoEmpresa = false;
                                        $scope.nombre_empresa = "";
                                        document.getElementById('nombre_empresa').disabled = false;
                                        $scope.$apply();
                                    }
                                }
                            }).catch((result) => {
                                if (result == "cancel") {
                                    // console.log(result);
                                    if ($scope.tabI == true) {
                                        $scope.hdeInfoEmpresaAfiliacion = true;
                                        $scope.nombre_empresa_afiliacion = "";
                                        document.getElementById('nombre_empresa_afiliacion').disabled = true;
                                        $scope.$apply();
                                    } else {
                                        $scope.hdeInfoEmpresa = true;
                                        $scope.nombre_empresa = "";
                                        document.getElementById('nombre_empresa').disabled = true;
                                        $scope.$apply(); 
                                    }
                                }
                            });
                        }
                    } else {
                        if (tipo == 'E') {
                            if ($scope.tabI == true) {
                                $scope.hdeInfoEmpresaAfiliacion = false;
                                $scope.nombre_empresa_afiliacion = response.data.RAZON_SOCIAL;
                                document.getElementById('nombre_empresa_afiliacion').disabled = true;
                            } else {
                                $scope.hdeInfoEmpresa = false;
                                $scope.nombre_empresa = response.data.RAZON_SOCIAL;
                                document.getElementById('nombre_empresa').disabled = true;
                            }
                        }
                        if (tipo == 'A') {
                            $scope.hdeInfoAfiliado = false;
                            $scope.pnombre_usuario = response.data.PRIMER_NOMBRE;
                            $scope.snombre_usuario = response.data.SEGUNDO_NOMBRE;
                            $scope.papellido_usuario = response.data.PRIMER_APELLIDO;
                            $scope.sapellido_usuario = response.data.SEGUNDO_APELLIDO;
                        }
                    }
                });
            }

            // funciones de control
            $scope.init = function () {
                $scope.tabI = true;
                $scope.tabII = false;
                // $scope.tabIII = false;
                // $scope.tabIV = false;
                $scope.activeI = 'active final';
                $scope.activeII = 'none';
                // $scope.activeIII = 'none';
                // $scope.activeIV = 'none';
                $scope.activeIcolor = '';
                $scope.activeIIcolor = '';
                // $scope.activeIIIcolor = '';
                // $scope.activeIVcolor = '';
                $scope.hdeTablaAfiliacion = true;
                // $scope.dteFechaConsultaAfiliacion = '';
                // $scope.cod_asesor = '';
                // $("#dteFechaConsultaAfiliacion").val('');
            }

            $scope.setTab = function (opcion) {
                $scope.init();
                switch (opcion) {
                    case 1:
                        $scope.tabI = true;
                        $scope.tabII = false;
                        $scope.tabIII = false;
                        $scope.tabIV = false;
                        $scope.activeI = 'active final white-text';
                        $scope.activeII = 'none';
                        $scope.activeIII = 'none';
                        $scope.activeIV = 'none';
                        $scope.activeIcolor = 'foot4';
                        $scope.nametab = 'Autorización';
                        $scope.tipoaut = '1';
                        break;
                    case 2:
                        $scope.tabI = false;
                        $scope.tabII = true;
                        $scope.tabIII = false;
                        $scope.tabIV = false;
                        $scope.activeI = 'none';
                        $scope.activeII = 'active final white-text';
                        $scope.activeIII = 'none';
                        $scope.activeIV = 'none';
                        $scope.activeIIcolor = 'foot4';
                        $scope.nametab = 'Autorización Programada';
                        $scope.tipoaut = '2';
                        break;
                    case 3:
                        $scope.tabI = false;
                        $scope.tabII = false;
                        $scope.tabIII = true;
                        $scope.tabIV = false;
                        $scope.activeI = 'none';
                        $scope.activeII = 'none';
                        $scope.activeIII = 'active final white-text';
                        $scope.activeIV = 'none';
                        $scope.activeIIIcolor = 'foot4';
                        $scope.nametab = 'Productos';
                        break;
                    case 4:
                        $scope.tabI = false;
                        $scope.tabII = false;
                        $scope.tabIII = false;
                        $scope.tabIV = true;
                        $scope.activeI = 'none';
                        $scope.activeII = 'none';
                        $scope.activeIII = 'none';
                        $scope.activeIVcolor = 'foot4';
                        $scope.activeIV = 'active final white-text';
                        $scope.nametab = 'Consulta de Autorización';
                        $scope.tipoaut = '4';
                        break;
                    default:
                }
            }

            $("#dteFecha").kendoDatePicker({
                format: "dd/MM/yyyy",
                culture: "es-MX",
                max: new Date(),
            });

            $("#dteFechaEmpresas").kendoDatePicker({
                format: "dd/MM/yyyy",
                culture: "es-MX",
                max: new Date(),
            });

            $("#dteFechaConsultaAfiliacion").kendoDatePicker({
                format: "dd/MM/yyyy",
                culture: "es-MX",
                max: new Date(),
            }); 
            
            $("#dteFechaConsultaEmpresas").kendoDatePicker({
                format: "dd/MM/yyyy",
                culture: "es-MX",
                max: new Date(),
            });
            
            $scope.registraFormulario = function(tipo){
                switch (tipo) {
                    case 'afiliacion':
                        if ($("#dteFecha").val() == "" || $("#dteFecha").val() == undefined || $scope.codigo_asesor == "" || $scope.codigo_asesor == undefined
                            || $scope.tipo_doc_usuario == "" || $scope.tipo_doc_usuario == undefined || $scope.doc_usuario == "" || $scope.doc_usuario == undefined
                            || $scope.tipo_doc_empresa == "" || $scope.tipo_doc_empresa == undefined || $scope.codigo_empresa == "" || $scope.codigo_empresa == undefined
                            || $scope.observacion == "" || $scope.observacion == undefined) {
                            swal({
                                title: 'Importante!',
                                text: 'Por favor digite todos los campos.',
                                type: 'info',
                                confirmButtonText: 'Cerrar',
                                confirmButtonColor: '#174791'
                            });
                        } else {
                            swal({
                                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                                width: 200,
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                showConfirmButton: false,
                                animation: false
                            });
                            $http({
                                method: 'POST',
                                url: "php/movilidad/seguimiento_asesores/funcseguimiento.php",
                                data: {
                                    function: 'guardarAfiliacion',
                                    fecha: $("#dteFecha").val(),
                                    codigo_asesor: $scope.codigo_asesor,
                                    tipo_doc_usuario: $scope.tipo_doc_usuario,
                                    doc_usuario: $scope.doc_usuario,
                                    tipo_doc_empresa: $scope.tipo_doc_empresa,
                                    codigo_empresa: $scope.codigo_empresa,
                                    nombre_empresa: $scope.nombre_empresa_afiliacion,
                                    observacion: $scope.observacion,
                                    tipo_proceso: 'A',
                                    responsable: $scope.sesdata.cedula,
                                    ubi_responsable: $scope.sesdata.codmunicipio
                                }
                            }).then(function (response) {
                                // $scope.dataAfiliacion = response.data;
                                if (response.data.codigo == "0") {
                                    swal('Completado', response.data.mensaje, 'success')
                                    $scope.tipo_doc_usuario = '';
                                    $scope.doc_usuario = '';
                                    $scope.hdeInfoAfiliado = true;
                                    $scope.pnombre_usuario = '';
                                    $scope.snombre_usuario = '';
                                    $scope.papellido_usuario = '';
                                    $scope.sapellido_usuario = '';
                                    $scope.tipo_doc_usuario = 'CC';
                                    $scope.tipo_doc_empresa = 'N';
                                    $scope.codigo_empresa = '';
                                    $scope.observacion = '';
                                    $scope.hdeInfoEmpresaAfiliacion = true;
                                    $scope.nombre_empresa_afiliacion = "";
                                    document.getElementById('nombre_empresa_afiliacion').disabled = true;
                                } else {
                                    swal('Error', response.data.mensaje, 'error');
                                    // $scope.limpiarDatos();
                                }
                            });
                        }
                    break;
                    case 'empresas':
                        if ($("#dteFechaEmpresas").val() == "" || $("#dteFechaEmpresas").val() == undefined || $scope.codigo_asesor_empresas == "" || $scope.codigo_asesor_empresas == undefined
                            || $scope.tdoc_empresa == "" || $scope.tdoc_empresa == undefined || $scope.cod_empresas == "" || $scope.cod_empresas == undefined
                            || $scope.observacion_empresas == "" || $scope.observacion_empresas == undefined) {
                            swal({
                                title: 'Importante!',
                                text: 'Por favor digite todos los campos.',
                                type: 'info',
                                confirmButtonText: 'Cerrar',
                                confirmButtonColor: '#174791'
                            });
                        } else {
                            swal({
                                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                                width: 200,
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                showConfirmButton: false,
                                animation: false
                            });
                            $http({
                                method: 'POST',
                                url: "php/movilidad/seguimiento_asesores/funcseguimiento.php",
                                data: {
                                    function: 'guardarAfiliacion',
                                    fecha: $("#dteFechaEmpresas").val(),
                                    codigo_asesor: $scope.codigo_asesor_empresas,
                                    tipo_doc_usuario: '',
                                    doc_usuario: '',
                                    tipo_doc_empresa: $scope.tdoc_empresa,
                                    codigo_empresa: $scope.cod_empresas,
                                    nombre_empresa: $scope.nombre_empresa,
                                    observacion: $scope.observacion_empresas,
                                    tipo_proceso: 'E',
                                    responsable: $scope.sesdata.cedula,
                                    ubi_responsable: $scope.sesdata.codmunicipio
                                }
                            }).then(function (response) {
                                // $scope.dataAfiliacion = response.data;
                                if (response.data.codigo == "0") {
                                    swal('Completado', response.data.mensaje, 'success');
                                    $scope.tdoc_empresa = 'N';
                                    $scope.cod_empresas = '';
                                    $scope.observacion_empresas = '';
                                    $scope.hdeInfoEmpresa = true;
                                    $scope.nombre_empresa = "";
                                    document.getElementById('nombre_empresa').disabled = true;
                                } else {
                                    swal('Error', response.data.mensaje, 'error');
                                    // $scope.limpiarDatos();
                                }
                            });
                        }
                    break;
                }
                
            }

            $scope.consultarAfiliacion = function (tipo) {
                switch (tipo) {
                    case 'afiliacion':
                        if ($("#dteFechaConsultaAfiliacion").val() == "" || $("#dteFechaConsultaAfiliacion").val() == undefined
                            || $scope.cod_asesor == "" || $scope.cod_asesor == undefined) {
                            swal({
                                title: 'Importante!',
                                text: 'Por favor digite todos los campos.',
                                type: 'info',
                                confirmButtonText: 'Cerrar',
                                confirmButtonColor: '#174791'
                            });
                        } else {
                            // swal({
                            //     html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                            //     width: 200,
                            //     allowOutsideClick: false,
                            //     allowEscapeKey: false,
                            //     showConfirmButton: false,
                            //     animation: false
                            // });
                            // $http({
                            //     method: 'POST',
                            //     url: "php/movilidad/seguimiento_asesores/funcseguimiento.php",
                            //     data: {
                            //         function: 'consultarAfiliacion',
                            //         fecha: $("#dteFechaConsultaAfiliacion").val(),
                            //         codigo_asesor: $scope.cod_asesor,
                            //         tipo_proceso: 'A'
                            //     }
                            // }).then(function (response) {
                            //     $scope.dataRegistros = response.data;
                            //     $scope.totalFormularios = $scope.dataRegistros.length;
                            //     if (response.data.codigo == "1") {
                            //         swal('Error', response.data.mensaje, 'error');
                            //         swal.close();
                            //     } else {
                            //         swal.close();
                            //         $scope.hdeTablaAfiliacion = false;
                            //     }
                            // });
                            $scope.hdeTablaAfiliacion = false;
                            $.ajax({
                                type: 'GET',
                                url: 'php/movilidad/seguimiento_asesores/listFormularios.php?fecha=' + $("#dteFechaConsultaAfiliacion").val() + '&codigo_asesor=' + $scope.cod_asesor + '&tipo_proceso=' + 'A',
                                contentType: 'application/json',
                                dataType: 'json',
                                success: function (response) {
                                    $scope.table_config = {
                                        "scrollX": true,
                                        columns: [
                                            { data: "ubi_nombre" },
                                            { data: "fecha" },
                                            { data: "num_formulario" },
                                            { data: "tipo_id_usuario" },
                                            { data: "id_usuario" },
                                            { data: "primer_apellido" },
                                            { data: "segundo_apellido" },
                                            { data: "primer_nombre" },
                                            { data: "segundo_nombre" },
                                            { data: "tipo_cod_empresa" },
                                            { data: "cod_empresa" },
                                            { data: "num_paquete" },
                                            { data: "codigo_asesor" },
                                            { data: "observacion" },
                                            { data: "causal_devolucion" },
                                            { data: "observacion_devolucion" }
                                        ],
                                        columnDefs: [
                                            {
                                                "targets": [11],
                                                "visible": false,
                                                "searchable": false
                                            },
                                            {
                                                "targets": [14],
                                                "visible": false,
                                                "searchable": false
                                            },
                                            {
                                                "targets": [15],
                                                "visible": false,
                                                "searchable": false
                                            }
                                        ],
                                    };
                                    //var table = $('#tblSolicitudes').DataTable($scope.table_config);
                                    $scope.listFormulariosAfiliacion.clear();
                                    $scope.listFormulariosAfiliacion.rows.add(response);
                                    $scope.listFormulariosAfiliacion.draw();
                                }
                            });
                        }
                    break;
                    case 'empresas':
                        if ($("#dteFechaConsultaEmpresas").val() == "" || $("#dteFechaConsultaEmpresas").val() == undefined
                            || $scope.cod_asesor_empresas == "" || $scope.cod_asesor_empresas == undefined) {
                            swal({
                                title: 'Importante!',
                                text: 'Por favor digite todos los campos.',
                                type: 'info',
                                confirmButtonText: 'Cerrar',
                                confirmButtonColor: '#174791'
                            });
                        } else {
                            // swal({
                            //     html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                            //     width: 200,
                            //     allowOutsideClick: false,
                            //     allowEscapeKey: false,
                            //     showConfirmButton: false,
                            //     animation: false
                            // });
                            // $http({
                            //     method: 'POST',
                            //     url: "php/movilidad/seguimiento_asesores/funcseguimiento.php",
                            //     data: {
                            //         function: 'consultarAfiliacion',
                            //         fecha: $("#dteFechaConsultaEmpresas").val(),
                            //         codigo_asesor: $scope.cod_asesor_empresas,
                            //         tipo_proceso: 'E'
                            //     }
                            // }).then(function (response) {
                            //     $scope.dataRegistros = response.data;
                            //     $scope.totalFormularios = $scope.dataRegistros.length;
                            //     if (response.data.codigo == "1") {
                            //         swal('Error', response.data.mensaje, 'error');
                            //         swal.close();
                            //     } else {
                            //         swal.close();
                            //         $scope.hdeTablaAfiliacion = false;
                            //     }
                            // });
                            $scope.hdeTablaAfiliacion = false;
                            $.ajax({
                                type: 'GET',
                                url: 'php/movilidad/seguimiento_asesores/listFormularios.php?fecha=' + $("#dteFechaConsultaEmpresas").val() + '&codigo_asesor=' + $scope.cod_asesor_empresas + '&tipo_proceso=' + 'E',
                                contentType: 'application/json',
                                dataType: 'json',
                                success: function (response) {
                                    $scope.table_config = {
                                        "scrollX": true,
                                        columns: [
                                            { data: "ubi_nombre" },
                                            { data: "fecha" },
                                            { data: "num_formulario" },
                                            { data: "tipo_cod_empresa" },
                                            { data: "cod_empresa" },
                                            { data: "codigo_asesor" },
                                            { data: "observacion" }
                                        ]
                                    };
                                    $scope.listFormulariosEmpresas.clear();
                                    $scope.listFormulariosEmpresas.rows.add(response);
                                    $scope.listFormulariosEmpresas.draw();
                                }
                            });
                        }
                    break;
                    default:
                    break;
                }
            }

            $scope.listFormulariosAfiliacion = $('#tblFormulariosAfiliacion').DataTable({
                dom: 'lBsfrtip',
                "scrollX": true,
                buttons: ['excel', { extend: 'print', text: 'Imprimir' }],
                ajax: {
                    url: 'php/movilidad/seguimiento_asesores/listFormularios.php?fecha=' + $("#dteFechaConsultaAfiliacion").val() + '&codigo_asesor=' + $scope.cod_asesor + '&tipo_proceso=' + 'A',
                    dataSrc: ''
                },
                columns: [
                    { data: "ubi_nombre" },
                    { data: "fecha" },
                    { data: "num_formulario" },
                    { data: "tipo_id_usuario" },
                    { data: "id_usuario" },
                    { data: "primer_apellido" },
                    { data: "segundo_apellido" },
                    { data: "primer_nombre" },
                    { data: "segundo_nombre" },
                    { data: "tipo_cod_empresa" },
                    { data: "cod_empresa" },
                    { data: "num_paquete" },
                    { data: "codigo_asesor" },
                    { data: "observacion" },
                    { data: "causal_devolucion" },
                    { data: "observacion_devolucion" }
                ],
                columnDefs: [
                    {
                        "targets": [11],
                        "visible": false,
                        "searchable": false
                    },
                    {
                        "targets": [14],
                        "visible": false,
                        "searchable": false
                    },
                    {
                        "targets": [15],
                        "visible": false,
                        "searchable": false
                    }
                ],
                language: {
                    "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                },
                lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todas']],
                order: [[4, "desc"]]
            });

            $scope.listFormulariosEmpresas = $('#tblFormulariosEmpresas').DataTable({
                dom: 'lBsfrtip',
                "scrollX": true,
                buttons: ['excel', { extend: 'print', text: 'Imprimir' }],
                ajax: {
                    url: 'php/movilidad/seguimiento_asesores/listFormularios.php?fecha=' + $("#dteFechaConsultaEmpresas").val() + '&codigo_asesor=' + $scope.cod_asesor_empresas + '&tipo_proceso=' + 'E',
                    dataSrc: ''
                },
                columns: [
                    { data: "ubi_nombre" },
                    { data: "fecha" },
                    { data: "num_formulario" },
                    { data: "tipo_cod_empresa" },
                    { data: "cod_empresa" },
                    { data: "codigo_asesor" },
                    { data: "observacion" }
                ],
                language: {
                    "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                },
                lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todas']],
                order: [[4, "desc"]]
            });

            $scope.openmodal = function (tipo) {
                switch (tipo) {
                    case 'afiliacion':
                        $("#modalConsultaAfiliacion").modal("open");
                        // $("#dteFechaConsultaAfiliacion").val(today);
                        // $scope.dteFechaConsultaAfiliacion = $("#dteFechaConsultaAfiliacion").val(today);
                        // $scope.cod_asesor = $scope.cedulalog;
                        $scope.hdeTablaAfiliacion = true;
                    break;
                    case 'empresas':
                        $("#modalConsultaEmpresas").modal("open");
                        // $("#dteFechaConsultaEmpresas").val(today);
                        // $scope.dteFechaConsultaEmpresas = $("#dteFechaConsultaEmpresas").val(today);
                        // $scope.cod_asesor_empresas = $scope.cedulalog;
                        $scope.hdeTablaAfiliacion = true;
                    break;
                    default:
                }
            }

            $scope.closemodals = function (tipo) {
                switch (tipo) {
                    case 'afiliacion':
                        $("#modalConsultaAfiliacion").modal("close");
                        break;
                    case 'empresas':
                        $("#modalConsultaEmpresas").modal("close");
                        break;
                    default:
                }
            }
            
            $scope.imprimirInforme = function (tipo) {
                switch (tipo) {
                    case 'afiliacion':
                        window.open('views/movilidad/seguimiento_asesores/informeMatriz.php?fecha=' + $("#dteFechaConsultaAfiliacion").val() + '&cod_asesor=' + $scope.cod_asesor + '&tipo_proceso=' + 'A', '_blank', "width=1080,height=500");
                        break;
                    case 'empresas':
                        window.open('views/movilidad/seguimiento_asesores/informeMatriz.php?fecha=' + $("#dteFechaConsultaEmpresas").val() + '&cod_asesor=' + $scope.cod_asesor_empresas + '&tipo_proceso=' + 'E', '_blank', "width=1080,height=500");
                        break;
                    default:
                }
            }

            $scope.Obtener_Tipos_Documentos = function () {
                $http({
                  method: 'POST',
                  url: "php/genesis/funcgenesis.php",
                  data: {
                    function: 'Obtener_Tipos_Documentos',
                    Tipo: 'S'
                  }
                }).then(function (response) {
                  if (response.data && response.data.toString().substr(0, 3) != '<br') {
                    $scope.Tipos_Documentos = response.data;
                    $scope.tipo_doc_usuario = 'CC';
                  } else {
                    swal({
                      title: "¡Ocurrio un error!",
                      text: response.data,
                      type: "warning"
                    }).catch(swal.noop);
                  }
                });
            }
            $scope.Obtener_Tipos_Documentos();
        }
    ]);