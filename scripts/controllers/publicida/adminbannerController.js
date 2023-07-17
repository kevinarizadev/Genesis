'use strict';
angular.module('GenesisApp')
  .controller('adminbannerController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {
        // $scope.check_option = false;
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
        document.getElementById("pantalla").parentElement.parentElement.parentElement.style.paddingBottom = '0px';
        document.getElementById("pantalla").parentElement.parentElement.parentElement.style.backgroundColor = 'white';
        $scope.sysDate = new Date();
        $scope.carrusel = 0;

        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.loadFiles = async function () {
        $scope.carrusel = 0;
        $scope.rutas = [];
        $scope.rutas2 = [];
        $scope.B64 = [];
        $scope.images = [];
        $scope.nombres = [];
        $scope.exts = [];
        var excedetamano = false;
        var tipoFile = false;
        var size0 = false;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
        $scope.images = document.querySelector("#images").files;
        for (let i = 0; i < $scope.images.length; i++) {
          if ($scope.images[i].size > 1048576) {
            excedetamano = true;
          }
          if ($scope.images[i].name.split('.')[1].toUpperCase() != 'JPG') {
            tipoFile = true;
          }
          if ($scope.images[i].size == 0) {
            size0 = true;
          }
        }
        if (excedetamano) {
          swal({
            title: "¡IMPORTANTE!",
            text: 'Tamaño excedido, cada imagen no debe superar 1 Megabits',
            type: "info",
          }).catch(swal.noop);
        }
        if (tipoFile) {
          swal({
            title: "¡IMPORTANTE!",
            text: 'Formato incorrecto, las imagenes deben ser formato "JPG"',
            type: "info",
          }).catch(swal.noop);
        }
        if (size0) {
          swal({
            title: "¡IMPORTANTE!",
            text: '¡Alguno(s) de los archivos seleccionados está vacio!',
            type: "info",
          }).catch(swal.noop);
        }
        if (!excedetamano && !tipoFile && !size0) {
          $scope.CargarImages().then(function (result) {
            if (!result) {
              // $scope.peticion().then(function (result) {
              //   if (!result) {
              //     $scope.Limpiar();
              //     setTimeout(() => {
              //       $scope.$apply();
              //     }, 1000);
              //   } else {
              //     swal({
              //       title: "¡IMPORTANTE!",
              //       text: '¡Ocurrio un error inesperado, vuelve a intentarlo!',
              //       type: "info",
              //     }).catch(swal.noop);
              //   }
              // });
            } else {
              swal({
                title: "¡IMPORTANTE!",
                text: '¡Ocurrio un error inesperado, vuelve a intentarlo!',
                type: "info",
              }).catch(swal.noop);
            }
          });
        }
      }

      $scope.VistaPrevia = function () {
        $scope.carrusel = 1;
        var html = '';
        for (let i = 0; i < $scope.rutas.length; i++) {
          html += '<a class="carousel-item-gallery default-background"><img src="' + $scope.rutas[i] + '" alt=""></a>';
        }
        swal({ title: 'Construyendo...', allowOutsideClick: false });
        swal.showLoading();
        setTimeout(() => {
          swal.close();
          $("#test").html(html);
          $('.gallery-carousel').gallery_carousel();
          $scope.$apply();
        }, 1000);

      }

      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      $scope.Limpiar = function () {
        if ($scope.images != null && $scope.images != undefined && $scope.images != '') {
          document.querySelector('#images').value = '';
          $scope.images = '';
        }
        setTimeout(() => {
          $scope.$apply();
        }, 1000);
      }

      $scope.CargarImages = function () {
        return new Promise((resolve) => {
          for (let i = 0; i < $scope.images.length; i++) {
            $scope.getBase64($scope.images[i]).then(
              data => $scope.B64.push({ archivo: data })
            );
            var mes = ($scope.sysDate.getMonth() + 1).toLocaleString() < 10 ? '0' + ($scope.sysDate.getMonth() + 1).toLocaleString() : ($scope.sysDate.getMonth() + 1).toLocaleString();
            var ano = $scope.sysDate.getFullYear().toLocaleString();
            //var nombre = Math.floor(new Date().valueOf() * Math.random());
            var d = new Date();
            const j = (i < 10) ? ('0' + i) : i;
            var nombre = 'FOTO_' + j;

            var ext = '.' + $scope.images[i].name.split('.')[1];
            $scope.nombres.push(nombre);
            $scope.exts.push(ext);
          }
          setTimeout(() => {
            resolve(false);
          }, 1000);
        });
      }


      if (document.readyState !== 'loading') {
        setTimeout(() => {
          $scope.Inicio();
        }, 1000);
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

    }])
