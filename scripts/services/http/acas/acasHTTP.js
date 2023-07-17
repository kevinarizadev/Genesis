'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:calificacionHttp
 * @description
 * # servicio http  para la calificacion de los acas
 */
 angular.module('GenesisApp')
 .service('acasHttp', function ($http,$q,cfpLoadingBar) {
    return ({
         obtenerArea: function(){
          var request = $http({
            method:'get',
            url:"php/acas/mostrararea.php"//,
            //params: {identificacion:identificacion}
         });
            return (request.then(handleSuccessPost,handleError));
        },
        obtenerConcepto: function(area){
          var request = $http({
            method:'get',
            url:"php/acas/mostrarconcepto.php",
            params: {area:area}
         });
            return (request.then(handleSuccessPost,handleError));
        },
         mostrarUsuario: function(nombre){
          var request = $http({
            method:'get',
            url:"php/acas/mostrarusuario.php",
            params: {nombre:nombre}
         });
            return (request.then(handleSuccessPost,handleError));
        },
        obtenerMotivo: function(documento,concepto){
          var request = $http({
            method:'get',
            url:"php/acas/mostrarmotivo.php",
            params: {documento:documento, concepto:concepto}
         });
            return (request.then(handleSuccessPost,handleError));
        },
        obtenerAsunto: function(documento,concepto, motivo){
          var request = $http({
            method:'get',
            url:"php/acas/mostrarasunto.php",
            params: {documento:documento, concepto:concepto,motivo:motivo}
         });
            return (request.then(handleSuccessPost,handleError));
        },
        obtenerPrioridad: function(documento,concepto, motivo,asunto){
          var request = $http({
            method:'get',
            url:"php/acas/mostrarprioridad.php",
            params: {documento:documento, concepto:concepto,motivo:motivo,asunto:asunto}
         });
            return (request.then(handleSuccessPost,handleError));
        },
        obtenerPrestador: function(ubicacion){
          var request = $http({
            method:'get',
            url:"php/acas/mostrarprestador.php",
            params: {ubicacion:ubicacion}
         });
            return (request.then(handleSuccessPost,handleError));
        },
        actualizarInformacionCOCE: function(documento,contacto,correo){
          var request = $http({
            method:'get',
            url:"php/acas/actualizarInformacionCOCE.php",
            params: {documento:documento,contacto:contacto,correo:correo}
         });
            return (request.then(handleSuccessPost,handleError));
        },
        obtenerInformacionCOCE: function(documento){
          var request = $http({
            method:'get',
            url:"php/acas/obtenerInformacioncoce.php",
            params: {documento:documento}
         });
            return (request.then(handleSuccessPost,handleError));
        },
         obtenercorreo: function(codigo){
          var request = $http({
            method:'get',
            url:"php/acas/mostrarcorreoips.php",
            params: {codigo:codigo}
         });
            return (request.then(handleSuccessPost,handleError));
        },
        insertarAcas: function(documento,ubicacion,concepto,motivo,ruta,observacion,emisor,asunto,priori,barrio,tipo_doc_apor,doc_aportante){
         var request = $http({
          method:'get',
          url:"php/acas/insertaracas.php",
          params: {documento:documento,ubicacion:ubicacion,concepto:concepto,motivo:motivo,ruta:ruta,
                   observacion:observacion,emisor:emisor,asunto:asunto,priori:priori,barrio:barrio,tipo_doc_apor:tipo_doc_apor,doc_aportante:doc_aportante}
          });
         return (request.then(handleSuccessPost,handleError));
      },
        tranferirTercero: function(documento,numero,ubicacion,cedula){
           var request = $http({
            method:'get',
            url:"php/acas/tranferirtercero.php",
            params: {documento:documento,numero:numero,ubicacion:ubicacion,cedula:cedula}
            });
           return (request.then(handleSuccessPost,handleError));
        },
        actualizarcorreoips: function(codigo,email){
           var request = $http({
            method:'get',
            url:"php/acas/actualizarcorreoips.php",
            params: {codigo:codigo,email:email}
            });
           return (request.then(handleSuccessPost,handleError));
        },
         obtenerBarrios: function(){
           var request = $http({
            method:'get',
            url:"php/acas/mostrarbarrios.php"
            });
           return (request.then(handleSuccessPost,handleError));
        },
        mostrarcomentarios: function(documento, numero, ubicacion, codigo_concepto) {
         var request = $http({
             method: 'get',
             url: "php/acas/mostrarcomentario.php",
             params: { documento: documento, numero: numero, ubicacion: ubicacion, codigo_concepto: codigo_concepto }
         });
         return (request.then(handleSuccessPost, handleError));
     },
        obtenerlistaacas: function(tipo,documento){
           var request = $http({
            method:'get',
            url:"php/acas/misacas.php",
            params: {documento:documento,tipo:tipo}
            });
           return (request.then(handleSuccessPost,handleError));
        },
        insertarcomentario: function(documento,numero,ubicacion,tipo,cedula,observacion,ruta,cierre,estado_res){
         var request = $http({
          method:'get',
          url:"php/acas/insertarcomentario.php",
          params: {documento:documento,numero:numero,ubicacion:ubicacion,tipo:tipo,cedula:cedula,observacion:observacion,ruta:ruta,cierre:cierre,estado_res:estado_res}
          });
         return (request.then(handleSuccessPost,handleError));
      },
         enviarcorreoips: function(envia,destino,asunto,formato,numeroacas){
           var request = $http({
            method:'get',
            url:"php/acas/enviarcorreoips.php",
            params: {envia:envia,destino:destino,asunto:asunto,formato:formato,numeroacas}
            });
           return (request.then(handleSuccessPost,handleError));
        },
         cerraracas: function(documento,numero,ubicacion){
           var request = $http({
            method:'get',
            url:"php/acas/cerraracas.php",
            params: {documento:documento,numero:numero,ubicacion:ubicacion}
            });
           return (request.then(handleSuccessPost,handleError));
        },
        obtenerCalificacion: function(documento){
           var request = $http({
            method:'get',
            url:"php/acas/obteneracascalificacion.php",
            params: {documento:documento}
            });
           return (request.then(handleSuccessPost,handleError));
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
