'use strict';
angular.module('GenesisApp')
.controller('frecuenciacantidad',['$scope','consultaHTTP','notification','cfpLoadingBar','$http',function($scope,consultaHTTP,notification,cfpLoadingBar,$http) {
   $scope.tabladetalle = true;
   $scope.muestraFacturas = function(){
      $http({
         method:'GET',
         url:"php/salud/obtenerfacturas_cantidad.php"
      }).then(function(facturas){
         if (facturas.data != 0) {
            $scope.facturas = facturas.data;
         }else{
            $scope.facturas = "";
         }
      })
      $http({
         method:'GET',
         url:"php/salud/cantidad_cantidades.php"
      }).then(function(cantidad){
         $scope.total = cantidad.data["0"].TOTAL;
         $scope.realizados = cantidad.data["0"].REALIZADO;
      })
   }

   $('#tablalistado').on('click', 'tbody tr', function(event) {
      $(this).addClass('arr').siblings().removeClass('arr');
   });

   $scope.muestraDetalleFacturas = function(tipo,id){
      $scope.afiliado = {tipo:tipo,numero:id};
      $http({
         method:'GET',
         url:"php/salud/obtenerdetallefacturas_cantidades.php",
         params:{tipo:tipo,documento:id}
      }).then(function(facturas){
         if (facturas.data != 0) {
            $scope.detalle_facturas = facturas.data;
         }else{
            $scope.detalle_facturas = "";
         }
      })
   }

   $scope.guardar_justificacion = function(){
      if (($scope.afiliado.tipo === undefined || $scope.afiliado.tipo == "") || (($scope.afiliado.numero === undefined || $scope.afiliado.numero == ""))){
         notification.getNotification('info', 'Seleccione registro de afiliado', 'Notificacion');
      }else{
         $http({
            method:'GET',
            url:"php/salud/actualizajustificacion_cantidades.php",
            params: {tipo: $scope.afiliado.tipo,
                     numero: $scope.afiliado.numero,
                     obse : $scope.observacion
                     }
         }).then(function(result){
            if (result.data == 1) {
               notification.getNotification('success', 'Registro actualizado correctamente', 'Notificacion');
               $scope.observacion = "";
               $scope.muestraFacturas();
               $scope.afiliado = {tipo: '',numero:''}
            }
         })
      }
   }
   
}]);