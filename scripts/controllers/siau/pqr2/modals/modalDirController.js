'use strict';
angular.module('GenesisApp')
    .controller('modaldireccioncontroller', ['$scope', 'afiliacionHttp', function ($scope, afiliacionHttp) {
        $scope.selectViap = "0";
        $scope.numeroN = '';
        $scope.selectLetra = "0";
        $scope.selectnumero = '';
        $scope.bis = '';
        $scope.selectcuadrante = "0";
        $scope.numeroNVG = '';
        $scope.selectLetraVG = "0";
        $scope.numeroplaca = '';
        $scope.selectcuadranteVG = "0";
        $scope.complemento = '';
        $scope.dire = '';
        $scope.bistext = '';

        afiliacionHttp.obtenerViaPrincipal().then(function (response) {
            $scope.viaprincipal = response;
        })
        afiliacionHttp.obtenerLetra().then(function (response) {
            $scope.letras = response;
        })
        afiliacionHttp.obtenerCuadrante().then(function (response) {
            $scope.Cuadrantes = response;
        })

        $scope.changebis = function () {
            if ($scope.bis == true) {
                $scope.bistext = "BIS";
            } else {
                $scope.bistext = "";
            }
        }//Fin
        $scope.registrardireccion = function () {//Funcion para registrar la direccion y cerrar el modal
            $scope.modeldireccion = $("#direccionmodal").val().trim();
            $scope.closeThisDialog({ 'direccionModal': $scope.modeldireccion });
        }//Fin
    }])
