'use strict';
angular.module('GenesisApp')
  .controller('impresionmasivaController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {
        console.log($(window).width());
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_Pantalla();

        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $scope.Rol_Nombre = sessionStorage.getItem('nombre');
        $('.tabs').tabs();
        $scope.Tabs = 1;
        $scope.SysDay = new Date();
        $scope.formLimpiar()
        console.log($scope.Rol_Cedula, $scope.Rol_Nombre);
        setTimeout(() => {
          $scope.$apply();
        }, 500);

        //////////////////////////////////////////////////////////
      }
      $scope.formLimpiar = function () {
        const date = new Date('2023/10/01')
        $scope.form = {
          empresa: '1',
          documento: '',
          concepto: '',
          // proveedor: '',
          proveedor: '892201282',
          // fechaInicio: null,
          // fechaFinal: null,
          fechaInicio: date,
          fechaFinal: date,
          // numeroInicial: '',
          // numeroFinal: '',
          numeroInicial: '10172',
          numeroFinal: '10172',
        }
        $scope.list = {
          ips: [],
          documento: [
            { codigo: 'FC', nombre: 'FACTURA VENTA' },
            { codigo: 'FE', nombre: 'FACTURA DE VENTA CAJACOPI' }],
          concepto: [
            { codigo: 'EP', nombre: 'COLJUEGOS' },
            { codigo: 'C3', nombre: 'FOSYGA' },
            { codigo: 'C5', nombre: 'ESFUERZO PROPIO' },
            { codigo: 'C9', nombre: 'SISTEMA GENERAL DE PARTICIPACION' },
            { codigo: 'CC', nombre: 'CAJA DE COMPENSACION' },
            { codigo: 'NN', nombre: 'TODOS' },
          ]
        };

        setTimeout(() => {
          $scope.$apply();
        }, 300);
      }



      $scope.buscarIps = function () {
        if ($scope.form.proveedor.length > 2) {
          swal({ title: 'Cargando...' });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/financiera/impresionmasiva.php",
            data: {
              function: 'P_OBTENER_TERCERO',
              proveedor: $scope.form.proveedor,
            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              if (data[0] != undefined) {
                $scope.list.ips = data;
                if (data.length == 1) {
                  $scope.form.proveedor = `${data[0].codigo} - ${data[0].razon_social}`
                }

                swal.close();
                ////////////////////////////////////////////////////////////////////////
                setTimeout(() => {
                  $scope.$apply();
                }, 2000);
              }
            } else {
              swal({
                title: "¡Importante!",
                text: data,
                type: "warning"
              }).catch(swal.noop);
            }
          });
        } else {
          Materialize.toast('¡Digite el Nit del Tercero a consultar!', 3000);
        }
      }

      $scope.validar = function () {
        return new Promise((resolve) => {

          if (!$scope.form.documento) resolve(false);
          if (!$scope.form.concepto) resolve(false);
          if (!$scope.form.proveedor) resolve(false);
          if (!$scope.form.fechaInicio) resolve(false);
          if ($scope.form.fechaInicio > $scope.form.fechaFinal) resolve(false);
          if (!$scope.form.fechaFinal) resolve(false);
          if (!$scope.form.numeroInicial) resolve(false);
          if (!$scope.form.numeroFinal) resolve(false);

          resolve(true)
        });
      }

      $scope.generar = function () {
        if ($scope.form.proveedor == '0' || $scope.form.proveedor.indexOf('-') != -1) {
          $scope.validar().then(res => {
            if (res) {
              let proveedor = 0;
              if ($scope.form.proveedor == '0') {
                proveedor = '0';
              }
              if ($scope.form.proveedor.indexOf('-') != -1) {
                proveedor = $scope.form.proveedor.split('-')[0].trim()
              }

              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                // allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              });
              $http({
                method: 'POST',
                url: "php/financiera/impresionmasiva.php",
                data: {
                  function: "p_impresion_ffac",
                  empresa: '1',
                  documento: $scope.form.documento,
                  concepto: $scope.form.concepto,
                  proveedor: proveedor,
                  fecha_inicial: $scope.formatDate($scope.form.fechaInicio),
                  fecha_final: $scope.formatDate($scope.form.fechaFinal),
                  numero_inicial: $scope.form.numeroInicial,
                  numero_final: $scope.form.numeroFinal,

                  cedula: $scope.Rol_Cedula,
                  nombre: $scope.Rol_Nombre

                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.length == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.codigo == 0) {
                  swal("Mensaje", "Facturas generadas "+data.cantidad, "success").catch(swal.noop);
                  window.open("temp/" + data.ruta, '_blank');
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            }
          })
        }
      }


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

    }]);
