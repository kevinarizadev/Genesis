'use strict';
angular.module('GenesisApp')
.controller('res1587habController',['$scope','consultaHTTP','notification','cfpLoadingBar','$http','$window','$filter',
function($scope,consultaHTTP,notification,cfpLoadingBar,$http,$window,$filter) {

   (function() {
      $scope.anno = '';
      $scope.periodo = '';
      $scope.cedula = '0';

      var dat = {prov : 'navb'}
      $.getJSON( "php/obtenersession.php", dat)
      .done(function(respuesta) {
        $scope.cedula = $scope.sesdata.cedula;
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log("navbar error obteniendo variables");
      });
  }()

);

  $scope.validarips = function() {
    $http({
      method:'POST',
      url:"php/siau/CodigoUrgencia/Ccodigourgencia.php",
      data: {function:'validarips',ips:$scope.nitips}
    }).then(function(response){
      if(response.data.existe != "0"){
        $scope.nomips = response.data.Nombre;
      }else{
        $scope.nomips = response.data.Nombre;
        $scope.nitips = '';
      }
    })
  }
//19255
  $http({
    method:'POST',
    url:"php/financiera/pagosips.php",
    data: {function:'obteneranno'}
  }).then(function(response){
    $scope.annos = response.data;
  })

  $scope.obtenerperiodo = function(){
    if($scope.anno != ''){
      $http({
        method:'POST',
        url:"php/financiera/pagosips.php",
        data: {function:'obtenerperiodo',panno:$scope.anno}
      }).then(function(response){
        $scope.periodos = response.data;
      })
    }
  }

  $scope.GuardarTerceroHab = function(){
  
    if ($scope.nitips == 0 || $scope.nitips == null){
      notification.getNotification('info', 'Debe Ingresar un Tercero Valido', 'Notificacion');
    }

    $http({
      method:'POST',
      url:"php/financiera/res1587.php",
      data: {function:'guardar_tercero',anno:$scope.anno, periodo:$scope.periodo, tercero:$scope.nitips, cedula:$scope.cedula}
    }).then(function(response){

      if(response.data.codigo_err > 0){
        notification.getNotification('success', "Datos Guardados Con Exito", 'Notificacion');
        $scope.limpiar();
      }else{
        notification.getNotification('error', response.data.observacion_err, 'Notificacion');
      }
    })
  }

  $scope.limpiar = function(){
    $scope.anno = '';
    $scope.periodo = '';
    $scope.nitips = '';
    $scope.nomips = '';
  }

}]);
