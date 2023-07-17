'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:cajaHttp
 * @description
 * # servicio http para el llamado al web services con todos los procedimientos
 * para la gestion documental.
 */
 angular.module('GenesisApp')
 .service('carpetaHttp', function ($http,$q,cfpLoadingBar) {
    return ({
       insertarCarpeta: function(codigo_bodega,codigo_pasillo,codigo_piso,codigo_nivel,codigo_secuencia,codigo_ubicacion,rango_caja,nombre_carpeta,descripcion_carpeta,codigo_estado){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/insertarcarpeta.php",
                params: {codigo_bodega:codigo_bodega,
                         codigo_pasillo: codigo_pasillo,
                         codigo_piso: codigo_piso,
                         codigo_nivel: codigo_nivel,
                         codigo_secuencia: codigo_secuencia,
                         codigo_ubicacion: codigo_ubicacion,
                         rango_caja: rango_caja,
                         nombre_carpeta:nombre_carpeta,
                         descripcion_carpeta: descripcion_carpeta,
                         codigo_estado:codigo_estado
                         }
            });
               return (request.then(handleSuccess,handleError));
        },
        mostrarCarpeta: function(){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/mostrarcarpeta.php"
            });
               return (request.then(handleSuccess,handleError));
        },
         mostrarDetalleCarpeta: function(codigo_caja){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/mostrardetallecarpeta.php",
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
