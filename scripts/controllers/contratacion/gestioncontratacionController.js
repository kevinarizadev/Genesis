'use strict';
angular.module('GenesisApp')
    .controller('gestioncontratacionController', ['$scope', '$http',
        function ($scope, $http) {

            //modal
            $(document).ready(function () {
                $('#modalproducto').modal();
                $('#modalproducto2').modal();
                $('#modal_guardar_producto').modal();
                $('#modal_buscar_producto_para_agregar').modal();
                $('#modal_productos_cambiados').modal();
                $('#modalservicio').modal();
                $('#modal_subcategorias').modal();
                $('#modal_buscar_ips_para_agregar').modal();

                // $.getJSON("php/obtenersession.php").done(function (respuesta) {
                // 	$scope.sesdata = respuesta;
                // 	$scope.cedulalog = $scope.sesdata.cedula;
                //     console.log($scope.result_perfil);
                // });
                // setTimeout(() => {
                //     $scope.busqueda.numero = 4082;
                //     $scope.busqueda.regimen = 'KS';
                //     $scope.busqueda.estado = 'T';
                //     $scope.buscar();
                //     setTimeout(() => {
                //         $scope.gestionar_contrato(0);
                //     }, 1000)
                // }, 2000)


            })
            //VARIABLES DE USUARIO
            $scope.usuario_cedula = sessionStorage.getItem('cedula');
            $scope.usuario_cargo = sessionStorage.getItem('cargo');
            $scope.usuario_nombre = sessionStorage.getItem('nombre');
            $scope.usuario_rol = sessionStorage.getItem('rolcod');
            // MENU DE GESTION
            $scope.json_gestion = [
                {
                    titulo: "MODIFICACIÓN",
                    id: "1"
                },
                {
                    titulo: "BITÁCORAS",
                    id: "2"
                },
                {
                    titulo: "PÓLIZAS",
                    id: "3"
                }
            ];
            $scope.hover_busqueda = false;
            // ubicacion
            $http({
                method: 'POST',
                url: "php/funclistas.php",
                data: { function: 'cargaDepartamentos' }
            }).then(function (response) {
                $scope.json_departamentos = response.data;
            });
             //LISTA FORMAS DE PAGO - CNVU
             $http({
                method: 'POST',
                url: "php/contratacion/funccontratacion.php",
                data: { function: 'P_LISTA_FORMA_PAGO' }
            }).then(function (response) {
                $scope.json_formapago = response.data;
            });
            $scope.filtrar_municipio = function () {

                $http({
                    method: 'PSOT',
                    url: "php/funclistas.php",
                    data: { function: 'cargaMunicipios', depa: $scope.busqueda.departamento }
                }).then(function (response) {
                    $scope.json_municipio = "";
                    $scope.json_municipio = response.data;
                });
            }
            // ubicacion

            //VARIABLES INICIALES
            $scope.busqueda = {
                numero: null,
                departamento: "",
                municipio: "",
                prestador: "",
                prestador_nombre: ""
            };
            //PRESTADOR 
            $scope.buscar_listado_select = function () {
                if ($scope.busqueda.prestador_nombre.length >= 4) {
                    $http({
                        method: 'POST',
                        url: "php/contratacion/gestioncontrato.php",
                        data: {
                            function: 'p_obtener_ips_contratado',
                            codigo: $scope.busqueda.prestador_nombre
                        }
                    }).then(function (response) {
                        if (response.data.length == 0) {
                            $scope.ListarResultado = "";
                        } else {
                            if (response.data[0].CODIGO == 1) {
                                $scope.json_prestador = [];
                            } else {
                                if (response.data.length == 1) {
                                    $scope.seleccion_opcion(response.data[0].CODIGO, response.data[0].NOMBRE);
                                } else {
                                    $scope.json_prestador = response.data;
                                    console.log($scope.json_prestador);
                                }
                            }
                        }
                    });
                } else if ($scope.busqueda.prestador.length >= 5) {
                    $http({
                        method: 'POST',
                        url: "php/contratacion/gestioncontrato.php",
                        data: {
                            function: 'p_obtener_ips_contratado',
                            codigo: $scope.busqueda.prestador_nombre
                        }
                    }).then(function (response) {
                        if (response.data.length == 0) {
                            $scope.ListarResultado = "";
                        } else {
                            if (response.data.length == 1) {
                                $scope.seleccion_opcion(response.data[0].CODIGO, response.data[0].NOMBRE);
                            }

                        }
                    });
                }
            }
            $scope.seleccion_opcion = function (codigo, nombre) {

                $scope.busqueda.prestador = codigo;
                $scope.busqueda.prestador_nombre = nombre;
                $scope.json_prestador = [];
            }
            $scope.viewfindcontrato = true; //VISTA DE IPS
            $scope.inactivecontratos = true;
            $scope.paso = 1;
            $scope.titulo_tab = "Resultados Encontrados";
            //variables de relleno
            $scope.estado = 'A';

            //buscar por ips, unicaicon o prestado
            $scope.borrar_busqueda_contrato = function () {
                //VARIABLES INICIALES
                $scope.busqueda = {
                    numero: null,
                    estado: "",
                    regimen: "",
                    prestador: "",
                    prestador_nombre: ""
                };
                $scope.inactivecontratos = true;
            }
            $scope.buscar = function () {
                if (
                    ($scope.busqueda.numero == null) &&
                    ($scope.busqueda.prestador == "")
                ) {
                    swal('Información', "Por lo menos digitar un campo de busqueda valido", 'info');
                    $scope.ListarResultado = "";
                    $scope.inactivecontratos = true;

                } else {
                    if (($scope.busqueda.estado == "") || ($scope.busqueda.regimen == "")) {
                        swal('Información', "El campo Estado y Regimen Debe ser Obligatorio", 'info');
                        $scope.ListarResultado = "";
                        $scope.inactivecontratos = true;
                    } else {
                        swal({
                            title: 'Cargando información...',
                            allowEscapeKey: false,
                            allowOutsideClick: false
                        });
                        swal.showLoading();
                        $http({
                            method: 'POST',
                            url: "php/contratacion/tarifacategoria.php",
                            data: {
                                function: 'P_BUSCAR_CONTRATOS',
                                codigo: $scope.busqueda.numero,
                                prestador: $scope.busqueda.prestador,
                                regimen: $scope.busqueda.regimen,
                                estado: $scope.busqueda.estado,
                            }
                        }).then(function (response) {
                            if (response.data.toString().substr(0, 3) != '<br') {
                                swal.close();
                                if (response.data.codigo == 1) {
                                    var mensaje = response.data.Nombre == null ? "No se encontrarón Resultados " : response.data.Nombre;
                                    swal('Información', mensaje, 'info');
                                    $scope.inactivecontratos = true;
                                } else {
                                    $scope.json_contratos = response.data;
                                    $scope.inactivecontratos = false;
                                    $scope.paso = 1;
                                }
                            } else {
                                swal({
                                    title: "¡IMPORTANTE!",
                                    text: response.data,
                                    type: "warning"
                                }).catch(swal.noop);
                            }
                        });
                    }
                }
            }

            $scope.refrescar_dato_contrato = function (n, u, d) {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/funccontratacion.php",
                    data: {
                        function: 'P_OBTENER_CONTRATO',
                        numero: n,
                        ubicacion: u,
                        documento: d
                    }
                }).then(function (response) {
                    swal.close();
                    $scope.infoContrato = response.data[0];
                })
            }

            // PASO 2 TAB
            $scope.gestionar_contrato = function (ind) {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                // $scope.contrado_selecionado = true;
                // console.log($scope.json_contratos[ind]);
                // $scope.contrato_cabeza = $scope.json_contratos[ind];

                // $scope.buscar_clasificacion();
                var data = $scope.json_contratos[ind];
                $scope.indicador = ind;
                $http({
                    method: 'POST',
                    url: "php/contratacion/funccontratacion.php",
                    data: {
                        function: 'P_OBTENER_CONTRATO',
                        numero: data.numero,
                        ubicacion: data.ubicacion,
                        documento: data.documento_id
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data.length > 0) {
                        setTimeout(() => {

                        }, 2000);
                        $scope.infoContrato = response.data[0];
                        $scope.contrado_selecionado = true;
                        console.log($scope.infoContrato);
                        $scope.contrato_cabeza = $scope.json_contratos[ind];
                        $scope.paso = 2;

                    } else {
                        swal('Información', "Favor Intente buscar Contrato Nuevamente", 'info');
                    }
                })



            }


            $scope.seleccion = function (ind) {
                switch (ind) {
                    case "1":
                        $scope.iniciar_modificacion();
                        //modificacion
                        //consultara la bse de datos de modificacion del contrato
                        $scope.paso = 3;
                        $scope.mostrar_form = 3;
                        break;
                    case "2":
                        $scope.paso = 4;
                        $scope.mostrar_form = 4;
                        $scope.iniciar_bitacora();

                        break;

                    case "3":
                        $scope.paso = 5;
                        $scope.subpaso = 50;
                        // $scope.mostrar_form = 4;
                        $scope.listar_polizas();

                        break;

                    default:
                        swal({
                            title: 'Pronto Disponible',
                            text: '',
                            imageUrl: 'assets/images/contratos/gestion_contratos/construccion.svg',
                            animation: true,
                        });
                        break;
                }

            }


            $scope.iniciar_modificacion = function () {

                //busca modificaciones
                $scope.json_modificacion = [
                    {
                        titulo: "PRODUCTOS",
                        accion: 3,
                        actualizado: false,
                        activo: true
                    },
                    {
                        titulo: "CAMBIO DE TARIFA",
                        accion: 6,
                        actualizado: false,
                        activo: true
                    },
                    {
                        titulo: "EDICION DE FECHAS",
                        accion: 1,
                        actualizado: false,
                        activo: true
                    },
                    {
                        titulo: "ACUERDOS",
                        accion: 5,
                        actualizado: false,
                        activo: false
                    },
                    {
                        titulo: "ADICION PRESUPUESTAL",
                        accion: 2,
                        actualizado: false,
                        activo: false
                    },

                    {
                        titulo: "ADICION DE POBLACIÓN",
                        accion: 4,
                        actualizado: false,
                        activo: false
                    },
                    {
                        titulo: "OTRO SI",
                        accion: 7,
                        actualizado: false,
                        activo: true
                    },
                    {
                        titulo: "MODIFICACION DE SEDES",
                        accion: 8,
                        actualizado: false,
                        activo: true
                    },
                    // {
                    //     titulo: "CAMBIO DE RAZON SOCIAL",
                    //     accion: 9,
                    //     actualizado: false,
                    //     activo: false
                    // },
                    {
                        titulo: "CORRECCIONES GENERALES",
                        accion: 10,
                        actualizado: false,
                        activo: true
                    },
                    {
                        titulo: "EDICIÓN ASUNTO Y MOTIVOS",
                        accion: 11,
                        actualizado: false,
                        activo: true
                    },
                    // INICIO YORDIS 23/03/2023
                    {
                        titulo: "SERVICIOS",
                        accion: 13,
                        actualizado: false,
                        activo: true
                    }
                    // FIN YORDIS 23/03/2023
                ];

                $scope.contrato_actualizado = {
                    1: {
                        fecha_inicial: "03/10/2019",
                        fecha_fin: "06/11/2019",
                        observacion: ""
                    },
                    2: {
                        valor: 1500000,
                        observacion: ""
                    },

                    3: {
                        json_servicios_escogidas: "",
                        observacion: ""
                    },

                    4: {
                        cantidad: 150,
                        observacion: ""
                    },

                    5: {
                        // B SI BLATERAL Y U SI ES UNILATERAL
                        tipo_toma_desicion: true,
                        // C SI ES CONTRATISTA O  CO SI ES CONTRATISTA 
                        accionante: "C",

                        causales: 10,
                        causales_nombre: "porque se me da la gana",

                        fecha_fin: "",
                        observacion: ""
                    },

                    6: {
                        json_tarifa_escogidas: "",
                        observacion: ""
                    },

                    7: {
                        valor_upc: 150,
                        porcentaje_incremento: 150,
                        observacion: ""
                    },

                    8: {
                        json_sede_habilatadas: [{
                            departamento: "Atlantico",
                            municipio: "Soledad",
                            nombre: "Sede Principal",
                            dirrecion: "Via 30 N 12"
                        },
                        {
                            departamento: "Atalntico",
                            municipio: "Barrranquilla",
                            nombre: "Sede normal",
                            dirrecion: "Via 40 N 12"
                        }
                        ],
                        json_sede_actuales: [{
                            departamento: "Atlantico",
                            municipio: "Soledad",
                            nombre: "Sede Principal",
                            dirrecion: "Via 30 N 12"
                        }],
                    },

                    9: {
                        razon_social: "razon social",
                        observacion: ""
                    },

                    10: {
                        json_clausura_actualizadas: "",
                        observacion: ""
                    },

                };


            }

            // BITACORA
            $scope.iniciar_bitacora = function () {
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: { function: 'p_lista_bitacora' }
                }).then(function (response) {
                    $scope.json_contractual = [];
                    $scope.json_contractual = response.data;
                });
                $scope.listTareas = {};
                $scope.bitacora_proceso_cambio = '';
                $scope.observacion_bitacora = '';
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/funccontratacion.php",
                    data: {
                        function: 'obtenerTareasContrato',
                        numero: $scope.contrato_cabeza.numero,
                        ubicacion: $scope.contrato_cabeza.ubicacion,
                        documento: $scope.contrato_cabeza.documento_id
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data.length > 0) {
                        if (response.data) {
                            var ultimo = 0;
                            $scope.listTareas = response.data[ultimo];
                            console.log($scope.listTareas);
                            $scope.estilo = { background: '#' + $scope.listTareas.clase };
                        } else {
                            $scope.listTareas = {
                                clase: "111",
                                codigo: "99",
                                fecha: "",
                                hora: "",
                                observacion: "SIN TAREAS",
                                proceso: "SIN TAREAS",
                                responsable: "NO REGISTRA"
                            }
                            $scope.estilo = { background: '#' + $scope.listTareas.clase };
                        }



                    } else {
                        $scope.listTareas = {
                            clase: "111",
                            codigo: "99",
                            fecha: "",
                            hora: "",
                            observacion: "SIN TAREAS",
                            proceso: "SIN TAREAS",
                            responsable: "NO REGISTRA"
                        }
                        $scope.estilo = { background: '#' + $scope.listTareas.clase };
                        swal('Información', "Este Contrato no Tiene Tareas", 'info');

                    }
                })


            }
            $scope.cambio_estado_bitacora = function (ind) {
                for (let index = 0; index < $scope.json_contractual.length; index++) {
                    $scope.json_contractual[index].estado = false;
                }
                $scope.json_contractual[ind].estado = true;
                $scope.estilo = { background: '#' + $scope.json_contractual[ind].Clase };
                $scope.bitacora_proceso_cambio = $scope.json_contractual[ind].Codigo;

            }
            $scope.guardar_bitacora = function () {
                if ($scope.bitacora_proceso_cambio == '') {
                    swal('Información', "Es Obligatorio Escoger Una Opción De La Tabla Bitácora Contractual", 'info');
                } else if ($scope.observacion_bitacora == '') {
                    swal('Información', "Es Obligatorio LLenar el Campo Observacion", 'info');
                } else {
                    swal({
                        title: 'Cargando información...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/contratacion/gestioncontrato.php",
                        data: {
                            function: 'p_inserta_bitacora',
                            v_pdocumento: $scope.contrato_cabeza.documento_id,
                            v_pcontrato: $scope.contrato_cabeza.numero,
                            v_pubicacion: $scope.contrato_cabeza.ubicacion,
                            v_pcodigo: $scope.bitacora_proceso_cambio,
                            v_presponsable: $scope.usuario_cedula,
                            v_pobservacion: $scope.observacion_bitacora
                        }
                    }).then(function (response) {
                        swal.close();
                        if (response.data.Codigo == 0) {
                            swal({
                                title: "Completado!",
                                text: response.data.Nombre,
                                html: response.data.Nombre,
                                type: "success"
                            }).then(function () {
                                $scope.iniciar_bitacora();
                            })
                        } else {
                            var mensaje = response.data.Nombre == null ? "Hubo un error al cargar la bitacora " : response.data.Nombre;
                            swal('Información', mensaje, 'info');

                        }
                    });
                }

            }
            // BITACORA FIN
            $scope.inicar_poliza = function () {
                $scope.json_datos_poliza = {
                    persona_cargo: "Shirley_muelle",
                    Titulo: "Shirley_muelle",
                    Hora: "4/12/2019",
                    json_comentario_poliza: [{
                        persona: "Shirley Muelle",
                        observacion: "esto es una observacion 1 de 10",
                        fecha: "20/10/2019 12:10pm "
                    }, {
                        persona: "Shirley Muelle",
                        observacion: "esto es una observacion 2 de 10",
                        fecha: "20/10/2019 12:10pm "
                    }, {
                        persona: "Shirley Muelle",
                        observacion: "esto es una observacion 3 de 10",
                        fecha: "20/10/2019 12:10pm "
                    }, {
                        persona: "Shirley Muelle",
                        observacion: "esto es una observacion 4 de 10",
                        fecha: "20/10/2019 12:10pm "
                    }, {
                        persona: "Shirley Muelle",
                        observacion: "esto es una observacion 5 de 10",
                        fecha: "20/10/2019 12:10pm "
                    }, {
                        persona: "Shirley Muelle",
                        observacion: "esto es una observacion 6 de 10",
                        fecha: "20/10/2019 12:10pm "
                    },]
                };
            }

            $scope.listar_polizas = function (x) {
                angular.forEach(document.querySelectorAll('.HojaPoliza .Valid_Campo'), function (i) { i.classList.remove('Valid_Campo'); });

                $scope.HojaPoliza = {

                    Poliza: '',

                    Asegurador: '',
                    Asegurador_Cod: '',

                    Valor_Poliza: '',
                    Valor_Asegurado: '',

                    Cubrimiento: '',
                    Fecha_Expedicion: '',
                    Fecha_Vencimiento: ''
                }
                $scope.Busqueda = {
                    Ips: {
                        Filtro: [],
                        Listado: null,
                        SAVE: null,
                        Seleccion: 9999
                    }
                };
                $scope.Listado_polizas = [];
                if (!x) {
                    swal({
                        title: 'Cargando información...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                }
                $http({
                    method: 'POST',
                    url: "php/contratacion/funccontratacion.php",
                    data: {
                        function: 'P_LISTA_POLIZAS',
                        numero: $scope.contrato_cabeza.numero,
                        ubicacion: $scope.contrato_cabeza.ubicacion,
                        documento: $scope.contrato_cabeza.documento_id
                    }
                }).then(function (response) {
                    if (!x) {
                        swal.close();
                    }
                    if (response.data.length > 0) {
                        $scope.Listado_polizas = response.data;
                    } else {
                        swal('Información', "No registra Polizas", 'info');
                    }
                });
            }
            $scope.HojaPoliza_Validar_CamposVacios = function () {
                return new Promise((resolve) => {
                    //
                    if ($scope.HojaPoliza.Poliza == undefined || $scope.HojaPoliza.Poliza == null || $scope.HojaPoliza.Poliza == '') {
                        document.querySelector("#HojaPoliza_Poliza").classList.add("Valid_Campo"); resolve(true);
                    }
                    if ($scope.HojaPoliza.Asegurador == undefined || $scope.HojaPoliza.Asegurador == null || $scope.HojaPoliza.Asegurador == '') {
                        document.querySelector("#HojaPoliza_Asegurador").classList.add("Valid_Campo"); resolve(true);
                    }
                    if ($scope.HojaPoliza.Valor_Poliza == undefined || $scope.HojaPoliza.Valor_Poliza == null || $scope.HojaPoliza.Valor_Poliza == '') {
                        document.querySelector("#HojaPoliza_Valor_Poliza").classList.add("Valid_Campo"); resolve(true);
                    }
                    if ($scope.HojaPoliza.Valor_Asegurado == undefined || $scope.HojaPoliza.Valor_Asegurado == null || $scope.HojaPoliza.Valor_Asegurado == '') {
                        document.querySelector("#HojaPoliza_Valor_Asegurado").classList.add("Valid_Campo"); resolve(true);
                    }
                    if ($scope.HojaPoliza.Cubrimiento == undefined || $scope.HojaPoliza.Cubrimiento == null || $scope.HojaPoliza.Cubrimiento == '') {
                        document.querySelector("#HojaPoliza_Cubrimiento").classList.add("Valid_Campo"); resolve(true);
                    }
                    if ($scope.HojaPoliza.Fecha_Expedicion == undefined || $scope.HojaPoliza.Fecha_Expedicion == null || $scope.HojaPoliza.Fecha_Expedicion == '') {
                        document.querySelector("#HojaPoliza_Fecha_Expedicion").classList.add("Valid_Campo"); resolve(true);
                    }
                    if ($scope.HojaPoliza.Fecha_Vencimiento == undefined || $scope.HojaPoliza.Fecha_Vencimiento == null || $scope.HojaPoliza.Fecha_Vencimiento == '') {
                        document.querySelector("#HojaPoliza_Fecha_Vencimiento").classList.add("Valid_Campo"); resolve(true);
                    }
                    if ($scope.HojaPoliza.Fecha_Vencimiento < $scope.HojaPoliza.Fecha_Expedicion) {
                        document.querySelector("#HojaPoliza_Fecha_Vencimiento").classList.add("Valid_Campo"); resolve(true);
                    }
                    resolve(false);
                });
            }

            $scope.Guardar_Poliza = function () {
                angular.forEach(document.querySelectorAll('.HojaPoliza .Valid_Campo'), function (i) { i.classList.remove('Valid_Campo'); });
                $scope.HojaPoliza_Validar_CamposVacios().then(function (result) {
                    if (!result) {
                        swal({ title: 'Cargando...', allowOutsideClick: false });
                        swal.showLoading();
                        $http({
                            method: 'POST',
                            url: "php/contratacion/funccontratacion.php",
                            data: {
                                function: 'P_UI_POLIZA',
                                numero: $scope.contrato_cabeza.numero,
                                ubicacion: $scope.contrato_cabeza.ubicacion,
                                documento: $scope.contrato_cabeza.documento_id,
                                Poliza: $scope.HojaPoliza.Poliza,
                                Cubrimiento: $scope.HojaPoliza.Cubrimiento,
                                Valor_Poliza: parseFloat(($scope.HojaPoliza.Valor_Poliza.replace(/\./g, '')).replace(/\,/g, '.')),
                                Valor_Asegurado: parseFloat(($scope.HojaPoliza.Valor_Asegurado.replace(/\./g, '')).replace(/\,/g, '.')),
                                Fecha_Expedicion: $scope.GetFecha('HojaPoliza', 'Fecha_Expedicion'),
                                Fecha_Vencimiento: $scope.GetFecha('HojaPoliza', 'Fecha_Vencimiento'),
                                Numero_Poliza: $scope.HojaPoliza.Poliza,
                                Tercero: $scope.HojaPoliza.Asegurador_Cod,
                                Accion: 'I',
                            }
                        }).then(function (response) {
                            if (response.data.toString().substr(0, 3) != '<br') {
                                if (response.data.Codigo == 0) {
                                    $scope.listar_polizas(1);
                                    $scope.subpaso = 50;
                                    swal('¡Importante!', response.data.Nombre, 'success').catch(swal.noop);
                                } else {
                                    swal('¡Importante!', response.data.Nombre, 'warning').catch(swal.noop);
                                }
                            } else {
                                swal(
                                    '¡Importante!',
                                    'Por favor, Contactar con Oficina TIC Nacional',
                                    'warning'
                                ).catch(swal.noop);
                            }
                        });
                    }
                });
            }
            $scope.KeyFind_ObIps = function (keyEvent) {
                if ($scope.Busqueda.Ips.Filtro != null && $scope.Busqueda.Ips.Filtro.length != 0) {
                    if (keyEvent.which === 40) {
                        $scope.Busqueda.Ips.Seleccion = $scope.Busqueda.Ips.Seleccion >= ($scope.Busqueda.Ips.Filtro.length - 1) ? 0 : $scope.Busqueda.Ips.Seleccion + 1;
                        document.querySelector('.Clase_Listar_Ips').scrollTo(0, document.querySelector('#Ips' + $scope.Busqueda.Ips.Seleccion).offsetTop);
                    } else if (keyEvent.which === 38) {
                        $scope.Busqueda.Ips.Seleccion = $scope.Busqueda.Ips.Seleccion <= 0 || $scope.Busqueda.Ips.Seleccion == 9999 ? $scope.Busqueda.Ips.Filtro.length - 1 : $scope.Busqueda.Ips.Seleccion - 1;
                        document.querySelector('.Clase_Listar_Ips').scrollTo(0, document.querySelector('#Ips' + $scope.Busqueda.Ips.Seleccion).offsetTop)
                    } else if (keyEvent.which === 13 && $scope.Busqueda.Ips.Seleccion != 9999) {
                        var x = $scope.Busqueda.Ips.Filtro[$scope.Busqueda.Ips.Seleccion];
                        $scope.FillTextbox_Listado_Ips(x.codigo, x.nombre);
                    }
                } else {
                    if (keyEvent.which === 13)
                        $scope.Buscar_ObIps();
                }
            }
            $scope.Buscar_ObIps = function () {
                if ($scope.HojaPoliza.Asegurador.length > 2) {
                    $http({
                        method: 'POST',
                        url: "php/contratacion/funccontratacion.php",
                        data: {
                            function: 'P_OBTENER_IPS',
                            Coinc: $scope.HojaPoliza.Asegurador.toUpperCase(),
                        }
                    }).then(function (response) {
                        if (response.data.toString().substr(0, 3) != '<br') {
                            if (response.data[0] != undefined && response.data.length > 1) {
                                $scope.Busqueda.Ips.Filtro = response.data;
                                $scope.Busqueda.Ips.Listado = response.data;
                                $('.Clase_Listar_Ips').css({ width: $('#HojaPoliza_Asegurador')[0].offsetWidth });
                            }
                            if (response.data.length == 1) {
                                if (response.data[0].Codigo == '1') {
                                    swal({
                                        title: "¡Mensaje!",
                                        text: response.data[0].Nombre,
                                        type: "info",
                                    }).catch(swal.noop);
                                    $scope.Busqueda.Ips.Filtro = null;
                                    $scope.Busqueda.Ips.Listado = null;
                                } else {
                                    $scope.FillTextbox_Listado_Ips(response.data[0].codigo, response.data[0].nombre);
                                }
                            } else if (response.data.length == 0) {
                                swal({
                                    title: "¡Importante!",
                                    text: "No se encontro la Ips",
                                    type: "info",
                                }).catch(swal.noop);
                            }
                        } else {
                            swal({
                                title: "¡IMPORTANTE!",
                                text: response.data,
                                type: "warning"
                            }).catch(swal.noop);
                        }
                    })
                } else {
                    Materialize.toast('¡Digite al menos 3 caracteres!', 1000);
                }
            }
            $scope.Complete_Listado_Ips = function (keyEvent, string) {
                if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
                    if ($scope.HojaPoliza.Asegurador != undefined && string != undefined && $scope.Busqueda.Ips.Listado != undefined) {
                        $('.Clase_Listar_Ips').css({ width: $('#Hoja2_Nit')[0].offsetWidth });
                        var output = [];
                        angular.forEach($scope.Busqueda.Ips.Listado, function (x) {
                            if (x.nombre_ips.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.nit.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                                output.push({ "nit": x.nit, "nombre_ips": x.nombre_ips.toUpperCase() });
                            }
                        });
                        $scope.Busqueda.Ips.Filtro = output;
                        $scope.Busqueda.Ips.Seleccion = 9999;
                    }
                }
            }
            $scope.FillTextbox_Listado_Ips = function (codigo, nombre) {
                $scope.HojaPoliza.Asegurador = codigo + ' - ' + nombre;
                $scope.HojaPoliza.Asegurador_Cod = codigo;
                $scope.Busqueda.Ips.Listado = null;
                $scope.Busqueda.Ips.Filtro = null;
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
            }

            $scope.GetFecha = function (HOJA, SCOPE) {
                var ahora_ano = $scope[HOJA][SCOPE].getFullYear();
                var ahora_mes = ((($scope[HOJA][SCOPE].getMonth() + 1) < 10) ? '0' + ($scope[HOJA][SCOPE].getMonth() + 1) : ($scope[HOJA][SCOPE].getMonth() + 1));
                var ahora_dia = ((($scope[HOJA][SCOPE].getDate()) < 10) ? '0' + ($scope[HOJA][SCOPE].getDate()) : ($scope[HOJA][SCOPE].getDate()));
                return ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
            }

            $scope.FormatPeso = function (NID) {
                const input = document.getElementById('' + NID + '');
                var valor = input.value;
                valor = valor.replace(/[^0-9,]/g, '');
                var array = null;
                var regex = new RegExp("\\,");
                if (!regex.test(valor)) {
                    valor = valor.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
                    valor = valor.split('').reverse().join('').replace(/^[\.]/, '');
                } else {
                    array = valor.toString().split(',');
                    if (array.length > 2) {
                        input.value = 0;
                    } else {
                        array[0] = array[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
                        array[0] = array[0].split('').reverse().join('').replace(/^[\.]/, '');
                        if (array[1].length > 2) {
                            array[1] = array[1].substr(0, 2);
                        }
                    }
                }
                if (!regex.test(valor)) {
                    input.value = valor;
                } else {
                    if (valor == ',') {
                        input.value = 0;
                    } else {
                        if (valor.substr(0, 1) == ',') {
                            input.value = 0 + ',' + array[1];
                        } else {
                            input.value = array[0] + ',' + array[1];
                        }
                    }
                }
            }

            $scope.listar_causales = function () {
                $scope.v_ptipo_terminacion = $scope.tipo_toma_desicion == true ? 'U' : 'B'
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: {
                        function: 'P_LISTA_CAUSAL_TERMINACION',
                        v_paccion: 'T',
                        v_ptipo_terminacion: $scope.v_ptipo_terminacion
                    }
                }).then(function (response) {
                    swal.close();
                    $scope.Listado_causales = response.data;
                });
            }

            $scope.seleccionar_causal = function (ind) {
                $scope.causalTerminacion = ind;
            }


            function parsedia(date) {
                var yyyy = date.getFullYear();
                var dd = ('0' + date.getDate()).slice(-2);
                var mm = ('0' + (date.getMonth() + 1)).slice(-2);
                return dd + '/' + mm + '/' + yyyy;//+' '+hh+':'+mi+':00';
            }
            $scope.mostrar_modificaciones = function (ind, titulo) {

                $scope.subpaso1 = 0;
                switch (ind) {
                    // titulo: "PRODUCTOS",
                    case 3:
                        $scope.lista_productos_contratado = [];
                        $scope.subpaso = ind;
                        $scope.nuevos_productos = [];
                        $scope.nuevos_productos = [];
                        $scope.paso = 31;
                        $scope.mostrar_modificacion = ind;
                        $scope.setTab(1);
                        $scope.nombre_modificacion = '' + titulo;
                        $scope.observacion_modificacion = $scope.contrato_actualizado[ind].observacion;
                        break;
                       // titulo: "IPS CON CONTRATOS",
                       case 8:
                        $scope.contratacion_IPS();
                        // $scope.lista_IPS_contratado = [];
                        $scope.subpaso = 18;
                        $scope.nuevos_IPS = [];
                        $scope.paso = 31;
                        $scope.mostrar_modificacion = ind;
                        $scope.setTab(1);
                        $scope.nombre_modificacion = '' + titulo;
                        $scope.observacion_modificacion = $scope.contrato_actualizado[ind].observacion;
                        break;
                    // titulo: "TERMINACION ANTICIPADA",
                    case 5:
                        $scope.subpaso = ind;
                        $scope.subpaso1 = 0;
                        $scope.paso = 31;
                        $scope.mostrar_modificacion = ind;
                        $scope.setTab(1);
                        $scope.nombre_modificacion = '' + titulo;
                        $scope.observacion_modificacion = $scope.contrato_actualizado[ind].observacion;

                        break;
                    // titulo: "CAMBIO DE FECHAS",
                    case 1:
                        $scope.fecha_fin_terminacion = '';
                        $scope.accionante_terminacion = '';
                        $scope.causalTerminacion = '';
                        $scope.listar_causales();
                        $scope.subpaso = ind;
                        $scope.paso = 31;

                        $scope.mostrar_modificacion = ind;
                        $scope.setTab(1);
                        $scope.nombre_modificacion = '' + titulo;
                        // $scope.observacion_modificacion = $scope.contrato_actualizado[ind].observacion;
                        $scope.prorroga = false;
                        $scope.fecha_inicial_editar = "";
                        $scope.fecha_final_editar = "";
                        $scope.observacion_fecha_inicial = "";
                        $scope.observacion_prorroga = "";
                        $scope.fecha_suscripcion = "";
                        break;


                    // titulo: "CAMBIO DE TARIFA",
                    case 6:
                        $scope.subpaso = ind;
                        $scope.buscar_clasificacion();

                        $scope.paso = 31;
                        $scope.mostrar_modificacion = ind;
                        $scope.setTab(1);
                        $scope.nombre_modificacion = '' + titulo;
                        $scope.observacion_modificacion = $scope.contrato_actualizado[ind].observacion;
                        break;
                          // titulo: "OTRO SI",
                    case 7:
                        $scope.paso = 10;
                        $scope.subpaso = 105;
                        //$scope.setTab(1);
                        //$scope.nombre_modificacion = '' + titulo;
                        

                        // $scope.subpaso = ind;
                        // $scope.paso = 31;
                        // $scope.mostrar_modificacion = ind;
                        // $scope.nombre_modificacion = '' + titulo;
                        $scope.observacion_modificacion = $scope.contrato_actualizado[ind].observacion;
                        $scope.cantidad_afiliados_editar = '';
                        $scope.valor_afiliado_editar = '';
                        $scope.fecha_edicion_editar = '';
                        $scope.fecha_final_editar_os = '';
                        $scope.valor_contrato = '';
                        $scope.FormatPeso('valor_contrato');
                        $scope.periodo_contrato = '';
                        $scope.meses_ejecutados = '';
                        $scope.valor_ejecutado = '';
                        $scope.valor_contrato_editar = '';
                        $scope.valor_contrato_otrosi = '';
                        $scope.valor_contrato_otrosi_ev = '0';
                        $scope.valor_otrosi_diferencia = '';
                        $scope.periodo_editar = '';
                        $scope.observacion_otrosi = '';

                        $scope.tarifa_servicios_os = '';
                        $scope.operador_servicios_os = '';
                        $scope.disminucion_servicios_os = '';
                        $scope.buscar_ser_hab_os = '';
                        $scope.dsb_campos_servicios_os = false;
                        $scope.listado_elegido_ser = [];
                        
                        break;
                    // titulo: "EDICIÓN ASUNTO Y MOTIVOS",
                    case 11:
                        $scope.subpaso = ind;
                        $scope.obtener_motivos();
                        $scope.paso = 31;
                        $scope.mostrar_modificacion = ind;
                        $scope.setTab(1);
                        $scope.nombre_modificacion = '' + titulo;
                        $scope.motivos = '13';
                        $scope.asunto = '1';
                        break;
                    // titulo: "CORRECCIONES GENERALES"
                    case 10:
                        // $scope.subpaso = ind;
                        $scope.paso = 10;
                        $scope.subpaso = 100;
                        $scope.setTab(1);
                        $scope.nombre_modificacion = '' + titulo;
                        break;
                        // titulo: "EDICIÓN FORMAS DE PAGO",
                    case 12:
                        // $scope.subpaso = ind;
                        // $scope.obtener_motivos();
                        // $scope.paso = 31;
                        // $scope.mostrar_modificacion = ind;
                        // $scope.nombre_modificacion = '' + titulo;
                        $scope.paso = 10;
                        $scope.subpaso = 100;
                        $scope.setTab(1);
                        $scope.nombre_modificacion = '' + titulo;
                        break;
                        // INICIO YORDIS 23/03/2023
                        case 13:
                        $scope.ServiciosIpsActualizar();
                        // $scope.lista_IPS_contratado = [];
                        $scope.subpaso = 23;
                        $scope.nuevos_IPS = [];
                        $scope.paso = 31;
                        $scope.mostrar_modificacion = ind;
                        $scope.setTab(1);
                        $scope.nombre_modificacion = '' + titulo;
                        // $scope.observacion_modificacion = $scope.contrato_actualizado[ind].observacion;
                        break;
                        // FIN YORDIS 23/03/2023
                    default:
                        swal({
                            title: 'Pronto Disponible',
                            text: '',
                            imageUrl: 'assets/images/contratos/gestion_contratos/construccion.svg',
                            animation: true,
                        });
                        break;
                }


            }

            $scope.contratacion_IPS = function () {
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: {
                        function: 'P_LISTA_IPS_CONTRATO',
                        v_pnumero: $scope.contrato_cabeza.numero,
                        v_pubicacion: $scope.contrato_cabeza.ubicacion,
                        v_pdocumento: $scope.contrato_cabeza.documento_id
                    }
                }).then(function (response) {
                    $scope.lista_IPS_contratado = response.data;
                    console.log(response.data);
                    console.log($scope.lista_IPS_contratado.cod_sede);
                })
            }
             // INICIO YORDIS 23/03/2023
            $scope.ServiciosIpsActualizar = function () {
                $http({
                    method: 'POST',
                    url: "php/contratacion/funccontratacion.php",
                    data: {
                        function: 'P_OBTENER_SERVICIOS_SELECCIONADOS_CONTRATO',
                        numero: $scope.contrato_cabeza.numero,
                        ubicacion: $scope.contrato_cabeza.ubicacion,
                        documento: $scope.contrato_cabeza.documento_id
                    }
                }).then(function (response) {
                    $scope.lista_SERVICIOS_contratado = response.data;
                })
            }


            $scope.seleccionarOpcion = function (option) {
                $("." + option).prop("checked", $("#filled-in-box-" + option).prop('checked'));

                for (let s = 0; s < $scope.lista_SERVICIOS_contratado.length; s++) {

                    if (option) {
                        $scope.lista_SERVICIOS_contratado[s].estado = true;
                    } else {
                        $scope.lista_SERVICIOS_contratado[s].estado = false;
                    }
                }
            }

            // $scope.guardar_servicios = function () {
            //     console.log($scope.listservicios);
            //     $scope.json_servicios = [];
            //     for (let s = 0; s < $scope.listservicios.length; s++) {
            //         if ($scope.listservicios[s].estado == true) {
            //             var array_prueba = { SERVICIO: $scope.listservicios[s].Clasificacion, NOMBRE: $scope.listservicios[s].Nombre, TARIFA_NOMBRE: $scope.contrato.tarifa_codigo, TARIFA: $scope.contrato.tarifa_codigo, SUMA: $scope.contrato.operacion, PORCENTAJE: $scope.contrato.incremento };
            //             $scope.json_servicios.push(array_prueba);
            //         }
            //     }
            //     // console.log($scope.json_servicios);
            //     if ($scope.json_servicios.length == 0) {
            //         swal('Información', "Almenos Seleccione un Servicios", 'info');
            //     } else {
            //         // $scope.validar_campos();
            //         $scope.servicios_mostrar = 3;
            //     }
            // }
            $scope.guardar_servicios = function () {
                $scope.json_serviciosseleccionados = [];
                for (let s = 0; s < $scope.lista_SERVICIOS_contratado.length; s++) {
                    let estado;
                    if ($scope.lista_SERVICIOS_contratado[s].estado == true) {
                    estado = 'A';
                    }else{
                    estado = 'I';    
                    }
                    var array_prueba = { CODIGO: $scope.lista_SERVICIOS_contratado[s].tipo_servicio,ESTADO:estado};
                    $scope.json_serviciosseleccionados.push(array_prueba);
                }
                if ($scope.json_serviciosseleccionados.length == 0) {
                    swal('Información', "Almenos Seleccione un Servicio", 'info');
                } else {
                    swal({
                        title: 'Cargando información...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/contratacion/funccontratacion.php",
                        data: {
                            function: 'P_UI_TIPOSERVICIOS',
                            v_pdocumento: $scope.contrato_cabeza.documento_id,
                            v_pnumero: $scope.contrato_cabeza.numero,
                            v_pubicacion: $scope.contrato_cabeza.ubicacion,
                            v_pjson_servicio: JSON.stringify($scope.json_serviciosseleccionados),
                            v_pcantidad_serv: $scope.json_serviciosseleccionados.length,
                            v_paccion : 'U',
                        }
                    }).then(function (response) {
                        if (response.data.CODIGO == 0) {
                            swal({
                                title: "Completado!",
                                text: "Se ha creado el contrato ",
                                allowEscapeKey: false,
                                allowOutsideClick: false,
                                type: "success"
                            }).then(function () {
                                swal.close();
                                
                            })
                        } else if (response.data.CODIGO == 1) {
                            swal('Información', response.data.Nombre, 'info');
                        } else {
                            swal('Información', response.data.Nombre, 'info');
                        }
                    })
                }
            }
             // FIN YORDIS 23/03/2023
            $scope.agregar_ips_contrato = function () {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: {
                        function: 'P_LISTA_IPS_NOCONTRATADA',
                        v_pnumero: $scope.contrato_cabeza.numero,
                        v_pubicacion: $scope.contrato_cabeza.ubicacion,
                        v_pdocumento: $scope.contrato_cabeza.documento_id
                    }
                }).then(function (response) {
                    swal.close();
                    if(response.data == 0){
                        swal('Información', "No se encontro Ips para Agregar Al Contrato", 'info')
                    } else {
                        $('#modal_buscar_ips_para_agregar').modal('open');
                        $scope.listadoipsparaagregar = response.data;
                    }
                })
            }
            $scope.agregar_esta_ips = function (codigo_sede,nombre_sede) {
                swal({
                    title: '¿Desea Agregar Sede de prestacion?',
                    text: "Agregar IPS",
                    type: 'info',
                    showCancelButton: true,
                    confirmButtonText: "Confirmar",
                    cancelButtonText: "Cancelar",
                    cancelButtonColor: "#d33",
                    allowOutsideClick: false
                  }).then(function (result) {
                    if (result) {
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: {
                        function: 'P_GUARDAR_IPS_EN_CONTRATADA',
                        v_pnumero: $scope.contrato_cabeza.numero,
                        v_pubicacion: $scope.contrato_cabeza.ubicacion,
                        v_pdocumento: $scope.contrato_cabeza.documento_id,
                        v_codigo_sede:codigo_sede,
                        v_nombre_sede:nombre_sede
                    }
                }).then(function (response) {
                    $scope.listadoipsparaagregar = response.data;
                    $('#modal_buscar_ips_para_agregar').modal('close');
                    $scope.contratacion_IPS();

                })
            }
        }).catch(swal.noop);
            }

            // FECHAS
            $scope.guardar_terminacion_contrato = function () {
                if (($scope.fecha_fin_terminacion == '') || ($scope.fecha_fin_terminacion == null) || ($scope.fecha_fin_terminacion == undefined)) {
                    swal('Información', "El campo fecha fin es obligatorio", 'info')
                } else {


                    swal({
                        title: 'Cargando información...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/contratacion/gestioncontrato.php",
                        data: {
                            function: 'P_MODIFICACION_ESTADO_CONTRATO',
                            v_pempresa: 1,
                            v_pdocumento: $scope.contrato_cabeza.documento_id,
                            v_pnumero: $scope.contrato_cabeza.numero,
                            v_pubicacion: $scope.contrato_cabeza.ubicacion,
                            v_pobservacion: $scope.observacion_terminacion_anticipada,
                            v_paccion: 'T',
                            v_ptipo_terminacion: $scope.tipo_toma_desicion == true ? 'U' : 'B',
                            v_pfechafin: parsedia($scope.fecha_fin_terminacion),
                            v_paccionante: $scope.tipo_toma_desicion == true ? '' : $scope.accionante_terminacion,
                            v_pcausal: $scope.causalTerminacion
                        }
                    }).then(function (response) {
                        swal.close();
                        if (response.data.Codigo == 0) {
                            swal({
                                title: "Completado!",
                                text: response.data.Nombre,
                                type: "success"
                            }).then(function () {
                                $scope.fecha_fin_terminacion = '';
                                $scope.accionante_terminacion = '';
                                $scope.causalTerminacion = '';
                                $scope.refrescar_dato_contrato($scope.contrato_cabeza.numero, $scope.contrato_cabeza.ubicacion, $scope.contrato_cabeza.documento_id);
                            })
                        } else {
                            swal('Información', response.data.Nombre, 'info')
                        }
                    });
                }
            }
            $scope.guardar_prorroga = function () {
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: {
                        function: 'P_ACTUALIZA_MARCA_PRORROGA',
                        v_pnumero: $scope.contrato_cabeza.numero,
                        v_pubicacion: $scope.contrato_cabeza.ubicacion,
                        v_pdocumento: $scope.contrato_cabeza.documento_id,
                        v_pmarca: $scope.prorroga == true ? 'S' : 'N',
                        v_pobservacion: $scope.observacion_prorroga
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data.Codigo == 0) {
                        swal({
                            title: "Completado!",
                            text: response.data.Nombre,
                            type: "success"
                        }).then(function () {
                            $scope.prorroga = false;
                            $scope.observacion_prorroga = "";
                            $scope.refrescar_dato_contrato($scope.contrato_cabeza.numero, $scope.contrato_cabeza.ubicacion, $scope.contrato_cabeza.documento_id);
                        })
                    } else {
                        swal('Información', response.data.Nombre, 'info')
                    }
                })
            }
            $scope.guardar_fecha_inicial = function () {

                if (
                    ($scope.fecha_inicial_editar == '') || ($scope.fecha_inicial_editar == undefined) || ($scope.fecha_inicial_editar == null) ||
                    ($scope.fecha_final_editar == '') || ($scope.fecha_final_editar == undefined) || ($scope.fecha_final_editar == null) ||
                    ($scope.observacion_fecha_inicial == '') || ($scope.observacion_fecha_inicial == undefined) || ($scope.observacion_fecha_inicial == null)
                ) {
                    swal('Información', "Todos los campos para editar la fecha inicial es obligatorio", 'info')
                } else {
                    $http({
                        method: 'POST',
                        url: "php/contratacion/gestioncontrato.php",
                        data: {
                            function: 'P_ACTUALIZA_FECHA_CONTRATO',
                            v_pnumero: $scope.contrato_cabeza.numero,
                            v_pubicacion: $scope.contrato_cabeza.ubicacion,
                            v_pdocumento: $scope.contrato_cabeza.documento_id,
                            v_pfechainicio: parsedia($scope.fecha_inicial_editar),
                            v_pfechafin: parsedia($scope.fecha_final_editar),
                            v_pobservacion: $scope.observacion_fecha_inicial
                        }
                    }).then(function (response) {
                        swal.close();
                        if (response.data.Codigo == 0) {
                            swal({
                                title: "Completado!",
                                text: response.data.Nombre,
                                type: "success"
                            }).then(function () {
                                $scope.fecha_inicial_editar = "";
                                $scope.fecha_final_editar = "";
                                $scope.observacion_fecha_inicial = "";
                                $scope.refrescar_dato_contrato($scope.contrato_cabeza.numero, $scope.contrato_cabeza.ubicacion, $scope.contrato_cabeza.documento_id);
                            })
                        } else {
                            swal('Información', response.data.Nombre, 'info')
                        }
                    })
                }

            }
            $scope.guardar_fecha_suscripcion = function () {

                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: {
                        function: 'P_ACTUALIZA_FECHA_SUSCRIPCION',
                        v_pnumero: $scope.contrato_cabeza.numero,
                        v_pubicacion: $scope.contrato_cabeza.ubicacion,
                        v_pdocumento: $scope.contrato_cabeza.documento_id,
                        v_pfecha: parsedia($scope.fecha_suscripcion),
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data.Codigo == 0) {
                        swal({
                            title: "Completado!",
                            text: response.data.Nombre,
                            type: "success"
                        }).then(function () {

                            $scope.refrescar_dato_contrato($scope.contrato_cabeza.numero, $scope.contrato_cabeza.ubicacion, $scope.contrato_cabeza.documento_id);
                        })
                    } else {
                        swal('Información', response.data.Nombre, 'info')
                    }

                })
            }

            //PRODUCTOS
            $scope.contratacion_productos1 = function (A) {
                $scope.lista_productos_contratados = [
                    {
                        cantidad_subcaterorias: "0",
                        estado: "Inactivo",
                        id_estado: "I",
                        codigo_servicio: "719",
                        nombre_servicio: "ULTRASONIDO",
                        codigo_producto: "88.2.2.98",
                        nombre_producto: "ECOGRAFIA DOPPLER OBSTETRICA CON EVALUACION DE CIRCULACION PLACENTARIA",
                        idtarifa: "695",
                        nomtarifa: "Proveedor 20",
                        operador: "R",
                        renglon: "8530",
                        factor: "0",
                        tarifa: "Proveedor 20 + 0",
                        valor: "180000"
                    },
                    {
                        cantidad_subcaterorias: "0",
                        estado: "Activo",
                        id_estado: "A",
                        codigo_servicio: "719",
                        nombre_servicio: "ULTRASONIDO",
                        codigo_producto: "882298",
                        nombre_producto: "ECOGRAFIA DOPPLER OBSTETRICA CON EVALUACION DE CIRCULACION PLACENTARIA",
                        idtarifa: "695",
                        nomtarifa: "Proveedor 20",
                        operador: "R",
                        renglon: "95333",
                        factor: "0",
                        tarifa: "Proveedor 20 + 0",
                        valor: "180000"
                    },
                    {
                        cantidad_subcaterorias: "0",
                        estado: "Inactivo",
                        id_estado: "I",
                        codigo_servicio: "316",
                        nombre_servicio: "CE GASTROENTEROLOGIA Y/O ENDOSC. DIGEST.",
                        codigo_producto: "89.0.4.02",
                        nombre_producto: "INTERCONSULTA POR OTRAS ESPECIALIDADES MEDICAS",
                        idtarifa: "698",
                        nomtarifa: "PROVEEDOR 21",
                        operador: "R",
                        renglon: "3232",
                        factor: "0",
                        tarifa: "PROVEEDOR 21 + 0",
                        valor: "120000"
                    },
                    {
                        cantidad_subcaterorias: "0",
                        estado: "Activo",
                        id_estado: "A",
                        codigo_servicio: "316",
                        nombre_servicio: "CE GASTROENTEROLOGIA Y/O ENDOSC. DIGEST.",
                        codigo_producto: "890402",
                        nombre_producto: "INTERCONSULTA POR OTRAS ESPECIALIDADES MEDICAS",
                        idtarifa: "698",
                        nomtarifa: "PROVEEDOR 21",
                        operador: "R",
                        renglon: "95363",
                        factor: "0",
                        tarifa: "PROVEEDOR 21 + 0",
                        valor: "34000"
                    }
                ]
            }
            $scope.abrir_modal_servicio = function (index) {

                $scope.gestion = [];
                $scope.gestion.clasificacion = $scope.json_clasificacion[index].numero;
                $scope.gestion.renglon = $scope.json_clasificacion[index].renglon;
                $scope.gestion.clasificacion_nombre = $scope.json_clasificacion[index].nombre;
                $scope.gestion.TARIFA = '';
                $scope.gestion.TARIFA_CODIGO = '';
                $scope.gestion.DESCUENTO = '';
                $scope.gestion.P_DESCUENTO = '';
                $('#modalservicio').modal('open');
            }
            $scope.guardar_servicio_modal = function () {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/funccontratacion.php",
                    data: {
                        function: 'P_ACTUALIZA_SERVICIOS',
                        v_pempresa: '1',
                        v_pdocumento: $scope.contrato_cabeza.documento_id,
                        v_pnumero: $scope.contrato_cabeza.numero,
                        V_ubicacion: $scope.contrato_cabeza.ubicacion,
                        v_prenglon: $scope.gestion.renglon,
                        v_pservicio: $scope.gestion.clasificacion,
                        v_ptarifa: $scope.gestion.TARIFA,
                        v_psuma: $scope.gestion.DESCUENTO,
                        v_pporcentaje: $scope.gestion.P_DESCUENTO.toString().replace(/\./g, ',')
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data.CODIGO == 1) {
                        swal({
                            title: "Completado!",
                            text: response.data.NOMBRE,
                            type: "success"
                        }).then(function () {
                            $scope.buscar_clasificacion();
                        })

                    } else {
                        swal('Información', response.data.NOMBRE, 'info');
                    }
                });
            }
            $scope.contratacion_productos = function (palabra) {

                $scope.lista_productos_contratados = [];
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: {
                        function: 'P_LISTA_PRODUCTO_CONTRATO',
                        v_pnumero: $scope.contrato_cabeza.numero,
                        v_pubicacion: $scope.contrato_cabeza.ubicacion,
                        v_pdocumento: $scope.contrato_cabeza.documento_id,
                        v_pcoincidencia: palabra
                    }
                }).then(function (response) {

                    $scope.allproducs = response.data;
                    $scope.lista_productos_contratados = response.data;
                })
            }
            $scope.addmoreProducts = function (step) {
                if (step == 'next') {
                    $scope.size = $scope.size + 1;
                }
                for (var i = ($scope.size * 500 - 500); i < $scope.size * 500; i++) {
                    $scope.lista_productos_contratados.push($scope.allproducs[i]);
                }
            }
            $scope.filterProducts = function (coincidencia) {
                var fil = $scope.allproducs.filter(p => p.codigo_producto == coincidencia);
                if (fil.length > 0) {
                    $scope.lista_productos_contratados = fil;
                }
            }

            $scope.buscar_clasificacion = function () {
                swal({
                    title: 'Cargando...',
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/tarifacategoria.php",
                    data: {
                        function: 'P_OBTENER_SERVICIOS_CONTRATO',
                        codigo: $scope.contrato_cabeza.numero,
                        v_pubicacion: $scope.contrato_cabeza.ubicacion,
                        v_pdocumento: $scope.contrato_cabeza.documento_id
                    }
                }).then(function (response) {
                    swal.close();
                    console.log($scope.json_clasificacion);
                    $scope.json_clasificacion = response.data;
                });
            }
            $scope.ver_cambios_productos = function () {
                $('#modal_productos_cambiados').modal('open');
            }
            $scope.cambiar_estado = function (data) {
                if((data.epro_clasificacion == '714' && $scope.usuario_rol == '126') || (data.epro_clasificacion == '799' && $scope.usuario_rol == '126') || (data.epro_clasificacion == '1000' && $scope.usuario_rol == '126')){
                    var estado = data.id_estado == 'A' ? 'D' : 'H';
                    var nombre_estado = data.id_estado == 'A' ? 'DESAHILITAR' : 'HABILITAR';
                    var texto = "Esta seguro que desea " + nombre_estado + " el producto " + data.nombre_producto + " ?";
                    swal({
                        title: 'Confirmar',
                        text: texto,
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Confirmar'
                    }).then((result) => {
                        if (result) {
                            swal({
                                title: 'Cargando información...',
                                allowEscapeKey: false,
                                allowOutsideClick: false
                            });
                            swal.showLoading();
                            for (let i = 0; i < $scope.lista_productos_contratados.length; i++) {
                                if (data.codigo_producto == $scope.lista_productos_contratados[i].codigo_producto) {
                                    $scope.lista_productos_contratados[i].estado = $scope.lista_productos_contratados[i].id_estado == 'A' ? 'Inactivo' : 'Activo';
                                    $scope.lista_productos_contratados[i].id_estado = $scope.lista_productos_contratados[i].id_estado == 'A' ? 'I' : 'A';
                                    break;
                                }
                            }
                            var encontrado = false;
                            for (let i = 0; i < $scope.nuevos_productos.length; i++) {
                                if (data.codigo_producto == $scope.nuevos_productos[i].codigo_producto) {
                                    $scope.nuevos_productos.splice(i, 1);
                                    encontrado = true;
                                    break;
                                }
                            }
                            if (encontrado == false) {
                                $scope.nuevos_productos.push({
                                    codigo_producto: data.codigo_producto,
                                    codigo_servicio: data.codigo_servicio,
                                    accion: estado,
                                    nombre_accion: nombre_estado,
                                    Cod_tarifa: data.idtarifa,
                                    operador: data.operador,
                                    factor: data.factor,
                                    valor: data.valor_2,
                                });
                            }
                            console.log($scope.nuevos_productos);
                            $scope.$apply();
                            swal.close();
    
                        }
                    })
                }else if ((data.epro_clasificacion != '714' && data.epro_clasificacion != '799' && data.epro_clasificacion != '1000') && $scope.usuario_rol != '126'){
                    var estado = data.id_estado == 'A' ? 'D' : 'H';
                    var nombre_estado = data.id_estado == 'A' ? 'DESAHILITAR' : 'HABILITAR';
                    var texto = "Esta seguro que desea " + nombre_estado + " el producto " + data.nombre_producto + " ?";
                    swal({
                        title: 'Confirmar',
                        text: texto,
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Confirmar'
                    }).then((result) => {
                        if (result) {
                            swal({
                                title: 'Cargando información...',
                                allowEscapeKey: false,
                                allowOutsideClick: false
                            });
                            swal.showLoading();
                            for (let i = 0; i < $scope.lista_productos_contratados.length; i++) {
                                if (data.codigo_producto == $scope.lista_productos_contratados[i].codigo_producto) {
                                    $scope.lista_productos_contratados[i].estado = $scope.lista_productos_contratados[i].id_estado == 'A' ? 'Inactivo' : 'Activo';
                                    $scope.lista_productos_contratados[i].id_estado = $scope.lista_productos_contratados[i].id_estado == 'A' ? 'I' : 'A';
                                    break;
                                }
                            }
                            var encontrado = false;
                            for (let i = 0; i < $scope.nuevos_productos.length; i++) {
                                if (data.codigo_producto == $scope.nuevos_productos[i].codigo_producto) {
                                    $scope.nuevos_productos.splice(i, 1);
                                    encontrado = true;
                                    break;
                                }
                            }
                            if (encontrado == false) {
                                $scope.nuevos_productos.push({
                                    codigo_producto: data.codigo_producto,
                                    codigo_servicio: data.codigo_servicio,
                                    accion: estado,
                                    nombre_accion: nombre_estado,
                                    Cod_tarifa: data.idtarifa,
                                    operador: data.operador,
                                    factor: data.factor,
                                    valor: data.valor_2,
                                });
                            }
                            console.log($scope.nuevos_productos);
                            $scope.$apply();
                            swal.close();
    
                        }
                    })
                } else {
                swal({
                    title: "Completado!",
                    text: 'No tiene permitido esta accion',
                    type: "info"
                })
            }
            }

            $scope.guardar_producto_completo = function () {
                if ($scope.nuevos_productos.length == 0) {
                    swal({
                        title: "Advertencia!",
                        text: 'Debe ser necesario tener almenos un cambio en algun producto para poder guardar',
                        type: "info"
                    }).then(function () {
                        $('#modal_guardar_producto').modal('close');
                    })
                } else if ($scope.observacion_producto == '') {
                    swal({
                        title: "Advertencia!",
                        text: 'El Campo observacion es Obligatorio',
                        type: "info"
                    }).then(function () {
                        $scope.observacion_producto = ''
                    })

                } else {

                    swal({
                        title: 'Cargando información...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                    swal.showLoading();

                    $http({
                        method: 'POST',
                        url: "php/contratacion/gestioncontrato.php",
                        data: {
                            function: 'P_UI_PRODUCTOS',
                            v_pnumero: $scope.contrato_cabeza.numero,
                            v_pubicacion: $scope.contrato_cabeza.ubicacion,
                            v_pdocumento: $scope.contrato_cabeza.documento_id,
                            v_pjson_productos: JSON.stringify($scope.nuevos_productos),
                            v_cantidad_productos: $scope.nuevos_productos.length,
                            v_pobservacion: $scope.observacion_producto
                        }
                    }).then(function (response) {
                        swal.close();

                        if (response.data.Codigo == 0) {
                            if ($scope.codigo_proceso_validacion_precontractual > 0) {
                                $http({
                                    method: 'POST',
                                    url: "php/contratacion/gestioncontrato.php",
                                    data: {
                                        function: 'P_INSERTA_SERVICIO_CONTRATO',
                                        v_pnumero: $scope.contrato_cabeza.numero,
                                        v_pubicacion: $scope.contrato_cabeza.ubicacion,
                                        v_pdocumento: $scope.contrato_cabeza.documento_id,
                                        v_codigo: $scope.codigo_proceso_validacion_precontractual
                                    }
                                }).then(function (response) {

                                    swal({
                                        title: "Completado!",
                                        text: 'Productos Guardado Con Exito',
                                        type: "success"
                                    }).then(function () {
                                        $scope.nuevos_productos = [];
                                        $scope.$apply();
                                    })


                                })

                            } else {
                                swal({
                                    title: "Completado!",
                                    text: 'Productos Guardado Con Exito',
                                    type: "success"
                                }).then(function () {
                                    $scope.nuevos_productos = [];
                                    $scope.$apply();

                                })
                            }
                        } else {
                            swal({
                                title: "!Hubo un Error al Momento de Guardar!",
                                text: response.data.Nombre,
                                type: "info"
                            }).then(function () {

                            })
                        }
                    })
                }


            }

            $scope.guardar_productos = function () {
                $('#modal_guardar_producto').modal('open');
                $scope.observacion_producto = '';
            }
            $scope.buscar_contrato_habilitado_para_agregar = function () {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: {
                        function: 'P_BUSCAR_PRODUCTO_CONTRATO',
                        v_pnumero: $scope.contrato_cabeza.numero,
                        v_pubicacion: $scope.contrato_cabeza.ubicacion,
                        v_pdocumento: $scope.contrato_cabeza.documento_id,
                        coincidencia: $scope.coincidencia
                    }
                }).then(function (response) {
                    swal.close();
                    $scope.lista_productos_contratados_modal = response.data;
                })
            }
            $scope.agregar_producto_modal2 = function () {

                if (
                    ($scope.gestion.TARIFA_CODIGO == null) || ($scope.gestion.TARIFA_CODIGO == undefined) || ($scope.gestion.TARIFA_CODIGO === "") ||
                    ($scope.gestion.DESCUENTO == null) || ($scope.gestion.DESCUENTO == undefined) || ($scope.gestion.DESCUENTO === "") ||
                    ($scope.gestion.P_DESCUENTO == null) || ($scope.gestion.P_DESCUENTO == undefined) || ($scope.gestion.P_DESCUENTO === "") ||
                    ($scope.gestion.VALOR == null) || ($scope.gestion.VALOR == undefined) || ($scope.gestion.VALOR === "")
                ) {
                    swal('Información', "Todos los Campos son Obligatorios ", 'info');
                }
                else {
                    var data = $scope.datos_modal;
                    var encontrado = false;
                    data.tarifa = $scope.gestion.TARIFA;
                    data.idtarifa = $scope.gestion.TARIFA_CODIGO;
                    data.operador = $scope.gestion.DESCUENTO;
                    data.factor = $scope.gestion.P_DESCUENTO.toString().replace(/\./g, ',');
                    data.valor = $scope.gestion.VALOR;
                    for (let i = 0; i < $scope.nuevos_productos.length; i++) {
                        if (data.codigo_producto == $scope.nuevos_productos[i].codigo_producto) {
                            encontrado = true;
                            swal({
                                title: "Advertencia!",
                                text: 'El producto ' + data.codigo_producto + '-' + data.nombre_producto + ' ya se encuentra agregado',
                                type: "info"
                            }).then(function () {
                                $('#modal_buscar_producto_para_agregar').modal('close');
                            })
                            break;
                        }
                    }
                    if (encontrado == false) {
                        data.estado = 'NUEVO';
                        data.id_estado = '0';
                        //  $scope.lista_productos_contratados.push(data);
                        $('#modal_buscar_producto_para_agregar').modal('close');

                        $scope.nuevos_productos.push({
                            codigo_producto: data.codigo_producto,
                            codigo_servicio: data.codigo_servicio,
                            accion: 'A',
                            nombre_accion: 'AGREGAR',
                            Cod_tarifa: data.idtarifa,
                            operador: data.operador,
                            factor: data.factor,
                            valor: data.valor,
                        });

                        console.log($scope.nuevos_productos);
                    }
                }


            }
            $scope.agregar_producto_modal = function (data) {
                if((data.codigo_servicio == '714' && $scope.usuario_rol == '126') || (data.codigo_servicio == '799' && $scope.usuario_rol == '126') || (data.codigo_servicio == '1000' && $scope.usuario_rol == '126')){
                $scope.gestion = {};
                $scope.datos_modal = data;
                $scope.gestion.clasificacion = data.codigo_servicio;
                $scope.gestion.renglon = data.renglon;
                $scope.gestion.clasificacion_nombre = data.nombre_servicio;
                $scope.gestion.producto = data.codigo_producto;
                $scope.gestion.producto_nombre = data.nombre_producto;
                $scope.gestion.TARIFA = '';
                $scope.gestion.TARIFA_CODIGO = '';
                $scope.gestion.DESCUENTO = '';
                $scope.gestion.P_DESCUENTO = 0;
                $scope.gestion.VALOR = 0;
                $('#modalproducto2').modal('open');
                $scope.buscar_listado_select_tarifa2(data.codigo_producto);
                document.getElementById("tarifa_1").value = '';
            }else if ((data.codigo_servicio != '714' && data.codigo_servicio != '799'  && data.codigo_servicio != '1000') && $scope.usuario_rol != '126'){
                  $scope.gestion = {};
                  $scope.datos_modal = data;
                  $scope.gestion.clasificacion = data.codigo_servicio;
                  $scope.gestion.renglon = data.renglon;
                  $scope.gestion.clasificacion_nombre = data.nombre_servicio;
                  $scope.gestion.producto = data.codigo_producto;
                  $scope.gestion.producto_nombre = data.nombre_producto;
                  $scope.gestion.TARIFA = '';
                  $scope.gestion.TARIFA_CODIGO = '';
                  $scope.gestion.DESCUENTO = '';
                  $scope.gestion.P_DESCUENTO = 0;
                  $scope.gestion.VALOR = 0;
                  $('#modalproducto2').modal('open');
                  $scope.buscar_listado_select_tarifa2(data.codigo_producto);
                  document.getElementById("tarifa_1").value = '';

              } else {
                swal({
                    title: "Completado!",
                    text: 'No tiene permitido esta accion',
                    type: "info"
                })
              }

            }
            $scope.eliminar_producto_nuevo = function (data) {
                var texto = "¿Seguro que desea Eliminar el nuevo producto " + data.codigo_producto + '-' + data.nombre_producto + " ?";
                swal({
                    title: 'Confirmar',
                    text: texto,
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result) {
                        for (let i = 0; i < $scope.nuevos_productos.length; i++) {
                            if (data.codigo_producto == $scope.nuevos_productos[i].codigo_producto) {
                                $scope.nuevos_productos.splice(i, 1);
                                break;
                            }
                        }

                    }
                })
                console.log($scope.nuevos_productos);
            }
            $scope.agregar_producto = function () {
                $scope.coincidencia = '';
                $scope.lista_productos_contratados_modal = [];
                $scope.lista_productos_contratados_modal_adjunto();
                $('#modal_buscar_producto_para_agregar').modal('open');
            }
           
            //edicion de tarifa
            $scope.editar_tarifa = function (index) {
                console.log(index);
                if((index.epro_clasificacion == '714' && $scope.usuario_rol == '126') || (index.epro_clasificacion == '799' && $scope.usuario_rol == '126') || (index.epro_clasificacion == '1000' && $scope.usuario_rol == '126')){
                    $scope.buscar_listado_select_tarifa2(index.codigo_producto);
                    $scope.gestion = {};
                    $scope.gestion.clasificacion = index.codigo_servicio;
                    $scope.gestion.renglon = index.renglon;
                    $scope.gestion.clasificacion_nombre = index.nombre_servicio;
                    $scope.gestion.producto = index.codigo_producto;
                    $scope.gestion.producto_nombre = index.nombre_producto;
                    // $scope.gestion.TARIFA = index.nomtarifa;
                    $scope.gestion.VALOR = parseFloat(index.valor_2);
                    $scope.gestion.TARIFA_CODIGO = index.idtarifa;
                    $scope.gestion.DESCUENTO = index.operador;
                    $scope.gestion.P_DESCUENTO = index.factor;
                    $scope.switch_view = false;
                    $scope.cadena = '';
                    setTimeout(() => {
                        $scope.seleccion_opcion_tarifa2($scope.gestion.TARIFA_CODIGO);
                        document.getElementById("tarifa_producto_modal").value = index.idtarifa;
                        $('#modalproducto').modal('open');
                    }, 300);
                }else if ((index.epro_clasificacion != '714' && index.epro_clasificacion != '799' && index.epro_clasificacion != '1000') && $scope.usuario_rol != '126'){
                    $scope.buscar_listado_select_tarifa2(index.codigo_producto);
                    $scope.gestion = {};
                    $scope.gestion.clasificacion = index.codigo_servicio;
                    $scope.gestion.renglon = index.renglon;
                    $scope.gestion.clasificacion_nombre = index.nombre_servicio;
                    $scope.gestion.producto = index.codigo_producto;
                    $scope.gestion.producto_nombre = index.nombre_producto;
                    // $scope.gestion.TARIFA = index.nomtarifa;
                    $scope.gestion.VALOR = parseFloat(index.valor_2);
                    $scope.gestion.TARIFA_CODIGO = index.idtarifa;
                    $scope.gestion.DESCUENTO = index.operador;
                    $scope.gestion.P_DESCUENTO = index.factor;
                    $scope.switch_view = false;
                    $scope.cadena = '';
                    setTimeout(() => {
                        $scope.seleccion_opcion_tarifa2($scope.gestion.TARIFA_CODIGO);
                        document.getElementById("tarifa_producto_modal").value = index.idtarifa;
                        $('#modalproducto').modal('open');
                    }, 300);
                } else {
                swal({
                    title: "Completado!",
                    text: 'No tiene permitido esta accion',
                    type: "info"
                })
            }
            }
            $scope.buscar_listado_select_tarifa2 = function (x) {
                $scope.json_tarifa = [];
                $http({
                    method: 'POST',
                    url: "php/contratacion/tarifacategoria.php",
                    data: {
                        function: 'p_lista_tarifa',
                        codigo: '',
                        producto: x
                    }
                }).then(function (response) {
                    if (response.data.length == 0) {
                        $scope.json_tarifa = [];
                    } else {
                        if (response.data.length == 1) {
                            $scope.json_tarifa = response.data;
                            // $scope.seleccion_opcion_tarifa2(0);
                        } else {
                            $scope.json_tarifa = response.data;
                            console.log($scope.json_tarifa);
                        }

                    }
                });

            }
            $scope.seleccion_opcion_tarifa2 = function (ref) {
                var tarifa = $scope.json_tarifa.find(x => x.CODIGO == ref);
                if (tarifa != undefined) {
                    $scope.gestion.TARIFA_CODIGO = tarifa.CODIGO;

                    $scope.gestion.TARIFA_VALOR = parseFloat("0" + tarifa.VALOR.replace(/,/g, '.'));
                    $scope.gestion.TARIFA_VALOR2 = tarifa.VALOR2;
                    $scope.gestion.TARIFA_FACTOR = tarifa.FACTOR;
                    $scope.tarifa_calcular();
                }

            }
            $scope.tarifa_calcular = function () {
                if ($scope.switch_view) {
                    var calcular = 0;
                    $scope.cadena = '';
                    if (
                        ($scope.gestion.TARIFA_VALOR != 0) && ($scope.gestion.TARIFA_VALOR != undefined) && ($scope.gestion.TARIFA_VALOR != null) &&
                        ($scope.gestion.TARIFA_FACTOR != 0) && ($scope.gestion.TARIFA_FACTOR != undefined) && ($scope.gestion.TARIFA_FACTOR != null)
                    ) {
                        calcular = ((parseFloat($scope.gestion.TARIFA_VALOR) * parseFloat($scope.gestion.TARIFA_FACTOR)) * parseFloat($scope.gestion.P_DESCUENTO)) / 100;

                        if ($scope.gestion.DESCUENTO == 'S') {
                            calcular = calcular + (parseFloat($scope.gestion.TARIFA_VALOR) * parseFloat($scope.gestion.TARIFA_FACTOR));
                        } else {
                            calcular = (parseFloat($scope.gestion.TARIFA_VALOR) * parseFloat($scope.gestion.TARIFA_FACTOR)) - calcular;
                        }
                        $scope.gestion.VALOR = calcular | 0;
                        $scope.cadena = '' + '(' + $scope.gestion.TARIFA_VALOR + '*' + $scope.gestion.TARIFA_FACTOR + ')';
                        $scope.cadena = $scope.cadena + ' ' + ($scope.gestion.DESCUENTO == 'S' ? '+' : '-');
                        $scope.cadena = $scope.cadena + ' (' + '' + '(' + $scope.gestion.TARIFA_VALOR + '*' + $scope.gestion.TARIFA_FACTOR + ')' + ' * ';
                        $scope.cadena = $scope.cadena + '' + $scope.gestion.P_DESCUENTO + ' / 100) =' +
                            $scope.gestion.VALOR;
                    } else {
                        $scope.cadena = "---Resultado----"
                    }
                } else {
                    var calcular = 0;
                    $scope.cadena = '';
                    if (
                        ($scope.gestion.TARIFA_VALOR != 0) && ($scope.gestion.TARIFA_VALOR != undefined) && ($scope.gestion.TARIFA_VALOR != null) &&
                        ($scope.gestion.TARIFA_FACTOR != 0) && ($scope.gestion.TARIFA_FACTOR != undefined) && ($scope.gestion.TARIFA_FACTOR != null) &&
                        ($scope.gestion.VALOR != '') && ($scope.gestion.VALOR != null) && ($scope.gestion.VALOR != undefined)
                    ) {
                        if ($scope.gestion.TARIFA_VALOR2 < $scope.gestion.VALOR) {
                            $scope.gestion.DESCUENTO = 'S';
                            calcular = (parseFloat($scope.gestion.VALOR) - $scope.gestion.TARIFA_VALOR2) * 100;
                            $scope.cadena = '(' + $scope.gestion.TARIFA_VALOR + ' * ' + $scope.gestion.TARIFA_FACTOR + ')' + "<" + $scope.gestion.VALOR + "=";
                            $scope.cadena = $scope.cadena + "" + $scope.gestion.VALOR + " - " + ' (' + $scope.gestion.TARIFA_VALOR + '*' + $scope.gestion.TARIFA_FACTOR + ') ';
                        } else {
                            $scope.gestion.DESCUENTO = 'R'
                            calcular = (($scope.gestion.TARIFA_VALOR2 - parseFloat($scope.gestion.VALOR))) * 100;
                            $scope.cadena = '(' + $scope.gestion.TARIFA_VALOR + ' * ' + $scope.gestion.TARIFA_FACTOR + ')' + ">" + $scope.gestion.VALOR + "=";
                            $scope.cadena = $scope.cadena + ' (' + $scope.gestion.TARIFA_VALOR + '*' + $scope.gestion.TARIFA_FACTOR + ') ' + " - " + $scope.gestion.VALOR;
                        }
                        calcular = calcular / $scope.gestion.TARIFA_VALOR2;
                        $scope.gestion.P_DESCUENTO = parseFloat(calcular.toFixed(2));
                        $scope.cadena = $scope.cadena + " / " + parseFloat($scope.gestion.TARIFA_VALOR) + ' * ' + parseFloat($scope.gestion.TARIFA_FACTOR);
                    } else {
                        $scope.cadena = "---Resultado----"
                    }

                }

            }
            $scope.gestionar_productos = function (x) {
                if((x.epro_clasificacion == '714' && $scope.usuario_rol == '126') || (x.epro_clasificacion == '799' && $scope.usuario_rol == '126') || (x.epro_clasificacion == '1000' && $scope.usuario_rol == '126')){
                    $scope.json_subcategoria = [];
                    $scope.productos_modal = x;
                    $scope.contrato_cabeza.producto_nombre = x.nombre_producto;
                    $scope.contrato_cabeza.producto = x.codigo_producto;
                    $scope.contrato_cabeza.clasificacion = x.codigo_servicio;
                    $scope.contrato_cabeza.clasificacion_nombre = x.nombre_servicio;
                    swal({
                        title: 'Cargando...',
                    });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/contratacion/tarifacategoria.php",
                        data: {
                            function: 'P_OBTENER_PRODUCTOS_CAT_ALTERNA_SERVICIOS_CONTRATO',
                            codigo: $scope.contrato_cabeza.numero,
                            v_pubicacion: $scope.contrato_cabeza.ubicacion,
                            v_pdocumento: $scope.contrato_cabeza.documento_id,
                            v_pservicio: $scope.contrato_cabeza.clasificacion,
                            v_pproducto: $scope.contrato_cabeza.producto
                        }
                    }).then(function (response) {
                        swal.close();
                        console.log($scope.json_subcategoria);
                        $scope.json_subcategoria = response.data;
                        $scope.subpaso = 31;
                    });
                }else if ((x.epro_clasificacion != '714' && x.epro_clasificacion != '799' && x.epro_clasificacion != '1000') && $scope.usuario_rol != '126'){
                    $scope.json_subcategoria = [];
                    $scope.productos_modal = x;
                    $scope.contrato_cabeza.producto_nombre = x.nombre_producto;
                    $scope.contrato_cabeza.producto = x.codigo_producto;
                    $scope.contrato_cabeza.clasificacion = x.codigo_servicio;
                    $scope.contrato_cabeza.clasificacion_nombre = x.nombre_servicio;
                    swal({
                        title: 'Cargando...',
                    });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/contratacion/tarifacategoria.php",
                        data: {
                            function: 'P_OBTENER_PRODUCTOS_CAT_ALTERNA_SERVICIOS_CONTRATO',
                            codigo: $scope.contrato_cabeza.numero,
                            v_pubicacion: $scope.contrato_cabeza.ubicacion,
                            v_pdocumento: $scope.contrato_cabeza.documento_id,
                            v_pservicio: $scope.contrato_cabeza.clasificacion,
                            v_pproducto: $scope.contrato_cabeza.producto
                        }
                    }).then(function (response) {
                        swal.close();
                        console.log($scope.json_subcategoria);
                        $scope.json_subcategoria = response.data;
                        $scope.subpaso = 31;
                    });
                } else{
                swal({
                    title: "Completado!",
                    text: 'No tiene permitido esta accion',
                    type: "info"
                })
            }
            }
            $scope.abrir_modal1 = function (x) {
                $scope.buscar_listado_select_tarifa2($scope.contrato_cabeza.producto);
                $scope.contrato_cabeza.renglon = x.renglon;
                $scope.contrato_cabeza.subcategoria = x.codigo_alterno;
                $scope.contrato_cabeza.subcategoria_nombre = x.nombre_alterno;
                $scope.gestion = {};
                $scope.gestion.TARIFA = x.nomtarifa;
                $scope.gestion.DESCUENTO = x.operador;
                $scope.gestion.VALOR = x.valor2;
                setTimeout(() => {
                    $scope.seleccion_opcion_tarifa2($scope.gestion.TARIFA_CODIGO);
                    document.getElementById("tarifa_subcategoria_modal").value = x.idtarifa;
                    $('#modal_subcategorias').modal('open');
                }, 300);

            }

            $scope.guardar_subcateria_modal = function () {
                swal({
                    title: 'Cargando...',
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/tarifacategoria.php",
                    data: {
                        function: 'P_INSERTA_CONTRATO_ALTERNO',
                        v_pnumero: $scope.contrato_cabeza.numero,
                        v_pdocumento: $scope.contrato_cabeza.documento_id,
                        v_pubicacion: $scope.contrato_cabeza.ubicacion,
                        v_pnit: $scope.contrato_cabeza.nit,
                        v_pproducto: $scope.contrato_cabeza.producto,
                        v_pservicio: $scope.contrato_cabeza.clasificacion,
                        v_pcodclasificacion: $scope.contrato_cabeza.subcategoria,
                        v_prenglon: $scope.contrato_cabeza.renglon,
                        v_pcodtarifa: $scope.gestion.TARIFA_CODIGO,
                        v_psuma: $scope.gestion.DESCUENTO,
                        v_pporcentaje: $scope.gestion.P_DESCUENTO.toString().replace(/\./g, ','),
                        v_pvalor: $scope.gestion.VALOR
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data.codigo == 0) {
                        swal({
                            title: "Completado!",
                            text: response.data.Nombre,
                            type: "success"
                        }).then(function () {
                            $scope.gestionar_productos($scope.productos_modal);
                        })

                    } else {
                        swal('Información', "Favor Llenar los campos nuevamente", 'info');
                    }

                });
            }
            $scope.guardar_producto_modal = function () {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/funccontratacion.php",
                    data: {
                        function: 'P_ACTUALIZA_PRODUCTOS',
                        v_pempresa: '1',
                        v_pdocumento: $scope.contrato_cabeza.documento_id,
                        v_pnumero: $scope.contrato_cabeza.numero,
                        V_ubicacion: $scope.contrato_cabeza.ubicacion,
                        v_prenglon: $scope.gestion.renglon,
                        v_pservicio: $scope.gestion.clasificacion,
                        v_pproducto: $scope.gestion.producto,
                        v_ptarifa: $scope.gestion.TARIFA_CODIGO,
                        v_psuma: $scope.gestion.DESCUENTO,
                        v_pporcentaje: $scope.gestion.P_DESCUENTO.toString().replace(/\./g, ','),
                        v_pvalor: $scope.gestion.VALOR
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data.CODIGO == 1) {
                        swal({
                            title: "Completado!",
                            text: response.data.NOMBRE,
                            type: "success"
                        }).then(function () {
                            $scope.gestion.index = $scope.lista_productos_contratados.find(x => x.renglon == $scope.gestion.renglon);
                            $scope.gestion.index = $scope.lista_productos_contratados.indexOf($scope.gestion.index);
                            $scope.lista_productos_contratados[$scope.gestion.index].id_estado = 5;
                            $scope.lista_productos_contratados[$scope.gestion.index].estado = 'TARIFA CAMBIADA';
                            // {{productos_contratado.tarifa}}=${{productos_contratado.valor}}
                            $scope.lista_productos_contratados[$scope.gestion.index].tarifa = $scope.gestion.TARIFA;
                            $scope.lista_productos_contratados[$scope.gestion.index].valor = $scope.gestion.VALOR;
                            setTimeout(() => {
                                $scope.$apply();
                            }, 30);
                        })

                    } else {
                        swal('Información', response.data.NOMBRE, 'info');
                    }
                });
            }

            $scope.guardar_modificacion = function () {
                $scope.json_modificacion[$scope.json_modificacion.findIndex(obj => obj.accion == $scope.mostrar_modificacion)].actualizado = true;
                $scope.contrato_actualizado[$scope.mostrar_modificacion].observacion = $scope.observacion_modificacion;
                $scope.observacion_modificacion = "";
                $scope.paso = 3;
            }

            $scope.editarClausuras = function (ind) {
                $scope.subpaso = 101;
                $scope.clausura_anterior = $scope.contrato_actual[10].json_clausura_actuales[ind].nombre;
            }


            $scope.setTab = function (newTab) {
                $scope.tab = newTab;
                $(".tabI").removeClass("tabactiva");
                $(".tabII").removeClass("tabactiva");
                $(".tabIII").removeClass("tabactiva");
                switch (newTab) {
                    case 1:
                        $(".tabI").addClass("tabactiva");
                        break;
                    case 2:
                        $(".tabII").addClass("tabactiva");
                        break;
                    case 3:
                        $(".tabIII").addClass("tabactiva");
                    default:
                }
            }
            $scope.isSet = function (tabNum) {
                return $scope.tab === tabNum;
            }
            $scope.lista_productos_contratados_modal_adjunto = function () {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: {
                        function: 'P_LISTAR_ARCHIVO_ADICION',
                        v_pnumero: $scope.contrato_cabeza.numero,
                        v_pubicacion: $scope.contrato_cabeza.ubicacion,
                        v_pdocumento: $scope.contrato_cabeza.documento_id
                    }
                }).then(function (response) {
                    swal.close();
                    $scope.listas_productos_contratados = response.data;
                })
            }

            $scope.agregar_producto_modal_masivo1 = function (proceso) {

                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: {
                        function: 'P_LISTAR_PRODUC_VALIDADO',
                        v_pcodigo_proceso: proceso,
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data[0] != undefined) {
                        $scope.listado_datos_validos = response.data;
                        $scope.proceso = false;
                        $scope.v_pcodigo_proceso = proceso;

                    } else {
                        swal('Información', response.data.Nombre, 'info')

                    }
                })
            }
            $scope.codigo_proceso_validacion_precontractual = 0;
            $scope.agregar_producto_modal_masivo2 = function () {
                swal({
                    title: 'Digite la observación',
                    input: 'textarea',
                }).then(function (texto) {
                    swal({
                        title: 'Cargando información...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/contratacion/gestioncontrato.php",
                        data: {
                            function: 'P_UI_PRODUCTOS_VAL',
                            v_pnumero: $scope.contrato_cabeza.numero,
                            v_pubicacion: $scope.contrato_cabeza.ubicacion,
                            v_pdocumento: $scope.contrato_cabeza.documento_id,
                            v_codigo: $scope.codigo_proceso_validacion_precontractual,
                            v_pcodigo_proceso: $scope.v_pcodigo_proceso,
                            v_pobservacion: texto
                        }
                    }).then(function (response) {
                        swal.close();
                        if (response.data.Codigo == 0) {
                            swal({
                                title: "Completado!",
                                text: response.data.Nombre,
                                type: "success"
                            }).then(function () {
                                $scope.nuevos_productos = [];
                                $('#modal_buscar_producto_para_agregar').modal('close');
                            })
                        } else {
                            swal('Información', response.data.Nombre, 'info')
                        }


                    })
                })

            }


            //edici9on de sedes
            $scope.buscar_tarifa = function () {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontrato.php",
                    data: {
                        function: 'P_LISTAR_TARIFA_BASE'
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data[0] != undefined) {
                        $scope.listado_tarifas = response.data;
                    } else {
                        $scope.listado_tarifas = []
                    }
                })
            }
            $scope.buscar_tarifa();


            ///////////////////////////////CNVU/////////////////////////////
            $scope.obtener_motivos = function () {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontratacion.php",
                    data: {
                        function: 'p_lista_motivos',
                        documento: $scope.json_contratos[0].documento_id,
                        concepto: $scope.json_contratos[0].codigo_concepto
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data[0] != undefined) {
                        $scope.json_motivos = response.data;
                    } else {
                        $scope.json_motivos = []
                    }
                })
            }

            $scope.obtener_asuntos = function (motivo) {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontratacion.php",
                    data: {
                        function: 'p_lista_asuntos',
                        v_pmotivo: motivo,
                        documento: $scope.json_contratos[0].documento_id,
                        concepto: $scope.json_contratos[0].codigo_concepto
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data[0] != undefined) {
                        $scope.json_asuntos = response.data;
                    } else {
                        $scope.json_asuntos = []
                    }
                })
            }

            $scope.actualizar_asunto_motivos = function (motivo, asunto, accion) {
                // console.log(accion);
                if ($scope.result_perfil.cod_cargo == 178) {
                    swal({
                        title: 'Cargando información...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/contratacion/gestioncontratacion.php",
                        data: {
                            function: 'actualizar_asunto_motivos',
                            v_pmotivo: motivo,
                            asunto: asunto,
                            contrato: $scope.contrato_cabeza.numero,
                            ubicacion: $scope.contrato_cabeza.ubicacion,
                            documento: $scope.contrato_cabeza.documento_id,
                            accion: accion
                        }
                    }).then(function (response) {
                        swal.close();
                        if (response.data.Codigo == 0) {
                            // $scope.json_asuntos = response.data;
                            swal('Confirmado', response.data.Nombre, 'success');
                            $scope.paso = 1;
                            $scope.buscar();
                            if (accion == 'P') {
                                $scope.motivos_personalizados = '';
                                $scope.asunto_personalizado = '';
                            }
                            //console.log(response.data);
                        } else {
                            swal('Error', response.data.Nombre, 'warning');
                            $scope.json_asuntos = []
                        }
                    });
                } else if ($scope.result_perfil.cod_cargo != 178 && $scope.json_contratos[0].codigo_concepto == 'EV') {
                    swal({
                        title: 'Cargando información...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/contratacion/gestioncontratacion.php",
                        data: {
                            function: 'actualizar_asunto_motivos',
                            v_pmotivo: motivo,
                            asunto: asunto,
                            contrato: $scope.contrato_cabeza.numero,
                            ubicacion: $scope.contrato_cabeza.ubicacion,
                            documento: $scope.contrato_cabeza.documento_id,
                            accion: accion
                        }
                    }).then(function (response) {
                        swal.close();
                        if (response.data.Codigo == 0) {
                            // $scope.json_asuntos = response.data;
                            swal('Confirmado', response.data.Nombre, 'success');
                            $scope.paso = 1;
                            $scope.buscar();
                            if (accion == 'P') {
                                $scope.motivos_personalizados = '';
                                $scope.asunto_personalizado = '';
                            }
                            //console.log(response.data);
                        } else {
                            swal('Error', response.data.Nombre, 'warning');
                            $scope.json_asuntos = []
                        }
                    });
                } else {
                    swal('Error', 'No cuenta con permisos para realizar esta acción.', 'warning');
                };
            }

            $scope.listarmotivosselect = function () {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontratacion.php",
                    data: {
                        function: 'listarlosmotivos',
                    }
                }).then(function (response) {
                    swal.close();
                    $scope.listadodelosmotivos = response.data;
                    
                });
        }
        $scope.PguardarOtrosimotivo = function (accion) {
            if ($scope.fecha_edicion_editar != '' || $scope.fecha_edicion_editar != undefined || $scope.fecha_edicion_editar != null) {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/contratacion/gestioncontratacion.php",
                        data: {
                            function: 'UI_OTROSI_MOTIVO',
                            v_pnumero: $scope.infoContrato.numero,
                            v_pdocumento: $scope.infoContrato.documento,
                            v_pubicacion: $scope.infoContrato.ubicacion_id,
                            v_pconcepto: $scope.infoContrato.cod_concepto,
                            v_pcant_afiliado: $scope.cantidad_afiliados_editar != '' ? $scope.cantidad_afiliados_editar : $scope.infoContrato.afiliados,
                            v_pval_afiliado: $scope.valor_afiliado_editar != '' ? $scope.valor_afiliado_editar : $scope.infoContrato.valor_cap_afiliado_noformat,
                            v_pfecha_modificacion: $scope.fecha_edicion_editar != '' ? parsedia($scope.fecha_edicion_editar) : '',
                            v_pfecha_final: $scope.fecha_final_editar_os != '' ? parsedia($scope.fecha_final_editar_os) : $scope.infoContrato.termina,
                            v_pvalor_contrato: $scope.valor_contrato_editar,
                            v_pval_contrato_otrosi_ev: $scope.infoContrato.concepto == 'CA' ? '' : $scope.valor_contrato_otrosi_ev,
                            v_pobservacion_otrosi: $scope.valor_contrato_otrosi_ev != '' ? $scope.valor_contrato_otrosi_ev : '0',
                            accion: accion,
                            motivoseleccionado:$scope.motivoenviar,
                        }
                    }).then(function (response) {
                        swal.close();
                        if (response.data.Codigo == 0) {
                            swal('Confirmado', response.data.Nombre, 'success');
                            setTimeout(() => {
                                $scope.buscar();
                            }, 1000);
                        } else {
                            swal('Error', response.data.Nombre, 'warning');
                        }
                    });
                // }
            } else {
                swal('Error', 'La fecha de modificación no puede estar vacia.', 'warning');
            };
        }
            
            $scope.ui_formas_pago = function (accion) {
                // console.log($scope.forma_pago,accion);
                if ($scope.forma_pago != '' || $scope.forma_pago != undefined || $scope.forma_pago != null) {
                    swal({
                        title: 'Cargando información...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/contratacion/gestioncontratacion.php",
                        data: {
                            function: 'ui_formas_pago',
                            contrato: $scope.contrato_cabeza.numero,
                            ubicacion: $scope.contrato_cabeza.ubicacion,
                            documento: $scope.contrato_cabeza.documento_id,
                            forma_pago: $scope.forma_pago,
                            accion: accion
                        }
                    }).then(function (response) {
                        swal.close();
                        if (response.data.Codigo == 0) {
                            // $scope.json_asuntos = response.data;
                            swal('Confirmado', response.data.Nombre, 'success');
                            $scope.paso = 1;
                            $scope.buscar();
                            $scope.forma_pago = '';
                            //console.log(response.data);
                        } else {
                            swal('Error', response.data.Nombre, 'warning');
                            // $scope.json_asuntos = []
                        }
                    });
                } else {
                    swal('Error', 'Por favor seleccionar una opción valida.', 'warning');
                };
            }

            $scope.calcular_valor_total = function () {
                // if ($scope.fecha_edicion_editar == '' || $scope.fecha_edicion_editar == undefined || $scope.fecha_edicion_editar == null) {
                //     swal('Información', 'La fecha de modificación no puede estar vacia.', 'info');
                // }else{
                    swal({
                        title: 'Cargando información...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/contratacion/gestioncontratacion.php",
                        data: {
                            function: 'P_CALCULA_VALOR_CONTRATO',
                            v_pnumero: $scope.infoContrato.numero,
                            v_pdocumento: $scope.infoContrato.documento,
                            v_pubicacion: $scope.infoContrato.ubicacion_id,
                            v_pconcepto: $scope.infoContrato.cod_concepto,
                            v_pcant_afiliado: $scope.cantidad_afiliados_editar != '' ? $scope.cantidad_afiliados_editar : $scope.infoContrato.afiliados,
                            v_pval_afiliado: $scope.valor_afiliado_editar != '' ? $scope.valor_afiliado_editar : $scope.infoContrato.valor_cap_afiliado_noformat,//.substr(1, $scope.infoContrato.valor_cap_afiliado_noformat.length),
                            v_pfecha_modificacion: $scope.fecha_edicion_editar != '' ? parsedia($scope.fecha_edicion_editar) : '',
                            v_pfecha_final: $scope.fecha_final_editar_os != '' ? ($scope.fecha_final_editar_os == undefined ? '' : parsedia($scope.fecha_final_editar_os)) : $scope.infoContrato.termina,
                            v_pval_contrato_otrosi_ev: $scope.valor_contrato_otrosi_ev != '' ? $scope.valor_contrato_otrosi_ev : '0'//$scope.infoContrato.concepto == 'CA' ? '' : $scope.valor_contrato_otrosi_ev
                        }
                    }).then(function (response) {
                        swal.close();
                        if (response.data.Codigo == 0) {
                            //$scope.valor_contrato = response.data.Valor_contrato;
                            $scope.valor_contrato_editar = response.data.Valor_contrato;
                            //$scope.periodo_contrato = $scope.infoContrato.meses;//response.data.Periodo1;
                            $scope.valor_contrato_otrosi = response.data.Valor_otrosidiferencia;
                            $scope.periodo_editar = response.data.Periodo2;
                            $scope.meses_ejecutados = response.data.Periodo1;
                            $scope.valor_ejecutado = response.data.Valor_ejecutado;
                            $scope.valor_otrosi_diferencia = response.data.Valor_otrosi;
                            
                            setTimeout(() => {
                                $scope.FormatPeso('valor_contrato_editar');
                                $scope.FormatPeso('valor_contrato');
                                //$scope.FormatPeso('valor_contrato_otrosi');
                            }, 200);
                        } else {
                            swal('Información', response.data.Nombre, 'info');
                        }
                    });
                //}
            }

            $scope.ui_otrosi = function (accion) {
                // console.log($scope.forma_pago,accion);
                //$scope.calcular_valor_total();
                // console.log($scope.valor_contrato_editar);
                if ($scope.fecha_edicion_editar != '' || $scope.fecha_edicion_editar != undefined || $scope.fecha_edicion_editar != null) {
                    swal({
                        title: 'Cargando información...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    // if ($scope.valor_contrato_editar_temp != $scope.valor_contrato_editar) {
                        $http({
                            method: 'POST',
                            url: "php/contratacion/gestioncontratacion.php",
                            data: {
                                function: 'UI_OTROSI',
                                v_pnumero: $scope.infoContrato.numero,
                                v_pdocumento: $scope.infoContrato.documento,
                                v_pubicacion: $scope.infoContrato.ubicacion_id,
                                v_pconcepto: $scope.infoContrato.cod_concepto,
                                v_pcant_afiliado: $scope.cantidad_afiliados_editar != '' ? $scope.cantidad_afiliados_editar : $scope.infoContrato.afiliados,
                                v_pval_afiliado: $scope.valor_afiliado_editar != '' ? $scope.valor_afiliado_editar : $scope.infoContrato.valor_cap_afiliado_noformat,//.substr(1, $scope.infoContrato.valor_cap_afiliado_noformat.length),
                                v_pfecha_modificacion: $scope.fecha_edicion_editar != '' ? parsedia($scope.fecha_edicion_editar) : '',
                                v_pfecha_final: $scope.fecha_final_editar_os != '' ? parsedia($scope.fecha_final_editar_os) : $scope.infoContrato.termina,
                                v_pvalor_contrato: $scope.valor_contrato_editar,
                                v_pval_contrato_otrosi_ev: $scope.infoContrato.concepto == 'CA' ? '' : $scope.valor_contrato_otrosi_ev,
                                v_pobservacion_otrosi: $scope.valor_contrato_otrosi_ev != '' ? $scope.valor_contrato_otrosi_ev : '0',//$scope.observacion_otrosi != '' ? $scope.observacion_otrosi : '',
                                accion: accion
                            }
                        }).then(function (response) {
                            swal.close();
                            if (response.data.Codigo == 0) {
                                // $scope.json_asuntos = response.data;
                                swal('Confirmado', response.data.Nombre, 'success');
                                // $scope.paso = 1;
                                $scope.buscar();
                                // $scope.forma_pago = '';
                                //console.log(response.data);
                            } else {
                                swal('Error', response.data.Nombre, 'warning');
                                // $scope.json_asuntos = []
                            }
                        });
                    // }
                } else {
                    swal('Error', 'La fecha de modificación no puede estar vacia.', 'warning');
                };
            }

            ///////////////////////////////KARIZA/////////////////////////
            ///////////////////////////////KARIZA/////////////////////////////
            $scope.obtener_excepciones = function () {
                $scope.excepcion_Btn_Actualizar = false;
                $scope.Excepciones = {};
                $scope.Excepciones_Save = {};
                if ($scope.infoContrato.normalizado == 'S') {
                    swal({
                        title: 'Cargando información...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/contratacion/funccontratacion.php",
                        data: {
                            function: 'P_LISTAR_ESTANDAR_CONTRATO',
                            v_pdocumento: $scope.infoContrato.documento,
                            v_pconcepto: $scope.infoContrato.cod_concepto,
                            v_pmotivo: $scope.infoContrato.codigo_motivo,
                            v_pasunto: $scope.infoContrato.codigo_asunto
                        }
                    }).then(function (response) {
                        swal.close();
                        if (response.data.length > 0) {
                            $scope.Excepciones.genera_autorizacion = response.data[0].genera_autorizacion;
                            $scope.Excepciones.genera_prefactura = response.data[0].genera_prefactura;
                            $scope.Excepciones.genera_bd = response.data[0].genera_bd;
                            $scope.Excepciones.genera_factura = response.data[0].genera_factura;
                            $scope.Excepciones.genera_ubicacion_capita = response.data[0].genera_ubicacion_capita;
                            $scope.Excepciones.genera_retroactivas = response.data[0].genera_retroactivas;
                            $scope.Excepciones.genera_priorizacion = response.data[0].genera_priorizacion;
                            $scope.Excepciones_Save = JSON.stringify($scope.Excepciones);
                        } else {
                            swal('Información', "No registra Excepciones", 'info');
                        }
                    })
                } else {
                    swal({
                        title: 'Cargando información...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/contratacion/funccontratacion.php",
                        data: {
                            function: 'SP_OBTENER_ESTANDAR_CONTRATO',
                            numero: $scope.infoContrato.numero,
                            ubicacion: $scope.infoContrato.ubicacion_id,
                            documento: $scope.infoContrato.documento
                        }
                    }).then(function (response) {
                        swal.close();
                        if (response.data.length > 0) {
                            $scope.Excepciones.genera_autorizacion = response.data[0].genera_autorizacion;
                            $scope.Excepciones.genera_prefactura = response.data[0].genera_prefactura;
                            $scope.Excepciones.genera_bd = response.data[0].genera_bd;
                            $scope.Excepciones.genera_factura = response.data[0].genera_factura;
                            $scope.Excepciones.genera_ubicacion_capita = response.data[0].genera_ubicacion_capita;
                            $scope.Excepciones.genera_retroactivas = response.data[0].genera_retroactivas;
                            $scope.Excepciones.genera_priorizacion = response.data[0].genera_priorizacion;
                            $scope.Excepciones_Save = JSON.stringify($scope.Excepciones);
                        } else {
                            swal('Información', "No registra Excepciones", 'info');
                        }
                    })
                }
                $scope.tab_active = 8;
            }

            $scope.validador_excepciones = function (x) {
                $scope.excepcion_Btn_Actualizar = false;
                var Excepciones_Save = JSON.parse($scope.Excepciones_Save);
                $scope.Excepciones[x] = $scope.Excepciones[x] == 'S' ? 'N' : 'S';
                if ($scope.Excepciones.genera_autorizacion != Excepciones_Save.genera_autorizacion) { $scope.excepcion_Btn_Actualizar = true }
                if ($scope.Excepciones.genera_prefactura != Excepciones_Save.genera_prefactura) { $scope.excepcion_Btn_Actualizar = true }
                if ($scope.Excepciones.genera_bd != Excepciones_Save.genera_bd) { $scope.excepcion_Btn_Actualizar = true }
                if ($scope.Excepciones.genera_factura != Excepciones_Save.genera_factura) { $scope.excepcion_Btn_Actualizar = true }
                if ($scope.Excepciones.genera_ubicacion_capita != Excepciones_Save.genera_ubicacion_capita) { $scope.excepcion_Btn_Actualizar = true }
                if ($scope.Excepciones.genera_retroactivas != Excepciones_Save.genera_retroactivas) { $scope.excepcion_Btn_Actualizar = true }
                if ($scope.Excepciones.genera_priorizacion != Excepciones_Save.genera_priorizacion) { $scope.excepcion_Btn_Actualizar = true }
            }
            $scope.deshacer_excepciones = function () {
                $scope.Excepciones = JSON.parse($scope.Excepciones_Save);
                $scope.excepcion_Btn_Actualizar = false;
                setTimeout(() => { $scope.$apply(); }, 500)
            }


            $scope.actualizar_excepciones = function () {
                swal({
                    title: '¿Desea guardar los cambios realizados?',

                    type: 'question',
                    showCancelButton: true,
                    confirmButtonText: "Confirmar",
                    cancelButtonText: "Cancelar",
                    allowOutsideClick: false
                }).then(function (result) {
                    if (result) {
                        swal({ title: 'Cargando...' });
                        swal.showLoading();
                        $http({
                            method: 'POST',
                            url: "php/contratacion/funccontratacion.php",
                            data: {
                                function: 'P_U_ESTANDAR_CONTRATO',
                                numero: $scope.infoContrato.numero,
                                ubicacion: $scope.infoContrato.ubicacion_id,
                                documento: $scope.infoContrato.documento,
                                datos: JSON.stringify($scope.Excepciones)
                            }
                        }).then(function (response) {
                            swal.close();
                            if (response.data.Codigo == 0) {
                                $scope.obtener_excepciones();
                                swal('Información', response.data.Nombre, 'success');
                            } else {
                                swal('Información', response.data.Nombre, 'info');
                            }
                        })
                    }
                });
            }

            
            $scope.p_lista_servicios_os = function (accion) {
                $scope.accion = accion;
                if (accion == 'U') {
                    $scope.dsb_campos_servicios_os = true;
                }
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestioncontratacion.php",
                    data: {
                        function: 'p_lista_servicios_os',
                        numero: $scope.infoContrato.numero,
                        ubicacion: $scope.infoContrato.ubicacion_id,
                        documento: $scope.infoContrato.documento,
                        accion: accion,
                        prestador: $scope.infoContrato.nit
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data.length > 0) {
                        $scope.listar_ser_habilitacion = response.data;
                        $scope.checktodos_ser = false;
                    }else{
                        swal('Información', 'No se encontraron servicios, por favor validar.', 'info');
                    }
                });
            }

            $scope.listado_elegido_ser = [];
            $scope.eligir_ser_habilitacion = function (x) {
                if (x == -1) {
                    $scope.listado_elegido_ser = [];
                    if ($scope.checktodos_ser == true) {
                        for (let index = 0; index < $scope.listar_ser_habilitacion.length; index++) {
                            $scope.listar_ser_habilitacion[index].marcado = $scope.checktodos_ser = true;
                            $scope.listado_elegido_ser.push($scope.listar_ser_habilitacion[index]);
                        }
                    } else {
                        for (let index = 0; index < $scope.listar_ser_habilitacion.length; index++) {
                            $scope.listar_ser_habilitacion[index].marcado = $scope.checktodos_ser;
                        }
                    }
                } else {
                    var ind = $scope.listar_ser_habilitacion.findIndex(obj => obj.CODIGO_SERVICIO == x);
                    if ($scope.listar_ser_habilitacion[ind].marcado == true) {
                        $scope.listado_elegido_ser.push($scope.listar_ser_habilitacion[ind]);
                    } else {
                        $scope.listado_elegido_ser.splice(ind, 1);
                    }
                }
            }

            $scope.p_ui_servicios = function (accion) {
                console.log($scope.listado_elegido_ser); 
                if (accion == 'I') {
                    if ($scope.tarifa_servicios_os == '' || $scope.operador_servicios_os == '' || $scope.disminucion_servicios_os == '') {
                        swal('Información', 'Por favor digite todos los campos.', 'info');
                    }
                }else{
                    $scope.tarifa_servicios_os = '';
                    $scope.operador_servicios_os = '';
                    $scope.disminucion_servicios_os = '';
                }
                swal({
                    title: 'Confirmar',
                    text: '¿Desea registrar los servicios seleccionados?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result) {
                        // var dataRegistroServicios = JSON.stringify($scope.listado_elegido_ser);
                        $http({
                            method: 'POST',
                            url: "php/contratacion/gestioncontratacion.php",
                            data: {
                                function: 'P_UI_SERVICIOS',
                                numero: $scope.infoContrato.numero,
                                ubicacion: $scope.infoContrato.ubicacion_id,
                                documento: $scope.infoContrato.documento,
                                accion: accion,
                                servicios: JSON.stringify($scope.listado_elegido_ser),//dataRegistroServicios,
                                cantidad_servicios: $scope.listado_elegido_ser.length,
                            }
                        }).then(function (response) {
                            if (response.data.codigo == 0) {
                                swal('Confirmado', response.data.mensaje, 'success');
                                $scope.listado_elegido_ser = [];
                                $scope.buscar();
                            } else {
                                swal('Error', response.data.mensaje, 'warning');
                                $scope.listado_elegido_ser = [];
                            }
                        });
                    }
                });
            }
        }
    ])