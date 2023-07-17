'use strict';
angular.module('GenesisApp', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('formatoteleorientacionController', ['$scope', '$http', '$location', '$timeout',
    function ($scope, $http, $location) {

      $scope.dataformatoteleorient = null;
      $scope.numero = $location.search().numero;      
      $http({
        method: 'POST',
        url: "../../php/gestionriesgo/gestionriesgo.php",
        data: { function: 'print_teleorientacion', numero: $scope.numero }
      }).then(function (response) {        
        $scope.dataformatoteleorient = response.data
        document.getElementById('idpatologias').innerHTML = $scope.showPatologias($scope.dataformatoteleorient);
        document.getElementById('idevoluciones').innerHTML = $scope.dataformatoteleorient.evoluciones;


      })


      $scope.showPatologias = function (item) {
        if (item != null) {
          var tempatolias = "";
          if (item.p_hipertension == 'S') {
            tempatolias = tempatolias + 'HIPERTENSION ARTERIAL <br>';
          }
          if (item.p_diabetes == 'S') {
            tempatolias = tempatolias + 'DIABETES MELLITUS <br>';
          }

          if (item.p_epoc_asma == 'S') {
            tempatolias = tempatolias + 'EPOC / ASMA <br>';
          }

          if (item.p_artritis_otras_autoinmunes == 'S') {
            tempatolias = tempatolias + 'ARTRITIS Y OTRAS AUTOINMUNES <br>';
          }
          if (item.p_tuberculosis_hepatitis_c == 'S') {
            tempatolias = tempatolias + 'TUBERCULOSIS O HEPATITIS C <br>';
          }
          if (item.p_vih_otras_inmunodeficiencias == 'S') {
            tempatolias = tempatolias + 'VIH Y OTRAS INMUNODEFICIENCIAS <br>';
          }

          if (item.p_patologia_salud_mental == 'S') {
            tempatolias = tempatolias + 'PATOLOGIA DE SALUD MENTAL <br>';
          }
          if (item.p_consumo_de_spa == 'S') {
            tempatolias = tempatolias + 'CONSUMO DE SPA <br>';
          }
          if (item.p_otro == 'S') {
            tempatolias = tempatolias + 'OTRO <br>';
          }

          return tempatolias.length == 0 ? "SIN PATOLOGIAS" : tempatolias;
        }

      }
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function (mql) {
          if (mql.matches) {
           console.log('se hizo antes de imprimir');
          } else {
           console.log('se hizo despues de imprimir');

          }
       });



        setTimeout(function () {
           window.print();
         setTimeout(function () {
           window.close();
         }, 100);
       }, 1000);



    }]);
