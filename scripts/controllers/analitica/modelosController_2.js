'use strict';
angular.module('GenesisApp')
    .controller('modelosController', ['$scope', '$timeout', 'ngDialog', '$filter', '$http', '$sce', function ($scope, $timeout, ngDialog, $filter, $http, $sce) {
        $scope.panel = { activo: 1, titulo: "", ttemp: "" };
        $scope.listareas = [];
        $scope.listacas = [];

        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        // $http({
        //     method: 'GET',
        //     url: "json/check_tic.json"
        // }).then(function (response) {

        $scope.getAreas = function () {
            $http({
                method: 'POST',
                url: "php/analitica/analitica.php",
                data: { function: 'p_lista_areas_funcionario', funcionario: sessionStorage.getItem('cedula') }
            }).then(function ({ data }) {
                console.log(data);
                $scope.listareas = data.Codigo == 1 ? [] : data;

                if (data.Codigo == 1) {
                    swal('Info', data.Nombre, 'info');
                }
            })

        }

        $scope.getAreas();

        $scope.listmodelos = [
            {
                "orden": 1,
                "nombre": "Modelo 1",
                "url": "https://app.powerbi.com/view?r=eyJrIjoiN2YzMGQ4MDUtMzI2OC00OTdkLTljNGYtYWQ0MmE2Mjk0MzEyIiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9",
                "info": true
            },
            {
                "orden": 2,
                "nombre": "Model 2",
                "url": "https://app.powerbi.com/view?r=eyJrIjoiN2YzMGQ4MDUtMzI2OC00OTdkLTljNGYtYWQ0MmE2Mjk0MzEyIiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9",
                "info": true
            },
            {
                "orden": 3,
                "nombre": "Modelo 3",
                "url": "https://app.powerbi.com/view?r=eyJrIjoiN2YzMGQ4MDUtMzI2OC00OTdkLTljNGYtYWQ0MmE2Mjk0MzEyIiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9",
                "info": true
            },
            {
                "orden": 4,
                "nombre": "Modelo 4",
                "url": "https://app.powerbi.com/view?r=eyJrIjoiN2YzMGQ4MDUtMzI2OC00OTdkLTljNGYtYWQ0MmE2Mjk0MzEyIiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9",
                "info": true
            }


        ]

        swal.close();

        // })
        $scope.getModelos = function (param) {
            $scope.panel.activo = 2;
            $scope.panel.titulo = "Modelos de " + param.AREC_NOMBRE;
            $scope.panel.ttemp = "Modelos de " + param.AREC_NOMBRE;
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
                url: "php/analitica/analitica.php",
                data: { function: 'p_lista_tablero_funcionario', funcionario: sessionStorage.getItem('cedula'), area: param.AREN_CODIGO }
            }).then(function ({ data }) {
                console.log(data);
                $scope.listmodelos = data;
                for (let index = 0; index < $scope.listmodelos.length; index++) {
                    $scope.listmodelos[index].info = true;

                }
                swal.close();
            })



        }


        $scope.getModelo = function (tempmodelo) {
            $scope.panel.activo = 3;
            $scope.panel.titulo = tempmodelo.TABC_NOMBRE;
            $scope.panel.temtitulo = tempmodelo.TABC_NOMBRE;
            $scope.tempmodelbi = tempmodelo;
            console.log(tempmodelo);
        }

        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }


        $scope.changePanel = function () {
            if ($scope.panel.activo == 2) {
                $scope.panel.activo = 1;
            } else if ($scope.panel.activo == 3) {
                $scope.panel.activo = 2;
                $scope.panel.titulo = $scope.panel.ttemp;
            }
        }








    }
    ]).filter('startFrom', function () {
        return function (input, start) {
            if (input != undefined) {
                start = +start;
                return input.slice(start);
            }
        }
    });