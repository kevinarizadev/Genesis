'use strict';
  angular.module('GenesisApp',[])
  .config(function($locationProvider) {
      $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
    });
   })
  .controller('formatoglosaController',['$scope','$http','$location','$timeout',
  function($scope,$http,$location,$timeout) {
    $scope.Hallazgos='';
    $http({
         method:'GET',
         url:"../../../php/censo/soporte/getglosacert.php",
         params: {numerocenso: $location.search().censo,
                  ubicacion: $location.search().ubicacion
                  }
      }).then(function(data){
        $scope.cert = data.data;
        $scope.ips  = $scope.cert[0].IPS;
        $scope.seccional = $scope.cert[0].SECCIONAL;
        $scope.nombreafiliado = $scope.cert[0].NOMBRE;
        $scope.documentoaf = $scope.cert[0].DOCUMENTO;
        $scope.edad = $scope.cert[0].EDAD;
        $scope.fechaingreso = $scope.cert[0].FECHAINGRESO;
        $scope.fechaegreso =  $scope.cert[0].FECHAEGRESO;
        $scope.diagnostico =  $scope.cert[0].DIAGNOSTICO;
        $scope.fechaglosa =   $scope.cert[0].FECHAEGRESO;
        $scope.totalglosa =   $scope.cert[0].TOTAL;
        $scope.hosp = $scope.cert[0].HOSPITALIZACION;
        $scope.nombreau =$scope.cert[0].AUDITOR;
        
        var i;
        for (i = 1; i < $scope.cert.length; i++) { 
              if ($scope.cert[i].OBSERVACION!=null && $scope.cert[i].OBSERVACION !=undefined ){
                  $scope.Hallazgos = $scope.Hallazgos +' - '+ $scope.cert[i].OBSERVACION ;
                }
          }

         $timeout(function () {
            print(true);            
         }, 1000);
      })
  }
]);