'use strict';
angular.module('GenesisApp')
    .controller('agendarComiteController', ['$scope', '$rootScope', '$http', '$filter', '$window', 'ngDialog', function ($scope, $rootScope, $http, $filter, $window, ngDialog) {

        var usuario_creacion = sessionStorage.getItem('usuario');
        var usuario = JSON.parse(sessionStorage.getItem('inicio_perfil')).nombre;

        $scope.agendar = false;
        $scope.agregarCompromiso = false;
        $scope.verCompromisos = false;

        $scope.agendarComite = function () {
            $scope.title = 'Agendar comité';
            $scope.agendar = true;
            $scope.agregarCompromiso = false;
            $scope.verCompromisos = false;
        }

        $scope.registrarAgenda = {
            comite: null,
            tema: null,
            modalidad: null,
            ubicacion: null,
            fecha: null,
            horaInicio: null,
            horaFin: null,
            soporte: null,
            recordatorio: null,
            tiempoRecordatorio: null,
            nombreArchivo: null,
            rutaArchivo: null,
            extensionArchivo: null,
            tieneArchivo: null
        }


        $scope.esHoraMenor = function (hora1, hora2) {
            if (hora1 == null) {
                return false
            }
            if (hora2 == null) {
                return false
            }
            var date1 = new Date(hora1);
            var date2 = new Date(hora2);

            if (date1 < date2) {
                return true;
            } else {
                return false;
            }
        };

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
                $scope.exceptionHandler(response);
                if (response.data.length) {
                    $scope.compromisos = response.data;
                    $scope.paginacion(response.data);
                } else {
                    $scope.compromisos = [];
                }
            });
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

        $scope.obtenerModalidad = function () {
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
                    function: 'obtenerModalidad'
                }
            }).then(function (response) {
                swal.close();
                $scope.exceptionHandler(response);
                if (response.data.length) {
                    $scope.modalidades = response.data;
                } else {
                    $scope.modalidades = [];
                }
            });
        }
        $scope.obtenerModalidad();

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
                    swal.close();
                    const disableDates = response.data;
                    const validate = dateString => {
                        const date = new Date(dateString).toJSON().slice(0, 10);
                        document.getElementById('error').innerHTML = '';
                        if (disableDates.indexOf(date) > -1) {
                            return false;
                        }
                        return true;
                    }

                    document.querySelector('.fecha').onchange = evt => {
                        if (!validate(evt.target.value)) {
                            evt.target.value = '';
                            document.getElementById('error').innerHTML = 'Fecha no hábil';
                        }
                    }
                } else {
                    $scope.modalidades = [];
                }
            });
        }
        $scope.obtenerDiasNoHabiles();

        // $scope.obtenerVisibilidad = function () {
        //     swal({
        //         title: 'Cargando información...',
        //         allowEscapeKey: false,
        //         allowOutsideClick: false
        //     });
        //     swal.showLoading();
        //     $http({
        //         method: 'POST',
        //         url: "php/planeacion/altagerencia.php",
        //         data: {
        //             function: 'obtenerVisibilidad'
        //         }
        //     }).then(function (response) {
        //         swal.close();
        //         if (response.data.length) {
        //             $scope.visibilidades = response.data;
        //         } else {
        //             $scope.visibilidades = [];
        //         }
        //     });
        // }
        // $scope.obtenerVisibilidad();

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

        // $scope.validarHora = function () {
        //     const inicio = document.getElementById("horaInicio");
        //     const final = document.getElementById("horaFin");
        //     const vInicio = inicio.value;
        //     const vFinal = final.value;
        //     if (!vInicio || !vFinal) {
        //         return;
        //     }
        //     const tIni = new Date();
        //     const pInicio = vInicio.split(":");
        //     tIni.setHours(pInicio[0], pInicio[1]);
        //     const tFin = new Date();
        //     const pFin = vFinal.split(":");
        //     tFin.setHours(pFin[0], pFin[1]);
        //     if (tFin.getTime() > tIni.getTime()) {
        //         $scope.registrarAgenda.horaInicio = null;
        //         $scope.registrarAgenda.horaFin = null;
        //         document.getElementById('errorHoras').innerHTML = 'La hora final no puede sar mayo a la inicial.';
        //     }
        //     if (tFin.getTime() < tIni.getTime()) {
        //         console.log("final menor a inicio");
        //     }
        //     if (tFin.getTime() === tIni.getTime()) {
        //         console.log("Iguales");
        //     }
        // }

        $scope.obtenerBase = function () {
            if ($("#soporte")[0].files[0]) {
                if ($("#soporte")[0].files[0].size > 5242880) {
                    //swal('Advertencia','El archivo excede el peso limite (7 MB)','warning')
                    swal('Advertencia', 'El archivo excede el peso limite (5 MB)', 'warning')
                    $scope.registrarAgenda.rutaArchivo = null;
                    $scope.registrarAgenda.soporte = null;
                    $scope.registrarAgenda.nombreArchivo = null;
                    $scope.registrarAgenda.extensionArchivo = null;
                    $scope.registrarAgenda.tieneArchivo = 0;
                } else {
                    if ($("#soporte")[0].files && $("#soporte")[0].files[0]) {
                        var FR = new FileReader();
                        FR.addEventListener("load", function (e) {
                            $scope.registrarAgenda.rutaArchivo = '/cargue_ftp/Digitalizacion/Genesis/Planeacion/altagerencia/';
                            $scope.registrarAgenda.soporte = e.target.result;
                            $scope.registrarAgenda.nombreArchivo = $("#soporte")[0].files[0].name;
                            $scope.registrarAgenda.extensionArchivo = $scope.registrarAgenda.nombreArchivo.split('.').pop();
                            $scope.registrarAgenda.tieneArchivo = 1;
                        });
                        FR.readAsDataURL($("#soporte")[0].files[0]);
                    }
                }
            } else {
                swal('Advertencia', 'No ha selecionado ningun Archivo', 'warning')
                $("#soporte" + ind)[0].value = "";
                $scope.registrarAgenda.rutaArchivo = null;
                $scope.registrarAgenda.soporte = null;
                $scope.registrarAgenda.nombreArchivo = null;
                $scope.registrarAgenda.extensionArchivo = null;
                $scope.registrarAgenda.tieneArchivo = 0;
            }
        }

        $scope.guardarAgenda = function () {
            var horaInicio = $scope.onTimeChange(document.getElementById('horaInicio'));
            var horaFin = $scope.onTimeChange(document.getElementById('horaFin'));
            // $scope.registrarAgenda.idModalidad = $scope.registrarAgenda.idModalidad != null ? $scope.registrarAgenda.idModalidad : 0;
            $scope.registrarAgenda.recordatorio = $scope.registrarAgenda.recordatorio ? 'S' : 'N';
            $scope.registrarAgenda.tiempoRecordatorio = $scope.registrarAgenda.tiempoRecordatorio != null ? $scope.registrarAgenda.tiempoRecordatorio : 'N';

            if (!$scope.validateFiels($scope.registrarAgenda)) {
                swal('No pueden existir campos vacíos.', '', 'error').catch(swal.noop);
                return;
            }

            if (!$scope.validateFiels($scope.registrarAgenda.tieneArchivo === 0)) {
                swal('Debe adjuntar un archivo.', '', 'error').catch(swal.noop);
                return;
            }

            swal({
                title: 'Cargando información...',
                allowEscapeKey: false,
                allowOutsideClick: false
            });
            swal.showLoading();
            let date = moment(Date.now()).format('DDMMYYYYHHmmss');
            $http({
                method: 'POST',
                url: "php/planeacion/altagerencia.php",
                data: {
                    function: 'subirFTP',
                    soporte: $scope.registrarAgenda.soporte,
                    formatoArchivo: $scope.registrarAgenda.extensionArchivo,
                    rutaArchivo: $scope.registrarAgenda.rutaArchivo,
                    nombreArchivo: date + $scope.registrarAgenda.nombreArchivo
                }
            }).then(function (response) {
                if (response.data === "1") {
                    $http({
                        method: 'POST',
                        url: "php/planeacion/altagerencia.php",
                        data: {
                            function: 'guardarAgenda',
                            idComite: Number($scope.registrarAgenda.comite),
                            tema: $scope.registrarAgenda.tema,
                            idModalidad: Number($scope.registrarAgenda.modalidad),
                            ubicacion: $scope.registrarAgenda.ubicacion,
                            fecha: moment($scope.registrarAgenda.fecha).format('DD/MM/YYYY'),
                            horaInicio: horaInicio,
                            horaFin: horaFin,

                            recordatorio: $scope.registrarAgenda.recordatorio,
                            usuCreacion: usuario_creacion,
                            usuario: usuario,
                            nombreArchivo: date + $scope.registrarAgenda.nombreArchivo,
                        }
                    }).then(function (response) {
                        const codigoComite = response.data.codigoId;
                        if (response.data.codigo === 0) {
                            $http({
                                method: 'POST',
                                url: "php/planeacion/altagerencia.php",
                                data: {
                                    function: 'guardarAdjuntosSoportes',
                                    soporte: $scope.registrarAgenda.soporte,
                                    formatoArchivo: $scope.registrarAgenda.extensionArchivo,
                                    rutaArchivo: $scope.registrarAgenda.rutaArchivo,
                                    nombreArchivo: date + $scope.registrarAgenda.nombreArchivo,
                                    tieneArchivo: $scope.registrarAgenda.tieneArchivo
                                }
                            }).then(function (response) {
                                const codigoAdjunto = response.data.codigoId;
                                $http({
                                    method: 'POST',
                                    url: "php/planeacion/altagerencia.php",
                                    data: {
                                        function: 'guardarRelComiteAdjuntos',
                                        idComite: codigoComite,
                                        adjuntos: [codigoAdjunto].toString(),
                                        usuario: usuario_creacion
                                    }
                                }).then(function (response) {
                                    if (response.data.codigo === 0) {
                                        swal('Agenda creada correctamente', '', 'success').catch(swal.noop);
                                        $scope.clearFields($scope.registrarAgenda);
                                        $("#soporte")[0].value = "";
                                        ngDialog.closeAll();
                                        // swal.close();
                                    } else {
                                        $scope.exceptionHandler(response);
                                    }
                                });
                            });

                            // swal.close();
                        } else {
                            $scope.exceptionHandler(response);
                        }
                    });
                } else {
                    $scope.exceptionHandler(response);
                }
            });
        }

        $scope.onTimeChange = function (hour) {
            var timeSplit = hour.value.split(':'),
                hours,
                minutes,
                meridian;
            hours = timeSplit[0];
            minutes = timeSplit[1];
            if (hours > 12) {
                meridian = 'PM';
                hours -= 12;
            } else if (hours < 12) {
                meridian = 'AM';
                if (hours == 0) {
                    hours = 12;
                }
            } else {
                meridian = 'PM';
            }
            return hours + ':' + minutes + ' ' + meridian;
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
