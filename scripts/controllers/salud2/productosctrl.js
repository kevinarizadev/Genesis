'use strict';
angular.module('GenesisApp')
    .controller('productosctrl', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$rootScope',
        function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $rootScope) {
            //valiebles iniciales
            $scope.mostra_formulario = false;
            $scope.productos_detalles = [];
            // $scope.clasificacion_alterna = [{}];
            $scope.hovering = false; 
            $.getJSON("php/obtenersession.php").done(function (respuesta) {
                $scope.sesdata = respuesta;
                $scope.cedula=$scope.sesdata.cedula;
            })
            console.log('1');

            //formulario
            $scope.actualizar_productos = function (codigo, nombre) {
                $('.productos_de').find('input, textarea, button, select').attr('disabled', 'disabled');
                $http({
                    method: 'POST',
                    url: "php/salud/productos.php",
                    data: { 
                        function: 'detalles_productos',
                        codigo: codigo
                    }
                }).then(function (response) {
                    if (response.data) {
                        $scope.mostra_formulario = true;
                        $scope.productos = response.data[0];
                        nombre = nombre.toUpperCase();
                        $scope.NOMBRE = nombre;
                        $scope.carga_clasificacion_alterna();
                        $scope.clasifi(codigo);
                    }
                })
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
                    }
                })
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

                        $scope.clasificacion_anterior = response.data;

                    }
                })
            }
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

            $scope.selectClasificacion_alterna = function (codigo, nombre) {//Funcion para seleccionar la clasificación alterna
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
            $scope.selectClasificacion = function (codigo, nombre) {//Funcion para seleccionar la clasificación
                $scope.codTemp = codigo;
                $scope.nomTemp = nombre;
                $('#DM1' + codigo).addClass('eleacti');
                $('#DM1' + codigo).siblings().removeClass('eleacti');
                $scope.productos.CLASIFICACION_NOMBRE = $scope.nomTemp;
                $scope.productos.CLASIFICACION_NUMERO = $scope.codTemp;
                $scope.selecteditem = true;
            }
            $scope.removeSeleccion = function () {//Funcion para remover la clasificación
                $('#DM1' + $scope.codTemp).removeClass('eleacti');
                $scope.productos.CLASIFICACION_NOMBRE = "";
                $scope.productos.CLASIFICACION_NUMERO = "";
                $scope.codTemp = null; $scope.nomTemp = null; $scope.selecteditem = false;
            }
            $scope.$watch('results', function () {
                if ($scope.results != undefined) {
                    $scope.formulario.actividad = "";
                    $scope.selecteditem = false; $scope.codTemp = null; $scope.nomTemp = null;
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
                $scope.viejo = [];
                $scope.nuevo = [];
                var encontrado = false;
                var length = $scope.Clasificacion_alterna_selecionada.length;
                var length2 = $scope.clasificacion_anterior.length;
                for (var i = 0; i < length; i++) {
                    for (var j = 0; j < length2; j++) {
                        if ($scope.Clasificacion_alterna_selecionada[i].NUMERO == $scope.clasificacion_anterior[j].NUMERO) {
                            encontrado = true;
                        }
                    }
                    if (encontrado == false) {
                        $scope.nuevo.push({
                            "codigo": $scope.productos.NUMERO,
                            "clasificacion": $scope.Clasificacion_alterna_selecionada[i].NUMERO
                        });
                    }
                    encontrado = false;
                }
                var clasi = JSON.stringify($scope.nuevo);
                console.log($scope.nuevo);
                console.log(clasi);

                encontrado = false;
                for (var i = 0; i < length2; i++) {
                    for (var j = 0; j < length; j++) {
                        if ($scope.Clasificacion_alterna_selecionada[j].NUMERO == $scope.clasificacion_anterior[i].NUMERO) {
                            encontrado = true;
                        }
                    }
                    if (encontrado == false) {
                        $scope.viejo.push({
                            "codigo": $scope.productos.NUMERO,
                            "clasificacion": $scope.clasificacion_anterior[i].NUMERO
                        });
                    }
                    encontrado = false;
                }
                var clasi2 = JSON.stringify($scope.viejo);
                console.log(clasi2);
                console.log($scope.viejo);
                $scope.actualizar2();
            }

            $scope.actualizar2 = function () {
             
                if ($scope.productos.NUMERO == "" ||
                    $scope.productos.CLASIFICACION_NUMERO == "" ||
                    $scope.productos.COPAGO == "" ||
                    $scope.productos.RANGO_EDAD == "" ||
                    $scope.productos.GENERO == "" ||
                    $scope.productos.CLASE == "" ||
                    $scope.productos.ALTO_COSTO == "" ||
                    $scope.productos.POS == "" ||
                    $scope.productos.ESTADO == ""
                ) {
                    swal('Mensaje', 'Error al Actualizar datos, debe estar todos los campos llenos.', 'error')
                } else {
                    $http({
                        method: 'POST',
                        url: "php/salud/productos.php",
                        data: {
                            function: 'actualizar_productos',
                            v_pcodigo: $scope.productos.NUMERO,
                            v_pestado:$scope.productos.ESTADO,
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
                            v_presponsable: $scope.cedula,
                        }
                    }).then(function (response) {
                        if (response.data[0].Codigo != 0)  {
                            var cant_vect = $scope.Clasificacion_alterna_selecionada.length;
                            $http({
                                method: 'POST',
                                url: "php/salud/productos.php",
                                data: {
                                    function: 'actualizar_clasificacion_productos',
                                    vector: JSON.stringify($scope.Clasificacion_alterna_selecionada),
                                    cantidad:cant_vect,
                                    codigo: $scope.productos.NUMERO
                                }
                            }).then(function (response1) {
                                if (response1.data.Codigo != 1) {
                                    swal('Completado', 'Actualización exitosa', 'success')
                                    $scope.carga_listado_productos('A');
                                }else{
                                    swal('Mensaje', 'Error al Actualizar la Clasificación', 'error')
                                }  
                            })
                        }else{
                            swal('Mensaje', 'Error al Actualizar datos', 'error')
                        } 
                    })
                }
            }
            //guia interactiva
            // guia interactiva
            $scope.TourInit = { active: false, valide: false };
            $scope.guideTour = function () {
                if ($scope.TourInit.active == false) {
                    $scope.TourInit.active = true;
                    $scope.Now = 0;



                    $scope.steps = [
                        { ir: '#Editar_producto', posicion: 'bottom', flecha: false, style: '', titulo: 'Bienvenido a la guía interactiva', descripcion: 'Te daremos un breve recorrido y explicaremos cada opción para Actualizar Productos.' },
                        { ir: '#productos', posicion: 'top', flecha: true, style: 'top:5px; left:23em', titulo: 'FORMULARIO DE ACTUALIZAR PRODUCTO', descripcion: 'Paso 1: Edite los datos que desea actualizar del producto selecionado.' },
                        { ir: '#CLASIFICACION', posicion: 'bottom', flecha: true, style: 'top:409px; left:23em', titulo: 'EDITAR CLASIFICACION GENERAL', descripcion: 'Paso 2: Clic al icono de admiración para editar la clasificacion principal. Se mostrara un cuadro donde se buscara las clasificaciones segun los cuatro primeros caracter o por el codigo de la clasificacion.' },
                        { ir: '#Clasificacion_alterna_div_completo', posicion: 'left', flecha: true, style: 'top:228px; left:23em', titulo: 'CLASIFICACIÓN ALTERNA', descripcion: 'Paso 3: En esta parte esta todas las clasificiones, donde se seleccionan la clasificacion alterna.' },
                        { ir: '#filtrar_clasificacion', posicion: 'left', flecha: true, style: 'top:184px; left:26em', titulo: 'FILTRAR LA CLASIFICACION ALTERNA', descripcion: 'Paso 4: Puedes buscar la clasificacion por el codigo o parte de su descripción.' },
                        { ir: '#Clasificacion_alterna', posicion: 'left', flecha: true, style: 'top:280px; left:26em', titulo: 'TABLA DE LAS CLASIFICACIONES ALTERNAS', descripcion: 'Paso 5: En esta Tabla encontraras todas las clasificaciones dependiendo de tu filtro, Al dar clic se seleciona automaticamente' },
                        { ir: '#clasifi', posicion: 'left', flecha: true, style: 'top:147px; left:44em', titulo: 'CLASIFICACION ALTERNA SELECIONADA', descripcion: 'Paso 6: Encontraras las clasificaciones alternas que dependen del producto.' },
                        { ir: '#Clasificacion_alterna_selecionada_div1', posicion: 'left', flecha: true, style: 'top:147px; left:44em', titulo: 'TABLA DE LAS CLASIFICACIONES ALTERNAS SELECIONADAS', descripcion: 'Paso 7: En la tabla estan las clasificaciones alternas que tiene el producto o que selecionastes. Al dar clic se eliminan automaticamente' },
                        { ir: '#holi', posicion: 'left', flecha: true, style: 'top:689px; left:44em', titulo: 'CONFIRMAR SELECCION', descripcion: 'Paso 8: Despues que hayas terminado de elegir todas las clasificaciones alternas tienes que dar clic en confirmar.' },
                        { ir: '#actualizar', posicion: 'top', flecha: true, style: 'top:500px; left:23em', titulo: 'ENVIAR ACTUALIZACION', descripcion: 'Paso 9: Para enviar los datos actualizados del Productos solo tienes que dar clic en Actualizar informacion .' },
                        { ir: '#Editar_producto', posicion: 'bottom', flecha: false, style: '', titulo: 'Fin de la guía interactiva', descripcion: 'Has finalizado el recorrido ahora puedes seguir Actualizando productos.' }
                    ];


                    $scope.positionStep($scope.Now);
                    $scope.dataStep($scope.Now);
                    $("#ayuda").removeClass("icon-help").addClass("icon-cancel");
                } else {
                    $scope.TourInit.active = false;
                    $("#ayuda").removeClass("icon-cancel").addClass("icon-help");
                    $($scope.steps[$scope.Now].ir).removeClass("focusElement");
                }
            };
            $scope.nextStep = function () {
                if ($scope.Now >= 0 && $scope.Now < ($scope.steps.length - 1)) {
                    $($scope.steps[$scope.Now].ir).removeClass("focusElement");
                    $scope.Now = $scope.Now + 1;
                    if ($scope.Now != ($scope.steps.length - 1)) {
                        $($scope.steps[$scope.Now].ir).addClass("focusElement");
                    }
                    $scope.positionStep($scope.Now);
                } else {
                    $scope.guideTour();
                }
            }
            $scope.backStep = function () {
                if ($scope.Now > 0 && $scope.Now < ($scope.steps.length - 1)) {
                    $($scope.steps[$scope.Now].ir).removeClass("focusElement");
                    $scope.Now = $scope.Now - 1;
                    if ($scope.Now != 0) {
                        $($scope.steps[$scope.Now].ir).addClass("focusElement");
                    }
                    $scope.positionStep($scope.Now);
                } else if ($scope.Now > 0 && $scope.Now == ($scope.steps.length - 1)) {
                    $scope.guideTour();
                    $scope.guideTour();
                } else {
                    $scope.guideTour();
                }
            }
            $scope.dataStep = function (num) {
                $scope.tituloStep = $scope.steps[num].titulo;
                $scope.descripcionStep = $scope.steps[num].descripcion;
                if (num == 0) {
                    $scope.btnBack = "Cerrar";
                    $scope.btnNext = "Iniciar";
                } else if ($scope.steps.length == num + 1) {
                    $scope.btnBack = "Reiniciar";
                    $scope.btnNext = "Finalizar";
                } else {
                    $scope.btnBack = "Atras";
                    $scope.btnNext = "Siguiente";
                }
            };
            $scope.positionStep = function (num) {
                $scope.dataStep(num);
                setTimeout(() => {
                    var ir = $scope.steps[num].ir;
                    var posicion = $scope.steps[num].posicion;

                    var coordenadas = $(ir).position();
                    coordenadas.width = $(ir).outerWidth();
                    coordenadas.height = $(ir).outerHeight();
                    var TourCoordenadas = $("#TourStep").position();
                    TourCoordenadas.width = $("#TourStep").width();
                    TourCoordenadas.height = $("#TourStep").height();
                    var x = 0;
                    var y = 0;
                    $("#TourStep").removeAttr("style");
                    $("#TourStep").attr("style", $scope.steps[num].style);
                    switch (posicion) {
                        case "top":
                            x = (coordenadas.left);
                            y = (coordenadas.top - TourCoordenadas.height);
                            break;
                        case "right":
                            x = (coordenadas.left + coordenadas.width);
                            y = coordenadas.top;
                            break;
                        case "bottom":
                            x = (coordenadas.left);
                            y = (coordenadas.top + coordenadas.height);
                            break;
                        case "left":
                            x = (coordenadas.left - TourCoordenadas.width);
                            y = coordenadas.top;
                            break;
                        case "center":
                            x = coordenadas.left;
                            y = coordenadas.top;
                            break;
                        default:
                            x = 0;
                            y = 0;
                    }
                    $("#StepTriangle").removeAttr('class');
                    if ($scope.steps[num].flecha) {
                        $("#StepTriangle").addClass(posicion + " btnRotate");
                    }
                    setTimeout(() => {
                        window.scroll(x, (y - 30));
                    }, 600);
                });
            }
            //fin de la guia
            //atras
            $scope.atras = function () {
                $scope.mostra_formulario = false;
            }
            // tabla inicial
            $scope.filter = function (val) {
                $scope.listaRIPSTemp = $filter('filter')($scope.listaRIPS, val);
                $scope.configPages();
            }
            $scope.carga_listado_productos = function (estado) {
               
              
                $http({
                    method: 'POST',
                    url: "php/salud/productos.php",
                    data: { function: 'obtener_listados' }
                }).then(function (response) {
                    if(estado=='I'){
                        swal.close();
                    }
                    $scope.mesasayudas = response.data;
                    $scope.initPaginacion($scope.mesasayudas);

                })
            }
            $scope.inicial=function(){
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $scope.carga_listado_productos('I');
               
            }
            $scope.inicial();
            $scope.initPaginacion = function (info) {
                $scope.mesasayudasTemp = info;
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.valmaxpag = 10;
                $scope.pages = [];
                $scope.configPages();
                $scope.setPage(1);
            }
            $scope.filter = function (val) {
                $scope.mesasayudasTemp = $filter('filter')($scope.mesasayudas, val);
                $scope.configPages();
            }
            $scope.configPages = function () {
                $scope.pages.length = 0;
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize) > $scope.valmaxpag)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                        ini = Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize) - $scope.valmaxpag;
                        fin = Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize);
                    }
                }
                if (ini < 1) ini = 1;
                for (var i = ini; i <= fin; i++) {
                    $scope.pages.push({
                        no: i
                    });
                }

                if ($scope.currentPage >= $scope.pages.length)
                    $scope.currentPage = $scope.pages.length - 1;
                if ($scope.currentPage < 0) { $scope.currentPage = 0; }
            };
            $scope.setPage = function (index) {
                $scope.currentPage = index - 1;
                if ($scope.pages.length % 2 == 0) {
                    var resul = $scope.pages.length / 2;
                } else {
                    var resul = ($scope.pages.length + 1) / 2;
                }
                var i = index - resul;
                if ($scope.mesasayudasTemp.length % $scope.pageSize == 0) {
                    var tamanomax = parseInt($scope.mesasayudasTemp.length / $scope.pageSize);
                } else {
                    var tamanomax = parseInt($scope.mesasayudasTemp.length / $scope.pageSize) + 1;
                }
                // var tamanomax= $scope.mesasayudasTemp.length/$scope.pageSize;
                console.log(tamanomax);
                var fin = ($scope.pages.length + i) - 1;
                if (fin > tamanomax) {
                    fin = tamanomax;
                    i = tamanomax - 10;
                }
                if (index > resul) {
                    $scope.calcular(i, fin);
                }
                console.log($scope.mesasayudas.length / $scope.pageSize - 1);
            };
            $scope.paso = function (tipo) {
                if (tipo == 'next') {
                    var i = $scope.pages[0].no + 1;
                    if ($scope.pages.length > 9) {
                        var fin = $scope.pages[9].no + 1;
                    } else {
                        var fin = $scope.pages.length;
                    }

                    $scope.currentPage = $scope.currentPage + 1;
                    if ($scope.mesasayudasTemp.length % $scope.pageSize == 0) {
                        var tamanomax = parseInt($scope.mesasayudasTemp.length / $scope.pageSize);
                    } else {
                        var tamanomax = parseInt($scope.mesasayudasTemp.length / $scope.pageSize) + 1;
                    }
                    if (fin > tamanomax) {
                        fin = tamanomax;
                        i = tamanomax - 10;
                    }
                } else {
                    var i = $scope.pages[0].no - 1;
                    if ($scope.pages.length > 9) {
                        var fin = $scope.pages[9].no - 1;
                    } else {
                        var fin = $scope.pages.length;
                    }

                    $scope.currentPage = $scope.currentPage - 1;
                    if (i <= 1) {
                        i = 1;
                        fin = $scope.pages.length;
                    }
                }
                $scope.calcular(i, fin);
            }
            $scope.calcular = function (i, fin) {
                if (fin > 9) {
                    i = fin - 9;
                } else {
                    i = 1;
                }
                $scope.pages = [];
                for (i; i <= fin; i++) {
                    $scope.pages.push({
                        no: i
                    });
                }

            }

        }])
    .filter('inicio', function () {
        return function (input, start) {
            if (input != undefined && start != NaN) {
                start = +start;
                return input.slice(start);
            } else {
                return null;
            }
        }
    });