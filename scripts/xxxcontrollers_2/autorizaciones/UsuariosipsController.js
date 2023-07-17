'use strict';
angular.module('GenesisApp')
.controller('UsuariosipsController',['$http','$timeout','$scope','ngDialog','consultaHTTP','afiliacionHttp','notification','cfpLoadingBar','$rootScope','$controller','communication',
function($http,$timeout,$scope,ngDialog,consultaHTTP,afiliacionHttp,notification,cfpLoadingBar,$rootScope,$controller,communication) {

  $scope.Ocultar=true;
  $scope.OcultarIdentificacion=true;
  $scope.Valida=false; //Boton Que Valida NIT
  $scope.ValidaIdentificacion=true; //Boton Que Valida Identificacion
  $scope.InformacionUsuario=true; //Tabla De Informacion

  $scope.Validar=function(){
    if ($scope.A_Nit==undefined) {
      swal('Información','Debe Digitar El NIT','info');
    }else {
      $http({
        method:'POST',
        url:"php/siau/CodigoUrgencia/Ccodigourgencia.php",
        data: {function:'validarips',ips:$scope.A_Nit}
      }).then(function(response){
        if (response.data.existe=='0') {
          swal('Información','El NIT No Se Encuentra Registrado','info');
        } else {
          $scope.A_NombreIPS=response.data.Nombre;
          $scope.OcultarIdentificacion=false;
          $scope.Valida=true;
          $scope.ValidaIdentificacion=false;
        }
      });

    }
  }
  //Oculta Informacion
  $scope.Cambio=function(){
    $scope.A_NombreIPS='';
    $scope.OcultarIdentificacion=true;
    $scope.Valida=false;
    $scope.ValidaIdentificacion=true;
    $scope.Ocultar=true;
    $scope.A_TipoDocumento='';
    $scope.A_NumeroDocumento='';
    $scope.A_NombreUsuario='';
    $scope.A_Celular='';
    $scope.A_Telefono='';
    $scope.A_Correo='';
    $scope.A_TipoDocumento='';
    $scope.A_NumeroDocumento='';
    $scope.A_Cargo='';
    $scope.A_Contrasena=''
    $scope.A_ConfContrasena='';
    $scope.InformacionUsuario=true;
  }

  //Muestra y Oculta Información Del Usuario
  $scope.CambioDeIdentificiacion=function(){
    $scope.Ocultar=true;
    $scope.ValidaIdentificacion=false;
    $scope.A_NombreUsuario='';
    $scope.A_Celular='';
    $scope.A_Telefono='';
    $scope.A_Correo='';
    $scope.A_Cargo='';
    $scope.A_Contrasena=''
    $scope.A_ConfContrasena='';
    $scope.InformacionUsuario=true;
  }

  //Valida que el Usuario a Crear Exista
  $scope.ValidarDocumento=function(){
    if ($scope.A_TipoDocumento==undefined || $scope.A_TipoDocumento=='') {
      swal('Información','Debe Elegir Un Tipo De Documento','info');
    }else if ($scope.A_NumeroDocumento==undefined) {
      swal('Información','Debe Digitar El Numero De Identificación','info');
    } else {
      $http({
        method:'POST',
        url:"php/autorizaciones/autorizacion/funcautorizacion.php",
        data: {function:'consultarusuario',
        nit:$scope.A_Nit,documento_usuario:$scope.A_NumeroDocumento}
      }).then(function(response){
        if (response.data['0'].Codigo=='0') {
          $scope.datos=response.data;
          console.log($scope.datos);
          $scope.InformacionUsuario=false;
        }else{
          $scope.Ocultar=false;
          $scope.ValidaIdentificacion=true;

        }
      });
    }
  }

  // Registro De Usuario IPS
  $scope.RegistroUsuarioIPS=function(){
    if ($scope.A_NombreUsuario==undefined || $scope.A_NombreUsuario=='') {
      swal('Información','Debe Digitar El Usuario A Crear','info');
    }else if ($scope.A_Celular==undefined || $scope.A_Celular=='') {
      swal('Información','Debe Digitar El Celular Valido','info');
    }else if ($scope.A_Telefono==undefined || $scope.A_Telefono=='') {
      swal('Información','Debe Digitar Un Telefono Valido','info');
    }else if ($scope.A_Correo==undefined || $scope.A_Correo=='') {
      swal('Información','Debe Digitar Un Correo Electronico Valido','info');
    }else if($scope.A_Cargo==undefined || $scope.A_Cargo=='') {
      swal('Información','Debe Digitar El Cargo Del Usuario','info');
    }else {
      if ($scope.A_Contrasena==$scope.A_ConfContrasena){
        $http({
          method:'POST',
          url:"php/autorizaciones/autorizacion/funcautorizacion.php",
          data: {function:'registrarusuarioips',
          nit:$scope.A_Nit,
          documento_usuario:$scope.A_NumeroDocumento,
          nombre_usuario:$scope.A_NombreUsuario,
          clave:$scope.A_Contrasena,
          cargo:$scope.A_Cargo,
          pcelular:$scope.A_Celular,
          telefono:$scope.A_Telefono,
          correo:$scope.A_Cargo}
        }).then(function(response){
          if (response.data.Codigo=='0') {
            swal('Exitosamente',response.data.Nombre,'success');
            $scope.limpiar();
          }else {
            swal('Exitosamente',response.data.Nombre,'success');
          }
        });
      } else {
        swal('Información','La Contraseña No Coinciden','info');
      }
    }
  }

  $scope.limpiar=function(){
    $scope.A_Nit='';
    $scope.A_NombreIPS='';
    $scope.A_NombreUsuario='';
    $scope.A_Celular='';
    $scope.A_Telefono='';
    $scope.A_Correo='';
    $scope.A_TipoDocumento='';
    $scope.A_NumeroDocumento='';
    $scope.A_Cargo='';
    $scope.A_Contrasena='';
    $scope.A_ConfContrasena='';
    $scope.Ocultar=true;
    $scope.OcultarIdentificacion=true;
    $scope.Valida=false;
    $scope.ValidaIdentificacion=true;
    $scope.InformacionUsuario=true;
  }

  $scope.CambiarEstado=function(){
    swal({
      title: 'Confirmar',
      text: '¿Desea Cambiar el Estado Al Usuario?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result) {
        $http({
          method:'POST',
          url:"php/autorizaciones/autorizacion/funcautorizacion.php",
          data: {function:'actualizarestado',documento_usuario:$scope.A_NumeroDocumento}
        }).then(function(response){
          if (response.data.Codigo=='0') {
            swal('Completado!',response.data.Nombre,'success');
            $scope.ValidarDocumento();

          }else{
            swal('Informancion',response.data.Nombre,'error');
          }
        });
      }
    })
  }


}])
