'use strict';
   angular.module('GenesisApp')
   .controller('actualizarinfoctrl',['$scope','consultaHTTP','notification','$timeout','$rootScope','$http','$window','ngDialog',
   function($scope,consultaHTTP,notification,$timeout,$rootScope,$http,$window,ngDialog) {
   $scope.infoempresa=true;

    $.getJSON( "php/obtenersession.php")
      .done(function(respuesta) {
         $scope.sesdata = respuesta;
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
         console.log("Error obteniendo session variables");
      });

      $http({
         method: 'POST',
         url: "php/movilidad/funcmovilidad.php",
         data: {
            function: 'listarSedes'
         }
      }).then(function (response) {
         $scope.lugares = response.data;
      });

       $scope.Obtenersede = function(codigo,direccion,nombre,barrio,contacto,correo,nombreempresa,renglon){
        $scope.infoempresa=false;
        $scope.lugar_emp =  nombre;
        $scope.barrio_emp = barrio;
        $scope.contacto_emp = contacto;
        $scope.correo_emp = correo;
        $scope.direccion_emp =  direccion;
        $scope.codigosede = codigo;
        $scope.nombreempresa = nombreempresa;
        $scope.renglon =  renglon;
      }

      $scope.Enviarsolicitud = function(codigo){
        switch(codigo) {
            case "V":
             ngDialog.closeAll();
             swal('Notificacion Genesis',
                'Información de la empresa'+' <b> '+ $scope.nombreempresa +' </b> '+'validada correctamente.',
                'success') 
              break;
            case "A":
              $http({
               method: 'POST',
               url: "php/movilidad/funcmovilidad.php",
               data: {
                  function: 'actualizarinfoEmpresa',
                  codigoempre: $scope.codigosede,
                  direccion: $scope.direccion_emp,
                  barrio:$scope.barrio_emp,
                  contacto:$scope.contacto_emp,
                  correo:$scope.correo_emp,
                  numerosede:$scope.codigosede,
                  renglon: $scope.renglon
               }
               }).then(function (response) {
               if (response.data.coderror == 1) {
                ngDialog.closeAll();
                swal('Notificacion Genesis',
                'Información de la empresa'+' <b> '+ $scope.nombreempresa +' </b> '+'actualizada correctamente.',
                'success')
               }
            });

            
              break;
            }
          }
        }
]);