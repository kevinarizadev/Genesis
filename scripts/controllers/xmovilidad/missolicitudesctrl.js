'use strict';
   angular.module('GenesisApp')
   .controller('missolicitudesctrl',['$scope','consultaHTTP','$timeout','$rootScope','$http','$window','ngDialog',
   function($scope,consultaHTTP,$timeout,$rootScope,$http,$window,ngDialog) {

      $scope.mihistorial = function(){
         $http({
            method: 'POST',
            url: "php/movilidad/funcmovilidad.php",
            data: {
               function: 'listaHistorialEmp'
            }
         }).then(function (response) {
            if (response.data.coderror == "0") {
               $scope.zerosolicitudes = true;
               $scope.historial = {};
            }else{
               $scope.historial = response.data;
               $scope.zerosolicitudes = false;
            }
         });
      }
      $scope.descargafile = function(ruta){
         $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
               function: 'descargaAdjunto',
               ruta: ruta
            }
         }).then(function (response) {
            window.open("temp/"+response.data);
            //window.open("temp/"+response.data);
         });
      }
      $scope.mihistorial();
      $scope.verdetalles = function(motivo,descripcion,estado){
         $scope.detalles = {motivorechazo:motivo,
                           comentarios:descripcion}
         if (estado == "green") {
            $scope.detalles.isRechazo = false;
         }else{
            $scope.detalles.isRechazo = true;
         }
         ngDialog.open({
            template: 'views/movilidad/detallessolicitud.html',
            scope: $scope
         });
      }
   }
]);