'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:pasilloHttp
 * @description
 * # servicio http para el llamado al web services con todos los procedimientos
 * para la gestion documental.
 */
 angular.module('GenesisApp')
 .service('pasilloHttp', function ($http,$q,cfpLoadingBar) {
    return ({
        insertarPasillo: function(codigo_bodega,nombre_pasillo,descripcion_pasillo,estado_pasillo){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/insertarpasillo.php",
                params: {codigo_bodega:codigo_bodega,
                         nombre_pasillo:nombre_pasillo, 
                         descripcion_pasillo: descripcion_pasillo,
                         estado_pasillo:estado_pasillo}
            });
               return (request.then(handleSuccess,handleError));
        },
        mostrarPasillo: function(codigo_bodega){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/mostrarpasillo.php",
                params: {codigo_bodega:codigo_bodega}
            });
               return (request.then(handleSuccess,handleError));
        }
    });
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
