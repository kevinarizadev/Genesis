'use strict';
angular.module('GenesisApp')
.controller('prestamocajacontroller',['$scope','$http','bodegaHttp','cajaHttp','notification','prestamoHttp',
 function($scope,$http,bodegaHttp,cajaHttp,notification,prestamoHttp) {
  $scope.lista_prioridad = "0";
  $scope.identificacion = $scope.cedula;
  $scope.codigo_rango = $scope.idbox;
  $scope.percodigo_area = $scope.area;
  $scope.perdescripcion ="";

  prestamoHttp.mostrarPrioridad( $scope.identificacion).then(function (response) {
       $scope.prioridades = response;
   })

  cajaHttp.mostrarDetalleCaja($scope.codigo_rango).then(function (response) {
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
  }

  }]);
