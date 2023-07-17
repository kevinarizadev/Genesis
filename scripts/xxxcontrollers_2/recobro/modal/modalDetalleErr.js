'use strict';
angular.module('GenesisApp')
    .controller('modalDetalleErr', ['$scope', '$http', 'ngDialog',
        function ($scope, $http, ngDialog) {
            // console.log($scope.info);
            $scope.marihuana = [];
            $scope.hide_table =true;
           if ($scope.case== 'modal') {
            $scope.convert = function() {
                Object.keys($scope.info.ModelState).forEach(item => {
                    // console.log(item);
                    if (item.startsWith('direccionamiento.')) {
                        $scope.marihuana.push({
                            variable:item.split('direccionamiento.')[1],
                            mensaje: $scope.info.ModelState[item][0]
                        })
                    }
                    // return newItem;               
                })
                $scope.hide_table_m=false;
                $scope.hide_table_e=true;
               } 
             
                $scope.convert();
           } else {
                if ($scope.case== 'err') {
                    $scope.hide_table_e=false;
                    $scope.hide_table_m=true;
                    console.log($scope.info);
                    // $scope.convert();
               }else{
                    swal('¿Quo vadis Domine?','No todo el que no conoce su camino está perdido amiguito','warning')
               }
           }
            
               
           console.log($scope.info);
            
        }]);