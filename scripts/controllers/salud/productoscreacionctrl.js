'use strict';
angular.module('GenesisApp')
    .controller('productoscreacionctrl', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$rootScope', '$timeout',
        function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $rootScope, $timeout) {


            $(document).ready(function () {
                $('#add_subclasificacion').modal();
            });



            //valiebles iniciales
            $scope.lista_productos = [];
            $.getJSON("php/obtenersession.php").done(function (respuesta) {
                $scope.sesdata = respuesta;
                $scope.cedula = $scope.sesdata.cedula;
                $scope.rol = $scope.sesdata.rolcod;
                if ($scope.rol != 0 || $scope.rol != 93) {
                    $scope.carga_clasificacion_productos();
                }
            })
            $scope.productos = [];
            // VALIDACION DE INPUT
            $scope.validar_numero = function (NID) {
                if ($scope.CARGUE == 'C') {
                    const input = document.getElementById('' + NID + '');
                    var valor = input.value;
                    valor = valor.replace(/\./g, '');
                    valor = valor.replace(/\,/g, '');
                    valor = valor.replace(/\-/g, '');
                    valor = valor.replace(/\ /g, '');
                    if ($scope.productos.NUMERO.length > 6) {
                        valor = '';
                    }
                    input.value = valor;

                }
            }

            $scope.buscar_lista = function () {
                $http({
                    method: 'POST',
                    url: "php/salud/productos.php",
                    data: {
                        function: 'p_lista_productos',
                        codigo: $scope.codigo_bus
                    }
                }).then(function (response) {
                    console.log(response.data);
                    if (response.data.length != 0) {
                        $scope.lista_productos = response.data;
                    } else {
                        $scope.lista_productos = [];
                    }
                })
            }
            $scope.buscar_numero2 = function (id) {
                $scope.productos.NUMERO = id;
                $scope.buscar_numero();
            }
            $scope.buscar_numero = function () {

                if ($scope.productos.NUMERO) {
                    if ($scope.productos.NUMERO.length > 0) {
                        $http({
                            method: 'POST',
                            url: "php/salud/productos.php",
                            data: {
                                function: 'p_valida_producto',
                                codigo: $scope.productos.NUMERO
                            }
                        }).then(function (response) {
                            console.log(response.data);
                            if (response.data.length != 0) {
                                if (response.data[0].Codigo == 0) {
                                    $scope.productos = response.data[0];
                                    $scope.productos.EDAD_MINIMA = parseInt(response.data[0].EDAD_MINIMA);
                                    $scope.productos.EDAD_MAXIMA = parseInt(response.data[0].EDAD_MAXIMA);
                                    $scope.productos.CANT_ANO = parseInt(response.data[0].CANT_ANO);
                                    $scope.productos.CANT_MES = parseInt(response.data[0].CANT_MES);
                                    $scope.productos.CANT_MINIMA = parseInt(response.data[0].CANT_MINIMA);
                                    $scope.productos.CANT_MAXIMA = parseInt(response.data[0].CANT_MAXIMA);
                                    $scope.productos.CLASIFICACION_CODIGO = response.data[0].CLASIFICACION_NUMERO;
                                    $scope.productos.CLASIFICACION_NOMBRE = response.data[0].CLASIFICACION_NOMBRE;
                                    // $("#CLASIFICACION_S option[value="+ response.data[0].CLASIFICACION_NUMERO +"]").attr("selected",true);

                                    $scope.clasifi($scope.productos.NUMERO);
                                    setTimeout(function() {
                                        $scope.$apply();    
                                    }, 300);
                                    
                                    $scope.edicion = true;
                                }
                            } else {
                                var tempo = $scope.productos.NUMERO;
                                $scope.productos = [];
                                $scope.productos.NUMERO = tempo;
                            }
                        })

                    }
                }

            }
            $scope.clasifi = function (codigo) {
                $http({
                    method: 'POST',
                    url: "php/salud/productos.php",
                    data: {
                        function: 'carga_clasificacion_alterna_selecionada',
                        codigo: codigo
                    }
                }).then(function (response) {
                    if (response.data) {
                        $scope.Clasificacion_alterna_selecionada = response.data;
                        $scope.clasificacion_anterior = response.data;

                    }
                })
            }

            // $scope.clasificacion_alterna = [{}];
            $scope.hovering = false;


            $scope.Clasificacion_alterna_selecionada = [];
            $scope.clasificacion_anterior = [];

            //clasificacion
            $scope.modal_clasificacion = function () {

                $scope.dialogNewAfil = ngDialog.open({
                    template: 'views/salud/modal/clasificacion_productos.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope
                });
            }
            $scope.carga_clasificacion_productos = function (cod) {
                var codigo = cod;
                if ($scope.CARGUE == 'P') {
                    alert("paquete");
                    $http({
                        method: 'POST',
                        url: "php/salud/productos.php",
                        data: {
                            function: 'carga_clasificacion_alterna_selecionada',
                            codigo: codigo
                        }
                    }).then(function (response) {
                        if (response.data[0].Codigo == 0) {
                            $scope.vacio = true;

                        } else {
                            $scope.clasificaciones = response.data;

                        }

                    })

                } else {
                    $http({
                        method: 'POST',
                        url: "php/salud/productos.php",
                        data: {
                            function: 'obtener_clasificacion',
                            codigo: codigo
                        }
                    }).then(function (response) {
                        if (response.data[0].Codigo == 0) {
                            $scope.vacio = true;

                        } else {
                            $scope.clasificaciones = response.data;

                        }
                    })
                }

            }

            $scope.carga_clasificacion_alterna = function () {
                $http({
                    method: 'POST',
                    url: "php/salud/productos.php",
                    data: {
                        function: 'obtener_clasificacion_alterna',
                    }
                }).then(function (response) {
                    if (response.data[0].Codigo == 0) {
                        $scope.vacio = true;
                    } else {
                        $scope.clasificacion_alterna = response.data;
                        $scope.aparecerTabla();
                    }
                })
            }
            $scope.carga_clasificacion_alterna();
            $scope.selectClasificacion_alterna = function (codigo, nombre) { //Funcion para seleccionar la clasificación alterna
                $scope.codTemp = codigo;
                $scope.nomTemp = nombre;
                $('#CP' + codigo).addClass('eleacti');
                $('#CP' + codigo).siblings().removeClass('eleacti');
                $scope.selecteditem = true;
                $scope.Clasificacion_alterna_selecionada.push({ NUMERO: $scope.codTemp, NOMBRE: $scope.nomTemp });
                $scope.aparecerTabla();
            }
            $scope.remove_selectClasificacion_alterna = function (x) {
                $scope.Clasificacion_alterna_selecionada.splice(x, 1);
                $scope.aparecerTabla();
            }
            $scope.aparecerTabla = function () {
                var length = $scope.clasificacion_alterna.length;
                var length2 = $scope.Clasificacion_alterna_selecionada.length;
                for (var i = 0; i < length; i++) {
                    for (var j = 0; j < length2; j++) {
                        if ($scope.clasificacion_alterna[i].NUMERO == $scope.Clasificacion_alterna_selecionada[j].NUMERO) {
                            $scope.clasificacion_alterna[i].APARECER = 1;
                            j = length2;
                        } else {
                            $scope.clasificacion_alterna[i].APARECER = 0;
                        }
                    }
                }
            }
            $scope.confirmar = function () {
                $('#actualizar').removeAttr('disabled', 'disabled');
            }
            $scope.selectClasificacion = function (codigo, nombre) { //Funcion para seleccionar la clasificación
                $scope.codTemp = codigo;
                $scope.nomTemp = nombre;
                $('#DM1' + codigo).addClass('eleacti');
                $('#DM1' + codigo).siblings().removeClass('eleacti');
                $scope.productos.CLASIFICACION_NOMBRE = $scope.nomTemp;
                $scope.productos.CLASIFICACION_NUMERO = $scope.codTemp;
                $scope.selecteditem = true;
            }
            $scope.removeSeleccion = function () { //Funcion para remover la clasificación
                $('#DM1' + $scope.codTemp).removeClass('eleacti');
                $scope.productos.CLASIFICACION_NOMBRE = "";
                $scope.productos.CLASIFICACION_NUMERO = "";
                $scope.codTemp = null;
                $scope.nomTemp = null;
                $scope.selecteditem = false;
            }
            $scope.$watch('results', function () {
                if ($scope.results != undefined) {
                    $scope.formulario.actividad = "";
                    $scope.selecteditem = false;
                    $scope.codTemp = null;
                    $scope.nomTemp = null;
                    $scope.stylesrowsearch = { 'margin-bottom': $scope.results.length == 0 ? '120px' : '70px' };
                } else {
                    $scope.selecteditem = false;
                }
            });
            $scope.aparecer = true;
            $scope.validarkeyword = function (keyword) {
                var key = keyword + "";
                if (key.length <= 2) {
                    $scope.aparecer = true;
                    $scope.clasificaciones = [];
                } else {
                    $scope.aparecer = false;
                    $scope.carga_clasificacion_productos(key);
                }
            }
            //FIN


            $scope.actualizar = function () {
                $scope.validar_si_exite = true;

                if ($scope.validar_si_exite == true) {
                    $scope.viejo = [];
                    $scope.nuevo = [];
                    var encontrado = false;
                    var length = $scope.Clasificacion_alterna_selecionada.length;
                    var length2 = $scope.clasificacion_anterior.length;
                    for (var i = 0; i < length; i++) {
                        for (var j = 0; j < length2; j++) {

                        }
                        if (encontrado == false) {
                            $scope.nuevo.push({
                                "NUMERO": $scope.productos.NUMERO,
                                "CLASIFICACION": $scope.Clasificacion_alterna_selecionada[i].NUMERO
                            });
                        }
                        encontrado = false;
                    }
                    var clasi = JSON.stringify($scope.nuevo);
                    console.log($scope.nuevo);
                    console.log(clasi);

                    if ($scope.productos.Codigo == 0) {
                        $scope.actualizar3();
                    } else {
                        $scope.actualizar2();
                    }
                }


            }

            $scope.actualizar3 = function () {
                $scope.productos.CLASIFICACION_NUMERO = ($scope.rol == 0 || $scope.rol == 93) ? $scope.productos.CLASIFICACION_NUMERO : $scope.productos.CLASIFICACION_CODIGO;
                swal({
                    title: 'Confirmar',
                    text: '¿Desea Guardar el Producto?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Guardar'
                }).then((result) => {
                    if (result) {
                        if ($scope.productos.NUMERO === "" || $scope.productos.NUMERO === undefined ||
                            $scope.productos.CLASIFICACION_NUMERO === "" || $scope.productos.CLASIFICACION_NUMERO === undefined ||
                            $scope.productos.GENERO === "" || $scope.productos.GENERO === undefined ||
                            $scope.productos.EDAD_MINIMA > $scope.productos.EDAD_MAXIMA ||
                            $scope.productos.EDAD_MAXIMA === "" || $scope.productos.EDAD_MAXIMA === undefined ||
                            $scope.productos.CANT_ANO === "" || $scope.productos.CANT_ANO === undefined ||
                            $scope.productos.CANT_MES > $scope.productos.CANT_ANO ||
                            $scope.productos.CANT_MES === "" || $scope.productos.CANT_MES === undefined ||
                            $scope.productos.CANT_MINIMA === "" || $scope.productos.CANT_MINIMA === undefined ||
                            $scope.productos.CANT_MINIMA > $scope.productos.CANT_MAXIMA ||
                            $scope.productos.CANT_MAXIMA === "" || $scope.productos.CANT_MAXIMA === undefined ||
                            $scope.productos.NOMBRE === "" || $scope.productos.NOMBRE === undefined ||
                            $scope.productos.ESTADO === "" || $scope.productos.ESTADO === undefined
                        ) {
                            swal('Mensaje', 'Error al llenar los datos, Favor verificar que todos lo campos esten llenos y con el formato correcto.', 'error')
                        } else {
                            $http({
                                method: 'POST',
                                url: "php/salud/productos.php",
                                data: {
                                    function: 'P_UI_PRODUCTO',
                                    v_pcodigo: $scope.productos.NUMERO,
                                    v_pestado: $scope.productos.ESTADO,
                                    v_pclasificacion: $scope.productos.CLASIFICACION_NUMERO,
                                    v_pcopago: $scope.productos.COPAGO,
                                    v_pnivel: $scope.productos.NIVEL,
                                    v_pedad_inicial: $scope.productos.EDAD_MINIMA,
                                    v_pedad_final: $scope.productos.EDAD_MAXIMA,
                                    v_psexo: $scope.productos.GENERO,
                                    v_pclase: $scope.productos.CLASE,
                                    v_palto_costo: $scope.productos.ALTO_COSTO,
                                    v_ptipo: $scope.productos.TIPO_PROD,
                                    v_ppos: $scope.productos.POS,
                                    v_pcantidad_anno: $scope.productos.CANT_ANO,
                                    v_pcantidad_mes: $scope.productos.CANT_MES,
                                    v_precobro: $scope.productos.RECOBRO,
                                    v_pcant_minima: $scope.productos.CANT_MINIMA,
                                    v_pcant_maxima: $scope.productos.CANT_MAXIMA,
                                    v_nombre: $scope.productos.NOMBRE,
                                    v_presponsable: $scope.cedula,
                                }
                            }).then(function (response) {
                                if (response.data[0].Codigo != 0) {
                                    var cant_vect = $scope.Clasificacion_alterna_selecionada.length;
                                    $http({
                                        method: 'POST',
                                        url: "php/salud/productos.php",
                                        data: {
                                            function: 'actualizar_clasificacion_productos',
                                            vector: JSON.stringify($scope.Clasificacion_alterna_selecionada),
                                            cantidad: cant_vect,
                                            codigo: $scope.productos.NUMERO
                                        }
                                    }).then(function (response1) {
                                        if (response1.data.Codigo != 1) {
                                            swal('Completado', 'Actualización exitosa', 'success')
                                            $scope.limpiar();

                                        } else {
                                            swal('Mensaje', 'Error al Actualizar la Clasificación', 'error')
                                        }
                                    })
                                } else {
                                    swal('Mensaje', response.data[0].Mensaje, 'error')
                                }
                            })
                        }
                    }
                })
            }


            $scope.actualizar2 = function () {
                $scope.validar_si_exite = true;
                $http({
                    method: 'POST',
                    url: "php/salud/productos.php",
                    data: {
                        function: 'p_valida_producto1',
                        codigo: $scope.productos.NUMERO
                    }
                }).then(function (response) {
                    console.log(response.data);
                    if (response.data[0].Codigo == 0) {
                        $scope.validar_si_exite = false;
                        swal('Mensaje', response.data[0].Mensaje, 'error')
                    }
                    if ($scope.validar_si_exite == true) {
                        $scope.productos.CLASIFICACION_NUMERO = ($scope.rol == 0 || $scope.rol == 93) ? $scope.productos.CLASIFICACION_NUMERO : $scope.productos.CLASIFICACION_CODIGO;
                        swal({
                            title: 'Confirmar',
                            text: '¿Desea Guardar el Producto?',
                            type: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Guardar'
                        }).then((result) => {
                            if (result) {
                                if ($scope.productos.NUMERO === "" || $scope.productos.NUMERO === undefined ||
                                    $scope.productos.CLASIFICACION_NUMERO === "" || $scope.productos.CLASIFICACION_NUMERO === undefined ||
                                    $scope.productos.COPAGO === "" || $scope.productos.COPAGO === undefined ||
                                    $scope.productos.GENERO === "" || $scope.productos.GENERO === undefined ||
                                    $scope.productos.CLASE === "" || $scope.productos.CLASE === undefined ||
                                    $scope.productos.ALTO_COSTO === "" || $scope.productos.ALTO_COSTO === undefined ||
                                    $scope.productos.NIVEL === "" || $scope.productos.NIVEL === undefined ||
                                    $scope.productos.EDAD_MINIMA === "" || $scope.productos.EDAD_MINIMA === undefined ||
                                    $scope.productos.EDAD_MINIMA > $scope.productos.EDAD_MAXIMA ||
                                    $scope.productos.EDAD_MAXIMA === "" || $scope.productos.EDAD_MAXIMA === undefined ||
                                    $scope.productos.TIPO_PROD === "" || $scope.productos.TIPO_PROD === undefined ||
                                    $scope.productos.CANT_ANO === "" || $scope.productos.CANT_ANO === undefined ||
                                    $scope.productos.CANT_MES > $scope.productos.CANT_ANO ||
                                    $scope.productos.CANT_MES === "" || $scope.productos.CANT_MES === undefined ||
                                    $scope.productos.RECOBRO === "" || $scope.productos.RECOBRO === undefined ||
                                    $scope.productos.CANT_MINIMA === "" || $scope.productos.CANT_MINIMA === undefined ||
                                    $scope.productos.CANT_MINIMA > $scope.productos.CANT_MAXIMA ||
                                    $scope.productos.CANT_MAXIMA === "" || $scope.productos.CANT_MAXIMA === undefined ||
                                    $scope.productos.NOMBRE === "" || $scope.productos.NOMBRE === undefined ||
                                    $scope.productos.ESTADO === "" || $scope.productos.ESTADO === undefined
                                ) {
                                    swal('Mensaje', 'Error al llenar los datos, Favor verificar que todos lo campos esten llenos y con el formato correcto.', 'error')
                                } else {
                                    $http({
                                        method: 'POST',
                                        url: "php/salud/productos.php",
                                        data: {
                                            function: 'creacion_productos',
                                            v_pcodigo: $scope.productos.NUMERO,
                                            v_pestado: $scope.productos.ESTADO,
                                            v_pclasificacion: $scope.productos.CLASIFICACION_NUMERO,
                                            v_pcopago: $scope.productos.COPAGO,
                                            v_pnivel: $scope.productos.NIVEL,
                                            v_pedad_inicial: $scope.productos.EDAD_MINIMA,
                                            v_pedad_final: $scope.productos.EDAD_MAXIMA,
                                            v_psexo: $scope.productos.GENERO,
                                            v_pclase: $scope.productos.CLASE,
                                            v_palto_costo: $scope.productos.ALTO_COSTO,
                                            v_ptipo: $scope.productos.TIPO_PROD,
                                            v_ppos: $scope.productos.POS,
                                            v_pcantidad_anno: $scope.productos.CANT_ANO,
                                            v_pcantidad_mes: $scope.productos.CANT_MES,
                                            v_precobro: $scope.productos.RECOBRO,
                                            v_pcant_minima: $scope.productos.CANT_MINIMA,
                                            v_pcant_maxima: $scope.productos.CANT_MAXIMA,
                                            v_nombre: $scope.productos.NOMBRE,
                                            v_presponsable: $scope.cedula,
                                        }
                                    }).then(function (response) {
                                        if (response.data[0].Codigo != 0) {
                                            var cant_vect = $scope.Clasificacion_alterna_selecionada.length;
                                            $http({
                                                method: 'POST',
                                                url: "php/salud/productos.php",
                                                data: {
                                                    function: 'actualizar_clasificacion_productos',
                                                    vector: JSON.stringify($scope.Clasificacion_alterna_selecionada),
                                                    cantidad: cant_vect,
                                                    codigo: $scope.productos.NUMERO
                                                }
                                            }).then(function (response1) {
                                                if (response1.data.Codigo != 1) {
                                                    swal('Completado', 'Actualización exitosa', 'success')
                                                    $scope.limpiar();

                                                } else {
                                                    swal('Mensaje', 'Error al Actualizar la Clasificación', 'error')
                                                }
                                            })
                                        } else {
                                            swal('Mensaje', response.data[0].Mensaje, 'error')
                                        }
                                    })
                                }
                            }
                        })

                    }
                })
            }


            $scope.limpiar = function () {
                $scope.Clasificacion_alterna_selecionada = [];
                $scope.clasificacion_anterior = [];
                $scope.productos.NUMERO = "";
                $scope.productos.CLASIFICACION_NUMERO = "";
                $scope.productos.CLASIFICACION_NOMBRE = "";
                $scope.productos.COPAGO = "";
                $scope.productos.GENERO = "";
                $scope.productos.CLASE = "";
                $scope.productos.ALTO_COSTO = "";
                $scope.productos.POS = "";
                $scope.productos.NIVEL = "";
                $scope.productos.EDAD_MINIMA = "";
                $scope.productos.EDAD_MAXIMA = "";
                $scope.productos.TIPO_PROD = "";
                $scope.productos.CANT_ANO = "";
                $scope.productos.CANT_MES = "";
                $scope.productos.RECOBRO = "";
                $scope.productos.CANT_MINIMA = "";
                $scope.productos.CANT_MAXIMA = "";
                $scope.productos.NOMBRE = "";
                $scope.productos.ESTADO = "";
                $scope.productos.Codigo = 1;

            }




            $scope.tempsupclasificacion = [];
            $scope.itemTemp = '';
            $scope.add_subclasificacion = function (param, item) {
                console.log(item);
                if (param == 'OPEN') {
                    $scope.itemTemp = item;
                    $scope.getSubclasificaciones();
                    $('#add_subclasificacion').modal("open");
                }
                if (param == 'CLOSE') {
                    $('#add_subclasificacion').modal("close");
                }

            }


            $scope.getSubclasificaciones = function () {
                $http({
                    method: 'POST',
                    url: "php/salud/productos.php",
                    data: {
                        function: 'P_MOSTRAR_HIJOS_EPRO',
                        codigo: $scope.itemTemp
                    }
                }).then(function (response) {
                    $scope.tempsupclasificacion = response.data;
                })
            }


            $scope.edit = 'N';
            $scope.tempindex = -1;
            $scope.accion_subclasificacion = function (param, vitem, tindex) {

                if (param == 'G') {
                    if ($scope.subclasificacion) {
                        $scope.postInsertaProducto($scope.itemTemp, $scope.subclasificacion);
                        $scope.subclasificacion = '';

                    } else {
                        swal('Mensaje', 'Error No puede crear una subclasificacion vacia', 'error')
                    }
                }

                if (param == 'E') {
                    $scope.edit = 'S';
                    $scope.tempindex = vitem.NUMERO_H;
                    $scope.subclasificacion = vitem.NOMBRE_H;
                }

                if (param == 'S') {
                    $scope.postActualizarProducto($scope.itemTemp, $scope.tempindex, $scope.subclasificacion);
                    $scope.tempindex = -1;
                    $scope.edit = 'N';
                    $scope.subclasificacion = '';
                }
                if (param == 'D') {
                    swal({
                        title: 'Confirmar',
                        text: '¿Desea ELIMINAR la SUBCLASIFICACIÓN?',
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        if (result) {
                            $timeout(function () {
                                $scope.postEliminarProducto($scope.itemTemp, vitem.NUMERO_H);
                            }, 100);

                        }
                    })

                }

            }

            $scope.postInsertaProducto = function (vcups, vnom) {
                $http({
                    method: 'POST',
                    url: "php/salud/productos.php",
                    data: {
                        function: 'P_INSERTA_HIJOS_EPRO',
                        codigo: vcups,
                        nombre: vnom
                    }
                }).then(function (response) {
                    if (response.data.Codigo == '0') {                        
                        swal('Mensaje', response.data.Mensaje, 'success');
                        $scope.getSubclasificaciones();
                    }

                    if (response.data.Codigo == '1') {
                        swal('Mensaje', response.Mensaje, 'error');
                    }


                })

            }
            $scope.postActualizarProducto = function (vcups, num, vnom) {
                $http({
                    method: 'POST',
                    url: "php/salud/productos.php",
                    data: {
                        function: 'P_ACTUALIZA_HIJOS_EPRO',
                        codigo: vcups,
                        numero: num,
                        nombre: vnom
                    }
                }).then(function (response) {
                    if (response.data.Codigo == '0') {                      
                        swal('Mensaje', response.data.Mensaje, 'success');
                        $scope.getSubclasificaciones();
                    }

                    if (response.data.Codigo == '1') {
                        swal('Mensaje', response.data.Mensaje, 'error');
                    }
                })

            }

            $scope.postEliminarProducto = function (vcups, num) {
                $http({
                    method: 'POST',
                    url: "php/salud/productos.php",
                    data: {
                        function: 'P_ELIMINA_HIJOS_EPRO',
                        codigo: vcups,
                        numero: num
                    }
                }).then(function (response) {
                    if (response.data.Codigo == '0') {                      
                        swal('Mensaje', response.data.Mensaje, 'success');
                        $scope.getSubclasificaciones();
                    }

                    if (response.data.Codigo == '1') {
                        swal('Mensaje', response.data.Mensaje, 'error');
                    }
                })

            }

            $scope.FormatTexto = function (NID) {
                const input = document.getElementById('' + NID + '');
                var valor = input.value;
                valor = valor.replace(/[|!¡¿?°"#%${}*&''`´¨<>=:]/g, '');
                valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
                valor = valor.replace(/[\t\n]+/g,' ');
                input.value = valor.toString().toUpperCase();
            }
            $scope.Validar_Permisos = function () {
            $scope.Rol_Cedula = sessionStorage.getItem('cedula');
                $http({ method: 'POST', url: "php/salud/productos.php", data: { function: 'Obt_Permisos', Cedula: $scope.Rol_Cedula } }).then(function (response) {
                    if (response.data[0].ESTADO != undefined) {
                        $scope.Rol_Permiso = response.data[0].ESTADO;
                    } else {
                        $scope.Rol_Permiso = 'N';
                    }
                });
            }
            $scope.Validar_Permisos();

        }


    ])