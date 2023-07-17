'use strict';
angular.module('GenesisApp')
  .controller('prescController', ['$scope', '$http', 'notification', 'afiliacionHttp', 'ngDialog', 'consultaHTTP',
    function ($scope, $http, notification, afiliacionHttp, ngDialog, consultaHTTP) {

      $scope.info_paciente = true;
      $scope.vw_prescripcion = true;
      $scope.vw_medicamento = true;
      $scope.vw_procedimiento = true;
      $scope.vw_dispositivo = true;
      $scope.vw_nutricional = true;
      $scope.vw_complementario = true;
      $scope.vw_noresponse = true;
      $scope.loadmipres = false;
      $scope.presbox = true;
      $scope.tipodoc = ' ';
      $scope.resetevw = function () {
        $scope.info_paciente = true;
        $scope.vw_prescripcion = true;
        $scope.vw_medicamento = true;
        $scope.vw_procedimiento = true;
        $scope.vw_dispositivo = true;
        $scope.vw_nutricional = true;
        $scope.vw_complementario = true;
        $scope.vw_noresponse = true;
      }

      $scope.BuscarAfiliado = function (tipodoc, identificacion) {

        if ($scope.tipodoc == "0") {
          notification.getNotification('info', 'Seleccione tipo de documento', 'Notificación');
        } else if ($scope.identificacion === undefined || $scope.identificacion == "") {
          notification.getNotification('error', 'Ingrese número de identificación', 'Notificación');
        } else {
          swal({
            title: 'Cargando información del afiliado'
          });
          swal.showLoading();
          $scope.afildata = "";
          consultaHTTP.obtenerNucleo('CABA', $scope.tipodoc, $scope.identificacion).then(function (response) {
            $scope.presbox = false;
            $scope.info_paciente = true;
           $scope.regimen = response[0].REG_HOM;
           $scope.regimen_caracter = response[0].REGIMEN;
           console.log(response);
           swal.close()
          })
        }
      }

      $scope.obtenersol = function () {
        afiliacionHttp.auteMIPRES($scope.numero_prescripcion).then(function (response) {
          $scope.autValor = response;
          if ($scope.autValor.data[0].CODERR != -1) {
            ngDialog.open({
              template: 'views/recobro/autorizacionp.html',
              className: 'ngdialog-theme-default',
              width: '80%',
              controller: 'solicitudautcontroller',
              controllerAs: 'solautoctrl',
              scope: $scope
            })
          } else {
            notification.getNotification('info', 'Numero de prescripcion no tiene codigo de autorizacion, actualizar codigo en Modulo Autorizacion de Oasis', 'Notificacion');
          }
          $scope.loadmipres = false;
        }).catch(function (error) {
          notification.getNotification('error', 'Afiliado no exite con este numero de prescripcion', 'Notificacion');
          $scope.loadmipres = false;
        });
      }

      $scope.buscarprescripcion = function () {
        $scope.loadmipres = true;
        $scope.obtenersol()
        var tipo = "ObtenerMipres";
        $scope.resetevw();
        afiliacionHttp.serviceMIPRES(tipo, $scope.numero_prescripcion,$scope.regimen_caracter).then(function (response) {
          $scope.prescripcion = response.data;
          $scope.info_paciente = false;
          if ($scope.prescripcion.length != 0) {
            if ($scope.prescripcion[0].procedimientos.length != 0) {
              $http({
                method: 'get',
                url: "php/recobro/mostrarprocedimiento.php",
                params: {
                  codigo: $scope.prescripcion[0].procedimientos[0].CodCUPS
                }
              }).then(function (response) {
                $scope.codigoprocedimiento = $scope.prescripcion[0].procedimientos[0].CodCUPS;
                $scope.nombreproc = response.data[0].NOMBRE;
                $scope.descrproc = response.data[0].DESCRIPCION;
              });




              $scope.JustNoPBS = $scope.prescripcion[0].procedimientos[0].JustNoPBS;
              $scope.IndRec = $scope.prescripcion[0].procedimientos[0].IndRec;
              $scope.vw_procedimiento = false;
            }
            if ($scope.prescripcion[0].medicamentos.length != 0) {
              $scope.vw_medicamento = false;
              $scope.DescMedPrinAct = $scope.prescripcion[0].medicamentos[0].DescMedPrinAct;
              $scope.JustNoPBS = $scope.prescripcion[0].medicamentos[0].JustNoPBS;
              $scope.IndRec = $scope.prescripcion[0].medicamentos[0].IndRec;
            }
            if ($scope.prescripcion[0].prescripcion.length != 0) {
              $scope.NoPrescripcion = $scope.prescripcion[0].prescripcion.NoPrescripcion;
              $scope.TipoIDPaciente = $scope.prescripcion[0].prescripcion.TipoIDPaciente;
              $scope.NroIDPaciente = $scope.prescripcion[0].prescripcion.NroIDPaciente;
              $scope.PNPaciente = $scope.prescripcion[0].prescripcion.PNPaciente;
              $scope.SNPaciente = $scope.prescripcion[0].prescripcion.SNPaciente;
              $scope.PAPaciente = $scope.prescripcion[0].prescripcion.PAPaciente;
              $scope.SAPaciente = $scope.prescripcion[0].prescripcion.SAPaciente;
              $scope.vw_prescripcion = false;
            }
            if ($scope.prescripcion[0].dispositivos.length != 0) {
              $scope.vw_dispositivo = false;
            }
            if ($scope.prescripcion[0].productosnutricionales.length != 0) {
              $scope.vw_nutricional = false;
              $scope.JustNoPBS = $scope.prescripcion[0].productosnutricionales[0].JustNoPBS;
              $scope.IndRec = $scope.prescripcion[0].productosnutricionales[0].IndRec;

            }
            if ($scope.prescripcion[0].serviciosComplementarios.length != 0) {
              $scope.vw_complementario = false;
              $scope.JustNoPBS = $scope.prescripcion[0].serviciosComplementarios[0].JustNoPBS;
              $scope.IndRec = $scope.prescripcion[0].serviciosComplementarios[0].IndRec;
            }
          } else {
            $scope.vw_noresponse = false;
          }
          // console.log($scope.prescripcion);
        }).catch(function (error) {
          notification.getNotification('error', 'el servicio de MIPRES no se encuentra habilitado...consultar con el administrador del sistema', 'Notificacion');
          $scope.loadmipres = false;
        })

      }
    }]);




