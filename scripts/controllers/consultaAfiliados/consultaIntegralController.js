'use strict';
angular.module('GenesisApp')
    .controller('consultaIntegralController', ['$http', '$timeout', '$scope', 'ngDialog', 'consultaHTTP', 'afiliacionHttp', 'notification', 'cfpLoadingBar', '$rootScope', '$controller', 'communication', 'digitalizacionHTTP',
        function ($http, $timeout, $scope, ngDialog, consultaHTTP, afiliacionHttp, notification, cfpLoadingBar, $rootScope, $controller, communication, digitalizacionHTTP) {
            $scope.obtenerDocumento = function () {
                consultaHTTP.obtenerDocumento().then(function (response) {
                    $scope.Documentos = response;
                })
            }
            $scope.paso = 1;
            $scope.Tabs = 'HOJA1';
            $scope.mostrarTab = 1;
            $scope.subpaso = 1;
            $scope.obtenerDocumento();
            $scope.busqueda = {
                tipo: 1
            };
            $scope.consulta_seleccion = [
                {
                    nombre: 'Aseguramiento',
                    componentes: [
                        { nombre: "Portabilidad RS", id: '0', func: "P_OBTENER_PORTABILIDAD" },
                        { nombre: "Traslados A Favor EPS RS", id: '1', func: "traslado" },
                        { nombre: "Traslados Eps Subsidiado RS", id: '2', func: "s2" },
                        { nombre: "Automatico Traslados EPS Contributivo RS", id: '3', func: "s2automatico" },
                        { nombre: "Traslados Eps Contributivo RS", id: '4', func: "r2traslado" },
                        //{ nombre: "Automatico Traslados EPS Contributivo RS", id: '5', func: "r2autotraslado" },
                        { nombre: "MS Maestro Ingresos RS", id: '6', func: "maestroingreso" },
                        { nombre: "NS Maestro Novedades RS", id: '7', func: "maestronovedad" },
                        { nombre: "MS Consolidado BDUA Actual RS", id: '8', func: "consolidado" },
                        { nombre: "MS Consolidado BDUA Historico RS", id: '9', func: "consolidadohistorico" },
                        { nombre: "LMA Liquidacion Mensual De Afiliados RS", id: '10', func: "liquidacionmensual" },
                        { nombre: "Eliminaciones RESOL 2199/2013 RS", id: '11', func: "eliminacion" },
                        { nombre: "SAT RS", id: '12', func: "sats" },

                        { nombre: "R1 RC", id: '13', func: "bduacrc1" },
                        { nombre: "R2 RC", id: '14', func: "bduacrc2" },
                        { nombre: "S2 Automatico RC", id: '15', func: "cs2" },
                        { nombre: "Aportantes MA RC", id: '16', func: "cama" },
                        { nombre: "MC RC", id: '17', func: "cmc" },
                        { nombre: "NC RC", id: '18', func: "cnc" },
                        { nombre: "Afiliaciones RC", id: '19', func: "conafil" },
                        { nombre: "BDUA Interna RC", id: '20', func: "cbi" },
                        { nombre: "Pila RC", id: '21', func: "cp" },
                        { nombre: "Periodos Preliquidados RC", id: '22', func: "cpp" },
                        { nombre: "Nove Retiro Pila RC", id: '23', func: "cnrp" },
                        { nombre: "Compensacion Cotizante RC", id: '24', func: "ccc" },
                        { nombre: "CR RC", id: '25', func: "ccr" },
                        { nombre: "Gestion Glosa BDUA RC", id: '26', func: "cggb" },
                        { nombre: "SAT RC", id: '27', func: "satc" },
                    ]
                },
                {
                    nombre: 'Asistencial',
                    componentes: [
                        { nombre: "Contratación - Escenarios", id: '0', func: "P_OBTENER_CONTRATOS_PRESTACION" },
                        { nombre: "Autorizaciones", id: '1', func: "P_OBTENER_AUTORIZACIONES" },
                        { nombre: "Tutelas", id: '2', func: "P_OBTENER_TUTELAS" },
                        { nombre: "Alto Costo", id: '3', func: "P_OBTENER_SINIESTROS_CONFIRMADOS_ALTOCOSTO" },
                        { nombre: "Facturas", id: '4', func: "P_OBTENER_FACTURAS" },
                        { nombre: "Codigo de Urgencia", id: '5', func: "P_OBTENER_CODIGOS_URGENCIAS" },
                        { nombre: "PQRDS", id: '6', func: "P_OBTENER_PQRS" },
                        { nombre: "Censo", id: '7', func: "P_OBTENER_LISTA_CENSO" },
                    ]
                },
                {
                    nombre: 'Financiero',
                    componentes: [
                        { nombre: "Incapacidades", id: '0', func: "P_OBTENER_INCAPACIDADES" },
                    ]
                }
            ]

            $scope.seleccionarAfiliado = function (documento, numero) {
                $scope.busqueda.documento = documento,
                    $scope.busqueda.numero = numero
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/consultaAfiliados/consultaIntegral.php",
                    data: {
                        function: 'P_OBTENER_DATOS_AFILIADOS',
                        v_ptipodocumento: documento,
                        v_pdocumento: numero,
                    }
                }).then(function (response) {
                    if (response.data.Codigo == 1) {
                        swal('Información', response.data.Nombre, 'error');
                        return;
                    }
                    swal.close();
                    console.log(response);
                    $scope.paso = 2
                    $scope.seleccion(1);
                    $scope.datosBasico = response.data;

                    consultaHTTP.obtenerAnexos(documento, numero).then(function (response) {
                        $scope.anexodata = response;
                    })
                })
            }
            $scope.estadoanexo = function(data) {
                $scope.editruta = data.RUTA;
                $scope.ftp = data.FTP;
                $scope.inforapida = data;
                ngDialog.open({
                    template: 'views/consultaAfiliados/modalestadoanexo.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'estadoanexoctrl',
                    scope: $scope
                });
            }
            $scope.tabla_datos = [];
            $scope.buscar = function () {
                $scope.tabla_datos = [];
                $scope.busqueda.tipo = $scope.mostrarTab;
                if ($scope.busqueda.tipo == 1) {
                    if (($scope.busqueda.documento == '') || ($scope.busqueda.documento == null) || ($scope.busqueda.documento == undefined)) {
                        swal('Información', "Para este tipo de busqueda, es necesario el tipo de documento del afiliado", 'error');
                        return;
                    } else if (($scope.busqueda.numero == '') || ($scope.busqueda.numero == null) || ($scope.busqueda.numero == undefined)) {
                        swal('Información', "Para este tipo de busqueda, es necesario el numero del documento del afiliado", 'error');
                        return;
                    }
                    $scope.seleccionarAfiliado($scope.busqueda.documento, $scope.busqueda.numero);

                } else {
                    if (($scope.busqueda.primerNombre == '') || ($scope.busqueda.primerNombre == null) || ($scope.busqueda.primerNombre == undefined)) {
                        swal('Información', "Para este tipo de busqueda, es necesario el Primer Nombre del afiliado", 'error');
                        return;
                    } else if (($scope.busqueda.primerApellido == '') || ($scope.busqueda.primerApellido == null) || ($scope.busqueda.primerApellido == undefined)) {
                        swal('Información', "Para este tipo de busqueda, es necesario el Primer Apellido del afiliado", 'error');
                        return;
                    }
                    swal({
                        title: 'Cargando información...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/consultaAfiliados/consultaIntegral.php",
                        data: {
                            function: 'P_OBTENER_DATOS_AFILIADOS_APELLIDOS',
                            v_papellido1: $scope.busqueda.primerApellido,
                            v_papellido2: $scope.busqueda.segundoApellido,
                            v_pnombre1: $scope.busqueda.primerNombre,
                            v_pnombre2: $scope.busqueda.segundoNombre
                        }
                    }).then(function (response) {
                        if (response.data.Codigo == 1) {
                            swal('Información', response.data.Nombre, 'error');
                            return;
                        }
                        $scope.tabla_datos = response.data
                        swal.close();
                        // console.log(response);
                        // $scope.paso=2
                        // $scope.subpaso=1;
                        // $scope.datosBasico=response.data;
                    })
                }



            }
            $scope.borrar = function () {
                $scope.busqueda = {
                    documento: '',
                    numero: '',
                    tipo: 1
                };
            }

            $scope.seleccion = function (id) {
                $scope.subpaso = 1;
                $scope.gestion_seleccionada = id;
                // $scope.gestion_seleccionada2=0;
                $scope.seleccion2(0);

            }
            $scope.seleccion2 = function (id) {
                $scope.filtrar = '';
                // $scope.subpaso=2;
                $scope.gestion_seleccionada2 = id;
                if (($scope.gestion_seleccionada == 0) && ($scope.gestion_seleccionada2 != 0)) {
                    $scope.busqueda_consulta_aseguramiento($scope.consulta_seleccion[$scope.gestion_seleccionada].componentes[$scope.gestion_seleccionada2].func)
                } else {
                    $scope.busqueda_consulta($scope.consulta_seleccion[$scope.gestion_seleccionada].componentes[$scope.gestion_seleccionada2].func)
                }
            }

            $scope.busqueda_consulta = function (funcion) {
                $scope.datos_tabla = [];
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/consultaAfiliados/consultaIntegral.php",
                    data: {
                        function: funcion,
                        v_ptipodocumento: $scope.busqueda.documento,
                        v_pdocumento: $scope.busqueda.numero,
                    }
                }).then(function (response) {
                    $scope.datos_tabla = response.data
                    $scope.mostrarTabla = funcion;
                    swal.close();
                })

            }
            $scope.busqueda_consulta_aseguramiento = function (funcion) {
                $scope.datos_tabla = [];
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();

                $http({
                    method: 'POST',
                    url: "php/bdua/funbdua.php",
                    data: {
                        function: funcion,
                        strNumeroDocumento: $scope.busqueda.numero + ""
                    }
                }).then(function (response) {
                    swal.close();
                    $scope.datos_tabla = response.data
                    $scope.mostrarTabla = funcion;
                })

            }
            $scope.exportar = function (JSONData) {
                var data = JSONData;
                // / * Si el componente xlsx no se importa, entonces importe * /
                if (typeof XLSX == 'undefined') XLSX = require('xlsx');
                // / * Crear hoja de trabajo * /
                var ws = XLSX.utils.json_to_sheet(data);
                // / * Cree un libro de trabajo vacío y luego agregue la hoja de trabajo * /
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "data");
                // / * Generar archivo xlsx * /
                XLSX.writeFile(wb, "data.xlsx");
            }

            $scope.abirDetalleAutorizacion = function (data) {
                $scope.autorizacion_selecionada = data;
                $scope.dialogNewAfil = ngDialog.open({
                    template: 'views/consultaAfiliados/modal/modalDetalleAutorizacion.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'modalconsultaautorizacionesController',
                    scope: $scope

                });
            }
            $scope.abirDetallePQRDS=function(data){
                $scope.data_pqrds = data;
                $scope.dialogNewAfil = ngDialog.open({
                    template: 'views/consultaAfiliados/modal/modalDetallePQRDS.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'modalconsultaPQRSDController',
                    scope: $scope

                });
            }


        }
    ]);