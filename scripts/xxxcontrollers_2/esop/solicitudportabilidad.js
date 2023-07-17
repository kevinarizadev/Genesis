'use strict';
   angular.module('GenesisApp')
   .controller('solicitudportabilidadctrl',['$scope','consultaHTTP','notification','$timeout','$rootScope','$http','$window','$filter','ngDialog',
   function($scope,consultaHTTP,notification,$timeout,$rootScope,$http,$window,$filter,ngDialog) {
      $scope.departamento = 'X';
      $scope.municipio = 'X';
      $scope.ipsreceptora = 'X';
      $scope.permanencia = '1';
      $scope.panelsolicitud = false;
      $scope.panelinfo = false;
      $http({
         method:'POST',
         url:"php/esop/funcesop.php",
         data: {function:'validaafilport'}
      }).then(function(response){
         if (response.data == 0) {
            $scope.panelsolicitud = true;
            $scope.panelinfo = false;
         }else{
            $scope.panelsolicitud = false;
            $scope.panelinfo = true;
         }
      });
      $scope.certificado = function(){
         //$window.location.href = 'http://www.cajacopieps.com/genesis/app.php#/datosbasicos'
         $window.location = 'http://www.cajacopieps.com/genesis/app.php#/datosbasicos'
      }
      $scope.obtenerMunicipios = function(){
         $scope.function = 'cargamunicipios';
         $http({
            method:'POST',
            url:"php/esop/funcesop.php",
            data: {function:$scope.function,depa:$scope.departamento}
         }).then(function(response){
            $scope.Municipios = response.data;
         });
      }
      $scope.obtenerDepartamentos = function(){
         $scope.function = 'cargadepartamentos';
         $http({
            method:'POST',
            url:"php/esop/funcesop.php",
            data: {function:$scope.function}
         }).then(function(response){
            $scope.Departamentos = response.data;
         });
      }
      $scope.obtenerIps = function(){
         $scope.function = 'cargaipsmunicipios';
         $http({
            method:'POST',
            url:"php/esop/funcesop.php",
            data: {function:$scope.function,muni:$scope.municipio}
         }).then(function(response){
            $scope.Ipss = response.data;
         });
      }
      $scope.solicitar = function(){
         if ($scope.ipsreceptora == 'X') {$scope.ips = $scope.otraips}else{$scope.ips = $scope.ipsreceptora}
         $http({
            method:'POST',
            url:"php/esop/funcesop.php",
            data: {function:'guardasolicitud',correo:$scope.correo
                                             ,municipio: $scope.municipio
                                             ,direccion: $scope.direccion
                                             ,telefono: $scope.telfijo
                                             ,tiempo: $scope.permanencia
                                             ,escenario: $scope.ips}
         }).then(function(response){
            if (response.data == "1") {
               notification.getNotification('success', 'Se ha enviado la solicitud correctamente', 'Notificación');
               $scope.panelsolicitud = false;
               $scope.panelinfo = true;
            }else{
               notification.getNotification('info', response.data, 'Notificación');
            }
         });
      }
   }
]);