'use strict';
angular.module('GenesisApp')
 .controller('censotabcontroller',['$scope','censoHttp','ngDialog','$controller',function($scope,censoHttp,ngDialog,$controller) {
  
  $scope.tipo_doc= ' ';
  $scope.testancia= ' ';
  $scope.regimen= ' ';
  $scope.sexo = ' ';
  $scope.servicio=' ';
  $scope.vwcantidadhijo = true;
  $scope.nacidode;
  $scope.eshijode='N';
  $scope.cantidadhijo=0;
  $scope.numero_au = 0;
  $scope.ips = { codigo:'0',nombre:"SELECCIONAR"}
  $scope.diagnostico = { codigo:'0',nombre:"SELECCIONAR"}
  $scope.municipio = { codigo:'0',nombre:"SELECCIONAR"}
  $scope.fecha_ingreso = new Date();

  var dat = {prov : 'navb'}
      $.getJSON( "php/obtenersession.php", dat)
      .done(function(respuesta) {
        $scope.sesdata = respuesta;
        $scope.cedula = $scope.sesdata.cedula;
        $scope.ubicacion = $scope.sesdata.codmunicipio;
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log("navbar error obteniendo variables");
      });
  
  censoHttp.obtenerHospitalizacion().then(function(response){
     $scope.listservicio =  response.data;
    })

  censoHttp.obtenerTipoEstancia().then(function(response){
     $scope.listEstancia =  response.data;
    })

  function formatDate(date) {
    var month = date.getUTCMonth() + 1;
    date = date.getDate() + "/" + month + "/" + date.getFullYear();
    return date;
   } 

  $scope.buscarAutorizacion = function(type){
      if (type=='A') {
       censoHttp.obtenercamposautorizacion($scope.numero_au).then(function(response){
       if (response.data.length !=0){
          $scope.listautorizacion =  response.data;
          $scope.fecha_au         =   new Date($scope.listautorizacion[0].FECHAAUT.substring(6, 10), $scope.listautorizacion[0].FECHAAUT.substring(3, 5) - 1, $scope.listautorizacion[0].FECHAAUT.substring(0, 2));       
          $scope.fecha_nac        =   new Date($scope.listautorizacion[0].NACIMIENTO.substring(6, 10), $scope.listautorizacion[0].NACIMIENTO.substring(3, 5) - 1, $scope.listautorizacion[0].NACIMIENTO.substring(0, 2));       
          //$scope.fecha_ingreso    =   new Date($scope.listautorizacion[0].FECHAINGRESO.substring(6, 10), $scope.listautorizacion[0].FECHAINGRESO.substring(3, 5) - 1, $scope.listautorizacion[0].FECHAINGRESO.substring(0, 2));       
          $scope.ips              =  { codigo:$scope.listautorizacion[0].IPS,nombre:$scope.listautorizacion[0].NOMBREIPS}
          $scope.nomIps();
          $scope.diagnostico      =  { codigo:$scope.listautorizacion[0].CODDIAGNOSTICO,nombre:$scope.listautorizacion[0].NOMBREDIAGNOSTICO}
          $scope.nomDiagnosticos();
          $scope.municipio        =  { codigo:$scope.listautorizacion[0].UBICGEO,nombre:$scope.listautorizacion[0].NOMUBICGEO.replace($scope.listautorizacion[0].UBICGEO,'')}
          $scope.nomMun();  
          $scope.tipo_doc         =  $scope.listautorizacion[0].TIPODOCUMENTO;
          $scope.documento        =  $scope.listautorizacion[0].DOCUMENTO;
          $scope.regimen          =  $scope.listautorizacion[0].REGIMEN;
          $scope.primer_nombre    =  $scope.listautorizacion[0].PNOMBRE; 
          $scope.segundo_nombre   =  $scope.listautorizacion[0].SNOMBRE; 
          $scope.primer_apellido  =  $scope.listautorizacion[0].PAPELLIDO; 
          $scope.segundo_apellido =  $scope.listautorizacion[0].SAPELLIDO;
          $scope.sexo             =  $scope.listautorizacion[0].SEXO;
          $scope.servicioCla         =  $scope.listautorizacion[0].CLASIFICACION; 
          $scope.edad             =  Number($scope.listautorizacion[0].EDAD.substring(0,3)); 
       }else{
           swal('Informacion','datos de autorizacion no encontrado','info');
       }
      })
      }
      else{
        censoHttp.obtenercampospordocumento($scope.tipo_doc,$scope.documento).then(function(response){
       if (response.data.length !=0){
          $scope.listautorizacion =  response.data;
          //$scope.fecha_au         =   new Date($scope.listautorizacion[0].FECHAAUT.substring(6, 10), $scope.listautorizacion[0].FECHAAUT.substring(3, 5) - 1, $scope.listautorizacion[0].FECHAAUT.substring(0, 2));       
          $scope.fecha_nac        =   new Date($scope.listautorizacion[0].NACIMIENTO.substring(6, 10), $scope.listautorizacion[0].NACIMIENTO.substring(3, 5) - 1, $scope.listautorizacion[0].NACIMIENTO.substring(0, 2));       
          //$scope.fecha_ingreso    =   new Date($scope.listautorizacion[0].FECHAINGRESO.substring(6, 10), $scope.listautorizacion[0].FECHAINGRESO.substring(3, 5) - 1, $scope.listautorizacion[0].FECHAINGRESO.substring(0, 2));       
         /* $scope.ips              =  { codigo:$scope.listautorizacion[0].IPS,nombre:$scope.listautorizacion[0].NOMBREIPS}
          $scope.nomIps();
          $scope.diagnostico      =  { codigo:$scope.listautorizacion[0].CODDIAGNOSTICO,nombre:$scope.listautorizacion[0].NOMBREDIAGNOSTICO}
          $scope.nomDiagnosticos();*/
          $scope.municipio        =  { codigo:$scope.listautorizacion[0].UBICGEO,nombre:$scope.listautorizacion[0].NOMUBICGEO.replace($scope.listautorizacion[0].UBICGEO,'')}
          $scope.nomMun();  
         /* $scope.tipo_doc         =  $scope.listautorizacion[0].TIPODOCUMENTO;
          $scope.documento        =  $scope.listautorizacion[0].DOCUMENTO;*/
          $scope.regimen          =  $scope.listautorizacion[0].REGIMEN;
          $scope.primer_nombre    =  $scope.listautorizacion[0].PNOMBRE; 
          $scope.segundo_nombre   =  $scope.listautorizacion[0].SNOMBRE; 
          $scope.primer_apellido  =  $scope.listautorizacion[0].PAPELLIDO; 
          $scope.segundo_apellido =  $scope.listautorizacion[0].SAPELLIDO;
          $scope.sexo             =  $scope.listautorizacion[0].SEXO;
          //$scope.servicioCla         =  $scope.listautorizacion[0].CLASIFICACION; 
          $scope.edad             =  Number($scope.listautorizacion[0].EDAD.substring(0,3)); 
       }else{
           //swal('Informacion','Afiliado no registra en nuestra base de datos','info');
            
            swal({
            title: 'Información',
            text: "Afiliado no registra en nuestra base de datos",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Desea, realizar la busqueda por nombre'
          }).then((result) => {
            if (result==true) {
                 $scope.dialogDiag = ngDialog.open({
                template: 'views/consultaAfiliados/modalBusquedaDetalles.html',
                className: 'ngdialog-theme-plain',
                controller: 'modalValorglosactrl',
                scope: $scope
              });
              $scope.dialogDiag.closePromise.then(function (data) {
                if (data.value != "$closeButton") {
                    $scope.glosa = {
                      valorobjecion:data.value.cantidad,
                      descripcion:data.value.nombre,
                      motivo: data.value.motivo
                    }
                  }else{
                    $scope.objecionchbox = false;
                  }
              });
            
            }
          })
       }

      })
      }
  }

  $scope.showhijode = function(){
      if ($scope.hijode=== true) {
          $scope.vwcantidadhijo = false;
          $scope.eshijode ='S';
      }else{
          $scope.vwcantidadhijo = true;
          $scope.eshijode ='N'; 
          $scope.cantidadhijo =0; 
          $scope.eshijonacido ='N';  
      }
    }

  $scope.Nacidovivo = function(){
      if ($scope.nacidode=== true) {
          $scope.vwcantidadhijo = false;
          $scope.eshijonacido ='S';
      }else{
          $scope.vwcantidadhijo = true;
          $scope.eshijonacido ='N'; 
      }
    }  

  $scope.nomIps = function(){
      if ($scope.ips.codigo === undefined || $scope.ips.codigo == "") {
        $scope.ips.seleccion = "SELECCIONAR";
         $scope.ips.codigo = "0";
         $scope.ips.ubicacion = "0";
      }else{
        $scope.ips.seleccion = $scope.ips.codigo +' - '+ $scope.ips.nombre
      }       
    }
      
  $scope.nomDiagnosticos = function(){
      if ($scope.diagnostico.codigo === undefined || $scope.diagnostico.codigo == "") {
        $scope.diagnostico.seleccionC = "SELECCIONAR";
        $scope.diagnostico.codigo = "0";
      }else{
        $scope.diagnostico.seleccionC = $scope.diagnostico.codigo +' - '+ $scope.diagnostico.nombre
      }       
    } 

  $scope.nomMun = function(){
      if ($scope.municipio.codigo === undefined || $scope.municipio.codigo == "") {
        $scope.municipio.seleccion = "SELECCIONAR";
        $scope.municipio.codigo = "0";
      }else{
        $scope.municipio.seleccion = $scope.municipio.codigo +' - '+ $scope.municipio.nombre.replace($scope.municipio.codigo,'');
      }       
    }

   $scope.CrearCenso = function(){
     $scope.showhijode();
      censoHttp.CrearCenso($scope.ips.ubicacion,$scope.ips.ubicacion,$scope.tipo_doc,
                                  $scope.documento,$scope.regimen,$scope.numero_au,$scope.municipio.codigo,
                                  $scope.ips.codigo,$scope.testancia,
                                  $scope.cedula,formatDate($scope.fecha_ingreso),$scope.eshijode,$scope.eshijonacido,$scope.cantidadhijo,$scope.diagnostico.codigo).then(function(response){
        if (response.data.codigo != 0){
            $scope.btnCenso =  true;
            swal('Completado',response.data.mensaje,'success');
            censoHttp.obtenerEvolucionPaciente($scope.ubicacion,$scope.numerocenso).then(function(response){
            $scope.listevolucionpaciente =  response.data;
            $controller('censohospitalariocontroller', {
                $scope: $scope
                });
             $scope.Refrescar();
            })
          }else{
            swal('Informacion',response.data.mensaje,'error');
          }
          $scope.btnCenso =  false;
      })                             
    }    

  $scope.mostrarModalcenso = function(type,renglon){       
       $scope.renglon = renglon;
        switch(type) {
            case "I":
              $scope.dialogDiag = ngDialog.open({
                template: 'views/salud/modal/modalIps.html',
                className: 'ngdialog-theme-plain',
                controller: 'modalIpsctrl',
                scope: $scope
              });
              $scope.dialogDiag.closePromise.then(function (data) {
                if (data.value != "$document") {
                  $scope.ips = {
                    codigo:data.value.codigo,
                    nombre:data.value.nombre,
                    ubicacion:data.value.ubicacion
                  } 
                  $scope.nomIps();
                }
              });
              break;
            case "G":
              $scope.dialogDiag = ngDialog.open({
                template: 'views/salud/modal/modalValorglosa.html',
                className: 'ngdialog-theme-plain',
                controller: 'modalValorglosactrl',
                scope: $scope
              });
              $scope.dialogDiag.closePromise.then(function (data) {
                if (data.value != "$closeButton") {
                    $scope.glosa = {
                      valorobjecion:data.value.cantidad,
                      descripcion:data.value.nombre,
                      motivo: data.value.motivo
                    }
                  }else{
                    $scope.objecionchbox = false;
                  }
              });
              break;
              case "M":
              $scope.dialogDiag = ngDialog.open({
                template: 'views/salud/modal/modalMunicipios.html',
                className: 'ngdialog-theme-plain',
                controller: 'modalMunicipioctrl',
                scope: $scope
              });
              $scope.dialogDiag.closePromise.then(function (data) {
                if (data.value != "$document") {
                  $scope.municipio = {
                    codigo:data.value.codigo,
                    nombre:data.value.nombre
                  } 
                  $scope.nomMun();
                }
              });
              break;
              case "D":
              $scope.dialogDiag = ngDialog.open({
                template: 'views/salud/modal/modalDiagnosticos.html',
                className: 'ngdialog-theme-plain',
                controller: 'modalDiagnosticosctrl',
                scope: $scope
              });
              $scope.dialogDiag.closePromise.then(function (data) {
                if (data.value != "$document") {
                  $scope.diagnostico = {
                    codigo:data.value.codigo,
                    nombre:data.value.nombre
                  } 
                  $scope.nomDiagnosticos();
                }
              });
              break;
            }


        }  


}]);
