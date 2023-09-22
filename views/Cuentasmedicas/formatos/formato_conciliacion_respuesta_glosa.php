<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Formato de Conciliación de Glosa</title>
  <link rel="icon" href="../../../assets/images/icon.ico" />
  <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
  <style type="text/css">
    @page {
      size: auto;
      margin: 1.3em;
    }

    * {
      font-family: 'Open Sans', sans-serif;
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      /* -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none; */
    }

    #table1,
    #table1 tr th,
    #table1 tr td {
      border: .5px solid black;
      border-collapse: collapse;
      font-size: 7px;
      border-spacing: 0 0 !important;
      font-weight: 600;
    }

    .fs_10 {
      font-size: 10px !important;
    }

    .border_white td {
      border-top: 0px solid white !important;
      border-right: 0px solid white !important;
      border-left: 0px solid white !important;
    }

    .fondoAzul {
      background-color: #1a2e63;
      color: white !important;
    }

    .txtCenter {
      text-align: center !important;
    }

    .pad7 {
      padding: 7px !important;
    }

    .pad_t25 {
      padding-top: 25px !important;
    }

    .verAlign_bottom {
      vertical-align: bottom;
    }

    .d_grid {
      display: grid;
    }

    .pad10 {
      padding: 10px;
    }

    .Firma {
      background-size: cover;
      width: 200px;
      height: 85px;
      margin: auto;
      background-position-y: 0;
      filter: grayscale(100%);
    }
  </style>
  <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <script src="../../../bower_components/angular/angular.js"></script>
  <script src="../../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../../scripts/controllers/cuentasmedicas/formatos/formatoconciliacionrespuestaglosaController.js"></script>
</head>
<!-- 1a2e63 -->

<body ng-controller="formatoconciliacionrespuestaglosaController">
  <table id="table1" width="100%" style="border: #FFF;">
    <tr class="border_white">
      <td width="3%"></td>
      <td width="10%"></td>
      <td width="15%"></td>
      <td width="10%"></td>
      <td width="15%"></td>
      <td width="10%"></td>
      <td width="15%"></td>
      <td width="22%"></td>
    </tr>
    <!--  -->
    <tr>
      <td colspan="1" rowspan="3" style="text-align: center;">
        <img style="width: 10em;" src="../../../assets/images/logo_cajacopieps.png">
      <td colspan="6" rowspan="2" class="fs_10" style="text-align: center;padding:0.1% 0%;">FORMATO ACTA DE CONCILIACIÓN DE RESPUESTA DE GLOSAS</td>
      <td colspan="1">
        Código: CM-FR-04
      </td>
    </tr>
    <tr>
      <td colspan="1">Version: 01</td>
    </tr>
    <tr>
      <td colspan="6" class="fs_10" style="text-align: center;padding:1% 0%;">
        PROCEDIMIENTO DE AUDITORIA DE CUENTAS MÉDICAS</td>
      <td colspan="1">Fecha: Febrero 2023</td>
    </tr>
    <tr>
      <td colspan="1" class="txtCenter">FECHA:</td>
      <td colspan="2" class="txtCenter">{{fecha}}</td>
      <td colspan="4" rowspan="2" class="txtCenter">COORDINACION NACIONAL DE CUENTAS MEDICAS</td>
      <td colspan="1" class="fondoAzul pad7 txtCenter">NOMBRE DEL PSS - NIT</td>
    </tr>
    <tr>
      <td colspan="1" class="txtCenter pad7">LUGAR:</td>
      <td colspan="2" class="txtCenter">{{lugar}}</td>
      <td colspan="1" class="txtCenter">{{ips}}</td>
      <!-- <td colspan="2" class="txtCenter">{{datosCabeza.nombre_pss_nit}}</td> -->
    </tr>
    <!--  -->
    <tr>
      <td colspan="1" class="txtCenter fondoAzul">FACTURA N°</td>
      <td colspan="1" class="txtCenter fondoAzul">VALOR DE FACTURA</td>
      <td colspan="1" class="txtCenter fondoAzul">VALOR GLOSA</td>
      <td colspan="1" class="txtCenter fondoAzul">GLOSA ACEPTADA POR IPS</td>
      <td colspan="1" class="txtCenter fondoAzul">VALOR LEVANTADO POR EPS</td>
      <td colspan="1" class="txtCenter fondoAzul">GLOSA RATIFICADA POR EPS</td>
      <td colspan="2" class="txtCenter fondoAzul">OBSERVACIONES</td>
    </tr>
    <tr ng-repeat="x in datosDetalle">
      <td colspan="1" class="txtCenter">{{x.NUM_FACTURA}}</td>
      <td colspan="1" class="txtCenter">$ {{formatPeso2(x.VALOR_FS)}}</td>
      <td colspan="1" class="txtCenter">$ {{formatPeso2(x.VALOR_GLOSA)}}</td>
      <td colspan="1" class="txtCenter">$ {{formatPeso2(x.NTDV_VALOR_GI_IPS)}}</td>
      <td colspan="1" class="txtCenter">$ {{formatPeso2(x.NTDV_VALOR_GL_EPS)}}</td>
      <td colspan="1" class="txtCenter">$ {{formatPeso2(x.NTDV_VALOR_RATIFICADO)}}</td>
      <td colspan="2" class="txtCenter">{{x.OBSERVACION}}</td>
    </tr>

    <tr>
      <td colspan="1" class="txtCenter pad7">TOTAL</td>
      <td colspan="1" class="txtCenter">$ {{formatPeso2(totalFactura)}}</td>
      <td colspan="1" class="txtCenter">$ {{formatPeso2(totalGlosa)}}</td>
      <td colspan="1" class="txtCenter">$ {{formatPeso2(Total_Glosa_IPS)}}</td>
      <td colspan="1" class="txtCenter">$ {{formatPeso2(Total_Glosa_EPS)}}</td>
      <td colspan="1" class="txtCenter">$ {{formatPeso2(Total_Glosa_MANT)}}</td>
      <td colspan="2"></td>
    </tr>
    <!--  -->
    <tr>
      <td colspan="4" class="txtCenter fondoAzul">NOMBRE DEL PSS - NIT</td>
      <td colspan="4" class="txtCenter fondoAzul">REPRESENTANTE DE CUENTAS MÉDICAS CAJACOPI EPS SAS</td>
    </tr>
    <tr>
      <td colspan="4" rowspan="3" class="txtCenter">{{ips}} - {{ipsNit}}</td>
      <td colspan="4" rowspan="1" class="txtCenter pad10">
        <span>{{responsableEPS}}</span>
      </td>
    </tr>
    <tr>
      <td colspan="4" class="txtCenter fondoAzul">REPRESENTANTE DE IPS</td>
    </tr>
    <tr>
      <td colspan="4" class="txtCenter pad10">
        <span>{{responsableIPS}}</span>
      </td>
    </tr>

  </table>

</body>

</html>
