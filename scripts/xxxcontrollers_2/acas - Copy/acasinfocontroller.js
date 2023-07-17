'use strict';
angular.module('GenesisApp')
  .controller('acasinfocontroller', ['$scope', '$http', 'acasHttp', '$rootScope', 'communication', 'ngDialog', 'notification',
    function ($scope, $http, acasHttp, $rootScope, communication, ngDialog, notification) {
      $scope.panelIC = false;
      $scope.cod_acas = $scope.numeroacas;
      $scope.cod_estado = $scope.estadoacas;
      $scope.cod_motivo = $scope.motivoacas;
      $scope.cod_concepto = $scope.conceptoacas;
      $scope.cod_descripcion = $scope.descripcionacas;
      $scope.cod_adjunto = $scope.adjuntoacas;
      $scope.cod_oficina = $scope.oficina;
      $scope.cod_fecha = $scope.fecha;
      $scope.cod_misacas = $scope.estadoopciones;
      $scope.observacion = '';

      $http({
        method: 'POST',
        url: "php/acas/obtener_infor_afiltemp.php",
        data: {
        acas_codigo: $scope.numeroacas
      }
      }).then(function (response) {
        if (response.data.hide == 1) {
          $scope.infoAfiliado = false;
          $scope.data_afil_temp = response.data;
        }else{
          $scope.infoAfiliado = true;
        }
      });

      $scope.descargafile = function (ruta) {
        $http({
          method: 'POST',
          url: "php/getfileFtp.php",
          data: {
            ruta: ruta
          }
        }).then(function (response) {
          //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
          window.open("temp/" + response.data);
        });
      }
      acasHttp.mostrarcomentarios('RE', $scope.numeroacas, $scope.ubicacionacas).then(function (response) {
        $scope.estadopanelopciones();
        if (response.data.codigo == -1) {
          $scope.cod_comentario = 0;
        } else {
          $scope.comentarios = response.data;
          $scope.cod_comentario = $scope.comentarios.length;
          setTimeout(function () {
            $("#chat_comment")[0].scrollTop = $("#chat_comment")[0].scrollHeight;
          }, 300);
        }
      })
      $scope.estadopanelopciones = function () {
        if ($scope.cod_adjunto == null) { $scope.ifadj = true; } else { $scope.ifadj = false; }
        //if ($scope.cod_estado=='Procesado' || $scope.cod_misacas == 'true'){$scope.panelOP= true;}else{$scope.panelOP=false;}
        if ($scope.valorgestion == 'gestion') { $scope.panelOP = false; } else { $scope.panelOP = true; }
      }

      $scope.mostrarPanel = function (estado) {
        if (estado == 'I') { $scope.panelIC = false; } else { $scope.panelIC = true; }
      }

      $scope.insertarComentario = function () {
        if ($scope.cod_comentario == 0) { $scope.tipo = 'R' } else { if ($scope.tipo == 'C') { $scope.tipo = 'C' } else { $scope.tipo = 'A' } }
        if ($scope.observacion.length <= 10) {
          swal('Error', 'Su comentario no se publico correctamente. Debe ingresar un comentario de mínimo 10 caracteres', 'error');
        }
        else {
          acasHttp.insertarcomentario('RE', $scope.numeroacas, $scope.ubicacionacas, $scope.tipo, $scope.cedula, $scope.observacion).then(function (response) {
            $scope.re_comentario = response.data;
            if ($scope.re_comentario.codigo == 0) {
              swal('Error', $scope.re_comentario.mensaje, 'error');
            }
            else {
              swal('Notificación', $scope.re_comentario.mensaje, 'success');
              $scope.observacion = '';
              acasHttp.mostrarcomentarios('RE', $scope.numeroacas, $scope.ubicacionacas).then(function (response) {
                $scope.comentarios = response.data;
                if ($scope.comentarios.codigo == -1)
                  $scope.cod_comentario = 0;
                else
                  $scope.cod_comentario = $scope.comentarios.length;
              })
            }
          })
        }
      }
      $scope.Cerraracas = function () {
        if ($scope.observacion.length <= 10) {
          swal('Error', 'Su servicio no se cerró correctamente. Debe ingresar un comentario de cierre de mínimo 10 caracteres', 'error');
        }
        else {
          acasHttp.cerraracas('RE', $scope.numeroacas, $scope.ubicacionacas).then(function (response) {
            if (response.data.codigo == 0) {
              swal('Error', response.data.mensaje, 'error');
              $scope.observacion = '';
            } else {
              $scope.insertarComentario();
              swal('Notificación', response.data.mensaje, 'success');
              $scope.tipo = 'C';
              $scope.celularacas = response.data.celular;
              $scope.nombreacas = response.data.nombre;
              $scope.numeroacas = $scope.numeroacas;

              if ($scope.celularacas == 0) {
                swal('Notificación', 'Por favor actualice su número de celular en mi hoja de vida', 'info');
                notification.getNotification('info', "Por favor actualice su número de celular en mi hoja de vida ", 'Notificación');
              }
              setTimeout(function () {
                $http({
                  method: 'POST',
                  url: "https://api.infobip.com/sms/1/text/single",
                  headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
                    'accept': 'application/json'
                  },
                  data: {
                    "from": "CajacopiEPS",
                    "to": "57" + $scope.celularacas,
                    "text": "Sr(a). " + $scope.nombreacas + " Solicitud  con número " + $scope.numeroacas + " fue cerrado correctamente. Gracias por utilizar nuestra plataforma. "
                  }
                }).then(function (response) {
                  console.log(response);
                  $scope.gifsolicitudacas = false;
                  $scope.solicitudacas = false;
                  $scope.nombre_acas = 'Generar Acas';
                });
              }, 800);


              ngDialog.closeAll();
            }
          })
        }
      }
    }]);