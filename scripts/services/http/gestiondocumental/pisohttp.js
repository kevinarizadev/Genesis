'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:pisoHttp
 * @description
 * # servicio http para el llamado al web services con todos los procedimientos
 * para la gestion documental.
 */
 angular.module('GenesisApp')
 .service('pisoHttp', function ($http,$q,cfpLoadingBar) {
    return ({
        insertarPiso: function(codigo_bodega,codigo_pasillo,nombre_piso,descripcion_piso,estado_piso){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/insertarpiso.php",
                params: {codigo_bodega:codigo_bodega,
                         codigo_pasillo: codigo_pasillo,
                         nombre_piso:nombre_piso, 
                         descripcion_piso: descripcion_piso,
                         estado_piso:estado_piso}
            });
               return (request.then(handleSuccess,handleError));
        },
        mostrarPiso: function(codigo_bodega,codigo_pasillo){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/mostrarpiso.php",
                 params: {codigo_bodega:codigo_bodega,
                         codigo_pasillo: codigo_pasillo}
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
