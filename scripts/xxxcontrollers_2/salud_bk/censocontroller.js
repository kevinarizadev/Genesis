'use strict';
angular.module('GenesisApp')
 .controller('censocontroller',['$scope','censoHttp','ngDialog','$controller','cfpLoadingBar',function($scope,censoHttp,ngDialog,$controller,cfpLoadingBar) {
  
     var dat = {prov : 'navb'}
      $.getJSON( "php/obtenersession.php", dat)
      .done(function(respuesta) {
        $scope.sesdata = respuesta;
        $scope.cedula = $scope.sesdata.cedula;
        $scope.ubicacion = $scope.sesdata.codmunicipio;

    $scope.table = $('#resultCenso').DataTable( {
      dom: 'lBsfrtip',
      buttons: [ { extend: 'copy', text: 'Copiar' }, 'csv', 'excel'],
      ajax: {
         url: 'php/censo/censotabla.php?ubicacion='+$scope.ubicacion,
         dataSrc: ''
      },
      columns: [
            { data: "ESTADO" },
            { data: "CODIGOCENSO" },
            { data: "NOMBREAFILIADO" },
            { data: "TIPODOCUMENTO" },
            { data: "DOCUMENTO" },
            { data: "NIT" },
            { data: "NOMBREIPS" },
            { data: "UBICACIONIPS" },
            { data: "FECHAINGRESO" },
            { data: "FECHAEGRESO" },
            { data: "DIAESTANCIA" },
            { data: "TOTALGLOSAS" },
            { data: "HIJODE"}
      ],
      language: {
         "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
      },
      lengthMenu: [[10, 30, 50,-1], [10, 30, 50,'Todas']],
      order: [[ 5, "desc" ]]
   } );
     
      $('#resultCenso tbody').on('click', 'tr', function () {
          $scope.id = $scope.table.row( this ).data();
           $controller('censohospitalariocontroller', {
                $scope: $scope
                });
              $scope.showmodalcenso($scope.id);
      });
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log("navbar error obteniendo variables");
      });

    $scope.Refrescar = function(){
       swal({
        title: 'Cargando información del Censo'
      });
      //swal.showLoading();
      $scope.table.ajax.reload();
      //swal.close();
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
