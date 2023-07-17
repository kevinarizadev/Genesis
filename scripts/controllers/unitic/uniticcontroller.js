'use strict';
angular.module('GenesisApp')
  .controller('uniticcontroller', ['$scope', '$http',
    function ($scope, $http) {
      $scope.Inicio = function () {
        $scope.Tabs = 1;
        console.log($(window).width());
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
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');

        $scope.SysDay = new Date();
        $scope.Obtener_Datos();
        setTimeout(() => {
          $scope.$apply();
        }, 500);
        //////////////////////////////////////////////////////////
      }
      $scope.Obtener_Datos = function () {
        //Link: "https://cajacopieps-my.sharepoint.com/:f:/g/personal/karen_alarcon_cajacopieps_onmicrosoft_com/EpJwVs8zUdNCoju8eOdEKFwBTJMRnUEGU22AJZ7-S1E0MA?e=fcBl3N"
        $scope.Datos = [
          {
            Descripcion: "Capacitaciones GoAnyWhere",
            Link: "https://cajacopieps-my.sharepoint.com/:f:/g/personal/regina_molina_cajacopieps_onmicrosoft_com/EuJGokxa7C9NgrsA9dcl4KkB-0Zv4AmdFXN-rWbB_8CtoA?e=o6lLUL"
            
          },
          {
            Descripcion: "Modelos Power BI",
            Link: "https://cajacopieps-my.sharepoint.com/personal/regina_molina_cajacopieps_onmicrosoft_com/_layouts/15/onedrive.aspx?originalPath=aHR0cHM6Ly9jYWphY29waWVwcy1teS5zaGFyZXBvaW50LmNvbS86ZjovZy9wZXJzb25hbC9yZWdpbmFfbW9saW5hX2NhamFjb3BpZXBzX29ubWljcm9zb2Z0X2NvbS9Fc3ZqLTBkT244cEFrYlNpdHpWbmdxMEJVaHgtWTlSaktoUFpUTTNlR0VVWi1nP3J0aW1lPW96NW1UMHFEMlVn&id=%2Fpersonal%2Fregina%5Fmolina%5Fcajacopieps%5Fonmicrosoft%5Fcom%2FDocuments%2FMODELOS%20POWER%20BI"
          }
        ]
      }
      $scope.Abrir_Link = function (link) {
        window.open(link);
      }


      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }


    }]);
