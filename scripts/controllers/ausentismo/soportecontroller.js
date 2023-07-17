'use strict';
angular.module('GenesisApp')
 .controller('soportecontroller',['$scope','ausentismoHttp','notification','$location', '$rootScope','$timeout','communication','$localStorage','$http',
  function($scope,ausentismoHttp,notification,$location,$rootScope,$timeout,communication,$localStorage,$http) {
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
        $rootScope.$on('ngDialog.opened', function (e, $dialog) {
          $(".ngdialog-content").css({"padding-left":"0px","padding-bottom":"0px","padding-right":"0px","padding-top":"0px"});
        });
     });

     function initialize(){
       ausentismoHttp.anexospermisos(communication.Radicado,communication.Ubicacion,communication.Ruta).then(function (response) {
        console.log(communication.Ruta);
         var a = response; //JSON.parse('['+response["0"].Anexos+']')
         if(a == null){
           notification.getNotification('warning', 'No hay anexos', 'Notificacion');
         }else{
           $scope.Soportes = a;
         }

       }, function (err) {
         notification.getNotification('error', err, 'Notificacion');
       });
     }
     $scope.descargafile = function(){
       $http({
                    method: 'POST',
                    url: "php/ausentismo/veranexo.php",
                    data: {
                        function: 'descargaAdjunto',
                        ruta: communication.Ruta
                    }
                }).then(function(response) {
                    //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
                    window.open('temp/' + response.data);
                });
    }
  }]);
