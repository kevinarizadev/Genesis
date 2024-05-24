'use strict';
angular.module('GenesisApp')
  .controller('reporteurgenciacontroller', ['$scope', 'notification', 'cfpLoadingBar', '$http', function ($scope, notification, cfpLoadingBar, $http) {
    $(document).ready(function () {
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('#modal12').modal();
      $scope.Tabs = 1;
        console.log($(window).width());
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1300 && $(window).width() < 1500) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1500) {
          document.querySelector("#pantalla").style.zoom = 0.9;
        }
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Tabs = 0;
        $('.tabs').tabs();
        $scope.Vista = 0;
        $scope.Tap = 1;
        $('.tabs').tabs();

        setTimeout(() => {
          $scope.$apply();
        }, 500);
    });
    $scope.setTab = function (x) {
      $scope.Tap = x;
      setTimeout(function () {
        $scope.$apply();
      }, 500)
    }

    // $scope.inactive2 = true;
    // $scope.tipoDoc = "0";
    $scope.filtro = "";
    $scope.inactive1 = true;
    $scope.filtro1 = "";
    $scope.inactive2 = true;

    $scope.descarga = function () {
      //Creamos un Elemento Temporal en forma de enlace
      var tmpElemento = document.createElement('a');
      // obtenemos la información desde el div que lo contiene en el html
      // Obtenemos la información de la tabla
      var data_type = 'data:application/vnd.ms-excel';
      var tabla_div = document.getElementById('reporte');
      var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
      tmpElemento.href = data_type + ', ' + tabla_html;
      //Asignamos el nombre a nuestro EXCEL
      tmpElemento.download = 'Reporte_urgencias.xls';
      // Simulamos el click al elemento creado para descargarlo
      tmpElemento.click();
    }

    $scope.obtenerhistorico = function () {
      if (
        $scope.nitips != "" && $scope.nitips != null && $scope.nitips != undefined &&
        $scope.fechai != "" && $scope.fechai != null && $scope.fechai != undefined &&
        $scope.fechaf != "" && $scope.fechaf != null && $scope.fechaf != undefined &&
        $scope.fechaf >= $scope.fechai
      ) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
       });
        $http({
          method: 'POST',
          url: "php/siau/CodigoUrgencia/Ccodigourgenciaips.php",
          data: {
            function: 'obtener_reporte',
            nitips: $scope.nitips,
            fechai: $scope.fechai,
            fechaf: $scope.fechaf,
            accion:'1'
          }
        }).then(function (response) {
          $scope.HistoricoUrgencia = response.data;
          if ($scope.HistoricoUrgencia["0"].ips) {
            $scope.HistoricoUrgencia = response.data;
            $scope.Nombre = $scope.HistoricoUrgencia["0"].ips;
            $scope.total = $scope.HistoricoUrgencia.length;
            if ($scope.total <= 10) {
              $scope.quantity = $scope.total;
            }
            else {
              $scope.quantity = 10;
            }
            $scope.inactive1 = false;
          } else {
            $scope.HistoricoUrgencia=null;
            $scope.inactive1 = true;
            swal('Informanción', 'Error En la Consulta. Favor digite los campos nuevamente', 'error');
          }
          swal.close();
        });
      } else {
        $scope.HistoricoUrgencia=null;
        $scope.inactive1 = true;
        swal('Informanción', 'Error digitación de los campos, favor validar', 'error');
      }
    }

    $scope.obtenerhistorico1 = function () {
      if (
        $scope.fechai1 != "" && $scope.fechai1 != null && $scope.fechai1 != undefined &&
        $scope.fechaf1 != "" && $scope.fechaf1 != null && $scope.fechaf1 != undefined &&
        $scope.fechaf1 >= $scope.fechai1
      ) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
       });
        $http({
          method: 'POST',
          url: "php/siau/CodigoUrgencia/Ccodigourgenciaips.php",
          data: {
            function: 'obtener_reporte1',
            nit: '',
            fechai1: $scope.fechai1,
            fechaf1: $scope.fechaf1,
            accion:'2'
          }
        }).then(function (response) {
          console.log(response);
            $scope.HistoricoUrgencia1 = response.data;
            $scope.total1 = $scope.HistoricoUrgencia1.length;
            if ($scope.total1 <= 10) {
              $scope.quantity1 = $scope.total1;
            }
            
            else {
              $scope.quantity1 = 10;
            }
            $scope.inactive2 = false;
          
              swal.close();
            
        });
      } else {
        $scope.HistoricoUrgencia1=null;
        $scope.inactive2 = true;
        swal('Informanción', 'Error digitación de los campos, favor validar', 'error');
      }
    }


    $scope.descarga1 = function () {
      //Creamos un Elemento Temporal en forma de enlace
      var tmpElemento = document.createElement('a');
      // obtenemos la información desde el div que lo contiene en el html
      // Obtenemos la información de la tabla
      var data_type = 'data:application/vnd.ms-excel';
      var tabla_div = document.getElementById('reporte1');
      var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
      tmpElemento.href = data_type + ', ' + tabla_html;
      //Asignamos el nombre a nuestro EXCEL
      tmpElemento.download = 'Reporte_urgencias.xls';
      // Simulamos el click al elemento creado para descargarlo
      tmpElemento.click();
    }

  }])
