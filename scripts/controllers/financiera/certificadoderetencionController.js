'use strict';
angular.module('GenesisApp')
  .controller('certificadoderetencionController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {
        console.log($(window).width());
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_Pantalla();
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');

        $scope.SysDay = new Date();
        $scope.limpiarForm();
        setTimeout(() => {
          $scope.$apply();
        }, 500);


        //////////////////////////////////////////////////////////
      }
      // 901130562
      $scope.limpiarForm = function () {
        $scope.form = {
          
          empresa: '',
          anno: '',
          proveedor: '',
        };
        document.querySelector('#form_empresa').focus()
        ///
        document.querySelectorAll(".Valid_Campo").forEach(e => {
          e.classList.remove("Valid_Campo");
        });

        setTimeout(() => { $scope.$apply(); }, 500);
      }


      $scope.validarForm = function () {
        angular.forEach(document.querySelectorAll('#Form1 .Valid_Campo'), function (i) { i.classList.remove('Valid_Campo'); });
        if ($scope.form.empresa == '' || !$scope.form.empresa) {
          document.querySelector("#form_empresa").classList.add("Valid_Campo");
          return;
        }
        if ($scope.form.anno == '' || !$scope.form.anno) {
          document.querySelector("#form_anno").classList.add("Valid_Campo");
          return;
        }
        if ($scope.form.proveedor == '' || !$scope.form.proveedor) {
          document.querySelector("#form_proveedor").classList.add("Valid_Campo");
          return;
        }
        // empresa=901543211&anno=2022&proveedor=901130562&tipo=T
        window.open('views/financiera/formatos/formato_certificado_retencion.php?&empresa=' + $scope.form.empresa + '&anno=' + $scope.form.anno
          + '&proveedor=' + $scope.form.proveedor);

      }


      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
     

      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////

      $scope.getNum = function (val) {
        if (isNaN(val)) {
          return 0;
        }
        return val;
      }
      $scope.apply = function () {
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.Ajustar_Pantalla = function () {
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
      }

      $(window).on('resize', function () {
        $scope.Ajustar_Pantalla();
      });

      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

    }]);
