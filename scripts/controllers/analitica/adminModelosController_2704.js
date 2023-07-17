'use strict';
angular.module('GenesisApp')
    .controller('adminmodelosController', ['$scope', '$timeout', 'ngDialog', '$filter', '$http', '$sce', function ($scope, $timeout, ngDialog, $filter, $http, $sce) {

        $scope.tab = { number: 1 };

        $scope.tablero = {
            id_tablero: "",
            nombre: "",
            descripcion: "",
            area: "",
            iframe: "",
            icono: "",
            publico: "S",
            responsable: sessionStorage.getItem('cedula'),
            estado: "A"
        }

        $http({
            method: 'POST',
            url: "php/analitica/analitica.php",
            data: { function: 'p_lista_areas_general' }
        }).then(function ({ data }) {
            console.log(data);
            $scope.areas = data;
        })

        $scope.getTableros = function () {
            $http({
                method: 'POST',
                url: "php/analitica/analitica.php",
                data: { function: 'p_lista_tablero_general' }
            }).then(function ({ data }) {
                console.log(data);
                $scope.tableros = data;
            })
        }

        $scope.getTableros();


        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }


        $scope.saveModel = function () {
            console.log(JSON.stringify($scope.tablero));
            $http({
                method: 'POST',
                url: "php/analitica/analitica.php",
                data: { function: $scope.tablero.id_tablero ? 'p_modificacion_tablero' : 'p_inserta_tablero', tablero: JSON.stringify($scope.tablero) }
            }).then(function ({ data }) {
                console.log(data);
                swal(data.Codigo == '0' ? 'Completado' : 'No Completado', data.Nombre, data.Codigo == '0' ? 'success' : 'error');
                if (data.Codigo == '0') {
                    $scope.tab.number = 1;
                    $scope.getTableros();
                }




            })

        }
        $scope.getArea = function (params) {
            if (params) {
                const { AREC_NOMBRE } = $scope.areas.filter(item => item.AREN_CODIGO == params)[0];
                return AREC_NOMBRE;
            }


        }

        $scope.nuevo = function () {
            $scope.tablero = {
                id_tablero: "",
                nombre: "",
                descripcion: "",
                area: "",
                iframe: "",
                icono: "",
                publico: "S",
                responsable: sessionStorage.getItem('cedula'),
                estado: "A"
            }

            $scope.tab.number = 2;
        }

        $scope.edit = function (param) {
            $scope.tablero = {
                id_tablero: param.TABN_ID,
                nombre: param.TABC_NOMBRE,
                descripcion: param.TABC_DESCRIPCION,
                area: param.TABN_ID_AREA,
                iframe: param.TABC_IFRAME,
                icono: "",
                publico: "S",
                responsable: sessionStorage.getItem('cedula'),
                estado: param.TABC_ESTADO
            }
            $scope.tab.number = 2;
        }

        $scope.showModelo = function (params) {
            window.open(params.TABC_IFRAME);
        }

        $scope.delete = function (param) {
            $scope.tablero = {
                id_tablero: param.TABN_ID,
                nombre: param.TABC_NOMBRE,
                descripcion: param.TABC_DESCRIPCION,
                area: param.TABN_ID_AREA,
                iframe: param.TABC_IFRAME,
                icono: "",
                publico: param.TABC_PUBLICO,
                responsable: sessionStorage.getItem('cedula'),
                estado: param.TABC_ESTADO =='A' ?  'I': 'A'
            }            
            $scope.saveModel();

        }
        $scope.changeprivacidad = function (param) {
            $scope.tablero = {
                id_tablero: param.TABN_ID,
                nombre: param.TABC_NOMBRE,
                descripcion: param.TABC_DESCRIPCION,
                area: param.TABN_ID_AREA,
                iframe: param.TABC_IFRAME,
                icono: "",
                publico: param.TABC_PUBLICO == 'S' ? 'N' : 'S',
                responsable: sessionStorage.getItem('cedula'),
                estado: param.TABC_ESTADO 
            }                        
            $scope.saveModel();

        }
    }
    ])