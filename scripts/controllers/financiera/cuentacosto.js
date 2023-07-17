'use strict';
angular.module('GenesisApp')
    .controller('cuentacosto', ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter', '$timeout',
        function ($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter, $timeout) {

            $(document).ready(function () {
                $scope.ObtenerCantidades();
                $scope.visualizardatos('A');
                $('#modalcuenta').modal();
                $('#modalvercuentas').modal();

                // $('#modalopciones').modal();
                // $('#modalopciones2').modal();



            });


            // DECLARACIONES DE VARIABLES
            // $scope.titulo = "GESTION DE CUENTAS DEL COSTO";

            //    alert("hola mundo");


            //FUNCIONES
            $scope.ObtenerCantidades = function () {
                $http({
                    method: 'POST',
                    url: "php/financiera/cuentacosto.php",
                    data: { function: 'obtenercantidades' }

                }).then(function (response) {
                    if (response.data) {
                        $scope.Cantidad = {
                            Pendientes: response.data[0].Activo,
                            Revisados: response.data[0].Revisado
                        }
                    }
                });
            }

            $scope.visualizardatos = function (ESTADO) {
                $scope.titulo = (ESTADO == 'A') ? "GESTION DE CUENTAS DEL COSTO (PENDIENTES)" : "GESTION DE CUENTAS DEL COSTO (GESTIONADOS)";
                $scope.ESTADO_SAVE = ESTADO;
                $scope.buscar="";
                $http({
                    method: 'POST',
                    url: "php/financiera/cuentacosto.php",
                    data: { function: 'visualizardatos', estado: ESTADO }

                }).then(function (response) {
                    $scope.limpiardatos();
                    // $scope.regimenr = response.data[0].Cod_Regimen;
                    // $scope.clasecontrator = response.data[0].Cod_Clase_Contrato;
                    // $scope.nivelatencionr = response.data[0].Nivel_Atencion;
                    // $scope.clasificacionr = response.data[0].Cod_Servicio;
                    // $scope.publicor = response.data[0].Cod_Clase;
                    // $scope.ambitor = response.data[0].Cod_Ambito;
                    // $scope.cubrimientor = response.data[0].Cod_Cubrimiento;
                    // $scope.motivor = response.data[0].Cod_Motivo;
                    // $scope.estado = response.data[0].Estado;

                    // $scope.numerodocumentov = response.data[0].Cod_Cuenta;
                    // $scope.recobroctcv = response.data[0].Cod_Cuenta_CTC;
                    // $scope.recobrotutelav = response.data[0].Cod_Cuenta_TUTELA;

                    $scope.listDatos = response.data;
                    $scope.initPaginacion($scope.listDatos);
                });


            }




            $scope.editarcuenta = true;

            $scope.cambiarcuenta = function () {
                $scope.editarcuenta = false;
            }

            $scope.abrirformulario = function (index) {
                $('#modalcuenta').modal('open');
                $scope.limpiardatos();
                 $scope.regimenr = index.Cod_Regimen;
                $scope.clasecontrator = index.Cod_Clase_Contrato;
                $scope.nivelatencionr = index.Nivel_Atencion;
                $scope.clasificacionr = index.Cod_Servicio;
                $scope.publicor = index.Cod_Clase;
                $scope.ambitor = index.Cod_Ambito;
                $scope.cubrimientor = index.Cod_Cubrimiento;
                $scope.motivor = index.Cod_Motivo;
                $scope.estado = index.Estado;
                $scope.consecutivo = index.Consecutivo;

                $scope.tipodoc = index.Documento.split('-')[0];
                $scope.numerodoc = index.Documento.split('-')[1];
                $scope.ubidoc = index.Documento.split('-')[2];

                // $scope.regimenr = $scope.listDatosTemp[index].Cod_Regimen;
                // $scope.clasecontrator = $scope.listDatosTemp[index].Cod_Clase_Contrato;
                // $scope.nivelatencionr = $scope.listDatosTemp[index].Nivel_Atencion;
                // $scope.clasificacionr = $scope.listDatosTemp[index].Cod_Servicio;
                // $scope.publicor = $scope.listDatosTemp[index].Cod_Clase;
                // $scope.ambitor = $scope.listDatosTemp[index].Cod_Ambito;
                // $scope.cubrimientor = $scope.listDatosTemp[index].Cod_Cubrimiento;
                // $scope.motivor = $scope.listDatosTemp[index].Cod_Motivo;
                // $scope.estado = $scope.listDatosTemp[index].Estado;

                // $scope.consecutivo = $scope.listDatosTemp[index].Consecutivo;
                console.log ($scope.consecutivo);
                console.log (index);
                // $scope.tipodoc = $scope.listDatosTemp[index].Documento.split('-')[0];
                // $scope.numerodoc = $scope.listDatosTemp[index].Documento.split('-')[1];
                // $scope.ubidoc = $scope.listDatosTemp[index].Documento.split('-')[2];
            }

            $scope.cerrarModal = function () {
                $('#modalcuenta').modal('close');
                $scope.limpiardatos();
            }

            $scope.mostrarcuentas = function (index) {
                $('#modalvercuentas').modal('open');
                $scope.regimenr = index.Cod_Regimen;
                $scope.clasecontrator = index.Cod_Clase_Contrato;
                $scope.nivelatencionr = index.Nivel_Atencion;
                $scope.clasificacionr = index.Cod_Servicio;
                $scope.publicor = index.Cod_Clase;
                $scope.ambitor = index.Cod_Ambito;
                $scope.cubrimientor = index.Cod_Cubrimiento;
                $scope.motivor = index.Cod_Motivo;
                $scope.estado = index.Estado;

                $scope.consecutivo = index.Consecutivo;
                console.log ($scope.consecutivo);
                $scope.tipodoc = index.Documento.split('-')[0];
                $scope.numerodoc = index.Documento.split('-')[1];
                $scope.ubidoc = index.Documento.split('-')[2];

                $scope.numerodocumentov = index.Cod_Cuenta;
                $scope.recobroctcv = index.Cod_Cuenta_CTC;
                $scope.recobrotutelav = index.Cod_Cuenta_TUTELA;
            }


            $scope.actualizarcuenta = function () {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                var Encontrar_Vacios = false;
                if ($scope.numerodocumentov == null || $scope.numerodocumentov == '') { Encontrar_Vacios = true; }
                if ($scope.recobroctcv == null || $scope.recobroctv == '') { Encontrar_Vacios = true; }
                if ($scope.recobrotutelav == null || $scope.recobrotutelav == '') { Encontrar_Vacios = true; }
                if (Encontrar_Vacios == true) {
                    swal('Advertencia', '¡Por favor completar el formulario!', 'warning')
                    return;
                }
                $http({
                    method: 'POST',
                    url: "php/financiera/cuentacosto.php",
                    data: {
                        function: 'agregarcuenta', regimen: $scope.regimenr,
                        clasecontrato: $scope.clasecontrator,
                        nivelatencion: $scope.nivelatencionr,
                        clasificacion: $scope.clasificacionr,
                        publico: $scope.publicor,
                        ambito: $scope.ambitor,
                        cubrimiento: $scope.cubrimientor,
                        motivo: $scope.motivor,
                        tipodoc: $scope.tipodoc,
                        numdoc: $scope.numerodoc,
                        ubidoc: $scope.ubidoc,
                        cuenta: $scope.numerodocumentov,
                        cuentatutela: $scope.recobrotutelav,
                        cuentactc: $scope.recobroctcv,
                        consecutivo: $scope.consecutivo
                    }

                }).then(function (response) {
                    if (response.data.Codigo == 0) {
                        // console.log(resp);
                        swal({
                            title: '¡mensaje!',
                            text: response.data.Nombre,
                            type: 'success'
                        }).catch(swal.noop);
                        $('#modalvercuentas').modal('close');
                        $scope.ObtenerCantidades();
                        $scope.visualizardatos($scope.ESTADO_SAVE);
                        $scope.numerodocumentov = '';
                        $scope.recobroctcv = '';
                        $scope.recobrotutelav = '';
                        $scope.editarcuenta = true;
                    } else {
                        swal('Advertencia', response.data.Nombre, 'warning')
                    }
                });
            }



            $scope.cerrarModal2 = function () {
                $('#modalvercuentas').modal('close');
                // $scope.visualizardatos();

            }



            $scope.limpiardatos = function () {

                $scope.numerodocumento = "";
                $scope.recobroctc = "";
                $scope.recobrotutela = "";
            }


            $scope.agregarcuenta = function () {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                var Encontrar_Vacios = false;
                // if ($scope.estado == "A") {

                if ($scope.numerodocumento == null || $scope.numerodocumento == '') { Encontrar_Vacios = true; }
                if ($scope.recobroctc == null || $scope.recobroctc == '') { Encontrar_Vacios = true; }
                if ($scope.recobrotutela == null || $scope.recobrotutela == '') { Encontrar_Vacios = true; }

                if (Encontrar_Vacios == true) {
                    swal('Advertencia', '¡Por favor completar el formulario!', 'warning')
                    return;
                }

                $http({
                    method: 'POST',
                    url: "php/financiera/cuentacosto.php",
                    data: {
                        function: 'agregarcuenta', regimen: $scope.regimenr,
                        clasecontrato: $scope.clasecontrator,
                        nivelatencion: $scope.nivelatencionr,
                        clasificacion: $scope.clasificacionr,
                        publico: $scope.publicor,
                        ambito: $scope.ambitor,
                        cubrimiento: $scope.cubrimientor,
                        motivo: $scope.motivor,

                        consecutivo: $scope.consecutivo,

                        tipodoc: $scope.tipodoc,
                        numdoc: $scope.numerodoc,
                        ubidoc: $scope.ubidoc,
                        cuenta: $scope.numerodocumento,
                        cuentatutela: $scope.recobrotutela,
                        cuentactc: $scope.recobroctc
                    }

                }).then(function (response) {
                    if (response.data.Codigo == 0) {
                        // console.log(resp);
                        swal({
                            title: '¡mensaje!',
                            text: response.data.Nombre,
                            type: 'success'
                        }).catch(swal.noop);
                        $('#modalcuenta').modal('close');
                        $scope.ObtenerCantidades();
                        $scope.visualizardatos($scope.ESTADO_SAVE);
                        $scope.limpiardatos();
                    } else {
                        swal('Advertencia', response.data.Nombre, 'warning')
                    }
                });
            }


            //TABLA

            $scope.initPaginacion = function (info) {
                $scope.listDatosTemp = info;
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.valmaxpag = 10;
                $scope.pages = [];
                $scope.configPages();
            }
            $scope.filter = function (val) {
                $scope.listDatosTemp = $filter('filter')($scope.listDatos, val);
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


