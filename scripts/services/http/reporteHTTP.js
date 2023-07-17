'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:reporteHttp
 * @description
 * # servicio http para el llamado al web services con todos los procedimientos
 * para los reportes.
 */
 angular.module('GenesisApp')
 .service('reporteHttp', function ($http,$q,cfpLoadingBar) {
    return ({
       obtenerurl: function(id){
         var request = $http({
            method:'get',
            url:"php/reporte/reporte.php",
            params: {id: id}
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
