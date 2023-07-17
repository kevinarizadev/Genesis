'use strict';
angular.module('GenesisApp')
  .controller('direccionamientosctrl', ['$scope', '$http', 'notification', 'afiliacionHttp', 'ngDialog', 'consultaHTTP',
    function ($scope, $http, notification, afiliacionHttp, ngDialog, consultaHTTP) {

        
    $(document).ready(function () {
        $scope.ins_auditoria();
        var dat = { prov: 'navb' }
        $.getJSON("php/obtenersession.php", dat)
          .done(function (respuesta) {
            $scope.sesdata = respuesta;
          })
          .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("navbar error obteniendo variables");
          });
      });
  
      $scope.ins_auditoria = function () {
        console.log($scope.sesdata);
        $http({
          method: 'POST',
          url: "php/recobro/mipres.php",
          data: {
            function: 'ins_auditoria',
            usuario: $scope.sesdata.usu,
            descripcion: "consulta realizada desde el modulo de MIPRES-LF",
            documento: $scope.sesdata.cedula,
            evento: "consulta"
          }
        }).then(function (response) {
  
          $scope.auditoria_insertada = response.data;
        });
      }

    }]);




