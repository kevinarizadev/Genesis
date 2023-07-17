'use strict';
angular.module('GenesisApp')
 .controller('observacionescontroller',['$scope','ausentismoHttp','notification','$location', '$rootScope','$timeout','communication','$localStorage',
  function($scope,ausentismoHttp,notification,$location,$rootScope,$timeout,communication,$localStorage) {
    var self=this;
    $scope.textobs = false;
    $scope.validabtn = false;
    $scope.validaButtonGuardar = "Guardar";
    // $scope.texto = communication.texto;
    $scope.cita = communication.Jefe;
    function loadingButton(type) {
      switch (type) {
        case "guarda":
        $scope.enable = "false";
        var $icon = $(this).find(".icon-arrows-cw"),
        animateClass = "icon-refresh-animate";
        $icon.addClass(animateClass);
        $scope.validaButtonGuardar = "Guardando...";
        $timeout(function () {
          $scope.enable = "true";
          $scope.validaButtonGuardar = " ";
        }, 2000);
        break;
        default:
      }
    }
     $rootScope.$on('ngDialog.opened', function (e, $dialog) {
       $(".ngdialog-content").css({"padding-left":"0px","padding-bottom":"0px","padding-right":"0px","padding-top":"0px"});
     });
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
       ausentismoHttp.observacionespermisos(communication.Radicado,communication.Ubicacion).then(function (response) {
         var a = response; //JSON.parse('['+response["0"].Observaciones+']')
         if(a==null){
           notification.getNotification('warning', 'No hay Observaciones', 'Notificacion');
         }else{
           notification.getNotification('success', 'Observaciones', 'Notificacion');
           $scope.Observaciones = a;
         }

       }, function (err) {
         notification.getNotification('error', err, 'Notificacion');
       });
     }
     $scope.editObservacion = function (){
       $scope.textobs = false;
       $("#observacion").css({"background-color":"white","color":"black","cursor":"text","border-color":"rgb(166, 200, 255)"});
       $("#observacion").focus();
       $scope.validabtn = false;
     }
     $scope.ProcesarObservacion = function (){
       if($scope.observacion == "" || $scope.observacion == undefined){

       }else{
         loadingButton("guarda");
         communication.observacion = $scope.observacion;
          $scope.textobs = true;
          $("#observacion").css({"background-color":"#dfdfdf","color":"#ccc","cursor":"not-allowed","border-color":"rgba(204, 204, 204, 0)"});
          $scope.validabtn = true;
		  notification.getNotification('success', "Nota Registrada!", 'Notificacion');
       }
     }
  }]);
