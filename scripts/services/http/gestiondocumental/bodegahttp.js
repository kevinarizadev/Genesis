'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:bodegaHttpHttp
 * @description
 * # servicio http para el llamado al web services con todos los procedimientos
 * para la gestion documental.
 */
 angular.module('GenesisApp')
 .service('bodegaHttp', function ($http,$q,cfpLoadingBar) {
    return ({
        insertarBodega: function(nombre_bodega,descripcion_bodega,estado_bodega){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/insertarbodega.php",
                params: {nombre_bodega:nombre_bodega, 
                         descripcion_bodega: descripcion_bodega,
                         estado_bodega:estado_bodega}
            });
               return (request.then(handleSuccess,handleError));
        },
        mostrarBodega: function(){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/mostrarbodega.php"
            });
               return (request.then(handleSuccess,handleError));
        },
         adminCantidad: function(){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/admincantidad.php"
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
