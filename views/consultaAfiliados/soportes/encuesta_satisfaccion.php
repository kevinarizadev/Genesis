<?php
  session_start();
  if (!isset($_SESSION['nombre'])) {
      header("Location: ../../../index.html");
  }
?>
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Encuesta de Satisfacción</title>
  <link rel="icon" href="../../../assets/images/icon.ico" />
  <style type="text/css">
    * {
      /* font-size: 15px; */
      font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }


    #table1,
    #table1 tr th,
    #table1 tr td {
      border: .5px solid black;
      /* border-collapse: collapse; */
      font-size: 13px;
      /* border-spacing: 0 0 !important; */
      font-weight: 600;
    }

    #table2,
    #table2 tr th,
    #table2 tr td {
      border: .5px solid black;
      /* border-collapse: collapse; */
      font-size: 10px;
      border-spacing: 0 0 !important;
      /* font-weight: 600; */
    }
    #table3,
    #table3 tr th,
    #table3 tr td {
      font-size: 10px;
    }

    #table4,
    #table4 tr th,
    #table4 tr td {
      border: .5px solid black;
      /* border-collapse: collapse; */
      font-size: 12px;
      border-spacing: 0 0 !important;
      /* font-weight: 600; */
    }

    .fs_12 {
      font-size: 12px !important;
    }

    .fs_10 {
      font-size: 10px !important;
    }

    .fs_9 {
      font-size: 9px !important;
    }

    .fs_8 {
      font-size: 8px !important;
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

    .txtJustify {
      text-align: justify !important;
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

    .fondoAzul {
      background-color: #1a2e63;
      color: white !important;
    }

    .img_4w {
      width: 4vw;
    }
    .fw_800{
      font-weight:800;
    }
  </style>
  <script src="../../../bower_components/angular/angular.js"></script>
  <script src="../../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../../scripts/controllers/consultaafiliados/soportes/satisfaccioncontroller.js"></script>
</head>

<body ng-controller="satisfaccioncontroller">
  <table id="table1" width="100%" style="border: #FFF;">

    <tr>
      <td colspan="1" rowspan="3" style="text-align: center;" width="3%">
        <img style="width: 10em;" src="../../../assets/images/logo_cajacopieps.png">
      <td colspan="1" rowspan="2" style="text-align: center;padding:0.1% 0%;">FORMATO DE ENCUESTA DE
        SATISFACCIÓN AL USUARIO</td>
      <td colspan="1">
        Código: RU-FR-07
      </td>
    </tr>
    <tr>
      <td colspan="1">Version: 03</td>
    </tr>
    <tr>
      <td colspan="1" style="text-align: center;padding:1% 0%;">
        PROCEDIMIENTO DE MEDICIÓN DE LA SATISFACCIÓN AL USUARIO</td>
      <td colspan="1">Fecha: enero 2024</td>
    </tr>
  </table>
  <!--  -->

  <div class="fs_10 txtJustify" style="margin: 0 5vw;">
    <p>
      Con el fin de mejorar la calidad en la prestación de los servicios contemplatos en el Plan de Beneficios en Salud
      y la atención ofrecida por <b>CAJACOPI EPS SAS</b>, solicitamos
      contestar la siguiente encuesta: (conteste las pregunta con una X)
    </p>
  </div>

  <table id="table2" width="100%">
    <tr>
      <th rowspan="2" class="txtCenter fondoAzul fs_12">
        <span><b>EVALUACION DEL SERVICIO</b></span>
      </th>
      <td class="txtCenter fondoAzul">
        <img src="./icons_encuesta_satisfaccion/excelente.png" alt="" srcset="" class="img_4w" width="7%">
      </td>
      <td class="txtCenter fondoAzul">
        <img src="./icons_encuesta_satisfaccion/bueno.png" alt="" srcset="" class="img_4w" width="7%">
      </td>
      <td class="txtCenter fondoAzul">
        <img src="./icons_encuesta_satisfaccion/aceptable.png" alt="" srcset="" class="img_4w" width="7%">
      </td>
      <td class="txtCenter fondoAzul">
        <img src="./icons_encuesta_satisfaccion/malo.png" alt="" srcset="" class="img_4w" width="7%">
      </td>
      <td class="txtCenter fondoAzul" width="7%">
        -
      </td>
    </tr>
    <tr>
      <th class="txtCenter">Excelente</th>
      <th class="txtCenter">Bueno</th>
      <th class="txtCenter">Aceptable</th>
      <th class="txtCenter">Malo</th>
      <th class="txtCenter">No sabe/No responde</th>
    </tr>
    <tr>
      <td>1. En términos generales la Satisfacción que percibe usted por el servicio que le brinda CAJACOPI EPS es:</td>
      <td class="txtCenter fw_800">{{info[0].RES1 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[0].RES2 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[0].RES3 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[0].RES4 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[0].RES5 == 'X' ? 'X':''}}</td>
    </tr>
    <tr>
      <td>2. La información que recibe por la EPS sobre sus derechos, deberes, los servicios del PBS, Alianza de
        Usuarios y la Red de Prestadores del servicio es:</td>
      <td class="txtCenter fw_800">{{info[1].RES1 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[1].RES2 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[1].RES3 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[1].RES4 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[1].RES5 == 'X' ? 'X':''}}</td>
    </tr>
    <tr>
      <td>3. La oportunidad en la entrega de las autorizaciones para la prestación de los servicios de salud es:</td>
      <td class="txtCenter fw_800">{{info[2].RES1 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[2].RES2 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[2].RES3 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[2].RES4 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[2].RES5 == 'X' ? 'X':''}}</td>
    </tr>
    <tr>
      <td>4. La atención brindada por los funcionarios de la EPS es:</td>
      <td class="txtCenter fw_800">{{info[3].RES1 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[3].RES2 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[3].RES3 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[3].RES4 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[3].RES5 == 'X' ? 'X':''}}</td>
    </tr>
    <tr>
      <td>5. La ubicación geográfica, accesibilidad, aseo y comodidad de las instalaciones de la EPS es:</td>
      <td class="txtCenter fw_800">{{info[4].RES1 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[4].RES2 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[4].RES3 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[4].RES4 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[4].RES5 == 'X' ? 'X':''}}</td>
    </tr>
    <tr>
      <td>6. El horario de atención de CAJACOPI EPS SAS es:</td>
      <td class="txtCenter fw_800">{{info[5].RES1 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[5].RES2 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[5].RES3 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[5].RES4 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[5].RES5 == 'X' ? 'X':''}}</td>
    </tr>
    <tr>
      <td>7. Las soluciones dadas por la EPS a las quejas y reclamos presentadas por usted son:</td>
      <td class="txtCenter fw_800">{{info[6].RES1 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[6].RES2 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[6].RES3 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[6].RES4 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[6].RES5 == 'X' ? 'X':''}}</td>
    </tr>
    <tr>
      <td>8. El trámite de novedades y/o actualización en la base de datos es:</td>
      <td class="txtCenter fw_800">{{info[7].RES1 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[7].RES2 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[7].RES3 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[7].RES4 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[7].RES5 == 'X' ? 'X':''}}</td>
    </tr>
    <tr>
      <td>9. El servicio que le brinda la Institución Prestadora de Servicios de Salud es:</td>
      <td class="txtCenter fw_800">{{info[8].RES1 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[8].RES2 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[8].RES3 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[8].RES4 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[8].RES5 == 'X' ? 'X':''}}</td>
    </tr>
    <tr>
      <td>10. El médico, odontólogo u enfermera escucho sus inquietudes acerca de su estado de salud:</td>
      <td class="txtCenter fw_800">{{info[9].RES1 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[9].RES2 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[9].RES3 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[9].RES4 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[9].RES5 == 'X' ? 'X':''}}</td>
    </tr>
    <tr>
      <td>11. El trato brindado por el médico o profesional de la salud, y la respuesta que le dio a sus inquietudes
        sobre su enfermedad fue:</td>
      <td class="txtCenter fw_800">{{info[10].RES1 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[10].RES2 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[10].RES3 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[10].RES4 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[10].RES5 == 'X' ? 'X':''}}</td>
    </tr>
    <tr>
      <td>12. Las soluciones dadas por el Prestador de Servicios de Salud a sus quejas y reclamos presentadas por usted
        es:</td>
      <td class="txtCenter fw_800">{{info[11].RES1 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[11].RES2 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[11].RES3 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[11].RES4 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[11].RES5 == 'X' ? 'X':''}}</td>
    </tr>
    <tr>
      <td>13. La facilidad del acceso al Prestador de Servicios de Salud donde usted acude para las citas médicas o
        urgencias es:</td>
      <td class="txtCenter fw_800">{{info[12].RES1 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[12].RES2 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[12].RES3 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[12].RES4 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[12].RES5 == 'X' ? 'X':''}}</td>
    </tr>
    <tr>
      <td>14. El acceso a los programas de promoción y prevención de la salud realizados por la Institución Prestadora
        de Salud es:</td>
      <td class="txtCenter fw_800">{{info[13].RES1 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[13].RES2 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[13].RES3 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[13].RES4 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[13].RES5 == 'X' ? 'X':''}}</td>
    </tr>
    <tr>
      <td>15. Como califica la atención prestada en los programas de promoción y prevención:</td>
      <td class="txtCenter fw_800">{{info[14].RES1 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[14].RES2 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[14].RES3 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[14].RES4 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[14].RES5 == 'X' ? 'X':''}}</td>
    </tr>
    <tr>
      <td>16. La entrega de medicamentos por parte de la farmacia es:</td>
      <td class="txtCenter fw_800">{{info[15].RES1 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[15].RES2 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[15].RES3 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[15].RES4 == 'X' ? 'X':''}}</td>
      <td class="txtCenter fw_800">{{info[15].RES5 == 'X' ? 'X':''}}</td>
    </tr>
  </table>
  <!--  -->
  <div class="fs_12 txtJustify" style="margin: 0 5vw;">
    <p>
      E: Excelente (4) B: Bueno (3) A: Aceptable (2) M: Malo (1) NS/NR: No sabe / No responde
    </p>

    <p>Recomendaría nuestros servicios: Si _{{det.RECOMIENDA == 'S' ? 'X':''}}_ NO _{{det.RECOMIENDA == 'N' || det.RECOMIENDA == '' ? 'X':''}}_ </p>

    <p>Ha pensado en cambiarse de EPS: Si _{{det.CAMBIA == 'S' ? 'X':''}}_ NO _{{det.CAMBIA == 'N' || det.CAMBIA == '' ? 'X':''}}_ </p>
  </div>
  <!--  -->
  <table id="table3" width="100%"
    style="padding: 1vw;border-radius: 15px;background: linear-gradient(21deg, rgba(158,211,224,1) 0%, rgba(218,238,243,1) 52%, rgba(158,211,224,1) 100%);border: 3px solid rgb(115 153 162);">
    <tr>
      <td width="50%">Fecha: {{det.FECHAENCUESTA}}___________</td>
      <td>Municipio: {{det.MUNICIPIO}}___</td>
    </tr>
    <tr>
      <td>Nombre: {{det.NOMBRE}}__</td>
      <td rowspan="2">Prestador de Servicios de Salud: {{det.IPS}}________</td>
    </tr>
    <tr>
      <td>Documento de Identidad: {{det.DOCUMENTO}}</td>
      <!-- <td>_____________</td> -->
    </tr>
    <tr>
      <td>Teléfono: {{det.TELEFONO}}________</td>
      <td>Firma: ________________________</td>
    </tr>
    <tr>
      <td>Dirección: {{det.DIRECCION}}________</td>
      <td>Encuesta aplicada por: ________________</td>
    </tr>
  </table>
  <!--  -->
  <div class="fs_12" style="margin: 1 0vw;margin-top: 9vw;">
    <p><b>CONTROL DE CAMBIOS</b></p>
  </div>
  <!--  -->
  <table id="table4" width="100%">
    <tr>
      <th class="fondoAzul">VERSIÓN</th>
      <th class="fondoAzul">FECHA</th>
      <th class="fondoAzul">DESCRIPCIÓN</th>
    </tr>
    <tr>
      <td>01</td>
      <td>Diciembre 2022.</td>
      <td>Emisión del Formato.</td>
    </tr>
    <tr>
      <td>02</td>
      <td>Agosto 2023.</td>
      <td>Se agrega al Contenido del texto la pregunta: Ha pensado en cambiarse de EPS</td>
    </tr>
    <tr>
      <td>03</td>
      <td>Enero 2024.</td>
      <td>Se agregó cuadro de Control de Cambio.</td>
    </tr>
  </table>


</body>

</html>
