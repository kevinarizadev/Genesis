'use strict';
angular.module('GenesisApp', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('formatPrescripcionController', ['$scope', '$http', '$location',
    function ($scope, $http, $location) {

      $scope.json = {
        numero: null,
        ubicacion: null,
        tipodoc: null,
        afiliado: null,
        mipres: null

      }


      $scope.datosFormato = [];
      $scope.json.numero = $location.search().numero;
      $scope.json.ubicacion = $location.search().ubicacion;
      $scope.json.tipodoc = $location.search().tipodoc;
      $scope.json.afiliado = $location.search().afiliado;
      $scope.json.mipres = $location.search().mipres;

      $scope.fechageneracion = new Date();
    
      $http({
        method: 'POST',
        url: "../../php/recobro/formato_prescripcion.php",
        data: { function: $location.search().tipo == 'F' ? 'p_imprimir_nopbs_formato_formula_medica' : 'p_imprimir_nopbs_formato_plan_manejo', autorizacion: JSON.stringify($scope.json) }
      }).then(function (response) {


        $scope.datosFormato = response.data;
        if (response.data.Codigo == '1') {
          swal({            
            title: response.data.Nombre,          
            timer: 3000            
          })
          swal.showLoading();

          setTimeout(function () {
            window.close();
          }, 3000);

        } else {
          swal.close();
            setTimeout(function () {
            window.print();
             setTimeout(function () {
               window.close();
            }, 100);
           }, 500);
          

        }




      })
      var mediaQueryList = window.matchMedia('print');
      mediaQueryList.addListener(function (mql) {
        if (mql.matches) {
          console.log('se hizo antes de imprimir');
        } else {
          console.log('se hizo despues de imprimir');

        }
      });
    }]);
