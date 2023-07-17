'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:afiliacionHttp
 * @description
 * # servicio http para el llamado al web services con todos los procedimientos
 * para la afiliacion.
 */
 angular.module('GenesisApp')
 .service('censoHttp', function ($http,$q,cfpLoadingBar) {
    return ({
        obtenerViaPrincipal: function(){
           var request = $http({
            method:'get',
            url:"json/viaprincipal.json"
            });
           return (request.then(handleSuccess,handleError));
        },
        obtenercamposautorizacion: function(autorizacion){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obtenercamposautorizacion',autorizacion:autorizacion}
         });
           return (request.then(handleSuccessPost,handleError));
        },
        obtenerTipoEstancia: function(){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obtenerTipoEstancia'}
         });
           return (request.then(handleSuccessPost,handleError));
        },
        obtenerlistaCenso: function(ubicacion){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obtenerListaCenso',ubicacion:ubicacion}
         });
           return (request.then(handleSuccessPost,handleError));
        },
        obtenerHospitalizacion: function(){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obtenerHospitalizacion'}
         });
           return (request.then(handleSuccessPost,handleError));
        },
        obtenercensos: function (documento) {
        var request = $http({
          method: 'POST',
          url: "php/censo/censo.php",
          data: { function:'buscarcenso',documento:documento, ubicacion:'8001'}
        });
          return (request.then(handleSuccess, handleError));
        }, 
        detailcensos: function (censo,ubicacion) {
        var request = $http({
          method: 'POST',
          url: "php/censo/censo.php",
          data: { function:'detallecenso',censo:censo, ubicacion: ubicacion}});
        return (request.then(handleSuccess, handleError));
        },
        obtenercampospordocumento: function(tipo,documeno){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obtenercampospordocumento',tipo:tipo,documeno:documeno}
         });
           return (request.then(handleSuccessPost,handleError));
        },
         obtenercampospordocumentotemp: function(tipo,documeno){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obtenercampospordocumentotemp',tipo:tipo,documeno:documeno}
         });
           return (request.then(handleSuccessPost,handleError));
        },
         obtenerMotivoEgreso: function(){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obtenerMotivoEgreso'}
         });
           return (request.then(handleSuccessPost,handleError));
        },
         obtenerMotivoglosa: function(){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obtenerMotivoglosa'}
         });
           return (request.then(handleSuccessPost,handleError));
        },
        obtenerEventosadv: function(){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obtenerEventosadv'}
         });
           return (request.then(handleSuccessPost,handleError));
        },
        obtenerEventosadvdeta: function(detalle){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obtenerEventosadvdeta',detalle:detalle}
         });
           return (request.then(handleSuccessPost,handleError));
        },
         obtenerautdeta: function(autorizacion){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obtenerautdeta',autorizacion:autorizacion}
         });
           return (request.then(handleSuccessPost,handleError));
        },
        obteneraut: function(tipo_doc,documento,fechaingreso,fechaegreso){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obteneraut',tipo_doc:tipo_doc,documento:documento,fechaingreso:fechaingreso,fechaegreso:fechaegreso}
         });
           return (request.then(handleSuccessPost,handleError));
        },
        obtenerEvolucionPaciente: function(ubicacion,numerocenso){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obtenerEvolucionPaciente',ubicacion:ubicacion,numerocenso:numerocenso}
         });
           return (request.then(handleSuccessPost,handleError));
        },
         obtenerFichaPaciente: function(ubicacion,numerocenso){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obtenerFichaPaciente',ubicacion:ubicacion,numerocenso:numerocenso}
         });
           return (request.then(handleSuccessPost,handleError));
        },
         CrearCenso: function(ubicacion,oficina,tipo_doc,
                              documento,regimen,numero_au,municipio,
                              ips,testancia,cedula,
                              fecha_ingreso,eshijode,esnacido,
                              cantidadhijo,diagnostico,diagnosticoA){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'CrearCenso',ubicacion:ubicacion,oficina:oficina,tipo_doc:tipo_doc,
                                                   documento:documento,regimen:regimen,numero_au:numero_au,municipio:municipio,
                                                   ips:ips,testancia:testancia,cedula:cedula,
                                                   fecha_ingreso:fecha_ingreso,eshijode:eshijode,esnacido:esnacido,
                                                   cantidadhijo:cantidadhijo,diagnostico:diagnostico,diagnosticoA:diagnosticoA}
         });
           return (request.then(handleSuccessPost,handleError));
        },
        insertarChat: function(proceso,numerocenso,ubicacion,respuesta){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'insertarChat',proceso:proceso,numerocenso:numerocenso,ubicacion:ubicacion,respuesta:respuesta}
         });
           return (request.then(handleSuccessPost,handleError));
        }, 
        obtenerChat: function(proceso,numerocenso,ubicacion){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obtenerChat',proceso:proceso,numerocenso:numerocenso,ubicacion:ubicacion}
         });
           return (request.then(handleSuccessPost,handleError));
        },
        obtenerChatNuevo: function(proceso,numerocenso,ubicacion){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obtenerChatNuevo',proceso:proceso,numerocenso:numerocenso,ubicacion:ubicacion}
         });
           return (request.then(handleSuccessPost,handleError));
        },
         obtenerChatdisponibles: function(){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obtenerChatdisponibles'}
         });
           return (request.then(handleSuccessPost,handleError));
        },
        regafiliado: function(tipo_documento,documento,primer_nombre,
                              segundo_nombre,primero_apellido,segundo_apellido,
                            genero,departamento,municipio,fecha_nacimiento,
                            telefono,celular,correo,direccion,proceso){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'regafiliado',tipo_documento:tipo_documento,documento:documento,primer_nombre:primer_nombre,
                                         segundo_nombre:segundo_nombre,primero_apellido:primero_apellido,segundo_apellido:segundo_apellido,
                                         genero:genero,departamento:departamento,municipio:municipio,fecha_nacimiento:fecha_nacimiento,
                                         telefono:telefono,celular:celular,correo:correo,direccion:direccion,proceso:proceso}
         });
           return (request.then(handleSuccessPost,handleError));
        },
         obtenerEvolucionDetalleHospitalizacion: function(renglon,ubicacion,numerocenso){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'obtenerEvolucionDetalleHospitalizacion',renglon:renglon,ubicacion:ubicacion,numerocenso:numerocenso}
         });
           return (request.then(handleSuccessPost,handleError));
        },
         reversarglosa: function(renglon,ubicacion,numerocenso,observacion,valor){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'reversarglosa',ubicacion:ubicacion,numerocenso:numerocenso,renglon:renglon,observacion:observacion,valor:valor}
         });
           return (request.then(handleSuccessPost,handleError));
        },
        insertarEvolucion: function(numerocenso,ubicacion,hospitalizacion,
                                    diagnostico,valobjecion,Descripcionevo,
                                    valoradverso,eventoadv,eventoadvdeta,
                                    responsable,valorglosa,Descripcionobjecion,
                                    valorrevglosa,motivoglosa,cierre,fechacierre,motivo_egreso){
          var request = $http({
            method:'POST',
            url:"php/censo/censo.php",
            data: {function:'insertarEvolucion',numerocenso:numerocenso,ubicacion:ubicacion,hospitalizacion:hospitalizacion,
                  diagnostico:diagnostico,valobjecion:valobjecion,Descripcionevo:Descripcionevo,valoradverso:valoradverso,
                  eventoadv:eventoadv,eventoadvdeta:eventoadvdeta,
                  responsable:responsable,valorglosa:valorglosa,Descripcionobjecion:Descripcionobjecion,
                  valorrevglosa:valorrevglosa,motivoglosa:motivoglosa,cierre:cierre,fechacierre:fechacierre,motivo_egreso:motivo_egreso}
         });
           return (request.then(handleSuccessPost,handleError));
        }
    }); 

    function handleSuccessPost (response){
       return(response);
    }
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
