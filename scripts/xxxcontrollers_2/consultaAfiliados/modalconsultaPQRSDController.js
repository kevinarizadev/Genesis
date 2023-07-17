'use strict';

angular.module('GenesisApp')

  .controller('modalconsultaPQRSDController', ['$scope', '$http', '$location', '$filter', 'ngDialog', '$timeout', 'pqrHttp', 'afiliacionHttp', function ($scope, $http, $location, $filter, ngDialog, $timeout, pqrHttp, afiliacionHttp) {

    $(document).ready(function () {
      $("#modalmotivos").modal();
      $("#trazapqr").modal();
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
    }

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
      debugger;
      $scope.buscard1 = "";
      $scope.buscard2 = "";
      $scope.buscarpro = "";      
      switch (tipo) {

        case 'trazapqr':
        
            pqrHttp.getInfoAseguramientoPQR(opcion.NUMERO).then(function (response) {
              $scope.dpqr = response.data[0];
              $scope.dataPqr = response.data[0];
            })
          
          pqrHttp.p_mostrar_traza(opcion.NUMERO).then(function (response) {
            $scope.trazapqr = response;
          })

          pqrHttp.getProcesoSaludPQR(opcion.NUMERO).then(function (res) {
            $scope.procesopqr = res.data;
            if ($scope.procesopqr.length > 0) {
              $scope.showDataPQR = true;
            } else {
              $scope.showDataPQR = false;
            }
          })

          $("#trazapqr").modal("open");
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

    $scope.openmodals('trazapqr',$scope.data_pqrds);
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
        console.log($scope.filterOptions);


        console.log($scope.tempjsonpqr);
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


    $scope.descargafile = function (ruta,ftp) {
      pqrHttp.dowloadfile(ruta,ftp).then(function (response) {
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
          "NUMERO PQRDS": element.CODIGO,
          "RADICACION": element.RADICACION,
          "SOLICITUD": element.SOLICITUD,
          "MEDIO RECEPCION": element.NOMMEDIO,
          "CODIGO MOTIVO": element.CODIGO_ESPECIFICO,
          "NOMBRE MOTIVO": element.MOTIVO_ESPECIFICO,
          "FECHA RECIBIDO": element.FECHAREC,
          "FECHA MAX RESPUESTA": element.FECHAENT,
          "FECHA RADICACION": element.FECHARAD,
          "FECHA RESPUESTA": element.FECHARESPUESTA,
          "DIAS HABILES": element.DIAS,
          "RESULTADO PQRDS": element.ESTADO_RESPUESTA,
          "OBSERVACION": element.OBSERVACION,
          "RIESGO VIDA": element.SELECTEDRV == 'N' ? 'NO' : 'SI',
          "CODIGO SUPERSALUD": element.COD_SUPERSALUD,
          "CODIGO NURC": element.COD_NURC,
          "ESTADO": element.ESTADO
        });

      }
      tempjson = JSON.stringify(tempjson);
      //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
      var arrData = typeof tempjson != 'object' ? JSON.parse(tempjson) : tempjson;

      var CSV = 'sep=,' + '\r\n\n';

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