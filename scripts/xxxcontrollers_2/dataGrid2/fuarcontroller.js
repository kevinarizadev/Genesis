'use strict';
	angular.module('FuarApp',['ngStorage'])
 	.controller('mainController',['$scope','$http','$localStorage','$timeout',
 	function($scope,$http,$localStorage,$timeout) {
 		$timeout(function () {
             $scope.llenafuar();
        }, 2000);
        $scope.llenafuar = function(){
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
				$scope.fecha_radicado = dd+'/'+mm+'/'+yyyy;
				$scope.radicado = $localStorage.fuar.RADICADO;
				$scope.discapacidad = $localStorage.fuar.DISCAPACIDAD;
				$scope.condicion = $localStorage.fuar.CONDICION;
				$scope.primer_apellido = $localStorage.fuar.PRIMER_APELLIDO;
				$scope.segundo_apellido = $localStorage.fuar.SEGUNDO_APELLIDO;
				$scope.primer_nombre = $localStorage.fuar.PRIMER_NOMBRE;
				$scope.segundo_nombre = $localStorage.fuar.SEGUNDO_NOMBRE;
				$scope.numero_documento = $localStorage.fuar.DOCUMENTO;
				$scope.sexo = $localStorage.fuar.SEXO;
				$scope.tipo_documento = $localStorage.fuar.TIPODOCUMENTO;
				$scope.fecha_nacimiento = $localStorage.fuar.NACIMIENTO;
				$scope.etnia = $localStorage.fuar.GRUPO_ETNICO;
				$scope.sisben = $localStorage.fuar.NIVEL_SISBEN;
				$scope.g_poblacional = $localStorage.fuar.GRUPOPOBLACIONAL;
				$scope.direccion = $localStorage.fuar.DIRECCION;
				$scope.tel_fijo = $localStorage.fuar.TELEFONO;
				$scope.tel_celular = $localStorage.fuar.CELULAR;
				$scope.email = $localStorage.fuar.CORREO;
				$scope.municipio = $localStorage.fuar.NOMBRE;
				$scope.departamento = $localStorage.fuar.UBICACIONGEOGRAFICA;
				$scope.localidad = $localStorage.fuar.BARRIO;
				$scope.c_nombre_ips = $localStorage.fuar.NOMBREIPS;
				$scope.c_codigo_ips = $localStorage.fuar.CODIGOHABILITACIONIPS;
				
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
					$scope.check_ben_adic = 'X'
					$scope.b1_primer_apellido = $localStorage.fuarbef[0].PRIMER_APELLIDO;
					$scope.b1_segundo_apellido = $localStorage.fuarbef[0].SEGUNDO_APELLIDO;
					$scope.b1_primer_nombre = $localStorage.fuarbef[0].PRIMER_NOMBRE;
					$scope.b1_segundo_nombre = $localStorage.fuarbef[0].SEGUNDO_NOMBRE;
					$scope.b1_tipo_documento = $localStorage.fuarbef[0].TIPODOCUMENTO;
					$scope.b1_numero_documento = $localStorage.fuarbef[0].DOCUMENTO;
					switch($localStorage.fuarbef[0].SEXO){
						case "F":
						$scope.b1_sexo_femenino = "X";
						break;
						case "M":
						$scope.b1_sexo_masculino = "X";
						break;
					}
					$scope.b1_fecha_nacimiento = $localStorage.fuarbef[0].NACIMIENTO;
					$scope.b1_etnia = $localStorage.fuarbef[0].GRUPO_ETNICO;
					$scope.b1_parentesco = $localStorage.fuarbef[0].PARENTESCO;
					switch($localStorage.fuarbef[0].DISCAPACIDAD){
						case "F":
						$scope.b1_discapacidad_f = "X";
						break;
						case "N":
						$scope.b1_discapacidad_n = "X";
						break;
						case "M":
						$scope.b1_discapacidad_m = "X";
						break;
					}
					switch($localStorage.fuarbef[0].CONDICION){
						case "T":
						$scope.b1_condicion_t = "X";
						break;
						case "P":
						$scope.b1_condicion_p = "X";
						break;
					}
					$scope.b1_municipio = $localStorage.fuarbef[0].NOMBRE;
					switch($localStorage.fuarbef[0].ZONA){
						case "U":
						$scope.b1_zona_u = "X";
						break;
						case "R":
						$scope.b1_zona_r = "X";
						break;
					}
					$scope.b1_departamento = $localStorage.fuarbef[0].UBICACIONGEOGRAFICA;
					$scope.b1_tel_fijo = $localStorage.fuarbef[0].TELEFONO;
					$scope.b1_tel_celular = $localStorage.fuarbef[0].CELULAR;
					$scope.b1_nombre_ips = $localStorage.fuarbef[0].NOMBREIPS;
					$scope.b1_codigo_ips = $localStorage.fuarbef[0].CODIGOHABILITACIONIPS;
					if (fuarbef[1] === undefined) {
						//alert("Sin segundo beneficiaro");
					}else{
						$scope.b2_primer_apellido = $localStorage.fuarbef[1].PRIMER_APELLIDO;
						$scope.b2_segundo_apellido = $localStorage.fuarbef[1].SEGUNDO_APELLIDO;
						$scope.b2_primer_nombre = $localStorage.fuarbef[1].PRIMER_NOMBRE;
						$scope.b2_segundo_nombre = $localStorage.fuarbef[1].SEGUNDO_NOMBRE;
						$scope.b2_tipo_documento = $localStorage.fuarbef[1].TIPODOCUMENTO;
						$scope.b2_numero_documento = $localStorage.fuarbef[1].DOCUMENTO;
						switch($localStorage.fuarbef[1].SEXO){
							case "F":
							$scope.b2_sexo_femenino = "X";
							break;
							case "M":
							$scope.b2_sexo_masculino = "X";
							break;
						}
						$scope.b2_fecha_nacimiento = $localStorage.fuarbef[1].NACIMIENTO;
						$scope.b2_etnia = $localStorage.fuarbef[1].GRUPO_ETNICO;
						$scope.b2_parentesco = $localStorage.fuarbef[1].PARENTESCO
						switch($localStorage.fuarbef[1].DISCAPACIDAD){
							case "F":
							$scope.b2_discapacidad_f = "X";
							break;
							case "N":
							$scope.b2_discapacidad_n = "X";
							break;
							case "M":
							$scope.b2_discapacidad_m = "X";
							break;
						}
						switch($localStorage.fuarbef[1].CONDICION){
							case "T":
							$scope.b2_condicion_t = "X";
							break;
							case "P":
							$scope.b2_condicion_p = "X";
							break;
						}
						$scope.b2_municipio = $localStorage.fuarbef[1].NOMBRE;
						switch($localStorage.fuarbef[1].ZONA){
							case "U":
							$scope.b2_zona_u = "X";
							break;
							case "R":
							$scope.b2_zona_r = "X";
							break;
						}
						$scope.b2_departamento = $localStorage.fuarbef[1].UBICACIONGEOGRAFICA;
						$scope.b2_tel_fijo = $localStorage.fuarbef[1].TELEFONO;
						$scope.b2_tel_celular = $localStorage.fuarbef[1].CELULAR;
						$scope.b2_nombre_ips = $localStorage.fuarbef[1].NOMBREIPS;
						$scope.b2_codigo_ips = $localStorage.fuarbef[1].CODIGOHABILITACIONIPS;
					}
					if (fuarbef[2] === undefined) {
						//alert("Sin tercer beneficiaro");
					}else{
						$scope.b3_primer_apellido = $localStorage.fuarbef[2].PRIMER_APELLIDO;
						$scope.b3_segundo_apellido = $localStorage.fuarbef[2].SEGUNDO_APELLIDO;
						$scope.b3_primer_nombre = $localStorage.fuarbef[2].PRIMER_NOMBRE;
						$scope.b3_segundo_nombre = $localStorage.fuarbef[2].SEGUNDO_NOMBRE;
						$scope.b3_tipo_documento = $localStorage.fuarbef[2].TIPODOCUMENTO;
						$scope.b3_numero_documento = $localStorage.fuarbef[2].DOCUMENTO;
						switch($localStorage.fuarbef[2].SEXO){
							case "F":
							$scope.b3_sexo_femenino = "X";
							break;
							case "M":
							$scope.b3_sexo_masculino = "X";
							break;
						}
						$scope.b3_fecha_nacimiento = $localStorage.fuarbef[2].NACIMIENTO;
						$scope.b3_etnia = $localStorage.fuarbef[2].GRUPO_ETNICO;
						$scope.b3_parentesco = $localStorage.fuarbef[2].PARENTESCO;
						switch($localStorage.fuarbef[2].DISCAPACIDAD){
							case "E":
							$scope.b3_discapacidad_f = "X";
							break;
							case "N":
							$scope.b3_discapacidad_n = "X";
							break;
							case "M":
							$scope.b3_discapacidad_m = "X";
							break;
						}
						switch($localStorage.fuarbef[2].CONDICION){
							case "T":
							$scope.b3_condicion_t = "X";
							break;
							case "P":
							$scope.b3_condicion_p = "X";
							break;
						}
						$scope.b3_municipio = $localStorage.fuarbef[2].NOMBRE;
						switch($localStorage.fuarbef[2].ZONA){
							case "U":
							$scope.b3_zona_u = "X";
							break;
							case "R":
							$scope.b3_zona_r = "X";
							break;
						}
						$scope.b3_departamento = $localStorage.fuarbef[2].UBICACIONGEOGRAFICA;
						$scope.b3_tel_fijo = $localStorage.fuarbef[2].TELEFONO;
						$scope.b3_tel_celular = $localStorage.fuarbef[2].CELULAR;
						$scope.b3_nombre_ips = $localStorage.fuarbef[2].NOMBREIPS;
						$scope.b3_codigo_ips = $localStorage.fuarbef[2].CODIGOHABILITACIONIPS;

					}
					if (fuarbef[3] === undefined) {
						//alert("Sin cuarto beneficiaro");
					}else{
						$scope.b4_primer_apellido = $localStorage.fuarbef[3].PRIMER_APELLIDO;
						$scope.b4_segundo_apellido = $localStorage.fuarbef[3].SEGUNDO_APELLIDO;
						$scope.b4_primer_nombre = $localStorage.fuarbef[3].PRIMER_NOMBRE;
						$scope.b4_segundo_nombre = $localStorage.fuarbef[3].SEGUNDO_NOMBRE;
						$scope.b4_tipo_documento = $localStorage.fuarbef[3].TIPODOCUMENTO;
						$scope.b4_numero_documento = $localStorage.fuarbef[3].DOCUMENTO;
						switch($localStorage.fuarbef[3].SEXO){
							case "F":
							$scope.b4_sexo_femenino = "X";
							break;
							case "M":
							$scope.b4_sexo_masculino = "X";
							break;
						}
						$scope.b4_fecha_nacimiento = $localStorage.fuarbef[3].NACIMIENTO;
						$scope.b4_etnia = $localStorage.fuarbef[3].GRUPO_ETNICO;
						$scope.b4_parentesco = $localStorage.fuarbef[3].PARENTESCO;
						switch($localStorage.fuarbef[3].DISCAPACIDAD){
							case "F":
							$scope.b4_discapacidad_f = "X";
							break;
							case "N":
							$scope.b4_discapacidad_n = "X";
							break;
							case "M":
							$scope.b4_discapacidad_m = "X";
							break;
						}
						switch($localStorage.fuarbef[3].CONDICION){
							case "T":
							$scope.b4_condicion_t = "X";
							break;
							case "P":
							$scope.b4_condicion_p = "X";
							break;	
						}
						$scope.b4_municipio = $localStorage.fuarbef[3].NOMBRE;
						switch($localStorage.fuarbef[3].ZONA){
							case "U":
							$scope.b4_zona_u = "X";
							break;
							case "R":
							$scope.b4_zona_r = "X";
							break;
						}
						$scope.b4_departamento = $localStorage.fuarbef[3].UBICACIONGEOGRAFICA;
						$scope.b4_tel_fijo = $localStorage.fuarbef[3].TELEFONO;
						$scope.b4_tel_celular = $localStorage.fuarbef[3].CELULAR;
						$scope.b4_nombre_ips = $localStorage.fuarbef[3].NOMBREIPS;
						$scope.b4_codigo_ips = $localStorage.fuarbef[3].CODIGOHABILITACIONIPS;
					}
					if (fuarbef[4] === undefined) {
						//alert("Sin quinto beneficiaro");
					}else{
						$scope.b5_primer_apellido = $localStorage.fuarbef[4].PRIMER_APELLIDO;
						$scope.b5_segundo_apellido = $localStorage.fuarbef[4].SEGUNDO_APELLIDO;
						$scope.b5_primer_nombre = $localStorage.fuarbef[4].PRIMER_NOMBRE;
						$scope.b5_segundo_nombre = $localStorage.fuarbef[4].SEGUNDO_NOMBRE;
						$scope.b5_tipo_documento = $localStorage.fuarbef[4].TIPODOCUMENTO;
						$scope.b5_numero_documento = $localStorage.fuarbef[4].DOCUMENTO;
						switch($localStorage.fuarbef[4].SEXO){
							case "F":
							$scope.b5_sexo_femenino = "X";
							break;
							case "M":
							$scope.b5_sexo_masculino = "X";
							break;
						}
						$scope.b5_fecha_nacimiento = $localStorage.fuarbef[4].NACIMIENTO;
						$scope.b5_etnia = $localStorage.fuarbef[4].GRUPO_ETNICO;
						$scope.b5_parentesco = $localStorage.fuarbef[4].PARENTESCO;
						switch($localStorage.fuarbef[4].DISCAPACIDAD){
							case "F":
							$scope.b5_discapacidad_f = "X";
							break;
							case "N":
							$scope.b5_discapacidad_n = "X";
							break;
							case "M":
							$scope.b5_discapacidad_m = "X";
							break;
						}
						switch($localStorage.fuarbef[4].CONDICION){
							case "T":
							$scope.b5_condicion_t = "X";
							break;
							case "P":
							$scope.b5_condicion_p = "X";
							break;
						}
						$scope.b5_municipio = $localStorage.fuarbef[4].NOMBRE;
						switch($localStorage.fuarbef[4].ZONA){
							case "U":
							$scope.b5_zona_u = "X";
							break;
							case "R":
							$scope.b5_zona_r = "X";
							break;
						}
						$scope.b5_departamento = $localStorage.fuarbef[4].UBICACIONGEOGRAFICA;
						$scope.b5_tel_fijo = $localStorage.fuarbef[4].TELEFONO;
						$scope.b5_tel_celular = $localStorage.fuarbef[4].CELULAR;
						$scope.b5_nombre_ips = $localStorage.fuarbef[4].NOMBREIPS;
						$scope.b5_codigo_ips = $localStorage.fuarbef[4].CODIGOHABILITACIONIPS;

					}			
				}
			}
        }
 		
	}
]);