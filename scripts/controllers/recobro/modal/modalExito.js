'use strict';
angular.module('GenesisApp')
    .controller('modalExito', ['$scope', '$http', 'ngDialog',
        function ($scope, $http, ngDialog) {
        console.log($scope.info);
         
        
        if (typeof $scope.info.respuesta[0].IdDireccionamiento !== 'undefined') {
            $scope.variable = $scope.info.respuesta[0].IdDireccionamiento;
            $scope.mensaje = "Direccionamiento";
        }else{
            $scope.variable = $scope.info.respuesta[0].IdSuministro;
            $scope.mensaje = "Suministro";
        }
        
        

        }]);