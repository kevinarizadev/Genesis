'use strict';
angular.module('GenesisApp')
  .controller('inventariodecajasController', ['$scope', '$http', '$timeout',
    function ($scope, $http, $timeout) {

      ////////////////////////((((((((FUNCTION DE INICIO))))))))\\\\\\\\\\\\\\\\\\\\\\

      $scope.Inicio = function () {
        // console.log($(window).width());
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $scope.SysDay = new Date();
        $scope.accion = 'n';
        $scope.indice;
        $('.tabs').tabs();
        document.getElementById("numero_caja").focus();
        $scope.Tabs = 1;
        $scope.Cargar_Auto;
        $scope.Limpiar();
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      $scope.Limpiar = function () {
        $scope.Form = {
          numero_caja: '',
          numero_factura: ''
        };

        $scope.Val_Caja = false;

        //((((((((((((CREACION DE ARRAY)))))))))))))))\\

        $scope.List_relacion = new Array();
        $scope.List_relacion_encontradas = new Array();
        $scope.lis_info = new Array();
        $scope.ver_guardar = false;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      ////////////////////////(((((((( FIN FUNCTION DE INICIO))))))))\\\\\\\\\\\\\\\\\\\\\\

      $scope.Validar_Caja = function () {
        if ($scope.Form.numero_caja != '' && $scope.Form.numero_caja != undefined && $scope.Form.numero_caja != "0") {

          $http({
            method: 'POST',
            url: "php/administrativa/inventariodecajas.php",
            data: {
              function: 'Datos_Caja',
              numero_caja: $scope.Form.numero_caja
            }
          }).then(function (response) {
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
              $scope.Val_Caja = true;
              if (response.data.length == 0) {
                // console.log(response.data);
              } else {
                $scope.List_relacion_encontradas = response.data;
                document.getElementById("numero_factura").focus();
              }
            } else {
              swal('Notificación', response.data, 'warning');
            }
          });
        } else {
          swal({
            type: 'error',
            title: 'Ingresar numero de la caja',
            showConfirmButton: false, timer: 2000
          });
        }
      }




      $scope.Validar_Factura = function () {
        if ($scope.Form.numero_factura != '' && $scope.Form.numero_factura != undefined) {
          var datos = $scope.List_relacion.find(x => x.factura === $scope.Form.numero_factura);
          // console.log(datos);
          if (!datos) {
            $http({
              method: 'POST',
              url: "php/administrativa/inventariodecajas.php",
              data: {
                function: 'Consulta_Factura',
                numero_factura: $scope.Form.numero_factura
              }
            }).then(function (response) {
              if (response.data && response.data.toString().substr(0, 3) != '<br') {
                // console.log(response.data);
                if (response.data.codigo == 1) {
                  swal({
                    type: 'info', title: 'La factura no es valida o ya existe en una caja',
                    showConfirmButton: false, timer: 2000
                  });
                  $scope.Form.numero_factura = '';
                } else {
                  // ESTA CODIGO SIRVE PARA ENVIAR FACTURA CUANDO ENCUENTRA UNA SOLA
                  $scope.List_relacion = response.data;
                  $scope.Form.numero_factura = '';
                  // console.log($scope.List_relacion.length);
                  if (response.data.length == 1) {
                    var index = $scope.List_relacion_encontradas.findIndex(x => x.factura == response.data[0].factura && x.nit == response.data[0].nit && x.valor == response.data[0].valor);
                    if (index != "-1") {
                      swal({
                        type: 'error', title: 'Factura existente',
                        showConfirmButton: false, timer: 1500
                      });
                      $scope.Form.numero_factura = '';
                    } else {
                      $scope.List_relacion_encontradas.push(response.data[0]);
                      Materialize.toast('¡Factura cargada a la caja!', 2000);
                      $scope.Restablecer();
                    }
                  }
                }
              } else {

                swal('Notificación', response.data, 'warning');
              }
            });
          } else {
            {
              swal({
                type: 'error', title: 'Factura existente',
                showConfirmButton: false, timer: 1500
              });
            }
          }
        }
      }



      $scope.Cargar_Factura = function (datos) {
        // console.log(datos);
        var index = $scope.List_relacion_encontradas.findIndex(x => x.factura == datos.factura && x.nit == datos.nit && x.valor == datos.valor);
        // console.log(index);
        if (index != "-1") {
          swal({
            type: 'error', title: 'Factura existente',
            showConfirmButton: false, timer: 1500
          });
        } else {
          $scope.ver_guardar = true;
          // console.log(datos.factura);
          $scope.List_relacion_encontradas.push(datos);
          $scope.List_relacion = [];
          document.getElementById("numero_factura").focus();
          setTimeout(() => {
            $scope.$apply();
          }, 500);
          $scope.Restablecer();
        }
      }

      ///////////////////////(((((((((((((((((((MODULO DE CONSULTA)))))))))))))))))))\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

      $scope.BuscarNumero = function () {
        if ($scope.Form.Tipo_Numero != undefined) {

          if ($scope.Form.Numero_F != '') {
            $scope.filter_facturas_consulta = '';

            $http({
              method: 'POST',
              url: "php/administrativa/inventariodecajas.php",
              data: {
                function: 'Consultas',
                numero_factura: $scope.Form.Tipo_Numero == 'NF' ? $scope.Form.Numero_F : '',
                numero_caja: $scope.Form.Tipo_Numero == 'NC' ? $scope.Form.Numero_F : '',
              }
            })
              .then(function (response) {
                if (response.data && response.data.toString().substr(0, 3) != '<br') {
                  if (response.data.length == 0) {
                    $scope.filter_facturas_consulta = '';
                    // console.log(response.data);
                    swal({
                      type: 'error', title: 'No se encontro numero asociado',
                      showConfirmButton: false, timer: 1500
                    });

                  } else {
                    $scope.lis_info = response.data;
                  }
                } else {
                  swal('Notificación', response.data, 'warning');
                }
              });
          } else {
            swal({
              type: 'error', title: 'Digite numero a consultar',
              showConfirmButton: false, timer: 1500
            });
          }

        } else {

          swal({
            type: 'error', title: 'Seleccione el tipo de consulta',
            showConfirmButton: false, timer: 1500
          });

        }
      }



      ///////////////////////(((((((((((((((((((MODULO DE PARA GUARDAR)))))))))))))))))))\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

      $scope.Guardar_facturas = function () {
        if ($scope.List_relacion_encontradas == '') {
          swal({
            type: 'error',
            title: 'No es posible guardar una caja sin facturas',
            showConfirmButton: false, timer: 2000
          });
        } else {
          if ($scope.List_relacion_encontradas != '' && $scope.List_relacion_encontradas != undefined) {
            $scope.datosenviar = {
              caja: $scope.Form.numero_caja,
              facturas: $scope.List_relacion_encontradas
            }
             swal({ title: 'Cargando...', allowOutsideClick: false });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/administrativa/inventariodecajas.php",
              data: {
                function: 'Actualiza_Fact_Caja',
                datos: $scope.datosenviar
              }
            }).then(function (response) {
              if (response.data && response.data.toString().substr(0, 3) != '<br') {
                // console.log(response.data);
                if (response.data.codigo == 0) {
                  swal({
                    type: 'success',
                    title: 'Datos Guardados',
                    showConfirmButton: false, timer: 2000
                  });
                  $scope.Limpiar();
                }else{
                  swal('Notificación', response.data.mensaje, 'warning');
                }
              } else {
                swal('Notificación', response.data, 'warning');
              }
            });
          }
        }
      }


      $scope.Generar_Reporte = function () {
        if ($scope.F_Inicio != '' && $scope.F_Final != '' && $scope.F_Inicio <= $scope.F_Final) {
          // console.log($scope.F_Inicio)
          var F_Inicio = $scope.formatDate($scope.F_Inicio);
          var F_Final = $scope.formatDate($scope.F_Final);
          window.open('views/administrativa/formatos/formato_inventariodecajas.php?F_Inicio=' + F_Inicio + '&F_Final=' + F_Final, '_blank', "width=900,height=1100");
        } else {
          swal({
            type: 'error', title: 'Por favor ingresar el rango de fecha correcto',
            showConfirmButton: false, timer: 2500
          });
        }
      }

      $scope.Eliminar = function (factura) {
        swal({
          title: "IMPORTANTE",
          text: "¿Esta seguro que desea eliminar el registro?",
          type: "question",
          showCancelButton: true,
        })
          .then((result) => {
            if (result) {
              var index = $scope.List_relacion_encontradas.findIndex(x => x.factura == factura);

              // console.log(index)
              $scope.List_relacion_encontradas.splice(index, 1);
              setTimeout(() => {
                $scope.$apply();
              }, 500);
            }
          });
      };

      $scope.Restablecer = function (numero_factura) {

        var index = $scope.List_relacion.findIndex(x => x.factura === numero_factura);
        $scope.List_relacion.splice(index, 1);
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      $scope.Cancelar = function () {
        swal({
          title: "IMPORTANTE",
          text: "¿Esta seguro que desea cancelar?",
          type: "question",
          showCancelButton: true,
        })
          .then((result) => {
            if (result) {
              $scope.Limpiar();
            }
          });
      }


      $scope.formatDate = function (date) {
        var d = new Date(date);
        var dd = ('0' + d.getDate()).slice(-2);
        var mm = ('0' + (d.getMonth() + 1)).slice(-2);
        var yyyy = d.getFullYear();
        return dd + '/' + mm + '/' + yyyy;
      }

      $scope.FormatSoloNumero = function (NID) {
        if ($scope.Form.Tipo_Numero == 'NC' || $scope.Form.Tipo_Numero == '') {
          const input = document.getElementById('' + NID + '');
          var valor = input.value;
          valor = valor.replace(/[^0-9]/g, '');
          input.value = valor;
        }
        if ($scope.Form.Tipo_Numero == 'NF') {
          const input = document.getElementById('' + NID + '');
          input.value = input.value.toString().toUpperCase();
        }
      }

      $scope.Selector = function () {
        $scope.lis_info = [];
        $scope.Form.Numero_F = '';
      }

      $scope.SetTab = function (x) {
        $scope.Tabs = x;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      $scope.formatPeso2 = function (num) {
        if (num != undefined) {
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
        }
      }

      $scope.$watch('switch_view', function () {
        $timeout(function () {
          if ($scope.switch_view) {
            $("#Sol").click();
            $scope.SetTab(1);
          }
        }, 100)
      });
      $(window).on('resize', function () {
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
      });

      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

    }]);
