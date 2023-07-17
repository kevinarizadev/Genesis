'use strict';
angular.module('GenesisApp')
.controller('misprestamoscontroller',['$scope','$http','bodegaHttp','cajaHttp','notification','prestamoHttp',
 function($scope,$http,bodegaHttp,cajaHttp,notification,prestamoHttp) {
  $scope.lista_prioridad = "0";
  $scope.identificacion = $scope.cedula;
  $scope.codigo_rango = $scope.idbox;
  $scope.percodigo_area = $scope.area;
  $scope.perdescripcion ="";
  
  prestamoHttp.mostrarmisPrestamos( $scope.identificacion).then(function (response) {
       $scope.misprestamos = response;
   })

  cajaHttp.mostrarDetalleCaja($scope.codigo_rango).then(function (response) {
      $scope.detalles = response;
      $scope.nombre_caja = $scope.detalles[0].Nombre;
      $scope.descripcion_caja = $scope.detalles[0].Descripcion;
      $scope.fecha_creacion = $scope.detalles[0].Fecha;
    })

  }]);
