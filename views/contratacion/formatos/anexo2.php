<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Anexo 2</title>
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
              ANEXO N° 2 {{tituloMinuta}}</div>
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
            <div class="minuta_titulo mb">Anexo 2. Glosario de términos</div>

            <p>
              Para efectos de interpretación del presente contrato se tendrá en cuenta el presente Anexo 2 que contiene
              el glosario de términos:
            </p>

            <p>
              <b>
                Entidades Responsables de Pago -ERP.
              </b>
              Son las encargadas de la planeación y gestión de la contratación y el pago a los prestadores de servicios
              .de salud y proveedores de tecnologías en salud, en aras de satisfacer las necesidades de la población a
              su cargo en materia de salud. Se consideran como tales, las entidades promotoras de salud, las entidades
              adaptadas, las administradoras de riesgos laborales en su actividad en salud y las entidades territoriales
              cuando celebren acuerdos de voluntades para las intervenciones individuales o colectivas.
            </p>
            <p>
              <b>
                Mecanismos de ajuste de riesgo frente a las desviaciones de la nota técnica.
              </b>
              Medidas que deben ser pactadas en las modalidades de pago prospectivas, con el objeto de mitigar el
              impacto financiero ocasionado por las desviaciones encontradas durante la ejecución del acuerdo de
              voluntades que afecten las frecuencias de uso, poblaciones y costos finales de atención, frente a lo
              previsto en la nota técnica, de acuerdo con la caracterización poblacional inicialmente conocida por las
              partes.
            </p>
            <p>
              <b>
                Modalidad de pago.
              </b>
              Forma y compromiso pactado en los acuerdos de voluntades que permite definir su unidad de pago, teniendo
              en cuenta los servicios y tecnologías incluidos, sus frecuencias de uso en el caso de los pagos
              prospectivos, la población objeto, los eventos y las condiciones en salud objeto de atención y los demás
              aspectos que las partes pacten.
            </p>
            <p>
              <b>
                Nota técnica.
              </b>
              Es una herramienta de transparencia y eficiencia entre las partes que suscriben el acuerdo de voluntades,
              la cual refleja de manera detallada los servicios y las tecnologías de salud, su frecuencia de uso
              estimada, sus costos individuales y el valor total por el grupo de población o de riesgo, atendiendo al
              término de duración pactado y a las situaciones que puedan presentarse durante su ejecución, soportando de
              esta manera la tarifa final acordada de manera global o por usuario-tiempo, de acuerdo con la modalidad de
              pago.
            </p>
            <p>
              <b>
                Pago prospectivo.
              </b>
              Modalidad de pago en la cual se define por anticipado el valor esperado de la frecuencia de uso de un
              conjunto de servicios y tecnologías en salud y de su costo, y que permite determinar previamente un pago
              por caso, persona o global, que tienen características similares en su proceso de atención.
            </p>
            <p>
              <b>
                Pago retrospectivo.
              </b>
              Modalidad de pago posterior al proceso de atención, en la cual no se conoce con anterioridad el monto
              final a pagar, y está sujeto a la frecuencia de uso de servicios y tecnologías en salud.
            </p>
            <p>
              <b>
                Prestadores de servicios de salud -PSS.
              </b>
              Se consideran como tales las instituciones prestadoras de servicios de salud, los profesionales
              independientes de salud y el transporte especial de pacientes, que estén inscritos en el Registro Especial
              de Prestadores de Servicios de Salud -REPS y cuenten con servicios habilitados. Esto no incluye a las
              entidades con objeto social diferente, teniendo en cuenta que sus servicios no se financian con cargo a
              los recursos del Sistema General de Seguridad Social en Salud -SGSSS.
            </p>
            <p>
              <b>
                Proveedores de tecnologías en salud -PTS.
              </b>
              Se considera toda persona natural o jurídica que realice la disposición, almacenamiento, venta o entrega
              de tecnologías en salud, incluyendo a los operadores logísticos de tecnologías en salud, gestores
              farmacéuticos, organizaciones no gubernamentales, universidades y otras entidades privadas que realicen
              estas actividades.
            </p>
            <p>
              <b>
                Registro Individual de Prestación de Servicios de Salud (RIPS):
              </b>
              es el conjunto de datos que contiene la información relacionada con la prestación o provisión de servicios
              y tecnologías de salud a los usuarios del Sistema de Salud, que se requiere para los procesos de
              dirección, regulación y control, cuya denominación, estructura y características se ha unificado y
              estandarizado para todas las entidades a que hace referencia el artículo 2 de la presente resolución y son
              soporte de la factura de venta de los servicios y tecnologías de salud.
            </p>
            <p>
              <b>
                Validación única:
              </b>
              proceso de revisión de los datos contenidos en los RIPS y su consistencia con las variables comunes de la
              factura electrónica de venta en salud, realizado por el facturador electrónico en salud con el propósito
              de obtener el certificado de aprobación del contenido, la estructura y las relaciones entre los datos de
              los RIPS como soporte de la factura, a través del mecanismo que determine el Ministerio. Este proceso se
              realiza de manera previa al envío de la factura electrónica de venta en salud, los RIPS y demás soportes a
              la entidad responsable de pago o demás pagadores.
            </p>
            <p>
              <b>
                Referencia y contrarreferencia.
              </b>
              Es el conjunto de procesos, procedimientos y actividades técnicas y administrativas que permite prestar
              adecuadamente los servicios de salud a los pacientes, garantizando los principios de la calidad,
              continuidad e integralidad de los servicios en función de la organización de las Redes Integrales de
              Prestadores de Servicios de Salud definidas por la entidad responsable de pago.
            </p>
            <p>
              La referencia es el envío de pacientes o elementos de ayuda diagnóstica de un prestador de servicios de
              salud inicial a otro, para la atención o complementación diagnóstica que dé respuesta a las necesidades de
              salud de estos, de conformidad con el direccionamiento de la entidad responsable de pago.
            </p>
            <p>
              La contrarreferencia es la respuesta que el prestador de servicios de salud receptor de la referencia da a
              la entidad responsable de pago y al prestador de servicios de salud inicial y puede ser la contra remisión
              del paciente con las debidas indicaciones a seguir o la entrega de información sobre la atención prestada
              al paciente en la institución receptora.
            </p>
            <p>
              <b>
                Riesgo primario.
              </b>
              Es la variación en la incidencia o en la severidad no evitable de un evento o condición médica en la
              población asignada, que afecta financieramente a quien asume este riesgo. Este riesgo debe ser incluido en
              la nota técnica, cuando aplique.
            </p>
            <p>
              <b>
                Riesgo técnico.
              </b>
              Es la variación en la utilización de recursos en la atención en salud, en la ocurrencia de complicaciones
              o en la severidad, que se encuentra asociada a factores no previsibles en la atención o no soportados con
              la evidencia científica y que afecta financieramente a quien asume este riesgo. Este riesgo debe ser
              incluido en la nota técnica, cuando aplique.
            </p>
            <p>
              <b>
                Actividad de salud:
              </b>
              conjunto de acciones, operaciones o tareas que especifican un procedimiento o servicio de salud, en las
              cuales, se utilizan recursos físicos, humanos o tecnológicos para abordar o tratar una condición de salud
              o realizar un diagnóstico clínico.
            </p>
            <p>
              <b>
                Aparato ortopédico:
              </b>
              es un dispositivo médico, fabricado específicamente, siguiendo la prescripción escrita de un profesional
              de la salud, para ser utilizado por un paciente afectado por una disfunción o discapacidad del sistema
              neuromuscular o esquelético. Puede ser una ayuda técnica como prótesis u órtesis para reemplazar, mejorar
              o complementar la capacidad fisiológica o física del sistema u órgano afectado.
            </p>
            <p>
              <b>
                Atención ambulatoria:
              </b>
              conjunto de procesos, procedimientos y actividades, a través de los cuales, se materializa la prestación
              de servicios de salud a una persona, sin que su permanencia en la infraestructura donde se realiza la
              atención requiera más de 24 horas continuas. La atención ambulatoria incluye la provisión de servicios y
              tecnologías de salud relacionados con el grupo de servicios de consulta externa, con el grupo de servicios
              de apoyo diagnóstico y complementación terapéutica, y con el servicio de cirugía ambulatoria. De acuerdo
              con el cumplimiento de las condiciones mínimas de habilitación definidas en la norma vigente, se podrán
              prestar a través de las modalidades intramural, extramural y telemedicina, según el tipo de servicio.
            </p>
            <p>
              <b>
                Atención con internación:
              </b>
              conjunto de procesos, procedimientos y actividades, a través de los cuales, se materializa la prestación
              de servicios de salud a una persona, que requiere su permanencia por más de 24 horas continuas en la
              infraestructura donde se realiza la atención. La atención con internación incluye la provisión de
              servicios y tecnologías de salud relacionados con los servicios del grupo de internación y las modalidades
              de prestación de servicios intramural, extramural y telemedicina, definidos en la norma de habilitación
              vigente. Para la utilización de estos servicios debe existir la respectiva remisión u orden del
              profesional tratante.
            </p>
            <p>
              <b>
                Atención de urgencias:
              </b>
              conjunto de procesos, procedimientos y actividades, a través de los cuales, se materializa la prestación
              de servicios de salud, frente a las alteraciones de la integridad física, funcional o psíquica por
              cualquier causa y con diversos grados de severidad, que comprometen la vida o funcionalidad de una persona
              y que requieren de atención inmediata, con el fin de conservar la vida y prevenir consecuencias críticas,
              presentes o futuras.
            </p>
            <p>
              <b>
                Atención domiciliaria:
              </b>
              conjunto de procesos a través de los cuales se materializa la prestación de servicios de salud a una
              persona en su domicilio o residencia, correspondiendo a una modalidad de prestación de servicios de salud
              extramural.
            </p>
            <p>
              <b>
                Atención en salud:
              </b>
              conjunto de procesos, procedimientos y actividades, mediante las cuales, se materializan la provisión de
              prestación de servicios de salud y tecnologías de la salud a una persona, familia, comunidad o población.
            </p>
            <p>
              <b>
                Cirugía plástica estética, cosmética o de embellecimiento:
              </b>
              procedimiento quirúrgico que se realiza con el fin de mejorar o modificar la apariencia o el aspecto del
              paciente, sin efectos funcionales u orgánicos.
            </p>
            <p>
              <b>
                Cirugía plástica reparadora o funcional:
              </b>
              procedimiento quirúrgico que se practica sobre órganos o tejidos con la finalidad de mejorar, restaurar o
              restablecer la función de estos, o para evitar alteraciones orgánicas o funcionales. Incluye
              reconstrucciones, reparación de ciertas estructuras de cobertura y soporte manejo de malformaciones
              congénitas y secuelas de procesos adquiridos por traumatismos y tumoraciones de cualquier parte del
              cuerpo.
            </p>
            <p>
              <b>
                Combinación de dosis fijas (CDF):
              </b>
              medicamento que contiene dos o más principios activos en concentraciones específicas.
            </p>
            <p>
              <b>
                Complicación:
              </b>
              alteración o resultado clínico no deseado, que sobreviene en el curso de una enfermedad o condición
              clínica, agravando la condición clínica del paciente y que puede provenir de los riesgos propios de la
              atención en salud, de la enfermedad misma o de las condiciones particulares del paciente.
            </p>
            <p>
              <b>
                Concentración:
              </b>
              cantidad de principio activo, contenido en una forma farmacéutica, medida en diferentes unidades (mg, g,
              UI, entre otras).
            </p>
            <p>
              <b>
                Consulta médica:
              </b>
              es la valoración y orientación brindada por un médico en ejercicio de su profesión a los problemas
              relacionados con la salud. La valoración es realizada según los principios de la ética médica y las
              disposiciones de práctica clínica vigentes en el país, y comprende anamnesis, toma de signos vitales,
              examen físico, análisis, definición de impresión diagnóstica, plan de tratamiento. La consulta puede ser
              programada o de urgencia, de acuerdo con la temporalidad; general o especializada, según la complejidad;
              intramural o extramural, conforme con el sitio de realización.
            </p>
            <p>
              <b>
                Consulta odontológica:
              </b>
              valoración y orientación brindada por un odontólogo a las situaciones relacionadas con la salud oral.
              Comprende anamnesis, examen clínico, análisis, definición de impresión diagnóstica, plan de tratamiento.
              La consulta puede ser programada o de urgencia, según la temporalidad; general o especializada, de acuerdo
              con la complejidad; intramural o extramural, conforme con el sitio de realización.
            </p>
            <p>
              <b>
                Consulta psicológica:
              </b>
              es una valoración y orientación realizada por un profesional en psicología, que consta de: anamnesis,
              evaluación general del estado emocional, socioafectivo y comportamental, incluyendo en caso de ser
              necesario, la aplicación de test o pruebas psicológicas, así como la definición de un plan de tratamiento.
            </p>
            <p>
              <b>
                Consulta por otro profesional de salud:
              </b>
              valoración y orientación realizada por un profesional de salud (diferente al médico, odontólogo o
              psicólogo), autorizado por las normas de talento humano para ejercer su profesión. Consta de: anamnesis,
              evaluación general del estado de salud, incluyendo en caso de ser necesario, la aplicación de pruebas, así
              como la definición de un plan de manejo. La consulta puede ser programada o de urgencia, de acuerdo con la
              temporalidad; general o especializada, según la complejidad; intramural o extramural, conforme con el
              sitio de realización.
            </p>
            <p>
              <b>
                Cuidados paliativos:
              </b>
              son los cuidados pertinentes para la atención en salud del paciente con una enfermedad terminal, crónica,
              degenerativa e irreversible, donde el control del dolor y otros síntomas, requieren además del apoyo
              médico, social y espiritual, de apoyo psicológico y familiar durante la enfermedad y el duelo. El objetivo
              de los cuidados paliativos es lograr la mejor calidad de vida posible para el paciente y su familia. La
              atención paliativa afirma la vida y considera el morir como un proceso normal.
            </p>
            <p>
              <b>
                Dispensación:
              </b>
              es la entrega de uno o más medicamentos y dispositivos médicos a un paciente y la información sobre su uso
              adecuado, realizada por el Químico Farmacéutico o el Tecnólogo en Regencia de Farmacia. Cuando la
              dirección técnica de la droguería, o del establecimiento autorizado para la comercialización al detal de
              medicamentos, esté a cargo de personas que no ostenten título de Químico Farmacéutico o Tecnólogo en
              Regencia de Farmacia, la información que se debe ofrecer al paciente, versará únicamente sobre los
              siguientes aspectos: condiciones de almacenamiento; forma de reconstitución de medicamentos, cuya
              administración sea la vía oral; medición de la dosis; cuidados que se deben tener en la administración del
              medicamento; y la importancia de la adherencia a la terapia.
            </p>
            <p>
              <b>
                Dispositivo médico para uso humano:
              </b>
              cualquier instrumento, aparato, máquina, software, equipo biomédico u otro artículo similar o relacionado,
              utilizado solo o en combinación, incluyendo sus componentes, partes, accesorios y programas informáticos
              que intervengan en su correcta aplicación, propuesta por el fabricante para su uso en:
            </p>
            <p>
              a) Diagnóstico, prevención, supervisión, tratamiento o alivio de una enfermedad.
            </p>
            <p>
              b) Diagnóstico, prevención, supervisión, tratamiento, alivio o compensación de una lesión o de una
              deficiencia.
            </p>
            <p>
              c) Investigación, sustitución, modificación o soporte de la estructura anatómica o de un proceso
              fisiológico.
            </p>
            <p>
              d) Diagnóstico del embarazo y control de la concepción.
            </p>
            <p>
              e) Cuidado durante el embarazo, el nacimiento o después del mismo, incluyendo el cuidado del recién
              nacido.
            </p>
            <p>
              f) Productos para desinfección o esterilización de dispositivos médicos.
            </p>
            <p>
              <b>
                Enfermedad crónica degenerativa e irreversible de alto impacto en la calidad de vida:
              </b>
              es aquella que es de larga duración, ocasiona grave pérdida de la calidad de vida, demuestra un carácter
              progresivo e irreversible que impide esperar su resolución definitiva o curación y es diagnosticada por un
              profesional en medicina.
            </p>
            <p>
              <b>
                Enfermo en fase terminal:
              </b>
              aquel que tiene una enfermedad o condición patológica grave, que ha sido diagnosticada en forma precisa
              por un médico experto, que demuestra un carácter progresivo e irreversible, con pronóstico fatal, próximo
              o en plazo relativamente breve, que no sea susceptible de un tratamiento curativo y de eficacia
              comprobada, que permita modificar el pronóstico de muerte próxima o para la cual, los recursos
              terapéuticos utilizados con fines curativos han dejado de ser eficaces.
            </p>
            <p>
              <b>
                Establecimiento farmacéutico:
              </b>
              es el establecimiento dedicado a la producción, almacenamiento, distribución, comercialización,
              dispensación, control o aseguramiento de la calidad de los medicamentos, dispositivos médicos o de las
              materias primas necesarias para su elaboración y demás productos autorizados por ley para su
              comercialización en dicho establecimiento.
            </p>
            <p>
              <b>
                Estereoisómero:
              </b>
              es una molécula que puede presentarse en diferentes posiciones espaciales, teniendo la misma fórmula
              química.
            </p>
            <p>
              <b>
                Forma farmacéutica:
              </b>
              preparación farmacéutica que caracteriza a un medicamento terminado para facilitar su administración. Se
              consideran como formas farmacéuticas entre otras: jarabes, tabletas, cápsulas, ungüentos, cremas,
              soluciones inyectables, óvulos, tabletas de liberación controlada y parches transdérmicos.
            </p>
            <p>
              <b>
                Interconsulta:
              </b>
              es la solicitud expedida por el profesional de la salud responsable de la atención de un paciente a otros
              profesionales de la salud, quienes emiten juicios, orientaciones y recomendaciones técnico-científicas
              sobre la conducta a seguir con el paciente.
            </p>
            <p>
              <b>
                Hospitalización parcial:
              </b>
              es el servicio que presta atención a pacientes en internación parcial, diurna, nocturna, fin de semana y
              otras, que no impliquen estancia completa.
            </p>
            <p>
              <b>
                Intervención en salud:
              </b>
              conjunto de procedimientos realizados para un mismo fin, dentro del proceso de atención en salud.
            </p>
            <p>
              <b>
                Margen terapéutico:
              </b>
              intervalo de concentraciones de un fármaco dentro del cual, existe alta probabilidad de conseguir la
              eficacia terapéutica, con mínima toxicidad.
            </p>
            <p>
              <b>
                Material de curación:
              </b>
              dispositivos y medicamentos que se utilizan en el lavado, irrigación, desinfección, antisepsia y
              protección de lesiones, cualquiera que sea el tipo de elementos o insumos empleados.
            </p>
            <p>
              <b>
                Medicamento:
              </b>
              es aquel preparado farmacéutico, obtenido a partir de principios activos, con o sin sustancias auxiliares,
              presentado bajo forma farmacéutica a una concentración dada y que se utiliza para la prevención, alivio,
              diagnóstico, tratamiento, curación, rehabilitación o paliación de la enfermedad. Los envases, rótulos,
              etiquetas y empaques hacen parte integral del medicamento, por cuanto estos garantizan su calidad,
              estabilidad y uso adecuado.
            </p>
            <p>
              <b>
                Medicinas y terapias alternativas:
              </b>
              son aquellas técnicas, prácticas, procedimientos, enfoques o conocimientos que utilizan la estimulación
              del funcionamiento de las leyes naturales para la autorregulación del ser humano, con el objeto de
              promover, prevenir, tratar, rehabilitar la salud y cuidados paliativos de la población, desde un enfoque
              holístico.
            </p>
            <p>
              <b>
                Metabolito activo:
              </b>
              sustancia producida en el organismo por la biotransformación de un principio activo y que tiene
              propiedades farmacológicas. El metabolito activo puede ser sintetizado a escala industrial y
              comercializado de tal forma como medicamento.
            </p>
            <p>
              <b>
                Mezcla racémica:
              </b>
              es un compuesto que tiene igual proporción de cada enantiómero simple, entendido como un tipo particular
              de estereoisómeros, que, dependiendo de la disposición espacial de los átomos, se denominan “S” o “R” y
              según hacia donde rota el plano de la luz polarizada, se denominan “dextro” (d), si es hacia la derecha o
              “levo” (l), si es hacia la izquierda.
            </p>
            <p>
              <b>
                Modalidades para la prestación de servicios de salud:
              </b>
              La modalidad es la forma de prestar un servicio de salud en condiciones particulares. Las modalidades de
              prestación para los servicios de salud son: intramural, extramural y telemedicina.
            </p>
            <p>
              <b>
                Órtesis:
              </b>
              dispositivo médico aplicado de forma externa, usado para modificar la estructura y características
              funcionales del sistema neuromuscular y esquelético.
            </p>
            <p>
              <b>
                Principio activo:
              </b>
              cualquier compuesto o mezcla de compuestos, destinada a proporcionar una actividad farmacológica u otro
              efecto directo en el diagnóstico, tratamiento o prevención de enfermedades; o a actuar sobre la estructura
              o función de un organismo humano por medios farmacológicos. Un medicamento puede contener más de un
              principio activo.
            </p>
            <p>
              <b>
                Procedimiento:
              </b>
              acciones que suelen realizarse de la misma forma, con una serie común de pasos claramente definidos y una
              secuencia lógica de un conjunto de actividades realizadas dentro de un proceso de promoción y fomento de
              la salud, prevención, diagnóstico, tratamiento, rehabilitación o paliación.
            </p>
            <p>
              <b>
                Prótesis
              </b>
              dispositivos médicos que sustituyen total o parcialmente una estructura corporal o una función
              fisiológica.
            </p>
            <p>
              <b>
                Psicoterapia:
              </b>
              de acuerdo con la definición de la OMS, la psicoterapia comprende intervenciones planificadas y
              estructuradas que tienen el objetivo de influir sobre el comportamiento, el humor y patrones emocionales
              de reacción a diversos estímulos, a través, de medios psicológicos, verbales y no verbales. La
              psicoterapia no incluye el uso de ningún medio bioquímico o biológico. Es realizada por psicólogo clínico
              o médico especialista competente; puede ser de carácter individual, de pareja, familiar o grupal, según
              criterio del profesional tratante.
            </p>
            <p>
              <b>
                Subgrupo de referencia:
              </b>
              agrupación de medicamentos basada en características específicas compartidas, tales como la codificación
              internacional ATC a nivel de principio activo, estructura química, efecto farmacológico o terapéutico y
              que tienen la misma indicación. Las agrupaciones son la expresión de financiación con recursos de la UPC y
              en ningún momento pretenden establecer criterios de intercambiabilidad terapéutica.
            </p>
            <p>
              <b>
                Tecnología de salud:
              </b>
              actividades, intervenciones, insumos, medicamentos, dispositivos, servicios y procedimientos usados en la
              prestación de servicios de salud, así como los sistemas organizativos y de soporte con los que se presta
              esta atención en salud.
            </p>
            <p>
              <b>
                Telemedicina:
              </b>
              es la provisión de servicios de salud a distancia, en los componentes de promoción, prevención,
              diagnóstico, tratamiento, rehabilitación y paliación, por profesionales de la salud que utilizan
              tecnologías de la información y la comunicación, que les permiten intercambiar datos con el propósito de
              facilitar el acceso de la población a los servicios que presenten limitaciones de oferta o de acceso a los
              servicios en su área geográfica.
            </p>
            <p>
              <b>
                Atención agrupada:
              </b>
              Son las atenciones en salud que incluyen un conjunto de servicios y tecnologías en relación con un evento,
              una o varias condiciones en salud o población. Aplica para todas las modalidades de pago prospectivas
              incluidas en el Decreto 780 de 2016 y todas aquellas que las partes pacten y cumplan con lo aquí definido.
            </p>
            <p>
              <b>
                Autorización:
              </b>
              Aval emitido por la ERP previo para la prestación o provisión de los servicios y tecnologías de salud
              requeridos por el usuario, dirigida a un PSS o PTS, de acuerdo con lo establecido entre el PSS, PTS y la
              ERP según la normativa vigente.
            </p>
            <p>
              <b>
                a. Autorización principal:
              </b>
              Aval que se emite para soportar la razón principal de la atención dentro del plan de manejo inicial
              establecido por el profesional o el equipo tratante.
            </p>
            <p>
              <b>
                b. Autorización adicional:
              </b>
              Aval que se deriva de la evolución de la condición inicial de salud del paciente y no están incluidas en
              la principal, con el fin de mantener, mejorar o superar su estado actual, de conformidad con los cambios
              en el plan de manejo que se establezcan.
            </p>
            <p>
              <b>
                c. Autorización integral:
              </b>
              Aval que se emite para uno o varios PSS y PTS para la atención de un evento, condición o condiciones en
              salud, o la prestación o provisión de un conjunto de servicios y tecnologías previamente concertados
              dentro de un mismo servicio habilitado o varios servicios habilitados en el mismo grado de complejidad o
              modalidad de prestación.
            </p>
            <p>
              <b>
                Radicación:
              </b>
              Es el momento en el cual el PSS o el PTS entrega formalmente a través de los medios tecnológicos
              definidos, la Factura Electrónica de Venta, el RIPS y demás soportes a la ERP y ésta emite el registro de
              radicación de manera automática y en línea. La vigencia de la radicación tiene lugar a partir del día
              hábil siguiente a su realización, con la cual se da inicio al trámite de devoluciones de que trata el
              artículo 17 de la presente resolución dentro de los términos del artículo 57 de la Ley 1438 de 2011.
            </p>
            <p>
              <b>
                Recibo de pago compartido:
              </b>
              Formalización a través de la expedición de una factura de venta o el tiquete de máquina registradora con
              sistemas P.O.S (Point of Sales) de los copagos, las cuotas moderadoras o de recuperación pagadas por el
              usuario a la ERP o al PSS, o PTS, según corresponda.
            </p>
            <p>
              <b>
                Registro de radicación:
              </b>
              Legalización del recibido de soportes de cobro definidos en el anexo técnico 3 de la presente resolución,
              a través de un consecutivo emitido y comunicado por la ERP a un PSS o PTS en el momento de la recepción de
              dichos soportes. Dicho proceso debe estar automatizado y en línea.
            </p>
            <p>
              <b>
                Servicios o tecnologías electivas:
              </b>
              Son aquellos servicios y tecnologías de salud que se pueden prestar o proveer de manera programada,
              prioritaria o no, dado que la condición de salud que origina la atención no implica un riesgo inminente
              para la vida del paciente, en el futuro inmediato.
            </p>
            <p>
              <b>
                Servicio o tecnología prioritaria:
              </b>
              Son aquellos servicios y tecnologías de salud que se pueden prestar o proveer cuando la condición de salud
              que origina la atención no pone en riesgo la vida del paciente en el futuro inmediato, pero si genera un
              incremento potencial en el nivel de compromiso funcional, anatómico o riesgo de complicaciones o secuelas
              si no hay una atención oportuna.
            </p>



        </td>
      </tr>


    </tbody>
  </table>



  <!-- ANEXOS EPS NUEVA -->
</body>

</html>
