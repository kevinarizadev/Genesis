'use strict';

/* window.onerror = (message, url, line) => {
	swal('Genesis informa', `Se ha generado un error: \n ${message}`, 'error')
} */

angular.module('GenesisApp')
  .controller('ConsultaAfiliadoCovidController', ['$http', '$timeout', '$scope', 'ngDialog', 'consultaHTTP', 'afiliacionHttp', 'notification', 'cfpLoadingBar', '$rootScope', '$controller', 'communication', 'digitalizacionHTTP', 'notify',    function ($http, $timeout, $scope, ngDialog, consultaHTTP, afiliacionHttp, notification, cfpLoadingBar, $rootScope, $controller, communication, digitalizacionHTTP, notify) {
        let tipoDoc = null

      $(document).ready(function () {
        if (sessionStorage.getItem('cedula') == 1042439901 || sessionStorage.getItem('cedula') == 1048209727 || sessionStorage.getItem('cedula')==1048264019) {
            $scope.btnDescargarPT026 = true;
        } else {
          $scope.btnDescargarPT026 = false;
        }

        $('#modalactualizar').modal();
        $scope.hde = {
          FechaInicioSintomas: false,
          FechaConsultaInicial: false,
          FechaTomaMuestra: false,
          Resultado: false,
          FechaInformeResultado: false,
          FechaMuerte: false,
          FechaTerminacionTratamiento: false,
          btnDescargarPT026: true,
        }

        $scope.afildato = null

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
          tratamiento_medico: ''
        }

      if ($scope.esIPS() === true) {
        $scope.mostrarInformacion(true)
        // $scope.$apply()
      } else {
        $scope.mostrarInformacion(false)
        $scope.listarCantidad()
        $scope.listaAfiliados('C')
        $scope.listarSoportes()
      }

      });

      $scope.type = "SELECCIONAR";
      $scope.dat = {
        filtro: ''
      }

      $scope.soportes = null

      $scope.ValidaInformacion = false

      $scope.obtenerDocumento = function () {
        consultaHTTP.obtenerDocumento().then(function (response) {
          $scope.Documentos = response;
        })
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

      $scope.ConsultarAfiliado = function () {
        if (!$scope.esIPS()) {
          $scope.ValidaInformacion = false
          $scope.EstadoInformacion = false
          $scope.ListadoEvoluciones = false
          $scope.TablaHistorico = false
          $scope.ListadoMuestras = false
        }
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
              $scope.afildato = {...response.data};
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
              $scope.informacion.resultado = $scope.afildato.resultado;
              $scope.informacion.fecha_informe_resultado = $scope.afildato.f_informe_resultado;
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

              $scope.informacion.laboratorio_cargue = $scope.afildato.laboratorio_cargue;
              $scope.informacion.tipo_prueba_cargue = $scope.afildato.tipo_prueba_cargue;

              
              

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
            } else {
              swal('Genesis informa', response.data.mensaje, 'info');
            }
          });
        }
      }

      $scope.muestraCondicionFinal = (estado, condicionFinal) => {
        if (typeof condicionFinal === 'undefined' || condicionFinal === null || condicionFinal === '') {
          return 'SIN DATOS'
        }

        if (condicionFinal === 'N' && estado === 'C') {
          return 'Activo'
        }
        return $scope.condicionFinalData.filter((item) =>  item.codigo === condicionFinal)[0].nombre
      }

      $scope.muestraEstado = (codigo) => {
        if (typeof codigo === 'undefined' || codigo === '') {
          return 'SIN DATOS'
        }

        if ($scope.estadoData === null) {
          return 'SIN DATOS'
        }

        return $scope.estadoData.filter((item) => item.codigo === codigo)[0].nombre
      }

      $scope.esIPS = () => {
        return sessionStorage.getItem('nit') !== null && sessionStorage.getItem('nit') !== '0'
      }

      $scope.ConfirmarAfiliado = function () {
        $scope.EstadoInformacion = true;
        $scope.OcultarEvolucion = false
        $scope.ListadoEvoluciones = false;
        $scope.TablaHistorico = false

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
        $scope.informacion.resultado = $scope.afildato.resultado;
        $scope.informacion.fecha_informe_resultado = $scope.afildato.f_informe_resultado;
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


        $(document).ready(function () {
          $("#fuente").val($scope.informacion.fuente);
          $("#estado").val($scope.informacion.estado);
          $("#fecha_inicio_sintomas").val($scope.informacion.fecha_inicio_sintomas);
          $("#fecha_inicial").val($scope.informacion.fecha_inicial);
          $("#ant_hta").val($scope.informacion.ant_hta);
          $("#ant_dm").val($scope.informacion.ant_dm);
          $("#ant_cancer").val($scope.informacion.ant_cancer);
          $("#ant_vih").val($scope.informacion.ant_vih);
          $("#ant_erc").val($scope.informacion.ant_erc);
          $("#ant_epoc").val($scope.informacion.ant_epoc);
          $("#ant_asma").val($scope.informacion.ant_asma);
          $("#discapacidad").val($scope.informacion.discapacidad);
          $("#fecha_consulta_inicial").val($scope.informacion.fecha_consulta_inicial);
          $("#fecha_toma_muestra").val($scope.informacion.fecha_toma_muestra);
          $("#resultado").val($scope.informacion.resultado);
          $("#fecha_informe_resultado").val($scope.informacion.fecha_informe_resultado);
          $("#ente_reporta").val($scope.informacion.ente_reporta);
          $("#periodo").val($scope.informacion.periodo);
          $("#tipo_caso").val($scope.informacion.tipo_caso);
          $("#procedencia").val($scope.informacion.procedencia);
          $("#tipo_atencion").val($scope.informacion.tipo_atencion);
          $("#ips_atencion").val($scope.informacion.ips_atencion);
          $("#tratamiento_medico").val($scope.informacion.tratamiento);
          $("#estado_vital").val($scope.informacion.estado_vital);
          $("#fecha_muerte").val($scope.informacion.fecha_muerte);
          $("#termina_tratamiento").val($scope.informacion.termina_tratamiento);
          $("#fecha_terminacion_tratamiento").val($scope.informacion.fecha_terminacion_tratamiento);
          $("#resultado_tratamiento").val($scope.informacion.resultado_tratamiento);
          $("#condicion_final").val($scope.informacion.condicion_final);
          $scope.chgTipoCaso($scope.informacion.tipo_caso);
          $("#zona_afiliado").val($scope.informacion.zona_covid);
          // $scope.chgTipoAtencion($scope.informacion.tipo_atencion);
          $scope.chgEstadoVital($scope.informacion.estado_vital);
        });
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
            var inicial = $("#fecha_inicial").kendoDatePicker({
              format: "dd/MM/yyyy",
              culture: "es-MX",
              max: new Date()
            }).data("kendoDatePicker");

            var ax = $("#fecha_inicio_sintomas").kendoDatePicker({
              format: "dd/MM/yyyy",
              culture: "es-MX",
              // disableDates: ["su", "sa"],
              max: new Date(),
            }).data("kendoDatePicker");

            var bx = $("#fecha_consulta_inicial").kendoDatePicker({
              format: "dd/MM/yyyy",
              culture: "es-MX",
              // disableDates: ["su", "sa"],
              max: new Date(),
            }).data("kendoDatePicker");

            var cx = $("#fecha_toma_muestra").kendoDatePicker({
              format: "dd/MM/yyyy",
              culture: "es-MX",
              // disableDates: ["su", "sa"],
              max: new Date(),
            }).data("kendoDatePicker");

            var dx = $("#fecha_informe_resultado").kendoDatePicker({
              format: "dd/MM/yyyy",
              culture: "es-MX",
              // disableDates: ["su", "sa"],
              max: new Date(),
            }).data("kendoDatePicker");

            var ex = $("#fecha_sospecha").kendoDatePicker({
              format: "dd/MM/yyyy",
              culture: "es-MX",
              // disableDates: ["su", "sa"],
              max: new Date(),
            }).data("kendoDatePicker");

            var fx = $("#fecha_terminacion_tratamiento").kendoDatePicker({
              format: "dd/MM/yyyy",
              culture: "es-MX",
              //disableDates: ["su", "sa"],
              max: new Date(),
            }).data("kendoDatePicker");

            var gx = $("#fecha_muerte").kendoDatePicker({
              format: "dd/MM/yyyy",
              culture: "es-MX",
              //disableDates: ["su", "sa"],
              max: new Date(),
            }).data("kendoDatePicker");
          });
        });
      }

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

      $scope.changeProceso = function (estado) {
        switch (estado) {
          case 'S':
            $("#fecha_inicio_sintomas").val('');
            $scope.informacion.fecha_inicio_sintomas = '';
            $scope.hde.FechaInicioSintomas = false;

            $("#fecha_consulta_inicial").val('');
            $scope.informacion.fecha_consulta_inicial = '';
            $scope.hde.FechaConsultaInicial = false;

            $("#fecha_toma_muestra").val('');
            $scope.informacion.fecha_toma_muestra = '';
            $scope.hde.FechaTomaMuestra = true;

            $scope.informacion.resultado = 'A';
            $scope.dsb.Resultado = true;

            $("#fecha_informe_resultado").val('');
            $scope.informacion.fecha_informe_resultado = '';
            $scope.hde.FechaInformeResultado = true;


            $scope.informacion.ente_reporta = 'N';
            $scope.dsb.EnteReporta = true;

            $scope.informacion.periodo = '';
            $scope.dsb.Periodo = true;

            $scope.informacion.tipo_caso = 'N';
            $scope.dsb.TipoCaso = true;

            $scope.informacion.pais_procedencia = '';
            $scope.dsb.Procedencia = true;

            $scope.informacion.tratamiento_medico = '';
            $scope.dsb.TratamientoMedico = true;

            $scope.informacion.estado_vital = 'N';
            $scope.dsb.EstadoVital = true;

            $("#fecha_muerte").val('');
            $scope.informacion.fecha_muerte = '';
            $scope.hde.FechaMuerte = true;

            $("#fecha_terminacion_tratamiento").val('');
            $scope.informacion.fecha_terminacion_tratamiento = '';
            $scope.hde.FechaTerminacionTratamiento = true;

            $scope.informacion.termina_tratamiento = 'X';
            $scope.dsb.TerminoTratamiento = true;

            $scope.informacion.resultado_tratamiento = 'X';
            $scope.dsb.ResultadoTratamiento = true;

            $scope.informacion.condicion_final = 'N';
            $scope.dsb.CondicionFinal = true;
            break;
          case 'P':
            $("#fecha_inicio_sintomas").val('');
            $scope.informacion.fecha_inicio_sintomas = '';
            $scope.hde.FechaInicioSintomas = false;

            $("#fecha_consulta_inicial").val('');
            $scope.informacion.fecha_consulta_inicial = '';
            $scope.hde.FechaConsultaInicial = false;

            $("#fecha_toma_muestra").val('');
            $scope.informacion.fecha_toma_muestra = '';
            $scope.hde.FechaTomaMuestra = false;

            $scope.informacion.resultado = 'X';
            $scope.dsb.Resultado = true;

            $("#fecha_informe_resultado").val('');
            $scope.informacion.fecha_informe_resultado = '';
            $scope.hde.FechaInformeResultado = false;

            $scope.informacion.ente_reporta = '';
            $scope.dsb.EnteReporta = false;

            $scope.informacion.periodo = '';
            $scope.dsb.Periodo = false;

            $scope.informacion.tipo_caso = 'N';
            $scope.dsb.TipoCaso = true;

            $scope.informacion.pais_procedencia = '';
            $scope.dsb.Procedencia = true;

            $scope.informacion.tipo_atencion = '';
            $scope.dsb.TipoAtencion = false;

            $scope.informacion.ips_atencion = '';
            $scope.dsb.IpsAtencion = false;

            $scope.informacion.tratamiento_medico = '';
            $scope.dsb.TratamientoMedico = true;

            $scope.informacion.estado_vital = '';
            $scope.dsb.EstadoVital = false;

            $("#fecha_muerte").val('');
            $scope.informacion.fecha_muerte = '';
            $scope.hde.FechaMuerte = false;

            $scope.informacion.termina_tratamiento = 'X';
            $scope.dsb.TerminoTratamiento = true;

            $("#fecha_terminacion_tratamiento").val('');
            $scope.informacion.fecha_terminacion_tratamiento = '';
            $scope.hde.FechaTerminacionTratamiento = true;

            $scope.informacion.resultado_tratamiento = 'X';
            $scope.dsb.ResultadoTratamiento = true;

            $scope.informacion.condicion_final = 'N';
            $scope.dsb.CondicionFinal = true;
            break;
          case 'D':
            $("#fecha_inicio_sintomas").val('');
            $scope.informacion.fecha_inicio_sintomas = '';
            $scope.hde.FechaInicioSintomas = false;

            $("#fecha_consulta_inicial").val('');
            $scope.informacion.fecha_consulta_inicial = '';
            $scope.hde.FechaConsultaInicial = false;

            $("#fecha_toma_muestra").val('');
            $scope.informacion.fecha_toma_muestra = '';
            $scope.hde.FechaTomaMuestra = false;

            $scope.informacion.resultado = 'N';
            $scope.dsb.Resultado = true;

            $("#fecha_informe_resultado").val('');
            $scope.informacion.fecha_informe_resultado = '';
            $scope.hde.FechaInformeResultado = false;

            $scope.informacion.ente_reporta = '';
            $scope.dsb.EnteReporta = false;

            $scope.informacion.periodo = '';
            $scope.dsb.Periodo = false;

            $scope.informacion.tipo_caso = 'N';
            $scope.dsb.TipoCaso = true;

            $scope.informacion.pais_procedencia = '';
            $scope.dsb.Procedencia = true;

            $scope.informacion.tipo_atencion = '';
            $scope.dsb.TipoAtencion = false;

            $scope.informacion.ips_atencion = '';
            $scope.dsb.IpsAtencion = false;

            //$scope.informacion.tratamiento_medico = '';
            //$scope.dsb.TratamientoMedico = true;

            $scope.informacion.estado_vital = '';
            $scope.dsb.EstadoVital = false;

            $("#fecha_muerte").val('');
            $scope.informacion.fecha_muerte = '';
            $scope.hde.FechaMuerte = false;

            $scope.informacion.termina_tratamiento = 'X';
            $scope.dsb.TerminoTratamiento = true;

            $("#fecha_terminacion_tratamiento").val('');
            $scope.informacion.fecha_terminacion_tratamiento = '';
            $scope.hde.FechaTerminacionTratamiento = true;

            $scope.informacion.resultado_tratamiento = 'X';
            $scope.dsb.ResultadoTratamiento = true;

            $scope.informacion.condicion_final = 'N';
            $scope.dsb.CondicionFinal = true;
            break;
          case 'C':
            $("#fecha_inicio_sintomas").val('');
            $scope.informacion.fecha_inicio_sintomas = '';
            $scope.hde.FechaInicioSintomas = false;

            $("#fecha_consulta_inicial").val('');
            $scope.informacion.fecha_consulta_inicial = '';
            $scope.hde.FechaConsultaInicial = false;

            $("#fecha_toma_muestra").val('');
            $scope.informacion.fecha_toma_muestra = '';
            $scope.hde.FechaTomaMuestra = false;

            $scope.informacion.resultado = 'P';
            $scope.dsb.Resultado = true;

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
            $scope.dsb.CondicionFinal = false;
            break;
          case 'X':
            $("#fecha_inicio_sintomas").val('');
            $scope.informacion.fecha_inicio_sintomas = '';
            $scope.hde.FechaInicioSintomas = true;

            $("#fecha_consulta_inicial").val('');
            $scope.informacion.fecha_consulta_inicial = '';
            $scope.hde.FechaConsultaInicial = true;

            $("#fecha_toma_muestra").val('');
            $scope.informacion.fecha_toma_muestra = '';
            $scope.hde.FechaTomaMuestra = true;

            $scope.informacion.resultado = 'A';
            $scope.dsb.Resultado = true;

            $("#fecha_informe_resultado").val('');
            $scope.informacion.fecha_informe_resultado = '';
            $scope.hde.FechaInformeResultado = true;

            $scope.informacion.ente_reporta = 'N';
            $scope.dsb.EnteReporta = true;

            $scope.informacion.periodo = '';
            $scope.dsb.Periodo = true;

            $scope.informacion.tipo_caso = 'N';
            $scope.dsb.TipoCaso = true;

            $scope.informacion.pais_procedencia = '';
            $scope.dsb.Procedencia = true;

            $scope.informacion.tipo_atencion = 'N';
            $scope.dsb.TipoAtencion = true;

            $scope.informacion.ips_atencion = '';
            $scope.dsb.IpsAtencion = true;

            $scope.informacion.tratamiento_medico = '';
            $scope.dsb.TratamientoMedico = true;

            $scope.informacion.estado_vital = 'N';
            $scope.dsb.EstadoVital = true;

            $("#fecha_muerte").val('');
            $scope.informacion.fecha_muerte = '';
            $scope.hde.FechaMuerte = true;

            $scope.informacion.termina_tratamiento = 'X';
            $scope.dsb.TerminoTratamiento = true;

            $("#fecha_terminacion_tratamiento").val('');
            $scope.informacion.fecha_terminacion_tratamiento = '';
            $scope.hde.FechaTerminacionTratamiento = true;

            $scope.informacion.resultado_tratamiento = 'X';
            $scope.dsb.ResultadoTratamiento = true;

            $scope.informacion.condicion_final = 'N';
            $scope.dsb.CondicionFinal = true;
            break;
          // default:
          // 	break;
        }
      }

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
        if ($scope.afildato.estado_afiliado === 'RETIRADO') {
          notify.show('warning', 'No se puede registrar información a afiliados retirados')
          return
        }

        if (informacion.estado === 'C' || informacion.estado === 'D') {
          if (
            informacion.fecha_inicial === null ||
            informacion.fecha_inicial === '' ||
            informacion.fuente === null ||
            informacion.fuente === '' ||
            informacion.estado === null ||
            informacion.estado === '' ||
            informacion.laboratorio_cargue === null ||
            informacion.laboratorio_cargue === '' ||
            informacion.tipo_prueba_cargue === null ||
            informacion.tipo_prueba_cargue === '' ||
            informacion.fecha_toma_muestra === null ||
            informacion.fecha_toma_muestra === '' ||
            informacion.resultado === null ||
            informacion.resultado === '' ||
            informacion.fecha_informe_resultado === null ||
            informacion.fecha_informe_resultado === ''
          ) {
            notify.show('info', 'Debe de llenar los todos campos')
            return
          }
        }

        if (informacion.estado === 'P') {
          if (
            informacion.fecha_inicial === null ||
            informacion.fecha_inicial === '' ||
            informacion.fuente === null ||
            informacion.fuente === '' ||
            informacion.estado === null ||
            informacion.estado === '' ||
            informacion.laboratorio_cargue === null ||
            informacion.laboratorio_cargue === '' ||
            informacion.tipo_prueba_cargue === null ||
            informacion.tipo_prueba_cargue === '' ||
            informacion.fecha_toma_muestra === null ||
            informacion.fecha_toma_muestra === '' ||
            informacion.ips_atencion === null ||
            informacion.ips_atencion === ''
          ) {
            notify.show('info', 'Debe de llenar los todos campos')
            return
          }
        }

        if (informacion.estado === 'S') {
          if (
            informacion.fecha_inicial === null ||
            informacion.fecha_inicial === '' ||
            informacion.fuente === null ||
            informacion.fuente === '' ||
            informacion.estado === null ||
            informacion.estado === ''
          ) {
            notify.show('info', 'Debe de llenar los todos campos')
            return
          }
        }

       	$scope.RegistrarValidado(informacion);
      }

      const usuario = sessionStorage.getItem('cedula')

      const cargarHistoriaClinica = (file, informacion) => {
        swal({
          title: 'Genesis informa',
          text: "Se esta cargando el documento",
          icon: 'info',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      	const formData = new FormData()

      	formData.append('soporte', file)

        axios({
          url: `php/genesis/func_soporte_covid.php?tipo=historia&fuente=G&usuario=${usuario}&documento=${$scope.id}`,
          method: 'post',
          data: formData
        }).then((response) => {
          swal.close()
          swal('Genesis informa', 'Se cargó el soporte correctamente', 'info')
        })
      }

      const cargarSismuestras = (file) => {
        swal({
          title: 'Genesis informa',
          text: "Se esta cargando el documento",
          icon: 'info',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      	const formData = new FormData()

      	formData.append('soporte', file)

        axios({
          url: `php/genesis/func_soporte_covid.php?tipo=sismuestras&fuente=G&usuario=${usuario}&documento=${$scope.id}`,
          method: 'post',
          data: formData
        }).then((response) => {
          swal.close()
          if (response.data.error) {
              swal('Genesis informa', response.data.error.message, 'error')
          } else {
              swal('Genesis informa', response.data.data.message, 'info')  
          }          
        })
      }

      $scope.RegistrarValidado = function (informacion) {
        var dataRegistro = JSON.stringify(informacion);
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

            const historiaClinica = document.querySelector('#archivoHistoriaClinica')
        const historiaClinicaBtn = document.querySelector('#archivoHistoriaClinicaBtn')

        const sismuestras = document.querySelector('#archivoSismuestras')
        const sismuestrasBtn = document.querySelector('#archivoSismuestrasBtn')
          if (historiaClinica.files !== null && historiaClinica.files.length > 0) {
            cargarHistoriaClinica(historiaClinica.files[0], informacion)
          }
          if (historiaClinicaBtn.files !== null &&historiaClinicaBtn.files.length > 0) {
            cargarHistoriaClinica(historiaClinicaBtn.files[0], informacion)
          }

          if (sismuestras.files !== null && sismuestras.files.length > 0) {
            cargarSismuestras(sismuestras.files[0], informacion)
          }
          if (sismuestrasBtn.files !== null && sismuestrasBtn.files.length > 0) {
            cargarSismuestras(sismuestrasBtn.files[0], informacion)
          }

            $scope.limpiar();
          } else {
            swal('Genesis informa', response.data.mensaje, 'info');
          }
        });
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
        $scope.TablaHistorico = false

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
        if ($scope.dat.filtro === '') {
          $scope.listaTemp = $scope.lista
        }
        $scope.listaTemp = $scope.lista.filter((item) => {
          return item.NOMBRE_AFILIADO.includes($scope.dat.filtro.toUpperCase()) ||
            item.MUNICIPIO.includes($scope.dat.filtro.toUpperCase()) ||
            item.DOC.includes($scope.dat.filtro.toUpperCase())
          item.GRUPO_DE_RIEGOS.includes($scope.dat.filtro.toUpperCase())
        })
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

      $scope.esSeccionalSaludPublica = () => {
        return sessionStorage.getItem('cargo') === 'ASISTENTE SECCIONAL DE SALUD PUBLICA'
      }

      $scope.mostrarInformacion = (valor) => {
        $scope.ValidaInformacion = valor
        if (valor === false) {
          $scope.type = null
          $scope.id = null
          $scope.ValidaInformacion = false;
          $scope.EstadoInformacion = false;
        }
        $scope.$apply()
      }

      $scope.listaAfiliados = (estado) => {
      	$scope.dat.filtro = '';

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

          $scope.listarCantidad()

          $scope.$apply()
          swal.close()
        })
      }

      $scope.consultaAfiliado = (afiliado) => {
        console.log(afiliado.TIPOD_DOC)
        $scope.type = afiliado.TIPOD_DOC
        $scope.id = afiliado.DOC
        $scope.ConsultarAfiliado()
      }

      $scope.cambiarHistorico = (indice) => {
        $scope.historicoData = $scope.dataHistorico[indice];

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
        $scope.ListadoEvoluciones = false
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
          $scope.historicoActual = $scope.dataHistorico.length - 1

          //$scope.ValidaInformacion = true;
          $scope.EstadoInformacion = false;
          $scope.TablaHistorico = true;

          $scope.cambiarHistorico($scope.historicoActual)
        });
      }

      // $scope.mostrarSoporte = (archivo) => {
      //   const tokens = archivo.RUTA.split('').reverse().join('').split('/', 1)
      //   const datos = tokens.map((token) => {
      //     return token.split('').reverse().join('')
      //   })

      //   datos.push(archivo.RUTA.replace(datos[0], ''))

      //   const data = {
      //     'ruta': datos[1],
      //     'nombre': datos[0],
      //     'extension': 'pdf'
      //   }

      //   ngDialog.open({
      //     template: '/Genesis/views/saludpublica/mostrarsoporte.html',
      //     data: {
      //       url: '/Genesis/php/file.php?data=' + btoa(JSON.stringify(data))
      //     }
      //   });
      // }


      $scope.mostrarSoporte = function (data) {
        $scope.ListadoMuestras = false
        $scope.editruta = data.RUTA;
        $scope.ftp = data.FTP;
        $scope.inforapida = data;
        ngDialog.open({
          template: 'views/consultaAfiliados/modalsoportecovid.html',
          className: 'ngdialog-theme-plain',
          controller: 'estadoanexoctrl',
          scope: $scope
        });
      }

      $scope.estadoanexo = function (data) {
        $scope.editruta = data.RUTA;
        $scope.ftp = data.FTP;
        $scope.inforapida = data;
        ngDialog.open({
          template: 'views/consultaAfiliados/modalestadoanexo.html',
          className: 'ngdialog-theme-plain',
          controller: 'estadoanexoctrl',
          scope: $scope
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

      $scope.Consultar_Muestras = function () {
        swal({ title: 'Cargando Informacion' }); swal.showLoading(); 
        $http({
          method: 'POST',
          url: "php/saludpublica/covid/funccovid.php",
          data: { function: 'Consultar_Muestras', documento: $scope.id }
        }).then(function (res) {
          if (res.data.codigo == 1) {
            swal.close();
            swal('Genesis informa', res.data.mensaje, 'info');
          } else {
            if (res.data.length > 0) {
              if ($scope.estado == 'destruir') {
                $scope.tablemuestras.destroy();
              }
              $scope.ListadoMuestras = true;
              // $scope.OcultarEvolucion = false;
              $scope.tablemuestras = res.data;
              $scope.estado = 'destruir';
              setTimeout(function () {
                $scope.tablemuestras = $('#tablemuestras').DataTable({
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

      $scope.generartxt = function () {
        // swal({ title: 'Cargando Informacion' }); swal.showLoading();
        window.open('php/saludpublica/covid/pt026.php');
      }
    }]);