'use strict';
angular.module('GenesisApp')
  .controller('calendariodirectivoController', ['$scope', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
    function ($scope, $http, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
      // Iniciar varibales
      $scope.admin = true;
      $scope.panel = false;
      $scope.CurrentDate = new Date();
      $scope.year = $scope.CurrentDate.getFullYear();
      $scope.v_search = false;
      $scope.userSelect = null;
      $scope.cronogramaVista = false;
      $scope.toggleSearch = function () {
        $scope.v_search = !$scope.v_search;
        $scope.filtrar = "";
      }
      $scope.toggleMenu = function () {
        $scope.cronogramaVista = !$scope.cronogramaVista;
      }
      $scope.viewType = function (value) {
        $scope.panel = value;
        // $scope.userSelect = null;
        // $scope.vacaciones_calendar = [];
      }
      $scope.dayNull = function (Init) {
        return { "width": "calc(14.28571428571429% * " + (Init-1) + ")" };
      }
      $scope.yearNext = function () {
        if ($scope.switch_view == false) {
          $scope.year++;
          $scope.calendario($scope.year);
          $scope.cronograma($scope.year);
        } else {

        }
      }
      $scope.yearPrev = function () {
        if ($scope.switch_view == false) {
          $scope.year--;
          $scope.calendario($scope.year);
          $scope.cronograma($scope.year);
        } else {

        }
      }
      $scope.calendario = function (year) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/planeacion/calendariodirectivo.php",
          data: {
            function: 'obtenerCalendario',
            year: year
          }
        }).then(function (response) {
          if (response.data[0].Codigo == 0) {
            $scope.calendar = [];
          } else {
            for (var i = 0; i < response.data.length; i++) {
              for (var j = 0; j < response.data[i].days.length; j++) {
                response.data[i].days[j].details = JSON.parse(response.data[i].days[j].details);
                response.data[i].days[j].festive = JSON.parse(response.data[i].days[j].festive);
              }
            }
            $scope.calendar = response.data;
          }
          swal.close();
        })
      }
      $scope.calendario($scope.year);
      $scope.cronograma = function (year) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/planeacion/calendariodirectivo.php",
          data: {
            function: 'obtenerCronograma',
            year: year
          }
        }).then(function (response) {
          if (response.data[0].Codigo == 0) {
            $scope.cronograma_lista = [];
          } else {
            $scope.cronograma_lista = response.data;
            console.log(response.data);
          }
          swal.close();
        })
      }
      $scope.cronograma($scope.year);
      $scope.colores_calendario = function (agendas, dia, mes, año) {
        if (agendas.length > 0) {
          $scope.colores = { red: 0, blue: 0, grey: 0 };
          agendas.forEach(function (item, i) {
            if (item.EstadoCal == "red") {
              $scope.colores.red++;
            } else if (item.EstadoCal == "blue") {
              $scope.colores.blue++;
            } else {
              $scope.colores.grey++;
            }
          });
          if (new Date(año, mes, dia).getTime() < new Date($scope.CurrentDate.getFullYear(), $scope.CurrentDate.getMonth(), $scope.CurrentDate.getDate()).getTime()) {
            if ($scope.colores.red > 0 && $scope.colores.blue == 0) {
              return "red";
            } else if ($scope.colores.blue > 0 && $scope.colores.red == 0) {
              return "blue";
            } else if ($scope.colores.blue > 0 && $scope.colores.red > 0) {
              return "blue red";
            } else {
              return "grey";
            }
          } else if (new Date(año, mes, dia).getTime() >= new Date($scope.CurrentDate.getFullYear(), $scope.CurrentDate.getMonth(), $scope.CurrentDate.getDate()).getTime()) {
            if ($scope.colores.red > 0 && $scope.colores.blue == 0) {
              return "red";
            } else if ($scope.colores.blue > 0 && $scope.colores.red == 0) {
              return "blue";
            } else if ($scope.colores.blue > 0 && $scope.colores.red > 0) {
              return "blue red";
            } else {
              return "grey";
            }
          }
        } else {
          return "";
        }
      }
      $scope.vacacionesList = function (year) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/planeacion/calendariodirectivo.php",
          data: {
            function: 'listar_Vacaciones',
            year: year
          }
        }).then(function (response) {
          if (response.data[0].Codigo == 0) {
            $scope.vacaciones = [];
          } else {
            $scope.vacaciones = response.data;
          }
          swal.close();
        })
      }
      $scope.vacacionesList($scope.year);
      $scope.vacaciones_calendar = [];
      $scope.verVaciones = function (cedula, nombre, cargo, inicio, fin, index, documento) {
        console.log(cedula, nombre, cargo, inicio, fin);
        if (index == $scope.userSelect) {
          $scope.userSelect = null;
          $scope.vacaciones_calendar = [];
        } else {
          $scope.userSelect = index;
          $http({
            method: 'POST',
            url: "php/planeacion/calendariodirectivo.php",
            data: {
              function: 'obtenerCalendario',
              year: $scope.year
            }
          }).then(function (response) {
            if (response.data[0].Codigo == 0) {
              $scope.vacaciones_calendar = [];
            } else {
              $scope.vacaciones_calendar = [];
              $scope.cedula_vac = cedula;
              $scope.nombre = nombre;
              $scope.cargo = cargo;
              $scope.fechaInicio = inicio;
              $scope.fechaFin = fin;
              $scope.documento = documento;
              for (let i = $scope.formatDateArray(inicio, 3) / 1; i <= $scope.formatDateArray(fin, 3) / 1; i++) {
                var obj = [response.data.find(mes => mes.num === i)];
                $scope.vacaciones_calendar = obj.concat($scope.vacaciones_calendar);
              }
            }
          })
        }
      }
      $scope.diasActivo = function (dia, mes) {
        if (new Date($scope.year, (mes - 1), dia).getTime() >= new Date($scope.formatDateArray($scope.fechaInicio, 4), ($scope.formatDateArray($scope.fechaInicio, 3) - 1), $scope.formatDateArray($scope.fechaInicio, 1)).getTime() && new Date($scope.year, (mes - 1), dia).getTime() <= new Date($scope.formatDateArray($scope.fechaFin, 4), ($scope.formatDateArray($scope.fechaFin, 3) - 1), $scope.formatDateArray($scope.fechaFin, 1)).getTime()) {
          return true;
        } else {
          return false;
        }
      }
      // $scope.vacaciones_calendar = [];
      $scope.verAgenda = function (vista, id_detalles, dia_num, dia_nombre, mes_nombre, mes_num, año) {
        console.log(vista, id_detalles, dia_num, dia_nombre, mes_nombre, mes_num, año);
        $scope.admin;
        $scope.tipo = $scope.panel;
        $scope.dia_num_select = dia_num;
        $scope.dia_nombre_select = dia_nombre;
        $scope.mes_nombre_select = mes_nombre;
        $scope.mes_num_select = mes_num;
        $scope.año_select = año;
        if (vista == 2) {
          $scope.tipoVista = 2;
          $scope.id_detalles = id_detalles;
        } else if (vista == 1) {
          $scope.tipoVista = (id_detalles.length > 0) ? 0 : 1;
          $scope.id_detalles = id_detalles;
        }
        ngDialog.open({
          template: 'views/planeacion/Modalcalendariodirectivo.html',
          className: 'ngdialog-theme-plain',
          controller: 'ModalcalendariodirectivoController',
          scope: $scope,
          preCloseCallback: function (response) {
            if (response == 0) {
              $scope.calendario($scope.year);
              $scope.cronograma($scope.year);
            }
            return true;
          }
        });
      }
      $scope.dayNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
      $scope.monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      $scope.verAgendaInsert = function (vista, id_detalles, dia_num, dia_nombre, mes_nombre, mes_num, año) {
        console.log(vista, id_detalles, dia_num, dia_nombre, mes_nombre, mes_num, año);
        $scope.admin;
        $scope.tipo = $scope.panel;
        $scope.dia_num_select = dia_num;
        $scope.dia_nombre_select = dia_nombre;
        $scope.mes_nombre_select = mes_nombre;
        $scope.mes_num_select = mes_num;
        $scope.año_select = año;
        if (vista == 2) {
          $scope.tipoVista = 2;
          $scope.id_detalles = id_detalles;
        } else if (vista == 1) {
          $scope.tipoVista = (id_detalles.length > 0) ? 0 : 1;
          $scope.id_detalles = id_detalles;
        }
        ngDialog.open({
          template: 'views/planeacion/Modalcalendariodirectivo.html',
          className: 'ngdialog-theme-plain',
          controller: 'ModalcalendariodirectivoController',
          scope: $scope,
          preCloseCallback: function (response) {
            if (response == 0) {
              $scope.calendario($scope.year);
              $scope.cronograma($scope.year);
            }
            return true;
          }
        });
      }
      $scope.horaText = function (caso) {
        switch (caso) {
          case "7:00":
            return "7:00 a.m.";
          case "8:00":
            return "8:00 a.m.";
          case "9:00":
            return "9:00 a.m.";
          case "10:00":
            return "10:00 a.m.";
          case "11:00":
            return "11:00 a.m.";
          case "12:00":
            return "12:00 p.m.";
          case "13:00":
            return "1:00 p.m.";
          case "14:00":
            return "2:00 p.m.";
          case "15:00":
            return "3:00 p.m.";
          case "16:00":
            return "4:00 p.m.";
          case "17:00":
            return "5:00 p.m.";
          case "18:00":
            return "6:00 p.m.";
          case "19:00":
            return "7:00 p.m.";
          case "20:00":
            return "8:00 p.m.";
          case "21:00":
            return "9:00 p.m.";
          case "22:00":
            return "10:00 p.m.";
          case "23:00":
            return "1:00 p.m.";
          case "24:00":
            return "12:00 a.m.";
          case "1:00":
            return "1:00 a.m.";
          case "2:00":
            return "2:00 a.m.";
          case "3:00":
            return "3:00 a.m.";
          case "4:00":
            return "4:00 a.m.";
          case "5:00":
            return "5:00 a.m.";
          case "6:00":
            return "6:00 a.m.";
        }
      }
      $scope.agregar_editar_vacaciones = function (value = null) {
        $scope.tipo = $scope.panel;
        $scope.tipoVista = 3;
        $scope.id = value;
        $scope.cargo = $scope.cargo;
        $scope.fechaInicio = $scope.fechaInicio;
        $scope.fechaFin = $scope.fechaFin;
        $scope.documento = $scope.documento;
        $scope.nombre = $scope.nombre;
        ngDialog.open({
          template: 'views/planeacion/Modalcalendariodirectivo.html',
          className: 'ngdialog-theme-plain',
          controller: 'ModalcalendariodirectivoController',
          scope: $scope,
          preCloseCallback: function (response) {
            if (response == 0) {
              $scope.userSelect = null;
              $scope.vacaciones_calendar = [];
              $scope.vacacionesList($scope.year);
            }
            return true;
          }
        });
      }
      $scope.borrar_vacaciones = function (value) {
        $scope.vacaciones_datos = {
          numero: value,
          finicial: "",
          ffinal: "",
          documento: "",
          accion: "D"
        };
        swal({
          title: 'Confirmar Proceso',
          text: "¿Desea eliminar el registro #" + value + " ?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then(function (result) {
          if (result) {
            $http({
              method: 'POST',
              url: "php/planeacion/calendariodirectivo.php",
              data: {
                function: 'accion_Vacaciones',
                json: JSON.stringify($scope.vacaciones_datos)
              }
            }).then(function (response) {
              if (response.data.Codigo == 0) {
                $scope.userSelect = null;
                $scope.vacaciones_calendar = [];
                $scope.vacacionesList($scope.year);
                swal('Completado', response.data.Mensaje, 'success');
              } else {
                swal('Mensaje', response.data.mensaje, 'warning');
              };
            });
          } else {
            swal('Mensaje', "No se borro el registro #" + value, 'warning');
          };
        }).catch(swal.noop);
      }
      $scope.formatDateArray = function (value, tipo) {
        var temp = value.split("-");
        return temp[tipo];
      }
    }])