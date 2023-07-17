'use strict';
angular.module('GenesisApp')
  .controller('detalleUCIctrl', ['$scope', 'censoHttp', 'ngDialog', '$controller', '$http', 'Messages', '$window', function ($scope, censoHttp,ngDialog,  $controller, $http, Messages, $window) {

    $scope.body = true;
    $scope.zeroresults=true;
 
        $scope.guardar= function (d) {
          //console.log(d);
          $scope.temporal = d;
        for (var z = 0; z < $scope.temporal.length; z++) {     
             d[z].responsable = sessionStorage.getItem('cedula');
        }
              console.log(d);
        
            swal({
        title: 'Espere un momento',
        text: 'Actualizando Capacidad UCI',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
          swal.showLoading()
        }
      });

      
      $http({
        method: 'POST',
        url: "php/censo/uci.php",
        data: {
          function: 'actualiza_uci_new',
          'nit': $scope.nit,
          'sede':$scope.sede,
          'responsable':sessionStorage.getItem('cedula'),
          'json_in':d,
        'cantidad': d.length,
        'ubicacion': $scope.ubicacion
        }        }).then(function (response) { 

      if (response.data.codigo == '0') {swal('Exito',response.data.mensaje,'success'); ngDialog.close();} else {swal('Error',response.data.mensaje,'error')}

        });    
        }

        $scope.Obt_Estilo = function (x) {
          var xx = x.substr(0, x.length);
          console.log(xx);
          if (parseInt(xx) >= 0 && parseInt(xx) <= 35) {
            return { "background-color": "rgb(3, 197, 20) !important;" }
            } else if (parseInt(xx) >= 36 && parseInt(xx) <= 75) {
             return { "background-color": "rgb(235, 156, 5) !important" }
            } else {
            return { "background-color": "rgb(245, 75, 75) !important;" }
            }
    }
  }]);
