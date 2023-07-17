'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:afiliacionHttp
 * @description
 * # servicio http para el llamado al web services con todos los procedimientos
 * para la afiliacion.
 */
angular.module('GenesisApp')
   .service('afiliacionHttp', function ($http, $q, cfpLoadingBar) {
      return ({
         obtenerViaPrincipal: function () {
            var request = $http({
               method: 'get',
               url: "json/viaprincipal.json"
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerLetra: function () {
            var request = $http({
               method: 'get',
               url: "json/letra.json"
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerDocumento: function () {
            var request = $http({
               method: 'get',
               url: "json/tipodocumento.json"
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerRegimen: function () {
            var request = $http({
               method: 'get',
               url: "json/regimen.json"
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerSexo: function () {
            var request = $http({
               method: 'get',
               url: "json/sexo.json"
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerEtnia: function () {
            var request = $http({
               method: 'get',
               url: "json/etnia.json"
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerEstado: function () {
            var request = $http({
               method: 'get',
               url: "json/estado.json"
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerTipoAfiliado: function () {
            var request = $http({
               method: 'get',
               url: "json/tipoafiliado.json"
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerDiscapacidad: function () {
            var request = $http({
               method: 'get',
               url: "json/discapacidad.json"
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerCondicion: function () {
            var request = $http({
               method: 'get',
               url: "json/condicion.json"
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerNumero: function () {
            var request = $http({
               method: 'get',
               url: "json/numero.json"
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerCuadrante: function () {
            var request = $http({
               method: 'get',
               url: "json/cuadrante.json"
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerZona: function () {
            var request = $http({
               method: 'get',
               url: "json/zona.json"
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerGrupoPoblacional: function () {
            var request = $http({
               method: 'get',
               url: $PATH + '/api/lists',
               params: { type: 'gpoblacion' }
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerTramite: function () {
            var request = $http({
               method: 'get',
               url: "json/tramite.json"
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerEntidad: function () {
            var request = $http({
               method: 'get',
               url: $PATH + '/api/lists',
               params: { type: 'Eps' }
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerParentesco: function () {
            var request = $http({
               method: 'get',
               url: "json/parentescos.json"
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerPerfil: function () {
            var request = $http({
               method: 'get',
               url: $PATH + '/api/lists',
               params: { type: 'navbar' }
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerAnexo: function () {
            var request = $http({
               method: 'get',
               url: $PATH + '/api/lists',
               params: { type: 'anexo' }
            });
            return (request.then(handleSuccess, handleError));
         },
         obtenerMunicipio: function () {
            var request = $http({
               method: 'get',
               url: $PATH + '/api/lists',
               params: { type: 'Cities' }
            });
            return (request.then(handleSuccess, handleError));
         },
         validarExisteAfiliado: function (parameters) {
            var request = $.ajax({
               method: 'POST',
               url: $PATH + "/api/ValidaAfiliado",
               data: parameters
            });
            return (request.then(handleSuccessPost, handleError));
         },
         obtenerEscenario: function (parameters) {
            var request = $.ajax({
               method: 'POST',
               url: $PATH + "/api/Escenario",
               data: parameters
            });
            return (request.then(handleSuccessPost, handleError));
         },
         getToken: (regimen) => {
            var nit = "890102044";
            return new Promise((resolve, reject) => {
               const idToken = regimen === "C" ? "F1074210-3904-4BBB-A264-03176735C0B5" : "92B0D535-18BB-411D-A8A4-5297F67A3F70";

               const request = $http({
                  method: 'GET',
                  url: "php/afiliacionlinea/peticion.php",
                  params: {
                     op: 'obtenerToken',
                     Token: idToken,
                     Nit: nit
                  }
               });

               request.then((response) => {
                  resolve(response.data);
               }, (error) => {
                  reject(error);
               });
            });
         },

         
     obtener_pornumero: function (regimen_no, numero_presc) {
        var nit = "890102044";
        return new Promise((resolve, reject) => {
           this.getToken(regimen_no).then((token) => {
              const request = $http({
                 method: 'GET',
                 url: "php/afiliacionlinea/peticion.php",
                 params: {
                    op: 'obtener_por_no',
                    Numero: numero_presc,
                    Token: token,
                    Nit: nit
                 }
              });
              request.then(response => {
                 resolve(response.data);
              }, error => {
                 reject(error);
              });
           });
        });
     },
     
         
  consulta_tutela: function (numero_presc,regimen_no) {
      var nit = "890102044";
      return new Promise((resolve, reject) => {
         this.getToken(regimen_no).then((token) => {
            const request = $http({
               method: 'POST',
               url: "php/recobro/mipres.php",  
               data: {
                  function: 'get_tutelas_no',
                  'dato':   numero_presc,
                  'regimen': regimen_no
                }
            });
            request.then(response => {
               resolve(response.data);
            }, error => {
               reject(error);
            });
         });
      });
   },
      Afiliado: function (tipo_documento, documento, cbf_tipo_documento, cbf_documento, cbf_tipo, primer_nombre, segundo_nombre,
            primer_apellido, segundo_apellido, nacimiento, dia, mes, ano, sexo, regimen, etnia, discapacidad,
            condicion, nivelsisben, puntajesisben, fichasisben, gpoblacional, direccion, telefono, celular, correo, municipio, zona, localidad, ips, type,
            tipo_documento_bdua, documento_bdua, primer_nombre_bdua, segundo_nombre_bdua,
            primer_apellido_bdua, segundo_apellido_bdua, nacimiento_bdua, dia_bdua, mes_bdua, ano_bdua, sexo_bdua, parentesco, usu, acc) {

            var Afiliado = {
               tipo_documento: tipo_documento,
               documento: documento,
               cbf_tipo_documento: cbf_tipo_documento,
               cbf_documento: cbf_documento,
               cbf_tipo: cbf_tipo,
               primer_nombre: primer_nombre,
               segundo_nombre: segundo_nombre,
               primer_apellido: primer_apellido,
               segundo_apellido: segundo_apellido,
               nacimiento: nacimiento,
               dia: dia,
               mes: mes,
               ano: ano,
               sexo: sexo,
               regimen: regimen,
               etnia: etnia,
               discapacidad: discapacidad,
               condicion: condicion,
               nivelsisben: nivelsisben,
               puntajesisben: puntajesisben,
               fichasisben: fichasisben,
               gpoblacional: gpoblacional,
               direccion: direccion,
               telefono: telefono,
               celular: celular,
               correo: correo,
               municipio: municipio,
               zona: zona,
               localidad: localidad,
               ips: ips,
               type: type,
               tipo_documento_bdua: tipo_documento_bdua,
               documento_bdua: documento_bdua,
               primer_nombre_bdua: primer_nombre_bdua,
               segundo_nombre_bdua: segundo_nombre_bdua,
               primer_apellido_bdua: primer_apellido_bdua,
               segundo_apellido_bdua: segundo_apellido_bdua,
               nacimiento_bdua: nacimiento_bdua,
               dia_bdua: dia_bdua,
               mes_bdua: mes_bdua,
               ano_bdua: ano_bdua,
               sexo_bdua: sexo_bdua,
               parentesco: parentesco,
               usu: usu,
               acc: acc
            }
            var request = $.ajax({
               method: 'POST',
               url: $PATH + "/api/Afiliado",
               data: Afiliado
            });
            return (request.then(handleSuccessPost, handleError));
         }, insertarDATOSFOSYGA: function (identificador, tipo_documento_bdua, documento_bdua, primer_nombre_bdua,
            segundo_nombre_bdua, primer_apellido_bdua, segundo_apellido_bdua, nacimiento, dia, mes, ano,
            depto, estado_bdua, entidad, regimen, cbf_tipo, municipio, fechaafiliacion, dia_af, mes_af, ano_af) {

            var Fosyga = {
               identificador: identificador,
               tipo_documento_bdua: tipo_documento_bdua,
               documento_bdua: documento_bdua,
               primer_nombre_bdua: primer_nombre_bdua,
               segundo_nombre_bdua: segundo_nombre_bdua,
               primer_apellido_bdua: primer_apellido_bdua,
               segundo_apellido_bdua: segundo_apellido_bdua,
               nacimiento: nacimiento,
               dia: dia,
               mes: mes,
               ano: ano,
               depto: depto,
               estado_bdua: estado_bdua,
               entidad: entidad,
               regimen: regimen,
               cbf_tipo: cbf_tipo,
               municipio: municipio,
               fechaafiliacion: fechaafiliacion,
               dia_af: dia_af,
               mes_af: mes_af,
               ano_af: ano_af
            }
            var request = $.ajax({
               method: 'POST',
               url: $PATH + "/api/Fosyga",
               data: Fosyga
            });
            return (request.then(handleSuccessPost, handleError));
         },
         showBeneficiario: function (tipo_documento, documento) {
            var loadFile = {
               tipo_documento: tipo_documento,
               documento: documento
            }
            var request = $.ajax({
               method: 'POST',
               url: $PATH + "/api/Beneficiario",
               data: loadFile
            });
            return (request.then(handleSuccessPost, handleError));
         },
         loadFile: function (tipo_documento, documento, tipodeadjunto, ruta) {
            var loadFile = {
               tipo_documento: tipo_documento,
               documento: documento,
               tipodeadjunto: tipodeadjunto,
               ruta: ruta
            }
            var request = $.ajax({
               method: 'POST',
               url: $PATH + "/api/Load",
               data: loadFile
            });
            return (request.then(handleSuccessPost, handleError));
         },
         obtenerFuar: function (tipo_documento, documento) {
            var loadFile = {
               tipo_documento: tipo_documento,
               documento: documento
            }
            var request = $.ajax({
               method: 'POST',
               url: $PATH + "/api/Fuardatos",
               data: loadFile
            });
            return (request.then(handleSuccessPost, handleError));
         },
         isAttach: function (tipo_documento, documento) {
            var loadFile = {
               tipo_documento: tipo_documento,
               documento: documento
            }
            var request = $.ajax({
               method: 'POST',
               url: $PATH + "/api/IsLoad",
               data: loadFile
            });
            return (request.then(handleSuccessPost, handleError));
         },
         reporteCenso: function (mes, ano) {
            var loadFile = {
               mes: mes,
               ano: ano
            }
            var request = $.ajax({
               method: 'POST',
               url: $PATH + "/api/Censo",
               data: loadFile
            });
            return (request.then(handleSuccessPost, handleError));
         },
         serviceFDC: function (tipo_documento, documento, tipo) {
            //var vToken = "bc49366c8f8e02a8aead073c5c922a2a";
            var vToken = "E17D7A08-B45D-45EE-9467-EED530460800";
            var request = $http({
               method: 'POST',
               url: "php/afiliacionlinea/peticion.php",
               params: { op: tipo, Token: vToken, TipoDoc: tipo_documento, NumDoc: documento }
            });
            return (request.then(handleSuccessPost, handleError));
         },
         serviceMIPRES: function (tipo, prescripcion, regimen) {
            if (regimen == 'C') {
               var vToken = "F1074210-3904-4BBB-A264-03176735C0B5";  //C
            }
            else {
               var vToken = "92B0D535-18BB-411D-A8A4-5297F67A3F70";  //S
            }

            var nit = "890102044"
            var request = $http({
               method: 'POST',
               url: "php/afiliacionlinea/peticion.php",
               params: { op: tipo, Token: vToken, Nit: nit, NumPre: prescripcion }
            });
            return (request.then(handleSuccessPost, handleError));
         },
         auteMIPRES: function (prescripcion) {
            var request = $http({
               method: 'POST',
               url: "php/recobro/mostraraut.php",
               params: { codigopre: prescripcion }
            });
            return (request.then(handleSuccessPost, handleError));
         },
         showAttach: function (tipo_documento, documento) {
            var loadFile = {
               tipo_documento: tipo_documento,
               documento: documento
            }
            var request = $.ajax({
               method: 'POST',
               url: $PATH + "/api/Adjunto",
               data: loadFile
            });
            return (request.then(handleSuccessPost, handleError));
         },
         obtener_pornumero: function (regimen_no, numero_presc) {
            var nit = "890102044";
            return new Promise((resolve, reject) => {
               this.getToken(regimen_no).then((token) => {
                  const request = $http({
                     method: 'GET',
                     url: "php/afiliacionlinea/peticion.php",
                     params: {
                        op: 'obtener_por_no',
                        Numero: numero_presc,
                        Token: token,
                        url: true,
                        Nit: nit
                     }
                  });
                  request.then(response => {
                     resolve(response.data);
                  }, error => {
                     reject(error);
                  });
               });
            });
         }
      });

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
            return ($q.reject(error.responseJSON.ExceptionMessage));
         }
      }
   });
