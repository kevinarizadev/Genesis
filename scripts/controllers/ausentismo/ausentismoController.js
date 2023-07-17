'use strict';
angular.module('GenesisApp').controller('ausentismoCtrl', ['$scope', '$http', 'ngDialog', 'ausentismoHttp', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', 'validationParams','$rootScope','$localStorage','$window',
function ($scope, $http, ngDialog, ausentismoHttp, notification, $timeout, $q, upload, communication, $controller, validationParams, $rootScope,$localStorage,$window) {
  $(function() {
      var dat = {prov : 'navb'}
      $.getJSON( "php/obtenersession.php", dat)
      .done(function(respuesta) {
        var sesdata = respuesta;
        $scope.ced = sesdata.cedula;
		    $scope.nomusu = sesdata.usu;
		    $scope.pasusu = sesdata.acc;
        ausentismoHttp.obtenerjefe($scope.ced).then(function (response) {
          var j = response;
          if(j=="S"){
              $( "#gestion" ).removeClass("visible");
          }else{
            
          }
        })
        setTimeout(function () {
            $( "#tabs" ).tabs();
        }, 300);

      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log("navbar error obteniendo variables");
      });
   });
}])
