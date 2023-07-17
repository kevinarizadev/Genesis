'use strict';

angular.module('GenesisApp').service('notify', () => {
  return ({
    show: (type, text) => {
      switch (type) {
        case 'sucess':
        case 'warning':
        case 'info':
          if (typeof text === 'undefined' || text === null || text === '') {
            throw new Error('[notify] Text cannot be empty')
          } else {
            swal('Genesis informa', text, type)
          }
          break
        case 'loading':
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Consultando Información...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          })
          break
        default:
          throw new Error('[notify] Invalid notification type')
      }
    },

    close: () => {
      swal.close()
    }
  });
});