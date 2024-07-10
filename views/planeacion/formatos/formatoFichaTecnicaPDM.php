<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Ficha Tecnica PDM</title>
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

    body {
      zoom: .7;
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

    .text-size10 {
      font-size: 10px !important;
    }

    .back-azul {
      background-color: #1a2e63;
    }

    .back-gray {
      background-color: #bac0de;
      /* background-color: lightgray; */
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

    hr {
      margin: 1px;
      border-color: transparent;
    }

  </style>
  <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <script src="../../../bower_components/angular/angular.js"></script>
  <script src="../../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../../scripts/controllers/planeacion/formatos/formatoFichaTecnicaPDMController.js"></script>

  <script src="../../../assets/js/libs/highcharts/highcharts.js"></script>
  <script src="../../../assets/js/libs/highcharts/exporting.js"></script>
  <script src="../../../assets/js/libs/highcharts/export-data.js"></script>
  <script src="../../../assets/js/libs/highcharts/accessibility.js"></script>

</head>
<!-- deeaf6 -->

<body ng-controller="formatoFichaTecnicaPDMController">

  <table width="100%" style="border: #FFF;" class="text-bold7">
    <tr>
      <td colspan="1" style="text-align: center;">
        <img style="width: 20em;" src="../../../assets/images/logo_cajacopieps.png">
      </td>
    </tr>
    <tr>
      <td colspan="1" class="text-center text-bold7 back-azul text-white ptb-1">FICHA TECNICA - INDICADOR PDM</td>
    </tr>
  </table>
  <hr>
  <table width="100%" style="border: #FFF;">
    <tr>
      <td colspan="1" class="text-center text-bold7 back-azul text-white ptb-1">DEFINICION DEL INDICADOR</td>
    </tr>
  </table>
  <hr>
  <table width="100%" style="border: #FFF;">
    <tr>
      <td class="text-center text-bold7 back-gray ptb-1">
        NIVEL
      </td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">
        {{datos.NIVEL}}
      </td>
      <td class="text-center text-bold7 back-gray ptb-1">
        HALLAZGO
      </td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">
        {{datos.HALLAZGO}}
      </td>
      <td class="text-center text-bold7 back-gray ptb-1">
        AÑO
      </td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">
        {{datos.ANNO}}
      </td>
    </tr>
  </table>
  <hr>
  <table width="100%" style="border: #FFF;">
    <tr>
      <td class="text-center text-bold7 back-azul text-white ptb-1">NOMBRE DEL INDICADOR</td>
    </tr>
    <tr>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">
        {{datos.NOMBRE_INDICADOR}}
      </td>
    </tr>
  </table>
  <hr>
  <table width="100%" style="border: #FFF;">
    <tr>
      <td class="text-center text-bold7 back-azul text-white ptb-1">DESCRIPCIÓN HALLAZGO</td>
    </tr>
    <tr>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">
        {{datos.DESCRIPCION_HALLAZGO}}
      </td>
    </tr>
  </table>
  <hr>
  <table width="100%" style="border: #FFF;">
    <tr>
      <td class="text-center text-bold7 back-azul text-white ptb-1">ACCIÓN DE MEJORA</td>
    </tr>
    <tr>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">
        {{datos.ACCION_MEJORA}}
      </td>
    </tr>
  </table>
  <hr>
  <table width="100%" style="border: #FFF;">
    <tr>
      <td class="text-center text-bold7 back-azul text-white ptb-1">DESCRIPCIÓN DE LA ACCION DE MEJORA</td>
    </tr>
    <tr>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">
        {{datos.DESCRIPCION_MEJORA}}
      </td>
    </tr>
  </table>
  <hr>
  <table width="100%" style="border: #FFF;">
    <tr>
      <td colspan="9" class="text-center text-bold7 back-azul text-white ptb-1">INFORMACIÓN PARA LA MEDICIÓN DEL
        INDICADOR</td>
    </tr>
    <tr>
      <td class="text-center text-bold7 back-gray ptb-1">
        UNIDAD DE MEDIDA
      </td>
      <td class="text-center text-bold7 back-gray ptb-1">
        META
      </td>
      <td class="text-center text-bold7 back-gray ptb-1">
        FRECUENCIA
      </td>
      <td class="text-center text-bold7 back-gray ptb-1">
        RESPONSABLES
      </td>
    </tr>
    <tr>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.UNIDAD_MEDIDA.split('-')[1]}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.META}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.FRECUENCIA.split('-')[1]}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.RESPONSABLES}}</td>
    </tr>
  </table>
  <hr>
  <table width="100%" style="border: #FFF;">

    <tr>
      <td colspan="3" class="text-center text-bold7 back-azul text-white ptb-1">RANGO - SEMAFORIZACIÓN</td>
      <td colspan="3" class="text-center text-bold7 back-azul text-white ptb-1">CALCULO</td>
    </tr>
    <!-- <tr>
      <td rowspan="3" class="text-center text-bold7 back-gray ptb-1">Sentido</td>
      <td rowspan="3" class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.TIPO.split('-')[1]}}</td>
      <td rowspan="3" class="text-center text-bold7 back-whitesmoke ptb-1">0000</td>
    </tr> -->
    <tr>
      <td class="text-center text-bold7 back-gray ptb-1">Alto</td>
      <td class="text-center text-bold7 back-gray ptb-1">Medio</td>
      <td class="text-center text-bold7 back-gray ptb-1">Bajo</td>
      <td class="text-center text-bold7 back-gray ptb-1">Fórmula</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.TIPO_CALCULO.split('-')[1]}}</td>
      <td rowspan="2" class="text-center text-bold7 back-whitesmoke ptb-1">
        <!-- FORMULAS -->
        <!-- TIPO_CALCULO -->
        <div style="font-size: 1.2rem;" ng-show="datos.TIPO_CALCULO.split('-')[0] == 'CA'">
          <math display="inline">
            <mrow>
              <mn>C</mn>
            </mrow>
          </math>
        </div>
        <div style="font-size: 1.2rem;" ng-show="datos.TIPO_CALCULO.split('-')[0] == 'PO'">
          <math display="inline">
            <mfrac>
              <msup>
                <mn>A</mn>
              </msup>
              <mn>B</mn>
            </mfrac>
            <mo>*</mo>
            <mn>100</mn>
            <mo>=</mo>
            <mn>X</mn>
          </math>
        </div>
        <div style="font-size: 1.2rem;" ng-show="datos.TIPO_CALCULO.split('-')[0] == 'RA'">
          <math display="inline">
            <mfrac>
              <msup>
                <mn>A</mn>
              </msup>
              <mn>B</mn>
            </mfrac>
            <mo>=</mo>
            <mn>X</mn>
          </math>
        </div>
        <div style="font-size: 1.2rem;" ng-show="datos.TIPO_CALCULO.split('-')[0] == 'TA'">
          <math display="inline">
            <mfrac>
              <msup>
                <mn>A</mn>
              </msup>
              <mn>B</mn>
            </mfrac>
            <mo>*</mo>
            <mn>C</mn>
            <mo>=</mo>
            <mn>X</mn>
          </math>
        </div>
        <div style="font-size: 1.2rem;" ng-show="datos.TIPO_CALCULO.split('-')[0] == 'VA'">
          <math display="inline">
            <mfrac>
              <msup>
                <mn>A</mn>
                <mo>-</mo>
                <mn>B</mn>
              </msup>
              <mn>B</mn>
            </mfrac>
            <mo>*</mo>
            <mn>100</mn>
            <mo>=</mo>
            <mn>X</mn>
          </math>
        </div>
        <div style="font-size: 1.2rem;" ng-show="datos.TIPO_CALCULO.split('-')[0] == 'DI'">
          <math display="inline">
            <mn>100</mn>
            <mo>-</mo>
            <mfrac>
              <msup>
                <mn>A</mn>
              </msup>
              <mn>B</mn>
            </mfrac>
            <mo>*</mo>
            <mn>100</mn>
            <mo>=</mo>
            <mn>X</mn>
          </math>
        </div>
        <div style="font-size: 1.2rem;" ng-show="datos.TIPO_CALCULO.split('-')[0] == 'AJ'">
          <math display="inline">
            <mn>C</mn>
            <mo>-</mo>
            <mfrac>
              <msup>
                <mn>C</mn>
                <mo>*</mo>
                <mn>A</mn>
              </msup>
              <mn>B</mn>
            </mfrac>
            <mo>=</mo>
            <mn>X</mn>
          </math>
        </div>
        <div style="font-size: 1.2rem;" ng-show="datos.TIPO_CALCULO.split('-')[0] == 'DE'">
          <math display="inline">
            <mn>1</mn>
            <mo>-</mo>
            <mfrac>
              <msup>
                <mn>A</mn>
              </msup>
              <mn>B * C</mn>
            </mfrac>
            <mo>=</mo>
            <mn>X</mn>
          </math>
        </div>
        <div style="font-size: 1.2rem;" ng-show="datos.TIPO_CALCULO.split('-')[0] == 'TL'">
          <math display="inline">
            <mo>(</mo>
            <mn>A</mn>
            <mo>-</mo>
            <mn>B</mn>
            <mo>)</mo>
            <mo>*</mo>
            <mn>C</mn>
            <mo>=</mo>
            <mn>X</mn>
          </math>
        </div>
        <div style="font-size: 1.2rem;" ng-show="datos.TIPO_CALCULO.split('-')[0] == 'CT'">
          <math display="inline">
            <mn>A</mn>
            <mo>-</mo>
            <mn>B</mn>
            <mo>=</mo>
            <mn>X</mn>
          </math>
        </div>
        <!-- TIPO_CALCULO -->
        <!-- FORMULAS -->
      </td>
    </tr>
    <!-- ASCENDENTE -->
    <tr ng-if="datos.TIPO.split('-')[0] == 'A'">
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.valorAlto}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.valorMedio}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.valorBajo}}</td>
      <td class="text-center text-bold7 back-gray ptb-1">Sentido</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.TIPO.split('-')[1]}}</td>
    </tr>
    <!-- DESCENDENTE -->
    <tr ng-if="datos.TIPO.split('-')[0] == 'D'">
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.valorAlto}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.valorMedio}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.valorBajo}}</td>
      <td class="text-center text-bold7 back-gray ptb-1">Sentido</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{datos.TIPO.split('-')[1]}}</td>
    </tr>
  </table>
  <hr>
  <table width="100%" style="border: #FFF;">
    <tr>
      <td colspan="{{datosMeses.length + 1}}" class="text-center text-bold7 back-azul text-white ptb-1">COMPORTAMIENTO
        DEL INDICADOR</td>
    </tr>
    <tr>
      <td width="20%" class="text-center text-bold7 back-gray ptb-1">Meses</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1" ng-repeat="x in datosMeses">{{x.GESN_PERIODO_NOMBRE}}
      </td>
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

  <hr>
  <table width="100%" style="border: #FFF;">
    <tr>
      <td colspan="6" class="text-center text-bold7 back-azul text-white ptb-1">MEDICION</td>
    </tr>
    <tr>
      <td class="text-left text-bold7 back-azul text-white ptb-1">Periodo</td>
      <td class="text-left text-bold7 back-azul text-white ptb-1">Resultado</td>
      <td class="text-left text-bold7 back-azul text-white ptb-1">Meta</td>
      <td class="text-left text-bold7 back-azul text-white ptb-1">Estado</td>
      <!-- <td class="text-left text-bold7 back-azul text-white ptb-1">Análisis</td> -->
      <td width="60%" class="text-center text-bold7 back-azul text-white ptb-1">GRÁFICA</td>
    </tr>
    <tr ng-repeat="x in datosMeses">
      <td class="text-left text-bold7 back-whitesmoke ptb-1">{{x.GESN_PERIODO_NOMBRE}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{x.GESN_RESULTADO}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{x.GESN_META}}</td>
      <td class="text-center text-bold7 back-whitesmoke ptb-1">{{x.ESTADO_ACTUAL.split('-')[0]}}</td>
      <!-- <td class="text-left text-bold7 back-whitesmoke ptb-1">Meta Objetivo</td> -->
      <!-- <td class="text-left text-bold7 back-whitesmoke ptb-1">Análisis</td> -->
      <td rowspan="{{datosMeses.length}}" width="60%" class="text-center ptb-1" ng-show="$index == 0">

        <div class="" id="graficoIndicador" style="zoom: 1;width: 100 !important;">
        </div>

      </td>
    </tr>
  </table>
  <hr>
  <table width="100%" style="border: #FFF;">
    <tr>
      <td class="text-center text-bold7 back-azul text-white ptb-1">Análisis/Interpretación de Resultados del Indicador
      </td>
    </tr>
    <tr ng-repeat="x in datosMeses">
      <td class="text-left back-whitesmoke ptb-1">
        <span class="text-bold7">{{x.GESN_PERIODO_NOMBRE}}:</span>
        <p><label>{{x.GESC_OBSERVACION}}</label></p>
      </td>
    </tr>
  </table>
</body>

</html>
