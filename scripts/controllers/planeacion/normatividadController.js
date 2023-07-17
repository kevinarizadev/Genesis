'use strict';
angular.module('GenesisApp')
    .controller('normatividadController', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$rootScope',
        function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $rootScope) {
            $scope.numero = 0;
            $scope.anio = "";
            $scope.tipo = "";
            $scope.entidad = "";
            $scope.titulo = "";
            $scope.archivo = "";
            $scope.descripcion = "";
            $scope.fileName = '';
            $scope.nombreadjunto = "";
            $scope.count=0;

            $http({
                method: 'POST',
                url: "php/planeacion/normatividad.php",
                data: {
                    function: 'colocar_ano',
                }
            }).then(function (response) {
                $scope.lista_anio = response.data;
            });

            $http({
                method: 'POST',
                url: "php/planeacion/normatividad.php",
                data: {
                    function: 'colocar_tipo',
                }
            }).then(function (response) {
                $scope.lista_tipo = response.data;
            });

            $http({
                method: 'POST',
                url: "php/planeacion/normatividad.php",
                data: {
                    function: 'colocar_entidad',
                }
            }).then(function (response) {
                $scope.lista_entidad = response.data;
            });


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
                        $scope.gestionar();
                        break;
                    default:
                }
            }
            $scope.isSet = function (tabNum) {
                return $scope.tab === tabNum;
            }
            $scope.setTab(1);

            $scope.actualizar_funcion = function (NUMERO, ANIO, COD_NORMA, COD_ENTIDAD, TITULO, DESCRIPCION) {
                $scope.actualizar_campo = true;
                $scope.setTab(1);
                $scope.numero = NUMERO;
                $scope.anio = ANIO;
                $scope.tipo = COD_NORMA;
                $scope.entidad = COD_ENTIDAD;
                $scope.titulo = TITULO;
                $scope.descripcion = DESCRIPCION;
                $scope.nombreadjunto = "";
                
                function letsWaitALittle() {
                    document.ready = document.getElementById("anio").value = ANIO;
                    document.ready = document.getElementById("tipo").value = COD_NORMA;
                    document.ready = document.getElementById("entidad").value = COD_ENTIDAD;
                } setTimeout(letsWaitALittle, 0);
            }

            $scope.despublicar = function (accion,numero,estado) {
                $scope.accion = accion;
                $scope.numero = numero;
                $scope.anio = "";
                $scope.tipo = "";
                $scope.entidad = "";
                $scope.titulo = "";
                $scope.descripcion = "";
                $scope.estado = estado;
                var ruta_k=""
                swal({
                    title: 'Confirmar',
                    text: '¿Desea cambiar de estado esta Normativa de el sitio web de Cajacopi?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Actualizar'
                }).then((result) => {
                    if (result) {
                        $http({
                            method: 'POST',
                            url: "php/planeacion/normatividad.php",
                            data: {
                                function: 'publicar',
                                anio: $scope.anio,
                                tipo: $scope.tipo,
                                entidad: $scope.entidad,
                                titulo: $scope.titulo,
                                ruta: ruta_k,
                                descripcion: $scope.descripcion,
                                numero: $scope.numero,
                                accion: $scope.accion,
                                estado: $scope.estado
                            }
                        }).then(function (response) {
                            if (response.data.Codigo == 0) {
                                swal('Completado', response.data.Nombre, 'success');
                                $scope.limpiar();
                                $scope.gestionar();
                            } else {
                                swal('Información', response.data.Nombre, 'error');
                            }
                        });
                    }
                })
            }

            $scope.limpiar = function () {
                $scope.numero = 0;
                $scope.anio = "";
                $scope.tipo = "";
                $scope.entidad = "";
                $scope.titulo = "";
                $scope.archivo = "";
                $scope.descripcion = "";
                $scope.fileName = '';
                $scope.nombreadjunto = "";
                $scope.actualizar_campo = false;
                document.ready = document.getElementById("anio").value = "";
                document.ready = document.getElementById("tipo").value = "";
                document.ready = document.getElementById("entidad").value = "";
                // $("#adjunto")[0].files[0].val()="";
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

            $scope.descargafile = function (ruta) {
                $http({
                    method: 'POST',
                    url: "php/planeacion/normatividad.php",
                    data: {
                        function: 'descargaAdjunto',
                        ruta: ruta
                    }
                }).then(function (response) {
                    //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
                    window.open("temp/" + response.data);
                });
            }


            $scope.subir_adjunto = function (accion) {
                // var nombre_tipo=$('#tipo').find(option[$('#tipo').val()].text());
                // combo.options[combo.selectedIndex].text
                $scope.accion = accion;
                var combo = document.getElementById("tipo");
                var nombre_tipo = combo.options[combo.selectedIndex].text;
                if ($scope.archivobase != null && $scope.anio != '' && $scope.tipo != '' && $scope.descripcion != '' && $scope.titulo != '' && $scope.entidad != ''){
                    $http({
                        method: 'POST',
                        url: "php/planeacion/normatividad.php",
                        data: {
                            function: 'subir_adjunto',
                            achivobase: $scope.archivobase,
                            ext: $scope.extensionarchivo,
                            tipo: nombre_tipo
                        }
                    }).then(function (response) {
                        console.log(response.data);
                        $scope.publicar(response.data);
                    });
                } else {
                    swal('Informacion!', 'Todos los campos deben estar lleno para publicar la Novedadad', 'warning');
                }

            }

            $scope.publicar = function (ruta) {
                var ruta_k = ruta;
                $http({
                    method: 'POST',
                    url: "php/planeacion/normatividad.php",
                    data: {
                        function: 'publicar',
                        anio: $scope.anio,
                        tipo: $scope.tipo,
                        titulo: $scope.titulo,
                        entidad: $scope.entidad,
                        ruta: ruta_k,
                        descripcion: $scope.descripcion,
                        numero: $scope.numero,
                        accion: $scope.accion,
                        estado: $scope.estado
                    }
                }).then(function (response) {
                    if (response.data.Codigo == 0) {
                        swal('Completado', response.data.Nombre, 'success');
                        $scope.limpiar();
                    } else {
                        swal('Información', response.data.Nombre, 'error');
                    }

                });
            }

            // $scope.handleKeyPress = function(e) {
            //     if ($scope.descripcion == null || $scope.descripcion == undefined || $scope.descripcion==''){$scope.count=0;}
            //     if ($scope.descripcion.length < $scope.count){
            //         $scope.count = $scope.descripcion.length
            //     }else ($scope.descripcion.length > $scope.count){
            //         $scope.count = $scope.descripcion.length
            //     }
            //     if (e.keyCode == 8){
            //         if ($scope.count==0){
            //             $scope.count =0;
            //         }else{
            //             $scope.count = $scope.count -1;
            //         }
            //     }else{
            //         $scope.count = $scope.count +1;
            //     } 
            // };

            // tabla inicial
            $scope.filter = function (val) {
                $scope.listaRIPSTemp = $filter('filter')($scope.listaRIPS, val);
                $scope.configPages();
            }
            $scope.gestionar = function () {
                $http({
                    //           method: 'GET',
                    //   url: "json/ejemplo_s.json"
                    method: 'POST',
                    url: "php/planeacion/normatividad.php",
                    data: { function: 'obtener_listados' }
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





