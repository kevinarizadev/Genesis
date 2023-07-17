'use strict';
angular.module('GenesisApp')
  .controller('busquedacensocontroller', ['$scope', 'censoHttp', 'ngDialog', '$controller', '$http', 'Messages', '$window', function ($scope, censoHttp,ngDialog,  $controller, $http, Messages, $window) {

    $scope.body = true;
    $scope.hide_sedes = true;
    $scope.zeroresults=true;
    $scope.responsable = sessionStorage.getItem('cedula');
    console.log($scope.responsable);
    $scope.sedes_prestador = '';
    $scope.hide_historico = true;
   $scope.buscar = function () {
     swal({
        title: 'Espere un momento',
        text: 'Consultando base de datos',
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
            function: 'obtener_cabeza',
            'coincidencia': $scope.coincidencia
          }
        }).then(function (response) { 
          if (response.data.length>0) {
            swal.close();
            $scope.body = false;
            $scope.hide_sedes = true;
            $scope.hide_historico = true;
            $scope.cabeza = response.data[0];
            $scope.sedes_prestador = response.data;  
          } else {
            swal('Advertencia','No se encontraron registros.','warning');
            $scope.hide_historico = true;
            $scope.body = true;
            $scope.hide_sedes = true;
          }
          
        });    
    }

    $scope.buscar_sedes = function (nit) {
      swal({
         title: 'Espere un momento',
         text: 'Consultando base de datos',
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
             function: 'obtener_sedes',
             'coincidencia': nit
           }
         }).then(function (response) { 

          swal.close();
            $scope.hide_sedes = false;
            $scope.hide_historico = true;
           $scope.sedes_prestador = response.data;
         });    
     }

     $scope.actualizar_estado = function(nit,estado){
     
     $http({
          method: 'POST',
          url: "php/censo/uci.php",
          data: {
            function: 'actualizar_estado',
            'nit': nit,
            'estado': (estado== 'N')?'S':'N',
            'responsable':sessionStorage.getItem('cedula') 
          }
        }).then(function (response) { 
         
          if (response.data.codigo == 0) {
            swal('Exito',response.data.mensaje,'success').then((result) => {
              $scope.buscar();
            })
         
          } else {
            swal('Error',response.data.mensaje,'error');
          }
        });    
     }

     $scope.historico_sede = function(nit, sede) {
       
       swal({
        title: 'Espere un momento',
        text: 'Consultando Historico UCI',
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
            function: 'historico_sede',
            'nit': nit,
             'sede': sede
          }
        }).then(function (response) { 
          

            
          
          if (response.data.length>0) {
                                
            
            $scope.historico_sala = response.data;
            $scope.hide_historico = false;
    
            
       
           setTimeout(() => {
            swal.close();
            if ($scope.estadoincumplimiento == 'I') {
              $scope.tablecenso.destroy();
            }
            $scope.estadoincumplimiento ='I';
            $scope.tablecenso = $('#resultCenso').DataTable({
              language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
              lengthMenu: [[5, 10, -1], [5, 10, 'Todas']]
            });
            
           }, 1000);
            
            
         
          } else {
            swal('Advertencia','No se encontraron registros.','warning');
          
          }
             
        });    
     }

  $scope.cabecera_xls = function(){
      window.open('php/censo/consolidado_uci.php');
}


    $scope.detalle={'nit':null,'sede':null};
    $scope.gestionar_uci = function (nit, sede,ubicacion) {
       swal({
        title: 'Espere un momento',
        text: 'Consultando Estado UCI',
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
            function: 'obtener_uci',
            'nit': nit,
             'sede': sede,
             'ubicacion': ubicacion
          }
        }).then(function (response) { 
            swal.close();
            $scope.UCIS = response.data;
            $scope.nit = nit;
            $scope.sede = sede;
            $scope.ubicacion = ubicacion;
             ngDialog.open({
              template: 'views/salud/modaldetalleUCI.html',
              className: "ngdialog-theme-plain", 
              controller: 'detalleUCIctrl',
              scope: $scope
            })
         

             //
        });    
     
    }
  }]);
