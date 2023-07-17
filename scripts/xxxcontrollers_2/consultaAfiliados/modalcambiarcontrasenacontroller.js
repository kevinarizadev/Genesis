'use strict';
angular.module('GenesisApp')
.controller('modalcambiarcontrasenacontroller',['$http','$timeout','$scope','ngDialog','consultaHTTP','afiliacionHttp','notification','cfpLoadingBar','$rootScope','$controller','communication',
function($http,$timeout,$scope,ngDialog,consultaHTTP,afiliacionHttp,notification,cfpLoadingBar,$rootScope,$controller,communication) {

        $.getJSON( "php/obtenersession.php")
      .done(function(respuesta) {
         $scope.sesdata = respuesta;
         if ($scope.sesdata.rolcod == -1) {
                // $scope.inputType1 = 'password';
                // $scope.inputType2 = 'password';
         }else{
                // $scope.inputType1 = 'text';
                // $scope.inputType2 = 'text';
            }
         
        
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
         console.log("Error obteniendo session variables");
      });
    $scope.GenerarPass=function(){
            $http({
                method:'POST',
                url:"php/movilidad/funcmovilidad.php",
                data: {function:'generar_pass'}
            }).then(function(response){
                $scope.generarpassword1=response.data;
                $scope.generarpassword2=response.data;
            })
    }

    $scope.CambiarPass=function(){
                var nit="";
              if ($scope.sesdata.rolcod == -1) {
                    nit=$scope.sesdata.cedula;
              }else{
                    nit=$scope.id;
              }
                if ($scope.generarpassword1==undefined || $scope.generarpassword1=="" || $scope.generarpassword2==undefined || $scope.generarpassword2=="") {
                    swal('Error','No puede generar una Contraseña vacia','warning');
                } else if ($scope.generarpassword1.length < 6) {
                    swal('Error','Debe tener una longitud minima 6 caracteres','warning');
                } else if ($scope.generarpassword1 != $scope.generarpassword2) {
                    swal('Error','La contraseña no coinciden','warning');
                } else{
                    $http({
                        method:'POST',
                        url:"php/consultaAfiliados/funcnovedadacb.php",
                        data:  {function:'actualizar_pass',
                        v_nit:nit,
                        v_password:$scope.generarpassword1}
                    }).then(function(response){
                        if (response.data.coderror=='0') {
                            swal('Completado',response.data.mensaje,'success')
                             $scope.closeThisDialog();
                          	 $scope.closeThisDialog();
                        } else{
                            swal('Error',response.data.mensaje,'warning');
                           
                        }
                    })
                }
            
    }

}
]);