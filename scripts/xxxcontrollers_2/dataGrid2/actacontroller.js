'use strict';
	angular.module('actaApp',['ngStorage'])
 	.controller('actaController',['$scope','$http','$localStorage','$timeout',
 	function($scope,$http,$localStorage,$timeout) {
 		$timeout(function () {
             $scope.llenaActa();
        }, 2000);
        $scope.llenaActa = function(){
        	if ($localStorage.fuar === undefined) {
 			//location.reload();
			}else{
				$scope.name_c = $localStorage.fuar.PRIMER_APELLIDO+' '+
										 $localStorage.fuar.SEGUNDO_APELLIDO+' '+
										 $localStorage.fuar.PRIMER_NOMBRE+' '+
										 $localStorage.fuar.SEGUNDO_NOMBRE;
				$scope.numero_documento = $localStorage.fuar.DOCUMENTO;
				$scope.fecha_nacimiento = $localStorage.fuar.NACIMIENTO;
				$scope.direccion = $localStorage.fuar.DIRECCION;
				$scope.barrio = $localStorage.fuar.LOCALIDAD;
				$scope.municipio = $localStorage.fuar.NOMBRE;
				$scope.correo = $localStorage.fuar.CORREO;
				$scope.tel_fijo = $localStorage.fuar.TELEFONO;
				$scope.tel_celular = $localStorage.fuar.CELULAR;
			}
        }
 		
	}
]);