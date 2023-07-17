'use strict';
angular.module('GenesisApp')
.controller('ProcesobduaController',['$scope','consultaHTTP','notification','$timeout','$rootScope','$http','$window','ngDialog',
    function($scope,consultaHTTP,notification,$timeout,$rootScope,$http,$window,ngDialog) {

      $scope.busquedaAfiliado=function(){
          if ($scope.type==undefined||$scope.type=='') {
            swal("Informacion","Debe Seleccionar Un Tipo De Documento", "error");
          } else if ($scope.regimen==undefined||$scope.regimen=='') {
            swal("Informacion","Debe Seleccionar Un Regimen", "error");
          } else if ($scope.id==undefined || $scope.id=='') {
            swal("Informacion","Debe Ingresar Su Numero De Identificacion", "error");
          } else {
            if ($scope.regimen=='C') {
              $scope.numiden=$scope.id;
              ngDialog.open({
                template: 'views/bdua/modal/contributivo.html',
                className: 'ngdialog-theme-plain',
                controller: 'ProcesoContritubitvoController',
                scope: $scope
              })
            } else {
              $scope.numiden=$scope.id;
              ngDialog.open({
                template: 'views/bdua/modal/subsidiado.html',
                className: 'ngdialog-theme-plain',
                controller: 'ProcesSubsidiadoController',
                scope: $scope
              })
            }

          }
      }

      $scope.busquedaDetalles = function () {
        $scope.busquedaXdetalles = ngDialog.open({
          template: 'views/consultaAfiliados/modalBusquedaDetalles.html',
          className: 'ngdialog-theme-plain',
          controller: 'modalBusquedaxnombres',
          closeByEscape: false,
          closeByDocument: false
        });
        $scope.busquedaXdetalles.closePromise.then(function (response) {
          if (response.value === undefined) { return; }
          if (response.value != "$closeButton") {
            $scope.type = response.value.tipo;
            $scope.id = response.value.documento;
            $scope.regimen = response.value.regimen;
            $scope.busquedaAfiliado();
          }
        });
      }

      $scope.Obtener_Tipos_Documentos = function () {
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Tipos_Documentos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
          }
      $scope.Obtener_Tipos_Documentos();


}
]);
