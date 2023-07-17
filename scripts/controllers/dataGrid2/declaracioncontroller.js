'use strict';
	angular.module('declaracionApp',['ngStorage'])
 	.controller('declaracionController',['$scope','$http','$localStorage','$timeout',
 	function($scope,$http,$localStorage,$timeout) {
 		$timeout(function () {
             $scope.llenaBeneficiariosDec();
        }, 2000);
        $scope.llenaBeneficiariosDec = function(){
        	if ($localStorage.fuar === undefined) {
 			//location.reload();
			}else{
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth() + 1;
				var yyyy = today.getFullYear();
				$scope.zona_urbana = "";
				$scope.zona_rural = "";
				$scope.sexo_femenino = "";
				$scope.sexo_masculino = "";

				// Llenamos la informacion del cabeza de familia

				if ($localStorage.fuar.ZONA == "R"){
					$scope.zona_rural = "X";
				}else if($localStorage.fuar.ZONA == "U"){
					$scope.zona_urbana = "X"
				}
				if ($localStorage.fuar.SEXO == "F"){
					$scope.sexo_femenino = "X";
				}else if($localStorage.fuar.SEXO == "M"){
					$scope.sexo_masculino = "X"
				}
				$scope.fecha_nacimiento = $localStorage.fuar.NACIMIENTO;
				$scope.edad = $localStorage.fuar.EDAD;
				$scope.fecha_radicado = dd+'/'+mm+'/'+yyyy;
				$scope.radicado = $localStorage.fuar.RADICADO;
				$scope.name_c = $localStorage.fuar.PRIMER_APELLIDO+' '+
										 $localStorage.fuar.SEGUNDO_APELLIDO+' '+
										 $localStorage.fuar.PRIMER_NOMBRE+' '+
										 $localStorage.fuar.SEGUNDO_NOMBRE;
				$scope.primer_apellido = $localStorage.fuar.PRIMER_APELLIDO;
				$scope.localidad = $localStorage.fuar.LOCALIDAD;
				$scope.segundo_apellido = $localStorage.fuar.SEGUNDO_APELLIDO;
				$scope.primer_nombre = $localStorage.fuar.PRIMER_NOMBRE;
				$scope.segundo_nombre = $localStorage.fuar.SEGUNDO_NOMBRE;
				$scope.numero_documento = $localStorage.fuar.DOCUMENTO;
				//$scope.sexo = $localStorage.fuar.S 	EXO;
				$scope.tipo_documento = $localStorage.fuar.TIPODOCUMENTO;
				$scope.direccion = $localStorage.fuar.DIRECCION;
				$scope.tel_fijo = $localStorage.fuar.TELEFONO;
				$scope.tel_celular = $localStorage.fuar.CELULAR;
				$scope.municipio = $localStorage.fuar.NOMBRE;
				$scope.etnia = $localStorage.fuar.GRUPO_ETNICO;
				$scope.departamento = $localStorage.fuar.UBICACIONGEOGRAFICA;
				$scope.c_nombre_ips = $localStorage.fuar.IPSNOMBRE;
				$scope.c_codigo_ips = $localStorage.fuar.IPS;
				if ($localStorage.fuarbef===undefined || $localStorage.fuarbef[0] == null) {
					alert("Este afiliado no registra beneficiaros, si desea agregar uno, vuelva al modulo de Genesis, finalice el proceso y genere este reporte otra vez.")
				}else{
					var i;
					var fuarbef = $localStorage.fuarbef;
					for (i = 0; i < fuarbef.length; i++) { 
						if (fuarbef[i].PARENTESCO == "CONYUGUE") {
							$scope.con_primerapellido = fuarbef[i].PRIMER_APELLIDO;
							$scope.con_segundoapellido = fuarbef[i].SEGUNDO_APELLIDO;
							$scope.con_primernombre = fuarbef[i].PRIMER_NOMBRE;
							$scope.con_segundonombre = fuarbef[i].SEGUNDO_NOMBRE;
							$scope.con_tipodocumento = fuarbef[i].TIPODOCUMENTO;
							$scope.com_numerodocumento = fuarbef[i].DOCUMENTO;
							switch(fuarbef[i].SEXO){
								case "F":
								$scope.check_con_sexof = "X";
								break;
								case "M":
								$scope.check_con_sexom = "X";
								break;
							}
							$scope.con_fecha_nacimiento = fuarbef[i].NACIMIENTO;
						}
					}
					$scope.name_b1 = $localStorage.fuarbef[0].PRIMER_APELLIDO+' '+
										 $localStorage.fuarbef[0].SEGUNDO_APELLIDO+' '+
										 $localStorage.fuarbef[0].PRIMER_NOMBRE+' '+
										 $localStorage.fuarbef[0].SEGUNDO_NOMBRE;
					$scope.b1_tipo_documento = $localStorage.fuarbef[0].TIPODOCUMENTO;
					$scope.b1_numero_documento = $localStorage.fuarbef[0].DOCUMENTO;
					$scope.b1_etnia = $localStorage.fuarbef[0].GRUPO_ETNICO;
					$scope.b1_municipio = $localStorage.fuarbef[0].NOMBRE;
					$scope.b1_edad = $localStorage.fuarbef[0].EDAD;
					
					if (fuarbef[1] === undefined) {
						//alert("Sin segundo beneficiaro");
					}else{
						$scope.name_b2 = $localStorage.fuarbef[1].PRIMER_APELLIDO+' '+
										 $localStorage.fuarbef[1].SEGUNDO_APELLIDO+' '+
										 $localStorage.fuarbef[1].PRIMER_NOMBRE+' '+
										 $localStorage.fuarbef[1].SEGUNDO_NOMBRE;
						$scope.b2_tipo_documento = $localStorage.fuarbef[1].TIPODOCUMENTO;
						$scope.b2_numero_documento = $localStorage.fuarbef[1].DOCUMENTO;
						$scope.b2_etnia = $localStorage.fuarbef[1].GRUPO_ETNICO;
						$scope.b2_municipio = $localStorage.fuarbef[1].NOMBRE;
						$scope.b2_edad = $localStorage.fuarbef[1].EDAD;
					}

					if (fuarbef[2] === undefined) {
						//alert("Sin tercer beneficiaro");
					}else{
						$scope.name_b3 = $localStorage.fuarbef[2].PRIMER_APELLIDO+' '+
										 $localStorage.fuarbef[2].SEGUNDO_APELLIDO+' '+
										 $localStorage.fuarbef[2].PRIMER_NOMBRE+' '+
										 $localStorage.fuarbef[2].SEGUNDO_NOMBRE;
						$scope.b3_tipo_documento = $localStorage.fuarbef[2].TIPODOCUMENTO;
						$scope.b3_numero_documento = $localStorage.fuarbef[2].DOCUMENTO;
						$scope.b3_etnia = $localStorage.fuarbef[2].GRUPO_ETNICO;
						$scope.b3_municipio = $localStorage.fuarbef[2].NOMBRE;
						$scope.b3_edad = $localStorage.fuarbef[2].EDAD;
					}

					if (fuarbef[3] === undefined) {
						//alert("Sin cuarto beneficiaro");
					}else{
						$scope.name_b4 = $localStorage.fuarbef[3].PRIMER_APELLIDO+' '+
										 $localStorage.fuarbef[3].SEGUNDO_APELLIDO+' '+
										 $localStorage.fuarbef[3].PRIMER_NOMBRE+' '+
										 $localStorage.fuarbef[3].SEGUNDO_NOMBRE;
						$scope.b4_tipo_documento = $localStorage.fuarbef[3].TIPODOCUMENTO;
						$scope.b4_numero_documento = $localStorage.fuarbef[3].DOCUMENTO;
						$scope.b4_etnia = $localStorage.fuarbef[3].GRUPO_ETNICO;
						$scope.b4_municipio = $localStorage.fuarbef[3].NOMBRE;
						$scope.b4_edad = $localStorage.fuarbef[3].EDAD;
					}

					if (fuarbef[4] === undefined) {
						//alert("Sin quinto beneficiaro");
					}else{
						$scope.name_b5 = $localStorage.fuarbef[4].PRIMER_APELLIDO+' '+
										 $localStorage.fuarbef[4].SEGUNDO_APELLIDO+' '+
										 $localStorage.fuarbef[4].PRIMER_NOMBRE+' '+
										 $localStorage.fuarbef[4].SEGUNDO_NOMBRE;
						$scope.b5_tipo_documento = $localStorage.fuarbef[4].TIPODOCUMENTO;
						$scope.b5_numero_documento = $localStorage.fuarbef[4].DOCUMENTO;
						$scope.b5_etnia = $localStorage.fuarbef[4].GRUPO_ETNICO;
						$scope.b5_parentesco = $localStorage.fuarbef[4].PARENTESCO;
						$scope.b5_municipio = $localStorage.fuarbef[4].NOMBRE;
						$scope.b5_edad = $localStorage.fuarbef[4].EDAD;
					}

					if (fuarbef[5] === undefined) {
						//alert("Sin sexto beneficiaro");
					}else{
						$scope.name_b6 = $localStorage.fuarbef[5].PRIMER_APELLIDO+' '+
										 $localStorage.fuarbef[5].SEGUNDO_APELLIDO+' '+
										 $localStorage.fuarbef[5].PRIMER_NOMBRE+' '+
										 $localStorage.fuarbef[5].SEGUNDO_NOMBRE;
						$scope.b6_tipo_documento = $localStorage.fuarbef[5].TIPODOCUMENTO;
						$scope.b6_numero_documento = $localStorage.fuarbef[5].DOCUMENTO;
						$scope.b6_etnia = $localStorage.fuarbef[5].GRUPO_ETNICO;
						$scope.b6_fecha_nacimiento = $localStorage.fuarbef[5].NACIMIENTO;
						$scope.b6_municipio = $localStorage.fuarbef[5].NOMBRE;
						$scope.b6_edad = $localStorage.fuarbef[5].EDAD;
					}

					if (fuarbef[6] === undefined) {
						//alert("Sin septimo beneficiaro");
					}else{
						$scope.name_b7 = $localStorage.fuarbef[6].PRIMER_APELLIDO+' '+
										 $localStorage.fuarbef[6].SEGUNDO_APELLIDO+' '+
										 $localStorage.fuarbef[6].PRIMER_NOMBRE+' '+
										 $localStorage.fuarbef[6].SEGUNDO_NOMBRE;
						$scope.b7_tipo_documento = $localStorage.fuarbef[6].TIPODOCUMENTO;
						$scope.b7_numero_documento = $localStorage.fuarbef[6].DOCUMENTO;
						$scope.b7_etnia = $localStorage.fuarbef[6].GRUPO_ETNICO;
						$scope.b7_municipio = $localStorage.fuarbef[6].NOMBRE;
						$scope.b7_edad = $localStorage.fuarbef[2].EDAD;
					}				
				}
			}
        }
 		
	}
]);