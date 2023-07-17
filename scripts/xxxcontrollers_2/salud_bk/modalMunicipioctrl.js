'use strict';
angular.module('GenesisApp')
 .controller('modalMunicipioctrl',['$scope','censoHttp','$http','ngDialog',function($scope,censoHttp,$http,ngDialog) {
$scope.nokeywordips = true;
      $scope.filtroListadomunicipios = function(){
         if ($scope.keyword.length > 3) {
            $http({
               method: 'POST',
               url: "php/censo/censo.php",
               data: {
                  function: 'listaMunicipio',
                  keyword: $scope.keyword
               }
            }).then(function (response) {
               $scope.nokeywordips = false;
               $scope.Municipio = response.data;
               if ($scope.Municipio.length == 0) {
                  $scope.zeroresults = true;
               }else{
                  $scope.zeroresults = false;
               }
            });
         }else{
            $scope.nokeywordips = true;
            $scope.zeroresults = false;
            $scope.Municipio = {};   
         }
      }
   	$scope.selectMunicipios = function(codigo,nombre){
         $('#M'+codigo).addClass('arr');
         $('#M'+codigo).siblings().removeClass('arr');
         $scope.municipio = {
            codigo:codigo,
            nombre:nombre
         }
      }

}]);