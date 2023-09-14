'use strict';
angular.module('GenesisApp')
  .controller('consultagesnotglosaController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {
      $scope.Inicio = function () {
        console.clear();
        // $('.modal').modal();
        // $('.tabs').tabs();

        $scope.SysDay = new Date();
        $scope.Rol_Nit = sessionStorage.getItem('nit') == '0' ? '' : sessionStorage.getItem('nit');
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        //////////////////////

        $scope.limpiarForm();

        setTimeout(() => { $scope.$apply(); }, 500);
      };

      $scope.limpiarForm = function () {
        $scope.form = {
          nit: $scope.Rol_Nit,
          numero: '',
          ubicacion: '',
          estado: '',
          fechaInicio: new Date(),
          fechaFin: $scope.SysDay,
        }

        $scope.Listado = {
          Lista: [],
          ListaTemp: [],
          Filtro: '',
          Titulo: '',
          Url: ''
        };

        $scope.currentPage = 0;
        $scope.pageSize = 15;
        $scope.Listado.Filtro = "";
        $scope.Listado.Lista = [];
        setTimeout(() => { $scope.$apply(); }, 500);
      }




      $scope.Obt_Vista_Consultar = function () {
        if ($scope.form.fechaInicio <= $scope.form.fechaFin) {
          $scope.Consulta_EPS_IPS();
          // $scope.Datos.responsable = $scope.Rol_Cedula;
          // $scope.Datos.remitente = $scope.Rol_Cedula;
          // setTimeout(() => {
          //     $scope.$apply();
          //     var data = JSON.stringify($scope.Datos);
          //     window.open('views/acas/formatos/formato_consulta_acas.php?data=' + data, '_blank', "width=900,height=1100");
          // }, 500);

        }
      }

      $scope.Consulta_EPS_IPS = function () {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/consultagesnotglosa.php",
          data: {
            function: $scope.Rol_Nit == '0' ? 'Consulta_EPS' : 'Consulta_IPS',
            Estado: $scope.form.estado,
            Num: $scope.form.numero,
            Ubi: $scope.form.ubicacion,
            F_Inicio: $scope.formatDate($scope.form.fechaInicio),
            F_Fin: $scope.formatDate($scope.form.fechaFin),
            Nit: $scope.form.nit
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            if (response.data.length != 0) {
              setTimeout(() => {
                $scope.Listado.Lista = response.data;
                $scope.Listado.ListaTemp = response.data;
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.valmaxpag = 10;
                $scope.pages = [];
                $scope.configPages();
                $scope.$apply();
              }, 500);
              swal.close();
            } else {
              $scope.Listado.Lista = [];
              $scope.Listado.ListaTemp = [];
              swal({
                title: "¡No se encontraron registros!",
                type: "info"
              }).catch(swal.noop);
            }
          } else {
            $scope.Listado.Lista = [];
            $scope.Listado.ListaTemp = [];
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        })
      }


      $scope.Ver_Glosas_Detalle = function (row) {
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/notificacionglosaips.php",
          data: {
            function: 'Obtener_Listado_Glosas',
            Num: row.NUMERO.toString(),
            Ubi: row.UBICACION.toString(),
            Renglon: row.RENGLON.toString(),
          }
        }).then(function (response) {
          if (response.data) {
            if (response.data.length == 0 || response.data[0].Codigo != undefined) {
              $scope.Array_ListadoGlosas = [];
              swal({
                title: "¡No se encontraron glosas!",
                type: "info"
              }).catch(swal.noop);
            } else {
              $scope.Array_ListadoGlosas = response.data;
              $('#modal_Listado_Glosas').modal('open');
              swal.close();
            }
          }
        })
      }

      ////////////////////////////////////////////////////////////////////////////////////////////
      $scope.DescargarRespuesta = function (ruta) {
        // alert(ruta);
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/gesnotificacionglosa.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          window.open("temp/" + response.data);
        });
      }

      //////////////////////////////////////////////

      $scope.formatDate = function (date) {
        if (date === undefined) { return }
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
        // return [year, month, day].join('-');
      }

      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, '');
        input.value = valor;
      }
      $scope.FormatPesoNumero = function (num) {
        if (num) {
          var regex2 = new RegExp("\\.");
          if (regex2.test(num)) {
            num = num.toString().replace('.', ',');
            num = num.split(',');
            num[0] = num[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num[0] = num[0].split('').reverse().join('').replace(/^[\.]/, '');
            if (num[1].length > 1 && num[1].length > 2) {
              num[1] = num[1].toString().substr(0, 2);
            }
            if (num[1].length == 1) {
              num[1] = num[1] + '0';
            }
            return num[0] + ',' + num[1];
          } else {
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num = num.split('').reverse().join('').replace(/^[\.]/, '');
            return num + ',00';
          }
        } else {
          return "0"
        }
      }
      $scope.closeModal = function () {
        $('.modal').modal('close');
      }
      ////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////
      $scope.Estado_Solicitud_Color = function (Estado) {
        if (Estado != undefined) {
          if (Estado.toString().toUpperCase() == 'A') {
            return { "background-color": "rgb(251, 93, 1) !important;" }
          }
          if (Estado.toString().toUpperCase() == 'P') {
            return { "background-color": "rgb(6, 152, 20)!important" }
          }
        }
      }
      // Paginacion
      $scope.filter = function (val) {
        $scope.Listado.ListaTemp = $filter('filter')($scope.Listado.Lista, ($scope.filter_save == val) ? '' : val);
        if ($scope.Listado.ListaTemp.length > 0) {
          $scope.setPage(1);
        }
        $scope.configPages();
        $scope.filter_save = val;
      }
      $scope.closeModal = function () {
        $('.modal').modal('close');
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }

        if ($scope.currentPage >= $scope.pages.length)
          $scope.currentPage = $scope.pages.length - 1;
      }
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
        // console.log($scope.Listado.Lista.length / $scope.pageSize - 1)
      }
      $scope.paso = function (tipo) {
        if (tipo == 'next') {
          var i = $scope.pages[0].no + 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no + 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage + 1;
          if ($scope.Listado.ListaTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.Listado.ListaTemp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.Listado.ListaTemp.length / $scope.pageSize) + 1;
          }
          if (fin > tamanomax) {
            fin = tamanomax;
            i = tamanomax - 9;
          }
        } else {
          var i = $scope.pages[0].no - 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no - 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage - 1;
          if (i <= 1) {
            i = 1;
            fin = $scope.pages.length;
          }
        }
        $scope.calcular(i, fin);
      }
      $scope.calcular = function (i, fin) {
        if (fin > 9) {
          i = fin - 9;
        } else {
          i = 1;
        }
        $scope.pages = [];
        for (i; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }
      }


      $scope.Ajustar_Pantalla = function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
      }

      $(window).on('resize', function () {
        $scope.Ajustar_Pantalla();
      });

      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }


    }
  ]).filter('startFrom', function () {
    return function (input, start) {
      if (input != undefined) {
        start = +start;
        return input.slice(start);
      }
    }
  });
