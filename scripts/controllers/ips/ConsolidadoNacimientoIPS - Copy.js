'use strict';
angular.module('GenesisApp')
    .controller('ConsolidadoNacimientoIPS', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar', 'afiliacionHttp',
        function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar, afiliacionHttp) {
            var dat = { prov: 'navb' }
            $.getJSON("php/obtenersession.php", dat)
                .done(function (respuesta) {
                    $scope.ubicacion = respuesta.codmunicipio;
                    $scope.InformacionNacimiento($scope.ubicacion);
                    $scope.NacimientoDepartamento($scope.ubicacion);
                    
                    $(document).ready(function () { $('#modaltabla').modal(); });
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.log("navbar error obteniendo variables");
                });


            $scope.init = function () {
                $scope.tabI = false;
                $scope.tabII = false;
                $scope.activeI = 'none';
                $scope.activeII = 'none';
            }
            $scope.setTab = function (opcion) {
                $scope.init();
                switch (opcion) {
                    case 1:
                        $scope.tabI = true;
                        $scope.tabII = false;
                        $scope.activeI = 'active final';
                        $scope.activeII = 'none';

                        break;
                    case 2:
                        $scope.tabI = false;
                        $scope.tabII = true;
                        $scope.activeI = 'none';
                        $scope.activeII = 'active final';
                        if ($scope.respo==undefined) {
                            $scope.ListarPorActualizar();
                        } else {
                            $scope.ListarPorActualizar('destruir');
                        }                        
                        
                        break;
                    default:
                }
            }

            $scope.setTab(1);

            $scope.OcultarDepartamento = true;
            $scope.OcultarMunicipio = false;
            $scope.InformacionIPS = false;

            $scope.BotonAtras = true;


            $scope.TablaIPS = false;
            $scope.DetalleAfiliados = false;


            $scope.InformacionNacimiento = function (ubicacion) {
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'informacionnacimiento', ubicacion: ubicacion }
                }).then(function (response) {
                    $scope.respuesta = response.data;
                    $scope.ProcentanjeActivo = ($scope.respuesta.Activo / $scope.respuesta.CantidadNacimiento * 100).toFixed(1);
                    $scope.ProcentanjeProcesado = ($scope.respuesta.Procesado / $scope.respuesta.CantidadNacimiento * 100).toFixed(1);
                    $scope.ProcentanjeRechazado = ($scope.respuesta.Rechazado / $scope.respuesta.CantidadNacimiento * 100).toFixed(1);
                });
            }


            $scope.NacimientoDepartamento = function (ubicacion) {
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'nacimientoXdepartamento', ubicacion: ubicacion }
                }).then(function (response) {
                    $scope.dpto = response.data;
                });
            }

            $scope.DetalleMunicipio = function (departamento) {
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'nacimientoXmunicipio', departamento: departamento }
                }).then(function (response) {
                    $scope.muni = response.data;
                    $scope.OcultarDepartamento = false;
                    $scope.OcultarMunicipio = true;
                    $scope.BotonAtras = false;
                    $scope.TablaIPS = false;
                    $scope.DetalleAfiliados = false;

                });

            }

            $scope.DetalleIPS = function (municipio) {
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'detalleIPS', municipio: municipio }
                }).then(function (response) {
                    $scope.rep = response.data;
                    $scope.OcultarDepartamento = false;
                    $scope.OcultarMunicipio = false;
                    $scope.InformacionIPS = true;
                    $scope.TablaIPS = true;
                    $scope.DetalleAfiliados = false;

                });

            }


            $scope.VerActivo = function (nit, estado, ubicacion) {
                if (estado == 'R') {
                    $scope.OcultarColumna = false;
                } else {
                    $scope.OcultarColumna = true;
                }
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'VisualizarDetalleIPS', nit: nit, estado: estado, ubicacion: ubicacion }
                }).then(function (response) {
                    $scope.resultado = response.data;
                    $scope.TablaIPS = false;
                    $scope.DetalleAfiliados = true;
                });
            }


            $scope.Retroceder = function () {
                if ($scope.OcultarDepartamento == false && $scope.OcultarMunicipio == false && $scope.InformacionIPS == true && $scope.TablaIPS == false) {

                    $scope.OcultarDepartamento = false;
                    $scope.OcultarMunicipio = false;
                    $scope.InformacionIPS = true;
                    $scope.TablaIPS = true;
                    $scope.DetalleAfiliados = false;

                } else if ($scope.OcultarDepartamento == false && $scope.OcultarMunicipio == false) {

                    $scope.OcultarDepartamento = false;
                    $scope.OcultarMunicipio = true;
                    $scope.InformacionIPS = false;
                    $scope.BotonAtras = false;
                    $scope.TablaIPS = false;
                    $scope.DetalleAfiliados = false;


                } else if ($scope.OcultarDepartamento == false) {

                    $scope.OcultarDepartamento = true;
                    $scope.OcultarMunicipio = false;
                    $scope.InformacionIPS = false;
                    $scope.BotonAtras = true;
                    $scope.TablaIPS = false;
                    $scope.DetalleAfiliados = false;


                }
            }

            $scope.ListarPorActualizar = function (estado) {
                if (estado == 'destruir') { swal({ title: 'Cargando Informacion' }); swal.showLoading(); }
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'ListarPorActualizar', ubicacion: $scope.ubicacion }
                }).then(function (response) {
                    $scope.respo = response.data.length;
                    if (response.data.length > 0) {
                        if (estado == 'destruir') {
                            $scope.tableinformacion.destroy();
                        }
                        $scope.res = response.data;
                        $scope.cantidad = response.data.length;
                        setTimeout(function () {
                            $scope.tableinformacion = $('#informacion').DataTable({
                                //dom: 'Bfrtip',
                                responsive: false,
                                //buttons: ['copy', 'csv', 'excel', 'print'],
                                language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                                lengthMenu: [[10, 50, -1], [10, 50, 'Todas']],
                                order: [[0, "asc"]]
                            });
                            swal.close();
                        }, 500);
                    } else {
                        swal('Genesis informa', 'No hay Informacion para Mostrar', 'warning');
                    }
                });
            }

            $scope.VerIPS = function () {
                $('#modaltabla').modal('open');
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'listado_ips', ubicacion: $scope.ubicacion }
                }).then(function (response) {
                    $scope.lnit = response.data;
                });
            }

            $scope.CerrarModal = function () {
                $('#modaltabla').modal('close');
            }


            // var cronometro;
            // function carga() {
            //     var contador_s = 0;
            //     var contador_m = 0;
            //     var s = document.getElementById("segundos");
            //     var m = document.getElementById("minutos");
            //     cronometro = setInterval(
            //         function () {
            //             if (contador_s == 60) {
            //                 contador_s = 0;
            //                 contador_m++;
            //                 m.innerHTML = contador_m;

            //                 if (contador_m == 60) {
            //                     contador_m = 0;
            //                 }
            //             }

            //             s.innerHTML = contador_s;
            //             contador_s++;

            //         }
            //         , 1000);

            // }
            // $scope.tiempo = function (index, hora) {
            //     if (hora > 0) {
            //         let m = document.querySelector("#minutos" + index);
            //         let s = document.querySelector("#segundos" + index);
            //         let tiempo = setInterval(
            //             function () {
            //                 if (parseInt(elemnto.innerHTML)) {

            //                 } else {

            //                 }
            //                 elemnto.innerHTML = parseInt(elemnto.innerHTML) + 1;


            //                 if (parseInt(s.innerHTML) == 60) {
            //                     s.innerHTML = 0;
            //                     m.innerHTML = parseInt(s.innerHTML) + 1;
            //                     if (contador_m == 60) {
            //                         contador_m = 0;
            //                     }
            //                 }

            //                 s.innerHTML = contador_s;
            //                 contador_s++;
            //             }, 1000);
            //     } else if (hora == parseInt(elemnto.innerHTML)) {

            //     }
            // }




        }]);