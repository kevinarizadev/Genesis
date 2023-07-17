'use strict';
angular.module('GenesisApp')
.controller('solicitudcontroller',['$scope','$http','gestiondocumentalHttp','inventarioHttp','prestamoHttp','$rootScope',
 function($scope,$http,gestiondocumentalHttp,inventarioHttp, prestamoHttp,$rootScope) {
  
  $scope.lista_prioridad = "0";
  $scope.identificacion = $scope.cedula;
  $scope.codigo_rango = $scope.idbox;
  $scope.percodigo_area = $scope.area;
  $scope.perdescripcion ="";
  $scope.panel = true;

  $rootScope.$on('ngDialog.opened', function (e, $dialog) { 
    $(".ngdialog-content").css({"width": "100%"});})

prestamoHttp.mostrarSolicitud().then(function (response) {
     if (response == '0'){ 
      $scope.panel =  true;
    }
    else {
      $scope.solicitudes = response;
      $scope.panel =  false;
    }
   }) 

$scope.mostrarsolicitudes =  function (){
   prestamoHttp.mostrarSolicitud().then(function (response) {
     if (response == '0'){ 
      $scope.panel =  true;
    }
    else {
      $scope.solicitudes = response;
      $scope.panel =  false;
    }
   })}

$scope.respuestasolicitud  =  function (codigo_prestamo,estado){
   var respuesta;
   switch(estado) {
            case "Solicitado":
                respuesta = '1';
              break;
            case "Aceptado":
               respuesta = '2';
              break;
            case "Prestado":
               respuesta = '3';
              break;
            case "Entregado":
               respuesta = '4';
              break; 
            default:
           respuesta = '-1';
            }

   prestamoHttp.respuestasolicitud(codigo_prestamo,respuesta,'').then(function (response) {
     if (response == '0'){ 
      //$scope.panel =  true;
    }
    else {
      //$scope.test = response;
      $scope.mostrarsolicitudes();
    }
   })}

/*  cajaHttp.mostrarDetalleCaja($scope.codigo_rango).then(function (response) {
      $scope.detalles = response;
      $scope.nombre_caja = $scope.detalles[0].Nombre;
      $scope.descripcion_caja = $scope.detalles[0].Descripcion;
      $scope.fecha_creacion = $scope.detalles[0].Fecha;
    })

  $scope.insertarPrestamo = function () {
  prestamoHttp.insertarPrestamo('CC',$scope.identificacion,$scope.codigo_rango,$scope.percodigo_area,'CAJA',$scope.lista_prioridad,$scope.perdescripcion).then(function (response) {
       if (response.codigo==1){
         notification.getNotification('success', response.mensaje, 'Notificacion');
         $scope.actualizarmostrarcantidad();
       }else{
          notification.getNotification('error', response, 'Notificacion');
       }
    })
  }*/

}]);
