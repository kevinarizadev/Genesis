'use strict';
angular.module('GenesisApp')
.controller('gestiondocumentalcontroller',['$scope','$http','$localStorage','$controller','gestiondocumentalHttp','bodegaHttp','pasilloHttp','pisoHttp','nivelHttp','secuenciaHttp','ngDialog','$rootScope',
 function($scope,$http,$localStorage,$controller,gestiondocumentalHttp,bodegaHttp,pasilloHttp,pisoHttp,nivelHttp,secuenciaHttp,ngDialog,$rootScope) {
  $scope.numerocaja = 1;
  $scope.lista_Bodega = '0'; 
  $scope.lista_Pasillo = '0';
  $scope.lista_piso = '0';
  $scope.lista_nivel = '0';
  $scope.lista_secuencia = '0';
  $scope.vercaja = true;

 bodegaHttp.adminCantidad().then(function(response){
  $scope.admincantidad = response[0].CANTIDAD;
 })

 bodegaHttp.mostrarBodega().then(function (response) {
      $scope.bodegas = response;
    })

 $scope.obtenercaja = function (){
   gestiondocumentalHttp.obtenerCaja( $scope.lista_Bodega,$scope.lista_Pasillo,$scope.lista_piso,$scope.lista_nivel,$scope.lista_secuencia).then(function (response) {
    $scope.vercaja = false;
   if (response==0){
     $scope.valorcaja = true;
   }else{
     $scope.valorcaja = false;
     $scope.cajas = response;
   }
   
  })
 }

$scope.obtenerbodega = function (){
  bodegaHttp.mostrarBodega().then(function (response) {
      $scope.bodegas = response;
    })
}

$scope.filtrobodega =  function () {
  $scope.obtenerPasillo($scope.lista_Bodega);
   $scope.obtenerPiso($scope.lista_Bodega,$scope.lista_Pasillo);
    $scope.obtenerNivel($scope.lista_Bodega,$scope.lista_Pasillo,$scope.lista_piso);
     $scope.obtenerSecuencia($scope.lista_Bodega,$scope.lista_Pasillo,$scope.lista_piso,$scope.lista_nivel);
   $scope.vercaja = true;
}

$scope.filtropasillo =  function () {
  $scope.obtenerPiso($scope.lista_Bodega,$scope.lista_Pasillo);
    $scope.obtenerNivel($scope.lista_Bodega,$scope.lista_Pasillo,$scope.lista_piso);
     $scope.obtenerSecuencia($scope.lista_Bodega,$scope.lista_Pasillo,$scope.lista_piso,$scope.lista_nivel);
  $scope.vercaja = true;
}

$scope.filtropiso =  function () {
  $scope.obtenerNivel($scope.lista_Bodega,$scope.lista_Pasillo,$scope.lista_piso);
   $scope.obtenerSecuencia($scope.lista_Bodega,$scope.lista_Pasillo,$scope.lista_piso,$scope.lista_nivel);
  $scope.vercaja = true;
}

$scope.filtronivel =  function () {
  $scope.obtenerSecuencia($scope.lista_Bodega,$scope.lista_Pasillo,$scope.lista_piso,$scope.lista_nivel);
  $scope.vercaja = true;
}

$scope.filtrocambiosecuencia =  function () {
  $scope.vercaja = true;
}

$scope.obtenerPasillo = function (codigo_bodega){
  pasilloHttp.mostrarPasillo(codigo_bodega).then(function (response) {
      $scope.pasillos = response;
    })
}

$scope.obtenerPiso = function (codigo_bodega,codigo_pasillo){
 pisoHttp.mostrarPiso(codigo_bodega,codigo_pasillo).then(function (response) {
      $scope.pisos = response;
    })
}

$scope.obtenerNivel = function (codigo_bodega,codigo_pasillo,codigo_piso){
 nivelHttp.mostrarNivel(codigo_bodega,codigo_pasillo,codigo_piso).then(function (response) {
      $scope.niveles = response;
    })
}

$scope.obtenerSecuencia = function (codigo_bodega,codigo_pasillo,codigo_piso,codigo_nivel){
secuenciaHttp.mostrarSecuencia(codigo_bodega,codigo_pasillo,codigo_piso,codigo_nivel).then(function (response) {
      $scope.secuencias = response;
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


$scope.moveElements = function (event,id,val){
  if ( $scope.numerocaja >= 1  &&  $scope.numerocaja <= 9 ){
   if (val=='up'){
        if ($scope.numerocaja == 9 ){$scope.numerocaja = 9}else{$scope.numerocaja++;}
   }else {
        if ($scope.numerocaja == 1){ $scope.numerocaja = 1;} else { $scope.numerocaja--;}
   }

    var box = document.querySelector('#containerp'+id).children[0],
    showPanelButtons = document.querySelectorAll('#show-buttons'+id+' button'),
    panelClassName = 'show-front',

    onButtonClick = function(event){
      box.removeClassName( panelClassName );
      panelClassName = event.target.className;
      box.addClassName( panelClassName );
    };

    for (var i=0, len = showPanelButtons.length; i < len; i++) {
      showPanelButtons[i].addEventListener( 'click', onButtonClick, false);
    }
  }
  }

  
   $scope.createObject = function (estado,id,Ubicacioncaja){
    $scope.idbox = id;
    $scope.ubicacion_caja = Ubicacioncaja;

    if (estado=='CARPETA'){
    ngDialog.open({
               template: 'views/gestiondocumental/modalagregarcarpeta.html',
               controller: 'carpetacontroller',
               controllerAs: 'cpctrl',
               scope: $scope
            });
    }else{
       ngDialog.open({
               template: 'views/gestiondocumental/modalagregarcaja.html',
               controller: 'cajacontroller',
               controllerAs: 'cjctrl',
               scope: $scope
            });
    }
  }

  $scope.createBodega = function (){
   ngDialog.open({
               template: 'views/gestiondocumental/modalagregarbodega.html',
                controller: 'bodegacontroller',
                controllerAs: 'bdctrl',
                scope: $scope
            });
  }

  $scope.obtenersolicitudes = function (){
   ngDialog.open({
               template: 'views/gestiondocumental/modalsolicitud.html',
               className: 'ngdialog-theme-plain',//,
                controller: 'solicitudcontroller',
                controllerAs: 'bdctrl',
                scope: $scope
            });
  }

  $scope.createPasillo = function (){
   ngDialog.open({
               template: 'views/gestiondocumental/modalagregarpasillo.html',
               controller: 'pasillocontroller',
               controllerAs: 'pactrl',
               scope: $scope
            });
  }

  $scope.createPiso = function (){
   ngDialog.open({
               template: 'views/gestiondocumental/modalagregarpiso.html',
               controller: 'pisocontroller',
               controllerAs: 'pactrl',
               scope: $scope
            });
  }

  $scope.createNivel = function (){
   ngDialog.open({
               template: 'views/gestiondocumental/modalagregarnivel.html',
               controller: 'nivelcontroller',
               controllerAs: 'nvctrl',
               scope: $scope
            });
  }

   $scope.createSecuencia = function (){
   ngDialog.open({
               template: 'views/gestiondocumental/modalagregarsecuencia.html',
               controller: 'secuenciacontroller',
               controllerAs: 'sectrl',
               scope: $scope
            });
  }

   $scope.viewBoxDetails = function (){
   $scope.gestion = 0;
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

   $scope.viewReportsDetails = function (){
   ngDialog.open({
               template: 'views/gestiondocumental/modalreportedetalle.html',
               controller: 'reportedetallecontroller',
               controllerAs: 'rdctrl',
               scope: $scope
            });
  }

    $scope.downloadReport = function (){
       window.open('php/gestiondocumental/reportecaja.php');
     }

    $scope.downloadReportcaja = function (){
       window.open('php/gestiondocumental/reportecarpeta.php');
     }

}]);
