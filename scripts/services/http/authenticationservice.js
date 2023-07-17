'use strict';
angular.module('GenesisApp')
.service('AuthenticationService',
    function ($http,$q) {
        var service = {};
        var serviceuri = $PATH; 
          return ({
        login: function(parameters){   
           var request = $.ajax({ 
            method:'POST', 
            url:$PATH +"/api/Login",
            data:parameters
            });
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
            return($q.reject(error.responseJSON.ExceptionMessage));
        }
    }
      });

    /* function  login(username,password, version,callback) {

           $rootScope.login = {
              username:username,
              password: password,
              version: version
           };

             Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------
           var res = $rootScope.login;
            $.ajax({method: 'POST', url: serviceuri + '/api/login', data: res,})
                .success(function(response){
                callback(response);
            });



            }*/






/*
           $timeout(function(){
                var response = { success: username === 'test' && password === 'test' };
                if(!response.success) {
                    response.message = 'usuario o contraseña  incorrecta';
                }
                callback(response);
            }, 1000);*/

          /* Use this for real authentication
             ----------------------------------------------*/           
        /*   var res = $rootScope.login;
           
           $timeout(function() {
             $.ajax({method: 'POST', url: serviceuri + '/api/login', data: res,})
               .success(function (response) {
                    callback(response);
                   }) }, 1000);*/
               /*.error(function(response){
                    response.message = response.responseJSON.ExceptionMessage;
                   });  */        
              
        
 
      
 
    /* jshint ignore:end */
