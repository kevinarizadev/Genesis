'use strict';
angular.module('GenesisApp').controller('gestion_afiliacion_linea_controller', ['$scope', '$http', 'consultaHTTP', 'notification', 'ngDialog', 'afiliacionHttp', '$filter', function ($scope, $http, consultaHTTP, notification, ngDialog, afiliacionHttp, $filter) {
  $(document).ready(function () {
    $('.tabs').tabs();
    // document.querySelector("#afiempresa_tipo_cotizante").focus();
    // swal({
    //   html: "Señor Aportante en este acceso usted podrá disfrutar de nuestro servicio virtual de afiliación para movilidad régimen contributivo que hemos diseñado especialmente para usted. <br><br>La información que diligencie en los datos del cotizante y los beneficiarios debe ser acorde a los documentos de identidad de cada uno. Si se presentan inconsistencias en la información ingresada y los documentos anexos, el formulario será rechazado. ",
    //   width: 800,
    //   allowOutsideClick: false,
    //   allowEscapeKey: false,
    //   showConfirmButton: true,
    //   confirmButtonText: "Aceptar",
    //   animation: false
    // });
    // console.clear();
    console.log("1");
    //$scope.btns_gestion = true;
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
    document.getElementById("afiempresa_fecha_ingreso").setAttribute("max", today);
  });

  $.getJSON("php/obtenersession.php").done(function (respuesta) {
    $scope.sesdata = respuesta;
    if ($scope.sesdata.cedula == "32612938" || $scope.sesdata.cedula == "32856342" ||   $scope.sesdata.cedula == "55313031" 
      || $scope.sesdata.cedula == "1193146754" || $scope.sesdata.cedula == "1044394720" || $scope.sesdata.cedula == "1140857421" || $scope.sesdata.cedula == "1129523418") {
      $scope.btns_gestion = false;
    } else {
      $scope.btns_gestion = true;
    }
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
          document.querySelector("#afiempresa_tipo_cotizante").focus();
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
  $scope.historial = {
    listado: new Array(),
    estado: "N",
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
    fecha_inicio_relacion_l: "",
    fecha_fin_relacion_l: "",
    actividad_economica: "",
    diligenciador: "",
    barrio_cotizante: "",
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
    listado_soportes_beneficiarios: new Array(),
    options_motivos_rechazo: new Array()
  }
  $scope.limpiar_detalle_solicitud = function () {
    //$scope.historial.fecha_inicio = "";
    //$scope.historial.fecha_fin = "";
    $scope.historial.rechazo = "";
    $scope.historial.tipo_solicitud = "";
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
    $scope.historial.fecha_inicio_relacion_l = "";
    $scope.historial.fecha_fin_relacion_l = "";
    $scope.historial.listado_beneficiarios = new Array();
    $scope.historial.listado_soportes = new Array();
    $scope.historial.listado_soportes_beneficiarios = new Array();
  }
  $scope.cerrar_detalle = function () {
    $scope.historial.detalle = -1;
    $scope.historial.estado_detalle = "";
    $scope.limpiar_detalle_solicitud();
  }
  $scope.lista_solicitud_afiliacion = function (rad_unico) {
    $scope.filtro_tabla = rad_unico;
    swal({
      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
      width: 200,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      animation: false
    });
    $scope.cerrar_detalle();
    if ($scope.historial.estado == 'T' && ($scope.filtro_tabla == "" || $scope.filtro_tabla == undefined)) {
      swal('Información', 'El filtro TODOS requiere un documento valido.', 'info');
    }else{
      $http({
        method: 'POST',
        url: "php/movilidad/afiliacion_linea.php",
        data: {
          function: ($scope.filtro_tabla == undefined || $scope.filtro_tabla == "") ? 'lista_solicitudes_afiliacion' : 'lista_solicitudes_afiliacion_rad',
          origen: "N",
          estado: $scope.historial.estado,
          fecha_inicio: $scope.format_date(1, $scope.historial.fecha_inicio),
          fecha_fin: $scope.format_date(1, $scope.historial.fecha_fin),
          filtro: $scope.filtro_tabla
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
          // swal('Mensaje', 'No se obtuvo resultados para el lista_solicitudes_afiliacion', 'info');
        }
      });
    }
  }
  $scope.lista_solicitud_afiliacion();
  $scope.obtener_estado = function (codigo) {
    var estado = codigo;
    switch (codigo) {
      case 'N':
        estado = "PENDIENTE";
        break;
      case 'S':
        estado = "PROCESADO";
        break;
      case 'R':
        estado = "RECHAZADO";
        break;
    }
    return estado;
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
  $scope.ver_detalle_solicitud = function (solicitud) {
    //console.log($scope.btns_gestion);
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
      if (solicitud.ESTADO == 'N') {
        afiliacionHttp.serviceFDC(solicitud.COTIZANTE.split(" ")[0], solicitud.COTIZANTE.split(" ")[1], 'ObtenerFosyga').then(function (response) {
          $scope.adres_data = response.data;
          if (($scope.adres_data.EPS == 'CAJA DE COMPENSACIÓN FAMILIAR CAJACOPI ATLÁNTICO' 
            || $scope.adres_data.EPS == 'CAJA DE COMPENSACIÓN FAMILIAR CAJACOPI ATLÁNTICO - CM'
            || $scope.adres_data.EPS == 'CAJA DE COMPENSACIÓN FAMILIARCAJACOPI ATLÁNTICO') 
            && $scope.adres_data.FechaFinAfiliacion != "31/12/2999") {
              notification.getNotification('info', 'Afiliado presenta novedad solicitud de traslado, debe reportar afiliación a la EPS receptora.', 'Información');
          }
        });
      }
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
          $scope.historial.actividad_economica = response.data.datos_basicos.ACTIVIDAD_IND;
          $scope.historial.diligenciador = response.data.datos_basicos.NOMBRE_DILIGENCIADO;
          $scope.historial.motivo_rechazo = response.data.datos_basicos.MOTIVO_RECHAZO;
          $scope.historial.usuario_procesa_nal = response.data.datos_basicos.USUARIO_PROCESA_NAL;
          $scope.historial.barrio_cotizante = response.data.datos_basicos.BARRIO;

          if ($scope.historial.tipo_solicitud == 'Afiliación') {
            $scope.historial.fecha_inicio_relacion_l = $scope.format_date(0, response.data.datos_basicos.FECHA_INGRESO);
            $scope.historial.fecha_fin_relacion_l = "";
          } else {
            $scope.historial.fecha_inicio_relacion_l = "";
            $scope.historial.fecha_fin_relacion_l = "";
          }
          $scope.historial.listado_beneficiarios = response.data.beneficiarios;
          //$scope.historial.listado_soportes = response.data.adjuntos;
          // CNVU
          if (response.data.beneficiarios.length >= 1) {
            $scope.historial.listado_soportes = new Array();
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
                /*else{
                  $scope.historial.listado_soportes = new Array();
                }*/
              }
            }
          }else{
            $scope.historial.listado_soportes = response.data.adjuntos;
          }
          //console.log($scope.historial.listado_soportes);
          //console.log($scope.historial.listado_soportes_beneficiarios);
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
  $scope.imprimir_solicitud = function (solicitud) {
    //console.log(solicitud);
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
                  function: 'gestion_nacional',
                  numero: $scope.historial.detalle,
                  gestion: "R",
                  causal_rechazo: $scope.historial.rechazo,
                  modulo: "",
                  fecha_inicio: "",
                  fecha_retiro: ""
                }
              }).then(function (response) {
                //swal.close();
                if (validar_json(angular.toJson(response.data))) {
                  if (response.data.codigo == 0) {
                    $scope.historial.detalle = -1;
                    $scope.historial.estado_detalle = "";
                    $scope.limpiar_detalle_solicitud();
                    swal('Mensaje', response.data.mensaje, 'success');
                    //CNVU
                    setTimeout(function () {
                      //swal.close();
                      $scope.lista_solicitud_afiliacion();
                      //$scope.$apply();
                    }, 5000);
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

  $scope.rechazar_new = function () {
    if ($scope.historial.detalle != -1 && $scope.historial.detalle != "") {
      $http({
        method: 'POST',
        url: "php/movilidad/afiliacion_linea.php",
        data: {
          function: 'lista_causal_rechazo'
        }
      }).then(function (response) {
        if (validar_json(angular.toJson(response.data))) {
          $scope.historial.options_motivos_rechazo = response.data;
          $('#modalRechazar').modal();
          $('#modalRechazar').modal('open');
        } else {
          $scope.historial.options_motivos_rechazo = new Array();
          swal('Mensaje', 'No se obtuvo resultados para el lista_causal_rechazo', 'info');
        }
      });
    } else {
      swal('Mensaje', 'Error al intentar rechazar la solicitud #' + $scope.historial.detalle, 'error');
    }
  }

  $scope.rechazar_confirmado = function (valor) {
    //console.log(valor);
    if ($scope.historial.rechazo == "" || $scope.historial.rechazo == undefined || $scope.historial.rechazo == null) {
      swal('Mensaje', 'No selecciono algún item de la lista.', 'warning');
      $scope.historial.rechazo = "";
    } else {
      var codigo_select_list = $scope.historial.rechazo.split("-");
      var i = $scope.historial.options_motivos_rechazo.findIndex(elemt => elemt.CODIGO == codigo_select_list[0]);
      if (i != -1) {
        if (codigo_select_list[1] != $scope.historial.options_motivos_rechazo[i].NOMBRE.trim()) {
          swal('Mensaje', 'No selecciono algún item de la lista.', 'warning');
          $scope.historial.rechazo = "";
        }else{
          $scope.historial.rechazo = codigo_select_list[0];
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
              function: 'gestion_nacional',
              numero: $scope.historial.detalle,
              gestion: "R",
              causal_rechazo: $scope.historial.rechazo,
              modulo: "",
              fecha_inicio: "",
              fecha_retiro: ""
            }
          }).then(function (response) {
            //swal.close();
            if (validar_json(angular.toJson(response.data))) {
              if (response.data.codigo == 0) {
                $scope.historial.detalle = -1;
                $scope.historial.estado_detalle = "";
                $scope.limpiar_detalle_solicitud();
                $scope.cerrarModal('R');
                swal('Mensaje', response.data.mensaje, 'success');
                //CNVU
                setTimeout(function () {
                  //swal.close();
                  $scope.lista_solicitud_afiliacion();
                  //$scope.$apply();
                }, 5000);
                //CNVU
              } else {
                swal('Mensaje', response.data.mensaje, 'warning');
              }
            } else {
              swal('Mensaje', 'Error al intentar rechazar la solicitud #' + $scope.historial.detalle, 'error');
            }
          });
        }
      } else {
        swal('Mensaje', 'No selecciono algún item de la lista.', 'warning');
        $scope.historial.rechazo = "";
      }
    }
  }

  $scope.aprobar = function (solicitud) {
    //console.log($scope.adres_data);
    if ($scope.historial.detalle != -1 && $scope.historial.detalle != "") {
      swal({
        // title: '¿Desea aprobar esta solicitud?',
        type: 'question',
        // text:  ($scope.historial.tipo_solicitud!='Incusión de beneficiarios')?'Seleccionar el proceso:':'',
        // input: ($scope.historial.tipo_solicitud != 'Incusión de beneficiarios') ? 'select' : '',
        // inputOptions: ['Por EMOV', 'Por ENOV'],
        // inputPlaceholder: 'Seleccionar el modulo',
        // inputValidator: function (value) {
        //   return new Promise(function (resolve, reject) {
        //     if (value != '') {
        //       if (value == 1) {
        //         document.querySelector('#enov-proceso').hidden = false;
        //       } else {
        //         document.querySelector('#enov-proceso').hidden = true;
        //       }
        //       resolve();
        //     } else {
        //       reject('Modulo no valido');
        //     }
        //   });
        // },
        html: ($scope.historial.tipo_solicitud != 'Incusión de beneficiarios') ? '<h2 class="swal2-title" id="swal2-title">¿Desea aprobar esta solicitud?</h2><br><select id="apro-modulo" class="swal2-select input-out-new" style="display: block;">' +
          '<option value="" disabled="">Seleccionar proceso</option>' +
          '<option value="EMOV">EMOV</option>' +
          '<option value="ENOV">ENOV</option>' +
          '</select><br>' +
          '<select id="apro-proceso" class="swal2-select input-out-new" style="display: none;">' +
          '<option value="" disabled="">Seleccionar proceso</option>' +
          '<option value="N06">N06</option>' +
          '<option value="CRA">CRA</option>' +
          '<option value="CRI">CRI</option>' +
          '<option value="N08">N08</option>' +
          '</select>' : '<h2 class="swal2-title" id="swal2-title">¿Desea aprobar esta solicitud?</h2>',
        onOpen: function () {
          if ($scope.historial.tipo_solicitud != 'Incusión de beneficiarios') {
            $("#apro-proceso").hide();
            $("#apro-modulo").val("");
            if (($scope.adres_data.EPS == 'CAJA DE COMPENSACIÓN FAMILIAR CAJACOPI ATLÁNTICO' || $scope.adres_data.EPS == 'CAJA DE COMPENSACIÓN FAMILIAR CAJACOPI ATLÁNTICO - CM') && $scope.adres_data.FechaFinAfiliacion != "31/12/2999") {
              $("#apro-modulo option[value='EMOV']").hide();
              //$("#apro-proceso option[value='N06']").hide();
              $("#apro-proceso option[value='CRI']").hide();
              $("#apro-proceso option[value='N08']").hide();
            }else{
              $("#apro-modulo option[value='EMOV']").show();
              //$("#apro-proceso option[value='N06']").show();
              $("#apro-proceso option[value='CRI']").show();
              $("#apro-proceso option[value='N08']").show();
            }
            $('#apro-modulo').on('change', function () {
              if (this.value == 'ENOV') {
                $("#apro-proceso").show().val("");
              } else if (this.value == 'EMOV') {
                $("#apro-proceso").hide().val("");
              }
            });
          }
        },
        preConfirm: function () {
          return new Promise(function (resolve) {
            if ($scope.historial.tipo_solicitud != 'Incusión de beneficiarios') {
              // if($('#apro-modulo').val()){

              // }
              resolve([$('#apro-modulo').val(), $('#apro-proceso').val()]);
            } else {
              resolve();
            }
          })
        },
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then(function (result) {
        if (result) {
          console.log(result);
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          if ($scope.historial.tipo_solicitud == 'Afiliación') {
            $http({
              method: 'POST',
              url: "php/movilidad/afiliacion_linea.php",
              data: {
                function: 'gestion_nacional',
                numero: $scope.historial.detalle,
                gestion: "A",
                causal_rechazo: "",
                modulo: (result[0] == "EMOV") ? "IN" : result[1],
                fecha_inicio: $scope.format_date(1, $scope.historial.fecha_inicio_relacion_l),
                fecha_retiro: $scope.format_date(1, $scope.historial.fecha_fin_relacion_l)
              }
            }).then(function (response) {
              //swal.close();
              if (validar_json(angular.toJson(response.data))) {
                if (response.data.codigo == 0) {
                  $scope.historial.detalle = -1;
                  $scope.historial.estado_detalle = "";
                  $scope.limpiar_detalle_solicitud();
                  swal('Mensaje', response.data.mensaje, 'success');
                  //CNVU
                  setTimeout(function () {
                    $scope.lista_solicitud_afiliacion();
                    //swal.close();
                    //$scope.$apply();
                  }, 5000);
                  //CNVU
                } else {
                  if (response.data.mensaje_detalle == undefined) {
                    response.data.mensaje_detalle = '';
                  }
                  swal('Mensaje', response.data.mensaje + '<br>' + response.data.mensaje_detalle, 'warning');
                }
              } else {
                swal('Mensaje', 'Error al intentar aprobar la solicitud #' + $scope.historial.detalle, 'error');
              }
            });
          } else if ($scope.historial.tipo_solicitud == 'Incusión de beneficiarios') {
            $http({
              method: 'POST',
              url: "php/movilidad/afiliacion_linea.php",
              data: {
                function: 'gestion_nacional',
                numero: $scope.historial.detalle,
                gestion: "A",
                causal_rechazo: "",
                modulo: "",
                fecha_inicio: "",
                fecha_retiro: ""
              }
            }).then(function (response) {
              //swal.close();
              if (validar_json(angular.toJson(response.data))) {
                if (response.data.codigo == 0) {
                  $scope.historial.detalle = -1;
                  $scope.limpiar_detalle_solicitud();
                  swal('Mensaje', response.data.mensaje, 'success');
                  //CNVU
                  setTimeout(function () {
                    $scope.lista_solicitud_afiliacion();
                    //swal.close();
                    //$scope.$apply();
                  }, 5000);
                  //CNVU
                } else {
                  swal('Mensaje', response.data.mensaje, 'warning');
                }
              } else {
                swal('Mensaje', 'Error al intentar aprobar la solicitud #' + $scope.historial.detalle, 'error');
              }
            });
          }
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
      default:
        swal('Error', 'Tipo de validacion invalida', 'error');
        console.log(tipo, param);
        break;
    }
  }

  // CNVU - ABRIR MODAL INTERNO
  $scope.abrirModal = function (tipo_solicitud, modal) {
    $scope.tipo_solicitud = tipo_solicitud;
    switch (modal) {
      case "P":
        $('#modalAnadir').modal();
        $('#modalAnadir').modal('open');
        break;
      case "R":
        $('#modalRechazar').modal();
        $('#modalRechazar').modal('open');
        break;
      default:
        swal('Error', 'Tipo de validacion invalida', 'error');
        break;
    }
    // (function () {
    //   $('#modalAnadir').modal();
    // }());
    // $('#modalAnadir').modal('open');
  }

  $scope.cerrarModal = function (modal) {
    switch (modal) {
      case "P":
        $('#modalAnadir').modal('close');
        break;
      case "R":
        $('#modalRechazar').modal('close');
        $scope.historial.rechazo = "";
        break;
      default:
        swal('Error', 'Modal erroneo.', 'error');
        break;
    }
  }

  // CNVU - ACCION FUNCIONARIOS
  $scope.accionFuncionario = function (accion, tipo, funcionario) {
    console.log(accion, tipo, funcionario, $scope.tipo_solicitud);
    swal({
      title: 'Cargando información...',
      allowEscapeKey: false,
      allowOutsideClick: false
    });
    swal.showLoading();
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'accion_funcionarios',
        accion: accion,
        tipo: tipo,
        funcionario: funcionario,
        ambiente: $scope.tipo_solicitud
      }
    }).then(function (response) {
      // swal.close();
      if (response.data.codigo == 0) {
        swal('Información', response.data.mensaje, 'success');
        setTimeout(function () {
          $scope.cerrarModal('P');
        }, 200);
        $scope.listadoFuncionarios();
      } else {
        swal('Información', response.data.mensaje, 'info');
      }
    });
  }

  // CNVU - LISTADO ASESORES
  $scope.listadoFuncionarios = function () {
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
      data: { function: 'lista_funcionarios' }
    }).then(function (response) {
      swal.close();
      $scope.listado_funcionarios = response.data.funcionarios;
      $scope.listado_funcionarios_nacional = response.data.funcionarios_nacional;
      $scope.listado_funcionarios_seccional = response.data.funcionarios_seccional;
    });
  }
  $scope.listadoFuncionarios();

  $scope.filter = function () {
    $scope.listDatosTemp = $filter('filter')($scope.historial.listado, $scope.q);
  }
}]);