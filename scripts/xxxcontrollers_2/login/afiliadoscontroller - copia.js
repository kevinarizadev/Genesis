
'use strict';
angular.module('GenesisApp',['ngStorage','toastr','chieffancypants.loadingBar'])
.config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  })
.controller('afiliadoscontroller',
['$scope', '$http','$rootScope', '$location', 'AuthenticationService','notification','$localStorage','$timeout','cfpLoadingBar',
function ($scope, $http ,$rootScope, $location, AuthenticationService, notification,$localStorage,$timeout,cfpLoadingBar) {
   $scope.consultaguajira = {tipodocumento : "0"};
   $scope.consultacordoba = {tipodocumento : "0"};
   $scope.tipobusqueda = "1";
   $scope.busquedanombre = true;
   $scope.busqueda = function(){
      if ($scope.tipobusqueda == "1") {
         $scope.busquedadocumento = false;
         $scope.busquedanombre = true;
      } else {
         $scope.busquedanombre = false;
         $scope.busquedadocumento = true;
      }
   }
   $scope.consulta_guajira = function(){
      var validar = "0";
      $http({
         method:'GET',
         url:"php/consulta_afiliado.php",
         params: {type: $scope.consultaguajira.tipodocumento,id:$scope.consultaguajira.numdocumento,validar:validar }
      }).then(function(respguajira){
         if (respguajira.data.length != 0) {
            $scope.resultado_guajira = {
               nombre: respguajira.data["0"].Nombre,
               departamento: respguajira.data["0"].Departamento,
               municipio: respguajira.data["0"].Municipio,
               ips :respguajira.data["0"].Ips_Primer_Nivel
            }
         }
      })  
   }
   $scope.consulta_nombreguajira = function(){
      var validar = "0";
      $http({
         method:'GET',
         url:"php/consulta_nombreafiliado.php",
         params: {p_nombre: $scope.consultaguajira.primer_nombre,s_nombre:$scope.consultaguajira.segundo_nombre,p_apellido:$scope.consultaguajira.p_apellido,s_apellido:$scope.consultaguajira.s_apellido }
      }).then(function(respguajira){
         if (respguajira.data.length != 0) {
            $scope.resultado_guajira = {
               nombre: respguajira.data["0"].Nombre,
               departamento: respguajira.data["0"].Departamento,
               municipio: respguajira.data["0"].Municipio,
               ips :respguajira.data["0"].Ips_Primer_Nivel
            }
         }
      })  
   }
   $scope.consulta_cordoba = function(){
      var validar = "1";
      $http({
         method:'GET',
         url:"php/consulta_afiliado.php",
         params: {type: $scope.consultaguajira.tipodocumento,id:$scope.consultaguajira.numdocumento,validar:validar }
      }).then(function(respcordoba){
         if (respcordoba.data.length != 0) {
            $scope.resultado_cordoba = {
               nombre: respcordoba.data["0"].Nombre,
               departamento: respcordoba.data["0"].Departamento,
               municipio: respcordoba.data["0"].Municipio,
               ips :respcordoba.data["0"].Ips_Primer_Nivel
            }
         }
      })  
   }
}]);



