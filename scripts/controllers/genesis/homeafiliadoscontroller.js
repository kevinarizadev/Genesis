'use strict';
angular.module('GenesisApp').controller('inicioafiliadosController', ['$scope', function ($scope) {
    $scope.test = "inicioafiliadosController";
     $(document).ready(function () {
        document.querySelector("#content").style.paddingLeft="0px";
        $scope.removersidebar();

        $.getJSON("php/obtenersession.php").done(function (respuesta) {
                 $scope.ubicacion = respuesta.ubi.toString().substr(0,1);
               })

    });

    $scope.removersidebar = function () {
          const element = document.getElementById("barra_de_menu_principal");
          element == null ? '' : element.remove();
      }
}])
