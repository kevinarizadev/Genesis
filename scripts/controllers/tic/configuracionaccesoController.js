'use strict';
angular.module('GenesisApp')
  .controller('configuracionaccesoController', ['$scope', '$http',
    function ($scope, $http) {
      console.log(111111111);
      $scope.vista = { panel_1: true, panel_2: false, panel_title_2: false, add_modulos: false, playJson: false };
      $scope.toggleSearch = function () {
        $scope.v_search = !$scope.v_search;
        $scope.filtrar = "";
      }
      $scope.typeUser = "";
      $scope.typeUser = "ips";
      $scope.usuario_genesis = "9138014,32624689,45579044,52518498,72005925";
      // $scope.typeUser = "funcionarios";
      document.querySelector('input[name=groupRadio][value=ips]').checked = true;
      $scope.filter_fun_1 = "";
      $scope.filter_fun_2 = "";
      $scope.form = {
        nit: "",
        cedula: "",
        nombre: "",
        ccargo: "",
        ncargo: "",
        crol: "",
        nrol: "",
        json: []
      };
      $scope.filter_datos_1 = [{ nombre: "SELECCIONAR", codigo: "" }, { nombre: "TODOS", codigo: "T" }, { nombre: "ROL", codigo: "R" }, { nombre: "AREA", codigo: "A" }, { nombre: "CARGO", codigo: "C" }];
      $scope.filter_datos_2 = [{ nombre: "SELECCIONAR", codigo: "" }];
      $scope.lis_users = [];
      $scope.change_filter_fun_1 = function (type_filter_1) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        switch (type_filter_1) {
          case "T":
            $scope.clear_all_check();
            $http({
              method: 'POST',
              url: "php/tic/configuracionacceso/configuracionacceso.php",
              data: {
                function: 'get_funcionarios',
                filtro: "T",
                codigo: "0"
              }
            }).then(function (response) {
              if (response.data.length > 0 && Array.isArray(response.data)) {
                $scope.lis_users = response.data;
              } else {
                $scope.lis_users = [];
              }
              swal.close();
            });
            break;
          case "R":
            $http({
              method: 'POST',
              url: "php/tic/configuracionacceso/configuracionacceso.php",
              data: {
                function: 'get_selet_rol'
              }
            }).then(function (response) {
              if (response.data.length > 0 && Array.isArray(response.data)) {
                $scope.filter_datos_2 = response.data;
              } else {
                $scope.filter_datos_2 = [];
              }
              $scope.lis_users = [];
              swal.close();
            });
            break;
          case "A":
            $http({
              method: 'POST',
              url: "php/tic/configuracionacceso/configuracionacceso.php",
              data: {
                function: 'get_selet_area'
              }
            }).then(function (response) {
              if (response.data.length > 0 && Array.isArray(response.data)) {
                $scope.filter_datos_2 = response.data;
              } else {
                $scope.filter_datos_2 = [];
              }
              $scope.lis_users = [];
              swal.close();
            });
            break;
          case "C":
            $http({
              method: 'POST',
              url: "php/tic/configuracionacceso/configuracionacceso.php",
              data: {
                function: 'get_selet_cargo'
              }
            }).then(function (response) {
              if (response.data.length > 0 && Array.isArray(response.data)) {
                $scope.filter_datos_2 = response.data;
              } else {
                $scope.filter_datos_2 = [];
              }
              $scope.lis_users = [];
              swal.close();
            });
            break;
          default:
            $scope.lis_users = [];
            $scope.filter_datos_2 = [{ nombre: "SELECCIONAR", codigo: "" }];
            swal.close();
            break;
        }
      }

      $scope.change_filter_fun_2 = function (type_filter_1, codigo_filter_1) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        if (codigo_filter_1 != "" && type_filter_1 != "") {
          $scope.clear_all_check();
          switch (type_filter_1) {
            case "R":
              $http({
                method: 'POST',
                url: "php/tic/configuracionacceso/configuracionacceso.php",
                data: {
                  function: 'get_funcionarios',
                  filtro: "R",
                  codigo: codigo_filter_1
                }
              }).then(function (response) {
                if (response.data.length > 0 && Array.isArray(response.data)) {
                  $scope.lis_users = response.data;
                } else {
                  $scope.lis_users = [];
                }
                swal.close();
              });
              break;
            case "A":
              $http({
                method: 'POST',
                url: "php/tic/configuracionacceso/configuracionacceso.php",
                data: {
                  function: 'get_funcionarios',
                  filtro: "A",
                  codigo: codigo_filter_1
                }
              }).then(function (response) {
                if (response.data.length > 0 && Array.isArray(response.data)) {
                  $scope.lis_users = response.data;
                } else {
                  $scope.lis_users = [];
                }
                swal.close();
              });
              break;
            case "C":
              $http({
                method: 'POST',
                url: "php/tic/configuracionacceso/configuracionacceso.php",
                data: {
                  function: 'get_funcionarios',
                  filtro: "C",
                  codigo: codigo_filter_1
                }
              }).then(function (response) {
                if (response.data.length > 0 && Array.isArray(response.data)) {
                  $scope.lis_users = response.data;
                } else {
                  $scope.lis_users = [];
                }
                swal.close();
              });
              break;
            default:
              $scope.lis_users = [];
              $scope.filter_datos_2 = [{ nombre: "SELECCIONAR", codigo: "" }];
              swal.close();
              break;
          }
        }
      }
      $scope.collapse = { level: null, level_add: false };
      $scope.json_temp = [];
      $scope.modulos = [];
      $scope.editarUser = function (user) {
        if ($scope.typeUser == 'funcionarios') {
          $http({
            method: 'POST',
            url: "php/tic/configuracionacceso/configuracionacceso.php",
            data: {
              function: 'get_info_user',
              nit: user.nit,
              cedula: user.cedula
            }
          }).then(function (response) {
            if (response.data.length > 0) {
              $http({
                method: 'POST',
                url: "php/tic/configuracionacceso/configuracionacceso.php",
                data: {
                  function: 'get_json',
                  nit: user.nit,
                  cedula: user.cedula
                }
              }).then(function (response_2) {
                if (response.data[0].json != "0") {
                  $http({
                    method: 'POST',
                    url: "php/tic/configuracionacceso/configuracionacceso.php",
                    data: {
                      function: 'get_json_modulos_admin',
                      tipo: 'F'
                    }
                  }).then(function (response_3) {
                    $scope.vista.panel_2 = true;
                    $scope.vista.panel_title_2 = true;
                    $scope.form.nit = user.nit;
                    $scope.form.cedula = user.cedula;
                    $scope.form.nombre = user.nombre;
                    $scope.form.ccargo = response.data[0].cargo;
                    $scope.form.ncargo = response.data[0].nombrecargo;
                    $scope.form.crol = response.data[0].rol;
                    $scope.form.nrol = response.data[0].nombrerol;

                    $scope.json_temp = response_3.data;
                    $scope.modulos = response_2.data;
                    // $scope.cloneHeadFixed(1);
                  });
                } else {
                  console.log("Error obteniendo JSON");
                }
              });
            }
          });
        } else if ($scope.typeUser == 'ips') {

          $http({
            method: 'POST',
            url: "php/tic/configuracionacceso/configuracionacceso.php",
            data: {
              function: 'get_json',
              nit: user.nit,
              cedula: user.cedula
            }
          }).then(function ({ data }) {
            if (data[0].json != "0") {
              $http({
                method: 'POST',
                url: "php/tic/configuracionacceso/configuracionacceso.php",
                data: {
                  function: 'get_json_modulos_admin',
                  tipo: 'I'
                }
              }).then(function (response_2) {
                $scope.vista.panel_2 = true;
                $scope.vista.panel_title_2 = true;
                $scope.form.nit = user.nit;
                $scope.form.cedula = user.cedula;
                $scope.form.nombre = user.nombre;

                $scope.json_temp = response_2.data;
                $scope.modulos = data;
                // $scope.cloneHeadFixed(1);
              });
            } else {
              console.log("Error obteniendo JSON");
            }
          });
        }

      }
      $scope.addModulos = function (value) {
        if (!value) {
          const tipo = $scope.typeUser == 'funcionarios' ? 'F' : 'I'
          $http({
            method: 'POST',
            url: "php/tic/configuracionacceso/configuracionacceso.php",
            data: {
              function: 'get_json_modulos_admin',
              tipo
            }
          }).then(function (response_3) {
            if (response_3.data != undefined && response_3.data != null && response_3.data.length > 0) {
              $scope.json_temp = response_3.data.filter(obj => {
                const exists = $scope.modulos.some(obj2 => (
                  obj.titulo == obj2.titulo
                ));
                if (!exists) {
                  return true;
                }
              });
            } else {
              $scope.json_temp = []
            }
          });
        }
      }
      $scope.submodulos_add = [];
      $scope.addSubmodulos = function (modulo, submodulos, ver) {
        if (!ver) {
          const tipo = $scope.typeUser == 'funcionarios' ? 'F' : 'I'
          $http({
            method: 'POST',
            url: "php/tic/configuracionacceso/configuracionacceso.php",
            data: {
              function: 'get_json_modulos_admin',
              tipo
            }
          }).then(function (response_3) {
            if (response_3.data != undefined && response_3.data != null && response_3.data.length > 0) {
              var i = response_3.data.findIndex(elemt => elemt.titulo == modulo.titulo);
              if (i != -1) {
                $scope.submodulos_add = response_3.data[i].options.filter(obj => {
                  const exists = submodulos.some(obj2 => (
                    obj.url == obj2.url
                  ));
                  if (!exists) {
                    return true;
                  }
                });
              }
            } else {
              $scope.submodulos_add = [];
            }
          });
        } else {
          $scope.submodulos_add = [];
        }
      }
      $scope.add_delete_submodulos = function (value, modulo, submodulo) {
        if (value) {
          var i = $scope.modulos.findIndex(elemt => elemt.titulo == modulo.titulo);
          if (i != -1) {
            $scope.modulos[i].options.push(submodulo);
            var j = $scope.submodulos_add.findIndex(elemt => elemt.url == submodulo.url);
            if (j != -1) {
              $scope.submodulos_add.splice(j, 1);
            }
          }
        } else {
          var i = $scope.modulos.findIndex(elemt => elemt.titulo == modulo.titulo);
          if (i != -1) {
            var j = $scope.modulos[i].options.findIndex(elemt => elemt.url == submodulo.url);
            if (j != -1) {
              $scope.modulos[i].options.splice(j, 1);
              $scope.addSubmodulos(modulo, $scope.modulos[i].options, false);
            }
          }
        }
      }
      $scope.check_user = [];
      $scope.list_users_update_json = [];
      $scope.select_all = false;
      $scope.checkbox_select_users = function (index, check_value, user) {
        $scope.vista.panel_2 = true;
        $scope.vista.panel_title_2 = false;
        $scope.lis_users[index].checked = !$scope.lis_users[index].checked;
        if (check_value) {
          var i = $scope.list_users_update_json.findIndex(elemt => elemt.cedula == user.cedula);
          if (i == -1) {
            $scope.list_users_update_json.push(user);
          } else {
            console.log("Usuario repetido: " + user.cedula);
          }
        } else {
          $scope.select_all = false;
          var i = $scope.list_users_update_json.findIndex(elemt => elemt.cedula == user.cedula);
          if (i != -1) {
            $scope.list_users_update_json.splice(i, 1);
          }
        }
      }
      $scope.checkboxAllSelect = function (check_value) {
        if ($scope.lis_users.length > 0) {
          $scope.vista.panel_2 = true;
          $scope.vista.panel_title_2 = false;
          if (check_value) {
            $scope.lis_users.forEach(function (element, index) {
              var i = $scope.list_users_update_json.findIndex(elemt => elemt.cedula == element.cedula);
              if (i == -1) {
                $scope.list_users_update_json.push(element);
              } else {
                console.log("Usuario repetido: " + element.cedula);
              }
              $scope.check_user[index] = check_value;
              $scope.lis_users[index].checked = check_value;
            });
          } else {
            $scope.lis_users.forEach(function (element, index) {
              var i = $scope.list_users_update_json.findIndex(elemt => elemt.cedula == element.cedula);
              if (i != -1) {
                $scope.list_users_update_json.splice(i, 1);
              }
              $scope.check_user[index] = check_value;
              $scope.lis_users[index].checked = check_value;
            });
          }
        } else {
          swal('Advertencia', 'No hay usuarios para seleccionar', 'warning');
        }
      }
      $scope.down_json = function (user) {
        $http({
          method: 'POST',
          url: "php/tic/configuracionacceso/configuracionacceso.php",
          data: {
            function: 'get_json',
            nit: user.nit,
            cedula: user.cedula
          }
        }).then(function (response) {
          if (response.data != undefined && response.data != "" && response.data != null && validar_json(angular.toJson(response.data))) {
            $scope.modulos = JSON.parse(angular.toJson(response.data));
          } else {
            console.log("Error obteniendo json de: " + user.cedula);
          }
        });
      }
      $scope.clear_all_check = function () {
        if (document.querySelectorAll("input[type=checkbox]") != undefined && document.querySelectorAll("input[type=checkbox]").length > 0) {
          document.querySelectorAll("input[type=checkbox]").forEach(function (element, index) {
            if ((document.querySelectorAll("input[type=checkbox]").length - 1) != index) {
              if ($scope.lis_users[index] != undefined && $scope.check_user[index] != undefined) {
                $scope.lis_users[index].checked = false;
                $scope.check_user[index] = false;
              }
            }
            element.checked = false;
          });
          $scope.select_all = false;
        }
      }
      $scope.delete_list_user_all = function () {
        if ($scope.list_users_update_json.length > 0 && Array.isArray($scope.list_users_update_json)) {
          $scope.list_users_update_json = [];
          $scope.clear_all_check();
        }
      }
      $scope.delete_list_user = function (user) {
        var i = $scope.list_users_update_json.findIndex(elemt => elemt.cedula == user.cedula);
        if (i != -1) {
          $scope.list_users_update_json.splice(i, 1);
        }
        $scope.clear_all_check();
      }
      $scope.json_play = [];
      $scope.playJson = function (user) {
        $http({
          method: 'POST',
          url: "php/tic/configuracionacceso/configuracionacceso.php",
          data: {
            function: 'get_json',
            nit: user.nit,
            cedula: user.cedula
          }
        }).then(function (response) {
          if (response.data[0].json != "0" && validar_json(angular.toJson(response.data)) && response.data != undefined && response.data != "" && response.data != null && response.data.length > 0) {
            $scope.nombre_play = user.nombre;
            $scope.cedula_play = user.cedula;
            $scope.json_play = response.data;

            // $scope.json_play.forEach(function (obj, indiceActual, arreglo) {
            //   var i = arreglo.findIndex(elemt => elemt.titulo == obj.titulo);
            //   if (i == indiceActual) {
            //     $scope.json_play[indiceActual].class = "red";
            //   } else {
            //     $scope.json_play[indiceActual].class = "red";
            //   }
            // })

          } else {
            console.log("Error obteniendo json de: " + user.cedula);
            $scope.nombre_play = "";
            $scope.cedula_play = "";
            $scope.json_play = [];
          }
        });
      }
      $scope.add_modulo = function (modulo) {
        $scope.modulos.push(modulo);
        var i = $scope.json_temp.findIndex(elemt => elemt.titulo == modulo.titulo);
        if (i != -1) {
          $scope.json_temp.splice(i, 1);
        }
      }
      $scope.add_all_modulo = function () {
        if ($scope.json_temp.length > 0 && Array.isArray($scope.json_temp)) {
          $scope.json_temp.forEach(function (modulo, index) {
            $scope.modulos.push(modulo);
            if (($scope.json_temp.length - 1) == index) {
              $scope.json_temp = [];
            }
          });
        }
      }
      $scope.delete_modulo = function (modulo) {
        var i = $scope.modulos.findIndex(elemt => elemt.titulo == modulo.titulo);
        if (i != -1) {
          $scope.modulos.splice(i, 1);
        }
      }
      $scope.clear_json = function () {
        $scope.modulos = [];
      }
      $scope.saveJson = function () {
        var responsable = sessionStorage.getItem("cedula");
        if ($scope.modulos != undefined && $scope.modulos != "" && $scope.modulos != null && $scope.modulos.length > 0 && Array.isArray($scope.modulos) && validar_json(angular.toJson($scope.modulos))) {
          if ($scope.form.nit != "" && $scope.form.cedula != "" && responsable != "") {
            $http({
              method: 'POST',
              url: "php/tic/configuracionacceso/configuracionacceso.php",
              data: {
                function: 'set_json_user',
                nit: $scope.form.nit,
                cedula: $scope.form.cedula,
                responsable: responsable,
                json: angular.toJson($scope.modulos)
              }
            }).then(function (response) {
              if (response.data[0].codigo == "0") {
                swal('Registro Actualizado', 'Se guardaron los permisos de acceso para el usuario: ' + $scope.form.nombre, 'success');
              } else {
                swal('Error', 'Al intentar actualizar los permisos a la cedula: ' + $scope.form.cedula, 'error');
              }
            });
          } else {
            swal('Error', 'Verificar datos como el NIT: ' + $scope.form.nit + ', Cedula: ' + $scope.form.cedula + ' o el responsable:' + responsable, 'error');
          }
        } else {
          swal.close();
          swal('Error', 'Los permisos no deben estar vacios y debe ser un JSON valido', 'error');
        }
      }
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
      function update_json_user_delete_modulo(user, modulos_set) {
        const promise = new Promise(function (resolve, reject) {
          $http({
            method: 'POST',
            url: "php/tic/configuracionacceso/configuracionacceso.php",
            data: {
              function: 'get_json',
              nit: user.nit,
              cedula: user.cedula
            }
          }).then(function (response) {
            let json_get_user = response.data;
            if (json_get_user != undefined && json_get_user != "" && json_get_user != null && json_get_user.length > 0 && validar_json(angular.toJson(json_get_user))) {
              modulos_set.forEach(function (modulo, i) {
                var i_1 = json_get_user.findIndex(elemt => elemt.titulo == modulo.titulo);
                if (i_1 != -1) {
                  // Borrar modulo
                  json_get_user.splice(i_1, 1);
                  if ((modulos_set.length - 1) == i) {
                    resolve(json_get_user);
                  }
                } else {
                  if ((modulos_set.length - 1) == i) {
                    resolve(json_get_user);
                  }
                }
              });
            } else {
              reject(new Error('Error obteniendo JSON'));
            }
          });
        })
        return promise
      }
      function update_json_user_delete_submodulo(user, modulos_set) {
        const promise = new Promise(function (resolve, reject) {
          $http({
            method: 'POST',
            url: "php/tic/configuracionacceso/configuracionacceso.php",
            data: {
              function: 'get_json',
              nit: user.nit,
              cedula: user.cedula
            }
          }).then(function (response) {
            let json_get_user = response.data;
            if (json_get_user != undefined && json_get_user != "" && json_get_user != null && json_get_user.length > 0 && validar_json(angular.toJson(json_get_user))) {
              modulos_set.forEach(function (modulo, i) {
                var i_1 = json_get_user.findIndex(elemt => elemt.titulo == modulo.titulo);
                if (i_1 != -1) {
                  if (modulo.options.length > 0) {
                    modulo.options.forEach(function (element_1, j) {
                      var j_2 = json_get_user[i_1].options.findIndex(elemt => elemt.url == element_1.url);
                      if (j_2 != -1) {
                        // Borra submodulo
                        json_get_user[i_1].options.splice(j_2, 1);
                        if ((modulo.options.length - 1) == j) {
                          json_get_user.forEach(function (el, index) {
                            if (el.options.length == 0) {
                              json_get_user.splice(index, 1);
                            }
                          });
                          resolve(json_get_user);
                        }
                      } else {
                        if ((modulo.options.length - 1) == j) {
                          json_get_user.forEach(function (el, index) {
                            if (el.options.length == 0) {
                              json_get_user.splice(index, 1);
                            }
                          });
                          resolve(json_get_user);
                        }
                      }
                    });
                  } else {
                    if ((modulos_set.length - 1) == i) {
                      resolve(json_get_user);
                    }
                  }
                } else {
                  if ((modulos_set.length - 1) == i) {
                    json_get_user.forEach(function (el, index) {
                      if (el.options.length == 0) {
                        json_get_user.splice(index, 1);
                      }
                    });
                    resolve(json_get_user);
                  }
                }
              });
            } else {
              reject(new Error('Error obteniendo JSON'));
            }
          });
        })
        return promise
      }
      function update_json_user(user, modulos_set) {
        const promise = new Promise(function (resolve, reject) {
          $http({
            method: 'POST',
            url: "php/tic/configuracionacceso/configuracionacceso.php",
            data: {
              function: 'get_json',
              nit: user.nit,
              cedula: user.cedula
            }
          }).then(function (response) {
            let json_get_user = response.data;
            if (json_get_user != undefined && json_get_user != "" && json_get_user != null && json_get_user.length > 0 && validar_json(angular.toJson(json_get_user))) {
              modulos_set.forEach(function (modulo, i) {
                var i_1 = json_get_user.findIndex(elemt => elemt.titulo == modulo.titulo);
                if (i_1 != -1) {
                  if (modulo.options.length > 0) {
                    modulo.options.forEach(function (element_1, j) {
                      var j_2 = json_get_user[i_1].options.findIndex(elemt => elemt.url == element_1.url);
                      if (j_2 != -1) {
                        // Actualiza el titulo del submodulo
                        json_get_user[i_1].options[j_2].titulo = element_1.titulo;
                        if ((modulo.options.length - 1) == j) {
                          resolve(json_get_user);
                        }
                      } else {
                        // Si no lo encuentra inserta el submodulo
                        json_get_user[i_1].options.push(element_1);
                        if ((modulo.options.length - 1) == j) {
                          resolve(json_get_user);
                        }
                      }
                    });
                  } else {
                    if ((modulos_set.length - 1) == i) {
                      resolve(json_get_user);
                    }
                  }
                } else {
                  // Si no encuentra el modulo inserta el modulo
                  json_get_user.push(modulo);
                  if ((modulos_set.length - 1) == i) {
                    resolve(json_get_user);
                  }
                }
              });
            } else {
              reject(new Error('Error obteniendo JSON'));
            }
          });
        })
        return promise
      }
      $scope.save_json_list_users = function (value) {
        swal({
          title: 'Confirmar Proceso',
          text: "¿Quieres actualizar los permisos de " + $scope.list_users_update_json.length + " usuarios?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then(function (result) {
          if (result) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });
            if ($scope.list_users_update_json != undefined && $scope.list_users_update_json != "" && $scope.list_users_update_json != null && $scope.list_users_update_json.length > 0 && Array.isArray($scope.list_users_update_json)) {
              if ($scope.modulos != undefined && $scope.modulos != "" && $scope.modulos != null && $scope.modulos.length > 0 && Array.isArray($scope.modulos) && validar_json(angular.toJson($scope.modulos))) {
                $scope.list_users_update_json.forEach(function (user, index) {
                  switch (value) {
                    case 1:
                      update_json_user(user, $scope.modulos).then(function (json_new) {
                        var responsable = sessionStorage.getItem("cedula");
                        if (Array.isArray(json_new) && validar_json(angular.toJson(json_new)) && responsable != "") {
                          $http({
                            method: 'POST',
                            url: "php/tic/configuracionacceso/configuracionacceso.php",
                            data: {
                              function: 'set_json_user',
                              nit: user.nit,
                              cedula: user.cedula,
                              responsable: responsable,
                              json: angular.toJson(json_new)
                            }
                          }).then(function (response) {
                            if (response.data[0].codigo == "0") {
                              console.log((index + 1), "Permisos de " + user.cedula + " actualizado correctamente json:", json_new);
                              // swal('Registro Actualizado', 'Se guardaron los permisos de acceso para el usuario: ' + $scope.form.nombre, 'success');
                            } else {
                              console.log("Error con los permisos de " + user.cedula + " json:", json_new);
                            }
                            if ($scope.list_users_update_json.length == (index + 1)) {
                              swal('Actualizacion Finalizada', 'Se guardaron los permisos de acceso.', 'success');
                            }
                          });
                        } else {
                          console.log((index + 1), "Error de json_new " + user.cedula, json_new);
                        }
                        if (($scope.list_users_update_json.length - 1) == index) {
                          swal.close();
                        }
                      }).catch(err => {
                        if (($scope.list_users_update_json.length - 1) == index) {
                          swal.close();
                        }
                        console.log((index + 1), err.message + " de " + user.cedula);
                      });
                      break;
                    case 2:
                      update_json_user_delete_submodulo(user, $scope.modulos).then(function (json_new) {
                        var responsable = sessionStorage.getItem("cedula");
                        if (Array.isArray(json_new) && validar_json(angular.toJson(json_new)) && responsable != "") {
                          $http({
                            method: 'POST',
                            url: "php/tic/configuracionacceso/configuracionacceso.php",
                            data: {
                              function: 'set_json_user',
                              nit: user.nit,
                              cedula: user.cedula,
                              responsable: responsable,
                              json: angular.toJson(json_new)
                            }
                          }).then(function (response) {
                            if (response.data[0].codigo == "0") {
                              console.log((index + 1), "Permisos de " + user.cedula + " actualizado correctamente json:", json_new);
                              // swal('Registro Actualizado', 'Se guardaron los permisos de acceso para el usuario: ' + $scope.form.nombre, 'success');
                            } else {
                              console.log("Error con los permisos de " + user.cedula + " json:", json_new);
                            }
                            if ($scope.list_users_update_json.length == (index + 1)) {
                              swal('Actualizacion Finalizada', 'Se guardaron los permisos de acceso.', 'success');
                            }
                          });
                        } else {
                          console.log((index + 1), "Error de json_new " + user.cedula, json_new);
                        }
                        if (($scope.list_users_update_json.length - 1) == index) {
                          swal.close();
                        }
                      }).catch(err => {
                        if (($scope.list_users_update_json.length - 1) == index) {
                          swal.close();
                        }
                        console.log((index + 1), err.message + " de " + user.cedula);
                      });
                      break;
                    case 3:
                      update_json_user_delete_modulo(user, $scope.modulos).then(function (json_new) {
                        var responsable = sessionStorage.getItem("cedula");
                        if (Array.isArray(json_new) && validar_json(angular.toJson(json_new)) && responsable != "") {
                          $http({
                            method: 'POST',
                            url: "php/tic/configuracionacceso/configuracionacceso.php",
                            data: {
                              function: 'set_json_user',
                              nit: user.nit,
                              cedula: user.cedula,
                              responsable: responsable,
                              json: angular.toJson(json_new)
                            }
                          }).then(function (response) {
                            if (response.data[0].codigo == "0") {
                              console.log((index + 1), "Permisos de " + user.cedula + " actualizado correctamente json:", json_new);
                              // swal('Registro Actualizado', 'Se guardaron los permisos de acceso para el usuario: ' + $scope.form.nombre, 'success');
                            } else {
                              console.log("Error con los permisos de " + user.cedula + " json:", json_new);
                            }
                            if ($scope.list_users_update_json.length == (index + 1)) {
                              swal('Actualizacion Finalizada', 'Se guardaron los permisos de acceso.', 'success');
                            }
                          });
                        } else {
                          console.log((index + 1), "Error de json_new " + user.cedula, json_new);
                        }
                        if (($scope.list_users_update_json.length - 1) == index) {
                          swal.close();
                        }
                      }).catch(err => {
                        if (($scope.list_users_update_json.length - 1) == index) {
                          swal.close();
                        }
                        console.log((index + 1), err.message + " de " + user.cedula);
                      });
                      break;
                    default:
                      swal.close();
                      swal('Error', 'No se identifico que tipo de actulizacion desea hacer', 'error');
                      break;
                  }
                });
              } else {
                swal.close();
                swal('Error', 'Los modulos no deben estar vacios y debe ser un JSON valido', 'error');
              }
            } else {
              swal.close();
              swal('Error', 'La lista de usuarios no debe estar vacia', 'error');
            }
          }
        }).catch(swal.noop);
      }


      $scope.id_user = "";
      $scope.filtrarUser = function (usuario) {
        // $scope.typeUser = 'ips';
        $scope.list_users_update_json = []
        if (usuario === undefined && usuario == null && usuario == "") {
          swal("Error", "El campo no puede ser vacio", "error");
          return
        }
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        //


        if ($scope.typeUser == 'funcionarios') {
          if (usuario != undefined && usuario != "" && usuario.indexOf(",") != -1) {
            var array = usuario.split(",");
            if (array != undefined && array != "" && array.length > 0 && Array.isArray(array)) {
              $scope.vista.panel_2 = true;
              $scope.vista.panel_title_2 = false;
              array.forEach(user => {
                if (Number(user.trim())) {
                  var i = $scope.list_users_update_json.findIndex(elemt => elemt.cedula == user.trim());
                  if (i == -1) {
                    $scope.list_users_update_json.push({ cedula: user.trim(), nombre: "null name: " + user.trim(), nit: "890102044", usuario: "null usuario: " + user.trim() });
                  } else {
                    console.log("Usuario repetido: " + user.trim());
                  }
                } else {
                  console.log("No es un numero de cedula valido: " + user.trim());
                }
              });
              swal.close();
            }
          } else {

            $http({
              method: 'POST',
              url: "php/tic/paneladmin/paneladmin.php",
              data: {
                function: 'getModuloUser',
                user: usuario
              }
            }).then(function (response) {
              if (response.data[0].Codigo == 404) {
                swal.close();
                swal('Advertencia', 'El usuario no esta registrado', 'warning');
                $scope.modulos = [];
                $scope.vista.panel_2 = false;
                $scope.lis_users = [];
              } else {
                $scope.typeUser = "funcionarios";
                document.querySelector('input[name=groupRadio][value=funcionarios]').checked = true;
                $http({
                  method: 'POST',
                  url: "php/tic/configuracionacceso/configuracionacceso.php",
                  data: {
                    function: 'get_selet_rol'
                  }
                }).then(function (response_2) {
                  $scope.filter_fun_1 = "R";
                  if (document.querySelector("#filter_fun_1") != null) {
                    document.querySelector("#filter_fun_1").value = "R";
                  }
                  $scope.filter_datos_2 = response_2.data;
                  $http({
                    method: 'POST',
                    url: "php/tic/configuracionacceso/configuracionacceso.php",
                    data: {
                      function: 'get_funcionarios',
                      filtro: "R",
                      codigo: response.data[0].CODIGO
                    }
                  }).then(function (response_3) {
                    $scope.filter_fun_2 = response.data[0].CODIGO;
                    if (document.querySelector("#filter_fun_2") != null) {
                      document.querySelector("#filter_fun_2").value = response.data[0].CODIGO;
                    }
                    $scope.lis_users = response_3.data;
                    $scope.editarUser({ cedula: response.data[0].CEDULA, nit: response.data[0].NIT, nombre: response.data[0].USUARIO, usuario: usuario });
                    $scope.vista.add_modulos = false;
                    $scope.collapse.level = null;
                    $scope.clear_all_check();
                    // $scope.cloneHeadFixed(0);
                    swal.close();
                  });
                });
              }
            });
          }

        } else if ($scope.typeUser == 'ips') {
          if (usuario != undefined && usuario != "" && usuario.indexOf(",") != -1) {
            var array = usuario.split(",");
            if (array != undefined && array != "" && array.length > 0 && Array.isArray(array)) {
              $scope.vista.panel_2 = true;
              $scope.vista.panel_title_2 = false;
              array.forEach(user => {
                if (Number(user.trim())) {
                  var i = $scope.list_users_update_json.findIndex(elemt => elemt.nit == user.trim());
                  if (i == -1) {
                    // getCedulaAdminIps
                    $http({
                      method: 'POST',
                      url: "php/tic/configuracionacceso/configuracionacceso.php",
                      data: {
                        function: 'getCedulaAdminIps',
                        nit: user.trim()
                      }
                    }).then(function ({ data }) {
                      if (data != '0') {
                        $scope.list_users_update_json.push({ cedula: data, nombre: "null name: " + user.trim(), nit: user.trim(), usuario: "null usuario: " + user.trim() });
                      } else {
                        console.log("Error obteniendo json de: " + user.trim());
                      }
                    });

                  } else {
                    console.log("Usuario repetido: " + user.trim());
                  }
                } else {
                  console.log("No es un numero de cedula valido: " + user.trim());
                }
              });
              swal.close();
            }

          } else {
            console.log(1111);
            $http({
              method: 'POST',
              url: "php/tic/configuracionacceso/configuracionacceso.php",
              data: {
                function: 'getModuloIpsAdmin',
                nit: usuario
              }
            }).then(function ({ data }) {
              if (data[0].Codigo == '404') {
                swal.close();
                swal('Advertencia', 'La ips no esta registrada', 'warning');
                $scope.modulos = [];
                $scope.vista.panel_2 = false;
                $scope.lis_users = [];
                return
              }
              $scope.typeUser = "ips";
              document.querySelector('input[name=groupRadio][value=ips]').checked = true;

              $scope.editarUser({ cedula: data[0].CEDULA, nit: data[0].NIT, nombre: data[0].NOMBRE, usuario: usuario });
              $scope.vista.add_modulos = false;
              $scope.collapse.level = null;
              $scope.clear_all_check();
              // $scope.cloneHeadFixed(0);
              swal.close();
            })
          }

        }
        //
        //
      }
      $scope.radio_type_user = function (type) {
        if (type == "funcionarios") {

        } else if (type == "afiliados") {

        } else if (type == "ips") {

        } else if (type == "empresas") {

        }
      }
      $scope.copiar_text = function (variable) {
        var aux = document.createElement("input");
        aux.setAttribute("value", angular.toJson($scope[variable]));
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
      }
      $scope.modulos_string = "";
      $scope.change_modulos = function (string) {
        if (string != "") {
          if (validar_json(string)) {
            $scope.modulos = JSON.parse(string);
          } else {
            swal("Error", "el Json no es valido", "error");
          }
          $scope.modulos_string = "";
          document.querySelector("#json_string").value = "";
        }
      }
      // $scope.cloneHeadFixed = function (key) {
      //   setTimeout(() => {
      //     var original = $('#tablaOriginal_' + key + '>thead');
      //     var clone = $('#tablaOriginal_' + key + '>thead').clone();
      //     var list = original[0].children[0].children;
      //     for (var i = 0; i < list.length; i++) {
      //       clone[0].children[0].children[i].style.width = list[i].offsetWidth + "px";
      //     }
      //     $('#tablaClone_' + key).html(clone).css("width", original[0].parentElement.offsetWidth + "px");
      //   }, 500);
      // }
      // $(".scroll_x").on("scroll", function () {
      //   $(".scroll_x").scrollLeft($(this).scrollLeft());
      // });
      // $(window).resize(function () {
      //   $scope.cloneHeadFixed(0);
      //   $scope.cloneHeadFixed(1);
      // });

    }])
