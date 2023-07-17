'use strict';
angular.module('GenesisApp')
    .controller('adminmodelosController', ['$scope', '$timeout', 'ngDialog', '$filter', '$http', '$sce', function ($scope, $timeout, ngDialog, $filter, $http, $sce) {

        $scope.Inicio = function () {
            document.querySelector("#content").style.backgroundColor = "white";
            $scope.Ajustar_Pantalla();
            $scope.Rol_Cedula = sessionStorage.getItem('cedula');

            $scope.Tabs = 1;
            $scope.Tabs = 0;
            $('.tabs').tabs();

            $scope.Vista = 0;

            $scope.SysDay = new Date();
            $scope.Form_Limpiar();
            // $scope.List_Limpiar();
            $scope.Obtener_Areas();
            $scope.Obtener_Tableros();
            // $scope.Obtener_Responsables();
            setTimeout(() => {
                $scope.$apply();
            }, 500);
            //////////////////////////////////////////////////////////
        }
        $scope.Form_Limpiar = function () {
            $scope.tab = { number: 1 };
            $scope.tablero = {
                id_tablero: "",
                nombre: "",
                descripcion: "",
                area: "",
                iframe: "",
                icono: "",
                publico: "S",
                responsable: sessionStorage.getItem('cedula'),
                estado: "A"
            }

            $scope.funcionario = {
                buscar: '',
                cedula: '',
                nombre: '',
                area: '',
                cargo: '',
                regional: '',
                ubicacion_laboral: ''
            }

            $scope.List_funcs = [];
        }

        $scope.Obtener_Areas = function () {
            $http({
                method: 'POST',
                url: "php/analitica/analitica.php",
                data: { function: 'p_lista_areas_general' }
            }).then(function ({ data }) {
                $scope.areas = data;
            })
        }

        $scope.Obtener_Tableros = function () {
            swal({ title: 'Cargando...' });
            swal.showLoading();
            $scope.List_tableros_funcionario_general = [];
            $http({
                method: 'POST',
                url: "php/analitica/analitica.php",
                data: { function: 'p_lista_tablero_general' }
            }).then(function ({ data }) {
                swal.close();
                if (data.length > 0) {
                    $scope.List_tableros = data;
                    data.forEach(e => {
                        if (e.TABC_ESTADO == 'A') {
                            $scope.List_tableros_funcionario_general.push({
                                id_tablero: e.TABN_ID,
                                area: e.NOMBRE_AREA,
                                tablero: e.TABC_NOMBRE,
                                funcionario: $scope.funcionario.cedula,
                                estado: e.TABC_ESTADO,
                                seleccionado: false
                            })
                        }
                    });
                    setTimeout(function () { $scope.$apply(); }, 500);
                }
            })
        }




        $scope.saveModel = function () {
            $http({
                method: 'POST',
                url: "php/analitica/analitica.php",
                data: { function: $scope.tablero.id_tablero ? 'p_modificacion_tablero' : 'p_inserta_tablero', tablero: JSON.stringify($scope.tablero) }
            }).then(function ({ data }) {
                swal(data.Codigo == '0' ? 'Completado' : 'No Completado', data.Nombre, data.Codigo == '0' ? 'success' : 'error');
                if (data.Codigo == '0') {
                    $scope.tab.number = 1;
                    $scope.Obtener_Tableros();
                }
            })
        }
        $scope.getArea = function (params) {
            if (params) {
                const { AREC_NOMBRE } = $scope.areas.filter(item => item.AREN_CODIGO == params)[0];
                return AREC_NOMBRE;
            }
        }

        $scope.nuevo = function () {
            $scope.tablero = {
                id_tablero: "",
                nombre: "",
                descripcion: "",
                area: "",
                iframe: "",
                icono: "",
                publico: "S",
                responsable: sessionStorage.getItem('cedula'),
                estado: "A"
            }
            $scope.tab.number = 2;
        }

        $scope.edit = function (param) {
            $scope.tablero = {
                id_tablero: param.TABN_ID,
                nombre: param.TABC_NOMBRE,
                descripcion: param.TABC_DESCRIPCION,
                area: param.TABN_ID_AREA,
                iframe: param.TABC_IFRAME,
                icono: "",
                publico: "S",
                responsable: sessionStorage.getItem('cedula'),
                estado: param.TABC_ESTADO
            }
            $scope.tab.number = 2;
        }

        $scope.showModelo = function (params) {
            window.open(params.TABC_IFRAME);
        }

        $scope.delete = function (param) {
            $scope.tablero = {
                id_tablero: param.TABN_ID,
                nombre: param.TABC_NOMBRE,
                descripcion: param.TABC_DESCRIPCION,
                area: param.TABN_ID_AREA,
                iframe: param.TABC_IFRAME,
                icono: "",
                publico: param.TABC_PUBLICO,
                responsable: sessionStorage.getItem('cedula'),
                estado: param.TABC_ESTADO == 'A' ? 'I' : 'A'
            }
            $scope.saveModel();
        }
        $scope.changeprivacidad = function (param) {
            $scope.tablero = {
                id_tablero: param.TABN_ID,
                nombre: param.TABC_NOMBRE,
                descripcion: param.TABC_DESCRIPCION,
                area: param.TABN_ID_AREA,
                iframe: param.TABC_IFRAME,
                icono: "",
                publico: param.TABC_PUBLICO == 'S' ? 'N' : 'S',
                responsable: sessionStorage.getItem('cedula'),
                estado: param.TABC_ESTADO
            }
            $scope.saveModel();
        }

        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }

        ///////////
        $scope.Obtener_Funcionario = function () {
            swal({ title: 'Cargando...' });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/analitica/analitica.php",
                data: {
                    function: 'P_LISTA_FUNCIONARIO', funcionario: $scope.funcionario.buscar
                }
            }).then(function ({ data }) {
                if (!data.Codigo) {
                    if (data.length > 1) {
                        $scope.funcionario.buscar = '';
                        $scope.funcionario.cedula = '';
                        $scope.List_funcs = data;
                        swal.close();
                    } else {
                        $scope.funcionario.buscar = data[0].DOCUMENTO;
                        $scope.funcionario.cedula = data[0].DOCUMENTO;
                        $scope.funcionario.nombre = data[0].NOMBRE_FUNCIONARIO;
                        $scope.funcionario.area = data[0].AREA;
                        $scope.funcionario.cargo = data[0].CARGO;
                        $scope.funcionario.regional = data[0].REGIONAL;
                        $scope.funcionario.ubicacion_laboral = data[0].UBICACION_LABORAL;
                        $scope.Obtener_Tableros_Funcionario();
                    }
                } else {
                    swal('Mensaje', data.Nombre, 'error');
                }
            })
        }

        $scope.Change_Func_Buscar = function () {
            if ($scope.List_funcs) {
                $scope.List_funcs.forEach(e => {
                    if (e.NOMBRE_FUNCIONARIO == $scope.funcionario.buscar) {
                        $scope.funcionario.buscar = e.DOCUMENTO;
                        $scope.funcionario.cedula = e.DOCUMENTO;
                        $scope.funcionario.nombre = e.NOMBRE_FUNCIONARIO;
                        $scope.funcionario.area = e.AREA;
                        $scope.funcionario.cargo = e.CARGO;
                        $scope.funcionario.regional = e.REGIONAL;
                        $scope.funcionario.ubicacion_laboral = e.UBICACION_LABORAL;
                        $scope.Obtener_Tableros_Funcionario();
                    }
                });
            }
        }


        $scope.Obtener_Tableros_Funcionario = function () {
            $scope.List_tableros_funcionario = [];
            $scope.List_tableros_funcionario_general.forEach(e => {
                e.seleccionado = false;
            })
            $scope.Cont_Tab_Asigs = $scope.List_tableros_funcionario_general.length;
          
            $http({
                method: 'POST',
                url: "php/analitica/analitica.php",
                data: { function: 'p_lista_tablero_funcionario', funcionario: $scope.funcionario.buscar, area: '' }
            }).then(function ({ data }) {
                if (data[0]) {
                    data.forEach(e => {
                        $scope.List_tableros_funcionario_general[$scope.List_tableros_funcionario_general.findIndex(x => x.id_tablero == e.TABN_ID)].seleccionado = true;
                        $scope.List_tableros_funcionario.push({
                            id_tablero: e.TABN_ID,
                            area: e.NOMBRE_AREA,
                            tablero: e.TABC_NOMBRE,
                            funcionario: $scope.funcionario.cedula,
                            estado: e.TABC_ESTADO,
                            seleccionado: false
                        })
                    })
                    setTimeout(function () { $scope.$apply(); }, 500);
                    $scope.Actualizar_Tab_Asigs();
                    // $scope.List_tableros_funcionario = data;
                    //
                    if (data.length > 0) {
                        swal.close();
                    }
                } else {
                    $scope.List_tableros_funcionario = [];
                    swal('Mensaje', data.Nombre, 'info');
                    setTimeout(function () { $scope.$apply(); }, 500);
                }
            })
        }

        $scope.Seleccionar_Tablero = function (x, index) {
            // swal({
            //     title: '¿Desea Guardar?',
            //     text: x.tablero,
            //     showCancelButton: true,
            //     allowOutsideClick: false
            //     // inputValue: $scope.Motivo_Anulacion_Devolucion
            // }).then(function (result) {
            //     if (result) {
            //$scope.List_tableros_funcionario_general[index].seleccionado = true;
            $scope.List_tableros_funcionario_general[$scope.List_tableros_funcionario_general.findIndex(e => e.id_tablero == x.id_tablero)].seleccionado = true;
            $scope.List_tableros_funcionario.push(x);
            $scope.Actualizar_Tab_Asigs();
            setTimeout(() => {
                $scope.$apply();
            }, 300);
            //     }
            // }).catch(swal.noop);
        }

        $scope.Quitar_Tablero = function (x, index) {
            $scope.List_tableros_funcionario_general[$scope.List_tableros_funcionario_general.findIndex(e => e.id_tablero == x.id_tablero)].seleccionado = false;
            $scope.List_tableros_funcionario.splice(index, 1);
            $scope.Actualizar_Tab_Asigs();
        }

        $scope.Guardar_Tablero_Func = function () {
            swal({ title: 'Cargando...' });
            swal.showLoading();
            var data = [];
            $scope.List_tableros_funcionario.forEach(e => {
                data.push({
                    id_tablero: e.id_tablero,
                    estado: 'A'
                });
            });
            swal({
                title: '¿Desea Asignados los tableros?',
                showCancelButton: true,
                allowOutsideClick: false,
                type: 'question'
            }).then(function (result) {
                if (result) {
                    $http({
                        method: 'POST',
                        url: "php/analitica/analitica.php",
                        data: { function: 'P_INSERTA_FUNCIONARIO_BI', json_funcionario: JSON.stringify(data), cantidad: data.length, funcionario: $scope.funcionario.cedula }
                    }).then(function ({ data }) {
                        swal(data.Codigo == '0' ? 'Completado' : 'No Completado', data.Nombre, data.Codigo == '0' ? 'success' : 'error');
                        $scope.Atras_Func();
                    })
                }
            }).catch(swal.noop);
        }

        $scope.Atras_Func = function () {
            $scope.funcionario.cedula = '';
            $scope.funcionario.nombre = '';
            $scope.funcionario.area = '';
            $scope.funcionario.cargo = '';
            $scope.funcionario.regional = '';
            $scope.funcionario.ubicacion_laboral = '';
            setTimeout(function () { $scope.$apply(); }, 500);
        }

        $scope.Actualizar_Tab_Asigs = function () {
          $scope.Cont_Tab_Asigs = 0;
          $scope.List_tableros_funcionario_general.forEach(e => {
            if (!e.seleccionado) $scope.Cont_Tab_Asigs++;
            // e.seleccionado = false;
          });
          setTimeout(() => { $scope.$apply(); }, 1000);
        }


        $scope.FormatSoloTextoNumero = function (NID) {
            const input = document.getElementById('' + NID + '');
            var valor = input.value;
            valor = valor.replace(/[^a-z0-9 -+,]/gi, '');
            input.value = valor.toString().toUpperCase();
        }


        $scope.Ajustar_Pantalla = function () {
            if ($(window).width() < 1100) {
                document.querySelector("#pantalla").style.zoom = 0.7;
            }
            if ($(window).width() > 1100 && $(window).width() < 1300) {
                document.querySelector("#pantalla").style.zoom = 0.7;
            }
            if ($(window).width() > 1300 && $(window).width() < 1500) {
                document.querySelector("#pantalla").style.zoom = 0.8;
            }
            if ($(window).width() > 1500) {
                document.querySelector("#pantalla").style.zoom = 0.9;
            }
        }

        $(window).on('resize', function () {
            $scope.Ajustar_Pantalla();
        });

        if (document.readyState !== 'loading') {
            $scope.Inicio();
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                $scope.Inicio();
            });
        }
    }
    ])