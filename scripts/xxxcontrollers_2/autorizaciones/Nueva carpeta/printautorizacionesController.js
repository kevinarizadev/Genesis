'use strict';
angular.module('GenesisApp')
  .controller('printautorizacionesController', ['$scope', '$http',
    function ($scope, $http) {
      (function () {
        $scope.tempnumero = null;
        $scope.tempubicacion = null;
        $scope.temptipoDoc = '';
        $scope.tempdocumento = null;
        $scope.inactive1 = true;
        $scope.filterautprint = 'AFILIADO';
        $scope.cedula = sessionStorage.getItem('cedula');
        $scope.rol = sessionStorage.getItem('rolcod');
    
      }());

      $scope.Obtener_Tipos_Documentos = function () {
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Tipos_Documentos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
$scope.Obtener_Tipos_Documentos();

          $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'p_validar_permisos', rol: $scope.rol, opcion: '1' }
      }).then(function (response) {        
        if (response.data.PERMISO =="S") {
          $scope.rolaut = false;
        }else{
          $scope.rolaut = true;
        }
      })

      $scope.required_fiels = true;
      $scope.text_fiels = '';
      $scope.buscarAutPrint = function () {
        $scope.Autorizaciones = [];
        var tipodocumento = 'CC';
        var documento = 0;
        var numero = 0;
        var ubicacion = 0;
        if ($scope.filterautprint == 'AUTORIZACION') {
          if (($scope.tempnumero == '' || $scope.tempnumero == null) || ($scope.tempubicacion == '' || $scope.tempubicacion == null)) {
            $scope.required_fiels = true;
            $scope.text_fiels = 'Datos de la Autorización Incompletos';
          } else {
            tipodocumento = 'CC';
            documento = 0;
            numero = $scope.tempnumero;
            ubicacion = $scope.tempubicacion;
            $scope.required_fiels = false;
          }



        }
        if ($scope.filterautprint == 'AFILIADO') {
          if (($scope.temptipoDoc == '' || $scope.temptipoDoc == null) || ($scope.tempdocumento == '' || $scope.tempdocumento == null)) {
            $scope.required_fiels = true;
            $scope.text_fiels = 'Datos del Afiliado Incompletos';
          } else {
            var numero = 0;
            var ubicacion = 0;
            tipodocumento = $scope.temptipoDoc;
            documento = $scope.tempdocumento;
            $scope.required_fiels = false;
          }
        }

        if ($scope.required_fiels == false) {
          $scope.json = { "numero": numero, "ubicacion": ubicacion, "tipodoc": tipodocumento, "afiliado": documento };
          console.log($scope.json);
          $http({
            method: 'POST',
            url: "php/autorizaciones/print/Rautorizaciones.php",
            data: { function: 'p_imprimir_autorizacion_web', autorizacion: JSON.stringify($scope.json) }
          }).then(function (response) {
            console.log(response);
            if (response.data != 0) {
              $scope.Autorizaciones = response.data;
              $scope.Nombre = response.data["0"].Nombre;
              $scope.inactive1 = false;
              $scope.total = $scope.Autorizaciones.length;
              if ($scope.total <= 10) {
                $scope.quantity = $scope.total;
              }
              else {
                $scope.quantity = 10;
              }
            }
            else {
              $scope.inactive1 = true;
              swal('Info', 'Afiliado No Tiene Autorizaciones!', 'info').catch(swal.noop);
            }
          });
        } else {
          swal('Info', $scope.text_fiels, 'warning').catch(swal.noop);
        }
      }
      $scope.print = function (data, x) {
        if (x == 'true') {
          window.open('views/autorizaciones/formatoautorizacionPrint.php?numero=' + data.CODIGO + '&ubicacion=' + data.AUTN_UBICACION, '_blank');
          $scope.inactive1 = true;
        }
      }
      $scope.actualizarprint = function (num) {
        $http({
          method: 'POST',
          url: "php/autorizaciones/print/Uautorizaciones.php",
          data: { function: 'actualizarprint', numero: num }
        }).then(function (response) {
          if (response.data == 1) {
            $scope.buscarAutPrint();
            swal({
              type: 'success',
              title: 'Completado',
              text: 'Impresión habilitada!',
              timer: 3000
            }).catch(swal.noop);
          }
        });
      }

      $scope.limpiar = function () {
        $scope.filterautprint = 'AFILIADO';
        $scope.Autorizaciones = [];
        $scope.inactive1 = true;
        $scope.Nombre = "";
        $scope.total = 0;
        $scope.quantitY = 0;
      }
    }])
