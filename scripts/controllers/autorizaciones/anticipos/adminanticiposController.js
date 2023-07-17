'use strict';
angular.module('GenesisApp')
  .controller('adminanticiposController', ['$scope', '$http', '$timeout', '$filter', '$window', '$q', '$interval',
    function ($scope, $http, $timeout, $filter, $window, $q, $interval) {
      $scope.Quitar_NuevoSol = true;
      console.clear();// No envia mensaje - Si "firma", Firma en base de datos
      $(document).ready(function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).height() < 600) {
          angular.forEach(document.querySelectorAll('.Clase_AjustarHeigth_Modal_Soporte'), function (i) {
            i.style.height = '85vh';
          });
        }
        console.log($(window).height());
        console.log($(window).width());
        $('.tabs').tabs();
        $scope.Tabs = 1;

        var SysDay = new Date();
        $scope.SysDay = SysDay;
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/adminanticipos.php",
          data: {
            function: 'Obt_Cedula'
          }
        }).then(function (response) {
          $scope.Rol_Cedula = response.data;

          $http({
            method: 'POST',
            url: "php/autorizaciones/anticipos/adminanticipos.php",
            data: {
              function: 'Obt_Control',
              Cedula: response.data
            }
          }).then(function (response2) {
            // console.log("DAR PERMISOS: " + response2.data.DIOS);
            // console.log("CEDULA: " + $scope.Rol_Cedula);

            $scope.Rol_Cargo = response2.data.CARGO;
            if (response2.data.UBI_SUBDIRECTOR != null) {
              $scope.Rol_Ubicacion = response2.data.UBI_SUBDIRECTOR;
            } else {
              $scope.Rol_Ubicacion = response2.data.UBI;
            }
            $scope.Rol_Dios = response2.data.DIOS;
            $scope.Rol_Nombre = response2.data.NOMBRE;
            $scope.Listar_Usuarios();
            $scope.Hoja2_Limpiar();
          });
          //////////////////////
        });

        //

      });
      // READY

      $scope.Listar_Usuarios = function () {
        $scope.Usuario = {
          List: {
            Listado: [],
            Filtro: ''
          },
          Form: {
            Cedula: '',
            Nombre: '',
            Correo: '',
            Crear: '',
            Subd: '',
            Estado: '',
            Fecha_Agregado: '',
            Func_Ubi: '',
            Func_Cargo: ''
          }
        }
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/adminanticipos.php",
          data: {
            function: 'Obtener_Usuarios',
            Cedula: ''
          }
        }).then(function (response) {
          $scope.Usuario.List.Listado = response.data;
        })
      }

      $scope.Agregar_Usuario = function () {
        swal({
          title: 'Agregar Nuevo Usuario',
          text: 'Ingrese la cédula del funcionario para que pueda ver/gestionar anticipos.',
          input: 'text',
          inputPlaceholder: 'Ingrese la cédula...',
          showCancelButton: false,
          confirmButtonText: "Aceptar",
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            $http({
              method: 'POST',
              url: "php/autorizaciones/anticipos/adminanticipos.php",
              data: {
                function: 'Insertar_Usuario',
                Cedula: result
              }
            }).then(function (response) {
              if (response.data != undefined) {
                if (response.data.Cod == 0) {
                  swal({
                    title: "Mensaje",
                    text: response.data.Mensaje,
                    type: "success",
                  }).catch(swal.noop);
                  $scope.Listar_Usuarios();
                }
                if (response.data.Cod == 1) {
                  swal({
                    title: "Mensaje",
                    text: response.data.Mensaje,
                    type: "warning",
                  }).catch(swal.noop);
                }
              }
            });
          }
        }).catch(swal.noop);
      }

      $scope.In_Ac_Usuario = function (X) {
        swal({
          title: '¿Desea actualizar el estado del funcionario?',
          text: X.NOMBRE,
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            $http({
              method: 'POST',
              url: "php/autorizaciones/anticipos/adminanticipos.php",
              data: {
                function: 'In_Ac_Usuario',
                Cedula: X.CEDULA
              }
            }).then(function (response) {
              if (response.data != undefined) {
                if (response.data.Cod == 0) {
                  swal({
                    title: "Mensaje",
                    text: response.data.Mensaje,
                    type: "success",
                  }).catch(swal.noop);
                  $scope.Listar_Usuarios();
                }
                if (response.data.Cod == 1) {
                  swal({
                    title: "Mensaje",
                    text: response.data.Mensaje,
                    type: "warning",
                  }).catch(swal.noop);
                }
              }
            });
          }
        }).catch(swal.noop);
      }

      $scope.Modificar_Usuario = function () {
        var regex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (regex.test($scope.Usuario.Form.Correo)) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/anticipos/adminanticipos.php",
            data: {
              function: 'Modificar_Usuario',
              Cedula: $scope.Usuario.Form.Cedula,
              Correo: $scope.Usuario.Form.Correo,
              Crear: $scope.Usuario.Form.Crear,
              Subdirector: $scope.Usuario.Form.Subd,
              Responsable: $scope.Rol_Cedula,
              Cargo: $scope.Usuario.Form.Func_Cargo,
              Ubicacion: $scope.Usuario.Form.Func_Ubi
            }
          }).then(function (response) {
            if (response.data != undefined) {
              if (response.data.Cod == 0) {
                swal({
                  title: "Mensaje",
                  text: response.data.Mensaje,
                  type: "success",
                }).catch(swal.noop);
                $scope.Cerrar_Modal_Usuario();
                $scope.Listar_Usuarios();
              }
              if (response.data.Cod == 1) {
                swal({
                  title: "Mensaje",
                  text: response.data.Mensaje,
                  type: "warning",
                }).catch(swal.noop);
              }
            }
          });
        } else {
          swal({
            title: "Mensaje",
            text: "Por Favor, Ingrese un correo valido.",
            type: "info",
          }).catch(swal.noop);
        }

      }


      $scope.Carga_Tab_Firma = function () {
        $scope.DB_Firmar();
      }


      /////////////////////////////////////////MODALS/////////////////////////////////////////////////
      $scope.Modal = function () {
        SignatureAgent.openModal();
        (function () {
          $('#modal').modal();
        }());
        $('#modal').modal('open');
      }

      $scope.Abrir_Modal_Usuario = function (X) {
        var Cargo_Mod = [26, 34, 82, 6, 87, 70, 101, 83, 14];
        var Cargo_Mod_SN = Cargo_Mod.find(e => e == X.CARGO) != undefined ? true : false;
          $http({
            method: 'POST',
            url: "php/autorizaciones/anticipos/adminanticipos.php",
            data: {
              function: 'Obtener_Usuarios',
              Cedula: X.CEDULA
            }
          }).then(function (response) {
            $scope.Usuario.Form.Cedula = response.data[0].CEDULA;
            $scope.Usuario.Form.Nombre = response.data[0].NOMBRE;
            $scope.Usuario.Form.Correo = response.data[0].CORREO;
            $scope.Usuario.Form.Cargo = response.data[0].CARGO;
            $scope.Usuario.Form.Crear = response.data[0].ACCION;
            $scope.Usuario.Form.Func_Ubi = response.data[0].UBI;
            $scope.Usuario.Form.Func_Cargo = response.data[0].CARGO;
            $scope.Usuario.Form.Fecha_Agregado = response.data[0].FECHA_AGREGADO;
            $scope.Usuario.Form.Subd = (response.data[0].UBI_SUBDIRECTOR == null) ? 'XXX' : response.data[0].UBI_SUBDIRECTOR;
            //
            $scope.Btn_Actualizar_Usu = ($scope.Usuario.Form.Correo != 'XXX' || $scope.Usuario.Form.Cargo == '26' || $scope.Usuario.Form.Cargo == '141' || $scope.Usuario.Form.Cargo == 96 || $scope.Usuario.Form.Cargo == 97 || $scope.Usuario.Form.Cargo == 98 || $scope.Usuario.Form.Cargo == 99 || $scope.Usuario.Form.Cargo == 100 || $scope.Usuario.Form.Cargo == 101 || $scope.Usuario.Form.Cargo == 117 || $scope.Usuario.Form.Cargo == 118);
            var Cargos = [96, 97, 98, 99, 100, 101, 117, 118];
            $scope.Mostrar_Ubi_Sub = Cargos.find(e => e == $scope.Usuario.Form.Cargo) != undefined ? true : false;
            //
            (function () {
              $('#modal_Usuario').modal();
            }());
            $('#modal_Usuario').modal('open');
          });
      }
      $scope.Cerrar_Modal_Usuario = function () {
        $('#modal_Usuario').modal('close');
      }
      /////////////////////////////////////////PAGINACION/////////////////////////////////////////////////

      $scope.openInNewTab = function (url) {
        var win = window.open(url, '_blank');
        win.focus();
      }
      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      $scope.loadFile = function (SOPORTE, SCOPE, B64, NID, NIDT) {
        var ValidarExistente = false;
        var fileInput = document.querySelector('#' + NID);
        if (SCOPE == 'CopiaCedula_URL') {
          if ($scope.Hoja1.Soportes.CopiaCedula_VAL == 1) {
            ValidarExistente = true;
          }
        }
        if (SCOPE == 'CopiaAdres_URL') {
          if ($scope.Hoja1.Soportes.CopiaAdres_VAL == 1) {
            ValidarExistente = true;
          }
        }
        if (ValidarExistente != true) {
          if (fileInput.files.length != 0) {
            var x = fileInput.files[0].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'PDF') {
              if (fileInput.files.length > 0) {
                var Repetidos = false;
                for (var i = 0; i < document.querySelectorAll('.Hoja1_Archivos').length; i++) {
                  if (document.querySelectorAll('.Hoja1_Archivos')[i].id != NIDT && document.querySelector('#' + NIDT).value == document.querySelectorAll('.Hoja1_Archivos')[i].value) {
                    Repetidos = true;
                  }
                }
                if (Repetidos != true) {
                  if (fileInput.files[0].size < 7340032 && fileInput.files[0].size > 0) {
                    $scope.getBase64(fileInput.files[0]).then(function (result) {
                      $http({
                        method: 'POST',
                        url: "php/autorizaciones/anticipos/adminanticipos.php",
                        data: {
                          function: 'Base64',
                          Base64: result,
                          name: NID
                        }
                      }).then(function (response) {
                        $scope.Hoja1[SOPORTE][SCOPE] = response.data + "?page=hsn#toolbar=0";
                        $timeout(function () {
                          angular.forEach(document.querySelectorAll('.Iframe'), function (i) {
                            i.style.width = (document.querySelector('#AdjustSop').offsetWidth - 6) + 'px';
                          });
                        }, 200);
                      });
                      $scope.Hoja1[SOPORTE][B64] = result;
                      $timeout(function () { $scope.$apply(); }, 300);
                    });
                  } else {
                    swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (7MB)!', 'info');
                    fileInput.value = '';
                    document.querySelector('#' + NIDT).value = '';
                    $scope.Hoja1[SOPORTE][SCOPE] = '';
                    $scope.Hoja1[SOPORTE][B64] = '';
                    $timeout(function () { $scope.$apply(); }, 300);
                  }
                } else {
                  swal('Advertencia', '¡Este archivo ya ha sido seleccionado!', 'info');
                  fileInput.value = '';
                  document.querySelector('#' + NIDT).value = '';
                  $scope.Hoja1[SOPORTE][SCOPE] = '';
                  $scope.Hoja1[SOPORTE][B64] = '';
                  $timeout(function () { $scope.$apply(); }, 300);
                }
              }
            } else {
              swal('Advertencia', '¡El archivo seleccionado deber ser formato PDF!', 'info');
              fileInput.value = '';
              document.querySelector('#' + NIDT).value = '';
              $scope.Hoja1[SOPORTE][SCOPE] = '';
              $scope.Hoja1[SOPORTE][B64] = '';
              $timeout(function () { $scope.$apply(); }, 300);
            }
          } else {
            $scope.Hoja1[SOPORTE][SCOPE] = '';
            $scope.Hoja1[SOPORTE][B64] = '';
            $timeout(function () { $scope.$apply(); }, 300);
          }
        } else {
          swal('Advertencia', '¡Ya existe un archivo en el sistema!', 'info');
        }
      }

      /////////////Descargar archivo/////////////////

      ///////////////Tabla Solicitudes Return////////////////////
      $scope.Estado_Solicitud_Tooltip = function (Estado) {
        if (Estado.toString().toUpperCase() == 'A') {
          return "Activo"
        }
        if (Estado.toString().toUpperCase() == 'P') {
          return "Procesado"
        }
        if (Estado.toString().toUpperCase() == 'D') {
          return "Devolución"
        }
        if (Estado.toString().toUpperCase() == 'X') {
          return "Anulado"
        }
      }

      $scope.Estado_Solicitud_Color = function (Estado) {
        if (Estado.toString().toUpperCase() == 'A') {
          return { "background-color": "rgb(3, 197, 20) !important;" }
        }
        if (Estado.toString().toUpperCase() == 'P') {
          return { "background-color": "rgb(71, 71, 165)!important" }
        }
        if (Estado.toString().toUpperCase() == 'D') {
          return { "background-color": "rgb(235, 156, 5) !important;" }
        }
        if (Estado.toString().toUpperCase() == 'X') {
          return { "background-color": "rgb(245, 75,75) !important" }
        }
      }

      $scope.Estado_Solicitud_Clase = function (Estado) {
        if (Estado.toString().toUpperCase() == 'A') {
          return "Con_pulse_A"
        }
        if (Estado.toString().toUpperCase() == 'P') {
          return "Con_pulse_P"
        }
        if (Estado.toString().toUpperCase() == 'D') {
          return "Con_pulse_D"
        }
        if (Estado.toString().toUpperCase() == 'X') {
          return "Con_pulse_X"
        }
      }

      $scope.Estado_Solicitud = function (n) {
        if (n.toString().toUpperCase() == 'A') {
          return { "filter": "hue-rotate(230deg) contrast(1)", "width": "40px" }
        }
        if (n.toString().toUpperCase() == 'P') {
          return { "filter": "hue-rotate(120deg) contrast(1)", "width": "40px" }
        }
        if (n.toString().toUpperCase() == 'D') {
          return { "filter": "hue-rotate(60deg) contrast(1)", "width": "40px" }
        }
        if (n.toString().toUpperCase() == 'X') {
          return { "filter": "hue-rotate(0deg) contrast(1)", "width": "40px" }
        }
      }
      ///
      $scope.Estatus_Solicitud_Tooltip = function (Estado, Estatus) {
        if (Estado.toString().toUpperCase() == 'A') {
          if (Estatus == 0) {
            return "Creado"
          }
          if (Estatus > 0) {
            return "Aprobado"
          }
        }
        if (Estado.toString().toUpperCase() == 'P') {
          return "Procesado"
        }
        if (Estado.toString().toUpperCase() == 'D') {
          return "Devolución"
        }
        if (Estado.toString().toUpperCase() == 'X') {
          return "Anulado"
        }
      }

      $scope.Estatus_Solicitud_Clase = function (Estado, Estatus) {
        if (Estado.toString().toUpperCase() == 'A') {
          if (Estatus == 0) {
            return "icon-circle-empty"
          }
          if (Estatus > 0) {
            return "icon-ok-circled2"
          }
        }
        // 
        if (Estado.toString().toUpperCase() == 'P') {
          return "icon-thumbs-up"
        }
        if (Estado.toString().toUpperCase() == 'D') {
          return "icon-ccw-1"
        }
        if (Estado.toString().toUpperCase() == 'X') {
          return "icon-cancel-circled2"
        }
      }






      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      $scope.Hoja2_Limpiar = function () {
        $scope.Hoja2 = {
          Status: 0,
          Documento: '',
          Nombre: '',
          Cargo: '',

          Archivo: '',
          Archivo_B64: '',

          Cargos: {
            Archivo_Url_34: '',
            Archivo_Url_82: '',
            Archivo_Url_87: '',
            Archivo_Url_70: '',
            Archivo_Url_101: '',
            Archivo_Url_83: '',
          }
        }
      }
      ///Recolecion de firmas
      $scope.KeyFind_Usuario = function (keyEvent) {
        if (keyEvent.which === 13)
          $scope.Hoja2_Buscar_Usuario();
      }

      $scope.Hoja2_Buscar_Usuario = function () {
        if ($scope.Hoja2.Documento != '') {
          $http({
            method: 'POST',
            url: "php/autorizaciones/anticipos/adminanticipos.php",
            data: {
              function: 'Consultar_Usuario_Nuevo',
              ced: $scope.Hoja2.Documento
            }
          }).then(function (response) {
            if (response.data != undefined) {
              if (response.data.codigo == 0) {
                $scope.Hoja2.Status = 1;
                $scope.Hoja2.Nombre = response.data.nombre;
              }
              if (response.data.codigo == 1) {
                swal({
                  title: "Mensaje",
                  text: response.data.nombre,
                  type: "warning",
                }).catch(swal.noop);
              }
            }
          });

        }
      }

      $scope.Hoja2_SelCargo = function () {
        if ($scope.Hoja2.Cargo != '') {
          $scope.Hoja2.Status = 2;
          document.querySelector('#Hoja2_Input').value = '';
          document.querySelector('#Hoja2_Input_Text').value = '';
          $scope.Hoja2.Archivo_B64 = '';
          $scope.Hoja2.Archivo = '';
          setTimeout(function () { $scope.$apply(); }, 300);
        }
      }


      $scope.Hoja2_Guardar_Firma = function () {
        swal({
          title: "¿Desea guardar la firma?",
          // type: "success",
          imageUrl: $scope.Hoja2.Cargos['Archivo_Url_' + $scope.Hoja2.Cargo],
          imageWidth: 200,
          imageHeight: 100,
          showCancelButton: true,
          confirmButtonText: "Guardar",
          cancelButtonText: "Cancelar",
          allowOutsideClick: false

        }).then(function (result) {
          if (result) {
            $http({
              method: 'POST',
              url: "php/autorizaciones/anticipos/adminanticipos.php",
              data: {
                function: 'Guardar_Firma',
                signature: $scope.Hoja2.Archivo_B64,
                ced: $scope.Hoja2.Documento,
              }
            }).then(function (response) {
              if (response.data != undefined) {
                if (response.data.codigo == 0) {
                  $scope.Hoja2_Limpiar();
                  swal({
                    title: "Mensaje",
                    text: response.data.mensaje,
                    type: "success",
                  }).catch(swal.noop);
                }
                if (response.data.codigo == 1) {
                  swal({
                    title: "Mensaje",
                    text: response.data.mensaje,
                    type: "warning",
                  }).catch(swal.noop);
                }
              }
            });
          }
        }).catch(swal.noop);

      }

      $scope.Hoja2_Ver_Formato = function () {
        var mywindow = window.open('', '_blank', 'width=1080,height=1100');
        mywindow.document.write('<html><head>');
        mywindow.document.write('<style> @page { size: auto; margin: 1em; } * { font-family: "Open Sans", sans-serif; -webkit-print-color-adjust: exact !important; color-adjust: exact !important; } #table1, #table1 tr th, #table1 tr td { border: .5px solid black; border-collapse: collapse; font-size: 7px; border-spacing: 0 0 !important; } .Firma { background-size: cover; width: 200px; height: 85px; margin: auto; background-position-y: 0; filter: grayscale(100%); } </style>');
        mywindow.document.write('</head>');
        mywindow.document.write('<body>');
        mywindow.document.write(document.getElementById('tab2').innerHTML);
        mywindow.document.write('</body></html>');
        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/
        mywindow.print();
        // mywindow.close();
        // return true;
      }
      ////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////

      $scope.SetTab = function (x) {
        $scope.Tabs = x;

      }

      $scope.loadFile = function () {
        $scope.Hoja2.Cargos.Archivo_Url_34 = '';
        $scope.Hoja2.Cargos.Archivo_Url_82 = '';
        $scope.Hoja2.Cargos.Archivo_Url_87 = '';
        $scope.Hoja2.Cargos.Archivo_Url_70 = '';
        $scope.Hoja2.Cargos.Archivo_Url_101 = '';
        $scope.Hoja2.Cargos.Archivo_Url_83 = '';
        var fileInput = document.querySelector('#Hoja2_Input');
        if (fileInput.files.length != 0) {
          var x = fileInput.files[0].name.split('.');
          if (x[x.length - 1].toUpperCase() == 'JPEG' || x[x.length - 1].toUpperCase() == 'PNG' || x[x.length - 1].toUpperCase() == 'JPG') {
            if (fileInput.files.length > 0) {
              if (fileInput.files[0].size < 1048576 && fileInput.files[0].size > 0) {
                $scope.getBase64(fileInput.files[0]).then(function (result) {
                  $http({
                    method: 'POST',
                    url: "php/autorizaciones/anticipos/adminanticipos.php",
                    data: {
                      function: 'Baseimg',
                      Base64: result.split(',')[1]
                    }
                  }).then(function (response) {
                    $scope.Hoja2.Cargos['Archivo_Url_' + $scope.Hoja2.Cargo] = response.data;
                    // console.log($scope.Hoja2.Cargos);
                    $scope.Hoja2.Status = 3;
                    document.getElementById('tab2').scrollTop = 1000;
                    // 
                    setTimeout(function () {
                      $scope.$apply();
                    }, 1000);

                  });
                  $scope.Hoja2.Archivo_B64 = result.split(',')[1];
                  setTimeout(function () { $scope.$apply(); }, 1000);
                });
              } else {
                swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (1MB)!', 'info');
                fileInput.value = '';
                document.querySelector('#Hoja2_Input_Text').value = '';
                $scope.Hoja2.Cargos['Archivo_Url_' + $scope.Hoja2.Cargo] = '';
                $scope.Hoja2.Archivo_B64 = '';
                setTimeout(function () { $scope.$apply(); }, 300);
              }
            }
          } else {
            swal('Advertencia', '¡El archivo seleccionado deber ser formato Imagen!', 'info');
            fileInput.value = '';
            document.querySelector('#Hoja2_Input_Text').value = '';
            $scope.Hoja2.Cargos['Archivo_Url_' + $scope.Hoja2.Cargo] = '';
            $scope.Hoja2.Archivo_B64 = '';
            setTimeout(function () { $scope.$apply(); }, 300);
          }
        } else {
          $scope.Hoja2.Cargos['Archivo_Url_' + $scope.Hoja2.Cargo] = '';
          $scope.Hoja2.Archivo_B64 = '';
          setTimeout(function () { $scope.$apply(); }, 300);
        }
      }
      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      // $scope.propertyName = 'CONSECUTIVO';
      $scope.reverse2 = true;
      $scope.sortBy2 = function (propertyName2) {
        $scope.reverse2 = ($scope.propertyName2 === propertyName2) ? !$scope.reverse2 : false;
        $scope.propertyName2 = propertyName2;
      };

      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, '');
        input.value = valor;
      }

    }])
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
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

  //Asistente Seccional De Autorizaciones
  //Auditor Médico Seccional
  //Coordinador Seccional
  //Asistente Nacional De Autorizaciones

  //Especialista Nacional De Autorizaciones
  //Coordinador Nacional De Autorizaciones
  //Subdirector Nacional de Salud
  //Director De Salud
  //Asistente Nacional De Autorizaciones

