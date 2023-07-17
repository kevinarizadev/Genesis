'use strict';
angular.module('GenesisApp')
  .controller('adminsiniestrosController', ['$scope', '$http', '$filter', '$q',
    function ($scope, $http, $filter, $q) {
      $(document).ready(function () {
        $('.modal').modal();
        $('.tabs').tabs();
        $scope.Tabs = 1;
        console.log($(window).width());
        if ($(window).width() < 1100) {
          document.querySelector("#versionamiento").style.zoom = 0.7;
        }
        if ($(window).width() > 1100) {
          document.querySelector("#versionamiento").style.zoom = 0.8;
        }
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $scope.Vista = 0;

        $scope.Busqueda = {
          Clase: {
            Filtro: null,
            Listado: null,
            Lista: null,
            SAVE: null,
            Cohorte: null,
            Seleccion: 9999
          },
          Diagnostico: {
            Filtro: null,
            Listado: null,
            SAVE: null,
            Cohorte: null,
            Seleccion: 9999
          },
          Func_Cohorte: {
            Filtro: null,
            Listado: null,
            SAVE: null,
            Seleccion: 9999
          }
        };
        $scope.ObtenerListado_Cohortes();
        $scope.ObtenerListado_Funcs('X');
        $scope.SysDay = new Date();
        setTimeout(() => {
          $scope.$apply();
        }, 500);
        // setTimeout(() => {
        //   $scope.Agregar_Func();
        // }, 3000);

        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        ///////////P-PENDIENTE---G-GESTIONADO---X-ANULADO/////////
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
      });

      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      $scope.ObtenerListado_Cohortes = function () {
        $http({
          method: 'POST',
          url: "php/altocosto/siniestros/adminsiniestros.php",
          data: {
            function: 'Obtener_Cohortes',
            Doc: 'AL'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Array_Cohortes = [];
            $scope.Busqueda.Clase.Lista = [];
            setTimeout(() => {
              response.data.Cohortes.forEach(e => {
                $scope.Array_Cohortes.push({ CODIGO: e.CODIGO, NOMBRE: e.COHORTE });
              });
              response.data.Clases.forEach(e => {
                $scope.Busqueda.Clase.Lista.push({ CLASE: e.COD_CONCEPTO, CODIGO: e.CLASE_CONCEPTO, NOMBRE: e.DESCRIPCION });
              });
              $scope.$apply();
            }, 500);
            setTimeout(() => {
              $('#Tab1').click();
            }, 1000);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        })
      }

      $scope.ObtenerListado_Diags = function (Coh) {
        if (Coh != undefined) {
          swal({ title: 'Cargando...' });
          swal.showLoading();
        }
        $scope.Lista_Tabla = [];
        $scope.Cohorte_Sel = Coh
        $http({
          method: 'POST',
          url: "php/altocosto/siniestros/adminsiniestros.php",
          data: {
            function: 'Obtener_Diags',
            Doc: 'AL',
            Coh: Coh
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Lista_Tabla = response.data;
            $scope.initPaginacion($scope.Lista_Tabla);
            setTimeout(() => {
              $scope.$apply();
            }, 500);
            swal.close();
            /////
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        })
      }

      $scope.Agregar_Diags = function () {
        $scope.Modal_Consulta_Cod_Cohorte = "";

        $scope.Modal_Consulta_Cod_Clase = "";
        $scope.Modal_Consulta_Clase = "";
        $scope.Busqueda.Clase.SAVE = "";

        $scope.Modal_Consulta_Diagnostico_Cod = "";
        $scope.Modal_Consulta_Diagnostico = "";
        $scope.Busqueda.Diagnostico.SAVE = "";
        //
        $('#Modal_NuevoDiag').modal('open');
        setTimeout(() => { $scope.$apply(); }, 500);
        document.getElementById("Modal_Consulta_Cod_Cohorte").focus();
      }

      $scope.In_Ac_Diag = function (X) {
        var Texto = 'Diagnóstico: ' + $scope.capitalizeFirstLetter(X.DESCRIPCION) + ' - Cohorte: ' + $scope.capitalizeFirstLetter(X.NOM_COHORTE);
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
              url: "php/altocosto/siniestros/adminsiniestros.php",
              data: {
                function: 'In_Ac_Diag',
                Diag: X.DIAGNOSTICO,
                Patologia: X.COD_COHORTE,
                Estado: X.ESTADO,
                Con: 'AL',
                Clase: X.COD_CLASE,
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
                    $scope.ObtenerListado_Diags($scope.Cohorte_Sel);
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

      $scope.Chg_Cohorte = function () {
        if ($scope.Busqueda.Clase.Lista) {
          $scope.Busqueda.Clase.Listado = [];
          $scope.Busqueda.Clase.Lista.forEach(e => {
            if ($scope.Modal_Consulta_Cod_Cohorte == e.CLASE) {
              $scope.Busqueda.Clase.Listado.push({ CLASE: e.CLASE, CODIGO: e.CODIGO, NOMBRE: e.NOMBRE });
            }
          });
          setTimeout(() => {
            debugger
            if ($scope.Busqueda.Clase.Listado.length == 1) {
              $scope.FillTextbox_Listado_Clase($scope.Busqueda.Clase.Listado[0].CODIGO, $scope.Busqueda.Clase.Listado[0].NOMBRE);
              document.getElementById("Modal_Consulta_Diagnostico").focus();
            } else {
              $scope.Modal_Consulta_Clase = '';
              $scope.Busqueda.Clase.SAVE = null;
              $scope.Busqueda.Clase.Filtro = $scope.Busqueda.Clase.Listado;
              document.getElementById("Modal_Consulta_Clase").focus();
              $('.Clase_Listar_Clases').css({ width: $('#Modal_Consulta_Clase')[0].offsetWidth });
            }
            $scope.$apply();
          }, 500);
        }
      }

      //CONSULTA CLASE
      $scope.KeyFind_ObClase = function (keyEvent) {
        if ($scope.Busqueda.Clase.Filtro != null && $scope.Busqueda.Clase.Filtro.length != 0) {
          if (keyEvent.which === 40) {
            $scope.Busqueda.Clase.Seleccion = $scope.Busqueda.Clase.Seleccion >= ($scope.Busqueda.Clase.Filtro.length - 1) ? 0 : $scope.Busqueda.Clase.Seleccion + 1;
            document.querySelector('.Clase_Scroll').scrollTo(0, document.querySelector('#Clase' + $scope.Busqueda.Clase.Seleccion).offsetTop);
          } else if (keyEvent.which === 38) {
            $scope.Busqueda.Clase.Seleccion = $scope.Busqueda.Clase.Seleccion <= 0 || $scope.Busqueda.Clase.Seleccion == 9999 ? $scope.Busqueda.Clase.Filtro.length - 1 : $scope.Busqueda.Clase.Seleccion - 1;
            document.querySelector('.Clase_Scroll').scrollTo(0, document.querySelector('#Clase' + $scope.Busqueda.Clase.Seleccion).offsetTop)
          } else if (keyEvent.which === 13 && $scope.Busqueda.Clase.Seleccion != 9999) {
            var x = $scope.Busqueda.Clase.Filtro[$scope.Busqueda.Clase.Seleccion];
            $scope.FillTextbox_Listado_Clase(x.CODIGO, x.NOMBRE);
          }
        }
        //  else {
        //   if (keyEvent.which === 13)
        //     $scope.Buscar_Clase();
        // }
      }
      $scope.Complete_Listado_Clase = function (string) {
        if ($scope.Modal_Consulta_Clase != undefined && string != undefined && $scope.Busqueda.Clase.Listado != undefined) {
          $('.Clase_Listar_Clases').css({ width: $('#Modal_Consulta_Clase')[0].offsetWidth });
          var output = [];
          angular.forEach($scope.Busqueda.Clase.Listado, function (x) {
            if (x.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.CODIGO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
              output.push({ "CODIGO": x.CODIGO, "NOMBRE": x.NOMBRE.toUpperCase(), CLASE: x.COD_CONCEPTO, });
            }
          });
          $scope.Busqueda.Clase.Filtro = output;
        }
      }
      $scope.FillTextbox_Listado_Clase = function (codigo, nombre) {
        $scope.Modal_Consulta_Cod_Clase = codigo;
        $scope.Modal_Consulta_Clase = codigo + ' - ' + nombre;
        $scope.Busqueda.Clase.SAVE = codigo + ' - ' + nombre;
        $scope.Busqueda.Clase.Filtro = null;
        document.getElementById("Modal_Consulta_Diagnostico").focus();
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
      $scope.Blur_Clase = function () {
        setTimeout(() => {
          if ($scope.Modal_Consulta_Clase != null && $scope.Busqueda.Clase != undefined) {
            if (($scope.Busqueda.Clase.Filtro == null || $scope.Busqueda.Clase.Filtro.length == 0)
              && $scope.Modal_Consulta_Clase != $scope.Busqueda.Clase.SAVE) {
              $scope.Modal_Consulta_Clase = $scope.Busqueda.Clase.SAVE;
            }
            if ($scope.Modal_Consulta_Clase == '') {
              $scope.Modal_Consulta_Clase = $scope.Busqueda.Clase.SAVE;
              $scope.Busqueda.Clase.Filtro = null;
            }
          }
          $scope.$apply();
        }, 300);
      }

      //CONSULTA DIAGNOSTICO
      $scope.KeyFind_ObDiag = function (keyEvent) {
        if ($scope.Busqueda.Diagnostico.Filtro != null && $scope.Busqueda.Diagnostico.Filtro.length != 0) {
          if (keyEvent.which === 40) {
            $scope.Busqueda.Diagnostico.Seleccion = $scope.Busqueda.Diagnostico.Seleccion >= ($scope.Busqueda.Diagnostico.Filtro.length - 1) ? 0 : $scope.Busqueda.Diagnostico.Seleccion + 1;
            document.querySelector('.Diagnostico_Scroll').scrollTo(0, document.querySelector('#Diagnostico' + $scope.Busqueda.Diagnostico.Seleccion).offsetTop);
          } else if (keyEvent.which === 38) {
            $scope.Busqueda.Diagnostico.Seleccion = $scope.Busqueda.Diagnostico.Seleccion <= 0 || $scope.Busqueda.Diagnostico.Seleccion == 9999 ? $scope.Busqueda.Diagnostico.Filtro.length - 1 : $scope.Busqueda.Diagnostico.Seleccion - 1;
            document.querySelector('.Diagnostico_Scroll').scrollTo(0, document.querySelector('#Diagnostico' + $scope.Busqueda.Diagnostico.Seleccion).offsetTop)
          } else if (keyEvent.which === 13 && $scope.Busqueda.Diagnostico.Seleccion != 9999) {
            var x = $scope.Busqueda.Diagnostico.Filtro[$scope.Busqueda.Diagnostico.Seleccion];
            $scope.FillTextbox_Listado_Diag(x.CODIGO, x.DIAGNOSTICO);
          }
        } else {
          if (keyEvent.which === 13)
            $scope.Buscar_Diag();
        }
      }
      $scope.Buscar_Diag = function () {
        if ($scope.Modal_Consulta_Diagnostico.length > 2) {
          $http({
            method: 'POST',
            url: "php/altocosto/siniestros/adminsiniestros.php",
            data: {
              function: 'Busqueda_Diags',
              Con: $scope.Modal_Consulta_Diagnostico.toUpperCase()
            }
          }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data[0] != undefined && response.data.length > 1) {
                $scope.Busqueda.Diagnostico.Filtro = response.data;
                $scope.Busqueda.Diagnostico.Listado = response.data;
                $('.Clase_Listar_Diags').css({ width: $('#Modal_Consulta_Diagnostico')[0].offsetWidth });
              }
              if (response.data.length == 1) {
                if (response.data[0].CODIGO == '-1') {
                  swal({
                    title: "¡Mensaje!",
                    text: response.data[0].Nombre,
                    type: "info",
                  }).catch(swal.noop);
                  $scope.Busqueda.Diagnostico.Filtro = null;
                  $scope.Busqueda.Diagnostico.Listado = null;
                } else {
                  $scope.FillTextbox_Listado_Diag(response.data[0].CODIGO, response.data[0].DIAGNOSTICO);
                }
              } else if (response.data.length == 0) {
                swal({
                  title: "¡Importante!",
                  text: "No se encontro el diagnostico",
                  type: "info",
                }).catch(swal.noop);
              }
            } else {
              swal({
                title: "¡IMPORTANTE!",
                text: response.data,
                type: "warning"
              }).catch(swal.noop);
            }
          })
        } else {
          Materialize.toast('¡Digite al menos 3 caracteres!', 1000); $('.toast').addClass('default-background-dark');
        }
      }
      $scope.Complete_Listado_Diag = function (string) {
        if ($scope.Modal_Consulta_Diagnostico != undefined && string != undefined && $scope.Busqueda.Diagnostico.Listado != undefined) {
          $('.Clase_Listar_Diags').css({ width: $('#Modal_Consulta_Diagnostico')[0].offsetWidth });
          var output = [];
          angular.forEach($scope.Busqueda.Diagnostico.Listado, function (x) {
            if (x.DIAGNOSTICO.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.CODIGO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
              output.push({ "CODIGO": x.CODIGO, "DIAGNOSTICO": x.DIAGNOSTICO.toUpperCase() });
            }
          });
          $scope.Busqueda.Diagnostico.Filtro = output;
        }
      }
      $scope.FillTextbox_Listado_Diag = function (codigo, nombre) {
        $scope.Modal_Consulta_Diagnostico_Cod = codigo;
        $scope.Modal_Consulta_Diagnostico = codigo + ' - ' + nombre;
        $scope.Busqueda.Diagnostico.SAVE = codigo + ' - ' + nombre;
        $scope.Busqueda.Diagnostico.Filtro = null;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
      $scope.Blur_Diag = function () {
        setTimeout(() => {
          if ($scope.Modal_Consulta_Diagnostico != null && $scope.Modal_Consulta_Diagnostico != undefined) {
            if (($scope.Busqueda.Diagnostico.Filtro == null || $scope.Busqueda.Diagnostico.Filtro.length == 0)
              && $scope.Modal_Consulta_Diagnostico != $scope.Busqueda.Diagnostico.SAVE) {
              $scope.Modal_Consulta_Diagnostico = $scope.Busqueda.Diagnostico.SAVE;
            }
            if ($scope.Modal_Consulta_Diagnostico == '') {
              $scope.Modal_Consulta_Diagnostico = $scope.Busqueda.Diagnostico.SAVE;
              $scope.Busqueda.Diagnostico.Filtro = null;
            }
          }
          $scope.$apply();
        }, 300);
      }

      $scope.Validar_CamposVacios = function () {
        var defered = $q.defer();
        var promise = defered.promise;
        var Campos_Empty = false;
        angular.forEach(document.querySelectorAll('#Modal_NuevoDiag .red-text'), function (i) {
          i.classList.remove('red-text');
        });
        if ($scope.Modal_Consulta_Cod_Cohorte == undefined || $scope.Modal_Consulta_Cod_Cohorte == null || $scope.Modal_Consulta_Cod_Cohorte == '') {
          Campos_Empty = true; document.querySelector('#Modal_Consulta_Cod_Cohorte_Label').classList.add('red-text');
          document.getElementById('Modal_Consulta_Cod_Cohorte_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Modal_Consulta_Cod_Clase == undefined || $scope.Modal_Consulta_Cod_Clase == null || $scope.Modal_Consulta_Cod_Clase == '') {
          Campos_Empty = true; document.querySelector('#Modal_Consulta_Clase_Label').classList.add('red-text');
          document.getElementById('Modal_Consulta_Clase_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Modal_Consulta_Diagnostico_Cod == undefined || $scope.Modal_Consulta_Diagnostico_Cod == null || $scope.Modal_Consulta_Diagnostico_Cod == '') {
          Campos_Empty = true; document.querySelector('#Modal_Consulta_Cod_Diag_Label').classList.add('red-text');
          document.getElementById('Modal_Consulta_Cod_Diag_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        defered.resolve(Campos_Empty);
        return promise;
      }
      $scope.Guardar_Diag = function () {
        var promise = $scope.Validar_CamposVacios();
        promise.then(function (response) {
          if (!response) {
            var data = {
              Diagnostico: $scope.Modal_Consulta_Diagnostico_Cod,
              Cohorte: $scope.Modal_Consulta_Cod_Cohorte,
              Documento: 'AL',
              Grupo_ac: $scope.Modal_Consulta_Cod_Clase,
              Responsable: $scope.Rol_Cedula
            }
            swal({ title: 'Cargando...' });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/altocosto/siniestros/adminsiniestros.php",
              data: {
                function: 'Inserta_Diags',
                data: JSON.stringify(data)
              }
            }).then(function (response) {
              if (response.data && response.data.toString().substr(0, 3) != '<br') {
                if (response.data.Codigo == 0) {
                  $scope.closeModal();
                  $scope.ObtenerListado_Diags($scope.Cohorte_Sel);
                  swal({
                    title: "Mensaje",
                    text: response.data.Nombre,
                    type: "success",
                  }).catch(swal.noop);
                } else {
                  swal({
                    title: "Mensaje",
                    text: response.data.Nombre,
                    type: "info",
                  }).catch(swal.noop);
                }
              } else {
                swal({
                  title: "¡Ocurrio un error!",
                  text: response.data,
                  type: "warning"
                }).catch(swal.noop);
              }
            });
          } else {
            Materialize.toast('¡Campos vacios o incompletos!', 1000); $('.toast').addClass('default-background-dark');
          }
        });
      }


      $scope.Ver_Traza = function (X) {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $scope.Array_Traza = null;
        $http({
            method: 'POST',
            url: "php/altocosto/siniestros/adminsiniestros.php",
            data: {
                function: 'Traza_Diag',
                Doc: 'AL',
                Con: X.COD_COHORTE,
                Clase: X.COD_CLASE,
                Diag: X.DIAGNOSTICO
            }
        }).then(function (response) {
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
                if (response.data.length > 0) {
                    $('#Modal_Trazabilidad').modal('open');
                    $scope.Array_Traza = response.data;
                    swal.close();
                } else {
                    swal({
                        title: response.data.Nombre,
                        type: "warning",
                    }).catch(swal.noop);
                }

            }
        });
    }
      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      $scope.ObtenerListado_Funcs = function (X) {
        $scope.Lista_Tabla_Funcs = [];
        $scope.Lista_Tabla_Funcs_Filter = [];
        if (X != undefined) {
          swal({ title: 'Cargando...' });
          swal.showLoading();
        }
        $http({
          method: 'POST',
          url: "php/altocosto/siniestros/adminsiniestros.php",
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
              $scope.$apply();
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
        // $scope.Modal_Func_Cedula = "1042439637";
        $scope.Modal_Func_Cedula = "";
        $scope.Modal_Func_Nombre = "";
        $scope.Modal_Func_Perfil = "";
        $scope.Modal_Func_Cargo = "";
        $scope.Modal_Func_Cohorte = "";
        $scope.Modal_Func_Cohorte_Cod = "";
        $scope.Busqueda.Func_Cohorte.SAVE = "";
        $scope.Busqueda.Func_Cohorte.Listado = $scope.Array_Cohortes;
        $scope.Busqueda.Func_Cohorte.Filtro = $scope.Array_Cohortes;
        //
        $('#Modal_NuevoFunc').modal('open');
        setTimeout(() => { $scope.$apply(); }, 500);
        document.getElementById("Modal_Func_Cedula").focus();
      }
      $scope.Key_Func = function (keyEvent) {
        if (keyEvent.which === 13) {
          $scope.Buscar_Func();
        } else {
          $scope.Modal_Func_Nombre = "";
          $scope.Modal_Func_Perfil = "";
          $scope.Modal_Func_Cargo = "";
          $scope.Modal_Func_Cohorte = "";
          $scope.Modal_Func_Cohorte_Cod = "";
          $scope.Busqueda.Func_Cohorte.SAVE = "";
          setTimeout(() => { $scope.$apply(); }, 500);
        }
      }
      $scope.Buscar_Func = function () {
        if ($scope.Modal_Func_Cedula.length > 2) {
          $http({
            method: 'POST',
            url: "php/altocosto/siniestros/adminsiniestros.php",
            data: {
              function: 'Buscar_Func',
              Con: $scope.Modal_Func_Cedula.toUpperCase()
            }
          }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data[0] != undefined) {
                $scope.Modal_Func_Nombre = response.data[0].NOMBRE;
                $scope.Modal_Func_Perfil = (response.data[0].ROLID == 'S') ? 'SECCIONAL' : 'NACIONAL';
                $scope.Modal_Func_Cargo = response.data[0].CARGO;
                $scope.Modal_Func_Cargo_Cod = response.data[0].COD_CARGO;
                setTimeout(() => {
                  $('.Clase_Listar_Func_Cohortes').css({ width: $('#Modal_Func_Cohorte')[0].offsetWidth });
                }, 1000);
              } else {
                swal({
                  title: "¡IMPORTANTE!",
                  text: response.data.Nombre,
                  type: "warning"
                }).catch(swal.noop);
              }
              // $scope.Modal_Consulta_Nombre
            } else {
              swal({
                title: "¡IMPORTANTE!",
                text: response.data,
                type: "warning"
              }).catch(swal.noop);
            }
          })
        } else {
          Materialize.toast('¡Digite al menos 3 caracteres!', 1000); $('.toast').addClass('default-background-dark');
        }
      }

      //CONSULTA FUNC COHORTE
      $scope.KeyFind_ObFunc_Cohorte = function (keyEvent) {
        if ($scope.Busqueda.Func_Cohorte.Filtro != null && $scope.Busqueda.Func_Cohorte.Filtro.length != 0) {
          if (keyEvent.which === 40) {
            $scope.Busqueda.Func_Cohorte.Seleccion = $scope.Busqueda.Func_Cohorte.Seleccion >= ($scope.Busqueda.Func_Cohorte.Filtro.length - 1) ? 0 : $scope.Busqueda.Func_Cohorte.Seleccion + 1;
            document.querySelector('.Func_Cohorte_Scroll').scrollTo(0, document.querySelector('#Func_Cohorte' + $scope.Busqueda.Func_Cohorte.Seleccion).offsetTop);
          } else if (keyEvent.which === 38) {
            $scope.Busqueda.Func_Cohorte.Seleccion = $scope.Busqueda.Func_Cohorte.Seleccion <= 0 || $scope.Busqueda.Func_Cohorte.Seleccion == 9999 ? $scope.Busqueda.Func_Cohorte.Filtro.length - 1 : $scope.Busqueda.Func_Cohorte.Seleccion - 1;
            document.querySelector('.Func_Cohorte_Scroll').scrollTo(0, document.querySelector('#Func_Cohorte' + $scope.Busqueda.Func_Cohorte.Seleccion).offsetTop)
          } else if (keyEvent.which === 13 && $scope.Busqueda.Func_Cohorte.Seleccion != 9999) {
            var x = $scope.Busqueda.Func_Cohorte.Filtro[$scope.Busqueda.Func_Cohorte.Seleccion];
            $scope.FillTextbox_Listado_Func_Cohorte(x.CODIGO, x.NOMBRE);
          }
        } else {
          if (keyEvent.which === 13)
            $scope.Buscar_Func_Cohorte();
        }
      }
      $scope.Complete_Listado_Func_Cohorte = function (string) {
        if ($scope.Modal_Func_Cohorte != undefined && string != undefined && $scope.Busqueda.Func_Cohorte.Listado != undefined) {
          $('.Clase_Listar_Func_Cohortes').css({ width: $('#Modal_Func_Cohorte')[0].offsetWidth });
          var output = [];
          angular.forEach($scope.Busqueda.Func_Cohorte.Listado, function (x) {
            if (x.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.CODIGO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
              output.push({ "CODIGO": x.CODIGO, "NOMBRE": x.NOMBRE.toUpperCase() });
            }
          });
          $scope.Busqueda.Func_Cohorte.Filtro = output;
        }
      }
      $scope.FillTextbox_Listado_Func_Cohorte = function (codigo, nombre) {
        $scope.Modal_Func_Cohorte_Cod = codigo;
        $scope.Modal_Func_Cohorte = codigo + ' - ' + nombre;
        $scope.Busqueda.Func_Cohorte.SAVE = codigo + ' - ' + nombre;
        $scope.Busqueda.Func_Cohorte.Filtro = null;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
      $scope.Blur_Func_Cohorte = function () {
        setTimeout(() => {
          if ($scope.Modal_Func_Cohorte != null && $scope.Busqueda.Func_Cohorte != undefined) {
            if (($scope.Busqueda.Func_Cohorte.Filtro == null || $scope.Busqueda.Func_Cohorte.Filtro.length == 0)
              && $scope.Modal_Func_Cohorte != $scope.Busqueda.Func_Cohorte.SAVE) {
              $scope.Modal_Func_Cohorte = $scope.Busqueda.Func_Cohorte.SAVE;
            }
            if ($scope.Modal_Func_Cohorte == '') {
              $scope.Modal_Func_Cohorte = $scope.Busqueda.Func_Cohorte.SAVE;
              $scope.Busqueda.Func_Cohorte.Filtro = null;
            }
          }
          $scope.$apply();
        }, 300);
      }

      $scope.Validar_CamposVacios_Func = function () {
        var defered = $q.defer();
        var promise = defered.promise;
        var Campos_Empty = false;
        angular.forEach(document.querySelectorAll('#Modal_NuevoFunc .red-text'), function (i) {
          i.classList.remove('red-text');
        });
        if ($scope.Modal_Func_Cedula == undefined || $scope.Modal_Func_Cedula == null || $scope.Modal_Func_Cedula == '') {
          Campos_Empty = true; document.querySelector('#Modal_Func_Cedula_Label').classList.add('red-text');
          document.getElementById('Modal_Func_Cedula_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Modal_Func_Perfil == undefined || $scope.Modal_Func_Perfil == null || $scope.Modal_Func_Perfil == '') {
          Campos_Empty = true; document.querySelector('#Modal_Func_Perfil_Label').classList.add('red-text');
          document.getElementById('Modal_Func_Perfil_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Modal_Func_Cargo_Cod == 150) {
          if ($scope.Modal_Func_Cohorte_Cod == undefined || $scope.Modal_Func_Cohorte_Cod == null || $scope.Modal_Func_Cohorte_Cod == '') {
            Campos_Empty = true; document.querySelector('#Modal_Func_Cohorte_Label').classList.add('red-text');
            document.getElementById('Modal_Func_Cohorte_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
        }
        defered.resolve(Campos_Empty);
        return promise;
      }
      $scope.Guardar_Func = function () {
        var promise = $scope.Validar_CamposVacios_Func();
        promise.then(function (response) {
          if (!response) {
            swal({ title: 'Cargando...' });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/altocosto/siniestros/adminsiniestros.php",
              data: {
                function: 'Guardar_Func',
                Resp: $scope.Rol_Cedula,
                Func: $scope.Modal_Func_Cedula,
                Coh: $scope.Modal_Func_Cohorte_Cod,
                Origen: $scope.Modal_Func_Perfil.toString().substr(0, 1),
                Accion: 'A'
              }
            }).then(function (response) {
              if (response.data && response.data.toString().substr(0, 3) != '<br') {
                if (response.data.Codigo == 0) {
                  $scope.closeModal();
                  $scope.ObtenerListado_Funcs('X');
                  swal({
                    title: "Mensaje",
                    text: response.data.Nombre,
                    type: "success",
                  }).catch(swal.noop);
                } else {
                  swal({
                    title: "Mensaje",
                    text: response.data.Nombre,
                    type: "info",
                  }).catch(swal.noop);
                }
              } else {
                swal({
                  title: "¡Ocurrio un error!",
                  text: response.data,
                  type: "warning"
                }).catch(swal.noop);
              }
            });
          } else {
            Materialize.toast('¡Campos vacios o incompletos!', 1000); $('.toast').addClass('default-background-dark');
          }
        });
      }

      $scope.In_Ac_Func = function (X) {
        var title = X.ESTADO_EMPLEADO == 'A' ? '¿Inactivar Funcionario?' : '¿Activar Funcionario?';
        swal({
          title: title,
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
              url: "php/altocosto/siniestros/adminsiniestros.php",
              data: {
                function: 'Guardar_Func',
                Resp: $scope.Rol_Cedula,
                Func: X.CODIGO,
                Coh: '',
                Origen: '',
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
                    $scope.ObtenerListado_Funcs($scope.Cohorte_Sel);
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
