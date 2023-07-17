'use strict';
angular.module('GenesisApp')
 .controller('consultaafiliadoipscontroller',['$scope','notification','cfpLoadingBar','$http',function($scope,notification,cfpLoadingBar,$http) {
   $scope.tipoDoc = "0";
   $scope.documento = "";
   $scope.inactive1 = true;
   $scope.inactive2 = true;

$scope.Obtener_Tipos_Documentos = function () {
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Tipos_Documentos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
$scope.Obtener_Tipos_Documentos();
   
   $scope.buscarAfiliado = function(){
     $scope.inactive1 = true;
     $scope.inactive2 = true;
     $scope.Data = [];
     if($scope.tipoDoc != "0" && $scope.documento != "" && $scope.tipoDoc != null && $scope.documento != undefined && $scope.tipoDoc != undefined && $scope.documento != null){
          $scope.inactive2 = false;
         $http({
           method:'POST',
           url:"php/consultaAfiliados/obtenerafiliadoips.php",
           data: {function:'obtenerafiliados',tipodocumento:$scope.tipoDoc,documento:$scope.documento}
         }).then(function(response){
           if(response.data != "0" && response.data.DOCUMENTO != ""){
             $scope.inactive2 = true;
             $scope.inactive1 = false;
             $scope.Data = response.data;
           }else{
             notification.getNotification('info', 'Afiliado no registra en nuestra base de datos!', 'Notificacion');
			 
			 setTimeout(function () {
				$scope.inactive2 = true;
			 }, 200);
           }
          });
     }
     else{
         notification.getNotification('warning', 'Datos del afiliado incompletos', 'Notificacion');
     }
   }
 }]);