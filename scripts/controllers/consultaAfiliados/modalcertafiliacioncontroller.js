'use strict';
angular.module('GenesisApp')
.controller('modalcertafiliacioncontroller',['$http','$scope','ngDialog','consultaHTTP','afiliacionHttp','notification','cfpLoadingBar','$window','$sce','$timeout',
	function($http,$scope,ngDialog,consultaHTTP,afiliacionHttp,notification,cfpLoadingBar,$window,$sce,$timeout) {
		$scope.cert = {filtro:true,periodo:'T'}
      $http({
         method:'GET',
         url:"php/consultaafiliados/soportes/obteneraportes.php",
         params: {type: $scope.tipo_documento,
                  id: $scope.documento
                  }
      }).then(function(data){
         $scope.Periodos = data.data;
      })
      $scope.generaHistorico = function(){
         if ($scope.cert.filtro == true) {
            $window.open('views/consultaafiliados/soportes/cert_movilidad_contributivo.php?tipo='+$scope.tipo_documento +'&id='+$scope.documento,'_blank', "width=1080,height=1100");   
         }else{
            $window.open('views/consultaafiliados/soportes/cert_movilidad_contributivo.php?tipo='+$scope.tipo_documento +'&id='+$scope.documento+'&aport='+$scope.cert.periodo,'_blank', "width=1080,height=1100"); 
         }
      }
	}
]);