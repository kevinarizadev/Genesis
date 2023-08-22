'use strict';
angular.module('GenesisApp')
  .controller('mesadeayudaipsController', ['$scope', '$http', 'acasHttp', 'ngDialog', '$filter',
    function ($scope, $http, acasHttp, ngDialog, $filter) {
      $scope.cardips = true;
      $scope.gifsolicitudacas = false;
      $scope.solicitudacas = false;
      $scope.filtroarea = 19;
      $scope.valormodal = '1';
      $scope.barrio = '1';
      $scope.descripcion = '';
      $scope.filtroconcepto = sessionStorage.home == 'inicioempresas' ? 'SE' : 'GS';
      $scope.filtromotivo = '';
      $scope.filtromotivo = '';
      $scope.filtroasunto = '';
      $scope.vw_prioridad = true;
      $scope.caracteres = 0;

      $scope.nombreadjunto = null;
      $scope.adjunto = null;

      $scope.nombre_acas = 'Generar Servicio';
      $scope.solicitudacasips = {
        v_pconceptom: sessionStorage.home == 'inicioempresas' ? 'SE' : 'GS',
      };

      $scope.filtro = {
        tercero: false,
        act_correo: false
      };
      $scope.descripcion = '';
      $scope.count = 0;

      $scope.tipo = false;

      $scope.tab = 1;
      setTimeout(() => {
        $('.tabs').tabs();
      }, 500);


      $scope.setTab = function (newTab) {
        $scope.tab = newTab;
        $(".tabI").removeClass("tabactiva");
        $(".tabII").removeClass("tabactiva");
        switch (newTab) {
          case 1:
            $(".tabI").addClass("tabactiva");
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
      $scope.setTab(1);
      $scope.cedula = sessionStorage.getItem('nit');
      $scope.ubicacion = sessionStorage.getItem('ubicacion') ? sessionStorage.getItem('ubicacion') : '1';
      // console.log($scope.ubicacion);
      var dat = { prov: 'navb' }
      $.getJSON("php/obtenersession.php", dat)
        .done(function (respuesta) {
          $scope.sesdata = respuesta;
          // $scope.cedula = $scope.sesdata.cedula;
          //$scope.ubicacion = $scope.sesdata.codmunicipio;
          $scope.nombre_comp = $scope.sesdata.nombre;
          acasHttp.obtenerInformacionCOCE($scope.cedula).then(function (response) {
            if (response.data.codigo == 0) {
              $scope.celular_info = response.data.celular;
              $scope.correo_info = response.data.correo;
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
          // acasHttp.obtenerArea().then(function (response) {
          //    $scope.areas = response.data;
          // })
          // acasHttp.obtenerPrestador($scope.ubicacion).then(function (response) {
          //   $scope.prestadores = response.data;
          // })

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          // console.log("navbar error obteniendo variables");
        });






      $scope.limpiar = function () {
        // $scope.filtroarea = ' ';
        // $scope.filtroconcepto = ' ';
        $scope.filtromotivo = ' ';
        $scope.filtromotivo_SAVE = ' ';
        $scope.filtroasunto = ' ';
        $scope.vw_prioridad = true;
        $scope.nombreadjunto = null;
        $scope.adjunto = null;
        $scope.descripcion = '';
        $scope.filtro = {
          tercero: false
        };
        $scope.clase = "status white darken-4 tag";
        $scope.terceros = '';

        $('#nombreadjunto')[0].value = '';
        $('input[type=file]')[0].value = '';
        $scope.count = 0;
      }

      $scope.handleKeyPress = function (e) {
        if ($scope.descripcion == null || $scope.descripcion == undefined || $scope.descripcion == '') { $scope.count = 0; }
        if ($scope.descripcion.length < $scope.count) { $scope.count = $scope.descripcion.length }
        else ($scope.descripcion.length > $scope.count)
        { $scope.count = $scope.descripcion.length }


        if (e.keyCode == 8) {
          if ($scope.count == 0) {
            $scope.count = 0;
          }
          else {
            $scope.count = $scope.count - 1;
          }
        } else {
          $scope.count = $scope.count + 1;
        }
      }

      acasHttp.obtenerMotivo("RE", $scope.filtroconcepto).then(function (response) {
        // $scope.motivos = response.data;
        $scope.motivos = [];
        response.data.forEach(e => {
          $scope.motivos.push({
            CODIGO: e.CODIGO, NOMBRE: e.NOMBRE, CON: sessionStorage.home == 'inicioempresas' ? 'SE' : 'GS',
            CODIGO_UNICO: e.CODIGO + '' + sessionStorage.home == 'inicioempresas' ? 'SE' : 'GS'
          });
        });
        // console.log($scope.motivos)
        if ($scope.cedula == "900397110") {
          acasHttp.obtenerMotivo("RE", 'TA').then(function (response2) {
            response2.data.forEach(e => {
              $scope.motivos.push({ CODIGO: e.CODIGO, NOMBRE: e.NOMBRE, CON: 'TA', CODIGO_UNICO: e.CODIGO + '' + 'TA' });
            });
          });
        }
        // $scope.obtenerasunto();
      })



      $scope.obtenerasunto = function () {
        // var data = $scope.motivos.find(x => x.CODIGO == $scope.filtromotivo);
        $scope.filtroconcepto = sessionStorage.home == 'inicioempresas' ? 'SE' : 'GS';
        $scope.filtromotivo_SAVE = $scope.filtromotivo;
        // console.log($scope.filtroconcepto)
        setTimeout(() => {
          if ($scope.filtroarea == '18') { $scope.docval = 'RE'; } else { $scope.docval = 'RE'; }
          acasHttp.obtenerAsunto($scope.docval, $scope.filtroconcepto, $scope.filtromotivo_SAVE).then(function (response) {
            $scope.asuntos = response.data;
            $scope.filtroasunto = "";
          })
        }, 500);

      }

      $scope.descargafile = function (ruta) {
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
          window.open("temp/" + response.data);
        });
      }

      $scope.insertaracas = function (ruta) {
        var ruta = ruta;
        if ($scope.filtromotivo_SAVE != undefined && $scope.filtromotivo_SAVE != null && $scope.filtromotivo_SAVE != '' &&
          $scope.filtroasunto != undefined && $scope.filtroasunto != null && $scope.filtroasunto != '' &&
          $scope.descripcion != undefined && $scope.descripcion != null && $scope.descripcion != ''
        ) {
          if ($scope.filtroconcepto == 'TA') {
            var data = $scope.asuntos.find(x => x.CODIGO === $scope.filtroasunto);
            var filtroasunto = data.ID;
          } else {
            var filtroasunto = $scope.filtroasunto;
          }
          $http({
            method: 'POST',
            url: "php/ips/mesaayuda/funcmesaayudaips.php",
            data: {
              function: 'subir_mesa_ayuda_ips',
              v_pubicacion: $scope.ubicacion,
              v_pconceptom: $scope.filtroconcepto,
              v_pmotivo: $scope.filtromotivo_SAVE,
              v_padjunto: ruta,
              v_pobservacion: $scope.descripcion,
              v_pemisor: $scope.cedula,
              v_pasunto: filtroasunto
            }
          }).then(function (response) {
            swal.close();
            if (response.data.codigo == 1) {
              $scope.limpiar();
              $scope.nombreadjunto = null;
              $scope.adjunto = null;

              swal('Completado', response.data.mensaje, 'success')


            } else {

              swal('Importante', response.data.mensaje, 'error')
            }
          });
        } else {
          swal.close();
          swal('Importante', "Los campos deben estar lleno para procesar la Mesa de ayuda", 'error')
        }
      }

      $scope.modalGestionar = function (codigo, fecha, motivo, descripcion, estado, clase, asunto, ruta, ubicacion) {
        $scope.dialogNewAfil = ngDialog.open({
          template: 'views/tic/chatgestionarsolicitud.html',
          className: 'ngdialog-theme-plain',
          scope: $scope
        });
        $scope.acas = codigo;
        $scope.fecha = fecha;
        $scope.motivo = motivo;
        $scope.descripcionchat = descripcion;
        $scope.estado = estado;
        $scope.clase = clase;
        $scope.asunto = asunto;
        $scope.ruta1 = ruta;
        $scope.ubicacion = ubicacion;
        $scope.refreshConversacion();
        $scope.carga_acas_ips();
        $scope.mostrari = false;
        $scope.mostrari2 = false;
        $scope.archivobase = null;

      }

      //modal chat cxontroladores
      $scope.enviaMensaje = function (ruta) {
        $scope.ruta = ruta;
        $scope.descripcion = $("#mensaje")[0].value;
        $("#mensaje")[0].value;
        if ($scope.descripcion == " " || $scope.descripcion.length < 10) {
          swal('Información', 'Digite un mensaje antes de enviar  con longitud min de 10', 'error');
        } else {
          $http({
            method: 'POST',
            url: "php/ips/mesaayuda/funcmesaayudaips.php",
            data: {
              function: 'enviar_respuesta',
              v_pnumero: $scope.acas,
              v_pubicacion: $scope.ubicacion,
              v_pobservacion: $scope.descripcion,
              v_pruta: $scope.ruta
            }
          }).then(function (response) {
            // console.log(response)
            if (response.data.codigo == 1) {
              $scope.mensaje = "";
              $("#mensaje")[0].value = " ";
              document.querySelector('#archivoVb').value = '';
              $scope.descripcion = " ";
              $scope.fileName = "";
              swal('Completado', response.data.mensaje, 'success');
              $scope.refreshConversacion();
              $scope.ruta = null;
              $scope.base64 = null;
              setTimeout(() => { $scope.$apply(); }, 500);
            } else {
              swal('Información', response.data.mensaje, 'error');
            }
          })
        }
      }
      $scope.refreshConversacion = function () {
        $scope.Conversacion = []
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/ips/mesaayuda/funcmesaayudaips.php",
          data: {
            function: 'listaConversacion',
            v_pradicado: $scope.acas,
            v_pubicacion: $scope.ubicacion
          }
        }).then(function (response) {

          // console.log(response.data);
          $scope.Conversacion = response.data;
          $scope.Conversacion.codigo == 0 ? (
            $scope.shwConversacion = false
          ) : (
            $scope.shwConversacion = true,
            setTimeout(function () { $('#mensajes').scrollTop($('#mensajes').height() + 450000000); }, 1000)
          )

          swal.close();
        });
      }


      $scope.obtenerBase = function () {
        if ($("#adjunto")[0].files[0].size > 7340032) {
          //swal('Advertencia','El archivo excede el peso limite (7 MB)','warning')
          // notification.getNotification('warning','El archivo excede el peso limite (7 MB)','Notificación');
          $("#adjunto")[0].value = "";
          $scope.archivobase = "";
          $scope.extensionarchivo = "";
        } else {
          if ($("#adjunto")[0].files && $("#adjunto")[0].files[0]) {
            var FR = new FileReader();
            FR.addEventListener("load", function (e) {
              $scope.adjunto = $("#adjunto")[0].value;
              $scope.archivobase = e.target.result;
              var name = $("#adjunto")[0].files[0].name;
              $scope.extensionarchivo = name.split('.').pop();
            });
            FR.readAsDataURL($("#adjunto")[0].files[0]);
          }
        }
      }
      $scope.seleccionaFile = function () {
        $('#archivoVb').trigger('click');
      }
      $scope.changeFile = function () {
        $scope.file = { selected: $('#archivoVb')[0] }
        if ($scope.file.selected.files.length > 0) {
          if ($('#archivoVb')[0].files[0].size > 7340032) {
            swal('Advertencia', 'El archivo excede el peso limite (7 MB)', 'warning')
            $('#archivoVb')[0].value = "";
            return;
          }
          $scope.fileName = $scope.file.selected.files["0"].name;
          $scope.$apply();
          var FR = new FileReader();
          FR.addEventListener("load", function (e) {
            $scope.base64 = e.target.result;
            var name = document.getElementById('archivoVb').files[0].name;
            $scope.ext = name.split('.').pop();
            // console.log($scope.base64);
          });
          FR.readAsDataURL(document.getElementById('archivoVb').files[0]);
          $('#btnDum').trigger('click');
        } else {
          $scope.fileName = '';
        }
      }
      $scope.veradjunto = function (ruta) {
        var ruta = ruta;
        $http({
          method: 'POST',
          url: "php/ips/mesaayuda/funcmesaayudaips.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          window.open("temp/" + response.data);
          // $scope.ruta_visual=("temp/"+response.data);
          //       var dialogNewAfil = ngDialog.open({
          //      template: 'views/tic/modal/imagen.html',
          //      className: 'ngdialog-theme-plain',
          // scope: $scope
          // });
        });
      }


      $scope.enviradjuntos = function () {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        if ($scope.archivobase != null) {
          $http({
            method: 'POST',
            url: "php/ips/mesaayuda/funcmesaayudaips.php",
            data: {
              function: 'adjuntos_mesa_ayuda_ips',
              achivobase: $scope.archivobase,
              ext: $scope.extensionarchivo,
            }
          }).then(function (response) {
            // console.log(response);
            $scope.insertaracas(response.data);
          });
        } else {
          $scope.insertaracas(null);
        }

      }
      $scope.enviradjuntosmensajes = function () {

        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        if ($scope.base64 != null) {
          $http({
            method: 'POST',
            url: "php/ips/mesaayuda/funcmesaayudaips.php",
            data: {
              function: 'adjuntos_mesa_ayuda_ips_mensajes',
              achivobase: $scope.base64,
              ext: $scope.ext,
              acas: $scope.acas
            }
          }).then(function (response) {
            // console.log(response.data);
            $scope.enviaMensaje(response.data);
          });
        } else {
          $scope.enviaMensaje(null);
        }

      }

      $scope.filtroasuntoChange = function () {
        if ($scope.filtromotivo == '1' && $scope.filtroasunto == '2') {
          swal("Información Importante", 'En la descripcion de su solicitud debe anexar (Tipo y Número de Documento del afiliado y Radicado de solicitud)', "info").catch(swal.noop); return
        }
      }

      // yaaaaaaaaaa
      $scope.filter = function (val) {
        $scope.listaRIPSTemp = $filter('filter')($scope.listaRIPS, val);
        $scope.configPages();
      }
      $scope.carga_acas_ips = function () {
        $http({
          method: 'POST',
          url: "php/ips/mesaayuda/funcmesaayudaips.php",
          data: { function: 'carga_acas_ips' }
        }).then(function (response) {
          $scope.mesasayudas = response.data;
          $scope.initPaginacion($scope.mesasayudas);
          // console.log(response.data);
          setTimeout(() => { $scope.$apply(); }, 500);
        })
      }

      $scope.initPaginacion = function (info) {
        $scope.mesasayudasTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 6;
        $scope.valmaxpag = 6;
        $scope.pages = [];
        $scope.configPages();
      }
      $scope.filter = function (val) {
        $scope.mesasayudasTemp = $filter('filter')($scope.mesasayudas, val);
        $scope.configPages();
      }

      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }

        if ($scope.currentPage >= $scope.pages.length)
          $scope.currentPage = $scope.pages.length - 1;
        if ($scope.currentPage < 0) { $scope.currentPage = 0; }
      };
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
        // console.log($scope.mesasayudas.length / $scope.pageSize - 1)
      };

      $scope.Ajustar_Pantalla = function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
      }

      $(window).on('resize', function () {
        $scope.Ajustar_Pantalla();
      });
      $scope.Ajustar_Pantalla();


    }])
  .filter('inicio', function () {
    return function (input, start) {
      if (input != undefined && start != NaN) {
        start = +start;
        return input.slice(start);
      } else {
        return null;
      }
    }
  });



