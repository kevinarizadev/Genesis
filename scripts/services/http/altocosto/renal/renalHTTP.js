'use strict';
/**
* @ngdoc service
* @name GenesisApp.service:afiliacionHttp
* @description
* # servicio http para el llamado al web services con todos los procedimientos
* para la afiliacion.
*/
angular.module('GenesisApp')
.service('renalHttp', function ($http,$q) {
  return ({
    BuscarAfiliado: function(tipo_documento,documento,resolucion){
      var request = $http({
        method:'get',
        url:"php/altocosto/renal/BuscarAfiliado.php",
        params: {tipo_documento:tipo_documento,documento:documento,resolucion:resolucion}
      });
      return (request.then(handleSuccess,handleError));
    },
    CalcularCostos: function(tipo_documento,documento,resolucion){
      var request = $http({
        method:'get',
        url:"php/altocosto/renal/calcularcostos.php",
        params: {tipo_documento:tipo_documento,documento:documento,resolucion:resolucion}
      });
      return (request.then(handleSuccess,handleError));
    },
    CargarDatosPaciente: function(tipo_documento,documento,resolucion){
      var request = $http({
        method:'get',
        url:"php/altocosto/renal/CargarAfiliado.php",
        params: {tipo_documento:tipo_documento,documento:documento,resolucion:resolucion}
      });
      return (request.then(handleSuccess,handleError));
    },
    InsertarDatosPacienteRenal: function(json,area){
      var request = $http({
        method:'POST',
        url:"php/altocosto/renal/insertarinformerenal.php",
        data: {json:json,area:area}
      });
      return (request.then(handleSuccess,handleError));
    },
    cargarips: function(tipo){
      var request = $http({
        method:'get',
        url:"php/altocosto/renal/cargarips.php",
        params: {tipo:tipo}
      });
      return (request.then(handleSuccess,handleError));
    },
    cargarcomodines: function(){
         var request = $http({
          method:'get',
          url:"json/altocosto/renal/comodines.json"
          });
         return (request.then(handleSuccess,handleError));
    },
    medicamento: function(coincidencia){
      var request = $http({
        method:'get',
        url:"php/altocosto/renal/medicamentos.php",
        params: {coincidencia:coincidencia}
      });
      return (request.then(handleSuccess,handleError));
    },
    ipsTODO: function(coincidencia){
      var request = $http({
        method:'get',
        url:"php/altocosto/renal/ipstodo.php",
        params: {coincidencia:coincidencia}
      });
      return (request.then(handleSuccess,handleError));
    },
    cargareps: function(coincidencia){
      var request = $http({
        method:'get',
        url:"php/altocosto/renal/cargueeps.php",
        params: {coincidencia:coincidencia}
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
