'use strict';
angular.module('GenesisApp', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('formatoCorrespondenciaRecibidaController', ['$scope', 'pqrHttp', '$location', '$timeout',
    function ($scope, pqrHttp, $location, $timeout) {  

      $scope.numero = $location.search().numero;      


      
        console.log($scope.numero);        
      swal({ title: 'Cargando datos del Formato' }).catch(swal.noop);
      swal.showLoading();
        pqrHttp.get_datos_recibida($scope.numero).then(function (response) {
          console.log(response);
          $scope.recibidas = response; 

          swal.close();      
          setTimeout(function () {
           window.print();
        setTimeout(function(){             
             window.close();                    
        },100);          
        }, 500);
        })
    
      
 

    }]).directive("inner", function ($timeout) {
          return {
              restrict: 'A',
              resplace: false,
              link: function(scope, element, attr) {
                  //element es un elemento jquery
                  var e = element;
  
                  attr.$observe('inner', function(data) {
                      e.html(attr.inner);
                  }, true)
              }
          };
      });

