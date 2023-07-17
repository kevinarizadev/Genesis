'use strict';
	angular.module('GenesisApp')
	.controller('editardatosctrl',['$http','$scope','ngDialog','consultaHTTP','afiliacionHttp','notification','cfpLoadingBar','$window','communication',
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
		$scope.editdire = false;
		$scope.editfijo = false;
		$scope.actdire = false;
		
		$scope.ccdire = function(){
			if ($scope.new.selectViap != "" ) {
				$scope.actdire = true;
			}else{
				$scope.actdire = false;
			}
		}

		$scope.guardar = function(){
			swal({
            title: 'Actualizando información...',
            allowEscapeKey : false,
            allowOutsideClick : false
         });
         swal.showLoading();
			$scope.direccion = $("#newdireccion")[0].value;
			console.log($scope.direccion);
			$http({
				method:'GET',
				url:"php/consultaafiliados/actualizaafidatos.php",
				params: {tipo:$scope.tipo_documento,
							numero:$scope.documento,
							direccion:$scope.direccion,
							telefono:$scope.new.telfijo,
							celular:$scope.new.celular,
							celular2:$scope.new.celular2,
							correo:$scope.new.correo,
							barrio:$scope.new.barrio}
				}).then(function(res){
					if (res.data == 1) {
						swal('Completado','Se actualizo la información correctamente','success');
						communication.valor = 1;
					}else{
						swal('Advertencia','No se pudo actualizar la información del afiliado <br><br>Detalles:'+res.data,'warning');
					}
				}, function myError(response) {
			        swal('Advertencia','No se pudo actualizar la información del afiliado <br><br>Detalles:'+response.data,'warning');
			    })
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
      $scope.obtenerNumero = function () {
         afiliacionHttp.obtenerNumero().then(function (response) {
            $scope.Numeros = response;
         })
      }
      $scope.obtenerCuadrante = function () {
         afiliacionHttp.obtenerCuadrante().then(function (response) {
            $scope.Cuadrantes = response;
         })
      }
   }
]);