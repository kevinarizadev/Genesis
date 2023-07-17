'use strict';
/**
* @ngdoc service
* @name GenesisApp.service:notification
* @description
* # servicio  para el llamado de validacion de inputs por parametros.
*/
angular.module('GenesisApp')
.service('validationParams',function () {

  return {
    getValidation: function(type,value,Vname)
    {
      switch(type) {
        case "text":

            if(value.length>0){
              return 0;
            }
            else {
              return 1;
            }
        break
        case "email":
            var atpos = value.indexOf("@");
            var dotpos = value.lastIndexOf(".");
            if(atpos<1 || dotpos<atpos+2 || dotpos+2>=value.length){
              return 2;
            }else {
              return 0;
            }
        break;
        case "tel":
            switch (Vname) {
              case 'tel':
                  if(value.length==0 || value.length==8){
                      return 0;
                  }
                  else{
                      return 3;
                    }
                break;
              case 'cel':
                  if(value.length==0 || value.length==14){
                      return 0;
                    }else{
                      return 4;
                    }
              default:
            }
        break;
        default:
          return 0;
      }
    },
    getArgument: function(result,Vname)
    {
      switch(result) {
        case 1:
            switch (Vname) {
              case 'direccion':
                  return 'La direccion no puede estar vacia!';
                break;
              case 'localidad':
                  return 'La localidad no puede estar vacia!';
                break;
              default:
                  return 'Por favor complete todos los campos!'
            }
        break
        case 2:
            return 'Email no valido!';
        break;
        case 3:
            return 'Numero de telefono no valido!';
        break;
        case 4:
            return 'Numero de celular no valido!';
        break;
        default:
          return 'Por favor complete los campos!';
      }
    }
  }
});
