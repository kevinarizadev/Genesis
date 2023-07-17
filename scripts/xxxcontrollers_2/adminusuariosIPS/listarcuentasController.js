'use strict';
angular.module('GenesisApp')
  .controller('listarcuentasController', ['$scope', '$http', 'menuopcioneshttp', 'consultaHTTP', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window', '$location', '$anchorScroll',
    function ($scope, $http, menuopcioneshttp, consultaHTTP, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window, $location, $anchorScroll) {
      $scope.vista = { form: false, tabla_0: true, tabla_1: false, btnEdIT: false };
      $scope.btn_value = "";
      $scope.form = {
        nit: "",
        nombreIps: "",
        tipoDocumento: "",
        numeroId: "",
        nombreUser: "",
        contrasenna_0: "",
        contrasenna_1: "",
        celular: "",
        telefono: "",
        correo: "",
        cargo: "",
        modulos: '[]',
        tipo: "F"
      };
      $scope.nit_var = "";
      $http({
        method: 'GET',
        url: "php/obtenersession.php"
      }).then(function (response) {
        $scope.nit_var = response.data.nit;
        $scope.form.nit = response.data.nit;
        $scope.form.nombreIps = response.data.nomips;
      });
      $scope.getUsers = function () {
        $http({
          method: 'GET',
          url: "php/obtenersession.php"
        }).then(function (response) {
          $http({
            method: 'POST',
            url: "php/adminusuariosIPS/listarcuentas/listarcuentas.php",
            data: {
              function: 'getUsers',
              nit: response.data.nit
            }
          }).then(function (response) {
            $scope.lis_users = angular.copy(response.data);
            /* $scope.cloneHeadFixed(0); */
          });
        });
      }
      $scope.getUsers();
      consultaHTTP.obtenerDocumento().then(function (response) {
        $scope.tipo_documento = response.Documento;
      });


      // Tabla fixed star
    /*   $scope.cloneHeadFixed = function (id) {
        // if (id != undefined && id != null && id != "") {
        setTimeout(() => {
          var original = $('#tablaOriginal_' + id + '>thead');
          var clone = $('#tablaOriginal_' + id + '>thead').clone();
          var list = original[0].children[0].children;
          for (var i = 0; i < list.length; i++) {
            clone[0].children[0].children[i].style.width = list[i].offsetWidth + "px";
          }
          $('#tablaClone_' + id).html(clone).css("width", original[0].parentElement.offsetWidth + "px");
        }, 600);
        // }
      } */
      // $(".scroll_x").on("scroll", function () {
      //   $(".scroll_x").scrollLeft($(this).scrollLeft());
      // });
     /*  $(window).resize(function () {
        $scope.cloneHeadFixed(0);
        $scope.cloneHeadFixed(1);
      });
      $scope.cloneHeadFixed(0); */
      // Tabla fixed end






      // Viejo


      $scope.filter_roles = "";
      $scope.filter_modules = "";
      $scope.filter_roles_cod = "";
      $scope.temAgregar = [];
      $scope.temBorrar = [];
      $scope.temEstado = [];
      $scope.collapse = { level: null };
      $scope.moduloTitle = "";
      $scope.id_user = "";
      $scope.subModuloDisabled = [];
      $scope.modulos = [];
      $scope.modulosBase = [];
      $scope.u_i = false;
      $scope.getModuloBase = function () {
        $.getJSON("php/obtenersession.php").done(function (respuesta) {
          $.getJSON("php/paneladmin/obtenerpaneladmin.php", { idempresa: 1, idrol: respuesta.rolcod }).done(function (response) {
            $scope.modulosBase = response.filter(modulo => (modulo.icono != "icon-key-4" && modulo.icono != "icon-logout-3"));
            $scope.modulosBase.forEach(function (item_0, i) {
              $scope.modulosBase[i] = Object.assign(item_0, { id: i });
              item_0.options.forEach(function (item_1, j) {
                $scope.modulosBase[i].options[j] = Object.assign(item_1, { id: i + "-" + j });
              });
            });
          }).fail(function (jqXHR, textStatus, errorThrown) {
            $scope.modulosBase = [];
          });
        }).fail(function (jqXHR, textStatus, errorThrown) {
          $scope.modulosBase = [];
        });
      };
      $scope.getModuloBase();



      $scope.cambiarEstado = function (usuario) {
        if (usuario.Cedula != "") {
          $http({
            method: 'POST',
            url: "php/adminusuariosIPS/listarcuentas/listarcuentas.php",
            data: {
              function: 'cambiarEstado',
              nit: $scope.nit_var,
              documento: usuario.Cedula
            }
          }).then(function (response) {
            $scope.getUsers();
          });
        }
      };
      $scope.editarUser = function (userDesc) {
        if (userDesc.cedula != "") {
          $scope.u_i = true;
          $scope.userSelect = userDesc.Nombre_usuario;
          $http({
            method: 'POST',
            url: "php/adminusuariosIPS/listarcuentas/listarcuentas.php",
            data: {
              function: 'detalleUsuario',
              nit: $scope.nit_var,
              documento: userDesc.Cedula
            }
          }).then(function (response) {
            $scope.modulos = angular.copy(response.data.Modulos.filter(modulo => (modulo.icono != "icon-key-4" && modulo.icono != "icon-logout-3")));
            $scope.form = {
              nit: response.data.Nit,
              nombreIps: $scope.form.nombreIps,
              tipoDocumento: "CC",
              numeroId: parseFloat(response.data.Documento),
              nombreUser: response.data.Nombre,
              contrasenna_0: response.data.Clave,
              contrasenna_1: response.data.Clave,
              celular: parseFloat(response.data.Celular),
              telefono: parseFloat(response.data.Telefono),
              correo: response.data.Correo,
              cargo: response.data.Cargo,
              modulos: $scope.modulos,
              tipo: "F"
            };
            $scope.modulos.forEach(function (modulo, i) {
              $scope.modulos[i] = Object.assign(modulo, { id: i });
              modulo.options.forEach(function (submodulo, j) {
                $scope.modulos[i].options[j] = Object.assign(submodulo, { id: i + "-" + j, estado: true });
              });
            });
            console.log(response.data);
            $scope.collapse.level = null;
            $scope.moduloTitle = "Modulos de: " + $scope.userSelect;
            $scope.vista.tabla_0 = false;
            $scope.vista.form = true;
            $scope.vista.tabla_1 = true;
            $scope.btnEdIT = true;
            $scope.btn_value = "Actualizar Usuario";
            //$scope.cloneHeadFixed(1);
          });
        } else {
          swal('Error', 'La cedula esta vacia.', 'warning');
        }
      };
      $scope.agregarUser = function (value) {
        if (value) {
          $scope.u_i = false;
          $scope.modulos = angular.copy($scope.modulosBase);
          $scope.form = {
            nit: $scope.form.nit,
            nombreIps: $scope.form.nombreIps,
            tipoDocumento: "",
            numeroId: "",
            nombreUser: "",
            contrasenna_0: "",
            contrasenna_1: "",
            celular: "",
            telefono: "",
            correo: "",
            cargo: "",
            modulos: $scope.modulos,
            tipo: "F"
          };
          for (const i in $scope.modulos) {
            for (const j in $scope.modulos[i].options) {
              $scope.modulos[i].options[j] = Object.assign($scope.modulos[i].options[j], { estado: true });
            }
          }
          $scope.vista.tabla_0 = false;
          $scope.vista.form = true;
          $scope.collapse.level = null;
          $scope.moduloTitle = "Modulos:";
          $scope.vista.tabla_1 = true;
          $scope.btnEdIT = false;
          $scope.btn_value = "Registrar Usuario";
        } else {
          $scope.form = {
            nit: $scope.form.nit,
            nombreIps: $scope.form.nombreIps,
            tipoDocumento: "",
            numeroId: "",
            nombreUser: "",
            contrasenna_0: "",
            contrasenna_1: "",
            celular: "",
            telefono: "",
            correo: "",
            cargo: "",
            modulos: "[]",
            tipo: "F"
          };
          $scope.modulos = [];
          $scope.vista.form = false;
          $scope.vista.tabla_0 = true;
          $scope.vista.tabla_1 = false;
          $scope.getUsers();
        }
      };
      $scope.guardarUser = function (tipo_btn) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        swal.close();
        if ($scope.form.nit != "" && $scope.form.nombreIps != "" && $scope.form.tipoDocumento != "" && $scope.form.numeroId != "" && $scope.form.nombreUser != "" && $scope.form.contrasenna_0 != "" && $scope.form.contrasenna_1 != "" && $scope.form.celular != "" && $scope.form.telefono != "" && $scope.form.correo != "" && $scope.form.cargo != "" && $scope.form.modulos != "" && $scope.form.tipo != "") {
          if ($scope.form.nit != $scope.form.numeroId) {
            if ($scope.form.nombreUser != $scope.form.nombreIps) {
              if ($scope.form.contrasenna_0 == $scope.form.contrasenna_1) {
                if ($scope.form.contrasenna_0.length >= 6) {
                  if ($scope.form.celular.toString().length == 10) {
                    if ((/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test($scope.form.correo)) {
                      // console.log($scope.modulos);
                      $scope.form.modulos = angular.copy($scope.modulos);
                      for (const i in $scope.form.modulos) {
                        // console.log("Normal", $scope.form.modulos[i].options);
                        $scope.form.modulos[i].options.filter(modulo => modulo.estado != false);
                        // console.log("Filtrado", $scope.form.modulos[i].options);
                        if ($scope.form.modulos[i].options.length > 0) {
                          for (const j in $scope.form.modulos[i].options) {
                            // console.log($scope.form.modulos[i].options[j].estado);
                            delete $scope.form.modulos[i].options[j].estado;
                          }
                        } else {
                          $scope.form.modulos.splice(i, 1);
                        }
                      }
                      $scope.form.modulos.push({ "titulo": "Sesion", "icono": "icon-logout-3", "id": "", "options": [{ "titulo": "Cerrar Sesión", "url": "mara.logout", "id": "" }] });
                      // console.log($scope.form.modulos);
                      $scope.form.modulos = JSON.stringify($scope.form.modulos);
                      if (tipo_btn == true) {
                        $http({
                          method: 'POST',
                          url: "php/adminusuariosIPS/listarcuentas/listarcuentas.php",
                          data: {
                            function: "actualizarUsuario",
                            json: JSON.stringify($scope.form)
                          }
                        }).then(function (response) {
                          swal.close();
                          if (response.data.Codigo == 0) {
                            swal({
                              title: "Usuario IPS Actualizado!",
                              type: "success",
                              confirmButtonText: "Aceptar"
                            });
                            $scope.form = {
                              nit: $scope.form.nit,
                              nombreIps: $scope.form.nombreIps,
                              tipoDocumento: "",
                              numeroId: "",
                              nombreUser: "",
                              contrasenna_0: "",
                              contrasenna_1: "",
                              celular: "",
                              telefono: "",
                              correo: "",
                              cargo: "",
                              modulos: "[]",
                              tipo: "F"
                            };
                            $scope.modulos = [];
                            $scope.vista.form = false;
                            $scope.vista.tabla_0 = true;
                            $scope.vista.tabla_1 = false;
                            $scope.getUsers();
                          } else {
                            swal({
                              title: "Error Actulizando Usuario IPS",
                              type: "error",
                              confirmButtonText: "Aceptar",
                              className: "swal_ips"
                            });
                            $scope.form = {
                              nit: $scope.form.nit,
                              nombreIps: $scope.form.nombreIps,
                              tipoDocumento: "",
                              numeroId: "",
                              nombreUser: "",
                              contrasenna_0: "",
                              contrasenna_1: "",
                              celular: "",
                              telefono: "",
                              correo: "",
                              cargo: "",
                              modulos: "[]",
                              tipo: "F"
                            };
                            $scope.modulos = [];
                            $scope.vista.form = false;
                            $scope.vista.tabla_0 = true;
                            $scope.vista.tabla_1 = false;
                          }
                        });
                      } else if (tipo_btn == false) {
                        $http({
                          method: 'POST',
                          url: "php/adminusuariosIPS/usuarioadministrador/usuarioadministrador.php",
                          data: {
                            function: "registrarUserAdmin",
                            json: JSON.stringify($scope.form)
                          }
                        }).then(function (response) {
                          console.log($scope.form);
                          swal.close();
                          if (response.data.Codigo == 0) {
                            swal({
                              title: "Usuario IPS Creado!",
                              html: "<div class='swal_ips'>Ahora puedes iniciar sesión como IPS con los siguientes datos y obtener acceso a los módulos asignados:<br><br>NIT: " + $scope.form.nit + "<br>Usuario: " + $scope.form.numeroId + "<br>Contraseña: " + $scope.form.contrasenna_0 + "</div>",
                              type: "success",
                              confirmButtonText: "Aceptar",
                              className: "swal_ips"
                            });
                            $scope.form = {
                              nit: $scope.form.nit,
                              nombreIps: $scope.form.nombreIps,
                              tipoDocumento: "",
                              numeroId: "",
                              nombreUser: "",
                              contrasenna_0: "",
                              contrasenna_1: "",
                              celular: "",
                              telefono: "",
                              correo: "",
                              cargo: "",
                              modulos: "[]",
                              tipo: "F"
                            };
                            $scope.modulos = [];
                            $scope.vista.form = false;
                            $scope.vista.tabla_0 = true;
                            $scope.vista.tabla_1 = false;
                            $scope.getUsers();
                          } else {
                            swal({
                              title: "Error Creando Usuario IPS",
                              type: "error",
                              confirmButtonText: "Aceptar",
                              className: "swal_ips"
                            });
                            $scope.form = {
                              nit: $scope.form.nit,
                              nombreIps: $scope.form.nombreIps,
                              tipoDocumento: "",
                              numeroId: "",
                              nombreUser: "",
                              contrasenna_0: "",
                              contrasenna_1: "",
                              celular: "",
                              telefono: "",
                              correo: "",
                              cargo: "",
                              modulos: "[]",
                              tipo: "F"
                            };
                            $scope.modulos = [];
                            $scope.vista.form = false;
                            $scope.vista.tabla_0 = true;
                            $scope.vista.tabla_1 = false;
                          }
                        });
                      }
                    } else {
                      swal.close();
                      swal('Error de correo', 'Correo ingresado no valido.', 'warning');
                    }
                  } else {
                    swal.close();
                    swal('Error de celular', 'Numero ingresado no valido.', 'warning');
                  }
                } else {
                  swal.close();
                  swal('Error de contraseñas', 'La contraseña debe ser mayor o igual a 6 dígitos.', 'warning');
                }
              } else {
                swal.close();
                swal('Error de contraseñas', 'La contraseña de verificación no coincide.', 'warning');
              }
            } else {
              swal.close();
              swal('Error de Nombre del Usuario', 'El Nombre Completo del Usuario no puede ser igual al Nombre de la IPS.', 'warning');
            }
          } else {
            swal.close();
            swal('Error de Número de Identificación', 'El Número de Identificación no puede ser igual al NIT.', 'warning');
          }
        } else {
          swal.close();
          swal('Campos vacios', 'Por favor, llenar todos los campos obligatorios *', 'warning');
        }
      }



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
      // $scope.checkboxBorrar = function (i, check, data) {
      //   if (check == false) {
      //     $scope.temBorrar[i] = null;
      //   } else if (check == true) {
      //     $scope.temBorrar[i] = data;
      //   }
      // }
      $scope.BtnBorrar = function (array, item) {
        $scope[array].splice(item, 1);
      }
      $scope.BtnBorrarModulo = function (array, id) {
        $scope[array].splice($scope[array].findIndex(modulo => modulo.id == id), 1);
        console.log($scope[array]);
      }
      $scope.checkboxEstado = function (modulo_titulo, check, submodulo_titulo) {
        if (check == false) {
          for (const i in $scope.modulos) {
            if ($scope.modulos[i].titulo == modulo_titulo) {
              for (const j in $scope.modulos[i].options) {
                if ($scope.modulos[i].options[j].titulo == submodulo_titulo) {
                  $scope.modulos[i].options[j] = { titulo: $scope.modulos[i].options[j].titulo, url: $scope.modulos[i].options[j].url, estado: true, id: $scope.idSolution($scope.modulos[i].options[j].id) };
                }
              }
            }
          }
        } else if (check == true) {
          for (const i in $scope.modulos) {
            if ($scope.modulos[i].titulo == modulo_titulo) {
              for (const j in $scope.modulos[i].options) {
                if ($scope.modulos[i].options[j].titulo == submodulo_titulo) {
                  $scope.modulos[i].options[j].estado = false;
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
          url: "php/adminusuariosIPS/listarcuentas/listarcuentas.php",
          data: {
            function: 'updateModulo',
            u_rol: JSON.stringify($scope.update[0].rol),
            u_json: JSON.stringify($scope.update[0].json)
          }
        }).then(function (response) {
          swal('Completado', response.data.mensaje, 'success');
          $scope.editarUser($scope.set.rol, $scope.set.name);
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
          url: "php/adminusuariosIPS/listarcuentas/listarcuentas.php",
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
            $scope.editarUser(response.data[0].CODIGO, response.data[0].NOMBRE);
          }
        });
      };
    }])