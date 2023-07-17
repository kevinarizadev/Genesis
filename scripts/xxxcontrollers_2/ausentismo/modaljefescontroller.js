'use strict';
angular.module('GenesisApp')
.controller('modaljefescontroller', ['$scope', '$http','ngDialog', 'notification', '$timeout', '$q', 'communication', '$controller','$rootScope','$window',
function ($scope, $http, ngDialog, notification, $timeout, $q, communication, $controller, $rootScope, $window) {
  $rootScope.$on('ngDialog.opened', function (e, $dialog) {
    $(".ngdialog-content").css({"padding-left":"0px","padding-bottom":"0px","padding-right":"0px","padding-top":"0px","width":"950px"});
  });
  $(document).ready(function() {
    var dat = {prov : 'navb'}
    $.getJSON( "php/obtenersession.php", dat)
    .done(function(respuesta) {
      $scope.sesdata = respuesta;
      $scope.cedula = $scope.sesdata.cedula;
	    $scope.nomusu = $scope.sesdata.usu;
	    $scope.pasusu = $scope.sesdata.acc;
      communication.cedula = $scope.sesdata.cedula;
      $scope.ubicacion = $scope.sesdata.codmunicipio;
      communication.cedula = $scope.cedula;
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
      console.log("navbar error obteniendo variables");
    });
  })

  $scope.btndisabled = true;
  $http({
    method:'POST',
    url:"php/ausentismo/obtenerjefes.php",
    data: {function:'obtenerjefes'}
  }).then(function(response){
    $scope.jefes = response.data;
  })
  $scope.asignarjefe =  function(data){
    $('#'+data.cedula).removeClass('checkjefe');
    $('.checkjefe').prop('checked', false);
    if(document.getElementById(data.cedula).checked == true){
      $scope.datosjefe = data;
      $scope.btndisabled = false;
    }
    else{
      $scope.cedulajefe = '';
      $scope.btndisabled = true;
    }
    $('#'+data.cedula).addClass('checkjefe');
  }

  $scope.guardarjefe =  function(){
    if(document.getElementById($scope.datosjefe.cedula).checked == true){
      $http({
        method:'POST',
        url:"php/ausentismo/logicajefes.php",
        data: {function:'guardarjefe',emisor:communication.cedula,jefe:$scope.datosjefe.cedula,tipo:'insert'}
      }).then(function(response){
          ngDialog.close();
      })
    }
    else{
      notification.getNotification('warning', 'Debe confirmar su jefe!', 'Notificacion');
    }
  }
}])
