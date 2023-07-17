'use strict';
angular.module('GenesisApp')
.controller('InformeCarteraController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $(document).ready(function () {
        $('#modaldetalle').modal();
    });



    $scope.ValidaUsuario = function () {
        if (sessionStorage.getItem('cedula') == '22570097' || sessionStorage.getItem('cedula')== '1045718465'|| sessionStorage.getItem('cedula') == '1140857421'|| sessionStorage.getItem('cedula') =='1079938984')  {
            $scope.FuncionarioOperativo = false;
        } else {
            $scope.FuncionarioOperativo = true;        
        }
    }

    $scope.data = {
        informeRecuperado: null,
        informeDepurado: null,
        informeDepuracionRecuperacion: null,
        informeDiferencialRecuperadoMes1: null,
        informeDiferencialDepurado: null,
        informeDiferencialDepuradoMes2: null
    }




    $scope.init = function () {
        $scope.tabI = false;
        $scope.tabII = false;
        $scope.tabIII = false;
        $scope.tabIV = false;
        $scope.activeI = 'none';
        $scope.activeII = 'none';
        $scope.activeIII = 'none';
        $scope.activeIV = 'none';

        $scope.TablaRecuperacion = false
        $scope.TablaDepuracion = false
        $scope.TablaDepuracion2 = false
        $scope.TablaDepuracionRecuperacion = false
        $scope.TablaDiferencialRecuperadoMes1 = false
        $scope.TablaDiferencialDepurado = false
    }

    /*if () {
      $scope.mostrarTabReporte = true;
    } else {
      $scope.mostrarTabReporte = false;
    }*/
    if (sessionStorage.getItem('cedula') !== null && (sessionStorage.getItem('cedula') === '72358057' || sessionStorage.getItem('cedula') === '79218502' || sessionStorage.getItem('cedula') === '1143450658')) {
        $scope.mostrarTabReporte = true;
    } else {
        $scope.mostrarTabReporte = false;
    }
    //$scope.mostrarTabReporte = true;


    $scope.setTab = function (opcion) {
        $scope.init();
        switch (opcion) {
            case 1:
            $scope.tabI = true;
            $scope.tabII = false;
            $scope.tabIII = false;
            $scope.tabIV = false;
            $scope.tabV = false;
            $scope.activeI = 'active final';
            $scope.activeII = 'none';
            $scope.activeIII = 'none';
            $scope.activeIV = 'none';
            $scope.activeV = 'none';
            $scope.title =  'Gestion De Llamadas - Generación Carta';
            setTimeout(function(){ $scope.MostrarConFechaLlamada();}, 200);
            setTimeout(function(){ $scope.InformeCantidadCarta(); }, 300);
            setTimeout(function(){ $scope.CantidadesCall(); }, 400);
            setTimeout(function(){ $scope.CantidadesCallTelecobro(); }, 400);
            setTimeout(function(){ $scope.DetalleCallSaliente(); }, 500);
            setTimeout(function(){ $scope.DetalleCallEntrante(); }, 500);
            break;
            case 2:
            $scope.tabI = false;
            $scope.tabII = true;
            $scope.tabIII = false;
            $scope.tabIV = false;
            $scope.tabV = false;
            $scope.activeI = 'none';
            $scope.activeII = 'active final';
            $scope.activeIII = 'none';
            $scope.activeIV = 'none';
            $scope.activeV = 'none';
            $scope.title =  'Información Cartera';
            setTimeout(function(){ $scope.InformeCarta(); }, 200);
            setTimeout(function(){ $scope.Dato(); $scope.Dato2();}, 300);

            break;
            case 3:
            $scope.tabI = false;
            $scope.tabII = false;
            $scope.tabIII = true;
            $scope.tabIV = false;
            $scope.tabV = false;
            $scope.activeI = 'none';
            $scope.activeII = 'none';
            $scope.activeIII = 'active final';
            $scope.activeIV = 'none';
            $scope.activeV = 'none';
            $scope.OcultarReporteMesaAyuda = false;
            $scope.title =  'Mesa De Ayuda Cartera';
            $scope.MostrarConFechaMesaAyuda();
            break;
            case 4:
            $scope.tabI = false;
            $scope.tabII = false;
            $scope.tabIII = false;
            $scope.tabIV = true;
            $scope.tabV = false;
            $scope.activeI = 'none';
            $scope.activeII = 'none';
            $scope.activeIII = 'none';
            $scope.activeIV = 'active final';
            $scope.activeV = 'none';
            $scope.title =  'Gestion De Cartera';
            setTimeout(function(){ $scope.ListarGestionCartera(); }, 200);
            $scope.DetalleGestionCartera = false;
            break;
            case 5:
            $scope.tabI = false;
            $scope.tabII = false;
            $scope.tabIII = false;
            $scope.tabIV = false;
            $scope.tabV = true;
            $scope.activeI = 'none';
            $scope.activeII = 'none';
            $scope.activeIII = 'none';
            $scope.activeIV = 'none';
            $scope.activeV = 'active final';
            $scope.title =  'Reporte BI';
            $scope.DetalleGestionCartera = false;
            break;
            default:
        }
    }

    $scope.setTab(1);


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
            if ($scope.linfollamada == 'A') {
                $scope.tablerecepcion.destroy();
            }
            $scope.llamada = response.data;
            $scope.cantidadllamada = response.data.length;
            $scope.linfollamada = 'A';
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
                    [5, 50, 'Todas']
                    ],
                    order: [
                    [0, "desc"]
                    ]
                });
                swal.close();
            }, 500);
            $scope.ListarInformeCarta();
            $scope.InformeCantidadCarta();
            $scope.CantidadesCall();
            $scope.CantidadesCallTelecobro();            
            $scope.DetalleCarta();
            $scope.DetalleCallSaliente();
            $scope.DetalleCallEntrante();

        });
    }

    $scope.InformeCantidadCarta = function () {
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'InformeCantidadCarta', inicio: $scope.fecha_inicio, final: $scope.fecha_final,documento:sessionStorage.getItem('cedula')  }
        }).then(function (response) {
            $scope.sms_consolidado_exitoso = response.data.sms_consolidado_exitoso;
            $scope.sms_consolidadoo_fallo = response.data.sms_consolidadoo_fallo;            
            $scope.sms_correcto_aviso = response.data.sms_correcto_aviso;
            $scope.fallo_de_envio_aviso = response.data.fallo_de_envio_aviso;
            $scope.sms_correcto_incumplimiento = response.data.sms_correcto_incumplimiento;
            $scope.fallo_de_envio_incumplimiento = response.data.fallo_de_envio_incumplimiento;
        });
    }


    $scope.DetalleCarta = function () {
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'DetalleCarta', fecha_inicio:  $scope.fecha_inicio, fecha_fin: $scope.fecha_final, documento:sessionStorage.getItem('cedula') }
        }).then(function (response) {
            if ($scope.estadodetallecarta == 'DC') {
                $scope.detcarta.destroy();
            }
            $scope.decarta = response.data;
            $scope.estadodetallecarta = 'DC';
            setTimeout(function () {
                $scope.detcarta = $('#detcarta').DataTable({
                    dom: 'lBsfrtip',
                    select: true,
                    buttons: ['csv', 'excel'],
                    language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                    destroy: true,
                    responsive: true,
                    lengthMenu: [
                    [5, 20, -1],
                    [5, 50, 'Todas']
                    ],
                    order: [
                    [1, "asc"]
                    ]
                });
                swal.close();
            }, 500);
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
            data: { function: 'InformeCarta', inicio: $scope.fecha_inicio, final: $scope.fecha_final,documento:sessionStorage.getItem('cedula')}
        }).then(function (response) {
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
                    [5, 50, 'Todas']
                    ],
                    order: [
                    [0, "desc"]
                    ]
                });
                swal.close();
            }, 500);
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
                        [5, 50, 'Todas']
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
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Informacion...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        })
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
            swal.close()
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

    $scope.ListarGestionCartera = function () {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Informacion...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        })
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'ListarGestionCartera' ,documento:sessionStorage.getItem('cedula')}
        }).then(function (response) {
            $scope.duplicar = response.data;
            swal.close()
            setTimeout(function() {$scope.CargarGestion(response.data[0])}, 100);
        }); 
    }


    $scope.CargarGestion = function (data) {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Informacion...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'ListarGestionXSegmento', tipo_segmento: data.codigo }
        }).then(function (response) {
            swal.close();
            $scope.titulo = data.segmento_cartera;
            $scope.info_mora = response.data.info_mora;
            $scope.info_recuperado = response.data.info_recuperado;
            $scope.DetalleGestionCartera = true;
            $scope.MostrarGestion($scope.info_recuperado,'GESTIONADOS')
        });
    }

    $scope.MostrarGestion = function (listar,subtitulo) {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Listando Informacion...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        if ($scope.estado == 'A') {
            $scope.listadogestion.destroy();
        }
        $scope.subtitulo = subtitulo;
        $scope.listar = listar;
        $scope.estado = 'A';
        setTimeout(function () {
            $scope.listadogestion = $('#listadogestion').DataTable({
                dom: 'lBsfrtip',
                select: true,
                buttons: ['csv', 'excel'],
                language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                destroy: true,
                responsive: true,
                lengthMenu: [
                [50, 100, -1],
                [50, 100, 'Todas']
                ],
                order: [
                [0, "asc"]
                ]
            });
            swal.close();
        }, 10);
    }

    $scope.DetalleCallSaliente = function () {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Informacion...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        })
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'InformeGestionLlamada' ,tipo_gestion:'S',inicio: $scope.fecha_inicio, final: $scope.fecha_final, documento:sessionStorage.getItem('cedula')  }
        }).then(function (response) {
            $scope.saliente = response.data;
            swal.close()
        }); 
    }

    $scope.DetalleCallEntrante = function () {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Informacion...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        })
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'InformeGestionLlamada' ,tipo_gestion:'R',inicio: $scope.fecha_inicio, final: $scope.fecha_final,documento:sessionStorage.getItem('cedula')  }
        }).then(function (response) {
            $scope.entrante = response.data;
            swal.close()
        }); 
    }

    $scope.VisualizarInformacion  = function (id) {
        switch (id) {
            case 'GL':
            if ($scope.GestionCall) {
                $scope.GestionCall = false;
            } else {
                $scope.GestionCall = true;
            }
            break;
            case 'GN':
            if ($scope.GestionNotiCartas) {
                $scope.GestionNotiCartas = false;
            } else {
                $scope.GestionNotiCartas = true;
            }
            break;
            case 'DS':
            if ($scope.DetalleSaliente) {
                $scope.DetalleSaliente = false;
            } else {
                $scope.DetalleSaliente = true;
            }
            break;
            case 'DE':
            if ($scope.DetalleEntrante) {
                $scope.DetalleEntrante = false;
            } else {
                $scope.DetalleEntrante = true;
            }
            break;
            case 'DC':
            if ($scope.GestionDetalleNotiCartas) {
                $scope.GestionDetalleNotiCartas = false;
            } else {
                $scope.GestionDetalleNotiCartas = true;
            }
            break;

            case 'TR':
                $scope.TablaRecuperacion = !$scope.TablaRecuperacion
                break
            case 'TD':
                $scope.TablaDepuracion = !$scope.TablaDepuracion
                break
            case 'TD2':
                $scope.TablaDepuracion2 = !$scope.TablaDepuracion2
                break
            case 'TDR':
                $scope.TablaDepuracionRecuperacion = !$scope.TablaDepuracionRecuperacion
                break
            case 'TDDR':
                $scope.TablaDiferencialRecuperadoMes1 = !$scope.TablaDiferencialRecuperadoMes1
                break
            case 'TDDD':
                $scope.TablaDiferencialDepurado = !$scope.TablaDiferencialDepurado
                break
            default:
            break;
        }
    }


    $scope.CantidadesCall = function () {
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'CantidadesCall',inicio: $scope.fecha_inicio, final: $scope.fecha_final,documento:sessionStorage.getItem('cedula') }
        }).then(function (response) {
            $scope.call = response.data;
            console.log($scope.call);
        }); 
    }

    $scope.CantidadesCallTelecobro = function () {
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'CantidadesCallTelecobro',inicio: $scope.fecha_inicio, final: $scope.fecha_final,documento:sessionStorage.getItem('cedula') }
        }).then(function (response) {
            $scope.callrecobro = response.data;
            console.log($scope.callrecobro);
        }); 
    }

    const ListarInformeRecuperado = () => {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Informacion...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        })
        $http({
            method: 'post',
            url: 'php/cartera/funcartera.php',
            data: {
                function: 'ListarInformeRecuperado'
            }
        }).then((response) => {
            $scope.data.informeRecuperado = response.data.data
            swal.close()
        })
    }

    const ListarInformeDepurado = () => {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Informacion...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        })
        $http({
            method: 'post',
            url: 'php/cartera/funcartera.php',
            data: {
                function: 'ListarInformeDepurado'
            }
        }).then((response) => {
            $scope.data.informeDepurado = response.data.data
            swal.close()
        })
    }

    const ListarInformeDiferencialRecuperadoMes1 = () => {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Informacion...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        })
        $http({
            method: 'post',
            url: 'php/cartera/funcartera.php',
            data: {
                function: 'ListarInformeDiferencialRecuperadoMes1'
            }
        }).then((response) => {
            $scope.data.informeDiferencialRecuperadoMes1 = response.data.data
            swal.close()
        })
    }

    const ListarInformeDepuracionRecuperacion = () => {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Informacion...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        })
        $http({
            method: 'post',
            url: 'php/cartera/funcartera.php',
            data: {
                function: 'ListarInformeDepuracionRecuperacion'
            }
        }).then((response) => {
            const data = response.data.data
            const transformedData = []
            data.forEach((item, index) => {
                if (index === 0) {
                    item.OBSERVACION = ''
                    transformedData.push(item)
                } else {
                    const previousData = data[index - 1]

                    const previousValue = parseInt(previousData.VALOR_PRESUNTA_MORA)
                    const currentValue = parseInt(item.VALOR_PRESUNTA_MORA)

                    if (currentValue > previousValue) {
                        item.PORCENTAJE = `${(Math.abs((1 - (previousValue / currentValue)) * 100)).toFixed(2)} %`
                        item.OBSERVACION = 'AUMENTO'
                    } else {
                        item.PORCENTAJE = `${(Math.abs((1 - (previousValue / currentValue)) * 100)).toFixed(2)} %`
                        item.OBSERVACION = 'DISMINUCION'
                    }
                    transformedData.push(item)
                }
            })
            $scope.data.informeDepuracionRecuperacion = transformedData
            swal.close()
        })
    }

    const ListarInformeDiferencialRecuperadoMes2 = () => {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Informacion...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        })
        $http({
            method: 'post',
            url: 'php/cartera/funcartera.php',
            data: {
                function: 'ListarInformeDiferencialRecuperadoMes2'
            }
        }).then((response) => {
            $scope.data.informeDiferencialRecuperadoMes2 = response.data.data
            swal.close()
        })
    }

    const ListarInformeDiferencialRecuperado = () => {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Informacion...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        })
        $http({
            method: 'post',
            url: 'php/cartera/funcartera.php',
            data: {
                function: 'ListarInformeDiferencialRecuperado'
            }
        }).then((response) => {
            $scope.data.informeDiferencialRecuperado = response.data.data
            swal.close()
        })
    }

    const ListarInformeDiferencialDepurado = () => {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Informacion...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        })
        $http({
            method: 'post',
            url: 'php/cartera/funcartera.php',
            data: {
                function: 'ListarInformeDiferencialDepurado'
            }
        }).then((response) => {
            $scope.data.informeDiferencialDepurado = response.data.data
            swal.close()
        })
    }

    const ListarInformeDiferencialDepuradoMes1 = () => {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Informacion...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        })
        $http({
            method: 'post',
            url: 'php/cartera/funcartera.php',
            data: {
                function: 'ListarInformeDiferencialDepuradoMes1'
            }
        }).then((response) => {
            $scope.data.informeDiferencialDepuradoMes1 = response.data.data
            swal.close()
        })
    }

    const ListarInformeDiferencialDepuradoMes2 = () => {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Informacion...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        })
        $http({
            method: 'post',
            url: 'php/cartera/funcartera.php',
            data: {
                function: 'ListarInformeDiferencialDepuradoMes2'
            }
        }).then((response) => {
            $scope.data.informeDiferencialDepuradoMes2 = response.data.data
            swal.close()
        })
    }

    $scope.calcularTotal = (data, field) => {
        if (data === null) {
            return 0
        }
        return data.map((item) => {
            return parseInt(item[field].replace('.', ''))
        }).reduce((acumulado, item) => acumulado + item)
    }

    $scope.mostrarMes = (data) => {
        if (typeof data  === 'undefined' || data === null) {
            return ''
        }

        return data[0].MES_CONSULTADO
    }

    $scope.formatearNumero = (data) => {
        const number = parseInt(data.toString().replace('.', ''))

        const reversedNumber = number.toString().split('').reverse().join('')

        const matches = reversedNumber.match(/(\d{1,3})/gm)

        const formattedNumber = matches.map((value, index) => {
            if (index < matches.length - 1) {
                return value.split().reverse().join() + '.'
            } else {
                return value.split().reverse().join()
            }
        }).join('').split('').reverse().join('')
        return formattedNumber
    }

    $scope.mostrarMesComparacion = (data) => {
        console.log('test')
        if (typeof data === 'undefined' || data === null) {
            return ''
        }

        const meses = [
            "ENERO",
            "FEBRERO",
            "MARZO",
            "ABRIL",
            "MAYO",
            "JUNIO",
            "JULIO",
            "AGOSTO",
            "SEPTIEMBRE",
            "OCTUBRE",
            "NOVIEMBRE",
            "DICIEMBRE"
        ]

        const mes = parseInt(data[0].MES_CONSULTADO.split('/')[0]) - 1

        return meses[mes] + ' - ' + meses[(mes + 1  > 11 ? 0 : mes + 1)]
    }

    $scope.mostrarMesDiferencia = (data) => {
        console.log('test')
        if (typeof data === 'undefined' || data === null) {
            return ''
        }

        const meses = [
            "ENERO",
            "FEBRERO",
            "MARZO",
            "ABRIL",
            "MAYO",
            "JUNIO",
            "JULIO",
            "AGOSTO",
            "SEPTIEMBRE",
            "OCTUBRE",
            "NOVIEMBRE",
            "DICIEMBRE"
        ]

        const mes = parseInt(data[0].MES.split('/')[0]) - 1

        return meses[mes]
    }


    ListarInformeRecuperado()
    ListarInformeDepurado()
    ListarInformeDepuracionRecuperacion()
    ListarInformeDiferencialRecuperadoMes1()
    ListarInformeDiferencialRecuperadoMes2()
    ListarInformeDiferencialRecuperado()
    ListarInformeDiferencialDepuradoMes1()
    ListarInformeDiferencialDepuradoMes2()
    ListarInformeDiferencialDepurado()
}]);