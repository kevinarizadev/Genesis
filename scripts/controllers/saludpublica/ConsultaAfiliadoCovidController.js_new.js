'use strict';
angular.module('GenesisApp')
  .controller('ConsultaAfiliadoCovidController', ['$http', '$scope', 'ngDialog', 'consultaHTTP', 'afiliacionHttp', 'FileProcessor'
    , function ($http, $scope, ngDialog, consultaHTTP, afiliacionHttp, FileProcessor) {
      $(document).ready(function () {
        $('#modalactualizar').modal();
        $scope.hde = {
          FechaInicioSintomas: false,
          FechaConsultaInicial: false,
          FechaTomaMuestra: false,
          Resultado: false,
          FechaInformeResultado: false,
          FechaMuerte: false,
          FechaTerminacionTratamiento: false
        }

        $scope.dsb = {
          FechaInicioSintomas: false,
          FechaConsultaInicial: false,
          FechaTomaMuestra: false,
          Resultado: false,
          FechaInformeResultado: false,
          EnteReporta: false,
          Periodo: false,
          TipoCaso: false,
          Procedencia: false,
          TipoAtencion: false,
          IpsAtencion: false,
          EstadoVital: false,
          FechaMuerte: false,
          TerminoTratamiento: false,
          FechaTerminacionTratamiento: false,
          ResultadoTratamiento: false,
          CondicionFinal: false,
          TratamientoMedico: false
        }

        $scope.informacion = {
          fecha_sospecha: '',
          ant_hta: '',
          ant_dm: '',
          ant_cancer: '',
          ant_vih: '',
          ant_erc: '',
          ant_epoc: '',
          ant_asma: '',
          discapacidad: '',
          fuente: '',
          estado: '',
          fecha_inicio_sintomas: '',
          fecha_consulta_inicial: '',
          fecha_toma_muestra: '',
          resultado: '',
          fecha_informe_resultado: '',
          ente_reporta: '',
          periodo: '',
          tipo_caso: '',
          pais_procedencia: '',
          tipo_atencion: '',
          ips_atencion: '',
          estado_vital: '',
          fecha_muerte: '',
          termina_tratamiento: '',
          fecha_terminacion_tratamiento: '',
          resultado_tratamiento: '',
          condicion_final: '',
          tratamiento_medico: '',
          ruta_soporte: ''
        }
      });

      $scope.type = "SELECCIONAR";

      $scope.obtenerDocumento = function () {
        consultaHTTP.obtenerDocumento().then(function (response) {
          $scope.Documentos = response;
        })
      }

      $scope.ConsultarAfiliado = function () {
        $scope.ValidaInformacion = false
        $scope.EstadoInformacion = false
        $scope.OcultarEvolucion = false
        $scope.ListadoEvoluciones = false
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Consultando Información...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });

        $scope.afildata = "";
        if ($scope.type == "SELECCIONAR") {
          swal('Notificación', 'Seleccione tipo de documento', 'info');
        } else if ($scope.id === undefined || $scope.id == "") {
          swal('Notificación', 'Ingrese número de identificación', 'info');
        } else {
          $http({
            method: 'POST',
            url: "php/saludpublica/covid/funccovid.php",
            data: { function: 'BuscaAfiliado', tipo: $scope.type, documento: $scope.id }
          }).then(function (response) {
            swal.close();
            if (response.data.codigo == 0) {
              $scope.afildato = response.data;
              $scope.ValidaInformacion = true;
              $scope.informacion.estado = $scope.afildato.estado;
              $scope.informacion.fuente = $scope.afildato.fuente;
              $scope.informacion.fecha_inicial = $scope.afildato.fecha_inicial;
              $scope.informacion.fecha_inicio_sintomas = $scope.afildato.fecha_inicio_sintomas;
              $scope.informacion.ant_hta = $scope.afildato.antecedentes_hta;
              $scope.informacion.ant_dm = $scope.afildato.antecedentes_dm;
              $scope.informacion.ant_cancer = $scope.afildato.antecedentes_cancer;
              $scope.informacion.ant_vih = $scope.afildato.antecedentes_vih;
              $scope.informacion.ant_erc = $scope.afildato.antecedentes_erc;
              $scope.informacion.ant_epoc = $scope.afildato.antecedentes_epoc;
              $scope.informacion.ant_asma = $scope.afildato.antecedentes_asma;
              $scope.informacion.discapacidad = $scope.afildato.discapacidad;
              $scope.informacion.fecha_consulta_inicial = $scope.afildato.f_consulta_inicial;
              $scope.informacion.fecha_toma_muestra = $scope.afildato.f_toma_muestra;
              $scope.informacion.fecha_toma_muestra_2 = $scope.afildato.f_toma_muestra2;
              $scope.informacion.resultado = $scope.afildato.resultado;
              $scope.informacion.fecha_informe_resultado = $scope.afildato.f_informe_resultado;
              $scope.informacion.fecha_informe_resultado_2 = $scope.afildato.f_informe_resultado_2;
              $scope.informacion.ente_reporta = $scope.afildato.ent_reporta_resultado;
              $scope.informacion.periodo = $scope.afildato.duracion_resultado;
              $scope.informacion.tipo_caso = $scope.afildato.tipo_caso;
              $scope.informacion.procedencia = $scope.afildato.procedencia;
              $scope.informacion.tipo_atencion = $scope.afildato.tipo_atencion;
              $scope.informacion.ips_atencion = $scope.afildato.ips_atencion;
              $scope.informacion.tratamiento = $scope.afildato.tratamiento;
              $scope.informacion.estado_vital = $scope.afildato.estado_vital;
              $scope.informacion.fecha_muerte = $scope.afildato.f_muerte;
              $scope.informacion.termina_tratamiento = $scope.afildato.termina_tratamiento;
              $scope.informacion.fecha_terminacion_tratamiento = $scope.afildato.f_terminacion;
              $scope.informacion.resultado_tratamiento = $scope.afildato.resultado_tratamiento;
              $scope.informacion.condicion_final = $scope.afildato.condincion_final;
              $scope.informacion.zona_afiliado = $scope.afildato.zona_covid;
              $scope.informacion.ruta_soporte = $scope.afildato.ruta_soporte;

              // document.querySelector('#card-soportes').style.height = document.querySelector('#card-datos').clientHeight + 'px'


              // console.log($scope.informacion)
              $scope.listarSoportes()
            } else {
              swal('Genesis informa', response.data.mensaje, 'info');
            }
          });
        }
      }

      $scope.mostrarSoporte = (archivo) => {
        const tokens = archivo.RUTA.split('').reverse().join('').split('/', 1)
        const datos = tokens.map((token) => {
          return token.split('').reverse().join('')
        })

        datos.push(archivo.RUTA.replace(datos[0], ''))

        const data = {
          'ruta': datos[1],
          'nombre': datos[0],
          'extension': 'pdf'
        }

        ngDialog.open({
          template: '/Genesis/views/saludpublica/mostrarsoporte.html',
          // controller: 'ModalEditarEstadoController',
          data: {
            url: '/Genesis/php/file.php?data=' + btoa(JSON.stringify(data))
          }
        });
      }



      $scope.listarSoportes = function () {
        $http({
          method: 'POST',
          url: "php/saludpublica/covid/funccovid.php",
          data: {
            function: 'ListarSoportes',
            data: {
              documento: $scope.id
            }
          }
        }).then(function (response) {
          $scope.soportes = response.data.data;
        });
      }

      $scope.listarSoportes()

      $scope.ConfirmarAfiliado = function () {
        // $scope.EstadoInformacion = true;
        // $scope.OcultarEvolucion = false
        // $scope.ListadoEvoluciones = false;
        // $(document).ready(function () {
        //   $("#fuente").val($scope.informacion.fuente);
        //   $("#estado").val($scope.informacion.estado);
        //   $("#fecha_inicio_sintomas").val($scope.informacion.fecha_inicio_sintomas);
        //   $("#fecha_inicial").val($scope.informacion.fecha_inicial);
        //   $("#ant_hta").val($scope.informacion.ant_hta);
        //   $("#ant_dm").val($scope.informacion.ant_dm);
        //   $("#ant_cancer").val($scope.informacion.ant_cancer);
        //   $("#ant_vih").val($scope.informacion.ant_vih);
        //   $("#ant_erc").val($scope.informacion.ant_erc);
        //   $("#ant_epoc").val($scope.informacion.ant_epoc);
        //   $("#ant_asma").val($scope.informacion.ant_asma);
        //   $("#discapacidad").val($scope.informacion.discapacidad);
        //   $("#fecha_consulta_inicial").val($scope.informacion.fecha_consulta_inicial);
        //   $("#fecha_toma_muestra").val($scope.informacion.fecha_toma_muestra);
        //   $("#resultado").val($scope.informacion.resultado);
        //   $("#fecha_informe_resultado").val($scope.informacion.fecha_informe_resultado);
        //   $("#ente_reporta").val($scope.informacion.ente_reporta);
        //   $("#periodo").val($scope.informacion.periodo);
        //   $("#tipo_caso").val($scope.informacion.tipo_caso);
        //   $("#procedencia").val($scope.informacion.procedencia);
        //   $("#tipo_atencion").val($scope.informacion.tipo_atencion);
        //   $("#ips_atencion").val($scope.informacion.ips_atencion);
        //   $("#tratamiento_medico").val($scope.informacion.tratamiento);
        //   $("#estado_vital").val($scope.informacion.estado_vital);
        //   $("#fecha_muerte").val($scope.informacion.fecha_muerte);
        //   $("#termina_tratamiento").val($scope.informacion.termina_tratamiento);
        //   $("#fecha_terminacion_tratamiento").val($scope.informacion.fecha_terminacion_tratamiento);
        //   $("#resultado_tratamiento").val($scope.informacion.resultado_tratamiento);
        //   $("#condicion_final").val($scope.informacion.condicion_final);
        //   $scope.chgTipoCaso($scope.informacion.tipo_caso);
        //   $("#zona_afiliado").val($scope.informacion.zona_covid);
        //   // $scope.chgTipoAtencion($scope.informacion.tipo_atencion);
        //   $scope.chgEstadoVital($scope.informacion.estado_vital);
        // });
        // $(function () {
        //   $(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({
        //     "border-style": "none",
        //     "border-bottom-style": "dotted"
        //   });
        //   var date = new Date();
        //   var formattedDate = moment(date).format('YYYY-MM');
        //   $(".datepicker_inicio").kendoDatePicker({
        //     animation: {
        //       close: {
        //         effects: "zoom:out",
        //         duration: 300
        //       },
        //       open: {
        //         effects: "zoom:in",
        //         duration: 300
        //       }
        //     }
        //   });
        //   $(document).ready(function () {
        //     var inicial = $("#fecha_inicial").kendoDatePicker({
        //       format: "dd/MM/yyyy",
        //       culture: "es-MX",
        //       max: new Date()
        //     }).data("kendoDatePicker");

        //     var ax = $("#fecha_inicio_sintomas").kendoDatePicker({
        //       format: "dd/MM/yyyy",
        //       culture: "es-MX",
        //       // disableDates: ["su", "sa"],
        //       max: new Date(),
        //     }).data("kendoDatePicker");

        //     var bx = $("#fecha_consulta_inicial").kendoDatePicker({
        //       format: "dd/MM/yyyy",
        //       culture: "es-MX",
        //       // disableDates: ["su", "sa"],
        //       max: new Date(),
        //     }).data("kendoDatePicker");

        //     var cx = $("#fecha_toma_muestra").kendoDatePicker({
        //       format: "dd/MM/yyyy",
        //       culture: "es-MX",
        //       // disableDates: ["su", "sa"],
        //       max: new Date(),
        //     }).data("kendoDatePicker");

        //     var dx = $("#fecha_informe_resultado").kendoDatePicker({
        //       format: "dd/MM/yyyy",
        //       culture: "es-MX",
        //       // disableDates: ["su", "sa"],
        //       max: new Date(),
        //     }).data("kendoDatePicker");

        //     var ex = $("#fecha_sospecha").kendoDatePicker({
        //       format: "dd/MM/yyyy",
        //       culture: "es-MX",
        //       // disableDates: ["su", "sa"],
        //       max: new Date(),
        //     }).data("kendoDatePicker");

        //     var fx = $("#fecha_terminacion_tratamiento").kendoDatePicker({
        //       format: "dd/MM/yyyy",
        //       culture: "es-MX",
        //       //disableDates: ["su", "sa"],
        //       max: new Date(),
        //     }).data("kendoDatePicker");

        //     var gx = $("#fecha_muerte").kendoDatePicker({
        //       format: "dd/MM/yyyy",
        //       culture: "es-MX",
        //       //disableDates: ["su", "sa"],
        //       max: new Date(),
        //     }).data("kendoDatePicker");
        //   });
        // });

        // console.log($scope.informacion)

        ngDialog.open({
          template: '/Genesis/views/saludpublica/editarinformacion.html',
          controller: 'ModalEditarEstadoController',
          data: {
            informacion: {...$scope.informacion},
            condicionFinalData: $scope.condicionFinalData,
            entidadReportaData: $scope.entidadReportaData,
            discapacidadData: $scope.discapacidadData,
            estadoData: $scope.estadoData,
            estadoVitalData: $scope.estadoVitalData,
            FuenteData: $scope.FuenteData,
            resultadoData: $scope.resultadoData,
            tipoCasoData: $scope.tipoCasoData,
            tipoAtencionData: $scope.tipoAtencionData,
            terminaTratamientoData: $scope.terminaTratamientoData,
            resultadoTratamientoData: $scope.resultadoTratamientoData
          }
        });
      }

      $scope.formatFechaRelativa = function (fecha) {
        const tokens = fecha.split('/')
        const now = moment()
        return now.diff(moment(`${tokens[2]}-${tokens[1]}-${tokens[0]}`), 'days')
      }

      const download = function (filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
      }

      $scope.descargarDatos = function () {
        let data = [...$scope.listaTemp]
        data = data.map((item) => {
          delete item.$$hashKey
          return item
        })
        download('consulta_covid.csv', window.Papa.unparse(data))
      }

      $scope.listaInicio = 0
      $scope.listaFin = 10

      $scope.formatNumber = (number) => {
        if (number === NaN) {
          return 0
        }
        return parseFloat(number).toFixed(2)
      }

      $scope.formatBigNumber = (number) => {
        if (number === NaN) {
          return 0
        }
        return numeral(number).format('0,0').replace(',', '.')
      }

      $scope.info = {
        confirmados: 0,
        sospechosos: 0,
        probable: 0,
        descartados: 0,
        sin_criterio: 0,
        total: 0
      }

      $scope.lista = []

      $scope.paginar = (lista, inicio, fin) => {
        if (typeof lista === 'undefined') {
          return []
        }
        return lista.slice(inicio, fin)
      }

      $scope.anterior = () => {
        if ($scope.listaFin === $scope.lista.length) {
          $scope.listaFin = parseInt($scope.listaInicio)

          $scope.listaInicio -= 10
        } else {
          if ($scope.listaInicio >= 10) {
            $scope.listaInicio -= 10
            $scope.listaFin -= 10
          }
        }
        console.log(`inicio: ${$scope.listaInicio} fin: ${$scope.listaFin}`)
      }

      $scope.filtrarResultados = () => {
        $scope.listaTemp = $scope.lista.filter((item) => {
          return item.NOMBRE_AFILIADO.includes($scope.filtro.toUpperCase()) ||
          item.MUNICIPIO.includes($scope.filtro.toUpperCase()) ||
          item.DOC.includes($scope.filtro.toUpperCase()) ||
          item.GRUPO_DE_RIEGOS.includes($scope.filtro.toUpperCase())
        })
        $scope.$apply()
      }

      $scope.siguiente = () => {
        if ($scope.listaFin < $scope.lista.length) {
          if (($scope.listaFin + 10) < $scope.lista.length) {
            $scope.listaFin += 10
          } else {
            $scope.listaFin = $scope.lista.length
          }
          $scope.listaInicio += 10
        }

        console.log(`inicio: ${$scope.listaInicio} fin: ${$scope.listaFin}`)
      }

      $scope.listarCantidad = () => {
        axios({
          url: 'php/saludpublica/covid/funccovid.php',
          method: 'post',
          data: {
            function: 'listarCantidad',
            data: {
              ubicacion: sessionStorage.getItem('municipio')
            }
          }
        }).then((response) => {
          const datos = response.data.data

          const totales = datos.map((item) => parseInt(item.CANTIDAD)).reduce((acumulado, actual) => acumulado + actual)

          $scope.info = {}

          $scope.info.confirmados = parseInt(datos.filter((item) => item.ESTADO_COVID === 'CONFIRMADO')[0].CANTIDAD)
          $scope.info.sospechosos = parseInt(datos.filter((item) => item.ESTADO_COVID === 'SOSPECHOSO')[0].CANTIDAD)
          $scope.info.probable = parseInt(datos.filter((item) => item.ESTADO_COVID === 'PROBABLE')[0].CANTIDAD)
          $scope.info.descartados = parseInt(datos.filter((item) => item.ESTADO_COVID === 'DESCARTADO')[0].CANTIDAD)
          $scope.info.sin_criterio = parseInt(datos.filter((item) => item.ESTADO_COVID === 'SIN CRITERIO')[0].CANTIDAD)

          $scope.info.total = totales
        })
      }

      $scope.esNacional = () => {
        return sessionStorage.getItem('municipio') === '1'
      }

      $scope.mostrarInformacion = (valor) => {
        $scope.ValidaInformacion = valor
        if (valor === false) {
          $scope.type = ''
          $scope.id = null
          $scope.ValidaInformacion = false;
          $scope.EstadoInformacion = false;
        }
        $scope.$apply()
      }

      $scope.listaAfiliados = (estado) => {

        switch (estado) {
          case 'C':
            $scope.listaSeleccionada = 'Confirmados'
            break;
          case 'X':
            $scope.listaSeleccionada = 'Sin Criterios'
            break;
          case 'D':
            $scope.listaSeleccionada = 'Descartados'
            break;
          case 'P':
            $scope.listaSeleccionada = 'Probables'
            break;
          case 'S':
            $scope.listaSeleccionada = 'Sospechosos'
            break;
        }

        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Consultando Información...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        axios({
          url: 'php/saludpublica/covid/funccovid.php',
          method: 'post',
          data: {
            function: 'listaEstado',
            data: {
              ubicacion: sessionStorage.getItem('municipio'),
              estado: estado
            }
          }
        }).then((response) => {

          if (response.data.data === null) {
            swal('Genesis informa', 'No hay información', 'info')
            $scope.lista = []
            return;
          }

          $scope.lista = response.data.data
          $scope.listaTemp = $scope.lista

          $scope.listaInicio = 0
          $scope.listaFin = $scope.lista.length > 10 ? 10 : $scope.lista.length - 1

          $scope.$apply()
          swal.close()
        })
      }

      $scope.consultaAfiliado = (afiliado) => {
        $scope.type = afiliado.TIPOD_DOC
        $scope.id = afiliado.DOC

        $scope.ConsultarAfiliado()
      }

      $scope.listarCantidad()
      $scope.listaAfiliados('C')

      $scope.lstCondicionFinal = function () {
        $http({
          method: 'POST',
          url: "php/saludpublica/covid/funccovid.php",
          data: {
            function: 'ListarSelect', campo: 'condicion_final'
          }
        }).then(function (response) {
          $scope.condicionFinalData = response.data;
        });
      }



      $scope.lstDiscapacidad = function () {
        $http({
          method: 'POST',
          url: "php/saludpublica/covid/funccovid.php",
          data: {
            function: 'ListarSelect', campo: 'discapacidad'
          }
        }).then(function (response) {
          $scope.discapacidadData = response.data;
        });
      }

      $scope.lstEntidadReporta = function () {
        $http({
          method: 'POST',
          url: "php/saludpublica/covid/funccovid.php",
          data: {
            function: 'ListarSelect', campo: 'ent_reporta_resultado'
          }
        }).then(function (response) {
          $scope.entidadReportaData = response.data;
        });
      }

      $scope.cambiarHistorico = (indice) => {
        $scope.historicoData = $scope.historico[indice];

        $scope.informacionHistorico = {}

        $scope.informacionHistorico.estado = $scope.historicoData.ESTADO;
        $scope.informacionHistorico.fuente = $scope.historicoData.FUENTE;
        $scope.informacionHistorico.fecha_inicial = $scope.historicoData.FECHA_INGRESO;
        $scope.informacionHistorico.fecha_inicio_sintomas = $scope.historicoData.F_INICIO_SINTOMAS;
        $scope.informacionHistorico.ant_hta = $scope.historicoData.ANTECEDENTES_HTA;
        $scope.informacionHistorico.ant_dm = $scope.historicoData.ANTECEDENTES_DM;
        $scope.informacionHistorico.ant_cancer = $scope.historicoData.ANTECEDENTES_CANCER;
        $scope.informacionHistorico.ant_vih = $scope.historicoData.ANTECEDENTES_VIH;
        $scope.informacionHistorico.ant_erc = $scope.historicoData.ANTECEDENTES_ERC;
        $scope.informacionHistorico.ant_epoc = $scope.historicoData.ANTECEDENTES_EPOC;
        $scope.informacionHistorico.ant_asma = $scope.historicoData.ANTECEDENTES_ASMA;
        $scope.informacionHistorico.discapacidad = $scope.historicoData.DISCAPACIDAD;
        $scope.informacionHistorico.fecha_consulta_inicial = $scope.historicoData.F_CONSULTA_INICIAL;
        $scope.informacionHistorico.fecha_toma_muestra = $scope.historicoData.F_TOMA_MUESTRA;
        $scope.informacionHistorico.fecha_toma_muestra_2 = $scope.historicoData.F_TOMA_MUESTRA_2;
        $scope.informacionHistorico.resultado = $scope.historicoData.RESULTADO;
        $scope.informacionHistorico.fecha_informe_resultado = $scope.historicoData.F_INFORME_RESULTADO;
        $scope.informacionHistorico.fecha_informe_resultado_2 = $scope.historicoData.F_INFORME_RESULTADO_2;
        $scope.informacionHistorico.ente_reporta = $scope.historicoData.ENT_REPORTA_RESULTADO;
        $scope.informacionHistorico.periodo = $scope.historicoData.DURACION_RESULTADO;
        $scope.informacionHistorico.tipo_caso = $scope.historicoData.TIPO_CASO;
        $scope.informacionHistorico.procedencia = $scope.historicoData.PROCEDENCIA;
        $scope.informacionHistorico.tipo_atencion = $scope.historicoData.TIPO_ATENCION;
        $scope.informacionHistorico.ips_atencion = $scope.historicoData.IPS_ATENCION;
        $scope.informacionHistorico.tratamiento = $scope.historicoData.TRATAMIENTO;
        $scope.informacionHistorico.estado_vital = $scope.historicoData.ESTADO_VITAL;
        $scope.informacionHistorico.fecha_muerte = $scope.historicoData.F_MUERTE;
        $scope.informacionHistorico.termina_tratamiento = $scope.historicoData.TERMINA_TRATAMIENTO;
        $scope.informacionHistorico.fecha_terminacion_tratamiento = $scope.historicoData.F_TERMINACION;
        $scope.informacionHistorico.resultado_tratamiento = $scope.historicoData.RESULTADO_TRATAMIENTO;
        $scope.informacionHistorico.condicion_final = $scope.historicoData.CONDINCION_FINAL;
        $scope.informacionHistorico.zona_afiliado = $scope.historicoData.ZONA_AFILIADO;
        $scope.informacionHistorico.ruta_soporte = $scope.historicoData.SOPORTE;
        $scope.informacionHistorico.tratamiento_medico = $scope.historicoData.TRATAMIENTO;
      }

      $scope.verHistorico = () => {
        $http({
          method: 'POST',
          url: "php/saludpublica/covid/funccovid.php",
          data: {
            function: 'verHistorico',
            data: {
              tipo: $scope.type,
              documento: $scope.id
            }
          }
        }).then(function (response) {
        	if (response.data.data === null) {
        		swal('Genesis informa', 'No se ha realizado actualización de estado', 'info')
        		return
        	}
          $scope.dataHistorico = response.data.data;
          $scope.historicoActual = -1

          $scope.ValidaInformacion = true;
          $scope.EstadoInformacion = true;
          $scope.TablaHistorico = true;

          //$scope.cambiarHistorico($scope.historicoActual)
        });
      }

      $scope.muestraEstado = (codigo) => {
        if (codigo === '') {
          return 'SIN DATOS'
        }

        if ($scope.estadoData === null) {
          return 'SIN DATOS'
        }

        return $scope.estadoData.filter((item) => item.codigo === codigo)[0].nombre
      }

      $scope.lstEstado = function () {
        $http({
          method: 'POST',
          url: "php/saludpublica/covid/funccovid.php",
          data: {
            function: 'ListarSelect', campo: 'estado'
          }
        }).then(function (response) {
          $scope.estadoData = response.data;
        });
      }

      $scope.lstEstadoVital = function () {
        $http({
          method: 'POST',
          url: "php/saludpublica/covid/funccovid.php",
          data: {
            function: 'ListarSelect', campo: 'estado_vital'
          }
        }).then(function (response) {
          $scope.estadoVitalData = response.data;
        });
      }

      $scope.lstFuente = function () {
        $http({
          method: 'POST',
          url: "php/saludpublica/covid/funccovid.php",
          data: {
            function: 'ListarSelect', campo: 'fuente'
          }
        }).then(function (response) {
          $scope.FuenteData = response.data;
        });
      }

      $scope.lstResultado = function () {
        $http({
          method: 'POST',
          url: "php/saludpublica/covid/funccovid.php",
          data: {
            function: 'ListarSelect', campo: 'resultado'
          }
        }).then(function (response) {
          $scope.resultadoData = response.data;
        });
      }

      $scope.lstResultadoTratamiento = function () {
        $http({
          method: 'POST',
          url: "php/saludpublica/covid/funccovid.php",
          data: {
            function: 'ListarSelect', campo: 'resultado_tratamiento'
          }
        }).then(function (response) {
          $scope.resultadoTratamientoData = response.data;
        });
      }

      $scope.lstTerminaTratamiento = function () {
        $http({
          method: 'POST',
          url: "php/saludpublica/covid/funccovid.php",
          data: {
            function: 'ListarSelect', campo: 'termina_tratamiento'
          }
        }).then(function (response) {
          $scope.terminaTratamientoData = response.data;
        });
      }

      $scope.lstTipoAtencion = function () {
        $http({
          method: 'POST',
          url: "php/saludpublica/covid/funccovid.php",
          data: {
            function: 'ListarSelect', campo: 'tipo_atencion'
          }
        }).then(function (response) {
          $scope.tipoAtencionData = response.data;
        });
      }

      $scope.lstTipoCaso = function () {
        $http({
          method: 'POST',
          url: "php/saludpublica/covid/funccovid.php",
          data: {
            function: 'ListarSelect', campo: 'tipo_caso'
          }
        }).then(function (response) {
          $scope.tipoCasoData = response.data;
        });
      }

      $scope.CargarSelect = function () {
        $scope.lstCondicionFinal();
        $scope.lstDiscapacidad();
        $scope.lstEntidadReporta();
        $scope.lstEstado();
        $scope.lstEstadoVital();
        $scope.lstFuente();
        $scope.lstResultado();
        $scope.lstResultadoTratamiento();
        $scope.lstTerminaTratamiento();
        $scope.lstTipoAtencion();
        $scope.lstTipoCaso();
      }

      // $scope.changeProceso = function (estado) {
      //   switch (estado) {
      //     case 'S':
      //       $("#fecha_inicio_sintomas").val('');
      //       $scope.informacion.fecha_inicio_sintomas = '';
      //       $scope.hde.FechaInicioSintomas = false;

      //       $("#fecha_consulta_inicial").val('');
      //       $scope.informacion.fecha_consulta_inicial = '';
      //       $scope.hde.FechaConsultaInicial = false;

      //       $("#fecha_toma_muestra").val('');
      //       $scope.informacion.fecha_toma_muestra = '';
      //       $scope.hde.FechaTomaMuestra = true;

      //       $scope.informacion.resultado = 'A';
      //       $scope.dsb.Resultado = true;

      //       $("#fecha_informe_resultado").val('');
      //       $scope.informacion.fecha_informe_resultado = '';
      //       $scope.hde.FechaInformeResultado = true;


      //       $scope.informacion.ente_reporta = 'N';
      //       $scope.dsb.EnteReporta = true;

      //       $scope.informacion.periodo = '';
      //       $scope.dsb.Periodo = true;

      //       $scope.informacion.tipo_caso = 'N';
      //       $scope.dsb.TipoCaso = true;

      //       $scope.informacion.pais_procedencia = '';
      //       $scope.dsb.Procedencia = true;

      //       $scope.informacion.tratamiento_medico = '';
      //       $scope.dsb.TratamientoMedico = true;

      //       $scope.informacion.estado_vital = 'N';
      //       $scope.dsb.EstadoVital = true;

      //       $("#fecha_muerte").val('');
      //       $scope.informacion.fecha_muerte = '';
      //       $scope.hde.FechaMuerte = true;

      //       $("#fecha_terminacion_tratamiento").val('');
      //       $scope.informacion.fecha_terminacion_tratamiento = '';
      //       $scope.hde.FechaTerminacionTratamiento = true;

      //       $scope.informacion.termina_tratamiento = 'X';
      //       $scope.dsb.TerminoTratamiento = true;

      //       $scope.informacion.resultado_tratamiento = 'X';
      //       $scope.dsb.ResultadoTratamiento = true;

      //       $scope.informacion.condicion_final = 'N';
      //       $scope.dsb.CondicionFinal = true;
      //       break;
      //     case 'P':
      //       $("#fecha_inicio_sintomas").val('');
      //       $scope.informacion.fecha_inicio_sintomas = '';
      //       $scope.hde.FechaInicioSintomas = false;

      //       $("#fecha_consulta_inicial").val('');
      //       $scope.informacion.fecha_consulta_inicial = '';
      //       $scope.hde.FechaConsultaInicial = false;

      //       $("#fecha_toma_muestra").val('');
      //       $scope.informacion.fecha_toma_muestra = '';
      //       $scope.hde.FechaTomaMuestra = false;

      //       $scope.informacion.resultado = 'X';
      //       $scope.dsb.Resultado = true;

      //       $("#fecha_informe_resultado").val('');
      //       $scope.informacion.fecha_informe_resultado = '';
      //       $scope.hde.FechaInformeResultado = false;

      //       $scope.informacion.ente_reporta = '';
      //       $scope.dsb.EnteReporta = false;

      //       $scope.informacion.periodo = '';
      //       $scope.dsb.Periodo = false;

      //       $scope.informacion.tipo_caso = 'N';
      //       $scope.dsb.TipoCaso = true;

      //       $scope.informacion.pais_procedencia = '';
      //       $scope.dsb.Procedencia = true;

      //       $scope.informacion.tipo_atencion = '';
      //       $scope.dsb.TipoAtencion = false;

      //       $scope.informacion.ips_atencion = '';
      //       $scope.dsb.IpsAtencion = false;

      //       $scope.informacion.tratamiento_medico = '';
      //       $scope.dsb.TratamientoMedico = true;

      //       $scope.informacion.estado_vital = '';
      //       $scope.dsb.EstadoVital = false;

      //       $("#fecha_muerte").val('');
      //       $scope.informacion.fecha_muerte = '';
      //       $scope.hde.FechaMuerte = false;

      //       $scope.informacion.termina_tratamiento = 'X';
      //       $scope.dsb.TerminoTratamiento = true;

      //       $("#fecha_terminacion_tratamiento").val('');
      //       $scope.informacion.fecha_terminacion_tratamiento = '';
      //       $scope.hde.FechaTerminacionTratamiento = true;

      //       $scope.informacion.resultado_tratamiento = 'X';
      //       $scope.dsb.ResultadoTratamiento = true;

      //       $scope.informacion.condicion_final = 'N';
      //       $scope.dsb.CondicionFinal = true;
      //       break;
      //     case 'D':
      //       $("#fecha_inicio_sintomas").val('');
      //       $scope.informacion.fecha_inicio_sintomas = '';
      //       $scope.hde.FechaInicioSintomas = false;

      //       $("#fecha_consulta_inicial").val('');
      //       $scope.informacion.fecha_consulta_inicial = '';
      //       $scope.hde.FechaConsultaInicial = false;

      //       $("#fecha_toma_muestra").val('');
      //       $scope.informacion.fecha_toma_muestra = '';
      //       $scope.hde.FechaTomaMuestra = false;

      //       $scope.informacion.resultado = 'N';
      //       $scope.dsb.Resultado = true;

      //       $("#fecha_informe_resultado").val('');
      //       $scope.informacion.fecha_informe_resultado = '';
      //       $scope.hde.FechaInformeResultado = false;

      //       $scope.informacion.ente_reporta = '';
      //       $scope.dsb.EnteReporta = false;

      //       $scope.informacion.periodo = '';
      //       $scope.dsb.Periodo = false;

      //       $scope.informacion.tipo_caso = 'N';
      //       $scope.dsb.TipoCaso = true;

      //       $scope.informacion.pais_procedencia = '';
      //       $scope.dsb.Procedencia = true;

      //       $scope.informacion.tipo_atencion = '';
      //       $scope.dsb.TipoAtencion = false;

      //       $scope.informacion.ips_atencion = '';
      //       $scope.dsb.IpsAtencion = false;

      //       $scope.informacion.tratamiento_medico = '';
      //       $scope.dsb.TratamientoMedico = true;

      //       $scope.informacion.estado_vital = '';
      //       $scope.dsb.EstadoVital = false;

      //       $("#fecha_muerte").val('');
      //       $scope.informacion.fecha_muerte = '';
      //       $scope.hde.FechaMuerte = false;

      //       $scope.informacion.termina_tratamiento = 'X';
      //       $scope.dsb.TerminoTratamiento = true;

      //       $("#fecha_terminacion_tratamiento").val('');
      //       $scope.informacion.fecha_terminacion_tratamiento = '';
      //       $scope.hde.FechaTerminacionTratamiento = true;

      //       $scope.informacion.resultado_tratamiento = 'X';
      //       $scope.dsb.ResultadoTratamiento = true;

      //       $scope.informacion.condicion_final = 'N';
      //       $scope.dsb.CondicionFinal = true;
      //       break;
      //     case 'C':
      //       $("#fecha_inicio_sintomas").val('');
      //       $scope.informacion.fecha_inicio_sintomas = '';
      //       $scope.hde.FechaInicioSintomas = false;

      //       $("#fecha_consulta_inicial").val('');
      //       $scope.informacion.fecha_consulta_inicial = '';
      //       $scope.hde.FechaConsultaInicial = false;

      //       $("#fecha_toma_muestra").val('');
      //       $scope.informacion.fecha_toma_muestra = '';
      //       $scope.hde.FechaTomaMuestra = false;

      //       $scope.informacion.resultado = 'P';
      //       $scope.dsb.Resultado = true;

      //       $("#fecha_informe_resultado").val('');
      //       $scope.informacion.fecha_informe_resultado = '';
      //       $scope.hde.FechaInformeResultado = false;

      //       $scope.informacion.ente_reporta = '';
      //       $scope.dsb.EnteReporta = false;

      //       $scope.informacion.periodo = '';
      //       $scope.dsb.Periodo = false;

      //       $scope.informacion.tipo_caso = '';
      //       $scope.dsb.TipoCaso = false;

      //       $scope.informacion.pais_procedencia = '';
      //       $scope.dsb.Procedencia = false;

      //       $scope.informacion.tipo_atencion = '';
      //       $scope.dsb.TipoAtencion = false;

      //       $scope.informacion.ips_atencion = '';
      //       $scope.dsb.IpsAtencion = false;

      //       $scope.informacion.tratamiento_medico = '';
      //       $scope.dsb.TratamientoMedico = false;

      //       $scope.informacion.estado_vital = '';
      //       $scope.dsb.EstadoVital = false;

      //       $("#fecha_muerte").val('');
      //       $scope.informacion.fecha_muerte = '';
      //       $scope.hde.FechaMuerte = false;

      //       $scope.informacion.termina_tratamiento = '';
      //       $scope.dsb.TerminoTratamiento = false;

      //       $("#fecha_terminacion_tratamiento").val('');
      //       $scope.informacion.fecha_terminacion_tratamiento = '';
      //       $scope.hde.FechaTerminacionTratamiento = false;

      //       $scope.informacion.resultado_tratamiento = '';
      //       $scope.dsb.ResultadoTratamiento = false;

      //       $scope.informacion.condicion_final = '';
      //       $scope.dsb.CondicionFinal = false;
      //       break;
      //     case 'X':
      //       $("#fecha_inicio_sintomas").val('');
      //       $scope.informacion.fecha_inicio_sintomas = '';
      //       $scope.hde.FechaInicioSintomas = true;

      //       $("#fecha_consulta_inicial").val('');
      //       $scope.informacion.fecha_consulta_inicial = '';
      //       $scope.hde.FechaConsultaInicial = true;

      //       $("#fecha_toma_muestra").val('');
      //       $scope.informacion.fecha_toma_muestra = '';
      //       $scope.hde.FechaTomaMuestra = true;

      //       $scope.informacion.resultado = 'A';
      //       $scope.dsb.Resultado = true;

      //       $("#fecha_informe_resultado").val('');
      //       $scope.informacion.fecha_informe_resultado = '';
      //       $scope.hde.FechaInformeResultado = true;

      //       $scope.informacion.ente_reporta = 'N';
      //       $scope.dsb.EnteReporta = true;

      //       $scope.informacion.periodo = '';
      //       $scope.dsb.Periodo = true;

      //       $scope.informacion.tipo_caso = 'N';
      //       $scope.dsb.TipoCaso = true;

      //       $scope.informacion.pais_procedencia = '';
      //       $scope.dsb.Procedencia = true;

      //       $scope.informacion.tipo_atencion = 'N';
      //       $scope.dsb.TipoAtencion = true;

      //       $scope.informacion.ips_atencion = '';
      //       $scope.dsb.IpsAtencion = true;

      //       $scope.informacion.tratamiento_medico = '';
      //       $scope.dsb.TratamientoMedico = true;

      //       $scope.informacion.estado_vital = 'N';
      //       $scope.dsb.EstadoVital = true;

      //       $("#fecha_muerte").val('');
      //       $scope.informacion.fecha_muerte = '';
      //       $scope.hde.FechaMuerte = true;

      //       $scope.informacion.termina_tratamiento = 'X';
      //       $scope.dsb.TerminoTratamiento = true;

      //       $("#fecha_terminacion_tratamiento").val('');
      //       $scope.informacion.fecha_terminacion_tratamiento = '';
      //       $scope.hde.FechaTerminacionTratamiento = true;

      //       $scope.informacion.resultado_tratamiento = 'X';
      //       $scope.dsb.ResultadoTratamiento = true;

      //       $scope.informacion.condicion_final = 'N';
      //       $scope.dsb.CondicionFinal = true;
      //       break;
      //     // default:
      //     // 	break;
      //   }
      // }

      $scope.chgTipoAtencion = function (estado) {
        switch (estado) {
          case 'C':
            $scope.informacion.ips_atencion = '';
            $scope.dsb.IpsAtencion = true;
            break;
          case 'H':
            $scope.informacion.ips_atencion = '';
            $scope.dsb.IpsAtencion = false;
            break;
          case 'P':
            $scope.informacion.ips_atencion = '';
            $scope.dsb.IpsAtencion = false;
            break;
          case 'U':
            $scope.informacion.ips_atencion = '';
            $scope.dsb.IpsAtencion = false;
            break;
          case 'N':
            $scope.informacion.ips_atencion = '';
            $scope.dsb.IpsAtencion = true;
            break;
          // default:
          // 	break;
        }
      }

      $scope.chgEstadoVital = function (estado) {
        switch (estado) {
          case 'F':
            $("#fecha_muerte").val('');
            $scope.informacion.fecha_muerte = '';
            $scope.hde.FechaMuerte = false;
            break;
          case 'V':
            $("#fecha_muerte").val('');
            $scope.informacion.fecha_muerte = '';
            $scope.hde.FechaMuerte = true;
            break;
          case 'N':
            $("#fecha_muerte").val('');
            $scope.informacion.fecha_muerte = '';
            $scope.hde.FechaMuerte = true;
            break;
          // default:
          // 	break;
        }
      }

      $scope.chgTipoCaso = function (estado) {
        switch (estado) {
          case 'I':
            $scope.informacion.pais_procedencia = '';
            $scope.dsb.Procedencia = false;
            break;
          case 'R':
            $scope.informacion.pais_procedencia = '';
            $scope.dsb.Procedencia = true;
            break;
          case 'S':
            $scope.informacion.pais_procedencia = '';
            $scope.dsb.Procedencia = true;
            break;
          case 'N':
            $scope.informacion.pais_procedencia = '';
            $scope.dsb.Procedencia = true;
            break;
          // default:
          // 	break;
        }
      }



      $scope.Registrar = function (informacion) {
        $scope.RegistrarValidado(informacion);
        // if (informacion.estado == "S"){
        // 	if ((informacion.fecha_inicio_sintomas != '' || $("#fecha_inicio_sintomas").val() != '' )
        // 	&& (informacion.fecha_consulta_inicial != '' || $("#fecha_consulta_inicial").val() != '') && informacion.resultado == 'A'
        // 	&& informacion.ente_reporta == 'N' && informacion.periodo == '' && informacion.tipo_caso == 'N' && informacion.pais_procedencia == ''
        // 	&& informacion.estado_vital == 'N' && informacion.termina_tratamiento == 'X' && informacion.resultado_tratamiento == 'X' 
        // 	&& informacion.condicion_final == 'N' && informacion.tratamiento_medico == '') {
        // 		if ((informacion.tipo_atencion == 'C' && informacion.ips_atencion != '') || (informacion.tipo_atencion == 'H' && informacion.ips_atencion == '')
        // 		|| (informacion.tipo_atencion == 'P' && informacion.ips_atencion == '') || (informacion.tipo_atencion == 'U' && informacion.ips_atencion == '')
        // 		|| (informacion.tipo_atencion == 'N' && informacion.ips_atencion != '') || (informacion.tipo_atencion == '' && informacion.ips_atencion == '')) {
        // 			swal('Notificación','Uno de los datos esta errado, por favor verificar.','info');
        // 		}else{
        // 			$scope.RegistrarValidado(informacion);
        // 		}
        // 	}else{
        // 		swal('Notificación', 'Uno de los datos esta errado, por favor verificar.', 'info');
        // 	}
        // } else if (informacion.estado == "P"){
        // 	if ((informacion.fecha_inicio_sintomas != '' || $("#fecha_inicio_sintomas").val() != '')
        // 	&& (informacion.fecha_consulta_inicial != '' || $("#fecha_consulta_inicial").val() != '')
        // 	&& (informacion.fecha_toma_muestra != '' || $("#fecha_toma_muestra").val() != '')
        // 	&& (informacion.fecha_informe_resultado != '' || $("#fecha_informe_resultado").val() != '') && informacion.resultado == 'X'
        // 	&& informacion.ente_reporta != '' && informacion.periodo != '' && informacion.tipo_caso == 'N' && informacion.pais_procedencia == ''
        // 	&& informacion.termina_tratamiento == 'X' && informacion.resultado_tratamiento == 'X' && informacion.condicion_final == 'N'
        // 	&& informacion.tratamiento_medico == '') {
        // 		if ((informacion.tipo_atencion == 'C' && informacion.ips_atencion != '') || (informacion.tipo_atencion == 'H' && informacion.ips_atencion == '')
        // 		|| (informacion.tipo_atencion == 'P' && informacion.ips_atencion == '') || (informacion.tipo_atencion == 'U' && informacion.ips_atencion == '')
        // 		|| (informacion.tipo_atencion == 'N' && informacion.ips_atencion != '') || (informacion.tipo_atencion == '' && informacion.ips_atencion == '')) {
        // 			swal('Notificación', 'Uno de los datos esta errado, por favor verificar.', 'info');
        // 		} else {
        // 			if ((informacion.estado_vital == 'F' && (informacion.fecha_muerte == '' || $("#fecha_muerte").val() == ''))
        // 			|| (informacion.estado_vital == 'V' && (informacion.fecha_muerte != '' || $("#fecha_muerte").val() != ''))
        // 			|| (informacion.estado_vital == 'N' && (informacion.fecha_muerte != '' || $("#fecha_muerte").val() != ''))
        // 			|| (informacion.estado_vital == '' && (informacion.fecha_muerte == '' || $("#fecha_muerte").val() == ''))) {
        // 				swal('Notificación', 'Uno de los datos esta errado, por favor verificar.', 'info');
        // 			} else {
        // 				$scope.RegistrarValidado(informacion);
        // 			}
        // 		}
        // 	} else {
        // 		swal('Notificación', 'Uno de los datos esta errado, por favor verificar.', 'info');
        // 	}
        // } else if (informacion.estado == "D"){
        // 	if ((informacion.fecha_inicio_sintomas != '' || $("#fecha_inicio_sintomas").val() != '')
        // 	&& (informacion.fecha_consulta_inicial != '' || $("#fecha_consulta_inicial").val() != '')
        // 	&& (informacion.fecha_toma_muestra != '' || $("#fecha_toma_muestra").val() != '')
        // 	&& (informacion.fecha_informe_resultado != '' || $("#fecha_informe_resultado").val() != '') && informacion.resultado == 'N'
        // 	&& informacion.ente_reporta != '' && informacion.periodo != '' && informacion.tipo_caso == 'N' && informacion.pais_procedencia == ''
        // 	&& informacion.termina_tratamiento == 'X' && informacion.resultado_tratamiento == 'X' && informacion.condicion_final == 'N'
        // 	&& informacion.tratamiento_medico == '') {
        // 		if ((informacion.tipo_atencion == 'C' && informacion.ips_atencion != '') || (informacion.tipo_atencion == 'H' && informacion.ips_atencion == '')
        // 		|| (informacion.tipo_atencion == 'P' && informacion.ips_atencion == '') || (informacion.tipo_atencion == 'U' && informacion.ips_atencion == '')
        // 		|| (informacion.tipo_atencion == 'N' && informacion.ips_atencion != '') || (informacion.tipo_atencion == '' && informacion.ips_atencion == '')) {
        // 			swal('Notificación', 'Uno de los datos esta errado, por favor verificar.', 'info');
        // 		} else {
        // 			if ((informacion.estado_vital == 'F' && (informacion.fecha_muerte == '' || $("#fecha_muerte").val() == ''))
        // 			|| (informacion.estado_vital == 'V' && (informacion.fecha_muerte != '' || $("#fecha_muerte").val() != ''))
        // 			|| (informacion.estado_vital == 'N' && (informacion.fecha_muerte != '' || $("#fecha_muerte").val() != ''))
        // 			|| (informacion.estado_vital == '' && (informacion.fecha_muerte == '' || $("#fecha_muerte").val() == ''))) {
        // 				swal('Notificación', 'Uno de los datos esta errado, por favor verificar.', 'info');
        // 			} else {
        // 				$scope.RegistrarValidado(informacion);
        // 			}
        // 		}
        // 	} else {
        // 		swal('Notificación', 'Uno de los datos esta errado, por favor verificar.', 'info');
        // 	}
        // } else if (informacion.estado == "C"){
        // 	if ((informacion.fecha_inicio_sintomas != '' || $("#fecha_inicio_sintomas").val() != '')
        // 	&& (informacion.fecha_consulta_inicial != '' || $("#fecha_consulta_inicial").val() != '')
        // 	&& (informacion.fecha_toma_muestra != '' || $("#fecha_toma_muestra").val() != '')
        // 	&& (informacion.fecha_informe_resultado != '' || $("#fecha_informe_resultado").val() != '') && informacion.resultado == 'P'
        // 	&& informacion.ente_reporta != '' && informacion.periodo != '' && informacion.termina_tratamiento != '' 
        // 	&& informacion.resultado_tratamiento != '' && informacion.condicion_final != 'N'
        // 	&& (informacion.fecha_terminacion_tratamiento != '' || $("#fecha_terminacion_tratamiento").val() != '') 
        // 	&& informacion.tratamiento_medico != '') {
        // 		if ((informacion.tipo_caso == 'I' && informacion.pais_procedencia == '') || (informacion.tipo_caso == 'N' && informacion.pais_procedencia != '')
        // 		|| (informacion.tipo_caso == 'R' && informacion.pais_procedencia != '') || (informacion.tipo_caso == 'S' && informacion.ips_atencion != '')
        // 		|| (informacion.tipo_caso == '' && informacion.pais_procedencia != '')) {
        // 			swal('Notificación', 'Uno de los datos esta errado, por favor verificar.', 'info');
        // 		} else {
        // 			if ((informacion.tipo_atencion == 'C' && informacion.ips_atencion != '') || (informacion.tipo_atencion == 'H' && informacion.ips_atencion == '')
        // 			|| (informacion.tipo_atencion == 'P' && informacion.ips_atencion == '') || (informacion.tipo_atencion == 'U' && informacion.ips_atencion == '')
        // 			|| (informacion.tipo_atencion == 'N' && informacion.ips_atencion != '') || (informacion.tipo_atencion == '' && informacion.ips_atencion == '')) {
        // 				swal('Notificación', 'Uno de los datos esta errado, por favor verificar.', 'info');
        // 			} else {
        // 				if ((informacion.estado_vital == 'F' && (informacion.fecha_muerte == '' || $("#fecha_muerte").val() == ''))
        // 				|| (informacion.estado_vital == 'V' && (informacion.fecha_muerte != '' || $("#fecha_muerte").val() != ''))
        // 				|| (informacion.estado_vital == 'N' && (informacion.fecha_muerte != '' || $("#fecha_muerte").val() != ''))
        // 				|| (informacion.estado_vital == '' && (informacion.fecha_muerte == '' || $("#fecha_muerte").val() == ''))) {
        // 					swal('Notificación', 'Uno de los datos esta errado, por favor verificar.', 'info');
        // 				} else {
        // 					$scope.RegistrarValidado(informacion);
        // 				}
        // 			}
        // 		}
        // 	} else {
        // 		swal('Notificación', 'Uno de los datos esta errado, por favor verificar.', 'info');
        // 	}
        // } else if (informacion.estado == "X"){
        // 	if ((informacion.fecha_inicio_sintomas == '' || $("#fecha_inicio_sintomas").val() == '')
        // 	&& (informacion.fecha_consulta_inicial == '' || $("#fecha_consulta_inicial").val() == '')
        // 	&& (informacion.fecha_toma_muestra == '' || $("#fecha_toma_muestra").val() == '')
        // 	&& (informacion.fecha_informe_resultado == '' || $("#fecha_informe_resultado").val() == '') && informacion.resultado == 'A'
        // 	&& informacion.ente_reporta == 'N' && informacion.periodo == '' && informacion.tipo_caso == 'N' && informacion.pais_procedencia == ''
        // 	&& informacion.tipo_atencion == 'N' && informacion.ips_atencion == '' && informacion.termina_tratamiento == 'X'
        // 	&& informacion.resultado_tratamiento == 'X' && informacion.condicion_final == 'N' && informacion.tratamiento_medico == '') {
        // 		$scope.RegistrarValidado(informacion);
        // 	} else {
        // 		swal('Notificación', 'Uno de los datos esta errado, por favor verificar.', 'info');
        // 	}
        // }else{
        // 	swal('Notificación', 'Uno de los datos esta errado, por favor verificar.', 'info');
        // }
      }

      $scope.RegistrarValidado = function (informacion) {
        if (informacion.ruta_soporte === '') {
          if (document.querySelector('#archivoHistoriaClinica').files.length > 0) {
            FileProcessor.read(document.querySelector('#archivoHistoriaClinica').files[0])
              .then(data => {
                let timeoutId = null;
                const showWaiting = (timeout) => {
                  timeoutId = setTimeout(() => {
                    swal('Por favor espere', 'Dependiendo del  tamaño del archivo este proceso puede tomar algunos minutos', 'info').then(() => {
                      showWaiting(30000);
                    });
                  }, timeout);
                }

                showWaiting(1000);

                $http({
                  method: 'POST',
                  url: '/Genesis/php/saludpublica/covid/funccovid.php',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  data: {
                    function: 'cargarHistoriaClinica',
                    file: data
                  }
                }).then((success, error) => {
                  clearTimeout(timeoutId);
                  $scope.enProgreso = false;
                  $scope.estado = "CARGAR";
                  if (error) {
                    swal('El archivo no se pudo cargar', '', 'error');
                    return;
                  }
                  swal('Archivo cargado exitosamente', '', 'success')
                    .then(() => {
                      informacion.ruta_soporte = success.data.data
                      var dataRegistro = JSON.stringify(informacion);
                      console.log(dataRegistro)
                      $http({
                        method: 'POST',
                        url: "php/saludpublica/covid/funccovid.php",
                        data: {
                          function: 'RegistraEstado',
                          dataRegistro: dataRegistro,
                          cedulalog: sessionStorage.getItem('cedula'),
                          tratamiento_medico: $("#tratamiento_medico").val(),
                          ips_atencion: $("#ips_atencion").val(),
                          pais_procedencia: $("#pais_procedencia").val(),
                          tipo_doc: $scope.type,
                          doc: $scope.id
                        }
                      }).then(function (response) {
                        if (response.data.codigo == 0) {
                          swal('Genesis informa', response.data.mensaje, 'success');
                          $scope.limpiar();
                        } else {
                          swal('Genesis informa', response.data.mensaje, 'info');
                        }
                      });
                    })
                    .catch(() => {
                      window.location.reload();
                    });
                })
                  .catch(err => {
                    swal('El archivo no se pudo cargar', '', 'error');
                    $scope.enProgreso = false;
                    $scope.estado = "CARGAR";
                  });
              })
              .catch(err => {
                $scope.enProgreso = false;
                $scope.estado = "CARGAR";
              });
          } else {
            informacion.ruta_soporte = ''
            var dataRegistro = JSON.stringify(informacion);
            console.log(dataRegistro)
            $http({
              method: 'POST',
              url: "php/saludpublica/covid/funccovid.php",
              data: {
                function: 'RegistraEstado',
                dataRegistro: dataRegistro,
                cedulalog: sessionStorage.getItem('cedula'),
                tratamiento_medico: $("#tratamiento_medico").val(),
                ips_atencion: $("#ips_atencion").val(),
                pais_procedencia: $("#pais_procedencia").val(),
                tipo_doc: $scope.type,
                doc: $scope.id
              }
            }).then(function (response) {
              if (response.data.codigo == 0) {
                swal('Genesis informa', response.data.mensaje, 'success');
                $scope.limpiar();
              } else {
                swal('Genesis informa', response.data.mensaje, 'info');
              }
            });
          }
        }
      }

      $scope.limpiar = function () {
        $scope.type = "SELECCIONAR";
        $scope.id = null;
        $scope.estado = "SELECCIONAR";
        $scope.fuente = "SELECCIONAR";
        $scope.fecha_sospecha = null;
        $scope.ValidaInformacion = false;
        $scope.EstadoInformacion = false;
        $scope.OcultarEvolucion = false
        $scope.ListadoEvoluciones = false;

        $("#fecha_sospecha").val('');
        $scope.informacion.fecha_sospecha = '';
        $scope.informacion.ant_hta = false;
        $scope.informacion.ant_dm = false;
        $scope.informacion.ant_cancer = false;
        $scope.informacion.ant_vih = false;
        $scope.informacion.ant_erc = false;
        $scope.informacion.ant_epoc = false;
        $scope.informacion.ant_asma = false;
        $scope.informacion.discapacidad = '';
        $scope.informacion.fuente = '';
        $scope.informacion.estado = '';
        $("#fecha_inicio_sintomas").val('');
        $scope.informacion.fecha_inicio_sintomas = '';
        $scope.hde.FechaInicioSintomas = false;
        $("#fecha_consulta_inicial").val('');
        $scope.informacion.fecha_consulta_inicial = '';
        $scope.hde.FechaConsultaInicial = false;
        $("#fecha_toma_muestra").val('');
        $scope.informacion.fecha_toma_muestra = '';
        $scope.hde.FechaTomaMuestra = false;
        $scope.informacion.resultado = '';
        $scope.dsb.Resultado = false;
        $("#fecha_informe_resultado").val('');
        $scope.informacion.fecha_informe_resultado = '';
        $scope.hde.FechaInformeResultado = false;
        $scope.informacion.ente_reporta = '';
        $scope.dsb.EnteReporta = false;
        $scope.informacion.periodo = '';
        $scope.dsb.Periodo = false;
        $scope.informacion.tipo_caso = '';
        $scope.dsb.TipoCaso = false;
        $scope.informacion.pais_procedencia = '';
        $scope.dsb.Procedencia = false;
        $scope.informacion.tipo_atencion = '';
        $scope.dsb.TipoAtencion = false;
        $scope.informacion.ips_atencion = '';
        $scope.dsb.IpsAtencion = false;
        $scope.informacion.tratamiento_medico = '';
        $scope.dsb.TratamientoMedico = false;
        $scope.informacion.estado_vital = '';
        $scope.dsb.EstadoVital = false;
        $("#fecha_muerte").val('');
        $scope.informacion.fecha_muerte = '';
        $scope.hde.FechaMuerte = false;
        $scope.informacion.termina_tratamiento = '';
        $scope.dsb.TerminoTratamiento = false;
        $("#fecha_terminacion_tratamiento").val('');
        $scope.informacion.fecha_terminacion_tratamiento = '';
        $scope.hde.FechaTerminacionTratamiento = false;
        $scope.informacion.resultado_tratamiento = '';
        $scope.dsb.ResultadoTratamiento = false;
        $scope.informacion.condicion_final = '';
        $scope.informacion.zona_afiliado = '';
        $scope.dsb.CondicionFinal = false;
      }

      $scope.EditarInformacion = function (p) {
        $('#modalactualizar').modal('open');

        $scope.p_tipo = p.tipo_documento;
        $scope.p_documento = p.documento;
        $scope.p_nombre = p.nombre_afiliado;
        $scope.p_celular = p.celular;
        $scope.p_celular2 = p.celular2;
        $scope.p_direccion = p.direccion;
        $scope.p_barrio = p.barrio;
        $scope.Act_Zona = { Codigo: '' };
        $scope.ViaPrincipal = { Codigo: '' };
        $scope.Letra = { Codigo: '' };
        $scope.Cuadrante = { Codigo: '' };
        $scope.CuadranteVG = { Codigo: '' };
        $scope.SelectLetraVG = { Codigo: '' };
        $scope.Bis = false;
        afiliacionHttp.obtenerViaPrincipal().then(function (response) {
          $scope.viaprincipal = response;
        })
        afiliacionHttp.obtenerLetra().then(function (response) {
          $scope.letras = response;
        })
        afiliacionHttp.obtenerNumero().then(function (response) {
          $scope.Numeros = response;
        })
        afiliacionHttp.obtenerCuadrante().then(function (response) {
          $scope.Cuadrantes = response;
        })
      }

      $scope.AbrirModalDireccion = function () {
        $scope.dialogDiagreg = ngDialog.open({
          template: 'views/consultaAfiliados/nucleofamiliar/modal/modalDireccion.html',
          className: 'ngdialog-theme-plain',
          controller: 'ConsultaAfiliadoCovidController',
          closeByDocument: false,
          closeByEscape: false,
          scope: $scope
        });
        $scope.dialogDiagreg.closePromise.then(function (data) {
          if (data.value != "$closeButton") {
            $scope.p_direccion = data.value;
            $scope.p_barrio = $('#barrio').val();
          }
        });
      }

      $scope.GuardarDireccion = function (ViaPrincipal, NumViaPrincipal, Letra, Numero, Bis, Cuadrante, NumeroVG, SelectLetraVG, NumeroPlaca, CuadranteVG, Complemento) {
        console.log($('#direcciond').val());
        $scope.closeThisDialog($('#direcciond').val());
        $scope.closeThisDialog($('#barrio').val());
      }

      $scope.ActualizarInfor = function () {
        $http({
          method: 'POST',
          url: "php/saludpublica/covid/funccovid.php",
          data: {
            function: 'GeneraNovedad', documento: $scope.id,
            tipo: $scope.type,
            direccion: $scope.p_direccion,
            barrio: $scope.p_barrio,
            celular: $scope.p_celular,
            celular2: $scope.p_celular2
          }
        }).then(function (response) {
          if (response.data.codigo == 0) {
            swal('Genesis informa', response.data.mensaje, 'success');
            $('#modalactualizar').modal('close');
            $scope.ConsultarAfiliado();
          } else {
            swal('Genesis informa', response.data.mensaje, 'info');
          }
        });
      }

      $scope.CrearEvolucion = function () {
        $scope.OcultarEvolucion = true;
        $scope.EstadoInformacion = false;
        $scope.ListadoEvoluciones = false;
        $(function () {
          $(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({
            "border-style": "none",
            "border-bottom-style": "dotted"
          });
          var date = new Date();
          var formattedDate = moment(date).format('YYYY-MM');
          $(".datepicker_inicio").kendoDatePicker({
            animation: {
              close: {
                effects: "zoom:out",
                duration: 300
              },
              open: {
                effects: "zoom:in",
                duration: 300
              }
            }
          });
          $(document).ready(function () {
            var inicial = $("#fecha_evolucion").kendoDatePicker({
              format: "dd/MM/yyyy",
              culture: "es-MX",
              max: new Date()
            }).data("kendoDatePicker");


          });
        });
      }

      $scope.Crear = function (fecha, observacion) {
        if (fecha == null || fecha == undefined || fecha == '') {
          swal('Notificación', 'Seleccione la fecha de sospecha para su registro', 'info');
        } else if (observacion == null || observacion == undefined || observacion == '') {
          swal('Notificación', 'Digitar Una Observación', 'info');
        } else {
          $http({
            method: 'POST',
            url: "php/saludpublica/covid/funccovid.php",
            data: { function: 'CrearEvolucion', tipo: $scope.type, documento: $scope.id, fecha: fecha, observacion: observacion, usuario: sessionStorage.getItem('cedula') }
          }).then(function (response) {
            if (response.data.codigo == 0) {
              swal('Genesis informa', response.data.mensaje, 'success');
              $scope.OcultarEvolucion = false
              $scope.ValidaInformacion = true;
              $scope.ListadoEvoluciones = false;
            } else {
              swal('Genesis informa', response.data.mensaje, 'info');
            }
          });
        }
      }

      $scope.VerEvolucion = function (estado) {
        if (estado == 'comenzar') { swal({ title: 'Cargando Informacion' }); swal.showLoading(); }
        $http({
          method: 'POST',
          url: "php/saludpublica/covid/funccovid.php",
          data: { function: 'VerEvolucion', tipo: $scope.type, documento: $scope.id }
        }).then(function (res) {
          if (res.data.codigo == 1) {
            swal.close();
            swal('Genesis informa', res.data.mensaje, 'info');
          } else {
            if (res.data.length > 0) {
              if ($scope.estado == 'destruir') {
                $scope.tableinformacion.destroy();
              }
              $scope.ListadoEvoluciones = true;
              $scope.OcultarEvolucion = false;
              $scope.informacion = res.data;
              $scope.estado = 'destruir';
              setTimeout(function () {
                $scope.tableinformacion = $('#informacion').DataTable({
                  language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                  lengthMenu: [[10, 50, -1], [10, 50, 'Todas']],
                  order: [[0, "asc"]]
                });

              }, 500);
              swal.close();
            } else {
              swal('Genesis informa', 'No hay Informacion para Mostrar', 'warning');
            }
          }

        });
      }

    }]);
