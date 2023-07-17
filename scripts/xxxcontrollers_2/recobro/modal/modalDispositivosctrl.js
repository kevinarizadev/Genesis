'use strict';
angular.module('GenesisApp')
    .controller('modalDispositivosctrl', ['$scope', '$http', 'ngDialog',
        function ($scope, $http, ngDialog) {
            $scope.animacion = 'slideInRight';
            console.log($scope.info);
            $scope.modificacion = $scope.info[0];
            $scope.listModificaciones = $scope.info;
            $scope.actual = 0;
            $scope.total = $scope.info.length;


            $scope.verModificaciones = function (actual, opcion) {

                if (opcion == 'next') {
                    if ($scope.total == actual + 1) {
                        return;
                    } else {

                        // $scope.animacion = ' slideInRight';
                        document.querySelector('#med_table').classList.add('slideInRight');
                        $scope.actual = $scope.actual + 1;
                        $scope.modificacion = $scope.listModificaciones[actual];

                        setTimeout(() => {
                            document.querySelector('#med_table').classList.remove("slideInRight");
                        }, 1000);


                    }
                } else {
                    if (actual == 0) {
                        return;
                    } else {

                        document.querySelector('#med_table').classList.add('slideInLeft');
                        $scope.actual = $scope.actual - 1;
                        $scope.modificacion = $scope.listModificaciones[actual];
                        setTimeout(() => {
                            document.querySelector('#med_table').classList.remove("slideInLeft");
                        }, 1000);

                    }
                }

            }

            
            $scope.open_modal = function (modal, data) {
                $scope.info = data;
                switch (modal) {
                    case 'A':
                        $scope.info;
                        $scope.regimen;
                        ngDialog.open({
                            template: 'views/recobro/modal/modalDireccionar.html',
                            className: 'ngdialog-theme-plain',
                            controller: 'modalDireccionarctrl',
                            scope: $scope
                        });
                        break;
                        case 'B':
                            $scope.info;
                            $scope.regimen;
                            ngDialog.open({
                                template: 'views/recobro/modal/modalnoDireccionar.html',
                                className: 'ngdialog-theme-plain',
                                controller: 'modalnoDireccionarctrl',
                                scope: $scope
                            });
                        break;
                    default:
                        break;
                }

            }


        }]);


        //8