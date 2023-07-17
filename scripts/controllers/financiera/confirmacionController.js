'use strict';
angular.module('GenesisApp')
.controller('confirmacionController',['$scope','consultaHTTP','notification','cfpLoadingBar','$http','$window','$filter',
function($scope,consultaHTTP,notification,cfpLoadingBar,$http,$window,$filter) {
  $(document).ready(function(){
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('#modal12').modal();
    });

    $scope.cant_error = 0;
    $scope.cant_exitoso = 0;
    $scope.cant_negado = 0;

  //datos de sesion como cedula y ubicacion
  var dat = {prov : 'navb'}
  $.getJSON( "php/obtenersession.php", dat)
  .done(function(respuesta) {
    $scope.inactive2=true;
    // $scope.cedula = $scope.sesdata.cedula;
    $scope.cedula = respuesta.cedula;
    $http({
      method:'POST',
      url:"php/financiera/confirmacion.php",
      data: {function:'obtenerpendientes',responsable:$scope.cedula}
    }).then(function(response){
        $scope.pendientes = response.data == '0' ? [] : response.data;
    })

    $http({
      method:'POST',
      url:"php/financiera/confirmacion.php",
      data: {function:'obtenerprocesados',responsable:$scope.cedula}
    }).then(function(response){
        $scope.procesados = response.data;
        for (var i = 0; i < $scope.procesados.length; i++) {
          if ($scope.procesados[i].estado_documento == 'ERROR') {  
              $scope.cant_error++;
          }else if($scope.procesados[i].estado_documento == 'PROCESADO') {
            $scope.cant_exitoso++;
          }else {
            $scope.cant_negado++;
          }
        }
    })
  })
  .fail(function( jqXHR, textStatus, errorThrown ) {
    console.log("navbar error obteniendo variables");
  });
  //Fin datos de sesion como cedula y ubicacion

setInterval(function(){
  $scope.inactive2=false;
  $http({
    method:'POST',
    url:"php/financiera/confirmacion.php",
    data: {function:'obtenerpendientes',responsable:$scope.cedula}
  }).then(function(response){
      $scope.pendientes = response.data == '0' ? [] : response.data;
  })

  $http({
    method:'POST',
    url:"php/financiera/confirmacion.php",
    data: {function:'obtenerprocesados',responsable:$scope.cedula}
  }).then(function(response){
      $scope.procesados = response.data;
		$scope.cant_negado = 0;
		$scope.cant_exitoso = 0;
		$scope.cant_error = 0;
      for (var i = 0; i < $scope.procesados.length; i++) {

        if ($scope.procesados[i].estado_documento == 'ERROR') {
            $scope.cant_error++;
        }else if($scope.procesados[i].estado_documento == 'PROCESADO') {
          $scope.cant_exitoso++;
        }else {
          $scope.cant_negado++;
        }
      }

      $scope.inactive2=true;
  })

}, 60000);

$scope.filtro = "";
$scope.buscar = "";

  $scope.setTab = function(newTab){
    $scope.tab = newTab;
    $(".tabI").removeClass("tabactiva");
    $(".tabII").removeClass("tabactiva");
    switch (newTab) {
      case 1:
      $(".tabI").addClass("tabactiva");
      $scope.Title = "Procesados";
      break;
      case 2:
      $(".tabII").addClass("tabactiva");
      $scope.Title = "Pendientes";
      break;

      default:
    }
  }
  $scope.isSet = function(tabNum){
    return $scope.tab === tabNum;
  }
  $scope.setTab(1);

  $scope.ver_detalle = function(variable){
    $http({
      method:'POST',
      url:"php/financiera/confirmacion.php",
      data: {function:'obtenererror',consecutivo:variable.consecutivo}
    }).then(function(response){
        $scope.errores = response.data;
      $('#modal12').modal('open');
    })
  }

  $scope.buscar_archivo = function(){
    $http({
      method:'POST',
      url:"php/financiera/confirmacion.php",
      data: {function:'obtenerbusqueda',conincidencia:$scope.buscar, responsable:$scope.cedula }
    }).then(function(response){
      $scope.procesados = response.data;
    })
  }

}]);
