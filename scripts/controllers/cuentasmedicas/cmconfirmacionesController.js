'use strict';
angular.module('GenesisApp')
  .controller('cmconfirmacionesController', ['$scope', 'afiliacionHttp', 'notification', 'cfpLoadingBar', '$http', 'ngDialog', 
  function ($scope, afiliacionHttp, notification, cfpLoadingBar, $http, ngDialog) {


    $(document).ready(function () {
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

        $scope.Tabs = 0;
        $('.tabs').tabs();
        $scope.Vista = 0;
        $scope.Tap = 1;
        $('.tabs').tabs();

        setTimeout(() => {
          $scope.$apply();
        }, 500);

    
    });
 $scope.setTab = function (x) {
                $scope.Tap = x;
                setTimeout(function () {
                  $scope.$apply();
                }, 500)
              }
      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      $scope.validararchivo1 = function (){
        $scope.inputFile1 = document.querySelector('#anexo2adj1');
        var archivo = $scope.inputFile1.files[0].name.split(".");
        var tamano = $scope.inputFile1.files[0].size
        var ext = archivo[1];
            if (tamano <= 253600000) { // se valida el tamaño del archivo
                if (ext.toUpperCase() == 'TXT') { //se valida el tipo del archivo
                  $scope.getBase64($scope.inputFile1.files[0]).then(function (result) {
                    $scope.archivocargar1 = result;
                  });
                } else {
                    swal('Tipo de archivo incorrecto', 'Extension del archivo incorrecta debe ser .txt', 'warning')
                    $scope.nombrearchivo1 = "";
  
                }
            } else {
                swal('TAMAÑO EXCEDIDO', 'Archivo no debe superar los 11 megabytes', 'error')
                $scope.nombrearchivo1 = "";
  
            }
      }
      $scope.insertar_listado1 = function () {
        swal({
          title: "Insertar Registros",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          type: "question"
        }).then(function (resp) {
          if (resp) {
            swal({ title: 'Cargando...' });
        swal.showLoading();
            $http({
              method: "POST",
              url: "php/cuentasmedicas/cmconfirmaciones.php",
              data: {
                function: "Cargar_Confirma",
                archivo: $scope.archivocargar1,
              },
            }).then(function (response) {
              swal.close();
              if (response.data.toString().substr(0, 3) != '<br') {
                if (response.data != undefined) {
                  swal({
                    title: "EXITOSO",
                    text: 'Registros insertados',
                    type: "success"
                  })
                }
              } else {
                swal({
                  title: "¡IMPORTANTE!",
                  text: response.data,
                  type: "warning"
                }).catch(swal.noop);
              }
            });
          }
        });
      };
      $scope.validararchivo = function (){
        $scope.inputFile = document.querySelector('#anexo2adj');
        var archivo = $scope.inputFile.files[0].name.split(".");
        var tamano = $scope.inputFile.files[0].size
        var ext = archivo[1];
            if (tamano <= 253600000) { // se valida el tamaño del archivo
                if (ext.toUpperCase() == 'TXT') { //se valida el tipo del archivo
                  $scope.getBase64($scope.inputFile.files[0]).then(function (result) {
                    $scope.archivocargar = result;
                  });
                } else {
                    swal('Tipo de archivo incorrecto', 'Extension del archivo incorrecta debe ser .txt', 'warning')
                    $scope.nombrearchivo1 = "";
  
                }
            } else {
                swal('TAMAÑO EXCEDIDO', 'Archivo no debe superar los 11 megabytes', 'error')
                $scope.nombrearchivo1 = "";
  
            }
      }
      $scope.insertar_listado = function () {
        swal({
          title: "Insertar Registros",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          type: "question"
        }).then(function (resp) {
          if (resp) {
            swal({ title: 'Cargando...' });
        swal.showLoading();
            $http({
              method: "POST",
              url: "php/cuentasmedicas/cmconfirmaciones.php",
              data: {
                function: "Cargar_fecha",
                archivo: $scope.archivocargar,
              },
            }).then(function (response) {
              if (response.data.toString().substr(0, 3) != '<br') {
                swal.close();
                  swal({
                    title: "EXITOSO",
                    text: 'Registros Actualizados',
                    type: "success"
                  })
              } else {
                swal({
                  title: "¡IMPORTANTE!",
                  text: response.data,
                  type: "warning"
                }).catch(swal.noop);
              }
            });
          }
        });
      };
  }])
