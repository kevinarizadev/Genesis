'use strict';
angular.module('GenesisApp')
.controller('diagnuloscontroller',['$scope','consultaHTTP','notification','cfpLoadingBar','$http',function($scope,consultaHTTP,notification,cfpLoadingBar,$http) {
   $scope.panelhomologacion = true;
   $scope.paneldiagnostico = false;
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
         url:"php/salud/cantidad_diagnulos.php"
      }).then(function(cantidad){
         $scope.total = cantidad.data["0"].TOTAL;
         $scope.realizados = cantidad.data["0"].REALIZADO;
      })
      $http({
         method:'GET',
         url:"php/salud/obtenerfacturas.php"
      }).then(function(facturas){
         if (facturas.data != 0) {
            $scope.facturas = facturas.data;
         }else{
            $scope.facturas = "";
         }
      })  
   }
	$('#tablalistado').on('click', 'tbody tr', function(event) {
      $(this).addClass('arr').siblings().removeClass('arr');
   });
   $('#tabladetalle').on('click', 'tbody tr', function(event) {
      $(this).addClass('arr').siblings().removeClass('arr');
   });
   $('#tabladiagnostico').on('click', 'tbody tr', function(event) {
      $(this).addClass('arr').siblings().removeClass('arr');
   });
   $scope.muestraDetalleFacturas = function(nit,factura,recibo,tipo,id,afiliado,edad,sexo){
      $scope.afiliado = {nombre:afiliado,
                        documento:id,
                        edad:edad,
                        sexo:sexo,
                        factura:factura,
                        proveedor:nit,
                        recibo:recibo};
      $scope.factura = {numero:factura};
      $http({
         method:'GET',
         url:"php/salud/obtenerdetallefacturas.php",
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
            notification.getNotification('info','Factura sin detalles','Notificacion');
         }
      })  
   }

   $scope.actualizadiagnostico = function(){
      $http({
         method:'GET',
         url:"php/salud/validadiagnostico.php",
         params: {documento:$scope.afiliado.documento,
                  edad:$scope.afiliado.edad,
                  sexo:$scope.afiliado.sexo,
                  diagnostico:$scope.diag.codigo,
                  factura:$scope.afiliado.factura,
                  proveedor:$scope.afiliado.proveedor,
                  recibo:$scope.afiliado.recibo}
      }).then(function(diagnosticos){
         if (diagnosticos.data == 1) {
            $scope.detalle_facturas = "";
            notification.getNotification('success','Diagnostico actualizado correctamente','Notificacion');
            $scope.muestraFacturas();
            $scope.afiliado = "";
            $scope.diag = "";
            $scope.muestraFacturas
            $scope.valor_diag = "";
            $scope.detalle_facturas = "";


         }else{
            notification.getNotification('info',diagnosticos.data,'Notificacion');
         }
      })  
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
   $scope.moverRevision = function(){
	   $http({
         method:'GET',
         url:"php/salud/mover_revision.php",
         params: {documento:$scope.afiliado.documento,
                  factura:$scope.afiliado.factura,
                  proveedor:$scope.afiliado.proveedor,
                  recibo:$scope.afiliado.recibo}
      }).then(function(res){
         if (res.data == 1) {
            $scope.detalle_facturas = "";
            notification.getNotification('success','Diagnostico movido a revisión','Notificacion');
            $scope.muestraFacturas();
            $scope.afiliado = "";
            $scope.diag = "";
         }else{
            notification.getNotification('info','Error moviendo a revisión','Notificacion');
         }
      }) 
   }

   $scope.asignaDiagnostico = function(dxnombre,dxcodigo){
      $scope.diag = {nombre : dxnombre,codigo : dxcodigo};
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
