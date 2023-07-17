'use strict';
angular.module('GenesisApp')
.controller('modaldirbencontroller', ['$scope', '$http', 'afiliacionHttp','ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller','$rootScope','$window',
function ($scope, $http, afiliacionHttp, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
  $rootScope.$on('ngDialog.opened', function (e, $dialog) {
    $(".ngdialog-content").css({"padding-left":"0px","padding-bottom":"0px","padding-right":"0px","padding-top":"0px","width":"800px"});
  });
  $scope.selectViap = "0";
  $scope.numeroN = '';
  $scope.selectLetra = "0";
  $scope.selectnumero = '';
  $scope.bis = '';
  $scope.selectcuadrante = "0";
  $scope.numeroNVG = '';
  $scope.selectLetraVG = "0";
  $scope.numeroplaca = '';
  $scope.selectcuadranteVG = "0";
  $scope.complemento = '';
  $scope.dire = '';
  $scope.bistext = '';
    afiliacionHttp.obtenerViaPrincipal().then(function (response) {
      $scope.viaprincipal = response;
    })

    afiliacionHttp.obtenerLetra().then(function (response) {
      $scope.letras = response;
    })

    afiliacionHttp.obtenerCuadrante().then(function (response) {
      $scope.Cuadrantes = response;
    })

  $scope.changebis =  function(){
    if($scope.bis == true){
        $scope.bistext = "BIS";
    }else{
        $scope.bistext = "";
    }
  }
$scope.registrardireccion =  function(){
  if($("#direccionmodal").val().trim() != ""){
    communication.direccion = $("#direccionmodal").val().trim();
    ngDialog.close();
  }
}
  // $rootScope.$on('ngDialog.close', function (e, $dialog) {
  //     communication.direccion = $("#direccion").val();
  // });

}])
