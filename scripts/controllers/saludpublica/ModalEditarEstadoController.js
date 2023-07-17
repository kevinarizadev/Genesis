'use strict';
const saludPublica_modalEditarInformacion_providers = ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter', 'FileProcessor'];
saludPublica_modalEditarInformacion_providers.push(($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter, FileProcessor) => {

  $scope.soportes = null
  $scope.muestraSoporte = false

  $scope.datos = {
    soporte: null,
    url: null
  }

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

  $scope.mostrarSoporte = () => {
    const tokens = $scope.datos.soporte.split('').reverse().join('').split('/', 1)
    const datos = tokens.map((token) => {
      return token.split('').reverse().join('')
    })

    datos.push($scope.datos.soporte.replace(datos[0], ''))

    const data = {
      'ruta': datos[1],
      'nombre': datos[0],
      'extension': 'pdf'
    }

    $scope.datos.url = '/Genesis/php/file.php?data=' + btoa(JSON.stringify(data))
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

  let timeoutId = null;
  const showWaiting = (timeout) => {
    timeoutId = setTimeout(() => {
      swal('Por favor espere', 'Dependiendo del  tamaño del archivo este proceso puede tomar algunos minutos', 'info').then(() => {
        showWaiting(30000);
      });
    }, timeout);
  }

  const cargarArchivoSISMuestras = (file) => {
    const data = new FormData();
    data.append('soporte', file);

    showWaiting(1000);

    axios({
      url: `/Genesis/php/genesis/func_soporte_covid.php?tipo=sismuestras&fuente=G&usuario=${sessionStorage.getItem('cedula')}`,
      method: 'post',
      data
    }).then((response) => {
      clearTimeout(timeoutId);
      swal('Genesis informa', 'Se ha cargado el archivo de SISMUESTRAS', 'success')
    })
  }

  const cargarArchivoHistoriaClinica = (file) => {
    const data = new FormData();
    data.append('soporte', file);

    showWaiting(1000);

    axios({
      url: `/Genesis/php/genesis/func_soporte_covid.php?tipo=historia&fuente=G&usuario=${sessionStorage.getItem('cedula')}`,
      method: 'post',
      data
    }).then((response) => {
      clearTimeout(timeoutId)
      swal('Genesis informa', 'Se ha cargado la historia clinica', 'success')
    })
  }

  $scope.RegistrarValidado = function (informacion) {
    if (document.querySelector('#archivoHistoriaClinica').files.length > 0) {
      cargarArchivoHistoriaClinica(document.querySelector('#archivoHistoriaClinica').files[0])
    }

    if (document.querySelector('#archivoSismuestras').files.length > 0) {
      cargarArchivoSISMuestras(document.querySelector('#archivoSismuestras').files[0])
    }

    // informacion.ruta_soporte = success.data.data
    var dataRegistro = JSON.stringify(informacion);
    console.log(dataRegistro)
    showWaiting(1000);
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
        $scope.closeThisDialog()
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

  $scope.listarSoportes()

  $scope.EstadoInformacion = true;
  $scope.OcultarEvolucion = false
  $scope.ListadoEvoluciones = false;
  $(document).ready(function () {

      // $scope.informacion = $scope.ngDialogData.informacion
  // $scope.informacion.condicion_final = $scope.informacion.ngDialogData.condincion_final

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
              //$scope.listarSoportes()

              $scope.condicionFinalData = $scope.ngDialogData.condicionFinalData
  $scope.discapacidadData = $scope.ngDialogData.discapacidadData
  $scope.entidadReportaData = $scope.ngDialogData.entidadReportaData
  $scope.estadoData = $scope.ngDialogData.estadoData
  $scope.estadoVitalData = $scope.ngDialogData.estadoVitalData
  $scope.FuenteData = $scope.ngDialogData.FuenteData
  $scope.resultadoData = $scope.ngDialogData.resultadoData
  $scope.tipoCasoData = $scope.ngDialogData.tipoCasoData
  $scope.tipoAtencionData = $scope.ngDialogData.tipoAtencionData
  $scope.terminaTratamientoData = $scope.ngDialogData.terminaTratamientoData
  $scope.resultadoTratamientoData = $scope.ngDialogData.resultadoTratamientoData

    $("#fuente_m").val($scope.informacion.fuente);
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
            } else {
              swal('Genesis informa', response.data.mensaje, 'info');
            }
          });

  // console.log($scope.ngDialogData.informacion)

  
  });

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
});

angular.module('GenesisApp').controller('ModalEditarEstadoController', saludPublica_modalEditarInformacion_providers);
