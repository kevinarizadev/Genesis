'use strict';
angular.module('GenesisApp')
  .controller('InfoDigitalizacionController', ['$scope', 'notification', '$rootScope', '$http', 'ngDialog', 'digitalizacionHTTP',
    function ($scope, notification, $rootScope, $http, ngDialog, digitalizacionHTTP) {
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

        $(document).ready(function () {
          $scope.startChange2 = function () {
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

          $scope.endChange2 = function () {
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

          var start = $("#fecha_star").kendoDatePicker({
            change: $scope.startChange2,
            format: "dd/MM/yyyy",
            culture: "es-MX",
            disableDates: ["su", "sa"],
            max: new Date()
          }).data("kendoDatePicker");

          var end = $("#fecha_end").kendoDatePicker({
            change: $scope.endChange2,
            format: "dd/MM/yyyy",
            culture: "es-MX",
            disableDates: ["su", "sa"],
            max: new Date()
          }).data("kendoDatePicker");

        });
      });

      $scope.tabI = true;
      $scope.tabII = false;
      $scope.activeI = 'active final';
      $scope.activeII = 'none';

      $scope.InformacionTabla = true;
      $scope.InformacionTablaFuncionario = true;

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
            $scope.ConsultarInformacion = false;
            $scope.ConsultarInformacion2 = true;
            break;
          case 2:
            $scope.tabI = false;
            $scope.tabII = true;
            $scope.activeI = 'none';
            $scope.activeII = 'active final';
            $scope.ConsultarInformacion = true;
            $scope.ConsultarInformacion2 = false;
            $scope.listarseccionales()
          default:

        }
      }
      $scope.setTab(1);

      $scope.fecha = {
        inicio: '',
        final: ''
      }

      $scope.fe = {
        inicio: '',
        final: '',
        seccional: '0'
      }

      $scope.Consultar = function (datos) {
        if (datos.inicio == '' || datos.inicio == undefined || datos.final == '' || datos.final == undefined) {
          swal('Notificacion', 'Debe Completar La Informacion', 'info');
        } else {
          $scope.reportes(datos);
        }

      }


      $scope.reportes = function (datos) {
        swal({ title: 'Cargando Informacion' }); swal.showLoading();

        digitalizacionHTTP.informe_cantidad_estado_documental(datos.inicio, datos.final).then(function (response) {
          console.log(response);
        });
        digitalizacionHTTP.informe_cantidad_tipo_documental(datos.inicio, datos.final).then(function (response) {
          if (response.length > 0) {
            $scope.InformacionTabla = false;
            $scope.informacion = response;
            setTimeout(function () {
              $scope.listSolicitudes = $('#tblSolicitudes').DataTable({
                destroy: true,
                responsive: true,
                dom: 'lBsfrtip',
                buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
                language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                lengthMenu: [[10, 50, -1], [10, 50, 'Todas']],
                order: [[0, "asc"]]
              });
              swal.close();
            }, 500);
          } else {
            swal('Genesis informa', 'No hay Informacion en el Reporte', 'warning');
          }
        });
      }


      $scope.ConsultarInformacionFuncionario = function (info) {
        if (info.inicio == '' || info.inicio == undefined || info.final == '' || info.final == undefined) {
          swal('Notificacion', 'Debe Completar La Informacion', 'info');
        } else if (info.seccional == '0') {
          swal('Notificacion', 'Debe Seleccionar Una Seccional', 'info');
        } else {
          $scope.reportesfuncionario(info);
        }

      }


      $scope.reportesfuncionario = function (info) {
        swal({ title: 'Cargando Informacion' }); swal.showLoading();
        digitalizacionHTTP.informe_cantidad_funcionario(info.seccional, info.inicio, info.final).then(function (response) {
          if (response.length > 0) {
            $scope.InformacionTablaFuncionario = false;
            $scope.respuesta = response;
            setTimeout(function () {
              $scope.funcionarioinfo = $('#tblinfofuncionario').DataTable({
                destroy: true,
                responsive: true,
                dom: 'lBsfrtip',
                buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
                language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                lengthMenu: [[10, 50, -1], [10, 50, 'Todas']],
                order: [[0, "asc"]]
              });
              swal.close();
            }, 500);
          } else {
            swal('Genesis informa', 'No hay Informacion en el Reporte', 'warning');
          }
        });
      }

      $scope.listarseccionales = function () {
        digitalizacionHTTP.obtener_seccionales().then(function (response) {
          $scope.secc = response;
        })
      }



    }]);
