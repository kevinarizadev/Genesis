'use strict';
angular.module('GenesisApp')
    .controller('PrestacionesEconomica', ['$http', '$scope', 'cfpLoadingBar', '$location', '$timeout', '$window',
        function ($http, $scope, cfpLoadingBar, $location, $timeout, $window) {

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


            $scope.tipo = 'A';

            $scope.HabilitarInformacion = function () {
                if ($scope.Habilitar == true) {
                    $scope.tipo = 'E';
                    console.log($scope.tipo);
                } else {
                    $scope.Habilitar = false;
                    $scope.tipo = 'A';
                    console.log($scope.tipo);
                }
            }


            $scope.searchCertificado = function (codigo) {
                switch (codigo) {
                    case 'C':
                        if ($scope.numnit == '' || $scope.numnit == undefined) {
                            swal('Notificacion', 'Debe Ingresar NIT', 'info');
                        } else {
                            $window.open('views/prestaciones/cartera/certificadocartera.php?nit=' + $scope.numnit, '_blank', "width=1080,height=1100");
                        }
                        break;
                    case 'PE':

                        if ($scope.numIndentidad == '' || $scope.numIndentidad == undefined) {
                            swal('Notificacion', 'Debe Ingresar Documento', 'info');
                        } else {
                            if ($scope.inicio == undefined || $scope.inicio == '') { $scope.inicio = ''; }
                            if ($scope.final == undefined || $scope.final == '') { $scope.final = ''; }
                            $window.open('views/prestaciones/certificado/certificadoprestaciones.php?documento=' + $scope.numIndentidad + '&inicial=' + $scope.inicio + '&final=' + $scope.final + '&tipo=' + $scope.tipo, '_blank', "width=1080,height=1100");
                        }
                        break;

                    default:
                }



            }

        }])

