'use strict';
angular.module('GenesisApp')
  .controller('gestionproyectosController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_Pantalla();
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');

        // $scope.Tabs = 1;
        // $scope.Tabs = 0;
        $('.tabs').tabs();
        $('.modal').modal();

        $scope.Vista = 0;
        $scope.SysDay = new Date();
        $scope.Form_Limpiar();
        $scope.List_Limpiar();
        $scope.Obtener_Listado_Proyectos();
        $scope.Obtener_Areas();
        $scope.Obtener_Tipo_Proyectos();
        $scope.Obtener_Procesos();
        $scope.Obtener_Estados();
        $scope.Obtener_Fases();
        $scope.Obtener_Medios();
        $scope.Obtener_Responsables();
        $scope.Obtener_Rol();
        $scope.Obtener_Permisos();
        setTimeout(() => {
          // $scope.Crear_Nuevo();
          $scope.$apply();
        }, 500);


        //////////////////////////////////////////////////////////
      }

      // 12964797
      $scope.Form_Limpiar = function () {
        // 0 Tabla
        // 1 Nuevo
        // 2 Editar
        $scope.Form = {
          Status: 0,
          Filtro: '',

          Area: '',

          numeroProyecto: '',
          Nombre_Proyecto: '',

          Tipo_Proyecto: '',

          Proceso: '',
          Proceso_Cod: '',

          Estado: '',

          Fases: '',
          Fases_Control: '',

          F_Recepcion: '',

          F_Inicio: '',
          F_Fin: '',

          codigoProyecto: '',

          comentarioPausado: '',

          Porcentaje: 0,

          Asignados: [],

          soportesCargados: [],
          urlSoporte: [],
        };
        $scope.responsablesBk = [];
        $scope.archivosSubir = [];
        $scope.actualizarResp = 0;

        setTimeout(() => { $scope.formFunc = undefined; }, 300);
        // $scope.Obtener_Listado_Proyectos();
        ///
        document.querySelector('#filesProyecto').value = '';
        document.querySelectorAll(".Valid_Campo").forEach(e => {
          e.classList.remove("Valid_Campo");
        });
        angular.forEach(document.querySelectorAll('.Form_Desactivados input'), function (i) {
          i.setAttribute("readonly", true);
        });

        setTimeout(() => {
          $scope.$apply();
        }, 300);
      }

      $scope.List_Limpiar = function () {
        $scope.List = {
          List_Area: [],
          List_Tipo_Proyecto: [],
          Proceso: [],
          List_Estado: [],
          List_Fases: [],
          List_Medios: [],
          List_Responsables: [],
          List_Responsables_BK: [],
          List_Rol: [],
        };
      }
      $scope.Obtener_Listado_Proyectos = function () {
        $scope.Listado_Des = [];
        $scope.Listado_Fin = [];
        $scope.Listado_Pau = [];
        $scope.Listado_Pro = [];
        $scope.Listado_Total = [];
        $scope.Listado_Proys = [];
        $scope.Listado_Proys_Save = '';
        $http({
          method: 'POST',
          url: "php/tic/gestionproyectos.php",
          data: {
            function: 'p_listar_proyecto'
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            $scope.Listado_Total = data;
            $scope.Listado_Proys = data;

            data.forEach(e => {
              switch (e.estado.split('-')[0]) {
                case 'EXE':
                  $scope.Listado_Des.push(e);
                  break;
                case 'FIN':
                  $scope.Listado_Fin.push(e);
                  break;
                case 'PAU':
                  $scope.Listado_Pau.push(e);
                  break;
                case 'PRY':
                  $scope.Listado_Pro.push(e);
                  break;
                default:
                  break;
              }
            });
          } else {
            if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            swal("¡Importante!", data, "warning").catch(swal.noop);
          }
        });
      }

      $scope.Obtener_Areas = function () {
        $scope.List.List_Area = [];
        $http({
          method: 'POST',
          url: "php/tic/gestionproyectos.php",
          data: { function: "p_obtener_area" }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            $scope.List.List_Area = data;
          }
        })
      }
      $scope.Obtener_Tipo_Proyectos = function () {
        $scope.List.List_Tipo_Proyecto = [];
        $http({
          method: 'POST',
          url: "php/tic/gestionproyectos.php",
          data: { function: "p_obtener_tipop" }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            $scope.List.List_Tipo_Proyecto = data;
          }
        })
      }
      $scope.Obtener_Procesos = function () {
        $scope.List.List_Proceso = [];
        $http({
          method: 'POST',
          url: "php/tic/gestionproyectos.php",
          data: { function: "p_obtener_proceso" }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            $scope.List.List_Proceso = data;
          }
        })
      }
      $scope.Obtener_Estados = function () {
        $scope.List.List_Estado = [];
        $http({
          method: 'POST',
          url: "php/tic/gestionproyectos.php",
          data: { function: "p_obtener_estado" }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            $scope.List.List_Estado = data;
          }
        })
      }
      $scope.Obtener_Fases = function () {
        $scope.List.List_Fases = [];
        $http({
          method: 'POST',
          url: "php/tic/gestionproyectos.php",
          data: { function: "p_obtener_fases" }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            $scope.List.List_Fases = data;
            $scope.listFases_BK = data;
          }
        })
      }
      $scope.Obtener_Medios = function () {
        $scope.List.List_Medios = [];
        $http({
          method: 'POST',
          url: "php/tic/gestionproyectos.php",
          data: { function: "p_obtener_medios" }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            $scope.List.List_Medios = data;
          }
        })
      }
      $scope.Obtener_Responsables = function () {
        $scope.List.List_Responsables = [];
        $http({
          method: 'POST',
          url: "php/tic/gestionproyectos.php",
          data: { function: "p_obtener_recurso" }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            data.forEach(element => {
              element.hover = false;
              element.seleccionado = false
            });
            setTimeout(() => {
              $scope.List.List_Responsables = data;
              $scope.List.List_Responsables_BK = JSON.stringify(data);
              $scope.$apply();
            }, 500);
          }
        })
      }
      $scope.Obtener_Rol = function () {
        $scope.List.List_Rol = [];
        $http({
          method: 'POST',
          url: "php/tic/gestionproyectos.php",
          data: { function: "p_obtener_rol" }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            $scope.List.List_Rol = data;
          }
        })
      }
      $scope.Obtener_Permisos = function () {
        $http({
          method: 'POST',
          url: "php/tic/gestionproyectos.php",
          data: { function: "p_usuario_autorizado", cedula: $scope.Rol_Cedula }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            $scope.usuarioPermiso = data.codigo;
            console.log(data);
          }
        })
      }

      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
      $scope.Seleccionar_Responsables = function (x) {
        if ($scope.proyectoBK.estado.split('-')[0] != 'FIN') {
          $scope.List.List_Responsables[$scope.List.List_Responsables.findIndex(e => e.id == x.id)].seleccionado = true;
          // $scope.List.List_Responsables[xlsx].seleccionado = true;
          setTimeout(function () { $scope.$apply(); }, 500);
        }
      }

      $scope.Quitar_Responsables = function (x) {
        if ($scope.formFunc) { return false }
        if ($scope.proyectoBK.estado.split('-')[0] != 'FIN') {
          $scope.List.List_Responsables[$scope.List.List_Responsables.findIndex(e => e.id == x.id)].seleccionado = false;

          $scope.responsablesBk.forEach(element => {
            if (element.id == x.id) {
              $scope.List.List_Responsables[$scope.List.List_Responsables.findIndex(e => e.id == x.id)].accion = 'D';
            }
          });
        }
      }

      $scope.editar_Responsable = function (x) {
        var fechainiciofu;
        var fechafinfu;
        $scope.responsablesx.forEach(element => {
          if (element.id_responsable == x.id) {
            if (element.fecha_inicio == '' || element.fecha_fin == '') {
              fechainiciofu = '';
              fechafinfu = '';
            }else{
              if(element.fecha_inicio != '' && element.fecha_inicio != null && element.fecha_inicio != undefined){
                var fecha_inicio = element.fecha_inicio.split('/');
                fechainiciofu = new Date(fecha_inicio[2] + '/' + fecha_inicio[1] + '/' + fecha_inicio[0]);
              }
              if(element.fecha_fin != '' && element.fecha_fin != null && element.fecha_fin != undefined){
                var fecha_fin = element.fecha_fin.split('/');
              fechafinfu = new Date(fecha_fin[2] + '/' + fecha_fin[1] + '/' + fecha_fin[0]);
              }
              
            }
          }
      });
        // $scope.Obtener_Horas_Disponibilidad(x.id);
        if ($scope.proyectoBK.estado.split('-')[0] != 'FIN') {
          $scope.List.List_Responsables.forEach(e => {
            e.required = false;
          });
          x.required = true;
          $scope.formFunc = {
            estado: x.estado,
            id: x.id,
            nombre: x.nombre,
            salario: x.salario,
            rol: x.rol ? x.rol : '',
            horas: x.horas ? x.horas : '',
            fechainiciofu: fechainiciofu,
            fechafinfu: fechafinfu,
            required: true
          }
          console.log($scope.responsablesx);
          setTimeout(function () { $scope.$apply(); }, 500);
        }
      }
      $scope.Obtener_Horas_Disponibilidad = function () {
        $scope.horasdisponiblesf = [];
        $http({
          method: 'POST',
          url: "php/tic/gestionproyectos.php",
          data: { function: "VerHorasDisponibles", 
          pfecha_inicio: parsedia($scope.formFunc.fechainiciofu),
          pfecha_fin: parsedia($scope.formFunc.fechafinfu),
          // pfecha_inicio: parsedia($scope.Form.F_Inicio),
          // pfecha_fin: parsedia($scope.Form.F_Fin),
          cedula: $scope.formFunc.id}
        }).then(function (data) {
          if (data.toString().substr(0, 3) != '<br') {
            var disponibles = data.data[0].DISPONIBILIDAD;
            for (var i = 0; i < disponibles; i++) {
               var horas = i + 1;
              $scope.horasdisponiblesf.push({ horas: horas})
            }
          }
        })
      }


      $scope.actualizar_responsable = function () {
        angular.forEach(document.querySelectorAll('#formFunc .Valid_Campo'), function (i) { i.classList.remove('Valid_Campo'); });

        if ($scope.formFunc.rol == undefined || $scope.formFunc.rol == null || $scope.formFunc.rol == '') {
          document.querySelector("#formFunc_rol").classList.add("Valid_Campo"); return false;
        }
        if ($scope.formFunc.horas == undefined || $scope.formFunc.horas == null || $scope.formFunc.horas == '') {
          document.querySelector("#formFunc_horas").classList.add("Valid_Campo"); return false;
        }
        if ($scope.formFunc.fechainiciofu == undefined || $scope.formFunc.fechainiciofu == null || $scope.formFunc.fechainiciofu == '') {
          document.querySelector("#fechainiciofu").classList.add("Valid_Campo"); return false;
        }
        if ($scope.formFunc.fechafinfu == undefined || $scope.formFunc.fechafinfu == null || $scope.formFunc.fechafinfu == '') {
          document.querySelector("#fechafinfu").classList.add("Valid_Campo"); return false;
        }

        const indexResp = $scope.List.List_Responsables.findIndex(e => e.id == $scope.formFunc.id);
        $scope.List.List_Responsables[indexResp].rol = $scope.formFunc.rol;
        $scope.List.List_Responsables[indexResp].horas = $scope.formFunc.horas;
        $scope.List.List_Responsables[indexResp].finicio = parsedia($scope.formFunc.fechainiciofu);
        $scope.List.List_Responsables[indexResp].ffin = parsedia($scope.formFunc.fechafinfu);
        $scope.List.List_Responsables[indexResp].required = false;
        //
        $scope.List.List_Responsables[indexResp].accion = 'I';
        $scope.responsablesBk.forEach(element => {
          if (element.id == $scope.formFunc.id) {
            if (element.rol != $scope.formFunc.rol || element.horas != $scope.formFunc.horas
              || element.finicio != $scope.formFunc.fechainiciofu || element.ffin != $scope.formFunc.fechafinfu) {
              $scope.List.List_Responsables[indexResp].accion = 'U';
            } else {
              $scope.List.List_Responsables[indexResp].accion = 'X';
            }
          }
          // $scope.List.List_Responsables.forEach(element2 => {
          // if (element2.seleccionado) {
          // if (element.id == element2.id) {
          //   mismosResp += 1;
          //   element2.accion = 'X';
          //   if (element.rol != element2.rol) {
          //     element2.accion = 'U'; $scope.actualizarResp += 1;
          //   }
          //   if (element.horas != element2.horas) {
          //     element2.accion = 'U'; $scope.actualizarResp += 1;
          //   }
          // } else {
          //   element2.accion = 'D'; $scope.actualizarResp += 1;
          // }
          //   }
          // });
        });

        //
        setTimeout(() => { $scope.formFunc = undefined; }, 300);
        setTimeout(function () { $scope.$apply(); }, 500);
      }
      $scope.getRolName = function (rol = 1) {
        if (rol != 1) {
          return $scope.List.List_Rol[$scope.List.List_Rol.findIndex(e => e.codigo == rol)].nombre.toLowerCase()
        } return '()'
      }

      $scope.Crear_Nuevo = function () {
        $scope.Form_Limpiar();
        $scope.List.List_Responsables = JSON.parse($scope.List.List_Responsables_BK);
        //
        $scope.Form.Status = 1;
        $scope.Form.Estado = 'PRY';
        $scope.Form.Fases = '0';
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        //////////////////////////////////////////////

        // setTimeout(() => {
        //   $scope.Form.Area = '19';
        //   $scope.Form.Nombre_Proyecto = 'proyecto';
        //   $scope.Form.Tipo_Proyecto = 'C';
        //   $scope.Form.Proceso = 'A';
        //   $scope.Form.Estado = 'PRY';
        //   $scope.Form.Fases = '0';
        //   $scope.Form.Porcentaje = '50';
        $scope.Form.F_Recepcion = $scope.SysDay;
        $scope.Form.F_Inicio = $scope.SysDay;
        $scope.Form.F_Fin = $scope.SysDay;
        // }, 1500);
      }
      $scope.Atras = function () {
        //
        $scope.Obtener_Estados();
        $scope.Form.Status = 0;
        setTimeout(function () { $scope.$apply(); }, 500);
      }


      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
      $scope.Validar_CamposVacios = function () {
        return new Promise((resolve) => {
          //
          if ($scope.Form.Area == undefined || $scope.Form.Area == null || $scope.Form.Area == '') {
            document.querySelector("#Form_Area").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Form.Nombre_Proyecto == undefined || $scope.Form.Nombre_Proyecto == null || $scope.Form.Nombre_Proyecto == '') {
            document.querySelector("#Form_Nombre_Proyecto").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Form.Tipo_Proyecto == undefined || $scope.Form.Tipo_Proyecto == null || $scope.Form.Tipo_Proyecto == '') {
            document.querySelector("#Form_Tipo_Proyecto").classList.add("Valid_Campo"); resolve(true);
          }

          if ($scope.Form.Proceso == undefined || $scope.Form.Proceso == null || $scope.Form.Proceso == '') {
            document.querySelector("#Form_Proceso").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Form.Estado == undefined || $scope.Form.Estado == null || $scope.Form.Estado == '') {
            document.querySelector("#Form_Estado").classList.add("Valid_Campo"); resolve(true);
          }
          // if ($scope.Form.Fases == undefined || $scope.Form.Fases == null || $scope.Form.Fases == '') {
          //   document.querySelector("#Form_Fases").classList.add("Valid_Campo"); resolve(true);
          // }
          if ($scope.Form.Medio == undefined || $scope.Form.Medio == null || $scope.Form.Medio == '') {
            document.querySelector("#Form_Medio").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Form.F_Recepcion == undefined || $scope.Form.F_Recepcion == null || $scope.Form.F_Recepcion == '') {
            document.querySelector("#Form_F_Recepcion").classList.add("Valid_Campo"); resolve(true);
          }
          // if ($scope.Form.F_Inicio == undefined || $scope.Form.F_Inicio == null || $scope.Form.F_Inicio == '') {
          //   document.querySelector("#Form_F_Inicio").classList.add("Valid_Campo"); resolve(true);
          // }
          // if ($scope.Form.F_Fin == undefined || $scope.Form.F_Fin == null || $scope.Form.F_Fin == '') {
          //   document.querySelector("#Form_F_Fin").classList.add("Valid_Campo"); resolve(true);
          // }

          // if ($scope.Form.F_Inicio > $scope.Form.F_Fin) {
          //   document.querySelector("#Form_F_Fin").classList.add("Valid_Campo");
          //   document.querySelector("#Form_F_Inicio").classList.add("Valid_Campo"); resolve(true);
          //   Materialize.toast('¡Debe validar las fechas!', 2000);
          // }

          // if ($scope.Form.codigoProyecto == undefined || $scope.Form.codigoProyecto == null || $scope.Form.codigoProyecto == '') {
          //   document.querySelector("#Form_codigoProyecto").classList.add("Valid_Campo"); resolve(true);
          // }

          if ($scope.archivosSubir.length == 0) {
            Materialize.toast('¡Debe adjuntar los soportes!', 2000);
            resolve(true);
          }
          // if ($scope.Form.Porcentaje == undefined || $scope.Form.Porcentaje == null || $scope.Form.Porcentaje == '') {
          //   document.querySelector("#Form_Porcentaje").classList.add("Valid_Campo"); resolve(true);
          // }
          // if (parseInt(($scope.Form.Porcentaje ? $scope.Form.Porcentaje : 0)) > 100) {
          //   document.querySelector("#Form_Porcentaje").classList.add("Valid_Campo"); resolve(true);
          //   Materialize.toast('¡Debe corregir el campo Porcentaje!', 2000);
          // }
          // if (parseInt(($scope.Form.Porcentaje ? $scope.Form.Porcentaje : 0)) == 0) {
          //   document.querySelector("#Form_Porcentaje").classList.add("Valid_Campo"); resolve(true);
          //   Materialize.toast('¡Debe corregir el campo Porcentaje!', 2000);
          // }

          // var contSeleccionados = 0, contRequired = 0, contVacios = 0;
          // $scope.List.List_Responsables.forEach(e => {
          //   if (e.seleccionado) {
          //     contSeleccionados += 1;
          //     if (e.required) {
          //       contRequired += 1;
          //     }
          //     if (!e.rol) {
          //       contVacios += 1;
          //     }
          //   }
          // });
          // if (contSeleccionados == 0) {
          //   Materialize.toast('¡Debe asignar responsables a este proyecto!', 2000);
          //   resolve(true);
          // }
          // if (contVacios > 0) {
          //   Materialize.toast('¡Debe asignar un rol a cada responsable!', 2000);
          //   resolve(true);
          // }
          // if (contRequired > 0) {
          //   Materialize.toast('¡Debe terminar de editar al responsable!', 2000);
          //   resolve(true);
          // }

          // if ($scope.Form.Asignados.length == 0) {
          //   Materialize.toast('¡Debe asignar responsables a este proyecto!', 2000);
          // }
          // resolve(true);
          resolve(false);
        });
      }

      $scope.Validar = function () {
        angular.forEach(document.querySelectorAll('#Form1 .Valid_Campo'), function (i) { i.classList.remove('Valid_Campo'); });
        $scope.Validar_CamposVacios().then(function (result) {

          if (!result) {
            var Asignados = [];
            // $scope.List.List_Responsables.forEach(e => {
            //   if (e.seleccionado) {
            //     Asignados.push({
            //       'cedula': e.id,
            //       'hora': e.horas,
            //       'rol': e.rol
            //     })
            //   }
            // });
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Guardando Proyecto...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });
            var data = {
              area: $scope.Form.Area,
              nombre_proyecto: $scope.Form.Nombre_Proyecto.toString().toUpperCase(),
              tipoproyecto: $scope.Form.Tipo_Proyecto,
              proceso: $scope.Form.Proceso,
              estado: $scope.Form.Estado,
              fase: $scope.Form.Fases,
              medio: $scope.Form.Medio,
              fecha_recepcion: $scope.GetFecha('F_Recepcion'),
              fechainicial: $scope.GetFecha('F_Inicio'),
              fechafinal: $scope.GetFecha('F_Fin'),
              codigo: $scope.Form.codigoProyecto,
              // porcentaje: $scope.Form.Porcentaje,
              // responsables: Asignados
              // responsables: JSON.stringify(Asignados).substring(1, JSON.stringify(Asignados).length - 1)
            };


            $http({
              method: 'POST',
              url: "php/tic/gestionproyectos.php",
              data: { function: "p_crea_proyecto", v_pjson_row_in: JSON.stringify(data) }
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) != '<br') {
                if (data.codigo == 0) {
                  $scope.cargarSoportes(data.id_proy.toString().trim()).then(function (result1) {
                    if (result1) {
                      $scope.guardarAdjuntos(data.id_proy.toString().trim(), result1).then(function (result2) {
                        if (result2) {
                          $scope.Form_Limpiar();
                          $scope.Obtener_Listado_Proyectos();
                          $scope.Obtener_Responsables();
                          $scope.List.List_Responsables = JSON.parse($scope.List.List_Responsables_BK);
                          $scope.Atras();
                          swal("¡Mensaje!", 'Guardado Correctamente', "success").catch(swal.noop);
                        } else {
                          swal("¡Importante!", data.error, "warning").catch(swal.noop);
                        }
                      })
                    } else {
                      swal("¡Importante!", data.error, "warning").catch(swal.noop);
                    }
                  })
                } else {
                  swal("¡Importante!", data.error, "warning").catch(swal.noop);
                }
              }
            })
            // Asignados
            // responsables
          }
        });
      }

      /////////////////////////////
      /////////////////////////////
      $scope.SeleccionarProyecto = function (datos) {
        $scope.FuncionariosPorProyecto(datos.proyecto);
        setTimeout(() => {
        $http({
          method: 'POST',
          url: "php/tic/gestionproyectos.php",
          data: { function: "VerProyecto", 
          id_proyecto: datos.proyecto}
        }).then(function (data) {
          $scope.editarProyecto(data.data[0]);
        })
      }, 500);
      }
      $scope.FuncionariosPorProyecto = function (datos) {
        $http({
          method: 'POST',
          url: "php/tic/gestionproyectos.php",
          data: { function: "VerFuncionarios", 
          id_proyecto: datos}
        }).then(function (data) {
          $scope.responsablesx = data.data;
        })
      }
      $scope.editarProyecto = function (x) {
        $scope.Form_Limpiar();
        // console.log($scope.List.List_Responsables_BK);
        if ($scope.List.List_Responsables_BK.length == 0) {
          $scope.editarProyecto(x);
          return false;
        }
        $scope.List.List_Responsables = JSON.parse($scope.List.List_Responsables_BK);
        //
        $scope.Form.Status = 2;

        //////////////////////////////////////////////
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        $scope.proyectoBK = x;

        $scope.Form.Area = x.area.split('-')[0].trim();
        $scope.Form.numeroProyecto = x.proyecto;
        $scope.Form.Nombre_Proyecto = x.nombre;
        $scope.Form.Tipo_Proyecto = x.tipoproyecto.split('-')[0];;
        $scope.Form.Proceso = x.proceso.split('-')[0];
        $scope.Form.Estado = x.estado.split('-')[0];
        // inicio Yordis
        if($scope.Form.Estado == 'PRY'){
          $scope.List.List_Estado = $scope.List.List_Estado.filter(function(item) {
            return item.TIPO !== 'FIN'
          })
        }else if($scope.Form.Estado == 'EXE'){
          $scope.List.List_Estado = $scope.List.List_Estado.filter(function(item) {
            return item.TIPO !== 'PRY'
          })
        }
        // fin yordis
        $scope.Form.Fases = x.fase.split('-')[0];
        $scope.chgEstados($scope.Form.Estado,$scope.Form.Fases);
        $scope.Form.Fases_Control = x.fase.split('-')[0];
        $scope.Form.Medio = x.medio;
        $scope.Form.comentarioPausado = $scope.Form.Estado == 'PAU' ? x.observacion : '';
        $scope.Form.codigoProyecto = x.codigo;
        // $scope.Form.Porcentaje = '50';
        if(x.fecha_inicio){
          var fecha_inicio = x.fecha_inicio.split('/');
          $scope.Form.F_Inicio = new Date(fecha_inicio[2] + '/' + fecha_inicio[1] + '/' + fecha_inicio[0]);
        }
        if(x.fecha_fin){
          var fecha_fin = x.fecha_fin.split('/');
          $scope.Form.F_Fin = new Date(fecha_fin[2] + '/' + fecha_fin[1] + '/' + fecha_fin[0]);
        }
        if(x.fecha_recepcion){
          var fecha_recepcion = x.fecha_recepcion.split('/');
          $scope.Form.F_Recepcion = new Date(fecha_recepcion[2] + '/' + fecha_recepcion[1] + '/' + fecha_recepcion[0]);
        }
        $scope.List.List_Responsables.forEach(i => {
          $scope.responsablesx.forEach(j => {
            if (i.id == j.id_responsable) {
              $scope.responsablesBk.push({ id: j.id_responsable, horas: j.horas, rol: j.rol_cod,finicio:j.fecha_inicio, ffin:j.fecha_fin });
              // $scope.responsablesBk.push({ id: j.id_responsable, horas: j.horas, rol: j.rol_cod});
              i.seleccionado = true;
              i.horas = j.horas;
              i.rol = j.rol_cod.toString();
              i.finicio = j.finicio;
              i.ffin = j.ffin;
              i.accion = 'X'; // RESPS MARCADOS
            }
          });
        });
        console.log($scope.responsablesBk);
        setTimeout(() => { $scope.$apply(); }, 800);
      }

      $scope.validarCamposVaciosActualizar = function () {
        return new Promise((resolve) => {
          //
          if ($scope.Form.Area == undefined || $scope.Form.Area == null || $scope.Form.Area == '') {
            document.querySelector("#Form_Area").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Form.Nombre_Proyecto == undefined || $scope.Form.Nombre_Proyecto == null || $scope.Form.Nombre_Proyecto == '') {
            document.querySelector("#Form_Nombre_Proyecto").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Form.Tipo_Proyecto == undefined || $scope.Form.Tipo_Proyecto == null || $scope.Form.Tipo_Proyecto == '') {
            document.querySelector("#Form_Tipo_Proyecto").classList.add("Valid_Campo"); resolve(true);
          }

          if ($scope.Form.Proceso == undefined || $scope.Form.Proceso == null || $scope.Form.Proceso == '') {
            document.querySelector("#Form_Proceso").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Form.Estado == undefined || $scope.Form.Estado == null || $scope.Form.Estado == '') {
            document.querySelector("#Form_Estado").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Form.Fases == undefined || $scope.Form.Fases == null || $scope.Form.Fases == '') {
            document.querySelector("#Form_Fases").classList.add("Valid_Campo"); resolve(true);
          }

          if ($scope.Form.Medio == undefined || $scope.Form.Medio == null || $scope.Form.Medio == '') {
            document.querySelector("#Form_Medio").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Form.F_Inicio == undefined || $scope.Form.F_Inicio == null || $scope.Form.F_Inicio == '') {
            document.querySelector("#Form_F_Inicio").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Form.F_Fin == undefined || $scope.Form.F_Fin == null || $scope.Form.F_Fin == '') {
            document.querySelector("#Form_F_Fin").classList.add("Valid_Campo"); resolve(true);
          }

          if ($scope.Form.F_Inicio > $scope.Form.F_Fin) {
            document.querySelector("#Form_F_Fin").classList.add("Valid_Campo");
            document.querySelector("#Form_F_Inicio").classList.add("Valid_Campo"); resolve(true);
            Materialize.toast('¡Debe validar las fechas!', 2000);
          }

          if ($scope.Form.codigoProyecto == undefined || $scope.Form.codigoProyecto == null || $scope.Form.codigoProyecto == '') {
            document.querySelector("#Form_codigoProyecto").classList.add("Valid_Campo"); resolve(true);
          }

          var contSeleccionados = 0, contRequired = 0, contVacios = 0;
          $scope.List.List_Responsables.forEach(e => {
            if (e.seleccionado) {
              contSeleccionados += 1;
              if (e.required) {
                contRequired += 1;
              }
              if (!e.rol) {
                contVacios += 1;
              }
            }
          });
          // if (contSeleccionados == 0) {
          //   Materialize.toast('¡Debe asignar responsables a este proyecto!', 2000);
          //   resolve(true);
          // }
          // if (contVacios > 0) {
          //   Materialize.toast('¡Debe asignar un rol a cada responsable!', 2000);
          //   resolve(true);
          // }
          // if (contRequired > 0) {
          //   const text = '¡Debe terminar de editar al funcionario ' + $scope.formFunc.nombre + '!';
          //   Materialize.toast(text, 2000);
          //   resolve(true);
          // }

          if ($scope.Form.Estado == 'PAU' && ($scope.Form.comentarioPausado == undefined || $scope.Form.comentarioPausado == null || $scope.Form.comentarioPausado == '')) {
            document.querySelector("#Form_comentarioPausado").classList.add("Valid_Campo");
            Materialize.toast('¡Debe escribir una observación!', 2000);
            resolve(true);
          }

          if ($scope.archivosSubir.length == 0 && $scope.Form.Fases >= (parseInt($scope.proyectoBK.fase.split('-')[0]) + 1)) {
            if($scope.Form.Fases == 5 || $scope.Form.Fases == 6 || $scope.Form.Fases == 8 || $scope.Form.Fases == 11){
              resolve(false);
            }else{
              Materialize.toast('¡Debe adjuntar los soportes!', 2000);
              resolve(true);
            }
          }

          resolve(false);
        });
      }

      $scope.actualizarProyecto = function () {
        angular.forEach(document.querySelectorAll('#Form1 .Valid_Campo'), function (i) { i.classList.remove('Valid_Campo'); });
        $scope.validarCamposVaciosActualizar().then(function (result) {
          if (!result) {
            $scope.cargarSoportes($scope.Form.numeroProyecto).then(function (result1) {
              if (result1) {
                $scope.guardarAdjuntos($scope.Form.numeroProyecto, result1).then(function (result2) {
                  if (result2) {

                    var Asignados = [];
                    $scope.List.List_Responsables.forEach(e => {
                      if (e.accion != 'X' && e.accion) {
                        $scope.actualizarResp += 1;
                      }
                      if (e.seleccionado || e.accion == 'D') {
                        Asignados.push({
                          'cedula': e.id,
                          'hora': e.horas,
                          'fini': e.finicio,
                          'ffin': e.ffin,
                          'rol': e.rol,
                          'salario': e.salario,
                          'accion': e.accion,
                        })
                      }
                    });
                    swal({
                      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                      width: 200,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      showConfirmButton: false,
                      animation: false
                    });

                    var data = {
                      proyecto: $scope.Form.numeroProyecto,
                      cod_area: $scope.Form.Area,
                      nombre_proyecto: $scope.Form.Nombre_Proyecto,
                      tipo: $scope.Form.Tipo_Proyecto,
                      proceso: $scope.Form.Proceso,
                      estado: $scope.Form.Estado,
                      medio: $scope.Form.Medio,
                      fase: $scope.Form.Fases,
                      fecha_inicio: $scope.GetFecha('F_Inicio'),
                      fecha_final: $scope.GetFecha('F_Fin'),
                      cambio_responsable: $scope.actualizarResp == 0 ? 'N' : 'S',
                      observacion: $scope.Form.Estado == 'PAU' ? $scope.Form.comentarioPausado : '',
                      codigo: $scope.Form.codigoProyecto,
                    };

                    $http({
                      method: 'POST',
                      url: "php/tic/gestionproyectos.php",
                      data: {
                        function: "p_actualiza_proyecto",
                        json_cabeza: data,
                        json_responsables: Asignados
                      }
                    }).then(function ({ data }) {
                      if (data.toString().substr(0, 3) != '<br') {
                        if (data.codigo == 0) {
                          $scope.Form_Limpiar();
                          $scope.Obtener_Listado_Proyectos();
                          // $scope.Obtener_Responsables();
                          $scope.List.List_Responsables = JSON.parse($scope.List.List_Responsables_BK);
                          $scope.Atras();
                          swal("¡Mensaje!", "Proyecto Actualizado", "success").catch(swal.noop);
                        } else {
                          swal("¡Importante!", data.error, "warning").catch(swal.noop);
                        }
                      }
                    })

                  } else {
                    swal("¡Importante!", data.error, "warning").catch(swal.noop);
                  }
                })
              } else {
                swal("¡Importante!", data.error, "warning").catch(swal.noop);
              }
            })
          }

        });
        $scope.Obtener_Estados();
      }


      $scope.cargarSoportes = function (numeroProyecto) {
        return new Promise((resolve) => {
          if ($scope.archivosSubir.length == 0) {
            resolve(true); return
          }
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Guardando Soportes...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/tic/gestionproyectos.php",
            data: { function: "cargarSoportes", proyecto: numeroProyecto, archivos: $scope.archivosSubir }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br' && data.length == $scope.archivosSubir.length) {
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }

      $scope.guardarAdjuntos = function (numeroProyecto, jsonRutas) {
        return new Promise((resolve) => {
          if ($scope.archivosSubir.length == 0) {
            resolve(true); return
          }
          $http({
            method: 'POST',
            url: "php/tic/gestionproyectos.php",
            data: { function: "p_adjunto", proyecto: numeroProyecto, etapa: $scope.Form.Fases, archivos: jsonRutas }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br' && data.codigo == 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
        });
      }

      document.querySelector('#filesProyecto').addEventListener('change', function (e) {
        $scope.archivosSubir = [];
        setTimeout(() => { $scope.$apply(); }, 500);
        var files = e.target.files;
        if (files.length != 0) {
          for (let i = 0; i < files.length; i++) {
            const x = files[i].name.split('.');
            if (x[x.length - 1].toUpperCase() != 'EXE') {
              if (files[i].size < 10485760 && files[i].size > 0) {
                $scope.getBase64(files[i]).then(function (result) {
                  $scope.archivosSubir.push({
                    base64: result,
                    nombre: x[0],
                    extension: x[x.length - 1].toLowerCase()
                  });
                  setTimeout(function () { $scope.$apply(); }, 300);
                });
              } else {
                document.querySelector('#filesProyecto').value = '';
                swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (10MB)!', 'info');
              }
            } else {
              document.querySelector('#filesProyecto').value = '';
              swal('Advertencia', '¡Los archivos seleccionados no deben ser formato EXE!', 'info');
            }
          }
        }
      });
      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }


      $scope.abrirModalSoportes = function () {
        // soportesCargados: [],
        //   urlSoporte: [],
        $('#Modal_Soportes').modal('open');
        $http({
          method: 'POST',
          url: "php/tic/gestionproyectos.php",
          data: { function: "p_listar_adjuntos", proyecto: $scope.Form.numeroProyecto }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            if (data.length > 0) {
              $scope.Form.soportesCargados = data;
              // console.log(data)
            } else {
              $scope.Form.soportesCargados = [];
              swal("¡Importante!", "No existen archivos cargados", "info").catch(swal.noop);
            }
          } else {
            swal("¡Importante!", "No existen archivos cargados", "info").catch(swal.noop);
          }
        })
      }

      $scope.descargaAdjunto = function (x) {
        $http({
          method: 'POST',
          url: "php/tic/gestionproyectos.php",
          data: {
            function: 'descargaAdjunto',
            ruta: x.ruta
          }
        }).then(function ({ data }) {
          // if (data.toString().substr(0, 1) != '0') {
            window.open("temp/" + data);
          // }
        });
      }

      $scope.getNombreRuta = function (ruta) {
        const splitBarra = ruta.split("/")[7];
        const splitPuntos = splitBarra.split(/\.(?=[^\.]+$)/);
        return splitPuntos[0] + '.' + splitPuntos[1]
      }
      $scope.getIconoColor = function (ruta) {
        const splitBarra = ruta.split("/")[7];
        const splitPuntos = splitBarra.split(/\.(?=[^\.]+$)/);
        switch (splitPuntos[1]) {
          case 'pdf':
            return 'icon-file-pdf red-text'
            break;
          case 'xlsx':
            return 'icon-file-excel green-text'
            break;
          case 'xls':
            return 'icon-file-excel green-text'
            break;
          case 'pptx':
            return 'icon-file-powerpoint red-text'
            break;
          case 'docx':
            return 'icon-file-word blue-text'
            break;
          case 'doc':
            return 'icon-file-word blue-text'
            break;
          default:
            return 'icon-file-archive grey-text'
            break;
        }
        // return splitPuntos[0] + '.' + splitPuntos[1]
      }


      // $scope.chgEstados = function () {
      //   if ($scope.Form.Status != 2) { return false; }
      //   if ($scope.Form.Estado == 'PRY' && $scope.proyectoBK.estado.split('-')[0] != 'PRY') {
      //     $scope.Form.Estado = $scope.proyectoBK.estado.split('-')[0];
      //   }
      //   $scope.List.List_Fases = [];
      //   if ($scope.Form.Estado == 'FIN') {
      //     $scope.List.List_Fases = [{ "codigo": "7", "nombre": "CIERRE" }];
      //     setTimeout(() => { $scope.Form.Fases = '7'; $scope.$apply(); }, 1000);
      //   } else {
      //     $scope.List.List_Fases = $scope.listFases_BK;
      //     setTimeout(() => { $scope.Form.Fases = $scope.proyectoBK.fase.split('-')[0].toString(); $scope.$apply(); }, 1000);
      //   }
      // }

      $scope.chgEstados = function (datos,fase) {
        console.log(fase);
        $scope.List.List_Fases =[];
        if ($scope.Form.Status != 2) { return false; }
        let etapa;
        if(datos == 'EXE'){
          etapa ='EJECUCION';
        }else if(datos == 'PAU'){
          etapa ='PAUSADO';
        }else if(datos == 'FIN'){
          etapa ='FINALIZADO';
        }else{
          etapa ='PROYECTADO';
        }
        $http({
          method: 'POST',
          url: "php/tic/gestionproyectos.php",
          data: {
            function: 'Veretapas',
            etapa: etapa
          }
        }).then(function ({ data }) {
          $scope.List.List_Fases = data;
          $scope.Form.Fases = fase;
        });
      }

      $scope.chgFases = function () {
        if ($scope.Form.Status != 2) { return false; }
        if ($scope.Form.Estado == 'EXE' || $scope.Form.Estado == 'PAU') {
          if ($scope.Form.Fases < $scope.proyectoBK.fase.split('-')[0] || $scope.Form.Fases > (parseInt($scope.proyectoBK.fase.split('-')[0]) + 1)) {
            setTimeout(() => {
              $scope.Form.Fases = $scope.proyectoBK.fase.split('-')[0];
              $scope.$apply();
            }, 500);
          }
          // if () {
          //   setTimeout(() => {
          //     $scope.Form.Fases = $scope.proyectoBK.fase.split('-')[0];
          //     $scope.$apply();
          //   }, 500);
          // }
        }
      }

      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////

      $scope.closeModal = function () {
        $('.modal').modal('close');
      }

      $scope.Filtrar_Estados = function (LISTADO) {
        $scope.Listado_Proys = $scope[LISTADO];
        if ($scope.Listado_Proys_Save == LISTADO) {
          $scope.Listado_Proys = $scope.Listado_Total;
          $scope.Listado_Proys_Save = '';
        }
        $scope.Listado_Proys_Save = LISTADO;
        setTimeout(function () { $scope.$apply(); }, 500);
      }

      $scope.Estatus_Solicitud_Tooltip = function (Estado) {
        // FINALIZADO C - F
        // PAUSADO	W - P
        // EN EJECUCION	J - D
        // PROYECTADO Y - X
        // if (Estado.toString().toUpperCase() == 'J') {
        //   return "Anulado"
        // }
        if (Estado.toString().toUpperCase() == 'EXE') {
          return "Ejecucion"
        }
        if (Estado.toString().toUpperCase() == 'FIN') {
          return "Finalizado"
        }
        if (Estado.toString().toUpperCase() == 'PAU') {
          return "Pausado"
        }
        if (Estado.toString().toUpperCase() == 'PRY') {
          return "Proyectado"
        }
      }

      $scope.Estado_Solicitud_Color = function (Estado) {
        if (Estado.toString().toUpperCase() == 'EXE') {
          return { "background-color": "rgb(3, 197, 20) !important;" }
        }
        if (Estado.toString().toUpperCase() == 'FIN') {
          return { "background-color": "rgb(71, 71, 165)!important" }
        }
        if (Estado.toString().toUpperCase() == 'PAU') {
          return { "background-color": "rgb(245, 75,75) !important" }
        }
        if (Estado.toString().toUpperCase() == 'PRY') {
          return { "background-color": "rgb(235, 156, 5) !important;" }
        }
      }

      $scope.Estado_Solicitud_Clase = function (Estado) {
        if (Estado.toString().toUpperCase() == 'EXE') {
          return "Con_pulse_A"
        }
        if (Estado.toString().toUpperCase() == 'FIN') {
          return "Con_pulse_P"
        }
        if (Estado.toString().toUpperCase() == 'PAU') {
          return "Con_pulse_X"
        }
        if (Estado.toString().toUpperCase() == 'PRY') {
          return "Con_pulse_D"
        }
      }

      $scope.reverse = true;
      $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
      };

      $scope.validarPorcentaje = () => {
        if (parseInt(($scope.Form.Porcentaje ? $scope.Form.Porcentaje : 0)) > 100) {
          Materialize.toast('¡No debe ser mayor a 100%!', 2000);
        }
        if (parseInt(($scope.Form.Porcentaje ? $scope.Form.Porcentaje : 0)) == 0) {
          Materialize.toast('¡No debe ser igual a 0%!', 2000);
        }
        // $scope.Form.Porcentaje.
      }


      $scope.GetFecha = function (SCOPE) {
        var ahora_ano = $scope.Form[SCOPE].getFullYear();
        var ahora_mes = ((($scope.Form[SCOPE].getMonth() + 1) < 10) ? '0' + ($scope.Form[SCOPE].getMonth() + 1) : ($scope.Form[SCOPE].getMonth() + 1));
        var ahora_dia = ((($scope.Form[SCOPE].getDate()) < 10) ? '0' + ($scope.Form[SCOPE].getDate()) : ($scope.Form[SCOPE].getDate()));
        return ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
      }

      function parsedia(date) {
        var d = new Date(date);
        var yyyy = d.getFullYear();
        var dd = ('0' + d.getDate()).slice(-2);
        var mm = ('0' + (d.getMonth() + 1)).slice(-2);
        var hh = d.getHours();
        var mi = d.getMinutes();
        return dd + '/' + mm + '/' + yyyy;
      }
      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////

      $scope.getNum = function (val) {
        if (isNaN(val)) {
          return 0;
        }
        return val;
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

      $scope.Ajustar_Pantalla = function () {
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
function Format() {
  const input = document.querySelectorAll('#number_swal')[0];
  var valor = input.value;
  valor = valor.replace(/[^0-9]/g, '1');
  input.value = valor;
  if (valor > parseInt(document.querySelectorAll('#number_swal')[0].getAttribute('max'))) { input.value = parseInt(document.querySelectorAll('#number_swal')[0].getAttribute('max')) }

}
