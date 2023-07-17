'use strict';
angular.module('GenesisApp')
 .controller('modalmivacunax',['$scope','censoHttp','$http','ngDialog',function($scope,censoHttp,$http,ngDialog) {
$scope.nokeywordips = true;
      $scope.filtroListadocenso = function(){
         if ($scope.keyword.length > 3) {          
            $http({
               method: 'POST',
               url: "php/saludpublica/mivacunacovid.php",
               data: { 
                  function: 'listaIps',
                  keyword: $scope.keyword,
                  // ubicacionq : '8001'
               }
            }).then(function (response) {
               console.log($scope.keyword);
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
      $scope.selectIps = function(index,codigo,nombre,ubicacion,codigo_prestador){
         angular.forEach(document.querySelectorAll('.arr'), function (i) {
            i.classList.remove('arr');
          });
          setTimeout(() => { $('#I'+index).addClass('arr'); }, 200);
         // $('#I'+codigo).siblings().removeClass('arr');
         $scope.ips = {
            codigo:codigo,
            nombre:nombre,
            ubicacion: ubicacion,
            codigo_prestador: codigo_prestador
            
         }
      }

}]);