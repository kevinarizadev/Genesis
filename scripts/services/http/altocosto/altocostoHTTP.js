'use strict';
/**
* @ngdoc service
* @name GenesisApp.service:afiliacionHttp
* @description
* # servicio http para el llamado al web services con todos los procedimientos
* para la afiliacion.
*/
angular.module('GenesisApp')
.service('altocostoHttp', function ($http,$q) {
  return ({

    cargarcuentas: function(){
      var request = $http({
        method:'get',
        url:"php/altocosto/cargarcuentas.php",
        params: {}
      });
      return (request.then(handleSuccess,handleError));
    },
    cargarperiodo: function(resolucion){
      var request = $http({
        method:'get',
        url:"php/altocosto/cargarperiodo.php",
        params: {resolucion:resolucion}
      });
      return (request.then(handleSuccess,handleError));
    },
    CrudPeriodo: function(resolucion,CodigoCAC,fechainicial,fechafinal,fechalimite,type){
      var request = $http({
        method:'get',
        url:"php/altocosto/crudperiodo.php",
        params: {resolucion:resolucion,CodigoCAC:CodigoCAC,fechainicial:fechainicial,fechafinal:fechafinal,fechalimite:fechalimite,type:type}
      });
      return (request.then(handleSuccess,handleError));
    },
    compararexcel: function(resolucion,jsoncac){
      var request = $http({
        method:'POST',
        url:"php/altocosto/compararexcel.php",
        data: {resolucion:resolucion,jsoncac:jsoncac}
      });
      return (request.then(handleSuccess,handleError));
    }

  })
  function handleSuccess (response){
    return(response);
  }

  function handleError (error){
    if (error ==null){
      return($q.reject(error));
    }else if (error.errorMessage!== undefined){
      return ($q.reject(error.errorMessage));
    }else {
      return($q.reject(error.ExceptionMessage));
    }
  }
});
