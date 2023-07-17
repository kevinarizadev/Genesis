'use strict';
angular.module('GenesisApp')
.controller('modalDireccionarctrl', ['$scope', '$http', 'ngDialog','mipresHTTP',
function ($scope, $http, ngDialog,mipresHTTP) {
	//console.log($scope.info);
	$(document).ready(function () {
		var dat = { prov: 'navb' }
		$.getJSON("php/obtenersession.php", dat)
		  .done(function (respuesta) {
			$scope.sesdata = respuesta;
		  })
		  .fail(function (jqXHR, textStatus, errorThrown) {
			console.log("navbar error obteniendo variables");
		  });
	  });
  
	
	// $scope.newarray = $scope.info.map(pr => {
	//     pr.prescripcion.EstPres = pr.prescripcion.EstPres === 4 ? 'Activo' : 'No Activo';
	//     const object = pr.prescripcion;
	
	//     object.serviciosComplementarios = pr.serviciosComplementarios;
	//     object.actserviciosComplementarios = pr.serviciosComplementarios.length === 0 ? true : false;
	//     return object
	// })
	$scope.respuestas_api = [];
	$scope.dir = {
		NoPrescripcion: '',
		TipoIDPaciente: '',
		NoIDPaciente: '',
		TipoTec: '',
		ConTec: '',
		NoEntrega: '',
		NoSubEntrega: '',
		TipoIDProv: '',
		NoIDProv: '',
		CodMunEnt: '',
		FecMaxEnt: '',
		CantTotAEntregar: '',
		DirPaciente: '',
		CodSerTecAEntregar: '',
		CantTotAEntregar: ''
	}
	
	$scope.dir.NoPrescripcion = ($scope.hide_direccionar!=true)?$scope.info.NoPrescripcion:$scope.info.NoTutela;
	$scope.dir.TipoIDPaciente = $scope.info.TipoIDPaciente;
	$scope.dir.NoIDPaciente = $scope.info.NroIDPaciente;
	$scope.dir.TipoTec = $scope.info.tipo_tec;
	$scope.dir.ConTec = $scope.actual + 1;
	
	$scope.get_datos = function () {
		$http({
			method: 'POST',
			url: "php/recobro/mipres.php",
			data: {
				function: 'get_datos',
				'v_tipoidpaciente': $scope.info.TipoIDPaciente,
				'v_nroidpaciente': $scope.info.NroIDPaciente
			}
		}).then(function (r) {
			$scope.dir.DirPaciente = r.data[0].DIRECCION;
			$scope.num =  r.data[0].CELULAR;
		});
	}
	
	$scope.direccionamientos_posibles = function () {
		$scope.Sum_CantTotAEntregar = 0;
		$http({
			method: 'POST',
			url: "php/recobro/mipres.php",
			data: {
				function: 'get_direccionamientos_posibles',
				'NoPrescripcion':$scope.info.NoPrescripcion,
				'v_tipo_tec': $scope.info.tipo_tec ,
				'con_tec':$scope.actual + 1
			}
		}).then(function (r) {
			 $scope.direccionamiento_automatico = r.data;
			 r.data.forEach(e => {
				 
					 $scope.Sum_CantTotAEntregar =+ parseInt(e.CantTotAEntregar);
				 
			 });
			 console.log($scope.Sum_CantTotAEntregar);
		});
	}
	$scope.direccionamientos_posibles();
	$scope.get_datos();


	$scope.direccionar_automaticamente = function(){	
		$scope.insertar_bd_dir_aut($scope.direccionamiento_automatico,'A');			
	}

	$scope.insertar_bd_dir_aut = function (arreglo,tipo){
		$http({
			method: 'POST',
			url: "php/recobro/mipres.php",
			// url :"json/recobro/direccionamientos.json",
			data: {
			  function: 'insertar_dir',
			  'v_responsable': $scope.sesdata.cedula,
			  'v_pjson_row_adj': arreglo,
			  'v_estado': 'I',
			  'v_len':arreglo.length
			}
		  }).then(function (r) {
			swal(r.Titulo,r.Mensaje, 'warning')

			if (r.data.Codigo == 1 ) {
				if (tipo == 'A') {
					for (let i = 0; i < $scope.direccionamiento_automatico.length; i++) {
					$scope.direccionar($scope.direccionamiento_automatico[i]);				 
				}
				swal.close();
				} else {
					if (tipo == 'T') {
						console.log(arreglo);
						swal(r.Titulo,r.Mensaje, 'warning')
					}
				}
				
			} else {
				swal(r.data.Titulo, r.data.Mensaje, 'error')
			}
			
		  })
	}

	$scope.direccionar = function (dir) {
		swal({
			title: 'Espere un momento',
			text: 'Direccionando prescripción',
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false,
			onOpen: () => {
				swal.showLoading()
			}
		});
		
		mipresHTTP.putdireccionamiento($scope.reg,dir).then(function (respuesta) {                  
			$scope.api_response = respuesta;
			$scope.respuestas_api.push($scope.api_response);
			
			if (typeof $scope.api_response.length !== 'undefined' && $scope.api_response.length > 0) {
				$scope.procesar_direccionamiento(dir,$scope.api_response);//	console.log('P');
			} else {
				$scope.archivar_direccionamiento(dir,$scope.api_response);//console.log('R');
			}

		})  
	}

$scope.direccionar_tutela = function () {
			swal({
			title: 'Espere un momento',
			text: 'Direccionando prescripción',
		//	allowOutsideClick: false,
		//	allowEscapeKey: false,
		//	allowEnterKey: false,
			onOpen: () => {
				swal.showLoading()
			}
		});
		
		
		$scope.dir.FecMaxEnt = formatDate(document.getElementById("fec_ent").valueAsDate);
		
		mipresHTTP.putdireccionamiento($scope.reg,$scope.dir).then(function (respuesta) { 
			$scope.insertar_bd_dir_aut($scope.dir,'T');			                 
			$scope.api_response = respuesta;
			if (typeof respuesta.length !== 'undefined' && respuesta.length > 0) {
				swal.close();				
				$scope.procesar_direccionamiento($scope.dir,$scope.api_response);//	console.log('P');
				swal('Exito',respuesta.Message, 'success')
				$scope.envia_sms();
			} else {
				swal.close();
				$scope.archivar_direccionamiento($scope.dir,$scope.api_response);//console.log('R');
				swal('Error',respuesta.Message, 'error')
			}                   
		})  
	}
		
	/*    if (typeof item.respuesta.length !== 'undefined' && item.respuesta.length > 0) {
                      newItem.success = true;
                      $scope.procesar_direccionamiento(item);
                      return newItem;
                      // newItem.error = typeof item.respuesta.ModelState !== 'undefined';
                    } else {
                      $scope.archivar_direccionamiento(item); 
                      newItem.success = false;
                      newItem.modal = typeof item.respuesta.Errors !== 'undefined' && item.respuesta.Errors.length > 0;
                      newItem.error = typeof item.respuesta.ModelState !== 'undefined';
                      return newItem;
                    }
                  })
                  $scope.envia_correo();*/

 
	
	$scope.procesar_direccionamiento = function (data,respuestas) {
	$http({
	method: 'POST',
	url: "php/recobro/mipres.php",
	data: {
	function: 'procesa_dir',
	'v_responsable': $scope.sesdata.cedula,
	'v_no_pres':data.NoPrescripcion,
	'v_no_entrega':data.NoEntrega,
	'v_tipotec':data.TipoTec,
	'v_iddireccionamiento':respuestas[0].IdDireccionamiento,
	'v_id':respuestas[0].Id	
	}
	}).then(function (r) {        
	//	  $scope.envia_sms(r.data.Celular);
	});
	}  
	$scope.archivar_direccionamiento = function (data,respuestas) {
	$http({
	method: 'POST',
	url: "php/recobro/mipres.php",
	data: {
	function: 'RECHAZA_DIR',
	'v_responsable': $scope.sesdata.cedula,
	'v_no_pres':data.NoPrescripcion,
	'v_no_entrega':data.NoEntrega,
	'v_tipotec': data.TipoTec,
	'v_error': respuestas.Errors[0]
	}
	}).then(function (r) {

	});
	}  
	$scope.envia_sms = function(){
$http({
	method: 'POST',
	url: "php/recobro/mipres.php",
	data: {
	function: 'obtener_nombre_prestador',
	'nopres': $scope.dir.NoPrescripcion,
	'contec':$scope.dir.ConTec,
	'tipotec':$scope.dir.TipoTec
	}
	}).then(function (r) {
		if (r.data != '99') {			
			$http({
			method: 'POST',
			url: "https://api.infobip.com/sms/1/text/single",
			headers: {
				'Content-Type': 'application/json',
				'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
				'accept': 'application/json'
			},
			data: {
				"from": "Cajacopi EPS",
				"to": "57" + $scope.num,
				//"to": "573022425328" ,
				"text": "Cajacopi Eps le informa que su prescripcion fue direccionada exitosamente al prestador: "+r.data +"."          
			}
		}).then(function (response) {
		//	console.log(response);
		})
		} else {}
	});

	
	}
	
	function formatDate(date) {
		var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();
		
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		
		return [year, month, day].join('-');
	}
}]);