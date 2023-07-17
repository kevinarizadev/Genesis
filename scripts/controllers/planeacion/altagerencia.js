'use strict';
angular.module('GenesisApp')
    .controller('AltaGerenciaController', ['$scope', '$rootScope', '$http', '$filter', '$window', 'ngDialog', '$rootScope', function ($scope, $rootScope, $http, $filter, $window, ngDialog) {

        $scope.abrirModal = function (accion) {
            if (Number(accion) === 2001) {
                $scope.agendarComite();
            } else if (Number(accion) === 2002) {
                $scope.aggCompromiso();
            } else if (Number(accion) === 2003) {
                $scope.verCompromiso();
            }
        }

        $scope.agendarComite = function () {
            ngDialog.open({
                template: 'views/planeacion/agendarComite/index.html',
                className: 'ngdialog-theme-plain',
                controller: 'agendarComiteController',
                scope: $scope
            });
        }

        $scope.aggCompromiso = function () {
            ngDialog.open({
                template: 'views/planeacion/agregarCompromiso/index.html',
                className: 'ngdialog-theme-plain',
                controller: 'agregarCompromisoController',
                scope: $scope
            });
        }

        $scope.verCompromiso = function () {
            ngDialog.open({
                template: 'views/planeacion/verCompromiso/index.html',
                className: 'ngdialog-theme-plain',
                controller: 'verCompromisoController',
                scope: $scope
            });
        }

        var usuario_creacion = sessionStorage.getItem('usuario');
        $scope.agendas = [];
        $scope.acciones = [];
        function addZero(i) {
            if (i < 10) {
                i = '0' + i;
            }
            return i;
        }

        var hoy = new Date();
        var dd = hoy.getDate();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        var mm = hoy.getMonth() + 1;
        var yyyy = hoy.getFullYear();

        dd = addZero(dd);
        mm = addZero(mm);

        $scope.validarPermisos = function () {
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
                    function: 'validarPermisos',
                    usuario: usuario_creacion,
                    codigo: 2000
                }
            }).then(function (response) {
                $scope.exceptionHandler(response);
                if (response.data.Acciones) {
                    $scope.acciones = response.data.Acciones;
                    swal.close();
                } else {
                    $scope.acciones = [];
                }

            });
        }
        $scope.validarPermisos();

        $scope.listaAgendas = function () {
            $scope.agendas = [];
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
                    function: 'obtenerAgendas',
                    cedula: sessionStorage.getItem('cedula'),
                    usuario: sessionStorage.getItem('usuario'),
                }
            }).then(function (response) {
                swal.close();
                $scope.exceptionHandler(response);
                if (response.data.length) {
                    for (let i = 0; i < response.data.length; i++) {
                        const element = response.data[i];
                        $scope.agendas.push({
                            title: element.Tema,
                            description: element.Tema,
                            start: element.Fecha,
                            color: '#ee40359c',
                            textColor: '#ffffff',
                            extendedProps: {
                                comite: element.Descripcion,
                                fecha: element.Fecha,
                                ubicacion: element.Ubicacion,
                                horaInicio: element.HoraInicio,
                                horaFin: element.HoraFin,
                                codigo: element.Codigo
                            },
                        });
                    }
                    $scope.calendario($scope.agendas);
                } else {
                    $scope.calendario($scope.agendas);
                }
            });
        }
        $scope.listaAgendas();

        $rootScope.$on('ngDialog.closed', function (e, $dialog) {
            $('#calendar').fullCalendar('destroy');
            $('#calendar').empty();
            $scope.listaAgendas();
        });

        $scope.calendario = function (agendas) {
            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                locale: 'es',
                defaultDate: yyyy + '-' + mm + '-' + dd,
                buttonIcons: true,
                weekNumbers: false,
                editable: false,
                eventLimit: true, // allow "more" link when too many events 
                events: agendas,
                dayClick: function (date, jsEvent, view) {
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $scope.dataAgenda = {
                        title: calEvent.title,
                        comite: calEvent.extendedProps.comite,
                        fecha: calEvent.extendedProps.fecha,
                        ubicacion: calEvent.extendedProps.ubicacion,
                        horaInicio: calEvent.extendedProps.horaInicio,
                        horaFin: calEvent.extendedProps.horaFin,
                        codigo: calEvent.extendedProps.codigo
                    }
                    ngDialog.open({
                        template: 'views/planeacion/verComite/index.html',
                        className: 'ngdialog-theme-plain',
                        controller: 'verAgendaController',
                        scope: $scope
                    });
                },
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
