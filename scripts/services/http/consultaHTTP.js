'use strict';
angular.module('GenesisApp')
.service('consultaHTTP', 
   function ($http,$q,cfpLoadingBar) {
   return ({
      obtenerCupsDB: function(){
         var request = $http({
            method:'get',
            url:"php/salud/obtenercups.php"
         });
        return (request.then(handleSuccess,handleError));
      },
      obtenerHomologacion: function(){
          var request = $http({
           method:'get',
           url:"json/homologos.json"
           });
          return (request.then(handleSuccess,handleError));
       },
      obtenerNucleo: function(on,tipo,numero){
         var request = $http({
            method:'get',
            url:"php/consultaafiliados/obtenernucleo.php",
            params: {ori: on ,type: tipo, id: numero}
         });
        return (request.then(handleSuccess,handleError));
      },
      obtenerEscenarios: function(oe,tipo,numero){
         var request = $http({
            method:'get',
            url:"php/consultaafiliados/obtenerescenario.php",
            params: {ori: oe ,type: tipo, id: numero}
         });
        return (request.then(handleSuccess,handleError));
      },
      obtenerDocumento: function(){
         var request = $http({
         method:'get',
         url:"json/tipodocumento.json"
         });
        return (request.then(handleSuccess,handleError));
      },
      obtenerTipoDocumento: function(){
         var request = $http({
         method:'get',
         url:"json/tipodocumento2.json"
         });
        return (request.then(handleSuccess,handleError));
      },
      obtenerAnexos: function(tipo,numero){
         var request = $http({
         method:'get',
         url:"php/consultaafiliados/obtenersoporte.php",
         params:{type: tipo, id: numero}
         });
        return (request.then(handleSuccess,handleError));
      },
      obtenerTipodocumental: function(tipo,numero){
         var request = $http({
            method:'get',
            url:"php/consultaafiliados/obtenertipodocumental.php"
         });
        return (request.then(handleSuccess,handleError));
      },
      validaDirnovedad : function(type,id){
         var request = $http({
            method:'get',
            url:"php/consultaafiliados/validadirnovedad.php",
            params: {type:type,id:id}
         });
        return (request.then(handleSuccess,handleError));
      },
      actualizaAfidatos: function(tipop,numerop,novedadp,direccionp,localidadp,telefonop,celularp,celular2p,correop){
         if (novedadp == "DIR") {
            var request = $http({
               method:'get',
               url:"php/consultaafiliados/actualizaafidatos.php",
               params: { ori: 'DIR' 
                        ,type: tipop
                        ,id: numerop
                        ,direccion:direccionp
                        ,localidad:localidadp
                        ,telefono:telefonop
                        ,celular:celularp
                        ,celular2:celular2p
                        ,correo:correop
                     }
            });
           return (request.then(handleSuccess,handleError));
         }
      },
      obtenerCarnet: function(tipo,numero){
         var request = $http({
            method:'get',
            url:"php/consultaafiliados/soportes/obtenercarnet.php",
            params: {tipo:type,numero:id}
         });
        return (request.then(handleSuccess,handleError));
      },
      verificaUsuario: function(tipo,numero){
         var request = $http({
            method:'get',
            url:"php/consultaafiliados/verificaUsuario.php",
            params: {type:tipo,id:numero}
         });
        return (request.then(handleSuccess,handleError));
      },
      enviaEncuesta: function(tipo,numero,renglon,desc,res){
         var request = $http({
            method:'get',
            url:"php/consultaafiliados/guardaencuesta.php",
            params: {tipo:tipo,numero:numero,renglon:renglon,desc:desc,res:res}
         });
        return (request.then(handleSuccess,handleError));
      },
      enviaEncuestaEnc: function(tipo,numero,rec){
         var request = $http({
            method:'get',
            url:"php/consultaafiliados/guardaencuestaenc.php",
            params: {tipo:tipo,numero:numero,rec:rec}
         });
        return (request.then(handleSuccess,handleError));
      }
   });
   function handleSuccessPost (response){
       return(response); 
   }
   function handleSuccess (response){
      return(response.data);
   }
   function handleError (error){
      if (error ==null){
         return($q.reject(error));
      }else if (error.errorMessage!== undefined){
         return ($q.reject(error.errorMessage));
      }else {
         return($q.reject(error.responseJSON.ExceptionMessage));
      }
   }
});
