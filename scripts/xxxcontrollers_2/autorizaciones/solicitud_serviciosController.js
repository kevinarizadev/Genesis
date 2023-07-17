'use strict';
angular.module('GenesisApp')
    .controller('solicitud_serviciosController', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$rootScope',
        function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $rootScope) {
            $(document).ready(function () {
                $('#modal1').modal();
            });

            $scope.seccional = '0';
            $scope.prestador = '0';
            $scope.regimen = '0';
            $scope.contrato = '0';
            $scope.producto = '0';
            $scope.producto_nombre = '';
            $scope.clasificacion = '0';
            $scope.clasificacion_nombre = '';
            $scope.valor = 0;
            $scope.descripcion = '';
            $scope.fileName = '';
            $scope.nombreadjunto = "";
            $scope.prestador_nombre = '';

            $scope.setTab = function (newTab) {
                $scope.tab = newTab;
                $(".tabI").removeClass("tabactiva");
                $(".tabII").removeClass("tabactiva");
                switch (newTab) {
                    case 1:
                        $(".tabI").addClass("tabactiva");
                        break;
                    case 2:
                        $(".tabII").addClass("tabactiva");
                        $scope.cargar_datos();
                      
                        break;
                    default:
                }
            }
            $scope.isSet = function (tabNum) {
                return $scope.tab === tabNum;
            }
            $scope.setTab(1);


            $http({
                method: 'POST',
                url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                data: {
                    function: 'obtenerSeccionales',
                }
            }).then(function (response) {
                $scope.lista_seccional = response.data;
            });

            // $http({
            //     method: 'POST',
            //     url: "php/autorizaciones/contratacion/solicitud_servicios.php",
            //     data: {
            //         function: 'obtenerIps',
            //     }
            // }).then(function (response) {
            //     $scope.lista_prestador = response.data;
            // });
            $scope.abrir_comentario = function(numero,nombre_producto,nombre_clasificacion,observacion,ips,contrato){
                $scope.comentario={
                    numero:numero,
                    nombre_producto:nombre_producto,
                    clasificacion:nombre_clasificacion,
                    observacion:observacion,
                    ips:ips,
                    contrato:contrato
                }
                $scope.dialogNewAfil = ngDialog.open({
                    template: 'views/autorizaciones/comentario.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope
                    });
            }
            $scope.Buscar_regimen = function () {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                    data: {
                        function: 'obtenerRegimen',
                        ips: $scope.prestador
                    }
                }).then(function (response) {
                    $scope.lista_regimen = response.data;
                });
            }
            $scope.Buscar_contrato = function () {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                    data: {
                        function: 'obtenerContrato',
                        ips: $scope.prestador,
                        regimen: $scope.regimen
                    }
                }).then(function (response) {
                    $scope.lista_contrato = response.data;
                });
            }
            $scope.Buscar_productos = function () {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                    data: {
                        function: 'obtenerProductos',
                        ips: $scope.prestador
                    }
                }).then(function (response) {
                    $scope.lista_regimen = response.data;
                });
            }
            $scope.Buscar_clasificacion = function () {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                    data: {
                        function: 'obtenerClasificacion',
                        ips: $scope.prestador
                    }
                }).then(function (response) {
                    $scope.lista_regimen = response.data;
                });
            }
            $scope.obtenerBase = function () {
                if ($("#adjunto")[0].files[0].size > 62914560) {
                    swal('Advertencia', 'El archivo excede el peso limite (7 MB)', 'warning')
                    // notification.getNotification('warning','El archivo excede el peso limite (7 MB)','Notificación');
                    $("#adjunto")[0].value = "";
                    $scope.archivobase = "";
                    $scope.extensionarchivo = "";
                } else {
                    if ($("#adjunto")[0].files && $("#adjunto")[0].files[0]) {
                        var FR = new FileReader();
                        FR.addEventListener("load", function (e) {
                            $scope.adjunto = $("#adjunto")[0].value;
                            $scope.archivobase = e.target.result;
                            var name = $("#adjunto")[0].files[0].name;
                            $scope.extensionarchivo = name.split('.').pop();
                        });
                        FR.readAsDataURL($("#adjunto")[0].files[0]);
                    }
                }
            }
            $scope.mostrar_modal_detalle=function(numero,producto, clasificiacion, observacion){
                $('#modal1').modal('open');
                $scope.numero_modal=numero;
                $scope.modal_producto=producto;
                $scope.modal_clasificacion=clasificiacion;
                $scope.modal_observacion=observacion;
            }
            $scope.modal_filtrar = function (tipo) {
                $scope.tipo = tipo;
                if (tipo == 'P') {
                    $scope.nombre_tipo = "Selecciona el Producto"
                } else if (tipo == 'I') {
                    $scope.nombre_tipo = "Selecciona el Prestador"
                } else {
                    $scope.nombre_tipo = "Selecciona la Clasificación"
                }
                $scope.dialogNewAfil = ngDialog.open({
                    template: 'views/autorizaciones/modal_filtrar.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope
                });
            }
            $scope.removeSeleccion = function () {

                if ($scope.tipo == 'C') {
                    $('#DM' + $scope.diagnostico1).removeClass('eleacti');
                    $scope.clasificacion = "0";
                    $scope.clasificacion_nombre = "";
                } else if ($scope.tipo == 'I') {
                    $('#DM' + $scope.diagnostico3).removeClass('eleacti');
                    $scope.prestador = "0";
                    $scope.prestador_nombre = "";
                }else {
                    $('#DM' + $scope.diagnostico2).removeClass('eleacti');
                    $scope.producto = "0";
                    $scope.producto_nombre = "";
                }
            }
            $scope.elegir = function (codigo, nombre) {
                $("#DM" + codigo).addClass('eleacti');
                $('#DM' + codigo).siblings().removeClass('eleacti');
                // $scope.hovering=true;
                if ($scope.tipo == 'C') {
                    $scope.clasificacion = codigo;
                    $scope.clasificacion_nombre = nombre;
                } else if ($scope.tipo == 'I') {
                    $scope.prestador = codigo;
                    $scope.prestador_nombre = nombre;
                }else {
                    $scope.producto = codigo;
                    $scope.producto_nombre = nombre;
                }
            }
            $scope.cargarListados = function (texto) {
                $scope.coincidencia1 = texto
                if ($scope.tipo == 'C') {
                    if (($scope.coincidencia1 != "" && $scope.coincidencia1.length >= 3)) {
                        $http({
                            method: 'POST',
                            url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                            data: {
                                function: 'obtenerClasificacion',
                                codigo: $scope.coincidencia1
                            }
                        }).then(function (response) {
                            if (response.data == "-1") {
                                $scope.ListarResultado = "";
                            } else {
                                $scope.ListarResultado = response.data;
                            }
                        });
                    }
                } else if ($scope.tipo == 'I') {
                    if (($scope.coincidencia1 != "" && $scope.coincidencia1.length >= 3)) {
                        $http({
                            method: 'POST',
                            url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                            data: {
                                function: 'obtenerIps',
                                codigo: $scope.coincidencia1
                            }
                        }).then(function (response) {
                            if (response.data == "-1") {
                                $scope.ListarResultado = "";
                            } else {
                                $scope.ListarResultado = response.data;
                            }
                        });
                    }
                } else {
                    if (($scope.coincidencia1 != "" && $scope.coincidencia1.length >= 3)) {
                        $http({
                            method: 'POST',
                            url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                            data: {
                                function: 'obtenerProducto',
                                codigo: $scope.coincidencia1
                            }
                        }).then(function (response) {
                            if (response.data == "-1") {
                                $scope.ListarResultado = "";
                            } else {
                                $scope.ListarResultado = response.data;
                            }
                        });
                    }
                }
            }
            $scope.limpiar = function () {
                $scope.seccional = '0';
                $scope.prestador = '0';
                $scope.regimen = '0';
                $scope.contrato = '0';
                $scope.producto = '0';
                $scope.producto_nombre = '';
                $scope.prestador_nombre = '';
                $scope.clasificacion = '0';
                $scope.clasificacion_nombre = '';
                $scope.valor = 0;
                $scope.descripcion = '';
                $scope.fileName = '';
                $scope.nombreadjunto = "";

                // $("#adjunto")[0].files[0].val()="";
            }
            $scope.descargafile = function (ruta) {
                $http({
                    method: 'POST',
                    url: "php/juridica/tutelas/functutelas.php",
                    data: {
                        function: 'descargaAdjunto',
                        ruta: ruta
                    }
                }).then(function (response) {
                    //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
                    window.open("temp/" + response.data);
                });
            }
            $scope.subir_adjunto = function () {
                // var nombre_tipo=$('#tipo').find(option[$('#tipo').val()].text());
                // combo.options[combo.selectedIndex].text

                if ($scope.archivobase != null) {
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                        data: {
                            function: 'subir_adjunto',
                            achivobase: $scope.archivobase,
                            ext: $scope.extensionarchivo
                        }
                    }).then(function (response) {
                        console.log(response.data);
                        $scope.envar_datos(response.data);
                    });
                } else {
                    $scope.envar_datos("");
                }

            }
            $scope.envar_datos = function (ruta) {
                if( $scope.seccional != '0' &&
                $scope.prestador != '0' &&
                $scope.regimen != '0' &&
                $scope.contrato != '0' &&
                $scope.producto != '0' &&
                $scope.clasificacion != '0' &&
                $scope.descripcion != '' ){
                    var ruta_k = ruta;
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                        data: {
                            function: 'enviarDatos',
                            seccional: $scope.seccional,
                            prestador: $scope.prestador,
                            regimen: $scope.regimen,
                            ruta: ruta_k,
                            contrato: $scope.contrato,
                            producto: $scope.producto,
                            clasificacion: $scope.clasificacion,
                            valor: $scope.valor,
                            descripcion: $scope.descripcion
                        }
                    }).then(function (response) {
                        if (response.data.Codigo == 0) {
                            swal('Completado', response.data.Nombre, 'success');
                            $scope.limpiar();
                        } else {
                            swal('Información', response.data.Nombre, 'error');
                        }
                    });
                }else{
                    swal('Informacion!', 'Todos los campos deben estar lleno para solicitar el servicio', 'warning');

                }
                
              
            }
            // tabla inicial
            $scope.filter = function (val) {
                $scope.listaRIPSTemp = $filter('filter')($scope.listaRIPS, val);
                $scope.configPages();
            }
            $scope.cargar_datos = function () {
                $http({
                    //           method: 'GET',
                    //   url: "json/ejemplo_s.json"
                    method: 'POST',
                    url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                    data: { function: 'listar',codigo:'' }
                }).then(function (response) {
                    $scope.mesasayudas = response.data;
                    $scope.initPaginacion($scope.mesasayudas);

                })
            }
            $scope.initPaginacion = function (info) {
                $scope.mesasayudasTemp = info;
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.valmaxpag = 10;
                $scope.pages = [];
                $scope.configPages();
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





