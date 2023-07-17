'use strict';
angular.module('GenesisApp')
  .controller('ctrlfallecidos', ['$scope', '$http', 'ngDialog', 'censoHttp', function ($scope, $http, ngDialog, censoHttp) {
    // console.log($scope.info);
    $scope.guardar = function () {


        swal({
          title: "Confirmar",
          text: "¿Está seguro de actualizar este registro?",
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn-danger",
          confirmButtonText: "Si, actualizar",
          cancelButtonText: "No",
          closeOnConfirm: false,
          closeOnCancel: false
        }).then((result) => {
          if (result) {
            swal('Exito','Motivos guardados correctamente','success')
            ngDialog.close();
          } else  {
            // swal('Exito','Glosa Actualizada Correctamente','error')
            }
           
        });     
         }
  }]);








