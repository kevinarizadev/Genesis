'use strict';

angular.module('GenesisApp')

  .controller('auditautorizacionController', ['$scope', '$http', '$filter', 'ngDialog', '$timeout', 'pqrHttp', function ($scope, $http, $filter, ngDialog, $timeout, pqrHttp) {


    $(document).ready(function () {
      $('#modaldiagnostico').modal();
      $("#modalips").modal();
      $("#modalproducto").modal();
      $('#modaldetalle').modal();
      $('#modaltutelas').modal();
      $('#modalsiniestro').modal();
      $('#modaleditaut').modal();
      $('#modalnovedades').modal();
      $("#modalservicio").modal();
      $("#modalespecialidad").modal();
      $("#modaldocumentos").modal();
      $("#modalcontrol").modal();
      $("#modaltraxanular").modal();
      $("#modalcantprod").modal();
      
    });

    //variables de control

    $scope.tabI = true;
    $scope.tabIV = false;
    $scope.activeI = 'active final white-text';
    $scope.activeIV = 'none';
    $scope.activeIcolor = 'foot4';
    $scope.activeIVcolor = '';
    $scope.nametab = 'Autorización';
    $scope.inactiveseccion2tab1 = true;

    // variables TAB I
    //secciones de ng hide
    $scope.inactiveseccion1tab1 = false;
    $scope.inactiveseccion4tab4 = false;
    $scope.activetipotabI = true;
    $scope.activetipotabIV = true;
    $scope.productosagregadostabIV = [];
    $scope.productosagregadostabIVC = [];

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
      cod_adjunto: null
    }
    $scope.autedit = {
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
      cod_adjunto: null
    }

    $scope.auteditc = {
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
      cod_adjunto: null
    }

    $scope.novedades = null;
    $scope.datosAfiModalNov = null;
    $scope.tutelaParam = null;
    $scope.siniestroParam = null;
    $scope.maxDate = null;
    $scope.documentosAfiliado = null;



    //Se valida fecha actual

    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1; //hoy es 0!
    var yyyy = hoy.getFullYear();



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
    }]

    $scope.dataSeccionales = null;

    $scope.inactiveseccional = true;
    $scope.tempSeccional = null;
    $scope.hidecontrol = false;
    // funciones de control
    $scope.getSeccionales = function () {
      swal({ title: 'Buscando...' });
      swal.showLoading();
      var tempseccional = sessionStorage.getItem('municipio').length == '4' ? sessionStorage.getItem('municipio').substr(0, 1) : sessionStorage.getItem('municipio').substr(0, 2)
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtener_seccionales_aut_activas', sessional: tempseccional }
      }).then(function (response) {
        console.log(response.data);
        $scope.dataSeccionales = response.data;
        swal.close();
      });


    }
    $scope.validatecall = function (seccional) {
      console.log(seccional);
      $scope.tempSeccional = seccional.numero;
      $scope.inactiveseccional = false;
    }

    $scope.showSeccionales = function () {
      $scope.inactiveseccional = true;
    }
    $scope.init = function () {
      $scope.tabI = true;
      $scope.tabIV = false;
      $scope.activeI = 'active final';
      $scope.activeIV = 'none';
      $scope.activeIcolor = '';
      $scope.activeIVcolor = '';
      let rol = sessionStorage.getItem('rolcod'); 
      if (rol == '17' || rol == '18'|| rol == '23') {        
        $scope.hidecontrol = false;
      }else{        
        $scope.hidecontrol = true;
      }
    }

    $scope.setTab = function (opcion) {

      $scope.init();

      switch (opcion) {
        case 1:
          $scope.tabI = true;
          $scope.tabIV = false;
          $scope.activeI = 'active final white-text';
          $scope.activeIV = 'none';
          $scope.activeIcolor = 'foot4';
          $scope.nametab = 'Bolsa de Autorizaciones';
          $scope.tipoaut = '1';

          if ($scope.inactiveseccional == true) {
            $scope.getSeccionales();
          }

          break;
        case 4:
          $scope.tabI = false;
          $scope.tabIV = true;
          $scope.activeI = 'none';
          $scope.activeIVcolor = 'foot4';
          $scope.activeIV = 'active final white-text';
          $scope.nametab = 'Consulta de Autorización';
          $scope.tipoaut = '4';
          break;
        default:
      }
    }
    $scope.setTab(1);
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
          console.log(response.data);
          console.log(tipo, 'buscarAfiliado');
          if (tipo == '1') {
            $scope.infoafiliadoauteditc = [];
            $scope.infoafiliadoauteditc = response.data;
            if ($scope.infoafiliadoauteditc.EMPLEADOR) {
              $scope.infoafiliadoauteditc.EMPLEADOR = JSON.parse($scope.infoafiliadoauteditc.EMPLEADOR);
            }

            $scope.afirownumI = 1;
            if ($scope.infoafiliadoauteditc.SINIESTRO == 'true') {
              $scope.afirownumI = $scope.afirownumI + 1;
            }

            if ($scope.infoafiliadoauteditc.TUTELA == 'true') {
              $scope.afirownumI = $scope.afirownumI + 1;
            }

            if ($scope.infoafiliadoauteditc.PORTABILIDAD == 'S') {
              $scope.afirownumI = $scope.afirownumI + 1;
            }

            if ($scope.infoafiliadoauteditc.ERROR_50 == 'true') {

              $scope.afirownumI = $scope.afirownumI + 1;

            }

            $scope.calcularEdad($scope.infoafiliadoauteditc.FechaNacimiento, tipo);
            $scope.sexoafitabI = $scope.infoafiliadoauteditc.SexoCodigo;
            $scope.edadafitabI = $scope.infoafiliadoauteditc.EdadDias;
            $scope.regimenafitabI = $scope.infoafiliadoauteditc.CodigoRegimen;
            $scope.inactiveseccion1tab1 = true;
            $scope.inactiveseccion2tab1 = false;
            $scope.productosagregadostabIVC = [];
            $scope.datosAfiModalNov = $scope.infoafiliadoauteditc;
            console.log($scope.sexoafitabI);
            console.log($scope.edadafitabI);
            console.log($scope.regimenafitabI);
          } else if (tipo == '3') {
            $scope.infoafiliadoautedit = [];
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
              $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento, tipo);
              $scope.sexoafitabIV = $scope.infoafiliadoautedit.SexoCodigo;
              $scope.edadafitabIV = $scope.infoafiliadoautedit.EdadDias;
              $scope.regimenafitabIV = $scope.infoafiliadoautedit.CodigoRegimen;
              $scope.datosAfiModalNov = $scope.infoafiliadoautedit;
              $scope.inactiveseccion1tab4 = true;
              $scope.inactiveseccion2tab4 = false;
              $scope.productosagregadostabIV = [];
            }
          } else {
            $scope.infoafiliadoautpro = [];
            $scope.infoafiliadoautpro = response.data;
            if ($scope.infoafiliadoautpro.Estado != 'ACTIVO') {
              $scope.informacionmodal = 'Afiliado no se encuentra activo en base de datos';
              $scope.inactiveseccion1tab2 = false;
              $scope.inactiveseccion2tab2 = true;
              swal('Importante', 'Afiliado no se encuentra activo en la base de datos.', 'info');
            }
          }
        } else {
          swal('Importante', response.data.NOMBRE, 'info')
        }
      });
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
            var contrato = $scope.auteditc.contrato;
            var servicio = $scope.auteditc.codservicio
            var tipo = 'N';
            var sexo = $scope.sexoafitabI;
            var edad = $scope.edadafitabI;


          } else {
            var regimen = $scope.regimenafitabIV;
            var contrato = $scope.autedit.contrato;
            var servicio = $scope.autedit.codservicio;
            var tipo = 'N';
            var sexo = $scope.sexoafitabIV;
            var edad = $scope.edadafitabIV;
          }



          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: { function: 'listaProducto', regimen: regimen, contrato: contrato, clasificacion: servicio, tipo: tipo, edad: edad, sexo: sexo }
          }).then(function (response) {
            console.log(response);
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
          console.log($scope.tipoaut, 'modalservicio');
          $scope.bservicio = '';
          if ($scope.tipoaut == '1') {
            if ($scope.auteditc.ipscodasignada) {
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
            $("#modalservicio").modal("open");
            setTimeout(() => {
              $('#modalservicio #servinput').focus();
            }, 100);

          }

          break;
        case 'modalespecialidad':
          $scope.bespecialidad = '';
          if ($scope.tipoaut == '1') {
            if ($scope.auteditc.ipscodsolicita) {
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
            console.log(response);
            $scope.dias = response.data;
          })

          if ($scope.tipoaut == '1') {
            $scope.solicitud.anopass = "";
            $scope.solicitud.mespess = "";
            $scope.tempanno = "";
            $scope.tempmess = "";
            if ($scope.solicitud.control == true) {
              $("#modalcontrol").modal("open");
            } else {
              $scope.solicitud.control = false;
            }
          }

          if ($scope.tipoaut == '4') {
            $scope.autedit.mespess = "";
            $scope.autedit.anopass = "";
            $scope.tempanno4 = "";
            $scope.tempmess4 = "";
            if ($scope.autedit.control == true) {
              $("#modalcontrol").modal("open");
            } else {
              setTimeout(() => {
                $scope.autedit.control = false;
              }, 100);
            }
          }
          break
        case 'modalcantprod':
          console.log('modalcantprod:', $scope.tipoaut);
          $("#modalcantprod").modal("open");
          break;
        default:
      }
    }
    $scope.accionTabIV = function (aut) {
      // case 'edit':
      $scope.check_option_3 = false;
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
          console.log($scope.tipoaut);

          if ($scope.tipoaut == '1') {
            if ($scope.solicitud.anopass == '' && $scope.solicitud.mespess == '') {
              $scope.solicitud.control = false;
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
        case 'modaleditaut':
          $scope.check_option_3 = false;
          $scope.productosagregadostabIV = [];
          $("#modaleditaut").modal("close");
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
            if ($scope.auteditc.codaut == null) {
              $scope.auteditc.codaut = null;
              $scope.auteditc.aut = false;
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
        default:
      }
    }

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
    $scope.seleccionardiagnostico = function (data, tipo) {
      var text = "";
      if ($scope.tipoaut == '1') {
        if (tipo == 'P') {
          $scope.auteditc.diagnom1 = data.Nombre;
          $scope.auteditc.diagcod1 = data.Codigo;
          text = 'Principal';
        } else {
          $scope.auteditc.diagnom2 = data.Nombre;
          $scope.auteditc.diagcod2 = data.Codigo;
          text = 'Secundario';
          $("#modaldiagnostico").modal("close");
        }
      }

      if ($scope.tipoaut == '4') {
        if (tipo == 'P') {
          $scope.autedit.diagnom1 = data.Nombre;
          $scope.autedit.diagcod1 = data.Codigo;
          text = 'Principal';
        } else {
          $scope.autedit.diagnom2 = data.Nombre;
          $scope.autedit.diagcod2 = data.Codigo;
          text = 'Secundario';
          $("#modaldiagnostico").modal("close");
        }
      }
      swal({ title: "Completado", text: "Diagnostico " + text + " Registrado", showConfirmButton: false, type: "success", timer: 800 });
    }

    $scope.buscarIps = function (ips) {
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
    }

    $scope.seleccionarips = function (data, tipo) {
      console.log(data, tipo);
      var text = '';
      if ($scope.tipoaut == '1') {
        if (tipo == 'S') {
          $scope.auteditc.ipssolicita = data.Nombre;
          $scope.auteditc.ipscodsolicita = data.Codigo;
          text = 'Ips Solicitante.';
          $scope.buscarEspecialidades(data.Codigo);
          swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        } else {
          $scope.auteditc.ipsasignada = data.Nombre;
          $scope.auteditc.ipscodasignada = data.Codigo;
          $scope.auteditc.ipsasignadadireccion = data.Codigo_Dir;
          text = 'Ips Asignada.';
          swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
          $scope.cargarContratoTabI($scope.auteditc.ipscodasignada, $scope.regimenafitabI, 'tab1');//faltan parametros
        }
      }

      if ($scope.tipoaut == '4') {
        if (tipo == 'S') {
          $scope.autedit.ipssolicitante = data.Nombre;
          $scope.autedit.ipscodsolicitante = data.Codigo;
          text = 'Ips Solicitante.';
          $scope.buscarEspecialidades(data.Codigo);
          swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        } else {
          $scope.autedit.ipsasignada = data.Nombre;
          $scope.autedit.ipscodasignada = data.Codigo;
          $scope.autedit.ipsasignadadireccion = data.Codigo_Dir;
          text = 'Ips Asignada.';
          // $scope.listarContratoServicio($scope.autedit.ipscodasignada, $scope.regimenafitabIV, text);//faltan parametros
          $scope.cargarContratoTabI($scope.autedit.ipscodasignada, $scope.regimenafitabIV, text);//faltan parametros
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

    $scope.listarContratoServicio = function (ips, regimen, text) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtenerContratos', nit: ips, regimen: regimen }
      }).then(function (response) {
        console.log(response.data);
        if (response.data[0].CODIGO == 1) {
          var contrato = response.data[0].NUMERO;
          $scope.solicitudpro.contrato = response.data[0].NUMERO;
          $scope.solicitudpro.contratoDocumento = response.data[0].DOCUMENTO;
          $scope.solicitudpro.contratoUbicacion = response.data[0].UBICACION;
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: { function: 'obtenerServicios', contrato: contrato, tipo: 'P' }
          }).then(function (response) {
            $scope.listServicios = response.data;
            swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
            $("#modalips").modal("close");
          })
        } else {
          $scope.listServicios = '';
          swal({ title: "Completado", text: 'IPS Asignada no tiene contrato', showConfirmButton: true, type: "success" });

        }

      })

    }

    $scope.buscarProducto = function (pro) {
      if ($scope.buscarpro.length >= 6) {
        if ($scope.tipoaut == '1') {
          var regimen = $scope.regimenafitabI;
          var contrato = $scope.auteditc.contrato;
          var servicio = $scope.auteditc.codservicio
          var tipo = 'N';
          var ubicacion = $scope.auteditc.ubicacionpaciente;
          var sexo = $scope.sexoafitabI;
          var edad = $scope.edadafitabI;
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
          data: { function: 'obtenerProducto', regimen: regimen, contrato: contrato, producto: $scope.buscarpro, clasificacion: servicio, tipo: tipo, ubicacion: ubicacion, edad: edad, sexo: sexo }
        }).then(function (response) {
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


    $scope.tempData;
    $scope.cantidadinput = 1;
    $scope.seleccionarproducto = function (data) {
      if ($scope.autedit.codservicio == "714" || $scope.auteditc.codservicio == "714") {
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
            console.log(data.CANTIDAD);
            if ($scope.tipoaut == '1') {
              if ($scope.productosagregadostabIVC.length == 0) {
                $scope.productosagregadostabIVC.push(data);
              } else {
                var comp = 0;
                for (let index = 0; index < $scope.productosagregadostabIVC.length; index++) {
                  const element = $scope.productosagregadostabIVC[index];
                  if (element.CODIGO == data.CODIGO) {
                    var vindex = index;
                    comp = 1;
                    break;
                  } else {
                    comp = 0;
                  }
                }
                if (comp == 0) {
                  $scope.productosagregadostabIVC.push(data);
                } else {
                  $scope.productosagregadostabIVC[vindex].CANTIDAD = data.CANTIDAD;
                }

              }

              if ($scope.productosagregadostabIVC.length == 0)
                $scope.nofindproductstabI = false;
              else
                $scope.nofindproductstabI = true;
            } else if ($scope.tipoaut == '4') {
              $scope.inactivebarraproedit = true;

              if ($scope.productosagregadostabIV.length == 0) {
                $scope.productosagregadostabIV.push(data);
              } else {
                for (let index = 0; index < $scope.productosagregadostabIV.length; index++) {
                  const element = $scope.productosagregadostabIV[index];
                  console.log(element);
                  if (element.CODIGO == data.CODIGO) {
                    console.log('Nueva cantidad', data.CANTIDAD);
                    $scope.productosagregadostabIV[index].CANTIDAD = data.CANTIDAD;
                  } else {
                    $scope.productosagregadostabIV.push(data);
                  }
                }
              }

              console.log('productos', $scope.productosagregadostabIV);

              if ($scope.productosagregadostabIV.length == 0)
                $scope.nofindproductstabIV = false;
              else
                $scope.nofindproductstabIV = true;
            }

            $scope.$apply();
            swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success", timer: 800 });
            setTimeout(function () {
              $("#modalproducto").modal("close");
            }, 100);
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
        console.log($scope.tempData.CANTIDADREST);
        console.log($scope.tempData.CANTIDAD);
        if ($scope.tipoaut == '1') {
          if ($scope.productosagregadostabIVC.length == 0) {
            $scope.productosagregadostabIVC.push($scope.tempData);
          } else {
            var comps = 0;
            for (let index = 0; index < $scope.productosagregadostabIVC.length; index++) {
              const element = $scope.productosagregadostabIVC[index];
              if (element.CODIGO == $scope.tempData.CODIGO) {
                var sindex = index;
                comps = 1;
                break;
              } else {
                comps = 0;
              }
            }

            if (comps == 0) {
              $scope.productosagregadostabIVC.push($scope.tempData);
            } else {
              $scope.productosagregadostabIVC[sindex].CANTIDAD = $scope.tempData.CANTIDAD;
            }
          }
          if ($scope.productosagregadostabIVC.length == 0)
            $scope.nofindproductstabI = false;
          else
            $scope.nofindproductstabI = true;


        } else {
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
        $scope.productosagregadostabIVC.splice(index, 1);
        if ($scope.productosagregadostabIVC.length == 0)
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
        num: "1"
      }, {
        num: "2"
      }, {
        num: "3"
      }];

      $scope.tempData = null;
      $scope.tempCantidad = 1;
      $scope.tempEntregas = 1;
      console.log(index, tipo)
      if (tipo == "1") {
        if (($scope.v_encabezado && $scope.v_encabezado.CLASIFICACION == '714') || $scope.auteditc.codservicio == '714') {
          $scope.tempData = $scope.productosagregadostabIVC[index];
          $scope.tempCantidad = parseInt($scope.productosagregadostabIVC[index].CANTIDADN);
          $scope.tempEntregas = $scope.productosagregadostabIVC[index].ENTREGAS;
          console.log($scope.productosagregadostabIVC[index]);
        } else {
          if ($scope.productosagregadostabIVC[index]) {
            $scope.cantidadinput = $scope.productosagregadostabIVC[index].CANTIDADN;
            $scope.seleccionarproducto($scope.productosagregadostabIVC[index])
          }
        }

      } else {

        if (($scope.v_encabezadoc && $scope.v_encabezadoc.CLASIFICACION == '714') ||$scope.autedit.codservicio == '714') {
          $scope.tempData = $scope.productosagregadostabIV[index];
          $scope.tempCantidad = parseInt($scope.productosagregadostabIV[index].CANTIDADN);
          $scope.tempEntregas = $scope.productosagregadostabIV[index].ENTREGAS;
          console.log($scope.productosagregadostabIV[index]);
        } else {
          if ($scope.productosagregadostabIV[index]) {
            $scope.cantidadinput = $scope.productosagregadostabIV[index].CANTIDADN;
            $scope.seleccionarproducto($scope.productosagregadostabIV[index])
          }
        }
        // $scope.productosagregadostabIV.splice(index, 1);


      }

      if (($scope.v_encabezado && $scope.v_encabezado.CLASIFICACION == '714' && tipo == "4") || $scope.auteditc.codservicio == '714' && tipo == "1") {
        $scope.openmodals('modalcantprod', $scope.tipoaut);
      }


      // swal({ title: "Completado", text: "Producto Retirado.", showConfirmButton: false, type: "info", timer: 800 })
    }
    $scope.seleccionarservicio = function (data, tipo) {
      var text = ''
      $scope.bservicio = '';
      if ($scope.tipoaut == '1') {
        $scope.auteditc.servicio = data.CODIGO + ' - ' + data.NOMBRE;
        $scope.auteditc.codservicio = data.CODIGO;
        text = 'Servicio Seleccionado Correctamente!';
        $scope.productosagregadostabIVC = [];

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
      console.log($scope.tipoaut, 'seleccionarespecialidad');
      if ($scope.tipoaut == '1') {
        $scope.auteditc.especialidadmedico = data.CODIGO + ' - ' + data.NOMBRE;
        $scope.auteditc.codespecialidad = data.CODIGO;
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
          $scope.inactiveseccion2tab1 = true;
          $scope.inactiveseccional = true;
          $scope.activetipotabI = true;
          $scope.productosagregadostabIVC = [];
          $scope.nofindproductstabI = false;
          $scope.inactimiprestab1 = true;
          $scope.inactivetagmipres = true;
          $scope.inactivetagctc = true;
          $scope.inactivetagtutela = true;
          $scope.inactivetagsiniestro = true;
          $scope.nameservicio = 'de orden'
          $scope.check_option_1 = false;
          // wizard
          $scope.invsolicitudtabI = true;
          $scope.invproductotabI = true;
          $scope.invfinalizartabI = true;
          $scope.auteditc = {
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
            anticipo: false,
            valoranticipo: '',
            siniestro: false,
            valorsiniestro: '',
            altocosto: '',
            prioridad: false,
            valorprioridad: '',
            control: false,
            anopass: '',
            mespess: ''
          }
          $("#btn-solicitudtabI").removeClass("activebtn-step donebtn-step");
          $("#btn-productotabI").addClass("grey");
          $("#btn-finalizartabI").addClass("grey");
          $scope.sumPrint = 0;
          document.getElementById('inputFilePlaceHolder').value = "";
          $scope.getSeccionales();
          break;
        case '4':
          $scope.verAutorizaciones = false;
          $scope.verAutorizacionesEdit = false;
          $scope.inactiveseccion4tab4 = false;
          $scope.numautprocesada = null;
          $scope.numautprocesadaIV = null;
          $scope.ubicacionPrint = null;
          document.getElementById('inputFilePlaceHolder4').value = "";
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
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
          }
          break;
        case '5':
          $scope.validartabI('autorizacionc');
          console.log($scope.pasarsolicitudautc);
          if ($scope.pasarsolicitudautc == true) {
            $scope.check_option_1 = true;
            $("#btn-productotabI").removeClass("grey");
            $scope.titletabI = 'Producto';
          } else {
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
          }
          break;
        case 'a4':
          $scope.validartabI('autorizacion');
          console.log($scope.pasarsolicitudaut);
          if ($scope.pasarsolicitudaut == true) {
            $scope.check_option_3 = true;
          } else {
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
          }
          break;
        case 'b4':
          $scope.check_option_3 = false;
          break;
        case '-5':
          $scope.nameautedit = 'Encabezado';
          $("#btn-productotabI").addClass("grey");
          $scope.check_option_1 = false;
          break;

        case '8':
          $scope.titletabI = 'Solicitud';
          $("#btn-productotabI").addClass("grey");
          $scope.check_option_1 = false;
          break;
        case '6':
          if ($scope.productosagregadostabIV.length == 0 || $scope.productosagregadostabIV == undefined) {
            var text = 'Se creara la autorizacion en estado activa debido a que faltan los productos';
            swal('Importante', 'Debe agregar un producto', 'info')
          } else {
            var text = 'Procesar autorización';
            $scope.finalizartabIV(text);
          }

          break;

        case '7':
          console.log($scope.productosagregadostabIVC.length);
          if ($scope.productosagregadostabIVC.length == 0 || $scope.productosagregadostabIVC == undefined) {
            var text = 'Se creara la autorizacion en estado activa debido a que faltan los productos';
            swal('Importante', 'Debe agregar un producto', 'info')
          } else {
            var text = 'Procesar autorización';
            $scope.finalizartabI(text);
          }
          break;

        case '-7':
          $scope.check_option_3 = false;
          break;
        case '-2':
          $("#btn-finalizartabI").addClass("grey");
          $scope.invproductotabI = false;
          $scope.titletabI = 'Producto';
          $scope.invfinalizartabI = true;
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
        case 't1':
          setTimeout(function () {

            swal({ title: "Completado", text: 'Autorización Completada', type: "success", timer: 800 });
            $scope.limpiar('1');
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

      console.log(contrato, tab);
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtenerServicios', contrato: contrato, tipo: 'A' }

      }).then(function (response) {

        if (tab == 'tab1') {

          for (var i = 0; i < $scope.listContratostab1.length; i++) {

            if ($scope.listContratostab1[i].NUMERO == contrato) {

              $scope.auteditc.ubicacioncontrato = $scope.listContratostab1[i].UBICACION;

              $scope.auteditc.documentocontrato = $scope.listContratostab1[i].DOCUMENTO

            }

          }

          setTimeout(() => {

            $scope.auteditc.servicio = $scope.v_encabezadoc.CLASIFICACION + ' - ' + $scope.v_encabezadoc.NOMBRE_CLAS;

          }, 100);



          $scope.listServicios = response.data;

        } else {

          for (var i = 0; i < $scope.listContratostab4.length; i++) {

            if ($scope.listContratostab4[i].NUMERO == contrato) {

              $scope.autedit.ubicacioncontrato = $scope.listContratostab4[i].UBICACION;

              $scope.autedit.documentocontrato = $scope.listContratostab4[i].DOCUMENTO

            }

          }

          setTimeout(() => {

            $scope.autedit.servicio = $scope.v_encabezado.CLASIFICACION + ' - ' + $scope.v_encabezado.NOMBRE_CLAS;

          }, 100);



          $scope.listServicios = response.data;
        }

      })

    }

    $scope.setParametros = function (opcion, tipodocumento, documento) {

      switch (opcion) {

        case 'nopos':

          // if ($scope.solicitud.nopos == true) {

          //$scope.auteditc.tutela = false;

          //$scope.auteditc.valortutela = '';

         // $scope.auteditc.valortutelatemp = '';

          $scope.auteditc.ctc = false;

          $scope.auteditc.valorctc = '';

          $scope.auteditc.mipres = false;

          $scope.auteditc.valormipres = '';

          $scope.auteditc.siniestro = false;

          $scope.auteditc.valorsiniestro = '';

          $scope.inactivetagmipres = true;

          //$scope.inactivetagtutela = true;

          $scope.inactivetagctc = true;

          $scope.inactivetagsiniestro = true;

          // if ($scope.regimenafitabI == 'C') {

          // $scope.inactimiprestab1 = false;

          // } else {

          //   $scope.inactimiprestab1 = true;

          // }

          $scope.activetipotabI = !$scope.activetipotabI;

          $scope.inactimiprestab1 = !$scope.inactimiprestab1;

          // } else {

          //   $scope.activetipotabI = true;

          //   $scope.inactimiprestab1 = true;

          // }

          break;

        case 'noposp':

          if ($scope.autedit.nopos == true) {

            //$scope.autedit.valortutela = '';

            //$scope.autedit.valorctc = '';

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

          if ($scope.auteditc.mipres == true) {

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

                $scope.solicitud.valormipres = result;

                $scope.inactivetagmipres = false;

              } else {

                $scope.inactivetagmipres = true;

                $scope.auteditc.valormipres = '';

                $scope.auteditc.mipres = false;

              }

              $scope.$apply();

            }, function (dismiss) {

              $scope.inactivetagmipres = true;

              $scope.auteditc.valormipres = '';

              $scope.auteditc.mipres = false;

              $scope.$apply();

            });

          } else {

            $scope.inactivetagmipres = true;

            $scope.auteditc.valormipres = '';

            $scope.auteditc.mipres = false;

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

                  $scope.autedit.valormipres = result;

                  $scope.inactivetagmipres = false;

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

          $scope.auteditc.ctc = false;

          $scope.auteditc.valorctc = '';

          $scope.inactivetagctc = true;

          if ($scope.auteditc.tutela == true) {

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

                $scope.auteditc.tutela = false;

                swal({ title: "Completado", text: 'Afiliado no tiene tutelas.', type: "info" });

              }

            })

          } else {

            $scope.auteditc.valortutela = '';

            $scope.auteditc.valortutelatemp = '';

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

          if ($scope.auteditc.siniestro == true) {

            $http({

              method: 'POST',

              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",

              data: { function: 'obtenerSiniestro', tipodocumento: tipodocumento, documento: documento }

            }).then(function (response) {

              $scope.listSiniestros = [];

              $scope.listSiniestros = response.data;
              console.log($scope.listSiniestros["0"].Codigo);
              if ($scope.listSiniestros["0"].Codigo != '0') {

                $scope.siniestroParam = 'siniestro';

                $("#modalsiniestro").modal("open");

              } else {

                $scope.auteditc.siniestro = false;

                swal({ title: "Completado", text: 'Afiliado no tiene enfermedad de alto costo', type: "info" });

              }

            })

          } else {

            $scope.auteditc.valorsiniestro = '';

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

          if ($scope.auteditc.aut == true) {
            if ($scope.auteditc.ipsasignada == '') {
              swal({ title: "No Completado", text: 'Ips asignada no puede estar vacia!', type: "info" });
            } else {
              $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: { function: 'obtener_aut_anuladas', tipodocumento: tipodocumento, documento: documento, nit: $scope.auteditc.ipscodasignada }
              }).then(function (response) {
                if (response.data.length == 0) {
                  swal({ title: "Completado", text: 'Afiliado no tiene Autorizaciones Anuladas!', type: "info" });
                  $scope.auteditc.aut = false;
                } else {
                  $scope.listAut = [];
                  $scope.listAut = response.data;
                  $("#modaltraxanular").modal("open");
                }

              })
            }
          } else {
            if ($scope.tipoaut == '1') {
              $scope.auteditc.codaut = null;
              $scope.auteditc.aut = false;
            }


          }
          if ($scope.autedit.aut == true) {

            if ($scope.autedit.ipsasignada == '') {
              swal({ title: "No Completado", text: 'Ips asignada no puede estar vacia!', type: "info" });
            } else {
              $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: { function: 'obtener_aut_anuladas', tipodocumento: tipodocumento, documento: documento, nit: $scope.autedit.ipscodasignada }
              }).then(function (response) {
                console.log(response.data.length);

                if (response.data.length == 0) {
                  swal({ title: "Completado", text: 'Afiliado no tiene Autorizaciones Anuladas!', type: "info" });
                  $scope.autedit.aut = false;
                } else {
                  $scope.listAut = [];
                  $scope.listAut = response.data;
                  $("#modaltraxanular").modal("open");
                }

              })
            }
          } else {
            if ($scope.tipoaut == '4') {
              $scope.autedit.codaut = null;
              $scope.autedit.aut = false;
            }


          }

          break;
        default:

      }

    }



    $scope.selecionarTutela = function (numero, ubi) {

      if ($scope.tutelaParam == 'tutela') {

        $scope.auteditc.valortutelatemp = numero + ' - ' + ubi;

        $scope.auteditc.valortutela = numero;

        $scope.inactivetagctc = true;

        $scope.inactivetagtutela = false;

      }



      if ($scope.tutelaParam == 'tutelae') {

        $scope.autedit.valortutelatemp = numero + ' - ' + ubi;

        $scope.autedit.valortutela = numero;

        $scope.inactivetagctc = true;

        $scope.inactivetagtutela = false;

      }
      $("#modaltutelas").modal("close");

    }

    $scope.selecionarSiniestro = function (numero) {



      if ($scope.siniestroParam == 'siniestro') {

        $scope.auteditc.valorsiniestro = numero;

        $scope.auteditc.valorsiniestrotemp = numero;

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
      if ($scope.productosagregadostabIVC.length == 0) {
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
            $scope.auteditc.fechasolicitudparseada = formatDate($scope.auteditc.fechasolicitud);
            if ($scope.auteditc.nopos == true) {
              $scope.auteditc.valornopos = 'N';
              if ($scope.auteditc.tutela == true && $scope.auteditc.ctc == false) {
                $scope.auteditc.valortipo = 'T';
              } else {
                $scope.auteditc.valortipo = 'C';
              }
            } else {
              $scope.auteditc.valortipo = '';
              $scope.auteditc.valornopos = 'P';
            }
            if ($scope.auteditc.anticipo == true) {
              $scope.auteditc.valoranticipo = 'S';
            } else {
              $scope.auteditc.valoranticipo = 'N';
            }
            if ($scope.auteditc.prioridad == true) {
              $scope.auteditc.valorprioridad = 'S';
            } else {
              $scope.auteditc.valorprioridad = 'N';
            }
            if ($scope.auteditc.siniestro == true) {
              $scope.auteditc.altocosto = 'S';
            } else {
              $scope.auteditc.altocosto = 'N';
            }
            if ($scope.auteditc.mipres == false) {
              $scope.auteditc.valormipres = 0;
            }
            var data = JSON.stringify($scope.auteditc);
            swal({ title: 'Procesando...' });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
              data: { function: 'insertarAutorizacion', autorizacion: data }
            }).then(function (response) {
              $scope.respuesta = response.data;
              if ($scope.respuesta.Codigo == '0') {
                if ($scope.productosagregadostabIVC.length > 0) {
                  var dataproductos = JSON.stringify($scope.productosagregadostabIVC);
                  $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                    data: { function: 'insertarDetalleAut', productos: dataproductos, cantidad: $scope.productosagregadostabIVC.length, numero: $scope.respuesta.Numero, ubicacion: $scope.respuesta.Ubicacion }
                  }).then(function (response) {
                    if (response.data.Codigo == '0') {
                      $scope.numautprocesadaI = response.data.Numero;
                      $scope.ubicacionPrint = $scope.respuesta.Ubicacion;
                      $scope.numautprocesada = response.data.Numero;
                      $scope.estadoautI = response.data.Estado;
                      $scope.claseEstadoautI = response.data.Clase;
                      $scope.mensajeautI = response.data.Nombre;
                      $scope.verPrintI = response.data.Print;
                      // $("#btn-finalizartabIV").removeClass("grey");
                      $scope.invproductotabI = true;
                      $scope.invfinalizartabI = false;
                      $scope.titletabI = 'Finalizar';
                      $scope.selectContratoTabI = null;


                      if ($scope.auteditc.cod_adjunto && $scope.auteditc.file) {
                        $http({
                          method: 'POST',
                          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                          data: {
                            function: 'subirArchivoAut', file: $scope.auteditc.file,
                            ext: $scope.autedit.ext,
                            num: $scope.numautprocesada,
                            ubicacion: $scope.respuesta.Ubicacion,
                            namefile: $scope.auteditc.namefile
                          }
                        }).then(function (response) {
                          console.log({ 'ARCHIVO': response.data });
                          $scope.subirAdjuntoUpdate(response.data, '1');
                        })
                      }
                      console.log($scope.auteditc.cod_adjunto);
                      if (($scope.auteditc.cod_adjunto == null || $scope.auteditc.cod_adjunto == '') && $scope.auteditc.ext) {
                        if ($scope.auteditc.ext) {
                          $http({
                            method: 'POST',
                            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                            data: {
                              function: 'subirArchivoAut', file: $scope.auteditc.file,
                              ext: $scope.auteditc.ext,
                              num: $scope.numautprocesada,
                              ubicacion: $scope.respuesta.Ubicacion,
                              namefile: $scope.auteditc.namefile
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
                        data: { function: 'insertarAutorizacionEntregas', autorizacion: JSON.stringify($scope.auteditc), productos: dataproductos, cantidad: $scope.productosagregadostabIVC.length }
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
              } else {
                //error al crear el cabeza
              }
            })
          }
        })
      }
    }
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
                  var dataproductos = JSON.stringify($scope.productosagregadostabIV);
                  $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                    data: { function: 'insertarDetalleAut', productos: dataproductos, cantidad: $scope.productosagregadostabIV.length, numero: $scope.respuesta.Numero, ubicacion: $scope.respuesta.Ubicacion }
                  }).then(function (response) {
                    if (response.data.Codigo == '0') {
                      $scope.numautprocesadaIV = response.data.Numero;
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
                          $scope.subirAdjuntoUpdate(response.data, '4');
                        })
                      }
                      console.log($scope.autedit.cod_adjunto);
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
                        data: { function: 'insertarAutorizacionEntregas', autorizacion: JSON.stringify($scope.autedit), productos: dataproductos, cantidad: $scope.productosagregadostabIV.length }
                      }).then(function (response) {
                        console.log(response.data);

                      })
                      swal.close();
                      // swal({ title: "Completado", text: response.data.Mensaje, type: "success" }).then((result) => {
                      //   $scope.buscarAutorizaciones($scope.autorizacion.documento, $scope.autorizacion.numero, $scope.solicitud.ubicacion);
                      //   $scope.closemodals('modaleditaut');
                      // })
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
              } else {
                //error al crear el cabeza
              }
            })
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
    $scope.subirAdjuntoUpdate = function (vfile, type) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: {
          function: 'acualizarAdjunto',
          codadjunto: type == '1' ? $scope.auteditc.cod_adjunto : $scope.autedit.cod_adjunto,
          ruta: vfile,
          num: $scope.numautprocesada,
          ubicacion: $scope.respuesta.Ubicacion,
        }
      }).then(function (response) {
        console.log(response.data);
      })
    }
    $scope.validartabI = function (tipo) {
      $scope.pasarsolicitudautc = true;
      $scope.pasarsolicitudaut = true;
      switch (tipo) {
        case 'autorizacion':
          if ($scope.autedit.diagnom1 == '' || $scope.autedit.diagnom1 == undefined) {
            $scope.pasarsolicitudaut = false;
          }
          if ($scope.autedit.ipssolicita == '' || $scope.autedit.ipssolicita == undefined) {
            $scope.pasarsolicitudaut = false;
          }
          if ($scope.autedit.ipsasignada == '' || $scope.autedit.ipsasignada == undefined) {
            $scope.pasarsolicitudaut = false;
          }
          if ($scope.autedit.ipscodsolicita == '' || $scope.autedit.ipscodsolicita == undefined) {
            $scope.pasarsolicitudaut = false;
          }
          if ($scope.autedit.ipscodasignada == '' || $scope.autedit.ipscodasignada == undefined) {
            $scope.pasarsolicitudaut = false;
          }
          if ($scope.autedit.servicio == '' || $scope.autedit.servicio == undefined) {
            $scope.pasarsolicitudaut = false;
          }
          if ($scope.autedit.contrato == '' || $scope.autedit.contrato == undefined) {
            $scope.pasarsolicitudaut = false;
          }
          if ($scope.autedit.origen == '' || $scope.autedit.origen == undefined) {
            $scope.pasarsolicitudaut = false;
          }
          if ($scope.autedit.tiposervicio == '' || $scope.autedit.tiposervicio == undefined) {
            $scope.pasarsolicitudaut = false;
          }
          if ($scope.autedit.ubicacionpaciente == '' || $scope.autedit.ubicacionpaciente == undefined) {
            $scope.pasarsolicitudaut = false;
          }
          if ($scope.autedit.especialidadmedico == '' || $scope.autedit.especialidadmedico == undefined) {
            $scope.pasarsolicitudaut = false;
          }
          if ($scope.autedit.control == true) {
            if ($scope.autedit.anopass == '' || $scope.autedit.mespess == '') {
              $scope.pasarsolicitudaut = false;
            }

          }
          if ($scope.autedit.nopos == true) {
            if ($scope.autedit.valormipres == '') {
              $scope.pasarsolicitudaut = false;
            }
          }

          if ($scope.autedit.aut == true) {
            if (($scope.autedit.codaut == '' || $scope.autedit.codaut == null) && ($scope.autedit.ubiaut == '' || $scope.autedit.ubiaut == null)) {
              $scope.pasarsolicitudaut = false;
            }
          }

          break;
        case 'autorizacionc':
          if ($scope.auteditc.diagnom1 == '' || $scope.auteditc.diagnom1 == undefined) {
            $scope.pasarsolicitudautc = false;
          }
          if ($scope.auteditc.ipssolicita == '' || $scope.auteditc.ipssolicita == undefined) {
            $scope.pasarsolicitudautc = false;
          }
          if ($scope.auteditc.ipsasignada == '' || $scope.auteditc.ipsasignada == undefined) {
            $scope.pasarsolicitudautc = false;
          }
          if ($scope.auteditc.ipscodsolicita == '' || $scope.auteditc.ipscodsolicita == undefined) {
            $scope.pasarsolicitudautc = false;
          }
          if ($scope.auteditc.ipscodasignada == '' || $scope.auteditc.ipscodasignada == undefined) {
            $scope.pasarsolicitudautc = false;
          }
          if ($scope.auteditc.servicio == '' || $scope.auteditc.servicio == undefined) {
            $scope.pasarsolicitudautc = false;
          }
          if ($scope.auteditc.contrato == '' || $scope.auteditc.contrato == undefined) {
            $scope.pasarsolicitudautc = false;
          }
          if ($scope.auteditc.origen == '' || $scope.auteditc.origen == undefined) {
            $scope.pasarsolicitudautc = false;
          }
          if ($scope.auteditc.tiposervicio == '' || $scope.auteditc.tiposervicio == undefined) {
            $scope.pasarsolicitudautc = false;
          }
          if ($scope.auteditc.ubicacionpaciente == '' || $scope.auteditc.ubicacionpaciente == undefined) {
            $scope.pasarsolicitudautc = false;
          }
          if ($scope.auteditc.nombremedico == '' || $scope.auteditc.nombremedico == undefined) {
            $scope.pasarsolicitudautc = false;
          }
          if ($scope.auteditc.especialidadmedico == '' || $scope.auteditc.especialidadmedico == undefined || $scope.auteditc.especialidadmedico == '-') {
            $scope.pasarsolicitudautc = false;
          }
          if ($scope.auteditc.control == true) {
            if ($scope.auteditc.anopass == '' || $scope.auteditc.mespess == '') {
              $scope.pasarsolicitudautc = false;
            }
          }
          if ($scope.auteditc.aut == true) {
            if ($scope.autedit.codaut == '' && $scope.autedit.ubiaut == '') {
              $scope.pasarsolicitudaut = false;
            }
          }
          if ($scope.auteditc.nopos == true) {
            if ($scope.auteditc.valormipres == '') {
              $scope.pasarsolicitudaut = false;
            }
          }
          if ($scope.auteditc.aut == true) {
            if (($scope.auteditc.codaut == '' || $scope.auteditc.codaut == null) && ($scope.auteditc.ubiaut == '' || $scope.auteditc.ubiaut == null)) {
              $scope.pasarsolicitudaut = false;
            }
          }
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
        if ($scope.sumPrint > 2) {
          swal({ title: "No Completado", text: 'No se puede imprimir la autorización mas de 2 veces!', showConfirmButton: true, type: "warning" });
        } else {
          window.open('views/autorizaciones/formatoautorizacionPrint.php?numero=' + $scope.numautprocesada + '&ubicacion=' + $scope.ubicacionPrint, '_blank');
        }
      }, 100);
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
            lengthMenu: [[20, 50, -1], [20, 50, 'Todas']],
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
            lengthMenu: [[20, 50, -1], [20, 50, 'Todas']],
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
    $scope.v_detallec = null;
    $scope.consultarAutorizacion = function (numero, ubicacion, accion) {
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
          if ($scope.v_detallev[0].codigo!=undefined) {
            $scope.v_detallev=[];
          }else{
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
          $scope.v_detalle = response.data.detalle;

          // for (let index = 0; index < $scope.productosagregadostabIV.length; index++) {
          //   // const element = array[index];
          //   $scope.productosagregadostabIV[index].CANTIDADN = $scope.productosagregadostabIV[index].CANTIDAD;

          // }

          $scope.v_detalle = response.data.detalle[0];
          $scope.productosagregadostabIV = $scope.v_detalle;
     
          if ($scope.v_detalle.codigo == undefined) {
            for (let index = 0; index < $scope.productosagregadostabIV.length; index++) {
              // const element = array[index];
              $scope.productosagregadostabIV[index].CANTIDADN = $scope.productosagregadostabIV[index].CANTIDAD;

            }
          } else {
            $scope.productosagregadostabIV = [];
          }
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
      
          // $scope.productosagregadostabIV = $scope.v_detalle;
          $scope.cargarContratoTabI($scope.v_encabezado.NIT_ASIGNADA, $scope.regimentabIV, 'tab4');//faltan parametros.
          setTimeout(() => {
            var ftemp = $scope.v_encabezado.FECHA_ORDEN.split("/");
            $scope.obtenerServiciosTabI($scope.v_encabezado.CONTRATO, 'tab4');
            console.log($scope.infoafiliadoautedit);
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
            $scope.autedit.ipsasignadadireccion = $scope.v_encabezado.DIR_ASIGNADA;
            $scope.autedit.contrato = $scope.v_encabezado.CONTRATO;
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
            $scope.autedit.valortutela = '';
            $scope.autedit.anticipo = $scope.v_encabezado.ANTICIPO == 'TRUE' ? true : false;
            $scope.autedit.valoranticipo = '';
            $scope.autedit.siniestro = $scope.v_encabezado.SINIESTRO == 'TRUE' ? true : false;
            $scope.autedit.valorsiniestro = '';
            $scope.autedit.altocosto = '';
            $scope.autedit.prioridad = $scope.v_encabezado.PRIORIDAD == 'TRUE' ? true : false;
            $scope.autedit.valorprioridad = '';
            $scope.autedit.accion = 'U';

            // $scope.v_detalle.forEach((element, index) => {
            //   $scope.productosagregadostabIV.push(element[index]);
            // });
            $scope.setParametros('noposp', $scope.infoafiliadoautedit.TipoDocumento, $scope.infoafiliadoautedit.Documento);
          }, 100);
        }
        if (accion == 'EI') {
          
          $scope.verAutorizaciones = true;
          $scope.v_encabezadoc = response.data.cabeza;
          // console.log();

          // if (response.data.detalle.length>0) {
          // $scope.v_detallec = response.data.detalle;
     
        $scope.v_detallec = response.data.detalle[0];
        $scope.productosagregadostabIVC = $scope.v_detallec;
   
        if ($scope.v_detallec.codigo == undefined) {
          for (let index = 0; index < $scope.productosagregadostabIVC.length; index++) {
            // const element = array[index];
            $scope.productosagregadostabIVC[index].CANTIDADN = $scope.productosagregadostabIVC[index].CANTIDAD;

          }
        } else {
          $scope.productosagregadostabIVC = [];
        }

          $scope.cargarContratoTabI($scope.v_encabezadoc.NIT_ASIGNADA, $scope.regimentabIVC, 'tab1');//faltan parametros.
          setTimeout(() => {
            var ftemp = $scope.v_encabezadoc.FECHA_ORDEN.split("/");
            $scope.obtenerServiciosTabI($scope.v_encabezadoc.CONTRATO, 'tab1');
            console.log($scope.v_encabezadoc.OBSERVACION);
            $scope.auteditc.numero = $scope.v_encabezadoc.NUM_OASIS;
            $scope.auteditc.ubicacion = $scope.v_encabezadoc.UBI_OASIS;
            $scope.auteditc.tipodocumento = $scope.infoafiliadoauteditc.TipoDocumento;
            $scope.auteditc.documento = $scope.infoafiliadoauteditc.Documento;
            $scope.auteditc.diagnom1 = $scope.v_encabezadoc.DX + ' - ' + $scope.v_encabezadoc.NOMBRE_DX;
            $scope.auteditc.diagnom2 = $scope.v_encabezadoc.DX1 == 'N' ? '' : $scope.v_encabezadoc.DX1 + ' - ' + $scope.v_encabezadoc.NOMBRE_DX1;
            $scope.auteditc.diagcod1 = $scope.v_encabezadoc.DX;
            $scope.auteditc.diagcod2 = $scope.v_encabezadoc.DX1;
            $scope.auteditc.ipsasignada = $scope.v_encabezadoc.ASIGNADA;
            $scope.auteditc.ipscodasignada = $scope.v_encabezadoc.NIT_ASIGNADA;
            $scope.auteditc.ipsasignadadireccion = $scope.v_encabezadoc.DIR_ASIGNADA;
            $scope.auteditc.contrato = $scope.v_encabezadoc.CONTRATO;
            $scope.auteditc.ubicacioncontrato = $scope.v_encabezadoc.UBICACION_CONTRATO;
            $scope.auteditc.documentocontrato = $scope.v_encabezadoc.CONTRATO;
            $scope.auteditc.servicio = $scope.v_encabezadoc.CLASIFICACION;
            $scope.auteditc.codservicio = $scope.v_encabezadoc.CLASIFICACION;
            $scope.auteditc.fechasolicitud = new Date(ftemp[2], (ftemp[1] - 1), ftemp[0]);
            $scope.auteditc.fechasolicitudparseada = '';
            $scope.auteditc.origen = $scope.v_encabezadoc.ORIGEN;
            $scope.auteditc.tiposervicio = $scope.v_encabezadoc.TIPO_SERVICIO;
            $scope.auteditc.ubicacionpaciente = $scope.v_encabezadoc.UBICACION_SOL;
            $scope.auteditc.ipssolicita = $scope.v_encabezadoc.SOLICITANTE;
            $scope.auteditc.ipscodsolicita = $scope.v_encabezadoc.NIT_SOLICITANTE;
            $scope.buscarEspecialidades($scope.v_encabezadoc.NIT_SOLICITANTE);
            $scope.auteditc.nombremedico = $scope.v_encabezadoc.MEDICO;
            $scope.auteditc.especialidadmedico = $scope.v_encabezadoc.ESPECIALIDAD + ' - ' + $scope.v_encabezadoc.ESPECIALIDAD_MEDICO;
            $scope.auteditc.codespecialidad = $scope.v_encabezadoc.ESPECIALIDAD;
            $scope.auteditc.observacion = $scope.v_encabezadoc.OBSERVACION;
            $scope.auteditc.codaut = $scope.v_encabezadoc.AUTORIZACION_ANTERIOR == 0 ? '' : $scope.v_encabezadoc.AUTORIZACION_ANTERIOR;
            $scope.auteditc.aut = $scope.v_encabezadoc.AUTORIZACION_ANTERIOR != 0 ? true : false;
            $scope.auteditc.file = $scope.v_encabezadoc.ADJUNTO;
            $scope.auteditc.nopos = $scope.v_encabezadoc.POSS == 'TRUE' ? true : false;
            $scope.auteditc.valornopos = '';
            $scope.auteditc.valortipo = '';
            $scope.auteditc.cod_adjunto = $scope.v_encabezadoc.COD_ADJUNTO;
            $scope.auteditc.anopass = $scope.v_encabezadoc.CONTROLANNO;
            $scope.auteditc.mespess = $scope.v_encabezadoc.CONTROLMES;

            if ($scope.auteditc.anopass != "" && $scope.auteditc.mespess != "") {
              $scope.auteditc.control = true;
            }
            // $scope.autedit.mipres = false;
            setTimeout(() => {
              $scope.auteditc.valormipres = $scope.v_encabezadoc.MIPRES;
              if ($scope.auteditc.valormipres != 0) {
                $scope.inactimiprestab4 = false;
                $scope.auteditc.mipres = true;
              } else {
                $scope.auteditc.mipres = false;
                $scope.inactimiprestab4 = true;
              }
            }, 100);
            // $scope.autedit.ctc = $scope.v_encabezado.CTC == 'TRUE' ? true : false;
            // $scope.autedit.valorctc = $scope.v_encabezado.NUM_CTC
            // $scope.autedit.valormipres= $scope.autedit.valorctc;
            $scope.auteditc.tutela = $scope.v_encabezadoc.TUTELA == 'TRUE' ? true : false;
            $scope.auteditc.valortutela = '';
            $scope.auteditc.anticipo = $scope.v_encabezadoc.ANTICIPO == 'TRUE' ? true : false;
            $scope.auteditc.valoranticipo = '';
            $scope.auteditc.siniestro = $scope.v_encabezadoc.SINIESTRO == 'TRUE' ? true : false;
            $scope.auteditc.valorsiniestro = '';
            $scope.auteditc.altocosto = '';
            $scope.auteditc.prioridad = $scope.v_encabezadoc.PRIORIDAD == 'TRUE' ? true : false;
            $scope.auteditc.valorprioridad = '';
            $scope.auteditc.accion = 'U';

            // $scope.v_detallec.forEach((element, index) => {
            //   $scope.productosagregadostabIVC.push(element[index]);
            // });
            $scope.setParametros('noposp', $scope.infoafiliadoauteditc.TipoDocumento, $scope.infoafiliadoauteditc.Documento);
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
        if (response.data.length > 0) {
          $scope.v_detallev = response.data;
        }
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
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: { function: 'ProcesaAnulaAutorizacion', numero: numero, ubicacion: ubicacion, operacion: operacion }
          }).then(function (response) {
            if (response.data.Codigo == "1") {
              swal({ title: "No Completado", text: response.data.Nombre, showConfirmButton: true, type: "warning" });
            } else {
              swal({ title: "Completado", text: response.data.Nombre, showConfirmButton: true, type: "success" }).then(() => {
                $scope.buscarAutorizaciones($scope.autorizacion.documento, $scope.autorizacion.numero, $scope.solicitud.ubicacion);
              })
            }
          })
        }
      })
    }



    $scope.removeDiagnostico = function (params) {
      switch (params) {
        case 't1':
          $scope.auteditc.diagnom2 = ''
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

    $scope.tempanno = '';
    $scope.tempmess = '';
    $scope.tempanno4 = '';
    $scope.tempmess4 = '';
    $scope.seleccionaranodias = function () {
      console.log($scope.tipoaut);
      if ($scope.tipoaut == '1') {
        $scope.solicitud.anopass = $scope.tempanno;
        $scope.solicitud.mespess = $scope.tempmess;
        if (($scope.solicitud.anopass == '' || $scope.solicitud.anopass == undefined) || ($scope.solicitud.mespess == '' || $scope.solicitud.mespess == undefined)) {
          swal('Importante', 'No pueden haber campos vacios!', 'info');
        } else {
          swal({ title: "Completado", text: 'Año y Mes de control selecionado Correctamente!', showConfirmButton: false, type: "success", timer: 1500 });
          $scope.closemodals('modalcontrol');
        }
      }
      if (($scope.tipoaut == '4')) {
        $scope.autedit.anopass = $scope.tempanno4;
        $scope.autedit.mespess = $scope.tempmess4;
        if (($scope.autedit.anopass == '' || $scope.autedit.anopass == undefined) || ($scope.autedit.mespess == '' || $scope.autedit.mespess == undefined)) {
          swal('Importante', 'No pueden haber campos vacios!', 'info');
        } else {
          swal({ title: "Completado", text: 'Año y Mes de control selecionado Correctamente!', showConfirmButton: false, type: "success", timer: 1500 });
          $scope.closemodals('modalcontrol');
        }
      }



    }


    $scope.callAut = function () {
      console.log($scope.tipoaut);
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtener_aut_activas', sessional: $scope.tempSeccional }
      }).then(function (response) {
        console.log(response.data);
        if (response.data.length == 0) {
          swal({ title: 'Importante', text: 'No hay Autorizaciones Activas!', type: "info", timer: 1500 });
          $scope.showSeccionales();
        } else {
          $scope.buscarAfiliado('1', response.data[0].tipo_documento, response.data[0].documento);
          $scope.regimentabIVC = response.data[0].regimen;
          setTimeout(() => {
            $scope.consultarAutorizacion(response.data[0].numero, response.data[0].ubicacion, 'EI');
            $scope.inactiveseccion2tab1 = false;
          }, 100);
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
        }

      });

    }

    $scope.seleccionarAut = function (aut) {
      console.log($scope.tipoaut);
      if ($scope.tipoaut == '1') {
        $scope.auteditc.codaut = aut.numero;
        $scope.auteditc.ubiaut = aut.ubicacion;
      }
      if ($scope.tipoaut == '4') {
        $scope.autedit.codaut = aut.numero;
        $scope.autedit.ubiaut = aut.ubicacion;
      }
      $scope.closemodals('modaltraxanular');
    }



    $scope.downloadFileAut = function (pdf) {
      pqrHttp.dowloadfile(pdf,'1').then(function (response) {
        window.open("temp/" + response.data);
      });

    }


    $scope.datac = { formato: null, requiredFile: false };
    $scope.dataIV = { formato: null, requiredFile: false };
    //Functions in jquery
    $('#autcfile').change(function () {//Detecta los cambios que sufre el input file            
      $timeout(function () {//Usado para validar el file en tiempo real
        var file = document.getElementById('autcfile').files[0];//Obtiene el file del input para validarlo
        $scope.datac.formato = '';
        if (file) {//Valida si existe el archivo en el input file
          if (file.size <= 1000000) {//valida que el size del file sea <= 5 mb                                                         
            if (file.name.split('.').pop().toLowerCase() == 'pdf') {//Obtiene la extension del file y valida que sea un pdf                      
              $scope.datac.formato = 'Dentro Del Peso Limite y Formato Validado';
              $scope.datac.requiredFile = false;
              var reader = new FileReader();
              reader.onload = function (event) {
                $timeout(function () {
                  $scope.auteditc.file = event.target.result; //Asigna el file al ng-model autFile
                  $scope.auteditc.ext = file.name.split('.').pop().toLowerCase();//Asigna la extension del autFile
                  $scope.auteditc.namefile = file.name.substr(0, file.name.lastIndexOf('.'));    //Asigna el nombre del autFile
                  console.log(($scope.auteditc.file));
                  console.log($scope.auteditc.ext);
                  console.log($scope.auteditc.namefile);
                })
              };
              reader.readAsDataURL(file);
            } else {
              $scope.datac.formato = 'Formato Invalido solo puedes adjuntar archivos con extensión .pdf';
              $scope.auteditc.namefile = null;//Asigna null al ng-model autFile  
              $scope.auteditc.ext = null;//Asigna null a la extension autFile 
              $scope.datac.requiredFile = true;
            }
          } else {
            $scope.datac.formato = 'Limite de Peso Excedido';
            $scope.auteditc.namefile = null;//Asigna null al ng-model autFile   
            $scope.auteditc.ext = null;//Asigna null a la extension autFile   
            $scope.datac.requiredFile = true;
          }
        } else {
          $scope.datac.formato = '';
          $scope.auteditc.namefile = null;//Asigna null al ng-model autFile   
          $scope.auteditc.ext = null;//Asigna null a la extension autFile 
          $scope.datac.requiredFile = false;
        }
      }, 100);
    })
    $('#autfileIV').change(function () {//Detecta los cambios que sufre el input file            
      $timeout(function () {//Usado para validar el file en tiempo real
        var file = document.getElementById('autfileIV').files[0];//Obtiene el file del input para validarlo
        $scope.dataIV.formato = '';
        if (file) {//Valida si existe el archivo en el input file
          if (file.size <= 1000000) {//valida que el size del file sea <= 5 mb                                                         
            if (file.name.split('.').pop().toLowerCase() == 'pdf') {//Obtiene la extension del file y valida que sea un pdf                      
              $scope.dataIV.formato = 'Dentro Del Peso Limite y Formato Validado';
              $scope.dataIV.requiredFile = false;
              var reader = new FileReader();
              reader.onload = function (event) {
                $timeout(function () {
                  $scope.autedit.file = event.target.result; //Asigna el file al ng-model autFile
                  $scope.autedit.ext = file.name.split('.').pop().toLowerCase();//Asigna la extension del autFile
                  $scope.autedit.namefile = file.name.substr(0, file.name.lastIndexOf('.'));    //Asigna el nombre del autFile                  
                  console.log($scope.autedit.ext);
                  console.log($scope.autedit.namefile);
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