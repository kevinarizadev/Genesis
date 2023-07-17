'use strict';
angular.module('GenesisApp')
    .controller('agregarCompromisoController', ['$scope', '$rootScope', '$http', '$filter', '$window', 'ngDialog', function ($scope, $rootScope, $http, $filter, $window, ngDialog) {
        // Agregar compromiso
        $scope.compromisos = [];
        $scope.responsables = [];
        var usuario_creacion = sessionStorage.getItem('usuario');
        $scope.fechaHoy = moment(Date.now()).format('YYYY-MM-DD');

        $scope.registrarCompromiso = {
            comite: null,
            responsables: [],
            compromiso: null,
            fechaInicio: null,
            fechaFin: null,
            duracion: null,
            subtarea: null,
            soporte: null,
            prioridad: null,
            nombreArchivo: null,
            rutaArchivo: null,
            extensionArchivo: null,
            tieneArchivo: null
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
                url: "php/planeacion/altagerencia.php",
                data: {
                    function: 'obtenerComitesAsignados',
                    cedula: Number(sessionStorage.getItem('cedula'))
                }
            }).then(function (response) {
                swal.close();
                $scope.exceptionHandler(response);
                if (response.data.length) {
                    $scope.comites = response.data;
                } else {
                    $scope.comites = [];
                }
            });
        }
        $scope.listaComites();

        // Obtener participantes del comité
        $scope.obtenerParticipantesComite = function (comite) {
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
                    idComite: Number(comite)
                }
            }).then(function (response) {
                swal.close();
                $scope.exceptionHandler(response);
                if (response.data.length) {
                    $scope.participantes = response.data;
                } else {
                    $scope.participantes = [];
                }
            });
        }

        $scope.fechaMinima = function (fecha) {
            return moment(fecha).format('YYYY-MM-DD');
        }

        $scope.calcularDias = function () {
            if ($scope.registrarCompromiso.fechaInicio != null && $scope.registrarCompromiso.fechaFin != null) {
                //if ($scope.validateDate($scope.registrarCompromiso.fechaInicio) && $scope.validateDate($scope.registrarCompromiso.fechaFin)) {
                    $scope.obtenerDiasCompromiso();
                //}
            }
        }

        $scope.validateDate = function (dateString) {
            // Define el formato de fecha que deseas validar
            var dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;

            // Verifica si la fecha cumple con el formato deseado
            if (!dateFormat.test(dateString)) {
                return true;
            } else {
                // Si la fecha cumple con el formato, puedes realizar otras validaciones adicionales si es necesario
                return false;
            }
        };

        $scope.obtenerDiasCompromiso = function () {
            // swal({
            //     title: 'Cargando información...',
            //     allowEscapeKey: false,
            //     allowOutsideClick: false
            // });
            // swal.showLoading();
            $http({
                method: 'POST',
                url: "php/planeacion/altagerencia.php",
                data: {
                    function: 'obtenerDiasCompromiso',
                    fechaInicio: moment($scope.registrarCompromiso.fechaInicio).format('DD/MM/YYYY'),
                    fechaFin: moment($scope.registrarCompromiso.fechaFin).format('DD/MM/YYYY')
                }
            }).then(function (response) {
                // swal.close();
                $scope.exceptionHandler(response);
                if (response.data.length) {
                    $scope.registrarCompromiso.duracion = response.data;
                }
            });
        }

        $scope.obtenerPrioridades = function () {
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
                    function: 'obtenerPrioridades'
                }
            }).then(function (response) {
                swal.close();
                $scope.exceptionHandler(response);
                if (response.data.length) {
                    $scope.prioridades = response.data;
                } else {
                    $scope.prioridades = [];
                }
            });
        }
        $scope.obtenerPrioridades();

        $scope.agregarResponsable = function (responsable) {
            if (responsable != null) {
                let tempo = $scope.responsables.find(element => element == responsable);
                if (tempo == undefined) {
                    $scope.registrarCompromiso.responsables.push(responsable);
                    $scope.responsables.push(responsable);
                    $scope.responsable = null;

                }
            }

        }

        $scope.eliminarResponsable = function (responsable) {
            $scope.responsables = $scope.responsables.filter(function (x) {
                return Number(x) != Number(responsable)
            })
            $scope.registrarCompromiso.responsables = $scope.registrarCompromiso.responsables.filter(function (x) {
                return Number(x) != Number(responsable)
            })
        }

        $scope.getNombre = function (id) {
            let responsable = $scope.participantes.filter(x => x.Codigo === id);

            return responsable[0].Nombre;
        }

        $scope.obtenerDiasNoHabiles = function () {
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
                    function: 'obtenerDiasNoHabiles',
                    fecha: moment(Date.now()).format('DD/MM/YYYY')
                }
            }).then(function (response) {
                $scope.exceptionHandler(response);
                if (response.data.length) {
                    const disableDates = response.data;
                    const validate = dateString => {
                        const date = new Date(dateString).toJSON().slice(0, 10);
                        document.getElementById('error').innerHTML = '';
                        document.getElementById('error2').innerHTML = '';
                        if (disableDates.indexOf(date) > -1) {
                            return false;
                        }
                        return true;
                    }

                    document.querySelector('.fechaIni').onchange = evt => {
                        if (!validate(evt.target.value)) {
                            evt.target.value = '';
                            document.getElementById('error').innerHTML = 'Fecha no hábil';
                        }
                    }

                    document.querySelector('.fechaFin').onchange = evt => {
                        if (!validate(evt.target.value)) {
                            evt.target.value = '';
                            document.getElementById('error2').innerHTML = 'Fecha no hábil';
                        }
                    }
                    swal.close();
                }
            });
        }
        $scope.obtenerDiasNoHabiles();

        $scope.obtenerBase = function () {
            if ($("#soporte")[0].files[0]) {
                if ($("#soporte")[0].files[0].size > 5242880) {
                    //swal('Advertencia','El archivo excede el peso limite (7 MB)','warning')
                    swal('Advertencia', 'El archivo excede el peso limite (5 MB)', 'warning')
                    $scope.registrarCompromiso.rutaArchivo = null;
                    $scope.registrarCompromiso.soporte = null;
                    $scope.registrarCompromiso.nombreArchivo = null;
                    $scope.registrarCompromiso.extensionArchivo = null;
                    $scope.registrarCompromiso.tieneArchivo = 0;
                } else {
                    if ($("#soporte")[0].files && $("#soporte")[0].files[0]) {
                        var FR = new FileReader();
                        FR.addEventListener("load", function (e) {
                            $scope.registrarCompromiso.rutaArchivo = '/cargue_ftp/Digitalizacion/Genesis/Planeacion/altagerencia/';
                            $scope.registrarCompromiso.soporte = e.target.result;
                            $scope.registrarCompromiso.nombreArchivo = $("#soporte")[0].files[0].name;
                            $scope.registrarCompromiso.extensionArchivo = $scope.registrarCompromiso.nombreArchivo.split('.').pop();
                            $scope.registrarCompromiso.tieneArchivo = 1;
                        });
                        FR.readAsDataURL($("#soporte")[0].files[0]);
                    }
                }
            } else {
                swal('Advertencia', 'No ha selecionado ningun Archivo', 'warning')
                $("#soporte" + ind)[0].value = "";
                $scope.registrarCompromiso.rutaArchivo = null;
                $scope.registrarCompromiso.soporte = null;
                $scope.registrarCompromiso.nombreArchivo = null;
                $scope.registrarCompromiso.extensionArchivo = null;
                $scope.registrarCompromiso.tieneArchivo = 0;
            }
        }

        $scope.guardarCompromiso = function () {
            let date = moment(Date.now()).format('DDMMYYYYHHmmss');
            $scope.registrarCompromiso.soporte = $scope.registrarCompromiso.soporte != null ? $scope.registrarCompromiso.soporte : 'N/A';
            $scope.registrarCompromiso.subtarea = $scope.registrarCompromiso.subtarea != null ? $scope.registrarCompromiso.subtarea : 'N/A';
            $scope.registrarCompromiso.nombreArchivo = $scope.registrarCompromiso.nombreArchivo != null ? date + $scope.registrarCompromiso.nombreArchivo : 'N/A';
            $scope.registrarCompromiso.rutaArchivo = $scope.registrarCompromiso.rutaArchivo != null ? $scope.registrarCompromiso.rutaArchivo : 'N/A';
            $scope.registrarCompromiso.extensionArchivo = $scope.registrarCompromiso.extensionArchivo != null ? $scope.registrarCompromiso.extensionArchivo : 'N/A';
            $scope.registrarCompromiso.tieneArchivo = $scope.registrarCompromiso.tieneArchivo != null ? $scope.registrarCompromiso.tieneArchivo : 0;

            if (!$scope.validateFiels($scope.registrarCompromiso)) {
                swal('No pueden existir campos vacíos.', '', 'error').catch(swal.noop);
                return;
            }

            swal({
                title: 'Cargando información...',
                allowEscapeKey: false,
                allowOutsideClick: false
            });
            swal.showLoading();
            if ($scope.registrarCompromiso.tieneArchivo === 1) {
                $http({
                    method: 'POST',
                    url: "php/planeacion/altagerencia.php",
                    data: {
                        function: 'subirFTP',
                        soporte: $scope.registrarCompromiso.soporte,
                        formatoArchivo: $scope.registrarCompromiso.extensionArchivo,
                        rutaArchivo: $scope.registrarCompromiso.rutaArchivo,
                        nombreArchivo: $scope.registrarCompromiso.nombreArchivo
                    }
                }).then(function (response) {
                    if (response.data === "1") {
                        $scope.guardarCompromisos();
                    } else {
                        $scope.exceptionHandler(response);
                    }
                });
            } else {
                $scope.guardarCompromisos();
            }
        }

        $scope.guardarCompromisos = function () {
            $http({
                method: 'POST',
                url: "php/planeacion/altagerencia.php",
                data: {
                    function: 'guardarCompromiso',
                    responsables: $scope.registrarCompromiso.responsables.toString(),
                    compromiso: $scope.registrarCompromiso.compromiso,
                    fechaInicio: moment($scope.registrarCompromiso.fechaInicio).format('DD/MM/YYYY'),
                    fechaFin: moment($scope.registrarCompromiso.fechaFin).format('DD/MM/YYYY'),
                    duracion: $scope.registrarCompromiso.duracion,
                    subtarea: $scope.registrarCompromiso.subtarea,
                    soporte: $scope.registrarCompromiso.nombreArchivo,
                    idPrioridad: Number($scope.registrarCompromiso.prioridad),
                    idComite: Number($scope.registrarCompromiso.comite)
                }
            }).then(function (response) {
                const codigoCompromiso = response.data.codigoId;
                if (response.data.codigo === 0) {
                    $http({
                        method: 'POST',
                        url: "php/planeacion/altagerencia.php",
                        data: {
                            function: 'guardarAdjuntosSoportes',
                            soporte: $scope.registrarCompromiso.soporte,
                            formatoArchivo: $scope.registrarCompromiso.extensionArchivo,
                            rutaArchivo: $scope.registrarCompromiso.rutaArchivo,
                            nombreArchivo: $scope.registrarCompromiso.nombreArchivo,
                            tieneArchivo: $scope.registrarCompromiso.tieneArchivo
                        }
                    }).then(function (response) {
                        const codigoAdjunto = response.data.codigoId;
                        $http({
                            method: 'POST',
                            url: "php/planeacion/altagerencia.php",
                            data: {
                                function: 'guardarRelCompromisoAdjuntos',
                                idCompromiso: codigoCompromiso,
                                adjuntos: [codigoAdjunto].toString(),
                                usuario: usuario_creacion
                            }
                        }).then(function (response) {
                            const codigoAdjunto = response.data.codigoId;
                            if (response.data.codigo === 0) {
                                swal('Compromiso creado correctamente', '', 'success').catch(swal.noop);
                                $scope.clearFields($scope.registrarCompromiso);
                                // $("#soporteCompromiso")[0].value = "";
                                $scope.responsable = "";
                                $scope.registrarCompromiso.responsables = [];
                                $scope.responsables = [];
                                $scope.participantes = [];
                                ngDialog.closeAll();
                            } else {
                                $scope.exceptionHandler(response);
                            }
                        });
                    });
                } else {
                    $scope.exceptionHandler(response);
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