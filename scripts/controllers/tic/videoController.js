'use strict';
angular.module('GenesisApp')
  .controller('videoController', ['$scope', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
    function ($scope, $http, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {

      var dat = { prov: 'navb' }
      $.getJSON("php/obtenersession.php", dat).done(function (respuesta) {
        $scope.sesdata = respuesta;
        $scope.cedula = $scope.sesdata.cedula;
        $scope.ubicacion = $scope.sesdata.codmunicipio;
        console.log($scope.ubicacion);
      }).fail(function (jqXHR, textStatus, errorThrown) {
        // console.log("navbar error obteniendo variables");
      });


      $(document).ready(function () {
        $scope.responsable = sessionStorage.getItem('cedula')


      });

      // $scope.mientras = true;

      $scope.listarsalas = function (tab) {

        setTimeout(function () {
          $scope.salas = [];
          $scope.$apply();
        }, 500);
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
          url: "php/videoconferencia/funcvideo.php",
          data: { function: 'obtenersalasvideo', tab: tab }
        }).then(function (response) {
          //console.log(response.data);
          setTimeout(function () {
            $scope.salas = response.data;
            swal.close();
            // $scope.mostrar_salas=response.data.ESTADO;            
            $scope.$apply();
          }, 500);

        });
      }



      $scope.setTab = function (newTab) {
        $scope.tab = newTab;
        $(".tabI").removeClass("tabactiva");
        $(".tabII").removeClass("tabactiva");
        $scope.listarsalas(newTab);
        switch (newTab) {

          case 1:
            $(".tabI").addClass("tabactiva");

            break;
          case 2:
            $(".tabII").addClass("tabactiva");



          default:
        }
      }
      $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
      }
      $scope.setTab('V');



      // $(document).ready(function() {
      //     $scope.listarsalas();
      // });
      //Cargar Estado De LA video
      setInterval(function () {
        $scope.listarsalas($scope.tab);
      }, 300000);

      $scope.abrir = function (link) {
        window.open(link);
      }

      $scope.info_video = function (i) {
        $scope.a = i;
        ngDialog.open({
          template: 'views/tic/modal/infovideo.html',
          className: 'ngdialog-theme-plain',
          controller: 'InforController',
          scope: $scope
        })
      }

      $scope.agendar_video = function (id, nom) {
        $scope.cod = id;
        $scope.NombreSala = nom;
        var modal_agrego = ngDialog.open({
          template: 'views/tic/modal/agendarvideo.html',
          className: 'ngdialog-theme-plain',
          controller: ['$scope', '$http', 'ngDialog', 'consultaHTTP', 'afiliacionHttp', function ($scope, $http, ngDialog, consultaHTTP, afiliacionHttp) {
            $(document).ready(function () {
              setTimeout(function () {
                $scope.initCalendar();
              }, 100);
            });
            $scope.video = $scope.cod;
            $scope.eventos = function () {
              $http({
                method: 'GET',
                url: "php/videoconferencia/funclistaragenda.php?motivo=" + $scope.cod,
                data: {}
              }).then(function (response) {
                $scope.salas = response.data;
                $scope.calendar.fullCalendar('removeEvents');
                for (var i = 0; i < $scope.salas.length; i++) {
                  $scope.calendar.fullCalendar('renderEvent', {
                    title: $scope.salas[i].title,
                    start: $scope.salas[i].start,
                    end: $scope.salas[i].end,
                    numero: $scope.salas[i].numero,
                    solicitante: $scope.salas[i].solicitante,
                    block: $scope.salas[i].block,
                    asunto: $scope.salas[i].asunto,
                    codigo: $scope.salas[i].codigo,
                    motivo: $scope.salas[i].motivo,
                    nombre: $scope.salas[i].nombre
                  });
                }
              });
            }
            $scope.initCalendar = function () {
              if (typeof ($.fn.fullCalendar) === 'undefined') { return; }
              var date = new Date(), maxDate = new Date(),
                d = date.getDate(),
                m = date.getMonth(),
                y = date.getFullYear(),
                started, ended,
                categoryClass;
              $(document).ready(function () {
                $("#calendar");
                $scope.calendar = $('#calendar').fullCalendar({
                  contentHeight: 710,
                  //locale: 'es',
                  timezone: 'local',
                  timeFormat: 'h:mm',
                  axisFormat: 'h:mm',
                  forceEventDuration: true,
                  defaultTimedEventDuration: "01:00:00",
                  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                  monthNamesShort: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                  dayNamesShort: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                  //listDayFormat: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
                  buttonText: { today: 'Hoy', month: 'Mes', week: 'Semana', day: 'Dia', list: 'Agenda' },
                  header: { left: 'prev,next', center: 'title', right: 'agendaWeek,listWeek,' },
                  views: { listWeek: { buttonText: 'list week' } },
                  allDaySlot: false,
                  defaultView: 'agendaWeek',
                  selectable: true,
                  selectHelper: true,
                  editable: false,
                  droppable: false,
                  minTime: "07:00:00",
                  maxTime: "23:00:00",
                  timeFormat: 'h(:mm)t',
                  axisFormat: 'h:mm',
                  slotDuration: { hours: 1 },
                  events: 'php/videoconferencia/funclistaragenda.php?motivo=' + $scope.cod,
                  eventClick: function (event) {
                    if ($scope.cedula == event.solicitante || $scope.cedula == '1143450658') {
                      swal({
                        title: 'Confirmar',
                        text: '¿Desea cancelar la video conferencia?',
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Cancelar Video Conferencia',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'Cerrar Ventana'
                      }).then((result) => {
                        if (result) {
                          $http({

                            method: 'POST',
                            url: "php/videoconferencia/funcvideo.php",
                            data: {
                              function: 'eliminar_agenda',
                              documento: 'RE',
                              numero: event.numero,
                              ubicacion: $scope.ubicacion,
                              estado: 'X',
                              motivo: $scope.video
                            }
                          }).then(function (response) {
                            if (response.data.Error == '0') {
                              swal('Completado!', response.data.Mensaje, 'success');
                              $scope.eventos();
                            }
                            else {
                              swal('Completado!', response.data.Mensaje, 'error');
                            }
                          })
                        }
                      })
                    } else {
                      swal('Informacion!', 'La Video Conferencia Fue Agendada Por: ' + event.nombre, 'warning');
                    }
                  },
                  selectOverlap: function (event) {
                    return !event.block;
                    //swal({type:'info',title:'Se encuentra ocupada',showConfirmButton: true})
                  },
                  select: function (start, end) {
                    var fechainicio = '';
                    var fechafin = '';
                    var ini = new Date(start._i[0], start._i[1], start._i[2], start._i[3], start._i[4], start._i[5], start._i[6]);//calendar.formatDate(start,'yyyy-MM-dd');
                    var fin = new Date(end._i[0], end._i[1], end._i[2], end._i[3], end._i[4], end._i[5], end._i[6]);//calendar.formatDate(start,'yyyy-MM-dd');
                    var today = new Date();
                    //Comvierto La Fecha Inicial a DD/MM/YYY HH:MM:SS
                    var dd = ('0' + ini.getDate()).slice(-2);
                    var mm = ('0' + (ini.getMonth() + 1)).slice(-2);
                    var yyyy = ini.getFullYear();
                    var hora = ini.getHours();
                    var min = ('0' + ini.getMinutes()).slice(-2);
                    var seg = ('0' + ini.getSeconds() + 1).slice(-2);
                    //Comvierto La Fecha FInal a DD/MM/YYY HH:MM:SS
                    var d = ('0' + fin.getDate()).slice(-2);
                    var m = ('0' + (fin.getMonth() + 1)).slice(-2);
                    var yy = fin.getFullYear();
                    var h = fin.getHours();
                    var mi = ('0' + fin.getMinutes()).slice(-2);
                    var s = ('0' + fin.getSeconds()).slice(-2);

                    //Recibo La Fecha y Hora De Inicio y Final
                    $scope.inicio = (dd + '/' + mm + '/' + yyyy + ' ' + hora + ':' + min + ':' + seg);
                    $scope.final = (d + '/' + m + '/' + yy + ' ' + h + ':' + mi + ':' + s);

                    $scope.in = (hora);
                    $scope.fi = (h);
                    $scope.dia_seleccionado = (dd);
                    $scope.time = ($scope.fi - $scope.in);
                    // console.log($scope.dia_seleccionado);

                    // console.log($scope.in);
                    // console.log($scope.fi);

                    if ($scope.cod == '15' || $scope.cod == '16' || $scope.cod == '17') {
                      var dia_actual = new Date();
                      var dia_hoy = date.getDate();

                      // console.log(dia_hoy);
                      var hora_actual = dia_actual.getHours();
                      var hora_actual_maxima = hora_actual + 24;
                      // var hora_colocada = 1;
                      // if (hora_actual_maxima > 24 ){
                      //     hora_actual_maxima - 24
                      // }





                      // console.log('Hora Actual ' + hora_actual + ' Hora Maxima ' + hora_actual_maxima + ' - ' + ' Hora Tomada ' + $scope.in);
                      // console.log(today);
                      // console.log('dia seleccionado ' + $scope.dia_seleccionado + ' fecha nose ' + ini + ' - ' + ' fecha del sistema ' + today);

                      if (ini <= today) {
                        swal({ type: 'info', title: 'No se puede agendar ', showConfirmButton: true });
                        return;
                      }


                      var fecha_actual_mas_uno = new Date();
                      fecha_actual_mas_uno.setDate(fecha_actual_mas_uno.getDate() + 1);


                      if (ini <= fecha_actual_mas_uno) {
                        swal({ type: 'info', title: 'Debe agendar la sala con minimo 24 horas de anticipación', showConfirmButton: true });
                        return;

                      }

                    }
                    if (ini <= today) {
                      swal({ type: 'info', title: 'No se puede agendar', showConfirmButton: true });
                      return;
                    } else if ($scope.time > '1') {
                      swal({ type: 'info', title: 'El tiempo maximo de una video conferencia es de 1 Hora', showConfirmButton: true });
                      return;
                    } else {

                      var dd = ('0' + ini.getDate()).slice(-2);
                      var mm = ('0' + (ini.getMonth() + 1)).slice(-2);
                      var yyyy = ini.getFullYear();
                      var hora = ini.getHours();
                      var min = ('0' + ini.getMinutes()).slice(-2);
                      var seg = ('0' + ini.getSeconds() + 1).slice(-2);

                      var d = ('0' + fin.getDate()).slice(-2);
                      var m = ('0' + (fin.getMonth() + 1)).slice(-2);
                      var yy = fin.getFullYear();
                      var h = fin.getHours();
                      var mi = ('0' + fin.getMinutes()).slice(-2);
                      var s = ('0' + fin.getSeconds()).slice(-2);



                      $scope.inicio = (dd + '/' + mm + '/' + yyyy + ' ' + hora + ':' + min + ':' + seg);
                      $scope.final = (d + '/' + m + '/' + yy + ' ' + h + ':' + mi + ':' + s);

                      var DialogAgenda = ngDialog.open({
                        template: 'views/tic/modal/agendar.html',
                        className: 'ngdialog-theme-plain',
                        controller: ['$scope', '$http', 'ngDialog', function ($scope, $http, ngDialog) {
                          $(document).ready(function () {
                            setTimeout(function () {
                              $("#fechainicial").kendoDateTimePicker({
                                value: $scope.inicio,
                                interval: 60
                              });
                              $("#fechafinal").kendoDateTimePicker({
                                value: $scope.final,
                                interval: 60
                              });

                            }, 3000);

                          });



                          $scope.listarsalas2 = function () {
                            $http({
                              method: 'POST',
                              url: "php/videoconferencia/funcvideo.php",
                              data: { function: 'obtenersalasvideo' }
                            }).then(function (response) {
                              //console.log(response.data);
                              setTimeout(function () {
                                $scope.salas = response.data.to;
                              }, 3000);

                            });
                          }

                          $scope.listarsalas2();

                          $scope.cambio_hs = function () {
                            // console.log($scope.horafinal);
                            // console.log($scope.inicio.toString().substr(11, 2));
                          var xhora = $scope.inicio.toString().length == 18 ? $scope.inicio.toString().substr(10, 2) : $scope.inicio.toString().substr(11, 2);
                            var hora = parseInt(xhora) + parseInt($scope.horas_seleccionada);
                            var xfinal = $scope.inicio.toString().length == 18 ? $scope.inicio.toString().substr(12, 6) : $scope.inicio.toString().substr(13, 6);
                            var final = $scope.inicio.toString().substr(0, 11) + hora + '' + xfinal;
                            // console.log("-----" + hora);
                            $scope.final = final;
                            $("#fechafinal").kendoDateTimePicker({
                              value: $scope.final,
                              interval: 60
                            });

                          }
                          console.log($scope.cod);
                          $scope.mostrar_horas == false;
                          if ($scope.cod == '15') {
                            $scope.mostrar_horas == true;
                          } else {
                            $scope.mostrar_horas == false;

                          }


                          $scope.AgendarDia = function () {
                            var Encontrar_Vacios = false;
                            if ($scope.asunto == null || $scope.asunto == '' || $scope.asunto == undefined) { Encontrar_Vacios = true; }
                            if (Encontrar_Vacios == true) {
                              swal('Notificacion', 'Por favor agregar asunto de la agenda', 'info');
                              return;
                            }
                            swal({
                              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                              width: 200,
                              allowOutsideClick: false,
                              allowEscapeKey: false,
                              showConfirmButton: false,
                              animation: false
                              
                            });


                            var Encontrar_Vacios = false;
                            if (($scope.cod == 15 || $scope.cod == 16 || $scope.cod == 17) && ($scope.horas_seleccionada == null || $scope.horas_seleccionada == '' || $scope.horas_seleccionada == undefined)) { Encontrar_Vacios = true; }
                            if (Encontrar_Vacios == true) {
                              swal('Notificacion', 'Por favor seleccionar cuantas horas va agendar', 'info');
                              return;
                            }
                            swal({
                              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                              width: 200,
                              allowOutsideClick: false,
                              allowEscapeKey: false,
                              showConfirmButton: false,
                              animation: false
                              

                            });


                            if ($scope.video == '' || $scope.video == undefined) {
                              swal('Informacion', 'Debe Selecionar La Sala De Video Conferencia', 'info');
                            } else if ($scope.asunto.length <= 10) {
                              swal('Informacion', 'El asunto de la reunion debe ser mayor a 10 caracteres', 'info');
                            } else {
                              $http({
                                method: 'POST',
                                url: "php/videoconferencia/funcvideo.php",
                                data: {
                                  function: 'insertar_acas_vc',
                                  ubicacion: $scope.ubicacion,
                                  problema: $scope.asunto,
                                  motivo: $scope.cod,
                                  emisor: $scope.cedula,
                                  fechainicio: $scope.inicio,
                                  fechaterminacion: $scope.final,
                                  v_logged_user: $scope.responsable
                                }
                              }).then(function (response) {
                                if (response.data[0].Error == '0') {
                                  swal.close();
                                  swal('Completado', response.data[0].Mensaje, 'success')
                                  $scope.closeThisDialog();
                                  $scope.eventos();
                                } else {
                                  swal.close();
                                  swal('Incorrecto', response.data[0].Mensaje, 'warning')
                                }
                              });
                            }

                          }
                        }],
                        scope: $scope
                      })
                      DialogAgenda.closePromise.then(function () {
                      })
                    }
                  },
                });
              });
            } // function inicializa el calendario initCalendar

          }], // controlador initCalendar
          scope: $scope
        }) //function ngdialog

      } // function abre el modal


    }])
