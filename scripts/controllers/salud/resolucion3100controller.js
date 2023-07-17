'use strict';
angular.module('GenesisApp').controller('resolucion_3100_controller', ['$scope', '$http', '$q', function ($scope, $http, $q) {
  $(document).ready(function () {
    $scope.nit = sessionStorage.getItem('nit');
    $scope.SysDay = new Date();
    $scope.maxDate = new Date();
    $scope.maxDate = $scope.maxDate.setDate($scope.SysDay.getDate() + 30);
    $('.modal').modal();
    // $('.modal').modal({ dismissible: false });
    $(".fechas").kendoDatePicker({
      culture: "es-CO",
      format: "yyyy-MM-dd",
      dateInput: true
    });
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
    if (document.getElementById('fileInput')) {
      document.getElementById('fileInput')
        .addEventListener('change', $scope.loadFile, false);
    }
    $scope.inicio();
  });

  $scope.limpiar = function () {
    $scope.temp = {
      'FECHA': '',
      // 'FECHA_AUD': ''
    };
    $scope.usuario = sessionStorage.getItem('cedula');
    $scope.ObtenerGrupoServiciosyServicios();
    $scope.ObtenerAuditores();
    $scope.ObtenerEstandar();
    $scope.lista_preAuditorias = [];
    $scope.lista_servicios_preAuditorias = [];
    $scope.servicios_evaluar = [];
    $scope.InputSearch = '';
    // $scope.InputSearch = '806010305';
    $scope.servicios_evaluar = [];
    $scope.paso = 1;
    $scope.FECHA = '';
    $scope.swEstandar = { 'sw': false, 'index': '', 'documento': '' };
    $scope.JSONpreAuditoria = {
      'IPS': '',
      'SEDE': '',
      'UBICACION': '',
      'GRUPO_SERVICIO': [],
      'AUDITORES': [],
      'FECHA': '',
      'RAZON_SOCIAL': ''
    };
    $scope.ArrAuditores = [];
    $scope.ArrAuditoresTemp = [];
    $scope.ArrEstandares = [];
    $scope.ArrEstandaresTemp = [];
    $scope.ArrPrestadores = [];
    $scope.listaGserviciosyServicios = [];
    $scope.listaGserviciosyServiciosTemp = [];
    $scope.lista_preguntasAuditorias = [];
    $scope.lista_preguntasAuditoriasTemp = [];
    $scope.sw = {
      acordeon: false,
      tabs: false
    };
    $scope.codAuditoria = '';
    $scope.codCriterioTemp = '';
    $scope.arrRespuestas = [];
    $scope.arrPlanMejoramiento = [];
    $scope.arrObservaciones = [];
    $scope.rutasEstandar = [];
  }

  $scope.inicio = function () {
    $scope.limpiar();
    $scope.fechaActual = new Date();
    $scope.arrIcons = [
      { cod: "1", icon: "icon-medkit" }, { cod: "2", icon: "icon-user-md" }, { cod: "3", icon: "icon-stethoscope" }, { cod: "4", icon: "icon-ambulance" }, { cod: "5", icon: "icon-heartbeat" }, { cod: "6", icon: "icon-th-list" }, { cod: 0, icon: 'icon-left-open' }
    ];
    setTimeout(() => {
      if ($scope.nit != 0) $scope.listar_pre_auditorias(1);
    }, 300);
  };

  // CONSULTAS BASE DE DATOS
  $scope.ConsultaIPS = function (nit) {
    if (nit == null && nit == '') {
      return swal('Importante', 'Debe diligenciar NIT!', 'info');
    }
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
      url: "php/salud/resolucion3100/resolucion3100.php",
      data: {
        function: 'ConsultaIPS',
        nit: nit
      }
    }).then(function ({ data }) {
      if (data.CODIGO == 0) {
        return swal('Importante', data.MENSAJE, 'info');
      } else {
        $scope.JSONpreAuditoria.RAZON_SOCIAL = data[0].razon_social;
        $scope.ArrPrestadores = data;
        $scope.paso = 2;
      }
      swal.close();
    });
  }

  $scope.ObtenerGrupoServiciosyServicios = function () {
    $http({
      method: 'POST',
      url: "php/salud/resolucion3100/resolucion3100.php",
      data: {
        function: 'listaGrupoServicioYservicios',
      }
    }).then(function ({ data }) {
      var xdata = data;
      xdata.forEach(e => {
        e.CHECK = false;
        if (e.CODIGO == 6) {
          e.CHECK = true;
        }
        e.SERVICIOS.forEach(x => {
          x.CHECK = false;
          if (x.CODIGO == 40) {
            x.CHECK = true;
          }
        });
      });
      $scope.servicios_evaluar = xdata;
      $scope.servicios_evaluarTemp = $scope.servicios_evaluar;
      setTimeout(() => {
        $(".collapsible-header").addClass(function () {
          return "active";
        }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: true });

      }, 300);
    });
  }

  $scope.ObtenerAuditores = function () {
    $http({
      method: 'POST',
      url: "php/salud/resolucion3100/resolucion3100.php",
      data: {
        function: 'ObtenerAuditores',
      }
    }).then(function ({ data }) {
      // console.log(data);
      var xdata = data;
      xdata.forEach(e => {
        e.estandar = [];
      });
      $scope.ArrAuditoresTemp = xdata;
      $scope.ArrAuditoresTemp.forEach(e => {
        if (e.documento == sessionStorage.getItem('cedula')) {
          $scope.addYremoveAuditor(1, e);
          // $scope.ArrAuditores.push(e);
          // let v = $scope.ArrAuditoresTemp.findIndex(e.documento);
          // console.log(v);
        }
      });
    });
  }

  $scope.ObtenerEstandar = function () {
    var defered = $q.defer();
    var promise = defered.promise;
    $http({
      method: 'POST',
      url: "php/salud/resolucion3100/resolucion3100.php",
      data: {
        function: 'ObtenerEstandar',
      }
    }).then(function (data) {
      $scope.ArrEstandaresTemp = data.data;
      $scope.ArrEstandares = data.data;
      defered.resolve(data.data);
    });
    return promise;
  }

  // LOGICA CONTROLER

  $scope.abrirGrupo = function (x) {
    $scope.servicio_seleccionados = x;
    var btns_servicio_select = document.getElementById("btns_servicio_select");
    btns_servicio_select.classList.remove("slide-out-left");

    if (x.NOMBRE != $scope.servicio_seleccionados.NOMBRE) {
      btns_servicio_select.classList.remove("slide-in-right");
      setTimeout(() => {
        btns_servicio_select.classList.add('slide-in-right');
        $scope.$apply();
      }, 100);
    }
    setTimeout(() => {
      btns_servicio_select.classList.add('slide-in-right');
      document.getElementById("contain_acordeon").classList.replace('s12', 's9');
      $scope.$apply();
    }, 15);

  }

  $scope.volver = function () {

    // var bnt_top = document.getElementById("btn_top");
    var btns_servicio_select = document.getElementById("btns_servicio_select");
    if (btns_servicio_select.classList.contains('slide-out-left')) {
      btns_servicio_select.classList.remove("slide-out-left");
    }
    // bnt_top.classList.remove("slide-out-left");
    // $scope.sw.btn_top = true;
    // bnt_top.classList.add('slide-in-right');
    btns_servicio_select.classList.remove("slide-in-right");
    setTimeout(() => {
      btns_servicio_select.classList.add('slide-out-left');
      // btns_servicio_select.classList.add('hide');
      $scope.$apply();
    }, 100);
    setTimeout(() => {
      document.getElementById("contain_acordeon").classList.replace('s9', 's12');
      $scope.$apply();
    }, 300);
  }

  $scope.obtener_preguntas = function (servicio, estandar) {
    $scope.lista_preguntasAuditoriasTemp = [];
    $http({
      method: 'POST',
      url: "php/salud/resolucion3100/resolucion3100.php",
      data: {
        function: 'listar_criterios',
        codAuditoria: $scope.codAuditoria,
        cedula: $scope.usuario,
        codServicio: servicio,
        codEstandar: estandar
      }
    }).then(function ({ data }) {
      $scope.lista_preguntasAuditorias = data;
      $scope.lista_preguntasAuditoriasTemp = data;
      $scope.preguntas = true;

      setTimeout(() => {
        $scope.$apply();
        $scope.lista_preguntasAuditoriasTemp.forEach(e => {
          document.getElementById("C-" + e.codigo_servicio + "-" + e.codigo_estandar + "-" + e.codigo_criterio).checked = e.check == 1 ? true : false;
          document.getElementById("NC-" + e.codigo_servicio + "-" + e.codigo_estandar + "-" + e.codigo_criterio).checked = e.check == 2 ? true : false;
          document.getElementById("NA-" + e.codigo_servicio + "-" + e.codigo_estandar + "-" + e.codigo_criterio).checked = e.check == 3 ? true : false;
        });
      }, 500);
    });


  }

  $scope.guardarAvanceAuditoria = function (x) {
    $scope.arrRespuestas = [];
    x.forEach(e => {
      $scope.arrRespuestas.push(
        {
          cod_auditoria: $scope.codAuditoria,
          codigo_criterio: e.codigo_criterio,
          codigo_estandar: e.codigo_estandar,
          codigo_servicio: e.codigo_servicio,
          check: e.check
        }
      );
    });
    $scope.arrObservaciones.forEach(e => {
      $scope.arrRespuestas.forEach(t => {
        if (e.codCriterio == t.codigo_criterio) {
          t.observacion = e.observacion;
          // if (e.codCriterio == t.codigo_criterio) {
          // t.accion = e.accion
          // t.responsable = e.responsable
          // t.fechaLimite = e.fechaLimite
          // }
        }
      });
    });
    $scope.arrRespuestas.forEach(t => {
      if (t.check == 2) {
        // if (t.accion == undefined &&
        //   t.responsable == undefined &&
        //   t.fechaLimite == undefined) {
        //   t.check = 0
        // }
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
    $http({
      method: 'POST',
      url: "php/salud/resolucion3100/resolucion3100.php",
      data: {
        function: 'guardarAvance',
        json: $scope.arrRespuestas
      }
    }).then(function ({ data }) {
      if (data.toString().substr(0, 3) != '<br') {
        if (data.CODIGO == 1) {
          // $scope.limpiar();
          return swal('Importante', data.MENSAJE, 'success');
        } else {
          return swal('Importante', data.MENSAJE, 'error');
        }
      }
      swal.close();
    });
  }
  $scope.mejoramiento = function (x) {
    $scope.codCriterioTemp = '';
    $scope.codCriterioTemp = x.codigo_criterio;
    $('#modal_registro_accion_mejora').modal('open');
  }

  $scope.ObservacionCriterioAuditoria = function (x) {
    $scope.codCriterioTemp = '';
    if (x.check == 2) {
      $scope.model = 2;
    } else {
      $scope.model = 1;
    }
    $('#modal_registro_observacion_criterio').modal('open');
    $scope.codCriterioTemp = x.codigo_criterio;
  }

  $scope.RegistrarObservacion = function (x) {
    if ($scope.observacionCriterio != '' && $scope.observacionCriterio != undefined) {
      let index = $scope.arrObservaciones.findIndex(elemento => elemento.codCriterio == $scope.codCriterioTemp);
      if (index !== -1) {
        $scope.arrObservaciones[index].observacion = $scope.observacionCriterio;
      } else {
        $scope.arrObservaciones.push({ codCriterio: $scope.codCriterioTemp, observacion: $scope.observacionCriterio });
      }
      $scope.observacionCriterio = '';
    }
    $('.modal').modal('close');
  }

  $scope.RegistrarPlan = function () {
    // var fechaValida = $scope.validarFecha($scope.fechaLimite.getDate() + '-' + ((($scope.fechaLimite.getMonth() + 1) < 10) ? '0' + ($scope.fechaLimite.getMonth() + 1) : ($scope.fechaLimite.getMonth() + 1)) + '-' + $scope.fechaLimite.getFullYear());
    if ($scope.accion != undefined && $scope.accion != '' &&
      $scope.responsable != undefined && $scope.responsable != '' &&
      $scope.fechaLimite != undefined) {
      $scope.accionMejora = {
        codAuditoria: $scope.codAuditoria,
        codCriterio: $scope.codCriterioTemp,
        accion: $scope.accion,
        responsable: $scope.responsable,
        fechaLimite: $scope.fechaLimite.getDate() + '-' + ((($scope.fechaLimite.getMonth() + 1) < 10) ? '0' + ($scope.fechaLimite.getMonth() + 1) : ($scope.fechaLimite.getMonth() + 1)) + '-' + $scope.fechaLimite.getFullYear()
      }
      $scope.arrPlanMejoramiento.push($scope.accionMejora);
      $('.modal').modal('close');
      $scope.accionMejora = '';
    } else {
      swal('Importante', 'Debe diligenciar todos los campos!', 'info');
    }
  }


  $scope.BuscarUsuarios = function () {
    $scope.setPaso(2);
  }

  $scope.setPaso = function (paso) {
    if (paso == 3) {
      document.getElementById('6_40').setAttribute("disabled", true);
    }
    if (paso == 4) {
      let x = 0;
      $scope.servicios_evaluarTemp.forEach(e => {
        e.SERVICIOS.forEach(q => {
          if (e.CHECK) {
            x++;
          }
          if (q.CHECK) {
            x++;
          }
        });
      });
      if (x == 0) {
        swal('Importante', 'Debe asignar por lo menos un servicio a evaluar', 'info');
        return;
      }
      $scope.grupoServiciosaAuditar();
      let y = 0;
      $scope.servicios_evaluarTemp.forEach(e => {
        e.SERVICIOS.forEach(q => {
          if (e.CHECK) {
            y++;
          }

        });
      });
      if (y < 2) {
        swal('Importante', 'Debe asignar por lo menos un servicio a evaluar', 'info');
        return;
      }
      setTimeout(() => {
        $scope.$apply();
      }, 500);
    }
    if (paso == 5) {
      let contadorEstandares = 0;
      if ($scope.ArrAuditores.length == 0) {
        swal('Importante', 'Debe asignar por lo menos a un auditor', 'info');
        return;
      }
      if ($scope.ArrAuditores.length == 1) {
        $scope.ArrAuditores[0].estandar = $scope.ArrEstandares;
        contadorEstandares = $scope.ArrEstandares.length;
        swal('Importante', 'Se asignaran todos los estandares a este auditor', 'info');
        // });
      } else {
        $scope.ArrAuditores.forEach(e => {
          contadorEstandares = contadorEstandares + e.estandar.length;
          if (e.estandar.length == 0) {
            swal('Importante', 'Todos los auditores deben auditar almenos 1 estandar', 'info');
            setTimeout(() => {
              $scope.paso = 4;
              $scope.$apply();
              return;
            }, 500);
          }
        });
      }
      if (contadorEstandares != 7) {
        swal('Importante', 'Se deben asignar todos los estandares', 'info');
        setTimeout(() => {
          $scope.paso = 4;
          $scope.$apply();
          return;
        }, 500);
      }

    }
    if ($scope.JSONpreAuditoria.IPS != '') {
      $scope.paso = paso;
    } else {
      swal({
        title: "¡Importante!",
        text: "Debe seleccionar una sede",
        type: "warning",
      }).catch(swal.noop);
    }
  }
  console.log(1)

  $scope.atras = function () {
    $scope.paso--;
    if ($scope.paso == 4) { $scope.ArrEstandaresTemp = [] };
  }

  $scope.grupoServiciosaAuditar = function () {
    var cont = 0;
    for (let i = 0; i < $scope.servicios_evaluarTemp.length; i++) {
      for (let j = 0; j < $scope.servicios_evaluarTemp[i].SERVICIOS.length; j++) {
        if ($scope.servicios_evaluarTemp[i].SERVICIOS[j].CHECK == true) {
          cont++;
        }
      }
      if (cont > 0) {
        $scope.servicios_evaluarTemp[i].CHECK = true;
      } else {
        $scope.servicios_evaluarTemp[i].CHECK = false;
      }
      cont = 0;
    }
  }

  $scope.addYremoveAuditor = function (accion, json) {
    var cont = 0;
    if (accion == 1) {
      if ($scope.ArrAuditores.length < 4) {
        var index = $scope.ArrAuditoresTemp.indexOf(json);
        if (index !== -1) {
          $scope.ArrAuditores.forEach(e => {
            if (e.documento == json.documento) {
              cont++;
            }
          });
          if (cont == 0) {
            $scope.ArrAuditoresTemp.splice(index, 1);
            $scope.ArrAuditores.push(json);
          } else {
            swal({
              title: "¡Importante!",
              text: "Este auditor ya fue elegido",
              type: "warning",
            }).catch(swal.noop);
          }
        }
      } else {
        swal({
          title: "¡Importante!",
          text: "El maximo de auditores por aditoria es de 4",
          type: "warning",
        }).catch(swal.noop);
      }
    }
    if (accion == 2) {
      var index = $scope.ArrAuditores.indexOf(json);
      if (index !== -1) {
        $scope.ArrAuditores[index].estandar.forEach(e => {
          $scope.ArrEstandaresTemp.push(e);
        });
        $scope.ArrAuditores.splice(index, 1);
        $scope.ArrAuditoresTemp.push(json);
      }
      if ($scope.ArrAuditores.length == 1) {
        $scope.ObtenerEstandar();
      }
      $scope.swEstandar.sw = !$scope.swEstandar.sw;
    }
  }

  $scope.setSwal = function (x, y) {
    if ($scope.ArrAuditores.length == 1) return;
    $scope.swEstandar.sw = !$scope.swEstandar.sw;
    $scope.swEstandar.index = y;
    $scope.swEstandar.documento = x;
  }

  $scope.addYremoveEstandar = function (estandar, auditor, accion) {
    let cont = 0;
    let resp = $scope.validaEstadarDeAuditores(estandar);
    let indexAud = $scope.ArrAuditores.indexOf(auditor);
    if (accion == 1) {
      let indexEstd = $scope.ArrEstandaresTemp.indexOf(estandar);
      if (resp == 0) {
        if (indexEstd !== -1) {
          if (indexAud !== -1) {
            $scope.ArrEstandaresTemp.splice(indexEstd, 1);
            $scope.ArrAuditores[indexAud].estandar.push(estandar);
          }
        }
      }
    }
    if (accion == 2) {
      var indexEstd = $scope.ArrAuditores[indexAud].estandar.indexOf(estandar);
      if (indexEstd !== -1) {
        if (indexAud !== -1) {
          $scope.ArrEstandaresTemp.push(estandar);
          $scope.ArrAuditores[indexAud].estandar.splice(indexEstd, 1);
        }
      }
    }
    if ($scope.ArrEstandaresTemp.length == 0) {
      $scope.swEstandar.sw = false;
    }
  }

  $scope.validaEstadarDeAuditores = function (estandar) {
    let cont = 0;
    for (let i = 0; i < $scope.ArrAuditores.length; i++) {
      for (let j = 0; j < $scope.ArrAuditores[i].estandar.length; j++) {
        if ($scope.ArrAuditores[i].estandar[j] == estandar) {
          cont++;
        }
      }
    }
    if (cont > 0) {
      return 1;
    }
    return 0;
  }

  $scope.setIPS = function (x) {
    $scope.JSONpreAuditoria.IPS = x.nit;
    $scope.JSONpreAuditoria.SEDE = x.numero_sede;
    $scope.JSONpreAuditoria.UBICACION = x.ubicacion;
    $scope.JSONpreAuditoria.COD_UBICACION = x.cod_ubicacion;
    swal({
      title: "¡Importante!",
      text: "Prestador Seleccionado",
      type: "success",
      timer: 1500,
      showCancelButton: false,
      showConfirmButton: false
    }).catch(swal.noop);
    $scope.setPaso(3);
  }

  $scope.guardar = function (x) {
    setTimeout(() => {
      $scope.$apply();
    }, 500);
    let json1 = [];

    if (x == 'P') {
      if ($scope.JSONpreAuditoria.AUDITORES.length == 0) {
        $scope.ArrAuditores.forEach(function callback(e, index) {
          if (index == 0) {
            $scope.JSONpreAuditoria.AUDITORES.push({ 'documento': e.documento, 'estandar': e.estandar, 'rol': 1 });
          } else {
            $scope.JSONpreAuditoria.AUDITORES.push({ 'documento': e.documento, 'estandar': e.estandar, 'rol': 2 });
          }
        });
      }
      $scope.servicios_evaluarTemp.forEach(e => {
        if (e.CHECK) {
          $scope.JSONpreAuditoria.GRUPO_SERVICIO.push(e);
        }
      });

      $scope.JSONpreAuditoria.GRUPO_SERVICIO.forEach(e => {
        if (e.CHECK) {
          e.SERVICIOS.forEach(b => {
            if (b.CHECK) {
              json1.push(b);
            }
          });
          e.SERVICIOS = json1;
          json1 = [];
        }
      });
      $scope.FECHA = $scope.temp.FECHA;
      var fechaLimite = new Date(); //fecha actual
      fechaLimite.setHours(0, 0, 0, 0); //llevar a hora 00:00:00
      fechaLimite.setDate(fechaLimite.getDate() + 30); //sumarle 30 días
      var fechaIngresada = new Date($scope.FECHA.getFullYear(), $scope.FECHA.getMonth(), $scope.FECHA.getDate());
      if ($scope.JSONpreAuditoria.SEDE != '') {
        if ($scope.JSONpreAuditoria.IPS != '') {
          if ($scope.JSONpreAuditoria.AUDITORES.length > 0) {
            if ($scope.JSONpreAuditoria.GRUPO_SERVICIO.length > 0) {
              if ($scope.FECHA != '' && $scope.FECHA != undefined) {
                if (fechaIngresada <= fechaLimite) {
                  //   if (($scope.FECHA.getMonth() >= $scope.SysDay.getMonth())) {
                  //     if (($scope.FECHA.getDate() >= $scope.SysDay.getDate())) {
                  // if (($scope.FECHA >= $scope.SysDay) && ($scope.FECHA <= fechaMaxima)) {
                  $scope.JSONpreAuditoria.FECHA = $scope.FECHA.getDate() + '-' + ((($scope.FECHA.getMonth() + 1) < 10) ? '0' + ($scope.FECHA.getMonth() + 1) : ($scope.FECHA.getMonth() + 1)) + '-' + $scope.FECHA.getFullYear();
                  $http({
                    method: 'POST',
                    url: "php/salud/resolucion3100/resolucion3100.php",
                    data: {
                      function: 'guardar_pre_auditoria',
                      json: JSON.stringify($scope.JSONpreAuditoria)
                    }
                  }).then(function ({ data }) {
                    if (data.toString().substr(0, 3) != '<br') {
                      if (data.CODIGO == 1) {
                        swal('Importante', data.MENSAJE, 'success');
                      } else {
                        swal('Importante', data.MENSAJE, 'error');
                      }
                      $scope.limpiar();
                    }
                  });
                } else {
                  return swal('Importante', 'Debe seleccionar una fecha diferente!', 'info');
                }
                //   } else {
                //     return swal('Importante', 'Debe seleccionar una fecha diferente!', 'info');
                //   }
                // } else {
                //   return swal('Importante', 'Debe seleccionar una fecha diferente!', 'info');
                // }
              } else {
                return swal('Importante', 'Debe seleccionar una fecha diferente!', 'info');
              }
            } else {
              return swal('Importante', 'Debe seleccionar almenos 1 grupo de servicio!', 'info');
            }
          } else {
            return swal('Importante', 'Debe seleccionar almenos 1 auditor!', 'info');
          }
        } else {
          return swal('Importante', 'Debe seleccionar un prestador!', 'info');
        }
      }
    }
    if (x == 'F') {
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
        url: "php/salud/resolucion3100/resolucion3100.php",
        data: {
          function: 'guardarAuditoria',
          cedula: sessionStorage.getItem('cedula'),
          auditoria: $scope.codAuditoria
        }
      }).then(function ({ data }) {
        if (data.toString().substr(0, 3) != '<br') {
          if (data.CODIGO == 0) {
            swal({
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
              title: 'Notificacion',
              text: data.MENSAJE,
              type: 'info'
            }).then(()=>{
              $scope.listar_pre_auditorias(0);
            });
          } else {
            swal({
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
              title: 'Notificacion',
              text: data.MENSAJE,
              type: 'success'
            }).then(()=>{
              $scope.listar_pre_auditorias(0);
            });
          }
        }
        $scope.sw.tabs = false;
        $scope.sw.acordeon = false;
      });
    }
  }

  $scope.listar_pre_auditorias = function (tipo) {
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
      url: "php/salud/resolucion3100/resolucion3100.php",
      data: {
        function: 'listar_Pre_Auditoria',
        doc: $scope.nit == 0 ? sessionStorage.getItem('cedula') : $scope.nit,
        // tipo: tipo != 0 && tipo != 1 ? tipo : 2
        tipo: $scope.nit == 0 ? tipo : 1
      }
    }).then(function ({ data }) {

      if (data.toString().substr(0, 3) != '<br') {
        if (tipo == 0) {
          $scope.lista_preAuditorias = data;
        }
        if (tipo == 1) {
          $scope.check_option = true;
          $scope.lista_preAuditorias = data;
        }
        if (tipo != 0 && tipo != 1) {
          $('#modal_resumen').modal('open');
          $scope.lista_servicios_preAuditorias = data;
        }
      }
      swal.close();
    });
  }

  $scope.openModal = function (x) {
    $scope.listar_pre_auditorias(2);
  }

  $scope.iniciarAuditoria = function (x) {
    $scope.codAuditoria = x.numero_auditoria;
    $scope.sw.tabs = true;
    $http({
      method: 'POST',
      url: "php/salud/resolucion3100/resolucion3100.php",
      data: {
        function: 'listar_grupo_servicio',
        doc: sessionStorage.getItem('cedula'),
        numAuditoria: x.numero_auditoria
      }
    }).then(function ({ data }) {
      $scope.listaGserviciosyServicios = data;
      $scope.listaGserviciosyServiciosTemp = data;
      $scope.listaGserviciosyServiciosTemp.push({
        codigo_grupo_servicio: "99",
        grupo_servicio: "ATRAS",
      });
      $scope.listaGserviciosyServiciosTemp.forEach(function (e, i) {
        $scope.listaGserviciosyServiciosTemp[i].icon = $scope.arrIcons.find(i => i.cod == e.codigo_grupo_servicio);
      });
      setTimeout(() => {
        $scope.$apply();
      }, 300);
    });
  }

  $scope.serviciosAuditoria = function (x) {
    $scope.servicioAuditoria = x;
    if (x.codigo_grupo_servicio == "99") {
      $scope.sw.tabs = false;
      $scope.sw.acordeon = false;
    } else {
      $scope.sw.acordeon = true;
    }
  }

  $scope.estandaresAuditoria = function (codServicio, codGServicio) {
    console.log('Cod-Servicio->' + codServicio + ' cod-GServicio->' + codGServicio);
  }


  $scope.tabulaResultados = function (tipo, x) {
    $scope.tabulaciones = [];
    $('#modal_tabulacion').modal('open');
    if (tipo == 1) {
      $http({
        method: 'POST',
        url: "php/salud/resolucion3100/resolucion3100.php",
        data: {
          function: 'tabulacion_resultado',
          cedula: sessionStorage.getItem('cedula'),
          auditoria: x
        }
      }).then(function ({ data }) {
        console.log(data[0]);
        $scope.tabulaciones = data[0];
      });
    }
  }

  $scope.reprogramar = function (x) {
    console.log(x);
    $scope.resp = '';
    let SysDay = new Date(x.fecha_auditoria);
    swal({
      title: "Reprogramar auditoria",
      html: `
            <div class="col">
            <label style="font-weight: bold;">Fecha</label>
            <input id="datetimepicker" type="date" class="form-control" style="text-align:center"  min="+ ${SysDay} + " autofocus>
            </div>
            `,
      width: 'auto',
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve(
            {
              fecha: $('#datetimepicker').val(),
            }
          )
        })
      }
    }).then(function (result) {
      if (result.fecha != '') {
        var fecha = result.fecha.toString().split('-');
        var Fecha_Inicio = fecha[2] + '-' + fecha[1] + '-' + fecha[0];
        result.fecha = Fecha_Inicio;
        $http({
          method: 'POST',
          url: "php/salud/resolucion3100/resolucion3100.php",
          data: {
            function: 'reprograma_auditoria',
            auditoria: x.numero_auditoria,
            fecha_reprogramacion: result.fecha,
            auditor: sessionStorage.getItem('cedula')
          }
        }).then(function ({ data }) {
          swal.close();
          if (data.toString().substr(0, 3) != '<br') {
            if (data != 0) {
              if (data.Codigo == 0) {
                swal({
                  title: "Mensaje",
                  text: data.Nombre,
                  type: "warning",
                }).catch(swal.noop);
              } else {
                swal({
                  title: "Mensaje",
                  text: data.Nombre,
                  type: "success",
                }).catch(swal.noop);
              }
            }
          }
          $scope.listar_pre_auditorias(0);
        }).catch(swal.noop);
        defered.resolve(result);
      } else {
        swal({
          title: "Mensaje",
          text: "¡Debe ingresar una fecha!",
          type: "warning",
        }).catch(swal.noop);
      }
      $scope.limpiar();
      $scope.listar_Pre_Auditoria(0);
    }).catch(swal.noop);
  }

  $scope.cargue_evidencias = function (tipo, data) {
    $scope.codAuditoria = data.numero_auditoria;
    if (tipo == 1) {
      $('#modal_cargue_evidencias').modal('open', { dismissible: false });
      setTimeout(() => {
        document.querySelectorAll('.file-input-wrapper>input').forEach((element, index) => {
          document.querySelector(`#${element.id}`).addEventListener('change', function (e) {
            var files = e.target.files;
            if (files.length != 0) {
              for (let i = 0; i < files.length; i++) {
                const x = files[i].name.split('.');
                if (x.pop().toUpperCase() == 'PDF') {
                  if (files[i].size < 15485760 && files[i].size > 0) {
                    $scope.getBase64(files[i]).then(function (result) {
                      $scope.ArrEstandares[index].B64 = result;
                      $scope.ArrEstandares[index].CODIGO_AUDITORIA = $scope.codAuditoria;
                      $scope.ArrEstandares[index].NIT = data.nit;
                      if (files[i].name.length <= 30) {
                        document.querySelector(`#file-button-text_${index + 1}`).innerHTML = files[i].name;
                      } else {
                        document.querySelector(`#file-button-text_${index + 1}`).innerHTML = files[i].name.slice(0, 30 - 3) + "...";
                      }
                      setTimeout(function () { $scope.$apply(); }, 300);
                    });
                  } else {
                    document.querySelector(`#${element.id}`).value = '';
                    swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
                  }
                } else {
                  document.querySelector(`#${element.id}`).value = '';
                  swal('Advertencia', '¡El archivo seleccionado debe ser formato PDF!', 'info');
                }
              }
            }
          });
        });
      }, 1000);
    }
  }

  $scope.uploadFile = function (tipo_soporte) {
    swal({
      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
      width: 200,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      animation: false
    });
    let cont = 0;
    if (tipo_soporte == 1) {
      $scope.ArrEstandares.forEach(e => {
        if (e.B64 != undefined) cont++;
      });
      if (cont != 7) {
        return swal('Advertencia', '¡Debe cargar un archivo de evidencias por cada estandar!', 'info');
      }
      $scope.upload($scope.ArrEstandares, tipo_soporte).then(function (result) {
        if (result.toString().substr(0, 3) != '<br') {
          if (result == 0) {
            return swal('Advertencia', '¡Ocurrio un error al cargar los archivos por favor intente nuevamente!', 'info');
          }
          if (result.Codigo == 1) {
            swal({
              title: "Mensaje",
              text: result.Nombre,
              type: "success",
            }).catch(swal.noop);
          } else {
            swal({
              title: "Mensaje",
              text: result.Nombre,
              type: "error",
            }).catch(swal.noop);
          }
        }
      });
    }
  }

  $scope.LimpiarInputFile = function () {

  }

  $scope.upload = function (file, tipo_soporte) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http({
      method: 'POST',
      url: "php/salud/resolucion3100/resolucion3100.php",
      data: {
        function: 'uploadFiles',
        file: file,
        tipo_soporte: tipo_soporte
      }
    }).then(function (data) {
      defered.resolve(data.data);
    });
    return promise;
  }

  $scope.obtenerRutas = function (modal, id) {
    $http({
      method: 'POST',
      url: "php/salud/resolucion3100/resolucion3100.php",
      data: {
        function: 'obtenerRutas',
        auditoria: id
      }
    }).then(function ({ data }) {
      $scope.downloadFilesRutas = data;
      $('#modal_descarga_archivos').modal('open');
    });
  }

  $scope.downloadFiles = function (ruta) {
    if (ruta != undefined) {
      $http({
        method: 'POST',
        url: "php/salud/resolucion3100/resolucion3100.php",
        data: {
          function: 'downloadFiles',
          ruta: ruta
        }
      }).then(function ({ data }) {
        window.open("temp/" + data.trim());
      });
    }
  }

  $scope.resultado_auditoria = function (x) {
    console.log(x);
    $('#modal_resultados_auditoria').modal('open');
    $scope.lista_resultado_auditoria = [];
    swal({
      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
      width: 200,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      animation: false
    }); swal.close();
    $http({
      method: 'POST',
      url: "php/salud/resolucion3100/resolucion3100.php",
      data: {
        function: 'resultado_auditoria',
        auditoria: x
      }
    }).then(function ({ data }) {
      swal.close();
      if (data.toString().substr(0, 3) != '<br') {
        $scope.lista_resultado_auditoria = data;
      }
    });
    setTimeout(() => {
      $scope.$apply();
    }, 300);
  }

  $scope.listar_hallazgos = function (x) {
    $('#modal_hallazgos').modal('open');
    $scope.lista_hallazgos = [];
    swal({
      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
      width: 200,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      animation: false
    }); swal.close();
    $http({
      method: 'POST',
      url: "php/salud/resolucion3100/resolucion3100.php",
      data: {
        function: 'listar_hallazgos',
        auditoria: x
      }
    }).then(function ({ data }) {
      swal.close();
      if (data.toString().substr(0, 3) != '<br') {
        $scope.lista_hallazgos = data;
      }
    });
    setTimeout(() => {
      $scope.$apply();
    }, 300);
  }

  $scope.getBase64 = function (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  $scope.ajustesAdmin = function (tipo, data) {
    if (tipo == 1) {
      swal({
        title: "¿Desea inhabilitar esta auditoria?",
        text: "Una vez inhabilitada no podra reabrirse!",
        type: "question",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Si, continuar!",
        showCancelButton: true,
        allowOutsideClick: false
      }).catch(swal.noop)
        .then((willDelete) => {
          if (willDelete) {
            $http({
              method: 'POST',
              url: "php/salud/resolucion3100/resolucion3100.php",
              data: {
                function: 'inhabilita_auditoria',
                auditoria: data.numero_auditoria,
                responsable: $scope.usuario,
              }
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) != '<br') {
                $scope.listar_pre_auditorias(0);
                if (data.CODIGO == 1) {
                  swal({
                    title: "Mensaje",
                    text: data.MENSAJE,
                    type: "success",
                  }).catch(swal.noop);
                }
              }
            });
          }
        });
    }
  }

  $scope.contaTextArea = function () {
    const contador = document.getElementById("contador");
    const caracteresRestantes = 1000 - $scope.observacionCriterio.length;
    contador.innerHTML = `${caracteresRestantes} caracteres restantes`;
  }


}]);