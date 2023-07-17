'use strict';
angular.module('GenesisApp')
.controller('inventarioCtrl', ['$scope', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'communication', '$controller','$rootScope','$window','inventarioHttp',
function ($scope, $http, ngDialog, notification, $timeout, $q, communication, $controller, $rootScope, $window, inventarioHttp) {

  $(function() {

      var dat = {prov : 'navb'}
      $.getJSON( "php/obtenersession.php", dat)
      .done(function(respuesta) {
        var sesdata = respuesta;
        $scope.cedu = sesdata.cedula;
        var request = $http({
         method:'get',
         url: "php/inventario/obtenersesionjefe.php",
         params: {emisor:$scope.cedu}
       })
       request.then(function(response) {
            var j = response.data;
            if(j=="S"){
                //$( "#gestion" ).hide();
                $( "#gestion" ).removeClass("visible");
                //$( ".tabs" ).append( '<li id="gestion" class="tab col s3 hover-item"><a href="#aprobacionPermiso">GESTION DE SOLICITUD </a></li>' );
            }
        });
        setTimeout(function () {
            $( "#tabs" ).tabs();
        }, 300);

      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log("navbar error obteniendo variables");
      });
   });
   $scope.changelistinventario = function(){
     $controller('abrirInventariocontroller', {
        $scope: $scope
     });
     $scope.obtenerTiposInventariosJ();
   }
}])
