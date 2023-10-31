<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Anexo 17</title>
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
      width: 40%;
    }

    .w20 {
      width: 25%;
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
  <table class="report-container" style="page-break-before:always">
    <thead class="report-header">
      <tr>
        <th class="report-header-cell">
          <div class="header-info text-left d-flex">
            <img style="width: 12em;height: 5vh;" src="../../../assets/images/logo_cajacopieps.png" alt="cajacopi">
            <div class="text-bold7">
            ANEXO N° 17 {{tituloMinuta}}</div>
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
            <div class="minuta_titulo mb">Anexo 17. Canales transaccionales y de contacto</div>

            <div class="minuta_titulo">CONTACTO DEL ÁREA DE SERVICIOS DE SALUD</div>
            <div class="minuta_anexo_subtitulo ml_1">CONTACTOS DE LA ERP</div>

            <!-- tabla_estilo -->
            <table class="table_con w100">
              <tr>
                <td class="tabla_estilo w50">NOMBRES Y APELLIDOS:</td>
                <td class="tabla_estilo w20">CARGO</td>
                <td class="tabla_estilo w20">CORREO ELECTRÓNICO</td>
                <td class="tabla_estilo w10">TELÉFONO</td>
              </tr>
              <tr>
                <td>DIDIER ESTHER NAVAS ALTAHONA</td>
                <td>SUBGERENTE
                  NACIONAL DE SALUD</td>
                <td>didier.navas@cajacopieps.com</td>
                <td>3185930
                  Ext 206</td>
              </tr>
            </table>

            <div class="minuta_anexo_subtitulo ml_1">CONTACTOS DE LA PSS</div>

            <table class="table_con w100">
              <tr>
                <td class="tabla_estilo w50">NOMBRES Y APELLIDOS:</td>
                <td class="tabla_estilo w20">CARGO</td>
                <td class="tabla_estilo w20">CORREO ELECTRÓNICO</td>
                <td class="tabla_estilo w10">TELÉFONO</td>
              </tr>
              <tr>
                <td>
                  <br>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>

            <div class="minuta_titulo">CONTACTO DEL ÁREA DE SIAU</div>
            <div class="minuta_anexo_subtitulo ml_1">CONTACTOS DE LA ERP</div>

            <table class="table_con w100">
              <tr>
                <td class="tabla_estilo w50">NOMBRES Y APELLIDOS:</td>
                <td class="tabla_estilo w20">CARGO</td>
                <td class="tabla_estilo w20">CORREO ELECTRÓNICO</td>
                <td class="tabla_estilo w10">TELÉFONO</td>
              </tr>
              <tr>
                <td>CARLOS ALBERTO ROMERO ARIZA</td>
                <td>SUBGERENTE NACIONAL DE ATENCIÓN AL USUARIO</td>
                <td>carlos.romero@cajacopieps.com</td>
                <td>3245047335</td>
              </tr>
              <tr>
                <td>CLAUDIA MILENA LAMPREA TRIANA</td>
                <td>COORDINADOR NACIONAL DE INFORMACIÓN A USUARIOS Y
                  PARTICIPACIÓN SOCIAL</td>
                <td>claudia.lamprea@cajacopieps.com</td>
                <td>3164250914</td>
              </tr>
            </table>

            <div class="minuta_anexo_subtitulo ml_1">CONTACTOS DE LA PSS</div>

            <table class="table_con w100">
              <tr>
                <td class="tabla_estilo w50">NOMBRES Y APELLIDOS:</td>
                <td class="tabla_estilo w20">CARGO</td>
                <td class="tabla_estilo w20">CORREO ELECTRÓNICO</td>
                <td class="tabla_estilo w10">TELÉFONO</td>
              </tr>
              <tr>
                <td><br></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>

            <div class="minuta_titulo">CONTACTO DEL ÁREA DE ADMINISTRATIVA</div>
            <div class="minuta_anexo_subtitulo ml_1">CONTACTOS DE LA ERP</div>

            <table class="table_con w100">
              <tr>
                <td class="tabla_estilo w50">NOMBRES Y APELLIDOS:</td>
                <td class="tabla_estilo w20">CARGO</td>
                <td class="tabla_estilo w20">CORREO ELECTRÓNICO</td>
                <td class="tabla_estilo w10">TELÉFONO</td>
              </tr>
              <tr>
                <td>EILING GALLO URUETA</td>
                <td>COORDINADOR NACIONAL DE INFRAESTRUCTURA, DOTACIÓN Y LOGÍSTICA</td>
                <td>eiling.gallo@cajacopieps.com</td>
                <td>3188217652</td>
              </tr>
            </table>

            <div class="minuta_anexo_subtitulo ml_1">CONTACTOS DE LA PSS</div>
            <table class="table_con w100">
              <tr>
                <td class="tabla_estilo w50">NOMBRES Y APELLIDOS:</td>
                <td class="tabla_estilo w20">CARGO</td>
                <td class="tabla_estilo w20">CORREO ELECTRÓNICO</td>
                <td class="tabla_estilo w10">TELÉFONO</td>
              </tr>
              <tr>
                <td><br></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>

            <div class="minuta_titulo">CONTACTO DEL ÁREA FINANCIERA</div>
            <div class="minuta_anexo_subtitulo ml_1">CONTACTOS DE LA ERP</div>
            <table class="table_con w100">
              <tr>
                <td class="tabla_estilo w50">NOMBRES Y APELLIDOS:</td>
                <td class="tabla_estilo w20">CARGO</td>
                <td class="tabla_estilo w20">CORREO ELECTRÓNICO</td>
                <td class="tabla_estilo w10">TELÉFONO</td>
              </tr>
              <tr>
                <td>JOSE MARIO MORALES DIAZ</td>
                <td>SUBGERENTE NACIONAL
                  ADMINISTRATIVA Y FINANCIERA</td>
                <td>mario.morales@cajacopieps.com</td>
                <td>3202303146</td>
              </tr>
            </table>

            <div class="minuta_anexo_subtitulo ml_1">CONTACTOS DE LA PSS</div>
            <table class="table_con w100">
              <tr>
                <td class="tabla_estilo w50">NOMBRES Y APELLIDOS:</td>
                <td class="tabla_estilo w20">CARGO</td>
                <td class="tabla_estilo w20">CORREO ELECTRÓNICO</td>
                <td class="tabla_estilo w10">TELÉFONO</td>
              </tr>
              <tr>
                <td><br></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>

            <div class="minuta_titulo">CONTACTO DEL ÁREA DE CALIDAD</div>
            <div class="minuta_anexo_subtitulo ml_1">CONTACTOS DE LA ERP</div>
            <table class="table_con w100">
              <tr>
                <td class="tabla_estilo w50">NOMBRES Y APELLIDOS:</td>
                <td class="tabla_estilo w20">CARGO</td>
                <td class="tabla_estilo w20">CORREO ELECTRÓNICO</td>
                <td class="tabla_estilo w10">TELÉFONO</td>
              </tr>
              <tr>
                <td>LINA PATRICIA CHARRIS ARIZA</td>
                <td>JEFE DE OFICINA DE CALIDAD</td>
                <td>lina.charris@cajacopieps.com</td>
                <td>3183546012</td>
              </tr>
            </table>

            <div class="minuta_anexo_subtitulo ml_1">CONTACTOS DE LA PSS</div>
            <table class="table_con w100">
              <tr>
                <td class="tabla_estilo w50">NOMBRES Y APELLIDOS:</td>
                <td class="tabla_estilo w20">CARGO</td>
                <td class="tabla_estilo w20">CORREO ELECTRÓNICO</td>
                <td class="tabla_estilo w10">TELÉFONO</td>
              </tr>
              <tr>
                <td><br></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>

            <div class="minuta_titulo">CONTACTO DEL ÁREA DE AUDITORÍA</div>
            <div class="minuta_anexo_subtitulo ml_1">CONTACTOS DE LA ERP</div>
            <table class="table_con w100">
              <tr>
                <td class="tabla_estilo w50">NOMBRES Y APELLIDOS:</td>
                <td class="tabla_estilo w20">CARGO</td>
                <td class="tabla_estilo w20">CORREO ELECTRÓNICO</td>
                <td class="tabla_estilo w10">TELÉFONO</td>
              </tr>
              <tr>
                <td>RAUL ANDRES OÑORO BENAVIDES</td>
                <td>COORDINADOR NACIONAL DE
                  AUDITORIA DE CUENTAS MÉDICAS</td>
                <td>raul.onoro@cajacopieps.com</td>
                <td>3008669386</td>
              </tr>
            </table>

            <div class="minuta_anexo_subtitulo ml_1">CONTACTOS DE LA PSS</div>
            <table class="table_con w100">
              <tr>
                <td class="tabla_estilo w50">NOMBRES Y APELLIDOS:</td>
                <td class="tabla_estilo w20">CARGO</td>
                <td class="tabla_estilo w20">CORREO ELECTRÓNICO</td>
                <td class="tabla_estilo w10">TELÉFONO</td>
              </tr>
              <tr>
                <td><br></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>

            <div class="minuta_titulo">CONTACTO DEL ÁREA DE AUDITORÍA</div>
            <div class="minuta_anexo_subtitulo ml_1">CONTACTOS DE LA ERP</div>
            <table class="table_con w100">
              <tr>
                <td class="tabla_estilo w50">NOMBRES Y APELLIDOS:</td>
                <td class="tabla_estilo w20">CARGO</td>
                <td class="tabla_estilo w20">CORREO ELECTRÓNICO</td>
                <td class="tabla_estilo w10">TELÉFONO</td>
              </tr>
              <tr>
                <td>BERENA BALLESTEROS CABRALES</td>
                <td>COORDINADOR
                  NACIONAL DE AUTORIZACIONES</td>
                <td>berena.ballesteros@cajacopieps.com</td>
                <td>3185161566</td>
              </tr>
            </table>

            <div class="minuta_anexo_subtitulo ml_1">CONTACTOS DE LA PSS</div>
            <table class="table_con w100 mb">
              <tr>
                <td class="tabla_estilo w50">NOMBRES Y APELLIDOS:</td>
                <td class="tabla_estilo w20">CARGO</td>
                <td class="tabla_estilo w20">CORREO ELECTRÓNICO</td>
                <td class="tabla_estilo w10">TELÉFONO</td>
              </tr>
              <tr>
                <td><br></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>

            <!--  -->
            <!--  -->
            <p>
              LÍNEA 018000111446
            </p>

            <span>
              Puntos de Atención al Usuario para tramite con los usuarios: <u>
                https://www.cajacopieps.com/oficinas-de-atencion
              </u>
            </span>


            <p>
              Correo para solicitudes paciente con portabilidad: <u>portabilidad.aut@cajacopieps.co</u>
            </p>

            <p>
              Página WEB: Cajacopi EPS SAS cuenta con la página <u>www.cajacopieps.com</u>, donde las IPS adscritas
              pueden acceder al portal Genesis, ingresarán con su usuario y clave asignado por Tecnología
            </p>

            <p>
              Código de Urgencias: <u>codigo.urgencia@cajacopieps.co</u>
            </p>

            <p>
              La solicitud se debe hacer adjuntando el anexo # 2 y dentro de las 24 horas de la urgencia.
            </p>

            <p>
              Es el único medio encargado de asignarlos.
            </p>

            <p>
              Solicitudes Materiales Osteosíntesis: <u>materiales@cajacopieps.co</u>
            </p>

            <p>
              Solicitudes para las autorizaciones Hospitalarias: a través de la página Web ( portal Genesis
              ) <u>autorizaciones8@cajacopieps.co</u>
            </p>

            <p>
              Autorizaciones NO PBS: <u>autorizaciones5@cajacopieps.co</u>
            </p>

            <p>
              Apoyo Diagnóstico: <u>apoyo.diagnostico@cajacopieps.co</u>

            </p>

            <p>
              La solicitud de autorización de hospitalización médica correspondiente a las IPS, se realiza de la
              siguiente manera: Envió del Anexo Técnico No. 3 totalmente diligenciado al correo electrónicos
              institucionales previamente establecidos: <u>autorizaciones8@cajacopieps.co</u>
            </p>

            <p>
              Correos de referencia y Traslados de Ambulancia
            </p>

            <p>
              Referencia y Contrarreferencia 018000111446 Opción 3, correo electrónico:
            </p>

            <ul style="padding: 0px 10px;">
              <li>referencia1@cajacopieps.co - Departamento Atlántico.</li>
              <li>referencia2@cajacopieps.co - Departamento Córdoba y Magdalena.</li>
              <li>referencia3@cajacopieps.co - Departamento Meta.</li>
              <li>referencia4@cajacopieps.co - Departamento Cesar y Guajira.</li>
              <li>referencia5@cajacopieps.co - Departamento Bogotá, Boyacá y resto del País.</li>
              <li>referencia6@cajacopieps.co - Departamento Bolívar y Sucre.</li>
            </ul>

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
