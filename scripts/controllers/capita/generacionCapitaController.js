'use strict';
angular.module('GenesisApp')
.controller('generacionCapitaController', ['$scope', 'consultaHTTP', 'notification', '$timeout', '$rootScope', '$http', '$window', 'ngDialog',
function ($scope, consultaHTTP, notification, $timeout, $rootScope, $http, $window, ngDialog) {
    
    $(document).ready(function () {
        $('.tabs').tabs();
        document.querySelector("#tab_1").focus();
        $scope.tabs = {
            select: 1
        };
        $scope.seleccionar = function (tab_numer) {
            $scope.tabs.select = tab_numer;
            switch (tab_numer) {
                case 1:
        
                break;
                case 2:
                setTimeout(() => {
                    document.querySelector("#capita_subsidiado").focus();
                }, 100);
                break;
                case 3:
                setTimeout(() => {
                    document.querySelector("#capita_contributivo").focus();
                }, 100);
                break;
                case 4:
        
                break;
                case 5:
        
                break;
                case 6:
        
                break;
            }
        };
        $scope.hdeTablaRC = false;
        $scope.hdeTablaRS = false;
        $scope.hdeTablaInformePreliminarRC = true;
        $scope.hdeTablaInformePreliminarRS = true;
        $scope.textPreliminar = true;
        $scope.btnVerInforme = true;
        $scope.dsb= {
            dsbBtnConsolidarRC : false,
            dsbBtnConsolidarRS : false
        }
        
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        dd < 10 ? dd = '0' + dd : dd = dd;
        mm < 10 ? mm = '0' + mm : mm = mm;
        today = dd + '/' + mm + '/' + yyyy;

        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        // $http({
        //     method: 'POST',
        //     url: "php/capita/funccapita.php",
        //     data: {
        //         function: 'validaUsuario',
        //     }
        // }).then(function (response) {
            // $scope.dataAfiliacion = response.data;
            // if (response.data.codigo == "0") {
                // if (response.data.mensaje == 'C') {
                    // $scope.hdeTablaRS = true;
                    // $scope.hdeTablaRC = false;
                    $scope.listInconsistentesRCCapita = $('#tblInconsistentesRCCapita').DataTable({
                        dom: 'lBsfrtip',
                        "scrollX": true,
                        buttons: ['excel', 'reload'],
                        ajax: {
                            url: 'php/capita/listgeneracioncapita.php?funcion=' + 'inconsistentesRC',
                            dataSrc: ''
                        },
                        columns: [
                            { data: "AFIC_TIPO_DOCUMENTO" },
                            { data: "AFIC_DOCUMENTO" },
                            { data: "AFIN_UBICACION_GEOGRAFICA" },
                            { data: "AFIF_AFILIACION" },
                            { data: "ACPC_DOCUMENTO" }
                        ],
                        language: {
                            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                        },
                        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todas']],
                        order: [[4, "desc"]]
                    });
                    setTimeout(function () {
                        $scope.lengthTable = $scope.listInconsistentesRCCapita.data().count();
                        if ($scope.lengthTable > 0) {
                            $scope.dsb.dsbBtnConsolidarRC = true;
                            $scope.hdeTablaInformePreliminarRC = true;
                            $scope.textPreliminar = true;
                            $scope.$apply();
                        } else {
                            $scope.dsb.dsbBtnConsolidarRC = false;
                            $scope.generarInforme('RC');
                            $scope.$apply();
                        }
                        swal.close();
                    }, 10000);
                // }
                // if (response.data.mensaje == 'S') {
                    // $scope.hdeTablaRS = false;
                    // $scope.hdeTablaRC = true;
                    $scope.listInconsistentesRSCapita = $('#tblInconsistentesRSCapita').DataTable({
                        dom: 'lBsfrtip',
                        "scrollX": true,
                        buttons: ['excel', 'reload'],
                        ajax: {
                            url: 'php/capita/listgeneracioncapita.php?funcion=' + 'inconsistentesRS',
                            dataSrc: ''
                        },
                        columns: [
                            { data: "TIPO_DOC" },
                            { data: "DOCUMENTO" },
                            { data: "COD_UBICACION" },
                            { data: "AFILIACION" },
                            { data: "PORTABILIDAD" },
                            { data: "UBICACION_ACTUAL" },
                            { data: "INCONSISTENCIA" }
                        ],
                        language: {
                            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                        },
                        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todas']],
                        // order: [[4, "desc"]]
                    });                    
                    //     $scope.lengthTable = $scope.listInconsistentesRSCapita.data().count();
                    // setTimeout(function(){
                    //     while ($scope.lengthTable > 0) {
                    //         console.log($scope.lengthTable);
                    //       if ($scope.lengthTable > 0) {
                    //         $scope.dsb.dsbBtnConsolidar = true;
                    //         $scope.$apply();
                    //     } else {
                    //         $scope.dsb.dsbBtnConsolidar = false;
                    //         $scope.generarInforme('RS');
                    //         $scope.$apply();
                    //     }
                    //     }
                    // },500);
                    setTimeout(function () {
                        $scope.lengthTable = $scope.listInconsistentesRSCapita.data().count();
                        if ($scope.lengthTable > 0) {
                            $scope.dsb.dsbBtnConsolidarRS = true;
                            $scope.$apply();
                        } else {
                            $scope.dsb.dsbBtnConsolidarRS = false;
                            $scope.generarInforme('RS');
                            $scope.$apply();
                        }
                        swal.close();
                    }, 30000);
                // }
                // if (response.data.mensaje == 'X') {
                //     $scope.hdeTablaRS = false;
                //     $scope.hdeTablaRC = false;
                //     //CONTRIBUTIVO
                //     $scope.listInconsistentesRCCapita = $('#tblInconsistentesRCCapita').DataTable({
                //         dom: 'lBsfrtip',
                //         "scrollX": true,
                //         buttons: ['excel', 'reload'],
                //         ajax: {
                //             url: 'php/capita/listgeneracioncapita.php?funcion=' + 'inconsistentesRC',
                //             dataSrc: ''
                //         },
                //         columns: [
                //             { data: "AFIC_TIPO_DOCUMENTO" },
                //             { data: "AFIC_DOCUMENTO" },
                //             { data: "AFIN_UBICACION_GEOGRAFICA" },
                //             { data: "AFIF_AFILIACION" },
                //             { data: "ACPC_DOCUMENTO" }
                //         ],
                //         language: {
                //             "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                //         },
                //         lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todas']],
                //         order: [[4, "desc"]]
                //     });
                //     setTimeout(function () {
                //         $scope.lengthTable = $scope.listInconsistentesRCCapita.data().count();
                //         if ($scope.lengthTable > 0) {
                //             $scope.dsb.dsbBtnConsolidarRC = true;
                //             $scope.hdeTablaInformePreliminarRC = true;
                //             $scope.textPreliminar = true;
                //             $scope.$apply();
                //         } else {
                //             $scope.dsb.dsbBtnConsolidarRC = false;
                //             $scope.generarInforme('RC');
                //             $scope.$apply();
                //         }
                //         swal.close();
                //     }, 10000);
                //     //SUBSIDIADO
                //     $scope.listInconsistentesRSCapita = $('#tblInconsistentesRSCapita').DataTable({
                //         dom: 'lBsfrtip',
                //         "scrollX": true,
                //         buttons: ['excel', 'reload'],
                //         ajax: {
                //             url: 'php/capita/listgeneracioncapita.php?funcion=' + 'inconsistentesRS',
                //             dataSrc: ''
                //         },
                //         columns: [
                //             { data: "TIPO_DOC" },
                //             { data: "DOCUMENTO" },
                //             { data: "COD_UBICACION" },
                //             { data: "AFILIACION" },
                //             { data: "PORTABILIDAD" },
                //             { data: "UBICACION_ACTUAL" },
                //             { data: "INCONSISTENCIA" }
                //         ],
                //         language: {
                //             "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                //         },
                //         lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todas']],
                //         // order: [[4, "desc"]]
                //     });       
                //     setTimeout(function () {
                //         $scope.lengthTable = $scope.listInconsistentesRSCapita.data().count();
                //         if ($scope.lengthTable > 0) {
                //             $scope.dsb.dsbBtnConsolidarRS = true;
                //             $scope.$apply();
                //         } else {
                //             $scope.dsb.dsbBtnConsolidarRS = false;
                //             $scope.generarInforme('RS');
                //             $scope.$apply();
                //         }
                //         swal.close();
                //     }, 10000);
                // }
            // } else {
            //     swal.close();
            //     swal('Error', response.data.mensaje, 'error');
            //     // $scope.limpiarDatos();
            // }
        // });
        
        $.getJSON("php/obtenersession.php").done(function (respuesta) {
            $scope.sesdata = respuesta;
            $scope.rollog = $scope.sesdata.rolcod;
        })
    });
    
    $.fn.dataTable.ext.buttons.reload = {
        text: 'Recargar',
        action: function (e, dt, node, config) {
            dt.ajax.reload();
            $scope.lengthTable = dt.data().count();
            $scope.idTabla = dt.tables().nodes().to$().attr('id');
            if ($scope.idTabla == 'tblInconsistentesRCCapita') {
                if ($scope.lengthTable > 0) {
                    $scope.dsb.dsbBtnConsolidarRC = true;
                    $scope.$apply();
                }else{
                    $scope.dsb.dsbBtnConsolidarRC = false;
                    $scope.$apply();
                }
            } else if ($scope.idTabla = 'tblInconsistentesRSCapita'){
                if ($scope.lengthTable > 0) {
                    $scope.dsb.dsbBtnConsolidarRS = true;
                    $scope.$apply();
                }else{
                    $scope.dsb.dsbBtnConsolidarRS = false;
                    $scope.$apply();
                }
            }
        }
    };
    
    $scope.generarInforme = function (tipo) {
        //console.log($scope.dataAfiliacion);
        if (tipo == 'RC') {
            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
            });

            $scope.listPreliminarRCCapita = $('#tblPreliminarRCCapita').DataTable({
                dom: 'lBsfrtip',
                "scrollX": true,
                buttons: ['excel'],
                ajax: {
                    url: 'php/capita/listgeneracioncapita.php?funcion=' + 'preliminarRC',
                    dataSrc: ''
                },
                columns: [
                    { data: "CODDEPMUN" },
                    { data: "CONTRATO" },
                    { data: "CANTIDAD" },
                    { data: "DPTO" },
                    { data: "MUNICIPIO" },
                    { data: "RUTAGENERACION" }
                ],
                language: {
                    "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                },
                lengthMenu: [[10, 20, -1], [10, 20, 'Todas']],
                // order: [[1, "desc"]]
            });

            swal.close();
            // if ($scope.dataAfiliacion.mensaje == 'X') {
            //     $scope.textPreliminar = false;
            //     $scope.hdeTablaInformePreliminarRC = false;
            //     //$scope.hdeTablaInformePreliminarRS = false;
            // }else{
                // $scope.textPreliminar = false;
                $scope.hdeTablaInformePreliminarRC = false;
                // $scope.hdeTablaInformePreliminarRS = true;
            // }
        }
        if (tipo == 'RS') {
            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
            });
            
            $scope.listPreliminarRSCapita = $('#tblPreliminarRSCapita').DataTable({
                dom: 'lBsfrtip',
                "scrollX": true,
                buttons: ['excel'],
                ajax: {
                    url: 'php/capita/listgeneracioncapita.php?funcion=' + 'preliminarRS',
                    dataSrc: ''
                },
                columns: [
                    { data: "CODDEPMUN" },
                    { data: "CONTRATO" },
                    { data: "CANTIDAD" },
                    { data: "DPTO" },
                    { data: "MUNICIPIO" },
                    { data: "RUTAGENERACION" }
                ],
                language: {
                    "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                },
                lengthMenu: [[10, 20, -1], [10, 20, 'Todas']],
                // order: [[4, "desc"]]
            });
            
            swal.close();
            // if ($scope.dataAfiliacion.mensaje == 'X') {
            //     $scope.textPreliminar = false;
            //     //$scope.hdeTablaInformePreliminarRC = false;
            //     $scope.hdeTablaInformePreliminarRS = false;
            // }else{
            //     $scope.textPreliminar = false;
            //     $scope.hdeTablaInformePreliminarRC = true;
                $scope.hdeTablaInformePreliminarRS = false;
            // }
        }
        if (tipo == 'informeRC') {
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
                url: "php/capita/funccapita.php",
                data: {
                    function: 'informeCapita',
                    regimen: 'RC'
                }
            }).then(function (response) {
                // $scope.dataAfiliacion = response.data;
                if (response.data.codigo == "0") {
                    swal('Completado', response.data.mensaje, 'success')
                    $scope.btnVerInforme = false;
                    setTimeout(function(){
                        swal.close();
                    },1000);
                } else {
                    swal('Error', response.data.mensaje, 'error');
                    $scope.btnVerInforme = true;
                    setTimeout(function () {
                        swal.close();
                    }, 1000);
                    // $scope.limpiarDatos();
                }
            });
        }
        if (tipo == 'informeRS') {
            // $('.toast').addClass('default-background-dark');
            // swal({
            //     html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            //     width: 200,
            //     allowOutsideClick: false,
            //     allowEscapeKey: false,
            //     showConfirmButton: false,
            //     animation: false
            // });
            swal('Completado','Señor usuario, se esta consolidando la información, recibira un correo cuando el procesos se encuentre terminando', 'success');
            $http({
                method: 'POST',
                url: "php/capita/funccapita.php",
                data: {
                    function: 'informeCapita',
                    regimen: 'RS'
                }
            }).then(function (response) {
                // swal('Completado','Señor usuario, se esta consolidando la información, recibira un correo cuando el procesos se encuentre terminando', 'success');
                // $scope.dataAfiliacion = response.data;
                // if (response.data.codigo == "0") {
                //     swal('Completado', response.data.mensaje, 'success');
                //     $scope.btnVerInforme = false;
                //     $scope.btnVerInforme = false;
                //     setTimeout(function () {
                //         swal.close();
                //     }, 1000);
                // } else {
                //     swal('Error', response.data.mensaje, 'error');
                //     $scope.btnVerInforme = true;
                //     $scope.btnVerInforme = false;
                //     setTimeout(function () {
                //         swal.close();
                //     }, 1000);
                //     // $scope.limpiarDatos();
                // }
            });
        }
    }
    
    $scope.generaCapita = function () {
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
            url: "php/capita/funccapita.php",
            data: {
                function: 'generaCapita',
            }
        }).then(function (response) {
            // $scope.dataAfiliacion = response.data;
            if (response.data.codigo == "0") {
                swal('Completado', response.data.mensaje, 'success')
            } else {
                swal('Error', response.data.mensaje, 'error');
                // $scope.limpiarDatos();
            }
        });
    }
}]);