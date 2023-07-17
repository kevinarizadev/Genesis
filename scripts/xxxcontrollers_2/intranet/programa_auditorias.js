'use strict';
angular.module('GenesisApp')
  .controller('programa_auditoriasController', ['$scope', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
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
      }
      $scope.dayNull = function (Init) {
        if(Init=="0"){
          Init=7;
        }else{
          Init=Init;
        }
        return { "width": "calc(14.28571428571429% * " + (Init-1) + ")" };
      }
      $scope.switch_view = false;
      $scope.yearNext = function () {
        if ($scope.switch_view == false) {
          $scope.year++;
          $scope.calendario($scope.year);
          // $scope.cronograma($scope.year);
        } else {

        }
      }
      $scope.yearPrev = function () {
        if ($scope.switch_view == false) {
          $scope.year--;
          $scope.calendario($scope.year);
          // $scope.cronograma($scope.year);
        } else {

        }
      }
      function obtenes_dias(mes, year) {
        return new Promise(function (resolve, reject) {
          $http({
            method: 'POST',
            url: "php/intranet/programa_auditoria.php",
            data: {
              function: 'listar_calendario_dias',
              mes: mes,
              año: year
            }
          }).then(function (response2) {
            resolve(response2);
          })
        });
      }
      $scope.calendario = function (year) {
        var promesas = new Array();
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
          url: "php/intranet/programa_auditoria.php",
          data: {
            function: 'listar_calendario_auditoria',
            year: year
          }
        }).then(function (response) {
          if (response.data[0].Codigo == 0) {
            $scope.calendar = [];
          } else {
            for (var i = 0; i < response.data.length; i++) {
              promesas[i] = obtenes_dias(response.data[i].num, response.data[i].year);
              promesas[i];
            }
            Promise.all(promesas).then(values => {
              values.forEach(function (element, k) {
                response.data[k].days = element.data;
                for (var j = 0; j < response.data[k].days.length; j++) {
                  response.data[k].days[j].details = JSON.parse(response.data[k].days[j].details);
                  response.data[k].days[j].festive = JSON.parse(response.data[k].days[j].festive);
                }
              });
              $scope.calendar = response.data;
              swal.close();
            });
          }
        })
      }
      $scope.calendario($scope.year);
      // $scope.cronograma = function (year) {
      //   swal({
      //     html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
      //     width: 200,
      //     allowOutsideClick: false,
      //     allowEscapeKey: false,
      //     showConfirmButton: false,
      //     animation: false
      //   });
      //   $http({
      //     method: 'POST',
      //     url: "php/intranet/programa_auditoria.php",
      //     data: {
      //       function: 'obtenerCronograma',
      //       year: year
      //     }
      //   }).then(function (response) {
      //     if (response.data[0].Codigo == 0) {
      //       $scope.cronograma_lista = [];
      //     } else {
      //       $scope.cronograma_lista = response.data;
      //       console.log(response.data);
      //     }
      //     swal.close();
      //   })
      // }
      // $scope.cronograma($scope.year);
      $scope.colores_calendario = function (agendas, dia, mes, año) {
        if (agendas.length > 0) {
          if (new Date(año, mes, dia).getTime() < new Date($scope.CurrentDate.getFullYear(), $scope.CurrentDate.getMonth(), $scope.CurrentDate.getDate()).getTime()) {
            return "grey";
          } else {
            return "green";
          }
        } else {
          return "";
        }
      }
      $scope.diasActivo = function (dia, mes) {
        if (new Date($scope.year, (mes - 1), dia).getTime() >= new Date($scope.formatDateArray($scope.fechaInicio, 4), ($scope.formatDateArray($scope.fechaInicio, 3) - 1), $scope.formatDateArray($scope.fechaInicio, 1)).getTime() && new Date($scope.year, (mes - 1), dia).getTime() <= new Date($scope.formatDateArray($scope.fechaFin, 4), ($scope.formatDateArray($scope.fechaFin, 3) - 1), $scope.formatDateArray($scope.fechaFin, 1)).getTime()) {
          return true;
        } else {
          return false;
        }
      }
      $scope.dayNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
      $scope.monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      $scope.modal_auditorias = function (vista, id_detalles, dia_num, dia_nombre, mes_nombre, mes_num, año) {
        if (id_detalles.length > 0 || new Date(año, (mes_num - 1), dia_num).getTime() >= new Date($scope.CurrentDate.getFullYear(), $scope.CurrentDate.getMonth(), $scope.CurrentDate.getDate()).getTime()) {
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
            template: 'views/intranet/modal_programa_auditorias.html',
            className: 'ngdialog-theme-plain',
            controller: 'modal_programa_auditoriaController',
            scope: $scope,
            preCloseCallback: function (response) {
              console.log(response);
              if (response != "" && response != "$closeButton" && response != "$document") {
                if (response.codigo == 0) {
                  swal('Completado', response.mensaje, 'success');
                } else {
                  swal('Mensaje', response.mensaje, 'error');
                }
              }
              var promesas = new Array();
              $http({
                method: 'POST',
                url: "php/intranet/programa_auditoria.php",
                data: {
                  function: 'listar_calendario_auditoria',
                  year: $scope.year
                }
              }).then(function (response) {
                if (response.data[0].Codigo == 0) {
                  $scope.calendar = [];
                } else {
                  for (var i = 0; i < response.data.length; i++) {
                    promesas[i] = obtenes_dias(response.data[i].num, response.data[i].year);
                    promesas[i];
                  }
                  Promise.all(promesas).then(values => {
                    values.forEach(function (element, k) {
                      response.data[k].days = element.data;
                      for (var j = 0; j < response.data[k].days.length; j++) {
                        response.data[k].days[j].details = JSON.parse(response.data[k].days[j].details);
                        response.data[k].days[j].festive = JSON.parse(response.data[k].days[j].festive);
                      }
                    });
                    $scope.calendar = response.data;
                    swal.close();
                  });
                }
              })
              //$scope.calendario($scope.year);
              // $scope.cronograma($scope.year);
              return true;
            }
          });
        } else {
          swal({
            title: 'Advertencia',
            text: 'Solo se puede crear una auditoria apartir de la fecha actual',
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
        }
      }
      $scope.formatDateArray = function (value, tipo) {
        if (value != undefined && value != "") {
          var temp = value.split("-");
          return temp[tipo];
        } else {
          return "";
        }
      }
    }])