'use strict';
angular.module('GenesisApp')
    .controller('liquidacionController', ['$scope', '$filter', 'consultaHTTP', 'notification', '$timeout', '$rootScope', '$http', '$window', 'ngDialog',
        function($scope, $filter, consultaHTTP, notification, $timeout, $rootScope, $http, $window, ngDialog) {


            $.getJSON("php/obtenersession.php").done(function (respuesta) {
                $scope.sesdata = respuesta;
               //alert($scope.sesdata.nombre);
            }) 
            $scope.obtenerDocumento = function () {
                consultaHTTP.obtenerDocumento().then(function (response) {
                   $scope.Documentos = response;
                })
             } 
             $scope.obtenerDocumento();
            $scope.mostrar = function() {
                $scope.inicio = true;
                $scope.formulario_radicado = true;
                $scope.radicado = true;
                $scope.formulario_medico = false;
                $scope.medico = false;
            }
            $scope.fecha_fin = new Date();
            $scope.fecha_inicio = new Date();
            $scope.buscar_graficas = function() {
                if ($scope.fecha_inicio && $scope.fecha_fin && $scope.fecha_inicio <= $scope.fecha_fin) {
                    $scope.pie();
                    $scope.barra();
                } else {
                    $scope.fecha_fin = new Date();
                    $scope.fecha_inicio = new Date();
                }
            }
            $scope.pie = function() {
                $http({
                    method: 'POST',
                    url: "php/aseguramiento/liquidacion.php",
                    data: {
                        function: 'p_listar_grapica_pie',
                        fecha_inicio: $scope.fecha_inicio,
                        fecha_fin: $scope.fecha_fin
                    }
                }).then(function(response) {
                    if (response.data.length != 0) {
                        $scope.pie_datos = [];
                        for (var i = 0; i < response.data.length; i++) {
                            $scope.pie_datos.push({
                                "name": response.data[i].name,
                                "y": parseInt(response.data[i].total),
                                "drilldown": response.data[i].id,
                                "color": response.data[i].colores
                                    // "dataLabels": { 'enabled': true, 'format': response.data[i] + "" }
                            })
                        }
                        $scope.datos_completos = response.data;
                        console.log($scope.pie_datos);
                        console.log($scope.datos_completos);
                        Highcharts.chart('pie', {
                            chart: {
                                type: 'pie'
                            },
                            title: {
                                text: 'Total por Estado'
                            },
                            subtitle: {
                                text: 'Click en los sectores para ver por tipo de prestaciones'
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: false
                                    },
                                    showInLegend: true
                                },
                                series: {
                                    dataLabels: {
                                        enabled: false,
                                        format: '{point.name}: {point.y}'
                                    }
                                }
                            },

                            credits: {
                                enabled: false
                            },

                            tooltip: {
                                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
                            },

                            lang: {
                                drillUpText: ' << ATRAS',

                            },
                            series: [{
                                name: "Prestacion por estados",
                                colorByPoint: true,
                                data: $scope.pie_datos
                                    // dataLabels: { 'enabled': true, 'format': $scope.pie_datos + "" }
                            }],
                            drilldown: {
                                series: $scope.datos_completos
                            }
                        });
                    }

                });
            }
            $scope.seccionales_nombres = [];
            $scope.valores = [{
                name: 'MEDICO',
                data: [],
                color: '#FFC107'
            }, {
                name: 'LIQUIDACION',
                data: [],
                color: '#03A9F4'
            }, {
                name: 'CULMINADA',
                data: [],
                color: "#8BC34A"

            }, {
                name: 'DEVOLUCION',
                data: [],
                color: "#FF5722"
            },{
                name: 'PENDIENTE POR ADJUNTO',
                data: [],
                color: "#FF998B"
            },{
                name: 'COTIZANTES SIN APORTES',
                data: [],
                color: "#c41fac"
            }]
            $scope.barra = function() {
                $scope.seccionales_nombres = [];
                $scope.valores = [{
                    name: 'MEDICO',
                    data: [],
                    color: '#FFC107'
                }, {
                    name: 'LIQUIDACION',
                    data: [],
                    color: '#03A9F4'
                }, {
                    name: 'CULMINADA',
                    data: [],
                    color: "#8BC34A"

                }, {
                    name: 'DEVOLUCION',
                    data: [],
                    color: "#FF5722"
                },{
                    name: 'PENDIENTE POR ADJUNTO',
                    data: [],
                    color: "#FF998B"
                },{
                    name: 'COTIZANTES SIN APORTES',
                    data: [],
                    color: "#c41fac"
                }]
                $http({
                    method: 'POST',
                    url: "php/aseguramiento/liquidacion.php",
                    data: {
                        function: 'p_listar_cantidad_seccional',
                        fecha_inicio: $scope.fecha_inicio,
                        fecha_fin: $scope.fecha_fin
                    }
                }).then(function(response) {
                    swal({
                        title: 'Cargando información...'
                    });
                    swal.showLoading();
                    if (response.data.length != 0) {
                        swal.close();
                        var total = response.data.length;
                        // var total = response.data.length;
                        for (var i = 0; i < total; i++) {
                            $scope.seccionales_nombres.push(response.data[i].DEPARTAMENTO);
                            // $scope.valores[2].data.push(response.data[i].radicado);
                            // $scope.valores[1].data.push(response.data[i].validado);
                            // $scope.valores[3].data.push(response.data[i].error);
                            // $scope.valores[0].data.push(response.data[i].pendiente);
                            $scope.valores[1].data.push({ 'y': response.data[i].liquidacion, 'dataLabels': { 'enabled': true, 'format': response.data[i].liquidacion + "" } })
                            $scope.valores[0].data.push({ 'y': response.data[i].medico, 'dataLabels': { 'enabled': true, 'format': response.data[i].medico + "" } })
                            $scope.valores[2].data.push({ 'y': response.data[i].culminada, 'dataLabels': { 'enabled': true, 'format': response.data[i].culminada + "" } })
                            $scope.valores[3].data.push({ 'y': response.data[i].devolucion, 'dataLabels': { 'enabled': true, 'format': response.data[i].devolucion + "" } })
                            $scope.valores[4].data.push({ 'y': response.data[i].pendiente_adjuntos, 'dataLabels': { 'enabled': true, 'format': response.data[i].pendiente_adjuntos + "" } })
                            $scope.valores[5].data.push({ 'y': response.data[i].sin_cotizantes, 'dataLabels': { 'enabled': true, 'format': response.data[i].sin_cotizantes + "" } })

                        }
                        console.log($scope.seccionales_nombres);
                        console.log($scope.valores);

                        Highcharts.chart('barra', {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Prestacion por Seccionales'
                            },
                            xAxis: {
                                categories: $scope.seccionales_nombres,
                                crosshair: true
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: ''
                                }
                            },
                            credits: {
                                enabled: false
                            },
                            tooltip: {
                                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                    '<td style="padding:0"><b>{point.y} </b></td></tr>',
                                footerFormat: '</table>',
                                shared: true,
                                useHTML: true
                            },
                            plotOptions: {
                                column: {
                                    pointPadding: 0.2,
                                    borderWidth: 0
                                }
                            },
                            series: $scope.valores
                        });
                    }else{
                        swal('Información', "No se encontró  radicado para la fechas ingresadas", 'info');
                    }
                });
            }
            $scope.busqueda_tabla_estado = 0;
            $scope.usuario = "";
            $scope.filtroEspeciliadad = []
                //el rol de la persona
            $http({
                method: 'POST',
                url: "php/aseguramiento/liquidacion.php",
                data: {
                    function: 'p_obtener_perfil',
                    usuario: $scope.usuario
                }
            }).then(function(response) {
                $scope.donde_guardo = response.data;
            });

            //el rol de la persona
            $http({
                method: 'POST',
                url: "php/aseguramiento/liquidacion.php",
                data: {
                    function: 'p_lista_tipo_licencia',
                }
            }).then(function(response) {
                $scope.listados_tipo_licencias = response.data;
            });

            $scope.mostrar();

            $scope.mostrar_usuario = function() {
                $scope.donde_guardo = "";
            }

            // causales medica
            $http({
                method: 'POST',
                url: "php/aseguramiento/liquidacion.php",
                data: {
                    function: 'p_lista_causales',
                    codigo: "M",
                    valor: ""
                }
            }).then(function(response) {
                console.log(response.data);
                $scope.listado_causales_medicas = response.data;
                $scope.iniciar_componentes();

            });
            $scope.funcion_listas_causales_liquidacion = function(valor) {
                $scope.liquidacion.valor = "";
                $scope.liquidacion.causal_economicas = "";
                $scope.liquidacion.dias_pago = "";
                $scope.liquidacion.ibc = "";;
                $http({
                    method: 'POST',
                    url: "php/aseguramiento/liquidacion.php",
                    data: {
                        function: 'p_lista_causales',
                        codigo: "E",
                        valor: valor == true ? 'S' : 'N'
                    }
                }).then(function(response) {
                    console.log(response.data);
                    $scope.listado_causales_economicas = response.data;
                });
            }
            $scope.collapse = function(i) {

                switch (i) {
                    case 1:
                        if ($scope.formulario_radicado) {
                            $scope.formulario_radicado = false;
                            $scope.radicado = false;
                        } else {
                            $scope.formulario_radicado = true;
                            $scope.radicado = true;
                        }
                        break;
                    case 2:
                        if ($scope.formulario_medico) {
                            $scope.formulario_medico = false;
                            $scope.medico = false;
                        } else {
                            $scope.formulario_medico = true;
                            $scope.medico = true;
                        }
                        break;
                    case 3:
                        if ($scope.formulario_liquidacion) {
                            $scope.formulario_liquidacion = false;
                            $scope.liquidacion_mod = false;
                        } else {
                            $scope.formulario_liquidacion = true;
                            $scope.liquidacion_mod = true;
                        }
                        break;
                    case 4:
                        if ($scope.formulario_contable) {
                            $scope.formulario_contable = false;
                            $scope.contable = false;
                        } else {
                            $scope.formulario_contable = true;
                            $scope.contable = true;
                        }
                        break;
                    case 5:
                        if ($scope.traza) {
                            $scope.traza = false;
                            $scope.contable = false;
                        } else {
                            $scope.traza = true;
                            $scope.contable = true;
                        }
                        break;
                    case 6:
                        if ($scope.tabla_adjunto) {
                            $scope.tabla_adjunto = false;
                        } else {
                            $scope.tabla_adjunto = true;
                        }
                        break;
                    case 7:
                        if ($scope.devolucion) {
                            $scope.devolucion = false;
                        } else {
                            $scope.devolucion = true;
                        }
                        break;
                    default:


                }
            }
            $scope.que_edito = function(status) {
                // alert(status);
                $scope.edito_adjunto = 'N';
                $scope.liquidacion.estado_radica_adjunto = false;
                switch (status) {
                    case 'R':
                        $scope.liquidacion.estado_radica_adjunto = true;
                        $scope.EDITAR_RADICADO_FORMULARIO = true;
                        $scope.EDITAR_MEDICO_FORMULARIO = true;
                        $scope.EDITAR_LIQUIDACION_FORMULARIO = true;
                        $scope.liquidacion.aprovacion_liquidacion = true;
                        $scope.liquidacion.aprovacion_medico = true;
                        $scope.edito_adjunto = 'S';
                        $scope.EDITAR_DEVOLUCION = false;
                        $scope.buscar_archivos();
                        $scope.dato_anterior_incapacidad = $scope.liquidacion.fecha_incapacidad;
                        $scope.dato_anterior_duracion = $scope.liquidacion.duracion;
                        break;
                    case 'M':
                        $scope.EDITAR_RADICADO_FORMULARIO = true;
                        $scope.EDITAR_DEVOLUCION = true;

                        $scope.EDITAR_LIQUIDACION_FORMULARIO = true;

                        if ($scope.donde_guardo.valmed == 'S') {
                            $scope.EDITAR_MEDICO_FORMULARIO = "";
                            $scope.liquidacion.aprovacion_medico = true;

                        } else {
                            $scope.EDITAR_MEDICO_FORMULARIO = true;
                            $scope.liquidacion.aprovacion_medico = false;
                        }

                        // campos
                        $scope.liquidacion.proroga = "";
                        $scope.liquidacion.proroga_numero = "";
                        $scope.liquidacion.proroga_ubicacion = "";
                        $scope.liquidacion.proroga_dias = "";
                        $scope.liquidacion.fecha_ultima_mestruacion = "";
                        $scope.liquidacion.fecha_posible_parto = "";
                        $scope.liquidacion.semana_gestacion = "";
                        $scope.liquidacion.dias_prematuros = "";
                        $scope.liquidacion.partomul = "";
                        $scope.liquidacion.aprovacion_medico = true;
                        $scope.liquidacion.causal_medica = "";
                        $scope.liquidacion.observacion_medica = "";
                        break;
                    case 'L':
                            $scope.EDITAR_DEVOLUCION = true;

                        $scope.EDITAR_RADICADO_FORMULARIO = true;
                        $scope.EDITAR_MEDICO_FORMULARIO = true;
                        if ($scope.donde_guardo.valliq == 'S') {
                            $scope.EDITAR_LIQUIDACION_FORMULARIO = "";
                            $scope.liquidacion.aprovacion_liquidacion = true;

                        } else {
                            $scope.EDITAR_LIQUIDACION_FORMULARIO = true;
                            $scope.liquidacion.aprovacion_liquidacion = false;
                        }
                        // Validacion
                        $scope.liquidacion.aprovacion_medico = true;
                        // CAMPOS
                        $scope.liquidacion.valor = "";
                        $scope.liquidacion.causal_economicas = "";
                        $scope.liquidacion.dias_pago = "";
                        $scope.liquidacion.ibc = "";;
                        $scope.liquidacion.usuario = "";
                        break;
                    case 'C':
                            $scope.EDITAR_DEVOLUCION = true;

                        $scope.EDITAR_RADICADO_FORMULARIO = true;
                        $scope.EDITAR_MEDICO_FORMULARIO = true;
                        break;
                    case 'P':
                            $scope.EDITAR_DEVOLUCION = true;


                        $scope.EDITAR_RADICADO_FORMULARIO = true;
                        $scope.EDITAR_MEDICO_FORMULARIO = true;
                        $scope.EDITAR_LIQUIDACION_FORMULARIO = true;
                        $scope.liquidacion.aprovacion_liquidacion = true;
                        $scope.liquidacion.aprovacion_medico = true;
                        break;
                    case 'S':
                            $scope.EDITAR_DEVOLUCION = true;

                        $scope.liquidacion.estado_radica_adjunto = true;
                        $scope.EDITAR_RADICADO_FORMULARIO = true;
                        $scope.EDITAR_MEDICO_FORMULARIO = true;
                        $scope.EDITAR_LIQUIDACION_FORMULARIO = true;
                        $scope.liquidacion.aprovacion_liquidacion = true;
                        $scope.liquidacion.aprovacion_medico = true;
                        $scope.edito_adjunto = 'S';
                        $scope.buscar_archivos();
                        break;
                    default:
                        if ($scope.donde_guardo.radica == 'S') {
                            $scope.EDITAR_RADICADO_FORMULARIO = "";

                        } else {
                            $scope.EDITAR_RADICADO_FORMULARIO = true;
                        }
                        $scope.EDITAR_DEVOLUCION = true;

                        $scope.EDITAR_MEDICO_FORMULARIO = true;
                        $scope.EDITAR_LIQUIDACION_FORMULARIO = true;
                        $scope.liquidacion.aprovacion_liquidacion = true;
                        $scope.liquidacion.aprovacion_medico = true;
                        $scope.liquidacion.estado_radica_adjunto = true;
                        break;
                }
            }
            $scope.guardar_devolucion = function() {
                if (($scope.dato_anterior_incapacidad != $scope.liquidacion.fecha_incapacidad) ||
                    ($scope.dato_anterior_duracion != $scope.liquidacion.duracion)) {
                    $http({
                        method: 'POST',
                        url: "php/aseguramiento/liquidacion.php",
                        data: {
                            function: 'p_actualiza_prestacion',
                            v_ubicacion: $scope.liquidacion.ubicacion,
                            v_numero: $scope.liquidacion.numero,
                            v_f_inicio: $scope.liquidacion.fecha_incapacidad,
                            v_duracion: $scope.liquidacion.duracion
                        }
                    }).then(function(response) {
                        console.log(response.data);
                        if (response.data.codigo == 0) {
                            swal({ title: "Completado", text: response.data.mensaje, type: "success" });
                            $scope.iniciar_componentes();
                            $scope.tabla_activas('A');
                            $scope.check_option_estado = false;
                        } else { 
                            swal({ title: "Mensaje", text: response.data.mensaje, type: "warning" });

                        }

                    });
                }
                var total_adjunto_M = $scope.listar_archivos["ARCHIVOS_MEDICOS"].length;
                var total_adjunto_C = $scope.listar_archivos["ARCHIVOS_CONTABLES"].length;
                var subir_adjunto_devolcuiones = false;
                $scope.archivos_devoluciones = [];
                for (var i = 0; i < total_adjunto_M; i++) {
                    console.log($scope.listar_archivos["ARCHIVOS_MEDICOS"][i]);
                    if ($scope.listar_archivos["ARCHIVOS_MEDICOS"][i].archivobase) {
                        subir_adjunto_devolcuiones = true;
                        $scope.archivos_devoluciones.push({
                            archivo: $scope.listar_archivos["ARCHIVOS_MEDICOS"][i].archivobase,
                            ext: $scope.listar_archivos["ARCHIVOS_MEDICOS"][i].extensionarchivo,
                            codigo: $scope.listar_archivos["ARCHIVOS_MEDICOS"][i].codigo,
                            tipo: "M"
                        });
                    }
                }
                for (var i = 0; i < total_adjunto_C; i++) {
                    console.log($scope.listar_archivos["ARCHIVOS_CONTABLES"][i]);
                    if ($scope.listar_archivos["ARCHIVOS_CONTABLES"][i].archivobase) {
                        subir_adjunto_devolcuiones = true;
                        $scope.archivos_devoluciones.push({
                            archivo: $scope.listar_archivos["ARCHIVOS_CONTABLES"][i].archivobase,
                            ext: $scope.listar_archivos["ARCHIVOS_CONTABLES"][i].extensionarchivo,
                            codigo: $scope.listar_archivos["ARCHIVOS_CONTABLES"][i].codigo,
                            tipo: "C"
                        });
                    }
                }

                if (subir_adjunto_devolcuiones == true) {
                    var archivosasubir = JSON.stringify($scope.archivos_devoluciones);
                    $http({
                        method: 'POST',
                        url: "php/aseguramiento/liquidacion.php",
                        data: {
                            function: 'subir_archivos_devoluciones',
                            data: archivosasubir,
                            usuario: $scope.liquidacion.documento,
                            ubicacion: $scope.liquidacion.ubicacion,
                            numero: $scope.liquidacion.numero
                        }
                    }).then(function(response) {
                        if (response.data == 1) {
                            swal('Advertencia', 'Favor volver a intentar ingresando los soportes. si el error persite envie una mesa de ayuda a Soporte TIC con los adjuntos que esta intendando Subir', 'warning');
                        } else {
                            if (response.data.codigo == 1) {
                                swal('Advertencia', response.data.mensaje, 'warning');
                            } else {
                                swal({ title: "Completado", text: response.data.mensaje, type: "success" });
                                $scope.iniciar_componentes();
                                $scope.tabla_activas('A');
                                $scope.check_option_estado = true;
                            }
                        }
                    });
                }

            }
            $scope.formula_embarazos = function(fpp, fum) {

                var dias_gestacion = 280; //280 dia0s 
                if (fum != "" && fum != undefined && fum != null) {
                    $scope.liquidacion.fecha_posible_parto = "";
                    let hoy = fum;
                    let EnMilisegundos = 1000 * 60 * 60 * 24 * dias_gestacion;
                    let suma = hoy.getTime() + EnMilisegundos; //getTime devuelve milisegundos de esa fecha
                    let fechafinal = new Date(suma);
                    $scope.liquidacion.fecha_posible_parto = fechafinal;
                } else if (fpp != "" && fpp != undefined && fpp != null) {
                    $scope.liquidacion.fecha_ultima_mestruacion = "";
                    let hoy = fpp;
                    let EnMilisegundos = 1000 * 60 * 60 * 24 * dias_gestacion;
                    let suma = hoy.getTime() - EnMilisegundos; //getTime devuelve milisegundos de esa fecha
                    let fechafinal = new Date(suma);
                    $scope.liquidacion.fecha_ultima_mestruacion = fechafinal;
                } else {
                    $scope.liquidacion.fecha_ultima_mestruacion = "";
                    $scope.liquidacion.fecha_posible_parto = "";
                }
                //semana de gestaciones
                if ($scope.liquidacion.fecha_ultima_mestruacion != "" && $scope.liquidacion.fecha_ultima_mestruacion != undefined && $scope.liquidacion.fecha_ultima_mestruacion != null) {
                    let semana_gestacion = $scope.liquidacion.fecha_incapacidad.getTime() - $scope.liquidacion.fecha_ultima_mestruacion.getTime();
                    let semana = 1000 * 60 * 60 * 24 * 7;
                    semana_gestacion = semana_gestacion + semana;
                    semana_gestacion = semana_gestacion / 1000 / 60 / 60 / 24 / 7;
                    $scope.liquidacion.semana_gestacion = Math.round(semana_gestacion) - 1;
                }
                if ($scope.liquidacion.fecha_posible_parto != "" && $scope.liquidacion.fecha_posible_parto != undefined && $scope.liquidacion.fecha_posible_parto != null) {
                    if ($scope.liquidacion.semana_gestacion <= 36) {
                        let dias_prematuros = $scope.liquidacion.fecha_posible_parto.getTime() - $scope.liquidacion.fecha_incapacidad.getTime();
                        dias_prematuros = dias_prematuros / 1000 / 60 / 60 / 24;
                        $scope.liquidacion.dias_prematuros = Math.round(dias_prematuros);
                    } else {
                        $scope.liquidacion.dias_prematuros = 0;
                    }
                }



            }
            $scope.iniciar_componentes = function() {
                $scope.inicio = true;
                $http({
                    method: 'POST',
                    url: "php/aseguramiento/liquidacion.php",
                    data: {
                        function: 'p_listar_cantidad_concepto',
                    }
                }).then(function(response) {
                    if (response.data.length != 0) {
                        $scope.cantidad_conceptos = response.data
                        $scope.pie();
                        $scope.barra();
                    }
                });
            }


            $scope.mostrar_registro = function(concepto, numero, ubicacion, radicado) {
                $scope.inicio = false
                    // alert(codigo);
                if (concepto == 0) {
                    $scope.limpiar_liquidacion();
                    $scope.que_edito();
                } else {
                    swal({
                        title: 'Cargando información...'
                    });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/aseguramiento/liquidacion.php",
                        data: {
                            function: 'p_mostrar_radicado',
                            ubicacion: ubicacion,
                            numero: numero,
                            radicado: radicado,
                            concepto: concepto,

                        }
                    }).then(function(response) {
                        swal.close();
                        if (response.data.datos.length != 0) {
                            response.data.datos[0].duracion = parseInt(response.data.datos[0].duracion);
                            var fecha_for = response.data.datos[0].fecha_incapacidad.split("-");
                            response.data.datos[0].fecha_incapacidad = new Date(fecha_for[0], Number(fecha_for[1]) - 1, fecha_for[2]);
                            var fecha_for1 = response.data.datos[0].fecha_recibido.split("-");
                            response.data.datos[0].fecha_recibido = new Date(fecha_for1[0], Number(fecha_for1[1]) - 1, fecha_for1[2]);
                            var fecha_for2 = response.data.datos[0].fecha_accidente.split("-");
                            response.data.datos[0].fecha_accidente = new Date(fecha_for2[0], Number(fecha_for2[1]) - 1, fecha_for2[2]);
                            var fecha_for3 = response.data.datos[0].probable_parto.split("-");
                            response.data.datos[0].fecha_posible_parto = new Date(fecha_for3[0], Number(fecha_for3[1]) - 1, fecha_for3[2]);
                            var fecha_for4 = response.data.datos[0].ultima_mens.split("-");
                            response.data.datos[0].fecha_ultima_mestruacion = new Date(fecha_for4[0], Number(fecha_for4[1]) - 1, fecha_for4[2]);
                            var fecha_for5 = response.data.datos[0].fecha_termino.split("-");
                            response.data.datos[0].fecha_termino = new Date(fecha_for5[0], Number(fecha_for5[1]) - 1, fecha_for5[2]);
                            $scope.liquidacion = response.data.datos[0];
                            $scope.liquidacion.concepto = response.data.datos[0].concepto;
                            $scope.liquidacion.motivo = response.data.datos[0].motivo;
                            response.data.datos[0].fecha_termino != '' ? $scope.liquidacion.chk_fecha_opcional = true : $scope.liquidacion.chk_fecha_opcional = false; 
                            $scope.liquidacion.fecha_opcional_liquidacion = response.data.datos[0].fecha_termino;
                            //$scope.liquidacion.origen_radicacion == '' ? ($scope.liquidacion.origen_radicacion_nombre = 'No Aplica') : $scope.liquidacion.origen_radicacion;
                            $scope.liquidacion.origen_radicacion_nombre = ($scope.liquidacion.origen_radicacion == '' ? 'No Aplica' : $scope.liquidacion.origen_radicacion);
                            //$scope.liquidacion.origen_radicacion = response.data.datos[0].origen_radicacion == '' ? 'NO APLICA' : ;
                            // $scope.liquidacion.fecha_posible_parto = response.data.datos[0].probable_parto;
                            // $scope.liquidacion.fecha_ultima_mestruacion = response.data.datos[0].ultima_mens;
                            $scope.liquidacion.partomul = response.data.datos[0].parto_multiple == 'S' ? true : false;
                            $scope.liquidacion.semana_gestacion = response.data.datos[0].semanas;
                            $scope.liquidacion.dias_prematuros = response.data.datos[0].prematuro;
                            $scope.liquidacion.proroga = response.data.prec_prorroga == 'N' ? 'NO APLICA' : 'APLICA';
                            $scope.liquidacion.proroga_numero = response.data.pren_numero_pro;
                            $scope.liquidacion.proroga_ubicacion = response.data.pren_ubicacion_pro;
                            // $scope.liquidacion.proroga_dias = response.data.;
                            // $scope.liquidacion.dias_prematuros = response.data.datos[0].semanas;
                            $scope.json_tarea = response.data.tarea;
                            $scope.json_adjunto = response.data.adjunto;
                            $scope.json_devoluciones = response.data.devoluciones;
                            $scope.cambio_fecha($scope.liquidacion.fecha_incapacidad);
                            $scope.que_edito($scope.liquidacion.status);
                            $http({
                                method: 'POST',
                                url: "php/aseguramiento/liquidacion.php",
                                data: {
                                    function: 'p_lista_traza_observaciones',
                                    ubicacion: ubicacion,
                                    numero: numero,
                                    concepto: $scope.liquidacion.documento_pre,
                                }
                            }).then(function(response) {
                                $scope.json_observaciones = response.data;
                            });
                        } else {
                            swal('Información', "No se encontró el radicado ingresado", 'info');
                            $scope.limpiar_liquidacion();
                            $scope.inicio = true;
                        }
                    });
                }

            }

            $scope.formato_radicado = function() {
                    $window.open('views/aseguramiento/soporte/formato_radicacion.php?numero=' + $scope.liquidacion.numero + '&ubicacion=' + $scope.liquidacion.ubicacion, '_blank', "width=1080,height=1100");
                }
                $scope.formato_radicado2 = function() {
                    $window.open('views/aseguramiento/soporte/formato_transcripciones.php?numero=' + $scope.liquidacion.numero + '&ubicacion=' + $scope.liquidacion.ubicacion, '_blank', "width=1080,height=1100");
                }
                //////////////////////////////////////////////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////////////////////////////////////////////
                // tab1
            $scope.fecha = new Date();
            $scope.liquidacion = {
                concepto: '',
                motivo: '',
                fecha_incapacidad: '',
                fecha_recibido: $scope.fecha,
                fecha_parto: '',
                fecha_posible_parto: '',
                semana_gestacion: '',
                fecha_accidente: '',
                tipo_documento: '',
                documento: "",
                nombre: "",
                nacimiento: "",
                sexo_nombre: "",
                sexo: "",
                edad: "",
                concecutivo: "",
                requisito: false,
                duracion: "",
                radicado: "",
                ips: "",
                nombre_ips: "",
                radi: "",
                doc_medico: "",
                nombre_medico: "",
                nombre_especialidad: "",
                especialidad_medico: "",
                diagnostico: "",
                nombre_diagnostico: "",
                estado: "",
                status: "",
                descripcion: "",
                Causas: "",
                proroga: "",
                proroga_numero: "",
                proroga_ubicacion: "",
                proroga_dias: "",
                fecha_ultima_mestruacion: "",
                fecha_posible_parto: "",
                semana_gestacion: "",
                dias_prematuros: "",
                partomul: "",
                aprovacion_medico: true,
                causal_medica: "",
                observacion_medica: "",
                chk_fecha_opcional: false,
                fecha_opcional_liquidacion: '',
            };

            $scope.empresa = {
                documento: "",
                tipo_documento: "",
                nombre: "",
                persona_cargo: "",
                telefono: "",
                correo: ""
            };

            //fecha de revibido tiene que ser igual a la fecha emitido al sistema
            $scope.liquidacion.fecha_recibido = $scope.fecha;

            //llenado de Select 
            //select de docuemento
            // $scope.bucar_documento = function() {
            //     afiliacionHttp.obtenerDocumento().then(function(response) {
            //         $scope.listar_documentos = response.Documento;
            //         $scope.liquidacion.tipo_documento = "";

            //     })
            // }
            $scope.buscar_concepto = function() {
                $http({
                    method: 'POST',
                    url: "php/aseguramiento/liquidacion.php",
                    data: {
                        function: 'p_lista_concepto',
                    }
                }).then(function(response) {
                    if (response.data.length != 0) {
                        $scope.listar_concepto = response.data;
                        $scope.ver_ad_medicos = true;
                        $scope.ver_ad_contables = true;
                        $scope.liquidacion.concepto = "";
                        $scope.liquidacion.motivo = "";
                        $scope.lista_motivo = [];
                    }
                });
            }
            $scope.buscar_motivo = function() {
                    if ($scope.liquidacion.concepto != '') {
                        $http({
                            method: 'POST',
                            url: "php/aseguramiento/liquidacion.php",
                            data: {
                                function: 'p_lista_motivo',
                                concepto: $scope.liquidacion.concepto
                            }
                        }).then(function(response) {
                            if (response.data.length != 0) {
                                $scope.lista_motivo = response.data;
                                $scope.liquidacion.motivo = "";
                            }
                        });
                    }
                }
                //fin del llenado de los Select

            // fehca
            $scope.cambio_fecha = function(fechaf) {
                $scope.liquidacion.fecha_final_incapacidad = "";
                if (fechaf != "" && fechaf != undefined && fechaf != null &&
                    $scope.liquidacion.duracion != "" && $scope.liquidacion.duracion != undefined
                ) {
                    let hoy = fechaf;
                    let semanaEnMilisegundos = 1000 * 60 * 60 * 24 * ($scope.liquidacion.duracion - 1);
                    let suma = hoy.getTime() + semanaEnMilisegundos; //getTime devuelve milisegundos de esa fecha
                    let fechafinal = new Date(suma);
                    $scope.liquidacion.fecha_final_incapacidad = fechafinal;
                }
            }

            $scope.p_busqueda_prestaciones = function(cadena) {
                swal({
                    title: 'Cargando información...'
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/aseguramiento/liquidacion.php",
                    data: {
                        function: 'p_busqueda_prestaciones',
                        v_valor: cadena
                    }
                }).then(function(response) {
                    swal.close();
                    $scope.busqueda_tabla_estado = 1;
                    $scope.reporte = response.data;
                    $scope.initPaginacion($scope.reporte);
                });
            }

            //limpia el formulario 
            $scope.limpiar_liquidacion = function() {
                $scope.liquidacion = {
                    concepto: '',
                    motivo: '',
                    fecha_incapacidad: '',
                    fecha_recibido: $scope.fecha,
                    fecha_parto: '',
                    fecha_posible_parto: '',
                    semana_gestacion: '',
                    fecha_accidente: '',
                    tipo_documento: '',
                    documento: "",
                    nombre: "",
                    nacimiento: "",
                    sexo_nombre: "",
                    sexo: "",
                    edad: "",
                    concecutivo: "",
                    requisito: false,
                    duracion: "",
                    radicado: "",
                    ips: "",
                    nombre_ips: "",
                    radi: "",
                    doc_medico: "",
                    nombre_medico: "",
                    nombre_especialidad: "",
                    especialidad_medico: "",
                    diagnostico: "",
                    nombre_diagnostico: "",
                    estado: "",
                    status: "",
                    descripcion: "",
                    Causas: "",
                    proroga: "",
                    proroga_numero: "",
                    proroga_ubicacion: "",
                    proroga_dias: "",
                    fecha_ultima_mestruacion: "",
                    fecha_posible_parto: "",
                    semana_gestacion: "",
                    dias_prematuros: "",
                    partomul: "",
                    aprovacion_medico: true,
                    causal_medica: "",
                    observacion_medica: "",

                };
                $scope.json_tarea = [];
                $scope.json_adjunto = [];
                $scope.listar_archivos = [];
                $scope.EDITAR_RADICADO_FORMULARIO = '';

            }

            $scope.buscar_afiliado = function() {
                $scope.liquidacion.nombre = "";
                $scope.liquidacion.nacimiento = "";
                $scope.liquidacion.sexo = "";
                $scope.liquidacion.sexo_nombre = "";
                $scope.liquidacion.edad = "";
                $scope.liquidacion.diagnostico = "",
                    $scope.liquidacion.nombre_diagnostico = "",
                    $scope.liquidacion.tutela = "";
                $scope.liquidacion.nombre_diagnostico = "";
                $scope.liquidacion.radicado_tutela = ""
                $scope.liquidacion.radicado_tutela_codigo = "";
                $scope.liquidacion.tercero_nombre = "";
                $scope.liquidacion.tercero = "";
                if ($scope.liquidacion.documento != '' && $scope.liquidacion.tipo_documento != '') {
                    $http({
                        method: 'POST',
                        url: "php/aseguramiento/liquidacion.php",
                        data: {
                            function: 'p_obtener_datos_basicos',
                            documento: $scope.liquidacion.documento,
                            tipo_documento: $scope.liquidacion.tipo_documento
                        }
                    }).then(function(response) {
                        if (response.data.length != 0) {
                            $scope.liquidacion.nombre = response.data.NombreCompleto,
                                $scope.liquidacion.nacimiento = response.data.FechaNacimiento,
                                $scope.liquidacion.sexo = response.data.SexoCodigo;
                            $scope.liquidacion.sexo_nombre = response.data.Sexo;
                            $scope.liquidacion.edad = response.data.edaddias;
                        }
                    });
                }
            }
            $scope.buscar_empresa = function() {

                $scope.empresa.nombre = "";
                $scope.empresa_nombre = false;
                if ($scope.empresa.documento != '' && $scope.empresa.tipo_documento != '') {
                    $http({
                        method: 'POST',
                        url: "php/aseguramiento/liquidacion.php",
                        data: {
                            function: 'p_buscar_aportante',
                            documento: $scope.empresa.documento,
                            tipo_documento: $scope.empresa.tipo_documento
                        }
                    }).then(function(response) {
                        if (response.data.length != 0) {
                            $scope.empresa.nombre = response.data[0].RAZON_SOCIAL;
                            $scope.empresa_nombre = true;
                        }
                    });
                }
            }

            $scope.guardar_empresa = function() {
                if ($scope.empresa.documento != '' &&
                    $scope.empresa.tipo_documento != '' &&
                    $scope.empresa.nombre != '' &&
                    $scope.empresa.persona_cargo != '' &&
                    $scope.empresa.telefono != '' &&
                    $scope.empresa.correo != '' &&
                    $scope.empresa.tipo_coti != ''
                ) {
                    // swal('Completado', 'La relacion laboral esta en estado Pendiente, para seguir con su registro espere respuesta desde Movilidad', 'success');
                    $scope.liquidacion.tercero_nombre = 'Estado Pendiente ' + $scope.empresa.nombre;
                    $scope.liquidacion.tercero = $scope.empresa.documento;
                    $scope.liquidacion.tipo_tipo_cotizante = $scope.empresa.tipo_coti;
                    $scope.liquidacion.estado_cotizante = "N";
                    this.closeThisDialog();
                    $scope.buscar_archivos();
                } else {
                    swal('Información', "Favor llenar todos los Campos.", 'error');
                    $scope.liquidacion.tercero = "";
                    $scope.liquidacion.tipo_tipo_cotizante = "";
                    $scope.liquidacion.tercero = "";
                    this.closeThisDialog();
                    $scope.buscar_archivos();
                }
            }

            $scope.guardar_bd_empresa = function(ubicacion, numero) {
                if ($scope.liquidacion.estado_cotizante == "N") {
                    $http({
                        method: 'POST',
                        url: "php/aseguramiento/liquidacion.php",
                        data: {
                            function: 'p_inserta_mesa_ayuda',
                            v_ubicacion: ubicacion,
                            v_numero: numero,
                            v_tipo_doc: $scope.empresa.tipo_documento,
                            v_documento: $scope.empresa.documento,
                            v_nombre_aportante: $scope.empresa.nombre,
                            v_tipo_doc_afil: $scope.liquidacion.tipo_documento,
                            v_doc_afil: $scope.empresa.documento,
                            v_persona: $scope.empresa.persona_cargo,
                            v_telefono: $scope.empresa.telefono,
                            v_correo: $scope.empresa.correo
                        }
                    }).then(function(response) {
                        if ($scope.response.data.codigo == 0) {
                            $scope.mensaje = 'Se Creo una mesa de ayuda para la afiliación. Numero' + response.data.numero_ma;

                            function letsWaitALittle() {
                                swal('Información', $scope.mensaje, 'error');
                            }
                            setTimeout(letsWaitALittle, 100);
                        } else {
                            swal('Información', response.data.mensaje, 'error');
                        }
                    });
                }

            }

            //buscar en modal
            // El modal es escogido de uno que ya esta en funcionamiento que es el de codigo urgencia
            $scope.buscar_modal = function(tipo) {
                $scope.tipo = tipo;
                switch (tipo) {
                    case 'I':
                        $scope.nombre_tipo = "Selecciona IPS prestadora"
                        break;
                    case 'E':
                        $scope.nombre_tipo = "Selecciona la Especialidad del Medico"
                        break;
                    case "D":
                        $scope.nombre_tipo = "Selecciona el Diagnostico "
                        break;
                    case "T":
                        $scope.nombre_tipo = "Selecciona el Empleador "
                        break;
                    default:

                }
                $scope.dialogNewAfil = ngDialog.open({
                    template: 'views/autorizaciones/modal_filtrar.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope
                });


            }
            $scope.buscar_historial = function() {
                //if($scope.donde_guardo.valmed=='S' && !$scope.EDITAR_MEDICO_FORMULARIO){
                    $http({
                        method: 'POST',
                        url: "php/aseguramiento/liquidacion.php",
                        data: {
                            function: 'p_obtener_historial',
                            documento: $scope.liquidacion.documento,
                            tipo_documento: $scope.liquidacion.tipo_documento
                        }
                    }).then(function(response) {
                        if (response.data.length != 0) {
                            $scope.dialogNewAfil = ngDialog.open({
                                template: 'views/aseguramiento/modal_historial_prestaciones.html',
                                className: 'ngdialog-theme-plain',
                                scope: $scope
                            });
                            $scope.listar_historial = response.data;
                        } else {
                            $scope.listar_historial = "";
                            swal('Información', "El paciente no tienes Liquidaciones de prestaciones Registradas", 'error');
                        }
                    });
               // }
               
            }
            $scope.descargafile = function (ruta) {
                swal({
                    title: 'Cargando información...'
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/juridica/tutelas/functutelas.php",
                    data: {
                        function: 'descargaAdjunto',
                        ruta: ruta
                    }
                }).then(function (response) {
                    swal.close();
                    //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
                    window.open("temp/" + response.data);
                });
            }
            $scope.buscar_archivos = function() {
                if ($scope.liquidacion.tercero) {
                    $http({
                        method: 'POST',
                        url: "php/aseguramiento/liquidacion.php",
                        data: {
                            function: 'p_lista_archivos',
                            v_documento: $scope.liquidacion.tercero,
                            concepto: $scope.liquidacion.concepto,
                            tipo: $scope.liquidacion.tipo_tipo_cotizante,
                            numero:$scope.liquidacion.numero,
                            ubicacion:$scope.liquidacion.ubicacion
                        }
                    }).then(function(response) {
                        if (response.data.length != 0) {
                            $scope.listar_archivos = response.data;
                        } else {
                            $scope.listar_archivos = "";
                            swal('Información', "Para este concepto, los Archivos aun no estan parametrizados", 'error');
                        }
                    });
                }
            }
            $scope.buscar_relacion_laboral = function() {
                $scope.nombre_tipo = "Selecciona la Tutela relacionada a la Prestacion"
                $http({
                    method: 'POST',
                    url: "php/aseguramiento/liquidacion.php",
                    data: {
                        function: 'p_obtener_empleador',
                        documento: $scope.liquidacion.documento,
                        tipo_documento: $scope.liquidacion.tipo_documento
                    }
                }).then(function(response) {
                    if (response.data.length != 0) {
                        $scope.dialogNewAfil = ngDialog.open({
                            template: 'views/aseguramiento/modal_relacion_laboral.html',
                            className: 'ngdialog-theme-plain',
                            scope: $scope
                        });
                        $scope.mostrar_listados = true;
                        $scope.listar_relacion_laboral = response.data;
                    } else {
                        $scope.mostrar_listados = false;
                        $scope.listar_relacion_laboral = "";
                        swal('Información', "El afiliado no registra ninguna relación laboral. Para enviar notificación a la área de afiliación, llene el siguiente formulario con los datos de contacto del empleador", 'info');
                        $scope.dialogNewAfil = ngDialog.open({
                            template: 'views/aseguramiento/modal_relacion_laboral.html',
                            className: 'ngdialog-theme-plain',
                            scope: $scope
                        });
                    }
                });
            }
            $scope.colocar_relacion_laboral = function(codigo, nombre, tipo) {
                $('#DM' + $scope.liquidacion.tercero).removeClass('eleacti');
                $("#DM" + codigo).addClass('eleacti');
                $scope.liquidacion.tercero_nombre = codigo + '  ' + nombre;
                $scope.liquidacion.tercero = codigo;
                $scope.liquidacion.tipo_tipo_cotizante = tipo;
                $scope.buscar_archivos();

            }
            $scope.quitar_relacion_laboral = function() {

                $('#DM' + $scope.liquidacion.tercero).removeClass('eleacti');
                $scope.liquidacion.tercero_nombre = '';
                $scope.liquidacion.tercero = '';
                $scope.buscar_archivos();
            }
            $scope.buscar_tutelas = function() {
                $scope.nombre_tipo = "Selecciona la Tutela relacionada a la Prestacion"
                $http({
                    method: 'POST',
                    url: "php/aseguramiento/liquidacion.php",
                    data: {
                        function: 'p_obtener_tutelas',
                        documento: $scope.liquidacion.documento,
                        tipo_documento: $scope.liquidacion.tipo_documento
                    }
                }).then(function(response) {
                    if (response.data.length != 0) {
                        $scope.dialogNewAfil = ngDialog.open({
                            template: 'views/aseguramiento/modal_buscar_tutelas.html',
                            className: 'ngdialog-theme-plain',
                            scope: $scope
                        });
                        $scope.listar_tutelas = response.data;
                    } else {
                        $scope.listar_tutelas = "";
                        swal('Información', "El paciente no tienes tutelas registradas", 'error');
                    }
                });
            }
            $scope.colocar_tutela = function(radicado, motivo) {
                $('#DM' + $scope.liquidacion.radicado_tutela_codigo).removeClass('eleacti');
                $("#DM" + radicado).addClass('eleacti');
                $scope.liquidacion.radicado_tutela = radicado + " - " + motivo;
                $scope.liquidacion.radicado_tutela_codigo = radicado;
            }
            $scope.quitar_tutelas = function(radicado) {
                $('#DM' + $scope.liquidacion.radicado_tutela).removeClass('eleacti');
                $scope.liquidacion.radicado_tutela = '';
            }
            $scope.elegir = function(codigo, nombre) {
                $("#DM" + codigo).addClass('eleacti');
                $('#DM' + codigo).siblings().removeClass('eleacti');
                // $scope.hovering=true;

                switch ($scope.tipo) {
                    case 'I':
                        $scope.liquidacion.ips = codigo;
                        $scope.liquidacion.nombre_ips = codigo + '  ' + nombre;
                        break;
                    case 'E':
                        $scope.liquidacion.nombre_especialidad = codigo + '  ' + nombre;
                        $scope.liquidacion.especialidad_medico = codigo;
                        break;
                    case 'T':
                        $scope.liquidacion.tercero_nombre = codigo + '  ' + nombre;
                        $scope.liquidacion.tercero = codigo;
                        break;
                    case "D":
                        $scope.liquidacion.diagnostico = codigo;
                        $scope.liquidacion.nombre_diagnostico = nombre;
                        break;
                    default:

                }
            }
            $scope.removeSeleccion = function() {

                switch ($scope.tipo) {
                    case 'I':
                        $('#DM' + $scope.liquidacion.ips).removeClass('eleacti');
                        $scope.liquidacion.ips = '';
                        $scope.liquidacion.nombre_ips = '';
                        break;
                        break;
                    case 'E':
                        $('#DM' + $scope.liquidacion.especialidad_medico).removeClass('eleacti');
                        $scope.liquidacion.nombre_especialidad = '';
                        $scope.liquidacion.especialidad_medico = '';
                        break;
                    case 'T':
                        $('#DM' + $scope.liquidacion.tercero).removeClass('eleacti');
                        $scope.liquidacion.tercero = '';
                        $scope.liquidacion.tercero_nombre = '';
                        break;
                    case "D":
                        $('#DM' + $scope.diagnostico).removeClass('eleacti');
                        $scope.liquidacion.diagnostico = '';
                        $scope.liquidacion.nombre_diagnostico = '';
                        break;
                    default:

                }
            }
            $scope.Find_Ips_enter = function(keyEvent) {
                if (keyEvent.which === 8) {
                    $scope.liquidacion.nombre_ips = "";
                }

            }
            $scope.Buscar_Ips = function() {
                if ($scope.liquidacion.nombre_ips != "" && $scope.liquidacion.nombre_ips.length >= 4) {
                    $http({
                        method: 'POST',
                        url: "php/aseguramiento/liquidacion.php",
                        data: {
                            function: 'p_lista_prestadores',
                            codigo: $scope.liquidacion.nombre_ips
                        }
                    }).then(function(response) {
                        if (response.data.length == 0) {
                            $scope.ListarResultado = "";
                        } else {
                            if (response.data.length == 1) {
                                $scope.FillTextbox_Ips(response.data[0].CODIGO, response.data[0].NOMBRE);
                            } else {
                                $scope.ListarResultado = response.data;
                                $scope.Filter_Ips = response.data;
                            }

                        }
                    });
                }
            }
            $scope.Complete_Ips = function(string) {
                $scope.Buscar_Ips();
            }
            $scope.FillTextbox_Ips = function(codigo, nombre) {
                $scope.liquidacion.nombre_ips = codigo + ' - ' + nombre;
                $scope.liquidacion.nombre_ips_tempo = codigo + ' - ' + nombre;
                $scope.liquidacion.ips = codigo;
                $scope.Filter_Ips = null;
            }
            $scope.Blur_Ips = function() {

                }
                // esto es la parte mia
            $scope.seleccion = -1;
            $scope.captura_evento_teclado = function(keyEvent, tipo) {
                switch (tipo) {
                    case 'E':
                        if (keyEvent.which === 40) {
                            if ($scope.filtroEspeciliadad.length != 0) {
                                for (var s = 0; s < $scope.filtroEspeciliadad.length; s++) {
                                    $scope.filtroEspeciliadad[s].ESTADO = false;
                                }
                                $scope.seleccion = $scope.seleccion >= ($scope.filtroEspeciliadad.length - 1) ? 0 : $scope.seleccion + 1;
                                $scope.filtroEspeciliadad[$scope.seleccion].ESTADO = true;
                                var id = $scope.filtroEspeciliadad[$scope.seleccion].CODIGO;
                                document.querySelector('#list-group-especialidad').scrollTo(0, document.querySelector('#DM' + id).offsetTop);

                            }

                        } else if (keyEvent.which === 38) {
                            for (var s = 0; s < $scope.filtroEspeciliadad.length; s++) {
                                $scope.filtroEspeciliadad[s].ESTADO = false;
                            }
                            if ($scope.seleccion <= 0) {
                                $scope.seleccion = -1;
                            } else {
                                $scope.seleccion = $scope.seleccion - 1;
                                $scope.filtroEspeciliadad[$scope.seleccion].ESTADO = true;
                                var id = $scope.filtroEspeciliadad[$scope.seleccion].CODIGO;
                                document.querySelector('#list-group-especialidad').scrollTo(0, document.querySelector('#DM' + id).offsetTop)
                            }

                        } else if (keyEvent.which === 13) {
                            if ($scope.seleccion != -1) {
                                $scope.seleccionar_combo($scope.filtroEspeciliadad[$scope.seleccion].CODIGO, $scope.filtroEspeciliadad[$scope.seleccion].NOMBRE, tipo);
                            }
                        } else {
                            $scope.buscar_listados(tipo);
                            $scope.seleccion = -1;
                        }
                        break;
                    case 'D':
                        if (keyEvent.which === 40) {
                            if ($scope.filtroDiagnostico.length != 0) {
                                for (var s = 0; s < $scope.filtroDiagnostico.length; s++) {
                                    $scope.filtroDiagnostico[s].ESTADO = false;
                                }
                                $scope.seleccion = $scope.seleccion >= ($scope.filtroDiagnostico.length - 1) ? 0 : $scope.seleccion + 1;
                                $scope.filtroDiagnostico[$scope.seleccion].ESTADO = true;
                                var id = $scope.filtroDiagnostico[$scope.seleccion].Codigo;
                                document.querySelector('#list-group-diagnostico').scrollTo(0, document.querySelector('#DM' + id).offsetTop);

                            }

                        } else if (keyEvent.which === 38) {
                            for (var s = 0; s < $scope.filtroDiagnostico.length; s++) {
                                $scope.filtroDiagnostico[s].ESTADO = false;
                            }
                            if ($scope.seleccion <= 0) {
                                $scope.seleccion = -1;
                            } else {
                                $scope.seleccion = $scope.seleccion - 1;
                                $scope.filtroDiagnostico[$scope.seleccion].ESTADO = true;
                                var id = $scope.filtroDiagnostico[$scope.seleccion].Codigo;
                                document.querySelector('#list-group-diagnostico').scrollTo(0, document.querySelector('#DM' + id).offsetTop)
                            }

                        } else if (keyEvent.which === 13) {
                            if ($scope.seleccion != -1) {
                                $scope.seleccionar_combo($scope.filtroDiagnostico[$scope.seleccion].Codigo, $scope.filtroDiagnostico[$scope.seleccion].Nombre, tipo);
                            }
                        } else {
                            $scope.buscar_listados(tipo);
                            $scope.seleccion = -1;
                        }
                        break;
                    case 'I':
                        if (keyEvent.which === 40) {
                            if ($scope.Filter_Ips.length != 0) {
                                for (var s = 0; s < $scope.Filter_Ips.length; s++) {
                                    $scope.Filter_Ips[s].ESTADO = false;
                                }
                                $scope.seleccion = $scope.seleccion >= ($scope.Filter_Ips.length - 1) ? 0 : $scope.seleccion + 1;
                                $scope.Filter_Ips[$scope.seleccion].ESTADO = true;
                                var id = $scope.Filter_Ips[$scope.seleccion].CODIGO;
                                document.querySelector('#list-group-ips').scrollTo(0, document.querySelector('#DM' + id).offsetTop);

                            }

                        } else if (keyEvent.which === 38) {
                            for (var s = 0; s < $scope.Filter_Ips.length; s++) {
                                $scope.Filter_Ips[s].ESTADO = false;
                            }
                            if ($scope.seleccion <= 0) {
                                $scope.seleccion = -1;
                            } else {
                                $scope.seleccion = $scope.seleccion - 1;
                                $scope.Filter_Ips[$scope.seleccion].ESTADO = true;
                                var id = $scope.Filter_Ips[$scope.seleccion].CODIGO;
                                document.querySelector('#list-group-ips').scrollTo(0, document.querySelector('#DM' + id).offsetTop)
                            }

                        } else if (keyEvent.which === 13) {
                            if ($scope.seleccion != -1) {
                                $scope.seleccionar_combo($scope.Filter_Ips[$scope.seleccion].CODIGO, $scope.Filter_Ips[$scope.seleccion].NOMBRE, tipo);
                            }
                        } else {
                            $scope.buscar_listados(tipo);
                            $scope.seleccion = -1;
                        }
                        break;
                    default:
                        break;
                }

            }
            $scope.buscar_listados = function(tipo) {
                switch (tipo) {
                    case 'E':
                        if ($scope.liquidacion.nombre_especialidad.length >= 3) {
                            $http({
                                method: 'POST',
                                url: "php/aseguramiento/liquidacion.php",
                                data: {
                                    function: 'p_obtener_especialidades',
                                    codigo: $scope.liquidacion.nombre_especialidad
                                }
                            }).then(function(response) {
                                if (response.data.length == 0) {
                                    $scope.ListarResultado = "";
                                } else {
                                    if (response.data.length == 1) {
                                        $scope.seleccionar_combo(response.data[0].CODIGO, response.data[0].NOMBRE, tipo);
                                    } else {
                                        $scope.filtroEspeciliadad = response.data;
                                        $scope.ListarResultado = response.data;
                                        for (var s = 0; s < $scope.filtroEspeciliadad.length; s++) {
                                            $scope.filtroEspeciliadad[s].ESTADO = false;
                                        }
                                    }
                                }
                            });
                        }
                        break;
                    case 'D':
                        if ($scope.liquidacion.nombre_diagnostico.length >= 3) {
                            $http({
                                method: 'POST',
                                url: "php/aseguramiento/liquidacion.php",
                                data: {
                                    function: 'obtenerdiagnostico',
                                    coincidencia: $scope.liquidacion.nombre_diagnostico,
                                    sexo: $scope.liquidacion.sexo,
                                    edad: $scope.liquidacion.edad
                                }
                            }).then(function(response) {
                                if (response.data.length == 0) {
                                    $scope.ListarResultado = [];
                                } else {
                                    if (response.data.length == 1) {
                                        $scope.seleccionar_combo(response.data[0].Codigo, response.data[0].Nombre, tipo);
                                    } else {
                                        $scope.ListarResultado = response.data;
                                        $scope.filtroDiagnostico = response.data;
                                        for (var s = 0; s < $scope.filtroDiagnostico.length; s++) {
                                            $scope.filtroDiagnostico[s].ESTADO = false;
                                        }
                                    }
                                }
                            });
                        }
                        break;
                    case 'I':
                        if ($scope.liquidacion.nombre_ips != "" && $scope.liquidacion.nombre_ips.length >= 5) {
                            $http({
                                method: 'POST',
                                url: "php/aseguramiento/liquidacion.php",
                                data: {
                                    function: 'p_lista_prestadores',
                                    codigo: $scope.liquidacion.nombre_ips
                                }
                            }).then(function(response) {
                                if (response.data.length == 0) {
                                    $scope.ListarResultado = "";
                                } else {
                                    if (response.data.length == 1) {
                                        $scope.seleccionar_combo(response.data[0].CODIGO, response.data[0].NOMBRE, tipo);
                                    } else {
                                        $scope.ListarResultado = response.data;
                                        $scope.Filter_Ips = response.data;
                                        for (var s = 0; s < $scope.Filter_Ips.length; s++) {
                                            $scope.Filter_Ips[s].ESTADO = false;
                                        }
                                    }

                                }
                            });
                        }
                        break;
                    default:
                        break;
                }


            }
            $scope.completar_imput = function(cadena, tipo) {
                switch (tipo) {
                    case 'E':
                        $scope.buscar_listados(tipo);
                        // $('#list-group-especialidad').css({ width: $('#nombre_especialidad')[0].offsetWidth });
                        // if ($scope.ListarResultado != null && $scope.ListarResultado != 0) {
                        //     if ($scope.liquidacion.nombre_especialidad != '' && $scope.liquidacion.nombre_especialidad != null) {
                        //         var output = [];
                        //         angular.forEach($scope.ListarResultado, function (ListarResultado) {
                        //             if (ListarResultado.NOMBRE.toUpperCase().indexOf(cadena.toUpperCase()) >= 0 || ListarResultado.CODIGO.toString().indexOf(cadena) >= 0) {
                        //                 output.push({ "CODIGO": ListarResultado.CODIGO, "NOMBRE": ListarResultado.NOMBRE.toUpperCase() });
                        //             }
                        //         });
                        //         $scope.filtroEspeciliadad = output;
                        //     }
                        // }
                        break;
                    case 'D':
                        $scope.buscar_listados(tipo);
                        // $('#list-group-diagnostico').css({ width: $('#nombre_diagnostico')[0].offsetWidth });
                        // if ($scope.ListarResultado != null && $scope.ListarResultado != 0) {
                        //     if ($scope.liquidacion.nombre_diagnostico != '' && $scope.liquidacion.nombre_diagnostico != null) {
                        //         var output = [];
                        //         angular.forEach($scope.ListarResultado, function (ListarResultado) {
                        //             if (ListarResultado.Nombre.toUpperCase().indexOf(cadena.toUpperCase()) >= 0 || ListarResultado.Codigo.toString().indexOf(cadena) >= 0) {
                        //                 output.push({ "Codigo": ListarResultado.Codigo, "Nombre": ListarResultado.Nombre.toUpperCase() });
                        //             }
                        //         });
                        //         $scope.filtroDiagnostico = output;
                        //     }
                        // }
                        break;
                    case 'I':
                        $scope.buscar_listados(tipo);
                        // $('#list-group-ips').css({ width: $('#nombre_ips')[0].offsetWidth });
                        // if ($scope.ListarResultado != null && $scope.ListarResultado != 0) {
                        //     if ($scope.liquidacion.nombre_ips != '' && $scope.liquidacion.nombre_ips != null) {
                        //         var output = [];
                        //         angular.forEach($scope.ListarResultado, function (ListarResultado) {
                        //             if (ListarResultado.NOMBRE.toUpperCase().indexOf(cadena.toUpperCase()) >= 0 || ListarResultado.CODIGO.toString().indexOf(cadena) >= 0) {
                        //                 output.push({ "CODIGO": ListarResultado.CODIGO, "NOMBRE": ListarResultado.NOMBRE.toUpperCase() });
                        //             }
                        //         });
                        //         $scope.Filter_Ips = output;
                        //     }
                        // }
                        // break;
                    default:
                        break;
                }
            }
            $scope.seleccionar_combo = function(codigo, nombre, tipo) {
                switch (tipo) {
                    case 'E':
                        $scope.liquidacion.nombre_especialidad = codigo + ' - ' + nombre;
                        $scope.liquidacion.especialidad = codigo;
                        $scope.filtroEspeciliadad = [];
                        $scope.seleccion = -1
                        break;
                    case 'I':
                        $scope.liquidacion.nombre_ips = codigo + ' - ' + nombre;
                        $scope.liquidacion.ips = codigo;
                        $scope.Filter_Ips = [];
                        $scope.seleccion = -1
                        break;
                    case 'D':
                        $scope.liquidacion.nombre_diagnostico = codigo + ' - ' + nombre;
                        $scope.liquidacion.diagnostico = codigo;
                        $scope.filtroDiagnostico = [];
                        $scope.seleccion = -1
                        break;
                    default:
                        break;
                }
            }
            $scope.borrar_listado = function() {
                $scope.ListarResultado = null;
            }

            //Cargar los listados desde base de datos 
            //i= buscar ips
            //d=diagnostico
            $scope.cargarListados = function(texto) {
                $scope.ListarResultado = "";
                $scope.coincidencia = texto
                switch ($scope.tipo) {
                    case 'I':
                        if (($scope.coincidencia != "" && $scope.coincidencia.length >= 6)) {
                            $http({
                                method: 'POST',
                                url: "php/aseguramiento/liquidacion.php",
                                data: {
                                    function: 'p_lista_prestadoresHO',
                                    codigo: $scope.coincidencia
                                }
                            }).then(function(response) {
                                if (response.data.length == 0) {
                                    $scope.ListarResultado = "";
                                } else {
                                    $scope.ListarResultado = response.data;
                                }
                            });
                        }
                        break;
                    case 'E':
                        if (($scope.coincidencia != "" && $scope.coincidencia.length >= 3)) {
                            $http({
                                method: 'POST',
                                url: "php/aseguramiento/liquidacion.php",
                                data: {
                                    function: 'p_obtener_especialidades',
                                    codigo: $scope.coincidencia
                                }
                            }).then(function(response) {
                                if (response.data.length == 0) {
                                    $scope.ListarResultado = "";
                                } else {
                                    $scope.ListarResultado = response.data;
                                }
                            });
                        }
                        break;

                    case "D":
                        if (($scope.coincidencia != "" && $scope.coincidencia.length >= 3)) {
                            $http({
                                method: 'POST',
                                url: "php/autorizaciones/esoa/esoa.php",
                                data: {
                                    function: 'obtenerdiagnostico',
                                    coincidencia: $scope.coincidencia,
                                    sexo: $scope.liquidacion.sexo,
                                    edad: $scope.liquidacion.edad,
                                    hijo: 0
                                }
                            }).then(function(response) {
                                if (response.data.length == 0) {
                                    $scope.ListarResultado = "";
                                } else {
                                    var output = [];
                                    angular.forEach(response.data, function(datos) {
                                        output.push({ "CODIGO": datos.Codigo, "NOMBRE": datos.Nombre.toUpperCase() });
                                    })
                                }
                                $scope.ListarResultado = output;
                            });
                        }
                        break;
                    default:

                }
            }


            //funciones de adjuntos
            $scope.mostrar_adjunto = function(ruta) {

                $scope.editruta = ruta;
                ngDialog.open({
                    template: 'views/aseguramiento/modal_ver_adjunto.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'estadoanexoctrl',
                    scope: $scope
                });

            }

            //funciones de radicar formulario
            $scope.obtenerBase = function(tipo, ind) {

                if ($("#adjunto" + ind + "_" + tipo)[0].files[0]) {
                    if ($("#adjunto" + ind + "_" + tipo)[0].files[0].size > 10340032) {
                        swal('Advertencia', 'El archivo excede el peso limite (7 MB)', 'warning')
                        $("#adjunto" + ind + "_" + tipo)[0].value = "";
                        $scope.listar_archivos[ind].extensionarchivo = "";
                    } else {
                        if ($("#adjunto" + ind + "_" + tipo)[0].files && $("#adjunto" + ind + "_" + tipo)[0].files[0]) {
                            var FR = new FileReader();
                            FR.addEventListener("load", function(e) {
                                if (tipo == 'AM') {
                                    $scope.listar_archivos.ARCHIVOS_MEDICOS[ind].archivobase = e.target.result;
                                    var name = $("#adjunto" + ind + "_" + tipo)[0].files[0].name;
                                    $scope.listar_archivos.ARCHIVOS_MEDICOS[ind].extensionarchivo = name.split('.').pop();
                                } else {
                                    $scope.listar_archivos.ARCHIVOS_CONTABLES[ind].archivobase = e.target.result;
                                    var name = $("#adjunto" + ind + "_" + tipo)[0].files[0].name;
                                    $scope.listar_archivos.ARCHIVOS_CONTABLES[ind].extensionarchivo = name.split('.').pop();
                                }
                            });
                            FR.readAsDataURL($("#adjunto" + ind + "_" + tipo)[0].files[0]);
                        }
                    }
                    console.log($scope.listar_archivos);
                } else {
                    swal('Advertencia', 'No ha selecionado ningun Archivo', 'warning')
                    $("#adjunto" + ind)[0].value = "";
                    $scope.listar_archivos[ind].archivobase = "";
                    $scope.listar_archivos[ind].extensionarchivo = "";
                }
            }

            $scope.subirArchivos = function(ubicacion, numero) {
                var total_adjunto_M = $scope.listar_archivos["ARCHIVOS_MEDICOS"].length;
                var total_adjunto_C = $scope.listar_archivos["ARCHIVOS_CONTABLES"].length;
                var subir_adjunto = false;
                $scope.archivos_devoluciones = [];
                for (var i = 0; i < total_adjunto_M; i++) {
                    console.log($scope.listar_archivos["ARCHIVOS_MEDICOS"][i]);
                    if ($scope.listar_archivos["ARCHIVOS_MEDICOS"][i].archivobase) {
                        subir_adjunto = true;
                        $scope.archivos_devoluciones.push({
                            archivo: $scope.listar_archivos["ARCHIVOS_MEDICOS"][i].archivobase,
                            ext: $scope.listar_archivos["ARCHIVOS_MEDICOS"][i].extensionarchivo,
                            codigo: $scope.listar_archivos["ARCHIVOS_MEDICOS"][i].codigo,
                            tipo: "M"
                        });
                    } else if ($scope.listar_archivos["ARCHIVOS_MEDICOS"][i].obligatorio == 'S') {
                        swal('Información', "El Archivo" + $scope.listar_archivos["ARCHIVOS_MEDICOS"][i].nombre + "es Obligatorio", 'info');
                        return;
                    }

                }
                for (var i = 0; i < total_adjunto_C; i++) {
                    console.log($scope.listar_archivos["ARCHIVOS_CONTABLES"][i]);
                    if ($scope.listar_archivos["ARCHIVOS_CONTABLES"][i].archivobase) {
                        subir_adjunto = true;
                        $scope.archivos_devoluciones.push({
                            archivo: $scope.listar_archivos["ARCHIVOS_CONTABLES"][i].archivobase,
                            ext: $scope.listar_archivos["ARCHIVOS_CONTABLES"][i].extensionarchivo,
                            codigo: $scope.listar_archivos["ARCHIVOS_CONTABLES"][i].codigo,
                            tipo: "C"
                        });
                    } else if ($scope.listar_archivos["ARCHIVOS_CONTABLES"][i].obligatorio == 'S') {
                        swal('Información', "El Archivo" + $scope.listar_archivos["ARCHIVOS_CONTABLES"][i].nombre + "es Obligatorio", 'info');
                        return;
                    }
                }

                if (subir_adjunto == true) {
                    var archivosasubir = JSON.stringify($scope.archivos_devoluciones);
                    $http({
                        method: 'POST',
                        url: "php/aseguramiento/liquidacion.php",
                        data: {
                            function: 'subir_archivos',
                            data: archivosasubir,
                            usuario: $scope.liquidacion.documento,
                            ubicacion: ubicacion,
                            numero: numero
                        }
                    }).then(function(response) {
                        if (response.data == 1) {
                            swal('Advertencia', 'Favor volver a intentar ingresando los soportes. si el error persite envie una mesa de ayuda a Soporte TIC con los adjuntos que esta intendando Subir', 'warning');
                        } else {
                            if (response.data.codigo == 1) {
                                swal('Advertencia', response.data.mensaje, 'warning');
                            } else {
                                swal({ title: "Completado", text: response.data.mensaje, type: "success" });
                                $scope.iniciar_componentes();
                                $scope.tabla_activas('A');
                                $scope.check_option_estado = true;
                            }
                        }
                    });
                } else {
                    swal('Advertencia', 'Favor Subir Los archivos Requeridos', 'warning');

                }

            }

            $scope.escoger_prorroga = function(ind) {
                $scope.proronga = $scope.listar_historial[ind];
                $scope.liquidacion.prorroga_descripcion = $scope.proronga.RADICADO + " - " + $scope.proronga.DIAGNOSTICO_NOM;
                $scope.liquidacion.proroga_numero = $scope.proronga.NUMERO;
                $scope.liquidacion.proroga_ubicacion = $scope.proronga.UBICACION;
                var dias_acumulados=($scope.proronga.DIAS_PRORROGA=="")||($scope.proronga.DIAS_PRORROGA=='0')?$scope.proronga.DURACION:$scope.proronga.DIAS_PRORROGA;
                $scope.liquidacion.dias_prorroga = parseInt(dias_acumulados) + parseInt($scope.liquidacion.duracion);
                $("#DM" + $scope.proronga.NUMERO).addClass('eleacti');
                $('#DM' + $scope.proronga.NUMERO).siblings().removeClass('eleacti');
            }
            $scope.quitar_proronga = function(ind) {
                $scope.proronga = {};
                $scope.liquidacion.prorroga_descripcion = "";
                $scope.liquidacion.dias_prorroga = 0;
            }

            $scope.guardar = function(tipo) {

                switch (tipo) {
                    case 'R':
                        $scope.validar_campos();
                        break;
                    case 'M':
                        console.log($scope.adjunto_devolver);
                        $scope.adjunto_devolver=$scope.liquidacion.adjunto_devolver==null?'':' el adjunto a cambiar es '+$scope.adjunto_devolver;
                        console.log($scope.adjunto_devolver);                        
                        $http({
                            method: 'POST',
                            url: "php/aseguramiento/liquidacion.php",
                            data: {
                                function: 'p_insertar_val_medica',
                                v_ubicacion: $scope.liquidacion.ubicacion,
                                v_numero: $scope.liquidacion.numero,
                                v_aprobada: $scope.liquidacion.aprovacion_medico == true ? 'S' : 'N',
                                v_prorroga: $scope.liquidacion.proroga == true ? 'S' : 'N',
                                v_num_pro: $scope.liquidacion.proroga_numero,
                                v_ubi_pro: $scope.liquidacion.proroga_ubicacion,
                                v_dias_pro: $scope.liquidacion.dias_prorroga,
                                v_fum: $scope.liquidacion.fecha_ultima_mestruacion,
                                v_fpp: $scope.liquidacion.fecha_posible_parto,
                                v_semanas: $scope.liquidacion.semana_gestacion,
                                v_diaspre: $scope.liquidacion.dias_prematuros,
                                v_partomul: $scope.liquidacion.partomul == true ? 'S' : 'N',
                                v_causal: $scope.liquidacion.causal_medica,
                                v_observacion:$scope.liquidacion.observacion_medica + $scope.adjunto_devolver,
                                v_usuario: $scope.liquidacion.usuario,
                                v_pespescialidad: $scope.liquidacion.especialidad,
                                v_pdiagnostico: $scope.liquidacion.diagnostico
                            }
                        }).then(function(response) {
                            console.log(response.data);
                            if (response.data.codigo == 0) {
                                swal({ title: "Completado", text: response.data.mensaje, type: "success" });
                                $scope.iniciar_componentes();
                                $scope.tabla_activas('A');
                                $scope.check_option_estado = true;
                            } else {
                                swal({ title: "Mensaje", text: response.data.mensaje, type: "warning" });
                            }

                        });
                        break;
                    case 'L':
                        if ($scope.liquidacion.causal_economicas == '' || $scope.liquidacion.causal_economicas == undefined) {
                            swal('Información', "Debe llenar todos los campos antes de Radicar", 'info');
                        } else if($scope.liquidacion.aprovacion_liquidacion == true && ($scope.liquidacion.concepto != 'LM' && $scope.liquidacion.concepto != 'LP')) {
                            if($scope.liquidacion.dias_pago > $scope.liquidacion.duracion){
                                swal('Información', "Los días a pagar no pueden ser mayor a los días de incapacidad.", 'info');
                            } else {
                                $http({
                                    method: 'POST',
                                    url: "php/aseguramiento/liquidacion.php",
                                    data: {
                                        function: 'p_insertar_val_liquida',
                                        v_ubicacion: $scope.liquidacion.ubicacion,
                                        v_numero: $scope.liquidacion.numero,
                                        v_causal: $scope.liquidacion.causal_economicas,
                                        v_ibc: $scope.liquidacion.ibc,
                                        v_valor: $scope.liquidacion.valor,
                                        v_dias_pag: $scope.liquidacion.dias_pago,
                                        v_observacion: $scope.liquidacion.observacion_liquidacion,
                                        v_usuario: $scope.liquidacion.usuario,
                                        v_tipo_lic: $scope.liquidacion.tipo_licencia,
                                        v_ibc_variable: $scope.liquidacion.ibc_variable==true?'S':'N',
                                        v_fecha_termino: $scope.liquidacion.fecha_opcional_liquidacion == '' ? '' : $scope.liquidacion.fecha_opcional_liquidacion
                                    }
                                }).then(function(response) {
                                    console.log(response.data);
                                    if (response.data.codigo == 0) {
                                        swal({ title: "Completado", text: response.data.mensaje, type: "success" });
                                        $scope.iniciar_componentes();
                                        $scope.tabla_activas('A');
                                        $scope.check_option_estado = true;
                                    } else {
                                        swal({ title: "Mensaje", text: response.data.mensaje, type: "warning" });

                                    }

                                });
                            }
                        } else {
                            $http({
                                method: 'POST',
                                url: "php/aseguramiento/liquidacion.php",
                                data: {
                                    function: 'p_insertar_val_liquida',
                                    v_ubicacion: $scope.liquidacion.ubicacion,
                                    v_numero: $scope.liquidacion.numero,
                                    v_causal: $scope.liquidacion.causal_economicas,
                                    v_ibc: $scope.liquidacion.ibc,
                                    v_valor: $scope.liquidacion.valor,
                                    v_dias_pag: $scope.liquidacion.dias_pago,
                                    v_observacion: $scope.liquidacion.observacion_liquidacion,
                                    v_usuario: $scope.liquidacion.usuario,
                                    v_tipo_lic: $scope.liquidacion.tipo_licencia,
                                    v_ibc_variable: $scope.liquidacion.ibc_variable==true?'S':'N',
                                    v_fecha_termino: $scope.liquidacion.fecha_opcional_liquidacion == null ? '' : $scope.liquidacion.fecha_opcional_liquidacion
                                }
                            }).then(function(response) {
                                console.log(response.data);
                                if (response.data.codigo == 0) {
                                    swal({ title: "Completado", text: response.data.mensaje, type: "success" });
                                    $scope.iniciar_componentes();
                                    $scope.tabla_activas('A');
                                    $scope.check_option_estado = true;
                                } else {
                                    swal({ title: "Mensaje", text: response.data.mensaje, type: "warning" });

                                }

                            });
                        }
                        break;
                    default:
                        break;
                }
            }

            // $scope.insertar_radicado = function() {
            //     $http({
            //         method: 'POST',
            //         url: "php/aseguramiento/liquidacion.php",
            //         data: {
            //             function: 'p_insertar_prestacion',
            //             concepto: $scope.liquidacion.concepto,
            //             motivo: $scope.liquidacion.motivo,
            //             fecha_incapacidad: $scope.liquidacion.fecha_incapacidad,
            //             tipo_documento: $scope.liquidacion.tipo_documento,
            //             documento: $scope.liquidacion.documento,
            //             duracion: $scope.liquidacion.duracion,
            //             radicado: $scope.liquidacion.radicado,
            //             ips: $scope.liquidacion.ips,
            //             doc_medico: $scope.liquidacion.doc_medico,
            //             nombre_medico: $scope.liquidacion.nombre_medico,
            //             especialidad_medico: $scope.liquidacion.especialidad,
            //             diagnostico: $scope.liquidacion.diagnostico,
            //             empleador: $scope.liquidacion.tercero,
            //             fecha_accidente: $scope.liquidacion.fecha_accidente,
            //             subir_adjunto: $scope.liquidacion.estado_radica_adjunto
            //         }
            //     }).then(function(response) {
            //         console.log(response.data);
            //         if (response.data.codigo == 0) {
            //             if ($scope.liquidacion.estado_radica_adjunto == true) {
            //                 $scope.subirArchivos(response.data.ubicacion, response.data.numero);
            //             }
            //             $window.open('views/aseguramiento/soporte/formato_radicacion.php?numero=' + response.data.numero + '&ubicacion=' + response.data.ubicacion, '_blank', "width=1080,height=1100");
            //             $scope.guardar_bd_empresa(response.data.ubicacion, response.data.numero);
            //             swal({
            //                 title: response.data.mensaje,
            //                 text: "¿Desea agregar una nueva Prestacion?",
            //                 type: 'success',
            //                 showCancelButton: true,
            //                 confirmButtonColor: '#3085d6',
            //                 cancelButtonColor: '#d33',
            //                 confirmButtonText: 'Confirmar',
            //                 cancelButtonText: 'Cancelar'
            //             }).then((result) => {
            //                 if (result) {
            //                     $scope.limpiar_liquidacion();
            //                 }
            //             }, function(dismiss) {
            //                 if (dismiss == "cancel") {
            //                     $scope.iniciar_componentes();
            //                     $scope.tabla_activas('A');
            //                 }

            //             })
            //         } else {
            //             swal({ title: "Mensaje", text: response.data.mensaje, type: "warning" });
            //         }

            //     });
            // }
            $scope.insertar_radicado = function() {
                $http({
                    method: 'POST',
                    url: "php/aseguramiento/liquidacion.php",
                    data: {
                        function: 'p_insertar_prestacion',
                        concepto: $scope.liquidacion.concepto,
                        motivo: $scope.liquidacion.motivo,
                        origen_radicacion: $scope.liquidacion.origen_radicacion,
                        fecha_incapacidad: $scope.liquidacion.fecha_incapacidad,
                        tipo_documento: $scope.liquidacion.tipo_documento,
                        documento: $scope.liquidacion.documento,
                        duracion: $scope.liquidacion.duracion,
                        radicado: $scope.liquidacion.radicado,
                        ips: $scope.liquidacion.ips,
                        doc_medico: $scope.liquidacion.doc_medico,
                        nombre_medico: $scope.liquidacion.nombre_medico,
                        especialidad_medico: $scope.liquidacion.especialidad,
                        diagnostico: $scope.liquidacion.diagnostico,
                        empleador: $scope.liquidacion.tercero,
                        fecha_accidente: $scope.liquidacion.fecha_accidente,
                        subir_adjunto: $scope.liquidacion.estado_radica_adjunto
                    }
                }).then(function(response) {
                    console.log(response.data);
                    if (response.data.codigo == 0) {
                        if ($scope.liquidacion.estado_radica_adjunto == true) {
                            $scope.subirArchivos(response.data.ubicacion, response.data.numero);
                        }
                        $window.open('views/aseguramiento/soporte/formato_radicacion.php?numero=' + response.data.numero + '&ubicacion=' + response.data.ubicacion, '_blank', "width=1080,height=1100");
                        $scope.guardar_bd_empresa(response.data.ubicacion, response.data.numero);
                        swal({
                            title: response.data.mensaje,
                            text: "¿Desea agregar una nueva Prestacion?",
                            type: 'success',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Confirmar',
                            cancelButtonText: 'Cancelar'
                        }).then((result) => {
                            if (result) {
                                $scope.limpiar_liquidacion();
                            }
                        }, function(dismiss) {
                            if (dismiss == "cancel") {
                                $scope.iniciar_componentes();
                                $scope.tabla_activas('A');
                            }

                        })
                    } else {
                        swal({ title: "Mensaje", text: response.data.mensaje, type: "warning" });
                    }

                });
            }
            $scope.subir_adjunto = function() {
                $scope.subirArchivos($scope.liquidacion.ubicacion, $scope.liquidacion.numero);
            }
            $scope.validar_campos = function() {
                //VALIDO ADJUNTOS
                var sum = 0;

                $scope.validar = false;
                if (
                    $scope.liquidacion.concepto == '' || $scope.liquidacion.concepto == undefined ||
                    $scope.liquidacion.motivo == '' || $scope.liquidacion.motivo == undefined ||
                    $scope.liquidacion.fecha_incapacidad == '' || $scope.liquidacion.fecha_incapacidad == undefined ||
                    $scope.liquidacion.tipo_documento == '' || $scope.liquidacion.tipo_documento == undefined ||
                    $scope.liquidacion.documento == "" || $scope.liquidacion.documento == undefined ||
                    $scope.liquidacion.nombre == "" || $scope.liquidacion.nombre == undefined ||
                    $scope.liquidacion.nacimiento == "" || $scope.liquidacion.nacimiento == undefined ||
                    $scope.liquidacion.sexo == "" || $scope.liquidacion.sexo == undefined ||
                    $scope.liquidacion.duracion == 0 || $scope.liquidacion.duracion == undefined ||
                    $scope.liquidacion.ips == "" || $scope.liquidacion.ips == undefined ||
                    $scope.liquidacion.doc_medico == "" || $scope.liquidacion.doc_medico == undefined ||
                    $scope.liquidacion.nombre_medico == "" || $scope.liquidacion.nombre_medico == undefined ||
                    $scope.liquidacion.nombre_especialidad == "" || $scope.liquidacion.nombre_especialidad == undefined ||
                    $scope.liquidacion.especialidad == "" || $scope.liquidacion.especialidad == undefined ||
                    $scope.liquidacion.diagnostico == "" || $scope.liquidacion.diagnostico == undefined ||
                    $scope.liquidacion.nombre_diagnostico == "" || $scope.liquidacion.nombre_diagnostico == undefined ||
                    $scope.liquidacion.tercero_nombre == "" || $scope.liquidacion.tercero_nombre == undefined ||
                    $scope.liquidacion.tercero == "" || $scope.liquidacion.tercero == undefined
                ) {
                    swal('Información', "Debe llenar todos los campos antes de Radicar", 'error');
                } else {
                    if ($scope.liquidacion.concepto == 'AT' && ($scope.liquidacion.fecha_accidente == '' || $scope.liquidacion.fecha_accidente == undefined)) {
                        swal('Información', "Debe llenar todos los campos antes de Radicar", 'error');
                    } else if ($scope.liquidacion.documento == $scope.liquidacion.doc_medico){
                        swal('Información', "El documento del Afiliado no puede ser igual al documento del Medico.", 'info');
                    } else {
                        //VALIDO ADJUNTOS
                        if ($scope.liquidacion.estado_radica_adjunto == true) {
                            var total_adjunto_M = $scope.listar_archivos["ARCHIVOS_MEDICOS"].length;
                            var total_adjunto_C = $scope.listar_archivos["ARCHIVOS_CONTABLES"].length;
                            var subir_adjunto = false;
                            $scope.archivos_devoluciones = [];
                            for (var i = 0; i < total_adjunto_M; i++) {
                                console.log($scope.listar_archivos["ARCHIVOS_MEDICOS"][i]);
                                if ($scope.listar_archivos["ARCHIVOS_MEDICOS"][i].archivobase) {
                                    subir_adjunto = true;
                                    $scope.archivos_devoluciones.push({
                                        archivo: $scope.listar_archivos["ARCHIVOS_MEDICOS"][i].archivobase,
                                        ext: $scope.listar_archivos["ARCHIVOS_MEDICOS"][i].extensionarchivo,
                                        codigo: $scope.listar_archivos["ARCHIVOS_MEDICOS"][i].codigo,
                                        tipo: "M"
                                    });
                                } else if ($scope.listar_archivos["ARCHIVOS_MEDICOS"][i].obligatorio == 'S') {
                                    swal('Información', "El Archivo" + $scope.listar_archivos["ARCHIVOS_MEDICOS"][i].nombre + "es Obligatorio", 'info');
                                    return;
                                }
            
                            }
                            for (var i = 0; i < total_adjunto_C; i++) {
                                console.log($scope.listar_archivos["ARCHIVOS_CONTABLES"][i]);
                                if ($scope.listar_archivos["ARCHIVOS_CONTABLES"][i].archivobase) {
                                    subir_adjunto = true;
                                    $scope.archivos_devoluciones.push({
                                        archivo: $scope.listar_archivos["ARCHIVOS_CONTABLES"][i].archivobase,
                                        ext: $scope.listar_archivos["ARCHIVOS_CONTABLES"][i].extensionarchivo,
                                        codigo: $scope.listar_archivos["ARCHIVOS_CONTABLES"][i].codigo,
                                        tipo: "C"
                                    });
                                } else if ($scope.listar_archivos["ARCHIVOS_CONTABLES"][i].obligatorio == 'S') {
                                    swal('Información', "El Archivo" + $scope.listar_archivos["ARCHIVOS_CONTABLES"][i].nombre + "es Obligatorio", 'info');
                                    return;
                                }
                            }
                            if (subir_adjunto == true) {
                                $scope.validar = true;
                                $scope.insertar_radicado();
                            }
                            
                        } else {
                            $scope.validar = true;
                            $scope.insertar_radicado();
                        }



                    }

                }

            }

            /////////////////////////////////////////////////////////////////////////////////////////////////
            // Funciones del menu
            /////////////////////////////////////////////////////////////////////////////////////////////////
            $scope.p_listar_cantidad_concepto = function() {
                $http({
                    method: 'POST',
                    url: "php/aseguramiento/liquidacion.php",
                    data: {
                        function: 'p_listar_cantidad_concepto',
                    }
                }).then(function(response) {
                    if (response.data.length != 0) {
                        $scope.cantidad_conceptos = response.data
                    }
                });
            }
            $scope.llenar_formulario_medico = function(concepto) {
                $scope.mostrar_x_conceptos = false;
            }


            /////////////////////////////////////////////////////////////////////////////////////////////////
            // tabla inicial
            /////////////////////////////////////////////////////////////////////////////////////////////////
            //CARGAR TABLA
            $scope.tabla_activas = function(estado) {

                $scope.reporte = [];
                $http({
                    method: 'POST',
                    url: "php/aseguramiento/liquidacion.php",
                    data: {
                        function: 'p_listar_activas',
                        estado: estado
                    }
                }).then(function(response) {
                    $scope.reporte = response.data;
                    $scope.initPaginacion($scope.reporte);

                });
            }
            $scope.tabla_activas('A');
            $scope.initPaginacion = function(info) {
                $scope.reporteTemp = info;
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.valmaxpag = 10;
                $scope.pages = [];
                $scope.configPages();
            }
            $scope.filter = function(val) {
                $scope.reporteTemp = $filter('filter')($scope.reporte, val);
                $scope.configPages();
            }
            $scope.configPages = function() {
                $scope.pages.length = 0;
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.reporteTemp.length / $scope.pageSize) > $scope.valmaxpag)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.reporteTemp.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.reporteTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                        ini = Math.ceil($scope.reporteTemp.length / $scope.pageSize) - $scope.valmaxpag;
                        fin = Math.ceil($scope.reporteTemp.length / $scope.pageSize);
                    }
                }
                if (ini < 1) ini = 1;
                for (var i = ini; i <= fin; i++) {
                    $scope.pages.push({
                        no: i
                    });
                }

                if ($scope.currentPage >= $scope.pages.length)
                    $scope.currentPage = $scope.pages.length - 1;
                if ($scope.currentPage < 0) { $scope.currentPage = 0; }
            };
            $scope.setPage = function(index) {
                $scope.currentPage = index - 1;
                if ($scope.pages.length % 2 == 0) {
                    var resul = $scope.pages.length / 2;
                } else {
                    var resul = ($scope.pages.length + 1) / 2;
                }
                var i = index - resul;
                if ($scope.reporteTemp.length % $scope.pageSize == 0) {
                    var tamanomax = parseInt($scope.reporteTemp.length / $scope.pageSize);
                } else {
                    var tamanomax = parseInt($scope.reporteTemp.length / $scope.pageSize) + 1;
                }
                // var tamanomax= $scope.reporteTemp.length/$scope.pageSize;
                console.log(tamanomax);
                var fin = ($scope.pages.length + i) - 1;
                if (fin > tamanomax) {
                    fin = tamanomax;
                    i = tamanomax - 10;
                }
                if (index > resul) {
                    $scope.calcular(i, fin);
                }
                console.log($scope.reporte.length / $scope.pageSize - 1);
            };
            $scope.paso = function(tipo) {
                if (tipo == 'next') {
                    var i = $scope.pages[0].no + 1;
                    if ($scope.pages.length > 9) {
                        var fin = $scope.pages[9].no + 1;
                    } else {
                        var fin = $scope.pages.length;
                    }

                    $scope.currentPage = $scope.currentPage + 1;
                    if ($scope.reporteTemp.length % $scope.pageSize == 0) {
                        var tamanomax = parseInt($scope.reporteTemp.length / $scope.pageSize);
                    } else {
                        var tamanomax = parseInt($scope.reporteTemp.length / $scope.pageSize) + 1;
                    }
                    if (fin > tamanomax) {
                        fin = tamanomax;
                        i = tamanomax - 10;
                    }
                } else {
                    var i = $scope.pages[0].no - 1;
                    if ($scope.pages.length > 9) {
                        var fin = $scope.pages[9].no - 1;
                    } else {
                        var fin = $scope.pages.length;
                    }

                    $scope.currentPage = $scope.currentPage - 1;
                    if (i <= 1) {
                        i = 1;
                        fin = $scope.pages.length;
                    }
                }
                $scope.calcular(i, fin);
            }
            $scope.calcular = function(i, fin) {
                if (fin > 9) {
                    i = fin - 9;
                } else {
                    i = 1;
                }
                $scope.pages = [];
                for (i; i <= fin; i++) {
                    $scope.pages.push({
                        no: i
                    });
                }

            }
            $scope.reversar = function(){
                if ($scope.liquidacion.ubicacion != "" && $scope.liquidacion.numero != "") {
                    $http({
                        method: 'POST',
                        url: "php/aseguramiento/liquidacion.php",
                        data: {
                            function: 'p_reversar',
                            v_ubicacion: $scope.liquidacion.ubicacion,
                            v_numero: $scope.liquidacion.numero
                        }
                    }).then(function(response) {
                        if(response.data != 0 && response.data.hasOwnProperty("codigo")) {
                            if (response.data.codigo == 0) {
                                swal({ title: "Completado", text: response.data.mensaje, type: "success" });
                            } else { 
                                swal({ title: "Mensaje", text: response.data.mensaje, type: "warning" });
                            }
                        } else {
                            swal({ title: "Mensaje", text: "Error del p_reversar(numero:"+$scope.liquidacion.numero+", ubicacion:"+$scope.liquidacion.ubicacion+"): "+response.data, type: "error" });
                        }
                    });
                } else {
                    swal("Advertencia","Ingrese el numero y la ubicacion","warning");
                }
            }

        }
    ])
    .filter('inicio', function() {
        return function(input, start) {
            if (input != undefined && start != NaN) {
                start = +start;
                return input.slice(start);
            } else {
                return null;
            }
        }
    });