'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:pisoHttp
 * @description
 * # servicio http para el llamado al web services con todos los procedimientos
 * para la gestion documental.
 */
 angular.module('GenesisApp')
 .service('nivelHttp', function ($http,$q,cfpLoadingBar) {
    return ({
        insertarNivel: function(codigo_bodega,codigo_pasillo,codigo_piso,nombre_nivel,descripcion_nivel,estado_nivel){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/insertarnivel.php",
                params: {codigo_bodega:codigo_bodega,
                         codigo_pasillo: codigo_pasillo,
                         codigo_piso: codigo_piso,
                         nombre_nivel:nombre_nivel, 
                         descripcion_nivel: descripcion_nivel,
                         estado_nivel:estado_nivel}
            });
               return (request.then(handleSuccess,handleError));
        },
        mostrarNivel: function(codigo_bodega,codigo_pasillo,codigo_piso){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/mostrarnivel.php",
                params: {codigo_bodega:codigo_bodega,
                         codigo_pasillo: codigo_pasillo,
                         codigo_piso: codigo_piso}
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
