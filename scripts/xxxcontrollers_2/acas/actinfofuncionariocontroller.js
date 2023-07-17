'use strict';
   angular.module('GenesisApp')
   .controller('actinfofuncionariocontroller',['$scope','$http','acasHttp','notification','$timeout','$rootScope','$http','$window','ngDialog',
   function($scope,$http,acasHttp,notification,$timeout,$rootScope,$window,ngDialog) {
    $scope.contacto_emp = $scope.celular_info;
    $scope.correo_emp = $scope.correo_info;
    $scope.Nombre_Completo = $scope.nombre_comp;
    $scope.cedula_emp =  $scope.cedula; 

    $scope.Enviarsolicitud = function(codigo){
        switch(codigo) {
            case "V":
             //ngDialog.closeAll();
              break;
            case "A":
              acasHttp.actualizarInformacionCOCE($scope.cedula_emp, $scope.contacto_emp,$scope.correo_emp).then(function (response) {
           if  (response.data.codigo==1){
                notification.getNotification('success',response.data.mensaje, 'Notificación');
                }
              })
          break;
        }
      }
}]);