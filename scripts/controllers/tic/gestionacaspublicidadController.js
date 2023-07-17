'use strict';
angular.module('GenesisApp')
    .controller('gestionacaspublicidadController', ['$scope', '$http', 'ngDialog', '$filter',
        function ($scope, $http, ngDialog, $filter) {
            $scope.panel = { activo: 1, titulo: "", ttemp: "" };
            $scope.acaspordepts = [];
            $scope.listacas = [];
            $scope.gestion = function () {
                var cedula = $scope.mostrar_acas_cedula;
                var estado = $scope.mostrar_acas_estado;
                var nombre = $scope.mostrar_acas_nombre;
                var texto = $scope.mostrar_acas_texto;
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
                    url: "php/tic/controlacas/Racaspublicidad.php",
                    data: { function: 'obtenerAcasXPersona', cedula: cedula, estado: estado }
                }).then(function (response) {
                    $scope.panel.activo = 2;
                    $scope.listacas = response.data;
                    $scope.panel.titulo = "(" + $scope.listacas.length + ") Servicios " + texto + " de " + nombre;
                    $scope.cloneHeadFixed();
                    setTimeout(() => {
                        swal.close();
                    }, 300);
                });

            }
            $scope.getDptoPublicidad = function () {
                $scope.panel.activo = 1;
                // $scope.panel.titulo = "Equipo de publicidad " + titulo + " (Abiertos: " + activos + " - Cerrados: " + procesados + ")";
                $scope.panel.titulo = "Equipo de publicidad ";
                $scope.panel.ttemp = $scope.panel.titulo;
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
                    url: "php/tic/controlacas/Racaspublicidad.php",
                    data: { function: 'obtenerDptoPublicidad' }
                }).then(function (response) {
                    swal.close();
                    $scope.temp = response.data;
                    $scope.totalOpenDpt = 0;
                    $scope.totalCloseDpt = 0;
                    response.data.forEach(e => {
                        $scope.totalOpenDpt += parseInt(e.activos);
                        $scope.totalCloseDpt += parseInt(e.procesado);
                    });
                    $scope.listdeptstic = response.data;
                    setTimeout(() => {
                      $scope.$apply();
                    }, 500);
                    $scope.temp = [];
                    swal.close();
                })
            }
            $scope.getDptoPublicidad();
            $scope.obtenerAcasXPersona = function (cedula, estado, nombre, texto) {
                $scope.mostrar_acas_cedula = cedula;
                $scope.mostrar_acas_estado = estado;
                $scope.mostrar_acas_nombre = nombre;
                $scope.mostrar_acas_texto = texto;
                $scope.currentPage = 0;
                $scope.filtrar = "";

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
                    url: "php/tic/controlacas/Racaspublicidad.php",
                    data: { function: 'obtenerAcasXPersona', cedula: cedula, estado: estado }
                }).then(function (response) {
                    $scope.panel.activo = 2;
                    $scope.listacas = response.data;
                    $scope.panel.titulo = "(" + $scope.listacas.length + ") Servicios " + texto + " de " + nombre;
                    $scope.cloneHeadFixed();
                    setTimeout(() => {
                        swal.close();
                    }, 300);
                })
            }
            $scope.verdescripcion = function (desc, ticket, ubicacion) {
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
            $scope.buscarAcas = function (opcion) {
                $scope.panel.activo = 2;
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
                    url: "php/tic/controlacas/Racaspublicidad.php",
                    data: { function: 'obtenerAcas', keyword: opcion }
                }).then(function (response) {
                    $scope.listacas = response.data;
                    $scope.panel.titulo = "(" + $scope.listacas.length + ") Resultados de la busqueda de: " + opcion;
                    swal.close();
                })
            }
            $scope.cloneHeadFixed = function () {
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
            $(".scroll_x").on("scroll", function () {
                $(".scroll_x").scrollLeft($(this).scrollLeft());
            });
            $(window).resize(function () {
                $scope.cloneHeadFixed();
            });
            $scope.changePanel = function () {
                if ($scope.panel.activo == 2) {
                    $scope.panel.activo = 1;
                }
            }
            $scope.colors = function (value) {
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
            $scope.getData = function () {
                return $filter('filter')($scope.listacas, $scope.filtrar);
            }
            $scope.numberOfPages = function () {
                return Math.ceil($scope.getData().length / $scope.pageSize);
            }
            $scope.$watch('filtrar', function (newValue, oldValue) {
                if (oldValue != newValue) {
                    $scope.currentPage = 0;
                }
            }, true);
            $scope.btns_paginacion = function (value) {
                $scope.currentPage = value;
                $scope.cloneHeadFixed();
                //window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    ]).filter('startFrom', function () {
        return function (input, start) {
            if (input != undefined) {
                start = +start;
                return input.slice(start);
            }
        }
    });