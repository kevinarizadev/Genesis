'use strict';
angular.module('GenesisApp')
    .controller('registrodesnutricionController', ['$scope', '$http', 'ngDialog', 'notification', 'ausentismoHttp', '$timeout', '$q', 'communication', '$controller', '$rootScope', '$window', '$filter',
        function ($scope, $http, ngDialog, notification, ausentismoHttp, $timeout, $q, communication, $controller, $rootScope, $window, $filter) {

            $(document).ready(function () {



            });


            $scope.limpiardatosbasicos = function () {
                $scope.dato = {

                    tipo: '',
                    numeroid: '',
                    reporta: '',
                    numero: '',
                    fechanotificacion: '',
                    semananoti: '',
                    pnombre: '',
                    snombre: '',
                    papellido: '',
                    sapellido: '',
                    paisorigin: '',
                    departamento: '',
                    municipio: '',
                    codzona: '',
                    direccion: '',
                    telefono: '',
                    corregimiento: '',
                    ips: '',
                    fechaingreso: '',
                    regimen: '',
                    sexo: '',
                    fechanacimiento: '',
                    edad: '',
                    eps: '',
                    observaciona: '',
                    historiaclinica: '',

                }
            }

            //traer datos del afiliado
            $scope.consulta = function () {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'buscaafiliado', type: $scope.dato.tipo, id: $scope.dato.numeroid }
                }).then(function (res) {

                    if (res.data.length > 0) {

                        $scope.segundaparte = true;

                        $scope.dato.pnombre = res.data[0].PNOMBRE;
                        $scope.dato.snombre = res.data[0].SNOMBRE;
                        $scope.dato.papellido = res.data[0].PAPELLIDO;
                        $scope.dato.sapellido = res.data[0].SAPELLIDO;
                        $scope.dato.municipio = res.data[0].MUNICIPIOS;
                        $scope.dato.departamento = res.data[0].DEPARTAMENTO;
                        $scope.dato.direccion = res.data[0].DIRECCION;
                        $scope.dato.regimen = res.data[0].REGIMEN;
                        $scope.dato.sexo = res.data[0].SEXO;
                        $scope.dato.fechanacimiento = res.data[0].FECHANAC;
                        $scope.dato.zona = res.data[0].ZONA;
                        $scope.dato.eps = res.data[0].EPS;
                        $scope.dato.edad = res.data[0].EDAD;
                        $scope.dato.telefono = res.data[0].TELEFONO;
                        $scope.dato.codzona = res.data[0].CODZONA;

                        $scope.dato.ips = sessionStorage.getItem("nit");
                        $scope.dato.responsable = sessionStorage.getItem('cedula')

                    } else {
                        swal('Información', '¡DOCUMENTO INVALIDO!', 'error')
                        $scope.segundaparte = false;
                        // $scope.limpiardatosbasicos();
                        $scope.dato_fechaingreso = '';
                        $scope.dato_fechacontrol = '';
                        $scope.dato_fechanotificacion = '';
                    }

                    if ($scope.dato.edad > 59) {
                        $scope.segundaparte = false;
                        swal({
                            title: '!EL NIÑO NO PUEDE INGRESAR A EL PROGRAMA, ES MAYOR A 5 AÑOS!',
                            timer: 5000,
                            type: 'error'

                        }).catch(swal.noop);
                    }

                })

                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenercontrol', type: $scope.dato.tipo, id: $scope.dato.numeroid }
                }).then(function (res) {
                    $scope.listacontrol = res.data;
                })
            }


            // OBTENER ENTIDADES
            $scope.obtenerEntidades = function () {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                    data: { function: 'obtenerEntidades' }
                }).then(function (response) {

                    $scope.tipoentidades = response.data;
                })
            }

            $scope.obtenerEntidades();
            // $scope.obtenerCasos();
            // $scope.obtenerAjuste();
            // $scope.obtenerTipoingreso();




            // INSERT DE  SEMANA AMBULATORIA
            $scope.enviarreporte = function () {
                var Encontrar_Vacios = false;
                if ($scope.dato.reporta != null && $scope.dato.reporta != '' && $scope.dato.paisorigin != null && $scope.dato.paisorigin != '' && $scope.dato.telefono != undefined && $scope.dato.telefono != '' &&
                    $scope.dato.telefono != null && $scope.dato.ips != undefined && $scope.dato.ips != '' && $scope.dato.ips != null) {
                    if ($scope.dato.reporta == 1) {//Fuente de informacion == 1

                        if ($scope.dato_fechanotificacion == undefined || $scope.dato_fechanotificacion == null || $scope.dato.semananoti == undefined || $scope.dato.semananoti == null || $scope.dato.semananoti == '') {
                            Encontrar_Vacios = true;
                            $scope.dato.fechanotificacion = '';
                        } else {
                            Encontrar_Vacios = false;
                            $scope.dato.fechanotificacion = (($scope.dato_fechanotificacion.getDate() < 10) ? '0' + $scope.dato_fechanotificacion.getDate() : $scope.dato_fechanotificacion.getDate())
                                + '/' + ((($scope.dato_fechanotificacion.getMonth() + 1) < 10) ? '0' + ($scope.dato_fechanotificacion.getMonth() + 1) : ($scope.dato_fechanotificacion.getMonth() + 1)) + '/' + $scope.dato_fechanotificacion.getFullYear();
                        }
                    }
                    if (Encontrar_Vacios == false) {
                        // if ($scope.dato.ipsvalue == "900768457") {
                        const datos = $scope.dato;
                        // datos.ips = $scope.dato.ipsvalue;
                        // delete datos.ipsvalue;

                        $http({
                            method: 'POST',
                            url: "php/saludpublica/desnutricion/funcDesnutricion.php",
                            data: {
                                function: 'enviarreporte', datos: JSON.stringify(datos), type: 'C'
                            }
                        }).then(function (res) {
                            if (res.data.Codigo == 1) {
                                swal({
                                    title: '!Datos guardados!',
                                    timer: 3000,
                                    type: 'success'
                                }).catch(swal.noop);
                                $scope.segundaparte = false;
                                $scope.limpiardatosbasicos();
                                $scope.dato_fechaingreso = '';
                                $scope.dato_fechacontrol = '';
                                $scope.dato_fechanotificacion = '';


                            } else {
                                if (res.data.Codigo == 0) {
                                    swal('', res.data.Nombre, 'error')
                                }
                            }
                        });
                        // } else {


                        //     swal({
                        //         title: '!DATOS BASICOS COMPLETOS!',
                        //         timer: 3000,
                        //         type: 'success'
                        //     }).catch(swal.noop);
                        //     $timeout(function () {
                        //         $('#modalsemana').modal('open');
                        //     }, 1500);
                        // }
                    } else {

                        swal({
                            title: '!COMPLETE TODOS LOS CAMPOS!',
                            timer: 3000,
                            type: 'info'
                        }).catch(swal.noop);
                    }
                } else {
                    swal('Información', '¡COMPLETE TODOS LOS DATOS BASICOS!', 'warning');
                }
            }

        }]);