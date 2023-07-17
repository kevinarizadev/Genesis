'use strict';
angular.module('GenesisApp')
  .controller('modaladjuntoCMctrl', ['$scope', '$http', 'ngDialog', 'censoHttp', function ($scope, $http, ngDialog, censoHttp) {

    $(document).ready(function () {
      
      var dat = { prov: 'navb' }
      $.getJSON("php/obtenersession.php", dat)
        .done(function (respuesta) {
          $scope.sesdata = respuesta;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log("navbar error obteniendo variables");
        });

     
    });
    console.log($scope.info);
    $scope.adjuntar_soporte = function(){
      //
      $http({
        method: 'POST',
        url: "php/censo/cuentasmed.php",
        data: {function: 'cargar_adj',
                nofac : $scope.factura,
                num_cen: $scope.info.numero,
                ubicacion: $scope.info.ubicacion
                }

      }).then(function (response) {
        if (response.data[0].codigo == '1') {
          swal('Completado', response.data[0].mensaje, 'success');    
          $scope.ins_auditoria();
        } else {
          swal('Error', response.data[0].mensaje, 'error');
        }
      });
      ngDialog.close();
      
    }

    $scope.ins_auditoria = function () {
      console.log($scope.sesdata);
      $http({
        method: 'POST',
        url: "php/censo/cuentasmed.php",
        data: {
          function: 'ins_auditoria',
          usuario: $scope.sesdata.usu,
          descripcion: "Factura radicada desde el modulo de cuentas medicas",
          documento: $scope.sesdata.cedula,
          evento: "actualizacion"
        }
      }).then(function (response) {

        $scope.auditoria_insertada = response.data;
      });
    }

  }]);
