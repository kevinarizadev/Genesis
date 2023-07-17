'use strict';
/**
* @ngdoc service
* @name GenesisApp.service:pqrHttp
* @description
* # servicio http para el llamado al web services de todos los procedimientos del pqr.*/
angular.module('GenesisApp')
  .service('pqrHttp', function ($http, $q) {
    return ({
      /* Functions Radicación PQRS */
      getPrivideliosPQR: function () {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerPrivilegios' }
        });
        return (request.then(handleSuccess, handleError));
      },
      getSolicitud: function () {
        var request = $http({
          method: "get",
          url: "json/solicitud.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      getRiesgo: function () {
        var request = $http({
          method: "get",
          url: "json/riesgo.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      getMediosRecepcion: function () {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerMediosRecepcion' }
        });
        return (request.then(handleSuccess, handleError));
      },
      getMediosRecepcionTipo: function (data) {

        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerMediosRecepcionTipo', tipo: data }
        });
        return (request.then(handleSuccess, handleError));
      },

      getOtrosEntesDeControl: function () {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerEntesControl' }
        });
        return (request.then(handleSuccess, handleError));
      },
      getEntidades: function (data) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerEntidades', entidad: data }
        });
        return (request.then(handleSuccess, handleError));
      },
      getRadicacion: function () {
        var request = $http({
          method: "get",
          url: "json/radicacion.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      getTipoRadicacion: function (data) {

        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerTipoRadicacion', tipo: data }
        });
        return (request.then(handleSuccess, handleError));
      },
      getDocumento: function () {
        var request = $http({
          method: "get",
          url: "json/tipodocumento.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      getSexo: function () {
        var request = $http({
          method: "get",
          url: "json/sexo.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      getCriteriObjetivo: function () {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerCriteriObjetivos' }
        });

        return (request.then(handleSuccess, handleError));
      },
      getCriterioSubjetivo: function () {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerCriterioSubjetivos' }
        });
        return (request.then(handleSuccess, handleError));
      },
      getCriterioComplementario: function () {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerCriterioComplementario' }
        });
        return (request.then(handleSuccess, handleError));
      },
      buscarpqrs: function (documento) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'buscarpqr', pqr: documento }
        });
        return (request.then(handleSuccess, handleError));
      },
      detallepqrs: function (codigo) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'detallepqr', pqr: codigo }
        });
        return (request.then(handleSuccess, handleError));
      },
      getSujetosproteccionespecial: function () {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerSujetos' }
        });
        return (request.then(handleSuccess, handleError));
      },
      getServicios: function () {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerServicios' }
        });
        return (request.then(handleSuccess, handleError));
      },
      getMedicamentos: function () {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerMedicamentos' }
        });
        return (request.then(handleSuccess, handleError));
      },
      getAcudiente: function () {
        var request = $http({
          method: "get",
          url: "json/acudiente.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      getMacromotivos: function () {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerMacromotivos' }
        });
        return (request.then(handleSuccess, handleError));
      },
      getMotivosGenerales: function () {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerMotivosGenerales' }
        });
        return (request.then(handleSuccess, handleError));
      },
      getMotivosEspecificos: function () {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerMotivosEspecificos' }
        });
        return (request.then(handleSuccess, handleError));
      },
      getMotivosEspecificosTiposol: function (sol) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerMotivosEspecificos_tiposol', tiposol: sol }
        });
        return (request.then(handleSuccess, handleError));
      },
      getDias: function () {
        var request = $http({
          method: "get",
          url: "json/dias.json"
        });
        return (request.then(handleSuccess, handleError));
      },
        getDiasEntes: function () {
        var request = $http({
          method: "get",
          url: "json/dias_entes.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      getRespuestas: function () {
        var request = $http({
          method: "get",
          url: "json/respuestapqr.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      getDepartamentosMunicipios: function () {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerDepartamentosMunicipios' }
        });
        return (request.then(handleSuccess, handleError));
      },
      getSession: function () {
        var request = $http({
          method: "get",
          url: "php/obtenersession.php"
        });
        return (request.then(handleSuccess, handleError));
      },
      postSearchAfiliado: function (data) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'searchAfiliado', tipodocumento: data.selectedDocumento, documento: data.documento, tipo: data.tipo }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      postSearchIps: function (data) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'searchIps', ips: data }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      postSearchEmpleador: function (data) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'searchEmpleador', tipodocumento: data.tipodocumento, documento: data.documento }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      postPqr: function (data, file, num, tipo, fguia) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: { function: 'insertarDatosPqr', pqr: data, pqrFile: file, numero: num, action: tipo, gcorrespFile: fguia }
        });
        return (request.then(handleSuccessPost, handleError));
      },

      /* Functions Admon PQRS */
      getMotivosAseguramiento: function () {
        var request = $http({
          method: "get",
          url: "json/movitos_aseguramiento.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      getCausales: function () {
        var request = $http({
          method: "get",
          url: "json/causales.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      get_TiposCausales: function () {
        var request = $http({
          method: "get",
          url: "json/tipos_causales.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      getSubTiposCausales: function () {
        var request = $http({
          method: "get",
          url: "json/sub_tipos_causales.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      getAccionesTraslado: function () {
        var request = $http({
          method: "get",
          url: "json/acciones_traslados.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      getRespuestaTraslado: function () {
        var request = $http({
          method: "get",
          url: "json/respuesta_traslados.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      getPQRS: function (state, res) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerPQRS', estado: state, responsable: res }
        });
        return (request.then(handleSuccess, handleError));
      },
      getPQRTIPOSOL: function (tipo, res, state) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerPQRSTIPOSOL', tiposol: tipo, responsable: res, estado: state }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_PQR_TIPO_SOL: function (tipo, state, res) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'P_OBTENER_PQR_TIPO_SOL', tiposol: tipo, responsable: res, estado: state }
        });
        return (request.then(handleSuccess, handleError));
      },
      getCorrespondencia: function (state, res, tipo) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerCorrespondencia', estado: state, responsable: res, tipo_corresp: tipo }
        });
        return (request.then(handleSuccess, handleError));
      },

      postSearchUsuarios: function (data) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerListados', coincidencia: data }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      getResponsables: function () {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerResponsables' }
        });
        return (request.then(handleSuccess, handleError));
      },
      postAseguramientoPqr: function (data,file,ext) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: { function: 'insertarDatosPqrAseguramiento', aseguramiento: data , adjunto:file, extension:ext}
        });
        return (request.then(handleSuccessPost, handleError));
      },
      postResponsablePqr: function (data, num, tipo) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: { function: 'saveResponsablePqrSalud', responsable: data, numero: num, action: tipo }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      postReasignarResponsablePqr: function (res, num, comment, res_accion) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: { function: 'reasignarResponsable', responsable: res, pqr: num, observacion: comment, reponsable_accion: res_accion }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      postResponsableSeleccionables: function (data, state) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: { function: 'saveResponsableSeleccionables', responsable: data, estado: state }
        });
        return (request.then(handleSuccessPost, handleError));
      },
       postCrudSalud: function (data, adj) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: { function: 'insertSalud', pqr: data, adjunto: adj }
        });
        return (request.then(handleSuccess, handleError));
      },
     /* postCrudSalud: function (codpqr, cedula, coment, state, adj, ext, step, mnegacion, adelegada, ngacion, nitips, vmedicamentos, vcantidad) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: { function: 'insertSalud', pqr: codpqr, responsable: cedula, comentario: coment, estado: state, adjunto: adj, extension: ext, fase: step, motivonegacion: mnegacion, areadelegadanegacion: adelegada, negacion: ngacion, ips: nitips, medicamentos: vmedicamentos, cantidad: vcantidad }
        });
        return (request.then(handleSuccessPost, handleError));
      },*/
      getResponsablesPQR: function (codpqr) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerResponsablesPQR', pqr: codpqr }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      getNegacionPQR: function (codpqr) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerNegacionPQR', pqr: codpqr }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      getProcesoSaludPQR: function (codpqr) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerProcesoSaludPQR', pqr: codpqr }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      getGestionFaseActualSaludPQR: function (codpqr, pfase) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerFaseActual', pqr: codpqr, fase: pfase }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      getGestionxFaseSaludPQR: function (codpqr, pfase) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerGestionXFase', pqr: codpqr, fase: pfase }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      getInfoAseguramientoPQR: function (codpqr) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerPQRaseguramiento', pqr: codpqr }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      getGestionAseguramientoPQR: function (codpqr) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerGestionPQRaseguramiento', pqr: codpqr }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      dowloadfile: function (ruta, ftp) {
         ftp = ftp == null || ftp == "" ?  3 : ftp;
        if (ftp=='1') {
          var request = $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: { function: 'descargaAdjunto', ruta: ruta }
          });      
        }
        if (ftp=='3') {
          var request = $http({
            method: 'POST',
            url: "php/siau/pqr/Cpqr.php",
            data: { function: 'descargaAdjunto', ruta: ruta }
          });      
        }
        return (request.then(handleSuccessPost, handleError));
      },
      getMotivosNegacion: function () {
        var request = $http({
          method: "get",
          url: "json/motivos_negacion.json"
        });
        return (request.then(handleSuccess, handleError));
      }, postViewNotification: function (codpqr) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: { function: 'insertViewNotification', pqr: codpqr }
        });
        return (request.then(handleSuccessPost, handleError));
      },//===============ADMINISTRACION PARAMETROS============================
      getRegimen: function () {
        var request = $http({
          method: "get",
          url: "json/regimen.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      getSede: function () {
        var request = $http({
          method: "get",
          url: "json/sede.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      postObtenerParametro: function (rv, reg, sed, ent, med) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerParametro', riesgo: rv, regimen: reg, sede: sed, ente: ent, medio: med }
        });
        return (request.then(handleSuccessPost, handleError));
      },

      postObtenerMotivos: function (cod) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerMotivosXparametro', codigo: cod }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      postObteneResponsable: function (res) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerResponsable', responsable: res }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      postUpdateResponsableMotivo: function (resn, resa, mot, param) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: { function: 'updateResponsableMotivo', resnuevo: resn, resanterior: resa, motivo: mot, parametro: param }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      postUpdateMotivosResponsable: function (resn, resa, param) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: { function: 'updateMotivosResponsable', resnuevo: resn, resanterior: resa, parametro: param }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      postObtenerResponsablesMotivos: function (param) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerResponsableMotivos', 'parametro': param }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      postObtenerMotivosResponsable: function (res, param) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerMotivosResponsable', 'responsable': res, 'parametro': param }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      postObtenerResponsablesSeccionales: function () {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerResponsablesSeccionales' }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      postUpdateResponsableSeccional: function (resn, resa, param) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: { function: 'updateResponsableSeccional', resnuevo: resn, resanterior: resa, parametro: param }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      postCarguePqr: function (data) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: { function: 'cargeMasivoPqr', pqr: data }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      postObtenerPqrExcel: function () {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerPqrExcel' }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      postPQRSuperSalud: function (data) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: {
            function: 'updatePQRSuperSalud', criterioobjetivo: data.criterioobjetivo,
            criteriosubjetivo: data.criteriosubjetivo,
            critericomplementario: data.critericomplementario,
            sujetosproteccionespecial: data.sujetosproteccionespecial,
            servicios: data.servicios,
            medicamentos: data.medicamentos,
            pqrfile: data.pqrfile,
            pqrfileFtp: data.pqrfileFtp,
            codigosuper: data.codigosuper,
            extension: data.extension,
            adjunto: data.adjunto,
            reporta: data.reporta
          }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      p_mostrar_traza: function (pqr) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'p_mostrar_traza', pqr: pqr }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_tipo_correspondencia: function () {
        var request = $http({
          method: "get",
          url: "json/correspondencia.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      get_areas: function () {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'p_obtener_areas' }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_func_areas: function (data, ubicacion) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'p_obtener_func_areas', area: data, seccional: ubicacion }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_chequear_ips_medicamento: function (data) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'p_chequear_ips_medicamento', pqr: data }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_chequear_medicamento: function (data) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'p_chequear_medicamento', pqr: data }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_Ips: function (data) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerIps', ips: data }
        });
        return (request.then(handleSuccess, handleError));
      },

      get_Productos: function (data) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'BuscarProducto', coincidencia: data }
        });
        return (request.then(handleSuccess, handleError));
      },
       get_pqr_estado: function (data) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'obtenerpqrestado', numero: data }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_correpondencia_x_estado: function (data) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'p_obtener_correpondencia_x_estado', estado: data }
        });
        return (request.then(handleSuccess, handleError));
      },
      postEstadoSOL: function (data) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: {
            function: 'updateEstadoSolicitud',
            pqr: data.pqr,
            responsable: data.responsable,
            estado_nuevo: data.estado_nuevo,
            estado_anterior: data.estado_anterior,
            motivo_anulacion: data.motivo_anulacion,
            motivo_activacion: data.motivo_activacion,
            pqr_asociada: data.pqr_asociada,
            modulo: data.modulo,
            observacion: data.observacion
          }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      get_motivosacciones: function (mot, mod) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'obtenermotivosacciones',
            motivo: mot,
            modulo: mod
          }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      get_pqr_numero: function (data) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_pqr_numero',
            pqr: data
          }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      get_correspondencia_numero: function (data) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_correspondencia_numero',
            consecutivo: data
          }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      get_pqr_estadisticas: function (data, state) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_pqr_estadisticas',
            responsable: data,
            estado: state
          }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      get_pqr_seccionales: function () {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'obtenerSeccionales'
          }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_pq_correspondencia: function (data) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_pq_correspondencia',
            responsable: data
          }
        });
        return (request.then(handleSuccess, handleError));
      },
      post_ipq_correspondencia: function (cant, jsoncorresp, res) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_ipq_correspondencia',
            cantidad: cant,
            correspondencias: jsoncorresp,
            responsable: res,

          }
        });
        return (request.then(handleSuccess, handleError));
      },
       get_pq_pqr: function (tcorrrespondencia, state, res) {
        console.log(tcorrrespondencia, state);
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_pq_pqr',
            corrrespondencia: tcorrrespondencia,
            estado: state,
            responsable: res

          }
        });
        return (request.then(handleSuccess, handleError));
      },
     // get_pq_pqr: function () {
       // var request = $http({
         // method: 'POST',
        //  url: "php/siau/pqr/Rpqr.php",
          //data: {
           // function: 'p_obtener_pq_pqr'
         // }
       // });
       // return (request.then(handleSuccess, handleError));
      //},
      get_pqprocesado_pqr: function () {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_pqprocesado_pqr'
          }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_historico_pqr: function (res) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_historico_pqr',
            responsable: res

          }
        });
        return (request.then(handleSuccess, handleError));
      },
     post_update_ruta_pq: function (cod, url, res, vfile, ext,vftp) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: {
            function: 'p_actualizar_ruta_pq',
            codigo: cod,
            ruta: url,
            responsable: res,
            file: vfile,
            extension: ext,
            ftp: vftp
          }
        });
        return (request.then(handleSuccess, handleError));
      },

      get_operadores_correspondencia: function () {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_operadores_correspondencia'
          }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_tercero: function (param,tipo) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_tercero',
            coincidencia: param,
            tipo:tipo
          }
        });
        return (request.then(handleSuccess, handleError));
      },

      get_sedes: function () {
        var request = $http({
          method: 'POST',
          url: "php/talentohumano/capacitacion/Rcapacitacion.php",
          data: {
            function: 'listarSedes'
          }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_areas_sede: function (sede) {
        var request = $http({
          method: 'POST',
          url: "php/talentohumano/capacitacion/Rcapacitacion.php",
          data: {
            function: 'listarAreas',
            sede: sede
          }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_personas_area: function (sede, area) {
        var request = $http({
          method: 'POST',
          url: "php/talentohumano/capacitacion/Rcapacitacion.php",
          data: {
            function: 'listarAsistentes',
            sede: sede,
            area: area
          }
        });
        return (request.then(handleSuccess, handleError));
      },

      get_info_sticker: function (param) {
        var request = $http({
          method: 'POST',
          url: "../../../php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_sticker',
            numero: param
          }
        });
        return (request.then(handleSuccess, handleError));
      },

      post_insertar_tercero_pqr: function (temptercero) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: {
            function: 'p_inserta_tercero_pqr',
            tercero: temptercero

          }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_ciudades_pqr: function () {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_ciudades'

          }
        });
        return (request.then(handleSuccess, handleError));
      },

      getServicioCorrepondencia: function () {
        var request = $http({
          method: "get",
          url: "json/servicio_correpondencia.json"
        });
        return (request.then(handleSuccess, handleError));
      },
      getAmbitoCorrepondencia: function () {
        var request = $http({
          method: "get",
          url: "json/ambito_correspondencia.json"
        });
        return (request.then(handleSuccess, handleError));
      },

      post_insertar_operador_corresp: function (temptercero) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: {
            function: 'p_inserta_operador_corresp',
            operador: temptercero

          }
        });
        return (request.then(handleSuccess, handleError));
      },
      post_actualizar_courier: function (courier, count) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: {
            function: 'p_actualiza_courier',
            couriers: courier,
            cantidad: count

          }
        });
        return (request.then(handleSuccess, handleError));
      },
      post_actualizar_guia: function (tguias, numguia, count, vgradfile, vgradext) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: {
            function: 'p_actualiza_guia',
            guias: tguias,
            numguia: numguia,
            cantidad: count,
            gradfile: vgradfile,
            gradext: vgradext

          }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_datos_recibida: function (pq) {
        var request = $http({
          method: 'POST',
          url: "../../../php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_mostrar_datos_recibida',
            paquete: pq

          }
        });
        return (request.then(handleSuccess, handleError));
      },

      get_datos_enviada: function (pq) {
        var request = $http({
          method: 'POST',
          url: "../../../php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_mostrar_datos_enviada',
            paquete: pq

          }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_formato_correspondencia: function (num) {
        var request = $http({
          method: 'POST',
          url: "../../../php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_formato_correspondencia',
            numero: num

          }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_formato_correspondencia_r: function (num) {
        var request = $http({
          method: 'POST',
          url: "../../../php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_formato_correspondencia_r',
            numero: num

          }
        });
        return (request.then(handleSuccess, handleError));
      }, post_actualizar_correspondencia: function (data, count) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: {
            function: 'p_actualiza_correspondencia',
            correspondencia: data,
            cantidad: count

          }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_detalle_correspondencia: function (num) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_detalle_correspondencia',
            numero: num

          }
        });
        return (request.then(handleSuccess, handleError));
      },
      post_actualiza_estado_pq: function (num) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: {
            function: 'p_actualiza_estado_pq',
            numero: num

          }
        });
        return (request.then(handleSuccess, handleError));
      },
      postTransferirCorrespondencia: function (v_area, num, res_accion) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: { function: 'p_transferir_correspondencia', area: v_area, pqr: num, reponsable_accion: res_accion }
        });
        return (request.then(handleSuccessPost, handleError));
      },
         get_documentos_radicar: function () {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'p_obtener_documentos_radicar' }
        });
        return (request.then(handleSuccess, handleError));
      },
      p_validar_documento_radicar: function (vremitente, vtipodocrad, vdocrad) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_validar_documento_radicar',
            remitente: vremitente,
            tipo_documento_rad: vtipodocrad,
            documento_rad: vdocrad
          }
        });
        return (request.then(handleSuccess, handleError));
      },
       get_rol_correspondencia: function (res) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'p_obtener_rol_correspondencia', responsable: res }
        });
        return (request.then(handleSuccessPost, handleError));
      },
      postDevolverCorrespondencia: function (v_consecutivo, v_motivo, v_observaciones, v_responsable) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: {
            function: 'p_cambiar_estado_devolucion',
            consecutivo: v_consecutivo,
            motivo: v_motivo,
            observaciones: v_observaciones,
            responsable: v_responsable
          }
        });
        return (request.then(handleSuccessPost, handleError));
      },

      p_obtener_lista_responsables_correspondencia: function (ubi) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_lista_responsables_correspondencia',
            ubicacion: ubi,
          }
        });
        return (request.then(handleSuccess, handleError));
      },

      p_obtener_funcionario_eps: function (vnit) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_funcionario_eps',
            nit: vnit,
          }
        });
        return (request.then(handleSuccess, handleError));
      },

      p_ui_responsasbles_correspondencia: function (jsondata) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: {
            function: 'p_ui_responsasbles_correspondencia',
            responsables: jsondata
          }
        });
        return (request.then(handleSuccess, handleError));
    },
      p_obtener_pqr_super: function (vnit) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_pqr_super',
            nit: vnit,
          }
        });
        return (request.then(handleSuccess, handleError));
      },
      p_obtener_pqr_patologia: function () {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_pqr_patologia',            
          }
        });
        return (request.then(handleSuccess, handleError));
      },
      p_obtener_pqr_motivo_res: function () {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_pqr_motivo_res',            
          }
        });
        return (request.then(handleSuccess, handleError));
      },
      p_obtener_pqr_tecno_altocosto: function () {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_obtener_pqr_tecno_altocosto',            
          }
        });
        return (request.then(handleSuccess, handleError));
      },
      

      p_actualizar_pqr_solicitud: function (jsondata) {
        var request = $http({
          method: 'POST',
          url: "php/siau/pqr/Cpqr.php",
          data: {
            function: 'p_actualizar_pqr_solicitud',
            pqr: jsondata
          }
        });
        return (request.then(handleSuccess, handleError));
      },
       getPQRAvanzado: function (vjsonpqr) {        
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'p_obtener_pqr_avanzado', jsonpqr: vjsonpqr }
        });
        return (request.then(handleSuccess, handleError));
      },
          getvalidapqr_responsable: function (res) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'p_validapqr_responsable', responsable: res }
        });
        return (request.then(handleSuccess, handleError));
      },
       validapqr_gestionriesgo: function (tipodoc, doc) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: {
            function: 'p_validapqr_gestionriesgo',
            tipodocumento: tipodoc, documento: doc
          }
        });
        return (request.then(handleSuccess, handleError));
      },

    // pqr ips

      getPqrIPS: function (state,res) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'p_obtener_pqr_ips', estado: state, responsable:res }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_responsables_ips: function () {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'p_mostrar_responsables_ips' }
        });
        return (request.then(handleSuccess, handleError));
      },
      get_pqr_ips_avanzado: function (res, f_inicio, f_fin) {
        var request = $http({
          method: "POST",
          url: "php/siau/pqr/Rpqr.php",
          data: { function: 'p_obtener_pqr_ips_avanzado', responsable: res, fecha_inicio: f_inicio, fecha_fin: f_fin }
        });
        return (request.then(handleSuccess, handleError));
      }

    })

    function handleSuccessPost(response) {
      return (response);
    }
    function handleSuccess(response) {
      return (response.data);
    }
    function handleError(error) {
      if (error == null) {
        return ($q.reject(error));
      } else if (error.errorMessage !== undefined) {
        return ($q.reject(error.errorMessage));
      } else {
        return ($q.reject(error.ExceptionMessage));
      }
    }
  });
