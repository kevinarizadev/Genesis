'use strict';
angular.module('GenesisApp')
  .controller('afiliacionpaginawebController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {
      $scope.Inicio = function () {
        $scope.cedula = sessionStorage.getItem('cedula');
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1300 && $(window).width() < 1500) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1500) {
          document.querySelector("#pantalla").style.zoom = 0.9;
        }
        $scope.SysDay = new Date();
        $scope.formConsulta = {
          finicio: $scope.SysDay,
          ffinal: $scope.SysDay,
        }
        $scope.Gestiones = [];
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      $scope.consultaGestion = function () {
        if ($scope.formConsulta.finicio != '' && $scope.formConsulta.ffinal != '' && $scope.cedula) {
          var finicio = new Date();
          var ffinal = new Date();
          finicio = $scope.GetFecha('finicio');
          ffinal = $scope.GetFecha('ffinal');
          $http({
            method: 'POST',
            url: "php/aseguramiento/AfiliacionPaginaweb.php",
            data: {
              function: 'getGestionAfiliacion',
              p_tipog: 'A',
              p_finicio: finicio,
              p_ffinal: ffinal,
              p_documento: $scope.cedula

            }
          }).then(function (response) {
            console.log(response.data);
            if (response.data.length > 0) {
              $scope.Gestiones = response.data;
            }
          });
        }
      }

      $scope.GetFecha = function (SCOPE) {
        var ahora_ano = $scope.formConsulta[SCOPE].getFullYear();
        var ahora_mes = ((($scope.formConsulta[SCOPE].getMonth() + 1) < 10) ? '0' + ($scope.formConsulta[SCOPE].getMonth() + 1) : ($scope.formConsulta[SCOPE].getMonth() + 1));
        var ahora_dia = ((($scope.formConsulta[SCOPE].getDate()) < 10) ? '0' + ($scope.formConsulta[SCOPE].getDate()) : ($scope.formConsulta[SCOPE].getDate()));
        return ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
      }

      $scope.download = function () {
        var finicio = new Date();
        var ffinal = new Date();
        finicio = $scope.GetFecha('finicio');
        ffinal = $scope.GetFecha('ffinal');
        if ($scope.Gestiones.length > 0) {
          window.open('views/aseguramiento/soporte/reporte_gestion_afiWeb.php?p_tipog=' + 'A' + '&p_finicio=' + finicio +
            '&p_ffinal=' + ffinal + '&p_documento=' + $scope.cedula, '_blank', "width=900,height=1100");
        }
      }

      if (document.readyState !== 'loading') {
        setTimeout(() => {
          $scope.Inicio();
        }, 500);
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          setTimeout(() => {
            $scope.Inicio();
          }, 1000);
        });
      }
    }])
