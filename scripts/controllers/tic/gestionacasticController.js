'use strict';
angular.module('GenesisApp')
    .controller('gestionacasticController', ['$scope', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window', '$filter',
        function($scope, $http, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window, $filter) {
            $scope.panel = { activo: 1, titulo: "", ttemp: "" };
            $scope.acaspordepts = [];
            $scope.listacas = [];
            $scope.gestion = function() {
                if ($scope.mostrar_acas_ips == false) {
                    var cedula= $scope.mostrar_acas_cedula;
var estado= $scope.mostrar_acas_estado;
var nombre= $scope.mostrar_acas_nombre;
var texto= $scope.mostrar_acas_texto;
                    swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                });
                $http({
                    method: 'POST',
                    url: "php/tic/controlacas/Racas.php",
                    data: { function: 'obtenerAcasXPersona', cedula: cedula, estado: estado }
                }).then(function(response) {
                    $scope.panel.activo = 3;
                    $scope.listacas = response.data;
                    $scope.panel.titulo = "(" + $scope.listacas.length + ") Servicios " + texto + " de " + nombre;
                    $scope.cloneHeadFixed();
                    setTimeout(() => {
                        swal.close();
                    }, 300);
                }) 
                } else {
                    swal({
                        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                        width: 200,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        animation: false
                    });
                    $http({
                        method: 'POST',
                        url: "php/tic/consolidados/consolidado.php",
                        data: {
                            function: 'obtener_consolidado_AcasDetalle',
                            tipo: 2,
                            motivo: 0,
                            asunto: 0,
                            cedula: $scope.mostrar_acas_cedula
                        }
                    }).then(function(response) {
                        console.log(response.data);
                         $scope.panel.activo = 3;
                        $scope.listacas = [];
                        for (var i = 0; i < response.data.length; i++) {
                            if ($scope.mostrar_acas_estado == 'A' && response.data[i].estado == 'ACTIVO') {
                                $scope.listacas.push({
                                    NOMBRE: response.data[i].nit,
                                    NUMERO: response.data[i].numero,
                                    ASUNTO: response.data[i].motivo,
                                    NOMBRE_AUTORIZA: $scope.mostrar_acas_nombre,
                                    FECHA_INGRESO: response.data[i].fecha,
                                    FECHA_CIERRE: response.data[i].fecha_cierre,
                                    DIAS: response.data[i].dias,
                                    CIUDAD: response.data[i].ciudad,
                                    DESCRIPCION: response.data[i].observacion,
                                    UBICACION: response.data[i].cod_ubicacion,
                                    CARGO: 'FUNCIONARIO DE LA IPS ' + response.data[i].nit
                                });
                            } else if ($scope.mostrar_acas_estado == 'P' && response.data[i].estado == 'PROCESADO') {
                                $scope.listacas.push({
                                    NOMBRE: response.data[i].nit,
                                    NUMERO: response.data[i].numero,
                                    ASUNTO: response.data[i].motivo,
                                    NOMBRE_AUTORIZA: $scope.mostrar_acas_nombre,
                                    FECHA_INGRESO: response.data[i].fecha,
                                    FECHA_CIERRE: response.data[i].fecha_cierre,
                                    DIAS: response.data[i].dias,
                                    CIUDAD: response.data[i].ciudad,
                                    DESCRIPCION: response.data[i].observacion,
                                    UBICACION: response.data[i].cod_ubicacion,
                                    CARGO: 'FUNCIONARIO DE LA IPS ' + response.data[i].nit
                                });
                            }
                        }
                        $scope.panel.titulo = "(" + $scope.listacas.length + ") Servicios " + $scope.mostrar_acas_texto + " de " + $scope.mostrar_acas_nombre;
                        $scope.cloneHeadFixed();

                        swal.close();

                        console.log($scope.listacas);
                    })
                }

            }
            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
            });
            $http({
                method: 'POST',
                url: "php/tic/controlacas/Racas.php",
                data: { function: 'obtenerDptoTic' }
            }).then(function(response) {

                $scope.acaspordepts = response.data;
                $scope.totalOpen = 0;
                $scope.totalClose = 0;
                for (const i in $scope.acaspordepts) {
                    if ($scope.acaspordepts.hasOwnProperty(i)) {
                        $scope.totalOpen += $scope.acaspordepts[i].activo;
                        $scope.totalClose += $scope.acaspordepts[i].Procesado;
                    }
                }
                swal.close();

            })
            $scope.getDptoTIC = function(tipo, activos, procesados, titulo) {
                $scope.panel.activo = 2;
                $scope.panel.titulo = "Equipo de " + titulo + " (Abiertos: " + activos + " - Cerrados: " + procesados + ")";
                $scope.panel.ttemp = $scope.panel.titulo;
                $scope.panel_ips_activo=tipo=="ipstic"?true:false;
                swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                });
                $http({
                    method: 'POST',
                    url: "php/tic/controlacas/Racas.php",
                    data: { function: 'obteneracastic', tipo: tipo }
                }).then(function(response) {
                    $scope.temp = response.data;
                    $scope.totalOpenDpt = activos;
                    $scope.totalCloseDpt = procesados;
                    /* for (const i in $scope.temp.acas) {
                      if ($scope.temp.acas.hasOwnProperty(i)) {
                        if ($scope.temp.acas[tipo]) {
                          $scope.listdeptstic = $scope.temp.acas[tipo];
                        }
                      }
                    } */
                    $scope.listdeptstic = $scope.temp;
                    $scope.temp = [];
                    swal.close();
                })
            }
            $scope.obtenerAcasXPersona = function(cedula, estado, nombre, texto) {
                $scope.mostrar_acas_ips = false;
                $scope.mostrar_acas_cedula = cedula;
                $scope.mostrar_acas_estado = estado;
                $scope.mostrar_acas_nombre = nombre;
                $scope.mostrar_acas_texto = texto;
                $scope.currentPage = 0;
                $scope.filtrar = "";
               
                   if($scope.panel_ips_activo==true){
                       $scope.mostrar_acas_ips = true;
                      swal({
                        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                        width: 200,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        animation: false
                    });
                    $http({
                        method: 'POST',
                        url: "php/tic/consolidados/consolidado.php",
                        data: {
                            function: 'obtener_consolidado_AcasDetalle',
                            tipo: 2,
                            motivo: 0,
                            asunto: 0,
                            cedula: $scope.mostrar_acas_cedula
                        }
                    }).then(function(response) {
                        console.log(response.data);
                         $scope.panel.activo = 3;
                        $scope.listacas = [];
                        for (var i = 0; i < response.data.length; i++) {
                            if ($scope.mostrar_acas_estado == 'A' && response.data[i].estado == 'ACTIVO') {
                                $scope.listacas.push({
                                    NOMBRE: response.data[i].nit,
                                    NUMERO: response.data[i].numero,
                                    ASUNTO: response.data[i].motivo,
                                    NOMBRE_AUTORIZA: $scope.mostrar_acas_nombre,
                                    FECHA_INGRESO: response.data[i].fecha,
                                    FECHA_CIERRE: response.data[i].fecha_cierre,
                                    DIAS: response.data[i].dias,
                                    CIUDAD: response.data[i].ciudad,
                                    DESCRIPCION: response.data[i].observacion,
                                    UBICACION: response.data[i].cod_ubicacion,
                                    CARGO: 'FUNCIONARIO DE LA IPS ' + response.data[i].nit
                                });
                            } else if ($scope.mostrar_acas_estado == 'P' && response.data[i].estado == 'PROCESADO') {
                                $scope.listacas.push({
                                    NOMBRE: response.data[i].nit,
                                    NUMERO: response.data[i].numero,
                                    ASUNTO: response.data[i].motivo,
                                    NOMBRE_AUTORIZA: $scope.mostrar_acas_nombre,
                                    FECHA_INGRESO: response.data[i].fecha,
                                    FECHA_CIERRE: response.data[i].fecha_cierre,
                                    DIAS: response.data[i].dias,
                                    CIUDAD: response.data[i].ciudad,
                                    DESCRIPCION: response.data[i].observacion,
                                    UBICACION: response.data[i].cod_ubicacion,
                                    CARGO: 'FUNCIONARIO DE LA IPS ' + response.data[i].nit
                                });
                            }
                        }
                        $scope.panel.titulo = "(" + $scope.listacas.length + ") Servicios " + $scope.mostrar_acas_texto + " de " + $scope.mostrar_acas_nombre;
                        $scope.cloneHeadFixed();

                        swal.close();
                          })
                  }else{
                      swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                });
                $http({
                    method: 'POST',
                    url: "php/tic/controlacas/Racas.php",
                    data: { function: 'obtenerAcasXPersona', cedula: cedula, estado: estado }
                }).then(function(response) {
                    $scope.panel.activo = 3;
                    $scope.listacas = response.data;
                    $scope.panel.titulo = "(" + $scope.listacas.length + ") Servicios " + texto + " de " + nombre;
                    $scope.cloneHeadFixed();
                    setTimeout(() => {
                        swal.close();
                    }, 300);
                })        
                  }
            }
            $scope.verdescripcion = function(desc, ticket, ubicacion) {
                $scope.desc = desc;
                $scope.ticket = ticket;
                $scope.ubicacion = ubicacion;
                ngDialog.open({
                    template: 'views/tic/modal/ModalDetalles.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'gestionacasticModalController',
                    scope: $scope
                });
            }
            $scope.buscarAcas = function(opcion) {
                $scope.panel.activo = 3;
                swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                });
                $http({
                    method: 'POST',
                    url: "php/tic/controlacas/Racas.php",
                    data: { function: 'obtenerAcas', keyword: opcion }
                }).then(function(response) {
                    $scope.listacas = response.data;
                    $scope.panel.titulo = "(" + $scope.listacas.length + ") Resultados de la busqueda de: " + opcion;
                    swal.close();
                })
            }
            $scope.cloneHeadFixed = function() {
                setTimeout(() => {
                    var original = $('#tablaByCN>thead');
                    var clone = $('#tablaByCN>thead').clone();
                    var list = original[0].children[0].children;
                    for (var i = 0; i < list.length; i++) {
                        clone[0].children[0].children[i].style.width = list[i].offsetWidth + "px";
                    }
                    $('#tablaClone').html(clone).css("width", original[0].parentElement.offsetWidth + "px");;
                }, 500);
            }
            $(".scroll_x").on("scroll", function() {
                $(".scroll_x").scrollLeft($(this).scrollLeft());
            });
            $(window).resize(function() {
                $scope.cloneHeadFixed();
            });
            $scope.changePanel = function() {
                if ($scope.panel.activo == 2) {
                    $scope.panel.activo = 1;
                } else if ($scope.panel.activo == 3) {
                    $scope.panel.activo = 2;
                    $scope.panel.titulo = $scope.panel.ttemp;
                }
            }
            $scope.colors = function(value) {
                if ($scope.panel.activo == 1) {
                    return { height: Math.round(value * 100 / $scope.totalOpen) + '%' }
                } else if ($scope.panel.activo == 2 || $scope.panel.activo == 3) {
                    return { height: Math.round(value * 100 / $scope.totalOpenDpt) + '%' }
                }
            }




            // Paginacion
            $scope.currentPage = 0;
            $scope.pageSize = 50;
            $scope.filtrar = "";
            $scope.getData = function() {
                return $filter('filter')($scope.listacas, $scope.filtrar);
            }
            $scope.numberOfPages = function() {
                return Math.ceil($scope.getData().length / $scope.pageSize);
            }
            $scope.$watch('filtrar', function(newValue, oldValue) {
                if (oldValue != newValue) {
                    $scope.currentPage = 0;
                }
            }, true);
            $scope.btns_paginacion = function(value) {
                $scope.currentPage = value;
                $scope.cloneHeadFixed();
                //window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    ]).filter('startFrom', function() {
        return function(input, start) {
            if (input != undefined) {
                start = +start;
                return input.slice(start);
            }
        }
    });