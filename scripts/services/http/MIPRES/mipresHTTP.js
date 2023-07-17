'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:mipresHTTP
 * @description
 * # servicio http para el llamado al web services con todos los ENDPOINTS de la API REST de MIPRES.
 */
angular.module('GenesisApp')
   .service('mipresHTTP', function ($http, $q, cfpLoadingBar) {
      const nit = "890102044";

      return ({

         getToken: (regimen) => {
            return new Promise((resolve, reject) => {
              // const idToken = regimen === "C" ? "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18" : "66F0B346-F8D0-4BA7-8182-B1722C9B68A7";
               //  const idToken = regimen ===  "C" ? "6C96F59B-8556-4451-A02B-A1D4BD4DCD45" : "361067B8-9AAF-436C-8C0D-3A19A8D63449";
                const idToken = regimen ===  "C" ? "F1074210-3904-4BBB-A264-03176735C0B5" : "92B0D535-18BB-411D-A8A4-5297F67A3F70";
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


         tokenEnc: function (regimen) {
            //var tokenEncriptado = regimen === "C" ? "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18" : "66F0B346-F8D0-4BA7-8182-B1722C9B68A7";
            //   var tokenEncriptado = regimen ===  "C" ? "6C96F59B-8556-4451-A02B-A1D4BD4DCD45" : "361067B8-9AAF-436C-8C0D-3A19A8D63449";
            var tokenEncriptado = regimen ===  "C" ? "F1074210-3904-4BBB-A264-03176735C0B5" : "92B0D535-18BB-411D-A8A4-5297F67A3F70";
            return tokenEncriptado;
         },

         putnodireccionamiento: function name (regimen_no , data) {
            return new Promise((resolve, reject) => {
               this.getToken(regimen_no).then((token) => {
                  const request = $http({
                     method: 'GET',
                     url: "php/afiliacionlinea/peticion.php",
                     params: {
                        op: 'putnodireccionamiento',
                        Nit: nit,
                        Token: token,
                        Data: data
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

         putsuministro: function (regimen_no , data) {
            // var nit = "890102044";
            return new Promise((resolve, reject) => {
               this.getToken(regimen_no).then((token) => {
                  const request = $http({
                     method: 'GET',
                     // url:"json/tic/test.json",
                     url: "php/afiliacionlinea/peticion.php",
                     params: {
                        op: 'putsuministro',
                        Nit: nit,
                        Token: token,
                        Data: data
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

         //consultarpresxfecha
         consultarpresxfecha: function (fecha_i,fecha_f, regimen) {
            // var nit = "890102044"  ;
            return new Promise((resolve, reject) => {

               const request = $http({
                  method: 'GET',
                  url: "php/afiliacionlinea/peticion.php",
                  // url: "json/pres.json",
                  params: {
                     op: 'rango_fecha',
                     Token: this.tokenEnc(regimen),
                     fecha_i: fecha_i,
                     fecha_f: fecha_f,
                     tipo:'P',
                     Nit: 890102044
                  }
               });
               request.then(response => {
                  resolve(response.data);
               }, error => {
                  reject(error);
               });

            });
         },

         obtenerToken: function (regimen) {
            // var nit = "890102044";
            // if (regimen == 'C') {
            //    var vToken = "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18";  //C
            // }
            // else {
            //    var vToken = "";  //S
            // }
            var request = $http({
               method: 'GET',
               url: "php/afiliacionlinea/peticion.php",
               params: {
                  op: 'obtenerToken',
                  Token: vToken,
                  Nit: nit
               }
            });
            return (request.then(handleSuccessPost, handleError));
         },
                 
         obtener_pornumero: function (regimen_no, numero_presc,url) {
            // var nit = "890102044";
            return new Promise((resolve, reject) => {
               this.getToken(regimen_no).then((token) => {
                  const request = $http({
                     method: 'GET',
                     url: "php/afiliacionlinea/peticion.php",
                     // url: "json/recobro/consulta_suministro_fecha.json",
                     params: {
                        op: 'obtener_por_no',
                        Numero: numero_presc,
                        Token: token,
                        url:url,
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

         buscar_pres_x_doc:function(regimen,doc,tipodoc,fecha){
            return new Promise((resolve, reject) => {
               
                  const request = $http({
                     method: 'GET',
                     url: "php/afiliacionlinea/peticion.php",
                     params: {
                        op: 'buscar_pres_x_doc',
                        nit: nit,
                        token: this.tokenEnc(regimen),
                        tipodoc: tipodoc,
                        doc: doc,
                        regimen: regimen,
                        fecha: fecha
                     }
                  });
                  request.then(response => {
                     resolve(response.data);
                  }, error => {
                     reject(error);
                  });
               
            });
         },
         //buscar_pres_x_num($scope.regimen, $scope.no_pres)
         buscar_pres_x_num:function(regimen,no_pres){
            return new Promise((resolve, reject) => {
               
                  const request = $http({
                     method: 'GET',
                     url: "php/afiliacionlinea/peticion.php",
                     params: {
                        op: 'buscar_pres_x_num',
                        nit: nit,
                        token: this.tokenEnc(regimen),
                        no_pres: no_pres
                     }
                  });
                  request.then(response => {
                     resolve(response.data);
                  }, error => {
                     reject(error);
                  });
               
            });
         },

         putdireccionamiento: function (regimen_no , data) {
            // var nit = "890102044";
            return new Promise((resolve, reject) => {
               this.getToken(regimen_no).then((token) => {
                  const request = $http({
                     method: 'GET',
                     url: "php/afiliacionlinea/peticion.php",
                     params: {
                        op: 'putdireccionamiento',
                        Nit: nit,
                        Token: token,
                        Data: data
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

         obtener_prescripciones: function (regimen_no, numero_presc) {
            // var nit = "890102044"  ;
            return new Promise((resolve, reject) => {
               this.getToken(regimen_no).then((token) => {
                  const request = $http({
                     method: 'GET',
                     url: "php/afiliacionlinea/peticion.php",
                     params: {
                        op: 'obtener_presc',
                        Numero: numero_presc,
                        Token: token,
                        Fecha: $scope.Fecha
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

         obtener_porfecha: function (regimen, fecha_i, fecha_f , url) {
            // var nit = "890102044";
            return new Promise((resolve, reject) => {
               this.getToken(regimen).then((token) => {
                  const request = $http({
                     method: 'GET',
                     url: "php/afiliacionlinea/peticion.php",
                     // url: "json/recobro/direccionamientos.json",
                     params: {
                        op: 'rango_fecha',
                        fecha_i: fecha_i,
                        fecha_f: fecha_f,
                        tipo:'D',
                        Token: token,
                        Nit: nit, 
                        url: url
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

         s_detaildir: function (regimen, id_dir) {
            // var nit = "890102044";        
            return new Promise((resolve, reject) => {
               this.getToken(regimen).then((token) => {
                  var request = $http({
                     method: 'GET',
                     url: "php/afiliacionlinea/peticion.php",
                     params: {
                        op: 'p_detalledir',
                        Nit: nit,
                        Token: token,
                        direccionamiento: id_dir
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
