'use strict';
angular.module('GenesisApp').controller('afiliacion_linea_controller', ['$scope', '$http', 'consultaHTTP', 'notification', 'ngDialog', '$filter', function ($scope, $http, consultaHTTP, notification, ngDialog, $filter) {
  $(document).ready(function () {
    $('.tabs').tabs();
    document.querySelector("#tab_1").focus();
    // console.clear();
    console.log("1");
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("afiliacion_fecha_ingreso").setAttribute("max", today);
  });
  $scope.resize_screen = "";
  $scope.tabs = {
    select: 1
  };
  $scope.seleccionar = function (tab_numer) {
    $scope.tabs.select = tab_numer;
    switch (tab_numer) {
      case 1:

      break;
      case 2:
      setTimeout(() => {
        document.querySelector("#afiliacion_condicion").focus();
      }, 100);
      break;
      case 3:
      setTimeout(() => {
        document.querySelector("#afi_beneficiarios_tipo_documento").focus();
      }, 100);
      break;
      case 4:

      break;
      case 5:

      break;
      case 6:

      break;
    }
  }

  function validar_json(str) {
    try {
      if (typeof str !== "string") {
        return false;
      } else {
        return (typeof JSON.parse(str) === 'object');
      }
    } catch (e) {
      return false;
    }
  }

  $scope.format_date = function (tipo, date) {
    if (date != undefined && date != null && date != "") {
      if (tipo <= 0) {
        let fecha = date.split("/");
        return new Date(fecha[2], (fecha[1] - 1), fecha[0]);
      } else if (tipo > 0) {
        var dia = date.getDate();
        var mes = date.getMonth() + 1;
        var año = date.getFullYear();
        if (tipo == 1) {
          return ((dia < 10) ? ("0" + dia) : dia) + '/' + ((mes < 10) ? ('0' + mes) : mes) + '/' + año;
        } else if (tipo == 2) {
          return año + '/' + mes + '/' + dia;
        } else if (tipo == 3) {
          var resultado = new Date(año, (mes - 1), (dia - 1));
          dia = resultado.getDate();
          mes = resultado.getMonth() + 1;
          año = resultado.getFullYear();
          return año + '-' + ((mes < 10) ? ('0' + mes) : mes) + '-' + ((dia < 10) ? ("0" + dia) : dia);
        } else if (tipo == 4) {
          return año + '-' + ((mes < 10) ? ('0' + mes) : mes) + '-' + ((dia < 10) ? ("0" + dia) : dia);
        } else if (tipo == 5) {
          return año;
        } else if (tipo == 6) {
          return mes;
        } else if (tipo == 7) {
          return dia;
        }
      }
    } else {
      return "";
    }
  }

  function fechaActual() {
    var date = new Date();
    var dia = date.getDate();
    var mes = date.getMonth() + 1;
    var año = date.getFullYear();
    return ((dia < 10) ? ("0" + dia) : dia) + '/' + ((mes < 10) ? ('0' + mes) : mes) + '/' + año;
  }
  $(document).on("wheel", "input[type=number]", function (e) {
    $(this).blur();
  });
  // ------------------------------------------------------------------------------------------------------------- tab.1
  $scope.dsb = {
    btnSubirForm: false
  }

  $scope.historial = {
    listado: new Array(),
    estado: "M",
    fecha_inicio: "",
    fecha_fin: "",
    detalle: -1,
    estado_detalle: "",
    rechazo: "",
    tipo_solicitud: "",
    condicion: "",
    tipo_cotizante: "",
    vista_aportante: false,
    tipo_documento_aportante: "",
    numero_documento_aportante: "",
    nombre_aportante: "",
    direccion_aportante: "",
    telefono_aportante: "",
    correo_aportante: "",
    departamento_aportante: "",
    municipio_aportante: "",
    tipo_documento: "",
    numero_documento: "",
    nombre: "",
    // primer_nombre: "",
    // segundo_nombre: "",
    // primer_apellido: "",
    // segundo_apellido: "",
    fecha_nacimiento: "",
    sexo: "",
    estado_civil_cotizante: "",
    departamento_cotizante: "",
    municipio_cotizante: "",
    direccion_cotizante: "",
    zona_cotizante: "",
    telefono_f_cotizante: "",
    telefono_c_cotizante: "",
    correo_cotizante: "",
    ips_atencion: "",
    penciones_afp: "",
    riesgos_laborales_arl: "",
    salario_basico_mensual: "",
    fecha_ingreso: "",
    motivo_rechazo: "",
    usuario_procesa_nal: "",
    // vista_beneficiario: "NO",
    // tipo_documento_beneficiario: "",
    // numero_documento_beneficiario: "",
    // primer_nombre_beneficiario: "",
    // segundo_nombre_beneficiario: "",
    // primer_apellido_beneficiario: "",
    // segundo_apellido_beneficiario: "",
    // fecha_nacimiento_beneficiario: "",
    // sexo_beneficiario: "",
    // parentesco: "",
    // options_parentesco: new Array(),
    // eps_anterior: "",
    // options_eps_anterior: new Array(),
    // ubicacion_beneficiario: "",
    // departamento_beneficiario: "",
    // options_departamento_beneficiario: new Array(),
    // municipio_beneficiario: "",
    // options_municipio_beneficiario: new Array(),
    // direccion_beneficiario: "",
    // zona_beneficiario: "",
    // telefono_f_beneficiario: "",
    // telefono_c_beneficiario: "",
    // correo_beneficiario: "",
    // ips_atencion_beneficiario: "",
    // options_ips_atencion_beneficiario: new Array(),
    listado_beneficiarios: new Array(),
    listado_soportes: new Array(),
    listado_soportes_beneficiarios: new Array()
  }
  $scope.limpiar_detalle_solicitud = function () {
    $scope.historial.condicion = "";
    $scope.historial.tipo_cotizante = "";
    $scope.historial.vista_aportante = false;
    $scope.historial.tipo_documento_aportante = "";
    $scope.historial.numero_documento_aportante = "";
    $scope.historial.nombre_aportante = "";
    $scope.historial.direccion_aportante = "";
    $scope.historial.telefono_aportante = "";
    $scope.historial.correo_aportante = "";
    $scope.historial.departamento_aportante = "";
    $scope.historial.municipio_aportante = "";
    $scope.historial.tipo_documento = "";
    $scope.historial.numero_documento = "";
    $scope.historial.nombre = "";
    // $scope.historial.primer_nombre = "";
    // $scope.historial.segundo_nombre = "";
    // $scope.historial.primer_apellido = "";
    // $scope.historial.segundo_apellido = "";
    $scope.historial.fecha_nacimiento = "";
    $scope.historial.sexo = "";
    $scope.historial.estado_civil_cotizante = "";
    $scope.historial.departamento_cotizante = "";
    $scope.historial.municipio_cotizante = "";
    $scope.historial.direccion_cotizante = "";
    $scope.historial.zona_cotizante = "";
    $scope.historial.telefono_f_cotizante = "";
    $scope.historial.telefono_c_cotizante = "";
    $scope.historial.correo_cotizante = "";
    $scope.historial.ips_atencion = "";
    $scope.historial.penciones_afp = "";
    $scope.historial.riesgos_laborales_arl = "";
    $scope.historial.salario_basico_mensual = "";
    $scope.historial.fecha_ingreso = "";
    $scope.historial.listado_beneficiarios = new Array();
    $scope.historial.listado_soportes = new Array();
    $scope.historial.listado_soportes_beneficiarios = new Array();
  }
  $scope.cerrar_detalle = function () {
    $scope.historial.detalle = -1;
    $scope.historial.estado_detalle = "";
    $scope.limpiar_detalle_solicitud();
  }
  $scope.lista_solicitud_afiliacion = function () {
    swal({
      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
      width: 200,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      animation: false
    });
    $scope.cerrar_detalle();
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'lista_solicitudes_afiliacion',
        origen: "S",
        estado: $scope.historial.estado,
        fecha_inicio: $scope.format_date(1, $scope.historial.fecha_inicio),
        fecha_fin: $scope.format_date(1, $scope.historial.fecha_fin)
      }
    }).then(function (response) {
      swal.close();
      if (validar_json(angular.toJson(response.data))) {
        $scope.historial.listado = response.data;
        // $scope.historial.listado.push({
        //   RADICADO: "61",
        //   CONDICION: "EMPLEADO",
        //   APORTANTE: "NIT 900215262",
        //   COTIZANTE: "CC 1069469173",
        //   AFILIADO: "YEIMI ISABEL TORRES PEDROZA",
        //   SMVV_RESPONSABLE: "1143461706",
        //   FECHA_SOLICITUD: "29/03/2020",
        //   TIPO: "Inclusión"
        // });
      } else {
        $scope.historial.listado = new Array();
        // swal('Mensaje', 'No se obtuvo resultados para el lista_solicitud_afiliacion', 'info');
      }
    });
  }
  $scope.lista_solicitud_afiliacion();

  $scope.obtener_estado = function (codigo) {
    var estado = codigo;
    switch (codigo) {
      case 'N':
      estado = "PROCESADO";
      break;
      case 'S':
      estado = "PENDIENTE";
      break;
      case 'R':
      estado = "RECHAZADO";
      break;
    }
    return estado;
  }

  $scope.ver_detalle_solicitud = function (solicitud) {
    if (solicitud.RADICADO == $scope.historial.detalle) {
      $scope.historial.detalle = -1;
      $scope.historial.estado_detalle = "";
    } else {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      $scope.historial.solicitud = solicitud;
      $scope.historial.detalle = solicitud.RADICADO;
      $scope.historial.estado_detalle = solicitud.ESTADO;
      $scope.limpiar_detalle_solicitud();
      $http({
        method: 'POST',
        url: "php/movilidad/afiliacion_linea.php",
        data: {
          function: 'detalle_afiliacion',
          origen: "S",
          codigo: solicitud.RADICADO,
        }
      }).then(function (response) {
        if (validar_json(angular.toJson(response.data)) && response.data.datos_basicos != null) {
          $scope.historial.condicion = response.data.datos_basicos.NOMBRE;
          $scope.historial.tipo_cotizante = response.data.datos_basicos.TIPO_COTIZANTE;
          $scope.historial.tipo_solicitud = response.data.datos_basicos.TIPO_SOLICITUD;
          $scope.historial.tipo_documento_aportante = response.data.datos_basicos.TIPO_DOC_APORTANTE;
          $scope.historial.numero_documento_aportante = response.data.datos_basicos.ID_APORTANTE;
          $scope.historial.nombre_aportante = response.data.datos_basicos.NOMBRE_APORTANTE;
          $scope.historial.direccion_aportante = "NULL";
          $scope.historial.telefono_aportante = "NULL";
          $scope.historial.correo_aportante = "NULL";
          $scope.historial.departamento_aportante = "NULL";
          $scope.historial.municipio_aportante = "NULL";
          $scope.historial.tipo_documento = response.data.datos_basicos.TIPO_DOC_COTIZANTE;
          $scope.historial.numero_documento = response.data.datos_basicos.ID_COTIZANTE;
          $scope.historial.nombre = response.data.datos_basicos.NOMBRE_DILIGENCIADO;
          // $scope.historial.primer_nombre = response.data.datos_basicos;
          // $scope.historial.segundo_nombre = response.data.datos_basicos;
          // $scope.historial.primer_apellido = response.data.datos_basicos;
          // $scope.historial.segundo_apellido = response.data.datos_basicos;
          $scope.historial.fecha_nacimiento = response.data.datos_basicos.F_NACIMIENTO;
          $scope.historial.sexo = response.data.datos_basicos.GENERO;
          $scope.historial.estado_civil_cotizante = response.data.datos_basicos.ESTADO_CIVIL;
          $scope.historial.departamento_cotizante = response.data.datos_basicos.DEPARTAMENTO_NOMBRE;
          $scope.historial.municipio_cotizante = response.data.datos_basicos.UBICACION;
          $scope.historial.direccion_cotizante = response.data.datos_basicos.DIRECCION;
          $scope.historial.zona_cotizante = response.data.datos_basicos.ZONA;
          $scope.historial.telefono_f_cotizante = response.data.datos_basicos.TELEFONO;
          $scope.historial.telefono_c_cotizante = response.data.datos_basicos.CELULAR;
          $scope.historial.correo_cotizante = response.data.datos_basicos.CORREO;
          $scope.historial.ips_atencion = response.data.datos_basicos.IPS_ATENCION;
          $scope.historial.penciones_afp = response.data.datos_basicos.AFP;
          $scope.historial.riesgos_laborales_arl = response.data.datos_basicos.ARL;
          $scope.historial.salario_basico_mensual = response.data.datos_basicos.SALARIO;
          $scope.historial.fecha_ingreso = response.data.datos_basicos.FECHA_INGRESO;
          $scope.historial.motivo_rechazo = response.data.datos_basicos.MOTIVO_RECHAZO;
          $scope.historial.usuario_procesa_nal = response.data.datos_basicos.USUARIO_PROCESA_NAL;
          $scope.historial.listado_beneficiarios = response.data.beneficiarios;
          //$scope.historial.listado_soportes = response.data.adjuntos;
          // CNVU
          if (response.data.beneficiarios.length >= 1) {
            for (let ii = 0; ii < response.data.beneficiarios.length; ii++) {
              var doc = response.data.beneficiarios[ii].BEN_DOCUMENTO;
              for (let i = 0; i < response.data.adjuntos.length; i++) {
                if (response.data.adjuntos[i].DOCUMENTO == doc) {
                  $scope.historial.listado_soportes_beneficiarios.push({
                    tipo_doc: response.data.adjuntos[i].SMVC_TIPO_DOC_BEN,
                    documento: response.data.adjuntos[i].DOCUMENTO,
                    RUTA: response.data.adjuntos[i].RUTA,
                    TIPO_ARCHIVO: response.data.adjuntos[i].TIPO_ARCHIVO,
                    FTP: response.data.adjuntos[i].FTP
                    //nombre_archivo: response.adjuntos[i].TIPO_ARCHIVO
                  });
                }
                if (response.data.adjuntos[i].DOCUMENTO == null) {
                  $scope.historial.listado_soportes.push({
                    tipo_doc: response.data.adjuntos[i].SMVC_TIPO_DOC_BEN,
                    documento: response.data.adjuntos[i].DOCUMENTO,
                    RUTA: response.data.adjuntos[i].RUTA,
                    TIPO_ARCHIVO: response.data.adjuntos[i].TIPO_ARCHIVO,
                    FTP: response.data.adjuntos[i].FTP
                    //nombre_archivo: response.adjuntos[i].TIPO_ARCHIVO
                  });
                } 
                // else {
                //   $scope.historial.listado_soportes = new Array();
                // }
              }
            }
          }else{
            $scope.historial.listado_soportes = response.data.adjuntos;
          }
          console.log($scope.historial.listado_soportes);
          console.log($scope.historial.listado_soportes_beneficiarios);
          // CNVU
          if (solicitud.TIPO == "Afiliación") {
            $scope.historial.vista_aportante = true;
          } else {
            $scope.historial.vista_aportante = false;
          }
          setTimeout(() => {
            document.querySelector("#detalle_solicitud").scrollIntoView();
            swal.close();
          }, 60);
        } else {
          swal('Mensaje', 'No se obtuvo resultados para el detalle_afiliacion', 'info');
        }
      });
    }
  }
  $scope.rechazar = function () {
    if ($scope.historial.detalle != -1 && $scope.historial.detalle != "") {
      $http({
        method: 'POST',
        url: "php/movilidad/afiliacion_linea.php",
        data: {
          function: 'lista_causal_rechazo'
        }
      }).then(function (response) {
        if (validar_json(angular.toJson(response.data))) {
          var options = {};
          response.data.forEach(element => {
            options[element.CODIGO] = element.NOMBRE;
          });
          swal({
            title: 'Motivo del rechazo',
            input: 'select',
            inputOptions: options,
            inputPlaceholder: 'Seleccionar',
            showCancelButton: true,
            inputValidator: function (value) {
              return new Promise(function (resolve, reject) {
                if (value !== '') {
                  resolve();
                } else {
                  reject('Debes seleccionar un motivo');
                }
              });
            },
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
          }).then(function (result) {
            if (result) {
              $scope.historial.rechazo = result;
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              });
              $http({
                method: 'POST',
                url: "php/movilidad/afiliacion_linea.php",
                data: {
                  function: 'gestion_seccional',
                  numero: $scope.historial.detalle,
                  gestion: "R",
                  causal_rechazo: $scope.historial.rechazo,
                  nota: ""
                }
              }).then(function (response) {
                swal.close();
                if (validar_json(angular.toJson(response.data))) {
                  if (response.data.codigo == 0) {
                    $scope.historial.detalle = -1;
                    $scope.historial.estado_detalle = "";
                    $scope.limpiar_detalle_solicitud();
                    $scope.lista_solicitud_afiliacion();
                    swal('Mensaje', response.data.mensaje, 'success');
                    //CNVU
                    setTimeout(function () {
                      swal.close();
                      $scope.$apply();
                    }, 7000);
                    //CNVU
                  } else {
                    swal('Mensaje', response.data.mensaje, 'warning');
                  }
                } else {
                  swal('Mensaje', 'Error al intentar rechazar la solicitud #' + $scope.historial.detalle, 'error');
                }
              });
            }
          }).catch(swal.noop);
        } else {
          swal('Mensaje', 'No se obtuvo resultados para el lista_causal_rechazo', 'info');
        }
      });
    } else {
      swal('Mensaje', 'Error al intentar rechazar la solicitud #' + $scope.historial.detalle, 'error');
    }
  }
  $scope.aprobar = function (solicitud) {
    if ($scope.historial.detalle != -1 && $scope.historial.detalle != "") {
      swal({
        title: '¿Desea aprobar esta solicitud?',
        // text: "",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then(function (result) {
        if (result) {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/movilidad/afiliacion_linea.php",
            data: {
              function: 'gestion_seccional',
              numero: $scope.historial.detalle,
              gestion: "A",
              causal_rechazo: $scope.historial.rechazo,
              nota: ""
            }
          }).then(function (response) {
            swal.close();
            if (validar_json(angular.toJson(response.data))) {
              if (response.data.codigo == 0) {
                $scope.historial.detalle = -1;
                $scope.historial.estado_detalle = "";
                $scope.limpiar_detalle_solicitud();
                $scope.lista_solicitud_afiliacion();
                swal('Mensaje', response.data.mensaje, 'success');
                //CNVU
                setTimeout(function () {
                  swal.close();
                  $scope.$apply();
                }, 7000);
                //CNVU
              } else {
                swal('Mensaje', response.data.mensaje, 'warning');
              }
            } else {
              swal('Mensaje', 'Error al intentar aprobar la solicitud #' + $scope.historial.detalle, 'error');
            }
          });
        }
      }).catch(swal.noop);
    } else {
      swal('Mensaje', 'Error al intentar aprobar la solicitud #' + $scope.historial.detalle, 'error');
    }
  }

  // Paginacion
  $scope.currentPage = 0;
  $scope.pageSize = 10;
  $scope.q = "";
  $scope.getData = function () {
    // if ($scope.medicamentos.orden != "") {
    //   return $filter('filter')($filter('orderBy')($scope.historial.listado, 'RADICADO'), $scope.q);
    // } else {
      return $filter('filter')($scope.historial.listado, $scope.q);
    // }
  }
  $scope.numberOfPages = function () {
    return Math.ceil($scope.getData().length / $scope.pageSize);
  }
  $scope.$watch('q', function (newValue, oldValue) {
    if (oldValue != newValue) {
      $scope.currentPage = 0;
    }
  }, true);
  $scope.btns_paginacion = function (value) {
    $scope.currentPage = value;
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  // ------------------------------------------------------------------------------------------------------------- tab.2
  $scope.afiliacion = {
    condicion: "",
    options_condicion: new Array(),
    tipo_cotizante: "",
    options_tipo_cotizante: new Array(),
    vista_aportante: false,
    tipo_documento_aportante_v: "",
    options_tipo_documento_2: new Array(),
    numero_documento_aportante_v: "",
    nombre_aportante: "",
    // tipo_documento_aportante: "",
    // numero_documento_aportante: "",
    direccion_aportante: "",
    telefono_aportante: "",
    correo_aportante: "",
    departamento_aportante: "",
    options_departamento_aportante: new Array(),
    municipio_aportante: "",
    options_municipio_aportante: new Array(),
    tipo_documento: "",
    options_tipo_documento: new Array(),
    numero_documento: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    fecha_nacimiento: "",
    sexo: "",
    estado_civil_cotizante: "",
    options_estado_civil_cotizante: new Array(),
    departamento_cotizante: "",
    options_departamento_cotizante: new Array(),
    municipio_cotizante: "",
    options_municipio_cotizante: new Array(),
    direccion_cotizante: "",
    barrio_cotizante: "",
    zona_cotizante: "",
    telefono_f_cotizante: "",
    telefono_c_cotizante: "",
    correo_cotizante: "",
    ips_atencion: "",
    options_ips_atencion: new Array(),
    penciones_afp: "",
    options_penciones_afp: new Array(),
    riesgos_laborales_arl: "",
    options_riesgos_laborales_arl: new Array(),
    salario_basico_mensual: 0,
    fecha_ingreso: "",
    vista_beneficiario: "NO",
    actividad: "",
    options_actividad: new Array(),
    tipo_documento_beneficiario: "",
    numero_documento_beneficiario: "",
    primer_nombre_beneficiario: "",
    segundo_nombre_beneficiario: "",
    primer_apellido_beneficiario: "",
    segundo_apellido_beneficiario: "",
    fecha_nacimiento_beneficiario: "",
    sexo_beneficiario: "",
    parentesco: "",
    options_parentesco: new Array(),
    eps_anterior: "",
    options_eps_anterior: new Array(),
    ubicacion_beneficiario: "",
    departamento_beneficiario: "",
    options_departamento_beneficiario: new Array(),
    municipio_beneficiario: "",
    options_municipio_beneficiario: new Array(),
    direccion_beneficiario: "",
    barrio_beneficiario: "",
    zona_beneficiario: "",
    telefono_f_beneficiario: "",
    telefono_c_beneficiario: "",
    correo_beneficiario: "",
    ips_atencion_beneficiario: "",
    options_ips_atencion_beneficiario: new Array(),
    listado_beneficiarios: new Array(),
    listado_soportes: new Array(),
    listado_soportes_beneficiarios: [],
    accion_beneficiario: "I",
    fecha_sgsss: "",
    hde_fecha_sgsss: false,
    paquete: 0,
    paquete_beneficiario: 0,
    validacion_1: 0,
    validacion_2: 0,
    validacion_3: 0,
    validacion_4: 0
  }
  setTimeout(() => {
    $scope.$apply();
  }, 100);
  $scope.lista_condicion = function () {
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'lista_condicion'
      }
    }).then(function (response) {
      $scope.afiliacion.condicion = "";
      if (validar_json(angular.toJson(response.data))) {
        $scope.afiliacion.options_condicion = response.data;
      } else {
        $scope.afiliacion.options_condicion = new Array();
        swal('Mensaje', 'No se obtuvo resultados para el lista_condicion', 'info');
      }
    });
  }
  $scope.lista_condicion();
  $scope.lista_tipo_cotizante = function (condicion) {
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'lista_tipo_cotizante',
        condicion: condicion
      }
    }).then(function (response) {
      $scope.afiliacion.tipo_cotizante = "";
      if (validar_json(angular.toJson(response.data))) {
        $scope.afiliacion.options_tipo_cotizante = response.data;
      } else {
        $scope.afiliacion.options_tipo_cotizante = new Array();
        swal('Mensaje', 'No se obtuvo resultados para el lista_tipo_cotizante', 'info');
      }
    });
    if ($scope.afiliacion.condicion == 'E' || $scope.afiliacion.condicion == 'P') {
      $scope.afiliacion.vista_aportante = true;
      $scope.lista_arl();
    } else {
      $scope.afiliacion.vista_aportante = false;
      $scope.lista_arl();
    }
    if ($scope.afiliacion.condicion == 'I') {
      $scope.lista_actividad();
    }
  }
  $scope.lista_tipo_cotizante_change = function (tipo_cotizante) {
    $scope.afiliacion.paquete = "";
    $scope.codigo_tipo_cotizante = tipo_cotizante.split("-")[0].trim();
    var codigo_tipo_cotizante = tipo_cotizante.split("-")[0].trim();
    if (codigo_tipo_cotizante != "") {
      var i = $scope.afiliacion.options_tipo_cotizante.findIndex(elemt => elemt.codigo == codigo_tipo_cotizante);
      if (i != -1) {
        if ($scope.afiliacion.options_tipo_cotizante[i].paquete != null && $scope.afiliacion.options_tipo_cotizante[i].paquete != "") {
          $scope.afiliacion.paquete = $scope.afiliacion.options_tipo_cotizante[i].paquete;
        }
        console.log($scope.afiliacion.options_tipo_cotizante[i]);
      }
    }
  }
  consultaHTTP.obtenerDocumento().then(function (response) {
    let arra_temp = new Array();
    response.Documento.forEach(element => {
      if (element.Codigo != "") {
        arra_temp.push(element);
      }
    });
    $scope.afiliacion.options_tipo_documento = arra_temp;
    $scope.afiliacion.tipo_documento = "CC";
  });
  consultaHTTP.obtenerTipoDocumento().then(function (response) {
    $scope.afiliacion.options_tipo_documento_2 = response;
  });
  $scope.generar_direccion = function (varible, objeto, next = "") {
    ngDialog.open({
      template: 'views/movilidad/modal/modal_direccion.html',
      className: 'ngdialog-theme-plain',
      controller: 'modaldireccioncontroller',
      className: 'ngdialog-theme-plain',
      scope: $scope
    }).closePromise.then(function (data) { //Respuesta del valor registrado en modal de direccion                
      if (data.value != '$closeButton' && data.value != '$escape' && data.value != '$document' && data.value.direccionModal != '') { //Valida que la direccion nunca se asigne vacia
        $scope[varible][objeto] = data.value.direccionModal;
        $scope.formatcurrency(6);
        if (next != "") {
          document.querySelector('[name="' + next + '"]').focus();
        }
        // if($scope.formatcurrency(6)){
          
        // }else{
        //   //document.querySelector('[name="' + next + '"]').focus();
        //   document.querySelector("#" + varible + "_" + objeto).focus();
        // } 
      }
    });
  }
  $scope.buscar_aportante = function () {
    if ($scope.afiliacion.numero_documento_aportante_v != undefined && $scope.afiliacion.tipo_documento_aportante_v != undefined && $scope.afiliacion.numero_documento_aportante_v != "" && $scope.afiliacion.tipo_documento_aportante_v != "") {
      if (($scope.afiliacion.tipo_documento_aportante_v != 'PE' && $scope.afiliacion.numero_documento_aportante_v.toString().length <= 10)
      || ($scope.afiliacion.tipo_documento_aportante_v == 'PE' && $scope.afiliacion.numero_documento_aportante_v.toString().length == 15)) {
        if ($scope.afiliacion.numero_documento != $scope.afiliacion.numero_documento_aportante_v) {
          if ($scope.afiliacion.numero_documento_beneficiario != $scope.afiliacion.numero_documento_aportante_v) {
            // swal({
            //   title: 'Validación 3',
            //   text: "La relación laboral ya existe",
            //   html: '<table class="striped table-bordered white"><thead><tr><th>#</th><th>tipo</th><th class="center-align">Vista previa</th></tr></thead>' +
            //     '<tbody><tr><td colspan="3">No hay soportes para mostrar.</td></tr></tbody></table>',
            //   type: 'question',
            //   showCancelButton: true,
            //   confirmButtonColor: '#3085d6',
            //   cancelButtonColor: '#d33',
            //   confirmButtonText: 'Solicitud de conciliación',
            //   cancelButtonText: 'Cancelar solicitud'
            // }).then(function (result2) {
            //   if (result2) {
            //     swal({
            //       title: 'Actualizar el numero de contacto',
            //       input: 'number',
            //       // inputOptions: options,
            //       inputPlaceholder: 'Numero de contacto (OPCIONAL)',
            //       showCancelButton: true,
            //       inputValidator: function (value) {
            //         return new Promise(function (resolve, reject) {
            //           if (value == '' || !$scope.validar(3, value)) {
            //             resolve();
            //           } else {
            //             reject('Numero no valido');
            //           }
            //         });
            //       },
            //       showCancelButton: true,
            //       confirmButtonColor: '#3085d6',
            //       cancelButtonColor: '#d33',
            //       confirmButtonText: 'Aceptar',
            //       cancelButtonText: 'Cancelar'
            //     }).then(function (result3) {
            //       if (result3) {
            //         console.log("Enviar peticion pendiente", result3);
            //       }
            //       $scope.afiliacion.validacion_3 = 0;
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });
            $http({
              method: 'POST',
              url: "php/movilidad/afiliacion_linea.php",
              data: {
                function: 'lista_info_aportante',
                tipo_documento: $scope.afiliacion.tipo_documento_aportante_v,
                documento: $scope.afiliacion.numero_documento_aportante_v
              }
            }).then(function (response) {
              swal.close();
              $scope.limpiar_datos_aportante();
              if (validar_json(angular.toJson(response.data))) {
                //if (response.data.hasOwnProperty("info_empresa")) {
                $scope.afiliacion.nombre_aportante = response.data[0].RAZON_SOCIAL;
                $scope.afiliacion.direccion_aportante = response.data[0].DIRECCION;
                $scope.afiliacion.departamento_aportante = response.data[0].DEPARTAMENTO;
                $scope.afiliacion.municipio_aportante = response.data[0].MUNICIPIO;
                $scope.afiliacion.telefono_aportante = Number(response.data[0].CELULAR_RESPONSABLE);
                $scope.afiliacion.correo_aportante = response.data[0].CORREO;
                document.querySelector("#afiliacion_tipo_documento").focus();
                // } else {
                //   swal('Mensaje', 'Error al obtener los resultados para el aportante: ' + $scope.afiliacion.tipo_documento_aportante_v + '-' + $scope.afiliacion.numero_documento_aportante_v, 'error');
                // }
              } else {
                swal('Mensaje', 'No se encontro el aportante: ' + $scope.afiliacion.tipo_documento_aportante_v + '-' + $scope.afiliacion.numero_documento_aportante_v + '<br><br> Por favor validar que exista o que este en estado procesada para realizar satisfactoriamente la afiliación.', 'info');
              }
            });
            //     }).catch(swal.noop);
            //   }
            // }).catch(swal.noop);
          } else {
            swal('Advertencia', 'El numero de documento del aportante no puede ser igual al del beneficiario', 'warning');
          }
        } else {
          swal('Advertencia', 'El numero de documento del aportante no puede ser igual al del cotizante', 'warning');
        }
      } else {
        swal('Advertencia', 'Digite de manera correcta el Documento del Cotizante según Tipo de Documento elegido.', 'warning');
      }
    } else {
      swal('Advertencia', 'Ingrese el tipo y numero de documento del aportante', 'warning');
    }
  }
  $scope.validadion_2 = function () {
    // swal({
    //   html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
    //   width: 200,
    //   allowOutsideClick: false,
    //   allowEscapeKey: false,
    //   showConfirmButton: false,
    //   animation: false
    // });
    var fecha_ingreso = $("#afiliacion_fecha_ingreso").val().split("-");

    var newdatefechaingreso = new Date(fecha_ingreso[0], (fecha_ingreso[1] - 1), fecha_ingreso[2]);
    var timeinputfechaingreso = newdatefechaingreso.getTime();

    var fecha_actual = new Date();
    var time_actual = fecha_actual.getTime();

    if (timeinputfechaingreso > time_actual) {
      swal({
        title: '¡Información!',
        text: 'La fecha de ingreso no puede ser mayor a la fecha de hoy.',
        type: 'info',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#174791'
      });
    } else {
      $http({
        method: 'POST',
        url: "php/movilidad/afiliacion_linea.php",
        data: {
          function: 'valida_salario',
          f_ingreso: $scope.format_date(1, $scope.afiliacion.fecha_ingreso),
          salario: $scope.afiliacion.salario_basico_mensual.replace(/[^\d]*/g, ''),
          tipo_cotizante: $scope.codigo_tipo_cotizante
        }
      }).then(function (response) {
        if (validar_json(angular.toJson(response.data))) {
          if (response.data.codigo == 0) {
            $http({
              method: 'POST',
              url: "php/movilidad/afiliacion_linea.php",
              data: {
                function: 'valida_afiliacion',
                validacion: 2,
                tipo_documento: $scope.afiliacion.tipo_documento,
                documento: $scope.afiliacion.numero_documento,
                f_ingreso: $scope.format_date(1, $scope.afiliacion.fecha_ingreso),
                tipo_doc_aportante: $scope.afiliacion.tipo_documento_aportante_v,
                doc_aportante: $scope.afiliacion.numero_documento_aportante_v
              }
            }).then(function (response1) {
              if (validar_json(angular.toJson(response1.data))) {
                if (response1.data.codigo == 1) {
                  swal({
                    title: 'Advertencia',
                    text: response1.data.mensaje,
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Verificar afiliación',
                    cancelButtonText: 'Cancelar solicitud'
                  }).then(function (result) {
                    if (result) {
                      $scope.afiliacion.validacion_2 = 0;
                      $http({
                        method: 'POST',
                        url: "php/movilidad/afiliacion_linea.php",
                        data: {
                          function: 'comprobar_afiliacion',
                          documento: $scope.afiliacion.numero_documento,
                          f_ingreso: $scope.format_date(1, $scope.afiliacion.fecha_ingreso),
                          doc_aportante: $scope.afiliacion.numero_documento_aportante_v
                        }
                      }).then(function (response2) {
                  //swal.close();
                  if (validar_json(angular.toJson(response2.data))) {
                    if (response2.data.codigo == 1) {
                      swal('Mensaje', response2.data.mensaje, 'error');
                      // setTimeout(function () {
                      //   swal.close();
                      //   $scope.$apply();
                      // }, 7000);
                    } else {
                      swal('Mensaje', response2.data.mensaje, 'success');
                      // setTimeout(function () {
                      //   swal.close();
                      //   $scope.$apply();
                      // }, 7000);
                    }
                  } else {
                    swal('Mensaje', 'No se obtuvo resultados para (comprobar_afiliacion)', 'error');
                  }
                  });
                    }
                  }).catch(swal.noop);
                  $scope.afiliacion.validacion_2 = 0;
                } 
                // else {
                //   swal.close();
                // }
              } else {
                $scope.afiliacion.validacion_2 = 1;
                swal('Mensaje', 'No se obtuvo resultados para (valida_afiliacion:2)', 'error');
              }
            });
          }else{
            swal('Mensaje', response.data.mensaje, 'warning');
            // setTimeout(function () {
            //   swal.close();
            //   $scope.$apply();
            // }, 7000);
          }
        } else {
          swal('Mensaje', 'No se obtuvo resultados para (valida_salario).', 'error');
        }
      });
    }
  }
  $scope.limpiar_datos_aportante = function () {
    // $scope.afiliacion.tipo_documento_aportante_v = "";
    // $scope.afiliacion.numero_documento_aportante_v = "";
    $scope.afiliacion.nombre_aportante = "";
    $scope.afiliacion.direccion_aportante = "";
    $scope.afiliacion.telefono_aportante = "";
    $scope.afiliacion.correo_aportante = "";
    $scope.afiliacion.departamento_aportante = "";
    $scope.afiliacion.municipio_aportante = "";
  }
  $scope.lista_departamento = function () {
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'lista_departamento',
        coincidencia: ''
      }
    }).then(function (response) {
      if (validar_json(angular.toJson(response.data))) {
        $scope.afiliacion.options_departamento_aportante = response.data;
        $scope.afiliacion.options_departamento_cotizante = response.data;
        $scope.afiliacion.options_departamento_beneficiario = response.data;
      } else {
        $scope.afiliacion.options_departamento_aportante = new Array();
        $scope.afiliacion.options_departamento_cotizante = new Array();
        $scope.afiliacion.options_departamento_beneficiario = new Array();
        swal('Mensaje', 'No se obtuvo resultados para el lista_departamento', 'info');
      }
    });
  }
  $scope.lista_departamento();
  $scope.lista_municipio_change = function (departamento, options_municipio, select_municipio = "") {
    if (departamento != undefined && departamento != null && departamento != "") {
      var codigo = departamento.indexOf("-");
      if (codigo != -1) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        codigo = departamento.split("-")[0].trim();
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'lista_municipio',
            departamento: codigo,
            coincidencia: ''
          }
        }).then(function (response) {
          swal.close();
          if (select_municipio != "") {
            $scope.afiliacion[select_municipio] = "";
          }
          if (validar_json(angular.toJson(response.data))) {
            $scope.afiliacion[options_municipio] = response.data;
          } else {
            $scope.afiliacion[options_municipio] = new Array();
            swal('Mensaje', 'No se obtuvo resultados para el lista_municipio', 'info');
          }
        });
      }
    }
  }
  $scope.buscar_cotizante = function () {
    if ($scope.afiliacion.tipo_documento != undefined && $scope.afiliacion.numero_documento != undefined 
      && $scope.afiliacion.tipo_documento != "" && $scope.afiliacion.numero_documento != "") {
        if (($scope.afiliacion.tipo_documento != 'PE' && $scope.afiliacion.numero_documento.toString().length <= 10)
        || ($scope.afiliacion.tipo_documento == 'PE' && $scope.afiliacion.numero_documento.toString().length == 15)) {
          if ($scope.afiliacion.numero_documento_aportante_v != $scope.afiliacion.numero_documento) {
            if ($scope.afiliacion.numero_documento_beneficiario != $scope.afiliacion.numero_documento) {    
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              });
              $http({
                method: 'POST',
                url: "php/movilidad/afiliacion_linea.php",
                data: {
                  function: 'valida_periodos',
                  tipo_documento: $scope.afiliacion.tipo_documento,
                  documento: $scope.afiliacion.numero_documento
                }
              }).then(function (response4) {
                if (validar_json(angular.toJson(response4.data))) {
                  if (response4.data.codigo == 1) {
                    //notification.getNotification('info', response4.data.mensaje, 'Información');
                    setTimeout(function(){
                      swal({
                        title: "Información", 
                        text: response4.data.mensaje, 
                        showConfirmButton: true, 
                        type: "info", 
                        timer: 10000 
                      });
                    },800);
                  }
                }
              });
              $http({
                method: 'POST',
                url: "php/movilidad/afiliacion_linea.php",
                data: {
                  function: 'valida_afiliacion',
                  validacion: 1,
                  tipo_documento: $scope.afiliacion.tipo_documento,
                  documento: $scope.afiliacion.numero_documento,
                  f_ingreso: "",
                  tipo_doc_aportante: "",
                  doc_aportante: ""
                }
              }).then(function (response1) {
                if (validar_json(angular.toJson(response1.data))) {
                  if (response1.data.codigo == 1) {
                    $scope.afiliacion.validacion_1 = 1;
                    swal('Mensaje', response1.data.mensaje, 'warning');
                  } else if (response1.data.codigo == 0) {
                    $scope.afiliacion.validacion_1 = 0;
                    //CNVU
                    $http({
                      method: 'POST',
                      url: "php/movilidad/afiliacion_linea.php",
                      data: {
                        function: 'valida_afiliacion',
                        validacion: 3,
                        tipo_documento: $scope.afiliacion.tipo_documento,
                        documento: $scope.afiliacion.numero_documento,
                        f_ingreso: "",
                        tipo_doc_aportante: $scope.afiliacion.tipo_documento_aportante_v,
                        doc_aportante: $scope.afiliacion.numero_documento_aportante_v
                      }
                    }).then(function (response3) {
                      //CNVU
                      if (validar_json(angular.toJson(response3.data))) {
                        if (response3.data.codigo == 1) {
                          $scope.afiliacion.validacion_3 = 1;
                          swal('Mensaje', response3.data.mensaje, 'warning');
                        } else if (response3.data.codigo == 0) {
                          $scope.afiliacion.validacion_3 = 0;
                          $http({
                            method: 'POST',
                            url: "php/movilidad/afiliacion_linea.php",
                            data: {
                              function: 'valida_afiliacion',
                              validacion: 4,
                              tipo_documento: $scope.afiliacion.tipo_documento,
                              documento: $scope.afiliacion.numero_documento,
                              f_ingreso: "",
                              tipo_doc_aportante: "",
                              doc_aportante: ""
                            }
                          }).then(function (response2) {
                            if (validar_json(angular.toJson(response2.data))) {
                              if (response2.data.codigo == 1) {
                                $scope.afiliacion.validacion_4 = 1;
                                swal('Mensaje', response2.data.mensaje, 'warning');
                              } else if (response2.data.codigo == 0) {
                                $scope.afiliacion.validacion_4 = 0;
                                $http({
                                  method: 'POST',
                                  url: "php/movilidad/afiliacion_linea.php",
                                  data: {
                                    function: 'lista_datos_afiliado',
                                    tipo_doc: $scope.afiliacion.tipo_documento,
                                    documento: $scope.afiliacion.numero_documento
                                  }
                                }).then(function (response) {
                                  swal.close();
                                  $scope.limpiar_datos_cotizante();
                                  if (validar_json(angular.toJson(response.data)) && response.data.datos_basicos != null) {
                                    $scope.afiliacion.primer_nombre = response.data.datos_basicos.PRIMER_NOMBRE;
                                    $scope.afiliacion.segundo_nombre = response.data.datos_basicos.SEGUNDO_NOMBRE;
                                    $scope.afiliacion.primer_apellido = response.data.datos_basicos.PRIMER_APELLIDO;
                                    $scope.afiliacion.segundo_apellido = response.data.datos_basicos.SEGUNDO_APELLIDO;
                                    $scope.afiliacion.fecha_nacimiento = $scope.format_date(0, response.data.datos_basicos.FECHA_NACIMIENTO);
                                    $scope.afiliacion.sexo = response.data.datos_basicos.GENERO;
                                    $scope.afiliacion.barrio_cotizante = response.data.datos_basicos.BARRIO;
                                    $scope.afiliacion.direccion_cotizante = response.data.datos_basicos.DIRECCION;
                                    $scope.afiliacion.telefono_f_cotizante = parseInt(response.data.datos_basicos.TELEFONO);
                                    $scope.afiliacion.telefono_c_cotizante = parseInt(response.data.datos_basicos.CELULAR);
                                    $scope.afiliacion.correo_cotizante = response.data.datos_basicos.CORREO;
                                    $scope.afiliacion.zona_cotizante = response.data.datos_basicos.ZONA;
                                    document.querySelector("#afiliacion_estado_civil_cotizante").focus();
                                  } else {
                                    swal('Mensaje', 'No se obtuvo resultados para el cotizante: ' + $scope.afiliacion.tipo_documento + '-' + $scope.afiliacion.numero_documento, 'info');
                                  }
                                });
                              } else {
                                $scope.afiliacion.validacion_4 = 1;
                                swal('Mensaje', 'No se obtuvo resultados valido para el (valida_afiliacion:4)', 'warning');
                              }
                            } else {
                              $scope.afiliacion.validacion_4 = 1;
                              swal('Mensaje', 'No se obtuvo resultados para (valida_afiliacion:4)', 'error');
                            }
                          });
                        }
                      } else {
                        $scope.afiliacion.validacion_3 = 1;
                        swal('Mensaje', 'No se obtuvo resultados para (valida_afiliacion:3)', 'error');
                      }
                    });
                  } else {
                    $scope.afiliacion.validacion_1 = 1;
                    swal('Mensaje', 'No se obtuvo resultados valido para el (valida_afiliacion:1)', 'warning');
                  }
                } else {
                  $scope.afiliacion.validacion_1 = 1;
                  swal('Mensaje', 'No se obtuvo resultados para (valida_afiliacion:1)', 'error');
                }
              });
            } else {
              swal('Advertencia', 'El numero de documento del cotizante no puede ser igual al del beneficiario', 'warning');
            }
          } else {
            swal('Advertencia', 'El numero de documento del cotizante no puede ser igual al del aportante', 'warning');
          }
        } else {
          swal('Advertencia', 'Digite de manera correcta el Documento del Cotizante según Tipo de Documento elegido.', 'warning');
        }
    } else {
      swal('Advertencia', 'Ingrese los campos (tipo_documento, numero_documento)', 'warning');
    }
  }
$scope.limpiar_datos_cotizante = function () {
    // $scope.afiliacion.tipo_documento = "";
    // $scope.afiliacion.numero_documento = "";
    $scope.afiliacion.primer_nombre = "";
    $scope.afiliacion.segundo_nombre = "";
    $scope.afiliacion.primer_apellido = "";
    $scope.afiliacion.segundo_apellido = "";
    $scope.afiliacion.fecha_nacimiento = "";
    $scope.afiliacion.sexo = "";
    $scope.afiliacion.estado_civil_cotizante = "";
    $scope.afiliacion.departamento_cotizante = "";
    $scope.afiliacion.municipio_cotizante = "";
    $scope.afiliacion.direccion_cotizante = "";
    $scope.afiliacion.barrio_cotizante = "";
    $scope.afiliacion.zona_cotizante = "";
    $scope.afiliacion.telefono_f_cotizante = "";
    $scope.afiliacion.telefono_c_cotizante = "";
    $scope.afiliacion.correo_cotizante = "";
    $scope.afiliacion.ips_atencion = "";
    $scope.afiliacion.penciones_afp = "";
    $scope.afiliacion.riesgos_laborales_arl = "";
    $scope.afiliacion.salario_basico_mensual = "";
    $scope.afiliacion.fecha_ingreso = "";
    $scope.afiliacion.vista_beneficiario = "NO";
    $scope.afiliacion.listado_beneficiarios = new Array();
    $scope.afiliacion.listado_soportes = new Array();
    $scope.afiliacion.listado_soportes_beneficiarios = new Array();
  }
  $scope.lista_ips_change = function (var_ini, municipio, options_ips_aten, select_ips_atencion) {
    if (municipio != undefined) {
      var codigo = municipio.indexOf("-");
      if (codigo != -1) {
        codigo = municipio.split("-");
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'lista_ips',
            ubicacion: codigo[0].trim()
          }
        }).then(function (response) {
          swal.close();
          $scope[var_ini][select_ips_atencion] = "";
          if (validar_json(angular.toJson(response.data))) {
            $scope[var_ini][options_ips_aten] = response.data;
            $scope.validar_ips_atencion = response.data;
            // CNVU
            // if (select_ips_atencion == "ips_atencion_beneficiario") {
            //   $scope[var_ini][select_ips_atencion] = $scope.afiliacion.ips_atencion;
            // }else{
            //   $scope[var_ini][select_ips_atencion] = "";
            // }
            // CNVU
          } else {
            $scope[var_ini][options_ips_aten] = new Array();
            $scope.validar_ips_atencion = new Array();
            var str = codigo[(codigo.length - 1)];
            if (str.substring((str.length - 2), (str.length - 1)) == "N") {
              swal('Mensaje', 'Cajacopi no tiene cobertura para este municipio: ' + codigo[1] + ', al finalizar exitosamente la afiliacion se realizara una portatibilidad', 'info');
            } else {
              swal('Mensaje', 'No se obtuvo resultados para el lista_ips', 'info');
            }
          }
        });
      }
    }
  }
  $scope.lista_estado_civil = function () {
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'lista_estado_civil',
        coincidencia: ''
      }
    }).then(function (response) {
      $scope.afiliacion.estado_civil_cotizante = "";
      if (validar_json(angular.toJson(response.data))) {
        $scope.afiliacion.options_estado_civil_cotizante = response.data;
      } else {
        $scope.afiliacion.options_estado_civil_cotizante = new Array();
        swal('Mensaje', 'No se obtuvo resultados para el lista_estado_civil', 'info');
      }
    });
  }
  $scope.lista_estado_civil();
  $scope.lista_afp = function () {
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'lista_afp'
      }
    }).then(function (response) {
      $scope.afiliacion.penciones_afp = "";
      if (validar_json(angular.toJson(response.data))) {
        $scope.afiliacion.options_penciones_afp = response.data;
      } else {
        $scope.afiliacion.options_penciones_afp = new Array();
        swal('Mensaje', 'No se obtuvo resultados para el lista_afp', 'info');
      }
    });
  }
  $scope.lista_afp();
  $scope.lista_arl = function () {
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'lista_arl'
      }
    }).then(function (response) {
      $scope.afiliacion.riesgos_laborales_arl = "";
      if (validar_json(angular.toJson(response.data))) {
        $scope.afiliacion.options_riesgos_laborales_arl = response.data;
      } else {
        $scope.afiliacion.options_riesgos_laborales_arl = new Array();
        swal('Mensaje', 'No se obtuvo resultados para el lista_afp', 'info');
      }
    });
  }
  $scope.lista_arl();
  $scope.buscar_beneficiario = function () {
    if ($scope.afiliacion.tipo_documento_beneficiario != undefined && $scope.afiliacion.numero_documento_beneficiario != undefined && $scope.afiliacion.tipo_documento_beneficiario != "" && $scope.afiliacion.numero_documento_beneficiario != "") {
      if (($scope.afiliacion.tipo_documento_beneficiario != 'PE' && $scope.afiliacion.numero_documento_beneficiario.toString().length <= 10)
        || ($scope.afiliacion.tipo_documento_beneficiario == 'PE' && $scope.afiliacion.numero_documento_beneficiario.toString().length == 15)) {
        if ($scope.afiliacion.numero_documento != $scope.afiliacion.numero_documento_beneficiario) {
          if ($scope.afiliacion.numero_documento_aportante_v != $scope.afiliacion.numero_documento_beneficiario) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });
            $http({
              method: 'POST',
              url: "php/movilidad/afiliacion_linea.php",
              data: {
                function: 'lista_datos_afiliado',
                tipo_doc: $scope.afiliacion.tipo_documento_beneficiario,
                documento: $scope.afiliacion.numero_documento_beneficiario
              }
            }).then(function (response) {
              swal.close();
              $scope.limpiar_datos_beneficiario();
              if (validar_json(angular.toJson(response.data)) && response.data.datos_basicos != null) {
                $scope.afiliacion.primer_nombre_beneficiario = response.data.datos_basicos.PRIMER_NOMBRE;
                $scope.afiliacion.segundo_nombre_beneficiario = response.data.datos_basicos.SEGUNDO_NOMBRE;
                $scope.afiliacion.primer_apellido_beneficiario = response.data.datos_basicos.PRIMER_APELLIDO;
                $scope.afiliacion.segundo_apellido_beneficiario = response.data.datos_basicos.SEGUNDO_APELLIDO;
                $scope.afiliacion.fecha_nacimiento_beneficiario = $scope.format_date(0, response.data.datos_basicos.FECHA_NACIMIENTO);
                $scope.afiliacion.sexo_beneficiario = response.data.datos_basicos.GENERO;
                $scope.afiliacion.direccion_beneficiario = response.data.datos_basicos.DIRECCION;
                $scope.afiliacion.barrio_beneficiario = response.data.datos_basicos.BARRIO;
                $scope.afiliacion.telefono_f_beneficiario = parseInt(response.data.datos_basicos.TELEFONO);
                $scope.afiliacion.telefono_c_beneficiario = parseInt(response.data.datos_basicos.CELULAR);
                $scope.afiliacion.correo_beneficiario = response.data.datos_basicos.CORREO;
                $scope.afiliacion.zona_beneficiario = response.data.datos_basicos.ZONA;
                document.querySelector("#SI_U_2").focus();
                $scope.afiliacion.hde_fecha_sgsss = false;
              } else {
                // CNVU
                swal('Mensaje', 'No se obtuvo resultados para el beneficiario: <br>' 
                  + $scope.afiliacion.tipo_documento_beneficiario + '-' + $scope.afiliacion.numero_documento_beneficiario +'<br>Diligencie los campos manualmente', 'info').then(function (result) {
                    if (result) {
                      document.querySelector("#afiliacion_primer_nombre_beneficiario").focus();
                    };
                  }).catch(swal.noop);
                  $scope.afiliacion.hde_fecha_sgsss = true;
                // CNVU
              }
            });
          } else {
            swal('Advertencia', 'El numero de documento del beneficiario no puede ser igual al del aportante', 'warning');
          }
        } else {
          swal('Advertencia', 'El numero de documento del beneficiario no puede ser igual al del cotizante', 'warning');
        }
      } else {
        swal('Advertencia', 'Digite de manera correcta el Documento del Cotizante según Tipo de Documento elegido.', 'warning');
      }
    } else {
      swal('Advertencia', 'Ingrese los campos (tipo_documento_beneficiario, numero_documento_beneficiario)', 'warning');
    }
  }
  $scope.limpiar_datos_beneficiario_all = function () {
    $scope.afiliacion.tipo_documento_beneficiario = "";
    $scope.afiliacion.numero_documento_beneficiario = "";
    $scope.afiliacion.primer_nombre_beneficiario = "";
    $scope.afiliacion.segundo_nombre_beneficiario = "";
    $scope.afiliacion.primer_apellido_beneficiario = "";
    $scope.afiliacion.segundo_apellido_beneficiario = "";
    $scope.afiliacion.fecha_nacimiento_beneficiario = "";
    $scope.afiliacion.sexo_beneficiario = "";
    $scope.afiliacion.parentesco = "";
    $scope.afiliacion.eps_anterior = "";
    $scope.afiliacion.ubicacion_beneficiario = "";
    $scope.afiliacion.departamento_beneficiario = "";
    $scope.afiliacion.municipio_beneficiario = "";
    $scope.afiliacion.direccion_beneficiario = "";
    $scope.afiliacion.zona_beneficiario = "";
    $scope.afiliacion.telefono_f_beneficiario = "";
    $scope.afiliacion.telefono_c_beneficiario = "";
    $scope.afiliacion.correo_beneficiario = "";
    $scope.afiliacion.ips_atencion_beneficiario = "";
  }
  $scope.limpiar_datos_beneficiario = function () {
    // $scope.afiliacion.tipo_documento_beneficiario = "";
    // $scope.afiliacion.numero_documento_beneficiario = "";
    $scope.afiliacion.primer_nombre_beneficiario = "";
    $scope.afiliacion.segundo_nombre_beneficiario = "";
    $scope.afiliacion.primer_apellido_beneficiario = "";
    $scope.afiliacion.segundo_apellido_beneficiario = "";
    $scope.afiliacion.fecha_nacimiento_beneficiario = "";
    $scope.afiliacion.sexo_beneficiario = "";
    $scope.afiliacion.parentesco = "";
    $scope.afiliacion.eps_anterior = "";
    $scope.afiliacion.ubicacion_beneficiario = "";
    $scope.afiliacion.departamento_beneficiario = "";
    $scope.afiliacion.municipio_beneficiario = "";
    $scope.afiliacion.direccion_beneficiario = "";
    $scope.afiliacion.barrio_beneficiario = "";
    $scope.afiliacion.zona_beneficiario = "";
    $scope.afiliacion.telefono_f_beneficiario = "";
    $scope.afiliacion.telefono_c_beneficiario = "";
    $scope.afiliacion.correo_beneficiario = "";
    $scope.afiliacion.ips_atencion_beneficiario = "";
    $scope.afiliacion.fecha_sgsss = "";
  }
  $scope.lista_parentesco = function () {
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'lista_parentezco'
      }
    }).then(function (response) {
      $scope.afiliacion.parentesco = "";
      if (validar_json(angular.toJson(response.data))) {
        $scope.afiliacion.options_parentesco = response.data;
      } else {
        $scope.afiliacion.options_parentesco = new Array();
        swal('Mensaje', 'No se obtuvo resultados para el lista_afp', 'info');
      }
    });
  }
  $scope.lista_parentesco();
  $scope.lista_parentesco_change = function (parentesco) {
    $scope.afiliacion.paquete_beneficiario = "";
    var codigo_parentesco = parentesco.split("-")[0].trim();
    if (codigo_parentesco != "") {
      var i = $scope.afiliacion.options_parentesco.findIndex(elemt => elemt.CODIGO == codigo_parentesco);
      if (i != -1) {
        if ($scope.afiliacion.options_parentesco[i].PAQUETE != null && $scope.afiliacion.options_parentesco[i].PAQUETE != "") {
          $scope.afiliacion.paquete_beneficiario = $scope.afiliacion.options_parentesco[i].PAQUETE;
        }
        console.log($scope.afiliacion.options_parentesco[i]);
      }
    }
  }
  $scope.lista_eps = function () {
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'lista_eps',
        coincidencia: ""
      }
    }).then(function (response) {
      $scope.afiliacion.eps_anterior = "";
      if (validar_json(angular.toJson(response.data))) {
        $scope.afiliacion.options_eps_anterior = response.data;
      } else {
        $scope.afiliacion.options_eps_anterior = new Array();
        swal('Mensaje', 'No se obtuvo resultados para el lista_eps', 'info');
      }
    });
  }
  $scope.lista_eps();
  $scope.ubicacion_beneficiario = function (value) {
    if (value == "SI") {
      $scope.afiliacion.departamento_beneficiario = $scope.afiliacion.departamento_cotizante;
      document.querySelector("#afiliacion_departamento_beneficiario").value = $scope.afiliacion.departamento_cotizante;
      $scope.afiliacion.municipio_beneficiario = $scope.afiliacion.municipio_cotizante;
      document.querySelector("#afiliacion_municipio_beneficiario").value = $scope.afiliacion.municipio_cotizante;
      $scope.afiliacion.direccion_beneficiario = $scope.afiliacion.direccion_cotizante;
      $scope.afiliacion.zona_beneficiario = $scope.afiliacion.zona_cotizante;
      $scope.afiliacion.telefono_f_beneficiario = $scope.afiliacion.telefono_f_cotizante;
      $scope.afiliacion.telefono_c_beneficiario = $scope.afiliacion.telefono_c_cotizante;
      $scope.afiliacion.correo_beneficiario = $scope.afiliacion.correo_cotizante;
      $scope.lista_municipio_change($scope.afiliacion.departamento_beneficiario, 'options_municipio_beneficiario', '');
      $scope.lista_ips_change('afiliacion', $scope.afiliacion.municipio_beneficiario, 'options_ips_atencion_beneficiario', 'ips_atencion_beneficiario');
      $scope.afiliacion.barrio_beneficiario = $scope.afiliacion.barrio_cotizante;
      //CNVU
      setTimeout(() => {
        $scope.afiliacion.ips_atencion_beneficiario = $scope.afiliacion.ips_atencion;
        document.querySelector('[name=afiliacion_eps_anterior]').focus();
        $scope.$apply();
      }, 1000);
    } else if (value == "NO") {
      $scope.afiliacion.departamento_beneficiario = "";
      $scope.afiliacion.municipio_beneficiario = "";
      $scope.afiliacion.direccion_beneficiario = "";
      $scope.afiliacion.zona_beneficiario = "";
      $scope.afiliacion.ips_atencion_beneficiario = "";
      // CNVU
      $scope.afiliacion.telefono_f_beneficiario = "";
      $scope.afiliacion.telefono_c_beneficiario = "";
      $scope.afiliacion.correo_beneficiario = "";
      $scope.afiliacion.barrio_beneficiario = "";
      setTimeout(() => {
        document.querySelector("#afiliacion_direccion_beneficiario").focus();
        $scope.$apply();
      }, 300);
    }
  }
  $scope.ubicacion_beneficiario_inclusion = function (value) {
    if (value == "SI") {
      $scope.afi_beneficiarios.departamento_beneficiario = $scope.afi_beneficiarios.departamento_nombre;
      document.querySelector("#afi_beneficiarios_departamento_beneficiario").value = $scope.afi_beneficiarios.departamento_nombre;
      $scope.afi_beneficiarios.municipio_beneficiario = $scope.afi_beneficiarios.municipio_nombre;
      document.querySelector("#afiliacion_municipio_beneficiario").value = $scope.afi_beneficiarios.municipio_nombre;
      $scope.afi_beneficiarios.direccion_beneficiario = $scope.afi_beneficiarios.direccion_cotizante;
      $scope.afi_beneficiarios.zona_beneficiario = $scope.afi_beneficiarios.zona_cotizante;
      $scope.afi_beneficiarios.telefono_f_beneficiario = $scope.afi_beneficiarios.telefono_f_cotizante;
      $scope.afi_beneficiarios.telefono_c_beneficiario = $scope.afi_beneficiarios.telefono_c_cotizante;
      $scope.afi_beneficiarios.correo_beneficiario = $scope.afi_beneficiarios.correo_cotizante;
      $scope.lista_municipio_change($scope.afi_beneficiarios.departamento_beneficiario, 'options_municipio_beneficiario', '');
      $scope.lista_ips_change('afiliacion', $scope.afi_beneficiarios.municipio_beneficiario, 'options_ips_atencion_beneficiario', 'ips_atencion_beneficiario');
      $scope.afi_beneficiarios.barrio_beneficiario = $scope.afi_beneficiarios.barrio_cotizante;
      //CNVU
      setTimeout(() => {
        $scope.afiliacion.ips_atencion_beneficiario = $scope.afiliacion.ips_atencion;
        document.querySelector('[name=afiliacion_eps_anterior]').focus();
        $scope.$apply();
      }, 1000);
    } else if (value == "NO") {
      $scope.afi_beneficiarios.departamento_beneficiario = "";
      $scope.afi_beneficiarios.municipio_beneficiario = "";
      $scope.afi_beneficiarios.direccion_beneficiario = "";
      $scope.afi_beneficiarios.zona_beneficiario = "";
      $scope.afi_beneficiarios.ips_atencion_beneficiario = "";
      // CNVU
      $scope.afi_beneficiarios.telefono_f_beneficiario = "";
      $scope.afi_beneficiarios.telefono_c_beneficiario = "";
      $scope.afi_beneficiarios.correo_beneficiario = "";
      $scope.afi_beneficiarios.barrio_beneficiario = "";
      setTimeout(() => {
        document.querySelector("#afiliacion_direccion_beneficiario").focus();
        $scope.$apply();
      }, 300);
    }
  }
  var parentesco = true;
  $scope.incluir_beneficiario = function () {
    if ($scope.afiliacion.listado_beneficiarios.length <= 5) {
      if ($scope.afiliacion.tipo_documento_beneficiario != "" && $scope.afiliacion.tipo_documento_beneficiario != undefined && $scope.afiliacion.tipo_documento_beneficiario != null) {
        if ($scope.afiliacion.numero_documento_beneficiario != "" && $scope.afiliacion.numero_documento_beneficiario != undefined && $scope.afiliacion.numero_documento_beneficiario != null) {
          if ($scope.afiliacion.primer_nombre_beneficiario != "" && $scope.afiliacion.primer_nombre_beneficiario != undefined && $scope.afiliacion.primer_nombre_beneficiario != null) {
            if ($scope.afiliacion.primer_apellido_beneficiario != "" && $scope.afiliacion.primer_apellido_beneficiario != undefined && $scope.afiliacion.primer_apellido_beneficiario != null) {
                if ($scope.afiliacion.fecha_nacimiento_beneficiario != "" && $scope.afiliacion.fecha_nacimiento_beneficiario != undefined && $scope.afiliacion.fecha_nacimiento_beneficiario != null) {
                  if ($scope.afiliacion.sexo_beneficiario != "" && $scope.afiliacion.sexo_beneficiario != undefined && $scope.afiliacion.sexo_beneficiario != null) {
                    if ($scope.afiliacion.direccion_beneficiario != "" && $scope.afiliacion.direccion_beneficiario != undefined && $scope.afiliacion.direccion_beneficiario != null) {
                      if ($scope.afiliacion.barrio_beneficiario != "" && $scope.afiliacion.barrio_beneficiario != undefined && $scope.afiliacion.barrio_beneficiario != null) {
                      if ($scope.afiliacion.departamento_beneficiario != "" && $scope.afiliacion.departamento_beneficiario != undefined && $scope.afiliacion.departamento_beneficiario != null) {
                      if ($scope.afiliacion.municipio_beneficiario != "" && $scope.afiliacion.municipio_beneficiario != undefined && $scope.afiliacion.municipio_beneficiario != null) {
                        if ($scope.afiliacion.zona_beneficiario != "" && $scope.afiliacion.zona_beneficiario != undefined && $scope.afiliacion.zona_beneficiario != null) {
                          if ($scope.afiliacion.ips_atencion_beneficiario != "" && $scope.afiliacion.ips_atencion_beneficiario != undefined && $scope.afiliacion.ips_atencion_beneficiario != null) {
                            if ($scope.afiliacion.telefono_c_beneficiario != "" && $scope.afiliacion.telefono_c_beneficiario != undefined && $scope.afiliacion.telefono_c_beneficiario != null) {
                              //if ($scope.afiliacion.correo_beneficiario != "" && $scope.afiliacion.correo_beneficiario != undefined && $scope.afiliacion.correo_beneficiario != null) {
                                if ($scope.afiliacion.eps_anterior != "" && $scope.afiliacion.eps_anterior != undefined && $scope.afiliacion.eps_anterior != null) {
                                  if ($scope.afiliacion.parentesco != "" && $scope.afiliacion.parentesco != undefined && $scope.afiliacion.parentesco != null) {
                                    let i = $scope.afiliacion.listado_beneficiarios.findIndex(elemt => elemt.documento == $scope.afiliacion.numero_documento_beneficiario);
                                    if (i == -1) {
                                      if ($scope.afiliacion.numero_documento != $scope.afiliacion.numero_documento_beneficiario) {
                                        if ($scope.afiliacion.numero_documento_aportante_v != $scope.afiliacion.numero_documento_beneficiario) {
                                          if ($scope.afiliacion.parentesco.slice(0,2) == "HI") {
                                            let l = $scope.afiliacion.listado_beneficiarios.findIndex(elemt => elemt.parentesco == "PA");
                                            if (l == -1) {
                                              parentesco = true;
                                            } else {
                                              parentesco = false;
                                              swal('Advertencia', 'No puede ingresar un Hijo en el parentesco ya que previamente ingreso un Padre en la lista de beneficiarios', 'warning');
                                            }
                                          } else if ($scope.afiliacion.parentesco.slice(0,2) == "PA") {
                                            let r = $scope.afiliacion.listado_beneficiarios.findIndex(elemt => elemt.parentesco == "HI");
                                            if (r == -1) {
                                              parentesco = true;
                                            } else {
                                              parentesco = false;
                                              swal('Advertencia', 'No puede ingresar un Padre en el parentesco ya que previamente ingreso un Hijo en la lista de beneficiarios', 'warning');
                                            }
                                          } else {
                                            parentesco = true;
                                          }
                                          if (parentesco) {
                                            var dep_beneficiario = "",
                                            nom_dep_beneficiario = "",
                                            dep_beneficiario_array = "",
                                            mun_beneficiario = "",
                                            nom_mun_beneficiario = "",
                                            mun_beneficiario_array = "",
                                            parentesco_sel = "",
                                            nom_parentesco_sel = "",
                                            parentesco_sel_array = "",
                                            eps_anterior = "",
                                            nom_eps_anterior = "";

                                            dep_beneficiario_array = $scope.afiliacion.departamento_beneficiario.split("-");
                                            mun_beneficiario_array = $scope.afiliacion.municipio_beneficiario.split("-");
                                            parentesco_sel_array = $scope.afiliacion.parentesco.split("-");
                                            dep_beneficiario = dep_beneficiario_array[0];
                                            nom_dep_beneficiario = dep_beneficiario_array[1];
                                            mun_beneficiario = mun_beneficiario_array[0];
                                            nom_mun_beneficiario = mun_beneficiario_array[1] + "-" + mun_beneficiario_array[2];
                                            parentesco_sel = parentesco_sel_array[0];
                                            nom_parentesco_sel = parentesco_sel_array[1];
                                            eps_anterior = $scope.afiliacion.eps_anterior.slice(0,6);
                                            nom_eps_anterior = $scope.afiliacion.eps_anterior.slice(7, $scope.afiliacion.eps_anterior.length);
                                                // if (!$scope.validar(13, {
                                                //   datalist: "afiliacion_departamento_beneficiario",
                                                //   value: document.formulario_afiliacion.afiliacion_departamento_beneficiario.value
                                                // })) {
                                                //   document.formulario_afiliacion.afiliacion_departamento_beneficiario.value = "";
                                                //   return false;
                                                // } else {
                                                //   dep_beneficiario = document.querySelector("#afiliacion_departamento_beneficiario>option[value='" + document.formulario_afiliacion.afiliacion_departamento_beneficiario.value + "']").dataset.codigo;
                                                // }
                                                // if (!$scope.validar(13, {
                                                //   datalist: "afiliacion_municipio_beneficiario",
                                                //   value: document.formulario_afiliacion.afiliacion_municipio_beneficiario.value
                                                // })) {
                                                //   document.formulario_afiliacion.afiliacion_municipio_beneficiario.value = "";
                                                //   return false;
                                                // } else {
                                                //   mun_beneficiario = document.querySelector("#afiliacion_municipio_beneficiario>option[value='" + document.formulario_afiliacion.afiliacion_municipio_beneficiario.value + "']").dataset.codigo;
                                                // }
                                                // if (!$scope.validar(13, {
                                                //   datalist: "afiliacion_eps_anterior",
                                                //   value: document.formulario_afiliacion.afiliacion_eps_anterior.value
                                                // })) {
                                                //   document.formulario_afiliacion.afiliacion_eps_anterior.value = "";
                                                //   return false;
                                                // } else {
                                                //   eps_anterior = document.querySelector("#afiliacion_eps_anterior>option[value='" + document.formulario_afiliacion.afiliacion_eps_anterior.value + "']").dataset.codigo;
                                                // }
                                                // // CNVU
                                                // if (!$scope.validar(13, {
                                                //   datalist: "afiliacion_parentesco",
                                                //   value: document.formulario_afiliacion.afiliacion_parentesco.value
                                                // })) {
                                                //   document.formulario_afiliacion.afiliacion_parentesco.value = "";
                                                //   return false;
                                                // } else {
                                                //   parentesco_sel = document.querySelector("#afiliacion_parentesco>option[value='" + document.formulario_afiliacion.afiliacion_parentesco.value + "']").dataset.codigo;
                                                // }
                                                // CNVU
                                                $scope.afiliacion.listado_beneficiarios.push({
                                                  tipo_documento: $scope.afiliacion.tipo_documento_beneficiario,
                                                  documento: $scope.afiliacion.numero_documento_beneficiario,
                                                  primer_nombre: $scope.afiliacion.primer_nombre_beneficiario,
                                                  segundo_nombre: $scope.afiliacion.segundo_nombre_beneficiario,
                                                  primer_apellido: $scope.afiliacion.primer_apellido_beneficiario,
                                                  segundo_apellido: $scope.afiliacion.segundo_apellido_beneficiario,
                                                  fecha_nacimiento: $scope.format_date(1, $scope.afiliacion.fecha_nacimiento_beneficiario),
                                                  sexo: $scope.afiliacion.sexo_beneficiario,
                                                  direccion: $scope.afiliacion.direccion_beneficiario,
                                                  barrio: $scope.afiliacion.barrio_beneficiario,
                                                  departamento: dep_beneficiario,
                                                  nom_departamento: nom_dep_beneficiario,
                                                  ubicacion: mun_beneficiario,
                                                  nom_municipio: nom_mun_beneficiario,
                                                  zona: $scope.afiliacion.zona_beneficiario,
                                                  ips: $scope.afiliacion.ips_atencion_beneficiario,
                                                  telefono: $scope.afiliacion.telefono_f_beneficiario,
                                                  celular: $scope.afiliacion.telefono_c_beneficiario,
                                                  correo: $scope.afiliacion.correo_beneficiario,
                                                  eps_ant: eps_anterior,
                                                  nom_eps_ant: nom_eps_anterior,
                                                  parentesco: parentesco_sel,
                                                  nom_parentesco: nom_parentesco_sel,
                                                  fecha_sgsss: $scope.format_date(1, $scope.afiliacion.fecha_sgsss)
                                                });
                                                if ($scope.afiliacion.accion_beneficiario == 'I') {
                                                  $scope.cargar_soportes_beneficiario($scope.afiliacion.numero_documento_beneficiario);
                                                } else {
                                                  let i = $scope.afiliacion.listado_soportes_beneficiarios.findIndex(elemt => elemt.documento == $scope.afiliacion.numero_documento_beneficiario);
                                                  if (i != -1) {
                                                    for (let i = 0; i < $scope.afiliacion.listado_soportes_beneficiarios.length; i++) {
                                                      let ii = $scope.afiliacion.listado_soportes_beneficiarios.findIndex(elemt => elemt.documento == $scope.afiliacion.numero_documento_beneficiario);
                                                      if (ii != -1) {
                                                        $scope.afiliacion.listado_soportes_beneficiarios.splice(ii, 1);
                                                        console.log($scope.afiliacion.listado_soportes_beneficiarios);
                                                      }
                                                    }
                                                  }else{
                                                    $scope.cargar_soportes_beneficiario($scope.afiliacion.numero_documento_beneficiario);
                                                  }
                                                  $scope.afiliacion.accion_beneficiario = 'I';
                                                }
                                                $scope.limpiar_datos_beneficiario();
                                                // CNVU
                                                $scope.afiliacion.tipo_documento_beneficiario = "";
                                                $scope.afiliacion.numero_documento_beneficiario = "";
                                                // CNVU
                                              }
                                            } else {
                                              swal('Advertencia', 'El numero de documento del beneficiario no puede ser igual al del aportante', 'warning');
                                            }
                                          } else {
                                            swal('Advertencia', 'El numero de documento del beneficiario no puede ser igual al del cotizante', 'warning');
                                          }
                                        } else {
                                          swal('Advertencia', 'El beneficiario ' + $scope.afiliacion.numero_documento_beneficiario + ' ya se encuentra en el listado', 'warning');
                                        }
                                      } else {
                                        swal('Advertencia', 'Ingrese el parentesco del beneficiario', 'warning');
                                      }
                                    } else {
                                      swal('Advertencia', 'Ingrese la eps anterior del beneficiario', 'warning');
                                    }


                                 // se comentarea la validacion por solicitud del area de operaciones --@jeff 24/05/2022
                                  // } else {
                                  //   swal('Advertencia', 'Ingrese el correo del beneficiario', 'warning');
                                  // }

                                } else {
                                  swal('Advertencia', 'Ingrese el telefono celular del beneficiario', 'warning');
                                }
                              } else {
                                swal('Advertencia', 'Ingrese la ips de atención del beneficiario', 'warning');
                              }
                            } else {
                              swal('Advertencia', 'Ingrese la zona del beneficiario', 'warning');
                            }
                          } else {
                            swal('Advertencia', 'Ingrese el municipio del beneficiario', 'warning');
                          }
                        } else {
                          swal('Advertencia', 'Ingrese el departamento del beneficiario', 'warning');
                        }
                      } else {
                        swal('Advertencia', 'Ingrese el Barrio del beneficiario', 'warning');
                      }
                      } else {
                        swal('Advertencia', 'Ingrese la direccion del beneficiario', 'warning');
                      }
                    } else {
                      swal('Advertencia', 'Ingrese el sexo del beneficiario', 'warning');
                    }
                  } else {
                    swal('Advertencia', 'Ingrese la fecha nacimiento del beneficiario', 'warning');
                  }
              } else {
                swal('Advertencia', 'Ingrese el primer apellido del beneficiario', 'warning');
              }
            } else {
              swal('Advertencia', 'Ingrese el primer nombre del beneficiario', 'warning');
            }
          } else {
            swal('Advertencia', 'Ingrese el número de documento del beneficiario', 'warning');
          }
        } else {
          swal('Advertencia', 'Ingrese el tipo documento del beneficiario', 'warning');
        }
      } else {
        swal('Mensaje', 'Solo se permite el ingreso de 5 beneficiarios', 'info');
      }
    }
    $scope.editar_beneficiario = function (beneficiario) {
      $scope.afiliacion.tipo_documento_beneficiario = beneficiario.tipo_documento;
      $scope.afiliacion.numero_documento_beneficiario = beneficiario.documento;
      $scope.afiliacion.primer_nombre_beneficiario = beneficiario.primer_nombre;
      $scope.afiliacion.segundo_nombre_beneficiario = beneficiario.segundo_nombre;
      $scope.afiliacion.primer_apellido_beneficiario = beneficiario.primer_apellido;
      $scope.afiliacion.segundo_apellido_beneficiario = beneficiario.segundo_apellido;
      $scope.afiliacion.fecha_nacimiento_beneficiario = $scope.format_date(0, beneficiario.fecha_nacimiento);
      $scope.afiliacion.sexo_beneficiario = beneficiario.sexo;
      $scope.afiliacion.ubicacion_beneficiario = 'NO';
      $scope.afiliacion.direccion_beneficiario = beneficiario.direccion;
      $scope.afiliacion.barrio_beneficiario = beneficiario.barrio;
      $scope.afiliacion.departamento_beneficiario = beneficiario.departamento + "-" + beneficiario.nom_departamento;
      document.querySelector("#afiliacion_departamento_beneficiario").value = $scope.afiliacion.departamento_cotizante;
      $scope.afiliacion.municipio_beneficiario = beneficiario.ubicacion + "-" + beneficiario.nom_municipio;
      document.querySelector("#afiliacion_municipio_beneficiario").value = $scope.afiliacion.municipio_cotizante;
      $scope.afiliacion.zona_beneficiario = beneficiario.zona;
      $scope.afiliacion.ips_atencion_beneficiario = beneficiario.ips;
      $scope.afiliacion.telefono_f_beneficiario = beneficiario.telefono;
      $scope.afiliacion.telefono_c_beneficiario = beneficiario.celular;
      $scope.afiliacion.correo_beneficiario = beneficiario.correo;
      $scope.afiliacion.eps_anterior = beneficiario.eps_ant + "-" + beneficiario.nom_eps_ant;
      document.querySelector("#afiliacion_eps_anterior").value = $scope.afiliacion.eps_anterior;
      $scope.afiliacion.parentesco = beneficiario.parentesco + "-" + beneficiario.nom_parentesco;
      document.querySelector("#afiliacion_parentesco").value = $scope.afiliacion.parentesco;
      $scope.afiliacion.fecha_sgsss = $scope.format_date(0, beneficiario.fecha_sgsss);
      $scope.afiliacion.accion_beneficiario = "E";
      $scope.borrar_beneficiario(beneficiario);
    }
    $scope.borrar_beneficiario = function (beneficiario) {
      let i = $scope.afiliacion.listado_beneficiarios.findIndex(elemt => elemt.documento == beneficiario.documento);
      if (i != -1) {
        $scope.afiliacion.listado_beneficiarios.splice(i, 1);
        $scope.borrar_soportes_beneficiario(beneficiario);
      }
    }
    $scope.borrar_soportes_beneficiario = function (beneficiario) {
    if ($scope.afiliacion.listado_beneficiarios.length < 1) {
      $scope.afiliacion.listado_soportes_beneficiarios = [];
    }else{
      for (let i = 0; i < $scope.afiliacion.listado_soportes_beneficiarios.length; i++) {
        let ii = $scope.afiliacion.listado_soportes_beneficiarios.findIndex(elemt => elemt.documento == beneficiario.documento);
        if (ii != -1) {
          $scope.afiliacion.listado_soportes_beneficiarios.splice(ii, 1);
          console.log($scope.afiliacion.listado_soportes_beneficiarios);
        }
      }
    }
  }
    $scope.lista_actividad = function () {
      $http({
        method: 'POST',
        url: "php/movilidad/afiliacion_linea.php",
        data: {
          function: 'lista_actividad'
        }
      }).then(function (response) {
        $scope.afiliacion.actividad = "";
        if (validar_json(angular.toJson(response.data))) {
          $scope.afiliacion.options_actividad = response.data;
        } else {
          $scope.afiliacion.options_actividad = new Array();
          swal('Mensaje', 'No se obtuvo resultados para el actividad', 'info');
        }
      });
    }
    $scope.insertar_solicitud = function () {
      swal({
        title: 'Confirmar Proceso',
        text: "¿Desea crear la solicitud de Afiliacion?",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then(function (result) {
        if (result) {
        // for (let i = 0; i < document.formulario_afiliacion.elements.length; i++) {
        //     const element = document.formulario_afiliacion.elements[i];
        //     element.style.border = "";
        // }
        var dep_aportante = "",
        mun_aportante = "",
        dep_cotizante = "",
        mun_cotizante = "",
        select_tipo_cotizante = "",
        fondo_pensiones = "",
        riesgos_laborales = "",
        actividad_eco = "";
        if ($scope.afiliacion.vista_aportante == true) {
          // if (!$scope.validar(11, document.formulario_afiliacion.afiliacion_telefono_aportante.value)) {
          //     document.formulario_afiliacion.afiliacion_telefono_aportante.style.cssText = "border:1px solid #F44336!important";
          //     document.formulario_afiliacion.afiliacion_telefono_aportante.scrollIntoView();
          //     // swal('Advertencia', 'El telefono del aportante no es valido', 'warning');
          //     notification.getNotification('warning', 'El telefono del aportante no es valido', 'Advertencia');
          //     return false;
          // }

          // if (!$scope.validar(13, {
          //     datalist: "afiliacion_departamento_aportante",
          //     value: document.formulario_afiliacion.afiliacion_departamento_aportante.value
          //   })) {
          //   document.formulario_afiliacion.afiliacion_departamento_aportante.value = "";
          //   return false;
          // } else {
          //   dep_aportante = document.querySelector("#afiliacion_departamento_aportante>option[value='" + document.formulario_afiliacion.afiliacion_departamento_aportante.value + "']").dataset.codigo;
          // }
          // if (!$scope.validar(13, {
          //     datalist: "afiliacion_municipio_aportante",
          //     value: document.formulario_afiliacion.afiliacion_municipio_aportante.value
          //   })) {
          //   document.formulario_afiliacion.afiliacion_municipio_aportante.value = "";
          //   return false;
          // } else {
          //   mun_aportante = document.querySelector("#afiliacion_municipio_aportante>option[value='" + document.formulario_afiliacion.afiliacion_municipio_aportante.value + "']").dataset.codigo;
          // }
        }
        // CNVU
        if (!$scope.validar(13, {
          datalist: "afiliacion_tipo_cotizante",
          value: document.formulario_afiliacion.afiliacion_tipo_cotizante.value
        })) {
          document.formulario_afiliacion.afiliacion_tipo_cotizante.value = "";
          return false;
        } else {
          select_tipo_cotizante = document.querySelector("#afiliacion_tipo_cotizante>option[value='" + document.formulario_afiliacion.afiliacion_tipo_cotizante.value + "']").dataset.codigo;
        }
        if (!$scope.validar(13, {
          datalist: "afiliacion_penciones_afp",
          value: document.formulario_afiliacion.afiliacion_penciones_afp.value
        })) {
          document.formulario_afiliacion.afiliacion_penciones_afp.value = "";
          return false;
        } else {
          fondo_pensiones = document.querySelector("#afiliacion_penciones_afp>option[value='" + document.formulario_afiliacion.afiliacion_penciones_afp.value + "']").dataset.codigo;
        }

        if ($scope.afiliacion.condicion == 'E') {
          if (!$scope.validar(13, {
            datalist: "afiliacion_riesgos_laborales_arl",
            value: document.formulario_afiliacion.afiliacion_riesgos_laborales_arl.value
          })) {
            document.formulario_afiliacion.afiliacion_riesgos_laborales_arl.value = "";
            return false;
          } else {
            riesgos_laborales = document.querySelector("#afiliacion_riesgos_laborales_arl>option[value='" + document.formulario_afiliacion.afiliacion_riesgos_laborales_arl.value + "']").dataset.codigo;
          }
        } else if ($scope.afiliacion.condicion == 'I' && document.formulario_afiliacion.afiliacion_riesgos_laborales_arl.value != '') {
          if (!$scope.validar(13, {
            datalist: "afiliacion_riesgos_laborales_arl",
            value: document.formulario_afiliacion.afiliacion_riesgos_laborales_arl.value
          })) {
            document.formulario_afiliacion.afiliacion_riesgos_laborales_arl.value = "";
            return false;
          } else {
            riesgos_laborales = document.querySelector("#afiliacion_riesgos_laborales_arl>option[value='" + document.formulario_afiliacion.afiliacion_riesgos_laborales_arl.value + "']").dataset.codigo;
          }
        } else {
          riesgos_laborales = "";
        }
        // CNVU

        if (!$scope.validar(13, {
          datalist: "afiliacion_departamento_cotizante",
          value: document.formulario_afiliacion.afiliacion_departamento_cotizante.value
        })) {
          document.formulario_afiliacion.afiliacion_departamento_cotizante.value = "";
          return false;
        } else {
          dep_cotizante = document.querySelector("#afiliacion_departamento_cotizante>option[value='" + document.formulario_afiliacion.afiliacion_departamento_cotizante.value + "']").dataset.codigo;
        }
        if (!$scope.validar(13, {
          datalist: "afiliacion_municipio_cotizante",
          value: document.formulario_afiliacion.afiliacion_municipio_cotizante.value
        })) {
          document.formulario_afiliacion.afiliacion_municipio_cotizante.value = "";
          return false;
        } else {
          mun_cotizante = document.querySelector("#afiliacion_municipio_cotizante>option[value='" + document.formulario_afiliacion.afiliacion_municipio_cotizante.value + "']").dataset.codigo;
        }
        // CNVU
        if ($scope.afiliacion.condicion == 'I') {
          if (!$scope.validar(13, {
            datalist: "afiliacion_actividad",
            value: document.formulario_afiliacion.afiliacion_actividad.value
          })) {
            document.formulario_afiliacion.afiliacion_actividad.value = "";
            return false;
          } else {
            actividad_eco = document.querySelector("#afiliacion_actividad>option[value='" + document.formulario_afiliacion.afiliacion_actividad.value + "']").dataset.codigo;
          }
        } else {
          actividad_eco = "";
        }
        // CNVU

        // if (!$scope.validar(11, document.formulario_afiliacion.afiliacion_telefono_c_cotizante.value)) {
        //     document.formulario_afiliacion.afiliacion_telefono_c_cotizante.style.cssText = "border:1px solid #F44336!important";
        //     document.formulario_afiliacion.afiliacion_telefono_c_cotizante.scrollIntoView();
        //     // swal('Advertencia', 'El telefono del cotizante no es valido', 'warning');
        //     notification.getNotification('warning', 'El telefono del cotizante no es valido', 'Advertencia');
        //     return false;
        // }

        //CNVU
        if ($scope.validar(14, document.formulario_afiliacion.afiliacion_telefono_f_cotizante.value)) {
          document.formulario_afiliacion.afiliacion_telefono_f_cotizante.style.cssText = "border:1px solid #F44336!important";
          document.formulario_afiliacion.afiliacion_telefono_f_cotizante.scrollIntoView();
          // swal('Advertencia', 'El telefono del cotizante no es valido', 'warning');
          notification.getNotification('warning', 'El telefono fijo del cotizante no es valido', 'Advertencia');
          return false;
        }
        //CNVU

        if ($scope.afiliacion.vista_beneficiario == 'SI') {
          if ($scope.afiliacion.listado_beneficiarios.length == 0) {
            document.querySelector("#listado_beneficiarios").scrollIntoView();
            notification.getNotification('warning', 'Debe incluir por lo menos un beneficiario al listado de beneficiarios', 'Advertencia');
            return false;
          }
        }
        if ($scope.afiliacion.listado_soportes.length == 0) {
          document.querySelector("#listado_soportes").scrollIntoView();
          notification.getNotification('warning', 'Debe incluir todos los soportes obligatorios dependien el tipo de paquete seleccionado', 'Advertencia');
          return false;
        }
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'insertar_solicitud',
            condicion: $scope.afiliacion.condicion,
            tipo_cotizante: select_tipo_cotizante,
            tipo_doc_aportante: $scope.afiliacion.tipo_documento_aportante_v,
            doc_aportante: $scope.afiliacion.numero_documento_aportante_v,
            tipo_doc_cotizante: $scope.afiliacion.tipo_documento,
            doc_cotizante: $scope.afiliacion.numero_documento,
            pri_nombre: $scope.afiliacion.primer_nombre,
            seg_nombre: $scope.afiliacion.segundo_nombre,
            pri_apellido: $scope.afiliacion.primer_apellido,
            seg_apellido: $scope.afiliacion.segundo_apellido,
            nacimiento: $scope.format_date(1, $scope.afiliacion.fecha_nacimiento),
            genero: $scope.afiliacion.sexo,
            estado_civil: $scope.afiliacion.estado_civil_cotizante,
            direccion: $scope.afiliacion.direccion_cotizante,
            ubicacion_geografica: mun_cotizante,
            zona: $scope.afiliacion.zona_cotizante,
            escenario: $scope.afiliacion.ips_atencion,
            telef: $scope.afiliacion.telefono_f_cotizante,
            celular: $scope.afiliacion.telefono_c_cotizante,
            correo: $scope.afiliacion.correo_cotizante,
            afp: fondo_pensiones,
            arl: ($scope.afiliacion.condicion != 'P') ? riesgos_laborales : "",
            salario: $scope.afiliacion.salario_basico_mensual.replace(/[^\d]*/g, ''),
            ingreso: $scope.format_date(1, $scope.afiliacion.fecha_ingreso),
            actividad: ($scope.afiliacion.condicion == 'I') ? actividad_eco : "",
            origen: "S",
            beneficiarios: angular.toJson($scope.afiliacion.listado_beneficiarios),
            cantidad: $scope.afiliacion.listado_beneficiarios.length,
            soportes: angular.toJson($scope.afiliacion.listado_soportes),
            cantidad_soportes: $scope.afiliacion.listado_soportes.length,
            soportes_beneficiarios: angular.toJson($scope.afiliacion.listado_soportes_beneficiarios),
            cantidad_soportes_beneficiarios: $scope.afiliacion.listado_soportes_beneficiarios.length,
            tipo_solicitud: "A",
            barrio_cotizante: $scope.afiliacion.barrio_cotizante
          }
        }).then(function (response) {
          swal.close();
          if (validar_json(angular.toJson(response.data))) {
            if (response.data.codigo == 0) {
              $scope.limpiar_datos_aportante();
              $scope.limpiar_datos_cotizante();
              swal('Mensaje', response.data.mensaje, 'success');
              //CNVU
              setTimeout(function () {
                swal.close();
                $scope.$apply();
              }, 7000);
              $scope.afiliacion.tipo_documento = "";
              $scope.afiliacion.numero_documento = "";
              $scope.afiliacion.tipo_cotizante = "";
              $scope.afiliacion.condicion = "";
              $scope.afiliacion.tipo_documento_aportante_v = "";
              $scope.afiliacion.numero_documento_aportante_v = "";
              //CNVU
            } else {
              swal('Mensaje', response.data.mensaje, 'warning');
            }
          } else {
            swal('Mensaje', 'Error al crear la solicitud', 'error');
          }
        });
      }
    }).catch(swal.noop);
}
$scope.cargar_soportes = function () {
  //if ($scope.afiliacion.paquete != "") {
  if ($scope.afiliacion.tipo_cotizante != "" && $scope.afiliacion.tipo_documento != "" && $scope.afiliacion.numero_documento != "") {
    // CNVU
    if ($scope.afiliacion.primer_nombre != "" && $scope.afiliacion.primer_nombre != undefined && $scope.afiliacion.primer_nombre != null) {
      if ($scope.afiliacion.primer_apellido != "" && $scope.afiliacion.primer_apellido != undefined && $scope.afiliacion.primer_apellido != null) {
        if ($scope.afiliacion.fecha_nacimiento != "" && $scope.afiliacion.fecha_nacimiento != undefined && $scope.afiliacion.fecha_nacimiento != null
        && $scope.afiliacion.sexo != "" && $scope.afiliacion.sexo != undefined && $scope.afiliacion.sexo != null) {
          if ($scope.afiliacion.estado_civil_cotizante != "" && $scope.afiliacion.estado_civil_cotizante != undefined && $scope.afiliacion.estado_civil_cotizante != null
          && $scope.afiliacion.direccion_cotizante != "" && $scope.afiliacion.direccion_cotizante != undefined && $scope.afiliacion.direccion_cotizante != null) {
            if ($scope.afiliacion.barrio_cotizante != "" && $scope.afiliacion.barrio_cotizante != undefined && $scope.afiliacion.barrio_cotizante != null) {
              if ($scope.afiliacion.telefono_c_cotizante != "" && $scope.afiliacion.telefono_c_cotizante != undefined && $scope.afiliacion.telefono_c_cotizante != null 
                && $scope.afiliacion.telefono_c_cotizante.toString().length <= 10) {
              //&& $scope.afiliacion.correo_cotizante != "" && $scope.afiliacion.correo_cotizante != undefined && $scope.afiliacion.correo_cotizante != null) {
                if ($scope.afiliacion.departamento_cotizante != "" && $scope.afiliacion.departamento_cotizante != undefined && $scope.afiliacion.departamento_cotizante != null
                && $scope.afiliacion.municipio_cotizante != "" && $scope.afiliacion.municipio_cotizante != undefined && $scope.afiliacion.municipio_cotizante != null) {
                  if ($scope.afiliacion.zona_cotizante != "" && $scope.afiliacion.zona_cotizante != undefined && $scope.afiliacion.zona_cotizante != null) {
                    if (($scope.validar_ips_atencion.length > 0 && $scope.afiliacion.ips_atencion != "" && $scope.afiliacion.ips_atencion != undefined && $scope.afiliacion.ips_atencion != null)
                    || $scope.validar_ips_atencion.length == 0) {
                      if ($scope.afiliacion.penciones_afp != "" && $scope.afiliacion.penciones_afp != undefined && $scope.afiliacion.penciones_afp != null){
                        if (($scope.afiliacion.condicion == 'E' && $scope.afiliacion.riesgos_laborales_arl != "" && $scope.afiliacion.riesgos_laborales_arl != undefined && $scope.afiliacion.riesgos_laborales_arl != null)
                            || ($scope.afiliacion.condicion == 'P' || $scope.afiliacion.condicion == 'I')) {
                          if ($scope.afiliacion.salario_basico_mensual != "" && $scope.afiliacion.salario_basico_mensual != undefined && $scope.afiliacion.salario_basico_mensual != null
                          && $scope.afiliacion.fecha_ingreso != "" && $scope.afiliacion.fecha_ingreso != undefined && $scope.afiliacion.fecha_ingreso != null) {
                            $http({
                              method: 'POST',
                              url: "php/movilidad/afiliacion_linea.php",
                              data: {
                                function: 'valida_salario',
                                f_ingreso: $scope.format_date(1, $scope.afiliacion.fecha_ingreso),
                                salario: $scope.afiliacion.salario_basico_mensual.replace(/[^\d]*/g, ''),
                                tipo_cotizante: $scope.codigo_tipo_cotizante
                              }
                            }).then(function (response) {
                              if (validar_json(angular.toJson(response.data))) {
                                if (response.data.codigo == 0) {
                                  $http({
                                    method: 'POST',
                                    url: "php/movilidad/afiliacion_linea.php",
                                    data: {
                                      function: 'valida_direccion',
                                      direccion: $scope.afiliacion.direccion_cotizante
                                    }
                                  }).then(function (response) {
                                    if (validar_json(angular.toJson(response.data))) {
                                      if (response.data.codigo != 0) {
                                        swal('Mensaje', response.data.mensaje, 'warning');
                                      } else {
                                        if ($scope.afiliacion.condicion == 'I') {
                                          if ($scope.afiliacion.actividad != "" && $scope.afiliacion.actividad != undefined && $scope.afiliacion.actividad != null) {
                                            $scope.paquete = $scope.afiliacion.paquete;
                                            $scope.tipo_documento = $scope.afiliacion.tipo_documento;
                                            $scope.documento = $scope.afiliacion.numero_documento;
                                            $scope.TipoRes = 'CA';
                                            $scope.tipo_digitalizacion = 1;
                                            ngDialog.open({
                                              template: 'views/digitalizacion/modal/cargaanexoAF.html',
                                              className: 'ngdialog-theme-plain',
                                              controller: 'DigitalizacionControllerAF',
                                              scope: $scope,
                                              preCloseCallback: function (response) {
                                                if (validar_json(angular.toJson(response))) {
                                                  if (response.codigo == 0) {
                                                    $scope.afiliacion.listado_soportes = response.rutas;
                                                  } else {
                                                    $scope.afiliacion.listado_soportes = new Array();
                                                  }
                                                } else {
                                                  $scope.afiliacion.listado_soportes = new Array();
                                                  swal('Mensaje', 'No se cargaron los soportes correctamente, intentelo nuevamente', 'info');
                                                }
                                                setTimeout(() => {
                                                  document.querySelector("#listado_soportes").scrollIntoView();
                                                }, 2500);
                                                return true;
                                              }
                                            })
                                          } else {
                                            swal('Mensaje', 'La actividad economica del cotizante no puede estar vacia.', 'warning');
                                          }
                                        } else {
                                          $scope.paquete = $scope.afiliacion.paquete;
                                          $scope.tipo_documento = $scope.afiliacion.tipo_documento;
                                          $scope.documento = $scope.afiliacion.numero_documento;
                                          $scope.TipoRes = 'CA';
                                          $scope.tipo_digitalizacion = 1;
                                          ngDialog.open({
                                            template: 'views/digitalizacion/modal/cargaanexoAF.html',
                                            className: 'ngdialog-theme-plain',
                                            controller: 'DigitalizacionControllerAF',
                                            scope: $scope,
                                            preCloseCallback: function (response) {
                                              if (validar_json(angular.toJson(response))) {
                                                if (response.codigo == 0) {
                                                  $scope.afiliacion.listado_soportes = response.rutas;
                                                } else {
                                                  $scope.afiliacion.listado_soportes = new Array();
                                                }
                                              } else {
                                                $scope.afiliacion.listado_soportes = new Array();
                                                swal('Mensaje', 'No se cargaron los soportes correctamente, intentelo nuevamente', 'info');
                                              }
                                              setTimeout(() => {
                                                document.querySelector("#listado_soportes").scrollIntoView();
                                              }, 2500);
                                              return true;
                                            }
                                          })
                                        }
                                      }
                                    } else {
                                      swal('Mensaje', 'No se obtuvo resultados para (valida_dirección).', 'error');
                                    }
                                  });
                                } else {
                                  swal('Mensaje', response.data.mensaje, 'warning');
                                }
                              } else {
                                swal('Mensaje', 'No se obtuvo resultados para (valida_salario).', 'error');
                              }
                            });
                          } else {
                            swal('Mensaje', 'El salario básico mensual o la fecha de ingreso del cotizante no pueden estar vacios.', 'warning');
                          }
                        } else {
                          swal('Mensaje', 'El riesgo laboral del cotizante no pueden estar vacios.', 'warning');
                        }
                      } else {
                        swal('Mensaje', 'El fondo de pensiones del cotizante no pueden estar vacios.', 'warning');
                      }
                    } else {
                      swal('Mensaje', 'La ips de atención del cotizante no puede estar vacia.', 'warning');
                    }
                  } else {
                    swal('Mensaje', 'La zona del cotizante no puede estar vacia.', 'warning');
                  }
                } else {
                  swal('Mensaje', 'El departamento o el municipio del cotizante no pueden estar vacios.', 'warning');
                }
              } else {
                swal('Mensaje', 'El celular del cotizante no puede estar vacio o incompleto.', 'warning');
              }
            } else {
              swal('Mensaje', 'El barrio del cotizante no puede estar vacio.', 'warning');
            }
          } else {
            swal('Mensaje', 'El estado civil o la dirección del cotizante no pueden estar vacios.', 'warning');
          }
        } else {
          swal('Mensaje', 'La fecha de nacimiento o el sexo del cotizante no pueden estar vacios.', 'warning');
        }
      } else {
        swal('Mensaje', 'El primer apellido del cotizante no pueden estar vacios.', 'warning');
      }
    } else {
      swal('Mensaje', 'El primer nombre del cotizante no puede estar vacio.', 'warning');
    }
    // CNVU
  } else {
    swal('Mensaje', 'Ingrese el tipo, tipo de documento o documento del cotizante', 'warning');
  }
  // } else {
  //   swal('Mensaje', 'Paquete no valido al elegir Tipo de cotizante:' + $scope.afiliacion.paquete, 'warning');
  // }
}

  $scope.descargar_archivo = function (ruta, ftp) {
    if (ruta != "" && ruta != null && ruta != undefined && ruta.length > 10) {
      $http({
        method: 'POST',
        url: "php/intranet/intranet_procesos.php",
        data: {
          function: 'descargaAdjunto',
          ruta: ruta,
          ftp: ftp
        }
      }).then(function (response) {
        window.open("temp/" + response.data);
      });
    } else {
      swal('Url no válida', 'No se encontró ningún archivo', 'warning');
    }
  }
  $scope.validar = function (tipo = "", param = "") {
    switch (tipo) {
      case 0: // longitud <= y
      return (param.x.toString().length <= param.y);
      break;
      case 1: // longitud == y
      return (param.x.toString().length == param.y);
      break;
      case 2: // longitud >= y
      return (param.x.toString().length >= param.y);
      break;
      case 3: // numerico = false
      if (!isNaN(param)) {
        const regeN = new RegExp('^[0-9]+$', 'i');
        param = parseInt(param);
        if (regeN.test(param)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
      break;
      case 4: // numerico entero
      return Number.isInteger(param);
      break;
      case 5: // json object
      var str = angular.toJson(param);
      try {
        if (typeof str !== "string") {
          return false;
        } else {
          return (typeof JSON.parse(str) === 'object');
        }
      } catch (e) {
        return false;
      }
      break;
      case 6: // array length == x
      return (Array.isArray(param.array) && param.array.length == param.x);
      break;
      case 7: // array length > x
      return (Array.isArray(param.array) && param.array.length > param.x);
      break;
      case 8: // fecha dd/mm/aaaa
      var fecha = param.split("/");
      var day = parseInt(fecha[0]);
      var month = parseInt(fecha[1]);
      var year = parseInt(fecha[2]);
      return (isNaN(day) || isNaN(month) || isNaN(year));
      break;
      case 9: // identificar logitud de caracter y numero
      var str = param.str.substring(0, param.split);
      var num = param.str.substring(param.split);
      if (!isNaN(num) && isNaN(str)) {
        const regS = new RegExp('^[A-Z]+$', 'i');
        const regN = new RegExp('^[0-9]+$', 'i');
        if (regS.test(str) && regN.test(num)) {
          num = parseInt(num);
          return (typeof str == "string" && typeof num == "number");
        }
      } else {
        return false;
      }
      break;
      case 10: // string not number
      var str = param;
      if (isNaN(str)) {
        const regS = new RegExp('^[A-Z]+$', 'i');
        if (regS.test(str)) {
          return (typeof str == "string");
        }
      } else {
        return false;
      }
      break;
      case 11: // Celular
      let telefono = param,
      numero = [300, 301, 302, 303, 304, 305, 306, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 350, 351].findIndex(elemt => elemt == (telefono.substring(0, 3)));
      const expresion = /^3[\d]{9}$/;
      if (telefono.length == 10 && !isNaN(telefono) && expresion.test(telefono) && numero != -1) {
        return true;
      } else {
        return false;
      }
      break;
      case 12: // Correo
      return (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(param);
      break;
      case 13:
      var option = document.querySelector("#" + param.datalist + ">option[value='" + param.value + "']");
      if (option != null) {
        return option.value.length > 0;
      }
      return false;
      break;
      case 14:
      let telefono_f = param;
      if (telefono_f.length > 0 && telefono_f.length < 7 && !isNaN(telefono_f)) {
        return true;
      } else {
        return false;
      }
      break;
      default:
      swal('Error', 'Tipo de validacion invalida', 'error');
      console.log(tipo, param);
      break;
    }
  }
  // $(document).keypress(function (event) {
  //     if (event.which == '13') {
  //         event.preventDefault();
  //     }
  // });
  // Enter [↲] Tabular [↹]

  // CNVU FORMATEA TEXTO SALARIO
  $scope.formatcurrency = function (variable, codigo, object) {
    switch (variable) {
      case 1:
      $scope.afiliacion.salario_basico_mensual = numeral($scope.afiliacion.salario_basico_mensual).format('$ 0,0[.]0');
      break;
      case 2:
      if (codigo == "" || codigo == undefined || codigo == null) {
        swal('Mensaje', 'No selecciono algún item de la lista.', 'warning');
      }else{
        var codigo_select_list = codigo.split("-");
        var i = object.findIndex(elemt => elemt.codigo == codigo_select_list[0]);
        if (i != -1) {
          if (codigo_select_list[1] != object[i].nombre.trim()) {
            swal('Mensaje', 'No selecciono algún item de la lista.', 'warning');
          }
        }else{
          swal('Mensaje', 'No selecciono algún item de la lista.', 'warning');
        }
      }
      break;
      case 3:
      if (codigo == "" || codigo == undefined || codigo == null) {
        swal('Mensaje', 'No selecciono algún item de la lista.', 'warning');
      }else{
        var codigo_select_list = codigo.split("-");
        var i = object.findIndex(elemt => elemt.CODIGO == codigo_select_list[0]);
        if (i != -1) {
          if (codigo_select_list[1] != object[i].NOMBRE.trim()) {
            swal('Mensaje', 'No selecciono algún item de la lista.', 'warning'); 
          }
        }else{
          swal('Mensaje', 'No selecciono algún item de la lista.', 'warning');
        }
      }
      break;
      case 4:
      if (codigo == "" || codigo == undefined || codigo == null) {
        swal('Mensaje', 'No selecciono algún item de la lista.', 'warning');
      } else {
        var codigo_select_list = codigo.slice(0, 6);
        var nombre_select_list = codigo.slice(7, codigo.length);
        var i = object.findIndex(elemt => elemt.CODIGO == codigo_select_list);
        if (i != -1) {
          if (nombre_select_list != object[i].NOMBRE.trim()) {
            swal('Mensaje', 'No selecciono algún item de la lista.', 'warning');
          }
        } else {
          swal('Mensaje', 'No selecciono algún item de la lista.', 'warning');
        }
      }
      break;
      case 5:
        if (codigo == "" || codigo == undefined || codigo == null) {
          swal('Mensaje', 'No selecciono algún item de la lista.', 'warning');
        } else {
          //var codigo_select_list = codigo.slice(0, 6);
          var nombre_select_list = codigo;
          var i = object.findIndex(elemt => elemt.NOMBRE == nombre_select_list);
          if (i != -1) {
            if (nombre_select_list != object[i].NOMBRE.trim()) {
              swal('Mensaje', 'No selecciono algún item de la lista.', 'warning');
            }
          } else {
            swal('Mensaje', 'No selecciono algún item de la lista.', 'warning');
          }
        }
        break;
        case 6:
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'valida_direccion',
            direccion: $scope.afiliacion.direccion_cotizante
          }
        }).then(function (response) {
          if (validar_json(angular.toJson(response.data))) {
            if (response.data.codigo != 0) {
              swal('Mensaje', response.data.mensaje, 'warning');
            }
          } else {
            swal('Mensaje', 'No se obtuvo resultados para (valida_dirección).', 'error');
          }
        });
        break;
      case 7:
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'valida_salario',
            f_ingreso: $scope.format_date(1, $scope.afiliacion.fecha_ingreso),
            salario: $scope.afiliacion.salario_basico_mensual.replace(/[^\d]*/g, ''),
            tipo_cotizante: $scope.codigo_tipo_cotizante
          }
        }).then(function (response) {
          if (validar_json(angular.toJson(response.data))) {
            if (response.data.codigo != 0) {
              swal('Mensaje', response.data.mensaje, 'warning');
            }
          } else {
            swal('Mensaje', 'No se obtuvo resultados para (valida_dirección).', 'error');
          }
        });
        break;
      default:
      break;
    }
  }
  // CNVU FORMATEA TEXTO SALARIO
  // ------------------------------------------------------------------------------------------------------------- tab.3
  $scope.afi_beneficiarios = {
    tipo_documento: "",
    options_tipo_documento: new Array(),
    numero_documento: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    fecha_nacimiento: "",
    sexo: "",
    departamento_nombre: "",
    municipio_nombre: "",
    departamento_cotizante: "",
    options_departamento_cotizante: new Array(),
    municipio_cotizante: "",
    options_municipio_cotizante: new Array(),
    tipo_documento_beneficiario: "",
    numero_documento_beneficiario: "",
    primer_nombre_beneficiario: "",
    segundo_nombre_beneficiario: "",
    primer_apellido_beneficiario: "",
    segundo_apellido_beneficiario: "",
    fecha_nacimiento_beneficiario: "",
    sexo_beneficiario: "",
    parentesco: "",
    options_parentesco: new Array(),
    eps_anterior: "",
    options_eps_anterior: new Array(),
    // ubicacion_beneficiario: "",
    departamento_beneficiario: "",
    options_departamento_beneficiario: new Array(),
    municipio_beneficiario: "",
    options_municipio_beneficiario: new Array(),
    direccion_beneficiario: "",
    barrio_beneficiario: "",
    zona_beneficiario: "",
    telefono_f_beneficiario: "",
    telefono_c_beneficiario: "",
    correo_beneficiario: "",
    ips_atencion_beneficiario: "",
    options_ips_atencion_beneficiario: new Array(),
    listado_beneficiarios: new Array(),
    listado_soportes: new Array(),
    paquete: "",
    fecha_sgsss: "",
    hde_fecha_sgsss: false
  };
  consultaHTTP.obtenerDocumento().then(function (response) {
    let arra_temp = new Array();
    response.Documento.forEach(element => {
      if (element.Codigo != "") {
        arra_temp.push(element);
      }
    });
    $scope.afi_beneficiarios.options_tipo_documento = arra_temp;
    $scope.afi_beneficiarios.tipo_documento = "";
  });
  $scope.buscar_cotizante_beneficiario = function () {
    if ($scope.afi_beneficiarios.tipo_documento != undefined && $scope.afi_beneficiarios.numero_documento != undefined && $scope.afi_beneficiarios.tipo_documento != "" && $scope.afi_beneficiarios.numero_documento != "") {
      if (($scope.afi_beneficiarios.tipo_documento != 'PE' && $scope.afi_beneficiarios.numero_documento.toString().length <= 10)
        || ($scope.afi_beneficiarios.tipo_documento == 'PE' && $scope.afi_beneficiarios.numero_documento.toString().length == 15)) {
        if ($scope.afi_beneficiarios.numero_documento_beneficiario != $scope.afi_beneficiarios.numero_documento) {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/movilidad/afiliacion_linea.php",
            data: {
              function: 'lista_datos_afiliado',
              tipo_doc: $scope.afi_beneficiarios.tipo_documento,
              documento: $scope.afi_beneficiarios.numero_documento
            }
          }).then(function (response) {
            swal.close();
            $scope.limpiar_datos_cotizante_inclusion();
            if (validar_json(angular.toJson(response.data)) && response.data.datos_basicos != null) {
              $scope.afi_beneficiarios.primer_nombre = response.data.datos_basicos.PRIMER_NOMBRE;
              $scope.afi_beneficiarios.segundo_nombre = response.data.datos_basicos.SEGUNDO_NOMBRE;
              $scope.afi_beneficiarios.primer_apellido = response.data.datos_basicos.PRIMER_APELLIDO;
              $scope.afi_beneficiarios.segundo_apellido = response.data.datos_basicos.SEGUNDO_APELLIDO;
              $scope.afi_beneficiarios.fecha_nacimiento = $scope.format_date(0, response.data.datos_basicos.FECHA_NACIMIENTO);
              $scope.afi_beneficiarios.sexo = response.data.datos_basicos.GENERO;
              $scope.afi_beneficiarios.departamento_nombre = response.data.datos_basicos.NOMBRE_DEPARTAMENTO;
              $scope.afi_beneficiarios.municipio_nombre = response.data.datos_basicos.NOMBRE_MUNICIPIO;
              document.querySelector("#afi_beneficiarios_tipo_documento_beneficiario").focus();
            } else {
              swal('Mensaje', 'No se obtuvo resultados para el cotizante: ' + $scope.afi_beneficiarios.tipo_documento + '-' + $scope.afi_beneficiarios.numero_documento, 'info');
            }
          });
        } else {
          swal('Advertencia', 'El numero de documento del cotizante no puede ser igual al del beneficiario', 'warning');
        }
      } else {
        swal('Advertencia', 'Digite de manera correcta el Documento del Cotizante según Tipo de Documento elegido.', 'warning');
      }
    } else {
      swal('Advertencia', 'Ingrese los campos (tipo_documento, numero_documento)', 'warning');
    }
  }
  $scope.limpiar_datos_cotizante_inclusion = function () {
    // $scope.afi_beneficiarios.tipo_documento = "";
    // $scope.afi_beneficiarios.numero_documento = "";
    $scope.afi_beneficiarios.primer_nombre = "";
    $scope.afi_beneficiarios.segundo_nombre = "";
    $scope.afi_beneficiarios.primer_apellido = "";
    $scope.afi_beneficiarios.segundo_apellido = "";
    $scope.afi_beneficiarios.fecha_nacimiento = "";
    $scope.afi_beneficiarios.sexo = "";
    $scope.afi_beneficiarios.estado_civil_cotizante = "";
    $scope.afi_beneficiarios.departamento_cotizante = "";
    $scope.afi_beneficiarios.municipio_cotizante = "";
    $scope.afi_beneficiarios.direccion_cotizante = "";
    $scope.afi_beneficiarios.zona_cotizante = "";
    $scope.afi_beneficiarios.telefono_f_cotizante = "";
    $scope.afi_beneficiarios.telefono_c_cotizante = "";
    $scope.afi_beneficiarios.correo_cotizante = "";
    $scope.afi_beneficiarios.ips_atencion = "";
    $scope.afi_beneficiarios.penciones_afp = "";
    $scope.afi_beneficiarios.riesgos_laborales_arl = "";
    $scope.afi_beneficiarios.salario_basico_mensual = "";
    $scope.afi_beneficiarios.fecha_ingreso = "";
    $scope.afi_beneficiarios.vista_beneficiario = "NO";
    $scope.afi_beneficiarios.listado_beneficiarios = new Array();
    $scope.afi_beneficiarios.listado_soportes = new Array();
  }
  $scope.lista_departamento_beneficiario = function () {
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'lista_departamento',
        coincidencia: ''
      }
    }).then(function (response) {
      if (validar_json(angular.toJson(response.data))) {
        $scope.afi_beneficiarios.options_departamento_aportante = response.data;
        $scope.afi_beneficiarios.options_departamento_cotizante = response.data;
        $scope.afi_beneficiarios.options_departamento_beneficiario = response.data;
      } else {
        $scope.afi_beneficiarios.options_departamento_aportante = new Array();
        $scope.afi_beneficiarios.options_departamento_cotizante = new Array();
        $scope.afi_beneficiarios.options_departamento_beneficiario = new Array();
        swal('Mensaje', 'No se obtuvo resultados para el lista_departamento', 'info');
      }
    });
  }
  $scope.lista_departamento_beneficiario();
  $scope.lista_municipio_change_beneficiario = function (departamento, options_municipio, select_municipio = "") {
    if (departamento != undefined && departamento != null && departamento != "") {
      var codigo = departamento.indexOf("-");
      if (codigo != -1) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        codigo = departamento.split("-")[0].trim();
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'lista_municipio',
            departamento: codigo,
            coincidencia: ''
          }
        }).then(function (response) {
          swal.close();
          if (select_municipio != "") {
            $scope.afi_beneficiarios[select_municipio] = "";
          }
          if (validar_json(angular.toJson(response.data))) {
            $scope.afi_beneficiarios[options_municipio] = response.data;
          } else {
            $scope.afi_beneficiarios[options_municipio] = new Array();
            swal('Mensaje', 'No se obtuvo resultados para el lista_municipio', 'info');
          }
        });
      }
    }
  }
  $scope.lista_eps_beneficiario = function () {
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'lista_eps',
        coincidencia: ""
      }
    }).then(function (response) {
      $scope.afi_beneficiarios.eps_anterior = "";
      if (validar_json(angular.toJson(response.data))) {
        $scope.afi_beneficiarios.options_eps_anterior = response.data;
      } else {
        $scope.afi_beneficiarios.options_eps_anterior = new Array();
        swal('Mensaje', 'No se obtuvo resultados para el lista_eps', 'info');
      }
    });
  }
  $scope.lista_eps_beneficiario();
  $scope.lista_parentesco_beneficiario = function () {
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'lista_parentezco'
      }
    }).then(function (response) {
      $scope.afi_beneficiarios.parentesco = "";
      if (validar_json(angular.toJson(response.data))) {
        $scope.afi_beneficiarios.options_parentesco = response.data;
      } else {
        $scope.afi_beneficiarios.options_parentesco = new Array();
        swal('Mensaje', 'No se obtuvo resultados para el lista_afp', 'info');
      }
    });
  }
  $scope.lista_parentesco_beneficiario();
  $scope.buscar_afi_beneficiario = function () {
    if ($scope.afi_beneficiarios.tipo_documento_beneficiario != undefined && $scope.afi_beneficiarios.numero_documento_beneficiario != undefined 
      && $scope.afi_beneficiarios.tipo_documento_beneficiario != "" && $scope.afi_beneficiarios.numero_documento_beneficiario != ""
      && $scope.afi_beneficiarios.tipo_documento_beneficiario != null && $scope.afi_beneficiarios.numero_documento_beneficiario != null) {
      if (($scope.afi_beneficiarios.tipo_documento_beneficiario != 'PE' && $scope.afi_beneficiarios.numero_documento_beneficiario.toString().length <= 10)
        || ($scope.afi_beneficiarios.tipo_documento_beneficiario == 'PE' && $scope.afi_beneficiarios.numero_documento_beneficiario.toString().length == 15)) {
        if ($scope.afi_beneficiarios.numero_documento != $scope.afi_beneficiarios.numero_documento_beneficiario) {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/movilidad/afiliacion_linea.php",
            data: {
              function: 'lista_datos_afiliado',
              tipo_doc: $scope.afi_beneficiarios.tipo_documento_beneficiario,
              documento: $scope.afi_beneficiarios.numero_documento_beneficiario
            }
          }).then(function (response) {
            swal.close();
            $scope.limpiar_datos_beneficiario_inclusion();
            if (validar_json(angular.toJson(response.data)) && response.data.datos_basicos != null) {
              $scope.afi_beneficiarios.primer_nombre_beneficiario = response.data.datos_basicos.PRIMER_NOMBRE;
              $scope.afi_beneficiarios.segundo_nombre_beneficiario = response.data.datos_basicos.SEGUNDO_NOMBRE;
              $scope.afi_beneficiarios.primer_apellido_beneficiario = response.data.datos_basicos.PRIMER_APELLIDO;
              $scope.afi_beneficiarios.segundo_apellido_beneficiario = response.data.datos_basicos.SEGUNDO_APELLIDO;
              $scope.afi_beneficiarios.fecha_nacimiento_beneficiario = $scope.format_date(0, response.data.datos_basicos.FECHA_NACIMIENTO);
              $scope.afi_beneficiarios.sexo_beneficiario = response.data.datos_basicos.GENERO;
              // CNVU
              $scope.afi_beneficiarios.direccion_beneficiario = response.data.datos_basicos.DIRECCION;
              $scope.afi_beneficiarios.barrio_beneficiario = response.data.datos_basicos.BARRIO;
              $scope.afi_beneficiarios.telefono_f_beneficiario = parseInt(response.data.datos_basicos.TELEFONO);
              $scope.afi_beneficiarios.telefono_c_beneficiario = parseInt(response.data.datos_basicos.CELULAR);
              $scope.afi_beneficiarios.correo_beneficiario = response.data.datos_basicos.CORREO;
              $scope.afi_beneficiarios.zona_beneficiario = response.data.datos_basicos.ZONA;
              document.querySelector('[name=afi_beneficiarios_departamento_beneficiario]').focus();
              $scope.afi_beneficiarios.hde_fecha_sgsss = false;
              // --CNVU
              // $scope.afi_beneficiarios.departamento_beneficiario = response.data.datos_basicos.COD_DEPARTAMENTO + " - " + response.data.datos_basicos.NOMBRE_DEPARTAMENTO;
              // setTimeout(() => {
              //   document.formulario_afi_beneficiarios.afi_beneficiarios_municipio_beneficiario.value = "";
              //   document.formulario_afi_beneficiarios.afi_beneficiarios_municipio_beneficiario.value = response.data.datos_basicos.COD_UBICACION + " - " + response.data.datos_basicos.NOMBRE_MUNICIPIO;
              //   // CNVU
              //   $scope.afi_beneficiarios.municipio_beneficiario = response.data.datos_basicos.COD_UBICACION + "-" + response.data.datos_basicos.NOMBRE_MUNICIPIO;
              //   // --CNVU
              //   $http({
              //     method: 'POST',
              //     url: "php/movilidad/afiliacion_linea.php",
              //     data: {
              //       function: 'lista_ips',
              //       ubicacion: response.data.datos_basicos.COD_UBICACION
              //     }
              //   }).then(function (response2) {
              //     if (validar_json(angular.toJson(response2.data))) {
              //       $scope.afi_beneficiarios.options_ips_atencion_beneficiario = response2.data;
              //       $scope.afi_beneficiarios.ips_atencion_beneficiario = response.data.datos_basicos.IPS_ACTUAL;
              //     } else {
              //       $scope.afi_beneficiarios.options_ips_atencion_beneficiario = new Array();
              //       $scope.afi_beneficiarios.ips_atencion_beneficiario = "";
              //       swal('Mensaje', 'No se obtuvo resultados para el lista_ips', 'info');
              //     }
              //   });
              // }, 100);
            } else {
              // CNVU
              swal('Mensaje', 'No se obtuvo resultados para el beneficiario: <br>'
                + $scope.afi_beneficiarios.tipo_documento_beneficiario + '-' + $scope.afi_beneficiarios.numero_documento_beneficiario + '<br>Diligencie los campos manualmente', 'info').then(function (result) {
                  if (result) {
                    document.querySelector("#afi_beneficiarios_primer_nombre_beneficiario").focus();
                  };
              }).catch(swal.noop);
                $scope.afi_beneficiarios.hde_fecha_sgsss = true;
              // --CNVU
            }
          });
        } else {
          swal('Advertencia', 'El numero de documento del beneficiario no puede ser igual al del cotizante', 'warning');
        }
      } else {
        swal('Advertencia', 'Digite de manera correcta el Documento del Cotizante según Tipo de Documento elegido.', 'warning');
      }
    } else {
      swal('Advertencia', 'Ingrese los campos (tipo_documento_beneficiario, numero_documento_beneficiario)', 'warning');
    }
  }
  var parentesco2 = true;
  $scope.incluir_beneficiario_inclusion = function () {
        if ($scope.afi_beneficiarios.listado_beneficiarios.length <= 5) {
          if ($scope.afi_beneficiarios.tipo_documento_beneficiario != "" && $scope.afi_beneficiarios.tipo_documento_beneficiario != undefined && $scope.afi_beneficiarios.tipo_documento_beneficiario != null) {
            if ($scope.afi_beneficiarios.numero_documento_beneficiario != "" && $scope.afi_beneficiarios.numero_documento_beneficiario != undefined && $scope.afi_beneficiarios.numero_documento_beneficiario != null) {
              if ($scope.afi_beneficiarios.primer_nombre_beneficiario != "" && $scope.afi_beneficiarios.primer_nombre_beneficiario != undefined && $scope.afi_beneficiarios.primer_nombre_beneficiario != null) {
                if ($scope.afi_beneficiarios.primer_apellido_beneficiario != "" && $scope.afi_beneficiarios.primer_apellido_beneficiario != undefined && $scope.afi_beneficiarios.primer_apellido_beneficiario != null) {
                  if ($scope.afi_beneficiarios.segundo_apellido_beneficiario != "" && $scope.afi_beneficiarios.segundo_apellido_beneficiario != undefined && $scope.afi_beneficiarios.segundo_apellido_beneficiario != null) {
                    if ($scope.afi_beneficiarios.fecha_nacimiento_beneficiario != "" && $scope.afi_beneficiarios.fecha_nacimiento_beneficiario != undefined && $scope.afi_beneficiarios.fecha_nacimiento_beneficiario != null) {
                      if ($scope.afi_beneficiarios.sexo_beneficiario != "" && $scope.afi_beneficiarios.sexo_beneficiario != undefined && $scope.afi_beneficiarios.sexo_beneficiario != null) {
                        if ($scope.afi_beneficiarios.direccion_beneficiario != "" && $scope.afi_beneficiarios.direccion_beneficiario != undefined && $scope.afi_beneficiarios.direccion_beneficiario != null) {
                          if ($scope.afi_beneficiarios.barrio_beneficiario != "" && $scope.afi_beneficiarios.barrio_beneficiario != undefined && $scope.afi_beneficiarios.barrio_beneficiario != null) {
                          if ($scope.afi_beneficiarios.zona_beneficiario != "" && $scope.afi_beneficiarios.zona_beneficiario != undefined && $scope.afi_beneficiarios.zona_beneficiario != null) {
                            if ($scope.afi_beneficiarios.departamento_beneficiario != "" && $scope.afi_beneficiarios.departamento_beneficiario != undefined && $scope.afi_beneficiarios.departamento_beneficiario != null) {
                              if ($scope.afi_beneficiarios.municipio_beneficiario != "" && $scope.afi_beneficiarios.municipio_beneficiario != undefined && $scope.afi_beneficiarios.municipio_beneficiario != null) {
                                if ($scope.afi_beneficiarios.ips_atencion_beneficiario != "" && $scope.afi_beneficiarios.ips_atencion_beneficiario != undefined && $scope.afi_beneficiarios.ips_atencion_beneficiario != null) {
                                  if ($scope.afi_beneficiarios.telefono_c_beneficiario != "" && $scope.afi_beneficiarios.telefono_c_beneficiario != undefined && $scope.afi_beneficiarios.telefono_c_beneficiario != null) {
                                    if ($scope.afi_beneficiarios.correo_beneficiario != "" && $scope.afi_beneficiarios.correo_beneficiario != undefined && $scope.afi_beneficiarios.correo_beneficiario != null) {
                                      if ($scope.afi_beneficiarios.eps_anterior != "" && $scope.afi_beneficiarios.eps_anterior != undefined && $scope.afi_beneficiarios.eps_anterior != null) {
                                        if ($scope.afi_beneficiarios.parentesco != "" && $scope.afi_beneficiarios.parentesco != undefined && $scope.afi_beneficiarios.parentesco != null) {
                                          var dep_beneficiario = "",
                                            nom_dep_beneficiario = "",
                                            dep_beneficiario_array = "",
                                            mun_beneficiario = "",
                                            nom_mun_beneficiario = "",
                                            mun_beneficiario_array = "",
                                            parentesco_sel = "",
                                            nom_parentesco_sel = "",
                                            parentesco_sel_array = "",
                                            eps_anterior = "",
                                            nom_eps_anterior = "";
                                          
                                          dep_beneficiario_array = $scope.afi_beneficiarios.departamento_beneficiario.split("-");
                                          mun_beneficiario_array = $scope.afi_beneficiarios.municipio_beneficiario.split("-");
                                          parentesco_sel_array = $scope.afi_beneficiarios.parentesco.split("-");
                                          dep_beneficiario = dep_beneficiario_array[0];
                                          nom_dep_beneficiario = dep_beneficiario_array[1];
                                          mun_beneficiario = mun_beneficiario_array[0];
                                          nom_mun_beneficiario = mun_beneficiario_array[1] + "-" + mun_beneficiario_array[2];
                                          parentesco_sel = parentesco_sel_array[0];
                                          nom_parentesco_sel = parentesco_sel_array[1];
                                          eps_anterior = $scope.afi_beneficiarios.eps_anterior.slice(0, 6);
                                          nom_eps_anterior = $scope.afi_beneficiarios.eps_anterior.slice(7, $scope.afi_beneficiarios.eps_anterior.length);
                                          // if (!$scope.validar(13, {
                                          //   datalist: "afi_beneficiarios_departamento_beneficiario",
                                          //   value: document.formulario_afi_beneficiarios.afi_beneficiarios_departamento_beneficiario.value
                                          // })) {
                                          //   document.formulario_afi_beneficiarios.afi_beneficiarios_departamento_beneficiario.value = "";
                                          //   notification.getNotification('warning', 'Ingrese el departamento del beneficiario', 'Advertencia');
                                          //   return false;
                                          // } else {
                                          //   dep_beneficiario = document.querySelector("#afi_beneficiarios_departamento_beneficiario>option[value='" + document.formulario_afi_beneficiarios.afi_beneficiarios_departamento_beneficiario.value + "']").dataset.codigo;
                                          // }
                                          // if (!$scope.validar(13, {
                                          //   datalist: "afi_beneficiarios_municipio_beneficiario",
                                          //   value: document.formulario_afi_beneficiarios.afi_beneficiarios_municipio_beneficiario.value
                                          // })) {
                                          //   document.formulario_afi_beneficiarios.afi_beneficiarios_municipio_beneficiario.value = "";
                                          //   notification.getNotification('warning', 'Ingrese el municipio del beneficiario', 'Advertencia');
                                          //   return false;
                                          // } else {
                                          //   mun_beneficiario = document.querySelector("#afi_beneficiarios_municipio_beneficiario>option[value='" + document.formulario_afi_beneficiarios.afi_beneficiarios_municipio_beneficiario.value + "']").dataset.codigo;
                                          // }
                                          
                                          let i = $scope.afi_beneficiarios.listado_beneficiarios.findIndex(elemt => elemt.documento == $scope.afi_beneficiarios.numero_documento_beneficiario);
                                          if (i == -1) {
                                            if ($scope.afi_beneficiarios.numero_documento != $scope.afi_beneficiarios.numero_documento_beneficiario) {
                                              if ($scope.afi_beneficiarios.numero_documento_aportante_v != $scope.afi_beneficiarios.numero_documento_beneficiario) {
                                                if ($scope.afi_beneficiarios.parentesco.slice(0,2) == "HI") {
                                                  let l = $scope.afi_beneficiarios.listado_beneficiarios.findIndex(elemt => elemt.parentesco == "PA");
                                                  if (l == -1) {
                                                    parentesco2 = true;
                                                  } else {
                                                    parentesco2 = false;
                                                    swal('Advertencia', 'No puede ingresar un Hijo en el parentesco ya que previamente ingreso un Padre en la lista de beneficiarios', 'warning');
                                                  }
                                                } else if ($scope.afi_beneficiarios.parentesco.slice(0, 2) == "PA") {
                                                  let r = $scope.afi_beneficiarios.listado_beneficiarios.findIndex(elemt => elemt.parentesco == "HI");
                                                  if (r == -1) {
                                                    parentesco2 = true;
                                                  } else {
                                                    parentesco2 = false;
                                                    swal('Advertencia', 'No puede ingresar un Padre en el parentesco ya que previamente ingreso un Hijo en la lista de beneficiarios', 'warning');
                                                  }
                                                } else {
                                                  parentesco2 = true;
                                                }
                                                if (parentesco2) {
                                                  // if (!$scope.validar(13, {
                                                  //   datalist: "afi_beneficiarios_eps_anterior",
                                                  //   value: document.formulario_afi_beneficiarios.afi_beneficiarios_eps_anterior.value
                                                  // })) {
                                                  //   document.formulario_afi_beneficiarios.afi_beneficiarios_eps_anterior.value = "";
                                                  //   notification.getNotification('warning', 'Ingrese la eps anterior del beneficiario', 'Advertencia');
                                                  //   return false;
                                                  // } else {
                                                  //   eps_anterior = document.querySelector("#afi_beneficiarios_eps_anterior>option[value='" + document.formulario_afi_beneficiarios.afi_beneficiarios_eps_anterior.value + "']").dataset.codigo;
                                                  // }
                                                  $scope.afi_beneficiarios.listado_beneficiarios.push({
                                                    tipo_documento: $scope.afi_beneficiarios.tipo_documento_beneficiario,
                                                    documento: $scope.afi_beneficiarios.numero_documento_beneficiario,
                                                    primer_nombre: $scope.afi_beneficiarios.primer_nombre_beneficiario,
                                                    segundo_nombre: $scope.afi_beneficiarios.segundo_nombre_beneficiario,
                                                    primer_apellido: $scope.afi_beneficiarios.primer_apellido_beneficiario,
                                                    segundo_apellido: $scope.afi_beneficiarios.segundo_apellido_beneficiario,
                                                    fecha_nacimiento: $scope.format_date(1, $scope.afi_beneficiarios.fecha_nacimiento_beneficiario),
                                                    sexo: $scope.afi_beneficiarios.sexo_beneficiario,
                                                    direccion: $scope.afi_beneficiarios.direccion_beneficiario,
                                                    barrio: $scope.afi_beneficiarios.barrio_beneficiario,
                                                    departamento: dep_beneficiario,
                                                    nom_departamento: nom_dep_beneficiario,
                                                    ubicacion: mun_beneficiario,
                                                    nom_municipio: nom_mun_beneficiario,
                                                    zona: $scope.afi_beneficiarios.zona_beneficiario,
                                                    ips: $scope.afi_beneficiarios.ips_atencion_beneficiario,
                                                    telefono: $scope.afi_beneficiarios.telefono_f_beneficiario,
                                                    celular: $scope.afi_beneficiarios.telefono_c_beneficiario,
                                                    correo: $scope.afi_beneficiarios.correo_beneficiario,
                                                    eps_ant: eps_anterior,
                                                    nom_eps_ant: nom_eps_anterior,
                                                    parentesco: parentesco_sel,
                                                    nom_parentesco: nom_parentesco_sel
                                                  });
                                                  $scope.limpiar_datos_beneficiario_inclusion();
                                                }
                                              } else {
                                                swal('Advertencia', 'El numero de documento del beneficiario no puede ser igual al del aportante', 'warning');
                                              }
                                            } else {
                                              swal('Advertencia', 'El numero de documento del beneficiario no puede ser igual al del cotizante', 'warning');
                                            }
                                          } else {
                                            swal('Advertencia', 'El beneficiario ' + $scope.afi_beneficiarios.numero_documento_beneficiario + ' ya se encuentra en el listado', 'warning');
                                          }
                                        } else {
                                          swal('Advertencia', 'Ingrese el parentesco del beneficiario', 'warning');
                                        }
                                      } else {
                                        swal('Advertencia', 'Ingrese la eps anterior del beneficiario', 'warning');
                                      }
                                    } else {
                                      swal('Advertencia', 'Ingrese el correo del beneficiario', 'warning');
                                    }
                                  } else {
                                    swal('Advertencia', 'Ingrese el telefono celular del beneficiario', 'warning');
                                  }
                                } else {
                                  swal('Advertencia', 'Ingrese la ips de atención del beneficiario', 'warning');
                                }
                              } else {
                                swal('Advertencia', 'Ingrese el municipio del beneficiario', 'warning');
                              }
                            } else {
                              swal('Advertencia', 'Ingrese el departamento del beneficiario', 'warning');
                            }
                          } else {
                            swal('Advertencia', 'Ingrese la zona del beneficiario', 'warning');
                          }
                          } else {
                            swal('Advertencia', 'Ingrese el Barrio del beneficiario', 'warning');
                          }
                      } else {
                        swal('Advertencia', 'Ingrese la direccion del beneficiario', 'warning');
                      }
                      } else {
                        swal('Advertencia', 'Ingrese el sexo del beneficiario', 'warning');
                      }
                    } else {
                      swal('Advertencia', 'Ingrese la fecha nacimiento del beneficiario', 'warning');
                    }
                  } else {
                    swal('Advertencia', 'Ingrese el segundo apellido del beneficiario', 'warning');
                  }
                } else {
                  swal('Advertencia', 'Ingrese el primer apellido del beneficiario', 'warning');
                }
              } else {
                swal('Advertencia', 'Ingrese el primer nombre del beneficiario', 'warning');
              }
            } else {
              swal('Advertencia', 'Ingrese el número de documento del beneficiario', 'warning');
            }
          } else {
            swal('Advertencia', 'Ingrese el tipo documento del beneficiario', 'warning');
          }
        } else {
          swal('Mensaje', 'Solo se permite el ingreso de 5 beneficiarios', 'info');
        }
      }
  $scope.editar_beneficiario_inclusion = function (beneficiario) {
    $scope.afi_beneficiarios.tipo_documento_beneficiario = beneficiario.tipo_documento;
    $scope.afi_beneficiarios.numero_documento_beneficiario = beneficiario.documento;
    $scope.afi_beneficiarios.primer_nombre_beneficiario = beneficiario.primer_nombre;
    $scope.afi_beneficiarios.segundo_nombre_beneficiario = beneficiario.segundo_nombre;
    $scope.afi_beneficiarios.primer_apellido_beneficiario = beneficiario.primer_apellido;
    $scope.afi_beneficiarios.segundo_apellido_beneficiario = beneficiario.segundo_apellido;
    $scope.afi_beneficiarios.fecha_nacimiento_beneficiario = $scope.format_date(0, beneficiario.fecha_nacimiento);
    $scope.afi_beneficiarios.sexo_beneficiario = beneficiario.sexo;
    $scope.afi_beneficiarios.ubicacion_beneficiario = 'NO';
    $scope.afi_beneficiarios.direccion_beneficiario = beneficiario.direccion;
    $scope.afi_beneficiarios.barrio_beneficiario = beneficiario.barrio;
    $scope.afi_beneficiarios.departamento_beneficiario = beneficiario.departamento + "-" + beneficiario.nom_departamento;
    document.querySelector("#afi_beneficiarios_departamento_beneficiario").value = $scope.afi_beneficiarios.departamento_beneficiario;
    $scope.afi_beneficiarios.municipio_beneficiario = beneficiario.ubicacion + "-" + beneficiario.nom_municipio;
    document.querySelector("#afi_beneficiarios_municipio_beneficiario").value = $scope.afi_beneficiarios.municipio_beneficiario;
    $scope.afi_beneficiarios.zona_beneficiario = beneficiario.zona;
    $scope.afi_beneficiarios.ips_atencion_beneficiario = beneficiario.ips;
    $scope.afi_beneficiarios.telefono_f_beneficiario = beneficiario.telefono;
    $scope.afi_beneficiarios.telefono_c_beneficiario = beneficiario.celular;
    $scope.afi_beneficiarios.correo_beneficiario = beneficiario.correo;
    $scope.afi_beneficiarios.eps_anterior = beneficiario.eps_ant + "-" + beneficiario.nom_eps_ant;
    document.querySelector("#afi_beneficiarios_eps_anterior").value = $scope.afi_beneficiarios.eps_anterior;
    $scope.afi_beneficiarios.parentesco = beneficiario.parentesco + "-" + beneficiario.nom_parentesco;
    document.querySelector("#afi_beneficiarios_parentesco").value = $scope.afi_beneficiarios.parentesco;
    $scope.borrar_beneficiario_inclusion(beneficiario);
  }
  $scope.borrar_beneficiario_inclusion = function (beneficiario) {
    let i = $scope.afi_beneficiarios.listado_beneficiarios.findIndex(elemt => elemt.documento == beneficiario.documento);
    if (i != -1) {
      $scope.afi_beneficiarios.listado_beneficiarios.splice(i, 1);
      $scope.borrar_soportes_beneficiario_inclusion(beneficiario);
    }
  }
  $scope.borrar_soportes_beneficiario_inclusion = function (beneficiario) {
    if ($scope.afi_beneficiarios.listado_beneficiarios.length < 1) {
      $scope.afi_beneficiarios.listado_soportes_beneficiarios = [];
    } else {
      for (let i = 0; i < $scope.afi_beneficiarios.listado_soportes_beneficiarios.length; i++) {
        let ii = $scope.afi_beneficiarios.listado_soportes_beneficiarios.findIndex(elemt => elemt.documento == beneficiario.documento);
        if (ii != -1) {
          $scope.afi_beneficiarios.listado_soportes_beneficiarios.splice(ii, 1);
          console.log($scope.afi_beneficiarios.listado_soportes_beneficiarios);
        }
      }
    }
  }
  $scope.limpiar_datos_beneficiario_inclusion = function () {
    // $scope.afi_beneficiarios.tipo_documento_beneficiario = "";
    // $scope.afi_beneficiarios.numero_documento_beneficiario = "";
    $scope.afi_beneficiarios.primer_nombre_beneficiario = "";
    $scope.afi_beneficiarios.segundo_nombre_beneficiario = "";
    $scope.afi_beneficiarios.primer_apellido_beneficiario = "";
    $scope.afi_beneficiarios.segundo_apellido_beneficiario = "";
    $scope.afi_beneficiarios.fecha_nacimiento_beneficiario = "";
    $scope.afi_beneficiarios.sexo_beneficiario = "";
    $scope.afi_beneficiarios.parentesco = "";
    $scope.afi_beneficiarios.eps_anterior = "";
    $scope.afi_beneficiarios.ubicacion_beneficiario = "";
    $scope.afi_beneficiarios.departamento_beneficiario = "";
    $scope.afi_beneficiarios.municipio_beneficiario = "";
    $scope.afi_beneficiarios.direccion_beneficiario = "";
    $scope.afi_beneficiarios.barrio_beneficiario = "";
    $scope.afi_beneficiarios.zona_beneficiario = "";
    $scope.afi_beneficiarios.telefono_f_beneficiario = "";
    $scope.afi_beneficiarios.telefono_c_beneficiario = "";
    $scope.afi_beneficiarios.correo_beneficiario = "";
    $scope.afi_beneficiarios.ips_atencion_beneficiario = "";
    $scope.afi_beneficiarios.fecha_sgsss = "";
  }
  $scope.afi_beneficiarios.paquete = "74";
  $scope.cargar_soportes_inclusion = function () {
    if ($scope.afi_beneficiarios.paquete != "") {
      if ($scope.afi_beneficiarios.tipo_documento != "" && $scope.afi_beneficiarios.numero_documento != "") {
        $scope.paquete = $scope.afi_beneficiarios.paquete;
        $scope.tipo_documento = $scope.afi_beneficiarios.tipo_documento;
        $scope.documento = $scope.afi_beneficiarios.numero_documento;
        $scope.TipoRes = 'CA';
        $scope.tipo_digitalizacion = 1;
        ngDialog.open({
          template: 'views/digitalizacion/modal/cargaanexoAF.html',
          className: 'ngdialog-theme-plain',
          controller: 'DigitalizacionControllerAF',
          scope: $scope,
          preCloseCallback: function (response) {
            if (validar_json(angular.toJson(response))) {
              if (response.codigo == 0) {
                $scope.afi_beneficiarios.listado_soportes = response.rutas;
              } else {
                $scope.afi_beneficiarios.listado_soportes = new Array();
              }
            } else {
              $scope.afi_beneficiarios.listado_soportes = new Array();
              swal('Mensaje', 'No se cargaron los soportes correctamente, intentelo nuevamente', 'info');
            }
            setTimeout(() => {
              document.querySelector("#listado_soportes_inclusion").scrollIntoView();
            }, 2500);
            return true;
          }
        })
      } else {
        swal('Mensaje', 'El tipo de documento y documento del cotizante no pueden estar vacios', 'warning');
      }
    } else {
      swal('Mensaje', 'Paquete no valido al elegir Tipo de cotizante:' + $scope.afiliacion.paquete, 'warning');
    }
  }
  $scope.insertar_solicitud_inclucion_beneficiarios = function () {
    swal({
      title: 'Confirmar Proceso',
      text: "¿Desea crear la solicitud de Inclusió de Beneficiarios?",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(function (result) {
      if (result) {
        var dep_aportante = "",
          mun_aportante = "",
          dep_cotizante = "",
          mun_cotizante = "";

        if ($scope.afi_beneficiarios.listado_beneficiarios.length == 0) {
          document.querySelector("#listado_beneficiarios_inclusion").scrollIntoView();
          notification.getNotification('warning', 'Debe incluir por lo menos un beneficiario al listado de beneficiarios', 'Advertencia');
          return false;
        }
        if ($scope.afi_beneficiarios.listado_soportes_beneficiarios.length == 0) {
          document.querySelector("#listado_soportes_inclusion").scrollIntoView();
          notification.getNotification('warning', 'Debe incluir todos los soportes obligatorios dependien el tipo de paquete seleccionado', 'Advertencia');
          return false;
        }
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'insertar_solicitud',
            condicion: "",
            tipo_cotizante: "",
            tipo_doc_aportante: "",
            doc_aportante: "",
            tipo_doc_cotizante: $scope.afi_beneficiarios.tipo_documento,
            doc_cotizante: $scope.afi_beneficiarios.numero_documento,
            pri_nombre: "",
            seg_nombre: "",
            pri_apellido: "",
            seg_apellido: "",
            nacimiento: "",
            genero: "",
            estado_civil: "",
            direccion: "",
            ubicacion_geografica: "",
            zona: "",
            escenario: "",
            telef: "",
            celular: "",
            correo: "",
            afp: "",
            arl: "",
            salario: "",
            ingreso: "",
            actividad: "",
            origen: "S",
            beneficiarios: angular.toJson($scope.afi_beneficiarios.listado_beneficiarios),
            cantidad: $scope.afi_beneficiarios.listado_beneficiarios.length,
            soportes: "",
            cantidad_soportes: "",
            soportes_beneficiarios: angular.toJson($scope.afi_beneficiarios.listado_soportes_beneficiarios),
            cantidad_soportes_beneficiarios: $scope.afi_beneficiarios.listado_soportes_beneficiarios.length,
            tipo_solicitud: "I",
            barrio_cotizante: ""
          }
        }).then(function (response) {
          swal.close();
          if (validar_json(angular.toJson(response.data))) {
            if (response.data.codigo == 0) {
              $scope.limpiar_datos_cotizante_inclusion();
              swal('Mensaje', response.data.mensaje, 'success');
              //CNVU
              setTimeout(function () {
                swal.close();
                $scope.$apply();
              }, 7000);
              //CNVU
            } else {
              swal('Mensaje', response.data.mensaje, 'warning');
            }
          } else {
            swal('Mensaje', 'Error al crear la solicitud', 'error');
          }
        });
      }
    }).catch(swal.noop);
  }
$scope.cargar_soportes_beneficiario = function (doc) {
    // $scope.afiliacion.paquete = "102";
    //if ($scope.afiliacion.paquete != "") {
      if ($scope.afiliacion.tipo_documento_beneficiario != "" && $scope.afiliacion.tipo_documento_beneficiario != undefined && $scope.afiliacion.tipo_documento_beneficiario != null
        && $scope.afiliacion.numero_documento_beneficiario != "" && $scope.afiliacion.numero_documento_beneficiario != undefined && $scope.afiliacion.numero_documento_beneficiario != null) {
        // CNVU
        if ($scope.afiliacion.primer_nombre_beneficiario != "" && $scope.afiliacion.primer_nombre_beneficiario != undefined && $scope.afiliacion.primer_nombre_beneficiario != null) {
          if ($scope.afiliacion.primer_apellido_beneficiario != "" && $scope.afiliacion.primer_apellido_beneficiario != undefined && $scope.afiliacion.primer_apellido_beneficiario != null) {
            if ($scope.afiliacion.fecha_nacimiento_beneficiario != "" && $scope.afiliacion.fecha_nacimiento_beneficiario != undefined && $scope.afiliacion.fecha_nacimiento_beneficiario != null
              && $scope.afiliacion.sexo_beneficiario != "" && $scope.afiliacion.sexo_beneficiario != undefined && $scope.afiliacion.sexo_beneficiario != null) {
              if ($scope.afiliacion.direccion_beneficiario != "" && $scope.afiliacion.direccion_beneficiario != undefined && $scope.afiliacion.direccion_beneficiario != null
                && $scope.afiliacion.departamento_beneficiario != "" && $scope.afiliacion.departamento_beneficiario != undefined && $scope.afiliacion.departamento_beneficiario != null) {
                if ($scope.afiliacion.municipio_beneficiario != "" && $scope.afiliacion.municipio_beneficiario != undefined && $scope.afiliacion.municipio_beneficiario != null
                  && $scope.afiliacion.zona_beneficiario != "" && $scope.afiliacion.zona_beneficiario != undefined && $scope.afiliacion.zona_beneficiario != null) {
                  if ($scope.afiliacion.ips_atencion_beneficiario != "" && $scope.afiliacion.ips_atencion_beneficiario != undefined && $scope.afiliacion.ips_atencion_beneficiario != null
                    && $scope.afiliacion.telefono_c_beneficiario != "" && $scope.afiliacion.telefono_c_beneficiario != undefined && $scope.afiliacion.telefono_c_beneficiario != null && $scope.afiliacion.telefono_c_cotizante.toString().length <= 10) {
                    if ($scope.afiliacion.eps_anterior != "" && $scope.afiliacion.eps_anterior != undefined && $scope.afiliacion.eps_anterior != null) {
                      if ($scope.afiliacion.parentesco != "" && $scope.afiliacion.parentesco != undefined && $scope.afiliacion.parentesco != null) {
                        $scope.paquete = $scope.afiliacion.paquete_beneficiario;//"102";
                        $scope.tipo_documento = $scope.afiliacion.tipo_documento_beneficiario;
                        $scope.documento = $scope.afiliacion.numero_documento_beneficiario;
                        $scope.TipoRes = 'CA';
                        $scope.tipo_digitalizacion = 1;
                        ngDialog.open({
                          template: 'views/digitalizacion/modal/cargaanexoAF.html',
                          className: 'ngdialog-theme-plain',
                          controller: 'DigitalizacionControllerAF',
                          scope: $scope,
                          preCloseCallback: function (response) {
                            if (validar_json(angular.toJson(response))) {
                              console.log(response);
                              if (response.codigo == 0) {
                                //$scope.afiliacion.listado_soportes_beneficiarios = response.rutas;
                                for (let i = 0; i < response.rutas.length; i++) {
                                  $scope.afiliacion.listado_soportes_beneficiarios.push({
                                    tipo_doc: $scope.tipo_documento,
                                    documento: $scope.documento.toString(),
                                    ruta_archivo: response.rutas[i].ruta,
                                    tipo_archivo: response.rutas[i].tipo,
                                    nombre_archivo: response.rutas[i].nombre,
                                    ftp: response.rutas[i].ftp
                                  });
                                }
                                console.log($scope.afiliacion.listado_soportes_beneficiarios);
                              } else {
                                //$scope.afiliacion.listado_soportes_beneficiarios = [];
                                for (let i = 0; i < $scope.afiliacion.listado_soportes_beneficiarios.length; i++) {
                                  let ii = $scope.afiliacion.listado_soportes_beneficiarios.findIndex(elemt => elemt.documento == doc);
                                  if (ii != -1) {
                                    $scope.afiliacion.listado_soportes_beneficiarios.splice(ii, 1);
                                    console.log($scope.afiliacion.listado_soportes_beneficiarios);
                                  }
                                }
                              }
                            } else {
                              //$scope.afiliacion.listado_soportes_beneficiarios = [];
                              for (let i = 0; i < $scope.afiliacion.listado_soportes_beneficiarios.length; i++) {
                                let ii = $scope.afiliacion.listado_soportes_beneficiarios.findIndex(elemt => elemt.documento == doc);
                                if (ii != -1) {
                                  $scope.afiliacion.listado_soportes_beneficiarios.splice(ii, 1);
                                  console.log($scope.afiliacion.listado_soportes_beneficiarios);
                                }
                              }
                              swal('Mensaje', 'No se cargaron los soportes correctamente, intentelo nuevamente', 'info');
                            }
                            setTimeout(() => {
                              document.querySelector("#listado_soportes").scrollIntoView();
                            }, 2500);
                            return true;
                          }
                        });
                      } else {
                        swal('Mensaje', 'Ingrese el parentesco del beneficiario.', 'warning');
                      }
                    } else {
                      swal('Mensaje', 'Ingrese el correo electrónico o la eps anterior del beneficiario.', 'warning');
                    }
                  } else {
                    swal('Mensaje', 'Ingrese la ips de atención o el celular del beneficiario.', 'warning');
                  }
                } else {
                  swal('Mensaje', 'Ingrese el municipio o la zona del beneficiario.', 'warning');
                }
              } else {
                swal('Mensaje', 'Ingrese la dirección o el departamento del beneficiario.', 'warning');
              }
            } else {
              swal('Mensaje', 'Ingrese la fecha de nacimiento o el sexo del beneficiario.', 'warning');
            }
          } else {
            swal('Mensaje', 'Ingrese el primer apellido del beneficiario.', 'warning');
          }
        } else {
          swal('Mensaje', 'Ingrese el primer nombre del beneficiario.', 'warning');
        }
        // CNVU
      } else {
        swal('Mensaje', 'Ingrese el tipo de documento o documento del beneficiario.', 'warning');
      }
    // } else {
    //   swal('Mensaje', 'Paquete no valido para el beneficiario.', 'warning');
    // }
  }
  // ------------------------------------------------------------------------------------------------------------- tab.4
  $scope.afi_cambio_ips = {
    tipo_documento: "",
    options_tipo_documento: new Array(),
    numero_documento: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    fecha_nacimiento: "",
    sexo: "",
    departamento: "",
    departamento_nombre: "",
    municipio: "",
    municipio_nombre: "",
    ips_atencion: "",
    options_ips_atencion: new Array(),
    motivo: "",
    options_motivo: new Array(),
    descripcion: "",
    listado_beneficiarios: new Array(),
    beneficiarios_agregados: new Array()
  };
  consultaHTTP.obtenerDocumento().then(function (response) {
    let arra_temp = new Array();
    response.Documento.forEach(element => {
      if (element.Codigo != "") {
        arra_temp.push(element);
      }
    });
    $scope.afi_cambio_ips.options_tipo_documento = arra_temp;
    $scope.afi_cambio_ips.tipo_documento = "";
  });
  $http({
    method: 'POST',
    url: "php/movilidad/afiliacion_linea.php",
    data: {
      function: 'lista_motivo_ips'
    }
  }).then(function (response) {
    if (validar_json(angular.toJson(response.data))) {
      $scope.afi_cambio_ips.options_motivo = response.data;
    } else {
      $scope.afi_cambio_ips.options_motivo = new Array();
      swal('Mensaje', 'Error al listar los motivos', 'error');
    }
    $scope.afi_cambio_ips.motivo = "";
  });
  $scope.buscar_cotizante_cambio_ips = function () {
    if ($scope.afi_cambio_ips.tipo_documento != undefined && $scope.afi_cambio_ips.numero_documento != undefined && $scope.afi_cambio_ips.tipo_documento != "" && $scope.afi_cambio_ips.numero_documento != "") {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      $http({
        method: 'POST',
        url: "php/movilidad/afiliacion_linea.php",
        data: {
          function: 'lista_datos_afiliado',
          tipo_doc: $scope.afi_cambio_ips.tipo_documento,
          documento: $scope.afi_cambio_ips.numero_documento
        }
      }).then(function (response) {
        swal.close();
        if (validar_json(angular.toJson(response.data)) && response.data.datos_basicos != null) {
          $scope.afi_cambio_ips.primer_nombre = response.data.datos_basicos.PRIMER_NOMBRE;
          $scope.afi_cambio_ips.segundo_nombre = response.data.datos_basicos.SEGUNDO_NOMBRE
          $scope.afi_cambio_ips.primer_apellido = response.data.datos_basicos.PRIMER_APELLIDO;
          $scope.afi_cambio_ips.segundo_apellido = response.data.datos_basicos.SEGUNDO_APELLIDO;
          $scope.afi_cambio_ips.fecha_nacimiento = $scope.format_date(0, response.data.datos_basicos.FECHA_NACIMIENTO);
          $scope.afi_cambio_ips.sexo = response.data.datos_basicos.GENERO;
          $scope.afi_cambio_ips.departamento = response.data.datos_basicos.COD_DEPARTAMENTO;
          $scope.afi_cambio_ips.departamento_nombre = response.data.datos_basicos.NOMBRE_DEPARTAMENTO;
          $scope.afi_cambio_ips.municipio = response.data.datos_basicos.COD_UBICACION;
          $scope.afi_cambio_ips.municipio_nombre = response.data.datos_basicos.NOMBRE_MUNICIPIO;
          $scope.afi_cambio_ips.listado_beneficiarios = response.data.beneficiarios;
          $scope.afi_cambio_ips.beneficiarios_agregados = new Array();
          $http({
            method: 'POST',
            url: "php/movilidad/afiliacion_linea.php",
            data: {
              function: 'lista_ips',
              ubicacion: response.data.datos_basicos.COD_UBICACION
            }
          }).then(function (response2) {
            if (validar_json(angular.toJson(response2.data))) {
              $scope.afi_cambio_ips.options_ips_atencion = response2.data;
              $scope.afi_cambio_ips.ips_atencion = response.data.datos_basicos.IPS_ACTUAL;;
            } else {
              $scope.afi_cambio_ips.options_ips_atencion = new Array();
              $scope.afi_cambio_ips.ips_atencion = "";
              swal('Mensaje', 'No se obtuvo resultados para el lista_ips', 'info');
            }
          });
          $scope.afi_cambio_ips.motivo = "";
          $scope.afi_cambio_ips.descripcion = "";
          document.querySelector("#afi_cambio_ips_motivo").focus();
        } else {
          $scope.afi_cambio_ips.primer_nombre = "";
          $scope.afi_cambio_ips.segundo_nombre = "";
          $scope.afi_cambio_ips.primer_apellido = "";
          $scope.afi_cambio_ips.segundo_apellido = "";
          $scope.afi_cambio_ips.fecha_nacimiento = "";
          $scope.afi_cambio_ips.sexo = "";
          $scope.afi_cambio_ips.departamento = "";
          $scope.afi_cambio_ips.departamento_nombre = "";
          $scope.afi_cambio_ips.municipio = "";
          $scope.afi_cambio_ips.municipio_nombre = "";
          $scope.afi_cambio_ips.listado_beneficiarios = new Array();
          $scope.afi_cambio_ips.beneficiarios_agregados = new Array();
          $scope.afi_cambio_ips.motivo = "";
          $scope.afi_cambio_ips.descripcion = "";
          $scope.afi_cambio_ips.ips_atencion = "";
          swal('Mensaje', 'No se obtuvo resultados para el cotizante: <br>' + $scope.afi_cambio_ips.tipo_documento + '-' + $scope.afi_cambio_ips.numero_documento, 'info');
        }
      });
    } else {
      swal('Advertencia', 'Ingrese los campos (tipo_documento, numero_documento)', 'warning');
    }
  }
  $scope.agregar_beneficiarios = function (index, value, beneficiario) {
    if (value) {
      var i = $scope.afi_cambio_ips.listado_beneficiarios.findIndex(elemt => elemt.DOCUMENTO_BEN == beneficiario.DOCUMENTO_BEN);
      if (i != -1) {
        $scope.afi_cambio_ips.beneficiarios_agregados.push({
          tipo_documento_ben: beneficiario.TIPO_DOCUMENTO_BEN,
          documento_ben: beneficiario.DOCUMENTO_BEN
        });
      }
    } else {
      var i = $scope.afi_cambio_ips.beneficiarios_agregados.findIndex(elemt => elemt.DOCUMENTO_BEN == beneficiario.DOCUMENTO_BEN);
      if (i != -1) {
        $scope.afi_cambio_ips.beneficiarios_agregados.splice(i, 1);
      }
    }
  }
  $scope.inserta_solicitud_cambio_ips = function () {
    let beneficiarios_l = $scope.afi_cambio_ips.listado_beneficiarios.length,
    beneficiarios_a_l = $scope.afi_cambio_ips.beneficiarios_agregados.length,
    nucleo;
    if (beneficiarios_a_l == 0) {
      nucleo = "N";
    } else if (beneficiarios_l == beneficiarios_a_l) {
      nucleo = "T";
    } else {
      nucleo = "P";
    }
    swal({
      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
      width: 200,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      animation: false
    });
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'inserta_solicitud_cambio_ips_mun',
        tipo_doc: $scope.afi_cambio_ips.tipo_documento,
        documento: $scope.afi_cambio_ips.numero_documento,
        tipo: "P",
        nucleo: nucleo,
        ubicacion: "",
        paquete: $scope.afi_cambio_ips.ips_atencion,
        causal: $scope.afi_cambio_ips.motivo,
        descripcion: $scope.afi_cambio_ips.descripcion,
        origen: "S",
        beneficiarios: angular.toJson($scope.afi_cambio_ips.beneficiarios_agregados),
        cantidad: beneficiarios_a_l
      }
    }).then(function (response) {
      swal.close();
      if (validar_json(angular.toJson(response.data))) {
        if (response.data.codigo == 0) {
          $scope.afi_cambio_ips.primer_nombre = "";
          $scope.afi_cambio_ips.segundo_nombre = "";
          $scope.afi_cambio_ips.primer_apellido = "";
          $scope.afi_cambio_ips.segundo_apellido = "";
          $scope.afi_cambio_ips.fecha_nacimiento = "";
          $scope.afi_cambio_ips.sexo = "";
          $scope.afi_cambio_ips.departamento = "";
          $scope.afi_cambio_ips.departamento_nombre = "";
          $scope.afi_cambio_ips.municipio = "";
          $scope.afi_cambio_ips.municipio_nombre = "";
          $scope.afi_cambio_ips.listado_beneficiarios = new Array();
          $scope.afi_cambio_ips.beneficiarios_agregados = new Array();
          $scope.afi_cambio_ips.motivo = "";
          $scope.afi_cambio_ips.descripcion = "";
          $scope.afi_cambio_ips.ips_atencion = "";
          $scope.afi_cambio_ips.options_ips_atencion = new Array();
          swal('Mensaje', response.data.mensaje, 'success');
        } else {
          swal('Mensaje', response.data.mensaje, 'warning');
        }
      } else {
        swal('Mensaje', 'Error al crear la solicitud', 'error');
      }
    });
  }
  // ------------------------------------------------------------------------------------------------------------- tab.5
  $scope.afi_cambio_municipio = {
    tipo_documento: "",
    options_tipo_documento: new Array(),
    numero_documento: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    fecha_nacimiento: "",
    sexo: "",
    departamento: "",
    options_departamento: new Array(),
    municipio: "",
    options_municipio: new Array(),
    ips_atencion: "",
    options_ips_atencion: new Array(),
    motivo: "",
    options_motivo: new Array(),
    descripcion: "",
    listado_beneficiarios: new Array(),
    beneficiarios_agregados: new Array()
  };
  consultaHTTP.obtenerDocumento().then(function (response) {
    let arra_temp = new Array();
    response.Documento.forEach(element => {
      if (element.Codigo != "") {
        arra_temp.push(element);
      }
    });
    $scope.afi_cambio_municipio.options_tipo_documento = arra_temp;
    $scope.afi_cambio_municipio.tipo_documento = "";
  });
  $http({
    method: 'POST',
    url: "php/movilidad/afiliacion_linea.php",
    data: {
      function: 'lista_departamento',
      coincidencia: ''
    }
  }).then(function (response2) {
    if (validar_json(angular.toJson(response2.data))) {
      $scope.afi_cambio_municipio.options_departamento = response2.data;
    } else {
      $scope.afi_cambio_municipio.options_departamento = new Array();
      swal('Mensaje', 'No se obtuvo resultados para el lista_departamento', 'info');
    }
  });
  $http({
    method: 'POST',
    url: "php/movilidad/afiliacion_linea.php",
    data: {
      function: 'lista_motivo_ips'
    }
  }).then(function (response) {
    if (validar_json(angular.toJson(response.data))) {
      $scope.afi_cambio_municipio.options_motivo = response.data;
    } else {
      $scope.afi_cambio_municipio.options_motivo = new Array();
      swal('Mensaje', 'Error al listar los motivos', 'error');
    }
    $scope.afi_cambio_municipio.motivo = "";
  });
  $scope.buscar_cotizante_cambio_municipio = function () {
    if ($scope.afi_cambio_municipio.tipo_documento != undefined && $scope.afi_cambio_municipio.numero_documento != undefined && $scope.afi_cambio_municipio.tipo_documento != "" && $scope.afi_cambio_municipio.numero_documento != "") {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      $http({
        method: 'POST',
        url: "php/movilidad/afiliacion_linea.php",
        data: {
          function: 'lista_datos_afiliado',
          tipo_doc: $scope.afi_cambio_municipio.tipo_documento,
          documento: $scope.afi_cambio_municipio.numero_documento
        }
      }).then(function (response) {
        swal.close();
        if (validar_json(angular.toJson(response.data)) && response.data.datos_basicos != null) {
          $scope.afi_cambio_municipio.primer_nombre = response.data.datos_basicos.PRIMER_NOMBRE;
          $scope.afi_cambio_municipio.segundo_nombre = response.data.datos_basicos.SEGUNDO_NOMBRE
          $scope.afi_cambio_municipio.primer_apellido = response.data.datos_basicos.PRIMER_APELLIDO;
          $scope.afi_cambio_municipio.segundo_apellido = response.data.datos_basicos.SEGUNDO_APELLIDO;
          $scope.afi_cambio_municipio.fecha_nacimiento = $scope.format_date(0, response.data.datos_basicos.FECHA_NACIMIENTO);
          $scope.afi_cambio_municipio.sexo = response.data.datos_basicos.GENERO;
          setTimeout(() => {
            $scope.afi_cambio_municipio.departamento = response.data.datos_basicos.COD_DEPARTAMENTO;
            $scope.$apply();
          }, 100);
          $http({
            method: 'POST',
            url: "php/movilidad/afiliacion_linea.php",
            data: {
              function: 'lista_municipio',
              departamento: response.data.datos_basicos.COD_DEPARTAMENTO,
              coincidencia: ''
            }
          }).then(function (response3) {
            if (validar_json(angular.toJson(response3.data))) {
              $scope.afi_cambio_municipio.options_municipio = response3.data;
              setTimeout(() => {
                $scope.afi_cambio_municipio.municipio = response.data.datos_basicos.COD_UBICACION;
              }, 100);
            } else {
              $scope.afi_cambio_municipio.options_municipio = new Array();
              $scope.afi_cambio_municipio.municipio = "";
              swal('Mensaje', 'No se obtuvo resultados para el lista_municipio', 'info');
            }
          });
          $scope.afi_cambio_municipio.listado_beneficiarios = response.data.beneficiarios;
          $scope.afi_cambio_municipio.beneficiarios_agregados = new Array();
          $http({
            method: 'POST',
            url: "php/movilidad/afiliacion_linea.php",
            data: {
              function: 'lista_ips',
              ubicacion: response.data.datos_basicos.COD_UBICACION
            }
          }).then(function (response4) {
            if (validar_json(angular.toJson(response4.data))) {
              $scope.afi_cambio_municipio.options_ips_atencion = response4.data;
              $scope.afi_cambio_municipio.ips_atencion = response.data.datos_basicos.IPS_ACTUAL;
            } else {
              $scope.afi_cambio_municipio.options_ips_atencion = new Array();
              $scope.afi_cambio_municipio.ips_atencion = "";
              swal('Mensaje', 'No se obtuvo resultados para el lista_ips', 'info');
            }
          });
          $scope.afi_cambio_municipio.motivo = "";
          $scope.afi_cambio_municipio.descripcion = "";
          document.querySelector("#afi_cambio_municipio_motivo").focus();
        } else {
          $scope.afi_cambio_municipio.primer_nombre = "";
          $scope.afi_cambio_municipio.segundo_nombre = "";
          $scope.afi_cambio_municipio.primer_apellido = "";
          $scope.afi_cambio_municipio.segundo_apellido = "";
          $scope.afi_cambio_municipio.fecha_nacimiento = "";
          $scope.afi_cambio_municipio.sexo = "";
          $scope.afi_cambio_municipio.departamento = "";
          $scope.afi_cambio_municipio.departamento_nombre = "";
          $scope.afi_cambio_municipio.municipio = "";
          $scope.afi_cambio_municipio.municipio_nombre = "";
          $scope.afi_cambio_municipio.listado_beneficiarios = new Array();
          $scope.afi_cambio_municipio.beneficiarios_agregados = new Array();
          $scope.afi_cambio_municipio.motivo = "";
          $scope.afi_cambio_municipio.descripcion = "";
          $scope.afi_cambio_municipio.ips_atencion = "";
          swal('Mensaje', 'No se obtuvo resultados para el cotizante: <br>' + $scope.afi_cambio_municipio.tipo_documento + '-' + $scope.afi_cambio_municipio.numero_documento, 'info');
        }
      });
} else {
  swal('Advertencia', 'Ingrese los campos (tipo_documento, numero_documento)', 'warning');
}
}
$scope.municipio_atencion = function (departamento) {
  if (departamento != undefined && departamento != null && departamento != "") {
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'lista_municipio',
        departamento: departamento,
        coincidencia: ''
      }
    }).then(function (response) {
      $scope.afi_cambio_municipio.municipio = "";
      $scope.afi_cambio_municipio.options_municipio = new Array();
      if (validar_json(angular.toJson(response.data))) {
        $scope.afi_cambio_municipio.options_municipio = response.data;
      } else {
        swal('Mensaje', 'No se obtuvo resultados para el lista_municipio', 'info');
      }
    });
  }
}
$scope.cambiar_ips_atencion = function (municipio) {
  if (municipio != undefined && municipio != null && municipio != "") {
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'lista_ips',
        ubicacion: municipio
      }
    }).then(function (response4) {
      $scope.afi_cambio_municipio.ips_atencion = "";
      $scope.afi_cambio_municipio.options_ips_atencion = new Array();
      if (validar_json(angular.toJson(response4.data))) {
        $scope.afi_cambio_municipio.options_ips_atencion = response4.data;
      } else {
        swal('Mensaje', 'No se obtuvo resultados para el lista_ips', 'info');
      }
    });
  }
}
$scope.agregar_beneficiarios_cambio_municipio = function (index, value, beneficiario) {
  if (value) {
    var i = $scope.afi_cambio_municipio.listado_beneficiarios.findIndex(elemt => elemt.DOCUMENTO_BEN == beneficiario.DOCUMENTO_BEN);
    if (i != -1) {
      $scope.afi_cambio_municipio.beneficiarios_agregados.push({
        tipo_documento_ben: beneficiario.TIPO_DOCUMENTO_BEN,
        documento_ben: beneficiario.DOCUMENTO_BEN
      });
    }
  } else {
    var i = $scope.afi_cambio_municipio.beneficiarios_agregados.findIndex(elemt => elemt.DOCUMENTO_BEN == beneficiario.DOCUMENTO_BEN);
    if (i != -1) {
      $scope.afi_cambio_municipio.beneficiarios_agregados.splice(i, 1);
    }
  }
}
$scope.inserta_solicitud_cambio_municipio = function () {
  let beneficiarios_l = $scope.afi_cambio_municipio.listado_beneficiarios.length,
  beneficiarios_a_l = $scope.afi_cambio_municipio.beneficiarios_agregados.length,
  nucleo;
  if (beneficiarios_a_l == 0) {
    nucleo = "N";
  } else if (beneficiarios_l == beneficiarios_a_l) {
    nucleo = "T";
  } else {
    nucleo = "P";
  }
  swal({
    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
    width: 200,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    animation: false
  });
  $http({
    method: 'POST',
    url: "php/movilidad/afiliacion_linea.php",
    data: {
      function: 'inserta_solicitud_cambio_ips_mun',
      tipo_doc: $scope.afi_cambio_municipio.tipo_documento,
      documento: $scope.afi_cambio_municipio.numero_documento,
      tipo: "M",
      nucleo: nucleo,
      ubicacion: $scope.afi_cambio_municipio.municipio,
      paquete: $scope.afi_cambio_municipio.ips_atencion,
      causal: $scope.afi_cambio_municipio.motivo,
      descripcion: $scope.afi_cambio_municipio.descripcion,
      origen: "S",
      beneficiarios: angular.toJson($scope.afi_cambio_municipio.beneficiarios_agregados),
      cantidad: beneficiarios_a_l
    }
  }).then(function (response) {
    swal.close();
    if (validar_json(angular.toJson(response.data))) {
      if (response.data.codigo == 0) {
        $scope.afi_cambio_municipio.primer_nombre = "";
        $scope.afi_cambio_municipio.segundo_nombre = "";
        $scope.afi_cambio_municipio.primer_apellido = "";
        $scope.afi_cambio_municipio.segundo_apellido = "";
        $scope.afi_cambio_municipio.fecha_nacimiento = "";
        $scope.afi_cambio_municipio.sexo = "";
        $scope.afi_cambio_municipio.departamento = "";
        $scope.afi_cambio_municipio.departamento_nombre = "";
        $scope.afi_cambio_municipio.municipio = "";
        $scope.afi_cambio_municipio.municipio_nombre = "";
        $scope.afi_cambio_municipio.listado_beneficiarios = new Array();
        $scope.afi_cambio_municipio.beneficiarios_agregados = new Array();
        $scope.afi_cambio_municipio.motivo = "";
        $scope.afi_cambio_municipio.descripcion = "";
        $scope.afi_cambio_municipio.ips_atencion = "";
        swal('Mensaje', response.data.mensaje, 'success');
      } else {
        swal('Mensaje', response.data.mensaje, 'warning');
      }
    } else {
      swal('Mensaje', 'Error al crear la solicitud', 'error');
    }
  });
}
  // ------------------------------------------------------------------------------------------------------------- tab.6
  // CNVU
  $scope.afi_cambio_datos = {
    tipo_documento: "",
    options_tipo_documento: new Array(),
    numero_documento: "",
    telefono_f_cotizante: "",
    telefono_c_cotizante: "",
    telefono_c2_cotizante: "",
    correo_cotizante: "",
    direccion_cotizante: ""
  };
  consultaHTTP.obtenerDocumento().then(function (response) {
    let arra_temp = new Array();
    response.Documento.forEach(element => {
      if (element.Codigo != "") {
        arra_temp.push(element);
      }
    });
    $scope.afi_cambio_datos.options_tipo_documento = arra_temp;
    $scope.afi_cambio_datos.tipo_documento = "";
  });
  $scope.buscar_cotizante_cambio_datos = function () {
    if ($scope.afi_cambio_datos.tipo_documento != undefined && $scope.afi_cambio_datos.numero_documento != undefined && $scope.afi_cambio_datos.tipo_documento != "" && $scope.afi_cambio_datos.numero_documento != "") {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      $http({
        method: 'POST',
        url: "php/movilidad/afiliacion_linea.php",
        data: {
          function: 'lista_datos_afiliado',
          tipo_doc: $scope.afi_cambio_datos.tipo_documento,
          documento: $scope.afi_cambio_datos.numero_documento
        }
      }).then(function (response) {
        swal.close();
        if (validar_json(angular.toJson(response.data)) && response.data.datos_basicos != null) {
          $scope.afi_cambio_datos.telefono_f_cotizante = parseInt(response.data.datos_basicos.TELEFONO);
          $scope.afi_cambio_datos.telefono_c_cotizante = response.data.datos_basicos.CELULAR
          $scope.afi_cambio_datos.telefono_c2_cotizante = response.data.datos_basicos.CELULAR2;
          $scope.afi_cambio_datos.correo_cotizante = response.data.datos_basicos.CORREO;
          $scope.afi_cambio_datos.direccion_cotizante = response.data.datos_basicos.DIRECCION;
          $scope.afi_cambio_datos.barrio_cotizante = response.data.datos_basicos.BARRIO;
        } else {
          $scope.afi_cambio_datos.telefono_f_cotizante = "";
          $scope.afi_cambio_datos.telefono_c_cotizante = "";
          $scope.afi_cambio_datos.telefono_c2_cotizante = "";
          $scope.afi_cambio_datos.correo_cotizante = "";
          $scope.afi_cambio_datos.direccion_cotizante = "";
          $scope.afi_cambio_datos.barrio_cotizante = "";
          swal('Mensaje', 'No se obtuvo resultados para el cotizante: <br>' + $scope.afi_cambio_datos.tipo_documento + '-' + $scope.afi_cambio_datos.numero_documento, 'info');
        }
      });
    } else {
      swal('Advertencia', 'Ingrese los campos (tipo_documento, numero_documento)', 'warning');
    }
  }
  $scope.inserta_solicitud_actualizar_datos = function () {
    swal({
      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
      width: 200,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      animation: false
    });
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'inserta_solicitud_actualizar_datos',
        tipo_doc: $scope.afi_cambio_datos.tipo_documento,
        documento: $scope.afi_cambio_datos.numero_documento,
        telefono: $scope.afi_cambio_datos.telefono_f_cotizante,
        celular: $scope.afi_cambio_datos.telefono_c_cotizante,
        celular_dos: $scope.afi_cambio_datos.telefono_c2_cotizante,
        correo: $scope.afi_cambio_datos.correo_cotizante,
        direccion: $scope.afi_cambio_datos.direccion_cotizante,
        barrio: $scope.afi_cambio_datos.barrio_cotizante,
      }
    }).then(function (response) {
      swal.close();
      if (validar_json(angular.toJson(response.data))) {
        if (response.data.codigo == 0) {
          $scope.afi_cambio_datos.telefono_f_cotizante = "";
          $scope.afi_cambio_datos.telefono_c_cotizante = "";
          $scope.afi_cambio_datos.telefono_c2_cotizante = "";
          $scope.afi_cambio_datos.correo_cotizante = "";
          $scope.afi_cambio_datos.direccion_cotizante = "";
          $scope.afi_cambio_datos.barrio_cotizante = "";
          swal('Mensaje', response.data.mensaje, 'success');
          setTimeout(function () {
            swal.close();
            $scope.$apply();
          }, 7000);
        } else {
          swal('Mensaje', response.data.mensaje, 'warning');
          setTimeout(function () {
            swal.close();
            $scope.$apply();
          }, 7000);
        }
      } else {
        swal('Mensaje', 'Error al crear la solicitud', 'error');
        setTimeout(function () {
          swal.close();
          $scope.$apply();
        }, 7000);
      }
    });
  }
  $scope.imprimir_solicitud = function (solicitud) {
    console.log(solicitud);
    // window.open('views/movilidad/soporte/formulario_afi_re_no_sgsss.php?datos=' + JSON.stringify(solicitud), '_blank', "width=900,height=1100");
    var h = screen.height;
    var w = screen.width;
    var leftPos = screen.width - 960;
    if (solicitud.APORTANTE != null) {
      var aportantePOS = solicitud.APORTANTE.indexOf("&");
      if (aportantePOS != -1){
        solicitud.APORTANTE = solicitud.APORTANTE.replace("&","Y");
        solicitud.APORTANTEpos = aportantePOS;
      }else{
        solicitud.APORTANTE = solicitud.APORTANTE;
      }
    }
    window.open('views/movilidad/soporte/formulario_afi_re_no_sgsss.php?datos=' + JSON.stringify(solicitud), "customWindow", "width=960, height=" + h + ", top=0, left=0");
  }
  $scope.input_data_default = {
    formato: "",
    validate: [{
      size: 10,
      ext: ".pdf"
    }]
  };

  // Varible en donde se definen todos los input file(el nombre del objeto debe ser igual al id del input file) en el modulo y sus validaciones respectivas(peso y extencion soportado por el file).
  $scope.limpiar_input_ng_file = function (id) {
    if (id != undefined && id != null && id != "" && document.querySelector("#" + id) != undefined) {
      var input = document.querySelector("#" + id);
      $scope.input_data_default[id] = "";
      input.value = "";
      input.parentElement.dataset.file = input.dataset.name_default;
    } else {
      console.log("Error con el input file id:" + id);
    }
  }
  // Funcion que recibe el id del input file para limpiar sus valores.
  $scope.obtener_base_64 = function (file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(file[0].name);
      };
      reader.readAsDataURL(file[0]);
    });
  }
  $scope.obtener_url_ftp = function (base64, name, ext, location = "") {
    return new Promise(function (resolve, reject) {
      const d = new Date();
      let x = d.getTime();
      $http({
        method: 'POST',
        url: "php/intranet/intranet_procesos.php",
        data: {
          function: 'get_url_ftp',
          base64: angular.toJson(base64),
          name: name + '_'+x,
          ext: ext,
          location: location
        }
      }).then(function (response) {
        if (response.data != "0") {
          resolve(response.data.url);
        } else {
          reject(element.name);
        }
      });
    });
  }
  $scope.subir_formato = function () {
    // Validar si esta vacion o no el input
    if ($scope.input_data_default.formato.files != undefined && $scope.input_data_default.formato.files != null &&
      $scope.input_data_default.formato.files.length > 0) {
      $scope.dsb.btnSubirForm = true;
      $scope.obtener_base_64($scope.input_data_default.formato.files).then(function (base64) {
        var extencion = $scope.input_data_default.formato.files[0].name.split(".");
        //$scope.input_data_default.formato.files[0].name
        $scope.obtener_url_ftp(base64, extencion[0], extencion[extencion.length - 1],
          "Movilidad/Afiliaciones/Formatos").then(function (url_ftp) {
            // && url_ftp.hasOwnProperty('rutas') && url_ftp.hasOwnProperty('id')
            if (url_ftp != "") {
              $http({
                method: 'POST',
                url: "php/movilidad/afiliacion_linea.php",
                data: {
                  function: 'carga_formulario_secc',
                  solicitud: $scope.historial.solicitud.RADICADO,
                  ruta: url_ftp,
                  ftp: '3'
                }
              }).then(function (response) {
                $scope.cerrar_detalle();
                if (validar_json(angular.toJson(response.data)) && response.data != null) {
                  if (response.data.hasOwnProperty("codigo")) {
                    if (response.data.codigo == 0) {
                      swal('Mensaje', response.data.mensaje, 'success');
                      //CNVU
                      $scope.limpiar_input_ng_file($scope.input_data_default.formato.id);
                      $scope.dsb.btnSubirForm = false;
                      setTimeout(function () {
                        swal.close();
                        $scope.$apply();
                      }, 7000);
                      //CNVU
                    } else {
                      swal('Mensaje', response.data.mensaje, 'info');
                    }
                    setTimeout(() => {
                      $scope.lista_solicitud_afiliacion();
                    }, 1000);
                  } else {
                    swal('Mensaje', response.data, 'warning');
                  }
                } else {
                  swal('Mensaje', 'No se obtuvo resultados para el carga_formulario, intentelo de nuevo mas tarde', 'error');
                }
              });
            } else {
              swal('Mensaje', 'Url no valida, intenetelo de nuevo mas tarde', 'error');
            }
          }).catch(reason_ftp => {
            swal('Mensaje', 'No se pudo subir el archivo al servidor ftp: ' + reason_ftp, 'error');
          });
      }).catch(reason_b64 => {
        swal('Mensaje', 'No se pudo obtener el base64 del archivo: ' + reason_b64, 'error');
      });
    } else {
      swal('Mensaje', 'El archivo no se ha seleccionado', 'error');
    }
  }

  $scope.filter = function () {
    $scope.listDatosTemp = $filter('filter')($scope.historial.listado, $scope.q);
  }

  $scope.Obtener_Tipos_Documentos = function () {
      $http({
        method: 'POST',
        url: "php/genesis/funcgenesis.php",
        data: {
          function: 'Obtener_Tipos_Documentos',
          Tipo: 'S'
        }
      }).then(function (response) {
        if (response.data && response.data.toString().substr(0, 3) != '<br') {
          $scope.Tipos_Documentos = response.data;
        } else {
          swal({
            title: "¡Ocurrio un error!",
            text: response.data,
            type: "warning"
          }).catch(swal.noop);
        }
    });
  }
  $scope.Obtener_Tipos_Documentos();

  $scope.Obtener_Tipos_Documentos2 = function () {
      $http({
        method: 'POST',
        url: "php/genesis/funcgenesis.php",
        data: {
          function: 'Obtener_Tipos_Documentos',
          Tipo: 'C'
        }
      }).then(function (response) {
        if (response.data && response.data.toString().substr(0, 3) != '<br') {
          $scope.Tipos_Documentos2 = response.data;
        } else {
          swal({
            title: "¡Ocurrio un error!",
            text: response.data,
            type: "warning"
          }).catch(swal.noop);
        }
    });
  }
  $scope.Obtener_Tipos_Documentos2();
  // CNVU
}]);