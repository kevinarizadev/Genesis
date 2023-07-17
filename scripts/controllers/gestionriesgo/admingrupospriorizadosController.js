'use strict';
angular.module('GenesisApp')
  .controller('admingrupospriorizadosController', ['$scope', '$http', '$filter', '$q', 'afiliacionHttp',
    function ($scope, $http, $filter, $q, afiliacionHttp) {
      $(document).ready(function () {
        $('.modal').modal();
        $('.tabs').tabs();
        $scope.Tabs = 1;
        console.log($(window).width());
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1300) {
          document.querySelector("#pantalla").style.zoom = 0.9;
        }
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        // $scope.Rol_Ubicacion = sessionStorage.getItem('codmunicipio');
        // $scope.Rol_Ubicacion = "8001";
        console.log($scope.Rol_Cedula);
        // console.log($scope.Rol_Ubicacion);

        // $scope.Ver_Glosas();
        $scope.Vista = 0;
        // $('input.currency').currencyInput();

        $scope.ObtenerListado_Diags('X');
        $scope.ObtenerListado_Funcs('X');
        $scope.SysDay = new Date();
        setTimeout(() => {
          $scope.$apply();
        }, 500);
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        ///////////P-PENDIENTE---G-GESTIONADO---X-ANULADO/////////
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        // $scope.Abrir_Modal_Direccion();
      });

      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      $scope.ObtenerListado_Diags = function (X) {
        if (X != undefined) {
          swal({ title: 'Cargando...' });
          swal.showLoading();
        }
        $http({
          method: 'POST',
          url: "php/gestionriesgo/seggrupospriorizados.php",
          data: {
            function: 'Obtener_Diags',
            Con: 'GS'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Lista_Tabla = response.data;
            $scope.initPaginacion($scope.Lista_Tabla);
            swal.close();
            setTimeout(() => {
              response.data.forEach(e => {
                (e.ESTADO == 'A') ? $scope.List_Count_Activos += 1 : '';
                (e.ESTADO == 'I') ? $scope.List_Count_Inactivos += 1 : '';
              });
              $scope.$apply();
            }, 500);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        })
      }

      $scope.In_Ac_Diag = function (X) {
        var Texto = 'Diagnóstico: ' + $scope.capitalizeFirstLetter(X.DESCRIPCION) + ' - Patología:' + $scope.capitalizeFirstLetter(X.NOM_COHORTE);
        swal({
          title: '¿Actualizar el estado del diagnóstico?',
          text: Texto,
          type: 'info',
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            swal({ title: 'Cargando...' });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/gestionriesgo/seggrupospriorizados.php",
              data: {
                function: 'In_Ac_Diag',
                Diag: X.DIAGNOSTICO,
                Patologia: X.COD_COHORTE,
                Estado: X.ESTADO,
                Con: 'GS',
                Ced: $scope.Rol_Cedula
              }
            }).then(function (response) {
              if (response.data && response.data.toString().substr(0, 3) != '<br') {
                if (response.data.Codigo == 0) {
                  swal({
                    title: "Mensaje",
                    text: response.data.Nombre,
                    type: "success",
                  }).catch(swal.noop);
                  setTimeout(() => {
                    $scope.ObtenerListado_Diags();
                  }, 1500);
                }
                if (response.data.Codigo == 1) {
                  swal({
                    title: "¡Ocurrio un error!",
                    text: response.data.Nombre,
                    type: "warning",
                  }).catch(swal.noop);
                }
                if (response.data.Codigo == undefined) {
                  swal({
                    title: "¡Ocurrio un error!",
                    text: response.data,
                    type: "warning",
                  }).catch(swal.noop);
                }
              } else {
                swal({
                  title: "¡Ocurrio un error!",
                  text: response.data,
                  type: "warning",
                }).catch(swal.noop);
              }
            });
          }
        }).catch(swal.noop);
      }
      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      $scope.ObtenerListado_Funcs = function (X) {
        if (X != undefined) {
          swal({ title: 'Cargando...' });
          swal.showLoading();
        }
        $http({
          method: 'POST',
          url: "php/gestionriesgo/seggrupospriorizados.php",
          data: {
            function: 'Obtener_Funcs'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            response.data.forEach(e => {
              e.TOTAL = parseInt(e.TOTAL);
            });
            setTimeout(() => {
              $scope.Lista_Tabla_Funcs = response.data;
              $scope.Lista_Tabla_Funcs_Filter = response.data;
            }, 500);
            swal.close();
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        })
      }

      $scope.Agregar_Func = function () {
        swal({
          title: 'Agregar Nuevo Funcionario',
          text: 'Ingrese la cédula del funcionario para que pueda ver/gestionar los seguimientos.',
          input: 'text',
          inputPlaceholder: 'Ingrese la cédula...',
          showCancelButton: false,
          confirmButtonText: "Aceptar",
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            swal({ title: 'Cargando...' });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/gestionriesgo/seggrupospriorizados.php",
              data: {
                function: 'Agregar_Inac_Func',
                Cedula: result,
                Accion: 'A'
              }
            }).then(function (response) {
              if (response.data != undefined) {
                if (response.data.Codigo == 0) {
                  swal({
                    title: "Mensaje",
                    text: response.data.Nombre,
                    type: "success",
                  }).catch(swal.noop);
                  setTimeout(() => {
                    $scope.ObtenerListado_Funcs();
                  }, 1500);
                }
                if (response.data.Codigo == 1) {
                  swal({
                    title: "Mensaje",
                    text: response.data.Nombre,
                    type: "warning",
                  }).catch(swal.noop);
                }
              }
            });
          }
        }).catch(swal.noop);
      }

      $scope.In_Ac_Func = function (X) {
        if (X.ESTADO_EMPLEADO == 'A') {
          swal({
            title: '¿Inactivar Funcionario?',
            type: 'info',
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            allowOutsideClick: false
          }).then(function (result) {
            if (result) {
              swal({ title: 'Cargando...' });
              swal.showLoading();
              $http({
                method: 'POST',
                url: "php/gestionriesgo/seggrupospriorizados.php",
                data: {
                  function: 'Agregar_Inac_Func',
                  Cedula: X.CODIGO,
                  Accion: 'I'
                }
              }).then(function (response) {
                if (response.data && response.data.toString().substr(0, 3) != '<br') {
                  if (response.data.Codigo == 0) {
                    swal({
                      title: "Mensaje",
                      text: response.data.Nombre,
                      type: "success",
                    }).catch(swal.noop);
                    setTimeout(() => {
                      $scope.ObtenerListado_Funcs();
                    }, 1500);
                  }
                  if (response.data.Codigo == 1) {
                    swal({
                      title: "¡Ocurrio un error!",
                      text: response.data.Nombre,
                      type: "warning",
                    }).catch(swal.noop);
                  }
                  if (response.data.Codigo == 2) {
                    swal({
                      title: "¡Advertencia!",
                      text: response.data.Nombre,
                      type: "info",
                    }).catch(swal.noop);
                  }
                  if (response.data.Codigo == undefined) {
                    swal({
                      title: "¡Ocurrio un error!",
                      text: response.data,
                      type: "warning",
                    }).catch(swal.noop);
                  }
                } else {
                  swal({
                    title: "¡Ocurrio un error!",
                    text: response.data,
                    type: "warning",
                  }).catch(swal.noop);
                }
              });
            }
          }).catch(swal.noop);
        }
      }

      $scope.Reasignar_Solicitudes = function (Accion, X) {
        //A Abrir Modal - //G Gestionar
        if (Accion == 'A') {
          angular.forEach(document.querySelectorAll('#Modal_Reasignar_Solicitudes .red-text'), function (i) {
            i.classList.remove('red-text');
          });
          angular.forEach(document.querySelectorAll('.Form_Consulta input'), function (i) {
            i.setAttribute("readonly", true);
          });
          angular.forEach(document.querySelectorAll('.Form_Consulta select'), function (i) {
            i.setAttribute("disabled", true);
          });
          $scope.Modal_Consulta_Numero_Act = X.CODIGO;
          $scope.Modal_Consulta_Nombre_Act = X.NOMBRE;
          $scope.Modal_Consulta_Ubicacion_Act = X.UBICACION;
          $scope.Modal_Consulta_Numero_Pro = "";
          $scope.Modal_Consulta_Nombre_Pro = "";
          $scope.Modal_Consulta_Ubicacion_Pro = "";
          $('#Modal_Reasignar_Solicitudes').modal('open');

          //
          var Exist = false;
          $scope.Lista_Funcs_Transf = [];
          $scope.Lista_Funcs_Transf_Filtro = [];
          $('.Clase_Listar_Funcs').css({ width: $('#Modal_Consulta_Nombre_Pro')[0].offsetWidth });
          $scope.Lista_Tabla_Funcs.forEach(e => {


            if (e.CODIGO != X.CODIGO && e.UBICACION == X.UBICACION) {
              $scope.Lista_Funcs_Transf.push(e);
              $scope.Lista_Funcs_Transf_Filtro.push(e);
              Exist = true;
            }
          });
          if (Exist == false) {
            swal({
              title: "¡Advertencia!",
              text: "No se encontraron funcionarios para realizar el cambio.",
              type: "info",
            }).catch(swal.noop);
          }
          //
        }
        if (Accion == 'G') {
          var Campos_Empty = false;
          if ($scope.Modal_Consulta_Numero_Act == undefined || $scope.Modal_Consulta_Numero_Act == null || $scope.Modal_Consulta_Numero_Act == '') {
            Campos_Empty = true; document.querySelector('#Modal_Consulta_Numero_Act_Label').classList.add('red-text');
          }
          if ($scope.Modal_Consulta_Nombre_Act == undefined || $scope.Modal_Consulta_Nombre_Act == null || $scope.Modal_Consulta_Nombre_Act == '') {
            Campos_Empty = true; document.querySelector('#Modal_Consulta_Nombre_Act_Label').classList.add('red-text');
          }
          if ($scope.Modal_Consulta_Numero_Pro == undefined || $scope.Modal_Consulta_Numero_Pro == null || $scope.Modal_Consulta_Numero_Pro == '') {
            Campos_Empty = true; document.querySelector('#Modal_Consulta_Numero_Pro_Label').classList.add('red-text');
          }
          if ($scope.Modal_Consulta_Nombre_Pro == undefined || $scope.Modal_Consulta_Nombre_Pro == null || $scope.Modal_Consulta_Nombre_Pro == '') {
            Campos_Empty = true; document.querySelector('#Modal_Consulta_Nombre_Pro_Label').classList.add('red-text');
          }
          if (Campos_Empty == false) {
            if ($scope.Modal_Consulta_Numero_Act != $scope.Modal_Consulta_Numero_Pro) {
              if ($scope.Modal_Consulta_Ubicacion_Act == $scope.Modal_Consulta_Ubicacion_Pro) {
                swal({ title: 'Cargando...' });
                swal.showLoading();
                $http({
                  method: 'POST',
                  url: "php/gestionriesgo/seggrupospriorizados.php",
                  data: {
                    function: 'Reasignar_Sol',
                    Actual: $scope.Modal_Consulta_Numero_Act,
                    Nuevo: $scope.Modal_Consulta_Numero_Pro
                  }
                }).then(function (response) {
                  if (response.data && response.data.toString().substr(0, 3) != '<br') {
                    if (response.data.Codigo == 0) {
                      swal({
                        title: "Mensaje",
                        text: response.data.Nombre,
                        type: "success",
                      }).catch(swal.noop);
                      setTimeout(() => {
                        $scope.ObtenerListado_Funcs();
                      }, 1500);
                    }
                    if (response.data.Codigo == 1) {
                      swal({
                        title: "¡Ocurrio un error!",
                        text: response.data.Nombre,
                        type: "warning",
                      }).catch(swal.noop);
                    }
                    if (response.data.Codigo == undefined) {
                      swal({
                        title: "¡Ocurrio un error!",
                        text: response.data,
                        type: "warning",
                      }).catch(swal.noop);
                    }
                  } else {
                    swal({
                      title: "¡Ocurrio un error!",
                      text: response.data,
                      type: "warning",
                    }).catch(swal.noop);
                  }
                });
                $scope.closeModal();
              } else {
                Materialize.toast('¡El responsable nuevo no corresponde a la seccional del responsable actual!', 3000); $('.toast').addClass('default-background-dark');
              }
            } else {
              Materialize.toast('¡El responsable nuevo debe ser diferente al actual!', 3000); $('.toast').addClass('default-background-dark');
            }
          } else {
            Materialize.toast('¡Campos vacios o invalidos!', 3000); $('.toast').addClass('default-background-dark');
          }
        }
      }

      $scope.Complete_Funcs = function (string) {
        if ($scope.Lista_Funcs_Transf != undefined && string != undefined) {
          $('.Clase_Listar_Funcs').css({ width: $('#Modal_Consulta_Nombre_Pro')[0].offsetWidth });
          var output = [];
          angular.forEach($scope.Lista_Funcs_Transf, function (x) {
            if (x.CODIGO.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.NOMBRE.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
              output.push({ "CODIGO": x.CODIGO, "NOMBRE": x.NOMBRE.toUpperCase(), "UBICACION": x.UBICACION.toUpperCase() });
            }
          });
          $scope.Lista_Funcs_Transf_Filtro = output;
        }
      }
      $scope.FillTextbox_Funcs = function (codigo, nombre, ubicacion) {
        $scope.Modal_Consulta_Numero_Pro = codigo;
        $scope.Modal_Consulta_Nombre_Pro = nombre;
        $scope.Modal_Consulta_Ubicacion_Pro = ubicacion;
        $scope.Lista_Funcs_Transf_Filtro = null;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      ///////////////////////////////////////////////////////////////////////////////
      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, '');
        input.value = valor;
      }

      $scope.capitalizeFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      }

      $scope.Estado_Solicitud_Clase = function (Estado) {
        if (Estado.toString().toUpperCase() == 'A') {
          return "Con_pulse_A"
        }
        if (Estado.toString().toUpperCase() == 'X') {
          return "Con_pulse_X"
        }
      }

      $scope.Estado_Solicitud_Color = function (Estado) {
        if (Estado.toString().toUpperCase() == 'A') {
          return { "background-color": "rgb(3, 197, 20) !important;" }
        }
        if (Estado.toString().toUpperCase() == 'X') {
          return { "background-color": "rgb(245, 75,75) !important" }
        }
      }

      $scope.Estado_Solicitud_Tooltip = function (Estado) {
        if (Estado.toString().toUpperCase() == 'A') {
          return "Activo"
        }
        if (Estado.toString().toUpperCase() == 'X') {
          return "Inactivo"
        }
      }
      $scope.chg_filtrar = function () {
        $scope.filter($scope.Filtrar_Sol);
      }
      $scope.initPaginacion = function (info) {
        $scope.Lista_Tabla_Temp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 15;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
      }

      $scope.filter = function (val) {
        $scope.Lista_Tabla_Temp = $filter('filter')($scope.Lista_Tabla, val);
        if ($scope.Lista_Tabla_Temp.length > 0) {
          $scope.setPage(1);
        }
        $scope.configPages();
      }
      $scope.closeModal = function () {
        $('.modal').modal('close');
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }

        if ($scope.currentPage >= $scope.pages.length)
          $scope.currentPage = $scope.pages.length - 1;
      }
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
        // console.log($scope.Lista_Tabla.length / $scope.pageSize - 1)
      }
      $scope.paso = function (tipo) {
        if (tipo == 'next') {
          var i = $scope.pages[0].no + 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no + 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage + 1;
          if ($scope.Lista_Tabla_Temp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.Lista_Tabla_Temp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.Lista_Tabla_Temp.length / $scope.pageSize) + 1;
          }
          if (fin > tamanomax) {
            fin = tamanomax;
            i = tamanomax - 9;
          }
        } else {
          var i = $scope.pages[0].no - 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no - 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage - 1;
          if (i <= 1) {
            i = 1;
            fin = $scope.pages.length;
          }
        }
        $scope.calcular(i, fin);
      }
      $scope.calcular = function (i, fin) {
        if (fin > 9) {
          i = fin - 9;
        } else {
          i = 1;
        }
        $scope.pages = [];
        for (i; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }
      }

      $scope.SetTab = function (x) {
        $scope.Tabs = x;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      $scope.reverse2 = true;
      $scope.sortBy2 = function (propertyName2) {
        $scope.reverse2 = ($scope.propertyName2 === propertyName2) ? !$scope.reverse2 : false;
        $scope.propertyName2 = propertyName2;
      };

      $scope.filter2 = function (val) {
        $scope.Lista_Tabla_Funcs_Filter = $filter('filter')($scope.Lista_Tabla_Funcs, val);
      }

    }]).filter('inicio', function () {
      return function (input, start) {
        if (input != undefined && start != NaN) {
          start = +start;
          return input.slice(start);
        } else {
          return null;
        }
      }
    });
