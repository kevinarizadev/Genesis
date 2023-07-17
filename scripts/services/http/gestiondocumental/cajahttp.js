'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:cajaHttp
 * @description
 * # servicio http para el llamado al web services con todos los procedimientos
 * para la gestion documental.
 */
 angular.module('GenesisApp')
 .service('cajaHttp', function ($http,$q,cfpLoadingBar) {
    return ({
       insertarCaja: function(nombre_caja,descripcion_caja,codigo_area,codigo_rango){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/insertarcaja.php",
                params: {nombre_caja:nombre_caja, 
                         descripcion_caja: descripcion_caja,
                         codigo_area:codigo_area,
                         codigo_rango:codigo_rango}
            });
               return (request.then(handleSuccess,handleError));
        },
        mostrarArea: function(){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/mostrararea.php"
            });
               return (request.then(handleSuccess,handleError));
        },
        mostrarCaja: function(){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/mostrararea.php"
            });
               return (request.then(handleSuccess,handleError));
        },
        mostrarDetalleCaja: function(codigo_caja){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/mostrardetallecaja.php",
                params: {codigo_caja:codigo_caja}
            });
               return (request.then(handleSuccess,handleError));
        },
        eliminarCaja: function(codigo_caja){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/eliminarcaja.php",
                params: {codigo_caja:codigo_caja}
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
