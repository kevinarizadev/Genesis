'use strict';

angular.module('GenesisApp')

  .controller('gestionautorizacionController', ['$scope', '$http', '$location', '$filter', 'ngDialog', '$timeout', 'pqrHttp', 'afiliacionHttp', '$sce', function ($scope, $http, $location, $filter, ngDialog, $timeout, pqrHttp, afiliacionHttp, $sce) {

    $(document).ready(function () {
      $('#modaldiagnostico').modal();
      $("#modalips").modal();
      $("#modalproducto").modal();
      $('#modaldetalle').modal();
      $('#modaltutelas').modal();
      $('#modalsiniestro').modal();
      $('#modalnovedades').modal();
      $("#modalservicio").modal();
      $("#modalespecialidad").modal();
      $("#modaldocumentos").modal();
      $("#modalcontrol").modal();
      $("#modaltraxanular").modal();
      $("#modalcantprod").modal();
      $("#modalevantarctrlfrecuencia").modal();
      $("#modalcupsvsdx").modal();
      $("#modalautsoportes").modal();
      $("#modalautoafiliado").modal();

    });

    //variables de control

    $scope.tabI = true;
    $scope.tabII = false;
    $scope.tabIII = false;
    $scope.tabIV = false;
    $scope.activeI = 'active final white-text';
    $scope.activeII = 'none';
    $scope.activeIII = 'none';
    $scope.activeIV = 'none';
    $scope.activeIcolor = 'foot4';
    $scope.activeIIcolor = '';
    $scope.activeIIIcolor = '';
    $scope.activeIVcolor = '';
    $scope.nametab = 'Autorización';

    // variables TAB I
    //secciones de ng hide
    $scope.inactiveseccion1tab1 = false;
    $scope.inactiveseccion2tab1 = true;
    $scope.inactiveseccion4tab4 = false;
    $scope.activetipotabI = true;
    $scope.activetipotabIV = true;
    $scope.productosagregadostabI = [];
    $scope.productosagregadostabIV = [];
    $scope.nofindproductstabI = false;
    $scope.nofindproductstabIV = false;
    $scope.inactimiprestab1 = true;
    $scope.inactimiprestab4 = true;
    $scope.inactivetagmipres = true;
    $scope.inactivetagctc = true;
    $scope.inactivetagtutela = true;
    $scope.inactivetagsiniestro = true;
    $scope.nameservicio = 'de orden'
    $scope.inactivebarrapro = true;



    // wizard

    $scope.invsolicitudtabI = true;
    $scope.invproductotabI = true;
    $scope.invfinalizartabI = true;
    $scope.invfinalizartabIV = true;
    $scope.solicitud = {
      aut_doc: 'AS',
      tipodocumento: '',
      documento: '',
      diagnom1: '',
      diagnom2: '',
      diagcod1: '',
      diagcod2: '',
      ipsasignada: '',
      ipscodasignada: '',
      contrato: '',
      ubicacioncontrato: '',
      documentocontrato: '',
      servicio: '',
      codservicio: '',
      fechasolicitud: '',
      fechasolicitudparseada: '',
      origen: '',
      tiposervicio: '',
      ubicacionpaciente: '',
      ipssolicita: '',
      ipscodsolicita: '',
      nombremedico: '',
      especialidadmedico: '',
      codespecialidad: '',
      observacion: '',
      nopos: false,
      valornopos: '',
      valortipo: '',
      mipres: false,
      valormipres: '',
      ctc: false,
      valorctc: '',
      tutela: false,
      valortutela: '',
      fecha_acta: '',
      anticipo: false,
      valoranticipo: '',
      siniestro: false,
      valorsiniestro: '',
      altocosto: '',
      prioridad: false,
      valorprioridad: '',
      control: false,
      anopass: '',
      mespess: '',
      file: null,
      namefile: null,
      ext: null,
      aut: false,
      codaut: null,
      ubiaut: null,
      hostname: null,
      ip: null,
      ftp: null
    }

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
    $scope.solicitudpro = {
      numero: 0,
      tipodocumento: '',
      documento: '',
      diagnom1: '',
      diagnom2: '',
      diagcod1: '',
      diagcod2: '',
      ipssolicitante: '',
      ipsasignada: '',
      ipscodsolicitante: '',
      ipscodasignada: '',
      servicio: '',
      codservicio: '',
      fecsolicitud: '',
      fecsolicitudparseada: '',
      fecprogramacion: '',
      fecprogramacionparseada: '',
      justificacion: '',
      observacion: '',
      email: '',
      celular: '',
      direccion: '',
      contrato: '',
      contratoDocumento: '',
      contratoUbicacion: '',
      ubicacion: '',
      file: null,
      ext: null,
      namefile: null,
      accion: 'I',
      origen: 'I',
      ftp: null
    }


    $scope.autedit = {
      aut_doc: 'AS',
      tipodocumento: '',
      documento: '',
      diagnom1: '',
      diagnom2: '',
      diagcod1: '',
      diagcod2: '',
      ipsasignada: '',
      ipscodasignada: '',
      contrato: '',
      ubicacioncontrato: '',
      documentocontrato: '',
      servicio: '',
      codservicio: '',
      fechasolicitud: '',
      fechasolicitudparseada: '',
      origen: '',
      tiposervicio: '',
      ubicacionpaciente: '',
      ipssolicita: '',
      ipscodsolicita: '',
      nombremedico: '',
      especialidadmedico: '',
      codespecialidad: '',
      observacion: '',
      nopos: false,
      valornopos: '',
      valortipo: '',
      mipres: false,
      valormipres: '',
      ctc: false,
      valorctc: '',
      tutela: false,
      valortutela: '',
      fecha_acta: '',
      anticipo: false,
      valoranticipo: '',
      siniestro: false,
      valorsiniestro: '',
      altocosto: '',
      prioridad: false,
      valorprioridad: '',
      control: false,
      anopass: '',
      mespess: '',
      file: null,
      namefile: null,
      ext: null,
      aut: false,
      codaut: null,
      ubiaut: null,
      cod_adjunto: null,
      hostname: null,
      ip: null,
      ftp: null
    }
    $scope.novedades = null;
    $scope.datosAfiModalNov = null;
    $scope.tutelaParam = null;
    $scope.siniestroParam = null;
    $scope.maxDate = null;
    $scope.documentosAfiliado = null;
    $scope.v_encabezado = null;
    $scope.fechactual = null;

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



    $scope.mesesanno = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    $scope.entregas = [{
      num: 1
    }, {
      num: 2
    }, {
      num: 3
    }, {
      num: 4
    }, {
      num: 5
    }, {
      num: 6
    }, {
      num: 7
    }, { 
      num: 8
    }]


    $scope.listObservacionesAdmin = [{ 'Codigo': 1, 'Nombre': 'AUTORIZADO BAJO COTIZACION' }, { 'Codigo': 2, 'Nombre': 'INCLUYE MATERIALES MAS INSUMOS' },
    { 'Codigo': 3, 'Nombre': 'INCLUYE DERECHO DE SALA MAS INSUMOS' }, { 'Codigo': 4, 'Nombre': 'SE AUTORIZA PLAN REMEO FEBRERO 2020' }
    ];


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
    // funciones de control
    $scope.hidecontrol = false;
    $scope.init = function () {
      $scope.tabI = true;
      $scope.tabII = false;
      $scope.tabIII = false;
      $scope.tabIV = false;
      $scope.activeI = 'active final';
      $scope.activeII = 'none';
      $scope.activeIII = 'none';
      $scope.activeIV = 'none';
      $scope.activeIcolor = '';
      $scope.activeIIcolor = '';
      $scope.activeIIIcolor = '';
      $scope.activeIVcolor = '';
      let rol = sessionStorage.getItem('rolcod');
      if (rol == '17' || rol == '18' || rol == '23' || rol == '57' || rol == '56' || rol == '87' || rol == '0') {
        $scope.hidecontrol = false;
      } else {
        $scope.hidecontrol = true;
      }

    }

    $scope.setTab = function (opcion) {

      $scope.init();

      switch (opcion) {
        case 1:
          $scope.tabI = true;
          $scope.tabII = false;
          $scope.tabIII = false;
          $scope.tabIV = false;
          $scope.activeI = 'active final white-text';
          $scope.activeII = 'none';
          $scope.activeIII = 'none';
          $scope.activeIV = 'none';
          $scope.activeIcolor = 'foot4';
          $scope.nametab = 'Autorización';
          $scope.tipoaut = '1';
          break;
        case 2:
          $scope.tabI = false;
          $scope.tabII = true;
          $scope.tabIII = false;
          $scope.tabIV = false;
          $scope.activeI = 'none';
          $scope.activeII = 'active final white-text';
          $scope.activeIII = 'none';
          $scope.activeIV = 'none';
          $scope.activeIIcolor = 'foot4';
          $scope.nametab = 'Autorización Programada';
          $scope.titletabII = 'Solicitud';
          $scope.tipoaut = '2';
          break;
        case 3:
          $scope.tabI = false;
          $scope.tabII = false;
          $scope.tabIII = true;
          $scope.tabIV = false;
          $scope.activeI = 'none';
          $scope.activeII = 'none';
          $scope.activeIII = 'active final white-text';
          $scope.activeIV = 'none';
          $scope.activeIIIcolor = 'foot4';
          $scope.nametab = 'Productos';
          break;
        case 4:
          $scope.tabI = false;
          $scope.tabII = false;
          $scope.tabIII = false;
          $scope.tabIV = true;
          $scope.activeI = 'none';
          $scope.activeII = 'none';
          $scope.activeIII = 'none';
          $scope.activeIVcolor = 'foot4';
          $scope.activeIV = 'active final white-text';
          $scope.nametab = 'Consulta de Autorización';
          $scope.tipoaut = '4';
          break;
        default:
      }
    }
    $scope.setTab(1);

    $scope.ip = null;

    $http({
      method: 'GET',
      url: "//api.ipify.org?format=json"
    }).then(function (response) {
      $scope.ip = response.data.ip;
    })

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

    $scope.calcularEdad = function (date, tipo) {
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

        if (tipo == 1) {
          if (edad > 0) {
            $scope.cantidadanosaut = 'años'
            if (edad == 1) {
              $scope.cantidadanosaut = 'años'
            }

            $scope.edadaut = edad;

          } else {

            if (meses > 0) {

              $scope.cantidadanosaut = 'meses'

              if (meses == 1) {

                $scope.cantidadanosaut = 'mes'

              }

              $scope.edadaut = meses;

            } else {

              if (dias > 0) {

                $scope.cantidadanosaut = 'dias'

                if (dias == 1) {

                  $scope.cantidadanosaut = 'dia'

                }

                $scope.edadaut = dias;

              }

            }

          }

        } else if (tipo == 3) {

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

        } else {

          if (edad > 0) {

            $scope.cantidadanosautpro = 'años'

            if (edad == 1) {

              $scope.cantidadanosautpro = 'años'

            }

            $scope.edadautpro = edad;

          } else {

            if (meses > 0) {

              $scope.cantidadanosautpro = 'meses'

              if (meses == 1) {

                $scope.cantidadanosautpro = 'mes'

              }

              $scope.edadautpro = meses;

            } else {

              if (dias > 0) {

                $scope.cantidadanosautpro = 'dias'

                if (dias == 1) {

                  $scope.cantidadanosautpro = 'dia'

                }

                $scope.edadautpro = dias;

              }

            }

          }

        }



      }

    }

    $scope.buscarAfiliado = function (tipo, tipodocumento, documento) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtenerafiliados', tipodocumento: tipodocumento, documento: documento }
      }).then(function (response) {
        if (response.data.CODIGO != "0") {

          if (tipo == '1') {
            $http({
              method: 'POST',
              url: "php/genesis/inicio.php",
              data: { function: 'actualizable', tipo: tipodocumento, documento: documento }
            }).then(function (response) {
              $scope.respues_actualizar = response.data.mensaje;

              console.log($scope.respues_actualizar)
              if ($scope.respues_actualizar == "S") {
                sessionStorage.setItem("tipo", tipodocumento);
                sessionStorage.setItem("doc", documento);
                ngDialog.open({
                  template: 'views/afiliados/modal/modaldatoscontacto.html',
                  className: 'ngdialog-theme-plain',
                  controller: 'modaldatoscontactoController',
                  scope: $scope,
                  closeByEscape: false,
                  closeByDocument: false
                });

              } else {

              }

            });
            $scope.infoafiliadoaut = [];

            $scope.infoafiliadoaut = response.data;



            if ($scope.infoafiliadoaut.EMPLEADOR) {

              $scope.infoafiliadoaut.EMPLEADOR = JSON.parse($scope.infoafiliadoaut.EMPLEADOR);

            }

            // if ($scope.infoafiliadoaut.Estado != 'ACTIVO') {

            //   $scope.informacionmodal = 'Afiliado no se encuentra activo en base de datos';

            //   $scope.inactiveseccion1tab1 = false;

            //   $scope.inactiveseccion2tab1 = true;

            //   swal('Importante', 'Afiliado no se encuentra activo en la base de datos.', 'info');

            // } else {

            $scope.afirownumI = 1;

            if ($scope.infoafiliadoaut.SINIESTRO == 'true') {

              $scope.afirownumI = $scope.afirownumI + 1;

            }

            if ($scope.infoafiliadoaut.TUTELA == 'true') {

              $scope.afirownumI = $scope.afirownumI + 1;

            }

            if ($scope.infoafiliadoaut.PORTABILIDAD == 'S') {

              $scope.afirownumI = $scope.afirownumI + 1;

            }


            if ($scope.infoafiliadoaut.ERROR_50 == 'true') {

              $scope.afirownumI = $scope.afirownumI + 1;

            }

            if ($scope.infoafiliadoaut.AFIC_T045 == 'S') {

              $scope.afirownumI = $scope.afirownumI + 1;

            }


            // if ($scope.infoafiliadoaut.PORTABILIDAD == 'S') {

            //   $scope.afirownumI = $scope.afirownumI + 1;

            // }

            $scope.calcularEdad($scope.infoafiliadoaut.FechaNacimiento, tipo);

            $scope.sexoafitabI = $scope.infoafiliadoaut.SexoCodigo;

            $scope.edadafitabI = $scope.infoafiliadoaut.EdadDias;

            $scope.regimenafitabI = $scope.infoafiliadoaut.CodigoRegimen;

            $scope.inactiveseccion1tab1 = true;

            $scope.inactiveseccion2tab1 = false;

            $scope.productosagregadostabI = [];

            $scope.datosAfiModalNov = $scope.infoafiliadoaut;



            // }            

          } else if (tipo == '3') {

            $scope.infoafiliadoautedit = null;

            $scope.infoafiliadoautedit = response.data;

            if ($scope.infoafiliadoautedit.Estado != 'ACTIVO') {

              $scope.informacionmodaledit = 'Afiliado no se encuentra activo en base de datos';

              swal('Importante', 'Afiliado no se encuentra activo en la base de datos.', 'info');

            }

            //else {

            // $scope.afirownumIV = 1;

            // if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {

            //   $scope.afirownumIV = $scope.afirownumIV + 1;

            // }

            // if ($scope.infoafiliadoautedit.TUTELA == 'true') {

            //   $scope.afirownumIV = $scope.afirownumIV + 1;

            // }

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

            // $scope.productosagregadostabIV = [];

            //}

          } else {

            $scope.infoafiliadoautpro = [];

            $scope.infoafiliadoautpro = response.data;

            if ($scope.infoafiliadoautpro.Estado != 'ACTIVO') {

              $scope.informacionmodal = 'Afiliado no se encuentra activo en base de datos';

              $scope.inactiveseccion1tab2 = false;

              $scope.inactiveseccion2tab2 = true;

              swal('Importante', 'Afiliado no se encuentra activo en la base de datos.', 'info');

            } else {

              // $scope.afirownumII = 1;

              // if ($scope.infoafiliadoautpro.SINIESTRO == 'true') {

              //   $scope.afirownumII = $scope.afirownumII + 1;

              // }

              // if ($scope.infoafiliadoautpro.TUTELA == 'true') {

              //   $scope.afirownumII = $scope.afirownumII + 1;

              // }



              $scope.afirownumII = 1;

              if ($scope.infoafiliadoautpro.SINIESTRO == 'true') {

                $scope.afirownumII = $scope.afirownumII + 1;

              }

              if ($scope.infoafiliadoautpro.TUTELA == 'true') {

                $scope.afirownumII = $scope.afirownumII + 1;

              }

              if ($scope.infoafiliadoautpro.PORTABILIDAD == 'S') {

                $scope.afirownumII = $scope.afirownumII + 1;

              }
              if ($scope.infoafiliadoautpro.ERROR_50 == 'true') {

                $scope.afirownumII = $scope.afirownumII + 1;

              }


              if ($scope.infoafiliadoautpro.AFIC_T045 == 'S') {

                $scope.afirownumII = $scope.afirownumII + 1;

              }


              $scope.calcularEdad($scope.infoafiliadoautpro.FechaNacimiento, tipo);

              $scope.sexoafitabII = $scope.infoafiliadoautpro.SexoCodigo;

              $scope.edadafitabII = $scope.infoafiliadoautpro.EdadDias;

              $scope.regimenafitabII = $scope.infoafiliadoautpro.CodigoRegimen;

              $scope.solicitudpro.email = $scope.infoafiliadoautpro.email;

              $scope.solicitudpro.celular = $scope.infoafiliadoautpro.Celular1;

              $scope.datosAfiModalNov = $scope.infoafiliadoautpro;

              $scope.inactiveseccion1tab2 = true;

              $scope.inactiveseccion2tab2 = false;

              $scope.productosagregadostabII = [];

            }

          }

          if (response.data.VALIDA_DOC) {
            swal('Importante', response.data.VALIDA_DOC, 'info');
          }

        } else {

          swal('Importante', response.data.NOMBRE, 'info')

        }

      });

    }




    $scope.tempsolicitudesaa = null;
    if (localStorage.getItem('solicitud_solicitud')) {
      const { TIPO_DOC, DOCUMENTO, NUMERO } = JSON.parse(localStorage.getItem('solicitud_solicitud'))

      $scope.solicitudesaa = {
        "tipodocumento": TIPO_DOC,
        "documento": DOCUMENTO,
        "numero_solicitud": NUMERO,
        "fec_ini": "",
        "fec_fin": "",
      }
      if (TIPO_DOC && DOCUMENTO && NUMERO) {
        $http({
          method: 'POST',
          url: "php/autorizaciones/afiliado/solicitud_autorizacion.php",
          data: { function: 'p_obtener_solicitud_esaa', data: JSON.stringify($scope.solicitudesaa) }
        }).then(function (response) {
          $scope.tempsolicitudesaa = response.data;
          $scope.adjuntotabI = response.data[0].ADJUNTO;
          $scope.ftptabI = response.data[0].FTP;
          $scope.solicitud.numero_solicitud = response.data[0].NUMERO;
          $scope.solicitud.tipodocumento = TIPO_DOC;
          $scope.solicitud.documento = DOCUMENTO;
          console.log($scope.solicitud.tipodocumento);
          console.log($scope.solicitud.documento);
          $scope.buscarAfiliado('1', $scope.solicitud.tipodocumento, $scope.solicitud.documento);

        })
      }

    }



    $scope.valservicio = false;
    $scope.valespecialidad = false;
    $scope.openmodals = function (tipo, opcion) {
      $scope.buscard1 = "";
      $scope.buscard2 = "";
      $scope.buscarpro = "";
      $scope.tipoaut = opcion;
      switch (tipo) {
        case 'diagnostico':

          $scope.inactivebarradiag = true;

          $("#modaldiagnostico").modal("open");
          setTimeout(() => {
            $('#modaldiagnostico #diaginput').focus();
          }, 100);
          break;

        case 'ips':

          $scope.inactivebarraips = true;

          $("#modalips").modal("open");
          setTimeout(() => {
            $('#modalips #ipsinput').focus();
          }, 100);

          break;

        case 'producto':
          $scope.listProductos = [];
          $scope.inactivebarrapro = true;
          if ($scope.tipoaut == '1') {
            var regimen = $scope.regimenafitabI;
            var contrato = $scope.solicitud.contrato;
            var servicio = $scope.solicitud.codservicio
            var tipo = 'N';
            var ubicacion = $scope.solicitud.ubicacionpaciente;
            var sexo = $scope.sexoafitabI;
            var edad = $scope.edadafitabI;
          } else if ($scope.tipoaut == '2') {
            var regimen = $scope.regimenafitabII;
            var contrato = $scope.solicitudpro.contrato;
            var servicio = $scope.solicitudpro.codservicio;
            var tipo = 'S';
            var ubicacion = 'H';
            var sexo = $scope.sexoafitabII;
            var edad = $scope.edadafitabII;
          } else {
            var regimen = $scope.regimenafitabIV;
            var contrato = $scope.autedit.contrato;
            var servicio = $scope.autedit.codservicio;
            var tipo = 'N';
            var ubicacion = $scope.autedit.ubicacionpaciente;
            var sexo = $scope.sexoafitabIV;
            var edad = $scope.edadafitabIV;
          }



          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: { function: 'listaProducto', regimen: regimen, contrato: contrato, clasificacion: servicio, tipo: tipo, edad: edad, sexo: sexo }
          }).then(function (response) {
            if (response.data["0"].CODIGO == '-1') {
              $scope.inactivebarrapro = true;
            } else if (response.data["0"].CODIGO == '0') {
              $scope.inactivebarrapro = true;
            } else {
              $scope.listProductos = response.data;
              $scope.inactivebarrapro = false;
            }
          })
          $("#modalproducto").modal("open");
          setTimeout(() => {
            $('#modalproducto #proinput').focus();
          }, 100);
          break;
        case 'modalservicio':
          $scope.bservicio = '';
          if ($scope.tipoaut == '1') {
            if ($scope.solicitud.ipscodasignada) {
              $scope.valservicio = false;
            } else {
              $scope.valservicio = true;
            }
          }
          if ($scope.tipoaut == '2') {
            if ($scope.solicitudpro.ipscodasignada) {
              $scope.valservicio = false;
            } else {
              $scope.valservicio = true;
            }
          }
          if (($scope.tipoaut == '4')) {
            if ($scope.autedit.ipscodasignada) {
              $scope.valservicio = false;
            } else {
              $scope.valservicio = true;
            }
          }
          if ($scope.valservicio == true) {
            swal('Importante', 'La Ips Asignada no puede estar vacia!', 'info');
          } else {
            if (($scope.tipoaut == '2' && $scope.solicitudpro.contrato == '')) {
              swal('Importante', 'El contrato no puede estar vacio!', 'info');
            } else {
              $("#modalservicio").modal("open");
              setTimeout(() => {
                $('#modalservicio #servinput').focus();
              }, 100);
            }


          }

          break;
        case 'modalespecialidad':
          $scope.bespecialidad = '';
          if ($scope.tipoaut == '1') {
            if ($scope.solicitud.ipscodsolicita) {
              $scope.valespecialidad = false;
            } else {
              $scope.valespecialidad = true;
            }
          }
          if ($scope.tipoaut == '2') {
            if ($scope.solicitudpro.ipscodsolicita) {
              $scope.valespecialidad = false;
            } else {
              $scope.valespecialidad = true;
            }
          }
          if (($scope.tipoaut == '4')) {
            if ($scope.autedit.ipscodsolicita) {
              $scope.valespecialidad = false;
            } else {
              $scope.valespecialidad = true;
            }
          }
          if ($scope.valespecialidad == true) {
            swal('Importante', 'La Ips Solicitante no puede estar vacia!', 'info');
          } else {
            $("#modalespecialidad").modal("open");
            setTimeout(() => {
              $('#modalespecialidad #especialidadinput').focus();
            }, 100);
          }
          break;

        case 'edit':
          $scope.check_option_3 = false;
          $scope.buscarAfiliado('3', opcion.TIPO_DOC, opcion.DOCUMENTO);
          $scope.consultarAutorizacion(opcion.NUMERO, opcion.UBICACION, 'E');
          $scope.regimentabIV = opcion.COD_REGIMEN;
          $scope.contratotabIV = opcion.CONTRATO;
          $scope.ubicaciontabIV = opcion.UBI_PACIENTE;
          $scope.serviciotabIV = opcion.CLASIFICACION;
          $scope.inactivebarraproedit = true;
          setTimeout(() => {
            $scope.verAutorizacionesEdit = true;
            $scope.verAutorizaciones = true;
            $scope.inactiveseccion4tab4 = true;
            $scope.invfinalizartabIV = true;
            $scope.verPrintIV = false;
          }, 100);
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
        case 'control':
          setTimeout(() => {
            $scope.tempfecha.anno = '0';
            $scope.tempfecha.mes = '0';
          }, 100);
          if ($scope.tipoaut == '1') {
            $scope.solicitud.anopass = "";
            $scope.solicitud.mespess = "";

            if ($scope.solicitud.control == true) {
              $("#modalcontrol").modal("open");
            } else {
              $scope.solicitud.control = false;
            }
          }

          if ($scope.tipoaut == '4') {
            $scope.autedit.mespess = "";
            $scope.autedit.anopass = "";
            if ($scope.autedit.control == true) {
              $("#modalcontrol").modal("open");
            } else {
              setTimeout(() => {
                $scope.autedit.control = false;
              }, 100);
            }
          }
          $http({
            method: 'POST',
            url: "php/financiera/pagosips.php",
            data: { function: "obteneranno" }
          }).then(function (response) {
            $scope.anos = response.data;

          })
          $http({
            method: 'GET',
            url: "json/meses.json"
          }).then(function (response) {
            $scope.dias = response.data;
          })


          break

        case 'modalcantprod':
          $("#modalcantprod").modal("open");
          break;
        case 'anular':
          $("#modaltraxanular").modal("open");
          break;
        case 'modalevantarctrlfrecuencia':
          $scope.levantarop = opcion;
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: { function: 'p_lista_motivosfrecuencia' }
          }).then(function (response) {
            $scope.listMotivosfrecuencia = response.data;
          })
          $("#modalevantarctrlfrecuencia").modal("open");
          break;
        case 'modalcupsvsdx':
          $("#modalcupsvsdx").modal("open");
          break;

        case 'autsoporte':
          $scope.autsoporte.pdf = null;
          $("#modalautsoportes").modal("open");
          break;
        case 'modalautoafiliado':
          $("#modalautoafiliado").modal("open");
          break;


        default:
      }
    }

    $scope.tempcups = '';
    $scope.showDx = function (vcups, source) {
      if (vcups != undefined) {
        $scope.tempcups = vcups;
      }
      $http({
        method: 'GET',
        url: "json/letra_aut.json"
      }).then(function (response) {
        $scope.listMotivos = response.data;
        $scope.array = {};
        for (var i = 0; i < $scope.listMotivos.length; i++) {
          var key = $scope.listMotivos[i].Codigo;
          var val = $scope.listMotivos[i].Nombre;
          $scope.array[key] = val;
        }
        swal({
          title: 'Seleccionar Letra para filtar DX',
          input: 'select',
          inputOptions: $scope.array,
          inputPlaceholder: 'Seleccionar',
          showCancelButton: true,
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value !== '') {
                resolve();
              } else {
                reject('Debes Selecionar una Subcategoria');
              }
            });
          }
        }).then(function (result) {
          console.log(result);

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
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: { function: 'p_mostrar_cups_vs_dx', cups: $scope.tempcups.split('-')[0], letra: result }
          }).then(function (response) {
            console.log(response.data);
            swal.close();
            $scope.listCupsvsDx = response.data;
            if (response.data.length > 0) {
              if (source == 'tabla') {
                $scope.openmodals("modalcupsvsdx");
              }

            } else {
              swal('Importante', 'No se encontraron DX!', 'info');
              // $scope.closemodals("modalcupsvsdx");
            }

          })
        });
      })

    }
    $scope.accionTabIV = function (aut) {
      // case 'edit':
      $scope.tipoaut = '4';
      $scope.check_option_3 = false;
      $scope.autedit.autsoporte = false;
      $scope.buscarAfiliado('3', aut.TIPO_DOC, aut.DOCUMENTO);
      $scope.consultarAutorizacion(aut.NUMERO, aut.UBICACION, 'E');
      $scope.regimentabIV = aut.COD_REGIMEN;
      $scope.contratotabIV = aut.CONTRATO;
      $scope.ubicaciontabIV = aut.UBI_PACIENTE;
      $scope.serviciotabIV = aut.CLASIFICACION;
      $scope.inactivebarraproedit = true;
      setTimeout(() => {
        $scope.verAutorizacionesEdit = true;
        $scope.verAutorizaciones = true;
        $scope.inactiveseccion4tab4 = true;
        $scope.invfinalizartabIV = true;
        $scope.verPrintIV = false;
      }, 100);
      // break;
    }

    $scope.closemodals = function (tipo) {
      switch (tipo) {
        case 'diagnostico':
          $("#modaldiagnostico").modal("close");
          break;
        case 'ips':
          $("#modalips").modal("close");
          break;
        case 'producto':
          $("#modalproducto").modal("close");
          break;
        case 'modalservicio':
          $("#modalservicio").modal("close");
          break;
        case 'modalespecialidad':
          $("#modalespecialidad").modal("close");
          break;
        case 'modaldocumentos':
          $("#modaldocumentos").modal("close");
          break;
        case 'modalcontrol':
          if ($scope.tipoaut == '1') {
            if ($scope.solicitud.anopass == '' && $scope.solicitud.mespess == '') {
              $scope.solicitud.control = false;
            }
          }

          if ($scope.tipoaut == '4') {
            if ($scope.autedit.anopass == '' && $scope.autedit.mespess == '') {
              $scope.autedit.control = false;
            }
          }

          $("#modalcontrol").modal("close");
          break;
        case 'tutelas':
          if ($scope.solicitud.tutela == true) {
            if ($scope.solicitud.valortutela == '') {
              $scope.solicitud.tutela = false;
            }
          }
          $("#modaltutelas").modal("close");
          break;
        case 'siniestro':
          if ($scope.solicitud.siniestro == true) {
            if ($scope.solicitud.valorsiniestro == '') {
              $scope.solicitud.siniestro = false;
            }
          }
          if ($scope.autedit.siniestro == true) {
            if ($scope.autedit.valorsiniestro == '') {
              $scope.autedit.siniestro = false;
            }
          }

          if ($scope.autedit.siniestro == true) {
            if ($scope.autedit.valorsiniestro == '') {
              $scope.autedit.siniestro = false;
            }
          }
          $("#modalsiniestro").modal("close");
          break;
        case 'modaldetalle':
          $("#modaldetalle").modal("close");
          break;
        case 'modalnovedades':
          $("#modalnovedades").modal("close");
          break;
        case 'limpiartabIV':
          $scope.viewdataAut = true;
          $scope.viewdataAutprog = true;
          $scope.switchtable = false;
          $scope.check_option_2 = false;
          $scope.check_option = false;
          $scope.nameaut = 'Ordinarias';
          $scope.listarAutorizaciones = [];
          $scope.listarAutorizacionesprog = [];
          $scope.numautprocesada = null;
          $scope.numautprocesadaIV = null;
          $scope.ubicacionPrint = null;
          break;
        case 'modaltraxanular':
          if ($scope.tipoaut == '1') {
            if ($scope.solicitud.codaut == null) {
              $scope.solicitud.codaut = null;
              $scope.solicitud.aut = false;
            }
          }
          if ($scope.tipoaut == '4') {
            if ($scope.autedit.codaut == null) {
              $scope.autedit.codaut = null;
              $scope.autedit.aut = false;
            }
          }
          $("#modaltraxanular").modal("close");
          break;

        case 'modalcantprod':
          $("#modalcantprod").modal("close");
          break;
        case 'modalevantarctrlfrecuencia':
          $scope.motivo = '';
          $scope.justificacion = '';
          $("#modalevantarctrlfrecuencia").modal("close");
          break;
        case 'modalcupsvsdx':
          $("#modalcupsvsdx").modal("close");
          break;
        case 'modalautsoportes':

          $("#modalautsoportes").modal("close");
          break;
        case 'modalautoafiliado':
          $("#modalautoafiliado").modal("close");
          break;
        default:
      }
    }

    $scope.buscard1 = null;
    $scope.buscarDiagnostico = function (diag) {
      if ($scope.tipoaut == '1') {
        var sexo = $scope.sexoafitabI;
        var edad = $scope.edadafitabI;
      } else if ($scope.tipoaut == '2') {
        var sexo = $scope.sexoafitabII;
        var edad = $scope.edadafitabII;
      }

      if (($scope.tipoaut == '4')) {
        var sexo = $scope.sexoafitabIV;
        var edad = $scope.edadafitabIV;
      }
      if (diag == "" || diag == undefined) {
        swal('Importante', 'El campo  de texto no puede estar vacio!', 'info');
      } else {
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: {
            function: 'obtenerDiagnostico', codigo: diag,
            sexo: sexo,
            edad: edad
          }

        }).then(function (response) {
          $scope.listDiagnosticos = [];
          if (response.data["0"].Codigo == '-1') {
            swal('Importante', response.data["0"].Nombre, 'info');
            $scope.inactivebarradiag = true;
          } else if (response.data["0"].Codigo == '0') {
            swal('Importante', 'Diasnostico no encontrado ó favor especificar mas la busqueda del diagnostico', 'info');
            $scope.inactivebarradiag = true;
          } else {
            $scope.listDiagnosticos = response.data;
            $scope.inactivebarradiag = false;
          }
        })

      }


    }

    $scope.capita = null;
    $scope.buscarnovedades = function () {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: {
          function: 'obtener_novedades', documento: $scope.datosAfiModalNov.Documento,
          tipodocumento: $scope.datosAfiModalNov.TipoDocumento
        }
      }).then(function (response) {
        $scope.novedades = response.data;
      })
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: {
          function: 'obtener_capita', documento: $scope.datosAfiModalNov.Documento,
          tipodocumento: $scope.datosAfiModalNov.TipoDocumento
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
          function: 'obtener_soportes', documento: $scope.datosAfiModalNov.Documento,
          tipodocumento: $scope.datosAfiModalNov.TipoDocumento
        }
      }).then(function (response) {
        $scope.documentosAfiliado = response.data;
      })

    }

    $scope.autsoporte = {
      pdf: ""
    }
    $scope.trustSrc = function (src) {
      return $sce.trustAsResourceUrl(src);
    }


    $scope.viewDocument2 = function (ruta, ftp, aut) {
      $scope.afiliadoautsoportes.Numero = aut.numero;
      $scope.afiliadoautsoportes.Ubicacion = aut.ubicacion;
      if (ftp == 1 && ruta) {
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: { function: 'descargaAdjunto', ruta: ruta }
        }).then(function (response) {
          $scope.autsoporte.pdf = "temp/" + response.data;
        });
      } else {
        $scope.autsoporte.pdf = '';
      }
      if (ftp == '3' && ruta) {
        $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: { function: 'descargaAdjunto', ruta: ruta }
        }).then(function (response) {
          console.log(response.data);
          $scope.autsoporte.pdf = "temp/" + response.data;
        });
      } else {
        $scope.autsoporte.pdf = '';
      }
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
    $scope.dx = null;
    $scope.dxboolean = false;
    $scope.seleccionardiagnostico = function (data, tipo) {
      $scope.dxboolean = false;
      var text = "";
      var x = $scope.getdx(data).then((response) => {
        console.log(response);
        $scope.dx = response
        if ($scope.dx.Codigo == '1') {
          swal({
            title: 'Confirmar',
            text: $scope.dx.Nombre,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            console.log(result);
            selectdx(data);
          })
        } else {
          selectdx(data);
        }
    
  
      })

      function selectdx(params) {
        
        if ($scope.tipoaut == '1') {
          if (tipo == 'P') {
            $scope.solicitud.diagnom1 = params.Nombre;
            $scope.solicitud.diagcod1 = params.Codigo;
            text = 'Principal';
          } else {
            $scope.solicitud.diagnom2 = params.Nombre;
            $scope.solicitud.diagcod2 = params.Codigo;
            text = 'Secundario';
            $("#modaldiagnostico").modal("close");
          }


        } else if ($scope.tipoaut == '2') {

          if (tipo == 'P') {
            $scope.solicitudpro.diagnom1 = params.Nombre;
            $scope.solicitudpro.diagcod1 = params.Codigo;
            text = 'Principal';
          } else {
            $scope.solicitudpro.diagnom2 = params.Nombre;
            $scope.solicitudpro.diagcod2 = params.Codigo;
            text = 'Secundario';
            $("#modaldiagnostico").modal("close");

          }

        }

        if ($scope.tipoaut == '4') {
          if (tipo == 'P') {
            $scope.autedit.diagnom1 = params.Nombre;
            $scope.autedit.diagcod1 = params.Codigo;
            text = 'Principal';
          } else {
            $scope.autedit.diagnom2 = params.Nombre;
            $scope.autedit.diagcod2 = params.Codigo;
            text = 'Secundario';
            $("#modaldiagnostico").modal("close");
          }
        }      
        $scope.$apply();    
        swal({ title: "Completado", text: "Diagnostico " + text + " Registrado", showConfirmButton: false, type: "success", timer: 800 });
 
      }

    }

    $scope.buscarIps = function (ips) {

      if (ips != "" || ips != undefined) {
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: { function: 'obtenerNombreIps', ips: ips }
        }).then(function (response) {
          if (response.data["0"].Codigo == '0') {
            swal('Importante', 'IPS no encontrada', 'info');
            $scope.inactivebarraips = true;
          } else {
            $scope.listIps = response.data;
            $scope.inactivebarraips = false;
          }
        })
      } else {
        swal('Importante', 'El campo  de texto no puede estar vacio!', 'info');
      }

    }

    $scope.seleccionarips = function (data, tipo) {
      var text = '';
      if ($scope.tipoaut == '1') {
        if (tipo == 'S') {
          $scope.solicitud.ipssolicita = data.Nombre;
          $scope.solicitud.ipscodsolicita = data.Codigo;
          text = 'Ips Solicitante.';
          $scope.buscarEspecialidades(data.Codigo);
          swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        } else {
          $scope.solicitud.ipsasignada = data.Nombre;
          $scope.solicitud.ipscodasignada = data.Codigo;
          $scope.solicitud.ipsasignadadireccion = data.Codigo_Dir;
          text = 'Ips Asignada.';
          swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
          $scope.cargarContratoTabI($scope.solicitud.ipscodasignada, $scope.regimenafitabI, 'tab1');//faltan parametros
        }
      }

      if ($scope.tipoaut == '2') {
        if (tipo == 'S') {
          $scope.solicitudpro.ipssolicitante = data.Nombre;
          $scope.solicitudpro.ipscodsolicitante = data.Codigo;
          text = 'Ips Solicitante.';
          swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        } else {
          $scope.solicitudpro.ipsasignada = data.Nombre;
          $scope.solicitudpro.ipscodasignada = data.Codigo;
          $scope.solicitudpro.contrato = '';
          text = 'Ips Asignada.';
          $scope.listarContratoServicio($scope.solicitudpro.ipscodasignada, $scope.regimenafitabII, text);//faltan parametros
        }
      }

      if ($scope.tipoaut == '4') {
        if (tipo == 'S') {
          $scope.autedit.ipssolicita = data.Nombre;
          $scope.autedit.ipscodsolicita = data.Codigo;
          text = 'Ips Solicitante.';
          $scope.buscarEspecialidades(data.Codigo);
          swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        } else {
          $scope.autedit.ipsasignada = data.Nombre;
          $scope.autedit.ipscodasignada = data.Codigo;
          $scope.autedit.ipsasignadadireccion = data.Codigo_Dir;
          text = 'Ips Asignada.';
          $scope.autedit.contrato = '';
          $scope.v_encabezado.CLASIFICACION = '';
          $scope.v_encabezado.NOMBRE_CLAS = '';
          $scope.autedit.servicio = '';
          $scope.cargarContratoTabI($scope.autedit.ipscodasignada, $scope.regimenafitabIV, 'tab4');
          // $scope.listarContratoServicio($scope.autedit.ipscodasignada, $scope.regimenafitabIV, text);//faltan parametros
        }
      }

    }


    $scope.buscarEspecialidades = function (ips) {

      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtener_especialidad', nit: ips }
      }).then(function (response) {
        $scope.listEspecialidades = response.data;
      })
    }
    $scope.listacontratost2 = [];
    $scope.listarContratoServicio = function (ips, regimen, text) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtenerContratos', nit: ips, regimen: regimen }
      }).then(function (response) {
        $scope.listacontratost2 = response.data;
        if (response.data["0"].CODIGO == '1') {
          if ($scope.listacontratost2.length == 1) {
            var contrato = response.data["0"].NUMERO;
            $scope.solicitudpro.contrato = response.data["0"].NUMERO;
            $scope.solicitudpro.contratoDocumento = response.data["0"].DOCUMENTO;
            $scope.solicitudpro.contratoUbicacion = response.data["0"].UBICACION;
            $http({
              method: 'POST',
              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
              data: { function: 'obtenerServicios', contrato: contrato, tipo: 'P' }
            }).then(function (response) {
              $scope.listServicios = response.data;
              swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });

            })
          }
          $("#modalips").modal("close");
        } else {
          $scope.listServicios = '';
          swal({ title: "Completado", text: 'IPS Asignada no tiene contrato', showConfirmButton: true, type: "success" });
        }
      })
    }

    $scope.buscarProducto = function (pro) {
      if ($scope.buscarpro.length >= 3) {
        if ($scope.tipoaut == '1') {
          var regimen = $scope.regimenafitabI;
          var contrato = $scope.solicitud.contrato;
          var servicio = $scope.solicitud.codservicio
          var tipo = 'N';
          var ubicacion = $scope.solicitud.ubicacionpaciente;
          var sexo = $scope.sexoafitabI;
          var edad = $scope.edadafitabI;
        } else if ($scope.tipoaut == '2') {
          var regimen = $scope.regimenafitabII;
          var contrato = $scope.solicitudpro.contrato;
          var servicio = $scope.solicitudpro.codservicio;
          var tipo = 'S';
          var ubicacion = 'H';
          var sexo = $scope.sexoafitabII;
          var edad = $scope.edadafitabII;
        } else {
          var regimen = $scope.regimenafitabIV;
          var contrato = $scope.autedit.contrato;
          var servicio = $scope.autedit.codservicio;
          var tipo = 'N';
          var ubicacion = $scope.autedit.ubicacionpaciente;
          var sexo = $scope.sexoafitabIV;
          var edad = $scope.edadafitabIV;
        }

        swal({ title: 'Procesando...' });
        swal.showLoading();

        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: { function: 'obtenerProducto', regimen: regimen, contrato: contrato, producto: $scope.buscarpro, clasificacion: servicio, tipo: tipo, ubicacion: ubicacion, edad: edad, sexo: sexo }
        }).then(function (response) {
          swal.close();
          $scope.listProductos = [];
          if (response.data["0"].CODIGO == '-1') {
            swal('Importante', response.data["0"].NOMBRE, 'info');
            $scope.inactivebarrapro = true;
          } else if (response.data["0"].CODIGO == '0') {
            swal('Importante', response.data["0"].NOMBRE, 'info');
            $scope.inactivebarrapro = true;
          } else {
            $scope.listProductos = response.data;
            $scope.inactivebarrapro = false;
          }
        })
      } else {
        swal('Importante', 'El campo  de texto no puede estar vacio!', 'info');
      }
    }

    $scope.buscarProductoEdit = function (pro) {
      if (pro.length >= 6) {
        var tipo = 'N';
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: { function: 'obtenerProducto', regimen: $scope.regimentabIV, contrato: $scope.contratotabIV, producto: pro, clasificacion: $scope.serviciotabIV, tipo: tipo, ubicacion: $scope.ubicaciontabIV }
        }).then(function (response) {
          $scope.listProductosedit = [];
          if (response.data["0"].CODIGO == '-1') {
            swal('Importante', response.data["0"].NOMBRE, 'info');
          } else if (response.data["0"].CODIGO == '0') {
            swal('Importante', response.data["0"].NOMBRE, 'info');
          } else {
            $scope.listProductosedit = response.data;
          }
        })
      } else {

      }
    }
    $scope.tempData;
    $scope.cantidadinput = 1;
    $scope.tempProd = '';
    /*  $scope.seleccionarproducto = function (data) {
         console.log(data);
         $scope.tempProd = data;
        if ($scope.solicitud.codservicio == "714" || $scope.autedit.codservicio == "714") {
          $scope.tempData = data;
          $scope.openmodals('modalcantprod', $scope.tipoaut);
        } else {
          swal({
            title: 'Ingrese la cantidad',
            input: 'number',
            inputValue: $scope.cantidadinput,
            inputAttributes: {
              min: 1,
              max: 99
            },
            showCancelButton: true
          }).then(function (result) {
            if (result > 0) {
              data.CANTIDAD = result;
              data.CANTIDADN = result;
              data.ENTREGAS = 1;
              if ($scope.tipoaut == '1') {
                if ($scope.productosagregadostabI.length == 0) {
                  $scope.productosagregadostabI.push(data);
                } else {
                  var comps = 0;
                  for (let index = 0; index < $scope.productosagregadostabI.length; index++) {
                    const element = $scope.productosagregadostabI[index];
                    if (element.CODIGO == data.CODIGO) {
                      var sindex = index;
                      comps = 1;
                      break;
                    } else {
                      comps = 0;
                    }
                  }
  
                  if (comps == 0) {
                    $scope.productosagregadostabI.push(data);
                  } else {
                    $scope.productosagregadostabI[sindex].CANTIDAD = data.CANTIDAD;
                  }
                }
                if ($scope.productosagregadostabI.length == 0){
                  $scope.nofindproductstabI = false;
                }
                else{
                  $scope.nofindproductstabI = true;
                }
          
              if ($scope.tempProd.SUBCLAS == 'S') {
                  $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                    data: {
                      function: 'p_mostrar_hijos_epro_valor',
                      cups: $scope.tempProd.CODIGO,
                      regimen: $scope.solicitud.documentocontrato,
                      contrato: $scope.solicitud.contrato,
                      ubicacion: $scope.solicitud.ubicacioncontrato
                    }
                  }).then(function (res) {
                    console.log(res.data);
                    $scope.listMotivos = res.data;
                    $scope.templistMotivos = res.data;
                    $scope.array = { 99999: "NO APLICA SUBCATEGORIA" };
                    for (var i = 0; i < $scope.listMotivos.length; i++) {
                      var val = $scope.listMotivos[i].NUMERO_H + ' - ' + $scope.listMotivos[i].NOMBRE_H + ' - ' + $scope.listMotivos[i].VALOR;
                      $scope.array[val] = val;
                    }
  
                    swal({
                      title: 'Seleccionar Subcategoria',
                      input: 'select',
                      inputOptions: $scope.array,
                      inputPlaceholder: 'Seleccionar',
                      showCancelButton: true,
                      inputValidator: function (value) {
                        return new Promise(function (resolve, reject) {
                          if (value !== '') {
                            resolve();
                          } else {
                            reject('Debes Selecionar una Subcategoria');
                          }
                        });
                      }
                    }).then(function (result) {
                      console.log(result);
  
                      $scope.tempsubcla = result.split('-');
                      if (result) {
                        const filteredItems = $scope.productosagregadostabI.findIndex(item => item == $scope.tempProd);
                        console.log('filteredItems_', filteredItems);
                        if ($scope.tempsubcla[0] == '99999') {
                          $scope.productosagregadostabI[filteredItems].SUBCLASN = 'N';
                        } else {
                          $scope.productosagregadostabI[filteredItems].SUBCLASN = 'S';
  
                          const filteredMotivos = $scope.templistMotivos.find(item => item.NUMERO_H == ($scope.tempsubcla[0]));                          
                          $scope.productosagregadostabI[filteredItems].SUBCLASCOD = filteredMotivos.NUMERO_H;
                          $scope.productosagregadostabI[filteredItems].SUBCLASNOM = filteredMotivos.NOMBRE_H;
                          $scope.productosagregadostabI[filteredItems].VALORP = filteredMotivos.VALOR;                                                
                          $scope.$apply();
                        }                                              
                        swal({
                          title: "Completado",
                          html: 'Producto  y Subcategoria Seleccionados',
                          type: 'success',
                        });
  
                      }
                    });
                  })
  
                } else {                
                  $scope.$apply();
                  swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success", timer: 800 });
                }
    
      
              } else if ($scope.tipoaut == '4') {
                $scope.inactivebarraproedit = true;
                if ($scope.productosagregadostabIV.length == 0) {
                  $scope.productosagregadostabIV.push(data);
                } else {
                  var come = 0;
                  for (let index = 0; index < $scope.productosagregadostabIV.length; index++) {
                    const element = $scope.productosagregadostabIV[index];
                    if (element.CODIGO == data.CODIGO) {
                      var eindex = index;
                      come = 1;
                      break;
                    } else {
                      come = 0;
                    }
                  }
  
                  if (come == 0) {
                    $scope.productosagregadostabIV.push(data);
                  } else {
                    $scope.productosagregadostabIV[eindex].CANTIDAD = data.CANTIDAD;
                  }
                }
                if ($scope.productosagregadostabIV.length == 0){
                  $scope.nofindproductstabIV = false;
                }
                else{
                  $scope.nofindproductstabIV = true;
                }
             if ($scope.tempProd.SUBCLAS == 'S') {
                  $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                    data: {
                      function: 'p_mostrar_hijos_epro_valor',
                      cups: $scope.tempProd.CODIGO,
                      regimen: $scope.autedit.documentocontrato,
                      contrato: $scope.autedit.contrato,
                      ubicacion: $scope.autedit.ubicacioncontrato
                    }
                  }).then(function (res) {
                    $scope.listMotivos = res.data;
                    $scope.templistMotivos = res.data;
                    $scope.array = { 99999: "NO APLICA SUBCATEGORIA" };
                    for (var i = 0; i < $scope.listMotivos.length; i++) {
                      var val = $scope.listMotivos[i].NUMERO_H + ' - ' + $scope.listMotivos[i].NOMBRE_H + ' - ' + $scope.listMotivos[i].VALOR;
                      $scope.array[val] = val;
                    }
                    swal({
                      title: 'Seleccionar Subcategoria',
                      input: 'select',
                      inputOptions: $scope.array,
                      inputPlaceholder: 'Seleccionar',
                      showCancelButton: true,
                      inputValidator: function (value) {
                        return new Promise(function (resolve, reject) {
                          if (value !== '') {
                            resolve();
                          } else {
                            reject('Debes Selecionar una Subcategoria');
                          }
                        });
                      }
                    }).then(function (result) {
  
                      $scope.tempsubcla = result.split('-');
                      if (result) {
                        console.log('$scope.tempProd_', $scope.tempProd);
                        console.log('$scope.productosagregadostabI_', $scope.productosagregadostabIV);
                        const filteredItems = $scope.productosagregadostabIV.findIndex(item => item == $scope.tempProd);
                        console.log(filteredItems);
                        console.log($scope.productosagregadostabIV);
  
                        console.log('tempsubcla::', $scope.tempsubcla[0]);
                        if ($scope.tempsubcla[0] == '99999') {
                          $scope.productosagregadostabIV[filteredItems].SUBCLASN = 'N';
                        } else {
                          $scope.productosagregadostabIV[filteredItems].SUBCLASN = 'S';
  
                          const filteredMotivos = $scope.templistMotivos.find(item => item.NUMERO_H == ($scope.tempsubcla[0]));
                          console.log(filteredMotivos);
                          console.log($scope.productosagregadostabIV);
  
                          $scope.productosagregadostabIV[filteredItems].SUBCLASCOD = filteredMotivos.NUMERO_H;
                          $scope.productosagregadostabIV[filteredItems].SUBCLASNOM = filteredMotivos.NOMBRE_H;
                          $scope.productosagregadostabIV[filteredItems].VALORP = filteredMotivos.VALOR;                        
                          console.log(filteredItems);
                          console.log($scope.productosagregadostabIV);
                        }
  
                        $scope.$apply();
  
                        console.log($scope.productosagregadostabIV);
                        swal({
                          title: "Completado",
                          html: 'Producto  y Subcategoria Seleccionados',
                          type: 'success',
                        });
  
                        console.log($scope.productosagregadostabIV);
  
                      }
                    });
                  })
  
                } else {
                  console.log($scope.productosagregadostabIV);
                  swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success", timer: 800 });
                }
              } else {
                if ($scope.productosagregadostabII.length == 0) {
                  $scope.productosagregadostabII.push(data);
                } else {
                  var comp = 0;
                  for (let index = 0; index < $scope.productosagregadostabII.length; index++) {
                    const element = $scope.productosagregadostabII[index];
                    if (element.CODIGO == data.CODIGO) {
                      var pindex = index;
                      comp = 1;
                      break;
                    } else {
                      comp = 0;
                    }
                  }
  
                  if (comp == 0) {
                    $scope.productosagregadostabII.push(data);
                  } else {
                    $scope.productosagregadostabII[pindex].CANTIDAD = data.CANTIDAD;
                  }
                }
  
                if ($scope.productosagregadostabII.length == 0)
                  $scope.nofindproductstabII = false;
                else
                  $scope.nofindproductstabII = true;
              
  
              if ($scope.tempProd.SUBCLAS == 'S') {              
                $http({
                  method: 'POST',
                  url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                  data: {
                    function: 'p_mostrar_hijos_epro_valor',
                    cups: $scope.tempProd.CODIGO,
                    regimen: $scope.solicitudpro.contratoDocumento,
                    contrato: $scope.solicitudpro.contrato,
                    ubicacion: $scope.solicitudpro.contratoUbicacion
                  }
                }).then(function (res) {
                  $scope.listMotivos = res.data;
                  $scope.templistMotivos = res.data;
                  $scope.array = { 99999: "NO APLICA SUBCATEGORIA" };
                  for (var i = 0; i < $scope.listMotivos.length; i++) {
                    var val = $scope.listMotivos[i].NUMERO_H + ' - ' + $scope.listMotivos[i].NOMBRE_H + ' - ' + $scope.listMotivos[i].VALOR;
                    $scope.array[val] = val;
                  }
                  swal({
                    title: 'Seleccionar SubClasificación',
                    input: 'select',
                    inputOptions: $scope.array,
                    inputPlaceholder: 'Seleccionar',
                    showCancelButton: true,
                    inputValidator: function (value) {
                      return new Promise(function (resolve, reject) {
                        if (value !== '') {
                          resolve();
                        } else {
                          reject('Debes Selecionar una SubClasificación');
                        }
                      });
                    }
                  }).then(function (result) {
  
                    $scope.tempsubcla = result.split('-');
                    if (result) {
                      console.log('$scope.tempProd_', $scope.tempProd);
                      console.log('$scope.productosagregadostabI_', $scope.productosagregadostabII);
                      const filteredItems = $scope.productosagregadostabII.findIndex(item => item == $scope.tempProd);
                      console.log(filteredItems);
                      console.log($scope.productosagregadostabII);
  
                      console.log('tempsubcla::', $scope.tempsubcla[0]);
                      if ($scope.tempsubcla[0] == '99999') {
                        $scope.productosagregadostabII[filteredItems].SUBCLASN = 'N';
                      } else {
                        $scope.productosagregadostabII[filteredItems].SUBCLASN = 'S';
  
                        const filteredMotivos = $scope.templistMotivos.find(item => item.NUMERO_H == ($scope.tempsubcla[0]));
                        console.log(filteredMotivos);
                        console.log($scope.productosagregadostabII);
  
                        $scope.productosagregadostabII[filteredItems].SUBCLASCOD = filteredMotivos.NUMERO_H;
                        $scope.productosagregadostabII[filteredItems].SUBCLASNOM = filteredMotivos.NOMBRE_H;
                        $scope.productosagregadostabII[filteredItems].VALORP = filteredMotivos.VALOR;                        
                        console.log(filteredItems);
                        console.log($scope.productosagregadostabII);
                      }
  
                      $scope.$apply();
  
                      console.log($scope.productosagregadostabII);
                      swal({
                        title: "Completado",
                        html: 'Producto  y SubClasificación Seleccionados',
                        type: 'success',
                      });
  
                      console.log($scope.productosagregadostabII);
  
                    }
                  });
                })
  
              } else {
                console.log($scope.productosagregadostabII);
                swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success", timer: 800 });
              }
             
  
              setTimeout(function () {              
                $scope.cantidadinput = 1;
                $scope.valcantidad = false;
              }, 100);
            }
            } else {
              swal('Importante', 'Cantidad Incorrecta', 'info')
            }
          })
        }
  
      }*/
    $scope.seleccionarproducto = function (data) {
      console.log(data);
      $scope.tempProd = data;
      if ($scope.solicitud.codservicio == "714" || $scope.autedit.codservicio == "714") {
        $scope.tempData = data;
        $scope.openmodals('modalcantprod', $scope.tipoaut);
      } else {
        swal({
          title: 'Ingrese la cantidad',
          input: 'number',
          inputValue: $scope.cantidadinput,
          inputAttributes: {
            min: 1,
            max: 99
          },
          showCancelButton: true
        }).then(function (result) {
          if (result > 0) {
            data.CANTIDAD = result;
            data.CANTIDADN = result;
            data.ENTREGAS = 1;
            if ($scope.tipoaut == '1') {
              if ($scope.productosagregadostabI.length == 0) {
                $scope.productosagregadostabI.push(data);
              } else {
                var comps = 0;
                for (let index = 0; index < $scope.productosagregadostabI.length; index++) {
                  const element = $scope.productosagregadostabI[index];
                  if (element.CODIGO == data.CODIGO) {
                    var sindex = index;
                    comps = 1;
                    break;
                  } else {
                    comps = 0;
                  }
                }

                if (comps == 0) {
                  $scope.productosagregadostabI.push(data);
                } else {
                  $scope.productosagregadostabI[sindex].CANTIDAD = data.CANTIDAD;
                  $scope.productosagregadostabI[sindex].CANTIDADN = data.CANTIDAD;
                }
              }
              if ($scope.productosagregadostabI.length == 0) {
                $scope.nofindproductstabI = false;
              }
              else {
                $scope.nofindproductstabI = true;
              }

              if ($scope.tempProd.SUBCLAS == 'S') {
                $http({
                  method: 'POST',
                  url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                  data: {
                    function: 'p_mostrar_hijos_epro_valor',
                    cups: $scope.tempProd.CODIGO,
                    regimen: $scope.solicitud.documentocontrato,
                    contrato: $scope.solicitud.contrato,
                    ubicacion: $scope.solicitud.ubicacioncontrato
                  }
                }).then(function (res) {
                  console.log('subcategorias', res.data);
                  $scope.listMotivos = res.data;
                  $scope.templistMotivos = res.data;
                  $scope.array = { 99999: "NO APLICA SUBCATEGORIA" };
                  if ($scope.listMotivos.length > 0) {
                    for (var i = 0; i < $scope.listMotivos.length; i++) {
                      var val = $scope.listMotivos[i].NUMERO_H + ' - ' + $scope.listMotivos[i].NOMBRE_H + ' - ' + $scope.listMotivos[i].VALOR;
                      $scope.array[val] = val;
                    }

                    swal({
                      title: 'Seleccionar Subcategoria',
                      input: 'select',
                      inputOptions: $scope.array,
                      inputPlaceholder: 'Seleccionar',
                      showCancelButton: true,
                      inputValidator: function (value) {
                        return new Promise(function (resolve, reject) {
                          if (value !== '') {
                            resolve();
                          } else {
                            reject('Debes Selecionar una Subcategoria');
                          }
                        });
                      }
                    }).then(function (result) {
                      console.log(result);

                      $scope.tempsubcla = result.split('-');
                      if (result) {
                        const filteredItems = $scope.productosagregadostabI.findIndex(item => item.CODIGO == $scope.tempProd.CODIGO);
                        console.log('filteredItems_', filteredItems);
                        if ($scope.tempsubcla[0] == '99999') {
                          $scope.productosagregadostabI[filteredItems].SUBCLASN = 'N';
                        } else {
                          $scope.productosagregadostabI[filteredItems].SUBCLASN = 'S';

                          const filteredMotivos = $scope.templistMotivos.find(item => item.NUMERO_H == ($scope.tempsubcla[0]));
                          $scope.productosagregadostabI[filteredItems].SUBCLASCOD = filteredMotivos.NUMERO_H;
                          $scope.productosagregadostabI[filteredItems].SUBCLASNOM = filteredMotivos.NOMBRE_H;
                          $scope.productosagregadostabI[filteredItems].VALORP = filteredMotivos.VALOR;
                          $scope.$apply();
                        }
                        swal({
                          title: "Completado",
                          html: 'Producto  y Subcategoria Seleccionados',
                          type: 'success',
                        });

                      }
                    });
                  } else {
                    const filteredItems = $scope.productosagregadostabI.findIndex(item => item.CODIGO == $scope.tempProd.CODIGO);
                    console.log('filteredItems_', filteredItems);
                    $scope.productosagregadostabI[filteredItems].SUBCLASN = 'N';

                    $scope.$apply();
                    swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success", timer: 800 });
                  }


                })

              } else {
                $scope.$apply();
                swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success", timer: 800 });
              }


            } else if ($scope.tipoaut == '4') {
              $scope.inactivebarraproedit = true;
              if ($scope.productosagregadostabIV.length == 0) {
                $scope.productosagregadostabIV.push(data);
              } else {
                var come = 0;
                for (let index = 0; index < $scope.productosagregadostabIV.length; index++) {
                  const element = $scope.productosagregadostabIV[index];
                  if (element.CODIGO == data.CODIGO) {
                    var eindex = index;
                    come = 1;
                    break;
                  } else {
                    come = 0;
                  }
                }

                if (come == 0) {
                  $scope.productosagregadostabIV.push(data);
                } else {
                  $scope.productosagregadostabIV[eindex].CANTIDAD = data.CANTIDAD;
                  $scope.productosagregadostabIV[eindex].CANTIDADN = data.CANTIDAD;
                }
              }
              if ($scope.productosagregadostabIV.length == 0) {
                $scope.nofindproductstabIV = false;
              }
              else {
                $scope.nofindproductstabIV = true;
              }
              if ($scope.tempProd.SUBCLAS == 'S') {
                $http({
                  method: 'POST',
                  url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                  data: {
                    function: 'p_mostrar_hijos_epro_valor',
                    cups: $scope.tempProd.CODIGO,
                    regimen: $scope.autedit.documentocontrato,
                    contrato: $scope.autedit.contrato,
                    ubicacion: $scope.autedit.ubicacioncontrato
                  }
                }).then(function (res) {
                  $scope.listMotivos = res.data;
                  $scope.templistMotivos = res.data;
                  $scope.array = { 99999: "NO APLICA SUBCATEGORIA" };
                  if ($scope.listMotivos.length > 0) {
                    for (var i = 0; i < $scope.listMotivos.length; i++) {
                      var val = $scope.listMotivos[i].NUMERO_H + ' - ' + $scope.listMotivos[i].NOMBRE_H + ' - ' + $scope.listMotivos[i].VALOR;
                      $scope.array[val] = val;
                    }
                    swal({
                      title: 'Seleccionar Subcategoria',
                      input: 'select',
                      inputOptions: $scope.array,
                      inputPlaceholder: 'Seleccionar',
                      showCancelButton: true,
                      inputValidator: function (value) {
                        return new Promise(function (resolve, reject) {
                          if (value !== '') {
                            resolve();
                          } else {
                            reject('Debes Selecionar una Subcategoria');
                          }
                        });
                      }
                    }).then(function (result) {

                      $scope.tempsubcla = result.split('-');
                      if (result) {
                        console.log('$scope.tempProd_', $scope.tempProd);
                        console.log('$scope.productosagregadostabI_', $scope.productosagregadostabIV);
                        const filteredItems = $scope.productosagregadostabIV.findIndex(item => item.CODIGO == $scope.tempProd.CODIGO);
                        console.log(filteredItems);
                        console.log($scope.productosagregadostabIV);

                        console.log('tempsubcla::', $scope.tempsubcla[0]);
                        if ($scope.tempsubcla[0] == '99999') {
                          $scope.productosagregadostabIV[filteredItems].SUBCLASN = 'N';
                        } else {
                          $scope.productosagregadostabIV[filteredItems].SUBCLASN = 'S';

                          const filteredMotivos = $scope.templistMotivos.find(item => item.NUMERO_H == ($scope.tempsubcla[0]));
                          console.log(filteredMotivos);
                          console.log($scope.productosagregadostabIV);

                          $scope.productosagregadostabIV[filteredItems].SUBCLASCOD = filteredMotivos.NUMERO_H;
                          $scope.productosagregadostabIV[filteredItems].SUBCLASNOM = filteredMotivos.NOMBRE_H;
                          $scope.productosagregadostabIV[filteredItems].VALORP = filteredMotivos.VALOR;
                          console.log(filteredItems);
                          console.log($scope.productosagregadostabIV);
                        }

                        $scope.$apply();

                        console.log($scope.productosagregadostabIV);
                        swal({
                          title: "Completado",
                          html: 'Producto  y Subcategoria Seleccionados',
                          type: 'success',
                        });

                        console.log($scope.productosagregadostabIV);

                      }
                    });
                  } else {
                    const filteredItems = $scope.productosagregadostabIV.findIndex(item => item.CODIGO == $scope.tempProd.CODIGO);
                    console.log('filteredItems_', filteredItems);
                    $scope.productosagregadostabIV[filteredItems].SUBCLASN = 'N';

                    $scope.$apply();
                    swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success", timer: 800 });
                  }

                })

              } else {
                console.log($scope.productosagregadostabIV);
                $scope.$apply();
                swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success", timer: 800 });
              }
            } else {
              if ($scope.productosagregadostabII.length == 0) {
                $scope.productosagregadostabII.push(data);
              } else {
                var comp = 0;
                for (let index = 0; index < $scope.productosagregadostabII.length; index++) {
                  const element = $scope.productosagregadostabII[index];
                  if (element.CODIGO == data.CODIGO) {
                    var pindex = index;
                    comp = 1;
                    break;
                  } else {
                    comp = 0;
                  }
                }

                if (comp == 0) {
                  $scope.productosagregadostabII.push(data);
                } else {
                  $scope.productosagregadostabII[pindex].CANTIDAD = data.CANTIDAD;
                  $scope.productosagregadostabII[pindex].CANTIDADN = data.CANTIDAD;
                }
              }

              if ($scope.productosagregadostabII.length == 0)
                $scope.nofindproductstabII = false;
              else
                $scope.nofindproductstabII = true;


              if ($scope.tempProd.SUBCLAS == 'S') {
                $http({
                  method: 'POST',
                  url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                  data: {
                    function: 'p_mostrar_hijos_epro_valor',
                    cups: $scope.tempProd.CODIGO,
                    regimen: $scope.solicitudpro.contratoDocumento,
                    contrato: $scope.solicitudpro.contrato,
                    ubicacion: $scope.solicitudpro.contratoUbicacion
                  }
                }).then(function (res) {
                  $scope.listMotivos = res.data;
                  $scope.templistMotivos = res.data;
                  $scope.array = { 99999: "NO APLICA SUBCATEGORIA" };
                  if ($scope.listMotivos.length > 0) {
                    for (var i = 0; i < $scope.listMotivos.length; i++) {
                      var val = $scope.listMotivos[i].NUMERO_H + ' - ' + $scope.listMotivos[i].NOMBRE_H + ' - ' + $scope.listMotivos[i].VALOR;
                      $scope.array[val] = val;
                    }
                    swal({
                      title: 'Seleccionar SubClasificación',
                      input: 'select',
                      inputOptions: $scope.array,
                      inputPlaceholder: 'Seleccionar',
                      showCancelButton: true,
                      inputValidator: function (value) {
                        return new Promise(function (resolve, reject) {
                          if (value !== '') {
                            resolve();
                          } else {
                            reject('Debes Selecionar una SubClasificación');
                          }
                        });
                      }
                    }).then(function (result) {

                      $scope.tempsubcla = result.split('-');
                      if (result) {
                        console.log('$scope.tempProd_', $scope.tempProd);
                        console.log('$scope.productosagregadostabI_', $scope.productosagregadostabII);
                        const filteredItems = $scope.productosagregadostabII.findIndex(item => item.CODIGO == $scope.tempProd.CODIGO);
                        console.log(filteredItems);
                        console.log($scope.productosagregadostabII);

                        console.log('tempsubcla::', $scope.tempsubcla[0]);
                        if ($scope.tempsubcla[0] == '99999') {
                          $scope.productosagregadostabII[filteredItems].SUBCLASN = 'N';
                        } else {
                          $scope.productosagregadostabII[filteredItems].SUBCLASN = 'S';

                          const filteredMotivos = $scope.templistMotivos.find(item => item.NUMERO_H == ($scope.tempsubcla[0]));
                          console.log(filteredMotivos);
                          console.log($scope.productosagregadostabII);

                          $scope.productosagregadostabII[filteredItems].SUBCLASCOD = filteredMotivos.NUMERO_H;
                          $scope.productosagregadostabII[filteredItems].SUBCLASNOM = filteredMotivos.NOMBRE_H;
                          $scope.productosagregadostabII[filteredItems].VALORP = filteredMotivos.VALOR;
                          console.log(filteredItems);
                          console.log($scope.productosagregadostabII);
                        }

                        $scope.$apply();

                        console.log($scope.productosagregadostabII);
                        swal({
                          title: "Completado",
                          html: 'Producto  y SubClasificación Seleccionados',
                          type: 'success',
                        });

                        console.log($scope.productosagregadostabII);

                      }
                    });
                  } else {
                    const filteredItems = $scope.productosagregadostabII.findIndex(item => item.CODIGO == $scope.tempProd.CODIGO);
                    console.log('filteredItems_', filteredItems);
                    $scope.productosagregadostabII[filteredItems].SUBCLASN = 'N';
                    $scope.$apply();
                    swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success", timer: 800 });
                  }

                })

              } else {
                console.log($scope.productosagregadostabII);
                $scope.$apply();
                swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success", timer: 800 });
              }


              setTimeout(function () {
                $scope.cantidadinput = 1;
                $scope.valcantidad = false;
              }, 100);
            }
          } else {
            swal('Importante', 'Cantidad Incorrecta', 'info')
          }
        })
      }

    }
    $scope.tempCantidad = 1;
    $scope.tempEntregas = 1;
    $scope.guardarProdEntreg = function () {
      if ($scope.tempCantidad > 0) {
        $scope.tempData.ENTREGAS = $scope.tempEntregas;
        $scope.tempData.CANTIDAD = $scope.tempCantidad;
        $scope.tempData.CANTIDADN = $scope.tempCantidad;
        $scope.tempData.CANTIDAD = Math.round(($scope.tempData.CANTIDAD / $scope.tempData.ENTREGAS));
        $scope.tempData.CANTIDADREST = ($scope.tempCantidad - $scope.tempData.CANTIDAD);
        if ($scope.tipoaut == '1') {
          if ($scope.productosagregadostabI.length == 0) {
            $scope.productosagregadostabI.push($scope.tempData);
          } else {
            var comps = 0;
            for (let index = 0; index < $scope.productosagregadostabI.length; index++) {
              const element = $scope.productosagregadostabI[index];
              if (element.CODIGO == $scope.tempData.CODIGO) {
                var sindex = index;
                comps = 1;
                break;
              } else {
                comps = 0;
              }
            }

            if (comps == 0) {
              $scope.productosagregadostabI.push($scope.tempData);
            } else {
              $scope.productosagregadostabI[sindex].CANTIDAD = $scope.tempData.CANTIDAD;
            }
          }
          if ($scope.productosagregadostabI.length == 0)
            $scope.nofindproductstabI = false;
          else
            $scope.nofindproductstabI = true;


        } else if ($scope.tipoaut == '4') {
          $scope.inactivebarraproedit = true;
          if ($scope.productosagregadostabIV.length == 0) {
            $scope.productosagregadostabIV.push($scope.tempData);
          } else {
            var come = 0;
            for (let index = 0; index < $scope.productosagregadostabIV.length; index++) {
              const element = $scope.productosagregadostabIV[index];
              if (element.CODIGO == $scope.tempData.CODIGO) {
                var eindex = index;
                come = 1;
                break;
              } else {
                come = 0;
              }
            }

            if (come == 0) {
              $scope.productosagregadostabIV.push($scope.tempData);
            } else {
              $scope.productosagregadostabIV[eindex].CANTIDAD = $scope.tempData.CANTIDAD;
            }
          }
          if ($scope.productosagregadostabIV.length == 0)
            $scope.nofindproductstabIV = false;
          else
            $scope.nofindproductstabIV = true;
        } else {
          if ($scope.productosagregadostabII.length == 0) {
            $scope.productosagregadostabII.push($scope.tempData);
          } else {
            var comp = 0;
            for (let index = 0; index < $scope.productosagregadostabII.length; index++) {
              const element = $scope.productosagregadostabII[index];
              if (element.CODIGO == $scope.tempData.CODIGO) {
                var pindex = index;
                comp = 1;
                break;
              } else {
                comp = 0;
              }
            }

            if (comp == 0) {
              $scope.productosagregadostabII.push($scope.tempData);
            } else {
              $scope.productosagregadostabII[pindex].CANTIDAD = $scope.tempData.CANTIDAD;
            }
          }

          if ($scope.productosagregadostabII.length == 0)
            $scope.nofindproductstabII = false;
          else
            $scope.nofindproductstabII = true;
        }
        $scope.$apply();
        swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success", timer: 800 });
        setTimeout(function () {
          $("#modalcantprod").modal("close");
          $scope.tempCantidad = 1;
          $scope.tempEntregas = 1;
        }, 100);
      } else {
        swal('Importante', 'Cantidad Incorrecta', 'info')
      }
    }
    $scope.eliminarProducto = function (index, tipo) {
      if (tipo == "1") {
        $scope.productosagregadostabI.splice(index, 1);
        if ($scope.productosagregadostabI.length == 0)
          $scope.nofindproductstabI = false;
        else
          $scope.nofindproductstabI = true;
      } else if (tipo == "4") {
        $scope.productosagregadostabIV.splice(index, 1);
      } else {
        $scope.productosagregadostabII.splice(index, 1);
        if ($scope.productosagregadostabII.length == 0)
          $scope.nofindproductstabII = false;
        else
          $scope.nofindproductstabII = true;
      }
      swal({ title: "Completado", text: "Producto Retirado.", showConfirmButton: false, type: "info", timer: 800 })
    }
    $scope.editProducto = function (index, tipo) {

      $scope.entregas = [{
        num: 1
      }, {
        num: 2
      }, {
        num: 3
      }, {
        num: 4
      }, {
        num: 5
      }, {
        num: 6
      }, {
        num: 7
      }, {
        num: 8
      }];
      if (tipo == "1") {
        if ($scope.solicitud.codservicio == '714') {
          $scope.tempData = $scope.productosagregadostabI[index];
          $scope.tempCantidad = parseInt($scope.productosagregadostabI[index].CANTIDADN);
          $scope.tempEntregas = $scope.productosagregadostabI[index].ENTREGAS;
        } else {
          if ($scope.productosagregadostabI[index]) {
            $scope.cantidadinput = $scope.productosagregadostabI[index].CANTIDAD;
            $scope.seleccionarproducto($scope.productosagregadostabI[index]);
          }
        }

      } else if (tipo == "4") {

        if ($scope.v_encabezado.CLASIFICACION == '714') {
          $scope.tempData = $scope.productosagregadostabIV[index];
          $scope.tempCantidad = parseInt($scope.productosagregadostabIV[index].CANTIDADN);
          $scope.tempEntregas = $scope.productosagregadostabIV[index].ENTREGAS;
        } else {
          if ($scope.productosagregadostabIV[index]) {
            $scope.cantidadinput = $scope.productosagregadostabIV[index].CANTIDADN;
            $scope.seleccionarproducto($scope.productosagregadostabIV[index]);
          }
        }
        // $scope.productosagregadostabIV.splice(index, 1);


      } else {
        // $scope.productosagregadostabII.splice(index, 1);
        // if ($scope.productosagregadostabII.length == 0)
        //   $scope.nofindproductstabII = false;
        // else
        //   $scope.nofindproductstabII = true;
      }

      if (($scope.v_encabezado && $scope.v_encabezado.CLASIFICACION == '714' && tipo == "4") || $scope.solicitud.codservicio == '714' && tipo == "1") {
        $scope.openmodals('modalcantprod', $scope.tipoaut);
      }


      // swal({ title: "Completado", text: "Producto Retirado.", showConfirmButton: false, type: "info", timer: 800 })
    }


    // === nuevo
    $scope.tempData;
    $scope.cantidadinput = 1;
    $scope.tempProd = '';
    $scope.addObsAdmin = function (data) {
      $scope.tempProdObs = data;
      $scope.array = {};
      for (var i = 0; i < $scope.listObservacionesAdmin.length; i++) {
        var val = $scope.listObservacionesAdmin[i].Codigo + ' - ' + $scope.listObservacionesAdmin[i].Nombre;
        $scope.array[val] = val;
      }

      if ($scope.tipoaut == '1') {
        swal({
          title: 'Seleccionar Observación Administrativa',
          input: 'select',
          inputOptions: $scope.array,
          inputPlaceholder: 'Seleccionar',
          showCancelButton: true,
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value !== '') {
                resolve();
              } else {
                reject('Debes Selecionar una Observación');
              }
            });
          }
        }).then(function (result) {
          console.log(result);
          if (result) {
            var tempresult = result.split('-');
            const filteredItems = $scope.productosagregadostabI.findIndex(item => item === $scope.tempProdObs);
            $scope.productosagregadostabI[filteredItems].OBSADMIN = tempresult[0];
            $scope.productosagregadostabI[filteredItems].OBSNOM = tempresult[1];
            $scope.$apply();
            swal({
              title: "Completado",
              html: 'Observación Administrativa Seleccionada',
              type: 'success',
            });

          }
        });
      }

      if ($scope.tipoaut == '4') {
        swal({
          title: 'Seleccionar Observación Administrativa',
          input: 'select',
          inputOptions: $scope.array,
          inputPlaceholder: 'Seleccionar',
          showCancelButton: true,
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value !== '') {
                resolve();
              } else {
                reject('Debes Selecionar una Observación');
              }
            });
          }
        }).then(function (result) {
          console.log(result);
          if (result) {
            var tempresult = result.split('-');
            const filteredItems = $scope.productosagregadostabIV.findIndex(item => item === $scope.tempProdObs);
            $scope.productosagregadostabIV[filteredItems].OBSADMIN = tempresult[0];
            $scope.productosagregadostabIV[filteredItems].OBSNOM = tempresult[1];
            $scope.$apply();
            swal({
              title: "Completado",
              html: 'Observación Administrativa Seleccionada',
              type: 'success',
            });

          }
        });
      }





    }




    $scope.seleccionarservicio = function (data, tipo) {
      var text = ''
      $scope.bservicio = '';
      if ($scope.tipoaut == '1') {
        $scope.solicitud.servicio = data.CODIGO + ' - ' + data.NOMBRE;
        $scope.solicitud.codservicio = data.CODIGO;
        text = 'Servicio Seleccionado Correctamente!';
        $scope.productosagregadostabI = [];
        swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        $scope.closemodals('modalservicio');
      }
      if ($scope.tipoaut == '2') {
        $scope.solicitudpro.servicio = data.CODIGO + ' - ' + data.NOMBRE;
        $scope.solicitudpro.codservicio = data.CODIGO;
        text = 'Servicio Seleccionado Correctamente!';
        $scope.productosagregadostabII = [];
        swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        $scope.closemodals('modalservicio');
      }
      if ($scope.tipoaut == '4') {
        $scope.autedit.servicio = data.CODIGO + '-' + data.NOMBRE;
        $scope.autedit.codservicio = data.CODIGO;
        text = 'Servicio Seleccionado Correctamente!';
        $scope.productosagregadostabIV = [];
        swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        $scope.closemodals('modalservicio');
      }

    }
    $scope.seleccionarespecialidad = function (data, tipo) {
      var text = ''
      $scope.bservicio = '';
      if ($scope.tipoaut == '1') {
        $scope.solicitud.especialidadmedico = data.CODIGO + ' - ' + data.NOMBRE;
        $scope.solicitud.codespecialidad = data.CODIGO;
        text = 'Especialidad Selecionada Correctamente!';
        swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        $scope.closemodals('modalespecialidad');
      }
      // if ($scope.tipoaut == '2') {
      //   $scope.solicitudpro.especialidadmedico = data.CODIGO + '-' + data.NOMBRE;
      //   $scope.solicitudpro.codespecialidad = data.CODIGO;
      //   text = 'Servicio Seleccionado Correctamente!';
      //   swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
      //   $scope.closemodals('modalservicio');
      // }
      if ($scope.tipoaut == '4') {
        $scope.autedit.especialidadmedico = data.CODIGO + ' - ' + data.NOMBRE;
        $scope.autedit.codespecialidad = data.CODIGO;
        text = 'Especialidad Selecionada Correctamente!';
        swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        $scope.closemodals('modalespecialidad');
      }

    }



    $scope.limpiar = function (tab) {

      switch (tab) {

        case '1':
          $scope.inactiveseccion1tab1 = false;
          $scope.inactiveseccion2tab1 = true;
          $scope.activetipotabI = true;
          $scope.productosagregadostabI = [];
          $scope.nofindproductstabI = false;
          $scope.inactimiprestab1 = true;
          $scope.inactivetagmipres = true;
          $scope.inactivetagctc = true;
          $scope.inactivetagtutela = true;
          $scope.inactivetagsiniestro = true;
          $scope.nameservicio = 'de orden'



          // wizard

          $scope.invsolicitudtabI = true;
          $scope.invproductotabI = true;
          $scope.invfinalizartabI = true;
          $scope.solicitud = {
            aut_doc: 'AS',
            tipodocumento: '',
            documento: '',
            diagnom1: '',
            diagnom2: '',
            diagcod1: '',
            diagcod2: '',
            ipsasignada: '',
            ipscodasignada: '',
            contrato: '',
            ubicacioncontrato: '',
            documentocontrato: '',
            servicio: '',
            codservicio: '',
            fechasolicitud: '',
            fechasolicitudparseada: '',
            origen: '',
            tiposervicio: '',
            ubicacionpaciente: '',
            ipssolicita: '',
            ipscodsolicita: '',
            nombremedico: '',
            especialidadmedico: '',
            codespecialidad: '',
            observacion: '',
            nopos: false,
            valornopos: '',
            valortipo: '',
            mipres: false,
            valormipres: '',
            ctc: false,
            valorctc: '',
            tutela: false,
            valortutela: '',
            fecha_acta: '',
            anticipo: false,
            valoranticipo: '',
            siniestro: false,
            valorsiniestro: '',
            altocosto: '',
            prioridad: false,
            valorprioridad: '',
            control: false,
            anopass: '',
            mespess: '',
            file: null,
            namefile: null,
            ext: null,
            aut: false,
            codaut: null,
            ubiaut: null
          }

          $("#btn-solicitudtabI").removeClass("activebtn-step donebtn-step");
          $("#btn-productotabI").addClass("grey");
          $("#btn-finalizartabI").addClass("grey");
          $scope.pasostabI('1');
          $scope.sumPrint = 0;
          $scope.data.formato = '';
          $scope.solicitud.namefile = null;//Asigna null al ng-model autFile   
          $scope.solicitud.ext = null;//Asigna null a la extension autFile 
          $scope.data.requiredFile = false;
          document.getElementById('inputFilePlaceHolder1').value = null;
          if (localStorage.getItem('solicitud_solicitud')) {
            localStorage.setItem('solicitud_solicitud', '');
            setTimeout(() => {
              $scope.backgestionautoaf();
            }, 1000);

          }

          break;
        case '2':
          //secciones de ng hide
          $scope.inactiveseccion1tab2 = false;
          $scope.inactiveseccion2tab2 = true;
          $scope.productosagregadostabII = [];
          $scope.nofindproductstabII = false;
          // wizard
          $scope.invsolicitudtabII = true;
          $scope.invproductotabII = true;
          $scope.invfinalizartabII = true;
          $scope.solicitudpro = {
            numero: 0,
            tipodocumento: '',
            documento: '',
            diagnom1: '',
            diagnom2: '',
            diagcod1: '',
            diagcod2: '',
            ipssolicitante: '',
            ipsasignada: '',
            ipscodsolicitante: '',
            ipscodasignada: '',
            servicio: '',
            codservicio: '',
            fecsolicitud: '',
            fecsolicitudparseada: '',
            fecprogramacion: '',
            fecprogramacionparseada: '',
            justificacion: '',
            observacion: '',
            email: '',
            celular: '',
            direccion: '',
            contrato: '',
            contratoDocumento: '',
            contratoUbicacion: '',
            ubicacion: '',
            file: null,
            ext: null,
            namefile: null,
            accion: 'I',
            origen: 'I',
            ftp: null
          }
          $scope.listacontratost2 = [];
          $("#btn-solicitudtabII").removeClass("activebtn-step donebtn-step");
          $("#btn-finalizartabII").removeClass("activebtn-step donebtn-step");
          $("#btn-productotabII").addClass("grey");
          $("#btn-finalizartabII").addClass("grey");
          $scope.pasostabII('1');
          break;
        case '3':
          break;
        case '4':
          $scope.verAutorizaciones = false;
          $scope.verAutorizacionesEdit = false;
          $scope.inactiveseccion4tab4 = false;
          $scope.numautprocesada = null;
          $scope.numautprocesadaIV = null;
          $scope.ubicacionPrint = null;
          $scope.dataIV.formato = '';
          $scope.autedit.namefile = null;//Asigna null al ng-model autFile   
          $scope.autedit.ext = null;//Asigna null a la extension autFile 
          $scope.dataIV.requiredFile = false;
          document.getElementById('inputFilePlaceHolder4').value = '';
          break;
        case '5':
          $scope.verAutorizaciones = true;
          $scope.verAutorizacionesEdit = false;
          $scope.inactiveseccion4tab4 = false;
          $scope.check_option = false;
          $scope.autorizacion.documento = null;
          $scope.autorizacion.numero = null;
          $scope.solicitud.ubicacion = null;
          break;
        default:
      }
    }

    // Funciones TABI

    $http({
      method: 'POST',
      url: "php/autorizaciones/autorizacion/funcautorizacion.php",
      data: { function: 'obtenerOrigenes' }
    }).then(function (response) {
      $scope.listOrigenes = response.data;
    })

    $http({
      method: 'POST',
      url: "php/autorizaciones/autorizacion/funcautorizacion.php",
      data: { function: 'obtenerUbicacionSolicitud' }
    }).then(function (response) {

      $scope.listUbicaciones = response.data;

    })

    $http({
      method: 'POST',
      url: "php/autorizaciones/autorizacion/funcautorizacion.php",
      data: { function: 'obtenerTipoServicio' }
    }).then(function (response) {

      $scope.listTipoServicio = response.data;

    })

    $http({
      method: 'POST',
      url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
      data: { function: 'ObtenerEspecialidades' }
    }).then(function (response) {

      $scope.listEspecialidades = response.data;

    })


    $scope.pasostabI = function (op) {
      switch (op) {
        case '1':
          $("#btn-solicitudtabI").removeClass("grey");
          $scope.invsolicitudtabI = false;
          $scope.titletabI = 'Solicitud';
          break;
        case '-1':
          $("#btn-productotabI").addClass("grey");
          $scope.invsolicitudtabI = false;
          $scope.titletabI = 'Solicitud';
          $scope.invproductotabI = true;
          break;
        case '2':
          $scope.validartabI('solicitud');
          if ($scope.pasarsolicitudaut == true) {
            $("#btn-productotabI").removeClass("grey");
            $scope.invsolicitudtabI = true;
            $scope.invproductotabI = false;
            $scope.titletabI = 'Producto';
          } else {
            swal('Importante', $scope.data.requiredFile == true ? 'Verifique el peso y/o la extension del adjunto' : $scope.validatext, 'info');
          }
          break;
        case '5':
          $scope.validartabI('autorizacion');
          if ($scope.pasarsolicitudaut == true) {
            $scope.check_option_3 = true;
            $scope.nameautedit = 'Detalle';
          } else {
            swal('Importante', $scope.dataIV.requiredFile == true ? 'Verifique el peso y/o la extension del adjunto' : $scope.validatextab4, 'info');
          }
          break;
        case '-5':
          $scope.nameautedit = 'Encabezado';
          $scope.check_option_3 = false;
          break;
        case '6':
          if ($scope.productosagregadostabIV.length == 0 || $scope.productosagregadostabIV == undefined) {
            var text = 'Se creara la autorizacion en estado activa debido a que faltan los productos';
          } else {
            var text = 'Procesar autorización';
          }
          if ($scope.pasarproductoaut == true) {
            $scope.finalizartabIV(text);
          } else {
            swal('Importante', 'Debe agregar un producto', 'info')
          }
          break;
        case '-2':
          $("#btn-finalizartabI").addClass("grey");
          $scope.invproductotabI = false;
          $scope.titletabI = 'Producto';
          $scope.invfinalizartabI = true;
          break;
        case '3':
          if ($scope.productosagregadostabI.length == 0 || $scope.productosagregadostabI == undefined) {
            var text = 'Se creara la autorizacion en estado activa debido a que faltan los productos';
          } else {
            var text = 'Procesar autorización';
          }
          // if ($scope.pasarproductoaut == true) {
          if ($scope.productosagregadostabI.length > 0) {
            $scope.finalizartabI(text);
            $("#btn-finalizartabI").removeClass("grey");
          } else {
            swal('Importante', 'Debe agregar un producto', 'info')
          }
          break;
        case '4':
          setTimeout(function () {
            swal({ title: "Completado", text: 'Autorización Completada', type: "success", timer: 800 });
            $scope.limpiar('1');
            $scope.$apply();
          }, 500);
          break;
        case 't4':
          setTimeout(function () {
            $scope.solicitud.ubicacion = $scope.autorizacion.documento ? 0 : $scope.solicitud.ubicacion;
            $scope.buscarAutorizaciones($scope.autorizacion.documento, $scope.autorizacion.numero, $scope.solicitud.ubicacion)
            swal({ title: "Completado", text: 'Autorización Completada', type: "success", timer: 800 });
            $scope.limpiar('4');
            $scope.$apply();
          }, 500);
          break;
        default:
      }
    }

    $scope.pasostabI('1');
    $scope.selectContratoTabI = null;
    $scope.cargarContratoTabI = function (ips, regimen, tab) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtenerContratos', nit: ips, regimen: regimen }
      }).then(function (response) {
        if (response.data[0].CODIGO == '1') {
          if (tab == 'tab1') {
            $scope.listContratostab1 = response.data;
            if ($scope.listContratostab1.length == 1) {
              $scope.selectContratoTabI = response.data[0].NUMERO;
              $scope.solicitud.contrato = response.data[0].NUMERO;
              $scope.obtenerServiciosTabI($scope.selectContratoTabI, 'tab1');
            } else {
              $scope.selectContratoTabI = null;
              $scope.listServicios = null;
            }
          } else {
            $scope.listContratostab4 = response.data;
            if ($scope.listContratostab4.length == 1) {
              $scope.autedit.contrato = response.data[0].NUMERO;
              console.log('cargarContratoTabI_', $scope.autedit.contrato);
              // $scope.obtenerServiciosTabI($scope.autedit.contrato, 'tab4');
            } else {


            }

          }
          $("#modalips").modal("close");
        } else {
          $scope.solicitud.contrato = '';
          $scope.listContratostab1 = '';
          $scope.listServicios = null;
          swal({ title: "Completado", text: 'IPS Asignada no tiene contrato', showConfirmButton: true, type: "success", timer: 800 });
        }
      })
    }

    $scope.obtenerServiciosTabI = function (contrato, tab) {
      if (contrato) {
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: { function: 'obtenerServicios', contrato: contrato, tipo: 'A' }
        }).then(function (response) {
          if (tab == 'tab1') {
            for (var i = 0; i < $scope.listContratostab1.length; i++) {
              if ($scope.listContratostab1[i].NUMERO == contrato) {
                $scope.solicitud.ubicacioncontrato = $scope.listContratostab1[i].UBICACION;
                $scope.solicitud.documentocontrato = $scope.listContratostab1[i].DOCUMENTO
              }
            }
            $scope.listServicios = response.data;
          } else if (tab == 'tab4') {
            for (var i = 0; i < $scope.listContratostab4.length; i++) {
              if ($scope.listContratostab4[i].NUMERO == contrato) {
                $scope.autedit.ubicacioncontrato = $scope.listContratostab4[i].UBICACION;
                $scope.autedit.documentocontrato = $scope.listContratostab4[i].DOCUMENTO
              }
            }
            setTimeout(() => {
              if ($scope.v_encabezado.CLASIFICACION && $scope.v_encabezado.NOMBRE_CLAS) {
                $scope.autedit.servicio = $scope.v_encabezado.CLASIFICACION + ' - ' + $scope.v_encabezado.NOMBRE_CLAS;
              }

            }, 100);
            $scope.listServicios = response.data;
          } else {
            for (var i = 0; i < $scope.listacontratost2.length; i++) {
              if ($scope.listacontratost2[i].NUMERO == contrato) {
                $scope.solicitudpro.ubicacioncontrato = $scope.listacontratost2[i].UBICACION;
                $scope.solicitudpro.documentocontrato = $scope.listacontratost2[i].DOCUMENTO
              }

            }
            $scope.listServicios = response.data;
          }

        })
      }
    }

    $scope.setParametros = function (opcion, tipodocumento, documento) {

      switch (opcion) {

        case 'nopos':
          $scope.solicitud.ctc = false;

          $scope.solicitud.valorctc = '';

          $scope.solicitud.mipres = false;

          $scope.solicitud.valormipres = '';

          $scope.solicitud.siniestro = false;

          $scope.solicitud.valorsiniestro = '';

          $scope.inactivetagmipres = true;

          $scope.inactivetagtutela = true;

          $scope.inactivetagctc = true;

          $scope.inactivetagsiniestro = true;

          $scope.activetipotabI = !$scope.activetipotabI;

          $scope.inactimiprestab1 = !$scope.inactimiprestab1;

          break;

        case 'noposp':

          if ($scope.autedit.nopos == true) {

            //$scope.autedit.valortutela = '';

            $scope.autedit.valorctc = '';

            $scope.autedit.valormipres = '';

            $scope.inactivetagmiprese = true;

            //$scope.inactivetagtutelae = true;

            $scope.inactivetagctce = true;

            $scope.inactivetagsiniestroe = true;

            if ($scope.regimenafitabIV == 'C') {

              $scope.inactimiprestab4 = false;

            } else {

              $scope.inactimiprestab4 = true;

            }

            $scope.activetipotabIV = false;

          } else {

            $scope.activetipotabIV = true;

          }

          break;

        case 'nopose':

          // if ($scope.autedit.nopos == true) {

          //$scope.autedit.tutela = false;

          //$scope.autedit.valortutela = '';

          $scope.autedit.ctc = false;

          $scope.autedit.valorctc = '';

          $scope.autedit.mipres = false;

          $scope.autedit.valormipres = '';

          $scope.autedit.siniestro = false;

          $scope.autedit.valorsiniestro = '';

          $scope.inactivetagmiprese = true;

          //$scope.inactivetagtutelae = true;

          // $scope.inactivetagctce = true;

          $scope.inactivetagsiniestroe = true;

          // if ($scope.regimenafitabIV == 'C') {

          $scope.inactimiprestab4 = !$scope.inactimiprestab4;

          // } else {

          // $scope.inactimiprestab4 = true;

          // }

          $scope.activetipotabIV = !$scope.activetipotabIV;

          // } else {

          //   $scope.activetipotabIV = true;

          // }

          break;

        case 'mipres':

          if ($scope.solicitud.mipres == true) {

            swal({

              title: 'Ingrese el codigo mipres',

              input: 'number',

              inputValue: 1,

              inputAttributes: {

                min: 1,

                max: 50

              },

              showCancelButton: true

            }).then(function (result) {

              if (result > 0) {

                //$scope.solicitud.valormipres = result;

                $scope.inactivetagmipres = false;
                ///Busqueda
                $scope.regimen_caracter = $scope.regimenafitabI
                $scope.numero_prescripcion = result;
                $scope.buscarprescripcion();
                //$scope.solicitud.valormipres = $scope.numero_prescripcion;
              } else {

                $scope.inactivetagmipres = true;

                $scope.solicitud.valormipres = '';

                $scope.solicitud.mipres = false;

              }

              $scope.$apply();

            }, function (dismiss) {

              $scope.inactivetagmipres = true;

              $scope.solicitud.valormipres = '';

              $scope.solicitud.mipres = false;

              $scope.$apply();

            });

          } else {

            $scope.inactivetagmipres = true;

            $scope.solicitud.valormipres = '';

            $scope.solicitud.mipres = false;

            $scope.$apply();

          }

          break;

        case 'miprese':

          if ($scope.autedit.mipres == true) {

            swal({

              title: 'Ingrese el codigo mipres',

              input: 'number',

              inputValue: 1,

              inputAttributes: {

                min: 1,

                max: 50

              },

              showCancelButton: true

            }).then(function (result) {

              setTimeout(() => {

                if (result > 0) {
                  ///Busqueda
                  $scope.regimen_caracter = $scope.regimenafitabIV
                  $scope.numero_prescripcion = result;
                  //$scope.autedit.valormipres = $scope.numero_prescripcion;
                  $scope.buscarprescripcion();
                } else {

                  $scope.inactivetagmipres = true;

                  $scope.autedit.mipres = false;

                  $scope.autedit.valormipres = '';

                }

                $scope.$apply();

              }, 100);

            }, function (dismiss) {

              $scope.inactivetagmipres = true;


              $scope.autedit.mipres = false;

              $scope.$apply();

            });

          } else {

            setTimeout(() => {

              $scope.inactivetagmipres = true;


              $scope.autedit.mipres = false;

              $scope.autedit.valormipres = '';

              $scope.$apply();

            }, 100);



          }

          break;

        case 'ctc':

          if ($scope.solicitud.ctc == true) {

            $scope.solicitud.tutela = false;

            $scope.solicitud.valortutela = '';

            swal({

              title: 'Ingrese el codigo de ctc',

              input: 'text',

              showCancelButton: true

            }).then(function (result) {

              if (result) {

                $scope.solicitud.valorctc = result;

                $scope.inactivetagctc = false;

                $scope.inactivetagtutela = true;

              } else {

                swal('Importante', 'Debe ingresar un valor', 'info');

                $scope.inactivetagctc = true;

                $scope.solicitud.valorctc = '';

                $scope.solicitud.ctc = false;

              }

              $scope.$apply();

            }, function (dismiss) {

              $scope.inactivetagctc = true;

              $scope.solicitud.valorctc = '';

              $scope.solicitud.ctc = false;

              $scope.$apply();

            });

          } else {

            $scope.solicitud.valorctc = '';

            $scope.inactivetagctc = true;

            $scope.$apply();

          }

          break;

        case 'ctce':

          if ($scope.autedit.ctc == true) {

            $scope.autedit.tutela = false;

            $scope.autedit.valortutela = '';

            swal({

              title: 'Ingrese el codigo de ctc',

              input: 'text',

              showCancelButton: true

            }).then(function (result) {

              if (result) {
                $scope.autedit.valorctc = result;

                $scope.inactivetagctc = false;

                $scope.inactivetagtutela = true;

              } else {

                swal('Importante', 'Debe ingresar un valor', 'info');

                $scope.inactivetagctc = true;

                $scope.autedit.ctc = false;

              }

              $scope.$apply();

            }, function (dismiss) {

              $scope.inactivetagctc = true;

              $scope.autedit.ctc = false;

              $scope.$apply();

            });

          } else {

            $scope.inactivetagctc = true;

            $scope.$apply();

          }

          break;

        case 'tutela':

          $scope.solicitud.ctc = false;

          $scope.solicitud.valorctc = '';

          $scope.inactivetagctc = true;

          if ($scope.solicitud.tutela == true) {

            $http({

              method: 'POST',

              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",

              data: { function: 'obtenerTutelas', tipodocumento: tipodocumento, documento: documento }

            }).then(function (response) {

              $scope.listTutelas = [];

              $scope.listTutelas = response.data;

              if ($scope.listTutelas[0].Codigo != '0') {

                $scope.inactivetagtutela = false;

                $scope.tutelaParam = 'tutela';

                $("#modaltutelas").modal("open");

              } else {

                $scope.solicitud.tutela = false;

                swal({ title: "Completado", text: 'Afiliado no tiene tutelas.', type: "info" });

              }

            })

          } else {

            $scope.solicitud.valortutela = '';

            $scope.solicitud.valortutelatemp = '';

            $scope.inactivetagtutela = true;

          }

          break;

        case 'tutelae':

          $scope.autedit.ctc = false;

          $scope.autedit.valorctc = '';

          $scope.inactivetagctc = true;

          if ($scope.autedit.tutela == true) {

            $http({

              method: 'POST',

              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",

              data: { function: 'obtenerTutelas', tipodocumento: tipodocumento, documento: documento }

            }).then(function (response) {

              $scope.listTutelas = [];

              $scope.listTutelas = response.data;

              if ($scope.listTutelas["0"].Codigo != '0') {

                $scope.inactivetagtutela = false;

                $scope.tutelaParam = 'tutelae';

                $("#modaltutelas").modal("open");

              } else {

                $scope.autedit.tutela = false;

                swal({ title: "Completado", text: 'Afiliado no tiene tutelas.', type: "info" });

              }

            })

          } else {

            $scope.autedit.valortutela = '';

            $scope.inactivetagtutela = true;

          }

          break;

        case 'siniestro':

          if ($scope.solicitud.siniestro == true) {

            $http({

              method: 'POST',

              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",

              data: { function: 'obtenerSiniestro', tipodocumento: tipodocumento, documento: documento }

            }).then(function (response) {
              $scope.listSiniestros = [];
              $scope.listSiniestros = response.data;
              if ($scope.listSiniestros["0"].Codigo != '0') {
                $scope.siniestroParam = 'siniestro';
                $("#modalsiniestro").modal("open");
              } else {
                $scope.solicitud.siniestro = false;
                swal({ title: "Completado", text: 'Afiliado no tiene enfermedad de alto costo', type: "info" });
              }

            })

          } else {

            $scope.solicitud.valorsiniestro = '';

            $scope.inactivetagsiniestro = true;

          }

          break;

        case 'siniestroe':

          if ($scope.autedit.siniestro == true) {

            $http({

              method: 'POST',

              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",

              data: { function: 'obtenerSiniestro', tipodocumento: tipodocumento, documento: documento }

            }).then(function (response) {

              $scope.listSiniestros = [];

              $scope.listSiniestros = response.data;

              if ($scope.listSiniestros["0"].Codigo != '0') {

                $scope.siniestroParam = 'siniestroe';

                $("#modalsiniestro").modal("open");

              } else {

                $scope.autedit.siniestro = false;

                swal({ title: "Completado", text: 'Afiliado no tiene enfermedad de alto costo', type: "info" });

              }

            })

          } else {

            $scope.autedit.valorsiniestro = '';

            $scope.inactivetagsiniestro = true;

          }

          break;

        case 'anticipo':



          break;

        case 'prioridad':



          break;

        case 'anular':

          if ($scope.solicitud.aut == true) {

            //if ($scope.solicitud.ipsasignada == '') {
            //  swal({ title: "No Completado", text: 'Ips asignada no puede estar vacia!', type: "info" });
            //  } else {
            $http({
              method: 'POST',
              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
              data: { function: 'obtener_aut_anuladas', tipodocumento: tipodocumento, documento: documento, nit: $scope.solicitud.ipscodasignada }
            }).then(function (response) {
              if (response.data.length == 0) {
                swal({ title: "Completado", text: 'Afiliado no tiene Autorizaciones Anuladas!', type: "info" });
                $scope.solicitud.aut = false;
              } else {
                $scope.listAut = [];
                $scope.listAut = response.data;
                //$("#modaltraxanular").modal("open");
                $scope.openmodals('anular', 1);
              }

            })
            //}
          } else {
            if ($scope.tipoaut == '1') {
              $scope.solicitud.codaut = null;
              $scope.solicitud.aut = false;
            }


          }
          if ($scope.autedit.aut == true) {

            //if ($scope.autedit.ipsasignada == '') {
            // swal({ title: "No Completado", text: 'Ips asignada no puede estar vacia!', type: "info" });
            //  } else {
            $http({
              method: 'POST',
              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
              data: { function: 'obtener_aut_anuladas', tipodocumento: tipodocumento, documento: documento, nit: $scope.autedit.ipscodasignada }
            }).then(function (response) {
              if (response.data.length == 0) {
                swal({ title: "Completado", text: 'Afiliado no tiene Autorizaciones Anuladas!', type: "info" });
                $scope.autedit.aut = false;
              } else {
                $scope.listAut = [];
                $scope.listAut = response.data;
                // $("#modaltraxanular").modal("open");
                $scope.openmodals('anular', 4);
              }

            })
            // }
          } else {
            if ($scope.tipoaut == '4') {
              $scope.autedit.codaut = null;
              $scope.autedit.aut = false;
            }


          }

          break;
        case 'autsoporte':
          $scope.afiliadoautsoportes = {
            NombreCompleto: "",
            Numero: "",
            Ubicacion: ""
          }
          if ($scope.solicitud.autsoporte == true) {
            $scope.afiliadoautsoportes.NombreCompleto = $scope.infoafiliadoaut.NombreCompleto;

            //if ($scope.solicitud.ipsasignada == '') {
            //  swal({ title: "No Completado", text: 'Ips asignada no puede estar vacia!', type: "info" });
            //  } else {
            $http({
              method: 'POST',
              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
              data: { function: 'p_lista_autorizaciones_adjunto', tipodocumento: tipodocumento, documento: documento, nit: $scope.solicitud.ipscodasignada }
            }).then(function (response) {
              if (response.data.length == 0) {
                swal({ title: "Completado", text: 'Afiliado no tiene Autorizaciones para mostrar! ', type: "info" });
                $scope.solicitud.aut = false;
              } else {
                $scope.listAut = [];
                $scope.listAut = response.data;
                //$("#modaltraxanular").modal("open");
                $scope.openmodals('autsoporte', 1);
              }

            })
            //}
          } else {
            if ($scope.tipoaut == '1') {
              $scope.solicitud.codaut = null;
              $scope.solicitud.aut = false;
              $scope.adjuntotabI = "";
              $scope.ftptabI = "";
            }


          }
          if ($scope.autedit.autsoporte == true) {
            $scope.afiliadoautsoportes.NombreCompleto = $scope.infoafiliadoautedit.NombreCompleto;
            //if ($scope.autedit.ipsasignada == '') {
            // swal({ title: "No Completado", text: 'Ips asignada no puede estar vacia!', type: "info" });
            //  } else {
            $http({
              method: 'POST',
              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
              data: { function: 'p_lista_autorizaciones_adjunto', tipodocumento: tipodocumento, documento: documento, nit: $scope.autedit.ipscodasignada }
            }).then(function (response) {
              if (response.data.length == 0) {
                swal({ title: "Completado", text: 'Afiliado no tiene Autorizaciones para mostrar !', type: "info" });
                $scope.autedit.aut = false;
              } else {
                $scope.listAut = [];
                $scope.listAut = response.data;
                // $("#modaltraxanular").modal("open");
                $scope.openmodals('autsoporte', 4);
              }

            })
            // }
          } else {
            if ($scope.tipoaut == '4') {
              $scope.autedit.codaut = null;
              $scope.autedit.aut = false;
              $scope.v_encabezado.ADJUNTO = "";
              $scope.v_encabezado.FTP = "";
            }


          }

          break;

        default:

      }

    }



    $scope.selecionarTutela = function (numero, ubi, acta) {

      if ($scope.tutelaParam == 'tutela') {

        $scope.solicitud.valortutelatemp = numero + ' - ' + ubi;

        $scope.solicitud.valortutela = numero;
        $scope.solicitud.fecha_acta = acta;

        $scope.inactivetagctc = true;

        $scope.inactivetagtutela = false;

      }



      if ($scope.tutelaParam == 'tutelae') {

        $scope.autedit.valortutelatemp = numero + ' - ' + ubi;

        $scope.autedit.valortutela = numero;
        $scope.autedit.fecha_acta = acta;

        $scope.inactivetagctc = true;

        $scope.inactivetagtutela = false;

      }



      $("#modaltutelas").modal("close");

    }

    $scope.selecionarSiniestro = function (numero) {



      if ($scope.siniestroParam == 'siniestro') {

        $scope.solicitud.valorsiniestro = numero;

        $scope.solicitud.valorsiniestrotemp = numero;

        $scope.inactivetagsiniestro = false;

      }

      if ($scope.siniestroParam == 'siniestroe') {

        $scope.autedit.valorsiniestro = numero;

        $scope.autedit.valorsiniestrotemp = numero;

        $scope.inactivetagsiniestro = false;

      }



      $("#modalsiniestro").modal("close");

    }

    $scope.verPrint = true;

    $scope.finalizartabI = function (text) {
      swal({
        title: 'Confirmar',
        text: text,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result) {
          if ($scope.data.requiredFile == true) {
            swal({ title: "Importante", text: 'Verificar extesion y/o perso del adjunto!', type: "info" });
          } else {
            $scope.solicitud.fechasolicitudparseada = formatDate($scope.solicitud.fechasolicitud);
            if ($scope.solicitud.nopos == true) {
              $scope.solicitud.valornopos = 'N';
              if ($scope.solicitud.tutela == true && $scope.solicitud.ctc == false) {
                $scope.solicitud.valortipo = 'T';
              } else {
                $scope.solicitud.valortipo = 'C';
              }
            } else {
              $scope.solicitud.valortipo = '';
              $scope.solicitud.valornopos = 'P';
            }

            if ($scope.solicitud.anticipo == true) {
              $scope.solicitud.valoranticipo = 'S';
            } else {
              $scope.solicitud.valoranticipo = 'N';
            }

            if ($scope.solicitud.prioridad == true) {
              $scope.solicitud.valorprioridad = 'S';
            } else {
              $scope.solicitud.valorprioridad = 'N';
            }
            if ($scope.solicitud.siniestro == true) {
              $scope.solicitud.altocosto = 'S';
            } else {
              $scope.solicitud.altocosto = 'N';
            }
            if ($scope.solicitud.mipres == false) {
              $scope.solicitud.valormipres = 0;
            }
            $scope.solicitud.accion = 'I'
            $scope.solicitud.numero = 0;
            $scope.solicitud.ubicacion = sessionStorage.getItem('municipio');

            $scope.solicitud.ip = $scope.ip

            if ($scope.solicitud.ext) {
              $scope.solicitud.ftp = 3;
            } else {
              $scope.solicitud.ftp = null;
            }
            var data = JSON.stringify($scope.solicitud);
            console.log(data);
            swal({ title: 'Procesando...' });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
              data: { function: 'insertarAutorizacion', autorizacion: data }
            }).then(function (response) {
              $scope.respuesta = response.data;
              if ($scope.respuesta.Codigo == '0') {
                $scope.ubicacionPrint = response.data.Ubicacion;
                if ($scope.productosagregadostabI.length > 0) {
                  var dataproductos = JSON.stringify($scope.productosagregadostabI);
                  $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                    data: { function: 'insertarDetalleAut', productos: dataproductos, cantidad: $scope.productosagregadostabI.length, numero: $scope.respuesta.Numero, ubicacion: $scope.respuesta.Ubicacion }
                  }).then(function (response) {
                    if (response.data.Codigo == '0') {
                      $scope.numautprocesada = response.data.Numero;
                      $scope.estadoaut = response.data.Estado;
                      $scope.claseEstadoaut = response.data.Clase;
                      $scope.mensajeaut = response.data.Nombre;
                      $scope.verPrint = response.data.Print;
                      $("#btn-finalizartabI").removeClass("grey");
                      $scope.invproductotabI = true;
                      $scope.invfinalizartabI = false;
                      $scope.titletabI = 'Finalizar';
                      $scope.selectContratoTabI = null;
                      $scope.insertraza({ numero: $scope.respuesta.Numero, ubicacion: $scope.respuesta.Ubicacion });
                      if ($scope.solicitud.ext) {
                        $http({
                          method: 'POST',
                          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                          data: {
                            function: 'subirArchivoAut', file: $scope.solicitud.file,
                            ext: $scope.solicitud.ext,
                            num: $scope.numautprocesada,
                            ubicacion: $scope.respuesta.Ubicacion,
                            namefile: $scope.solicitud.namefile
                          }
                        }).then(function (response) {
                          console.log({ 'ARCHIVO': response.data });
                          $scope.subirAdjunto(JSON.stringify({ 'ARCHIVO': response.data }));
                        })
                      }

                      if ($scope.solicitud.autsoporte == true) {
                        $scope.subirAdjunto(JSON.stringify({ 'ARCHIVO': $scope.adjuntotabI }));
                      }

                      $http({
                        method: 'POST',
                        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                        data: { function: 'insertarAutorizacionEntregas', autorizacion: JSON.stringify($scope.solicitud), productos: dataproductos, cantidad: $scope.productosagregadostabI.length }
                      }).then(function (response) {
                        console.log(response.data);

                      })

                      swal.close();
                    } else {
                      swal.close();
                      swal({ title: "Importante", text: response.data.Nombre, type: "info" });
                    }
                  })
                } else {
                  $("#btn-finalizartabI").removeClass("grey");
                  $scope.invproductotabI = true;
                  $scope.invfinalizartabI = false;
                  $scope.titletabI = 'Finalizar';
                  swal.close();
                }
              } else if ($scope.respuesta.Codigo == '1') {
                //error al crear el cabeza
                swal.close();
                swal({ title: "Importante", text: response.data.Nombre, type: "info" });
              } else if ($scope.respuesta.Codigo == '3') {
                swal({
                  title: "Genesis",
                  type: "info",
                  text: $scope.respuesta.Nombre,
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

            })
          }
        }

      })
    }




    $scope.valcantidad = false;

    $scope.finalizartabIV = function (text) {
      if ($scope.productosagregadostabIV.length == 0) {
        swal({ title: "Importante", text: "Por favor verificar que existan productos en la Autorización!", type: "info" });
      } else {
        swal({
          title: 'Confirmar',
          text: text,
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            $scope.autedit.fechasolicitudparseada = formatDate($scope.autedit.fechasolicitud);
            if ($scope.autedit.nopos == true) {
              $scope.autedit.valornopos = 'N';
              if ($scope.autedit.tutela == true && $scope.autedit.ctc == false) {
                $scope.autedit.valortipo = 'T';
              } else {
                $scope.autedit.valortipo = 'C';
              }
            } else {
              $scope.autedit.valortipo = '';
              $scope.autedit.valornopos = 'P';
            }
            if ($scope.autedit.anticipo == true) {
              $scope.autedit.valoranticipo = 'S';
            } else {
              $scope.autedit.valoranticipo = 'N';
            }
            if ($scope.autedit.prioridad == true) {
              $scope.autedit.valorprioridad = 'S';
            } else {
              $scope.autedit.valorprioridad = 'N';
            }
            if ($scope.autedit.siniestro == true) {
              $scope.autedit.altocosto = 'S';
            } else {
              $scope.autedit.altocosto = 'N';
            }
            if ($scope.autedit.mipres == false) {
              $scope.autedit.valormipres = 0;
            }

            for (let index = 0; index < $scope.productosagregadostabIV.length; index++) {
              if ($scope.productosagregadostabIV[index].CANTIDADN == 0) {
                $scope.valcantidad = true;
              }

            }

            if ($scope.valcantidad == true) {
              swal('Importante', 'La cantidad de productos no puede estar vacia', 'info');
            } else {
              $scope.autedit.ip = $scope.ip;
              if ($scope.autedit.ext) {
                $scope.autedit.ftp = 3;
              } else {
                $scope.autedit.ftp = null;
              }
              var data = JSON.stringify($scope.autedit);
              swal({ title: 'Procesando...' });
              swal.showLoading();
              $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: { function: 'insertarAutorizacion', autorizacion: data }
              }).then(function (response) {
                $scope.respuesta = response.data;
                if ($scope.respuesta.Codigo == '0') {
                  if ($scope.productosagregadostabIV.length > 0) {
                    $scope.dataproductosfre = JSON.stringify($scope.productosagregadostabIV);
                    $http({
                      method: 'POST',
                      url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                      data: { function: 'insertarDetalleAut', productos: $scope.dataproductosfre, cantidad: $scope.productosagregadostabIV.length, numero: $scope.respuesta.Numero, ubicacion: $scope.respuesta.Ubicacion }
                    }).then(function (response) {
                      $scope.resfrecuencia = {};
                      $scope.resfrecuencia = response.data;
                      if (response.data.Codigo == '0') {
                        $scope.numautprocesadaIV = response.data.Numero;
                        $scope.numautprocesada = response.data.Numero;
                        $scope.ubicacionPrint = $scope.respuesta.Ubicacion;
                        $scope.numautprocesada = response.data.Numero;
                        $scope.estadoautIV = response.data.Estado;
                        $scope.claseEstadoautIV = response.data.Clase;
                        $scope.mensajeautIV = response.data.Mensaje;
                        $scope.verPrintIV = response.data.Print;
                        // $("#btn-finalizartabIV").removeClass("grey");
                        $scope.invproductotabIV = true;
                        $scope.invfinalizartabIV = false;
                        $scope.titletabIV = 'Finalizar';
                        $scope.selectContratoTabIV = null;
                        $scope.insertraza({ numero: $scope.respuesta.Numero, ubicacion: $scope.respuesta.Ubicacion });
                        if ($scope.autedit.cod_adjunto && $scope.autedit.file) {
                          $http({
                            method: 'POST',
                            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                            data: {
                              function: 'subirArchivoAut', file: $scope.autedit.file,
                              ext: $scope.autedit.ext,
                              num: $scope.numautprocesada,
                              ubicacion: $scope.respuesta.Ubicacion,
                              namefile: $scope.autedit.namefile
                            }
                          }).then(function (response) {
                            console.log({ 'ARCHIVO': response.data });
                            $scope.subirAdjuntoUpdate(response.data);
                          })
                        }
                        if (($scope.autedit.cod_adjunto == null || $scope.autedit.cod_adjunto == '') && $scope.autedit.ext) {
                          if ($scope.autedit.ext) {
                            $http({
                              method: 'POST',
                              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                              data: {
                                function: 'subirArchivoAut', file: $scope.autedit.file,
                                ext: $scope.autedit.ext,
                                num: $scope.numautprocesada,
                                ubicacion: $scope.respuesta.Ubicacion,
                                namefile: $scope.autedit.namefile
                              }
                            }).then(function (response) {
                              console.log({ 'ARCHIVO': response.data });
                              $scope.subirAdjunto(JSON.stringify({ 'ARCHIVO': response.data }));
                            })
                          }
                        }

                        if ($scope.autedit.autsoporte == true) {
                          $scope.subirAdjunto(JSON.stringify({ 'ARCHIVO': $scope.v_encabezado.ADJUNTO }));
                        }

                        $http({
                          method: 'POST',
                          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                          data: { function: 'insertarAutorizacionEntregas', autorizacion: JSON.stringify($scope.autedit), productos: $scope.dataproductosfre, cantidad: $scope.productosagregadostabIV.length }
                        }).then(function (response) {
                          console.log(response.data);

                        })
                        swal.close();
                      } else if (response.data.Codigo == '4') {
                        swal.close();
                        $scope.mensajefrecuencia = response.data.Nombre;
                        $scope.openmodals('modalevantarctrlfrecuencia', 'E');
                      } else {
                        swal.close();
                        swal({ title: "Importante", text: response.data.Nombre, type: "info" });
                      }
                    })
                  } else {
                    $("#btn-finalizartabI").removeClass("grey");
                    $scope.invproductotabI = true;
                    $scope.invfinalizartabI = false;
                    $scope.titletabI = 'Finalizar';
                    swal.close();
                  }
                } else if ($scope.respuesta.Codigo == '1') {
                  //error al crear el cabeza
                  swal.close();
                  swal({ title: "Importante", text: response.data.Nombre, type: "info" });
                } else if ($scope.respuesta.Codigo == '3') {
                  swal({
                    title: titulo,
                    type: tipo,
                    text: response.data.Nombre,
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
              })
            }
          }
        })
      }
    }
    $scope.subirAdjunto = function (vfile) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: {
          function: 'insertarAdjunto',
          file: vfile,
          num: $scope.numautprocesada,
          ubicacion: $scope.respuesta.Ubicacion,
          cantidad: 1
        }
      }).then(function (response) {
        console.log(response.data);
      })
    }

    $scope.subirAdjuntoUpdate = function (vfile) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: {
          function: 'acualizarAdjunto',
          codadjunto: $scope.autedit.cod_adjunto,
          ruta: vfile,
          num: $scope.numautprocesada,
          ubicacion: $scope.respuesta.Ubicacion,

        }
      }).then(function (response) {
        console.log(response.data);
      })
    }


    $scope.subirAdjuntopro = function (vfile) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: {
          function: 'insertarAdjuntoPro',
          file: vfile,
          num: $scope.numautprocesada,
          ubicacion: $scope.respuesta.Ubicacion,
          cantidad: 1
        }
      }).then(function (response) {
        console.log(response.data);
      })
    }



    $scope.validatext = "Complete los campos requeridos (*)";
    $scope.validatextab4 = "Complete los campos requeridos (*)";
    $scope.validartabI = function (tipo) {
      $scope.pasarsolicitudaut = true;
      $scope.pasarproductoaut = true;
      switch (tipo) {
        case 'solicitud':
          if ($scope.solicitud.diagnom1 == '' || $scope.solicitud.diagnom1 == undefined) { $scope.validatext = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if (!$scope.solicitud.fechasolicitud || $scope.solicitud.fechasolicitud == undefined) { $scope.validatext = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.ipssolicita == '' || $scope.solicitud.ipssolicita == undefined) { $scope.validatext = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.ipsasignada == '' || $scope.solicitud.ipsasignada == undefined) { $scope.validatext = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.ipscodsolicita == '' || $scope.solicitud.ipscodsolicita == undefined) { $scope.validatext = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.ipscodasignada == '' || $scope.solicitud.ipscodasignada == undefined) { $scope.validatext = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.servicio == '' || $scope.solicitud.servicio == undefined) { $scope.validatext = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.contrato == '' || $scope.solicitud.contrato == undefined) { $scope.validatext = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.origen == '' || $scope.solicitud.origen == undefined) { $scope.validatext = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.tiposervicio == '' || $scope.solicitud.tiposervicio == undefined) { $scope.validatext = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.ubicacionpaciente == '' || $scope.solicitud.ubicacionpaciente == undefined) { $scope.validatext = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.nopos == true) {
            if ($scope.solicitud.valortutela) {

            } else {
              if ($scope.solicitud.valormipres == '') {
                $scope.validatext = "Complete los campos requeridos (*)";
                $scope.pasarsolicitudaut = false;
              }
            }

          }
          if ($scope.solicitud.nombremedico == '' || $scope.solicitud.nombremedico == undefined) {
            $scope.validatext = "Complete los campos requeridos (*)";
            $scope.pasarsolicitudaut = false;
          }
          if ($scope.solicitud.especialidadmedico == '' || $scope.solicitud.especialidadmedico == undefined) {
            $scope.validatext = "Complete los campos requeridos (*)";
            $scope.pasarsolicitudaut = false;
          }

          if ($scope.solicitud.control == true) {
            if ($scope.solicitud.anopass == '' || $scope.solicitud.mespess == '') {
              $scope.validatext = "Complete los campos requeridos (*)";
              $scope.pasarsolicitudaut = false;
            }

          }

          if ($scope.data.requiredFile == true) {
            swal({ title: "No Completado", text: $scope.data.formato, showConfirmButton: true, type: "warning" });
            $scope.pasarsolicitudaut = false;
          }

          if ($scope.solicitud.aut == true) {
            if (($scope.solicitud.codaut == '' || $scope.solicitud.codaut == null) && ($scope.solicitud.ubiaut == '' || $scope.solicitud.ubiaut == null)) {
              $scope.validatext = "Complete los campos requeridos (*)";
              $scope.pasarsolicitudaut = false;
            }
          }

          if ($scope.solicitud.autsoporte == true) {
            if (($scope.adjuntotabI == '' || $scope.adjuntotabI == null)) {
              $scope.validatext = "Debe selecionar una autorización.";
              $scope.pasarsolicitudaut = false;
            }
          }

          var dif = $scope.fechactual - $scope.solicitud.fechasolicitud;
          var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
          /*if ($scope.solicitud.fechasolicitud) {
            if (dias>90) {
              $scope.validatext= "Fecha de la orden no puede ser mayor a 90 dias";
              $scope.pasarsolicitudaut = false;            
            }
          }*/

          break;
        case 'producto':
          //if($scope.productosagregadostabI.length == 0 || $scope.productosagregadostabI == undefined){$scope.pasarproductoaut = false;}
          break;
        case 'autorizacion':
          if ($scope.autedit.diagnom1 == '' || $scope.autedit.diagnom1 == undefined) { $scope.validatextab4 = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.autedit.ipssolicita == '' || $scope.autedit.ipssolicita == undefined) { $scope.validatextab4 = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.autedit.ipsasignada == '' || $scope.autedit.ipsasignada == undefined) { $scope.validatextab4 = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.autedit.ipscodsolicita == '' || $scope.autedit.ipscodsolicita == undefined) { $scope.validatextab4 = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.autedit.ipscodasignada == '' || $scope.autedit.ipscodasignada == undefined) { $scope.validatextab4 = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.autedit.servicio == '' || $scope.autedit.servicio == undefined) { $scope.validatextab4 = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.autedit.contrato == '' || $scope.autedit.contrato == undefined) { $scope.validatextab4 = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.autedit.origen == '' || $scope.autedit.origen == undefined) { $scope.validatextab4 = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.autedit.tiposervicio == '' || $scope.autedit.tiposervicio == undefined) { $scope.validatextab4 = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.autedit.ubicacionpaciente == '' || $scope.autedit.ubicacionpaciente == undefined) { $scope.validatextab4 = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.autedit.nombremedico == '' || $scope.autedit.nombremedico == undefined) { $scope.validatextab4 = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.autedit.especialidadmedico == '' || $scope.autedit.especialidadmedico == '-' || $scope.autedit.especialidadmedico == undefined) { $scope.validatextab4 = "Complete los campos requeridos (*)"; $scope.pasarsolicitudaut = false; }
          if ($scope.autedit.control == true) {
            if ($scope.autedit.anopass == '' || $scope.autedit.mespess == '') {
              $scope.validatextab4 = "Complete los campos requeridos (*)";
              $scope.pasarsolicitudaut = false;
            }

          }
          //if ($scope.autedit.nopos == true) {
          // if ($scope.autedit.valormipres == '') {
          /// $scope.validatextab4 ="Complete los campos requeridos (*)";
          //$scope.pasarsolicitudaut = false;
          //}
          //}
          if ($scope.autedit.nopos == true) {
            if ($scope.autedit.valortutela) {

            } else {
              if ($scope.autedit.valormipres == '') {
                $scope.validatextab4 = "Complete los campos requeridos (*)";
                $scope.pasarsolicitudaut = false;
              }
            }

          }

          if ($scope.dataIV.requiredFile == true) {
            swal({ title: "No Completado", text: $scope.dataIV.formato, showConfirmButton: true, type: "warning" });
            $scope.pasarsolicitudaut = false;
          }
          if ($scope.autedit.aut == true) {
            if (($scope.autedit.codaut == '' || $scope.autedit.codaut == null) && ($scope.autedit.ubiaut == '' || $scope.autedit.ubiaut == null)) {
              $scope.validatextab4 = "Complete los campos requeridos (*)";
              $scope.pasarsolicitudaut = false;
            }
          }

          if ($scope.autedit.autsoporte == true) {
            if (($scope.v_encabezado.ADJUNTO == '' || $scope.v_encabezado.ADJUNTO == null)) {
              $scope.validatextab4 = "Debe selecionar una autorización.";
              $scope.pasarsolicitudaut = false;
            }
          }
          var dif = $scope.fechactual - $scope.autedit.fechasolicitud;
          var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
          /*if ($scope.autedit.fechasolicitud) {
            if (dias>90) {
              $scope.validatext= "Fecha de la orden no puede ser mayor a 90 dias";
              $scope.pasarsolicitudaut = false;            
            }
          }   */
          break;
        default:
      }
    }

    $scope.sumPrint = 0;
    $scope.printAut = function (tab) {
      setTimeout(() => {
        // if (tab == '1') {
        $scope.sumPrint = $scope.sumPrint + 1;
        // }        
        if ($scope.sumPrint > 3) {
          swal({ title: "No Completado", text: 'No se puede imprimir la autorización mas de 3 veces!', showConfirmButton: true, type: "warning" });
        } else {
          window.open('views/autorizaciones/formatoautorizacionPrint.php?numero=' + $scope.numautprocesada + '&ubicacion=' + $scope.ubicacionPrint, '_blank');
        }
      }, 100);
    }

    // Funciones TABII
    $scope.textvalidate = "Complete los campos requeridos (*)";
    $scope.pasostabII = function (op) {
      switch (op) {
        case '1':
          $("#btn-solicitudtabII").removeClass("grey");
          $scope.invsolicitudtabII = false;
          $scope.titletabI = 'Solicitud';
          break;
        case '-1':
          $("#btn-productotabII").addClass("grey");
          $scope.invsolicitudtabII = false;
          $scope.titletabII = 'Solicitud';
          $scope.invproductotabII = true;
          break;
        case '2':
          $scope.validartabII('solicitud');
          if ($scope.pasarsolicitudautprog == true) {
            $("#btn-productotabII").removeClass("grey");
            $scope.invsolicitudtabII = true;
            $scope.invproductotabII = false;
            $scope.titletabII = 'Producto';
          } else {
            swal('Importante', $scope.textvalidate, 'info')
          }
          break;
        case '-2':
          $("#btn-finalizartabII").addClass("grey");
          $scope.invproductotabII = false;
          $scope.titletabII = 'Producto';
          $scope.invfinalizartabII = true;
          break;
        case '3':
          $scope.validartabII('producto');
          if ($scope.pasarproductoautprog == true) {
            $("#btn-finalizartabII").removeClass("grey");
            $scope.invproductotabII = true;
            $scope.invfinalizartabII = false;
            $scope.titletabII = 'Finalizar';
            break;
          } else {
            swal('Importante', 'Debe agregar un producto', 'info')
          }
        default:
      }
    }

    $scope.pasostabII('1');
    $scope.finalizartabII = function () {
      swal({
        title: 'Confirmar',
        text: "Finalizar autorizacion programada",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result) {
          $scope.validartabII('datosafiliado');
          if ($scope.pasardatosafiliadoprog == true) {
            $scope.solicitudpro.ubicacion = sessionStorage.getItem('municipio');
            $scope.solicitudpro.fecsolicitudparseada = formatDate($scope.solicitudpro.fecsolicitud);
            if ($scope.solicitudpro.ext) {
              $scope.solicitudpro.ftp = 3;
            } else {
              $scope.solicitudpro.ftp = null;
            }
            var data = JSON.stringify($scope.solicitudpro);
            swal({ title: 'Procesando...' });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
              data: { function: 'insertarSolicitudaut', solicitud: data }
            }).then(function (response) {
              $scope.respuesta = response.data;
              if ($scope.respuesta.Codigo == '1') {
                $scope.numautprocesada = $scope.respuesta.Numero;
                var dataproductos = JSON.stringify($scope.productosagregadostabII);
                $http({
                  method: 'POST',
                  url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                  data: { function: 'insertarDetalle', productos: dataproductos, cantidad: $scope.productosagregadostabII.length, numero: $scope.respuesta.Numero, ubicacion: $scope.respuesta.Ubicacion, accion: 'I' }
                }).then(function (response) {
                  swal.close();
                  if (response.data.codigo == '1') {
                    $("#btn-finalizartabI").removeClass("activebtn-step").addClass("donebtn-step");

                    if ($scope.solicitudpro.ext) {
                      $http({
                        method: 'POST',
                        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                        data: {
                          function: 'subirArchivoAutPro', file: $scope.solicitudpro.file,
                          ext: $scope.solicitudpro.ext,
                          num: $scope.numautprocesada,
                          ubicacion: $scope.respuesta.Ubicacion,
                          namefile: $scope.solicitudpro.namefile
                        }
                      }).then(function (response) {
                        console.log({ 'ARCHIVO': response.data });
                        $scope.subirAdjuntopro(JSON.stringify({ 'ARCHIVO': response.data }));
                      })
                    }
                    setTimeout(function () {
                      $scope.limpiar('2');
                      $scope.$apply();
                      swal({ title: "Completado", text: response.data.fecha, type: "success" });
                    }, 500);
                  } else {
                    swal({ title: "Importante", text: "Autorización no registrada", type: "info" });
                  }
                })
                // }).then(function (response) {
                //   swal.close();
                //   if (response.data.codigo == '1') {
                //     $("#btn-finalizartabII").removeClass("activebtn-step").addClass("donebtn-step");
                //     setTimeout(function () {
                //       $scope.limpiar('2');
                //       $scope.$apply();
                //       swal({ title: "Completado", text: response.data.fecha, type: "success", timer: 800 });
                //     }, 500);
                //   } else {
                //     swal({ title: "Importante", text: "Autorización no registrada", type: "info" });
                //   }
                // })
              } else {
                swal({ title: "Importante", text: $scope.respuesta.Nombre, type: "info" });
              }
            })
          } else {
            swal('Importante', $scope.textvalidate, 'info');
          }
        }
      })
    }

    $scope.validartabII = function (tipo) {
      $scope.pasarsolicitudautprog = true;
      $scope.pasarproductoautprog = true;
      $scope.pasardatosafiliadoprog = true;
      switch (tipo) {
        case 'solicitud':
          if ($scope.solicitudpro.diagnom1 == '' || $scope.solicitudpro.diagnom1 == undefined) { $scope.pasarsolicitudautprog = false; }
          if ($scope.solicitudpro.fecsolicitud == '' || $scope.solicitudpro.fecsolicitud == undefined) { $scope.pasarsolicitudautprog = false; }
          if ($scope.solicitudpro.ipssolicitante == '' || $scope.solicitudpro.ipssolicitante == undefined) { $scope.pasarsolicitudautprog = false; }
          if ($scope.solicitudpro.ipsasignada == '' || $scope.solicitudpro.ipsasignada == undefined) { $scope.pasarsolicitudautprog = false; }
          if ($scope.solicitudpro.ipscodsolicitante == '' || $scope.solicitudpro.ipscodsolicitante == undefined) { $scope.pasarsolicitudautprog = false; }
          if ($scope.solicitudpro.ipscodasignada == '' || $scope.solicitudpro.ipscodasignada == undefined) { $scope.pasarsolicitudautprog = false; }
          if ($scope.solicitudpro.servicio == '' || $scope.solicitudpro.servicio == undefined) { $scope.pasarsolicitudautprog = false; }
          if ($scope.solicitudpro.justificacion == '' || $scope.solicitudpro.justificacion == undefined) { $scope.pasarsolicitudautprog = false; }
          if ($scope.datatb2.requiredFile == true) {
            $scope.textvalidate = $scope.solicitudpro.file == null ? 'Soporte de la solicitud no puede estar vacio!' : $scope.datatb2.formato;
            $scope.pasarsolicitudautprog = false;
          }
          break;
        case 'producto':
          if ($scope.productosagregadostabII.length == 0 || $scope.productosagregadostabII == undefined) { $scope.pasarproductoautprog = false; }
          break;
        case 'datosafiliado':
          if ($scope.solicitudpro.celular == '' || $scope.solicitudpro.celular == undefined) { $scope.pasardatosafiliadoprog = false; }
          if ($scope.solicitudpro.direccion == '' || $scope.solicitudpro.direccion == undefined) { $scope.pasardatosafiliadoprog = false; }
          break;
        default:
      }
    }

    // Funciones TABIII

    $scope.inactivepro = true;
    $scope.inactivepro2 = true;
    $scope.findProducto = function (find) {
      if (find != undefined) {
        if (find.length > 4) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: { function: 'BuscarProducto', coincidencia: find }
          }).then(function (response) {
            if (response.data["0"].CODIGO != "0" && response.data["0"].CODIGO != "-1") {
              $scope.listProductos = response.data;
              $scope.inactivepro = false;
              $scope.inactivepro2 = true;
            } else {
              if (find.length == undefined) {
                $scope.inactivepro = true;
                $scope.listProductos = [];
              } else {
                $scope.inactivepro2 = false;
                $scope.mensajenofound = 'No hay coincidencias encontradas';
                $scope.listProductos = [];
              }
            }
            $scope.initPaginacion($scope.listProductos);
          })
        } else {
          $scope.inactivepro = false;
          $scope.inactivepro2 = false;
          $scope.mensajenofound = 'Ingrese una mejor coincidencia';
          $scope.listProductos = [];
          $scope.initPaginacion($scope.listProductos);
        }
      } else {
        $scope.inactivepro = true;
      }
    }

    $scope.initPaginacion = function (info) {
      $scope.listProductosTemp = info;
      $scope.currentPage = 0;
      $scope.pageSize = 10;
      $scope.valmaxpag = 10;
      $scope.pages = [];
      $scope.configPages();
    }

    $scope.filter = function (val) {
      $scope.listProductosTemp = $filter('filter')($scope.listProductos, val);
      $scope.configPages();
    }

    $scope.configPages = function () {
      $scope.pages.length = 0;
      var ini = $scope.currentPage - 4;
      var fin = $scope.currentPage + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil($scope.listProductosTemp.length / $scope.pageSize) > $scope.valmaxpag)
          fin = 10;
        else
          fin = Math.ceil($scope.listProductosTemp.length / $scope.pageSize);
      } else {
        if (ini >= Math.ceil($scope.listProductosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
          ini = Math.ceil($scope.listProductosTemp.length / $scope.pageSize) - $scope.valmaxpag;
          fin = Math.ceil($scope.listProductosTemp.length / $scope.pageSize);
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
      if ($scope.pages.length % 2 == 0) {
        var resul = $scope.pages.length / 2;
      } else {
        var resul = ($scope.pages.length + 1) / 2;
      }

      var i = index - resul;
      if ($scope.listProductosTemp.length % $scope.pageSize == 0) {
        var tamanomax = parseInt($scope.listProductosTemp.length / $scope.pageSize);
      } else {
        var tamanomax = parseInt($scope.listProductosTemp.length / $scope.pageSize) + 1;
      }

      var fin = ($scope.pages.length + i) - 1;
      if (fin > tamanomax) {
        fin = tamanomax;
        i = tamanomax - 10;
      }
      if (index > resul) {
        $scope.calcular(i, fin);
      }
    }

    $scope.paso = function (tipo) {
      if (tipo == 'next') {
        var i = $scope.pages[0].no + 1;
        var fin = $scope.pages[9].no + 1;
        $scope.currentPage = $scope.currentPage + 1;
        if ($scope.listProductosTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.listProductosTemp.length / $scope.pageSize);
        } else {
          var tamanomax = parseInt($scope.listProductosTemp.length / $scope.pageSize) + 1;
        }
        if (fin > tamanomax) {
          fin = tamanomax;
          i = tamanomax - 10;
        }
      } else {
        var i = $scope.pages[0].no - 1;
        var fin = $scope.pages[9].no - 1;
        $scope.currentPage = $scope.currentPage - 1;
        if (i <= 1) {
          i = 1;
          fin = 10;
        }
      }
      $scope.calcular(i, fin);
    }
    $scope.calcular = function (i, fin) {
      $scope.pages = [];
      for (i; i <= fin; i++) {
        $scope.pages.push({
          no: i
        });
      }
    }

    // FUNCIONES TABIV

    $scope.viewdataAut = true;
    $scope.viewdataAutprog = true;
    $scope.verAutorizaciones = true;
    $scope.verAutorizacionesEdit = false;
    $scope.inactivebarraproedit = true;
    $scope.buscarAutorizaciones = function (documento, numero, ubicacion) {
      $scope.check_option_2 = false;
      $scope.switchtable = false;
      $scope.nameaut = 'Normales';
      $scope.autedit.autsoporte = false;
      swal({ title: 'Buscando...' });
      swal.showLoading();
      if ($scope.check_option == true) {
        numero = 0;
        ubicacion = 0;
      } else {
        documento = 0;
      }
      if ($scope.table != undefined) {
        $scope.table.destroy();
        $scope.table = undefined;
      }
      if ($scope.tablepro != undefined) {
        $scope.tablepro.destroy();
        $scope.tablepro = undefined;
      }

      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtenerAutorizaciones', documento: documento, numero: numero, ubicacion: ubicacion }
      }).then(function (response) {
        $scope.verAutorizaciones = false;
        swal.close();
        // if (response.data.ordinaria.length > 0) {
        // $scope.viewdataAut = true;
        $scope.listarAutorizaciones = response.data.ordinaria;
        setTimeout(function () {
          $scope.table = $('#tautorizaciones').DataTable({
            language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
            lengthMenu: [[10, 20, 50, -1], [10, 20, 50, 'Todas']],
            order: [[0, "asc"]]
          });
          $scope.table.draw();

          document.getElementById('tautorizaciones').scrollIntoView({ block: 'start', behavior: 'smooth' });

          // swal.close();
        }, 100);
        // } else {
        // $scope.viewdataAut = false;
        // }

        // if (response.data.programada.length > 0) {
        $scope.listarAutorizacionesprog = response.data.programada;

        setTimeout(function () {
          $scope.tablepro = $('#tautorizacionespro').DataTable({
            language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
            lengthMenu: [[10, 20, 50, -1], [10, 20, 50, 'Todas']],
            order: [[0, "asc"]]
          });
          $scope.tablepro.draw();

          document.getElementById('tautorizacionespro').scrollIntoView({ block: 'start', behavior: 'smooth' });

          // swal.close();
        }, 100);
        // $scope.viewdataAutprog = true;
        // } else {
        // $scope.viewdataAutprog = false;
        // }

      })
    }
    $scope.v_encabezado = null;
    $scope.v_detalle = null;
    $scope.v_encabezadov = null;
    $scope.v_detallev = null;
    /*    $scope.consultarAutorizacion = function (numero, ubicacion, accion) {
          swal({ title: 'Buscando...' });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: { function: 'obtener_Uautorizaciones', numero: numero, ubicacion: ubicacion }
          }).then(function (response) {
            if (accion == 'C') {
              $scope.v_encabezadov = response.data.cabeza;
              $scope.v_detallev = response.data.detalle;
              if ($scope.v_detallev[0].codigo != undefined) {
                $scope.v_detallev = [];
              } else {
                $scope.v_detallev.forEach(element => {
                  $scope.v_detallev = element;
                });
              }
    
              if ($scope.v_encabezadov.ESTADO == 'A') {
                $scope.verPrintDetalle = true;
              } else {
                $scope.verAutorizaciones = false;
                $scope.numautprocesada = $scope.v_encabezadov.NUM_OASIS;
                $scope.ubicacionPrint = $scope.v_encabezadov.UBI_OASIS;
                if ($scope.v_encabezadov.IMPRESION == 'false') {
                  $scope.verPrintDetalle = true;
                }
                if ($scope.v_encabezadov.IMPRESION == 'true') {
                  $scope.verPrintDetalle = false;
                }
              }
            }
            if (accion == 'E') {
              $scope.verAutorizaciones = true;
              $scope.v_encabezado = response.data.cabeza;
              $scope.v_detalle = response.data.detalle[0];
              $scope.productosagregadostabIV = $scope.v_detalle;
              if ($scope.v_detalle && $scope.v_detalle.codigo == undefined) {
                for (let index = 0; index < $scope.productosagregadostabIV.length; index++) {        
                  $scope.productosagregadostabIV[index].CANTIDADN = $scope.productosagregadostabIV[index].CANTIDAD;
                }
              } else {
                $scope.productosagregadostabIV = [];
              }
              $scope.cargarContratoTabI($scope.v_encabezado.NIT_ASIGNADA, $scope.regimentabIV, 'tab4');//faltan parametros.
              setTimeout(() => {
                var ftemp = $scope.v_encabezado.FECHA_ORDEN.split("/");
                console.log($scope.infoafiliadoautedit);
                $scope.obtenerServiciosTabI($scope.v_encabezado.CONTRATO, 'tab4');
                $scope.autedit.numero = $scope.v_encabezado.NUM_OASIS;
                $scope.autedit.ubicacion = $scope.v_encabezado.UBI_OASIS;
                $scope.autedit.tipodocumento = $scope.infoafiliadoautedit.TipoDocumento;
                $scope.autedit.documento = $scope.infoafiliadoautedit.Documento;
                $scope.autedit.diagnom1 = $scope.v_encabezado.DX + ' - ' + $scope.v_encabezado.NOMBRE_DX;
                $scope.autedit.diagnom2 = $scope.v_encabezado.DX1 == 'N' ? '' : $scope.v_encabezado.DX1 + ' - ' + $scope.v_encabezado.NOMBRE_DX1;
                $scope.autedit.diagcod1 = $scope.v_encabezado.DX;
                $scope.autedit.diagcod2 = $scope.v_encabezado.DX1;
                $scope.autedit.ipsasignada = $scope.v_encabezado.ASIGNADA;
                $scope.autedit.ipscodasignada = $scope.v_encabezado.NIT_ASIGNADA;
                $scope.autedit.ipsasignadadireccion = $scope.v_encabezado.COD_DIR; 
                setTimeout(() => {
                  $scope.autedit.contrato = $scope.v_encabezado.CONTRATO;
                },100);      
    
                $scope.autedit.ubicacioncontrato = $scope.v_encabezado.UBICACION_CONTRATO;
                $scope.autedit.documentocontrato = $scope.v_encabezado.CONTRATO;
                $scope.autedit.servicio = $scope.v_encabezado.CLASIFICACION;
                $scope.autedit.codservicio = $scope.v_encabezado.CLASIFICACION;
                $scope.autedit.fechasolicitud = new Date(ftemp[2], (ftemp[1] - 1), ftemp[0]);
                $scope.autedit.fechasolicitudparseada = '';
                $scope.autedit.origen = $scope.v_encabezado.ORIGEN;
                $scope.autedit.tiposervicio = $scope.v_encabezado.TIPO_SERVICIO;
                $scope.autedit.ubicacionpaciente = $scope.v_encabezado.UBICACION_SOL;
                $scope.autedit.ipssolicita = $scope.v_encabezado.SOLICITANTE;
                $scope.autedit.ipscodsolicita = $scope.v_encabezado.NIT_SOLICITANTE;
                $scope.buscarEspecialidades($scope.v_encabezado.NIT_SOLICITANTE);
                $scope.autedit.nombremedico = $scope.v_encabezado.MEDICO;
                $scope.autedit.especialidadmedico = $scope.v_encabezado.ESPECIALIDAD + ' - ' + $scope.v_encabezado.ESPECIALIDAD_MEDICO;
                $scope.autedit.codespecialidad = $scope.v_encabezado.ESPECIALIDAD;
                $scope.autedit.observacion = $scope.v_encabezado.OBSERVACION;
                $scope.autedit.codaut = $scope.v_encabezado.AUTORIZACION_ANTERIOR == 0 ? '' : $scope.v_encabezado.AUTORIZACION_ANTERIOR;
                $scope.autedit.nopos = $scope.v_encabezado.POSS == 'TRUE' ? true : false;
                $scope.autedit.valornopos = '';
                $scope.autedit.valortipo = '';
                $scope.autedit.cod_adjunto = $scope.v_encabezado.COD_ADJUNTO;
    
                $scope.autedit.anopass = $scope.v_encabezado.CONTROLANNO;
                $scope.autedit.mespess = $scope.v_encabezado.CONTROLMES;
    
                if ($scope.autedit.anopass != "" && $scope.autedit.mespess != "") {
                  $scope.autedit.control = true;
                }
                // $scope.autedit.mipres = false;
                setTimeout(() => {
                  $scope.autedit.valormipres = $scope.v_encabezado.MIPRES;
                  if ($scope.autedit.valormipres != 0) {
                    $scope.inactimiprestab4 = false;
                    $scope.autedit.mipres = true;
                  } else {
                    $scope.autedit.mipres = false;
                    $scope.inactimiprestab4 = true;
                  }
                }, 100);
                // $scope.autedit.ctc = $scope.v_encabezado.CTC == 'TRUE' ? true : false;
                // $scope.autedit.valorctc = $scope.v_encabezado.NUM_CTC
                // $scope.autedit.valormipres= $scope.autedit.valorctc;
                $scope.autedit.tutela = $scope.v_encabezado.TUTELA == 'TRUE' ? true : false;
                $scope.autedit.valortutela = $scope.v_encabezado.NUM_TUTELA;
                $scope.autedit.anticipo = $scope.v_encabezado.ANTICIPO == 'TRUE' ? true : false;
                $scope.autedit.valoranticipo = '';
                $scope.autedit.siniestro = $scope.v_encabezado.SINIESTRO == 'TRUE' ? true : false;
                $scope.autedit.valorsiniestro = '';
                $scope.autedit.altocosto = '';
                $scope.autedit.prioridad = $scope.v_encabezado.PRIORIDAD == 'TRUE' ? true : false;
                $scope.autedit.valorprioridad = '';
                $scope.autedit.accion = 'U';
    
    
                $scope.setParametros('noposp', $scope.infoafiliadoautedit.TipoDocumento, $scope.infoafiliadoautedit.Documento);
              }, 100);
    }
    swal.close();
    })
    }*/
    $scope.consultarAutorizacion = function (numero, ubicacion, accion) {
      swal({ title: 'Buscando...' });
      swal.showLoading();
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtener_Uautorizaciones', numero: numero, ubicacion: ubicacion }
      }).then(function (response) {
        console.log(response.data);
        if (accion == 'C') {
          $scope.v_encabezadov = response.data.cabeza;
          $scope.v_detallev = response.data.detalle;
          $scope.totalaut = response.data.total;
          if ($scope.v_detallev.length == 0) {
            $scope.v_detallev = [];
          }

          if ($scope.v_encabezadov.ESTADO == 'A') {
            $scope.verPrintDetalle = true;
          } else {
            $scope.verAutorizaciones = false;
            $scope.numautprocesada = $scope.v_encabezadov.NUM_OASIS;
            $scope.ubicacionPrint = $scope.v_encabezadov.UBI_OASIS;
            if ($scope.v_encabezadov.IMPRESION == 'false') {
              $scope.verPrintDetalle = true;
            }
            if ($scope.v_encabezadov.IMPRESION == 'true') {
              $scope.verPrintDetalle = false;
            }
          }
        }
        if (accion == 'E') {
          $scope.verAutorizaciones = true;
          $scope.v_encabezado = response.data.cabeza;
          $scope.v_detalle = response.data.detalle;
          $scope.productosagregadostabIV = $scope.v_detalle;
          console.log($scope.v_detalle);

          if ($scope.v_detalle.length > 0) {
            for (let index = 0; index < $scope.productosagregadostabIV.length; index++) {
              $scope.productosagregadostabIV[index].CANTIDADN = $scope.productosagregadostabIV[index].CANTIDAD;
            }
          } else {
            $scope.productosagregadostabIV = [];
          }

          console.log($scope.v_detalle);
          $scope.cargarContratoTabI($scope.v_encabezado.NIT_ASIGNADA, $scope.regimentabIV, 'tab4');//faltan parametros.
          setTimeout(() => {
            var ftemp = $scope.v_encabezado.FECHA_ORDEN.split("/");
            console.log($scope.infoafiliadoautedit);
            $scope.obtenerServiciosTabI($scope.v_encabezado.CONTRATO, 'tab4');
            $scope.autedit.numero = $scope.v_encabezado.NUM_OASIS;
            $scope.autedit.ubicacion = $scope.v_encabezado.UBI_OASIS;
            $scope.autedit.tipodocumento = $scope.infoafiliadoautedit.TipoDocumento;
            $scope.autedit.documento = $scope.infoafiliadoautedit.Documento;
            $scope.autedit.diagnom1 = $scope.v_encabezado.DX + ' - ' + $scope.v_encabezado.NOMBRE_DX;
            $scope.autedit.diagnom2 = $scope.v_encabezado.DX1 == 'N' ? '' : $scope.v_encabezado.DX1 + ' - ' + $scope.v_encabezado.NOMBRE_DX1;
            $scope.autedit.diagcod1 = $scope.v_encabezado.DX;
            $scope.autedit.diagcod2 = $scope.v_encabezado.DX1;
            $scope.autedit.ipsasignada = $scope.v_encabezado.ASIGNADA;
            $scope.autedit.ipscodasignada = $scope.v_encabezado.NIT_ASIGNADA;
            $scope.autedit.ipsasignadadireccion = $scope.v_encabezado.COD_DIR;
            setTimeout(() => {
              $scope.autedit.contrato = $scope.v_encabezado.CONTRATO;
            }, 100);

            $scope.autedit.ubicacioncontrato = $scope.v_encabezado.UBICACION_CONTRATO;
            $scope.autedit.documentocontrato = $scope.v_encabezado.CONTRATO;
            $scope.autedit.servicio = $scope.v_encabezado.CLASIFICACION;
            $scope.autedit.codservicio = $scope.v_encabezado.CLASIFICACION;
            $scope.autedit.fechasolicitud = new Date(ftemp[2], (ftemp[1] - 1), ftemp[0]);
            $scope.autedit.fechasolicitudparseada = '';
            $scope.autedit.origen = $scope.v_encabezado.ORIGEN;
            $scope.autedit.tiposervicio = $scope.v_encabezado.TIPO_SERVICIO;
            $scope.autedit.ubicacionpaciente = $scope.v_encabezado.UBICACION_SOL;
            $scope.autedit.ipssolicita = $scope.v_encabezado.SOLICITANTE;
            $scope.autedit.ipscodsolicita = $scope.v_encabezado.NIT_SOLICITANTE;
            $scope.buscarEspecialidades($scope.v_encabezado.NIT_SOLICITANTE);
            $scope.autedit.nombremedico = $scope.v_encabezado.MEDICO;
            $scope.autedit.especialidadmedico = $scope.v_encabezado.ESPECIALIDAD + ' - ' + $scope.v_encabezado.ESPECIALIDAD_MEDICO;
            $scope.autedit.codespecialidad = $scope.v_encabezado.ESPECIALIDAD;
            $scope.autedit.observacion = $scope.v_encabezado.OBSERVACION;
            $scope.autedit.codaut = $scope.v_encabezado.AUTORIZACION_ANTERIOR == 0 ? '' : $scope.v_encabezado.AUTORIZACION_ANTERIOR;
            $scope.autedit.nopos = $scope.v_encabezado.POSS == 'TRUE' ? true : false;
            $scope.autedit.valornopos = '';
            $scope.autedit.valortipo = '';
            $scope.autedit.cod_adjunto = $scope.v_encabezado.COD_ADJUNTO;

            $scope.autedit.anopass = $scope.v_encabezado.CONTROLANNO;
            $scope.autedit.mespess = $scope.v_encabezado.CONTROLMES;

            if ($scope.autedit.anopass != "" && $scope.autedit.mespess != "") {
              $scope.autedit.control = true;
            }
            // $scope.autedit.mipres = false;
            setTimeout(() => {
              $scope.autedit.valormipres = $scope.v_encabezado.MIPRES;
              if ($scope.autedit.valormipres != 0) {
                $scope.inactimiprestab4 = false;
                $scope.autedit.mipres = true;
              } else {
                $scope.autedit.mipres = false;
                $scope.inactimiprestab4 = true;
              }
            }, 100);
            // $scope.autedit.ctc = $scope.v_encabezado.CTC == 'TRUE' ? true : false;
            // $scope.autedit.valorctc = $scope.v_encabezado.NUM_CTC
            // $scope.autedit.valormipres= $scope.autedit.valorctc;
            $scope.autedit.tutela = $scope.v_encabezado.TUTELA == 'TRUE' ? true : false;
            $scope.autedit.valortutela = $scope.v_encabezado.NUM_TUTELA;
            $scope.autedit.anticipo = $scope.v_encabezado.ANTICIPO == 'TRUE' ? true : false;
            $scope.autedit.valoranticipo = '';
            $scope.autedit.siniestro = $scope.v_encabezado.SINIESTRO == 'TRUE' ? true : false;
            $scope.autedit.valorsiniestro = '';
            $scope.autedit.altocosto = '';
            $scope.autedit.prioridad = $scope.v_encabezado.PRIORIDAD == 'TRUE' ? true : false;
            $scope.autedit.valorprioridad = '';
            $scope.autedit.accion = 'U';


            $scope.setParametros('noposp', $scope.infoafiliadoautedit.TipoDocumento, $scope.infoafiliadoautedit.Documento);
          }, 100);
        }
        swal.close();
      })
    }

    $scope.buscarAutorizacionesDetalle = function (producto, ubicacion) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtenerDetalleAut', producto: producto, ubicacion: ubicacion }
      }).then(function (response) {
        if (response.data.length > 0) {
          $scope.productosagregadostabIV = response.data;
        }
      })
    }

    $scope.detalleAutorizacionProg = function (num, ubic) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtener_detalle_programada', numero: num, ubicacion: ubic }
      }).then(function (response) {
        // if (response.data.length > 0) {        
        $scope.v_encabezadov = response.data.cabeza;
        $scope.v_detallev = response.data.detalle;

        //$scope.v_detallev.forEach(element => {
        //  $scope.v_detallev = element;
        // });



        if ($scope.v_detallev.codigo == undefined) {

        } else {
          $scope.v_detallev = [];
        }
        // }
      })
    }



    $scope.ocultarautorizaciones = function () {
      $scope.verAutorizaciones = true;
    }

    $scope.switchtable = false;
    $scope.validarAutorizaciones = function () {
      if ($scope.check_option_2 == true) {

        $scope.nameaut = 'Programadas';
        $scope.switchtable = true;
        if ($scope.tablepro != undefined) {
          $scope.tablepro.destroy();
          $scope.tablepro = undefined;
        }
        setTimeout(function () {
          $scope.tablepro = $('#tautorizacionespro').DataTable({
            language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
            lengthMenu: [[20, 50, -1], [20, 50, 'Todas']],
            order: [[0, "asc"]]
          });
          $scope.tablepro.draw();
        }, 100);
      } else {
        $scope.nameaut = 'Normales';
        $scope.switchtable = false;

        if ($scope.table != undefined) {
          $scope.table.destroy();
          $scope.table = undefined;
        }
        setTimeout(function () {
          $scope.table = $('#tautorizaciones').DataTable({
            language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
            lengthMenu: [[20, 50, -1], [20, 50, 'Todas']],
            order: [[0, "asc"]]
          });
          $scope.table.draw();
        }, 100)
      }
    }


    $scope.accionesAutorizacion = function (opcion, operacion, numero, ubicacion) {
      swal({
        title: 'Confirmar',
        text: "Esta seguro que desea " + opcion + " la autorización ?",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result) {
          // $scope.validartabI('autorizacion');  

          // if ($scope.pasarsolicitudaut == true) {
          $scope.resfrecuencia = { Numero: null, Ubicacion: null };
          $scope.resfrecuencia.Numero = numero;
          $scope.resfrecuencia.Ubicacion = ubicacion;
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: { function: 'ProcesaAnulaAutorizacion', numero: numero, ubicacion: ubicacion, operacion: operacion }
          }).then(function (response) {
            if (response.data.Codigo == "1") {

              swal({ title: "No Completado", text: response.data.Nombre, showConfirmButton: true, type: "warning" });

            } else if (response.data.Codigo == '4') {
              $scope.mensajefrecuencia = response.data.Nombre;
              $scope.openmodals('modalevantarctrlfrecuencia', 'P');
            } else {
              $scope.insertraza({ numero: numero, ubicacion: ubicacion });
              swal({ title: "Completado", text: response.data.Nombre, showConfirmButton: true, type: "success" }).then(() => {
                $scope.buscarAutorizaciones($scope.autorizacion.documento, $scope.autorizacion.numero, $scope.solicitud.ubicacion);
              })
            }
          })
        }

        // }else{

        // swal('Importante', $scope.data.requiredFile == true ? 'Verifique el peso y/o la extension del adjunto' : 'Complete los campos requeridos (*)', 'info');
        // }


        //   }
      })
    }

    $scope.removeDiagnostico = function (params) {
      switch (params) {
        case 't1':
          $scope.solicitud.diagnom2 = ''
          break;
        case 't2':
          $scope.solicitudpro.diagnom2 = '';
          break;
        case 't4':
          $scope.autedit.diagnom2 = '';
          break;
      }
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
          if ($scope.tipoaut == '1') {
            $scope.solicitud.tipodocumento = $scope.type;
            $scope.solicitud.documento = $scope.id;
            $scope.buscarAfiliado('1', $scope.solicitud.tipodocumento, $scope.solicitud.documento);
          }
          if ($scope.tipoaut == '2') {
            $scope.solicitudpro.tipodocumento = $scope.type;
            $scope.solicitudpro.documento = $scope.id;
            $scope.buscarAfiliado('2', $scope.solicitudpro.tipodocumento, $scope.solicitudpro.documento);
          }
          if (($scope.tipoaut == '4')) {
            $scope.buscarAutorizaciones($scope.id, '', '');
          }
        }
      });
    }

    $scope.tempfecha = { anno: "", mes: "" };
    $scope.seleccionaranodias = function () {
      if ($scope.tipoaut == '1') {
        $scope.solicitud.anopass = $scope.tempfecha.anno;
        $scope.solicitud.mespess = $scope.tempfecha.mes;
        if (($scope.solicitud.anopass == '0' || $scope.solicitud.anopass == undefined) || ($scope.solicitud.mespess == '0' || $scope.solicitud.mespess == undefined)) {
          swal('Importante', 'No pueden haber campos vacios!', 'info');
        } else {
          setTimeout(() => {
            $scope.tempfecha.anno = '0';
            $scope.tempfecha.mes = '0';
          }, 100);

          swal({ title: "Completado", text: 'Año y Mes de control selecionado Correctamente!', showConfirmButton: false, type: "success", timer: 1500 });
          $scope.closemodals('modalcontrol');
        }
      }
      if (($scope.tipoaut == '4')) {
        $scope.autedit.anopass = $scope.tempfecha.anno;
        $scope.autedit.mespess = $scope.tempfecha.mes;
        if (($scope.autedit.anopass == '0' || $scope.autedit.anopass == undefined) || ($scope.autedit.mespess == '0' || $scope.autedit.mespess == undefined)) {
          swal('Importante', 'No pueden haber campos vacios!', 'info');
        } else {
          setTimeout(() => {
            $scope.tempfecha.anno = '0';
            $scope.tempfecha.mes = '0';
          }, 100);
          swal({ title: "Completado", text: 'Año y Mes de control selecionado Correctamente!', showConfirmButton: false, type: "success", timer: 1500 });
          $scope.closemodals('modalcontrol');
        }
      }
    }

    $scope.data = { formato: null, requiredFile: false };
    $scope.dataIV = { formato: null, requiredFile: false };
    //Functions in jquery
    $('#autfile').change(function () {//Detecta los cambios que sufre el input file            
      $timeout(function () {//Usado para validar el file en tiempo real
        var file = document.getElementById('autfile').files[0];//Obtiene el file del input para validarlo
        $scope.data.formato = '';
        if (file) {//Valida si existe el archivo en el input file
          if (file.size <= 5000000) {//valida que el size del file sea <= 5 mb                                                         
            if (file.name.split('.').pop().toLowerCase() == 'pdf') {//Obtiene la extension del file y valida que sea un pdf                      
              $scope.data.formato = 'Dentro Del Peso Limite y Formato Validado';
              $scope.data.requiredFile = false;
              var reader = new FileReader();
              reader.onload = function (event) {
                $timeout(function () {
                  $scope.solicitud.file = event.target.result; //Asigna el file al ng-model autFile
                  $scope.solicitud.ext = file.name.split('.').pop().toLowerCase();//Asigna la extension del autFile
                  $scope.solicitud.namefile = file.name.substr(0, file.name.lastIndexOf('.'));    //Asigna el nombre del autFile            
                })
              };
              reader.readAsDataURL(file);
            } else {
              $scope.data.formato = 'Formato Invalido solo puedes adjuntar archivos con extensión .pdf';
              $scope.solicitud.namefile = null;//Asigna null al ng-model autFile  
              $scope.solicitud.ext = null;//Asigna null a la extension autFile 
              $scope.data.requiredFile = true;
            }
          } else {
            $scope.data.formato = 'Limite de Peso Excedido';
            $scope.solicitud.namefile = null;//Asigna null al ng-model autFile   
            $scope.solicitud.ext = null;//Asigna null a la extension autFile   
            $scope.data.requiredFile = true;
          }
        } else {
          $scope.data.formato = '';
          $scope.solicitud.namefile = null;//Asigna null al ng-model autFile   
          $scope.solicitud.ext = null;//Asigna null a la extension autFile 
          $scope.data.requiredFile = false;
        }
      }, 100);
    })
    $('#autfileIV').change(function () {//Detecta los cambios que sufre el input file            
      $timeout(function () {//Usado para validar el file en tiempo real
        var file = document.getElementById('autfileIV').files[0];//Obtiene el file del input para validarlo
        $scope.dataIV.formato = '';
        if (file) {//Valida si existe el archivo en el input file
          if (file.size <= 5000000) {//valida que el size del file sea <= 5 mb                                                         
            if (file.name.split('.').pop().toLowerCase() == 'pdf') {//Obtiene la extension del file y valida que sea un pdf                      
              $scope.dataIV.formato = 'Dentro Del Peso Limite y Formato Validado';
              $scope.dataIV.requiredFile = false;
              var reader = new FileReader();
              reader.onload = function (event) {
                $timeout(function () {
                  $scope.autedit.file = event.target.result; //Asigna el file al ng-model autFile
                  $scope.autedit.ext = file.name.split('.').pop().toLowerCase();//Asigna la extension del autFile
                  $scope.autedit.namefile = file.name.substr(0, file.name.lastIndexOf('.'));    //Asigna el nombre del autFile        
                })
              };
              reader.readAsDataURL(file);
            } else {
              $scope.dataIV.formato = 'Formato Invalido solo puedes adjuntar archivos con extensión .pdf';
              $scope.autedit.namefile = null;//Asigna null al ng-model autFile  
              $scope.autedit.ext = null;//Asigna null a la extension autFile 
              $scope.dataIV.requiredFile = true;
            }
          } else {
            $scope.dataIV.formato = 'Limite de Peso Excedido';
            $scope.autedit.namefile = null;//Asigna null al ng-model autFile   
            $scope.autedit.ext = null;//Asigna null a la extension autFile   
            $scope.dataIV.requiredFile = true;
          }
        } else {
          $scope.dataIV.formato = '';
          $scope.autedit.namefile = null;//Asigna null al ng-model autFile   
          $scope.autedit.ext = null;//Asigna null a la extension autFile 
          $scope.dataIV.requiredFile = false;
        }
      }, 100);
    })

    $scope.datatb2 = { formato: null, requiredFile: true };
    //Functions in jquery
    $('#solprofile').change(function () {//Detecta los cambios que sufre el input file            
      $timeout(function () {//Usado para validar el file en tiempo real
        var file = document.getElementById('solprofile').files[0];//Obtiene el file del input para validarlo
        $scope.datatb2.formato = '';
        if (file) {//Valida si existe el archivo en el input file
          if (file.size <= 5000000) {//valida que el size del file sea <= 5 mb                                                         
            if (file.name.split('.').pop().toLowerCase() == 'pdf') {//Obtiene la extension del file y valida que sea un pdf                      
              $scope.datatb2.formato = 'Dentro Del Peso Limite y Formato Validado';
              $scope.datatb2.requiredFile = false;
              var reader = new FileReader();
              reader.onload = function (event) {
                $timeout(function () {
                  $scope.solicitudpro.file = event.target.result; //Asigna el file al ng-model autFile
                  $scope.solicitudpro.ext = file.name.split('.').pop().toLowerCase();//Asigna la extension del autFile
                  $scope.solicitudpro.namefile = file.name.substr(0, file.name.lastIndexOf('.'));    //Asigna el nombre del autFile
                })
              };
              reader.readAsDataURL(file);
            } else {
              $scope.solicitudpro.requiredFile = true;
              $scope.datatb2.formato = 'Formato Invalido solo puedes adjuntar archivos con extensión .pdf';
              $scope.solicitudpro.file = null;
              $scope.solicitudpro.namefile = null;//Asigna null al ng-model autFile  
              $scope.solicitudpro.ext = null;//Asigna null a la extension autFile 
            }
          } else {
            $scope.datatb2.requiredFile = true;
            $scope.datatb2.formato = 'Limite de Peso Excedido';
            $scope.solicitudpro.file = null;
            $scope.solicitudpro.namefile = null;//Asigna null al ng-model autFile   
            $scope.solicitudpro.ext = null;//Asigna null a la extension autFile   

          }
        } else {
          $scope.datatb2.requiredFile = false;
          $scope.datatb2.formato = null;
          $scope.solicitudpro.file = null;
          $scope.solicitudpro.namefile = null;//Asigna null al ng-model autFile   
          $scope.solicitudpro.ext = null;//Asigna null a la extension autFile 

        }
      }, 100);
    })

    $scope.seleccionarAut = function (aut) {
      if ($scope.tipoaut == '1') {
        $scope.solicitud.codaut = aut.numero;
        $scope.solicitud.ubiaut = aut.ubicacion;
      }
      if ($scope.tipoaut == '4') {
        $scope.autedit.codaut = aut.numero;
        $scope.autedit.ubiaut = aut.ubicacion;
      }
      $scope.closemodals('modaltraxanular');
    }

    $scope.seleccionarAutSoporte = function (aut) {
      if ($scope.tipoaut == '1') {
        $scope.adjuntotabI = aut.adjunto;
        $scope.ftptabI = aut.ftp;
      }
      if ($scope.tipoaut == '4') {
        $scope.v_encabezado.ADJUNTO = aut.adjunto;
        $scope.v_encabezado.FTP = aut.ftp;
      }

      $scope.closemodals('modalautsoportes');

    }
    $scope.downloadFileAut = function (pdf, ftp) {
      pqrHttp.dowloadfile(pdf, ftp).then(function (response) {
        window.open("temp/" + response.data);
      });

    }

    $scope.abrirModalDireccion = function () {
      $scope.dialogDiagreg = ngDialog.open({
        template: 'views/consultaAfiliados/nucleofamiliar/modal/modalDireccion.html',
        className: 'ngdialog-theme-plain',
        controller: 'actualizarinformacion',
        closeByDocument: false,
        closeByEscape: false,
        scope: $scope
      });
      $scope.dialogDiagreg.closePromise.then(function (data) {
        if ($scope.tipoaut == '2') {
          if ($scope.solicitudpro.direccion) {
            if (data.value != '$closeButton') {
              $scope.solicitudpro.direccion = data.value + " " + $('#barrio').val();
            }
          } else {
            $scope.solicitudpro.direccion = data.value + " " + $('#barrio').val();
          }

        }
      });
    }

    $scope.FormatSoloTextoNumero = function (NID) {
      const input = document.getElementById('' + NID + '');
      var valor = input.value;
      input.value = valor.replace(/[^\wÑñ,.-\s]/g, '');
    }
    $scope.buscarprescripcion = function () {
      var temptipodocumento = '';
      var tempdocumento = '';
      if ($scope.tipoaut == '1') {
        temptipodocumento = $scope.solicitud.tipodocumento;
        tempdocumento = $scope.solicitud.documento;
      }
      if ($scope.tipoaut == '4') {
        temptipodocumento = $scope.autedit.tipodocumento;
        tempdocumento = $scope.autedit.documento;
      }


      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'f_validar_mipres', tipodocumento: temptipodocumento, documento: tempdocumento, valormipres: $scope.numero_prescripcion }
      }).then(function (response) {
        console.log(response.data);

        if (response.data.Codigo == '1') {
          swal({ title: "Importante", text: response.data.Nombre, showConfirmButton: true, type: "warning" });
          if ($scope.tipoaut == '1') {
            $scope.solicitud.valormipres = '';
            $scope.solicitud.mipres = false;
          }
          if ($scope.tipoaut == '4') {
            $scope.autedit.valormipres = '';
            $scope.autedit.mipres = false;
          }
        }

        if (response.data.Codigo == '0') {
          swal({ title: "Completado", text: response.data.Nombre, type: "success" });
          if ($scope.tipoaut == '1') {
            $scope.solicitud.valormipres = $scope.numero_prescripcion;
          }

          if ($scope.tipoaut == '4') {
            $scope.autedit.valormipres = $scope.numero_prescripcion;
          }
        }
      })

    }


    $scope.saltarcontrolfrecuencia = function (tipo) {
      if ($scope.motivo == null || $scope.motivo == '') {
        swal({ title: "Motivo para saltar contrl de frencuencia", text: 'No puede estar vacio!', showConfirmButton: false, type: "warning", timer: 3000 });
      } else {
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: {
            function: 'p_levanta_frecuencia_anual',
            numero: $scope.resfrecuencia.Numero,
            ubicacion: $scope.resfrecuencia.Ubicacion,
            observacion: $scope.jutificacion,
            motivo: $scope.motivo,
            responsable: sessionStorage.getItem('cedula')
          }
        }).then(function (response) {
          if (tipo == 'E') {
            $scope.numautprocesadaIV = response.data.Numero;
            $scope.numautprocesada = response.data.Numero;
            $scope.ubicacionPrint = $scope.respuesta.Ubicacion;
            $scope.numautprocesada = response.data.Numero;
            $scope.estadoautIV = response.data.Estado;
            $scope.claseEstadoautIV = response.data.Clase;
            $scope.mensajeautIV = response.data.Nombre;
            $scope.verPrintIV = response.data.Print;
            // $("#btn-finalizartabIV").removeClass("grey");
            $scope.invproductotabIV = true;
            $scope.invfinalizartabIV = false;
            $scope.titletabIV = 'Finalizar';
            $scope.selectContratoTabIV = null;
            if ($scope.autedit.cod_adjunto && $scope.autedit.file) {
              $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: {
                  function: 'subirArchivoAut', file: $scope.autedit.file,
                  ext: $scope.autedit.ext,
                  num: $scope.numautprocesada,
                  ubicacion: $scope.respuesta.Ubicacion,
                  namefile: $scope.autedit.namefile
                }
              }).then(function (response) {
                console.log({ 'ARCHIVO': response.data });
                $scope.subirAdjuntoUpdate(response.data);
              })
            }
            if (($scope.autedit.cod_adjunto == null || $scope.autedit.cod_adjunto == '') && $scope.autedit.ext) {
              if ($scope.autedit.ext) {
                $http({
                  method: 'POST',
                  url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                  data: {
                    function: 'subirArchivoAut', file: $scope.autedit.file,
                    ext: $scope.autedit.ext,
                    num: $scope.numautprocesada,
                    ubicacion: $scope.respuesta.Ubicacion,
                    namefile: $scope.autedit.namefile
                  }
                }).then(function (response) {
                  console.log({ 'ARCHIVO': response.data });
                  $scope.subirAdjunto(JSON.stringify({ 'ARCHIVO': response.data }));
                })
              }
            }

            $http({
              method: 'POST',
              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
              data: { function: 'insertarAutorizacionEntregas', autorizacion: JSON.stringify($scope.autedit), productos: $scope.dataproductosfre, cantidad: $scope.productosagregadostabIV.length }
            }).then(function (response) {
              console.log(response.data);

            })
            swal.close();
          } else {
            if (response.data.Codigo == '0') {
              swal({ title: "Completado", text: response.data.Nombre, showConfirmButton: true, type: "success" }).then(() => {
                $scope.buscarAutorizaciones($scope.autorizacion.documento, $scope.autorizacion.numero, $scope.solicitud.ubicacion);
              })

            } else {
              swal({ title: "No Completado", text: response.data.Nombre, showConfirmButton: true, type: "warning" });
            }
          }



          $scope.closemodals('modalevantarctrlfrecuencia');
        })

      }
    }

    $scope.formatPeso = function (num) {
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
    $scope.insertraza = function (param) {

      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: {
          function: 'p_registra_traza',
          numero: param.numero,
          ubicacion: param.ubicacion,
          host: null,
          ip: $scope.ip
        }
      }).then(function (response) {
        console.log(response.data);
      })
    }

    $scope.backgestionautoaf = function () {
      location.href = "#/gestionautoafiliados";
    }

    $scope.getdx = function (param) {
      return new Promise((resolve, reject) => {
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: {
            function: 'p_valida_diagnostico_aut',
            diagno: param.Codigo
          }
        }).then(function (response) {
          resolve(response.data)
        }, error => {
          reject(error)
        })

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