'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:gestiondocumentalHttp
 * @description
 * # servicio http para el llamado al web services con todos los procedimientos
 * para la gestion documental.
 */
 angular.module('GenesisApp')
 .service('gestiondocumentalHttp', function ($http,$q,cfpLoadingBar) {
    return ({
     obtenerCaja: function(codigo_bodega,codigo_pasillo,codigo_piso,codigo_nivel,codigo_secuencia){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/mostrarcaja.php",
                params: {codigo_bodega:codigo_bodega,
                         codigo_pasillo: codigo_pasillo,
                         codigo_piso: codigo_piso,
                         codigo_nivel: codigo_nivel,
                         codigo_secuencia: codigo_secuencia}
            });
           return (request.then(handleSuccess,handleError));
        },
        buscarcaja: function(codigo_area,fecha_inicio,fecha_fin,descripcion){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/buscarcaja.php",
                params: {codigo_area:codigo_area,
                         fecha_inicio: fecha_inicio,
                         fecha_fin: fecha_fin,
                         descripcion: descripcion}
            });
           return (request.then(handleSuccess,handleError));
        },
        obtenerCajasjson: function(){
           var request = $http({
            method:'get',
            url:"json/cajas.json"
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
