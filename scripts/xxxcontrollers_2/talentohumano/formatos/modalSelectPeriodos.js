'use strict';
   angular.module('GenesisApp')
   .controller('modalSelectPeriodosCtrl',['$scope','$http','consultaHTTP','$filter','ngDialog','cfpLoadingBar','$window',
   function($scope,$http,consultaHTTP,$filter,ngDialog,cfpLoadingBar,$window) {
      $scope.anio = "0";
      $scope.mes = "0";
      $scope.periodo = "0";
      $http({
         method: 'POST',
         url: "php/talentohumano/nomina/funcnomina.php",
         data: {
            function: 'listaAnio'
         }
      }).then(function(response) {
         $scope.Anios = response.data;
      });
      $scope.listMes = function(){
         swal.showLoading();
         $http({
            method: 'POST',
            url: "php/talentohumano/nomina/funcnomina.php",
            data: {
               function: 'listaMeses',
               anio: $scope.anio
            }
         }).then(function(response) {
            $scope.Mes = response.data;
            $scope.mes = "0";
            $scope.periodo = "0";
            swal.close();
         });
      }
      $scope.listPeriodo = function(){
         swal.showLoading();
         $http({
            method: 'POST',
            url: "php/talentohumano/nomina/funcnomina.php",
            data: {
               function: 'listaPeriodos',
               anio: $scope.anio,
               mes: $scope.mes
            }
         }).then(function(response) {
            $scope.Periodos = response.data;
            $scope.periodo = "0";
            swal.close();
         });
      }
      $scope.generar = function(){
         if ($scope.anio == "0" || $scope.mes == "0" || $scope.periodo == "0") {
            swal('Información','Seleccione todos los datos para generar el volante','info');
            return;
         }else{
            $scope.mestext = $("#selectMes option:selected").text();
            $window.open('views/talentohumano/formatos/comprobante-pago.php?anio='+$scope.anio+'&mes='+$scope.mes+'&per='+$scope.periodo+'&mestext='+$scope.mes,'_blank', "width=1080,height=1100");            //
         }
      }
   }
]);