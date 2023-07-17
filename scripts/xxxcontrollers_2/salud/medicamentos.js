'use strict';
angular.module('GenesisApp')
.controller('medicamentoscontroller',['$scope','consultaHTTP','notification','cfpLoadingBar','$http',function($scope,consultaHTTP,notification,cfpLoadingBar,$http) {
   $scope.tabladetalle = true;
   $scope.obtenercantidad = function(){
	   $http({
         method:'GET',
         url:"php/salud/cantidad_medicamentos.php"
      }).then(function(cantidad){
         $scope.total = cantidad.data["0"].TOTAL;
         $scope.realizados = cantidad.data["0"].REALIZADO;
      })
   }
   $scope.muestraFacturas = function(){
      $http({
         method:'GET',
         url:"php/salud/obtenermedicamentos.php"
      }).then(function(facturas){
         if (facturas.data != 0) {
            $scope.facturas = facturas.data;
         }else{
            $scope.facturas = "";
         }
      })
      $scope.obtenercantidad ();
   }

   $('#tablalistado').on('click', 'tbody tr', function(event) {
      $(this).addClass('arr').siblings().removeClass('arr');
   });

   $scope.muestraDetalleFacturas = function(nit,factura,recibo,tipo,id,afiliado){
      $scope.afiliado = {tipo:tipo,
                        numero: id,
                        nombre:afiliado};
      $http({
         method:'GET',
         url:"php/salud/obtenerdetallefacturas_frecuencia.php",
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
            url:"php/salud/actualizajustificacion.php",
            params: {tipo: $scope.afiliado.tipo,
                     numero: $scope.afiliado.numero,
                     obse : $scope.observacion
                     }
         }).then(function(result){
            if (result.data == 1) {
               notification.getNotification('success', 'Registro actualizado correctamente', 'Notificacion');
               $scope.observacion = "";
               $scope.detalle_facturas = "";
               $scope.muestraFacturas();
			   $scope.obtenercantidad ();
               $scope.afiliado = {tipo: '',numero:''}
            }
         })
      }
   }
   
}]);
