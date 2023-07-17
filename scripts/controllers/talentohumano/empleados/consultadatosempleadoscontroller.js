'use strict';
angular.module('GenesisApp')
  .controller('consultadatosempleadoscontroller', ['$scope', '$http', 'altocostoHttp', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
    function ($scope, $http) {

        $scope.Inicio = function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1300 && $(window).width() < 1500) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1500) {
          document.querySelector("#pantalla").style.zoom = 0.9;
        }

        $scope.img = true;
        // $scope.tipoPorCedula = false;
        $scope.resultadoBusqueda = false;
        $scope.divInfo = false;
        $scope.Tap = 1;
        $('.tabs').tabs();
        document.querySelector("#content").style.backgroundColor = "white";
      }


      $scope.LimpiarForm = function () {
        if($scope.Form.InputNombre == ""){

        }else{

          $scope.Form.InputNombre = "";
        }
        // $scope.Form.InputTipoCedula = "";
        // $scope.Form.InputCedula = "";
      }

      $scope.BuscarUsuarios = function (nombre) {
        $scope.resultadoBusqueda = false;
        $scope.divInfo = false;
        $scope.filter = "";
        if (nombre != "") {
          if (nombre != "" && nombre != null && nombre != undefined && nombre.length >= 3) {
            swal({ title: 'Cargando...' }).catch(swal.noop);
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
              data: { function: 'obtenerusuarios', dato: nombre }
            }).then(function (response) {
              swal.close();
              if (response.data.toString().substr(0, 3) != '<br') {
                if (response.data.length > 0) {
                  if (response.data.length > 1) {
                    $scope.img = false;
                    $scope.resultadoBusqueda = true;
                    $scope.usuarios = response.data;
                    $scope.InformacionAdicional($scope.usuarios);
                  } else {
                    $scope.TipoDoc = response.data[0].tipo;
                    $scope.numDoc = response.data[0].cedula;
                    $scope.SearchCedula($scope.TipoDoc, $scope.numDoc);
                  }
                } else {
                  swal({
                    title: "¡Importante!",
                    text: "No se encontraron registros",
                    type: "warning"
                  }).catch(swal.noop);
                }
              } else {
                swal({
                  title: "¡Importante!",
                  text: "Usuario con inconsistencia, favor reportar al area TIC nacional",
                  type: "warning",
                }).catch(swal.noop);
              }
            })
          }
          else {
            Materialize.toast('¡Ingrese un nombre valido!', 3000);
          }
        }else{
          Materialize.toast('¡Ingrese un nombre valido!', 3000);
          $scope.img = true;
          setTimeout(function () {
            $scope.$apply();
          }, 500)
        }

      }

      // $scope.BuscarUsuario = function (nombre) {
      //   debugger
      //   $scope.img = false;
      //   $scope.resultadoBusqueda = false;
      //   $scope.divInfo = false;
      //   $scope.filter = "";
      //   if (!$scope.tipoPorCedula) {
      //     if (nombre != "" && nombre != null && nombre != undefined && nombre.length >= 3) {
      //       swal({ title: 'Cargando...' }).catch(swal.noop);
      //       swal.showLoading();
      //       $http({
      //         method: 'POST',
      //         url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
      //         data: { function: 'obtenerusuarios', dato: nombre }
      //       }).then(function (response) {
      //         swal.close();
      //         if (response.data.toString().substr(0, 3) != '<br') {
      //           if (response.data.length > 0 && response.data[0].cedula != undefined) {
      //             $scope.resultadoBusqueda = true;
      //             $scope.usuarios = response.data;
      //             $scope.InformacionAdicional($scope.usuarios);
      //             console.log($scope.usuarios);
      //           } else {
      //             swal({
      //               title: "¡Importante!",
      //               text: "No se encontraron registros",
      //               type: "warning"
      //             }).catch(swal.noop);
      //           }
      //         } else {
      //           swal({
      //             title: "¡Importante!",
      //             text: "Usuario con inconsistencia, favor reportar al area TIC nacional",
      //             type: "warning",
      //           }).catch(swal.noop);
      //         }
      //       })
      //     }
      //     else {
      //       Materialize.toast('¡Ingrese un nombre valido!', 3000);
      //     }
      //   } else {
      //     if ($scope.Form.InputTipoCedula != undefined && $scope.Form.InputCedula != undefined) {
      //       $scope.filter = "";
      //       swal({ title: 'Cargando...' }).catch(swal.noop);
      //       swal.showLoading();
      //       $http({
      //         method: 'POST',
      //         url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
      //         data: { function: 'obtnerinformacion', id: $scope.Form.InputCedula, tipo: $scope.Form.InputTipoCedula }
      //       }).then(function (response) {
      //         swal.close();
      //         if (response.data.estado == '1') {
      //           $scope.Tap = 1;
      //           $scope.datos = response.data;
      //           $scope.divInfo = true;
      //           $scope.InformacionAdicional($scope.datos);
      //           $scope.obtenernovedades($scope.datos);
      //           $scope.tipoPorCedula = true;
      //           setTimeout(function () {
      //             $('#Tab1').click();
      //           }, 500)
      //         } else {
      //           swal({
      //             title: "¡Importante!",
      //             text: "No se encontraron registros",
      //             type: "warning",
      //           }).catch(swal.noop);
      //         }
      //       })
      //     } else {
      //       Materialize.toast('¡Debe Completar los campos!', 3000);
      //     }
      //   }

      // }

      $scope.SearchCedula = function (TipoDoc, NumDoc) {
        $scope.img = false;
        $scope.filter = "";
        $scope.Form.InputTipoCedula = TipoDoc;
        $scope.Form.InputCedula = NumDoc;
        if ($scope.Form.InputTipoCedula != undefined && $scope.Form.InputCedula != undefined) {
          // swal({ title: 'Cargando...' }).catch(swal.noop);
          // swal.showLoading();
          $http({
            method: 'POST',
            url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
            data: { function: 'obtnerinformacion', id: $scope.Form.InputCedula, tipo: $scope.Form.InputTipoCedula }
          }).then(function (response) {
            swal.close();
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data.estado == '1') {
                $scope.Tap = 1;
                $scope.datos = response.data;
                $scope.divInfo = true;
                $scope.resultadoBusqueda = false;
                $scope.InformacionAdicional($scope.datos);
                $scope.obtenernovedades($scope.datos);
                // $scope.tipoPorCedula = true;
                setTimeout(function () {
                  $('#Tab1').click();
                }, 500)
              } else {
                swal({
                  title: "¡Importante!",
                  text: "No se encontraron registros",
                  type: "warning",
                }).catch(swal.noop);
              }
            } else {
              swal({
                title: "¡Importante!",
                text: "Usuario con inconsistencia, favor reportar al area TIC nacional",
                type: "warning",
              }).catch(swal.noop);
            }
          })
        } else {
          Materialize.toast('¡Debe Completar los campos!', 3000);
          // notification.getNotification('warning', 'Debe Completar los campos', 'Notificacion');
        }
      }

      $scope.InformacionAdicional = function (data) {
        $scope.Form.InputCedula = data.cedula;
        $http({
          method: 'POST',
          url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
          data: { function: "obtenerinfoadicional", id: $scope.Form.InputCedula }
        }).then(function (response) {
          $scope.dataadicional = response.data;
          $scope.beneficiarios = $scope.dataadicional.beneficiarios;
        })
      }

      $scope.obtenernovedades = function (data) {
        $scope.Form.InputCedula = data.cedula;
        $http({
          method: 'POST',
          url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
          data: { function: "obtenernovedades", id: $scope.Form.InputCedula }
        }).then(function (response) {
          $scope.datanovedad = response.data;
        })
      }

      $scope.setTab = function (x) {
        $scope.Tap = x;
        setTimeout(function () {
          $scope.$apply();
        }, 500)
      }

      $scope.KeyFind_Usuario = function (keyEvent) {
        if (keyEvent.which === 13) {
          $scope.BuscarUsuarios($scope.Form.InputNombre);
        }
      }
      // $scope.KeyFind_Usuario = function (keyEvent) {
      //   if (keyEvent.which === 13) {
      //     if ($scope.tipoPorCedula == true) {
      //       if ($scope.Form.InputTipoCedula != "" && $scope.Form.InputCedula != "") {
      //         $scope.SearchCedula($scope.Form.InputTipoCedula, $scope.Form.InputCedula);
      //       }
      //     } else {
      //       $scope.BuscarUsuario($scope.Form.InputNombre);
      //     }
      //   }
      // }

      $scope.Change = function () {
        //$scope.tipoPorCedula = !$scope.tipoPorCedula;
        $scope.LimpiarForm();
        $scope.resultadoBusqueda = false;
        $scope.divInfo = false;
        $scope.img = true;
        setTimeout(function () {
          $scope.$apply();
        }, 500)
      }

      $scope.Cerrar = function () {
        $scope.LimpiarForm();
        // $scope.tipoPorCedula = false;
        $scope.resultadoBusqueda = false;
        $scope.divInfo = false;
        $scope.img = true;
        setTimeout(function () {
          $scope.$apply();
        }, 500)
      }


      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

    }])
