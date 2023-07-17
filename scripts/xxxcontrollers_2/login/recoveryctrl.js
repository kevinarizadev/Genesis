'use strict';
angular.module('GenesisApp')
.controller('recoveryctrl', ['$scope', 'consultaHTTP','$http', 'notification', 'ngDialog', '$timeout', 'cfpLoadingBar',
   function($scope, consultaHTTP,$http, notification, ngDialog, $timeout, cfpLoadingBar) {
      $scope.hide_email_params = true;
      $scope.obtenerDocumento = function () {
         consultaHTTP.obtenerDocumento().then(function (response) {
            $scope.Documentos = response;
            $scope.r_tipo_documento = "CC";
         })
      }
      function formatDate(date,t) {
         if (t == 1) {
            var month = date.getMonth() + 1;
            date = date.getDate() + "/" + month + "/" + date.getFullYear();
            return date;
         }else if(t == 2){
            date = date.replace("/","");
            date = date.replace("/","");
            return date;
         }
      }
      $scope.recueprarpass = function(){
         $scope.f_f_format = $scope.f_expedicion;
         $scope.f_expedicion = formatDate($scope.f_expedicion,1);
         $scope.pasa_fecha = $scope.f_expedicion;
         $http({
            method:'POST',
            url:"php/login/recuperarpass.php",
            data:{function: 'verificapass',
                  type:$scope.r_tipo_documento,
                  id:$scope.r_documento,
                  expedicion:$scope.f_expedicion
               }
         }).then(function(res){
            $scope.response = res.data;
            $scope.res_nombre = $scope.response.nombre;
            if ($scope.response.error == 0) {
               $scope.hide_recover_params = true;
               $scope.hide_email_params = false;
            }else{
               notification.getNotification('error',$scope.response.mensaje,'Notificación');
            }
            $scope.f_expedicion = $scope.f_f_format;
         })
      }
      $scope.enviapass = function(){
         $scope.f_expedicion = formatDate($scope.f_expedicion,1);
         $scope.pass = $scope.f_expedicion.replace("/","");
         $scope.pass = $scope.pass.replace("/","");

         $http({
            method:'POST',
            url:"https://api.infobip.com/sms/1/text/single",
            headers: {
               'Content-Type': 'application/json',
               'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
               'accept' : 'application/json'
            },
            data: {
               "from": "CajacopiEPS",
               "to": "57"+$scope.r_cel,
               "text": "Su contraseña para el Portal Genesis de CajacopiEPS es: "+$scope.pass
            }
         }).then(function(response){
            console.log(response);
         });
      }
      $scope.passwordrecoveryips = function() {
         $scope.dialogrecover = ngDialog.open({
            template: 'recoverpassips.html',
            className: 'ngdialog-theme-plain',
            scope: $scope
         });
         $scope.dialogrecover.closePromise.then(function (data) {
            console.log(data)
         });
      }
   }
])
.controller('recoveryipsctrl', ['$scope', 'consultaHTTP','$http', 'notification', 'ngDialog', '$timeout', 'cfpLoadingBar',
   function($scope, consultaHTTP,$http, notification, ngDialog, $timeout, cfpLoadingBar) {
      $scope.correopanel = true;
      $scope.recueprarpassips = function(){
         $http({
            method:'POST',
            url:"php/login/recuperarpass.php",
            data:{function: 'verificapassips',
                  nit:$scope.r_nit,
                  usuario:$scope.r_usuario}
         }).then(function(res){
            $scope.response = res.data;
            if (($scope.response.error == 0) || ($scope.response.error == 2)) {
               $scope.dis_r_nit = true;
               $scope.dis_r_usuario = true;
               $scope.correopanel = false;
            }else {
               notification.getNotification('error',$scope.response.mensaje,'Notificación');
            }
         })
         
      }
      $scope.cargausuarios = function(){
         $http({
            method:'POST',
            url:"php/login/cargausersips.php",
            data: {nit:$scope.r_nit}
         }).then(function(res){
            $scope.usuarios = res.data;
         })
       }
      $scope.actualizacorreo = function(nombreips,clave){
         $http({
            method:'POST',
            url:"php/login/recuperarpass.php",
            data:{function: 'actualizacorreoips',
                  nit:$scope.r_nit,
                  usuario:$scope.r_usuario,
                  new_correo:$scope.r_correo}
         }).then(function(res){
            console.log(res.data);
         })
         $http({
            method:'GET',
            url:"https://www.tusreservas.co/cajacopi/recuperarpassips.php",
            params:{destinocorreo: $scope.r_correo,
                    destinonombre:$scope.response.nombreips,
                    username:$scope.r_usuario,
                    password:$scope.response.clave
               }
         }).then(function(res){
            notification.getNotification('success','Se envió un correo con la contraseña','Notificación');
            ngDialog.closeAll();
         })
      }
   }
]);