'use strict';
   angular.module('GenesisApp')
   .controller('modalEntrevistasctrls',['$scope','$http','consultaHTTP','$filter','ngDialog','cfpLoadingBar',
   function($scope,$http,consultaHTTP,$filter,ngDialog,cfpLoadingBar) {
        $scope.valida_censo = function(){
            console.log($scope.entr);
            $scope.nueva_entr = $scope.entr;
            if ( $scope.nueva_entr.numero != null) {
                $scope.registrarENT();
            } else {
                swal('Notificacion',"Solo se puede insertar una entrevista seleccionando un censo. ",'error');
            }
        }

        $scope.registrarENT = function(){
            if($scope.nueva_entr.numero != null && $scope.nueva_entr.ubi != null && $scope.nueva_entr.nombre != null && $scope.nueva_entr.descripcion != null){
                $http({
                    method: 'POST',
                    url: "php/censo/nuevas_funciones.php",
                    data: {function: 'insertar_entrevista', 
                    numero:$scope.nueva_entr.numero,
                    ubicacion:$scope.nueva_entr.ubi,
                    nombre:$scope.nueva_entr.nombre,
                    descripcion:$scope.nueva_entr.descripcion}
                  }).then(function (response) {
                    swal('Notificacion',response.data.mensaje,'success');
                    ngDialog.close();
                  });
            } else {
                swal('Notificacion',"Debe completar todos los campos. ",'error');
            }     
    }
        }
   ]);