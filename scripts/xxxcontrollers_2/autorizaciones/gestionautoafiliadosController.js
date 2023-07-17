'use strict';

angular.module('GenesisApp')

  .controller('gestionautoafiliadosController', ['$scope', '$http', '$filter', 'ngDialog', '$timeout', 'pqrHttp', function ($scope, $http, $filter, ngDialog, $timeout, pqrHttp) {


    $(document).ready(function () {
      $('#modaldetalle').modal();
      $("#modalgestionpro").modal();


    });

    //variables de control

    $scope.tabI = true;
    $scope.tabIV = false;
    $scope.activeI = 'active final white-text';
    $scope.activeIV = 'none';
    $scope.activeIcolor = 'foot4';
    $scope.activeIVcolor = '';
    $scope.nametab = 'Autorización';

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


    $scope.novedades = null;
    $scope.datosAfiModalNov = null;
    $scope.tutelaParam = null;
    $scope.siniestroParam = null;
    $scope.maxDate = null;
    $scope.documentosAfiliado = null;

    $scope.filterOptions = 'AFILIADO';
    $scope.vdocafiliado;
    $scope.vnumeroaut;
    $scope.vubicacionaut;
    $scope.vnitips;

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
    $scope.dataSeccionales = null;
    $scope.inactiveseccional = true;
    $scope.botonAtras = true;
    $scope.tempSeccional = null;
    $scope.tempSeccionalips = null;
    $scope.tempSeccionalvalor = 0;
    $scope.sumtotal = 0;
    $scope.sumtotals = 0;
    $scope.gestion = { riesgo: null, justificacion: null };
    $scope.tab = { number: 0 }
    $scope.viewseccional = sessionStorage.getItem('municipio');



    $http({
      method: 'POST',
      url: "php/autorizaciones/print/Rautorizaciones.php",
      data: {
        function: 'getListaMotivosAnulacion'
      }
    }).then(function (res) {
      $scope.listMotivos = res.data[0];

    })

    // funciones de control

    $scope.getdepartamentos = function () {
      $scope.sumtotal = 0;
      var tempseccional = sessionStorage.getItem('municipio');
      $http({
        method: 'POST',
        url: "php/autorizaciones/afiliado/solicitud_autorizacion.php",
        data: { function: 'p_obtener_departamentos_sol_aut', ubicacion: tempseccional }
      }).then(function (response) {
        $scope.datadep = response.data;

        for (let index = 0; index < $scope.datadep.length; index++) {
          $scope.sumtotal = $scope.sumtotal + Number($scope.datadep[index].cantidad);
        }
        swal.close();

        if ($scope.datadep.length == 0) {
          $scope.tab.number = 0;
        }
      });

    }

    $scope.validatecall = function (seccional) {
      $scope.listaMunicipios = [];
      if (seccional) {
        $scope.tempSeccional = seccional;
      }
      $scope.tab.number = 1;
      $scope.botonAtras = false;
      $scope.sumtotals = 0;
      $http({
        method: 'POST',
        url: "php/autorizaciones/afiliado/solicitud_autorizacion.php",
        data: { function: 'p_obtener_municipios_sol_aut', departamento: $scope.tempSeccional.codigo, estado: 'P' }
      }).then(function (response) {
        $scope.listaMunicipios = response.data;

        for (let index = 0; index < $scope.listaMunicipios.length; index++) {
          $scope.sumtotals = $scope.sumtotals + Number($scope.listaMunicipios[index].cantidad);
        }

        if ($scope.listaMunicipios.length == 0) {
          $scope.getdepartamentos();
        }
        swal.close();
      });
    }

    $scope.validatecallIps = function (seccional) {
      console.log("seccional_", seccional);
      if (seccional) {
        $scope.tempSeccionalips = seccional;
      }
      $scope.tab.number = 2;
      $http({
        method: 'POST',
        url: "php/autorizaciones/afiliado/solicitud_autorizacion.php",
        data: { function: 'p_obtener_detalle_municipio_sol_aut', municipio: $scope.tempSeccionalips ? $scope.tempSeccionalips.codigo : sessionStorage.getItem('municipio') }
      }).then(function (response) {
        $scope.listaIps = response.data;

        $scope.initPaginacionips($scope.listaIps);
      });


    }

    $scope.init = function () {
      $scope.tabI = true;
      $scope.tabIV = false;
      $scope.activeI = 'active final';
      $scope.activeIV = 'none';
      $scope.activeIcolor = '';
      $scope.activeIVcolor = '';
    }

    $scope.setTab = function (opcion) {

      $scope.init();

      switch (opcion) {
        case '1':
          $scope.tabI = true;
          $scope.tabIV = false;
          $scope.activeI = 'active final white-text';
          $scope.activeIV = 'none';
          $scope.activeIcolor = 'foot4';
          $scope.nametab = 'Bolsa de Autorizaciones';
          $scope.tipoaut = '1';
          $scope.getdepartamentos();
          break;
        case '4':

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
    $scope.setTab('1');

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
            $scope.productosagregadostabIVC = [];
            $scope.datosAfiModalNov = $scope.infoafiliadoauteditc;
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

    $scope.openmodals = function (tipo, opcion, other) {
      $scope.buscard1 = "";
      $scope.buscard2 = "";
      $scope.buscarpro = "";
      $scope.tipoaut = opcion;
      switch (tipo) {
        case 'modaldetalle':
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $scope.detallesolicitud = [];
          $scope.detallesolicitud = other;
        
          // if (other.ADJUNTO) {
            pqrHttp.dowloadfile(other.ADJUNTO, other.FTP).then(function (response) {
              swal.close();
              $scope.detallesolicitud.TEMPADJUNTO = "temp/" + response.data;
            });
          // }

          $http({
            method: 'POST',
            url: "php/autorizaciones/afiliado/solicitud_autorizacion.php",
            data: {
              function: 'p_obtener_datos_basicos_afi', tipodocumento: other.TIPO_DOC,
              documento: other.DOCUMENTO,
            }
          }).then(function ({data}) {
            $scope.infoafiliadoautedit = data;
        
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
              $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento);
          
          })
          $("#modaldetalle").modal("open");
          break;
        case 'modalgestionpro':
          $scope.tempAut = other;
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          // if (other.ADJUNTO) {
            pqrHttp.dowloadfile(other.ADJUNTO, other.FTP).then(function (response) {
              swal.close();
              $scope.tempAut.TEMPADJUNTO = "temp/" + response.data;
            });
          // }
          $scope.viewsolpendiente = true;


          $("#modalgestionpro").modal("open");
          break;
        default:
      }
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
        case 'modaldetalle':
          $("#modaldetalle").modal("close");
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
        case 'modalgestionpro':
          $scope.gestion = { riesgo: null, justificacion: null };
          $("#modalgestionpro").modal("close");
          if ($scope.tipoaut == '1') {
            $scope.libersolicitud();
            // $scope.retroceder();
            $scope.validatecallIps();
          }

          break;


        default:
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

    $scope.limpiar = function (tab) {
      switch (tab) {
        case '1':
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
          $scope.vdocafiliado = null;
          $scope.vnumeroaut = null;
          $scope.vubicacionaut = null;
          $scope.vnitips = null;
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
        $scope.sumPrint = $scope.sumPrint + 1;
        // }        
        if ($scope.sumPrint > 3) {
          swal({ title: "No Completado", text: 'No se puede imprimir la autorización mas de 3 veces!', showConfirmButton: true, type: "warning" });
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
    $scope.validatesearch = false;
    $scope.buscarAutorizaciones = function (documento, numero, ubicacion, nit) {
      var vtext = "";
      if ($scope.filterOptions == 'AFILIADO') {
        numero = 0;
        // ubicacion = 0;
        ubicacion = 0;
        nit = 0;
        if (documento == undefined || documento == null) {
          vtext = "DOCUMENTO no puede ser vacio!";
          $scope.validatesearch = true;
        } else {
          $scope.validatesearch = false;
        }
      } else if ($scope.filterOptions == 'AUTORIZACION') {
        documento = 0;
        nit = 0;
        if (numero == undefined || numero == null) {
          vtext = "NUMERO no puede ser vacio!";
          $scope.validatesearch = true;
        } else if (ubicacion == undefined || ubicacion == null) {
          vtext = "UBICACION no puede ser vacio!";
        }
        if (numero && ubicacion) {
          $scope.validatesearch = false;
        }
      } else {
        numero = 0;
        ubicacion = 0;
        documento = 0;
        if (nit == undefined || nit == null) {
          vtext = "NIT no puede ser vacio!";
          $scope.validatesearch = true;
        } else {
          $scope.validatesearch = false;
        }
      }

      if ($scope.validatesearch == true) {
        swal({ title: "Solicitudes", text: vtext, showConfirmButton: true, type: "info" });
      } else {
        $scope.nameaut = 'Solicitudes';
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        if ($scope.tablepro != undefined) {
          $scope.tablepro.destroy();
          $scope.tablepro = undefined;
        }

        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: { function: 'obtener_aut_auditor', documento: documento, numero: numero, ubicacion: ubicacion, nit: nit, usu_ubicacion: sessionStorage.getItem('municipio') }
        }).then(function (response) {
          console.log(response.data);
          $scope.tempAut = response.data;
          $scope.verAutorizaciones = false;
          swal.close();
          $scope.listarAutorizacionesprog = response.data;
          setTimeout(function () {
            $scope.tablepro = $('#tautorizacionespro').DataTable({
              language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
              lengthMenu: [[20, 50, -1], [20, 50, 'Todas']],
              order: [[0, "asc"]]
            });
            $scope.tablepro.draw();

            document.getElementById('tautorizacionespro').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }, 100);


        })
      }

    }
    $scope.v_encabezado = null;
    $scope.v_detalle = null;
    $scope.v_encabezadov = null;
    $scope.v_detallev = null;
    $scope.v_detallec = null;
    $scope.consultarAutorizacion = function (numero, ubicacion, accion) {
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
        data: { function: 'obtener_detalle_programada', numero: numero, ubicacion: ubicacion }
      }).then(function (response) {
        if (accion == 'C') {
          $scope.v_encabezadov = response.data.cabeza;
          $scope.v_detallev = response.data.detalle;
          console.log(response.data.detalle);
          // $scope.v_detallev.forEach(element => {
          // $scope.v_detallev = element;
          // });


          if ($scope.v_detallev.length == 0) {

            //} else {
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
        swal.close();
      })
    }

    $scope.consultarAutorizacionpro = function (numero, ubicacion, accion) {
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
        data: { function: 'obtener_detalle_programada', numero: numero, ubicacion: ubicacion }
      }).then(function (response) {

        if (accion == 'C') {
          $scope.v_encabezadov = response.data.cabeza;
          $scope.v_detallev = response.data.detalle;
          //$scope.v_detallev.forEach(element => {
          //$scope.v_detallev = element;
          //});


          if ($scope.v_detallev.codigo == undefined) {
          } else {
            $scope.v_detallev = [];
          }
          if ($scope.v_encabezadov.ESTADO == 'A') {
            $scope.verPrintDetalle = true;
          } else {
            // $scope.verAutorizaciones = false;
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
        swal.close();
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
                $scope.buscarAutorizaciones($scope.vdocafiliado, $scope.vnumeroaut, $scope.vubicacionaut, $scope.vnitips);
              })
            }
          })
        }
      })
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
          if (($scope.tipoaut == '4')) {
            $scope.buscarAutorizaciones($scope.id, '', '');
          }
        }
      });
    }

    $scope.tempips;
    $scope.tempestadogetaut;
    $scope.getAut = function (aut, state) {
      console.log('aut: ', aut);
      console.log('state: ', state);
      $scope.tempips = aut;
      $scope.tempestadogetaut = state;

      if (state == 'P' && aut.activo == 0) {
        swal({ title: "SOLICITUDES", text: "No hay solicitudes PENDIENTES", showConfirmButton: true, type: "info" });
      } else if (state == 'G' && aut.procesado == 0) {
        swal({ title: "SOLICITUDES", text: "No hay solicitudes GESTIONADAS", showConfirmButton: true, type: "info" });
      } else if (state == 'X' && aut.rechazado == 0) {
        swal({ title: "SOLICITUDES", text: "No hay solicitudes ANULADAS", showConfirmButton: true, type: "info" });
      } else {
        $scope.ocultaripstatus = state;
        if (state == 'G' || state == 'X') {
          $scope.tab.number = 4;
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
            url: "php/autorizaciones/afiliado/solicitud_autorizacion.php",
            data: { function: 'p_llamar_sol_aut_afiliados', seccional: $scope.tempSeccionalips.codigo, estado: $scope.tempestadogetaut }
          }).then(function (response) {
            $scope.listaSolicitudesprog = response.data;
            if ($scope.listaSolicitudesprog.length > 0) {
              $scope.initPaginacion($scope.listaSolicitudesprog);
            }

            swal.close();
          });

        } else {
          // $scope.tab.number = 3;
          $scope.callramdom();
        }
      }
    }

    $scope.callramdom = function () {
      // $scope.tab.number = 4
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
        url: "php/autorizaciones/afiliado/solicitud_autorizacion.php",
        data: { function: 'p_llamar_sol_aut_afiliados', seccional: $scope.tempSeccionalips ? $scope.tempSeccionalips.codigo : sessionStorage.getItem('municipio'), estado: $scope.tempestadogetaut }
      }).then(function (response) {
        if (response.data == 0) {
          $scope.validatecallIps();
        } else {
          $scope.listaSolicitudesprog = response.data;
          $scope.openmodals('modalgestionpro', 1, $scope.listaSolicitudesprog[0]);
          // if ($scope.listaSolicitudesprog.length > 0) {
          //   $scope.initPaginacion($scope.listaSolicitudesprog);
          // }
        }
        swal.close();
      });
    }



    $scope.initPaginacion = function (info) {
      $scope.listaSolicitudesprogTemp = info;
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
        if (Math.ceil($scope.listaSolicitudesprogTemp.length / $scope.pageSize) > $scope.valmaxpag)
          fin = 10;
        else
          fin = Math.ceil($scope.listaSolicitudesprogTemp.length / $scope.pageSize);
      } else {
        if (ini >= Math.ceil($scope.listaSolicitudesprogTemp.length / $scope.pageSize) - $scope.valmaxpag) {
          ini = Math.ceil($scope.listaSolicitudesprogTemp.length / $scope.pageSize) - $scope.valmaxpag;
          fin = Math.ceil($scope.listaSolicitudesprogTemp.length / $scope.pageSize);
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
      if ($scope.listaSolicitudesprogTemp.length % $scope.pageSize == 0) {
        var tamanomax = parseInt($scope.listaSolicitudesprogTemp.length / $scope.pageSize);
      } else {
        var tamanomax = parseInt($scope.listaSolicitudesprogTemp.length / $scope.pageSize) + 1;
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
        if ($scope.listaSolicitudesprogTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.listaSolicitudesprogTemp.length / $scope.pageSize);
        } else {
          var tamanomax = parseInt($scope.listaSolicitudesprogTemp.length / $scope.pageSize) + 1;
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

    $scope.filterAut = function (val) {
      $scope.listaSolicitudesprogTemp = $filter('filter')($scope.listaSolicitudesprog, val);
      if ($scope.listaSolicitudesprogTemp.length > 0) {
        $scope.setPage(1);
      }
      $scope.configPages();
    }

    //Filter y table ips
    $scope.initPaginacionips = function (info) {
      $scope.listaIpsprogTemp = info;
      $scope.currentPageips = 0;
      $scope.pageSizeips = 10;
      $scope.valmaxpagips = 10;
      $scope.pagesips = [];
      $scope.configPagesips();
    }
    $scope.configPagesips = function () {
      $scope.pagesips.length = 0;
      var ini = $scope.currentPageips - 4;
      var fin = $scope.currentPageips + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil($scope.listaIpsprogTemp.length / $scope.pageSizeips) > $scope.valmaxpagips)
          fin = 10;
        else
          fin = Math.ceil($scope.listaIpsprogTemp.length / $scope.pageSizeips);
      } else {
        if (ini >= Math.ceil($scope.listaIpsprogTemp.length / $scope.pageSizeips) - $scope.valmaxpagips) {
          ini = Math.ceil($scope.listaIpsprogTemp.length / $scope.pageSizeips) - $scope.valmaxpagips;
          fin = Math.ceil($scope.listaIpsprogTemp.length / $scope.pageSizeips);
        }
      }
      if (ini < 1) ini = 1;
      for (var i = ini; i <= fin; i++) {
        $scope.pagesips.push({
          no: i
        });
      }
      if ($scope.currentPageips >= $scope.pagesips.length)
        $scope.currentPageips = $scope.pagesips.length - 1;
      if ($scope.currentPageips < 0) { $scope.currentPageips = 0; }
    }
    $scope.setPageips = function (index) {
      $scope.currentPageips = index - 1;
      if ($scope.pagesips.length % 2 == 0) {
        var resul = $scope.pagesips.length / 2;
      } else {
        var resul = ($scope.pagesips.length + 1) / 2;
      }
      var i = index - resul;
      if ($scope.listaIpsprogTemp.length % $scope.pageSize == 0) {
        var tamanomax = parseInt($scope.listaIpsprogTemp.length / $scope.pageSizeips);
      } else {
        var tamanomax = parseInt($scope.listaIpsprogTemp.length / $scope.pageSizeips) + 1;
      }
      var fin = ($scope.pagesips.length + i) - 1;
      if (fin > tamanomax) {
        fin = tamanomax;
        i = tamanomax - 9;
      }
      if (index > resul) {
        $scope.calcularips(i, fin);
      }
    }
    $scope.pasoips = function (tipo) {
      if (tipo == 'next') {
        var i = $scope.pagesips[0].no + 1;
        if ($scope.pagesips.length > 9) {
          var fin = $scope.pagesips[9].no + 1;
        } else {
          var fin = $scope.pagesips.length;
        }

        $scope.currentPageips = $scope.currentPageips + 1;
        if ($scope.listaIpsprogTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.listaIpsprogTemp.length / $scope.pageSizeips);
        } else {
          var tamanomax = parseInt($scope.listaIpsprogTemp.length / $scope.pageSizeips) + 1;
        }
        if (fin > tamanomax) {
          fin = tamanomax;
          i = tamanomax - 9;
        }
      } else {
        var i = $scope.pagesips[0].no - 1;
        if ($scope.pagesips.length > 9) {
          var fin = $scope.pagesips[9].no - 1;
        } else {
          var fin = $scope.pagesips.length;
        }

        $scope.currentPageips = $scope.currentPageips - 1;
        if (i <= 1) {
          i = 1;
          fin = $scope.pagesips.length;
        }
      }
      $scope.calcularips(i, fin);
    }
    $scope.calcularips = function (i, fin) {
      if (fin > 9) {
        i = fin - 9;
      } else {
        i = 1;
      }
      $scope.pagesips = [];
      for (i; i <= fin; i++) {
        $scope.pagesips.push({
          no: i
        });
      }
    }

    $scope.filterIps = function (val) {
      $scope.listaIpsprogTemp = $filter('filter')($scope.listaIps, val);
      if ($scope.listaIpsprogTemp.length > 0) {
        $scope.setPageips(1);
      }
      $scope.configPagesips();
    }

    ///
    $scope.seleccionarAut = function (aut) {
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


    $scope.guardarGestionSolicitud = function () {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      if ($scope.gestion.riesgo && $scope.gestion.justificacion) {

        if ($scope.gestion.justificacion.length > 500) {
          swal({ title: "No Completado", text: "La Justificación no puede ser mayor a 500 caracteres!", showConfirmButton: true, type: "info" });
        } else {
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: { function: 'save_aut_pertinenciaprog', numero: $scope.tempAut.NUMERO, ubicacion: $scope.tempAut.UBICACION, pertinencia: $scope.gestion.riesgo, justificacion: $scope.gestion.justificacion }
          }).then(function (response) {
            $scope.respuesta = response.data;
            swal.close();
            if (response.data.Codigo == 1) {
              swal({ title: "No Completado", text: response.data.Nombre, showConfirmButton: false, type: "warning", timer: 5000 });
            } else {

              if ($scope.tipoaut == '1') {
                // $scope.retroceder();          
                swal({ title: "Completado", text: response.data.Nombre, type: "success", }).then(function (response) {
                  setTimeout(() => {
                    $scope.closemodals('modalgestionpro');
                    // $scope.buscarAutorizaciones($scope.vdocafiliado, $scope.vnumeroaut, $scope.vubicacionaut, $scope.vnitips);
                    if ($scope.respuesta.Num_Aut && $scope.respuesta.Celular && $scope.respuesta.Dir_IPS_Asignada && $scope.respuesta.Nombre_IPS) {
                      $scope.sendmsj($scope.respuesta.Celular, $scope.respuesta.Dir_IPS_Asignada, $scope.respuesta.Num_Aut, $scope.respuesta.Nombre_IPS);
                    }

                    $scope.gestion.riesgo = null;
                    $scope.gestion.justificacion = null;
                    $scope.check_gestion = true;

                  }, 100);
                });
              } else {
                swal({ title: "Completado", text: response.data.Nombre, type: "success", }).then(function (response) {
                  setTimeout(() => {
                    $scope.closemodals('modalgestionpro');
                    if ($scope.respuesta.Num_Aut && $scope.respuesta.Celular && $scope.respuesta.Dir_IPS_Asignada) {
                      $scope.sendmsj($scope.respuesta.Celular, $scope.respuesta.Dir_IPS_Asignada, $scope.respuesta.Num_Aut, $scope.respuesta.Nombre_IPS);
                    }
                    $scope.buscarAutorizaciones($scope.vdocafiliado, $scope.vnumeroaut, $scope.vubicacionaut, $scope.vnitips);
                    $scope.gestion.riesgo = null;
                    $scope.gestion.justificacion = null;
                    $scope.check_gestion = true;
                  }, 100);
                });
              }

            }

          })

        }

      } else {
        swal({ title: "APROBACIÓN", text: "No pueden haber campos vacios!", showConfirmButton: true, type: "info" });
      }


    }

    $scope.downloadFileAut = function (pdf, ftp) {
      pqrHttp.dowloadfile(pdf, ftp).then(function (response) {
        window.open("temp/" + response.data);
      });

    }


    $scope.saveanulacion = function () {
      if ($scope.motivo && $scope.justificacion) {

        // v_posicion9a  := '$['||0||'].accion';
        // v_posicion10a  := '$['||0||'].justificacion_anulacion';
        // v_posicion11a  := '$['||0||'].responsable';
        // v_posicion12a  := '$['||0||'].numero_solicitud'; 

        var json = {
          accion: "X",
          motivo_anulacion : $scope.motivo,
          justificacion_anulacion: $scope.justificacion,
          responsable: sessionStorage.getItem('cedula'),
          numero_solicitud: $scope.tempAut.NUMERO,
          ubicacion_solicitud: $scope.tempAut.UBICACION
        }
        $http({
          method: 'POST',
          url: "php/autorizaciones/afiliado/solicitud_autorizacion.php",
          data: { function: 'p_ui_esaa', data: JSON.stringify(json) }
        }).then(function (response) {
          if (response.data.Codigo == 1) {
            swal({ title: "No Completado", text: response.data.Nombre, showConfirmButton: false, type: "warning", timer: 5000 });
          } else {
            swal({ title: "Completado", text: response.data.Nombre, type: "success", }).then(function (response) {
              setTimeout(() => {

                if ($scope.tipoaut == '1') {
                  $scope.retroceder();
                  $scope.closemodals('modalgestionpro');
                } else {
                  $scope.buscarAutorizaciones($scope.vdocafiliado, $scope.vnumeroaut, $scope.vubicacionaut, $scope.vnitips);
                  $scope.closemodals('modalgestionpro');
                }
                $scope.justificacion = null;
                $scope.motivo = null;
                $scope.check_gestion = true;
              }, 100);
            });
          }
        })
      } else {
        swal({ title: "ANULACIÓN", text: "No pueden haber campos vacios!", showConfirmButton: true, type: "info" });
      }
    }


    $scope.savegestionprog = function () {
      if ($scope.check_gestion == true) {
        localStorage.setItem('solicitud_solicitud', JSON.stringify($scope.tempAut));
        $scope.closemodals('modalgestionpro');
        location.href = "#/gestionautorizacion";
      } else {
        $scope.saveanulacion();
      }
    }

    $scope.sendmsj = function (num, dir, aut, nomips) {
      $http({
        method: 'POST',
        url: "https://api.infobip.com/sms/1/text/single",
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
          'accept': 'application/json'
        },
        data: {
          "from": "Cajacacopi EPS",
          "to": "57" + num,
          "text": "Cajacopi Eps, Afiliado Dirigirse a la IPS : " + nomips
        }
      }).then(function (response) {
        console.log(response);
      })
      $http({
        method: 'POST',
        url: "https://api.infobip.com/sms/1/text/single",
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
          'accept': 'application/json'
        },
        data: {
          "from": "Cajacacopi EPS",
          "to": "57" + num,
          "text": "Cajacopi Eps, con Direccion : " + dir
        }
      }).then(function (response) {
        console.log(response);
      })
      $http({
        method: 'POST',
        url: "https://api.infobip.com/sms/1/text/single",
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
          'accept': 'application/json'
        },
        data: {
          "from": "Cajacacopi EPS",
          "to": "57" + num,
          "text": "Cajacopi Eps, Su Autorizacion " + aut + " fue Generada Exitosamente"
        }
      }).then(function (response) {
        console.log(response);
      })

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



    $scope.ocultaripstatus = "";
    $scope.tab = { number: 0 };
    $scope.viewsolpendiente = false;
    $scope.retroceder = function () {
      if ($scope.tab.number != 0) {
        if ($scope.tab.number == 4 && $scope.ocultaripstatus != 'A') {
          $scope.tab.number = 2;
        } else if ($scope.tab.number == 4 && $scope.ocultaripstatus == 'A') {
          if ($scope.viewsolpendiente == false) {
            $scope.libersolicitud();
          }

          $scope.tab.number--;
        } else {
          $scope.tab.number--;
        }

        if ($scope.tab.number == 0) {
          $scope.getdepartamentos();
        } else if ($scope.tab.number == 1) {
          $scope.validatecall();
        } else if ($scope.tab.number == 2 || $scope.tab.number == 4) {
          $scope.validatecallIps();
        }

      }
    }


    $scope.libersolicitud = function () {
      var tempnum = 0;
      var tempubi = 0;
      if ($scope.tipoaut == '1') {
        if ($scope.tempAut == undefined) {
          tempnum = $scope.listaSolicitudesprog[0].NUMERO;
          // tempubi = $scope.listaSolicitudesprog[0].UBICACION;
        } else {
          tempnum = $scope.tempAut.NUMERO;
          // tempubi = $scope.tempAut.UBICACION;
        }
      }

      $http({
        method: 'POST',
        url: "php/autorizaciones/afiliado/solicitud_autorizacion.php",
        data: { function: 'p_liberar_sol_aut_afiliados', numero: tempnum }
      }).then(function (response) {
        console.log(response.data);
      })
    }
    if ($scope.viewseccional != '1') {
      console.log("validatecallIps");
      $scope.validatecallIps();
    }
    console.log("$scope.tab.number_", $scope.tab.number);
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