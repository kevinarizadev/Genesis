'use strict';
angular.module('GenesisApp')
.controller('plancapacitacionController', ['$scope', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'communication', '$controller', '$rootScope', '$window',
  function ($scope, $http, ngDialog, notification, $timeout, $q, communication, $controller, $rootScope, $window) {
    $(document).ready(function () {
      $('#modalevento').modal();
      $('#modalasistentes').modal();
      $('#modalfacilitador').modal();
    });
    $scope.mindate = new Date();
    $scope.agenda = {
      programacion: '',
      tema: '',
      tipoactividad: '',
      objetivoactividad: '',
      objetivoestrategico: [],
      fechaprogramada: '',
      fechaparseada: '',
      areasolicita: '',
      horasprogramadas: '',
      tipofacilitador: '2',
      documentofacilitador: '',
      facilitador: [],
      tipolugar: '1',
      lugar: '',
      lugarex: '',
      lugarin: '',
      sedePrin: '',
      evento: '',
      valor: ''
    }
    $scope.inactivepanel = false;
    $scope.inactivepanelindividual = true;
    $scope.inactivepanelareas = true;
    $scope.inactivecardasistentes = true;
    $scope.paneladjuntos = false;
    $scope.paneldx = true;
    $scope.activedx = 'active';
    $scope.activead = 'none';
    $scope.inactivepaso2 = true;
    $scope.inactivepaso3 = true;
    $scope.inactiveareas = true;
    $scope.inactivefacilitador = false;
    $scope.searchareas = '';
    $scope.searchasistente = '';
    $scope.sede = '';
    $scope.sede2 = '';
    $scope.area = '';
    $scope.tipofacilitador = ' ';
    $scope.inactivelugar = true;
    $scope.tablausuario = true;
    $scope.requierelugarex = false;
    $scope.requierelugarin = true;
    $scope.inactiveasistentes = true
    $scope.inactivepag = true;
    $(".paso1").addClass("activebtn-step");
    $('.content-step1').addClass('animated slideInRight');
    $scope.inactivepaso1 = false;
      //Listar objetivos estrategicos
      $http({
        method: 'POST',
        url: "php/talentohumano/capacitacion/Rcapacitacion.php",
        data: { function: 'listarObjetivosEstrategicos' }
      }).then(function (response) {
        $scope.listobjetivosestrategicos = response.data;
      })
      //Listar tipo de actividad
      $http({
        method: 'POST',
        url: "php/talentohumano/capacitacion/Rcapacitacion.php",
        data: { function: 'listarTipoActividad' }
      }).then(function (response) {
        $scope.listtipoactividad = response.data;
      })
      //Listar areas
      $http({
        method: 'POST',
        url: "php/talentohumano/capacitacion/Rcapacitacion.php",
        data: { function: 'listarAreas', sede: "1000" }
      }).then(function (response) {
        $scope.listareas = response.data;
      })
      //Listar sedes
      $http({
        method: 'POST',
        url: "php/talentohumano/capacitacion/Rcapacitacion.php",
        data: { function: 'listarSedes' }
      }).then(function (response) {
        $scope.listsedes = response.data;
      })
      //Listar lugares
      $http({
        method: 'POST',
        url: "php/talentohumano/capacitacion/Rcapacitacion.php",
        data: { function: 'listarLugares' }
      }).then(function (response) {
        $scope.listolugarevento = response.data;
      })
      $scope.listarObjetivoActividad = function () {
        if ($scope.agenda.tipoactividad != '') {
          $http({
            method: 'POST',
            url: "php/talentohumano/capacitacion/Rcapacitacion.php",
            data: { function: 'listarObjetivoActividad', actividad: $scope.agenda.tipoactividad }
          }).then(function (response) {
            $scope.listobjetivoactividad = response.data;
          })
        }
      }
      $scope.listarAreas = function (sede) {
        $scope.inactiveareas = true;
        $scope.inactiveareas2 = true;
        $scope.inactivecardasistentes = true;
        $scope.inactivecardasistentes2 = true;
        $scope.allareas = false;
        $scope.allasistentes = false;
        $scope.allareas2 = false;
        $scope.allasistentes2 = false;
        if (sede != '') {
          $http({
            method: 'POST',
            url: "php/talentohumano/capacitacion/Rcapacitacion.php",
            data: { function: 'listarAreas', sede: sede }
          }).then(function (response) {
            $scope.listareasxsedes = response.data;
            $scope.inactiveareas = false;
            $scope.inactiveareas2 = false;
          })
        }
      }
      $scope.seleccionarLugar = function () {
        if ($scope.agenda.tipolugar == "1") {
          $scope.inactivelugar = true;
          $scope.requierelugarex = false;
          $scope.requierelugarin = true;
        } else {
          $scope.inactivelugar = false;
          $scope.requierelugarex = true;
          $scope.requierelugarin = false;
        }
      }
      $scope.wizardstep = function (op, ac) {
        $('.content-step1').removeClass('animated slideInRight slideOutLeft');
        $('.content-step2').removeClass('animated slideInRight slideOutLeft');
        $('.content-step3').removeClass('animated slideInRight slideOutLeft');
        switch (op) {
          case "paso1":
          $scope.crearEvento();
          break;
          case "paso2":
          if (ac == "next") {
            $scope.listarResumen($scope.consecutivo, $scope.ubicacion, 1);
            $(".paso2").removeClass("activebtn-step").addClass("donebtn-step");
            $(".paso3").addClass("activebtn-step");
            $scope.inactivepaso2 = true;
            $scope.inactivepaso3 = false;
            $('.content-step3').addClass('animated slideInRight');
          } else {
            $(".paso2").removeClass("activebtn-step");
            $(".paso1").removeClass("donebtn-step").addClass("activebtn-step");
            $scope.inactivepaso2 = true;
            $scope.inactivepaso1 = false;
            $('.content-step1').addClass('animated slideInLeft');
          }
          break;
          case "paso3":
          if (ac == "finish") {
            $scope.finalizarEvento();
          } else {
            $(".paso3").removeClass("activebtn-step");
            $(".paso2").removeClass("donebtn-step").addClass("activebtn-step");
            $scope.inactivepaso3 = true;
            $scope.inactivepaso2 = false;
            $('.content-step2').addClass('animated slideInLeft');
          }
          break;
          default:
        }
      }
      $scope.verOpcionesAsistentes = function (op) {
        $scope.searchareas = '';
        $scope.searchasistente = '';
        $scope.sede = '';
        $scope.sede2 = '';
        $scope.area = '';
        $scope.inactivecardasistentes = true;
        $scope.inactiveareas = true;
        $scope.allareas = false;
        $scope.allasistentes = false;
        var id = "";
        if (op == 'A') {
          $scope.inactivepanelindividual = true;
          $scope.inactivepanelareas = false;
          id = '#areas input:checked';
          $scope.inactiveareas = true;
        } else {

          $scope.inactivepanelareas = true;
          $scope.inactivepanelindividual = false;
          id = '#individual input:checked';
        }
        $(id).each(function () {
          $(this).prop('checked', false);
        });
      }
      $scope.verOpcionesAsistentes2 = function (op) {
        $scope.searchareas2 = '';
        $scope.searchasistente2 = '';
        $scope.search2 = '';
        $scope.sede3 = '';
        $scope.sede4 = '';
        $scope.area2 = '';
        $scope.inactiveareas2 = true;
        $scope.inactivecardasistentes2 = true;
        $scope.allasistentes2 = false;
        $scope.allareas2 = false;
        $scope.allbuscar2 = false;
        $scope.tablausuario2 = true;
        var id = "";
        if (op == 'A') {
          $scope.inactivepanelindividual2 = true;
          $scope.inactivepanelbuscar2 = true;
          $scope.inactivepanelareas2 = false;
          id = '#areas2 input:checked';
          $scope.inactiveareas = true;
          $(id).each(function () {
            $(this).prop('checked', false);
          });
        } else if (op == 'I') {
          $scope.listarAsistentesInd();
          $scope.inactivepanelareas2 = true;
          $scope.inactivepanelbuscar2 = true;
          $scope.inactivepanelindividual2 = false;
          id = '#individual2 input:checked';
          $(id).each(function () {
            $(this).prop('checked', false);
          });
        } else {
          $scope.inactivepanelareas2 = true;
          $scope.inactivepanelindividual2 = true;
          $scope.inactivepanelbuscar2 = false;
          $scope.tablausuario2 = false;
        }
      }
      $scope.listarAsistentes = function () {
        if ($scope.area != '') {
          $http({
            method: 'POST',
            url: "php/talentohumano/capacitacion/Rcapacitacion.php",
            data: { function: 'listarAsistentes', area: $scope.area, sede: $scope.sede2 }
          }).then(function (response) {
            $scope.inactivecardasistentes = false;
            $scope.listasistentes = response.data;
          })
        } else {
          $scope.inactivecardasistentes = true;
        }
      }

      $scope.listarAsistentesInd = function () {
        // $scope.allareas2 = false;
        //$scope.allasistentes2 = false;

        $http({
          method: 'POST',
          url: "php/talentohumano/capacitacion/Rcapacitacion.php",
          data: { function: 'listarAsistentesInd' }
        }).then(function (response) {
          $scope.inactivecardasistentes2 = false;
          $scope.listasistentes = response.data;
        })
        //$scope.inactivecardasistentes2 = true;

      }



      $scope.listarResumen = function (consecutivo, ubicacion, paginacion) {
        $scope.mensaje = "";
        $scope.listasistentesagendados = [];
        $scope.infoevento = [];
        $scope.editinfoevento = [];
        $scope.listasistentesagendados = [];
        $scope.agendadostotal = [];
        $http({
          method: 'POST',
          url: "php/talentohumano/capacitacion/Rcapacitacion.php",
          data: { function: 'listarResumen', paginacion: paginacion, numero: consecutivo, ubicacion: ubicacion }
        }).then(function (response) {
          if (response.data.info["1"]["0"].codigo == "3") {
            $scope.mensaje = response.data.info["1"]["0"].mensaje;
            $scope.inactiveasistentes = false;
          } else {
            $scope.inactiveasistentes = true;
            $scope.listasistentesagendados = response.data.info["1"];
            $scope.agendadostotal = $scope.listasistentesagendados;
          }
          $scope.infoevento = response.data.info["0"];
          $scope.infoevento.Fecha = new Date(response.data.info["0"].Fecha);
          $scope.editinfoevento = response.data.info["0"];
          $scope.editinfoevento.Fecha = new Date(response.data.info["0"].Fecha);

          $scope.agendados = response.data.info["0"].Agendados;
          $scope.confirmados = response.data.info["0"].Confirmados;
          $scope.ausentes = response.data.info["0"].Ausentes;
          $scope.paginacion = response.data.info["0"].Paginacion;
          $scope.numero = response.data.info["0"].Ubicacion;
          $scope.consecutivo = response.data.info["0"].Consecutivo;
          var cantidadasistentes = 0;
          for (var i = 0; i < $scope.agendadostotal.length; i++) {
            cantidadasistentes = cantidadasistentes + $scope.agendadostotal[i].asistentes.length;
          }
          //validar si mostrar o no el "ver mas"
          if (cantidadasistentes >= Number($scope.agendados)) { $scope.inactivepag = true; } else { $scope.inactivepag = false; }
        })
      }
      $scope.obtenerpaginacion = function (consecutivo, ubicacion, paginacion) {
        $scope.mensaje = "";
        $scope.listasistentesagendados = [];
        $scope.inactivepag = false;
        $http({
          method: 'POST',
          url: "php/talentohumano/capacitacion/Rcapacitacion.php",
          data: { function: 'listarResumen', paginacion: paginacion, numero: consecutivo, ubicacion: ubicacion }
        }).then(function (response) {
          if (response.data.info["1"]["0"].codigo == "3") {
            $scope.mensaje = response.data.info["1"]["0"].mensaje;
            $scope.inactiveasistentes = false;
          } else {
            $scope.inactiveasistentes = true;
            $scope.listasistentesagendados = response.data.info["1"];

          }
          $scope.agendados = response.data.info["0"].Agendados;
          $scope.confirmados = response.data.info["0"].Confirmados;
          $scope.ausentes = response.data.info["0"].Ausentes;
          $scope.paginacion = response.data.info["0"].Paginacion;
          $scope.numero = response.data.info["0"].Ubicacion;
          $scope.consecutivo = response.data.info["0"].Consecutivo;
          var cont = 0;
          var area = '';
          for (var i = 0; i < $scope.listasistentesagendados.length; i++) { //recorremos el array nuevo
            area = $scope.listasistentesagendados[i].area; //escogemos la primer area para validar
            cont = 0; //reinicimaos el contador de areas existentes
            for (var j = 0; j < $scope.agendadostotal.length; j++) { //recorremos el array ya renderizado
              if (area == $scope.agendadostotal[j].area) { //comparamos si la area nueva ya existe en las renderizadas
                for (var k = 0; k < $scope.listasistentesagendados[i].asistentes.length; k++) { //si existe recorremos los asistentes nuevos para irlos insertando en el array renderizado del area encontrada
                  $scope.agendadostotal[j].asistentes.push($scope.listasistentesagendados[i].asistentes[k]) //insertamos los datos del nuevo array al que esta renderizado
                }
              }
              else {
                cont = cont + 1; //en caso de no coincidir el area comparada se va contando
              }
            }
            if (cont == $scope.agendadostotal.length) { //si la validacion es igual quiere decir que el area objeto del nuevo array no se encontro en el renderizado se inserta todo el array al nuevo como una nueva area con sus miembros
              $scope.agendadostotal.push($scope.listasistentesagendados[i]); //se hace push sobre el array renderizado
            }
          }
          //contar cuantos asistentes hay renderizados
          var cantidadasistentes = 0;
          for (var i = 0; i < $scope.agendadostotal.length; i++) {
            cantidadasistentes = cantidadasistentes + $scope.agendadostotal[i].asistentes.length;
          }
          //validar si mostrar o no el "ver mas"
          if (cantidadasistentes >= Number($scope.agendados)) { $scope.inactivepag = true; } else { $scope.inactivepag = false; }
        })
      }
      $scope.agendarAsistentes = function (opcion, opcion2, sede) {
        if (sede != '' && $scope.consecutivo != null && $scope.ubicacion != null) {
          swal({
            title: 'Confirmar',
            text: "Esta seguro que desea agendar a estas personas?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result) {
              var id = '';
              var headjson = '';
              if (opcion == "area") { id = '#' + opcion2 + ' input:checked'; headjson = '{"areas":['; } else { id = '#' + opcion2 + ' input:checked'; headjson = '{"cedulas":['; }
              var selected = [];
              var cantidad = 0;
              $(id).each(function () {
                selected.push($(this).attr('name'));
                cantidad = cantidad + 1;
              });
              var dataAsistentes = headjson + selected + ']}';
              $http({
                method: 'POST',
                url: "php/talentohumano/capacitacion/Ccapacitacion.php",
                data: { function: 'agendarAsistentes', asistentes: dataAsistentes, cantidad: cantidad, sede: sede, numero: $scope.consecutivo, ubicacion: $scope.ubicacion, opcion: opcion }
              }).then(function (response) {
                if (response.data.codigo == 1) {
                  if (opcion2 == 'areas2' || opcion2 == 'individual2') { $scope.listarResumen($scope.consecutivo, $scope.ubicacion, 1); }
                  swal('Completado', response.data.mensaje, 'success')

                } else {
                  swal('Advertencia', response.data.mensaje, 'warning')
                }
              })
            }
          })
        } else {
          swal('importante', 'Complete los campos', 'info')
        }
      }
      $scope.crearEvento = function () {
        var i = new Date().getFullYear() - 1;
        var inicio = new Date('01/01/' + i.toString());
        var fin = new Date('12/31/' + new Date().getFullYear().toString());
        if ($scope.agenda.fechaparseada < inicio || $scope.agenda.fechaparseada > fin) {
          swal('Importante', 'Fecha no esta dentro del rango definido ' + formatDate(inicio).substr(0, 10) + ' - ' + formatDate(fin).substr(0, 10), 'info')
        } else {
          swal({
            title: 'Confirmar',
            text: "Esta seguro que desea crear el evento?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result) {
              if ($scope.agenda.tipolugar == "1") {
                $scope.agenda.lugar = $scope.agenda.lugarin
              } else {
                $scope.agenda.lugar = $scope.agenda.lugarex;
              }
              $scope.agenda.fechaprogramada = formatDate($scope.agenda.fechaparseada);
              var dataEvento = '';
              var json_facilitador = '';
              var json_objetivo ='';

              dataEvento = JSON.stringify($scope.agenda);

              json_facilitador = JSON.stringify($scope.agenda.facilitador);
              var cantidadfacilitador = $scope.agenda.facilitador.length;

              json_objetivo = JSON.stringify($scope.agenda.objetivoestrategico);
              var cantidadobjetivo = $scope.agenda.objetivoestrategico.length;
              if (cantidadfacilitador == 0) {
               swal('Advertencia', 'Debe elegir al menos un Facilitador', 'warning')
             } else if (cantidadobjetivo == 0) {
              swal('Advertencia', 'Debe elegir al menos un Objetivo Estrategico', 'warning')
            }
            else{
             $http({
              method: 'POST',
              url: "php/talentohumano/capacitacion/Ccapacitacion.php",
              data: { function: 'crearEvento', data: dataEvento, data1:json_facilitador,
              data2:json_objetivo, cantidadfacilitador: cantidadfacilitador, 
              cantidadobjetivo: cantidadobjetivo}
            }).then(function (response) {
              if (response.data.codigo == 1) {
                $scope.consecutivo = response.data.consecutivo;
                $scope.ubicacion = response.data.ubicacion;
                $(".paso1").removeClass("activebtn-step").addClass("donebtn-step");
                $(".paso2").addClass("activebtn-step");
                $scope.inactivepaso1 = true;
                $('.content-step2').addClass('animated slideInRight');
                $scope.inactivepaso2 = false;
                swal('Completado', response.data.mensaje, 'success')
              } else {
                swal('Advertencia', response.data.mensaje, 'warning')
              }
            })

          }
          
        }
      })
        }
      }
      $scope.finalizarEvento = function () {
        $scope.mindate = new Date();
       $scope.agenda = {
      programacion: '',
      tema: '',
      tipoactividad: '',
      objetivoactividad: '',
      objetivoestrategico: [],
      fechaprogramada: '',
      fechaparseada: '',
      areasolicita: '',
      horasprogramadas: '',
      tipofacilitador: '2',
      documentofacilitador: '',
      facilitador: [],
      tipolugar: '1',
      lugar: '',
      lugarex: '',
      lugarin: '',
      sedePrin: '',
      evento: '',
      valor: ''
    }
        $scope.inactivepanel = false;
        $scope.inactivepanelindividual = true;
        $scope.inactivepanelareas = true;
        $scope.inactivecardasistentes = true;
        $scope.paneladjuntos = false;
        $scope.paneldx = true;
        $scope.activedx = 'active';
        $scope.activead = 'none';
        $scope.inactivepaso2 = true;
        $scope.inactivepaso3 = true;
        $scope.inactiveareas = true;
        $scope.inactivefacilitador = false;
        $scope.searchareas = '';
        $scope.searchasistente = '';
        $scope.sede = '';
        $scope.sede2 = '';
        $scope.area = '';
        $scope.inactivelugar = true;
        $scope.tablausuario = true;
        $scope.requierelugarex = false;
        $scope.requierelugarin = true;
        $scope.inactiveasistentes = true
        $scope.inactivepag = true;
        $(".paso2").removeClass("activebtn-step donebtn-step");
        $(".paso3").removeClass("activebtn-step donebtn-step");
        $(".paso1").removeClass("activebtn-step donebtn-step");
        $('.content-step1').removeClass('animated slideInRight slideOutLeft');
        $('.content-step2').removeClass('animated slideInRight slideOutLeft');
        $('.content-step3').removeClass('animated slideInRight slideOutLeft');
        $(".paso1").addClass("activebtn-step");
        $('.content-step1').addClass('animated slideInRight');
        $scope.inactivepaso1 = false;
        swal('Evento Finalizado', 'Su Evento Quedo Registrado Con El  Codigo: ' + $scope.consecutivo, 'success');
        //notification.getNotification('success', '!', 'Notificacion');
      }
      function formatDate(date) {
        var dd = ('0' + date.getDate()).slice(-2);
        var mm = ('0' + (date.getMonth() + 1)).slice(-2);
        var yyyy = date.getFullYear();
        var hh = date.getHours();
        var mi = date.getMinutes();
        return dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + mi + ':00';
      }
      $scope.verDetalle = function (consecutivo, ubicacion, paginacion) {
        $scope.listarResumen(consecutivo, ubicacion, paginacion);
        $scope.consecutivo = consecutivo;
        $scope.ubicacion = ubicacion;
        $('#modalevento').modal("open");
      }
      $scope.agregarasistentes = function () {
        $scope.inactiveareas2 = true;
        $scope.searchareas2 = '';
        $scope.searchasistente2 = '';
        $scope.sede3 = '';
        $scope.sede4 = '';
        $scope.area2 = '';
        $scope.inactivepanelindividual2 = true;
        $scope.inactivepanelareas2 = true;
        $scope.inactivepanelbuscar2 = true;
        $('#modalasistentes').modal("open");
      }
      // $scope.listarAgenda = function () {
      //   $http({
      //     method: 'POST',
      //     url: "php/talentohumano/capacitacion/Rcapacitacion.php",
      //     data: { function: 'listarAgenda' }
      //   }).then(function (response) {
      //     $scope.listagendas = response.data;
      //   })
      // }

      $scope.table = $('#lista_agenda').DataTable({
        dom: 'lBsfrtip',
        buttons: [ { extend: 'copy', text: 'Copiar' }, 'csv', 'excel'],
        ajax: {
          url: 'php/talentohumano/capacitacion/listar_agenda.php',
          dataSrc: ''
        },
        columns: [
          { data: "consecutivo" },
          { data: "Fecha" },
          { data: "Tema" },
          { data: "ubicacion" },
          { data: "nombreubicacion" },
          { data: "tipoevento" }

        ],
        "columnDefs": [
          {
              "targets": [ 3 ],
              "visible": false,
              "searchable": false
          }],
        language: {
          "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
        order: [[3, "desc"]],
        lengthMenu: [[10, 30, 50, -1], [10, 30, 50, 'Todas']]//,
      });

      $('#lista_agenda tbody').on('click', 'tr', function () {
          $scope.datoscolumna = $scope.table.row(this).data();

          $scope.verDetalle($scope.datoscolumna.consecutivo,$scope.datoscolumna.ubicacion,'1');
        });

      $scope.marcarareas = function (id, val) {
        if (val == true) {
          $(id).each(function () {
            $(this).prop('checked', true);
          });
        } else {
          $(id).each(function () {
            $(this).prop('checked', false);
          });
        }

      }
      $scope.eliminarAsistentes = function (cedula, consecutivo, ubicacion) {
        swal({
          title: 'Confirmar',
          text: "Esta seguro que desea quitar a esta persona?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result) {
            $http({
              method: 'POST',
              url: "php/talentohumano/capacitacion/Ccapacitacion.php",
              data: { function: 'eliminarAsistentes', cedula: cedula, consecutivo: consecutivo, ubicacion: ubicacion }
            }).then(function (response) {
              if (response.data.codigo == 1) {
                $scope.listarResumen(consecutivo, ubicacion, 1);
                swal('Completado', response.data.mensaje, 'success')
              } else {
                swal('Advertencia', response.data.mensaje, 'warning')
              }
            })
          }
        })
      }
      $scope.inactivefacilitador = false;
      $scope.ver = false;
      $scope.seleccionarFacilitador = function (tipo) {
        if (tipo == "1") {
          // $scope.finduser = "";
          // $scope.tablausuario = true;
          // $('#modalfacilitador').modal("open");
          // $scope.inactivefacilitador = true;
          $scope.inactivefacilitador = true;
        } else {
          $('#modalfacilitador').modal("close");
          // $scope.inactivefacilitador = false;
          // $scope.agenda.documentofacilitador = '';
          // $scope.agenda.facilitador = '';
          $scope.inactivefacilitador = false;
        }
      }
      $scope.buscarusuario = function (palabra) {
        if (palabra != "" && palabra != null && palabra != undefined && palabra.length >= 3) {
          $scope.usuarios = [{
            "cedula": '',
            "tipo": "",
            "nombre": "BUSCANDO USUARIOS",
            "nom": "",
            "ubicacion": '',
            "cargo": "",
            "area": "",
            "estado": ""
          }]
          $http({
            method: 'POST',
            url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
            data: { function: 'obtenerusuarios', dato: palabra }
          }).then(function (response) {
            if (response.data.length == 0) {
              $scope.tablausuario = true;
              $scope.usuarios = [{
                "cedula": '',
                "tipo": "",
                "nombre": "NO SE ENCONTRARON USUARIOS",
                "nom": "",
                "ubicacion": '',
                "cargo": "",
                "area": "",
                "estado": ""
              }]
            } else {
              $scope.ver = true;
              $scope.usuarios = response.data;
              $scope.tablausuario = false;
              $scope.tablausuario2 = false;
            }
          })
        }
        else {
          $scope.usuarios = [{
            "cedula": '',
            "tipo": "",
            "nombre": "INGRESE AL MENOS 3 CARACTERES PARA BUSCAR",
            "nom": "",
            "ubicacion": '',
            "cargo": "",
            "area": "",
            "estado": ""
          }]
        }
      }

      $scope.cargarobj = function () {
        for (let index = 0; index < $scope.agenda.objetivoestrategico.length; index++) {
          for (let index2 = 0; index2 < $scope.listobjetivosestrategicos.length; index2++) {
            if ($scope.agenda.objetivoestrategico[index].codigo == $scope.listobjetivosestrategicos[index2].codigo) {
              $('#' + $scope.listobjetivosestrategicos[index2].codigo).attr('checked', 'checked');
            }
          }
        }
      }
      $rootScope.$on('ngDialog.opened', function (e, $dialog) {
        setTimeout(function () { $scope.cargarobj(); }, 200);
      });

      $scope.objetivosdialog = function () {
        // $scope.agenda.objetivoestrategico = [];

        ngDialog.open({
          template: 'views/talentohumano/capacitacion/objetivos.html',
          className: 'ngdialog-theme-plain',
          scope: $scope,
        });
      };
      $scope.agenda.objetivoestrategico = [];
      $scope.agregarobjetivo = function (objetivoestrategico) {

        if ($scope.agenda.objetivoestrategico.length == 0) {
          $scope.agenda.objetivoestrategico.push(objetivoestrategico);
        } else {
          $scope.estado = 0;
          $scope.index = 0;
          for (let index = 0; index < $scope.agenda.objetivoestrategico.length; index++) {
            if ($scope.agenda.objetivoestrategico[index].codigo == objetivoestrategico.codigo) {
              $scope.estado = 1;
              $scope.index = index;
              break;
            }
          }
          if ($scope.estado == 0) {
            $scope.agenda.objetivoestrategico.push(objetivoestrategico);
          } else {
            $scope.agenda.objetivoestrategico.splice($scope.index, 1);
          }
        }
        // 
      };
      $scope.enviarobjetivos = function () {
        console.log($scope.agenda);
      }


      $scope.facilitadores = function () {
        ngDialog.open({
          template: 'views/talentohumano/capacitacion/facilitadores.html',
          className: 'ngdialog-theme-plain',
          scope: $scope,
        });
      };

      $scope.Items = function () {

      };
      $scope.indfacilitador = {
        tipo: '',
        doc: '',
        nombre: ''
      };
      $scope.repetido = false;



      $scope.addfacilitadores = function (tipo, doc, nombre) {

        if (tipo != null && tipo != undefined) {
          if (doc != null && doc != undefined) {
            if (nombre != null && nombre != undefined) {
              $scope.indfacilitador.tipo = tipo;
              $scope.indfacilitador.doc = doc;
              $scope.indfacilitador.nombre = nombre;

              for (let index = 0; index < $scope.agenda.facilitador.length; index++) {
                if ($scope.indfacilitador.doc == $scope.agenda.facilitador[index].doc) {
                  $scope.repetido = true;
                  break;
                }
              }

              if ($scope.repetido == 0) {
                $scope.agenda.facilitador.push($scope.indfacilitador);
                $scope.ver = false;
                $scope.indfacilitador = {
                  tipo: '',
                  doc: '',
                  nombre: ''
                };
              } else {
                swal('Error', 'ya se encuentra registrado', 'error')
                $scope.repetido = false;
              }
            } else {
              swal('error', 'favor llenar el nombre del facilitador', 'error');
            }
          } else {
            swal('error', 'favor llenar el documento del facilitador', 'error');
          }
        } else {
          swal('error', 'favor comunicarse con el area TIC', 'error');
        }

      }

      $scope.deletefacilitadores = function (index) {
        $scope.agenda.facilitador.splice(index, 1);
      }

      $scope.closepanel = function(){
        $scope.ver = false;
      }
      $scope.editar = false;
      $scope.edit = function () {
        if ($scope.editar==false) {
        $scope.editar = true;  
      } else {
        $scope.editar = false;
      }
        
      }

      $scope.actualizarEvento = function () {

        var date = formatDate(new Date($scope.editinfoevento.Fecha));
        swal({
          title: 'Confirmar',
          text: "Esta seguro que desea actualizar los datos?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result) {

           for (var i = 0; i < $scope.listolugarevento.length; i++) {
            if ($scope.editinfoevento.Cod_Lugar==$scope.listolugarevento[i].codigo) {
              $scope.nombedellugar=$scope.listolugarevento[i].nombre;
              break;
              return $scope.nombedellugar;
            }
          }
          


          $http({
            method: 'POST',
            url: "php/talentohumano/capacitacion/Rcapacitacion.php",
            data: {
              function: 'actualiza_evento',
              numero: $scope.editinfoevento.Consecutivo,
              ubicacion: $scope.editinfoevento.Ubicacion,
              tema: $scope.editinfoevento.Tema,
              fecha: date,
              lugar: $scope.nombedellugar,
              area_solicita: $scope.editinfoevento.Codigo_Area,
                // objetivo_estrategico: $scope.editinfoevento.ObjetivoE,
                // objetivo_actividad: $scope.editinfoevento.objetivo,
                duracion: $scope.editinfoevento.Horas
              }
            }).then(function (response) {
              if (response.data.coderror == "1") {
                swal('Exito', response.data.mensaje, 'success')
                $scope.editar = false;
                $scope.verDetalle($scope.editinfoevento.Consecutivo,$scope.editinfoevento.Ubicacion,'1');
              } else {
                swal('Advertencia', response.data.mensaje, 'warning')
                $scope.editar = false;
              }
            })
          }
        })
      }


    }])
