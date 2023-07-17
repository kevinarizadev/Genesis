'use strict';



angular.module('GenesisApp')
    .controller('direccionamientohospitalarioController', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$rootScope',
        function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $rootScope) {

            $(document).ready(function () {
                $('#modal_ips_estrategica').modal();
                $('#modal_editar_municipios_destino').modal();
                $('#modal_ips_estrategica_editar').modal();
            })

            $scope.menu_principal = function () {
                $scope.camino_direcionamiento = 1;
                $scope.paso = 0;
                $scope.paso_listado = 0;
                $scope.datorol = 1;

            }
            $scope.menu_principal()

            $scope.init_direccionamiento_basico = function () {
                $scope.paso = 1;
                $scope.data = {};
                $scope.paso_listado = 0;
                $scope.seleccion = 0
                $scope.bloquear_origen = false;
                $scope.regimen_origen = "";
                $scope.listado_municipio_destino_escogidos = [];
                $scope.mensaje_activo = 15;
            }
            $scope.init_direccionamiento_avanzado = function () {
                $scope.paso = 1;
                $scope.listado_cups = [];
            }
            // $scope.init_dirreccionamiento_basico();

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
                                    url: "php/contratacion/direccionamientohospitalario.php",
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
                                    url: "php/contratacion/direccionamientohospitalario.php",
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
                                    url: "php/contratacion/direccionamientohospitalario.php",
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
                    url: "php/contratacion/direccionamientohospitalario.php",
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
                    url: "php/contratacion/direccionamientohospitalario.php",
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
                var ind = $scope.listado_ips_escogidos.findIndex(obj => obj.nit == codigo_ips);
                // $scope.listado_ips_estrategicas.push($scope.listado_ips_escogidos[ind])
                $scope.listado_ips_estrategicas.push(
                    {
                        regimen: $scope.listado_ips_escogidos[ind].regimen_origen,
                        codigo_ips: $scope.listado_ips_escogidos[ind].nit,
                        nombre_ips: $scope.listado_ips_escogidos[ind].nombre_ips
                    })
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
                    url: "php/contratacion/direccionamientohospitalario.php",
                    data: {
                        function: 'P_REGISTRO_UBIC_ESCENARIOS',
                        v_pjson_in: JSON.stringify($scope.listado_municipio_destino_escogidos),
                        v_pcantidad_esc: $scope.listado_municipio_destino_escogidos.length,
                    }
                }).then(function (response) {
                    if (response.data.Codigo == 0) {
                        swal({
                            title: "Completado!",
                            text: response.data.Nombre,
                            type: "success"
                        }).then(function () {

                        })

                        $scope.init_direccionamiento_basico();
                    } else {
                        swal('Información', response.data.Nombre, 'info')
                    }


                });

            }
            //nuevo
            $scope.buscar_listado_select = function () {
                if ($scope.v_ptercero_nombre.length >= 6) {
                    $http({
                        method: 'POST',
                        url: "php/contratacion/direccionamientohospitalario.php",
                        data: {
                            function: 'P_OBTENER_IPS',
                            v_pcoindicencia: $scope.v_ptercero_nombre
                        }
                    }).then(function (response) {
                        if (response.data.length == 0) {
                            $scope.ListarResultado = "";
                        } else {
                            if (response.data[0].codigo == 1) {
                                $scope.json_prestador = [];
                            } else {
                                if (response.data.length == 1) {
                                    $scope.seleccion_opcion2(response.data[0].nit, response.data[0].nombre_ips, response.data[0]);
                                } else {
                                    $scope.json_prestador = response.data;
                                    console.log($scope.json_prestador);
                                }
                            }


                        }
                    });
                }
            }

            $scope.seleccion_opcion2 = function (codigo, nombre, data) {
                $scope.v_ptercero = codigo;
                $scope.v_ptercero_nombre = codigo + " - " + nombre;
                $scope.inforips = data;
                //$scope.json_prestador = [];
                $scope.listar_codHabilitacion();
            }

            $scope.buscar_contrato = function () {
                $http({
                    method: 'POST',
                    url: "php/contratacion/direccionamientohospitalario.php",
                    data: {
                        function: 'P_LISTA_CONTRATO_IPS',
                        v_pregimen: $scope.v_pregimen_fse2,
                        v_ptercero: $scope.v_ptercero,
                    }
                }).then(function (response) {
                    if (response.data.length == 1) {
                        $scope.cntc_documento = response.data[0].cntc_documento;
                        $scope.cntn_numero = response.data[0].cntn_numero
                        $scope.cntn_ubicacion = response.data[0].cntn_ubicacion
                        $scope.buscar_cups();
                    } else {
                        //$scope.listado_cups = response.data;
                    }

                });
            }
            $scope.buscar_cups = function () {
                $scope.listado_cups = [];
                $http({
                    method: 'POST',
                    url: "php/contratacion/direccionamientohospitalario.php",
                    data: {
                        function: 'p_lista_productos_contrato',
                        v_pdocumento: $scope.cntc_documento,
                        v_pnumero: $scope.cntn_numero,
                        v_pubicacion: $scope.cntn_ubicacion
                    }
                }).then(function (response) {
                    $scope.listado_cups = response.data;
                });
            }
            $scope.buscar_afiliado_fs2 = function () {
                $http({
                    method: 'POST',
                    url: "php/contratacion/direccionamientohospitalario.php",
                    data: {
                        function: 'P_OBTENER_AFILIADO',
                        v_ptipodocumento: $scope.tipo_docuemtno_prt2,
                        v_pdocumento: $scope.documento_prt2,
                        v_ptipo_busqueda: $scope.mostrar_busqueda == 1 ? 'A' : 'N',
                        v_papellido1: $scope.apellido1_buscar,
                        v_papellido2: $scope.apellido2_buscar,
                        v_pnombre1: $scope.nombre1_buscar,
                        v_pnombre2: $scope.nombre2_buscar,
                    }
                }).then(function (response) {
                    console.log(response);
                });
            }

            $scope.P_INSERTAR_DIR_AVANZADO = function () {
                var v_pjson_in = [];
                $http({
                    method: 'POST',
                    url: "php/contratacion/direccionamientohospitalario.php",
                    data: {
                        function: 'P_INSERTAR_DIR_AVANZADO',
                        v_pjson_in: v_pjson_in,
                        v_pcantidad_afi: v_pcantidad_afi,
                    }
                }).then(function (response) {
                    console.log(response);
                });
            }


            $scope.P_LISTA_DIR_BASICO = function () {
                $scope.json_dir_basico = [];
                $scope.buscar_tabla_basica = "";

                $http({
                    method: 'POST',
                    url: "php/contratacion/direccionamientohospitalario.php",
                    data: {
                        function: 'P_LISTA_DIR_BASICO',
                        v_pregimen: $scope.v_pregimen_listado,
                    }
                }).then(function (response) {
                    if (response.data[0].Codigo == 1) {
                        swal('Advertencia', response.data[0].Nombre, 'warning')
                    } else {
                        $scope.json_dir_basico = response.data;
                        console.log(response);
                        $scope.paso_listado = 1;
                    }

                });
            }

            $scope.P_LISTA_DETALLE_DIR_BASICO = function (v_pmpio_origen) {
                $scope.v_pjson_detalle = [];
                $scope.buscar_tabla_basica = "";

                $http({
                    method: 'POST',
                    url: "php/contratacion/direccionamientohospitalario.php",
                    data: {
                        function: 'P_LISTA_DETALLE_DIR_BASICO',
                        v_pregimen: $scope.v_pregimen_listado,
                        v_pmpio_origen: v_pmpio_origen
                    }
                }).then(function (response) {
                    $scope.v_pmpio_origen = v_pmpio_origen;
                    $scope.v_pjson_detalle = response.data;
                    $scope.paso_listado = 2;
                    $scope.editar_vista2 = false

                });
            }


            // edicion de direecionamiendo basico



            //    EDITAR

            $scope.cambiar_prioridad_municipio = function (dato) {
                var ind = this.v_pjson_municipio_editar.indexOf(dato)
                // var ind_tempo = $scope.v_pjson_municipio_editar[index_selecionado];
                $scope.ind_tempo = ind;
                swal({
                    title: 'Digite la prioridad del municipio ' + $scope.v_pjson_municipio_editar[ind].nombre_mpio_destino,
                    input: 'number',
                }).then(function (numero) {
                    if (numero < 0) {
                        swal({
                            title: "Error!",
                            text: "Número no valido. No es posible actualizar la Priorización",
                            type: "error"
                        }).then(function () {
                        })
                    } else if (numero > $scope.v_pjson_municipio_editar.length) {
                        swal({
                            title: "Error!",
                            text: "La prioridad es mas alta de la cantidad de registros",
                            type: "error"
                        }).then(function () {
                        })
                    } else if (numero == 1) {
                        swal({
                            title: "Error!",
                            text: "No es posible actualizar la priorizar con 1, ya que el municipio origen es la priorizacion principal",
                            type: "error"
                        }).then(function () {
                        })
                    }
                    else {
                        $scope.v_pjson_municipio_editar[$scope.ind_tempo].priorizacion = numero;
                        setTimeout(() => {
                            console.log($scope.v_pjson_municipio_editar[$scope.ind_tempo]);
                            $scope.$apply();
                        }, 500);
                    }
                    // var ind = $scope.listado_municipio_destino_escogidos.findIndex(obj => obj.cod_mpio == cod_mpio);

                })

            }


            $scope.editar_municipio_mostrar = function () {
                $scope.v_pjson_municipio_editar = $scope.v_pjson_detalle;
                for (let index = 0; index < $scope.v_pjson_municipio_editar.length; index++) {
                    $scope.v_pjson_municipio_editar[index].estado = "A"
                }
                $scope.editar_vista2 = true;
            }
            $scope.editar_estrategia_mostrar = function () {
                $scope.v_pjson_estrategia_editar = $scope.v_pjson_estrategia;
                for (let index = 0; index < $scope.v_pjson_estrategia_editar.length; index++) {
                    $scope.v_pjson_estrategia_editar[index].estado = "A"
                }
                $scope.editar_vista_3 = true;
            }
            $scope.eliminar_destino = function (dato) {
                //var dato = this.v_pjson_municipio_editar.find(ds => ds.value == this.jsonTour.customerTypes[index].value);
                var index_selecionado = this.v_pjson_municipio_editar.indexOf(dato)
                var x = $scope.v_pjson_municipio_editar[index_selecionado];
                var mensaje = `¿Seguro que Desea ${x.estado == 'A' ? 'Desactivar' : 'Activar'} el destino ${x.nombre_mpio_origen} al origen ${x.nombre_mpio_destino} ?`;
                swal({
                    title: 'Confirmar',
                    text: mensaje,
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    $scope.v_pjson_municipio_editar[index_selecionado].estado = x.estado == 'A' ? 'I' : 'A';
                    setTimeout(() => {
                        $scope.$apply();
                    }, 500);
                })
            }
            $scope.eliminar_destino2 = function (dato) {
                //var dato = this.v_pjson_municipio_editar.find(ds => ds.value == this.jsonTour.customerTypes[index].value);
                var index_selecionado = this.v_pjson_municipio_editar.indexOf(dato)
                var x = $scope.v_pjson_municipio_editar[index_selecionado];
                var mensaje = `¿Seguro que Desea eliminar el destino ${x.nombre_mpio_origen} al origen ${x.nombre_mpio_origen} ?`;
                swal({
                    title: 'Confirmar',
                    text: mensaje,
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    this.v_pjson_municipio_editar.splice(index_selecionado, 1);
                    setTimeout(() => {
                        $scope.$apply();
                    }, 500);
                })
            }

            $scope.selecionar_destino_editar = function (nombre_mpio, cod_mpio) {
                var dato = $scope.v_pjson_municipio_editar.find(ds => ds.cod_mpio_destino == cod_mpio);
                if (dato == undefined) {
                    //var index_selecionado = this.v_pjson_municipio_editar.indexOf(dato)
                    $scope.v_pjson_municipio_editar.push({
                        cod_dpto_destino: $scope.data.departamento_codigo_destino,
                        cod_dpto_origen: $scope.v_pjson_municipio_editar[0].cod_dpto_origen,
                        cod_mpio_destino: cod_mpio,
                        cod_mpio_origen: $scope.v_pjson_municipio_editar[0].cod_mpio_origen,
                        costo: "0",
                        estrategia: "0",
                        nombre_dpto_destino: $scope.data.departamento_nombre_destino_original,
                        nombre_dpto_origen: $scope.v_pjson_municipio_editar[0].nombre_dpto_origen,
                        nombre_mpio_destino: nombre_mpio,
                        nombre_mpio_origen: $scope.v_pjson_municipio_editar[0].nombre_mpio_origen,
                        priorizacion: $scope.v_pjson_municipio_editar.length + 1,
                        regimen: $scope.v_pjson_municipio_editar[0].regimen,
                        estado: 'N'

                    })
                    $('#modal_editar_municipios_destino').modal('close');
                } else {
                    swal({
                        title: "Error!",
                        text: "Ya exite un municipio Destino con los mismos datos ",
                        type: "error"
                    }).then(function () {
                    })
                }
            }
            $scope.abrir_modal_destino_editar = function () {
                $('#modal_editar_municipios_destino').modal('open');
                $scope.data = {};
                // $scope.data.departamento_codigo_destino = $scope.v_pjson_municipio_editar[0].cod_dpto_origen;
                // $scope.data.departamento_nombre_destino_original = $scope.v_pjson_municipio_editar[0].nombre_dpto_origen
                // $scope.data.departamento_nombre_destino = $scope.v_pjson_municipio_editar[0].nombre_dpto_origen
                $scope.listado_municipio_destino_escogidos = [];
                $scope.listado_municipio = [];

            }


            $scope.actualizar_destino = function () {
                var repetir = 0;
                for (const iten1 of $scope.v_pjson_municipio_editar) {
                    repetir = 0;
                    for (const iten2 of $scope.v_pjson_municipio_editar) {
                        if (iten1.priorizacion == iten2.priorizacion) {
                            repetir += 1
                        }
                    }
                    if (repetir != 1) {
                        swal({
                            title: "Error!",
                            text: "La prioridad esta repetida para este municipio " + iten1.nombre_mpio_destino,
                            type: "error"
                        }).then(function () {
                        })
                        return;
                    }
                }
                var datos_envio = [];
                for (const iterator of $scope.v_pjson_municipio_editar) {
                    datos_envio.push({
                        regimen: iterator.regimen,
                        cod_dpto_origen: iterator.cod_dpto_origen,
                        cod_mpio_origen: iterator.cod_mpio_origen,
                        cod_dpto_destino: iterator.cod_dpto_destino,
                        cod_mpio_destino: iterator.cod_mpio_destino,
                        accion: iterator.estado == 'N' ? 'A' : iterator.estado,
                        prioridad: parseInt(iterator.priorizacion)
                    })
                }

                console.table(datos_envio);
                var n, i, k, aux;
                n = datos_envio.length;
                for (k = 1; k < n; k++) {
                    for (i = 0; i < (n - k); i++) {
                        if (datos_envio[i].prioridad > datos_envio[i + 1].prioridad) {
                            aux = datos_envio[i];
                            datos_envio[i] = datos_envio[i + 1];
                            datos_envio[i + 1] = aux;
                        }
                    }
                }
                for (k = 1; k < n; k++) {
                    for (i = 0; i < (n - k); i++) {
                        var a = datos_envio[i].accion == 'A' ? 1 : 2;
                        var b = datos_envio[i + 1].accion == 'A' ? 1 : 2;
                        if (a > b) {
                            aux = datos_envio[i];
                            datos_envio[i] = datos_envio[i + 1];
                            datos_envio[i + 1] = aux;
                        }
                    }
                }

                console.table(datos_envio);
                console.log(JSON.stringify(datos_envio));
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/direccionamientohospitalario.php",
                    data: {
                        function: 'P_MODIFICACION_DIRECCIONAMIENTO',
                        V_PJSON_IN: JSON.stringify(datos_envio),
                        V_PCANTIDAD_ESC: datos_envio.length
                    }
                }).then(function (response) {
                    console.log(response);
                    if (response.data.Codigo == 0) {
                        swal({
                            title: "Completado!",
                            text: response.data.Nombre,
                            type: "success"
                        }).then(function () {
                            $scope.P_LISTA_DETALLE_DIR_BASICO($scope.v_pjson_municipio_editar[0].cod_mpio_origen);
                        })
                    } else {
                        swal({
                            title: "Error!",
                            text: response.data.Nombre,
                            type: "error"
                        }).then(function () {
                        })
                    }

                });

            }


            // estrategia
            $scope.P_LISTA_ESTRATEGIA_DIR_BASICO = function (x) {
                $scope.municipio_elegido = x;
                $scope.v_pjson_estrategia = [];
                $scope.buscar_tabla_basica = "";
                $http({
                    method: 'POST',
                    url: "php/contratacion/direccionamientohospitalario.php",
                    data: {
                        function: 'P_LISTA_ESTRATEGIA_DIR_BASICO',
                        v_pregimen: $scope.v_pregimen_listado,
                        v_pmpio_origen: x.cod_mpio_origen,
                        v_pmpio_destino: x.cod_mpio_destino
                    }
                }).then(function (response) {
                    if (response.data[0].Codigo == 1) {
                        swal({
                            title: "Informacion!",
                            text: response.data[0].Nombre,
                        }).then(function () {
                        })
                        $scope.v_pjson_estrategia = [];
                    } else {
                        $scope.v_pjson_estrategia = response.data;
                        $scope.paso_listado = 3;
                        $scope.editar_vista_3 = false;
                    }

                });
            }

            $scope.P_LISTA_ESTRATEGIA_DIR_BASICO_NUEVO = function (x) {
                $scope.v_pjson_estrategia = [];
                $scope.v_pjson_estrategia_editar = [];
                $scope.buscar_tabla_basica = "";
                $scope.paso_listado = 3;
                $scope.editar_vista_3 = true;
                $scope.municipio_elegido = x;
            }
            $scope.eliminar_estrategia = function (dato) {
                //var dato = this.v_pjson_municipio_editar.find(ds => ds.value == this.jsonTour.customerTypes[index].value);
                var index_selecionado = this.v_pjson_estrategia_editar.indexOf(dato)
                var x = $scope.v_pjson_estrategia_editar[index_selecionado];
                var mensaje = `¿Seguro que Desea ${x.estado == 'A' ? 'Desactivar' : 'Activar'} la IPS estrategica ${x.nit_estrategia} ${x.nombre_ips_estrategia} ?`;
                swal({
                    title: 'Confirmar',
                    text: mensaje,
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    $scope.v_pjson_estrategia_editar[index_selecionado].estado = x.estado == 'A' ? 'I' : 'A';
                    setTimeout(() => {
                        $scope.$apply();
                    }, 500);
                })
            }
            $scope.eliminar_estrategia2 = function (dato) {
                //var dato = this.v_pjson_municipio_editar.find(ds => ds.value == this.jsonTour.customerTypes[index].value);
                var index_selecionado = this.v_pjson_estrategia_editar.indexOf(dato)
                var x = $scope.v_pjson_estrategia_editar[index_selecionado];
                var mensaje = `¿Seguro que Desea eliminar la IPS estrategica ${x.nit_estrategia} ${x.nombre_ips_estrategia} ?`;
                swal({
                    title: 'Confirmar',
                    text: mensaje,
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    this.v_pjson_estrategia_editar.splice(index_selecionado, 1);
                    setTimeout(() => {
                        $scope.$apply();
                    }, 500);
                })
            }

            $scope.cambiar_prioridad_estrategia = function (dato) {
                var ind = this.v_pjson_estrategia_editar.indexOf(dato)
                // var ind_tempo = $scope.v_pjson_estrategia_editar[index_selecionado];
                $scope.ind_tempo = ind;
                swal({
                    title: 'Digite la prioridad de la IPS estrategica ' + $scope.v_pjson_estrategia_editar[ind].nit_estrategia + '  ' + $scope.v_pjson_estrategia_editar[ind].nombre_ips_estrategia,
                    input: 'number',
                }).then(function (numero) {
                    if (numero < 0) {
                        swal({
                            title: "Error!",
                            text: "Número no valido. No es posible actualizar la Priorización",
                            type: "error"
                        }).then(function () {
                        })
                    } else if (numero > $scope.v_pjson_estrategia_editar.length) {
                        swal({
                            title: "Error!",
                            text: "La prioridad es mas alta de la cantidad de registros",
                            type: "error"
                        }).then(function () {
                        })
                    } else {
                        $scope.v_pjson_estrategia_editar[$scope.ind_tempo].prioridad_estrategia = numero;
                        setTimeout(() => {
                            console.log($scope.v_pjson_estrategia_editar[$scope.ind_tempo]);
                            $scope.$apply();
                        }, 500);
                    }
                    // var ind = $scope.listado_municipio_destino_escogidos.findIndex(obj => obj.cod_mpio == cod_mpio);

                })

            }
            // modal_editar_municipios_destino

            $scope.agregar_estrategia_mostrar = function () {
                $scope.busqueda_ips_estrategica2();
                $('#modal_ips_estrategica_editar').modal('open');
            }
            $scope.busqueda_ips_estrategica2 = function () {
                $scope.listado_ips_estrategicas2 = [];
                $http({
                    method: 'POST',
                    url: "php/contratacion/direccionamientohospitalario.php",
                    data: {
                        function: 'P_LISTA_IPS_ESTRATEGIA',
                        v_pcoincidencia: '',
                        v_pcod_mpio: $scope.municipio_elegido.cod_mpio_destino,
                        v_pregimen: $scope.municipio_elegido.regimen
                    }
                }).then(function (response) {
                    if (response.data.length == 0) {
                        swal({
                            title: "Información!",
                            text: "Para el municipio " + $scope.municipio_elegido.nombre_mpio_destino + " no hay IPS que tengan contrato en estado procesado y vigente para la fecha",
                        }).then(function () {
                            $('#modal_ips_estrategica_editar').modal('close');

                        })
                        $scope.listado_ips_estrategicas2 = [];
                    } else {
                        $scope.listado_ips_estrategicas2 = response.data;
                    }

                });
            }

            $scope.seleccionar_ips2 = function (x) {
                var dato = $scope.v_pjson_estrategia_editar.find(ds => ds.nit_estrategia == x.codigo_ips);
                if (dato == undefined) {
                    $scope.v_pjson_estrategia_editar.push(
                        {
                            cod_dpto_destino: $scope.municipio_elegido.cod_dpto_destino,
                            cod_dpto_origen: $scope.municipio_elegido.cod_dpto_origen,
                            cod_mpio_destino: $scope.municipio_elegido.cod_mpio_destino,
                            cod_mpio_origen: $scope.municipio_elegido.cod_mpio_origen,
                            nit_estrategia: x.codigo_ips,
                            nombre_dpto_destino: $scope.municipio_elegido.nombre_dpto_destino,
                            nombre_dpto_origen: $scope.municipio_elegido.nombre_dpto_origen,
                            nombre_ips_estrategia: x.nombre_ips,
                            nombre_mpio_destino: $scope.municipio_elegido.nombre_mpio_destino,
                            nombre_mpio_origen: $scope.municipio_elegido.nombre_mpio_origen,
                            prioridad_estrategia: $scope.v_pjson_estrategia_editar.length + 1,
                            prioridad_estrategia_bd: $scope.v_pjson_estrategia_editar.length + 1,
                            regimen: $scope.v_pregimen_listado,
                            estado: 'N'
                        }
                    )
                } else {
                    swal({
                        title: "Error!",
                        text: "Ya exite una IPS estrategica con los mismos datos ",
                        type: "error"
                    }).then(function () {
                    })
                }
                $('#modal_ips_estrategica_editar').modal('close');
            }

            $scope.actualizar_estrategia = function () {

                var repetir = 0;
                for (const iten1 of $scope.v_pjson_estrategia_editar) {
                    repetir = 0;
                    for (const iten2 of $scope.v_pjson_estrategia_editar) {
                        if (iten1.prioridad_estrategia == iten2.prioridad_estrategia) {
                            repetir += 1
                        }
                    }
                    if (repetir != 1) {
                        swal({
                            title: "Error!",
                            text: "La prioridad esta repetida para este IPS estrategica " + iten1.nit_estrategia + '-' + iten1.nombre_ips_estrategia,
                            type: "error"
                        }).then(function () {
                        })
                        return;
                    }
                }
                var datos_envio = [];
                for (const iterator of $scope.v_pjson_estrategia_editar) {
                    datos_envio.push({
                        regimen: iterator.regimen,
                        cod_dpto_origen: iterator.cod_dpto_origen,
                        cod_mpio_origen: iterator.cod_mpio_origen,
                        cod_dpto_destino: iterator.cod_dpto_destino,
                        cod_mpio_destino: iterator.cod_mpio_destino,
                        nit: iterator.nit_estrategia,
                        accion: iterator.estado == 'N' ? 'A' : iterator.estado,
                        prioridad: parseInt(iterator.prioridad_estrategia),
                    })
                }

                console.table(datos_envio);
                var n, i, k, aux;
                n = datos_envio.length;
                for (k = 1; k < n; k++) {
                    for (i = 0; i < (n - k); i++) {
                        if (datos_envio[i].prioridad > datos_envio[i + 1].prioridad) {
                            aux = datos_envio[i];
                            datos_envio[i] = datos_envio[i + 1];
                            datos_envio[i + 1] = aux;
                        }
                    }
                }
                for (k = 1; k < n; k++) {
                    for (i = 0; i < (n - k); i++) {
                        var a = datos_envio[i].accion == 'A' ? 1 : 2;
                        var b = datos_envio[i + 1].accion == 'A' ? 1 : 2;
                        if (a > b) {
                            aux = datos_envio[i];
                            datos_envio[i] = datos_envio[i + 1];
                            datos_envio[i + 1] = aux;
                        }
                    }
                }

                console.table(datos_envio);
                console.log(JSON.stringify(datos_envio));
                $http({
                    method: 'POST',
                    url: "php/contratacion/direccionamientohospitalario.php",
                    data: {
                        function: 'P_MODIFICACION_ESTRATEGIA',
                        V_PJSON_IN: JSON.stringify(datos_envio),
                        V_PCANTIDAD_ESC: datos_envio.length
                    }
                }).then(function (response) {
                    if (response.data.Codigo == 0) {
                        swal({
                            title: "Completado!",
                            text: response.data.Nombre,
                            type: "success"
                        }).then(function () {
                            $scope.P_LISTA_ESTRATEGIA_DIR_BASICO($scope.municipio_elegido);
                        })
                    } else {
                        swal({
                            title: "Error!",
                            text: response.data.Nombre,
                            type: "error"
                        }).then(function () {

                        })
                    }

                });

            }


        }])