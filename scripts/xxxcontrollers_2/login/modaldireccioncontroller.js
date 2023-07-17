'use strict';
angular.module('GenesisApp')
    .controller('modaldireccioncontroller', ['$scope', 'afiliacionHttp', function ($scope, afiliacionHttp) {
   

        function letsWaitALittle() {
        $scope.selectViap = "";
        $scope.numeroN = '';
        $scope.selectLetra = "";
        $scope.selectnumero = '';
        $scope.bis = '';
        $scope.selectcuadrante = "";
        $scope.numeroNVG = '';
        $scope.selectLetraVG = "";
        $scope.numeroplaca = '';
        $scope.selectcuadranteVG = "";
        $scope.complemento = '';
        $scope.dire = '';
        $scope.bistext = '';

        }
        setTimeout(letsWaitALittle, 0);

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
