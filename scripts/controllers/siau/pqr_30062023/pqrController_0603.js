'use strict';
angular.module('GenesisApp')
  .controller('pqrController', ['$scope', '$timeout', 'pqrHttp', 'ngDialog', '$filter', '$http', function ($scope, $timeout, pqrHttp, ngDialog, $filter, $http) {
    //Objects

    $(document).ready(function () {
      $('#trazapqr').modal();
      $('#modalcorrespondencia').modal();
      $('#modaltranferircorresp').modal();
      $('#modalpqcorrespondencia').modal();
      $('#historicopqr').modal();
      $('#modalcourier').modal();
      $('#modaltercero').modal();
      $('#modalsearchres').modal();
      $('#modalvalidardocumento').modal();
      $('#modaldevolucion').modal();
      $('#modalradicacion').modal();
      $scope.cedulausuario = sessionStorage.getItem('cedula');
    });


    $scope.dataSearch = { selectedDocumento: null, documento: null, tipo: null };
    $scope.data = {
      inactiveSolicitud: true, inactiveRv: true, inactiveNurc: true, inactiveSuperSalud: true, inactiveOtrosEntes: true, inactiveAcudiente: true,
      inactiveSearch: true, inactiveSearchAcudiente: true, inactiveSave: true, inactiveAfiliado: true, inactivePqr: true, inactiveIps: true, inactiveEmpleador: true,
      inactiveStrongIps: false, inactiveStrongAfiliado: false, inactiveStrongAcudiente: false, inactiveStrongEmp: false, inactiveSearchIps: true, inactiveSearchEmpleador: true, carga: true,
      cargAcudiente: true, collapsePqrComplement: true, inactiveTitleRv: true, collapseRv: true, stateRv: true, collapseIps: true, collapseEmp: true,
      requiredFile: false, inactiveRegistered: true, inactiveOptionsAfiliado: true, inactiveOptionsAcudiente: true, inactiveTwoOption: true, inactiveObjetivos: true,
      inactiveTitleComplement: true, sujeto: true, inactivecorrespondencia: true, inactiveRespuesta: false,
      requiredFileRad: null, requiredFileGes: null, requiredFileRadU: null, requiredFileGesU: null,
      inactivecorrespondenciaseccional: true
    }
    $scope.pqrData = {
      selectedtipoSolicitud: null, selectedRv: 'N', selectedCriteriObjetivo: null, selectedCriterioSubjetivo: null,
      selectedCriteriComplementario: null, selectedSujetosProteccionEspecial: null, selectedServicios: null, selectedMedicamentos: null,
      selectedmediosRecepcion: null, selectedOtrosEntesDeControl: null, sede: null, enteCodigo: null, selectedEntidad: null, textCodNurc: null, textCodPqrSuperSalud: null, selectedtipoRadicacion: null,
      User: {
        selectedDocumento: null, documento: null, nombre: null, fecha_nacimiento: null, selectedGenero: null, codmunicipio: null, municipio: null,
        ubicgeo: null, direccion: null, telefono: null, email: null, estado: null, regimen: null, selectedAcudiente: null,
        Acudiente: {
          selectedDocumento: null, documento: null, nombre: null, codmunicipio: null, municipio: null, direccion: null, telefono: null,
          email: null
        }
      }, Ips: { nit: null, ips: null, codmunicipio: null, municipio: null, direccion: null, ubicacion: null, email: null, telefono: null },
      Empleador: { tipodocumento: null, documento: null, nombre: null, codmunicipio: null, municipio: null, direccion: null, ubicacion: null, email: null, telefono: null },
      selectedMotivoEspecifico: null, pqrFile: null, ext: null, observaciones: null, selectedDias: null, selectedRespuesta: null, fecha_recibido: null,
      selectedTramite: 'S', selectedCorrespondencia: null, seccional: null, numfolio: null,
      tipo_tercero: null, tipo_documento_rad: null, documento_rad: null,
      Tercero: { documento: null, nombre: null, telefono: null, email: null, municipio: null, barrio: null, direccion: null, senor: null },
      NewTercero: { documento: null, nombre: null, telefono: null, correo: null, ubicacion: null, barrio: null, direccion: null },
      courier: null, nomcourier: null, numguia: null, remitente: null, destinatario: null,
      gradfile: null, gradext: null,
      NewOperador: { documento: null, nombre: null, telefono: null, municipio: null, servicio: null, ambito: null },
      EditCorresp: { pqr: null, consecutivo_correspondencia: null, tipo_correspondencia: null, medio: null, v_observacion: null, v_courier: null, v_numero_guia: null, v_remitente: null, v_destinatario: null, area_correspondencia: null, pqrfile: null, ext: null, gradfile: null, gradext: null, ggesfile: null, ggesext: null, ftp_ggesftp: null, ftp_gradftp: null },
      UpdateTercero: { documento: null, nombre: null, telefono: null, correo: null, ubicacion: null, barrio: null, direccion: null },
      t_seccional: null, clasificacion: null, motivoAltoCosto: null, motivoPatologia: null

    }
    $scope.motivo = { codigo: null, nombre: null, seleccion: null };
    $scope.depmunicipio = { codigo: null, nombre: null, seleccion: null };
    $scope.tempremitente = { codigo: null, nombre: null, seleccion: null };
    $scope.tempremitentedit = { codigo: null, nombre: null, seleccion: null };
    $scope.tempareajs = { codigo: null, nombre: null, seleccion: null };
    $scope.tempareajsedit = { codigo: null, nombre: null, seleccion: null };
    $scope.tabs = { tab: 'R' };
    $scope.filterPQRS = ''; //PQR-
    $scope.filterC = '';
    $scope.sedecorrespondencia = [{ Codigo: 'N', Nombre: 'NACIONAL' }, { Codigo: 'S', Nombre: 'SECCIONAL' }];

    $scope.pqcorrespondencia = [];

    $scope.soportepq = { 'file': null, 'filetemp': null, 'nombre': null };
    $scope.tiporad = [{ 'CODIGO': 'A', 'NOMBRE': 'AFILIADO' },
    { 'CODIGO': 'F', 'NOMBRE': 'FUNCIONARIO Y/O IPS' },
    { 'CODIGO': 'T', 'NOMBRE': 'TERCERO CORRESPODNENCIA' }]

    //Boolean Variables
    $scope.disabledFieldsAfiliado = false;
    $scope.acudienteBoolean = false;
    //Variables Pagination
    $scope.pages;
    $scope.records_per_page = 10;
    $scope.current_page = 1;
    $scope.arrayPages = [];
    $scope.pageActive = 1;
    $scope.inicio = 1;
    $scope.sum_records = 0;
    $scope.resultsP = null;
    $scope.resultsC = null;
    $scope.maxDate = null;
    $scope.jsonExport = [];
    $scope.firstDay = null;
    $scope.responsablesareas = [];
    $scope.firstDay = new Date(new Date().getFullYear(), 0, 1);
    $scope.maxDate = new Date();

    $scope.tabAfiliado = '1';
    $scope.tabAfiliadoTemp = '1';
    $scope.formatDate = function (date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }
    $scope.firstDay = $scope.formatDate($scope.firstDay);
    $scope.maxDate = $scope.formatDate($scope.maxDate);
    $scope.inactivetercero = true;
    $scope.inactiveterceronew = true;

    $scope.claseEstadoCorrep = 'orange'
    $scope.estadoCorrep = 'Activo';
    $scope.numconsecutivo = '';
    $scope.mensajeCorrep = 'Correspondencia Radicada';
    $scope.showmsj = true;


    //Requests to the server
    pqrHttp.getPrivideliosPQR().then(function (response) {
      $scope.privilegios = response;
    })

    pqrHttp.getSolicitud().then(function (response) {
      $scope.tipoSolicitud = response;
    })
    pqrHttp.getRiesgo().then(function (response) {
      $scope.rv = response;
    })

    pqrHttp.getOtrosEntesDeControl().then(function (response) {
      $scope.otrosEntesDeControl = response;
    })

    pqrHttp.getDocumento().then(function (response) {
      $scope.documento = response.Documento;
    })
    pqrHttp.getSexo().then(function (response) {
      $scope.generos = response.Sexo;
    })
    pqrHttp.getCriteriObjetivo().then(function (response) {
      $scope.criteriObjetivo = response;
    })
    pqrHttp.getCriterioSubjetivo().then(function (response) {
      $scope.criterioSubjetivo = response;
    })
    pqrHttp.getCriterioComplementario().then(function (response) {
      $scope.criterioComplementario = response;
    })
    pqrHttp.getSujetosproteccionespecial().then(function (response) {
      $scope.sujetosProteccionEspecial = response;
    })
    pqrHttp.getServicios().then(function (response) {
      $scope.servicios = response;
    })
    pqrHttp.getMedicamentos().then(function (response) {
      $scope.medicamentos = response;
    })
    pqrHttp.getAcudiente().then(function (response) {
      $scope.acudiente = response;
    })
    pqrHttp.getRespuestas().then(function (response) {
      $scope.respuestas = response;
    })
    pqrHttp.getDias().then(function (response) {
      $scope.dias = response;
    })

    $scope.responsable = sessionStorage.getItem('cedula');
    if ($scope.responsable == '1052991644' || $scope.responsable == '80091378' || $scope.responsable == '1045752491' ||
      $scope.responsable == '1130266682' || $scope.responsable == '1046267245' || $scope.responsable == '1002142520') {
      $scope.hidecorrespondencia = false;
    } else {
      $scope.hidecorrespondencia = true;
    }

    $scope.getPQRS = function (state) {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      pqrHttp.getPQRS(state, sessionStorage.getItem('cedula')).then(function (response) {

        $scope.pqrs = response;
        $scope.current_page = 1;
        $scope.arrayPages = [];
        $scope.pageActive = 1;
        $scope.inicio = 1;
        $scope.sum_records = 0;
        $scope.pages = Array($scope.numPages()).fill((x, i) => i).map((x, i) => i);
        $scope.changePage(1);
        swal.close();
      })
    }

    $scope.hidefiltroCorrespondencia = false;
    $scope.filterOptionsPqr = '';
    $scope.check_optiontc = false;
    $scope.check_optionc = false;
    $scope.temptipocorrepondencia = 'E';
    $scope.tempstatecorrepondencia = 'A';
    $scope.filterOptionsPqr = 'RA';
    $scope.filterOptionsEstado = 'A';
    $scope.getTipoCorrespondnecia = function (tipo) {
      $scope.check_optiontc = tipo;
      $scope.getCorrespondencia();
    }
    $scope.getStateCorrespondnecia = function (state) {
      console.log(state);
      $scope.check_optionc = state;
      $scope.getCorrespondencia();
    }
    $scope.getCorrespondencia = function () {
      pqrHttp.get_rol_correspondencia(sessionStorage.getItem('cedula')).then(function (response) {
        console.log(response.data);
        setTimeout(() => {
          if ($scope.hidefiltroCorrespondencia == false) {
            if (response.data.rol == 'T' || response.data.rol == 'R') {
              // console.log('Muestralo');
              $scope.hidecorrespondencia = false;
              $scope.hidefiltroCorrespondencia = true;
              $scope.filterOptionsPqr = 'RA';
            }

            if (response.data.rol == 'N') {
              // console.log('Ocultalo');
              $scope.hidecorrespondencia = true;
              $scope.hidefiltroCorrespondencia = false;
              $scope.filterOptionsPqr = 'RE';
            }
          }
          // console.log('$scope.hidefiltroCorrespondencia', $scope.hidefiltroCorrespondencia);
          if ($scope.check_optiontc == false) {
            // console.log("Enviada");
            $scope.temptipocorrepondencia = 'E';
            if ($scope.hidefiltroCorrespondencia == false) {
              $scope.filterOptionsPqr = 'RE';
            }
          }

          // console.log('$scope.hidefiltroCorrespondencia', $scope.hidefiltroCorrespondencia);
          if ($scope.check_optiontc == true) {
            // console.log("Recibida");
            $scope.temptipocorrepondencia = 'R';
            if ($scope.hidefiltroCorrespondencia == false) {
              $scope.filterOptionsPqr = 'RR';
            }
          }
          if ($scope.check_optionc == 'A') {
            // console.log("Activa");
            $scope.tempstatecorrepondencia = 'A';
          }


          if ($scope.check_optionc == 'P') {
            // console.log("Procesada");
            $scope.tempstatecorrepondencia = 'P';
          }

          if ($scope.check_optionc == 'D') {
            // console.log("Procesada");
            $scope.tempstatecorrepondencia = 'D';
          }





          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });



          pqrHttp.getCorrespondencia($scope.tempstatecorrepondencia, sessionStorage.getItem('cedula'), $scope.temptipocorrepondencia, $scope.filterOptionsPqr).then(function (response) {
            $scope.correspondencias = response;
            swal.close();
          })

        }, 100);






      })
      // }

    }
    //Funtions
    $scope.cancelPqr = function () {//Funcion para hacer reset al formulario
      swal({
        title: 'Confirmar Proceso',
        text: '¿Desea cancelar la tabulación?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then(function () {
        $timeout(function () {
          $scope.pqrData.selectedtipoSolicitud = null; $scope.data.inactiveSolicitud = true; $scope.resetDataForm();
        }, 100);
      }).catch(swal.noop);
    }//Fin
    $scope.validateFiels = function () {//Valida que archivo no tenga errores
      if ($scope.data.requiredFile == false) {
        if ($scope.pqrData.selectedtipoSolicitud != 'E' && $scope.pqrData.selectedtipoRadicacion == 'A') {
          if ($scope.pqrData.motivoAltoCosto && $scope.pqrData.motivoPatologia) {
            $scope.insert();
          } else {
            swal('No completado', '¡Debe seleccionar motivo Altocosto y motivo Patologia!', 'error').catch(swal.noop);
          }
        } else {
          $scope.insert();
        }
      } else {
        swal('No completado', 'Verifica la extensión o peso del archivo!', 'error').catch(swal.noop);
      }
    }//Fin

    $scope.rangepqr = 'Sin clasificación';
    $scope.classrangepqr = '';
    $scope.form = {
      value: 0
    };
    $scope.min = 0;
    $scope.max = 100;
    $scope.sliderToNumber = function (value) {
      // console.log(value);
      if (value == 0) {
        $scope.rangepqr = 'Sin clasificación';
        $scope.classrangepqr = '';
        $scope.pqrData.clasificacion = '';
      }
      if (value == 20) {
        $scope.rangepqr = "Vip Latentes";
        $scope.classrangepqr = '#008001';
        $scope.pqrData.clasificacion = '1';
      }
      if (value == 40) {
        $scope.rangepqr = "Vip Multicausal";
        $scope.classrangepqr = '#ffcc00';
        $scope.pqrData.clasificacion = '2';
      }
      if (value == 60) {
        $scope.rangepqr = "Vip";
        $scope.classrangepqr = '#f3f315';
        $scope.pqrData.clasificacion = '3';
      }
      if (value == 80) {
        $scope.rangepqr = "Vip Especial";
        $scope.classrangepqr = '#ff6600';
        $scope.pqrData.clasificacion = '4';
      }
      if (value == 100) {
        $scope.rangepqr = "Vip Súper especial";
        $scope.classrangepqr = '#fe0000';
        $scope.pqrData.clasificacion = '5';
      }
    }

    $scope.insert = function () {//Hace la request al servidor para insertar el PQR
      if ($scope.pqrData.seletedcorrepondencia == 'E') {
        $scope.pqrData.tipo_tercero = 'D';
        $scope.area.Codigo = 0;
      }
      if ($scope.pqrData.seletedcorrepondencia == 'R') {
        $scope.pqrData.tipo_tercero = 'R';
        $scope.area.Codigo = $scope.area.Codigo;
      }

      if ($scope.pqrData.selectedtipoSolicitud == 'E') {
        $scope.pqrData.selectedRv = 'N';
      }
      $scope.json = JSON.stringify({
        'tiposolicitud': $scope.pqrData.selectedtipoSolicitud,
        'mediorecepcion': $scope.pqrData.selectedmediosRecepcion,
        'tiporadicacion': $scope.pqrData.selectedtipoRadicacion,
        'codnurc': $scope.pqrData.textCodNurc,
        'codpqrsupersalud': $scope.pqrData.textCodPqrSuperSalud,
        'otrosentesdecontrol': $scope.pqrData.selectedOtrosEntesDeControl == null ? "0" : $scope.pqrData.enteCodigo,
        'entidad': $scope.pqrData.selectedEntidad == null ? "0" : $scope.pqrData.selectedEntidad,
        'sede': $scope.pqrData.sede,
        'nitips': $scope.pqrData.Ips.nit,
        'municipioips': $scope.pqrData.Ips.codmunicipio,
        'direccionips': $scope.pqrData.Ips.direccion,
        'telefonoips': $scope.pqrData.Ips.telefono,
        'emailips': $scope.pqrData.Ips.email,
        'ubicacion': $scope.pqrData.Ips.ubicacion,
        'tipodocumento': $scope.pqrData.User.selectedDocumento.Codigo == "" ? null : $scope.pqrData.User.selectedDocumento,
        'documento': $scope.pqrData.User.documento,
        'email': $scope.pqrData.User.email,
        'direccion': $scope.pqrData.User.direccion,
        'telefono': $scope.pqrData.User.telefono,
        'regimen': $scope.pqrData.User.regimen,
        'selectedacudiente': ($scope.pqrData.User.selectedAcudiente == null || $scope.pqrData.User.selectedAcudiente == "") ? 'N' : 'S',
        'tipodocumentoacudiente': $scope.pqrData.User.Acudiente.selectedDocumento.Codigo == "" ? null : $scope.pqrData.User.Acudiente.selectedDocumento,
        'documentoacudiente': $scope.pqrData.User.Acudiente.documento,
        'nombreacudiente': $scope.pqrData.User.Acudiente.nombre,
        'codmunicipioacudiente': $scope.pqrData.User.Acudiente.codmunicipio,
        'direccionacudiente': $scope.pqrData.User.Acudiente.direccion,
        'ubicgeo': $scope.pqrData.User.ubicgeo,
        'telefonoacudiente': $scope.pqrData.User.Acudiente.telefono,
        'emailacudiente': $scope.pqrData.User.Acudiente.email,
        'tipodocumentoemp': $scope.pqrData.Empleador.tipodocumento,
        'documentoemp': $scope.pqrData.Empleador.documento,
        'selectedrv': $scope.pqrData.selectedRv,
        'criteriobjetivo': $scope.pqrData.selectedCriteriObjetivo,
        'criteriosubjetivo': $scope.pqrData.selectedCriterioSubjetivo,
        'critericomplementario': $scope.pqrData.selectedCriteriComplementario,
        'sujetosproteccionespecial': $scope.pqrData.selectedSujetosProteccionEspecial,
        'servicios': $scope.pqrData.selectedServicios,
        'medicamentos': $scope.pqrData.selectedMedicamentos,
        'observaciones': $scope.pqrData.observaciones,
        'ext': $scope.pqrData.ext,
        'macromotivo': null,
        'motivoespecifico': $scope.pqrData.selectedtipoSolicitud == 'E' ? '0' : $scope.pqrData.selectedMotivoEspecifico,
        'motivogeneral': null,
        'diashabiles': $scope.pqrData.selectedDias,
        'fecharecibido': $filter('date')($scope.pqrData.fecha_recibido, 'dd/MM/yyyy'),
        'respuestapqr': $scope.pqrData.selectedRespuesta,
        'tramite': $scope.pqrData.selectedTramite,
        'correspondencia': $scope.pqrData.selectedCorrespondencia,
        'areacorrespondencia': $scope.area.Codigo,
        'responsable': $scope.responsable,
        'medioradicado': 'G',
        'seccional': $scope.pqrData.seccional == null ? sessionStorage.getItem('municipio') : $scope.pqrData.seccional,
        'remitente': $scope.pqrData.remitente,
        'destinatario': $scope.pqrData.destinatario,
        'courier': $scope.pqrData.courier,
        'numero_guia': $scope.pqrData.numguia,
        'gext': $scope.pqrData.gradext,
        'numero_folio': $scope.pqrData.numfolio,
        'senor': $scope.pqrData.Tercero.senor,
        'dir_tercero': $scope.pqrData.Tercero.direccion,
        'tel_tercero': $scope.pqrData.Tercero.telefono,
        'tipo_tercero': $scope.pqrData.tercero,
        'tipo_documento_rad': $scope.pqrData.tipo_documento_rad,
        'documento_rad': $scope.pqrData.documento_rad,
        'roluser': sessionStorage.getItem('rolcod'),
        'ubicacionrad': sessionStorage.getItem('municipio'),
        'ftp': '3',
        't_seccional': $scope.pqrData.t_seccional,
        'clasificacion': $scope.pqrData.clasificacion,
        'motivo_altocosto': $scope.pqrData.motivoAltoCosto,
        'motivo_patologia': $scope.pqrData.motivoPatologia
      });
      // console.log(JSON.stringify($scope.json));
      swal({ title: 'Cargando datos del PQR' }).catch(swal.noop);
      swal.showLoading();
      if (sessionStorage.getItem('cedula')) {
        pqrHttp.postPqr($scope.json, $scope.pqrData.pqrFile, null, 'I', $scope.pqrData.gradfile).then(function (res) {
          // console.log(res);

          swal(res.data.Codigo == '1' ? 'Completado' : 'No completado', res.data.Nombre, res.data.Codigo == '1' ? 'success' : 'error'
          ).then(function () {
            if (res.data.Codigo == '1') {
              // $scope.Actualizar_Pqr_cargadas();
              if (res.data.codigocorres) {
                $timeout(function () {
                  $scope.numconsecutivo = res.data.codigocorres;
                  $scope.showmsj = false;
                }, 100)

              } else {
                $timeout(function () {
                  $scope.pqrData.selectedtipoSolicitud = null; $scope.data.inactiveSolicitud = true; $scope.resetDataForm();
                }, 100)
              }

            } else if (res.data.Codigo == '0') {


              //validaciones usadas para aplicarle top  a la pagina cuando exista un campo requerido vacio
              let nomError = (res.data.Nombre).toLowerCase();
              if (nomError.indexOf('afiliado') != -1) {
                window.scrollTo(0, $('#datosAfiliado').position().top);
              }
              if (nomError.indexOf('ips') != -1) {
                window.scrollTo(0, $('#ips').position().top);
              }
              if (nomError.indexOf('acudiente') != -1) {
                window.scrollTo(0, $('#datosAcudiente').position().top);
              }
              if (nomError.indexOf('riesgo') != -1) {
                window.scrollTo(0, $('#datosRiegovida').position().top);
              }
              if (nomError.indexOf('nurc') != -1 || nomError.indexOf('supersalud') != -1 || res.data.Nombre.indexOf('ente de control') != -1) {
                window.scrollTo(0, 0);
              }
            }
          }).catch(swal.noop);
        })
      } else {
        swal({
          title: "Genesis",
          type: "info",
          text: "Cerrando Sesión El navegador Perdio los datos del usuario",
          timer: 5000,
          onOpen: () => {
            swal.showLoading()
          }
        }).then((result) => {
          if (result.dismiss === 'timer') {
            window.location.href = 'php/cerrarsession.php';
          }
        }).catch(function (error) {
          window.location.href = 'php/cerrarsession.php';
        });
      }
    }//Fin
    //Funtions of the Selects
    $scope.tempsol = '';
    $scope.seletedcorrepondencia = '';
    $scope.changeSolicitud = function (solicitud) {//Funcion para validar solicitud
      console.log(solicitud);
      if (solicitud != '') {
        $scope.tempsol = JSON.parse(solicitud);
        setTimeout(() => {
          $scope.pqrData.selectedtipoSolicitud = $scope.tempsol.Codigo;
        }, 100);

        pqrHttp.getMediosRecepcionTipo($scope.tempsol.Tipo).then(function (response) {
          $scope.mediosRecepcion = response;
        })
        $scope.data.inactiveSolicitud = false;

        if ($scope.tempsol.Codigo == 'E') {
          $scope.nomarea = "";
          pqrHttp.get_areas().then(function (response) {
            $scope.areaspqr = response;
          })
          $scope.getdocumentosrad();
          $scope.data.collapsePqrComplement = true;
          $scope.seletedcorrepondencia = 'P';
        }

      } else {
        $scope.data.inactiveSolicitud = true; $scope.resetDataForm(); $scope.resetIps(); $scope.resetEmpleador();
      }
    }//Fin
    $scope.resetDataForm = function () {//Funcion para reset data form
      $scope.pqrData.selectedRv = 'N'; $scope.pqrData.selectedmediosRecepcion = null; $scope.pqrData.selectedtipoRadicacion = '';
      $scope.pqrData.pqrFile = null; $scope.pqrData.ext = null; $scope.pqrData.observaciones = null; $scope.pqrData.textCodNurc = null;
      $scope.pqrData.selectedDias = null; $scope.pqrData.textCodPqrSuperSalud = null; $scope.data.inactiveRv = true;
      $scope.data.inactiveSuperSalud = true; $scope.data.inactiveOtrosEntes = true; $scope.data.inactiveNurc = true;
      $scope.data.inactiveSearchAcudiente = true; $scope.data.inactiveAcudiente = true; $scope.data.inactiveAfiliado = true;
      $scope.data.inactivePqr = true; $scope.data.inactiveTitleComplement = true; $scope.data.inactiveSave = true;
      $scope.data.inactiveIps = true; $scope.data.inactiveEmpleador = false; $scope.data.inactiveStrongIps = false; $scope.data.inactiveStrongAfiliado = false;
      $scope.data.inactiveStrongAcudiente = false; $scope.data.formato = ''; $scope.inactiveOptionsAcudiente = true;
      if (document.getElementById('inputFilePlaceHolder')) { document.getElementById('inputFilePlaceHolder').value = ''; }
      if (document.getElementById('pqrfile')) { document.getElementById('pqrfile').value = ''; } $scope.data.inactiveOptionsAfiliado = true;
      $scope.data.inactiveEmpleador = true; $scope.data.inactiveSearchEmpleador = true; $scope.inactiveStrongEmp = true;
      $scope.data.collapsePqrComplement = true; $scope.data.inactiveTitleRv = true; $scope.data.collapseRv = true; $scope.pqrData.sede = null;
      $scope.data.stateRv = true; $scope.data.collapseIps = true; $scope.acudienteBoolean = false; $scope.disabledDias = true;
      $scope.motivo = { codigo: null, nombre: null, seleccion: null }; $scope.motivoEspecifico = { codigo: null, nombre: null };
      $scope.pqrData.fecha_recibido = null; $scope.pqrData.selectedOtrosEntesDeControl = null;
      $scope.pqrData.selectedEntidad = null; $scope.pqrData.enteCodigo = null; $scope.data.sujeto = true; $scope.tempsol = '';
      $scope.selectedtipoSolicitud = ''; $scope.data.inactivecorrespondencia = true;
      $scope.pqrData.selectedTramite = 'S'; $scope.pqrData.selectedCorrespondencia = null; $scope.pqrData.seccional = null; $scope.pqrData.numfolio = null; $scope.pqrData.tipo_tercero = null;
      $scope.pqrData.Tercero.documento = null; $scope.pqrData.Tercero.nombre = null; $scope.pqrData.Tercero.telefono = null; $scope.pqrData.Tercero.email = null;
      $scope.pqrData.Tercero.municipio = null; $scope.pqrData.Tercero.barrio = null; $scope.pqrData.Tercero.direccion = null; $scope.pqrData.Tercero.senor = null;
      $scope.pqrData.courier = null; $scope.pqrData.nomcourier = null; $scope.pqrData.numguia = null;//$scope.pqrData.remitente= null;
      $scope.pqrData.destinatario = null; $scope.pqrData.gradfile = null; $scope.pqrData.gradext = null;
      $scope.pqrData.tipo_documento_rad = null; $scope.pqrData.documento_rad = null;
      $scope.tabAfiliadoTemp = '1';
      $scope.pqrData.motivoAltoCosto = "";
      $scope.pqrData.motivoPatologia = "";
    }//Fin
    $scope.changeRv = function (riesgo) {//Funcion para validar si aplica o no en riesgo de vida
      console.log("riesgo", riesgo);
      if (riesgo == 'S') {
        $scope.data.inactiveRv = false; $scope.data.collapseRv = false; $scope.data.stateRv = false;
        $scope.pqrData.selectedRv = 'S';
      } else {
        $scope.resetRv();
      }
      $scope.validateDias();
    }//Fin
    $scope.collapseRiegoVida = function () {//Funcion para collapse riesgo vida
      $scope.data.collapseRv = !$scope.data.collapseRv;
    }//Fin
    $scope.changeComplement = function (criterio) {
      if (criterio != '3') {
        $scope.pqrData.selectedSujetosProteccionEspecial = null;
        $scope.data.sujeto = true;
      } else {
        $scope.data.sujeto = false;
        $scope.pqrData.selectedSujetosProteccionEspecial = "0";
      }
    }//Fin
    $scope.getEnteControl = function (ente) {//Funcion para obtener el ente de control y la sede
      if (ente) {
        $scope.pqrData.sede = JSON.parse(ente).SEDE;
        $scope.pqrData.enteCodigo = JSON.parse(ente).CODIGO;
        if ($scope.pqrData.sede == 'S') {
          pqrHttp.getEntidades($scope.pqrData.enteCodigo).then(function (response) {
            $scope.entidades = response;

          })
        } else {
          $scope.pqrData.selectedEntidad = null;
        }

        if ($scope.pqrData.enteCodigo == '10') {//Valida que el ente de control seal portal web SuperSalud
          $scope.data.inactiveSuperSalud = false; $scope.pqrData.selectedDias = null;

        } else {
          $scope.data.inactiveSuperSalud = true; $scope.pqrData.textCodPqrSuperSalud = null;
        }
      } else {
        $scope.pqrData.sede = null;
        $scope.pqrData.enteCodigo = null;
        $scope.data.inactiveSuperSalud = true; $scope.pqrData.textCodPqrSuperSalud = null;
      }
      $scope.validateDias();
    }//Fin
    $scope.collapseDatosComplement = function () {//Funcion para collapse datos complementarios pqr
      $scope.data.inactivePqr = !$scope.data.inactivePqr;
    }//Fin

    $scope.seCorrespondencia = '';
    $scope.changeMediosRecepcion = function (medio) {//Funcion para validar SelectOtrosEntes y opciones
      if (medio == '13') {
        $scope.data.inactiveNurc = false; $scope.data.inactiveTwoOption = true; $scope.data.inactiveOtrosEntes = false;
        $scope.pqrData.selectedOtrosEntesDeControl = null; $scope.pqrData.sede = null;
        $scope.pqrData.selectedEntidad = null;
        $scope.data.inactivecorrespondencia = true;
      } else {
        $scope.data.inactiveNurc = true; $scope.data.inactiveTwoOption = false;
        if (medio == '') { $scope.data.inactiveTwoOption = true; } $scope.pqrData.textCodNurc = null;
        $scope.pqrData.textCodPqrSuperSalud = null; $scope.data.inactiveSuperSalud = true; $scope.data.inactiveOtrosEntes = true;
        $scope.pqrData.selectedOtrosEntesDeControl = null;
        $scope.pqrData.selectedEntidad = null;
        $scope.pqrData.sede = null; $scope.pqrData.enteCodigo = null;
      }
      if (medio == '13') {
        $scope.data.inactivecorrespondencia = true;
        pqrHttp.getTipoRadicacion('S').then(function (response) {
          $scope.tipoRadicacion = response;
        })
      }
      if (medio != '13' && $scope.pqrData.selectedtipoSolicitud != 'E') {
        $scope.data.inactivecorrespondencia = true;
        pqrHttp.getTipoRadicacion('N').then(function (response) {
          $scope.tipoRadicacion = response;
          $scope.seCorrespondencia = '';
        })
      }
      if (medio != '13' && $scope.pqrData.selectedtipoSolicitud == 'E') {
        pqrHttp.getTipoRadicacion('C').then(function (response) {
          $scope.tipoRadicacion = response;

          $scope.seCorrespondencia = 'P';
          $scope.pqrData.selectedtipoRadicacion = 'P';
          $scope.changeTipoRadicacion($scope.pqrData.selectedtipoRadicacion);
        })
      }
      $scope.validateDias();
      // if (medio == '5') {
      //     $scope.pqrData.sede = 'S';
      // }
      if ($scope.pqrData.selectedtipoRadicacion == 'A') {//Valida tipo de radicacion Afiliado
        $scope.pqrData.selectedtipoRadicacion = 'A';//Asigna tipo de radicacion Afiliado
      }
      if ($scope.pqrData.selectedtipoRadicacion == 'I') {//Valida tipo de radicacion Ips
        $scope.pqrData.selectedtipoRadicacion = 'I';//Asigna tipo de radicacion Ips
      }
      if ($scope.pqrData.selectedtipoRadicacion == 'E') {//Valida tipo de radicacion Entidad de vigilancia y control
        $scope.pqrData.selectedtipoRadicacion = 'A';//Asigna tipo de radicacion Afiliado
        $scope.data.inactiveOptionsAcudiente = false; //Inactiva el select Acudiente
      }
      if (medio == '') {
        $scope.pqrData.selectedmediosRecepcion = null; $scope.data.inactiveAfiliado = true; $scope.data.inactivePqr = true;
        $scope.data.inactiveSearch = true; $scope.data.inactiveIps = true; $scope.data.inactiveOptionsAfiliado = true;
        $scope.data.inactiveSave = true; $scope.data.inactiveSearchIps = true; $scope.data.inactiveAcudiente = true; $scope.data.inactiveSearchEmpleador = true;
        $scope.data.inactiveStrongIps = false; $scope.data.inactiveStrongAfiliado = false; $scope.data.inactiveStrongAcudiente = false;
        $scope.data.inactiveTitleComplement = true; $scope.data.collapsePqrComplement = true; $scope.data.inactiveRv = true;
        $scope.data.inactiveTitleRv = true; $scope.data.collapseIps = true; $scope.acudienteBoolean = false;
        $scope.pqrData.selectedDias = null; $scope.disabledDias = false; $scope.pqrData.textCodNurc = null;
        $scope.pqrData.textCodPqrSuperSalud = null; $scope.pqrData.selectedOtrosEntesDeControl = null;
        $scope.pqrData.sede = null; $scope.pqrData.selectedEntidad = null;
        $scope.pqrData.enteCodigo = null; $scope.resetIps(); $scope.resetRv(); $scope.pqrData.selectedtipoRadicacion = null;
        $scope.data.inactiveRv = true;
        $scope.motivo = { codigo: null, nombre: null, seleccion: null }; $scope.data.inactiveSuperSalud = true;
        $scope.motivoEspecifico = { codigo: null, nombre: null }; $scope.inactiveOptionsAcudiente = true;
      }

    }//Fin
    $scope.resetRv = function () {//Funcion para reset  riego vida
      $scope.inactiveRv = true; $scope.data.stateRv = true; $scope.data.collapseRv = true;
      $scope.pqrData.selectedRv = 'N';
      $scope.pqrData.selectedCriteriObjetivo = null; $scope.pqrData.selectedMedicamentos = null; $scope.pqrData.selectedCriterioSubjetivo = null;
      $scope.pqrData.selectedCriteriComplementario = null; $scope.pqrData.selectedSujetosProteccionEspecial = null; $scope.pqrData.selectedServicios = null;
      $scope.data.sujeto = true;
    }//Fin
    $scope.changeTipoRadicacion = function (afectado) {//Funcion  para validar select tipo radicación
      // console.log('afectado', afectado);
      if (afectado == '') {
        $scope.data.inactiveIps = true; $scope.data.inactiveOptionsAfiliado = true; $scope.data.inactiveEmpleador = true;
      } else {
        if (afectado == 'A') {//Valida tipo de radicacion Afiliado
          $scope.data.inactiveIps = true; $scope.data.inactiveOptionsAfiliado = false; $scope.data.inactiveOptionsAcudiente = false;
          $scope.data.inactivePqr = true; $scope.data.inactiveEmpleador = true; $scope.data.inactiveTitleRv = true;
          $scope.pqrData.selectedRv = 'N';
          $scope.data.inactiveTitleComplement = true;
          $scope.data.collapsePqrComplement = true;


        }
        if (afectado == 'I') {//Valida tipo de radicacion Ips
          $scope.data.inactiveIps = false; $scope.data.inactiveOptionsAfiliado = true; $scope.data.inactiveOptionsAcudiente = true;
          $scope.data.inactivePqr = true; $scope.data.inactiveTitleRv = true; $scope.data.inactiveEmpleador = true;
          $scope.pqrData.selectedRv = 'N';
          $scope.data.inactiveTitleComplement = true;
          $scope.data.collapsePqrComplement = true;
        }
        if (afectado == 'E') {//Valida tipo de radicacion Entidad de vigilancia y control
          $scope.data.inactiveIps = true; $scope.data.inactiveOptionsAfiliado = true; $scope.data.inactiveOptionsAcudiente = true;
          $scope.data.inactivePqr = false; $scope.data.inactiveTitleRv = false; $scope.data.inactiveEmpleador = true;
          $scope.data.inactiveTitleComplement = false;
          $scope.data.collapsePqrComplement = false;
          $scope.pqrData.selectedRv = 'N';
          $scope.validateDias();
          if ($scope.pqrData.selectedtipoSolicitud == 'E') {
            $scope.data.inactiveOtrosEntes = false;
          }

        }
        if (afectado == 'M') {//Valida tipo de radicacion Empleador
          $scope.data.inactiveEmpleador = false; $scope.data.inactiveIps = true; $scope.data.inactiveOptionsAfiliado = true; $scope.data.inactiveOptionsAcudiente = true;
          $scope.data.inactivePqr = true; $scope.data.inactiveTitleRv = true;
          $scope.pqrData.selectedRv = 'N';
          $scope.data.inactiveTitleComplement = true;
          // $scope.data.collapsePqrComplement = true;
        }
        if (afectado == 'P') {//Valida tipo de radicacion Proceso Admin
          // console.log("Proceso admin");
          $scope.data.inactivePqr = true;
          $scope.data.inactiveEmpleador = true; $scope.data.inactiveIps = true; $scope.data.inactiveOptionsAfiliado = true;
          $scope.data.inactiveOptionsAcudiente = true; $scope.data.inactiveTitleRv = true;
          $scope.pqrData.selectedRv = 'N';
          $scope.data.inactiveTitleComplement = true;
          $scope.data.inactivecorrespondencia = true;

          pqrHttp.get_tipo_correspondencia().then(function (response) {

            $scope.tipocorrespondencia = response;
          })
          $scope.validateDias();

          if ($scope.pqrData.selectedtipoSolicitud == 'E') {
            $scope.data.collapsePqrComplement = true;

            if (sessionStorage.getItem('municipio') == '1') {
              $scope.pqrData.sede = 'N';
              $scope.data.inactivecorrespondencia = false;
            } else {
              $scope.pqrData.sede = 'S';
              $scope.data.inactivecorrespondencia = true;
            }
          }

        }


      }
      setTimeout(() => {
        $scope.pqrData.selectedCorrespondencia = '';
      }, 100);
      $scope.resetUser(); $scope.resetIps(); $scope.resetEmpleador(); $scope.resetRv();
      $scope.data.inactiveSearch = true; $scope.data.inactiveSearchAcudiente = true; $scope.data.inactiveAfiliado = true;
      $scope.data.inactiveSave = true; $scope.pqrData.selectedMotivoEspecifico = null;
      $scope.pqrData.pqrFile = null; $scope.pqrData.observaciones = null; $scope.data.inactiveSearchIps = true; $scope.data.inactiveSearchEmpleador = true;
      $scope.pqrData.selectedRespuesta = null; $scope.pqrData.fecha_recibido = null;
      $scope.data.inactiveStrongIps = false; $scope.data.inactiveStrongAfiliado = false; $scope.data.inactiveStrongAcudiente = false;
      if (document.getElementById("inputFilePlaceHolder")) { document.getElementById("inputFilePlaceHolder").value = ""; }
      if (document.getElementById("pqrfile")) { document.getElementById("pqrfile").value = ""; }
      $scope.pqrData.pqrFile = null; $scope.data.formato = ""; $scope.data.inactiveObjetivos = true;
      $scope.data.requiredAfiliadoAcudienteIps = true; $scope.data.inactiveRv = true;
      $scope.data.stateRv = true; $scope.data.collapseRv = true; $scope.data.collapseIps = true;
      $scope.acudienteBoolean = false; $scope.disabledFieldDias = false;
      $scope.motivo = { codigo: null, nombre: null, seleccion: null }; $scope.motivoEspecifico = { codigo: null, nombre: null };
    }//Fin



    $scope.changetipoCorrespondencia = function () {
      if ($scope.pqrData.selectedCorrespondencia == '') {
        console.log('selectedCorrespondencia__', $scope.pqrData.selectedCorrespondencia);
        console.log("Proceso admin");
        $scope.data.inactivePqr = true;
        $scope.data.inactiveEmpleador = true; $scope.data.inactiveIps = true; $scope.data.inactiveOptionsAfiliado = true;
        $scope.data.inactiveOptionsAcudiente = true; $scope.data.inactiveTitleRv = true;
        $scope.pqrData.selectedRv = 'N'; $scope.data.inactiveTitleComplement = true;
        $scope.data.inactivecorrespondencia = true;
        $scope.validateDias();
        $scope.data.inactiveSave = true;
        $scope.data.inactiveRespuesta = true;
      } else {
        console.log('selectedCorrespondencia__', $scope.pqrData.selectedCorrespondencia);
        console.log("Proceso admin");
        $scope.data.inactivePqr = false;
        $scope.data.inactiveEmpleador = true; $scope.data.inactiveIps = true; $scope.data.inactiveOptionsAfiliado = true;
        $scope.data.inactiveOptionsAcudiente = true; $scope.data.inactiveTitleRv = true;
        $scope.pqrData.selectedRv = 'N'; $scope.data.inactiveTitleComplement = false;
        //$scope.data.inactivecorrespondencia = false;
        if ($scope.pqrData.selectedtipoSolicitud == 'E') {
          $scope.data.collapsePqrComplement = true;

          if (sessionStorage.getItem('municipio') == '1') {
            $scope.pqrData.sede = 'N';
            $scope.data.inactivecorrespondencia = false;
          } else {
            $scope.pqrData.sede = 'S';
            $scope.data.inactivecorrespondencia = true;
          }
        }

        $scope.validateDias();
        $scope.data.inactiveSave = false;
        $scope.data.inactiveRespuesta = true;
      }

    }
    $scope.resetUser = function () {//Funcion para hacer reset a los datos del Afiliado
      $scope.pqrData.User = {
        selectedDocumento: { "Codigo": "" }, documento: null, nombre: null, fecha_nacimiento: null,
        selectedGenero: null, codmunicipio: null, municipio: null, direccion: null, ubicgeo: null, telefono: null,
        email: null, ips: null, nit: null, nombreEntidad: null, selectedAcudiente: null,
        Acudiente: {
          selectedDocumento: { "Codigo": "" }, documento: null, nombre: null, codmunicipio: null, municipio: null, direccion: null, telefono: null, email: null
        }
      }
    }//Fin
    $scope.changeAcudiente = function (params) {//Funcion para validar si el afiliado tiene un acudiente o no
      if (params == 'S') {
        $scope.data.inactiveAcudiente = false; $scope.acudienteBoolean = true;
      } else {
        $scope.data.inactiveAcudiente = true;
        if ($scope.acudienteBoolean) {
          $scope.acudienteBoolean = !$scope.acudienteBoolean;
        }
        if ($scope.data.inactiveStrongAcudiente) {
          $scope.data.inactiveStrongAcudiente = !$scope.data.inactiveStrongAcudiente;
        }
      }
      if ($scope.data.inactiveSearchAcudiente == false) {
        $scope.data.inactiveSearchAcudiente = !$scope.data.inactiveSearchAcudiente;
      }
      $scope.data.requiredAfiliadoAcudienteIps = true; $scope.resetAcudiente();
    }//Fin
    $scope.resetAcudiente = function () {//Funcion para reset data acudiente
      $scope.pqrData.User.Acudiente.selectedDocumento = { "Codigo": "" }; $scope.pqrData.User.Acudiente.documento = null;
      $scope.pqrData.User.Acudiente.nombre = null; $scope.pqrData.User.Acudiente.codmunicipio = null; $scope.pqrData.User.Acudiente.telefono = null;
      $scope.pqrData.User.Acudiente.municipio = null; $scope.pqrData.User.Acudiente.direccion = null; $scope.pqrData.User.Acudiente.email = null;
      $scope.depmunicipio = { codigo: null, nombre: null, seleccion: null };
    }//Fin
    $scope.changeRespuestas = function (res) {//Funcion para validar la respuesta
      console.log('changeRespuestas_', res);
      if (res) {
        $scope.data.inactiveSave = false;
      } else {
        $scope.data.inactiveSave = true;
      }
    }//Fin
    $scope.resetIps = function () {//Funcion para reset data ips
      $scope.pqrData.Ips.nit = null; $scope.pqrData.Ips.ips = null; $scope.pqrData.Ips.codmunicipio = null; $scope.pqrData.Ips.ubicacion = null;
      $scope.pqrData.Ips.email = null; $scope.pqrData.Ips.municipio = null; $scope.pqrData.Ips.direccion = null; $scope.pqrData.Ips.telefono = null;
    }//Fin

    $scope.resetEmpleador = function () {//Funcion para reset data empleador
      $scope.pqrData.Empleador.tipodocumento = null; $scope.pqrData.Empleador.documento = null; $scope.pqrData.Empleador.nombre = null;
      $scope.pqrData.Empleador.codmunicipio = null; $scope.pqrData.Empleador.municipio = null; $scope.pqrData.Empleador.direccion = null;
      $scope.pqrData.Empleador.ubicacio = null; $scope.pqrData.Empleador.email = null; $scope.pqrData.Empleador.telefo = null;
    }//Fin

    $scope.atrasbc = function () {
      $scope.tabAfiliadoTemp = '1'; $scope.data.inactiveSearch = true;
      $scope.pqrData.User.selectedAcudiente = 'N'
      $scope.changeAcudiente($scope.pqrData.User.selectedAcudiente);
      $scope.data.inactivePqr = true; $scope.disabledFieldsAfiliado = false;
      $scope.data.inactiveAfiliado = true; $scope.data.inactiveTitleComplement = true; $scope.data.inactiveStrongAfiliado = false;
      $scope.data.inactiveTitleRv = true;
    }

    $scope.atrasbs = function () {
      $scope.tabAfiliadoTemp = '2';


    }
    $scope.showtab3 = function () {
      $scope.tabAfiliadoTemp = '3';
    }

    $scope.searchAfiliado = function () {//Funcion para obtener la data para buscar al afiliado y valida que no hayan campos vacios
      $scope.rangepqr = 'Sin clasificación';
      $scope.classrangepqr = '';
      $scope.form = {
        value: 0
      };
      $scope.pqrData.clasificacion = '';
      if ($scope.pqrData.User.selectedDocumento && $scope.pqrData.User.documento) {
        $scope.dataSearch.selectedDocumento = $scope.pqrData.User.selectedDocumento;
        $scope.dataSearch.documento = $scope.pqrData.User.documento; $scope.dataSearch.tipo = 'AF';
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        pqrHttp.postSearchAfiliado($scope.dataSearch).then(function (response) {
          $scope.afiliado = response.data[0];//Obtiene los datos de la request
          $scope.infoafiliadopqr = response.data[0];

          // console.log($scope.infoafiliadopqr);
          if ($scope.afiliado && $scope.afiliado.NOMBRECOMPLETO) {//Si el nombre existe asigna los datos de la request
            $scope.inforedafiliado = JSON.parse(response.data[0].RED);
            $scope.pqrData.User.nombre = $scope.afiliado.NOMBRECOMPLETO;
            $scope.pqrData.User.fecha_nacimiento = $scope.afiliado.NACIMIENTO;
            $scope.pqrData.User.selectedGenero = $scope.afiliado.SEXO;
            $scope.pqrData.User.codmunicipio = $scope.afiliado.UBICGEO;
            $scope.pqrData.User.municipio = $scope.afiliado.NOMUBICGEO;
            $scope.pqrData.User.direccion = $scope.afiliado.DIRECCION;
            $scope.pqrData.User.ubicgeo = $scope.afiliado.UBICGEO;
            $scope.pqrData.User.telefono = $scope.afiliado.TELEFONO;
            $scope.pqrData.User.email = $scope.afiliado.CORREO;
            $scope.pqrData.User.regimen = $scope.afiliado.REGIMEN;
            $scope.temRegimen = $scope.afiliado.REGIMEN == 'S' ? 'SUBSIDIADO' : 'CONTRIBUTIVO';
            $scope.pqrData.User.estado = $scope.afiliado.ESTADO_AF;
            $scope.pqrData.User.clasificacion = $scope.afiliado.CLASIFICACION_NOMBRE;
            $scope.data.inactiveSearch = false; $scope.data.inactivePqr = false; $scope.disabledFieldsAfiliado = true;
            $scope.data.inactiveAfiliado = false; $scope.data.inactiveTitleComplement = false; $scope.data.inactiveStrongAfiliado = true;
            $scope.data.inactiveTitleRv = false;
            $scope.pqrData.selectedRv = 'N';
            ////////kevin
            if ($scope.afiliado.CLASIFICACION == '1') { $scope.form.value = 20; $scope.sliderToNumber(20) }
            if ($scope.afiliado.CLASIFICACION == '2') { $scope.form.value = 40; $scope.sliderToNumber(40) }
            if ($scope.afiliado.CLASIFICACION == '3') { $scope.form.value = 60; $scope.sliderToNumber(60) }
            if ($scope.afiliado.CLASIFICACION == '4') { $scope.form.value = 80; $scope.sliderToNumber(80) }
            if ($scope.afiliado.CLASIFICACION == '5') { $scope.form.value = 100; $scope.sliderToNumber(100) }
            // $scope.sliderToNumber()
            $scope.tabAfiliado = '1';
            $scope.tabAfiliadoTemp = '2';
            //$scope.$apply();
            // console.log(response.data[0].RED);
            // $scope.validateDias();
            $scope.data.inactiveOptionsAcudiente = false;
            setTimeout(() => { $scope.$apply(); }, 500)
            if ($scope.pqrData.selectedtipoSolicitud == 'E') {
              $scope.data.inactivecorrespondencia = false;
              $scope.data.collapsePqrComplement = true;
            } else {
              $scope.data.inactivecorrespondencia = true;
              $scope.data.collapsePqrComplement = true;
              $scope.data.collapsePqrComplement = false;
            }
            if ($scope.pqrData.selectedtipoSolicitud == 'R' && $scope.pqrData.selectedtipoRadicacion == 'A') {
              pqrHttp.validapqr_gestionriesgo($scope.dataSearch.selectedDocumento, $scope.dataSearch.documento).then(result => {
                // console.log(result.Nombre);
                $scope.pqrData.selectedRv = result.Nombre;
                $scope.changeRv($scope.pqrData.selectedRv);
                // console.log("$scope.pqrData.selectedRv_", $scope.pqrData.selectedRv);
                // $scope.changeRv('S');
              })
            }
            if (['C', 'D', 'E', 'F', 'Q'].includes($scope.tempsol.Codigo)) {
              // console.log("Soy alguno de estos");
              // $scope.data.inactiveTitleRv = true;
              // $scope.pqrData.selectedRv = 'N';
              // $scope.data.inactiveRv = true;
              // $scope.data.collapseRv = true;
              // $scope.data.stateRv = true;
            } else {
              // console.log("No soy alguno de estos");
              $scope.data.inactivecorrespondencia = true;
              // $scope.data.inactiveTitleRv = false;
              // $scope.data.inactiveRv = false;

              setTimeout(() => {
                // $scope.data.inactiveRv = false;
                // $scope.data.collapseRv = true;
                // $scope.data.stateRv = true;
              }, 100);

            }



            $http({
              method: 'POST',
              url: "php/siau/pqr/Rpqr.php",
              data: {
                "function": "p_consulta_pqrconsol",
                "v_ptipo_documento": $scope.pqrData.User.selectedDocumento,
                "v_pdocumento": $scope.pqrData.User.documento
              }
            }).then(function (response) {
              // console.log(response.data);
              const { MES_1,
                MES_2,
                MES_3,
                MES_4,
                MES_5,
                MES_6 } = response.data[0];

              $scope.mesesanno = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
              var today = new Date();
              var d;
              var month;
              $scope.mesesname = [];

              $scope.mesess = {
                MES_1: null,
                MES_2: null,
                MES_3: null,
                MES_4: null,
                MES_5: null,
                MES_6: null,
                CANTIDAD_MES_1: null,
                CANTIDAD_MES_2: null,
                CANTIDAD_MES_3: null,
                CANTIDAD_MES_4: null,
                CANTIDAD_MES_5: null,
                CANTIDAD_MES_6: null
              }


              for (var i = 5; i >= 0; i -= 1) {
                d = new Date(today.getFullYear(), (today.getMonth()) - i, 1);
                console.log(d.getMonth());
                month = $scope.mesesanno[d.getMonth()];
                $scope.mesesname.push(month);
              }
              $scope.mesess.MES_1 = $scope.mesesname[0];
              $scope.mesess.MES_2 = $scope.mesesname[1];
              $scope.mesess.MES_3 = $scope.mesesname[2];
              $scope.mesess.MES_4 = $scope.mesesname[3];
              $scope.mesess.MES_5 = $scope.mesesname[4];
              $scope.mesess.MES_6 = $scope.mesesname[5];

              $scope.mesess.CANTIDAD_MES_6 = MES_6;
              $scope.mesess.CANTIDAD_MES_5 = MES_5;
              $scope.mesess.CANTIDAD_MES_4 = MES_4;
              $scope.mesess.CANTIDAD_MES_3 = MES_3;
              $scope.mesess.CANTIDAD_MES_2 = MES_2;
              $scope.mesess.CANTIDAD_MES_1 = MES_1;
            })

          } else {
            swal('Afiliado', 'No Encontrado!', 'error').catch(swal.noop);
            $scope.pqrData.User = {
              selectedDocumento: $scope.pqrData.User.selectedDocumento, documento: $scope.pqrData.User.documento, nombre: null,
              fecha_nacimiento: null, selectedGenero: null, codmunicipio: null, municipio: null, direccion: null, telefono: null,
              email: null, ips: null, nit: null, nombreEntidad: null, selectedAcudiente: null,
              Acudiente: {
                selectedDocumento: "", documento: null, nombre: null, codmunicipio: null, municipio: null, direccion: null, telefono: null, email: null
              }
            }
            $scope.data.inactiveSearch = true; $scope.data.inactiveAfiliado = true; $scope.data.inactiveStrongAfiliado = false;
            $scope.data.inactiveSearchAcudiente = true;
            $scope.resetRv(); $scope.resetDataComplementPqr();
          }
          $scope.dataSearch = {};
          setTimeout(() => {
            swal.close();
            $('#iniciotab').click();
            $scope.listpqrds = [];
            $scope.listutetas = [];
            $scope.listaltocosto = [];
            $scope.listgestionriesgo = [];
          }, 1000);
        })
      } else {
        swal('Afiliado', 'No pueden haber campos vacios', 'error').catch(swal.noop);
      }
    }//Fin
    $scope.resetDataComplementPqr = function () {
      $scope.pqrData.selectedRv = 'N'; $scope.data.inactiveTitleComplement = true; $scope.data.inactiveSave = true; $scope.data.formato = '';
      $scope.pqrData.pqrFile = null; $scope.pqrData.ext = null; $scope.pqrData.observaciones = null; $scope.pqrData.selectedDias = null;
      $scope.pqrData.selectedRespuesta = null; $scope.data.inactiveRv = true; $scope.data.inactivePqr = true;
      $scope.data.stateRv = true; $scope.disabledDias = false; $scope.pqrData.fecha_recibido = null;
      if (document.getElementById('inputFilePlaceHolder')) { document.getElementById('inputFilePlaceHolder').value = ''; }
      if (document.getElementById('pqrfile')) { document.getElementById('pqrfile').value = ''; }
      $scope.data.collapsePqrComplement = true; $scope.data.inactiveTitleRv = true; $scope.data.collapseRv = true;
      $scope.motivo = { codigo: null, nombre: null, seleccion: null }; $scope.motivoEspecifico = { codigo: null, nombre: null };
    }//Fin
    $scope.searchAcudiente = function () {//Funcion para obtener data del acudiente
      if ($scope.pqrData.User.Acudiente.selectedDocumento && $scope.pqrData.User.Acudiente.documento) {
        $scope.dataSearch.selectedDocumento = $scope.pqrData.User.Acudiente.selectedDocumento;
        $scope.dataSearch.documento = $scope.pqrData.User.Acudiente.documento; $scope.dataSearch.tipo = 'AC';

        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        //Validacion para comprobar que el acudiente es diferente al afiliado
        if ($scope.pqrData.User.documento == $scope.pqrData.User.Acudiente.documento
          && $scope.pqrData.User.selectedDocumento == $scope.pqrData.User.Acudiente.selectedDocumento) {
          swal('Acudiente', 'Debe ser una persona diferente al Afiliado', 'error').catch(swal.noop);
          $timeout(function () {
            $scope.resetAcudiente(); swal.close();//Usado para mostrar img loading
            $scope.acudienteBoolean = true; $scope.data.inactiveSearchAcudiente = true; $scope.data.inactiveAcudiente = true;
            $scope.pqrData.User.selectedAcudiente = 'N';
          }, 100);
        } else {
          pqrHttp.postSearchAfiliado($scope.dataSearch).then(function (response) {
            $scope.datacudiente = response.data[0] ? response.data[0] : response.data;//Obtiene los datos de la request
            if ($scope.datacudiente && $scope.datacudiente.NOMBRECOMPLETO) {//Si el nombre existe asigna los datos de la request
              $scope.pqrData.User.Acudiente.nombre = $scope.datacudiente.NOMBRECOMPLETO;
              $scope.pqrData.User.Acudiente.municipio = $scope.datacudiente.NOMUBICGEO;
              $scope.pqrData.User.Acudiente.codmunicipio = $scope.datacudiente.UBICGEO;
              $scope.pqrData.User.Acudiente.direccion = $scope.datacudiente.DIRECCION;
              $scope.pqrData.User.Acudiente.telefono = $scope.datacudiente.TELEFONO;
              $scope.pqrData.User.Acudiente.email = $scope.datacudiente.CORREO;
              $scope.data.inactiveSearchAcudiente = false; $scope.data.inactiveRegistered = true;
              setTimeout(() => {
                swal.close();
              }, 100);

              $scope.data.inactiveStrongAcudiente = true; $scope.data.inactiveAcudiente = false;
            } else {
              if ($scope.datacudiente && $scope.datacudiente.codigo == 99) {//Validacion de error para acudiente fallecido
                setTimeout(() => {
                  swal.close();
                }, 100);
                $scope.pqrData.User.Acudiente = {
                  selectedDocumento: $scope.pqrData.User.Acudiente.selectedDocumento,
                  documento: $scope.pqrData.User.Acudiente.documento, nombre: null,
                  codmunicipio: null, municipio: null, direccion: null, telefono: null, email: null
                }
                $scope.data.inactiveAcudiente = true; $scope.data.inactiveSearchAcudiente = true;
                swal('Acudiente', $scope.datacudiente.mensaje, 'error').catch(swal.noop);
              } else {
                swal('Acudiente', 'No encontrado puede registrarlo al sistema', 'error').catch(swal.noop);
                $scope.pqrData.User.Acudiente = {
                  selectedDocumento: $scope.pqrData.User.Acudiente.selectedDocumento,
                  documento: $scope.pqrData.User.Acudiente.documento,
                  nombre: null, codmunicipio: null, municipio: null, direccion: null, telefono: null, email: null
                }
                $scope.data.inactiveSearchAcudiente = false; $scope.data.inactiveRegistered = false; swal.close();
                $scope.data.inactiveAcudiente = false; $scope.acudienteBoolean = true; $scope.data.inactiveStrongAcudiente = true;
              }
            }
            $scope.dataSearch = {};
          })
        }
      } else {
        swal('Acudiente', 'No pueden haber campos vacios', 'error').catch(swal.noop);
      }
    }//Fin
    $scope.searchIps = function () {//Funcion para obtener data de la ips
      if ($scope.pqrData.Ips.nit) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        pqrHttp.postSearchIps($scope.pqrData.Ips.nit).then(function (response) {
          $scope.ips = response.data[0];//Obtiene los datos de la request
          if ($scope.ips.CODIGO) {//Si el Nit existe asigna los datos de la request
            $scope.pqrData.Ips.ips = $scope.ips.NOMBRE;
            $scope.pqrData.Ips.municipio = $scope.ips.NOMBREUBI;
            $scope.pqrData.Ips.codmunicipio = $scope.ips.CODIUBI;
            $scope.pqrData.Ips.direccion = $scope.ips.DIRECCION;
            $scope.pqrData.Ips.email = $scope.ips.CORREO;
            $scope.pqrData.Ips.telefono = $scope.ips.TELEFONO;
            $scope.pqrData.Ips.ubicacion = $scope.ips.UBICACION;
            $scope.data.inactiveAfiliado = false; $scope.data.inactiveSearchIps = false; $scope.data.inactiveStrongIps = true; $scope.data.inactiveSearchEmpleador = true;
            $scope.data.inactivePqr = false; $scope.data.collapsePqrComplement = false; $scope.data.collapseIps = false; $scope.data.inactiveTitleRv = false;
            $scope.pqrData.selectedRv = 'N'; $scope.validateDias();
            if ($scope.pqrData.selectedtipoSolicitud == 'E') {
              $scope.data.inactivecorrespondencia = false;
              $scope.data.inactiveTitleComplement = true;
              $scope.data.collapsePqrComplement = true;
            } else {
              $scope.data.inactivecorrespondencia = true;
              $scope.data.inactiveTitleComplement = false;
              $scope.data.collapsePqrComplement = false;
            }
          } else {
            swal('IPS', 'No encontrada verifique el NIT', 'error').catch(swal.noop);
            $scope.data.inactiveAfiliado = true; $scope.data.inactiveSearchIps = true; $scope.data.inactiveTitleRv = true;
            $scope.resetIps(); $scope.data.inactiveStrongIps = false; $scope.data.inactivePqr = true; $scope.data.collapseIps = true;
            $scope.data.inactiveTitleComplement = true; $scope.data.collapsePqrComplement = true;
          }
          setTimeout(() => {
            swal.close();
          }, 1000);

        })
      } else {
        swal('IPS', 'No pueden haber campos vacios', 'error').catch(swal.noop);
      }
    }//Fin
    $scope.validateSearchIps = function () {//Funcion para validar collapseips
      $scope.data.collapseIps = !$scope.data.collapseIps;
    }//Fin
    $scope.validateSearchEmp = function () {//Funcion para validar collapseEmp
      $scope.data.collapseEmp = !$scope.data.collapseEmp;
    }//Fin


    $scope.searchEmpeador = function () {//Funcion para obtener data de la empleador
      if ($scope.pqrData.Empleador.tipodocumento && $scope.pqrData.Empleador.documento) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        pqrHttp.postSearchEmpleador({
          'tipodocumento': $scope.pqrData.Empleador.tipodocumento,
          'documento': $scope.pqrData.Empleador.documento
        }).then(function (response) {


          $scope.empleador = response.data;//Obtiene los datos de la request
          if ($scope.empleador.Codigo == '0') {//Si el Nit existe asigna los datos de la request
            swal('EMPLEADOR', 'No encontrada verifique el Documento', 'error').catch(swal.noop);
            $scope.data.inactiveAfiliado = true; $scope.data.inactiveSearchIps = true; $scope.data.inactiveTitleRv = true;
            $scope.pqrData.Empleador.nombre = null;
            $scope.pqrData.Empleador.codmunicipio = null; $scope.pqrData.Empleador.municipio = null; $scope.pqrData.Empleador.direccion = null;
            $scope.pqrData.Empleador.ubicacio = null; $scope.pqrData.Empleador.email = null; $scope.pqrData.Empleador.telefo = null; $scope.data.inactiveStrongEmp = false; $scope.data.inactivePqr = true;
            $scope.data.collapseEmp = true; $scope.data.inactiveTitleComplement = true; $scope.data.collapsePqrComplement = true;
          } else {
            console.log($scope.empleador);
            $scope.pqrData.Empleador.nombre = $scope.empleador.NOMBRE;
            // $scope.pqrData.Empleador.municipio = $scope.empleador.ubicacion;
            $scope.pqrData.Empleador.direccion = $scope.empleador.DIRECCION;
            $scope.pqrData.Empleador.email = $scope.empleador.CORREO;
            $scope.pqrData.Empleador.telefono = $scope.empleador.TELEFONO;
            $scope.data.inactiveSearchEmpleador = false;
            $scope.data.collapseEmp = false;
            $scope.data.inactiveStrongEmp = true;
            $scope.data.inactiveAfiliado = false;
            $scope.data.inactiveSearchIps = false;
            $scope.data.inactivePqr = false;
            $scope.data.inactiveTitleComplement = false;
            $scope.data.collapsePqrComplement = false;
            $scope.data.inactiveTitleRv = false;
            $scope.pqrData.selectedRv = 'N';
            //$scope.validateDias();

            if ($scope.pqrData.selectedtipoSolicitud == 'E') {
              $scope.data.inactivecorrespondencia = false;
              $scope.data.collapsePqrComplement = true;
            } else {
              $scope.data.inactivecorrespondencia = true;
              $scope.data.collapsePqrComplement = true;
              $scope.data.collapsePqrComplement = false;
            }

            $scope.validateDias();
            setTimeout(() => {
              swal.close();
            }, 1000);
          }

        })
      } else {
        swal('IPS', 'No pueden haber campos vacios', 'error').catch(swal.noop);
      }
    }//Fin
    /*$scope.validateDias = function () {//Valida los dias habiles para respuesta del pqr
        pqrHttp.getvalidapqr_responsable(sessionStorage.getItem('cedula')).then(function (response) {
            console.log(response);

            if (response.Nombre=='S') {
                pqrHttp.getDiasEntes().then(function (response) {
                    $scope.dias = response;
                })
            }else{
                pqrHttp.getDias().then(function (response) {
                    $scope.dias = response;
                })
            }
        })

        if ($scope.pqrData.selectedmediosRecepcion == '13') {
            if ($scope.pqrData.enteCodigo == '10') {
                $timeout(function () {
                    $scope.pqrData.selectedRv == 'S' ? $scope.pqrData.selectedDias = "2" : $scope.pqrData.selectedDias = "5";
                })
                $scope.disabledDias = true;
            } else {
                if ($scope.pqrData.sede == 'N') {
                    $scope.disabledDias = false;
                    $scope.pqrData.selectedDias = null;
                }
                if ($scope.pqrData.sede == 'S') {
                    $timeout(function () {
                        $scope.pqrData.selectedRv == 'S' ? $scope.pqrData.selectedDias = "2" : $scope.pqrData.selectedDias = "5";
                        $scope.disabledDias = true;
                    })
                }
            }
        } else {
            if ($scope.pqrData.selectedtipoRadicacion == 'A') {
                $scope.pqrData.selectedRv == 'S' ? $scope.pqrData.selectedDias = "2" : $scope.pqrData.selectedDias = "5";
                $scope.disabledDias = true;
            }
            if ($scope.pqrData.selectedtipoRadicacion == 'I' || $scope.pqrData.selectedtipoRadicacion == 'M') {
                $scope.pqrData.selectedRv = 'N';
                $scope.pqrData.selectedDias = "10";
                $scope.disabledDias = true;
            }

            if ($scope.pqrData.selectedtipoSolicitud == 'E') {
                $scope.pqrData.selectedDias = "5";
            }
        }
        if (['D', 'C', 'F', 'Q'].includes($scope.pqrData.selectedtipoSolicitud)) {
            $scope.pqrData.selectedDias = "10";
        }



    }//Fin*/

    $scope.validateDias = function () {//Valida los dias habiles para respuesta del pqr
      pqrHttp.getvalidapqr_responsable(sessionStorage.getItem('cedula')).then(function (response) {
        console.log(response);

        if (response.Nombre == 'S') {
          pqrHttp.getDiasEntes().then(function (response) {
            $scope.dias = response;
          })
        } else {
          pqrHttp.getDias().then(function (response) {
            $scope.dias = response;
          })
        }
      })

      if ($scope.pqrData.selectedmediosRecepcion == '13') {
        if ($scope.pqrData.enteCodigo == '10') {
          $timeout(function () {
            $scope.pqrData.selectedRv == 'S' ? $scope.pqrData.selectedDias = "2" : $scope.pqrData.selectedDias = "5";
          })
          $scope.disabledDias = true;
        } else {
          if ($scope.pqrData.sede == 'N') {
            $scope.disabledDias = false;
            $scope.pqrData.selectedDias = null;
          }
          if ($scope.pqrData.sede == 'S') {
            if ($scope.pqrData.enteCodigo != '13' && $scope.pqrData.enteCodigo != '5') {
              $timeout(function () {
                $scope.pqrData.selectedRv == 'S' ? $scope.pqrData.selectedDias = "2" : $scope.pqrData.selectedDias = "5";
                $scope.disabledDias = true;
              })
            } else {
              $timeout(function () {
                $scope.pqrData.selectedDias = null;
                $scope.disabledDias = false;
              })
            }

          }
        }
      } else {
        if ($scope.pqrData.selectedtipoRadicacion == 'A') {
          $scope.pqrData.selectedRv == 'S' ? $scope.pqrData.selectedDias = "2" : $scope.pqrData.selectedDias = "5";
          $scope.disabledDias = true;
        }
        if ($scope.pqrData.selectedtipoRadicacion == 'I' || $scope.pqrData.selectedtipoRadicacion == 'M') {
          $scope.pqrData.selectedRv = 'N';
          $scope.pqrData.selectedDias = "10";
          $scope.disabledDias = true;
        }

        if ($scope.pqrData.selectedtipoSolicitud == 'E') {
          $scope.pqrData.selectedDias = "5";
        }
      }
      if (['D', 'C', 'F', 'Q'].includes($scope.pqrData.selectedtipoSolicitud)) {
        $scope.pqrData.selectedDias = "10";
      }



    }//Fin
    //Show modals
    $scope.showModalMotivosEspecificos = function () {//Abre el modal para seleccionar el motivo especifico
      swal({
        title: '¿Realizó la clasificación del usuario adecuadamente?',
        type: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: "Si",
        cancelButtonText: "No",
      }).catch(swal.noop)
        .then((willDelete) => {
          if (willDelete) {
            ngDialog.open({
              template: 'views/siau/pqr/modals/modalselectmotivo.html', className: 'ngdialog-theme-plain',
              controller: 'modalselectmotivo', scope: $scope
            }).closePromise.then(function (data) {//Respuesta del valor seleccionado en modal de motivos especificos
              if (data.value != '$closeButton' && data.value != '$escape' && data.value != '$document'
                && data.value.codigo != null && data.value.nombre != null) {//Valida que el motivo especifico nunca se asigne vacio
                $scope.motivo.codigo = data.value.codigo;
                $scope.motivo.nombre = data.value.nombre;
                $scope.motivo.seleccion = $scope.motivo.codigo + ' - ' + $scope.motivo.nombre;
                $scope.pqrData.selectedMotivoEspecifico = $scope.motivo.codigo;
              }
            });
          }
        });
    }//Fin
    $scope.showModalIps = function () {//Abre el modal para seleccionar la ips
      ngDialog.open({
        template: 'views/siau/pqr/modals/modalIps.html', className: 'ngdialog-theme-plain',
        controller: 'modalips', scope: $scope
      }).closePromise.then(function (data) {//Respuesta del valor seleccionado en modal de ips
        if (data.value != '$closeButton' && data.value != '$escape' && data.value != '$document'
          && data.value.codigo != null && data.value.nombre != null) {//Valida que la ips nunca se asigne vacio
          // $scope.motivo.codigo = data.value.codigo;
          // $scope.motivo.nombre = data.value.nombre;
          // $scope.motivo.seleccion = $scope.motivo.codigo + ' - ' + $scope.motivo.nombre;
          // $scope.pqrData.selectedMotivoEspecifico = $scope.motivo.codigo;
        }
      });
    }//Fin
    $scope.showModalDireccion = function (afectado) {//Abre el modal para registrar la direccion
      ngDialog.open({
        template: 'views/siau/pqr/modals/modalDir.html', className: 'ngdialog-theme-plain',
        controller: 'modaldireccioncontroller', scope: $scope
      }).closePromise.then(function (data) {//Respuesta del valor registrado en modal de direccion
        if (data.value != '$closeButton' && data.value != '$escape' && data.value != '$document'
          && data.value.direccionModal != '') {//Valida que la direccion nunca se asigne vacia
          switch (afectado) {//Utilizado para saber aque variable le va a asginar la direccion
            case 'Afiliado':
              $scope.pqrData.User.direccion = data.value.direccionModal;
              break;
            case 'Acudiente':
              $scope.pqrData.User.Acudiente.direccion = data.value.direccionModal;
              break;
            case 'Ips':
              $scope.pqrData.Ips.direccion = data.value.direccionModal;
              break;
            case 'Empleador':
              $scope.pqrData.Empleador.direccion = data.value.direccionModal;
              break;
            case 'Tercero':
              $scope.pqrData.Tercero.direccion = data.value.direccionModal;
              break;
            case 'NewTercero':
              $scope.pqrData.NewTercero.direccion = data.value.direccionModal;
              break;
            case 'UpdateTercero':
              $scope.pqrData.UpdateTercero.direccion = data.value.direccionModal;
              break;
          }
        }
      });
    }//Fin
    $scope.showDepMunicipio = function () {//Abre el modal para seleccionar el departamento y municipio
      ngDialog.open({
        template: 'views/siau/pqr/modals/modaldepmunicipio.html', className: 'ngdialog-theme-plain',
        controller: 'modalDepartamentoMunicipio', scope: $scope
      }).closePromise.then(function (data) {//Respuesta del valor seleccionado en modal de motivos especificos
        if (data.value != '$closeButton' && data.value != '$escape' && data.value != '$document' && data.value.codigo != null
          && data.value.nombre != null) {//Valida que el motivo especifico nunca se asigne vacio
          $scope.depmunicipio.codigo = data.value.codigo;
          $scope.depmunicipio.nombre = data.value.nombre;
          $scope.depmunicipio.seleccion = $scope.depmunicipio.codigo + ' - ' + $scope.depmunicipio.nombre;
          $scope.pqrData.User.Acudiente.codmunicipio = $scope.depmunicipio.codigo;
        }
      });
    }//Fin
    $scope.showModalResponsables = function (pqr) {//Abre el modal para seleccionar mas responsables
      $scope.dataPqr = pqr;
      ngDialog.open({
        template: 'views/siau/admonpqrs/modalAddResponsables.html', className: 'ngdialog-theme-plain',
        controller: 'modalAddResponsables', scope: $scope,
        closeByEscape: false
      }).closePromise.then(function (data) {
        if (data.value != '$closeButton' && data.value != '$escape' && data.value != '$document') {
          //$scope.check_option ? $scope.getPQRS('G') :
          $scope.getPQRS('A');
        }
      });
    }//Fin
    $scope.showModalConfigResponsables = function () {//Abre el modal para seleccionar mas responsables
      ngDialog.open({
        template: 'views/siau/admonpqrs/modalConfigResponsables.html', className: 'ngdialog-theme-plain',
        controller: 'modalConfigResponsables', scope: $scope
      }).closePromise.then(function (data) {
        if (data.value != '$closeButton' && data.value != '$escape' && data.value != '$document') {
        }
      });
    }//Fin
    $scope.showModalGestionar = function (pqr, area) {//Abre el modal Gestionar
      $scope.dataPqr = pqr;
      if (area == 'S') {

        ngDialog.open({
          template: 'views/siau/admonpqrs/modalProcesSalud.html',
          className: 'ngdialog-theme-plain',
          controller: 'modalProcesSalud',
          height: '90%',
          showClose: false,
          scope: $scope
        }).closePromise.then(function (data) {
          console.log(data.value);
          if (data.value != '$closeButton' && data.value != '$escape' && data.value != '$document' && data.value != undefined) {
            //$scope.check_option ? $scope.getPQRS('G') :
            $scope.getPQRS('A');
          }
        });


      } else {
        ngDialog.open({
          template: 'views/siau/admonpqrs/processAseguramiento.html',
          className: 'ngdialog-theme-plain',
          controller: 'modalProcessAseguramiento',
          height: '90%',
          showClose: false,
          scope: $scope
        }).closePromise.then(function (data) {
          console.log(data.value);
          if (data.value != '$closeButton' && data.value != '$escape' && data.value != '$document' && data.value != undefined) {
            //s$scope.check_option ? $scope.getPQRS('G') :
            $scope.getPQRS('A');
          }
        });
      }
    }//Fin
    //Pagination PQRS
    $scope.numPages = function () {
      if ($scope.pqrs) {
        return Math.ceil($scope.pqrs.length / $scope.records_per_page);
      }
    }
    $scope.prevPage = function () {
      // if ($scope.current_page == $scope.numPages()) {
      //     $scope.sum_records = $scope.sum_records -  $scope.arrayPages.length;
      //($scope.pqrs.length % $scope.records_per_page);
      // } else {
      $scope.sum_records = $scope.sum_records - $scope.arrayPages.length;
      // }
      $scope.inicio = $scope.inicio - $scope.records_per_page;
      $scope.current_page--;
      $scope.changePage($scope.current_page);
    }
    $scope.nextPage = function () {
      if ($scope.current_page < $scope.numPages()) {
        $scope.current_page++;
        $scope.changePage($scope.current_page);
        $scope.sum_records = $scope.sum_records + $scope.arrayPages.length;
        $scope.inicio = $scope.inicio + $scope.records_per_page;
      }
    }
    $scope.changePage = function (page) {
      $scope.pageActive = page;
      $scope.current_page = page;
      if (page < 1) page = 1;
      if (page > $scope.numPages()) page = $scope.numPages();
      $scope.arrayPages = [];
      $scope.arrayPages = $scope.pqrs.slice((page - 1) * $scope.records_per_page, (page * $scope.records_per_page));
      $scope.resultsP = $scope.arrayPages;
      if ($scope.sum_records == 0) {
        $scope.sum_records = $scope.sum_records + $scope.arrayPages.length;
      }
      if ($scope.pageActive == 1) {
        $scope.disableArrowLeft = true;
      } else {
        $scope.disableArrowLeft = false;
      }
      if ($scope.numPages() == $scope.pageActive) {
        $scope.disableArrowRight = true;
      } else {
        $scope.disableArrowRight = false;
      }
      window.scrollTo(0, 0);
    }
    $scope.$watch('filterPQRS', function (val) {
      console.log('filterPQRS:', $scope.filterPQRS);
      if ($scope.tabs.tab == 'G') {
        if ($scope.filterPQRS == null || $scope.filterPQRS == '') {
          pqrHttp.getPQRS($scope.check_option ? 'G' : 'A', sessionStorage.getItem('cedula')).then(function (response) {
            $scope.pqrs = response;
            $scope.inicio = 1;
            $scope.sum_records = 0;
            $scope.pages = Array($scope.numPages()).fill((x, i) => i).map((x, i) => i);
            $scope.changePage(1);
          })
        } else {
          $scope.arrayPages = $filter('filter')($scope.pqrs, val);
          $scope.resultsP = $scope.arrayPages;
          $scope.filterAreas = '';
        }
      }
    });
    $scope.$watch('filterC', function (val) {
      console.log('filterC:', $scope.filterC);
      if ($scope.tabs.tab == 'C') {
        if ($scope.filterC == null || $scope.filterC == '') {
          pqrHttp.getCorrespondencia($scope.check_optionc ? 'R' : 'A', sessionStorage.getItem('cedula')).then(function (response) {
            $scope.pqrs = response;
            $scope.inicio = 1;
            $scope.sum_records = 0;
            $scope.pages = Array($scope.numPages()).fill((x, i) => i).map((x, i) => i);
            $scope.changePage(1);
          })
        } else {
          $scope.arrayPages = $filter('filter')($scope.pqrs, val);
          $scope.resultsP = $scope.arrayPages;
          $scope.filterAreas = '';
        }
      }
    });
    $scope.descargafile = function (ruta, ftp) {
      pqrHttp.dowloadfile(ruta, ftp).then(function (response) {
        window.open("temp/" + response.data);
      });
    }
    //Pagination PQRS
    //Functions in jquery
    $('#pqrfile').change(function () {//Detecta los cambios que sufre el input file
      $timeout(function () {//Usado para validar el file en tiempo real
        var file = document.getElementById('pqrfile').files[0];//Obtiene el file del input para validarlo
        console.log('pqrfile:', file);
        $scope.data.formato = '';
        if (file) {//Valida si existe el archivo en el input file
          if (file.size <= 5242880) {//valida que el size del file sea <= 5 mb
            if (file.name.split('.').pop().toLowerCase() == 'pdf') {//Obtiene la extension del file y valida que sea un pdf
              $scope.data.formato = 'Dentro Del Peso Limite y Formato Validado';
              $scope.data.requiredFile = false;
              var reader = new FileReader();
              reader.onload = function (event) {
                $timeout(function () {
                  $scope.pqrData.pqrFile = event.target.result; //Asigna el file al ng-model pqrFile
                  $scope.pqrData.ext = file.name.split('.').pop().toLowerCase();//Asigna la extension del pqrFile
                })
              };
              reader.readAsDataURL(file);
            } else {
              $scope.data.formato = 'Formato Invalido solo puedes adjuntar archivos con extensión .pdf';
              $scope.pqrData.pqrFile = null;//Asigna null al ng-model pqrFile
              $scope.pqrData.ext = null;//Asigna null a la extension pqrFile
              $scope.data.requiredFile = true;
            }
          } else {
            $scope.data.formato = 'Limite de Peso Excedido';
            $scope.pqrData.pqrFile = null;//Asigna null al ng-model pqrFile
            $scope.pqrData.ext = null;//Asigna null a la extension pqrFile
            $scope.data.requiredFile = true;
          }
        } else {
          $scope.data.formato = '';
          $scope.pqrData.pqrFile = null;//Asigna null al ng-model pqrFile
          $scope.pqrData.ext = null;//Asigna null a la extension pqrFile
          $scope.data.requiredFile = false;
        }
      }, 100);
    })

    $('#gradfile').change(function () {//Detecta los cambios que sufre el input file
      $timeout(function () {//Usado para validar el file en tiempo real
        var file = document.getElementById('gradfile').files[0];//Obtiene el file del input para validarlo
        console.log('gradfile:', file);
        $scope.datagrad = '';
        if (file) {//Valida si existe el archivo en el input file
          if (file.size <= 5242880) {//valida que el size del file sea <= 5 mb
            if (file.name.split('.').pop().toLowerCase() in { 'png': 'png', 'jpg': 'jpg', 'jpeg': 'jpeg', 'pdf': 'pdf', 'doc': 'doc', 'docx': 'docx' }) {
              $scope.datagrad = 'Dentro Del Peso Limite y Formato Validado';
              $scope.data.requiredFileRad = false;
              var reader = new FileReader();
              reader.onload = function (event) {
                $timeout(function () {
                  $scope.pqrData.gradfile = event.target.result; //Asigna el file al ng-model gradfile
                  $scope.pqrData.gradext = file.name.split('.').pop().toLowerCase();//Asigna la extension del gradfile
                })
              };
              reader.readAsDataURL(file);
            } else {
              $scope.datagrad = 'Formato Invalido solo puedes adjuntar archivos con extensión .jpg y .png';
              $scope.pqrData.gradfile = null;//Asigna null al ng-model gradfile
              $scope.pqrData.gradext = null;//Asigna null a la extension gradfile
              $scope.data.requiredFileRad = true;
            }
          } else {
            $scope.datagrad = 'Limite de Peso Excedido';
            $scope.pqrData.gradfile = null;//Asigna null al ng-model gradfile
            $scope.pqrData.gradext = null;//Asigna null a la extension gradfile
            $scope.data.requiredFileRad = true;
          }
        } else {
          $scope.datagrad = '';
          $scope.pqrData.gradfile = null;//Asigna null al ng-model gradfile
          $scope.pqrData.gradext = null;//Asigna null a la extension gradfile
          $scope.data.requiredFileRad = false;
        }
      }, 100);
    })
    $('#upqrfile').change(function () {//Detecta los cambios que sufre el input file
      $timeout(function () {//Usado para validar el file en tiempo real
        var file = document.getElementById('upqrfile').files[0];//Obtiene el file del input para validarlo
        console.log('pqrfile:', file);
        $scope.data.formatou = '';
        if (file) {//Valida si existe el archivo en el input file
          if (file.size <= 5242880) {//valida que el size del file sea <= 5 mb
            if (file.name.split('.').pop().toLowerCase() == 'pdf') {//Obtiene la extension del file y valida que sea un pdf
              $scope.data.formatou = 'Dentro Del Peso Limite y Formato Validado';
              $scope.data.requiredFileU = false;
              var reader = new FileReader();
              reader.onload = function (event) {
                $timeout(function () {
                  $scope.pqrData.EditCorresp.pqrFile = event.target.result; //Asigna el file al ng-model pqrFile
                  $scope.pqrData.EditCorresp.ext = file.name.split('.').pop().toLowerCase();//Asigna la extension del pqrFile
                })
              };
              reader.readAsDataURL(file);
            } else {
              $scope.data.formatou = 'Formato Invalido solo puedes adjuntar archivos con extensión .pdf';
              $scope.pqrData.EditCorresp.pqrFile = null;//Asigna null al ng-model pqrFile
              $scope.pqrData.EditCorresp.ext = null;//Asigna null a la extension pqrFile
              $scope.data.requiredFileU = true;
            }
          } else {
            $scope.data.formatou = 'Limite de Peso Excedido';
            $scope.pqrData.EditCorresp.pqrFile = null;//Asigna null al ng-model pqrFile
            $scope.pqrData.EditCorresp.ext = null;//Asigna null a la extension pqrFile
            $scope.data.requiredFileU = true;
          }
        } else {
          $scope.data.formatou = '';
          $scope.pqrData.EditCorresp.pqrFile = null;//Asigna null al ng-model pqrFile
          $scope.pqrData.EditCorresp.ext = null;//Asigna null a la extension pqrFile
          $scope.data.requiredFileU = false;
        }
      }, 100);
    })
    $('#ugradfile').change(function () {//Detecta los cambios que sufre el input file
      $timeout(function () {//Usado para validar el file en tiempo real
        var file = document.getElementById('ugradfile').files[0];//Obtiene el file del input para validarlo
        console.log('ugradfile:', file);
        $scope.datagradu = '';
        if (file) {//Valida si existe el archivo en el input file
          if (file.size <= 5242880) {//valida que el size del file sea <= 5 mb
            if (file.name.split('.').pop().toLowerCase() in { 'png': 'png', 'jpg': 'jpg', 'jpeg': 'jpeg', 'pdf': 'pdf', 'doc': 'doc', 'docx': 'docx' }) {//Obtiene la extension del file
              $scope.datagradu = 'Dentro Del Peso Limite y Formato Validado';
              $scope.data.requiredFileRadU = false;
              var reader = new FileReader();
              reader.onload = function (event) {
                $timeout(function () {
                  $scope.pqrData.EditCorresp.gradfile = event.target.result; //Asigna el file al ng-model gradfile
                  $scope.pqrData.EditCorresp.gradext = file.name.split('.').pop().toLowerCase();//Asigna la extension del gradfile
                })
              };
              reader.readAsDataURL(file);
            } else {
              $scope.datagradu = 'Formato Invalido solo puedes adjuntar archivos con extensión .jpg y .png';
              $scope.pqrData.EditCorresp.gradfile = null;//Asigna null al ng-model gradfile
              $scope.pqrData.EditCorresp.gradext = null;//Asigna null a la extension gradfile
              $scope.data.requiredFileRadU = true;
            }
          } else {
            $scope.datagradu = 'Limite de Peso Excedido';
            $scope.pqrData.EditCorresp.gradfile = null;//Asigna null al ng-model gradfile
            $scope.pqrData.EditCorresp.gradext = null;//Asigna null a la extension gradfile
            $scope.data.requiredFileRadU = true;
          }
        } else {
          $scope.datagradu = '';
          $scope.pqrData.EditCorresp.gradfile = null;//Asigna null al ng-model gradfile
          $scope.pqrData.EditCorresp.gradext = null;//Asigna null a la extension gradfile
          $scope.data.requiredFileRadU = false;
        }
      }, 100);
    })

    $('#uggesfile').change(function () {//Detecta los cambios que sufre el input file
      $timeout(function () {//Usado para validar el file en tiempo real
        var file = document.getElementById('uggesfile').files[0];//Obtiene el file del input para validarlo
        console.log('ggesfile:', file);
        $scope.dataggesu = '';
        if (file) {//Valida si existe el archivo en el input file
          if (file.size <= 5242880) {//valida que el size del file sea <= 5 mb
            if (file.name.split('.').pop().toLowerCase() in { 'png': 'png', 'jpg': 'jpg', 'jpeg': 'jpeg', 'pdf': 'pdf', 'doc': 'doc', 'docx': 'docx' }) {
              $scope.dataggesu = 'Dentro Del Peso Limite y Formato Validado';
              $scope.data.requiredFileGesU = false;
              var reader = new FileReader();
              reader.onload = function (event) {
                $timeout(function () {
                  $scope.pqrData.EditCorresp.ggesfile = event.target.result; //Asigna el file al ng-model gradfile
                  $scope.pqrData.EditCorresp.ggesext = file.name.split('.').pop().toLowerCase();//Asigna la extension del gradfile
                })
              };
              reader.readAsDataURL(file);
            } else {
              $scope.dataggesu = 'Formato Invalido solo puedes adjuntar archivos con extensión .jpg y .png';
              $scope.pqrData.EditCorresp.ggesfile = null;//Asigna null al ng-model gradfile
              $scope.pqrData.EditCorresp.ggesext = null;//Asigna null a la extension gradfile
              $scope.data.requiredFileGesU = true;
            }
          } else {
            $scope.dataggesu = 'Limite de Peso Excedido';
            $scope.pqrData.EditCorresp.ggesfile = null;//Asigna null al ng-model gradfile
            $scope.pqrData.EditCorresp.ggesext = null;//Asigna null a la extension gradfile
            $scope.data.requiredFileRadU = true;
          }
        } else {
          $scope.dataggesu = '';
          $scope.pqrData.EditCorresp.ggesfile = null;//Asigna null al ng-model gradfile
          $scope.pqrData.EditCorresp.ggesext = null;//Asigna null a la extension gradfile
          $scope.data.requiredFileGesU = false;
        }
      }, 100);
    })

    $scope.tempfilesoportepq = '';
    $scope.uploadImage = function (e) {
      console.log(e.dataset);
      $scope.tempfilesoportepq = e;
      $timeout(function () {//Usado para validar el file en tiempo real
        $scope.soportepq.filetemp = e.files[0];
        if ($scope.soportepq.filetemp) {//Valida si existe el archivo en el input file
          if ($scope.soportepq.filetemp.size <= 5000000) {//valida que el size del file sea <= 5 mb
            if ($scope.soportepq.filetemp.name.split('.').pop().toLowerCase() in { 'png': 'png', 'jpg': 'jpg', 'jpeg': 'jpeg', 'pdf': 'pdf' }) {
              var reader = new FileReader();
              reader.onload = function (event) {
                $timeout(function () {
                  $scope.soportepq.file = event.target.result;
                  $scope.soportepq.nombre = $scope.soportepq.filetemp.name.split('.').pop().toLowerCase();
                  $scope.soportepq.ext = $scope.soportepq.filetemp.name.split('.').pop().toLowerCase();
                  console.log(event.target.result); //Asigna el file al ng-model
                  console.log($scope.soportepq.filetemp.name.split('.').pop().toLowerCase());//Asigna la extension del
                })
              };
              reader.readAsDataURL($scope.soportepq.filetemp);
              document.querySelectorAll(".input-pq").forEach(function (element, i) {
                if (element.id != e.id) {
                  $("#pqfile" + i)[0].parentElement.firstElementChild.hidden = true;
                }
              });
            } else {
              $scope.soportepq = { 'file': null, 'filetemp': null, 'nombre': null };
              swal('PQ CORESPONDENCIA', 'Formato no valido, permitidos jpg , png y pdf!', 'error').catch(swal.noop);
            }
          } else {
            swal('PQ CORESPONDENCIA', 'Limite de Peso Excedido', 'error').catch(swal.noop);
            $scope.soportepq = { 'file': null, 'filetemp': null, 'nombre': null };
          }
        } else {
          $scope.soportepq = { 'file': null, 'filetemp': null, 'nombre': null };
        }
      }, 100);



    }

    $scope.cancelfile = function () {
      document.querySelectorAll(".input-pq").forEach(function (element, i) {
        $("#pqfile" + i)[0].parentElement.firstElementChild.hidden = false;
        $("#pqfile" + i).val('');
      });
      $scope.soportepq = { 'file': null, 'filetemp': null, 'nombre': null };
    }





    $('#observaciones').change(function () {//Remueve espacios en al campo observaciones
      var s = document.getElementById('observaciones').value;//Obtiene el valor del campo observaciones
      s = s.replace(/(^\s*)|(\s*$)/gi, "");
      s = s.replace(/[ ]{2,}/gi, " ");
      s = s.replace(/\n /, "\n");
      document.getElementById('observaciones').value = s;//Asigna las observaciones sin espacios en blanco
    })




    $scope.fnExcelReport = function () {
      //$scope.check_option == false ?
      window.open("php/siau/pqr/reportepqrsa.php");
      //: window.open("php/siau/pqr/reportepqrsp.php");
    }

    /*window.onload = function () {
      var myInput = document.getElementById('observaciones');
      myInput.onpaste = function (e) {
        swal({
          type: 'error',
          title: 'No completado',
          text: 'No puedes pegar en este campo!',
          timer: 1000
        }).catch(swal.noop);
        e.preventDefault();
      }
    }*/
    // Cargue masivo PQR SUPERSALUD
    $('#pqrMassive').change(function () {//Detecta los cambios que sufre el input file
      $timeout(function () {//Usado para validar el file en tiempo real
        var file = document.getElementById('pqrMassive').files[0];//Obtiene el file del input para validarlo
        $scope.dataFile = '';
        if (file) {//Valida si existe el archivo en el input file
          if (file.name.split('.').pop().toLowerCase() in { 'xls,': 'xls', 'xlsx': 'xlsx' }) {
            $scope.dataFile = 'Formato Valido';

            var reader = new FileReader();
            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
              reader.onload = function (e) {
                $timeout(function () {
                  $scope.ProcessExcel(e.target.result);
                  $scope.filePqrs = e.target.result;
                })
              };
              reader.readAsBinaryString(file);
            }

          } else {
            $scope.dataFile = 'Formato Invalido solo puedes adjuntar archivos con extensi�n .xlsx o .xlsx';
            $scope.filePqrs = null;//Asigna null al ng-model filePqrs
            $scope.filePqrsExt = null;//Asigna null a la extension filePqrs
            $scope.jsonExport = [];
          }

        } else {
          $scope.dataFile = '';
          $scope.filePqrs = null;//Asigna null al ng-model filePqrs
          $scope.filePqrsExt = null;//Asigna null a la extension filePqrs
          $scope.jsonExport = [];
        }
      }, 100);
    })


    $scope.getPQRSExcel = function (estado) {
      if (estado == 'destruir') { swal({ title: 'Cargando Informacion' }); swal.showLoading(); }
      pqrHttp.postObtenerPqrExcel().then(function (response) {
        if (response.data.length > 0) {
          if (estado == 'destruir' && $scope.listSolicitudes != undefined) {
            $scope.listSolicitudes.destroy();
          }
          $scope.pqrExcel = response.data;
          setTimeout(function () {
            $scope.$apply();
            }, 300);
          setTimeout(function () {
            $scope.listSolicitudes = $('#tablePQRS').DataTable({
              dom: 'Bfrtip',
              responsive: true,
              buttons: ['copy', 'csv', 'excel', 'print'],
              language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
              lengthMenu: [[10, 50, -1], [10, 50, 'Todas']],
              order: [[0, "desc"]]
            });
            swal.close();
          }, 500);
        } else {
          //$scope.pqrExcel = [];
          /*if (estado == 'destruir' && $scope.listSolicitudes != undefined) {
            $scope.listSolicitudes.destroy();
          }*/
          swal('Genesis informa', 'No hay Informacion para Mostrar', 'info');
        }
      });
    }


    $scope.ProcessExcel = function (data) {
      //Read the Excel File data.
      var workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach(function (sheetName) {
        var rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        $scope.excelJsonObj = rowObject;

      })
      $scope.excelJsonObj.forEach(element => {
        console.log(element);

        // $scope.jsonExport.push({
        //     'PQR_CODIGO': element.PQR_CODIGO,
        //     'PQR_CANAL': element.PQR_CANAL,
        //     'PQR_NURC': element.PQR_NURC,
        //     'FECHA_CREACION': null,
        //     'PET_TIPODOC': element.PET_TIPODOC,
        //     'PET_NUMDOC': element.PET_NUMDOC,
        //     'PET_NOMBRES': element.PET_NOMBRES,
        //     'PET_TELEFONO': element.PET_TELEFONO,
        //     'PET_MAIL': element.PET_MAIL,
        //     'PET_DIRECCION': element.PET_DIRECCION,
        //     'PQR_TIPOPETICION': element.PQR_TIPOPETICION,
        //     'AFEC_TIPODOC': element.AFEC_TIPODOC,
        //     'AFEC_NUMDOC': element.AFEC_NUMDOC,
        //     'COD_MACROMOT': element.COD_MACROMOT,
        //     'COD_MOTGEN': element.COD_MOTGEN,
        //     'COD_MOTESP': element.COD_MOTESP,
        //     'OBSERVACION': element.OBSERVACION,
        //     'FECHA_RADICACION': null,
        //     'AFEC_REGAFILIACION': element.AFEC_REGAFILIACION == 'Contributivo' ? 'C' : 'S',
        //     'RIESGO_VIDA': element.RIESGO_VIDA == 'NO' ? 'N' : 'S'

        // })

        $scope.jsonExport.push({
          'PQR_CODIGO': element.PQR_CODIGO ? element.PQR_CODIGO : element.radicado,
          'PQR_CANAL': element.PQR_CANAL ? element.PQR_CANAL : element.pqr_canal,
          'PQR_NURC': element.PQR_NURC ? element.PQR_NURC : element.pq_nurc,
          'FECHA_CREACION': null,
          'PET_TIPODOC': element.PET_TIPODOC ? element.PET_TIPODOC : element.pet_tipodoc,
          'PET_NUMDOC': element.PET_NUMDOC ? element.PET_NUMDOC : element.pet_numdoc,
          'PET_NOMBRES': element.PET_NOMBRES ? element.PET_NOMBRES : element.pet_nombres,
          'PET_TELEFONO': element.PET_TELEFONO ? element.PET_TELEFONO : element.pet_telefono,
          'PET_MAIL': element.PET_MAIL ? element.PET_MAIL : element.pet_mail,
          'PET_DIRECCION': element.PET_DIRECCION ? element.PET_DIRECCION : element.pet_direccion,
          'PQR_TIPOPETICION': element.PQR_TIPOPETICION ? element.PQR_TIPOPETICION : element.pqr_tipopeticion,
          'AFEC_TIPODOC': element.AFEC_TIPODOC ? element.AFEC_TIPODOC : element.afec_tipodoc,
          'AFEC_NUMDOC': element.AFEC_NUMDOC ? element.AFEC_NUMDOC : element.afec_numdoc,
          'COD_MACROMOT': element.COD_MACROMOT ? element.COD_MACROMOT : element.cod_macromot,
          'COD_MOTGEN': element.COD_MOTGEN ? element.COD_MOTGEN : element.cod_motgen,
          'COD_MOTESP': element.COD_MOTESP ? element.COD_MOTESP : element.cod_motesp,
          'OBSERVACION': element.OBSERVACION ? $scope.FormatTexto_2(element.OBSERVACION) : $scope.FormatTexto_2(element.observacion),
          'MOTIVO_ESPECIFICO': element.MOTIVO_ESPECIFICO ? $scope.FormatTexto_2(element.MOTIVO_ESPECIFICO) : $scope.FormatTexto_2(element.motivo_especifico),
          'FECHA_RADICACION': null,
          'AFEC_REGAFILIACION': '',
          // element.AFEC_REGAFILIACION == 'Contributivo' ? 'C' : 'S'
          'RIESGO_VIDA': element.RIESGO_VIDA ? (element.RIESGO_VIDA == 'NO' ? 'N' : 'S') : (element.riesgo_vida == 'NO' ? 'N' : 'S')

        })


      });

    };

    $scope.FormatTexto_2 = function (value) {
      var valor = value;
      valor = valor.replace(/[|!¿¡?°"#/()=$%&''´¨´¨¨¨<>¥]/g, '');
      valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
      return valor.toString().toUpperCase();
    }

    $scope.sumUpload = 0;
    $scope.loadPQRS = function () {
      if ($scope.jsonExport.length == 0) {
        swal('No completado', 'No has adjuntado el archivo para el cargue Masivo!', 'error').catch(swal.noop);
      } else {
        $scope.jsonExport.forEach(element => {
          //console.log(JSON.stringify(element));
          swal({ title: 'Cargando Informacion' }); swal.showLoading();
          pqrHttp.postCarguePqr(JSON.stringify(element)).then(function (res) {
            console.log(res);
            $scope.sumUpload++;
            $timeout(function () {//Usado para validar el file en tiempo real
              if ($scope.jsonExport.length == $scope.sumUpload) {
                swal.close();
                $scope.sumUpload = 0;
                swal('Genesis informa', 'Datos cargados Correctamente', 'success');
              }
            }, 100)
          })


        });


      }

    }

    $scope.dataPqrExcel = null;
    $scope.showModalEditarSuper = function (pqr) {//Abre el modal para editar PQRSUPERSALUD
      $scope.dataPqrExcel = pqr;
      ngDialog.open({
        template: 'views/siau/pqr/modals/modalEditarSuper.html', className: 'ngdialog-theme-plain',
        controller: 'modalEditarSuperSalud', scope: $scope
      }).closePromise.then(function (data) {//Respuesta del valor seleccionado en modal de motivos especificos
        if (data.value != '$closeButton' && data.value != '$escape' && data.value != '$document') {//Valida que el motivo especifico nunca se asigne vacio

          $scope.getPQRSExcel('destruir');
        }
      });
    }//Fin


    $scope.trazapqr = "";
    $scope.tramite = [{ 'Codigo': 'N', 'Nombre': 'NO REQUIERE' }, { 'Codigo': 'S', 'Nombre': 'REQUIERE' }]
    $scope.areaspqr = [];
    $scope.datahistoricopqr = [];
    $scope.detallecorrespondencia = null;
    $scope.openmodals = function (tipo, pqr) {
      console.log(tipo);
      console.log(pqr);


      switch (tipo) {

        case 'trazapqr':
          if (pqr) {
            pqrHttp.getInfoAseguramientoPQR(pqr.CODIGO).then(function (response) {
              $scope.dpqr = response.data[0];
            })
          }
          pqrHttp.p_mostrar_traza(pqr.CODIGO).then(function (response) {
            $scope.trazapqr = response;
          })

          $("#trazapqr").modal("open");
          break;
        case 'modalcorrespondencia':
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          pqrHttp.get_detalle_correspondencia(pqr.CONSECUTIVO).then(function (response) {
            console.log(response);
            $scope.detallecorrespondencia = response;

            pqrHttp.get_func_areas($scope.detallecorrespondencia.area_correspondencia, 0).then(function (response) {
              $scope.responsablesdetalles = response;

            })
            swal.close();
            $("#modalcorrespondencia").modal("open");

          })

          break;

        case 'modaltranferircorresp':
          $scope.nomarea = { nomarea: null };
          $scope.check_option_sede = false;
          $scope.responsablesareast = [];
          $scope.dpqr = pqr;
          pqrHttp.get_areas().then(function (response) {
            $scope.areaspqr = response;
          })

          pqrHttp.get_pqr_seccionales().then(function (response) {
            console.log(response);
            $scope.seccionalpqr = response;
          })
          $("#modaltranferircorresp").modal("open");

          break;

        case 'modalpqcorrespondencia':
          $scope.pqcorrespondencia = [];
          //  pqrHttp.get_pq_correspondencia(sessionStorage.getItem('cedula')).then(function (response) {
          //    $scope.getPQ('A');
          //  $("#modalpqcorrespondencia").modal("open");
          //})
          $scope.getPQ('A');
          $("#modalpqcorrespondencia").modal("open");

          break;
        case 'historicopqr':
          pqrHttp.get_historico_pqr(sessionStorage.getItem('cedula')).then(function (res) {
            if (res.length > 0) {
              $scope.datahistoricopqr = res;
              $('#historicopqr').modal("open");
            } else {
              swal('Historico Solicitudes', 'No hay Solicitudes Disponibles!', 'error');
            }

          })


          break;

        case 'modaltercero':
          $scope.btercero = '';
          $scope.lisTerceros = [];
          $('#modaltercero').modal("open");
          break;

        case 'modalsearchres':
          $scope.filterFuncionarios = '';
          $scope.sedes = [];
          $scope.areastemp = [];
          $scope.tempresponsables = [];
          $scope.tempsede = '';
          $scope.temparea = '';
          $scope.get_sedes();
          $scope.inactivefuncionario = true;
          $('#modalsearchres').modal("open");
          break;
        case 'modalvalidardocumento':
          $scope.getdocumentosrad();
          $('#modalvalidardocumento').modal("open");
          break;
        case 'modaldevolucion':
          $scope.dpqr = pqr;
          pqrHttp.get_motivosacciones('D', 'P').then(function (response) {
            console.log(response.data);
            $scope.listMotivos = response.data;
          })
          $('#modaldevolucion').modal("open");
          break;
        case 'modalradicacion':
          $("#modalradicacion").modal("close");
          break;
        default:
      }
    }
    $scope.getdocumentosrad = function () {
      pqrHttp.get_documentos_radicar().then(function (response) {
        console.log(response);
        $scope.pqr_documentos_radicar = response;
      })
    }

    //$scope.getPQ = function (params) {
    //  if (params == 'A') {
    //    pqrHttp.get_pq_pqr().then(function (res) {
    //      $scope.pqcorrespondencia = res;
    //    $(".input_pq").on('change', function () {
    //      console.log("file", this);
    //  });
    //  })
    // }
    //if (params == 'P') {
    //  pqrHttp.get_pqprocesado_pqr().then(function (res) {
    //    $scope.pqcorrespondencia = res;
    //})
    //  }
    //  $scope.soportepq.file = null;
    //$scope.soportepq.nombre = null;
    // }

    $scope.getPQ = function (state) {
      var temptipocorrepondencia = 'E';
      if ($scope.check_optiontpq == false) {
        temptipocorrepondencia = 'E';
        // $scope.correspondencias = [];


      }
      if ($scope.check_optiontpq == true) {
        temptipocorrepondencia = 'R';
        // $scope.correspondencias = [];
      }
      console.log('state_', state);
      console.log('temptipocorrepondencia_', temptipocorrepondencia);
      pqrHttp.get_pq_pqr(temptipocorrepondencia, state, sessionStorage.getItem('cedula')).then(function (response) {
        $scope.pqcorrespondencia = response;
      })
      $scope.soportepq.file = null;
      $scope.soportepq.nombre = null;

    }
    $scope.nomarea = { nomarea: null };
    $scope.closemodals = function (tipo) {
      switch (tipo) {
        case 'trazapqr':
          $("#trazapqr").modal("close");
          break;
        case 'modalcorrespondencia':
          $("#modalcorrespondencia").modal("close");
          break;
        case 'modaltranferircorresp':
          $("#modaltranferircorresp").modal("close");
          break;
        case 'modalpqcorrespondencia':
          $scope.soportepq = { 'file': null, 'filetemp': null, 'nombre': null };
          $scope.check_optionpq = false;
          $scope.filterPQ = '';
          $("#modalpqcorrespondencia").modal("close");
          break;
        case 'historicopqr':
          $("#historicopqr").modal("close");
          break;
        case 'modalcourier':
          $scope.showNewOperador = true;
          $("#modalcourier").modal("close");
          break;
        case 'modaltercero':
          $scope.inactivetercero = true;
          $scope.inactiveterceronew = true;
          $scope.bttipo = null;
          $("#modaltercero").modal("close");
          break;
        case 'modalsearchres':
          $scope.tempareahtml = "";
          $("#modalsearchres").modal("close");
          break;
        case 'modalvalidardocumento':
          $scope.pqr_documentos_radicar = [];
          $scope.docbtercero = null;
          $scope.bttipodocrad = null;
          $scope.docrad = null;
          $scope.inactivedocumento = true;
          $scope.datadocumento = null;
          $("#modalvalidardocumento").modal("close");
          break;
        case 'modaldevolucion':
          $scope.motdevolucion = "";
          $scope.obsdevolucion = "";
          $("#modaldevolucion").modal("close");
          break;

        default:
      }
    }

    $scope.area = { Codigo: 0, Nombre: 'SELECCIONAR' };
    $scope.inactiveArea = true;
    $scope.getArea = function (nomarea, tipo) {
      if (nomarea) {
        $scope.pqrData.t_seccional = 'N';
        pqrHttp.get_func_areas(nomarea, 'N').then(function (response) {

          if (tipo == 'R') {
            $scope.responsablesareas = response;
          }

          if (tipo == 'T') {
            $scope.responsablesareast = response;
          }



          if (response.length > 0) {
            $scope.area.Codigo = nomarea;
          }
        })
      }
    }

    $scope.changeAreas = function () {
      $scope.responsablesareast = [];
      $scope.nomareat.nomareat = null;
      $scope.pqrsecionalt = null;
    }


    $scope.getResSeccional = function (params, tab) {
      if (params == 'S') {
        $scope.pqrData.t_seccional = 'S';
        pqrHttp.get_func_areas(sessionStorage.getItem('municipio'), 'S').then(function (response) {
          if (tab == 'R') {
            $scope.responsablesareas = response;
          }
          if (tab == 'C') {
            $scope.responsablesareast = response;
          }
          if (tab == 'U') {
            $scope.responsablesareas = response;
            $scope.vcorrespondencia.area_correspondencia = sessionStorage.getItem('municipio');
          }
        })

        if (tab == 'R') {
          $scope.pqrData.seccional = sessionStorage.getItem('municipio');
          $scope.area.Codigo = null;
        }

      } else if (params == '') {
        if (tab == 'R') {
          $scope.responsablesareas = [];
          $scope.pqrData.seccional = null;
          $scope.area.Codigo = null;
        }

        if (tab == 'C') {
          $scope.responsablesareast = [];
        }

      } else {
        $scope.pqrData.seccional = '1';
        $scope.area.Codigo = '99';
        $scope.pqrData.t_seccional = 'N';
        pqrHttp.get_func_areas(0, 'N').then(function (response) {
          console.log(response);
          if (tab == 'R') {
            $scope.responsablesareas = response;
          }
          if (tab == 'C') {
            $scope.responsablesareast = response;
          }
          if (tab == 'U') {
            $scope.responsablesareas = response;
            $scope.vcorrespondencia.area_correspondencia = 1;
          }
        })
      }
    }
    $scope.getResSeccionalCod = function (params) {
      console.log(params);
      if (params) {
        pqrHttp.get_func_areas(0, params).then(function (response) {
          $scope.responsablesareast = response;
          $scope.area.Codigo = params;
        })
      } else {
        $scope.responsablesareast = [];

      }
    }

    $scope.transferirCorrespondencia = function () {
      pqrHttp.postTransferirCorrespondencia($scope.area.Codigo, $scope.dpqr.CODIGO, sessionStorage.getItem('cedula')).then(function (response) {
        if (response.data.codigo == '0') {
          swal('Genesis informa', response.Nombre, 'success').then(function () {
            $scope.check_optionc ? $scope.getCorrespondencia('R') : $scope.getCorrespondencia('A');
          }).catch(swal.noop);
        }
        if (response.data.codigo == '1') {
          swal('Genesis informa', response.data.Nombre, 'error');
        }
      });
    }
    $scope.getTramite = function (params) {
      if (params == 'S') {
        $scope.data.inactiveRespuesta = false;
      } if (params == 'N') {
        $scope.data.inactiveRespuesta = true;
        $scope.data.inactiveSave = false;
      }
    }
    $scope.hidegrafica = true;
    $scope.hidegraficapie = true;
    $scope.getStatistics = function () {
      pqrHttp.get_pqr_estadisticas(sessionStorage.getItem('cedula'), $scope.check_optione == false ? 'A' : 'H').then(function (response) {
        if (response.data.length == 0) {
          setTimeout(() => {
            $scope.hidegraficapie = true;
          }, 100);

          swal('Genesis informa', 'No hay estadisticas para mostrar!', 'error');
        } else {
          $scope.dataReportPie = response.data.pie;
          $scope.hidegraficapie = false;
          $scope.createGraph();
        }

      })

    }
    $scope.tiposol = "";
    $scope.createGraph = function () {
      if ($scope.dataReportPie.length != 0) {
        $scope.pie_datos = [];
        for (var i = 0; i < $scope.dataReportPie.length; i++) {
          $scope.pie_datos.push({
            "name": $scope.dataReportPie[i].SOLICITUD,
            "tipo": $scope.dataReportPie[i].TIPOSOLICITUD,
            "y": parseInt($scope.dataReportPie[i].CANTIDAD),
            "drilldown": 1,
            "color": $scope.dataReportPie[i].COLOR
          })
        }
        $scope.datos_completos = $scope.dataReportPie;
        Highcharts.chart('container', {
          chart: {
            type: 'pie'
          },
          title: {
            text: 'Cantidades de Solicitudes por Tipo'
          },
          subtitle: {
            text: ''
          },
          width: 50,
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            },
            series: {
              dataLabels: {
                enabled: false,
                format: '{point.name}: {point.y}'
              }
            }
          },
          credits: {
            enabled: false
          },
          tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
          },


          lang: {
            drillUpText: ' << ATRAS',


          },
          series: [{
            name: "CANTIDAD",
            colorByPoint: true,
            data: $scope.pie_datos,
            events: {
              click: function (event) {
                console.log(event.point);
                $scope.namesol = event.point.name;
                $scope.tiposol = event.point.options.tipo;
                $scope.getpqr_tiposol(event.point.options.tipo);
                $scope.pqrDataRes = [];
                $scope.hidetableres = true;
              }
            }
          }],
          drilldown: {
            series: $scope.datos_completos
          }
        });


      }
      $scope.hidetabletipsol = true;
      $scope.hidetableres = true;
      $scope.dataReportPieRes = [];
      $scope.pqrDataRes = [];
    }

    $scope.createGraphBar = function () {
      $scope.hidegrafica = false;
      $scope.bar_datos = [];
      for (var i = 0; i < $scope.dataReportBar.length; i++) {
        $scope.bar_datos.push({
          "name": $scope.dataReportBar[i].nombre,
          "cantidad": $scope.dataReportBar[i].nombre,
          "y": parseInt($scope.dataReportBar[i].cantidad),
          "drilldown": 1,
          "color": $scope.dataReportBar[i].COLOR
        })
      }
      $scope.datos_completos = $scope.dataReportBar;
      Highcharts.chart('containerbar', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Cantidad de Solicitudes Gestionadas por Funcionario'
        },
        subtitle: {
          text: ''
        },
        labels: {
          overflow: 'justify'
        },
        width: 50,
        xAxis: {
          type: 'category',
          labels: {
            rotation: 0,
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
            }
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Cantidad  Solicitudes'
          }
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        tooltip: {
          pointFormat: 'Solicitudes <b>{point.y} </b>'
        },
        series: [{
          name: 'Population',
          data: $scope.bar_datos,
          dataLabels: {
            enabled: true,

            // rotation: -90,
            // color: '#000',
            // align: 'center',
            // format: '{point.y}', // one decimal
            // y: 1, // 10 pixels down from the top
            // style: {
            //     fontSize: '13px',
            //     fontFamily: 'Verdana, sans-serif'
            // }
          }
        }]
      });
    }
    $scope.hidetabletipsol = true;
    $scope.getpqr_tiposol = function (params) {
      pqrHttp.getPQRTIPOSOL(params, sessionStorage.getItem('cedula'), $scope.check_optione == false ? 'A' : 'H').then(function (response) {
        console.log(response);
        $scope.dataReportPieRes = response;
        if ($scope.dataReportPieRes.length == 0) {
          $scope.hidetabletipsol = true;
        } else {
          $scope.hidetabletipsol = false;
          $scope.dataReportBar = response;
          $scope.createGraphBar();
        }
      })
    }

    $scope.hidetableres = true;
    $scope.showpqrs = function (params) {
      pqrHttp.get_PQR_TIPO_SOL($scope.tiposol, 'A', params).then(function (response) {
        $scope.pqrDataRes = response;
        if ($scope.pqrDataRes.length == 0) {
          $scope.hidetableres = true;
        } else {
          $scope.hidetableres = false;
        }
      })
    }

    $scope.adjuntarpq = function () {
      $scope.temppq = JSON.parse($("#" + $scope.tempfilesoportepq.id)[0].dataset.param).pqcodigo;
      pqrHttp.post_update_ruta_pq($scope.temppq, 'pqfile' + $scope.temppq, sessionStorage.getItem('cedula'), $scope.soportepq.file, $scope.soportepq.nombre, '3').then(function (response) {
        console.log(response);
        if (response.codigo == '0') {
          pqrHttp.get_pq_pqr().then(function (res) {
            $scope.pqcorrespondencia = res;
            $(".input_pq").on('change', function () {
              console.log("file", this);
            });
          })
          $scope.cancelfile();
          // swal('PQ CORESPONDENCIA', response.mensaje, 'success').catch(swal.noop);

          swal('PQ CORESPONDENCIA', response.mensaje, 'success').then(function () {

            pqrHttp.post_actualiza_estado_pq($scope.temppq, 'pqfile' + $scope.temppq).then(function (response) {
              console.log(response);

            }).catch(swal.noop);
          })
        } else {
          swal('PQ CORESPONDENCIA', response.mensaje, 'error').catch(swal.noop);
          $scope.cancelfile();
        }
      })
    }

    $scope.showsoportepq = function (params) {
      $scope.soportepq.file = null;
      setTimeout(() => { $scope.$apply(); }, 500);
      pqrHttp.dowloadfile(params.ruta, params.ftp).then(function (response) {
        console.log("me ejecute");
        $scope.soportepq.file = "temp/" + response.data;
      });
    }


    $scope.returnDiasHabiles = function (dias_habiles, dias) {
      if (Number(dias_habiles) < Number(dias)) {
        return '-' + dias;
      } else {
        return dias_habiles;
      }
    }

    $scope.courier = { tempcodigo: null, codigo: null, nombre: null, seleccion: null };
    $scope.showNewOperador = true;
    $scope.showFields = true;
    $scope.seleccionarOperador = function (item) {
      console.log('seleccionarOperador');
      console.log(item);
      console.log($scope.tipocallCourrier);
      if ($scope.tipocallCourrier == 'R') {
        $scope.courier.tempcodigo = item.CODIGO;
        $scope.courier.codigo = item.DOCUMENTO;
        $scope.courier.nombre = item.NOMBRE;
        $scope.courier.seleccion = $scope.courier.tempcodigo + ' - ' + $scope.courier.nombre;
        $scope.pqrData.courier = $scope.courier.tempcodigo;
      }
      if ($scope.tipocallCourrier == 'G') {
        for (let index = 0; index < $scope.tempcorrespenviada.length; index++) {
          const element = $scope.tempcorrespenviada[index].courier = item.CODIGO;;

          console.log(element);
        }
        console.log(JSON.stringify($scope.tempcorrespenviada));


        pqrHttp.post_actualizar_courier(JSON.stringify($scope.tempcorrespenviada), $scope.tempcorrespenviada.length).then(function (res) {
          console.log(res);

          swal(res.Codigo == '0' ? 'Completado' : 'No completado', res.Nombre, res.Codigo == '0' ? 'success' : 'error'
          ).then(function () {
            if (res.Codigo == '1') {

            } else if (res.Codigo == '0') {
              swal({
                title: 'Confirmar Proceso',
                html: '¿Desea completar los siguientes campos?<br>' +
                  '<div style="text-align: initial;display: flex;justify-content: center;align-items: center;"> ' +
                  ' 1. Número de Guía <br>' +
                  ' 2. Soporte</div>',
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'

              }).then((result) => {
                console.log(result);
                if (result) {
                  $timeout(function () {
                    $scope.showFields = false;
                  }, 100);
                }
              }).catch((result) => {
                $scope.closemodals('modalcourier');
                $scope.printformato('E');
              });

              // $scope.printformato('E');
            }
          }).catch(swal.noop);


        })



      }
      if ($scope.tipocallCourrier == 'R') {
        $scope.courier.tempcodigo = item.CODIGO;
        $scope.courier.codigo = item.DOCUMENTO;
        $scope.courier.nombre = item.NOMBRE;
        $scope.courier.seleccion = $scope.courier.tempcodigo + ' - ' + $scope.courier.nombre;
        $scope.pqrData.v_courier = $scope.courier.tempcodigo;
        $scope.closemodals('modalcourier');
      }
      if ($scope.tipocallCourrier == 'U') {
        $scope.courieredit.tempcodigo = item.CODIGO;
        $scope.courieredit.codigo = item.DOCUMENTO;
        $scope.courieredit.nombre = item.NOMBRE;
        $scope.courieredit.seleccion = $scope.courieredit.tempcodigo + ' - ' + $scope.courieredit.nombre;
        $scope.pqrData.EditCorresp.v_courier = $scope.courieredit.tempcodigo;
        $scope.closemodals('modalcourier');
      }

    }

    $scope.showAddOperador = function () {
      $scope.showNewOperador = false;
      pqrHttp.getServicioCorrepondencia().then(function (response) {
        $scope.tempservio = response;
      })

      pqrHttp.getAmbitoCorrepondencia().then(function (response) {
        $scope.tempambito = response;
      })
      pqrHttp.get_ciudades_pqr().then(function (response) {
        $scope.tempciudades = response;
      })
    }

    $scope.inserta_operador = function () {
      if ($scope.pqrData.NewOperador.documento && $scope.pqrData.NewOperador.nombre &&
        $scope.pqrData.NewOperador.municipio &&
        $scope.pqrData.NewOperador.servicio && $scope.pqrData.NewOperador.ambito) {
        pqrHttp.post_insertar_operador_corresp(JSON.stringify($scope.pqrData.NewOperador)).then(function (response) {
          console.log(response);
          if (response.Codigo == '0') {
            $scope.seleccionarOperador({ CODIGO: response.Consecutivo, DOCUMENTO: $scope.pqrData.NewOperador.documento, NOMBRE: $scope.pqrData.NewOperador.nombre });
            $scope.showNewOperador = true;
            swal('Operador', response.Nombre, 'success');
          } else {
            swal('Operador', response.Nombre, 'error');
          }

        })

      } else {
        swal('Operador', 'No pueden haber campos vacios!', 'error');
      }
    }

    $scope.objectguia = {
      numguia: null,
      gradfile: null,
      gradext: null,
      ftp_gradftp: '3'
    }
    $scope.saveguia = function () {
      console.log($scope.objectguia);
      for (let index = 0; index < $scope.tempcorrespenviada.length; index++) {
        $scope.tempcorrespenviada[index].numguia = $scope.objectguia.numguia;
        $scope.tempcorrespenviada[index].gradext = $scope.objectguia.gradext;

      }
      pqrHttp.post_actualizar_guia(JSON.stringify($scope.tempcorrespenviada),
        $scope.objectguia.numguia, $scope.tempcorrespenviada.length, $scope.objectguia.gradfile,
        $scope.objectguia.gradext).then(function (res) {
          console.log(res);

          swal(res.Codigo == '0' ? 'Completado' : 'No completado', res.Nombre, res.Codigo == '0' ? 'success' : 'error'
          ).then(function () {
            $scope.closemodals('modalcourier');
            if (res.Codigo == '1') {

            } else if (res.Codigo == '0') {

              $scope.printformato('E');
            }
          }).catch(swal.noop);


        })
    }
    $scope.cancelguia = function () {
      $scope.objectguia = {
        numguia: null,
        gradfile: null,
        gradext: null
      }
      $scope.closemodals('modalcourier');
    }
    $scope.formatSoloNumero = function (NID) {
      if (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/\-/g, '');
        valor = valor.replace(/[a-zA-Z]/g, '');
        valor = valor.replace(/[^0-9]/g, '');
        valor = valor.replace(/\./g, '');
        input.value = valor;
      }
    }

    $scope.bttipo = null;
    $scope.searchTercero = function (param, paramt) {//Funcion para obtener data de la ips
      console.log(param, paramt);
      if (param && paramt) {
        $scope.pqrData.NewTercero.documento = null;
        $scope.pqrData.NewTercero.nombre = null;
        $scope.pqrData.NewTercero.telefono = null;
        $scope.pqrData.NewTercero.correo = null;
        $scope.pqrData.NewTercero.ubicacion = null;
        $scope.pqrData.NewTercero.direccion = null;
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        pqrHttp.get_tercero(param, paramt).then(function (response) {
          console.log(response);
          if (response.Codigo == '0') {
            $scope.inactivetercero = true;
            $scope.inactiveterceronew = false;
            $scope.lisTerceros = [];

            pqrHttp.get_ciudades_pqr().then(function (response) {
              console.log(response);
              $scope.tempciudades = response;
            })
          } else {
            $scope.lisTerceros = response;
            $scope.inactivetercero = false;
            $scope.inactiveterceronew = true;
          }
          swal.close();
        })
      } else {
        $scope.inactivetercero = true;
        swal('TERCERO', 'No pueden haber campos vacios', 'error').catch(swal.noop);

      }
    }//Fin


    $scope.seleccionartercero = function (argument) {
      console.log('$scope.showtablecorresp', $scope.showtablecorresp);
      console.log($scope.pqrData.selectedCorrespondencia);
      if ($scope.showtablecorresp == false) {
        $scope.pqrData.Tercero.documento = argument.CODIGO;
        $scope.pqrData.Tercero.nombre = argument.NOMBRE;
        $scope.pqrData.Tercero.municipio = argument.MUNICIPIO;
        $scope.pqrData.Tercero.direccion = argument.DIRECCION;
        $scope.pqrData.Tercero.telefono = argument.TELEFONO;
        $scope.pqrData.Tercero.email = argument.CORREO;
        $scope.pqrData.Tercero.barrio = argument.BARRIO;
      }

      if ($scope.showtablecorresp == true) {
        $scope.pqrData.UpdateTercero.documento = argument.CODIGO;
        $scope.pqrData.UpdateTercero.nombre = argument.NOMBRE;
        $scope.pqrData.UpdateTercero.municipio = argument.MUNICIPIO;
        $scope.pqrData.UpdateTercero.direccion = argument.DIRECCION;
        $scope.pqrData.UpdateTercero.telefono = argument.TELEFONO;
        $scope.pqrData.UpdateTercero.email = argument.CORREO;
        $scope.pqrData.UpdateTercero.barrio = argument.BARRIO;
      }
      if ($scope.pqrData.selectedCorrespondencia == 'R') {
        $scope.pqrData.remitente = argument.CODIGO;
        $scope.pqrData.tercero = 'R';
      }
      if ($scope.pqrData.selectedCorrespondencia == 'E') {
        $scope.pqrData.destinatario = argument.CODIGO;
        $scope.pqrData.tercero = 'D';
      }

      $scope.inactivetercero = true;
      $scope.closemodals('modaltercero');
    }

    $scope.seleccionarfuncionario = function (argument) {

      if ($scope.tipocallTercero == 'R') {
        $scope.tempremitente.codigo = argument.codigo;
        $scope.tempremitente.nombre = argument.nombre;
        $scope.tempremitente.seleccion = $scope.tempremitente.codigo + ' - ' + $scope.tempremitente.nombre;
        $scope.pqrData.remitente = $scope.tempremitente.codigo;

        $scope.tempareajs.codigo = argument.aren_codigo;
        $scope.tempareajs.nombre = argument.arec_nombre;
        $scope.tempareajs.seleccion = $scope.tempareajs.codigo + ' - ' + $scope.tempareajs.nombre
        $scope.tempareahtml = "";
      }

      if ($scope.tipocallTercero == 'U') {
        $scope.tempremitentedit.codigo = argument.codigo;
        $scope.tempremitentedit.nombre = argument.nombre;
        $scope.tempremitentedit.seleccion = $scope.tempremitentedit.codigo + ' - ' + $scope.tempremitentedit.nombre;
        $scope.pqrData.EditCorresp.v_remitente = $scope.tempremitentedit.codigo;

        $scope.tempareajsedit.codigo = argument.aren_codigo;
        $scope.tempareajsedit.nombre = argument.arec_nombre;
        $scope.tempareajsedit.seleccion = $scope.tempareajsedit.codigo + ' - ' + $scope.tempareajsedit.nombre
        $scope.tempareahtml = "";
      }
      $scope.closemodals('modalsearchres');
    }

    $scope.removeRemitente = function (call) {
      if (call == 'R') {
        $scope.tempremitente = { codigo: null, nombre: null, seleccion: null };
        $scope.pqrData.remitente = null;
      }
      if (call == 'U') {
        $scope.tempremitentedit = { codigo: null, nombre: null, seleccion: null };
        $scope.pqrData.EditCorresp.v_remitente = null;
      }
    }


    $scope.get_sedes = function () {
      pqrHttp.get_sedes().then(function (response) {
        $scope.sedes = response;
      })
    }

    $scope.getsede = function (argument) {
      $scope.get_areas_sede(argument);
    }
    $scope.areastemp = [];
    $scope.get_areas_sede = function (argument) {
      pqrHttp.get_areas_sede(argument).then(function (response) {
        $scope.areastemp = response;
      })
    }

    $scope.inactivefuncionario = true;
    $scope.get_personas_area = function (argument) {
      if (argument) {
        pqrHttp.p_obtener_funcionario_eps(argument).then(function (response) {
          if (response.Codigo == 0) {
            $scope.tempresponsables = [];
            $scope.inactivefuncionario = true;
            swal('Funcionarios', 'No se encontraron resultados.', 'info').catch(swal.noop);
          } else {
            $scope.tempresponsables = response;
            $scope.inactivefuncionario = false;
          }


        })
      } else {
        $scope.tempresponsables = [];
        $scope.inactivefuncionario = true;
        swal('Funcionarios', 'No puedes haber campos con (*) vacios', 'info').catch(swal.noop);
      }

    }



    // $scope.sumPrint = 0;
    $scope.printformato = function (param) {
      console.log(param);

      if (param == 'R') {
        console.log($scope.tempcorresprecibida);
        $scope.creatpqcorresp($scope.tempcorresprecibida, param)

      }
      if (param == 'E') {
        console.log('$scope.tempcorrespenviada:', $scope.tempcorrespenviada);
        $scope.creatpqcorresp($scope.tempcorrespenviada, param)
      }

    }

    $scope.creatpqcorresp = function (pq, param) {
      console.log(pq);
      pqrHttp.post_ipq_correspondencia(pq.length, JSON.stringify(pq), sessionStorage.getItem('cedula')).then(function (res) {
        console.log(res);
        if (res.Codigo == '1') {
          if (param == 'R') {
            console.log($scope.tempcorresprecibida);
            window.open('views/siau/pqr/formato_envio_recibidocorrespondencia.php?numero=' + res.CodigoPQ, '_blank');
          }
          if (param == 'E') {
            console.log('$scope.tempcorrespenviada:', $scope.tempcorrespenviada);
            window.open('views/siau/pqr/formato_matriz_control_correspondencia.php?numero=' + res.CodigoPQ, '_blank');
          }
        } else {
          swal('Importante', res.Nombre, 'info');
        }

      })

    }

    $scope.arrayprint = [];
    $scope.printFormatoModal = function (param) {
      console.log(param);

      if (param.tipo_correspondencia.trim() == 'R') {
        window.open('views/siau/pqr/formato_envio_recibidocorrespondencia.php?numero=' + param.pqcodigo, '_blank');
      }

      if (param.tipo_correspondencia.trim() == 'E') {
        window.open('views/siau/pqr/formato_matriz_control_correspondencia.php?numero=' + param.pqcodigo, '_blank'); 1
      }
    }

    $scope.printsticker = function (param) {
      console.log(param);
      window.open('views/siau/pqr/formato_sticker.php?numero=' + param, '_blank');
    }

    $scope.showaddtercero = function () {
      $scope.inactivetercero = true;
      $scope.inactiveterceronew = false;
    }

    $scope.inserta_tercero = function () {
      console.log($scope.pqrData.NewTercero);
      // NewTercero: { documento: null, nombre: null, telefono: null, correo: null, ubicacion: null, direccion: null },
      if ($scope.pqrData.NewTercero.documento && $scope.pqrData.NewTercero.nombre &&
        $scope.pqrData.NewTercero.ubicacion && $scope.pqrData.NewTercero.direccion) {
        pqrHttp.post_insertar_tercero_pqr(JSON.stringify($scope.pqrData.NewTercero)).then(function (response) {
          console.log(response);

          if (response.Codigo == '0') {
            $scope.seleccionartercero({
              CODIGO: $scope.pqrData.NewTercero.documento,
              NOMBRE: $scope.pqrData.NewTercero.nombre,
              MUNICIPIO: $scope.pqrData.NewTercero.ubicacion,
              DIRECCION: $scope.pqrData.NewTercero.direccion,
              TELEFONO: $scope.pqrData.NewTercero.telefono,
              CORREO: $scope.pqrData.NewTercero.correo
            });

          }

          swal('TERCERO', response.Nombre, response.Codigo == '0' ? 'success' : 'error').catch(swal.noop);
        })
      } else {
        swal('TERCERO', 'No puedes haber campos con (*) vacios', 'error').catch(swal.noop);
      }


    }


    $scope.changeguia = function (param, call) {
      console.log(param, call);
      if (call == 'R') {
        if (param == null || param == '') {
          $scope.pqrData.numguia = null;
        }
      }
      if (call == 'U') {
        if (param == null || param == '') {
          $scope.pqrData.EditCorresp.v_numero_guia = null;
        }
      }
      if (param == '') {
        $scope.objectguia.numguia = null
      }

    }

    $scope.tempcorrespenviada = [];
    $scope.tempcorresprecibida = [];
    $scope.seleccionarcorrespondencia = function (vitem, index, check) {
      console.log($scope.check_optiontc);
      if (check == false) {
        if (!$scope.check_optiontc) {
          $scope.tempcorrespenviada = $scope.tempcorrespenviada.filter(item => item.codigo !== vitem.CONSECUTIVO);
        }
        if ($scope.check_optiontc) {
          $scope.tempcorresprecibida = $scope.tempcorresprecibida.filter(item => item.codigo !== vitem.CONSECUTIVO);
        }
      } else if (check == true) {

        if (!$scope.check_optiontc) {
          $scope.tempcorrespenviada.push({ 'codigo': vitem.CONSECUTIVO, 'pqr': vitem.CODIGO, 'index': index, 'check': check, 'tipo': vitem.TIPOCORRESPOND });
        }
        if ($scope.check_optiontc) {
          $scope.tempcorresprecibida.push({ 'codigo': vitem.CONSECUTIVO, 'pqr': vitem.CODIGO, 'index': index, 'check': check, 'tipo': vitem.TIPOCORRESPOND });
        }
      }
      console.log($scope.tempcorrespenviada);
      console.log($scope.tempcorresprecibida);
    }
    $scope.tipocallCourrier = '';
    $scope.openCourier = function (tipocall) {
      if (tipocall == 'R') {
        $scope.tipocallCourrier = 'R';
      }

      if (tipocall == 'G') {
        $scope.tipocallCourrier = 'G';
      }

      if (tipocall == 'U') {
        $scope.tipocallCourrier = 'U';
      }
      pqrHttp.get_operadores_correspondencia().then(function (res) {
        console.log(res);
        $scope.dataoperadores = res;
        $scope.filterCourier = '';
        $scope.showNewOperador = true;
        $scope.showFields = true;
        $('#modalcourier').modal("open");

      })
    }


    $scope.tipocallTercero = '';
    $scope.openTercero = function (tipocall) {
      if (tipocall == 'R') {
        $scope.tipocallTercero = 'R';
      }

      if (tipocall == 'U') {
        $scope.tipocallTercero = 'U';
      }

      $scope.filterFuncionarios = '';
      $scope.sedes = [];
      $scope.areastemp = [];
      $scope.tempresponsables = [];
      $scope.tempsede = '';
      $scope.temparea = '';
      $scope.get_sedes();
      $('#modalsearchres').modal("open");
    }

    $scope.showtablecorresp = false;
    $scope.courieredit = { tempcodigo: null, codigo: null, nombre: null, seleccion: null };

    $scope.cleanDataUpdate = function () {
      $timeout(function () {
        $scope.pqrData.EditCorresp.pqr = null;
        $scope.pqrData.EditCorresp.consecutivo_correspondencia = null;
        $scope.pqrData.EditCorresp.tipo_correspondencia = null;
        $scope.pqrData.EditCorresp.medio = null;
        $scope.pqrData.EditCorresp.v_observacion = null;
        $scope.pqrData.EditCorresp.v_courier = null;
        $scope.pqrData.EditCorresp.v_numero_guia = null;
        $scope.pqrData.EditCorresp.v_remitente = null;
        $scope.pqrData.EditCorresp.v_destinatario = null;
        $scope.pqrData.EditCorresp.area_correspondencia = null;
        $scope.pqrData.EditCorresp.pqrfile = null;
        $scope.pqrData.EditCorresp.ext = null;
        $scope.pqrData.EditCorresp.gradfile = null;
        $scope.pqrData.EditCorresp.gradext = null;
        $scope.pqrData.EditCorresp.ggesfile = null;
        $scope.pqrData.EditCorresp.ggesext = null;
        $scope.data.formatou = "";
        $scope.datagradu = "";
        $scope.dataggesu = "";
        document.getElementById('upqrfile').value = '';
        document.getElementById('ugradfile').value = '';
        document.getElementById('uggesfile').value = '';
        $scope.vcorrespondencia = null;
        document.getElementById('inputFilePlaceHolderupdate').value = '';
        document.getElementById('inputFilePlaceHolderGradu').value = '';
        document.getElementById('inputFilePlaceHolderGradg').value = '';
      }, 100);


    }
    $scope.areasecnacional = 'S';
    $scope.showUpdateCorresp = function (pqr) {
      $scope.cleanDataUpdate();
      $scope.pqrData.selectedCorrespondencia = pqr.TIPOCORRESPOND;
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      pqrHttp.getMediosRecepcionTipo('C').then(function (response) {
        $scope.mediosRecepcion = response;

      });

      if (pqr.TIPOCORRESPOND == 'R') {
        pqrHttp.get_areas().then(function (response) {
          $scope.areaspqr = response;
        })
      }
      if (sessionStorage.getItem('municipio') == '1') {
        $scope.data.inactivecorrespondenciaseccional = false;
        $scope.areasecnacional = 'N'
      } else {
        $scope.data.inactivecorrespondenciaseccional = true;
        $scope.areasecnacional = 'S'
      }
      pqrHttp.get_detalle_correspondencia(pqr.CONSECUTIVO).then(function (response) {
        console.log(response);
        $scope.vcorrespondencia = response;
        $scope.pqrData.EditCorresp.pqr = $scope.vcorrespondencia.pqr;
        $scope.pqrData.EditCorresp.consecutivo_correspondencia = $scope.vcorrespondencia.consecutivo_correspondencia;
        $scope.pqrData.EditCorresp.tipo_correspondencia = $scope.vcorrespondencia.tipo_correspondencia;
        $scope.pqrData.EditCorresp.medio = $scope.vcorrespondencia.mediorecepcion;
        $scope.pqrData.EditCorresp.v_remitente = $scope.vcorrespondencia.remitente;
        $scope.tempremitentedit.seleccion = $scope.vcorrespondencia.remitente + ' - ' + $scope.vcorrespondencia.nom_remitente;;
        $scope.pqrData.EditCorresp.v_observacion = $scope.vcorrespondencia.observaciones;
        $scope.pqrData.EditCorresp.v_numero_folio = Number($scope.vcorrespondencia.numero_folio);
        $scope.pqrData.EditCorresp.v_numero_guia = $scope.vcorrespondencia.numero_guia;
        $scope.courieredit.seleccion = $scope.vcorrespondencia.seleccion_courrier;
        $scope.pqrData.EditCorresp.v_courier = $scope.vcorrespondencia.courier;
        if ($scope.vcorrespondencia.tercero == 'R') {
          $scope.pqrData.UpdateTercero.documento = $scope.vcorrespondencia.remitente;
          $scope.pqrData.UpdateTercero.nombre = $scope.vcorrespondencia.nom_remitente;
          $scope.pqrData.UpdateTercero.telefono = $scope.vcorrespondencia.telefono_remitente;
          $scope.pqrData.UpdateTercero.correo = $scope.vcorrespondencia.correo_remitente;
          $scope.pqrData.UpdateTercero.municipio = $scope.vcorrespondencia.municipio_remitente;
          $scope.pqrData.UpdateTercero.ubicacion = $scope.vcorrespondencia.codiubi_remitente;
          $scope.pqrData.UpdateTercero.barrio = $scope.vcorrespondencia.barrio_remitente;
          $scope.pqrData.UpdateTercero.direccion = $scope.vcorrespondencia.direccion_remitente;
        }
        if ($scope.vcorrespondencia.tercero == 'D') {
          $scope.pqrData.UpdateTercero.documento = $scope.vcorrespondencia.destinatario;
          $scope.pqrData.UpdateTercero.nombre = $scope.vcorrespondencia.nom_destinatario;
          $scope.pqrData.UpdateTercero.telefono = $scope.vcorrespondencia.telefono_destinatario;
          $scope.pqrData.UpdateTercero.correo = $scope.vcorrespondencia.correo_destinatario;
          $scope.pqrData.UpdateTercero.municipio = $scope.vcorrespondencia.municipio_destinatario;
          $scope.pqrData.UpdateTercero.ubicacion = $scope.vcorrespondencia.codiubi_destinatario;
          $scope.pqrData.UpdateTercero.barrio = $scope.vcorrespondencia.barrio_destinatario;
          $scope.pqrData.UpdateTercero.direccion = $scope.vcorrespondencia.direccion_destinatario;
        }
        $scope.pqrData.UpdateTercero.senor = $scope.vcorrespondencia.senor;
        if ($scope.vcorrespondencia.area_correspondencia) {
          $scope.nomarea = $scope.vcorrespondencia.area_correspondencia;

          if (sessionStorage.getItem('municipio') == '1') {
            $scope.areasecnacional = 'N';
            $scope.getArea($scope.vcorrespondencia.area_correspondencia, 'R');

          } else {
            $scope.areasecnacional = 'S';
            $scope.getResSeccional($scope.areasecnacional, 'U');
          }



          console.log($scope.nomarea);
        }
        $scope.showtablecorresp = true;
        swal.close();
      });

    }

    $scope.cancelUpdateCorresp = function () {
      $scope.showtablecorresp = false;
      $scope.vcorrespondencia = null;
      $scope.pqrData.EditCorresp.pqr = null;
      $scope.pqrData.EditCorresp.consecutivo_correspondencia = null;
      $scope.pqrData.EditCorresp.tipo_correspondencia = null;
      $scope.pqrData.EditCorresp.medio = null;
      $scope.pqrData.EditCorresp.v_observacion = null;
      $scope.pqrData.EditCorresp.v_courier = null;
      $scope.pqrData.EditCorresp.v_numero_guia = null;
      $scope.pqrData.EditCorresp.v_remitente = null;
      $scope.pqrData.EditCorresp.v_destinatario = null;
      $scope.pqrData.EditCorresp.area_correspondencia = null;
      $scope.pqrData.EditCorresp.pqrfile = null;
      $scope.pqrData.EditCorresp.ext = null;
      $scope.pqrData.EditCorresp.gradfile = null;
      $scope.pqrData.EditCorresp.gradext = null;
      $scope.pqrData.EditCorresp.ggesfile = null;
      $scope.pqrData.EditCorresp.ggesext = null;
    }


    $scope.updateCorrespondencia = function () {
      if ($scope.vcorrespondencia.tipo_correspondencia == 'R') {
        $scope.pqrData.EditCorresp.v_destinatario = '';
      }

      if ($scope.vcorrespondencia.tipo_correspondencia == 'E') {
        $scope.pqrData.EditCorresp.v_destinatario = $scope.pqrData.UpdateTercero.documento;
      }

      $scope.pqrData.EditCorresp.v_senor = $scope.pqrData.UpdateTercero.senor;
      $scope.pqrData.EditCorresp.v_direccion = $scope.pqrData.UpdateTercero.direccion;
      $scope.pqrData.EditCorresp.v_ciudad = $scope.pqrData.UpdateTercero.municipio;
      $scope.pqrData.EditCorresp.v_telefono = $scope.pqrData.UpdateTercero.telefono;
      $scope.pqrData.EditCorresp.area_correspondencia = $scope.vcorrespondencia.area_correspondencia;
      $scope.pqrData.EditCorresp.ftp_gradftp = '3';
      $scope.pqrData.EditCorresp.ftp_ggesftp = '3';

      console.log(JSON.stringify($scope.pqrData.EditCorresp));


      pqrHttp.post_actualizar_correspondencia(JSON.stringify($scope.pqrData.EditCorresp), 1).then(function (response) {
        console.log(response);
        if (response.Codigo == 0) {
          $scope.showtablecorresp = false;

          // swal('Completado', response.Nombre, 'success').catch(swal.noop);

          swal('Completado', response.Nombre, 'success').then(function () {
            $scope.check_optionc ? $scope.getCorrespondencia('R') : $scope.getCorrespondencia('A');
          }).catch(swal.noop);

        }

        if (response.Codigo == 1) {
          swal('No Completado', response.Nombre, 'error').catch(swal.noop);
        }
      })

    }


    $scope.showform = function () {
      $scope.showmsj = true;
      $timeout(function () {
        $scope.pqrData.selectedtipoSolicitud = null; $scope.data.inactiveSolicitud = true; $scope.resetDataForm();
      }, 100);
    }

    $scope.inactivedocumento = true;
    $scope.datadocumento = null;
    $scope.validarDocumentoRadicar = function (doctercero, tipodocrad, docrad) {
      console.log(doctercero, tipodocrad, docrad);
      if (doctercero && tipodocrad && docrad) {
        pqrHttp.p_validar_documento_radicar(doctercero, tipodocrad, docrad).then(function (response) {
          console.log(response);

          if (response.length == 0) {
            $scope.inactivedocumento = true;
            $scope.datadocumento = null;
          } else {
            $scope.inactivedocumento = false;
            $scope.datadocumento = response;
          }


        })
      } else {

        swal('GENESIS', 'No pueden haber campos vacios!', 'info').catch(swal.noop);
      }

    }

    $scope.limpiarValidaDoc = function () {
      $scope.inactivedocumento = true;
      $scope.datadocumento = null;
    }

    $scope.saveDevolucion = function (motivo, observacion) {
      pqrHttp.postDevolverCorrespondencia($scope.dpqr.CONSECUTIVO,
        motivo, observacion, $scope.responsable).then(function (response) {
          console.log(response.data);

          if (response.data.codigo == 0) {
            swal('Completado', response.data.mensaje, 'success').then(function () {
              $scope.closemodals('modaldevolucion');
              $scope.getCorrespondencia();
            }).catch(swal.noop);

          }

          if (response.data.codigo == 1) {
            swal('No Completado', response.data.mensaje, 'error').catch(swal.noop);
          }
        })

    }

    $scope.hidepqr = true;
    $scope.fnbuscarPQR = function () {
      console.log("Buscar pqr");
      console.log(isNaN($scope.filterPQRS));
      if (isNaN($scope.filterPQRS) == false) {
        $scope.check_option ? $scope.getPQR('G') : $scope.getPQR('A');
        $scope.hidepqr = !$scope.hidepqr;
      } else {
        swal('INFO', 'Para realizar la busqueda debes Remover PQR- y dejar solo el numero del PQR.', 'info').catch(swal.noop);
      }

    }

    $scope.limpiarBusquedaPQR = function () {
      $scope.hidepqr = !$scope.hidepqr;
      $scope.filterPQRS = '';    //PQR-
      $scope.check_option ? $scope.getPQRS('G') : $scope.getPQRS('A');
    }


    $scope.getPQR = function (state) {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      pqrHttp.getPQR($scope.filterPQRS, state, sessionStorage.getItem('cedula')).then(function (response) {
        if (response.Codigo == '1') {
          swal('INFO', response.Nombre, 'info').catch(swal.noop);
          setTimeout(() => {
            $scope.limpiarBusquedaPQR();
          }, 3000);


        } else {
          $scope.pqrs = response;
          $scope.current_page = 1;
          $scope.arrayPages = [];
          $scope.pageActive = 1;
          $scope.inicio = 1;
          $scope.sum_records = 0;
          $scope.pages = Array($scope.numPages()).fill((x, i) => i).map((x, i) => i);
          $scope.changePage(1);
          swal.close();
        }
      })
    }

    $scope.admincorrespondencia = function () {
      $('#modalradicacion').modal("open");
      $scope.Listar_Usuarios_Radicacion();
    }

    $scope.Listar_Usuarios_Radicacion = function () {
      $scope.Usuario = {
        List: {
          Listado: [],
          Filtro: ''
        },
        Form: {
          Cedula: '',
          Nombre: '',
          Estado: ''
        }
      }
      $http({
        method: 'POST',
        url: "php/siau/pqr/Rpqr.php",
        data: {
          function: 'Obtener_Usuarios_Radicacion',
          Cedula: ''
        }
      }).then(function (response) {
        $scope.Usuario.List.Listado = response.data;
      })
    }

    $scope.Agregar_Usuario = function () {
      swal({
        title: 'Agregar Nuevo Usuario',
        text: 'Ingrese la cédula del funcionario.',
        input: 'text',
        inputPlaceholder: 'Ingrese la cédula...',
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        allowOutsideClick: false
      }).then(function (result) {
        if (result) {
          $http({
            method: 'POST',
            url: "php/siau/pqr/Rpqr.php",
            data: {
              function: 'Insertar_Usuario_Radicacion',
              v_accion: "I",
              Cedula: result,
              v_responsable: $scope.cedulausuario
            }
          }).then(function (response) {
            if (response.data != undefined) {
              if (response.data.codigo == 0) {
                swal({
                  title: "Mensaje",
                  text: response.data.mensaje,
                  type: "success",
                }).catch(swal.noop);
                $scope.Listar_Usuarios_Radicacion();
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

    $scope.In_Ac_Usuario = function (cedula) {
      swal({
        title: '¿Desea actualizar el estado del funcionario?',
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        allowOutsideClick: false
      }).then(function (result) {
        if (result) {
          $http({
            method: 'POST',
            url: "php/siau/pqr/Rpqr.php",
            data: {
              function: 'Inactivar_Activar_Usuario_Radicacion',
              v_accion: "A",
              Cedula: cedula,
              v_responsable: $scope.cedulausuario
            }
          }).then(function (response) {
            if (response.data != undefined) {
              if (response.data.codigo == 0) {
                swal({
                  title: "Mensaje",
                  text: response.data.mensaje,
                  type: "success",
                }).catch(swal.noop);
                $scope.Listar_Usuarios_Radicacion();
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
          let type = response.value.tipo;
          let id = response.value.documento;
          $scope.pqrData.User.selectedDocumento = type;
          $scope.pqrData.User.documento = id;
          $scope.searchAfiliado();
        }
      });
    }


    $scope.obtener_tutelas = function () {
      $http({
        method: 'POST',
        // url: "php/siau/pqr/Rpqr.php",
        url: "php/consultaAfiliados/consultaIntegral.php",
        data: {
          "function": "P_OBTENER_TUTELAS",
          "v_ptipodocumento": $scope.pqrData.User.selectedDocumento,
          "v_pdocumento": $scope.pqrData.User.documento
        }
      }).then(function (response) {
        $scope.listutetas = response.data;
      })
    }

    $scope.obtener_alto_costo = function () {
      $http({
        method: 'POST',
        url: "php/siau/pqr/Rpqr.php",
        data: {
          "function": "P_OBTENER_SINIESTROS_CONFIRMADOS_ALTOCOSTO",
          "v_ptipodocumento": $scope.pqrData.User.selectedDocumento,
          "v_pdocumento": $scope.pqrData.User.documento
        }
      }).then(function (response) {
        // console.log(response.data);
        $scope.listaltocosto = response.data;
      })
    }

    $scope.obtener_pqr = function () {
      $http({
        method: 'POST',
        url: "php/siau/pqr/Rpqr.php",
        data: {
          "function": "p_obtener_pqr_tipodocumento",
          "v_ptipodocumento": $scope.pqrData.User.selectedDocumento,
          "v_pdocumento": $scope.pqrData.User.documento
        }
      }).then(function (response) {
        $scope.listpqrds = response.data;
      })
    }


    $scope.obtener_gestion_riesgo = function () {
      $http({
        method: 'POST',
        url: "php/siau/pqr/Rpqr.php",
        data: {
          "function": "p_obtener_pqr_gestion_riesgo",
          "v_ptipodocumento": $scope.pqrData.User.selectedDocumento,
          "v_pdocumento": $scope.pqrData.User.documento
        }
      }).then(function (response) {
        $scope.listgestionriesgo = response.data;

      })
    }

    pqrHttp.p_obtener_pqr_tecno_altocosto().then(result => {
      $scope.motivosAltoCosto = result;
    })

    pqrHttp.p_obtener_pqr_patologia().then(result => {
      $scope.motivosPatologias = result;
    })

    $scope.disabledmotpatologia = false;
    $scope.changeAltoCosto = function (params) {
      console.log(params);
      if (params == '999') {
        $scope.pqrData.motivoPatologia = '16';
        $scope.disabledmotpatologia = true;
      } else {
        $scope.pqrData.motivoPatologia = '';
        $scope.disabledmotpatologia = false;
      }
    }

    $scope.Actualizar_Pqr_cargadas = function () {
      $http({
        method: 'POST',
        url: "php/siau/pqr/Rpqr.php",
        data: {
          "function": "Actualizar_Pqr_cargadas"
        }
      }).then(function ({data}) {
        console.log(data)
      })
    }


    /////////////// ACTUALIZAR SOPORTE CORRESPONDENCIA ///////////////

    $scope.actualizaSoporteCorresp = function (x) {
      swal({
        title: "Actualizar Soporte",
        html: `
           <div class="file-upload-wrapper file-field input-field" id="file-upload-wrapper"
           data-text="Seleccione un archivo" style="margin: 0;width: -webkit-fill-available;">
           <div class="right">
             <input type="file" id="file" name="file" onchange="funcSopCorresp()">
           </div>
           <div class="file-path-wrapper">
             <input class="file-path" type="text" name="archivo"
               style="border-radius: 0;height: 1rem;border-bottom: 0;" ng-model="fileInput">
           </div>
         </div>
           `,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        preConfirm: function () {
          return new Promise(function (resolve) {
            resolve(
              {
                file: document.querySelector('#file'),
                ruta: x.ruta
              }
            )
          })
        }
      }).then(function (result) {
        // console.log(result);
        $scope.loadFileCorresp(result);
      }).catch(swal.noop);
    }

    $scope.loadFileCorresp = function (x) {
      var ValidarExistente = false;

      $scope.inputFile = x.file;
      if (ValidarExistente != true) {
        if ($scope.inputFile.files.length != 0) { //Valida que exista el archivo
          if ($scope.inputFile.files[0].size > 0 && $scope.inputFile.files[0].size <= 10485760) { //Valida que el archivo no pese mas de 10 Megas
            if ($scope.inputFile.files[0].name.split('.')[1].toUpperCase() == 'PDF') {
              //         //Todo ok
              $scope.getBase64($scope.inputFile.files[0]).then(function (result) {
                $scope.B64 = result;
              });
              setTimeout(() => {
                $scope.actualizaRutaSoporteCorresp(x);
              }, 1000);
            } else {
              swal({
                title: "Mensaje",
                text: "¡Solo se permiten archivos PDF!",
                type: "warning",
              }).catch(swal.noop);
            }
          } else {
            swal({
              title: "Mensaje",
              text: "¡Tamaño del archivo excedido maximo 10 MG!",
              type: "warning",
            }).catch(swal.noop);
          }
        } else {
          swal({
            title: "Mensaje",
            text: "¡Debe ingresar un archivo!",
            type: "warning",
          }).catch(swal.noop);
        }
      }
    }

    $scope.actualizaRutaSoporteCorresp = function (x) {
      if ($scope.B64 != '') {
        swal({ title: 'Cargando...' });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'actualizarSoporteCorrep',
            B64: $scope.B64,
            ruta: x.ruta,
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            ngDialog.close();
            swal({
              title: "Mensaje",
              text: "Soporte actualizado",
              type: "success",
            }).catch(swal.noop);
          } else {
            swal({
              title: "Mensaje",
              text: data.Mensaje,
              type: "warning",
            }).catch(swal.noop);
          }
        });
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

  }])
  .directive("selectFilesPqr", function ($timeout) {
    return {
      require: "ngModel",
      link: function postLink($scope, elem, attrs, ngModel) {
        elem.on("change", function (e) {
          var files = elem[0].files;
          $scope.somefunctiont = function (files) {
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function () {
              $scope.fileBase64 = event.target.result; //Asigna el file al ng-model pqrFile
              $scope.fileBasExt = files[0].name.split('.').pop().toLowerCase();//Asigna la extension del pqrFile


            };
            reader.onerror = function (error) {
              console.log('Error: ', error);
            };
          }
          switch (attrs.id) {
            case 'gradfile':
              $scope.datagrad = '';
              if (files.length > 0) {
                if (files[0].name.split('.').pop().toLowerCase() in { 'png': 'png', 'jpg': 'jpg', 'pdf': 'pdf', 'doc': 'doc', 'docx': 'docx' }) {
                  if (files[0].size > 5242880) {//valida que el size del file sea <= 5 mb
                    $timeout(function () {
                      $scope.datagrad = 'El archivo excede el peso limite (5MB)';
                      $scope.requireGuiarad = true;
                    }, 100)
                  } else {
                    $scope.somefunctiont(files);
                    setTimeout(() => {
                      $scope.objectguia.gradfile = $scope.fileBase64;
                      $scope.objectguia.gradext = $scope.fileBasExt;
                    }, 100);
                    $timeout(function () {
                      $scope.datagrad = 'Dentro Del Peso Limite y Formato Validado';
                      $scope.requireGuiarad = false;
                    }, 100)
                  }
                } else {
                  $timeout(function () {
                    $scope.datagrad = 'Formato Invalido solo puedes adjuntar archivos con extensión, .png, .jpg, .jpeg, .doc(x) y .pdf';
                    $scope.requireGuiarad = true;
                  }, 100)
                }
              } else {
                $timeout(function () {
                  $scope.fileBase64 = null; $scope.fileBasExt = null; $scope.requireGuiarad = false;
                  $scope.objectguia.gradfile = null; $scope.objectguia.gradext = null;
                  $scope.datagrad = null;
                }, 100)
              }
              break;


          }
        })

      }
    }
  });

  function funcSopCorresp() {
    if (document.querySelector('#file').files.length != 0) {
      document.querySelector('#file-upload-wrapper').setAttribute("data-text", document.querySelector('#file').files[0].name);
    } else {
      document.querySelector('#file-upload-wrapper').setAttribute("data-text", 'Seleccione un archivo');
    }
  }