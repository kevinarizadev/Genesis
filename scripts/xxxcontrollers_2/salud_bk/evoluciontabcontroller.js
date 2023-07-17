'use strict';
angular.module('GenesisApp')
 .controller('evoluciontabcontroller',['$scope','censoHttp','ngDialog','$controller',function($scope,censoHttp,ngDialog,$controller) {
  var self=this;
   $scope.fecha_Cierre = new Date();
   $scope.hospitalizacion = ' ';
   $scope.motivoglosa = ' ';
   $scope.eventoadv = ' ';
   $scope.eventoadvdeta = ' ';
   $scope.showeventoadv = true;
   $scope.showfechacierre =  true;
   $scope.glosa = {
      valorobjecion:0,
      descripcion:'',
      motivo:0
    }
   $scope.valoradverso;
   $scope.responsable = $scope.cedula; 
   $scope.btnEvolucion =  false;
   $scope.motivo_egreso = '0'; 
   $scope.cerrarau = false;
   

   censoHttp.obtenerHospitalizacion().then(function(response){
     $scope.listhospitalizaicon =  response.data;
    })

  censoHttp.obtenerMotivoEgreso().then(function(response){
     $scope.listMotivo =  response.data;
    })

   censoHttp.obtenerEventosadv().then(function(response){
     $scope.listeventoadv =  response.data;
    })

   function formatDate(date) {
    var month = date.getUTCMonth() + 1;
    date = date.getDate() + "/" + month + "/" + date.getFullYear();
    return date;
   }

   $scope.obtenerEvolucionPaciente = function(ubicacion,numerocenso,estado){
    $scope.numerocenso = numerocenso;
    $scope.estado_procesado = estado;
    if ($scope.estado_procesado==='PROCESADO'){$scope.esprocesado= true; }else{$scope.esprocesado= false;}
   censoHttp.obtenerEvolucionPaciente(ubicacion,numerocenso).then(function(response){
     $scope.listevolucionpaciente =  response.data;
     $scope.Afiliadoevo = response.data[0].AFILIADO;

    })
   }

   $scope.ObtenerEvtDetalle =  function(){
     censoHttp.obtenerEventosadvdeta($scope.eventoadv).then(function(response){
     if($scope.eventoadv!=0){ 
        $scope.listeventoadvdeta =  response.data;
      }
    })
   }

    $scope.showeventoadverso = function(){
      if ($scope.adverso=== true) {
          $scope.showeventoadv = false;
          $scope.valoradverso ='S';
      }else{
          $scope.showeventoadv = true;
          $scope.valoradverso ='N';   
      }
    }


    $scope.clearevo =  function(){
      $scope.fecha_Cierre = new Date();
      $scope.hospitalizacion = ' ';
      $scope.motivoglosa = ' ';
      $scope.eventoadv = ' ';
      $scope.eventoadvdeta = ' ';
      $scope.showeventoadv = true;
      $scope.showfechacierre =  true;
      $scope.glosa = {
        valorobjecion:0,
        descripcion:'',
        motivo:0
      }
      $scope.valoradverso;
      $scope.responsable = $scope.cedula; 
      $scope.btnEvolucion =  false;
      $scope.motivo_egreso = '0'; 
      $scope.cerrarau = false;
      $scope.Descripcionevo='';
       $scope.diagnostico.seleccion = "SELECCIONAR";
    }

    $scope.showfecha = function(){
      if ($scope.cerrarau=== true) {
          $scope.showfechacierre = false;
          $scope.valorcerrarauditoria ='S';

      }else{
         $scope.showfechacierre =  true;
         $scope.valorcerrarauditoria ='N';
         $scope.motivo_egreso = '0';
      }
    }

    $scope.showDescripcionobjecion = function(type){
      if (type = 'A'){
      if ($scope.objecionchbox === true) {
         $scope.mostrarModal('G','1');
         $scope.enblvalorobj =  false;
         $scope.valorglosa ='S';
      }else{
         $scope.valorglosa ='N';
         $scope.glosa.descripcion = '';
         $scope.glosa.motivo= 0;
         $scope.glosa.valorobjecion = 0;
      }}else{
         $scope.enblvalorobj =  true;
      }       
    }

    $scope.showDescripcionobjecionval = function(type){
      if (type = 'A'){
      if ($scope.objecionchbox === true) {
         $scope.enblvalorobj =  false;
         $scope.valorglosa ='S'; 
      }else{
        $scope.valorglosa ='N'; 
      }}else{
         $scope.enblvalorobj =  true;
      }       
    }

    $scope.nomDiagnostico = function(){
      if ($scope.diagnostico.codigo === undefined || $scope.diagnostico.codigo == "") {
        $scope.diagnostico.seleccion = "SELECCIONAR";
      }else{
        $scope.diagnostico.seleccion = $scope.diagnostico.codigo +' - '+ $scope.diagnostico.nombre
      }       
    }

    $scope.insertarEvolucion = function(){
      $scope.showeventoadverso();
      $scope.showfecha();
      $scope.showDescripcionobjecionval('A');
      //if ( $scope.cerrarau == false && $scope.motivo_egreso == '0'){
      censoHttp.insertarEvolucion($scope.numerocenso,$scope.ubicacion,$scope.hospitalizacion,
                                  $scope.diagnostico.codigo,$scope.glosa.valorobjecion,$scope.Descripcionevo,
                                  $scope.valoradverso,$scope.eventoadv,$scope.eventoadvdeta,
                                  $scope.responsable,$scope.valorglosa,$scope.glosa.descripcion,
                                  '',$scope.glosa.motivo,$scope.valorcerrarauditoria, formatDate($scope.fecha_Cierre),$scope.motivo_egreso).then(function(response){
        if (response.data.codigo != 0){
            $scope.btnEvolucion =  true;
            swal('Completado',response.data.mensaje,'success');
            censoHttp.obtenerEvolucionPaciente($scope.ubicacion,$scope.numerocenso).then(function(response){
            $scope.listevolucionpaciente =  response.data;
            $scope.clearevo();
           /* $controller('censohospitalariocontroller', {
                $scope: $scope
                });
             $scope.Refrescar();*/
            })

          }else{
            swal('Completado',response.data.mensaje,'error');
          }
           if (response.data.codigo == 2){
               $scope.btnEvolucion =  true; 
           }else{
               $scope.btnEvolucion =  false; 
           }
      })
    //}else
    //{
     //swal('Notificacion','Se debe seleccionar la opcion de cerrar auditoria y el motivo del egreso.','error');
       // }                                  
    }

    $scope.mostrarModal = function(type,renglon){       
       $scope.renglon = renglon;
        switch(type) {
            case "R":
                 ngDialog.open({
                  template: 'views/salud/reglosas.html',
                   className: 'ngdialog-theme-plain',
                   controller: 'reversarglosacontroller',
                   controllerAs: 'revercoctrl',
                   scope: $scope
                });
              break;
            case "E":
                ngDialog.open({
                  template: 'views/salud/evoluciondetalle.html',
                  className: 'ngdialog-theme-plain',
                  controller: 'evoluciondetallecontroller',
                  controllerAs: 'evodetacoctrl',
                  scope: $scope
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
                  $scope.nomDiagnostico();
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
            }
        }

}]);
