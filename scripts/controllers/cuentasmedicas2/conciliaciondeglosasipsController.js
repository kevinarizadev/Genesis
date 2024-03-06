'use strict';
angular.module('GenesisApp')
  .controller('conciliaciondeglosasipsController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {
      $scope.Inicio = function () {
        $scope.Ajustar_Pantalla();
        $('.modal').modal();
        $scope.Rol_Nit = sessionStorage.getItem('nit');
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        // $scope.Rol_Nit = 0;

        $scope.listarGlosasIPS();
        $scope.Vista = 0;
        $scope.SysDay = new Date();

      };


      $scope.listarGlosasIPS = function (msg) {
        if (msg == null) {
          swal({ title: 'Cargando...', allowOutsideClick: false });
          swal.showLoading();
        }

        $scope.listaGlosa = [{}];
        swal.close()

        $http({
          method: 'POST',
          url: "php/cuentasmedicas/conciliaciondeglosasips.php",
          data: { function: 'p_lista_glosas_estado_conc_agru_consulta', nit: $scope.Rol_Nit, marcaConciliada: 'N' }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            if (data.length) {

              $scope.listaGlosa = data;
              $scope.listaGlosaTemp = data;
              $scope.currentPage = 0;
              $scope.pageSize = 10;
              $scope.valmaxpag = 10;
              $scope.pages = [];
              $scope.configPages();

              if (msg == null) { $scope.Vista = 0; swal.close(); }
            } else {
              swal("Mensaje", "No existen glosas para mostrar", "info").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "info").catch(swal.noop);
          }
        })
        setTimeout(() => { $scope.$apply(); }, 500);

      }



      $scope.listarGlosasIPSDetalle = function (x) {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $scope.listaGlosaDetalle = []
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/conciliaciondeglosasips.php",
          data: { function: 'p_lista_glosas_estado_conc_consulta', numero: x.DOC_NOT.split('-')[1], ubicacion: x.DOC_NOT.split('-')[2], marcaConciliada: 'N' }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            if (data.length) {
              $scope.listaGlosaDetalle = data;
              $scope.Vista = 1
              swal.close();

            } else {
              swal("Mensaje", "No existen glosas para mostrar", "info").catch(swal.noop);
            }
          } else {
            swal("Mensaje", data, "info").catch(swal.noop);
          }
        })

      }

      $scope.listarGlosasServicios = function (row) {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $scope.Array_ListadoGlosas = [];
        $scope.glosaSeleccionada = row
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/conciliaciondeglosasips.php",
          data: {
            function: 'listarGlosasServicios',
            documento: row.DOCUMENTO_FD.toString(),
            numero: row.NUMERO_FD.toString(),
            ubicacion: row.UBICACION_FD.toString(),
          }
        }).then(function ({ data }) {
          if (data) {
            if (data.length == 0 || data[0].Codigo != undefined) {
              swal("Mensaje", "¡No se encontraron glosas!", "info").catch(swal.noop);
            } else {
              $scope.Array_ListadoGlosas = data;
              $('#modal_Listado_Glosas_Servicios').modal('open');
              swal.close();
            }
          }
        })

      }


      $scope.DescargarRespuesta = function (ruta) {
        // alert(ruta);
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/conciliaciondeglosasips.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          window.open("temp/" + response.data);
        });
      }


      $scope.filter = function (val) {
        $scope.listaGlosaTemp = $filter('filter')($scope.listaGlosa, ($scope.filter_save == val) ? '' : val);
        if ($scope.listaGlosaTemp.length > 0) {
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
          if (Math.ceil($scope.listaGlosaTemp.length / $scope.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope.listaGlosaTemp.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.listaGlosaTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.listaGlosaTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.listaGlosaTemp.length / $scope.pageSize);
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
        // console.log($scope.listaGlosa.length / $scope.pageSize - 1)
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
          if ($scope.listaGlosaTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.listaGlosaTemp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.listaGlosaTemp.length / $scope.pageSize) + 1;
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

      $scope.Atras = function (X) {
        $scope.Vista = X;

        setTimeout(() => {
          $scope.$apply();
        }, 1000);
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

      $scope.FormatPeso = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[^0-9,]/g, '');
        var array = null;
        var regex = new RegExp("\\,");
        if (!regex.test(valor)) {
          valor = valor.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
          valor = valor.split('').reverse().join('').replace(/^[\.]/, '');
        } else {
          array = valor.toString().split(',');
          if (array.length > 2) {
            input.value = 0;
          } else {
            array[0] = array[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            array[0] = array[0].split('').reverse().join('').replace(/^[\.]/, '');
            if (array[1].length > 2) {
              array[1] = array[1].substr(0, 2);
            }
          }
        }
        if (!regex.test(valor)) {
          input.value = valor;
        } else {
          if (valor == ',') {
            input.value = 0;
          } else {
            if (valor.substr(0, 1) == ',') {
              input.value = 0 + ',' + array[1];
            } else {
              input.value = array[0] + ',' + array[1];
            }
          }
        }
      }


      $scope.obtenerEstado = function (x) {
        if (x == 0) {
          return 'PENDIENTE'
        }
        if (x == 1) {
          return 'PENDIENTE'
        }
        return 'CONCILIADA'
      }

      $scope.Ajustar_Pantalla = function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        // if ($(window).width() < 1100) {
        //   document.querySelector("#pantalla").style.zoom = 0.7;
        // }
        // if ($(window).width() > 1100 && $(window).width() < 1300) {
        //   document.querySelector("#pantalla").style.zoom = 0.7;
        // }
        // if ($(window).width() > 1300 && $(window).width() < 1500) {
        //   document.querySelector("#pantalla").style.zoom = 0.8;
        // }
        // if ($(window).width() > 1500) {
        //   document.querySelector("#pantalla").style.zoom = 0.9;
        // }
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
