'use strict';
	angular.module('GenesisApp')
	.controller('modaldirctrl',['$http','$scope','ngDialog','consultaHTTP','afiliacionHttp','notification','cfpLoadingBar','$window','communication',
	function($http,$scope,ngDialog,consultaHTTP,afiliacionHttp,notification,cfpLoadingBar,$window,communication) {
		$scope.new = {
			selectViap : " ",
			selectLetra : " ",
			selectnumero : " ",
			selectcuadrante : " ",
			selectLetraVG : " ",
			selectcuadranteVG : " ",
			bis : false
		}
		$scope.ccdire = function(){
			if ($scope.new.selectViap != "" ) {
				$scope.actdire = true;
			}else{
				$scope.actdire = false;
			}
		}
		$scope.guardar = function(){
         if ($scope.filtro.selectViap != "" && $scope.filtro.numeroN != "") {
            $scope.direccion = $("#newdireccion")[0].value;
            $scope.closeThisDialog($scope.direccion);
         }else{
            notification.getNotification('info','Ingrese una dirección válida','Notificación');
         }
			
		}
      $scope.cancelar = function(){
         $scope.closeThisDialog('XX');  
      }
		$scope.obtenerDocumento = function () {
         afiliacionHttp.obtenerDocumento().then(function (response) {
            $scope.Documentos = response;
         })
      }
      $scope.obtenerViaPrincipal = function () {
         afiliacionHttp.obtenerViaPrincipal().then(function (response) {
            $scope.viaprincipal = response;
         })
      }
      $scope.obtenerLetra = function () {
         afiliacionHttp.obtenerLetra().then(function (response) {
            $scope.letras = response;
         })
      }
      
      $scope.obtenerCuadrante = function () {
         afiliacionHttp.obtenerCuadrante().then(function (response) {
            $scope.Cuadrantes = response;
         })
      }
   }
]);