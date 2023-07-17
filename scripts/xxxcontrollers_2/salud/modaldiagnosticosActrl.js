'use strict';
   angular.module('GenesisApp')
   .controller('modaldiagnosticosActrl',['$scope','$http','consultaHTTP','$filter','ngDialog','cfpLoadingBar',
   function($scope,$http,consultaHTTP,$filter,ngDialog,cfpLoadingBar) {
      $scope.nokeyword = true;
      $scope.filtroListado = function(){
         if ($scope.keyword.length > 3) {
            $http({
               method: 'POST',
               url: "php/censo/censo.php",
               data: {
                  function: 'listaDiagnosticos',
                  keyword: $scope.keyword,
                  sexo: $scope.sexo,
                  edad: $scope.edad
               }
            }).then(function (response) {
               $scope.nokeyword = false;
               $scope.Diagnosticos1 = response.data;
               if ($scope.Diagnosticos1.length == 0) {
                  $scope.zeroresults = true;
               }else{
                  $scope.zeroresults = false;
               }
            });
         }else{
            $scope.nokeyword = true;
            $scope.zeroresults = false;
            $scope.Diagnosticos1 = {};   
         }
      }
   	$scope.selectDiagnostico = function(codigo,nombre){
         $('#D'+codigo).addClass('arr');
         $('#D'+codigo).siblings().removeClass('arr');
         $scope.diagnosticoa = {
            codigo:codigo,
            nombre:nombre
         }
      }
   }
]);