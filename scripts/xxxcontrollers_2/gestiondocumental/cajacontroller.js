'use strict';
angular.module('GenesisApp')
.controller('cajacontroller',['$scope','$http','bodegaHttp','cajaHttp','notification','ngDialog',
 function($scope,$http,bodegaHttp,cajaHttp,notification,ngDialog) {
  $scope.lista_area='0';
  $scope.codigo_rango = $scope.idbox;
  cajaHttp.mostrarArea().then(function (response) {
       $scope.areas = response;
    })

  $scope.insertarCaja = function () {
  cajaHttp.insertarCaja($scope.bnombre_caja,$scope.bdescripcion_caja,$scope.lista_area,$scope.codigo_rango).then(function (response) {
       if (response.codigo==1){
         notification.getNotification('success', response.mensaje, 'Notificacion');
         $scope.obtenercaja();
       }else{
          notification.getNotification('error', response, 'Notificacion');
       }
    })
  ngDialog.closeAll();
  }

  }]);
