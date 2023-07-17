'use strict';
angular.module('GenesisApp',[])
.config(function($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
})
.controller('printActaRipsController',['$scope','$http','$location','$timeout', function($scope,$http,$location,$timeout) {
  $(document).ready(function(){
      $scope.qrcode = new QRCode("qrcode");

      $scope.infoqr = JSON.parse($location.search().datos);
      $scope.infoqrtemp = $location.search().datos;
      $http({
        method: 'POST',
        url: "../../../php/cuentasmedicas/rips/funcRips.php",
        data: {function:'obtenerInfoActa',verificacion:$scope.infoqr.verificacion,codigo:$scope.infoqr.codigo,prestador:$scope.infoqr.nit,recibo:$scope.infoqr.recibo}
      }).then(function(response) {
          $scope.infoacta = response.data;
          if($scope.infoacta.Error == 0){
            if($scope.infoacta.Tipo_acta == 'Acta de Validacion'){
              $scope.infoacta.Tipo_acta = 'Acta de Validación';
            }else{
              $scope.infoacta.Tipo_acta = 'Acta de Radicación';
            }
            makeCode($scope.infoqrtemp);
            $scope.acta_check = false;
        }else{
          $scope.acta_check = true;
        }
      })
  });   
  

  

  function makeCode (data) {        
      $scope.qrcode.makeCode(data);
  }
 
  var mediaQueryList = window.matchMedia('print');
  mediaQueryList.addListener(function(mql) {
      if (mql.matches) {
          console.log('se hizo antes de imprimir');
      } else {
          console.log('se hizo despues de imprimir');
      }
  });
}]);
