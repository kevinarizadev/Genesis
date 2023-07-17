'use strict';
   angular.module('GenesisApp')
   .controller('encuestacontroller',['$scope','consultaHTTP','notification','$timeout','$rootScope','$http','$window',
   function($scope,consultaHTTP,notification,$timeout,$rootScope,$http,$window) {
      $scope.panelencuesta = true;
      $scope.apto = true;
      $scope.type = "SELECCIONAR";
      $scope.recomendaria = "S";
      $scope.generaEncuesta = function(){
         $scope.panelencuesta = false;
         $http({
            method:'GET',
            url:"php/consultaafiliados/cargarencuesta.php"
         }).then(function(res){
            $scope.question = res.data;
         })
      }
      $scope.obtenerDocumento = function () {
         consultaHTTP.obtenerDocumento().then(function (response) {
            $scope.Documentos = response;
         })
      }
      $scope.solobusqueda = function(){
         $scope.panelencuesta = true;
      }
      $scope.busquedaAfiliado = function(){
         if ($scope.type == "SELECCIONAR") {
            notification.getNotification('info','Seleccione tipo de documento','Notificacion');
         }else if ($scope.id === undefined || $scope.id == "") {
            notification.getNotification('error','Ingrese número de identificación','Notificacion');
         }else{
            consultaHTTP.verificaUsuario($scope.type,$scope.id).then(function(response){
               if (response == "0") {
                  notification.getNotification('error','No se encontro información','Notificacion');
                  return;
               }else{
                  $scope.afildata = response;
                  if ($scope.afildata['0'].ESTADO != "ACTIVO") {
                     notification.getNotification('info','Afiliado debe estar activo','Notificacion');
                     $scope.apto = true;
                  }else if ($scope.afildata['0'].EDAD < 15) {
                     notification.getNotification('info','El afiliado debe ser mayor a 15 Años','Notificacion');
                     $scope.apto = true;
                  }else if ($scope.afildata['0'].ENCUESTA != "") {
                     notification.getNotification('info','El afiliado ya realizó encuesta en el periodo actual','Notificacion');
                     $scope.apto = true;
                  }else{
                     $scope.apto = false;
                     $scope.afil = {tipo:$scope.type,numero:$scope.id}
                  }
               }
            })
         }
      }
      $scope.enviarEncuesta = function(){
         // Recorremos el formulario validando que todas las preguntas tengan seleccion de respuesta

         var frm = document.getElementById("encuesta");
         var cant = 0;
         for (var i = 1 ; i <= frm.length - 1; i++) {
            var e = document.getElementById("respuesta"+i).value;
            if (e == "S") {cant=cant +1}
         }
         if (cant > 0) {notification.getNotification('error','Porfavor complete la encuesta','Notificacion');}
         else{
            for (var i = 1 ; i <= frm.length - 1; i++) {
               var e = document.getElementById("respuesta"+i).value;
               consultaHTTP.enviaEncuesta($scope.afil.tipo,$scope.afil.numero,i,'TEST',e);
               consultaHTTP.enviaEncuestaEnc($scope.afil.tipo,$scope.afil.numero,$scope.recomendaria).then(function(response){
                  if (response == "1") {
                     notification.getNotification('success','Encuesta registrada exitosamente','Notificacion');
                     $window.open('views/consultaafiliados/soportes/encuesta_satisfaccion.php?tipo='+$scope.afil.tipo+'&id='+$scope.afil.numero,'_blank', "width=1080,height=1100");
                     document.getElementById("encuesta").reset();
                     $scope.solobusqueda();
                     $scope.apto = true;
                  }
               });
            }
         }
      }
   }
]);