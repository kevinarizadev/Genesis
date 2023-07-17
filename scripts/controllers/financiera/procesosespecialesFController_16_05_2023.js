"use strict";
angular.module("GenesisApp").controller("procesosespecialesFController", [
  "$scope",
  "$http",
  "$timeout",
  function ($scope, $http) {
    $scope.tipodeItem = 0;
    $scope.Rol_Cedula = sessionStorage.getItem("cedula");
    $scope.rolcod = sessionStorage.getItem("rolcod");
    $(document).ready(function () {
      $scope.obtener_token();
      $scope.obtenerreporte();
      $scope.obtener_correo();
      $scope.lis_info_BDUA_subsidiado = new Array();
      $scope.lis_info_BDUA_contributivo = new Array();
      $scope.lis_info_LMA = new Array();
      $scope.incio_vacio();
      $scope.periodo = [];
      $scope.SysDay = new Date();
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
      //////////////////////////////////////////////////////////
    });
    $scope.incio_vacio = function () {
      $scope.regimen = "";
      $scope.anno = "";
      $scope.ciclo = "";
      $scope.periodo = "";
      $scope.trimestre = "";
      $scope.nit = "";
      $scope.nombrearchivo_txt = "";
      $scope.nombrearchivo_zip = "";
      $scope.ubicacion = "";
      $scope.concepto = "";
      $scope.fecharecibido = "";
      $scope.fecharespuesta = "";
      $scope.fecha_inicio = "";
      $scope.fecha_final = "";
      $scope.departamento = "";
      $scope.municipio = "";
      document.querySelector("#anexo2adj_txt").value = "";
      document.querySelector("#anexo2adj_zip").value = "";
    };
    $scope.obtenerMunicipios = function () {
      $scope.municipio = 'X';
      $scope.ipsreceptora = 'X';
      $scope.function = 'cargamunicipios';
      $http({
        method: 'POST',
        url: "php/esop/funcesop.php",
        data: { function: $scope.function, depa: $scope.departamento }
      }).then(function (response) {
        $scope.Municipios = response.data;
      });
    }
    $scope.obtenerDepartamentos = function () {
      $scope.function = 'cargadepartamentos';
      $http({
        method: 'POST',
        url: "php/esop/funcesop.php",
        data: { function: $scope.function }
      }).then(function (response) {
        $scope.Departamentos = response.data;
      });
    }
    $scope.CargarConcepto = function () {
      $http({
        method: "POST",
        url: "php/financiera/funcfinanciera.php",
        data: {
          function: "obtenerconcepto",
          documento: "CA",
        },
      }).then(function (response) {
        $scope.Concepto = response.data;
      });
    };
    $scope.cargaAnnos = function () {
      $http({
        method: "POST",
        url: "php/financiera/funcfinanciera.php",
        data: { function: "cargaannos" },
      }).then(function (res) {
        $scope.Annos = res.data;
        $scope.anno = $scope.Annos[0].ANNO;
        $scope.cargaPeriodos();
      });
    };
    $scope.listado_tabla_BDUA_subsidiado = function () {
      $http({
        method: "POST",
        url: "php/financiera/funcfinanciera.php",
        data: { function: "lista_tabla_BDUA_subsidiado" },
      }).then(function (res) {
        $scope.lis_info_BDUA_subsidiado = res.data;
      });
    };
    $scope.listado_tabla_BDUA_contributivo = function () {
      $http({
        method: "POST",
        url: "php/financiera/funcfinanciera.php",
        data: { function: "lista_tabla_BDUA_contributivo" },
      }).then(function (res) {
        $scope.lis_info_BDUA_contributivo = res.data;
      });
    };
    $scope.listado_tabla_LMA = function () {
      $http({
        method: "POST",
        url: "php/financiera/funcfinanciera.php",
        data: { function: "lista_tabla_LMA" },
      }).then(function (res) {
        $scope.lis_info_LMA = res.data;
      });
    };
    $scope.cargaPeriodos = function () {
      if ($scope.anno != "X" || $scope.anno === undefined) {
        $http({
          method: "POST",
          url: "php/financiera/funcfinanciera.php",
          data: { function: "cargaperiodos", anno: $scope.anno },
        }).then(function (res) {
          $scope.Periodos = res.data;
          console.log(res);
          // $scope.periodoffinal = $scope.Periodos[0].PERF_FINAL;
        });
      }
    };
    $scope.seleccion_Periodo = function (select) {
      console.log(select);

      $scope.periodo_seleccionado = select.IDE;
      console.log($scope.periodo_seleccionado);



    }
    $scope.changeItem = function (item) {
      if (item) {
        $scope.item = JSON.parse(item);
        console.log($scope.item);
      }
    };
    $scope.obtener_token = function () {
      $http({
        method: "POST",
        url: "php/financiera/reportes/funcreportes.php",
        data: {
          function: "obtener_token",
        },
      }).then(function (response) {
        // $scope.respuestat = response.data;
      });
    };
    $scope.obtener_correo = function () {
      $http({
        method: "POST",
        url: "php/financiera/reportes/funcreportes.php",
        data: {
          function: "obtener_correo",
          codigoc: $scope.Rol_Cedula,
        },
      }).then(function (response) {
        $scope.correo = response.data.Correo;
        $scope.respuestac = response.data;
      });
    };
    $scope.obtenerreporte = function () {
      console.log($scope.rolcod);
      $http({
        method: "POST",
        url: "php/informes/obtenerreportes_especiales.php",
        data: { function: "obtenerreportes", v_prol: $scope.rolcod },
      }).then(function (response) {
        $scope.Reportes = response.data;
      });
    };
    $scope.SeleccionarItem = function () {
      console.log($scope.tipodeItem);
      if ($scope.tipodeItem == "0") {
        $scope.vercontenido = false;
      } else {
        $scope.ocultartodo();
        $scope.incio_vacio();
        $scope.vercontenido = true;
        switch ($scope.tipodeItem) {
          case "54": // Archivo Tipo 130 - Auditoria (Radicacion)
            $scope.show_ano = false;
            $scope.show_regimen = true;
            $scope.show_ciclo = false;
            $scope.show_mensual = false;
            $scope.show_trimestre = false;
            $scope.show_archivo_zip = false;
            $scope.show_archivo_txt = false;
            $scope.show_nit = true;
            $scope.cicloMensual = false;
            $scope.cicloTrimestre = false;
            $scope.Nombrereporte = "Archivo Tipo 130 - Auditorias (Radicacion)";
            $scope.contenido1 = true;
            $scope.show_ubicacion = false;
            $scope.show_fecha_inicio = true;
            $scope.show_fecha_final = true;
            $scope.show_concepto = false;
            $scope.show_fecha_recibico = false;
            $scope.show_fecha_respuesta = false;
            $scope.show_instructivo = false;
            $scope.show_tabla_list_BDUA_subsidiado = false;
            $scope.show_tabla_list_BDUA_contributivo = false;
            $scope.show_tabla_list_LMA = false;
            $scope.show_departamento = true;
            $scope.show_municipio = true;
            break;
          case "57": // Archivo Tipo 130 - Auditoria (Pago)
            $scope.show_ano = false;
            $scope.show_regimen = true;
            $scope.show_ciclo = false;
            $scope.show_mensual = false;
            $scope.show_trimestre = false;
            $scope.show_archivo_zip = false;
            $scope.show_archivo_txt = false;
            $scope.show_nit = true;
            $scope.cicloMensual = false;
            $scope.cicloTrimestre = false;
            $scope.Nombrereporte = "Archivo Tipo 130 - Auditorias (Pago)";
            $scope.contenido1 = true;
            $scope.show_ubicacion = false;
            $scope.show_fecha_inicio = true;
            $scope.show_fecha_final = true;
            $scope.show_concepto = false;
            $scope.show_fecha_recibico = false;
            $scope.show_fecha_respuesta = false;
            $scope.show_instructivo = false;
            $scope.show_tabla_list_BDUA_subsidiado = false;
            $scope.show_tabla_list_BDUA_contributivo = false;
            $scope.show_tabla_list_LMA = false;
            $scope.show_departamento = true;
            $scope.show_municipio = true;
            break;
          case "62": //Anexo 1 Circular 030
            $scope.show_ano = true;
            $scope.show_regimen = false;
            $scope.show_ciclo = false;
            $scope.show_mensual = false;
            $scope.show_trimestre = false;
            $scope.show_archivo_zip = false;
            $scope.show_archivo_txt = false;
            $scope.show_nit = true;
            $scope.cicloTrimestre = "Trimestre";
            $scope.cicloMensual = false;
            $scope.Nombrereporte = "Anexo 1 Circular 030";
            $scope.contenido1 = true;
            $scope.show_ubicacion = false;
            $scope.show_concepto = false;
            $scope.show_fecha_recibico = false;
            $scope.show_fecha_respuesta = false;
            $scope.show_instructivo = false;
            $scope.show_tabla_list_BDUA_subsidiado = false;
            $scope.show_tabla_list_BDUA_contributivo = false;
            $scope.show_tabla_list_LMA = false;
            $scope.show_fecha_inicio = false;
            $scope.show_fecha_final = false;
            $scope.show_departamento = false;
            $scope.show_municipio = false;
            break;
          case "63": //Anexo 3 Circular 030
            $scope.show_ano = true;
            $scope.show_regimen = false;
            $scope.show_ciclo = false;
            $scope.show_mensual = false;
            $scope.show_trimestre = false;
            $scope.show_archivo_zip = false;
            $scope.show_archivo_txt = false;
            $scope.show_nit = true;
            $scope.cicloMensual = "Mensual";
            $scope.cicloTrimestre = false;
            $scope.Nombrereporte = "Anexo 3 Circular 030";
            $scope.contenido1 = true;
            $scope.show_ubicacion = false;
            $scope.show_concepto = false;
            $scope.show_fecha_recibico = false;
            $scope.show_fecha_respuesta = false;
            $scope.show_instructivo = false;
            $scope.show_tabla_list_BDUA_subsidiado = false;
            $scope.show_tabla_list_BDUA_contributivo = false;
            $scope.show_tabla_list_LMA = false;
            $scope.show_fecha_inicio = false;
            $scope.show_fecha_final = false;
            $scope.show_departamento = false;
            $scope.show_municipio = false;
            // setTimeout(() => {
            //   $scope.apply();
            // }, 500);
            break;
          case "67": //Cargue de Bases de BDUA Subsidiado
            $scope.show_ano = true;
            $scope.show_regimen = false;
            $scope.show_ciclo = false;
            $scope.show_mensual = true;
            $scope.show_trimestre = false;
            $scope.show_archivo_zip = false;
            $scope.show_archivo_txt = false;
            $scope.show_nit = false;
            $scope.cicloMensual = false;
            $scope.cicloTrimestre = false;
            $scope.Nombrereporte = "Cargue de Bases de BDUA Subsidiado";
            $scope.contenido1 = true;
            $scope.show_ubicacion = false;
            $scope.show_concepto = false;
            $scope.show_fecha_recibico = false;
            $scope.show_fecha_respuesta = false;
            $scope.show_instructivo = false;
            $scope.show_tabla_list_BDUA_subsidiado = true;
            $scope.show_tabla_list_BDUA_contributivo = false;
            $scope.show_tabla_list_LMA = false;
            $scope.listado_tabla_BDUA_subsidiado();
            $scope.show_fecha_inicio = false;
            $scope.show_fecha_final = false;
            $scope.show_departamento = false;
            $scope.show_municipio = false;
            break;
          case "22": //Archivo Tipo 017
            $scope.show_ano = true;
            $scope.show_regimen = true;
            $scope.show_ciclo = true;
            $scope.show_mensual = true;
            $scope.show_trimestre = false;
            $scope.show_archivo_zip = false;
            $scope.show_archivo_txt = false;
            $scope.show_nit = true;
            $scope.cicloMensual = false;
            $scope.cicloTrimestre = false;
            $scope.Nombrereporte = "Archivo Tipo 017";
            $scope.contenido1 = true;
            $scope.show_ubicacion = false;
            $scope.show_concepto = false;
            $scope.show_fecha_recibico = false;
            $scope.show_fecha_respuesta = false;
            $scope.show_instructivo = false;
            $scope.show_tabla_list_BDUA_subsidiado = false;
            $scope.show_tabla_list_BDUA_contributivo = false;
            $scope.show_tabla_list_LMA = false;
            $scope.show_fecha_inicio = false;
            $scope.show_fecha_final = false;
            $scope.show_departamento = false;
            $scope.show_municipio = false;
            break;
          case "70": //Cargue Bases de LMA
            $scope.show_ano = true;
            $scope.show_regimen = false;
            $scope.show_ciclo = false;
            $scope.show_mensual = true;
            $scope.show_trimestre = false;
            $scope.show_archivo_zip = false;
            $scope.show_archivo_txt = false;
            $scope.show_nit = false;
            $scope.cicloMensual = false;
            $scope.cicloTrimestre = false;
            $scope.Nombrereporte = "Cargue Bases de LMA";
            $scope.contenido1 = true;
            $scope.show_ubicacion = false;
            $scope.show_concepto = false;
            $scope.show_fecha_recibico = false;
            $scope.show_fecha_respuesta = false;
            $scope.show_instructivo = false;
            $scope.show_tabla_list_BDUA_subsidiado = false;
            $scope.show_tabla_list_BDUA_contributivo = false;
            $scope.show_tabla_list_LMA = true;
            $scope.listado_tabla_LMA();
            $scope.show_fecha_inicio = false;
            $scope.show_fecha_final = false;
            $scope.show_departamento = false;
            $scope.show_municipio = false;
            break;
          case "72": //Recalculo Contable - Kprecal
            $scope.show_ano = true;
            $scope.show_regimen = false;
            $scope.show_ciclo = false;
            $scope.show_mensual = true;
            $scope.show_trimestre = false;
            $scope.show_archivo_zip = false;
            $scope.show_archivo_txt = false;
            $scope.show_nit = false;
            $scope.cicloMensual = false;
            $scope.cicloTrimestre = false;
            $scope.Nombrereporte = "Recalculo Contable - Kprecal";
            $scope.contenido1 = true;
            $scope.show_ubicacion = false;
            $scope.show_concepto = false;
            $scope.show_fecha_recibico = false;
            $scope.show_fecha_respuesta = false;
            $scope.show_instructivo = false;
            $scope.show_tabla_list_BDUA_subsidiado = false;
            $scope.show_tabla_list_BDUA_contributivo = false;
            $scope.show_tabla_list_LMA = false;
            $scope.show_fecha_inicio = false;
            $scope.show_fecha_final = false;
            $scope.show_departamento = false;
            $scope.show_municipio = false;
            break;
          case "73": //Descarga Analisis Autorizaciones Venc 12 meses
            $scope.show_ano = true;
            $scope.show_regimen = false;
            $scope.deshabilitar_ciclo = true;
            $scope.show_ciclo = true;
            $scope.show_mensual = true;
            $scope.ciclo = "M";
            $scope.show_trimestre = false;
            $scope.show_archivo_zip = false;
            $scope.show_archivo_txt = false;
            $scope.show_nit = false;
            $scope.cicloMensual = false;
            $scope.cicloTrimestre = false;
            $scope.Nombrereporte = "Analisis Autorizaciones Venc 12 meses";
            $scope.contenido1 = true;
            $scope.show_ubicacion = false;
            $scope.show_concepto = false;
            $scope.show_fecha_recibico = false;
            $scope.show_fecha_respuesta = false;
            $scope.show_instructivo = false;
            $scope.show_tabla_list_BDUA_subsidiado = false;
            $scope.show_tabla_list_BDUA_contributivo = false;
            $scope.show_tabla_list_LMA = false;
            $scope.show_fecha_inicio = false;
            $scope.show_fecha_final = false;
            $scope.show_departamento = false;
            $scope.show_municipio = false;
            break;
          case "74": //Cargue Analisis Autorizaciones Venc 12 meses
            $scope.show_ano = true;
            $scope.show_regimen = false;
            $scope.deshabilitar_ciclo = true;
            $scope.show_mensual = false;
            $scope.ciclo = "M";
            $scope.show_ciclo = true;
            $scope.show_trimestre = false;
            $scope.show_archivo_zip = false;
            $scope.show_archivo_txt = true;
            $scope.show_nit = false;
            $scope.cicloMensual = false;
            $scope.cicloTrimestre = false;
            $scope.Nombrereporte =
              "Cargue Analisis Autorizaciones Venc 12 meses";
            $scope.contenido1 = true;
            $scope.show_ubicacion = false;
            $scope.show_concepto = false;
            $scope.show_fecha_recibico = false;
            $scope.show_fecha_respuesta = false;
            $scope.show_instructivo = true;
            $scope.show_tabla_list_BDUA_subsidiado = false;
            $scope.show_tabla_list_BDUA_contributivo = false;
            $scope.show_tabla_list_LMA = false;
            $scope.show_fecha_inicio = false;
            $scope.show_fecha_final = false;
            $scope.show_departamento = false;
            $scope.show_municipio = false;
            break;
          case "77": //Cruce de Cartera de IPS
            $scope.show_ano = false;
            $scope.show_ciclo = false;
            $scope.show_mensual = false;
            $scope.show_trimestre = false;
            $scope.deshabilitar_ciclo = false;
            $scope.show_regimen = false;
            $scope.show_archivo_zip = true;
            $scope.show_archivo_txt = false;
            $scope.show_nit = false;
            $scope.cicloMensual = false;
            $scope.cicloTrimestre = false;
            $scope.Nombrereporte = "Cruce de Cartera de IPS";
            $scope.contenido1 = true;
            $scope.show_ubicacion = true;
            $scope.show_concepto = true;
            $scope.show_fecha_recibico = true;
            $scope.show_fecha_respuesta = true;
            $scope.show_instructivo = false;
            $scope.show_tabla_list_BDUA_subsidiado = false;
            $scope.show_tabla_list_BDUA_contributivo = false;
            $scope.show_tabla_list_LMA = false;
            $scope.show_fecha_inicio = false;
            $scope.show_fecha_final = false;
            $scope.show_departamento = false;
            $scope.show_municipio = false;
            break;
          case "78": //Cargue de Bases de BDUA Contributivo
            $scope.show_ano = true;
            $scope.show_regimen = false;
            $scope.show_ciclo = false;
            $scope.show_mensual = true;
            $scope.show_trimestre = false;
            $scope.show_archivo_zip = false;
            $scope.show_archivo_txt = false;
            $scope.show_nit = false;
            $scope.cicloMensual = false;
            $scope.cicloTrimestre = false;
            $scope.Nombrereporte = "Cargue de Bases de BDUA Contributivo";
            $scope.contenido1 = true;
            $scope.show_ubicacion = false;
            $scope.show_concepto = false;
            $scope.show_fecha_recibico = false;
            $scope.show_fecha_respuesta = false;
            $scope.show_instructivo = false;
            $scope.show_tabla_list_BDUA_subsidiado = false;
            $scope.show_tabla_list_BDUA_contributivo = true;
            $scope.show_tabla_list_LMA = false;
            $scope.listado_tabla_BDUA_contributivo();
            $scope.show_fecha_inicio = false;
            $scope.show_fecha_final = false;
            $scope.show_departamento = false;
            $scope.show_municipio = false;
            break;
            case "84": // Archivo Tipo FT004
            $scope.show_ano = true;
            $scope.show_regimen = false;
            $scope.show_ciclo = false;
            $scope.show_mensual = false;
            $scope.show_trimestre = false;
            $scope.show_archivo_zip = false;
            $scope.show_archivo_txt = false;
            $scope.show_nit = true;
            $scope.cicloMensual = "Mensual";
            $scope.cicloTrimestre = false;
            $scope.Nombrereporte = "Archivo Tipo FT004";
            $scope.contenido1 = true;
            $scope.show_ubicacion = false;
            $scope.show_concepto = false;
            $scope.show_fecha_recibico = false;
            $scope.show_fecha_respuesta = false;
            $scope.show_instructivo = false;
            $scope.show_tabla_list_BDUA_subsidiado = false;
            $scope.show_tabla_list_BDUA_contributivo = false;
            $scope.show_tabla_list_LMA = false;
            $scope.show_fecha_inicio = false;
            $scope.show_fecha_final = false;
            $scope.show_departamento = false;
            $scope.show_municipio = false;
            break;
        }
      }
    };
    $scope.Generar_reporte = function () {
      if ($scope.tipodeItem == "0") {
        $scope.vercontenido = false;
      } else {
        $scope.ocultartodo();
        $scope.vercontenido = true;
        switch ($scope.tipodeItem) {
          case "54": // Archivo Tipo 130 - Auditoria (Radicacion)
            if ($scope.regimen == "" || $scope.nit == "" || $scope.fecha_inicio == "" || $scope.fecha_final == "" || $scope.departamento == "" || $scope.municipio == "") {
              swal("Mensaje", "Error al cargar la fecha de cargue", "info");
              return
            }
            var datosRC = {
              "regimen": $scope.regimen,
              "nit": $scope.nit,
              "finicial": $scope.formatDate($scope.fecha_inicio),
              "ffinal": $scope.formatDate($scope.fecha_final),
              "departamento": $scope.departamento,
              "municipio": $scope.municipio,
              "responsable": $scope.Rol_Cedula,
              "correo": $scope.correo
            }
            swal({
              title: "¿Desea confirmar el cargue?",
              type: "question",
              showCancelButton: true,
              allowOutsideClick: false
            }).catch(swal.noop)
              .then((willDelete) => {
                if (willDelete) {
                  $http({
                    method: "POST",
                    url: "php/financiera/funcfinanciera.php",
                    data: {
                      function: "archivotipo130auditoriaRadicacion",
                      datos: datosRC
                    },
                  }).then(function (res) {
                    swal({
                      title: "Mensaje",
                      text: "Generando reporte en segundo plano, cuando termine de cargar",
                      type: "success",
                    });
                  });
                }
              });
            $scope.tipodeItem = "0";
            $scope.incio_vacio();
            $scope.ocultartodo();
            $scope.vercontenido = false;
            break;
          case "57":// Archivo Tipo 130 - Auditoria (Pago)
            if ($scope.regimen == "" || $scope.nit == "" || $scope.fecha_inicio == "" || $scope.fecha_final == "" || $scope.departamento == "" || $scope.municipio == "") {
              swal("Mensaje", "Error al cargar la fecha de cargue", "info");
              return
            }
            var datosRC = {
              "regimen": $scope.regimen,
              "nit": $scope.nit,
              "finicial": $scope.formatDate($scope.fecha_inicio),
              "ffinal": $scope.formatDate($scope.fecha_final),
              "departamento": $scope.departamento,
              "municipio": $scope.municipio,
              "responsable": $scope.Rol_Cedula,
              "correo": $scope.correo
            }
            swal({
              title: "¿Desea confirmar el cargue?",
              type: "question",
              showCancelButton: true,
              allowOutsideClick: false
            }).catch(swal.noop)
              .then((willDelete) => {
                if (willDelete) {
                  $http({
                    method: "POST",
                    url: "php/financiera/funcfinanciera.php",
                    data: {
                      function: "archivotipo130auditoriaPago",
                      datos: datosRC
                    },
                  }).then(function (res) {
                    swal({
                      title: "Mensaje",
                      text: "Generando reporte en segundo plano, cuando termine de cargar",
                      type: "success",
                    });
                  });
                }
              });
            $scope.tipodeItem = "0";
            $scope.incio_vacio();
            $scope.ocultartodo();
            $scope.vercontenido = false;
            break;
          case "62": //Anexo 1 Circular 030
            if ($scope.anno == "") {
              swal({
                title: "Mensaje",
                text: "No se puede cargar archivo si no selecciona el año",
                type: "warning",
              });
              $scope.contenido1 = true;
              return
            } else {
              if ($scope.anno == "" || $scope.anno == undefined  || $scope.trimestre == "" || $scope.trimestre == undefined || $scope.nit == "" || $scope.nit == undefined) {
                swal({
                  title: "Mensaje",
                  text: "No se puede cargar archivo si no completa todos los campos requeridos (*).",
                  type: "warning",
                });
                $scope.contenido1 = true;
                return
              } else {
                $scope.contenido1 = true;
                var datosRC = {
                  regimen: "A",
                  anno: $scope.anno,
                  ciclo: "T",
                  mes: $scope.trimestre,
                  nit: $scope.nit,
                  tipo: "1",
                  correo: $scope.correo,
                };
                swal({
                  title: "¿Desea Generar Proceso Anexo 1 Circular 030?",
                  text: "Generar Proceso",
                  type: "info",
                  showCancelButton: true,
                  confirmButtonText: "Confirmar",
                  cancelButtonText: "Cancelar",
                  cancelButtonColor: "#d33",
                  allowOutsideClick: false,
                })
                  .then(function (result) {
                    if (result) {
                      swal({
                        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                        width: 200,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        animation: false,
                      });
                      $http({
                        method: "POST",
                        url: "php/financiera/reportes/funcreportes.php",
                        data: {
                          function: "Proceso_Anexo1_030",
                          datos: datosRC,
                        },
                      }).then(function (response) {
                        console.log(response);
                        swal({
                          title: "Mensaje",
                          text: response.data.data.message,
                          type: "success",
                        });
                        $scope.respuestata = response.data;
                      });
                    }
                  })
                  .catch(swal.noop);
                $scope.tipodeItem = "0";
                $scope.incio_vacio();
                $scope.ocultartodo();
                $scope.vercontenido = false;
              }
            }

            break;
          case "63": //Anexo 3 Circular 030
          if ($scope.anno == "") {
            swal({
              title: "Mensaje",
              text: "No se puede cargar archivo si no selecciona el año",
              type: "warning",
            });
            $scope.contenido1 = true;
            return
          }else{
            if ($scope.anno == "" || $scope.anno == undefined  || $scope.periodo == "" || $scope.periodo == undefined || $scope.nit == "" || $scope.nit == undefined) {
              swal({
                title: "Mensaje",
                text: "No se puede cargar archivo si no completa todos los campos requeridos (*).",
                type: "warning",
              });
              $scope.contenido1 = true;
              return
          } else {
              var datosRC = {
                correo: $scope.correo,
                anno: $scope.anno,
                ciclo: "M",
                mes: $scope.item.IDE,
                nit: $scope.nit,
                tipo: "3",
              };
              swal({
                title: "¿Desea Generar Proceso Anexo 3 Circular 030?",
                text: "Generar Proceso",
                type: "info",
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#d33",
                allowOutsideClick: false,
              })
                .then(function (result) {
                  if (result) {
                    swal({
                      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                      width: 200,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      showConfirmButton: false,
                      animation: false,
                    });
                    $http({
                      method: "POST",
                      url: "php/financiera/reportes/funcreportes.php",
                      data: {
                        function: "Proceso_Anexo3_030",
                        datos: datosRC,
                      },
                    }).then(function (response) {
                      console.log(response);
                      if (response.data.data) {
                        swal({
                          title: "Mensaje",
                          text: response.data.data.message,
                          type: "success",
                        });
                      } else {
                        swal({
                          title: "Mensaje",
                          text: "Por Favor Intente Nuevamente",
                          type: "error",
                          allowOutsideClick: false
                        }).then((result) => {
                          location.reload();
                        });
                      }
                      $scope.respuestata = response.data;
                    });
                  }
                })
                .catch(swal.noop);
              $scope.tipodeItem = "0";
              $scope.incio_vacio();
              $scope.ocultartodo();
              $scope.vercontenido = false;
            }
          }
            break;
          case "67": //Cargue de Bases de BDUA Subsidiado
            if (
              $scope.item == "" ||
              $scope.item == undefined ||
              $scope.anno == "" ||
              $scope.anno == undefined ||
              $scope.periodo == "" ||
              $scope.periodo == undefined
            ) {
              swal({
                title: "Mensaje",
                text: "No se puede cargar archivo si no completa todos los campos",
                type: "warning",
              });
              $scope.contenido1 = true;
            } else {
              var datosRC = {
                correo: $scope.correo,
                anno: $scope.anno,
                mes: $scope.item.IDE,
                responsable: $scope.Rol_Cedula,
              };
              swal({
                title: "¿Desea Generar Proceso BDUA?",
                text: "Generar Proceso",
                type: "info",
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#d33",
                allowOutsideClick: false,
              })
                .then(function (result) {
                  if (result) {
                    swal({
                      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                      width: 200,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      showConfirmButton: false,
                      animation: false,
                    });
                    $http({
                      method: "POST",
                      url: "php/financiera/reportes/funcreportes.php",
                      data: {
                        function: "Cargue_BDUA_subsidiado",
                        datos: datosRC,
                      },
                    }).then(function (response) {
                      // console.log(response);
                      if (response.data.data) {
                        swal({
                          title: "Mensaje",
                          text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                          type: "success",
                        });
                      } else {
                        swal({
                          title: "Mensaje",
                          text: "Por Favor Intente Nuevamente",
                          type: "error",
                          allowOutsideClick: false
                        }).then((result) => {
                          location.reload();
                        });
                      }
                      $scope.respuestata = response.data;
                    });
                  }
                })
                .catch(swal.noop);
              $scope.tipodeItem = "0";
              $scope.incio_vacio();
              $scope.ocultartodo();
              $scope.vercontenido = false;
            }
            break;
          case "22": //Archivo Tipo 017
            if (
              $scope.item == "" ||
              $scope.item == undefined ||
              $scope.regimen == "" ||
              $scope.regimen == undefined ||
              $scope.anno == "" ||
              $scope.anno == undefined ||
              $scope.ciclo == "" ||
              $scope.ciclo == undefined ||
              $scope.periodo == "" ||
              $scope.periodo == undefined ||
              $scope.nit == "" ||
              $scope.nit == undefined
            ) {
              swal({
                title: "Mensaje",
                text: "No se puede cargar archivo si no se completa todos los campos sugeridos",
                type: "warning",
              });
              $scope.contenido1 = true;
            } else {
              var datosRC = {
                correo: $scope.correo,
                regimen: $scope.regimen,
                anno: $scope.anno,
                ciclo: $scope.ciclo,
                mes: $scope.item.IDE,
                nit: $scope.nit,
              };
              swal({
                title: "¿Desea Generar Proceso Archivo Tipo 017?",
                text: "Generar Proceso",
                type: "info",
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#d33",
                allowOutsideClick: false,

              })
                .then(function (result) {
                  if (result) {
                    swal({
                      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                      width: 200,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      showConfirmButton: false,
                      animation: false,
                    });
                    $http({
                      method: "POST",
                      url: "php/financiera/reportes/funcreportes.php",
                      data: {
                        function: "Cargue_017",
                        datos: datosRC,
                      },
                    }).then(function (response) {
                      // console.log(response);
                      if (response.data.data) {
                        swal({
                          title: "Mensaje",
                          text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                          type: "success",
                        });
                      } else {
                        swal({
                          title: "Mensaje",
                          text: "Por Favor Intente Nuevamente",
                          type: "error",
                          allowOutsideClick: false
                        }).then((result) => {
                          location.reload();
                        });
                      }
                      $scope.respuestata = response.data;
                    });
                  }
                })
                .catch(swal.noop);
              $scope.tipodeItem = "0";
              $scope.incio_vacio();
              $scope.ocultartodo();
              $scope.vercontenido = false;
            }
            break;
          case "70": //Cargue Bases de LMA
            if (
              $scope.item == "" ||
              $scope.item == undefined ||
              $scope.anno == "" ||
              $scope.anno == undefined ||
              $scope.periodo == "" ||
              $scope.periodo == undefined
            ) {
              swal({
                title: "Mensaje",
                text: "No se puede cargar archivo si no se completa todos los campos sugeridos",
                type: "warning",
              });
              $scope.show_archivo_zip = false;
              $scope.show_archivo_txt = true;
              $scope.contenido1 = true;
            } else {
              console.log($scope.periodo);
              var datosRC = {
                correo: $scope.correo,
                anno: $scope.anno,
                mes: $scope.item.IDE,
                fecha: $scope.item.PERF_FINAL,
                responsable: $scope.Rol_Cedula,
              };
              swal({
                title: "¿Desea Generar Proceso LMA?",
                text: "Generar Proceso",
                type: "info",
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#d33",
                allowOutsideClick: false,
              })
                .then(function (result) {
                  if (result) {
                    swal({
                      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                      width: 200,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      showConfirmButton: false,
                      animation: false,
                    });
                    $http({
                      method: "POST",
                      url: "php/financiera/reportes/funcreportes.php",
                      data: {
                        function: "Cargue_LMA",
                        datos: datosRC,
                      },
                    }).then(function (response) {
                      // console.log(response);
                      if (response.data.data) {
                        swal({
                          title: "Mensaje",
                          text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                          type: "success",
                        });
                      } else {
                        swal({
                          title: "Mensaje",
                          text: "Por Favor Intente Nuevamente",
                          type: "error",
                          allowOutsideClick: false
                        }).then((result) => {
                          location.reload();
                        });
                      }
                      $scope.respuestata = response.data;
                    });
                  }
                })
                .catch(swal.noop);
              $scope.tipodeItem = "0";
              $scope.incio_vacio();
              $scope.ocultartodo();
              $scope.vercontenido = false;
            }
            break;
          case "72": //Recalculo Contable - Kprecal
            if (
              $scope.item == "" ||
              $scope.item == undefined ||
              $scope.anno == "" ||
              $scope.anno == undefined ||
              $scope.periodo == "" ||
              $scope.periodo == undefined
            ) {
              swal({
                title: "Mensaje",
                text: "No se puede cargar archivo si no se completa todos los campos sugeridos",
                type: "warning",
              });
              $scope.contenido1 = true;
            } else {
              var datosRC = {
                correo: $scope.correo,
                anno: $scope.anno,
                mes: $scope.item.IDE,
              };
              swal({
                title: "¿Desea Generar Proceso Recalculo Contable - Kprecal?",
                text: "Generar Proceso",
                type: "info",
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#d33",
                allowOutsideClick: false,
              })
                .then(function (result) {
                  if (result) {
                    swal({
                      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                      width: 200,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      showConfirmButton: false,
                      animation: false,
                    });
                    $http({
                      method: "POST",
                      url: "php/financiera/reportes/funcreportes.php",
                      data: {
                        function: "Recalculo_contable",
                        datos: datosRC,
                      },
                    }).then(function (response) {
                      // console.log(response);
                      if (response.data.data) {
                        swal({
                          title: "Mensaje",
                          text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                          type: "success",
                        });
                      } else {
                        swal({
                          title: "Mensaje",
                          text: "Por Favor Intente Nuevamente",
                          type: "error",
                          allowOutsideClick: false
                        }).then((result) => {
                          location.reload();
                        });
                      }
                      $scope.respuestata = response.data;
                    });
                  }
                })
                .catch(swal.noop);
              $scope.tipodeItem = "0";
              $scope.incio_vacio();
              $scope.ocultartodo();
              $scope.vercontenido = false;
            }
            break;
          case "73": //Descarga Analisis Autorizaciones Venc 12 meses
            if (
              $scope.item == "" ||
              $scope.item == undefined ||
              $scope.anno == "" ||
              $scope.anno == undefined ||
              $scope.periodo == "" ||
              $scope.periodo == undefined ||
              $scope.ciclo == "" ||
              $scope.ciclo == undefined
            ) {
              swal({
                title: "Mensaje",
                text: "No se puede cargar archivo si no completa todos los campos",
                type: "warning",
              });
              $scope.contenido1 = true;
            } else {
              console.log($scope.periodo);
              var datosRC = {
                correo: $scope.correo,
                anno: $scope.anno,
                mes: $scope.item.IDE,
                fecha: $scope.item.PERF_FINAL,
                responsable: $scope.Rol_Cedula,
              };
              swal({
                title:
                  "¿Desea Generar Proceso Analisis de Autorizaciones Venc 12 meses?",
                text: "Generar Proceso",
                type: "info",
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#d33",
                allowOutsideClick: false,
              })
                .then(function (result) {
                  if (result) {
                    swal({
                      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                      width: 200,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      showConfirmButton: false,
                      animation: false,
                    });
                    $http({
                      method: "POST",
                      url: "php/financiera/reportes/funcreportes.php",
                      data: {
                        function: "Autorizaciones_Venc_12_meses",
                        datos: datosRC,
                      },
                    }).then(function (response) {
                      // console.log(response);
                      if (response.data.data) {
                        swal({
                          title: "Mensaje",
                          text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                          type: "success",
                        });
                      } else {
                        swal({
                          title: "Mensaje",
                          text: "Por Favor Intente Nuevamente",
                          type: "error",
                          allowOutsideClick: false
                        }).then((result) => {
                          location.reload();
                        });
                      }
                      $scope.respuestata = response.data;
                    });
                  }
                })
                .catch(swal.noop);
              $scope.tipodeItem = "0";
              $scope.incio_vacio();
              $scope.ocultartodo();
              $scope.vercontenido = false;
            }
            break;
          case "74": //Cargue Analisis Autorizaciones Venc 12 meses
            if (
              $scope.item == "" ||
              $scope.item == undefined ||
              $scope.anno == "" ||
              $scope.anno == undefined ||
              $scope.periodo == "" ||
              $scope.periodo == undefined ||
              $scope.nombrearchivo_txt == "" ||
              $scope.nombrearchivo_txt == undefined
            ) {
              swal({
                title: "Mensaje",
                text: "No se puede cargar archivo si no se completa todos los campos sugeridos",
                type: "warning",
              });
              $scope.show_archivo_zip = false;
              $scope.show_archivo_txt = true;
              $scope.contenido1 = true;
            } else {
              console.log($scope.periodo);
              var datosRC = {
                correo: $scope.correo,
                anno: $scope.anno,
                mes: $scope.item.IDE != undefined ? $scope.item.IDE : "",
                fecha: $scope.item.PERF_FINAL,
                responsable: $scope.Rol_Cedula,
                archivo: $scope.archivocargar,
              };
              console.log(datosRC);
              swal({
                title:
                  "¿Desea Cargar Analisis de Autorizaciones Venc 12 meses?",
                text: "Generar Proceso",
                type: "info",
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#d33",
                allowOutsideClick: false,
              })
                .then(function (result) {
                  console.log($scope.anno);
                  if (result) {
                    swal({
                      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                      width: 200,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      showConfirmButton: false,
                      animation: false,
                    });
                    $http({
                      method: "POST",
                      url: "php/financiera/reportes/funcreportes.php",
                      data: {
                        function: "Cargue_Analisis_Autorizaciones",
                        datos: datosRC,
                      },
                    }).then(function (response) {
                      swal.close();
                      console.log(response.data.Codigo);
                      if (response.data.Codigo != 0) {
                        swal({
                          title: response.data.msg,
                          text: "Generar Mensaje",
                          type: "error",
                        }).then(function () { });
                        $scope.return();
                      }
                      if (response.data.Codigo != 1) {
                        swal({
                          title: response.data.msg,
                          text: "Generar Proceso",
                          type: "info",
                          showCancelButton: true,
                          confirmButtonText: "Confirmar",
                          cancelButtonText: "Cancelar",
                          cancelButtonColor: "#d33",
                          allowOutsideClick: false,
                        }).then(function () {
                          location.reload();
                        });
                      } else {
                        setTimeout(() => {
                          swal({
                            title: "Mensaje",
                            // text: response.data.Nombre,
                            text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                            type: "success",
                          });
                          $scope.respuesta = response.data;
                        }, 1000);
                      }
                    });
                  }
                })
                .catch(swal.noop);
              $scope.tipodeItem = "0";
              $scope.incio_vacio();
              $scope.ocultartodo();
              $scope.vercontenido = false;
            }
            break;
          case "77": //Cruce de Cartera de IPS
            if (
              $scope.ubicacion == "" ||
              $scope.ubicacion == undefined ||
              $scope.concepto == "" ||
              $scope.concepto == undefined ||
              $scope.fecharecibido == "" ||
              $scope.fecharecibido == undefined ||
              $scope.fecharespuesta == "" ||
              $scope.fecharespuesta == undefined ||
              $scope.nombrearchivo_zip == "" ||
              $scope.nombrearchivo_zip == undefined
            ) {
              swal({
                title: "Mensaje",
                text: "No se puede cargar archivo si no completa todos los campos",
                type: "warning",
              });
              $scope.show_archivo_zip = true;
              $scope.show_archivo_txt = false;
              $scope.contenido1 = true;
            } else {
              console.log($scope.periodo);
              var datosRC = {
                ubicacion: $scope.ubicacion,
                concepto: $scope.concepto,
                frecibido: $scope.formatDate($scope.fecharecibido),
                frespuesta: $scope.formatDate($scope.fecharespuesta),
                responsable: $scope.Rol_Cedula,
                correo: $scope.correo,
                archivo: $scope.archivocargar,
              };
              swal({
                title: "¿Desea Cargar el cruce de cartera de la IPS?",
                text: "Generar Proceso",
                type: "info",
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#d33",
                allowOutsideClick: false,
              })
                .then(function (result) {
                  console.log($scope.anno);
                  if (result) {
                    swal({
                      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                      width: 200,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      showConfirmButton: false,
                      animation: false,
                    });
                    $http({
                      method: "POST",
                      url: "php/financiera/reportes/funcreportes.php",
                      data: {
                        function: "Cruce_de_Cartera_ips",
                        datos: datosRC,
                      },
                    }).then(function (response) {
                      if (response.data.Codigo == "0") {
                        swal({
                          title: "Mensaje",
                          text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                          type: "success",
                        });
                        $scope.respuesta = response.data;
                      } else {
                        swal({
                          title: "Mensaje",
                          text: "No se logro cargar el archivo",
                          type: "warning",
                        });
                      }
                    });
                  }
                })
                .catch(swal.noop);
              $scope.tipodeItem = "0";
              $scope.incio_vacio();
              $scope.ocultartodo();
              $scope.vercontenido = false;
            }
            break;
          case "78": //Cargue de Bases de BDUA Contributivo
            if (
              $scope.item == "" ||
              $scope.item == undefined ||
              $scope.anno == "" ||
              $scope.anno == undefined ||
              $scope.periodo == "" ||
              $scope.periodo == undefined
            ) {
              swal({
                title: "Mensaje",
                text: "No se puede cargar archivo si no completa todos los campos",
                type: "warning",
              });
              $scope.contenido1 = true;
            } else {
              var datosRC = {
                correo: $scope.correo,
                anno: $scope.anno,
                mes: $scope.item.IDE,
                responsable: $scope.Rol_Cedula,
              };
              swal({
                title: "¿Desea Generar Proceso BDUA?",
                text: "Generar Proceso",
                type: "info",
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#d33",
                allowOutsideClick: false,
              })
                .then(function (result) {
                  if (result) {
                    swal({
                      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                      width: 200,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      showConfirmButton: false,
                      animation: false,
                    });
                    $http({
                      method: "POST",
                      url: "php/financiera/reportes/funcreportes.php",
                      data: {
                        function: "Cargue_BDUA_contributivo",
                        datos: datosRC,
                      },
                    }).then(function (response) {
                      // console.log(response);
                      if (response.data.data) {
                        swal({
                          title: "Mensaje",
                          text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                          type: "success",
                        });
                      } else {
                        swal({
                          title: "Mensaje",
                          text: "Por Favor Intente Nuevamente",
                          type: "error",
                          allowOutsideClick: false
                        }).then((result) => {
                          location.reload();
                        });
                      }
                      $scope.respuestata = response.data;
                    });
                  }
                })
                .catch(swal.noop);
              $scope.tipodeItem = "0";
              $scope.incio_vacio();
              $scope.ocultartodo();
              $scope.vercontenido = false;
            }
            break;
            case "84":  // Archivo Tipo FT004
            if ($scope.anno == "") {
              swal({
                title: "Mensaje",
                text: "No se puede cargar archivo si no selecciona el año",
                type: "warning",
              });
              $scope.contenido1 = true;
              return
            }else{
              if ($scope.anno == "" || $scope.anno == undefined  || $scope.periodo == "" || $scope.periodo == undefined || $scope.nit == "" || $scope.nit == undefined) {
                swal({
                  title: "Mensaje",
                  text: "No se puede cargar archivo si no completa todos los campos requeridos (*).",
                  type: "warning",
                });
                $scope.contenido1 = true;
                return
            } else {
                var datosRC = {
                  correo: $scope.correo,
                  anno: $scope.anno,
                  ciclo: "M",
                  mes: $scope.item.IDE,
                  nit: $scope.nit,
                };
                swal({
                  title: "¿Desea Generar Proceso Archivo Tipo FT004?",
                  text: "Generar Proceso",
                  type: "info",
                  showCancelButton: true,
                  confirmButtonText: "Confirmar",
                  cancelButtonText: "Cancelar",
                  cancelButtonColor: "#d33",
                  allowOutsideClick: false,
                })
                  .then(function (result) {
                    if (result) {
                      swal({
                        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                        width: 200,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        animation: false,
                      });
                      $http({
                        method: "POST",
                        url: "php/financiera/reportes/funcreportes.php",
                        data: {
                          function: "Archivo_Tipo_FT004",
                          datos: datosRC,
                        },
                      }).then(function (response) {
                        console.log(response);
                        if (response.data.data) {
                          swal({
                            title: "Mensaje",
                            text: response.data.data.message,
                            type: "success",
                          });
                        } else {
                          swal({
                            title: "Mensaje",
                            text: "Por Favor Intente Nuevamente",
                            type: "error",
                            allowOutsideClick: false
                          }).then((result) => {
                            location.reload();
                          });
                        }
                        $scope.respuestata = response.data;
                      });
                    }
                  })
                  .catch(swal.noop);
                $scope.tipodeItem = "0";
                $scope.incio_vacio();
                $scope.ocultartodo();
                $scope.vercontenido = false;
              }
            }
              break;
        }
      }
    };
    $scope.ocultartodo = function () {
      $scope.contenido1 = false;
    };
    // Funcion para format fecha
    $scope.formatDate = function (date) {
      var d = new Date(date);
      var dd = ("0" + d.getDate()).slice(-2);
      var mm = ("0" + (d.getMonth() + 1)).slice(-2);
      var yyyy = d.getFullYear();
      return dd + "/" + mm + "/" + yyyy;
    };
    // **convertr archivo en base64
    $scope.getBase64 = function (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
    // **Validador de archivo txt
    $scope.validararchivo_txt = function () {
      $scope.inputFile = document.querySelector("#anexo2adj_txt");
      var archivo = $scope.inputFile.files[0].name.split(".");
      var tamano = $scope.inputFile.files[0].size;
      var ext = archivo[1];
      // if ($(this)["0"].files.length > 0) { // se valida que exista el archivo
      if (tamano <= 253600000) {
        // se valida el tamaño del archivo
        if (ext.toUpperCase() == "TXT") {
          //se valida el tipo del archivo
          $scope.getBase64($scope.inputFile.files[0]).then(function (result) {
            $scope.archivocargar = result;
          });
        } else {
          swal(
            "Tipo de archivo incorrecto",
            "Extension del archivo incorrecta debe ser .txt",
            "warning"
          );
          //Esto sirve para limpiar los id de un input type file
          $scope.nombrearchivo_txt = "";
          document.getElementById("anexo2adj_txt").value = "";
        }
      } else {
        swal(
          "TAMAÑO EXCEDIDO",
          "Archivo no debe superar los 11 megabytes",
          "error"
        );
        $scope.nombrearchivo_txt = "";
      }
    };
    $scope.validararchivo_zip = function () {
      $scope.inputFile = document.querySelector("#anexo2adj_zip");
      var archivo = $scope.inputFile.files[0].name.split(".");
      var tamano = $scope.inputFile.files[0].size;
      var ext = archivo[1];
      // if ($(this)["0"].files.length > 0) { // se valida que exista el archivo
      if (tamano <= 11560000) {
        // se valida el tamaño del archivo
        if (ext.toUpperCase() == "ZIP") {
          //se valida el tipo del archivo
          $scope.getBase64($scope.inputFile.files[0]).then(function (result) {
            $scope.archivocargar = result;
          });
        } else {
          swal(
            "Tipo de archivo incorrecto",
            "Extension del archivo incorrecta debe ser .zip",
            "warning"
          );
          //Esto sirve para limpiar los id de un input type file
          $scope.nombrearchivo_zip = "";
          document.getElementById("anexo2adj_zip").value = "";
        }
      } else {
        swal(
          "TAMAÑO EXCEDIDO",
          "Archivo no debe superar los 11 megabytes",
          "error"
        );
        $scope.nombrearchivo_zip = "";
      }
    };
    // $scope.Cargue_BDUA = function () {
    //   var datosRC = {
    //     correo: $scope.correo,
    //     anno: $scope.anno,
    //     mes: $scope.periodo,
    //   };
    //   swal({
    //     title: "¿Desea Generar Proceso BDUA?",
    //     text: "Generar Proceso",
    //     type: "info",
    //     showCancelButton: true,
    //     confirmButtonText: "Confirmar",
    //     cancelButtonText: "Cancelar",
    //     cancelButtonColor: "#d33",
    //     allowOutsideClick: false,
    //   })
    //     .then(function (result) {
    //       if (result) {
    //         swal({
    //           html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
    //           width: 200,
    //           allowOutsideClick: false,
    //           allowEscapeKey: false,
    //           showConfirmButton: false,
    //           animation: false,
    //         });
    //         $http({
    //           method: "POST",
    //           url: "php/financiera/reportes/funcreportes.php",
    //           data: {
    //             function: "Cargue_BDUA",
    //             datos: datosRC,
    //           },
    //         }).then(function (response) {
    //           swal({
    //             title: "Mensaje",
    //             text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
    //             type: "success",
    //           });
    //           $scope.respuestata = response.data;
    //         });
    //       }
    //     })
    //     .catch(swal.noop);
    // };

    $scope.formatPeso = function (num) {
      if (num != undefined) {
        var regex2 = new RegExp("\\.");
        if (regex2.test(num)) {
          num = num.toString().replace(".", ",");
          num = num.split(",");
          num[0] = num[0]
            .toString()
            .split("")
            .reverse()
            .join("")
            .replace(/(?=\d*\.?)(\d{3})/g, "$1.");
          num[0] = num[0].split("").reverse().join("").replace(/^[\.]/, "");
          if (num[1].length > 1 && num[1].length > 2) {
            num[1] = num[1].toString().substr(0, 2);
          }
          if (num[1].length == 1) {
            num[1] = num[1] + "0";
          }
          return num[0] + "," + num[1];
        } else {
          num = num
            .toString()
            .split("")
            .reverse()
            .join("")
            .replace(/(?=\d*\.?)(\d{3})/g, "$1.");
          num = num.split("").reverse().join("").replace(/^[\.]/, "");
          return num + "";
        }
      }
    };
    $(window).on("resize", function () {
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
  },
]);
