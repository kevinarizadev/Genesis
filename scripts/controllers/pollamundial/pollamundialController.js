'use strict';
angular.module('GenesisApp')
.controller('pollamundialController',['$http','$scope','cfpLoadingBar',
function($http,$scope,cfpLoadingBar) {

$scope.premium=true;
$scope.celular = null;
$scope.basico='0';

//FUNCIONAMIENMTO DE LAS TAB
    $scope.setTab = function(newTab){
      $scope.tab = newTab;
      $(".tabI").removeClass("tabactiva");
      $(".tabII").removeClass("tabactiva");
      $(".tabIII").removeClass("tabactiva");
       $(".tabIV").removeClass("tabactiva");
      switch (newTab) {
        case 1:
        $(".tabI").addClass("tabactiva");
        $scope.Title = "PARTIDOS";
        $scope.tiporegistro='0';
        break;
        case 2:
        $(".tabII").addClass("tabactiva");
        $scope.Title = "PARTIDOS PREMIUM";
        $scope.tiporegistro='1';
        break;
        case 3:
        $(".tabIII").addClass("tabactiva");
        $scope.Title = "Tabla De Clasificacion";
        // $scope.rankingpremiun();
        break;
        case 4:
        $(".tabIV").addClass("tabactiva");
        $scope.Title = "Resumen";
        //$scope.listarresumen();
        $scope.listarresumen_premium();
        $scope.listarresumen_basico();
        break;
        default:

      }
    }
    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    }
    $scope.setTab(1);

    //VALIDO CLIENTE

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
           $scope.celular = $scope.cliente.Celular;
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
              cedula:$scope.cedula}
        }).then(function (response) {           
           $scope.teams = response.data;
           $scope.teamsp=response.data;
           console.log(response.data);
        });
        
          $scope.table = $('#rankingp').DataTable( {
          dom: 'lBsfrtip',
          buttons: [],
          ajax: {
          url: 'php/pollamundial/rankingpolla.php?cedula='+$scope.cedula+'&TipoRanking='+$scope.cliente.Premium,
          dataSrc: ''
          },
          columns: [
          { data: "PosicionRanking" },
          { data: "Nombres" },
          { data: "CantidadPartidosParticipados" },
          { data: "Area" },
          { data: "Seccional" },
          { data: "PuntosTotales" }
          ],
          language: {
          "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
          },
          lengthMenu: [[5, 10, 50,-1], [5, 10, 50,'Todas']],
          order: [[ 5, "desc" ]]
          } );

           $scope.table = $('#rankingeps').DataTable( {
          dom: 'lBsfrtip',
          buttons: [],
          ajax: {
          url: 'php/pollamundial/rankingpolla.php?cedula='+$scope.cedula+'&TipoRanking='+$scope.basico,
          dataSrc: ''
          },
          columns: [
          { data: "PosicionRanking" },
          { data: "Nombres" },
          { data: "CantidadPartidosParticipados" },
          { data: "Area" },
          { data: "Seccional" },
          { data: "PuntosTotales" }
          ],
          language: {
          "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
          },
          lengthMenu: [[5, 10, 50,-1], [5, 10, 50,'Todas']],
          order: [[ 5, "desc" ]]
          } );
   


        });
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
      console.log("navbar error obteniendo variables");
    });

$scope.InsertarApuesta=function (IdPartido,IdEquipo1,IdEquipo2,index,NomEquipo1,NomEquipo2) {
  $scope.indexp = index+1;
  $scope.p1=$('#fa'+$scope.indexp).val();
  $scope.p2=$('#fs'+$scope.indexp).val();
  $scope.p1p=$('#fap'+$scope.indexp).val();
  $scope.p2p=$('#fsp'+$scope.indexp).val();
  $scope.NomEquipo1=NomEquipo1;
  $scope.NomEquipo2=NomEquipo2;
  if ($scope.p1 != "" && $scope.p2!="") {
    $http({
      method: 'POST',
      url: "php/pollamundial/funcmundial.php",
      data: {
        function: 'InsertarApuesta', 
        intIdPartido:IdPartido,
        strIdCliente:$scope.cliente.GUID,
        strTipoApuesta:$scope.tiporegistro}
      }).then(function (response) {
        swal('Completado','Marcador Registrado','success');
        // if($scope.tiporegistro == 1){
        //   $scope.send_message($scope.p1p,$scope.p2p);
        // }else{
        //   $scope.send_message($scope.p1,$scope.p2);
        // }
        
        $scope.inst = response.data;
        $http({
          method: 'POST',
          url: "php/pollamundial/funcmundial.php",
          data: {
            function: 'InsertarDetalleApuesta', 
            strIdApuesta:$scope.inst,
            intIdEquipo:IdEquipo1,
            intGolesEquipo: $scope.p1}
          }).then(function (response) {
            $scope.resp = response.data;
          });
          $http({
            method: 'POST',
            url: "php/pollamundial/funcmundial.php",
            data: {
              function: 'InsertarDetalleApuesta', 
              strIdApuesta:$scope.inst,
              intIdEquipo:IdEquipo2,
              intGolesEquipo: $scope.p2}
            }).then(function (response) {
              $scope.resp = response.data;
            });
             $http({
           method: 'POST',
           url: "php/pollamundial/funcmundial.php",
           data: {
              function: 'listarPartidosFaseUno',
              cedula:$scope.cedula}
        }).then(function (response) {           
           $scope.teams = response.data;
           $scope.teamsp=response.data;
           console.log(response.data);
        });
            //$scope.teams.splice(index, 1)
          });
    }else{
      //swal('Importante','Por favor registre los marcadores','info');
    }
     if ($scope.p1p != "" && $scope.p2p!="") {
    $http({
      method: 'POST',
      url: "php/pollamundial/funcmundial.php",
      data: {
        function: 'InsertarApuesta', 
        intIdPartido:IdPartido,
        strIdCliente:$scope.cliente.GUID,
        strTipoApuesta:$scope.tiporegistro}
      }).then(function (response) {
        swal('Completado','Marcador Registrado','success');
        // if($scope.tiporegistro == 1){
        //   $scope.send_message($scope.p1p,$scope.p2p);
        // }else{
        //   $scope.send_message($scope.p1,$scope.p2);
        // }
        $scope.inst = response.data;
        $http({
          method: 'POST',
          url: "php/pollamundial/funcmundial.php",
          data: {
            function: 'InsertarDetalleApuesta', 
            strIdApuesta:$scope.inst,
            intIdEquipo:IdEquipo1,
            intGolesEquipo: $scope.p1p}
          }).then(function (response) {
            $scope.resp = response.data;
          });
          $http({
            method: 'POST',
            url: "php/pollamundial/funcmundial.php",
            data: {
              function: 'InsertarDetalleApuesta', 
              strIdApuesta:$scope.inst,
              intIdEquipo:IdEquipo2,
              intGolesEquipo: $scope.p2p}
            }).then(function (response) {
              $scope.resp = response.data;
            });
             $http({
           method: 'POST',
           url: "php/pollamundial/funcmundial.php",
           data: {
              function: 'listarPartidosFaseUno',
              cedula:$scope.cedula}
        }).then(function (response) {           
           $scope.teams = response.data;
           $scope.teamsp=response.data;
           console.log(response.data);
        });
           // $scope.teamsp.splice(index, 1)
          });
    }else{
     // swal('Importante','Por favor registre los marcadores','info');
    }
  }
 //Envio De Mensaje
  $scope.send_message = function(p1,p2){
    if($scope.celular != null){
      $http({
        method:'POST',
        url:"https://api.infobip.com/sms/1/text/single",
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
          'accept' : 'application/json'
        },
        data: {
          "from": "Copa Mundo Genesis 2018",
          "to": "57"+$scope.celular,
          "text": "Sr(a). Su marcador se ha registrado con exito: "+$scope.NomEquipo1+" "+p1+" VS "+$scope.NomEquipo2+" "+p2+" Gracias por utilizar nuestra plataforma. GENESIS"  
        }
      }).then(function(response){
        console.log(response);
      })
    } //else {
    //   swal({
    //    title: 'Ingrese su numero de celular',
    //    input: 'number',
    //    showCancelButton: true
    // }).then(function(result) {
    //       if (result) {
    //         $scope.cel = result;
    //         $http({
    //           method:'POST',
    //           url:"https://api.infobip.com/sms/1/text/single",
    //           headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
    //             'accept' : 'application/json'
    //           },
    //           data: {
    //             "from": "Copa Mundo Genesis 2018",
    //             "to": "57"+$scope.cel,
    //             "text": "Sr(a). Su marcador se ha registrado con exito: "+$scope.NomEquipo1+" "+p1+" VS "+$scope.NomEquipo2+" "+p2+" Gracias por utilizar nuestra plataforma. GENESIS"  
    //           }
    //         }).then(function(response){
    //           console.log(response);
    //           $http({
    //             method: 'POST',
    //             url: "php/pollamundial/funcmundial.php",
    //             data: {
    //                     function: 'agregarCelular',
    //                     cedula:$scope.cedula,
    //                     celular:$scope.cel
    //                     }
    //           }).then(function (response) {
    //             console.log(response.data);
    //             $http({
    //                method: 'POST',
    //                url: "php/pollamundial/funcmundial.php",
    //                data: {
    //                   function: 'validacliente', cedula:$scope.cedula
    //                }
    //             }).then(function (response) {
    //                        $scope.cliente = response.data[0];
    //                        $scope.celular = $scope.cliente.Celular;
    //             });
    //           });
    //         })
    //      }
    //   })
    //}
  }	

$scope.listarresumen_premium=function(){


$http({
method: 'POST',
url: "php/pollamundial/funcmundial.php",
data: {
function: 'listarresumen_premium',
cedula:$scope.cedula,
strTipoApuesta:$scope.cliente.Premium

}
}).then(function (response) {
$scope.teamresumen_premium = response.data;
console.log(response.data);
});
}
      
      $scope.listarresumen_basico=function(){

      $http({
           method: 'POST',
           url: "php/pollamundial/funcmundial.php",
           data: {
              function: 'listarresumen_basico',
              cedula:$scope.cedula,
              strTipoApuesta:$scope.cliente.Premium

           }
        }).then(function (response) {
           $scope.teamresumen_basico = response.data;
           console.log(response.data);
        });  
      }
      

      




}])