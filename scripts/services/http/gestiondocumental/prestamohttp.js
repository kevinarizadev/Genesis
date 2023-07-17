'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:cajaHttp
 * @description
 * # servicio http para el llamado al web services con todos los procedimientos
 * para la gestion documental.
 */
 angular.module('GenesisApp')
 .service('prestamoHttp', function ($http,$q,cfpLoadingBar) {
    return ({
       mostrarCantidad: function(identificacion){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/mostrarcantidad.php",
                params: {identificacion:identificacion}
            });
               return (request.then(handleSuccess,handleError));
        },
        reportenitfactura: function(nit,factura){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/reportenitfactura.php",
                params: {nit:nit,factura:factura}
            });
               return (request.then(handleSuccess,handleError));
        },
        insertarPrestamo: function(tipo_identificacion,identificacion,codigo_rango,codigo_area, tipo_objeto,codigo_prioridad,descripcion){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/insertarprestamo.php",
                params: {tipo_identificacion:tipo_identificacion,
                    identificacion:identificacion,
                    codigo_rango:codigo_rango,
                    codigo_area:codigo_area,
                    tipo_objeto:tipo_objeto,
                    codigo_prioridad:codigo_prioridad,
                    descripcion:descripcion}
            });
               return (request.then(handleSuccess,handleError));
        },
         mostrarPrioridad: function(identificacion){
               var request = $http({    
                method:'get',
                url:"php/gestiondocumental/mostrarprioridad.php",
                params: {identificacion:identificacion}
            });
               return (request.then(handleSuccess,handleError));
        },
         mostrarmisPrestamos: function(identificacion){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/mostrarmispermisos.php",
                params: {identificacion:identificacion}
            });
               return (request.then(handleSuccess,handleError)); 
        },
         mostrarSolicitud: function(){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/mostrarsolicitud.php"
            });
               return (request.then(handleSuccess,handleError)); 
        },
         respuestasolicitud: function(codigo_prestamo,respuesta,descripcion){
               var request = $http({
                method:'get',
                url:"php/gestiondocumental/respuestasolicitud.php",
                params: {codigo_prestamo:codigo_prestamo,
                         respuesta:respuesta,
                         descripcion:descripcion}
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
