'use strict';
angular.module('GenesisApp')
  .controller('certificadolaboralController', ['$scope', 'afiliacionHttp', 'notification', 'cfpLoadingBar', '$http', 'ngDialog', '$window',
  function ($scope, afiliacionHttp, notification, cfpLoadingBar, $http, ngDialog,$window) {

    $(document).ready(function () {
      $scope.documento = sessionStorage.getItem('cedula');
      $scope.sysdate = new Date();
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
    

        setTimeout(() => {
          $scope.$apply();
        }, 500);

    });
    $scope.Tipocertificado = "";
    $scope.buscar_numero = "";

    $scope.generaCertLaboral = function(){
        if($scope.Tipocertificado == "" || $scope.Tipocertificado == undefined || $scope.Tipocertificado ==null ||
          $scope.buscar_numero == "" || $scope.buscar_numero == undefined || $scope.buscar_numero == null){
            swal('Notificacion', "Por Favor Ingrese Numero de Documento y Seleccione Tipo de Certificado. ", 'info');
          } else {
              $window.open('views/talentohumano/certificados/imprimircertificadol.php?documento='+$scope.buscar_numero+'&tipocertificado='+$scope.Tipocertificado+'&inter='+$scope.interesado,'_blank', "width=1080,height=1100");
          }
    }
  }])
