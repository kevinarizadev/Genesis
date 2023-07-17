<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Formato SARLAFT</title>
  <link rel="icon" href="../../../assets/images/icon.ico" />
  <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
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

    .border_white td {
      border-top: 0px solid white !important;
      border-right: 0px solid white !important;
      border-left: 0px solid white !important;
    }

    .table1,
    .table1 tr th,
    .table1 tr td {
      border: .5px solid black;
      border-collapse: collapse;
      font-size: 6px;
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

    .text-bold8 {
      font-weight: 800;
    }

    .text-size8 {
      font-size: 8px !important;
    }

    .text-color1 {
      background-color: #d9e1f2;
    }

    .text-color2 {
      background-color: #002060;
      color: white;
    }

    .vh1 {
      height: 1vh;
    }

    .vh3 {
      height: 3vh;
    }

    .mb {
      margin-bottom: 2vh;
    }


    .border_white_right {
      border-right: 0px solid white !important;
    }

    .border_white_left {
      border-left: 0px solid white !important;
    }

    .border_white_top {
      border-top: 0px solid white !important;
    }

    .border_white_bottom {
      border-bottom: 0px solid white !important;
    }

    .display_none {
      display: none !important;
    }

    .table1 {
      margin-top: -2px;
    }
  </style>
  <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <script src="../../../bower_components/angular/angular.js"></script>
  <script src="../../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../../scripts/controllers/sarlaft/formatos/formatosarlaftController.js"></script>
  <script type="text/javascript" src="../../../assets/js/dom-to-image.min.js"></script>

</head>

<body ng-controller="formatosarlaftController">


  <table class="table1" width="100%" style="border: #FFF;" id="adres_imprimir">
    <tr class="border_white">
      <!-- 39 -->
      <td colspan="1" style="width: 3%"></td>
      <td colspan="1" style="width: 3%"></td>
      <td colspan="1" style="width: 3%"></td>
      <td colspan="1" style="width: 3%"></td>
      <!--  -->
      <td colspan="1" style="width: 13%"></td>
      <td colspan="1" style="width: 8%"></td>
      <td colspan="1" style="width: 8%"></td>
      <!--  -->
      <td colspan="1" style="width: 13%"></td>
      <td colspan="1" style="width: 13%"></td>
      <td colspan="1" style="width: 9%"></td>

      <td colspan="1" style="width: 6%"></td>
      <td colspan="1" style="width: 6%"></td>
      <td colspan="1" style="width: 6%"></td>
      <td colspan="1" style="width: 6%"></td>
    </tr>
    <tr class="text-bold7 text-center">
      <td colspan="4" rowspan="3">
        <img style="width: 8em;" src="../../../assets/images/logo_cajacopieps.png">
      </td>
      <td colspan="8" rowspan="2">FORMATO SARLAFT</td>
      <td colspan="2" rowspan="1" class="text-left">Radicado: {{DATA.num_formulario}}</td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1" class="text-bold7">Versión: 01</td>
    </tr>
    <tr>
      <td colspan="8" rowspan="1"></td>
      <td colspan="2" rowspan="1" class="text-bold7">Fecha: 2022</td>
    </tr>
    <tr class="vh1">
      <td colspan="14">
        <!-- <hr> -->
        <!-- <span class="span-ht1"></span> -->
      </td>
    </tr>
    <!--  -->
    <tr>
      <td colspan="1" rowspan="2" class="text-center text-color1 text-bold7">
        FECHA
      </td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.fecha_radicado.substr(0,2)}}</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.fecha_radicado.substr(3,2)}}</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.fecha_radicado.substr(6,4)}}</td>
      <!--  -->
      <td colspan="1" rowspan="2" class="text-center text-color1 text-bold7">
        NATURALEZA
      </td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.tipo_persona == 'N' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.tipo_persona == 'J' ? 'X' : ''}}</td>
      <!--  -->
      <td colspan="1" rowspan="2" class="text-center text-color1 text-bold7">
        TIPO DE TERCERO
      </td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.tipo_tercero == '1' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.tipo_tercero == '2' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.tipo_tercero == '3' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="2" class="text-center text-color1 text-bold7">
        TIPO DE RELACIONAMIENTO
      </td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">X</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">DIA</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">MES</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">AÑO</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">PERSONA</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">JURIDICA</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">CLIENTE (PROVEEDOR O ASOCIADO)</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">CONTRAPARTE (PSS)</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">TRABAJADORES</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">VINCULACIÓN</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">ACTUALIZACIÓN</td>
    </tr>
    <tr>
      <td colspan="14" class="text-center text-bold7">Diligencie los campos que le corresponda de acuerdo con el tipo de
        tercero seleccionado.</td>
    </tr>
  </table>
  <!--  -->
  <!--  -->
  <!--  -->
  <!-- HOJA VACIA PERSONA NATURAL -->
  <!-- OJO -->
  <table class="table1" width="100%" style="border: #FFF;" ng-if="DATA.tipo_persona == 'J'">
    <tr class="border_white">
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
    </tr>
    <tr>
      <td colspan="17" class="text-center text-color2 text-bold7">DATOS PERSONA NATURAL</td>
    </tr>
    <tr>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">TIPO DE DOCUMENTO (Marque con una X)</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">NUMERO DE DOCUMENTO</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">LUGAR DE EXPEDICIÓN</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">FECHA DE EXPEDICIÓN</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">T.I</td>
      <td colspan="1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">PASAPORTE</td>
      <td colspan="1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">CD.</td>
      <td colspan="1"></td>
      <td colspan="4" rowspan="2"></td>
      <td colspan="4" rowspan="2"></td>
      <td colspan="1"></td>
      <td colspan="1"></td>
      <td colspan="1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">C.C</td>
      <td colspan="1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">C.E</td>
      <td colspan="1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">OTRO ¿CUÁL?</td>
      <td colspan="1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">DIA</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">MES</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">AÑO</td>
    </tr>
    <tr>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">PRIMER APELLIDO</td>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">SEGUNDO APELLIDO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">PRIMER NOMBRE</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">SEGUNDO NOMBRE</td>
    </tr>
    <tr>
      <td colspan="4" rowspan="1" class="vh1"></td>
      <td colspan="6" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
      <td colspan="4" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">DIRECCIÓN DOMICILIO</td>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">TELÉFONO DOMICILIO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">CIUDAD / MUNICIPIO</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">DEPARTAMENTO</td>
    </tr>
    <tr>
      <td colspan="4" rowspan="1" class="vh1"></td>
      <td colspan="6" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
      <td colspan="4" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">CORREO ELECTRONICO</td>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">TELÉFONO CELULAR</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">OTRO TELÉFONO / FIJO / FAX</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">NACIONALIDAD</td>
    </tr>
    <tr>
      <td colspan="4" rowspan="1" class="vh1"></td>
      <td colspan="6" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
      <td colspan="4" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="7" rowspan="1" class="text-center text-color1 text-bold7">LUGAR DE NACIMIENTO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">FECHA DE NACIMIENTO</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SEXO</td>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">ESTADO CIVIL (Marque con una X)</td>
    </tr>
    <tr>
      <td colspan="7" rowspan="2" class="vh1"></td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="2" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SOLTERO</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">UNIÓN LIBRE</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">DIVORCIADO</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">DÍA</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">MES</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">AÑO</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">VIUDO</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">CASADO</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">Otro ¿Cuál?</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="15" rowspan="1" class="text-center text-color1 text-bold7">ACTIVIDAD ECONÓMICA (Marque con una X)
      </td>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">CÓDIGO (*) CIIU</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">ASALARIADO</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">PENSIONADO</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">RENTISTA</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="2" class="text-center text-color1 text-bold7">DETALLE</td>
      <td colspan="8" rowspan="2" class="vh1"></td>
      <td colspan="2" rowspan="2" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SOCIO</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">OTRO</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">¿CUÁL?</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <!-- <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">DETALLE</td> -->
      <!-- <td colspan="8" rowspan="1" class="vh1"></td> -->
    </tr>
    <tr>
      <td colspan="17" rowspan="1" class="text-center text-color1 text-bold7">MARQUE CON UNA (X), SEGÚN CORRESPONDA, POR
        SU PERFIL, CARGO O PROFESIÓN:</td>
      <!-- <td colspan="2" rowspan="1"></td> -->
    </tr>
    <tr>
      <td colspan="6" rowspan="1" class="text-color1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SI</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">NO</td>
      <td colspan="6" rowspan="1" class="text-color1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SI</td>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">NO</td>
    </tr>
    <tr>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">¿Maneja Recursos Públicos?</td>
      <td colspan="1" rowspan="1"></td>
      <td colspan="1" rowspan="1"></td>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">¿Tiene reconocimiento público?</td>
      <td colspan="1" rowspan="1"></td>
      <td colspan="2" rowspan="1"></td>
    </tr>
    <tr>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">¿Ejerce algún grado de poder público?</td>
      <td colspan="1" rowspan="1"></td>
      <td colspan="1" rowspan="1"></td>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">¿Tiene algún vínculo familiar con alguna
        persona que cumpla las condiciones anteriores?</td>
      <td colspan="1" rowspan="1"></td>
      <td colspan="2" rowspan="1"></td>
    </tr>
    <tr>
      <td colspan="17" rowspan="1" class="text-center text-bold7">
        <span class="text-bold8">Personas Expuestas Públicamente (PEP): i)</span>
        las personas expuestas políticamente-conforme al (Decreto 1674 de
        2016)-, ii) los representantes legales de organizaciones internacionales y iii) las personas que gozan de
        reconocimiento público. Seentiende por persona políticamente expuesta (Decreto 1674 / 2016) los individuos que
        desempeñan o han desempeñado funciones públicas destacadas
        como jefes de Estado, políticos de alta jerarquía, funcionarios gubernamentales, judiciales o militares de alta
        jerarquía, altos (directores y gerentes) de empresas sociales, industriales y comerciales del Estado y de
        sociedades de economía mixta, unidades administrativas especiales y funcionarios importantes de partidos
        políticos.
        <span class="text-bold8">Vinculados:</span> las personas que tengan sociedad conyugal, de hecho o de derecho,
        con las personas públicamente
        expuestas, los familiares hasta el segundo grado de consanguinidad, segundo de afinidad y primero civil de las
        personas públicamente expuestas.
      </td>
    </tr>

  </table>
  <!--  -->
  <!--  -->
  <!--  -->
  <!-- HOJA VACIA PERSONA JURIDICA -->
  <table class="table1" width="100%" style="border: #FFF;" ng-if="DATA.tipo_persona == 'N'">
    <tr class="border_white">
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
    </tr>
    <tr>
      <td colspan="17" class="text-center text-color2 text-bold7">DATOS PERSONA JURIDICA</td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">RAZÓN SOCIAL:</td>
      <td colspan="5" rowspan="1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">NIT:</td>
      <td colspan="2" rowspan="1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">CORREO ELECTRONICO:</td>
      <td colspan="6" rowspan="1"></td>
    </tr>
    <tr>
      <td colspan="2" rowspan="7" class="text-center text-color1 text-bold7">INFORMACIÓN REPRESENTANTE LEGAL</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">PRIMER APELLIDO</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">SEGUNDO APELLIDO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">PRIMER NOMBRE</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">SEGUNDO NOMBRE</td>
    </tr>
    <tr>
      <td colspan="4" rowspan="1" class="vh1"></td>
      <td colspan="4" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
      <td colspan="4" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">TIPO DE DOCUMENTO (Marque con una X)</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">NUMERO DE DOOCUMENTO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">LUGAR DE EXPEDICIÓN</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">FECHA DE EXPEDICIÓN</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">T.I</td>
      <td colspan="1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">PASAPORTE</td>
      <td colspan="1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">CD.</td>
      <td colspan="1"></td>
      <td colspan="3" rowspan="2"></td>
      <td colspan="3" rowspan="2"></td>
      <td colspan="1"></td>
      <td colspan="1"></td>
      <td colspan="1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">C.C</td>
      <td colspan="1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">C.E</td>
      <td colspan="1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">OTRO ¿CUÁL?</td>
      <td colspan="1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">DIA</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">MES</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">AÑO</td>
    </tr>
    <tr>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">DIRECCIÓN DOMICILIO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">TELÉFONO DOMICILIO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">CIUDAD / MUNICIPIO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">DEPARTAMENTO</td>
    </tr>
    <tr>
      <td colspan="6" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="7" rowspan="1" class="text-center text-color1 text-bold7">TIPO DE EMPRESA (Marque con una X)</td>
      <td colspan="10" rowspan="1" class="text-center text-color1 text-bold7">TIPO DE SOCIEDAD (Marque con una X)</td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">PRIVADA</td>
      <td colspan="2" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">PÚBLICA</td>
      <td colspan="2" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">ANÓNIMA</td>
      <td colspan="2" rowspan="1" class="vh1"></td>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">SOCIEDAD</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">S.A.S</td>
      <td colspan="2" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">MIXTA</td>
      <td colspan="2" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SECTOR SOLIDARIO</td>
      <td colspan="2" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">LIMITADA</td>
      <td colspan="2" rowspan="1" class="vh1"></td>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">SOC. COMANDITA X ACCIONES</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">SOC. COMANDITA SIMPLE</td>
      <td colspan="2" rowspan="1" class="vh1"></td>
    </tr>

    <tr>
      <td colspan="2" rowspan="2" class="text-center text-color1 text-bold7">ACTIVIDAD ECONÓMICA (Marque con una X)</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">INDUSTRIAL</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">TRANSPORTE</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SALUD</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SERV. FINANCIEROS</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">COMERCIAL</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">CONSTRUCCIÓN</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">EDUCACIÓN</td>
      <td colspan="2" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">OTRO ¿CUÁL?</td>
      <td colspan="1" rowspan="1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">DETALLE</td>
      <td colspan="13" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="7" rowspan="1" class="text-center text-color1 text-bold7">DIRECCIÓN EMPRESA OFICINA PRINCIPAL</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">TELEFONO / FAX</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">CIUDAD / MUNICIPIO</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">DEPARTAMENTO</td>
    </tr>
    <tr>
      <td colspan="7" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
      <td colspan="4" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="7" rowspan="1" class="text-center text-color1 text-bold7">DIRECCIÓN SUCURSAL</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">TELEFONO / FAX</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">CIUDAD / MUNICIPIO</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">DEPARTAMENTO</td>
    </tr>
    <tr>
      <td colspan="7" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
      <td colspan="4" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="10" rowspan="1" class="text-center text-color1 text-bold7">PERSONA DE CONTACTO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">TELÉFONO CELULAR</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">TELÉFONO FIJO</td>
    </tr>
    <tr>
      <td colspan="10" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
      <td colspan="4" rowspan="1" class="vh1"></td>
    </tr>

    <tr>
      <td colspan="17" rowspan="1" class="text-center text-color1 text-bold7">IDENTIFICACIÓN DE LOS ACCIONISTAS O
        ASOCIADOS QUE TENGAN DIRECTA O INDIRECTAMENTE MÁS DEL 10% DEL CAPITAL, APORTE O PARTICIPACIÓN (EN CASO DE
        REQUERIRSE MÁS ESPACIO DEBE ANEXARSE LA RELACIÓN)</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">No.</td>
      <td colspan="5" rowspan="1" class="text-center text-color1 text-bold7">DOCUMENTO DE IDENTIDAD / NIT</td>
      <td colspan="8" rowspan="1" class="text-center text-color1 text-bold7">RAZÓN SOCIAL O NOMBRE COMPLETO (APELLIDOS Y
        NOMBRES)</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">% DE PARTICIPACIÓN</td>
    </tr>
    <tr ng-repeat="x in DATA.accionistas">
      <td colspan="1" rowspan="1" class="text-center">{{$index + 1}}</td>
      <td colspan="5" rowspan="1" class="text-center">{{x.IDENTIFICACION}}</td>
      <td colspan="8" rowspan="1" class="text-center">{{x.NOMBRE}}</td>
      <td colspan="3" rowspan="1" class="text-center">{{x.PORCENTAJE}} %</td>
    </tr>
    <tr ng-show="DATA.accionistas.length == 0">
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="5" rowspan="1" class="vh1"></td>
      <td colspan="8" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
    </tr>
    <!-- <tr>
      <td colspan="1" rowspan="1" class="text-center">1.</td>
      <td colspan="5" rowspan="1" class="vh1"></td>
      <td colspan="8" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center">2.</td>
      <td colspan="5" rowspan="1" class="vh1"></td>
      <td colspan="8" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center">3.</td>
      <td colspan="5" rowspan="1" class="vh1"></td>
      <td colspan="8" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center">4.</td>
      <td colspan="5" rowspan="1" class="vh1"></td>
      <td colspan="8" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
    </tr> -->
    <!-- <tr>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">RAZÓN</td>
      <td colspan="5" rowspan="1"></td>
    </tr>
    </tr> -->
  </table>
  <!--  -->
  <!--  -->
  <!--  -->
  <!-- DATOS PERSONA NATURAL -->
  <table class="table1" width="100%" style="border: #FFF;" ng-if="DATA.tipo_persona == 'N'">
    <!-- <table class="table1" width="100%" style="border: #FFF;" ng-if="DATA.tipo_persona == 'N'"> -->
    <tr class="border_white">
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
    </tr>
    <tr>
      <td colspan="17" class="text-center text-color2 text-bold7">DATOS PERSONA NATURAL</td>
    </tr>
    <tr>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">TIPO DE DOCUMENTO (Marque con una X)</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">NUMERO DE DOCUMENTO</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">LUGAR DE EXPEDICIÓN</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">FECHA DE EXPEDICIÓN</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">T.I</td>
      <td colspan="1" class="text-center text-bold7">{{DATA.tipo_identificacion.substr(0,2) == 'TI' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">PASAPORTE</td>
      <td colspan="1" class="text-center text-bold7">{{DATA.tipo_identificacion.substr(0,2) == 'PA' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">CD.</td>
      <td colspan="1" class="text-center text-bold7">{{DATA.tipo_identificacion.substr(0,2) == 'CD' ? 'X' : ''}}</td>
      <td colspan="4" rowspan="2" class="text-center">{{DATA.num_identificacion}}</td>
      <td colspan="4" rowspan="2" class="text-center">{{DATA.lugar_expedicion}}</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.fecha_expedicion.substr(0,2)}}</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.fecha_expedicion.substr(3,2)}}</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.fecha_expedicion.substr(6,4)}}</td>
      <!-- <td colspan="1"></td>
      <td colspan="1"></td>
      <td colspan="1"></td> -->
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">C.C</td>
      <td colspan="1" class="text-center text-bold7">{{DATA.tipo_identificacion.substr(0,2) == 'CC' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">C.E</td>
      <td colspan="1" class="text-center text-bold7">{{DATA.tipo_identificacion.substr(0,2) == 'CE' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">OTRO ¿CUÁL?</td>
      <td colspan="1" class="text-center text-bold7">{{otroTipoDoc(DATA.tipo_identificacion.substr(0,2))}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">DIA</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">MES</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">AÑO</td>
    </tr>
    <tr>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">PRIMER APELLIDO</td>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">SEGUNDO APELLIDO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">PRIMER NOMBRE</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">SEGUNDO NOMBRE</td>
    </tr>
    <tr>
      <td colspan="4" rowspan="1" class="text-center">{{DATA.primer_apellido}}</td>
      <td colspan="6" rowspan="1" class="text-center">{{DATA.segundo_apellido}}</td>
      <td colspan="3" rowspan="1" class="text-center">{{DATA.primer_nombre}}</td>
      <td colspan="4" rowspan="1" class="text-center">{{DATA.segundo_nombre}}</td>
    </tr>
    <tr>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">DIRECCIÓN DOMICILIO</td>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">TELÉFONO DOMICILIO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">CIUDAD / MUNICIPIO</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">DEPARTAMENTO</td>
    </tr>
    <tr>
      <td colspan="4" rowspan="1" class="text-center">{{DATA.direccion}}</td>
      <td colspan="6" rowspan="1" class="text-center">{{DATA.telefono}}</td>
      <td colspan="3" rowspan="1" class="text-center">{{DATA.ciudad}}</td>
      <td colspan="4" rowspan="1" class="text-center">{{DATA.departamento}}</td>
    </tr>
    <tr>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">CORREO ELECTRONICO</td>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">TELÉFONO CELULAR</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">OTRO TELÉFONO / FIJO / FAX</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">NACIONALIDAD</td>
    </tr>
    <tr>
      <td colspan="4" rowspan="1" class="text-center">{{DATA.correo}}</td>
      <td colspan="6" rowspan="1" class="text-center">{{DATA.celular}}</td>
      <td colspan="3" rowspan="1" class="text-center">{{DATA.telefono2}}</td>
      <td colspan="4" rowspan="1" class="text-center">{{DATA.nacionalidad}}</td>
    </tr>
    <tr>
      <td colspan="7" rowspan="1" class="text-center text-color1 text-bold7">LUGAR DE NACIMIENTO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">FECHA DE NACIMIENTO</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SEXO</td>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">ESTADO CIVIL (Marque con una X)</td>
    </tr>
    <tr>
      <td colspan="7" rowspan="2" class="text-center">{{DATA.lugar_nacimiento}}</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.fecha_nacimiento.substr(0,2)}}</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.fecha_nacimiento.substr(3,2)}}</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.fecha_nacimiento.substr(6,4)}}</td>
      <td colspan="1" rowspan="2" class="text-center">{{DATA.sexo}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SOLTERO</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.estado_civil == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">UNIÓN LIBRE</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.estado_civil == 'U' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">DIVORCIADO</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.estado_civil == 'D' ? 'X' : ''}}</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">DÍA</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">MES</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">AÑO</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">VIUDO</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.estado_civil == 'V' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">CASADO</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.estado_civil == 'C' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">Otro ¿Cuál?</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.estado_civil == 'O' ? 'X' : ''}}</td>
    </tr>
    <tr>
      <td colspan="15" rowspan="1" class="text-center text-color1 text-bold7">ACTIVIDAD ECONÓMICA (Marque con una X)
      </td>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">CÓDIGO (*) CIIU</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">ASALARIADO</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.actividad_economica == '10' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">PENSIONADO</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.actividad_economica == '20' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">RENTISTA</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.actividad_economica == '90' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="2" class="text-center text-color1 text-bold7">DETALLE</td>
      <td colspan="8" rowspan="2" class="text-center">{{DATA.detalle_actividad_economica}}</td>
      <td colspan="2" rowspan="2" class="text-center">{{DATA.codigo_ciiu}}</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SOCIO</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.actividad_economica == '909' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">OTRO</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.actividad_economica == 'O' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">¿CUÁL?</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7"></td>
      <!-- <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">DETALLE</td> -->
      <!-- <td colspan="8" rowspan="1" class="vh1"></td> -->
    </tr>
    <tr>
      <td colspan="17" rowspan="1" class="text-center text-color1 text-bold7">MARQUE CON UNA (X), SEGÚN CORRESPONDA, POR
        SU PERFIL, CARGO O PROFESIÓN:</td>
      <!-- <td colspan="2" rowspan="1"></td> -->
    </tr>
    <tr>
      <td colspan="6" rowspan="1" class="text-color1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SI</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">NO</td>
      <td colspan="6" rowspan="1" class="text-color1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SI</td>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">NO</td>
    </tr>
    <tr>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">¿Maneja Recursos Públicos?</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.g_rcrsos_pblcos == 'S' ? 'X' : '' }}</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.g_rcrsos_pblcos == 'N' ? 'X' : '' }}</td>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">¿Tiene reconocimiento público?</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.rcncmnto_pblco == 'S' ? 'X' : '' }}</td>
      <td colspan="2" rowspan="1" class="text-center text-bold7">{{DATA.rcncmnto_pblco == 'N' ? 'X' : '' }}</td>
    </tr>
    <tr>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">¿Ejerce algún grado de poder público?</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.grdo_pblico == 'S' ? 'X' : '' }}</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.grdo_pblico == 'N' ? 'X' : '' }}</td>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">¿Tiene algún vínculo familiar con alguna
        persona que cumpla las condiciones anteriores?</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.vnculo_fmliar == 'S' ? 'X' : '' }}</td>
      <td colspan="2" rowspan="1" class="text-center text-bold7">{{DATA.vnculo_fmliar == 'N' ? 'X' : '' }}</td>
    </tr>
    <tr>
      <td colspan="17" rowspan="1" class="text-center text-bold7">
        <span class="text-bold8">Personas Expuestas Públicamente (PEP): i)</span>
        las personas expuestas políticamente-conforme al (Decreto 1674 de
        2016)-, ii) los representantes legales de organizaciones internacionales y iii) las personas que gozan de
        reconocimiento público. Seentiende por persona políticamente expuesta (Decreto 1674 / 2016) los individuos que
        desempeñan o han desempeñado funciones públicas destacadas
        como jefes de Estado, políticos de alta jerarquía, funcionarios gubernamentales, judiciales o militares de alta
        jerarquía, altos (directores y gerentes) de empresas sociales, industriales y comerciales del Estado y de
        sociedades de economía mixta, unidades administrativas especiales y funcionarios importantes de partidos
        políticos.
        <span class="text-bold8">Vinculados:</span> las personas que tengan sociedad conyugal, de hecho o de derecho,
        con las personas públicamente
        expuestas, los familiares hasta el segundo grado de consanguinidad, segundo de afinidad y primero civil de las
        personas públicamente expuestas.
      </td>
    </tr>
  </table>
  <!--  -->
  <!--  -->
  <!--  -->
  <!-- DATOS PERSONA JURIDICA -->
  <table class="table1" width="100%" style="border: #FFF;" ng-if="DATA.tipo_persona == 'J'">
    <tr class="border_white">
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
    </tr>
    <tr>
      <td colspan="17" class="text-center text-color2 text-bold7">DATOS PERSONA JURIDICA</td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">RAZÓN SOCIAL:</td>
      <td colspan="5" rowspan="1">{{DATA.razon_social}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">NIT:</td>
      <td colspan="2" rowspan="1">{{DATA.nit}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">CORREO ELECTRONICO:</td>
      <td colspan="6" rowspan="1">{{DATA.correo}}</td>
    </tr>
    <tr>
      <td colspan="2" rowspan="7" class="text-center text-color1 text-bold7">INFORMACIÓN REPRESENTANTE LEGAL</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">PRIMER APELLIDO</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">SEGUNDO APELLIDO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">PRIMER NOMBRE</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">SEGUNDO NOMBRE</td>
    </tr>
    <tr>
      <td colspan="4" rowspan="1" class="text-center">{{DATA.primer_apellido}}</td>
      <td colspan="4" rowspan="1" class="text-center">{{DATA.segundo_apellido}}</td>
      <td colspan="3" rowspan="1" class="text-center">{{DATA.primer_nombre}}</td>
      <td colspan="4" rowspan="1" class="text-center">{{DATA.segundo_nombre}}</td>
    </tr>
    <tr>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">TIPO DE DOCUMENTO (Marque con una X)</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">NUMERO DE DOOCUMENTO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">LUGAR DE EXPEDICIÓN</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">FECHA DE EXPEDICIÓN</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">T.I</td>
      <td colspan="1" class="text-center text-bold7">{{DATA.tipo_identificacion.substr(0,2) == 'TI' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">PASAPORTE</td>
      <td colspan="1" class="text-center text-bold7">{{DATA.tipo_identificacion.substr(0,2) == 'PA' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">CD.</td>
      <td colspan="1" class="text-center text-bold7">{{DATA.tipo_identificacion.substr(0,2) == 'CD' ? 'X' : ''}}</td>
      <td colspan="3" rowspan="2" class="text-center">{{DATA.lugar_expedicion}}</td>
      <td colspan="3" rowspan="2" class="text-center">{{DATA.fecha_expedicion}}</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.fecha_expedicion.substr(0,2)}}</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.fecha_expedicion.substr(3,2)}}</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.fecha_expedicion.substr(6,4)}}</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">C.C</td>
      <td colspan="1" class="text-center text-bold7">{{DATA.tipo_identificacion.substr(0,2) == 'CC' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">C.E</td>
      <td colspan="1" class="text-center text-bold7">{{DATA.tipo_identificacion.substr(0,2) == 'CE' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">OTRO ¿CUÁL?</td>
      <td colspan="1" class="text-center text-bold7">
        {{otroTipoDoc(DATA.tipo_identificacion.substr(0,2))}}
      </td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">DIA</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">MES</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">AÑO</td>
    </tr>
    <tr>
      <td colspan="6" rowspan="1" class="text-center text-color1 text-bold7">DIRECCIÓN DOMICILIO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">TELÉFONO DOMICILIO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">CIUDAD / MUNICIPIO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">DEPARTAMENTO</td>
    </tr>
    <tr>
      <td colspan="6" rowspan="1" class="text-center">{{DATA.direccion}}</td>
      <td colspan="3" rowspan="1" class="text-center">{{DATA.telefono}}</td>
      <td colspan="3" rowspan="1" class="text-center">{{DATA.ciudad}}</td>
      <td colspan="3" rowspan="1" class="text-center">{{DATA.departamento}}</td>
    </tr>
    <tr>
      <td colspan="7" rowspan="1" class="text-center text-color1 text-bold7">TIPO DE EMPRESA (Marque con una X)</td>
      <td colspan="10" rowspan="1" class="text-center text-color1 text-bold7">TIPO DE SOCIEDAD (Marque con una X)</td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">PRIVADA</td>
      <td colspan="2" rowspan="1" class="text-center text-bold7">{{DATA.tipo_empresa == '1' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">PÚBLICA</td>
      <td colspan="2" rowspan="1" class="text-center text-bold7">{{DATA.tipo_empresa == '3' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">ANÓNIMA</td>
      <td colspan="2" rowspan="1" class="text-center text-bold7">{{DATA.tipo_sociedad == '1' ? 'X' : ''}}</td>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">SOCIEDAD</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.tipo_sociedad == '3' ? 'X' : ''}}</td>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">S.A.S</td>
      <td colspan="2" rowspan="1" class="text-center text-bold7">{{DATA.tipo_sociedad == '5' ? 'X' : ''}}</td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">MIXTA</td>
      <td colspan="2" rowspan="1" class="text-center text-bold7">{{DATA.tipo_empresa == '2' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SECTOR SOLIDARIO</td>
      <td colspan="2" rowspan="1" class="text-center text-bold7">{{DATA.tipo_empresa == '4' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">LIMITADA</td>
      <td colspan="2" rowspan="1" class="text-center text-bold7">{{DATA.tipo_sociedad == '2' ? 'X' : ''}}</td>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">SOC. COMANDITA X ACCIONES</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.tipo_sociedad == '4' ? 'X' : ''}}</td>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">SOC. COMANDITA SIMPLE</td>
      <td colspan="2" rowspan="1" class="text-center text-bold7">{{DATA.tipo_sociedad == '6' ? 'X' : ''}}</td>
    </tr>

    <tr>
      <td colspan="2" rowspan="2" class="text-center text-color1 text-bold7">ACTIVIDAD ECONÓMICA (Marque con una X)</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">INDUSTRIAL</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.xxxxxxx == '1' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">TRANSPORTE</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.xxxxxxx == '3' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SALUD</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.xxxxxxx == '5' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SERV. FINANCIEROS</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.xxxxxxx == '7' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">COMERCIAL</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.xxxxxxx == '2' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">CONSTRUCCIÓN</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.xxxxxxx == '4' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">EDUCACIÓN</td>
      <td colspan="2" rowspan="1" class="text-center text-bold7">{{DATA.xxxxxxx == '6' ? 'X' : ''}}</td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">OTRO ¿CUÁL?</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.actividad_economica == '9' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">DETALLE</td>
      <td colspan="13" rowspan="1" class="">{{DATA.detalle_actividad_economica}}</td>
    </tr>
    <tr>
      <td colspan="7" rowspan="1" class="text-center text-color1 text-bold7">DIRECCIÓN EMPRESA OFICINA PRINCIPAL</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">TELEFONO / FAX</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">CIUDAD / MUNICIPIO</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">DEPARTAMENTO</td>
    </tr>
    <tr>
      <td colspan="7" rowspan="1" class="text-center">{{DATA.dir_empresa_principal}}</td>
      <td colspan="3" rowspan="1" class="text-center">{{DATA.telefono_principal}}</td>
      <td colspan="3" rowspan="1" class="text-center">{{DATA.ciudad_principal}}</td>
      <td colspan="4" rowspan="1" class="text-center">{{DATA.depto_principal}}</td>
    </tr>
    <tr>
      <td colspan="7" rowspan="1" class="text-center text-color1 text-bold7">DIRECCIÓN SUCURSAL</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">TELEFONO / FAX</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">CIUDAD / MUNICIPIO</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">DEPARTAMENTO</image.pngtd>
    </tr>
    <tr>
      <td colspan="7" rowspan="1" class="text-center">{{DATA.dir_sucursal}}</td>
      <td colspan="3" rowspan="1" class="text-center">{{DATA.tel_sucursal}}</td>
      <td colspan="3" rowspan="1" class="text-center">{{DATA.ciudad_sucursal}}</td>
      <td colspan="4" rowspan="1" class="text-center">{{DATA.dpto_sucursal}}</td>
    </tr>
    <tr>
      <td colspan="10" rowspan="1" class="text-center text-color1 text-bold7">PERSONA DE CONTACTO</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">TELÉFONO CELULAR</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">TELÉFONO FIJO</td>
    </tr>
    <tr>
      <td colspan="10" rowspan="1" class="text-center">{{DATA.contacto}}</td>
      <td colspan="3" rowspan="1" class="text-center">{{DATA.celular_contacto}}</td>
      <td colspan="4" rowspan="1" class="text-center">{{DATA.telefono_contacto}}</td>
    </tr>

    <tr>
      <td colspan="17" rowspan="1" class="text-center text-color1 text-bold7">IDENTIFICACIÓN DE LOS ACCIONISTAS O
        ASOCIADOS QUE TENGAN DIRECTA O INDIRECTAMENTE MÁS DEL 10% DEL CAPITAL, APORTE O PARTICIPACIÓN (EN CASO DE
        REQUERIRSE MÁS ESPACIO DEBE ANEXARSE LA RELACIÓN)</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">No.</td>
      <td colspan="5" rowspan="1" class="text-center text-color1 text-bold7">DOCUMENTO DE IDENTIDAD / NIT</td>
      <td colspan="8" rowspan="1" class="text-center text-color1 text-bold7">RAZÓN SOCIAL O NOMBRE COMPLETO (APELLIDOS Y
        NOMBRES)</td>
      <td colspan="3" rowspan="1" class="text-center text-color1 text-bold7">% DE PARTICIPACIÓN</td>
    </tr>
    <tr ng-repeat="x in DATA.accionistas">
      <td colspan="1" rowspan="1" class="text-center">{{$index + 1}}</td>
      <td colspan="5" rowspan="1" class="text-center">{{x.IDENTIFICACION}}</td>
      <td colspan="8" rowspan="1" class="text-center">{{x.NOMBRE}}</td>
      <td colspan="3" rowspan="1" class="text-center">{{x.PORCENTAJE}} %</td>
    </tr>
    <tr ng-show="DATA.accionistas.length == 0">
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="5" rowspan="1" class="vh1"></td>
      <td colspan="8" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
    </tr>
    <!-- <tr>
      <td colspan="1" rowspan="1" class="text-center">1.</td>
      <td colspan="5" rowspan="1" class="vh1"></td>
      <td colspan="8" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center">2.</td>
      <td colspan="5" rowspan="1" class="vh1"></td>
      <td colspan="8" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center">3.</td>
      <td colspan="5" rowspan="1" class="vh1"></td>
      <td colspan="8" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center">4.</td>
      <td colspan="5" rowspan="1" class="vh1"></td>
      <td colspan="8" rowspan="1" class="vh1"></td>
      <td colspan="3" rowspan="1" class="vh1"></td>
    </tr> -->
    <!-- <tr>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">RAZÓN</td>
      <td colspan="5" rowspan="1"></td>
    </tr>
    </tr> -->
  </table>
  <!--  -->
  <!--  -->
  <!--  -->
  <!-- INFORMACIÓN ADICIONAL -->
  <table class="table1" width="100%" style="border: #FFF;">
    <tr class="border_white">
      <td colspan="1" style="width: 16.6%"></td>
      <td colspan="1" style="width: 6.6%"></td>
      <td colspan="1" style="width: 26.6%"></td>
      <td colspan="1" style="width: 16.6%"></td>
      <td colspan="1" style="width: 6.6%"></td>
      <td colspan="1" style="width: 26.6%"></td>
    </tr>
    <tr>
      <td colspan="6" class="text-center text-color2 text-bold7">INFORMACIÓN ADICIONAL (Diligenciar de acuerdo a los
        soportes financiero)</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-color1 text-bold7">INGRESOS / VENTAS MENSUALES</td>
      <td colspan="2" rowspan="1" class="">$ {{formatPeso2(DATA.ingresos)}}</td>
      <td colspan="2" rowspan="1" class="text-color1 text-bold7">OTROS INGRESOS MENSUALES (ORIGINADOS EN ACTIVIDADES
        DIFERENTES A LA PRINCIPAL)</td>
      <td colspan="2" rowspan="1" class="">$ {{formatPeso2(DATA.otros_ingresos)}}</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-color1 text-bold7">TOTAL INGRESOS MENSUALES</td>
      <td colspan="2" rowspan="1" class="">$ {{formatPeso2(DATA.total_ingresos)}}</td>
      <td colspan="1" rowspan="1" class="text-color1 text-bold7">TOTAL EGRESOS MENSUALES</td>
      <td colspan="2" rowspan="1" class="">$ {{formatPeso2(DATA.total_egresos)}}</td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1" class="text-color1 text-bold7">DETALLE DE OTROS INGRESOS MENSUALES</td>
      <td colspan="4" rowspan="1" class="">{{DATA.otros_ingresos_detalle}}</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-color1 text-bold7">TOTAL ACTIVO</td>
      <td colspan="2" rowspan="1" class="">$ {{formatPeso2(DATA.total_activo)}}</td>
      <td colspan="1" rowspan="1" class="text-color1 text-bold7">TOTAL PASIVO</td>
      <td colspan="2" rowspan="1" class="">$ {{formatPeso2(DATA.total_pasivo)}}</td>
    </tr>
  </table>
  <!--  -->
  <!--  -->
  <!--  -->
  <!-- CARACTERÍSTICAS TRIBUTARIAS -->
  <table class="table1" width="100%" style="border: #FFF;">
    <tr class="border_white">
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 2.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 8.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 8.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 8.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 5.8%"></td>
      <td colspan="1" style="width: 2.8%"></td>
      <td colspan="1" style="width: 2.8%"></td>
    </tr>
    <tr>
      <td colspan="17" class="text-center text-color2 text-bold7">CARACTERÍSTICAS TRIBUTARIAS</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="3" class="text-center text-color1 text-bold7">REGIMEN</td>
      <td colspan="1" rowspan="2" class="text-center text-bold7">{{DATA.regimen == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="2" class="text-center text-bold7">{{DATA.regimen == 'C' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="3" class="text-center text-color1 text-bold7">GRAN CONTRIBUYENTE</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SI</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.regimen_g == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="3" class="text-center text-color1 text-bold7">AUTORRETENEDOR</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SI</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.autoretenedor == 'S' ? 'X' : ''}}</td>
      <td colspan="4" rowspan="1" class="text-center text-color1 text-bold7">RESPONSABLE RENTA</td>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">ICA COD. ACTIVIDAD</td>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">RETEICA</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">NO</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.regimen_g == 'N' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">NO</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.autoretenedor == 'N' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SI</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.responsable_renta == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">¿POR QUÉ?</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.por_que}}</td>
      <td colspan="2" rowspan="1" class="text-center">{{DATA.tarifa_ciiu}}</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.reteica == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.reteica == 'N' ? 'X' : ''}}</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SIMPLIFICADO</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">COMÚN</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">RESOLUCIÓN N°</td>
      <td colspan="1" rowspan="1" class="">{{DATA.resol_regimen}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">RESOLUCIÓN N°</td>
      <td colspan="1" rowspan="1" class="">{{DATA.resol_auto}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">NO</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.responsable_renta == 'N' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">RESOLUCIÓN N°</td>
      <td colspan="1" rowspan="1" class="">{{DATA.resol_renta}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">TARIFA ICA</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.tarifa_ciiu}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SI</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">NO</td>
    </tr>
    <tr>
      <td colspan="13" rowspan="2" class="text-right text-color2 text-bold7">INDIQUE EL TIPO DE TERCERO:</td>
      <td colspan="2" rowspan="1" class="text-left text-color2 text-bold7">PRESTADOR DE SALUD</td>
      <td colspan="2" rowspan="1" class="text-center text-bold7">{{DATA.prestador_salud == 'P' ? 'X' : ''}}</td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1" class="text-left text-color2 text-bold7">OTRO TIPO DE TERCERO</td>
      <td colspan="2" rowspan="1" class="text-center text-bold7">{{DATA.prestador_salud == 'O' ? 'X' : ''}}</td>
    </tr>
  </table>
  <!--  -->
  <!--  -->
  <!--  -->
  <!-- DATOS PRESTADOR DE SALUD -->
  <table class="table1" width="100%" style="border: #FFF;">
    <tr class="border_white">
      <td colspan="1" style="width: 12%"></td>
      <td colspan="1" style="width: 6%"></td>
      <td colspan="1" style="width: 6%"></td>
      <td colspan="1" style="width: 6%"></td>
      <td colspan="1" style="width: 6%"></td>
      <td colspan="1" style="width: 6%"></td>
      <td colspan="1" style="width: 6%"></td>
      <td colspan="1" style="width: 6%"></td>
      <td colspan="1" style="width: 9%"></td>
      <td colspan="1" style="width: 6%"></td>
      <td colspan="1" style="width: 27%"></td>
    </tr>
    <tr>
      <td colspan="11" class="text-center text-color2 text-bold7">DATOS PRESTADOR DE SALUD</td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">CÓDIGO DE HABILITACIÓN SUPERSALUD*</td>
      <td colspan="8" rowspan="1" class="text-center text-bold7">{{DATA.cod_habilitacion}}</td>
      <td colspan="1" rowspan="1" class="text-left text-color1 text-bold7">(12 DÍGITOS DE ACUERDO AL REGISTRO ESPECIAL
        DE PRESTADORES)</td>
    </tr>
    <tr>
      <td colspan="11" class="text-center text-color1 text-bold7">Por favor Seleccione el Tipo de Prestador de Salud:
      </td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">PROFESIONAL INDEPENDIENTE</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.prestador == 'P' ? 'X' : ''}}</td>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">Indique Campo y/o Especialidad:</td>
      <td colspan="7" rowspan="1" class="">{{DATA.prestador_independiente}}</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">INSTITUCIONES - IPS</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.prestador == 'I' ? 'X' : ''}}</td>
      <td colspan="6" rowspan="2" class=""></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">TRANSPORTE ESPECIAL DE PACIENTES</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.prestador == 'T' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class=""></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">EMPRESA SOCIAL DEL ESTADO</td>
      <td colspan="1" rowspan="1" class="">{{DATA.prestador == 'E' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">OTRO, ¿CUÁL?</td>
      <td colspan="2" rowspan="1" class="">{{DATA.otro_prestador}}</td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">En caso que aplique, por favor diligencie
        el nivel de complejidad:</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">BAJA</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.nivel_complejidad == '1' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">MEDIANA</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.nivel_complejidad == '2' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">ALTA</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.nivel_complejidad == '3' ? 'X' : ''}}</td>
      <td colspan="3" rowspan="1" class=""></td>
    </tr>
  </table>
  <!--  -->
  <!--  -->
  <!--  -->
  <!-- DATOS OTROS TERCEROS -->
  <table class="table1" width="100%" style="border: #FFF;">
    <tr class="border_white">
      <td colspan="1" style="width: 14.3%"></td>
      <td colspan="1" style="width: 5.3%"></td>
      <td colspan="1" style="width: 8.3%"></td>
      <td colspan="1" style="width: 8.3%"></td>
      <td colspan="1" style="width: 5.3%"></td>
      <td colspan="1" style="width: 8.3%"></td>
      <td colspan="1" style="width: 7.3%"></td>
      <td colspan="1" style="width: 8.3%"></td>
      <td colspan="1" style="width: 14.3%"></td>
      <td colspan="1" style="width: 5.3%"></td>
      <td colspan="1" style="width: 8.3%"></td>
      <td colspan="1" style="width: 8.3%"></td>
    </tr>
    <tr>
      <td colspan="12" class="text-center text-color2 text-bold7">DATOS OTROS TERCEROS</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">ARRENDAMIENTO</td>
      <td colspan="1" rowspan="1" class=""></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">indique cuál:</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">CASA</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.arrendamiento == 'C' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">LOCAL COMERCIAL</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.arrendamiento == 'L' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">OTRO, ¿CUÁL?</td>
      <td colspan="4" rowspan="1" class="">{{DATA.arrenda_cual}}</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SUMINISTRO DE PAPELERÍA Y ELEMENTOS DE
        OFICINA</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.papeleria == 'S' ? 'X' : ''}}</td>
      <td colspan="6" rowspan="4" class=""></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SUMINISTRO DE ELEMENTOS DE ASEO Y CAFETERÍA
      </td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.suministros_aseo == 'S' ? 'X' : ''}}</td>
      <td colspan="2" rowspan="3" class=""></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SUMINISTRO DE MEDICAMENTOS</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.suministros_med == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SUMINISTRO DE MATERIALES MÉDICOQUIRÚRGICOS
      </td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.suministros_quiru == 'S' ? 'X' : ''}}</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">MANTENIMIENTO DE INSTALACIONES FÍSICAS</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.mto_instalaciones == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">MANTENIMIENTO DE EQUIPOS ELECTRÓNICOS Y/O
        CÓMPUTO</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.mto_electro == 'S' ? 'X' : ''}}</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">MANTENIMIENTO DE SOFTWARE
        Y/O REDES</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.mto_software == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">ASESORÍAS,</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.asesoria == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">indique cuál:</td>
      <td colspan="1" rowspan="1" class="">{{DATA.asesoria_cual}}</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">OUTSOURCING</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.outsoursing == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">indique cuál:</td>
      <td colspan="5" rowspan="1" class="">{{DATA.outsoursing == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">OTRO</td>
      <td colspan="1" rowspan="1" class="">{{DATA.otro_ter == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">indique cuál:</td>
      <td colspan="1" rowspan="1" class="">{{DATA.otro_cual_ter}}</td>
    </tr>
  </table>
  <!--  -->
  <!--  -->
  <!--  -->
  <!-- DATOS CUENTA BANCARIA PARA TRANSFERENCIA ACH -->
  <table class="table1" width="100%" style="border: #FFF;">
    <tr class="border_white">
      <td colspan="1" style="width: 8.1%"></td>
      <td colspan="1" style="width: 8.1%"></td>
      <td colspan="1" style="width: 8.1%"></td>
      <td colspan="1" style="width: 8.1%"></td>
      <td colspan="1" style="width: 23.1%"></td>
      <td colspan="1" style="width: 11.1%"></td>
      <td colspan="1" style="width: 15.1%"></td>
      <td colspan="1" style="width: 5.1%"></td>
      <td colspan="1" style="width: 13.1%"></td>
    </tr>
    <tr>
      <td colspan="9" class="text-center text-color2 text-bold7">DATOS CUENTA BANCARIA PARA TRANSFERENCIA ACH</td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">ENTIDAD BANCARIA</td>
      <td colspan="3" rowspan="1" class="text-center">{{DATA.cod_entidad}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SUCURSAL</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.cod_sucursal}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">CIUDAD</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.ciudad_banco}}</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="2" class="text-center text-color1 text-bold7">TIPO CUENTA</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">AHORRO</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.tipo_cuenta == 'A' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="2" class="text-center text-color1 text-bold7">CUENTA No:</td>
      <td colspan="1" rowspan="2" class="">{{DATA.num_cuenta}}</td>
      <td colspan="1" rowspan="2" class="text-center text-color1 text-bold7">NOMBRE DE LA CUENTA</td>
      <td colspan="3" rowspan="2" class="">{{DATA.nombre}}</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">CORRIENTE</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.tipo_cuenta == 'C' ? 'X' : ''}}</td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">CORREO ELECTRÓNICO</td>
      <td colspan="7" rowspan="1" class="">{{DATA.correo_b}}</td>
    </tr>
  </table>
  <!--  -->
  <!--  -->
  <!--  -->
  <!-- ACTIVIDAD EN OPERACIÓN INTERNACIONAL -->
  <table class="table1" width="100%" style="border: #FFF;">
    <tr class="border_white">
      <td colspan="1" style="width: 8.3%"></td>
      <td colspan="1" style="width: 6.3%"></td>
      <td colspan="1" style="width: 8.3%"></td>
      <td colspan="1" style="width: 6.3%"></td>
      <td colspan="1" style="width: 8.3%"></td>
      <td colspan="1" style="width: 6.3%"></td>
      <td colspan="1" style="width: 8.3%"></td>
      <td colspan="1" style="width: 14.3%"></td>
      <td colspan="1" style="width: 8.3%"></td>
      <td colspan="1" style="width: 8.3%"></td>
      <td colspan="1" style="width: 8.3%"></td>
      <td colspan="1" style="width: 8.3%"></td>
    </tr>
    <tr>
      <td colspan="12" class="text-center text-color2 text-bold7">ACTIVIDAD EN OPERACIÓN INTERNACIONAL</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="2" class="text-center text-color1 text-bold7">¿REALIZA TRANSACCIONES EN MONEDA
        EXTRANJERA?</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SI</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.transacion == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">IMPORTACIONES</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.importaciones == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">INVERSIONES</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.inversiones == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">ENVÍO O RECEPCIÓN DE GIROS</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.giros == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">PAGO DE SERVICIOS</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.pago == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="2" class="text-center text-bold7">{{DATA.xxxxxxx == 'S' ? 'X' : ''}}</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">NO</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.transacion == 'N' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">EXPORTACIONES</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.exportaciones == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">TRANSFERENCIA</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.transferencia == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">PRÉSTAMOS EN MON. EXTRA</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.prestamo == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">OTRO</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.otro == 'S' ? 'X' : ''}}</td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">DETALLE:</td>
      <td colspan="11" rowspan="1" class="">{{DATA.otro_cual_i}}</td>
    </tr>
  </table>
  <!--  -->
  <!--  -->
  <!--  -->
  <!-- REFERENCIAS COMERCIALES -->
  <table class="table1" width="100%" style="border: #FFF;">
    <tr class="border_white">
      <td colspan="1" style="width: 36.3%"></td>
      <td colspan="1" style="width: 36.3%"></td>
      <td colspan="1" style="width: 27.3%"></td>
    </tr>
    <tr>
      <td colspan="3" class="text-center text-color2 text-bold7">REFERENCIAS COMERCIALES</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">ESTABLECIMIENTO</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">DIRECCIÓN</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">TELÉFONO(S)</td>
    </tr>
    <tr ng-show="DATA.tipo_persona == 'J'" ng-repeat="x in DATA.referencias_comercial">
      <td colspan="1" rowspan="1" class="text-center">{{x.nombres}}</td>
      <td colspan="1" rowspan="1" class="text-center">{{x.direccion_r}}</td>
      <td colspan="1" rowspan="1" class="text-center">{{x.telefono_r}}</td>
      <!-- <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="vh1"></td> -->
    </tr>
    <tr ng-show="DATA.tipo_persona == 'N'">
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="3" class="text-center text-color2 text-bold7">REFERENCIAS PERSONALES</td>
    </tr>
    <tr ng-repeat-start="x in DATA.referencias_personal">
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">APELLIDOS Y NOMBRES</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">DIRECCIÓN</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">TELÉFONO(S)</td>
    </tr>
    <tr ng-repeat-end>
      <td colspan="1" rowspan="1" class="text-center">{{x.nombres}}</td>
      <td colspan="1" rowspan="1" class="text-center">{{x.direccion_r}}</td>
      <td colspan="1" rowspan="1" class="text-center">{{x.telefono_r}}</td>
    </tr>
    <!-- <tr>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="vh1"></td>
    </tr> -->
    <!-- <tr>
      <td colspan="3" class="text-center text-color2 text-bold7">REFERENCIAS PERSONALES</td>
    </tr> -->
    <!-- <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">APELLIDOS Y NOMBRES</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">DIRECCIÓN</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">TELÉFONO(S)</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="vh1"></td>
    </tr> -->
    <tr>
      <td colspan="3" class="text-center">Se requiere el diligenciamiento total del presente formato, en los casos que
        no cuente con la información solicitada colocar N/A. Este formato se realiza únicamente para que se efectúe el
        conocimiento como tercero, su aprobación y/o aceptación está sujeta al cumplimiento de las políticas
        establecidas por Cajacopi EPS. Por lo tanto, el presente formato no compromete a Cajacopi EPS a aceptar lo
        relacionado en el mismo.</td>
    </tr>
  </table>
  <!--  -->
  <!--  -->
  <!--  -->
  <!-- DECLARACIÓN DE ORIGEN DE FONDOS -->
  <table class="table1" width="100%" style="border: #FFF;">
    <tr class="border_white">
      <td colspan="1" style="width: 10%"></td>
      <td colspan="1" style="width: 5%"></td>
      <td colspan="1" style="width: 5%"></td>
      <td colspan="1" style="width: 80%"></td>
    </tr>
    <tr>
      <td colspan="4" class="text-center text-color2 text-bold7">DECLARACIÓN DE ORIGEN DE FONDOS</td>
    </tr>
    <tr>
      <td colspan="4" class="text-left">ORIGEN DE FONDOS Y/O BIENES: Obrando en nombre propio o en representación de
        {{DATA.origen_fondo}}, de manera voluntaria y afirmando que todo lo aquí
        consignado es cierto, realizo las siguientes declaraciones de origen de los fondos y/o bienes:
      </td>
    </tr>
    <tr>
      <td colspan="4" class="text-left">1. La actividad, profesión u oficio que desarrollo es lícito, se ejerce dentro
        del marco legal, el origen de los fondos y/o bienes que entrego y/o transfiero a Cajacopi eps, proceden del giro
        ordinario de actividades licitas</td>
    </tr>
    <tr>
      <td colspan="4" class="text-left">2. No admitiré que terceros efectúen depósitos en mi cuenta con fondos
        provenientes de actividades ilícitas contempladas en el Código Penal Colombiano o en cualquier otra norma que lo
        adicione; ni efectuaré transacciones destinadas a favorecer tales actividades o a favor de personas relacionadas
        con las mismas</td>
    </tr>
    <tr>
      <td colspan="4" class="text-left">3. No me encuentro en ninguna lista de personas reportadas o bloqueadas por
        actividades de narcotráfico, lavado de activos, subversión, terrorismo, tráfico de armas o delitos asociados al
        turismo sexual con menores de edad. Que a la fecha y según nuestro leal saber y entender, en mi contra no se
        adelanta ninguna investigación por ninguno de los hechos
        anteriores.</td>
    </tr>
    <tr>
      <td colspan="4" class="text-left">4. Autorizo a terminar unilateralmente cualquier relación comercial celebrada
        con CAJACOPI EPS, en el caso de infracción de cualquiera de los numerales contenidos en este formato, eximiendo
        a CAJACOPI EPS de toda responsabilidad que
        se derive por información errónea, falsa e inexacta que hubiere proporcionado en este formato.</td>
    </tr>
    <tr>
      <td colspan="4" class="text-left">5. Los recursos que se deriven de la vinculación como tercero con CAJACOPI EPS
        no serán utilizadas a la financiación del terrorismo, grupos terroristas y/o actividades terroristas</td>
    </tr>
    <tr>
      <td colspan="4" class="text-left">6. Los recursos que poseo provienen de las siguientes fuentes (detalle de la
        ocupación, oficio, profesión, actividad,
        etc.): {{DATA.recursos_fuente}}
      </td>
    </tr>
    <tr>
      <td colspan="4" class="text-left">7. La información suministrada en este formulario es veraz y verificable y me
        obligo a actualizarla anualmente o cuando existan modificaciones</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="2" class="text-center text-color1 text-bold7">ACEPTO</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.fondo == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.fondo == 'N' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="vh3"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SI</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">NO</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">FIRMA (Persona Natural y Representante
        Legal en caso de la Persona Jurídica)</td>
    </tr>
  </table>
  <!--  -->
  <!--  -->
  <!--  -->
  <!-- AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES -->
  <table class="table1" width="100%" style="border: #FFF;">
    <tr class="border_white">
      <td colspan="1" style="width: 40%"></td>
      <td colspan="1" style="width: 5%"></td>
      <td colspan="1" style="width: 5%"></td>
      <td colspan="1" style="width: 50%"></td>
    </tr>
    <tr>
      <td colspan="4" class="text-center text-color2 text-bold7">AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES
      </td>
    </tr>
    <tr>
      <td colspan="4" rowspan="1" class="">La EPS CAJACOPI le informa que los datos personales por usted suministrados
        en el presente formato, se requieren con la finalidad principal de conocer a nuestros clientes y obtener
        información veraz en relación con las condiciones necesarias para establecer un relacionamiento comercial. En
        ejecución de esta finalidad, la entidad podrá acceder a bases de datos relacionadas con lavado de activos,
        financiación del terrorismo, antecedentes judiciales y otras bases de datos de listas restrictivas y/o
        vinculantes, de carácter nacional o internacional, con vocación pública, con el fin de cumplir con las normas
        que nos exigen gestionar riesgos alrededor de este tipo de actividades. Estos tratamientos podrán realizarse de
        forma directa por la EPS CAJACOPI o bien a través de terceros proveedores en calidad de encargados; en cualquier
        caso bajo la confidencialidad, reserva y adecuado tratamiento de los datos que le corresponde hacer a esta
        entidad. Puede consultar nuestra política de privacidad en www.cajacopieps.com así como dirigir una comunicación
        al correo habeasdata@cajacopieps.com para conocer, actualizar y/o rectificar su información, en tanto ello sea
        posible.
      </td>
    </tr>
    <tr>
      <td colspan="1" rowspan="2" class="text-center text-color1 text-bold7">AUTORIZO EL TRATAMIENTO DE MIS DATOS
        PERSONALES:</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.datos_personales == 'S' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">{{DATA.datos_personales == 'N' ? 'X' : ''}}</td>
      <td colspan="1" rowspan="2" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SI</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">NO</td>
    </tr>
  </table>
  <!--  -->
  <!--  -->
  <!--  -->
  <!-- FIRMA Y HUELLA -->
  <table class="table1" width="100%" style="border: #FFF;">
    <tr class="border_white">
      <td colspan="1" style="width: 25%"></td>
      <td colspan="1" style="width: 40.6%"></td>
      <td colspan="1" style="width: 16.6%"></td>
      <td colspan="1" style="width: 8.6%"></td>
      <td colspan="1" style="width: 4.6%"></td>
      <td colspan="1" style="width: 4.6%"></td>
    </tr>
    <tr>
      <td colspan="6" class="text-center text-color2 text-bold7">FIRMA Y HUELLA</td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1" class="border_white_right border_white_bottom" style="vertical-align: top;">
        <div>
          <span>
            <b>NOTA:</b> Como constancia de haber leído, entendido y aceptado lo anterior, declaro que la información
            que he suministrado es exacta en todas sus partes, firmo el presente documento a los
            {{DATA.fecha_radicado.substr(0,2)}} días del mes de {{DATA.fecha_radicado.substr(3,2)}} del año
            {{DATA.fecha_radicado.substr(6,4)}} en la ciudad
            de {{DATA.ciudad}}, {{DATA.departamento}}
          </span>
        </div>
      </td>
      <td colspan="4" rowspan="2" class="border_white_left">
        <div style="border: 1px solid black; width: 90px; height: 70px; text-align: right; float: right;margin: 3px;">
          <div style="border: 0.1px solid black;
          width: 70px; height: 6px; vertical-align: bottom; margin: auto;
          position: relative; top: 61px; padding: 0px;">
            <span style="font-size: 3px; margin: 2px; text-align: left; display: grid;">HUELLA INDICE</span>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="border_white_right border_white_top" style="vertical-align: bottom">
        <div style="display: grid;">
          <span style="font-size: 10px;">
            {{DATA.representante}}
          </span>
          <span>
            _______________________________________________________________
          </span>
          <span style="margin-top: 1px;">
            NOMBRE SOLICITANTE (Escriba el nombre del representante legal)
          </span>
        </div>
      </td>
      <td colspan="1" rowspan="1" class="border_white_right border_white_top border_white_left"
        style="vertical-align: bottom">
        <div style="display: grid;text-align: center;">
          <span>
            _______________________________________________________________
          </span>
          <span style="margin-top: 1px;">
            FIRMA Y D.I.
          </span>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">NOMBRE COMPLETO DE QUIEN DILIGENCIA EL
        FORMULARIO:</td>
      <td colspan="5" rowspan="1" class="text-center">{{DATA.diligencia}}</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="2" class="text-center text-color1 text-bold7">TIPO Y NÚMERO DEL DOCUMENTO DE IDENTIDAD:
      </td>
      <td colspan="1" rowspan="2" class="text-center">{{DATA.tipo_id_diligencia}} - {{DATA.id_diligencia}}</td>
      <td colspan="1" rowspan="2" class="text-center text-color1 text-bold7">FECHA DE DILIGENCIAMIENTO:</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.fecha_radicado.substr(0,2)}}</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.fecha_radicado.substr(3,2)}}</td>
      <td colspan="1" rowspan="1" class="text-center">{{DATA.fecha_radicado.substr(6,4)}}</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">DÍA</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">MES</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">AÑO</td>
    </tr>
  </table>
  <!--  -->
  <!--  -->
  <!--  -->
  <table class="table1" width="100%" style="border: #FFF;">
    <tr class="border_white">
      <td colspan="1" style="width: 9%"></td>
      <td colspan="1" style="width: 6%"></td>
      <td colspan="1" style="width: 6%"></td>
      <td colspan="1" style="width: 6%"></td>
      <td colspan="1" style="width: 6%"></td>
      <td colspan="1" style="width: 12%"></td>
      <td colspan="1" style="width: 9%"></td>
      <td colspan="1" style="width: 6%"></td>
      <td colspan="1" style="width: 9%"></td>
      <td colspan="1" style="width: 6%"></td>
      <td colspan="1" style="width: 24%"></td>
    </tr>
    <tr>
      <td colspan="11" class="text-center text-color2 text-bold7">ESTE ESPACIO ES DE USO EXCLUSIVO DE CAJACOPI EPS</td>
    </tr>
    <tr>
      <td colspan="6" class="text-center text-color2 text-bold7">PROCESO CRÍTICO</td>
      <td colspan="5" class="text-center text-color2 text-bold7">EQUIPO DE CUMPLIMIENTO</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">Nombre Completo del Trabajador de Cajacopi
        EPS que realiza el análisis</td>
      <td colspan="5" rowspan="1" class="vh1"></td>
      <!-- <td colspan="5" rowspan="1" class="vh1"></td> -->
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">Nombre Completo del Trabajador de Cajacopi
        EPS que realiza la validación</td>
      <td colspan="3" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">Tipo y Número de Documento de
        Identificación
      </td>
      <td colspan="5" rowspan="1" class="vh1"></td>
      <!-- <td colspan="5" rowspan="1" class="vh1"></td> -->
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">Tipo y Número de Documento de
        Identificación</td>
      <td colspan="3" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">Cargo</td>
      <td colspan="5" rowspan="1" class="vh1"></td>
      <!-- <td colspan="5" rowspan="1" class="vh1"></td> -->
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">Cargo</td>
      <td colspan="3" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">Teléfono de Contacto</td>
      <td colspan="5" rowspan="1" class="vh1"></td>
      <!-- <td colspan="5" rowspan="1" class="vh1"></td> -->
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">Teléfono de Contacto</td>
      <td colspan="3" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">Resultado de la Validación</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">Completa</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">Incompleta</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <!-- <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">Admitido</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">NO Admitido</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="vh1"></td> -->
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">Observación (Describir las Personas
        Expuestas Pública/ Políticamente - PEP´S) entre otros</td>
      <td colspan="3" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">PEP´s</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">SI</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">NO</td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="1" rowspan="1" class="vh1"></td>
      <td colspan="2" rowspan="1" class="text-center text-color1 text-bold7">Firma Exclusiva del Trabajador</td>
      <td colspan="3" rowspan="1" class="vh1"></td>
      <!-- <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">NO Admitido</td> -->
      <!-- <td colspan="2" rowspan="1" class="vh1"></td> -->
      <!-- <td colspan="1" rowspan="1" class="vh1"></td> -->
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">Observación
      </td>
      <td colspan="5" rowspan="1" class="vh1"></td>
      <td colspan="5" rowspan="1" class="vh1"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">Firma Exclusiva del Trabajador</td>
      <td colspan="5" rowspan="1" class="vh1"></td>
      <td colspan="5" rowspan="1" class="vh1"></td>
    </tr>
  </table>
  <!--  -->
  <!--  -->
  <!--  -->
  <table class="table1" width="100%" style="border: #FFF;">
    <tr class="border_white">
      <td colspan="1" style="width: 50%"></td>
      <td colspan="1" style="width: 15%"></td>
      <td colspan="1" style="width: 15%"></td>
      <td colspan="1" style="width: 20%"></td>
    </tr>
    <tr>
      <td colspan="4" class="text-center text-color2 text-bold7">DOCUMENTOS REQUERIDOS SEGÚN NATURALEZA DEL TERCERO</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">Documento</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">Persona Jurídica</td>
      <td colspan="1" rowspan="1" class="text-center text-color1 text-bold7">Persona Natural</td>
      <td colspan="1" rowspan="10" class=""></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-bold7">Cámara de Comercio Original - con fecha de expedición no superior a
        treinta
        (30) días, Acta de Posesión y/o documento que haga las veces según la naturaleza del tercero.</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">X</td>
      <td colspan="1" rowspan="1" class=""></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-bold7">Fotocopia de los documento de identificación</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">X (Representante Legal)</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">X</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-bold7">RUT (Registro Único Tributario) actualizado</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">X</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">X</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-bold7">Certificación Bancaría con fecha de expedición no superior a
        treinta días
        (30) días.</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">X</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">X</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-bold7">Estados Financieros Actualizados</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">X</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">Si Aplica</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-bold7">Anexo de Socios de la Compañía y/o composición Accionaria Donde
        Detalle Tipo,
        Identificación De Cada Uno.</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">X</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7"></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-bold7">Formato de SARLAFT</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">X</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">X</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-bold7">Certificado de Tradición y Libertad del Inmueble con fecha de
        expedición no
        superior a treinta (30) días (Proveedores Administrativos)</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">Si Aplica</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">Si Aplica</td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1" class="text-bold7">Documentos y/o Información Adicional: En el evento que dentro del
        proceso de
        legalización del contrato se requiera por CAJACOPI EPS.</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">X</td>
      <td colspan="1" rowspan="1" class="text-center text-bold7">X</td>
    </tr>
    <tr>
      <td colspan="4" class="text-center text-bold7">
        <div style="display: grid;color: red;">
          <span class="text-bold7">AVISO</span>
          <span>La información consignada en el presente formato se presume veraz, por lo que cualquier impresión,
            alteración o falsedad es responsabilidad exclusiva de quien diligencia el formato. De igual manera,
            cualquier modificación o cambio relativo a la información consignada en el presente documento, deberá ser
            comunicado por escrito a CAJACOPI EPS para su debida actualización.
          </span>
        </div>
      </td>
    </tr>
  </table>
  <!--  -->
  <!--  -->
  <!--  -->
</body>

</html>
