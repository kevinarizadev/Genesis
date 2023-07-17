'use strict';
angular.module('GenesisApp')
    .controller('mesacontrolticController', ['$scope', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
        function ($scope, $http, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {



// modal de otro modulos
            $(document).ready(function () {
                $('#modal_new').modal();
            })
            $scope.abrir_acordeon = function (x) {

                var tempo = -1;
                for (var j = 0; j < $scope.vector_padres.length; j++) {
                    if ($scope.vector_padres[j].acordeon == true) {
                        tempo = j;
                    }
                    $scope.vector_padres[j].acordeon = false
                }
                if (tempo == x) {
                    $scope.vector_padres[x].acordeon = false
                } else {
                    $scope.vector_padres[x].acordeon = true;
                }



            }
            $scope.abrir_modal = function () {
                $scope.listar_modal();
                $scope.mostrar_formulario_modal = true;
                console.log('hola')
                $('#modal_new').modal('open');
                $scope.email_noti = [];
                $scope.mostrar_acordeon = true;
            }
            $scope.listar_modal = function () {
                $scope.vector_padres = []
                $http({
                    method: 'POST',
                    url: "php/contratacion/funccontratacion.php",
                    data: {
                        function: 'P_LISTA_NOTIFICACIONES'
                    }
                }).then(function (response) {
                    console.log(response.data);
                    $scope.json_modal = response.data;
                    for (var i = 0; i < $scope.json_modal.length; i++) {
                        var tempo = true;
                        for (var j = 0; j < $scope.vector_padres.length; j++) {
                            if ($scope.json_modal[i].padre == $scope.vector_padres[j].padre) {
                                tempo = false;
                            }
                        }
                        if (tempo == true) {
                            $scope.vector_padres.push({
                                nombre_padre: $scope.json_modal[i].nombre_padre,
                                padre: $scope.json_modal[i].padre,
                                acordeon: false
                            })
                        }

                    }



                    console.log($scope.vector_padres)

                    $scope.mostrar_formulario_modal = false;
                })

            }
            $scope.guardar_infor_modal = function () {
                var requerido=true;
                for (var i = 0; i < $scope.json_modal.length; i++) {
                    if (($scope.json_modal[i].requerido == 'S') && (($scope.json_modal[i].email == '')&& ($scope.json_modal[i].email == null) || ($scope.json_modal[i].email == undefined)) ){
                         requerido=false;
                       
                    }
                }
                if(requerido==true){
                    swal({
                        title: 'Confirmar',
                        text: '¿Desea Guardar la informacion Digitada?',
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Guardar'
                    }).then((result) => {

                        if (result) {
                            swal({
                                title: 'Cargando...',
                            });
                            swal.showLoading();
                            var n = 1;
                            for (var i = 0; i < $scope.json_modal.length; i++) {

                               
                                $http({
                                    method: 'POST',
                                    url: "php/contratacion/funccontratacion.php",
                                    data: {
                                        v_pproceso: $scope.json_modal[i].proceso,
                                        v_pemail: $scope.json_modal[i].email,
                                        function: 'P_UI_INSERTA_DATOS_NOTIFICACION'
                                    }
                                }).then(function (response) {

                                    if (n >= $scope.json_modal.length) {
                                        if (response.data.Codigo==0) {
                                            swal.close();
                                            swal({
                                                title: "Completado!",
                                                text: response.data.Nombre,
                                                type: "success"
                                            }).then(function () {
                                            })
                                        } else {
                                            swal.close();
                                            swal({
                                                title: "Advertencia!",
                                                text: response.data.Nombre,
                                                type: "info"
                                            }).then(function () {
                                            })
                                        }

                                        
                                    }
                                    n++;
                                });
                            }

                        }
                    }) 
                }else{
                    swal({
                            title: "Advertencia!",
                            text: 'Por Los Menos Los Campos Requeridos Deben Estar Diligenciados',
                            type: "info"
                        }).then(function () {
                           
                             
                        })
                }
               


            }
// modal de otro modulos


            var vm = this;
            $scope.miacas = true;
            $scope.miacas2 = true;
            $scope.estado = 'A';
            $scope.fechahoy = new Date();
            $scope.tempo = 6;
            $scope.areaTic = ['calidad', 'capacitacion', 'coordinacion', 'desarrollo', 'gerencia', 'publicidad', 'soporte', 'soporte_infraestructura'];
            $scope.equipo = $scope.areaTic[$scope.tempo];
            //funciones
            $scope.misAcas = function (area) { 
                $http({
                    method: 'POST',
                    url: "php/tic/controlacas/Racas.php",
                    data: { function: 'obteneracastic' }
                }).then(function (response) {
                    $scope.temp = response.data;
                    for (const i in $scope.temp.acas) {
                        if ($scope.temp.acas.hasOwnProperty(i)) {
                            if ($scope.temp.acas.soporte) {
                                $scope.listdeptstic = $scope.temp.acas[area];
                            }
                        }
                    }
                    $scope.temp = [];
                })
            }
            $scope.misAcas($scope.equipo);
            $scope.nextEquipo = function () {
                if ($scope.tempo < ($scope.areaTic.length - 1)) {
                    $scope.tempo++;
                } else {
                    $scope.tempo = 0;
                }
                $scope.equipo = $scope.areaTic[$scope.tempo];
                $scope.misAcas($scope.equipo);
            }
            $scope.prevEquipo = function () {
                if ($scope.tempo > 0) {
                    $scope.tempo--;
                } else {
                    $scope.tempo = ($scope.areaTic.length - 1);
                }
                $scope.equipo = $scope.areaTic[$scope.tempo];
                $scope.misAcas($scope.equipo);
            }
            $scope.openNav = function () {
                document.getElementById("mesa").style.height = "100%";
            }
            document.body.addEventListener("keydown", function (event) {
                if (document.getElementById("mesa")){
                    if (event.code === 'Escape' || event.keyCode === 27) {
                        document.getElementById("mesa").style.height = "0%";
                    }
                }
            });
            $scope.closeNav = function () {
                document.getElementById("mesa").style.height = "0%";
            }
            $scope.consolidado = function () {
                $http({
                    method: 'POST',
                    url: "php/tic/controlacas/Racas.php",
                    data: { function: 'obteneracasengenerales' }
                }).then(function (response) {
                    $scope.casosconsolidados = response.data;
                });
            }
            $scope.cargaracas = function () {
                $http({
                    method: 'POST',
                    url: "php/tic/controlacas/Racas.php",
                    data: { function: 'obteneracasenvivo', estado: $scope.estado }
                }).then(function (response) {
                    $scope.casos = response.data;
                    $scope.filter = '';
                    if ($scope.estado == 'A') {
                        $scope.estadonom = 'ACTIVOS (' + $scope.casos.length + ')';
                        $scope.colorspam = 'red';
                    } else {
                        $scope.estadonom = 'PROCESADOS (' + $scope.casos.length + ')';
                        $scope.colorspam = 'green';
                    }

                });
            }
            $scope.cargaracaspropios = function () {
                $http({
                    method: 'POST',
                    url: "php/tic/controlacas/Racas.php",
                    data: { function: 'obteneracaspropios' }
                }).then(function (response) {
                    $scope.infopertic = response.data;
                    $scope.stars1 = [];
                    $scope.stars2 = [];
                    $scope.stars3 = [];
                    $scope.stars4 = [];
                    for (var i = 1; i <= $scope.infopertic[5].promedio; i++) {
                        $scope.stars1.push(i);
                    }
                    for (var i = 1; i <= $scope.infopertic[1].promedio; i++) {
                        $scope.stars2.push(i);
                    }
                    for (var i = 1; i <= $scope.infopertic[7].promedio; i++) {
                        $scope.stars3.push(i);
                    }
                    for (var i = 1; i <= $scope.infopertic[3].promedio; i++) {
                        $scope.stars4.push(i);
                    }
                    $scope.color1 = $scope.obtenercolorstar($scope.infopertic[5].promedio);
                    $scope.color2 = $scope.obtenercolorstar($scope.infopertic[1].promedio);
                    $scope.color3 = $scope.obtenercolorstar($scope.infopertic[7].promedio);
                    $scope.color4 = $scope.obtenercolorstar($scope.infopertic[3].promedio);
                });
            }
            $scope.cargaracaspropioshoy = function () {
                $http({
                    method: 'POST',
                    url: "php/tic/controlacas/Racas.php",
                    data: { function: 'obteneracaspropioshoy' }
                }).then(function (response) {
                    $scope.acashoy = response.data;
                });
            }
            //intervalo de animacion mis acas
            // setInterval(function(){
            //   if($scope.miacas == true){
            //           $scope.miacas = false;
            //           $("#soporte1").hide();
            //           setTimeout(function () {
            //             $("#soporte1").show().addClass('animated bounceInRight').css({"-vendor-animation-duration": "5s","-vendor-animation-delay": "2s"});
            //           }, 100);
            //       }else{
            //           $scope.miacas = true;
            //           $("#soporte1").hide();
            //           setTimeout(function () {
            //               $("#soporte1").show().addClass('animated bounceInLeft').css({"-vendor-animation-duration": "5s","-vendor-animation-delay": "2s"});
            //           }, 100);
            //       }
            // }, 15000);
            //refresh de todas las graficas
            setInterval(function () {
                $scope.miacas = true;
                $scope.miacas2 = true;
                $scope.estado = 'A';
                $scope.fechahoy = new Date();
                $scope.consolidado();
                $scope.cargaracas();
                $scope.cargaracaspropios();
                $scope.cargaracaspropioshoy();
                $scope.tendencia();
                $scope.pieincidencias();
                $scope.nextEquipo();
                setTimeout(function () {
                    $scope.estado = 'P'; $scope.cargaracas();
                }, 25000);
            }, 40000);
            //graficas de las dos primeras targetas
            $scope.tendencia = function () {
                $http({
                    method: 'POST',
                    url: "php/tic/controlacas/Racas.php",
                    data: { function: 'obteneracashistorico' }
                }).then(function (response) {
                    $scope.infohistorico = response.data[0].soporte;
                    $scope.infohistoricototal = response.data[0].general;
                    vm.hc5 = angular.element('#tendencia').highcharts({
                        chart: {
                            type: 'column',
                            options3d: {
                                enabled: true,
                                alpha: 20,
                                beta: 0
                            }
                        },
                        title: {
                            text: 'Consolidado mensual de TIC NACIONAL / soporte tecnico'
                        },
                        xAxis: {
                            categories: [
                                $scope.infohistorico[0].nombre,
                                $scope.infohistorico[1].nombre,
                                $scope.infohistorico[2].nombre,
                                $scope.infohistorico[3].nombre,
                                $scope.infohistorico[4].nombre,
                                $scope.infohistorico[5].nombre
                            ],
                            crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Cantidad de acas'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y} acas</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            series: {
                                borderWidth: 0,
                                dataLabels: {
                                    enabled: true,
                                    format: '<spam style="font-size: larger;">{point.y}</spam>'
                                }
                            }
                        },
                        series: [
                            //{
                            //  type: 'line',
                            //  name: 'Consolidado TIC',
                            //  data: [Number($scope.infohistoricototal[0].valor), Number($scope.infohistoricototal[1].valor), Number($scope.infohistoricototal[2].valor), Number($scope.infohistoricototal[3].valor), Number($scope.infohistoricototal[4].valor), Number($scope.infohistoricototal[5].valor)],
                            // plotOptions: {
                            //      line: {
                            //         dataLabels: {
                            //              enabled: true
                            //         },
                            //          enableMouseTracking: false
                            //      }
                            //  },
                            // marker: {
                            //      lineWidth: 1,
                            //       lineColor: Highcharts.getOptions().colors[3],
                            //       fillColor: 'white'
                            //   }
                            //},
                            {
                                name: 'Procesado ST',
                                color: '#9e9e9e',
                                data: [
                                    {
                                        color: '#9e9e9e',
                                        y: Number($scope.infohistorico[6].valor)
                                    }, {
                                        color: '#9e9e9e',
                                        y: Number($scope.infohistorico[7].valor)
                                    }, {
                                        color: '#9e9e9e',
                                        y: Number($scope.infohistorico[8].valor)
                                    }, {
                                        color: '#9e9e9e',
                                        y: Number($scope.infohistorico[9].valor)
                                    }, {
                                        color: '#9e9e9e',
                                        y: Number($scope.infohistorico[10].valor)
                                    }, {
                                        color: '#ffeb3b',
                                        y: Number($scope.infohistorico[11].valor)
                                    }
                                ]
                            },
                            {
                                name: 'Activo ST',
                                color: '#424242',
                                data: [
                                    {
                                        color: '#424242',
                                        y: Number($scope.infohistorico[0].valor)
                                    }, {
                                        color: '#424242',
                                        y: Number($scope.infohistorico[1].valor)
                                    }, {
                                        color: '#424242',
                                        y: Number($scope.infohistorico[2].valor)
                                    }, {
                                        color: '#424242',
                                        y: Number($scope.infohistorico[3].valor)
                                    }, {
                                        color: '#424242',
                                        y: Number($scope.infohistorico[4].valor)
                                    }, {
                                        color: '#ffc107',
                                        y: Number($scope.infohistorico[5].valor)
                                    }
                                ]
                            }
                        ]
                    });
                });

            }
            $scope.pieincidencias = function () {
                $http({
                    method: 'POST',
                    url: "php/tic/controlacas/Racas.php",
                    data: { function: 'obteneracasconcepto' }
                }).then(function (response) {
                    $scope.Incidencias = response.data;
                    var hoy = new Date();
                    var mm = hoy.getMonth() + 1;
                    $scope.yyyy = hoy.getFullYear();
                    switch (mm) {
                        case 1:
                            $scope.mes = 'Enero';
                            break;
                        case 2:
                            $scope.mes = 'Febrero';
                            break;
                        case 3:
                            $scope.mes = 'Marzo';
                            break;
                        case 4:
                            $scope.mes = 'Abril';
                            break;
                        case 5:
                            $scope.mes = 'Mayo';
                            break;
                        case 6:
                            $scope.mes = 'Junio';
                            break;
                        case 7:
                            $scope.mes = 'Julio';
                            break;
                        case 8:
                            $scope.mes = 'Agosto';
                            break;
                        case 9:
                            $scope.mes = 'Septiembre';
                            break;
                        case 10:
                            $scope.mes = 'Octubre';
                            break;
                        case 11:
                            $scope.mes = 'Noviembre';
                            break;
                        case 12:
                            $scope.mes = 'Diciembre';
                            break;
                        default:

                    }
                    $scope.Temp = [];
                    for (const i in $scope.Incidencias) {
                        if ($scope.Incidencias.hasOwnProperty(i)) {
                            if (i != ($scope.Incidencias.length - 1)) {
                                $scope.Temp.push({ name: $scope.Incidencias[i].nombre, y: Number($scope.Incidencias[i].cantidad) });
                            }
                        }
                    }
                    vm.hc4 = angular.element('#pieincidencias').highcharts({
                        chart: {
                            type: 'pie',
                            options3d: {
                                enabled: true,
                                alpha: 45
                            }
                        },
                        title: {
                            text: 'Total de incidencias en soporte tecnico del mes de ' + $scope.mes + ': ' + Number($scope.Incidencias[($scope.Incidencias.length - 1)].Total)
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.y}</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                depth: 45,
                                dataLabels: {
                                    enabled: true,
                                    format: '<b style="font-size: inherit;">{point.name} </b> <b><strong style="font-size: large;">{point.y}</strong></b>',
                                    style: {
                                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                    },
                                    connectorColor: 'silver'
                                },
                                showInLegend: false
                            }
                        },
                        series: [{
                            name: 'Incidencias',
                            data: $scope.Temp
                        }]
                    });
                });
            }
            //intervalo de scroll automatico
            setInterval(function () {
                if ($scope.casos.length >= 6) {
                    if (document.getElementById('ecran').scrollTop < (document.getElementById('ecran').scrollHeight - document.getElementById('ecran').offsetHeight)) {
                        document.getElementById('ecran').scrollTop = document.getElementById('ecran').scrollTop + 1;
                    } else {
                        document.getElementById('ecran').scrollTop = 0;
                    }
                }
            }, 50);
            //intervalo de scroll automatico
            $scope.boolean = true;
            setInterval(function () {
                if (Array.isArray($scope.listdeptstic)) {
                    if ($scope.listdeptstic.length >= 3) {
                        if ($scope.boolean == true) {
                            if (document.getElementById('scroll_x').scrollLeft == (document.getElementById('scroll_x').scrollWidth - document.getElementById('scroll_x').offsetWidth)) {
                                $scope.boolean = false;
                            } else {
                                document.getElementById('scroll_x').scrollLeft = document.getElementById('scroll_x').scrollLeft + 1;
                            }
                        } else if ($scope.boolean == false) {
                            if (document.getElementById('scroll_x').scrollLeft == 0) {
                                $scope.boolean = true;
                            } else {
                                document.getElementById('scroll_x').scrollLeft = document.getElementById('scroll_x').scrollLeft - 1;
                            }
                        }
                    }
                }
            }, 30);
            $scope.obtenercolorstar = function (valor) {
                var color = '';
                if (valor < 2) { color = '#F57F17'; }
                else if (valor < 3) { color = '#F9A825'; }
                else if (valor < 4) { color = '#FBC02D'; }
                else if (valor < 4.5) { color = '#FDD835'; }
                else { color = '#FFEB3B'; }
                return (color)
            }
            //
            $scope.consolidado();
            $scope.tendencia();
            $scope.cargaracas();
            $scope.cargaracaspropios();
            $scope.cargaracaspropioshoy();
            // $('body').Keydown(function (event) {
            //       if ('27 '== event.keycode) {
            //             $scope.closeNav();
            //       };
            // });
        }])
