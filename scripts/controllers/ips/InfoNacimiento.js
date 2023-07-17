'use strict';
angular.module('GenesisApp')
    .controller('InfoNacimiento', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar', 'afiliacionHttp',
        function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar, afiliacionHttp) {
            $(document).ready(function () { $('#modal12').modal(); });
            $scope.totalcantidad = 0;
            $scope.totalaprobado = 0;
            $scope.totalrechazado = 0;
            $scope.totalpendiente = 0;

            $scope.ModalAbrir = function (estado) {
                $('#modal12').modal('open');
                switch (estado) {
                    case 'P':
                        $scope.title = 'DE APROBACION';
                        $scope.subtitutlo = 'APROBACION RAPIDA';
                        $scope.subtitutlo2 = 'APROBACION DEMORADA';
                        $scope.OcultarApro = true;
                        $scope.OcultarRecha = false;
                        $scope.ReporteNacimiento($scope.documentorapido_apro, $scope.documentotarde_apro, estado);
                        break;
                    case 'R':
                        $scope.title = 'DE RECHAZO';
                        $scope.subtitutlo = 'RECHAZO RAPIDO';
                        $scope.subtitutlo2 = 'RECHAZO DEMORADO';
                        $scope.OcultarApro = false;
                        $scope.OcultarRecha = true;
                        $scope.ReporteNacimiento($scope.documentorapido_recha, $scope.documentotarde_recha, estado);
                        break;
                    default:
                        break;
                }
            }

            $scope.ReporteNacimiento = function (doc_rapido, doc_demorado, estado) {
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'ReporteNacimiento', doc_rapido: doc_rapido, doc_demorado: doc_demorado, estado: estado }
                }).then(function (response) {
                    console.log(response.data);
                    $scope.inforapida = response.data.rapida[0];
                    $scope.infordemorada = response.data.demorada[0];
                });
            }

            $scope.PromedioDias = function () {
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'PromedioDia',ubicacion: sessionStorage.getItem('municipio') }
                }).then(function (response) {
                    $scope.PromedioAprobacion = response.data.PromedioAprobacion;
                    $scope.PromedioGeneral = response.data.PromedioGeneral;
                    $scope.PromedioRechazo = response.data.PromedioRechazo;
                });
            }

            $scope.IdentificarNacimiento = function () {
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'IdenficarNacimiento' ,ubicacion: sessionStorage.getItem('municipio') }
                }).then(function (response) {
                    $scope.aprobado = response.data.aprobado;
                    $scope.rechazado = response.data.rechazado;

                    $scope.aprobadorapido = $scope.aprobado[0].dia_de_respuesta;
                    $scope.documentorapido_apro = $scope.aprobado[0].documento;
                    console.log('Documeto Aprobado Rapido: ' + $scope.documentorapido_apro + ' ' + 'Dia Aprobado Rapido: ' + $scope.aprobadorapido);

                    $scope.aprobadotarde = $scope.aprobado[$scope.aprobado.length - 1].dia_de_respuesta;
                    $scope.documentotarde_apro = $scope.aprobado[$scope.aprobado.length - 1].documento;
                    console.log('Documeto Aprobado Tarde: ' + $scope.documentotarde_apro + ' ' + 'Dia Aprobado Tarde: ' + $scope.aprobadotarde);

                    $scope.rechazadorapido = $scope.rechazado[0].dia_de_respuesta;
                    $scope.documentorapido_recha = $scope.rechazado[0].documento;
                    console.log('Documeto Rechazado Rapido: ' + $scope.documentorapido_recha + ' ' + 'Dia Rechazado Rapido: ' + $scope.rechazadorapido);

                    $scope.rechazadotarde = $scope.rechazado[$scope.rechazado.length - 1].dia_de_respuesta;
                    $scope.documentotarde_recha = $scope.rechazado[$scope.rechazado.length - 1].documento;
                    console.log('Documeto Rechazado Tarde: ' + $scope.documentotarde_recha + ' ' + 'Dia Rechazado Tarde: ' + $scope.rechazadotarde);
                });
            }

            $scope.Estadistica = function () {
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'PromedioFuncionario',ubicacion: sessionStorage.getItem('municipio') }
                }).then(function (response) {
                    $scope.informacion = response.data;
                    $scope.informaciontabla = response.data;
                    for (let index = 0; index < $scope.informacion.length; index++) {
                        $scope.totalcantidad = $scope.totalcantidad + Number($scope.informacion[index].cantidad);
                        $scope.totalaprobado = $scope.totalaprobado + Number($scope.informacion[index].procesado);
                        $scope.totalrechazado = $scope.totalrechazado + Number($scope.informacion[index].rechazado);
                        $scope.totalpendiente = $scope.totalpendiente + Number($scope.informacion[index].pendientes);
                    }

                });
            }

            $scope.Cantidadxmeses = function () {
                $scope.grafica = [];
                $scope.nombremes = [];
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'CantidadPorMeses',ubicacion: sessionStorage.getItem('municipio')}
                }).then(function (response) {
                    $scope.datos = response.data;
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.nombremes.push(response.data[i].mes);
                        $scope.grafica.push({ "name": response.data[i].mes, "data": [Number(response.data[i].cantidad)] });
                    }
                    Highcharts.chart('container', {
                        chart: { type: 'column' },
                        title: { text: 'Registro De Nacimiento Por IPS Mensual' },
                        //xAxis: { categories: $scope.nombremes },
                        yAxis: {     title: {text: ''}},
                        xAxis: {  categories: $scope.nombremes,   title: {text: ''}},                        
                        credits: { enabled: false },
                        plotOptions: { column: { dataLabels: { enabled: true } } },
                        tooltip: { headerFormat: '<span style="font-size:15px">{series.name}</span><br>' },
                        series: $scope.grafica
                    });
                });

            }

            $scope.close = function () {
                $('#modal12').modal('close');
            }

            $scope.PromedioDias();
            $scope.IdentificarNacimiento();
            $scope.Estadistica();
            $scope.Cantidadxmeses();
            
            $scope.ActualizarInformacion = function () {
                $scope.PromedioDias();
                $scope.IdentificarNacimiento();
                $scope.Estadistica();
                $scope.Cantidadxmeses();
            }



        }]);

