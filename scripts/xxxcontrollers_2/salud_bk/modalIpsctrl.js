'use strict';
angular.module('GenesisApp')
 .controller('modalIpsctrl',['$scope','censoHttp','$http','ngDialog',function($scope,censoHttp,$http,ngDialog) {
$scope.nokeywordips = true;
      $scope.filtroListadocenso = function(){
         if ($scope.keyword.length > 3) {
            $http({
               method: 'POST',
               url: "php/censo/censo.php",
               data: {
                  function: 'listaIps',
                  keyword: $scope.keyword
               }
            }).then(function (response) {
               $scope.nokeywordips = false;
               $scope.Ips = response.data;
               if ($scope.Ips.length == 0) {
                  $scope.zeroresults = true;
               }else{
                  $scope.zeroresults = false;
               }
            });
         }else{
            $scope.nokeywordips = true;
            $scope.zeroresults = false;
            $scope.Ips = {};   
         }
      }
   	$scope.selectIps = function(codigo,nombre,ubicacion){
         $('#I'+codigo).addClass('arr');
         $('#I'+codigo).siblings().removeClass('arr');
         $scope.ips = {
            codigo:codigo,
            nombre:nombre,
            ubicacion: ubicacion
         }
      }

}]);