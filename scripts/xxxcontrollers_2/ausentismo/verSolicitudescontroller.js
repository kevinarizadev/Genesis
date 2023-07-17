'use strict';
angular.module('GenesisApp')
 .controller('verSolicitudescontroller',['$scope','ausentismoHttp','notification','$location', '$rootScope','$timeout','communication','$localStorage',
  function($scope,ausentismoHttp,notification,$location,$rootScope,$timeout,communication,$localStorage) {
    var self=this;
     $(document).ready(function() {
		 var dat = {prov : 'navb'}
			$.getJSON( "php/obtenersession.php", dat)
			.done(function(respuesta) {
			  $scope.sesdata = respuesta;
			  $scope.cedula = $scope.sesdata.cedula;
			   $scope.nomusu = $scope.sesdata.usu;
			  $scope.pasusu = $scope.sesdata.acc;
			  communication.cedula = $scope.sesdata.cedula;
			  $scope.ubicacion = $scope.sesdata.codmunicipio;
			  communication.cedula = $scope.cedula;
			})
			.fail(function( jqXHR, textStatus, errorThrown ) {
			  console.log("navbar error obteniendo variables");
			});
        initialize();
     });
     function initialize(){
            ausentismoHttp.obtenerHistorico($scope.cedula).then(function (response) {
            notification.getNotification('info','Cargando Historico...','Notificacion');
             $scope.Historico = response;//JSON.parse('['+response["0"].Codigo+']');
            //$scope.Historico = histo;
        })
     }
  }]);
