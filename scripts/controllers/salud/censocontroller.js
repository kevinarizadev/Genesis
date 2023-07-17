'use strict';
angular.module('GenesisApp')
 .controller('censocontroller',['$scope','censoHttp','ngDialog','$controller','cfpLoadingBar','$http',function($scope,censoHttp,ngDialog,$controller,cfpLoadingBar, $http) {
  
const obtenerfichapaciente2 = (test) => {
      $scope.id = test;
      $controller('censohospitalariocontroller', {
        $scope: $scope
        });
      $scope.showmodalcenso($scope.id);
    }

  

      $scope.obtener_censos_activos = function () {
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
          url: 'php/censo/censo.php',
          data: { function: 'obtenerListaCenso',
          ubicacion: sessionStorage.getItem('municipio'),
          documento:sessionStorage.getItem('cedula')             }
        }).then(function (response) {
          if ($scope.estadoincumplimiento == 'I') {
            $scope.tablecenso.destroy();
          }
          $scope.censos = response.data;
//    $('#modalservicio').modal('close');
          setTimeout(() => {
              $scope.estadoincumplimiento ='I';
              $scope.tablecenso = $('#resultCenso').DataTable({
                language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                lengthMenu: [[5, 10, -1], [5, 10, 'Todas']],
                "order": [[10, "asc" ]]
              });
            }, 500)

            /*Array.from(document.querySelectorAll('.registro_censo')).forEach((item) => {
              item.addEventListener('click', () => {
                  obtenerfichapaciente2()
              })
            })*/
            
          }, 1000);
          setTimeout(function() {
            swal.close();
          }, 1000);       
      }

      /*$('#resultCenso tbody').on('click', 'tr', function () {
        $scope.id = $scope.tablecenso.row( this ).data();
         $controller('censohospitalariocontroller', {
              $scope: $scope
              });
            $scope.showmodalcenso($scope.id);
    });*/

    
    $scope.obtenerfichapaciente= function(test){
      $scope.id = test;
      $controller('censohospitalariocontroller', {
        $scope: $scope
        });
      $scope.showmodalcenso($scope.id);
    }
    
    $scope.Refrescar = function(){
       swal({
        title: 'Cargando información del Censo'
      });
      swal.showLoading();
      $scope.tablecenso.ajax.reload();
      swal.close();
      }

    $scope.mostraCenso = function(codigo){
       ngDialog.open({
                  template: 'views/salud/datoscenso.html',
                  controller: 'censohospitalariocontroller',
                  className: 'ngdialog-theme-plain',
                  controllerAs: 'atcoctrl',
                  width: '90%',
                  scope: $scope
            });
     }
      
      $scope.evoluciontab = function (){
         $controller('censohospitalariocontroller', {
            $scope: $scope
            });
          $scope.eventTabs("E");
      }

}]);
