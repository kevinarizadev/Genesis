'use strict';

angular.module('GenesisApp')
 .controller('censochatcontroller',['$scope','censoHttp','ngDialog','Messages',function($scope,censoHttp,ngDialog,Messages) {

   function expand() {
  $(".search").toggleClass("close");
  $(".input").toggleClass("square");
  if ($('.search').hasClass('close')) {
    $('input').focus();
  } else {
    $('input').blur();
  }
}
$('button').on('click', expand);


    $scope.messages = [];
     $scope.chats = {};
    Messages.user({id: 'kevin', name: 'kevin',recep:'S', fecha: 'xxx',hora: 'xx',usu:'xxx'});

    censoHttp.obtenerChatdisponibles().then(function(response){
     $scope.listchat =  response.data;
    })



    $scope.hiden = true;
    $scope.imagen = false;

    $scope.obtenerchat = function (numerocenso,ubicacion,tipodocumento,documento){
    $scope.imagen = true;
    $scope.hiden = false;
    Messages.user({id: numerocenso, name: ubicacion});
    $scope.numerocenso =  numerocenso;
    $scope.ubicacion = ubicacion;
    $scope.tipodoc = tipodocumento;
    $scope.documento = documento;
    var id  = '#f'+numerocenso+ubicacion;
    $(id).removeClass("activechat");
    //
    // censoHttp.obtenerChat('1',numerocenso,ubicacion).then(function(response){
    //      $scope.messages =  response.data;
    //
    //                 var altura = $('#mensajes').height();
    //                 $('#mensajes').scrollTop(altura);
    //    })
    // }

    censoHttp.obtenerChat('1',numerocenso,ubicacion).then(function(response){
         $scope.messages =  response.data;
         $scope.down();
        })
    }

    $scope.down = function(){
      setTimeout(function() {
        $scope.alto = $('#lista_chat').height();//lista_chat
        $('#mensajes').scrollTop($scope.alto);
      }, 300)
    }


    Messages.receive(function(message, isPrivate) {
        censoHttp.obtenerChatNuevo('1',message.user.id,message.user.name).then(function(response){
         if (response.data[0].CANTIDAD == '1'){
                censoHttp.obtenerChatdisponibles().then(function(response){
                    $scope.listchat =  response.data;
            })
            }else{
                 if (message.user.recep == 'A' && message.user.id == $scope.numerocenso){
                        var messtest = { "FECHA":message.user.fecha,"HORA":message.user.hora,"NOMBRE":message.user.usu,"MENSAJE":message.data};
                        $scope.messages.push(messtest);
                 }else{
                        var id  = '#f'+message.user.id+message.user.name;
                            if (message.user.id == $scope.numerocenso){
                                $(id).removeClass("activechat");
                            }else{
                                $(id).addClass("activechat");
                            }
                    }
                }
        })
    });


    $scope.send = function() {
      censoHttp.insertarChat('1',$scope.numerocenso,$scope.ubicacion,$scope.respuesta).then(function(response){
         $scope.resp =  response.data;
            if ($scope.resp.length != 0) {
                 var message = {
                    to: 'kevin',
                    data: $scope.respuesta ,
                    user: Messages.user()
                };
                Messages.user({fecha:$scope.resp[0].FECHA, hora: $scope.resp[0].HORA,usu:$scope.resp[0].NOMBRE});
                Messages.send(message);
                //
                $scope.messages.push($scope.resp[0]);
                $scope.respuesta='';
                $scope.vwchat = true;
                $scope.down();
            }else{

            }
       })

    };
}]);
