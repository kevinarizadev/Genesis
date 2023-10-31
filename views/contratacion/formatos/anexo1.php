<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Anexo 1</title>
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

    .text-size8 {
      font-size: 8px !important;
    }

    .back-gray {
      background-color: lightgray;
    }


    input[type="checkbox"] {
      background-color: #000000;
    }

    .border_white td {
      border-top: 0px solid white !important;
      border-right: 0px solid white !important;
      border-left: 0px solid white !important;
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
      text-align: center;
      font-weight: 700;
      border: 1px solid black;
      background-color: #c5dbf1;
    }

    .tabla_estilo {
      background-color: #c5dbf1;
    }

    .minuta_texto_1 {
      text-align: justify;
      font-size: 15px;
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

    .minuta_clausula {
      text-align: justify;
      font-weight: 600;
      margin-left: 3vw;
    }

    .minuta_paragrafo {
      text-align: justify;
      /* font-style: italic; */
      font-weight: 600;
      font-size: 12px;
    }



    .display_none {
      display: none !important;
    }

    .div_firmas {
      width: 97%;
      position: absolute;
      bottom: 0;

    }


    .d-flex {
      display: flex;
    }

    .minuta_anexo_subtitulo {
      font-weight: 600;
    }


    .ml {
      margin-left: 3vw;
    }

    .ml_1 {
      margin-left: 1vw;
    }

    .w70 {
      width: 70%;
    }

    .w30 {
      width: 30%;
    }

    .w10 {
      width: 10%;
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
              ANEXO N° 1 {{tituloMinuta}}</div>
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
            <div class="minuta_texto_1 mb">

            </div>
            <div class="minuta_titulo mb">Anexo 1. Marco Normativo</div>
            <div class="ml mb">El marco normativo del presente contrato por temas se describe a continuación:</div>

            <table class="table_con w100">
              <tr>
                <th class="tabla_estilo w30">NOMBRE DE LA GUÍA</th>
                <th class="tabla_estilo w70">QUIÉN LA EXPIDE</th>
              </tr>
              <tr>
                <td>
                  Marco Constitucional y jurisprudencial
                </td>
                <td>
                  Constitución Política de 1991, artículos 44, 48, 49, 50 y la Sentencia T-760 de 2008
                </td>
              </tr>
              <tr>
                <td>
                  Marco General del Sistema de Salud
                </td>
                <td>
                  Ley 100 de 1993; Ley 1122 de 2007, Ley 1438 de 2011, Ley 1753 de 2015 artículos 65-68; Ley 1955 de
                  2019, artículos 231 al 248; Ley 1966 de 2019.
                </td>
              </tr>
              <tr>
                <td>
                  Salud como Derecho Fundamental
                </td>
                <td>
                  Ley Estatutaria 1751 de 2015
                </td>
              </tr>
              <tr>
                <td>
                  Decreto Reglamentario del Sector Salud
                </td>
                <td>
                  Decreto 780 de 2016
                </td>
              </tr>
              <tr>
                <td>
                  Política de Atención Integral en Salud
                </td>
                <td>
                  Resolución 2626 de 2019
                </td>
              </tr>
              <tr>
                <td>
                  Plan de Beneficios Único financiado con la UPC
                </td>
                <td>
                  Resolución 2292 de 2021; Resolución 2273 de 2021 y normas que la sustituyan; Ley 2026 de 2020
                  (Atención integral del cáncer infantil); Ley 972 de 2005 (VIH/SIDA); Ley 1384 de 2010 (Atención
                  Integral de Cáncer de adultos)
                </td>
              </tr>
              <tr>
                <td>
                  Tecnologías no financiadas con la UPC con cargo a Presupuestos Máximos
                </td>
                <td>
                  Ley 1955 de 2019, artículo 240; Resolución 3056 de 2018; Resolución 2260 de 2021
                </td>
              </tr>
              <tr>
                <td>
                  Unidad de Pago por Capitación
                </td>
                <td>
                  Resolución 2809 de 2022 y demás normas que la modifiquen o sustituyan
                </td>
              </tr>
              <tr>
                <td>
                  Salud Pública
                </td>
                <td>
                  Ley 9 de 1979 que adopta el Código Sanitario colombiano; Resolución 1841 de 2013 adopta el PDSP
                  2012-2021
                </td>
              </tr>
              <tr>
                <td>
                  Caracterización Poblacional
                </td>
                <td>
                  Resolución 1536 de 2015
                </td>
              </tr>
              <tr>
                <td>
                  Rutas Integrales de Atención en Salud
                </td>
                <td>
                  Resolución 3202 de 2016; Resolución 3280 de 2018; Resolución 276 de 2019
                </td>
              </tr>
              <tr>
                <td>
                  Redes Integrales de Prestadores de Servicios
                </td>
                <td>
                  Ley 1438 de 2011, artículos 60 a 64; Resolución 1441 de 2016
                </td>
              </tr>
              <tr>
                <td>
                  Acceso integral de la atención
                </td>
                <td>
                  Literal d) del artículo 6 de la Ley 1751 de 2015
                </td>
              </tr>
              <tr>
                <td>
                  Garantía de acceso integral y sin barreras en pacientes con cáncer y VIH/Sida
                </td>
                <td>
                  Artículo 4 de la Ley 2026 de 2020; artículo 1 de la Ley 972 de 2005; Ley 1384 de 2010
                </td>
              </tr>
              <tr>
                <td>
                  Facturación y glosas
                </td>
                <td>
                  Código de Comercio Colombiano (Artículos 772 al 779); Ley 1122 de 2007, artículo 13, literal d; Ley
                  1438 de 2011, artículo 56 y 57; Ley 1231 de 2008; Ley 2024 de 2020; Decreto 1733 de 2020; Decreto 441
                  de 2022; Resolución 3047 de 2008
                </td>
              </tr>
              <tr>
                <td>
                  Factura Electrónica de Venta (FEV)
                </td>
                <td>
                  Ley 1966 de 2019, art. 15; Resolución 506 de 2021; Resolución 1526 de 2021; Resolución 1136 de 2021;
                  Resolución 510 de 2022
                </td>
              </tr>
              <tr>
                <td>
                  Plazos de pago
                </td>
                <td>
                  Ley 1122 de 2007, artículo 13, literal d; Ley 1438 de 2011, artículo 56 y 57; Ley 1231 de 2008; Ley
                  2024 de 2020; Decreto 1733 de 2020; Decreto 441 de 2022
                </td>
              </tr>
              <tr>
                <td>
                  Historia Clínica Electrónica
                </td>
                <td>
                  Ley 1955 de 2019, artículo 246; Ley 2015 de 2020; Resolución 1995 de 1999; Ley 527 de 1999; Decreto
                  2364 de 2012; circular 2 de 1997 expedida por el Archivo General de la Nación
                </td>
              </tr>
              <tr>
                <td>
                  Registro Individual de Prestación de Servicios
                </td>
                <td>
                  Ley 1122 de 2007, art. 44, Ley 1438 de 2011, art. 114; Ley 1966 de 2019, art. 15; Resolución 3374 de
                  2000; Resolución 1531 de 2014.
                </td>
              </tr>
              <tr>
                <td>
                  Responsabilidad en el tratamiento seguro de los datos.
                </td>
                <td>
                  Ley Estatutaria 1581 de 2012; Ley 1712 de 2014, Decreto 1377 de 2013; Decreto 1074 de 2015.
                </td>
              </tr>
              <tr>
                <td>
                  Seguridad de la información y protección de datos personales.
                </td>
                <td>
                  Ley 527 de 1999, la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013, la Ley 594 de 2000, la Ley
                  2015 de 2020 y las normas que las modifiquen, adicionen o sustituyan.
                </td>
              </tr>
              <tr>
                <td>
                  Indicadores y reporte de información obligatoria
                </td>
                <td>
                  Resolución 1552 de 2013; Resolución 256 de 2016; Indicadores definidos de reporte obligatorio en las
                  circulares 030 de 2006 y circular 012 de 2016 de la Superintendencia Nacional de Salud.
                </td>
              </tr>
              <tr>
                <td>
                  Confidencialidad y protección de datos sensibles
                </td>
                <td>
                  Ley 2015 de 2020, que adopta medidas de responsabilidad demostrada con el propósito de garantizar la
                  veracidad, seguridad, confidencialidad, calidad, uso y circulación restringida de la información
                </td>
              </tr>
              <tr>
                <td>
                  Informes obligatorios
                </td>
                <td>
                  Circulares 030 de 2006 y 012 de 2016 de la Superintendencia Nacional de Salud; Resolución 4505 de 2012
                  mediante la cual se establecen las responsabilidades de las Instituciones Prestadoras de Servicios de
                  Salud públicas y privadas
                </td>
              </tr>
              <tr>
                <td>
                  Condiciones de habilitación para prestadores de servicios de salud
                </td>
                <td>
                  Resolución 3100 de 2019 emanada del Ministerio de Salud y Protección Social
                </td>
              </tr>
              <tr>
                <td>
                  RIPS
                </td>
                <td>
                  Resolución 3374 de 2000
                </td>
              </tr>
              <tr>
                <td>
                  SARLAFT
                </td>
                <td>
                  Circular Externa N° 009 de 2016 de la Superintendencia Nacional de Salud la partes
                </td>
              </tr>
              <tr>
                <td>
                  Régimen de inhabilidades
                </td>
                <td>
                  Decreto 780 de 2016; Decreto 973 de 1994
                </td>
              </tr>
              <tr>
                <td>
                  Acceso a la prestación y provisión de servicios y tecnologías de salud a toda la población
                  perteneciente a la etnia wayuu
                </td>
                <td>
                  Resolución 2811 de 2022
                </td>
              </tr>
              <tr>
                <td>
                  Referente a la desnutrición aguda moderada y severa en niños menores de 5 años
                </td>
                <td>
                  Resolución 2350 de 2020
                </td>
              </tr>
              <tr>
                <td>
                  Acuerdos de voluntades entre las entidades responsables de pago, los prestadores de servicios de salud
                  y los proveedores de tecnología en salud
                </td>
                <td>
                  Decreto 441 de 2022
                </td>
              </tr>



            </table>



            <!-- tabla_estilo -->



            <!--  -->
            <!--  -->


            <!--  -->
            <!--  -->


        </td>
      </tr>


    </tbody>
  </table>



  <!-- ANEXOS EPS NUEVA -->
</body>

</html>
