<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Anexo 11</title>
  <link rel="icon" href="../../../assets/images/icon.ico" />
  <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
  <style type="text/css">
    @page {
      size: auto;
      margin: 1em;
    }


    * {
      font-family: 'Open Sans', sans-serif;
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      font-size: 11px;
    }

    @media print {

      .table_con,
      .table_con tr th,
      .table_con tr td {
        word-wrap: break-word;
      }
    }



    .table_con,
    .table_con tr th,
    .table_con tr td {
      border: .5px solid black;
      border-collapse: collapse;

      padding: 3px;

    }

    .w100 {
      width: 100%;
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

    .text-bold5 {
      font-weight: 500;
    }

    .text-bold7 {
      font-weight: 700;
    }

    .ts_11 {
      font-size: 11px;
    }

    .ts_14 {
      font-size: 14px;
    }

    .back-gray {
      background-color: lightgray;
    }

    .page_break_after {
      page-break-after: always;
    }

    thead.report-header {
      display: table-header-group;
    }

    tfoot.report-footer {
      display: table-footer-group;
    }

    #minuta_contrato {
      text-align: justify;
    }

    .minuta_titulo {
      font-weight: 700;
      color: #8897a7;
    }

    .tabla_estilo {
      background-color: #c5dbf1;
    }


    .mb {
      margin-bottom: 2vh;
    }

    .p3x {
      padding: 3px;
    }

    .minuta_texto {
      text-align: justify;
    }

    .d-flex {
      display: flex;
    }

    .ml {
      margin-left: 3vw;
    }

    ol.letra {
      list-style: lower-alpha;
    }

    ol.romano {
      list-style: lower-roman;
    }
  </style>
  <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <script src="../../../bower_components/angular/angular.js"></script>
  <script src="../../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../../scripts/controllers/contratacion/formatos/formatoanexosController.js"></script>
</head>

<body ng-controller="formatoanexosController">


  <!-- ANEXOS EPS VIEJA -->
  <table class="report-container w100" style="page-break-before:always">
    <thead class="report-header">
      <tr>
        <th class="report-header-cell">
          <div class="header-info text-left d-flex">
            <img style="width: 12em;height: 5vh;" src="../../../assets/images/logo_cajacopieps.png" alt="cajacopi">
            <div class="text-bold7">
              ANEXO N° 11 {{tituloMinuta}}</div>
          </div>
        </th>
      </tr>
    </thead>
    <tfoot class="report-footer">
      <tr>
        <td class="report-footer-cell">

        </td>
      </tr>
    </tfoot>
    <tbody class="report-content">
      <tr>
        <td>
          <div id="minuta_contrato">
            <br>
            <div class="minuta_titulo mb ts_14">
              Anexo 11. Mecanismos de ajuste de riesgo frente a las desviaciones de la nota técnica
            </div>

            <p class="mb">
              Se define como mecanismos de ajuste de riesgo frente a las desviaciones de la nota técnica al conjunto de
              medidas que deben ser pactadas en las modalidades de pago prospectivas, con el objeto de mitigar el
              impacto financiero ocasionado por las desviaciones encontradas durante la ejecución del acuerdo de
              voluntades que afecten las frecuencias de uso, poblaciones y costos finales de atención, frente a lo
              previsto en la nota técnica, de acuerdo con la caracterización poblacional
              inicialmente conocida por las partes.
            </p>

            <p class="mb">
              En las circunstancias descritas debe primero establecerse si las desviaciones encontradas obedecen a la
              generación del riesgo primario o del riesgo técnico incluidos en la construcción de la nota técnica que
              estableció el valor del contrato así:
            </p>

            <ol>
              <li><b>Riesgo primario.</b> Es la variación en la incidencia o en la severidad no evitable de un evento o
                condición médica en la población asignada, que afecta financieramente a quien asume este riesgo. </li>
              <li><b>Riesgo técnico.</b> Es la variación en la utilización de recursos en la atención en salud, en la
                ocurrencia de complicaciones o en la severidad, que se encuentra asociada a factores no previsibles en
                la atención o no soportados con la evidencia científica y que afecta financieramente a quien asume este
                riesgo. </li>
            </ol>

            <p class="mb">
              En este entendido, para el presente acuerdo de voluntades se pactan entre las partes los siguientes
              mecanismos de ajuste de riesgo frente a las desviaciones de la nota técnica:
            </p>

            <ol>
              <li>Las partes realizarán en conjunto el monitoreo y la evaluación mensual de la nota técnica para
                determinar su cumplimiento o desviación en cuanto a población susceptible, frecuencias y valores, con el
                fin de determinar la necesidad de ajustes en los mismos, a través de los mecanismos de ajuste de riesgo
                frente a las desviaciones de la nota técnica que se detallarán más adelante. </li>
              <li>Del anterior proceso se elaborará un acta en el que se documentará el resultado de la medición de
                los siguientes indicadores:
                <ol class="letra">
                  <li>Porcentaje de ejecución financiera del valor mensual del acuerdo de voluntades calculado en la
                    nota técnica en el mes que está siendo evaluado.</li>
                  <li>Porcentaje de ejecución financiera del valor total del acuerdo de voluntades calculado en la
                    nota técnica en lo corrido del contrato hasta la fecha de corte de su evaluación. </li>
                  <li>Porcentaje de variación de la población susceptible. Este indicador se medirá en dos lapsos a
                    saber:
                    <ol class="romano">
                      <li>Porcentaje de variación de la población atendida en el mes, con relación a la definida como
                        variable en la nota técnica dividida entre el número de meses de duración del acuerdo de
                        voluntades.</li>
                      <li>Porcentaje de variación de la población atendida en el trimestre, con relación a la
                        definida como variable en la nota técnica dividida entre el número de trimestres de duración del
                        acuerdo de voluntades.</li>
                    </ol>
                  </li>
                  <li>Porcentaje de variación del promedio de frecuencias de uso de los servicios incluidos en la nota
                    técnica:
                    <ol class="romano">
                      <li>Porcentaje de variación del promedio de las frecuencias de uso en el mes de los servicios
                        incluidos en la nota técnica, con relación al definido como variable en la nota técnica.</li>
                      <li>Porcentaje de variación del promedio de las frecuencias de uso en el trimestre de los
                        servicios incluidos en la nota técnica, con relación al definido como variable en la nota
                        técnica.</li>
                    </ol>
                  </li>
                  <li>
                    Porcentaje de variación del promedio del valor de los servicios incluidos en la nota técnica:
                    <ol class="romano">
                      <li>Porcentaje de variación del promedio de valor de los servicios incluidos en la nota técnica en
                        el mes, con relación al definido como variable en la nota técnica.</li>
                      <li>Porcentaje de variación del promedio de valor de los servicios incluidos en la nota técnica en
                        el trimestre, con relación al definido como variable en la nota técnica.</li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>Diferencia de ejecución mensual (valor ejecutado en el mes menos el valor mensual de ejecución
                calculado en la nota técnica). </li>
              <li>Diferencia de ejecución trimestral (valor ejecutado en el trimestre menos el valor mensual de
                ejecución calculado en la nota técnica). </li>
              <li>Variación mensual de la ejecución con respecto al valor mensual calculado en la nota técnica.</li>
            </ol>

            <p class="mb">
              Con base en los anteriores indicadores, se harán los siguientes ajustes de forma trimestral:
            </p>

            <ol>
              <li>
                Si la ejecución del acuerdo de voluntades es superior al calculado en la nota técnica (resultado
                positivo)
                <ol class="letra">
                  <li>Si la variación de la población atendida en el trimestre con respecto a la susceptible calculada
                    en la nota técnica para un trimestre es mayor que cero (0), se pagará a la IPS el valor que resulte
                    de restar el valor ejecutado en el trimestre menos el valor trimestral calculado en la nota técnica.
                  </li>
                  <li>Si la variación mensual de la ejecución con respecto al valor mensual calculado en la nota
                    técnica es mayor al 10% el pago de la desviación se hará en el curso del mes siguiente.</li>
                  <li>Si la variación de la población atendida con respecto a la susceptible dividida entre el número
                    de trimestres del acuerdo de voluntades es cero (0) o mayor, no habrá lugar a pago alguno.</li>
                </ol>
              </li>
              <li>
                Si la ejecución del acuerdo de voluntades es inferior al calculado en la nota técnica (resultado
                negativo)
                <ol class="letra">
                  <li>Si la variación del costo promedio o de la frecuencia de uso en el trimestre con respecto a las
                    calculadas en la nota técnica para un trimestre es mayor que cero (0), se descontará a la IPS el
                    valor que resulte de restar el valor trimestral calculado en la nota técnica menos el valor
                    ejecutado en el trimestre. </li>
                  <li>Si la variación mensual de la ejecución con respecto al valor mensual calculado en la nota
                    técnica es mayor al 10% el descuento de la desviación se descontará en partes iguales en los dos (2)
                    meses siguientes.</li>
                  <li>Si la variación del costo promedio o de la frecuencia de uso en el trimestre con respecto a las
                    calculadas en la nota técnica para un trimestre es cero (0) o menor, no habrá lugar a descuento
                    alguno.</li>
                </ol>
              </li>
            </ol>

            <p class="mb">
              Las variaciones en el número de personas atendidas con relación al número de personas susceptibles
              calculadas en la nota técnica o de las frecuencias de uso promedio o del valor promedio de servicios
              mayores al 10%, en cualquiera de los dos sentidos, en tres meses consecutivos, dará lugar al
              replanteamiento de la nota técnica y el consecuente ajuste en el acuerdo de voluntades a través de un
              otrosí que dé cuenta de la corrección requerida.
            </p>

            <!-- class="romano" -->
            <!--
            <ol class="romano">
              <li></li>
              <li></li>
            </ol>
          -->

        </td>
      </tr>


    </tbody>
  </table>



  <!-- ANEXOS EPS NUEVA -->
</body>

</html>
