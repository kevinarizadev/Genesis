'use strict';
	angular.module('declaracionApp',[])
	.config(function($locationProvider) {
     	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
		});
   })
 	.controller('declaracionController',['$scope','$http','$location','$timeout',
 	function($scope,$http,$location,$timeout) {
 		
        
     	if ($location.search().tipo == "" || $location.search().tipo === undefined) {
			//location.reload();
		}else{
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1;
			var yyyy = today.getFullYear();
			$scope.fecha_radicado = dd+'/'+mm+'/'+yyyy;
			//$scope.numero_documento = $localStorage.fuar.DOCUMENTO;
			//$scope.tipo_documento = $localStorage.fuar.TIPODOCUMENTO;
			
			$http({
	         method:'GET',
	         url:"../../php/consultaafiliados/soportes/obtenerdeclaracion.php",
	         params: {type: $location.search().tipo,
     						id: $location.search().id
	         }
	      }).then(function(res){
	      	var i;
	      	var j;
				var fuarbef = res.data;
				var bef;
				var campo;
				var res;
				var renglon;
				$scope.fecha_nacimiento = fuarbef[0].infoadicional.fecha_nacimiento;
				$scope.direccion = fuarbef[0].infoadicional.direccion;
				$scope.radicado = fuarbef[0].infoadicional.radicado;
				$scope.localidad = fuarbef[0].infoadicional.localidad;
				$scope.tel_fijo = fuarbef[0].infoadicional.tel_fijo;
				$scope.departamento = fuarbef[0].infoadicional.departamento;
				$scope.municipio = fuarbef[0].infoadicional.municipio;
				$scope.tel_celular = fuarbef[0].infoadicional.tel_celular ==null ? '' : fuarbef[0].infoadicional.tel_celular;
				document.getElementById('c_name').innerHTML =fuarbef[0].nombre;
				document.getElementById('c_tipo_documento').innerHTML =fuarbef[0].tipo_documento;
				document.getElementById('c_numero_documento').innerHTML =fuarbef[0].documento;
				document.getElementById('c_etnia').innerHTML =fuarbef[0].grupo_etnico;
				document.getElementById('c_edad').innerHTML =fuarbef[0].edad;
				if (fuarbef[0].respuestas != null) {
					//for (j = 0; j < fuarbef[0].respuestas.length - 1; j++) {
					for (j = 0; j < 33; j++) {

						res = j+1
						//console.log(res);
						document.getElementById('resc'+res).innerHTML =fuarbef[0].respuestas[j].respuesta;
					}
				}
				for (i = 1; i < fuarbef.length; i++) { 
					bef = i;
					campo = 'b'+bef+'_name';
					document.getElementById(campo).innerHTML =fuarbef[i].nombre;
					campo = 'b'+bef+'_tipo_documento';
					document.getElementById(campo).innerHTML =fuarbef[i].tipo_documento;
					campo = 'b'+bef+'_numero_documento';
					document.getElementById(campo).innerHTML =fuarbef[i].documento;
					campo = 'b'+bef+'_etnia';
					document.getElementById(campo).innerHTML =fuarbef[i].grupo_etnico;
					campo = 'b'+bef+'_edad';
					document.getElementById(campo).innerHTML =fuarbef[i].edad;
					if (fuarbef[i].respuestas != null) {
						//for (j = 0; j < fuarbef[i].respuestas.length; j++) {
						for (j = 0; j < 33; j++) {
							res = j+1
							renglon = i+1;
							document.getElementById('resb'+bef+res).innerHTML =fuarbef[i].respuestas[j].respuesta;
						}
					}
				}
	      })
      }
	}
]);