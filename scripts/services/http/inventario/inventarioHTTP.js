'use strict';
/**
* @ngdoc service
* @name GenesisApp.service:afiliacionHttp
* @description
* # servicio http para el llamado al web services con todos los procedimientos
* para la afiliacion.
*/
angular.module('GenesisApp')
.service('inventarioHttp', function ($http,$q) {
  return ({
    obtenerValoracion: function(documento,area){
      var request = $http({
        method:'get',
        url:"php/inventario/valoracion.php",
        params: {documento:documento,area:area}
      });
      return (request.then(handleSuccess,handleError));
    },
    obtenerArea: function(cedula){
      var request = $http({
        method:'get',
        url:"php/inventario/obtenerArea.php",
        params: {cedula:cedula}
      });
      return (request.then(handleSuccess,handleError));
    },
    eliminarinventario: function(empresa,documento,numero,ubicacion){
      var request = $http({
        method:'get',
        url:"php/inventario/eliminarinventario.php",
        params: {empresa:empresa,documento:documento,numero:numero,ubicacion:ubicacion}
      });
      return (request.then(handleSuccess,handleError));
    },

    insertarAperturaInventario: function(empresa,fechainicio,fechafin,estado,area,tipolistas){
      var request = $http({
        method:'get',
        url:"php/inventario/insertarAbrirInventario.php",
        params: {empresa:empresa,fechainicio:fechainicio,fechafin:fechafin,estado:estado,area:area,tipolistas:tipolistas}
      });
      return (request.then(handleSuccess,handleError));
    },
    procesarDetalleinventario: function(empresa,documento,numero,ubicacion){
      var request = $http({
        method:'get',
        url:"php/inventario/procesarDetalleinventario.php",
        params: {empresa:empresa,documento:documento,numero:numero,ubicacion:ubicacion}
      });
      return (request.then(handleSuccess,handleError));
    },
    insertarCabezainventario: function(empresa,ubicacion,cinventario,codPeriodo,cedula,json,ruta,ubisol){
      var request = $http({
        method:'POST',
        url:"php/inventario/insertarcabezainventario.php",
        data: {empresa:empresa,ubicacion:ubicacion,cinventario:cinventario,codPeriodo:codPeriodo,cedula:cedula,json:json,ruta:ruta,ubisol:ubisol}
      });
      return (request.then(handleSuccess,handleError));
    },
    insertarDetalleinventario: function(empresa,documento,numeroinv,ubicacion,cedula,json,ruta){  //json prueba
      var request = $http({
        method:'POST',
        url:"php/inventario/insertardetalleinventario.php",
        data: {empresa:empresa,documento:documento,numeroinv:numeroinv,ubicacion:ubicacion,cedula:cedula,json:json,ruta:ruta}
      });
      return (request.then(handleSuccess,handleError));
    },
    obtenerAreasHabilitadas: function(){
      var request = $http({
        method:'get',
        url:"php/inventario/obtenerAreasHabilitadas.php"
      });
      return (request.then(handleSuccess,handleError));
    },
    obtenerListas: function(area){
      var request = $http({
        method:'get',
        url:"php/inventario/obtenerListas.php",
        params: {area:area}
      });
      return (request.then(handleSuccess,handleError));
    },
    obtenerListasInv: function(area,ubicacion,periodo,responsable){
      var request = $http({
        method:'get',
        url:"php/inventario/obtenerAreasinv.php",
        params: {area:area,ubicacion:ubicacion,periodo:periodo,responsable:responsable}
      });
      return (request.then(handleSuccess,handleError));
    },
    obtenerCriterio: function(area,lista){
      var request = $http({
        method:'get',
        url:"php/inventario/obtenerListaChequeo.php",
        params: {area:area, lista:lista}
      });
      return (request.then(handleSuccess,handleError));
    },
    obtenerPendientes: function(ubicacion,cedula){
      var request = $http({
        method:'get',
        url:"php/inventario/obtenerAcasPendientes.php",
        params: {ubicacion:ubicacion,cedula:cedula}
      });
      return (request.then(handleSuccess,handleError));
    },
    validarPeriodo: function(tipolistas){
      var request = $http({
        method:'get',
        url:"php/inventario/validarPeriodo.php",
        params: {tipolistas:tipolistas}
      });
      return (request.then(handleSuccess,handleError));
    },
    obtenerPeriodoAnterior: function(ubicacion,documento){
      var request = $http({
        method:'get',
        url:"php/inventario/obtenerPeriodoAnterior.php",
        params: {ubicacion:ubicacion,documento:documento}
      });
      return (request.then(handleSuccess,handleError));
    },
    uploadFile: function(formData){
     var request =  $.ajax({
                 url: $UPLOAD_PATH_I,
                 type: "POST",
                 data: formData,
                 contentType: false,
                 processData: false
             })
       return (request.then(handleSuccessPost,handleError));
     },
     uploadName: function(oldname,filename){
     var data = {
         oldname:oldname,
         filename:filename
     }
     var request =  $.ajax({
                 url: $UPLOAD_PATH_RENAME_I+"?oldname="+oldname+"&newname="+filename,
                 type: "GET",
                 data: data,
                 contentType: false,
                 processData: false
             })
       return (request.then(handleSuccessPost,handleError));
     }
  })


  function handleSuccessPost (response){
    return(response);
  }
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
