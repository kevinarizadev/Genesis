'use strict';
angular.module('GenesisApp')
    .controller('gestionradicadoscontroller', ['$scope', '$filter', 'consultaHTTP', 'notification', '$timeout', '$rootScope', '$http', '$window', 'ngDialog',
        function($scope, $filter, consultaHTTP, notification, $timeout, $rootScope, $http, $window, ngDialog) {

            $scope.mostrar = false;

            $scope.nombre_ips = [];
            $scope.valores = [{
                name: 'Pendientes',
                data: [],
                color: '#FFC107'
            }, {
                name: 'Validado',
                data: [],
                color: '#03A9F4'
            }, {
                name: 'Radicado',
                data: [],
                color: "#8BC34A"

            }, {
                name: 'Error',
                data: [],
                color: "#FF5722"
            }]

            $scope.buscar = function() {
                $scope.mostrar = false;

                if ($scope.fecha_inicio && $scope.fecha_fin && $scope.fecha_inicio <= $scope.fecha_fin) {
                    $scope.mostrar = true;
                    $scope.nombre_ips = [];
                    $scope.valores = [{
                        name: 'Pendientes',
                        data: [],
                        color: '#FFC107'
                    }, {
                        name: 'Validado',
                        data: [],
                        color: '#03A9F4'
                    }, {
                        name: 'Radicado',
                        data: [],
                        color: "#8BC34A"
        
                    }, {
                        name: 'Error',
                        data: [],
                        color: "#FF5722"
                    }]

                    $http({
                        method: 'POST',
                        url: "php/cuentasmedicas/rips/gestionradicados.php",
                        data: {
                            function: 'p_obtener_indicador_rips',
                            v_pfechaini: $scope.fecha_inicio,
                            v_pfechafin: $scope.fecha_fin
                        }
                    }).then(function(response) {
                        if (response.data) {
                            var total = response.data.length;
                            for (var i = 0; i < total; i++) {
                                $scope.nombre_ips.push(response.data[i].ips);
                                // $scope.valores[2].data.push(response.data[i].radicado);
                                // $scope.valores[1].data.push(response.data[i].validado);
                                // $scope.valores[3].data.push(response.data[i].error);
                                // $scope.valores[0].data.push(response.data[i].pendiente);
                                $scope.valores[0].data.push({ 'y': response.data[i].pendiente, 'dataLabels': { 'enabled': true, 'format': response.data[i].pendiente + "" } })
                                $scope.valores[1].data.push({ 'y': response.data[i].validado, 'dataLabels': { 'enabled': true, 'format': response.data[i].validado + "" } })
                                $scope.valores[2].data.push({ 'y': response.data[i].radicado, 'dataLabels': { 'enabled': true, 'format': response.data[i].radicado + "" } })
                                $scope.valores[3].data.push({ 'y': response.data[i].error, 'dataLabels': { 'enabled': true, 'format': response.data[i].error + "" } })

                            }
                            console.log($scope.valores);
                            $scope.tendencia();
                        } else {
                            swal('Información', "No se encontraron registro en este rango de fecha, Favor intenete nuevamente", 'info');
                        }
                    });

                } else {
                    swal('Información', "Favor llenar los campos con el formato correcto", 'info');
                }
            }

            //GRAFICAS 1 
            $scope.tendencia = function() {
                Highcharts.chart('container', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Gestion de radicados de ' + moment($scope.fecha_inicio).format('DD/MM/YYYY') + ' hasta ' + moment($scope.fecha_fin).format('DD/MM/YYYY')
                    },
                    xAxis: {
                        categories: $scope.nombre_ips,
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
            }


        }

    ])