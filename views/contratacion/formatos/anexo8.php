<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Anexo 8</title>
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
  <table class="report-container w100" style="page-break-before:always">
    <thead class="report-header">
      <tr>
        <th class="report-header-cell">
          <div class="header-info text-left d-flex">
            <img style="width: 12em;height: 5vh;" src="../../../assets/images/logo_cajacopieps.png" alt="cajacopi">
            <div class="text-bold7">
              ANEXO N° 8 {{tituloMinuta}}</div>
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
            <div class="minuta_titulo">Anexo 8. Capacidad instalada disponible</div>

            <p>
              <b class="ml">CAPACIDAD INSTALADA DE URGENCIAS</b>
            </p>

            <!-- tabla_estilo -->
            <table class="table_con w100">
              <tr>
                <th class="tabla_estilo text-center" rowspan="2">Camas Observación</th>
                <th class="tabla_estilo text-center">A</th>
                <th class="tabla_estilo text-center">B</th>
                <th class="tabla_estilo text-center">C</th>
                <th class="tabla_estilo text-center">D</th>
              </tr>
              <tr>
                <th class="tabla_estilo text-center">Cantidad</th>
                <th class="tabla_estilo text-center">Horas mes</th>
                <th class="tabla_estilo text-center">Ptes x Mes</th>
                <th class="tabla_estilo text-center">Ptes x Año</th>
              </tr>
              <tr>
                <td>Camas hombres</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Camas mujeres</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Camas niños</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>TOTALES</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>


            <p class="ml">A → Cantidad de camas de observación habilitadas</p>
            <p class="ml">B = A x 24 x 30</p>
            <p class="ml">C = B / 6 (6 horas de observación x paciente)</p>
            <p class="ml">D = C x 12</p>

            <p>
              <b class="ml">CAPACIDAD INSTALADA DE CONSULTA EXTERNA</b>
            </p>

            <table class="table_con w100">
              <tr>
                <th class="tabla_estilo text-center" rowspan="2">Consultorios</th>
                <th class="tabla_estilo text-center">A</th>
                <th class="tabla_estilo text-center">B</th>
                <th class="tabla_estilo text-center">C</th>
                <th class="tabla_estilo text-center">D</th>
                <th class="tabla_estilo text-center">E</th>
                <th class="tabla_estilo text-center">F</th>
              </tr>
              <tr>
                <th class="tabla_estilo text-center">Cantidad</th>
                <th class="tabla_estilo text-center">Horas día</th>
                <th class="tabla_estilo text-center">Días mes</th>
                <th class="tabla_estilo text-center">Horas mes</th>
                <th class="tabla_estilo text-center">Ptes x Mes</th>
                <th class="tabla_estilo text-center">Ptes x Año</th>
              </tr>
              <tr>
                <td>Medicina interna</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Cirugía</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Pediatría</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Gineco Obstetricia</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>... etc</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>TOTALES</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>


            <p class="ml">A → Cantidad de consultorios habilitados</p>
            <p class="ml">B = horas que funcionan los consultorios en el día</p>
            <p class="ml">C = Días del mes que funcionan los consultorios</p>
            <p class="ml">D = A x B x C (expresa las horas mes consultorio)</p>
            <p class="ml">E = D x 3 (expresa el número de pacientes que se pueden atender x mes a razón de 3 por hora)
            </p>
            <p class="ml">F = E x 12 (expresa el número de pacientes que se pueden atender x año)</p>

            <p>
              <b class="ml">CAPACIDAD INSTALADA DE QUIRÓFANOS</b>
            </p>

            <table class="table_con w100">
              <tr>
                <th class="tabla_estilo text-center" rowspan="2">QUIRÓFANOS </th>
                <th class="tabla_estilo text-center">A</th>
                <th class="tabla_estilo text-center">B</th>
                <th class="tabla_estilo text-center">C</th>
                <th class="tabla_estilo text-center">D</th>
                <th class="tabla_estilo text-center">E</th>
                <th class="tabla_estilo text-center">F</th>
                <th class="tabla_estilo text-center">G</th>
              </tr>
              <tr>
                <th class="tabla_estilo text-center">Cantidad</th>
                <th class="tabla_estilo text-center">Horas día</th>
                <th class="tabla_estilo text-center">Días mes</th>
                <th class="tabla_estilo text-center">Horas mes</th>
                <th class="tabla_estilo text-center">T. Qxco</th>
                <th class="tabla_estilo text-center">Ptes x Mes</th>
                <th class="tabla_estilo text-center">Ptes x Año</th>
              </tr>
              <tr>
                <td>Baja complejidad</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Mediana complejidad</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Alta complejidad</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>TOTALES</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>

            <p class="ml">A → Cantidad de quirófanos habilitados</p>
            <p class="ml">B = horas que funcionan los quirófanos en el día</p>
            <p class="ml">C = Días del mes que funcionan los quirófanos</p>
            <p class="ml">D = A x B x C (expresa las horas mes consultorio)</p>
            <p class="ml">E → Tiempo quirúrgico en horas promedio, incluyendo tiempo de desinfección entre una cirugía y
              otra</p>
            <p class="ml">
              Ejemplo de tiempos quirúrgicos: Baja complejidad 1,5 horas; mediana complejidad 3 horas; alta complejidad
              5,5 horas</p>
            <p class="ml">F = D / E (expresa el número de procedimientos quirúrgicos que se pueden atender x mes)</p>
            <p class="ml">G = E x 12 (expresa el número de procedimientos que se pueden atender x año)</p>


            <p>
              <b class="ml">CAPACIDAD INSTALADA DE INTERNACIÓN</b>
            </p>

            <table class="table_con w100">
              <tr>
                <th class="tabla_estilo text-center" rowspan="2">CAMAS HOSPITALARIAS </th>
                <th class="tabla_estilo text-center">A</th>
                <th class="tabla_estilo text-center">B</th>
                <th class="tabla_estilo text-center">C</th>
                <th class="tabla_estilo text-center">D</th>
                <th class="tabla_estilo text-center">E</th>
              </tr>
              <tr>
                <th class="tabla_estilo text-center">Cantidad</th>
                <th class="tabla_estilo text-center">Estancias mes</th>
                <th class="tabla_estilo text-center">Estancias media</th>
                <th class="tabla_estilo text-center">Egresos mes</th>
                <th class="tabla_estilo text-center">Egresos año</th>
              </tr>
              <tr>
                <td>Adulto</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Obstétrica</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Pediatría</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>… etc.</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>TOTALES</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>


            <p class="ml">A → Cantidad de camas habilitadas</p>
            <p class="ml">B = A x 30 (expresa los días cama disponibles por mes. Varía según el número de días del mes)
            </p>
            <p class="ml">C = Expresa la estancia promedio en días según tipo de cama</p>
            <p class="ml">Ejemplos: cama adultos 5,5; cama pediatría 6,5; cama de obstetricia: 1,5; camas de UCIN 7,8
              etc.</p>
            <p class="ml">D = B / C (expresa los pacientes que se estima serán dados de alta en un mes)</p>
            <p class="ml">E = D x 12 (expresa los pacientes que se estima serán dados de alta en un año)</p>


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
