<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Anexo 12</title>
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

    .w50 {
      width: 70%;
    }

    .w20 {
      width: 15%;
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
            ANEXO N° 12 {{tituloMinuta}}</div>
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
            <div class="minuta_titulo mb">Anexo 12. Relación de Guías de Práctica Clínica y Protocolos de Atención</div>

            <table class="table_con w100">
              <tr>
                <th class="tabla_estilo w50">NOMBRE DE LA GUÍA</th>
                <th class="tabla_estilo w20">QUIÉN LA EXPIDE</th>
                <th class="tabla_estilo w20">CORREO LINK</th>
              </tr>
              <tr>
                <td>GPC para el diagnóstico, tratamiento, y seguimiento de los pacientes
                  mayores de 15 años con diabetes mellitus tipo 1 Guía No. GPC-2015-50</td>
                <td>Minsalud - IETS</td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-pacientes-mayores-15-anos-diabetes-mellitus-tipo1.pdf"
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-pacientes-mayores-15-anos-diabetes-mellitus-tipo1.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC para el diagnóstico, tratamiento y seguimiento de la diabetes
                  mellitus tipo 2 en la población mayor de 18 años Guía No. GPC-2015-51
                </td>
                <td>
                  Minsalud - IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-diabetes-mellitus-tipo2-poblacion-mayor-18-anos.pdf"
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-diabetes-mellitus-tipo2-poblacion-mayor-18-anos.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC (GPC) basada en la evidencia científica para la atención de la infección por VIH/SIDA en personas
                  adultas, gestantes y adolescentes Guía Completa 2021 - 39
                </td>
                <td>
                  Minsalud - IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/gpc-vih-adultos-2021.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/gpc-vih-adultos-2021.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC basada en la evidencia para la promoción del crecimiento, detección temprana y enfoque inicial de
                  alteraciones del crecimiento en niños menores de 10 años y la promoción del desarrollo, detección
                  temprana y enfoque inicial de las alteraciones del desarrollo en niños menores de 5 años en Colombia
                  2014 - Guía No. 24
                </td>
                <td>
                  Minsalud - IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-alteraciones-crecimiento-ninos-menores-10-anos.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-alteraciones-crecimiento-ninos-menores-10-anos.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  PC (GPC) para la detección temprana, tratamiento integral, seguimiento y rehabilitación del cáncer de
                  mama Guía No. GPC-2013-19
                </td>
                <td>
                  Minsalud - IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/1/Gu%C3%ADa%20de%20Pr%C3%A1ctica%20Cl%C3%ADnica%20%20de%20Cancer%20de%20Mama%20versi%C3%B3n%20completa.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/1/Gu%C3%ADa%20de%20Pr%C3%A1ctica%20Cl%C3%ADnica%20%20de%20Cancer%20de%20Mama%20versi%C3%B3n%20completa.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC (GPC)
                  basada en la evidencia científica para la atención de la infección por VIH/SIDA en niñas, niños y
                  adolescentes Guía N°40-2021
                </td>
                <td>
                  Minsalud - IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ET/gpc-vih-pediatria-version-profesionales-salud.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ET/gpc-vih-pediatria-version-profesionales-salud.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC basada en la
                  Evidencia Para el uso de componentes sanguíneos Guía No. GPC-2016-62
                </td>
                <td>
                  Minsalud - IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-componentes-sanguineos.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-componentes-sanguineos.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC basada en la evidencia para la prevención, diagnóstico, tratamiento
                  y seguimiento de la Enfermedad Pulmonar Obstructiva Crónica (EPOC) en población adulta. 2014 - Guía
                  No. ani
                </td>
                <td>
                  Minsalud CINETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC-EPOC-completa.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC-EPOC-completa.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC para la prevención, diagnóstico, tratamiento y rehabilitación de Fibrosis Quística 2014 - Guía No.
                  38
                </td>
                <td>
                  Minsalud IETS Asociación Colombiana de Neumología Pediátrica
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC-Fibrosis-Quistica-Completa.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC-Fibrosis-Quistica-Completa.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC para la detección y manejo de lesiones precancerosas de cuello uterino 2014 Guía N° 44
                </td>
                <td>
                  Minsalud - IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-lesiones-precancerosas-cuello-uterino-completa.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-lesiones-precancerosas-cuello-uterino-completa.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC para la prevención, diagnóstico, tratamiento y rehabilitación de la falla cardiaca en población
                  mayor de 18 años, clasificación B, C y D. 2016. Guía No. 53
                </td>
                <td>
                  Minsalud IETS UNAL U .Javeriana U. Antioquia CINETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-rehabilitacion-falla-cardiaca-poblacion-mayor-18-anos-b-c-d.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-rehabilitacion-falla-cardiaca-poblacion-mayor-18-anos-b-c-d.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC (GPC) para la detección temprana,
                  diagnóstico, tratamiento, seguimiento y rehabilitación del cáncer de próstata Guía pacientes y
                  cuidadores 2013 - Guía No. GPC-2013-21
                </td>
                <td>
                  Minsalud IETS INC
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/Cancer-prostata-final-pacientes%20final.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/Cancer-prostata-final-pacientes%20final.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica para la prevención, detección temprana, diagnóstico, tratamiento y
                  seguimiento de las dislipidemias en la población mayor de 18 años 2014 - Guía No. 27
                </td>
                <td>
                  Minsalud IETS CINETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC-Dislipidemi-completa.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC-Dislipidemi-completa.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC para la prevención, diagnóstico y tratamiento del sobrepeso y la obesidad en adultos. 2016. Guía
                  No. 52
                </td>
                <td>
                  Minsalud IETS FUCS SCP Asociación colombiana de obesidad y cirugía bariátrica ACE FDC FUNCOBES
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-sobrepeso-obesidad-adultos.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-sobrepeso-obesidad-adultos.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC detección temprana, diagnóstico y tratamiento de la artritis reumatoidea Guía N° 26
                </td>
                <td>
                  Minsalud IETS CINETS U. Javeriana UNAL U Antioquia
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-tratamiento-artritis-reumatoide-completa.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-tratamiento-artritis-reumatoide-completa.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC para el diagnóstico y tratamiento preoperatorio, intraoperatorio
                  y postoperatorio de la persona amputada, la prescripción de la prótesis y la rehabilitación integral
                  Guía 55
                </td>
                <td>
                  Minsalud IETS CINETS U. Javeriana UNAL U Antioquia
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-personas-amputada-prescripcion-protesis-rehabilitacion-integral.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-personas-amputada-prescripcion-protesis-rehabilitacion-integral.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  para el diagnóstico, atención integral y seguimiento de niños y niñas con diagnóstico de asma. 2013 -
                  Guía No. GPC-2013-01
                </td>
                <td>
                  Minsalud IETS ANCP
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Comp_Asma.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Comp_Asma.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC (GPC) para la detección temprana, diagnóstico, tratamiento, seguimiento y rehabilitación de
                  pacientes con diagnóstico de cáncer de colon y recto 2013 - Guía No. GPC-2013-20
                </td>
                <td>
                  Minsalud - IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/gpc-completa-ca-colon.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/gpc-completa-ca-colon.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC (GPC) para la detección temprana,
                  diagnóstico, tratamiento, seguimiento y rehabilitación del cáncer de próstata 2013 - Guía No.
                  GPC-2013-21
                </td>
                <td>
                  Minsalud IETS INC
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Comple_Prostata.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Comple_Prostata.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC Basada en la evidencia para la promoción del crecimiento, detección temprana y enfoque inicial de
                  alteraciones del crecimiento en niños menores de 10 años y la promoción del desarrollo, detección
                  temprana y enfoque inicial de las alteraciones del desarrollo en niños menores de 5 años en Colombia
                  2014 - Guía No. 24
                </td>
                <td>
                  Minsalud IETS CINETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-alteraciones-crecimiento-ninos-menores-10-anos.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-alteraciones-crecimiento-ninos-menores-10-anos.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC de diagnóstico y tratamiento de ERC (Adopción)
                </td>
                <td>
                  Minsalud IETS Sociedad Colombiana de Nefrología e HTA
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-enfermedad-renal-adopcion.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-enfermedad-renal-adopcion.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC para el manejo de la hipertensión arterial primaria (HTA) Guía No 18 – Segunda edición
                </td>
                <td>
                  Minsalud IETS Sociedad Colombiana de Nefrología e HTA
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-hipertension-arterial-primaria.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-hipertension-arterial-primaria.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC para la detección temprana, el diagnóstico, el tratamiento y el seguimiento de los defectos
                  refractivos en menores de 18 años Guía para Profesionales de la Salud. 2016 - Guía No. 47
                </td>
                <td>
                  Minsalud IETS FUCS ACOPE SCP SCO FEDOPTO
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-defectos-refrectivos-menores-18anos.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-defectos-refrectivos-menores-18anos.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC para la detección, tratamiento y seguimiento de linfomas Hodgkin y No Hodgkin en población mayor
                  de 18 años. 2017 Guía No. 35
                </td>
                <td>
                  Minsalud IETS INC
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-linfomas-hodgkin-no-hodgkin-poblacion-mayor-18-anos.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-linfomas-hodgkin-no-hodgkin-poblacion-mayor-18-anos.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC para la prevención, la detección temprana, el diagnóstico, el tratamiento y el seguimiento de la
                  ambliopía en menores de 18 años. 2016 Guía N° 48
                </td>
                <td>
                  Minsalud IETS FUCS ACOPE SCP SCO FEDOPTO
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-ambliopia-menores-de-18-anos.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-ambliopia-menores-de-18-anos.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC para la atención de pacientes en Cuidado Paliativo (adopción) 2016 Guía No 58.
                </td>
                <td>
                  Minsalud IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-cuidados-paliativos-adopcion.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-cuidados-paliativos-adopcion.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC basada en la evidencia para la atención integral de la sífilis gestacional y congénita GPC-2014-41
                </td>
                <td>
                  Minsalud IETS UNAL
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/gpc-guia-corta-sifilis.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/gpc-guia-corta-sifilis.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC para la prevención, diagnóstico y tratamiento del sobrepeso y la obesidad en adultos. Guía para
                  pacientes, padres y cuidadores 2016 -
                  Guía No. 52
                </td>
                <td>
                  Minsalud IETS FUCS SCP Asociación colombiana de obesidad y cirugía bariátrica ACE FDC FUNCOBES
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-sobrepeso-obesidad-adultos.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-sobrepeso-obesidad-adultos.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC para el Diagnóstico y tratamiento de la malaria Guía 2020 (adopción)
                </td>
                <td>
                  Minsalud OMS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ET/gpc-malaria-version-publicacion1.0.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ET/gpc-malaria-version-publicacion1.0.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC para la detección temprana, diagnóstico, estadificación y tratamiento del cáncer de pulmón. Guía
                  para pacientes y cuidadores 2014 - Guía No. 36
                </td>
                <td>
                  Minsalud IETS INC PROESA
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-cancer-pulmon-padres.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-cancer-pulmon-padres.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC El Síndrome Coronario Agudo GPC-2013-17
                </td>
                <td>
                  Minsalud IETS CINETS UNAL U Javeriana U Antioquia
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Comple_SCA.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Comple_SCA.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  GPC basada en la evidencia para la prevención, diagnóstico,
                  tratamiento y seguimiento de la enfermedad pulmonar
                  obstructiva crónica (EPOC) en población adulta 2014 - Guía No. 28
                </td>
                <td>
                  Minsalud IETS CINETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC-EPOC-profesionales.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC-EPOC-profesionales.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica del recién nacido sano Guía No. 02
                </td>
                <td>
                  Minsalud IETS CINETS UNAL U Javeriana
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Ptes_RNSano.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Ptes_RNSano.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica Detección de anomalías congénitas del recién nacido 2013 - Guía No. 03
                </td>
                <td>
                  Minsalud IETS CINETS UNAL U Javeriana U Nacional U Antioquia
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Ptes_AC.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Ptes_AC.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica para la evaluación del riesgo y manejo inicial de la neumonía en niños
                  menores de 5 años y bronquiolitis en niños menores de 2 años 2014 - Guía No. 42
                </td>
                <td>
                  Minsalud IETS U Antioquia
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-neumonia-bronquiolitis.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-neumonia-bronquiolitis.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica para la identificación y el manejo clínico de la tos ferina en menores de 18
                  años de edad Actualización 2014 - Guía No. 43
                </td>
                <td>
                  Minsalud IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-tos-ferina.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-tos-ferina.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de Práctica Clínica Diagnóstico y tratamiento de Hepatitis B crónica 2016 Guía No 56
                </td>
                <td>
                  Minsalud IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-hepatitis-b-cronica.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-hepatitis-b-cronica.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de Práctica Clínica Para la tamización, diagnóstico y tratamiento de personas con infección por
                  el virus de la hepatitis C 2018 - Guía N° 57
                </td>
                <td>
                  Minsalud - IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-hepatitis-c.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-hepatitis-c.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de Práctica Clínica para la prevención, diagnóstico y tratamiento de la ideación y/o conducta
                  suicida (Adopción) 2017 Guía No 60
                </td>
                <td>
                  Minsalud - IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-conducta-suicida.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-conducta-suicida.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de Práctica Clínica para el diagnóstico y tratamiento del trastorno neurocognoscitivo mayor
                  (Demencia) (Adopción) Guía No 61
                </td>
                <td>
                  Minsalud - IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-demencia.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-demencia.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía práctica clínica para el diagnostico y tratamiento de la enfermedad renal y crónica (adopción)
                </td>
                <td>
                  Minsalud - IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-enfermedad-renal-adopcion.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-enfermedad-renal-adopcion.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica basada en la evidencia Para el uso de componentes sanguíneos (Adopción) Guía
                  No. GPC-2016-62
                </td>
                <td>
                  Minsalud - IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-componentes-sanguineos.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-componentes-sanguineos.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica del recién nacido con asfixia perinatal Guía No. 07
                </td>
                <td>
                  Minsalud IETS CINETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Completa_Asfix.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Completa_Asfix.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica para la detección temprana, diagnóstico y tratamiento de la fase aguda de
                  intoxicación de pacientes con abuso o dependencia del alcohol
                </td>
                <td>
                  Minsalud IETS CINETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Completa_OH.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Completa_OH.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica del recién nacido sano
                </td>
                <td>
                  Minsalud IETS CINETS U Javeriana
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Completa_RNSano.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Completa_RNSano.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica Recién nacido: sepsis neonatal temprana Guía No. 06
                </td>
                <td>
                  Minsalud IETS CINETS UNAL U Javeriana U Nacional U Antioquia
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Completa_Sepsis.pdf  "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Completa_Sepsis.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica del recién nacido con trastorno respiratorio Guía No. 05
                </td>
                <td>
                  Minsalud IETS CINETS UNAL U Javeriana U Nacional U Antioquia Asociación colombiana de neonatología
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Comple_Respi.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Comple_Respi.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de referencia rápida para prevención, diagnóstico y tratamiento de la enfermedad diarreica aguda
                  en niños menores de 5 años Guía No. 8
                </td>
                <td>
                  Minsalud IETS CINETS UNAL U Javeriana U Nacional U Antioquia
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Prof_Sal_EDA.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Prof_Sal_EDA.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de Práctica Clínica para el abordaje sindrómico del diagnóstico y tratamiento de los pacientes
                  con infecciones de transmisión sexual y otras infecciones del tracto genital 2013 - Guía No. 16
                </td>
                <td>
                  Minsalud IETS CINETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Comple_ITS.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Comple_ITS.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de Práctica Clínica para la detección oportuna, diagnóstico y seguimiento de leucemia linfoide
                  aguda y leucemia mieloide aguda en niños, niñas y adolescentes 2013 - Guía No. 9
                </td>
                <td>
                  Minsalud IETS CINETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Comple_Leucemia.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Comple_Leucemia.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de Práctica Clínica para la detección oportuna, diagnóstico, tratamiento y seguimiento de linfoma
                  de hodgkin y linfoma no hodgkin en niños, niñas y adolescentes 2013 - Guía No. 10
                </td>
                <td>
                  Minsalud IETS CINETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Comp_Linfoma%2010.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Comp_Linfoma%2010.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica (GPC) para la detección temprana, diagnóstico, tratamiento, seguimiento y
                  rehabilitación de pacientes con diagnóstico de cáncer de colon y recto
                </td>
                <td>
                  Minsalud IETS INC
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/gpc-completa-ca-colon.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/gpc-completa-ca-colon.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica del recién nacido prematuro 2013 - Guía No. 04
                </td>
                <td>
                  Minsalud IETS CINETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Completa_Premat.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Completa_Premat.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica Detección temprana y diagnóstico del episodio depresivo y trastorno depresivo
                  recurrente en adultos. Atención integral de los adultos con diagnóstico de episodio depresivo o
                  trastorno depresivo recurrente
                </td>
                <td>
                  Minsalud IETS CINETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Comple_Depre%20(1).pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Comple_Depre%20(1).pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica para el diagnóstico y tratamiento de la enfermedad renal crónica (adopción)
                </td>
                <td>
                  Minsalud IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-enfermedad-renal-adopcion.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-enfermedad-renal-adopcion.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica para el diagnóstico, tratamiento y seguimiento de la diabetes Gestacional
                  GPC-2015-49
                </td>
                <td>
                  Minsalud IETS U Javeriana U Nacional U de Antioquia
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-pacientes-diabetes-gestacional.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-pacientes-diabetes-gestacional.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de Práctica Clínica para el diagnóstico, tratamiento y rehabilitación del episodio agudo del
                  Ataque Cerebrovascular Isquémico en población mayor de 18 años - Guía No. 54
                </td>
                <td>
                  Minsalud IETS Javeriana U Nacional U de Antioquia
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-ataque-cerebro-vascular-isquemico.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-ataque-cerebro-vascular-isquemico.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de Práctica Clínica para el manejo de cáncer de cuello uterino invasivo Guía No. 45
                </td>
                <td>
                  Minsalud INC
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-cancer-cuello-uterino-invasivo-completa.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-cancer-cuello-uterino-invasivo-completa.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de Práctica Clínica para la detección, tratamiento y seguimiento de leucemias linfoblástica y
                  mieloide en población mayor de 18 años. Guía No. 34
                </td>
                <td>
                  Minsalud IETS INC
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-leucemias-linfoblastica-mieloide-poblacion-mayor-18-anos.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-leucemias-linfoblastica-mieloide-poblacion-mayor-18-anos.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía práctica Clínica para la detección temprana, atención integral, seguimiento y rehabilitación de
                  pacientes con diagnóstico de distrofia muscular Guía No. 37
                </td>
                <td>
                  Minsalud IETS INC U Antioquia
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-diagnostico-distrofia-muscular.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-completa-diagnostico-distrofia-muscular.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de Práctica Clínica para el diagnóstico, tratamiento y seguimiento del cáncer de piel no melanoma
                  Guías 2014- N.º 31
                </td>
                <td>
                  Minsalud IETS FUCS INC IND
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/Gpc-Cancer-de-piel-cuidadores-pacientes.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/Gpc-Cancer-de-piel-cuidadores-pacientes.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica para la prevención, detección temprana, diagnóstico, tratamiento y
                  seguimiento de las dislipidemias en la población mayor de 18 años
                </td>
                <td>
                  Minsalud IETS CINETS Javeriana U Nacional U de Antioquia
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC-Dislipidemia-pacientes.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC-Dislipidemia-pacientes.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía para el diagnóstico y el tratamiento de la enfermedad de Chagas
                </td>
                <td>
                  OPS OMS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IGUB/guia-chagas-ops-2018.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IGUB/guia-chagas-ops-2018.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guia de práctica clínica para la prevención, detección temprana y tratamiento de las complicaciones
                  del embarazo, parto o puerperio. 2013 - Guías No. 11-15
                </td>
                <td>
                  Minsalud IETS CINETS Javeriana U Nacional U de Antioquia
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/G.Corta.Embarazo.y.parto.Prof.Salud.2013%20(1).pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/G.Corta.Embarazo.y.parto.Prof.Salud.2013%20(1).pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica para la detección temprana, diagnostico y tratamiento de la artritis
                  idiopática Juvenil. Guia No 25.
                </td>
                <td>
                  Minsalud IETS CINETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/gpc-artritis-idiopatica-profsalud.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/gpc-artritis-idiopatica-profsalud.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica para el diagnóstico, tratamiento e inicio de la rehabilitación psicosocial de
                  los adultos con esquizofrenia - Guía No. 29
                </td>
                <td>
                  Minsalud IETS U Javeriana U Nacional U de Antioquia
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC-Esquizofrenia-Profesionales.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC-Esquizofrenia-Profesionales.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de Práctica Clínica Para el diagnóstico y tratamiento de pacientes adultos con trauma
                  craneoencefálico severo GPC-2014-30
                </td>
                <td>
                  Minsalud IETS Fundación MEDITECH
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-completa-adultos-trauma-craneoencefalico-severo.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-profesionales-completa-adultos-trauma-craneoencefalico-severo.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica para la detección, tratamiento y seguimiento de leucemias linfoide y mieloide
                  en población mayor de 18 años Guía No. 34
                </td>
                <td>
                  Minsalud IETS INC
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-pacientes-cudadores-leucemias-linfoblastica-mieloide-mayores-18-anos.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-pacientes-cudadores-leucemias-linfoblastica-mieloide-mayores-18-anos.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de práctica clínica para la detección temprana, diagnóstico y tratamiento de la fase aguda de
                  intoxicación de pacientes con abuso o dependencia del alcohol Guía No. 23
                </td>
                <td>
                  Minsalud IETS CINETS U Javeriana U Nacional U de Antioquia
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Prof_Salud_OH.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/GPC_Prof_Salud_OH.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guías de práctica clínica en enfermedades neoplásicas
                </td>
                <td>
                  Minsalud INC
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/IA/INCA/gpc-enfermedades-neoplasicas.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/IA/INCA/gpc-enfermedades-neoplasicas.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guia de práctica clínica con evaluación económica para la prevención, diagnóstico, tratamiento y
                  seguimiento del cáncer de piel no melanoma: carcinoma basocelular. Guía No. 33
                </td>
                <td>
                  Minsalud IETS FUCS INC IND
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/guia-completa-carcinoma-basocelular.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/guia-completa-carcinoma-basocelular.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de Práctica Clínica con evaluación económica para la prevención, diagnóstico, tratamiento y
                  seguimiento del cáncer de piel no melanoma: carcinoma escamocelular de piel Guía No. 32
                </td>
                <td>
                  Minsalud IETS FUCS INC IND
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/profesional-carcinoma-escamoceluar.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/IETS/profesional-carcinoma-escamoceluar.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guia práctica para la atención de personas agredidas por un animal potencialmente transmisor de rabia.
                </td>
                <td>

                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/SA/guia-practica-atencion-agresiones.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/SA/guia-practica-atencion-agresiones.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de Práctica Clínica para la detección oportuna, diagnóstico y seguimiento de leucemia mieloide
                  aguda en niños, niñas y adolescentes Versión 2 Actualización parcial 2022
                </td>
                <td>
                  Minsalud IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ENT/gpc-deteccion-oportuna-leucemia-mieloide-aguda-ninos-ninas-adolescentes-v2-2022.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ENT/gpc-deteccion-oportuna-leucemia-mieloide-aguda-ninos-ninas-adolescentes-v2-2022.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  Guía de Práctica Clínica para la prevención, la detección temprana, el diagnóstico, el tratamiento y
                  el seguimiento de la ambliopía y los defectos refractivos Guía No 20
                </td>
                <td>
                  Minsalud IETS
                </td>
                <td>
                  <a href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-pacientes-ambliopia-en-menores-de-18-anos.pdf "
                    target="_blank"
                    rel="noopener noreferrer">https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/CA/gpc-pacientes-ambliopia-en-menores-de-18-anos.pdf
                  </a>
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
