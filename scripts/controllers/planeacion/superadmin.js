'use strict';
angular.module('GenesisApp')
    .controller('SuperAdminController', ['$scope', '$rootScope', '$http', '$filter', '$window', function ($scope, $rootScope, $http, $filter, $window) {

        var usuario = JSON.parse(sessionStorage.getItem('inicio_perfil')).nombre;
        var usuario_creacion = sessionStorage.getItem('usuario');
        $scope.usuario_creacion = sessionStorage.getItem('usuario');
        $scope.comites = [];
        $scope.listadoAsignaciones = [];
        $scope.idAsignaciones = [];
        $scope.resultadoBuscar = [];
        $scope.crear = false;
        $scope.detalle = false;
        $scope.labelAsigancion = '';
        $scope.registrarComite = {
            nombreComite: null,
            detalleComite: null,
            usuario: usuario_creacion
        }

        $scope.buscar = {
            nombre: null
        };

        $scope.registrarAsignaciones = {
            asignacion: null,
            nombre: null,
            apellidos: null,
            correo: null,
            cedula: null,
            cargo: null
        }

        $scope.crearComite = function () {
            $scope.crear = true;
            $scope.detalle = false;
        }

        $scope.regresar = function () {
            $scope.crear = false;
            $scope.detalle = false;
        }

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
                $scope.exceptionHandler(response);
                if (response.data.length) {
                    $scope.comites = response.data;
                    $scope.comitess = response.data;
                    $scope.paginacion($scope.comites);
                } else {
                    $scope.comites = [];
                    $scope.comitess = [];
                }
            });
        }
        $scope.listaComites();

        $scope.buscarComite = function (ev) {
            $scope.comites = $scope.comitess.filter(x => {
                const term = ev.target.value.toLowerCase();
                return x.Descripcion.toLowerCase().includes(term)
            });
        }

        $scope.verDetalle = function (comite) {
            $scope.detalle = true;
            $scope.nombreComite = comite.Descripcion;
            $scope.idComite = comite.Codigo
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
                    function: 'obtenerDetalleComites',
                    idComite: Number(comite.Codigo)
                }
            }).then(function (response) {
                swal.close();
                $scope.exceptionHandler(response);
                if (response.data.length) {
                    $scope.detalleComite = response.data;
                    $scope.paginacion(response.data);
                } else {
                    $scope.detalleComite = [];
                }
            });
        }


        $scope.obtenerVisibilidad = function () {
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
                    function: 'obtenerVisibilidad'
                }
            }).then(function (response) {
                swal.close();
                $scope.exceptionHandler(response);
                if (response.data.length) {
                    $scope.visibilidades = response.data;
                } else {
                    $scope.visibilidades = [];
                }
            });
        }
        $scope.obtenerVisibilidad();

        $scope.asignarAdmin = function (asignacion) {
            swal({
                title: "IMPORTANTE",
                text: "¿Desear asignar a " + asignacion.Nombre + " como Administrador?",
                type: "question",
                showCancelButton: true,
                confirmButtonColor: '#1a2e63',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Asignar!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result) {
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
                            function: 'asignarAdministrador',
                            idComite: Number($scope.idComite),
                            idAsignacion: Number(asignacion.Codigo),
                            usuario: usuario
                        }
                    }).then(function (response) {
                        swal.close();
                        if (response.data.length) {
                            $scope.detalleComite.map(function (x) { return x.Admin = 'N' });

                            $scope.detalleComite.filter(function (x) {
                                return x.Codigo === asignacion.Codigo
                            }).map(function (x) { return x.Admin = 'S' });
                        } else {
                            $scope.exceptionHandler(response);
                        }
                    }).catch((err) => {
                        swal.close();
                        swal('Lo sentimos, se ha presentado un error.', '', 'error').catch(swal.noop);
                    });
                };
            });
        }

        $scope.listaAsignacion = function () {
            $http({
                method: 'POST',
                url: "php/planeacion/superadmin.php",
                data: {
                    function: 'obtenerAsignacion'
                }
            }).then(function (response) {
                $scope.exceptionHandler(response);
                if (response.error) {
                    $scope.exceptionHandler(response);
                } else {
                    $scope.asignaciones = response.data;
                }
            });
        }
        $scope.listaAsignacion();

        $scope.validarAsignacion = function (asignacion) {
            let asignacionId = $scope.asignaciones.filter(function (x) {
                return x.Codigo === asignacion
            });

            $scope.labelAsigancion = asignacionId[0].Descripcion;
        }

        $scope.buscarAsignacion = function (item) {
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
                    function: 'obtenerInternos',
                    coincidencia: item,
                }
            }).then(function (response) {
                swal.close();
                $scope.exceptionHandler(response);
                if (response.data.length === 0) {
                    $scope.resultadoBuscar = [];
                } else {
                    $scope.resultadoBuscar = response.data;
                }
            });
        }

        $scope.seleccionarItem = function (item) {
            $scope.registrarAsignaciones.nombre = item.Nombre;
            $scope.registrarAsignaciones.apellidos = item.Apellido;
            $scope.registrarAsignaciones.cedula = item.Documento;
            $scope.registrarAsignaciones.cargo = item.Cargo;
            $scope.registrarAsignaciones.correo = item.Email;
            $scope.resultadoBuscar = [];
            $scope.clearFields($scope.buscar);
        }

        $scope.cargarAsignacion = function (asignacion) {
            let asignacionId = $scope.asignaciones.filter(function (x) {
                return x.Codigo === asignacion
            });

            return asignacionId[0].Descripcion;
        }

        $scope.guardarAsignacion = function () {
            // $scope.registrarAsignaciones.cedula = $scope.registrarAsignaciones.cedula != null ? $scope.registrarAsignaciones.cedula : 'N/A';
            // $scope.registrarAsignaciones.correo = $scope.registrarAsignaciones.correo != null ? $scope.registrarAsignaciones.correo : 'N/A';
            $scope.registrarAsignaciones.cargo = $scope.registrarAsignaciones.cargo != null ? $scope.registrarAsignaciones.cargo : 'N/A';

            if (!$scope.validateFiels($scope.registrarAsignaciones)) {
                swal('No pueden existir campos vacíos.', '', 'error').catch(swal.noop);
                return;
            }

            if (!$scope.validateEmail($scope.registrarAsignaciones.correo)) {
                swal('Correo no es valido.', '', 'error').catch(swal.noop);
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
                url: "php/planeacion/superadmin.php",
                data: {
                    function: 'guardarAsignacion',
                    tipoAsignacion: Number($scope.registrarAsignaciones.asignacion),
                    nombre: $scope.registrarAsignaciones.nombre,
                    apellidos: $scope.registrarAsignaciones.apellidos,
                    correo: $scope.registrarAsignaciones.correo,
                    cedula: $scope.registrarAsignaciones.cedula,
                    cargo: $scope.registrarAsignaciones.cargo,
                    usuario: usuario_creacion
                }
            }).then(function (response) {
                if (response.data.codigo === 0) {
                    swal.close();
                    $scope.idAsignaciones.push(response.data.codigoId);
                    $scope.listadoAsignaciones.push({
                        id: response.data.codigoId,
                        nombre: $scope.registrarAsignaciones.nombre,
                        apellidos: $scope.registrarAsignaciones.apellidos,
                        cedula: $scope.registrarAsignaciones.cedula,
                        correo: $scope.registrarAsignaciones.correo,
                        cargo: $scope.registrarAsignaciones.cargo,
                        asignacion: $scope.registrarAsignaciones.asignacion
                    });
                    $scope.clearFields($scope.registrarAsignaciones);
                    $scope.labelAsigancion = '';
                } else {
                    $scope.exceptionHandler(response);
                }
            }).catch((err) => {
                swal.close();
                swal('Lo sentimos, se ha presentado un error.', '', 'error').catch(swal.noop);
            });
        }

        $scope.eliminarAsignacion = function (asignacion) {
            swal({
                title: "IMPORTANTE",
                text: "¿Esta seguro que desea eliminar el registro?",
                type: "question",
                showCancelButton: true,
                confirmButtonColor: '#1a2e63',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!',
                cancelButtonText: 'Cancelar'
            })
                .then((result) => {
                    if (result) {
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
                                function: 'eliminarAsignacion',
                                idAsignacion: Number(asignacion)
                            }
                        }).then(function (response) {
                            if (response.data.codigo === 0) {
                                swal.close();
                                $scope.listadoAsignaciones = $scope.listadoAsignaciones.filter(function (x) {
                                    return Number(x.id) != Number(asignacion)
                                });
                                $scope.idAsignaciones = $scope.idAsignaciones.filter(function (x) {
                                    return Number(x) !== Number(asignacion)
                                });
                            } else {
                                $scope.exceptionHandler(response);
                            }
                        }).catch((err) => {
                            swal.close();
                            swal('Lo sentimos, se ha presentado un error.', '', 'error').catch(swal.noop);
                        });
                    }
                });
        }

        $scope.validateEmail = (email) => {
            return email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };

        $scope.guardarComite = function () {
            $scope.registrarComite.usuario = $scope.usuario_creacion;
            if (!$scope.validateFiels($scope.registrarComite)) {
                swal('No pueden existir campos vacíos.', '', 'error').catch(swal.noop);
                return;
            }

            if (!$scope.idAsignaciones.length) {
                swal('Debe agregar una asignación al comité.', '', 'error').catch(swal.noop);
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
                url: "php/planeacion/superadmin.php",
                data: {
                    function: 'guardarComite',
                    ...$scope.registrarComite
                }
            }).then(function (response) {
                if (response.data.codigo === 0) {
                    $http({
                        method: 'POST',
                        url: "php/planeacion/superadmin.php",
                        data: {
                            function: 'guardarRelComiteAsignacion',
                            idComite: Number(response.data.codigoId),
                            idAsignaciones: $scope.idAsignaciones.toString(),
                            usuario: usuario
                        }
                    }).then(function (response) {
                        swal.close();
                        if (response.data.codigo === 0) {
                            swal('Comité creado correctamente', '', 'success').catch(swal.noop);
                            $scope.clearFields($scope.registrarComite);
                            $scope.idAsignaciones = [];
                            $scope.listadoAsignaciones = [];
                            $scope.listaComites();
                            $scope.clearFields($scope.buscar);
                            $scope.crear = false;
                        } else {
                            $scope.exceptionHandler(response);
                        }
                    }).catch((err) => {
                        swal.close();
                        swal('Lo sentimos, se ha presentado un error.', '', 'error').catch(swal.noop);
                    });
                }
            });
        }

        $scope.paginacion = function () {
            $scope.currentPage = 0;
            $scope.pageSize = 10;
            $scope.q = "";
            $scope.getData = function () {
                // if ($scope.medicamentos.orden != "") {
                //   return $filter('filter')($filter('orderBy')($scope.historial.listado, 'RADICADO'), $scope.q);
                // } else {
                return $filter('filter')($scope.comites, $scope.q);
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

        $scope.exceptionHandler = function (response) {
            const errorConexion = response.data.toString().includes('ORA-12170');
            if (errorConexion) {
                swal.close();
                swal('Lo sentimos, se ha presentado un error de conexión.', '', 'error').catch(swal.noop);
            }

            if (response.data.toString().substr(0, 3) === '<br') {
                swal.close();
                swal('Lo sentimos, se ha presentado un error favor comunicarse con el area de soporte.', '', 'error').catch(swal.noop);
            }
        }
    }]);