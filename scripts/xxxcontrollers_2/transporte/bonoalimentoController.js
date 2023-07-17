'use strict';
angular.module('GenesisApp')
.controller('bonoalimentoController', ['$scope', '$http',
function ($scope, $http) {
  $(document).ready(function(){
    var dat = {prov : 'navb'}
    $.getJSON( "php/obtenersession.php", dat)
    .done(function(respuesta) {
      $scope.sesdata = respuesta;
      $scope.cedula = $scope.sesdata.cedula;
      $scope.jefe_solicitud();
      $scope.obtener_tabs();
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
      console.log("navbar error obteniendo variables");
    });


    $scope.listar_mal();
  });
  $scope.setTab = function(newTab){
    $scope.tab = newTab;
    $(".tabI").removeClass("tabactiva");
    $(".tabII").removeClass("tabactiva");
    switch (newTab) {
      case 1:
      $(".tabI").addClass("tabactiva");
      $scope.Title = "Registro tickets";
      break;
      case 2:
      $(".tabII").addClass("tabactiva");
      $scope.Title = "Autorización solicitud transporte";
      break;
      default:
    }
  }
  $scope.isSet = function(tabNum){
    return $scope.tab === tabNum;
  }
  $scope.mesa_alimentos = true;
  $scope.setTab(1);
  $scope.listar_jef = function(){
    $http({
      method: 'POST',
      url: "php/transporte/alimentos/alimentos.php",
      data: {function: 'listar_jef'}
    }).then(function (response) {
      $scope.refrescar();
    });
  }
  $scope.jefe_solicitud = function(){
    $http({
      method: 'POST',
      url: "php/transporte/alimentos/alimentos.php",
      data: {function: 'jefe_solicitud',
      cedula: $scope.cedula
    }
  }).then(function (response) {
    $scope.lista_jefe = response.data;
    if ($scope.lista_jefe["0"].CODIGO == 0) {
      $scope.alimento = true;
    }else {
      $scope.alimento = false;
    }
  });}
  $scope.obtener_tabs = function(){
    $http({
      method: 'POST',
      url: "php/transporte/alimentos/alimentos.php",
      data: {function: 'tabs',
      cedula: $scope.cedula
    }
  }).then(function (response) {
    if (response.data["0"].CODIGO == 1) {
        $scope.admin = false;
    }else {
      $scope.admin = true;
    }
    });
    }
  $scope.refresh = function(){
  $scope.jefe_solicitud();
  $scope.listar_mal();
}
  $scope.aprobar = function(codigo, ubicacion){
  $http({
    method: 'POST',
    url: "php/transporte/alimentos/alimentos.php",
    data: {function: 'aprobar',
    cedula: $scope.cedula,
    codigo: codigo,
    ubicacion: ubicacion
  }
}).then(function (response) {
  $scope.refresh();
});
}
  $scope.rechazar = function(codigo_jef , ubicacion_jef){
  $http({
    method:'POST',
    url: "php/transporte/alimentos/alimentos.php",
    data: {function:'rechazar',
    cedula :'RE',
    codigo:codigo_jef,
    ubicacion: ubicacion_jef

  }
}).then(function(response){
  $scope.refresh();
});
}
  $scope.facturar = function(codigo, ubicacion){
   if  ($scope.cedula != '1042448588' && $scope.cedula != '72334391' && $scope.cedula !='1001887825' && $scope.cedula != '1129537597'){        
    $http({
    method: 'POST',
    url: "php/transporte/alimentos/alimentos.php",
    data: {function: 'aprobar',
    cedula: $scope.cedula,
    codigo: codigo,
    ubicacion: ubicacion
  }
}).then(function (response) {
  $scope.refresh();
});
}else {
  swal({
    text: "Ingrese valor a entregar",
    type: 'question',
    input: 'text',
    inputValue: 0,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result!=0) {
      swal('Notificación','Aprobado Correctamente','success')
      $http({
        method:'POST',
        url: "php/transporte/alimentos/alimentos.php",
        data: {function:'ACTUALIZAR_TICKET_AL',
        valor : result,
        ubicacion: ubicacion,
        numeroma: codigo
      }
    }).then(function(response){
      $scope.refresh();
    });
  }else {
    swal('Notificación','Ingrese un valor para continuar','error')
  }
})
  }
}
  $scope.listar_mal = function(){
  $http({
    method:'POST',
    url: "php/transporte/alimentos/alimentos.php",
    data: {function:'obtener_MAL'}
  }).then(function(response){
    $scope.mesa_alimentos = false;
    $scope.mal = response.data;
  });
}
}])
