'use strict';
angular.module('GenesisApp')
  .controller('siauconsultapqrdsController', ['$scope', 'notification', '$http', '$filter', '$q', function ($scope, notification, $http, $filter, $q) {

    $(document).ready(function () {
        $scope.Obtener_Tipos_Documentos();
        $.getJSON("php/obtenersession.php").done(function (respuesta) {
            $scope.sesdata = respuesta;
            sessionStorage.setItem('tipo', $scope.sesdata.tipo);
            sessionStorage.setItem('documento', $scope.sesdata.cedula);
        })
    });
    console.log($scope.sesdata);
            
        $scope.showform = false;
        $scope.search = {
            tipodocumento: '',
            // tipodocumento: sessionStorage.getItem('tipo'),
            documento: '',
            // documento: sessionStorage.getItem('documento'),
            pqrds: ""
        }
        $scope.cont = 0;

        $scope.Obtener_Tipos_Documentos = function () {
            $http({
                method: "POST",
                url: "php/afiliados/siauconsultapqrds.php",
                data: { function: 'Obtener_Tipos_Documentos', Tipo: 'S' }
            }).then(function (response) {
                console.log(response);
                $scope.Tipos_Documentos = response.data;
            })
        }

        

        $scope.serchpqrds = function () {
            $http({
                method: 'POST',
                url: "php/afiliados/siauconsultapqrds.php",
                data: { function: 'p_obtener_pqr_x_estado_actual',
                 tipodocumento: $scope.search.tipodocumento,
                 documento: $scope.search.documento, 
                 pqrds: $scope.search.pqrds }
            }).then(result => {
                const { CODIGO } = result.data;
                if (CODIGO == '0') {
                    $scope.statepqr = {
                        CODIGO_ESTADO: result.data.CODIGO_ESTADO,
                        ENTREGA: result.data.ENTREGA,
                        ESTADO: result.data.ESTADO,
                        GESTION: result.data.GESTION,
                        RADICACION: result.data.RADICACION,
                        RESPUESTA: result.data.RESPUESTA
                    }
                    $scope.showform = true;
                    setTimeout(() => {
                        $scope.Evaluar();
                        $scope.$apply();
                    }, 300);
                }
                if (CODIGO == '1') {
                    swal('Importante', 'No se encontraron resultados.', 'info');

                }
            })
        }

        $scope.cancelform = function () {
            $scope.showform = false;
            $scope.search = {
                tipodocumento: "",
                documento: "",
                pqrds: ""
            }
            $scope.cont = 0;
        }

        $scope.reqpqrds = function () {
            $scope.cont += 1;
            if ($scope.cont == 5) { $scope.cancelform() } else {
                $http({
                    method: 'POST',
                    url: "php/afiliados/siauconsultapqrds.php",
                    data: { function: 'p_solicitar_resp',
                     tipodocumento: $scope.search.tipodocumento,
                     documento: $scope.search.documento, 
                     pqrds: $scope.search.pqrds }
                }).then(result => {
                    swal(result.CODIGO == '0' ? 'Solicitud Realizada' : 'Mensaje', result.MENSAJE, result.CODIGO == '0' ? 'success' : 'info');
                });
            }
        }

        $scope.Evaluar = function () {
            var Estado = 'RADICACIÓN';
            if ($scope.statepqr.RADICACION == 'S') { Estado = 'RADICADA'; }
            if ($scope.statepqr.GESTION == 'S') { Estado = 'EN GESTIÓN'; }
            if ($scope.statepqr.RESPUESTA == 'S') { Estado = 'EN RESPUESTA'; }
            if ($scope.statepqr.ENTREGA == 'S') { Estado = 'ENTREGADA'; }
            $scope.Estado = Estado;
        }
        $scope.FormatSoloNumero = function (NID) {
            const input = document.getElementById('' + NID + '');
            var valor = input.value;
            valor = valor.replace(/[^0-9]/g, '');
            input.value = valor;
        }

    }]);