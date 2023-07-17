'use strict';
angular.module('GenesisApp')
.controller('adminpollamundialController',['$http','$scope','cfpLoadingBar',
function($http,$scope,cfpLoadingBar) {
  $(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('#modal12').modal();
  });
  $scope.premium=true;
  $scope.celular = null;
  $scope.Title = "Registrar Partidos";
  $scope.resultado1 = "";
  $scope.resultado3 = "";
  $scope.resultado5 = "";
  $scope.resultado2 = "";
  $scope.resultado4 = "";
  $scope.resultado6 = "";


  $scope.CalcularPuntaje=function(){
    $http({
      method: 'POST',
      url: "php/pollamundial/funcmundial.php",
      data: {
        function: 'CalcularPuntaje'

      }
    }).then(function (response) {
    
      if (true) {
        swal('Completado',"Marcador registrado",'success');
      }


    });
  }

  $scope.FinalizarPartido = function(intIdPartido){
    $scope.IdPartido = intIdPartido;
    $http({
      method: 'POST',
      url: "php/pollamundial/funcmundial.php",
      data: {
        function: 'FinalizarPartido',
        intIdPartido:$scope.IdPartido
      }
    }).then(function (response) {

      $http({
        method: 'POST',
        url: "php/pollamundial/funcmundial.php",
        data: {
          function: 'RetornoPartido',
          intIdPartido:$scope.IdPartido
        }
      }).then(function (response) {
        $scope.equiposid = response.data;

        $scope.idfinalizado1 = $scope.equiposid[0].IdPartidoEquipoPorGrupo;
        $scope.logo1 = $scope.equiposid[0].LogoEquipo;
        $scope.nombre1 = $scope.equiposid[0].NombreEquipo;
        $scope.idfinalizado2 = $scope.equiposid[1].IdPartidoEquipoPorGrupo;
        $scope.logo2 = $scope.equiposid[1].LogoEquipo;
        $scope.nombre2 = $scope.equiposid[1].NombreEquipo;
        $scope.idpartido = $scope.equiposid[0].IdPartido;
        $('#modal12').modal('open');

      });

    });
  }

  $scope.init = function(){
    var dat = {prov : 'navb'}
    $.getJSON( "php/obtenersession.php", dat)
    .done(function(respuesta) {
      $scope.sesdata = respuesta;
      $scope.cedula = $scope.sesdata.cedula;
      $http({
        method: 'POST',
        url: "php/pollamundial/funcmundial.php",
        data: {
          function: 'validacliente', cedula:$scope.cedula
        }
      }).then(function (response) {
        $scope.cliente = response.data[0];
        if ($scope.cliente.Premium==1) {
          $scope.premium=false;
        } else {
          $scope.premium=true;
        }
        $http({
          method: 'POST',
          url: "php/pollamundial/funcmundial.php",
          data: {
            function: 'listarPartidosFaseUno',
            cedula:$scope.cedula
          }
        }).then(function (response) {
          $scope.teams = response.data;
          //console.log(response.data);
        });
      });
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
      console.log("navbar error obteniendo variables");
    });
  }

  $scope.init();

  //FUNCIONAMIENMTO DE LAS TAB
$scope.close = function(){
  $('#modal12').modal('close');
}

$scope.EnviarResultado = function(){
    var id="";
    var goles ="";
    $scope.count =0;
    for (var i = 1; i <= 6; i++) {
      goles = $("#input"+i).val();
      if (i<=2) {
        $scope.tipo = 1;
      }else if(i<=4) {
        $scope.tipo = 2;
      }
      else {
        $scope.tipo = 3;
      }

      if(i%2==0){
        id = $scope.idfinalizado2;
      }else{
        id = $scope.idfinalizado1;
      }
      $http({
        method: 'POST',
        url: "php/pollamundial/funcmundial.php",
        data: {
          function: 'RegistrarMarcadores',
          id:id,
          tipo:$scope.tipo,
          goles:goles
        }
      }).then(function (response) {
        $scope.count = $scope.count + Number(response.data);
      });
    }
    setTimeout(function () {
      if ($scope.count==6) {
         $scope.CalcularPuntaje();
        swal('Completado',"Marcador registrado",'success');
        $('#modal12').modal('close');
        $scope.EstableceOrdenDeLosEquiposPorGrupo($scope.idpartido);
        $scope.init();
        $scope.resultado1 = "";
        $scope.resultado3 = "";
        $scope.resultado5 = "";
        $scope.resultado2 = "";
        $scope.resultado4 = "";
        $scope.resultado6 = "";
      }else {
        swal('Error',"No se pudieron registrar sus resultados",'warning');
      }
    }, 5000);
  }

      // intIdPartido
    $scope.ActualizarApuesta = function(intIdPartido){
      $http({
        method: 'POST',
        url: "php/pollamundial/funcmundial.php",
        data: {
          function: 'ActualizarApuesta',
          intIdPartido:intIdPartido
        }
      }).then(function (response) {
        //$scope.EstableceOrdenDeLosEquiposPorGrupo();
        //console.log(response.data);
      });
    }

$scope.EstableceOrdenDeLosEquiposPorGrupo=function(intIdPartido){
 $http({
        method: 'POST',
        url: "php/pollamundial/funcmundial.php",
        data: {
          function: 'EstableceOrdenDeLosEquiposPorGrupo',
          intIdPartido:intIdPartido
        }
      }).then(function (response) {
       // console.log(response.data);
      });
    }  

}])

