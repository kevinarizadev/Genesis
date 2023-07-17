'use strict';
angular.module('GenesisApp')
    .controller('tarifacategoriaController', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$rootScope',
        function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $rootScope) {

            $(document).ready(function () {
                $('#modal1').modal();
            })
            // abrir_modal1=function()

            $scope.hover_busqueda = false;
            //RELLENO DE BUSQUEDA CAMBIAR PROCEDIMIENTO POR LOS DEPARTAMENTO QUE TENGAS CONTRATO VIGENTE
            //CARGAR DEPARTAMENTO
            $http({
                method: 'POST',
                url: "php/funclistas.php",
                data: { function: 'cargaDepartamentos' }
            }).then(function (response) {
                $scope.json_departamentos = response.data;
            });
            //CARGAR MUNICIPIO
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


            $scope.vlaor = function () {
                alert($scope.paso);
            }

            $scope.limite = function (nombre) {
                if (nombre.length<60) {
                    return nombre;
                } else {
                    return nombre.substring(0, 60) + "...  ";
                }
            }
         




            //VARIABLES INICIALES
            $scope.busqueda = {
                numero: null,
                estado: "",
                regimen: "",
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

            $scope.buscar_listado_select_tarifa = function () {
                $http({
                    method: 'POST',
                    url: "php/contratacion/tarifacategoria.php",
                    data: {
                        function: 'p_lista_tarifa',
                        codigo: $scope.gestion.TARIFA,
                        producto: $scope.contrato_cabeza.producto
                    }
                }).then(function (response) {
                    if (response.data.length == 0) {
                        $scope.json_tarifa = [];
                    } else {
                        if (response.data.length == 1) {
                            $scope.json_tarifa = response.data;
                            $scope.seleccion_opcion_tarifa(0);
                        } else {
                            $scope.json_tarifa = response.data;
                            console.log($scope.json_tarifa);
                        }

                    }
                });
            }

            $scope.seleccion_opcion_tarifa = function (x) {
                $scope.gestion.TARIFA_ID = $scope.json_tarifa[x].CODIGO;
                $scope.gestion.TARIFA = $scope.json_tarifa[x].NOMBRE;
                $scope.gestion.TARIFA_VALOR = parseFloat($scope.json_tarifa[x].VALOR2);
                $scope.json_tarifa = [];
                $scope.tarifa_calcular();
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
                            title: 'Cargando...',
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



            // PASO 2 TAB
            $scope.gestionar_contrato = function (ind) {
                $scope.contrado_selecionado = true;
                console.log($scope.json_contratos[ind]);
                $scope.contrato_cabeza = $scope.json_contratos[ind];
              
                $scope.buscar_clasificacion();

            }


            $scope.cambiar_paso = function () {
                $scope.paso = $scope.paso + 1
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
                    $scope.cambiar_paso();
                });
            }
            $scope.gestionar_clasificacion = function (numero, nombre) {
                $scope.contrato_cabeza.clasificacion_nombre = nombre;
                $scope.contrato_cabeza.clasificacion = numero;
                swal({
                    title: 'Cargando...',
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/tarifacategoria.php",
                    data: {
                        function: 'P_OBTENER_PRODUCTOS_SERVICIOS_CONTRATO',
                        codigo: $scope.contrato_cabeza.numero,
                        v_pubicacion: $scope.contrato_cabeza.ubicacion,
                        v_pdocumento: $scope.contrato_cabeza.documento_id,
                        v_pservicio: $scope.contrato_cabeza.clasificacion
                    }
                }).then(function (response) {
                    swal.close();
                    console.log($scope.json_productos);
                    $scope.json_productos = response.data;
                    $scope.cambiar_paso()
                });
            }

            $scope.gestionar_productos = function (numero, nombre) {
                $scope.contrato_cabeza.producto_nombre = nombre;
                $scope.contrato_cabeza.producto = numero;
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
                    $scope.cambiar_paso()
                });
            }
            $scope.gestion = [];
            $scope.abrir_modal1 = function (x) {
                $scope.contrato_cabeza.renglon =x.renglon;
                $scope.contrato_cabeza.subcategoria =x.codigo_alterno;
                $scope.contrato_cabeza.subcategoria_nombre =x.nombre_alterno;
                $scope.gestion.TARIFA =x.nomtarifa;
                $scope.gestion.DESCUENTO =x.operador;
                $scope.gestion.VALOR =x.valor;
                $scope.buscar_listado_select_tarifa();
                function letsWaitALittle() {
                   
                    $("#modal1").modal("open");
                }
                setTimeout(letsWaitALittle, 0);
               
            }

            $scope.guardar = function () {
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
                        v_pcodtarifa: $scope.gestion.TARIFA_ID,
                        v_psuma: $scope.gestion.DESCUENTO,
                        v_pporcentaje: $scope.gestion.P_DESCUENTO,
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
                            $scope.paso = $scope.paso - 1;
                            $scope.gestionar_productos($scope.contrato_cabeza.producto, $scope.contrato_cabeza.producto_nombre);
                        })
                      
                    } else {
                        swal('Información',  response.data.Nombre, 'info'); 
                    }
                   
                });
            }


            $scope.formato = function (NID) {
                const input = document.getElementById('' + NID + '');
                var valor = input.value;
                valor = valor.replace(/\-/g, '');
                valor = valor.replace(/[a-zA-Z]/g, '');
                valor = valor.replace(/[^0-9-,]/g, '');
                valor = valor.replace(/\./g, '');
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
                var val = input.value
                $scope.gestion.VALOR = (val.replace(/\./g, '')).replace(/\./g, ',');
                $scope.gestion.VALOR = parseFloat($scope.gestion.VALOR);
            }

            $scope.tarifa_calcular = function () {
                if ($scope.switch_view) {
                    var calcular = 0;
                    if (
                        $scope.gestion.TARIFA_VALOR != 0 && $scope.gestion.DESCUENTO != '' &&
                        $scope.gestion.P_DESCUENTO != undefined
                    ) {
                        calcular = (parseFloat($scope.gestion.TARIFA_VALOR) * parseFloat($scope.gestion.P_DESCUENTO)) / 100;

                        if ($scope.gestion.DESCUENTO == 'S') {
                            calcular = calcular + parseFloat($scope.gestion.TARIFA_VALOR);
                        } else {
                            calcular = parseFloat($scope.gestion.TARIFA_VALOR) - calcular;
                        }
                        $scope.gestion.VALOR = calcular | 0;

                    }
                } else {
                    var calcular = 0;
                    $scope.cadena = '';
                    if (
                        $scope.gestion.TARIFA_VALOR != 0 && $scope.gestion.VALOR != '' &&
                        $scope.gestion.VALOR != undefined
                    ) {
                        if ($scope.gestion.TARIFA_VALOR < $scope.gestion.VALOR) {
                            $scope.gestion.DESCUENTO = 'S';
                            calcular = (parseFloat($scope.gestion.VALOR) - parseFloat($scope.gestion.TARIFA_VALOR)) * 100;
                            $scope.cadena = $scope.gestion.TARIFA_VALOR + "<" + $scope.gestion.VALOR + "=";
                            $scope.cadena = $scope.cadena + " ( " + $scope.gestion.VALOR + " - " + $scope.gestion.TARIFA_VALOR + ")";

                        } else {
                            $scope.gestion.DESCUENTO = 'R'
                            calcular = (parseFloat($scope.gestion.TARIFA_VALOR) - parseFloat($scope.gestion.VALOR)) * 100;
                            $scope.cadena = $scope.gestion.TARIFA_VALOR + ">" + $scope.gestion.VALOR + "=";
                            $scope.cadena = $scope.cadena + " ( " + $scope.gestion.TARIFA_VALOR + " - " + $scope.gestion.VALOR + ")";
                        }
                        calcular = calcular / parseFloat($scope.gestion.TARIFA_VALOR);
                        $scope.gestion.P_DESCUENTO = calcular | 0;
                        $scope.cadena = $scope.cadena + " / " + parseFloat($scope.gestion.TARIFA_VALOR);
                    }
                 
                }

            }

        }
    ])