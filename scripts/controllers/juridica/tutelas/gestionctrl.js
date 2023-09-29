'use strict';
angular.module('GenesisApp')
  .controller('gestionctrl', ['$scope', '$http', 'consultaHTTP', 'ngDialog', 'cfpLoadingBar',
    function ($scope, $http, consultaHTTP, ngDialog, cfpLoadingBar) {
      $(document).ready(function () {
        $(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({ "margin-top": "0px", "margin-top": "7px" });

        $('#height').on('input change', function () {
          var height = $(this).val();
          if (height >= 30) {
            var leftOffset = (Math.tan(45 * (Math.PI / 180)) * (height / 2) + 3) * -1;
            $('.steps').css('height', height).css('line-height', height + "px").css('left', leftOffset + "px");
          }
        });

        $('.modal').modal();
        //$.fn.dataTable.moment();
        $scope.btnActualizarTutela = true;
        $.getJSON("php/obtenersession.php").done(function (respuesta) {
          $scope.sesdata = respuesta;
          $scope.cedulalog = $scope.sesdata.cedula;

          $scope.validarPermisos();

          //////////////////////////////////OJO BORRAR//////////////////////////////////
          // setTimeout(() => {
          //   $scope.crear();
          //   // $scope.registro.tipoidafiliado = 'CC'
          //   // $scope.registro.idafiliado = '26721717'; // Cohortes y PQRS
          //   // $scope.registro.idafiliado = '17840653';
          //   // $scope.registro.idafiliado = '46350665';
          //   // $scope.listarPQRAfiliado()
          //   $scope.setNombreAfil();
          // }, 5000);
          //////////////////////////////////OJO BORRAR//////////////////////////////////
        })



        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
      });
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      dd < 10 ? dd = '0' + dd : dd = dd
      mm < 10 ? mm = '0' + mm : mm = mm
      today = dd + '/' + mm + '/' + yyyy;
      $scope.restart = function () {
        $scope.hdeAdjuntarFallo = false;
        $scope.hdeMotivo = true;
        $scope.hdeAdjuntarfile = true;
        $scope.hdeGuardaTut = true;
        $scope.hdeDetallesAccion = true;
        $scope.hdeDetallesAccionSeg = true;
        $scope.hdeImpugnacion = true;
        $scope.hdeRegistro = true;
        $scope.hdeCumplimiento = true;
        $scope.hdeIncidentes = true;
        $scope.hdeMotivoLbl = true;
        $scope.hdeTablaResultados = false;
        $scope.hdeDiagnostico = true;
        $scope.hdeVBrespuestatutela = true;
        $scope.hdeBtnPanelAdjuntos = true;
        $scope.hdeAdjuntarImpugnacion = false;
        $scope.dsbImpugnado2 = false;
        $scope.hdefallo = false;
        $scope.hdecumpli = false;
        $scope.dsbDetalles = false;
        $scope.dsbImpugnacion = false;
        $scope.dsbRegistro = false;
        $scope.dsbNombreIps = false;
        //DECLARO VARIABLE HIDE FECHA MEDIDA PROVISIONAL CNVU 10/12/2019
        $scope.hdeFechaMedida = true;
        //DECLARO VARIABLES PARA MOSTRAR O NO LOS CAMPOS DE MEDIO RECEPCION DE TODAS LAS ETAPAS CNVU 12/12/2019
        $scope.hdeMedioRecepcionRespuesta = true;
        $scope.hdeMedioRecepcionFallo = true;
        $scope.hdeMedioRecepcionSegunda = true;
        $scope.hdeMedioRecepcionImpugnacion = true;
        $scope.hdeMedioRecepcionCumplimiento = true;
        $scope.hdeMedioRecepcionFImpugnacion = true;
        $scope.hdeMedioRecepcionRqPrevio = true;
        $scope.hdeMedioRecepcionRespuestaRq = true;
        $scope.hdeMedioRecepcionAdmision = true;
        $scope.hdeMedioRecepcionRespuestaInc = true;
        $scope.hdeMedioRecepcionDecisionInc = true;
        $scope.hdeMedioRecepcionConsultaInc = true;
        $scope.hdeMedioRecepcionCierreInc = true;
        $scope.hdeMedioRecepcionAdmisionTut = true;
        $scope.hdeMedioRecepcionEstadoTutela = true;
        $scope.hdeFechaFallo = false;

        $scope.btn = {
          GuardaRegistro: false,
          GuardaRegistro_nul: false
        }
        $scope.detalles = {
          fallotutela: false,
          tratamientointegral: false,
          impugnado: false,
          seguimiento: false,
          falloimpugnacionfc: false
        }
        $scope.detallesetpdos = {
          fallotutelainstdos: false
        }
        $scope.ModalEstadoTutela = false;
        // $scope.registro.estadoTutela = false;
        // $scope.registro.estadoTutelaModal = true;
        // $scope.registro.tiponulidad = false;
        // $scope.registro.declaracionnulidad = false;

        ////////////////////////////NULIDAD///////////////////////////////////////////////
        $scope.hdeAdjuntarFallo_nul = false;
        $scope.hdeMotivo_nul = true;
        $scope.hdeAdjuntarfile_nul = true;
        $scope.hdeGuardaTut_nul = true;
        $scope.hdeDetallesAccion_nul = true;
        $scope.hdeDetallesAccionSeg_nul = true;
        $scope.hdeImpugnacion_nul = true;
        $scope.hdeRegistro_nul = true;
        $scope.hdeCumplimiento_nul = true;
        $scope.hdeIncidentes_nul = true;
        $scope.hdeMotivoLbl_nul = true;
        $scope.hdeTablaResultados_nul = false;
        $scope.hdeDiagnostico_nul = true;
        $scope.hdeVBrespuestatutela_nul = true;
        $scope.hdeBtnPanelAdjuntos_nul = true;
        $scope.hdeAdjuntarImpugnacion_nul = false;
        $scope.dsbImpugnado2_nul = false;
        $scope.hdefallo_nul = false;
        $scope.hdecumpli_nul = false;
        $scope.dsbDetalles_nul = false;
        $scope.dsbImpugnacion_nul = false;
        $scope.dsbRegistro_nul = false;
        $scope.dsbNombreIps_nul = false;
        //DECLARO VARIABLE HIDE FECHA MEDIDA PROVISIONAL CNVU 10/12/2019
        $scope.hdeFechaMedida_nul = true;
        //DECLARO VARIABLES PARA MOSTRAR O NO LOS CAMPOS DE MEDIO RECEPCION DE TODAS LAS ETAPAS CNVU 12/12/2019
        $scope.hdeMedioRecepcionRespuesta_nul = true;
        $scope.hdeMedioRecepcionFallo_nul = true;
        $scope.hdeMedioRecepcionSegunda_nul = true;
        $scope.hdeMedioRecepcionImpugnacion_nul = true;
        $scope.hdeMedioRecepcionCumplimiento_nul = true;
        $scope.hdeMedioRecepcionFImpugnacion_nul = true;
        $scope.hdeMedioRecepcionRqPrevio_nul = true;
        $scope.hdeMedioRecepcionRespuestaRq_nul = true;
        $scope.hdeMedioRecepcionAdmision_nul = true;
        $scope.hdeMedioRecepcionRespuestaInc_nul = true;
        $scope.hdeMedioRecepcionDecisionInc_nul = true;
        $scope.hdeMedioRecepcionConsultaInc_nul = true;
        $scope.hdeMedioRecepcionCierreInc_nul = true;
        $scope.hdeMedioRecepcionAdmisionTut_nul = true;
        $scope.hdeMedioRecepcionEstadoTutela_nul = true;
        $scope.hdeFechaFallo_nul = false;

        $scope.btn_nul = {
          GuardaRegistro: false
        }
        $scope.detalles_nul = {
          fallotutela: false,
          tratamientointegral: false,
          impugnado: false,
          seguimiento: false,
          falloimpugnacionfc: false
        }
        $scope.detallesetpdos_nul = {
          fallotutelainstdos: false
        }

        document.getElementById('TecnologiasSalud').disabled = true;
        document.getElementById('AtencionCohorte').disabled = true;

        $scope.listCausasTecnologia_Admision = [];
        $scope.listCausas_Admision = [];

      }
      $scope.restart();

      $scope.validarPermisos = function () {
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'p_ver_permisos_funcs',
            cedula: $scope.cedulalog
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            $scope.Rol_Permisos = data;
            setTimeout(() => { $scope.$apply(); }, 500);
            // CREAR_TUTELA
            // EDITAR_ADMISION
            // GESTIONAR_TUTELA
            // DESCARGAR_INFORME
            console.table(data)
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }

      var f_recepcion = $("#dteFechaRecepcion").data("kendoDatePicker");
      var f_vencimiento = $("#dteFechaVencimiento").data("kendoDatePicker");
      var f_recibidorespuestatutela = $("#dteFechaRecepcionRespuesta").data("kendoDatePicker");
      $scope.initVar = function () {
        // $("#dteFechaRecepcion").val(today);
        $scope.reqMotivo = "";
        $scope.juzgado = {};
        $scope.registro = {
          anioconsecutivo: '2018', consecutivo: 0, accionante: 1, motivo: '', chkTecnologiasSalud: false, chkAtencionCohorte: false,
          chkPrestacionesContinuas: false
        };
        $scope.registro.medioRecepcionRespuesta = false;
        $scope.registro.medioRecepcionImpugnacion = false;
        $scope.registro.medioRecepcionCumplimiento = false;
        $scope.registro.medioRecepcionFImpugnacion = false;
        $scope.registro.medioRecepcionRqPrevio = false;
        $scope.registro.medioRecepcionRespuestaRq = false;
        $scope.registro.medioRecepcionAdmision = false;
        $scope.registro.medioRecepcionRespuestaInc = false;
        $scope.registro.medioRecepcionDecisionInc = false;
        $scope.registro.medioRecepcionConsultaInc = false;
        $scope.registro.medioRecepcionCierreInc = false;
        $scope.registro_nul = {};
        $scope.registro_nul.medioRecepcionRespuesta = false;
        $scope.registro_nul.medioRecepcionImpugnacion = false;
        $scope.registro_nul.medioRecepcionCumplimiento = false;
        $scope.registro_nul.medioRecepcionFImpugnacion = false;
        $scope.registro_nul.medioRecepcionRqPrevio = false;
        $scope.registro_nul.medioRecepcionRespuestaRq = false;
        $scope.registro_nul.medioRecepcionAdmision = false;
        $scope.registro_nul.medioRecepcionRespuestaInc = false;
        $scope.registro_nul.medioRecepcionDecisionInc = false;
        $scope.registro_nul.medioRecepcionConsultaInc = false;
        $scope.registro_nul.medioRecepcionCierreInc = false;
        $scope.diagnostico = {};


        $scope.registro.selectCausa = '';
        $scope.registro.selectCausaMotivo = '';
        $scope.listCausas_Admision = [];

        $scope.registro.selectCausa = '';
        $scope.registro.selectCausaMotivo = '';

        $scope.registro.selectCausaMotivo_TS = '';
        $scope.registro.productoAdmi = '';
        $scope.registro.activarSubclaseAdmi = '';
        $scope.registro.subclaseAdmi = '';
        $scope.registro.diagnosticoAdmi = '';
        $scope.registro.mipresAdmi = '';
        $scope.registro.activarMipresAdmi = '';
        $scope.registro.medicoTratanteAdmi = '';
        $scope.registro.prestadorSolicitanteAdmi = '';
        $scope.registro.prestadorAsignadoAdmi = '';
        $scope.registro.cantidadAdmi = '';
        $scope.registro.tiempoAdmi = '';
        $scope.listadoProductos = [];
        $scope.listadoSubclase = [];
        $scope.listadoDiagnosticos = [];
        $scope.listadoPrestadorSolicitante = [];
        $scope.listadoPrestadorAsignado = [];

        $scope.listCausasTecnologia_Admision = [];


        // $scope.listadoCausas = [];
        // $scope.listadoCausasMotivos = [];

      }
      $scope.initVar();


      ////////////////////////////////////////////////
      ////////////////////ACTIVAR/////////////////////
      ////////////////////////////////////////////////
      var lisTutelas = $('#resultTutelas').DataTable({
        dom: 'lBsfrtip',
        select: true,
        buttons: [{ extend: 'copy', text: 'Copiar' }, 'csv', 'excel'],
        searching: true,
        ajax: {
          url: 'php/juridica/tutelas/listtutelas.php',
          dataSrc: ''
        },
        columns: [
          { data: "numero" },
          { data: "radicado" },
          { data: "ubicacion" },
          { data: "accionante" },
          { data: "accionado" },
          { data: "afil_nombre" },
          { data: "juzgado" },
          { data: "causa" },
          // { data: "motivo" },
          { data: "fecha_vencimiento" },
          { data: "estado" },
        ],
        language: {
          "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
        lengthMenu: [[10, 30, 50, -1], [10, 30, 50, 'Todas']],
        order: [[8, "desc"]]
      });

      setTimeout(() => {
        // $('#resultTutelas_filter input').val('11961771').trigger('keyup');
        // $('#resultTutelas_filter input').val('11966455').trigger('keyup');
        // $('#resultTutelas_filter input').val('11966570').trigger('keyup');
      }, 3000);

      $scope.dwinforme = function (par) {
        if (par == 'T') {
          window.open('php/juridica/tutelas/informe_tutelas.php' + '?funcion=' + 'T');
        } else if (par == 'I') {
          window.open('php/juridica/tutelas/informe_tutelas.php' + '?funcion=' + 'I');
        }
      }

      $scope.dwinforme_inc = function () {
        window.open('php/juridica/tutelas/informe_tutelas_cur.php');
      }

      $scope.busqueda = function () {
        cfpLoadingBar.start();
        $scope.hdeRegistro = true;
        $scope.hdeDiagnostico = true;
        $scope.hdeTablaResultados = false;
        lisTutelas.ajax.reload();
        $scope.hdeVBrespuestatutela = true;
        $scope.hdeDetallesAccion = true;
        $scope.hdeImpugnacion = true;
        $scope.hdeCumplimiento = true;
        $scope.hdeIncidentes = true;
        $scope.labelotraepsAdmisionTut = false;
        $scope.registro.diferenteepsAdmisionTut = false;
        // $scope.shwEstadoTutela=false;
        //////////////////////NULIDAD/////////////////////////
        $scope.hdeRegistro_nul = true;
        // lisTutelas.ajax.reload();
        $scope.hdeVBrespuestatutela_nul = true;
        $scope.hdeDetallesAccion_nul = true;
        $scope.hdeImpugnacion_nul = true;
        $scope.hdeCumplimiento_nul = true;
        $scope.hdeIncidentes_nul = true;
        cfpLoadingBar.complete();
      }
      $scope.crear = function () {
        document.getElementById('cons_juzgado').disabled = false;
        document.getElementById('aniocons_juzgado').disabled = false;
        document.getElementById('tipoidafiliado').disabled = false;
        document.getElementById('diferenteepsAdmisionTut').disabled = false;
        $scope.restart();
        $scope.btnActualizarTutela = true;
        $scope.hdeRegistro = false;
        $scope.despl1 = true;
        $scope.hdeTablaResultados = true;
        $scope.initVar();
        var f_recepcion = $("#dteFechaRecepcion").data("kendoDatePicker");
        f_recepcion.enable(true);
        $scope.hdeMotivoLbl = true;
        $scope.hdeAdjuntarfile = false;
        $scope.hdeGuardaTut = false;
        $scope.hdeMotivo = false;
        $scope.dsbRegistro = false;
        $scope.hdeDiagnostico = true;
        $scope.hdeVBrespuestatutela = true;
        $scope.hdeDetallesAccion = true;
        $scope.hdeImpugnacion = true;
        $scope.hdeCumplimiento = true;
        $scope.hdeIncidentes = true;
        $scope.archivoadminision = '';
        // EJECUTA LA FUNCION DESHABILITAR CNVU 12/12/2019
        $scope.deshabilitarInfoTutela();
        // LIMPIA CAMPOS RECEPCION ADMISION TUTELA CNVU
        // $("#dteFechaMedioRecepcionAdmisionTut").val() = "";
        $scope.Medioarchivoadminision = '';
        $scope.Limpiar_Inputs_Files();//Limpia todos los inputs type file
        //
        // $scope.shwEstadoTutela=false;
        // $scope.hdeIdafiliado = false;
        $scope.labelotraepsAdmisionTut = false;
        $scope.marcaAltocosto = '';
        $scope.marcaGrupoPoblacional = false;
        $scope.marcaListadoCensal = false;
        document.getElementById('TecnologiasSalud').disabled = false;
        document.getElementById('AtencionCohorte').disabled = false;

        $scope.listadoPQRAfiliado = [];
        $scope.listadoPatologiasAfiliado = [];
        setTimeout(() => { $scope.$apply(); }, 500);
        // CNVU - 23/01/2020
        setTimeout(function () {
          // console.log($scope.sesdata);
          if ($scope.cedulalog == '1129521065' || $scope.cedulalog == '1140902160') {
            setTimeout(function () {
              $scope.btn.GuardaRegistro = true;
              $scope.btnActualizarTutela = true;
              $scope.hdeGuardaTut = true;
              $scope.$apply();
            }, 500);
          }
        }, 1000);
        setTimeout(() => {
          $('#tab_1').click();
        }, 500);
        $scope.listaNulidades();
      }

      $scope.RegistroDone = function () {
        $scope.dsbRegistro = true;
        $scope.btnActualizarTutela = false;
        $scope.hdeRegistro = false;
        var f_recepcion = $("#dteFechaRecepcion").data("kendoDatePicker");
        f_recepcion.enable(false);
        $scope.hdeMotivoLbl = false;
        $scope.hdeBtnPanelAdjuntos = false;
        setTimeout(function () { $(document).scrollTop($('#panelListado2').height() + 100); }, 500);
        /////////////////////////
        $scope.hdeAdjuntarRespuesta = true; // Boton Enviar
        $scope.hdeAdjuntarFallo = false; // Boton Enviar
        $scope.hdeAdjuntarFalloSegInst = false; // Boton Enviar
        $scope.hdeAdjuntarImpugnacion = false; // Boton Enviar
        $scope.hdeAdjuntarFalloImpugnacion = false; // Boton Enviar
      }

      $scope.habilitarInfo = function () {
        $.getJSON("php/obtenersession.php").done(function (respuesta) {
          $scope.sesdata = respuesta;

          if ($scope.Rol_Permisos.EDITAR_ADMISION == 'S') {
            //|| $scope.cedulalog == "1045250310"
            $scope.dsbRegistro = false;
          } else {
            if ($scope.registro.marca_eps_anterior == 'X') {
              $scope.dsbRegistro = false;
            } else {
              $scope.dsbRegistro = true;
            }
          }
        })
        $scope.hdeMotivoLbl = true;
        switch ($scope.registro.causa) {
          case 'AS': case 'DP': case 'OT': case 'PE': case 'TS': case 'VT':
            $scope.hdeMotivo = false;
            $scope.registro.motivolbl = $scope.registro.motivo;
            break;
          case 'CN': case 'CP': case 'IN': case 'IP': case 'MN': case 'MP': case 'PN': case 'PP':
            $scope.hdeDiagnostico = false;
            $scope.nomDiagnostico();
            break;
        }
        //CONFIGURA INPUTS PARA MODIFICACION
        document.getElementById('dteFechaRecepcion').disabled = false;
        //document.getElementById('cons_juzgado').disabled = true;
        //document.getElementById('aniocons_juzgado').disabled = true;
        document.getElementById('nombreips').disabled = true;
      }

      //VALIDACION PARA HABILITAR O NO CAMPS AL ACTUALIZAR TUTELA CNVU 02/12/2019
      $scope.habilitarInfoFalloTutela = function () {
        if ($scope.Rol_Permisos.EDITAR_ADMISION != 'S') {
          if ($scope.registro.marca_eps_anterior != 'X') {
            $scope.dsbRegistro = false;
            $scope.hdeAdjuntarfile = true;
            document.getElementById('cons_juzgado').disabled = true;
            document.getElementById('aniocons_juzgado').disabled = true;
            document.getElementById('medioRecepcionAdmisionTut').disabled = true;
            document.getElementById('diferenteepsAdmisionTut').disabled = true;

            document.getElementById('accionante').disabled = true;
            document.getElementById('tipoidafiliado').disabled = true;
            document.getElementById('documento').disabled = true;

            document.getElementById('TecnologiasSalud').disabled = true;
            document.getElementById('AtencionCohorte').disabled = true;
            document.getElementById('PrestacionesContinuas').disabled = true;


            document.getElementById('juzgado').disabled = true;
            document.getElementById('dteFechaRecepcion').disabled = true;
            document.getElementById('plazo').disabled = true;
            document.getElementById('medidaprovisional').disabled = true;
            document.getElementById('dteFechaRecepcionMedida').disabled = true;
            document.getElementById('plazoMedida').disabled = true;
            // document.getElementById('causa').disabled = true;
            // document.getElementById('diagnostico').disabled = true;
            // document.getElementById('motivo').disabled = true;
            if ($scope.registro.status > 2) {
              if(document.getElementById('btnActualizaTutela') != null ) document.getElementById('btnActualizaTutela').disabled = false;
            } else {
              if(document.getElementById('btnActualizaTutela') != null ) document.getElementById('btnActualizaTutela').disabled = true;
            }

          } else {
            $scope.dsbRegistro = false;
            $scope.hdeAdjuntarfile = false;
            document.getElementById('cons_juzgado').disabled = false;
            document.getElementById('aniocons_juzgado').disabled = false;
            document.getElementById('medioRecepcionAdmisionTut').disabled = false;
            document.getElementById('diferenteepsAdmisionTut').disabled = false;

            document.getElementById('accionante').disabled = false;
            document.getElementById('tipoidafiliado').disabled = false;
            document.getElementById('documento').disabled = false;

            document.getElementById('TecnologiasSalud').disabled = true;
            // document.getElementById('TecnologiasSalud').disabled = false;
            document.getElementById('AtencionCohorte').disabled = true;
            document.getElementById('PrestacionesContinuas').disabled = false;

            document.getElementById('juzgado').disabled = false;
            document.getElementById('dteFechaRecepcion').disabled = false;
            document.getElementById('plazo').disabled = false;
            document.getElementById('medidaprovisional').disabled = false;
            document.getElementById('dteFechaRecepcionMedida').disabled = false;
            document.getElementById('plazoMedida').disabled = false;
            // document.getElementById('causa').disabled = false;
            // document.getElementById('diagnostico').disabled = false;
            // document.getElementById('motivo').disabled = false;
            if(document.getElementById('btnActualizaTutela') != null ) document.getElementById('btnActualizaTutela').disabled = false;
          }
        } else {
          // VALIDA MOSTRAR O NO INPUT ADMISION CNVU 14/01/2020
          if ($scope.registro.rutaadmision == '' || $scope.registro.rutaadmision == null || $scope.registro.rutaadmision == undefined) {
            $scope.hdeAdjuntarfile = false;
          } else {
            $scope.hdeAdjuntarfile = true;
          }
          document.getElementById('dteFechaRecepcion').disabled = false;
          $("#dteFechaRecepcion").data("kendoDatePicker").enable(true);
        }
      }

      //VALIDACION PARA DESHABILITAR CAMPOS AL ACTUALIZAR TUTELA CNVU
      $scope.deshabilitarInfoTutela = function () {
        if ($scope.Rol_Permisos.EDITAR_ADMISION != 'S') {
          $scope.dsbRegistro = false;
          document.getElementById('cons_juzgado').disabled = false;
          document.getElementById('aniocons_juzgado').disabled = false;
          document.getElementById('medioRecepcionAdmisionTut').disabled = false;

          document.getElementById('accionante').disabled = false;

          document.getElementById('tipoidafiliado').disabled = false;
          document.getElementById('documento').disabled = false;
          document.getElementById('nit').disabled = false;
          document.getElementById('nombreips').disabled = false;
          document.getElementById('tipoDocAgenteOficioso').disabled = false;
          document.getElementById('numDocAgenteOficioso').disabled = false;
          document.getElementById('nombreagente').disabled = false;
          document.getElementById('otroaccionante').disabled = false;

          // document.getElementById('TecnologiasSalud').disabled = true;
          document.getElementById('TecnologiasSalud').disabled = false;
          document.getElementById('AtencionCohorte').disabled = false;
          document.getElementById('PrestacionesContinuas').disabled = false;

          document.getElementById('juzgado').disabled = false;
          document.getElementById('dteFechaRecepcion').disabled = false;
          document.getElementById('plazo').disabled = false;
          document.getElementById('medidaprovisional').disabled = false;
          document.getElementById('dteFechaRecepcionMedida').disabled = false;
          document.getElementById('plazoMedida').disabled = false;
          // document.getElementById('causa').disabled = false;
          // document.getElementById('diagnostico').disabled = false;
          // document.getElementById('motivo').disabled = false;

          $("#dteFechaRecepcion+span").css({ "pointer-events": "all", "opacity": "initial" });
          $("#dteFechaRecepcionMedida+span").css({ "pointer-events": "all", "opacity": "initial" });
        }
      }

      //CLIC EN TUTELA SELECCIONADA
      $('#resultTutelas tbody').on('click', 'tr', function () {
        $scope.despl1 = true;
        var data = lisTutelas.row(this).data();
        $scope.registro.accionante = data.accionante;
        $scope.Limpiar_Inputs_Files();//Limpia todos los inputs type file
        $scope.labelotraepsAdmisionTut = false;//label que muestra si el afiliado es de otra eps

        var Etapa = 0;
        if (data === undefined) {
          return;
        }
        $scope.restart();
        swal({
          title: 'Cargando información de tutela'
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'obtenerTutela',
            numerotutela: data.numero
          }
        }).then(function (response) {
          // CNVU - PERMISOS FUNCIONARIOS 23/01/2020
          setTimeout(function () {
            if ($scope.cedulalog == '1129521065' || $scope.cedulalog == '1140902160') {
              setTimeout(function () {
                $scope.btn.GuardaRegistro = true;
                $scope.btnActualizarTutela = true;
                $scope.hdeGuardaTut = true;
                $scope.$apply();
              }, 500);
            }
          }, 3000);
          $scope.registro = response.data;
          setTimeout(() => { $scope.$apply(); }, 500);
          console.log($scope.registro);
          $scope.registro_motivo = $scope.registro.motivo;
          $("#dteFechaRecepcion").val($scope.registro.f_recepcion);
          $("#dteFechaVencimiento").val($scope.registro.f_vencimiento);
          //SET VALOR DE FECHAS FALLO CNVU 02/12/2019
          $("#dteFechaFalloAc").val($scope.registro.f_fallo);
          $("#dteFechaVencimientoFalloAc").val($scope.registro.f_fallo_plazo);
          $scope.registro.plazofalloac = $scope.registro.plazo_fallo;
          //SET VALOR DE FECHAS MEDIDA CNVU 10/12/2019
          $("#dteFechaRecepcionMedida").val($scope.registro.fecha_recepcion_medida_prov);
          $("#dteFechaVencimientoMedida").val($scope.registro.fecha_vencimiento_medida_prov);
          $scope.lstMotivos();
          // VALIDA MOSTRAR O NO CAMPOS DE FECHA MEDIDA PROVISIONAL CNVU 10/12/2019
          $scope.changeMedida("1");
          $scope.changeMedida("3");
          $scope.changeMedida("5");
          $scope.changeMedida("15");
          $scope.RegistroDone();
          $scope.habilitarInfo();

          //Regional tutela
          if ($scope.registro.ubicacion == 1) {
            $scope.registro.regionalTutela = 1; // Tutelas Nacional
          } else {
            $scope.registro.regionalTutela = $scope.registro.ubicacion.toString().length == 4 ?
              `${$scope.registro.ubicacion.toString().substr(0, 1)}001` : `${$scope.registro.ubicacion.toString().substr(0, 2)}001`;
          }
          // Cargar motivos Tecnologias Salud despues de registrar la tutela y antes del fallo
          if ($scope.registro.status == 1) {
            $scope.obtenerListadoMotivos('TS');
          }
          // Listar Causas
          $scope.listarCausasTutela();



          $scope.registro.chkAtencionCohorte = response.data.chkAtencionCohorte == 'S' ? true : false;
          $scope.registro.chkPrestacionesContinuas = response.data.chkPrestacionesContinuas == 'S' ? true : false;
          $scope.registro.chkTecnologiasSalud = response.data.chkTecnologiasSalud == 'S' ? true : false;

          // Listar Patologias
          $scope.obtenerPatologias();
          $scope.listarPQRAfiliado();


          // $scope.registro.selectCausaMotivo_TS = '';
          // $scope.registro.productoAdmi = '883341-ANGIORRESONANCIA DE TORAX (SIN INCLUIR CORAZON)';
          // $scope.registro.activarSubclaseAdmi = 'S';
          // $scope.registro.subclaseAdmi = '2-SIN CONTRASTE';
          // $scope.registro.diagnosticoAdmi = 'W100-CAIDA EN O DESDE ESCALERA Y ESCALONES VIVIENDA';
          // $scope.registro.mipresAdmi = '';
          // $scope.registro.activarMipresAdmi = 'N';
          // $scope.registro.medicoTratanteAdmi = 'PEDRO PEREZ PEDRAZA';
          // $scope.registro.prestadorAdmi = '900465319-OINSAMED SAS';


          ////////////////////////////
          ////////////////////////////
          ////////////////////////////

          if (parseInt($scope.registro.anioconsecutivo) < 2018 || $scope.registro.diferenteepsAdmisionTut == true || $scope.registro.accionante == 5) {//-- VALIDAR TAMBIEN QUE SEAN DE OTRAS EPS
            $scope.BuscarOmitirEtapasTut();//Buscar Etapas para habilitar
          } else {
            $scope.hdebtnOmitirEtapas = false;
          }
          // VALIDA MOSTRAR O NO CAMPOS DE FALLO TUTELA CNVU 12/12/2019
          if ($scope.registro.status > 2) {
            $scope.hdeVBrespuestatutela = true;
            $scope.hdeFechaFallo = true;
            document.getElementById('checkfallotutela').disabled = true;
            document.getElementById('medioRecepcionFallo').disabled = true;
            document.getElementById('tratamientointegral').disabled = true;
            document.getElementById('seguimiento').disabled = true;
          } else {
            document.getElementById('checkfallotutela').disabled = false;
            document.getElementById('medioRecepcionFallo').disabled = false;
            document.getElementById('tratamientointegral').disabled = false;
            document.getElementById('seguimiento').disabled = false;
          }

          if ($scope.registro.status > 3) {
            document.getElementById('checkimpugnado').disabled = true;
            document.getElementById('medioRecepcionImpugnacion').disabled = true;
          } else {
            document.getElementById('checkimpugnado').disabled = false;
            document.getElementById('medioRecepcionImpugnacion').disabled = false;
          }

          //DESHABILITAR INFORMACION CNVU 02/12/2019
          setTimeout(function () {
            $scope.setNombreAfil();
            $scope.habilitarInfoFalloTutela();
          }, 300);
          $scope.juzgado = {
            codigo: $scope.registro.codigo_juzgado,
            ubicacion: $scope.registro.ubicacion_juzgado,
            nombre: $scope.registro.nombre_juzgado
          }
          $scope.juzgado.seleccion = $scope.juzgado.codigo + ' - ' + $scope.juzgado.nombre;
          $scope.diagnostico = {
            codigo: $scope.registro.codigo_dx,
            nombre: $scope.registro.nombre_dx
          }
          $scope.nomDiagnostico();
          swal.close();
          $scope.detalles.fallotutela = $scope.registro.fallo.fallotutela;
          if (response.data.rutarecibidorespuestatutela == null) {
            $scope.hdeVBrespuestatutela = false;
            $scope.hdeAdjuntarRespuesta = false;
            setTimeout(function () { $(document).scrollTop($('#panelListado2').height() + 1000); }, 500);
            $scope.despl2 = true;
            Etapa = 3;
            //return;
          } else {
            $scope.hdeVBrespuestatutela = true;
            $scope.hdeAdjuntarRespuesta = true;
          }
          if ($scope.registro.status > 2) {
            $scope.hdeVBrespuestatutela = true;
          }
          if ($scope.registro.status == "2") {
            $scope.archivoObservacionFallo = '';
            $scope.archivoObservacionFalloExt = '';
            $scope.hdeFechaFallo = false;
            $scope.hdeDetallesAccion = false;
            // $scope.despl1 = false;
            $scope.despl3 = true;
            setTimeout(function () { $(document).scrollTop($('#panelListado3').height() + 1200); }, 500);
            Etapa = 2;
            // $scope.DesactivarBotonesAdjuntar();//Quitar botones
            setTimeout(function () { $scope.ActivarBotonesAdjuntar(Etapa); }, 500);
            // console.log("Etapa: " + Etapa);
            // return;
          }


          $scope.detallesetpdos.fallotutelainstdos = $scope.registro.fallo.fallo_seg_instancia;
          $scope.detalles.tratamientointegral = $scope.registro.fallo.tratamiento_integral;
          $scope.detalles.seguimiento = $scope.registro.fallo.seguimiento;
          $scope.detalles.impugnado = $scope.registro.fallo.impugnado;
          $scope.detalles.observacion_fallo = $scope.registro.fallo.observacion_fallo;
          $scope.detalles.observacion_impugnado = $scope.registro.observacion_impugnado;
          $scope.hdefallo = !$scope.registro.fallo.impugnado;

          if ($scope.registro.status == "3") {
            $scope.archivoObsImpugnacion = '';
            $scope.archivoObsImpugnacionExt = '';
            if ($scope.registro.fallo.fallotutela == false) {
              //$scope.hdeImpugnacion = true;
              // $scope.hdeDetallesAccionSeg = false;
              // $scope.despl7 = true;
              // setTimeout(function () { $(document).scrollTop($('#panelListado7').height() + 1200); }, 500);
              // Etapa = 14;
              // } else {
              $scope.hdeImpugnacion = false;
              $scope.hdeDetallesAccionSeg = true;
              $scope.despl4 = true;
              setTimeout(function () { $(document).scrollTop($('#panelListado4').height() + 1200); }, 500);
              Etapa = 4;
            }
            // if ($scope.registro.fallo.fallo_seg_instancia == null) {
            // 	$scope.dsbDetallesSegInst = false;
            // 	$scope.hdeAdjuntarFalloSegInst = false;
            // 	Etapa = 14;
            // } else {
            // 	$scope.dsbDetallesSegInst = true;
            // 	$scope.hdeAdjuntarFalloSegInst = true;
            $scope.hdeImpugnacion = false;
            Etapa = 4;
            // 	if ($scope.registro.fallo.fallo_seg_instancia == false) {
            // 		$scope.despl3 = false;
            // 		$scope.despl7 = false;
            // 		$scope.despl4 = true;
            // 		$scope.hdeImpugnacion = false;
            // 		setTimeout(function () { $(document).scrollTop($('#panelListado4').height() + 1100); }, 500);
            // 	} else {
            // 		$scope.despl3 = true;
            // 		$scope.despl7 = true;
            // 		$scope.despl4 = false;
            // 		setTimeout(function () { $(document).scrollTop($('#panelListado3').height() + 1100); }, 500);
            // 	}
            // }
            // Se muestran los paneles
            $scope.hdeDetallesAccion = false;
            $scope.hdeRegistro = false;
            // Se bloquean los formularios que ya se completaron
            // $scope.dsbDetalles = true;
            $scope.hdeAdjuntarFallo = true;
            $scope.despl3 = false;
            $scope.despl4 = true;
            $scope.hdeImpugnacion = false;
          }
          ////////////IMPUGNADO LISTO, AHORA MUESTRA CUMPLIMIENTO
          if ($scope.registro.status == "4") {
            $scope.selec_inci = $scope.registro.status_desacato;
            $scope.tabselect = parseInt($scope.registro.status_desacato) + 1;
            $scope.vertab(parseInt($scope.registro.status_desacato) + 1);
            $scope.csstab(parseInt($scope.registro.status_desacato) + 1);

            // Se muestran los paneles
            $scope.hdeRegistro = false;
            $scope.hdeDetallesAccion = false;
            $scope.hdeImpugnacion = false;
            $scope.hdeIncidentes = false;
            //Se bloquean
            $scope.dsbDetalles = true;
            $scope.hdeAdjuntarFallo = true;
            $scope.dsbImpugnacion = true;
            $scope.hdeAdjuntarImpugnacion = true;
            // Se Agrupan los paneles
            // $scope.despl1 = false;
            $scope.despl3 = false;
            $scope.DesactivarBotonesAdjuntar();
            $scope.despl4 = false;
            if (!$scope.detalles.impugnado == false) {
              $scope.despl4 = true;
            }

            $scope.despl6 = true;
            //Se Activan

            $scope.hdeCumplimiento = false;
            $scope.despl5 = true;
            $scope.hdecumpli = false;
            setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1500); }, 500);
            Etapa = 44;
            if ($scope.hdefallo == false) {
              Etapa = 6;
            }
          }
          ////////////CUMPLIMIENTO MENSUAL LISTO, AHORA MUESTRA CUMPLIMIENTO - FALLO DE IMPUGNACION
          if ($scope.registro.status == "5") {
            $scope.selec_inci = $scope.registro.status_desacato;
            $scope.tabselect = parseInt($scope.registro.status_desacato) + 1;
            $scope.vertab(parseInt($scope.registro.status_desacato) + 1);
            $scope.csstab(parseInt($scope.registro.status_desacato) + 1);

            // Se muestran los paneles
            $scope.hdeRegistro = false;
            $scope.hdeDetallesAccion = false;
            $scope.hdeImpugnacion = false;
            $scope.hdeIncidentes = false;
            //Se bloquean
            $scope.dsbDetalles = true;
            $scope.hdeAdjuntarFallo = true;
            $scope.dsbImpugnacion = true;
            $scope.hdeAdjuntarImpugnacion = true;
            $scope.hdefallo = true;
            // Se Agrupan los paneles
            // $scope.despl1 = false;
            $scope.despl3 = false;
            $scope.despl4 = false;
            $scope.despl6 = true;
            //Se Activan
            $scope.hdeCumplimiento = false;
            $scope.despl5 = true;
            $scope.hdecumpli = false;
            setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1500); }, 500);
            Etapa = 55;
          }

          if (Etapa != 55 && Etapa != 44) {
            $scope.DesactivarBotonesAdjuntar();//Quitar botones
            setTimeout(function () { $scope.ActivarBotonesAdjuntar(Etapa); }, 500);
          }
          // console.log("Etapa: " + Etapa);
          if ($scope.registro.estadoTutela == true) {
            $scope.hdeVBrespuestatutela = true;
            $scope.dsbDetalles = true;
            $scope.dsbDetallesSegInst = true;
            $scope.dsbImpugnacion = true;
            $scope.hdeCumplimiento = true;
            $scope.hdeIncidentes = true;
          }
          $scope.listaNulidades($scope.registro.codigotutela);
          $scope.seleccionar(1);
          setTimeout(() => {
            $('#tab_1').click();
          }, 3000);
        });
      });
      //FIN CLIC TUTELA SELECCIONADA

      consultaHTTP.obtenerDocumento().then(function (response) {
        $scope.Documentos = response;
      })
      $scope.buscarTutelas = function () {
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'buscaTutelas',
            keywordtutelas: $scope.keywordtutelas
          }
        }).then(function (response) {
          $scope.Tutelas = response.data;
        });
      }
      $scope.listaCausas = function () {
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'listaCausas'
          }
        }).then(function (response) {
          $scope.Causas = response.data;
          $scope.registro.causa = "";
        });
      }
      $scope.listaCausas();
      $scope.listaAccionantes = function () {
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'listaAccionantes'
          }
        }).then(function (response) {
          $scope.Accionantes = response.data;
          // $scope.registro.accionante = 1;
        });
      }
      $scope.listaAccionantes();
      $scope.lstMotivos = function () {
        if ($scope.registro.causa) {
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
              function: 'listaMotivos',
              causa: $scope.registro.causa
            }
          }).then(function (response) {
            $scope.Motivos = response.data;
            if ($scope.Motivos.length == 1) {
              $scope.hdeMotivo = true;
              $scope.hdeDiagnostico = false;
            } else {
              $scope.hdeMotivo = false;
              $scope.hdeDiagnostico = true;
            }
          });
        }
      }
      $scope.lmpAccionante = function () {
        $scope.hdeIdafiliado = true;
        $scope.hdeInfoempresa = true;
        $scope.hdeNombreAO = true;
        $scope.hdeOtro = true;
        $scope.hdeNombreAccionado = true;
      }
      $scope.chgAccionante = function () {
        $scope.lmpAccionante();
        switch ($scope.registro.accionante) {
          case '1':
            $scope.hdeIdafiliado = false;
            break;
          case '2':
            $scope.hdeInfoempresa = false;
            break;
          case '3':
            $scope.hdeNombreAO = false;
            $scope.hdeIdafiliado = false;
            break;
          case '4':
            $scope.hdeOtro = false;
            break;
          case '5':
            $scope.hdeNombreAccionado = false;
            break;
          default:
            $scope.lmpAccionante();
        }
      }
      $scope.chgAccionante();
      $scope.modalJuzgados = function () {
        $scope.dialogJuz = ngDialog.open({
          template: 'views/juridica/modal/modalJuzgados.html',
          className: 'ngdialog-theme-plain',
          controller: 'modalJuzgadosctrl',
          scope: $scope
        });
        $scope.dialogJuz.closePromise.then(function (data) {
          if (data.value != "$document") {
            console.log(data.value)
            $scope.juzgado = {
              codigo: data.value.codigo,
              ubicacion: data.value.ubicacion,
              nombre: data.value.nombre
            }
            $scope.nomJuzgado();
          }
        });
      }
      $scope.modalDiagnosticos = function () {
        $scope.dialogDiag = ngDialog.open({
          template: 'views/juridica/modal/modalDiagnosticos.html',
          className: 'ngdialog-theme-plain',
          controller: 'modalDiagnosticosctrl',
          scope: $scope
        });
        $scope.dialogDiag.closePromise.then(function (data) {
          if (data.value != "$document") {
            $scope.diagnostico = {
              codigo: data.value.codigo,
              nombre: data.value.nombre
            }
            $scope.nomDiagnostico();
          }
        });
      }
      $scope.nomJuzgado = function () {
        if ($scope.juzgado.codigo === undefined || $scope.juzgado.codigo == "") {
          $scope.juzgado.seleccion = "SELECCIONAR";
        } else {
          $scope.juzgado.seleccion = $scope.juzgado.codigo + ' - ' + $scope.juzgado.nombre
        }
      }
      $scope.nomJuzgado();
      $scope.nomDiagnostico = function () {
        if ($scope.diagnostico.codigo === undefined || $scope.diagnostico.codigo == "") {
          $scope.diagnostico.seleccion = "SELECCIONAR";
        } else {
          $scope.diagnostico.seleccion = $scope.diagnostico.codigo + ' - ' + $scope.diagnostico.nombre;
        }
      }
      $scope.nomDiagnostico();
      $scope.setNombreAfil = function () {
        if ($scope.registro.tipoidafiliado && $scope.registro.idafiliado) {
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
              function: 'nombreAfiliado',
              tipo_documento: $scope.registro.tipoidafiliado,
              documento: $scope.registro.idafiliado
            }
          }).then(function ({ data }) {
            if (data.length == 0) {
              $scope.registro.nombreafiliado = "";
            } else {
              $scope.registro.nombreafiliado = data.NombreCompleto;
              $scope.nombre_otraeps = data.NOMBRE_EPS;
              $scope.marcaotraeps = data.SUPERSALUD;
              $scope.marcaAltocosto = data.ALTOCOSTO;
              $scope.marcaGrupoPoblacional = data.GRUPO_POBLACIONAL;
              $scope.marcaListadoCensal = data.LISTADO_CENSAL;

              $scope.registro.edadDiasAfiliado = data.EdadDias;
              $scope.registro.sexoCodigoAfiliado = data.SexoCodigo;
              // data.EdadDias
              // data.SexoCodigo

              // GRUPO_POBLACIONAL // "POBLACIÓN CON SISBEN"
              // LISTADO_CENSAL // null
              if ($scope.registro.numerotutela == undefined) {
                $scope.listarPQRAfiliado();
              }
              // $scope.listadoPatologiasAfiliado = [];


              if (data.NOMBRE_EPS != null) {
                // if (data.OTRAEPS == 'S') {
                $scope.labelotraepsAdmisionTut = true;
                //$scope.registro.diferenteepsAdmisionTut = true;
              } else {
                $scope.labelotraepsAdmisionTut = false;
                $scope.registro.diferenteepsAdmisionTut = false;
              }
            }
          });
        }
      }
      $scope.setNombreIps = function () {
        if ($scope.registro.nombreips) {
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
              function: 'nombreIps',
              nit_empresa: $scope.registro.nitips
            }
          }).then(function (response) {
            if (response.data.length == 0) {
              $scope.registro.nombreips = "";
              $scope.dsbNombreIps = false;
            } else {
              $scope.registro.nombreips = response.data["0"].NOMBRE;
              $scope.dsbNombreIps = true;
            }
          });
        }
      }
      $scope.setFechaVencimiento = function () {
        $scope.registro.f_recepcion = $("#dteFechaRecepcion").val();
        if ($scope.registro.f_recepcion) {
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
              function: 'fechaVencimiento',
              f_recepcion: $scope.registro.f_recepcion,
              plazo: $scope.registro.plazo
            }
          }).then(function (response) {
            $("#dteFechaVencimiento").val(response.data);
            $scope.registro.f_vencimiento = $("#dteFechaVencimiento").val();
          });
        }
      }
      function setFechaVencimientoClose() { $scope.setFechaVencimiento() }
      $http({
        method: 'POST',
        url: "php/juridica/tutelas/functutelas.php",
        data: {
          function: 'listaFestivos'
        }
      }).then(function (response) {
        $scope.festivos = response.data;
        $("#dteFechaRecepcion").kendoDatePicker({
          format: "dd/MM/yyyy",
          max: new Date(),
          culture: "es-MX",
          close: setFechaVencimientoClose
        });
        $("#dteFechaRecepcionMedida").kendoDatePicker({
          format: "dd/MM/yyyy",
          max: new Date(),
          culture: "es-MX",
          close: setFechaVencimientoMedidaClose
        });
        $("#dteFechaFalloAc").kendoDatePicker({
          format: "dd/MM/yyyy",
          max: new Date(),
          culture: "es-MX",
          close: setFechaVencimientoAcClose
        });
        $("#dteFechaFallo").kendoDatePicker({
          format: "dd/MM/yyyy",
          max: new Date(),
          culture: "es-MX",
          close: setFechaVencimientoFalloClose
        });
        $("#dteFechaRecepcion_nul").kendoDatePicker({
          format: "dd/MM/yyyy",
          max: new Date(),
          culture: "es-MX",
          close: setFechaVencimientoNulClose
        });
        $("#dteFechaRecepcionMedida_nul").kendoDatePicker({
          format: "dd/MM/yyyy",
          max: new Date(),
          culture: "es-MX",
          close: setFechaVencimientoMedidaNulClose
        });
        $("#dteFechaFallo_nul").kendoDatePicker({
          format: "dd/MM/yyyy",
          max: new Date(),
          culture: "es-MX",
          close: setFechaVencimientoFalloNulClose
        });
      });
      $("#dteFechaVencimiento").kendoDatePicker({
        format: "dd/MM/yyyy",
        culture: "es-MX",
        disableDates: ["su", "sa"]
      });

      // FUNCION PLAZO MEDIDA CNVU 10/12/2019
      $scope.setFechaVencimientoMedida = function () {
        $scope.registro.f_medida = $("#dteFechaRecepcionMedida").val();
        if ($scope.registro.f_medida) {
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
              function: 'fechaVencimiento',
              f_recepcion: $scope.registro.f_medida,
              plazo: $scope.registro.plazo_medida_prov
            }
          }).then(function (response) {
            $("#dteFechaVencimientoMedida").val(response.data);
            $scope.registro.f_vencimientomedida = $("#dteFechaVencimientoMedida").val();
          });
        }
      }
      function setFechaVencimientoMedidaClose() { $scope.setFechaVencimientoMedida() }
      $("#dteFechaVencimientoMedida").kendoDatePicker({
        format: "dd/MM/yyyy",
        max: new Date(),
        culture: "es-MX",
        disableDates: ["su", "sa"]
      });

      // FUNCION PLAZO FALLO AC CNVU 02/12/2019
      $scope.setFechaVencimientoFalloAc = function () {
        $scope.registro.f_falloac = $("#dteFechaFalloAc").val();
        if ($scope.registro.f_falloac) {
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
              function: 'fechaVencimiento',
              f_recepcion: $scope.registro.f_falloac,
              plazo: $scope.registro.plazofalloac
            }
          }).then(function (response) {
            $("#dteFechaVencimientoFalloAc").val(response.data);
            $scope.registro.f_vencimientofalloac = $("#dteFechaVencimientoFalloAc").val();
          });
        }
      }
      function setFechaVencimientoAcClose() { $scope.setFechaVencimientoFalloAc() }
      $("#dteFechaVencimientoFalloAc").kendoDatePicker({
        format: "dd/MM/yyyy",
        culture: "es-MX",
        disableDates: ["su", "sa"]
      });

      $scope.setFechaVencimientoFallo = function () {
        $scope.detalles.f_fallo = $("#dteFechaFallo").val();
        if ($scope.detalles.f_fallo) {
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
              function: 'fechaVencimiento',
              f_recepcion: $scope.detalles.f_fallo,
              plazo: $scope.detalles.plazofallo
            }
          }).then(function (response) {
            $("#dteFechaVencimientoFallo").val(response.data);
            // if ($scope.detalles.fallotutela == true) {
            // 	$("#dteFechaVencimientoFallo").val('');
            // 	$scope.detalles.f_vencimientofallo = '';
            // } else {
            // 	$scope.detalles.f_vencimientofallo = $("#dteFechaVencimientoFallo").val();
            // }
          });
        }
      }
      function setFechaVencimientoFalloClose() { $scope.setFechaVencimientoFallo() }
      $("#dteFechaVencimientoFallo").kendoDatePicker({
        format: "dd/MM/yyyy",
        culture: "es-MX",
        disableDates: ["su", "sa"]
      });

      // FUNCION PLAZO FALLO CNVU 02/12/2019
      $scope.setFechaVencimiento_nul = function () {
        if ($("#dteFechaRecepcion_nul").val() != "") {
          $scope.registro_nul.f_recepcion = $("#dteFechaRecepcion_nul").val();
          if ($scope.registro_nul) {
            $http({
              method: 'POST',
              url: "php/juridica/tutelas/functutelas.php",
              data: {
                function: 'fechaVencimiento',
                f_recepcion: $scope.registro_nul.f_recepcion,
                plazo: $scope.registro_nul.plazo
              }
            }).then(function (response) {
              $("#dteFechaVencimiento_nul").val(response.data);
              $scope.registro_nul.f_vencimiento = $("#dteFechaVencimiento_nul").val();
            });
          }
        }
      }
      function setFechaVencimientoNulClose() { $scope.setFechaVencimiento_nul() }
      $("#dteFechaVencimiento_nul").kendoDatePicker({
        format: "dd/MM/yyyy",
        culture: "es-MX",
        disableDates: ["su", "sa"]
      });

      $scope.setFechaVencimientoMedida_nul = function () {
        if ($("#dteFechaRecepcion_nul").val() != "") {
          $scope.registro_nul.f_medida = $("#dteFechaRecepcionMedida_nul").val();
          if ($scope.registro_nul) {
            $http({
              method: 'POST',
              url: "php/juridica/tutelas/functutelas.php",
              data: {
                function: 'fechaVencimiento',
                f_recepcion: $scope.registro_nul.f_medida,
                plazo: $scope.registro_nul.plazo_medida_prov
              }
            }).then(function (response) {
              $("#dteFechaVencimientoMedida_nul").val(response.data);
              $scope.registro_nul.f_vencimientomedida = $("#dteFechaVencimientoMedida_nul").val();
            });
          }
        }
      }
      function setFechaVencimientoMedidaNulClose() { $scope.setFechaVencimientoMedida_nul() }
      $("#dteFechaVencimientoMedida_nul").kendoDatePicker({
        format: "dd/MM/yyyy",
        max: new Date(),
        culture: "es-MX",
        disableDates: ["su", "sa"]
      });

      $scope.setFechaVencimientoFallo_nul = function () {
        $scope.detalles_nul.f_fallo = $("#dteFechaFallo_nul").val();
        if ($scope.detalles_nul.f_fallo) {
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
              function: 'fechaVencimiento',
              f_recepcion: $scope.detalles_nul.f_fallo,
              plazo: $scope.detalles_nul.plazofallo
            }
          }).then(function (response) {
            $("#dteFechaVencimientoFallo_nul").val(response.data);
            $scope.detalles_nul.f_vencimientofallo = $("#dteFechaVencimientoFallo_nul").val();
          });
        }
      }
      function setFechaVencimientoFalloNulClose() { $scope.setFechaVencimientoFallo_nul() }
      $("#dteFechaVencimientoFallo_nul").kendoDatePicker({
        format: "dd/MM/yyyy",
        culture: "es-MX",
        disableDates: ["su", "sa"]
      });

      function readFile() {
        if (this.files && this.files[0]) {
          var FR = new FileReader();
          FR.addEventListener("load", function (e) {

            if (document.getElementById('admisiontutela').files[0].size < 15000320 && document.getElementById('admisiontutela').files[0].size > 0) {
              $scope.registro.adjuntotutela = e.target.result;
              $scope.registro.adjuntotutelaext = '';
              var name = document.getElementById('admisiontutela').files[0].name;
              $scope.registro.adjuntotutelaext = name.split('.').pop();
              document.querySelector('#inputAdmisionTutela').classList.replace('invalid', 'valid');
            } else {
              swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (15MB)!', 'info');
              document.getElementById('admisiontutela').value = '';
              document.getElementById('inputAdmisionTutela').value = '';
            }


          });
          FR.readAsDataURL(this.files[0]);
        } else {
          $scope.registro.adjuntotutela = '';
          $scope.registro.adjuntotutelaext = '';
        }
      }
      function convertRecibidoRespuestaTutela() {
        if (this.files && this.files[0]) {
          var FR = new FileReader();
          FR.addEventListener("load", function (e) {
            $scope.archivorecibidotutela = e.target.result;
            $scope.archivorecibidotutelaext = '';
            var name = document.getElementById('recibidorespuestatutela').files[0].name;
            $scope.archivorecibidotutelaext = name.split('.').pop();
          });
          FR.readAsDataURL(this.files[0]);
        }
      }
      function readFalloInstDos() {
        if (this.files && this.files[0]) {
          var FR = new FileReader();
          FR.addEventListener("load", function (e) {
            $scope.archivofallotutelaseginst = e.target.result;
            var name = document.getElementById('filefallotutelainstdos').files[0].name;
            $scope.archivofallotutelaseginstext = name.split('.').pop();
          });
          FR.readAsDataURL(this.files[0]);
        }
      }
      function readFileImpugnacion() {
        if (this.files && this.files[0]) {
          var FR = new FileReader();
          FR.addEventListener("load", function (e) {
            $scope.archivoimpugnacion = e.target.result;
            var name = document.getElementById('archivoimpugnacion').files[0].name;
            $scope.archivoimpugnacionext = name.split('.').pop();
          });
          FR.readAsDataURL(this.files[0]);
        }
      }
      //////////////////////////////////////////
      //////////////////////////////////////////
      function readFileCumpliMensual() {
        if (this.files && this.files[0]) {
          var FR = new FileReader();
          FR.addEventListener("load", function (e) {
            $scope.archivocumplimensual = e.target.result;
            var name = document.getElementById('archivocumplimensual').files[0].name;
            $scope.archivocumplimensualext = name.split('.').pop();
          });
          FR.readAsDataURL(this.files[0]);
        }
      }
      function readFileFalloImpugnado() {
        if (this.files && this.files[0]) {
          var FR = new FileReader();
          FR.addEventListener("load", function (e) {
            $scope.archivofalloimpug = e.target.result;
            var name = document.getElementById('falloimpugnacion').files[0].name;
            $scope.archivofalloimpugext = name.split('.').pop();
          });
          FR.readAsDataURL(this.files[0]);
        }
      }

      // FUNCION DE ARCHIVOS MEDIO RECEPCIÓN CNVU 12/12/2019
      function readFileRecepcionRespuesta() {
        if (this.files && this.files[0]) {
          var FR = new FileReader();
          FR.addEventListener("load", function (e) {
            $scope.archivoRespuesta = e.target.result;
            var name = document.getElementById('medioRecepcionRespuestaAdjunto').files[0].name;
            $scope.archivoRespuestaext = name.split('.').pop();
          });
          FR.readAsDataURL(this.files[0]);
        }
      }
      function readFileRecepcionFallo() {
        if (this.files && this.files[0]) {
          var FR = new FileReader();
          FR.addEventListener("load", function (e) {
            $scope.archivoFallo = e.target.result;
            var name = document.getElementById('medioRecepcionFalloAdjunto').files[0].name;
            $scope.archivoFalloext = name.split('.').pop();
          });
          FR.readAsDataURL(this.files[0]);
        }
      }
      function readFileRecepcionSegunda() {
        if (this.files && this.files[0]) {
          var FR = new FileReader();
          FR.addEventListener("load", function (e) {
            $scope.archivoSegunda = e.target.result;
            var name = document.getElementById('medioRecepcionSegundaAdjunto').files[0].name;
            $scope.archivoSegundaext = name.split('.').pop();
          });
          FR.readAsDataURL(this.files[0]);
        }
      }
      function readFileRecepcionImpugnacion() {
        if (this.files && this.files[0]) {
          var FR = new FileReader();
          FR.addEventListener("load", function (e) {
            $scope.archivoRecImpugnacion = e.target.result;
            var name = document.getElementById('medioRecepcionImpugnacionAdjunto').files[0].name;
            $scope.archivoRecImpugnacionext = name.split('.').pop();
          });
          FR.readAsDataURL(this.files[0]);
        }
      }
      function readFileRecepcionCumplimiento() {
        if (this.files && this.files[0]) {
          var FR = new FileReader();
          FR.addEventListener("load", function (e) {
            $scope.archivoRecCumplimiento = e.target.result;
            var name = document.getElementById('medioRecepcionCumplimientoAdjunto').files[0].name;
            $scope.archivoRecCumplimientoext = name.split('.').pop();
          });
          FR.readAsDataURL(this.files[0]);
        }
      }
      function readFileRecepcionFImpugnacion() {
        if (this.files && this.files[0]) {
          var FR = new FileReader();
          FR.addEventListener("load", function (e) {
            $scope.archivoFImpugnacion = e.target.result;
            var name = document.getElementById('medioRecepcionFImpugnacionAdjunto').files[0].name;
            $scope.archivoFImpugnacionext = name.split('.').pop();
          });
          FR.readAsDataURL(this.files[0]);
        }
      }
      // Read file para segunda etapa
      // Fin
      // document.getElementById("fallotutela").addEventListener("change", readFallo);
      document.getElementById("filefallotutelainstdos").addEventListener("change", readFalloInstDos);
      document.getElementById("admisiontutela").addEventListener("change", readFile);
      document.getElementById("recibidorespuestatutela").addEventListener("change", convertRecibidoRespuestaTutela);
      document.getElementById("archivoimpugnacion").addEventListener("change", readFileImpugnacion);
      document.getElementById("archivocumplimensual").addEventListener("change", readFileCumpliMensual);
      document.getElementById("falloimpugnacion").addEventListener("change", readFileFalloImpugnado);
      //PARA NUEVOS CAMPOS DE ADJUNTO DE MEDIO DE RECEPCION CNVU 12/12/2019
      document.getElementById("medioRecepcionRespuestaAdjunto").addEventListener("change", readFileRecepcionRespuesta);
      document.getElementById("medioRecepcionFalloAdjunto").addEventListener("change", readFileRecepcionFallo);
      document.getElementById("medioRecepcionSegundaAdjunto").addEventListener("change", readFileRecepcionSegunda);
      document.getElementById("medioRecepcionImpugnacionAdjunto").addEventListener("change", readFileRecepcionImpugnacion);
      document.getElementById("medioRecepcionCumplimientoAdjunto").addEventListener("change", readFileRecepcionCumplimiento);
      document.getElementById("medioRecepcionFImpugnacionAdjunto").addEventListener("change", readFileRecepcionFImpugnacion);
      //CNVU CC ABRIL 2021

      ////////////CHANGE ARCHIVO 01/07/2021
      $scope.loadFile = function (B64, EXT, NID, NIDT) {
        var fileInput = document.querySelector('#' + NID);
        if (fileInput.files.length != 0) {
          var x = fileInput.files[0].name.split('.');
          if (x[x.length - 1].toUpperCase() == 'PDF') {
            if (fileInput.files.length > 0) {
              if (fileInput.files[0].size < 15000320 && fileInput.files[0].size > 0) {
                $scope.getBase64(fileInput.files[0]).then(function (result) {
                  $scope[B64] = result;
                  $scope[EXT] = x[x.length - 1];
                  console.log($scope[EXT]);
                  setTimeout(function () { $scope.$apply(); }, 300);
                  // console.log(B64, $scope[B64]);
                  // console.log(EXT, $scope[EXT]);
                });
              } else {
                swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (15MB)!', 'info');
                fileInput.value = '';
                document.querySelector('#' + NIDT).value = '';
                $scope[B64] = '';
                setTimeout(function () { $scope.$apply(); }, 300);
              }
            }
          } else {
            swal('Advertencia', '¡El archivo seleccionado deber ser formato PDF!', 'info');
            fileInput.value = '';
            document.querySelector('#' + NIDT).value = '';
            $scope[B64] = '';
            setTimeout(function () { $scope.$apply(); }, 300);
          }
        } else {
          fileInput.value = '';
          $scope[B64] = '';
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

      function paddy(n, p, c) {
        var pad_char = typeof c !== 'undefined' ? c : '0';
        var pad = new Array(1 + p).join(pad_char);
        var res = (pad + n).slice(-pad.length);
        return res;
      }
      $scope.validaCons = function () {
        $scope.registro.consecutivo = paddy($scope.registro.consecutivo, 5);
      }

      // FUNCION PARA MINIMIZAR CODIGO OMITIR ADMISION CNVU 14/01/2020
      $scope.omitirAdmisionTut = function (mensajeerror, codigotut) {
        $scope.btn.GuardaRegistro = true;
        if ($scope.registro.anioconsecutivo < 2018 || $scope.registro.diferenteepsAdmisionTut == true) {
          if (document.getElementById("admisiontutela").files.length > 0) {
            $http({
              method: 'POST',
              url: "php/upload_file/upload_juridica.php",
              data: {
                constutela: codigotut,
                ubicacion: $scope.registro.ubicacion,
                path: 'Juridica/Tutelas',
                type: $scope.registro.adjuntotutelaext,
                file: $scope.registro.adjuntotutela,
                db: 'GTUT01',
                typefile: '1',
                ori: true
              }
            }).then(function (response) {
              if (response.data.codigo == "1") {
                // REGISTRA MEDIO RECEPCION ADMISIÓN TUTELA ADJUNTO CNVU
                $scope.registro.adjuntotutela = '';
                $scope.registro.adjuntotutelaext = '';
                $http({
                  method: 'POST',
                  url: "php/upload_file/upload_juridica.php",
                  data: {
                    db: 'GMREC',
                    path: 'Juridica/Tutelas',
                    constutela: $scope.registro.codigotutela,
                    ubicacion: $scope.registro.ubicacion,
                    type: ($scope.registro.medioRecepcionAdmisionTut == false) ? "" : $scope.archivoAdmisionTutext,
                    file: ($scope.registro.medioRecepcionAdmisionTut == false) ? "" : $scope.archivoAdmisionTut,
                    fecha_reqpre: $("#dteFechaRecepcion").val(),
                    typefile: '26',
                    medio: ($scope.registro.medioRecepcionAdmisionTut == true) ? true : false,
                    ori: ($scope.registro.medioRecepcionAdmisionTut == true) ? true : false
                  }
                }).then(function (response) {
                  $scope.btn.GuardaRegistro = false;
                  if (response.data.codigo == "1") {
                    swal('Completado', mensajeerror, 'success')
                    $scope.dsbRegistro = true;
                    $scope.hdeVBrespuestatutela = false;
                    $scope.hdeAdjuntarRespuesta = false;
                    $scope.hdeBtnPanelAdjuntos = false;
                    $scope.despl2 = true;
                    setTimeout(function () { $(document).scrollTop($('#panelListado2').height() + 100); }, 500);
                    $scope.despl1 = true;
                    $scope.archivoadminision = '';
                    $scope.hdeAdjuntarfile = true;
                    $scope.registro.adjuntotutela = '';
                    $scope.registro.adjuntotutelaext = '';
                    $scope.busqueda();
                    $('#resultTutelas_filter input').val(codigotut).trigger('keyup');
                    // LIMPIA CAMPOS RECEPCION ADMISION TUTELA CNVU
                    // $("#dteFechaMedioRecepcionAdmisionTut").val() = "";
                    $scope.Medioarchivoadminision = '';
                    //
                  } else {
                    swal('Error', response.data.observacion_err, 'warning')
                  }
                });
              } else {
                $scope.btn.GuardaRegistro = false;
                swal('Error', response.data.observacion_err, 'warning')
              }
            });
          } else {
            $scope.btn.GuardaRegistro = false;
            swal('Completado', mensajeerror, 'success');
            $scope.registro.adjuntotutela = '';
            $scope.registro.adjuntotutelaext = '';
            $scope.busqueda();
            $('#resultTutelas_filter input').val(codigotut).trigger('keyup');
          }
        } else {
          if (document.getElementById("admisiontutela").files.length > 0) {
            $http({
              method: 'POST',
              url: "php/upload_file/upload_juridica.php",
              data: {
                constutela: codigotut,
                ubicacion: $scope.registro.ubicacion,
                path: 'Juridica/Tutelas',
                type: $scope.registro.adjuntotutelaext,
                file: $scope.registro.adjuntotutela,
                db: 'GTUT01',
                typefile: '1',
                ori: true
              }
            }).then(function (response) {
              if (response.data.codigo == "1") {
                // REGISTRA MEDIO RECEPCION ADMISIÓN TUTELA ADJUNTO CNVU
                $scope.registro.adjuntotutela = '';
                $scope.registro.adjuntotutelaext = '';
                $http({
                  method: 'POST',
                  url: "php/upload_file/upload_juridica.php",
                  data: {
                    db: 'GMREC',
                    path: 'Juridica/Tutelas',
                    constutela: $scope.registro.codigotutela,
                    ubicacion: $scope.registro.ubicacion,
                    type: ($scope.registro.medioRecepcionAdmisionTut == false) ? "" : $scope.archivoAdmisionTutext,
                    file: ($scope.registro.medioRecepcionAdmisionTut == false) ? "" : $scope.archivoAdmisionTut,
                    fecha_reqpre: $("#dteFechaRecepcion").val(),
                    typefile: '26',
                    medio: ($scope.registro.medioRecepcionAdmisionTut == true) ? true : false,
                    ori: ($scope.registro.medioRecepcionAdmisionTut == true) ? true : false
                  }
                }).then(function (response) {
                  $scope.btn.GuardaRegistro = false;
                  if (response.data.codigo == "1") {
                    swal('Completado', mensajeerror, 'success')
                    $scope.dsbRegistro = true;
                    $scope.hdeVBrespuestatutela = false;
                    $scope.hdeAdjuntarRespuesta = false;
                    $scope.hdeBtnPanelAdjuntos = false;
                    $scope.despl2 = true;
                    setTimeout(function () { $(document).scrollTop($('#panelListado2').height() + 100); }, 500);
                    $scope.despl1 = true;
                    $scope.archivoadminision = '';
                    $scope.hdeAdjuntarfile = true;
                    $scope.registro.adjuntotutela = '';
                    $scope.registro.adjuntotutelaext = '';
                    $scope.busqueda();
                    $('#resultTutelas_filter input').val(codigotut).trigger('keyup');
                    // LIMPIA CAMPOS RECEPCION ADMISION TUTELA CNVU
                    // $("#dteFechaMedioRecepcionAdmisionTut").val() = "";
                    $scope.Medioarchivoadminision = '';
                    //
                  } else {
                    $scope.btn.GuardaRegistro = false;
                    swal('Error', response.data.observacion_err, 'warning')
                  }
                });
              } else {
                $scope.btn.GuardaRegistro = false;
                swal('Error', response.data.observacion_err, 'warning')
              }
            });
          } else {
            $scope.btn.GuardaRegistro = false;
            swal('Completado', mensajeerror, 'success');
            $scope.registro.adjuntotutela = '';
            $scope.registro.adjuntotutelaext = '';
            $scope.busqueda();
            $('#resultTutelas_filter input').val(codigotut).trigger('keyup');
          }
          // swal('Información', 'Complete toda la información para registrar la tutela', 'info');
        }
      }

      $scope.registraTutela = function () {
        // debugger
        $scope.btn.GuardaRegistro = true;

        // excepto < 2018
        // if ($scope.registro.anioconsecutivo >= 2018 && document.getElementById("admisiontutela").files.length == 0) {
        // 	swal('Información', 'Adjunte la Admisión de Tutela', 'info'); return
        // }


        if ($scope.registro.regionalTutela == undefined || $scope.registro.regionalTutela == "") {
          swal('Información', 'Seleccione la regional de la tutela', 'info').catch(swal.noop); $scope.btn.GuardaRegistro = false; return
        }
        if ($scope.registro.medioRecepcionAdmisionTut == true && document.getElementById("medioRecepcionAdmisionTutAdjunto").files.length == 0) {
          swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info').catch(swal.noop); $scope.btn.GuardaRegistro = false; return
        }
        if ($scope.juzgado.codigo == undefined || $scope.juzgado.codigo == "") {
          swal('Información', 'Complete toda la información del juzgado', 'info').catch(swal.noop); $scope.btn.GuardaRegistro = false; return
        }
        if (!$scope.registro.chkTecnologiasSalud && !$scope.listCausas_Admision.length) {
          swal('Información', 'Complete las causas y motivos', 'info').catch(swal.noop); $scope.btn.GuardaRegistro = false; return
        }
        if ($scope.registro.chkAtencionCohorte && $scope.listadoPatologiasAfiliado.length && $scope.listadoPatologiasAfiliado.findIndex(e => e.SELECTED) == -1) {
          swal('Información', 'Seleccione al menos 1 patologia', 'info').catch(swal.noop); $scope.btn.GuardaRegistro = false; return
        }


        $scope.registro.juzgado = $scope.juzgado.codigo;
        $scope.registro.consecutivojuzgado = $scope.registro.consecutivo + '-' + $scope.registro.anioconsecutivo;
        // $scope.registro.diagnostico = $scope.diagnostico.codigo;
        // if (($scope.hdeMotivo == false && ($scope.registro.motivo == "" || $scope.registro.motivo === undefined)) ||
        // 	($scope.registro.juzgado === undefined || $scope.registro.juzgado == "") ||
        // 	($scope.hdeDiagnostico == false && ($scope.registro.diagnostico == "" || $scope.registro.diagnostico === undefined))) {
        // 	$scope.btn.GuardaRegistro = false;
        // 	swal('Información', 'Complete toda la información para registrar la tutela', 'info');
        // 	return;
        // }
        $scope.registro.responsable_nac = $scope.cedulalog;


        $scope.registro.actividad = 'I';
        var dataRegistro = JSON.stringify($scope.registro);
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'registraTutela',
            dataRegistro: dataRegistro
          }
        }).then(function (response) {
          $scope.btn.GuardaRegistro = false;
          if (response.data.codigo_err == "0") {
            swal('Error', response.data.observacion_err, 'error').catch(swal.noop);
          } else if (response.data.codigo_err == "1") {
            var mensajeerror = response.data.observacion_err;
            $scope.registro.codigotutela = response.data.consecutivo;
            $scope.omitirAdmisionTut(mensajeerror, $scope.registro.codigotutela);
            $scope.guardarCausas_Adm_NT($scope.registro.codigotutela);
            $scope.guardarCohortesTutela();
            $scope.guardarPQRDSTutela();

          }
        });
      }
      $scope.ActualizarTutela = function () {
        $scope.registro.motivo = ($scope.registro.motivo == 'SELECCIONAR') ? $scope.registro_motivo : $scope.registro.motivo;
        //VALIDACION DE CAMPOS DE FECHA DE FALLO DE TUTELA CNVU 02/12/2019
        if ($scope.Rol_Permisos.EDITAR_ADMISION == 'S' || $scope.registro.status > 2) {
          var Habilitar_Paso = false;
          if ($("#dteFechaRecepcion").val() != "" && $("#dteFechaRecepcion").val() != null && $("#dteFechaRecepcion").val() != undefined) {
            if ($scope.Validar_Fecha($("#dteFechaRecepcion").val()) == 'si') {
              var fecha_falloac = $("#dteFechaFalloAc").val().split("/");

              var fecha_tutelacreacion = $scope.registro.f_recepcion.split("/");

              var newdateftutela = new Date(fecha_tutelacreacion[2], (fecha_tutelacreacion[1] - 1), fecha_tutelacreacion[0]);
              var timeftutela = newdateftutela.getTime();

              var newdateinput = new Date(fecha_falloac[2], (fecha_falloac[1] - 1), fecha_falloac[0]);
              var timeinput = newdateinput.getTime();

              var fecha_actual = new Date();
              var time_actual = fecha_actual.getTime();

              if (timeinput <= timeftutela) {
                swal({
                  title: '¡Información!',
                  text: 'La fecha del Fallo de Tutela no puede ser menor o igual a la fecha de la Tutela.',
                  type: 'info',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#174791'
                });
                Habilitar_Paso = false;
              } else if (timeinput > time_actual) {
                swal({
                  title: '¡Información!',
                  text: 'La fecha del Fallo de Tutela no puede ser mayor a la fecha de hoy.',
                  type: 'info',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#174791'
                });
                Habilitar_Paso = false;
              } else {
                Habilitar_Paso = true;
              }
            }
          } else {
            Habilitar_Paso = true;
          }
          if (Habilitar_Paso == true) {
            $scope.registro.motivolbl = $scope.registro.motivo;
            $scope.registro.diagnostico = $scope.diagnostico.codigo;
            $scope.registro.juzgado = $scope.juzgado.codigo;
            $scope.registro.consecutivojuzgado = $scope.registro.consecutivo + '-' + $scope.registro.anioconsecutivo;
            if (
              // ($("#dteFechaRecepcion").val() == "" || $("#dteFechaRecepcion").val() === undefined) ||
              // ($("#dteFechaVencimiento").val() == "" || $("#dteFechaVencimiento").val() === undefined) ||
              ($scope.registro.juzgado === undefined || $scope.registro.juzgado == "")) {
              swal('Información', 'Complete toda la información para registrar la tutela', 'info');
            } else {
              $scope.registro.actividad = 'U';
              if ($scope.registro.accionante == '2') {
                $scope.registro.tipoidafiliado = null;
                $scope.registro.idafiliado = null;
                $scope.registro.nombreafiliado = null;
                $scope.registro.nombreagente = null;
                $scope.registro.tipoDocAgenteOficioso = null;
                $scope.registro.numDocAgenteOficioso = null;

                $scope.registro.otroaccionante = null;
              } else if ($scope.registro.accionante == '4') {
                $scope.registro.tipoidafiliado = null;
                $scope.registro.idafiliado = null;
                $scope.registro.nombreafiliado = null;
                $scope.registro.nombreagente = null;
                $scope.registro.tipoDocAgenteOficioso = null;
                $scope.registro.numDocAgenteOficioso = null;

                $scope.registro.nitips = null;
                $scope.registro.nombreips = null;
              } else if ($scope.registro.accionante == '3') {
                $scope.registro.nitips = null;
                $scope.registro.nombreips = null;
                $scope.registro.otroaccionante = null;
              } else if ($scope.registro.accionante == '1') {
                $scope.registro.nombreagente = null;
                $scope.registro.tipoDocAgenteOficioso = null;
                $scope.registro.numDocAgenteOficioso = null;

                $scope.registro.nitips = null;
                $scope.registro.nombreips = null;
                $scope.registro.otroaccionante = null;
              } else if ($scope.registro.accionante == '5') {
                $scope.registro.tipoidafiliado = null;
                $scope.registro.idafiliado = null;
                $scope.registro.nombreafiliado = null;
                $scope.registro.nombreagente = null;
                $scope.registro.tipoDocAgenteOficioso = null;
                $scope.registro.numDocAgenteOficioso = null;

                $scope.registro.nitips = null;
                $scope.registro.nombreips = null;
                $scope.registro.otroaccionante = null;
              }
              switch ($scope.registro.causa) {
                case 'CN': case 'CP': case 'IN': case 'IP': case 'MN': case 'MP': case 'PN': case 'PP':
                  $scope.registro.motivo = null;
                  break;
              }
              var dataRegistro = JSON.stringify($scope.registro);
              // console.log(dataRegistro);
              $http({
                method: 'POST',
                url: "php/juridica/tutelas/functutelas.php",
                data: {
                  function: 'registraTutela',
                  dataRegistro: dataRegistro
                }
              }).then(function (response) {
                if (response.data.codigo_err == "0") {
                  swal('Error', response.data.observacion_err, 'error');
                  $scope.btn.GuardaRegistro = false;
                } else if (response.data.codigo_err == "1") {
                  var mensajeerror = response.data.observacion_err;
                  $scope.registro.codigotutela = response.data.consecutivo;
                  swal('Completado', mensajeerror, 'success');
                  $scope.btn.GuardaRegistro = false;
                  // $scope.hdeVBrespuestatutela = true;
                  $scope.hdeBtnPanelAdjuntos = false;
                  // $scope.despl2 = true;
                  setTimeout(function () { $(document).scrollTop($('#panelListado2').height() + 100); }, 500);
                  $scope.despl1 = true;
                  $scope.archivoadminision = '';
                  $scope.omitirAdmisionTut(mensajeerror, $scope.registro.codigotutela);
                }
              });
            }
          }
        } else {
          if ($scope.registro.marca_eps_anterior == 'X') {
            var Habilitar_Paso = false;
            if ($("#dteFechaRecepcion").val() != "" && $("#dteFechaRecepcion").val() != null && $("#dteFechaRecepcion").val() != undefined) {
              if ($scope.Validar_Fecha($("#dteFechaRecepcion").val()) == 'si') {
                var fecha_falloac = $("#dteFechaFalloAc").val().split("/");

                var fecha_tutelacreacion = $scope.registro.f_recepcion.split("/");

                var newdateftutela = new Date(fecha_tutelacreacion[2], (fecha_tutelacreacion[1] - 1), fecha_tutelacreacion[0]);
                var timeftutela = newdateftutela.getTime();

                var newdateinput = new Date(fecha_falloac[2], (fecha_falloac[1] - 1), fecha_falloac[0]);
                var timeinput = newdateinput.getTime();

                var fecha_actual = new Date();
                var time_actual = fecha_actual.getTime();

                if (timeinput <= timeftutela) {
                  swal({
                    title: '¡Información!',
                    text: 'La fecha del Fallo de Tutela no puede ser menor o igual a la fecha de la Tutela.',
                    type: 'info',
                    confirmButtonText: 'Cerrar',
                    confirmButtonColor: '#174791'
                  });
                  Habilitar_Paso = false;
                } else if (timeinput > time_actual) {
                  swal({
                    title: '¡Información!',
                    text: 'La fecha del Fallo de Tutela no puede ser mayor a la fecha de hoy.',
                    type: 'info',
                    confirmButtonText: 'Cerrar',
                    confirmButtonColor: '#174791'
                  });
                  Habilitar_Paso = false;
                } else {
                  Habilitar_Paso = true;
                }
              }
            } else {
              Habilitar_Paso = true;
            }
            if (Habilitar_Paso == true) {
              $scope.registro.motivolbl = $scope.registro.motivo;
              $scope.registro.diagnostico = $scope.diagnostico.codigo;
              $scope.registro.juzgado = $scope.juzgado.codigo;
              $scope.registro.consecutivojuzgado = $scope.registro.consecutivo + '-' + $scope.registro.anioconsecutivo;
              if (
                // ($("#dteFechaRecepcion").val() == "" || $("#dteFechaRecepcion").val() === undefined) ||
                // ($("#dteFechaVencimiento").val() == "" || $("#dteFechaVencimiento").val() === undefined) ||
                ($scope.registro.juzgado === undefined || $scope.registro.juzgado == "")) {
                swal('Información', 'Complete toda la información para registrar la tutela', 'info');
              } else {
                $scope.registro.actividad = 'U';
                if ($scope.registro.accionante == '2') {
                  $scope.registro.tipoidafiliado = null;
                  $scope.registro.idafiliado = null;
                  $scope.registro.nombreafiliado = null;
                  $scope.registro.nombreagente = null;
                  $scope.registro.tipoDocAgenteOficioso = null;
                  $scope.registro.numDocAgenteOficioso = null;

                  $scope.registro.otroaccionante = null;
                } else if ($scope.registro.accionante == '4') {
                  $scope.registro.tipoidafiliado = null;
                  $scope.registro.idafiliado = null;
                  $scope.registro.nombreafiliado = null;
                  $scope.registro.nombreagente = null;
                  $scope.registro.tipoDocAgenteOficioso = null;
                  $scope.registro.numDocAgenteOficioso = null;

                  $scope.registro.nitips = null;
                  $scope.registro.nombreips = null;
                } else if ($scope.registro.accionante == '3') {
                  $scope.registro.nitips = null;
                  $scope.registro.nombreips = null;
                  $scope.registro.otroaccionante = null;
                } else if ($scope.registro.accionante == '1') {
                  $scope.registro.nombreagente = null;
                  $scope.registro.tipoDocAgenteOficioso = null;
                  $scope.registro.numDocAgenteOficioso = null;

                  $scope.registro.nitips = null;
                  $scope.registro.nombreips = null;
                  $scope.registro.otroaccionante = null;
                } else if ($scope.registro.accionante == '5') {
                  $scope.registro.tipoidafiliado = null;
                  $scope.registro.idafiliado = null;
                  $scope.registro.nombreafiliado = null;
                  $scope.registro.nombreagente = null;
                  $scope.registro.tipoDocAgenteOficioso = null;
                  $scope.registro.numDocAgenteOficioso = null;

                  $scope.registro.nitips = null;
                  $scope.registro.nombreips = null;
                  $scope.registro.otroaccionante = null;
                }
                switch ($scope.registro.causa) {
                  case 'CN': case 'CP': case 'IN': case 'IP': case 'MN': case 'MP': case 'PN': case 'PP':
                    $scope.registro.motivo = null;
                    break;
                }
                var dataRegistro = JSON.stringify($scope.registro);
                // console.log(dataRegistro);
                $http({
                  method: 'POST',
                  url: "php/juridica/tutelas/functutelas.php",
                  data: {
                    function: 'registraTutela',
                    dataRegistro: dataRegistro
                  }
                }).then(function (response) {
                  if (response.data.codigo_err == "0") {
                    swal('Error', response.data.observacion_err, 'error');
                    $scope.btn.GuardaRegistro = false;
                  } else if (response.data.codigo_err == "1") {
                    var mensajeerror = response.data.observacion_err;
                    $scope.registro.codigotutela = response.data.consecutivo;
                    swal('Completado', mensajeerror, 'success');
                    $scope.btn.GuardaRegistro = false;
                    // $scope.hdeVBrespuestatutela = true;
                    $scope.hdeBtnPanelAdjuntos = false;
                    // $scope.despl2 = true;
                    setTimeout(function () { $(document).scrollTop($('#panelListado2').height() + 100); }, 500);
                    $scope.despl1 = true;
                    $scope.archivoadminision = '';
                    $scope.omitirAdmisionTut(mensajeerror, $scope.registro.codigotutela);
                  }
                });
              }
            }
          }
        }
      }
      $scope.adjuntaRecibidoTutela = function () {
        // if ($("#dteFechaRecepcionRespuesta").val() == "") {
        // 	swal('Información', 'Ingrese la fecha de radicación', 'info');
        // } else if ($scope.registro.medioRecepcionRespuesta == true && document.getElementById("medioRecepcionRespuestaAdjunto").files.length == 0) {
        // 	swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        // } else {
        // }


        swal({
          title: 'Confirmar',
          text: "¿Desea guardar los detalles de la tutela?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            $scope.btn.GuardaRegistro = true;
            $http({
              method: 'POST',
              url: "php/upload_file/upload_juridica.php",
              data: {
                db: 'RRT01',
                path: 'Juridica/Tutelas',
                constutela: $scope.registro.codigotutela,
                ubicacion: $scope.registro.ubicacion,
                type: $scope.registro.chkRespuestaTutela ? $scope.archivorecibidotutelaext : '',
                file: $scope.registro.chkRespuestaTutela ? $scope.archivorecibidotutela : '',
                fecha_recepcion: $scope.registro.chkRespuestaTutela ? $("#dteFechaRecepcionRespuesta").val() : '',
                typefile: '3',
                ori: $scope.registro.chkRespuestaTutela ? true : false,
                seDioRespuestaTutela: $scope.registro.chkRespuestaTutela ? 'S' : 'N',
                seDioRespuestaTutela_Motivo: !$scope.registro.chkRespuestaTutela ? $scope.registro.chkRespuestaTutela_Motivo : '',

              }
            }).then(function (response) {
              if (response.data.codigo == "1") {
                // REGISTRA MEDIO RECEPCION RESPUESTA TUTELA ADJUNTO CNVU
                $scope.registro.status = 2;
                $scope.listarCausasTutela();
                $http({
                  method: 'POST',
                  url: "php/upload_file/upload_juridica.php",
                  data: {
                    db: 'GMREC',
                    path: 'Juridica/Tutelas',
                    constutela: $scope.registro.codigotutela,
                    ubicacion: $scope.registro.ubicacion,
                    type: ($scope.registro.medioRecepcionRespuesta == false) ? "" : $scope.archivoRespuestaext,
                    file: ($scope.registro.medioRecepcionRespuesta == false) ? "" : $scope.archivoRespuesta,
                    fecha_reqpre: $("#dteFechaRecepcionRespuesta").val(),
                    typefile: '27',
                    medio: ($scope.registro.medioRecepcionRespuesta == true) ? true : false,
                    ori: $scope.registro.chkRespuestaTutela && $scope.registro.medioRecepcionRespuesta ? true : false

                  }
                }).then(function (response) {
                  $scope.btn.GuardaRegistro = false;
                  if (response.data.codigo == "1") {
                    $scope.CargaTabsEtapas(3);
                    swal('Completado', response.data.observacion_err, 'success');
                    $scope.hdeFechaFallo = false;
                  } else {
                    swal('Error', response.data.observacion_err, 'warning');
                    $scope.btn.GuardaRegistro = false;
                  }
                });
              } else {
                swal('Error', response.data.observacion_err, 'warning')
              }
            });
          }
        })
      }
      $scope.changeFallo = function () {
        $scope.detalles.tratamientointegral = false;
        $scope.detalles.seguimiento = false;
        // if ($scope.detalles.fallotutela == true) {
        // 	$scope.hdeFechaFallo = true;
        // } else {
        // 	$scope.hdeFechaFallo = false;
        // }
      }

      //OCULTA O MUESTRA FECHA DE MEDIDA PROVISIONAL CNVU 10/12/2019
      $scope.changeMedida = function (variable) {
        switch (variable) {
          case "1":
            if ($scope.registro.medidaprovisional == true) {
              $scope.hdeFechaMedida = false;
              // ASIGNAR SYSDATE CNVU 13/01/2020
              //$("#dteFechaRecepcionMedida").val(today);
            } else {
              $scope.hdeFechaMedida = true;
              $scope.registro.medidaprovisional = "";
            }
            break;
          case "2":
            if ($scope.registro.medioRecepcionRespuesta == true) {
              $scope.hdeMedioRecepcionRespuesta = false;
            } else {
              $scope.hdeMedioRecepcionRespuesta = true;
            }
            break;
          case "3":
            if ($scope.registro.medioRecepcionFallo == true) {
              $scope.hdeMedioRecepcionFallo = false;
            } else {
              $scope.hdeMedioRecepcionFallo = true;
            }
            break;
          case "4":
            if ($scope.registro.medioRecepcionSegunda == true) {
              $scope.hdeMedioRecepcionSegunda = false;
            } else {
              $scope.hdeMedioRecepcionSegunda = true;
            }
            break;
          case "5":
            if ($scope.registro.medioRecepcionImpugnacion == true) {
              $scope.hdeMedioRecepcionImpugnacion = false;
            } else {
              $scope.hdeMedioRecepcionImpugnacion = true;
            }
            break;
          case "6":
            if ($scope.registro.medioRecepcionCumplimiento == true) {
              $scope.hdeMedioRecepcionCumplimiento = false;
            } else {
              $scope.hdeMedioRecepcionCumplimiento = true;
            }
            break;
          case "7":
            if ($scope.registro.medioRecepcionFImpugnacion == true) {
              $scope.hdeMedioRecepcionFImpugnacion = false;
            } else {
              $scope.hdeMedioRecepcionFImpugnacion = true;
            }
            break;
          case "8":
            if ($scope.registro.medioRecepcionRqPrevio == true) {
              $scope.hdeMedioRecepcionRqPrevio = false;
            } else {
              $scope.hdeMedioRecepcionRqPrevio = true;
            }
            break;
          case "9":
            if ($scope.registro.medioRecepcionRespuestaRq == true) {
              $scope.hdeMedioRecepcionRespuestaRq = false;
            } else {
              $scope.hdeMedioRecepcionRespuestaRq = true;
            }
            break;
          case "10":
            if ($scope.registro.medioRecepcionAdmision == true) {
              $scope.hdeMedioRecepcionAdmision = false;
            } else {
              $scope.hdeMedioRecepcionAdmision = true;
            }
            break;
          case "11":
            if ($scope.registro.medioRecepcionRespuestaInc == true) {
              $scope.hdeMedioRecepcionRespuestaInc = false;
            } else {
              $scope.hdeMedioRecepcionRespuestaInc = true;
            }
            break;
          case "12":
            if ($scope.registro.medioRecepcionDecisionInc == true) {
              $scope.hdeMedioRecepcionDecisionInc = false;
            } else {
              $scope.hdeMedioRecepcionDecisionInc = true;
            }
            break;
          case "13":
            if ($scope.registro.medioRecepcionConsultaInc == true) {
              $scope.hdeMedioRecepcionConsultaInc = false;
            } else {
              $scope.hdeMedioRecepcionConsultaInc = true;
            }
            break;
          case "14":
            if ($scope.registro.medioRecepcionCierreInc == true) {
              $scope.hdeMedioRecepcionCierreInc = false;
            } else {
              $scope.hdeMedioRecepcionCierreInc = true;
            }
            break;
          case "15":
            if ($scope.registro.medioRecepcionAdmisionTut == true) {
              $scope.hdeMedioRecepcionAdmisionTut = false;
            } else {
              $scope.hdeMedioRecepcionAdmisionTut = true;
            }
            break;
          case "16":
            if ($scope.registro.medioRecepcionEstadoTutela == true) {
              $scope.hdeMedioRecepcionEstadoTutela = false;
            } else {
              $scope.hdeMedioRecepcionEstadoTutela = true;
            }
            break;
          // default:
        }
      }

      $scope.changeMedida_nul = function (variable) {
        switch (variable) {
          case "1":
            if ($scope.registro_nul.medidaprovisional == true) {
              $scope.hdeFechaMedida_nul = false;
              // ASIGNAR SYSDATE CNVU 13/01/2020
              $("#dteFechaRecepcionMedida").val(today);
            } else {
              $scope.hdeFechaMedida_nul = true;
              $scope.registro_nul.medidaprovisional = "";
            }
            break;
          case "2":
            if ($scope.registro_nul.medioRecepcionRespuesta == true) {
              $scope.hdeMedioRecepcionRespuesta_nul = false;
            } else {
              $scope.hdeMedioRecepcionRespuesta_nul = true;
            }
            break;
          case "3":
            if ($scope.registro_nul.medioRecepcionFallo == true) {
              $scope.hdeMedioRecepcionFallo_nul = false;
            } else {
              $scope.hdeMedioRecepcionFallo_nul = true;
            }
            break;
          case "4":
            if ($scope.registro_nul.medioRecepcionSegunda == true) {
              $scope.hdeMedioRecepcionSegunda_nul = false;
            } else {
              $scope.hdeMedioRecepcionSegunda_nul = true;
            }
            break;
          case "5":
            if ($scope.registro_nul.medioRecepcionImpugnacion == true) {
              $scope.hdeMedioRecepcionImpugnacion_nul = false;
            } else {
              $scope.hdeMedioRecepcionImpugnacion_nul = true;
            }
            break;
          case "6":
            if ($scope.registro_nul.medioRecepcionCumplimiento == true) {
              $scope.hdeMedioRecepcionCumplimiento_nul = false;
            } else {
              $scope.hdeMedioRecepcionCumplimiento_nul = true;
            }
            break;
          case "7":
            if ($scope.registro_nul.medioRecepcionFImpugnacion == true) {
              $scope.hdeMedioRecepcionFImpugnacion_nul = false;
            } else {
              $scope.hdeMedioRecepcionFImpugnacion_nul = true;
            }
            break;
          case "8":
            if ($scope.registro_nul.medioRecepcionRqPrevio == true) {
              $scope.hdeMedioRecepcionRqPrevio_nul = false;
            } else {
              $scope.hdeMedioRecepcionRqPrevio_nul = true;
            }
            break;
          case "9":
            if ($scope.registro_nul.medioRecepcionRespuestaRq == true) {
              $scope.hdeMedioRecepcionRespuestaRq_nul = false;
            } else {
              $scope.hdeMedioRecepcionRespuestaRq_nul = true;
            }
            break;
          case "10":
            if ($scope.registro_nul.medioRecepcionAdmision == true) {
              $scope.hdeMedioRecepcionAdmision_nul = false;
            } else {
              $scope.hdeMedioRecepcionAdmision_nul = true;
            }
            break;
          case "11":
            if ($scope.registro_nul.medioRecepcionRespuestaInc == true) {
              $scope.hdeMedioRecepcionRespuestaInc_nul = false;
            } else {
              $scope.hdeMedioRecepcionRespuestaInc_nul = true;
            }
            break;
          case "12":
            if ($scope.registro_nul.medioRecepcionDecisionInc == true) {
              $scope.hdeMedioRecepcionDecisionInc_nul = false;
            } else {
              $scope.hdeMedioRecepcionDecisionInc_nul = true;
            }
            break;
          case "13":
            if ($scope.registro_nul.medioRecepcionConsultaInc == true) {
              $scope.hdeMedioRecepcionConsultaInc_nul = false;
            } else {
              $scope.hdeMedioRecepcionConsultaInc_nul = true;
            }
            break;
          case "14":
            if ($scope.registro_nul.medioRecepcionCierreInc == true) {
              $scope.hdeMedioRecepcionCierreInc_nul = false;
            } else {
              $scope.hdeMedioRecepcionCierreInc_nul = true;
            }
            break;
          // default:
        }
      }

      $scope.registraDetalles = function () {
        //VALIDACION DE CAMPOS DE FECHA DE FALLO DE TUTELA CNVU 02/12/2019
        var Habilitar_Paso = false;
        if ($scope.detalles.fallotutela == false && $scope.detalles.fallotutela != undefined) {
          if ($scope.Validar_Fecha($("#dteFechaFallo").val()) == 'si') {
            Habilitar_Paso = true;
          }
        } else {
          Habilitar_Paso = true;
        }
        if ($scope.detalles.fallotutela == undefined) { $scope.hdeFechaFallo = false; }

        if (Habilitar_Paso == true) {
          if ($scope.Validar_Fecha($scope.registro.f_recepcion) == 'si') {

            var fecha_fallo = $("#dteFechaFallo").val().split("/");
            var fecha_tutelacreacion = $scope.registro.f_recepcion.split("/");

            var newdateftutela = new Date(fecha_tutelacreacion[2], (fecha_tutelacreacion[1] - 1), fecha_tutelacreacion[0]);
            var timeftutela = newdateftutela.getTime();

            var newdateinput = new Date(fecha_fallo[2], (fecha_fallo[1] - 1), fecha_fallo[0]);
            var timeinput = newdateinput.getTime();

            var fecha_actual = new Date();
            var time_actual = fecha_actual.getTime();

            if (timeinput <= timeftutela && ($scope.marcaotraeps != 'P' || $scope.marcaotraeps != 'X')) {
              swal({
                title: '¡Información!',
                text: 'La fecha del Fallo de Tutela no puede ser menor o igual a la fecha de la Tutela.',
                type: 'info',
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#174791'
              });
            } else if (timeinput > time_actual && ($scope.marcaotraeps != 'P' || $scope.marcaotraeps != 'X')) {
              swal({
                title: '¡Información!',
                text: 'La fecha del Fallo de Tutela no puede ser mayor a la fecha de hoy.',
                type: 'info',
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#174791'
              });
            } else if ($scope.registro.medioRecepcionFallo == true && document.getElementById("medioRecepcionFalloAdjunto").files.length == 0) {
              swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
            }
            $scope.registraDetallesComplemento();
          } else {
            $scope.registraDetallesComplemento();
          }
        } else {
          //Habilitar_Paso
          swal('Información', 'Digite los campos de Fecha Fallo de Tutela', 'info');
        }
      }

      $scope.registraDetallesComplemento = function () {
        swal({
          title: 'Confirmar',
          text: "¿Desea guardar los detalles de la tutela?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            $scope.btn.GuardaRegistro = true;
            var dataDetalle = JSON.stringify($scope.detalles);
            // Hace la Peticion cuando crea la tutela y sigue el flujo porque no se guarda la ubicacion de la tutela
            if ($scope.registro.ubicacion == undefined) {
              $.getJSON("php/obtenersession.php").done(function (respuesta) {
                $scope.registro.ubicacion = respuesta;
                // console.log($scope.registro);
              })
            }
            $http({
              method: 'POST',
              url: "php/juridica/tutelas/functutelas.php",
              data: {
                function: 'registraEtapa2',
                dataDetalle: dataDetalle,
                codigotutela: $scope.registro.codigotutela,
                ubicacion_tutela: $scope.registro.ubicacion
              }
            }).then(function (response) {
              if (response.data.codigo == "1") {
                $http({
                  method: 'POST',
                  url: "php/upload_file/upload_juridica.php",
                  data: {
                    db: 'uplRutaDb',
                    path: 'Juridica/Tutelas',
                    constutela: $scope.registro.codigotutela,
                    ubicacion: $scope.registro.ubicacion,
                    type: $scope.archivofallotutelaext,
                    file: $scope.archivofallotutela,
                    typefile: '2',
                    ori: true
                  }
                }).then(function (response) {
                  if (response.data.codigo == "1") {
                    // Se guardan las causas
                    if (!$scope.detalles.fallotutela) {
                      $scope.guardarCausas_Fallo_Impug('causaForm_Fallo');
                    }
                    $scope.registro.status = 3;
                    // $http({
                    // 	method: 'POST',
                    // 	url: "php/upload_file/upload_juridica.php",
                    // 	data: {
                    // 		db: 'GOBS',
                    // 		path: 'Juridica/Tutelas',
                    // 		constutela: $scope.registro.codigotutela,
                    // 		type: $scope.archivoObservacionFalloExt,
                    // 		file: $scope.archivoObservacionFallo,
                    // 		observacion: $scope.detalles.observacion_fallo,
                    // 		typefile: '50',
                    // 		ori: $scope.archivoObservacionFallo == '' ? false : true
                    // 	}
                    // }).then(function (response) {
                    // 	if (response.data.codigo == "1") {
                    // REGISTRA MEDIO RECEPCION FALLO TUTELA ADJUNTO CNVU
                    $http({
                      method: 'POST',
                      url: "php/upload_file/upload_juridica.php",
                      data: {
                        db: 'GMREC',
                        path: 'Juridica/Tutelas',
                        constutela: $scope.registro.codigotutela,
                        ubicacion: $scope.registro.ubicacion,
                        type: ($scope.registro.medioRecepcionFallo == false) ? "" : $scope.archivoFalloext,
                        file: ($scope.registro.medioRecepcionFallo == false) ? "" : $scope.archivoFallo,
                        fecha_reqpre: $("#dteFechaFallo").val(),
                        typefile: '28',
                        medio: ($scope.registro.medioRecepcionFallo == true) ? true : false,
                        ori: ($scope.registro.medioRecepcionFallo == true) ? true : false
                      }
                    }).then(function (response) {
                      if (response.data.codigo == "1") {
                        $scope.btn.GuardaRegistro = false;
                        $scope.CargaTabsEtapas(2);
                        swal('Completado', response.data.observacion_err, 'success');

                      } else {
                        swal('Error', response.data.observacion_err, 'warning');
                      }
                    });
                    // } else {
                    // 	swal('Error', response.data.observacion_err, 'warning');
                    // }
                    // });
                  } else {
                    swal('Error', response.data.observacion_err, 'warning');
                  }
                });
              } else {
                swal('Error', response.data.observacion_err, 'warning')
              }
            });
          }
        })
      }

      $scope.registraObs = function (param) {
        var Habilitar_Paso = true;
        if (param == 'F') {
          if (($scope.detalles.observacion_fallo == undefined || $scope.detalles.observacion_fallo == '')
            || document.getElementById("archivoObservacionFallo").files.length == 0) {
            swal('Información', 'Adjunte la Observación del Fallo Tutela', 'info');
            Habilitar_Paso = false;
          }
        } else {
          if (($scope.detalles.observacion_impugnado == undefined || $scope.detalles.observacion_impugnado == '')
            || document.getElementById("archivoObservacionImpugnacion").files.length == 0) {
            swal('Información', 'Adjunte la Observación de la Impugnación de Tutela', 'info');
            Habilitar_Paso = false;
          }
        }
        if (Habilitar_Paso == true) {
          $scope.btn.GuardaRegistro = true;
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar el fallo/impugnación complementario?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'GOBS',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,

                  type: param == 'F' ? $scope.archivoObservacionFalloExt : $scope.archivoObsImpugnacionExt,
                  file: param == 'F' ? $scope.archivoObservacionFallo : $scope.archivoObsImpugnacion,
                  observacion: param == 'F' ? $scope.detalles.observacion_fallo : $scope.detalles.observacion_impugnado,
                  typefile: param == 'F' ? '50' : '51',
                  ori: param == 'F' ? ($scope.archivoObservacionFallo == '' ? false : true) : ($scope.archivoObsImpugnacion == '' ? false : true)
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  $scope.btn.GuardaRegistro = false;
                  if (param == 'F') {
                    document.getElementById('archivoObservacionFallo').disabled = true;
                    document.getElementById('observacion_fallo').disabled = true;
                    $scope.archivoObservacionFallo = '';
                    $scope.archivoObservacionFalloExt = '';
                    $scope.detalles.observacion_fallo = '';
                    $scope.archivoObservacionFalloNom = '';
                  } else {
                    document.getElementById('archivoObservacionImpugnacion').disabled = true;
                    document.getElementById('observacion_impugnado').disabled = true;
                    $scope.archivoObsImpugnacion = '';
                    $scope.archivoObsImpugnacionExt = '';
                    $scope.detalles.observacion_impugnado = '';
                    $scope.archivoObservacionImpugnacionNom = '';
                  }
                  swal('Completado', response.data.observacion_err, 'success');
                  lisTutelas.ajax.reload();
                } else {
                  swal('Error', response.data.observacion_err, 'warning');
                }
              });
            }
          });
        }
      }

      $scope.registraObs_nul = function (param) {
        var Habilitar_Paso = true;
        if (param == 'F') {
          if (($scope.detalles_nul.observacion_fallo == undefined || $scope.detalles_nul.observacion_fallo == '')
            || document.getElementById("archivoObservacionFallo_nul").files.length == 0) {
            swal('Información', 'Adjunte la Observación del Fallo Tutela', 'info');
            Habilitar_Paso = false;
          }
        } else {
          if (($scope.detalles_nul.observacion_impugnado == undefined || $scope.detalles_nul.observacion_impugnado == '')
            || document.getElementById("archivoObservacionImpugnacion_nul").files.length == 0) {
            swal('Información', 'Adjunte la Observación de la Impugnación de Tutela', 'info');
            Habilitar_Paso = false;
          }
        }
        if (Habilitar_Paso == true) {
          $scope.btn.GuardaRegistro_nul = true;
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar el fallo/impugnación complementario?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                // data: {
                // 	db: 'GOBS',
                // 	path: 'Juridica/Tutelas',
                // 	constutela: $scope.registro.codigotutela,
                // 	type: param == 'F' ? $scope.archivoObsFalloTut_nulext : $scope.archivoObsImpugnacionTut_nulext,
                // 	file: param == 'F' ? $scope.archivoObsFalloTut_nul : $scope.archivoObsImpugnacionTut_nul,
                // 	observacion: param == 'F' ? $scope.detalles_nul.observacion_fallo : $scope.detalles_nul.observacion_impugnado,
                // 	typefile: param == 'F' ? '50' : '51',
                // 	ori: param == 'F' ? ($scope.archivoObsFalloTut_nul == '' ? false : true) : ($scope.archivoObsImpugnacionTut_nul == '' ? false : true)
                // }
                data: {
                  db: 'IANUL',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  consnulidad: $scope.consnulidad,
                  responsable: $scope.cedulalog,
                  type: param == 'F' ? $scope.archivoObsFalloTut_nulext : $scope.archivoObsImpugnacionTut_nulext,
                  file: param == 'F' ? $scope.archivoObsFalloTut_nul : $scope.archivoObsImpugnacionTut_nul,
                  fecha_recepcion: '',
                  medio: '',
                  observacion: param == 'F' ? $scope.detalles_nul.observacion_fallo : $scope.detalles_nul.observacion_impugnado,
                  typefile: param == 'F' ? '52' : '53',
                  impugnacion: '',
                  ori: param == 'F' ? ($scope.archivoObsFalloTut_nul == '' ? false : true) : ($scope.archivoObsImpugnacionTut_nul == '' ? false : true)
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  $scope.btn.GuardaRegistro_nul = false;
                  if (param == 'F') {
                    document.getElementById('archivoObservacionFallo_nul').disabled = true;
                    document.getElementById('observacion_fallo_nul').disabled = true;
                    $scope.archivoObsFalloTut_nul = '';
                    $scope.archivoObsFalloTut_nulext = '';
                    $scope.detalles_nul.observacion_fallo = '';
                    $scope.archivoObservacionFalloNom_nul = '';
                  } else {
                    document.getElementById('archivoObservacionImpugnacion_nul').disabled = true;
                    document.getElementById('observacion_impugnado_nul').disabled = true;
                    $scope.archivoObsImpugnacionTut_nul = '';
                    $scope.archivoObsImpugnacionTut_nulext = '';
                    $scope.detalles_nul.observacion_impugnado = '';
                    $scope.archivoObservacionImpugnacionNom_nul = '';
                  }
                  swal('Completado', response.data.observacion_err, 'success');
                } else {
                  swal('Error', response.data.observacion_err, 'warning');
                }
              });
            }
          });
        }
      }

      $scope.registraDetallesInstDos = function () {
        if ($scope.registro.medioRecepcionSegunda == true && document.getElementById("medioRecepcionSegundaAdjunto").files.length == 0) {
          swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
          $scope.btn.GuardaRegistro = false;
        } else {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar los detalles de la tutela?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'uplRutaDb',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  type: $scope.archivofallotutelaseginstext,
                  file: $scope.archivofallotutelaseginst,
                  typefile: '14',
                  ori: true,
                  fallo_seg: $scope.detallesetpdos.fallotutelainstdos == true ? true : false
                }
              }).then(function (response) {
                $scope.btn.GuardaRegistro = false;
                if (response.data.codigo == "1") {
                  // REGISTRA MEDIO RECEPCION SEGUNDA ADJUNTO CNVU 13/12/2019
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'GMREC',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      type: $scope.registro.medioRecepcionSegunda == false ? "" : $scope.archivoSegundaext,
                      file: $scope.registro.medioRecepcionSegunda == false ? "" : $scope.archivoSegunda,
                      fecha_reqpre: "",
                      typefile: '29',
                      medio: $scope.registro.medioRecepcionSegunda == true ? true : false,
                      ori: $scope.registro.medioRecepcionSegunda == true ? true : false
                    }
                  }).then(function (response) {
                    $scope.btn.GuardaRegistro = false;
                    if (response.data.codigo == "1") {
                      $scope.CargaTabsEtapas(4);
                      swal('Completado', response.data.observacion_err, 'success')
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          });
        }
      }
      //

      $scope.registraImpugnacion = function () {
        if ($scope.registro.medioRecepcionImpugnacion == true && (document.getElementById("medioRecepcionImpugnacionAdjunto").files.length == 0
          || $scope.Validar_Fecha($("#dteMedioRecepcionImpugnacion").val()) == 'no')) {
          swal('Información', 'Digite Fecha y Adjunte el soporte de Medio de Recepción', 'info');
        } else {
          swal({
            title: 'Confirmar',
            text: "¿Confirma el registro de la información?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/juridica/tutelas/functutelas.php",
                data: {
                  function: 'registraImpugnacion',
                  impugnado: $scope.detalles.impugnado,
                  codigotutela: $scope.registro.codigotutela
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'GOBS',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      type: $scope.archivoObsImpugnacionExt,
                      file: $scope.archivoObsImpugnacion,
                      observacion: $scope.detalles.observacion_impugnado,
                      typefile: '51',
                      ori: $scope.archivoObsImpugnacion == '' ? false : true
                    }
                  }).then(function (response) {
                    if (response.data.codigo == "1") {
                      if ($scope.detalles.impugnado == true) {
                        $scope.registro.status = 4;
                        $scope.listarCausasTutela();
                        $scope.hdefallo = false;
                        $http({
                          method: 'POST',
                          url: "php/upload_file/upload_juridica.php",
                          data: {
                            db: 'uplRutaDb',
                            path: 'Juridica/Tutelas',
                            constutela: $scope.registro.codigotutela,
                            ubicacion: $scope.registro.ubicacion,
                            type: $scope.archivoimpugnacionext,
                            file: $scope.archivoimpugnacion,
                            typefile: '4',
                            ori: true
                          }
                        }).then(function (response) {
                          if (response.data.codigo == "1") {
                            // REGISTRA MEDIO RECEPCION IMPUGNACION ADJUNTO CNVU 13/12/2019
                            $http({
                              method: 'POST',
                              url: "php/upload_file/upload_juridica.php",
                              data: {
                                db: 'GMREC',
                                path: 'Juridica/Tutelas',
                                constutela: $scope.registro.codigotutela,
                                ubicacion: $scope.registro.ubicacion,
                                type: $scope.registro.medioRecepcionImpugnacion == false ? "" : $scope.archivoRecImpugnacionext,
                                file: $scope.registro.medioRecepcionImpugnacion == false ? "" : $scope.archivoRecImpugnacion,
                                fecha_reqpre: $scope.registro.medioRecepcionImpugnacion,
                                typefile: '30',
                                medio: ($scope.registro.medioRecepcionImpugnacion == true) ? true : false,
                                ori: ($scope.registro.medioRecepcionImpugnacion == true) ? true : false
                              }
                            }).then(function (response) {
                              $scope.btn.GuardaRegistro = false;
                              if (response.data.codigo == "1") {
                                $scope.CargaTabsEtapas(4);
                                swal('Completado', response.data.observacion_err, 'success')
                              } else {
                                swal('Error', response.data.observacion_err, 'warning')
                              }
                            });
                          } else {
                            swal('Error', response.data.observacion_err, 'warning')
                          }
                        });
                      } else {
                        $scope.CargaTabsEtapas(4);
                        swal('Completado', response.data.observacion_err, 'success')
                      }
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  $scope.CargaTabsEtapas(4);
                  swal('Completado', response.data.observacion_err, 'success')
                }
              });
            }
          })
        }
      }

      $scope.registraCumplimientoMensual = function () {
        if ($("#FechaSegMen").val() == "") {
          swal('Información', 'Ingrese la fecha de radicación', 'info');
        } else if ($scope.registro.medioRecepcionCumplimiento == true && document.getElementById("medioRecepcionCumplimientoAdjunto").files.length == 0) {
          swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        } else {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar los campos de cumplimiento?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'CM01',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  type: $scope.archivocumplimensualext,
                  file: $scope.archivocumplimensual,
                  fecha_fechasegmen: $("#FechaSegMen").val(),
                  typefile: '5',
                  ori: true
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  // REGISTRA MEDIO RECEPCION CUMPLIMIENTO ADJUNTO CNVU 13/12/2019
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'GMREC',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      type: $scope.registro.medioRecepcionCumplimiento == false ? "" : $scope.archivoRecCumplimientoext,
                      file: $scope.registro.medioRecepcionCumplimiento == false ? "" : $scope.archivoRecCumplimiento,
                      fecha_reqpre: $("#FechaSegMen").val(),
                      typefile: '31',
                      medio: ($scope.registro.medioRecepcionCumplimiento == true) ? true : false,
                      ori: ($scope.registro.medioRecepcionCumplimiento == true) ? true : false
                    }
                  }).then(function (response) {
                    $scope.btn.GuardaRegistro = false;
                    if (response.data.codigo == "1") {
                      swal('Completado', response.data.observacion_err, 'success');
                      /////
                      $scope.hdeVBrespuestatutela = true;
                      $scope.hdeDetallesAccion = false;
                      $scope.dsbDetalles = true;
                      $scope.despl3 = false;
                      // if ($scope.detalles.fallotutela == true) {
                      // 	$scope.hdeDetallesAccionSeg = false; $scope.dsbDetallesSegInst = true; $scope.despl7 = false;
                      // } else { $scope.hdeDetallesAccionSeg = true; }
                      // $scope.hdeAdjuntarFalloSegInst = true;
                      // $scope.dsbDetallesSegInst = true;
                      /////
                      $scope.hdeImpugnacion = false;
                      $scope.dsbImpugnacion = true;
                      $scope.hdeAdjuntarImpugnacion = true;
                      $scope.despl4 = false;
                      /////
                      $scope.DesactivarBotonesAdjuntar();
                      $scope.despl5 = true;
                      if ($scope.registro.status == "5") {
                        $scope.hdefallo = true;
                      } else {
                        $scope.hdeCumplimiento = true;
                        $scope.hdefallo = false;
                        // Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
                      }
                      /////
                      if ($scope.hdefallo == true) {
                        $scope.hdeCumplimiento = true;
                        $scope.despl5 = false;
                      }
                      if ($scope.detalles.impugnado == true) {
                        $scope.hdecumpli = true;
                        $scope.despl5 = false;
                      }
                      $("#FechaSegMen").val('');

                      $scope.hdeIncidentes = false;
                      $scope.despl6 = true;
                      $scope.selec_inci = 0;
                      $scope.tabselect = 1;
                      $(paso1).addClass('active');
                      $(paso2).removeClass('active');
                      $(paso3).removeClass('active');
                      $(paso4).removeClass('active');
                      $(paso5).removeClass('active');
                      $(paso6).removeClass('active');
                      $(paso7).removeClass('active');
                      setTimeout(function () { $scope.$apply(); }, 500);
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          })
        }
      }

      $scope.registrafechafalloimpugnacion = function () {
        if ($("#FechaFallImp").val() == "") {
          swal('Información', 'Ingrese la fecha de radicación', 'info');
        } else if ($scope.registro.medioRecepcionFImpugnacion == true && document.getElementById("medioRecepcionFImpugnacionAdjunto").files.length == 0) {
          swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        } else {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar los campos de fallo de impugnación?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'FLI01',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  type: $scope.archivofalloimpugext,
                  file: $scope.archivofalloimpug,
                  fecha_fechafallimp: $("#FechaFallImp").val(),
                  falloimpugnacionfc: $scope.detalles.falloimpugnacionfc,
                  typefile: '6',
                  ori: true
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  if (!$scope.detalles.falloimpugnacionfc) {
                    $scope.guardarCausas_Fallo_Impug('causaForm_FalloImp');
                  }

                  // REGISTRA MEDIO RECEPCION FALLO IMPUGNACION ADJUNTO CNVU 13/12/2019
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'GMREC',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      type: $scope.registro.medioRecepcionFImpugnacion == false ? "" : $scope.archivoFImpugnacionext,
                      file: $scope.registro.medioRecepcionFImpugnacion == false ? "" : $scope.archivoFImpugnacion,
                      fecha_reqpre: $("#FechaFallImp").val(),
                      typefile: '32',
                      medio: ($scope.registro.medioRecepcionFImpugnacion == true) ? true : false,
                      ori: ($scope.registro.medioRecepcionFImpugnacion == true) ? true : false
                    }
                  }).then(function (response) {
                    $scope.btn.GuardaRegistro = false;
                    if (response.data.codigo == "1") {
                      $scope.CargaTabsEtapas(6);
                      swal('Completado', response.data.observacion_err, 'success');
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          })
        }
      }

      $scope.registrarequerimientopre = function () {
        if ($("#FechaReqPre").val() == "") {
          swal('Información', 'Ingrese la fecha de radicación', 'info');
        } else if ($scope.registro.medioRecepcionRqPrevio == true && document.getElementById("medioRecepcionRqPrevioAdjunto").files.length == 0) {
          swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        } else {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar los campos de requerimiento previo?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'RP01',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  type: $scope.archivorequerimientopreext,
                  file: $scope.archivorequerimientopre,
                  fecha_reqpre: $("#FechaReqPre").val(),
                  typefile: '7',
                  ori: true
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  // REGISTRA MEDIO RECEPCION RQ ADJUNTO CNVU 13/12/2019
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'GMREC',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      type: $scope.registro.medioRecepcionRqPrevio == false ? "" : $scope.archivoRqPrevioext,
                      file: $scope.registro.medioRecepcionRqPrevio == false ? "" : $scope.archivoRqPrevio,
                      fecha_reqpre: $("#FechaReqPre").val(),
                      typefile: '33',
                      medio: ($scope.registro.medioRecepcionRqPrevio == true) ? true : false,
                      ori: ($scope.registro.medioRecepcionRqPrevio == true) ? true : false
                    }
                  }).then(function (response) {
                    $scope.btn.GuardaRegistro = false;
                    if (response.data.codigo == "1") {
                      swal('Completado', response.data.observacion_err, 'success');
                      //
                      $scope.hdeVBrespuestatutela = true;
                      $scope.hdeDetallesAccion = false;
                      $scope.dsbDetalles = true;
                      $scope.despl3 = false;
                      $scope.hdeDetallesAccionSeg = true;
                      $scope.dsbDetallesSegInst = true;
                      /////
                      $scope.hdeImpugnacion = false;
                      $scope.dsbImpugnacion = true;
                      $scope.despl4 = false;

                      $scope.hdeCumplimiento = false;
                      $scope.hdecumpli = false;// Cumplimiento Mensual
                      //
                      $scope.despl5 = true;
                      if ($scope.registro.status = "5") {
                        $scope.hdefallo = true;
                      } else {
                        $scope.hdefallo = false;
                        // Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
                      }
                      //
                      $scope.archivorequepre = '';
                      $("#FechaReqPre").val('');
                      // SET VALORES VACIOS RQ INC CNVU 13/12/2019
                      $scope.registro.medioRecepcionRqPrevio = false;
                      $scope.changeMedida("8");
                      // $("#dteMedioRecepcionRqPrevio").val('');
                      $scope.Medioarchivorequepre = '';
                      //
                      $scope.hdeIncidentes = false;
                      $scope.despl6 = true;
                      $scope.selec_inci = $scope.tabselect;
                      $scope.tabselect = parseInt($scope.tabselect) + 1;
                      $scope.vertab($scope.tabselect);
                      $scope.csstab($scope.tabselect);
                      //
                      setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1000); }, 500);
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          })
        }
      }

      $scope.registrarequerimientopreres = function () {
        // if (!$scope.registro.chkRespuestaReqPrevio) {
        // 	if ($("#FechaReqPreRes").val() == "") {
        // 		swal('Información', 'Ingrese la fecha de radicación', 'info');
        // 	}
        // 	if ($scope.registro.medioRecepcionRespuestaRq == true && document.getElementById("medioRecepcionRespuestaRqAdjunto").files.length == 0) {
        // 		swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        // 	}
        // }
        swal({
          title: 'Confirmar',
          text: "¿Desea guardar los campos de respuesta de requerimiento previo?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            $scope.btn.GuardaRegistro = true;
            $http({
              method: 'POST',
              url: "php/upload_file/upload_juridica.php",
              data: {
                db: 'RPR01',
                path: 'Juridica/Tutelas',
                constutela: $scope.registro.codigotutela,
                ubicacion: $scope.registro.ubicacion,
                type: $scope.registro.chkRespuestaReqPrevio ? $scope.archivorequerimientopreresext : '',
                file: $scope.registro.chkRespuestaReqPrevio ? $scope.archivorequerimientopreres : '',
                fecha_reqpreres: $scope.registro.chkRespuestaReqPrevio ? $("#FechaReqPreRes").val() : '',
                typefile: '8',
                ori: $scope.registro.chkRespuestaReqPrevio ? true : false,
                sediorespuesta: $scope.registro.chkRespuestaReqPrevio ? 'S' : 'N',
                motivo_no_sediorespuesta: !$scope.registro.chkRespuestaReqPrevio ? $scope.registro.chkRespuestaReqPrevio_Motivo : '',

              }
            }).then(function (response) {
              if (response.data.codigo == "1") {
                // REGISTRA MEDIO RECEPCION RESPUESTA RQ ADJUNTO CNVU 13/12/2019
                $http({
                  method: 'POST',
                  url: "php/upload_file/upload_juridica.php",
                  data: {
                    db: 'GMREC',
                    path: 'Juridica/Tutelas',
                    constutela: $scope.registro.codigotutela,
                    ubicacion: $scope.registro.ubicacion,
                    type: $scope.registro.medioRecepcionRespuestaRq == false ? "" : $scope.archivoRespuestaRqext,
                    file: $scope.registro.medioRecepcionRespuestaRq == false ? "" : $scope.archivoRespuestaRq,
                    fecha_reqpre: $("#FechaReqPreRes").val(),
                    typefile: '34',
                    medio: $scope.registro.medioRecepcionRespuestaRq ? true : false,
                    ori: $scope.registro.chkRespuestaReqPrevio && $scope.registro.medioRecepcionRespuestaRq ? true : false
                  }
                }).then(function (response) {
                  $scope.btn.GuardaRegistro = false;
                  if (response.data.codigo == "1") {
                    swal('Completado', response.data.observacion_err, 'success');
                    //
                    $scope.hdeVBrespuestatutela = true;
                    $scope.hdeDetallesAccion = false;
                    $scope.dsbDetalles = true;
                    $scope.despl3 = false;
                    $scope.hdeDetallesAccionSeg = true;
                    $scope.dsbDetallesSegInst = true;
                    /////
                    $scope.hdeImpugnacion = false;
                    $scope.dsbImpugnacion = true;
                    $scope.despl4 = false;

                    $scope.hdeCumplimiento = false;
                    $scope.hdecumpli = false;// Cumplimiento Mensual
                    //
                    $scope.despl5 = true;
                    if ($scope.registro.status = "5") {
                      $scope.hdefallo = true;
                    } else {
                      $scope.hdefallo = false;
                      // Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
                    }
                    //
                    $scope.archivorequepreres = '';
                    $("#FechaReqPreRes").val('');
                    // SET VALORES VACIOS RESPUESTA RQ INC CNVU 13/12/2019
                    $scope.registro.medioRecepcionRespuestaRq = false;
                    $scope.changeMedida("9");
                    // $("#dteMedioRecepcionRespuestaRq").val('');
                    $scope.Medioarchivorequepreres = '';
                    //
                    $scope.hdeIncidentes = false;
                    $scope.despl6 = true;
                    //
                    $scope.selec_inci = $scope.tabselect;
                    $scope.tabselect = parseInt($scope.tabselect) + 1;
                    $scope.vertab($scope.tabselect);
                    $scope.csstab($scope.tabselect);
                    //
                    setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1000); $scope.$apply(); }, 500);
                  } else {
                    swal('Error', response.data.observacion_err, 'warning')
                  }
                });
              } else {
                swal('Error', response.data.observacion_err, 'warning')
              }
            });
          }
        })
      }

      $scope.registraprocesoincidente = function () {
        if ($("#FechaReqPro").val() == "") {
          swal('Información', 'Ingrese la fecha de radicación', 'info');
        } else if ($scope.registro.medioRecepcionAdmision == true && document.getElementById("medioRecepcionAdmisionAdjunto").files.length == 0) {
          swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        } else {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar los campos de incidente de desacato?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'PID01',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  type: $scope.archivoprocesoincidentesext,
                  file: $scope.archivoprocesoincidentes,
                  fecha_proincdes: $("#FechaReqPro").val(),
                  typefile: '9',
                  ori: true,
                  observacion_admision: $scope.registro.admisionInci_Observacion
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  // REGISTRA MEDIO RECEPCION ADMISION INC ADJUNTO CNVU 13/12/2019
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'GMREC',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      type: $scope.registro.medioRecepcionAdmision == false ? "" : $scope.archivoAdmisionext,
                      file: $scope.registro.medioRecepcionAdmision == false ? "" : $scope.archivoAdmision,
                      fecha_reqpre: $("#FechaReqPro").val(),
                      typefile: '35',
                      medio: ($scope.registro.medioRecepcionAdmision == true) ? true : false,
                      ori: ($scope.registro.medioRecepcionAdmision == true) ? true : false
                    }
                  }).then(function (response) {
                    $scope.btn.GuardaRegistro = false;
                    if (response.data.codigo == "1") {
                      swal('Completado', response.data.observacion_err, 'success');
                      //
                      $scope.hdeVBrespuestatutela = true;
                      $scope.hdeDetallesAccion = false;
                      $scope.dsbDetalles = true;
                      $scope.despl3 = false;
                      $scope.hdeDetallesAccionSeg = true;
                      $scope.dsbDetallesSegInst = true;
                      /////
                      $scope.hdeImpugnacion = false;
                      $scope.dsbImpugnacion = true;
                      $scope.despl4 = false;

                      $scope.hdeCumplimiento = false;
                      $scope.hdecumpli = false;// Cumplimiento Mensual
                      //
                      $scope.despl5 = true;
                      if ($scope.registro.status = "5") {
                        $scope.hdefallo = true;
                      } else {
                        $scope.hdefallo = false;
                        // Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
                      }
                      //
                      $scope.archivoproincdes = '';
                      $("#FechaReqPro").val('');
                      // SET VALORES VACIOS ADMISION INC CNVU 13/12/2019
                      $scope.registro.medioRecepcionAdmision = false;
                      $scope.changeMedida("10");
                      // $("#dteMedioRecepcionAdmision").val('');
                      $scope.Medioarchivoproincdes = '';
                      //
                      $scope.hdeIncidentes = false;
                      $scope.despl6 = true;
                      //
                      $scope.selec_inci = $scope.tabselect;
                      $scope.tabselect = parseInt($scope.tabselect) + 1;
                      $scope.vertab($scope.tabselect);
                      $scope.csstab($scope.tabselect);
                      //
                      setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1000); }, 500);
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          })
        }
      }

      $scope.registraprocesoincidenteres = function () {
        // if ($("#FechaReqProRes").val() == "") {
        // 	swal('Información', 'Ingrese la fecha de radicación', 'info');
        // } else if ($scope.registro.medioRecepcionRespuestaInc == true && document.getElementById("medioRecepcionRespuestaIncAdjunto").files.length == 0) {
        // 	swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        // } else {
        // }

        swal({
          title: 'Confirmar',
          text: "¿Desea guardar los campos de respuesta de incidente de desacato?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            $scope.btn.GuardaRegistro = true;
            $http({
              method: 'POST',
              url: "php/upload_file/upload_juridica.php",
              data: {
                db: 'PID02',
                path: 'Juridica/Tutelas',
                constutela: $scope.registro.codigotutela,
                ubicacion: $scope.registro.ubicacion,
                type: $scope.registro.chkRespuestaInci ? $scope.archivoprocesoincidentesresext : '',
                file: $scope.registro.chkRespuestaInci ? $scope.archivoprocesoincidentesres : '',
                fecha_proincdesres: $scope.registro.chkRespuestaInci ? $("#FechaReqProRes").val() : '',
                typefile: '10',
                ori: $scope.registro.chkRespuestaInci ? true : false,
                sediorespuesta: $scope.registro.chkRespuestaInci ? 'S' : 'N',
                motivo_no_sediorespuesta: !$scope.registro.chkRespuestaInci ? $scope.registro.chkRespuestaInci_Motivo : ''

              }
            }).then(function (response) {
              if (response.data.codigo == "1") {
                // REGISTRA MEDIO RECEPCION RESPUESTA ADMISION INC ADJUNTO CNVU 13/12/2019
                $http({
                  method: 'POST',
                  url: "php/upload_file/upload_juridica.php",
                  data: {
                    db: 'GMREC',
                    path: 'Juridica/Tutelas',
                    constutela: $scope.registro.codigotutela,
                    ubicacion: $scope.registro.ubicacion,
                    type: $scope.registro.medioRecepcionRespuestaInc == false ? "" : $scope.archivoRespuestaIncext,
                    file: $scope.registro.medioRecepcionRespuestaInc == false ? "" : $scope.archivoRespuestaInc,
                    fecha_reqpre: $("#FechaReqProRes").val(),
                    typefile: '36',
                    medio: ($scope.registro.medioRecepcionRespuestaInc == true) ? true : false,
                    ori: $scope.registro.chkRespuestaReqPrevio && $scope.registro.medioRecepcionRespuestaInc ? true : false
                  }
                }).then(function (response) {
                  $scope.btn.GuardaRegistro = false;
                  if (response.data.codigo == "1") {
                    swal('Completado', response.data.observacion_err, 'success');
                    //
                    $scope.hdeVBrespuestatutela = true;
                    $scope.hdeDetallesAccion = false;
                    $scope.dsbDetalles = true;
                    $scope.despl3 = false;
                    $scope.hdeDetallesAccionSeg = true;
                    $scope.dsbDetallesSegInst = true;
                    /////
                    $scope.hdeImpugnacion = false;
                    $scope.dsbImpugnacion = true;
                    $scope.despl4 = false;

                    $scope.hdeCumplimiento = false;
                    $scope.hdecumpli = false;// Cumplimiento Mensual
                    //
                    $scope.despl5 = true;
                    if ($scope.registro.status = "5") {
                      $scope.hdefallo = true;
                    } else {
                      $scope.hdefallo = false;
                      // Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
                    }
                    //
                    $scope.archivoproincdesres = '';
                    $("#FechaReqPro").val('');
                    // SET VALORES VACIOS RESPUESTA ADMISION INC CNVU 13/12/2019
                    $scope.registro.medioRecepcionRespuestaInc = false;
                    $scope.changeMedida("11");
                    // $("#dteMedioRecepcionRespuestaInc").val('');
                    $scope.Medioarchivoproincdesres = '';
                    //
                    $scope.hdeIncidentes = false;
                    $scope.despl6 = true;
                    //
                    $scope.selec_inci = $scope.tabselect;
                    $scope.tabselect = parseInt($scope.tabselect) + 1;
                    $scope.vertab($scope.tabselect);
                    $scope.csstab($scope.tabselect);
                    //
                    setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1000); }, 500);
                  } else {
                    swal('Error', response.data.observacion_err, 'warning')
                  }
                });
              } else {
                swal('Error', response.data.observacion_err, 'warning')
              }
            });
          }
        })
      }

      $scope.registrafalloincidente = function () {
        if ($("#FechaFalInc").val() == "") {
          swal('Información', 'Ingrese la fecha de radicación', 'info');
        } else if ($scope.registro.medioRecepcionDecisionInc == true && document.getElementById("medioRecepcionDecisionIncAdjunto").files.length == 0) {
          swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        } else {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar los campos de fallo de incidente de desacato?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'PID03',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  type: $scope.archivofalincdesext,
                  file: $scope.archivofalincdes,
                  fecha_fallincdes: $("#FechaFalInc").val(),
                  typefile: '11',
                  ori: true,
                  sancionar_decision: $scope.registro.chkDecisionInci_Sancionar ? 'S' : 'N'
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  // REGISTRA MEDIO RECEPCION DECISION INC ADJUNTO CNVU 13/12/2019
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'GMREC',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      type: $scope.registro.medioRecepcionDecisionInc == false ? "" : $scope.archivoDecisionIncext,
                      file: $scope.registro.medioRecepcionDecisionInc == false ? "" : $scope.archivoDecisionInc,
                      fecha_reqpre: $("#FechaFalInc").val(),
                      typefile: '37',
                      medio: ($scope.registro.medioRecepcionDecisionInc == true) ? true : false,
                      ori: ($scope.registro.medioRecepcionDecisionInc == true) ? true : false
                    }
                  }).then(function (response) {
                    $scope.btn.GuardaRegistro = false;
                    if (response.data.codigo == "1") {
                      swal('Completado', response.data.observacion_err, 'success');
                      //
                      $scope.hdeVBrespuestatutela = true;
                      $scope.hdeDetallesAccion = false;
                      $scope.dsbDetalles = true;
                      $scope.despl3 = false;
                      $scope.hdeDetallesAccionSeg = true;
                      $scope.dsbDetallesSegInst = true;
                      /////
                      $scope.hdeImpugnacion = false;
                      $scope.dsbImpugnacion = true;
                      $scope.despl4 = false;

                      $scope.hdeCumplimiento = false;
                      $scope.hdecumpli = false;// Cumplimiento Mensual
                      //
                      $scope.despl5 = true;
                      if ($scope.registro.status = "5") {
                        $scope.hdefallo = true;
                      } else {
                        $scope.hdefallo = false;
                        // Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
                      }
                      //
                      $scope.archivofallincdes = '';
                      $("#FechaFalInc").val('');
                      // SET VALORES VACIOS DECISION INC CNVU 13/12/2019
                      $scope.registro.medioRecepcionDecisionInc = false;
                      $scope.changeMedida("12");
                      // $("#dteMedioRecepcionDecisionInc").val('');
                      $scope.Medioarchivofallincdes = '';
                      //
                      $scope.hdeIncidentes = false;
                      $scope.despl6 = true;
                      //
                      $scope.selec_inci = $scope.tabselect;
                      $scope.tabselect = parseInt($scope.tabselect) + 1;
                      $scope.vertab($scope.tabselect);
                      $scope.csstab($scope.tabselect);
                      //
                      setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1000); }, 500);
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          })
        }
      }

      $scope.registraconsultaincidente = function () {
        if ($("#FechaConInc").val() == "") {
          swal('Información', 'Ingrese la fecha de radicación', 'info');
        } else if ($scope.registro.medioRecepcionConsultaInc == true && document.getElementById("medioRecepcionConsultaIncAdjunto").files.length == 0) {
          swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        } else {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar los campos de consulta de incidente de desacato?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'PID04',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  type: $scope.archivoconincdesext,
                  file: $scope.archivoconincdes,
                  fecha_conincdes: $("#FechaConInc").val(),
                  typefile: '12',
                  ori: true
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  // REGISTRA MEDIO RECEPCION CONSULTA INC ADJUNTO CNVU 13/12/2019
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'GMREC',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      type: $scope.registro.medioRecepcionConsultaInc == false ? "" : $scope.archivoConsultaIncext,
                      file: $scope.registro.medioRecepcionConsultaInc == false ? "" : $scope.archivoConsultaInc,
                      fecha_reqpre: $("#FechaConInc").val(),
                      typefile: '38',
                      medio: ($scope.registro.medioRecepcionConsultaInc == true) ? true : false,
                      ori: ($scope.registro.medioRecepcionConsultaInc == true) ? true : false
                    }
                  }).then(function (response) {
                    $scope.btn.GuardaRegistro = false;
                    if (response.data.codigo == "1") {
                      swal('Completado', response.data.observacion_err, 'success');
                      //
                      $scope.hdeVBrespuestatutela = true;
                      $scope.hdeDetallesAccion = false;
                      $scope.dsbDetalles = true;
                      $scope.despl3 = false;
                      $scope.hdeDetallesAccionSeg = true;
                      $scope.dsbDetallesSegInst = true;
                      /////
                      $scope.hdeImpugnacion = false;
                      $scope.dsbImpugnacion = true;
                      $scope.despl4 = false;

                      $scope.hdeCumplimiento = false;
                      $scope.hdecumpli = false;// Cumplimiento Mensual
                      //
                      $scope.despl5 = true;
                      if ($scope.registro.status = "5") {
                        $scope.hdefallo = true;
                      } else {
                        $scope.hdefallo = false;
                        // Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
                      }
                      //
                      $scope.archivoconincdes = '';
                      $("#FechaConInc").val('');
                      // SET VALORES VACIOS CONSULTA INC CNVU 13/12/2019
                      $scope.registro.medioRecepcionConsultaInc = false;
                      $scope.changeMedida("13");
                      // $("#dteMedioRecepcionConsultaInc").val('');
                      $scope.Medioarchivoconincdes = '';
                      //
                      $scope.hdeIncidentes = false;
                      $scope.despl6 = true;
                      //
                      $scope.selec_inci = $scope.tabselect;
                      $scope.tabselect = parseInt($scope.tabselect) + 1;
                      $scope.vertab($scope.tabselect);
                      $scope.csstab($scope.tabselect);
                      //
                      setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1000); }, 500);
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          })
        }
      }

      $scope.registracierreincidente = function () {
        if ($("#FechaAutInc").val() == "") {
          swal('Información', 'Ingrese la fecha de radicación', 'info');
        } else if ($scope.registro.medioRecepcionCierreInc == true && document.getElementById("medioRecepcionCierreIncAdjunto").files.length == 0) {
          swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        } else {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar los campos de cierre de incidente de desacato?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'PID05',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  type: $scope.archivocieincdesext,
                  file: $scope.archivocieincdes,
                  fecha_cieincdes: $("#FechaAutInc").val(),
                  typefile: '13',
                  ori: true
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  // REGISTRA MEDIO RECEPCION CIERRE INC ADJUNTO CNVU 13/12/2019
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'GMREC',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      type: $scope.registro.medioRecepcionCierreInc == false ? "" : $scope.archivoCierreIncext,
                      file: $scope.registro.medioRecepcionCierreInc == false ? "" : $scope.archivoCierreInc,
                      fecha_reqpre: $("#FechaAutInc").val(),
                      typefile: '39',
                      medio: ($scope.registro.medioRecepcionCierreInc == true) ? true : false,
                      ori: ($scope.registro.medioRecepcionCierreInc == true) ? true : false
                    }
                  }).then(function (response) {
                    $scope.btn.GuardaRegistro = false;
                    if (response.data.codigo == "1") {
                      swal('Completado', response.data.observacion_err, 'success');
                      //
                      $scope.hdeVBrespuestatutela = true;
                      $scope.hdeDetallesAccion = false;
                      $scope.dsbDetalles = true;
                      $scope.despl3 = false;
                      $scope.hdeDetallesAccionSeg = true;
                      $scope.dsbDetallesSegInst = true;
                      /////
                      $scope.hdeImpugnacion = false;
                      $scope.dsbImpugnacion = true;
                      $scope.despl4 = false;

                      $scope.hdeCumplimiento = false;
                      $scope.hdecumpli = false;// Cumplimiento Mensual
                      //
                      $scope.despl5 = true;
                      if ($scope.registro.status = "5") {
                        $scope.hdefallo = true;
                      } else {
                        $scope.hdefallo = false;
                        // Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
                      }
                      //
                      $scope.archivocieincdes = '';
                      $("#FechaAutInc").val('');
                      // SET VALORES VACIOS CIERRE INC CNVU 13/12/2019
                      $scope.registro.medioRecepcionCierreInc = false;
                      $scope.changeMedida("14");
                      // $("#dteMedioRecepcionCierreInc").val('');
                      $scope.Medioarchivocieincdes = '';
                      //
                      $scope.hdeIncidentes = false;
                      $scope.despl6 = true;
                      //
                      $scope.selec_inci = 0;
                      $scope.tabselect = 1;
                      $scope.vertab($scope.tabselect);
                      $scope.csstab($scope.tabselect);
                      $scope.registro.desacato = parseInt($scope.registro.desacato) + 1;
                      //
                      setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1000); }, 500);
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          })
        }
      }

      $scope.vertab = function (value) {
        if (value < (parseInt($scope.selec_inci) + 1)) {
          return
        }
        if (isNaN(value)) {
          value = 1;
        }
        $scope.tabselect = value;
        $('.steps').removeClass('active');
        for (let i = 1; i <= value; i++) {
          $("#paso" + i).addClass('active');
        }
        //for (var i = (parseInt($scope.selec_inci) + 1); i <= 7; i++) {
        // $("#paso" + (parseInt(i) + 1)).css('cursor', 'pointer');
        //}
        // }
      }
      $scope.csstab = function (value) {
        // $('.steps').css('cursor', 'not-allowed');
        $('.steps').removeClass('pulsate');
        for (var i = value; i <= 7; i++) {
          if (i == value) {
            $("#paso" + i).addClass('pulsate');
          }
          // $("#paso" + i).css('cursor', 'pointer');
        }
      }

      $scope.vertab_nul = function (value) {
        if (isNaN(value)) {
          value = 1;
        }
        $scope.tabselect_nul = value;
        $('.steps').removeClass('active');
        for (let i = 1; i <= value; i++) {
          $("#paso_nul" + i).addClass('active');
        }
      }
      $scope.csstab_nul = function (value) {
        $('.steps').removeClass('pulsate');
        for (var i = value; i <= 7; i++) {
          if (i == value) {
            $("#paso_nul" + i).addClass('pulsate');
          }
        }
      }

      //VALIDACION PLAZO INFERIOR A 0 CNVU 02/12/2019
      $scope.formatNumberFalloAc = function () {
        if ($scope.registro.plazofalloac != "" || $scope.registro.plazofalloac != undefined || $scope.registro.plazofalloac != null) {
          $scope.registro.plazofalloac = $scope.registro.plazofalloac.replace(/[^0-9]+$/, '');
        }
      }

      //VALIDACION PLAZO INFERIOR A 0 CNVU 02/12/2019
      $scope.formatNumberFallo = function () {
        if ($scope.detalles.plazofallo != "" || $scope.detalles.plazofallo != undefined || $scope.detalles.plazofallo != null) {
          $scope.detalles.plazofallo = $scope.detalles.plazofallo.replace(/[^0-9]+$/, '');
        }
      }

      //FUNCION PARA VALIDAR CAMPO FECHA CNVU
      $scope.validaFechas = function (id, texto) {
        if ($("#dteFechaRecepcion").val() != "" || $("#dteFechaRecepcion").val() != null || $("#dteFechaRecepcion").val() != undefined) {
          if ($scope.Validar_Fecha($("#dteFechaRecepcion").val()) == 'si') {
            var fecha_id = $("#" + id).val().split("/");
            var fecha_tutelacreacion = $scope.registro.f_recepcion.split("/");

            var newdateftutela = new Date(fecha_tutelacreacion[2], (fecha_tutelacreacion[1] - 1), fecha_tutelacreacion[0]);
            var timeftutela = newdateftutela.getTime();

            var newdateinput = new Date(fecha_id[2], (fecha_id[1] - 1), fecha_id[0]);
            var timeinput = newdateinput.getTime();

            var fecha_actual = new Date();
            var time_actual = fecha_actual.getTime();
            if (id == 'dteFechaRecepcionRespuesta' || id == 'FechaReqPreRes' || id == 'FechaReqProRes') {
              if (timeinput < timeftutela) {
                swal({
                  title: '¡Información!',
                  text: 'La fecha de radicación de ' + texto + ' de Tutela no puede ser menor a la fecha de la Tutela.',
                  type: 'info',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#174791'
                });
                $scope.btn.GuardaRegistro = false;
              } else if (timeinput > time_actual) {
                swal({
                  title: '¡Información!',
                  text: 'La fecha de radicación de ' + texto + ' de Tutela no puede ser mayor a la fecha de hoy.',
                  type: 'info',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#174791'
                });
                $scope.btn.GuardaRegistro = false;
              }
            } else {
              if (timeinput <= timeftutela) {
                swal({
                  title: '¡Información!',
                  text: 'La fecha de radicación de ' + texto + ' de Tutela no puede ser menor o igual a la fecha de la Tutela.',
                  type: 'info',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#174791'
                });
                $scope.btn.GuardaRegistro = false;
              } else if (timeinput > time_actual) {
                swal({
                  title: '¡Información!',
                  text: 'La fecha de radicación de ' + texto + ' de Tutela no puede ser mayor a la fecha de hoy.',
                  type: 'info',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#174791'
                });
                $scope.btn.GuardaRegistro = false;
              }
            }
          }
        }
      };

      $('input.datepicker').kendoDatePicker({
        format: "dd/MM/yyyy",
        culture: "es-MX",
        disableDates: ["su", "sa"],
        max: new Date(),
      });

      $scope.openPanelAdjuntos = function () {
        ngDialog.open({
          template: 'views/juridica/modal/modalAdjuntos.html',
          className: 'ngdialog-theme-plain',
          controller: 'paneladjuntosctrl',
          scope: $scope
        });
      }
      $scope.openPanelVb = function () {
        ngDialog.open({
          template: 'views/juridica/modal/modalVistoBueno.html',
          className: 'ngdialog-theme-plain',
          controller: 'panelvbctrl',
          height: '90%',
          showClose: false,
          scope: $scope
        });
      }


      $scope.Validar_Fecha = function (v_fecha) {
        var expreg = new RegExp("^(([0]{1}[1-9]{1})|([1-2]{1}[0-9]{1})|([3]{1}[0-1]{1}))\/(([0]{1}[1-9]{1})|([1]{1}[0-2]{1}))\/([1-2]{1}[0-9]{3})$");
        if (expreg.test(v_fecha)) {
          return 'si'
        } else {
          return 'no'
        }

      }

      $scope.Limpiar_Inputs_Files = function () {
        // Respuesta de Tutela
        $("#admisiontutela")[0].value = "";
        $("#medioRecepcionAdmisionTutAdjunto")[0].value = "";

        // Respuesta de Tutela
        $("#recibidorespuestatutela")[0].value = "";
        $("#medioRecepcionRespuestaAdjunto")[0].value = "";

        //Detalles de Acción de Tutela
        $("#fallotutela")[0].value = "";
        $("#medioRecepcionFalloAdjunto")[0].value = "";
        $("#archivoObservacionFallo")[0].value = "";

        // Acción de Tutela - Segunda Instancia
        $("#filefallotutelainstdos")[0].value = "";
        $("#medioRecepcionSegundaAdjunto")[0].value = "";

        // Impugnación de Tutela
        $("#archivoimpugnacion")[0].value = "";
        $("#medioRecepcionImpugnacionAdjunto")[0].value = "";
        $("#archivoObservacionImpugnacion")[0].value = "";

        // Cumplimiento
        $("#archivocumplimensual")[0].value = "";
        $("#medioRecepcionCumplimientoAdjunto")[0].value = "";

        // Fallo de Impugnación
        $("#falloimpugnacion")[0].value = "";
        $("#medioRecepcionFImpugnacionAdjunto")[0].value = "";

        // Requerimiento Previo
        $("#archivofechareqpre")[0].value = "";
        $("#medioRecepcionRqPrevioAdjunto")[0].value = "";

        // Respuesta de Requerimiento Previo
        $("#archivofechareqpreres")[0].value = "";
        $("#medioRecepcionRespuestaRqAdjunto")[0].value = "";

        // Admisión de Incidente de Desacato
        $("#archivofechreqpro")[0].value = "";
        $("#medioRecepcionAdmisionAdjunto")[0].value = "";

        // Respuesta de Incidente de Desacato
        $("#archivofechreqprores")[0].value = "";
        $("#medioRecepcionRespuestaIncAdjunto")[0].value = "";

        // Decisión de Incidente de Desacato
        $("#archivofalinc")[0].value = "";
        $("#medioRecepcionDecisionIncAdjunto")[0].value = "";

        // Consulta de Incidente
        $("#archivofechaconinc")[0].value = "";
        $("#medioRecepcionConsultaIncAdjunto")[0].value = "";

        // Cierre de Incidente
        $("#archivofechaautinc")[0].value = "";
        $("#medioRecepcionCierreIncAdjunto")[0].value = "";

        // ESTADO DE TUTELA CNVU CC ABRIL 2021
        $("#idarchivoEstadoTutela")[0].value = "";
        $("#medioEstadoTutelaAdjunto")[0].value = "";

        // Limpiar linea verde
        angular.forEach(document.querySelectorAll('.file-path'), function (i) {
          if (i.classList.contains('valid') == true) {
            i.classList.remove("valid");
            i.value = "";
          }
          // i.setAttribute("readonly", true);
        });


      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


      $scope.CargaTabsEtapas = function (etapa) {
        if (etapa == 3) {// Respuesta de Tutela
          $scope.hdeVBrespuestatutela = true;
          $scope.despl2 = false;
          //
          $scope.hdeDetallesAccion = false;
          $scope.dsbDetalles = false;
          $scope.despl3 = true;
          //Ocultar Etapas
          $scope.hdeDetallesAccionSeg = true;
          $scope.hdeImpugnacion = true;
          $scope.hdeCumplimiento = true;
          $scope.hdeIncidentes = true;
          //
          $scope.DesactivarBotonesAdjuntar();//Quitar botones
          // Activar boton ETAPA=2 de $scope.hdeAdjuntarFallo = false;
          $('#frmArchivoRespuestaTutela')[0].reset();
          setTimeout(function () { $scope.ActivarBotonesAdjuntar(2); }, 500);
        }

        // $scope.registraDetalles()
        if (etapa == 2) {// Detalles de Acción de Tutela
          $scope.hdeVBrespuestatutela = true;
          //
          $scope.hdeDetallesAccion = false;
          $scope.dsbDetalles = true;
          $scope.despl3 = false;
          //	//Ocultar Etapas
          $scope.hdeImpugnacion = false;
          $scope.hdeCumplimiento = true;
          $scope.hdeIncidentes = true;
          //
          $scope.DesactivarBotonesAdjuntar();//Quitar botones
          $scope.archivodetalletut = '';
          //DSB CAMPO FECHA FALLO CNVU 02/12/2019
          $("#dteFechaFallo+span").css({ "pointer-events": "none", "opacity": ".2" });
          if ($scope.detalles.fallotutela == true) {
            // setTimeout(function () { $(document).scrollTop($('#panelListado7').height() + 400); $scope.$apply(); }, 500);
            // $scope.despl1 = false;
            // $scope.despl2 = false;
            // $scope.despl7 = true;
            // $scope.hdeDetallesAccionSeg = false;
            // $scope.dsbDetallesSegInst = false;
            // Activar boton ETAPA=14 de $scope.hdeAdjuntarFalloSegInst = false;
            // setTimeout(function () { $scope.ActivarBotonesAdjuntar(14); }, 500);
            // } else {
            $scope.hdeImpugnacion = false;
            $scope.dsbImpugnacion = false;
            $scope.despl4 = true;
            $scope.hdeDetallesAccionSeg = true;
            $scope.dsbDetallesSegInst = true;
            // Activar boton ETAPA=4 de $scope.hdeAdjuntarImpugnacion = false;
            setTimeout(function () { $(document).scrollTop($('#panelListado4').height() + 400); $scope.$apply(); }, 500);
            setTimeout(function () { $scope.ActivarBotonesAdjuntar(4); }, 500);
          }
        }



        // $scope.registraDetallesInstDos()
        if (etapa == 14) {// Acción de Tutela - Segunda Instancia
          $scope.hdeVBrespuestatutela = true;
          $scope.hdeDetallesAccion = false;
          $scope.dsbDetalles = true;
          $scope.despl3 = false;
          $scope.hdeDetallesAccionSeg = true;
          $scope.dsbDetallesSegInst = true;
          $scope.filefallotutelainstdos = '';
          $scope.dsbDetallesSegInst = true;
          $scope.hdeImpugnacion = false;
          $scope.dsbImpugnacion = false;
          $scope.despl4 = true;
          $scope.hdeCumplimiento = true;
          $scope.hdeIncidentes = true;
          //
          $scope.DesactivarBotonesAdjuntar();
          // Activar boton ETAPA=4 de $scope.hdeAdjuntarImpugnacion = false;
          setTimeout(function () { $(document).scrollTop($('#panelListado7').height() + 700); $scope.$apply(); }, 800);
          setTimeout(function () { $scope.ActivarBotonesAdjuntar(4); }, 500);
        }



        // $scope.registraImpugnacion()
        if (etapa == 4) {// Impugnación de Tutela
          $scope.hdeVBrespuestatutela = true;
          $scope.hdeDetallesAccion = false;
          $scope.dsbDetalles = true;
          $scope.despl3 = false;
          $scope.hdeDetallesAccionSeg = true;
          $scope.dsbDetallesSegInst = true;
          /////
          $scope.hdeImpugnacion = false;
          $scope.dsbImpugnacion = true;
          $scope.despl4 = false;

          $scope.hdeCumplimiento = false;
          $scope.hdecumpli = false;// Cumplimiento Mensual
          //
          $scope.despl5 = true;
          $scope.DesactivarBotonesAdjuntar();
          if ($scope.detalles.impugnado == false) {
            $scope.hdefallo = true;
          } else {
            $scope.hdefallo = false;
            $scope.despl4 = true;
            // Activar boton ETAPA=6 de $scope.hdeAdjuntarFalloImpugnacion = false;
          }
          //
          $scope.hdeIncidentes = false;
          $scope.despl6 = true;
          $scope.selec_inci = 0;
          $scope.tabselect = 1;
          $(paso1).addClass('active');
          $(paso2).removeClass('active');
          $(paso3).removeClass('active');
          $(paso4).removeClass('active');
          $(paso5).removeClass('active');
          $(paso6).removeClass('active');
          $(paso7).removeClass('active');
          setTimeout(function () { $(document).scrollTop($('#panelListado6').height() + 1000); $scope.$apply(); }, 500);
          setTimeout(function () { $scope.ActivarBotonesAdjuntar(6); }, 500);
        }


        // $scope.registrafechafalloimpugnacion()
        if (etapa == 6) {// Fallo de Impugnación
          $scope.hdeVBrespuestatutela = true;
          $scope.hdeDetallesAccion = false;
          $scope.dsbDetalles = true;
          $scope.despl3 = false;
          $scope.hdeDetallesAccionSeg = true;
          $scope.dsbDetallesSegInst = true;
          /////
          $scope.hdeImpugnacion = false;
          $scope.dsbImpugnacion = true;
          $scope.despl4 = false;
          /////
          $scope.registro.status = "5";
          /////
          $scope.DesactivarBotonesAdjuntar();
          if ($scope.detalles.seguimiento == true) {
            $scope.hdeCumplimiento = false;
            $scope.hdecumpli = false;
            $scope.despl5 = true;
            $scope.hdefallo = true;
          }
          if ($scope.detalles.seguimiento == false) {
            $scope.hdeCumplimiento = true;
          }
          $("#FechaFallImp").val('');
          $scope.hdeIncidentes = false;
          $scope.despl6 = true;

          $scope.hdeIncidentes = false;
          $scope.despl6 = true;
          $scope.selec_inci = 0;
          $scope.tabselect = 1;
          $(paso1).addClass('active');
          $(paso2).removeClass('active');
          $(paso3).removeClass('active');
          $(paso4).removeClass('active');
          $(paso5).removeClass('active');
          $(paso6).removeClass('active');
          $(paso7).removeClass('active');
        }


        if (parseInt($scope.registro.anioconsecutivo) < 2018 || $scope.registro.diferenteepsAdmisionTut == true) {//-- VALIDAR TAMBIEN QUE SEAN DE OTRAS EPS
          $scope.BuscarOmitirEtapasTut();//Buscar Etapas para habilitar
        } else {
          $scope.hdebtnOmitirEtapas = false;
        }
      }

      $scope.ActivarBotonesAdjuntar = function (etapa) {
        $scope.DesactivarBotonesAdjuntar();
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'BuscarOmitirEtapasTut',
            codigotutela: $scope.registro.codigotutela
          }
        }).then(function (response) {
          // console.log('Etapa-ActivarBotonesAdjuntar: ' + etapa)
          if (etapa == 14) {
            if ($scope.detalles.fallotutela == false) {
              etapa = 4;
            }
          }
          var Array_Response = response.data;
          Array_Response.forEach(element => {
            if (etapa == element.id) {
              if (element.exist == 0) {
                if (etapa == 3) {
                  $scope.hdeAdjuntarRespuesta = false; // Boton Enviar Etapa=3
                }
                if (etapa == 2) {
                  $scope.hdeAdjuntarFallo = false; // Boton Enviar Etapa=2
                }
                if (etapa == 14) {
                  $scope.hdeAdjuntarFalloSegInst = false; // Boton Enviar Etapa=14
                }
                if (etapa == 4) {
                  $scope.hdeAdjuntarImpugnacion = false; // Boton Enviar Etapa=4
                }
                if (etapa == 6) {
                  $scope.hdeAdjuntarFalloImpugnacion = false; // Boton Enviar Etapa=6
                }
              }
              if (element.exist == 1) {
                // if (etapa == 3) {
                // 	$scope.shwBtnOmitirDetalle = true; // Boton Enviar Etapa=3
                // }
                if (etapa == 2) {
                  $scope.shwBtnOmitirDetalle = true; // Boton Enviar Etapa=2
                  $scope.dsbDetalles = true;
                }
                if (etapa == 14) {
                  $scope.shwBtnOmitirFalloSegInst = true; // Boton Enviar Etapa=14
                }
                if (etapa == 4) {
                  $scope.shwBtnOmitirImpugnacion = true; // Boton Enviar Etapa=4
                  $scope.dsbImpugnacion = true;
                }
                if (etapa == 6) {
                  $scope.shwBtnOmitirFalloImpugnacion = true; // Boton Enviar Etapa=6
                  $scope.hdefallo = true;
                }
              }
            }
          });
        });
      }
      $scope.DesactivarBotonesAdjuntar = function () {
        $scope.hdeAdjuntarRespuesta = true; // Boton Enviar Etapa=3
        $scope.hdeAdjuntarFallo = true; // Boton Enviar Etapa=2
        $scope.hdeAdjuntarFalloSegInst = true; // Boton Enviar Etapa=14
        $scope.hdeAdjuntarImpugnacion = true; // Boton Enviar Etapa=4
        $scope.hdeAdjuntarFalloImpugnacion = true; // Boton Enviar Etapa=6
        //
        $scope.shwBtnOmitirDetalle = false; // Boton Enviar Etapa=2
        $scope.shwBtnOmitirFalloSegInst = false; // Boton Enviar Etapa=14
        $scope.shwBtnOmitirImpugnacion = false; // Boton Enviar Etapa=4
        $scope.shwBtnOmitirFalloImpugnacion = false; // Boton Enviar Etapa=6

      }
      $scope.BuscarOmitirEtapasTut = function () {
        $scope.xArray = [
          {
            id: 3,
            exist: 0,
            name: 'Respuesta de Tutela'
          },
          {
            id: 2,
            exist: 0,
            name: 'Detalles de Acción de Tutela - (Fallo de Tutela)'
          },
          // {
          // 	id: 14,
          // 	exist: 0,
          // 	name: 'Acción de Tutela - Segunda Instancia'
          // },
          {
            id: 4,
            exist: 0,
            name: 'Impugnación de Tutela'
          },
          {
            id: 5,
            exist: 0,
            name: 'Cumplimiento'
          },
          {
            id: 6,
            exist: 0,
            name: 'Fallo de Impugnación'
          },
          {
            id: 7,
            exist: 0,
            name: 'Proceso de Incidentes'
          }
        ]
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'BuscarOmitirEtapasTut',
            codigotutela: $scope.registro.codigotutela
          }
        }).then(function (response) {
          // console.log(response.data);
          var Array_Response = response.data;
          $scope.xArray.forEach(element => {
            Array_Response.forEach(element2 => {
              if (element.id == element2.id) {
                element.exist = element2.exist;
              }
            });
          });
          // console.log($scope.xArray);
          var Encontrar_Faltantes = 0;
          $scope.xArray.forEach(element => {
            if (element.exist == 0) {
              Encontrar_Faltantes++;
            }
          });
          // console.log(Encontrar_Faltantes);
          if (Encontrar_Faltantes <= 2) {
            $scope.hdebtnOmitirEtapas = false;
          } else {
            $scope.hdebtnOmitirEtapas = true;
          }
        });
      }

      ////////////////////////////////////////
      $scope.OmitirEtapasTut = function () {
        var options = {};
        $.map($scope.xArray,
          function (o) {
            if (o.exist == 0) {
              options[o.id] = o.name;
            }
          });
        // console.log(options);
        swal({
          title: 'Seleccione la etapa a Elegir',
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
        }).then(function (result) {

          if (result) {
            $scope.DesactivarEtapasTut();

            setTimeout(function () {
              $scope.ActivarEtapaTut(result);
              $scope.$apply();
            }, 1000);
          }

        }).catch(swal.noop);
      }

      $scope.DesactivarEtapasTut = function () {
        $scope.hdeVBrespuestatutela = true;// Hoja de respuesta
        // $scope.hdeAdjuntarRespuesta = true; // Boton Enviar
        $scope.despl2 = false; // Desplegar
        ///////////////////////////////////////
        $scope.dsbDetalles = true;// Hoja de Detalle de accion
        $scope.hdeDetallesAccion = true;// Hoja de Detalle de accion
        // $scope.hdeAdjuntarFallo = true; // Boton Enviar
        $scope.despl3 = false; // Desplegar
        ///////////////////////////////////////
        $scope.dsbDetallesSegInst = true;// Hoja Segunda Instancia
        $scope.hdeDetallesAccionSeg = true;// Hoja Segunda Instancia
        // $scope.hdeAdjuntarFalloSegInst = true; // Boton Enviar
        $scope.despl7 = false; // Desplegar
        ///////////////////////////////////////
        $scope.dsbImpugnacion = true;// Hoja Principal Impugnación
        $scope.hdeImpugnacion = true;// Hoja Principal Impugnación
        // $scope.hdeAdjuntarImpugnacion = true; // Boton Enviar
        $scope.despl4 = false; // Desplegar
        // 1167767
        ///////////////////////////////////////
        $scope.hdeCumplimiento = true;// Hoja Principal Impugnación
        $scope.despl5 = false; // Desplegar
        $scope.hdecumpli = true;// Cumplimiento Mensual
        $scope.hdefallo = true;// Fallo de Impugnacion
        // $scope.hdeAdjuntarFalloImpugnacion = true; // Boton Enviar
        ///////////////////////////////////////
        $scope.hdeIncidentes = true;// Hoja Principal Impugnación
        $scope.despl6 = false; // Desplegar
      }
      $scope.ActivarEtapaTut = function (etapa) {
        if (etapa == 3) {// Respuesta de Tutela
          $scope.hdeVBrespuestatutela = false;// Hoja de respuesta
          // $scope.hdeAdjuntarRespuesta = true; // Boton Enviar
          $scope.despl2 = true; // Desplegar
          $scope.ActivarBotonesAdjuntar(etapa);
        }
        if (etapa == 2) {// Detalles de Acción de Tutela
          $scope.dsbDetalles = false;// Hoja de Detalle de accion
          $scope.hdeDetallesAccion = false;// Hoja de Detalle de accion
          // $scope.hdeAdjuntarFallo = false; // Boton Enviar
          $scope.despl3 = true; // Desplegar
          $scope.ActivarBotonesAdjuntar(etapa);
        }
        if (etapa == 14) {// Acción de Tutela - Segunda Instancia
          $scope.dsbDetallesSegInst = false;// Hoja Segunda Instancia
          $scope.hdeDetallesAccionSeg = false;// Hoja Segunda Instancia
          // $scope.hdeAdjuntarFalloSegInst = false; // Boton Enviar
          $scope.despl7 = true; // Desplegar
          $scope.ActivarBotonesAdjuntar(etapa);
        }
        if (etapa == 4) {// Impugnación de Tutela
          $scope.dsbImpugnacion = false;// Hoja Principal Impugnación
          $scope.hdeImpugnacion = false;// Hoja Principal Impugnación
          // $scope.hdeAdjuntarImpugnacion = false; // Boton Enviar
          $scope.despl4 = true; // Desplegar
          $scope.ActivarBotonesAdjuntar(etapa);
        }
        if (etapa == 5) {// Cumplimiento
          $scope.hdeCumplimiento = false;// Hoja Principal Impugnación
          $scope.hdecumpli = false;// Cumplimiento Mensual
          $scope.despl5 = true; // Desplegar
        }
        if (etapa == 6) {// Fallo de Impugnación
          $scope.hdeCumplimiento = false;// Hoja Principal Impugnación
          $scope.hdefallo = false;// Fallo de Impugnacion
          $scope.despl4 = true;

          // $scope.hdeAdjuntarFalloImpugnacion = false; // Boton Enviar
          $scope.despl5 = true; // Desplegar
          $scope.ActivarBotonesAdjuntar(etapa);
        }
        if (etapa == 7) {// Proceso de Incidentes
          $scope.hdeIncidentes = false;// Hoja Principal Incidentes
          $scope.despl6 = true; // Desplegar
          $scope.selec_inci = 0;
          $scope.tabselect = 1;
          $scope.vertab($scope.tabselect);
          $scope.csstab($scope.tabselect);
        }
      }

      $scope.OmitirEtapa_SaltarEtapa = function (Etapa) {
        swal({
          title: 'Confirmar',
          text: "¿Desea omitir esta etapa?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            $http({
              method: 'POST',
              url: "php/juridica/tutelas/functutelas.php",
              data: {
                function: 'OmitirEtapa_SaltarEtapa',
                codigotutela: $scope.registro.codigotutela,
                etapa: Etapa
              }
            }).then(function (response) {
              // console.log(response.data);
              if (response.data) {
                if (response.data[0].Codigo == "1") {
                  $scope.CargaTabsEtapas(response.data[0].Etapa);
                } else {
                  swal('Error', response.data[0].Mensaje, 'warning');
                }
              } else {
                swal('Error', response.data[0].Mensaje, 'warning');
              }
            });
          }
        });
      }

      $scope.changeEstado = function (valor) {
        if (valor == true) {
          $scope.dialogEstado = ngDialog.open({
            template: 'views/juridica/modal/modalEstadoTutela.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalEstadoctrl',
            scope: $scope
          });
          $scope.dialogEstado.closePromise.then(function (data) {
            if (data.value != "$document") {

            }
          });
        }
      }

      // CNVU ELIMINA TUTELA 23/01/2020
      $scope.eliminartutela = function () {
        swal({
          title: 'Confirmar',
          text: "¿Desea eliminar esta tutela?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            $http({
              method: 'POST',
              url: "php/juridica/tutelas/functutelas.php",
              data: {
                function: 'EliminarTutela',
                codigotutela: $scope.registro.codigotutela,
                usucedula: $scope.cedulalog
              }
            }).then(function (response) {
              if (response.data[0].Codigo == "1") {
                swal('Completado', response.data[0].Mensaje, 'success');
                $scope.hdeRegistro = true;
                $scope.hdeVBrespuestatutela = true;
                $scope.hdeDetallesAccion = true;
                $scope.hdeDetallesAccionSeg = true;
                $scope.hdeImpugnacion = true;
                $scope.hdeCumplimiento = true;
                $scope.hdeIncidentes = true;
                $('#resultTutelas_filter input').val($scope.registro.codigotutela).trigger('keyup');
              } else {
                swal('Error', response.data[0].Mensaje, 'warning');
              }
            });
          }
        })
      };

      //CNVU CC ABRIL 2021
      $scope.abrirModal = function (modal) {
        if (modal == 1) {
          $('#modalEstadoTutela').modal('open');
          $scope.registro.estadoTutelaModal = false;
          $scope.observacionEstadoTutela = '';
          setTimeout(() => { $scope.$apply(); }, 500);
        }
        if (modal == 2) {
          $('#modalNulidad').modal('open');
          $scope.tiponulidad = false;
          $scope.declaracionnulidad = false;
          $scope.medioRecepcionNulidadParte = false;
          $scope.medioRecepcionDeclaracionNulidad = false;
          $scope.medioRecepcionNulidadOficio = false;
          // NULIDAD
          $("#fechaNulidadParte").val('');
          $scope.archivoNulidadParte = '';
          $("#FechaDeclaracionNulidad").val('');
          $scope.archivoDeclaracionNulidad = '';
          $scope.tipoNulidad = false;
          $("#FechaNulidadOficio").val('');
          $scope.archivoNulidadOficionom = '';
        }
        if (modal == 3) {
          $('#modalHistoricoBitacora').modal('open');
          $scope.listarBitacoraSeguimiento();
        }
      };

      $scope.cerrarModal = function (valor) {
        switch (valor) {
          case '1':
            $('#modalEstadoTutela').modal('close');
            break;
          case '2':
            $('#modalNulidad').modal('close');
            break;
          case '3':
            $('#modalHistoricoBitacora').modal('close');
            break;
          default:
            break;
        }
      };

      $scope.registrarEstadoTutela = function () {
        if ($scope.registro.descripcionEstadoTutela == "" || $scope.registro.descripcionEstadoTutela == null ||
          $scope.registro.descripcionEstadoTutela == undefined) {
          swal('Información', 'Ingrese la descripción.', 'info');
        } else if ($scope.registro.medioRecepcionEstadoTutela == true && document.getElementById("medioEstadoTutelaAdjunto").files.length == 0) {
          swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        } else {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar el estado de la tutela?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'ET01',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  type: $scope.archivoEstadoTutelaExt,
                  file: $scope.archivoEstadoTutela,
                  observacion: $scope.registro.descripcionEstadoTutela,
                  // estado: $scope.registro.estadoTutelaModal == true ? 'A' : 'I',
                  estado: 'I',
                  fecha_estadotutela: today,//$("#FechaEstadoTutela").val(),
                  typefile: '40',
                  // typefile: $scope.registro.estadoTutelaModal == true ? '48' : '40',
                  ori: true
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  // REGISTRA MEDIO RECEPCION CIERRE INC ADJUNTO CNVU 13/12/2019
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'GMREC',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      type: $scope.registro.medioRecepcionEstadoTutela == false ? "" : $scope.archivoMedioEstadoTutelaExt,
                      file: $scope.registro.medioRecepcionEstadoTutela == false ? "" : $scope.archivoMedioEstadoTutela,
                      fecha_reqpre: $("#FechaEstadoTutela").val(),
                      typefile: '41',
                      // typefile: $scope.registro.estadoTutelaModal == true ? '49' : '41',
                      medio: ($scope.registro.medioRecepcionEstadoTutela == true) ? true : false,
                      ori: ($scope.registro.medioRecepcionEstadoTutela == true) ? true : false
                    }
                  }).then(function (response) {
                    $scope.btn.GuardaRegistro = false;
                    if (response.data.codigo == "1") {
                      swal('Completado', response.data.observacion_err, 'success');
                      $scope.btn.GuardaRegistro = false;
                      $scope.archivoEstadoTutelaNom = '';
                      // $("#FechaEstadoTutela").val('');
                      $scope.registro.medioRecepcionEstadoTutela = false;
                      $scope.registro.descripcionEstadoTutela = '';
                      $scope.changeMedida("16");
                      $scope.cerrarModal("1");
                      lisTutelas.ajax.reload();
                      $scope.archivoMedioEstadoTutelaNom = '';
                    } else {
                      swal('Error', response.data.observacion_err, 'warning');
                      $scope.btn.GuardaRegistro = false;
                      $scope.archivoEstadoTutelaNom = '';
                      $scope.registro.medioRecepcionEstadoTutela = false;
                      $scope.registro.descripcionEstadoTutela = '';
                      $scope.changeMedida("16");
                      $scope.archivoMedioEstadoTutelaNom = '';

                      setTimeout(() => { $scope.$apply(); }, 500);

                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning');
                  $scope.btn.GuardaRegistro = false;
                  $scope.archivoEstadoTutelaNom = '';
                  // $("#FechaEstadoTutela").val('');
                  $scope.registro.medioRecepcionEstadoTutela = false;
                  $scope.registro.descripcionEstadoTutela = '';
                  $scope.changeMedida("16");
                  $scope.archivoMedioEstadoTutelaNom = '';
                  $("#FechaEstadoTutela").val('');
                  document.querySelector("#archivoEstadoTutelaNom").value = '';
                  document.querySelector("#idarchivoEstadoTutela").value = '';
                  $scope.cerrarModal("1");

                }
              });
            }
          })
        }
      };

      $scope.registrarNulidad = function () {
        var validador = true;
        if ($scope.tiponulidad == false) {
          if ($("#fechaNulidadParte").val() == "" || document.getElementById("idarchivoNulidadParte").files.length == 0) {
            validador = false;
          }
          if ($scope.Validar_Fecha($scope.registro.f_recepcion) == 'si') {
            if ($scope.Validar_Fecha($("#fechaNulidadParte").val()) == 'si') {
              const fechaNulidadParte = $("#fechaNulidadParte").val().split("/");
              const fecha_tutelacreacion = $scope.registro.f_recepcion.split("/");

              const newdateftutelaparte = new Date(fecha_tutelacreacion[2], (fecha_tutelacreacion[1] - 1), fecha_tutelacreacion[0]);
              const timeftutelaparte = newdateftutelaparte.getTime();

              const newdateinputparte = new Date(fechaNulidadParte[2], (fechaNulidadParte[1] - 1), fechaNulidadParte[0]);
              const timeinputparte = newdateinputparte.getTime();

              if (timeinputparte <= timeftutelaparte) {
                swal({
                  title: '¡Información!',
                  text: 'La fecha de la Solicitud de Parte no puede ser menor o igual a la fecha de la Tutela.',
                  type: 'info',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#174791'
                });
                validador = false;
                return;
              }
            } else {
              swal({
                title: '¡Información!',
                text: 'La fecha de nulidad de parte no es valida.',
                type: 'info',
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#174791'
              });
              validador = false;
              return;
            }
          } else {
            swal({
              title: '¡Información!',
              text: 'La fecha de recepción de la Tutela no es valida.',
              type: 'info',
              confirmButtonText: 'Cerrar',
              confirmButtonColor: '#174791'
            });
            validador = false;
            return;
          }
          if ($scope.medioRecepcionNulidadParte == true) {
            if (document.getElementById("medioNulidadParteAdjunto").files.length == 0) {
              validador = false;
            }
          }
          if ($("#FechaDeclaracionNulidad").val() == "" || document.getElementById("idarchivoDeclaracionNulidad").files.length == 0) {
            validador = false;
          }
          if ($scope.medioRecepcionDeclaracionNulidad == true) {
            if (document.getElementById("medioDeclaracionNulidadAdjunto").files.length == 0) {
              validador = false;
            }
          }
          if ($scope.declaracionnulidad == true) {
            if ($scope.etapaNulidad == "" || $scope.etapaNulidad == null || $scope.etapaNulidad == undefined) {
              validador = false;
            }
          }
        } else {
          if ($("#FechaNulidadOficio").val() == "" || document.getElementById("idarchivoNulidadOficio").files.length == 0) {
            validador = false;
          }
          if ($scope.Validar_Fecha($scope.registro.f_recepcion) == 'si') {
            if ($scope.Validar_Fecha($("#FechaNulidadOficio").val()) == 'si') {
              const fechaNulidadOficio = $("#FechaNulidadOficio").val().split("/");
              const fecha_tutelacreacion = $scope.registro.f_recepcion.split("/");

              const newdateftutelaoficio = new Date(fecha_tutelacreacion[2], (fecha_tutelacreacion[1] - 1), fecha_tutelacreacion[0]);
              const timeftutelaoficio = newdateftutelaoficio.getTime();

              const newdateinputoficio = new Date(fechaNulidadOficio[2], (fechaNulidadOficio[1] - 1), fechaNulidadOficio[0]);
              const timeinputoficio = newdateinputoficio.getTime();

              if (timeinputoficio <= timeftutelaoficio) {
                swal({
                  title: '¡Información!',
                  text: 'La fecha de la Solicitud de Oficio no puede ser menor o igual a la fecha de la Tutela.',
                  type: 'info',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#174791'
                });
                validador = false;
                return;
              }
            } else {
              swal({
                title: '¡Información!',
                text: 'La fecha de nulidad de oficio no es valida.',
                type: 'info',
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#174791'
              });
              validador = false;
              return;
            }
          } else {
            swal({
              title: '¡Información!',
              text: 'La fecha de recepción de la Tutela no es valida.',
              type: 'info',
              confirmButtonText: 'Cerrar',
              confirmButtonColor: '#174791'
            });
            validador = false;
            return;
          }
          if ($scope.medioRecepcionNulidadOficio == true) {
            if (document.getElementById("medioNulidadOficioAdjunto").files.length == 0) {
              validador = false;
            }
          }
        }
        if (validador == true) {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar la nulidad de la tutela?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro_nul = true;
              $http({
                method: 'POST',
                url: "php/juridica/tutelas/functutelas.php",
                data: {
                  function: 'registraNulidad',
                  constutela: $scope.registro.codigotutela,
                  status: ($scope.tiponulidad == false) ? ($scope.declaracionnulidad == true ? $scope.etapaNulidad : '') : '1',
                  tipo_nulidad: $scope.tiponulidad == true ? 'O' : 'S',
                  declaracion_nulidad: ($scope.tiponulidad == false) ? ($scope.declaracionnulidad == true ? 'S' : 'N') : 'S',
                  responsable: $scope.cedulalog
                }
              }).then(function (response) {
                $scope.btn.GuardaRegistro_nul = false;
                if (response.data.codigo_err == "1") {
                  swal('Completado', response.data.observacion_err, 'success');
                  $scope.listaNulidades($scope.registro.codigotutela);
                  $scope.cerrarModal("2");
                  $scope.consnulidad = response.data.nulidad;
                  // $http({
                  // 	method: 'POST',
                  // 	url: "php/upload_file/upload_juridica.php",
                  // 	data: {
                  // 		db: 'GMREC',
                  // 		path: 'Juridica/Tutelas',
                  // 		constutela: $scope.registro.codigotutela,
                  // 		type: $scope.tiponulidad == true ? $scope.archivoNulidadOficiobext : $scope.archivoNulidadSolicitudParteExt,
                  // 		file: $scope.tiponulidad == true ? $scope.archivoNulidadOficiob : $scope.archivoNulidadSolicitudParte,
                  // 		fecha_reqpre: $scope.tiponulidad == true ? $("#FechaNulidadOficio").val() : $("#fechaNulidadParte").val(),
                  // 		typefile: $scope.tiponulidad == false ? '42' : '46',
                  // 		medio: '',
                  // 		ori: true
                  // 	}
                  // }).then(function (response) {
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'IANUL',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      consnulidad: $scope.consnulidad,
                      responsable: $scope.cedulalog,
                      type: $scope.tiponulidad == true ? $scope.archivoNulidadOficiobext : $scope.archivoNulidadSolicitudParteExt,
                      file: $scope.tiponulidad == true ? $scope.archivoNulidadOficiob : $scope.archivoNulidadSolicitudParte,
                      fecha_recepcion: $scope.tiponulidad == true ? $("#FechaNulidadOficio").val() : $("#fechaNulidadParte").val(),
                      medio: '',
                      observacion: '',
                      typefile: $scope.tiponulidad == false ? '42' : '46',
                      impugnacion: '',
                      ori: true
                    }
                  }).then(function (response) {
                    $scope.btn.GuardaRegistro_nul = false;
                    if (response.data.codigo == "1") {
                      // REGISTRA MEDIO RECEPCION NULIDAD
                      // $http({
                      // 	method: 'POST',
                      // 	url: "php/upload_file/upload_juridica.php",
                      // 	data: {
                      // 		db: 'GMREC',
                      // 		path: 'Juridica/Tutelas',
                      // 		constutela: $scope.registro.codigotutela,
                      // 		type: $scope.tiponulidad == false ? ($scope.medioRecepcionNulidadParte == false ? "" : $scope.archivoMedioNulidadSolicitudParteExt) : ($scope.medioRecepcionNulidadOficio == true ? "" : $scope.archivoMedioNulidadOficiobext),
                      // 		file: $scope.tiponulidad == false ? ($scope.medioRecepcionNulidadParte == false ? "" : $scope.archivoMedioNulidadSolicitudParte) : ($scope.medioRecepcionNulidadOficio == true ? "" : $scope.archivoMedioNulidadOficiob),
                      // 		fecha_reqpre: "",
                      // 		typefile: $scope.tiponulidad == false ? "43" : "47",
                      // 		medio: $scope.tiponulidad == false ? ($scope.medioRecepcionNulidadParte == true ? true : false) : ($scope.medioRecepcionNulidadOficio == true ? true : false),
                      // 		ori: $scope.tiponulidad == false ? ($scope.medioRecepcionNulidadParte == true ? true : false) : ($scope.medioRecepcionNulidadOficio == true ? true : false)
                      // 	}
                      // }).then(function (response) {
                      $http({
                        method: 'POST',
                        url: "php/upload_file/upload_juridica.php",
                        data: {
                          db: 'IANUL',
                          path: 'Juridica/Tutelas',
                          constutela: $scope.registro.codigotutela,
                          ubicacion: $scope.registro.ubicacion,
                          consnulidad: $scope.consnulidad,
                          responsable: $scope.cedulalog,
                          type: $scope.tiponulidad == false ? ($scope.medioRecepcionNulidadParte == false ? "" : $scope.archivoMedioNulidadSolicitudParteExt) : ($scope.medioRecepcionNulidadOficio == false ? "" : $scope.archivoMedioNulidadOficiobext),
                          file: $scope.tiponulidad == false ? ($scope.medioRecepcionNulidadParte == false ? "" : $scope.archivoMedioNulidadSolicitudParte) : ($scope.medioRecepcionNulidadOficio == false ? "" : $scope.archivoMedioNulidadOficiob),
                          fecha_recepcion: '',
                          medio: '',
                          observacion: '',
                          typefile: $scope.tiponulidad == false ? "43" : "47",
                          impugnacion: '',
                          ori: $scope.tiponulidad == false ? ($scope.medioRecepcionNulidadParte == true ? true : false) : ($scope.medioRecepcionNulidadOficio == true ? true : false)
                        }
                      }).then(function (response) {
                        $scope.btn.GuardaRegistro_nul = false;
                        if (response.data.codigo == "1") {
                          if ($scope.tiponulidad == false) {
                            // $http({
                            // 	method: 'POST',
                            // 	url: "php/upload_file/upload_juridica.php",
                            // 	data: {
                            // 		db: 'GMREC',
                            // 		path: 'Juridica/Tutelas',
                            // 		constutela: $scope.registro.codigotutela,
                            // 		type: $scope.archivoDeclaracionNulidadext,
                            // 		file: $scope.archivoDeclaracionNulidadb64,
                            // 		fecha_reqpre: $("#FechaDeclaracionNulidad").val(),
                            // 		typefile: $scope.tiponulidad == false ? '42' : '46',
                            // 		medio: '',
                            // 		ori: true
                            // 	}
                            // }).then(function (response) {
                            $http({
                              method: 'POST',
                              url: "php/upload_file/upload_juridica.php",
                              data: {
                                db: 'IANUL',
                                path: 'Juridica/Tutelas',
                                constutela: $scope.registro.codigotutela,
                                ubicacion: $scope.registro.ubicacion,
                                consnulidad: $scope.consnulidad,
                                responsable: $scope.cedulalog,
                                type: $scope.archivoDeclaracionNulidadext,
                                file: $scope.archivoDeclaracionNulidadb64,
                                fecha_recepcion: $("#FechaDeclaracionNulidad").val(),
                                medio: '',
                                observacion: '',
                                typefile: '44',
                                impugnacion: '',
                                ori: true
                              }
                            }).then(function (response) {
                              $scope.btn.GuardaRegistro_nul = false;
                              if (response.data.codigo == "1") {
                                // $http({
                                // 	method: 'POST',
                                // 	url: "php/upload_file/upload_juridica.php",
                                // 	data: {
                                // 		db: 'GMREC',
                                // 		path: 'Juridica/Tutelas',
                                // 		constutela: $scope.registro.codigotutela,
                                // 		type: $scope.medioRecepcionDeclaracionNulidad == false ? "" : $scope.archivoMedioDeclaracionNulidadext,
                                // 		file: $scope.medioRecepcionDeclaracionNulidad == false ? "" : $scope.archivoMedioDeclaracionNulidad,
                                // 		fecha_reqpre: "",
                                // 		typefile: "45",
                                // 		medio: $scope.medioRecepcionNulidadParte == true ? true : false,
                                // 		ori: $scope.medioRecepcionNulidadParte == true ? true : false
                                // 	}
                                // }).then(function (response) {
                                $http({
                                  method: 'POST',
                                  url: "php/upload_file/upload_juridica.php",
                                  data: {
                                    db: 'IANUL',
                                    path: 'Juridica/Tutelas',
                                    constutela: $scope.registro.codigotutela,
                                    ubicacion: $scope.registro.ubicacion,
                                    consnulidad: $scope.consnulidad,
                                    responsable: $scope.cedulalog,
                                    type: $scope.medioRecepcionDeclaracionNulidad == false ? "" : $scope.archivoMedioDeclaracionNulidadext,
                                    file: $scope.medioRecepcionDeclaracionNulidad == false ? "" : $scope.archivoMedioDeclaracionNulidad,
                                    fecha_recepcion: '',
                                    medio: $scope.medioRecepcionNulidadParte == true ? true : false,
                                    observacion: '',
                                    typefile: "45",
                                    impugnacion: '',
                                    ori: $scope.medioRecepcionNulidadParte == true ? true : false
                                  }
                                }).then(function (response) {
                                  $scope.btn.GuardaRegistro_nul = false;
                                  if (response.data.codigo == '1') {
                                    $scope.btn.GuardaRegistro_nul = false;
                                    $scope.limpiarNulidad();
                                  } else {
                                    swal('Error', response.data.observacion_err, 'warning');
                                    $scope.btn.GuardaRegistro_nul = false;
                                  }
                                });
                              } else {
                                swal('Error', response.data.observacion_err, 'warning');
                                $scope.btn.GuardaRegistro_nul = false;
                              }
                            });
                          }
                          $scope.limpiarNulidad();
                          $scope.btn.GuardaRegistro_nul = false;
                        } else {
                          swal('Error', response.data.observacion_err, 'warning');
                          $scope.btn.GuardaRegistro_nul = false;
                        }
                      });
                      $scope.btn.GuardaRegistro_nul = false;
                    } else {
                      swal('Error', response.data.observacion_err, 'warning');
                      $scope.btn.GuardaRegistro_nul = false;
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning');
                  $scope.btn.GuardaRegistro_nul = false;
                }
              });
            }
          })
        } else {
          swal('Información', 'Ingrese los campos.', 'info');
        }
      };

      $scope.tabs = {
        select: 1
      };
      $('.tabs').tabs();
      $scope.seleccionar = function (tab_numer) {
        $scope.tabs.select = tab_numer;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
        switch (tab_numer) {
          case 1:
            setTimeout(() => {
              document.querySelector("#tab_tutela").focus();
            }, 100);
            // if ($scope.cant_nulidades.length > 0) {
            // 	$scope.dsbRegistro = true;
            // 	$scope.dsbVBrespuestatutela = true;
            // 	$scope.dsbDetalles = true;
            // 	$scope.dsbImpugnacion = true;
            // 	$scope.dsbIncidentes = true;
            // }
            break;
          case 2:
            setTimeout(() => {
              document.querySelector("#tab_novedad").focus();
            }, 100);
            break;
        }
      };

      $scope.listaNulidades = function (codigo) {
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'listaNulidades',
            constutela: codigo
          }
        }).then(function (response) {
          $scope.cant_nulidades = response.data;
          if ($scope.cant_nulidades.length > 0) {
            $scope.dsbRegistro = true;
            $scope.hdeVBrespuestatutela = true;
            $scope.dsbDetalles = true;
            $scope.dsbImpugnacion = true;
            $scope.hdeCumplimiento = true;
            $scope.hdeIncidentes = true;
          }
        });
      };

      $scope.obtenerNulidad = function (codigo) {
        $scope.consnulidad = codigo;
        // $scope.statusNul = status;
        $scope.limpiarNulidad();
        $scope.registro_nul = null;
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'obtenerNulidad',
            constutela: $scope.registro.codigotutela,
            consnulidad: codigo
          }
        }).then(function (response) {
          $scope.registro_nul = response.data;
          $scope.registro_nul.medioRecepcionRespuesta = false;
          $scope.registro_nul.medioRecepcionFallo = false;
          $scope.registro_nul.medioRecepcionImpugnacion = false;
          $scope.registro_nul.medioRecepcionCumplimiento = false;
          $scope.registro_nul.medioRecepcionRqPrevio = false;
          $scope.registro_nul.medioRecepcionRespuestaRq = false;
          $scope.registro_nul.medioRecepcionAdmision = false;
          $scope.registro_nul.medioRecepcionRespuestaInc = false;
          $scope.registro_nul.medioRecepcionDecisionInc = false;
          $scope.registro_nul.medioRecepcionConsultaInc = false;
          $scope.registro_nul.medioRecepcionCierreInc = false;
          $scope.detalles_nul.fallotutela = $scope.registro_nul.fallo.fallotutela;
          $scope.detalles_nul.tratamientointegral = $scope.registro_nul.fallo.tratamiento_integral;
          $scope.detalles_nul.seguimiento = $scope.registro_nul.fallo.seguimiento;
          $scope.detalles_nul.impugnado = $scope.registro_nul.fallo.impugnado;
          $scope.detalles_nul.observacion_fallo = $scope.registro_nul.fallo.observacion_fallo;
          $('#dteFechaFallo_nul').val($scope.registro_nul.f_fallo);
          $('#dteFechaVencimientoFallo_nul').val($scope.registro_nul.f_fallo_plazo);
          $scope.detalles_nul.plazofallo = $scope.registro_nul.plazo_fallo;
          $scope.detalles_nul.observacion_impugnado = $scope.registro_nul.observacion_impugnado;
          $scope.hdefallo_nul = !$scope.registro_nul.fallo.impugnado;

          $scope.hdeRegistro_nul = true;
          $scope.dsbRegistro_nul = true;
          $scope.hdeGuardaTut_nul = true;
          $scope.btn.GuardaRegistro_nul = true;
          $scope.despl1_nul = false;
          $scope.hdeVBrespuestatutela_nul = true;
          $scope.dsbVBrespuestatutela_nul = true;
          $scope.hdeAdjuntarRespuesta_nul = true;
          $scope.btn.GuardaRegistro_nul = true;
          $scope.despl2_nul = false;
          $scope.hdeDetallesAccion_nul = true;
          $scope.dsbDetalles_nul = true;
          $scope.hdeAdjuntarFallo_nul = true;
          $scope.btn.GuardaRegistro_nul = true;
          $scope.despl3_nul = false;
          $scope.hdeImpugnacion_nul = true;
          $scope.dsbImpugnacion_nul = true;
          $scope.hdeAdjuntarImpugnacion_nul = true;
          $scope.btn.GuardaRegistro_nul = true;
          $scope.despl4_nul = false;
          $scope.hdeCumplimiento_nul = true;
          $scope.btn.GuardaRegistro_nul = true;
          $scope.despl5_nul = false;
          $scope.hdeIncidentes_nul = true;
          $scope.dsbIncidentes_nul = true;
          $scope.btn.GuardaRegistro_nul = true;
          $scope.despl6_nul = false;
          $("#dteFechaRecepcion_nul").val($scope.registro_nul.f_recepcion);
          $("#dteFechaVencimiento_nul").val($scope.registro_nul.f_vencimiento);
          $scope.changeMedida_nul("1");
          $("#dteFechaRecepcionMedida_nul").val($scope.registro_nul.fecha_recepcion_medida_prov);
          $("#dteFechaVencimientoMedida_nul").val($scope.registro_nul.fecha_vencimiento_medida_prov);
          if ($scope.registro_nul.status > 3) {
            $scope.hdeFechaFallo_nul = true;
            document.getElementById('checkfallotutela_nul').disabled = true;
            document.getElementById('medioRecepcionFallo_nul').disabled = true;
            document.getElementById('tratamientointegral_nul').disabled = true;
            document.getElementById('seguimiento_nul').disabled = true;
          } else {
            document.getElementById('checkfallotutela_nul').disabled = false;
            document.getElementById('medioRecepcionFallo_nul').disabled = false;
            document.getElementById('tratamientointegral_nul').disabled = false;
            document.getElementById('seguimiento_nul').disabled = false;
          }

          if ($scope.registro_nul.status > 4) {
            document.getElementById('checkimpugnado_nul').disabled = true;
            document.getElementById('medioRecepcionImpugnacion_nul').disabled = true;
          } else {
            document.getElementById('checkimpugnado_nul').disabled = false;
            document.getElementById('medioRecepcionImpugnacion_nul').disabled = false;
          }
          $scope.cant_nulidades.forEach(element => {
            if ($scope.registro_nul.consecutivo == element.consecutivo) {
              setTimeout(() => {
                if ($scope.registro_nul.status == "1") {
                  $scope.hdeRegistro_nul = false;
                  $scope.dsbRegistro_nul = false;
                  $scope.hdeGuardaTut_nul = false;
                  $scope.btn.GuardaRegistro_nul = false;
                  $scope.despl1_nul = true;
                }
                if ($scope.registro_nul.status == "2") {
                  $scope.archivoObsFalloTut_nul = '';
                  $scope.archivoObsFalloTut_nulext = '';
                  $scope.hdeVBrespuestatutela_nul = false;
                  $scope.dsbVBrespuestatutela_nul = false;
                  $scope.hdeAdjuntarRespuesta_nul = false;
                  $scope.btn.GuardaRegistro_nul = false;
                  $scope.despl2_nul = true;

                  $scope.hdeRegistro_nul = false;
                }
                if ($scope.registro_nul.status == "3") {
                  $scope.archivoObsImpugnacionTut_nul = '';
                  $scope.archivoObsImpugnacionTut_nulext = '';
                  $scope.hdeDetallesAccion_nul = false;
                  // $scope.dsbDetalles_nul = false;
                  $scope.hdeAdjuntarFallo_nul = false;
                  $scope.btn.GuardaRegistro_nul = false;
                  $scope.despl3_nul = true;

                  $scope.hdeRegistro_nul = false;
                }
                if ($scope.registro_nul.status == "4") {
                  $scope.hdeImpugnacion_nul = false;
                  $scope.dsbImpugnacion_nul = false;
                  $scope.hdeAdjuntarImpugnacion_nul = false;
                  $scope.btn.GuardaRegistro_nul = false;
                  $scope.despl4_nul = true;

                  $scope.hdeRegistro_nul = false;
                  $scope.hdeDetallesAccion_nul = false;
                }
                if ($scope.registro_nul.status == "5") {
                  $scope.hdeCumplimiento_nul = false;
                  $scope.btn.GuardaRegistro_nul = false;
                  $scope.despl5_nul = true;

                  $scope.hdeRegistro_nul = false;
                  $scope.hdeDetallesAccion_nul = false;
                  $scope.hdeImpugnacion_nul = false;
                  $scope.hdeIncidentes_nul = false;
                  $scope.dsbIncidentes_nul = false;
                  $scope.despl6_nul = true;
                  $scope.csstab_nul($scope.registro_nul.status_desacato);
                  $scope.vertab_nul($scope.registro_nul.status_desacato);
                  $scope.tabselect_nul = $scope.registro_nul.status_desacato;
                }
                if ($scope.registro_nul.status == "6") {
                  $scope.hdeIncidentes_nul = false;
                  $scope.dsbIncidentes_nul = false;
                  $scope.btn.GuardaRegistro_nul = false;
                  $scope.despl6_nul = true;
                  // $scope.hdefallo_nul = true;

                  $scope.hdeRegistro_nul = false;
                  $scope.hdeDetallesAccion_nul = false;
                  $scope.hdeImpugnacion_nul = false;
                  $scope.hdeCumplimiento_nul = false;
                  $scope.despl5_nul = true;
                  $scope.csstab_nul($scope.registro_nul.status_desacato);
                  $scope.vertab_nul($scope.registro_nul.status_desacato);
                  $scope.tabselect_nul = $scope.registro_nul.status_desacato;
                }
                $scope.$apply();
              }, 500);
            } else {
              setTimeout(() => {
                if ($scope.registro_nul.status == "1") {
                  $scope.hdeRegistro_nul = false;
                  $scope.dsbRegistro_nul = true;
                  $scope.hdeGuardaTut_nul = false;
                  $scope.btn.GuardaRegistro_nul = false;
                  $scope.despl1_nul = true;
                }
                if ($scope.registro_nul.status == "2") {
                  $scope.hdeVBrespuestatutela_nul = false;
                  $scope.dsbVBrespuestatutela_nul = true;
                  $scope.hdeAdjuntarRespuesta_nul = false;
                  $scope.btn.GuardaRegistro_nul = false;
                  $scope.despl2_nul = true;

                  $scope.hdeRegistro_nul = false;
                }
                if ($scope.registro_nul.status == "3") {
                  $scope.hdeDetallesAccion_nul = false;
                  $scope.dsbDetalles_nul = true;
                  $scope.hdeAdjuntarFallo_nul = false;
                  $scope.btn.GuardaRegistro_nul = false;
                  $scope.despl3_nul = true;

                  $scope.hdeRegistro_nul = false;
                }
                if ($scope.registro_nul.status == "4") {
                  $scope.hdeImpugnacion_nul = false;
                  $scope.dsbImpugnacion_nul = true;
                  $scope.hdeAdjuntarImpugnacion_nul = false;
                  $scope.btn.GuardaRegistro_nul = false;
                  $scope.despl4_nul = true;

                  $scope.hdeRegistro_nul = false;
                  $scope.hdeDetallesAccion_nul = false;
                }
                if ($scope.registro_nul.status == "5") {
                  $scope.hdeCumplimiento_nul = false;
                  $scope.btn.GuardaRegistro_nul = false;
                  $scope.despl5_nul = true;

                  $scope.hdeRegistro_nul = false;
                  $scope.hdeDetallesAccion_nul = false;
                  $scope.hdeImpugnacion_nul = false;
                }
                if ($scope.registro_nul.status == "6") {
                  $scope.hdeIncidentes_nul = false;
                  $scope.dsbIncidentes_nul = true;
                  $scope.btn.GuardaRegistro_nul = false;
                  $scope.despl6_nul = true;

                  $scope.hdeRegistro_nul = false;
                  $scope.hdeDetallesAccion_nul = false;
                  $scope.hdeImpugnacion_nul = false;
                  $scope.hdeCumplimiento_nul = false;
                  $scope.despl5_nul = true;
                  $scope.csstab_nul($scope.registro_nul.status_desacato);
                  $scope.vertab_nul($scope.registro_nul.status_desacato);
                  $scope.tabselect_nul = $scope.registro_nul.status_desacato;
                }
                $scope.$apply();
              }, 500);
            }
          });
        });
      };

      $scope.registraTutela_nul = function () {
        var validador = false;
        if ($("#dteFechaRecepcion_nul").val() == "" || $scope.registro_nul.plazo == null || $("#dteFechaVencimiento_nul").val() == "") {
          validador = true;
        }
        if ($scope.registro_nul.medidaprovisional == true) {
          if ($("#dteFechaRecepcionMedida_nul").val() == "" || $scope.registro_nul.plazo_medida_prov == null || $("#dteFechaVencimientoMedida_nul").val() == "") {
            validador = true;
          }
        }
        if (validador == false) {
          var datos = {
            fecha_recepcion: $scope.registro_nul.f_recepcion,
            plazo: $scope.registro_nul.plazo,
            medida_provisional: $scope.registro_nul.medidaprovisional == true ? 'S' : 'N',
            fecha_recepcion_prov: $scope.registro_nul.f_medida,
            plazo_prov: $scope.registro_nul.plazo_medida_prov
          }
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
              function: 'inserta_etapa_nulidad',
              constutela: $scope.registro.codigotutela,
              dataNulidad: JSON.stringify(datos),
              consnulidad: $scope.consnulidad,
              status: $scope.registro_nul.status
            }
          }).then(function (response) {
            if (response.data.codigo_err) {
              swal('Completado', response.data.observacion_err, 'success');
              setTimeout(() => {
                swal.close();
              }, 3000);
              $scope.obtenerNulidad($scope.registro_nul.consecutivo);
            } else {
              swal('Error', response.data.observacion_err, 'warning')
            }
          });
        } else {
          swal('Información', 'Por favor diligencie todos los campos.', 'info');
        }
      };

      $scope.adjuntaRecibidoTutela_nul = function () {
        var validador = false;
        if ($("#dteFechaRecepcionRespuesta_nul").val() == "" || document.getElementById("recibidorespuestatutela_nul").files.length == 0) {
          validador = true;
        }
        if ($scope.registro_nul.medioRecepcionRespuesta == true) {
          if (document.getElementById("medioRecepcionRespuestaAdjunto_nul").files.length == 0) {
            validador = true;
          }
        }
        if (validador == false) {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar la respuesta de la tutela?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'IANUL',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  consnulidad: $scope.consnulidad,
                  responsable: $scope.cedulalog,
                  type: $scope.respuestatutela_nulext,
                  file: $scope.respuestatutela_nul,
                  fecha_recepcion: $("#dteFechaRecepcionRespuesta_nul").val(),
                  medio: '',
                  observacion: '',
                  typefile: '3',
                  impugnacion: '',
                  ori: true
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'IANUL',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      consnulidad: $scope.consnulidad,
                      responsable: $scope.cedulalog,
                      type: $scope.registro_nul.medioRecepcionRespuesta == true ? $scope.respuestatutela_nulext : '',
                      file: $scope.registro_nul.medioRecepcionRespuesta == true ? $scope.respuestatutela_nul : '',
                      fecha_recepcion: "",
                      medio: $scope.registro_nul.medioRecepcionRespuesta == true ? 'S' : 'N',
                      observacion: '',
                      typefile: '26',
                      impugnacion: '',
                      ori: $scope.registro_nul.medioRecepcionRespuesta == true ? true : false
                    }
                  }).then(function (response) {
                    swal('Completado', response.data.observacion_err, 'success');
                    setTimeout(() => {
                      swal.close();
                    }, 3000);
                    $scope.obtenerNulidad($scope.registro_nul.consecutivo);
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          });
        } else {
          swal('Información', 'Por favor diligencie todos los campos.', 'info');
        }
      }

      $scope.registraDetalles_nul = function () {
        var validador = false;
        if ($("#dteFechaFallo_nul").val() == "" || document.getElementById("fallotutela_nul").files.length == 0
          || $scope.detalles_nul.plazofallo == "" || $("#dteFechaVencimientoFallo_nul").val() == "") {
          validador = true;
        }
        if ($scope.detalles_nul.fallotutela == false) {
          if ($scope.detalles_nul.tratamientointegral == undefined) {
            validador = true;
          }
          if ($scope.detalles_nul.seguimiento == undefined) {
            validador = true;
          }
        }
        if ($scope.registro_nul.medioRecepcionFallo == true) {
          if (document.getElementById("medioRecepcionFalloAdjunto_nul").files.length == 0) {
            validador = true;
          }
        }
        if (validador == false) {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar el fallo de la tutela?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              var datos = {
                fallo_tutela: $scope.detalles_nul.fallotutela == true ? 'A' : 'C',
                fecha_fallo: $scope.detalles_nul.f_fallo,
                plazo: $scope.detalles_nul.plazofallo,
                tratamiento_integral: $scope.detalles_nul.tratamientointegral == true ? 'S' : 'N',
                seguimiento_continuo: $scope.detalles_nul.tratamientointegral == true ? 'S' : 'N',
              }
              $http({
                method: 'POST',
                url: "php/juridica/tutelas/functutelas.php",
                data: {
                  function: 'inserta_etapa_nulidad',
                  constutela: $scope.registro.codigotutela,
                  dataNulidad: JSON.stringify(datos),
                  consnulidad: $scope.consnulidad,
                  status: $scope.registro_nul.status
                }
              }).then(function (response) {
                if (response.data.codigo_err == "1") {
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'IANUL',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      consnulidad: $scope.consnulidad,
                      responsable: $scope.cedulalog,
                      type: $scope.archivoFalloTut_nulext,
                      file: $scope.archivoFalloTut_nul,
                      fecha_recepcion: '',
                      medio: '',
                      observacion: '',
                      typefile: '2',
                      impugnacion: '',
                      ori: true
                    }
                  }).then(function (response) {
                    if (response.data.codigo == "1") {
                      $http({
                        method: 'POST',
                        url: "php/upload_file/upload_juridica.php",
                        data: {
                          db: 'IANUL',
                          path: 'Juridica/Tutelas',
                          constutela: $scope.registro.codigotutela,
                          ubicacion: $scope.registro.ubicacion,
                          consnulidad: $scope.consnulidad,
                          responsable: $scope.cedulalog,
                          type: $scope.registro_nul.medioRecepcionFallo == true ? $scope.archivoMedioFalloTut_nulext : '',
                          file: $scope.registro_nul.medioRecepcionFallo == true ? $scope.archivoMedioFalloTut_nul : '',
                          fecha_recepcion: "",
                          medio: $scope.registro_nul.medioRecepcionFallo == true ? 'S' : 'N',
                          observacion: '',
                          typefile: '28',
                          impugnacion: '',
                          ori: $scope.registro_nul.medioRecepcionFallo == true ? true : false
                        }
                      }).then(function (response) {
                        if (response.data.codigo == "1") {
                          swal('Completado', response.data.observacion_err, 'success');
                          setTimeout(() => {
                            swal.close();
                          }, 3000);
                          $scope.obtenerNulidad($scope.registro_nul.consecutivo);
                          // $http({
                          // 	method: 'POST',
                          // 	url: "php/upload_file/upload_juridica.php",
                          // 	data: {
                          // 		db: 'IANUL',
                          // 		path: 'Juridica/Tutelas',
                          // 		constutela: $scope.registro.codigotutela,
                          // 		consnulidad: $scope.consnulidad,
                          // 		responsable: $scope.cedulalog,
                          // 		type: $scope.archivoObsFalloTut_nulext,
                          // 		file: $scope.archivoObsFalloTut_nul,
                          // 		fecha_recepcion: '',
                          // 		medio: '',
                          // 		observacion: $scope.detalles_nul.observacion_fallo,
                          // 		typefile: '52',
                          // 		impugnacion: '',
                          // 		ori: $scope.archivoObsFalloTut_nul == '' ? false : true
                          // 	}
                          // }).then(function (response) {
                          // 	if (response.data.codigo == "1") {
                          // 		swal('Completado', response.data.observacion_err, 'success');
                          // 		setTimeout(() => {
                          // 			swal.close();
                          // 		}, 3000);
                          // 		$scope.obtenerNulidad($scope.registro_nul.consecutivo);
                          // 	} else {
                          // 		swal('Error', response.data.observacion_err, 'warning')
                          // 	}
                          // });
                        } else {
                          swal('Error', response.data.observacion_err, 'warning')
                        }
                      });
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          });
        } else {
          swal('Información', 'Por favor diligencie todos los campos.', 'info');
        }
      }

      $scope.registraImpugnacion_nul = function () {
        var validador = false;
        if ($scope.detalles_nul.impugnado == true) {
          if (document.getElementById("archivoimpugnacion_nul").files.length == 0) {
            validador = true;
          }
        }
        if ($scope.detalles_nul.medioRecepcionImpugnacion == true) {
          if ($("#dteMedioRecepcionImpugnacion_nul").val() == "" || document.getElementById("medioRecepcionImpugnacionAdjunto_nul").files.length == 0) {
            validador = true;
          }
        }
        if (document.getElementById("archivoObservacionImpugnacion_nul").files.length == 0 || $scope.detalles_nul.observacion_impugnado == "") {
          validador = true;
        }
        if (validador == false) {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar la impugnación de la nulidad?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              var datos = {
                impugnado: $scope.detalles_nul.impugnado == true ? 'S' : 'N',
                responsable: $scope.cedulalog
              }
              $http({
                method: 'POST',
                url: "php/juridica/tutelas/functutelas.php",
                data: {
                  function: 'inserta_etapa_nulidad',
                  constutela: $scope.registro.codigotutela,
                  dataNulidad: JSON.stringify(datos),
                  consnulidad: $scope.consnulidad,
                  status: $scope.registro_nul.status
                }
              }).then(function (response) {
                if (response.data.codigo_err == "1") {
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'IANUL',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      consnulidad: $scope.consnulidad,
                      responsable: $scope.cedulalog,
                      type: $scope.archivoImpugnacionTut_nulext,
                      file: $scope.archivoImpugnacionTut_nul,
                      fecha_recepcion: '',
                      medio: '',
                      observacion: '',
                      typefile: '4',
                      impugnacion: '',
                      ori: true
                    }
                  }).then(function (response) {
                    if (response.data.codigo == "1") {
                      $http({
                        method: 'POST',
                        url: "php/upload_file/upload_juridica.php",
                        data: {
                          db: 'IANUL',
                          path: 'Juridica/Tutelas',
                          constutela: $scope.registro.codigotutela,
                          ubicacion: $scope.registro.ubicacion,
                          consnulidad: $scope.consnulidad,
                          responsable: $scope.cedulalog,
                          type: $scope.registro_nul.medioRecepcionImpugnacion == true ? $scope.archivoMedioImpugnacionTut_nulext : '',
                          file: $scope.registro_nul.medioRecepcionImpugnacion == true ? $scope.archivoMedioImpugnacionTut_nul : '',
                          fecha_recepcion: $("#dteMedioRecepcionImpugnacion").val(),
                          medio: $scope.registro_nul.medioRecepcionImpugnacion == true ? 'S' : 'N',
                          observacion: '',
                          typefile: '30',
                          impugnacion: '',
                          ori: $scope.registro_nul.medioRecepcionImpugnacion == true ? true : false
                        }
                      }).then(function (response) {
                        if (response.data.codigo == "1") {
                          swal('Completado', response.data.observacion_err, 'success');
                          setTimeout(() => {
                            swal.close();
                          }, 3000);
                          $scope.obtenerNulidad($scope.registro_nul.consecutivo);

                        } else {
                          swal('Error', response.data.observacion_err, 'warning')
                        }
                      });
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          });
        } else {
          swal('Información', 'Por favor diligencie todos los campos.', 'info');
        }
      }

      $scope.registraCumplimientoMensual_nul = function () {
        var validador = false;
        if ($("#FechaSegMen_nul").val() == "" || document.getElementById("archivocumplimensual_nul").files.length == 0) {
          validador = true;
        }
        if ($scope.registro_nul.medioRecepcionCumplimiento == true) {
          if (document.getElementById("medioRecepcionCumplimientoAdjunto_nul").files.length == 0) {
            validador = true;
          }
        }
        if (validador == false) {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar el cumplimiento de la nulidad?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'IANUL',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  consnulidad: $scope.consnulidad,
                  responsable: $scope.cedulalog,
                  type: $scope.archivoCumplimientoTut_nulext,
                  file: $scope.archivoCumplimientoTut_nul,
                  fecha_recepcion: $("#FechaSegMen_nul").val(),
                  medio: '',
                  observacion: '',
                  typefile: '5',
                  impugnacion: '',
                  ori: true
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'IANUL',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      consnulidad: $scope.consnulidad,
                      responsable: $scope.cedulalog,
                      type: $scope.registro_nul.medioRecepcionCumplimiento == true ? $scope.archivoMedioCumplimientoTut_nulext : '',
                      file: $scope.registro_nul.medioRecepcionCumplimiento == true ? $scope.archivoMedioCumplimientoTut_nul : '',
                      fecha_recepcion: '',
                      medio: $scope.registro_nul.medioRecepcionCumplimiento == true ? 'S' : 'N',
                      observacion: '',
                      typefile: '31',
                      impugnacion: '',
                      ori: $scope.registro_nul.medioRecepcionCumplimiento == true ? true : false
                    }
                  }).then(function (response) {
                    if (response.data.codigo == "1") {
                      swal('Completado', response.data.observacion_err, 'success');
                      // if ($scope.registro_nul.status == "5") {
                      // 	$scope.hdefallo_nul = true;
                      // } else {
                      // 	$scope.hdefallo_nul = false;
                      // }
                      setTimeout(() => {
                        swal.close();
                      }, 3000);
                      $scope.obtenerNulidad($scope.registro_nul.consecutivo);
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          });
        } else {
          swal('Información', 'Por favor diligencie todos los campos.', 'info');
        }
      }

      $scope.registrafechafalloimpugnacion_nul = function () {
        var validador = false;
        if ($scope.detalles_nul.falloimpugnacionfc == undefined || $("#FechaFallImp_nul").val() == "" || document.getElementById("falloimpugnacion_nul").files.length == 0) {
          validador = true;
        }
        if ($scope.registro_nul.medioRecepcionFImpugnacion == true) {
          if (document.getElementById("medioRecepcionFImpugnacionAdjunto_nul").files.length == 0) {
            validador = true;
          }
        }
        if (validador == false) {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar el fallo de impugnación de la nulidad?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'IANUL',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  consnulidad: $scope.consnulidad,
                  responsable: $scope.cedulalog,
                  type: $scope.archivoFalloImgTut_nulext,
                  file: $scope.archivoFalloImgTut_nul,
                  fecha_recepcion: $("#FechaFallImp_nul").val(),
                  medio: '',
                  observacion: '',
                  typefile: '6',
                  impugnacion: $scope.detalles_nul.falloimpugnacionfc == true ? 'S' : 'N',
                  ori: true
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'IANUL',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      consnulidad: $scope.consnulidad,
                      responsable: $scope.cedulalog,
                      type: $scope.registro_nul.medioRecepcionFImpugnacion == true ? $scope.archivoMedioFalloImgTut_nulext : '',
                      file: $scope.registro_nul.medioRecepcionFImpugnacion == true ? $scope.archivoMedioFalloImgTut_nul : '',
                      fecha_recepcion: '',
                      medio: $scope.registro_nul.medioRecepcionFImpugnacion == true ? 'S' : 'N',
                      observacion: '',
                      typefile: '32',
                      impugnacion: '',
                      ori: $scope.registro_nul.medioRecepcionFImpugnacion == true ? true : false
                    }
                  }).then(function (response) {
                    if (response.data.codigo == "1") {
                      swal('Completado', response.data.observacion_err, 'success');
                      setTimeout(() => {
                        swal.close();
                      }, 3000);
                      $scope.obtenerNulidad($scope.registro_nul.consecutivo);
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          });
        } else {
          swal('Información', 'Por favor diligencie todos los campos.', 'info');
        }
      }

      $scope.registrarequerimientopre_nul = function () {
        if ($("#FechaReqPre_nul").val() == "") {
          swal('Información', 'Ingrese la fecha de radicación', 'info');
        } else if ($scope.registro_nul.medioRecepcionRqPrevio == true && document.getElementById("medioRecepcionRqPrevioAdjunto_nul").files.length == 0) {
          swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        } else {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar los campos de requerimiento previo?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'IANUL',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  consnulidad: $scope.consnulidad,
                  responsable: $scope.cedulalog,
                  type: $scope.archivorequepretut_nulext,
                  file: $scope.archivorequepretut_nul,
                  fecha_recepcion: $("#FechaReqPre_nul").val(),
                  medio: '',
                  observacion: '',
                  typefile: '7',
                  impugnacion: '',
                  ori: true
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  // REGISTRA MEDIO RECEPCION RQ ADJUNTO CNVU 13/12/2019
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'IANUL',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      consnulidad: $scope.consnulidad,
                      responsable: $scope.cedulalog,
                      type: $scope.registro_nul.medioRecepcionRqPrevio == false ? "" : $scope.archivoMediorequepretut_nulext,
                      file: $scope.registro_nul.medioRecepcionRqPrevio == false ? "" : $scope.archivoMediorequepretut_nul,
                      fecha_recepcion: '',
                      medio: $scope.registro_nul.medioRecepcionRqPrevio == false ? 'N' : 'S',
                      observacion: '',
                      typefile: '33',
                      impugnacion: '',
                      ori: $scope.registro_nul.medioRecepcionRqPrevio == true ? true : false
                    }
                  }).then(function (response) {
                    $scope.btn.GuardaRegistro = false;
                    if (response.data.codigo == "1") {
                      swal('Completado', response.data.observacion_err, 'success');
                      if ($scope.registro_nul.status = "6") {
                        $scope.hdefallo_nul = true;
                      } else {
                        $scope.hdefallo_nul = false;
                      }
                      $scope.archivorequepre_nul = '';
                      $("#FechaReqPre_nul").val('');
                      $scope.registro_nul.medioRecepcionRqPrevio = false;
                      $scope.changeMedida_nul("8");
                      $scope.Medioarchivorequepre_nul = '';
                      $scope.tabselect_nul = parseInt($scope.tabselect_nul) + 1;
                      $scope.vertab_nul($scope.tabselect_nul);
                      $scope.csstab_nul($scope.tabselect_nul);
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          })
        }
      }

      $scope.registrarequerimientopreres_nul = function () {
        if ($("#FechaReqPreRes_nul").val() == "") {
          swal('Información', 'Ingrese la fecha de radicación', 'info');
        } else if ($scope.registro_nul.medioRecepcionRespuestaRq == true && document.getElementById("medioRecepcionRespuestaRqAdjunto_nul").files.length == 0) {
          swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        } else {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar los campos de respuesta de requerimiento previo?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'IANUL',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  consnulidad: $scope.consnulidad,
                  responsable: $scope.cedulalog,
                  type: $scope.archivorequepreresTut_nulext,
                  file: $scope.archivorequepreresTut_nul,
                  fecha_recepcion: $("#FechaReqPreRes_nul").val(),
                  medio: '',
                  observacion: '',
                  typefile: '8',
                  impugnacion: '',
                  ori: true
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  // REGISTRA MEDIO RECEPCION RESPUESTA RQ ADJUNTO CNVU 13/12/2019
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'IANUL',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      consnulidad: $scope.consnulidad,
                      responsable: $scope.cedulalog,
                      type: $scope.registro_nul.medioRecepcionRespuestaRq == false ? "" : $scope.MedioarchivorequepreresTut_nulext,
                      file: $scope.registro_nul.medioRecepcionRespuestaRq == false ? "" : $scope.MedioarchivorequepreresTut_nul,
                      fecha_recepcion: '',
                      medio: $scope.registro_nul.medioRecepcionRespuestaRq == false ? 'N' : 'S',
                      observacion: '',
                      typefile: '34',
                      impugnacion: '',
                      ori: $scope.registro_nul.medioRecepcionRespuestaRq == true ? true : false
                    }
                  }).then(function (response) {
                    $scope.btn.GuardaRegistro = false;
                    if (response.data.codigo == "1") {
                      swal('Completado', response.data.observacion_err, 'success');
                      if ($scope.registro_nul.status = "6") {
                        $scope.hdefallo_nul = true;
                      } else {
                        $scope.hdefallo_nul = false;
                      }
                      $scope.archivorequepreres_nul = '';
                      $("#FechaReqPreRes_nul").val('');
                      $scope.registro_nul.medioRecepcionRespuestaRq = false;
                      $scope.changeMedida_nul("9");
                      $scope.Medioarchivorequepreres_nul = '';
                      //
                      $scope.tabselect_nul = parseInt($scope.tabselect_nul) + 1;
                      $scope.vertab_nul($scope.tabselect_nul);
                      $scope.csstab_nul($scope.tabselect_nul);
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          })
        }
      }

      $scope.registraprocesoincidente_nul = function () {
        if ($("#FechaReqPro_nul").val() == "") {
          swal('Información', 'Ingrese la fecha de radicación', 'info');
        } else if ($scope.registro_nul.medioRecepcionAdmision == true && document.getElementById("medioRecepcionAdmisionAdjunto_nul").files.length == 0) {
          swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        } else {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar los campos de incidente de desacato?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'IANUL',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  consnulidad: $scope.consnulidad,
                  responsable: $scope.cedulalog,
                  type: $scope.archivoproincdesTut_nulext,
                  file: $scope.archivoproincdesTut_nul,
                  fecha_recepcion: $("#FechaReqPro_nul").val(),
                  medio: '',
                  observacion: '',
                  typefile: '9',
                  impugnacion: '',
                  ori: true
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  // REGISTRA MEDIO RECEPCION ADMISION INC ADJUNTO CNVU 13/12/2019
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'IANUL',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      consnulidad: $scope.consnulidad,
                      responsable: $scope.cedulalog,
                      type: $scope.registro_nul.medioRecepcionAdmision == false ? "" : $scope.MedioarchivoproincdesTut_nulext,
                      file: $scope.registro_nul.medioRecepcionAdmision == false ? "" : $scope.MedioarchivoproincdesTut_nul,
                      fecha_recepcion: '',
                      medio: $scope.registro_nul.medioRecepcionAdmision == true ? 'S' : 'N',
                      observacion: '',
                      typefile: '35',
                      impugnacion: '',
                      ori: $scope.registro_nul.medioRecepcionAdmision == true ? true : false
                    }
                  }).then(function (response) {
                    $scope.btn.GuardaRegistro = false;
                    if (response.data.codigo == "1") {
                      swal('Completado', response.data.observacion_err, 'success');
                      if ($scope.registro_nul.status = "6") {
                        $scope.hdefallo_nul = true;
                      } else {
                        $scope.hdefallo_nul = false;
                      }
                      $scope.archivoproincdes_nul = '';
                      $("#FechaReqPro_nul").val('');
                      $scope.registro_nul.medioRecepcionAdmision = false;
                      $scope.changeMedida_nul("10");
                      $scope.Medioarchivoproincdes_nul = '';
                      $scope.tabselect_nul = parseInt($scope.tabselect_nul) + 1;
                      $scope.vertab_nul($scope.tabselect_nul);
                      $scope.csstab_nul($scope.tabselect_nul);
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          })
        }
      }

      $scope.registraprocesoincidenteres_nul = function () {
        if ($("#FechaReqProRes_nul").val() == "") {
          swal('Información', 'Ingrese la fecha de radicación', 'info');
        } else if ($scope.registro_nul.medioRecepcionRespuestaInc == true && document.getElementById("medioRecepcionRespuestaIncAdjunto_nul").files.length == 0) {
          swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        } else {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar los campos de respuesta de incidente de desacato?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'IANUL',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  consnulidad: $scope.consnulidad,
                  responsable: $scope.cedulalog,
                  type: $scope.archivofechreqproresTut_nulext,
                  file: $scope.archivofechreqproresTut_nul,
                  fecha_recepcion: $("#FechaReqProRes_nul").val(),
                  medio: '',
                  observacion: '',
                  typefile: '10',
                  impugnacion: '',
                  ori: true
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  // REGISTRA MEDIO RECEPCION RESPUESTA ADMISION INC ADJUNTO CNVU 13/12/2019
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'IANUL',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      consnulidad: $scope.consnulidad,
                      responsable: $scope.cedulalog,
                      type: $scope.registro_nul.medioRecepcionRespuestaInc == false ? "" : $scope.medioRecepcionRespuestaIncAdjuntoTut_nulext,
                      file: $scope.registro_nul.medioRecepcionRespuestaInc == false ? "" : $scope.medioRecepcionRespuestaIncAdjuntoTut_nul,
                      fecha_recepcion: '',
                      medio: $scope.registro_nul.medioRecepcionRespuestaInc == true ? 'S' : 'N',
                      observacion: '',
                      typefile: '36',
                      impugnacion: '',
                      ori: $scope.registro_nul.medioRecepcionRespuestaInc == true ? true : false
                    }
                  }).then(function (response) {
                    $scope.btn.GuardaRegistro = false;
                    if (response.data.codigo == "1") {
                      swal('Completado', response.data.observacion_err, 'success');
                      if ($scope.registro_nul.status = "6") {
                        $scope.hdefallo_nul = true;
                      } else {
                        $scope.hdefallo_nul = false;
                      }
                      $scope.archivoproincdesres_nul = '';
                      $("#FechaReqPro_nul").val('');
                      $scope.registro_nul.medioRecepcionRespuestaInc = false;
                      $scope.changeMedida_nul("11");
                      $scope.Medioarchivoproincdesres_nul = '';
                      $scope.selec_inci = $scope.tabselect;
                      $scope.tabselect_nul = parseInt($scope.tabselect_nul) + 1;
                      $scope.vertab_nul($scope.tabselect_nul);
                      $scope.csstab_nul($scope.tabselect_nul);
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          })
        }
      }

      $scope.registrafalloincidente_nul = function () {
        if ($("#FechaFalInc_nul").val() == "") {
          swal('Información', 'Ingrese la fecha de radicación', 'info');
        } else if ($scope.registro_nul.medioRecepcionDecisionInc == true && document.getElementById("medioRecepcionDecisionIncAdjunto_nul").files.length == 0) {
          swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        } else {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar los campos de fallo de incidente de desacato?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'IANUL',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  consnulidad: $scope.consnulidad,
                  responsable: $scope.cedulalog,
                  type: $scope.archivofalincTut_nulext,
                  file: $scope.archivofalincTut_nul,
                  fecha_recepcion: $("#FechaFalInc_nul").val(),
                  medio: '',
                  observacion: '',
                  typefile: '11',
                  impugnacion: '',
                  ori: true
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  // REGISTRA MEDIO RECEPCION DECISION INC ADJUNTO CNVU 13/12/2019
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'IANUL',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      consnulidad: $scope.consnulidad,
                      responsable: $scope.cedulalog,
                      type: $scope.registro_nul.medioRecepcionDecisionInc == false ? "" : $scope.medioRecepcionDecisionIncAdjuntoTut_nulext,
                      file: $scope.registro_nul.medioRecepcionDecisionInc == false ? "" : $scope.medioRecepcionDecisionIncAdjuntoTut_nul,
                      fecha_recepcion: '',
                      medio: $scope.registro_nul.medioRecepcionDecisionInc == true ? 'S' : 'N',
                      observacion: '',
                      typefile: '37',
                      impugnacion: '',
                      ori: $scope.registro_nul.medioRecepcionDecisionInc == true ? true : false
                    }
                  }).then(function (response) {
                    $scope.btn.GuardaRegistro = false;
                    if (response.data.codigo == "1") {
                      swal('Completado', response.data.observacion_err, 'success');
                      if ($scope.registro_nul.status = "6") {
                        $scope.hdefallo_nul = true;
                      } else {
                        $scope.hdefallo_nul = false;
                      }
                      $scope.archivofallincdes_nul = '';
                      $("#FechaFalInc_nul").val('');
                      $scope.registro_nul.medioRecepcionDecisionInc = false;
                      $scope.changeMedida_nul("12");
                      $scope.Medioarchivofallincdes_nul = '';
                      $scope.tabselect_nul = parseInt($scope.tabselect_nul) + 1;
                      $scope.vertab_nul($scope.tabselect_nul);
                      $scope.csstab_nul($scope.tabselect_nul);
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          })
        }
      }

      $scope.registraconsultaincidente_nul = function () {
        if ($("#FechaConInc_nul").val() == "") {
          swal('Información', 'Ingrese la fecha de radicación', 'info');
        } else if ($scope.registro_nul.medioRecepcionConsultaInc == true && document.getElementById("medioRecepcionConsultaIncAdjunto_nul").files.length == 0) {
          swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        } else {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar los campos de consulta de incidente de desacato?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'IANUL',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  consnulidad: $scope.consnulidad,
                  responsable: $scope.cedulalog,
                  type: $scope.archivofechaconincTut_nulext,
                  file: $scope.archivofechaconincTut_nul,
                  fecha_recepcion: $("#FechaConInc_nul").val(),
                  medio: '',
                  observacion: '',
                  typefile: '12',
                  impugnacion: '',
                  ori: true
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  // REGISTRA MEDIO RECEPCION CONSULTA INC ADJUNTO CNVU 13/12/2019
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'IANUL',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      consnulidad: $scope.consnulidad,
                      responsable: $scope.cedulalog,
                      type: $scope.registro_nul.medioRecepcionConsultaInc == false ? "" : $scope.medioRecepcionConsultaIncAdjuntoTut_nulext,
                      file: $scope.registro_nul.medioRecepcionConsultaInc == false ? "" : $scope.medioRecepcionConsultaIncAdjuntoTut_nul,
                      fecha_recepcion: '',
                      medio: $scope.registro_nul.medioRecepcionConsultaInc == true ? 'S' : 'N',
                      observacion: '',
                      typefile: '38',
                      impugnacion: '',
                      ori: $scope.registro_nul.medioRecepcionConsultaInc == true ? true : false
                    }
                  }).then(function (response) {
                    $scope.btn.GuardaRegistro = false;
                    if (response.data.codigo == "1") {
                      swal('Completado', response.data.observacion_err, 'success');
                      if ($scope.registro_nul.status = "6") {
                        $scope.hdefallo_nul = true;
                      } else {
                        $scope.hdefallo_nul = false;
                      }
                      $scope.archivoconincdes_nul = '';
                      $("#FechaConInc_nul").val('');
                      $scope.registro_nul.medioRecepcionConsultaInc = false;
                      $scope.changeMedida_nul("13");
                      $scope.Medioarchivoconincdes_nul = '';
                      $scope.tabselect_nul = parseInt($scope.tabselect_nul) + 1;
                      $scope.vertab_nul($scope.tabselect_nul);
                      $scope.csstab_nul($scope.tabselect_nul);
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          })
        }
      }

      $scope.registracierreincidente_nul = function () {
        if ($("#FechaAutInc_nul").val() == "") {
          swal('Información', 'Ingrese la fecha de radicación', 'info');
        } else if ($scope.registro_nul.medioRecepcionCierreInc == true && document.getElementById("medioRecepcionCierreIncAdjunto_nul").files.length == 0) {
          swal('Información', 'Adjunte el soporte de Medio de Recepción', 'info');
        } else {
          swal({
            title: 'Confirmar',
            text: "¿Desea guardar los campos de cierre de incidente de desacato?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.btn.GuardaRegistro = true;
              $http({
                method: 'POST',
                url: "php/upload_file/upload_juridica.php",
                data: {
                  db: 'IANUL',
                  path: 'Juridica/Tutelas',
                  constutela: $scope.registro.codigotutela,
                  ubicacion: $scope.registro.ubicacion,
                  consnulidad: $scope.consnulidad,
                  responsable: $scope.cedulalog,
                  type: $scope.archivofechaautincTut_nulext,
                  file: $scope.archivofechaautincTut_nul,
                  fecha_recepcion: $("#FechaAutInc_nul").val(),
                  medio: '',
                  observacion: '',
                  typefile: '13',
                  impugnacion: '',
                  ori: true
                }
              }).then(function (response) {
                if (response.data.codigo == "1") {
                  // REGISTRA MEDIO RECEPCION CIERRE INC ADJUNTO CNVU 13/12/2019
                  $http({
                    method: 'POST',
                    url: "php/upload_file/upload_juridica.php",
                    data: {
                      db: 'IANUL',
                      path: 'Juridica/Tutelas',
                      constutela: $scope.registro.codigotutela,
                      ubicacion: $scope.registro.ubicacion,
                      consnulidad: $scope.consnulidad,
                      responsable: $scope.cedulalog,
                      type: $scope.registro_nul.medioRecepcionCierreInc == false ? "" : $scope.medioRecepcionCierreIncAdjuntoTut_nulext,
                      file: $scope.registro_nul.medioRecepcionCierreInc == false ? "" : $scope.medioRecepcionCierreIncAdjuntoTut_nul,
                      fecha_recepcion: '',
                      medio: $scope.registro_nul.medioRecepcionCierreInc == true ? 'S' : 'N',
                      observacion: '',
                      typefile: '39',
                      impugnacion: '',
                      ori: $scope.registro_nul.medioRecepcionCierreInc == true ? true : false
                    }
                  }).then(function (response) {
                    $scope.btn.GuardaRegistro = false;
                    if (response.data.codigo == "1") {
                      swal('Completado', response.data.observacion_err, 'success');
                      if ($scope.registro_nul.status = "6") {
                        $scope.hdefallo_nul = true;
                      } else {
                        $scope.hdefallo_nul = false;
                      }
                      $scope.archivocieincdes_nul = '';
                      $("#FechaAutInc_nul").val('');
                      $scope.registro_nul.medioRecepcionCierreInc = false;
                      $scope.changeMedida_nul("14");
                      $scope.Medioarchivocieincdes_nul = '';
                      $scope.tabselect_nul = 1;
                      $scope.vertab_nul($scope.tabselect_nul);
                      $scope.csstab_nul($scope.tabselect_nul);
                      $scope.registro_nul.desacato = parseInt($scope.registro_nul.desacato) + 1;
                      $scope.registro_nul.status_desacato = 1;
                    } else {
                      swal('Error', response.data.observacion_err, 'warning')
                    }
                  });
                } else {
                  swal('Error', response.data.observacion_err, 'warning')
                }
              });
            }
          })
        }
      }

      $scope.limpiarNulidad = function () {
        // NULIDAD
        $("#fechaNulidadParte").val('');
        $scope.archivoNulidadParte = '';
        $("#FechaDeclaracionNulidad").val('');
        $scope.archivoDeclaracionNulidad = '';
        $scope.tipoNulidad = false;
        $("#FechaNulidadOficio").val('');
        $scope.archivoNulidadOficionom = '';


        // ADMISION
        $("#dteFechaRecepcion_nul").val('');
        $("#dteFechaVencimiento_nul").val('');
        $scope.registro_nul.plazo = '';
        $scope.registro_nul.medidaprovisional = '';

        // RESPUESTA
        $("#dteFechaRecepcionRespuesta_nul").val('');
        $scope.archivorespuesta_nul = '';
        $scope.respuestatutela_nul = '';
        $scope.registro_nul.medioRecepcionRespuesta = '';
        $scope.archivoMedioRespuesta_nul = '';
        $scope.archivoMedioRecepcionRespuesta_nul = '';

        // FALLO
        $scope.detalles_nul.fallotutela = false;
        $scope.archivodetalletut_nul = '';
        $scope.archivoFalloTut_nul = '';
        $("#dteFechaFallo_nul").val('');
        $scope.detalles_nul.plazofallo = '';
        $("#dteFechaVencimientoFallo_nul").val('');
        $scope.detalles_nul.plazofallo = '';
        $scope.registro_nul.medioRecepcionFallo = '';
        $scope.archivoObservacionFalloNom_nul = '';
        $scope.archivoObsFalloTut_nul = '';

        //IMPUGNACION
        $scope.detalles_nul.impugnado = '';
        $scope.archivoImpugnacionNom_nul = '';
        $scope.archivoImpugnacionTut_nul = '';
        $scope.registro_nul.medioRecepcionImpugnacion = '';
        $("#dteMedioRecepcionImpugnacion_nul").val('');
        $scope.archivoMedioImpugnacionNom_nul = '';
        $scope.archivoMedioImpugnacionTut_nul = '';
        $scope.archivoObservacionImpugnacionNom_nul = '';
        $scope.archivoObsImpugnacionTut_nul = '';
        $scope.detalles_nul.observacion_impugnado = '';

        //CUMPLIMIENTO Y FALLO DE IMPUGNACION
        $("#FechaSegMen_nul").val('');
        $scope.archivoCumplimientoNom_nul = '';
        $scope.archivoCumplimientoTut_nul = '';
        $scope.registro_nul.medioRecepcionCumplimiento = '';
        $scope.archivoMMedioCumplimientoNom_nul = '';
        $scope.archivoMedioCumplimientoTut_nul = '';
        $scope.detalles_nul.falloimpugnacionfc = '';
        $("#FechaFallImp_nul").val('');
        $scope.archivoFalloImgNom_nul = '';
        $scope.archivoFalloImgTut_nul = '';
        $scope.registro_nul.medioRecepcionFImpugnacion = '';
        $scope.archivoMedioFalloImgNom_nul = '';
        $scope.archivoMedioFalloImgTut_nul = '';

        //INCIDENTES
        $scope.archivorequepre_nul = '';
        $("#FechaReqPre_nul").val('');
        $scope.registro_nul.medioRecepcionRqPrevio = false;
        // $scope.changeMedida_nul("8");
        $scope.Medioarchivorequepre_nul = '';

        $scope.archivorequepreres_nul = '';
        $("#FechaReqPreRes_nul").val('');
        $scope.registro_nul.medioRecepcionRespuestaRq = false;
        // $scope.changeMedida_nul("9");
        $scope.Medioarchivorequepreres_nul = '';

        $scope.archivoproincdes_nul = '';
        $("#FechaReqPro_nul").val('');
        $scope.registro_nul.medioRecepcionAdmision = false;
        // $scope.changeMedida_nul("10");
        $scope.Medioarchivoproincdes_nul = '';

        $scope.archivoproincdesres_nul = '';
        $("#FechaReqPro_nul").val('');
        $scope.registro_nul.medioRecepcionRespuestaInc = false;
        // $scope.changeMedida_nul("11");
        $scope.Medioarchivoproincdesres_nul = '';

        $scope.archivofallincdes_nul = '';
        $("#FechaFalInc_nul").val('');
        $scope.registro_nul.medioRecepcionDecisionInc = false;
        // $scope.changeMedida_nul("12");
        $scope.Medioarchivofallincdes_nul = '';

        $scope.archivoconincdes_nul = '';
        $("#FechaConInc_nul").val('');
        $scope.registro_nul.medioRecepcionConsultaInc = false;
        // $scope.changeMedida_nul("13");
        $scope.Medioarchivoconincdes_nul = '';

        $scope.archivocieincdes_nul = '';
        $("#FechaAutInc_nul").val('');
        $scope.registro_nul.medioRecepcionCierreInc = false;
        //$scope.changeMedida_nul("14");
        $scope.Medioarchivocieincdes_nul = '';
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

      $scope.descargaInformeGeneral = function () {

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
          url: "php/juridica/tutelas/functutelas.php",
          data: { function: 'p_obtener_tutela_reporte_general' }
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

      /*GESTION CAUSAS ADMISION*/
      $scope.obtenerListadoCausas = function () {
        $scope.listadoCausas = [];
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'p_lista_concepto'
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            // $scope.listadoCausas = data;
            data.forEach(e => {
              if (e.COD_ESTADO == 'A') {
                $scope.listadoCausas.push({
                  CONCEPTO: e.CONCEPTO,
                  NOMBRE: e.NOMBRE
                })
              }
            });
            $scope.listadoCausasMotivos = [];
            $scope.registro.selectCausaMotivo = '';
            // console.table($scope.listadoCausas)
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });
      }
      $scope.obtenerListadoCausas();
      $scope.obtenerListadoMotivos = function (causa) {
        $scope.listadoCausasMotivos = [];
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'p_listar_motivos',
            causa
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            data.forEach(e => {
              if (e.COD_ESTADO == 'A') {
                $scope.listadoCausasMotivos.push({
                  MOTIVO: e.MOTIVO,
                  NOMBRE: e.NOMBRE,
                  MIPRES: e.MIPRES,
                })
              }
            });
            setTimeout(() => { $scope.$apply(); }, 1000);
            // $scope.listadoCausasMotivos = data;
          }
        });
      }
      // SOLO CAUSAS EN LA ADMISION NO TECNOLOGIAS
      $scope.agregarCausa_Adm_NT = function () {
        if (!$scope.registro.selectCausa) {
          swal("Mensaje", '¡Debe seleccionar la causa!', "warning").catch(swal.noop); return
        }
        if (!$scope.registro.selectCausaMotivo) {
          swal("Mensaje", '¡Debe seleccionar el motivo!', "warning").catch(swal.noop); return
        }
        var encontrado = false;
        $scope.listCausas_Admision.forEach(e => {
          if (e.COD_CAUSA == $scope.registro.selectCausa && e.COD_MOTIVO == $scope.registro.selectCausaMotivo) {
            swal("Mensaje", 'Causa y motivo repetido', "warning").catch(swal.noop);
            encontrado = true;
            return;
          }
        });
        if (!encontrado) {
          // registro.selectCausa CONCEPTO NOMBRE
          // registro.selectCausaMotivo MOTIVO NOMBRE
          // $scope.btnDwnInformes = (usuariosBtnDwnInformes.findIndex((element) => element.user == $scope.cedulalog)) == -1 ? false : true;
          var causaSeleccionada = $scope.listadoCausas[$scope.listadoCausas.findIndex((element) => element.CONCEPTO == $scope.registro.selectCausa)];
          var motivoSeleccionado = $scope.listadoCausasMotivos[$scope.listadoCausasMotivos.findIndex((element) => element.MOTIVO == $scope.registro.selectCausaMotivo)];
          //
          $scope.listCausas_Admision.push({
            COD_CAUSA: causaSeleccionada.CONCEPTO,
            NOM_CAUSA: causaSeleccionada.NOMBRE,
            COD_MOTIVO: motivoSeleccionado.MOTIVO,
            NOM_MOTIVO: motivoSeleccionado.NOMBRE
          });
          console.table($scope.listCausas_Admision)
          // Limpiar campos
          $scope.registro.selectCausa = '';
          // $scope.registro.selectCausaMotivo = '';
          $scope.listadoCausasMotivos = [];
          setTimeout(() => {
            $scope.registro.selectCausaMotivo = '';
          }, 500);
        }
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.quitarCausa_Adm_NT = function (index) {
        $scope.listCausas_Admision.splice(index, 1);
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      $scope.guardarCausas_Adm_NT = function () {
        if (!$scope.listCausas_Admision.length) {
          //swal("Mensaje", 'Debe diligiar al menos 1 Causa', "warning").catch(swal.noop);
          return;
        }

        var array = [];

        $scope.listCausas_Admision.forEach(e => {
          array.push({
            CAUSA: e.COD_CAUSA,
            MOTIVO: e.COD_MOTIVO,
          })
        });

        swal({
          title: 'Cargando'
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: "p_ui_servicios",
            numero: $scope.registro.codigotutela,
            ubicacion: $scope.registro.regionalTutela,
            etapa: '1',
            jsonCausas: JSON.stringify(array),
            cantidad: array.length,
            accion: 'I'
          }
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length && data[0].Codigo != '-1') {
              // swal("Mensaje", 'Causas guardadas', "warning").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })
      }
      // SOLO CAUSAS NO TECNOLOGIAS

      // SOLO CAUSAS SI TECNOLOGIAS
      $scope.obtenerProductoCausa = function () {
        if ($scope.registro.productoAdmi == '') {
          swal("Mensaje", 'Debe digitar un producto', "warning").catch(swal.noop);
          return;
        }
        swal({
          title: 'Cargando'
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: "p_buscar_productos",
            coinc: $scope.registro.productoAdmi,
            // regimen: $scope.pqrData.User.regimen,
            edadDias: $scope.registro.edadDiasAfiliado,
            sexoCodigo: $scope.registro.sexoCodigoAfiliado
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length && data[0].CODIGO != '-1') {
              swal.close();
              $scope.listadoProductos = data;
              if (data.length == 1) {
                $scope.registro.productoAdmi = data[0].CODIGO + '-' + data[0].NOMBRE;
                $scope.registro.activarSubclaseAdmi = data[0].SUBCLASIFICACION;
                $scope.obtenerSubclaseCausa();
                return
              }
            } else {
              $scope.listadoProductos = [];
              swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      $scope.changeProductoCausa = function () {
        if ($scope.registro && $scope.listadoProductos) {
          console.log(1);
          $scope.listadoProductos.forEach(e => {
            if (e.CODIGO + '-' + e.NOMBRE == $scope.registro.productoAdmi) {
              console.log(1);
              $scope.registro.activarSubclaseAdmi = e.SUBCLASIFICACION;
              if (e.SUBCLASIFICACION == 'S') { $scope.obtenerSubclaseCausa(); }
              setTimeout(() => { $scope.$apply(); }, 500);
            }
          });
        }
      }
      $scope.obtenerSubclaseCausa = function () {
        // swal({
        // 	title: 'Cargando'
        // });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: "p_obtener_subcategorias",
            coinc: $scope.registro.productoAdmi.toString().split('-')[0],
          }
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length && data[0].codigo != '-1') {
              $scope.listadoSubclase = data;
              if (data.length == 1) {
                $scope.registro.subclaseAdmi = data[0].codigo + '-' + data[0].nombre;
                return
              }
            } else {
              $scope.listadoSubclase = [];
              // swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.obtenerDiagnosticoCausa = function () {
        swal({
          title: 'Cargando'
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: "listaDiagnosticos2",
            coinc: $scope.registro.diagnosticoAdmi,
          }
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length && data[0].CODIGO != '-1') {
              $scope.listadoDiagnosticos = data;
              if (data.length == 1) {
                $scope.registro.diagnosticoAdmi = data[0].CODIGO + '-' + data[0].NOMBRE;
                return
              }
            } else {
              $scope.listadoDiagnosticos = [];
              swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.obtenerPrestadorCausa = function (prestador, listado) {
        swal({
          title: 'Cargando'
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: "p_obtener_ips",
            coinc: $scope.registro[prestador],
          }
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length && data[0].CODIGO != '-1') {
              $scope[listado] = data;
              if (data.length == 1) {
                $scope.registro[prestador] = data[0].CODIGO + '-' + data[0].NOMBRE;
                return
              }
            } else {
              $scope[listado] = [];
              swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.validarMotivo_Adm_TS = function () {
        // Validar si motivo seleccionado requiere MIPRES
        if ($scope.registro.selectCausaMotivo_TS) {
          var motivoSeleccionado = $scope.listadoCausasMotivos[$scope.listadoCausasMotivos.findIndex((element) => element.MOTIVO == $scope.registro.selectCausaMotivo_TS)];
          $scope.registro.activarMipresAdmi = motivoSeleccionado.MIPRES;
        }
      }

      $scope.agregarCausa_Adm_TS = function () {

        if (!$scope.registro.selectCausaMotivo_TS) {
          swal("Mensaje", '¡Debe seleccionar el motivo!', "warning").catch(swal.noop); return
        }
        if (!$scope.registro.productoAdmi || ($scope.registro.productoAdmi.toString().split('-')[0]).toString() <= 3) {
          swal("Mensaje", '¡Debe seleccionar el CUMS/CUPS!', "warning").catch(swal.noop); return
        }
        if (!$scope.registro.diagnosticoAdmi || ($scope.registro.diagnosticoAdmi.toString().split('-')[0]).toString() <= 3) {
          swal("Mensaje", '¡Debe seleccionar el diagnostico!', "warning").catch(swal.noop); return
        }
        // if (!$scope.registro.mipresAdmi && $scope.registro.activarMipresAdmi == 'S') {
        //   swal("Mensaje", '¡Debe digitar el MIPRES!', "warning").catch(swal.noop); return
        // }
        // if (!$scope.registro.medicoTratanteAdmi && $scope.registro.selectCausaMotivo_TS != '5') {
        //   swal("Mensaje", '¡Debe seleccionar el medico tratante!', "warning").catch(swal.noop); return
        // }
        // if (!$scope.registro.prestadorSolicitanteAdmi || ($scope.registro.prestadorSolicitanteAdmi.toString().split('-')[0]).toString() <= 3) {
        //   swal("Mensaje", '¡Debe seleccionar el prestador solicitante!', "warning").catch(swal.noop); return
        // }
        // if (!$scope.registro.prestadorAsignadoAdmi || ($scope.registro.prestadorAsignadoAdmi.toString().split('-')[0]).toString() <= 3) {
        //   swal("Mensaje", '¡Debe seleccionar el prestador asignado!', "warning").catch(swal.noop); return
        // }
        // if (!$scope.registro.cantidadAdmi) {
        //   swal("Mensaje", '¡Debe digitar la cantidad!', "warning").catch(swal.noop); return
        // }
        // if (!$scope.registro.tiempoAdmi) {
        //   swal("Mensaje", '¡Debe digitar el tiempo!', "warning").catch(swal.noop); return
        // }
        // selectCausaMotivo_TS

        var encontrado = false;
        $scope.listCausasTecnologia_Admision.forEach(e => {
          if (e.COD_MOTIVO == $scope.registro.selectCausaMotivo_TS &&
            e.COD_PRODUCTO == $scope.registro.productoAdmi.toString().split('-')[0] &&
            e.COD_SUBCLASE == $scope.registro.subclaseAdmi.toString().split('-')[0] &&
            e.COD_DIAGNOSTICO == $scope.registro.diagnosticoAdmi.toString().split('-')[0] &&
            e.COD_MIPRES == $scope.registro.mipresAdmi &&
            e.MEDICO_TRATANTE == $scope.registro.medicoTratanteAdmi &&
            e.COD_PRESTADOR_SOLICITANTE == $scope.registro.prestadorSolicitanteAdmi.toString().split('-')[0] &&
            e.COD_PRESTADOR_ASIGNADO == $scope.registro.prestadorAsignadoAdmi.toString().split('-')[0] &&
            e.CANTIDAD == $scope.registro.cantidadAdmi &&
            e.TIEMPO == $scope.registro.tiempoAdmi
          ) {
            swal("Mensaje", 'Información repetida', "warning").catch(swal.noop);
            encontrado = true; return;
          }
        });
        if (!encontrado) {

          var motivoSeleccionado = $scope.listadoCausasMotivos[$scope.listadoCausasMotivos.findIndex((element) => element.MOTIVO == $scope.registro.selectCausaMotivo_TS)];

          $scope.listCausasTecnologia_Admision.push({
            COD_MOTIVO: motivoSeleccionado.MOTIVO,
            NOM_MOTIVO: motivoSeleccionado.NOMBRE,

            COD_PRODUCTO: $scope.registro.productoAdmi.toString().split('-')[0],
            NOM_PRODUCTO: $scope.registro.productoAdmi.toString().split('-')[1],

            COD_SUBCLASE: $scope.registro.subclaseAdmi ? $scope.registro.subclaseAdmi.toString().split('-')[0] : '',
            NOM_SUBCLASE: $scope.registro.subclaseAdmi ? $scope.registro.subclaseAdmi.toString().split('-')[1] : '',

            COD_DIAGNOSTICO: $scope.registro.diagnosticoAdmi.toString().split('-')[0],
            NOM_DIAGNOSTICO: $scope.registro.diagnosticoAdmi.toString().split('-')[1],

            COD_MIPRES: $scope.registro.mipresAdmi,

            MEDICO_TRATANTE: $scope.registro.medicoTratanteAdmi ? $scope.registro.medicoTratanteAdmi : '',

            COD_PRESTADOR_SOLICITANTE: $scope.registro.prestadorSolicitanteAdmi ? $scope.registro.prestadorSolicitanteAdmi.toString().split('-')[0] : '',
            NOM_PRESTADOR_SOLICITANTE: $scope.registro.prestadorSolicitanteAdmi ? $scope.registro.prestadorSolicitanteAdmi.toString().split('-')[1] : '',

            COD_PRESTADOR_ASIGNADO: $scope.registro.prestadorAsignadoAdmi ? $scope.registro.prestadorAsignadoAdmi.toString().split('-')[0] : '',
            NOM_PRESTADOR_ASIGNADO: $scope.registro.prestadorAsignadoAdmi ? $scope.registro.prestadorAsignadoAdmi.toString().split('-')[1] : '',

            CANTIDAD: $scope.registro.cantidadAdmi,
            TIEMPO: $scope.registro.tiempoAdmi,
          });

          console.table($scope.listCausasTecnologia_Admision)
          $scope.registro.productoAdmi = '';
          $scope.registro.activarSubclaseAdmi = '';
          $scope.registro.subclaseAdmi = '';
          $scope.registro.diagnosticoAdmi = '';
          $scope.registro.mipresAdmi = '';
          $scope.registro.medicoTratanteAdmi = '';
          $scope.registro.prestadorSolicitanteAdmi = '';
          $scope.registro.prestadorAsignadoAdmi = '';
          $scope.registro.cantidadAdmi = '';
          $scope.registro.tiempoAdmi = '';

          setTimeout(() => { $scope.$apply(); }, 500);
        }
        // $scope.listCausasTecnologia_Admision = [];
      }

      $scope.quitarCausa_Adm_TS = function (index) {
        $scope.listCausasTecnologia_Admision.splice(index, 1);
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.guardarCausas_Adm_TS = function () {
        if (!$scope.listCausasTecnologia_Admision.length) {
          //swal("Mensaje", 'Debe diligiar al menos 1 Causa', "warning").catch(swal.noop);
          return;
        }

        var array = [];

        $scope.listCausasTecnologia_Admision.forEach(e => {
          array.push({
            CODIGO: e.COD_PRODUCTO,
            CODIGO_SUBCLASE: e.COD_SUBCLASE,
            DIAGNOSTICO: e.COD_DIAGNOSTICO,
            MEDICO: e.MEDICO_TRATANTE,
            CAUSA: 'TS',
            MOTIVO: e.COD_MOTIVO,
            MIPRES: e.COD_MIPRES,
            PRESTADOR: e.COD_PRESTADOR_SOLICITANTE,
            PRESTADOR_ASIGNADO: e.COD_PRESTADOR_ASIGNADO,
            CANTIDAD: e.CANTIDAD,
            TIEMPO: e.TIEMPO
          })
        });

        swal({
          title: 'Cargando'
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: "p_ui_servicios",
            numero: $scope.registro.codigotutela,
            ubicacion: $scope.registro.ubicacion,
            etapa: '1',
            jsonCausas: JSON.stringify(array),
            cantidad: array.length,
            accion: 'I'
          }
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.Codigo != '-1') {
              swal("Mensaje", 'Causas guardadas', "success").catch(swal.noop);
            } else {
              swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })
      }
      /*GESTION CAUSAS ADMISION*/

      /*GESTION CAUSAS FALLO Y FALLO IMPUGNACION*/
      $scope.causaForm_Fallo = {
        causa: '',
        motivo: '',
        producto: '',
        activarSubclase: '',
        subclase: '',
        diagnostico: '',
        mipres: '',
        activarMipres: '',
        medicoTratante: '',
        prestadorSolicitante: '',
        prestadorAsignado: '',
        cantidad: '',
        tiempo: '',
        listCausasTecnologia: '',
        listCausasNoTecnologia: '',
      };
      $scope.causaForm_FalloImp = {
        causa: '',
        motivo: '',
        producto: '',
        activarSubclase: '',
        subclase: '',
        diagnostico: '',
        mipres: '',
        activarMipres: '',
        medicoTratante: '',
        prestadorSolicitante: '',
        prestadorAsignado: '',
        cantidad: '',
        tiempo: '',
        listCausasTecnologia: '',
        listCausasNoTecnologia: '',
      };


      $scope.obtenerProductoCausa_Fallo_Impug = function (form) {
        if ($scope[form].producto == '') {
          swal("Mensaje", 'Debe digitar un producto', "warning").catch(swal.noop);
          return;
        }
        swal({
          title: 'Cargando'
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: "p_buscar_productos",
            coinc: $scope[form].producto,
            // regimen: $scope.pqrData.User.regimen,
            edadDias: $scope.registro.edadDiasAfiliado,
            sexoCodigo: $scope.registro.sexoCodigoAfiliado
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length && data[0].CODIGO != '-1') {
              swal.close();
              $scope.listadoProductos = data;
              if (data.length == 1) {
                $scope[form].producto = data[0].CODIGO + '-' + data[0].NOMBRE;
                $scope[form].activarSubclase = data[0].SUBCLASIFICACION;
                $scope.obtenerSubclaseCausa_Fallo_Impug(form);
                return
              }
            } else {
              $scope.listadoProductos = [];
              swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      $scope.changeProductoCausa_Fallo_Impug = function (form) {
        if ($scope[form] && $scope.listadoProductos) {
          console.log(1);
          $scope.listadoProductos.forEach(e => {
            if (e.CODIGO + '-' + e.NOMBRE == $scope[form].producto) {
              console.log(1);
              $scope[form].activarSubclase = e.SUBCLASIFICACION;
              if (e.SUBCLASIFICACION == 'S') { $scope.obtenerSubclaseCausa_Fallo_Impug(); }
              setTimeout(() => { $scope.$apply(); }, 500);
            }
          });
        }
      }
      $scope.obtenerSubclaseCausa_Fallo_Impug = function (form) {
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: "p_obtener_subcategorias",
            coinc: $scope[form].producto.toString().split('-')[0],
          }
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length && data[0].codigo != '-1') {
              $scope.listadoSubclase = data;
              if (data.length == 1) {
                $scope[form].subclase = data[0].codigo + '-' + data[0].nombre;
                return
              }
            } else {
              $scope.listadoSubclase = [];
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      $scope.obtenerDiagnosticoCausa_Fallo_Impug = function (form) {
        swal({
          title: 'Cargando'
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: "listaDiagnosticos2",
            coinc: $scope[form].diagnostico,
          }
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length && data[0].CODIGO != '-1') {
              $scope.listadoDiagnosticos = data;
              if (data.length == 1) {
                $scope[form].diagnostico = data[0].CODIGO + '-' + data[0].NOMBRE;
                return
              }
            } else {
              $scope.listadoDiagnosticos = [];
              swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      $scope.obtenerPrestadorCausa_Fallo_Impug = function (form, prestador, listado) {
        swal({
          title: 'Cargando'
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: "p_obtener_ips",
            coinc: $scope[form][prestador],
          }
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length && data[0].CODIGO != '-1') {
              $scope[listado] = data;
              if (data.length == 1) {
                $scope[form][prestador] = data[0].CODIGO + '-' + data[0].NOMBRE;
                return
              }
            } else {
              $scope[listado] = [];
              swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.validarMotivo_Fallo_Impug = function (form) {
        // Validar si motivo seleccionado requiere MIPRES
        if ($scope[form].motivo) {
          var motivoSeleccionado = $scope.listadoCausasMotivos[$scope.listadoCausasMotivos.findIndex((element) => element.MOTIVO == $scope[form].motivo)];
          $scope[form].activarMipres = motivoSeleccionado.MIPRES;
        }
      }

      $scope.agregarCausa_Fallo_Impug = function (form) {
        var encontrado = false;
        if (!$scope[form].causa) {
          swal("Mensaje", '¡Debe seleccionar la causa!', "warning").catch(swal.noop); return
        }
        if (!$scope[form].motivo) {
          swal("Mensaje", '¡Debe seleccionar el motivo!', "warning").catch(swal.noop); return
        }

        if ($scope[form].causa == 'TS') {

          if (!$scope[form].producto || ($scope[form].producto.toString().split('-')[0]).toString() <= 3) {
            swal("Mensaje", '¡Debe seleccionar el CUMS/CUPS!', "warning").catch(swal.noop); return
          }
          if (!$scope[form].diagnostico || ($scope[form].diagnostico.toString().split('-')[0]).toString() <= 3) {
            swal("Mensaje", '¡Debe seleccionar el diagnostico!', "warning").catch(swal.noop); return
          }
          if (!$scope[form].mipres && $scope[form].activarMipres == 'S') {
            swal("Mensaje", '¡Debe digitar el MIPRES!', "warning").catch(swal.noop); return
          }
          // if (!$scope[form].medicoTratante) {
          //   swal("Mensaje", '¡Debe seleccionar el medico tratante!', "warning").catch(swal.noop); return
          // }
          // if (!$scope[form].prestadorSolicitante || ($scope[form].prestadorSolicitante.toString().split('-')[0]).toString() <= 3) {
          //   swal("Mensaje", '¡Debe seleccionar el prestador solicitante!', "warning").catch(swal.noop); return
          // }
          if (!$scope[form].prestadorAsignado || ($scope[form].prestadorAsignado.toString().split('-')[0]).toString() <= 3) {
            swal("Mensaje", '¡Debe seleccionar el prestador asignado!', "warning").catch(swal.noop); return
          }
          if (!$scope[form].cantidad) {
            swal("Mensaje", '¡Debe digitar la cantidad!', "warning").catch(swal.noop); return
          }
          if (!$scope[form].tiempo) {
            swal("Mensaje", '¡Debe digitar el tiempo!', "warning").catch(swal.noop); return
          }


          $scope[form].listCausasTecnologia.forEach(e => {
            if (e.COD_CAUSA == $scope[form].causa &&
              e.COD_MOTIVO == $scope[form].motivo &&
              e.COD_PRODUCTO == $scope[form].producto.toString().split('-')[0] &&
              e.COD_SUBCLASE == $scope[form].subclase.toString().split('-')[0] &&
              e.COD_DIAGNOSTICO == $scope[form].diagnostico.toString().split('-')[0] &&
              e.COD_MIPRES == $scope[form].mipres &&
              e.MEDICO_TRATANTE == $scope[form].medicoTratante &&
              e.COD_PRESTADOR_SOLICITANTE == $scope[form].prestadorSolicitante.toString().split('-')[0] &&
              e.COD_PRESTADOR_ASIGNADO == $scope[form].prestadorAsignado.toString().split('-')[0] &&
              e.CANTIDAD == $scope[form].cantidad &&
              e.TIEMPO == $scope[form].tiempo
            ) {
              swal("Mensaje", 'Información repetida', "warning").catch(swal.noop);
              encontrado = true; return;
            }
          });
        } else {
          $scope[form].listCausasNoTecnologia.forEach(e => {
            if (e.COD_CAUSA == $scope[form].causa &&
              e.COD_MOTIVO == $scope[form].motivo) {
              swal("Mensaje", 'Información repetida', "warning").catch(swal.noop);
              encontrado = true; return;
            }
          });

        }
        if (!encontrado) {

          var causaSeleccionada = $scope.listadoCausas[$scope.listadoCausas.findIndex((element) => element.CONCEPTO == $scope[form].causa)];
          var motivoSeleccionado = $scope.listadoCausasMotivos[$scope.listadoCausasMotivos.findIndex((element) => element.MOTIVO == $scope[form].motivo)];

          if ($scope[form].causa == 'TS') {
            $scope[form].listCausasTecnologia.push({
              COD_CAUSA: causaSeleccionada.CONCEPTO,
              NOM_CAUSA: causaSeleccionada.NOMBRE,

              COD_MOTIVO: motivoSeleccionado.MOTIVO.toString(),
              NOM_MOTIVO: motivoSeleccionado.NOMBRE,

              COD_PRODUCTO: $scope[form].producto.toString().split('-')[0],
              NOM_PRODUCTO: $scope[form].producto.toString().split('-')[1],

              COD_SUBCLASE: $scope[form].subclase ? $scope[form].subclase.toString().split('-')[0] : '',
              NOM_SUBCLASE: $scope[form].subclase ? $scope[form].subclase.toString().split('-')[1] : '',

              COD_DIAGNOSTICO: $scope[form].diagnostico.toString().split('-')[0],
              NOM_DIAGNOSTICO: $scope[form].diagnostico.toString().split('-')[1],

              COD_MIPRES: $scope[form].mipres,

              MEDICO_TRATANTE: $scope[form].medicoTratante ? $scope[form].medicoTratante : '',

              COD_PRESTADOR_SOLICITANTE: $scope[form].prestadorSolicitante ? $scope[form].prestadorSolicitante.toString().split('-')[0] : '',
              NOM_PRESTADOR_SOLICITANTE: $scope[form].prestadorSolicitante ? $scope[form].prestadorSolicitante.toString().split('-')[1] : '',

              COD_PRESTADOR_ASIGNADO: $scope[form].prestadorAsignado ? $scope[form].prestadorAsignado.toString().split('-')[0] : '',
              NOM_PRESTADOR_ASIGNADO: $scope[form].prestadorAsignado ? $scope[form].prestadorAsignado.toString().split('-')[1] : '',

              CANTIDAD: $scope[form].cantidad,
              TIEMPO: $scope[form].tiempo,

            });
          } else {
            $scope[form].listCausasNoTecnologia.push({
              COD_CAUSA: causaSeleccionada.CONCEPTO,
              NOM_CAUSA: causaSeleccionada.NOMBRE,
              COD_MOTIVO: motivoSeleccionado.MOTIVO,
              NOM_MOTIVO: motivoSeleccionado.NOMBRE
            });
          }

          setTimeout(() => {
            $scope[form].causa = '';
            $scope[form].motivo = '';
            $scope[form].producto = '';
            $scope[form].activarSubclase = '';
            $scope[form].subclase = '';
            $scope[form].diagnostico = '';
            $scope[form].mipres = '';
            $scope[form].activarMipres = '';
            $scope[form].medicoTratante = '';
            $scope[form].prestadorSolicitante = '';
            $scope[form].prestadorAsignado = '';
            $scope[form].cantidad = '';
            $scope[form].tiempo = '';
            $scope.$apply();
          }, 1500);

          console.table($scope[form].listCausasTecnologia)

        }
      }

      $scope.quitarCausa_Fallo_Impug = function (index, form, list) {
        $scope[form][list].splice(index, 1);
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.guardarCausas_Fallo_Impug = function (form) {

        var array = [];

        $scope[form].listCausasTecnologia.forEach(e => {
          array.push({
            CODIGO: e.COD_PRODUCTO,
            CODIGO_SUBCLASE: e.COD_SUBCLASE,
            DIAGNOSTICO: e.COD_DIAGNOSTICO,
            MEDICO: e.MEDICO_TRATANTE,
            CAUSA: e.COD_CAUSA,
            MOTIVO: e.COD_MOTIVO,
            MIPRES: e.COD_MIPRES,
            PRESTADOR: e.COD_PRESTADOR_SOLICITANTE,
            PRESTADOR_ASIGNADO: e.COD_PRESTADOR_ASIGNADO,
            CANTIDAD: e.CANTIDAD,
            TIEMPO: e.TIEMPO,
          })
        });

        $scope[form].listCausasNoTecnologia.forEach(e => {
          array.push({
            CAUSA: e.COD_CAUSA,
            MOTIVO: e.COD_MOTIVO,
          })
        });

        swal({
          title: 'Cargando'
        });
        if (array.length) {
          swal.showLoading();
          const etapa = form == 'causaForm_Fallo' ? '3' : '5'
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
              function: "p_ui_servicios",
              numero: $scope.registro.codigotutela,
              ubicacion: $scope.registro.ubicacion,
              etapa: etapa,
              jsonCausas: JSON.stringify(array),
              cantidad: array.length,
              accion: 'I'
            }
          }).then(function ({ data }) {
            swal.close();
            if (data && data.toString().substr(0, 3) != '<br') {
              if (data.Codigo != '-1') {
                // swal("Mensaje", 'Causas guardadas', "success").catch(swal.noop);
              } else {
                swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
              }
            } else {
              swal("Mensaje", data, "warning").catch(swal.noop);
            }
          })
        } else {
          console.log('Sin causas');
        }
      }
      /*GESTION CAUSAS FALLO Y FALLO IMPUGNACION*/

      $scope.listarCausasTutela = function () {
        $scope.listCausasTecnologia_Admision = [];
        $scope.listCausas_Admision = [];
        $scope.causaForm_Fallo.listCausasTecnologia = [];
        $scope.causaForm_Fallo.listCausasNoTecnologia = [];
        $scope.causaForm_FalloImp.listCausasTecnologia = [];
        $scope.causaForm_FalloImp.listCausasNoTecnologia = [];


        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: "p_lista_productos_tut",
            numero: $scope.registro.codigotutela,
            ubicacion: $scope.registro.ubicacion,
          }
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length && data[0].Codigo != '-1') {
              // Etapa registro
              // $scope.listCausasTecnologia_Admision
              // $scope.listCausas_Admision
              data.forEach(e => {
                if (e.ETAPA == 1 && e.COD_CAUSA == 'TS') {
                  $scope.listCausasTecnologia_Admision.push({
                    COD_CAUSA: e.COD_CAUSA,
                    NOM_CAUSA: e.CAUSA,

                    COD_MOTIVO: e.COD_MOTIVO,
                    NOM_MOTIVO: e.MOTIVO,

                    COD_PRODUCTO: e.COD_PRODUCTO,
                    NOM_PRODUCTO: e.PROC_NOMBRE,

                    COD_SUBCLASE: e.COD_SUBCLASIFICACION,
                    NOM_SUBCLASE: e.SUBCLASIFICACION,

                    COD_DIAGNOSTICO: e.DIAGNOSTICO,
                    NOM_DIAGNOSTICO: e.NOM_DIAGNOSTICO,

                    COD_MIPRES: e.MIPRES == null ? '' : e.MIPRES,

                    MEDICO_TRATANTE: e.NOM_MEDICO,

                    COD_PRESTADOR_SOLICITANTE: e.NIT_SOLICITANTE,
                    NOM_PRESTADOR_SOLICITANTE: e.PRESTADOR_SOLICITANTE,

                    COD_PRESTADOR_ASIGNADO: e.NIT_ASIGNADO,
                    NOM_PRESTADOR_ASIGNADO: e.PRESTADOR_ASIGNADO,

                    CANTIDAD: e.CANTIDAD,
                    TIEMPO: e.TIEMPO
                  })
                }
                if (e.ETAPA == 1 && e.COD_CAUSA != 'TS') {
                  $scope.listCausas_Admision.push({

                    COD_CAUSA: e.COD_CAUSA,
                    NOM_CAUSA: e.CAUSA,
                    COD_MOTIVO: e.COD_MOTIVO,
                    NOM_MOTIVO: e.MOTIVO
                  })
                }
                //
                if (e.ETAPA == 3 && e.COD_CAUSA == 'TS') {
                  $scope.causaForm_Fallo.listCausasTecnologia.push({
                    COD_CAUSA: e.COD_CAUSA,
                    NOM_CAUSA: e.CAUSA,

                    COD_MOTIVO: e.COD_MOTIVO,
                    NOM_MOTIVO: e.MOTIVO,

                    COD_PRODUCTO: e.COD_PRODUCTO,
                    NOM_PRODUCTO: e.PROC_NOMBRE,

                    COD_SUBCLASE: e.COD_SUBCLASIFICACION,
                    NOM_SUBCLASE: e.SUBCLASIFICACION,

                    COD_DIAGNOSTICO: e.DIAGNOSTICO,
                    NOM_DIAGNOSTICO: e.NOM_DIAGNOSTICO,

                    COD_MIPRES: e.MIPRES == null ? '' : e.MIPRES,

                    MEDICO_TRATANTE: e.NOM_MEDICO,

                    COD_PRESTADOR_SOLICITANTE: e.NIT_SOLICITANTE,
                    NOM_PRESTADOR_SOLICITANTE: e.PRESTADOR_SOLICITANTE,

                    COD_PRESTADOR_ASIGNADO: e.NIT_ASIGNADO,
                    NOM_PRESTADOR_ASIGNADO: e.PRESTADOR_ASIGNADO,

                    CANTIDAD: e.CANTIDAD,
                    TIEMPO: e.TIEMPO
                  })
                }
                if (e.ETAPA == 3 && e.COD_CAUSA != 'TS') {
                  $scope.causaForm_Fallo.listCausasNoTecnologia.push({

                    COD_CAUSA: e.COD_CAUSA,
                    NOM_CAUSA: e.CAUSA,
                    COD_MOTIVO: e.COD_MOTIVO,
                    NOM_MOTIVO: e.MOTIVO
                  })
                }
                //
                if (e.ETAPA == 5 && e.COD_CAUSA == 'TS') {
                  $scope.causaForm_FalloImp.listCausasTecnologia.push({
                    COD_CAUSA: e.COD_CAUSA,
                    NOM_CAUSA: e.CAUSA,

                    COD_MOTIVO: e.COD_MOTIVO,
                    NOM_MOTIVO: e.MOTIVO,

                    COD_PRODUCTO: e.COD_PRODUCTO,
                    NOM_PRODUCTO: e.PROC_NOMBRE,

                    COD_SUBCLASE: e.COD_SUBCLASIFICACION,
                    NOM_SUBCLASE: e.SUBCLASIFICACION,

                    COD_DIAGNOSTICO: e.DIAGNOSTICO,
                    NOM_DIAGNOSTICO: e.NOM_DIAGNOSTICO,

                    COD_MIPRES: e.MIPRES == null ? '' : e.MIPRES,

                    MEDICO_TRATANTE: e.NOM_MEDICO,

                    COD_PRESTADOR_SOLICITANTE: e.NIT_SOLICITANTE,
                    NOM_PRESTADOR_SOLICITANTE: e.PRESTADOR_SOLICITANTE,

                    COD_PRESTADOR_ASIGNADO: e.NIT_ASIGNADO,
                    NOM_PRESTADOR_ASIGNADO: e.PRESTADOR_ASIGNADO,

                    CANTIDAD: e.CANTIDAD,
                    TIEMPO: e.TIEMPO
                  })
                }
                if (e.ETAPA == 5 && e.COD_CAUSA != 'TS') {
                  $scope.causaForm_FalloImp.listCausasNoTecnologia.push({

                    COD_CAUSA: e.COD_CAUSA,
                    NOM_CAUSA: e.CAUSA,
                    COD_MOTIVO: e.COD_MOTIVO,
                    NOM_MOTIVO: e.MOTIVO
                  })
                }
              });

              setTimeout(() => {
                if ($scope.registro.status == 2) {
                  $scope.listCausasTecnologia_Admision.forEach(e => {
                    $scope.causaForm_Fallo.listCausasTecnologia.push(e);
                  })
                  $scope.listCausas_Admision.forEach(e => {
                    $scope.causaForm_Fallo.listCausasNoTecnologia.push(e);
                  })
                  $scope.$apply();
                }
                if ($scope.registro.status == 4) {
                  $scope.listCausasTecnologia_Admision.forEach(e => {
                    $scope.causaForm_FalloImp.listCausasTecnologia.push(e);
                  })
                  $scope.listCausas_Admision.forEach(e => {
                    $scope.causaForm_FalloImp.listCausasNoTecnologia.push(e);
                  })

                }
              }, 2000);
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })
      }



      $scope.registrarBitacoraSeguimiento = function () {
        // $scope.bitacoraSeg_Observacion = '';
        // $("#bitacoraSeg_FechaPlazoCum").val()
        // $scope.bitacoraSeg_CadaCuanto = '';
        // $scope.bitacoraSeg_CuantoTiempo = '';

        // if (!$scope.bitacoraSeg_Observacion || !$("#bitacoraSeg_FechaPlazoCum").val() || !$scope.bitacoraSeg_CadaCuanto || !$scope.bitacoraSeg_CuantoTiempo) {
        // 	swal("Mensaje", '¡Debe diligenciar todos los campos!', "warning").catch(swal.noop); return
        // }

        swal({
          title: 'Cargando'
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: "p_ui_bitacora",
            numero: $scope.registro.codigotutela,
            ubicacion: $scope.registro.ubicacion,

            observacion: $scope.bitacoraSeg_Observacion,
            plazo: $("#bitacoraSeg_FechaPlazoCum").val(),
            recurrencia: $scope.bitacoraSeg_CadaCuanto,
            tiempo: $scope.bitacoraSeg_CuantoTiempo

          }
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.Codigo != '-1') {
              $scope.bitacoraSeg_Observacion = '';
              $("#bitacoraSeg_FechaPlazoCum").val('')
              $scope.bitacoraSeg_CadaCuanto = '';
              $scope.bitacoraSeg_CuantoTiempo = '';
              swal("Mensaje", '¡Bitacora guardada!', "success").catch(swal.noop);
            } else {
              swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })

      }

      $scope.listarBitacoraSeguimiento = function () {
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: "p_lista_bitacoras",
            numero: $scope.registro.codigotutela,
            ubicacion: $scope.registro.ubicacion
          }
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length) {
              $scope.listadoHistoricoBitacoras = data;
            } else {
              swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })

      }

      $scope.listarPQRAfiliado = function () {
        $scope.listadoPQRAfiliado = [];
        var tipoBusqueda = $scope.registro.numerotutela == undefined ? 'R' : 'C'
        // Registro //Consulta

        setTimeout(() => { $scope.$apply(); }, 500);
        if ($scope.registro.tipoidafiliado) {
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
              function: 'P_OBTENER_PQRDS_AFILIADO',
              tipoDoc: $scope.registro.tipoidafiliado,
              numDoc: $scope.registro.idafiliado,
              numeroTutela: $scope.registro.codigotutela,
              ubicacion: $scope.registro.ubicacion,
              tipoBusqueda
            }
          }).then(function ({ data }) {
            swal.close();
            if (data && data.toString().substr(0, 3) != '<br') {
              if (data.length) {
                data.forEach(e => e.SELECTED = false);
                $scope.listadoPQRAfiliado = data;
              }
            } else {
              swal("Mensaje", data, "warning").catch(swal.noop);
            }
          })
        }
      }
      $scope.obtenerPatologias = function () {
        if ($scope.registro.chkAtencionCohorte && $scope.registro.tipoidafiliado && $scope.registro.idafiliado) {
          $scope.listadoPatologiasAfiliado = [];

          if (!$scope.registro.numerotutela) {
            Promise.all([$scope.listarPatologiaAfiliado('AL'), $scope.listarPatologiaAfiliado('GS')]).then(values => {
              if ($scope.listadoPatologiasAfiliado.length == 0) {
                swal("Mensaje", 'El afiliado no tiene patologias en el sistema', "warning").catch(swal.noop);
                $scope.registro.chkAtencionCohorte = false;
                $scope.listadoPatologiasAfiliado = [];
                return
              }
            });
          } else {
            $scope.listarPatologiaAfiliado().then(res => { });
          }
        } else {
          $scope.listadoPatologiasAfiliado = [];
        }
      }

      $scope.listarPatologiaAfiliado = function (tipo) {
        // setTimeout(() => { $scope.$apply(); }, 500);
        return new Promise(function (resolve, reject) {
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
              function: "p_lista_cohortes",
              tipoDoc: $scope.registro.tipoidafiliado,
              numDoc: $scope.registro.idafiliado,
              tipo,
              tutela: $scope.registro.codigotutela
            }
          }).then(function ({ data }) {
            swal.close();
            if (data && data.toString().substr(0, 3) != '<br') {
              if (data.length >= 0) {
                data.forEach(element => {
                  $scope.listadoPatologiasAfiliado.push({
                    CODIGO: element.Codigo,
                    CONCEPTO: element.Concepto,
                    NOMBRE: element.Nombre,
                    TIPO_COD: tipo != undefined ? tipo : element.Tipo,
                    TIPO: tipo != undefined ? (tipo == 'AL' ? 'ALTOCOSTO' : 'GESTION DE RIESGO') : (element.Tipo == 'AL' ? 'ALTOCOSTO' : 'GESTION DE RIESGO'),
                    SELECTED: false
                  })
                });
                resolve(data.length)
                // $scope.listadoPatologiasAfiliado = data;
              }
            }
          })
        })
      }

      $scope.verObservacionPqr = function (obs) {
        swal({ title: 'Observación de la PQR:', text: obs, type: 'info', width: 800 }).catch(swal.noop);
      }

      $scope.descargafile = function (ruta) {
        swal({
          title: 'Cargando'
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'descargaAdjuntoGlobal',
            ruta
          }
        }).then(function (response) {
          swal.close()
          setTimeout(() => {
            window.open("temp/" + response.data);
          }, 500);
        });
      }


      $("#fechaRespuesta_GA").kendoDatePicker({
        format: "dd/MM/yyyy",
        culture: "es-MX",
      });
      $scope.registrarGestionArea = function (accion) {
        if (accion == 'M') {// Abrir Modal
          $('#modalGestionArea').modal('open');
          if (!$scope.listadoAreas_GA) {
            $scope.listadoAreas_GA = [];

            $scope.listadoHoras = [];

            for (let index = 0; index < 24; index++) {
              $scope.listadoHoras.push({ hora: (index < 10 ? '0' + index : index) + ':00' });
              $scope.listadoHoras.push({ hora: (index < 10 ? '0' + index : index) + ':30' });
            }
            $http({
              method: 'POST',
              url: "php/juridica/tutelas/functutelas.php",
              data: {
                function: "p_obtener_area",
              }
            }).then(function ({ data }) {
              swal.close();
              if (data && data.toString().substr(0, 3) != '<br') {
                if (data.length) {
                  $scope.listadoAreas_GA = data;
                } else {
                  swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
                }
              } else {
                swal("Mensaje", data, "warning").catch(swal.noop);
              }
            })
          }
        }

        if (accion == 'R') {
          setTimeout(() => { $scope.$apply(); }, 500);
          if (!$("#fechaRespuesta_GA").val() || !$scope.horaRespuesta_GA || !$scope.Observacion_GA || !$scope.area_GA || !$scope.funcionario_GA) {
            swal("Mensaje", '¡Debe completar todos los campos!', "warning").catch(swal.noop); return
          }
          swal({
            title: 'Cargando'
          });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
              function: "p_ui_areas_tutela",

              numero: $scope.registro.codigotutela,
              ubicacion: $scope.registro.ubicacion,

              hvencimiento: $scope.horaRespuesta_GA,
              fvencimiento: $("#fechaRespuesta_GA").val(),
              observacion: $scope.Observacion_GA,
              area: $scope.area_GA.toString().split('-')[0],
              funcionario: $scope.funcionario_GA.toString().split('-')[0],

              accion: 'I'
            }
          }).then(function ({ data }) {
            swal.close();
            if (data && data.toString().substr(0, 3) != '<br') {
              if (data.Codigo == '0') {
                swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                $scope.fechaRespuesta_GA = '';
                $("#fechaRespuesta_GA").val('');
                $scope.horaRespuesta_GA = '';
                $scope.Observacion_GA = '';
                $scope.area_GA = '';
                $scope.funcionario_GA = '';
                $scope.listadoFuncs_G = [];
              } else {
                swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
              }
            } else {
              swal("Mensaje", data, "warning").catch(swal.noop);
            }
          })


        }
      }
      $scope.changeFuncsGestionArea = function () {
        if ($scope.listadoAreas_GA) {
          $scope.listadoAreas_GA.forEach(e => {
            if (e.Codigo == $scope.area_GA.toString().split('-')[0]) {
              console.log(1)
              $scope.listarFuncsGestionArea(e.Codigo);
              setTimeout(() => { $scope.$apply(); }, 500);
            }
          });
        }
      }


      $scope.listarFuncsGestionArea = function (area) {
        $scope.listadoFuncs_G = [];
        swal({
          title: 'Cargando'
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: "p_obtener_funcionario",
            area
          }
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length) {
              if (data.length == 1) {
                $scope.funcionario_GA = data[0].cedula + '-' + data[0].Nombre;
              }
              $scope.listadoFuncs_GA = data;
            } else {
              swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })
      }

      $scope.gestionarEstadoTutela = function () {
        swal({
          title: 'Cargando'
        });
        swal.showLoading();

        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: "p_ui_archiva_tutela",
            numero: $scope.registro.codigotutela,
            ubicacion: $scope.registro.ubicacion,
            tipo: '40',
            observacion: $scope.observacionEstadoTutela,
            estado: $scope.registro.estadoTutelaModal ? 'A' : 'I',
            responsable: $scope.cedulalog,
          }
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.Codigo == 0) {
              swal("Mensaje", data.Nombre, "success").catch(swal.noop);
              $scope.cerrarModal("1");
              if ($scope.registro.estadoTutelaModal) {
                $scope.registro.pendiente_archivar = 'A';
                setTimeout(() => { $scope.$apply(); }, 500);
              }
            } else {
              swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })
      }


      $scope.guardarCohortesTutela = function () {
        if ($scope.listadoPatologiasAfiliado.filter(e => e.SELECTED).length == 0) {
          return;
        }
        const array = $scope.listadoPatologiasAfiliado.filter(e => e.SELECTED)
        swal({
          title: 'Cargando'
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: "p_ins_cohortes_tutela",
            numero: $scope.registro.codigotutela,
            ubicacion: $scope.registro.regionalTutela,
            // numero: '11907507',
            // ubicacion: '15001',
            datos: JSON.stringify(array),
            cantidad: array.length
          }
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length && data[0].Codigo != '-1') {
              // console.log(data)
              // swal("Mensaje", 'Causas guardadas', "warning").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })
      }

      $scope.guardarPQRDSTutela = function () {
        if ($scope.listadoPQRAfiliado.filter(e => e.SELECTED).length == 0) {
          return;
        }
        const array = $scope.listadoPQRAfiliado.filter(e => e.SELECTED)
        var datos = []
        array.forEach(e => {
          datos.push({ CODIGO: e.CODIGO })
        })
        swal({
          title: 'Cargando'
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: "p_ins_pqrs_tutela",
            numero: $scope.registro.codigotutela,
            ubicacion: $scope.registro.regionalTutela,
            // numero: '11907507',
            // ubicacion: '15001',
            datos: JSON.stringify(datos),
            cantidad: datos.length
          }
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length && data[0].Codigo != '-1') {
              // console.log(data)
              // swal("Mensaje", 'Causas guardadas', "warning").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "warning").catch(swal.noop);
          }
        })
      }


      $scope.formatPeso2 = function (num) {
        if (!num) return
        var regex2 = new RegExp("\\.");
        if (regex2.test(num)) {
          num = num.toString().replace('.', ',');
          num = num.split(',');
          num[0] = num[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
          num[0] = num[0].split('').reverse().join('').replace(/^[\.]/, '');
          if (num[1].length > 1 && num[1].length > 2) {
            num[1] = num[1].toString().substr(0, 2);
          }
          if (num[1].length == 1) {
            num[1] = num[1] + '0';
          }
          return num[0] + ',' + num[1];
        } else {
          num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
          num = num.split('').reverse().join('').replace(/^[\.]/, '');
          return num + ',00';
        }
      }

    }
  ]);
