'use strict';
angular.module('GenesisApp')
  .controller('encuestapoController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {
        $scope.Tabs = 0;
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
        $('.modal').modal();
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $scope.Rol_Nombre = sessionStorage.getItem('nombre').toString().toUpperCase();
        $scope.Rol_Cod = sessionStorage.getItem('rolcod');

        $scope.Tabs = 1;
        $('.tabs').tabs();

        $scope.SysDay = new Date();
        $scope.Hoja_Crear();

        $scope.Mostrar_Descargar = false;
        //////////////
        if ($scope.Rol_Cod == "0" || $scope.Rol_Cod == '76' || $scope.Rol_Cod == '116') {
          $scope.Mostrar_Descargar = true;
        }
        ////////////////////////////////
        setTimeout(() => {
          $scope.$apply();
        }, 500);
        //////////////////////////////////////////////////////////
      }
      // 12964797
      $scope.Hoja_Crear = function () {
        $scope.Form = {
          Status: 0,
          Id_Problema: '',
          // Problema: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum pariatur modi dolorum? Cupiditate veritatis ut nemo nisi quasi eveniet ullam odit. Autem, eligendi accusamus voluptatibus quas atque hic dolor ducimus.',
          Problema: '',

          Hoja1: {
            Modal_Titulo: '',
            Modal_CausaEfecto: '',
            Modal_CausaEfecto_Tipo: '',
            Modal_CausaEfecto_DetalleSN: '',
            Modal_Descripcion: '',

            Causas: [
              // {
              //   Id: '21',
              //   Titulo: 'Causa 1',
              //   Descripcion: 'Causa 1',
              //   Detalle: [
              //     // {
              //     //   Id: 1,
              //     //   Titulo: 'Causa 1 Det',
              //     //   Descripcion: 'Causa 1 Det',
              //     // }
              //   ]
              // }
            ],
            Efectos: [
              // {
              //   Id: 1,
              //   Titulo: 'Efecto 1',
              //   Descripcion: 'Efecto 1',
              //   Detalle: [
              //     {
              //       Id: 1,
              //       Titulo: 'Efecto 1 Det',
              //       Descripcion: 'Efecto 1 Det',
              //     }
              //   ]
              // }
            ],

          },

          Hoja2: {
            Modal_Titulo: '',
            Modal_CausaEfecto: '',
            Modal_CausaEfecto_Tipo: '',
            Modal_CausaEfecto_DetalleSN: '',
            Modal_Descripcion: '',

            Causas: [
              // {
              //   Id: 1,
              //   Titulo: 'Hoja 2 Causa 1',
              //   Descripcion: 'Hoja 2 Causa 1',
              //   Detalle: [
              //     {
              //       Id: 1,
              //       Titulo: 'Hoja 2 Causa 1 Det',
              //       Descripcion: 'Hoja 2 Causa 1 Det',
              //     }
              //   ]
              // }
            ],
            Efectos: [
              // {
              //   Id: 1,
              //   Titulo: 'Hoja 2 Efecto 1',
              //   Descripcion: 'Hoja 2 Efecto 1',
              //   Detalle: [
              //     {
              //       Id: 1,
              //       Titulo: 'Hoja 2 Efecto 1 Det',
              //       Descripcion: 'Hoja 2 Efecto 1 Det',
              //     }
              //   ]
              // }
            ],
          },
          Modal_CausaEfecto_Detalle_Array: []
        };
      }


      $scope.Guardar_Problema = function () {
        if ($scope.Form.Problema.length <= 29) {
          swal(
            '¡Importante!',
            'Debe diligenciar la descripción correctamente (Mínimo 30 caracteres)',
            'info'
          ).catch(swal.noop);
          return;
        }
        ////////////////////////
        swal({ title: 'Cargando...' });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/encuestas/encuestapo.php",
          data: {
            function: 'P_INS_PROBLEMA',
            Desc: $scope.Form.Problema,
            Resp: $scope.Rol_Cedula
          }
        }).then(function (response) {
          $scope.CatchErrors(response.data);
          if (response.data.toString().substr(0, 3) != '<br') {
            console.log(response.data);
            if (response.data.Codigo != undefined && response.data.Codigo == 0) {
              $scope.Form.Id_Problema = response.data.Idproblema;
              $scope.Form.Status = 1;

              swal.close();
              setTimeout(() => {
                $('.tabs').tabs();
                $scope.$apply();
              }, 500);
            }
          }
        });

        ////////////////////////
      }
      $scope.Validar = function () {
        if ($scope.Form.Hoja1.Causas.length == 0 || $scope.Form.Hoja1.Efectos.length == 0) {
          swal(
            '¡Importante!',
            'Debe diligenciar al menos 1 Causa y 1 Efecto',
            'info'
          ).catch(swal.noop);
          return;
        }
       if ($scope.Form.Hoja2.Causas.length == 0 && $scope.Form.Hoja2.Efectos.length == 0) {
          swal({
            title: '¿Desea guardar la encuesta sin haber llenado el árbol de objetivos?',            
            type: 'question',
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            allowOutsideClick: false
          }).then(function (result) {
            if (result) {
              $scope.Hoja_Crear();
              swal(
                '¡Mensaje!',
                'Encuesta Guardada',
                'success'
              ).catch(swal.noop);
              setTimeout(() => {
                $scope.$apply();
              }, 1500);
            }
          });
          
        }else{
          $scope.Hoja_Crear();
              swal(
                '¡Mensaje!',
                'Encuesta Guardada',
                'success'
              ).catch(swal.noop);
              setTimeout(() => {
                $scope.$apply();
              }, 1500);
        }
      }

      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////

      $scope.Descarga_Historial = function () {
        if ($scope.SysDay.getDate() < 20) {
          swal(
            '¡Importante!',
            'A partir del día 20 puede descargar las encuestas de este mes.',
            'info'
          ).catch(swal.noop);
          return;
        }
        window.open('views/talentohumano/formatos/evaluacionempleadomes.php?Mes=' + $scope.Mes + '&MesAno=' + $scope.MesAno, '_blank', "width=1080,height=1100");
      }

      //////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
      /////HOJA1
      $scope.Abrir_Modal_Hoja1_CausaEfecto = function (CausaEfecto, Detalle) {
        $('#Modal_Hoja1_CausaEfecto').modal('open');
        $scope.Form.Hoja1.Modal_Titulo = CausaEfecto == 'Causa' ? 'Nueva Causa' : 'Nuevo Efecto';
        $scope.Form.Hoja1.Modal_CausaEfecto_Tipo = CausaEfecto == 'Causa' ? 'C' : 'E';
        $scope.Form.Hoja1.Modal_CausaEfecto = '';
        $scope.Form.Hoja1.Modal_Descripcion = '';
        $scope.Form.Hoja1.Modal_CausaEfecto_DetalleSN = Detalle;
      }
      $scope.Guardar_Modal_Hoja1_CausaEfecto = function () {
        var CausaEfecto = $scope.Form.Hoja1.Modal_CausaEfecto_Tipo == 'C' ? 'Causas' : 'Efectos';

        if ($scope.Form.Hoja1.Modal_CausaEfecto.length <= 0 || $scope.Form.Hoja1.Modal_Descripcion.length <= 0) {
          swal(
            '¡Importante!',
            'Debe diligenciar los dos campos correctamente',
            'info'
          ).catch(swal.noop);
          return;
        }

        //CausaEfecto   --- 'Causa' --- 'Efecto'
        ///////////////////
        if (!($scope.Form.Hoja1.Modal_CausaEfecto_DetalleSN != null && $scope.Form.Hoja1.Modal_CausaEfecto_DetalleSN != undefined)) {//Valida si es Cabeza o Detalle de CausaEfecto
          ///////////GUARDAR CAUSA/EFECTO
          swal({ title: 'Cargando...' });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/encuestas/encuestapo.php",
            data: {
              function: 'P_INS_CAUSAEFECTO',
              Idprob: $scope.Form.Id_Problema,
              Desc: $scope.Form.Hoja1.Modal_Descripcion,
              Tit: $scope.Form.Hoja1.Modal_CausaEfecto,
              Tipo: $scope.Form.Hoja1.Modal_CausaEfecto_Tipo,
              Obj: '0'
            }
          }).then(function (response) {
            $scope.CatchErrors(response.data);
            if (response.data.toString().substr(0, 3) != '<br') {
              console.log(response.data);
              if (response.data.Codigo != undefined && response.data.Codigo == 0) {
                $scope.Form.Hoja1[CausaEfecto].push(
                  {
                    Id: response.data.idcausaefecto, //$scope.Form.Hoja1[CausaEfecto].length + 1,
                    Titulo: $scope.Form.Hoja1.Modal_CausaEfecto,
                    Descripcion: $scope.Form.Hoja1.Modal_Descripcion,
                    Detalle: []
                  }
                )
                swal(
                  '¡Mensaje!',
                  response.data.Nombre,
                  'success'
                ).catch(swal.noop);
                // swal.close();
                console.log(JSON.stringify($scope.Form.Hoja1));
              }
            }
          });

        } else {
          ///////////GUARDAR CAUSA/EFECTO DETALLE
          swal({ title: 'Cargando...' });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/encuestas/encuestapo.php",
            data: {
              function: 'P_INS_CAUSAEFECTODETA',
              Idprob: $scope.Form.Id_Problema,
              Idcausaefecto: $scope.Form.Hoja1[CausaEfecto][$scope.Form.Hoja1.Modal_CausaEfecto_DetalleSN].Id,
              Desc: $scope.Form.Hoja1.Modal_Descripcion,
              Tit: $scope.Form.Hoja1.Modal_CausaEfecto
            }
          }).then(function (response) {
            $scope.CatchErrors(response.data);
            if (response.data.toString().substr(0, 3) != '<br') {
              console.log(response.data);
              if (response.data.Codigo != undefined && response.data.Codigo == 0) {
                $scope.Form.Hoja1[CausaEfecto][$scope.Form.Hoja1.Modal_CausaEfecto_DetalleSN].Detalle.push(
                  {
                    Id: $scope.Form.Hoja1[CausaEfecto][$scope.Form.Hoja1.Modal_CausaEfecto_DetalleSN].Detalle.length + 1,
                    Titulo: $scope.Form.Hoja1.Modal_CausaEfecto,
                    Descripcion: $scope.Form.Hoja1.Modal_Descripcion
                  }
                )
                swal(
                  '¡Mensaje!',
                  response.data.Nombre,
                  'success'
                ).catch(swal.noop);
                $scope.Form.Hoja1.Modal_CausaEfecto_DetalleSN = null;
                // swal.close();
                console.log(JSON.stringify($scope.Form.Hoja1));
                ///////////////////
              }
            }
          });
        }
        ///////////////////
        $scope.closeModal();
        // console.log(JSON.stringify($scope.Form.Hoja1));

        setTimeout(() => {
          $scope.Form.Hoja1.Modal_CausaEfecto = '';
          $scope.Form.Hoja1.Modal_Descripcion = '';
          $scope.$apply();
          $("#collapsible-header-Hoja1" + CausaEfecto).removeClass(function () {
            return "active";
          }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: false });
        }, 1500);
      }
      /////HOJA2
      $scope.Abrir_Modal_Hoja2_CausaEfecto = function (CausaEfecto, Detalle) {
        $('#Modal_Hoja2_CausaEfecto').modal('open');
        $scope.Form.Hoja2.Modal_Titulo = CausaEfecto == 'Causa' ? 'Nueva Causa' : 'Nuevo Efecto';
        $scope.Form.Hoja2.Modal_CausaEfecto_Tipo = CausaEfecto == 'Causa' ? 'C' : 'E';
        $scope.Form.Hoja2.Modal_CausaEfecto = '';
        $scope.Form.Hoja2.Modal_Descripcion = '';
        $scope.Form.Hoja2.Modal_CausaEfecto_DetalleSN = Detalle;
      }
      $scope.Guardar_Modal_Hoja2_CausaEfecto = function () {
        var CausaEfecto = $scope.Form.Hoja2.Modal_CausaEfecto_Tipo == 'C' ? 'Causas' : 'Efectos';

        if ($scope.Form.Hoja2.Modal_CausaEfecto.length <= 0 || $scope.Form.Hoja2.Modal_Descripcion.length <= 0) {
          swal(
            '¡Importante!',
            'Debe diligenciar los dos campos correctamente',
            'info'
          ).catch(swal.noop);
          return;
        }
        //CausaEfecto   --- 'Causa' --- 'Efecto'
        ///////////////////
        if (!($scope.Form.Hoja2.Modal_CausaEfecto_DetalleSN != null && $scope.Form.Hoja2.Modal_CausaEfecto_DetalleSN != undefined)) {//Valida si es Cabeza o Detalle de CausaEfecto
          ///////////GUARDAR CAUSA/EFECTO
          swal({ title: 'Cargando...' });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/encuestas/encuestapo.php",
            data: {
              function: 'P_INS_CAUSAEFECTO',
              Idprob: $scope.Form.Id_Problema,
              Desc: $scope.Form.Hoja2.Modal_Descripcion,
              Tit: $scope.Form.Hoja2.Modal_CausaEfecto,
              Tipo: $scope.Form.Hoja2.Modal_CausaEfecto_Tipo,
              Obj: '1'
            }
          }).then(function (response) {
            $scope.CatchErrors(response.data);
            if (response.data.toString().substr(0, 3) != '<br') {
              console.log(response.data);
              if (response.data.Codigo != undefined && response.data.Codigo == 0) {
                $scope.Form.Hoja2[CausaEfecto].push(
                  {
                    Id: response.data.idcausaefecto, //$scope.Form.Hoja2[CausaEfecto].length + 1,
                    Titulo: $scope.Form.Hoja2.Modal_CausaEfecto,
                    Descripcion: $scope.Form.Hoja2.Modal_Descripcion,
                    Detalle: []
                  }
                )
                swal(
                  '¡Mensaje!',
                  response.data.Nombre,
                  'success'
                ).catch(swal.noop);
                // swal.close();
                console.log(JSON.stringify($scope.Form.Hoja2));
              }
            }
          });
        } else {
          ///////////GUARDAR CAUSA/EFECTO DETALLE
          swal({ title: 'Cargando...' });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/encuestas/encuestapo.php",
            data: {
              function: 'P_INS_CAUSAEFECTODETA',
              Idprob: $scope.Form.Id_Problema,
              Idcausaefecto: $scope.Form.Hoja2[CausaEfecto][$scope.Form.Hoja2.Modal_CausaEfecto_DetalleSN].Id,
              Desc: $scope.Form.Hoja2.Modal_Descripcion,
              Tit: $scope.Form.Hoja2.Modal_CausaEfecto
            }
          }).then(function (response) {
            $scope.CatchErrors(response.data);
            if (response.data.toString().substr(0, 3) != '<br') {
              console.log(response.data);
              if (response.data.Codigo != undefined && response.data.Codigo == 0) {
                $scope.Form.Hoja2[CausaEfecto][$scope.Form.Hoja2.Modal_CausaEfecto_DetalleSN].Detalle.push(
                  {
                    Id: $scope.Form.Hoja2[CausaEfecto][$scope.Form.Hoja2.Modal_CausaEfecto_DetalleSN].Detalle.length + 1,
                    Titulo: $scope.Form.Hoja2.Modal_CausaEfecto,
                    Descripcion: $scope.Form.Hoja2.Modal_Descripcion
                  }
                )
                swal(
                  '¡Mensaje!',
                  response.data.Nombre,
                  'success'
                ).catch(swal.noop);
                $scope.Form.Hoja2.Modal_CausaEfecto_DetalleSN = null;
                // swal.close();
                console.log(JSON.stringify($scope.Form.Hoja2));
                ///////////////////
              }
            }
          });
        }
        ///////////////////
        $scope.closeModal();
        setTimeout(() => {
          $scope.Form.Hoja2.Modal_CausaEfecto = '';
          $scope.Form.Hoja2.Modal_Descripcion = '';
          $scope.$apply();
          $("#collapsible-header-Hoja2" + CausaEfecto).removeClass(function () {
            return "active";
          }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: false });
        }, 1500);
      }



      $scope.Abrir_Modal_Hojas_CausaEfecto_Detalle = function (Hoja, CausaEfecto, Detalle) {
        $('#Modal_Hojas_CausaEfecto_Detalle').modal('open');
        $scope.Form.Modal_CausaEfecto_Detalle_Array = $scope.Form[Hoja][CausaEfecto][Detalle].Detalle;

      }

      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
      $scope.CatchErrors = function (response) {
        if (response.toString().substr(0, 3) == '<br') {
          swal(
            '¡Mensaje!',
            response,
            'success'
          ).catch(swal.noop);
        }
        if (response.Codigo == undefined || response.Codigo == 1) {
          swal(
            '¡Mensaje!',
            response.Nombre,
            'success'
          ).catch(swal.noop);
        }
      }
      $scope.FormatTexto = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[|°"#$%&''´¨´¨¨¨<>]/g, '');
        valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
        valor = valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "");;
        input.value = valor;
      }

      $scope.closeModal = function () {
        $('.modal').modal('close');
      }

      $scope.setTab = function (x) {
        $scope.Tabs = x;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////

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