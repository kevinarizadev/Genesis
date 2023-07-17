'use strict';
angular.module('GenesisApp')
  .controller('gestionactpgpController', ['$scope', '$http', '$q', 'ngDialog',
    function ($scope, $http, $q, ngDialog) {
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
        $('.tabs').tabs();
        $scope.Tabs = 1;
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $scope.Rol_Nit = sessionStorage.getItem('nit');
        // $scope.Rol_Nit = "900219120";
        // $scope.Rol_Nit = "802019914";

        $scope.Vista = 0;

        $scope.Busqueda = {
          Producto: {
            Filtro: null,
            Listado: null,
            SAVE: null,
            Seleccion: 9999
          },
          Motivo: {
            Filtro: null,
            Listado: null,
            SAVE: null,
            Seleccion: 9999
          },
          Asunto: {
            Filtro: null,
            Listado: null,
            SAVE: null,
            Seleccion: 9999
          },
          Diagnostico: {
            Filtro: null,
            Listado: null,
            SAVE: null,
            Seleccion: 9999
          },
        }

        $scope.SysDay = new Date();
        $scope.Hoja_Limpiar();
        $scope.Hoja2_Limpiar();
        setTimeout(() => {
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

      $scope.Hoja_Limpiar = function () {
        $scope.Hoja = {
          Afi_TipoDoc: '',
          Afi_NumDoc: '',
          Afi_Nombre: '',
          Afi_Regimen: '',
          Afi_Sexo: '',
          Afi_Edad: '',
          Afi_Regimen_Nom: '',
          Afi_Sexo_Nom: '',
          Ubicacion_Nom: '',

          Motivo_Cod: '',
          Motivo_Nom: '',
          Motivo: '',

          Asunto_Cod: '',
          Asunto_Nom: '',
          Asunto: '',

          Doc_Con: '',
          Num_Con: '',
          Ubi_Con: '',

          Producto_Cod: '',
          Producto_Nom: '',
          Producto: '',
          Cantidad: '',
          Fecha_Prestacion: $scope.SysDay,
          Tipo_Frecuencia: '',
          Cantidad_Frecuencia: '',

          Diagnostico_Cod: '',
          Diagnostico_Nom: '',
          Diagnostico: '',
          Ambito: '',

          Status: 0,

          List: '',
          Filter: ''
        }
        $scope.Efect_1 = "";
        $scope.Efect_2 = "";
        $scope.Efect_3 = "";
        $scope.Efect_4 = "";
        $scope.Efect_5 = "";
        $scope.Busqueda = {
          Producto: {
            Filtro: null,
            Listado: null,
            SAVE: null,
            Seleccion: 9999
          },
          Motivo: {
            Filtro: null,
            Listado: null,
            SAVE: null,
            Seleccion: 9999
          },
          Asunto: {
            Filtro: null,
            Listado: null,
            SAVE: null,
            Seleccion: 9999
          },
          Diagnostico: {
            Filtro: null,
            Listado: null,
            SAVE: null,
            Seleccion: 9999
          }
        }
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

      $scope.Hoja2_Limpiar = function () {
        $scope.Hoja2 = {
          Fecha_Inicio: $scope.SysDay,
          Fecha_Fin: $scope.SysDay,
          Filter: '',

          List: null
        }
      }

      $scope.Mostrar = function () {
        $scope.Hoja = null;
        $scope.Hoja = {
          Afi_TipoDoc: '',
          Afi_NumDoc: '',
          Afi_Nombre: '',
          Afi_Regimen: '',
          Afi_Sexo: '',
          Afi_Edad: '',
          Afi_Regimen_Nom: '',
          Afi_Sexo_Nom: '',
          Ubicacion_Nom: '',

          Motivo_Cod: '',
          Motivo_Nom: '',
          Motivo: '',

          Asunto_Cod: '',
          Asunto_Nom: '',
          Asunto: '',

          Doc_Con: '',
          Num_Con: '',
          Ubi_Con: '',

          Producto_Cod: '',
          Producto_Nom: '',
          Producto: '',
          Cantidad: '',
          Fecha_Prestacion: $scope.SysDay,
          Tipo_Frecuencia: '',
          Cantidad_Frecuencia: '',

          Diagnostico_Cod: '',
          Diagnostico_Nom: '',
          Diagnostico: '',
          Ambito: '',

          contrato:'',

          Status: 0,

          List: '',
          Filter: ''
        }
        $scope.Efect_1 = "";
        $scope.Efect_2 = "";
        $scope.Efect_3 = "";
        $scope.Efect_4 = "";
        $scope.Efect_5 = "";
        $scope.Busqueda = {
          Producto: {
            Filtro: null,
            Listado: null,
            SAVE: null,
            Seleccion: 9999
          },
          Motivo: {
            Filtro: null,
            Listado: null,
            SAVE: null,
            Seleccion: 9999
          },
          Asunto: {
            Filtro: null,
            Listado: null,
            SAVE: null,
            Seleccion: 9999
          },
          Diagnostico: {
            Filtro: null,
            Listado: null,
            SAVE: null,
            Seleccion: 9999
          }
        }
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        $scope.Hoja.Status = 1;
        $scope.Efect_1 = "Imagen_back_2";
        $scope.Efect_2 = "Efect_Op1";
        $scope.Efect_3 = "";
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
          $scope.Hoja.Afi_TipoDoc = ''; //Activar
          // $scope.Hoja.Afi_TipoDoc = 'RC';
          // $scope.Hoja.Afi_NumDoc = "1044227813";
          // $scope.Hoja.Afi_TipoDoc = 'CC';
          // $scope.Hoja.Afi_NumDoc = "1046694079";
          // $scope.Hoja.Afi_NumDoc = "22422004";
          // }, 100); --Activar
        }, 1000);
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
          swal({ title: 'Cargando...' });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/contratacion/gestionactpgp.php",
            data: {
              function: 'Buscar_Afiliado',
              Tipo_Doc: $scope.Hoja.Afi_TipoDoc,
              Num_Doc: $scope.Hoja.Afi_NumDoc
            }
          }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data[0]) {
                $scope.Hoja.Afi_Nombre = response.data[0].nombre_completo;
                $scope.Hoja.Afi_Regimen = response.data[0].cod_regimen;
                $scope.Hoja.Afi_Edad = response.data[0].edad;
                $scope.Hoja.Afi_Sexo = response.data[0].sexo;
                $scope.Hoja.Afi_Regimen_Nom = response.data[0].nombre_regimen;
                $scope.Hoja.Afi_Sexo_Nom = response.data[0].nombre_sexo;
                $scope.Hoja.Afi_Edad_Dias = response.data[0].edad_dias;
                $scope.Hoja.Afi_Ubi_Afi = response.data[0].portabilidad == 'N' ? response.data[0].ubicacion_afiliado : response.data[0].ubicacion_afiliado_port;
                // $scope.Hoja.Afi_Ubi_Afi = response.data[0].ubicacion_afiliado;
                $scope.Hoja.Ubicacion_Nom = response.data[0].departamento + ' - ' + response.data[0].municipio;
                $scope.Hoja.Status = 2;
                // $scope.Hoja.Status = 4;
                $scope.Efect_3 = "Efect_Op1";
                angular.forEach(document.querySelectorAll('.Form_Bloquear input'), function (i) {
                  i.setAttribute("readonly", true);
                });
                angular.forEach(document.querySelectorAll('.Form_Bloquear select'), function (i) {
                  i.setAttribute("disabled", true);
                });
                $scope.Hoja.Afi_TipoDoc = '';
                $scope.Buscar_Motivo();
                setTimeout(() => {
                  $scope.Hoja.Afi_TipoDoc = $scope.Hoja_Afi_TipoDoc;
                  // $scope.Consultar_Actividades();
                }, 50);
                setTimeout(() => {
                  $scope.$apply();
                  document.getElementById("Hoja_Motivo").focus();
                }, 500);
                swal.close();
                setTimeout(function () {
                  $http({
                    method: 'POST',
                    url: "php/genesis/inicio.php",
                    data: { function: 'actualizable', tipo: $scope.Hoja.Afi_TipoDoc, documento: $scope.Hoja.Afi_NumDoc }
                  }).then(function (response) {
                    $scope.respues_actualizar = response.data.mensaje;
                    if ($scope.respues_actualizar == "S") {
                      sessionStorage.setItem("tipo", $scope.Hoja.Afi_TipoDoc);
                      sessionStorage.setItem("doc", $scope.Hoja.Afi_NumDoc);
                      ngDialog.open({
                        template: 'views/afiliados/modal/modaldatoscontacto.html',
                        className: 'ngdialog-theme-plain',
                        controller: 'modaldatoscontactoController',
                        scope: $scope,
                        closeByEscape: false,
                        closeByDocument: false
                      });
                    }
                  });
                }, 2000);
              } else {
                if (response.data.length == 0) {
                  swal({
                    title: "¡IMPORTANTE!",
                    text: 'No se encontraron registros.',
                    type: "warning",
                  }).catch(swal.noop);
                  document.getElementById("Hoja_Afi_NumDoc").focus();
                } else {
                  swal({
                    title: "¡IMPORTANTE!",
                    text: response.data.Nombre,
                    type: "warning",
                  }).catch(swal.noop);
                  document.getElementById("Hoja_Afi_NumDoc").focus();
                }
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

      $scope.Consultar_Actividades = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/gestionactpgp.php",
          data: {
            function: 'Consultar_Actividades',
            Bter: $scope.Rol_Nit,
            Tipo_Doc: $scope.Hoja_Afi_TipoDoc,
            Num_Doc: $scope.Hoja.Afi_NumDoc
          }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br') {
            if (response.data[0] != undefined && response.data.length > 0) {
              $scope.Efect2_2 = "Efect2_2";
              setTimeout(() => {
                $scope.Hoja.List = response.data;
                $scope.Hoja.Filter = '';
              }, 100);
              swal.close();
            } else {
              $scope.Hoja.List = null;
              $scope.Hoja.Filter = '';
              setTimeout(() => {
                $scope.$apply();
              }, 500);
              // swal({
              //   title: "¡No se encontraron registros!",
              //   type: "info"
              // }).catch(swal.noop);
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
      //CONSULTA MOTIVO
      $scope.KeyFind_Motivo = function (keyEvent) {
        if ($scope.Busqueda.Motivo.Filtro != null && $scope.Busqueda.Motivo.Filtro.length != 0) {
          if (keyEvent.which === 40) {
            $scope.Busqueda.Motivo.Seleccion = $scope.Busqueda.Motivo.Seleccion >= ($scope.Busqueda.Motivo.Filtro.length - 1) ? 0 : $scope.Busqueda.Motivo.Seleccion + 1;
            document.querySelector('.Clase_Listar_Motivo').scrollTo(0, document.querySelector('#Motivo' + $scope.Busqueda.Motivo.Seleccion).offsetTop);
          } else if (keyEvent.which === 38) {
            $scope.Busqueda.Motivo.Seleccion = $scope.Busqueda.Motivo.Seleccion <= 0 || $scope.Busqueda.Motivo.Seleccion == 9999 ? $scope.Busqueda.Motivo.Filtro.length - 1 : $scope.Busqueda.Motivo.Seleccion - 1;
            document.querySelector('.Clase_Listar_Motivo').scrollTo(0, document.querySelector('#Motivo' + $scope.Busqueda.Motivo.Seleccion).offsetTop)
          } else if (keyEvent.which === 13 && $scope.Busqueda.Motivo.Seleccion != 9999) {
            var x = $scope.Busqueda.Motivo.Filtro[$scope.Busqueda.Motivo.Seleccion];
            $scope.FillTextbox_Listado_Motivo(x.codigo, x.nombre);
          }
        }
      }
      $scope.Buscar_Motivo = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/gestionactpgp.php",
          data: {
            function: 'Buscar_Motivo',
            Bter: $scope.Rol_Nit,
            Regimen: $scope.Hoja.Afi_Regimen,
            ubiAfi: $scope.Hoja.Afi_Ubi_Afi
          }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br') {
            if (response.data[0] != undefined && response.data.length > 1) {
              $scope.Busqueda.Motivo.Filtro = response.data;
              $scope.Busqueda.Motivo.Listado = response.data;
              $('.Clase_Listar_Motivo').css({ width: $('#Hoja_Motivo')[0].offsetWidth });
            }
            if (response.data.length == 1) {
              if (response.data[0].Codigo == '-1') {
                swal({
                  title: "¡Mensaje!",
                  text: response.data[0].Nombre,
                  type: "info",
                }).catch(swal.noop);
                $scope.Busqueda.Motivo.Filtro = null;
                $scope.Busqueda.Motivo.Listado = null;
              } else if (response.data[0].Codigo == '1') {
                swal({
                  title: "¡Importante!",
                  text: response.data[0].Nombre,
                  type: "info",
                }).catch(swal.noop);
              } else {
                // $scope.Busqueda.Motivo.Filtro = response.data;
                // $scope.Busqueda.Motivo.Listado = response.data;
                $scope.FillTextbox_Listado_Motivo(response.data[0].codigo, response.data[0].nombre);
              }
            } else if (response.data.length == 0) {
              swal({
                title: "¡Importante!",
                // text: response.data[0].Nombre,
                text: "No se encontro el Motivo",
                type: "info",
              }).catch(swal.noop);
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
      $scope.Complete_Listado_Motivo = function (keyEvent, string) {
        if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
          if ($scope.Hoja.Motivo != undefined && string != undefined && $scope.Busqueda.Motivo.Listado != undefined) {
            $('.Clase_Listar_Motivo').css({ width: $('#Hoja_Motivo')[0].offsetWidth });
            var output = [];
            angular.forEach($scope.Busqueda.Motivo.Listado, function (x) {
              if (x.nombre.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.codigo.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                output.push({ "codigo": x.codigo, "nombre": x.nombre.toUpperCase() });
              }
            });
            $scope.Busqueda.Motivo.Filtro = output;
            $scope.Busqueda.Motivo.Seleccion = 9999;
          }
        }
      }
      $scope.FillTextbox_Listado_Motivo = function (codigo, nombre) {
        $scope.Hoja.Motivo_Cod = codigo;
        $scope.Hoja.Motivo_Nom = nombre;
        $scope.Hoja.Motivo = nombre;
        $scope.Busqueda.Motivo.SAVE = nombre;
        $scope.Busqueda.Motivo.Filtro = null;
        $scope.Buscar_Asunto();
        $scope.Hoja.Status = 3;
        $scope.Efect_4 = "Efect_Op1";
        angular.forEach(document.querySelectorAll('.Form_Bloquear_2 input'), function (i) {
          i.setAttribute("readonly", true);
        });
        document.getElementById("Hoja_Asunto").focus();
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
      $scope.Blur_Motivo = function () {
        setTimeout(() => {
          if ($scope.Hoja.Motivo != null && $scope.Hoja.Motivo != undefined) {
            if ($scope.Hoja.Motivo != $scope.Busqueda.Motivo.SAVE && $scope.Busqueda.Motivo.SAVE != null) {
              $scope.Hoja.Motivo = $scope.Busqueda.Motivo.SAVE;
              $scope.Busqueda.Motivo.Filtro = null;
            }
            $scope.Busqueda.Motivo.Filtro = null;
          }
          $scope.$apply();
        }, 300);
      }
      //CONSULTA ASUNTO
      $scope.KeyFind_Asunto = function (keyEvent) {
        if ($scope.Busqueda.Asunto.Filtro != null && $scope.Busqueda.Asunto.Filtro.length != 0) {
          if (keyEvent.which === 40) {
            $scope.Busqueda.Asunto.Seleccion = $scope.Busqueda.Asunto.Seleccion >= ($scope.Busqueda.Asunto.Filtro.length - 1) ? 0 : $scope.Busqueda.Asunto.Seleccion + 1;
            document.querySelector('.Clase_Listar_Asunto').scrollTo(0, document.querySelector('#Asunto' + $scope.Busqueda.Asunto.Seleccion).offsetTop);
          } else if (keyEvent.which === 38) {
            $scope.Busqueda.Asunto.Seleccion = $scope.Busqueda.Asunto.Seleccion <= 0 || $scope.Busqueda.Asunto.Seleccion == 9999 ? $scope.Busqueda.Asunto.Filtro.length - 1 : $scope.Busqueda.Asunto.Seleccion - 1;
            document.querySelector('.Clase_Listar_Asunto').scrollTo(0, document.querySelector('#Asunto' + $scope.Busqueda.Asunto.Seleccion).offsetTop)
          } else if (keyEvent.which === 13 && $scope.Busqueda.Asunto.Seleccion != 9999) {
            var x = $scope.Busqueda.Asunto.Filtro[$scope.Busqueda.Asunto.Seleccion];
            $scope.FillTextbox_Listado_Asunto(x.codigo, x.nombre);
          }
        }
      }
      $scope.Buscar_Asunto = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/gestionactpgp.php",
          data: {
            function: 'Buscar_Asunto',
            Bter: $scope.Rol_Nit,
            Cod_Mot: $scope.Hoja.Motivo_Cod,
            Regimen: $scope.Hoja.Afi_Regimen,
            ubiAfi: $scope.Hoja.Afi_Ubi_Afi
          }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br') {
            if (response.data[0] != undefined && response.data.length > 1) {
              $scope.Busqueda.Asunto.Filtro = response.data;
              $scope.Busqueda.Asunto.Listado = response.data;
              $('.Clase_Listar_Asunto').css({ width: $('#Hoja_Asunto')[0].offsetWidth });
            }
            if (response.data.length == 1) {
              if (response.data[0].Codigo == '-1') {
                swal({
                  title: "¡Mensaje!",
                  text: response.data[0].Nombre,
                  type: "info",
                }).catch(swal.noop);
                $scope.Busqueda.Asunto.Filtro = null;
                $scope.Busqueda.Asunto.Listado = null;
              } else {
                // $scope.Busqueda.Asunto.Filtro = response.data;
                // $scope.Busqueda.Asunto.Listado = response.data;
                $scope.FillTextbox_Listado_Asunto(response.data[0].codigo, response.data[0].nombre);
              }
            } else if (response.data.length == 0) {
              swal({
                title: "¡Importante!",
                text: "No se encontro el Asunto",
                type: "info",
              }).catch(swal.noop);
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
      $scope.Complete_Listado_Asunto = function (keyEvent, string) {
        if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
          if ($scope.Hoja.Asunto != undefined && string != undefined && $scope.Busqueda.Asunto.Listado != undefined) {
            $('.Clase_Listar_Asunto').css({ width: $('#Hoja_Asunto')[0].offsetWidth });
            var output = [];
            angular.forEach($scope.Busqueda.Asunto.Listado, function (x) {
              if (x.nombre.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.codigo.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                output.push({ "codigo": x.codigo, "nombre": x.nombre.toUpperCase() });
              }
            });
            $scope.Busqueda.Asunto.Filtro = output;
            $scope.Busqueda.Asunto.Seleccion = 9999;
          }
        }
      }
      $scope.FillTextbox_Listado_Asunto = function (codigo, nombre) {
        $scope.Hoja.Asunto_Cod = codigo;
        $scope.Hoja.Asunto_Nom = nombre;
        $scope.Hoja.Asunto = nombre;
        $scope.Busqueda.Asunto.SAVE = nombre;
        $scope.Busqueda.Asunto.Filtro = null;
        $scope.Buscar_Contrato();
        angular.forEach(document.querySelectorAll('.Form_Bloquear_3 input'), function (i) {
          i.setAttribute("readonly", true);
        });
        setTimeout(() => {
          document.getElementById("Hoja_Producto").focus();
          $scope.$apply();
        }, 500);
      }
      $scope.Blur_Asunto = function () {
        setTimeout(() => {
          if ($scope.Hoja.Asunto != null && $scope.Hoja.Asunto != undefined) {
            if ($scope.Hoja.Asunto != $scope.Busqueda.Asunto.SAVE && $scope.Busqueda.Asunto.SAVE != null) {
              $scope.Hoja.Asunto = $scope.Busqueda.Asunto.SAVE;
              $scope.Busqueda.Asunto.Filtro = null;
            }
            $scope.Busqueda.Asunto.Filtro = null;
          }
          $scope.$apply();
        }, 300);
      }

      ////////////////
      //CONSULTA CONTRATO
      $scope.Buscar_Contrato = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/gestionactpgp.php",
          data: {
            function: 'Buscar_Contrato',
            Bter: $scope.Rol_Nit,
            Cod_Mot: $scope.Hoja.Motivo_Cod,
            Cod_Asu: $scope.Hoja.Asunto_Cod,
            Regimen: $scope.Hoja.Afi_Regimen,
            ubiAfi: $scope.Hoja.Afi_Ubi_Afi,
          }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br') {
            if (response.data.length == 1) {
              $scope.Hoja.Doc_Con = response.data[0].cntc_documento;
              $scope.Hoja.Num_Con = response.data[0].cntn_numero;
              $scope.Hoja.Ubi_Con = response.data[0].cntn_ubicacion;
              $scope.Hoja.contrato = `${response.data[0].cntn_numero}`;
              $scope.Hoja.Status = 4;
              $scope.Efect_5 = "Efect_Op1";
            } else if (response.data.length == 0) {
              swal({
                title: "¡Importante!",
                text: "No se encontro el Contrato",
                type: "info",
              }).catch(swal.noop);
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
      ////////////////
      //CONSULTA PRODUCTO
      $scope.KeyFind_ObProd = function (keyEvent) {
        if ($scope.Busqueda.Producto.Filtro != null && $scope.Busqueda.Producto.Filtro.length != 0) {
          if (keyEvent.which === 40) {
            $scope.Busqueda.Producto.Seleccion = $scope.Busqueda.Producto.Seleccion >= ($scope.Busqueda.Producto.Filtro.length - 1) ? 0 : $scope.Busqueda.Producto.Seleccion + 1;
            document.querySelector('.Clase_Listar_Prod').scrollTo(0, document.querySelector('#Producto' + $scope.Busqueda.Producto.Seleccion).offsetTop);
          } else if (keyEvent.which === 38) {
            $scope.Busqueda.Producto.Seleccion = $scope.Busqueda.Producto.Seleccion <= 0 || $scope.Busqueda.Producto.Seleccion == 9999 ? $scope.Busqueda.Producto.Filtro.length - 1 : $scope.Busqueda.Producto.Seleccion - 1;
            document.querySelector('.Clase_Listar_Prod').scrollTo(0, document.querySelector('#Producto' + $scope.Busqueda.Producto.Seleccion).offsetTop)
          } else if (keyEvent.which === 13 && $scope.Busqueda.Producto.Seleccion != 9999) {
            var x = $scope.Busqueda.Producto.Filtro[$scope.Busqueda.Producto.Seleccion];
            $scope.FillTextbox_Listado_Prod(x.codigo, x.nombre);
          }
        } else {
          if (keyEvent.which === 13)
            $scope.Buscar_Prod();
        }
      }
      $scope.Buscar_Prod = function () {
        if ($scope.Hoja.Producto.length > 2) {
          swal({ title: 'Cargando...' });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/contratacion/gestionactpgp.php",
            data: {
              function: 'Buscar_Producto',
              Coinc: $scope.Hoja.Producto.toUpperCase(),
              Doc_Con: $scope.Hoja.Doc_Con,
              Num_Con: $scope.Hoja.Num_Con,
              Ubi_Con: $scope.Hoja.Ubi_Con,
            }
          }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data[0] != undefined && response.data.length > 1) {
                $scope.Busqueda.Producto.Filtro = response.data;
                $scope.Busqueda.Producto.Listado = response.data;
                $('.Clase_Listar_Prod').css({ width: $('#Hoja_Producto')[0].offsetWidth });
                swal.close();
              }
              if (response.data.length == 1) {
                if (response.data[0].Codigo == '-1') {
                  swal({
                    title: "¡Mensaje!",
                    text: response.data[0].Nombre,
                    type: "info",
                  }).catch(swal.noop);
                  $scope.Busqueda.Producto.Filtro = null;
                  $scope.Busqueda.Producto.Listado = null;
                } else {
                  swal.close();
                  $scope.FillTextbox_Listado_Prod(response.data[0].codigo, response.data[0].nombre, response.data[0].tipo_frecuencia, response.data[0].cantidad_frecuencia);
                }
              } else if (response.data.length == 0) {
                swal({
                  title: "¡Importante!",
                  text: "No se encontro el producto",
                  type: "info",
                }).catch(swal.noop);
              } else if (response.data.Codigo == 1) {
                swal({
                  title: "¡Importante!",
                  text: response.data.Nombre,
                  type: "info",
                }).catch(swal.noop);
              }
            } else {
              swal({
                title: "¡IMPORTANTE!",
                text: response.data,
                type: "warning"
              }).catch(swal.noop);
            }
          })
        } else {
          Materialize.toast('¡Digite al menos 3 caracteres!', 1000); $('.toast').addClass('default-background-dark');
        }
      }
      $scope.Complete_Listado_Prod = function (keyEvent, string) {
        if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
          if ($scope.Hoja.Producto != undefined && string != undefined && $scope.Busqueda.Producto.Listado != undefined) {
            $('.Clase_Listar_Prod').css({ width: $('#Hoja_Producto')[0].offsetWidth });
            var output = [];
            angular.forEach($scope.Busqueda.Producto.Listado, function (x) {
              if (x.nombre.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.codigo.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                output.push({ "codigo": x.codigo, "nombre": x.nombre.toUpperCase(), "tipo_frecuencia": x.tipo_frecuencia, "cantidad_frecuencia": x.cantidad_frecuencia });
              }
            });
            $scope.Busqueda.Producto.Filtro = output;
            $scope.Busqueda.Producto.Seleccion = 9999;
          }
        }
      }
      $scope.FillTextbox_Listado_Prod = function (codigo, nombre, tipo_frecuencia, cantidad_frecuencia) {
        $scope.Hoja.Producto_Cod = codigo;
        $scope.Hoja.Producto_Nom = nombre;
        $scope.Hoja.Tipo_Frecuencia = tipo_frecuencia;
        $scope.Hoja.Cantidad_Frecuencia = cantidad_frecuencia;
        $scope.Hoja.Producto = codigo + ' - ' + nombre;
        $scope.Busqueda.Producto.SAVE = codigo + ' - ' + nombre;
        $scope.Busqueda.Producto.Filtro = null;
        setTimeout(() => {
          $scope.$apply();
          document.getElementById("Hoja_Cantidad").focus();
        }, 500);
      }
      $scope.Blur_Prod = function () {
        setTimeout(() => {
          if ($scope.Hoja.Producto != null && $scope.Hoja.Producto != undefined) {
            if ($scope.Hoja.Producto != $scope.Busqueda.Producto.SAVE && $scope.Busqueda.Producto.SAVE != null) {
              $scope.Hoja.Producto = $scope.Busqueda.Producto.SAVE;
              $scope.Busqueda.Producto.Filtro = null;
            }
            $scope.Busqueda.Producto.Filtro = null;
          }
          $scope.$apply();
        }, 300);
      }

      ////////////////
      //CONSULTA PRODUCTO
      $scope.KeyFind_ObDiag = function (keyEvent) {
        if ($scope.Busqueda.Diagnostico.Filtro != null && $scope.Busqueda.Diagnostico.Filtro.length != 0) {
          if (keyEvent.which === 40) {
            $scope.Busqueda.Diagnostico.Seleccion = $scope.Busqueda.Diagnostico.Seleccion >= ($scope.Busqueda.Diagnostico.Filtro.length - 1) ? 0 : $scope.Busqueda.Diagnostico.Seleccion + 1;
            document.querySelector('.Clase_Listar_Diag').scrollTo(0, document.querySelector('#Diagnostico' + $scope.Busqueda.Diagnostico.Seleccion).offsetTop);
          } else if (keyEvent.which === 38) {
            $scope.Busqueda.Diagnostico.Seleccion = $scope.Busqueda.Diagnostico.Seleccion <= 0 || $scope.Busqueda.Diagnostico.Seleccion == 9999 ? $scope.Busqueda.Diagnostico.Filtro.length - 1 : $scope.Busqueda.Diagnostico.Seleccion - 1;
            document.querySelector('.Clase_Listar_Diag').scrollTo(0, document.querySelector('#Diagnostico' + $scope.Busqueda.Diagnostico.Seleccion).offsetTop)
          } else if (keyEvent.which === 13 && $scope.Busqueda.Diagnostico.Seleccion != 9999) {
            var x = $scope.Busqueda.Diagnostico.Filtro[$scope.Busqueda.Diagnostico.Seleccion];
            $scope.FillTextbox_Listado_Diag(x.codigo, x.nombre);
          }
        } else {
          if (keyEvent.which === 13)
            $scope.Buscar_Diag();
        }
      }
      $scope.Buscar_Diag = function () {
        if ($scope.Hoja.Diagnostico.length > 2) {
          swal({ title: 'Cargando...' });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/contratacion/gestionactpgp.php",
            data: {
              function: 'Buscar_Diagnostico',
              Coinc: $scope.Hoja.Diagnostico.toUpperCase(),
              Edad: $scope.Hoja.Afi_Edad_Dias,
              Sexo: $scope.Hoja.Afi_Sexo
            }
          }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data[0] != undefined && response.data.length > 1) {
                $scope.Busqueda.Diagnostico.Filtro = response.data;
                $scope.Busqueda.Diagnostico.Listado = response.data;
                $('.Clase_Listar_Diag').css({ width: $('#Hoja_Diagnostico')[0].offsetWidth });
                swal.close();
              }
              if (response.data.length == 1) {
                if (response.data[0].Codigo == '-1') {
                  swal({
                    title: "¡Mensaje!",
                    text: response.data[0].Nombre,
                    type: "info",
                  }).catch(swal.noop);
                  $scope.Busqueda.Diagnostico.Filtro = null;
                  $scope.Busqueda.Diagnostico.Listado = null;
                } else {
                  swal.close();
                  $scope.FillTextbox_Listado_Diag(response.data[0].Codigo, response.data[0].Nombre);
                }
              } else if (response.data.length == 0) {
                swal({
                  title: "¡Importante!",
                  text: "No se encontro el Diagnostico",
                  type: "info",
                }).catch(swal.noop);
              } else if (response.data.Codigo == 1) {
                swal({
                  title: "¡Importante!",
                  text: response.data.Nombre,
                  type: "info",
                }).catch(swal.noop);
              }
            } else {
              swal({
                title: "¡IMPORTANTE!",
                text: response.data,
                type: "warning"
              }).catch(swal.noop);
            }
          })
        } else {
          Materialize.toast('¡Digite al menos 3 caracteres!', 1000); $('.toast').addClass('default-background-dark');
        }
      }
      $scope.Complete_Listado_Diag = function (keyEvent, string) {
        if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
          if ($scope.Hoja.Diagnostico != undefined && string != undefined && $scope.Busqueda.Diagnostico.Listado != undefined) {
            $('.Clase_Listar_Diag').css({ width: $('#Hoja_Diagnostico')[0].offsetWidth });
            var output = [];
            angular.forEach($scope.Busqueda.Diagnostico.Listado, function (x) {
              if (x.Nombre.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.Codigo.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                output.push({ "codigo": x.Codigo, "nombre": x.Nombre.toUpperCase() });
              }
            });
            $scope.Busqueda.Diagnostico.Filtro = output;
            $scope.Busqueda.Diagnostico.Seleccion = 9999;
          }
        }
      }
      $scope.FillTextbox_Listado_Diag = function (codigo, nombre) {
        $scope.Hoja.Diagnostico_Cod = codigo;
        $scope.Hoja.Diagnostico_Nom = nombre;
        $scope.Busqueda.Diagnostico.SAVE = codigo + ' - ' + nombre;
        $scope.Busqueda.Diagnostico.Filtro = null;
        setTimeout(() => {
          $scope.$apply();
          document.getElementById("Hoja_Cantidad").focus();
        }, 500);
      }
      $scope.Blur_Diag = function () {
        setTimeout(() => {
          if ($scope.Hoja.Diagnostico != null && $scope.Hoja.Diagnostico != undefined) {
            if ($scope.Hoja.Diagnostico != $scope.Busqueda.Diagnostico.SAVE && $scope.Busqueda.Diagnostico.SAVE != null) {
              $scope.Hoja.Diagnostico = $scope.Busqueda.Diagnostico.SAVE;
              $scope.Busqueda.Diagnostico.Filtro = null;
            }
            $scope.Busqueda.Diagnostico.Filtro = null;
          }
          $scope.$apply();
        }, 300);
      }


      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      $scope.Limpiar_Campos_Req = function (HOJA) {
        angular.forEach(document.querySelectorAll('.' + HOJA + '_Clase .red-text'), function (i) {
          i.classList.remove('red-text');
        });
      }

      $scope.Validar_CamposVacios = function (HOJA) {
        return new Promise((resolve) => {
          $scope.Limpiar_Campos_Req(HOJA);
          if ($scope.Hoja.Afi_TipoDoc == undefined || $scope.Hoja.Afi_TipoDoc == null || $scope.Hoja.Afi_TipoDoc == '') {
            document.querySelector('#Hoja_Afi_TipoDoc').classList.add('Valid_Campo'); return;
          }
          if ($scope.Hoja.Afi_NumDoc == undefined || $scope.Hoja.Afi_NumDoc == null || $scope.Hoja.Afi_NumDoc == '') {
            document.querySelector('#Hoja_Afi_NumDoc').classList.add('Valid_Campo'); return;
          }
          //
          if ($scope.Hoja.Producto_Cod == undefined || $scope.Hoja.Producto_Cod == null || $scope.Hoja.Producto_Cod == '') {
            document.querySelector('#Hoja_Producto').classList.add('Valid_Campo'); return;
          }
          if ($scope.Hoja.Cantidad == undefined || $scope.Hoja.Cantidad == null || $scope.Hoja.Cantidad == '' || $scope.Hoja.Cantidad == '0') {
            document.querySelector('#Hoja_Cantidad').classList.add('Valid_Campo'); return;
          }
          if ($scope.Hoja.Fecha_Prestacion == undefined || $scope.Hoja.Fecha_Prestacion == null || $scope.Hoja.Fecha_Prestacion == '') {
            document.querySelector('#Hoja_Fecha_Prestacion').classList.add('Valid_Campo'); return;
          }
          //
          if ($scope.Hoja.Diagnostico_Cod == undefined || $scope.Hoja.Diagnostico_Cod == null || $scope.Hoja.Diagnostico_Cod == '') {
            document.querySelector('#Hoja_Diagnostico').classList.add('Valid_Campo'); return;
          }
          if ($scope.Hoja.Ambito == undefined || $scope.Hoja.Ambito == null || $scope.Hoja.Ambito == '') {
            document.querySelector('#Hoja_Ambito').classList.add('Valid_Campo'); return;
          }
          resolve(false);
        });
      }

      $scope.Guardar_Solicitud = function () {
        setTimeout(() => {
          $scope.$apply();
        }, 1500);
        // $q.all(Validar_Campos).then(function (resultado) {
        // Campos_Empty = resultado[0].campo;
        $scope.Validar_CamposVacios('Hoja').then(function (result) {
          if (!result) {
            swal({
              title: "¿Está seguro que desea guardar?",
              type: "question",
              showCancelButton: true,
              allowOutsideClick: false
            }).then(function (result) {
              if (result) {
                swal({ title: 'Cargando...' });
                swal.showLoading();
                var Fecha_Prestacion = $scope.GetFechaFormat('Hoja', 'Fecha_Prestacion')
                $http({
                  method: 'POST',
                  url: "php/contratacion/gestionactpgp.php",
                  data: {
                    function: 'Guardar_Solicitud',
                    Bter: $scope.Rol_Nit,
                    Tipo_Doc: $scope.Hoja_Afi_TipoDoc,
                    Num_Doc: $scope.Hoja.Afi_NumDoc,
                    Doc_Con: $scope.Hoja.Doc_Con,
                    Num_Con: $scope.Hoja.Num_Con,
                    Ubi_Con: $scope.Hoja.Ubi_Con,
                    Prod: $scope.Hoja.Producto_Cod,
                    Edad: $scope.Hoja.Afi_Edad_Dias,
                    Sexo: $scope.Hoja.Afi_Sexo,
                    Cant: $scope.Hoja.Cantidad,
                    Fecha: Fecha_Prestacion,
                    Regimen: $scope.Hoja.Afi_Regimen,
                    Tipo_Frecuencia: $scope.Hoja.Tipo_Frecuencia,
                    Cantidad_Frecuencia: $scope.Hoja.Cantidad_Frecuencia,
                    Diagnostico: $scope.Hoja.Diagnostico_Cod,
                    Ambito: $scope.Hoja.Ambito,
                  }
                }).then(function (response) {
                  if (response.data != undefined) {
                    if (response.data.Codigo == 0) {
                      swal({
                        title: "Mensaje",
                        text: response.data.Nombre,
                        type: "success",
                      }).catch(swal.noop);
                      setTimeout(() => {
                        $scope.Hoja = null;
                        $scope.Hoja_Limpiar();
                        $scope.$apply();
                      }, 1500);
                    }
                    if (response.data.Codigo == 1) {
                      swal({
                        title: "Mensaje",
                        text: response.data.Nombre,
                        type: "warning",
                      }).catch(swal.noop);
                    }
                  }
                });
              }
            }).catch(swal.noop);
          } else {
            Materialize.toast('¡Campos vacios o invalidos!', 3000); $('.toast').addClass('default-background-dark');
          }
        });
      }
      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
      $scope.Listar_Actividades = function () {
        if ($scope.Hoja2.Fecha_Inicio <= $scope.Hoja2.Fecha_Fin) {
          swal({ title: 'Cargando...' });
          swal.showLoading();
          var Fecha_Inicio = $scope.GetFechaFormat('Hoja2', 'Fecha_Inicio')
          var Fecha_Fin = $scope.GetFechaFormat('Hoja2', 'Fecha_Fin')

          $http({
            method: 'POST',
            url: "php/contratacion/gestionactpgp.php",
            data: {
              function: 'Listar_Actividades',
              Bter: $scope.Rol_Nit,
              F_Inicio: Fecha_Inicio,
              F_Fin: Fecha_Fin,
            }
          }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data[0] != undefined && response.data.length > 0) {
                $scope.Hoja2.List = response.data;
                $scope.Hoja2.Filter = '';
                swal.close();
              } else {
                $scope.Hoja2.List = null;
                $scope.Hoja2.Filter = '';
                setTimeout(() => {
                  $scope.$apply();
                }, 500);
                swal({
                  title: "¡No se encontraron registros!",
                  type: "info"
                }).catch(swal.noop);
              }
            } else {
              swal({
                title: "¡IMPORTANTE!",
                text: response.data,
                type: "warning"
              }).catch(swal.noop);
            }
          })
        } else {
          swal({
            title: 'Importante',
            text: 'La fecha inicio no debe ser mayor a la fin.',
            type: 'warning',
          }).catch(swal.noop);
        }
      }
      ///////////////////////////////////////////////////////////////////////////////
      $scope.SetTab = function (x) {
        $scope.Tabs = x;
      }

      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, '');
        input.value = valor;
      }

      $scope.FormatSoloTextoNumero = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/\-/g, '');
        // valor = valor.replace(/[a-zA-Z]/g, '');
        // valor = valor.replace(/[^0-9]/g, '');
        valor = valor.replace(/\./g, '');
        input.value = valor;
      }

      $scope.ValFecha = function (HOJA, SCOPE) {
        if ($scope[HOJA][SCOPE] == undefined) {
          $scope[HOJA][SCOPE] = $scope.SysDay;
        }
      }

      $scope.GetFechaFormat = function (HOJA, SCOPE) {
        var xFecha = $scope[HOJA][SCOPE];
        var Fecha = xFecha.getDate() + '/' + (((xFecha.getMonth() + 1) < 10) ? '0' + (xFecha.getMonth() + 1) : (xFecha.getMonth() + 1)) + '/' + xFecha.getFullYear();
        return Fecha
      }
      $scope.Descargar_Excel = function () {
        var F_Inicio = $scope.GetFechaFormat('Hoja2', 'Fecha_Inicio')
        var F_Fin = $scope.GetFechaFormat('Hoja2', 'Fecha_Fin')
        window.open('views/contratacion/formatos/gestionactpgp.php?Bter=' + $scope.Rol_Nit + '&F_Inicio=' + F_Inicio + '&F_Fin=' + F_Fin, '_blank', "width=900,height=1100");
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
