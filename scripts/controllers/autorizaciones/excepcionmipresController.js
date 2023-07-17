'use strict';

angular.module('GenesisApp')

  .controller('excepcionmipresController', ['$scope', '$http', '$filter', '$timeout', function ($scope, $http, $filter, $timeout) {


    $(document).ready(function () {
      $("#nuevaexcepcion").modal();

    });

    //variables de control


    // funciones de control
    $scope.listarexpecionesmipres = function () {
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
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'p_lista_excepcion_mipres' }
      }).then(function (response) {
        console.log(response.data);
        $scope.listaMipres = response.data;

        $scope.initPaginacionmipres($scope.listaMipres);
        swal.close();

      });

    }






    $scope.listarexpecionesmipres();

    $scope.mipres = null;
    $scope.openmodals = function (tipo) {
      switch (tipo) {

        case 'nuevaexcepcion':
          $scope.mipres = null;
          $("#nuevaexcepcion").modal("open");

          setTimeout(() => {
            $('#nuevaexcepcion #mipres').focus();
          }, 100);
          break;
        default:
      }
    }




    $scope.closemodals = function (tipo) {
      switch (tipo) {
        case 'nuevaexcepcion':
          $("#nuevaexcepcion").modal("close");
          break;
        default:
      }
    }



    //Filter y table mipres
    $scope.initPaginacionmipres = function (info) {
      $scope.listaMipresprogTemp = info;
      $scope.currentPagemipres = 0;
      $scope.pageSizemipres = 10;
      $scope.valmaxpagmipres = 10;
      $scope.pagesmipres = [];
      $scope.configpagesmipres();
    }
    $scope.configpagesmipres = function () {
      $scope.pagesmipres.length = 0;
      var ini = $scope.currentPagemipres - 4;
      var fin = $scope.currentPagemipres + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil($scope.listaMipresprogTemp.length / $scope.pageSizemipres) > $scope.valmaxpagmipres)
          fin = 10;
        else
          fin = Math.ceil($scope.listaMipresprogTemp.length / $scope.pageSizemipres);
      } else {
        if (ini >= Math.ceil($scope.listaMipresprogTemp.length / $scope.pageSizemipres) - $scope.valmaxpagmipres) {
          ini = Math.ceil($scope.listaMipresprogTemp.length / $scope.pageSizemipres) - $scope.valmaxpagmipres;
          fin = Math.ceil($scope.listaMipresprogTemp.length / $scope.pageSizemipres);
        }
      }
      if (ini < 1) ini = 1;
      for (var i = ini; i <= fin; i++) {
        $scope.pagesmipres.push({
          no: i
        });
      }
      if ($scope.currentPagemipres >= $scope.pagesmipres.length)
        $scope.currentPagemipres = $scope.pagesmipres.length - 1;
      if ($scope.currentPagemipres < 0) { $scope.currentPagemipres = 0; }
    }
    $scope.setPagemipres = function (index) {
      $scope.currentPagemipres = index - 1;
      if ($scope.pagesmipres.length % 2 == 0) {
        var resul = $scope.pagesmipres.length / 2;
      } else {
        var resul = ($scope.pagesmipres.length + 1) / 2;
      }
      var i = index - resul;
      if ($scope.listaMipresprogTemp.length % $scope.pageSize == 0) {
        var tamanomax = parseInt($scope.listaMipresprogTemp.length / $scope.pageSizemipres);
      } else {
        var tamanomax = parseInt($scope.listaMipresprogTemp.length / $scope.pageSizemipres) + 1;
      }
      var fin = ($scope.pagesmipres.length + i) - 1;
      if (fin > tamanomax) {
        fin = tamanomax;
        i = tamanomax - 9;
      }
      if (index > resul) {
        $scope.calcularmipres(i, fin);
      }
    }
    $scope.pasomipres = function (tipo) {
      if (tipo == 'next') {
        var i = $scope.pagesmipres[0].no + 1;
        if ($scope.pagesmipres.length > 9) {
          var fin = $scope.pagesmipres[9].no + 1;
        } else {
          var fin = $scope.pagesmipres.length;
        }

        $scope.currentPagemipres = $scope.currentPagemipres + 1;
        if ($scope.listaMipresprogTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.listaMipresprogTemp.length / $scope.pageSizemipres);
        } else {
          var tamanomax = parseInt($scope.listaMipresprogTemp.length / $scope.pageSizemipres) + 1;
        }
        if (fin > tamanomax) {
          fin = tamanomax;
          i = tamanomax - 9;
        }
      } else {
        var i = $scope.pagesmipres[0].no - 1;
        if ($scope.pagesmipres.length > 9) {
          var fin = $scope.pagesmipres[9].no - 1;
        } else {
          var fin = $scope.pagesmipres.length;
        }

        $scope.currentPagemipres = $scope.currentPagemipres - 1;
        if (i <= 1) {
          i = 1;
          fin = $scope.pagesmipres.length;
        }
      }
      $scope.calcularmipres(i, fin);
    }
    $scope.calcularmipres = function (i, fin) {
      if (fin > 9) {
        i = fin - 9;
      } else {
        i = 1;
      }
      $scope.pagesmipres = [];
      for (i; i <= fin; i++) {
        $scope.pagesmipres.push({
          no: i
        });
      }
    }

    $scope.filterMipres = function (val) {
      $scope.listaMipresprogTemp = $filter('filter')($scope.listaMipres, val);
      if ($scope.listaMipresprogTemp.length > 0) {
        $scope.setPagemipres(1);
      }
      $scope.configpagesmipres();
    }



    $scope.accionmipres = function (vmipres, accion) {

      if (vmipres == null) {
        swal('No Completado', 'No pueden haber campos vacios.', 'info');
      } else {
        if (accion == 'U') {
          swal({
            title: 'Confirmar',
            text: "¿Deseas remover el Mipres N° " + vmipres +  "?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {

            $scope.savedata(vmipres,accion);
          })
        }

        if (accion == 'I') {
          $scope.savedata(vmipres,accion);
        }



      }
    }

    $scope.savedata = function(vmipres,accion){
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: {
          function: 'p_ui_excepcion_mipres', mipres:
            JSON.stringify({
              MIPRES: vmipres.trim(),
              RESPONSABLE: sessionStorage.getItem("usuario"),
              ACCION: accion

            })
        }
      }).then(function (response) {        
        if (response.data.Codigo == '0') {          
          swal({ title: "Completado", text:response.data.Nombre, showConfirmButton: true, type: "success", timer: 3000 });
          if (accion == 'I') {
            $scope.closemodals("nuevaexcepcion");
          }
          setTimeout(() => {
            $scope.listarexpecionesmipres();
          }, 1000);

        }


        if (response.data.Codigo == '1') {
          swal('No Completado', response.data.Nombre, 'error');
        }

      });

    }




  }])

  .filter('inicio', function () {
    return function (input, start) {
      if (input != undefined && start != NaN) {
        start = +start;
        return input.slice(start);
      } else {
        return null;
      }
    }

  });