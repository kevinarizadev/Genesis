'use strict';
angular.module('GenesisApp')
.controller('procnuloscontroller',['$scope','consultaHTTP','notification','cfpLoadingBar','$http',function($scope,consultaHTTP,notification,cfpLoadingBar,$http) {
  
   consultaHTTP.obtenerHomologacion().then(function(response){      
      if (response == "0") {
         notification.getNotification('error','No se encontro información','Notificacion');
         return;
      }else{
         $scope.homologacion = response;
      }
   })
   $scope.muestraFacturas = function(){
      $http({
         method:'GET',
         url:"php/salud/obtenerfacturas_procnulos.php"
      }).then(function(facturas){
         if (facturas.data != 0) {
            $scope.facturas = facturas.data;
         }else{
            $scope.facturas = "";
         }
      }) 
      $http({
         method:'GET',
         url:"php/salud/cantidad_procnulos.php"
      }).then(function(cantidad){
         $scope.total = cantidad.data["0"].TOTAL;
         $scope.realizados = cantidad.data["0"].REALIZADO;
      })  
   }
	$('#tablalistado').on('click', 'tbody tr', function(event) {
      $(this).addClass('arr').siblings().removeClass('arr');
   });
   $('#tabladetalle').on('click', 'tbody tr', function(event) {
      $(this).addClass('arr').siblings().removeClass('arr');
   });
   $('#tablahomologo').on('click', 'tbody tr', function(event) {
      $(this).addClass('arr').siblings().removeClass('arr');
   });
   $scope.muestraDetalleFacturas = function(nit,factura,recibo,tipo,id,afiliado,sexo){
      $scope.afiliado = {nombre:afiliado,documento:id,factura:factura,proveedor:nit,recibo:recibo,sexo:sexo,tipo:tipo};
      $http({
         method:'GET',
         url:"php/salud/obtenerdetallefacturas_procnulos.php",
         params: {nit: nit,
                  factura: factura,
                  recibo:recibo,
                  tipo : tipo,
                  documento:id
                  }
      }).then(function(facturas){
         if (facturas.data != 0) {
            $scope.detalle_facturas = facturas.data;
         }else if(facturas.data == 0){
            $scope.detalle_facturas = "";
            //notification.getNotification('info','Factura sin detalles','Notificacion');
         }
      }) 
   }
   $scope.asignaProducto = function(nombre){
      $scope.producto = {nombre:nombre};
   }
   $scope.muestraDiagnostico = function(){
      $http({
         method:'GET',
         url:"php/salud/obtenerdiagnostico.php"
      }).then(function(diagnosticos){
         if (diagnosticos.data != 0) {
            $scope.diagnosticos = diagnosticos.data;
         }else{
            $scope.diagnosticos = "";
            notification.getNotification('error','No se encontro diagnostico','Notificacion');
         }
      })  
   }

   $scope.asignaHomologo = function(codigo){
      $scope.homologo = {nuevo:codigo}
   }

   $scope.asignaprocedimiento = function(){
      $http({
         method:'GET',
         url:"php/salud/actualizaprocedimiento.php",
         params: {documento: $scope.afiliado.documento,
                  sexo: $scope.afiliado.sexo,
                  producto:$scope.homologo.nuevo,
                  nombreproducto : $scope.producto.nombre,
                  factura:$scope.afiliado.factura,
                  proveedor:$scope.afiliado.proveedor,
                  recibo:$scope.afiliado.recibo
                  }
      }).then(function(resp){
         if (resp.data == "1") {
            notification.getNotification('success', 'Registro actualizado correctamente', 'Notificacion');
			$scope.detalle_facturas = "";
            $scope.muestraDetalleFacturas($scope.afiliado.proveedor,$scope.afiliado.factura,$scope.afiliado.recibo,$scope.afiliado.tipo,$scope.afiliado.documento,$scope.afiliado.nombre,$scope.afiliado.sexo);
			$scope.muestraFacturas();
         }else{
            notification.getNotification('info',resp.data,'Notificacion');
         }
      }) 
   }

   $scope.busqueda_diagnostico = function(){
      cfpLoadingBar.start();
      $scope.filtro_diagnostico = $scope.valor_diag;
      cfpLoadingBar.complete();
   }

   $scope.busqueda_homologo = function(){
      cfpLoadingBar.start();
      $scope.filtro_homologo = $scope.valor_homologo;
      cfpLoadingBar.complete();
   }
   
}]);
