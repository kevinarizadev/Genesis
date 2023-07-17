'use strict';
angular.module('GenesisApp',['chieffancypants.loadingBar','toastr','ngDialog','ngMask'])
.directive('numbersOnly', function () {
 return {
     require: 'ngModel',
     link: function (scope, element, attr, ngModelCtrl) {
         function fromUser(text) {
             if (text) {
                 var transformedInput = text.replace(/[^0-9]/g, '');

                 if (transformedInput !== text) {
                     ngModelCtrl.$setViewValue(transformedInput);
                     ngModelCtrl.$render();
                 }
                 return transformedInput;
             }
             return undefined;
         }            
         ngModelCtrl.$parsers.push(fromUser);
     }
 };
})
.controller('registrocontroller',['$scope', 'ngDialog','$http','notification','$timeout','$filter',
function ($scope, ngDialog ,$http,notification,$timeout,$filter) {
	$scope.inemail = true;
	$scope.type = "0";
	$scope.endbtn = true;
	$scope.validado = false;
	$scope.registro = false;
	$scope.success = true;
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
	$scope.validaafiliado = function(){
		if ($scope.type == "0" || $scope.type == "SELECCIONAR") {
         	notification.getNotification('info','Seleccione tipo de documento','Notificacion');
      	}else if ($scope.id === undefined || $scope.id == "") {
         	notification.getNotification('info','Ingrese datos de búsqueda','Notificacion');
      	}else{
      	$http({
            method:'POST',
            url:"php/login/validauser.php",
            data: {type:$scope.type,id:$scope.id}
         }).then(function(res){
            $scope.res = res.data;
            if ($scope.res["0"].EXIST == 0) {
            	notification.getNotification('info','Usted no se encuentra registrado en la base de datos de Cajacopi EPS','Notificacion');
            	$scope.validado = false;
            }else if ($scope.res["0"].EXIST == 2) {
            	notification.getNotification('error','Usted ya está registrado, puede ingresar a la plataforma con los datos de acceso que se enviaron a su correo','Notificacion');
            	$scope.validado = false;
            }else if ($scope.res["0"].EXIST == 1) {
            	$scope.inemail = false;
            	$scope.validado = true;
            }else if ($scope.res["0"].EXIST == 3) {
               notification.getNotification('error','Usuario no se encuentra activo','Notificacion');
            }
         })
         console.clear();
      }
	}
	$scope.checkagree = function(){
		if ($scope.agree == true) {
			$scope.endbtn = false;
		}else{
			$scope.endbtn = true;
		}
	}
	$scope.finalizar = function(){
		if ($scope.celular === undefined) {
			notification.getNotification('error','Ingrese correo electrónico','Notificacion');
			return;
		}
		if ($scope.expedicion === undefined) {
			notification.getNotification('error','Ingrese fecha de expedicion de su documento de identidad','Notificacion');
			return;
		}else{
			if ($scope.expedicion.length != 10) {$scope.expedicion = formatDate($scope.expedicion,1)}		
			if ($scope.agree == true) {$scope.agree = "S"}else{$scope.agree = "F"}
			$http({
            method:'GET',
            url:"php/login/registra.php",
            params:{type:$scope.type,
            		id:$scope.id,
            		acepta:$scope.agree,
            		email: $scope.celular,
            		expedicion:$scope.expedicion}
         }).then(function(res){
            if (res.data == 0) {
            	notification.getNotification('error','Error completando registro','Notificacion');
            }else if (res.data == 1) {
            	notification.getNotification('success','Registro completado exitosamente','Notificacion');
               $scope.formattedDate = formatDate($scope.expedicion,2);
               // $http({
               //    method:'GET',
               //    url:"https://tusreservas.co/envio_hosting.php",
               //    params:{ destinocorreo:$scope.correo,
               //             destinonombre:$scope.res["0"].NOMBRE,
               //             username:$scope.id,
               //             password:$scope.formattedDate }
               // }).then(function(res){
               //    if (res.data == 1) {
               //       $scope.registro = true;
               //       $scope.success = false;
               //    }
               // })
               $http({
                  method: 'POST',
                  url: "php/tic/enviosms.php",
                  data: {
                    function: 'EnviarMensajeSMS',
                       data: {
                     from: "CajacopiEPS",
                     celular: "57"+$scope.celular,
                     mensaje: "Su contraseña para el Portal Genesis de CajacopiEPS es: "+$scope.formattedDate
                  }
                  }
                }).then(function (data) {
                  console.log(data);
                });

               // $http({
               //    method:'POST',
               //    url:"https://api.infobip.com/sms/1/text/single",
               //    headers: {
               //       'Content-Type': 'application/json',
               //       'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
               //       'accept' : 'application/json'
               //    },
               //    data: {
               //       "from": "CajacopiEPS",
               //       "to": "57"+$scope.celular,
               //       "text": "Su contraseña para el Portal Genesis de CajacopiEPS es: "+$scope.formattedDate
               //    }
               // }).then(function(response){
               //    console.log(response);
               // });
            }
         })
		}
	}
	$scope.showpolicy = function () {
      ngDialog.open({
         template: 'views/modal/modalterminos.html',
         className: 'ngdialog-theme-plain',
         scope: $scope
      });
   }
}]);