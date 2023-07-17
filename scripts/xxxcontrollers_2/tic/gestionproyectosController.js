'use strict';
angular.module('GenesisApp')
  .controller('gestionproyectosController', ['$scope', '$http', 'altocostoHttp', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
    function ($scope, $http, altocostoHttp, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
      $(document).ready(function () {
        $('#modalresponsables').modal();
        $('#modalacciones').modal();
      });

      $scope.rolcod = sessionStorage.getItem('rolcod');
      $scope.rolboolean = true;
      if ($scope.rolcod == 0) {
        $scope.rolboolean = true;
      } else {
        $scope.rolboolean = false;
      }
      //funcionamiento de las tab
      // (function () {
      //   $('#date1').bootstrapMaterialDatePicker({ format: 'DD/MM/YYYY', lang: 'es', weekStart: 1, time: false, nowText: 'Now' });
      //   $('#date2').bootstrapMaterialDatePicker({ format: 'DD/MM/YYYY', lang: 'es', weekStart: 1, time: false, nowText: 'Now' });
      //   $('#date3').bootstrapMaterialDatePicker({ format: 'DD/MM/YYYY', lang: 'es', weekStart: 1, time: false, nowText: 'Now' });
      //   $('#date4').bootstrapMaterialDatePicker({ format: 'DD/MM/YYYY', lang: 'es', weekStart: 1, time: false, nowText: 'Now' });
      // }());
      $scope.proyectojson = {
        id: '',
        area: "0",
        nombre_proyecto: "",
        estado: "0",
        proceso: "0",
        fase: "0",
        tipoproyecto: "0",
        responsables: [],
        fechainicial: "",
        fechafinal: "",
        observacion: "",
        porcentaje: ""
      }

      $scope.inactivecamposc = true;




      $scope.camposvisiblesact = true;
      $scope.estados = [];
      $scope.tempresponsables = [];

      $scope.roles = [];
      $scope.check_gestion = true;
      $http({
        method: 'POST',
        url: "php/tic/controlproyectos/Rproyectos.php",
        data: { function: 'p_obtener_tipop' }
      }).then(function (response) {
        $scope.tipoproyectos = response.data;
      })

      $http({
        method: 'POST',
        url: "php/tic/controlproyectos/Rproyectos.php",
        data: { function: 'p_obtener_area' }
      }).then(function (response) {
        $scope.areas = response.data;
      })


      $http({
        method: 'POST',
        url: "php/tic/controlproyectos/Rproyectos.php",
        data: { function: 'p_obtener_recurso' }
      }).then(function (response) {
        $scope.responsables = response.data;
      })

      $http({
        method: 'POST',
        url: "php/tic/controlproyectos/Rproyectos.php",
        data: { function: 'p_obtener_rol' }
      }).then(function (response) {
        $scope.roles = response.data;
      })

      $http({
        method: 'POST',
        url: "php/tic/controlproyectos/Rproyectos.php",
        data: { function: 'p_obtener_estado' }
      }).then(function (response) {
        $scope.estados = response.data;
      })
      $http({
        method: 'POST',
        url: "php/tic/controlproyectos/Rproyectos.php",
        data: { function: 'p_obtener_proceso' }
      }).then(function (response) {
        $scope.procesos = response.data;
      })

      $http({
        method: 'POST',
        url: "php/tic/controlproyectos/Rproyectos.php",
        data: { function: 'p_obtener_fases' }
      }).then(function (response) {
        $scope.fases = response.data;
      })


      $http({
        method: 'GET',
        url: "json/proyectos.json"
      }).then(function (response) {
        $scope.porcentaje = response.data;
      })
      $scope.Obtenerproyectos = function () {
        $http({
          method: 'POST',
          url: "php/tic/controlproyectos/Rproyectos.php",
          data: { function: 'p_listar_proyecto', }
        }).then(function (response) {
          $scope.quantity = 107;
          $scope.total = response.data.length;
          $scope.inactive1 = false;
          $scope.info = response.data;
        })
      }


      $scope.getMotivos = function () {
        $http({
          method: 'POST',
          url: "php/tic/controlproyectos/Rproyectos.php",
          data: { function: 'p_obtener_motivo', proceso: $scope.check_gestion == true ? '1' : '2' }
        }).then(function (response) {
          console.log(response.data);
          $scope.motivosacciones = response.data;
        })
      }

      $scope.getkpi = function () {

        $http({
          method: 'POST',
          url: "php/tic/controlproyectos/Rproyectos.php",
          data: { function: 'p_obtener_kpi' }
        }).then(function (response) {             
          [$scope.finalizado, $scope.pausado, $scope.ejecucion, $scope.proyectado] = response.data;        
        })
      }
      $scope.getkpi();
      //tabs
      $scope.setTab = function (newTab) {
        $scope.tab = newTab;
        $(".tabI").removeClass("tabactiva");
        $(".tabII").removeClass("tabactiva");
        switch (newTab) {
          case 1:
            $(".tabI").addClass("tabactiva");
            break;
          case 2:
            $(".tabII").addClass("tabactiva");
            $scope.Obtenerproyectos();
            break;
          default:

        }
      }
      $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
      }
      $scope.setTab(1);
      $scope.Obtenerproyectos();
      //validar estado
      $scope.validarestado = function () {
        if ($scope.estado == 'C') {
          $scope.inactivecamposc = false;
        } else {
          $scope.inactivecamposc = true;
        }
      }

      $scope.cardview = { tab: 'L' };

      $scope.atras = function () {
        $scope.cardview.tab = 'L';
        // setTimeout(() => {        
        $scope.getkpi();
        $('input:checkbox').not(this).prop('checked', false);
        // }, 100);


      }

      $scope.createProyecto = function () {
        $scope.proyectojson = {
          id: '',
          area: "0",
          nombre_proyecto: "",
          estado: "0",
          proceso: "0",
          fase: "0",
          tipoproyecto: "0",
          responsables: [],
          fechainicial: "",
          fechafinal: "",
          observacion: "",
          porcentaje: ""
        }

        $scope.tempresponsables = [];
        $scope.cardview.tab = 'C';
      }

      $scope.dataproyecto = null;
      $scope.datosactualizar = function (data) {
        $scope.cardview.tab = 'C';
        $('#' + data.id_proyecto).removeClass('checkact');
        $('.checkact').prop('checked', false);
        if (document.getElementById(data.id_proyecto).checked == true) {

          $http({
            method: 'POST',
            url: "php/tic/controlproyectos/Rproyectos.php",
            data: { function: 'p_obtener_proyecto', codigo: data.id_proyecto }
          }).then(function (response) {
            $scope.proyectojson = response.data;

            var ftemp = $scope.proyectojson.fechainicial.split("-");
            $scope.proyectojson.fechainicial = new Date(ftemp[0], (ftemp[1] - 1), ftemp[2]);

            var ftemp2 = $scope.proyectojson.fechafinal.split("-");
            $scope.proyectojson.fechafinal = new Date(ftemp2[0], (ftemp2[1] - 1), ftemp2[2]);

            $scope.tempresponsables = response.data.responsables;


          })

        } else {
          $scope.camposvisiblesact = true;
        }
        $('#' + data.id_proyecto).addClass('checkact');
      }
      function formatDate(date) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2)
          month = '0' + month;
        if (day.length < 2)
          day = '0' + day;

        return [year, month, day].join('-');
      }
      $scope.textnotifi = "Debe completar los campos requeridos";
      $scope.Crearproyecto = function (accion) {


        if ($scope.validarinput(accion)) {
          $scope.proyectojson.responsables = ($scope.tempresponsables);
          $scope.json = JSON.stringify(
            {
              'id': $scope.proyectojson.id,
              'area': $scope.proyectojson.area,
              'proceso': $scope.proyectojson.proceso,
              'nombre_proyecto': $scope.proyectojson.nombre_proyecto,
              'fase': $scope.proyectojson.fase,
              'estado': $scope.proyectojson.estado,
              'tipoproyecto': $scope.proyectojson.tipoproyecto,
              'responsables': $scope.proyectojson.responsables,
              'documentacion': $scope.proyectojson.documentacion,
              'fechainicial': formatDate($scope.proyectojson.fechainicial),
              'fechafinal': formatDate($scope.proyectojson.fechafinal),
              'observacion': $scope.proyectojson.observacion,
              'porcentaje': $scope.proyectojson.porcentaje,
              'nombre_porcentaje': $scope.proyectojson.nombre_porcentaje,
              'accion': $scope.proyectojson.id ? 'U' : 'I'
            }
          );

          console.log($scope.json);

          $http({
            method: 'POST',
            url: "php/tic/controlproyectos/Cproyectos.php",
            data: {
              function: 'p_inserta_proyecto',
              proyecto: $scope.json
            }
          }).then(function (response) {
            console.log(response.data);
            var data = response.data
            var cod = data.codigo;
            var mgs = data.nombre;
            switch (cod) {
              case "1":
                notification.getNotification('error', mgs, 'Notificacion');
                break;
              case "0":
                notification.getNotification('success', mgs, 'Notificacion');
                $scope.limpiar();
                $scope.cardview.tab = 'L';
                $scope.Obtenerproyectos();
                $scope.getkpi();
                break;
              case "2":
                notification.getNotification('warning', mgs, 'Notificacion');
                break;
              default:
            }
          })
        } else {
          notification.getNotification('warning', $scope.textnotifi, 'Notificacion');


        }
      }
      $scope.validarinput = function () {
        $scope.camposvalidos = true;
        $scope.camposvalidos2 = true;

        $scope.textnotifi = "Debe completar los campos requeridos";
        //para crear 
        if ($scope.proyectojson.area == "" || $scope.proyectojson.area == "0" || $scope.proyectojson.area == null || $scope.proyectojson.area == undefined || $scope.proyectojson.area == " ") { $scope.camposvalidos = false; $("#-area").addClass("requerido"); } else { $("#-area").removeClass("requerido"); };
        if ($scope.proyectojson.nombre_proyecto == "" || $scope.proyectojson.nombre_proyecto == "0" || $scope.proyectojson.nombre_proyecto == null || $scope.proyectojson.nombre_proyecto == undefined || $scope.proyectojson.nombre_proyecto == " ") { $scope.camposvalidos = false; $("#-proyecto").addClass("requerido"); } else { $("#-proyecto").removeClass("requerido"); };
        if ($scope.proyectojson.estado == "" || $scope.proyectojson.estado == "0" || $scope.proyectojson.estado == null || $scope.proyectojson.estado == undefined || $scope.proyectojson.estado == " ") { $scope.camposvalidos = false; $("#-estado").addClass("requerido"); } else { $("#-estado").removeClass("requerido"); };
        if ($scope.proyectojson.tipoproyecto == "" || $scope.proyectojson.tipoproyecto == "0" || $scope.proyectojson.tipoproyecto == null || $scope.proyectojson.tipoproyecto == undefined || $scope.proyectojson.tipoproyecto == " ") { $scope.camposvalidos = false; $("#-tipoproyecto").addClass("requerido"); } else { $("#-tipoproyecto").removeClass("requerido"); };
        if ($scope.proyectojson.observacion == "" || $scope.proyectojson.observacion == "0" || $scope.proyectojson.observacion == null || $scope.proyectojson.observacion == undefined || $scope.proyectojson.observacion == " ") { $scope.camposvalidos = false; $("#-observacion").addClass("requerido"); } else { $("#-observacion").removeClass("requerido"); };
        if ($scope.proyectojson.fechainicial == "" || $scope.proyectojson.fechainicial == "0" || $scope.proyectojson.fechainicial == null || $scope.proyectojson.fechainicial == undefined || $scope.proyectojson.fechainicial == " ") { $scope.camposvalidos = false; $("#-fechainicial").addClass("requerido"); } else { $("#-fechainicial").removeClass("requerido"); };
        if ($scope.proyectojson.fechafinal == "" || $scope.proyectojson.fechafinal == "0" || $scope.proyectojson.fechafinal == null || $scope.proyectojson.fechafinal == undefined || $scope.proyectojson.fechafinal == " ") { $scope.camposvalidos = false; $("#-fechafinal").addClass("requerido"); } else { $("#-fechafinal").removeClass("requerido"); };
        if ($scope.proyectojson.fase == "" || $scope.proyectojson.fase == "0" || $scope.proyectojson.fase == null || $scope.proyectojson.fase == undefined || $scope.proyectojson.fase == " ") { $scope.camposvalidos = false; $("#-fases").addClass("requerido"); } else { $("#-fases").removeClass("requerido"); };
        if ($scope.proyectojson.proceso == "" || $scope.proyectojson.proceso == "0" || $scope.proyectojson.proceso == null || $scope.proyectojson.proceso == undefined || $scope.proyectojson.proceso == " ") { $scope.camposvalidos = false; $("#-proceso").addClass("requerido"); } else { $("#-proceso").removeClass("requerido"); };
        if ($scope.proyectojson.porcentaje == "" || $scope.proyectojson.porcentaje == null || $scope.proyectojson.porcentaje == undefined || $scope.proyectojson.porcentaje == " ") { $scope.camposvalidos = false; $("#-porcentaje").addClass("requerido"); } else { $("#-porcentaje").removeClass("requerido"); };


        if ($scope.proyectojson.fechainicial > $scope.proyectojson.fechafinal) {
          $scope.textnotifi = "Fecha inicial no puede ser mayor a fecha final";
          $scope.camposvalidos = false;
        }

        if ($scope.proyectojson.fechainicial > $scope.maxDate) {
          $scope.textnotifi = "Fecha inicial no puede ser mayor a fecha actual";
          $scope.camposvalidos = false;

        }
        return $scope.camposvalidos;









      }
      $scope.limpiar = function () {
        $scope.proyectojson = {
          id: '',
          area: "0",
          nombre_proyecto: "",
          estado: "0",
          proceso: "0",
          fase: "0",
          tipoproyecto: "0",
          responsables: [],
          fechainicial: "",
          fechafinal: "",
          observacion: "",
          porcentaje: "0"
        }
        $scope.tempresponsables = [];



        $scope.camposvisiblesact = true;
      }


      $scope.openmodals = function (tipo) {
        switch (tipo) {

          case 'modalresponsables':
            $scope.buscard2 = "";
            for (let index = 0; index < $scope.responsables.length; index++) {
              $scope.responsables[index].rol = "";
              $scope.responsables[index].disponibilidad = "";
              $scope.responsables[index].nombre_disponibilidad = "";
            }

            $("#modalresponsables").modal("open");
            break;
          case 'modalacciones':
            $scope.getMotivos();
            $scope.jsonacciones = {
              codigo: "",
              observacion: "",
              accion: "",
              fechainicio: "",
              fechafin: "",
              motivo: ""
            }
            $("#modalacciones").modal("open");
            break;

          default:
        }
      }

      $scope.closemodals = function (tipo) {
        switch (tipo) {
          case 'modalresponsables':
            $("#modalresponsables").modal("close");
            break;

          case 'modalacciones':
            $("#modalacciones").modal("close");
            break;
          default:
        }
      }


      $scope.getResponsable = function (params) {
        console.log(params);
        if (params.rol && params.nombre_disponibilidad) {
          params.nombre_rol = $scope.roles.filter(item => item.codigo === params.rol)[0].nombre;
          params.disponibilidad = params.nombre_disponibilidad.replace('%', '');

          if ($scope.tempresponsables.findIndex(item => item.codigo == params.codigo) == -1) {
            $scope.tempresponsables.push(Object.assign({}, params));
          } else {
            $scope.tempresponsables[$scope.tempresponsables.findIndex(item => item.codigo == params.codigo)].rol = params.rol;
          }



          $scope.closemodals("modalresponsables");
        } else {
          notification.getNotification('warning', "Debe seleccionar el rol y la disponibilidad del Responsable.", 'Notificacion');
        }
      }

      $scope.removeElement = function (param) {
        swal({
          title: 'Confirmar Proceso',
          text: '¿Desea remover al funcionario?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then(function () {
          $timeout(function () {
            $scope.tempresponsables = $scope.tempresponsables.filter(item => item !== param);
          }, 100);
        }).catch(swal.noop);

      }

      $scope.jsonacciones = {
        codigo: "",
        observacion: "",
        accion: "",
        fechainicio: "",
        fechafin: "",
        motivo: ""
      }

      $scope.maxDate = new Date();


      $scope.formatDate = function (date) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
      }


      $scope.firstDay = new Date(new Date().getFullYear(), 0, 1);
      $scope.maxDate = $scope.formatDate($scope.maxDate);
      $scope.tempproyecto = null;
      $scope.manageproyecto = function (params) {
        console.log(params);
        $scope.tempproyecto = params;
        $scope.openmodals("modalacciones");
      }

      $scope.Accionesproyecto = function () {

        let vaccion = $scope.check_gestion == true ? 'A' : 'X'
        console.log($scope.check_gestion == true ? 'A' : 'X');
        if ($scope.validateAccciones($scope.check_gestion == true ? 'A' : 'X')) {


          console.log(JSON.stringify({
            function: 'p_anular_proyecto', codigo: $scope.tempproyecto.id_proyecto,
            observacion: $scope.jsonacciones.observacion,
            accion: vaccion,
            fechainicio: $scope.jsonacciones.fechainicio ? formatDate($scope.jsonacciones.fechainicio) : "",
            motivo: $scope.jsonacciones.motivo,
            fechafin: $scope.jsonacciones.fechafin ? formatDate($scope.jsonacciones.fechafin) : ""
          }));

          $http({
            method: 'POST',
            url: "php/tic/controlproyectos/Dproyectos.php",
            data: {
              function: 'p_anular_proyecto', codigo: $scope.tempproyecto.id_proyecto,
              observacion: $scope.jsonacciones.observacion,
              accion: vaccion,
              fechainicio: $scope.jsonacciones.fechainicio ? formatDate($scope.jsonacciones.fechainicio) : "",
              motivo: $scope.jsonacciones.motivo,
              fechafin: $scope.jsonacciones.fechafin ? formatDate($scope.jsonacciones.fechafin) : ""
            }
          }).then(function (response) {
            var cod = response.data.codigo;
            var mgs = response.data.nombre;
            switch (cod) {
              case "0":
                notification.getNotification('error', mgs, 'Notificacion');
                break;
              case "1":
                notification.getNotification('success', mgs, 'Notificacion');
                break;
              case "2":
                notification.getNotification('warning', mgs, 'Notificacion');
                break;
              default:
            }
            $scope.Obtenerproyectos();
            $scope.filter = "";
          })
        } else {

          notification.getNotification('error', "No pueden haber campos vacios.", 'Notificacion');
        }


      }

      $scope.validateAccciones = function (params) {

        var returntemp = true;
        if (params == "A") {

          if ($scope.jsonacciones.motivo && $scope.jsonacciones.fechainicio && $scope.jsonacciones.fechafin) {
            returntemp = true;
          } else {
            returntemp = false;
          }

        }

        if (params == "X") {
          if ($scope.jsonacciones.motivo) {
            returntemp = true;
          } else {
            returntemp = false;
          }
        }

        return returntemp;
      }

    }]).filter('range', function () {
      return function (input, total) {
        total = parseInt(total);

        for (var i = 0; i < total; i++) {
          input.push(i);
        }

        return input;
      };
    });
