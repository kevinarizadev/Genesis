"use strict";
angular.module("GenesisApp").controller("informesentesController", [
  "$scope",
  "consultaHTTP",
  "notification",
  "cfpLoadingBar",
  "$http",
  "$window",
  "$filter",
  function (
    $scope,
    consultaHTTP,
    notification,
    cfpLoadingBar,
    $http,
    $window,
    $filter
  ) {
    $scope.numero_contrato = "";
    $scope.ubicacion = "";
    $scope.escenario = "";
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.q = "";
    $scope.infousuarios = new Array();
    $scope.aviso_Informativo = false;
    $scope.inactive2 = true;
    $scope.tiporeporte = 0;
    $scope.departamento = "0";
    $scope.municipio = "0";
    $scope.tipo_cuenta = "0";
    $scope.nomina = "";
    $scope.mostrar_radicado_contratos = false;
    var dat = { prov: "navb" };
    $.getJSON("php/obtenersession.php", dat)
      .done(function (respuesta) {
        $scope.sesdata = respuesta;
        $scope.rolcod = $scope.sesdata.rolcod;
        $scope.obtenerreporte();
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log("navbar error obteniendo variables");
      });
    $scope.obtenerreporte = function () {
      $http({
        method: "POST",
        url: "php/informes/obtenerreportes.php",
        data: { function: "obtenerreportes", v_prol: $scope.rolcod },
      }).then(function (response) {
        $scope.Reportes = response.data;
      });
    };
    // se activan los criterios de conusltas
    $scope.buscaReporte = function () {
      $scope.mostrar_radicado_contratos = false;
      $scope.datos_contrato = {};
      if ($scope.tiporeporte == "0") {
        $scope.shw_parametros = false;
        $scope.consmayudaaut = false;
        $scope.consproductos = false;
        $scope.consmovempresa = false;
        $scope.consmesaayudacas = false;
      } else {
        $scope.hideall();
        $scope.shw_parametros = true;
        switch ($scope.tiporeporte) {
          case "1":
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "2":
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "3":
            $scope.shw_nomina = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "4":
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "5":
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "7":
            $scope.shw_annos = false;
            $scope.shw_nit = true;
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "8":
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "9":
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "10":
            $scope.shw_contrato = true;
            $scope.shw_regimen = true;
            $scope.shw_producto = true;
            $scope.consmayudaaut = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "11":
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;
          case "50":
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "58":
            $scope.shw_regimen = true;
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.shw_contrato = true;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "12":
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmayudaaut = true;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "13":
            $scope.shw_annos = false;
            $scope.shw_periodo = false;
            $scope.consproductos = false;
            $scope.consmovempresa = true;
            $scope.consmayudaaut = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "14":
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "15":
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.shw_nit = true;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "16":
            $scope.shw_annos = false;
            $scope.shw_periodo = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmayudaaut = false;
            $scope.consmesaayudacas = true;
            $scope.shw_nit = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "17":
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.shw_departamento = true;
            $scope.shw_municipio = true;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "18":
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "19":
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "21":
            $scope.shw_anofinal = true;
            $scope.shw_anoinicial = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "37":
            $scope.shw_fecha = true;
            $scope.shw_departamento = true;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;
          case "39":
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;
          case "40":
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;
          case "41":
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "42":
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.shw_oficina = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "44":
            $scope.shw_fecha_inicio = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "45":
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "51":
            $scope.shw_annos = false;
            $scope.shw_periodo = false;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "52":
            $scope.shw_annos = false;
            $scope.shw_periodo = false;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;

          case "53":
            $scope.shw_annos = false;
            $scope.shw_periodo = false;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;
          case "59":
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.shw_fecha_inicio = false;
            $scope.shw_fecha_final = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;
          case "60":
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.shw_fecha_inicio = false;
            $scope.shw_fecha_final = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;
          case "61":
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;
          case "65":
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;
          case "66":
            $scope.shw_numero_contrato = true;
            $scope.shw_ubicacion = true;
            $scope.shw_escenario = true;
            $scope.shw_concepto = true;
            $scope.shw_estado_afiliado = true;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;
          case "68":
            $scope.shw_annos = false;
            $scope.shw_nit = true;
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;
          case "69":
            $scope.shw_annos = false;
            $scope.shw_nit = true;
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;
          case "88":
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;
          case "90":
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            break;
          case "92":
            $scope.shw_annos = false;
            $scope.shw_nit = true;
            $scope.shw_fecha_inicio = false;
            $scope.shw_fecha_final = false;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            $scope.consmesaayudacas = false;
            break;
          case "93":
            //Reporte Supervision Contrato
            $scope.shw_annos = false;
            $scope.shw_nit = false;
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            $scope.consmesaayudacas = false;
            break;
          case "94":
            //Reporte Informe tutelas servicios
            $scope.shw_annos = false;
            $scope.shw_nit = false;
            $scope.shw_fecha_inicio = false;
            $scope.shw_fecha_final = false;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.aviso_Informativo = false;
            $scope.error = false;
            $scope.succes = false;
            $scope.consmesaayudacas = false;
            break;
        }
      }
    };
    $scope.limpiar = function () {
      $scope.ver_documento = true;
      $scope.documentos = "";
    };

    // se relacionan todos los criterior de consulta
    $scope.hideall = function () {
      $scope.shw_regimen = false;
      $scope.shw_annos = false;
      $scope.shw_ciclo = false;
      $scope.shw_trimestre = false;
      $scope.shw_periodo = false;
      $scope.shw_nit = false;
      $scope.shw_anofinal = false;
      $scope.shw_anoinicial = false;
      $scope.shw_fecha_final = false;
      $scope.shw_fecha_inicio = false;
      $scope.shw_departamento = false;
      $scope.shw_municipio = false;
      $scope.shw_tipo_cuenta = false;
      $scope.shw_nomina = false;
      $scope.shw_contrato = false;
      $scope.shw_producto = false;
      $scope.shw_producto = false;
      $scope.consmayudaaut = false;
      $scope.consmovempresa = false;
      $scope.consmesaayudacas = false;
      $scope.shw_fecha = false;
      $scope.shw_oficina = false;
    };
    ///obtener datos
    $scope.obtenerMunicipios = function () {
      $scope.municipio = "X";
      $scope.ipsreceptora = "X";
      $scope.function = "cargamunicipios";
      $http({
        method: "POST",
        url: "php/esop/funcesop.php",
        data: { function: $scope.function, depa: $scope.departamento },
      }).then(function (response) {
        $scope.Municipios = response.data;
      });
    };
    $scope.obtenerDepartamentos = function () {
      $scope.function = "cargadepartamentos";
      $http({
        method: "POST",
        url: "php/esop/funcesop.php",
        data: { function: $scope.function },
      }).then(function (response) {
        $scope.Departamentos = response.data;
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
        $scope.cargaCiclos();
        $scope.cargatrimestre();
      });
    };
    $scope.cargatrimestre = function () {
      $http({
        method: "POST",
        url: "php/financiera/funcfinanciera.php",
        data: { function: "cargatrimestre", anno: $scope.anno },
      }).then(function (res) {
        $scope.Trimestre = res.data;
      });
    };
    $scope.cargaCiclos = function () {
      $http({
        method: "POST",
        url: "php/financiera/funcfinanciera.php",
        data: { function: "cargaciclos", anno: $scope.anno },
      }).then(function (res) {
        $scope.Ciclos = res.data;
        $scope.ciclo = $scope.Ciclos[0].IDE;
        $scope.cargaPeriodos();
      });
    };
    $scope.obtenerreportes = function () {
      $http({
        method: "POST",
        url: "php/informes/obtenerreportes.php",
        data: { function: "obtenerreportes" },
      }).then(function (res) {
        $scope.obtenerreportes = res.data;
        $scope.obtenerreportes = $scope.obtenerreportes[0].IDE;
        $scope.obtenerreportes();
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
          $scope.periodo = $scope.Periodos[0].IDE;
        });
      }
    };

    $scope.GenerarArchivo = function () {
      //alert('Soy yo');
      window.open(
        "php/Informes/sireciTxt1.php?panno=" +
        $scope.anno +
        "&ptrimestre=" +
        $scope.trimestre
      );
      //window.open("php/financiera/sireciTxt2.php?panno="+$scope.anno+"&ptrimestre="+$scope.trimestre);
    };

    ///// se generan los reweportes
    $scope.generaReporte = function () {
      switch ($scope.tiporeporte) {
        case "1":
          var fecha_inicio = $filter("date")(
            new Date($scope.fecha_inicio),
            "dd/MM/yyyy"
          );
          var fecha_final = $filter("date")(
            new Date($scope.fecha_final),
            "dd/MM/yyyy"
          );
          window.open(
            "php/Informes/ausentismo.php?fecha_inicio=" +
            fecha_inicio +
            "&fecha_final=" +
            fecha_final
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "2":
          var fecha_inicio = $filter("date")(
            new Date($scope.fecha_inicio),
            "dd/MM/yyyy"
          );
          var fecha_final = $filter("date")(
            new Date($scope.fecha_final),
            "dd/MM/yyyy"
          );
          window.open(
            "php/Informes/incapacidades.php? &fecha_inicio=" +
            fecha_inicio +
            "&fecha_final=" +
            fecha_final
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "3":
          window.open(
            "php/Informes/relacionnomina.php?nomina=" + $scope.nomina
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "4":
          window.open(
            "php/Informes/relacionlibranzas.php?anno=" +
            $scope.anno +
            "&periodo=" +
            $scope.periodo
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "5":
          window.open(
            "php/Informes/relacionembargos.php?anno=" +
            $scope.anno +
            "&periodo=" +
            $scope.periodo
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "6":
          window.open("php/Informes/Plandecargos.php");
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "7":
          var ReportTitle = " Total Radicacion Prestadores",
            ShowLabel = true;
          var fecha_inicio = $filter("date")(
            new Date($scope.fecha_inicio),
            "dd/MM/yyyy"
          );
          var fecha_final = $filter("date")(
            new Date($scope.fecha_final),
            "dd/MM/yyyy"
          );
          //window.open('php/Informes/descuentospyp2.php?fecha_inicio='+fecha_inicio+'&fecha_final='+fecha_final+'&nit='+$scope.nit);
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          $http({
            method: "POST",
            url: "php/informes/mesaayudaaut.php",
            data: {
              function: "p_lista_actividad_pyp",
              fecha_inicio: fecha_inicio,
              fecha_final: fecha_final,
              nit: $scope.nit,
            },
          }).then(function (respuesta) {
            var JSONData = respuesta.data;
            var arrData =
              typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
            var CSV = "";
            if (ShowLabel) {
              var row = "";
              for (var index in arrData[0]) {
                row += index.toLocaleUpperCase() + ",";
              }
              row = row.slice(0, -1);
              CSV += row + "\r\n";
            }
            for (var i = 0; i < arrData.length; i++) {
              var row = "";
              for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
              }
              row.slice(0, row.length - 1);
              CSV += row + "\r\n";
            }
            if (CSV == "") {
              return;
            }

            var fileName = "Reporte ";

            // var fileName = "Historial de cambios de implementos de oficina del municipio ";
            fileName += ReportTitle.replace(/ /g, "_");
            var uri = "data:text/csv;charset=utf-8," + escape(CSV);
            var link = document.createElement("a");
            link.href = uri;
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
          break;

        case "8":
          var fecha_inicio = $filter("date")(
            new Date($scope.fecha_inicio),
            "dd/MM/yyyy"
          );
          var fecha_final = $filter("date")(
            new Date($scope.fecha_final),
            "dd/MM/yyyy"
          );
          window.open(
            "php/Informes/reportepartos.php? &fecha_inicio=" +
            fecha_inicio +
            "&fecha_final=" +
            fecha_final
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "9":
          window.open(
            "php/Informes/procedimientosqx.php?anno=" +
            $scope.anno +
            "&periodo=" +
            $scope.periodo
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "10":
          // window.open('php/Informes/consproductoscontratos.php?contrato='+$scope.contrato+'&regimen='+$scope.regimen+'&producto='+$scope.producto);
          $http({
            method: "POST",
            url: "php/informes/consproductoscontratos.php",
            data: {
              function: "consultaproducto",
              contrato: $scope.contrato,
              regimen: $scope.regimen,
              producto: $scope.producto,
            },
          }).then(function (respuesta) {
            $scope.Productos = respuesta.data;
            $scope.consproductos = true;
            $scope.consmayudaaut = false;
            $scope.consmovempresa = false;
          });
          break;

        // contratacion
        case "11":
          window.open(
            "php/Informes/redcontratacion.php?ann=" +
            $scope.anno +
            "&per=" +
            $scope.periodo
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "50":
          window.open(
            "php/Informes/redcontratacion_sinClasificacion.php?ann=" +
            $scope.anno +
            "&per=" +
            $scope.periodo
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "56":
          window.open("php/Informes/redcontratacion_historico.php");

          break;

        case "58":
          $scope.datos_contrato = {};
          $scope.mostrar_radicado_contratos = false;
          if (
            $scope.fecha_inicio == undefined ||
            $scope.fecha_inicio == null ||
            $scope.fecha_inicio == "" ||
            $scope.fecha_final == undefined ||
            $scope.fecha_final == null ||
            $scope.fecha_final == "" ||
            $scope.regimen == undefined ||
            $scope.regimen == null ||
            $scope.regimen == "" ||
            $scope.regimen == "X" ||
            $scope.contrato == undefined ||
            $scope.contrato == null ||
            $scope.contrato == ""
          )
            swal({ title: "Cargando...", allowOutsideClick: false });
          swal.showLoading();
          var fecha_inicio = $filter("date")(
            new Date($scope.fecha_inicio),
            "dd/MM/yyyy"
          );
          var fecha_final = $filter("date")(
            new Date($scope.fecha_final),
            "dd/MM/yyyy"
          );
          $http({
            method: "POST",
            url: "php/informes/obtenerreportes.php",
            data: {
              function: "P_VALOR_RADICADO_CONTRATO",
              V_PFECHAINICIO: fecha_inicio,
              V_PFECHAFIN: fecha_final,
              V_PREGIMEN: $scope.regimen == "KS" ? "S" : "C",
              V_PCONTRATO: $scope.contrato,
            },
          }).then(function (response) {
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              if (response.data.Codigo == undefined) {
                if (response.data.length != 0) {
                  $scope.datos_contrato = response.data;
                  $scope.mostrar_radicado_contratos = true;
                  swal.close();
                } else {
                  swal({
                    title: "¡IMPORTANTE!",
                    text: "No se encontraron registros.",
                    type: "info",
                  }).catch(swal.noop);
                  document.getElementById("Num_Doc").focus();
                }
              } else {
                swal({
                  title: "¡IMPORTANTE!",
                  text: response.data.Nombre,
                  type: "warning",
                }).catch(swal.noop);
                document.getElementById("Num_Doc").focus();
              }
            } else {
              swal({
                title: "¡IMPORTANTE!",
                text: response.data,
                type: "info",
              }).catch(swal.noop);
              document.getElementById("Num_Doc").focus();
            }
          });
          break;

        case "12":
          // window.open('php/Informes/consproductoscontratos.php?contrato='+$scope.contrato+'&regimen='+$scope.regimen+'&producto='+$scope.producto);
          $http({
            method: "POST",
            url: "php/informes/mesaayudaaut.php",
            data: {
              function: "cosmayudaaut",
              annos: $scope.anno,
              periodo: $scope.periodo,
            },
          }).then(function (respuesta) {
            $scope.mesaayudaaut = respuesta.data;
            $scope.contTotal = 0;
            $scope.contActivo = 0;
            $scope.contProc = 0;
            $scope.contRech = 0;
            for (var i = $scope.mesaayudaaut.length - 1; i >= 0; i--) {
              $scope.contActivo =
                $scope.contActivo + Number($scope.mesaayudaaut[i].ACTIVOS);
              $scope.contProc =
                $scope.contProc + Number($scope.mesaayudaaut[i].PROCESADOS);
              $scope.contRech =
                $scope.contRech + Number($scope.mesaayudaaut[i].ANULADOS);
              $scope.contTotal =
                $scope.contTotal + Number($scope.mesaayudaaut[i].TOTAL);
            }
            $scope.consmayudaaut = true;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
          });
          break;

        case "13":
          $http({
            method: "POST",
            url: "php/informes/empresasmovilidad.php",
            data: { function: "cosmovempras" },
          }).then(function (respuesta) {
            $scope.empresasmovilidad = respuesta.data;
            $scope.contTotal = 0;
            $scope.contActivo = 0;
            $scope.contProc = 0;
            $scope.contRech = 0;
            for (var i = $scope.empresasmovilidad.length - 1; i >= 0; i--) {
              $scope.contActivo =
                $scope.contActivo + Number($scope.empresasmovilidad[i].ACTIVO);
              $scope.contProc =
                $scope.contProc + Number($scope.empresasmovilidad[i].PROCESADO);
              $scope.contRech =
                $scope.contRech + Number($scope.empresasmovilidad[i].RECHAZADO);
              $scope.contTotal =
                $scope.contTotal + Number($scope.empresasmovilidad[i].TOTAL);
            }

            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = true;
          });
          break;

        case "14":
          window.open(
            "php/financiera/reportes/sireci.php?ann=" +
            $scope.anno +
            "&per=" +
            $scope.periodo
          );

          break;

        case "15":
          var fecha_inicio = $filter("date")(
            new Date($scope.fecha_inicio),
            "dd/MM/yyyy"
          );
          var fecha_final = $filter("date")(
            new Date($scope.fecha_final),
            "dd/MM/yyyy"
          );
          window.open(
            "php/Informes/repautpss.php? &fecha_inicio=" +
            fecha_inicio +
            "&fecha_final=" +
            fecha_final +
            "&nit=" +
            $scope.nit
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "16":
          $http({
            method: "POST",
            url: "php/informes/mesadeayudaacas.php",
            data: { function: "cosmesayudaacas" },
          }).then(function (respuesta) {
            $scope.mesadeayudaacasa = respuesta.data;
            $scope.contTotal = 0;
            $scope.contActivo = 0;
            $scope.contProc = 0;
            $scope.contRech = 0;
            for (var i = $scope.mesadeayudaacasa.length - 1; i >= 0; i--) {
              $scope.contActivo =
                $scope.contActivo + Number($scope.mesadeayudaacasa[i].ACTIVO);
              $scope.contProc =
                $scope.contProc + Number($scope.mesadeayudaacasa[i].PROCESADO);
              $scope.contRech =
                $scope.contRech + Number($scope.mesadeayudaacasa[i].RECHAZADO);
              $scope.contTotal =
                $scope.contTotal + Number($scope.mesadeayudaacasa[i].TOTAL);
            }

            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = true;
          });

          break;

        case "17":
          var fecha_inicio = $filter("date")(
            new Date($scope.fecha_inicio),
            "dd/MM/yyyy"
          );
          var fecha_final = $filter("date")(
            new Date($scope.fecha_final),
            "dd/MM/yyyy"
          );

          window.open(
            "php/financiera/reportes/radicacion_x_afiliado.php?dpto=" +
            $scope.departamento +
            "&mun=" +
            $scope.municipio +
            "&fecha_inicio=" +
            fecha_inicio +
            "&fecha_final=" +
            fecha_final
          );
          break;

        case "18":
          window.open(
            "php/Informes/detaut.php?anno=" +
            $scope.anno +
            "&periodo=" +
            $scope.periodo
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "19":
          window.open(
            "php/Informes/repadmincas.php?anno=" +
            $scope.anno +
            "&periodo=" +
            $scope.periodo
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "20":
          window.open("php/Informes/contratoscapita.php");
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "21":
          window.open(
            "php/Informes/plandered.php?anofinal=" +
            $scope.anofinal +
            "&anoinicial=" +
            $scope.anoinicial
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "37":
          $scope.limpiar();
          var fecha = $filter("date")(new Date($scope.fecha), "dd/MM/yyyy");
          swal.showLoading();
          $http({
            method: "POST",
            url: "php/informes/cons_aut.php",
            data: {
              function: "obtener_reporte_seccional",
              pfecha: fecha,
              pdepartamento: $scope.departamento,
            },
          }).then(function (response) {
            $scope.documentos = response.data;
            if (response.data.length == 0) {
              notification.getNotification(
                "info",
                "No hay Datos Registrados!",
                "Notificacion"
              );
            }
            swal.close();
          });

          $scope.shw_funcionarios_aut = true;

          break;
        case "39":
          var fecha_inicio = $filter("date")(
            new Date($scope.fecha_inicio),
            "yyyy-MM-dd"
          );
          var fecha_final = $filter("date")(
            new Date($scope.fecha_final),
            "yyyy-MM-dd"
          );
          console.log(fecha_inicio + "--" + fecha_final);
          window.open(
            "php/Informes/aseguramiento/funcplandebusquedar2.php?s_fechainir2Call=" +
            fecha_inicio +
            "&s_fechafinr2Call=" +
            fecha_final
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "40":
          var fecha_inicio = $filter("date")(
            new Date($scope.fecha_inicio),
            "yyyy-MM-dd"
          );
          var fecha_final = $filter("date")(
            new Date($scope.fecha_final),
            "yyyy-MM-dd"
          );
          window.open(
            "php/Informes/aseguramiento/funcgrupofamiliar.php?s_fechainiGrupoFami=" +
            fecha_inicio +
            "&s_fechafinGrupoFami=" +
            fecha_final
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;
        case "41":
          var fecha_inicio = $filter("date")(
            new Date($scope.fecha_inicio),
            "yyyy-MM-dd"
          );
          var fecha_final = $filter("date")(
            new Date($scope.fecha_final),
            "yyyy-MM-dd"
          );
          window.open(
            "php/Informes/aseguramiento/funcplancontributivocallcenter.php?s_fechainiConCall=" +
            fecha_inicio +
            "&s_fechafinConCall=" +
            fecha_final
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "42":
          var fecha_inicio = $filter("date")(
            new Date($scope.fecha_inicio),
            "yyyy-MM-dd"
          );
          var fecha_final = $filter("date")(
            new Date($scope.fecha_final),
            "yyyy-MM-dd"
          );
          console.log(fecha_inicio);
          console.log(fecha_final);
          window.open(
            "php/Informes/dg_turnos.php?fecha_inicio=" +
            fecha_inicio +
            "&fecha_final=" +
            fecha_final +
            "&oficina=" +
            $scope.oficina
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "44":
          var fecha_inicio = $filter("date")(
            new Date($scope.fecha_inicio),
            "dd/MM/yyyy"
          );
          window.open(
            "php/Informes/repautfuncionario.php? &fecha_inicio=" + fecha_inicio
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "45":
          window.open(
            "php/Informes/reportepqr.php?anno=" +
            $scope.anno +
            "&periodo=" +
            $scope.periodo
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "51":
          var fecha_inicio = $filter("date")(
            new Date($scope.fecha_inicio),
            "dd/MM/yyyy"
          );
          var fecha_final = $filter("date")(
            new Date($scope.fecha_final),
            "dd/MM/yyyy"
          );
          window.open(
            "php/Informes/reporte_autorizaciones_circular_017_ST015_por_mes.php? &fecha_inicio=" +
            fecha_inicio +
            "&fecha_fin=" +
            fecha_final
          );
          $scope.shw_annos = false;
          $scope.shw_periodo = false;
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          $scope.consmesaayudacas = false;
          $scope.shw_fecha_inicio = true;
          $scope.shw_fecha_final = true;
          break;

        case "52":
          var fecha_inicio = $filter("date")(
            new Date($scope.fecha_inicio),
            "dd/MM/yyyy"
          );
          var fecha_final = $filter("date")(
            new Date($scope.fecha_final),
            "dd/MM/yyyy"
          );
          window.open(
            "php/Informes/Reporte_Homologacion_medicamentos_autorizaciones_por_mes.php? &fecha_inicio=" +
            fecha_inicio +
            "&fecha_fin=" +
            fecha_final
          );
          $scope.shw_annos = false;
          $scope.shw_periodo = false;
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          $scope.consmesaayudacas = false;
          $scope.shw_fecha_inicio = true;
          $scope.shw_fecha_final = true;
          break;
        case "53":
          var fecha_inicio = $filter("date")(
            new Date($scope.fecha_inicio),
            "dd/MM/yyyy"
          );
          var fecha_final = $filter("date")(
            new Date($scope.fecha_final),
            "dd/MM/yyyy"
          );
          window.open(
            "php/Informes/Reporte_Presupuestos_Maximos_Medicamentos_por_mes.php? &fecha_inicio=" +
            fecha_inicio +
            "&fecha_fin=" +
            fecha_final
          );
          $scope.shw_annos = false;
          $scope.shw_periodo = false;
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          $scope.consmesaayudacas = false;
          $scope.shw_fecha_inicio = true;
          $scope.shw_fecha_final = true;
          break;

        case "59":
          window.open(
            "php/Informes/autorizaciones_pos_control_interno.php?anno=" +
            $scope.anno +
            "&periodo=" +
            $scope.periodo
          );
          //$scope.shw_annos = false;
          // $scope.shw_periodo = false;
          break;
        case "60":
          window.open(
            "php/Informes/autorizaciones_altocosto_control_interno.php?anno=" +
            $scope.anno +
            "&periodo=" +
            $scope.periodo
          );
          // $scope.shw_annos = false;
          // $scope.shw_periodo = false;
          break;
        case "61":
          window.open(
            "php/Informes/tipificacionradicacion.php?anno=" +
            $scope.anno +
            "&periodo=" +
            $scope.periodo
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;

        case "65":
          window.open(
            "php/Informes/mesaayudadigiturno.php?anno=" +
            $scope.anno.toString() +
            "&periodo=" +
            $scope.periodo.toString()
          );
          console.log(scope.anno);
          break;
        case "66":
          $scope.obtener_usuarios_escenarios();
          break;
        case "68":
          var fecha_inicio = $filter("date")(
            new Date($scope.fecha_inicio),
            "dd/MM/yyyy"
          );
          var fecha_final = $filter("date")(
            new Date($scope.fecha_final),
            "dd/MM/yyyy"
          );
          var nit = $scope.nit;
          window.open(
            "php/Informes/reporteautqlik.php?fecha_inicio=" +
            fecha_inicio +
            "&fecha_final=" +
            fecha_final +
            "&nit=" +
            nit
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;
        case "69":
          var fecha_inicio = $filter("date")(
            new Date($scope.fecha_inicio),
            "dd/MM/yyyy"
          );
          var fecha_final = $filter("date")(
            new Date($scope.fecha_final),
            "dd/MM/yyyy"
          );
          var nit = $scope.nit;
          window.open(
            "php/Informes/reportecuentasmedicasqlik.php?fecha_inicio=" +
            fecha_inicio +
            "&fecha_final=" +
            fecha_final +
            "&nit=" +
            nit
          );
          $scope.consmayudaaut = false;
          $scope.consproductos = false;
          $scope.consmovempresa = false;
          break;
        case "88":
          if ($scope.anno == "" && $scope.periodo == "") {
            swal(
              "Información",
              "Por favor digite información para poder generar el reporte",
              "info"
            );
            return;
          } else {
            window.open(
              "php/informes/reporte_crue.php?vpanno=" +
              $scope.anno.toString() +
              "&vpmes=" +
              $scope.periodo.padStart(2, "0")
            );
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.shw_fecha_inicio = false;
            $scope.shw_fecha_final = false;
          }
          break;
        case "90":
          if ($scope.anno == "" && $scope.periodo == "") {
            swal(
              "Información",
              "Por favor digite información para poder generar el reporte",
              "info"
            );
            return;
          } else {
            window.open(
              "php/informes/reporte_crue.php?vpanno=" +
              $scope.anno.toString() +
              "&vpmes=" +
              $scope.periodo.padStart(2, "0")
            );
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.shw_fecha_inicio = false;
            $scope.shw_fecha_final = false;
          }
          break;
        case "92":
          if ($scope.nit == "" || $scope.nit == undefined) {
            swal(
              "Información",
              "Por favor digite información para poder generar la consulta",
              "info"
            );
            return;
          } else {
            swal.showLoading();
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $http({
              method: "POST",
              url: "php/informes/consultaterceroUrgencia.php",
              data: {
                function: "P_LISTA_IPS_URGENCIA",
                vpnit: $scope.nit,
              },
            }).then(function (respuesta) {
              if (respuesta.data.Codigo == 1) {
                $scope.infoMensaje = respuesta.data.Nombre;
                $scope.aviso_Informativo = true;
                $scope.error = true;
                $scope.succes = false;
                console.log($scope.info);
                swal.close();
                return "assets/images/reporte/error.svg";
              } else {
                $scope.error = false;
                $scope.succes = true;
                $scope.infoMensaje = respuesta.data[0].MENSAJE;
                $scope.aviso_Informativo = true;
                console.log($scope.info);
                swal.close();
                return "assets/images/reporte/success.svg";
              }
            });
          }
          break;

        case "93":
          if ($scope.fecha_inicio == "" && $scope.fecha_final == "") {
            swal(
              "Información",
              "Por favor digite información para poder generar el reporte",
              "info"
            );
            return;
          } else {
            var fecha_inicio = $filter("date")(
              new Date($scope.fecha_inicio),
              "dd/MM/yyyy"
            );
            var fecha_final = $filter("date")(
              new Date($scope.fecha_final),
              "dd/MM/yyyy"
            );
            window.open(
              "php/Informes/reportesupervisionContrato.php?fecha_inicio=" +
              fecha_inicio +
              "&fecha_final=" +
              fecha_final
            );
            $scope.mostrar_radicado_contratos = false;
            $scope.datos_contrato = {};
            $scope.fecha_inicio = "";
            $scope.fecha_final = "";
            $scope.shw_annos = false;
            $scope.shw_periodo = false;
            $scope.consmayudaaut = false;
            $scope.consproductos = false;
            $scope.consmovempresa = false;
            $scope.consmesaayudacas = false;
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;

          }
          break;

        case "94":
          swal({
            title: 'Cargando...'
          });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
              function: "P_INFORME_SERVICIOS",
            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) == '<br' || data == 0) {
              swal("Error", 'Sin datos', "warning").catch(swal.noop); return
            }
            if (data.Codigo == 1) {
              swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
            }
            if (data.length > 0) {
              var ws = XLSX.utils.json_to_sheet(data);
              /* add to workbook */
              var wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
              /* write workbook and force a download */
              XLSX.writeFile(wb, "Exportado Tutelas Servicios.xlsx");
              const text = `Registros encontrados ${data.length}`
              swal('¡Mensaje!', text, 'success').catch(swal.noop);
              setTimeout(() => { $scope.$apply(); }, 500);
            }
          })
          break;
      }
    };
    $scope.descdetalleacas = function () {
      window.open("php/Informes/detallemesadeayudaacas.php");
    };

    $scope.buscarDocumentoDet = function (doc) {
      swal.showLoading();
      $http({
        method: "POST",
        url: "php/informes/cons_aut.php",
        data: {
          function: "obtener_reporte_seccional_det",
          pfecha: doc.FECHA,
          pdepartamento: $scope.departamento,
          phora: doc.HORA1,
        },
      }).then(function (response) {
        $scope.documentos_det = response.data;
        if (response.data.length == 0) {
          notification.getNotification(
            "info",
            "No hay Datos Registrados!",
            "Notificacion"
          );
        }
        swal.close();
      });
      $scope.shw_funcionarios_aut_det = true;
    };

    $scope.obtener_usuarios_escenarios = function () {
      // var cont = 0;
      // if ($scope.numero_contrato == '') {
      //   cont++;
      // }
      // if ($scope.ubicacion == '') {
      //   cont++;
      // }
      // if ($scope.escenario == '') {
      //   cont++;
      // }
      // if (cont >= 2) {
      //   swal('Información', "Por favor digite información valida.", 'info');
      // }
      if ($scope.numero_contrato == "" || $scope.ubicacion == "") {
        //|| $scope.escenario == ''
        swal("Información", "Por favor digite información valida.", "info");
      } else {
        $http({
          method: "POST",
          url: "php/informes/informes_internos.php",
          data: {
            function: "obtener_usuarios_escenarios",
            numero_contrato: $scope.numero_contrato,
            ubicacion: $scope.ubicacion,
            escenario: $scope.escenario,
            // concepto: $scope.concepto,
            // estado_afiliado: $scope.estado_afiliado
          },
        }).then(function (response) {
          if (response.data.length > 0) {
            $scope.infousuarios = response.data;
            $scope.shwinfousuarios = true;
          } else {
            swal(
              "Información",
              "No se registraron usuarios asignados al escenario y al contrato digitados.",
              "info"
            );
            $scope.infousuarios = "";
            $scope.shwinfousuarios = false;
          }
        });
      }
    };

    $scope.getData = function () {
      // if ($scope.medicamentos.orden != "") {
      //   return $filter('filter')($filter('orderBy')($scope.historial.listado, 'RADICADO'), $scope.q);
      // } else {
      return $filter("filter")($scope.infousuarios, $scope.q);
      // }
    };
    $scope.numberOfPages = function () {
      return Math.ceil($scope.getData().length / $scope.pageSize);
    };
    $scope.$watch(
      "q",
      function (newValue, oldValue) {
        if (oldValue != newValue) {
          $scope.currentPage = 0;
        }
      },
      true
    );
    $scope.btns_paginacion = function (value) {
      $scope.currentPage = value;
      // window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    $scope.filter = function () {
      $scope.listDatosTemp = $filter("filter")($scope.infousuarios, $scope.q);
    };
  },
]);
