'use strict';
   angular.module('GenesisApp')
   .controller('modalJuzgadosctrl',['$scope','$http','consultaHTTP','$filter','ngDialog','cfpLoadingBar',
   function($scope,$http,consultaHTTP,$filter,ngDialog,cfpLoadingBar) {
      $scope.nokeyword = true;
      // $('#tbljuzgados').on('click', 'tbody tr', function(event) {
      //    $(this).addClass('arr').siblings().removeClass('arr');
      // });
      $("#tbljuzgados tr").click(function() {
         $(this).addClass('arr').siblings().removeClass('arr');
      });
      $scope.filtroListado = function(){
         if ($scope.keyword.length > 2) {
            $http({
               method: 'POST',
               url: "php/juridica/tutelas/functutelas.php",
               data: {
                  function: 'listaJuzgados',
                  keyword: $scope.keyword
               }
            }).then(function (response) {
               $scope.nokeyword = false;
               $scope.Juzgados = response.data;
               if ($scope.Juzgados.length == 0) {
                  $scope.zeroresults = true;
               }else{
                  $scope.zeroresults = false;
               }
            });
         }else{
            $scope.nokeyword = true;
            $scope.zeroresults = false;
            $scope.Juzgados = {};   
         }
      }
   	$scope.selectJuzgado = function(codigo,ubicacion,nombre){
         $('#J'+codigo).addClass('arr');
         $('#J'+codigo).siblings().removeClass('arr');
         $scope.juzgado = {
            codigo:codigo,
            ubicacion:ubicacion,
            nombre:nombre
         }
      }
   }
]);