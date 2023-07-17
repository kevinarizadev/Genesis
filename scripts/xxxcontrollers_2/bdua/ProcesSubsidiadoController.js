'use strict';
angular.module('GenesisApp')
.controller('ProcesSubsidiadoController',['$scope','consultaHTTP','notification','$timeout','$rootScope','$http','$window','ngDialog',
  function($scope,consultaHTTP,notification,$timeout,$rootScope,$http,$window,ngDialog) {


    $scope.traslado=function(){
      swal({title: 'Cargando Información'}); swal.showLoading();
      $http({
        method:'POST',
        url:"php/bdua/funbdua.php",
        data: {
          function:'traslado',
          strNumeroDocumento:$scope.numiden
        }
      }).then(function(res){
        $scope.traslado=res.data;
      })
    }
    $scope.s2=function(){
      $http({
        method:'POST',
        url:"php/bdua/funbdua.php",
        data: {
          function:'s2',
          strNumeroDocumento:$scope.numiden
        }
      }).then(function(res){
        $scope.s2=res.data;
      })
    }
    $scope.s2automatico=function(){
      $http({
        method:'POST',
        url:"php/bdua/funbdua.php",
        data: {
          function:'s2automatico',
          strNumeroDocumento:$scope.numiden
        }
      }).then(function(res){
        $scope.s2automatico=res.data;
      })
    }
    $scope.r2traslado=function(){
      $http({
        method:'POST',
        url:"php/bdua/funbdua.php",
        data: {
          function:'r2traslado',
          strNumeroDocumento:$scope.numiden
        }
      }).then(function(res){
        $scope.r2traslado=res.data;
      })
    }
    $scope.r2autotraslado=function(){
      $http({
        method:'POST',
        url:"php/bdua/funbdua.php",
        data: {
          function:'r2autotraslado',
          strNumeroDocumento:$scope.numiden
        }
      }).then(function(res){
        $scope.r2autotraslado=res.data;
      })
    }
    $scope.maestroingreso=function(){
      $http({
        method:'POST',
        url:"php/bdua/funbdua.php",
        data: {
          function:'maestroingreso',
          strNumeroDocumento:$scope.numiden
        }
      }).then(function(res){
        $scope.maestroingreso=res.data;
      })
    }
    $scope.maestronovedad=function(){
      $http({
        method:'POST',
        url:"php/bdua/funbdua.php",
        data: {
          function:'maestronovedad',
          strNumeroDocumento:$scope.numiden
        }
      }).then(function(res){
        $scope.maestronovedad=res.data;
      })
    }
    $scope.consolidado=function(){
      $http({
        method:'POST',
        url:"php/bdua/funbdua.php",
        data: {
          function:'consolidado',
          strNumeroDocumento:$scope.numiden
        }
      }).then(function(res){
        $scope.consolidado=res.data;
      })
    }
    $scope.consolidadohistorico=function(){
      $http({
        method:'POST',
        url:"php/bdua/funbdua.php",
        data: {
          function:'consolidadohistorico',
          strNumeroDocumento:$scope.numiden
        }
      }).then(function(res){
        $scope.consolidadohistorico=res.data;
      })
    }
    $scope.liquidacionmensual=function(){
      $http({
        method:'POST',
        url:"php/bdua/funbdua.php",
        data: {
          function:'liquidacionmensual',
          strNumeroDocumento:$scope.numiden
        }
      }).then(function(res){
        $scope.liquidacionmensual=res.data;
      })
    }
    $scope.eliminacion=function(){
      $http({
        method:'POST',
        url:"php/bdua/funbdua.php",
        data: {
          function:'eliminacion',
          strNumeroDocumento:$scope.numiden
        }
      }).then(function(res){
        $scope.eliminacion=res.data;
        swal.close();
      })
    }

    $scope.satsub=function(){
      $http({
        method:'POST',
        url:"php/bdua/funbdua.php",
        data: {
          function:'sats',
          strNumeroDocumento:$scope.numiden
        }
      }).then(function(res){
        $scope.sa=res.data;      
        swal.close();
      })
    }





    $scope.traslado();
    $scope.s2();
    $scope.s2automatico();
    $scope.r2traslado();
    $scope.r2autotraslado();
    $scope.maestroingreso();
    $scope.maestronovedad();
    $scope.consolidado();
    $scope.consolidadohistorico();
    $scope.liquidacionmensual();
    $scope.eliminacion();
    $scope.satsub();
  }
  ]);
