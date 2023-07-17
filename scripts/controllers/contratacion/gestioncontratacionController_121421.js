'use strict';
angular.module('GenesisApp')
    .controller('gestioncontratacionController', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$rootScope',
        function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $rootScope) {

            //modal
            $(document).ready(function () {
                $('#modalproducto').modal();
                $('#modalproducto2').modal();
                $('#modal_guardar_producto').modal();
                $('#modal_buscar_producto_para_agregar').modal();
                $('#modal_productos_cambiados').modal();
                $('#modalservicio').modal();
                $('#modal_subcategorias').modal();

            })
            //VARIABLES DE USUARIO
            $scope.usuario_cedula = sessionStorage.getItem('cedula');
            $scope.usuario_cargo = sessionStorage.getItem('cargo');
            $scope.usuario_nombre = sessionStorage.getItem('nombre');
            // MENU DE GESTION
            $scope.json_gestion = [{
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
                            swal.close();
                            if (response.data.CODIGO == 0) {
                                var mensaje = response.data.NOMBRE == null ? "No se encontrarón Resultados " : response.data.NOMBRE;
                                swal('Información', mensaje, 'info');
                                $scope.inactivecontratos = true;
                            } else {
                                $scope.json_contratos = response.data;
                                $scope.inactivecontratos = false;
                                $scope.paso = 1;
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
                        titulo: "CAMBIO VALOR UPC ",
                        accion: 7,
                        actualizado: false,
                        activo: false
                    },
                    {
                        titulo: "MODIFICACION DE SEDES",
                        accion: 8,
                        actualizado: false,
                        activo: false
                    },
                    {
                        titulo: "CAMBIO DE RAZON SOCIAL",
                        accion: 9,
                        actualizado: false,
                        activo: false
                    },
                    {
                        titulo: "CORRECCIONES GENERALES",
                        accion: 10,
                        actualizado: false,
                        activo: false
                    }
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
                        $scope.lista_productos_contratado=[];
                        $scope.subpaso = ind;
                        $scope.nuevos_productos = [];
                        $scope.nuevos_productos=[];
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
                        $scope.prorroga=false;
                        $scope.fecha_inicial_editar = "";
                        $scope.fecha_final_editar = "";
                        $scope.observacion_fecha_inicial = "";
                        $scope.observacion_prorroga="";
                        $scope.fecha_suscripcion="";
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


            // FECHAS
            $scope.guardar_terminacion_contrato = function () {
                 if(($scope.fecha_fin_terminacion=='')||($scope.fecha_fin_terminacion==null)||($scope.fecha_fin_terminacion==undefined)){
                    swal('Información', "El campo fecha fin es obligatorio", 'info')
                }else{


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

                if(
                    ($scope.fecha_inicial_editar=='')|| ($scope.fecha_inicial_editar==undefined)|| ($scope.fecha_inicial_editar==null)||
                    ($scope.fecha_final_editar=='')|| ($scope.fecha_final_editar==undefined)|| ($scope.fecha_final_editar==null)||
                    ($scope.observacion_fecha_inicial=='')|| ($scope.observacion_fecha_inicial==undefined)|| ($scope.observacion_fecha_inicial==null)
                ){
                    swal('Información', "Todos los campos para editar la fecha inicial es obligatorio", 'info')
                }else{
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
                                        $scope.nuevos_productos=[];
                                         $scope.$apply();
                                    })


                                })

                            } else {
                                swal({
                                    title: "Completado!",
                                    text: 'Productos Guardado Con Exito',
                                    type: "success"
                                }).then(function () {
                                      $scope.nuevos_productos=[];
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

                if(
                    ($scope.gestion.TARIFA_CODIGO==null)||($scope.gestion.TARIFA_CODIGO==undefined)||($scope.gestion.TARIFA_CODIGO==="")||
                    ($scope.gestion.DESCUENTO==null)||($scope.gestion.DESCUENTO==undefined)||($scope.gestion.DESCUENTO==="")||
                    ($scope.gestion.P_DESCUENTO==null)||($scope.gestion.P_DESCUENTO==undefined)||($scope.gestion.P_DESCUENTO==="")||
                    ($scope.gestion.VALOR==null)||($scope.gestion.VALOR==undefined)||($scope.gestion.VALOR==="")
                ){
                    swal('Información', "Todos los Campos son Obligatorios ", 'info');
                }
                else
                {
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
                                $scope.nuevos_productos=[];
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
        }
    ])