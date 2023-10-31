'use strict';
angular.module('GenesisApp')
    .controller('verCompromisoController', ['$scope', '$rootScope', '$http', '$filter', '$window', 'ngDialog', function ($scope, $rootScope, $http, $filter, $window, ngDialog) {

        var usuario = JSON.parse(sessionStorage.getItem('inicio_perfil')).nombre;
        var usuario_creacion = sessionStorage.getItem('usuario');

        $scope.actualizar = false;
        $scope.actualizarCompromiso = {
            estado: null,
            descripcion: null,
            idCompromiso: null,
            usuario: usuario,
            nombreArchivo: null,
            rutaArchivo: null,
            extensionArchivo: null,
            tieneArchivo: null,
            soporte: null
        };
        $scope.comite;

        $scope.estados = [
            {
                id: 'EN PROGRESO',
                estado: 'EN PROGRESO'
            },
            {
                id: 'COMPLETADA',
                estado: 'COMPLETADA'
            }
        ]

        $scope.listaComites = function () {
            swal({
                title: 'Cargando información...',
                allowEscapeKey: false,
                allowOutsideClick: false
            });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/planeacion/superadmin.php",
                data: {
                    function: 'obtenerComites'
                }
            }).then(function (response) {
                swal.close();
                if (response.data.length) {
                    $scope.comites = response.data;
                } else {
                    $scope.comites = [];
                }
            });
        }
        $scope.listaComites();

        $scope.listaCompromisos = function (idComite) {
            swal({
                title: 'Cargando información...',
                allowEscapeKey: false,
                allowOutsideClick: false
            });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/planeacion/altagerencia.php",
                data: {
                    function: 'obtenerCompromisosComite',
                    comite: Number(idComite)
                }
            }).then(function (response) {
                swal.close();
                if (response.data.length) {
                    $scope.compromisos = response.data;
                    $scope.paginacion(response.data);
                } else {
                    $scope.compromisos = [];
                }
            });
        }

        $scope.descargarArchivo = function (idCompromiso) {
            swal({
                title: 'Cargando información...',
                allowEscapeKey: false,
                allowOutsideClick: false
            });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/planeacion/altagerencia.php",
                data: {
                    function: 'obtenerArchivosCompromisos',
                    idCompromiso: Number(idCompromiso)
                }
            }).then(function (response) {
                swal.close();
                if (response.data.length) {
                    for (let i = 0; i < response.data.length; i++) {
                        $http({
                            method: 'POST',
                            url: "php/planeacion/altagerencia.php",
                            data: {
                                function: 'descargaAdjunto',
                                ruta: response.data[i].Ruta + response.data[i].Nombre
                            }
                        }).then(function (response) {
                            window.open("temp/" + response.data + "?page=hsn#toolbar=0");
                        });
                    }
                } else {
                    swal('No se encontró archivo relacionado a este compromiso.', '', 'error').catch(swal.noop);
                }
            });
        }
        // $scope.listaCompromisos();

        $scope.paginacion = function (data) {
            console.log(data);
            $scope.currentPage = 0;
            $scope.pageSize = 10;
            $scope.q = "";
            $scope.getData = function () {
                // if ($scope.medicamentos.orden != "") {
                //   return $filter('filter')($filter('orderBy')($scope.historial.listado, 'RADICADO'), $scope.q);
                // } else {
                return $filter('filter')(data, $scope.q);
                // }
            }
            $scope.numberOfPages = function () {
                return Math.ceil($scope.getData().length / $scope.pageSize);
            }
            $scope.$watch('q', function (newValue, oldValue) {
                if (oldValue != newValue) {
                    $scope.currentPage = 0;
                }
            }, true);
            $scope.btns_paginacion = function (value) {
                $scope.currentPage = value;
                // window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
     

        $scope.verDetalleCompromiso = function (compromiso) {
            $scope.actualizar = true;
            $scope.compromiso = compromiso.Descripcion;
            $scope.actualizarCompromiso.idCompromiso = Number(compromiso.Id);
        }

        $scope.obtenerBase = function () {
            if ($("#soporte")[0].files[0]) {
                if ($("#soporte")[0].files[0].size > 5242880) {
                    //swal('Advertencia','El archivo excede el peso limite (7 MB)','warning')
                    swal('Advertencia', 'El archivo excede el peso limite (5 MB)', 'warning')
                    $scope.actualizarCompromiso.rutaArchivo = null;
                    $scope.actualizarCompromiso.soporte = null;
                    $scope.actualizarCompromiso.nombreArchivo = null;
                    $scope.actualizarCompromiso.extensionArchivo = null;
                    $scope.actualizarCompromiso.tieneArchivo = 0;
                } else {
                    if ($("#soporte")[0].files && $("#soporte")[0].files[0]) {
                        var FR = new FileReader();
                        FR.addEventListener("load", function (e) {
                            $scope.actualizarCompromiso.rutaArchivo = '/cargue_ftp/Digitalizacion/Genesis/Planeacion/altagerencia/';
                            $scope.actualizarCompromiso.soporte = e.target.result;
                            $scope.actualizarCompromiso.nombreArchivo = $("#soporte")[0].files[0].name;
                            $scope.actualizarCompromiso.extensionArchivo = $scope.actualizarCompromiso.nombreArchivo.split('.').pop();
                            $scope.actualizarCompromiso.tieneArchivo = 1;
                        });
                        FR.readAsDataURL($("#soporte")[0].files[0]);
                    }
                }
            } else {
                swal('Advertencia', 'No ha selecionado ningun Archivo', 'warning')
                $("#soporte" + ind)[0].value = "";
                $scope.actualizarCompromiso.rutaArchivo = null;
                $scope.actualizarCompromiso.soporte = null;
                $scope.actualizarCompromiso.nombreArchivo = null;
                $scope.actualizarCompromiso.extensionArchivo = null;
                $scope.actualizarCompromiso.tieneArchivo = 0;
            }
        }

        $scope.actualizarItem = function () {
            $scope.actualizarCompromiso.soporte = $scope.actualizarCompromiso.soporte != null ? $scope.actualizarCompromiso.soporte : 'N/A';
            $scope.actualizarCompromiso.nombreArchivo = $scope.actualizarCompromiso.nombreArchivo != null ? $scope.actualizarCompromiso.nombreArchivo : 'N/A';
            $scope.actualizarCompromiso.rutaArchivo = $scope.actualizarCompromiso.rutaArchivo != null ? $scope.actualizarCompromiso.rutaArchivo : 'N/A';
            $scope.actualizarCompromiso.extensionArchivo = $scope.actualizarCompromiso.extensionArchivo != null ? $scope.actualizarCompromiso.extensionArchivo : 'N/A';
            $scope.actualizarCompromiso.tieneArchivo = $scope.actualizarCompromiso.tieneArchivo != null ? $scope.actualizarCompromiso.tieneArchivo : 0;

            if (!$scope.validateFiels($scope.actualizarCompromiso)) {
                swal('No pueden existir campos vacíos.', '', 'error').catch(swal.noop);
                return;
            }

            swal({
                title: 'Cargando información...',
                allowEscapeKey: false,
                allowOutsideClick: false
            });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/planeacion/altagerencia.php",
                data: {
                    function: 'actualizarCompromiso',
                    ...$scope.actualizarCompromiso
                }
            }).then(function (response) {
                console.log(response.data);
                if (response.data[0].Codigo === 0) {
                    $http({
                        method: 'POST',
                        url: "php/planeacion/altagerencia.php",
                        data: {
                            function: 'guardarAdjuntosSoportes',
                            soporte: $scope.actualizarCompromiso.soporte,
                            formatoArchivo: $scope.actualizarCompromiso.extensionArchivo,
                            rutaArchivo: $scope.actualizarCompromiso.rutaArchivo,
                            nombreArchivo: $scope.actualizarCompromiso.nombreArchivo,
                            tieneArchivo: $scope.actualizarCompromiso.tieneArchivo
                        }
                    }).then(function (response) {
                        const codigoAdjunto = response.data.codigoId;
                        $http({
                            method: 'POST',
                            url: "php/planeacion/altagerencia.php",
                            data: {
                                function: 'guardarRelCompromisoAdjuntos',
                                idCompromiso: $scope.actualizarCompromiso.idCompromiso,
                                adjuntos: [codigoAdjunto].toString(),
                                usuario: usuario_creacion
                            }
                        }).then(function (response) {
                            if (response.data.codigo === 0) {
                                $scope.clearFields($scope.actualizarCompromiso);
                                $scope.actualizar = false;
                                $scope.listaCompromisos();
                                ngDialog.closeAll();
                            } else {
                                swal('Error guardando la información', '', 'error').catch(swal.noop);
                            }
                        });
                    });
                } else {
                    swal('Error guardando la información', '', 'error').catch(swal.noop);
                }
            });
        }

        // Validar campos
        $scope.validateFiels = function (obj) {
            let objProp = Object.values(obj).every(value => {
                if (value === null || value === undefined || value === false) {
                    return false;
                }
                return true;
            });
            return objProp;
        }

        // limpiar campos
        $scope.clearFields = function (obj) {
            Object.keys(obj).forEach(function (index) {
                obj[index] = null;
            });
        }

    }]);