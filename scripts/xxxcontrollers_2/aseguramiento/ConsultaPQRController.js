
'use strict';
angular.module('GenesisApp')
    .controller('ConsultaPQRController', ['$scope', '$http', '$filter',
        function ($scope, $http, $filter) {

            $(function () {
                $(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({ "border-style": "none", "border-bottom-style": "dotted" });
                var date = new Date();
                var formattedDate = moment(date).format('YYYY-MM-DD');
                $(".datepicker_inicio").kendoDatePicker({
                    animation: {
                        close: {
                            effects: "fadeOut zoom:out",
                            duration: 300
                        },
                        open: {
                            effects: "fadeIn zoom:in",
                            duration: 300
                        }
                    }
                });
                $(".datepicker_final").kendoDatePicker({
                    animation: {
                        close: {
                            effects: "fadeOut zoom:out",
                            duration: 300
                        },
                        open: {
                            effects: "fadeIn zoom:in",
                            duration: 300
                        }
                    }
                });
                $(document).ready(function () {
                    $scope.startChange = function () {
                        var startDate = start.value(),
                            endDate = end.value();
                        if (startDate) {
                            startDate = new Date(startDate);
                            startDate.setDate(startDate.getDate());
                            end.min(startDate);
                        } else if (endDate) {
                            start.max(new Date(endDate));
                        } else {
                            endDate = new Date();
                            start.max(endDate);
                            end.min(endDate);
                        }
                    }

                    $scope.endChange = function () {
                        var endDate = end.value(),
                            startDate = start.value();

                        if (endDate) {
                            endDate = new Date(endDate);
                            endDate.setDate(endDate.getDate());
                            start.max(endDate);
                        } else if (startDate) {
                            end.min(new Date(startDate));
                        } else {
                            endDate = new Date();
                            start.max(endDate);
                            end.min(endDate);
                        }
                    }

                    var start = $("#fecha_inicio").kendoDatePicker({
                        change: $scope.startChange,
                        format: "dd/MM/yyyy",
                        culture: "es-MX",
                        disableDates: ["su", "sa"],
                        max: new Date()
                    }).data("kendoDatePicker");

                    var end = $("#fecha_final").kendoDatePicker({
                        change: $scope.endChange,
                        format: "dd/MM/yyyy",
                        culture: "es-MX",
                        disableDates: ["su", "sa"],
                        max: new Date()
                    }).data("kendoDatePicker");

                    start.max(end.value());
                    end.min(start.value());
                });

            });

            $scope.numero = 'Numero PQR';
            $scope.OcultarTabla = true;

            $scope.EstadoCodigo = false;
            $scope.EstadoFecha = true;



            $scope.Consulta = function () {
                if ($scope.Estado == true) {
                    $scope.EstadoCodigo = true;
                    $scope.EstadoFecha = false;
                    $scope.estadoc  = 'D';
                } else {
                    $scope.EstadoFecha = true;
                    $scope.EstadoCodigo = false;
                    $scope.estadoc = 'C';
                }
                $scope.CambiarDatos();
            }

            $scope.ConsultarPQR = function () {
                if ($scope.Habilitar == true) {
                    $scope.nurc = $scope.num;
                    $scope.pqr = '';
                    $scope.numero = 'Numero NURC';
                    
                } else {
                    $scope.Habilitar = false;
                    $scope.nurc = '';
                    $scope.pqr = $scope.num;
                    $scope.numero = 'Numero PQR';

                }
                $scope.CambiarDatos();
                $scope.responde = 0;
            }
            $scope.informacion = [];
            $scope.CambiarDatos = function () {
                $scope.OcultarTabla = true;
                if ( $scope.informacion.length > 0) {
                    $scope.listSolicitudes.destroy();
                    $scope.informacion = [];
                }
            }
            $scope.ValidoFecha = function () {
                if ($scope.inicio == null || $scope.inicio == '' || $scope.inicio == undefined) {
                    swal('Notificación', 'Debe Seleccionar La Fecha Inicial', 'info');
                } else {
                    $scope.responde = 0;
                }
            }

            $scope.searchPQR = function () {
                if ($scope.estadoc == 'C') {
                    $scope.ConsultarPQR();
                }
                if ($scope.estadoc == 'D') {
                    $scope.ValidoFecha();
                }
                if ($scope.responde == 0) {
                    swal({ title: 'Cargando Informacion' }); swal.showLoading();
                    $http({
                        method: 'GET',
                        url: "php/aseguramiento/consultapqr.php",
                        params: { codigopqr: $scope.pqr, codigonurc: $scope.nurc, estado: $scope.estadoc, fecha_inicio: $scope.inicio, fecha_final: $scope.final }
                    }).then(function (response) {
                        if (response.data.length > 0) {
                            $scope.informacion = response.data;
                            $scope.OcultarTabla = false;
                            setTimeout(function () {
                                $scope.listSolicitudes = $('#tablapqr').DataTable({
                                    destroy: true,
                                    responsive: true,
                                    dom: 'lBsfrtip',
                                    buttons: ['excel', 'pdf'],
                                    language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                                    lengthMenu: [[10, 50, -1], [10, 50, 'Todas']],
                                    order: [[0, "asc"]]
                                });
                                swal.close();
                            }, 500);
                        } else {
                            swal('Genesis informa', 'No hay Informacion De PQR', 'warning');
                        }
                    });
                }



            }

        }])
