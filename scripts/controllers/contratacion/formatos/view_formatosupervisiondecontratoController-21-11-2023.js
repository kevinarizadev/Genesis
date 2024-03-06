
'use strict';
angular.module('GenesisApp', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('ControladorIMP', ['$scope', '$http', '$timeout', '$location', '$sce', '$q',
    function ($scope, $http, $timeout, $location, $sce, $q) {
      $(document).ready(function () {
        $scope.trustSrc = function (src) {
          return $sce.trustAsResourceUrl(src);
        }
        $scope.generaciondeFormato();
      });

      $scope.generaciondeFormato = function () {
        $http({
          method: 'POST',
          url: "../../../php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'consultaReporteUnitario',
            vpidproceso: $location.search().vprenglon.toString()
          }
        }).then(function ({ data }) {
          $scope.infoFormato = data;
        });
      }
        // Este codigo nos sirve para no permitir ver el codigo solo imprimir
        
              body.onkeydown = function (e) {
        document.addEventListener('contextmenu', event => event.preventDefault());
        const body = document.querySelector('body');
          if (e.keyCode === 17 || e.keyCode === 80) {
            return false;
          } else {
            return false;
          }
        }
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function (mql) {
          if (mql.matches) {
            console.log('se hizo antes de imprimir');
          } else {
            console.log('se hizo despues de imprimir');
            setTimeout(function () {
              window.close();
            }, 10);
          }
        });


    }]);
