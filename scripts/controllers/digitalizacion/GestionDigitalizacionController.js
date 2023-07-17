'use strict';
angular.module('GenesisApp')
    .controller('GestionDigitalizacionController', ['$scope', '$rootScope', '$http', 'ngDialog', 'digitalizacionHTTP', '$filter',
        function ($scope, $rootScope, $http, ngDialog, digitalizacionHTTP, $filter) {
            $(document).ready(function () {
                $('#modalvisual').modal();
            });
            $.getJSON("php/obtenersession.php").done(function (respuesta) {
                $scope.cedula = respuesta.cedula;
                digitalizacionHTTP.listarrechazo($scope.cedula).then(function (response) {
                    $scope.listar = response;
                    $scope.cantidad = response.length;
                    $scope.initPaginacion($scope.listar);
                })
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log("Error obteniendo session variables");
            });
            $scope.MostarDatos = true;

            $scope.VerDocumento = function (ruta) {
                $http({
                    method: 'POST',
                    url: "php/juridica/tutelas/functutelas.php",
                    data: { function: 'descargaAdjunto', ruta: ruta }
                }).then(function (response) {
                    if (response.data.length == '0') {
                        swal('Error', response.data, 'error');
                    } else {
                        $('#modalvisual').modal('open');
                        $scope.MostrarArchivo = false;
                        $scope.file = ('temp/' + response.data);
                        var tipo = $scope.file.split(".");
                        tipo = tipo[tipo.length - 1];
                        if (tipo.toUpperCase() == "PDF") {
                            $scope.tipoImgPdf = false;
                        } else if (tipo.toUpperCase() == "JPG" || tipo.toUpperCase() == "JPEG" || tipo.toUpperCase() == "PNG" || tipo.toUpperCase() == "TIFF") {
                            $scope.tipoImgPdf = true;
                        } else {
                            swal('Error', response.data, 'error');
                        }
                    }
                });
            }
            //Abrir Modal Digitalizacion
            $scope.SubirDocumento = function (numero, info) {
                $scope.paquete = numero;
                $scope.tipo_documento = info.tipo_documento;
                $scope.documento = info.documento;
                $scope.TipoRes = 'GR'; //GR = Gestion Rechazo                
                ngDialog.open({
                    template: 'views/digitalizacion/modal/cargaanexo.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'DigitalizacionController',
                    scope: $scope
                })
            }
            $rootScope.$on('GestionRechazo', function (event, args) {
                if (args == '0') {
                    digitalizacionHTTP.listarrechazo($scope.cedula).then(function (response) {
                        $scope.listar = response;
                        $scope.cantidad = response.length;
                        $scope.initPaginacion($scope.listar);
                    })
                }
            });
            //Paginacion 
            $scope.initPaginacion = function (info) {
                $scope.informacion = info;
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.valmaxpag = 10;
                $scope.pages = [];
                $scope.configPages();
            }
            $scope.filter = function (val) {
                $scope.informacion = $filter('filter')($scope.listar, val);
                if ($scope.informacion.length > 0) {
                    $scope.MostarDatos = true;
                    $scope.configPages();
                } else {
                    $scope.MostarDatos = false;
                }

            }
            $scope.configPages = function () {
                $scope.pages.length = 0;
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.informacion.length / $scope.pageSize) > $scope.valmaxpag)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.informacion.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.informacion.length / $scope.pageSize) - $scope.valmaxpag) {
                        ini = Math.ceil($scope.informacion.length / $scope.pageSize) - $scope.valmaxpag;
                        fin = Math.ceil($scope.informacion.length / $scope.pageSize);
                    }
                }
                if (ini < 1) ini = 1;
                for (var i = ini; i <= fin; i++) {
                    $scope.pages.push({
                        no: i
                    });
                }

                if ($scope.currentPage >= $scope.pages.length) {
                    $scope.currentPage = $scope.pages.length - 1;
                }
                if ($scope.currentPage < 0) { $scope.currentPage = 0; }
            };
            $scope.setPage = function (index) {
                $scope.currentPage = index - 1;
                console.log($scope.informacion.length / $scope.pageSize - 1)
            };
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