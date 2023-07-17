"use strict";
angular.module("GenesisApp").controller("direccionamientoIPS", ["$scope", "$http", "mipresHTTP", "notification", "$timeout", "$rootScope", "$window", "ngDialog", "Popeye", "FileProcessor",
  function ($scope, $http, mipresHTTP, notification, $timeout, $rootScope, $window, ngDialog, Popeye, FileProcessor) {


    $(document).ready(function () {
       $scope.nit = sessionStorage.getItem('nit');
       $scope.cc = sessionStorage.getItem('cedula');
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
      justificacion: '',
      email: '',
      celular: '',
      contrato: '',
      contratoDocumento: '',
      contratoUbicacion: '',
      ubicacion: ''
    }
    $scope.solicitudedit = {
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

    // funciones de control

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


    $scope.buscarAfiliado = function (tipo, tipodocumento, documento) {
      $http({
        method: 'POST',
        url: "php/recobro/direccionamientoips.php",
        data: { function: 'consultadireccionamiento', responsable: ($scope.nit=='0'? $scope.cc:$scope.nit), tipodoc: tipodocumento, doc: documento }
      }).then(function (response) {
        if (response.data[0].Codigo == '0') 
          { 
            $scope.inactiveseccion2tab1 = true;
            swal('Importante', 'No se encontraron direccionamientos, por favor intente más tarde', 'info');
          } 
        else {
         $scope.inactiveseccion2tab1 = false;
        $scope.prescripciones = response.data;}
      });

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
          $scope.pasostabI('1');
          $scope.sumPrint = 0;
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
            fecsolicitud: '',
            fecsolicitudparseada: '',
            justificacion: '',
            email: '',
            celular: '',
            contrato: '',
            contratoDocumento: '',
            contratoUbicacion: ''
          }

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
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
          }
          break;
        case '5':
          $scope.validartabI('autorizacion');
          if ($scope.pasarsolicitudaut == true) {
            $scope.check_option_3 = true;
            $scope.nameautedit = 'Detalle';
          } else {
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
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
            // $("#btn-finalizartabI").removeClass("grey"); 
            // $scope.invproductotabI = true;
            // $scope.invfinalizartabI = false;
            // $scope.titletabI = 'Finalizar';
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
            // $scope.invproductotabI = true;
            // $scope.invfinalizartabI = false;
            // $scope.titletabI = 'Finalizar';
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
        url: "php/autorizaciones/autorizacionprog/funcautorizacionprog.php",
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
              $scope.listServicios  = null;
            }
          } else {
            $scope.listContratostab4 = response.data;
          }
          $("#modalips").modal("close");
        } else {
          $scope.solicitud.contrato = '';
          $scope.listContratostab1 = '';          
          $scope.listServicios  = null;
          swal({ title: "Completado", text: 'IPS Asignada no tiene contrato', showConfirmButton: true, type: "success", timer: 800 });
        }
      })
    }
    $scope.obtenerServiciosTabI = function (contrato, tab) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacionprog.php",
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

        } else {

          for (var i = 0; i < $scope.listContratostab4.length; i++) {

            if ($scope.listContratostab4[i].NUMERO == contrato) {

              $scope.solicitud.ubicacioncontrato = $scope.listContratostab4[i].UBICACION;

              $scope.solicitud.documentocontrato = $scope.listContratostab4[i].DOCUMENTO

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

          $scope.solicitud.tutela = false;

          $scope.solicitud.valortutela = '';

          $scope.solicitud.valortutelatemp = '';

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

            $scope.autedit.valortutela = '';

            $scope.autedit.valorctc = '';

            $scope.autedit.valormipres = '';

            $scope.inactivetagmiprese = true;

            $scope.inactivetagtutelae = true;

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

          $scope.autedit.tutela = false;

          $scope.autedit.valortutela = '';

          $scope.autedit.ctc = false;

          $scope.autedit.valorctc = '';

          $scope.autedit.mipres = false;

          $scope.autedit.valormipres = '';

          $scope.autedit.siniestro = false;

          $scope.autedit.valorsiniestro = '';

          $scope.inactivetagmiprese = true;

          $scope.inactivetagtutelae = true;

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

                $scope.solicitud.valormipres = result;

                $scope.inactivetagmipres = false;

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

                  $scope.solicitudedit.valormipres = result;

                  $scope.autedit.valormipres = result;

                  $scope.inactivetagmipres = false;

                } else {

                  $scope.inactivetagmipres = true;

                  $scope.solicitudedit.valormipres = '';

                  $scope.autedit.mipres = false;

                  $scope.autedit.valormipres = '';

                }

                $scope.$apply();

              }, 100);

            }, function (dismiss) {

              $scope.inactivetagmipres = true;

              $scope.solicitudedit.valormipres = '';

              $scope.autedit.mipres = false;

              $scope.$apply();

            });

          } else {

            setTimeout(() => {

              $scope.inactivetagmipres = true;

              $scope.solicitudedit.valormipres = '';

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

                $scope.solicitudedit.valorctc = result;

                $scope.autedit.valorctc = result;

                $scope.inactivetagctc = false;

                $scope.inactivetagtutela = true;

              } else {

                swal('Importante', 'Debe ingresar un valor', 'info');

                $scope.inactivetagctc = true;

                $scope.solicitudedit.valorctc = '';

                $scope.autedit.ctc = false;

              }

              $scope.$apply();

            }, function (dismiss) {

              $scope.inactivetagctc = true;

              $scope.solicitudedit.valorctc = '';

              $scope.autedit.ctc = false;

              $scope.$apply();

            });

          } else {

            $scope.solicitudedit.valorctc = '';

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

        default:

      }

    }



    $scope.selecionarTutela = function (numero, ubi) {

      if ($scope.tutelaParam == 'tutela') {

        $scope.solicitud.valortutelatemp = numero + ' - ' + ubi;

        $scope.solicitud.valortutela = numero;

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
          var data = JSON.stringify($scope.solicitud);
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
                    $scope.mensajeaut = response.data.Mensaje;
                    $scope.verPrint = response.data.Print;
                    $("#btn-finalizartabI").removeClass("grey");
                    $scope.invproductotabI = true;
                    $scope.invfinalizartabI = false;
                    $scope.titletabI = 'Finalizar';
                    $scope.selectContratoTabI = null;
                    swal.close();
                  } else {
                    swal.close();
                    swal({ title: "Importante", text: response.data.Mensaje, type: "info" });
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
                      $scope.mensajeautIV = response.data.Mensaje;
                      $scope.verPrintIV = response.data.Print;
                      // $("#btn-finalizartabIV").removeClass("grey");
                      $scope.invproductotabIV = true;
                      $scope.invfinalizartabIV = false;
                      $scope.titletabIV = 'Finalizar';
                      $scope.selectContratoTabIV = null;
                      swal.close();
                      // swal({ title: "Completado", text: response.data.Mensaje, type: "success" }).then((result) => {
                      //   $scope.buscarAutorizaciones($scope.autorizacion.documento, $scope.autorizacion.numero, $scope.solicitud.ubicacion);
                      //   $scope.closemodals('modaleditaut');
                      // })
                    } else {
                      swal.close();
                      swal({ title: "Importante", text: response.data.Mensaje, type: "info" });
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

    $scope.validartabI = function (tipo) {
      $scope.pasarsolicitudaut = true;
      $scope.pasarproductoaut = true;
      switch (tipo) {
        case 'solicitud':
          if ($scope.solicitud.diagnom1 == '' || $scope.solicitud.diagnom1 == undefined) { $scope.pasarsolicitudaut = false; }
          if (!$scope.solicitud.fechasolicitud || $scope.solicitud.fechasolicitud == undefined) { $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.ipssolicita == '' || $scope.solicitud.ipssolicita == undefined) { $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.ipsasignada == '' || $scope.solicitud.ipsasignada == undefined) { $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.ipscodsolicita == '' || $scope.solicitud.ipscodsolicita == undefined) { $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.ipscodasignada == '' || $scope.solicitud.ipscodasignada == undefined) { $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.servicio == '' || $scope.solicitud.servicio == undefined) { $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.contrato == '' || $scope.solicitud.contrato == undefined) { $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.origen == '' || $scope.solicitud.origen == undefined) { $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.tiposervicio == '' || $scope.solicitud.tiposervicio == undefined) { $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.ubicacionpaciente == '' || $scope.solicitud.ubicacionpaciente == undefined) { $scope.pasarsolicitudaut = false; }
          if ($scope.solicitud.nopos == true) {
            if ($scope.solicitud.valormipres == '' && $scope.solicitud.valortutela == '') {
              $scope.pasarsolicitudaut = false;
            }
          }
          if ($scope.solicitud.nombremedico == '' || $scope.solicitud.nombremedico == undefined) {
            $scope.pasarsolicitudaut = false;
          }
          if ($scope.solicitud.especialidadmedico == '' || $scope.solicitud.especialidadmedico == undefined) {
            $scope.pasarsolicitudaut = false;
          }

          if ($scope.solicitud.control == true) {
            if ($scope.solicitud.anopass == '' || $scope.solicitud.mespess == '') {
              $scope.pasarsolicitudaut = false;
            }

          }
          break;
        case 'producto':
          //if($scope.productosagregadostabI.length == 0 || $scope.productosagregadostabI == undefined){$scope.pasarproductoaut = false;}
          break;
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

    // Funciones TABII
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
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
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
          $scope.solicitudpro.ubicacion = sessionStorage.getItem('municipio');
          $scope.solicitudpro.fecsolicitudparseada = formatDate($scope.solicitudpro.fecsolicitud);
          var data = JSON.stringify($scope.solicitudpro);
          swal({ title: 'Procesando...' });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacionprog.php",
            data: { function: 'insertarSolicitudaut', solicitud: data }
          }).then(function (response) {
            $scope.respuesta = response.data;
            if ($scope.respuesta.Codigo == '1') {
              var dataproductos = JSON.stringify($scope.productosagregadostabII);
              $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacionprog.php",
                data: { function: 'insertarDetalle', productos: dataproductos, cantidad: $scope.productosagregadostabII.length, numero: $scope.respuesta.Numero, ubicacion: $scope.respuesta.Ubicacion }
              }).then(function (response) {
                swal.close();
                if (response.data.codigo == '1') {
                  $("#btn-finalizartabII").removeClass("activebtn-step").addClass("donebtn-step");
                  setTimeout(function () {
                    $scope.limpiar('2');
                    $scope.$apply();
                    swal({ title: "Completado", text: response.data.fecha, type: "success", timer: 800 });
                  }, 500);
                } else {
                  swal({ title: "Importante", text: "Autorización no registrada registrada", type: "info" });
                }
              })
            } else {
              swal({ title: "Importante", text: $scope.respuesta.Nombre, type: "info" });
            }
          })
        }
      })
    }

    $scope.validartabII = function (tipo) {

      $scope.pasarsolicitudautprog = true;

      $scope.pasarproductoautprog = true;

      switch (tipo) {

        case 'solicitud':

          if ($scope.solicitudpro.diagnom1 == '' || $scope.solicitudpro.diagnom1 == undefined) { $scope.pasarsolicitudautprog = false; }

          //if($scope.solicitudprogramadadiagnom2 == '' || $scope.solicitudprogramadadiagnom2 == undefined){$scope.pasarsolicitudautprog = false;}
          if ($scope.solicitudpro.fecsolicitud == '' || $scope.solicitudpro.fecsolicitud == undefined) { $scope.pasarsolicitudautprog = false; }
          if ($scope.solicitudpro.ipssolicitante == '' || $scope.solicitudpro.ipssolicitante == undefined) { $scope.pasarsolicitudautprog = false; }
          if ($scope.solicitudpro.ipsasignada == '' || $scope.solicitudpro.ipsasignada == undefined) { $scope.pasarsolicitudautprog = false; }
          if ($scope.solicitudpro.ipscodsolicitante == '' || $scope.solicitudpro.ipscodsolicitante == undefined) { $scope.pasarsolicitudautprog = false; }
          if ($scope.solicitudpro.ipscodasignada == '' || $scope.solicitudpro.ipscodasignada == undefined) { $scope.pasarsolicitudautprog = false; }
          if ($scope.solicitudpro.servicio == '' || $scope.solicitudpro.servicio == undefined) { $scope.pasarsolicitudautprog = false; }
          if ($scope.solicitudpro.justificacion == '' || $scope.solicitudpro.justificacion == undefined) { $scope.pasarsolicitudautprog = false; }
          break;
        case 'producto':
          if ($scope.productosagregadostabII.length == 0 || $scope.productosagregadostabII == undefined) { $scope.pasarproductoautprog = false; }
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
          $scope.v_detallev.forEach(element => {
            $scope.v_detallev = element;
          });
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
          $scope.cargarContratoTabI($scope.v_encabezado.NIT_ASIGNADA, $scope.regimentabIV, 'tab4');//faltan parametros.
          setTimeout(() => {
            var ftemp = $scope.v_encabezado.FECHA_ORDEN.split("/");
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
            $scope.autedit.nopos = $scope.v_encabezado.POSS == 'TRUE' ? true : false;
            $scope.autedit.valornopos = '';
            $scope.autedit.valortipo = '';

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
            $scope.v_detalle.forEach((element, index) => {
              $scope.productosagregadostabIV.push(element[index]);
            });
            $scope.setParametros('noposp', $scope.infoafiliadoautedit.TipoDocumento, $scope.infoafiliadoautedit.Documento);
          }, 100);
        }
        swal.close();
      })
    }

    $scope.buscarAutorizacionesDetalle = function (producto, ubicacion) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacionprog.php",
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
     // swal({ title: 'Buscando...' });
     // swal.showLoading();
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
           // swal.close();
            if (response.data.Codigo == "1") {
            
              swal({ title: "Completado", text: response.data.Nombre, showConfirmButton: true, type: "warning" });
             
            } else {
              swal({ title: "Completado", text: response.data.Nombre, showConfirmButton: true, type: "success", timer: 800 });
              $scope.buscarAutorizaciones($scope.autorizacion.documento, $scope.autorizacion.numero, $scope.solicitud.ubicacion);
            }
          })
        }
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

    $scope.tempanno = '';
    $scope.tempmess = '';
    $scope.tempanno4 = '';
    $scope.tempmess4 = '';
    $scope.seleccionaranodias = function () {
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
