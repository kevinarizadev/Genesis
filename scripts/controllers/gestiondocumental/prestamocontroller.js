'use strict';
angular.module('GenesisApp')
.controller('prestamocontroller',['$scope','$http','$localStorage','$controller','gestiondocumentalHttp','ngDialog','inventarioHttp','prestamoHttp',
 function($scope,$http,$localStorage,$controller,gestiondocumentalHttp,ngDialog,inventarioHttp, prestamoHttp) {
  
  $scope.vercaja = true;
   $scope.descripcion = "";

   //datos de sesion como cedula y ubicacion
    var dat = {prov : 'navb'}
    $.getJSON( "php/obtenersession.php", dat)
    .done(function(respuesta) {
      $scope.sesdata = respuesta;
      $scope.cedula = $scope.sesdata.cedula;
      $scope.ubicacion = $scope.sesdata.codmunicipio;
      
      prestamoHttp.mostrarCantidad($scope.cedula).then(function(response){
        $scope.micantidad = response[0].CANTIDAD;
      })
      
      inventarioHttp.obtenerArea( $scope.cedula).then(function (response) {
      $scope.area = response.data;
      })
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
      console.log("navbar error obteniendo variables");
    });
    //Fin datos de sesion como cedula y ubicacion
 function formatDate(date) {
            var month = date.getUTCMonth() + 1;
            date = date.getDate()   + "/" + month + "/" + date.getFullYear();
            return date;
         } 

 $scope.searchbox = function (){
   
   gestiondocumentalHttp.buscarcaja($scope.area, formatDate($scope.fecha_inicio),  formatDate($scope.fecha_fin), $scope.descripcion).then(function (response) {
    $scope.vercaja = false;
   if (response==0){
     $scope.valorcaja = true;
   }else{
     $scope.valorcaja = false;
     $scope.cajas = response;
   }
  })
 }
  
   $scope.createObject = function (estado,id,Ubicacioncaja){
    $scope.idbox = id;
    $scope.ubicacion_caja = Ubicacioncaja;
    if (estado=='N'){
    ngDialog.open({
               template: 'views/gestiondocumental/modalprestamocarpeta.html',
               //controller: 'carpetacontroller',
               //controllerAs: 'cpctrl',
               scope: $scope
            });
    }else{
    ngDialog.open({
               template: 'views/gestiondocumental/modalprestamocaja.html',
               controller: 'prestamocajacontroller',
               controllerAs: 'pcjctrl',
               scope: $scope
            });
    }
  }

  $scope.obtenermisprestamos = function(){
     ngDialog.open({
               template: 'views/gestiondocumental/modalmisprestamos.html',
               controller: 'misprestamoscontroller',
               controllerAs: 'mispctrl',
               scope: $scope
            });
  }

  $scope.actualizarmostrarcantidad =  function(){
      prestamoHttp.mostrarCantidad($scope.cedula).then(function(response){
        $scope.micantidad = response[0].CANTIDAD;
      })
  }


  $scope.detalle_carpeta = function(id){
   $scope.idbox = id;
  $scope.viewFileDetails();
}

$scope.detalle_caja = function(id){
  $scope.idbox = id;
  $scope.viewBoxDetails();
}
  
   $scope.viewBoxDetails = function (){
   $scope.gestion = 1;
   ngDialog.open({
               template: 'views/gestiondocumental/modaldetallecaja.html',
               controller: 'detallecajacontroller',
               controllerAs: 'dcctrl',
               scope: $scope
            });
  }

  $scope.viewFileDetails = function (){
   ngDialog.open({
               template: 'views/gestiondocumental/modaldetallecarpeta.html',
               controller: 'detallecarpetacontroller',
               controllerAs: 'dcatrl',
               scope: $scope
            });
  }

}]);
