'use strict';
angular.module('GenesisApp')
  .controller('busquedasoportesaltocController', ['$scope', '$http', '$q',
    function ($scope, $http, $q) {
      $(document).ready(function () {
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
        $scope.Tabs = 0;
        $('.tabs').tabs();
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');

        $scope.Vista = 0;

        $scope.SysDay = new Date();
        $scope.Hoja_Limpiar();
        setTimeout(() => {
          $scope.Mostrar();
          $scope.$apply();
        }, 500);
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        ///////////P-PENDIENTE---G-GESTIONADO---X-ANULADO/////////
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
      });
      // 12964797
      $scope.Hoja_Limpiar = function () {
        $scope.Hoja = {
          Afi_TipoDoc: '',
          Afi_NumDoc: '',
          Afi_Nombre: '',
          Afi_Regimen: '',
          Afi_Fecha_Nac: '',
          Afi_Sexo: '',
          Afi_Edad: '',
          Afi_Regimen_Nom: '',
          Afi_Sexo_Nom: '',
          Ubicacion_Nom: '',

          Status: 1,
          Status_Cancer: 1,
          Status_Vih: 1,
          Status_Artritis: 1,
          Status_Hemofilia: 1,
          Status_ERC: 1,
          Status_MOD: 1,

          List_Vih: null,
          List_Cancer: null,
          List_Artritis: null,
          List_Hemofilia: null,
          List_ERC: null,
          List_MOD: null
        }
        $scope.Efect_1 = "";
        $scope.Efect_2 = "";
        $scope.Efect_3 = "";

        //
        angular.forEach(document.querySelectorAll('.Form_Desactivados input'), function (i) {
          i.setAttribute("readonly", true);
        });
        //
        angular.forEach(document.querySelectorAll('.Form_Bloquear input'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.Form_Bloquear select'), function (i) {
          i.removeAttribute("disabled");
        });
        setTimeout(() => {
          $scope.Hoja.Afi_TipoDoc = '';
        }, 100);
      }

      $scope.Mostrar = function () {
        $scope.Tabs = 0;
        $scope.Hoja.Status = 1;
        $scope.Hoja.Status_Cancer = 1;
        $scope.Hoja.Status_Vih = 1;
        $scope.Efect_1 = "Imagen_back_2";
        $scope.Efect_2 = "Efect_Op1";
        //
        angular.forEach(document.querySelectorAll('.Form_Bloquear input'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.Form_Bloquear select'), function (i) {
          i.removeAttribute("disabled");
        });
        angular.forEach(document.querySelectorAll('.Form_Bloquear_2 input'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.Form_Bloquear_3 input'), function (i) {
          i.removeAttribute("readonly");
        });

        setTimeout(() => {
          $scope.Hoja.Afi_TipoDoc = '';
        }, 100);
        setTimeout(() => {
          $scope.$apply();
        }, 1000);
      }


      $scope.KeyFind_Afiliado = function (keyEvent) {
        if (keyEvent.which === 13)
          $scope.Buscar_Afiliado();
      }
      $scope.Buscar_Afiliado = function () {
        angular.forEach(document.querySelectorAll('#Hoja_1 .red-text'), function (i) {
          i.classList.remove('red-text');
        });
        var Campos_Empty = false;
        if ($scope.Hoja.Afi_TipoDoc == undefined || $scope.Hoja.Afi_TipoDoc == null || $scope.Hoja.Afi_TipoDoc == '') {
          Campos_Empty = true; document.querySelector('#Hoja_Afi_TipoDoc_Label').classList.add('red-text');
        }
        if ($scope.Hoja.Afi_NumDoc == undefined || $scope.Hoja.Afi_NumDoc == null || $scope.Hoja.Afi_NumDoc == '') {
          Campos_Empty = true; document.querySelector('#Hoja_Afi_NumDoc_Label').classList.add('red-text');
        }
        $scope.Hoja_Afi_TipoDoc = $scope.Hoja.Afi_TipoDoc;
        if (Campos_Empty == false) {
          // swal({ title: 'Cargando...' });
          // swal.showLoading();
          $http({
            method: 'POST',
            url: "php/altocosto/busquedasoportesaltoc.php",
            data: {
              function: 'Buscar_Afiliado',
              Tipo_Doc: $scope.Hoja.Afi_TipoDoc,
              Num_Doc: $scope.Hoja.Afi_NumDoc
            }
          }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data && response.data.codigo == '0') {
                $scope.Hoja.Afi_Nombre = response.data.primer_nombre + ' ' + response.data.segundo_nombre + ' ' + response.data.primer_apellido + ' ' + response.data.segundo_apellido;
                var Fecha = response.data.fecha_nacimiento.toString().split("/");
                var Afi_Fecha_Nac = new Date(Fecha[2] + '/' + Fecha[1] + '/' + Fecha[0]);
                $scope.Hoja.Afi_Fecha_Nac = Afi_Fecha_Nac;
                $scope.Hoja.Status = 2;
                $scope.Efect_3 = "Efect_Op1";
                angular.forEach(document.querySelectorAll('.Form_Bloquear input'), function (i) {
                  i.setAttribute("readonly", true);
                });
                angular.forEach(document.querySelectorAll('.Form_Bloquear select'), function (i) {
                  i.setAttribute("disabled", true);
                });
                $scope.Hoja.Afi_TipoDoc = '';
                setTimeout(() => {
                  $scope.Hoja.Afi_TipoDoc = $scope.Hoja_Afi_TipoDoc;
                  $scope.Listar_Soportes();
                  $scope.Buscar_Soportes_Siniestros();
                }, 50);
                setTimeout(() => {
                  $scope.$apply();
                }, 500);
                swal.close();
              } else if (response.data.codigo == '1') {
                swal({
                  title: "¡IMPORTANTE!",
                  text: response.data.mensaje,
                  type: "warning",
                }).catch(swal.noop);
                document.getElementById("Hoja_Afi_NumDoc").focus();
              }
            } else {
              swal({
                title: "¡IMPORTANTE!",
                text: response.data,
                type: "info",
              }).catch(swal.noop);
              document.getElementById("Hoja_Afi_NumDoc").focus();
            }
          });
        } else {
          Materialize.toast('¡Digite al menos 3 caracteres!', 1000); $('.toast').addClass('default-background-dark');
        }
      }

      $scope.Buscar_Soportes_Siniestros = function () {
        $http({
          method: 'POST',
          url: "php/altocosto/busquedasoportesaltoc.php",
          data: {
            function: 'Buscar_Soportes_Siniestros',
            Tipo_Doc: $scope.Hoja.Afi_TipoDoc,
            Num_Doc: $scope.Hoja.Afi_NumDoc
          }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br') {
            if (response.data.length > 0) {
              var datos = [];
              response.data.forEach(e => {
                datos.push({ RUTA: e.SOPORTE, EXT: (e.SOPORTE.toString().split('/')[6]).split('.')[1], NOMBRE: (e.SOPORTE.toString().split('/')[6]).split('.')[0], })
              });
              $scope.Hoja.List_MOD = [{
                LISTA: datos,
                NOMBRE: 'Modulo Siniestro'
              }]
              $scope.Hoja.Status_MOD = 2;
              console.table(response.data);
              console.log($scope.Hoja.List_MOD);
              setTimeout(() => {
                $scope.$apply();
              }, 1000);
            }
          }
        });
      }

      $scope.Listar_Soportes = function () {
        $scope.setTab(1);
        $('#Tab1').click();
        swal({ title: 'Cargando...' });
        swal.showLoading();
        var Subir_Soportes = [
          $scope.Req_Listar_Soportes('Vih'),
          $scope.Req_Listar_Soportes('Cancer'),
          $scope.Req_Listar_Soportes('Artritis'),
          $scope.Req_Listar_Soportes('Hemofilia'),
          $scope.Req_Listar_Soportes('ERC'),
        ];
        $q.all(Subir_Soportes).then(function (resultado) {
          var Cant_Vacios = 0;
          for (var x = 0; x < resultado.length; x++) {
            if (resultado[x] == '0') {
              Cant_Vacios = Cant_Vacios + 1;
            }
          }
          if (Cant_Vacios == 5) {
            swal({
              title: '¡Importante!',
              text: 'No se encontraron soportes para este afiliado en ninguna de las cohortes.',
              type: 'info'
            }).catch(swal.noop);
          } else {
            setTimeout(() => {
              swal.close();
              $scope.Efect2_2 = "Efect2_2";
              $scope.Tabs = 1;
              $scope.$apply();
            }, 500);
            setTimeout(() => {
              $('.tabs').tabs();
            }, 700);
          }
        })
      }

      $scope.Req_Listar_Soportes = function (Cohorte) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http({
          method: 'POST',
          url: "php/altocosto/busquedasoportesaltoc.php",
          data: {
            function: 'Listar_Soportes',
            Tipo_Doc: $scope.Hoja.Afi_TipoDoc,
            Num_Doc: $scope.Hoja.Afi_NumDoc,
            Tipo: Cohorte
          }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br') {
            if (response.data[0] != undefined && response.data.length > 0) {
              $scope.Hoja["Status_" + Cohorte] = 2;
              $scope.Hoja["List_" + Cohorte] = response.data;
              setTimeout(() => {
                $scope.$apply();
              }, 500);
              defered.resolve(1);
            } else {
              $scope.Hoja["List_" + Cohorte] = null;
              $scope.Hoja.Filter = '';
              setTimeout(() => {
                $scope.$apply();
              }, 500);
              defered.resolve(0);
            }
          }
        })
        return promise;
      }

      $scope.Abrir_Modal_Soportes = function (ruta) {
        $http({
          method: 'POST',
          url: "php/altocosto/busquedasoportesaltoc.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          var win = window.open("temp/" + response.data, '_blank');
          win.focus();
        });
      }

      $scope.Descarga_Carpeta = function (tipo, array, index) {
        swal({ title: 'Cargando...' });
        swal.showLoading();

        var Listado = [];
        $scope.Hoja[array][index].LISTA.forEach(e => {
          Listado.push({ "RUTA": e.RUTA, "RUTA_FINAL": "" })
        });
        $http({
          method: 'POST',
          url: "php/altocosto/busquedasoportesaltoc.php",
          data: {
            function: 'Descarga_Carpeta',
            Carpeta: $scope.Hoja[array][index].NOMBRE + '_' + tipo,
            Listado: JSON.stringify(Listado)
          }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br') {
            if (response.data != undefined) {
              var win = window.open("temp/" + response.data, '_blank');
              swal.close();
            }
          } else {
            swal({
              title: "¡IMPORTANTE!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        })
      }
      //////////////////////////////////////////////////////////////////////////////      
      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////

      $scope.setTab = function (x) {
        $scope.Tabs = x;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      $scope.Obtener_Tipos_Documentos = function () {
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Tipos_Documentos = response.data;
            setTimeout(() => {
                $scope.$apply();
            }, 500);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.Obtener_Tipos_Documentos();


      $(window).on('resize', function () {
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
      });

    }]);
