'use strict';
angular.module('GenesisApp')
.controller('chatcontroller',['$scope','censoHttp','ngDialog','Messages',function($scope,censoHttp,ngDialog,Messages) {
  $scope.messages = [];
 Messages.user({id: 'kevin', name: 'kevin',recep:'A', fecha: 'xxx',hora: 'xx',usu:'xxx'});



  censoHttp.obtenerChat('1',$scope.numerocenso,$scope.ubicacion).then(function(response){
    Messages.user({id: $scope.numerocenso, name: $scope.ubicacion});

    $scope.vwchatt =  false;
    if ( response.data.codigo != -1){
      $scope.messages =  response.data;
      $scope.down();
      // $("#scroll-bottom").animate({ scrollTop: $(document).height() }, 1000);
      //$scope.vwchatt =  true;
      $scope.vwchat = true;

    }else{
      //$scope.vwchatt =  false;
      $scope.vwchat =  false;
    }
      $scope.down();
  })
  // Receive Messages
  Messages.receive(function(message, isPrivate) {
    if (message.user.recep == 'S' && message.user.id == $scope.numerocenso){
        var messtest = { "FECHA":message.user.fecha,"HORA":message.user.hora,"NOMBRE":message.user.usu,"MENSAJE":message.data};
        $scope.messages.push(messtest);
        $scope.down();
     }
  });
  // Send Messages
  $scope.send = function() {
    censoHttp.insertarChat('1',$scope.numerocenso,$scope.ubicacion,$scope.respuesta).then(function(response){
      $scope.resp =  response.data;
      if ($scope.resp.length != 0) {
        var message = {to: 'kevin',data: $scope.respuesta ,user: '123456789'};
        Messages.user({fecha:$scope.resp[0].FECHA, hora: $scope.resp[0].HORA,usu:$scope.resp[0].NOMBRE});
        Messages.send(message);
        $scope.messages.push($scope.resp[0]);
        $scope.respuesta='';
        $scope.vwchat = true;
        $scope.down();
      }else{

      }
    })

  };

  $scope.down = function(){
    setTimeout(function() {
      $scope.alto = 10000;//$('#ventana').height()
      $('#modal_mensajes').scrollTop($scope.alto);
    }, 300)
  }

}]);
