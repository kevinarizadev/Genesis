'use strict';
angular.module('GenesisApp')
    .controller('modalDetTutelactrl', ['$scope', '$http', 'ngDialog',
        function ($scope, $http, ngDialog) {



            $scope.medico = $scope.info.TipoIDProf + ". " + $scope.info.NumIDProf + " - " + $scope.info.PNProfS + " " + $scope.info.SNProfS + " " + $scope.info.PAProfS + " " + $scope.info.SAProfS + " ";
            $scope.afiliado = $scope.info.TipoIDPaciente + ". " + $scope.info.NroIDPaciente + " - " + $scope.info.PNPaciente + " " + $scope.info.SNPaciente + " " + $scope.info.PAPaciente + " " + $scope.info.SAPaciente + " ";
            $scope.animacion = 'slideInRight';
            $scope.modificacion = $scope.info;
            $scope.actual = 0;
            $scope.total = $scope.info.length;

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
                }

            }

            // $scope.nom_dia = $scope.nombre_dx();
            $scope.nombre_dx = function (dx, retorno) {
                if (dx === null) {
                    retorno("Sin Diagnostico")                    
                } else {
                    
                    $http({
                        method: 'POST',
                        url: "php/censo/censo.php",
                        data: {
                            function: 'listaDiagnosticos',
                            keyword: dx,
                            sexo: "",
                            edad: "",
                            nacido: ""
                        }
                    }).then(function (response) {
                        retorno(response.data[0].CODIGO + " - " + response.data[0].NOMBRE)
                    });      
                }
            }

            
            
            $scope.nombre_dx($scope.info.CodDxMotS1, function (dx) {
                $scope.CodDxMotS1 = dx;
            });
            $scope.nombre_dx($scope.info.CodDxMotS2, function (dx) {
                $scope.CodDxMotS2 = dx;
            });
            $scope.nombre_dx($scope.info.CodDxMotS3, function (dx) {
                $scope.CodDxMotS3 = dx;
            });
            $scope.nombre_dx($scope.info.CodDxPpal, function (dx) {
                $scope.CodDxPpal = dx;
            });
            $scope.nombre_dx($scope.info.CodDxRel1, function (dx) {
                $scope.CodDxRel1 = dx;
            });
            $scope.nombre_dx($scope.info.CodDxRel2, function (dx) {
                $scope.CodDxRel2 = dx;
            });


            //  nom_dia_mot

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


        }]);


        //8