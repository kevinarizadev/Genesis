'use strict';
angular.module('GenesisApp')
  .controller('gestiontutelasareasController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {

      $scope.Inicio = function () {
        console.log($(window).width());
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_Pantalla();
        if (sessionStorage.getItem('inicio_perfil') == null) {
          swal("¡Importante!", "Sesion vencida, por favor entrar nuevamente a Genesis", "warning").catch(swal.noop);
          // location.reload();
          return
        }
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $scope.Rol_Cargo = JSON.parse(sessionStorage.getItem('inicio_perfil')).cod_cargo;
        // $scope.Rol_Cargo = "24";

        if ($scope.Rol_Cargo == undefined) {
          swal("¡Importante!", "Sesion vencida, por favor entrar nuevamente a Genesis", "warning").catch(swal.noop);
          location.reload();
        }

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
        }, 1000);
        console.log($scope.tipoRol);
      }
      // 12964797
      $scope.formLimpiar = function () {
        $scope.Form = {
          Status: 0,
          Filtro: '',
          Mostrar: '',



          codTutela: '',
          radTutela: '',
          codRegional: '',
          regional: '',
          // accionante: '',
          codArea: '',
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

          comentarioJuridicoRegArea: '',

          listadoGestionesPendientes: [],
          listadoGestiones: [],
          listadoComentarios: [],

          observacionArea: '',

          comentarioNacional: '',
          // soporte_URL: '',
          soporte_B64: '',

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
            condicion: $scope.tipoRol
          }
        }).then(function ({ data }) {
          if (!X)
            swal.close()
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            $scope.List.listadoTutelas = data;

            $scope.initPaginacion($scope.List.listadoTutelas);

          } else {
            $scope.initPaginacion($scope.List.listadoTutelas);
            if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            swal("¡Importante!", data, "warning").catch(swal.noop);
          }
        });
      }

      $scope.editarTutela = function (x) {
        // console.log(x);
        $scope.Form.gestionaArea = false;
        $scope.Form.gestionaRegional = false;
        $scope.Form.gestionaNacional = false;

        $scope.Form.codTutela = x.numero;
        $scope.Form.radTutela = x.radicacion;
        $scope.Form.regional = x.ubicacion;
        $scope.Form.codRegional = x.cod_ubicacion;
        $scope.Form.estado = x.estado;

        $scope.Form.renglon = x.renglon;
        // 1 AFILIADO
        // 2 IPS
        // 3 AGENTE OFICIOSO
        // 4 OTRO
        // 5 CAJACOPIEPS


        $scope.Form.tipoDocAccionante = x.tipo_documento;
        $scope.Form.numDocAccionante = x.documento_identificacion;
        $scope.Form.nombreDocAccionante = x.afic_nombre != null ? x.afic_nombre : x.datos_accionante;

        $scope.Form.ttoIntegral = x.tratamiento_integral == 'S' ? true : false;
        $scope.Form.sgtoContinuo = x.seguimiento_continuo == 'S' ? true : false;

        $scope.Form.soporteAdmision = x.archivo_admision;
        $scope.Form.soporteFallo = x.archivo_fallo;
        $scope.Form.soporteFalloImp = x.archivo_fallo_impug;

        $scope.Form.Status = 1;

        //////VALIDAR OTRA AREAS//////
        // if ($scope.List.listadoCargos.findIndex(e => e.cod == $scope.Rol_Cargo) == -1) {
        if ($scope.tipoRol == 'A') {
          $scope.Form.gestionaArea = true;
        }

        //////VALIDAR REGIONAL JURIDICA//////
        // if ($scope.List.listadoCargos.findIndex(e => e.cod == $scope.Rol_Cargo && e.reg == 'S') != -1) {
        if ($scope.tipoRol == 'R') {
          $scope.Form.gestionaRegional = true;
        }

        //////VALIDAR JURIDICA NACIONAL//////
        // if ($scope.List.listadoCargos.findIndex(e => e.cod == $scope.Rol_Cargo && e.nac == 'S') != -1) {
        if ($scope.tipoRol == 'N') {
          $scope.Form.gestionaNacional = true;
        }

        $scope.Form.checkArea = false;
        $scope.Form.checkRegional = false;

        $scope.obtenerCausasSalud($scope.Form.codTutela, $scope.Form.codRegional)
        $scope.obtenerListadoTutelaAreas($scope.Form.codTutela, $scope.Form.codRegional, $scope.Form.renglon)

        console.log("gestionaArea:", $scope.Form.gestionaArea, "// gestionaRegional:", $scope.Form.gestionaRegional, "// gestionaNacional:", $scope.Form.gestionaNacional)


        setTimeout(() => { $scope.$apply(); }, 500);
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
            console.log(etapaMax);
            data.forEach(e => {
              if (e.ETAPA == etapaMax && e.COD_CAUSA == 'TS') {
                $scope.Form.listadoCausaSalud.push(e)
              }
              if (e.ETAPA == etapaMax && e.COD_CAUSA != 'TS') {
                $scope.Form.listadoCausas.push(e)
              }
            });
            console.log($scope.Form.listadoCausaSalud)
            console.log($scope.Form.listadoCausas)
            setTimeout(() => { $scope.$apply(); }, 500);

          } else {
            // if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            // swal("¡Importante!", data, "warning").catch(swal.noop);
          }
        });
      }

      $scope.obtenerListadoTutelaAreas = function (numero, ubicacion, renglon) {
        $scope.Form.listadoGestiones = [];
        $scope.Form.listadoGestionesPendientes = [];
        $scope.Form.comentarioJuridicoRegArea = '';
        $scope.Form.codArea = '';
        $scope.Form.codRenglon = '';

        $http({
          method: 'POST',
          url: "php/juridica/tutelas/gestiontutelasareas.php",
          data: {
            function: 'p_obtener_tutelas_areas',
            numero, ubicacion, renglon
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br' && data != 0) {

            data.forEach(e => {
              if ($scope.Form.gestionaArea) {
                if (e.estado == 'A' && e.fun_responsable_area == $scope.Rol_Cedula) {
                  $scope.Form.comentarioJuridicoRegArea = e.observacion_juridica;
                  $scope.Form.codArea = e.area_responsable;
                  $scope.Form.codRenglon = e.renglon;
                  // $scope.Form.listadoGestionesPendientes.push(e);
                }
                if (e.estado == 'A' && e.jefe_area == $scope.Rol_Cedula) {
                  $scope.Form.comentarioJuridicoRegArea = e.observacion_juridica;
                  $scope.Form.codRenglon = 'X';
                  setTimeout(() => { $scope.$apply(); }, 500);
                }
                if (e.estado != 'A') {
                  $scope.Form.listadoGestiones.push(e);
                }

                // if (e.fun_responsable_area == $scope.Rol_Cedula && e.observacion_gestion != '') {
                //   $scope.Form.listadoGestiones.push(e);
                // }
                // if (e.fun_responsable_area == $scope.Rol_Cedula && e.observacion_gestion == '') {
                //   $scope.Form.comentarioJuridicoRegArea = e.observacion_juridica;
                //   $scope.Form.codArea = e.area_responsable;
                //   $scope.Form.codRenglon = e.renglon;
                // }
              }

              if (e.estado == 'A' && e.fun_responsable_area == $scope.Rol_Cedula && $scope.Form.gestionaNacional) {
                $scope.Form.comentarioJuridicoRegArea = e.observacion_juridica;
                $scope.Form.codArea = e.area_responsable;
                $scope.Form.codRenglon = e.renglon;
                // $scope.Form.gestionaArea
                // $scope.Form.listadoGestionesPendientes.push(e);
              }

              if ($scope.Form.gestionaRegional || $scope.Form.gestionaNacional) {
                if (e.estado == 'G') {
                  $scope.Form.listadoGestionesPendientes.push(e);
                }
                if (e.estado != 'G' && e.fun_responsable_area != $scope.Rol_Cedula) {
                  $scope.Form.listadoGestiones.push(e);
                }
              }
              // if ($scope.Form.gestionaNacional) {
              //   $scope.Form.listadoGestiones.push(e);
              // }
            });
            setTimeout(() => {
              if (!$scope.Form.codRenglon) {
                $scope.Form.checkArea = true;
                $scope.$apply();
              }
            }, 1000);
            setTimeout(() => { $scope.$apply(); }, 1500);
          } else {
            if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            swal("¡Importante!", data, "warning").catch(swal.noop);
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

      $scope.guardarGestionArea = function () {
        if (!$scope.Form.observacionArea || $scope.Form.observacionArea.toString().length <= 20) {
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
          console.log(result);
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/gestiontutelasareas.php",
            data: {
              function: "p_ui_areas_tutela",

              numero: $scope.Form.codTutela,
              ubicacion: $scope.Form.codRegional,
              area: $scope.Form.codArea,
              renglon: $scope.Form.codRenglon,
              observacion: '',
              adjunto: result,
              estado: 'G',
              gestion: '',
              observacion_gestion: $scope.Form.observacionArea,
              observacion_nacional: '',
              accion: 'U',
              funcionario: $scope.Rol_Cedula

            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              if (data.Codigo == 0) {
                $scope.obtenerListadoTutelas(1);
                $scope.formLimpiar();
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
                  area: $scope.Form.codArea,
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
                    $scope.obtenerListadoTutelas(1);
                    $scope.formLimpiar();
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
                  area: $scope.Form.codArea,
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

      $scope.guardarGestionNacional = function () {
        if (!$scope.Form.comentarioNacional || $scope.Form.comentarioNacional.toString().length <= 20) {
          Materialize.toast('¡Debe digitar un comentario!', 3000);
          return
        }

        // swal({
        //   html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        //   width: 200,
        //   allowOutsideClick: false,
        //   allowEscapeKey: false,
        //   showConfirmButton: false,
        //   animation: false
        // });
        // $http({
        //   method: 'POST',
        //   url: "php/juridica/tutelas/gestiontutelasareas.php",
        //   data: {
        //     function: "p_guardar_gestion_area",
        //     tutela: $scope.Form.codTutela,
        //     comentario: $scope.Form.comentarioNacional,
        //     responsable: $scope.Rol_Cedula
        //   }
        // }).then(function ({ data }) {
        //   if (data.toString().substr(0, 3) != '<br') {
        //     if (data.codigo == 0) {

        //       $scope.obtenerListadoProyectos();
        //       swal("¡Mensaje!", data.mensaje, "success").catch(swal.noop);
        //     } else {
        //       swal("¡Importante!", data.error, "warning").catch(swal.noop);
        //     }
        //   }
        // })

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
                  $scope.obtenerListadoTutelaAreas($scope.Form.codTutela, $scope.Form.codRegional, $scope.Form.renglon)
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

      $scope.verSoporteModal = function (url, tipo) {

        $scope.Form.soporteModal = '';
        $scope.Form.soporteModalTipo = '';
        $scope.openModal('Modal_Soportes');

        $http({
          method: 'POST',
          url: "php/juridica/tutelas/gestiontutelasareas.php",
          data: {
            function: 'descargaAdjunto',
            ruta: url
          }
        }).then(function ({ data }) {
          swal.close()
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            $scope.Form.soporteModal = "temp/" + data;
            console.log(data);
            $scope.Form.soporteModalTipo = tipo;
            setTimeout(() => { $scope.$apply(); }, 500);
            // $scope.openModal('Modal_Soportes');
          } else {
            swal("¡Importante!", "Inconveniente al cargar el soporte", "info").catch(swal.noop);
          }
        });
      }

      $scope.verObservacion = function (titulo, obs) {
        swal(titulo, obs, "info").catch(swal.noop);
      }

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

      $scope.atras = function () {
        $scope.Form.Status = 0;
        setTimeout(function () { $scope.$apply(); }, 500);
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
      $scope.obtenerEstiloEstado = function (x, tipo) {
        if (x.estado_gestion == 'A' && x.diferencia_horas == undefined) {
          return tipo == 'Estilo' ? 'etiquetaAzul' : 'EN PROCESO'
        }
        if (x.estado_gestion == 'A') {
          if (x.diferencia_horas == '-') {
            return tipo == 'Estilo' ? 'etiquetaNaranja' : 'PROXIMO A VENCER'//Proximo
          }
          if (x.diferencia_horas == '+') {
            return tipo == 'Estilo' ? 'etiquetaAzul' : 'EN PROCESO'
          }
          return tipo == 'Estilo' ? 'etiquetaRoja' : 'VENCIDO'
        }
        if (x.estado_gestion == 'P') {
          return tipo == 'Estilo' ? 'etiquetaVerde' : 'PROCESADO'
        }
        if (x.estado_gestion == 'G') {
          return tipo == 'Estilo' ? 'etiquetaMorado' : 'GESTIONADO'
        }

        // return 'etiquetaRoja'
        // return 'etiquetaVerde'
        // return 'etiquetaNaranja'
        // return 'etiquetaAzul'

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
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.Form.Mostrar = 10;
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
      }
      $scope.closeModal = function () {
        $(".modal").modal("close");
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
