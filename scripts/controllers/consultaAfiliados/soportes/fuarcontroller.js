'use strict';
	angular.module('GenesisApp',[])
	.config(function($locationProvider) {
     	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
		});
    })
 	.controller('fuarcontroller',['$scope','$http','$location','$timeout',
 	function($scope,$http,$location,$timeout) {
 		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){
		    dd='0'+dd;
		} 
		if(mm<10){
		    mm='0'+mm;
		} 
		$scope.hoy = dd+'/'+mm+'/'+yyyy;
		$http({
         method:'GET',
         url:"../../../php/consultaafiliados/soportes/obtenerfuar.php",
         params: {type: $location.search().tipo,
                  id: $location.search().id
                  }
      }).then(function(data){
         	//console.log(data);
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; 
				var yyyy = today.getFullYear();
				dd<10?dd='0'+dd:dd=dd
				mm<10?mm='0'+mm:mm=mm 
				$scope.zona_urbana = "";
				$scope.zona_rural = "";
				$scope.sexo_femenino = "";
				$scope.sexo_masculino = "";

				// Llenamos la informacion del cabeza de familia

				if (data.data[0].ZONA == "R"){
					$scope.zona_rural = "X";
				}else if(data.data[0].ZONA == "U"){
					$scope.zona_urbana = "X"
				}
				if (data.data[0].SEXO == "F"){
					$scope.sexo_femenino = "X";
				}else if(data.data[0].SEXO == "M"){
					$scope.sexo_masculino = "X"
				}
				if (data.data[0].TIPO == "F"){
					$scope.cabeza = "X";
				}else if(data.data[0].TIPO == "O"){
					$scope.beneficiario = "X"
				}
				//$scope.fecha_radicado = dd+'/'+mm+'/'+yyyy;
				$scope.radicado = data.data[0].RADICADO;
				$scope.discapacidad = data.data[0].DISCAPACIDAD;
				$scope.condicion = data.data[0].CONDICION;
				$scope.primer_apellido = data.data[0].PRIMER_APELLIDO;
				$scope.segundo_apellido = data.data[0].SEGUNDO_APELLIDO;
				$scope.primer_nombre = data.data[0].PRIMER_NOMBRE;
				$scope.segundo_nombre = data.data[0].SEGUNDO_NOMBRE;
				$scope.numero_documento = data.data[0].DOCUMENTO;
				$scope.sexo = data.data[0].SEXO;
				$scope.tipo_documento = data.data[0].TIPODOCUMENTO;
				$scope.fecha_nacimiento = data.data[0].NACIMIENTO;
				$scope.etnia = data.data[0].GRUPO_ETNICO;
				$scope.sisben = data.data[0].NIVEL_SISBEN;
				$scope.g_poblacional = data.data[0].GRUPOPOBLACIONAL;
				$scope.direccion = data.data[0].DIRECCION;
				$scope.tel_fijo = data.data[0].TELEFONO;
				$scope.tel_celular = data.data[0].CELULAR;
				$scope.email = data.data[0].CORREO;
				$scope.municipio = data.data[0].NOMBRE;
				$scope.departamento = data.data[0].UBICACIONGEOGRAFICA;
				$scope.localidad = data.data[0].LOCALIDAD;
				$scope.c_nombre_ips = data.data[0].NOMBREIPS;
				$scope.c_codigo_ips = data.data[0].CODIGOHABILITACIONIPS;  
			for (var i = 0; i <= data.data.length-1; i++) { 
				if (data.data[i].DOCUMENTO == $location.search().id) {
					$scope.fecha_radicado = data.data[i].FECHAAFILIACION;
				}  
			}
			
			for (var i = 1; i < data.data.length; i++) { 
				if (data.data[i].DOCUMENTO == $location.search().id) {
					$scope.fecha_radicado = data.data[i].FECHAAFILIACION;
				}
				if (data.data[i].PARENTESCO == "CONYUGUE") {
					$scope.con_primerapellido = data.data[i].PRIMER_APELLIDO;
					$scope.con_segundoapellido = data.data[i].SEGUNDO_APELLIDO;
					$scope.con_primernombre = data.data[i].PRIMER_NOMBRE;
					$scope.con_segundonombre = data.data[i].SEGUNDO_NOMBRE;
					$scope.con_tipodocumento = data.data[i].TIPODOCUMENTO;
					$scope.com_numerodocumento = data.data[i].DOCUMENTO;
					switch(data.data[i].SEXO){
						case "F":
						$scope.check_con_sexof = "X";
						break;
						case "M":
						$scope.check_con_sexom = "X";
						break;
					}
					$scope.con_fecha_nacimiento = data.data[i].NACIMIENTO;
				}
				// if ($location.search().add == "BEN" && data.data[i].FECHAAFILIACION == $scope.hoy) {
	   //    		$scope.b1_primer_apellido = data.data[0].PRIMER_APELLIDO;
				// 	$scope.b1_segundo_apellido = data.data[0].SEGUNDO_APELLIDO;
				// 	$scope.b1_primer_nombre = data.data[0].PRIMER_NOMBRE;
				// 	$scope.b1_segundo_nombre = data.data[0].SEGUNDO_NOMBRE;
				// 	$scope.b1_tipo_documento = data.data[0].TIPODOCUMENTO;
				// 	$scope.b1_numero_documento = data.data[0].DOCUMENTO;
				// 	return;
	   //    	}
			}
			if (data.data[1] === undefined) {
				//alert("Sin segundo beneficiaro");
			}else{
				$scope.b1_primer_apellido = data.data[1].PRIMER_APELLIDO;
				$scope.b1_segundo_apellido = data.data[1].SEGUNDO_APELLIDO;
				$scope.b1_primer_nombre = data.data[1].PRIMER_NOMBRE;
				$scope.b1_segundo_nombre = data.data[1].SEGUNDO_NOMBRE;
				$scope.b1_tipo_documento = data.data[1].TIPODOCUMENTO;
				$scope.b1_numero_documento = data.data[1].DOCUMENTO;
				switch(data.data[1].SEXO){
					case "F":
					$scope.b1_sexo_femenino = "X";
					break;
					case "M":
					$scope.b1_sexo_masculino = "X";
					break;
				}
				$scope.b1_fecha_nacimiento = data.data[1].NACIMIENTO;
				$scope.b1_etnia = data.data[1].GRUPO_ETNICO;
				$scope.b1_parentesco = data.data[1].PARENTESCO;
				switch(data.data[1].DISCAPACIDAD){
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
				switch(data.data[1].CONDICION){
					case "T":
					$scope.b1_condicion_t = "X";
					break;
					case "P":
					$scope.b1_condicion_p = "X";
					break;
				}
				$scope.b1_municipio = data.data[1].NOMBRE;
				switch(data.data[1].ZONA){
					case "U":
					$scope.b1_zona_u = "X";
					break;
					case "R":
					$scope.b1_zona_r = "X";
					break;
				}
				$scope.b1_departamento = data.data[1].UBICACIONGEOGRAFICA;
				$scope.b1_tel_fijo = data.data[1].TELEFONO;
				$scope.b1_tel_celular = data.data[1].CELULAR;
				$scope.b1_nombre_ips = data.data[1].NOMBREIPS;
				$scope.b1_codigo_ips = data.data[1].CODIGOHABILITACIONIPS;
				$scope.check_ben_adic = 'X'
			}
			
			
			if (data.data[2] === undefined) {
				//alert("Sin segundo beneficiaro");
			}else{
				$scope.b2_primer_apellido = data.data[2].PRIMER_APELLIDO;
				$scope.b2_segundo_apellido = data.data[2].SEGUNDO_APELLIDO;
				$scope.b2_primer_nombre = data.data[2].PRIMER_NOMBRE;
				$scope.b2_segundo_nombre = data.data[2].SEGUNDO_NOMBRE;
				$scope.b2_tipo_documento = data.data[2].TIPODOCUMENTO;
				$scope.b2_numero_documento = data.data[2].DOCUMENTO;
				switch(data.data[2].SEXO){
					case "F":
					$scope.b2_sexo_femenino = "X";
					break;
					case "M":
					$scope.b2_sexo_masculino = "X";
					break;
				}
				$scope.b2_fecha_nacimiento = data.data[2].NACIMIENTO;
				$scope.b2_etnia = data.data[2].GRUPO_ETNICO;
				$scope.b2_parentesco = data.data[2].PARENTESCO
				switch(data.data[2].DISCAPACIDAD){
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
				switch(data.data[2].CONDICION){
					case "T":
					$scope.b2_condicion_t = "X";
					break;
					case "P":
					$scope.b2_condicion_p = "X";
					break;
				}
				$scope.b2_municipio = data.data[2].NOMBRE;
				switch(data.data[2].ZONA){
					case "U":
					$scope.b2_zona_u = "X";
					break;
					case "R":
					$scope.b2_zona_r = "X";
					break;
				}
				$scope.b2_departamento = data.data[2].UBICACIONGEOGRAFICA;
				$scope.b2_tel_fijo = data.data[2].TELEFONO;
				$scope.b2_tel_celular = data.data[2].CELULAR;
				$scope.b2_nombre_ips = data.data[2].NOMBREIPS;
				$scope.b2_codigo_ips = data.data[2].CODIGOHABILITACIONIPS;
			}
			if (data.data[3] === undefined) {
				//alert("Sin tercer beneficiaro");
			}else{
				$scope.b3_primer_apellido = data.data[3].PRIMER_APELLIDO;
				$scope.b3_segundo_apellido = data.data[3].SEGUNDO_APELLIDO;
				$scope.b3_primer_nombre = data.data[3].PRIMER_NOMBRE;
				$scope.b3_segundo_nombre = data.data[3].SEGUNDO_NOMBRE;
				$scope.b3_tipo_documento = data.data[3].TIPODOCUMENTO;
				$scope.b3_numero_documento = data.data[3].DOCUMENTO;
				switch(data.data[3].SEXO){
					case "F":
					$scope.b3_sexo_femenino = "X";
					break;
					case "M":
					$scope.b3_sexo_masculino = "X";
					break;
				}
				$scope.b3_fecha_nacimiento = data.data[3].NACIMIENTO;
				$scope.b3_etnia = data.data[3].GRUPO_ETNICO;
				$scope.b3_parentesco = data.data[3].PARENTESCO;
				switch(data.data[3].DISCAPACIDAD){
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
				switch(data.data[3].CONDICION){
					case "T":
					$scope.b3_condicion_t = "X";
					break;
					case "P":
					$scope.b3_condicion_p = "X";
					break;
				}
				$scope.b3_municipio = data.data[3].NOMBRE;
				switch(data.data[3].ZONA){
					case "U":
					$scope.b3_zona_u = "X";
					break;
					case "R":
					$scope.b3_zona_r = "X";
					break;
				}
				$scope.b3_departamento = data.data[3].UBICACIONGEOGRAFICA;
				$scope.b3_tel_fijo = data.data[3].TELEFONO;
				$scope.b3_tel_celular = data.data[3].CELULAR;
				$scope.b3_nombre_ips = data.data[3].NOMBREIPS;
				$scope.b3_codigo_ips = data.data[3].CODIGOHABILITACIONIPS;

			}
			if (data.data[4] === undefined) {	
				//alert("Sin cuarto beneficiaro");
			}else{
				$scope.b4_primer_apellido = data.data[4].PRIMER_APELLIDO;
				$scope.b4_segundo_apellido = data.data[4].SEGUNDO_APELLIDO;
				$scope.b4_primer_nombre = data.data[4].PRIMER_NOMBRE;
				$scope.b4_segundo_nombre = data.data[4].SEGUNDO_NOMBRE;
				$scope.b4_tipo_documento = data.data[4].TIPODOCUMENTO;
				$scope.b4_numero_documento = data.data[4].DOCUMENTO;
				switch(data.data[4].SEXO){
					case "F":
					$scope.b4_sexo_femenino = "X";
					break;
					case "M":
					$scope.b4_sexo_masculino = "X";
					break;
				}
				$scope.b4_fecha_nacimiento = data.data[4].NACIMIENTO;
				$scope.b4_etnia = data.data[4].GRUPO_ETNICO;
				$scope.b4_parentesco = data.data[4].PARENTESCO;
				switch(data.data[4].DISCAPACIDAD){
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
				switch(data.data[4].CONDICION){
					case "T":
					$scope.b4_condicion_t = "X";
					break;
					case "P":
					$scope.b4_condicion_p = "X";
					break;	
				}
				$scope.b4_municipio = data.data[4].NOMBRE;
				switch(data.data[4].ZONA){
					case "U":
					$scope.b4_zona_u = "X";
					break;
					case "R":
					$scope.b4_zona_r = "X";
					break;
				}
				$scope.b4_departamento = data.data[4].UBICACIONGEOGRAFICA;
				$scope.b4_tel_fijo = data.data[4].TELEFONO;
				$scope.b4_tel_celular = data.data[4].CELULAR;
				$scope.b4_nombre_ips = data.data[4].NOMBREIPS;
				$scope.b4_codigo_ips = data.data[4].CODIGOHABILITACIONIPS;
			}
			if (data.data[5] === undefined) {
				//alert("Sin quinto beneficiaro");
			}else{
				$scope.b5_primer_apellido = data.data[5].PRIMER_APELLIDO;
				$scope.b5_segundo_apellido = data.data[5].SEGUNDO_APELLIDO;
				$scope.b5_primer_nombre = data.data[5].PRIMER_NOMBRE;
				$scope.b5_segundo_nombre = data.data[5].SEGUNDO_NOMBRE;
				$scope.b5_tipo_documento = data.data[5].TIPODOCUMENTO;
				$scope.b5_numero_documento = data.data[5].DOCUMENTO;
				switch(data.data[5].SEXO){
					case "F":
					$scope.b5_sexo_femenino = "X";
					break;
					case "M":
					$scope.b5_sexo_masculino = "X";
					break;
				}
				$scope.b5_fecha_nacimiento = data.data[5].NACIMIENTO;
				$scope.b5_etnia = data.data[5].GRUPO_ETNICO;
				$scope.b5_parentesco = data.data[5].PARENTESCO;
				switch(data.data[5].DISCAPACIDAD){
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
				switch(data.data[5].CONDICION){
					case "T":
					$scope.b5_condicion_t = "X";
					break;
					case "P":
					$scope.b5_condicion_p = "X";
					break;
				}
				$scope.b5_municipio = data.data[5].NOMBRE;
				switch(data.data[5].ZONA){
					case "U":
					$scope.b5_zona_u = "X";
					break;
					case "R":
					$scope.b5_zona_r = "X";
					break;
				}
				$scope.b5_departamento = data.data[5].UBICACIONGEOGRAFICA;
				$scope.b5_tel_fijo = data.data[5].TELEFONO;
				$scope.b5_tel_celular = data.data[5].CELULAR;
				$scope.b5_nombre_ips = data.data[5].NOMBREIPS;
				$scope.b5_codigo_ips = data.data[5].CODIGOHABILITACIONIPS;

			}
		})
 		$scope.origen = $location.search().ori;
 		if ($scope.origen == "N") {
 			$scope.check_novedad = 'X';
 			$http({
	         method:'GET',
	         url:"../../../php/consultaafiliados/soportes/obtenerfuarnov.php",
	         params: {type: $location.search().tipo,
	                  id: $location.search().id
	                  }
	      }).then(function(res){
         	$scope.novedades = data.data;
         	for (var i = 0; i <= $scope.novedades.length - 1; i++) {
         		switch($scope.novedades[i].CONCEPTO) {
				   	case "N17":
				      	$scope.nov_2 = 'X';
				      break;
				    	case "N02":
				      	$scope.nov_2 = 'X';
				      	break;
				      case "N03":
				      	$scope.nov_2 = 'X';
				      	break;
				      case "N01":
				      	$scope.nov_3 = 'X';
				      	break;
				      case "N24":
				      	$scope.nov_4 = 'X';
				      	break;
				      case "N20":
				      	$scope.nov_4 = 'X';
				      	break;
				      case "N04":
				      	$scope.nov_4 = 'X';
				      	break;
				      case "RAS":
				      	$scope.nov_6 = 'X';
				      	break;
				      case "N21":
				      	$scope.nov_4 = 'X';
				      	break;
				      	case "N31":
						$scope.nov_4 = 'X';
				      	break;
				      	
				      case "RDC":
				      	$scope.nov_5 = 'X';
				      	$scope.cod_405 = '03';
				      	break;
				      case "RFM":
				      	$scope.nov_5 = 'X';
				      	$scope.cod_405 = '03';
				      	break;
				      case "N09":
				      	$scope.nov_15 = 'X';
				      	break;
					}
         	}
	      })
 		}else{
 			$scope.check_afiliacion = "X" ;
 			$http({
	         method:'GET',
	         url:"../../../php/consultaafiliados/soportes/obtenerfuarnov.php",
	         params: {type: $location.search().tipo,
	                  id: $location.search().id
	                  }
	      }).then(function(res){
         	$scope.novedades = data.data;
         	for (var i = 0; i <= $scope.novedades.length - 1; i++) {
         		if ($scope.novedades[i].CONCEPTO == "TRA") {
         			$scope.nov_14 = 'X';
         		}
         	}
	      })
 		}
	}
]);