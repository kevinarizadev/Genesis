'use strict';
angular.module('GenesisApp')
  .controller('colmenaController', ['$scope', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
    function ($scope, $http, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
      // Iniciar varibales
      $scope.admin = false;
      $scope.v_search = false;


      // Indentificar si es admin con el rolcod
      var dat = { prov: 'navb' };
      $.getJSON("php/obtenersession.php", dat).done(function (respuesta) {
        $scope.sesdata = respuesta;
        $scope.codigoROL = $scope.sesdata.rolcod;
        $scope.cedula = $scope.sesdata.cedula;
        $scope.codigo_cargo = sessionStorage.getItem("codigo_cargo");
        // if ($scope.codigo_cargo == '100' || $scope.codigo_cargo == '115' || $scope.cedula == 19446515 || $scope.cedula == 1007277894 || $scope.cedula == 1045739217) {
        if ($scope.cedula == 1045235368 || $scope.cedula == 1045739217) {
          $scope.admin = true;
        } else {
          $scope.admin = false;
        }
      }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error obteniendo variables en la colmena");
      });


      // Variables para identificar que perfil es (revisa,reporta,elabora,publico)
      $scope.cuenta_Gestiona = function () {
        $http({
          method: 'POST',
          url: "php/planeacion/colmena.php",
          data: {
            function: 'cuenta_Gestiona'
          }
        }).then(function (response) {
          $scope.gestiona = response.data;
          $scope.misReportesCreados = $scope.gestiona[0].ADMIN;
          if ($scope.misReportesCreados.length > 0) {
            $scope.admin = true;
          }
          $scope.misRevisa = $scope.gestiona[1].REVISA;
          $scope.misReporta = $scope.gestiona[2].REPORTA;
          $scope.misElabora = $scope.gestiona[3].ELABORA;
          console.log("ADMIN:", $scope.admin);
          console.log($scope.misReportesCreados.length, "Creados", $scope.misReportesCreados);
          console.log($scope.misRevisa.length, "Revisa", $scope.misRevisa);
          console.log($scope.misReporta.length, "Reporta", $scope.misReporta);
          console.log($scope.misElabora.length, "Elabora", $scope.misElabora);
          // variables de visualizacion

        })
      }
      $scope.cuenta_Gestiona();


      // Mostrar/Ocultar Buscador
      $scope.toggleSearch = function () {
        $scope.v_search = !$scope.v_search;
        $scope.filtrar = "";
      }
      $scope.panel = false;
      $scope.null = [];
      $scope.CurrentDate = new Date();
      $scope.viewType = function (value) {
        $scope.panel = value;
        if ($scope.treporte == "Mis reportes") {
          if (value) {
            $scope.programacion($scope.year);
          } else {
            $scope.calendario($scope.year);
          }
        } else if ($scope.treporte == "Todos los reportes") {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          if (value) {
            $scope.programming = $scope.misReporta.concat($scope.misRevisa).concat($scope.misElabora);
          } else {
            for (let i = 0; i < $scope.calendar.length; i++) {
              for (let j = 0; j < $scope.calendar[i].days.length; j++) {
                if ($scope.calendar[i].days[j].details.length > 0) {
                  $scope.calendar[i].days[j].details = $scope.compararArray($scope.calendar[i].days[j].details);
                }
              }
            }
          }
          setTimeout(() => {
            swal.close();
          }, 300);
        }
      }
      $scope.dayNull = function (Init) {
        if(Init=="0"){
          Init=7;
        }else{
          Init=Init;
        }
        return { "width": "calc(14.28571428571429% * " + (Init-1) + ")" };
      }
      $scope.verDetalleReporte = function (dia, nombre, mes, mesnum, año, details) {
        if (details.length > 0 || new Date(año, (mesnum - 1), dia).getTime() >= new Date($scope.CurrentDate.getFullYear(), $scope.CurrentDate.getMonth(), $scope.CurrentDate.getDate()).getTime()) {
          if ($scope.admin == true) {
            $scope.tipo = $scope.panel;
            $scope.detalles = details;
            $scope.daySelect = dia;
            $scope.nameSelect = nombre;
            $scope.monthSelect = mes;
            $scope.monthNumSelect = mesnum;
            $scope.yearSelect = año;
            $scope.vista = { panel: ($scope.detalles.length == 0) ? 1 : 0 };
            $scope.admin;
            $scope.gestiona;
            $scope.cedula;
            $scope.treporte;
            ngDialog.open({
              template: 'views/planeacion/Modalcolmena.html',
              className: 'ngdialog-theme-plain',
              controller: 'ModalcolmenaController',
              scope: $scope,
              preCloseCallback: function (response) {
                if (response == 0) {
                  $scope.calendario($scope.year);
                }
                return true;
              }
            });
          } else if ($scope.admin == false && details.length > 0) {
            $scope.tipo = $scope.panel;
            $scope.detalles = details;
            $scope.daySelect = dia;
            $scope.nameSelect = nombre;
            $scope.monthSelect = mes;
            $scope.monthNumSelect = mesnum;
            $scope.yearSelect = año;
            $scope.vista = { panel: 0 };
            $scope.admin;
            $scope.gestiona;
            $scope.cedula;
            $scope.treporte;
            ngDialog.open({
              template: 'views/planeacion/Modalcolmena.html',
              className: 'ngdialog-theme-plain',
              controller: 'ModalcolmenaController',
              scope: $scope,
              preCloseCallback: function (response) {
                if (response == 0) {
                  $scope.calendario($scope.year);
                }
                return true;
              }
            });
          } else if ($scope.admin == false && details.length == 0) {
            swal({
              title: 'Advertencia',
              text: 'No estas autorizado para crear reportes',
              type: 'warning',
              confirmButtonText: 'Aceptar'
            });
          }
        } else {
          if ($scope.admin == true) {
            swal({
              title: 'Advertencia',
              text: 'Solo se puede agendar un reporte apartir de la fecha actual',
              type: 'warning',
              confirmButtonText: 'Aceptar'
            });
          } else {
            swal({
              title: 'Advertencia',
              text: 'No estas autorizado para crear reportes',
              type: 'warning',
              confirmButtonText: 'Aceptar'
            });
          }
        };
      }
      $scope.formatDateArray = function (value, tipo) {
        var temp = value.split("-");
        return temp[tipo];
      }
      // Devuelve la fecha actual en un formato m/d/a
      $scope.formatDate = function (date) {
        var dia = date.getDate();
        var mes = date.getMonth() + 1;
        var año = date.getFullYear();
        return mes + '/' + dia + '/' + año;
      }
      $scope.year = $scope.CurrentDate.getFullYear();
      $scope.yearNext = function () {
        $scope.year++;
        $scope.calendario($scope.year);
        $scope.programacion($scope.year);
      }
      $scope.yearPrev = function () {
        $scope.year--;
        if ($scope.year >= 2019) {
          $scope.calendario($scope.year);
          $scope.programacion($scope.year);
        } else {
          $scope.calendar = [];
          $scope.programming = [];
        }
      }
      $scope.programacion = function (year) {
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
          url: "php/planeacion/colmena.php",
          data: {
            function: 'obtenerProgramacion',
            year: year
          }
        }).then(function (response) {
          if (response.data[0].Codigo == 0) {
            $scope.programming = [];
          } else {
            $scope.programming = response.data;
            console.log(response.data);
          }
          swal.close();
        })
      }
      $scope.programacion($scope.year);
      $scope.verReporte = function (vista, numero, dia, nombre, mes, mesnum, año) {
        $http({
          method: 'POST',
          url: "php/planeacion/colmena.php",
          data: {
            function: 'verReporte',
            numero: JSON.stringify(numero)
          }
        }).then(function (response) {
          console.log(response.data);
          $scope.detalleReporte = response.data;
          $scope.tipo = $scope.panel;
          $scope.detalles = [];
          $scope.daySelect = dia;
          $scope.nameSelect = nombre;
          $scope.monthSelect = mes;
          $scope.monthNumSelect = mesnum;
          $scope.yearSelect = año;
          $scope.vista = { panel: vista };
          $scope.admin;
          $scope.gestiona;
          $scope.cedula;
          ngDialog.open({
            template: 'views/planeacion/Modalcolmena.html',
            className: 'ngdialog-theme-plain',
            controller: 'ModalcolmenaController',
            scope: $scope,
            preCloseCallback: function (response) {
              if (response == 0) {
                $scope.calendario($scope.year);
              }
              return true;
            }
          });
        });
      }
      $scope.editarReporte = function () {
        alert("editar");
      }
      function splitArray(string, position, ident) {
        var temp = string.split(ident);
        return temp[position];
      };
      function getCelandario(year) {
        return new Promise(function (resolve, reject) {
          $http({
            method: 'POST',
            url: "php/planeacion/colmena.php",
            data: {
              function: 'obtenerCalendario',
              year: year
            }
          }).then(function (response_0) {
            $http({
              method: 'POST',
              url: "php/planeacion/colmena.php",
              data: {
                function: 'obtenerProgramacion_Temp',
                year: year
              }
            }).then(function (response_1) {
              if (response_0.data.length == 0 || response_1.data.length == 0) {
                resolve(0);
              } else {
                response_0.data.forEach(function (item_0, i) {
                  item_0.days.forEach(function (item_1, j) {
                    response_0.data[i].days[j].details = JSON.parse(response_0.data[i].days[j].details);
                    response_0.data[i].days[j].festive = JSON.parse(response_0.data[i].days[j].festive);
                  });
                });
                if (response_1.data[0].Codigo != 0) {
                  response_1.data.forEach(function (item, i) {
                    var mes = (splitArray(item.fecha, 1, "/") * 1), dia = (splitArray(item.fecha, 0, "/") * 1);
                    response_0.data[mes - 1].days[dia - 1].details = item.array;
                  });
                }
                resolve(response_0.data);
              }
            });
          });
        });
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
        var promise = getCelandario(year);
        promise.then(function (result) {
          console.log(result);
          if (result != 0) {
            $scope.calendar = result;
            $scope.$apply();
          } else {
            $scope.calendar = [];
          }
          swal.close();
        });
      }
      $scope.calendario($scope.year);
      $scope.colores_calendario = function (reportes, dia, mes, año) {
        if (reportes.length > 0) {
          $scope.colores = { grey: 0, orange: 0, ok: 0, red: 0 };
          for (const i in reportes) {
            if (reportes.hasOwnProperty(i)) {
              reportes[i];
              if (reportes[i].EstadoCal == "red") {
                $scope.colores.red++;
              } else if (reportes[i].EstadoCal == "ok") {
                $scope.colores.ok++;
              } else if (reportes[i].EstadoCal == "orange") {
                $scope.colores.orange++;
              } else {
                $scope.colores.grey++;
              }
            }
          }
          if (new Date(año, mes, dia).getTime() < new Date($scope.CurrentDate.getFullYear(), $scope.CurrentDate.getMonth(), $scope.CurrentDate.getDate()).getTime()) {
            if ($scope.colores.red > 0) {
              return "red";
            } else if ($scope.colores.ok > 0 && $scope.colores.red == 0) {
              return "ok";
            } else {
              return "";
            }
          } else if (new Date(año, mes, dia).getTime() == new Date($scope.CurrentDate.getFullYear(), $scope.CurrentDate.getMonth(), $scope.CurrentDate.getDate()).getTime()) {
            if ($scope.colores.red > 0) {
              return "red";
            } else if ($scope.colores.ok > 0 && $scope.colores.red == 0) {
              return "ok";
            } else {
              return "grey";
            }
          } else if (new Date(año, mes, dia).getTime() > new Date($scope.CurrentDate.getFullYear(), $scope.CurrentDate.getMonth(), $scope.CurrentDate.getDate()).getTime()) {
            if ($scope.colores.orange > 0) {
              return "orange";
            } else if ($scope.colores.ok > 0 && $scope.colores.red == 0 && $scope.colores.orange == 0 && $scope.colores.grey == 0) {
              return "ok";
            } else if ($scope.colores.ok == 0 && $scope.colores.red > 0 && $scope.colores.orange == 0 && $scope.colores.grey == 0) {
              return "red";
            } else {
              return "grey";
            }
          }
        } else {
          return "";
        }
      }
      $scope.gestionarReportes = function () {
        if ($scope.admin == true) {
          $http({
            method: 'POST',
            url: "php/planeacion/colmena.php",
            data: {
              function: 'obtenerGestion',
              year: $scope.year
            }
          }).then(function (response) {
            if (response.data[0].Codigo == 0) {
              $scope.gestion = [];
              swal('Informacion', 'No se encontraron reportes para gestionar en el año ' + $scope.year, 'info');
            } else {
              $scope.tipo = $scope.panel;
              $scope.detalles = [];
              $scope.daySelect = 0;
              $scope.nameSelect = "";
              $scope.monthSelect = 0;
              $scope.monthNumSelect = 0;
              $scope.yearSelect = 0;
              $scope.vista = { panel: 3 };
              $scope.gestion = response.data;
              $scope.admin;
              $scope.gestiona;
              $scope.cedula;
              ngDialog.open({
                template: 'views/planeacion/Modalcolmena.html',
                className: 'ngdialog-theme-plain',
                controller: 'ModalcolmenaController',
                scope: $scope,
                preCloseCallback: function (response) {
                  if (response == 0) {
                    $scope.programacion($scope.year);
                    $scope.calendario($scope.year);
                  }
                  return true;
                }
              });
            }
          });
        } else {
          if ($scope.misRevisa.length > 0) {
            $scope.tipo = $scope.panel;
            $scope.detalles = [];
            $scope.daySelect = 0;
            $scope.nameSelect = "";
            $scope.monthSelect = 0;
            $scope.monthNumSelect = 0;
            $scope.yearSelect = 0;
            $scope.vista = { panel: 3 };
            $scope.gestion = $scope.misRevisa;
            console.log($scope.misRevisa);
            $scope.admin;
            $scope.gestiona;
            $scope.cedula;
            ngDialog.open({
              template: 'views/planeacion/Modalcolmena.html',
              className: 'ngdialog-theme-plain',
              controller: 'ModalcolmenaController',
              scope: $scope,
              preCloseCallback: function (response) {
                if (response == 0) {
                  $scope.programacion($scope.year);
                  $scope.calendario($scope.year);
                }
                return true;
              }
            });
          } else {
            $scope.gestion = [];
            swal('Informacion', 'No tienes reportes para revisar', 'info');
          }
        }
      }
      $scope.treporte = "Mis reportes";
      $scope.compararArray = function (details) {
        var arrayTemp = [];
        var i = details.length;
        while (i--) {
          var obj = undefined;
          var temp = "";
          if ($scope.misRevisa.length > 0) {
            obj = $scope.misRevisa.find(r => r.numero === details[i].code);
            temp = (obj != undefined) ? obj : temp;
          }
          if ($scope.misReporta.length > 0) {
            obj = $scope.misReporta.find(r => r.numero === details[i].code);
            temp = (obj != undefined) ? obj : temp;
          }
          if ($scope.misElabora.length > 0) {
            obj = $scope.misElabora.find(r => r.numero === details[i].code);
            temp = (obj != undefined) ? obj : temp;
          }
          if (temp != "") {
            arrayTemp.push({ "code": temp.numero, "name": temp.nombre_reporte, "EstadoCal": temp.estado });
          }
        }
        return arrayTemp;
      }
      $scope.misReportes = function () {
        if ($scope.misRevisa.length > 0 || $scope.misReporta.length > 0 || $scope.misElabora.length > 0) {
          if ($scope.treporte == "Mis reportes") {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });
            for (let i = 0; i < $scope.calendar.length; i++) {
              for (let j = 0; j < $scope.calendar[i].days.length; j++) {
                if ($scope.calendar[i].days[j].details.length > 0) {
                  $scope.calendar[i].days[j].details = $scope.compararArray($scope.calendar[i].days[j].details);
                }
              }
            }
            $scope.temporal = $scope.calendar;
            $scope.calendar = [];
            $scope.programming = $scope.misReporta.concat($scope.misRevisa).concat($scope.misElabora);
            $scope.treporte = "Todos los reportes";
            setTimeout(() => {
              $scope.calendar = $scope.temporal;
              $scope.$apply();
              console.log($scope.calendar);
              swal.close();
            }, 300);
          } else if ($scope.treporte == "Todos los reportes") {
            $scope.programacion($scope.year);
            $scope.calendario($scope.year);
            $scope.treporte = "Mis reportes";
          }
        } else {
          swal('Mensaje', 'No tienes reportes asignados', 'warning');
        }
      }
      // Borrar 
      $scope.borrarReporte = function (numero) {
        swal({
          title: 'Confirmar Proceso',
          text: "¿Desea eliminar el reporte #" + numero + " ?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then(function (result) {
          if (result) {
            $scope.reporte = {
              numero: numero,
              accion: "D",
              codigo_reporte: "",
              fecha_reporte: "",
              hora: "",
              dias_notifica: "",
              frecuencia: "",
              objetivo: "",
              entes: "",
              tipo_norma: "",
              anno_norma: "",
              norma: "",
              link_norma: "",
              link_anexo: "",
              tipo_archivo: "",
              cant_archivo: "",
              delimitado: "",
              elabora: "",
              revisa: "",
              reporta: "",
              estado: "A",
              link_cargue: "",
              fecha_cargue: "",
              estadop: "X"
            };
            $http({
              method: 'POST',
              url: "php/planeacion/colmena.php",
              data: {
                function: 'insertarReporte',
                json: JSON.stringify($scope.reporte)
              }
            }).then(function (response) {
              if (response.data.Codigo == 0) {
                $scope.programacion($scope.year);
                // swal('Completado', response.data.Mensaje, 'success');
              } else {
                swal('Mensaje', response.data.mensaje, 'warning');
              };
            });
          } else {
            swal('Mensaje', response.data.mensaje, 'warning');
          };
        }).catch(swal.noop);
      }
    }])