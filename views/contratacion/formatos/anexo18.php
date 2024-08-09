<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Formato Minuta Contrato</title>
  <link rel="icon" href="../../../../assets/images/icon.ico" />
  <link rel="stylesheet" type="text/css" href="../../../../bower_components/sweetalert/css/sweetalert2.css">
  <style type="text/css">
    @page {
      size: auto;
      margin: 1em;
    }


    /* @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
    } */

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
      font-size: 10px;
      border-spacing: 0 0 !important;
      /* display: none; */
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

    .minuta_texto_1 {
      text-align: justify;
      font-size: 15px;
    }

    .mb {
      margin-bottom: 2vh;
    }

    .minuta_texto {
      text-align: justify;
      font-size: 12px;
    }

    .minuta_clausula {
      text-align: justify;
      font-weight: 600;
      margin-left: 3vw;
      font-size: 12px;
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

    #firma {
      margin-top: 4em;
      margin-left: 3em;
      width: 100%;
      font-size: 11px;
      display: flex;
      page-break-after: always;
      /* display: none; */
    }

    .table_firma,
    .table_firma tr th,
    .table_firma tr td {
      border: .5px solid black;
      border-collapse: collapse;
      font-size: 10px;
      border-spacing: 0 0 !important;
      /* page-break-after: always; */
      /* display: none; */
    }


    .mt_1 {
      /* margin-top: 18vh; */
      /* position: relative; */
      /* bottom: 0; */
      position: relative;
      display: block;
      float: left;
    }

    .d-flex {
      display: flex;
    }

    .minuta_anexo_subtitulo {
      text-align: center;
      font-weight: 600;
      /* margin-left: 3vw; */
      font-size: 12px;
    }

    .minuta_anexo_parrafo {
      text-align: justify;
      /* margin-left: 3vw; */
      font-size: 12px;
    }

    .ml {
      margin-left: 3vw;
    }

    .ml_1 {
      margin-left: 1vw;
    }
  </style>
  <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <script src="../../../bower_components/angular/angular.js"></script>
  <script src="../../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../../scripts/controllers/contratacion/formatos/formatoanexosController.js"></script>
</head>

<body ng-controller="formatoanexosController">
  <!--  -->
  <!-- ANEXOS EPS NUEVA -->
  <table class="report-container" style="page-break-before:always">
    <thead class="report-header">
      <tr>
        <th class="report-header-cell">
          <div class="header-info text-left d-flex">
            <img style="width: 8em;" src="../../../assets/images/logo_cajacopieps.png" alt="cajacopi">
            <div class="text-bold7">
              ANEXO N° 18 {{tituloMinuta}}</div>
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
            <div class="minuta_titulo mb">Anexo 18. Acuerdo de confidencialidad y protección sobre la información
              personal</div>

            <div class="minuta_anexo_subtitulo mb">PARTES.</div>
            <!--  -->
            <!--  -->
            <div class="mb">
              <table class="table_firma" width="100%" style="border: #FFF;">
                <tr class="border_white">
                  <td colspan="1" style="width: 50%;"></td>
                  <td colspan="1" style="width: 50%;"></td>
                </tr>

                <tr>
                  <td colspan="1">
                    <div class="text-bold7 ml_1">
                      {{DATA.RAZON_SOCIAL}}
                    </div>
                    <div class="text-bold7 ml_1">NIT: {{DATA.EPS}}</div>
                    <div class="text-bold7 ml_1">DIRECCIÓN: {{DATA.DIRECCION}}</div>
                    <div class="text-bold7 ml_1">{{DATA.REPRESENTANTE}}</div>
                    <div class="text-bold7 ml_1">CC N°: {{DATA.DOCUMENTO_REPRESENTANTE}} DE BARRANQUILLA
                    </div>
                    <div class="text-bold7 ml_1 mb">CARGO: REPRESENTANTE LEGAL</div>

                    <div class="ml_1">En adelante identificado como {{DATA.RAZON_SOCIAL}}</div>
                  </td>
                  <td colspan="1">
                    <div class="text-bold7 ml_1">
                      {{DATA.RAZON_SOCIAL_IPS}}
                    </div>
                    <div class="text-bold7 ml_1">NIT: {{DATA.NIT}}</div>
                    <div class="text-bold7 ml_1">DIRECCIÓN: {{DATA.DIR_PRESTADOR}}</div>
                    <div class="text-bold7 ml_1">{{DATA.NOM_REPRESENTANTE}}</div>
                    <div class="text-bold7 ml_1">CC N°: {{DATA.COD_REPRESENTANTE}} DE {{DATA.EXPEDICION}}</div>
                    <div class="text-bold7 ml_1 mb">REPRESENTANTE LEGAL</div>

                    <div class="ml_1">En adelante identificada como PRESTADOR DE SERVICIOS DE SALUD</div>

                  </td>

                </tr>
                <tr>

              </table>
            </div>
            <!--  -->
            <!--  -->

            <div class="minuta_anexo_subtitulo mb">CONSIDERACIONES</div>


            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">Primera. </span>
              Que la ley colombiana establece que el tratamiento de los datos personales deberá
              someterse a los principios señalados en ella, entre ellos el de CONFIDENCIALIDAD, en el marco de la
              FINALIDAD para la cual se tratan los datos de conformidad con la ley o con lo autorizado por el titular de
              los datos.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">Segunda. </span>
              Que la ley colombiana establece una prohibición general frente al tratamiento de
              datos personales de menores de edad, así como respecto de la información sensible de las personas;
              entendiendo como sensible según la ley colombiana la información relativa a la salud, creencias
              religiosas, filiación política, orientación sexual, origen étnico, información biométrica, y cualquiera
              otra que pueda generar discriminación, exclusión o peligro. Lo anterior sin perjuicio de las excepciones
              de ley que son de aplicación restrictiva.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">Tercera. </span>
              Que en virtud del contrato de prestación de servicios celebrado entre
              CAJACOPI EPS SAS y {{DATA.RAZON_SOCIAL_IPS}}, esta entidad de prestación de servicios de salud debe
              acceder a los datos
              personales de los afiliados a CAJACOPI EPS SAS, justamente para brindar los servicios de salud contratados
              y cuya prestación está prevista en el régimen de seguridad social vigente en Colombia.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">Cuarta. </span>
              Que, en virtud de las normas sobre prestación de servicios de salud por parte de CAJACOPI EPS SAS, también
              CAJACOPI EPS SAS debe acceder a las historias clínicas de los pacientes que, en condición paralela de
              afiliados, acceden a los servicios que requieren en materia de salud.
            </div>
            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">Quinta. </span>
              Que los datos de salud, en tanto se consideran datos sensibles, deben ser tratados de una manera especial
              y con los mayores niveles de seguridad por las personas naturales o jurídicas que acceden a ellos. En este
              sentido el presente acuerdo constituye una medida de seguridad de carácter
              administrativo que se acuerda por las partes otorgar a los datos de salud de los afiliados y pacientes de
              cada una de ellas.
            </div>
            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">Sexta. </span>
              Que el tratamiento de estos datos tanto por parte de la entidad prestadora de los servicios de salud como
              por parte de CAJACOPI EPS SAS, se realiza en el marco de la ley, y por ende ambas entidades asumen la
              condición de RESPONSABLES frente a los titulares cuyos datos recolectan en el desarrollo de su objeto
              social.
            </div>
            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">Séptima. </span>
              Que de acuerdo a la condición de responsables de tratamiento que asume CAJACOPI EPS SAS frente a sus
              afiliados, y que asume la entidad prestadora del servicio de salud frente a los pacientes que trata por
              cuenta de la EPS, entidades deben cumplir con el principio de confidencialidad y seguridad sobre los datos
              personales a los cuales acceden, confidencialidad que dejan explícitamente regulada a través del presente
              acuerdo que hace parte integral del contrato de prestación de servicios suscrito entre ellas.
            </div>
            <div class="minuta_anexo_parrafo mb">
              <span class="text-bold7 ml">Octava. </span>
              Que el presente acuerdo de buen uso de información de carácter personal y de confidencialidad suscrito
              entre las partes hace parte integral del contrato de prestación de servicios arriba descrito, y
              complementa las previsiones que las partes hayan efectuado en las cláusulas relacionadas con Habeas Data y
              Seguridad de la Información.
              De conformidad con las consideraciones antes expuestas, que constituyen la causa eficiente para la
              realización del presente acuerdo, se pactan las siguientes:
            </div>


            <!--  -->
            <div class="minuta_anexo_subtitulo">CLAUSULAS</div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">PRIMERA. OBJETO. </span>
              Este acuerdo tiene como objeto la obligación de protección, confidencialidad y reserva
              que asume EL PRESTADOR DE SERVICIOS DE SALUD para proteger la información personal de los afiliados del
              CAJACOPI EPS SAS que acceden a sus servicios, en ejecución de las actividades contratadas. En este
              sentido, EL PRESTADOR DE SERVICIOS DE SALUD asume una obligación de reserva, confidencialidad y buen
              manejo de los datos personales a los que accede para la prestación de sus servicios; y a su vez CAJACOPI
              EPS SAS, asume una obligación de reserva, confidencialidad y buen manejo de los datos personales
              consignados en la Historia Clínica o no de los pacientes de EL PRESTADOR DE SERVICIOS DE SALUD.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">Parágrafo. ALCANCE DE LAS OBLIGACIONES ASUMIDAS POR LAS PARTES.</span>
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml"></span>
              Por parte de CAJACOPI EPS SAS, el acceso a la información personal y de salud de los pacientes de EL
              PRESTADOR DE SERVICIOS DE SALUD, se efectuará en el marco de la ley, con la finalidad principal de llevar
              a cabo la auditoría y control sobre la prestación de los servicios, atender las quejas de los pacientes,
              realizar las glosas que correspondan y demás acciones previstas legalmente para las EPS en el marco del
              Decreto 780 de mayo 6 de 2016; Resolución 1995 de 1999; Ley 1122 de 2007; Ley 23 de 1981; Sentencia T 158
              A de 2008 y demás normas concordantes.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml"></span>
              Por parte de EL PRESTADOR DE SERVICIOS DE SALUD, el acceso a la información personal de los afiliados de
              CAJACOPI EPS SAS, se realizará en el marco de la ley y únicamente con la finalidad principal de prestar
              los servicios de salud que se le contratan y que sean requeridos por los afiliados. En este sentido no
              bastará únicamente con la reserva de la información atinente con la historia clínica, sino que la misma se
              extiende a todos los demás datos personales de carácter sanitario, medico, patrimoniales y de cualquiera
              otra índole qué EL PRESTADOR DE SERVICIOS DE SALUD deba tratar en el marco de la prestación de sus
              servicios. Cualquier otro tratamiento relacionado con investigación científica, proyectos tecnológicos o
              de innovación sobre información y estadísticas en salud que comprometan o incluyan tratamiento de datos
              personales, acciones de prevención en salud, entre otros, está condicionado a la autorización que los
              pacientes le otorguen de forma previa, expresa e informada a EL PRESTADOR DE SERVICIOS DE SALUD, para lo
              cual no bastará el consentimiento informado requerido para la apertura de la respectiva historia clínica,
              sino que éste deberá incluir tratamientos como los que se mencionan anteriormente y cualquiera otro qué
              despliegue EL PRESTADOR DE SERVICIOS DE SALUD, pero en todo caso enmarcado dentro de la prestación de sus
              servicios.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">SEGUNDA. OBLIGACIONES ESPECIALES DEL PRESTADOR DE SERVICIOS DE SALUD.</span>
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml"></span>
              De manera especial y como medidas para el adecuado tratamiento de datos personales, EL PRESTADOR DE
              SERVICIOS DE SALUD se obliga a lo siguiente:
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">2.1. </span>
              Instruir a sus colaboradores y demás personas que accedan a los datos personales de los afiliados de
              CAJACOPI EPS SAS sobre su deber de confidencialidad y reserva en relación con cualquier tipo de dato
              personal que deba tratarse para la prestación de los servicios, tales como los datos de identificación,
              ubicación, identidad, gustos o hábitos, patrimoniales, de comportamiento crediticio, entre otros, de
              manera que el espectro de reserva no solo se le otorgue a la historia clínica de los pacientes sino
              también a todo tipo de información personal que se recolecte POR EL PRESTADOR DE SERVICIOS DE SALUD.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">2.2. </span>
              A adoptar las medidas de seguridad de carácter técnico, administrativo e informático, que le permitan
              mantener el carácter de reservada a la información personal a la que se accede, y que impidan cualquier
              tratamiento o uso no autorizado de la información personal, y concretamente frente a la información
              sensible como lo son los datos de salud así como la información especialmente protegida de los menores de
              edad, adoptar estas medidas de seguridad en los niveles más altos que determine la autoridad de control o
              bien las buenas prácticas en materia de seguridad de la información.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">2.3. </span>
              Adoptar los marcos normativos necesarios en materia de seguridad de la información de carácter personal
              qué se exigen por la autoridad de control Superintendencia de Industria y Comercio en el Registro Nacional
              de Bases de datos.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">2.4. </span>
              Como parte del marco normativo de seguridad de la información antes mencionado, EL PRESTADOR DE SERVICIOS
              DE SALUD deberá adoptar un procedimiento para la atención de incidentes de seguridad de la información que
              le permita atender este tipo de incidencias que deben ser resueltas de forma inmediata cuando comprometen
              datos de carácter personal.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">2.5. </span>
              Comunicar a CAJACOPI EPS SAS, en los ocho (8) días calendario siguientes al momento en el que tenga
              conocimiento de manera directa o a través de terceras personas, de cualquier indicio o hecho cierto que
              implique un incidente de seguridad, o una violación a las medidas de seguridad adoptadas para proteger la
              información personal o que impliquen un tratamiento inadecuado de la información personal o un uso no
              autorizado de ella.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">2.6. </span>
              Comunicar a CAJACOPI EPS SAS, una vez le sea notificada, cualquier solicitud de orden de autoridad
              competente que pretenda acceder a los datos personales objeto de este acuerdo.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">2.7. </span>
              Colaborar con CAJACOPI EPS SAS en la gestión de cualquier incidente de seguridad que llegare a comprometer
              los datos personales objeto de este acuerdo; sea que esta la realice directamente CAJACOPI EPS SAS o un
              tercero por ella contratada o una autoridad competente.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">TERCERA. PROHIBICIONES. </span>
              En relación con los datos de los afiliados de CAJACOPI EPS SAS que acceden a los servicios de salud, son
              prohibiciones para EL PRESTADOR DE SERVICIOS DE SALUD las siguientes:
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">3.1. </span>
              Usar los datos personales en provecho propio o de un tercero en forma contraria a lo pactado en este
              acuerdo.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">3.2. </span>
              Permitir el acceso a la información personal a empleados y/o terceros no autorizados, tales como las ligas
              de usuarios, organizaciones no gubernamentales, entidades para la atención de usuarios, entre otros.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">3.4. </span>
              Entregar los datos personales tratados a cualquier autoridad sin haber notificado el requerimiento a
              CAJACOPI EPS SAS, con el fin de que esta pueda analizar de manera previa la competencia de la autoridad
              solicitante y la correlación directa de la orden y el hecho objeto de investigación y/o requerimiento.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">3.5. </span>
              Alterar cualquiera de los atributos de la información personal a la que se accede debido a este contrato,
              como su autenticidad, integridad, confiabilidad y confidencialidad.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">CUARTA. INDEMNIDAD. </span>
              EL PRESTADOR DE SERVICIOS DE SALUD mantendrá indemne a CAJACOPI EPS SAS en caso de que se presente una
              investigación y/o una acción por parte de la autoridad de control en materia de Protección de Datos
              personales, ocasionada en un indebido tratamiento de datos personales por la falta de diligencia, cuidado
              y prudencia por parte de EL PRESTADOR DE SERVICIOS DE SALUD, investigación o acción que pueda generar para
              CAJACOPI EPS SAS cualquier perjuicio en forma directa, o indirecta, como pueden serlo reclamaciones de los
              afiliados al momento de ser atendidos por EL PRESTADOR DE SERVICIOS DE SALUD. Así mismo, será responsable
              de cualquier sanción que pudiera imponerse a CAJACOPI EPS SAS por parte de la Superintendencia de
              Industria y Comercio - SIC, como autoridad en materia de protección de datos personales y que fuera
              imputable a EL PRESTADOR DE SERVICIOS DE SALUD como resultado de la investigación que adelante la
              mencionada autoridad.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">QUINTA. OBLIGACION ESPECIAL DE DEVOLUCIÓN Y/O ELIMINACIÓN DE LOS DATOS E
                INFORMACION PERSONAL. </span>
              De manera especial EL PRESTADOR DE SERVICIOS DE SALUD se obliga, en el momento de la finalización de su
              contrato con CAJACOPI EPS SAS a lo siguiente:
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">5.1. </span>
              A destruir, eliminar y/o devolver los datos e información personales a la cual accedió o trató durante el
              término de la relación contractual vigente entre las partes involucradas, exceptuando aquella que deba
              conservar por su propia obligación como prestador de servicios de salud, a saber, la Historia Clínica de
              los afiliados que se convierten en sus pacientes.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">5.2. </span>
              A remitir en forma segura la información de los pacientes que deben pasar a otra entidad prestadora de
              servicios de salud por indicación de CAJACOPI EPS SAS, una vez culmina el contrato suscrito entre las
              partes.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">5.3. </span>
              En relación con la información que deba eliminar o restituir, se obliga a garantizar que tampoco ha dejado
              copia de ésta de ninguna manera ni bajo ningún tipo de tecnología.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml">5.4. </span>
              A mantener la confidencialidad y reserva de la información personal a la cual accedió durante la vigencia
              del contrato de prestación de servicios suscrito entre las partes, posteriormente a la terminación de este
              y por término indefinido, atendiendo a que de conformidad con la Ley 1581 de 2012 los datos personales,
              por principio, son confidenciales y reservados.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7 ml"></span>
              Las obligaciones previstas anteriormente se dejarán consignadas en el acta de Liquidación del Contrato.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">SEXTA. PACTO ARBITRAL. </span>
              Cualquier diferencia relacionada con este acuerdo de protección de información personal se someterá a la
              decisión de un tribunal de arbitramento que funcionará en la Cámara de Comercio de Barranquilla. El
              tribunal estará integrado por un solo árbitro, designado de común acuerdo, en su defecto lo designará el
              mencionado centro de arbitraje.
            </div>

            <div class="minuta_anexo_parrafo mb">
              <span class="text-bold7 ml"></span>
              En señal de aceptación, entendimiento y conformidad con los términos aquí contenidos, se suscribe con la
              fecha inicial del contrato en la ciudad de Barranquilla, entre las partes intervinientes
            </div>


            <!--  -->
            <!--  -->
            <div class="mb">
              <table class="table_firma" width="100%" style="border: #FFF;">
                <tr class="border_white">
                  <td colspan="1" style="width: 50%;"></td>
                  <td colspan="1" style="width: 50%;"></td>
                </tr>

                <tr>
                  <td colspan="1">
                    <div class="ml_1">
                      CAJACOPI EPS SAS
                    </div>
                    <br><br><br><br>

                    <div class="ml_1">{{DATA.REPRESENTANTE}}</div>
                    <div class="ml_1">CC N°: {{DATA.DOCUMENTO_REPRESENTANTE}} DE BARRANQUILLA</div>

                  </td>
                  <td colspan="1">
                    <div class="ml_1">
                      {{DATA.RAZON_SOCIAL_IPS}}
                    </div>
                    <br><br><br><br>

                    <div class="ml_1">{{DATA.NOM_REPRESENTANTE}}</div>
                    <div class="ml_1">CC N°: {{DATA.COD_REPRESENTANTE}} DE {{DATA.EXPEDICION}}</div>

                  </td>

                </tr>
                <tr>

              </table>
            </div>
            <!--  -->
            <!--  -->

        </td>
      </tr>
    </tbody>
  </table>
  <!-- ANEXOS EPS NUEVA -->

</body>

</html>
