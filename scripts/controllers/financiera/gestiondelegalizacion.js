'use strict';
angular.module('GenesisApp')
    .controller('gestiondelegalizacion', ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$filter', '$window',
        function ($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter) {
            // alert("hola mundo");

            $(document).ready(function () {
                $scope.cambiardetalles()
                $('#modal12').modal();
                $('#modalopciones').modal();
                $('#modalopciones2').modal();



            });


            $scope.observacion = "";
            $scope.titulosoporte = function () {

            }
            $scope.Veraprobar = false;


            // $scope.numerodocumentoj = "NIT";

            $scope.titulo = 'GESTIÓN DE LEGALIZACIÓN';
            $scope.estado = "A";


            $scope.VerDetalle = function (x) {
                $scope.camposllenos = x;
                $scope.Descargafile_Soportes(x.soporte_1, 1, 'RUT');
                // console.log($scope.camposllenos)

                $('#modal12').modal('open');

            }

            $scope.cambiardetalles = function () {

                $http({
                    method: 'POST',
                    url: "php/financiera/soporteslegalizacion.php",
                    data: { function: 'VisualizarDetallesLegalizacion' }

                }).then(function (response) {
                    $scope.pendientes = response.data[0].Activo;
                    $scope.rechazados = response.data[0].Anulado;
                    $scope.gestionados = response.data[0].Procesado;

                });
            }

            ////////////////     LISTAR   /////////////////////////////////////////////////////////////////////////

            //CARGAR ESPECIALIDAD
            $http({
                method: 'POST',
                url: "php/financiera/soporteslegalizacion.php",
                data: { function: 'cargarEspecialidad', }
            }).then(function (res) {

                $scope.especialidades = res.data;
            });

            //CARGAR GRUPO DE CUENTAS
            $http({
                method: 'POST',
                url: "php/financiera/soporteslegalizacion.php",
                data: { function: 'cargarGrupodecuenta', }
            }).then(function (res) {

                $scope.grupodecuentas = res.data;
            });

            //CARGAR TIPO DE IMPUESTOS
            $http({
                method: 'POST',
                url: "php/financiera/soporteslegalizacion.php",
                data: { function: 'cargarTipodeimpuestos', }
            }).then(function (res) {

                $scope.tipodeimpuestos = res.data;
            });


            $scope.mostrarOpciones = true;


            $scope.verModaldeaprobado = function () {
                $('#modalopciones').modal('open');

            }


            $scope.cerrarModal = function () {
                $('#modalopciones').modal('close');

            }

            $scope.verModaldeaprobado2 = function () {
                $('#modalopciones2').modal('open');

            }


            $scope.cerrarModal2 = function () {
                $('#modalopciones2').modal('close');

            }


            $scope.especialidad = "";
            $scope.tipoimpuesto = "";
            $scope.grupodecuenta = "";

            $scope.aprobarIPS = function (estado) {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                var Encontrar_Vacios = false;
                var Encontrar_Vaciosr = false;
                
                if (estado == "P") {
                    $scope.observacion = "";
                    if ($scope.especialidad == null || $scope.especialidad == '') { Encontrar_Vacios = true; }
                    if ($scope.tipoimpuesto == null || $scope.tipoimpuesto == '') { Encontrar_Vacios = true; }
                    if ($scope.grupodecuenta == null || $scope.grupodecuenta == '') { Encontrar_Vacios = true; }
                    if ($scope.niveldeips == null || $scope.niveldeips == '') { Encontrar_Vacios = true; }

                } else {

                    if ($scope.motivo == null || $scope.motivo == '') { Encontrar_Vaciosr = true; }

                }

                if (Encontrar_Vacios == true) {
                    swal('Advertencia', '¡El formulario no está diligenciado completamente, Por favor completar!', 'warning')
                    // Materialize.toast('¡Complete los campos', 2000);
                    return;
                }

                if (Encontrar_Vaciosr == true) {
                    swal('Advertencia', '¡Debe colocar un motivo!', 'warning')
                    // Materialize.toast('¡Complete los campos', 2000);
                    return;
                }

                $http({
                    method: 'POST',
                    url: "php/financiera/soporteslegalizacion.php",
                    data: {
                        function: 'aprobarIPS', type: $scope.camposllenos.tipo_documento, documento: $scope.camposllenos.documento,
                        observacion: $scope.observacion, estado: estado, especialidad: $scope.especialidad,
                        grupodecuenta: $scope.grupodecuenta, tipoimpuesto: $scope.tipoimpuesto
                    }

                }).then(function (response) {
                    if (response.data[0].codigo == 1) {

                        if (estado == "P" || estado == "X") {
                            // console.log(resp);
                            swal({
                                title: '¡mensaje!',
                                text: response.data[0].mensaje,
                                type: 'success'

                            }).catch(swal.noop);
                            $('#modal12').modal('close');
                            $scope.DetalleIPS("A");
                            $scope.cambiardetalles();
                            $('#modalopciones').modal('close');
                            $('#modalopciones2').modal('close');

                        } else {
                            swal({
                                title: '¡mensaje!',
                                text: response.data[0].mensaje,
                                type: 'error'
                            }).catch(swal.noop);
                        }

                    } else {
                        swal('Advertencia', response.data[0].mensaje, 'warning')

                    }

                });
            }

            $scope.DetalleIPS = function (estado) {
                $scope.Veraprobar = false;
                switch (estado) {

                    case "A":
                        $scope.tex = " (PENDIENTES)"
                        $scope.Veraprobar = true;

                        break;
                    case "P":
                        $scope.tex = " (APROBADOS)"

                        break;
                    case "X":
                        $scope.tex = " (RECHAZADOS)"
                        break;

                    default:
                        break;
                }
                $http({
                    method: 'POST',
                    url: "php/financiera/soporteslegalizacion.php",
                    data: { function: 'visualizarsoporteslegalizacion', estado: estado }

                }).then(function (response) {
                    $scope.listDatos = response.data;
                    $scope.initPaginacion($scope.listDatos);
                    // $scope.listacontrol = response.data;



                });
            }

            //////////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////////W
            $scope.Descargafile_Soportes = function (Ruta, Num, Nombre) {
                $scope.UrlSoporte = {
                    Ruta: null,
                    Num: null,
                    Nombre: null
                };
                // console.log(Ruta);
                if (Ruta) {
                    $http({
                        method: 'POST',
                        url: "php/financiera/soporteslegalizacion.php",
                        data: {
                            function: 'descargaAdjunto',
                            ruta: Ruta
                        }
                    }).then(function (response) {
                        if (response.data) {
                            $scope.UrlSoporte.Ruta = "temp/" + response.data.toString().trim();
                            $scope.UrlSoporte.Num = Num;
                            $scope.UrlSoporte.Nombre = Nombre;
                        }
                        // console.log($scope.UrlSoporte.Ruta);
                        // else {
                        //     $scope.UrlSoporte.Ruta = null;
                        // }
                    });
                }

            }

            //////////////////////////////////////////////////////////////////////////////////////////

            $scope.close = function () {
                $('#modal12').modal('close');

            }


            $scope.initPaginacion = function (info) {
                $scope.listDatosTemp = info;
                $scope.currentPage = 0;
                $scope.pageSize = 20;
                $scope.valmaxpag = 20;
                $scope.pages = [];
                $scope.configPages();
            }
            $scope.filter = function (val) {
                $scope.listDatosTemp = $filter('filter')($scope.listacontrol, val);
                $scope.configPages();
            }
            $scope.configPages = function () {
                $scope.pages.length = 0;
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.listDatosTemp.length / $scope.pageSize) > $scope.valmaxpag)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                        ini = Math.ceil($scope.listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag;
                        fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize);
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
            }
            $scope.setPage = function (index) {
                $scope.currentPage = index - 1;
                if ($scope.pages.length % 2 == 0) {
                    var resul = $scope.pages.length / 2;
                } else {
                    var resul = ($scope.pages.length + 1) / 2;
                }
                var i = index - resul;
                if ($scope.listDatosTemp.length % $scope.pageSize == 0) {
                    var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize);
                } else {
                    var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize) + 1;
                }
                var fin = ($scope.pages.length + i) - 1;
                if (fin > tamanomax) {
                    fin = tamanomax;
                    i = tamanomax - 9;
                }
                if (index > resul) {
                    $scope.calcular(i, fin);
                }
            }
            $scope.paso = function (tipo) {
                if (tipo == 'next') {
                    var i = $scope.pages[0].no + 1;
                    if ($scope.pages.length > 9) {
                        var fin = $scope.pages[9].no + 1;
                    } else {
                        var fin = $scope.pages.length;
                    }

                    $scope.currentPage = $scope.currentPage + 1;
                    if ($scope.listDatosTemp.length % $scope.pageSize == 0) {
                        var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize);
                    } else {
                        var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize) + 1;
                    }
                    if (fin > tamanomax) {
                        fin = tamanomax;
                        i = tamanomax - 9;
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
            $scope.calcular = function (i, fin) {
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

            $scope.DetalleIPS($scope.estado);

        }]).filter('inicio', function () {
            return function (input, start) {
                if (input != undefined && start != NaN) {
                    start = +start;
                    return input.slice(start);
                } else {
                    return null;
                }

            }
        });
