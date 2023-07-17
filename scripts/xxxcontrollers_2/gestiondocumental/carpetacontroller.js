'use strict';
angular.module('GenesisApp')
.controller('carpetacontroller',['$scope','$http','bodegaHttp','carpetaHttp','notification','ngDialog',
 
 function($scope,$http,bodegaHttp,carpetaHttp,notification,ngDialog) {
  $scope.lista_area='0';
  $scope.codigo_rango = $scope.idbox;
  $scope.codigo_ubicacion_caja  = $scope.ubicacion_caja; 

  $scope.insertarCarpeta = function () {
  carpetaHttp.insertarCarpeta($scope.lista_Bodega.trim(),$scope.lista_Pasillo.trim(),$scope.lista_piso.trim(),
                              $scope.lista_nivel.trim(),$scope.lista_secuencia.trim(), 
                        $scope.codigo_ubicacion_caja.trim(),$scope.codigo_rango.trim(),$scope.bnombre_carpeta,
                        $scope.bdescripcion_carpeta,'A').then(function (response) {
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
