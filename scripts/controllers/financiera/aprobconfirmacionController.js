'use strict';
angular.module('GenesisApp')
.controller('aprobconfirmacionController',['$scope','consultaHTTP','notification','cfpLoadingBar','$http','$window','$filter',
function($scope,consultaHTTP,notification,cfpLoadingBar,$http,$window,$filter) {

  //datos de sesion como cedula y ubicacion
  var dat = {prov : 'navb'}
  $.getJSON( "php/obtenersession.php", dat)
  .done(function(respuesta) {
    $scope.cedula = $scope.sesdata.cedula;
   $http({
      method:'POST',
      url:"php/financiera/aprobconfirmacion.php",
      data: {function:'obtenerpendientes'}
    }).then(function(response){
        $scope.pendientes = response.data;
    })
    /*
    $http({
      method:'POST',
      url:"php/financiera/confirmacion.php",
      data: {function:'obtenerprocesados',responsable:$scope.cedula}
    }).then(function(response){
        $scope.procesados = response.data;
    })*/
  })
  .fail(function( jqXHR, textStatus, errorThrown ) {
    console.log("navbar error obteniendo variables");
  });
  //Fin datos de sesion como cedula y ubicacion

  $scope.aprobar_doc = function (consecutivo, aprobar) {
    $http({
       method:'POST',
       url:"php/financiera/aprobconfirmacion.php",
       data: {function:'aprobarpendientes',consecutivo:consecutivo, aprobar:aprobar}
     }).then(function(response){
         $scope.resultado = response.data;
         if ($scope.resultado == 'S') {
           $http({
              method:'POST',
              url:"php/financiera/aprobconfirmacion.php",
              data: {function:'obtenerpendientes'}
            }).then(function(response){
                if (aprobar == 'S'){
                  notification.getNotification('success', 'Documento Aprobado', 'Notificacion');
                }else {
                  notification.getNotification('success', 'Documento Negado', 'Notificacion');
                }
                $scope.pendientes = response.data;

            })
         }else{
           notification.getNotification('info', 'Inconvenientes de Aprobacion!', 'Notificacion');
         }
     })
  }

  $scope.AprobarTodos = function(aprobar){
    $http({
       method:'POST',
       url:"php/financiera/aprobconfirmacion.php",
       data: {function:'aprobartodaspendientes', aprobar:aprobar}
     }).then(function(response){
         $scope.resultado = response.data;
         if ($scope.resultado == 'S') {
           $http({
              method:'POST',
              url:"php/financiera/aprobconfirmacion.php",
              data: {function:'obtenerpendientes'}
            }).then(function(response){
                if (aprobar == 'S'){
                  notification.getNotification('success', 'Documento Aprobado', 'Notificacion');
                }else {
                  notification.getNotification('success', 'Documento Negado', 'Notificacion');
                }
                $scope.pendientes = response.data;
            })
         }else{
           notification.getNotification('info', 'Inconvenientes de Aprobacion!', 'Notificacion');
         }
     })
  }

}]);
