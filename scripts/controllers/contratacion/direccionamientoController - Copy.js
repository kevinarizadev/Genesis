'use strict';



angular.module('GenesisApp')
    .controller('direccionamientoController', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$rootScope',
        function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $rootScope) {

            $(document).ready(function () {
                $('#modal_ips_estrategica').modal();
            })
            $scope.init = function () {
                $scope.paso = 1;
                $scope.data = {};
                $scope.seleccion = 0
                $scope.bloquear_origen = false;
                $scope.regimen = "";
                $scope.listado_municipio_destino_escogidos = [];
                $scope.mensaje_activo = 15;
            }
            $scope.init();

            $scope.cambiar_paso = function (int) {
                $scope.paso = int;
            }

            $scope.borrar_listado = function () {

                $scope.listado_destino = [];
                $scope.listado_origen = [];
                $scope.listado_origen_municipio = [];

            }


            $scope.captura_evento_teclado = function (keyEvent, palabra, tipo) {
                $scope.borrar_listado()
                switch (tipo) {
                    case 1:
                        $scope.data.municipio_nombre = ''
                        $scope.data.municipio_codigo = '';
                        switch (keyEvent.which) {
                            case 40:
                                if ($scope.listado_origen.length != 0) {
                                    for (var s = 0; s < $scope.listado_origen.length; s++) {
                                        $scope.listado_origen[s].estado = false;
                                    }
                                    $scope.seleccion = $scope.seleccion >= ($scope.listado_origen.length - 1) ? 0 : $scope.seleccion + 1;
                                    $scope.listado_origen[$scope.seleccion].estado = true;
                                    var id = $scope.listado_origen[$scope.seleccion].cod_dpto;
                                    document.querySelector('#list-group-departamento-origen').scrollTo(0, document.querySelector('#DM' + id).offsetTop);

                                }
                                break;
                            case 38:
                                for (var s = 0; s < $scope.listado_origen.length; s++) {
                                    $scope.listado_origen[s].estado = false;
                                }
                                if ($scope.seleccion <= 0) {
                                    $scope.seleccion = -1;
                                } else {
                                    $scope.seleccion = $scope.seleccion - 1;
                                    $scope.listado_origen[$scope.seleccion].estado = true;
                                    var id = $scope.listado_origen[$scope.seleccion].cod_dpto;
                                    var selector = tipo == 1 ? '#list-group-departamento-origen' : '#list-group-municipio-origen'
                                    document.querySelector(selector).scrollTo(0, document.querySelector('#DM' + id).offsetTop)
                                }
                                break;
                            case 13:
                                $scope.seleccion_opcion(tipo,)
                                break;
                            default:
                                $http({
                                    method: 'POST',
                                    url: "php/contratacion/direccionamiento.php",
                                    data: {
                                        function: 'P_LISTA_DPTO_ORIGEN',
                                        v_pcoincidencia: palabra,
                                    }
                                }).then(function (response) {
                                    $scope.listado_origen = response.data;
                                });
                                break;
                        }
                        break;
                    case 2:
                        switch (keyEvent.which) {
                            case 40:
                                if ($scope.listado_origen_municipio.length != 0) {
                                    for (var s = 0; s < $scope.listado_origen_municipio.length; s++) {
                                        $scope.listado_origen_municipio[s].estado = false;
                                    }
                                    $scope.seleccion = $scope.seleccion >= ($scope.listado_origen_municipio.length - 1) ? 0 : $scope.seleccion + 1;
                                    $scope.listado_origen_municipio[$scope.seleccion].estado = true;
                                    var id = $scope.listado_origen_municipio[$scope.seleccion].cod_mpio;
                                    document.querySelector('#list-group-departamento-origen').scrollTo(0, document.querySelector('#DM' + id).offsetTop);

                                }
                                break;
                            case 38:
                                for (var s = 0; s < $scope.listado_origen_municipio.length; s++) {
                                    $scope.listado_origen_municipio[s].estado = false;
                                }
                                if ($scope.seleccion <= 0) {
                                    $scope.seleccion = -1;
                                } else {
                                    $scope.seleccion = $scope.seleccion - 1;
                                    $scope.listado_origen_municipio[$scope.seleccion].estado = true;
                                    var id = $scope.listado_origen_municipio[$scope.seleccion].cod_mpio;
                                    var selector = tipo == 1 ? '#list-group-departamento-origen' : '#list-group-municipio-origen'
                                    document.querySelector(selector).scrollTo(0, document.querySelector('#DM' + id).offsetTop)
                                }
                                break;
                            case 13:
                                $scope.seleccion_opcion(tipo,)
                                break;
                            default:
                                $http({
                                    method: 'POST',
                                    url: "php/contratacion/direccionamiento.php",
                                    data: {
                                        function: 'P_LISTA_MPIO_ORIGEN',
                                        v_pcoincidencia: palabra,
                                        v_pdpto: $scope.data.departamento_codigo,
                                    }
                                }).then(function (response) {
                                    $scope.listado_origen_municipio = response.data;
                                    $scope.listado_municipio = response.data;
                                });
                                break;
                        }
                        break;
                    case 3:
                        switch (keyEvent.which) {
                            case 40:
                                if ($scope.listado_destino.length != 0) {
                                    for (var s = 0; s < $scope.listado_destino.length; s++) {
                                        $scope.listado_destino[s].estado = false;
                                    }
                                    $scope.seleccion = $scope.seleccion >= ($scope.listado_destino.length - 1) ? 0 : $scope.seleccion + 1;
                                    $scope.listado_destino[$scope.seleccion].estado = true;
                                    var id = $scope.listado_destino[$scope.seleccion].cod_dpto;
                                    document.querySelector('#list-group-departamento-destino').scrollTo(0, document.querySelector('#DM' + id).offsetTop);

                                }
                                break;
                            case 38:
                                for (var s = 0; s < $scope.listado_destino.length; s++) {
                                    $scope.listado_destino[s].estado = false;
                                }
                                if ($scope.seleccion <= 0) {
                                    $scope.seleccion = -1;
                                } else {
                                    $scope.seleccion = $scope.seleccion - 1;
                                    $scope.listado_destino[$scope.seleccion].estado = true;
                                    var id = $scope.listado_destino[$scope.seleccion].cod_dpto;
                                    var selector = tipo == 1 ? '#list-group-departamento-destino' : '#list-group-municipio-origen'
                                    document.querySelector(selector).scrollTo(0, document.querySelector('#DM' + id).offsetTop)
                                }
                                break;
                            case 13:
                                $scope.seleccion_opcion(tipo,)
                                break;
                            default:
                                $http({
                                    method: 'POST',
                                    url: "php/contratacion/direccionamiento.php",
                                    data: {
                                        function: 'P_LISTA_DPTO',
                                        v_pcoincidencia: palabra,
                                    }
                                }).then(function (response) {
                                    $scope.listado_destino = response.data;
                                });
                                break;
                        }
                        break;
                }
            }


            $scope.seleccion_opcion = function (tipo, id, nombre) {
                switch (tipo) {
                    case 1:
                        $scope.data.departamento_nombre = nombre
                        $scope.data.departamento_codigo = id
                        $scope.listado_origen = []
                        break;
                    case 2:
                        $scope.data.municipio_nombre = nombre
                        $scope.data.municipio_codigo = id
                        $scope.listado_origen_municipio = []
                        break;
                    case 3:
                        $scope.data.departamento_nombre_destino = nombre
                        $scope.data.departamento_nombre_destino_original = nombre
                        $scope.data.departamento_codigo_destino = id
                        $scope.listado_destino = []
                        $scope.busqueda_municipio_destino('');
                        break;
                }
            }

            $scope.busqueda_municipio_destino = function (palabra) {
                $scope.listado_municipio = [];
                $http({
                    method: 'POST',
                    url: "php/contratacion/direccionamiento.php",
                    data: {
                        function: 'P_LISTA_MPIO',
                        v_pcoincidencia: palabra,
                        v_pdpto: $scope.data.departamento_codigo_destino,
                    }
                }).then(function (response) {
                    for (const respuesta of response.data) {
                        var ind = $scope.listado_municipio_destino_escogidos.findIndex(obj => obj.cod_mpio == respuesta.cod_mpio);
                        if (ind == -1) {
                            $scope.listado_municipio.push(respuesta)
                        }
                    }
                });
            }

            $scope.selecionar_destino = function (nombre_mpio, cod_mpio) {
                if ($scope.mensaje_activo % 15 == 0) {
                    notification.getNotification('info', 'Recuerde que el orden de la prioridad de los municipios destinos, dependerá del orden en el que sean agregados.', 'Notificacion');
                }
                $scope.listado_municipio_destino_escogidos.push(
                    {
                        prioridad: 1,
                        regimen: $scope.regimen_origen,
                        cod_dpto_origen: $scope.data.departamento_codigo,
                        cod_mpio_origen: $scope.data.municipio_codigo,
                        cod_dpto_destino: $scope.data.departamento_codigo_destino,
                        nombre_dpto: $scope.data.departamento_nombre_destino_original,
                        nombre_mpio: nombre_mpio,
                        cod_mpio_destino: cod_mpio,
                        cod_mpio: cod_mpio,
                        costo: 1,
                        estrategia: 0,
                        estrategia_cod: false,
                        cant_estrategia: 0,
                        lista_estrategia: []
                    }
                )

                var ind = $scope.listado_municipio.findIndex(obj => obj.cod_mpio == cod_mpio);
                $scope.listado_municipio.splice(ind, 1);
                $scope.mensaje_activo = $scope.mensaje_activo + 1;
                $scope.$apply();


            }
            $scope.cambiar_prioridad = function (cod_mpio, nombre) {
                swal({
                    title: 'Digite la prioridad del municipio ' + nombre,
                    input: 'number',
                }).then(function (numero) {
                    var ind = $scope.listado_municipio_destino_escogidos.findIndex(obj => obj.cod_mpio == cod_mpio);
                    $scope.listado_municipio_destino_escogidos[ind].prioridad = numero;
                    $scope.$apply();
                })
            }
            $scope.elimina_destino = function (cod_mpio) {
                var ind = $scope.listado_municipio_destino_escogidos.findIndex(obj => obj.cod_mpio == cod_mpio);
                $scope.listado_municipio.push($scope.listado_municipio_destino_escogidos[ind])
                $scope.listado_municipio_destino_escogidos.splice(ind, 1);
            }
            $scope.bloquearOrigen = function () {
                if (
                    ($scope.data.departamento_codigo == '') || ($scope.data.departamento_codigo == undefined) || ($scope.data.departamento_codigo == null) ||
                    ($scope.data.municipio_codigo == "") || ($scope.data.municipio_codigo == undefined) || ($scope.data.municipio_codigo == null)
                ) {
                    swal('Información', "Debe llenar los campos de ORIGEN para selecionar el destino", 'info')
                } else {
                    $scope.data.departamento_nombre_destino = $scope.data.departamento_nombre
                    $scope.data.departamento_nombre_destino_original = $scope.data.departamento_nombre
                    $scope.data.departamento_codigo_destino = $scope.data.departamento_codigo
                    $scope.busqueda_municipio_destino('');
                    $scope.bloquear_origen = true;
                    $scope.listado_municipio_destino_escogidos.push(
                        {
                            prioridad: 1,
                            regimen: $scope.regimen_origen,
                            cod_dpto_origen: $scope.data.departamento_codigo_destino,
                            cod_mpio_origen: $scope.data.municipio_codigo,
                            cod_dpto_destino: $scope.data.departamento_codigo_destino,
                            nombre_dpto: $scope.data.departamento_nombre_destino_original,
                            nombre_mpio: $scope.data.municipio_nombre,
                            cod_mpio_destino: $scope.data.municipio_codigo,
                            cod_mpio: $scope.data.municipio_codigo,
                            costo: 1,
                            estrategia_cod: false,
                            estrategia: 0,
                            cant_estrategia: 0,
                            lista_estrategia: []
                        }
                    )
                }
            }
            $scope.siguiente = function () {
                $scope.paso = 2;
            }

            $scope.elegir_ips_estrategica = function (data) {
                $scope.data_modal = data;
                $scope.municipio_codigo_modal = data.cod_mpio;
                $scope.municipio_nombre_modal = data.nombre_mpio;
                $scope.listado_ips_escogidos = data.lista_estrategia;
                $scope.busqueda_ips_estrategica();
                $('#modal_ips_estrategica').modal('open');

                var ind = $scope.listado_municipio_destino_escogidos.findIndex(obj => obj.cod_mpio == $scope.municipio_codigo_modal);
                if (data.lista_estrategia.length == 0) {
                    $scope.listado_municipio_destino_escogidos[ind].estrategia_cod = false;
                } else {
                    $scope.listado_municipio_destino_escogidos[ind].estrategia_cod = true;
                }


            }

            $scope.busqueda_ips_estrategica = function (palabra) {
                $scope.listado_ips_estrategicas = [];
                $http({
                    method: 'POST',
                    url: "php/contratacion/direccionamiento.php",
                    data: {
                        function: 'P_LISTA_IPS_ESTRATEGIA',
                        v_pcoincidencia: palabra,
                        v_pcod_mpio: $scope.municipio_codigo_modal,
                        v_pregimen: $scope.regimen_origen
                    }
                }).then(function (response) {
                    for (const respuesta of response.data) {
                        var ind = $scope.listado_ips_escogidos.findIndex(obj => obj.codigo_ips == respuesta.codigo_ips);
                        if (ind == -1) {
                            $scope.listado_ips_estrategicas.push(respuesta)
                        }
                    }
                });
            }

            $scope.seleccionar_ips = function (codigo_ips, nombre_ips) {

                $scope.listado_ips_escogidos.push(
                    {
                        regimen: $scope.regimen_origen,
                        nit: codigo_ips,
                        nombre_ips: nombre_ips
                    }
                )
                var ind = $scope.listado_ips_estrategicas.findIndex(obj => obj.codigo_ips == codigo_ips);
                $scope.listado_ips_estrategicas.splice(ind, 1);
                $scope.$apply();

            }
            $scope.elimina_ips = function (codigo_ips) {
                var ind = $scope.listado_ips_escogidos.findIndex(obj => obj.codigo_ips == codigo_ips);
                $scope.listado_ips_estrategicas.push($scope.listado_ips_escogidos[ind])
                $scope.listado_ips_escogidos.splice(ind, 1);
            }


            $scope.guardar_ips_estrategica = function () {
                var ind = $scope.listado_municipio_destino_escogidos.findIndex(obj => obj.cod_mpio == $scope.municipio_codigo_modal);
                if ($scope.listado_ips_escogidos.length == 0) {
                    $scope.listado_municipio_destino_escogidos[ind].estrategia_cod = false;
                    $scope.listado_municipio_destino_escogidos[ind].lista_estrategia = [];
                    $scope.listado_municipio_destino_escogidos[ind].cant_estrategia = 0;
                    $scope.listado_municipio_destino_escogidos[ind].estrategia = 0;
                } else {
                    $scope.listado_municipio_destino_escogidos[ind].estrategia_cod = true;
                    $scope.listado_municipio_destino_escogidos[ind].lista_estrategia = $scope.listado_ips_escogidos;
                    $scope.listado_municipio_destino_escogidos[ind].cant_estrategia = $scope.listado_ips_escogidos.length;
                    $scope.listado_municipio_destino_escogidos[ind].estrategia = 1;
                }
                $('#modal_ips_estrategica').modal('close');


            }

            $scope.guardar = function () {
                $http({
                    method: 'POST',
                    url: "php/contratacion/direccionamiento.php",
                    data: {
                        function: 'P_REGISTRO_UBIC_ESCENARIOS',
                        v_pjson_in: JSON.stringify($scope.listado_municipio_destino_escogidos),
                        v_pcantidad_esc: $scope.listado_municipio_destino_escogidos.length,
                    }
                }).then(function (response) {
                    if (response.data.Codigo == 0) {
                        swal({
                            title: "Completado!",
                            text: "Se Guardo con exito",
                            type: "success"
                        }).then(function () {
                            $scope.init();
                        })
                    } else {
                        swal('Información', response.data.Nombre, 'info')
                    }


                });

            }


        }])