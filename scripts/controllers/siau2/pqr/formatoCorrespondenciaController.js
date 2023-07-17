'use strict';
angular.module('GenesisApp', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('formatoCorrespondenciaController', ['$scope', 'pqrHttp', '$location', '$timeout',
    function ($scope, pqrHttp, $location, $timeout) {
      
      $scope.numero = $location.search().numero;
      
      console.log($scope.numero);

      swal({ title: 'Cargando datos del Formato' }).catch(swal.noop);
      swal.showLoading();

      pqrHttp.get_datos_enviada($scope.numero).then(function (response) {        
        $scope.matriz = response;
        swal.close();
      
       setTimeout(function () {
        window.print();
     setTimeout(function(){             
           window.close();                    
       },100);          
       }, 500);


      })


    }]);
