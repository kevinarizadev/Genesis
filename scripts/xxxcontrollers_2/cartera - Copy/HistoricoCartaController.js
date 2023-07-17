'use strict';
angular.module('GenesisApp')
.controller('HistoricoCartaController', ['$scope', '$rootScope', '$http', '$filter', '$window',function ($scope, $rootScope, $http,$filter,$window) {

      $(document).ready(function(){$('#modaltabla').modal();});



      $scope.ValidaEmpresaPanelTabla = false;
      $scope.ConsolidadoEmpresaPanelTabla = false;
      $scope.AportanteMarcado = [];
      $scope.check_user = [];
      $scope.select_all=false;


      $scope.TipoReporte = function (tipo) {
            switch (tipo) {
                  case 'CE':
                  $scope.ValidaEmpresaPanelTabla = false;
                  $scope.ConsolidadoEmpresaPanelTabla = true;
                  break;
                  case 'GC':
                  if  ($scope.AportanteMarcado.length == 0) {
                        swal('notificacion','Debe Marcar Al Menos Un Aportante Para Poder Generar La Carta','info');
                  } else {
                        $scope.EnviarCarta();
                        // $scope.ValidaEmpresaPanelTabla = true;
                        // $scope.ConsolidadoEmpresaPanelTabla = false;
                  }
                  break;
                  default:
                  break;
            }
      }

      $scope.ListarConsolidadoEmpresa = function (estado) {
            swal({
                  html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Carganado Informacion...</p>',
                  width: 200,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  showConfirmButton: false,
                  animation: false
            });
            $http({
                  method: 'POST',
                  url: "php/cartera/funcartera.php",
                  data: { function: 'ConsolidadoAportante' }
            }).then(function (response) {
                  if (response.data.length > 0) {
                        if (estado == 'destruir') {
                              $scope.tableinformaciontemp.destroy();
                        }
                        $scope.infodata = response.data;
                        $scope.infodatatemp = $scope.infodata;
                        $scope.cantidadtemp = response.data.length;
                        swal.close();
                  } else {
                        swal('Genesis informa', 'No hay Informacion para Mostrar', 'warning');
                  }
            });
      }

      $scope.VerDetalle = function (info) {
            $('#modaltabla').modal('open');
            $http({
                  method: 'POST',
                  url: "php/cartera/funcartera.php",
                  data: { function: 'ValidaAportante', documento: info.doc_aportante}
            }).then(function (response) {
                  $scope.infodata = response.data;

            });
      }

      $scope.checkboxAllSelect = function (check_value) {
            if (check_value) {
                  $scope.infodatatemp.forEach(function (element, index) {
                        var i = $scope.AportanteMarcado.findIndex(elemt => elemt.doc_aportante == element.doc_aportante);
                        if (i == -1) {
                              $scope.AportanteMarcado.push(element);
                        } else {
                              console.log("Aportante repetido: " + element.doc_aportante);
                        }
                        $scope.check_user[index] = check_value;
                        $scope.infodatatemp[index].checked = check_value;
                  });
            } else {
                  $scope.infodatatemp.forEach(function (element, index) {
                        var i = $scope.AportanteMarcado.findIndex(elemt => elemt.doc_aportante == element.doc_aportante);
                        if (i != -1) {
                              $scope.AportanteMarcado.splice(i, 1);
                        }
                        $scope.check_user[index] = check_value;
                        $scope.infodatatemp[index].checked = check_value;
                        console.log($scope.AportanteMarcado);
                  });
            }
      }

      $scope.checkbox_select_users = function (index, check_value, cd) {
            if (check_value) {
                  var i = $scope.AportanteMarcado.findIndex(elemt => elemt.doc_aportante == cd.doc_aportante);
                  if (i == -1) {
                        $scope.AportanteMarcado.push(cd);
                  } else {
                        console.log("Aportante repetido: " + cd.doc_aportante);
                  }
            } else {
                  var i = $scope.AportanteMarcado.findIndex(elemt => elemt.doc_aportante == cd.doc_aportante);
                  if (i != -1) {
                        $scope.AportanteMarcado.splice(i, 1);
                  }
            }
            console.log($scope.AportanteMarcado);
      }

      $scope.CerrarModal = function () {
            $('#modaltabla').modal('close');
      }


      $scope.checkoption = function(info) {
            if ( $('#aportante_'+info.doc_aportante).prop('checked')) {
                  $scope.AportanteMarcado.push(info);
            } else {
                  for (var i = 0; i < $scope.AportanteMarcado.length; i++) {
                        if ($scope.AportanteMarcado[i].doc_aportante == info.doc_aportante) {
                              $scope.AportanteMarcado.splice(i, 1);
                        }
                  }
            }
            $scope.validarmarcacion();
      }

      $scope.seleccionarOpcion = function() {
            if ( $('#filled-in-box-servicheck').prop('checked')) {
                  for (var i = 0; i < $scope.infodatatemp.length; i++) {
                        var x = null;
                        for (var z = 0; z < $scope.AportanteMarcado.length; z++) {
                              if ($scope.AportanteMarcado[z].doc_aportante == $scope.infodatatemp[i].doc_aportante ){


                                    x = 1;
                                    break;
                              }
                        }
                        if (x == null) {
                              $scope.infodatatemp[i].checked = true; 
                              $scope.AportanteMarcado.push($scope.infodatatemp[i]);  
                        }
                  }
                  $(".aportante").prop('checked',true);
            } else {
                  for (var i = 0; i < $scope.infodatatemp.length; i++) {
                        $scope.infodatatemp[i].checked = false; 
                  }
                  $scope.AportanteMarcado = [];
                  $(".aportante").prop('checked',false);
            }
            console.log($scope.AportanteMarcado);
            $scope.validarmarcacion();
      }

      $scope.filter = function (val) {
            $scope.infodatatemp = $filter('filter')($scope.infodata, val);
      }

      $scope.validarmarcacion = function () {
            if ($scope.cantidadtemp == $scope.AportanteMarcado.length) {
             $('#filled-in-box-servicheck').prop('checked',true);
       } else {
             $('#filled-in-box-servicheck').prop('checked',false);
       }
 }     


 $scope.EnviarCarta = function () {
      if (sessionStorage.getItem('cedula') === null || sessionStorage.getItem('cedula') === 0 || sessionStorage.getItem('cedula') == undefined) {
            swal('Genesis informa', 'Ingresar A Nuestro Portal Genesis', 'info');
      } else {
            swal({
                  html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Enviando Notificaciones...</p>',
                  width: 200,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  showConfirmButton: false,
                  animation: false
            });
            $http({
                  method: 'POST',
                  url: "php/cartera/funcartera.php",
                  data: { function: 'SendMailAportante', 
                  json_aportante: JSON.stringify($scope.AportanteMarcado), 
                  responsable: sessionStorage.getItem('cedula'),
                  tipo_proceso:'1',
                  cantidad: $scope.AportanteMarcado.length}
            }).then(function (response) {
                  $scope.respuesta = response.data;
                  if ($scope.respuesta.codigo == 0) {
                        swal.close();
                        $scope.AportanteMarcado = [];
                        $scope.check_user = [];
                        $scope.infodata = [];
                        $scope.Limpiar();
                        swal('Notificación',$scope.respuesta.mensaje,'success');
                        $scope.TipoReporte('CE');
                  } else {
                        swal.close();
                        swal('Notificación',$scope.respuesta.mensaje,'info');
                  }

            });

      }
}


$scope.Limpiar = function () {
      for (var i = 0; i < $scope.infodatatemp.length; i++) {
            $scope.infodatatemp[i].checked = false; 
      }
      $scope.AportanteMarcado = [];
      $(".aportante").prop('checked',false);
      console.log($scope.infodatatemp);
}



$scope.PrintCarta = function (cd,estado) {
      $window.open('views/cartera/print/printhistorico.html?estado='+estado+'&tipo='+cd.tipo_doc_aportante+'&id='+cd.doc_aportante,'_blank', "width=1080,height=1100");

}


$scope.TipoReporte('CE');
$scope.ListarConsolidadoEmpresa('comenzar');




}]).filter('inicio', function () {
  return function (input, start) {
    if (input != undefined && start != NaN) {
      start = +start;
      return input.slice(start);
} else {
      return null;
}
}
});
