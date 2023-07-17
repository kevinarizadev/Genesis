'use strict';
angular.module('GenesisApp')
    .controller('consolidadosController', ['$scope', '$http', '$filter',
        function ($scope, $http, $filter) {
            $scope.maxDate = new Date();
            $scope.showSta = false;
            $scope.showdetail = true;
            $scope.showDetailD = true;
            $scope.departamentos = null;
            $scope.fechareporte = null;
            swal({ title: 'Procesando...' });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/tic/consolidados/consolidado.php",
                data: { function: 'obtenerDataReport' }
            }).then(function (response) {
                $scope.dataReport = response.data[0];
                setTimeout(() => {
                    $scope.createGraph();
                }, 100);

            })
            $http({
                method: 'POST',
                url: "php/tic/consolidados/consolidado.php",
                data: { function: 'obtenerConsolidadoIps' }
            }).then(function (response) {
                $scope.departamentos = response.data;
                setTimeout(() => {
                    $scope.createGraph();
                }, 100);

            })
            $scope.formatDate = function (date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            }
            $scope.firstDay = null;
            $scope.firstDay = '2019-05-02';
            $scope.maxDate = $scope.formatDate($scope.maxDate);
            $scope.fnBackground = function (porcentaje) {
                var color = "";
                if (porcentaje >= 91) {
                    color = '#00abc0';
                } else if (porcentaje >= 71) {
                    color = '#56b949';
                } else if (porcentaje >= 51) {
                    color = '#f0c82f';
                } else if (porcentaje >= 31) {
                    color = '#eb7b2d';
                } else {
                    color = '#ee4035';
                }
                return color;
            }
            $scope.createGraph = function () {
                if ($scope.dataReport) {
                    Highcharts.chart('promedioservicios', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'IPS por Seccional'
                        },
                        xAxis: {
                            categories: ['Ips'],
                            labels: {
                                x: -10
                            }
                        },
                        subtitle: {
                            text: 'Reporte a la fecha ' + $scope.maxDate
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Cantidad  de IPS'
                            }
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
                            series: {
                                borderWidth: 0,
                                pointWidth: 50,
                                dataLabels: {
                                    enabled: true,
                                    format: '<spam style="font-size: larger;">{point.y}</spam>'
                                }
                            }
                        },
                        series: [
                            {
                                name: 'IPS ACTUALES',
                                data: [$scope.dataReport.ips],
                                color: $scope.fnBackground(($scope.dataReport.ips / $scope.dataReport.ips_esperadas) * 100)
                            }, {
                                name: 'IPS ESPERADAS',
                                data: [$scope.dataReport.ips_esperadas],
                                color: '#00abc0'
                            }
                        ]

                    }); swal.close();
                }
            }    
            $scope.dataips = null;
            $scope.showDetailSessional = function (cod, red, dpto) {
                $scope.nameSeccional = dpto;
                if (red == 0) {
                    swal({ title: "Completado", text: 'No hay IPS Registradas', showConfirmButton: true, type: "info" });
                } else {
                    $http({
                        method: 'POST',
                        url: "php/tic/consolidados/consolidado.php",
                        data: { function: 'obtenerConsolidadoIpsDetalle', codigo: cod }
                    }).then(function (response) {
                        $scope.dataips = response.data;
                        // $(window).resize(function () {                         
                        //   });
                    })
                    $scope.showSta = !$scope.showSta;
                }
            }
            $scope.dataipsDetalle = null;
            $scope.nameSeccional = null;
            $scope.nameIps = null;
            $scope.nit = null;
            $scope.index = 0;
            $scope.showDetailIps = function (cod, name, index) {
                swal({ title: 'Buscando Operaciones de ' + name.toLowerCase() });
                swal.showLoading();
                $scope.nit = cod;
                $scope.index = index;
                $scope.nameIps = name;
                $("#ipss tr").removeClass('t-color-tr');
                $("#ipss .ips" + $scope.index).addClass('t-color-tr');
                var formattedDate = $filter('date')($scope.fechareporte, 'dd/MM/yyyy');
                $http({
                    method: 'POST',
                    url: "php/tic/consolidados/consolidado.php",
                    data: {
                        function: 'obtenerConsolidadoIpsDetalleServicio', nit: $scope.nit,
                        fecha: formattedDate
                    }
                }).then(function (response) {
                    swal.close();
                    $scope.dataipsDetalle = response.data;
                })
                $scope.showdetail = false; $scope.showDetailD = false;
            }
            $scope.showDetailIpsdate = function () {
                swal({ title: 'Buscando...' });
                swal.showLoading();
                var formattedDate = $filter('date')($scope.fechareporte, 'dd/MM/yyyy');
                $http({
                    method: 'POST',
                    url: "php/tic/consolidados/consolidado.php",
                    data: {
                        function: 'obtenerConsolidadoIpsDetalleServicio', nit: $scope.nit,
                        fecha: formattedDate
                    }
                }).then(function (response) {
                    swal.close();
                    $scope.dataipsDetalle = response.data;
                })

                $scope.showdetail = false; $scope.showDetailD = false;
            }

            $scope.show_panel = function () {
                $scope.showSta = false;
                $scope.showdetail = true;
                $scope.showDetailD = true;
                $("#ipss tr").removeClass('t-color-tr');
            }


            $scope.getStyle = function (esperada, registrada) {
                var porcentaje = ((registrada / esperada) * 100);
                return { 'width': porcentaje + '%', 'background-color': $scope.fnBackground(porcentaje) };
            }

            $scope.getPorcentaje = function (esperada, registrada) {
                return ((registrada / esperada) * 100);
            }

       


        }])
