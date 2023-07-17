'use strict';
angular.module('GenesisApp')
  .controller('adminempleadomesController', ['$scope', '$http', 'ngDialog', 'afiliacionHttp', '$rootScope', '$window',
    function ($scope, $http, ngDialog, afiliacionHttp) {

      $scope.Inicio = function () {
        $scope.sw();
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
              $scope.peticion().then(function (result) {
                if (!result) {
                  $scope.Limpiar();
                  setTimeout(() => {
                    $scope.$apply();
                  }, 1000);
                } else {
                  swal({
                    title: "¡IMPORTANTE!",
                    text: '¡Ocurrio un error inesperado, vuelve a intentarlo!',
                    type: "info",
                  }).catch(swal.noop);
                }
              });
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
            const j = (i < 10) ? ('0'+i) : i;
            var nombre = 'FOTO_'+j;

            var ext = '.' + $scope.images[i].name.split('.')[1];
            $scope.nombres.push(nombre);
            $scope.exts.push(ext);
          }
          setTimeout(() => {
            resolve(false);
          }, 1000);
        });
      }

      $scope.peticion = function () {
        return new Promise((resolve) => {
          for (let i = 0; i < $scope.images.length; i++) {
            $http({
              method: 'POST',
              url: "php/talentohumano/adminempleadomes.php",
              data: {
                function: 'subir',
                archivobase: $scope.B64[i].archivo,
                nombre: $scope.nombres[i],
                ext: $scope.exts[i],
              }
            }).then(function (response) {
              if (response.data.substr(0, 4) == 'temp') {
                $scope.rutas.push(response.data);
              } else {
                resolve(true);
              }
            });
          }
          $scope.rutas2 = $scope.rutas;
          setTimeout(() => {
            resolve(false);
          }, 1000);
        });
      }


      $scope.peticionRutas = function () {
        return new Promise((resolve) => {
          for (let i = 0; i < $scope.B64.length; i++) {
            $http({
              method: 'POST',
              url: "php/talentohumano/adminempleadomes.php",
              data: {
                function: 'guardarFiles',
                archivobase: $scope.B64[i].archivo,
                nombre: $scope.nombres[i],
                ext: $scope.exts[i],
              }
            }).then(function (response) {
              if (response.data.substr(0, 6) == 'images') {
                $scope.rutas.push(response.data);
                $scope.rutas2.push({ ruta: response.data });
              } else {
                swal({
                  title: "¡IMPORTANTE!",
                  text: '¡Ocurrio un error inesperado, vuelve a intentarlo!',
                  type: "info",
                }).catch(swal.noop);
              }
            });
            setTimeout(() => {
              resolve(false);
            }, 1000);
          }
          });
      }

      $scope.guardar = function () {
        swal({
          title: "Estas Seguro",
          text: '¡Esta accion Eliminara las imagenes anteriormente cargadas, ¿Desea continuar?!',
          type: "question",
          showCancelButton: true,
          allowOutsideClick: false
        }).catch(swal.noop)
          .then((willDelete) => {
            if (willDelete) {
              $http({
                method: 'POST',
                url: "php/talentohumano/adminempleadomes.php",
                data: {
                  function: 'limpiarDir',
                }
              });
              $scope.rutas = [];
              $scope.rutas2 = [];
              swal({ title: 'Cargando...', allowOutsideClick: false });
              swal.showLoading();
              $scope.peticionRutas().then(function (result) {
                if(!result){
                  setTimeout(() => {
                    $scope.$apply();
                    $scope.guardaRutas();
                  }, 5000);
                }
              });
            } else {
              swal({
                title: "Mensaje",
                text: 'Operacion Cancelada',
                type: "error",
              }).catch(swal.noop);
            }
          })
      }

      $scope.guardaRutas = function () {
        
        if ($scope.rutas2.length > 0) {
          $http({
            method: 'POST',
            url: "php/talentohumano/adminempleadomes.php",
            data: {
              function: 'guardarRutas',
              rutas: JSON.stringify($scope.rutas2),
              longitud: $scope.rutas2.length,
              responsable: sessionStorage.getItem('cedula')
            }
          }).then(function (response) {
            if (response.data.codigo == 0) {
              swal({
                title: "¡IMPORTANTE!",
                text: 'Imagenes Cargadas Exitosamente',
                type: "success",
              }).catch(swal.noop);
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

      $scope.swCarrusel = function () {
        // swEmpleadoMes
        // console.log($scope.check_option);
        // localStorage.setItem('swEmpleadoMes', !$scope.check_option);
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        var estado = $scope.check_option != true ? 'A' : 'I';
        var toast = estado == 'A' ? 'Habilitado' : 'inhabilitado'
        $http({
          method: 'POST',
          url: "php/talentohumano/adminempleadomes.php",
          data: {
            function: 'swEmpleadoMes',
            estado: estado,
          }
        }).then(function (response) {
          swal.close();
          Materialize.toast('¡carousel ' + toast + '¡', 1000);
        });
      }

      $scope.sw = function () {
        $http({
          method: 'POST',
          url: "php/talentohumano/adminempleadomes.php",
          data: {
            function: 'litarEmpleadosMes',
          }
        }).then(function (response) {
          $scope.check_option = response.data[1].estado.estado != 'A' ? true : false;
          // setTimeout(() => {
          //   $scope.$apply();
          // }, 1000);
          console.log($scope.check_option);
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
