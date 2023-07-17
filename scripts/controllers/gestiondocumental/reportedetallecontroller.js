'use strict';
angular.module('GenesisApp')
.controller('reportedetallecontroller',['$scope','$http','gestiondocumentalHttp','inventarioHttp','prestamoHttp','$rootScope','notification','cfpLoadingBar',
 function($scope,$http,gestiondocumentalHttp,inventarioHttp, prestamoHttp,$rootScope,notification,cfpLoadingBar) {


   $rootScope.$on('ngDialog.opened', function (e, $dialog) { 
    $(".ngdialog-content").css({"width": "800px"});})

   $scope.reportenitfactura  =  function (){
     prestamoHttp.reportenitfactura($scope.nit,$scope.factura).then(function (response) {
       if (response == '0'){ 
        $scope.solicitudes = "";
        notification.getNotification('error','no se encuentra informacion con NIT/FACTURA', 'Notificacion');
      }
      else {
       $scope.solicitudes = response;
     }
   })
   }
 }]);
