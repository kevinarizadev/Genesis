<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Ficha Tecnica</title>
  <link rel="icon" href="../../../assets/images/icon.ico" />
  <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
  <style type="text/css">
    @page {
      size: auto;
      margin: 1em;
      /* margin-left: 0.5em; */
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

    table,
    table tr th,
    table tr td {
      border: .5px solid black;
      border-collapse: collapse;
      font-size: 10px;
      border-spacing: 0 0 !important;
    }


    .text-center {
      text-align: center;
    }

    .text-left {
      text-align: left;
    }

    .text-right {
      text-align: right;
    }

    .text-bold7 {
      font-weight: 700;
    }

    .text-size8 {
      font-size: 8px !important;
    }

    .back-azul {
      background-color: #1a2e63;
    }

    .back-gray {
      background-color: lightgray;
    }

    .back-whitesmoke {
      background-color: whitesmoke;
    }

    .text-white {
      color: white;
    }

    .mtb-1 {
      margin: 5px 5px;
    }

    .ptb-1 {
      padding: 5px 5px;
    }
  </style>
  <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <script src="../../../bower_components/angular/angular.js"></script>
  <script src="../../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../../scripts/controllers/planeacion/formatos/formatoFichaTecnicaController.js"></script>

  <script src="../../../assets/js/libs/highcharts/highcharts.js"></script>
  <script src="../../../assets/js/libs/highcharts/exporting.js"></script>
  <script src="../../../assets/js/libs/highcharts/export-data.js"></script>
  <script src="../../../assets/js/libs/highcharts/accessibility.js"></script>

</head>
<!-- deeaf6 -->

<body ng-controller="formatoFichaTecnicaController">

  <table width="100%" style="border: #FFF;">
    <tr>
      <td class="text-center text-bold7 back-azul text-white ptb-1">NOMBRE DEL INDICADOR</td>
    </tr>
    <tr>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">
        {{datos.REGN_NOM_INDICADOR}}
      </td>
    </tr>
  </table>
  <br>
  <table width="100%" style="border: #FFF;">
    <tr>
      <td colspan="6" class="text-center text-bold7 back-azul text-white ptb-1">INFORMACIÓN PARA LA MEDICIÓN DEL INDICADOR</td>
    </tr>
    <tr>
      <td class="text-center text-bold7 back-gray ptb-1">
        UNIDAD DE MEDIDA
      </td>
      <td class="text-center text-bold7 back-gray ptb-1">
        FRECUENCIA
      </td>
      <td class="text-center text-bold7 back-gray ptb-1">
        META VIGENCIA
      </td>
      <td class="text-center text-bold7 back-gray ptb-1">
        TIPO DE INDICADOR
      </td>
      <td class="text-center text-bold7 back-gray ptb-1">
        LINEA BASE
      </td>
      <td class="text-center text-bold7 back-gray ptb-1">
        META OBJETIVO
      </td>
    </tr>
    <tr>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.REGN_UNIDAD_MEDIDA.split('-')[1]}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.REGC_PERIODICIDAD_ANALISIS.split('-')[1]}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.REGN_META_VIGENCIA}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{0}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.REGN_LINEA_BASE}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.REGN_META}}</td>
    </tr>
  </table>
  <br>
  <table width="100%" style="border: #FFF;">

    <tr>
      <td colspan="6" class="text-center text-bold7 back-azul text-white ptb-1">FUENTE DE INFORMACIÓN</td>
      <td colspan="3" class="text-center text-bold7 back-azul text-white ptb-1">CALCULO</td>
    </tr>
    <tr>
      <td colspan="6" class="text-center text-bold7 back-azul text-white ptb-1">RANGO - SEMAFORIZACIÓN</td>
      <td rowspan="3" class="text-center text-bold7 back-gray ptb-1">Sentido</td>
      <td rowspan="3" class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.REGC_TIPO.split('-')[1]}}</td>
      <td rowspan="3" class="text-center text-bold7 back-whitesmoke ptb-1">0000</td>
    </tr>
    <tr>
      <td colspan="2" class="text-center text-bold7 back-azul text-white ptb-1">Alto</td>
      <td colspan="2" class="text-center text-bold7 back-azul text-white ptb-1">Medio</td>
      <td colspan="2" class="text-center text-bold7 back-azul text-white ptb-1">Bajo</td>
    </tr>
    <!-- ASCENDENTE -->
    <tr ng-if="datos.REGC_TIPO.split('-')[0] == 'A'">
      <td class="text-center text-bold7 back-whitesmoke ptb-1">>=</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.REGC_DATO1}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">>=</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.REGC_DATO2}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">
        <= </td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.REGC_DATO3}}</td>
    </tr>
    <!-- DESCENDENTE -->
    <tr ng-if="datos.REGC_TIPO.split('-')[0] == 'D'">
      <td class="text-center text-bold7 back-whitesmoke ptb-1">
        <= </td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.REGC_DATO1}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">
        <= </td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.REGC_DATO2}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">>=</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.REGC_DATO3}}</td>
    </tr>
  </table>

  <br>
  <table width="100%" style="border: #FFF;">
    <tr>
      <td colspan="{{datosMeses.length + 1}}" class="text-left text-bold7 back-azul text-white ptb-1">COMPORTAMIENTO DEL INDICADOR</td>
    </tr>
    <tr>
      <td width="20%" class="text-center text-bold7 back-gray ptb-1">Meses</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1" ng-repeat="x in datosMeses">{{x.GESN_PERIODO_NOMBRE}}</td>
    </tr>
    <tr>
      <td class="text-center text-bold7 back-gray ptb-1">Dato Numerador</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1" ng-repeat="x in datosMeses">{{x.GESN_NUMERADOR}}</td>
    </tr>
    <tr>
      <td class="text-center text-bold7 back-gray ptb-1">Dato Denominador</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1" ng-repeat="x in datosMeses">{{x.GESN_DENOMINADOR}}</td>
    </tr>
    <tr>
      <td class="text-center text-bold7 back-gray ptb-1">Constante</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1" ng-repeat="x in datosMeses">{{x.GESN_CONSTANTE}}</td>
    </tr>
  </table>

  <br>
  <table width="100%" style="border: #FFF;">
    <tr>
      <td colspan="6" class="text-left text-bold7 back-azul text-white ptb-1">MEDICION</td>
    </tr>
    <tr>
      <td class="text-left text-bold7 back-azul text-white ptb-1">Periodo</td>
      <td class="text-left text-bold7 back-azul text-white ptb-1">Datos</td>
      <td class="text-left text-bold7 back-azul text-white ptb-1">Meta Vigencia</td>
      <!-- <td class="text-left text-bold7 back-azul text-white ptb-1">Meta Objetivo</td> -->
      <!-- <td class="text-left text-bold7 back-azul text-white ptb-1">Análisis</td> -->
      <td width="60%" class="text-center text-bold7 back-azul text-white ptb-1">GRÁFICA</td>
    </tr>
    <tr ng-repeat="x in datosMeses">
      <td class="text-left text-bold7 back-whitesmoke ptb-1">{{x.GESN_PERIODO_NOMBRE}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{x.GESN_ACUMULADO}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{x.GESN_META_VIGENCIA}}</td>
      <!-- <td class="text-left text-bold7 back-whitesmoke ptb-1">Meta Objetivo</td> -->
      <!-- <td class="text-left text-bold7 back-whitesmoke ptb-1">Análisis</td> -->
      <td rowspan="{{datosMeses.length}}" width="60%" class="text-center ptb-1" ng-show="$index == 0">

        <div class="" id="graficoIndicador" style="zoom: 1;width: 100 !important;">
        </div>

      </td>
    </tr>
  </table>
</body>

</html>

<!-- GESN_ACUMULADO: 2 -->
<!-- GESN_ANNO: 2023 -->
<!-- GESN_CONSTANTE: 1 -->
<!-- GESN_DENOMINADOR: 8 -->
<!-- GESN_META_VIGENCIA: 2.5 -->
<!-- GESN_NUMERADOR: 10 -->
<!-- GESN_PERIODO: 3 -->
<!-- GESN_PERIODO_NOMBRE: "Marzo" -->


<!-- REGC_DATO1: "97" -->
<!-- REGC_DATO2: "0.5" -->
<!-- REGC_DATO3: "2.5" -->
<!-- REGC_DATOMAX: "100" -->
<!-- REGC_PERIODICIDAD_ANALISIS: "T-TRIMESTRAL" -->
<!-- REGC_PERIODICIDAD_ANALISIS_MESES: "4" -->
<!-- REGC_TIPO: "D-DESCENDENTE" -->
<!-- REGC_TIPO_CALCULO: "TL-TALENTO" -->
<!-- REGN_LINEA_BASE: "1,8" -->
<!-- REGN_META: "2,5" -->
<!-- REGN_META_VIGENCIA: "2,5" -->
<!-- REGN_NOM_INDICADOR: "ÍNDICE DE TUTELA POR CADA 1000 AFILIADOS" -->
<!-- REGN_UNIDAD_MEDIDA: "6-TASA" -->
