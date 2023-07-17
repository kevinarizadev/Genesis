
'use strict';
angular.module('GenesisApp',['ngStorage','toastr','chieffancypants.loadingBar'])
.config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  })
.controller('afiliadoscontroller',
['$scope','$http','$rootScope', '$location', 'AuthenticationService','notification','$localStorage','$timeout','cfpLoadingBar',
function ($scope, $http ,$rootScope, $location, AuthenticationService, notification,$localStorage,$timeout,cfpLoadingBar) {
   $scope.consulta = {tipodocumento : "0"};
   $scope.tipobusqueda = "1";
   $scope.tipobusqueda_cordoba = "1";
   $scope.busquedanombre = true;
   $scope.busquedanombre_cordoba = true;
   $scope.resultados = true;
   $scope.cambio = function(){
      $scope.tabla_nombre = "";
      $scope.resultados = true;
   }

   $scope.limpiar = function(){
      $scope.tabla_nombre = "";
      $scope.resultados = true;
      $scope.consulta.tipodocumento = "0";
      $scope.consulta.numdocumento = "";
      $scope.consulta.primer_nombre = "";
      $scope.consulta.segundo_nombre = "";
      $scope.consulta.primer_apellido = "";
      $scope.consulta.segundo_apellido = "";
   }

   $scope.consulta_documento = function(){
      $http({
         method:'GET',
         url:"php/consulta_afiliado.php",
         params: {type: $scope.consulta.tipodocumento,id:$scope.consulta.numdocumento}
      }).then(function(respguajira){
         if (respguajira.data == "0") {
            notification.getNotification('error','No se encontro información en la base de datos','Notificacion');
         }else{
            $scope.resultados = false;
            $scope.tabla_nombre = respguajira.data;   
         }
      })  
   }

   $scope.consulta_nombre = function(){
      if ($scope.consulta.primer_nombre === undefined || $scope.consulta.primer_apellido === undefined) {alert("Ingrese primer nombre y primer apellido");}else{
         if ($scope.consulta.segundo_nombre === undefined || $scope.consulta.segundo_nombre == "" ) {var s_nombre = "0";}else{var s_nombre = $scope.consulta.segundo_nombre}
         if ($scope.consulta.segundo_apellido === undefined || $scope.consulta.segundo_apellido == ""){var s_apellido = "0";}else{var s_apellido = $scope.consulta.segundo_apellido}
         $http({
            method:'GET',
            url:"php/consulta_nombreafiliado.php",
            params: {p_nombre: $scope.consulta.primer_nombre,
                     s_nombre:s_nombre,
                     p_apellido:$scope.consulta.primer_apellido,
                     s_apellido:s_apellido}
         }).then(function(respguajira){
            if (respguajira.data == "0") {
               notification.getNotification('error','No se encontro información en la base de datos','Notificacion');
            }else{
               $scope.resultados = false;
               $scope.tabla_nombre = respguajira.data;   
            }
         })  
      }
   }

}]);



