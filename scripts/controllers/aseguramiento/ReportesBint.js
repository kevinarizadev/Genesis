'use strict';
angular.module('GenesisApp')
  .controller('reportesbint', ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter', 'FileProcessor',
    function ($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter, FileProcessor) {

      $scope.OcultarBotonCargue = false;
      $scope.OcultarBotonValida = true;

      $scope.funcionario = sessionStorage.getItem('cedula');

      $scope.ValidaTabs = function () {
        if ($scope.funcionario === null || $scope.funcionario === 0 || $scope.funcionario == undefined) {
          swal('Genesis informa', 'Ingresar A Nuestro Portal Genesis', 'info');
        } else {
          if ($scope.funcionario === '72358057' || $scope.funcionario === '8646049' || $scope.funcionario === '1143457336' || $scope.funcionario === '72298162' || $scope.funcionario === '1129527381') {
            $scope.Ocultar = true;
            $scope.setTab(1);
          } else {
            $scope.Ocultar = false;
            $scope.setTab(2);
          }
        }
      }

      $scope.setTab = function (newTab) {
        $scope.tab = newTab;
        $(".tabI").removeClass("tabactiva");
        $(".tabII").removeClass("tabactiva");
        switch (newTab) {
          case 1:
            $(".tabI").addClass("tabactiva");
            $scope.ListarNovedadPendiente();
            break;
          case 2:
            $(".tabII").addClass("tabactiva");

            break;
          default:
        }
      }

      $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
      }

      $scope.ValidaArchivo = function () {
        return new Promise(function (resolve, reject) {
          var file = document.getElementById('adjunto').files[0];
          if (file) {
            if (file.name.split('.').pop().toLowerCase() == 'txt') {
              if (file.size === 0) {
                $scope.formato = `El archivo ${file.name} tiene un peso de  ${file.size} por favor validar el archivo.`;
                reject($scope.formato);
              } else {
                const data = new FormData();
                data.append('soporte', file);
                axios({
                  method: 'POST',
                  url: "php/aseguramiento/GestionReportes/MoveFile.php",
                  data
                }).then(function (r) {
                  if (r.data.codigo === 0) {
                    console.log(r.data);
                    resolve(r.data);
                  } else {
                    reject(r.data);
                  }

                });
              }

            } else {
              $scope.formato = 'Formato Invalido solo puedes adjuntar archivos con extensión .txt';
              reject($scope.formato);
            }

          } else {
            $scope.formato = 'No se encontro archivo para validar';
            reject($scope.formato);
          }
        });
      }

      $scope.cargarArchivo = function () {
        var promise = $scope.ValidaArchivo();
        promise.then((resultado) => {
          if (resultado.codigo == '0') {
            swal('Genesis Notifica', resultado.mensaje, 'success').then((result) => {
              $scope.ruta = resultado.ruta;
              $scope.OcultarBotonCargue = true;
              $scope.OcultarBotonValida = false;
              $scope.$apply();
            });
          } else {
            swal('Genesis Notifica', resultado.mensaje, 'info');
          }
        }).catch((resultado) => {
          swal('Genesis Notifica', resultado, 'error');
          console.log('Error: ' + resultado);
        });
      }

      $scope.validarArchivo = function () {
        $http({
          method: 'POST',
          url: "php/aseguramiento/GestionReportes/ValidaArchivo.php",
          data: { ruta: $scope.ruta }
        }).then(function (res) {
          $scope.codigo = res.data.codigo;
          switch ($scope.codigo) {
            case 1:
              swal('Genesis Notifica', res.data.mensaje, 'success').then((result) => {
                $scope.OcultarBotonCargue = false;
                $scope.OcultarBotonValida = true;
                $scope.DownloadErrorNov(res.data.error, 'ErrorActualizandoNovedades.txt');
                $scope.$apply();

              });
              break;
            case 2:
              swal('Genesis Notifica', res.data.mensaje, 'error').then((result) => {
                $scope.OcultarBotonCargue = false;
                $scope.OcultarBotonValida = true;
                $scope.DescargarErrores(res.data.error, 'InconvenienteEstructura.txt');
                $scope.$apply();
              });
              break;
            case 3:
              swal({
                title: 'Genesis Notifica',
                text: res.data.mensaje,
                type: 'warning',
                showCancelButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false
              }).then((result) => {
                $scope.OcultarBotonCargue = false;
                $scope.OcultarBotonValida = true;
                $scope.$apply();
              });
              break;
            case 4:
              swal({
                title: 'Genesis Notifica',
                text: res.data.mensaje,
                type: 'warning',
                showCancelButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false
              }).then((result) => {
                $scope.OcultarBotonCargue = false;
                $scope.OcultarBotonValida = true;
                $scope.DescargarErrores(res.data.error, 'InconvenienteInformación.txt');
                $scope.$apply();
              });
              break;
            default:
          }
        });
      }

      $scope.DescargarErrores = function (list, title) {
        $http({
          method: 'POST',
          url: "php/aseguramiento/GestionReportes/DescargarErrores.php",
          data: { data: list }
        }).then(function (res) {
          $scope.Limpiar();
          var element = document.createElement('a');
          element.setAttribute('href', 'data:plain/text;charset=utf-8,' + encodeURIComponent(res.data));
          element.setAttribute('download', title);
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
      }

      $scope.DownloadErrorNov = function (list, title) {
        $http({
          method: 'POST',
          url: "php/aseguramiento/GestionReportes/DownloadErrorNov.php",
          data: { data: list }
        }).then(function (res) {
          $scope.Limpiar();
          var element = document.createElement('a');
          element.setAttribute('href', 'data:plain/text;charset=utf-8,' + encodeURIComponent(res.data));
          element.setAttribute('download', title);
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
      }

      $scope.Limpiar = function () {
        $scope.adjunto = '';
        $scope.OcultarBotonCargue = false;
        $scope.OcultarBotonValida = true;
        document.getElementById('adjunto').value = "";
        document.getElementById('inputFilePlaceHolder').value = "";
        $scope.$apply();
      }

      $scope.ListarNovedadPendiente = function () {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Carganado Informacion...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/aseguramiento/GestionReportes/asegnov.php",
          data: {
            function: 'listar_nov_pendiente'
          }
        }).then(function (res) {
          $scope.listado = res.data;
          swal.close();
          if (res.data.length > 0) {
            if ($scope.estado == 'destruir') {
              $scope.tableinformacion.destroy();
            }
            $scope.estado = 'destruir';
            setTimeout(function () {
              $scope.tableinformacion = $('#informacion').DataTable({
                language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                lengthMenu: [[10, 50, -1], [10, 50, 'Todas']],
                order: [[0, "asc"]]
              });

            }, 500);

          } else {
            swal('Genesis informa', 'No hay Informacion para Mostrar', 'warning');
          }
        });
      }



      $scope.ProcesarNovedad = function (data) {
        swal({
          title: '¿Esta seguro que desea procesar las novedades?',
          showCancelButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Procesar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            $http({
              method: 'POST',
              url: "php/aseguramiento/GestionReportes/asegnov.php",
              data: { function: 'procesarnovedades', concepto_nov: data.CONCEPTO, fecha_nov: data.FECHA }
            }).then(function (res) {
              swal('Genesis Informa', res.data.mensaje, 'success').then((result) => {
                $scope.ListarNovedadPendiente();
              })
            });
          }
        })

      }

    }])
