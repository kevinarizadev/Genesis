'use strict';
angular.module('GenesisApp')
  .controller('evaluacionempleadomesController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {
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
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $scope.Rol_Nombre = sessionStorage.getItem('nombre').toString().toUpperCase();
        $scope.Rol_Cod = sessionStorage.getItem('rolcod');

        $scope.Vista = 0;

        $scope.SysDay = new Date();
        $scope.Hoja_Crear();
        $scope.Obtener_Funcs();
        $scope.Mostrar_Descargar = false;
        //////////////
        if ($scope.Rol_Cod == "0" || $scope.Rol_Cod == '76' || $scope.Rol_Cod == '116') {
          $scope.Mostrar_Descargar = true;
        }
        ////////////////////////////////
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octobre", "Noviembre", "Diciembre"
        ];
        const d = new Date();
        $scope.Mes = monthNames[d.getMonth()];
        $scope.MesAno = (((d.getMonth() + 1) <= 9) ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + '/' + d.getFullYear();
        //////////////
        // if (d.getDate() < 20 || d.getDate() > 25) {
        //   $scope.Form.Status = 3;
        //   swal(
        //     '¡Importante!',
        //     'La encuesta solo está habilitada desde el día 20 hasta el 25 de cada mes.',
        //     'info'
        //   ).catch(swal.noop);
        // }
        setTimeout(() => {
          $scope.$apply();
        }, 500);
        //////////////////////////////////////////////////////////
      }
      // 12964797
      $scope.Hoja_Crear = function () {
        $scope.Form = {
          Status: 0,

          Cedula: '',
          Cedula_Usu: '',
          Nombre_Usu: '',
          Oficina: '',
          Area: '',
          Cod_Area: '',
          Jefe: '',
          Cal_Final: '',

          Radios: [
            {
              Item: '1',
              Subtotal: 0,
              Consideracion: '',
              Preguntas: [
                {
                  Pregunta: '1',
                  Nombre: 'Planificacion',
                  Calificacion: '',
                  Observacion: '',
                },
                {
                  Pregunta: '2',
                  Nombre: 'Asistencia',
                  Calificacion: '',
                  Observacion: '',
                }
              ]
            },
            {
              Item: '2',
              Subtotal: 0,
              Consideracion: '',
              Preguntas: [
                {
                  Pregunta: '3',
                  Nombre: 'Dotacion',
                  Calificacion: '',
                  Observacion: '',
                }
              ]
            },
            {
              Item: '3',
              Subtotal: 0,
              Consideracion: '',
              Preguntas: [
                {
                  Pregunta: '4',
                  Nombre: 'Responsabilidad',
                  Calificacion: '',
                  Observacion: '',
                },
                {
                  Pregunta: '5',
                  Nombre: 'Compromiso',
                  Calificacion: '',
                  Observacion: '',
                }
              ]
            },
            {
              Item: '4',
              Subtotal: 0,
              Consideracion: '',
              Preguntas: [
                {
                  Pregunta: '6',
                  Nombre: 'Cooperacion',
                  Calificacion: '',
                  Observacion: '',
                },
                {
                  Pregunta: '7',
                  Nombre: 'Liderazgo',
                  Calificacion: '',
                  Observacion: '',
                }
              ]
            }
          ]

        };
        $scope.Busqueda = {
          Func: {
            Filtro: [],
            Listado: null,
            SAVE: null,
            Seleccion: 9999
          }
        };
      }

      $scope.Hoja_Limpiar = function () {
        $scope.Form.Radios = [
          {
            Item: '1',
            Subtotal: 0,
            Consideracion: '',
            Preguntas: [
              {
                Pregunta: '1',
                Nombre: 'Planificacion',
                Calificacion: '',
                Observacion: '',
              },
              {
                Pregunta: '2',
                Nombre: 'Asistencia',
                Calificacion: '',
                Observacion: '',
              }
            ]
          },
          {
            Item: '2',
            Subtotal: 0,
            Consideracion: '',
            Preguntas: [
              {
                Pregunta: '3',
                Nombre: 'Dotacion',
                Calificacion: '',
                Observacion: '',
              }
            ]
          },
          {
            Item: '3',
            Subtotal: 0,
            Consideracion: '',
            Preguntas: [
              {
                Pregunta: '4',
                Nombre: 'Responsabilidad',
                Calificacion: '',
                Observacion: '',
              },
              {
                Pregunta: '5',
                Nombre: 'Compromiso',
                Calificacion: '',
                Observacion: '',
              }
            ]
          },
          {
            Item: '4',
            Subtotal: 0,
            Consideracion: '',
            Preguntas: [
              {
                Pregunta: '6',
                Nombre: 'Cooperacion',
                Calificacion: '',
                Observacion: '',
              },
              {
                Pregunta: '7',
                Nombre: 'Liderazgo',
                Calificacion: '',
                Observacion: '',
              }
            ]
          }
        ];
        ///

        (document.querySelector('input[name="group11"]:checked')) ? document.querySelector('input[name="group11"]:checked').checked = false : '';
        (document.querySelector('input[name="group12"]:checked')) ? document.querySelector('input[name="group12"]:checked').checked = false : '';
        (document.querySelector('input[name="group21"]:checked')) ? document.querySelector('input[name="group21"]:checked').checked = false : '';
        (document.querySelector('input[name="group31"]:checked')) ? document.querySelector('input[name="group31"]:checked').checked = false : '';
        (document.querySelector('input[name="group32"]:checked')) ? document.querySelector('input[name="group32"]:checked').checked = false : '';
        (document.querySelector('input[name="group41"]:checked')) ? document.querySelector('input[name="group41"]:checked').checked = false : '';
        (document.querySelector('input[name="group42"]:checked')) ? document.querySelector('input[name="group42"]:checked').checked = false : '';

        document.querySelectorAll(".Valid_Campo").forEach(e => {
          e.classList.remove("Valid_Campo");
        });
        angular.forEach(document.querySelectorAll('.Form_Desactivados input'), function (i) {
          i.setAttribute("readonly", true);
        });
        setTimeout(() => {
          $scope.Form.Cedula = '';
          $scope.$apply();
        }, 100);
      }

      $scope.Sum_SubTotal = function (Item) {
        var item = $scope.Form.Radios.find(x => x.Item === Item);
        var Subtotal = 0;
        item.Preguntas.forEach(e => {
          Subtotal += parseInt((e.Calificacion == '' ? 0 : e.Calificacion))
        });
        item.Subtotal = Subtotal;
      }

      $scope.Val_Subtotal = function (Item) {
        return new Promise((resolve) => {
          var item = $scope.Form.Radios.find(x => x.Item === Item);
          item.Preguntas.forEach(e => {
            if (e.Calificacion == '') {
              resolve(1)//Subtotal vacio debe diligenciar
            }
          });
          if (item.Subtotal == 0) {
            resolve(1)//Subtotal vacio debe diligenciar
          }
          if (item.Consideracion.length < 20 && item.Subtotal == (item.Preguntas.length * 3)) {
            resolve(2)//Puntaje maximo debe escribir consideracion
          }
          resolve(3)//Sin problema
        });
      }

      $scope.Validar = function () {
        var array = [
          $scope.Val_Subtotal('1'),
          $scope.Val_Subtotal('2'),
          $scope.Val_Subtotal('3'),
          $scope.Val_Subtotal('4')
        ]
        Promise.all(array).then(values => {
          var Validador = false;
          for (let index = 0; index < values.length; index++) {
            console.log(values[index])
            if (values[index] == 1) {
              Validador = true;
              swal(
                '¡Ocurrio un error!',
                'Debe diligenciar los puntajes en el item (' + (index + 1) + ')',
                'warning'
              ).catch(swal.noop);
              break;
            }
            if (values[index] == 2) {
              Validador = true;
              swal(
                '¡Ocurrio un error!',
                'Debe diligenciar el campo Consideraciones en el item (' + (index + 1) + ')',
                'warning'
              ).catch(swal.noop);
              break;
            }
          }
          if (Validador == false) {
            $scope.Guardar_Registro();
          }
        });
        // console.log($scope.Val_Subtotal('1'))

      }

      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////

      $scope.Guardar_Registro = function () {
        $scope.Form.Cal_Final = 0;
        var preguntas = '';
        $scope.Form.Radios.forEach(e => {
          e.Preguntas.forEach(y => {
            y.Observacion = e.Consideracion;
            // preguntas += y + ',';
            preguntas += (JSON.stringify(y).replace(/\\/g, '')) + ',';
            $scope.Form.Cal_Final += y.Calificacion;
          });
        });
        preguntas = '[' + preguntas.substr(0, preguntas.length - 1) + ']';
        console.log(preguntas);
        var Cal_Final = 'Calificación Final (' + $scope.Form.Cal_Final + ')';
        swal({
          title: '¿Desea guardar la encuesta?',
          text: Cal_Final,
          type: 'question',
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {

            swal({ title: 'Cargando...' });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/talentohumano/evaluacionempleadomes.php",
              data: {
                function: 'Guardar_Respuesta',
                Cons_encuesta: '1',
                Cedula_Func: $scope.Form.Cedula_Usu,
                Area: $scope.Form.Cod_Area,
                Oficina: $scope.Form.Oficina,
                Cedula_Jefe: $scope.Rol_Cedula,
                Preguntas: preguntas,
                Cantidad_Preguntas: 7,
                Obs_General: ''
              }
            }).then(function (response) {
              if (response.data.toString().substr(0, 3) != '<br') {
                if (response.data.Codigo != undefined && response.data.Codigo == 0) {
                  $scope.Form.Status = 0;
                  $scope.Hoja_Limpiar();
                  $scope.Obtener_Funcs();
                  swal(
                    '¡Mensaje!',
                    response.data.Nombre,
                    'success'
                  ).catch(swal.noop);
                } else {
                  swal(
                    '¡Ocurrio un error!',
                    response.data.Nombre,
                    'warning'
                  ).catch(swal.noop);
                }
              }
            });
          }
        }).catch(swal.noop);
      }

      $scope.Volver = function () {
        $scope.Form.Status = $scope.Form.Status - 1;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

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
      //CONSULTA USUARIO ASIGNADA
      $scope.Obtener_Funcs = function () {
        $http({
          method: 'POST',
          url: "php/talentohumano/evaluacionempleadomes.php",
          data: {
            function: 'Obtener_Funcs',
            Cedula: $scope.Rol_Cedula
          }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br') {
            if (response.data[0] != undefined) {
              $scope.Busqueda.Func.Listado = response.data;
            } else {
              $scope.Busqueda.Func.Listado = [];
              swal(
                '¡Ocurrio un error!',
                'No tiene funcionarios a cargo.',
                'warning'
              ).catch(swal.noop);
            }
          }
        });
      }

      $scope.KeyFind_ObFunc = function (keyEvent) {
        if ($scope.Busqueda.Func.Filtro != null && $scope.Busqueda.Func.Filtro.length != 0) {
          if (keyEvent.which === 40) {
            $scope.Busqueda.Func.Seleccion = $scope.Busqueda.Func.Seleccion >= ($scope.Busqueda.Func.Filtro.length - 1) ? 0 : $scope.Busqueda.Func.Seleccion + 1;
            document.querySelector('.Clase_Listar_Func').scrollTo(0, document.querySelector('#Func' + $scope.Busqueda.Func.Seleccion).offsetTop);
            console.log($scope.Busqueda.Func.Seleccion);
          } else if (keyEvent.which === 38) {
            $scope.Busqueda.Func.Seleccion = $scope.Busqueda.Func.Seleccion <= 0 || $scope.Busqueda.Func.Seleccion == 9999 ? $scope.Busqueda.Func.Filtro.length - 1 : $scope.Busqueda.Func.Seleccion - 1;
            document.querySelector('.Clase_Listar_Func').scrollTo(0, document.querySelector('#Func' + $scope.Busqueda.Func.Seleccion).offsetTop)
            console.log($scope.Busqueda.Func.Seleccion);
          } else if (keyEvent.which === 13 && $scope.Busqueda.Func.Seleccion != 9999) {
            var x = $scope.Busqueda.Func.Filtro[$scope.Busqueda.Func.Seleccion];
            $scope.FillTextbox_Listado_Func(x);
          }
        } else {
          // if (keyEvent.which === 13)
          //   $scope.Buscar_ObUsuario();
        }
      }
      $scope.Complete_Listado_Func = function (keyEvent, string) {
        if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
          if ($scope.Form.Cedula_Usu != undefined && string != undefined && $scope.Busqueda.Func.Listado != undefined) {
            $('.Clase_Listar_Func').css({ width: $('#Modal_Func')[0].offsetWidth });
            var output = [];
            angular.forEach($scope.Busqueda.Func.Listado, function (x) {
              if (x.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.DOCUMENTO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                output.push({ "DOCUMENTO": x.DOCUMENTO, "NOMBRE": x.NOMBRE.toUpperCase(), "NOM_AREA": x.NOM_AREA, "DOC_JEFE": x.DOC_JEFE, "OFICINA": x.OFICINA, "COD_AREA": x.COD_AREA });
              }
            });
            $scope.Busqueda.Func.Filtro = output;
            $scope.Busqueda.Func.Seleccion = 9999;
          }
        }
      }
      $scope.FillTextbox_Listado_Func = function (x) {
        if ($scope.MesAno == x.ULTIMA_ENCUESTA) {
          swal(
            '¡Ocurrio un error!',
            'Este funcionario ya fue diligenciado este mes.',
            'warning'
          ).catch(swal.noop);
          return;
        }
        var Encontrado = 0;
        $scope.Busqueda.Func.Filtro.forEach(e => {
          Encontrado = Encontrado + ($scope.MesAno == e.ULTIMA_ENCUESTA ? 1 : 0)
        });

        if (Encontrado != 0) {
          swal({
            title: '¡Ya escogio un empleado del mes!',
            text: 'Si diligencia uno nuevo, se eliminará el anterior, Diligenciar de todos modos?',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: "Continuar",
            cancelButtonText: "Cancelar",
            allowOutsideClick: false
          }).then(function (result) {
            if (result) {
              $scope.Hoja_Limpiar();
              $scope.Form.Cedula_Usu = x.DOCUMENTO;
              $scope.Form.Nombre_Usu = x.NOMBRE;

              $scope.Form.Oficina = x.OFICINA;
              $scope.Form.Area = x.NOM_AREA;
              $scope.Form.Cod_Area = x.COD_AREA;
              $scope.Form.Jefe = $scope.Rol_Nombre;

              $scope.Form.Status = 1;
              $scope.Busqueda.Func.Filtro = null;
              setTimeout(() => {
                $scope.$apply();
              }, 500);
            }

          }).catch(swal.noop);
        } else {
          $scope.Hoja_Limpiar();
          $scope.Form.Cedula_Usu = x.DOCUMENTO;
          $scope.Form.Nombre_Usu = x.NOMBRE;

          $scope.Form.Oficina = x.OFICINA;
          $scope.Form.Area = x.NOM_AREA;
          $scope.Form.Cod_Area = x.COD_AREA;
          $scope.Form.Jefe = $scope.Rol_Nombre;

          $scope.Form.Status = 1;
          $scope.Busqueda.Func.Filtro = null;
          setTimeout(() => {
            $scope.$apply();
          }, 500);
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