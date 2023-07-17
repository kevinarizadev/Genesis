'use strict';
angular.module('GenesisApp')
.controller('ProcesoContritubitvoController',['$scope','consultaHTTP','notification','$timeout','$rootScope','$http','$window','ngDialog',
function($scope,consultaHTTP,notification,$timeout,$rootScope,$http,$window,ngDialog) {

  $scope.r1=function(){
    swal({title: 'Cargando Información'}); swal.showLoading();
    $http({
      method:'POST',
      url:"php/bdua/funbdua.php",
      data: {
        function:'bduacrc1',
        strNumeroDocumento:$scope.numiden
      }
    }).then(function(res){
      $scope.datos=res.data;
    })
  }
  $scope.r2=function(){
    $http({
      method:'POST',
      url:"php/bdua/funbdua.php",
      data: {
        function:'bduacrc2',
        strNumeroDocumento:$scope.numiden
      }
    }).then(function(res){
      $scope.r2=res.data;
    })
  }
  $scope.cs2=function(){
    $http({
      method:'POST',
      url:"php/bdua/funbdua.php",
      data: {
        function:'cs2',
        strNumeroDocumento:$scope.numiden
      }
    }).then(function(res){
      $scope.cs2=res.data;
    })
  }
  $scope.cama=function(){
    $http({
      method:'POST',
      url:"php/bdua/funbdua.php",
      data: {
        function:'cama',
        strNumeroDocumento:$scope.numiden
      }
    }).then(function(res){
      $scope.cama=res.data;

    })
  }
  $scope.cmc=function(){
    $http({
      method:'POST',
      url:"php/bdua/funbdua.php",
      data: {
        function:'cmc',
        strNumeroDocumento:$scope.numiden
      }
    }).then(function(res){
      $scope.cmc=res.data;

    })
  }
  $scope.cnc=function(){
    $http({
      method:'POST',
      url:"php/bdua/funbdua.php",
      data: {
        function:'cnc',
        strNumeroDocumento:$scope.numiden
      }
    }).then(function(res){
      $scope.cnc=res.data;

    })
  }
  $scope.conafil=function(){
    $http({
      method:'POST',
      url:"php/bdua/funbdua.php",
      data: {
        function:'conafil',
        strNumeroDocumento:$scope.numiden
      }
    }).then(function(res){
      $scope.conafil=res.data;

    })
  }
  $scope.cbi=function(){
    $http({
      method:'POST',
      url:"php/bdua/funbdua.php",
      data: {
        function:'cbi',
        strNumeroDocumento:$scope.numiden
      }
    }).then(function(res){
      $scope.cbi=res.data;

    })
  }
  $scope.cp=function(){
    $http({
      method:'POST',
      url:"php/bdua/funbdua.php",
      data: {
        function:'cp',
        strNumeroDocumento:$scope.numiden
      }
    }).then(function(res){
      $scope.cp=res.data;
    })
  }
  $scope.cpp=function(){
    $http({
      method:'POST',
      url:"php/bdua/funbdua.php",
      data: {
        function:'cpp',
        strNumeroDocumento:$scope.numiden
      }
    }).then(function(res){
      $scope.cpp=res.data;
    })
  }
  $scope.cnrp=function(){
    $http({
      method:'POST',
      url:"php/bdua/funbdua.php",
      data: {
        function:'cnrp',
        strNumeroDocumento:$scope.numiden
      }
    }).then(function(res){
      $scope.cnrp=res.data;
    })
  }
  $scope.ccc=function(){
    $http({
      method:'POST',
      url:"php/bdua/funbdua.php",
      data: {
        function:'ccc',
        strNumeroDocumento:$scope.numiden
      }
    }).then(function(res){
      $scope.ccc=res.data;
    })
  }
  $scope.ccr=function(){
    $http({
      method:'POST',
      url:"php/bdua/funbdua.php",
      data: {
        function:'ccr',
        strNumeroDocumento:$scope.numiden
      }
    }).then(function(res){
      $scope.ccr=res.data;
    })
  }
  $scope.cggb=function(){
    $http({
      method:'POST',
      url:"php/bdua/funbdua.php",
      data: {
        function:'cggb',
        strNumeroDocumento:$scope.numiden
      }
    }).then(function(res){
      $scope.cggb=res.data;
      swal.close();
    })
  }

    $scope.sat=function(){
      $http({
        method:'POST',
        url:"php/bdua/funbdua.php",
        data: {
          function:'satc',
          strNumeroDocumento:$scope.numiden
        }
      }).then(function(res){
        $scope.satc=res.data;
        swal.close();
      })
  }

  $scope.r1();
  $scope.r2();
  $scope.cs2();
  $scope.cama();
  $scope.cmc();
  $scope.cnc();
  $scope.conafil();
  $scope.cbi();
  $scope.cp();
  $scope.cpp();
  $scope.cnrp();
  $scope.ccc();
  $scope.ccr();
  $scope.cggb();
  $scope.sat();
}
]);
