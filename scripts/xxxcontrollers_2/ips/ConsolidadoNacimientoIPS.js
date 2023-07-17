'use strict';
angular.module('GenesisApp')
    .controller('ConsolidadoNacimientoIPS', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar', 'afiliacionHttp',
        function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar, afiliacionHttp) {
            $(document).ready(function(){
                $('#modaltabla').modal();
              });
            $scope.init = function () {
                $scope.tabI = false;
                $scope.tabII = false;
                $scope.activeI = 'none';
                $scope.activeII = 'none';
            }


            $scope.Nombre = 'Pendientes';
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


            $scope.InformacionNacimiento = function () {
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'informacionnacimiento', ubicacion: sessionStorage.getItem('municipio') }
                }).then(function (response) {
                    $scope.respuesta = response.data;
                    $scope.ProcentanjeActivo = ($scope.respuesta.Activo / $scope.respuesta.CantidadNacimiento * 100).toFixed(1);
                    $scope.ProcentanjeProcesado = ($scope.respuesta.Procesado / $scope.respuesta.CantidadNacimiento * 100).toFixed(1);
                    $scope.ProcentanjeRechazado = ($scope.respuesta.Rechazado / $scope.respuesta.CantidadNacimiento * 100).toFixed(1);
                });
            }


            $scope.NacimientoDepartamento = function (estado) {
                $scope.dpto = [];
                $scope.estado = estado;
                if ($scope.estado == 'A'){
                    $scope.Nombre = 'Pendientes';
                } else {
                    $scope.Nombre = 'Gestionados';
                }
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'nacimientoXdepartamento', ubicacion:sessionStorage.getItem('municipio'),estado:$scope.estado }
                }).then(function (response) {
                    $scope.dpto = response.data;
                });
            }

            $scope.DetalleMunicipio = function (departamento) {
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'nacimientoXmunicipio', departamento: departamento , estado :$scope.estado }
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
                    data: { function: 'ListarPorActualizar', ubicacion:sessionStorage.getItem('municipio') }
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
                    data: { function: 'listado_ips', ubicacion: sessionStorage.getItem('municipio') }
                }).then(function (response) {
                    $scope.lnit = response.data;
                });
            }

            $scope.CerrarModal = function () {
                $('#modaltabla').modal('close');
            }

            $scope.InformacionNacimiento();
            $scope.NacimientoDepartamento('A');
            
            

        }]);