'use strict';
angular.module('GenesisApp').controller('seguimientoCancerController', ['$scope', '$http', '$timeout', '$filter', '$q', function ($scope, $http, $timeout, $filter, $q) {
  $(document).ready(function () {
    $('.modal').modal();
    $('.tabs').tabs();
    $scope.ngdisable = false;
    $scope.inicializeSwich();
    $scope.codMun = sessionStorage.getItem('municipio');
    $scope.sw = true;
    $scope.age = 0;
    $scope.arrMedicamentos = [];
    $scope.arrCUPS = [];
    $scope.arrCUPSRadio = [];
    $scope.tiposDoc = [];
    $scope.cie10 = '';
    $scope.TipoDocumento();
    $scope.obtUbicaciones();

    $(".fechas").kendoDatePicker({
      culture: "es-MX",
      format: "yyyy-MM-dd",
      dateInput: true
    });
    if ($(window).width() < 1100) {
      document.querySelector("#pantalla").style.zoom = 0.7;
    }
    if ($(window).width() > 1100 && $(window).width() < 1300) {
      document.querySelector("#pantalla").style.zoom = 0.8;
    }
    if ($(window).width() > 1300) {
      document.querySelector("#pantalla").style.zoom = 0.8;
    }

    document.getElementById("pantalla").parentElement.parentElement.parentElement.style.paddingBottom = '0px';
    document.getElementById("pantalla").parentElement.parentElement.parentElement.style.backgroundColor = 'white';
    $scope.hoja1 = 1;
    $scope.tab = 1;
    $scope.estadoTab1 = 1;

    $scope.limpiarForm();
    $scope.HNAC_ObtenerListado();
  });

  $scope.limpiar_NGM = function () {
    $scope._NGM1_T = '';
    $scope._NGM2_T = '';
    $scope._NGM3_T = '';
    $scope._NGM4_T = '';
    $scope._NGM5_T = '';
    $scope._NGM6_T = '';
    $scope._NGM7_F = '';
    $scope._NGM8_T = '';
    $scope._CH9 = '';
    $scope._NGM9_S = '';
    $scope._NGM9_T = '';
    $scope._NGM10_T = '';
    $scope._NGM11_T = '';
    $scope._NGM12_S = '';
    $scope._NGM13_S = '';
    $scope._NGM14_T = '';
    $scope._NGM15_T = '';
    $scope._NGM16_F = '';
    $scope._NGM17_T = '';
    $scope._CH18 = '';
    $scope._NGM18_S = '';
    $scope._NGM18_F = '';
    $scope._CH19 = '';
    $scope._NGM19_S = '';
    $scope._NGM19_F = '';
    $scope._CH20 = '';
    $scope._NGM20_S = '';
    $scope._NGM20_F = '';
    $scope._NGM21_S = '';
    $scope._NGM22_S = '';
    $scope._CH23 = '';
    $scope._NGM23_S = '';
    $scope._NGM23_F = '';
    $scope._CH24 = '';
    $scope._NGM24_S = '';
    $scope._NGM24_F = '';
    $scope._CH25 = '';
    $scope._NGM25_S = '';
    $scope._NGM25_T = '';
    $scope._CH26 = '';
    $scope._NGM26_S = '';
    $scope._NGM26_T = '';
    $scope._NGM27_S = '';
    $scope._NGM28_S = '';
    $scope._NGM29_S = '';
    $scope._CH30 = '';
    $scope._NGM30_S = '';
    $scope._NGM30_F = '';
    $scope._NGM31_S = '';
    $scope._CH32 = '';
    $scope._NGM32_S = '';
    $scope._NGM32_F = '';
    $scope._NGM33_S = '';
    $scope._NGM34_S = '';
    $scope._CH35 = '';
    $scope._NGM35_S = '';
    $scope._NGM35_F = '';
    $scope._NGM36_S = '';
    $scope._NGM37_S = '';
    $scope._NGM38_S = '';
    $scope._CH39 = '';
    $scope._NGM39_S = '';
    $scope._NGM39_F = '';
    $scope._NGM40_S = '';
    $scope._NGM41_S = '';
    $scope._NGM42_S = '';
    $scope._CH43 = '';
    $scope._NGM43_S = '';
    $scope._NGM43_F = '';
    $scope._CH44 = '';
    $scope._NGM44_S = '';
    $scope._NGM44_T = '';
    $scope._NGM45_S = '';
    $scope._CH46 = '';
    $scope._NGM46_S = '';
    $scope._NGM46_T = '';
    $scope._NGM461_S = '';
    $scope._NGM462_S = '';
    $scope._NGM463_S = '';
    $scope._NGM464_S = '';
    $scope._NGM465_S = '';
    $scope._NGM466_S = '';
    $scope._NGM467_S = '';
    $scope._NGM468_S = '';
    $scope._CH47 = '';
    $scope._NGM47_S = '';
    $scope._NGM47_T = '';
    $scope._NGM48_S = '';
    $scope._CH49 = '';
    $scope._NGM49_S = '';
    $scope._NGM49_F = '';
    $scope._CH50 = '';
    $scope._NGM50_S = '';
    $scope._NGM50_T = '';
    $scope._NGM51_S = '';
    $scope._NGM51_T = '';
    $scope._NGM52_S = '';
    $scope._NGM53_S = '';
    $scope._NGM531_S = '';
    $scope._NGM532_S = '';
    $scope._NGM533_S = '';
    $scope._NGM534_S = '';
    $scope._NGM535_S = '';
    $scope._NGM536_S = '';
    $scope._NGM537_S = '';
    $scope._NGM538_S = '';
    $scope._NGM539_S = '';
    $scope._NGM54_S = '';
    $scope._NGM55_S = '';
    $scope._NGM56_S = '';
    $scope._NGM57_S = '';
    $scope._CH58 = '';
    $scope._NGM58_S = '';
    $scope._NGM58_F = '';
    $scope._NGM59_S = '';
    $scope._NGM60_S = '';
    $scope._NGM61_S = '';
    $scope._CH62 = '';
    $scope._NGM62_S = '';
    $scope._NGM62_F = '';
    $scope._CH63 = '';
    $scope._NGM63_S = '';
    $scope._NGM63_T = '';
    $scope._CH64 = '';
    $scope._NGM64_S = '';
    $scope._NGM64_T = '';
    $scope._CH65 = '';
    $scope._NGM65_S = '';
    $scope._NGM65_T = '';
    $scope._CH66 = '';
    $scope._NGM66_S = '';
    $scope._NGM66_T = '';
    $scope._CH661 = '';
    $scope._NGM661_S = '';
    $scope._NGM661_T = '';
    $scope._NGM662_S = '';
    $scope._NGM663_S = '';
    $scope._NGM664_S = '';
    $scope._NGM665_S = '';
    $scope._NGM666_S = '';
    $scope._NGM667_S = '';
    $scope._NGM668_S = '';
    $scope._NGM669_S = '';
    $scope._NGM67_S = '';
    $scope._NGM68_S = '';
    $scope._NGM69_S = '';
    $scope._NGM70_S = '';
    $scope._CH71 = '';
    $scope._NGM71_S = '';
    $scope._NGM71_F = '';
    $scope._NGM72_S = '';
    $scope._NGM73_S = '';
    $scope._NGM74_S = '';
    $scope._CH75 = '';
    $scope._NGM75_S = '';
    $scope._NGM75_T = '';
    $scope._CH76 = '';
    $scope._NGM76_S = '';
    $scope._NGM76_F = '';
    $scope._CH77 = '';
    $scope._NGM77_S = '';
    $scope._NGM77_T = '';
    $scope._NGM78_S = '';
    $scope._NGM79_S = '';
    $scope._CH80 = '';
    $scope._NGM80_S = '';
    $scope._NGM80_F = '';
    $scope._NGM81_S = '';
    $scope._CH82 = '';
    $scope._NGM82_S = '';
    $scope._NGM82_T = '';
    $scope._CH83 = '';
    $scope._NGM83_S = '';
    $scope._NGM83_T = '';
    $scope._NGM84_S = '';
    $scope._NGM85_S = '';
    $scope._NGM86_S = '';
    $scope._CH87 = '';
    $scope._NGM87_S = '';
    $scope._NGM87_T = '';
    $scope._CH88 = '';
    $scope._NGM88_S = '';
    $scope._NGM88_F = '';
    $scope._NGM89_S = '';
    $scope._NGM90_S = '';
    $scope._CH91 = '';
    $scope._NGM91_S = '';
    $scope._NGM91_T = '';
    $scope._CH92 = '';
    $scope._NGM92_S = '';
    $scope._NGM92_T = '';
    $scope._CH93 = '';
    $scope._NGM93_S = '';
    $scope._NGM93_T = '';
    $scope._CH94 = '';
    $scope._NGM94_S = '';
    $scope._NGM94_F = '';
    $scope._NGM95_S = '';
    $scope._NGM96_S = '';
    $scope._CH97 = '';
    $scope._NGM97_S = '';
    $scope._NGM97_F = '';
    $scope._NGM98_S = '';
    $scope._CH99 = '';
    $scope._NGM99_S = '';
    $scope._NGM99_T = '';
    $scope._CH100 = '';
    $scope._NGM100_S = '';
    $scope._NGM100_T = '';
    $scope._CH101 = '';
    $scope._NGM101_S = '';
    $scope._NGM101_T = '';
    $scope._CH102 = '';
    $scope._NGM102_S = '';
    $scope._NGM102_T = '';
    $scope._CH103 = '';
    $scope._NGM103_S = '';
    $scope._NGM103_F = '';
    $scope._NGM104_S = '';
    $scope._NGM105_S = '';
    $scope._NGM106_S = '';
    $scope._NGM107_S = '';
    $scope._NGM108_S = '';
    $scope._CH109 = '';
    $scope._NGM109_S = '';
    $scope._NGM109_F = '';
    $scope._CH110 = '';
    $scope._NGM110_S = '';
    $scope._NGM110_T = '';
    $scope._NGM111_S = '';
    $scope._CH112 = '';
    $scope._NGM112_S = '';
    $scope._NGM112_F = '';
    $scope._CH113 = '';
    $scope._NGM113_S = '';
    $scope._NGM113_T = '';
    $scope._NGM114_S = '';
    $scope._NGM1141_S = '';
    $scope._NGM1142_S = '';
    $scope._NGM1143_S = '';
    $scope._NGM1144_S = '';
    $scope._NGM1145_S = '';
    $scope._NGM1146_S = '';
    $scope._CH115 = '';
    $scope._NGM115_S = '';
    $scope._NGM115_F = '';
    $scope._CH116 = '';
    $scope._NGM116_S = '';
    $scope._NGM116_T = '';
    $scope._NGM117_S = '';
    $scope._CH118 = '';
    $scope._NGM118_S = '';
    $scope._NGM118_F = '';
    $scope._CH119 = '';
    $scope._NGM119_S = '';
    $scope._NGM119_T = '';
    $scope._NGM120_S = '';
    $scope._CH121 = '';
    $scope._NGM121_S = '';
    $scope._NGM121_F = '';
    $scope._CH122 = '';
    $scope._NGM122_S = '';
    $scope._NGM122_T = '';
    $scope._NGM123_S = '';
    $scope._NGM124_S = '';
    $scope._NGM125_S = '';
    $scope._NGM126_S = '';
    $scope._NGM127_S = '';
    $scope._NGM128_S = '';
    $scope._NGM129_S = '';
    $scope._CH130 = '';
    $scope._NGM130_S = '';
    $scope._NGM130_F = '';
    $scope._CH131 = '';
    $scope._NGM131_S = '';
    $scope._NGM131_F = '';
    $scope._NGM132_S = '';
    $scope._NGM133 = '';
    $scope._CH134 = '';
    $scope._NGM134_S = '';
    $scope._NGM134_F = '';
    $scope._CH135 = '';
    $scope._NGM135_S = '';
    $scope._NGM135_T = '';
    $scope._NGM136_S = '';
    $scope._NGM137_F = '';
    $scope._NGM138_F = '';
    $scope._NGM139_T = '';
    $scope._NGM140_T = '';
    $scope._CH141 = '';
    $scope._NGM141_S = '';
    $scope._NGM141_F = '';
    $scope._NGM142_T = '';
    $scope._CH143 = '';
    $scope._NGM143_S = '';
    $scope._NGM143_F = '';
    $scope._NGM144_T = '';
    $scope._NGM145_T = '';
    $scope._NGM146_T = '';
    $scope._NGM147_S = '';
    $scope._CH148 = '';
    $scope._NGM148_S = '';
    $scope._NGM148_F = '';
    $scope._CH149 = '';
    $scope._NGM149_S = '';
    $scope._NGM149_T = '';
    $scope._NGM150_S = '';
    $scope._CH151 = '';
    $scope._NGM151_S = '';
    $scope._NGM151_F = '';
    $scope._NGM152_S = '';
    $scope._NGM153_S = '';
    $scope._NGM154_F = '';
    $scope._NGM155_S = '';
    $scope._NGM156_S = '';
    $scope._CH157 = '';
    $scope._NGM157_S = '';
    $scope._NGM157_F = '';
    $scope._NGM158_S = '';
    $scope._NGM159_S = '';
  }

  $scope.regresar = function () {
    $scope.hoja1 = 1;
    $scope.tab = 1;
    $scope.limpiarForm();
    $scope.limpiar_NGM();
    for (let i = 533; i <= 539; i++) {
      $('#_ID' + i + '_S').prop('disabled', false);
      $('#_CH' + i).prop('disabled', false);
    }
    for (let i = 1; i <= 56; i++) {
      $('#_ID' + i + '_S').prop('disabled', false);
      $('#_CH' + i).prop('disabled', false);
    }
    for (let i = 57; i <= 106; i++) {
      $('#_ID' + i + '_S').prop('disabled', false);
      $('#_CH' + i).prop('disabled', false);
    }
  }

  $scope.inactiveSeccional = function () {
    if ($scope.codMun != '1') {
      setTimeout(() => {

        for (let i = 45; i <= 73; i++) {
          $('#_ID' + i + '_S').prop('disabled', 'disabled');
          $('#_CH' + i).prop('disabled', 'disabled');
          $('#_ID' + i + '_F').prop('disabled', 'disabled');
        }
        for (let i = 461; i <= 468; i++) {
          $('#_ID' + i + '_S').prop('disabled', 'disabled');
        }
        for (let i = 531; i <= 539; i++) {
          $('#_ID' + i + '_S').prop('disabled', 'disabled');
          $('#_CH' + i).prop('disabled', 'disabled');
          $('#_ID' + i + '_F').prop('disabled', 'disabled');
        }
        for (let i = 661; i <= 669; i++) {
          $('#_ID' + i + '_S').prop('disabled', 'disabled');
          $('#_CH' + i).prop('disabled', 'disabled');
          $('#_ID' + i + '_F').prop('disabled', 'disabled');
        }
      }, 2000);
    }
  }

  $scope.limpiarForm = function () {
    $scope.hoja2Form = {
      codSiniestro: '',
      v_p1: '',
      v_p2: '',
      v_p3: '',
      v_p4: '',
      v_p5: '',
      v_p6: '',
      v_p7: '',
      v_p8: '',
      v_p9: '',
      v_p10: '',
      v_p11: '',
      v_p12: '',
      v_p13: '',
      v_p14: '',
      v_p15: '',
      v_p16: '',
      v_p17: '',
      v_p18: '',
      v_p19: '',
      v_p20: '',
      v_p21: '',
      v_p22: '',
      v_p23: '',
      v_p24: '',
      v_p25: '',
      v_p26: '',
      v_p27: '',
      v_p28: '',
      v_p29: '',
      v_p30: '',
      v_p31: '',
      v_p32: '',
      v_p33: '',
      v_p34: '',
      v_p35: '',
      v_p36: '',
      v_p37: '',
      v_p38: '',
      v_p39: '',
      v_p40: '',
      v_p41: '',
      v_p42: '',
      v_p43: '',
      v_p44: '',
      v_p45: '',
      v_p46: '',
      v_p47: '',
      v_p48: '',
      v_p49: '',
      v_p50: '',
      v_p51: '',
      v_p52: '',
      v_p53: '',
      v_p54: '',
      v_p55: '',
      v_p56: '',
      v_p57: '',
      v_p58: '',
      v_p59: '',
      v_p60: '',
      v_p61: '',
      v_p62: '',
      v_p63: '',
      v_p64: '',
      v_p65: '',
      v_p66: '',
      v_p67: '',
      v_p68: '',
      v_p69: '',
      v_p70: '',
      v_p71: '',
      v_p72: '',
      v_p73: '',
      v_p74: '',
      v_p75: '',
      v_p76: '',
      v_p77: '',
      v_p78: '',
      v_p79: '',
      v_p80: '',
      v_p81: '',
      v_p82: '',
      v_p83: '',
      v_p84: '',
      v_p85: '',
      v_p86: '',
      v_p87: '',
      v_p88: '',
      v_p89: '',
      v_p90: '',
      v_p91: '',
      v_p92: '',
      v_p93: '',
      v_p94: '',
      v_p95: '',
      v_p96: '',
      v_p97: '',
      v_p98: '',
      v_p99: '',
      v_p100: '',
      v_p101: '',
      v_p102: '',
      v_p103: '',
      v_p104: '',
      v_p105: '',
      v_p106: '',
      v_p107: '',
      v_p108: '',
      v_p109: '',
      v_p110: '',
      v_p111: '',
      v_p112: '',
      v_p113: '',
      v_p114: '',
      v_p115: '',
      v_p116: '',
      v_p117: '',
      v_p118: '',
      v_p119: '',
      v_p120: '',
      v_p121: '',
      v_p122: '',
      v_p123: '',
      v_p124: '',
      v_p125: '',
      v_p126: '',
      v_p127: '',
      v_p128: '',
      v_p129: '',
      v_p130: '',
      v_p131: '',
      v_p132: '',
      v_p133: ''
    }
    $scope.modal = {
      tipoAccion: '',
      tipoDoc: '',
      NumDoc: '',
      regional: '',
      incidente: ''
    }
    $scope.grupoPoblacional = [];
    $scope.datosBasicosAfi = '';
    $scope.datosComplementarios = '';
    $scope.datosComplementarios2 = '';
    $scope._CH9 = false;

  }


  $scope.HNAC_ObtenerListado = function () {
    $scope.Lista_Tabla = [];
    $scope.Var_Nacional = {
      Vista: '1',
      List_Count: {
        "Aut": 0,
        "Rips": 0,
        "Censo": 0,
        "Otra": 0
      },
      Filtrar_Sol: "",
      Form: null,
      Busqueda: {
        IpsAsig: {
          Filtro: [],
          Listado: null,
          SAVE: null,
          Seleccion: 9999
        },
        Diagnostico: {
          Filtro: [],
          Listado: null,
          SAVE: null,
          Cohorte: null,
          Seleccion: 9999
        },
        Diagnostico_F: {
          Filtro: [],
          Listado: null,
          SAVE: null,
          Cohorte: null,
          Seleccion: 9999
        },
        Clase_F: {
          Filtro: [],
          Listado: null,
          SAVE: null,
          Seleccion: 9999
        },
      },
      Sop_Lab: {
        Soporte: '',
      }
    }
    setTimeout(() => { $scope.$apply(); }, 100);
    swal({ title: 'Cargando...', allowOutsideClick: false });
    swal.showLoading();
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCancer.php",
      data: {
        function: 'Obt_Registros_Nac',
        Cedula: $scope.Rol_Cedula
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        if (response.data.Codigo == undefined) {

          swal.close();
          setTimeout(() => {
            response.data.forEach(e => {
              (e.FUENTE == 'A') ? $scope.Var_Nacional.List_Count.Aut += 1 : '';
              (e.FUENTE == 'R') ? $scope.Var_Nacional.List_Count.Rips += 1 : '';
              (e.FUENTE == 'C') ? $scope.Var_Nacional.List_Count.Censo += 1 : '';
              (e.FUENTE != 'A' && e.FUENTE != 'R' && e.FUENTE != 'C') ? $scope.Var_Nacional.List_Count.Otra += 1 : '';

              $scope.Lista_Tabla.push({
                "SECCIONAL": e.UBICACION,
                "NUM_RADICADO": e.RADICADO,
                "TIPO_DOC_AFI": e.DOCUMENTO.toString().split("-")[0],
                "DOC_AFI": e.DOCUMENTO.toString().split("-")[1],
                "NOMBRE_AFI": e.NOMBRE,
                "CLASE_CONCEPTO": e.CLASE_CONCEPTO,
                "IPS_SOL": e.IPS_SOL,
                "IPS_ASG": e.IPS_ASG,
                "TIPO_AFILIACION": e.TIPO_AFILIACION,
                "PLURIPATOLOGICO": e.PLURIPATOLOGICO,
                "PLURIPATOLOGICO_NOMB": e.PLURIPATOLOGICO == 'S' ? 'Pluripatologico' : '',
                "FUENTE": e.FUENTE,
                "FUENTE_NOM": $scope.Find_Fuente(e.FUENTE),
                "RESPONSABLE_SECCIONAL": e.RESPONSABLE_SECCIONAL,
                "ESTADO_AFILIADO": e.ESTADO_AFILIADO,
                "COD_DIAGNOSTICO": e.COD_DIAGNOSTICO,
                "CODIGO_EAPB": e.CODIGO_EAPB,
                "FECHA_DIAGNOSTICO": e.FECHA_DIAGNOSTICO,
              });
            });
            $scope.initPaginacion($scope.Lista_Tabla);
            $scope.$apply();
          }, 500);
        } else {
          if (response.data.Codigo == 1) {
            swal({
              title: "¡IMPORTANTE!",
              text: response.data.Nombre,
              type: "warning"
            }).catch(swal.noop);
          } else {
            swal({
              title: "¡IMPORTANTE!",
              text: response.data,
              type: "warning",
              allowOutsideClick: false
            }).catch(swal.noop);
          }
        }
      } else {
        swal({
          title: "¡IMPORTANTE!",
          text: response.data,
          type: "warning"
        }).catch(swal.noop);
      }
    });
  }

  $scope.HNAC_Mostar_Formulario = function (x) {
    $scope.limpiarForm();
    $scope.cie10 = x.COD_DIAGNOSTICO;
    $scope.setTab(1);
    $scope.hoja2Form.codSiniestro = x.NUM_RADICADO;
    swal({ title: 'Cargando...', allowOutsideClick: false });
    swal.showLoading();
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCancer.php",
      data: {
        function: 'existenRespuestas',
        cod: x.NUM_RADICADO,
      }
    }).then(function (response) {
      $scope.respRips(x.DOC_AFI);
      $scope.respCenso(x.TIPO_DOC_AFI, x.DOC_AFI);
      $scope.respPQR(x.DOC_AFI);
      $scope.respMedicamentos();
      $scope.respCUPS();
      $scope.respCUPSRadio();
      $scope.tipoAfiliado(x);
      if (response.data[0].total == 0) {
        $scope.nuevoForm(x);
      } else {
        $scope.sw = false;
        $scope.obtenerRespuestas(x);
        setTimeout(() => {
          $scope.sw = true;
        }, 5000);
      }
    });
  }

  $scope.nuevoForm = function (x) {
    $scope.obtRespCIE10(x.COD_DIAGNOSTICO);
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCancer.php",
      data: {
        function: 'BuscarAfiliado',
        tipodoc: x.TIPO_DOC_AFI,
        cedula: x.DOC_AFI
      }
    }).then(function (response) {
      swal.close();
      $scope.datosComplementarios = response.data;
      $scope._NGM1_T = $scope.datosComplementarios.PrimerNombre;
      $scope._NGM2_T = $scope.datosComplementarios.SegundoNombre;
      $scope._NGM3_T = $scope.datosComplementarios.PrimerApellido;
      $scope._NGM4_T = $scope.datosComplementarios.SegundoApellido;
      $scope._NGM5_T = $scope.datosComplementarios.TipoDocumento;
      $scope._NGM6_T = $scope.datosComplementarios.Documento;
      $scope._NGM7_F = $scope.datosComplementarios.FechaNacimiento;
      $scope._NGM8_T = $scope.datosComplementarios.Sexo;
      $scope._NGM10_T = $scope.datosComplementarios.Regimen;
      $scope._NGM14_T = $scope.datosComplementarios.CodigoMunicipio;
      $scope._NGM15_T = $scope.datosComplementarios.Celular1;
      $scope._NGM16_F = $scope.datosComplementarios.FechaAfiliacion;
      $scope._NGM18_F = x.FECHA_DIAGNOSTICO.toString().replace(/\//g, '-');
      $('#_CH18').prop('disabled', 'disabled');
      $('#_ID18_F').prop('disabled', 'disabled');

      $scope._NGM133_T = $scope.datosComplementarios.BDUA_BDEX_PVS;
      $scope.validMenorEdad(response.data.FechaNacimiento);
    });
    $scope._NGM17_T = x.COD_DIAGNOSTICO;
    $scope._NGM11_T = "CCF055";
    $scope.datosBasicosAfi = x;
    $scope.hoja1 = 2;
    $scope.validacionesForm(x);
  }

  $scope.obtenerRespuestas = function (x) {
    $('#_CH18').prop('disabled', 'disabled');
    $('#_ID18_F').prop('disabled', 'disabled');
    $('#_ID17_T').prop('disabled', 'disabled');
    $('#_ID11_T').prop('disabled', 'disabled');
    $('#_ID14_T').prop('disabled', 'disabled');
    $('#_ID16_F').prop('disabled', 'disabled');
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCancer.php",
      data: {
        function: 'obtenerRespuestas',
        cod: x.NUM_RADICADO,
      }
    }).then(function (response) {
      swal.close();
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        $scope.hoja1 = 2;
        $scope._NGM1_T = response.data[0].V1;
        $scope._NGM2_T = response.data[0].V2;
        $scope._NGM3_T = response.data[0].V3;
        $scope._NGM4_T = response.data[0].V4;
        $scope._NGM5_T = response.data[0].V5;
        $scope._NGM6_T = response.data[0].V6;
        $scope._NGM7_F = response.data[0].V7;
        $scope._NGM8_T = response.data[0].V8;
        $scope._CH9 = response.data[0].V9 == "9998" || response.data[0].V9 == "9999" ? true : false;
        $scope._NGM9_S = $scope._CH9 == true ? response.data[0].V9 : '';
        $scope._NGM9_T = $scope._CH9 == false ? response.data[0].V9 : '';
        $scope._NGM10_T = response.data[0].V10;
        $scope._NGM11_T = response.data[0].V11;
        $scope._NGM12_S = response.data[0].V12;
        $scope._NGM13_S = response.data[0].V13;
        $scope._NGM14_T = response.data[0].V14;
        $scope._NGM15_T = response.data[0].V15;
        $scope._NGM16_F = response.data[0].V16;
        $scope._NGM17_T = response.data[0].V17;
        $scope._CH18 = response.data[0].V18 == "1800-01-01" ? true : false;
        $scope._NGM18_S = $scope._CH18 == true ? response.data[0].V18 : '';
        $scope._NGM18_F = $scope._CH18 == false ? response.data[0].V18 : '';
        $scope._CH19 = response.data[0].V19 == "1800-01-01" ? true : false;
        $scope._NGM19_S = $scope._CH19 == true ? response.data[0].V19 : '';
        $scope._NGM19_F = $scope._CH19 == false ? response.data[0].V19 : '';
        $scope._CH20 = response.data[0].V20 == "1800-01-01" ? true : false;
        $scope._NGM20_S = $scope._CH20 == true ? response.data[0].V20 : '';
        $scope._NGM20_F = $scope._CH20 == false ? response.data[0].V20 : '';
        $scope._NGM21_S = response.data[0].V21;
        $scope._NGM22_S = response.data[0].V22;
        $scope._CH23 = response.data[0].V23 == "1800-01-01" || response.data[0].V23 == "1845-01-01" ? true : false;
        $scope._NGM23_S = $scope._CH23 == true ? response.data[0].V23 : '';
        $scope._NGM23_F = $scope._CH23 == false ? response.data[0].V23 : '';
        $scope._CH24 = response.data[0].V24 == "1800-01-01" || response.data[0].V24 == "1845-01-01" ? true : false;
        $scope._NGM24_S = $scope._CH24 == true ? response.data[0].V24 : '';
        $scope._NGM24_F = $scope._CH24 == false ? response.data[0].V24 : '';
        $scope._CH25 = response.data[0].V25 == "96" || response.data[0].V25 == "95" ? true : false;
        $scope._NGM25_S = $scope._CH25 == true ? response.data[0].V25 : '';
        $scope._NGM25_T = $scope._CH25 == false ? response.data[0].V25 : '';
        $scope._CH26 = response.data[0].V26 == "1800-01-01" ? true : false;
        $scope._NGM26_S = $scope._CH26 == true ? response.data[0].V26 : '';
        $scope._NGM26_T = $scope._CH26 == false ? response.data[0].V26 : '';
        $scope._NGM27_S = response.data[0].V27;
        $scope._NGM28_S = response.data[0].V28;
        $scope._NGM29_S = response.data[0].V29;
        $scope._CH30 = response.data[0].V30 == "1800-01-01" || response.data[0].V30 == "1845-01-01" ? true : false;
        $scope._NGM30_S = $scope._CH30 == true ? response.data[0].V30 : '';
        $scope._NGM30_F = $scope._CH30 == false ? response.data[0].V30 : '';
        $scope._NGM31_S = response.data[0].V31;
        $scope._CH32 = response.data[0].V32 == "1800-01-01" || response.data[0].V32 == "1840-01-01" || response.data[0].V32 == "1845-01-01" ? true : false;
        $scope._NGM32_S = $scope._CH32 == true ? response.data[0].V32 : '';
        $scope._NGM32_F = $scope._CH32 == false ? response.data[0].V32 : '';
        $scope._NGM33_S = response.data[0].V33;
        $scope._NGM34_S = response.data[0].V34;
        $scope._CH35 = response.data[0].V35 == "1845-01-01" ? true : false;
        $scope._NGM35_S = $scope._CH35 == true ? response.data[0].V35 : '';
        $scope._NGM35_F = $scope._CH35 == false ? response.data[0].V35 : '';
        $scope._NGM36_S = response.data[0].V36;
        $scope._NGM37_S = response.data[0].V37;
        $scope._NGM38_S = response.data[0].V38;
        $scope._CH39 = response.data[0].V39 == "1800-01-01" || response.data[0].V39 == "1845-01-01" ? true : false;
        $scope._NGM39_S = $scope._CH39 == true ? response.data[0].V39 : '';
        $scope._NGM39_F = $scope._CH39 == false ? response.data[0].V39 : '';
        $scope._NGM40_S = response.data[0].V40;
        $scope._NGM41_S = response.data[0].V41;
        $scope._NGM42_S = response.data[0].V42;
        $scope._CH43 = response.data[0].V43 == "1800-01-01" || response.data[0].V43 == "1845-01-01" ? true : false;
        $scope._NGM43_S = $scope._CH43 == true ? response.data[0].V43 : '';
        $scope._NGM43_F = $scope._CH43 == false ? response.data[0].V43 : '';
        $scope._CH44 = response.data[0].V44 == "99" ? true : false;
        $scope._NGM44_S = $scope._CH44 == true ? response.data[0].V44 : '';
        $scope._NGM44_T = $scope._CH44 == false ? response.data[0].V44 : '';
        $scope._NGM45_S = response.data[0].V45;
        $scope._CH46 = response.data[0].V46 == "0" || response.data[0].V46 == "98" ? true : false;
        $scope._NGM46_S = $scope._CH46 == true ? response.data[0].V46 : '';
        $scope._NGM46_T = $scope._CH46 == false ? response.data[0].V46 : '';
        $scope._NGM461_S = response.data[0].V461;
        $scope._NGM462_S = response.data[0].V462;
        $scope._NGM463_S = response.data[0].V463;
        $scope._NGM464_S = response.data[0].V464;
        $scope._NGM465_S = response.data[0].V465;
        $scope._NGM466_S = response.data[0].V466;
        $scope._NGM467_S = response.data[0].V467;
        $scope._NGM468_S = response.data[0].V468;
        $scope._CH47 = response.data[0].V47 == "98" ? true : false;
        $scope._NGM47_S = $scope._CH47 == true ? response.data[0].V47 : '';
        $scope._NGM47_T = $scope._CH47 == false ? response.data[0].V47 : '';
        $scope._NGM48_S = response.data[0].V48;
        $scope._CH49 = response.data[0].V49 == "1845-01-01" ? true : false;
        $scope._NGM49_S = $scope._CH49 == true ? response.data[0].V49 : '';
        $scope._NGM49_F = $scope._CH49 == false ? response.data[0].V49 : '';
        $scope._CH50 = response.data[0].V50 == "98" ? true : false;
        $scope._NGM50_S = $scope._CH50 == true ? response.data[0].V50 : '';
        $scope._NGM50_T = $scope._CH50 == false ? response.data[0].V50 : '';
        $scope._CH51 = response.data[0].V51 == "98" ? true : false;
        $scope._NGM51_T = $scope._CH51 == false ? response.data[0].V51 : '';
        $scope._NGM51_S = $scope._CH51 == true ? response.data[0].V51 : '';
        $scope._CH52 = response.data[0].V52 == "98" ? true : false;
        $scope._NGM52_T = $scope._CH52 == false ? response.data[0].V52 : '';
        $scope._NGM52_S = $scope._CH52 == true ? response.data[0].V52 : '';
        $scope._CH53 = response.data[0].V53 == "98" ? true : false;
        $scope._NGM53_T = $scope._CH53 == false ? response.data[0].V53 : '';
        $scope._NGM53_S = $scope._CH53 == true ? response.data[0].V53 : '';
        $scope._NGM531_S = response.data[0].V531;
        $scope._NGM532_S = response.data[0].V532;
        $scope._NGM533_S = response.data[0].V533;
        $scope._NGM534_S = response.data[0].V534;
        $scope._NGM535_S = response.data[0].V535;
        $scope._NGM536_S = response.data[0].V536;
        $scope._NGM537_S = response.data[0].V537;
        $scope._NGM538_S = response.data[0].V538;
        $scope._NGM539_S = response.data[0].V539;
        $scope._NGM54_S = response.data[0].V54;
        $scope._NGM55_S = response.data[0].V55;
        $scope._NGM56_S = response.data[0].V56;
        $scope._NGM57_S = response.data[0].V57;
        $scope._CH58 = response.data[0].V58 == "1845-01-01" || response.data[0].V58 == "1800-01-01" ? true : false;
        $scope._NGM58_S = $scope._CH58 == true ? response.data[0].V58 : '';
        $scope._NGM58_F = $scope._CH58 == false ? response.data[0].V58 : '';
        $scope._NGM59_S = response.data[0].V59;
        $scope._NGM60_S = response.data[0].V60;
        $scope._NGM61_S = response.data[0].V61;
        $scope._CH62 = response.data[0].V62 == "1845-01-01" ? true : false;
        $scope._NGM62_S = $scope._CH62 == true ? response.data[0].V62 : '';
        $scope._NGM62_F = $scope._CH62 == false ? response.data[0].V62 : '';
        $scope._CH63 = response.data[0].V63 == "98" ? true : false;
        $scope._NGM63_S = $scope._CH63 == true ? response.data[0].V63 : '';
        $scope._NGM63_T = $scope._CH63 == false ? response.data[0].V63 : '';
        $scope._CH64 = response.data[0].V64 == "98" ? true : false;
        $scope._NGM64_S = $scope._CH64 == true ? response.data[0].V64 : '';
        $scope._NGM64_T = $scope._CH64 == false ? response.data[0].V64 : '';
        $scope._CH65 = response.data[0].V65 == "98" ? true : false;
        $scope._NGM65_S = $scope._CH65 == true ? response.data[0].V65 : '';
        $scope._NGM65_T = $scope._CH65 == false ? response.data[0].V65 : '';
        $scope._CH66 = response.data[0].V66 == "98" ? true : false;
        $scope._NGM66_S = $scope._CH66 == true ? response.data[0].V66 : '';
        $scope._NGM66_T = $scope._CH66 == false ? response.data[0].V66 : '';
        $scope._CH661 = response.data[0].V661 == "98" ? true : false;
        $scope._NGM661_S = response.data[0].V661;
        $scope._NGM661_T = $scope._CH661 == false ? response.data[0].V661 : '';
        $scope._NGM662_S = response.data[0].V662;
        $scope._NGM663_S = response.data[0].V663;
        $scope._NGM664_S = response.data[0].V664;
        $scope._NGM665_S = response.data[0].V665;
        $scope._NGM666_S = response.data[0].V666;
        $scope._NGM667_S = response.data[0].V667;
        $scope._NGM668_S = response.data[0].V668;
        $scope._NGM669_S = response.data[0].V669;
        $scope._NGM67_S = response.data[0].V67;
        $scope._NGM68_S = response.data[0].V68;
        $scope._NGM69_S = response.data[0].V69;
        $scope._NGM70_S = response.data[0].V70;
        $scope._CH71 = response.data[0].V71 == "1845-01-01" || response.data[0].V71 == "1800-01-01" ? true : false;
        $scope._NGM71_S = $scope._CH71 == true ? response.data[0].V71 : '';
        $scope._NGM71_F = $scope._CH71 == false ? response.data[0].V71 : '';
        $scope._NGM72_S = $scope._NGM71_S == '' && $scope._NGM71_F == '' ? '' : response.data[0].V72;
        $scope._NGM73_S = $scope._NGM71_S == '' && $scope._NGM71_F == '' ? '' : response.data[0].V73;
        $scope._NGM74_S = response.data[0].V74;
        $scope._CH75 = response.data[0].V75 == "98" ? true : false;
        $scope._NGM75_S = $scope._CH75 == true ? response.data[0].V75 : '';
        $scope._NGM75_T = $scope._CH75 == false ? response.data[0].V75 : '';
        $scope._CH76 = response.data[0].V76 == "1845-01-01" ? true : false;
        $scope._NGM76_S = $scope._CH76 == true ? response.data[0].V76 : '';
        $scope._NGM76_F = $scope._CH76 == false ? response.data[0].V76 : '';
        $scope._CH77 = response.data[0].V77 == "96" || response.data[0].V77 == "98" ? true : false;
        $scope._NGM77_S = $scope._CH77 == true ? response.data[0].V77 : '';
        $scope._NGM77_T = $scope._CH77 == false ? response.data[0].V77 : '';
        $scope._NGM78_S = response.data[0].V78;
        $scope._NGM79_S = response.data[0].V79;
        $scope._CH80 = response.data[0].V80 == "1845-01-01" ? true : false;
        $scope._NGM80_S = $scope._CH80 == true ? response.data[0].V80 : '';
        $scope._NGM80_F = $scope._CH80 == false ? response.data[0].V80 : '';
        $scope._NGM81_S = response.data[0].V81;
        $scope._CH82 = response.data[0].V82 == "98" ? true : false;
        $scope._NGM82_S = $scope._CH82 == true ? response.data[0].V82 : '';
        $scope._NGM82_T = $scope._CH82 == false ? response.data[0].V82 : '';
        $scope._NGM83_S = response.data[0].V83;
        $scope._NGM84_S = response.data[0].V84;
        $scope._NGM85_S = response.data[0].V85;
        $scope._NGM86_S = response.data[0].V86;
        $scope._CH87 = response.data[0].V87 == "98" ? true : false;
        $scope._NGM87_S = $scope._CH87 == true ? response.data[0].V87 : '';
        $scope._NGM87_T = $scope._CH87 == false ? response.data[0].V87 : '';
        $scope._CH88 = response.data[0].V88 == "1845-01-01" ? true : false;
        $scope._NGM88_S = $scope._CH88 == true ? response.data[0].V88 : '';
        $scope._NGM88_F = $scope._CH88 == false ? response.data[0].V88 : '';
        $scope._NGM89_S = response.data[0].V89;
        $scope._NGM90_S = response.data[0].V90;
        $scope._CH91 = response.data[0].V91 == "98" ? true : false;
        $scope._NGM91_S = $scope._CH91 == true ? response.data[0].V91 : '';
        $scope._NGM91_T = $scope._CH91 == false ? response.data[0].V91 : '';
        $scope._CH92 = response.data[0].V92 == "98" ? true : false;
        $scope._NGM92_S = $scope._CH92 == true ? response.data[0].V92 : '';
        $scope._NGM92_T = $scope._CH92 == false ? response.data[0].V92 : '';
        $scope._CH93 = response.data[0].V93 == "98" ? true : false;
        $scope._NGM93_S = $scope._CH93 == true ? response.data[0].V93 : '';
        $scope._NGM93_T = $scope._CH93 == false ? response.data[0].V93 : '';
        $scope._CH94 = response.data[0].V94 == "1845-01-01" ? true : false;
        $scope._NGM94_S = $scope._CH94 == true ? response.data[0].V94 : '';
        $scope._NGM94_F = $scope._CH94 == false ? response.data[0].V94 : '';
        $scope._NGM95_S = response.data[0].V95;
        $scope._NGM96_S = response.data[0].V96;
        $scope._CH97 = response.data[0].V97 == "1845-01-01" ? true : false;
        $scope._NGM97_S = $scope._CH97 == true ? response.data[0].V97 : '';
        $scope._NGM97_F = $scope._CH97 == false ? response.data[0].V97 : '';
        $scope._NGM98_S = response.data[0].V98;
        $scope._NGM99_S = response.data[0].V99 != '' ? response.data[0].V99 : '';
        $scope._NGM99_T = $scope._CH99 == false ? response.data[0].V99 : '';
        $scope._CH100 = response.data[0].V100 == "98" ? true : false;
        $scope._NGM100_S = $scope._CH100 == true ? response.data[0].V100 : '';
        $scope._NGM100_T = $scope._CH100 == false ? response.data[0].V100 : '';
        $scope._CH101 = response.data[0].V101 == "98" ? true : false;
        $scope._NGM101_S = $scope._CH101 == true ? response.data[0].V101 : '';
        $scope._NGM101_T = $scope._CH101 == false ? response.data[0].V101 : '';
        $scope._CH102 = response.data[0].V102 == "98" ? true : false;
        $scope._NGM102_S = $scope._CH102 == true ? response.data[0].V102 : '';
        $scope._NGM102_T = $scope._CH102 == false ? response.data[0].V102 : '';
        $scope._CH103 = response.data[0].V103 == "1845-01-01" ? true : false;
        $scope._NGM103_S = $scope._CH103 == true ? response.data[0].V103 : '';
        $scope._NGM103_F = $scope._CH103 == false ? response.data[0].V103 : '';
        $scope._NGM104_S = response.data[0].V104;
        $scope._NGM105_S = response.data[0].V105;
        $scope._NGM106_S = response.data[0].V106;
        $scope._NGM107_S = response.data[0].V107;
        $scope._NGM108_S = response.data[0].V108;
        $scope._CH109 = response.data[0].V109 == "1845-01-01" ? true : false;
        $scope._NGM109_S = $scope._CH109 == true ? response.data[0].V109 : '';
        $scope._NGM109_F = $scope._CH109 == false ? response.data[0].V109 : '';
        $scope._CH110 = response.data[0].V110 == "98" ? true : false;
        $scope._NGM110_S = $scope._CH110 == true ? response.data[0].V110 : '';
        $scope._NGM110_T = $scope._CH110 == false ? response.data[0].V110 : '';
        $scope._NGM111_S = response.data[0].V111;
        $scope._CH112 = response.data[0].V112 == "1845-01-01" ? true : false;
        $scope._NGM112_S = $scope._CH112 == true ? response.data[0].V112 : '';
        $scope._NGM112_F = $scope._CH112 == false ? response.data[0].V112 : '';
        $scope._CH113 = response.data[0].V113 == "98" ? true : false;
        $scope._NGM113_S = $scope._CH113 == true ? response.data[0].V113 : '';
        $scope._NGM113_T = $scope._CH113 == false ? response.data[0].V113 : '';
        $scope._NGM114_S = response.data[0].V114;
        $scope._NGM1141_S = response.data[0].V1141;
        $scope._NGM1142_S = response.data[0].V1142;
        $scope._NGM1143_S = response.data[0].V1143;
        $scope._NGM1144_S = response.data[0].V1144;
        $scope._NGM1145_S = response.data[0].V1145;
        $scope._NGM1146_S = response.data[0].V1146;
        $scope._CH115 = response.data[0].V115 == "1845-01-01" ? true : false;
        $scope._NGM115_S = $scope._CH115 == true ? response.data[0].V115 : '';
        $scope._NGM115_F = $scope._CH115 == false ? response.data[0].V115 : '';
        $scope._CH116 = response.data[0].V116 == "98" ? true : false;
        $scope._NGM116_S = $scope._CH116 == true ? response.data[0].V116 : '';
        $scope._NGM116_T = $scope._CH116 == false ? response.data[0].V116 : '';
        $scope._NGM117_S = response.data[0].V117;
        $scope._CH118 = response.data[0].V118 == "1845-01-01" ? true : false;
        $scope._NGM118_S = $scope._CH118 == true ? response.data[0].V118 : '';
        $scope._NGM118_F = $scope._CH118 == false ? response.data[0].V118 : '';
        $scope._CH119 = response.data[0].V119 == "98" ? true : false;
        $scope._NGM119_S = $scope._CH119 == true ? response.data[0].V119 : '';
        $scope._NGM119_T = $scope._CH119 == false ? response.data[0].V119 : '';
        $scope._NGM120_S = response.data[0].V120;
        $scope._CH121 = response.data[0].V121 == "1845-01-01" ? true : false;
        $scope._NGM121_S = $scope._CH121 == true ? response.data[0].V121 : '';
        $scope._NGM121_F = $scope._CH121 == false ? response.data[0].V121 : '';
        $scope._CH122 = response.data[0].V122 == "98" ? true : false;
        $scope._NGM122_S = $scope._CH122 == true ? response.data[0].V122 : '';
        $scope._NGM122_T = $scope._CH122 == false ? response.data[0].V122 : '';
        $scope._NGM123_S = response.data[0].V123;
        $scope._NGM124_S = response.data[0].V124;
        $scope._NGM125_S = response.data[0].V125;
        $scope._NGM126_S = response.data[0].V126;
        $scope._NGM127_S = response.data[0].V127;
        $scope._NGM128_S = response.data[0].V128;
        $scope._NGM129_S = response.data[0].V129;
        $scope._CH130 = response.data[0].V130 == "1845-01-01" ? true : false;
        $scope._NGM130_S = $scope._CH130 == true ? response.data[0].V130 : '';
        $scope._NGM130_F = $scope._CH130 == false ? response.data[0].V130 : '';
        $scope._CH131 = response.data[0].V131 == "1845-01-01" ? true : false;
        $scope._NGM131_S = $scope._CH131 == true ? response.data[0].V131 : '';
        $scope._NGM131_F = $scope._CH131 == false ? response.data[0].V131 : '';
        $scope._NGM132_S = response.data[0].V129;
        $scope._NGM133 = response.data[0].V133;
        $scope._CH134 = response.data[0].V134 == "1845-01-01" ? true : false;
        $scope._NGM134_S = $scope._CH134 == true ? response.data[0].V134 : '';
        $scope._NGM134_F = $scope._CH134 == false ? response.data[0].V134 : '';
        $scope._CH135 = response.data[0].V135 == "98" ? true : false;
        $scope._NGM135_S = $scope._CH135 == true ? response.data[0].V135 : '';
        $scope._NGM135_T = $scope._CH135 == false ? response.data[0].V135 : '';
        $scope._NGM136_S = response.data[0].V136;
        $scope._NGM137_F = response.data[0].V137;
        $scope._NGM38_S = response.data[0].V138;
        $scope._NGM139_T = response.data[0].V139;
        $scope._NGM140_T = response.data[0].V140;
        $scope._CH141 = response.data[0].V141 == "1845-01-01" ? true : false;
        $scope._NGM141_S = $scope._CH141 == true ? response.data[0].V141 : '';
        $scope._NGM141_F = $scope._CH141 == false ? response.data[0].V141 : '';
        $scope._NGM142_T = response.data[0].V142;
        $scope._CH143 = response.data[0].V143 == "1845-01-01" ? true : false;
        $scope._NGM143_S = $scope._CH143 == true ? response.data[0].V143 : '';
        $scope._NGM143_F = $scope._CH143 == false ? response.data[0].V143 : '';
        $scope._NGM144_T = response.data[0].V144;
        $scope._NGM145_T = response.data[0].V145;
        $scope._NGM146_T = response.data[0].V146;
        $scope._NGM147_S = response.data[0].V147;
        $scope._CH148 = response.data[0].V148 == "1800-01-01" ? true : false;
        $scope._NGM148_S = $scope._CH148 == true ? response.data[0].V148 : '';
        $scope._NGM148_F = $scope._CH148 == false ? response.data[0].V148 : '';
        $scope._CH149 = response.data[0].V149 == "98" ? true : false;
        $scope._NGM149_S = $scope._CH149 == true ? response.data[0].V149 : '';
        $scope._NGM149_T = $scope._CH149 == false ? response.data[0].V149 : '';
        $scope._NGM150_S = response.data[0].V150;
        $scope._CH151 = response.data[0].V151 == "98" ? true : false;
        $scope._NGM151_S = $scope._CH151 == true ? response.data[0].V151 : '';
        $scope._NGM151_F = $scope._CH151 == false ? response.data[0].V151 : '';
        $scope._NGM152_S = response.data[0].V152;
        $scope._NGM153_S = response.data[0].V153;
        $scope._NGM154_F = response.data[0].V154;
        $scope._NGM155_S = response.data[0].V155;
        $scope._NGM156_S = response.data[0].V156;
        $scope._CH157 = response.data[0].V157 == "1845-01-01" ? true : false;
        $scope._NGM157_S = $scope._CH157 == true ? response.data[0].V157 : '';
        $scope._NGM157_F = $scope._CH157 == false ? response.data[0].V157 : '';
        $scope._NGM158_S = response.data[0].V158;
        $scope._NGM159_S = response.data[0].V159;
      }
    });
  }

  $scope.validacionesForm = function (x) {
    $scope.cie10 = x.COD_DIAGNOSTICO;
    var _ID17_T = document.getElementById("_ID17_T").value;
    $scope.inactiveSeccional();
    if (x.CLASE_CONCEPTO != "CAC MAMA") {
      $scope._CH32 = true;
      $scope._NGM32_S = '1845-01-01';
      $scope._NGM33_S = 98;
      setTimeout(() => {
        $('#_ID31_S').prop('disabled', 'disabled');
        $('#_CH32').prop('disabled', 'disabled');
        $('#_ID32_F').prop('disabled', 'disabled');
        $('#_ID32_S').prop('disabled', 'disabled');
        $('#_ID33_S').prop('disabled', 'disabled');
      }, 500);
    }
    if (x.CLASE_CONCEPTO != 'CAC COLORECTAL') {
      $scope._CH35 = true;
      $scope._NGM34_S = 98;
      $scope._CH35 = true;
      $scope._NGM35_S = '1845-01-01';
      $('#_ID34_S').prop('disabled', 'disabled');
      $('#_ID35_F').prop('disabled', 'disabled');
      $('#_ID35_S').prop('disabled', 'disabled');
    } else {
      $scope._CH35 = false;
      $('#_ID34_S').prop('disabled', false);
      $('#_ID35_F').prop('disabled', false);
      $('#_ID35_S').prop('disabled', false);
    }
    if (x.CLASE_CONCEPTO == 'CAC LINFOMA NO HODGKIN' || x.CLASE_CONCEPTO == 'CAC LINFOMA HODGKIN') {
      $('#_ID36_S').prop('disabled', false);
    } else {
      $('#_ID36_S').prop('disabled', 'disabled');
    }
    if (x.CLASE_CONCEPTO != 'CAC PROSTATA') {
      $('#_ID37_S').prop('disabled', 'disabled');
      $scope._NGM37_S = 98;
    } else {
      $('#_ID37_S').prop('disabled', false);
      $scope._NGM37_S = '';
    }
    if ($scope.cie10 == "C900") {
      $('#_ID36_S').prop('disabled', false);
    }

    if (x.COD_DIAGNOSTICO == 'C835' || x.COD_DIAGNOSTICO == 'C910' || x.COD_DIAGNOSTICO == 'C920' || x.COD_DIAGNOSTICO == 'C924' || x.COD_DIAGNOSTICO == 'C925') {
      setTimeout(() => {
        $('#_ID46_S').prop('disabled', false);
        $('#_CH46').prop('disabled', false);
        $('#_ID46_F').prop('disabled', false);
        for (let i = 461; i <= 468; i++) {
          $('#_ID' + i + '_S').prop('disabled', false);
          $('#_CH' + i).prop('disabled', false);
          $('#_ID' + i + '_F').prop('disabled', false);
        }
      }, 500);
    } else {
      setTimeout(() => {
        $('#_ID46_S').prop('disabled', 'disabled');
        $('#_CH46').prop('disabled', 'disabled');
        $('#_ID46_F').prop('disabled', 'disabled');
        for (let i = 461; i <= 468; i++) {
          $('#_ID' + i + '_S').prop('disabled', 'disabled');
          $('#_CH' + i).prop('disabled', 'disabled');
          $('#_ID' + i + '_F').prop('disabled', 'disabled');
        }
      }, 500);

    }

    if ($scope.cie10 != 'C835' && $scope.cie10 != 'C910' && $scope.cie10 != 'C920' && $scope.cie10 != 'C924' && $scope.cie10 != 'C925') {
      $scope._CH46 = true;
      $scope._NGM46_S = 98;
      $scope._NGM461_S = 97;
      $scope._NGM462_S = 97;
      $scope._NGM463_S = 97;
      $scope._NGM464_S = 97;
      $scope._NGM465_S = 97;
      $scope._NGM466_S = 97;
      $scope._NGM467_S = 97;
      $scope._NGM468_S = 97;
      setTimeout(() => {
        for (let i = 461; i <= 468; i++) {
          $('#_ID' + i + '_S').prop('disabled', 'disabled');
          $('#_CH' + i).prop('disabled', 'disabled');
          $('#_ID' + i + '_F').prop('disabled', 'disabled');
        }
      }, 1000);
    }

    if ($scope.codMun != 1) {
      $('#_ID45_S').prop('disabled', 'disabled');
    } else {
      $('#_ID45_S').prop('disabled', false);
    }

    if (x.COD_DIAGNOSTICO != 'C910' && x.COD_DIAGNOSTICO != 'C920' && x.COD_DIAGNOSTICO != 'C924' && x.COD_DIAGNOSTICO != 'C925' && x.COD_DIAGNOSTICO != 'C939' && x.COD_DIAGNOSTICO != 'C940' && x.COD_DIAGNOSTICO != 'C942') {
      $scope._NGM38_S = 98;
      $scope._CH39 = true;
      $scope._NGM39_S = '1845-01-01';
    }
    else {
      $scope._NGM38_S = '';
      $scope._CH39 = false;
      $scope._NGM39_S = '';
    }

    if (x.COD_DIAGNOSTICO != 'C835' && x.COD_DIAGNOSTICO != 'C910' && x.COD_DIAGNOSTICO != 'C920' && x.COD_DIAGNOSTICO != 'C924' && x.COD_DIAGNOSTICO != 'C925') {
      $scope._NGM46_S = 98;
      $scope._NGM461_S = 97;
      $('#_ID46_S').prop('disabled', 'disabled');
      $('#_CH46').prop('disabled', 'disabled');
      $('#_ID461_S').prop('disabled', 'disabled');
    }

  }


  $scope.Find_Fuente = function (F) {
    if (F == 'A') {
      return 'AUTORIZACIONES'
    }
    if (F == 'R') {
      return 'RIPS'
    }
    if (F == 'C') {
      return 'CENSO HOSPITALARIO'
    }
    if (F == 'O') {
      return 'OTRAS FUENTES'
    }
  }

  $scope.initPaginacion = function (info) {
    $scope.Lista_Tabla_Temp = info;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.valmaxpag = 10;
    $scope.pages = [];
    $scope.configPages();
  }

  $scope.chg_filtrar = function (SCOPE) {
    $scope.filter($scope[SCOPE].Filtrar_Sol);
  }

  $scope.filter = function (val) {
    val = ($scope.filter_save == val) ? '' : val;
    if (val == 'Otra') {
      if ($scope.filter_save != val) {
        $scope.Lista_Tabla_Temp = $scope.Lista_Tabla.filter(function (e) {
          return e.FUENTE == 'O';
        });
      } else {
        $scope.Lista_Tabla_Temp = $filter('filter')($scope.Lista_Tabla, '');
      }
    } else {
      $scope.Lista_Tabla_Temp = $filter('filter')($scope.Lista_Tabla, ($scope.filter_save == val) ? '' : val);
    }
    if ($scope.Lista_Tabla_Temp.length > 0) {
      $scope.setPage(1);
    }
    $scope.configPages();
    $scope.filter_save = val;
  }

  $scope.configPages = function () {
    $scope.pages.length = 0;
    var ini = $scope.currentPage - 4;
    var fin = $scope.currentPage + 5;
    if (ini < 1) {
      ini = 1;
      if (Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) > $scope.valmaxpag)
        fin = 10;
      else
        fin = Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize);
    } else {
      if (ini >= Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) - $scope.valmaxpag) {
        ini = Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) - $scope.valmaxpag;
        fin = Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize);
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
  }

  $scope.setPage = function (index) {
    $scope.currentPage = index - 1;
  }

  $scope.setTab = function (newTab) {
    document.getElementById("tabscroll").scrollIntoView({ block: 'start', behavior: 'smooth' });
    $scope.tab = newTab;
    $(".tabI").removeClass("tabactiva");
    $(".tabII").removeClass("tabactiva");
    $(".tabIII").removeClass("tabactiva");
    $(".tabIV").removeClass("tabactiva");
    $(".tabV").removeClass("tabactiva");
    $(".tabVI").removeClass("tabactiva");
    $(".tabVII").removeClass("tabactiva");
    switch (newTab) {
      case 1:
        $(".tabI").addClass("tabactiva");
        break;
      case 2:
        $(".tabII").addClass("tabactiva");
        break;
      case 3:
        $(".tabIII").addClass("tabactiva");
        break;
      case 4:
        $(".tabIV").addClass("tabactiva");
        break;
      case 5:
        $(".tabV").addClass("tabactiva");
        break;
      case 6:
        $(".tabVI").addClass("tabactiva");
        break;
      case 7:
        $(".tabVII").addClass("tabactiva");
        break;
      default:

    }
  }

  $scope.isSet = function (tabNum) {
    return $scope.tab === tabNum;
  }

  $scope.Chg_check = function (NID) {
    if ($scope.sw) return false;
    var n = $('#_CH' + NID).is(':checked');
    if (n == true) {
      $("#_ID" + NID + "_L").removeClass('requerido');
      $("#_ID" + NID + "_L").addClass('normal');
    }
  }

  $scope.Chg_fecha = function (NID) {
    // if ($scope.sw) return false;
    const input = document.getElementById("_ID" + NID + "_F");
    var valor = input.value;
    valor = valor.replace(/[a-zA-Z]/g, '');
    input.value = valor;
    var expreg = new RegExp("^([1-2]{1}[0-9]{3})-(([0]{1}[1-9]{1})|([1]{1}[0-2]{1}))-(([0]{1}[1-9]{1})|([1-2]{1}[0-9]{1})|([3]{1}[0-1]{1}))$");

    if (expreg.test(input.value)) {
      if (NID == 18) {
        let fecha18 = new Date($scope._NGM18_F.split('-')[0], $scope._NGM18_F.split('-')[1] - 1, $scope._NGM18_F.split('-')[2]);
        let fecha19 = new Date($scope._NGM19_F.split('-')[0], $scope._NGM19_F.split('-')[1] - 1, $scope._NGM19_F.split('-')[2]);
        let fecha20 = new Date($scope._NGM20_F.split('-')[0], $scope._NGM20_F.split('-')[1] - 1, $scope._NGM20_F.split('-')[2]);
        if (fecha18 < fecha19 || fecha18 < fecha20) {
          Materialize.toast('¡Debe ser mayor o igual a la pregunta 19 y 20!', 3000); $('.toast').addClass('default-background-dark');
          $scope._NGM18_F = '';
        }
        if ($scope._NGM18_F > '2015-01-01') {
          $("#_ID28_S option[value='99']").hide();
        } else {
          $("#_ID28_S option[value='99']").show();
        }
      }
      if (NID == 19) {
        let fecha18 = new Date($scope._NGM18_F.split('-')[0], $scope._NGM18_F.split('-')[1] - 1, $scope._NGM18_F.split('-')[2]);
        let fecha19 = new Date($scope._NGM19_F.split('-')[0], $scope._NGM19_F.split('-')[1] - 1, $scope._NGM19_F.split('-')[2]);
        if (fecha19 > fecha18) {
          Materialize.toast('¡Debe ser menor o igual a la pregunta 18!', 3000); $('.toast').addClass('default-background-dark');
          $scope._NGM19_F = '';
        }
      }

      if (NID == 20) {
        let fecha18 = new Date($scope._NGM18_F.split('-')[0], $scope._NGM18_F.split('-')[1] - 1, $scope._NGM18_F.split('-')[2]);
        let fecha19 = new Date($scope._NGM19_F.split('-')[0], $scope._NGM19_F.split('-')[1] - 1, $scope._NGM19_F.split('-')[2]);
        let fecha20 = new Date($scope._NGM20_F.split('-')[0], $scope._NGM20_F.split('-')[1] - 1, $scope._NGM20_F.split('-')[2]);
        if (fecha20 <= fecha18 && fecha20 >= fecha19) {

        } else {
          Materialize.toast('¡Debe ser menor o igual a la pregunta 18 y mayor o igual a 19!', 3000); $('.toast').addClass('default-background-dark');
          $scope._NGM20_F = '';
        }
      }

      if (NID == 23) {
        let fecha18 = new Date($scope._NGM18_F.split('-')[0], $scope._NGM18_F.split('-')[1] - 1, $scope._NGM18_F.split('-')[2]);
        let fecha19 = new Date($scope._NGM19_F.split('-')[0], $scope._NGM19_F.split('-')[1] - 1, $scope._NGM19_F.split('-')[2]);
        let fecha20 = new Date($scope._NGM20_F.split('-')[0], $scope._NGM20_F.split('-')[1] - 1, $scope._NGM20_F.split('-')[2]);
        let fecha23 = new Date($scope._NGM23_F.split('-')[0], $scope._NGM23_F.split('-')[1] - 1, $scope._NGM23_F.split('-')[2]);
        if (fecha23 <= fecha18 && fecha23 >= fecha19 && fecha23 <= fecha20) { } else {
          Materialize.toast('¡pendiente!', 3000); $('.toast').addClass('default-background-dark');
          $scope._NGM23_F = '';
        }
      }

      if (NID == 32) {
        if ($scope._NGM31_S == '1') {
          if ($scope._NGM32_F < $scope._NGM49_F) {
            Materialize.toast('¡Debe ser menor a la pregunta 49!', 3000); $('.toast').addClass('default-background-dark');
            $scope._NGM32_F = '';
          }
        }
      }

      if (NID == 49) {
        if ($scope._NGM49_F <= $scope._NGM32_F) {
          Materialize.toast('¡Debe ser mayor a la pregunta 32!', 3000); $('.toast').addClass('default-background-dark');
          $scope._NGM49_F = '';
        }
      }

      if (NID == 71) {
        if ($scope._NGM71_F == '') {
          $scope._NGM72_S = '';
          $scope._NGM73_S = '';
        }
      }

      if (NID == 97) {
        if ($scope._CH97 == false && $scope._NGM97_F != '') {
          $scope._NGM97_S = '';
          for (let i = 98; i <= 105; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
          }
        }
      }
    }
  }

  $scope.selectChange = function (NID) {
    if (!$scope.sw) return false;
    const input = document.getElementById("_ID" + NID + "_S");
    var valor = 0;
    valor = input != null ? input.value : 0;

    if (NID == 21) {
      if (valor != 7 && valor != 99) {
        $scope._CH23 = false;
        $scope._CH24 = false;
        $scope._NGM22_S = 98;
        $scope._CH27 = false;
        $scope._CH28 = false;
        $scope._NGM27_S = '';
        $scope._NGM28_S = '';
        $('#_ID22_S').prop('disabled', 'disabled');
        for (let i = 27; i <= 28; i++) {
          $('#_ID' + i + '_S').prop('disabled', false);
          $('#_CH' + i).prop('disabled', false);
          $('#_ID' + i + '_F').prop('disabled', false);
        }
      } else if (valor == 99) {
        $scope._NGM22_S = 99;
        $('#_ID22_S').prop('disabled', 'disabled');
      } else {
        $scope._CH23 = true;
        $scope._NGM23_S = '1845-01-01';
        $scope._CH24 = true;
        $scope._NGM24_S = '1845-01-01';
        $scope._NGM22_S = '';
        $scope._CH27 = true;
        $scope._CH28 = true;
        $scope._NGM27_S = 98;
        $scope._NGM28_S = 98;
        $('#_ID22_S').prop('disabled', false);

        $('#_CH23').prop('disabled', 'disabled');
        $('#_CH24').prop('disabled', 'disabled');
        $('#_CH27').prop('disabled', 'disabled');
        $('#_CH28').prop('disabled', 'disabled');
        $('#_ID23_S').prop('disabled', 'disabled');
        $('#_ID24_S').prop('disabled', 'disabled');
        $('#_ID27_S').prop('disabled', 'disabled');
        $('#_ID28_S').prop('disabled', 'disabled');
      }
      if (valor == 1) {
        $("#_ID27_S option[value='21']").hide();
        $("#_ID27_S option[value='22']").hide();
      } else {
        $("#_ID27_S option[value='21']").show();
        $("#_ID27_S option[value='22']").show();
      }
    }

    if (NID == 27) {
      if (valor == 99) {
        $scope._CH28 = true;
        $scope._CH30 = true;
        $scope._NGM28_S = 99;
        $scope._NGM29_S = 99;
        $scope._CH30 = true;
        $scope._NGM30_S = '1800-01-01';
        $('#_ID28_S').prop('disabled', 'disabled');
        $('#_ID29_S').prop('disabled', 'disabled');
        $('#_CH28').prop('disabled', 'disabled');
        $('#_CH30').prop('disabled', 'disabled');
        $('#_ID30_S').prop('disabled', 'disabled');
      } else {
        $('#_ID29_S').prop('disabled', false);
        if (document.getElementById("_ID21_S").value != 7) {
          $('#_ID28_S').prop('disabled', false);
          $('#_CH28').prop('disabled', false);
        }
      }
    }

    if (NID == 29) {
      if (valor == 98) {
        $scope._CH30 = true;
        $scope._NGM30_S = '1845-01-01';
        $('#_CH30').prop('disabled', 'disabled');
        $('#_ID30_S').prop('disabled', 'disabled');
      } else {
        $('#_CH30').prop('disabled', false);
        $('#_ID30_S').prop('disabled', false);
      }
    }

    if (NID == 31) {
      if (valor == 2) {
        $scope._CH32 = true;
        $scope._NGM32_F = '';
        $scope._NGM32_S = '1845-01-01';
      }
      if (valor == 97) {
        $scope._CH32 = true;
        $scope._NGM32_F = '';
        $scope._NGM32_S = '1840-01-01';
        $scope._NGM33_S = '97';
        $('#_CH32').prop('disabled', false);
        $('#_ID32_F').prop('disabled', false);
        $('#_ID32_S').prop('disabled', false);
        $('#_ID33_S').prop('disabled', false);
      }
    }

    if (NID == 34) {
      if (valor == 99) {
        $scope._CH35 = true;
        $scope._NGM35_S = '1845-01-01';
        $('#_ID35_S').prop('disabled', 'disabled');
      }
    }

    if (NID == 36) {
      if (valor == 1 || valor == 2) {
        $scope._NGM38_S = "1";
      } else if (valor == 3 || valor == 4) {
        $scope._NGM38_S = "5";
        setTimeout(() => {
          $scope._NGM38_S = "5";
          $scope.$apply();
        }, 1500);
      }
      if (valor == 1 || valor == 2 || valor == 3 || valor == 4) {
        $('#_ID38_S').prop('disabled', 'disabled');
      } else {
        $('#_ID38_S').prop('disabled', false);
      }
    }

    if (NID == 41) {
      if (valor == 1) {
        $scope._NGM45_S = 98;
        $scope._NGM46_S = 98;
        $scope._NGM461_S = 97;
        $scope._NGM462_S = 97;
        $scope._NGM463_S = 97;
        $scope._NGM464_S = 97;
        $scope._NGM465_S = 97;
        $scope._NGM466_S = 97;
        $scope._NGM467_S = 97;
        $scope._NGM468_S = 97;
        $scope._CH47 = true;
        $scope._NGM47_S = 98;
        $scope._NGM48_S = 98;
        $scope._CH49 = true;
        $scope._NGM49_S = '1845-01-01';
        $scope._CH50 = true;
        $scope._NGM50_S = 98;
        $scope._CH51 = true;
        $scope._NGM51_S = 98;
        $scope._CH52 = true;
        $scope._NGM52_S = 98;
        $scope._CH53 = true;
        $scope._NGM53_S = 98;
        $scope._NGM531_S = "98-NO APLICA";
        $scope._NGM532_S = "98-NO APLICA";
        $scope._NGM533_S = "98-NO APLICA";
        $scope._NGM534_S = "98-NO APLICA";
        $scope._NGM535_S = "98-NO APLICA";
        $scope._NGM536_S = "98-NO APLICA";
        $scope._NGM537_S = "98-NO APLICA";
        $scope._NGM538_S = "98-NO APLICA";
        $scope._NGM539_S = "98-NO APLICA";
        $scope._NGM54_S = "98-NO APLICA";
        $scope._NGM55_S = "98-NO APLICA";
        $scope._NGM56_S = "98-NO APLICA";
        $scope._NGM57_S = 98;
        $scope._CH58 = true;
        $scope._NGM58_S = '1845-01-01';
        $scope._NGM59_S = 98;
        $scope._NGM60_S = 98;
        $scope._NGM61_S = 98;
        $scope._CH62 = true;
        $scope._NGM62_S = '1845-01-01';
        $scope._CH63 = true;
        $scope._NGM63_S = 98;
        $scope._CH64 = true;
        $scope._NGM64_S = 98;
        $scope._CH65 = true;
        $scope._NGM65_S = 98;
        $scope._CH66 = true;
        $scope._NGM66_S = 98;
        $scope._CH661 = true;
        $scope._NGM661_S = "98-NO APLICA";
        $scope._NGM662_S = "98-NO APLICA";
        $scope._NGM663_S = "98-NO APLICA";
        $scope._NGM664_S = "98-NO APLICA";
        $scope._NGM665_S = "98-NO APLICA";
        $scope._NGM666_S = "98-NO APLICA";
        $scope._NGM667_S = "98-NO APLICA";
        $scope._NGM668_S = "98-NO APLICA";
        $scope._NGM669_S = "98-NO APLICA";
        $scope._NGM67_S = "98-NO APLICA";
        $scope._NGM68_S = "98-NO APLICA";
        $scope._NGM69_S = "98-NO APLICA";
        $scope._NGM70_S = 98;
        $scope._CH71 = true;
        $scope._NGM71_S = '1845-01-01';
        $scope._NGM72_S = 98;
        $scope._NGM73_S = 98;
        $scope._NGM74_S = 2;
        $scope._CH75 = true;
        $scope._NGM75_S = 98;
        $scope._CH76 = true;
        $scope._NGM76_S = '1845-01-01';
        $scope._CH77 = true;
        $scope._NGM77_S = 98;
        $scope._NGM78_S = 98;
        $scope._NGM79_S = 98;
        $scope._CH80 = true;
        $scope._NGM80_S = '1845-01-01';
        $scope._NGM81_S = 98;
        $scope._CH82 = true;
        $scope._NGM82_S = 98;
        $scope._CH83 = true;
        $scope._NGM83_S = 98;
        $scope._NGM84_S = 98;
        $scope._NGM85_S = 98;
        $scope._NGM86_S = 98;
        $scope._CH87 = true;
        $scope._NGM87_S = 98;
        $scope._CH88 = true;
        $scope._NGM88_S = '1845-01-01';
        $scope._NGM89_S = 98;
        $scope._NGM90_S = 98;
        $scope._CH91 = true;
        $scope._NGM91_S = 98;
        $scope._CH92 = true;
        $scope._NGM92_S = 98;
        $scope._CH93 = true;
        $scope._NGM93_S = 98;
        $scope._CH94 = true;
        $scope._NGM94_S = '1845-01-01';
        $scope._NGM95_S = 98;
        $scope._NGM96_S = 98;
        $scope._CH97 = true;
        $scope._NGM97_S = '1845-01-01';
        $scope._NGM98_S = 98;
        $scope._CH99 = true;
        $scope._NGM99_S = 98;
        $scope._CH100 = true;
        $scope._NGM100_S = 98;
        $scope._CH101 = true;
        $scope._NGM101_S = 98;
        $scope._CH102 = true;
        $scope._NGM102_S = 98;
        $scope._CH103 = true;
        $scope._NGM103_S = '1845-01-01';
        $scope._NGM104_S = 98;
        $scope._NGM105_S = 98;
        $scope._NGM106_S = 98;
        $scope._NGM107_S = 98;
        $scope._NGM108_S = 98;
        $scope._CH109 = true;
        $scope._NGM109_S = '1845-01-01';
        $scope._CH110 = true;
        $scope._NGM110_S = 98;
        $scope._NGM111_S = 98;
        $scope._CH112 = true;
        $scope._NGM112_S = '1845-01-01';
        $scope._CH113 = true;
        $scope._NGM113_S = 98;
        $scope._NGM114_S = 2;
        $scope._NGM1141_S = 2;
        $scope._NGM1142_S = 2;
        $scope._NGM1143_S = 2;
        $scope._NGM1144_S = 2;
        $scope._NGM1145_S = 2;
        $scope._NGM1146_S = 2;
        $scope._CH115 = true;
        $scope._NGM115_S = '1845-01-01';
        $scope._CH116 = true;
        $scope._NGM116_S = 98;
        $scope._NGM117_S = 98;
        $scope._CH118 = true;
        $scope._NGM118_S = '1845-01-01';
        $scope._CH119 = true;
        $scope._NGM119_S = 98;
        $scope._NGM120_S = 98;
        $scope._CH121 = true;
        $scope._NGM121_S = '1845-01-01';
        $scope._CH122 = true;
        $scope._NGM122_S = 98;
        $scope._NGM123_S = 4;
        $scope._NGM124_S = 98;
        $scope._CH130 = true;
        $scope._NGM130_S = '1845-01-01';
        $scope._CH131 = true;
        $scope._NGM131_S = '1845-01-01';
        $scope._NGM132_S = 98;
      }
      if (valor == 3) {
        $scope._NGM45_S = 98;
        $scope._NGM46_S = 98;
        $scope._NGM461_S = 97;
        $scope._NGM462_S = 97;
        $scope._NGM463_S = 97;
        $scope._NGM464_S = 97;
        $scope._NGM465_S = 97;
        $scope._NGM466_S = 97;
        $scope._NGM467_S = 97;
        $scope._NGM468_S = 97;
        $scope._CH47 = true;
        $scope._NGM47_S = 98;
        $scope._NGM48_S = 98;
        $scope._CH49 = true;
        $scope._NGM49_S = '1845-01-01';
        $scope._CH50 = true;
        $scope._NGM50_S = 98;
        $scope._CH51 = true;
        $scope._CH52 = true;
        $scope._CH53 = true;
        $scope._NGM51_S = 98;
        $scope._NGM52_S = 98;
        $scope._NGM53_S = 98;
        $scope._NGM531_S = "98-NO APLICA";
        $scope._NGM532_S = "98-NO APLICA";
        $scope._NGM533_S = "98-NO APLICA";
        $scope._NGM534_S = "98-NO APLICA";
        $scope._NGM535_S = "98-NO APLICA";
        $scope._NGM536_S = "98-NO APLICA";
        $scope._NGM537_S = "98-NO APLICA";
        $scope._NGM538_S = "98-NO APLICA";
        $scope._NGM539_S = "98-NO APLICA";
        $scope._NGM54_S = "98-NO APLICA";
        $scope._NGM55_S = "98-NO APLICA";
        $scope._NGM56_S = "98-NO APLICA";
        $scope._NGM57_S = 98;
        $scope._CH58 = true;
        $scope._NGM58_S = '1845-01-01';
        $scope._NGM59_S = 98;
        $scope._NGM60_S = 98;
        $scope._NGM61_S = 98;
        $scope._CH62 = true;
        $scope._NGM62_S = '1845-01-01';
        $scope._CH63 = true;
        $scope._NGM63_S = 98;
        $scope._CH64 = true;
        $scope._NGM64_S = 98;
        $scope._CH65 = true;
        $scope._NGM65_S = 98;
        $scope._CH66 = true;
        $scope._NGM66_S = 98;
        $scope._CH661 = true;
        $scope._NGM661_S = "98-NO APLICA";
        $scope._NGM662_S = "98-NO APLICA";
        $scope._NGM663_S = "98-NO APLICA";
        $scope._NGM664_S = "98-NO APLICA";
        $scope._NGM665_S = "98-NO APLICA";
        $scope._NGM666_S = "98-NO APLICA";
        $scope._NGM667_S = "98-NO APLICA";
        $scope._NGM668_S = "98-NO APLICA";
        $scope._NGM669_S = "98-NO APLICA";
        $scope._NGM67_S = "98-NO APLICA";
        $scope._NGM68_S = "98-NO APLICA";
        $scope._NGM69_S = "98-NO APLICA";
        $scope._NGM70_S = 98;
        $scope._CH71 = true;
        $scope._NGM71_S = '1845-01-01';
        $scope._NGM72_S = 98;
        $scope._NGM73_S = 98;
        $scope._NGM74_S = 2;
        $scope._CH75 = true;
        $scope._NGM75_S = 98;
        $scope._CH76 = true;
        $scope._NGM76_S = '1845-01-01';
        $scope._CH77 = true;
        $scope._NGM77_S = 98;
        $scope._NGM78_S = 98;
        $scope._NGM79_S = 98;
        $scope._CH80 = true;
        $scope._NGM80_S = '1845-01-01';
        $scope._NGM81_S = 98;
        $scope._CH82 = true;
        $scope._NGM82_S = 98;
        $scope._CH83 = true;
        $scope._NGM83_S = 98;
        $scope._NGM84_S = 98;
        $scope._NGM85_S = 98;
        $scope._NGM86_S = 98;
        $scope._CH87 = true;
        $scope._NGM87_S = 98;
        $scope._CH88 = true;
        $scope._NGM88_S = '1845-01-01';
        $scope._NGM89_S = 98;
        $scope._NGM90_S = 98;
        $scope._CH91 = true;
        $scope._NGM91_S = 98;
        $scope._CH92 = true;
        $scope._NGM92_S = 98;
        $scope._CH93 = true;
        $scope._NGM93_S = 98;
        $scope._CH94 = true;
        $scope._NGM94_S = '1845-01-01';
        $scope._NGM95_S = 98;
        $scope._NGM96_S = 98;
        $scope._CH97 = true;
        $scope._NGM97_S = '1845-01-01';
        $scope._NGM98_S = 98;
        $scope._CH99 = true;
        $scope._NGM99_S = 98;
        $scope._CH100 = true;
        $scope._NGM100_S = 98;
        $scope._CH101 = true;
        $scope._NGM101_S = 98;
        $scope._CH102 = true;
        $scope._NGM102_S = 98;
        $scope._CH103 = true;
        $scope._NGM103_S = '1845-01-01';
        $scope._NGM104_S = 98;
        $scope._NGM105_S = 98;
        $scope._NGM106_S = 98;
        $scope._NGM107_S = 98;
        $scope._NGM108_S = 98;
        $scope._CH109 = true;
        $scope._NGM109_S = '1845-01-01';
        $scope._CH110 = true;
        $scope._NGM110_S = 98;
        $scope._NGM111_S = 98;
        $scope._CH112 = true;
        $scope._NGM112_S = '1845-01-01';
        $scope._CH113 = true;
        $scope._NGM113_S = 98;
        $scope._NGM114_S = 2;
        $scope._NGM1141_S = 2;
        $scope._NGM1142_S = 2;
        $scope._NGM1143_S = 2;
        $scope._NGM1144_S = 2;
        $scope._NGM1145_S = 2;
        $scope._NGM1146_S = 2;
        $scope._CH115 = true;
        $scope._NGM115_S = '1845-01-01';
        $scope._CH116 = true;
        $scope._NGM116_S = 98;
        $scope._NGM117_S = 98;
        $scope._CH118 = true;
        $scope._NGM118_S = '1845-01-01';
        $scope._CH119 = true;
        $scope._NGM119_S = 98;
        $scope._NGM120_S = 98;
        $scope._CH121 = true;
        $scope._NGM121_S = '1845-01-01';
        $scope._CH122 = true;
        $scope._NGM122_S = 98;
        $scope._NGM123_S = 4;
        $scope._NGM124_S = 98;
        $scope._NGM125_S = 9;
        $scope._NGM126_S = 7;
        $scope._NGM127_S = 1;
        $scope._NGM129_S = 3;
        $scope._CH130 = true;
        $scope._NGM130_S = '1845-01-01';
        $scope._CH131 = true;
        $scope._NGM131_S = '1845-01-01';
        $scope._NGM132_S = 98;
      }
      if (valor == 99) {
        $scope._NGM45_S = 98;
        $scope._NGM46_S = 98;
        $scope._NGM461_S = 97;
        $scope._NGM462_S = 97;
        $scope._NGM463_S = 97;
        $scope._NGM464_S = 97;
        $scope._NGM465_S = 97;
        $scope._NGM466_S = 97;
        $scope._NGM467_S = 97;
        $scope._NGM468_S = 97;
        $scope._CH47 = true;
        $scope._NGM47_S = 98;
        $scope._NGM48_S = 98;
        $scope._CH49 = true;
        $scope._NGM49_S = '1845-01-01';
        $scope._CH50 = true;
        $scope._NGM50_S = 98;
        $scope._CH51 = true;
        $scope._CH52 = true;
        $scope._CH53 = true;
        $scope._NGM51_S = 98;
        $scope._NGM52_S = 98;
        $scope._NGM53_S = 98;
        $scope._NGM531_S = "98-NO APLICA";
        $scope._NGM532_S = "98-NO APLICA";
        $scope._NGM533_S = "98-NO APLICA";
        $scope._NGM534_S = "98-NO APLICA";
        $scope._NGM535_S = "98-NO APLICA";
        $scope._NGM536_S = "98-NO APLICA";
        $scope._NGM537_S = "98-NO APLICA";
        $scope._NGM538_S = "98-NO APLICA";
        $scope._NGM539_S = "98-NO APLICA";
        $scope._NGM54_S = "98-NO APLICA";
        $scope._NGM55_S = "98-NO APLICA";
        $scope._NGM56_S = "98-NO APLICA";
        $scope._NGM57_S = 98;
        $scope._CH58 = true;
        $scope._NGM58_S = '1845-01-01';
        $scope._NGM59_S = 98;
        $scope._NGM60_S = 98;
        $scope._NGM61_S = 98;
        $scope._CH62 = true;
        $scope._NGM62_S = '1845-01-01';
        $scope._CH63 = true;
        $scope._NGM63_S = 98;
        $scope._CH64 = true;
        $scope._NGM64_S = 98;
        $scope._CH65 = true;
        $scope._NGM65_S = 98;
        $scope._CH66 = true;
        $scope._NGM66_S = 98;
        $scope._CH661 = true;
        $scope._NGM661_S = "98-NO APLICA";
        $scope._NGM662_S = "98-NO APLICA";
        $scope._NGM663_S = "98-NO APLICA";
        $scope._NGM664_S = "98-NO APLICA";
        $scope._NGM665_S = "98-NO APLICA";
        $scope._NGM666_S = "98-NO APLICA";
        $scope._NGM667_S = "98-NO APLICA";
        $scope._NGM668_S = "98-NO APLICA";
        $scope._NGM669_S = "98-NO APLICA";
        $scope._NGM67_S = "98-NO APLICA";
        $scope._NGM68_S = "98-NO APLICA";
        $scope._NGM69_S = "98-NO APLICA";
        $scope._NGM70_S = 98;
        $scope._CH71 = true;
        $scope._NGM71_S = '1845-01-01';
        $scope._NGM72_S = 98;
        $scope._NGM73_S = 98;
        $scope._NGM74_S = 2;
        $scope._CH75 = true;
        $scope._NGM75_S = 98;
        $scope._CH76 = true;
        $scope._NGM76_S = '1845-01-01';
        $scope._CH77 = true;
        $scope._NGM77_S = 98;
        $scope._NGM78_S = 98;
        $scope._NGM79_S = 98;
        $scope._CH80 = true;
        $scope._NGM80_S = '1845-01-01';
        $scope._NGM81_S = 98;
        $scope._CH82 = true;
        $scope._NGM82_S = 98;
        $scope._CH83 = true;
        $scope._NGM83_S = 98;
        $scope._NGM84_S = 98;
        $scope._NGM85_S = 98;
        $scope._NGM86_S = 98;
        $scope._CH87 = true;
        $scope._NGM87_S = 98;
        $scope._CH88 = true;
        $scope._NGM88_S = '1845-01-01';
        $scope._NGM89_S = 98;
        $scope._NGM90_S = 98;
        $scope._CH91 = true;
        $scope._NGM91_S = 98;
        $scope._CH92 = true;
        $scope._NGM92_S = 98;
        $scope._CH93 = true;
        $scope._NGM93_S = 98;
        $scope._CH94 = true;
        $scope._NGM94_S = '1845-01-01';
        $scope._NGM95_S = 98;
        $scope._NGM96_S = 98;
        $scope._CH97 = true;
        $scope._NGM97_S = '1845-01-01';
        $scope._NGM98_S = 98;
        $scope._CH99 = true;
        $scope._NGM99_S = 98;
        $scope._CH100 = true;
        $scope._NGM100_S = 98;
        $scope._CH101 = true;
        $scope._NGM101_S = 98;
        $scope._CH102 = true;
        $scope._NGM102_S = 98;
        $scope._CH103 = true;
        $scope._NGM103_S = '1845-01-01';
        $scope._NGM104_S = 98;
        $scope._NGM105_S = 98;
        $scope._NGM106_S = 98;
        $scope._NGM107_S = 98;
        $scope._NGM108_S = 98;
        $scope._CH109 = true;
        $scope._NGM109_S = '1845-01-01';
        $scope._CH110 = true;
        $scope._NGM110_S = 98;
        $scope._NGM111_S = 98;
        $scope._CH112 = true;
        $scope._NGM112_S = '1845-01-01';
        $scope._CH113 = true;
        $scope._NGM113_S = 98;
        $scope._NGM114_S = 2;
        $scope._NGM1141_S = 2;
        $scope._NGM1142_S = 2;
        $scope._NGM1143_S = 2;
        $scope._NGM1144_S = 2;
        $scope._NGM1145_S = 2;
        $scope._NGM1146_S = 2;
        $scope._CH115 = true;
        $scope._NGM115_S = '1845-01-01';
        $scope._CH116 = true;
        $scope._NGM116_S = 98;
        $scope._NGM117_S = 98;
        $scope._CH118 = true;
        $scope._NGM118_S = '1845-01-01';
        $scope._CH119 = true;
        $scope._NGM119_S = 98;
        $scope._NGM120_S = 98;
        $scope._CH121 = true;
        $scope._NGM121_S = '1845-01-01';
        $scope._CH122 = true;
        $scope._NGM122_S = 98;
        $scope._NGM123_S = 4;
        $scope._NGM124_S = 98;
        $scope._NGM125_S = 98;
        $scope._NGM126_S = 6;
        $scope._NGM127_S = 1;
        $scope._NGM128_S = 9;
        $scope._NGM129_S = 8;
        $scope._CH130 = true;
        $scope._NGM130_S = '1845-01-01';
        $scope._CH131 = true;
        $scope._NGM131_S = '1845-01-01';
        $scope._NGM132_S = 98;
      }

      if (valor != 1 && valor != 3 & valor != 99) {
        // $scope._NGM45_S = '';
        // $scope._NGM46_S = '';
        // $scope._NGM461_S = '';
        // $scope._NGM462_S = '';
        // $scope._NGM463_S = '';
        // $scope._NGM464_S = '';
        // $scope._NGM465_S = '';
        // $scope._NGM466_S = '';
        // $scope._NGM467_S = '';
        // $scope._NGM468_S = '';
        // $scope._CH47 = false;
        // $scope._NGM47_S = '';
        // $scope._NGM48_S = '';
        // $scope._CH49 = false;
        // $scope._NGM49_S = '';
        // $scope._CH50 = false;
        // $scope._NGM50_S = '';
        // $scope._NGM51_S = '';
        // $scope._NGM52_S = '';
        // $scope._NGM53_S = '';
        // $scope._NGM531_S = '';
        // $scope._CH532_S
        // $scope._NGM534_S = '';
        // $scope._CH535_S
        // $scope._NGM536_S = '';
        // $scope._NGM537_S = '';
        // $scope._NGM538_S = '';
        // $scope._NGM539_S = '';
        // $scope._NGM54_S = '';
        // $scope._NGM55_S = '';
        // $scope._NGM56_S = '';
        // $scope._NGM57_S = '';
        // $scope._CH58 = false;
        // $scope._NGM58_S = '';
        // $scope._NGM59_S = '';
        // $scope._NGM60_S = '';
        // $scope._NGM61_S = '';
        // $scope._CH62 = false;
        // $scope._NGM62_S = '';
        // $scope._CH63 = false;
        // $scope._NGM63_S = '';
        // $scope._CH64 = false;
        // $scope._NGM64_S = '';
        // $scope._CH65 = false;
        // $scope._NGM65_S = '';
        // $scope._CH66 = false;
        // $scope._NGM66_S = '';
        // $scope._CH661 = false;
        // $scope._NGM661_S = '';
        // $scope._NGM662_S = '';
        // $scope._NGM663_S = '';
        // $scope._NGM664_S = '';
        // $scope._NGM665_S = '';
        // $scope._NGM666_S = '';
        // $scope._NGM667_S = '';
        // $scope._NGM668_S = '';
        // $scope._NGM669_S = '';
        // $scope._NGM67_S = '';
        // $scope._NGM68_S = '';
        // $scope._NGM669_S = '';
        // $scope._NGM70_S = '';
        // $scope._CH71 = false;
        // $scope._NGM71_S = '';
        // $scope._NGM72_S = '';
        // $scope._NGM73_S = '';
        // $scope._NGM74_S = '';
        // $scope._CH75 = false;
        // $scope._NGM75_S = '';
        // $scope._CH76 = false;
        // $scope._NGM76_S = '';
        // $scope._CH77 = false;
        // $scope._NGM77_S = '';
        // $scope._NGM78_S = '';
        // $scope._NGM79_S = '';
        // $scope._CH80 = false;
        // $scope._NGM80_S = '';
        // $scope._NGM81_S = '';
        // $scope._CH82 = false;
        // $scope._NGM82_S = '';
        // $scope._CH83 = false;
        // $scope._NGM83_S = '';
        // $scope._NGM84_S = '';
        // $scope._NGM85_S = '';
        // $scope._NGM86_S = '';
        // $scope._CH87 = false;
        // $scope._NGM87_S = '';
        // $scope._CH88 = false;
        // $scope._NGM88_S = '';
        // $scope._NGM89_S = '';
        // $scope._NGM90_S = '';
        // $scope._CH91 = false;
        // $scope._NGM91_S = '';
        // $scope._NGM91_S = '';
        // $scope._CH92 = false;
        // $scope._NGM92_S = '';
        // $scope._CH93 = false;
        // $scope._NGM93_S = '';
        // $scope._CH94 = false;
        // $scope._NGM94_S = '';
        // $scope._NGM95_S = '';
        // $scope._NGM96_S = '';
        // $scope._CH97 = false;
        // $scope._NGM97_S = '';
        // $scope._NGM98_S = '';
        // $scope._CH99 = false;
        // $scope._NGM99_S = '';
        // $scope._CH100 = false;
        // $scope._NGM100_S = '';
        // $scope._CH101 = false;
        // $scope._NGM101_S = '';
        // $scope._CH102 = false;
        // $scope._NGM102_S = '';
        // $scope._CH103 = false;
        // $scope._NGM103_S = '';
        // $scope._NGM104_S = '';
        // $scope._NGM105_S = '';
        // $scope._NGM106_S = '';
        // $scope._NGM107_S = '';
        // $scope._NGM107_S = '';
        // $scope._NGM108_S = '';
        // $scope._CH109 = false;
        // $scope._NGM109_S = '';
        // $scope._CH110 = false;
        // $scope._NGM110_S = '';
        // $scope._NGM111_S = '';
        // $scope._CH112 = false;
        // $scope._NGM112_S = '';
        // $scope._CH113 = false;
        // $scope._CH113_S
        // $scope._NGM114_S = '';
        // $scope._NGM1141_S = '';
        // $scope._NGM1142_S = '';
        // $scope._NGM1143_S = '';
        // $scope._NGM1144_S = '';
        // $scope._NGM1145_S = '';
        // $scope._NGM1146_S = '';
        // $scope._CH115 = false;
        // $scope._NGM115_S = '';
        // $scope._CH116 = false;
        // $scope._NGM116_S = '';
        // $scope._NGM117_S = '';
        // $scope._CH118 = false;
        // $scope._NGM118_S = '';
        // $scope._CH119
        // $scope._NGM119_S = '';
        // $scope._NGM120_S = '';
        // $scope._CH121 = false;
        // $scope._NGM121_S = '';
        // $scope._CH122 = false;
        // $scope._NGM122_S = '';
        // $scope._NGM123_S = '';
        // $scope._NGM124_S = '';
        // $scope._NGM125_S = '';
        // $scope._NGM126_S = '';
        // $scope._NGM127_S = '';
        // // $scope._NGM129_S = '';
        // $scope._CH130 = false;
        // $scope._NGM130_S = '';
        // $scope._CH131 = false;
        // $scope._NGM131_S = '';
        // $scope._NGM132_S = '';
      }
      if (valor == 1 || valor == 3 || valor == 99) {
        setTimeout(() => {
          for (let i = 47; i <= 70; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
            $('#_ID' + i + '_F').prop('disabled', 'disabled');
          }
          for (let i = 70; i <= 90; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
            $('#_ID' + i + '_F').prop('disabled', 'disabled');
          }
          for (let i = 91; i <= 124; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
            $('#_ID' + i + '_F').prop('disabled', 'disabled');
          }
          for (let i = 461; i <= 468; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
            $('#_ID' + i + '_F').prop('disabled', 'disabled');
          }
          for (let i = 531; i <= 539; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
            $('#_ID' + i + '_F').prop('disabled', 'disabled');
          }
          for (let i = 661; i <= 669; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
            $('#_ID' + i + '_F').prop('disabled', 'disabled');
          }
          for (let i = 1141; i <= 1146; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
            $('#_ID' + i + '_F').prop('disabled', 'disabled');
          }
        }, 500);
      } else if (valor == 2) {
        //ixel me mando habilitarlas
        setTimeout(() => {
          for (let i = 45; i <= 70; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
            $('#_ID' + i + '_F').prop('disabled', false);
          }
          for (let i = 70; i <= 90; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
            $('#_ID' + i + '_F').prop('disabled', false);
          }
          for (let i = 91; i <= 124; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
            $('#_ID' + i + '_F').prop('disabled', false);
          }
          for (let i = 461; i <= 468; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
            $('#_ID' + i + '_F').prop('disabled', false);
          }
          for (let i = 531; i <= 539; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
            $('#_ID' + i + '_F').prop('disabled', false);
          }
          for (let i = 661; i <= 669; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
            $('#_ID' + i + '_F').prop('disabled', false);
          }
          for (let i = 1141; i <= 1146; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
            $('#_ID' + i + '_F').prop('disabled', false);
          }
        }, 500);
      }
    }

    if (NID == 42) {
      if (valor == 1) {
        $scope._NGM128_S = 12;
        $('#_ID128_S').prop('disabled', 'disabled');
        $('#_ID43_S').prop('disabled', false);
        $('#_ID44_S').prop('disabled', false);
        $('#_CH43').prop('disabled', false);
        $('#_CH44').prop('disabled', false);
      }
      if (valor == 2) {
        $scope._CH43 = true;
        $scope._NGM43_S = '1845-01-01';
        $scope._CH44 = true;
        $scope._NGM44_S = 99;
        $('#_CH43').prop('disabled', 'disabled');
        $('#_CH44').prop('disabled', 'disabled');
        $('#_ID43_S').prop('disabled', 'disabled');
        $('#_ID44_S').prop('disabled', 'disabled');
        $('#_ID128_S').prop('disabled', false);
      }
      if (valor == 99) {
        $scope._CH43 = true;
        $scope._NGM43_S = '1800-01-01';
        $scope._CH44 = true;
        $scope._NGM44_S = 99;
        $('#_ID43_S').prop('disabled', 'disabled');
        $('#_ID44_S').prop('disabled', 'disabled');
      } if (valor != 1 && valor != 2 && valor != 99) {
        $scope._CH43 = false;
        $scope._NGM43_S = '';
        $scope._CH44 = false;
        $scope._NGM44_S = '';
        $('#_ID43_S').prop('disabled', false);
        $('#_ID44_S').prop('disabled', false);
      }
    }

    if (NID == 45) {
      if (valor == 98) {
        $scope._CH46 = true;
        $scope._NGM46_S = 98;
        $scope._NGM461_S = 97;
        $scope._NGM462_S = 97;
        $scope._NGM463_S = 97;
        $scope._NGM464_S = 97;
        $scope._NGM465_S = 97;
        $scope._NGM466_S = 97;
        $scope._NGM467_S = 97;
        $scope._NGM468_S = 97;
        $scope._CH47 = true;
        $scope._NGM47_S = 98;
        $scope._NGM48_S = 98;
        $scope._CH49 = true;
        $scope._NGM49_S = '1845-01-01';
        $scope._CH50 = true;
        $scope._CH51 = true;
        $scope._CH52 = true;
        $scope._CH53 = true;
        $scope._NGM50_S = 98;
        $scope._NGM51_S = 98;
        $scope._NGM52_S = 98;
        $scope._NGM53_S = 98;
        $scope._NGM531_S = "98-NO APLICA";
        $scope._NGM532_S = "98-NO APLICA";
        $scope._NGM534_S = "98-NO APLICA";
        $scope._NGM533_S = "98-NO APLICA";
        $scope._NGM535_S = "98-NO APLICA";
        $scope._NGM536_S = "98-NO APLICA";
        $scope._NGM537_S = "98-NO APLICA";
        $scope._NGM538_S = "98-NO APLICA";
        $scope._NGM539_S = "98-NO APLICA";
        $scope._NGM54_S = "98-NO APLICA";
        $scope._NGM55_S = "98-NO APLICA";
        $scope._NGM56_S = "98-NO APLICA";
        $scope._NGM57_S = 98;
        $scope._CH58 = true;
        $scope._NGM58_S = '1845-01-01';
        $scope._NGM59_S = 98;
        $scope._NGM60_S = 98;
        $scope._NGM61_S = 98;
        $scope._CH62 = true;
        $scope._NGM62_S = '1845-01-01';
        $scope._CH63 = true;
        $scope._NGM63_S = 98;
        $scope._CH64 = true;
        $scope._NGM64_S = 98;
        $scope._CH65 = true;
        $scope._NGM65_S = 98;
        $scope._CH66 = true;
        $scope._NGM66_S = 98;
        $scope._CH661 = true;
        $scope._NGM661_S = "98-NO APLICA";
        $scope._NGM662_S = "98-NO APLICA";
        $scope._NGM663_S = "98-NO APLICA";
        $scope._NGM664_S = "98-NO APLICA";
        $scope._NGM665_S = "98-NO APLICA";
        $scope._NGM666_S = "98-NO APLICA";
        $scope._NGM667_S = "98-NO APLICA";
        $scope._NGM668_S = "98-NO APLICA";
        $scope._NGM669_S = "98-NO APLICA";
        $scope._NGM67_S = "98-NO APLICA";
        $scope._NGM68_S = "98-NO APLICA";
        $scope._NGM69_S = "98-NO APLICA";
        $scope._NGM70_S = 98;
        $scope._CH71 = true;
        $scope._NGM71_S = '1845-01-01';
        $scope._NGM72_S = 98;
        $scope._NGM73_S = 98;
        if ($scope.cie10 == "C835" || $scope.cie10 == "C910" || $scope.cie10 == "C920" || $scope == "C924" || $scope.cie10 == "C925") {
          $scope._NGM46_S = 0;
          $scope._NGM461_S = 2;
          $scope._NGM462_S = 2;
          $scope._NGM463_S = 2;
          $scope._NGM464_S = 2;
          $scope._NGM465_S = 2;
          $scope._NGM466_S = 2;
          $scope._NGM467_S = 2;
          $scope._NGM468_S = 2;
        } else {
          $('#_ID46_S').prop('disabled', 'disabled');
          $('#_CH46').prop('disabled', 'disabled');
          for (let i = 461; i <= 468; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
          }
        }

        setTimeout(() => {
          for (let i = 47; i <= 58; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
          }
          for (let i = 58; i <= 72; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
          }

          for (let i = 661; i <= 669; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
            $('#_ID' + i + '_F').prop('disabled', 'disabled');
          }

          for (let i = 531; i <= 539; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
          }
        }, 800);
        setTimeout(() => {
          $scope.$apply();
        }, 1000);
      } else {
        setTimeout(() => {
          for (let i = 47; i <= 73; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
          }

          for (let i = 661; i <= 669; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
            $('#_ID' + i + '_F').prop('disabled', false);
          }

          for (let i = 531; i <= 539; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
          }
        }, 500);
      }
      if (valor == 1) {
        $scope._CH47 = false;
        $scope._NGM47_S = '';
        $scope._NGM48_S = '';
        $scope._CH49 = false;
        $scope._NGM49_S = '';
        $scope._CH50 = false;
        $scope._NGM50_S = '';
        $scope._NGM51_S = '';
        $scope._NGM52_S = '';
        $scope._NGM53_S = '';
        $scope._NGM531_S = "";
        $scope._NGM532_S = "";
        $scope._NGM533_S = "";
        $scope._NGM534_S = "";
        $scope._NGM535_S = "";
        $scope._NGM536_S = "";
        $scope._NGM537_S = "";
        $scope._NGM538_S = "";
        $scope._NGM539_S = "";
        $scope._NGM54_S = "";
        $scope._NGM55_S = "";
        $scope._NGM56_S = "";
        $scope._NGM57_S = '';
        $scope._CH58 = false;
        $scope._NGM58_S = '';
        $scope._NGM59_S = '';
        $scope._NGM60_S = '';

        $scope._NGM61_S = '';
        $scope._CH62 = false;
        $scope._NGM62_S = '';
        $scope._CH63 = false;
        $scope._NGM63_S = '';
        $scope._CH64 = false;
        $scope._NGM64_S = '';
        $scope._CH65 = false;
        $scope._NGM65_S = '';
        $scope._CH66 = false;
        $scope._NGM66_S = '';
        $scope._CH661 = false;
        $scope._NGM661_S = "";
        $scope._NGM662_S = "";
        $scope._NGM663_S = "";
        $scope._NGM664_S = "";
        $scope._NGM665_S = "";
        $scope._NGM666_S = "";
        $scope._NGM667_S = "";
        $scope._NGM668_S = "";
        $scope._NGM669_S = "";
        $scope._NGM67_S = "";
        $scope._NGM68_S = "";
        $scope._NGM69_S = "";
        $scope._NGM70_S = '';
        $scope._CH71 = false;
        $scope._NGM71_S = '';
        $scope._NGM72_S = '';
        $scope._NGM73_S = '';
        if ($scope.cie10 == "C835" || $scope.cie10 == "C910" || $scope.cie10 == "C920" || $scope == "C924" || $scope.cie10 == "C925") {
          $scope._NGM461_S = "";
          $scope._NGM462_S = "";
          $scope._NGM463_S = "";
          $scope._NGM464_S = "";
          $scope._NGM465_S = "";
          $scope._NGM466_S = "";
          $scope._NGM467_S = "";
          $scope._NGM468_S = "";
          $('#_ID46_S').prop('disabled', false);
          $('#_CH46').prop('disabled', false);

          for (let i = 461; i <= 468; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $("#_ID" + i + "_S option[value='97']").hide();
          }
        }
      }
      if (document.getElementById("_ID41_S").value == 2 && valor == 1) {
        if ($scope.cie10 != "C835" && $scope.cie10 != "C910" && $scope.cie10 != "C920" && $scope != "C924" && $scope.cie10 != "C925") {
          $scope._NGM46_S = 98;
          $scope._NGM461_S = 97;
          $scope._NGM4697_S = 97;
          $scope._NGM463_S = 97;
          $scope._NGM464_S = 97;
          $scope._NGM465_S = 97;
          $scope._NGM466_S = 97;
          $scope._NGM467_S = 97;
          $scope._NGM468_S = 97;
          $('#_ID46_S').prop('disabled', 'disabled');
          $('#_CH46').prop('disabled', 'disabled');
          for (let i = 461; i <= 468; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
          }
          setTimeout(() => {
            for (let i = 47; i <= 58; i++) {
              $('#_ID' + i + '_S').prop('disabled', false);
              $('#_CH' + i).prop('disabled', false);
            }
            for (let i = 58; i <= 72; i++) {
              $('#_ID' + i + '_S').prop('disabled', false);
              $('#_CH' + i).prop('disabled', false);
            }
            for (let i = 72; i <= 132; i++) {
              $('#_ID' + i + '_S').prop('disabled', false);
              $('#_CH' + i).prop('disabled', false);
            }

            for (let i = 661; i <= 669; i++) {
              $('#_ID' + i + '_S').prop('disabled', false);
              $('#_CH' + i).prop('disabled', false);
              $('#_ID' + i + '_F').prop('disabled', false);
            }

            for (let i = 531; i <= 539; i++) {
              $('#_ID' + i + '_S').prop('disabled', false);
              $('#_CH' + i).prop('disabled', false);
            }
          }, 800);
        }
      }


    }

    if (NID == 46) {
      if (valor == 0) {
        $scope._NGM461_S = 2;
        $scope._NGM462_S = 2;
        $scope._NGM463_S = 2;
        $scope._NGM464_S = 2;
        $scope._NGM465_S = 2;
        $scope._NGM466_S = 2;
        $scope._NGM467_S = 2;
        $scope._NGM468_S = 2;
        for (let i = 461; i <= 468; i++) {
          $('#_ID' + i + '_S').prop('disabled', 'disabled');
          $('#_CH' + i).prop('disabled', 'disabled');
        }
      }
    }

    if (NID == 532) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM533_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM534_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM535_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM536_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM537_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM538_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM539_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM54_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM55_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM56_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";

      }
    }

    if (NID == 533) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM534_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM535_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM536_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM537_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM538_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM539_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM54_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM55_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM56_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }
    if (NID == 534) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM535_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM536_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM537_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM538_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM539_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM54_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM55_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM56_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }
    if (NID == 535) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM536_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM537_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM538_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM539_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM54_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM55_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM56_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }
    if (NID == 536) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM537_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM538_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM539_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM54_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM55_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM56_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }
    if (NID == 537) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM538_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM539_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM54_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM55_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM56_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }
    if (NID == 538) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM539_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM54_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM55_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM56_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }
    if (NID == 539) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM54_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM55_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM56_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }


    if (NID == 54 || NID == 55) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM55_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM56_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }

    if (NID == 61) {
      if (valor == 97) {
        $scope._CH62 = true;
        $scope._NGM62_S = '1845-01-01';
        $scope._CH63 = true;
        $scope._CH64 = true;
        $scope._CH65 = true;
        $scope._CH66 = true;
        $scope._CH661 = true;
        $scope._NGM63_S = 98;
        $scope._NGM64_S = 98;
        $scope._NGM65_S = 98;
        $scope._NGM66_S = 98;
        $scope._NGM661_S = "98-NO APLICA";
        $scope._NGM662_S = "98-NO APLICA";
        $scope._NGM663_S = "98-NO APLICA";
        $scope._NGM664_S = "98-NO APLICA";
        $scope._NGM665_S = "98-NO APLICA";
        $scope._NGM666_S = "98-NO APLICA";
        $scope._NGM667_S = "98-NO APLICA";
        $scope._NGM668_S = "98-NO APLICA";
        $scope._NGM669_S = "98-NO APLICA";
        $scope._NGM67_S = "98-NO APLICA";
        $scope._NGM68_S = "98-NO APLICA";
        $scope._NGM69_S = "98-NO APLICA";
        $scope._NGM70_S = 2;
        $scope._CH71 = true;
        $scope._NGM71_S = '1845-01-01';
        $scope._NGM72_S = 98;
        $scope._NGM73_S = 98;
      }
    }

    if (NID == 662) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM663_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM664_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM665_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM666_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM667_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM668_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM669_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM67_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM68_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM69_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }

    if (NID == 663) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM664_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM665_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM666_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM667_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM668_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM669_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM67_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM68_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM69_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }

    if (NID == 664) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM665_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM666_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM667_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM668_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM669_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM67_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM68_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM69_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }

    if (NID == 665) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM666_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM667_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM668_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM669_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM67_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM68_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM69_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }

    if (NID == 666) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM667_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM668_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM669_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM67_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM68_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM69_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }

    if (NID == 667) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM668_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM669_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM67_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM68_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM69_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }

    if (NID == 668) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM669_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM67_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM68_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM69_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }

    if (NID == 669) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM67_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM68_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM69_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }

    if (NID == 67) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM68_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
        $scope._NGM69_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }

    if (NID == 68) {
      valor = valor.split("-")[0];
      if (valor == 97) {
        $scope._NGM69_S = "97-SÍ RECIBIÓ QUIMIOTERAPIA";
      }
    }

    if (NID == 71) {
      if ($scope._NGM71_S == '') {
        $scope._NGM72_S = '';
        $scope._NGM73_S = '';
      }
    }

    if (NID == 74) {
      if (valor == 2) {
        $scope._CH75 = true;
        $scope._NGM75_S = 98;
        $scope._CH76 = true;
        $scope._NGM76_S = '1845-01-01';
        $scope._CH77 = true;
        $scope._NGM77_S = 98;
        $scope._NGM78_S = '98 - NO APLICA.';
        $scope._NGM79_S = 98;
        $scope._CH80 = true;
        $scope._NGM80_S = '1845-01-01';
        $scope._NGM81_S = 98;
        $scope._NGM81_S = 98;
        $scope._CH82 = true;
        $scope._NGM82_S = 98;
        $scope._CH83 = true;
        $scope._NGM83_S = '98 - NO APLICA.';
        $scope._NGM84_S = 98;
        $scope._NGM85_S = 98;
        setTimeout(() => {
          for (let i = 75; i <= 85; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
          }
        }, 500);
      } else {
        $scope._CH75 = false;
        $scope._NGM75_S = '';
        $scope._CH76 = false;
        $scope._NGM76_S = '';
        $scope._CH77 = false;
        $scope._NGM77_S = '';
        $scope._NGM78_S = '';
        $scope._NGM79_S = '';
        $scope._CH80 = false;
        $scope._NGM80_S = '';
        $scope._NGM81_S = '';
        $scope._NGM81_S = '';
        $scope._CH82 = false;
        $scope._NGM82_S = '';
        $scope._CH83 = false;
        $scope._NGM83_S = '';
        $scope._NGM84_S = '';
        $scope._NGM85_S = '';
        setTimeout(() => {
          for (let i = 75; i <= 85; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
          }
        }, 500);
      }
    }

    if (NID == 80) {
      if (valor == '1845-01-01') {
        $scope._NGM81_S = 98;
        $scope._CH82 = true;
        $scope._NGM82_S = 98;
        $scope._CH83 = true;
        $scope._NGM83_S = '98 - NO APLICA';
        $scope._NGM84_S = 98;
        setTimeout(() => {
          for (let i = 81; i <= 84; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
          }
        }, 500);
      } else {
        $scope._NGM81_S = '';
        $scope._CH82 = false;
        $scope._NGM82_S = '';
        $scope._CH83 = false;
        $scope._NGM83_S = '';
        $scope._NGM84_S = '';
        setTimeout(() => {
          for (let i = 75; i <= 85; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
          }
        }, 500);
      }
    }

    if (NID == 86) {
      if (valor == 1) {
        for (let i = 87; i <= 96; i++) {
          if (i != 93) {
            $("#_ID" + i + "_S option[value='98']").hide();
          }
        }
      } else {
        for (let i = 87; i <= 96; i++) {
          $("#_ID" + i + "_S option[value='98']").show();
        }
      }

      if (valor == 98) {
        $scope._CH87 = true;
        $scope._NGM87_S = 98;
        $scope._CH88 = true;
        $scope._NGM88_S = '1845-01-01';
        $scope._NGM89_S = 98;
        $scope._NGM90_S = 98;
        $scope._CH91 = true;
        $scope._NGM91_S = 98;
        $scope._CH92 = true;
        $scope._NGM92_S = 98;
        $scope._CH93 = true;
        $scope._NGM93_S = 98;
        $scope._CH94 = true;
        $scope._NGM94_S = '1845-01-01';
        $scope._NGM95_S = 98;
        $scope._NGM96_S = 98;
        $scope._CH97 = true;
        $scope._NGM97_S = '1845-01-01';
        $scope._NGM98_S = 98;
        $scope._CH99 = true;
        $scope._NGM99_S = 98;
        $scope._CH100 = true;
        $scope._NGM100_S = 98;
        $scope._CH101 = true;
        $scope._NGM101_S = 98;
        $scope._CH102 = true;
        $scope._NGM102_S = 98;
        $scope._CH103 = true;
        $scope._NGM103_S = '1845-01-01';
        $scope._NGM104_S = '98';
        $scope._NGM105_S = '98';
        setTimeout(() => {
          for (let i = 87; i <= 105; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
          }
        }, 500);
      } else {
        $scope._CH87 = false;
        $scope._NGM87_S = '';
        $scope._CH88 = false;
        $scope._NGM88_S = '';
        $scope._NGM89_S = '';
        $scope._NGM90_S = '';
        $scope._CH91 = false;
        $scope._NGM91_S = '';
        $scope._CH92 = false;
        $scope._NGM92_S = '';
        $scope._CH93 = false;
        $scope._NGM93_S = '';
        $scope._CH94 = false;
        $scope._NGM94_S = '';
        $scope._NGM95_S = '';
        $scope._NGM96_S = '';
        $scope._CH97 = false;
        $scope._NGM97_S = '';
        $scope._NGM98_S = '';
        $scope._CH99 = false;
        $scope._NGM99_S = '';
        $scope._CH100 = false;
        $scope._NGM100_S = '';
        $scope._CH101 = false;
        $scope._NGM101_S = '';
        $scope._CH102 = false;
        $scope._NGM102_S = '';
        $scope._CH103 = false;
        $scope._NGM103_S = '';
        $scope._NGM104_S = '';
        $scope._NGM105_S = '';
        setTimeout(() => {
          for (let i = 87; i <= 105; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
          }
        }, 500);
      }
    }

    if (NID == 95) {
      if (valor != 2) {
        $scope._NGM96_S = 98;
        $('#_ID96_S').prop('disabled', 'disabled');
      } else {
        $scope._NGM96_S = '';
        $('#_ID96_S').prop('disabled', false);
      }
    }

    if (NID == 97) {
      if (valor == '1845-01-01') {
        $scope._NGM98_S = 98;
        $scope._CH99 = true;
        $scope._NGM99_S = 98;
        $scope._CH100 = true;
        $scope._NGM100_S = 98;
        $scope._CH101 = true;
        $scope._NGM101_S = 98;
        $scope._CH102 = true;
        $scope._NGM102_S = 98;
        $scope._CH103 = true;
        $scope._NGM103_S = '1845-01-01';
        $scope._NGM104_S = 98;
        $scope._NGM105_S = 98;
        setTimeout(() => {
          for (let i = 98; i <= 105; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
          }
        }, 500);
      } else {
        $scope._NGM98_S = '';
        $scope._CH99 = false;
        $scope._NGM99_S = '';
        $scope._CH100 = false;
        $scope._NGM100_S = '';
        $scope._CH101 = false;
        $scope._NGM101_S = '';
        $scope._CH102 = false;
        $scope._NGM102_S = '';
        $scope._CH103 = false;
        $scope._NGM103_S = '';
        $scope._NGM104_S = '';
        $scope._NGM105_S = '';
        setTimeout(() => {
          for (let i = 98; i <= 105; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
          }
        }, 500);
      }

    }

    if (NID == 104) {
      if (valor != 2) {
        $scope._NGM105_S = 98;
        $('#_ID105_S').prop('disabled', 'disabled');
      } else {
        $scope._NGM105_S = '';
        $('#_ID105_S').prop('disabled', false);
      }
    }

    if (NID == 106) {
      if (valor == 98) {
        $scope._NGM107_S = 98;
        $scope._NGM108_S = 98;
        $scope._CH109 = true;
        $scope._NGM109_S = '1845-01-01';
        $scope._CH110 = true;
        $scope._NGM110_S = 98;
        setTimeout(() => {
          for (let i = 107; i <= 110; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
          }
        }, 500);
      } else {
        $scope._NGM107_S = '';
        $scope._NGM108_S = '';
        $scope._CH109 = false;
        $scope._NGM109_S = '';
        $scope._CH110 = false;
        $scope._NGM110_S = '';
        setTimeout(() => {
          for (let i = 107; i <= 110; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
          }
        }, 500);
      }
    }

    if (NID == 111) {
      if (valor == 98) {
        $scope._CH112 = true;
        $scope._NGM112_S = '1845-01-01';
        $scope._CH113 = true;
        $scope._NGM113_S = 98;
        setTimeout(() => {
          for (let i = 112; i <= 113; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
          }
        }, 500);
      } else {
        $scope._CH112 = false;
        $scope._NGM112_S = '';
        $scope._CH113 = false;
        $scope._NGM113_S = '';
        setTimeout(() => {
          for (let i = 112; i <= 113; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
          }
        }, 500);
      }
    }

    if (NID == 114) {
      if (valor == 2) {
        $scope._NGM1141_S = 2;
        $scope._NGM1142_S = 2;
        $scope._NGM1143_S = 2;
        $scope._NGM1144_S = 2;
        $scope._NGM1145_S = 2;
        $scope._NGM1146_S = 2;
        $scope._CH115 = true;
        $scope._NGM115_S = '1845-01-01';
        $scope._CH116 = true;
        $scope._NGM116_S = 98;
        setTimeout(() => {
          for (let i = 1141; i <= 1146; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
          }
          for (let i = 115; i <= 116; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
          }
        }, 500);
      } else {
        $scope._NGM1141_S = '';
        $scope._NGM1142_S = '';
        $scope._NGM1143_S = '';
        $scope._NGM1144_S = '';
        $scope._NGM1145_S = '';
        $scope._NGM1146_S = '';
        $scope._CH115 = false;
        $scope._NGM115_S = '';
        $scope._CH116 = false;
        $scope._NGM116_S = '';
        setTimeout(() => {
          for (let i = 1141; i <= 1146; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
          }
          for (let i = 115; i <= 116; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
          }
        }, 500);
      }
    }

    if (NID == 117) {
      if (valor == 2 || valor == 98) {
        $scope._CH118 = true;
        $scope._NGM118_S = '1845-01-01';
        $scope._CH119 = true;
        $scope._NGM119_S = 98;
        setTimeout(() => {
          for (let i = 118; i <= 119; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
          }
        }, 500);
      } else {
        $scope._CH118 = false;
        $scope._NGM118_S = '';
        $scope._CH119 = false;
        $scope._NGM119_S = '';
        setTimeout(() => {
          for (let i = 118; i <= 119; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
          }
        }, 500);
      }
    }

    if (NID == 120) {
      if (valor == 2 || valor == 98) {
        $scope._CH121 = true;
        $scope._NGM121_S = '1845-01-01';
        $scope._CH122 = true;
        $scope._NGM122_S = 98;
        $scope._NGM123_S = 4;
        setTimeout(() => {
          for (let i = 121; i <= 123; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
          }
        }, 500);
      } else {
        $scope._CH121 = false;
        $scope._NGM121_S = '';
        $scope._CH122 = false;
        $scope._NGM122_S = '';
        $scope._NGM123_S = '';
        setTimeout(() => {
          for (let i = 121; i <= 123; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
          }
        }, 500);
      }
    }

    if (NID == 126) {
      if (valor == 6) {
        $scope._NGM128_S = 9;
        $scope._NGM129_S = 9;
      }
    }

    if (NID == 127) {
      if (valor == 2) {
        $scope._NGM129_S = 12;
      }
    }

    if (NID == 128) {
      if (valor == 4 || valor == 10) {
        $scope._NGM125_S = 98;
        $scope._NGM126_S = 99;
        $scope._NGM127_S = 2;
        $scope._NGM129_S = 12;
        $scope._CH130 = true;
        $scope._NGM130_S = '1845-01-01';
        $scope._NGM132_S = 4;
        $scope._CH131 = false;
        $scope._NGM131_S = '';
      } else {
        $scope._CH131 = true;
        $scope._NGM131_S = '1845-01-01';
        $scope._NGM132_S = 98;
      }

      if (valor == 4 || valor == 5 || valor == 10 || valor == 13) {
        $scope._NGM125_S = 98;
        $scope._NGM126_S = 99;
        $scope._NGM129_S = 12;
        $('#_ID125_S').prop('disabled', 'disabled');
        $('#_ID126_S').prop('disabled', 'disabled');
        $('#_ID129_S').prop('disabled', 'disabled');
      }

      if (valor != '5' || valor != '13') {
        $scope._CH130 = true;
        $scope._NGM130_S = '1845-01-01';
        $('#_CH130').prop('disabled', 'disabled');
        $('#_ID130_S').prop('disabled', 'disabled');
        $('#_ID125_S').prop('disabled', false);
        $('#_ID126_S').prop('disabled', false);
        $('#_ID129_S').prop('disabled', false);
      }
      if (valor == 5 || valor == 13) {
        $scope._CH130 = false;
        $scope._NGM130_S = '';
        $('#_CH130').prop('disabled', false);
        $('#_ID130_S').prop('disabled', false);
      }

    }

    if (NID == 150) {
      if (valor == 8) {
        $scope._CH151 = true;
        $scope._NGM151_S = 98;
        $scope._NGM152_S = 8;
        $scope._NGM153_S = 98;
        $scope._NGM155_S = 2;
        $scope._NGM156_S = 2;
        $scope._CH157 = true;
        $scope._NGM157_S = '1845-01-01';
        $scope._NGM158_S = 7;
        $scope._NGM159_S = 8;
        setTimeout(() => {
          for (let i = 151; i <= 159; i++) {
            $('#_ID' + i + '_S').prop('disabled', 'disabled');
            $('#_CH' + i).prop('disabled', 'disabled');
          }
        }, 500);
      } else {
        setTimeout(() => {
          for (let i = 151; i <= 159; i++) {
            $('#_ID' + i + '_S').prop('disabled', false);
            $('#_CH' + i).prop('disabled', false);
          }
        }, 500);
      }
    }

    setTimeout(() => {
      $scope.$apply();
    }, 500);
  }

  $scope.inputChanged = function (NID) {
    const input = document.getElementById("_ID" + NID + "_T");
    var valor = input.value;

    if (NID == 25) {
      valor = valor.replace(/[a-zA-Z]/g, '');
      $scope._NGM25_T = valor;
      if (valor.length < 12) {
        Materialize.toast('¡El valor ingresado debe contener 12 caracteres!', 3000);
        $scope._NGM25_T = '';
      }
    }

    if (NID == 51) {
      valor = valor.replace(/[a-zA-Z]/g, '');
      $scope._NGM51_T = valor;
      if (valor.length < 12) {
        Materialize.toast('¡El valor ingresado debe contener 12 caracteres!', 3000);
        $scope._NGM51_T = '';
      }
    }

    if (NID == 52) {
      valor = valor.replace(/[a-zA-Z]/g, '');
      $scope._NGM52_T = valor;
      if (valor.length < 12) {
        Materialize.toast('¡El valor ingresado debe contener 12 caracteres!', 3000);
        $scope._NGM52_T = '';
      }
    }

    if (NID == 63) {
      if (valor > 5) {
        Materialize.toast('¡El valor ingresado no debe ser superior a 5!', 3000);
        $scope._NGM63_T = "";
      }
    }

    if (NID == 64) {
      valor = valor.replace(/[a-zA-Z]/g, '');
      $scope._NGM64_T = valor;
      if (valor.length < 12) {
        Materialize.toast('¡El valor ingresado debe contener 12 caracteres!', 3000);
        $scope._NGM64_T = '';
      }
    }

    if (NID == 65) {
      valor = valor.replace(/[a-zA-Z]/g, '');
      $scope._NGM65_T = valor;
      if (valor.length < 12) {
        Materialize.toast('¡El valor ingresado debe contener 12 caracteres!', 3000);
        $scope._NGM65_T = '';
      }
    }

    if (NID == 66) {
      if (valor > 20) {
        Materialize.toast('¡El valor ingresado no debe ser superior a 20!', 3000);
        $scope._NGM66_T = "";
      }
    }

    if (NID == 77) {
      valor = valor.replace(/[a-zA-Z]/g, '');
      $scope._NGM77_T = valor;
      if (valor.length < 12) {
        Materialize.toast('¡El valor ingresado debe contener 12 caracteres!', 3000);
        $scope._NGM77_T = '';
      }
    }

    if (NID == 82) {
      valor = valor.replace(/[a-zA-Z]/g, '');
      $scope._NGM82_T = valor;
      if (valor.length < 12) {
        Materialize.toast('¡El valor ingresado debe contener 12 caracteres!', 3000);
        $scope._NGM82_T = '';
      }
    }

    if (NID == 87) {
      if (valor < 1 || valor > 100) {
        if (valor != '') {
          Materialize.toast('¡El valor ingresado no debe ser superior a 100 o  inferior a 1!', 3000);
          $scope._NGM87_T = '';
        }
      }
    } else {
      const input = document.getElementById("_ID" + NID + "_T");
      var valor = input.value;
      valor = valor.replace(/[a-zA-Z]/g, '');
    }

    if (NID == 92) {
      valor = valor.replace(/[a-zA-Z]/g, '');
      $scope._NGM92_T = valor;
      if (valor.length < 12) {
        Materialize.toast('¡El valor ingresado debe contener 12 caracteres!', 3000);
        $scope._NGM92_T = '';
      }
    }

    if (NID == 93) {
      valor = valor.replace(/[a-zA-Z]/g, '');
      $scope._NGM93_T = valor;
      if (valor.length < 12) {
        Materialize.toast('¡El valor ingresado debe contener 12 caracteres!', 3000);
        $scope._NGM93_T = '';
      }
    }

    if (NID == 101) {
      valor = valor.replace(/[a-zA-Z]/g, '');
      $scope._NGM101_T = valor;
      if (valor.length < 12) {
        Materialize.toast('¡El valor ingresado debe contener 12 caracteres!', 3000);
        $scope._NGM101_T = '';
      }
    }

    if (NID == 102) {
      valor = valor.replace(/[a-zA-Z]/g, '');
      $scope._NGM102_T = valor;
      if (valor.length < 12) {
        Materialize.toast('¡El valor ingresado debe contener 12 caracteres!', 3000);
        $scope._NGM102_T = '';
      }
    }

    if (NID == 110) {
      valor = valor.replace(/[a-zA-Z]/g, '');
      $scope._NGM113_T = valor;
      if (valor.length < 12) {
        Materialize.toast('¡El valor ingresado debe contener 12 caracteres!', 3000);
        $scope._NGM113_T = '';
      }
    }

    if (NID == 113) {
      valor = valor.replace(/[a-zA-Z]/g, '');
      $scope._NGM113_T = valor;
      if (valor.length < 12) {
        Materialize.toast('¡El valor ingresado debe contener 12 caracteres!', 3000);
        $scope._NGM113_T = '';
      }
    }

    if (NID == 116) {
      valor = valor.replace(/[a-zA-Z]/g, '');
      $scope._NGM116_T = valor;
      if (valor.length < 12) {
        Materialize.toast('¡El valor ingresado debe contener 12 caracteres!', 3000);
        $scope._NGM116_T = '';
      }
    }

    if (NID == 119) {
      valor = valor.replace(/[a-zA-Z]/g, '');
      $scope._NGM119_T = valor;
      if (valor.length < 12) {
        Materialize.toast('¡El valor ingresado debe contener 12 caracteres!', 3000);
        $scope._NGM119_T = '';
      }
    }

    if (NID == 122) {
      valor = valor.replace(/[a-zA-Z]/g, '');
      $scope._NGM122_T = valor;
      if (valor.length < 12) {
        Materialize.toast('¡El valor ingresado debe contener 12 caracteres!', 3000);
        $scope._NGM122_T = '';
      }
    }
  }

  $scope.obtRespCIE10 = function (x) {
    var select = document.getElementById("_ID38_S");
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCancer.php",
      data: {
        function: 'obtRespuestas',
        cod: x
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        if (response.data.Codigo != 1) {
          $scope._NGM27_T = response.data[0].V27 ?? '';
          $scope._NGM28_S = response.data[0].V28 ?? '';
          $scope._NGM29_S = response.data[0].V29 ?? '';
          if (response.data[0].V30 != '1800-01-01' && response.data[0].V30 != '1845-01-01') {
            $scope._NGM30_F = response.data[0].V30 ?? '';
            $scope._CH30 = false;
          } else {
            $scope._CH30 = true;
            $scope._NGM30_S = response.data[0].V30 ?? '';
          }
          $scope._NGM31_S = response.data[0].V31 ?? '';
          if (response.data[0].V32 != '1800-01-01' && response.data[0].V32 != '1840-01-01' && response.data[0].V32 != '1845-01-01') {
            $scope._NGM32_F = response.data[0].V32 ?? '';
            $scope._CH32 = false;
          } else {
            $scope._CH32 = true;
            $scope._NGM32_S = response.data[0].V32 ?? '';
          }
          $scope._NGM33_S = response.data[0].V33 ?? '';
          $scope._NGM34_S = response.data[0].V34 ?? '';
          if (response.data[0].V35 != '1845-01-01') {
            $scope._NGM35_F = response.data[0].V35 ?? '';
            $scope._CH35 = false;
          } else {
            $scope._NGM35_S = response.data[0].V35 ?? '';
            $scope._CH35 = true;
          }
          $scope._NGM36_S = response.data[0].V36 ?? '';
          $scope._NGM38_S = response.data[0].V38 ?? '';
          if (response.data[0].V39 != '1800-01-01' && response.data[0].V39 != '1845-01-01') {
            $scope._NGM39_F = response.data[0].V39 ?? '';
            $scope._CH39 = false;
          } else {
            $scope._NGM39_S = response.data[0].V39 ?? '';
            $scope._CH39 = true;
          }
          $scope._NGM46_S = response.data[0].V46 ?? '';
          $scope._NGM461_S = response.data[0].V461 ?? '';

          if (response.data[0].V_COD_AGRUPADOR == 42) {
            select.options.length = 0;
            select.add(new Option("SELECCIONAR", ""));
            select.add(new Option("1 - BAJO RIESGO", '1'));
            select.add(new Option("2 - RIESGO INTERMEDIO BAJO", '2'));
            select.add(new Option("3 - INTERMEDIO", '3'));
            select.add(new Option("4 - RIESGO INTERMEDIO ALTO", '4'));
            select.add(new Option("5 - RIESGO ALTO", '5'));
            select.add(new Option("99 - DESCONOCIDO", '99'));
          }
          if (response.data[0].V_COD_AGRUPADOR == 41) {
            select.options.length = 0;
            select.add(new Option("SELECCIONAR", ""));
            select.add(new Option("1 - BAJO RIESGO", '1'));
            select.add(new Option("5 - RIESGO ALTO", '5'));
            select.add(new Option("99 - DESCONOCIDO", '99'));
          }
          if (response.data[0].V_COD_AGRUPADOR == 19 || response.data[0].V_COD_AGRUPADOR == 20) {
            select.options.length = 0;
            select.add(new Option("SELECCIONAR", ""));
            select.add(new Option("1 - BAJO RIESGO", '1'));
            select.add(new Option("3 - INTERMEDIO", '3'));
            select.add(new Option("5 - RIESGO ALTO", '5'));
            select.add(new Option("99 - DESCONOCIDO", '99'));
          }
          if ($scope.cie10 == "C900") {
            select.options.length = 0;
            select.add(new Option("SELECCIONAR", ""));
            select.add(new Option("1 - BAJO RIESGO", '1'));
            select.add(new Option("3 - INTERMEDIO", '3'));
            select.add(new Option("5 - RIESGO ALTO", '5'));
            select.add(new Option("99 - DESCONOCIDO", '99'));
          }
          if (response.data[0].V_COD_AGRUPADOR != 42 && response.data[0].V_COD_AGRUPADOR != 41 && response.data[0].V_COD_AGRUPADOR != 19 && response.data[0].V_COD_AGRUPADOR != 20 && $scope.cie10 != "C900") {
            select.options.length = 0;
            select.add(new Option("SELECCIONAR", ""));
            select.add(new Option("98 - NO APLICA.", '98'));
          }
        }
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
    });
  }

  $scope.inicializeSwich = function () {
    $scope._CH9 = false;
    $scope._CH18 = false;
    $scope._CH19 = false;
    $scope._CH20 = false;
    $scope._CH23 = false;
    $scope._CH24 = false;
    $scope._CH25 = false;
    $scope._CH26 = false;
    $scope._CH30 = false;
    $scope._CH32 = false;
    $scope._CH35 = false;
    $scope._CH39 = false;
    $scope._CH43 = false;
    $scope._CH44 = false;
    $scope._CH58 = false;
    $scope._CH62 = false;
    $scope._CH63 = false;
    $scope._CH64 = false;
    $scope._CH65 = false;
    $scope._CH66 = false;
    $scope._CH71 = false;
    $scope._CH75 = false;
    $scope._CH76 = false;
    $scope._CH77 = false;
    $scope._CH80 = false;
    $scope._CH82 = false;
    $scope._CH83 = false;
    $scope._CH87 = false;
    $scope._CH88 = false;
    $scope._CH91 = false;
    $scope._CH92 = false;
    $scope._CH93 = false;
    $scope._CH94 = false;
    $scope._CH97 = false;
    $scope._CH99 = false;
    $scope._CH100 = false;
    $scope._CH101 = false;
    $scope._CH102 = false;
    $scope._CH103 = false;
    $scope._CH109 = false;
    $scope._CH110 = false;
    $scope._CH112 = false;
    $scope._CH113 = false;
    $scope._CH115 = false;
    $scope._CH116 = false;
    $scope._CH118 = false;
    $scope._CH119 = false;
    $scope._CH121 = false;
    $scope._CH122 = false;
    $scope._CH130 = false;
    $scope._CH131 = false;
    $scope._CH134 = false;
    $scope._CH135 = false;
    $scope._CH141 = false;
    $scope._CH143 = false;
    $scope._CH148 = false;
    $scope._CH149 = false;
    $scope._CH151 = false;
    $scope._CH157 = false;
  }

  $scope.Guardar = function () {
    $scope.hoja2Form.v_p1 = $scope._NGM1_T;
    $scope.hoja2Form.v_p2 = $scope._NGM2_T;
    $scope.hoja2Form.v_p3 = $scope._NGM3_T;
    $scope.hoja2Form.v_p4 = $scope._NGM4_T;
    $scope.hoja2Form.v_p5 = $scope._NGM5_T;
    $scope.hoja2Form.v_p6 = $scope._NGM6_T;
    $scope.hoja2Form.v_p7 = $scope._NGM7_F;
    $scope.hoja2Form.v_p8 = $scope._NGM8_T;
    $scope.hoja2Form.v_p9 = $scope._CH9 != false ? $scope._NGM9_S : $scope._NGM9_T;
    $scope.hoja2Form.v_p10 = $scope.datosComplementarios.CodigoRegimen != undefined ? $scope.datosComplementarios.CodigoRegimen : $scope._NGM10_T;
    $scope.hoja2Form.v_p11 = $scope._NGM11_T;
    $scope.hoja2Form.v_p12 = $scope._NGM12_S;
    $scope.hoja2Form.v_p13 = $scope._NGM13_S;
    $scope.hoja2Form.v_p14 = $scope._NGM14_T;
    $scope.hoja2Form.v_p15 = $scope._NGM15_T;
    $scope.hoja2Form.v_p16 = $scope._NGM16_F;
    $scope.hoja2Form.v_p17 = $scope._NGM17_T;
    $scope.hoja2Form.v_p18 = $scope._CH18 != false ? $scope._NGM18_S : $scope._NGM18_F;
    $scope.hoja2Form.v_p19 = $scope._CH19 != false ? $scope._NGM19_S : $scope._NGM19_F;
    $scope.hoja2Form.v_p20 = $scope._CH20 != false ? $scope._NGM20_S : $scope._NGM20_F;
    $scope.hoja2Form.v_p21 = $scope._NGM21_S;
    $scope.hoja2Form.v_p22 = $scope._NGM22_S;
    $scope.hoja2Form.v_p23 = $scope._CH23 != false ? $scope._NGM23_S : $scope._NGM23_F;
    $scope.hoja2Form.v_p24 = $scope._CH24 != false ? $scope._NGM24_S : $scope._NGM24_F;
    $scope.hoja2Form.v_p25 = $scope._CH25 != false ? $scope._NGM25_S : $scope._NGM25_T;
    $scope.hoja2Form.v_p26 = $scope._CH26 != false ? $scope._NGM26_S : $scope._NGM26_T;
    $scope.hoja2Form.v_p27 = $scope._NGM27_S;
    $scope.hoja2Form.v_p28 = $scope._NGM28_S;
    $scope.hoja2Form.v_p29 = $scope._NGM29_S;
    $scope.hoja2Form.v_p30 = $scope._CH30 != false ? $scope._NGM30_S : $scope._NGM30_F;
    $scope.hoja2Form.v_p31 = $scope._NGM31_S;
    $scope.hoja2Form.v_p32 = $scope._CH32 != false ? $scope._NGM32_S : $scope._NGM32_F;
    $scope.hoja2Form.v_p33 = $scope._NGM33_S;
    $scope.hoja2Form.v_p34 = $scope._NGM34_S;
    $scope.hoja2Form.v_p35 = $scope._CH35 != false ? $scope._NGM35_S : $scope._NGM35_F;
    $scope.hoja2Form.v_p36 = $scope._NGM36_S;
    $scope.hoja2Form.v_p37 = $scope._NGM37_S;
    $scope.hoja2Form.v_p38 = $scope._NGM38_S;
    $scope.hoja2Form.v_p39 = $scope._CH39 != false ? $scope._NGM39_S : $scope._NGM39_F;
    $scope.hoja2Form.v_p40 = $scope._NGM40_S;
    $scope.hoja2Form.v_p41 = $scope._NGM41_S;
    $scope.hoja2Form.v_p42 = $scope._NGM42_S;
    $scope.hoja2Form.v_p43 = $scope._CH43 != false ? $scope._NGM43_S : $scope._NGM43_F;
    $scope.hoja2Form.v_p44 = $scope._CH44 != false ? $scope._NGM44_S : $scope._NGM44_T;
    $scope.hoja2Form.v_p45 = $scope._NGM45_S;
    $scope.hoja2Form.v_p46 = $scope._CH46 != false ? $scope._NGM46_S : $scope._NGM46_T;
    $scope.hoja2Form.v_p461 = $scope._NGM461_S;
    $scope.hoja2Form.v_p462 = $scope._NGM462_S;
    $scope.hoja2Form.v_p463 = $scope._NGM463_S;
    $scope.hoja2Form.v_p464 = $scope._NGM464_S;
    $scope.hoja2Form.v_p465 = $scope._NGM465_S;
    $scope.hoja2Form.v_p466 = $scope._NGM466_S;
    $scope.hoja2Form.v_p467 = $scope._NGM467_S;
    $scope.hoja2Form.v_p468 = $scope._NGM468_S;
    $scope.hoja2Form.v_p47 = $scope._CH47 != false ? $scope._NGM47_S : $scope._NGM47_T;
    $scope.hoja2Form.v_p48 = $scope._NGM48_S;
    $scope.hoja2Form.v_p49 = $scope._CH49 != false ? $scope._NGM49_S : $scope._NGM49_F;
    $scope.hoja2Form.v_p50 = $scope._CH50 != false ? $scope._NGM50_S : $scope._NGM50_T;
    $scope.hoja2Form.v_p51 = $scope._CH51 != false ? $scope._NGM51_S : $scope._NGM51_T;
    $scope.hoja2Form.v_p52 = $scope._CH52 != false ? $scope._NGM52_S : $scope._NGM52_T;
    $scope.hoja2Form.v_p53 = $scope._CH53 != false ? $scope._NGM53_S : $scope._NGM53_T;
    $scope.hoja2Form.v_p531 = $scope._NGM531_S != undefined ? $scope._NGM531_S.split("-")[0] : "";
    $scope.hoja2Form.v_p532 = $scope._NGM532_S != undefined ? $scope._NGM532_S.split("-")[0] : "";
    $scope.hoja2Form.v_p533 = $scope._NGM533_S != undefined ? $scope._NGM533_S.split("-")[0] : "";
    $scope.hoja2Form.v_p534 = $scope._NGM534_S != undefined ? $scope._NGM534_S.split("-")[0] : "";
    $scope.hoja2Form.v_p535 = $scope._NGM535_S != undefined ? $scope._NGM535_S.split("-")[0] : "";
    $scope.hoja2Form.v_p536 = $scope._NGM536_S != undefined ? $scope._NGM536_S.split("-")[0] : "";
    $scope.hoja2Form.v_p537 = $scope._NGM537_S != undefined ? $scope._NGM537_S.split("-")[0] : "";
    $scope.hoja2Form.v_p538 = $scope._NGM538_S != undefined ? $scope._NGM538_S.split("-")[0] : "";
    $scope.hoja2Form.v_p539 = $scope._NGM539_S != undefined ? $scope._NGM539_S.split("-")[0] : "";
    $scope.hoja2Form.v_p54 = $scope._NGM54_S != undefined ? $scope._NGM54_S.split("-")[0] : "";
    if ($scope.hoja2Form.v_p54 == 96 && $scope.hoja2Form.v_p54 != '') {
      $scope.hoja2Form.v_p54 = 97;
    }
    if ($scope.hoja2Form.v_p54 == 99 && $scope.hoja2Form.v_p54 != '') {
      $scope.hoja2Form.v_p54 = 98;
    }
    $scope.hoja2Form.v_p55 = $scope._NGM55_S != undefined ? $scope._NGM55_S.split("-")[0] : "";
    if ($scope.hoja2Form.v_p55 == 96 && $scope.hoja2Form.v_p55 != '') {
      $scope.hoja2Form.v_p55 = 97;
    }
    if ($scope.hoja2Form.v_p55 == 99 && $scope.hoja2Form.v_p55 != '') {
      $scope.hoja2Form.v_p55 = 98;
    } $scope.hoja2Form.v_p56 = $scope._NGM56_S != undefined ? $scope._NGM56_S.split("-")[0] : "";
    if ($scope.hoja2Form.v_p56 == 96 && $scope.hoja2Form.v_p56 != '') {
      $scope.hoja2Form.v_p56 = 97;
    }
    if ($scope.hoja2Form.v_p56 == 99 && $scope.hoja2Form.v_p56 != '') {
      $scope.hoja2Form.v_p56 = 98;
    } $scope.hoja2Form.v_p57 = $scope._NGM57_S;
    $scope.hoja2Form.v_p58 = $scope._CH58 != false ? $scope._NGM58_S : $scope._NGM58_F;
    $scope.hoja2Form.v_p59 = $scope._NGM59_S;
    $scope.hoja2Form.v_p60 = $scope._NGM60_S;
    $scope.hoja2Form.v_p61 = $scope._NGM61_S;
    $scope.hoja2Form.v_p62 = $scope._CH62 != false ? $scope._NGM62_S : $scope._NGM62_F;
    $scope.hoja2Form.v_p63 = $scope._CH63 != false ? $scope._NGM63_S : $scope._NGM63_T;
    $scope.hoja2Form.v_p64 = $scope._CH64 != false ? $scope._NGM64_S : $scope._NGM64_T;
    $scope.hoja2Form.v_p65 = $scope._CH65 != false ? $scope._NGM65_S : $scope._NGM65_T;
    $scope.hoja2Form.v_p66 = $scope._CH66 != false ? $scope._NGM66_S : $scope._NGM66_T;
    $scope.hoja2Form.v_p661 = $scope._NGM661_S != undefined ? $scope._NGM661_S.split("-")[0] : '';
    $scope.hoja2Form.v_p662 = $scope._NGM662_S != undefined ? $scope._NGM662_S.split("-")[0] : '';
    $scope.hoja2Form.v_p663 = $scope._NGM663_S != undefined ? $scope._NGM663_S.split("-")[0] : '';
    $scope.hoja2Form.v_p664 = $scope._NGM664_S != undefined ? $scope._NGM664_S.split("-")[0] : '';
    $scope.hoja2Form.v_p665 = $scope._NGM665_S != undefined ? $scope._NGM665_S.split("-")[0] : '';
    $scope.hoja2Form.v_p666 = $scope._NGM666_S != undefined ? $scope._NGM666_S.split("-")[0] : '';
    $scope.hoja2Form.v_p667 = $scope._NGM667_S != undefined ? $scope._NGM667_S.split("-")[0] : '';
    $scope.hoja2Form.v_p668 = $scope._NGM668_S != undefined ? $scope._NGM668_S.split("-")[0] : '';
    $scope.hoja2Form.v_p669 = $scope._NGM669_S != undefined ? $scope._NGM669_S.split("-")[0] : '';
    $scope.hoja2Form.v_p67 = $scope._NGM67_S != undefined ? $scope._NGM67_S.split("-")[0] : '';
    $scope.hoja2Form.v_p68 = $scope._NGM68_S != undefined ? $scope._NGM68_S.split("-")[0] : '';
    $scope.hoja2Form.v_p69 = $scope._NGM69_S != undefined ? $scope._NGM69_S.split("-")[0] : '';
    $scope.hoja2Form.v_p70 = $scope._NGM70_S;
    $scope.hoja2Form.v_p71 = $scope._CH71 != false ? $scope._NGM71_S : $scope._NGM71_F;
    $scope.hoja2Form.v_p72 = $scope._NGM72_S;
    $scope.hoja2Form.v_p73 = $scope._NGM73_S;
    $scope.hoja2Form.v_p74 = $scope._NGM74_S;
    $scope.hoja2Form.v_p75 = $scope._CH75 != false ? $scope._NGM75_S : $scope._NGM75_T;
    $scope.hoja2Form.v_p76 = $scope._CH76 != false ? $scope._NGM76_S : $scope._NGM76_F;
    $scope.hoja2Form.v_p77 = $scope._CH77 != false ? $scope._NGM77_S : $scope._NGM77_T;
    $scope.hoja2Form.v_p78 = $scope._NGM78_S != undefined ? $scope._NGM78_S.split("-")[0] : '';
    $scope.hoja2Form.v_p79 = $scope._NGM79_S;
    $scope.hoja2Form.v_p80 = $scope._CH80 != false ? $scope._NGM80_S : $scope._NGM80_F;
    $scope.hoja2Form.v_p81 = $scope._NGM81_S;
    $scope.hoja2Form.v_p82 = $scope._CH82 != false ? $scope._NGM82_S : $scope._NGM82_T;
    $scope.hoja2Form.v_p83 = $scope._NGM83_S != undefined ? $scope._NGM83_S.split("-")[0] : '';
    $scope.hoja2Form.v_p84 = $scope._NGM84_S;
    $scope.hoja2Form.v_p85 = $scope._NGM85_S;
    $scope.hoja2Form.v_p86 = $scope._NGM86_S;
    $scope.hoja2Form.v_p87 = $scope._CH87 != false ? $scope._NGM87_S : $scope._NGM87_T;
    $scope.hoja2Form.v_p88 = $scope._CH88 != false ? $scope._NGM88_S : $scope._NGM88_F;
    $scope.hoja2Form.v_p89 = $scope._NGM89_S;
    $scope.hoja2Form.v_p90 = $scope._NGM90_S != undefined ? $scope._NGM90_S.split("-")[0] : '';
    $scope.hoja2Form.v_p91 = $scope._CH91 != false ? $scope._NGM91_S : $scope._NGM91_T;
    $scope.hoja2Form.v_p92 = $scope._CH92 != false ? $scope._NGM92_S : $scope._NGM92_T;
    $scope.hoja2Form.v_p93 = $scope._CH93 != false ? $scope._NGM93_S : $scope._NGM93_T;
    $scope.hoja2Form.v_p94 = $scope._CH94 != false ? $scope._NGM94_S : $scope._NGM94_F;
    $scope.hoja2Form.v_p95 = $scope._NGM95_S;
    $scope.hoja2Form.v_p96 = $scope._NGM96_S;
    $scope.hoja2Form.v_p97 = $scope._CH97 != false ? $scope._NGM97_S : $scope._NGM97_F;
    $scope.hoja2Form.v_p98 = $scope._NGM98_S;
    $scope.hoja2Form.v_p99 = $scope._NGM99_S != undefined ? $scope._NGM99_S.split("-")[0] : '';
    $scope.hoja2Form.v_p100 = $scope._CH100 != false ? $scope._NGM100_S : $scope._NGM100_T;
    $scope.hoja2Form.v_p101 = $scope._CH101 != false ? $scope._NGM101_S : $scope._NGM101_T;
    $scope.hoja2Form.v_p102 = $scope._CH102 != false ? $scope._NGM102_S : $scope._NGM102_T;
    $scope.hoja2Form.v_p103 = $scope._CH103 != false ? $scope._NGM103_S : $scope._NGM103_F;
    $scope.hoja2Form.v_p104 = $scope._NGM104_S;
    $scope.hoja2Form.v_p105 = $scope._NGM105_S;
    $scope.hoja2Form.v_p106 = $scope._NGM106_S;
    $scope.hoja2Form.v_p107 = $scope._NGM107_S;
    $scope.hoja2Form.v_p108 = $scope._NGM108_S;
    $scope.hoja2Form.v_p109 = $scope._CH109 != false ? $scope._NGM109_S : $scope._NGM109_F;
    $scope.hoja2Form.v_p110 = $scope._CH110 != false ? $scope._NGM110_S : $scope._NGM110_T;
    $scope.hoja2Form.v_p111 = $scope._NGM111_S;
    $scope.hoja2Form.v_p112 = $scope._CH112 != false ? $scope._NGM112_S : $scope._NGM112_F;
    $scope.hoja2Form.v_p113 = $scope._CH113 != false ? $scope._NGM113_S : $scope._NGM113_T;
    $scope.hoja2Form.v_p114 = $scope._NGM114_S;
    $scope.hoja2Form.v_p1141 = $scope._NGM1141_S;
    $scope.hoja2Form.v_p1142 = $scope._NGM1142_S;
    $scope.hoja2Form.v_p1143 = $scope._NGM1143_S;
    $scope.hoja2Form.v_p1144 = $scope._NGM1144_S;
    $scope.hoja2Form.v_p1145 = $scope._NGM1145_S;
    $scope.hoja2Form.v_p1146 = $scope._NGM1146_S;
    $scope.hoja2Form.v_p115 = $scope._CH115 != false ? $scope._NGM115_S : $scope._NGM115_F;
    $scope.hoja2Form.v_p116 = $scope._CH116 != false ? $scope._NGM116_S : $scope._NGM116_T;
    $scope.hoja2Form.v_p117 = $scope._NGM117_S;
    $scope.hoja2Form.v_p118 = $scope._CH118 != false ? $scope._NGM118_S : $scope._NGM118_F;
    $scope.hoja2Form.v_p119 = $scope._CH119 != false ? $scope._NGM119_S : $scope._NGM119_T;
    $scope.hoja2Form.v_p120 = $scope._NGM120_S;
    $scope.hoja2Form.v_p121 = $scope._CH121 != false ? $scope._NGM121_S : $scope._NGM121_F;
    $scope.hoja2Form.v_p122 = $scope._CH122 != false ? $scope._NGM122_S : $scope._NGM122_T;
    $scope.hoja2Form.v_p123 = $scope._NGM123_S;
    $scope.hoja2Form.v_p124 = $scope._NGM124_S;
    $scope.hoja2Form.v_p125 = $scope._NGM125_S;
    $scope.hoja2Form.v_p126 = $scope._NGM126_S;
    $scope.hoja2Form.v_p127 = $scope._NGM127_S;
    $scope.hoja2Form.v_p128 = $scope._NGM128_S;
    $scope.hoja2Form.v_p129 = $scope._NGM129_S;
    $scope.hoja2Form.v_p130 = $scope._CH130 != false ? $scope._NGM130_S : $scope._NGM130_F;
    $scope.hoja2Form.v_p131 = $scope._CH131 != false ? $scope._NGM131_S : $scope._NGM131_F;
    $scope.hoja2Form.v_p132 = $scope._NGM132_S;
    $scope.hoja2Form.v_p133 = $scope._NGM133_T;
    $scope.hoja2Form.v_p134 = $scope._CH134 != false ? $scope._NGM134_S : $scope._NGM134_F;
    $scope.hoja2Form.v_p135 = $scope._CH135 != false ? $scope._NGM135_S : $scope._NGM135_T;
    $scope.hoja2Form.v_p136 = $scope._NGM136_S;
    $scope.hoja2Form.v_p137 = $scope._NGM137_F;
    $scope.hoja2Form.v_p138 = $scope._NGM138_F;
    $scope.hoja2Form.v_p139 = $scope._NGM139_T;
    $scope.hoja2Form.v_p140 = $scope._NGM140_T;
    $scope.hoja2Form.v_p141 = $scope._CH141 != false ? $scope._NGM141_S : $scope._NGM141_F;
    $scope.hoja2Form.v_p142 = $scope._NGM142_T;
    $scope.hoja2Form.v_p143 = $scope._CH143 != false ? $scope._NGM143_S : $scope._NGM143_F;
    $scope.hoja2Form.v_p144 = $scope._NGM144_T;
    $scope.hoja2Form.v_p145 = $scope._NGM145_T;
    $scope.hoja2Form.v_p146 = $scope._NGM146_T;

    const arrRespMedicamento = [
      $scope.hoja2Form.v_p531,
      $scope.hoja2Form.v_p532,
      $scope.hoja2Form.v_p533,
      $scope.hoja2Form.v_p534,
      $scope.hoja2Form.v_p535,
      $scope.hoja2Form.v_p536,
      $scope.hoja2Form.v_p537,
      $scope.hoja2Form.v_p538,
      $scope.hoja2Form.v_p539,
      $scope.hoja2Form.v_p54,
      $scope.hoja2Form.v_p55,
      $scope.hoja2Form.v_p56,
    ];
    var repetidos = [];
    var temporal = [];
    arrRespMedicamento.forEach((value, index) => {
      temporal = Object.assign([], arrRespMedicamento); //Copiado de elemento
      temporal.splice(index, 1); //Se elimina el elemnto q se compara
      if (temporal.indexOf(value) != -1 && repetidos.indexOf(value) == -1) {
        if (value != '' && value != undefined) {
          value = value.split("-")[0];
        }
        if (value != 98 && value != 97 && value != '' && value != undefined) {
          repetidos.push(value);
        }
      }
    });
    if (repetidos.length > 0) {
      swal({
        title: "¡IMPORTANTE!",
        text: 'Se encontraron respuestas repetidas en medicamentos.',
        type: "info",
      }).catch(swal.noop);
    } else {
      swal({ title: 'Cargando...', allowOutsideClick: false });
      swal.showLoading();
      $http({
        method: 'POST',
        url: "php/altocosto/seguimientoCancer.php",
        data: {
          function: 'Guardar',
          formulario: JSON.stringify($scope.hoja2Form)
        }
      }).then(function (response) {
        if (response.data.Codigo != undefined || response.data.toString().substr(0, 3) != '<br') {
          swal({
            title: "¡IMPORTANTE!",
            text: response.data.Nombre,
            type: response.data.Codigo == '0' ? "success" : "info",
          }).catch(swal.noop);
          if (response.data.Codigo == '3') {
            return;
          }
        }
      });
      $scope.regresar();
      $scope.Var_Nacional.Filtrar_Sol = '';
      //swal.close();
    }
  }

  $scope.respRips = function (doc) {
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCancer.php",
      data: {
        function: 'obtenerResp_Rips',
        ced: doc
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        $scope._NGM138_F = response.data.FECHA_ULTIMA_ATENCION;
        $scope._NGM139_T = response.data.TIPO_ATENCION;
        $scope._NGM140_T = response.data.ESPECIALIDAD_MEDICA;
        for (let i = 138; i <= 140; i++) {
          $('#_ID' + i + '_S').prop('disabled', 'disabled');
          $('#_CH' + i).prop('disabled', 'disabled');
          $('#_ID' + i + '_F').prop('disabled', 'disabled');
        }
      }
    });
  }

  $scope.respCenso = function (tipoDoc, doc) {
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCancer.php",
      data: {
        function: 'obtenerResp_Censo',
        tipoDoc: tipoDoc,
        ced: doc
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        if (response.data != "") {
          $scope._NGM141_F = response.data.FECHA_HOSPITALIZACION;
          $scope._NGM142_T = response.data.DIAGNOSTICO;
        } else {
          $scope._NGM141_F = 'NO APLICA';
          $scope._NGM142_T = 'NO APLICA';
        }
        for (let i = 141; i <= 142; i++) {
          $('#_ID' + i + '_S').prop('disabled', 'disabled');
          $('#_CH' + i).prop('disabled', 'disabled');
          $('#_ID' + i + '_F').prop('disabled', 'disabled');
        }
      }
    });
  }

  $scope.respMedicamentos = function (tipoDoc, doc) {
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCancer.php",
      data: {
        function: 'obtenerResp_Medicamentos',
        tipoDoc: tipoDoc,
        ced: doc
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        $scope.arrMedicamentos = response.data;
      }
    });
  }

  $scope.respPQR = function (doc) {
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCancer.php",
      data: {
        function: 'obtenerResp_PQR',
        doc: doc
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        if (response.data.length != 0) {
          $scope._NGM143_F = response.data[0].fecha_radicado;
          $scope._NGM144_T = response.data[0].numero_radicado;
          $scope._NGM145_T = response.data[0].motivo_radicado;
          $scope._NGM146_T = response.data[0].estado_pqr;
        } else {
          $scope._CH143 = true;
          $scope._NGM143_S = "1800-01-01";
          $scope._NGM144_T = "NO APLICA";
          $scope._NGM145_T = "NO APLICA";
          $scope._NGM146_T = "NO APLICA";
        }
        for (let i = 143; i <= 146; i++) {
          $('#_ID' + i + '_S').prop('disabled', 'disabled');
          $('#_CH' + i).prop('disabled', 'disabled');
          $('#_ID' + i + '_F').prop('disabled', 'disabled');
        }
      }
    });
  }

  $scope.validMenorEdad = function (x) {

    var birth_year = new Date(x).getFullYear();
    var birth_month = new Date(x).getMonth();
    var birth_day = new Date(x).getDay();

    var today_date = new Date();
    var today_year = today_date.getFullYear();
    var today_month = today_date.getMonth();
    var today_day = today_date.getDate();
    $scope.age = today_year - birth_year;

    if (today_month < (birth_month - 1)) {
      $scope.age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
      $scope.age--;
    }
    if ($scope.age >= 18) {
      for (let i = 147; i <= 159; i++) {
        $('#_ID' + i + '_S').prop('disabled', 'disabled');
        $('#_CH' + i).prop('disabled', 'disabled');
        $('#_ID' + i + '_F').prop('disabled', 'disabled');
      }
    } else {
      for (let i = 147; i <= 159; i++) {
        $('#_ID' + i + '_S').prop('disabled', false);
        $('#_CH' + i).prop('disabled', false);
        $('#_ID' + i + '_F').prop('disabled', false);
      }
    }
  }

  $scope.respCUPS = function () {
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCancer.php",
      data: {
        function: 'obtenerCUPS',
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        $scope.arrCUPS = response.data;
      }
    });
  }

  $scope.respCUPSRadio = function () {
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCancer.php",
      data: {
        function: 'obtenerCUPSRadio',
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        $scope.arrCUPSRadio = response.data;
      }
    });
  }

  $scope.TipoDocumento = function () {
    $http({
      method: 'POST',
      url: "php/genesis/funcgenesis.php",
      data: {
        function: 'Obtener_Tipos_Documentos',
        Tipo: 'S'
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        $scope.tiposDoc = response.data;
      }
    });
  }

  $scope.obtUbicaciones = function () {
    $http({
      method: 'POST',
      url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
      data: {
        function: 'obtnerubicaciones',
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        $scope.ubicaciones = response.data.dptoper;
      }
    });

  }

  $scope.tipoAfiliado = function (x) {
    if (x.TIPO_AFILIACION == "INCIDENTE") {
      $('#_CH19').prop('disabled', 'disabled');
      $('#_CH20').prop('disabled', 'disabled');
      $scope._CH19 = false;
      $scope._CH20 = false;
    }
  }

  $scope.DescargaFile = function () {
    $scope.Tabs = 1;
    $('#modal_export').modal('open');
  }

  $scope.export = function () {
    $scope.modal.tipoAccion = $scope.Tabs;
    if ($scope.modal.tipoAccion == 1) {
      if ($scope.modal.tipoDoc != '' && $scope.modal.NumDoc != '') {
        $scope.downloadFile($scope.modal);
        window.open('php/altocosto/excel_errors_segumiento_cancer.php?json=' + JSON.stringify($scope.modal));

      } else {
        Materialize.toast('¡Debe diligenciar todos los campos!', 3000); $('.toast').addClass('default-background-dark');
      }
    }
    if ($scope.modal.tipoAccion == 2) {
      if ($scope.modal.regional != '') {
        $scope.downloadFile($scope.modal);
        window.open('php/altocosto/excel_errors_segumiento_cancer.php?json=' + JSON.stringify($scope.modal));

      } else {
        Materialize.toast('¡Debe diligenciar todos los campos!', 3000); $('.toast').addClass('default-background-dark');
      }
    }
    if ($scope.modal.tipoAccion == 3) {
      if ($scope.modal.incidente != '') {
        $scope.downloadFile($scope.modal);
        window.open('php/altocosto/excel_errors_segumiento_cancer.php?json=' + JSON.stringify($scope.modal));

      } else {
        Materialize.toast('¡Debe diligenciar todos los campos!', 3000); $('.toast').addClass('default-background-dark');
      }
    }
    if ($scope.modal.tipoAccion == 4) {
      $scope.downloadFile($scope.modal);
      window.open('php/altocosto/excel_errors_segumiento_cancer.php?json=' + JSON.stringify($scope.modal));
    }
  }

  $scope.downloadFile = function (x) {
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCancer.php",
      data: {
        function: 'Errores',
        json: JSON.stringify($scope.modal)
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
      }
    });
  }

  $scope.setTabModal = function (x) {
    $scope.Tabs = x;
    setTimeout(() => {
      $scope.$apply();
    }, 500);
  }

  $scope.validaFecha = function (model) {
    var fecha = $scope[model];
    var regex = /^(?:(?:19|20)\d\d)-(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8]|29(?=-\d\d-(?:19|20)(?:[2468][048]|[13579][26])|(?:(?:19|20)(?:[02468][048]|[13579][26])-02-29)))$/;

    if (!regex.test(fecha)) {
      Materialize.toast('¡' + document.getElementById('_ID20_L').innerHTML + ' no es valido!', 3000);
      $scope[model] = ''; // Reemplazar por campo vacío si no cumple el formato
    }
  }

}])
