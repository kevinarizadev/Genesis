'use strict';
angular.module('GenesisApp')
.service('menuopcioneshttp',
    function ($http,$q,cfpLoadingBar) {
        return ({
           obtenerMenu: function(idrol){
               var request = $http({
                method:'get',
                url:"php/paneladmin/obtenerpaneladmin.php",
                params: {idempresa:1, idrol: idrol}
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