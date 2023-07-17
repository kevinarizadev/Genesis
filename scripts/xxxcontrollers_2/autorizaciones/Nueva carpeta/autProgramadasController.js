'use strict';

angular.module('GenesisApp')

  .controller('autProgramadasController', ['$scope', '$http', '$location', '$filter', 'ngDialog', '$timeout', 'pqrHttp', function ($scope, $http, $location, $filter, ngDialog, $timeout, pqrHttp) {

    $(document).ready(function () {
      $('#modaldiagnostico').modal();
      $("#modalips").modal();
      $("#modalproducto").modal();
      $('#modaldetalle').modal();
      $('#modalnovedades').modal();
      $("#modalservicio").modal();
      $("#modaldetalleprograma").modal();
    });


    //variables de control
    $scope.tabI = true;
    $scope.tabII = false;
    $scope.tabIII = false;
    $scope.activeI = 'active final white-text';
    $scope.activeII = 'none';
    $scope.activeIII = 'none';
    $scope.activeIcolor = 'foot4';
    $scope.activeIIcolor = '';
    $scope.activeIIIcolor = '';
    $scope.nametab = 'Autorización';

    // variables TAB I
    //secciones de ng hide
    $scope.inactiveseccion1tab1 = false;
    $scope.inactiveseccion2tab1 = true;
    $scope.activetipotabI = true;
    $scope.productosagregadostabI = [];
    $scope.nofindproductstabI = false;
    $scope.inactimiprestab1 = true;
    $scope.nameservicio = 'de orden'
    $scope.inactivebarrapro = true;



    // wizard

    // variables TAB II
    //secciones de ng hide
    $scope.inactiveseccion1tab3 = false;
    $scope.inactiveseccion2tab3 = true;
    $scope.productosagregadostabI = [];
    $scope.nofindproductstabIII = false;
    // wizard
    $scope.invsolicitudtabI = true;
    $scope.invproductotabI = true;
    $scope.invfinalizartabI = true;
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
      origen: 'E',
      pron_direccion: '0',
      ftp: null
    }

    // variables TAB III
    $scope.invsolicitudtabIII = true;
    $scope.invproductotabIII = true;
    $scope.invfinalizartabIII = true;
    $scope.solicitudproedit = {
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
      cod_adjunto: null,
      accion: 'U',
      origen: 'E',
      pron_direccion: '0',
      ftp: null
    }


    $scope.novedades = null;
    $scope.datosAfiModalNov = null;
    $scope.maxDate = null;
    $scope.autorizacion = { documento: null, numero: null };
    $scope.listContratostab1 = [];
    $scope.listContratostab4 = [];



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

    $scope.init = function () {
      $scope.tabI = true;
      $scope.tabII = false;
      $scope.tabIII = true;
      $scope.activeI = 'active final white-text';
      $scope.activeII = 'none';
      $scope.activeIII = 'none';
      $scope.activeIcolor = '';
      $scope.activeIIcolor = '';
      $scope.activeIIIcolor = '';

    }

    $scope.setTab = function (opcion) {

      $scope.init();

      switch (opcion) {
        case 1:
          $scope.tabI = true;
          $scope.tabII = false;
          $scope.tabIII = false;
          $scope.activeI = 'active final white-text';
          $scope.activeII = 'none';
          $scope.activeIcolor = 'foot4';
          $scope.activeIIcolor = '';
          $scope.activeIIIcolor = '';
          $scope.titletabI = 'Solicitud';
          $scope.tipoaut = '1';
          break;
        case 2:
          $scope.tabII = true;
          $scope.tabI = false;
          $scope.tabIII = false;
          $scope.activeII = 'active final white-text';
          $scope.activeI = 'none';
          $scope.activeIIcolor = 'foot4';
          $scope.activeIcolor = '';
          $scope.activeIIIcolor = '';
          $scope.tipoaut = '2';
          break;
        case 3:
          $scope.tabIII = true;
          $scope.tabII = false;
          $scope.tabI = false;
          $scope.activeI = 'none';
          $scope.activeII = 'none';
          $scope.activeIIIcolor = 'foot4';
          $scope.activeIII = 'active final white-text';
          $scope.activeIcolor = '';
          $scope.activeIIcolor = '';
          $scope.tipoaut = '3';
          if ($scope.verAutorizaciones == false && $scope.verAutorizacionesEdit == false) {
            $scope.inactiveseccion1tab3 = false;
            $scope.getAuts();
          }
          // if ($scope.verAutorizacionesEdit==false) {
          //   $scope.inactiveseccion1tab3 = false;
          // $scope.getAuts();  
          // }
          // if ($scope.tablepro != undefined) {
          //   $scope.tablepro.destroy();
          //   $scope.tablepro = undefined;
          // }
          // if ($scope.table != undefined) {
          //   $scope.table.destroy();
          //   $scope.table = undefined;
          // }
          // $scope.validarAutorizaciones();
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
        } else {
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
    }

    $scope.buscarAfiliado = function (tipo, tipodocumento, documento) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtenerafiliados', tipodocumento: tipodocumento, documento: documento }
      }).then(function (response) {
        if (response.data.CODIGO != "0") {
          if (tipo == '3') {
            $scope.infoafiliadoautedit = [];
            $scope.infoafiliadoautedit = response.data;
            if (response.data.CODIGO == '0') {
              //$scope.informacionmodaledit = 'Afiliado no se encuentra activo en base de datos';
              swal('Importante', response.data.NOMBRE, 'info');
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
              $scope.sexoafitabIII = $scope.infoafiliadoautedit.SexoCodigo;
              $scope.edadafitabIII = $scope.infoafiliadoautedit.EdadDias;
              $scope.regimenafitabIII = $scope.infoafiliadoautedit.CodigoRegimen;
              $scope.datosAfiModalNov = $scope.infoafiliadoautedit;
              $scope.solicitudproedit.email = $scope.infoafiliadoautedit.email;
              $scope.solicitudproedit.celular = $scope.infoafiliadoautedit.Celular1;
              $scope.inactiveseccion2tab3 = false;
              $scope.productosagregadostabIII = [];
              // $scope.listarContratoServicio(sessionStorage.getItem('nit'), $scope.regimenafitabIII, 'Ips asiganda');//faltan parametros
            }

          } else {
            $scope.infoafiliadoautpro = [];
            $scope.infoafiliadoautpro = response.data;
            if (response.data.CODIGO == '0') {
              $scope.informacionmodal = 'Afiliado no se encuentra activo en base de datos';
              $scope.inactiveseccion1tab2 = false;
              $scope.inactiveseccion2tab2 = true;
              swal('Importante', response.data.NOMBRE, 'info');
            } else {
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
              $scope.calcularEdad($scope.infoafiliadoautpro.FechaNacimiento, tipo);
              $scope.sexoafitabI = $scope.infoafiliadoautpro.SexoCodigo;
              $scope.edadafitabI = $scope.infoafiliadoautpro.EdadDias;
              $scope.regimenafitabI = $scope.infoafiliadoautpro.CodigoRegimen;
              $scope.solicitudpro.email = $scope.infoafiliadoautpro.email;
              $scope.solicitudpro.celular = $scope.infoafiliadoautpro.Celular1;
              $scope.datosAfiModalNov = $scope.infoafiliadoautpro;
              $scope.inactiveseccion1tab1 = true;
              $scope.inactiveseccion2tab1 = false;
              $scope.productosagregadostabI = [];
              $scope.listarContratoServicio(sessionStorage.getItem('nit'), $scope.regimenafitabI, 'Ips asiganda');//faltan parametros

              $http({
                method: 'POST',
                url: "php/genesis/inicio.php",
                data: { function: 'actualizable', tipo: tipodocumento, documento: documento }
              }).then(function (response) {
                $scope.respues_actualizar = response.data.mensaje;
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
            }
          }
          // $scope.$apply();
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
        case 'producto':
          $scope.listProductos = [];
          $scope.inactivebarrapro = true;
          $("#modalproducto").modal("open");
          setTimeout(() => {
            $('#modalproducto #proinput').focus();
          }, 100);
          break;
        case 'modalservicio':
          $scope.bservicio = '';
          if ($scope.tipoaut == '1') {
            $scope.solicitudpro.ipscodasignada = sessionStorage.getItem('nit');
            // if (!$scope.solicitudpro.ipscodsolicitante) {
            //   $scope.solicitudpro.ipscodsolicitante = sessionStorage.getItem('nit');  
            // }            
            if ($scope.listContratostab1.length == 1) {
              $scope.listarContratoServicio($scope.solicitudpro.ipscodasignada, $scope.regimenafitabI, 'Ips asiganda');//faltan parametros
              if ($scope.solicitudpro.ipscodasignada) {
                $scope.valservicio = false;
              } else {
                $scope.valservicio = true;
              }
            } else {
              if ($scope.solicitudpro.contrato == undefined) {
                $scope.valservicio = true
              } else {
                $scope.valservicio = false;
              }
            }
          }
          if (($scope.tipoaut == '3')) {
            $scope.solicitudproedit.ipscodasignada = sessionStorage.getItem('nit');
            // $scope.solicitudproedit.ipscodsolicitante = sessionStorage.getItem('nit');            
            if ($scope.listContratostab4.length == 1) {
              $scope.listarContratoServicio($scope.solicitudproedit.ipscodasignada, $scope.regimenafitabIII, 'Ips asiganda');//faltan parametros
              if ($scope.solicitudproedit.ipscodasignada) {
                $scope.valservicio = false;
              } else {
                $scope.valservicio = true;
              }
            } else {
              if ($scope.solicitudproedit.contrato == undefined) {
                $scope.valservicio = true;
              } else {
                $scope.valservicio = false;
              }
            }
          }
          if ($scope.valservicio == true) {
            swal('Importante', 'El contrato no puede estar vacio!', 'info');
          } else {
            $("#modalservicio").modal("open");
            setTimeout(() => {
              $('#modalservicio #servinput').focus();
            }, 100);
          }
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

          if (opcion.ESTADO == 'PROCESADA') {
            $scope.verPrintDetalle = false;
          } else {
            $scope.verPrintDetalle = true;
          }
          $scope.buscarAfiliado('3', opcion.TIPO_DOC, opcion.DOCUMENTO);
          $scope.dAuto = opcion;
          $scope.consultarAutorizacionpro(opcion.NUMERO, opcion.UBICACION, 'C');
          $("#modaldetalle").modal("open");
          break;
        case 'modalnovedades':
          $scope.buscarnovedades();
          $("#modalnovedades").modal("open");
          break;
        case 'ips':
          $scope.inactivebarraips = true;
          $("#modalips").modal("open");
          setTimeout(() => {
            $('#modalips #ipsinput').focus();
          }, 100);

          break;
        default:
      }
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
        default:
      }
    }

    $scope.buscarDiagnostico = function (diag) {
      if ($scope.tipoaut == '1') {
        var sexo = $scope.sexoafitabI;
        var edad = $scope.edadafitabI;
      }
      if (($scope.tipoaut == '3')) {
        var sexo = $scope.sexoafitabIII;
        var edad = $scope.edadafitabIII;
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
          function: 'obtener_capita', documento: $scope.datosAfiModalNov.Documento,
          tipodocumento: $scope.datosAfiModalNov.TipoDocumento
        }
      }).then(function (response) {
        $scope.capita = response.data;
      })
    }

    $scope.seleccionardiagnostico = function (data, tipo) {
      var text = "";
      if ($scope.tipoaut == '1') {
        if (tipo == 'P') {
          $scope.solicitudpro.diagnom1 = data.Nombre;
          $scope.solicitudpro.diagcod1 = data.Codigo;
          text = 'Principal';
        } else {
          $scope.solicitudpro.diagnom2 = data.Nombre;
          $scope.solicitudpro.diagcod2 = data.Codigo;
          text = 'Secundario';
          $("#modaldiagnostico").modal("close");
        }
      }
      if ($scope.tipoaut == '3') {
        if (tipo == 'P') {
          $scope.solicitudproedit.diagnom1 = data.Nombre;
          $scope.solicitudproedit.diagcod1 = data.Codigo;
          text = 'Principal';
        } else {
          $scope.solicitudproedit.diagnom2 = data.Nombre;
          $scope.solicitudproedit.diagcod2 = data.Codigo;
          text = 'Secundario';
          $("#modaldiagnostico").modal("close");
        }
      }
      swal({ title: "Completado", text: "Diagnostico " + text + " Registrado", showConfirmButton: false, type: "success", timer: 800 });
    }

    $scope.listarContratoServicio = function (ips, regimen, text) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtenerContratos', nit: ips, regimen: regimen }
      }).then(function (response) {
        if ($scope.tipoaut == '1') {
          $scope.listContratostab1 = response.data;
        } else {
          $scope.listContratostab4 = response.data;
        }
        if (response.data["0"].CODIGO == '1') {
          var contrato = response.data["0"].NUMERO;
          function getservicios(contrato) {
            $http({
              method: 'POST',
              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
              data: { function: 'obtenerServiciosips', contrato: contrato, tipo: 'P' }
            }).then(function (response) {
              $scope.listServicios = response.data;
            })
          }
          if ($scope.tipoaut == '1') {
            $scope.solicitudpro.contrato = response.data["0"].NUMERO;
            $scope.solicitudpro.contratoDocumento = response.data["0"].DOCUMENTO;
            $scope.solicitudpro.contratoUbicacion = response.data["0"].UBICACION;
            if ($scope.listContratostab1.length == 1) {
              getservicios(contrato);
            }
          } else {
            $scope.solicitudproedit.contrato = response.data["0"].NUMERO;
            $scope.solicitudproedit.contratoDocumento = response.data["0"].DOCUMENTO;
            $scope.solicitudproedit.contratoUbicacion = response.data["0"].UBICACION;
            if ($scope.listContratostab4.length == 1) {
              getservicios(contrato);
            }
          }
        } else {
          $scope.listServicios = '';
          swal({ title: "Completado", text: 'IPS no tiene contrato', showConfirmButton: true, type: "success" });
        }
      })
    }
    /*    $scope.obtenerServiciosTabI = function (contrato, tab) {
          if (contrato) {
            $http({
              method: 'POST',
              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
              data: { function: 'obtenerServiciosips', contrato: contrato, tipo: 'P' }
            }).then(function (response) {
              $scope.listServicios = response.data;
            })
          }
        }*/

    $scope.obtenerServiciosTabI = function (contrato, tab) {
      function getservicios(contrato) {
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: { function: 'obtenerServiciosips', contrato: contrato, tipo: 'P' }
        }).then(function (response) {
          $scope.listServicios = response.data;
        })
      }
      if (contrato) {
        getservicios(contrato);
        if ($scope.tipoaut == '1') {
          if ($scope.listContratostab1.length > 1) {
            const { DOCUMENTO, UBICACION } = $scope.listContratostab1.find(item => item.NUMERO == contrato)
            $scope.solicitudpro.contratoDocumento = DOCUMENTO;
            $scope.solicitudpro.contratoUbicacion = UBICACION;
          }


        } else {
          if ($scope.listContratostab4.length > 1) {
            const { DOCUMENTO, UBICACION } = $scope.listContratostab4.find(item => item.NUMERO == contrato)
            $scope.solicitudproedit.contratoDocumento = DOCUMENTO;
            $scope.solicitudproedit.contratoUbicacion = UBICACION;
          }
        }
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: { function: 'obtenerServiciosips', contrato: contrato, tipo: 'P' }
        }).then(function (response) {
          $scope.listServicios = response.data;
        })
      }
    }


    $scope.buscarProducto = function (pro) {
      if ($scope.buscarpro.length >= 4) {
        if ($scope.tipoaut == '1') {
          var regimen = $scope.regimenafitabI;
          var contrato = $scope.solicitudpro.contrato;
          var servicio = $scope.solicitudpro.codservicio;
          var tipo = 'S';
          var ubicacion = 'H';
          var sexo = $scope.sexoafitabI;
          var edad = $scope.edadafitabI;
        } else {
          var regimen = $scope.regimenafitabIII;
          var contrato = $scope.solicitudproedit.contrato;
          var servicio = $scope.solicitudproedit.codservicio;
          var tipo = 'S';
          var ubicacion = 'H';
          var sexo = $scope.sexoafitabIII;
          var edad = $scope.edadafitabIII;
        }

        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: { function: 'obtenerProducto', regimen: regimen, contrato: contrato, producto: $scope.buscarpro, clasificacion: servicio, tipo: tipo, ubicacion: ubicacion, edad: edad, sexo: sexo, tipo: 'S' }
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


    $scope.tempProd = '';
    $scope.seleccionarproducto = function (data) {
      $scope.tempProd = data;
      swal({
        title: 'Ingrese la cantidad',
        input: 'number',
        inputValue: 1,
        inputAttributes: {
          min: 1,
          max: 99
        },
        showCancelButton: true
      }).then(function (result) {
        if (result > 0) {
          data.CANTIDAD = result;
          if ($scope.tipoaut == '1') {
            if ($scope.productosagregadostabI.length == 0) {
              $scope.productosagregadostabI.push(data);
            } else {
              var comp = 0;
              for (let index = 0; index < $scope.productosagregadostabI.length; index++) {
                const element = $scope.productosagregadostabI[index];
                if (element.CODIGO == data.CODIGO) {
                  var pindex = index;
                  comp = 1;
                  break;
                } else {
                  comp = 0;
                }
              }
              if (comp == 0) {
                $scope.productosagregadostabI.push(data);
              } else {
                $scope.productosagregadostabI[pindex].CANTIDAD = data.CANTIDAD;
              }
            }
            if ($scope.productosagregadostabI.length == 0)
              $scope.nofindproductstabI = false;
            else
              $scope.nofindproductstabI = true;

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
                  var val = $scope.listMotivos[i].NUMERO_H + ' - ' + $scope.listMotivos[i].NOMBRE_H;
                  $scope.array[val] = val;
                }

                swal({
                  title: 'Seleccionar SubCategoria',
                  input: 'select',
                  inputOptions: $scope.array,
                  inputPlaceholder: 'Seleccionar',
                  showCancelButton: true,
                  inputValidator: function (value) {
                    return new Promise(function (resolve, reject) {
                      if (value !== '') {
                        resolve();
                      } else {
                        reject('Debes Selecionar una SubCategoria');
                      }
                    });
                  }
                }).then(function (result) {
                  $scope.tempsubcla = result.split('-');
                  if (result) {
                    const filteredItems = $scope.productosagregadostabI.findIndex(item => item == $scope.tempProd);
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
                      html: 'Producto  y SubCategoria Seleccionados',
                      type: 'success',
                    });

                  }
                });
              })

            } else {
              swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success", timer: 800 });
            }
          } else {
            if ($scope.productosagregadostabIII.length == 0) {
              $scope.productosagregadostabIII.push(data);
            } else {
              var comp = 0;
              for (let index = 0; index < $scope.productosagregadostabIII.length; index++) {
                const element = $scope.productosagregadostabIII[index];
                if (element.CODIGO == data.CODIGO) {
                  var pindex = index;
                  comp = 1;
                  break;
                } else {
                  comp = 0;
                }
              }
              if (comp == 0) {
                $scope.productosagregadostabIII.push(data);
              } else {
                $scope.productosagregadostabIII[pindex].CANTIDAD = data.CANTIDAD;
              }
            }
            if ($scope.productosagregadostabIII.length == 0)
              $scope.nofindproductstabIII = false;
            else
              $scope.nofindproductstabIII = true;


            if ($scope.tempProd.SUBCLAS == 'S') {
              $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: {
                  function: 'p_mostrar_hijos_epro_valor',
                  cups: $scope.tempProd.CODIGO,
                  regimen: $scope.solicitudproedit.contratoDocumento,
                  contrato: $scope.solicitudproedit.contrato,
                  ubicacion: $scope.solicitudproedit.contratoUbicacion
                }
              }).then(function (res) {
                $scope.listMotivos = res.data;
                $scope.templistMotivos = res.data;
                $scope.array = { 99999: "NO APLICA SUBCATEGORIA" };
                for (var i = 0; i < $scope.listMotivos.length; i++) {
                  var val = $scope.listMotivos[i].NUMERO_H + ' - ' + $scope.listMotivos[i].NOMBRE_H;
                  $scope.array[val] = val;
                }
                swal({
                  title: 'Seleccionar SubCategoria',
                  input: 'select',
                  inputOptions: $scope.array,
                  inputPlaceholder: 'Seleccionar',
                  showCancelButton: true,
                  inputValidator: function (value) {
                    return new Promise(function (resolve, reject) {
                      if (value !== '') {
                        resolve();
                      } else {
                        reject('Debes Selecionar una SubCategoria');
                      }
                    });
                  }
                }).then(function (result) {

                  $scope.tempsubcla = result.split('-');
                  if (result) {
                    const filteredItems = $scope.productosagregadostabIII.findIndex(item => item == $scope.tempProd);

                    if ($scope.tempsubcla[0] == '99999') {
                      $scope.productosagregadostabIII[filteredItems].SUBCLASN = 'N';
                    } else {
                      $scope.productosagregadostabIII[filteredItems].SUBCLASN = 'S';

                      const filteredMotivos = $scope.templistMotivos.find(item => item.NUMERO_H == ($scope.tempsubcla[0]));
                      $scope.productosagregadostabIII[filteredItems].SUBCLASCOD = filteredMotivos.NUMERO_H;
                      $scope.productosagregadostabIII[filteredItems].SUBCLASNOM = filteredMotivos.NOMBRE_H;
                      $scope.productosagregadostabIII[filteredItems].VALORP = filteredMotivos.VALOR;
                    }

                    $scope.$apply();
                    swal({
                      title: "Completado",
                      html: 'Producto  y SubCategoria Seleccionados',
                      type: 'success',
                    });
                  }
                });
              })

            } else {
              swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success", timer: 800 });
            }
          }
          $scope.$apply();

        } else {
          swal('Importante', 'Cantidad Incorrecta', 'info')
        }
      })
    }
    $scope.eliminarProducto = function (index, tipo) {
      if (tipo == "1") {

        $scope.productosagregadostabI.splice(index, 1);
        if ($scope.productosagregadostabI.length == 0)
          $scope.nofindproductstabI = false;
        else
          $scope.nofindproductstabI = true;
      } else {
        $scope.productosagregadostabIII.splice(index, 1);
        if ($scope.productosagregadostabIII.length == 0)
          $scope.nofindproductstabIII = false;
        else
          $scope.nofindproductstabIII = true;
      }

      swal({ title: "Completado", text: "Producto Retirado.", showConfirmButton: false, type: "info", timer: 800 })

    }
    $scope.seleccionarservicio = function (data, tipo) {
      var text = ''
      $scope.bservicio = '';

      if ($scope.tipoaut == '1') {
        $scope.solicitudpro.servicio = data.CODIGO + ' - ' + data.NOMBRE;
        $scope.solicitudpro.codservicio = data.CODIGO;
        text = 'Servicio Seleccionado Correctamente!';
        swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        $scope.closemodals('modalservicio');
      }
      if ($scope.tipoaut == '3') {
        $scope.solicitudproedit.servicio = data.CODIGO + '-' + data.NOMBRE;
        $scope.solicitudproedit.codservicio = data.CODIGO;
        text = 'Servicio Seleccionado Correctamente!';
        swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        $scope.closemodals('modalservicio');
      }

    }

    $scope.limpiar = function (tab) {
      switch (tab) {
        case '1':
          //secciones de ng hide
          $scope.inactiveseccion1tab1 = false;
          $scope.inactiveseccion2tab1 = true;
          $scope.productosagregadostabI = [];
          $scope.nofindproductstabI = false;
          // wizard
          $scope.invsolicitudtabI = true;
          $scope.invproductotabI = true;
          $scope.invfinalizartabI = true;
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
            origen: 'E',
            pron_direccion: '0',
            ftp: null
          }

          $scope.datatb1 = { formato: null, requiredFile: true };
          document.getElementById('inputFilePlaceHolder1').value = "";

          $("#btn-solicitudtabI").removeClass("activebtn-step donebtn-step");
          $("#btn-finalizartabI").removeClass("activebtn-step donebtn-step");
          $("#btn-productotabI").addClass("grey");
          $("#btn-finalizartabI").addClass("grey");
          $scope.pasostabI('1');
          break;
        case '3':
          //secciones de ng hide
          $scope.inactiveseccion1tab3 = false;
          $scope.inactiveseccion2tab3 = true;
          $scope.productosagregadostabIII = [];
          $scope.nofindproductstabIII = false;
          // wizard
          $scope.invsolicitudtabIII = true;
          $scope.invproductotabIII = true;
          $scope.invfinalizartabIII = true;
          $scope.solicitudproedit = {
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
            accion: 'U',
            origen: 'E',
            pron_direccion: '0',
            ftp: null
          }
          $("#btn-solicitudtabIII").removeClass("activebtn-step donebtn-step");
          $("#btn-finalizartabIII").removeClass("activebtn-step donebtn-step");
          $("#btn-productotabIII").addClass("grey");
          $("#btn-finalizartabIII").addClass("grey");
          $scope.datatb3 = { formato: null, requiredFile: true };
          document.getElementById('inputFilePlaceHolder3').value = "";
          $scope.pasostabIII('1');
          break;
        case '4':
          $scope.verAutorizaciones = false;
          $scope.verAutorizacionesEdit = false;
          $scope.inactiveseccion1tab3 = false;
          $scope.numautprocesada = null;
          $scope.numautprocesadaIV = null;
          $scope.ubicacionPrint = null;
          $scope.solicitudproedit = {
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
            accion: 'U',
            origen: 'E',
            pron_direccion: '0',
            ftp: null
          }

          $("#btn-solicitudtabIII").removeClass("activebtn-step donebtn-step");
          $("#btn-finalizartabIII").removeClass("activebtn-step donebtn-step");
          $("#btn-productotabIII").addClass("grey");
          $("#btn-finalizartabIII").addClass("grey");
          $scope.datatb3 = { formato: null, requiredFile: true };
          document.getElementById('inputFilePlaceHolder3').value = "";
          $scope.pasostabIII('1');
          // $scope.setTab('3');
          break;
        case '5':
          $scope.verAutorizaciones = true;
          $scope.verAutorizacionesEdit = false;
          $scope.inactiveseccion4tab4 = false;
          $scope.autorizacion.documento = null;
          $scope.check_option = false;
          break;
        default:
      }
    }

    // Funciones TABI

    $scope.verPrint = true;
    $scope.sumPrint = 0;
    $scope.printAut = function (tab) {
      setTimeout(() => {
        // if (tab == '1') {
        //$scope.sumPrint = $scope.sumPrint + 1;
        // }        
        //if ($scope.sumPrint > 2) {
        //  swal({ title: "No Completado", text: 'No se puede imprimir la autorización mas de 2 veces!', showConfirmButton: true, type: "warning" });
        //  } else {
        window.open('views/autorizaciones/formatoautorizacionPrint.php?numero=' + $scope.numautprocesada + '&ubicacion=' + $scope.ubicacionPrint, '_blank');
        //}
      }, 100);
    }


    $scope.printautmodPro = function (num, ubi) {
      window.open('views/autorizaciones/formatoautorizacionPrint.php?numero=' + num + '&ubicacion=' + ubi, '_blank');
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
          if ($scope.pasarsolicitudautprog == true) {
            $("#btn-productotabI").removeClass("grey");
            $scope.invsolicitudtabI = true;
            $scope.invproductotabI = false;
            $scope.titletabI = 'Producto';
          } else {
            swal('Importante', $scope.textvalidate, 'info');
          }
          break;
        case '-2':
          $("#btn-finalizartabI").addClass("grey");
          $scope.invproductotabI = false;
          $scope.titletabI = 'Producto';
          $scope.invfinalizartabI = true;
          break;
        case '3':
          $scope.validartabI('producto');
          if ($scope.pasarproductoautprog == true) {
            $("#btn-finalizartabI").removeClass("grey");
            $scope.invproductotabI = true;
            $scope.invfinalizartabI = false;
            $scope.titletabI = 'Finalizar';
            break;
          } else {
            swal('Importante', 'Debe agregar un producto', 'info')
          }
        default:
      }
    }

    $scope.pasostabI('1');
    $scope.finalizartabI = function () {
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
          $scope.validartabI('datosafiliado');
          if ($scope.pasardatosafiliadoprog == true) {
            $scope.solicitudpro.ubicacion = sessionStorage.getItem('ubicacion');
            $scope.solicitudpro.fecsolicitudparseada = formatDate($scope.solicitudpro.fecsolicitud);
            $scope.solicitudpro.fecprogramacionparseada = formatDate($scope.solicitudpro.fecprogramacion);

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
                var dataproductos = JSON.stringify($scope.productosagregadostabI);
                $http({
                  method: 'POST',
                  url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                  data: { function: 'insertarDetalle', productos: dataproductos, cantidad: $scope.productosagregadostabI.length, numero: $scope.respuesta.Numero, ubicacion: $scope.respuesta.Ubicacion, accion: 'I' }
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
                        $scope.subirAdjunto(JSON.stringify({ 'ARCHIVO': response.data }));
                      })
                    }
                    setTimeout(function () {
                      $scope.limpiar('1');
                      $scope.$apply();
                      swal({ title: "Completado", text: response.data.fecha, type: "success" });
                    }, 500);
                  } else {
                    swal({ title: "Importante", text: response.data.Nombre, type: "info" });
                  }
                })
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
    $scope.textvalidate = "Complete los campos requeridos (*)";
    $scope.validartabI = function (tipo) {
      $scope.pasarsolicitudautprog = true;
      $scope.pasarproductoautprog = true;
      $scope.pasardatosafiliadoprog = true;
      switch (tipo) {
        case 'solicitud':
          if ($scope.solicitudpro.diagnom1 == '' || $scope.solicitudpro.diagnom1 == undefined) {
            $scope.pasarsolicitudautprog = false;
          } else if ($scope.solicitudpro.ipssolicitante == '' || $scope.solicitudpro.ipssolicitante == undefined) {
            $scope.pasarsolicitudautprog = false;
          } else if ($scope.solicitudpro.fecsolicitud == '' || $scope.solicitudpro.fecsolicitud == undefined) {
            $scope.pasarsolicitudautprog = false;
          } else if ($scope.solicitudpro.fecprogramacion == '' || $scope.solicitudpro.fecprogramacion == undefined || $scope.solicitudpro.fecprogramacion == null) {
            $scope.pasarsolicitudautprog = false;
          } else if ($scope.solicitudpro.servicio == '' || $scope.solicitudpro.servicio == undefined) {
            $scope.pasarsolicitudautprog = false;
          } else if ($scope.solicitudpro.justificacion == '' || $scope.solicitudpro.justificacion == undefined) {
            $scope.pasarsolicitudautprog = false;
          } else if ($scope.solicitudpro.justificacion.length < 30 || $scope.solicitudpro.justificacion.length > 500) {
            $scope.pasarsolicitudautprog = false;
            $scope.textvalidate = "La justificación debe tener como minimo 30  y maximo 500 caracteres";
          }
          if ($scope.datatb1.requiredFile == true) {
            $scope.textvalidate = $scope.solicitudpro.file == null ? $scope.textvalidate : $scope.datatb1.formato;
            $scope.pasarsolicitudautprog = false;
          }
          break;
        case 'producto':
          if ($scope.productosagregadostabI.length == 0 || $scope.productosagregadostabI == undefined) { $scope.pasarproductoautprog = false; }
          break;
        case 'solicitudedit':
          if ($scope.solicitudproedit.diagnom1 == '' || $scope.solicitudproedit.diagnom1 == undefined) {
            $scope.pasarsolicitudautprog = false;
          } else if ($scope.solicitudproedit.ipssolicitante == '' || $scope.solicitudproedit.ipssolicitante == undefined) {
            $scope.pasarsolicitudautprog = false;
          } else if ($scope.solicitudproedit.fecsolicitud == '' || $scope.solicitudproedit.fecsolicitud == undefined) {
            $scope.pasarsolicitudautprog = false;
          } else if ($scope.solicitudproedit.fecprogramacion == '' || $scope.solicitudproedit.fecprogramacion == undefined || $scope.solicitudproedit.fecprogramacion == null) {
            $scope.pasarsolicitudautprog = false;
          } else if ($scope.solicitudproedit.servicio == '' || $scope.solicitudproedit.servicio == undefined) {
            $scope.pasarsolicitudautprog = false;
          } else if ($scope.solicitudproedit.justificacion == '' || $scope.solicitudproedit.justificacion == undefined) {
            $scope.pasarsolicitudautprog = false;
          } else if ($scope.solicitudproedit.justificacion.length < 30 || $scope.solicitudproedit.justificacion.length > 500) {
            $scope.pasarsolicitudautprog = false;
            $scope.textvalidate = "La justificación debe tener como minimo 30  y maximo 500 caracteres";
          } else if ($scope.datatb3.requiredFile == true) {
            $scope.textvalidate = $scope.solicitudproedit.file == null ? $scope.textvalidate : $scope.datatb3.formato;
            $scope.pasarsolicitudautprog = false;
          }
          break;
        case 'productoedit':
          if ($scope.productosagregadostabIII.length == 0 || $scope.productosagregadostabIII == undefined) { $scope.pasarproductoautprog = false; }
          break;
        case 'datosafiliado':
          // if ($scope.solicitudpro.email == '' || $scope.solicitudpro.email == undefined) { $scope.pasardatosafiliadoprog = false; }
          if ($scope.solicitudpro.celular == '' || $scope.solicitudpro.celular == undefined) { $scope.pasardatosafiliadoprog = false; }
          // if ($scope.solicitudpro.direccion == '' || $scope.solicitudpro.direccion == undefined) { $scope.pasardatosafiliadoprog = false; }
          break;
        case 'datosafiliadoedit':
          // if ($scope.solicitudproedit.email == '' || $scope.solicitudproedit.email == undefined) { $scope.pasardatosafiliadoprog = false; }
          if ($scope.solicitudproedit.celular == '' || $scope.solicitudproedit.celular == undefined) { $scope.pasardatosafiliadoprog = false; }
          // if ($scope.solicitudproedit.direccion == '' || $scope.solicitudproedit.direccion == undefined) { $scope.pasardatosafiliadoprog = false; }
          break;
        default:
      }
    }


    // FUNCIONES TABIII
    $scope.pasostabIII = function (op) {
      switch (op) {
        case '1':
          $("#btn-solicitudtabIII").removeClass("grey");
          $scope.invsolicitudtabIII = false;
          $scope.titletabIII = 'Solicitud';
          break;
        case '-1':
          $("#btn-productotabIII").addClass("grey");
          $scope.invsolicitudtabIII = false;
          $scope.titletabIII = 'Solicitud';
          $scope.invproductotabIII = true;
          break;
        case '2':
          $scope.validartabI('solicitudedit');
          if ($scope.pasarsolicitudautprog == true) {
            $("#btn-productotabIII").removeClass("grey");
            $scope.invsolicitudtabIII = true;
            $scope.invproductotabIII = false;
            $scope.titletabIII = 'Producto';
          } else {
            swal('Importante', $scope.textvalidate, 'info')
          }
          break;
        case '-2':
          $("#btn-finalizartabIII").addClass("grey");
          $scope.invproductotabIII = false;
          $scope.titletabIII = 'Producto';
          $scope.invfinalizartabIII = true;
          break;
        case '3':
          $scope.validartabI('productoedit');
          if ($scope.pasarproductoautprog == true) {
            $("#btn-finalizartabIII").removeClass("grey");
            $scope.invproductotabIII = true;
            $scope.invfinalizartabIII = false;
            $scope.titletabIII = 'Finalizar';
            break;
          } else {
            swal('Importante', 'Debe agregar un producto', 'info')
          }
        default:
      }
    }

    $scope.pasostabIII('1');

    $scope.viewdataAut = true;
    $scope.viewdataAutprog = true;
    $scope.verAutorizaciones = false;
    $scope.verAutorizacionesEdit = false;
    $scope.inactivebarraproedit = true;
    $scope.listarAutorizacionesprogTemp = [];
    $scope.req = true;
    $scope.buscarAutorizaciones = function (document, numero, ubicacion) {
      // $scope.check_option_2 = false;
      if ($scope.check_option == true) {
        if (document == undefined) {
          swal('Genesis informa', 'El documento del afiliado no puede estar vacio!', 'warning');
          $scope.req = true;
        } else {
          $scope.req = false;
        }
        numero = 0;
        ubicacion = 0;
      }


      if ($scope.check_option == false) {
        if (numero == undefined) {
          swal('Genesis informa', 'El numero de la autorizacion no puede estar vacio!', 'warning');
          $scope.req = true;
        }
        if (ubicacion == undefined) {
          swal('Genesis informa', 'La ubicacion de la autorizacion no puede estar vacia!', 'warning');
          $scope.req = true;
        }

        if (numero && ubicacion) {
          $scope.req = false;
          document = 0;
        }
      }

      if ($scope.req == false) {
        swal({ title: 'Buscando...' });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: { function: 'obtener_aut_ips', documento: document, numero: numero, ubicacion: ubicacion, nit: sessionStorage.getItem('nit') }
        }).then(function (response) {
          $scope.verAutorizaciones = false;
          swal.close();
          $scope.listarAutorizaciones = [];
          $scope.listarAutorizacionesprog = [];
          $scope.listarAutorizaciones = response.data.ordinaria;
          $scope.listarAutorizacionesprog = response.data.programada;
          $scope.validarAutorizaciones();
        })
      }

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
        $scope.v_encabezadov = response.data.cabeza;
        $scope.v_detallev = response.data.detalle;
        if (accion == 'C') {
          if ($scope.v_detallev.length == 0) {

            $scope.v_detallev = [];
          }
          if ($scope.v_encabezadov.ESTADO == 'A' || $scope.v_encabezadov.ESTADO == 'X') {
            $scope.verPrintDetalle = true;
          } else {
            $scope.verAutorizaciones = false;
            $scope.numautprocesada = $scope.v_encabezadov.NUM_OASIS;
            $scope.ubicacionPrint = $scope.v_encabezadov.UBI_OASIS;
            // if ($scope.v_encabezadov.IMPRESION == 'false') {
            // $scope.verPrintDetalle = true;
            //}
            // if ($scope.v_encabezadov.IMPRESION == 'true') {
            $scope.verPrintDetalle = false;
            //}
          }
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


    $scope.removeDiagnostico = function (params) {
      switch (params) {
        case 't1':
          $scope.solicitudpro.diagnom2 = '';
          break;
        case 't3':
          $scope.solicitudproedit.diagnom2 = '';
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
            $scope.solicitudpro.tipodocumento = $scope.type;
            $scope.solicitudpro.documento = $scope.id;
            $scope.buscarAfiliado('1', $scope.solicitudpro.tipodocumento, $scope.solicitudpro.documento);
          }
          if (($scope.tipoaut == '4')) {
            $scope.buscarAutorizaciones($scope.id, '', '');
          }
        }
      });
    }

    $scope.finalizartabIII = function () {
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

          $scope.validartabI('datosafiliadoedit');
          if ($scope.pasardatosafiliadoprog == true) {
            //$scope.solicitudproedit.ubicacion = sessionStorage.getItem('ubicacion');
            $scope.solicitudproedit.fecsolicitudparseada = formatDate($scope.solicitudproedit.fecsolicitud);
            $scope.solicitudproedit.fecprogramacionparseada = formatDate($scope.solicitudproedit.fecprogramacion);
            if ($scope.solicitudproedit.ext) {
              $scope.solicitudproedit.ftp = 3;
            } else {
              $scope.solicitudproedit.ftp = null;
            }
            var data = JSON.stringify($scope.solicitudproedit);
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
                var dataproductos = JSON.stringify($scope.productosagregadostabIII);
                $http({
                  method: 'POST',
                  url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                  data: { function: 'insertarDetalle', productos: dataproductos, cantidad: $scope.productosagregadostabIII.length, numero: $scope.respuesta.Numero, ubicacion: $scope.respuesta.Ubicacion, accion: 'U' }
                }).then(function (response) {
                  swal.close();
                  $scope.respuestaup = response.data;
                  if ($scope.respuestaup.codigo == '1') {
                    if ($scope.solicitudproedit.cod_adjunto && $scope.solicitudproedit.file) {
                      $http({
                        method: 'POST',
                        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                        data: {
                          function: 'subirArchivoAut', file: $scope.solicitudproedit.file,
                          ext: $scope.solicitudproedit.ext,
                          num: $scope.numautprocesada,
                          ubicacion: $scope.respuesta.Ubicacion,
                          namefile: $scope.solicitudproedit.namefile
                        }
                      }).then(function (response) {
                        $scope.subirAdjuntoUpdate(response.data);
                      })
                    }
                    if (($scope.solicitudproedit.cod_adjunto == null || $scope.solicitudproedit.cod_adjunto == '') && $scope.solicitudproedit.ext) {
                      if ($scope.solicitudproedit.ext) {
                        $http({
                          method: 'POST',
                          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                          data: {
                            function: 'subirArchivoAut', file: $scope.solicitudproedit.file,
                            ext: $scope.solicitudproedit.ext,
                            num: $scope.numautprocesada,
                            ubicacion: $scope.respuesta.Ubicacion,
                            namefile: $scope.solicitudproedit.namefile
                          }
                        }).then(function (response) {
                          $scope.subirAdjunto(JSON.stringify({ 'ARCHIVO': response.data }));
                        })
                      }
                    }
                    $("#btn-finalizartabIII").removeClass("activebtn-step").addClass("donebtn-step");
                    setTimeout(function () {
                      swal({ title: "Completado", text: $scope.respuestaup.fecha, type: "success", }).then(function (res) {
                        setTimeout(() => {
                          $scope.closemodals('modalmotivosanular');
                          $scope.limpiar('4');
                          $scope.$apply();
                          $scope.getAuts();
                        }, 100);
                      });

                    }, 500);
                  } else {
                    swal({ title: "Importante", text: $scope.respuesta.Nombre, type: "info" });
                  }
                })
              } else {
                swal({ title: "Importante", text: $scope.respuesta.Nombre, type: "info" });
              }
            })

          } else {
            swal('Importante', $scope.textvalidate, 'info')
          }
        }
      })
    }



    // Funciones TABII
    $scope.inactivepro = true;
    $scope.inactivepro2 = true;
    $scope.findProducto = function (find) {
      if (find != undefined) {
        if (find.length > 4) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: { function: 'BuscarProductoIps', coincidencia: find }
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

    $scope.accionTabIII = function (aut) {
      $scope.buscarAfiliado('3', aut.TIPO_DOC, aut.DOCUMENTO);
      $scope.consultarAutorizacionpro(aut.NUMERO, aut.UBICACION, 'E');
      $scope.regimentabIII = aut.COD_REGIMEN;
      $scope.contratotabIII = aut.CONTRATO;
      $scope.solicitudproedit.tipodocumento = aut.TIPO_DOC;
      $scope.solicitudproedit.documento = aut.DOCUMENTO;
      $scope.solicitudproedit.contrato = $scope.contratotabIII;
      $scope.ubicaciontabIII = aut.UBI_PACIENTE;
      $scope.serviciotabIII = aut.CLASIFICACION;
      $scope.inactivebarraproedit = true;
      setTimeout(() => {
        $scope.verAutorizacionesEdit = true;
        $scope.verAutorizaciones = true;
        $scope.inactiveseccion1tab3 = true;
        $scope.invfinalizartabIV = true;
        $scope.invfinalizartabIII = true;
        $scope.verPrintIV = false;
        $scope.invproductotabIII = true;
      }, 100);
      // break;
    }

    $scope.datatb1 = { formato: null, requiredFile: true };
    $scope.datatb3 = { formato: null, requiredFile: true };
    //Functions in jquery
    $('#solprofile').change(function () {//Detecta los cambios que sufre el input file            
      $timeout(function () {//Usado para validar el file en tiempo real
        var file = document.getElementById('solprofile').files[0];//Obtiene el file del input para validarlo
        $scope.datatb1.formato = '';
        if (file) {//Valida si existe el archivo en el input file
          if (file.size <= 5000000) {//valida que el size del file sea <= 5 mb                                                         
            if (file.name.split('.').pop().toLowerCase() == 'pdf') {//Obtiene la extension del file y valida que sea un pdf                      
              $scope.datatb1.formato = 'Dentro Del Peso Limite y Formato Validado';
              $scope.datatb1.requiredFile = false;
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
              $scope.datatb1.formato = 'Formato Invalido solo puedes adjuntar archivos con extensión .pdf';
              $scope.solicitudpro.file = null;
              $scope.solicitudpro.namefile = null;//Asigna null al ng-model autFile  
              $scope.solicitudpro.ext = null;//Asigna null a la extension autFile 

            }
          } else {
            $scope.datatb1.requiredFile = true;
            $scope.datatb1.formato = 'Limite de Peso Excedido';
            $scope.solicitudpro.file = null;
            $scope.solicitudpro.namefile = null;//Asigna null al ng-model autFile   
            $scope.solicitudpro.ext = null;//Asigna null a la extension autFile   

          }
        } else {
          $scope.datatb1.requiredFile = true;
          $scope.datatb1.formato = null;
          $scope.solicitudpro.file = null;
          $scope.solicitudpro.namefile = null;//Asigna null al ng-model autFile   
          $scope.solicitudpro.ext = null;//Asigna null a la extension autFile 

        }
      }, 100);
    })

    $('#solprofiledit').change(function () {//Detecta los cambios que sufre el input file            
      $timeout(function () {//Usado para validar el file en tiempo real
        var file = document.getElementById('solprofiledit').files[0];//Obtiene el file del input para validarlo
        $scope.datatb3.formato = '';
        if (file) {//Valida si existe el archivo en el input file
          if (file.size <= 5000000) {//valida que el size del file sea <= 5 mb                                                         
            if (file.name.split('.').pop().toLowerCase() == 'pdf') {//Obtiene la extension del file y valida que sea un pdf                      
              $scope.datatb3.formato = 'Dentro Del Peso Limite y Formato Validado';
              $scope.datatb3.requiredFile = false;
              var reader = new FileReader();
              reader.onload = function (event) {
                $timeout(function () {
                  $scope.solicitudproedit.file = event.target.result; //Asigna el file al ng-model autFile
                  $scope.solicitudproedit.ext = file.name.split('.').pop().toLowerCase();//Asigna la extension del autFile
                  $scope.solicitudproedit.namefile = file.name.substr(0, file.name.lastIndexOf('.'));    //Asigna el nombre del autFile                 
                })
              };
              reader.readAsDataURL(file);
            } else {
              $scope.solicitudproedit.requiredFile = true;
              $scope.datatb3.formato = 'Formato Invalido solo puedes adjuntar archivos con extensión .pdf';
              $scope.solicitudproedit.file = null;
              $scope.solicitudproedit.namefile = null;//Asigna null al ng-model autFile  
              $scope.solicitudproedit.ext = null;//Asigna null a la extension autFile 

            }
          } else {
            $scope.datatb3.requiredFile = true;
            $scope.datatb3.formato = 'Limite de Peso Excedido';
            $scope.solicitudproedit.file = null;
            $scope.solicitudproedit.namefile = null;//Asigna null al ng-model autFile   
            $scope.solicitudproedit.ext = null;//Asigna null a la extension autFile   

          }
        } else {
          $scope.datatb3.requiredFile = true;
          $scope.datatb3.formato = null;
          $scope.solicitudproedit.file = null;
          $scope.solicitudproedit.namefile = null;//Asigna null al ng-model autFile   
          $scope.solicitudproedit.ext = null;//Asigna null a la extension autFile 

        }
      }, 100);
    })


    $scope.subirAdjunto = function (vfile) {
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


    $scope.subirAdjuntoUpdate = function (vfile) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: {
          function: 'acualizarAdjuntopro',
          codadjunto: $scope.solicitudproedit.cod_adjunto,
          ruta: vfile,
          num: $scope.numautprocesada,
          ubicacion: $scope.respuesta.Ubicacion,

        }
      }).then(function (response) {
        console.log(response.data);
      })
    }

    $scope.getAuts = function () {
      $scope.listarAutorizaciones = [];
      $scope.listarAutorizacionesprog = [];
      if ($scope.tablepro != undefined) {
        $scope.tablepro.destroy();
        $scope.tablepro = undefined;
      }
      if ($scope.table != undefined) {
        $scope.table.destroy();
        $scope.table = undefined;
      }
      swal({ title: 'Cargando...' });
      swal.showLoading();
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: {
          function: 'obtener_aut_ips',
          nit: sessionStorage.getItem('nit'),
          documento: 0,
          numero: 0,
          ubicacion: 0
        }
      }).then(function (response) {
        $scope.listarAutorizaciones = response.data.ordinaria;
        $scope.listarAutorizacionesprog = response.data.programada;
        $scope.validarAutorizaciones();
        $scope.verAutorizaciones = false;
        swal.close();
      })
    }
    $scope.switchtable = false;
    $scope.validarAutorizaciones = function () {
      if ($scope.tablepro != undefined) {
        $scope.tablepro.destroy();
        $scope.tablepro = undefined;
      }
      if ($scope.table != undefined) {
        $scope.table.destroy();
        $scope.table = undefined;
      }
      if ($scope.check_option_2 == true) {
        $scope.nameaut = 'Solicitudes';
        $scope.switchtable = true;
        setTimeout(function () {
          $scope.tablepro = $('#tautorizacionespro').DataTable({
            language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
            lengthMenu: [[10, 20, 50, -1], [10, 20, 50, 'Todas']],
            order: [[0, "asc"]]
          });
          $scope.tablepro.draw();
        }, 100);
      } else {
        $scope.nameaut = 'Autorizaciones';
        $scope.switchtable = false;
        setTimeout(function () {
          $scope.table = $('#tautorizaciones').DataTable({
            language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
            lengthMenu: [[10, 20, 50, -1], [10, 20, 50, 'Todas']],
            order: [[0, "asc"]]
          });
          $scope.table.draw();
        }, 100)
      }
    }

    $scope.consultarAutorizacionpro = function (numero, ubicacion, accion) {
      swal({ title: 'Cargando...' });
      swal.showLoading();
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtener_detalle_programada', numero: numero, ubicacion: ubicacion }
      }).then(function (response) {
        swal.close();
        if (accion == 'C') {
          $scope.v_encabezadov = response.data.cabeza;
          $scope.v_detallev = response.data.detalle;


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
        } else {
          $scope.v_encabezadov = response.data.cabeza;
          $scope.v_detallev = response.data.detalle;
          $scope.solicitudproedit.numero = $scope.v_encabezadov.NUMERO;
          $scope.solicitudproedit.ubicacion = $scope.v_encabezadov.UBI_OASIS;
          $scope.solicitudproedit.diagnom1 = $scope.v_encabezadov.DX + ' - ' + $scope.v_encabezadov.NOMBRE_DX
          $scope.solicitudproedit.diagcod1 = $scope.v_encabezadov.DX;
          $scope.solicitudproedit.diagnom2 = $scope.v_encabezadov.DX1 == 'N' ? '' : $scope.v_encabezadov.DX1 + ' - ' + $scope.v_encabezadov.NOMBRE_DX1
          $scope.solicitudproedit.diagcod2 = $scope.v_encabezadov.DX1;
          $scope.solicitudproedit.servicio = $scope.v_encabezadov.CLASIFICACION + ' - ' + $scope.v_encabezadov.NOMBRE_CLAS;
          $scope.solicitudproedit.codservicio = $scope.v_encabezadov.CLASIFICACION;
          $scope.solicitudproedit.ipscodasignada = $scope.v_encabezadov.NIT_ASIGNADA;
          $scope.solicitudproedit.ipscodsolicitante = $scope.v_encabezadov.NIT_SOLICITANTE;
          $scope.solicitudproedit.ipssolicitante = $scope.v_encabezadov.SOLICITANTE;
          $scope.solicitudproedit.contrato = $scope.v_encabezadov.CONTRATO;
          $scope.selectContratoTabIV = $scope.v_encabezadov.CONTRATO;
          $scope.solicitudproedit.contratoUbicacion = $scope.v_encabezadov.UBICACION_CONTRATO;
          $scope.solicitudproedit.contratoDocumento = $scope.v_encabezadov.DOCUMENTO_CONTRATO;
          $scope.obtenerServiciosTabI($scope.v_encabezadov.CONTRATO, 'tab3');
          $scope.listarContratoServicio(sessionStorage.getItem('nit'), $scope.regimenafitabIII, 'Ips asiganda');//faltan parametros
          var ftemp = $scope.v_encabezadov.FECHA_ORDEN.split("/");
          $scope.solicitudproedit.fecsolicitud = new Date(ftemp[2], (ftemp[1] - 1), ftemp[0]);
          var ftempro = $scope.v_encabezadov.FECHA_PROGRAMACION.split("/");
          $scope.solicitudproedit.fecprogramacion = new Date(ftempro[2], (ftempro[1] - 1), ftempro[0]);
          $scope.solicitudproedit.justificacion = $scope.v_encabezadov.JUSTIFICACION;
          $scope.solicitudproedit.observacion = $scope.v_encabezadov.OBSERVACION;
          $scope.solicitudproedit.cod_adjunto = $scope.v_encabezadov.COD_ADJUNTO;
          $scope.solicitudproedit.celular = $scope.v_encabezadov.CELULAR;
          $scope.solicitudproedit.email = $scope.v_encabezadov.CORREO;
          $scope.solicitudproedit.direccion = $scope.v_encabezadov.DIRECCION;
          if ($scope.v_encabezadov.COD_ADJUNTO) {
            $scope.datatb3.requiredFile = false;
          } else {
            $scope.v_encabezadov.COD_ADJUNTO = true;
          }
          $scope.productosagregadostabIII = $scope.v_detallev;
          if ($scope.v_detallev.codigo == undefined) {
            for (let index = 0; index < $scope.productosagregadostabIII.length; index++) {
              const element = $scope.productosagregadostabIII[index];
              // $scope.productosagregadostabIII[index].CANTIDAD = $scope.productosagregadostabIII[index].CANTIDAD;

            }
          } else {
            $scope.productosagregadostabIII = [];
          }


        }

      })
    }

    $scope.downloadFileAut = function (pdf, ftp) {
      pqrHttp.dowloadfile(pdf, ftp).then(function (response) {
        window.open("temp/" + response.data);
      });
    }

    $scope.setStatus = function (estado, status) {
      if (estado == 'ANULADA' && status == 'S') {
        return "ANULADA";
      } else if (estado == 'PENDIENTE AUTORIZAR' && status == 'S') {
        return "PENDIENTE AUTORIZAR";
      }
      else if (estado == 'PENDIENTE AUTORIZAR' && status == 'N') {
        return "ESPERANDO GESTIÓN";
      }
      else if (estado == 'PROCESADA') {
        return "PROCESADA";
      }
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
        if ($scope.tipoaut == '1') {
          if ($scope.solicitudpro.direccion) {
            if (data.value != '$closeButton') {
              $scope.solicitudpro.direccion = data.value + " " + $('#barrio').val();
            } else {
              if ($scope.solicitudpro.direccion) {

              } else {
                $scope.solicitudpro.direccion = "";
              }


            }
          } else {
            $scope.solicitudpro.direccion = data.value + " " + $('#barrio').val();
          }

        } else {
          if ($scope.solicitudproedit.direccion) {
            if (data.value != '$closeButton') {
              $scope.solicitudproedit.direccion = data.value + " " + $('#barrio').val();
            } else {
              if ($scope.solicitudproedit.direccion) {

              } else {
                $scope.solicitudproedit.direccion = "";
              }

            }
          } else {
            $scope.solicitudproedit.direccion = data.value + " " + $('#barrio').val();
          }
        }
      });
    }




    $scope.FormatSoloTextoNumero = function (NID) {
      const input = document.getElementById('' + NID + '');
      var valor = input.value;
      input.value = valor.replace(/[^\wÑñ,.-\s]/g, '');
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
          $scope.solicitudpro.ipssolicitante = data.Nombre;
          $scope.solicitudpro.ipscodsolicitante = data.Codigo;
          text = 'Ips Solicitante.';
          swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        }
      }

      if ($scope.tipoaut == '3') {
        if (tipo == 'S') {
          $scope.solicitudproedit.ipssolicitante = data.Nombre;
          $scope.solicitudproedit.ipscodsolicitante = data.Codigo;
          text = 'Ips Solicitante.';
          swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        }
      }
      $scope.closemodals("ips");
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