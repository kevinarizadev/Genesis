'use strict';
angular.module('GenesisApp')
   .controller('ReportesasegController', ['$scope', '$http', '$filter',
      function ($scope, $http, $filter) {
         $(document).ready(function () { $('#modaltabla').modal(); });
         var dat = { prov: 'navb' }
         $.getJSON("php/obtenersession.php", dat).done(function (respuesta) {
            $scope.sesdata = respuesta;
            $scope.rol = $scope.sesdata.rolcod;
            $scope.cedula = $scope.sesdata.cedula;
            $scope.HabiliarReporte();
         }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("navbar error obteniendo variables");
         });


         $scope.Departamento = '0';
         $scope.Municipio = '0';
         $scope.Usuario = '0';

         $scope.habilitarpoliza = function () {
            if ($scope.cedula == '22523027' || $scope.cedula == '1143450658') {
               $scope.habilitar = true;
            } else {
               $scope.habilitar = false;
            }
         }

         $scope.HabiliarReporte = function () {
            if ($scope.rol != '42' || $scope.rol != '43') {
               $scope.setTab(1);
               $scope.Ocultar = true;
            } else {
               $scope.Ocultar = false;
            }
            $scope.habilitarpoliza();
         }


         $scope.init = function () {
            $scope.tabI = false;
            $scope.tabII = false;
            $scope.activeI = 'none';
            $scope.activeII = 'none';
         }
         $scope.setTab = function (opcion) {
            $scope.init();
            switch (opcion) {
               case 1:
                  $scope.tabI = true;
                  $scope.tabII = false;
                  $scope.activeI = 'active final';
                  $scope.activeII = 'none';
                  $(function () {
                     $(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({
                        "border-style": "none",
                        "border-bottom-style": "dotted"
                     });
                     var date = new Date();
                     var formattedDate = moment(date).format('YYYY-MM');
                     $(".datepicker_inicio").kendoDatePicker({
                        animation: {
                           close: {
                              effects: "zoom:out",
                              duration: 300
                           },
                           open: {
                              effects: "zoom:in",
                              duration: 300
                           }
                        }
                     });
                     $(document).ready(function () {
                        var inicial = $("#fecha_inicial").kendoDatePicker({
                           format: "dd/MM/yyyy",
                           culture: "es-MX",
                           max: new Date()
                        }).data("kendoDatePicker");

                        var final = $("#fecha_final").kendoDatePicker({
                           format: "dd/MM/yyyy",
                           culture: "es-MX",
                           max: new Date()
                        }).data("kendoDatePicker");
                     });
                  });
                  break;
               case 2:
                  $scope.tabI = false;
                  $scope.tabII = true;
                  $scope.activeI = 'none';
                  $scope.activeII = 'active final';

                  $(function () {
                     $(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({
                        "border-style": "none",
                        "border-bottom-style": "dotted"
                     });
                     var date = new Date();
                     var formattedDate = moment(date).format('YYYY-MM');
                     $(".datepicker_inicio").kendoDatePicker({
                        animation: {
                           close: {
                              effects: "zoom:out",
                              duration: 300
                           },
                           open: {
                              effects: "zoom:in",
                              duration: 300
                           }
                        }
                     });
                     $(document).ready(function () {
                        var inicial = $("#f_inicial").kendoDatePicker({
                           format: "dd/MM/yyyy",
                           culture: "es-MX",
                           max: new Date()
                        }).data("kendoDatePicker");

                        var final = $("#f_final").kendoDatePicker({
                           format: "dd/MM/yyyy",
                           culture: "es-MX",
                           max: new Date()
                        }).data("kendoDatePicker");
                     });
                  });
                  break;
               default:
            }
         }



         $scope.DescargarReportes = function (id) {
            switch (id) {
               case '1':
                  var v_pinicial = $filter('date')(new Date($scope.v_pinicial), 'dd/MM/yyyy');
                  var v_pfinal = $filter('date')(new Date($scope.v_pfinal), 'dd/MM/yyyy');
                  window.open('php/aseguramiento/reportescargue.php?&v_pinicial=' + $scope.v_pinicial + '&v_pfinal=' + $scope.v_pfinal);
                  $scope.Limpiar('1');
                  break;

               case '2':
                  if ($scope.fecha_inicial == undefined || $scope.fecha_final == undefined || $scope.fecha_inicial == '' || $scope.fecha_final == '') {
                     $scope.fecha_inicial = '01/01/1500'
                     $scope.fecha_final = '01/01/1500'
                  }
                  if ($scope.Departamento == '0') {
                     $scope.Departamento = '9';
                  }
                  if ($scope.Municipio == '0') {
                     $scope.Municipio = '9';
                  }
                  window.open('php/aseguramiento/reportesdir.php?&v_inicial=' + $scope.fecha_inicial + '&v_final=' + $scope.fecha_final + '&v_dpto=' + $scope.Departamento + '&v_mun=' + $scope.Municipio + '&v_res=' + $scope.Usuario);
                  $scope.Limpiar('2');
                  break;
               default:
                  break;
            }
         }


         $scope.Limpiar = function (identificador) {
            switch (identificador) {
               case '1':
                  $scope.v_pfinal = '';
                  $scope.v_pinicial = '';
                  break;
               case '2':
                  $scope.fecha_inicial = '';
                  $scope.fecha_final = '';
                  $scope.Departamento = '0';
                  $scope.Municipio = '0';
                  $scope.Usuario = '0';
                  break;
            }
         }

         $http({
            method: 'POST',
            url: "php/consultaafiliados/funcnovedadacb.php",
            data: {
               function: 'cargaDepartamentos'
            }
         }).then(function (response) {
            $scope.Depto = response.data;
         });


         $scope.Funcionario = function () {
            $http({
               method: 'POST',
               url: "php/aseguramiento/Rafiliacion.php",
               data: {
                  function: 'obtenerempleados',
                  v_municipio: $scope.Municipio
               }
            }).then(function (response) {
               $scope.user = response.data;
            });
         }


         $scope.BuscoMunicipio = function () {
            $http({
               method: 'POST',
               url: "php/consultaafiliados/funcnovedadacb.php",
               data: {
                  function: 'cargaMunicipios',
                  depa: $scope.Departamento
               }
            }).then(function (response) {
               $scope.Mun = response.data;
            });

         }

         $scope.lmaPolizaAseguradora = function () {
            swal({
               title: 'Ingrese periodo (MM/YYYY)',
               input: 'text',
               inputPlaceholder: '(MM/YYYY)',
               showCancelButton: true
            }).then(function (result) {
               window.open("php/salud/reportes/poliza_lma.php?periodo=" + result);

            })
         }

         $scope.ReporteR2 = function () {
            swal({
               title: 'Ingrese periodo (MM/YYYY)',
               input: 'text',
               inputPlaceholder: '(MM/YYYY)',
               showCancelButton: true
            }).then(function (result) {
               window.open("php/aseguramiento/reporte_r2.php?fecha=" + result);

            })
         }

         $scope.ReporteS2 = function () {
            swal({
               title: 'Ingrese periodo (MM/YYYY)',
               input: 'text',
               inputPlaceholder: '(MM/YYYY)',
               showCancelButton: true
            }).then(function (result) {
               window.open("php/aseguramiento/reporte_s2.php?fecha=" + result);

            })
         }


         $scope.OpenModal = function (typo) {
            $scope.typo = typo;
            $scope.date_inicio = '';
            $scope.date_final = '';
            $('#modaltabla').modal('open');
            switch ($scope.typo) {
               case 'S1':
                  $scope.titulo = 'Reporte S1';
                  break;
               case 'S2':
                  $scope.titulo = 'Reporte S2';
                  break;
               case 'R2':
                  $scope.titulo = 'Reporte R2';
                  break;
               case 'MS':
                  $scope.titulo = 'Reporte MS';
                  break;
               case 'NS':
                  $scope.titulo = 'Reporte NS';
                  break;
               default:
                  break;
            }
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

                  var start = $("#variableinicial").kendoDatePicker({
                     change: $scope.startChange,
                     format: "dd/MM/yyyy",
                     culture: "es-MX",
                     disableDates: ["su", "sa"],
                     max: new Date()
                  }).data("kendoDatePicker");

                  var end = $("#variablefinal").kendoDatePicker({
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
         }




         $scope.CerrarModal = function () {
            $('#modaltabla').modal('close');
            $scope.date_inicio = '';
            $scope.date_final = '';
         }

         $scope.Reporte = function () {

            switch ($scope.typo) {
               case 'S1':
                  window.open('php/aseguramiento/reporte_s1.php?&fecha_inicio=' + $scope.date_inicio + '&fecha_final=' + $scope.date_final);
                  $scope.CerrarModal();
                  break;
               case 'S2':
                  window.open('php/aseguramiento/reporte_s2.php?&fecha_inicio=' + $scope.date_inicio + '&fecha_final=' + $scope.date_final);
                  $scope.CerrarModal();
                  break;
               case 'R2':
                  window.open('php/aseguramiento/reporte_r2.php?&fecha_inicio=' + $scope.date_inicio + '&fecha_final=' + $scope.date_final);
                  $scope.CerrarModal();
                  break;
               case 'MS':
                  window.open('php/aseguramiento/reporte_ms.php?&fecha_inicio=' + $scope.date_inicio + '&fecha_final=' + $scope.date_final);
                  $scope.CerrarModal();
                  break;
               case 'NS':
                  window.open('php/aseguramiento/reporte_ns.php?&fecha_inicio=' + $scope.date_inicio + '&fecha_final=' + $scope.date_final);
                  $scope.CerrarModal();
                  break;
               default:
                  break;
            }
         }


      }])