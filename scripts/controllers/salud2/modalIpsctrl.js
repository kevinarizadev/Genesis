'use strict';
angular.module('GenesisApp')
   .controller('modalIpsctrl', ['$scope', 'censoHttp', '$http', 'ngDialog', function ($scope, censoHttp, $http, ngDialog) {
      
      if ($scope.renglon == "1" || typeof $scope.renglon == 'undefined') {
         $scope.title = "Búsqueda IPS";
      } else {
         $scope.title = "Búsqueda IPS no contratada";
      }
      $scope.nokeywordips = true;
      $scope.filtroListadocenso = function () {
         if ($scope.keyword.length > 3) {
            
              if ($scope.renglon == "1" || typeof $scope.renglon == 'undefined') {
                  $http({
                     method: 'POST',
                     url: "php/censo/censo.php",
                     data: {
                        function: 'listaIps',
                        keyword: $scope.keyword
                     }
                  }).then(function (response) {
                     $scope.nokeywordips = false; 
                     $scope.Ips = response.data;
                     if ($scope.Ips.length == 0) {
                        $scope.zeroresults = true;
                     } else {
                        $scope.zeroresults = false;
                     }
                  });
                  }else {if ($scope.renglon == "2") {
                  $http({
                     method: 'POST',
                     url: "php/censo/censo.php",
                     data: {
                        function: 'listaIpsNC',
                        keyword: $scope.keyword
                     }
                  }).then(function (response) {
                     $scope.nokeywordips = false;
                     $scope.Ips = response.data;
                     if ($scope.Ips.length == 0) {
                        $scope.zeroresults = true;
                     } else {
                        $scope.zeroresults = false;
                     }
                  });
                  // swal('¡Whoops!','Algo ha salido mal, nos encontramos trabajando en ello','error')
                  }
              }
         } else {
            $scope.nokeywordips = true;
            $scope.zeroresults = false;
            $scope.Ips = {};
         }
      }
      $scope.selectIps = function (index,codigo, nombre, ubicacion) {
         $('#I' + index).addClass('arr');
         $('#I' + index).siblings().removeClass('arr');
         $scope.ips = {
            codigo: codigo,
            nombre: nombre,
            ubicacion: ubicacion
         }
      }

      $scope.actualiza_prestador = function () {
            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
            });
            
                $http({
                     method: 'POST',
                     url: "php/censo/censo.php",
                     data: {
                        function: 'p_actualiza_prestador',
                        v_pnumero: $scope.datos_censo.CENN_NUMERO,
                        v_pubicacion: $scope.datos_censo.CENN_UBICACION,
                        v_pdata: $scope.ips.codigo
                     }
                  }).then(function (response) {
                     swal.close()
                     if (response.data.codigo == 1) {
                        swal('Exito',response.data.mensaje,'success');
                     } else {
                        swal('Error',response.data.mensaje,'error');
                     }
                     
                  });
      }

   }]);