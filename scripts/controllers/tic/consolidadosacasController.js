'use strict';
angular.module('GenesisApp')
    .controller('consolidadosacasController', ['$scope', '$http', '$filter',
        function ($scope, $http, $filter) {
            $scope.maxDate = new Date();
            $scope.showSta = true;
            $scope.showdetail = true;
            $scope.showDetailD = true;
            $scope.departamentos = null;
            $scope.fechareporte = null;
            $scope.responsablesAcas = null;

            $scope.detacasTemp = [];
            $scope.detperacasTemp = [];
            swal({ title: 'Procesando...' });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/tic/consolidados/consolidado.php",
                data: { function: 'obtener_consolidadosacas' }
            }).then(function (response) {
                // console.log(response);
                $scope.dataReport = response.data[0];
                setTimeout(() => {
                    // $scope.createGraph();
                }, 100);

            })

            $scope.changeFilterAcas = function () {
                if ($scope.check_option_2 == true) {
                    $scope.getpersonAcas();
                    swal.close();
                } else {
                    $http({
                        method: 'POST',
                        url: "php/tic/consolidados/consolidado.php",
                        data: { function: 'obtener_consolidadosacasconcepto' }
                    }).then(function (response) {

                        $scope.conceptos = response.data;
                        setTimeout(() => {
                            // $scope.createGraph();
                            swal.close();
                        }, 100);
                    })
                }
            }


            $scope.getpersonAcas = function () {
                $http({
                    method: 'POST',
                    url: "php/tic/consolidados/consolidado.php",
                    data: { function: 'obtener_personas_Acas' }
                }).then(function (response) {
                    console.log(response.data);
                    if (response.data.length > 0) {
                        $scope.responsablesAcas = response.data;
                        setTimeout(function () {
                            swal.close();
                        }, 500);
                    } else {
                        swal('Genesis informa', 'No hay Informacion para Mostrar', 'warning');
                    }
                })
            }
            $scope.changeFilterAcas();
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

            $scope.dataips = null;
            $scope.dacas = null;
            $scope.tmpconcepto = null;
            $scope.tipo = null;
            $scope.showperson = false;
            $scope.temperson = null;
            $scope.showDetailAcas = function (concepto, estado) {
                console.log(concepto);
                if ($scope.check_option_2 == false) {
                    $scope.tmpconcepto = concepto;
                    $scope.tipo = 1;

                    $scope.showSta = false;
                    $http({
                        method: 'POST',
                        url: "php/tic/consolidados/consolidado.php",
                        data: { function: 'obtener_consolidado_AcasDetalle', tipo: $scope.tipo, motivo: concepto.cod_motivo, asunto: concepto.cod_asunto, cedula: 0 }
                    }).then(function (response) {
                        console.log('Motivos:', response.data);
                        if (response.data.length > 0) {
                            $scope.dacas = [];
                            $scope.dacas = response.data;
                            $scope.detacasTemp = $scope.dacas;
                            $scope.currentPage = 0;
                            $scope.pageSize = 10;
                            $scope.valmaxpag = 10;
                            $scope.pages = [];
                            $scope.configPages();
                            swal.close();
                        } else {
                            swal('Genesis informa', 'No hay Informacion para Mostrar', 'warning');
                        }
                    })
                } else {
                    $scope.tipo = 2;
                    $scope.temperson = concepto;
                    $scope.showperson = true;
                    $http({
                        method: 'POST',
                        url: "php/tic/consolidados/consolidado.php",
                        data: { function: 'obtener_consolidado_AcasDetalle', tipo: $scope.tipo, motivo: 0, asunto: 0, cedula: concepto.cedula }
                    }).then(function (response) {
                        console.log('Personas:', response.data);
                        if (response.data.length > 0) {
                            $scope.dacasper = [];
                            $scope.dacasper = response.data;
                            $scope.detperacasTemp = $scope.dacasper;
                            $scope.currentPagePer = 0;
                            $scope.pageSizePer = 10;
                            $scope.valmaxpagPer = 10;
                            $scope.pagesPer = [];
                            $scope.configPagesPer();
                            // swal.close();
                        } else {
                            swal('Genesis informa', 'No hay Informacion para Mostrar', 'warning');
                        }
                    })
                }
            }
            $scope.dataipsDetalle = null;
            $scope.nameSeccional = null;
            $scope.nameIps = null;
            $scope.nit = null;
            $scope.index = 0;

            $scope.show_panel = function () {
                console.log($scope.check_option_2);
                if ($scope.check_option_2 == true) {
                    $scope.showperson = false;
                }

                if ($scope.check_option_2 == false) {
                    $scope.showSta = true;
                }
               
               
                $("#ipss tr").removeClass('t-color-tr');
                // $scope.check_option_2 = false;
            }


            $scope.getStyle = function (abiertos, cerrados) {
                var porcentaje = parseInt(cerrados) == 0 ? 0 : (parseInt(cerrados) / (parseInt(abiertos) + parseInt(cerrados))) * 100;
                return { 'width': porcentaje + '%', 'background-color': $scope.fnBackground(porcentaje) };
            }
            $scope.getPorcentaje = function (abiertos, cerrados) {
                var porcentaje = parseInt(cerrados) == 0 ? 0 : (parseInt(cerrados) / (parseInt(abiertos) + parseInt(cerrados))) * 100;
                return porcentaje;
            }

            $scope.filter = function (val) {
                $scope.detacasTemp = $filter('filter')($scope.dacas, val);
                if ($scope.detacasTemp.length > 0) {
                    $scope.setPage(1);
                }
                $scope.configPages();
            }
            $scope.filterPer = function (val) {
                $scope.detperacasTemp = $filter('filter')($scope.dacasper, val);
                if ($scope.detperacasTemp.length > 0) {
                    $scope.setPagePer(1);
                }
                $scope.configPagesPer();
            }
            $scope.configPages = function () {
                $scope.pages.length = 0;
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.detacasTemp.length / $scope.pageSize) > $scope.valmaxpag)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.detacasTemp.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.detacasTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                        ini = Math.ceil($scope.detacasTemp.length / $scope.pageSize) - $scope.valmaxpag;
                        fin = Math.ceil($scope.detacasTemp.length / $scope.pageSize);
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
            }
            $scope.configPagesPer = function () {
                $scope.pagesPer.length = 0;
                var ini = $scope.currentPagePer - 4;
                var fin = $scope.currentPagePer + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.detperacasTemp.length / $scope.pageSizePer) > $scope.valmaxpagPer)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.detperacasTemp.length / $scope.pageSizePer);
                } else {
                    if (ini >= Math.ceil($scope.detperacasTemp.length / $scope.pageSizePer) - $scope.valmaxpagPer) {
                        ini = Math.ceil($scope.detperacasTemp.length / $scope.pageSizePer) - $scope.valmaxpagPer;
                        fin = Math.ceil($scope.detperacasTemp.length / $scope.pageSizePer);
                    }
                }
                if (ini < 1) ini = 1;
                for (var i = ini; i <= fin; i++) {
                    $scope.pagesPer.push({
                        no: i
                    });
                }

                if ($scope.currentPagePer >= $scope.pagesPer.length)
                    $scope.currentPagePer = $scope.pagesPer.length - 1;
            }
            $scope.setPage = function (index) {
                $scope.currentPage = index - 1;
                console.log($scope.dacas.length / $scope.pageSize - 1)
            }
            $scope.setPagePer = function (index) {
                $scope.currentPagePer = index - 1;
                console.log($scope.dacasper.length / $scope.pageSizePer - 1)
            }
        }])
    .filter('inicio', function () {
        return function (input, start) {
            if (input != undefined && start != NaN) {
                start = +start;
                return input.slice(start);
            } else {
                return null;
            }
        }
    });