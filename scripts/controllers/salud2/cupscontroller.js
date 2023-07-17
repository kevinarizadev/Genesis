'use strict';
angular.module('GenesisApp')
.controller('cupscontroller',['$scope','consultaHTTP','notification','cfpLoadingBar','$http',function($scope,consultaHTTP,notification,cfpLoadingBar,$http) {

   consultaHTTP.obtenerCupsDB().then(function(response){
      $http({
         method:'GET',
         url:"php/salud/cantidad_cups.php"
      }).then(function(cantidad){
         $scope.total = cantidad.data["0"].TOTAL;
         $scope.realizados = cantidad.data["0"].REALIZADO;
      }) 
      consultaHTTP.obtenerHomologacion().then(function(response){
         if (response == "0") {
            notification.getNotification('error','No se encontro información','Notificacion');
            return;
         }else{
            $scope.homologacion = response;
         }
      })
      if (response == "0") {
         notification.getNotification('error','No se encontro información','Notificacion');
         return;
      }else{
         $scope.cupsdb = response;
      }
   })

   $scope.asig = function(codigo,descripcion,tipo){
      if (tipo == "A") {
         $scope.antes = {codigo: codigo,descripcion:descripcion};
      }else if (tipo == "D") {
         $scope.despues = {codigo: codigo,descripcion:descripcion};
      }
   }
	$('#tablalistado').on('click', 'tbody tr', function(event) {
      $(this).addClass('arr').siblings().removeClass('arr');
   });
   $('#tablalistadohomologo').on('click', 'tbody tr', function(event) {
      $(this).addClass('arr').siblings().removeClass('arr');
   });
   $scope.filtrar = function(){
      cfpLoadingBar.start();
      $scope.busqueda = $scope.valor;
      cfpLoadingBar.complete();
   }

   $scope.filtrardb = function(){
      cfpLoadingBar.start();
      $scope.busquedadb = $scope.valordb;
      cfpLoadingBar.complete();
   }

   $scope.actualizacups = function(){
      $http({
         method:'GET',
         url:"php/salud/actualizacups.php",
         params: {anterior: $scope.antes.codigo,
                  nuevo: $scope.despues.codigo
                  }
      }).then(function(facturas){
         if (facturas.data == 1) {
            notification.getNotification('success', 'Reg istro actualizado correctamente', 'Notificacion');
            $scope.antes.codigo = "";
            $scope.despues.codigo = "";
            $scope.antes.descripcion = "";
            $scope.despues.descripcion = "";
            $scope.valordb = "";
            $scope.busquedadb = "";
            $scope.valor = "";
            $scope.filtrar();
            consultaHTTP.obtenerCupsDB().then(function(response){
               $scope.cupsdb = "";
               $scope.cupsdb = response;
            })
         }
      }) 
   }

}]);
