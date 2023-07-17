'use strict';
angular.module('GenesisApp').controller('sidebarcontroller', ['$scope', function ($scope) {
   $.getJSON("php/obtenersession.php").done(function (respuesta) {
      $.getJSON("php/paneladmin/obtenerpaneladmin.php", { idempresa: 1, idrol: respuesta.rolcod }).done(function (response) {
         $scope.menu = response;
         if (respuesta.rol == "Funcionario" || respuesta.rol == "IPS") {
            $scope.routes = JSON.parse(sessionStorage.routes);
         } else {
            $scope.routes = [];
         }
         $scope.$apply();
      }).fail(function (jqXHR, textStatus, errorThrown) {
         $scope.menu = [];
      });
   }).fail(function (jqXHR, textStatus, errorThrown) {
      $scope.menu = [];
   });
   $scope.getvalue = function (name, codigo) {
      $scope.name = name;
      $scope.codigo = codigo;
   }
}]);