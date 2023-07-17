'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:calificacionHttp
 * @description
 * # servicio http  para la calificacion de los acas
 */
 angular.module('GenesisApp')
 .service('calificacionHttp', function ($http,$q,cfpLoadingBar) {
    return ({
         obteneracas: function(identificacion){
          var request = $http({
            method:'get',
            url:"php/calificacion/mostraracas.php",
            params: {identificacion:identificacion}
         });
            return (request.then(handleSuccessPost,handleError));
        },
        mostrarreporte: function(identificacion){
          var request = $http({
            method:'get',
            url:"php/calificacion/mostrarreporte.php",
            params: {identificacion:identificacion}
         });
            return (request.then(handleSuccessPost,handleError));
        },
        mostrarinformacion: function(numero,identificacion){
          var request = $http({
            method:'get',
            url:"php/calificacion/mostrarinformacion.php",
            params: {numero:numero,identificacion:identificacion}
         });
            return (request.then(handleSuccessPost,handleError));
        },
        insertarcalificacion: function(numero,ubicacion,identificacion,calificacion,comentario){
           var request = $http({
            method:'get',
            url:"php/calificacion/insertarpuntaje.php",
            params: {numero:numero, ubicacion:ubicacion, identificacion:identificacion, calificacion:calificacion,comentario:comentario}
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
