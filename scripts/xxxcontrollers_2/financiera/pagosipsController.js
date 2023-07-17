'use strict';
angular.module('GenesisApp')
.controller('pagosipsController',['$scope','consultaHTTP','notification','cfpLoadingBar','$http','$window','$filter',
function($scope,consultaHTTP,notification,cfpLoadingBar,$http,$window,$filter) {
  
   //(function() {
    $(document).ready(function () {
      $scope.anno = '0';
      $scope.periodo = '0';
      $scope.valor_total = '0';
      $scope.nitips = '';
      $scope.nomdocumento = '';
      $scope.ver_documento = true;
      $scope.ver_documento_det = true;
      $scope.ver_documento_det_det = true;
      $scope.inactivenit = false;
     //datos de sesion como cedula y ubicacion
      var dat = {prov : 'navb'}
      $.getJSON( "php/obtenersession.php", dat)
      .done(function(respuesta) {
        $scope.sesdata = respuesta;
        $scope.nit = $scope.sesdata.nit;
        $scope.rol = $scope.sesdata.rolcod;
          console.log($scope.nit);
          //if ($scope.rol == '141' || $scope.nit != undefined){
        if ($scope.nit != undefined){
          $scope.nitips = $scope.nit;
          $scope.inactivenit = true;
          $http({
            method:'POST',
            url:"php/siau/CodigoUrgencia/Ccodigourgencia.php",
            data: {function:'validarips',ips:$scope.nitips}
          }).then(function(response){
            if(response.data.existe != "0"){
              $scope.nomips = response.data.Nombre;
            }else{
              $scope.nomips = response.data.Nombre;
              //$scope.nitips = '';
            }
          })
        }else{
          $scope.inactivenit = false;
        }
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log("navbar error obteniendo variables");
      });
      //Fin datos de sesion como cedula y ubicacion
  //}());
  });

  setInterval(function(){
     var dat = {prov : 'navb'}
      $.getJSON( "php/obtenersession.php", dat)
      .done(function(respuesta) {
        $scope.sesdata = respuesta;
        $scope.nit = $scope.sesdata.nit;
        $scope.rol = $scope.sesdata.rolcod;
        $scope.usu = $scope.sesdata.usu;
        
		if ($scope.nit == '' || $scope.nit == null || $scope.nit == undefined || $scope.nit == 0 || $scope.nit == '0'){
          swal({
            title: 'Su sesion de Genesis ha caducado',
            type: 'warning',
            text: 'En 5 segundos terminara su sesion',
            timer: 5000,
            onOpen: () => {
              swal.showLoading()
            }
          }).then((result) => {
            if (result.dismiss === 'timer') {
              window.location.href = 'php/cerrarsession.php';
            }
          }).catch(function(error) {
            window.location.href = 'php/cerrarsession.php';
          });
        }else{
          if ($scope.rol == '141'){
            //$scope.nitips = $scope.nit;
            $scope.inactivenit = true;
            $http({
              method:'POST',
              url:"php/siau/CodigoUrgencia/Ccodigourgencia.php",
              data: {function:'validarips',ips:$scope.nitips}
            }).then(function(response){
              if(response.data.existe != "0"){
                $scope.nomips = response.data.Nombre;
              }else{
                $scope.nomips = response.data.Nombre;
                //$scope.nitips = '';
              }
            })
         }else{
            $scope.inactivenit = false;
         }
        }
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log("navbar error obteniendo variables");
      });
      //Fin datos de sesion como cedula y ubicacion
  }, 180000);
 
  $http({
    method:'POST',
    url:"php/financiera/pagosips.php",
    data: {function:'obteneranno'}
  }).then(function(response){
    $scope.annos = response.data;
  })

  $scope.validarips = function() {
    $http({
      method:'POST',
      url:"php/siau/CodigoUrgencia/Ccodigourgencia.php",
      data: {function:'validarips',ips:$scope.nitips}
    }).then(function(response){
      if(response.data.existe != "0"){
        $scope.nomips = response.data.Nombre;
      }else{
        $scope.nomips = response.data.Nombre;
        //$scope.nitips = '';
      }
    })
  }

  $scope.obtenerperiodo = function(){
    if($scope.anno != null && $scope.anno != undefined && $scope.anno != '' && $scope.anno != ' ' && $scope.anno != '0'){
      $http({
        method:'POST',
        url:"php/financiera/pagosips.php",
        data: {function:'obtenerperiodo',panno:$scope.anno}
      }).then(function(response){

        $scope.periodos = response.data;

      })
    }
  }

  $scope.buscarDocumento = function(){
    $scope.limpiar();
    swal({title: 'Cargando...'});
    swal.showLoading();
    $http({
      method:'POST',
      url:"php/financiera/pagosips.php",
      data: {function:'obtenerdocumento',panno:$scope.anno, pperiodo:$scope.periodo, ptercero:$scope.nitips}
    }).then(function(response){

      if(response.data.length > 0){
        $scope.documentos = response.data;
        $http({
          method:'POST',
          url:"php/financiera/pagosips.php",
          data: {function:'obtenervalortotal',panno:$scope.anno, pperiodo:$scope.periodo, ptercero:$scope.nitips}
        }).then(function(response){
          $scope.valor_total = response.data["0"].valor;
          $scope.ver_documento =  false;
          swal.close();
        })
      }else{
        swal.close();
        swal('Importante','No hay Pagos Registrados!','info');
      }
    })
  }

  $scope.buscarDocumentoDet = function(doc){
    $scope.ver_documento_det_det =  true;
     swal({title: 'Cargando...'});
    swal.showLoading();
    $http({
      method:'POST',
      url:"php/financiera/pagosips.php",
      data: {function:'obtenerdocumentodet',panno:$scope.anno, pperiodo:$scope.periodo, ptercero:$scope.nitips, pdocumento:doc.cruc_documento}
    }).then(function(response){
      $scope.documentos_det = response.data;
      $scope.ver_documento_det =  false;
      $scope.nomdocumento = doc.documento_concepto;
      swal.close();
    })
  }

  $scope.buscarDocumentoDetDet = function(doc){
     swal({title: 'Cargando...'});
    swal.showLoading();
    $http({
      method:'POST',
      url:"php/financiera/pagosips.php",
      data: {function:'obtenerdocumentodetdet',panno:$scope.anno, pperiodo:$scope.periodo, ptercero:$scope.nitips,
      pdocumento:doc.cruc_documento, pnumero:doc.crun_numero , pubicacion:doc.crun_ubicacion}
    }).then(function(response){
      $scope.documentos_det_det = response.data;
      $scope.ver_documento_det_det =  false;
      swal.close();
    })
  }

  $scope.limpiar = function(){
    $scope.valor_total = '0';
    $scope.nomdocumento = '';
    $scope.ver_documento = true;
    $scope.ver_documento_det = true;
    $scope.ver_documento_det_det = true;
  }

  $scope.exporta_pago = function(doc){
    //   $http({
    //     method:'POST',
    //     url:"php/financiera/pagosips.php",
    //     data: {function:'obtenerexcel',panno:$scope.anno, pperiodo:$scope.periodo, ptercero:$scope.nitips,
    //                                    pdocumento:doc.cruc_documento, pnumero:doc.crun_numero , pubicacion:doc.crun_ubicacion}
    //   }).then(function(response){
    //
    //       $scope.documentos_det_det = response.data;
    //   })
    window.open("php/financiera/exportpagos.php?panno="+$scope.anno+
                                            "&pperiodo="+$scope.periodo+
                                            "&ptercero="+$scope.nitips+
                                            "&pdocumento="+doc.cruc_documento+
                                            "&pnumero="+doc.crun_numero+
                                            "&pubicacion="+doc.crun_ubicacion);
                                          }

}]);
