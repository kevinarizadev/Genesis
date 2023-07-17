'use strict';
	angular.module('GenesisApp')
	.controller('modalformatoscontroller',['$http','$scope','ngDialog','consultaHTTP','afiliacionHttp','notification','cfpLoadingBar','$window',
	function($http,$scope,ngDialog,consultaHTTP,afiliacionHttp,notification,cfpLoadingBar,$window) {
		$scope.portabilidad = $scope.cert_port;
		$scope.panelafiliado = true;
		$scope.panelfuncionario = true;
		if ($scope.regimen == "CONTRIBUTIVO") {
			$scope.opcione = {afiliacion: true}
		}else{
			$scope.opcione = {afiliacion: false}
		}
		$scope.cert_hist > 0 ? $scope.historicoafiliaciones = true : $scope.historicoafiliaciones = false;
		$scope.cert_bencont > 0 ? $scope.certbencont = true : $scope.certbencont = false;
  		$http({
         method:'GET',
         url:"php/obtenersession.php",
      }).then(function(resp){
         $scope.sesdata.rolcod = resp.data.rolcod;
         if ($scope.sesdata.rolcod != -1) {
		 		$scope.panelafiliado = false;
		 		$scope.panelfuncionario = true;
		 	}else{
		 		$scope.panelfuncionario = false;
		 		$scope.panelafiliado = true;
		 	}
      });
		$scope.generaCarne = function(){
			if ($scope.regimen == 'SUBSIDIADO') {
				$window.open('views/consultaafiliados/soportes/carnet.php?tipo='+$scope.tipo_documento+
							'&id='+$scope.documento+'&carn='+$scope.carne,'_blank', "width=1080,height=1100");
			}else if ($scope.regimen == 'CONTRIBUTIVO'){
				$window.open('views/consultaafiliados/soportes/carnet_c.php?tipo='+$scope.tipo_documento+'&id='+$scope.documento+'&carn=false','_blank', "width=1080,height=1100");
			}			
		}
		$scope.generaActaCarne = function(){
			let fecha = new Date('01/06/2019');
			let parts = $scope.fecha_afiliacion.split('-');
			let fecha_afiliacion = new Date(parts[1] + '-' + parts[0] + '-' + parts[2]);
			if (fecha_afiliacion >= fecha) {
				// $scope.lblMes = "Junio";
				$window.open('views/consultaafiliados/soportes/acta.php?tipo=' + $scope.tipo_documento + '&id=' + $scope.documento, '_blank', "width=1080,height=1100");
			} else {
				// $scope.lblMes = "Mayo";
				$window.open('views/consultaafiliados/soportes/acta_antigua.php?tipo=' + $scope.tipo_documento + '&id=' + $scope.documento,'_blank', "width=1080,height=1100");
				// $window.open('views/consultaafiliados/soportes/acta_antiguo.php?tipo=' + $scope.tipo_documento + '&id=' + $scope.documento, '_blank', "width=1080,height=1100");
			}
			// $window.open('views/consultaafiliados/soportes/acta.php?tipo='+$scope.tipo_documento+'&id='+$scope.documento,'_blank', "width=1080,height=1100");
		}
		$scope.generaFuar = function(){
			var fecha = new Date('01/05/2016');
			var parts = $scope.fecha_afiliacion.split('-');
			var fecha_afiliacion =  new Date(parts[1]+'-'+parts[0]+'-'+parts[2]);
			if (fecha_afiliacion > fecha) {
				$window.open('views/consultaafiliados/soportes/fuar.php?tipo='+$scope.tipo_documento	+'&id='+$scope.documento,'_blank', "width=1080,height=1100");
			}else{
				$window.open('views/consultaafiliados/soportes/fuar_an.php?tipo='+$scope.tipo_documento	+'&id='+$scope.documento+'&user='+$scope.sesdata.nombre,
								 '_blank', 
								 "width=1080,height=1100");
			}
		}
		$scope.generaCertAfiliacion = function(){
			$window.open('views/consultaafiliados/soportes/cert_afiliacion.php?tipo='+$scope.tipo_documento	+'&id='+$scope.documento,'_blank', "width=1080,height=1100");
		}
		$scope.generaHistorialAfiliacion = function(){
			ngDialog.open({
            template: 'views/consultaAfiliados/modalcertificadoafiliacion.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalcertafiliacioncontroller',
            scope: $scope
         });
		}
		$scope.generaEncuestaSat = function(){
			$http({
	         method:'GET',
	         url:"php/consultaafiliados/soportes/obtenerencsatisfaccion.php",
	         params: {type: $scope.tipo_documento,
	                  id: $scope.documento
	                  }
	      }).then(function(data){
	         if (data.data == "0") {
	         	notification.getNotification('info','Este usuario no registra encuesta en el periodo actual','Notificacion');
	         }else{
	         	$window.open('views/consultaafiliados/soportes/encuesta_satisfaccion.php?tipo='+$scope.tipo_documento+'&id='+$scope.documento,'_blank', "width=1080,height=1100");
	         }
	      })
		}
		$scope.generaPortabilidad = function(){
			$window.open('views/consultaafiliados/soportes/cert_portabilidad.php?tipo='+$scope.tipo_documento+'&id='+$scope.documento,'_blank', "width=1080,height=1100");
		}
		$scope.generaCertBenCont = function(){
			$window.open('views/consultaafiliados/soportes/cert_movilidad_beneficiario.php?tipo='+$scope.tipo_documento+'&id='+$scope.documento,'_blank', "width=1080,height=1100");	
		}


		$scope.CambioIpsFormato = function () {
			$window.open('views/consultaafiliados/soportes/cambioips.php?tipo='+$scope.tipo_documento+'&id='+$scope.documento,'_blank', "width=1080,height=1100");
		}

		$scope.FormatoPortabilidad = function () {
			$window.open('views/consultaafiliados/soportes/formato_portabilidad.php?tipo='+$scope.tipo_documento+'&id='+$scope.documento,'_blank', "width=1080,height=1100");
		}



   
   }]); 