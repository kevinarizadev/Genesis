'use strict';
angular.module('GenesisApp')
.controller('InformeCarteraController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $(document).ready(function () {
        $('#modaldetalle').modal();
    });


    $scope.init = function () {
        $scope.tabI = false;
        $scope.tabII = false;
        $scope.tabIII = false;
        $scope.tabIV = false;
        $scope.activeI = 'none';
        $scope.activeII = 'none';
        $scope.activeIII = 'none';
        $scope.activeIV = 'none';
    }

    $scope.setTab = function (opcion) {
        $scope.init();
        switch (opcion) {
            case 1:
            $scope.tabI = true;
            $scope.tabII = false;
            $scope.tabIII = false;
            $scope.tabIV = false;
            $scope.activeI = 'active final';
            $scope.activeII = 'none';
            $scope.activeIII = 'none';
            $scope.activeIV = 'none';
            $scope.title =  'Llamadas Recibida Y Salientes - Generación Carta';
            setTimeout(function(){ $scope.MostrarConFechaLlamada();}, 200);
            setTimeout(function(){ $scope.InformeCantidadCarta(); }, 300);
            
            break;
            case 2:
            $scope.tabI = false;
            $scope.tabII = true;
            $scope.tabIII = false;
            $scope.tabIV = false;
            $scope.activeI = 'none';
            $scope.activeII = 'active final';
            $scope.activeIII = 'none';
            $scope.activeIV = 'none';
            $scope.title =  'Información Cartera';
            setTimeout(function(){ $scope.InformeCarta(); }, 200);
            setTimeout(function(){ $scope.Dato(); $scope.Dato2();}, 300);

            break;
            case 3:
            $scope.tabI = false;
            $scope.tabII = false;
            $scope.tabIII = true;
            $scope.tabIV = false;
            $scope.activeI = 'none';
            $scope.activeII = 'none';
            $scope.activeIII = 'active final';
            $scope.activeIV = 'none';
            $scope.OcultarReporteMesaAyuda = false;
            $scope.title =  'Mesa De Ayuda Cartera';
            $scope.MostrarConFechaMesaAyuda();
            break;
            case 4:
            $scope.tabI = false;
            $scope.tabII = false;
            $scope.tabIII = false;
            $scope.tabIV = true;
            $scope.activeI = 'none';
            $scope.activeII = 'none';
            $scope.activeIII = 'none';
            $scope.activeIV = 'active final';
            break;
            default:
        }
    }

    $scope.setTab(2);


    $scope.CargarTortaRealizada = function () {
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'TortaLlamadaRealizada' , inicio: $scope.fecha_inicio, final: $scope.fecha_final }
        }).then(function (response) {
            $scope.listadore = [];
            for (var z = 0; z < response.data.length; z++) {
                $scope.listadore.push({ "name": response.data[z].motivo, "y": Number(response.data[z].cantidad), "value": response.data[z].cantidad });
            }
            console.log($scope.listadore);
            Highcharts.chart('container', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.value}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                return Highcharts.numberFormat(this.percentage, 1) + ' %';
                            },
                            connectorColor: 'silver'
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Porcentaje',
                    data: $scope.listadore
                }]
            });

        });

    }

    $scope.CargarTortaRecibida = function () {
        $scope.listadorec = [];
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'TortaLlamadaRecibida', inicio: $scope.fecha_inicio, final: $scope.fecha_final }
        }).then(function (res) {

            for (var z = 0; z < res.data.length; z++) {
                $scope.listadorec.push({ "name": res.data[z].motivo, "y": Number(res.data[z].cantidad), "value": res.data[z].cantidad });
            }

            Highcharts.chart('container2', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.value}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                return Highcharts.numberFormat(this.percentage, 1) + ' %';
                            },
                            connectorColor: 'silver'
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Porcentaje',
                    data: $scope.listadorec
                }]
            });

        });
    }

    $scope.ListarInformeLlamada = function () {
        if ($scope.cantidadllamada > 0) {
            swal({ title: 'Cargando Informacion' });
            swal.showLoading();
        }
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'InformeLlamada', inicio: $scope.fecha_inicio, final: $scope.fecha_final }
        }).then(function (response) {
            if (response.data.length > 0) {
                if ($scope.estado == 'A') {
                    $scope.tablerecepcion.destroy();
                }
                $scope.llamada = response.data;
                $scope.cantidadllamada = response.data.length;
                $scope.estado = 'A';
                setTimeout(function () {
                    $scope.tablerecepcion = $('#informacion').DataTable({
                        dom: 'lBsfrtip',
                        select: true,
                        buttons: ['csv', 'excel'],
                        language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                        destroy: true,
                        responsive: true,
                        lengthMenu: [
                        [5, 20, -1],
                        [10, 50, 'Todas']
                        ],
                        order: [
                        [0, "desc"]
                        ]
                    });
                    swal.close();
                }, 500);
            } else {
                swal('Genesis Informa', 'No hay Informacion en el Reporte', 'warning');
            }
            $scope.CargarTortaRealizada();
            $scope.CargarTortaRecibida();
            $scope.InformeCarta();
            $scope.ListarInformeCarta();
            $scope.InformeCantidadCarta();
        });
    }

    $scope.InformeCantidadCarta = function () {
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'InformeCantidadCarta', inicio: $scope.fecha_inicio, final: $scope.fecha_final }
        }).then(function (response) {
            $scope.sms_consolidado_exitoso = response.data.sms_consolidado_exitoso;
            $scope.sms_consolidadoo_fallo = response.data.sms_consolidadoo_fallo;            
            $scope.sms_correcto_aviso = response.data.sms_correcto_aviso;
            $scope.fallo_de_envio_aviso = response.data.fallo_de_envio_aviso;
            $scope.sms_correcto_incumplimiento = response.data.sms_correcto_incumplimiento;
            $scope.fallo_de_envio_incumplimiento = response.data.fallo_de_envio_incumplimiento;
        });
    }


    $scope.ListarInformeCarta = function () {
        if ($scope.cartalength > 0) {
            swal({ title: 'Cargando Informacion' });
            swal.showLoading();
        }
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'InformeCarta', inicio: $scope.fecha_inicio, final: $scope.fecha_final }
        }).then(function (response) {
            if (response.data.length > 0) {
                if ($scope.estadocarta == 'Z') {
                    $scope.tablecarta.destroy();
                }
                $scope.carta = response.data;
                $scope.cartalength = response.data.length;
                $scope.estadocarta = 'Z';
                setTimeout(function () {
                    $scope.tablecarta = $('#carta').DataTable({
                        dom: 'lBsfrtip',
                        select: true,
                        buttons: ['csv', 'excel'],
                        language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                        destroy: true,
                        responsive: true,
                        lengthMenu: [
                        [5, 20, -1],
                        [10, 50, 'Todas']
                        ],
                        order: [
                        [0, "desc"]
                        ]
                    });
                    swal.close();
                }, 500);
            } else {
                swal('Genesis Informa', 'No hay Informacion en el Reporte', 'warning');
            }
        });
    }


    $scope.ListarInformeMesaAyuda = function () {
        if ($scope.cantidadmesaayuda > 0) {
            swal({ title: 'Cargando Informacion' });
            swal.showLoading();
        }
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'InformeMesaAyuda', inicio: $scope.inicio_fecha, final: $scope.final_fecha }
        }).then(function (response) {
            if (response.data.length > 0) {
                if ($scope.cantidadmesaayuda == response.data.length) {
                    $scope.tablerecepcionmesa.destroy();
                }
                $scope.mesayuda = response.data;
                $scope.cantidadmesaayuda = response.data.length;
                $scope.OcultarReporteMesaAyuda = true;
                setTimeout(function () {
                    $scope.tablerecepcionmesa = $('#informacionmesa').DataTable({
                        dom: 'lBsfrtip',
                        select: true,
                        buttons: ['csv', 'excel'],
                        language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                        destroy: true,
                        responsive: true,
                        lengthMenu: [
                        [5, 20, -1],
                        [10, 50, 'Todas']
                        ],
                        order: [
                        [0, "asc"]
                        ]
                    });
                    swal.close();
                }, 500);
            } else {
                swal('Genesis Informa', 'No hay Informacion en el Reporte', 'warning');
                $scope.OcultarReporteLlamada = false;
            }
        });
    }

    $scope.MostrarConFechaLlamada = function () {
        var date = new Date();
        var formattedDate = moment(date).format('YYYY-MM-DD');
        $(".datepicker_inicio").kendoDatePicker({
            animation: {
                close: { effects: "fadeOut zoom:out",duration: 300 },
                open: { effects: "fadeIn zoom:in", duration: 300 }
            }
        });
        $(".datepicker_final").kendoDatePicker({
            animation: {
                close: { effects: "fadeOut zoom:out",duration: 300 },
                open: { effects: "fadeIn zoom:in", duration: 300 }
            }
        });


        $(document).ready(function () {
            $scope.startChange = function () {
                var startDate = start.value(),
                endDate = end.value();

                if (startDate) {
                    startDate = new Date(startDate);
                    startDate.setDate(startDate.getDate());
                    end.min(startDate);
                } else if (endDate) {
                    start.max(new Date(endDate));
                } else {
                    endDate = new Date();
                    start.max(endDate);
                    end.min(endDate);
                }
            }

            $scope.endChange = function () {
                var endDate = end.value(),
                startDate = start.value();

                if (endDate) {
                    endDate = new Date(endDate);
                    endDate.setDate(endDate.getDate());
                    start.max(endDate);
                } else if (startDate) {
                    end.min(new Date(startDate));
                } else {
                    endDate = new Date();
                    start.max(endDate);
                    end.min(endDate);
                }
            }

            var start = $("#fecha_inicio").kendoDatePicker({
                change: $scope.startChange,
                format: "dd/MM/yyyy",
                culture: "es-MX",
                disableDates: ["su", "sa"],
                max: new Date()
            }).data("kendoDatePicker");

            var end = $("#fecha_final").kendoDatePicker({
                change: $scope.endChange,
                format: "dd/MM/yyyy",
                culture: "es-MX",
                disableDates: ["su", "sa"],
                max: new Date()
            }).data("kendoDatePicker");

            start.max(end.value());
            end.min(start.value());
        });

        var date2 = new Date();
        $scope.fecha_inicio  = moment(date2).format('DD/MM/YYYY');
        $scope.fecha_final   = moment(date2).format('DD/MM/YYYY');
        $scope.ListarInformeLlamada();
    }


    $scope.MostrarConFechaMesaAyuda = function () {
        var date = new Date();
        var formattedDate = moment(date).format('YYYY-MM-DD');

        //Fin datos de sesion como cedula y ubicacion
        $(".datepicker_inicio").kendoDatePicker({
            animation: {
                close: {effects: "fadeOut zoom:out",duration: 300},
                open: {effects: "fadeIn zoom:in",duration: 300}
            }
        });
        $(".datepicker_final").kendoDatePicker({
            animation: {
                close: {effects: "fadeOut zoom:out",duration: 300},
                open: {effects: "fadeIn zoom:in",duration: 300}
            }
        });


        $(document).ready(function () {
            $scope.startChange = function () {
                var startDate = start.value(),
                endDate = end.value();

                if (startDate) {
                    startDate = new Date(startDate);
                    startDate.setDate(startDate.getDate());
                    end.min(startDate);
                } else if (endDate) {
                    start.max(new Date(endDate));
                } else {
                    endDate = new Date();
                    start.max(endDate);
                    end.min(endDate);
                }
            }

            $scope.endChange = function () {
                var endDate = end.value(),
                startDate = start.value();

                if (endDate) {
                    endDate = new Date(endDate);
                    endDate.setDate(endDate.getDate());
                    start.max(endDate);
                } else if (startDate) {
                    end.min(new Date(startDate));
                } else {
                    endDate = new Date();
                    start.max(endDate);
                    end.min(endDate);
                }
            }

            var start = $("#inicio_fecha").kendoDatePicker({
                change: $scope.startChange,
                format: "dd/MM/yyyy",
                culture: "es-MX",
                disableDates: ["su", "sa"],
                max: new Date()
            }).data("kendoDatePicker");

            var end = $("#final_fecha").kendoDatePicker({
                change: $scope.endChange,
                format: "dd/MM/yyyy",
                culture: "es-MX",
                disableDates: ["su", "sa"],
                max: new Date()
            }).data("kendoDatePicker");

            start.max(end.value());
            end.min(start.value());
        });
    }


    $scope.Limpiar = function (cod) {
        switch (cod) {
            case 1:
            break;
            case 2:            
            break;
            case 3:
            $scope.inicio_fecha = '';
            $scope.final_fecha = '';
            break;
            case 4:

            break;
            default:
        }
    }

    $scope.AbrirDetalle = function (info) {
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'DetalleMesaAyuda', tipo_documento: info.TIPO_APORTANTE, documento: info.DOC_APORTANTE, doc: info.DOCUMENTO, numero: info.CODIGO, ubicacion:info.UBICACION }
        }).then(function (respo) {
            $scope.informacionempleador = respo.data.info_empleador[0];
            $scope.historico = respo.data.historico;
            $('#modaldetalle').modal('open');
        });
    }


    $scope.InformeCarta = function () {
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'InformeCartera' }
        }).then(function (response) {
            $scope.valor_total_mora = response.data.valor_total_mora;
            $scope.valor_meses_anteriores = response.data.valor_meses_anteriores;
            $scope.valor_total_mes_actual = response.data.valor_total_mes_actual;
            $scope.valor_total_recuperado_dia = response.data.valor_total_recuperado_dia; 
            $scope.valor_total_mes_recuperado = response.data.valor_total_mes_recuperado;
            $scope.valor_total_saneado_dia = response.data.valor_total_saneado_dia;
            $scope.valor_total_mes_saneado = response.data.valor_total_mes_saneado;
            $scope.valor_total_depurado_dia = response.data.valor_total_depurado_dia;
            $scope.valor_total_mes_depurado = response.data.valor_total_mes_depurado;
        });
    }

    $scope.close = function () {
        $('#modaldetalle').modal('close');
    }


    $scope.Dato = function () {
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'MoraMensual' }
        }).then(function (response) {
            $scope.moramensual = response.data;
            console.log($scope.moramensual);
            setTimeout(function() {
                Highcharts.chart('informe', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: ' <b> Mora Pendiente Por Mes </b>'
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: [
                        ''
                        ],
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '<b> Valor De Mora $</b>'
                        }
                    },

                    tooltip: {
                        pointFormat: '{series.name}: <b>$ </b> <b>{point.y}</b>',
                        shared: false,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.1,
                            borderWidth: 0
                        }
                    },
                    series: $scope.moramensual
                });

            }, 200);
        });
    }

    $scope.Dato2 = function () {
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'MoraMensualCarta' }
        }).then(function (response) {
            $scope.moramensualcarta = response.data;
            console.log($scope.moramensualcarta);
            setTimeout(function() {
                Highcharts.chart('informe2', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: ' <b> Mora Notificada Por Mes </b>'
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: [
                        ''
                        ],
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '<b> Valor De Mora $</b>'
                        }
                    },

                    tooltip: {
                        pointFormat: '{series.name}: <b>$ </b> <b>{point.y}</b>',
                        shared: false,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.1,
                            borderWidth: 0
                        }
                    },
                    series: $scope.moramensualcarta
                });

            }, 200);
        });
    }




}]);