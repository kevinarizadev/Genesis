'use strict';
angular.module('GenesisApp')
  .controller('gestionacascontroller', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', 'communication', '$rootScope', '$interval',
    function ($scope, $http, notification, acasHttp, ngDialog, communication, $rootScope, $interval) {
      $scope.filtroarea = ' ';
      $scope.descripcion = '';
      $scope.filtroconcepto = ' ';
      $scope.filtromotivo = ' ';
      $scope.vw_prioridad = true;
      $scope.filtro = {
        tercero: false
      };
      $scope.descripcion = '';
      $scope.titulo = '';
      $scope.enlace = 0;
      $scope.filtrarestado = ' ';
      if ($(window).width() < 1100) {
        document.querySelector("#gacas").style.zoom = 0.7;
      }
      if ($(window).width() > 1100 && $(window).width() < 1300) {
        document.querySelector("#gacas").style.zoom = 0.8;
      }
      if ($(window).width() > 1300) {
        document.querySelector("#gacas").style.zoom = 0.9;
      }


      var dat = { prov: 'navb' }
      $.getJSON("php/obtenersession.php", dat).done(function (respuesta) {
        $scope.sesdata = respuesta;
        $scope.cedula = $scope.sesdata.cedula;
        $scope.ubicacion = $scope.sesdata.codmunicipio;
        acasHttp.obtenerInformacionCOCE($scope.cedula).then(function (response) {
          if (response.data.codigo == 0) {
            $scope.celular_info = response.data.celular;
            $scope.correo_info = response.data.correo;
            $scope.nombre_comp = $scope.sesdata.nombre;
            ngDialog.open({
              template: 'views/acas/actualizarinfofuncionario.html',
              //closeByDocument: false,
              //closeByEscape: false,
              //showClose:false,
              className: 'ngdialog-theme-default',
              width: '80%',
              controller: 'actinfofuncionariocontroller',
              controllerAs: 'actinfoctrl',
              scope: $scope
            })
          }
        })
      }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("navbar error obteniendo variables");
      });
      $scope.count = 0;
      $scope.obtenerlistaacas = function (type) {
        $scope.typedate = type;
        if (type == 'G') {
          $scope.titulo = "Mis Gestiones";
          $scope.estadoopciones = 'false';
          $scope.valorgestion = 'gestion';
        } else {
          $scope.titulo = "Mis Solicitudes";
          $scope.valorgestion = 'acas';
          $scope.estadoopciones = 'true';
        }
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        acasHttp.obtenerlistaacas(type, $scope.cedula).then(function (response) {
          if (response.data.codigo != -1 && response.data.codigo != "-1") {
            $scope.solicitudes = response.data;
            // $scope.cloneHeadFixed();
            $scope.numAcas(false, $scope.solicitudes);
          } else {
            $scope.solicitudes = [];
            // $scope.cloneHeadFixed();
            $scope.numAcas(true, $scope.solicitudes);
          }
          console.log($scope.solicitudes, $scope.count);
          setTimeout(() => {
            swal.close();
          }, 300);
        })
      }
      $scope.numAcas = function (value, list) {
        $scope.count = 0;
        for (const i in list) {
          if (list.hasOwnProperty(i)) {
            const element = list[i];
            if (!value && element.ESTADO == "Activo" || value && element.ESTADO == "Procesado") {
              $scope.count++;
            }
          }
        }
        $("#tabla_scroll").scrollTop(0);
      }
      // $scope.cloneHeadFixed = function () {
      //   setTimeout(() => {
      //     var original = $('#tablaGacas>thead');
      //     var clone = $('#tablaGacas>thead').clone();
      //     var list = original[0].children[0].children;
      //     for (var i = 0; i < list.length; i++) {
      //       clone[0].children[0].children[i].style.width = list[i].offsetWidth + "px";
      //     }
      //     $('#tablaClone').html(clone).css("width", original[0].parentElement.offsetWidth + "px");
      //   }, 150);
      // }
      // $(".scroll_x").on("scroll", function () {
      //   $(".scroll_x").scrollLeft($(this).scrollLeft());
      // });
      // $(window).resize(function () {
      //   $scope.cloneHeadFixed();
      // });
      $scope.actualizarlistaacas = function () {
        var type = ''
        if ($scope.titulo == "Mis Gestiones") { type = 'G' } else { type = 'A' }
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Actualizando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        acasHttp.obtenerlistaacas(type, $scope.cedula).then(function (response) {
          if (response.data.codigo != -1 && response.data.codigo != "-1") {
            $scope.solicitudes = response.data;
          } else {
            $scope.solicitudes = [];
            // $scope.cloneHeadFixed();
            $scope.numAcas(true, $scope.solicitudes);
          }
          setTimeout(() => {
            swal.close();
          }, 300);
        })
      }


      $rootScope.$on('ngDialog.closed', function (e, $dialog) {
        $dialog[0].title = '2';
        acasHttp.obtenerlistaacas($scope.typedate, $scope.cedula).then(function (response) {
          $scope.solicitudes = response.data;
        })
      });

      $scope.obtenertranfer = function (numero, ubicacion) {
        $scope.numeroacas = numero;
        $scope.ubicacionacas = ubicacion;
        ngDialog.open({
          template: 'views/acas/acastranfer.html',
          className: 'ngdialog-theme-plain',
          controller: 'acastranfercontroller',
          scope: $scope,
          preCloseCallback: function () {
            if ($scope.check_option == true) {
              $scope.obtenerlistaacas('G');
            } else {
              $scope.obtenerlistaacas('A');
            }
            return true;
          }
        });
      }

      $scope.obteneracasinfo = function (numero, ubicacion, descripcion, estado, motivo, concepto, adjunto, oficina, fecha, cod_concepto) {
        $scope.numeroacas = numero;
        $scope.ubicacionacas = ubicacion;
        $scope.descripcionacas = descripcion;
        $scope.estadoacas = estado;
        $scope.motivoacas = motivo;
        $scope.conceptoacas = concepto;
        $scope.adjuntoacas = adjunto;
        $scope.codigo_concepto = cod_concepto;
        $scope.oficina = oficina ? oficina : null;
        $scope.fecha = fecha;
        ngDialog.open({
          template: 'views/acas/acasinfo.html',
          className: 'ngdialog-theme-plain',
          controller: 'acasinfocontroller',
          scope: $scope,
          preCloseCallback: function () {
            if ($scope.check_option == true) {
              $scope.obtenerlistaacas('G');
            } else {
              $scope.obtenerlistaacas('A');
            }
            return true;
          }
        });
      }
      setTimeout(() => {
        $scope.obtenerlistaacas('A');
      }, 1000);

      $scope.reverse2 = true;
      $scope.sortBy2 = function (propertyName2) {
        $scope.reverse2 = ($scope.propertyName2 === propertyName2) ? !$scope.reverse2 : false;
        $scope.propertyName2 = propertyName2;
      };
      $scope.sortBy2('dias');
    }]);