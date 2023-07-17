'use strict';

angular.module('GenesisApp')

  .controller('excepcionerror50Controller', ['$scope', '$http', '$filter', '$timeout', function ($scope, $http, $filter, $timeout) {


    $(document).ready(function () {
      $("#nuevaexcepcion").modal();

    });

    //variables de control
$scope.Obtener_Tipos_Documentos = function () {
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Tipos_Documentos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
$scope.Obtener_Tipos_Documentos();


    // funciones de control
    $scope.listarexpeciones = function () {
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
        data: { function: 'p_lista_excepcion_error50' }
      }).then(function (response) {
        console.log(response.data);
        $scope.listaExcepciones = response.data;

        $scope.initPaginacionExcepciones($scope.listaExcepciones);
        swal.close();

      });

    }






    $scope.listarexpeciones();

    $scope.excepcion = null;
    $scope.openmodals = function (tipo) {
      switch (tipo) {

        case 'nuevaexcepcion':
          $scope.excepcion = null;
          $("#nuevaexcepcion").modal("open");

          setTimeout(() => {
            $('#nuevaexcepcion #excepcion').focus();
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


    $scope.restSearch = function () {
      $scope.infoafiliado = [];
      $scope.hideSearchafiliado = false;
      $scope.observacion = "";
    }

    //Filter y table excepcion
    $scope.initPaginacionExcepciones = function (info) {
      $scope.listaExcepcionesprogTemp = info;
      $scope.currentPageExcepciones = 0;
      $scope.pageSizeExcepciones = 10;
      $scope.valmaxpagexcepcion = 10;
      $scope.pagesExcepciones = [];
      $scope.configpagesexcepcion();
    }
    $scope.configpagesexcepcion = function () {
      $scope.pagesExcepciones.length = 0;
      var ini = $scope.currentPageExcepciones - 4;
      var fin = $scope.currentPageExcepciones + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil($scope.listaExcepcionesprogTemp.length / $scope.pageSizeExcepciones) > $scope.valmaxpagexcepcion)
          fin = 10;
        else
          fin = Math.ceil($scope.listaExcepcionesprogTemp.length / $scope.pageSizeExcepciones);
      } else {
        if (ini >= Math.ceil($scope.listaExcepcionesprogTemp.length / $scope.pageSizeExcepciones) - $scope.valmaxpagexcepcion) {
          ini = Math.ceil($scope.listaExcepcionesprogTemp.length / $scope.pageSizeExcepciones) - $scope.valmaxpagexcepcion;
          fin = Math.ceil($scope.listaExcepcionesprogTemp.length / $scope.pageSizeExcepciones);
        }
      }
      if (ini < 1) ini = 1;
      for (var i = ini; i <= fin; i++) {
        $scope.pagesExcepciones.push({
          no: i
        });
      }
      if ($scope.currentPageExcepciones >= $scope.pagesExcepciones.length)
        $scope.currentPageExcepciones = $scope.pagesExcepciones.length - 1;
      if ($scope.currentPageExcepciones < 0) { $scope.currentPageExcepciones = 0; }
    }
    $scope.setPageExcepciones = function (index) {
      $scope.currentPageExcepciones = index - 1;
      if ($scope.pagesExcepciones.length % 2 == 0) {
        var resul = $scope.pagesExcepciones.length / 2;
      } else {
        var resul = ($scope.pagesExcepciones.length + 1) / 2;
      }
      var i = index - resul;
      if ($scope.listaExcepcionesprogTemp.length % $scope.pageSize == 0) {
        var tamanomax = parseInt($scope.listaExcepcionesprogTemp.length / $scope.pageSizeExcepciones);
      } else {
        var tamanomax = parseInt($scope.listaExcepcionesprogTemp.length / $scope.pageSizeExcepciones) + 1;
      }
      var fin = ($scope.pagesExcepciones.length + i) - 1;
      if (fin > tamanomax) {
        fin = tamanomax;
        i = tamanomax - 9;
      }
      if (index > resul) {
        $scope.calcularexcepcion(i, fin);
      }
    }
    $scope.pasoexcepcion = function (tipo) {
      if (tipo == 'next') {
        var i = $scope.pagesExcepciones[0].no + 1;
        if ($scope.pagesExcepciones.length > 9) {
          var fin = $scope.pagesExcepciones[9].no + 1;
        } else {
          var fin = $scope.pagesExcepciones.length;
        }

        $scope.currentPageExcepciones = $scope.currentPageExcepciones + 1;
        if ($scope.listaExcepcionesprogTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.listaExcepcionesprogTemp.length / $scope.pageSizeExcepciones);
        } else {
          var tamanomax = parseInt($scope.listaExcepcionesprogTemp.length / $scope.pageSizeExcepciones) + 1;
        }
        if (fin > tamanomax) {
          fin = tamanomax;
          i = tamanomax - 9;
        }
      } else {
        var i = $scope.pagesExcepciones[0].no - 1;
        if ($scope.pagesExcepciones.length > 9) {
          var fin = $scope.pagesExcepciones[9].no - 1;
        } else {
          var fin = $scope.pagesExcepciones.length;
        }

        $scope.currentPageExcepciones = $scope.currentPageExcepciones - 1;
        if (i <= 1) {
          i = 1;
          fin = $scope.pagesExcepciones.length;
        }
      }
      $scope.calcularexcepcion(i, fin);
    }
    $scope.calcularexcepcion = function (i, fin) {
      if (fin > 9) {
        i = fin - 9;
      } else {
        i = 1;
      }
      $scope.pagesExcepciones = [];
      for (i; i <= fin; i++) {
        $scope.pagesExcepciones.push({
          no: i
        });
      }
    }

    $scope.filterExcepcion = function (val) {
      $scope.listaExcepcionesprogTemp = $filter('filter')($scope.listaExcepciones, val);
      if ($scope.listaExcepcionesprogTemp.length > 0) {
        $scope.setPageExcepciones(1);
      }
      $scope.configpagesexcepcion();
    }

    $scope.vtipodocumento = null;
    $scope.vdocumento = null;
    $scope.infoafiliado = [];
    $scope.hideSearchafiliado = false;
    $scope.buscarAfiliado = function (tipodocumento, documento) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtenerafiliados', tipodocumento: tipodocumento, documento: documento }
      }).then(function (response) {
        console.log(response.data);

        if (response.data.CODIGO != "0") {
          $scope.infoafiliado = [];
          $scope.hideSearchafiliado = true;
          $scope.infoafiliado = response.data;
          $scope.calcularEdad($scope.infoafiliado.FechaNacimiento);
        } else {
          console.log(response.data);
          $scope.infoafiliado = [];
          $scope.hideSearchafiliado = false;
          swal('No Completado', response.data.Nombre, 'error');
        }
      })
    }


    function validate_fecha(fecha) {

      var patron = new RegExp("^(19|20)+([0-9]{2})([-])([0-9]{1,2})([-])([0-9]{1,2})$");
      if (fecha.search(patron) == 0) {
        var values = fecha.split("-");
        if (isValidDate(values[2], values[1], values[0])) {
          return true;
        }
      }
      return false;
    }

    function isValidDate(day, month, year) {
      var dteDate;
      month = month - 1;
      dteDate = new Date(year, month, day);
      //Devuelva true o false...
      return ((day == dteDate.getDate()) && (month == dteDate.getMonth()) && (year == dteDate.getFullYear()));
    }

    function formatDate(date) {
      var dd = ('0' + date.getDate()).slice(-2);
      var mm = ('0' + (date.getMonth() + 1)).slice(-2);
      var yyyy = date.getFullYear();
      var hh = date.getHours();
      var mi = date.getMinutes();
      return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
    }

    $scope.calcularEdad = function (date, tipo) {
      //var fecha=document.getElementById("user_date").value;
      var fecha = date.split("/").reverse().join("-");
      if (validate_fecha(fecha) == true) {
        // Si la fecha es correcta, calculamos la edad
        var values = fecha.split("-");
        var dia = values[2];
        var mes = values[1];
        var ano = values[0];

        // cogemos los valores actuales
        var fecha_hoy = new Date();
        var ahora_ano = fecha_hoy.getYear();
        var ahora_mes = fecha_hoy.getMonth() + 1;
        var ahora_dia = fecha_hoy.getDate();

        // realizamos el calculo
        var edad = (ahora_ano + 1900) - ano;
        if (ahora_mes < mes) {
          edad--;
        }

        if ((mes == ahora_mes) && (ahora_dia < dia)) {
          edad--;
        }

        if (edad > 1900) {
          edad -= 1900;
        }



        // calculamos los meses
        var meses = 0;
        if (ahora_mes > mes)
          meses = ahora_mes - mes;
        if (ahora_mes < mes)
          meses = 12 - (mes - ahora_mes);
        if (ahora_mes == mes && dia > ahora_dia)
          meses = 11;

        // calculamos los dias
        var dias = 0;
        if (ahora_dia > dia)
          dias = ahora_dia - dia;
        if (ahora_dia < dia) {
          var ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
          dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
        }


        if (edad > 0) {

          $scope.cantidadanosautedit = 'años'

          if (edad == 1) {

            $scope.cantidadanosautedit = 'años'

          }

          $scope.edadautedit = edad;

        } else {

          if (meses > 0) {

            $scope.cantidadanosautedit = 'meses'

            if (meses == 1) {

              $scope.cantidadanosautedit = 'mes'

            }

            $scope.edadautedit = meses;

          } else {

            if (dias > 0) {

              $scope.cantidadanosautedit = 'dias'

              if (dias == 1) {

                $scope.cantidadanosautedit = 'dia'

              }

              $scope.edadautedit = dias;

            }

          }

        }




      }

    }
    $scope.accionexcepcion = function (observacion, accion) {

      if (observacion == null) {
        swal('No Completado', 'No pueden haber campos vacios.', 'info');
      } else {
        if (accion == 'U') {
          swal({
            title: 'Confirmar',
            text: "¿Deseas remover el Afiliado con " + observacion.tipo_doc + '-' + observacion.documento +  "?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            $scope.infoafiliado.TipoDocumento = observacion.tipo_doc            
            $scope.infoafiliado.Documento = observacion.documento;
            $scope.infoafiliado.CodigoRegimen = observacion.regimen;
            $scope.savedata('', accion);
          })
        }

        if (accion == 'I') {
          $scope.savedata(observacion, accion);
        }



      }
    }

    $scope.savedata = function (observacion, accion) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: {
          function: 'p_ui_excepcion_error50', mipres:
            JSON.stringify({
              tipo_doc: $scope.infoafiliado.TipoDocumento,
              documento: $scope.infoafiliado.Documento,
              regimen: $scope.infoafiliado.CodigoRegimen,
              observacion: observacion,
              responsable: sessionStorage.getItem("usuario"),
              accion: accion,
            })
        }
      }).then(function (response) {
        console.log(response.data);

        if (response.data.Codigo == '0') {
          swal({ title: "Completado", text: response.data.Nombre, showConfirmButton: true, type: "success", timer: 3000 });
          if (accion == 'I') {
            $scope.closemodals("nuevaexcepcion");
          }
          setTimeout(() => {
            $scope.listarexpeciones();
          }, 3000);

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