'use strict';
angular.module('GenesisApp')
  .controller('paneladminController', ['$scope', '$http', 'menuopcioneshttp', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window', '$location', '$anchorScroll',
    function ($scope, $http, menuopcioneshttp, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window, $location, $anchorScroll) {
      $scope.typeUser = "funcionarios";
      $scope.modulos_all = [];
      function validar_json(str) {
        try {
          if (typeof str !== "string") {
            return false;
          } else {
            return (typeof JSON.parse(str) === 'object');
          }
        } catch (e) {
          return false;
        }
      }
      $scope.user = { nit: "", cedula: "" };
      $scope.change_modulos = function (value) {
        switch (value) {
          case "funcionarios":
            $scope.user = { nit: "2222222222", cedula: "2222222222" };
            break;
          case "afiliados":
            $scope.user = { nit: "", cedula: "" };
            break;
          case "ips":
            $scope.user = { nit: "1111111111", cedula: "1111111111" };
            break;
          case "empresas":
            $scope.user = { nit: "", cedula: "" };
            break;
          default:
            $scope.user = { nit: "", cedula: "" };
            break;
        }
        if ($scope.user.nit != "" && $scope.user.cedula != "") {
          $scope.json_todos = [];
          $http({
            method: 'POST',
            url: "php/tic/configuracionacceso/configuracionacceso.php",
            data: {
              function: 'get_json',
              nit: $scope.user.nit,
              cedula: $scope.user.cedula
            }
          }).then(function (response) {
            if (validar_json(angular.toJson(response.data)) && response.data != undefined && response.data != "" && response.data != null && response.data.length > 0) {
              $scope.modulos_all = response.data;
              response.data.forEach(e => {
                e.options.forEach(x => {
                  $scope.json_todos.push(x.url);
                });
              });
              console.log($scope.modulos_all);
              console.log($scope.json_todos);
            } else {
              $scope.modulos_all = [];
            }
          });
        } else {
          $scope.modulos_all = [];
        }
      }
      $scope.change_modulos("funcionarios");
      // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.getRoles = function () {
        $http({
          method: 'POST',
          url: "php/tic/paneladmin/paneladmin.php",
          data: {
            function: 'getRole'
          }
        }).then(function (response) {
          $scope.roles = response.data;
        });
      }
      $scope.getRoles();
      $scope.filter_roles = "";
      $scope.filter_modules = "";
      $scope.filter_roles_cod = "";
      $scope.temAgregar = [];
      $scope.temBorrar = [];
      $scope.temEstado = [];
      $scope.collapse = { level: null, level_modulos: null };
      $scope.moduloTitle = "";
      $scope.id_user = "";
      $scope.subModuloDisabled = [];
      $scope.modulos = [];
      $scope.getModuloBase = function () {
        $http({
          method: 'POST',
          url: "php/tic/configuracionacceso/configuracionacceso.php",
          data: {
            function: 'get_json',
            nit: "2222222222",
            cedula: "2222222222"
          }
        }).then(function (response) {
          $scope.modulosBase = response.data;
        });
      };
      $scope.getModuloBase();
      $scope.getModulo = function (rol, name) {
        $scope.set = { rol: rol, name: name };
        var set = JSON.stringify($scope.set);
        $scope.getModuloBase();
        $http({
          method: 'POST',
          url: "php/tic/paneladmin/paneladmin.php",
          data: {
            function: 'getModulo',
            data: set
          }
        }).then(function (response) {
          $scope.modulos = response.data;
          //console.log($scope.modulos);
          for (const i in $scope.modulos) {
            if ($scope.modulos.hasOwnProperty(i)) {
              try {
                for (const j in $scope.modulos[i].options) {
                  if ($scope.modulos[i].options.hasOwnProperty(j)) {
                    $scope.modulos[i].options[j] = { titulo: $scope.modulos[i].options[j].titulo, url: $scope.modulos[i].options[j].url, estado: true, id: $scope.idSolution($scope.modulos[i].options[j].id) };
                    var objeto1 = $scope.modulos[i].options;
                    var objeto2 = null;
                    objeto2 = null;
                    for (const z in $scope.modulosBase) {
                      if ($scope.modulosBase.hasOwnProperty(z)) {
                        for (const r in $scope.modulosBase[z].options) {
                          if ($scope.modulosBase[z].options.hasOwnProperty(r)) {
                            $scope.modulosBase[z].options[r] = { titulo: $scope.modulosBase[z].options[r].titulo, url: $scope.modulosBase[z].options[r].url, estado: true, id: $scope.idSolution($scope.modulosBase[z].options[r].id) };
                            if ($scope.modulosBase[z].titulo == $scope.modulos[i].titulo) {
                              objeto2 = $scope.modulosBase[z].options;
                              break;
                            }
                          }
                        }
                      }
                    }
                    if (objeto2 != null && objeto1) {
                      var desabled = objeto2.filter(obj => {
                        const existsSub = objeto1.some(obj2 => (
                          obj2.titulo === obj.titulo
                        ));
                        if (!existsSub) {
                          return desabled;
                        }
                      });
                      if (desabled.length > 0) {
                        for (const key in desabled) {
                          if (desabled.hasOwnProperty(key)) {
                            desabled[key] = Object.defineProperty(desabled[key], 'estado', { value: false });
                            $scope.modulos[i].options.push(desabled[key]);
                          }
                        }
                      }
                    }
                  }
                }
              } catch (error) {
                swal('Advertencia', 'Error: ' + error, 'warning');
                console.log($scope.modulos);
                $scope.modulos = response.data;
              }
            }
          }
          for (const i in $scope.modulos) {
            if ($scope.modulos.hasOwnProperty(i)) {
              $scope.modulos[i].options = cleanArray($scope.modulos[i].options);
            }
          }
          $scope.collapse.level = null;
          $scope.moduloTitle = name + " : " + rol;
        });
      };
      $scope.btn = { icon: false };
      $scope.ModuloAdd = function () {
        if ($scope.btn.icon == false) {
          $scope.btn.icon = true;
        } else {
          $scope.btn.icon = false;
        };
        $scope.getModuloBase();
        $scope.temAgregar = [];
        $scope.temporal = {};
        if ($scope.modulosBase && $scope.modulos) {
          $scope.temporal = $scope.modulosBase.filter(obj => {
            const exists = $scope.modulos.some(obj2 => (
              obj2.titulo === obj.titulo
            ));
            if (!exists) {
              return $scope.temporal;
            }
          });
          for (const i in $scope.temporal) {
            if ($scope.temporal.hasOwnProperty(i)) {
              for (const j in $scope.temporal[i].options) {
                if ($scope.temporal[i].options.hasOwnProperty(j)) {
                  $scope.temporal[i].options[j] = { titulo: $scope.temporal[i].options[j].titulo, url: $scope.temporal[i].options[j].url, estado: true, id: $scope.idSolution($scope.temporal[i].options[j].id) };
                }
              }
            }
          }
          $scope.moduloAdd = $scope.temporal;
        }
      }
      $scope.idSolution = function (value) {
        if (value != undefined && value != "" && value != null) {
          return value;
        } else {
          return "";
        }
      }
      $scope.checkboxAgregar = function (i, check, data) {
        if (check == false) {
          $scope.temAgregar[i] = null;
        } else if (check == true) {
          $scope.temAgregar[i] = data;
        }
      }
      $scope.BtnAgregar = function () {
        $scope.temAgregar = cleanArray($scope.temAgregar);
        for (const key in $scope.temAgregar) {
          if ($scope.temAgregar.hasOwnProperty(key)) {
            $scope.modulos.push($scope.temAgregar[key]);
          }
        }
        $scope.collapse.level = null;
        $scope.btn.icon = false;
      }
      $scope.checkboxBorrar = function (i, check, data) {
        if (check == false) {
          $scope.temBorrar[i] = null;
        } else if (check == true) {
          $scope.temBorrar[i] = data;
        }
      }
      $scope.BtnBorrar = function () {
        $scope.temBorrar = cleanArray($scope.temBorrar);
        $scope.modulos = $scope.modulos.filter(obj => {
          const exists = $scope.temBorrar.some(obj2 => (
            obj2.titulo === obj.titulo
          ));
          if (!exists) {
            return obj;
          }
        });
        $scope.temBorrar = [];
        $scope.collapse.level = null;
      }
      $scope.checkboxEstado = function (modulo_titulo, check, submodulo_titulo) {
        if (check == false) {
          for (const i in $scope.modulos) {
            if ($scope.modulos.hasOwnProperty(i)) {
              if ($scope.modulos[i].titulo == modulo_titulo) {
                for (const j in $scope.modulos[i].options) {
                  if ($scope.modulos[i].options.hasOwnProperty(j)) {
                    if ($scope.modulos[i].options[j].titulo == submodulo_titulo) {
                      $scope.modulos[i].options[j] = { titulo: $scope.modulos[i].options[j].titulo, url: $scope.modulos[i].options[j].url, estado: true, id: $scope.idSolution($scope.modulos[i].options[j].id) };
                    }
                  }
                }
              }
            }
          }
        } else if (check == true) {
          for (const i in $scope.modulos) {
            if ($scope.modulos.hasOwnProperty(i)) {
              if ($scope.modulos[i].titulo == modulo_titulo) {
                for (const j in $scope.modulos[i].options) {
                  if ($scope.modulos[i].options.hasOwnProperty(j)) {
                    if ($scope.modulos[i].options[j].titulo == submodulo_titulo) {
                      $scope.modulos[i].options[j].estado = false;
                    }
                  }
                }
              }
            }
          }
        }
      }
      $scope.updateJson = function () {
        $scope.update = [{ rol: $scope.set.rol, json: [] }];
        for (const i in $scope.modulos) {
          if ($scope.modulos.hasOwnProperty(i)) {
            var stade = false;
            for (const j in $scope.modulos[i].options) {
              if ($scope.modulos[i].options.hasOwnProperty(j)) {
                if ($scope.modulos[i].options[j].estado == true) {
                  stade = true;
                }
              }
            }
            if (stade) {
              $scope.update[0].json[i] = { titulo: $scope.modulos[i].titulo, icono: $scope.modulos[i].icono, options: [] }
              for (const j in $scope.modulos[i].options) {
                if ($scope.modulos[i].options.hasOwnProperty(j)) {
                  if ($scope.modulos[i].options[j].estado == true) {
                    $scope.update[0].json[i].options[j] = { titulo: $scope.modulos[i].options[j].titulo, url: $scope.modulos[i].options[j].url, id: $scope.idSolution($scope.modulos[i].options[j].id) };
                  }
                }
              }
            }
          }
        }
        $scope.update[0].json = cleanArray($scope.update[0].json);
        for (const i in $scope.update[0].json) {
          if ($scope.update[0].json.hasOwnProperty(i)) {
            $scope.update[0].json[i].options = cleanArray($scope.update[0].json[i].options);
          }
        }
        //console.log($scope.update);
        $http({
          method: 'POST',
          url: "php/tic/paneladmin/paneladmin.php",
          data: {
            function: 'updateModulo',
            u_rol: JSON.stringify($scope.update[0].rol),
            u_json: JSON.stringify($scope.update[0].json)
          }
        }).then(function (response) {
          swal('Completado', response.data.mensaje, 'success');
          $scope.getModulo($scope.set.rol, $scope.set.name);
        });
      }
      $scope.new_modulo = function (Imputtitulo, Imputicono) {
        $scope.modulos.push({ titulo: Imputtitulo, icono: Imputicono, options: [] });
      }
      $scope.new_submodulo = function (modulo_titulo, Imputtitulo, Imputurl) {
        for (const i in $scope.modulos) {
          if ($scope.modulos.hasOwnProperty(i)) {
            if ($scope.modulos[i].titulo == modulo_titulo) {
              $scope.modulos[i].options.push({ titulo: Imputtitulo, url: Imputurl, estado: true });
            }
          }
        }
      }
      $scope.url_auto = function (texto) {
        var url = "";
        for (let i = 0; i < texto.length; i++) {
          if (texto.charAt(i) != " ") {
            url += texto.charAt(i);
          }
        }
        return url;
      }
      function cleanArray(actual) {
        var newArray = new Array();
        for (var i = 0, j = actual.length; i < j; i++) {
          if (actual[i]) {
            newArray.push(actual[i]);
          }
        }
        return newArray;
      }
      $scope.filtrarUser = function () {
        $http({
          method: 'POST',
          url: "php/tic/paneladmin/paneladmin.php",
          data: {
            function: 'getModuloUser',
            user: $scope.id_user
          }
        }).then(function (response) {
          if (response.data[0].Codigo == 404) {
            swal('Advertencia', 'El usuario no esta registrado', 'warning');
            $scope.modulos = [];
            $scope.moduloTitle = "";
          } else {
            $scope.getModulo(response.data[0].CODIGO, response.data[0].NOMBRE);
          }
        });
      };
      $scope.TourInit = { active: false, valide: false };
      $scope.guideTour = function () {
        if ($scope.TourInit.active == false) {
          $scope.TourInit.active = true;
          $scope.Now = 0;
          $scope.steps = [
            { ir: '#inicio', posicion: 'right', flecha: false, style: 'margin: 1em!important;', titulo: 'Bienvenido a la guía interactiva', descripcion: 'Te daremos un breve recorrido y explicaremos cada opción del Panel Administrativo.' },
            { ir: '#step1', posicion: 'right', flecha: true, style: '', titulo: 'Todos los roles:', descripcion: 'Click sobre el titulo de un rol para mostrar los MODULOS a los cuales ese rol puede acceder.' },
            { ir: '#step2', posicion: 'left', flecha: true, style: '', titulo: 'Modulos:', descripcion: 'Click sobre el titulo de un modulo para mostrar los SUBMODULOS a los cuales ese modulo tiene acceso.' },
            { ir: '#step3', posicion: 'left', flecha: false, style: '', titulo: 'Buscar:', descripcion: 'Click sobre el titulo de un rol para mostrar los MODULOS a los cuales ese rol puede acceder.' },
            { ir: '#inicio', posicion: 'bottom', flecha: true, style: 'margin: 1em!important;', titulo: 'Fin de la guía interactiva', descripcion: 'Has finalizado el recorrido ahora puedes usar el Panel Administrativo.' }
          ];
          $scope.positionStep($scope.Now);
          $scope.dataStep($scope.Now);
          $("#ayuda").removeClass("icon-help").addClass("icon-cancel");
        } else {
          $scope.TourInit.active = false;
          $("#ayuda").removeClass("icon-cancel").addClass("icon-help");
          $($scope.steps[$scope.Now].ir).removeClass("focusElement");
        }
      };
      $scope.nextStep = function () {
        if ($scope.Now >= 0 && $scope.Now < ($scope.steps.length - 1)) {
          $($scope.steps[$scope.Now].ir).removeClass("focusElement");
          $scope.Now = $scope.Now + 1;
          if ($scope.Now != ($scope.steps.length - 1)) {
            $($scope.steps[$scope.Now].ir).addClass("focusElement");
          }
          $scope.positionStep($scope.Now);
        } else {
          $scope.guideTour();
        }
      }
      $scope.backStep = function () {
        if ($scope.Now > 0 && $scope.Now < ($scope.steps.length - 1)) {
          $($scope.steps[$scope.Now].ir).removeClass("focusElement");
          $scope.Now = $scope.Now - 1;
          if ($scope.Now != 0) {
            $($scope.steps[$scope.Now].ir).addClass("focusElement");
          }
          $scope.positionStep($scope.Now);
        } else if ($scope.Now > 0 && $scope.Now == ($scope.steps.length - 1)) {
          $scope.guideTour();
          $scope.guideTour();
        } else {
          $scope.guideTour();
        }
      }
      $scope.dataStep = function (num) {
        $scope.tituloStep = $scope.steps[num].titulo;
        $scope.descripcionStep = $scope.steps[num].descripcion;
        if (num == 0) {
          $scope.btnBack = "Cerrar";
          $scope.btnNext = "Iniciar";
        } else if ($scope.steps.length == num + 1) {
          $scope.btnBack = "Reiniciar";
          $scope.btnNext = "Finalizar";
        } else {
          $scope.btnBack = "Atras";
          $scope.btnNext = "Siguiente";
        }
      };
      $scope.positionStep = function (num) {
        $scope.dataStep(num);
        setTimeout(() => {
          var ir = $scope.steps[num].ir;
          var posicion = $scope.steps[num].posicion;

          var coordenadas = $(ir).position();
          coordenadas.width = $(ir).outerWidth();
          coordenadas.height = $(ir).outerHeight();
          var TourCoordenadas = $("#TourStep").position();
          TourCoordenadas.width = $("#TourStep").width();
          TourCoordenadas.height = $("#TourStep").height();
          var x = 0;
          var y = 0;
          // console.log(coordenadas);
          // console.log(TourCoordenadas);
          // if (num != 0) {
          //   $("#TourStep>*").addClass("btnOpacity");
          //   $timeout(function () {
          //     $scope.dataStep(num);
          //     $("#TourStep>*").removeClass("btnOpacity");
          //   }, 312.5);
          // }else {
          //   $scope.dataStep(num);
          // }
          $("#TourStep").removeAttr("style");
          $("#TourStep").attr("style", $scope.steps[num].style);
          switch (posicion) {
            case "top":
              x = (coordenadas.left);
              y = (coordenadas.top - TourCoordenadas.height);
              $("#TourStep").css({ "transform": "translate(" + x + "px, " + y + "px)" });
              break;
            case "right":
              x = (coordenadas.left + coordenadas.width);
              y = coordenadas.top;
              $("#TourStep").css({ "transform": "translate(" + x + "px, " + y + "px)" });
              break;
            case "bottom":
              x = (coordenadas.left);
              y = (coordenadas.top + coordenadas.height);
              $("#TourStep").css({ "transform": "translate(" + x + "px, " + y + "px)" });
              break;
            case "left":
              x = (coordenadas.left - TourCoordenadas.width);
              y = coordenadas.top;
              $("#TourStep").css({ "transform": "translate(" + x + "px, " + y + "px)" });
              break;
            case "center":
              x = coordenadas.left;
              y = coordenadas.top;
              $("#TourStep").css({ "transform": "translate(" + x + "px, " + y + "px)" });
              break;
            default:
              x = 0;
              y = 0;
            // $("#TourStep").css({ "transform": "translate(0, 0)" });
          }
          $("#StepTriangle").removeAttr('class');
          if ($scope.steps[num].flecha) {
            $("#StepTriangle").addClass(posicion + " btnRotate");
          }
          setTimeout(() => {
            window.scroll(x, (y - 30));
            // document.getElementById(TourStep).scrollIntoView({ block: 'start', behavior: 'smooth' });
          }, 600);
        });
        // console.log("#" + ir);
        // console.log("X: " + coordenadas.left + " Y: " + coordenadas.top);
        // console.log("Width: " + coordenadas.width + " Height: " + coordenadas.height);
      }
      $scope.ver_iconos = false;
      $scope.iconos = [];
      $scope.title_modulo_add = "";
      $scope.icono_select = "icon-ellipsis-vert";
      $scope.filter_titulo_list = "";
      $scope.collapse.level_modulos = null;
      $http({
        method: "get",
        url: "https://genesis.cajacopieps.com//json/tic/icon-fontello.json"
      }).then(function (response) {
        if (response.data.length > 0) {
          $scope.iconos = response.data;
        } else {
          $scope.iconos = [];
        }
      });
      $scope.click_icon = function (icon) {
        $scope.icono_select = icon;
        $scope.ver_iconos = false;
      }
      $scope.new_modulo_add = function (modulo_new, icono_new) {
        if (modulo_new != "" && icono_new != "") {
          var i = $scope.modulos_all.findIndex(elemt => elemt.titulo.toLowerCase() == modulo_new.toLowerCase());
          if (i == -1) {
            $scope.modulos_all.push({ titulo: modulo_new, icono: icono_new, options: [] });
            $scope.title_modulo_add = "";
            $scope.icono_select = "icon-ellipsis-vert";
          } else {
            swal('Titulo Duplicado', 'No se puede repetir el mismo titulo: ' + modulo_new, 'warning');
          }
        } else {
          swal('Titulo Vacio', 'No puedes dejar campos vacios', 'warning');
        }
      }
      $scope.title_submodulo_add = "";
      $scope.url_submodulo_add = "";
      $scope.new_submodulo_add = function (modulo_titulo, submodulo_new, url_new) {
        if (modulo_titulo != "" && submodulo_new != "" && url_new != "") {
          if (validar_json(angular.toJson($scope.modulos_all)) && $scope.modulos_all != undefined && $scope.modulos_all != "" && Array.isArray($scope.modulos_all)) {
            var i = $scope.modulos_all.findIndex(elemt => elemt.titulo.toLowerCase() == modulo_titulo.toLowerCase());
            if (i != -1) {
              var y = $scope.json_todos.findIndex(elemt => elemt.toLowerCase() == url_new.toLowerCase());
              if (y == -1) {
                var arrayTemp = [];
                $scope.modulos_all.forEach(element => {
                  if (element.options.length > 0) {
                    arrayTemp = arrayTemp.concat(element.options);
                  }
                });
                if (arrayTemp != undefined && Array.isArray(arrayTemp)) {
                  var j = arrayTemp.findIndex(elemt => elemt.url.toLowerCase() == url_new.toLowerCase());
                  if (j == -1) {
                    $scope.modulos_all[i].options.push({ titulo: submodulo_new, url: url_new });
                    $scope.title_submodulo_add = "";
                    $scope.url_submodulo_add = "";
                  } else {
                    swal('Url Duplicada', 'No se puede repetir la misma Url: ' + url_new, 'warning');
                  }
                }
              } else {
                swal('Mara repetido', 'Debe cambiar el nombre del mara, no se puede repetir: ' + url_new, 'warning');
              }
            } else {
              swal('Titulo no encontrado', 'No se pudo encontrar el modulo: ' + modulo_titulo, 'warning');
            }
          } else {
            swal('Error', 'El JSON de permisos no es valido', 'error');
          }
        } else {
          swal('Campos Vacios', 'No puedes dejar campos vacios', 'warning');
        }
      }
      $scope.delete_modulo = function (modulo) {
        if (validar_json(angular.toJson($scope.modulos_all)) && $scope.modulos_all != undefined && $scope.modulos_all != "" && Array.isArray($scope.modulos_all)) {
          var i = $scope.modulos_all.findIndex(elemt => elemt.titulo.toLowerCase() == modulo.titulo.toLowerCase());
          if (i != -1) {
            $scope.modulos_all.splice(i, 1);
          } else {
            swal('Titulo no encontrado', 'No se pudo encontrar el modulo: ' + modulo, 'warning');
          }
        }
      }
      $scope.delete_submodulo = function (modulo, submodulo) {
        if (validar_json(angular.toJson($scope.modulos_all)) && $scope.modulos_all != undefined && $scope.modulos_all != "" && Array.isArray($scope.modulos_all)) {
          var i = $scope.modulos_all.findIndex(elemt => elemt.titulo.toLowerCase() == modulo.titulo.toLowerCase());
          if (i != -1) {
            if ($scope.modulos_all[i].options != undefined && $scope.modulos_all[i].options != "" && Array.isArray($scope.modulos_all[i].options)) {
              var j = $scope.modulos_all[i].options.findIndex(elemt => elemt.url.toLowerCase() == submodulo.url.toLowerCase());
              if (j != -1) {
                $scope.modulos_all[i].options.splice(j, 1);
              }
            }
          } else {
            swal('Titulo no encontrado', 'No se pudo encontrar el modulo: ' + modulo, 'warning');
          }
        }
      }
      $scope.saveJson = function () {
        if (validar_json(angular.toJson($scope.modulos_all)) && $scope.modulos_all != undefined && $scope.modulos_all != "" && Array.isArray($scope.modulos_all)) {
          $http({
            method: 'POST',
            url: "php/tic/configuracionacceso/configuracionacceso.php",
            data: {
              function: 'set_json_user',
              nit: $scope.user.nit,
              cedula: $scope.user.cedula,
              responsable: sessionStorage.getItem('cedula'),
              json: angular.toJson($scope.modulos_all)
            }
          }).then(function (response) {
            if (response.data[0].codigo == "0") {
              swal('Registro Actualizado', 'Se actualizo correctamente el modulo de: ' + $scope.typeUser, 'success');
            } else {
              swal('Error con los permisos', 'No se pudo guardar el modulo de: ' + $scope.typeUser, 'warning');
            }
          });
        }
      }
    }])