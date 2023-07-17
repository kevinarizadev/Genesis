  'use strict';
  angular.module('GenesisApp')
  .controller('calificamecontroller',['$scope','$http','notification','calificacionHttp','ngDialog',
    function($scope,$http,notification,calificacionHttp,ngDialog) {
      $('#rating').addRating();
      $scope.comentario= "";
      $scope.puntaje =0;
      $scope.lista_numero=" ";
      $scope.estadoacas = true;
      $scope.estadoencuesta = false;


      var dat = {prov : 'navb'}
      $.getJSON( "php/obtenersession.php", dat)
      .done(function(respuesta) {
        $scope.sesdata = respuesta;
        $scope.cedula = $scope.sesdata.cedula;
        $scope.ubicacion = $scope.sesdata.codmunicipio;
        calificacionHttp.obteneracas($scope.cedula).then(function (response) {
          if (response.data.codigo!=-1){
              $scope.acas = response.data;
          }
        })
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log("navbar error obteniendo variables");
      });

      $scope.filtroacas = function(){
         $scope.estadoacas = true;
         $scope.estadoencuesta = true;
      }

       $scope.opcioncerrar = function(){
          $scope.estadoacas = true;
      }

      $scope.mostrarinformacion = function () {
         if ($scope.lista_numero!='0') {
         $scope.estadoencuesta = false;
        calificacionHttp.mostrarinformacion($scope.lista_numero,$scope.cedula).then(function (response) {
          $scope.nombre_soporte  = response.data[0].NOMBRE;
          $scope.cargo    =   response.data[0].CARGO;
          $scope.ranking  =  response.data[0].PUNTAJE;
          if (response.data[0].IMAGEN==null){$scope.imagen = 'assets/images/cajacopi.png'}else{$scope.imagen   =  response.data[0].IMAGEN;}
          $scope.numeroacas = response.data[0].NUMERO;
          $scope.tituloacas = response.data[0].TITULO;
          $scope.descripcion = response.data[0].DESCRIPCION;
          $scope.identificacion = response.data[0].IDENTIFICACION;
          $scope.estadoacas = false;
        })
       }
      }


     $scope.guardarEncuesta = function () {
        $scope.puntaje = $('#rating').val();
        if ($scope.puntaje !=0){
          calificacionHttp.insertarcalificacion( $scope.lista_numero,$scope.ubicacion,$scope.identificacion,$scope.puntaje,$scope.comentario).then(function (response) {
            if (response.data.codigo==1){
              notification.getNotification('success', response.data.mensaje, 'Notificacion');
               //$scope.estadoacas = true;
               calificacionHttp.obteneracas($scope.cedula).then(function (response) {
                 if (response.data.codigo!=-1){
                    $scope.acas = response.data;
                    }else{
                      $scope.acas ='';
                      $scope.lista_numero ='0';
                    }
                })
                $scope.estadoencuesta = true;
                  calificacionHttp.mostrarinformacion($scope.lista_numero,$scope.cedula).then(function (response) {
                  $scope.ranking  =  response.data[0].PUNTAJE;
                  })
            }else{
              notification.getNotification('error', response.data.mensaje, 'Notificacion');
            }
          })}else{
           notification.getNotification('info', 'no se puede guardar la encuenta sin calificarla', 'Notificacion');
         }
          $scope.comentario ="";
       }

       $scope.infoReporte = function (){
          ngDialog.open({
                  template: 'views/calificame/infocalificame.html',
                  controller: 'infocalificamecontroller',
                  controllerAs: 'ifcactrl',
                  scope: $scope
            });
          }
     }]);




