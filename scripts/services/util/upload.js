'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:upload
 * @description
 * # servicio  para el cargue de archivos.
 */
 angular.module('GenesisApp')
 .service('upload', ["$http","$q",function($http,$q)
 {
    return ({
     uploadFile: function(formData){
    var request =  $.ajax({
                url: $UPLOAD_PATH,
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
                url: $UPLOAD_PATH_RENAME+"?oldname="+oldname+"&newname="+filename,
                type: "GET",
                data: data,
                contentType: false,
                processData: false
            })
      return (request.then(handleSuccessPost,handleError));
    }
});

    function handleSuccessPost (response){
       return(response); 
    }

    function handleError (error){
        if (error ==null){
            return($q.reject(error));
        }else if (error.errorMessage!== undefined){
            return ($q.reject(error.errorMessage));
        }else {
            return($q.reject(null));
        }
    }
 }])