'use strict';
angular.module('GenesisApp')
    .controller('prestacionesController', ['$scope', '$http', '$timeout', '$window',
        function ($scope, $http, $timeout, $window) {

            $scope.existe = false;
            $scope.existe2 = false;
            $scope.Reportes = ' ';
            $(document).ready(function(){
                $(".fecha").kendoDatePicker({
                    culture: "es-MX",
                    format: "dd/MM/yyyy",
                    dateInput: true
                });
            });

              $http({
                method: 'POST',
                url: "php/prestaciones/prestaciones.php",
                data: {function: 'listar_reportes'}
              }).then(function (response) {
                $scope.Reportes = response.data;
              });

              function hoyFecha(){
                var hoy = new Date();
                    var dd = hoy.getDate();
                    var mm = hoy.getMonth()+1;
                    var yyyy = hoy.getFullYear();
                    
                    dd = addZero(dd);
                    mm = addZero(mm);
             
                    return dd+'/'+mm+'/'+yyyy;
            }

            $scope.search = function(){
                if( $scope.existe == true){$scope.table.destroy(); $scope.existe = false; swal({title: 'Cargando Reporte'}); swal.showLoading();}
                if($scope.fechaini<= $scope.fechafin){
                    $http({
                        method: 'POST',
                        url: "php/prestaciones/reporteprestaciones.php",
                        data: {
                          inicio:$scope.fechaini,
                          fin:$scope.fechafin
                        }
                      }).then(function (response) {
                        if(response.data.length > 0){
                            if($scope.existe == true){
                              $scope.table.destroy();
                            }
                            $scope.data = response.data;
                            setTimeout(function () {
                              $scope.table = $('#reporte_prestaciones').DataTable({
                                  dom: 'Bfrtip',
                                  responsive: true,
                                  buttons: ['copy', 'csv', 'excel'],
                                  language: {"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"},
                                  lengthMenu: [[10, 50,-1], [10, 50,'Todas']],
                                  order: [[ 0, "desc" ]]
                              });
                              swal.close();
                            }, 500);
                            $scope.existe = true;
                          }else{
                            swal('Genesis informa','No se encontraro registros para este intervalo','warning');
                            $scope.table.destroy();
                          }
                        
                      });
                }  else{
                    swal('Genesis informa','Intervalo invalido','warning');
                }
                
               }

               $scope.buscaReporte = function(tr) {
                  if(tr==1){
                    $scope.plural = true;
                    $scope.individual = false;
                  }else{
                    if(tr==2){
                        $scope.plural = false;
                        $scope.individual = true;
                    }
                  }
               }

               $scope.buscaindividual = function(){
                   //documento$scope.existe2
                  $http({
                        method: 'POST',
                        url: "php/prestaciones/prestaciones.php",
                        data: {function: 'individual_prestaciones',
                                documento: $scope.documento}
                      }).then(function (response) {
                        if( $scope.existe2 == true){$scope.table2.destroy(); $scope.existe2 = false; swal({title: 'Cargando Reporte'}); swal.showLoading();}
                          $scope.usuario = response.data;
                          if($scope.usuario){
                          setTimeout(function () {
                            $scope.table2 = $('#individual_prestaciones').DataTable({
                                dom: 'Bfrtip',
                                responsive: true,
                                buttons: ['copy', 'csv', 'excel'],
                                language: {"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"},
                                lengthMenu: [[10, 50,-1], [10, 50,'Todas']],
                                order: [[ 0, "desc" ]]
                            });
                            swal.close();
                          }, 500);

                         } else{
                            swal('Genesis informa','Contactar al area TIC','warning');
                        }
                          $scope.existe2 = true;
                      });
              
                
               }

        }])
