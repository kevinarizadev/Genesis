'use strict';
angular.module('GenesisApp')
  .controller('gestiontutelasareasController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {

      $scope.Inicio = function () {
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_Pantalla();
        if ($(window).height() < 600) {
          angular.forEach(document.querySelectorAll('.Clase_AjustarHeigth_Modal_Soporte'), function (i) {
            i.style.height = '85vh';
          });
        }
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $scope.Rol_Cargo = JSON.parse(sessionStorage.getItem('inicio_perfil')).cod_cargo;
        // $scope.Rol_Cargo = "24";

        if ($scope.Rol_Cargo == undefined) {
          swal("¡Importante!", "Sesion vencida, por favor entrar nuevamente a Genesis", "warning").catch(swal.noop);
          location.reload();
        }

        $('.tabs').tabs();
        $scope.tabs = 1;

        $scope.Vista = 0;
        $scope.SysDay = new Date();
        $scope.listLimpiar();
        $scope.formLimpiar();
        $('.modal').modal();
        setTimeout(() => {
          $scope.$apply();
        }, 500);

        $scope.tipoRol = "";
        if ($scope.List.listadoCargos.findIndex(e => e.cod == $scope.Rol_Cargo) == -1) {
          $scope.tipoRol = "A";
        }

        //////VALIDAR REGIONAL JURIDICA//////
        if ($scope.List.listadoCargos.findIndex(e => e.cod == $scope.Rol_Cargo && e.reg == 'S') != -1) {
          $scope.tipoRol = "R";
        }

        //////VALIDAR JURIDICA NACIONAL//////
        if ($scope.List.listadoCargos.findIndex(e => e.cod == $scope.Rol_Cargo && e.nac == 'S') != -1) {
          $scope.tipoRol = "N";
        }
        if ($scope.Rol_Cedula == '1042454684') {
          $scope.tipoRol = "N";
        }
        //////////////////////////////////////////////////////////
        setTimeout(() => {
          $scope.obtenerListadoTutelas();
          $scope.listadoTutelasConsulta = [];
        }, 1000);
        // console.log($scope.tipoRol);
      }

      $scope.cambiarfunc = function (tipo, cedula) {
        $scope.tipoRol = tipo;
        $scope.Rol_Cedula = cedula;
      }

      // 12964797
      $scope.formLimpiar = function () {
        $scope.Form = {
          Status: 0,
          Filtro: '',
          Mostrar: '',
          filtroEstado: '',


          codTutela: '',
          radTutela: '',
          codRegional: '',
          regional: '',
          // accionante: '',
          codAreaResponsable: '',
          codRenglon: '',
          estado: '',


          tipoDocAccionante: '',
          numDocAccionante: '',
          nombreDocAccionante: '',

          listadoCausaSalud: [],
          listadoCausas: [],

          ttoIntegral: false,
          sgtoContinuo: false,

          soporteAdmision: '',
          soporteFallo: '',
          soporteFalloImp: '',
          soporteModal: '',
          soporteModalTipo: '',

          observacionSolicitudJuridica: '',

          // listadoGestionesPendientes: [],
          // listadoGestiones: [],
          listadoComentarios: [],

          observacionGestion: '',

          comentarioNacional: '',
          // soporte_URL: '',
          soporte_B64: '',

          transferirResponsable: '',
          transferirResponsableListado: [],
          transferirObservacion: '',

          gestionaArea: false,
          gestionaRegional: false,
          gestionaNacional: false,

          checkArea: false,
          checkRegional: false,

        };

        document.querySelector('#FormFile').value = '';

        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      $scope.listLimpiar = function () {
        $scope.List = {
          listadoTutelas: [],

          listadoCargos: [
            { cod: "32", nombre: "ASISTENTE SECCIONAL JURIDICO", reg: "S", nac: "N" },
            { cod: "283", nombre: "JURIDICO REGIONAL", reg: "S", nac: "N" },
            { cod: "109", nombre: "AUXILIAR NACIONAL JURIDICO", reg: "N", nac: "S" },
            { cod: "24", nombre: "ASISTENTE NACIONAL JURIDICO", reg: "N", nac: "S" },
            { cod: "153", nombre: "ESPECIALISTA NACIONAL JURIDICO", reg: "N", nac: "S" },
            { cod: "75", nombre: "COORDINADOR NACIONAL JURIDICO", reg: "N", nac: "S" },
            { cod: "169", nombre: "JEFE DE OFICINA JURIDICO", reg: "N", nac: "S" }
          ]
        };
      }
      $scope.obtenerListadoTutelas = function (X) {
        if (!X)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            // allowOutsideClick: false,
            // allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
        $scope.List.listadoTutelas = [];
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/gestiontutelasareas.php",
          data: {
            function: 'P_lista_tutela_areas',
            condicion: $scope.tipoRol,
            responsable: $scope.Rol_Cedula,
            tipo: 'G'
          }
        }).then(function ({ data }) {
          if (!X)
            swal.close()
          if (data.toString().substr(0, 3) != '<br' && data != 0) {

            data.forEach(element => {
              $scope.obtenerEstiloEstado(element)
            });
            $scope.List.listadoTutelas = data;

            $scope.initPaginacion($scope.List.listadoTutelas);

          } else {
            $scope.initPaginacion($scope.List.listadoTutelas);
            if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            swal("¡Importante!", data, "warning").catch(swal.noop);
          }
        });
      }

      $scope.obtenerListadoTutelasConsulta = function () {
        $scope.filtroConsulta = ''
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          // allowOutsideClick: false,
          // allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $scope.listadoTutelasConsulta = [];
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/gestiontutelasareas.php",
          data: {
            function: 'P_lista_tutela_areas',
            condicion: $scope.tipoRol,
            responsable: $scope.Rol_Cedula,
            tipo: 'V'
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            swal.close();
            data.forEach(element => {
              $scope.obtenerEstiloEstado(element)
            });
            $scope.listadoTutelasConsulta = data;
          } else {
            if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            swal("¡Importante!", data, "warning").catch(swal.noop);
          }
        });
      }

      $scope.editarTutela = function (x) {
        setTimeout(() => {
          var myDiv = document.getElementById('Form1'); myDiv.scrollTop = 0;
        }, 100);
        console.log(x);
        $scope.Form.gestionaArea = false;
        $scope.Form.gestionaRegional = false;
        $scope.Form.gestionaNacional = false;

        $scope.Form.codTutela = x.numero_tutela;
        $scope.Form.radTutela = x.numero_radicacion;
        $scope.Form.regional = x.regional;
        $scope.Form.codRegional = x.regional_cod;
        $scope.Form.codRenglon = x.renglon;

        $scope.Form.estado = x.estado;
        $scope.Form.estadoGestion = x.estado_gestion;

        $scope.Form.tipoDocAccionante = x.tipo_documento;
        $scope.Form.numDocAccionante = x.numero_documento;
        $scope.Form.nombreDocAccionante = x.afiliado_nombre != null ? x.afiliado_nombre : x.datos_accionante;

        $scope.Form.ttoIntegral = x.tratamiento_integral == 'S' ? true : false;
        $scope.Form.sgtoContinuo = x.seguimiento_continuo == 'S' ? true : false;

        $scope.Form.etapaActual = x.etapa;

        $scope.Form.estadoActual = x.estado_actual;
        $scope.Form.colorActual = x.color_actual;

        $scope.Form.fecha_vencimiento = x.fecha_vencimiento;

        $scope.Form.juridicoSolicitudResponsable = x.juridico_solicitud_responsable;
        $scope.Form.observacionSolicitudJuridica = x.observacion_solicitud_juridica;
        $scope.Form.fechaSolicitudRegistro = x.fecha_solicitud_registro;

        $scope.Form.codAreaResponsable = x.area_responsable;
        $scope.Form.funcionarioResponsable = x.funcionario_responsable;
        $scope.Form.area_responsable = x.area_responsable;
        $scope.Form.jefeArea = x.jefe_area;

        $scope.Form.adjuntoGestion = x.adjunto_gestion;
        $scope.Form.observacionGestion = x.observacion_gestion;
        $scope.Form.responsableGestion = x.responsable_gestion;
        $scope.Form.fechaGestion = x.fecha_gestion;

        $scope.Form.observacionRechazoNacional = x.observacion_rechazo_nacional;
        $scope.Form.fechaGestionNacional = x.fecha_gestion_nacional;

        $scope.Form.cantidadComentarios = x.cantidad_comentarios;

        $scope.Form.Status = 1;


        // $scope.Form.checkArea = false;
        // $scope.Form.checkRegional = false;

        $scope.obtenerCausasSalud($scope.Form.codTutela, $scope.Form.codRegional)



        // VALIDAR USUARIO QUE VISUALIZA
        // $scope.tipoRol == 'A'
        // $scope.tipoRol == 'R'
        // $scope.tipoRol == 'N'

        //
        $scope.gestiona_Area = false;
        if ($scope.tipoRol == 'A' && $scope.Form.estadoGestion == 'A' && $scope.Form.funcionarioResponsable.split('-')[0] == $scope.Rol_Cedula) {
          $scope.gestiona_Area = true;

        }

        $scope.gestiona_Regional = false;
        if ($scope.tipoRol == 'R' && $scope.Form.estadoGestion == 'G' && $scope.Form.juridicoSolicitudResponsable.split('-')[0] == $scope.Rol_Cedula) {
          $scope.gestiona_Regional = true;

        }


        setTimeout(() => { $scope.$apply(); }, 300);
      }

      $scope.obtenerCausasSalud = function (numero, ubicacion) {
        $scope.Form.listadoCausaSalud = [];
        $scope.Form.listadoCausas = [];
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/gestiontutelasareas.php",
          data: {
            function: 'p_lista_productos_tut',
            numero, ubicacion
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            var etapaMax = 0;
            data.forEach(e => {
              if (e.ETAPA > etapaMax) { etapaMax = e.ETAPA }
            });
            // console.log(etapaMax);
            data.forEach(e => {
              if (e.ETAPA == etapaMax && e.COD_CAUSA == 'TS') {
                $scope.Form.listadoCausaSalud.push(e)
              }
              if (e.ETAPA == etapaMax && e.COD_CAUSA != 'TS') {
                $scope.Form.listadoCausas.push(e)
              }
            });
            // console.log($scope.Form.listadoCausaSalud)
            // console.log($scope.Form.listadoCausas)
            setTimeout(() => { $scope.$apply(); }, 500);

          } else {
            // if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            // swal("¡Importante!", data, "warning").catch(swal.noop);
          }
        });
      }


      $scope.cargarSoporte = function () {
        return new Promise((resolve) => {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Guardando Soporte...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/gestiontutelasareas.php",
            data: { function: "cargarSoporte", tutela: $scope.Form.codTutela, base64: $scope.Form.soporte_B64 }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }

      $scope.guardarGestionArea = function (numero, ubicacion, renglon) {
        if (!$scope.Form.observacionGestion || $scope.Form.observacionGestion.toString().length <= 20) {
          Materialize.toast('¡Debe digitar una observación, minimo 20 caracteres!', 3000);
          return
        }
        if ($scope.Form.soporte_B64 == '') {
          Materialize.toast('¡Debe adjuntar un soporte!', 3000);
          return
        }

        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $scope.cargarSoporte().then((result) => {
          // console.log(result);
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/gestiontutelasareas.php",
            data: {
              function: "p_ui_areas_tutela",

              numero, ubicacion, renglon,
              area: $scope.Form.codAreaResponsable,
              observacion: '',
              adjunto: result,
              estado: 'G',
              gestion: '',
              observacion_gestion: $scope.Form.observacionGestion,
              observacion_nacional: '',
              accion: 'U',
              funcionario: $scope.Rol_Cedula

            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              if (data.Codigo == 0) {
                // $scope.obtenerListadoTutelas(1);
                $scope.obtenerListadoTutelas(1);
                $scope.formLimpiar();
                setTimeout(() => {
                  $scope.Form.Filtro = numero;
                  $scope.filter(numero);
                }, 1000);
                $scope.atras();
                swal("¡Mensaje!", data.Nombre, "success").catch(swal.noop);
              } else {
                swal("¡Importante!", data.error, "warning").catch(swal.noop);
              }
            }
          })
        })

      }

      $scope.guardarGestionRegional = function (accion, numero, ubicacion, renglon) {
        if (accion == 'A') {
          swal({
            title: 'Confirmar',
            text: "¿Desea aceptar la gestión?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              });
              $http({
                method: 'POST',
                url: "php/juridica/tutelas/gestiontutelasareas.php",
                data: {
                  function: "p_ui_areas_tutela",

                  numero, ubicacion, renglon,
                  area: $scope.Form.codAreaResponsable,
                  observacion: '',
                  adjunto: '',
                  estado: '',
                  gestion: 'A',
                  observacion_gestion: '',
                  observacion_nacional: '',
                  accion: '',
                  funcionario: $scope.Rol_Cedula

                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) != '<br') {
                  if (data.Codigo == 0) {
                    $scope.Form.Filtro = numero;
                    $scope.obtenerListadoTutelas(1);
                    $scope.formLimpiar();
                    setTimeout(() => {
                      $scope.Form.Filtro = numero;
                    }, 1000);
                    $scope.atras();
                    swal("¡Mensaje!", data.Nombre, "success").catch(swal.noop);
                  } else {
                    swal("¡Importante!", data.error, "warning").catch(swal.noop);
                  }
                }
              })
            }
          })
        }
        if (accion == 'X') {
          swal({
            title: 'Observación de rechazo',
            input: 'textarea',
            inputPlaceholder: 'Escribe una observacion...',
            showCancelButton: true,
            allowOutsideClick: false,
            inputAttributes: {
              id: "textarea_swal",
              onkeyup: "FormatSwal()"
            },
          }).then(function (result) {
            if (result && result !== '') {
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              });
              $http({
                method: 'POST',
                url: "php/juridica/tutelas/gestiontutelasareas.php",
                data: {
                  function: "p_ui_areas_tutela",

                  numero, ubicacion, renglon,
                  area: $scope.Form.codAreaResponsable,
                  observacion: '',
                  adjunto: '',
                  estado: '',
                  gestion: 'R',
                  observacion_gestion: '',
                  observacion_nacional: result,
                  accion: '',
                  funcionario: $scope.Rol_Cedula

                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) != '<br') {
                  if (data.Codigo == 0) {
                    $scope.obtenerListadoTutelas(1);
                    $scope.formLimpiar();
                    setTimeout(() => {
                      $scope.Form.Filtro = numero;
                    }, 1000);
                    $scope.atras();
                    swal("¡Mensaje!", data.Nombre, "success").catch(swal.noop);
                  } else {
                    swal("¡Importante!", data.error, "warning").catch(swal.noop);
                  }
                }
              })

            } else {
              Materialize.toast('¡La observacion no puede estar vacia!', 3000);
            }
          }).catch(swal.noop);
          // document.querySelector('.swal2-textarea').style.height = '300px';
        }
      }

      $scope.agregarNuevoComentario = function (numero, ubicacion, renglon) {
        swal({
          title: 'Nuevo Comentario',
          input: 'textarea',
          inputPlaceholder: 'Escribe un comentario...',
          showCancelButton: true,
          allowOutsideClick: false,
          inputAttributes: {
            id: "textarea_swal",
            onkeyup: "FormatSwal()"
          },
        }).then(function (result) {
          if (result.length >= 10) {

            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });
            $http({
              method: 'POST',
              url: "php/juridica/tutelas/gestiontutelasareas.php",
              data: {
                function: 'p_ui_bitacora_areas',
                numero, ubicacion, renglon,
                observacion: result
              }
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) != '<br') {
                if (data.Codigo == 0) {

                  $scope.Form.cantidadComentarios = parseInt($scope.Form.cantidadComentarios) + 1;
                  // $scope.obtenerListadoTutelaAreas($scope.Form.codTutela, $scope.Form.codRegional, $scope.Form.codRenglon)
                  swal('¡Mensaje!', data.Nombre, 'success').catch(swal.noop);
                } else {
                  swal('¡Mensaje!', data.mensaje, 'info').catch(swal.noop);
                }
              } else {
                swal('¡Mensaje!', data, 'error').catch(swal.noop);
              }
            })

          } else {
            swal({
              title: "Mensaje",
              text: "¡La observación debe contener minimo 10 caracteres!",
              type: "warning",
            }).catch(swal.noop);
          }
        }).catch(swal.noop);
      }

      $scope.verComentariosTutela = function (numero, ubicacion, renglon) {
        $scope.openModal('modal_Comentariostutela');
        $scope.Form.modalComentarios_Check = false;
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/gestiontutelasareas.php",
          data: {
            function: 'p_lista_bitacora_area',
            numero, ubicacion, renglon
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            $scope.Form.listadoComentarios = data;
            setTimeout(() => { $scope.$apply(); }, 500);
          } else {
            if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            swal("¡Importante!", data, "warning").catch(swal.noop);
          }
        });
      }



      $scope.verObservacion = function (titulo, obs) {
        swal(titulo, obs, "info").catch(swal.noop);
      }

      $scope.atras = function () {
        $scope.Form.Status = 0;
        setTimeout(function () { $scope.$apply(); }, 500);
      }


      $scope.verModalAdjuntos = function () {
        $scope.Form.soporteModalUrl = '';
        $scope.Form.soporteModalNombre = '';


        $http({
          method: 'POST',
          url: "php/juridica/tutelas/gestiontutelasareas.php",
          data: {
            function: 'p_obtener_soportes_tutela_areas',
            numero: $scope.Form.codTutela
          }
        }).then(function ({ data }) {
          swal.close()
          if (data.toString().substr(0, 3) != '<br' && data != 0) {

            $scope.Form.ListSoportes = data;


            $scope.openModal('Modal_Soportes');

            // $scope.Form.soporteModal = "temp/" + data;
            // console.log(data);
            // $scope.Form.soporteModalTipo = tipo;
            setTimeout(() => { $scope.$apply(); }, 500);
            // $scope.openModal('Modal_Soportes');
          } else {
            // swal("¡Importante!", "Inconveniente al cargar el soporte", "info").catch(swal.noop);
          }
        });
      }


      $scope.verSoporte = function (x) {

        $scope.Form.soporteModalNombre = x.NOMBRE;

        $http({
          method: 'POST',
          url: "php/juridica/tutelas/gestiontutelasareas.php",
          data: {
            function: 'descargaAdjunto',
            ruta: x.RUTA
          }
        }).then(function ({ data }) {

          $scope.Form.soporteModalUrl = "temp/" + data;

        });


      }


      $scope.modalTransferirGestionArea = function () {

        $scope.openModal('modal_Transferir');

        $scope.Form.transferirResponsable = '';
        $scope.Form.transferirResponsableListado = [];
        $scope.Form.transferirObservacion = '';
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.modalTransferirBuscarFuncs = function () {
        if ($scope.Form.transferirResponsable.length < 3) {
          swal("Mensaje", 'Ingrese una coincidencia', "info").catch(swal.noop);
          return
        }
        $scope.transferirResponsableListado = [];
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/gestiontutelasareas.php",
          data: {
            function: "p_obtener_funcionarios",
            coincidencia: $scope.Form.transferirResponsable
          }
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length) {
              $scope.Form.transferirResponsableListado = data;
              if (data.length == 1) {
                $scope.Form.transferirResponsable = data[0].Cedula + '~' + data[0].Nombre;
                return
              }
            } else {
              swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })
      }



      $scope.transferirGestionArea = function () {

        if (!$scope.Form.transferirResponsable.includes('-') || $scope.Form.transferirObservacion.length < 10) {
          swal("Mensaje", '¡Diligencia todos los campos!', "info").catch(swal.noop);
          return
        }

        swal({
          title: 'Confirmar',
          text: "¿Desea transferir la gestión?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {

            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });
            $http({
              method: 'POST',
              url: "php/juridica/tutelas/gestiontutelasareas.php",
              data: {
                function: 'p_guarda_tranferencia_gestion_area',
                numero: $scope.Form.codTutela, ubicacion: $scope.Form.codRegional, renglon: $scope.Form.codRenglon,
                funcionario: $scope.Form.transferirResponsable.split('-')[0].trim(),
                observacion: $scope.Form.transferirObservacion,
                responsable: $scope.Rol_Cedula
              }
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) != '<br') {
                if (data.Codigo == 0) {
                  $scope.closeModal()

                  $scope.obtenerListadoTutelas(1);
                  $scope.formLimpiar();
                  // $scope.obtenerListadoTutelaAreas($scope.Form.codTutela, $scope.Form.codRegional, $scope.Form.codRenglon)
                  swal('¡Mensaje!', data.Nombre, 'success').catch(swal.noop);
                } else {
                  swal('¡Mensaje!', data.mensaje, 'info').catch(swal.noop);
                }
              } else {
                swal('¡Mensaje!', data, 'error').catch(swal.noop);
              }
            })
          }
        })

      }


      $scope.verHistoricoTransferencias = function (numero, ubicacion, renglon) {
        $scope.openModal('modal_Transferencias');
        $scope.Form.listadoTransferencias = []
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/gestiontutelasareas.php",
          data: {
            function: 'p_lista_tranferencia_gestion_area',
            numero, ubicacion, renglon
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            $scope.Form.listadoTransferencias = data;
            setTimeout(() => { $scope.$apply(); }, 500);
          } else {
            if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            swal("¡Importante!", data, "warning").catch(swal.noop);
          }
        });
      }

      //////////////////
      $scope.descargarInforme = function () {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/gestiontutelasareas.php",
          data: { function: 'v_informe_gestion_areas_tutelas' }
        }).then(function ({ data }) {
          if (data.length) {

            var ws = XLSX.utils.json_to_sheet(data);
            /* add to workbook */
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
            /* write workbook and force a download */
            XLSX.writeFile(wb, "Exportado Tutelas General.xlsx");
            const text = `Registros encontrados ${data.length}`
            swal('¡Mensaje!', text, 'success').catch(swal.noop);
          } else {
            swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
          }
        })
      }

      $scope.actualizarRespo = function () {
        if (!$scope.respActual || !$scope.respNuevo) {
          swal('¡Mensaje!', 'Diligencie los campos', 'info').catch(swal.noop);
          return
        }
        swal({
          title: '¿Confirmar cambios?',
          text: "Solo se cambiará el responsable a las gestiones en estado (EN PROCESO, PROXIMO A VENCER o VENCIDO)",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });
            $http({
              method: 'POST',
              url: "php/juridica/tutelas/gestiontutelasareas.php",
              data: {
                function: 'p_actualiza_responsable_gestion',
                actual: $scope.respActual,
                nuevo: $scope.respNuevo,
              }
            }).then(function ({ data }) {
              if (data) {
                if (data.Codigo == 0) {
                  $scope.respActual = '';
                  $scope.respNuevo = '';
                  swal('¡Mensaje!', data.Nombre, 'success').catch(swal.noop);
                  setTimeout(() => { $scope.$apply(); }, 500);
                } else {
                  swal('¡Mensaje!', data.Nombre, 'info').catch(swal.noop);
                }
              } else {
                swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
              }
            })
          }
        })
      }
      //////////////////

      document.querySelector('#FormFile').addEventListener('change', function (e) {
        $scope.Form.soporte_B64 = "";
        setTimeout(() => { $scope.$apply(); }, 500);
        var files = e.target.files;
        if (files.length != 0) {
          for (let i = 0; i < files.length; i++) {
            const x = files[i].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'PDF') {
              if (files[i].size < 15485760 && files[i].size > 0) {
                $scope.getBase64(files[i]).then(function (result) {
                  $scope.Form.soporte_B64 = result;
                  setTimeout(function () { $scope.$apply(); }, 300);
                });
              } else {
                document.querySelector('#FormFile').value = '';
                swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
              }
            } else {
              document.querySelector('#FormFile').value = '';
              swal('Advertencia', '¡El archivo seleccionado debe ser formato PDF!', 'info');
            }
          }
        }
      });
      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      $scope.obtenerClaseEstado = function (estado) {
        const array = {
          '0': 'En proceso',
          '1': 'En proceso',
          '2': 'En proceso',
          '3': 'En proceso',
          '4': 'En proceso',
        }
        return array[estado];
      }
      $scope.obtenerEstiloEstado = function (x) {
        if (x.estado_gestion === 'A') {
          if (x.diferencia_horas === undefined || x.diferencia_horas == '+') {
            x.estado_actual = 'EN PROCESO'; x.color_actual = 'etiquetaAzul'; return
            // return tipo === 'Estilo' ? 'etiquetaAzul' : 'EN PROCESO';
          }
          if (x.diferencia_horas == '-') {
            x.estado_actual = 'PROXIMO A VENCER'; x.color_actual = 'etiquetaNaranja'; return
            // return tipo === 'Estilo' ? 'etiquetaNaranja' : 'PROXIMO A VENCER';
          }
          x.estado_actual = 'VENCIDO'; x.color_actual = 'etiquetaRoja'; return
          // return tipo === 'Estilo' ? 'etiquetaRoja' : 'VENCIDO';
        }

        if (x.estado_gestion === 'P') {
          x.estado_actual = 'PROCESADO'; x.color_actual = 'etiquetaVerde'; return
          // return tipo === 'Estilo' ? 'etiquetaVerde' : 'PROCESADO';
        }

        if (x.estado_gestion === 'G') {
          x.estado_actual = 'GESTIONADO'; x.color_actual = 'etiquetaMorado'; return
          // return tipo === 'Estilo' ? 'etiquetaMorado' : 'GESTIONADO';
        }

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

      $scope.initPaginacion = function (info) {
        $scope.listDatosTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 20;
        $scope.valmaxpag = 20;
        $scope.pages = [];
        $scope.Form.Mostrar = 20;
        $scope.configPages();
      }
      $scope.initPaginacion2 = function (valor) {
        $scope.currentPage = 0;
        if (valor == 0) {
          $scope.pageSize = $scope.listDatosTemp.length;
          $scope.valmaxpag = $scope.listDatosTemp.length;
        } else {
          $scope.pageSize = valor;
          $scope.valmaxpag = valor;
        }
        $scope.pages = [];
        $scope.configPages();
      }
      $scope.filter = function (val) {
        if ($scope.Filter_Val != val) {
          $scope.listDatosTemp = $filter('filter')($scope.List.listadoTutelas, val);
          $scope.configPages();
          $scope.Filter_Val = val;
        } else {
          $scope.listDatosTemp = $filter('filter')($scope.List.listadoTutelas, '');
          $scope.configPages();
          $scope.Filter_Val = '';
        }
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.listDatosTemp.length / $scope.pageSize) > $scope.valmaxpag) {
            if (($scope.pageSize * 10) < $scope.listDatosTemp.length) {
              fin = 10;
            } else {
              fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize);
            }
          }
          else { fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize); }
        } else {
          if (ini >= Math.ceil($scope.listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize);
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
      }
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
        if ($scope.pages.length % 2 == 0) {
          var resul = $scope.pages.length / 2;
        } else {
          var resul = ($scope.pages.length + 1) / 2;
        }
        var i = index - resul;
        if ($scope.listDatosTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize);
        } else {
          var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize) + 1;
        }
        var fin = ($scope.pages.length + i) - 1;
        if (fin > tamanomax) {
          fin = tamanomax;
          i = tamanomax - 9;
        }
        if (index > resul) {
          $scope.calcular(i, fin);
        }
      }
      $scope.paso = function (tipo) {
        if (tipo == 'next') {
          var i = $scope.pages[0].no + 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no + 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage + 1;
          if ($scope.listDatosTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize) + 1;
          }
          if (fin > tamanomax) {
            fin = tamanomax;
            i = tamanomax - 9;
          }
        } else {
          var i = $scope.pages[0].no - 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no - 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage - 1;
          if (i <= 1) {
            i = 1;
            fin = $scope.pages.length;
          }
        }
        $scope.calcular(i, fin);
      }
      $scope.calcular = function (i, fin) {
        if (fin > 9) {
          i = fin - 9;
        } else {
          i = 1;
        }
        $scope.pages = [];
        for (i; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }
      }

      $scope.openModal = function (modal) {
        $(`#${modal}`).modal('open');
        setTimeout(() => { document.querySelector(`#${modal}`).style.top = 1 + '%'; }, 600);
      }
      $scope.closeModal = function () {
        $(".modal").modal("close");
      }

      $scope.setTab = function (x) {
        $scope.tabs = x;
        if (x == 2 && !$scope.listadoTutelasConsulta.length) {
          $scope.obtenerListadoTutelasConsulta();
        }
      }

      $scope.Ajustar_Pantalla = function () {
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
      }

      $(window).on('resize', function () {
        $scope.Ajustar_Pantalla();
      });

      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

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

function FormatSwal() {
  const input = document.querySelectorAll('#textarea_swal')[5];
  var valor = input.value;
  valor = valor.replace(/[|!¡¿?°"#%{}*&''`´¨<>]/g, '');
  valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
  input.value = valor;
}
