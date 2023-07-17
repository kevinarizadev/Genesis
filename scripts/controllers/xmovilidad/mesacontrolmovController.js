'use strict';
angular.module('GenesisApp')
.controller('mesacontrolmovController',['$scope','$http',
function($scope,$http) {

  $(document).ready(function(){
    $http({
       method:'POST',
       url:"php/movilidad/acasmov.php",
       data: {function:'obteneracaspropios'}
    }).then(function(response){
        $scope.infopertic = response.data;
        setTimeout(function () {
          $('.customer-logos').slick({
            slidesToShow: 2,
            autoplay: true,
            infinite: true,
            speed: 2500,
            autoplaySpeed: 2500,
            arrows: false,
            dots: false,
            pauseOnHover: false,
            responsive: [{
              settings: {
                slidesToShow: 2
              }
            }]
          });
        }, 1000);
    });
  });
  var vm = this;
  $scope.miacas = true;
  $scope.miacas2 = true;
  $scope.estado = 'A';
  $scope.fechahoy =  new Date();

  //funciones
  $scope.openNav = function(){
    document.getElementById("mesa").style.height = "100%";
  }
  $scope.closeNav = function(){
      document.getElementById("mesa").style.height = "0%";
  }

//
  $scope.inactiveacaspropios = true;
  $scope.consolidado = function(){
    $http({
       method:'POST',
       url:"php/movilidad/acasmov.php",
       data: {function:'obteneracasengenerales'}
    }).then(function(response){
      $scope.casosconsolidados = response.data;// console.log($scope.casosconsolidados);
    });
  }
  $scope.cargaracas = function(){
    $http({
       method:'POST',
       url:"php/movilidad/acasmov.php",
       data: {function:'acaspropioshoy',estado:$scope.estado}
    }).then(function(response){

        $scope.obteneracasenvivo = response.data;
        console.log($scope.obteneracasenvivo);
        $scope.casos = $scope.obteneracasenvivo;
        $scope.filter = '';
        if($scope.estado == 'A'){
            $scope.estadonom = 'ACTIVOS ('+$scope.casos.length+')';
            $scope.colorspam = 'red';
        }else{
            $scope.estadonom = 'PROCESADOS ('+$scope.casos.length+')';
            $scope.colorspam = 'green';
        }

    });
  }
  $scope.cargaracaspropios = function(){
    $scope.inactiveacaspropios = false;
    $http({
       method:'POST',
       url:"php/movilidad/acasmov.php",
       data: {function:'obteneracaspropios'}
    }).then(function(response){
      //QUEMADO COMO FREDDY KRUGER3

      $('.customer-logos').slick('unslick');
      $scope.infopertic = response.data;
     setTimeout(function () {
          $('.customer-logos').slick({
            slidesToShow: 2,
            autoplay: true,
            infinite: true,
            speed: 2500,
            autoplaySpeed: 2500,
            arrows: false,
            dots: false,
            pauseOnHover: false,
            responsive: [{
              settings: {
                slidesToShow: 2
              }
            }]
          });

        }, 1000);
 //        setTimeout(function () {
 //
 //   $scope.inactiveacaspropios = true;
 // }, 2000);

    });
  }

//   //intervalo de animacion mis acas
  // setInterval(function(){
  //   if($scope.miacas == true){
  //           $scope.miacas = false;
  //           $("#soporte1").hide();
  //           setTimeout(function () {
  //             $("#soporte1").show().addClass('animated bounceInRight').css({"-vendor-animation-duration": "5s","-vendor-animation-delay": "2s"});
  //           }, 100);
  //       }else{
  //           $scope.miacas = true;
  //           $("#soporte1").hide();
  //           setTimeout(function () {
  //               $("#soporte1").show().addClass('animated bounceInLeft').css({"-vendor-animation-duration": "5s","-vendor-animation-delay": "2s"});
  //           }, 100);
  //       }
  // }, 15000);



// //   //refresh de todas las graficas
  setInterval(function(){
    $scope.miacas = true;
    $scope.miacas2 = true;
    $scope.estado = 'A';
    $scope.fechahoy =  new Date();
    $scope.consolidado();
    $scope.cargaracas();
    $scope.cargaracaspropios();
  //  $scope.cargaracaspropioshoy();
    $scope.tendencia();
    $scope.pieincidencias();
    setTimeout(function () {
      $scope.estado = 'P'; $scope.cargaracas();
    }, 25000);
  }, 15000);
// //   //graficas de las dos primeras targetas
  $scope.tendencia =  function(){
    $http({
       method:'POST',
       url:"php/movilidad/acasmov.php",
       //
       data: {function:'obteneracashistorico'}
    }).then(function(response){
        $scope.respuesta =response.data;
      //  console.log($scope.respuesta);
        $scope.infohistorico = $scope.respuesta;
        $scope.infohistoricototal = $scope.respuesta;
        vm.hc5 = angular.element('#tendencia').highcharts({
           chart: {
              type: 'column',
              options3d: {
                 enabled: true,
                 alpha: 20,
                 beta: 0
              }
           },
           title: {
              text: 'Consolidado mensual de MOVILIDAD'
              },
           xAxis: {
                categories: [
                    $scope.infohistorico[0].nombre,
                    $scope.infohistorico[1].nombre,
                    $scope.infohistorico[2].nombre,
                    $scope.infohistorico[3].nombre,
                    $scope.infohistorico[4].nombre,
                    $scope.infohistorico[5].nombre
                ],
                crosshair: true
            },
           yAxis: {
                min: 0,
                title: {
                    text: 'Cantidad de Incidencias'
                }
            },
           tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y} acas</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
           plotOptions: {
              series: {
                  borderWidth: 0,
                  dataLabels: {
                      enabled: true,
                      format: '<spam style="font-size: larger;">{point.y}</spam>'
                  }
              }
            },
           series: [

                      {
                        name: 'PROCESADOS',
                        color: '#0cf7a9',
                        data: [
                                {
                                    color: '#0cf7a9',
                                    y: Number($scope.infohistorico[6].valor)
                                }, {
                                    color: '#0cf7a9',
                                    y: Number($scope.infohistorico[7].valor)
                                }, {
                                    color: '#0cf7a9',
                                    y: Number($scope.infohistorico[8].valor)
                                }, {
                                    color: '#0cf7a9',
                                    y: Number($scope.infohistorico[9].valor)
                                }, {
                                    color: '#0cf7a9',
                                    y: Number($scope.infohistorico[10].valor)
                                }, {
                                    color: '#ffc107',
                                    y: Number($scope.infohistorico[11].valor)
                                }
                              ]
                      },
                      {
                          name: 'ACTIVOS',
                          color: '#ea1717',
                          data: [
                                  {
                                      color: '#ea1717',
                                      y: Number($scope.infohistorico[0].valor)
                                  }, {
                                      color: '#ea1717',
                                      y: Number($scope.infohistorico[1].valor)
                                  }, {
                                      color: '#ea1717',
                                      y: Number($scope.infohistorico[2].valor)
                                  }, {
                                      color: '#ea1717',
                                      y: Number($scope.infohistorico[3].valor)
                                  }, {
                                      color: '#ea1717',
                                      y: Number($scope.infohistorico[4].valor)
                                  }, {
                                      color: '#ffeb3b',
                                      y: Number($scope.infohistorico[5].valor)
                                  }
                                ]
                      }
                    ]
        });
    });

  }

  $scope.pieincidencias =  function(){
  $http({
     method:'POST',
     url:"php/movilidad/acasmov.php",
     data: {function:'obteneracasconcepto'}
  }).then(function(response){
    //QUEMADO COMO FREDY KRUGER

      $scope.Incidencias = response.data;
     console.log($scope.Incidencias);
      var hoy = new Date();
      var mm = hoy.getMonth()+1;
      $scope.yyyy = hoy.getFullYear();
      switch (mm) {
        case 1:
          $scope.mes = 'Enero';
        break;
        case 2:
          $scope.mes = 'Febrero';
        break;
        case 3:
          $scope.mes = 'Marzo';
        break;
        case 4:
          $scope.mes = 'Abril';
        break;
        case 5:
          $scope.mes = 'Mayo';
        break;
        case 6:
          $scope.mes = 'Junio';
        break;
        case 7:
          $scope.mes = 'Julio';
        break;
        case 8:
          $scope.mes = 'Agosto';
        break;
        case 9:
          $scope.mes = 'Septiembre';
        break;
        case 10:
          $scope.mes = 'Octubre';
        break;
        case 11:
          $scope.mes = 'Noviembre';
        break;
        case 12:
          $scope.mes = 'Diciembre';
        break;
        default:

      }
      vm.hc4 = angular.element('#pieincidencias').highcharts({
        chart: {
          type: 'pie',
          options3d: {
              enabled: true,
              alpha: 45
          }
          },
        title: {
            text: 'Total de incidencias por el concepto de afiliaciones del mes de '+$scope.mes+': '+ Number($scope.Incidencias["6"].Total)
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              depth: 45,
              dataLabels: {
                  enabled: true,
                  format: '<b style="font-size: inherit;">{point.name} </b> <b><strong style="font-size: large;">{point.y}</strong></b>',
                  style: {
                      color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                  },
                  connectorColor: 'silver'
              },
              showInLegend: true
          }
        },
        series: [{
            name: 'Incidencias',
            data: [
                {name: $scope.Incidencias["0"].nombre, y: Number($scope.Incidencias["0"].cantidad)},
                {name: $scope.Incidencias["1"].nombre, y: Number($scope.Incidencias["1"].cantidad)},
                {name: $scope.Incidencias["2"].nombre, y: Number($scope.Incidencias["2"].cantidad)},
                {name: $scope.Incidencias["3"].nombre, y: Number($scope.Incidencias["3"].cantidad)},
                {name: $scope.Incidencias["4"].nombre, y: Number($scope.Incidencias["4"].cantidad)},
                {name: $scope.Incidencias["5"].nombre, y: Number($scope.Incidencias["5"].cantidad)}
            ]
        }]
      });
  });
}
  //intervalo de scroll automatico
  setInterval(function(){
    if($scope.casos.length >= 3){
      if(document.getElementById('ecran').scrollTop<(document.getElementById('ecran').scrollHeight-document.getElementById('ecran').offsetHeight)){-1
            document.getElementById('ecran').scrollTop=document.getElementById('ecran').scrollTop+1
      }
      else {document.getElementById('ecran').scrollTop=0;}
    }
  }, 50);
  $scope.obtenercolorstar =  function(valor){
    var color = '';
    if(valor < 2){color = '#F57F17';}
    else if(valor < 3){color = '#F9A825';}
         else if(valor < 4){color = '#FBC02D';}
              else if(valor < 4.5){color = '#FDD835';}
                   else{color = '#FFEB3B';}
    return(color)
  }
  //
  $scope.consolidado();
  $scope.cargaracas();
  //$scope.cargaracaspropioshoy();
  //


}])
