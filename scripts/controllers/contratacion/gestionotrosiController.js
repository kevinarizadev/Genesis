'use strict';
angular.module('GenesisApp')
    .controller('gestionotrosiController', ['$scope', '$http',
        function ($scope, $http) {
            //modal
            $(document).ready(function () {
              
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
                            url: "php/contratacion/gestionotrosi.php",
                            data: {
                                function: 'P_BUSCAR_CONTRATOS',
                                codigo: $scope.busqueda.numero,
                                regimen: $scope.busqueda.regimen,
                                estado: $scope.busqueda.estado,
                                prestador: $scope.busqueda.prestador,
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
        
            $scope.gestionar_contrato = function (ind) {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                var data = $scope.json_contratos[ind];
                $scope.indicador = ind;
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestionotrosi.php",
                    data: {
                        function: 'P_OBTENER_MODIFICACIONES_CONTRATO',
                        numero: data.numero,
                        ubicacion: data.ubicacion,
                        documento: data.documento_id
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data.length > 0) {
                        $scope.infoContrato = response.data;
                        $scope.contrado_selecionado = true;
                        $scope.contrato_cabeza = $scope.json_contratos[ind];
                        $scope.paso = 2;

                    } else {
                        swal('Información', "Favor Intente buscar Contrato Nuevamente", 'info');
                    }
                })
            }
            $scope.iniciar_bitacora = function (idotrosi) {
                $scope.numerootrosi = idotrosi;
                $scope.paso = 3;
                $scope.mostrar_form = 3;
                $scope.json_contractual = [];
                $http({
                    method: 'POST',
                    url: "php/contratacion/gestionotrosi.php",
                    data: { function: 'p_lista_bitacora' }
                }).then(function (response) {
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
                    url: "php/contratacion/gestionotrosi.php",
                    data: {
                        function: 'obtenerTareasContrato',
                        numero: $scope.contrato_cabeza.numero,
                        ubicacion: $scope.contrato_cabeza.ubicacion,
                        documento: $scope.contrato_cabeza.documento_id,
                        idotrosi: idotrosi,
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data.length > 0) {
                        if (response.data) {
                            var ultimo = 0;
                            $scope.listTareas = response.data[ultimo];
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
                        url: "php/contratacion/gestionotrosi.php",
                        data: {
                            function: 'p_inserta_bitacora',
                            v_pdocumento: $scope.contrato_cabeza.documento_id,
                            v_pcontrato: $scope.contrato_cabeza.numero,
                            v_pubicacion: $scope.contrato_cabeza.ubicacion,
                            v_otrosi: $scope.numerootrosi,
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
                                $scope.iniciar_bitacora($scope.numerootrosi);
                            })
                        } else {
                            var mensaje = response.data.Nombre == null ? "Hubo un error al cargar la bitacora " : response.data.Nombre;
                            swal('Información', mensaje, 'info');

                        }
                    });
                }

            }
        }
    ])