'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:pisoHttp
 * @description
 * # servicio http para el llamado al web services con todos los procedimientos
 * para la gestion documental.
 */
 angular.module('GenesisApp')
 .service('secuenciaHttp', function ($http,$q,cfpLoadingBar) {
    return ({
        insertarSecuencia: function(codigo_bodega,codigo_pasillo,codigo_piso,codigo_nivel,nombre_secuencia,descripcion_secuencia,estado_secuencia){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/insertarsecuencia.php",
                params: {codigo_bodega:codigo_bodega,
                         codigo_pasillo: codigo_pasillo,
                         codigo_piso: codigo_piso,
                         codigo_nivel: codigo_nivel,
                         nombre_secuencia:nombre_secuencia, 
                         descripcion_secuencia: descripcion_secuencia,
                         estado_secuencia:estado_secuencia}
            });
               return (request.then(handleSuccess,handleError));
        },
        mostrarSecuencia: function(codigo_bodega,codigo_pasillo,codigo_piso,codigo_nivel){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/mostrarsecuencia.php",
                 params: {codigo_bodega:codigo_bodega,
                         codigo_pasillo: codigo_pasillo,
                         codigo_piso: codigo_piso,
                         codigo_nivel: codigo_nivel}
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
