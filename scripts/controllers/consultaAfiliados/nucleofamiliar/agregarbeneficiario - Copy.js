'use strict';
angular.module('GenesisApp')
.controller('agregarbeneficiario',['$http','$timeout','$scope','ngDialog','consultaHTTP','afiliacionHttp','notification','cfpLoadingBar','$rootScope','$controller','communication',
  function($http,$timeout,$scope,ngDialog,consultaHTTP,afiliacionHttp,notification,cfpLoadingBar,$rootScope,$controller,communication) {

    $scope.fichasisben_dnp=$scope.fichasisben_dnp;
    $scope.OcultarBotonAgregar=true; //Boton De La Consulta Al Beneficiario
    $scope.tipodocumento= {Codigo:''}; // Select De Tipo De Documento
    $scope.tipoparentesco = {Codigo:''}; // Select paretenzco
    //Consume El Json del tipo de parentescos
    afiliacionHttp.obtenerParentesco().then(function (response) {
      $scope.T_Parentescos = response.Parentesco;
    })
    //Consuem El Json del tipo de documentos
    afiliacionHttp.obtenerDocumento().then(function (response) {
      $scope.T_Documentos = response.Documento;
    })

    //Limpiar El Campo Del Benificiario
    $scope.Limpiar=function(){
      $scope.tipodocumento= {Codigo:''};
      $scope.tipoparentesco = {Codigo:''};
      $scope.n_identificacion = '';
      $scope.OcultarBotonAgregar=true;
    }
/*    $scope.FichaSisbenAlNucleo= function(tipo_documento,documento){
      $scope.tipodocumento= tipo_documento;
      $scope.n_identificacion=documento;
      consultaHTTP.obtenerNucleo('CABA',$scope.tipo_documento,$scope.n_identificacion)
      .then(function(response){
        if (response == "0") {
          swal('Información','No se encontro información','error')
      }else if (typeof response === "object" ) {
          $scope.AFCONSU = response["0"];
          $scope.OcultarBotonAgregar=false;
          swal.close();
      }else if (response.substring(0, 1) == "2") {
          swal('Información',response,'info');
      }
    })
    }*/
    $scope.AgregarBeneficiarioAlNucleo = function (ubicacion_actual,nombreips,zona,discapacidad,celular,grupop,tipodocumento,documento,primer_nombre,segundo_nombre,primer_apellido,segundo_apellido){
        $http({
            method: 'POST',
            url: "php/nucleofamiliar/funnovedadacb.php",
            data: {
                function: 'nucleofamiliar',
                tipo_documento:tipodocumento,
                documento:documento,
                ti_documento_cab:$scope.tipo_documento_cab,
                documento_cab:$scope.documento_cab,
                parentezco:$scope.tipoparentesco,
                respuesta:$scope.IdRespuesta,
                tipo_afiliado:'O'
            }
        }).then(function (respuesta) {
            if ($scope.tipoparentesco=='') {
                swal("Advertencia", 'Debe seleccionar un parentezco', "warning");
            } else if ($scope.tipo_documento_cab==tipodocumento && $scope.documento_cab== documento) {
                swal("Advertencia", 'No puede agregar el mismo cabeza', "warning");
            }else if ($scope.tipoparentesco=='1' && $scope.genero==$scope.generobeneficiario){
                swal('Información','No se puede agregar un conyugue del mismo sexo','info');
            }else{
                switch(respuesta.data.codigo){
                    case 0:
                    swal("Exitosamente", respuesta.data.mensaje, "success");
                    $scope.Limpiar();
                    $scope.closeThisDialog();
                    // $scope.BuscarAfiliado();
                    // $scope.AgregarBeneficiarioAlNucleo();
                    break;
                    case 1:
                    if ($scope.ubicacion_dnp_cab==$scope.ubicacion_dnp_ben) {
                        swal({
                            title: 'Advertencia',
                            text: respuesta.data.mensaje,
                            type: 'info',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok',
                        }).then(function(result){
                            if (result) {
                                $scope.ConsultaSisben(tipodocumento,documento);
                            }
                        });
                    }else {

                        $scope.tipo_documento=tipodocumento;
                        $scope.documento=documento;
                        $scope.refestado = 1;
                        ngDialog.open({
                            template: 'views/consultaAfiliados/modalAdjuntos.html',
                            className: 'ngdialog-theme-plain',
                            controller: 'adjuntocontroller',
                            scope: $scope
                        });
                    }
                    
                    break;
                    case 2:
                    swal({
                        title: 'Advertencia',
                        text: respuesta.data.mensaje,
                        type: 'info',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok',
                    }).then(function(result){
                        if (result) {
                            $scope.ConsultaSisben($scope.tipo_documento_cab,$scope.documento_cab);
                        }
                    });
                    break;
                    case 3:
                    swal("Advertencia", respuesta.data.mensaje, "info");
                    break;
                    case 4:
                    swal({
                        title: 'Completado',
                        text: respuesta.data.mensaje+$scope.fichasisben_dnp,
                        type: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok',
                    }).then(function(result){
                        if (result) {
                            $scope.Limpiar();
                            $scope.busquedaAfiliado();
                            $scope.closeThisDialog();
                        }
                    });
                    break;
                    case 5:
                    swal("Advertencia", respuesta.data.mensaje, "info");
                    break;
                    case 6:
                    swal({
                        title: 'Completado',
                        text: respuesta.data.mensaje,
                        type: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok',
                    }).then(function(result){
                        if (result) {
                            $scope.busquedaAfiliado();
                            $scope.Limpiar();
                            $scope.closeThisDialog();
                        }
                    });
                    break;
                    case 8:
                    swal("Advertencia", respuesta.data.mensaje, "info");
                    break;
                }
            }
        })
    }
    $scope.BuscarAfiliado = function(){
        swal({
            title: 'Cargando información del afiliado'
        });
        swal.showLoading();
        $scope.AFCONSU = "";
        if ($scope.tipodocumento == "") {
            swal("Información", "Seleccione tipo de documento", "info");
        }else if ($scope.n_identificacion === undefined || $scope.n_identificacion == "") {
            swal("Información", "Ingrese número de identificación", "info");
        }else {
            consultaHTTP.obtenerNucleo('CABA',$scope.tipodocumento,$scope.n_identificacion)
            .then(function(response){
                if (response == "0") {
                    swal('Información','No se encontro información','error');
                    $scope.OcultarBotonAgregar=true;
                }else if (typeof response === "object" ) {
                //Municipio Del Benificiario DNP
                afiliacionHttp.serviceFDC($scope.tipodocumento,$scope.n_identificacion,'ObtenerSisben').then(function(response) {
                    var sisben = response.data;
                    $scope.ubicacion_dnp_ben=sisben.CodigoMunicipio;
                    $scope.IdRespuesta=sisben.IdRespuesta;
                });
                for (var z = 0; z < response.length; z++) {
                    if ($scope.n_identificacion==response[z].DOCUMENTO) {
                        $scope.AFCONSU=response[z];
                        $scope.generobeneficiario=$scope.AFCONSU.SEXO;
                        $scope.ubicacion_actual_ben=$scope.AFCONSU.CODIGOUBICACIONGEOGRAFICA;
                    }
                }
                //$scope.AFCONSU = response["0"];
                //$scope.ValidarSisben($scope.tipodocumento,$scope.n_identificacion);
                //$scope.ConsultaSisben($scope.tipodocumento,$scope.n_identificacion);
                $scope.OcultarBotonAgregar=false;
                swal.close();
            }else if (response.substring(0, 1) == "2") {
                swal('Información',response,'info');
            }
        })
        }
    }
    $scope.ConsultaSisben= function(TDocumento,Documento){
      afiliacionHttp.serviceFDC(TDocumento,Documento,'ObtenerSisben').then(function(response) {
        var sisben = response.data;
        $scope.infosisben=sisben;
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
            $http({
                method: 'POST',
                url: "php/nucleofamiliar/funnovedadacb.php",
                data: {function: 'p_guardar_info_sisben_agrupacion', data:$scope.infosisben}
            }).then(function (res) {
                $scope.res=res.data;
                if ($scope.res.codigo=='1'){
                    $scope.AbrirSisben ();
                } else {
                    swal('Error',$scope.res.mensaje,'error');
                }
            })
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
        controller: 'hojadelsisben',
        scope: $scope,
        closeByDocument:false
    });
    }
}
]);
