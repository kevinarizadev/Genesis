'use strict';

angular.module('GenesisApp')

  .controller('consultapqrController', ['$scope', '$http', '$location', '$filter', 'ngDialog', '$timeout', 'pqrHttp', 'afiliacionHttp', function ($scope, $http, $location, $filter, ngDialog, $timeout, pqrHttp, afiliacionHttp) {

    $(document).ready(function () {
      $("#modalmotivos").modal();
      $("#trazapqr").modal();
      $("#modalcambiofecha").modal();
      $scope.documentologueo = sessionStorage.getItem("cedula");
      // $scope.filterOptions = 'PQR';
      // $scope.numero = '211540';
      // $scope.numero = '211516';//SUPER
      // setTimeout(() => { $scope.$apply(); }, 500);
    });

    //variables de control

    // variables TAB I
    //secciones de ng hide
    $scope.inactiveseccion4tab4 = false;
    $scope.activetipotabIV = true;
    $scope.nofindproductstabI = false;
    $scope.nofindproductstabIV = false;
    $scope.inactimiprestab1 = true;
    $scope.inactimiprestab4 = true;
    $scope.inactivetagmipres = true;
    $scope.inactivetagctc = true;
    $scope.inactivetagtutela = true;
    $scope.inactivetagsiniestro = true;
    $scope.verPQRS = true;


    // wizard

    $scope.invsolicitudtabI = true;
    $scope.invproductotabI = true;
    $scope.invfinalizartabI = true;
    $scope.invfinalizartabIV = true;

    // variables TAB II
    //secciones de ng hide
    $scope.inactiveseccion1tab2 = false;
    $scope.inactiveseccion2tab2 = true;
    $scope.productosagregadostabII = [];
    $scope.nofindproductstabII = false;
    // wizard
    $scope.invsolicitudtabII = true;
    $scope.invproductotabII = true;
    $scope.invfinalizartabII = true;


    $scope.novedades = null;
    $scope.datosAfiModalNov = null;
    $scope.tutelaParam = null;
    $scope.siniestroParam = null;
    $scope.maxDate = null;
    $scope.documentosAfiliado = null;
    $scope.v_encabezado = null;
    $scope.fechactual = null;
    $scope.jsonautorizacion = {
      medio_recepcionavanzado: '',
      radicadoravanzado: '',
      responsableavanzado: '',
      estadoavanzado: '',
      tempfecha_recibidoiniavanzado: '',
      tempfecha_recibidofinavanzado: '',
      tempfecha_radicacioniniavanzado: '',
      tempfecha_radicacionfinavanzado: '',
      tempfecha_entregainiavanzado: '',
      tempfecha_entregafinavanzado: '',
      motivo_especifico: '',
      tempfecha_recibidoiniavanzado: '',
      tempfecha_recibidofinavanzado: '',
      tempfecha_radicacioniniavanzado: '',
      tempfecha_radicacionfinavanzado: '',
      tempfecha_entregainiavanzado: '',
      tempfecha_entregainiavanzado: ''
    },
      $scope.fechaactualizardiashabiles = '';
    $scope.diashabilesactualizar = '';
    //Se valida fecha actual

    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1; //hoy es 0!
    var yyyy = hoy.getFullYear();

    $scope.fechactual = hoy;

    if (dd < 10) {
      dd = '0' + dd
    }



    if (mm < 10) {
      mm = '0' + mm
    }



    $scope.maxDate = yyyy + '-' + mm + '-' + dd;
    $scope.filterOptions = 'AFILIADO';
    $scope.autdocumento = null;
    $scope.autnumero = null;
    $scope.autubicacion = null;
    $scope.autnitips = null;
    $scope.tipoSolicitud = [
      {
        "Codigo": "C",
        "Nombre": "CONSULTA Y/O SOLICITUD DE INFORMACION",
        "Tipo": "P"
      },
      {
        "Codigo": "D",
        "Nombre": "DERECHO DE PETICION",
        "Tipo": "P"
      },
      {
        "Codigo": "F",
        "Nombre": "FELICITACIONES",
        "Tipo": "P"
      },
      {
        "Codigo": "H",
        "Nombre": "HABEAS DATA",
        "Tipo": "P"
      },
      {
        "Codigo": "Q",
        "Nombre": "QUEJA",
        "Tipo": "P"
      },
      {
        "Codigo": "R",
        "Nombre": "RECLAMO",
        "Tipo": "P"
      }
    ]

    $scope.tempsol = '';
    $scope.selectedtipoSolicitud = '';
    $scope.changeSolicitud = function (solicitud) {//Funcion para validar solicitud

      if (solicitud.length > 0) {
        $scope.tempsol = JSON.parse(solicitud);
        setTimeout(() => {
          console.log('$scope.tempsol.Codigo', $scope.tempsol.Codigo);
          $scope.jsonautorizacion.tipo_solcitud = $scope.tempsol.Codigo;
        }, 100);

        pqrHttp.getMediosRecepcionTipo($scope.tempsol.Tipo).then(function (response) {
          $scope.mediosRecepcion = response;
        })
      } else {
        $scope.jsonautorizacion.tipo_solcitud = '';
        $scope.mediosRecepcion = null;
        $scope.jsonautorizacion.medio_recepcionavanzado = '';
      }
    }//Fin


    function validate_fecha(fecha) {

      var patron = new RegExp("^(19|20)+([0-9]{2})([-])([0-9]{1,2})([-])([0-9]{1,2})$");
      if (fecha.search(patron) == 0) {
        var values = fecha.split("-");
        if (isValidDate(values[2], values[1], values[0])) {
          return true;
        }
      }
      return false;
    }

    function isValidDate(day, month, year) {
      var dteDate;
      month = month - 1;
      dteDate = new Date(year, month, day);
      //Devuelva true o false...
      return ((day == dteDate.getDate()) && (month == dteDate.getMonth()) && (year == dteDate.getFullYear()));
    }

    function formatDate(date) {
      var dd = ('0' + date.getDate()).slice(-2);
      var mm = ('0' + (date.getMonth() + 1)).slice(-2);
      var yyyy = date.getFullYear();
      var hh = date.getHours();
      var mi = date.getMinutes();
      return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
    }



    $scope.buscarAfiliado = function (tipo, tipodocumento, documento) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtenerafiliados', tipodocumento: tipodocumento, documento: documento }
      }).then(function (response) {
        if (response.data.CODIGO != "0") {
          if (tipo == '3') {

            $scope.infoafiliadoautedit = null;

            $scope.infoafiliadoautedit = response.data;

            if ($scope.infoafiliadoautedit.Estado != 'ACTIVO') {

              $scope.informacionmodaledit = 'Afiliado no se encuentra activo en base de datos';

              swal('Importante', 'Afiliado no se encuentra activo en la base de datos.', 'info');

            } else {

              $scope.afirownumIV = 1;

              if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {

                $scope.afirownumIV = $scope.afirownumIV + 1;

              }

              if ($scope.infoafiliadoautedit.TUTELA == 'true') {

                $scope.afirownumIV = $scope.afirownumIV + 1;

              }

              if ($scope.infoafiliadoautedit.PORTABILIDAD == 'S') {

                $scope.afirownumIV = $scope.afirownumIV + 1;

              }
              if ($scope.infoafiliadoautedit.ERROR_50 == 'true') {

                $scope.afirownumIV = $scope.afirownumIV + 1;

              }

              if ($scope.infoafiliadoautedit.AFIC_T045 == 'S') {

                $scope.afirownumIV = $scope.afirownumIV + 1;

              }



              $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento, tipo);

              $scope.sexoafitabIV = $scope.infoafiliadoautedit.SexoCodigo;

              $scope.edadafitabIV = $scope.infoafiliadoautedit.EdadDias;

              $scope.regimenafitabIV = $scope.infoafiliadoautedit.CodigoRegimen;

              $scope.datosAfiModalNov = $scope.infoafiliadoautedit;

              $scope.inactiveseccion1tab4 = true;

              $scope.inactiveseccion2tab4 = false;

              $scope.productosagregadostabIV = [];

            }

          }
          // $scope.$apply();

        } else {

          swal('Importante', response.data.NOMBRE, 'info')

        }

      });

    }
    $scope.trazapqr = "";
    $scope.valservicio = false;
    $scope.valespecialidad = false;
    $scope.showDataPQR = false;

    $scope.openmodals = function (tipo, opcion) {
      $scope.buscard1 = "";
      $scope.buscard2 = "";
      $scope.buscarpro = "";
      switch (tipo) {

        case 'trazapqr':
          if (pqr) {
            pqrHttp.getInfoAseguramientoPQR(opcion.CODIGO).then(function (response) {
              $scope.dpqr = response.data[0];
              $scope.dataPqr = response.data[0];
            })
          }
          pqrHttp.p_mostrar_traza(opcion.CODIGO).then(function (response) {
            $scope.trazapqr = response;
          })

          pqrHttp.getProcesoSaludPQR(opcion.CODIGO).then(function (res) {
            $scope.procesopqr = res.data;
            console.log(res.data)
            if ($scope.procesopqr.length > 0) {
              $scope.showDataPQR = true;
            } else {
              $scope.showDataPQR = false;
            }
          })
          $scope.numeroPQR = opcion.CODIGO;
          $scope.estadoPQR = opcion.ESTADO;
          $scope.opcionComentario = false;
          $scope.cargarComentarioPQR();

          var permisosCargos = [
            { cargo: 1 },
            { cargo: 4 },
            { cargo: 10 },
            { cargo: 20 },
            { cargo: 25 },
            { cargo: 29 },
            { cargo: 32 },
            { cargo: 41 },
            { cargo: 52 },
            { cargo: 64 },
            { cargo: 133 },
            { cargo: 156 },
            { cargo: 160 },
            { cargo: 172 },
            { cargo: 201 }
          ]
          $scope.opcionComentario = (permisosCargos.findIndex(e => e.cargo == $scope.Rol_cargo)) == -1 ? false : true;

          $("#trazapqr").modal("open");
          $scope.trazapqrTabs = 1;
          setTimeout(() => {
            $('#Sol').click();
            $('.tabs').tabs();
          }, 700);
          break;
        case 'modaldetalle':
          $scope.v_detallev = null;
          $scope.v_encabezadov = null;
          $scope.dAuto = null;
          $scope.sumPrint = 0;
          $scope.buscarAfiliado('3', opcion.TIPO_DOC, opcion.DOCUMENTO);
          $scope.consultarAutorizacion(opcion.NUMERO, opcion.UBICACION, 'C');
          $("#modaldetalle").modal("open");
          break;
        case 'modaldetalleprograma':
          $scope.v_detallev = null;
          $scope.v_encabezadov = null;
          $scope.verPrintDetalle = true;
          $scope.buscarAfiliado('3', opcion.TIPO_DOC, opcion.DOCUMENTO);
          $scope.dAuto = opcion;
          $scope.detalleAutorizacionProg(opcion.NUMERO, opcion.UBICACION);
          $("#modaldetalle").modal("open");
          break;
        case 'modalnovedades':
          $scope.buscarnovedades();
          $("#modalnovedades").modal("open");
          break;
        case 'modaldocumentos':
          $scope.buscardocumentos();
          $("#modaldocumentos").modal("open");
          break;
        case 'modalhistoricochat':
          $scope.tempcenso = opcion;
          $http({
            method: 'POST',
            url: "php/censo/censo.php",
            data: { function: 'obtenerChat', proceso: 1, numerocenso: opcion.CODIGOCENSO, ubicacion: opcion.UBICACION }
          }).then(function (response) {
            $scope.comentarios = response.data;
          })
          $("#modalhistoricochat").modal("open");
          break;
        case 'motivos':
          if ($scope.jsonautorizacion.tipo_solcitud) {
            pqrHttp.getMotivosEspecificosTiposol($scope.jsonautorizacion.tipo_solcitud).then(function (response) {
              console.log(response);
              $scope.motivosEspecificos = response;
            })

            $("#modalmotivos").modal("open");
          } else {
            swal('Importante', "Para filtrar por Motivo Especifico debe seleccionar el Tipo de Solicitud!", 'info');
          }



          break;
        default:
      }
    }

    $scope.closemodals = function (tipo) {
      switch (tipo) {

        case 'trazapqr':
          $("#trazapqr").modal("close");
          break;

        case 'limpiartabIV':
          $scope.viewdataAut = true;
          $scope.viewdataAutprog = true;
          $scope.switchtable = false;
          $scope.check_option_2 = false;
          $scope.check_option = false;
          $scope.nameaut = 'PQRDS';
          $scope.listarPQRS = [];
          $scope.listarPQRSprog = [];
          $scope.numautprocesada = null;
          $scope.numautprocesadaIV = null;
          $scope.ubicacionPrint = null;
          break;
        case 'motivos':
          $("#modalmotivos").modal("close");
          break;

        default:
      }
    }
    $scope.trazapqrSetTab = function (x) {
      $scope.trazapqrTabs = x;
      setTimeout(() => {
        $scope.$apply();
      }, 500);
    }

    $scope.cargarComentarioPQR = function () {
      $scope.Rol_cargo = JSON.parse(sessionStorage.getItem("inicio_perfil")).cod_cargo;
      // console.log($scope.Rol_cargo)
      $http({
        method: 'POST',
        url: "php/siau/pqr/Rpqr.php",
        data: { function: 'obtenerComentariosPQR', pqr: $scope.numeroPQR }
      }).then(function ({ data }) {
        $scope.comentariosPQR = data;
      })
    }
    $scope.crearComentarioPQR = function () {
      if ($scope.comentarioPQR == undefined || $scope.comentarioPQR == null || $scope.comentarioPQR.length < 20) {
        swal('¡Mensaje!', 'Debe escribir un comentario, minimo 20 caracteres', 'error').catch(swal.noop);
        return;
      }
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
        url: "php/siau/pqr/Rpqr.php",
        data: {
          function: 'crearComentariosPQR',
          pqr: $scope.numeroPQR,
          comentario: $scope.comentarioPQR,
          responsable: $scope.documentologueo
        }
      }).then(function ({ data }) {
        if (data.toString().substr(0, 3) != '<br') {
          if (data.codigo == 0) {
            $scope.comentarioPQR = '';
            swal('¡Mensaje!', data.mensaje, 'success').catch(swal.noop);
            $scope.cargarComentarioPQR();
          } else {
            swal('¡Mensaje!', data.mensaje, 'info').catch(swal.noop);
          }
        } else {
          swal('¡Mensaje!', data, 'error').catch(swal.noop);
        }
      })
    }
    $scope.formatTexto = function (NID) {
      const input = document.getElementById('' + NID + '');
      var valor = input.value;
      valor = valor.replace(/[|!¿¡?°"#/()=$%&''´¨´¨¨¨<>]/g, '');
      valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
      input.value = valor.toString().toUpperCase();
    }

    $scope.validarMarcacion = function (pqr) {
      $scope.marcacionPQR_SN = 'N';
      $scope.marcacionPQR_observacion = 'N';
      $scope.marcacionPQR_responsable = 'N';
      $http({
        method: 'POST',
        url: "php/siau/pqr/Rpqr.php",
        data: {
          function: 'obtenerMarcacionPQR',
          pqr: pqr
        }
      }).then(function ({ data }) {
        // console.log(data);
        if (data.marca) {
          $scope.marcacionPQR_SN = data.marca;
          $scope.marcacionPQR_observacion = data.observacion;
          $scope.marcacionPQR_responsable = data.responsable_nom;
          setTimeout(() => { $scope.$apply(); }, 500);
        } else {
          // swal({
          //   title: "¡Ocurrio un error!",
          //   text: data,
          //   type: "warning"
          // }).catch(swal.noop);
        }
      });
    }

    $scope.quitarMarcacion = function (pqr) {
      swal({
        title: 'Observación',
        input: 'textarea',
        inputValue: $scope.marcacionPQR_observacion,
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        // showConfirmButton: false,
        confirmButtonText: "Desmarcar",
        customClass: 'swal-wide'
      }).then(function (result) {
        console.log(result)
        if (result.length > 0) {
          //

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
            url: "php/siau/pqr/Rpqr.php",
            data: {
              function: 'crearMarcacionPQR',
              pqr: pqr.CODIGO,
              observacion: '',
              responsable: $scope.documentologueo
            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              if (data.codigo == 0) {
                $scope.comentarioPQR = '';
                swal('¡Mensaje!', data.mensaje, 'success').catch(swal.noop);
                $scope.validarMarcacion(pqr.CODIGO);
              } else {
                swal('¡Mensaje!', data.mensaje, 'info').catch(swal.noop);
              }
            } else {
              swal('¡Mensaje!', data, 'error').catch(swal.noop);
            }
          })
          //
        }
        $(".confirm").attr('disabled', 'disabled');
      }).catch(swal.noop);
      document.querySelector('.swal2-textarea').setAttribute("readonly", true);
      document.querySelector('.swal2-textarea').style.height = '400px';
    }

    $scope.realizarMarcacion = function (pqr) {
      swal({
        title: 'Observación Gestion Pendiente',
        input: 'textarea',
        inputPlaceholder: 'Escribe un comentario...',
        showCancelButton: true,
        allowOutsideClick: false,
        inputValue: '',
        width: 'auto',
      }).then(function (result) {
        if (result.length >= 10) {
          //
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
            url: "php/siau/pqr/Rpqr.php",
            data: {
              function: 'crearMarcacionPQR',
              pqr: pqr.CODIGO,
              observacion: result,
              responsable: $scope.documentologueo
            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              if (data.codigo == 0) {
                $scope.comentarioPQR = '';
                swal('¡Mensaje!', data.mensaje, 'success').catch(swal.noop);
                $scope.validarMarcacion(pqr.CODIGO);
              } else {
                swal('¡Mensaje!', data.mensaje, 'info').catch(swal.noop);
              }
            } else {
              swal('¡Mensaje!', data, 'error').catch(swal.noop);
            }
          })
          //
        } else {
          swal({
            title: "Mensaje",
            text: "¡La observación debe contener minimo 10 caracteres!",
            type: "warning",
          }).catch(swal.noop);
        }
      }).catch(swal.noop);
    }


    $scope.descargarExportadoMarcacion = () => {
      window.open('views/siau/pqr/formatos/formato_marcacionsuper.php');
    }

    // $scope.descargarExportadoMarcacion();

    $scope.descargarExportadoMarcacion_Pqr = (pqr) => {
      window.open('views/siau/pqr/formatos/formato_marcacionsuper_pqr.php?pqr=' + pqr.CODIGO, '_blank', "width=1080,height=1100");
    }


    $scope.capita = null;
    $scope.buscarnovedades = function () {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: {
          function: 'obtener_novedades', documento: $scope.infoafiliadoautedit.Documento,
          tipodocumento: $scope.infoafiliadoautedit.TipoDocumento
        }
      }).then(function (response) {
        $scope.novedades = response.data;
      })
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: {
          function: 'obtener_capita', documento: $scope.infoafiliadoautedit.Documento,
          tipodocumento: $scope.infoafiliadoautedit.TipoDocumento
        }
      }).then(function (response) {
        $scope.capita = response.data;
      })
    }
    $scope.buscardocumentos = function () {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: {
          function: 'obtener_soportes', documento: $scope.infoafiliadoautedit.Documento,
          tipodocumento: $scope.infoafiliadoautedit.TipoDocumento
        }
      }).then(function (response) {
        $scope.documentosAfiliado = response.data;
      })

    }

    $scope.viewDocument = function (ruta, ftp) {
      if (ftp == 1) {
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: { function: 'descargaAdjunto', ruta: ruta }
        }).then(function (response) {
          window.open("temp/" + response.data);
        });
      }
      if (ftp == 2) {
        $http({
          method: 'POST',
          url: "php/getfileSFtp.php",
          data: { function: 'descargaAdjunto', ruta: ruta }
        }).then(function (response) {
          window.open("temp/" + response.data);
        });
      }
    }






    $scope.limpiar = function () {
      $scope.verPQRS = true;
      $scope.verPQRSEdit = false;
      $scope.inactiveseccion4tab4 = false;
      $scope.check_option = false;
      $scope.autdocumento = null;
      $scope.autnumero = null;
      $scope.autubicacion = null;
      $scope.filtaut = null
      $scope.showsenso = -1;
      $scope.listarPQRSTemp = [];
      $scope.listarPQRS = [];
      $scope.filterOptions = $scope.tempfilterOptions;
    }

    // Funciones TABI

    $scope.viewdataAut = true;
    $scope.viewdataAutprog = true;
    $scope.verPQRS = true;
    $scope.verPQRSEdit = false;
    $scope.inactivebarraproedit = true;
    $scope.tempjsonpqr = {
      user: sessionStorage.getItem('cedula'),
      tipodoc_afiliado: '',
      documento: '',
      filtro: '',
      numero: '',
      rowid: '100',
      fecha_radicacioniniavanzado: '',
      tempfecha_radicacionfinavanzado: '',
      fecha_recibidoiniavanzado: '',
      fecha_recibidofinavanzado: '',
      fecha_entregainiavanzado: '',
      fecha_entregafinavanzado: '',
      responsableavanzado: '',
      estadoavanzado: '',
      motivo_especifico: '',
      radicadoravanzado: '',
      tipo_solcitud: '',
      medio_recepcionavanzado: ''
    };


    function formatDate(date) {
      var dd = ('0' + date.getDate()).slice(-2);
      var mm = ('0' + (date.getMonth() + 1)).slice(-2);
      var yyyy = date.getFullYear();
      var hh = date.getHours();
      var mi = date.getMinutes();
      return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
    }



    $scope.buscarPQR = function () {
      $scope.nameaut = 'PQRDS';
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      $scope.tempfilterOptions = $scope.filterOptions;

      if ($scope.filterOptions == 'AFILIADO') {
        if ($scope.documento == '' || $scope.documento == 0 || $scope.documento == null) {
          $scope.validatefiltros = true;
        } else {
          $scope.validatefiltros = false;
        }
      }
      if ($scope.filterOptions == 'PQR') {
        if ($scope.numero == '' || $scope.numero == 0 || $scope.numero == null) {
          $scope.validatefiltros = true;
        } else {
          $scope.validatefiltros = false;
        }

      }
      if ($scope.filterOptions == 'AVANZADO') {
        $scope.tempjsonpqr = Object.assign({}, $scope.jsonautorizacion);
        $scope.sumavanzado = '';
        if ($scope.tempjsonpqr.tipo_solcitud) {
          $scope.sumavanzado = $scope.sumavanzado + 1;
        } else {
          $scope.tempjsonpqr.tipo_solcitud = '';
        }
        if ($scope.tempjsonpqr.radicadoravanzado) {
          $scope.sumavanzado = $scope.sumavanzado + 1;
        } else {
          $scope.tempjsonpqr.radicadoravanzado = '';
        }
        if ($scope.tempjsonpqr.documentoavanzado) {
          $scope.sumavanzado = $scope.sumavanzado + 1;
        } else {
          $scope.tempjsonpqr.documentoavanzado = '';
        }
        if ($scope.tempjsonpqr.responsableavanzado) {
          $scope.sumavanzado = $scope.sumavanzado + 1;
        } else {
          $scope.tempjsonpqr.responsableavanzado = '';
        }
        if ($scope.tempjsonpqr.estadoavanzado) {
          $scope.sumavanzado = $scope.sumavanzado + 1;
        } else {
          $scope.tempjsonpqr.estadoavanzado = '';
        }

        if ($scope.tempjsonpqr.motivo_especifico) {
          $scope.sumavanzado = $scope.sumavanzado + 1;
        } else {
          $scope.tempjsonpqr.motivo_especifico = '';
        }

        if ($scope.tempjsonpqr.tempfecha_recibidoiniavanzado && $scope.tempjsonpqr.tempfecha_recibidofinavanzado) {
          $scope.sumavanzado = $scope.sumavanzado + 1;
          $scope.tempjsonpqr.fecha_recibidoiniavanzado = formatDate($scope.tempjsonpqr.tempfecha_recibidoiniavanzado);
          $scope.tempjsonpqr.fecha_recibidofinavanzado = formatDate($scope.tempjsonpqr.tempfecha_recibidofinavanzado);

        }

        if ($scope.tempjsonpqr.tempfecha_radicacioniniavanzado && $scope.tempjsonpqr.tempfecha_radicacionfinavanzado) {
          $scope.sumavanzado = $scope.sumavanzado + 1;
          $scope.tempjsonpqr.fecha_radicacioniniavanzado = formatDate($scope.tempjsonpqr.tempfecha_radicacioniniavanzado);
          $scope.tempjsonpqr.fecha_radicacionfinavanzado = formatDate($scope.tempjsonpqr.tempfecha_radicacionfinavanzado);
        }

        if ($scope.tempjsonpqr.tempfecha_entregainiavanzado && $scope.tempjsonpqr.tempfecha_entregainiavanzado) {
          $scope.sumavanzado = $scope.sumavanzado + 1;
          $scope.tempjsonpqr.fecha_entregainiavanzado = formatDate($scope.tempjsonpqr.tempfecha_entregainiavanzado);
          $scope.tempjsonpqr.fecha_entregafinavanzado = formatDate($scope.tempjsonpqr.tempfecha_entregainiavanzado);
        }


        // if ($scope.sumavanzado >= 3) {
        $scope.validatefiltros = false;
        // }


      }

      if ($scope.validatefiltros == false) {

        if ($scope.filterOptions == 'AFILIADO') {
          $scope.tempjsonpqr.tipodoc_afiliado = $scope.tipodocumento;
          $scope.tempjsonpqr.documento = $scope.documento;
          $scope.tempjsonpqr.numero = '';
          $scope.tempjsonpqr.filtro = 'A';
        }
        if ($scope.filterOptions == 'PQR') {
          $scope.tempjsonpqr.numero = $scope.numero;
          $scope.tempjsonpqr.filtro = 'P';
        }

        if ($scope.filterOptions == 'AVANZADO') {
          $scope.tempjsonpqr.filtro = 'Z';
        }

        swal.close();
        // console.log($scope.filterOptions);


        // console.log($scope.tempjsonpqr);
        $scope.tempjsonpqr.user = sessionStorage.getItem('cedula');
        pqrHttp.getPQRAvanzado(JSON.stringify($scope.tempjsonpqr)).then(result => {

          if (result.info && result.info.CODIGO == '1') {
            $scope.verPQRS = true;
            $scope.infoafiliadoautedit = [];

            $scope.validatefiltros = true;
            swal('Importante', result.info.NOMBRE, 'info');
            $scope.listarPQRS = [];

          } else {
            swal.close();
            if (result.tipo == 'AVANZADO') {
              $scope.listarPQRS = result.pqr;
              $scope.JSONToCSVConvertor('LISTADO DE PQRDS', true);
            } else {
              $scope.verPQRS = false;
              $scope.infoafiliadoautedit = result.info;
              $scope.listarPQRS = result.pqr;
              $scope.initPaginacion($scope.listarPQRS);

            }


            if (result.tipo == 'AFILIADO') {
              $scope.filterOptions = 'AFILIADO';
              $scope.afirownumIV = 1;

              if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {

                $scope.afirownumIV = $scope.afirownumIV + 1;

              }

              if ($scope.infoafiliadoautedit.TUTELA == 'true') {

                $scope.afirownumIV = $scope.afirownumIV + 1;

              }

              if ($scope.infoafiliadoautedit.PORTABILIDAD == 'S') {

                $scope.afirownumIV = $scope.afirownumIV + 1;

              }
              if ($scope.infoafiliadoautedit.ERROR_50 == 'true') {

                $scope.afirownumIV = $scope.afirownumIV + 1;

              }

              if ($scope.infoafiliadoautedit.AFIC_T045 == 'S') {

                $scope.afirownumIV = $scope.afirownumIV + 1;

              }

              if ($scope.tempfilterOptions == 'PQR') {

                $scope.Validar_TUACGS(result.pqr[0].CODIGO);
                if (result.pqr[0].COD_SUPERSALUD) {
                  $scope.validarMarcacion(result.pqr[0].CODIGO);
                }
              }
              $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento);
            }

            $scope.validatefiltros = true;

          }
        })



      } else {
        if ($scope.filterOptions == 'AFILIADO') {
          $scope.textvalidate = "Datos del AFILIADO no pueden estar vacios!"
        }
        if ($scope.filterOptions == 'PQR') {
          $scope.textvalidate = "Datos de la PQR no pueden estar vacios!"
        }


        if ($scope.filterOptions == 'AVANZADO') {
          if ($scope.sumavanzado < 3) {
            $scope.textvalidate = "Datos de la busqueda AVANZADA no pueden estar vacios!"
          }

        }


        swal('Importante', $scope.textvalidate, 'info');

      }
    }


    $scope.initPaginacion = function (info) {
      $scope.listarPQRSTemp = info;
      $scope.currentPage = 0;
      $scope.pageSize = 10;
      $scope.valmaxpag = 10;
      $scope.pages = [];
      $scope.configPages();
    }
    $scope.configPages = function () {
      $scope.pages.length = 0;
      var ini = $scope.currentPage - 4;
      var fin = $scope.currentPage + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil($scope.listarPQRSTemp.length / $scope.pageSize) > $scope.valmaxpag)
          fin = 10;
        else
          fin = Math.ceil($scope.listarPQRSTemp.length / $scope.pageSize);
      } else {
        if (ini >= Math.ceil($scope.listarPQRSTemp.length / $scope.pageSize) - $scope.valmaxpag) {
          ini = Math.ceil($scope.listarPQRSTemp.length / $scope.pageSize) - $scope.valmaxpag;
          fin = Math.ceil($scope.listarPQRSTemp.length / $scope.pageSize);
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
      if ($scope.listarPQRSTemp.length % $scope.pageSize == 0) {
        var tamanomax = parseInt($scope.listarPQRSTemp.length / $scope.pageSize);
      } else {
        var tamanomax = parseInt($scope.listarPQRSTemp.length / $scope.pageSize) + 1;
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
        if ($scope.listarPQRSTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.listarPQRSTemp.length / $scope.pageSize);
        } else {
          var tamanomax = parseInt($scope.listarPQRSTemp.length / $scope.pageSize) + 1;
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

    $scope.filter = function (val) {
      $scope.listarPQRSTemp = $filter('filter')($scope.listarPQRS, val);
      if ($scope.listarPQRSTemp.length > 0) {
        $scope.setPage(1);
      }
      $scope.configPages();
    }



    $scope.calcularEdad = function (date) {
      //var fecha=document.getElementById("user_date").value;
      var fecha = date.split("/").reverse().join("-");
      if (validate_fecha(fecha) == true) {
        // Si la fecha es correcta, calculamos la edad
        var values = fecha.split("-");
        var dia = values[2];
        var mes = values[1];
        var ano = values[0];

        // cogemos los valores actuales
        var fecha_hoy = new Date();
        var ahora_ano = fecha_hoy.getYear();
        var ahora_mes = fecha_hoy.getMonth() + 1;
        var ahora_dia = fecha_hoy.getDate();

        // realizamos el calculo
        var edad = (ahora_ano + 1900) - ano;
        if (ahora_mes < mes) {
          edad--;
        }

        if ((mes == ahora_mes) && (ahora_dia < dia)) {
          edad--;
        }

        if (edad > 1900) {
          edad -= 1900;
        }



        // calculamos los meses
        var meses = 0;
        if (ahora_mes > mes)
          meses = ahora_mes - mes;
        if (ahora_mes < mes)
          meses = 12 - (mes - ahora_mes);
        if (ahora_mes == mes && dia > ahora_dia)
          meses = 11;

        // calculamos los dias
        var dias = 0;
        if (ahora_dia > dia)
          dias = ahora_dia - dia;
        if (ahora_dia < dia) {
          var ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
          dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
        }



        if (edad > 0) {

          $scope.cantidadanosautedit = 'años'

          if (edad == 1) {

            $scope.cantidadanosautedit = 'años'

          }

          $scope.edadautedit = edad;

        } else {

          if (meses > 0) {

            $scope.cantidadanosautedit = 'meses'

            if (meses == 1) {

              $scope.cantidadanosautedit = 'mes'

            }

            $scope.edadautedit = meses;

          } else {

            if (dias > 0) {

              $scope.cantidadanosautedit = 'dias'

              if (dias == 1) {

                $scope.cantidadanosautedit = 'dia'

              }

              $scope.edadautedit = dias;

            }

          }

        }




      }

    }

    $scope.Validar_TUACGS = function (CODIGO) {
      // ESTADO: "ACTIVO"
      // var c_Tutela = 0;
      // var c_Altocosto = 0;
      // var c_Gestionriesgo = 0;
      $scope.shw_Tutela = false;
      $scope.shw_Altocosto = false;
      $scope.shw_Gestionriesgo = false;
      $scope.mdl_Tutela = '';
      $scope.mdl_Altocosto = '';
      $scope.mdl_Gestionriesgo = '';
      setTimeout(() => { $scope.$apply(); }, 200);
      $http({
        method: 'POST',
        url: "php/siau/pqr/Rpqr.php",
        data: {
          function: 'P_CONSULTA_ACCION_AREA',
          v_ppqr: CODIGO
        }
      }).then(function ({ data }) {
        // console.log(data);
        if (data && data.toString().substr(0, 3) != '<br') {
          if (data.length > 0) {
            data.forEach(e => {
              // if (e.AREA == 'TU' && e.ACCION == null) { $scope.shw_Tutela = true }
              // if (e.AREA == 'AC' && e.ACCION == null) { $scope.shw_Altocosto = true }
              // if (e.AREA == 'GS' && e.ACCION == null) { $scope.shw_Gestionriesgo = true }
              if (e.AREA == 'TU') { $scope.shw_Tutela = true; $scope.mdl_Tutela = e.ACCION }
              if (e.AREA == 'AC') { $scope.shw_Altocosto = true; $scope.mdl_Altocosto = e.ACCION }
              if (e.AREA == 'GS') { $scope.shw_Gestionriesgo = true; $scope.mdl_Gestionriesgo = e.ACCION }
            });
            setTimeout(() => { $scope.$apply(); }, 500);
          }

        } else {
          swal({
            title: "¡Ocurrio un error!",
            text: data,
            type: "warning"
          }).catch(swal.noop);
        }
      });
    }

    $scope.Guarda_Accion_TUACGS = function (CODIGO, TIPO) {
      if (sessionStorage.getItem('cedula') == '1042454684' || sessionStorage.getItem('cedula') == '1140861113') {
        if (TIPO == 'TU') { if (sessionStorage.getItem('cedula') != '1042454684') { swal('Mensaje', 'Usuario sin permisos', 'info'); return false } }
        if (TIPO == 'AC') { if (sessionStorage.getItem('cedula') != '1140861113') { swal('Mensaje', 'Usuario sin permisos', 'info'); return false } }
        if (TIPO == 'GS') { if (sessionStorage.getItem('cedula') != '1042454684') { swal('Mensaje', 'Usuario sin permisos', 'info'); return false } }

        var options = { N: 'NO', S: 'SI' };
        swal({
          title: 'Confirmar Gestión',
          input: 'select',
          inputOptions: options,
          inputPlaceholder: 'Seleccionar',
          showCancelButton: true,
          allowOutsideClick: false,
          width: 'auto',
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value !== '') {
                resolve();
              } else {
                swal.close();
              }
            })
          }
        }).then(function (cod) {
          if (cod) {
            swal({
              title: "¿Desea guardar los cambios?",
              type: "question",
              showCancelButton: true,
              allowOutsideClick: false,
            }).catch(swal.noop)
              .then((willDelete) => {
                if (willDelete) {
                  $http({
                    method: 'POST',
                    url: "php/siau/pqr/Rpqr.php",
                    data: {
                      function: 'P_UI_ACCION_AREA',
                      v_ppqr: CODIGO,
                      v_paccion: cod,
                      v_presponsable: sessionStorage.getItem('cedula'),
                      v_parea: TIPO
                    }
                  }).then(function ({ data }) {
                    if (data && data.toString().substr(0, 3) != '<br') {
                      if (data.Codigo == 0) {
                        $scope.Validar_TUACGS($scope.listarPQRS[0].CODIGO);
                        swal('Mensaje', data.Nombre, 'success');
                      } else {
                        swal('Mensaje', data.Nombre, 'info');
                      }
                    } else {
                      swal({
                        title: "¡Ocurrio un error!",
                        text: data,
                        type: "warning"
                      }).catch(swal.noop);
                    }
                    console.log(data)

                  })
                }
              });
          }
        })

      }
    }


    $scope.descargafile = function (ruta, ftp) {
      pqrHttp.dowloadfile(ruta, ftp).then(function (response) {
        window.open("temp/" + response.data);
      });
    }

    $scope.motivo = { codigo: null, nombre: null, seleccion: null };
    $scope.seleccionarMotivo = function (motivo) {
      $scope.motivo.codigo = motivo.CODIGO;
      $scope.motivo.nombre = motivo.NOMBRE;
      $scope.motivo.seleccion = $scope.motivo.codigo + ' - ' + $scope.motivo.nombre;
      $scope.tempjsonpqr.motivo_especifico = $scope.motivo.codigo;
      $scope.closemodals('motivos');
    }

    $scope.removerMotivo = function () {
      $scope.motivo.codigo = null;
      $scope.motivo.nombre = null;
      $scope.motivo.seleccion = null;
      $scope.tempjsonpqr.motivo_especifico = '';
    }

    $scope.limpiarAvanzado = function () {
      $scope.selectedtipoSolicitud = '';
      $scope.motivo.codigo = null;
      $scope.motivo.nombre = null;
      $scope.motivo.seleccion = null;
      $scope.jsonautorizacion = {
        medio_recepcionavanzado: '',
        radicadoravanzado: '',
        responsableavanzado: '',
        estadoavanzado: '',
        tempfecha_recibidoiniavanzado: '',
        tempfecha_recibidofinavanzado: '',
        tempfecha_radicacioniniavanzado: '',
        tempfecha_radicacionfinavanzado: '',
        tempfecha_entregainiavanzado: '',
        tempfecha_entregafinavanzado: '',
        motivo_especifico: '',
        tempfecha_recibidoiniavanzado: '',
        tempfecha_recibidofinavanzado: '',
        tempfecha_radicacioniniavanzado: '',
        tempfecha_radicacionfinavanzado: '',
        tempfecha_entregainiavanzado: '',
        tempfecha_entregainiavanzado: ''
      }
    }

    $scope.JSONToCSVConvertor = function (ReportTitle, ShowLabel) {
      var json = $scope.listarPQRS;
      var tempjson = [];
      for (let index = 0; index < json.length; index++) {
        const element = json[index];
        tempjson.push({
          PQR: element.CODIGO2,
          SOLICITUD: element.SOLICITUD,
          FECHA_RECIBIDO: element.FECHAREC,
          FECHA_RADICACION: element.FECHARAD,
          FECHA_POSIBLE_ENTREGA: element.FECHAENT,
          FECHA_RESPUESTA: element.FECHARESPUESTA,
          ESTADO_RESPUESTA: element.ESTADO_RESPUESTA,
          MEDIO_RECEPCION: element.NOMMEDIO,
          RIEGO_VIDA: element.SELECTEDRV == 'S' ? 'SI' : 'NO',
          OBSERVACION: element.OBSERVACION,
          RESPUESTA: element.RESPUESTA,
          DIAS_HABILES_RESTANTES: element.DIAS,
          DIAS_HABILES: element.DIAS_HABILES,
          CODRESP: element.CODRESP,
          RESPONSABLE: element.RESPONSABLE,
          ESTADO: element.ESTADO,
          COD_SUPERSALUD: element.COD_SUPERSALUD,
          COD_NURC: element.COD_NURC,
          MOTIVO_ESPECIFICO: element.CODIGO_ESPECIFICO + "-" + element.MOTIVO_ESPECIFICO,
          TIPO_RADICACION: element.TIPO_RADICACION,
          RADICACION: element.RADICACION
        });

      }
      tempjson = JSON.stringify(tempjson);
      //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
      var arrData = typeof tempjson != 'object' ? JSON.parse(tempjson) : tempjson;

      var CSV = '';

      //This condition will generate the Label/Header
      if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

          //Now convert each value to string and comma-seprated
          row += index + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
      }

      //1st loop is to extract each row
      for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
          row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
      }

      if (CSV == '') {
        alert("Invalid data");
        return;
      }

      //Generate a file name
      var fileName = "";
      //this will remove the blank-spaces from the title and replace it with an underscore
      fileName += ReportTitle.replace(/ /g, "_");

      //Initialize file format you want csv or xls
      var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

      // Now the little tricky part.
      // you can use either>> window.open(uri);
      // but this will not work in some browsers
      // or you will not get the correct file extension

      //this trick will generate a temp <a /> tag
      var link = document.createElement("a");
      link.href = uri;

      //set the visibility hidden so it will not effect on your web-layout
      link.style = "visibility:hidden";
      link.download = fileName + ".csv";

      //this part will append the anchor tag and remove it after automatic click
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    $scope.busquedaDetalles = function () {
      $scope.busquedaXdetalles = ngDialog.open({
        template: 'views/consultaAfiliados/modalBusquedaDetalles.html',
        className: 'ngdialog-theme-plain',
        controller: 'modalBusquedaxnombres',
        closeByEscape: false,
        closeByDocument: false
      });
      $scope.busquedaXdetalles.closePromise.then(function (response) {
        if (response.value === undefined) { return; }
        if (response.value != "$closeButton") {
          $scope.type = response.value.tipo;
          $scope.id = response.value.documento;
          $scope.estado_bus = 'A';
          $scope.documento = $scope.id;
          $scope.tipodocumento = $scope.type;
          $scope.buscarPQR();

        }
      });
    }

    $scope.changevaluePQR = function () {
      $scope.showDataPQR = !$scope.showDataPQR;
    }

    $scope.modalactualizarfecha = function (numeroradicado) {
      $scope.fechaactualizardiashabiles = "";
      $scope.diashabilesactualizar;
      $scope.numeroradicoadoactualizar = numeroradicado.split("-");
      pqrHttp.getDias().then(function (response) {
        $scope.seleccionardias = response;
      });
      $("#modalcambiofecha").modal("open");
    }
    $scope.cerrarmodalcambiofecha = function () {
      $("#modalcambiofecha").modal("close");
    }

    $scope.actualizarfecharegistro = function () {
      var numerodelradicado = $scope.numeroradicoadoactualizar[1]
      if (numerodelradicado == '' || numerodelradicado == null || numerodelradicado == undefined ||
        $scope.fechaactualizardiashabiles == '' || $scope.fechaactualizardiashabiles == null || $scope.fechaactualizardiashabiles == undefined ||
        $scope.diashabilesactualizar == '' || $scope.diashabilesactualizar == null || $scope.diashabilesactualizar == undefined) {
        swal('Importante', 'Por favor Llenar Los campos Obligatorios', 'info');
      } else {
        $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: {
            function: 'actualizarfecharespuesta',
            numerodelradicado: numerodelradicado,
            fechaactualizar: formatDate($scope.fechaactualizardiashabiles),
            diashabiles: $scope.diashabilesactualizar
          }
        }).then(function (response) {
          console.log(response);
          $("#modalcambiofecha").modal("close");
          if (response.data.Codigo == 0) {
            swal('Exitoso', response.data.Nombre, 'success');
            $scope.limpiar();
          } else {
            swal('Importante', response.data.Nombre, 'info');
          }
        })
      }

    }

    // $scope.JSONToCSVConvertor = function (ReportTitle, ShowLabel) {

    //     var json = $scope.listarPQRSTemp;
    //     var tempjson = [];
    //     for (let index = 0; index < json.length; index++) {
    //       const element = json[index];

    //       tempjson.push({
    //         PQR: element.CODIGO2,
    //         SOLICITUD: element.SOLICITUD,
    //         FECHA_RECIBIDO: element.FECHAREC,
    //         FECHA_RADICACION: element.FECHARAD,
    //         FECHA_POSIBLE_ENTREGA: element.FECHAENT,
    //         FECHA_RESPUESTA: element.FECHARESPUESTA,
    //         ESTADO_RESPUESTA: element.ESTADO_RESPUESTA,
    //         MEDIO_RECEPCION: element.NOMMEDIO,
    //         RIEGO_VIDA: element.SELECTEDRV =='S' ? 'SI':'NO',
    //         OBSERVACION: element.OBSERVACION,
    //         RESPUESTA: element.RESPUESTA,
    //         DIAS_HABILES_RESTANTES: element.DIAS,
    //         DIAS_HABILES: element.DIAS_HABILES,
    //         CODRESP: element.CODRESP,
    //         RESPONSABLE: element.RESPONSABLE,
    //         ESTADO: element.ESTADO,
    //         COD_SUPERSALUD: element.COD_SUPERSALUD,
    //         COD_NURC: element.COD_NURC,
    //         MOTIVO_ESPECIFICO: element.CODIGO_ESPECIFICO + "-" + element.MOTIVO_ESPECIFICO,
    //         TIPO_RADICACION: element.TIPO_RADICACION,
    //         RADICACION: element.RADICACION
    //       });


    //     }
    //     console.log(JSON.stringify(tempjson));
    //     tempjson = JSON.stringify(tempjson);
    //     //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    //     var arrData = typeof tempjson != 'object' ? JSON.parse(tempjson) : tempjson;

    //     var CSV = '';

    //     //This condition will generate the Label/Header
    //     if (ShowLabel) {
    //       var row = "";

    //       //This loop will extract the label from 1st index of on array
    //       for (var index in arrData[0]) {

    //         //Now convert each value to string and comma-seprated
    //         row += index + ',';
    //       }

    //       row = row.slice(0, -1);

    //       //append Label row with line break
    //       CSV += row + '\r\n';
    //     }

    //     //1st loop is to extract each row
    //     for (var i = 0; i < arrData.length; i++) {
    //       var row = "";

    //       //2nd loop will extract each column and convert it in string comma-seprated
    //       for (var index in arrData[i]) {
    //         row += '"' + arrData[i][index] + '",';
    //       }

    //       row.slice(0, row.length - 1);

    //       //add a line break after each row
    //       CSV += row + '\r\n';
    //     }

    //     if (CSV == '') {
    //       alert("Invalid data");
    //       return;
    //     }

    //     //Generate a file name
    //     var fileName = "";
    //     //this will remove the blank-spaces from the title and replace it with an underscore
    //     fileName += ReportTitle.replace(/ /g, "_");

    //     //Initialize file format you want csv or xls
    //     var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    //     // Now the little tricky part.
    //     // you can use either>> window.open(uri);
    //     // but this will not work in some browsers
    //     // or you will not get the correct file extension

    //     //this trick will generate a temp <a /> tag
    //     var link = document.createElement("a");
    //     link.href = uri;

    //     //set the visibility hidden so it will not effect on your web-layout
    //     link.style = "visibility:hidden";
    //     link.download = fileName + ".csv";

    //     //this part will append the anchor tag and remove it after automatic click
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   }


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
