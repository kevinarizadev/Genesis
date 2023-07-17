'use strict';
/**
* @ngdoc service
* @name GenesisApp.service:afiliacionHttp
* @description
* # servicio http para el llamado al web services con todos los procedimientos
* para la afiliacion.
*/
angular.module('GenesisApp')
.service('ausentismoHttp', function ($http,$q) {
  const apiURL = 'https://api.cajacopieps.com';
  return ({
    obtenerMunicipio: function(){
      var request = $.ajax({
        method:'POST',
        url: 'php/ausentismo/obtenermunicipio.php',
        data:{}
      });
      return (request.then(handleSuccessPost,handleError));
    },
    obtenerTipoIncapacidad: function () {
      const request = $http({
        method: 'GET',
        url: 'json/ausentismo/tipoincapacidad.json'
      });
      return request.then(handleSuccess, handleError);
    },

    generarPermiso: function (data) {
      const request = $http.post(`${apiURL}/permisos`, data);
      return request.then(handleSuccess, handleError);
    },

    obtenerDiagnostico: function (consulta) {
      if (consulta === null || consulta === "") {
        throw new Error('La consulta no puede estar vacia.');
      } else {
        const request = $http({
          method: 'POST',
          url: `php/genesis/funcausentismo.php`,
          data: {
            function: 'obtenerDiagnostico',
            data: {
              cie10: consulta
            }
          }
        });
        return request.then(handleSuccess, handleError);
      }
    },

    obtenerLugares: function (consulta) {
      if (consulta === null || consulta === "") {
        throw new Error('La consulta no puede estar vacia.');
      } else {
        const request = $http({
          method: 'GET',
          url: `${apiURL}/sedes`,
          params: {
            consulta: consulta
          }
        });
        return request.then(handleSuccess, handleError);
      }
    },

    obtenerTipoPermiso: function () {
      const request = $http({
        method: 'POST',
        url: `php/genesis/funcausentismo.php`,
        data: {
          function: 'obtenerPermisos'
        }
      });
      return request.then(handleSuccess, handleError);
    },

    obtenerTipos: function (id) {
      if (id  === null) return;
      const request = $http({
        method: 'POST',
        url: `php/genesis/funcausentismo.php`,
        data: {
          function: 'obtenerTiposPermiso',
          data: {
            tipo: id
          }
        }
      });
      return request.then(handleSuccess, handleError);
    },

    obtenerSubtipos: function (id) {
      const request = $http({
        method: 'POST',
        url: `php/genesis/funcausentismo.php`,
        data: {
          function: 'obtenerSubtiposPermiso',
          data: {
            tipo: id
          }
        }
      });
      return request.then(handleSuccess, handleError);
    },

    obtenerPermisos: function () {
      const request = $http({
        method: 'GET',
        url: `${apiURL}/permisos`,
        params: {
          emisor: sessionStorage.getItem('cedula')
        }
      });

      return request.then(handleSuccess, handleError);
    },


    obtenerTiposTraslado: function () {
      const request = $http({
        method: 'GET',
        url: 'json/ausentismo/tipotraslado.json'
      });
      return request.then(handleSuccess, handleError);
    },
    obtenerTipoPermisop: function () {
      const request = $http({
        method: 'GET',
        url: 'json/ausentismo/tipopermisop.json'
      });
      return request.then(handleSuccess, handleError);
    },
    // obtenerSubtipo: function (id) {
    //   const request = $http({
    //     method: 'GET',
    //     url: 'http://192.168.52.47/api/permisos/personal/tipos/' + id + '/subtipos' `${apiURL}/per`
    //   });
    //   return request.then(handleSuccess, handleError);
    // },
    obtenerjefe: function(ced){
      var request = $http({
        method:'get',
        url:"php/ausentismo/obtenerjefe.php",
        params: {cedula:ced}
      });
      return (request.then(handleSuccess,handleError));
    },
    EliminarSolicitudPermiso: function(radicado,ubicacion){
      var request = $http({
        method:'get',
        url:"php/ausentismo/eliminarpermiso.php",
        params: {radicado:radicado,ubicacion:ubicacion}
      });

      return (request.then(handleSuccessPost,handleError));
    },
    obtenerPermiso: function(){
      var request = $http({
        method:'get',
        url:"json/ausentismo/tipopermiso.json"
      });
      return (request.then(handleSuccess,handleError));
    },
    obtenerHistorico: function(ced){
      var request = $http({
        method:'get',
        url:"php/ausentismo/obtenerhistorico.php",
        params: {cedula:ced}
      });
      return (request.then(handleSuccess,handleError));
    },
    //falta probar
    anexospermisos: function(radicado,ubicacion){
      var request = $http({
        method:'get',
        url:"php/ausentismo/obteneranexo.php",
        params: {radicado:radicado,ubicacion:ubicacion}
      });
      return (request.then(handleSuccess,handleError));
    },
    observacionespermisos: function(radicado,ubicacion){
      var request = $http({
        method:'get',
        url:"php/ausentismo/obtenerobservaciones.php",
        params: {radicado:radicado,ubicacion:ubicacion}
      });
      return (request.then(handleSuccess,handleError));
    },
    insertarpermiso: function(ubicacion,problema,motivo,emisor,fechainicio,fechaterminacion,nombreadjunto,ruta){
      var request = $http({
          method:'get',
          url:"php/ausentismo/insertarpermiso.php",
          params: {ubicacion:ubicacion,problema:problema,motivo:motivo,emisor:emisor,fechainicio:fechainicio,fechaterminacion:fechaterminacion,nombreadjunto:nombreadjunto,ruta:ruta}
        });
        return (request.then(handleSuccess,handleError));
      },
    obtenerpermiso: function(emisor){
        var request = $http({
            method:'get',
            url:"php/ausentismo/obtenerpermiso.php",
            params: {emisor:emisor}
          });
          return (request.then(handleSuccess,handleError));
        },

    uploadFile: function(formData){
      var request =  $.ajax({
        url: $UPLOAD_PATH_A,
        type: "POST",
        data: formData,
        contentType: false,
        processData: false
      })
      return (request.then(handleSuccessPost,handleError));
    },

    subirArchivo: function(formData){
      var request =  $.ajax({
        url: 'php/subir_a.php',
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
        url: $UPLOAD_PATH_RENAME_A+"?oldname="+oldname+"&newname="+filename,
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
