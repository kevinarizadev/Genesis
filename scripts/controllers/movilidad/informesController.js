'use strict';
angular.module('GenesisApp')
.controller('informesController', ['$scope', '$filter', 'consultaHTTP', 'notification', '$timeout', '$rootScope', '$http', '$window', 'ngDialog',
function ($scope, $filter, consultaHTTP, notification, $timeout, $rootScope, $http, $window, ngDialog) {
    
    // $(document).ready(function () {
    //     $scope.busqueda();
    // });
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    dd < 10 ? dd = '0' + dd : dd = dd
    mm < 10 ? mm = '0' + mm : mm = mm
    today = dd + '/' + mm + '/' + yyyy;
    var vm = this;
    var count = 0;
    
    $scope.hde = {
        hdeDataInformes: true
    }
    console.log("1");

    $scope.tabs = {
        select: 1
    };

    $scope.seleccionar = function (tab_numer) {
        $scope.tabs.select = tab_numer;
        switch (tab_numer) {
            case 1:
                $scope.hde.hdeDataInformes = true;
            break;
            case 2:
                $("#dteFechaInicio").kendoDatePicker({
                    format: "dd/MM/yyyy",
                    culture: "es-MX",
                    // disableDates: ["su", "sa"],
                    max: new Date(),
                });

                $("#dteFechaFin").kendoDatePicker({
                    format: "dd/MM/yyyy",
                    culture: "es-MX",
                    // disableDates: ["su", "sa"],
                    max: new Date(),
                });

                $("#dteFechaInicio").val(today);
                $("#dteFechaFin").val(today);
            break;
        }
    }
    
    $scope.busqueda = function () {
        if (($("#dteFechaInicio").val() != "" && $("#dteFechaInicio").val() != null && $("#dteFechaInicio").val() != undefined)
        || ($("#dteFechaFin").val() != "" && $("#dteFechaFin").val() != null && $("#dteFechaFin").val() != undefined)) {
            
            if ($scope.Validar_Fecha($("#dteFechaInicio").val()) == 'si' && $scope.Validar_Fecha($("#dteFechaFin").val()) == 'si') {
                var fecha_id_inicio = $("#dteFechaInicio").val().split("/");
                var fecha_id_fin = $("#dteFechaFin").val().split("/");
                
                var newdateinputinicio = new Date(fecha_id_inicio[2], (fecha_id_inicio[1] - 1), fecha_id_inicio[0]);
                var timeinputinicio = newdateinputinicio.getTime();
                
                var newdateinputfin = new Date(fecha_id_fin[2], (fecha_id_fin[1] - 1), fecha_id_fin[0]);
                var timeinputfin = newdateinputfin.getTime();
                
                var fecha_actual = new Date();
                var time_actual = fecha_actual.getTime();
                
                if (timeinputinicio > time_actual || timeinputfin > time_actual) {
                    swal({
                        title: '¡Información!',
                        text: 'Las fechas a consultar no puede ser mayor a la fecha de hoy.',
                        type: 'info',
                        confirmButtonText: 'Cerrar',
                        confirmButtonColor: '#174791'
                    });
                } else {
                    count++;
                    if (count == 1) {
                        swal({
                            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                            width: 200,
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            showConfirmButton: false,
                            animation: false
                        });
                        $scope.tblActivas = $('#tblAfiliacionesActivas').DataTable({
                            dom: 'lBsfrtip',
                            "scrollX": true,
                            buttons: ['excel'],
                            ajax: {
                                url: 'php/movilidad/listinformesafiliacion.php?funcion=' + 'activas' + '&fecha_inicio=' + $("#dteFechaInicio").val() + '&fecha_fin=' + $("#dteFechaFin").val(),
                                dataSrc: ''
                            },
                            columns: [
                                { data: "SMVN_CODIGO" },
                                { data: "TIPO_SOLICITUD" },
                                { data: "NIT" },
                                { data: "RAZON_SOCIAL" },
                                { data: "SMVC_TIPO_DOC_COTIZANTE" },
                                { data: "SMVC_DOC_COTIZANTE" },
                                { data: "NOMBRE_AFILIADO" },
                                { data: "ORIGEN" },
                                { data: "FECHA_REGISTRO" },
                                { data: "ESTADO" },
                            ],
                            language: {
                                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                            },
                            lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todas']],
                            // order: [[1, "desc"]]
                        });
                        
                        $scope.tblProcesadas = $('#tblProcesadas').DataTable({
                            dom: 'lBsfrtip',
                            "scrollX": true,
                            buttons: ['excel'],
                            ajax: {
                                url: 'php/movilidad/listinformesafiliacion.php?funcion=' + 'procesadas' + '&fecha_inicio=' + $("#dteFechaInicio").val() + '&fecha_fin=' + $("#dteFechaFin").val(),
                                dataSrc: ''
                            },
                            columns: [
                                { data: "SMVN_CODIGO" },
                                { data: "TIPO_SOLICITUD" },
                                { data: "NIT" },
                                { data: "RAZON_SOCIAL" },
                                { data: "SMVC_TIPO_DOC_COTIZANTE" },
                                { data: "SMVC_DOC_COTIZANTE" },
                                { data: "NOMBRE_AFILIADO" },
                                { data: "FECHA_REGISTRO" },
                                { data: "FECHA_PROCESA" },
                                { data: "USUARIO_PROCESA" },
                            ],
                            language: {
                                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                            },
                            lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todas']],
                            // order: [[1, "desc"]]
                        });
                        
                        $scope.tblRechazadas = $('#tblRechazadas').DataTable({
                            dom: 'lBsfrtip',
                            "scrollX": true,
                            buttons: ['excel'],
                            ajax: {
                                url: 'php/movilidad/listinformesafiliacion.php?funcion=' + 'rechazadas' + '&fecha_inicio=' + $("#dteFechaInicio").val() + '&fecha_fin=' + $("#dteFechaFin").val(),
                                dataSrc: ''
                            },
                            columns: [
                                { data: "SMVN_CODIGO" },
                                { data: "TIPO_SOLICITUD" },
                                { data: "NIT" },
                                { data: "RAZON_SOCIAL" },
                                { data: "SMVC_TIPO_DOC_COTIZANTE" },
                                { data: "SMVC_DOC_COTIZANTE" },
                                { data: "NOMBRE_AFILIADO" },
                                { data: "FECHA_REGISTRO" },
                                { data: "FECHA_PROCESA" },
                                { data: "MOTIVO" },
                                { data: "RECHAZA" },
                            ],
                            language: {
                                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                            },
                            lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todas']],
                            // order: [[1, "desc"]]
                        });
                        
                        $http({
                            method: 'POST',
                            url: "php/movilidad/afiliacion_linea.php",
                            data: {
                                function: 'informe_general',
                                fecha_inicio: $("#dteFechaInicio").val(),
                                fecha_fin: $("#dteFechaFin").val()
                            }
                        }).then(function (response) {
                            $scope.informes_general = response.data;
                            // $scope.graficapie($scope.informes_general);
                            // $scope.graficabarras($scope.informes_general);
                            swal.close();
                            $scope.hde.hdeDataInformes = false;
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
                        $.ajax({
                            type: 'GET',
                            url: 'php/movilidad/listinformesafiliacion.php?funcion=' + 'activas' + '&fecha_inicio=' + $("#dteFechaInicio").val() + '&fecha_fin=' + $("#dteFechaFin").val(),
                            contentType: 'application/json',
                            dataType: 'json',
                            success: function (response) {
                                $scope.table_config = {
                                    "scrollX": true,
                                    columns: [
                                        { data: "SMVN_CODIGO" },
                                        { data: "NIT" },
                                        { data: "RAZON_SOCIAL" },
                                        { data: "SMVC_TIPO_DOC_COTIZANTE" },
                                        { data: "SMVC_DOC_COTIZANTE" },
                                        { data: "NOMBRE_AFILIADO" },
                                        { data: "FECHA_PROCESA" },
                                        { data: "FECHA_REGISTRO" },
                                        { data: "ESTADO" },
                                    ],
                                };
                                $scope.tblActivas.clear();
                                $scope.tblActivas.rows.add(response);
                                $scope.tblActivas.draw();
                            }
                        });
                        
                        $.ajax({
                            type: 'GET',
                            url: 'php/movilidad/listinformesafiliacion.php?funcion=' + 'procesadas' + '&fecha_inicio=' + $("#dteFechaInicio").val() + '&fecha_fin=' + $("#dteFechaFin").val(),
                            contentType: 'application/json',
                            dataType: 'json',
                            success: function (response) {
                                $scope.table_config = {
                                    "scrollX": true,
                                    columns: [
                                        { data: "SMVN_CODIGO" },
                                        { data: "NIT" },
                                        { data: "RAZON_SOCIAL" },
                                        { data: "SMVC_TIPO_DOC_COTIZANTE" },
                                        { data: "SMVC_DOC_COTIZANTE" },
                                        { data: "NOMBRE_AFILIADO" },
                                        { data: "FECHA_PROCESA" },
                                        { data: "FECHA_REGISTRO" },
                                        { data: "ESTADO" },
                                        { data: "USUARIO_PROCESA" },
                                    ],
                                };
                                $scope.tblProcesadas.clear();
                                $scope.tblProcesadas.rows.add(response);
                                $scope.tblProcesadas.draw();
                            }
                        });
                        
                        $.ajax({
                            type: 'GET',
                            url: 'php/movilidad/listinformesafiliacion.php?funcion=' + 'rechazadas' + '&fecha_inicio=' + $("#dteFechaInicio").val() + '&fecha_fin=' + $("#dteFechaFin").val(),
                            contentType: 'application/json',
                            dataType: 'json',
                            success: function (response) {
                                $scope.table_config = {
                                    "scrollX": true,
                                    columns: [
                                        { data: "SMVN_CODIGO" },
                                        { data: "NIT" },
                                        { data: "RAZON_SOCIAL" },
                                        { data: "SMVC_TIPO_DOC_COTIZANTE" },
                                        { data: "SMVC_DOC_COTIZANTE" },
                                        { data: "NOMBRE_AFILIADO" },
                                        { data: "FECHA_PROCESA" },
                                        { data: "FECHA_REGISTRO" },
                                        { data: "ESTADO" },
                                        { data: "RECHAZA" },
                                    ],
                                };
                                $scope.tblRechazadas.clear();
                                $scope.tblRechazadas.rows.add(response);
                                $scope.tblRechazadas.draw();
                            }
                        });
                        $http({
                            method: 'POST',
                            url: "php/movilidad/afiliacion_linea.php",
                            data: {
                                function: 'informe_general',
                                fecha_inicio: $("#dteFechaInicio").val(),
                                fecha_fin: $("#dteFechaFin").val()
                            }
                        }).then(function (response) {
                            $scope.informes_general_reload = response.data;
                            //$scope.graficapie($scope.informes_general_reload);
                            //$scope.graficabarras($scope.informes_general_reload);
                            swal.close();
                        });
                    }
                }
            } else {
                swal('Información', 'Ingrese fechas validas', 'info');
                count = 0;
            }
        } else {
            swal('Información', 'Ingrese fechas validas', 'info');
            count = 0;
        }
    };
    // $scope.busqueda();

    $scope.graficapie = function (data) {
        var hoy = new Date();
        var mm = hoy.getMonth() + 1;
        $scope.yyyy = hoy.getFullYear();
        
        Highcharts.chart('pieAfiliacionesProcesadas', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Módulos de ingreso'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Porcentaje',
                colorByPoint: true,
                data: data.cant_procesadas
                //[{ name: "N08", y: 5.33333 }, { name: "CRI", y: 5.33330 }]
            }]
        });
        
        Highcharts.chart('pieAfiliacionesRechazadas', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Motivos de Rechazo'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Porcentaje',
                colorByPoint: true,
                data: data.cant_rechazadas
                //[{ name: "N08", y: 5.3 }, { name: "CRI", y: 5.33333 }]
            }]
        });
    }
    
    $scope.graficabarras = function (data) {
        Highcharts.chart('barraAfiliacionesActivas', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Procesadas por Seccional'
            },
            // subtitle: {
            //     text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
            // },
            accessibility: {
                announceNewData: {
                    enabled: true
                }
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Número Total de Procesadas'
                }
                
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        // format: '{point.y:' + data.cant_procesadas_secc[0].y +'}'
                    }
                }
            },
            
            // tooltip: {
            //     headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            //     pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:' + $scope.count_data_barras_procesadas_secc +'}</b><br/>'
            // },
            
            series: [
                {
                    name: "Cantidad",
                    colorByPoint: true,
                    data: data.cant_procesadas_secc
                }
            ]
        });
    };
    
    $scope.Validar_Fecha = function (v_fecha) {
        var expreg = new RegExp("^(([0]{1}[1-9]{1})|([1-2]{1}[0-9]{1})|([3]{1}[0-1]{1}))\/(([0]{1}[1-9]{1})|([1]{1}[0-2]{1}))\/([1-2]{1}[0-9]{3})$");
        if (expreg.test(v_fecha)) {
            return 'si'
        } else {
            return 'no'
        }
    };
    
    
    $scope.dwinforme = function () {
        if (($("#dteFechaInicio").val() != "" && $("#dteFechaInicio").val() != null && $("#dteFechaInicio").val() != undefined)
        && ($("#dteFechaFin").val() != "" && $("#dteFechaFin").val() != null && $("#dteFechaFin").val() != undefined)) {
            window.open('php/movilidad/informe_afiliaciones_descarga.php?fecha_inicio=' + $("#dteFechaInicio").val() + '&fecha_fin=' + $("#dteFechaFin").val());
        } else {
            swal('Información', 'Ingrese fechas validas', 'info');
        }
    };
    
}]).filter('inicio', function () {
    return function (input, start) {
        if (input != undefined && start != NaN) {
            start = +start;
            return input.slice(start);
        } else {
            return null;
        }
    }
});