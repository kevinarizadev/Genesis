<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Anexo 15</title>
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
    .table_con tr,
    .table_con tr th,
    .table_con tr td {
      border: .5px solid black;
      border-collapse: collapse;

      padding: 3px;

    }

    .table_no_borders .table_no_borders,
    .table_no_borders tr,
    .table_no_borders tr th,
    .table_no_borders tr td {
      border: .5px solid white;
      border-collapse: collapse;
      padding: 0px;
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

    .tabla_estilo_2 {
      background-color: #cfcfcf;
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

    .m_auto {
      margin: auto;
    }

    .ml {
      margin-left: 3vw;
    }

    .ml_1 {
      margin-left: 1vw;
    }

    .ml_20 {
      margin-left: 20vw;
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

    .fs_9 {
      font-size: 9px;
    }

    .fs_13 {
      font-size: 13px;
    }

    .ul_1 {
      list-style-type: "»";
    }

    .ul_2 {
      list-style-type: "-";
    }
  </style>
  <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <script src="../../../bower_components/angular/angular.js"></script>
  <script src="../../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../../scripts/controllers/contratacion/formatos/formatoanexosController.js"></script>
</head>

<body ng-controller="formatoanexosController">


  <!-- ANEXOS EPS VIEJA -->
  <table class="report-container w100 page_break_after" style="page-break-before:always">
    <thead class="report-header">
      <tr>
        <th class="report-header-cell">
          <div class="header-info text-left d-flex">
            <img style="width: 12em;height: 5vh;" src="../../../assets/images/logo_cajacopieps.png" alt="cajacopi">
            <div class="text-bold7">
              ANEXO N° 15 {{tituloMinuta}}</div>
          </div>
          <div class="minuta_titulo mb">Anexo 15. Listado de precios de insumos, dispositivos y otras tecnologías en
            salud </div>
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
            <!-- <div class="minuta_texto_1 mb">

            </div> -->
            <!-- <div class="minuta_titulo mb">Anexo 15. Listado de precios de insumos, dispositivos y otras tecnologías en
              salud </div> -->
            <!-- tabla_estilo -->
            <table class="table_con w100">
              <tr>
                <td>
                  ANEXO TECNICO CONTRACTUAL PARA LAS ACCIONES DE LA RUTA INTEGRAL DE ATENCION PARA LA PROMOCIÓN Y
                  MANTENIMIENTO DE LA SALUD
                </td>
              </tr>
              <tr>
                <td>
                  <div>La prestación de los servicios de la ruta de promoción y mantenimiento de la salud (RPMS) se debe
                    garantizar de acuerdo con el cumplimiento de los requisitos mínimos estipulados en la Resolución
                    3280 de 2018, Resolución 276 de 2019 y la Resolución 202 de 2021. Con personal idóneo y en
                    cumplimiento con lo definido en el Decreto 1011 del 2006. El horario de atención será de 7:00 a.m. a
                    4:00 p.m. continuas en la red pública y 7:00 a.m. a 6:00 p.m. continuas en la red privada. Lo
                    anterior para eliminar las barreras en la atención a nuestros usuarios; en los casos que el horario
                    de atención sea diferente, cada prestador tiene la obligatoriedad de reportar el horario de atención
                    que tenga su institución y justificar a través de la capacidad instalada los cambios.</div>
                  <div>Se debe garantizar el acceso diario a las intervenciones según curso de vida, servicios de PAI y
                    Citologías. Las consultas e intervenciones derivadas de la Ruta de promoción y mantenimiento de la
                    salud estarán exentos de cuotas moderadora y cobro de insumos básicos para la prestación de la
                    respectiva actividad. Se debe garantizar el acceso a las actividades mediante la asignación de citas
                    de forma telefónica y/ o presencial (sin entrega de fichos) con prioridad para los usuarios
                    Discapacitados, Gestantes, Recién Nacidos, Primera Infancia, Vejez, Desplazados, Victimas del
                    conflicto armado y los que provienen de zonas rurales. (Se solicita implementar las filas
                    preferenciales para estos grupos en cumplimiento de la Circular 051 del MSPS).</div>
                </td>
              <tr>
                <td>
                  ACTIVIDADES E INTERVENCIONES SEGÚN RESOLUCIÓN 3280 DE 2018 - POLÍTICAS DE SALUD PUBLICA DE EL
                  CONTRATANTE
                </td>
              </tr>
              <tr>
                <td>
                  <div class="mb">Teniendo en cuenta la Resolución 429 de 2016, posteriormente modificada por la
                    Resolución 489 de
                    2019, por medio de la cual se adopta la Política de Atención Integral en Salud, a partir de la cual,
                    “el sistema de salud debe encaminar sus esfuerzos al mejoramiento del estado de salud de la
                    población y el goce efectivo del derecho a la salud, para lo cual se hace necesario aumentar el
                    acceso y el mejoramiento de la calidad de los servicios, fortalecer la infraestructura hospitalaria,
                    recuperar la confianza pública en el sistema de salud y el aseguramiento de la sostenibilidad
                    financiera del sistema y privilegiar estrategias preventivas y de medicina familiar y comunitaria,
                    con enfoque intercultural, complementadas con el fortalecimiento del talento humano en salud(...)”.
                  </div>
                  <div class="mb">La Ruta Integral de Atención para la Promoción y Mantenimiento de la Salud, es una
                    herramienta
                    operativa de obligatorio cumplimiento en todo el territorio nacional, que define a los integrantes
                    del sector salud (Dirección Territorial de Salud, aseguradores, entidades a cargo de regímenes
                    especiales o de excepción y prestadores) las condiciones necesarias para garantizar la promoción de
                    la salud, la prevención de la enfermedad y la generación de una cultura del cuidado para todas las
                    personas, familias y comunidades , como parte de la garantía del derecho a la salud (definido en la
                    Ley Estatutaria de Salud).</div>
                  <div class="mb">La Ruta Integral de Atención para la Promoción y Mantenimiento de la Salud y la Ruta
                    Integral de
                    Atención para la Población Materno-Perinatal, definen e integran las intervenciones individuales,
                    colectivas, poblacionales y las acciones de gestión de la salud pública, requeridas para la
                    promoción de la salud y la gestión oportuna e integral de los principales riesgos en salud de los
                    individuos, las familias y las comunidades.</div>
                  <div class="mb">El objetivo general de la Ruta Integral de Atención para la Promoción y Mantenimiento
                    de la Salud
                    es definir, ordenar e integrar las intervenciones individuales, colectivas, poblacionales y acciones
                    de gestión de la salud pública, requeridas para la promoción de la salud y la gestión oportuna e
                    integral de los principales riesgos en salud de las personas, las familias y las comunidades.</div>
                  <div class="text-center m-b">
                    <img src="./anexo_images/Anexo15_Imagen1.png" alt="x" width="65%">
                  </div>
                  <div class="ml_20 fs_9 mb">
                    Fuente: Ministerio de Salud y Protección Social
                  </div>
                  <div>La RPMS contempla tres tipos de intervenciones que se diferencian en la población
                    sujeto a la que van dirigidas: </div>
                  <div>I) intervenciones poblacionales estas se dirigen a toda la población </div>
                  <div>II) intervenciones del PIC; las colectivas dirigidas a la(s) familia(s), grupos de población o
                    comunidades que comparten características o situaciones particulares y se concretan a través del PIC
                    de cada entidad territorial</div>
                  <div class="mb">III) intervenciones individuales van dirigidas a las personas en los diferentes
                    momentos del curso de vida y a la familia.</div>
                  <div class="mb">En el desarrollo de cada una de las intervenciones se debe tener en cuenta el abordaje
                    familiar y comunitario así: </div>
                  <div class="text-center m-b">
                    <img src="./anexo_images/Anexo15_Imagen2.png" alt="x" width="50%">
                  </div>
                  <div class="ml_20 fs_9 mb">
                    Fuente: Ministerio de Salud y Protección Social
                  </div>
                  <div class="mb">Intervenciones Individuales: Se definen como el conjunto de intervenciones en salud
                    dirigidas a las personas en sus diferentes momentos de curso de vida y a la familia como sujeto de
                    atención, que tienen como finalidad la valoración integral, Ruta Integral de Atención para la
                    Promoción y Mantenimiento de la Salud y la Ruta Integral de Atención en Salud para la Población
                    Materno Perinatal y la educación para la salud de forma individual grupal o familiar, con el fin de
                    potenciar o fortalecer las capacidades para el cuidado de la salud de las personas, minimizar el
                    riesgo de enfermar o derivar oportunamente a rutas de grupo de riesgo o a los servicios de salud
                    requeridos para el manejo de su condición de salud.</div>
                  <div class="mb">En caso de que una persona sea diagnosticada con un evento en salud, para el cual la
                    RPMS contempla intervenciones de detección temprana, debe continuar con el manejo definido según el
                    evento y continuar con las demás atenciones e intervenciones hacen parte de la RPMS.</div>
                  <div class="text-center mb">
                    <img src="./anexo_images/Anexo15_Imagen3.png" alt="x" width="50%">
                  </div>
                  <div class="text-center">
                    <img src="./anexo_images/Anexo15_Imagen4.png" alt="x" width="50%">
                  </div>
                  <div class="ml_20 fs_9 mb">
                    Fuente: Ministerio de Salud y Protección Social
                  </div>
                  <div class="text-center">
                    <img src="./anexo_images/Anexo15_Imagen5.png" alt="x" width="50%">
                  </div>
                  <div class="mb">Intervenciones por momento del curso de vida, a continuación, se presentan los
                    esquemas de atenciones individuales por momento de curso de vida:</div>
                  <div class="mb"><b>1.1 Primera Infancia</b></div>
                  <div class="mb">
                    <table class="table_no_borders">
                      <tr>
                        <td>
                          <img src="./anexo_images/Anexo15_Imagen6.png" alt="x" width="70vw">
                        </td>
                        <td>La primera infancia inicia desde los 7 días hasta los 5 años, 11 meses y 29 días, se
                          constituye en el momento del curso de vida con mayor posibilidad de potenciar el desarrollo
                          cerebral a través de la interacción con el ambiente y su contexto, por lo tanto es de vital
                          importancia reconocer las características físicas, biológicas, psicológicas y sociales a las
                          que cotidianamente están expuestos los niños y las niñas en este momento vital, así como
                          identificar situaciones que pueden incidir negativamente en la salud y en su desarrollo, y de
                          esta manera hacer un abordaje diferencial en la atención.</td>
                      </tr>
                    </table>
                  </div>
                  <div class="mb">El abordaje propuesto en la RPMS durante este momento del curso de vida incluye la
                    valoración integral de la salud y el desarrollo, identificar tempranamente la exposición a factores
                    de riesgo y detectar de forma temprana alteraciones que afecten negativamente la salud y el proceso
                    de crecimiento y desarrollo, con el fin de referirlas para su manejo oportuno, por parte del talento
                    humano de medicina o enfermería. A partir de ella se establecen una serie de intervenciones,
                    programáticas o no, que complementan el abordaje clínico inicial.</div>
                  <div class="mb">Adicionalmente, las sesiones educativas individuales, grupales o familiares, indicadas
                    de acuerdo con los hallazgos de la valoración, permiten potenciar o desarrollar capacidades para el
                    cuidado de la salud y gestionar los riesgos específicos identificados previamente.</div>
                  <div class="mb">A continuación, se presenta el cuadro que resume el esquema de atención para este
                    momento vital que incluye las intervenciones individuales, grupales y familiares.</div>
                  <div>
                    <table class="table_con w100">
                      <tr>
                        <th class="tabla_estilo">CURSO DE VIDA</th>
                        <th class="tabla_estilo">INTERVENCIÓN</th>
                        <th class="tabla_estilo">ACTIVIDAD</th>
                      </tr>
                      <tr>
                        <td rowspan="18">Primera Infancia</td>
                        <td rowspan="4">Valoración Integral</td>
                        <td>Atención en salud por medicina general o especialista en pediatría o medicina familiar</td>
                      </tr>
                      <tr>
                        <td>Atención en salud por profesional en enfermería</td>
                      </tr>
                      <tr>
                        <td>Atención en salud bucal por profesional en odontología</td>
                      </tr>
                      <tr>
                        <td>Atención por profesional de enfermería, medicina general o nutrición para la promoción y
                          apoyo de la lactancia materna</td>
                      </tr>
                      <tr>
                        <td rowspan="2">Detección Temprana</td>
                        <td>Tamizaje para anemia - Hemoglobina</td>
                      </tr>
                      <tr>
                        <td>Tamizaje del Recién Nacido sin Riesgo de Hipoacusia</td>
                      </tr>
                      <tr>
                        <td rowspan="9">Protección Específica</td>
                        <td>Aplicación de barniz de flúor</td>
                      </tr>
                      <tr>
                        <td>Profilaxis y remoción de la placa bacteriana</td>
                      </tr>
                      <tr>
                        <td>Aplicación de sellantes</td>
                      </tr>
                      <tr>
                        <td>Vacunación</td>
                      </tr>
                      <tr>
                        <td>Fortificación casera con micronutrientes</td>
                      </tr>
                      <tr>
                        <td>Suplementación con micronutrientes</td>
                      </tr>
                      <tr>
                        <td>Suplementación con hierro</td>
                      </tr>
                      <tr>
                        <td>Formula Láctea (Infección VIH 12 meses)</td>
                      </tr>
                      <tr>
                        <td>Desparasitación intestinal</td>
                      </tr>
                      <tr>
                        <td rowspan="3">Educación para la Salud</td>
                        <td>Educación individual (Padres o Cuidadores)</td>
                      </tr>
                      <tr>
                        <td>Educación dirigida a la Familia</td>
                      </tr>
                      <tr>
                        <td>Educación grupal</td>
                      </tr>
                    </table>
                  </div>
                  <div class="mb">Nota: En caso de madres con antecedente de bajo peso para la edad gestacional y/o
                    delgadez durante el periodo de lactancia, se recomienda administrar al niño, desde el nacimiento, un
                    suplemento que aporte 1 mg/kg/día de hierro elemental hasta que se introduzca la alimentación
                    complementaria adecuada.</div>
                  <div class="mb">En el caso que el niño o niña a término sea alimentado desde el nacimiento con fórmula
                    láctea, se recomienda NO administrar suplemento de hierro.</div>
                  <div class=""><b>1.2 Infancia</b></div>
                  <div class="">
                    <table class="table_no_borders">
                      <tr>
                        <td>
                          <img src="./anexo_images/Anexo15_Imagen7.png" alt="x" width="70vw">
                        </td>
                        <td>A pesar de disfrutar de un mayor nivel de fortaleza e independencia respecto a la primera
                          infancia, los niños y niñas de 6 a 11 años, 11 meses y 29 días continúan siendo personas que
                          requieren un acompañamiento muy cuidadoso en su salud, dadas las características del proceso
                          de desarrollo y las vulnerabilidades asociadas al momento del curso de vida.</td>
                      </tr>
                    </table>
                  </div>
                  <div class="mb">Adicional a los elementos ya abordados desde la primera infancia en cuanto a
                    valoración y promoción del desarrollo integral y multidimensional de los niños y niñas y la
                    identificación temprana de alteraciones que puedan afectar su salud, la valoración integral se
                    orienta a la identificación de factores y conductas de riesgo que puedan ser moduladas y corregidas
                    antes de que se presenten afectaciones importantes, principalmente en torno a modos, condiciones y
                    estilos de vida.</div>
                  <div class="mb">A continuación, se presenta el cuadro que resume el esquema de atención para este
                    momento vital que incluye las intervenciones individuales, grupales y familiares.</div>
                  <div>
                    <table class="table_con w100 mb">
                      <tr>
                        <th class="tabla_estilo">CURSO DE VIDA</th>
                        <th class="tabla_estilo">INTERVENCIÓN</th>
                        <th class="tabla_estilo">ACTIVIDAD</th>
                      </tr>
                      <tr>
                        <td rowspan="11">Infancia</td>
                        <td rowspan="3">Valoración Integral</td>
                        <td>Atención en salud por medicina general o especialista en pediatría o medicina familiar</td>
                      </tr>
                      <tr>
                        <td>Atención en salud por profesional en enfermería</td>
                      </tr>
                      <tr>
                        <td>Atención en salud bucal por profesional en odontología</td>
                      </tr>
                      <tr>
                        <td rowspan="1">Detección Temprana</td>
                        <td>Tamizaje para anemia - Hemoglobina, Hematocrito</td>
                      </tr>
                      <tr>
                        <td rowspan="4">Protección Específica</td>
                        <td>Aplicación de barniz de flúor</td>
                      </tr>
                      <tr>
                        <td>Profilaxis y remoción de la placa bacteriana</td>
                      </tr>
                      <tr>
                        <td>Aplicación de sellantes</td>
                      </tr>
                      <tr>
                        <td>Vacunación</td>
                      </tr>
                      <tr>
                        <td rowspan="3">Educación para la Salud</td>
                        <td>Educación individual (Padres o Cuidadores)</td>
                      </tr>
                      <tr>
                        <td>Educación dirigida a la Familia</td>
                      </tr>
                      <tr>
                        <td>Educación grupal</td>
                      </tr>
                    </table>
                  </div>
                  <div class=""><b>1.3 Adolescencia</b></div>
                  <div class="">
                    <table class="table_no_borders">
                      <tr>
                        <td>
                          <img src="./anexo_images/Anexo15_Imagen8.png" alt="x" width="70vw">
                        </td>
                        <td>La adolescencia comprende desde los 12 a los 17 años se caracteriza por importantes y
                          rápidas transformaciones a nivel de procesos psicosociales, neurocognitivos, físicos y
                          sexuales que repercuten de forma importante en el devenir y el futuro de las personas. Es
                          universal en cuanto a los cambios físicos, neurológicos y de características sexuales que se
                          ocasionan, mientras que los procesos psicosociales incluyendo la sexualidad no lo son, debido
                          a la manera como las distintas sociedades y culturas significan y dan sentido a estas
                          transformaciones biológicas y los resultados potenciales en términos de capacidades que se
                          producen en la adolescencia y los contextos que influyen en su desarrollo.</td>
                      </tr>
                    </table>
                  </div>
                  <div class="mb">Las intervenciones correspondientes a este momento vital se describen a continuación y
                    se orientan a valorar el proceso de crecimiento y desarrollo de los adolescentes, verificar la
                    presencia de riesgos que amenacen su salud y generar condiciones para la adopción de estilos de vida
                    saludables y prácticas de cuidado protectoras de la salud.</div>
                  <div>
                    <table class="table_con w100 mb">
                      <tr>
                        <th class="tabla_estilo">CURSO DE VIDA</th>
                        <th class="tabla_estilo">INTERVENCIÓN</th>
                        <th class="tabla_estilo">ACTIVIDAD</th>
                      </tr>
                      <tr>
                        <td rowspan="25">Adolescencia</td>
                        <td rowspan="3">Valoración Integral</td>
                        <td>Atención en salud por medicina general o especialista en pediatría o medicina familiar</td>
                      </tr>
                      <tr>
                        <td>Atención en salud bucal por profesional en odontología</td>
                      </tr>
                      <tr>
                        <td>Atención en salud por profesional en enfermería</td>
                      </tr>
                      <tr>
                        <td rowspan="5">Detección Temprana</td>
                        <td>Tamizaje para anemia - Hemoglobina y Hematocrito</td>
                      </tr>
                      <tr>
                        <td>Prueba rápida treponémica</td>
                      </tr>
                      <tr>
                        <td>Prueba rápida para VIH</td>
                      </tr>
                      <tr>
                        <td>Asesoría Pre y Post test VIH</td>
                      </tr>
                      <tr>
                        <td>Prueba de embarazo</td>
                      </tr>
                      <tr>
                        <td rowspan="11">Protección Específica</td>
                        <td>Atención en salud por medicina general, medicina familiar o enfermería para asesoría en la
                          anticoncepción</td>
                      </tr>
                      <tr>
                        <td>Atención en salud por medicina general, medicina familiar o enfermería para asesoría en la
                          anticoncepción - control</td>
                      </tr>
                      <tr>
                        <td>Inserción de dispositivo intrauterino anticonceptivo (DIU)</td>
                      </tr>
                      <tr>
                        <td>Inserción de anticonceptivo subdérmico</td>
                      </tr>
                      <tr>
                        <td>Suministro de anticoncepción oral, ciclos o inyectables</td>
                      </tr>
                      <tr>
                        <td>Suministro de preservativos</td>
                      </tr>
                      <tr>
                        <td>Aplicación de barniz de flúor</td>
                      </tr>
                      <tr>
                        <td>Profilaxis y remoción de la placa bacteriana</td>
                      </tr>
                      <tr>
                        <td>Detartraje supragingival</td>
                      </tr>
                      <tr>
                        <td>Aplicación de sellantes</td>
                      </tr>
                      <tr>
                        <td>Vacunación</td>
                      </tr>
                      <tr>
                        <td rowspan="3">Educación para la Salud</td>
                        <td>Educación individual (Padres o Cuidadores)</td>
                      </tr>
                      <tr>
                        <td>Educación dirigida a la Familia</td>
                      </tr>
                      <tr>
                        <td>Educación grupal</td>
                      </tr>
                    </table>
                  </div>
                  <div class=""><b>1.4 Juventud</b></div>
                  <div class="">
                    <table class="table_no_borders">
                      <tr>
                        <td>
                          <img src="./anexo_images/Anexo15_Imagen9.png" alt="x" width="70vw">
                        </td>
                        <td>La juventud comprende desde los 18 hasta los 28 años, es el momento de consolidación de la
                          autonomía intelectual, física, moral, económica, social y cultural, lo que se evidencia en
                          actitudes de seguridad, poder y dominio. Los jóvenes se enferman con menos facilidad y menor
                          frecuencia que los niños, y si sucede, en general, lo superan rápidamente. Identificar
                          tempranamente la exposición a factores de riesgo con el fin de prevenirlos o derivarlos para
                          su manejo oportuno se constituye en el centro de atención de la valoración integral en este
                          momento de vida, así como el fortalecimiento de estilos de vida saludables y prácticas de
                          cuidado protectoras de la salud como elemento protector para toda la vida. Las intervenciones
                          correspondientes a este momento vital se describen a continuación:</td>
                      </tr>
                    </table>
                  </div>
                  <div>
                    <table class="table_con w100 mb">
                      <tr>
                        <th class="tabla_estilo">CURSO DE VIDA</th>
                        <th class="tabla_estilo">INTERVENCIÓN</th>
                        <th class="tabla_estilo">ACTIVIDAD</th>
                      </tr>
                      <tr>
                        <td rowspan="39">Juventud</td>
                        <td rowspan="2">Valoración Integral</td>
                        <td>Atención en salud por medicina general o especialista en pediatría o medicina familiar</td>
                      </tr>
                      <tr>
                        <td>Atención en salud bucal por profesional en odontología</td>
                      </tr>
                      <tr>
                        <td rowspan="16">Detección Temprana</td>
                        <td>Atención en salud por profesional en enfermería</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Glicemia</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Creatinina</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Triglicéridos</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Colesterol Total</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Colesterol HDL</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Colesterol LDL</td>
                      </tr>
                      <tr>
                        <td>Prueba rápida treponémica</td>
                      </tr>
                      <tr>
                        <td>Prueba rápida para VIH</td>
                      </tr>
                      <tr>
                        <td>Asesoría Pre y Post test VIH</td>
                      </tr>
                      <tr>
                        <td>Prueba Rápida para Hepatitis B</td>
                      </tr>
                      <tr>
                        <td>Prueba Rápida para Hepatitis C</td>
                      </tr>
                      <tr>
                        <td>Prueba de embarazo</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de cáncer de cuello uterino (citología)</td>
                      </tr>
                      <tr>
                        <td>Colposcopia cérvico - uterina</td>
                      </tr>
                      <tr>
                        <td>Biopsia cérvico - uterina</td>
                      </tr>
                      <tr>
                        <td rowspan="12">Protección Específica</td>
                        <td>Atención en salud por medicina general, medicina familiar o enfermería para asesoría en la
                          anticoncepción</td>
                      </tr>
                      <tr>
                        <td>Atención en salud por medicina general, medicina familiar o enfermería para asesoría en la
                          anticoncepción - control</td>
                      </tr>
                      <tr>
                        <td>Vasectomía SOC</td>
                      </tr>
                      <tr>
                        <td>Sección o ligadura de trompas de Falopio (cirugía de pomeroy) por minilaparatomía</td>
                      </tr>
                      <tr>
                        <td>Esterilización femenina</td>
                      </tr>
                      <tr>
                        <td>Inserción de dispositivo intrauterino anticonceptivo (DIU)</td>
                      </tr>
                      <tr>
                        <td>Inserción de anticonceptivo subdérmico</td>
                      </tr>
                      <tr>
                        <td>Suministro de anticoncepción oral, ciclos o inyectables</td>
                      </tr>
                      <tr>
                        <td>Suministro de preservativos</td>
                      </tr>
                      <tr>
                        <td>Profilaxis y remoción de la placa bacteriana</td>
                      </tr>
                      <tr>
                        <td>Detartraje supragingival</td>
                      </tr>
                      <tr>
                        <td>Vacunación</td>
                      </tr>
                      <tr>
                        <td rowspan="3">Educación para la Salud</td>
                        <td>Educación individual (Padres o Cuidadores)</td>
                      </tr>
                      <tr>
                        <td>Educación dirigida a la Familia</td>
                      </tr>
                      <tr>
                        <td>Educación grupal</td>
                      </tr>
                    </table>
                  </div>
                  <div class=""><b>1.5 Adultez</b></div>
                  <div class="">
                    <table class="table_no_borders">
                      <tr>
                        <td>
                          <img src="./anexo_images/Anexo15_Imagen10.png" alt="x" width="70vw">
                        </td>
                        <td>La adultez comprende de los 29 a los 59 años. Se configura en un proceso dinámico, en donde
                          continúa el desarrollo y las personas son capaces de establecer metas y poner en marcha los
                          recursos necesarios para alcanzarlas, configurando sus trayectorias evolutivas personales y
                          aprovechando las oportunidades disponibles en sus contextos. En este sentido, es importante
                          subrayar que los patrones de desarrollo adulto no se configuran en algo novedoso, sino en la
                          consolidación de los aprendizajes previos y un perfilamiento cada vez más claro de la
                          individualidad.</td>
                      </tr>
                    </table>
                  </div>
                  <div class="mb">Por lo tanto, las intervenciones en este momento de vida permiten consolidar los
                    aprendizajes y fortalecer las capacidades aprendidas para posibilitar el crecimiento y el logro de
                    los objetivos planeados por cada individuo.</div>
                  <div class="mb">A continuación, se presenta el cuadro que resume el esquema de atención para este
                    momento vital que incluye las intervenciones individuales, grupales y familiares.</div>
                  <div>
                    <table class="table_con w100 mb">
                      <tr>
                        <th class="tabla_estilo">CURSO DE VIDA</th>
                        <th class="tabla_estilo">INTERVENCIÓN</th>
                        <th class="tabla_estilo">ACTIVIDAD</th>
                      </tr>
                      <tr>
                        <td rowspan="50">Adultez</td>
                        <td rowspan="2">Valoración Integral</td>
                        <td>Atención en salud por medicina general o especialista en pediatría o medicina familiar</td>
                      </tr>
                      <tr>
                        <td>Atención en salud bucal por profesional en odontología</td>
                      </tr>
                      <tr>
                        <td rowspan="28">Detección Temprana</td>
                        <td>Atención en salud por profesional en enfermería</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de cáncer de cuello uterino (citología)</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de cáncer de cuello uterino (técnica de inspección visual con ácido acético y
                          lugol)</td>
                      </tr>
                      <tr>
                        <td>Criocauterización de cuello uterino</td>
                      </tr>
                      <tr>
                        <td>Colposcopia cérvico - uterina</td>
                      </tr>
                      <tr>
                        <td>Biopsia cérvico - uterina</td>
                      </tr>
                      <tr>
                        <td>Tamizaje para cáncer de mama (mamografía)</td>
                      </tr>
                      <tr>
                        <td>Tamizaje para cáncer de mama (valoración clínica de la mama)</td>
                      </tr>
                      <tr>
                        <td>Biopsia de mama</td>
                      </tr>
                      <tr>
                        <td>Tamizaje para cáncer de próstata (PSA)</td>
                      </tr>
                      <tr>
                        <td>Tamizaje para cáncer de próstata (tacto rectal)</td>
                      </tr>
                      <tr>
                        <td>Biopsia de próstata</td>
                      </tr>
                      <tr>
                        <td>Tamizaje para cáncer de colon (sangre oculta en materia fecal por inmunoquímica)</td>
                      </tr>
                      <tr>
                        <td>Colonoscopia</td>
                      </tr>
                      <tr>
                        <td>Biopsia de colon</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Uroanálisis</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Glicemia</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Creatinina</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Triglicéridos</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Colesterol Total</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Colesterol HDL</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Colesterol LDL</td>
                      </tr>
                      <tr>
                        <td>Prueba rápida treponémica</td>
                      </tr>
                      <tr>
                        <td>Prueba rápida para VIH</td>
                      </tr>
                      <tr>
                        <td>Asesoría Pre y Post test VIH</td>
                      </tr>
                      <tr>
                        <td>Prueba Rápida para Hepatitis B</td>
                      </tr>
                      <tr>
                        <td>Prueba Rápida para Hepatitis C</td>
                      </tr>
                      <tr>
                        <td>Prueba de embarazo</td>
                      </tr>
                      <tr>
                        <td rowspan="12">Protección Específica</td>
                        <td>Atención en salud por medicina general, medicina familiar o enfermería para asesoría en la
                          anticoncepción</td>
                      </tr>
                      <tr>
                        <td>Atención en salud por medicina general, medicina familiar o enfermería para asesoría en la
                          anticoncepción - control</td>
                      </tr>
                      <tr>
                        <td>Vasectomía SOC</td>
                      </tr>
                      <tr>
                        <td>Sección o ligadura de trompas de Falopio (cirugía de pomeroy) por minilaparatomía</td>
                      </tr>
                      <tr>
                        <td>Esterilización femenina</td>
                      </tr>
                      <tr>
                        <td>Inserción de dispositivo intrauterino anticonceptivo (DIU)</td>
                      </tr>
                      <tr>
                        <td>Inserción de anticonceptivo subdérmico</td>
                      </tr>
                      <tr>
                        <td>Suministro de anticoncepción oral, ciclos o inyectables</td>
                      </tr>
                      <tr>
                        <td>Suministro de preservativos</td>
                      </tr>
                      <tr>
                        <td>Profilaxis y remoción de la placa bacteriana</td>
                      </tr>
                      <tr>
                        <td>Detartraje supragingival</td>
                      </tr>
                      <tr>
                        <td>Vacunación</td>
                      </tr>
                      <tr>
                        <td rowspan="3">Educación para la Salud</td>
                        <td>Educación individual (Padres o Cuidadores)</td>
                      </tr>
                      <tr>
                        <td>Educación dirigida a la Familia</td>
                      </tr>
                      <tr>
                        <td>Educación grupal</td>
                      </tr>
                    </table>
                  </div>
                  <div class=""><b>1.6 Vejez</b></div>
                  <div class="">
                    <table class="table_no_borders">
                      <tr>
                        <td>
                          <img src="./anexo_images/Anexo15_Imagen11.png" alt="x" width="70vw">
                        </td>
                        <td>Existen diversos enfoques para comprender el proceso de envejecimiento y las características
                          de la vejez; sin embargo estos pueden vivirse desde las pérdidas o desde la plenitud, de
                          acuerdo con los efectos acumulados a lo largo de la vida, la confluencia de las oportunidades
                          y los recursos, tanto individuales como generacionales, que afecten el continuo de la vida de
                          cada persona, así como su condición y posición social y su conjugación con la edad, el género,
                          la clase social y el origen étnico, que representan ciertas diferencias en el acceso y
                          disfrute de dichos recursos y oportunidades.</td>
                      </tr>
                    </table>
                  </div>
                  <div class="mb">Las intervenciones correspondientes a este momento vital, que comprende desde los 60
                    años en adelante, se describen a continuación y en conjunto buscan la protección de las prácticas de
                    cuidado de la salud adquiridas, la identificación oportuna de exposición a riesgos y la detección
                    temprana de alteraciones que afecten negativamente la salud con el fin de derivarlas para su manejo
                    oportuno.</div>
                  <div>
                    <table class="table_con w100 mb">
                      <tr>
                        <th class="tabla_estilo">CURSO DE VIDA</th>
                        <th class="tabla_estilo">INTERVENCIÓN</th>
                        <th class="tabla_estilo">ACTIVIDAD</th>
                      </tr>
                      <tr>
                        <td rowspan="50">Vejez</td>
                        <td rowspan="2">Valoración Integral</td>
                        <td>Atención en salud por medicina general o especialista en pediatría o medicina familiar</td>
                      </tr>
                      <tr>
                        <td>Atención en salud bucal por profesional en odontología</td>
                      </tr>
                      <tr>
                        <td rowspan="25">Detección Temprana</td>
                        <td>Atención en salud por profesional en enfermería</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de cáncer de cuello uterino (citología)</td>
                      </tr>
                      <tr>
                        <td>Colposcopia cérvico - uterina</td>
                      </tr>
                      <tr>
                        <td>Biopsia cérvico - uterina</td>
                      </tr>
                      <tr>
                        <td>Tamizaje para cáncer de mama (mamografía)</td>
                      </tr>
                      <tr>
                        <td>Tamizaje para cáncer de mama (valoración clínica de la mama)</td>
                      </tr>
                      <tr>
                        <td>Biopsia de mama</td>
                      </tr>
                      <tr>
                        <td>Tamizaje para cáncer de próstata (PSA)</td>
                      </tr>
                      <tr>
                        <td>Tamizaje para cáncer de próstata (tacto rectal)</td>
                      </tr>
                      <tr>
                        <td>Biopsia de próstata</td>
                      </tr>
                      <tr>
                        <td>Tamizaje para cáncer de colon (sangre oculta en materia fecal por inmunoquímica)</td>
                      </tr>
                      <tr>
                        <td>Colonoscopia</td>
                      </tr>
                      <tr>
                        <td>Biopsia de colon</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Uroanálisis</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Glicemia</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Creatinina</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Triglicéridos</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Colesterol Total</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Colesterol HDL</td>
                      </tr>
                      <tr>
                        <td>Tamizaje de riesgo cardiovascular - Colesterol LDL</td>
                      </tr>
                      <tr>
                        <td>Prueba rápida treponémica</td>
                      </tr>
                      <tr>
                        <td>Prueba rápida para VIH</td>
                      </tr>
                      <tr>
                        <td>Asesoría Pre y Post test VIH</td>
                      </tr>
                      <tr>
                        <td>Prueba Rápida para Hepatitis B</td>
                      </tr>
                      <tr>
                        <td>Prueba Rápida para Hepatitis C</td>
                      </tr>
                      <tr>
                        <td rowspan="7">Protección Específica</td>
                        <td>Atención en salud por medicina general, medicina familiar o enfermería para asesoría en la
                          anticoncepción</td>
                      </tr>
                      <tr>
                        <td>Atención en salud por medicina general, medicina familiar o enfermería para asesoría en la
                          anticoncepción - control</td>
                      </tr>
                      <tr>
                        <td>Vasectomía SOC</td>
                      </tr>
                      <tr>
                        <td>Suministro de preservativos</td>
                      </tr>
                      <tr>
                        <td>Profilaxis y remoción de la placa bacteriana</td>
                      </tr>
                      <tr>
                        <td>Detartraje supragingival</td>
                      </tr>
                      <tr>
                        <td>Vacunación</td>
                      </tr>
                      <tr>
                        <td rowspan="3">Educación para la Salud</td>
                        <td>Educación individual (Padres o Cuidadores)</td>
                      </tr>
                      <tr>
                        <td>Educación dirigida a la Familia</td>
                      </tr>
                      <tr>
                        <td>Educación grupal</td>
                      </tr>
                    </table>
                  </div>

                  <div class="mb"><u><b>* Vacunación:</u></b> El Servicio de Vacunación debe regirse por la normatividad
                    vigente
                    relacionada con red de frio y Esquema Nacional regular de vacunación. Se debe enviar registro de
                    vacunación cargado a PAIWEB en medio magnético (archivo en Excel) mensual de la población afiliada
                    vacunada donde se pueda visualizar los datos generales del afiliado (nombres, apellidos, tipo y
                    numero de documento, sexo, fecha de nacimiento, Dirección y teléfono de contacto), además de la
                    vacuna colocada y la dosis de la vacuna, fecha de aplicación de la vacuna. La IPS debe Garantizar la
                    Georreferenciación del menor de 6 años y niñas de 9 años en adelante para el seguimiento a la
                    cobertura de vacunación útil, en esta población, una vez haya asistido por primera vez a la IPS a
                    vacunarse. Para las jornadas nacionales de vacunación las IPS deberán notificar a la EPS los planes
                    de acción, así como los puestos de vacunación dispuestos para realizar las jornadas con el fin de
                    articular estrategia para el éxito de dichas jornadas.</div>
                  <div>La IPS debe garantizar el cargue de información al Sistema de Información Nominal
                    PAIWEB, según responsabilidades descritas en la circular 044 de 2013, en el cual se describen las
                    actividades y responsabilidades de obligatorio cumplimiento para cada uno de los niveles
                    establecidos en salud, en los que se resaltan para las IPS Vacunadoras con punto habilitado y/o
                    instituciones con centro de acopio los siguientes puntos:</div>
                  <div class="mb">
                    <ul class="ul_1">
                      <li>Contar, de manera permanente, con talento humano, según el volumen de personas
                        vacunadas y dosis aplicadas</li>
                      <li>Garantizar que el personal responsable del sistema de información nominal del PAI esté
                        debidamente capacitado en el manejo del software</li>
                      <li>Garantizar la continuidad del ingreso de los datos, realizando capacitación e inducción en el
                        manejo del aplicativo, al nuevo personal del área de vacunación</li>
                      <li>Registrar diariamente la población vacunada, con toda la información solicitada en el
                        aplicativo o software PAI.</li>
                      <li>Garantizar el ingreso de los datos del Histórico Vacunal.</li>
                      <li>Diligenciamiento diario de la pérdida de biológicos e insumos, por manejo de la política de
                        frascos abiertos o cualquier otro motivo</li>
                    </ul>
                  </div>
                  <div class="mb"><u><b>* Atención en Salud Pública:</u></b> EL CONTRATANTE realizara seguimiento a la
                    atención de las
                    enfermedades de interés en salud pública y las responsabilidades de las IPS de primer nivel de
                    atención en la población contratada según las Rutas de Atención de acuerdo con la Resolución 3280 de
                    2018. De igual manera CAJACOPI realizara seguimiento al cumplimiento del Decreto 3518 de 2006, para
                    la notificación a la EAPB y SIVIGILA de los eventos de interés en salud pública objeto de reporte
                    semanal o inmediata.</div>
                  <div class="mb">En los casos en que una semana y/o periodo epidemiológico no se presenten eventos en
                    afiliados, EL CONTRATANTE la IPS/ESE informará como Notificación Negativa. Deben enviar de manera
                    semanal, el reporte de los archivos planos cargados al SIVIGILA, a la oficina de Salud Pública
                    seccional y/o nacional.</div>
                  <div class="mb">Atención Integral a Víctimas de Violencia Sexual: Garantizar la atención integral y el
                    seguimiento a los usuarios víctimas de Violencia sexual de los casos que sean identificados en
                    nuestra población afiliada, según lo establecido en la resolución 459 de 2012.</div>
                  <div class="mb">Atención Integral menores con Desnutrición o mal nutrición: Garantizar la atención
                    integral y el seguimiento de los casos que sean identificados en nuestra población afiliada, según
                    lo establecido en el Lineamiento para el manejo integrado de la desnutrición aguda moderada y severa
                    en niños y niñas de 0 a 59 meses de edad y la Resolución 2465 de 2016; teniendo en cuenta lo
                    anterior enviar dicho reporte a la oficina de salud pública seccional y/o nacional los primeros 5
                    días calendarios de cada mes.</div>
                  <div class="mb">Tener en cuenta y priorizar toda mujer en estado de gestación menor de 14 años,
                    notificar los casos ante SIVIGILA, secretaria de salud, ICBF, EPS y otros organismos de vigilancia.
                  </div>
                  <div class="mb">Tuberculosis y Lepra: Adoptar e implementar los lineamientos contenidos en los anexos
                    técnicos y científico de apoyo al fortalecimiento de la gestión técnica a los programas
                    departamentales, distritales y municipales de prevención y control de la Tuberculosis y Lepra,
                    emitidos por el Ministerio de Salud y protección Social a través de la circular externa 007 de 2015
                    y el Plan Estratégico “Hacia el fin de la Tuberculosis” Colombia 2016-2025</div>
                  <div class="mb">La interrupción voluntaria del embarazo (IVE) es un derecho fundamental de las mujeres
                    y niñas en Colombia. Por esta razón, los servicios de salud relacionados con la IVE deben
                    garantizarse de manera real con una atención oportuna en todos los grados de complejidad y en todo
                    el territorio nacional.</div>
                  <div class="mb">La realización de este procedimiento parte de haber garantizado, tanto en la RPMS,
                    como en los primeros pasos de la Ruta Integral de Atención en Salud Materno Perinatal, el derecho
                    que tienen las mujeres a conocer las causales bajo las cuales pueden interrumpir el embarazo, y que
                    están previstas en la Sentencia C - 355 de 2006 y demás sentencias complementarias.</div>
                  <div class="mb">En cuanto a Vigilancia Epidemiológica la IPS debe:</div>
                  <div class="mb">
                    <ol>
                      <li>Enviar copia de las actas de unidad de análisis (COVE INSTITUCIONAL - IPS) de los casos de
                        Sífilis Congénita, Muerte por Dengue, Muerte por Malaria, Vigilancia integrada de muertes en
                        menores de cinco años por infección respiratoria aguda, enfermedad diarreica aguda y/o
                        desnutrición u otro evento por muerte de enfermedades de interés en salud pública, que sea
                        solicitado por la EPS; deberá anexar copia de la historia clínica completa y copia de la ficha
                        epidemiológica. La IPS debe enviar copia de las actas de visitas y los seguimientos a los
                        eventos de interés en salud pública.</li>
                      <li>La IPS debe reportar el número de eventos centinela de forma mensual en los RIPS, adicional
                        deberá enviar los datos correspondientes al evento centinela que reportan, así: Nombre, Fecha
                        atención, Nombre de la IPS que atiende el caso, Municipio, No. documento, edad, dirección,
                        teléfono, municipio del paciente, fecha de ingreso hospitalización y fecha de egreso.</li>
                      <li>La IPS deberá reportar de forma mensual los eventos presentados de Interrupción Voluntaria
                        del Embarazo indicando Nombre de la usuaria, Tipo de Identificación, No. De Identificación,
                        Municipio, Régimen, Semanas de Gestación, Nombre de la IPS que atiende el caso y registro de la
                        causal de sentencia C-355/06, soporte Historia Clínica. En caso de no presentarse eventos deberá
                        notificar que durante el período reportado no se presentaron eventos.</li>
                      <li>La IPS debe enviar copia de lo reportado en SIVIGILA de forma semanal al correo electrónico
                        descrito al final, en caso de presentarse eventos de notificación inmediata la IPS debe enviar a
                        EL CONTRATANTE copia y/o pantallazo de lo notificado al SIVIGILA.</li>
                      <li>La IPS deberá reportar de forma MENSUAL informe de tuberculosis, copia de libro de pacientes
                        de Tuberculosis/Lepra, Informes de Cultivos, Informe de Cohorte, Informe de casos y actividades,
                        en los formatos en los cuales reporta dicha información a la Secretaría de Salud Municipal como
                        lineamiento del Ministerio de la Protección Social. </li>
                      <li>Al presentarse caso de Tuberculosis y Lepra la IPS deberá enviar copia de la ficha
                        epidemiológica y tarjeta de tratamiento, esta información debe ser reportada por vía correo
                        electrónico descrito al final o radicar esta información en la oficina municipal de EL
                        CONTRATANTE. </li>
                      <li>La IPS debe realizar búsqueda activa de sintomáticos de piel y respiratorios sobre el total
                        de población asignada y/o zonificada a cada IPS y radicar dicha gestión en los RIPS según código
                        CUPS establecido, remitir mensualmente informe sobre los hallazgos y seguimientos en el formato
                        que tiene preestablecido para tal fin el MSPS-INS.</li>
                    </ol>
                  </div>
                  <div class="mb">
                    <u><b>* Prioridades en Salud Pública</b></u>
                  </div>
                  <div class="mb">En cuanto al seguimiento de la Política de Salud Mental la IPS debe adoptar el Modelo
                    de Atención Integral en Salud para Víctimas de Violencia Sexual, la Guía del Menor maltratado y la
                    Guía de la Mujer Maltratada, para la atención de estos diferentes tipos de violencia, siendo salud
                    mental una de las prioridades Nacionales de Salud Pública. Todos los establecimientos
                    correspondientes al nivel básico (Ley 1438 de 2011) deben realizar tanto prevención como promoción
                    en salud mental, como diagnóstico, tratamiento, rehabilitación y canalización de problemas y
                    trastornos mentales, de acuerdo con su capacidad de resolución. </div>
                  <div class="mb">Las principales estrategias para el nivel básico frente al programa de salud mental
                    son las siguientes: </div>
                  <div class="mb">
                    <ol>
                      <li>La IPS implementará Política de Salud Mental.</li>
                      <li>2.Consultoría de Salud Mental: El objetivo de esta actividad es que el equipo de salud general
                        reciba información y adquiera habilidades para realizar las acciones del Programa, mejorando y
                        manteniendo su capacidad resolutiva. Adicionalmente: el talento humano debe tenerlas
                        competencias para brindar atención en salud mental, atención a los usuarios canalizados en el
                        marco del Componente de Salud Mental. Operatividad del Sistema de Vigilancia en Salud Mental
                        mediante el reporte mensual de los eventos en salud mental en RIPS y anexo técnico de la
                        resolución 202 de 2021.</li>
                    </ol>
                  </div>
                  <div class="mb">En cuanto a la estrategia IAMI y AIEPI la IPS, la IPS debe enviar el Informe Mensual
                    de los indicadores de AIEPI (dentro de los cinco primeros días calendario) y garantizar la
                    prestación del servicio con todos los componentes de la estrategia siguiendo los lineamientos de la
                    OMS/OPS. Las IPS certificadas en AIEPI/IAMI estarán sujetas a verificación de estándares mínimos de
                    operación de la estrategia, en las auditorias de calidad que EL CONTRATANTE programe durante la
                    vigencia contractual.</div>
                  <div class="mb">EL CONTRATANTE , ha priorizado poblaciones de atención especial y preferencial,
                    debiendo la IPS garantizar atención oportuna e idónea siguiendo protocolos, Normas técnicas, guías
                    de atención y/o manejo establecidas por el MSPS para: Gestantes, Crónicos (Diabetes Mellitus e
                    Hipertensión), usuarias con Lesiones Preneoplásicas de Cuello Uterino, Menores de 5 años; población
                    que presente Enfermedades de interés en Salud Pública (sintomáticos respiratorios, sintomáticos de
                    piel) de acuerdo al nivel de complejidad, Malaria, Leishmaniasis, Cohortes de Esquemas de Vacunación
                    – PAI- , cohortes de estrategia AIEPI.</div>
                  <div class="mb">Nota: en aquellas zonas donde el Dengue y Chagas sea prevalente se debe definir como
                    población de riesgo, debiendo ser prioritaria su atención, soportada en las guías de atención
                    existente y avalada por la autoridad competente. Sobre estos grupos la IPS desarrollará las
                    siguientes acciones:</div>
                  <div class="mb">A. Envío mensual a la EPS de base de datos y seguimientos a Lesiones Pre-Neoplásicas
                    de Cuello Uterino (SP-FR-14), Matriz de Seguimiento de Enfermedades Transmitidas por Vectores -
                    Dengue, Chagas, Leishmaniasis, Malaria y Lepra (Formato SP-MZ-01), Tuberculosis (SP-FR-19), copia de
                    registros de vacunación diario, utilizando el formato de la EPS o el formato de la IPS siempre y
                    cuando se garanticen la información requerida por EL CONTRATANTE para seguimiento y monitoreo
                    epidemiológico. El reporte de la base de datos se realizará en medio magnético al correo electrónico
                    del Profesional Seccional de Salud Pública o en CD-ROM. La EPS CAJACOPI realizará visita de
                    seguimiento al diligenciamiento de la información requerida en estos formatos.</div>
                  <div class="mb">B. Teniendo en cuenta que EL CONTRATANTE realiza seguimiento a las poblaciones
                    priorizadas y asigna recurso humano (Gestores de Salud / Agentes Educativos / Profesionales en Salud
                    / Auditores externos) para realizar seguimiento y visitas domiciliarias, la IPS deberá permitir el
                    ingreso del Gestor de Salud / Agentes Educativos y cualquier funcionario de CAJACOPI a la IPS con el
                    fin de capturar información de casos especiales de Gestantes, Citologías Alteradas, Esquemas de
                    Vacunación, Tuberculosis, Lepra, Leishmaniasis y Malaria principalmente.</div>
                  <div class="mb">En cuanto a la Canalización de Usuarios la IPS debe contar con un Plan de Acción y
                    deberá enviar de forma mensual los usuarios canalizados a la Ruta de Promoción y Mantenimiento de la
                    Salud; Esta gestión será socializada con los Entes Locales y departamentales como evidencia de este
                    proceso sobre las actividades preventivas reglamentadas en la Resolución 3280 de 2018, Resolución
                    276 de 2019 y Resolución 202 de 2021 y además soportará la interventoría del presente contrato. EL
                    CONTRATANTE canaliza a través de su Gestor de Salud los usuarios a las intervenciones de la RPMS
                    utilizando la boleta de Demanda Inducida, por lo cual se hace necesario que la IPS garantice
                    oportunidad y accesibilidad para la prestación de los servicios a los usuarios remitidos. Dado que
                    se requiere evaluar la efectividad de las actividades realizadas por el Gestor de Salud / Agente
                    Educativo, la IPS debe permitir el acceso a la información para verificar la asistencia de los
                    usuarios remitidos. La IPS debe canalizar las actividades de niveles de mediana complejidad hacia la
                    red de referencia de EL CONTRATANTE. Mensualmente la IPS reportará en medio físico y/o magnética
                    relación de usuarios remitidos a actividades de mayor nivel de complejidad (colposcopia, mamografía,
                    oftalmología, anticonceptivo hormonal moderno, pomeroy, vasectomía), como parte del seguimiento y
                    monitoreo de las intervenciones de la RPMS que así lo requieran. Dicha relación deberá entregarse al
                    Gestor de Salud / Agente Educativo y/o Profesional de Salud Pública de cada Seccional.</div>
                  <div class="mb">De igual manera la IPS deberá realizar actividades de Información, Educación y
                    Comunicación (IEC) a la población afiliada sobre las prioridades de salud pública consecuentes con
                    el PDSP 2012-2021:</div>
                  <div>Dimensión derechos sexuales y sexualidad</div>
                  <div>Dimensión convivencia social y salud mental</div>
                  <div>Dimensión seguridad alimentaria y Nutricional </div>
                  <div>Dimensión vida saludable y condiciones no transmisibles</div>
                  <div class="mb">Dimensión vida libre de enfermedades transmisibles</div>
                  <div class="mb">Las actividades educativas se reportarán según cursos de Vida y el reporte será a
                    través del archivo AT (otros servicios) o AP (Procedimientos) en los RIPS, según la codificación
                    definida por la EPS en el anexo de las intervenciones de la RPMS relacionado al final, además la EPS
                    CAJACOPI verificará su ejecución en las auditorias de seguimiento y/o en los informes de educación
                    que soporte la IPS.</div>

                </td>
              </tr>
              <tr>
                <td>
                  <div class="ml_1">
                    1. RESOLUCION 202 de 2021
                  </div>
                  <!-- <div>
                    <ol>
                      <li>RESOLUCION 202 de 2021</li>
                    </ol>
                  </div> -->
                </td>
              </tr>
              <tr>
                <td>
                  <div class="mb">Resolución 202 de 2021: Por la cual se establece el reporte relacionado con el
                    registro de información relacionada con las intervenciones individuales de la Ruta Integral de
                    Atención para la Promoción y Mantenimiento de la Salud y la Ruta Integral de Atención en Salud para
                    la población Materno Perinatal, realizadas por los servicios de salud, para su integración al
                    Sistema Integral de Información de la Protección Social (SISPRO).</div>
                  <div>
                    <ul>
                      <li>Recolectar y consolidar el registro, remitidas por su red de prestadores de servicios de
                        salud (IPS). </li>
                      <li>Reportar al Ministerio de Salud y Protección Social, el registro por persona, según el Anexo
                        Técnico. </li>
                      <li>Responder por la oportunidad, cobertura y calidad de la información reportada. </li>
                      <li>Realizar la asistencia técnica, capacitación, monitoreo y retroalimentación a las IPS, de su
                        red de servicios. </li>
                      <li>Realizar la verificación de la veracidad de la información reportada por las IPS, de su red
                        de servicios.</li>
                    </ul>
                  </div>
                  <div class="mb">CAJACOPI informa el proceso para el reporte de la información, validación y asistencia
                    técnica de la Resolución 202 de 2021 “por la cual se establece el reporte relacionado con el
                    registro de las actividades de la Ruta Integral de Atención para la Promoción y Mantenimiento de la
                    Salud y la Ruta Integral de Atención en Salud para la Población Materno Perinatal y la aplicación de
                    las guías de atención integral para las enfermedades de interés en salud pública de obligatorio
                    cumplimiento”, que fue modificada por la Resolución 1588/2016 ,” la cual es de obligatorio
                    cumplimiento por parte de las Instituciones Prestadoras de Servicios de Salud (IPS), las Empresas
                    Administradoras de Planes de Beneficios (EAPB) incluidas las de régimen de excepción de salud y las
                    Direcciones Departamentales, Distritales y Municipales de Salud; en el artículo 7 de dicha
                    resolución se establecen las responsabilidades de las Instituciones Prestadoras de Servicios de
                    Salud (IPS).</div>

                  <div class="mb">
                    <u><b>1.REPORTE DE INFORMACION</b></u>
                  </div>
                  <div class="mb">Se establece como plazo máximo para radicar los archivos las siguientes fechas:</div>
                  <div>
                    <table class="table_con w100 mb">
                      <tr>
                        <th class="tabla_estilo_2">ESTUDIO</th>
                        <th class="tabla_estilo_2" colspan="2">TRIMESTRE DE SOLICITUD DE INFORMACIÓN</th>
                        <th class="tabla_estilo_2">FECHA MÁXIMA DE REPORTE DE INFORMACIÓN</th>
                        <th class="tabla_estilo_2">PERIODICIDAD DEL REPORTE</th>
                      </tr>
                      <tr>
                        <td>Resolución 202 de 2021</td>
                        <td>I</td>
                        <td>ENERO-FEBRERO-MARZO</td>
                        <td>21 DE ABRIL</td>
                        <td>TRIMESTRAL</td>
                      </tr>
                      <tr>
                        <td>Resolución 202 de 2021</td>
                        <td>II</td>
                        <td>ABRIL-MAYO-JUNIO</td>
                        <td>21 DE JULIO</td>
                        <td>TRIMESTRAL</td>
                      </tr>
                      <tr>
                        <td>Resolución 202 de 2021</td>
                        <td>III</td>
                        <td>JULIO-AGOSTO-SEPTIEMBRE</td>
                        <td>21 DE OCTUBRE</td>
                        <td>TRIMESTRAL</td>
                      </tr>
                      <tr>
                        <td>Resolución 202 de 2021</td>
                        <td>IV</td>
                        <td>OCTUBRE-NOVIEMBRE-DICIEMBRE</td>
                        <td>21 DE ENERO PROXIMA VIGENCIA</td>
                        <td>TRIMESTRAL</td>
                      </tr>
                    </table>
                  </div>
                  <div class="mb">
                    La IPS puede reportar la información antes de esta fecha.
                  </div>
                  <div class="mb">
                    <u><b>2.OBLIGACIONES DE LAS IPS</b></u>
                  </div>
                  <div>La Resolución 202 de 2021 se establecen las Responsabilidades de las Instituciones Prestadoras de
                    Servicios de Salud, públicas y privadas: </div>
                  <div>1. Recolectar y reportar a las Empresas Administradoras de Planes de Beneficios, incluidas las de
                    régimen de excepción de salud y a las Direcciones Municipales y Distritales de Salud, el registro
                    por persona de las actividades de Ruta Integral de Atención para la Promoción y Mantenimiento de la
                    Salud y la Ruta Integral de Atención en Salud para la Población Materno Perinatal y la aplicación de
                    las Guías de Atención Integral de las enfermedades de interés en salud pública de obligatorio
                    cumplimiento, según el Anexo Técnico, que hace parte integral de esta Resolución. </div>
                  <div>2. Capacitar a su personal en el registro y soporte clínico relacionado con las actividades de la
                    Ruta Integral de Atención para la Promoción y Mantenimiento de la Salud y la Ruta Integral de
                    Atención en Salud para la Población Materno Perinatal y la aplicación de las Guías de Atención
                    Integral de las enfermedades de interés en salud pública de obligatorio cumplimiento</div>

                  <div class="mb">
                    <u><b>3.MEDIO DE RADICACION DE LA INFORMACION</b></u>
                  </div>
                  <div>
                    El único medio valido establecido por CAJACOPI para la radicación de la información es por correo
                    electrónico, al correo : pyp4505-2012@cajacopieps.com; especificando en el nombre y texto del correo
                    electrónico el Departamento, Municipio, Prestador y Periodo que está haciendo referencia el archivo
                    adjunto, el reporte de información debe ser remitido en la en formato TXT y en la estructura de
                    reporte establecida en los lineamientos para el diligenciamiento del anexo técnico de la Resolución
                    202 de 2021. Esta solicitud se adelanta por ser un correo nacional y se debe tener identificada el
                    prestador de servicio y la periodicidad del reporte.
                  </div>
                  <div class="mb">
                    <img src="./anexo_images/Anexo15_Imagen12.png" alt="x" width="65%">
                  </div>
                  <div class="mb">
                    <u><b>4.VALIDACION DE ARCHIVOS</b></u>
                  </div>
                  <div class="mb">Una vez se reciben los archivos, CAJACOPI, realiza el proceso de descarga y validación
                    de archivos desde el día hábil siguiente al plazo establecido para el reporte de información por
                    parte del Prestador de Servicios de Salud y realizará las validaciones de su archivo; el resultado y
                    retroalimentación de la validación será remitida al correo electrónico de origen del reporte o al
                    correo que como representante legal delegue para el reporte de la información, por lo que se
                    solicita confirmar el correo electrónico y teléfono de la persona responsable de dicho proceso en su
                    entidad.</div>
                  <div class="mb">
                    <u><b>5.ASISTENCIA TECNICA, CAPACITACION, MONITOREO Y RETROALIMENTACION A LAS IPS</b></u>
                  </div>
                  <div class="mb">En la retroalimentación de la validación de su archivo, se informa el número de
                    intentos realizados, el tipo de error y el porcentaje de la calidad del dato; así mismo se adjuntan
                    los archivos que evidencian el detalle de los errores presentados en caso de que los presente. En
                    caso de que el archivo presente errores, el Prestador de Servicios de Salud debe realizar la
                    corrección de estos y enviarlos nuevamente al correo electrónico establecido las veces que sea
                    necesario hasta que culmine el proceso con éxito; el plazo de validación y tiempos de reporte por
                    parte de la EPS es notificado en la retroalimentación enviada según la validación de sus archivos.
                    Una vez la validación de su archivo se encuentra con la calidad del dato en el 100% quedará como
                    exitoso el reporte enviado y sólo si el Ministerio de Salud y Protección Social notifica algún error
                    adicional, la EPS se los notificará para el respectivo ajuste.</div>
                  <div class="mb">
                    <u><b>6.VERIFICACIÓN DE LA VERACIDAD DE LA INFORMACIÓN REPORTADA POR LAS INSTITUCIONES PRESTADORAS
                        DE SERVICIOS DE SALUD (IPS)</b></u>
                  </div>
                  <div class="mb">CAJACOPI, adelantará las acciones establecidas en la normatividad existente a fin de
                    verificar la calidad del dato, el cual es exclusivo de la institución prestadora de servicios de
                    salud.</div>
                  <div class="mb">De conformidad a lo establecido en el numeral 120.11 del artículo 130 de la Ley 1438
                    de 2011, se considera una CONDUCTAS QUE VULNERAN EL SISTEMA GENERAL DE SEGURIDAD SOCIAL EN SALUD Y
                    EL DERECHO A LA SALUD, los datos inexactos o falsos.</div>
                  <div class="mb">130.11. Efectuar cobros al Sistema General de Seguridad Social en Salud con datos
                    inexactos o falsos.</div>
                  <div class="mb">
                    <u><b>7.TRASLADO DE USUARIOS POR REVOCATORIA DE LA HABILITACION DE EPS </b></u>
                  </div>
                  <div class="mb">Si el usuario a pesar de haber realizado el traslado de EPS continua con la misma IPS
                    primaria, debe reportársela a la nueva EAPB de afiliación.</div>
                  <div>ESTIMACION: </div>
                  <div class="mb">Determinación cuantitativa de los parámetros de modelos económicos a través de la
                    manipulación estadística de la información contenida en observaciones muéstrales.</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="ml_1">2. SOPORTES DE EJECUCION</div>
                </td>
              </tr>
              <tr>
                <td>

                  <div class="mb">Los soportes de ejecución de las intervenciones de la Ruta de Promoción y
                    Mantenimiento de la Salud serán los RIPS y el anexo técnico de la resolución 202 de 2021; cabe
                    aclarar que estos dos reportes deben coincidir en las actividades que tengan en común.
                    La EPS también podrá solicitar otros soportes del proceso de atención a la población afiliada,
                    especialmente la historia clínica en los casos excepcionales de las auditorias de la CAC, el MSPS,
                    SUPERSALUD, otros organismos de control.</div>
                  <div class="mb">No se tendrá en cuenta actividades que no vengan soportadas en los RIPS siguiendo la
                    metodología del anexo técnico de la Resolución 3374/00 (Se adjunta plantilla resumen para
                    intervenciones de RPMS). Los RIPS solo serán recibidos por EL CONTRATANTE si pasan la malla
                    validadora de estructura, en caso contrario serán entregados de nuevo a la IPS para su corrección y
                    posterior presentación.</div>
                  <div class="mb">Los datos reportados por la IPS deben guardar coherencia y consistencia, deben ser
                    veraz, de buena calidad y oportuno, según lo establecido en cada norma técnica. El cumplimiento de
                    las actividades de la RPMS será evaluado de acuerdo con los parámetros de evaluación establecidos en
                    ítem 5 del presente anexo.</div>
                  <div class="mb">La radicación de los Registros Individuales de Prestación de Servicios de Salud
                    (RIPS), se deben radicar por parte de la IPS en la oficina de Cajacopi EPS Departamental dentro de
                    los veinte (20) días calendarios siguientes al mes ejecutado los RIPS en medio magnético validado en
                    su estructura y dentro de los veinte (20) días calendarios siguientes al trimestre ejecutado los el
                    anexo técnico de la resolución 202 de 2021 al correo electrónico: pyp4505-2012@cajacopieps.com.
                  </div>


                </td>
              </tr>
              <tr>
                <td>
                  <div class="ml_1">3. EVALUACION</div>
                </td>
              </tr>

              <tr>
                <td>
                  <div class="mb">El proceso de evaluación consiste en validar la información que radica oportunamente
                    la ESE o IPS, máximo los 20 días subsiguientes al mes vencido, EL CONTRATANTE cargara al sistema los
                    RIPS que hayan pasado la validación de estructura y contenido que realiza el auxiliar de cuentas
                    medicas de la seccional, luego internamente el sistema de EL CONTRATANTE valida que las actividades
                    que realizó la ESE o IPS sean o soporten las actividades contratadas (Intervenciones de la RPMS en
                    relación a los códigos CUPS válidos, edad y sexo pertinente para el usuario).</div>
                  <div class="mb">De este proceso se obtiene un número “X” de actividades realizadas, estas actividades
                    son comparadas con las estimaciones poblaciones pactadas con la ESE o IPS y se aplica los parámetros
                    de evaluación para obtener el cumplimiento de las actividades realizadas por la ESE o IPS.</div>
                  <div>Parámetros de Evaluación:</div>

                  <div class="mb">
                    <table class="table_con m_auto">
                      <tr>
                        <td colspan="3">1. Cobertura de la atención</td>
                      </tr>
                      <tr>
                        <td>Calificación Cuantitativa</td>
                        <td>Indicador / % Cumplimiento</td>
                        <td>Rango de Viabilidad frente al pago</td>
                      </tr>
                      <tr>
                        <td>OPTIMO</td>
                        <td>Cumplimiento igual ó > de 90%</td>
                        <td>= Pago del 100% (Sobre el Valor Actividad / mes /Contratado)</td>
                      </tr>
                      <tr>
                        <td>BUENO</td>
                        <td>Cumplimiento entre el 70 al 89%</td>
                        <td>= Pago del 90% (Sobre el Valor Actividad / mes /Contratado)</td>
                      </tr>
                      <tr>
                        <td>ADECUADO</td>
                        <td>Cumplimiento entre el 51 al 69%</td>
                        <td>= Pago del 70% (Sobre el Valor Actividad / mes /Contratado)</td>
                      </tr>
                      <tr>
                        <td>DEFICIENTE</td>
                        <td>Cumplimiento entre el 30 al 50%</td>
                        <td>= Pago del 50% (Sobre el Valor Actividad / mes /Contratado)</td>
                      </tr>
                      <tr>
                        <td>MUY DEFICIENTE</td>
                        <td>Cumplimiento < del 30%</td>
                        <td>= Pago del 30% (Sobre el Valor Actividad / mes /Contratado)</td>
                      </tr>
                    </table>
                  </div>
                  <div class="mb">
                    <table class="table_con m_auto">
                      <tr>
                        <td colspan="3">1. Cobertura de la atención</td>
                      </tr>
                      <tr>
                        <td>Calificación Cuantitativa</td>
                        <td>Indicador / % Cumplimiento</td>
                        <td>% de Pago según valor inicial reconocido en el trimestre</td>
                      </tr>
                      <tr>
                        <td>OPTIMO</td>
                        <td>80 -100%</td>
                        <td>Pago del 100%</td>
                      </tr>
                      <tr>
                        <td>ADECUADO</td>
                        <td>60 - 79%</td>
                        <td>Pago del 80%</td>
                      </tr>
                      <tr>
                        <td>DEFICIENTE</td>
                        <td>
                          < de 60%</td>
                        <td>Pago del 50%</td>
                      </tr>
                    </table>
                  </div>

                  <div class="mb">Una vez se evalué la ejecución de las actividades vs las estimaciones, se obtiene el %
                    de cumplimiento de la actividad/mes. Y se aplica el pago de las actividades según el cumplimiento
                    obtenido por la ESE o IPS y teniendo en cuenta el % de la actividad contratado/mes.</div>
                  <div class="mb">Incumplimiento / Descuentos: en el análisis mensual se podrán generar descuentos al
                    anticipo de la cápita del mes siguiente, por dos motivos principalmente:</div>
                  <div class="mb">
                    <ul class="ul_2">
                      <li>-Incumplimiento por la NO radicación oportuna de RIPS y reporte de Anexo Técnico de 202 de
                        2021, es indispensable la radicación de los dos archivos. El anterior incumplimiento generara un
                        descuento del 50% del pago al anticipo como nota débito.</li>
                      <li>-Incumplimiento en la cobertura de la atención según las estimaciones poblacionales, el valor
                        a descontar será el obtenido en el porcentaje de evaluación de las actividades, los parámetros
                        de evaluación y el % asignado a la actividad en el mes. Las actividades dejadas de hacer en el
                        mes podrán ser realizadas dentro de la vigencia del contrato.</li>
                    </ul>
                  </div>
                  <div class="mb">Planes de Mejoramiento: La EPS CAJACOPI notificara mensualmente el incumplimiento de
                    las actividades de la RPMS y entrega informe de hallazgos de las auditoria de calidad
                    trimestralmente, por lo cual la ESE o IPS deberá radicar ante la EPS el plan de mejoramiento,
                    propuesto una vez se le notifiquen los hallazgos de incumplimiento. Este plan debe contener mínimo,
                    el hallazgo, el objetivo, las acciones, los tiempos, los responsables, el indicador y la fecha de
                    seguimiento y cierre programada para las acciones propuestas de mejoramiento.</div>
                  <div class="mb">En los casos de los municipios donde la población aumente más del 10% de su población
                    afiliada, se realizará ajustes a las estimaciones, de lo contrario las estimaciones para el periodo
                    evaluado continuarán siendo las mismas; así mismo mientras la EPS no radique un ajuste o entregue
                    una nueva estimación para un periodo, el PSS continuará su proceso con la última radicada.</div>

                </td>
              </tr>

              <tr>
                <td>
                  <div class="ml_1">4. ASISTENCIA TECNICA, AUDITORIA, SEGUIMIENTO Y MONITOREO</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="mb">EL CONTRATANTE realizará asistencia técnica de los programas y/o servicios contratados
                    a través de diferentes medios: presencial, por correo electrónico, llamada telefónicas,
                    videoconferencias, entre otras y con el recurso humano profesional y calificado de los departamentos
                    y del nivel nacional, con el propósito de brindar asesoría y asistencia a las dudas de los
                    prestadores.</div>
                  <div class="mb">De igual manera se realizarán auditoría de seguimiento a la prestación y atención de
                    la RPMS y seguimiento permanente a través de nuestros Gestores de Salud / Agentes educativos y/o
                    contratistas para el monitoreo y control de condiciones especiales en nuestros usuarios; asistencia
                    de pacientes con TB y Lepra a su tratamiento o visita del Agente Educativo de la IPS para entrega de
                    estos medicamento a este grupo de pacientes; Gestantes y menores de 5 años hospitalizadas, Víctimas
                    de Violencia Sexual, entre otros.</div>
                  <div class="mb">Las auditorias de calidad en la atención de la RPMS se realizarán trimestralmente, en
                    donde se harán dos tipos de evaluaciones:</div>
                  <div class="mb">Evaluación de la calidad y consistencia del dato reportado a través del anexo técnico
                    de la resolución 202 de 2021 y RIPS: Cuando el prestador haya reportado en RIPS y anexo técnico de
                    202 de 2021 se tomará una muestra aleatoria para evaluar. Los parámetros de calificación de esta
                    auditoría están descritos en el ítem anterior “5-Evaluacion”, en los casos donde la calificación sea
                    diferente de optimo, se verá afectado el valor reconocido inicialmente por las actividades validadas
                    por el sistema de la EPS CAJACOPI y se generara un descuento al valor inicial reconocido en el
                    análisis de actividades cumplidas en el trimestre por falta de soporte clínicos en la auditoria.
                  </div>
                  <div class="mb">Evaluación de la calidad de la atención, pertinencia, consistencia, completitud según
                    lo establecido en la Resolución 3280 de 2018, Resolución 276 de 2019 y Resolución 202 de 2021: se
                    aplicará una herramienta de verificación de las condiciones mínimas de atención según lo definido en
                    la normatividad vigente y políticas nacionales de salud pública. De esta herramienta se generan unos
                    puntajes, calificaciones y hallazgos que darán objeto a planes de mejora por parte de la ESE o IPS
                    Auditada. </div>
                  <div class="mb"></div>
                  <div class="mb"></div>
                  <div class="mb"></div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="ml_1">5. NORMATIVIDAD / INDICADORES / REPORTES</div>
                </td>
              </tr>
            </table>
            <div class="ml_1">Capítulo 6. Monitoreo y Evaluación</div>
            <div class="ml_1">6.1 Indicadores:</div>
            <div class="ml_1">6.1.1 Indicadores de Resultado de RPMS</div>
            <ul class="page_break_after">
              <li>Cobertura de Adultez</li>
              <li>Cobertura de planificación familiar</li>
              <li>Cobertura de Salud Bucal.</li>
              <li>Cobertura del Tamizaje de cáncer de cuello uterino - citología </li>
              <li>6.1.2 Indicadores de Procesos </li>
            </ul>
            <!--  -->
            <!--  -->
        </td>
      </tr>


    </tbody>
  </table>





  <!-- ANEXOS EPS NUEVA -->
</body>

</html>
