'use strict';
angular.module('GenesisApp')
.controller('actualizarinformacion',['$scope','consultaHTTP','afiliacionHttp','notification','$timeout','$rootScope','$http','$window','$filter','ngDialog','cfpLoadingBar',
function($scope,consultaHTTP,afiliacionHttp,notification,$timeout,$rootScope,$http,$window,$filter,ngDialog,cfpLoadingBar) {

  $scope.Act_Zona= {Codigo:''};
  $scope.ViaPrincipal={Codigo:''};
  $scope.Letra={Codigo:''};
  $scope.Cuadrante={Codigo:''};
  $scope.CuadranteVG={Codigo:''};
  $scope.SelectLetraVG={Codigo:''};
  $scope.Bis= false;

  //$scope.SisbenSoporte="true";
  //Bloqueo HabilitarInformacion
  $scope.Habilitar=true;
  // Bloqueo Campo Del Modal
  $scope.BloqueaNombre=true;
  $scope.BloquearApellido=true;
  $scope.BloquearCelular=true;
  $scope.BloquearTipo=true;
  $scope.BloquearCedula=true;
  $scope.BloquearParentesco=true;
  $scope.BloquearDireccion=true;
  $scope.BloquearMunicipio=true;
  $scope.BloquearEscenario=true;
  $scope.BloquearGPoblacionales=true;
  $scope.BloquearFicha=true;
  $scope.BloquearNivel=true;
  $scope.BloquearPuntaje=true;
  $scope.BloquearDiscapacidad=true;
  $scope.BloquearZona=true;
  
  $http({
    method:'POST',
    url:"php/nucleofamiliar/funnovedadacb.php",
    data: {
      function:'VerificarCargeDeSoporteSisben',
      v_pdocumento:$scope.documento,
      v_ptipodocumento:$scope.tipodocumento
      }
    }).then(function(res){
    if (res.data == '0') {
      $scope.SisbenSoporte=false;
    }else {
      $scope.SisbenSoporte=true;
    }
  })
  // Json Grupo Poblacional
  $http({
      method:'POST',
      url:"php/nucleofamiliar/funnovedadacb.php",
      data: {function:'obteneragrupoPoblacional'}
      }).then(function(response){
      $scope.GPoblacionales = response.data;
  });
  //$scope.GPoblacionales=$scope.grupop;
  // Json Municipio
  $http({
      method:'POST',
      url:"php/nucleofamiliar/funnovedadacb.php",
      data: {function:'obtenermunicipio'}
      }).then(function(response){
      $scope.Municipios = response.data;
  });
  $scope.HabilitarInformacion=function(){
    if ($scope.Habilitar==false && $scope.tipo_parentesco=="") {
      $scope.BloquearCelular=false;
      $scope.BloquearParentesco=true;
      $scope.BloquearDireccion=true;
      $scope.BloquearMunicipio=false;
      $scope.BloquearGPoblacionales=false;
      $scope.BloquearFicha=false;
      $scope.BloquearNivel=false;
      $scope.BloquearPuntaje=false;
      $scope.BloquearDiscapacidad=false;
      $scope.BloquearZona=false;
    }else if  ($scope.Habilitar==false) {
      $scope.BloquearCelular=false;
      $scope.BloquearParentesco=true;
      $scope.BloquearDireccion=true;
      $scope.BloquearMunicipio=false;
      $scope.BloquearGPoblacionales=false;
      $scope.BloquearFicha=false;
      $scope.BloquearNivel=false;
      $scope.BloquearPuntaje=false;
      $scope.BloquearDiscapacidad=false;
      $scope.BloquearZona=false;
    }else {
      $scope.Habilitar=true;
      $scope.BloquearCelular=true;
      $scope.BloquearParentesco=true;
      $scope.BloquearDireccion=true;
      $scope.BloquearMunicipio=true;
      $scope.BloquearGPoblacionales=true;
      $scope.BloquearFicha=true;
      $scope.BloquearNivel=true;
      $scope.BloquearPuntaje=true;
      $scope.BloquearDiscapacidad=true;
      $scope.BloquearZona=true;
    }
  }
  $scope.AbrirModalDireccion=function(){
      $scope.dialogDiagreg=ngDialog.open({
        template: 'views/consultaAfiliados/nucleofamiliar/modal/modalDireccion.html',
        className: 'ngdialog-theme-plain',
        controller: 'actualizarinformacion',
        closeByDocument:false,
        closeByEscape:false,
        scope: $scope
      });
      $scope.dialogDiagreg.closePromise.then(function (data) {
        if (data.value != "$closeButton") {
          $scope.Act_Direccion2=data.value;
          $scope.Act_Direccion=$scope.Act_Direccion2;
          $scope.Localaidad2=$('#barrio').val();
          $scope.Act_Barrio=$scope.Localaidad2

        }else{
          $scope.Act_Direccion;
          $scope.Act_Barrio= $scope.barrio;
        }
      });
  }
  afiliacionHttp.obtenerViaPrincipal().then(function (response) {
    $scope.viaprincipal = response;
  })
  afiliacionHttp.obtenerLetra().then(function (response) {
    $scope.letras = response;
  })
  afiliacionHttp.obtenerNumero().then(function (response) {
    $scope.Numeros = response;
  })
  afiliacionHttp.obtenerCuadrante().then(function (response) {
    $scope.Cuadrantes = response;
  })
  afiliacionHttp.obtenerZona().then(function (response) { //Consulto Json De La ZONAS
    $scope.Zonas = response.Zona;
  })
  afiliacionHttp.obtenerParentesco().then(function (response) { //Consume El Json del tipo de parentescos
    $scope.A_Paretensco = response.Parentesco;
  })
  afiliacionHttp.obtenerDocumento().then(function (response) {
    $scope.A_Tipo_Documentos = response.Documento;
  })
  $scope.GuardarDireccion=function(ViaPrincipal,NumViaPrincipal,Letra,Numero,Bis,Cuadrante,NumeroVG,SelectLetraVG,NumeroPlaca,CuadranteVG,Complemento){
    $scope.closeThisDialog($('#direcciond').val());
    $scope.closeThisDialog($('#barrio').val());
  }
  $scope.ObtenerEscenarios = function(municipio){
    $http({
      method:'POST',
      url:"php/nucleofamiliar/funnovedadacb.php",
      data: {function:'obtenerescenarios',municipio:municipio}
    }).then(function(res){
      $scope.Escenarios = res.data;
      if ($scope.ubicacion_actual == $scope.Act_Municipio) {
        $scope.BloquearEscenario = true;
        $scope.Act_Escenario =$scope.nombreips;
      }else{
        $scope.BloquearEscenario = false;
        $scope.Act_Escenario = $scope.Escenarios[0].CODIGO;
      }
    });
  }
  afiliacionHttp.serviceFDC($scope.tipodocumento,$scope.documento,'ObtenerSisben').then(function(respuesta) {
    var sisben = respuesta.data;
    $scope.Act_PrimerNombres=$scope.primer_nombre;
    $scope.Act_SegundoNombre=$scope.segundo_nombre;
    $scope.Act_PrimerApellido=$scope.primer_apellido;
    $scope.Act_SegundoApellido=$scope.segundo_apellido;
    $scope.Act_Parentesco=$scope.tipo_parentesco;
    $scope.Act_Zona=$scope.zona;
    $scope.Act_Discapacidad=$scope.discapacidad;
    $scope.Act_Celular=$scope.celular;
    $scope.Act_GPoblacional=$scope.grupop;
    $scope.Act_Direccion=$scope.direccion;

    $scope.Act_Nivel = sisben.Nivel;
    $scope.Act_Puntaje = sisben.Puntaje;
    $scope.Act_Ficha=sisben.Ficha;
    $scope.Act_Municipio=sisben.CodigoMunicipio;
    $scope.Act_TipoCedula=sisben.TipoDocumento;
    $scope.Act_Cedula=sisben.Documento;

    if ($scope.Act_Municipio==0) {
      $scope.Act_Municipio=$scope.ubicacion_actual
      $scope.ObtenerEscenarios($scope.Act_Municipio);
    }else{
      if($scope.ubicacion_actual==$scope.Act_Municipio){
        $scope.ObtenerEscenarios($scope.Act_Municipio);
      }else{
        $scope.Act_Municipio= $scope.ubicacion_actual
        $scope.ObtenerEscenarios($scope.ubicacion_actual);
      }
    }

    if (sisben.IdRespuesta==6) {
      $scope.fichasisben_oasis;
      $scope.nivel_sisben;
    } else {
      if ($scope.fichasisben_oasis==$scope.Act_Ficha) {
        $scope.fichasisben_oasis;
        if ($scope.nivel_sisben==$scope.Act_Nivel) {
          $scope.nivel_sisbe;
        } else{
          $scope.Act_Nivel;
        }
      } else {
        $scope.Act_Ficha;
        if ($scope.nivel_sisben==$scope.Act_Nivel) {
          $scope.nivel_sisbe;
        } else{
          $scope.Act_Nivel;
        }
      }

    }
  });
  $scope.selectGPoblacional = function(){
    if ($scope.Act_GPoblacional == "8" || $scope.Act_GPoblacional == "9") {
      $scope.Act_Ficha = 0;
      $scope.BloquearFicha=true;
      $scope.Act_Nivel = 0;
      $scope.BloquearNivel = true;
      $scope.Act_Puntaje = 0;
      $scope.BloquearPuntaje= true;
    }else{
      $scope.BloquearFicha=false;
      $scope.BloquearNivel = false;
      afiliacionHttp.serviceFDC($scope.tipodocumento,$scope.documento,'ObtenerSisben').then(function(respuesta) {
        var sisben = respuesta.data;
        $scope.Act_Nivel = sisben.Nivel;
        $scope.Act_Puntaje = sisben.Puntaje;
        $scope.Act_Ficha=sisben.Ficha;
        $scope.BloquearFicha=false;
        $scope.BloquearNivel = false;
        $scope.BloquearPuntaje= false;
      });
    }
  }
  $scope.ActualizarInfor = function(){
    if (($scope.Act_GPoblacional == "5") && ($scope.Act_Ficha === undefined ||   $scope.Act_Ficha == "" || $scope.Act_Nivel === undefined || $scope.Act_Nivel == "" )){
      swal("Advertencia", 'Debe ingresar información del SISBEN', "warning");
    }else{
      swal({
        title: 'Confirmar',
        text: '¿Desea Actualizar la información del afiliado?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar'
      }).then((result) => {
        if (result) {
          $http({
            method:'POST',
            url:"php/nucleofamiliar/funnovedadacb.php",
            data: {
              function:'ValidaACB',
              t_documento:$scope.Act_TipoCedula,
              n_documento:$scope.Act_Cedula,
              parentesco:$scope.Act_Parentesco,
              municipio:$scope.Act_Municipio,
              escenario:$scope.Act_Escenario,
              gpoblacional:$scope.Act_GPoblacional,
              ficha_sisben:$scope.Act_Ficha,
              n_sisben:$scope.Act_Nivel,
              puntaje_sisben:$scope.Act_Puntaje,
              discapacidad:$scope.Act_Discapacidad,
              zona:$scope.Act_Zona,
              direccion:$scope.Act_Direccion,
              celular:$scope.Act_Celular,
              barrio:$scope.Act_Barrio
            }
          }).then(function(res){
            if (res.data.MENSAJE == '1') {
              $scope.busquedaAfiliado();
              swal("Completado","Cambios realizados correctamente", "success");
              $scope.closeThisDialog();
              $scope.Habilitar=true;
              $scope.BloquearCelular=true;
              $scope.BloquearParentesco=true;
              $scope.BloquearDireccion=true;
              $scope.BloquearMunicipio=true;
              $scope.BloquearGPoblacionales=true;
              $scope.BloquearFicha=true;
              $scope.BloquearNivel=true;
              $scope.BloquearPuntaje=true;
              $scope.BloquearDiscapacidad=true;
              $scope.BloquearZona=true;
            }else{
              swal("Error",res.data.MENSAJE, "warning");
            }
          });
        }
      })
    }
  }
  $scope.ActualizarBotonDeCargaSoporte=function(){
    $http({
      method:'POST',
      url:"php/nucleofamiliar/funnovedadacb.php",
      data: {
        function:'VerificarCargeDeSoporteSisben',
        v_pdocumento:$scope.documento,
        v_ptipodocumento:$scope.tipodocumento
      }
    }).then(function(res){
      if (res.data == '0') {
        $scope.SisbenSoporte=false;
      }else {
        setTimeout(function (){
          $scope.SisbenSoporte = true
          $scope.$apply();
        }, 500);
      
      $scope.OcultarB=true;
      }
    });
  }
  $scope.CargarSoporte=function(){
    $scope.ConsultaSisben($scope.tipodocumento,$scope.documento);
  }
  $scope.ConsultaSisben= function(TDocumento,Documento){
    afiliacionHttp.serviceFDC(TDocumento,Documento,'ObtenerSisben').then(function(response) {
      var sisben = response.data;
      $scope.Nombres=sisben.Nombres;
      $scope.Apellidos=sisben.Apellidos;
      $scope.TipoDocumentoSisben=sisben.TipoDocumento;
      $scope.DocumentoSisben=sisben.Documento;
      $scope.Sisben = sisben.Nivel;
      $scope.PuntajeSisben = sisben.Puntaje;
      $scope.FichaSisben = sisben.Ficha;
      $scope.CodigoMunicipio=sisben.CodigoMunicipio;
      $scope.Area=sisben.Area;
      $scope.Municipio=sisben.Municipio;
      $scope.FechaModificacion=sisben.FechaModificacion;
      $scope.FechaModificacionPersona=sisben.FechaModificacionPersona;
      $scope.Departamento=sisben.Departamento;
      $scope.Antiguedad=sisben.Antiguedad;
      $scope.Estado=sisben.Estado;
      $scope.AdminNombre=sisben.AdminNombre;
      $scope.AdminDireccion=sisben.AdminDireccion;
      $scope.AdminCorreo=sisben.AdminCorreo;
      $scope.AdminTelefonos=sisben.AdminTelefonos;
      $scope.IdRespuesta_Sisben=sisben.IdRespuesta;
      if ($scope.IdRespuesta_Sisben==0) {
        $scope.AbrirSisben ();
      }else {
        swal('Informacion','El afiliado no se encuentra vinculado al sisben','info')
      }

    });
  }
  $scope.AbrirSisben = function () {
    $scope.Nombres;
    $scope.Apellidos;
    $scope.TipoDocumentoSisben;
    $scope.DocumentoSisben;
    $scope.Sisben;
    $scope.PuntajeSisben;
    $scope.FichaSisben;
    $scope.CodigoMunicipio;
    $scope.Area;
    $scope.FechaModificacion;
    $scope.FechaModificacionPersona;
    $scope.Municipio;
    $scope.Departamento;
    $scope.Antiguedad;
    $scope.Estado;
    $scope.AdminNombre;
    $scope.AdminDireccion;
    $scope.AdminCorreo;
    $scope.AdminTelefonos;
    ngDialog.open({
      template: 'views/consultaAfiliados/nucleofamiliar/sisben/hojadelsisben.html',
      className: 'ngdialog-theme-plain',
      controller: 'actualizarinformacion',
      scope: $scope,
      closeByDocument:false
    });
  }
  $scope.GuardarSisben=function(){
    var node = document.getElementById("Impri").firstElementChild.parentNode;
                domtoimage.toPng(node)
                .then(function (dataUrl) {
                  $scope.Archivo= new Image();
                  $scope.Archivo= dataUrl;
              $http({
                 method:'POST',
                 url:"php/insertdoc.php",
                 data: {tipo_doc:$scope.TipoDocumentoSisben,
                        id:$scope.DocumentoSisben,
                        typefile:'16',
                        file:$scope.Archivo,
                        type:'png',
                        path:'/cargue_ftp/Digitalizacion/Genesis/Aseguramiento/'}
              }).then(function(response){
                 if (response.data == 1) {
                   swal({
                     title: 'Completado',
                     text: 'Adjunto cargado exitosamente',
                     type: 'success',
                     confirmButtonColor: '#3085d6',
                     confirmButtonText: 'Ok',
                   }).then(function(result){
                     if (result) {
                      $scope.$estado='A';
                      $http({
                        method:'GET',
                        url:"php/nucleofamiliar/cambiaestado.php",
                        params: { estado:$scope.$estado,
                                  documento:$scope.DocumentoSisben}
                        }).then(function(res){
                            $scope.closeThisDialog();
                            $scope.ActualizarBotonDeCargaSoporte();
                        })
                     }
                   });
                 }else{
                    swal('Mensaje','Error subiendo adjunto','error')
                 }
              })
        }).catch(function (error) {
            console.log('oops, something went wrong!');
        });

  }
  $scope.Imprimir = function(Impri) {
    var innerContents = document.getElementById('Impri').innerHTML;
    var popupWinindow = window.open('', '_blank', 'width=1100,height=1100,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><link rel="stylesheet" href="styles/nucleofamiliar.css"></head><body onload="window.print()">'+innerContents+'</html>');
    popupWinindow.document.close();
  }

}//Final Del Controlador
]);
