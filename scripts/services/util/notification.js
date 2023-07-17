'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:notification
 * @description
 * # servicio  para el llamado de notificacion, alertas, mensajes.
 */
 angular.module('GenesisApp')
 .service('notification', 
  function (toastr) {
    
    return {
        getNotification: function(type,message,title)
        {
          switch(type) {
            case "success":
                return toastr.success(message,title);
              break;
            case "error":
               return toastr.error(message,title);
              break;
            case "warning":
               return toastr.warning(message,title);
              break;
            default:
           return toastr.info(message,title);
            }
        }
    }
 });



