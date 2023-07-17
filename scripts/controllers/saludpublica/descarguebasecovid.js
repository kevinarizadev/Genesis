'use strict';
angular.module('GenesisApp')
    .controller('descarguebasecovid', ['$scope', 'ngDialog', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter', '$timeout',
        function ($scope, ngDialog, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter, $timeout) {

            $(document).ready(function () {
                // $scope.mostrar_subgrupo();
                // $scope.validar_fase();
                // $scope.p_lista_fase();
                // $scope.p_lista_etapa();
                // $scope.p_lista_subgrupo();
                // $scope.Generar_Registro();

            });
            
            $scope.fases = "";
            $scope.etapas = "";
            $scope.sub_grupo = "";
            $scope.titulo = "DESCARGUE DE LA BASE (PLAN DE VACUNACION)";
            $scope.responsable = sessionStorage.getItem('cedula')
            $scope.nit = sessionStorage.getItem('nit')
            $scope.ente_territorial = sessionStorage.getItem('ente_territorial')
            $scope.ubicacion = ($scope.ente_territorial == 'S') ? (sessionStorage.getItem('ubicacion')) : (sessionStorage.getItem('municipio'));
            // $scope.ubicacion = $scope.ubicacion.toString();

            // console.log($scope.ente_territorial)
            // console.log($scope.nit)
            $scope.registro_nacimiento = function () {

            }

            $scope.cambiar_sub = function () {

            }

            // $scope.mostrar_subgrupo = function () {
            //     $http({
            //         method: 'POST',
            //         url: "php/saludpublica/planvacunacioncovid.php",
            //         data: { function: 'mostrar_subgrupo', fase: '2' }
            //     }).then(function (response) {
            //         $scope.respuesta_list = response.data;
            //     });
            // }



            // $http({
            //     method: 'POST',
            //     url: "php/saludpublica/planvacunacioncovid.php",
            //     data: { function: 'p_lista_fase' }
            // }).then(function (response) {
            //     $scope.respuesta_list1 = response.data;
            // });


            // $http({
            //     method: 'POST',
            //     url: "php/saludpublica/planvacunacioncovid.php",
            //     data: { function: 'p_lista_etapa', fase: '1' }
            // }).then(function (response) {
            //     $scope.respuesta_list2 = response.data;
            // });
            $scope.validar_fase = function(){
                swal({
                    title: 'Buscando...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                $http({
                    method: 'POST',
                    url: "php/saludpublica/planvacunacioncovid.php",
                    data: { function: 'p_lista_fase',  }
                }).then(function (response) { 
                    $scope.respuesta_list1 = response.data;
                    // $scope.validar_etapa();
                    swal.close();
                });
            }




            $scope.validar_etapa = function(fase){
                $scope.fases = fase;
                $scope.etapas="SELECCIONAR";
                swal({
                    title: 'Buscando...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                $http({
                    method: 'POST',
                    url: "php/saludpublica/planvacunacioncovid.php",
                    data: { function: 'p_lista_etapa', fase: $scope.fases }
                }).then(function (response) { 
                    $scope.respuesta_list2 = response.data;
                    // $scope.validar_etapa();
                    swal.close();
                });
            }

            
            $scope.validar_subgrupo = function (etapa) {
                $scope.etapas = etapa;
                $scope.sub_grupo="SELECCIONAR";
                swal({
                    title: 'Buscando etapas...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                $http({
                    method: 'POST',
                    url: "php/saludpublica/planvacunacioncovid.php",
                    data: { function: 'p_lista_subgrupo', fase:  $scope.fases, etapa: $scope.etapas }
                }).then(function (response) {
                    // $scope.sub_grupo = '';
                    $scope.respuesta_list3 = response.data;
                    swal.close();
                });
            }

            $scope.Generar_Registro = function () {
                console.log($scope.fases);
                console.log($scope.etapas);
                console.log($scope.sub_grupo);
                // $scope.nit = "800094386";
                // $scope.responsable = "8000943861";
                // $scope.fase = "1";
                // $scope.ubicacion = "8001";
                if ($scope.ente_territorial == 'S') {

                    $window.open('views/saludpublica/formatos/formato_descargue_covid_funcionario.php?&fase=' + $scope.fases + '&etapa=' + $scope.etapas + '&subgrupo=' + $scope.sub_grupo  + '&ubicacion=' + $scope.ubicacion);

                } else {

                    $window.open('views/saludpublica/formatos/formato_descargue_covid_funcionario.php?&fase=' + $scope.fases + '&etapa=' + $scope.etapas + '&subgrupo=' + $scope.sub_grupo  + '&ubicacion=' + $scope.ubicacion);
                }
            }




            // $scope.Generar_Registro = function () {
            //     console.log($scope.fases);
            //     console.log($scope.etapas);
            //     console.log($scope.sub_grupo);
            //     // $scope.nit = "800094386";
            //     // $scope.responsable = "8000943861";
            //     // $scope.fase = "1";
            //     // $scope.ubicacion = "8001";
            //     if ($scope.ente_territorial == 'S') {
            //         $http({
            //             method: 'POST',
            //             url: "php/saludpublica/planvacunacioncovid.php",
            //             data: { function: 'descargar_planvacunacion', nit: $scope.nit, fase: $scope.fases, responsable: $scope.responsable, ubicacion: $scope.ubicacion }
            //         }).then(function (response) {
            //             $scope.descarga = response.data;
            //         });

            //     } else {
            //         $http({
            //             method: 'POST',
            //             url: "php/saludpublica/planvacunacioncovid.php",
            //             data: { function: 'descargar_planvacunacion_func', fase: $scope.fases, etapa: $scope.etapas, subgrupo: $scope.sub_grupo,  ubicacion: $scope.ubicacion }
            //         }).then(function (response) {
            //             $scope.descarga = response.data;
            //         });

            //     }


            // }


        }]).filter('inicio', function () {
            return function (input, start) {
                if (input != undefined && start != NaN) {
                    start = +start;
                    return input.slice(start);
                } else {
                    return null;
                }

            }
        });