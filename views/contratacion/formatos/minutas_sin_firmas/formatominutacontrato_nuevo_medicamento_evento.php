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
      /* -webkit-print-color-adjust: exact !important; */
      /* color-adjust: exact !important; */
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

    #table_anexos,
    #table_anexos tr th,
    #table_anexos tr td {
      border: 1px solid black;
      border-collapse: collapse;
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

    #firma2 {
      margin-top: 4em;
      margin-left: 3em;
      width: 100%;
      font-size: 11px;
      display: flex;
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

    .div_firmas {
      width: 97%;
      position: absolute;
      bottom: 0;

    }

    .mt_1 {
      /* margin-top: 18vh; */
      /* position: relative; */
      /* bottom: 0; */
      position: relative;
      display: block;
      float: left;
    }

    .div_firmas_2 {
      margin-top: 10vh;
      /* position: fixed; */
      /* position: absolute; */
      /* width: 97%; */

      /* bottom: 0; */
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

    .red-text {
      color: red;
    }
  </style>
  <script src="../../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <script src="../../../../bower_components/angular/angular.js"></script>
  <script src="../../../../bower_components/jquery/dist/jquery.js"></script>
  <script
    src="../../../../scripts/controllers/contratacion/formatos/formatominutacontrato_nuevoformatoController.js"></script>
</head>

<body ng-controller="formatominutacontrato_nuevoformatoController">
  <table class="report-container">
    <thead class="report-header">
      <tr>
        <th class="report-header-cell">
          <div class="header-info">
            <img style="width: 8em;" src="../../../../assets/images/logo_cajacopieps.png" alt="cajacopi">
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
          <table id="table1" width="100%" style="border: #FFF;">
            <tr class="border_white">
              <td colspan="1" style="width: 20%"></td>
              <td colspan="1" style="width: 13%"></td>
              <td colspan="1" style="width: 13%"></td>
              <td colspan="1" style="width: 20%"></td>
              <td colspan="1" style="width: 5%"></td>
              <td colspan="1" style="width: 28%"></td>
            </tr>

            <tr>
              <td colspan="6" class="text-center text-bold7 back-gray">
                CONTRATO DE PRESTACIÓN DE SERVICIOS DE SALUD N.°:{{DATA.NUMERO_CONTRATO}}
              </td>
            </tr>
            <tr>
              <td colspan="1" class="text-center text-bold5">
                REGIMEN DE AFILIACIÓN:
              </td>
              <td colspan="5" class="text-center text-bold5">
                <div style="display: inline-flex;">
                  <div style="margin: 0px 3vw;">
                    <label for="regimen_1">Subsidiado:</label>
                    <input type="checkbox" id="regimen_1" name="regimen_1" ng-checked="DATA.SUBSIDIADO != ''"
                      onclick="return false;">
                  </div>
                  <!-- <div style="margin: 0px 3vw;">
                    <label for="regimen_2">Contributivo:</label>
                    <input type="checkbox" id="regimen_2" name="regimen_2" ng-checked="DATA.CONTRIBUTIVO != ''"
                      onclick="return false;">
                  </div> -->
                  <div style="margin: 0px 3vw;">
                    <label for="regimen_3">Contributivo Movilidad:</label>
                    <input type="checkbox" id="regimen_3" name="regimen_3" ng-checked="DATA.MOVILIDAD != ''"
                      onclick="return false;">
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="text-center text-bold5">
                LUGAR DE PRESTACIÓN DE SERVICIO:
              </td>
              <td colspan="2" class="text-left text-bold5">
                DPTO: {{DATA.DPTO}}
              </td>
              <td colspan="2" class="text-left text-bold5">
                MPIO: {{DATA.MUN}}
              </td>
            </tr>
            <tr>
              <td colspan="6" class="text-center text-bold7 back-gray">
                ERP:
              </td>
            </tr>
            <tr>
              <td colspan="1" class="text-center">
                RAZON SOCIAL:
              </td>
              <td colspan="5" class="text-center text-size8">{{DATA.RAZON_SOCIAL}}</td>
            </tr>
            <tr>
              <td colspan="1" class="text-center">
                NIT:
              </td>
              <td colspan="2" class="text-center text-size8">{{DATA.EPS}}</td>
              <td colspan="2" class="text-right">CIUDAD DOMICILIO:</td>
              <td colspan="1" class="text-center text-size8">{{DATA.CIUDAD_DOMICILIO}}</td>
            </tr>
            <tr>
              <td colspan="1" class="text-center">
                DIRECCIÓN:
              </td>
              <td colspan="5" class="text-center text-size8">{{DATA.DIRECCION}}</td>
            </tr>
            <tr>
              <td colspan="1" class="text-center">
                REPRESENTANTE LEGAL:
              </td>
              <td colspan="5" class="text-center text-size8">{{DATA.REPRESENTANTE}}</td>
            </tr>
            <tr>
              <td colspan="1" class="text-center">
                N° IDENTIFICACIÓN:
              </td>
              <td colspan="5" class="text-center text-size8">{{DATA.DOCUMENTO_REPRESENTANTE}}</td>
            </tr>
            <tr>
              <td colspan="1" class="text-center">
                CORREO ELECTRONICO:
              </td>
              <td colspan="5" class="text-center text-size8">{{DATA.CORREO_ELECTRONICO}}</td>
            </tr>
            <tr>
              <td colspan="1" class="text-center">
                SUPERVISOR DEL CONTRATO:
              </td>
              <td colspan="5" class="text-center text-size8">{{DATA.SUPERVISOR_CONTRATO}}</td>
            </tr>
            <tr>
              <td colspan="6" class="text-center text-bold7 back-gray">
                PSS:
              </td>
            </tr>
            <tr>
              <td colspan="1" class="text-center">
                RAZON SOCIAL:
              </td>
              <td colspan="5" class="text-center text-size8">{{DATA.RAZON_SOCIAL_IPS}}</td>
            </tr>


            <tr ng-show="DATA.union_temporal != null">
              <td colspan="1" rowspan="{{DATA.union_temporal.length + 1}}" ng-show="DATA.union_temporal != null"
                class="text-center">
                CONFORMACION UNION TEMPORAL:
              </td>
              <!-- <td colspan="5" class="text-center text-size8">{{DATA.union_temporal.length}}</td> -->
            </tr>
            <tr ng-repeat="x in DATA.union_temporal" ng-show="DATA.union_temporal != null">
              <td colspan="2" class="text-center text-size8">{{x.nit}}</td>
              <td colspan="3" class="text-center text-size8">{{x.razon_social}}</td>
            </tr>

            <tr>
              <td colspan="1" class="text-center">
                NIT:
              </td>
              <td colspan="2" class="text-center text-size8">{{DATA.NIT}}</td>
              <td colspan="2" class="text-right">CIUDAD DOMICILIO:</td>
              <td colspan="1" class="text-center text-size8">{{DATA.DOMICILIO_IPS}}</td>
            </tr>
            <tr>
              <td colspan="1" class="text-center">
                DIRECCIÓN:
              </td>
              <td colspan="5" class="text-center text-size8">{{DATA.DIR_PRESTADOR}}</td>
            </tr>
            <tr>
              <td colspan="1" class="text-center">
                REPRESENTANTE LEGAL:
              </td>
              <td colspan="5" class="text-center text-size8">{{DATA.NOM_REPRESENTANTE}}</td>
            </tr>
            <tr>
              <td colspan="1" class="text-center">
                N° IDENTIFICACIÓN:
              </td>
              <td colspan="5" class="text-center text-size8">{{DATA.COD_REPRESENTANTE}}</td>
            </tr>
            <tr>
              <td colspan="1" class="text-center">
                CORREO ELECTRONICO:
              </td>
              <td colspan="5" class="text-center text-size8">{{DATA.CORREO_REPRESENTANTE}}</td>
            </tr>
            <tr>
              <td colspan="1" class="text-center">
                TIPO:
              </td>
              <td colspan="5" class="text-center text-size8 text-right">
                <div style="display: inline-flex;width: 100%;">
                  <div style="width: 45%;">
                    <label for="tipo_1" class="text-bold7">Prestador de Servicios en Salud (PSS)</label>
                    <input type="checkbox" id="tipo_1" name="tipo_1" ng-checked="DATA.PRESTADOR_SALUD != ''"
                      onclick="return false;">
                  </div>
                  <div style="width: 55%;">
                    <label for="tipo_2" class="text-bold7">Proveedor de Tecnologias en Salud (PTS)</label>
                    <input type="checkbox" id="tipo_2" name="tipo_2" ng-checked="DATA.PRESTADOR_TECNOLOGIAS != ''"
                      onclick="return false;">
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="1" rowspan="5" class="text-center">
                CLASE:
              </td>
              <td colspan="5" class="text-center text-size8 text-right">
                <div style="display: inline-flex;width: 100%;">
                  <div style="width: 45%;">
                    <label for="clase_1">INSTITUCIÓN PRESTADORA DE SERVICIOS (IPS)</label>
                    <input type="checkbox" id="clase_1" name="clase_1" ng-checked="DATA.IPS != ''"
                      onclick="return false;">
                  </div>
                  <div style="width: 55%;">
                    <label for="clase_2">IPS INDÍGENA (IPSI)</label>
                    <input type="checkbox" id="clase_2" name="clase_2" ng-checked="DATA.IPSI != ''"
                      onclick="return false;">
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="5" class="text-center text-size8 text-right">
                <div style="display: inline-flex;width: 100%;">
                  <div style="width: 45%;">
                    <label for="clase_3">TRANSPORTE ESPECIAL DE PACIENTES (PSS)</label>
                    <input type="checkbox" id="clase_3" name="clase_3" ng-checked="DATA.PSS != ''"
                      onclick="return false;">
                  </div>
                  <div style="width: 55%;">
                    <label for="clase_4">PROFESIÓNAL INDEPENDIENTE (PI)</label>
                    <input type="checkbox" id="clase_4" name="clase_4" ng-checked="DATA.PI != ''"
                      onclick="return false;">
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="5" class="text-center text-size8 text-right">
                <div style="display: inline-flex;width: 100%;">
                  <div style="width: 45%;">
                    <label for="clase_5">GESTOR FARMACÉUTICO (GF)</label>
                    <input type="checkbox" id="clase_5" name="clase_5" ng-checked="DATA.GF != ''"
                      onclick="return false;">
                  </div>
                  <div style="width: 55%;">
                    <label for="clase_6">OPERADOR LOGÍSTICO DE TECNOLOGÍAS EN SALUD (OLTS)</label>
                    <input type="checkbox" id="clase_6" name="clase_6" ng-checked="DATA.OLTS != ''"
                      onclick="return false;">
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="5" class="text-center text-size8 text-right">
                <div style="display: inline-flex;width: 100%;">
                  <div style="width: 45%;">
                    <label for="clase_7">ORGANIZACIÓN NO GUBERNAMENTAL (ONG)</label>
                    <input type="checkbox" id="clase_7" name="clase_7" ng-checked="DATA.ONG != ''"
                      onclick="return false;">
                  </div>
                  <div style="width: 55%;">
                    <label for="clase_8">UNIVERSIDAD (UN)</label>
                    <input type="checkbox" id="clase_8" name="clase_8" ng-checked="DATA.UN != ''"
                      onclick="return false;">
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="5" class="text-center text-size8 text-right">
                <div style="display: inline-flex;width: 100%;">
                  <div style="width: 45%;">
                    <label for="clase_9">OBJETO SOCIAL DIFERENTE (OS)</label>
                    <input type="checkbox" id="clase_9" name="clase_9" ng-checked="DATA.OS != ''"
                      onclick="return false;">
                  </div>
                  <div style="width: 55%;">
                    <label for="clase_10">OTROS (OT)</label>
                    <input type="checkbox" id="clase_10" name="clase_10" ng-checked="DATA.UN != ''"
                      onclick="return false;">
                  </div>
                  <!-- <div style="width: 100%;">
                    <label for="clase_9">OTROS (OT)</label>
                    <input type="checkbox" id="clase_9" name="clase_9" ng-checked="DATA.OT != ''" onclick="return false;">
                  </div> -->
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="1" class="text-center text-bold5">
                NATURALEZA JURÍDICA:
              </td>
              <td colspan="5" class="text-center text-bold5">
                <div style="display: inline-flex;">
                  <div style="margin: 0px 3vw;">
                    <label for="naturaleza_1">Privada:</label>
                    <input type="checkbox" id="naturaleza_1" name="naturaleza_1"
                      ng-checked="DATA.NATURALEZA == 'PRIVADA'" onclick="return false;">
                  </div>
                  <div style="margin: 0px 3vw;">
                    <label for="naturaleza_2">Pública:</label>
                    <input type="checkbox" id="naturaleza_2" name="naturaleza_2"
                      ng-checked="DATA.NATURALEZA == 'PUBLICA'" onclick="return false;">
                  </div>
                  <div style="margin: 0px 3vw;">
                    <label for="naturaleza_3">Mixta:</label>
                    <input type="checkbox" id="naturaleza_3" name="naturaleza_3" ng-checked="DATA.NATURALEZA == 'MIXTA'"
                      onclick="return false;">
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td colspan="6" class="text-center text-bold7 back-gray">
                MODALIDAD DEL CONTRATO:
              </td>
            </tr>
            <tr>
              <td colspan="1" rowspan="4" class="text-center">
                MODALIDAD DE PAGO:
              </td>
              <td colspan="5" class="text-center text-right">
                <div style="display: inline-flex;width: 100%;">
                  <div style="width: 45%;">
                    <label for="modalidad_1">PAGO POR CAPITACIÓN</label>
                    <input type="checkbox" id="modalidad_1" name="modalidad_1" onclick="return false;">
                    <!-- <span ng-show="DATA.P_CAPITACION != ''"
                      style="float: left;line-height: 2.2;">{{DATA.TIPO_CAPITA}}</span> -->
                  </div>
                  <div style="width: 55%;">
                    <label for="modalidad_2">PAQUETE</label>
                    <input type="checkbox" id="modalidad_2" name="modalidad_2" onclick="return false;">
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="5" class="text-center text-left">
                TIPO CAPITA:
                <div style="display: inline-flex;width: 100%;">
                  <ul style="margin: 0;    list-style-type: none;">
                    <li>
                      <label for="tipo_capita_1">RECUPERACIÓN</label>
                      <input type="checkbox" id="tipo_capita_1" name="tipo_capita_1" onclick="return false;">
                    </li>
                    <li>
                      <label for="tipo_capita_2">PROMOCIÓN Y MANTENIMIENTO</label>
                      <input type="checkbox" id="tipo_capita_2" name="tipo_capita_2" onclick="return false;">
                    </li>
                    <li>
                      <div style="width: 100%;">
                        <label for="tipo_capita_3">MEDICAMENTOS</label>
                        <input type="checkbox" id="tipo_capita_3" name="tipo_capita_3" onclick="return false;">
                      </div>
                    </li>
                  </ul>
                  <ul style="margin: 0;list-style-type: none;">
                    <li>
                      <label for="tipo_capita_4">TRANSPORTE ASISTENCIAL</label>
                      <input type="checkbox" id="tipo_capita_4" name="tipo_capita_4" onclick="return false;">
                    </li>
                    <li>
                      <label for="tipo_capita_5">TRANSPORTE NO ASISTENCIAL</label>
                      <input type="checkbox" id="tipo_capita_5" name="tipo_capita_5" onclick="return false;">
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="5" class="text-center text-right">
                <div style="display: inline-flex;width: 100%;">
                  <div style="width: 45%;">
                    <label for="modalidad_3">CANASTA</label>
                    <input type="checkbox" id="modalidad_3" name="modalidad_3" onclick="return false;">
                  </div>
                  <div style="width: 55%;">
                    <label for="modalidad_4">CONJUNTO INTEGRAL</label>
                    <input type="checkbox" id="modalidad_4" name="modalidad_4" onclick="return false;">
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="5" class="text-center text-right">
                <div style="display: inline-flex;width: 100%;">
                  <div style="width: 45%;">
                    <label for="modalidad_5">PAGO GLOBAL PROSPECTIVO</label>
                    <input type="checkbox" id="modalidad_5" name="modalidad_5" onclick="return false;">
                  </div>
                  <div style="width: 55%;">
                    <label for="modalidad_6">PAGO POR EVENTO</label>
                    <input type="checkbox" id="modalidad_6" name="modalidad_6" ng-checked="true"
                      onclick="return false;">
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="6" class="text-center text-bold7 back-gray">
                DURACIÓN Y VIGENCIA:
              </td>
            </tr>
            <tr>
              <td colspan="1" class="text-right">
                INICIA EL:
              </td>
              <td colspan="2" class="text-center text-size8">{{DATA.INICIA}}</td>
              <!-- <td colspan="2" class="text-center">_ _/ _ _ / _ _ _ _</td> -->
              <td colspan="2" class="text-right">TERMINA:</td>
              <td colspan="1" class="text-center text-size8">{{DATA.TERMINA}}</td>
              <!-- <td colspan="1" class="text-center">_ _/ _ _ / _ _ _ _</td> -->
            </tr>
            <tr>
              <td colspan="5" class="text-right">EL CONTRATO ESTARÁ VIGENTE HASTA</td>
              <td colspan="1" class="text-center text-size8">{{DATA.FINAL_}}</td>
              <!-- <td colspan="1" class="text-center">_ _/ _ _ / _ _ _ _</td> -->
            </tr>

            <tr>
              <td colspan="6" class="text-center text-bold7 back-gray">
                VALOR DEL CONTRATO:
              </td>
            </tr>
            <tr>
              <td colspan="1" class="text-center">
                NÚMERO AFILIADOS:
              </td>
              <td colspan="2" class="text-center text-size8">{{DATA.NUM_AFILIADO}}</td>
              <td colspan="1" class="text-center">
                VALOR UPC:
              </td>
              <td colspan="2" class="text-center text-size8">{{DATA.VALOR_UPC}}</td>
            </tr>
            <tr>
              <td colspan="6" class="text-center text-bold7 back-gray">
                VALOR TOTAL AÑO:
              </td>
            </tr>
            <tr>
              <td colspan="1" class="text-center">
                EN NÚMEROS:
              </td>
              <td colspan="5" class="text-center text-size8">{{DATA.VALOR_NUMERO}}</td>
            </tr>
            <tr>
              <td colspan="1" class="text-center">
                EN LETRAS:
              </td>
              <td colspan="5" class="text-center text-size8">{{DATA.VALOR_LETRA}}</td>
            </tr>

          </table>

          <div id="firma">
            <div style="width:49%">
              <div>
                <span> _________________________________________________________</span>
                <br>
                <span class="text-left text-bold7">CONTRATANTE</span>
                <br>
                <span>Nombre: {{DATA.REPRESENTANTE}}</span>
                <br>
                <span>Tipo ID: <span>CC</span></span>
                <br>
                <span>Número ID: <span>{{DATA.DOCUMENTO_REPRESENTANTE}}</span> expedida en la ciudad de
                  Barranquilla</span>
                <br>
                <!-- <span>Cargo: <span>REPRESENTANTE LEGAL</span></span> -->
              </div>
            </div>
            <div style="width:50%">
              <div>
                <span> _________________________________________________________</span>
                <br>
                <span class="text-left text-bold7">CONTRATISTA</span>
                <br>
                <span>Nombre: <span>{{DATA.NOM_REPRESENTANTE}}</span></span>
                <br>
                <span>Tipo ID: <span>CC</span></span>
                <br>
                <span>Número ID: <span>{{DATA.COD_REPRESENTANTE}}</span> expedida en la ciudad de
                  {{DATA.EXPEDICION}}</span>
                <br>
                <!-- <span>Cargo: <span>GERENTE</span></span> -->
              </div>
            </div>
          </div>
          <!--  -->
          <!--  -->
          <div id="minuta_contrato">
            <div class="minuta_titulo">MINUTA DEL CONTRATO - NUMERO: {{DATA.NUMERO_CONTRATO}}</div>
            <div class="minuta_texto_1 mb">
              Entre los suscritos a saber: {{DATA.REPRESENTANTE}} identificado con cédula de ciudadanía Nº
              {{DATA.DOCUMENTO_REPRESENTANTE}} expedida en la ciudad de Barranquilla en su calidad de representante
              legal de {{DATA.RAZON_SOCIAL}} entidad identificada con NIT: {{DATA.EPS}}, según consta en el certificado
              de existencia y representación legal adjunto, quien en adelante se denominará LA ERP y
              {{DATA.NOM_REPRESENTANTE}} identificado(a) con cédula de ciudadanía Nº {{DATA.COD_REPRESENTANTE}} expedida
              en la ciudad de {{DATA.EXPEDICION}} en su calidad de representante legal de {{DATA.RAZON_SOCIAL_IPS}}
              entidad identificada con NIT: {{DATA.NIT}}, según consta en el certificado de existencia y representación
              legal adjunto, entidad debidamente habilitada para operar en el Sistema General de Seguridad Social en
              Salud, quien en adelante se denominará EL PSS/PTS; hemos decidido suscribir el presente acuerdo de
              voluntades, de común acuerdo para la DISPENSACION DE MEDICAMENTOS, DISPOSITIVOS E INSUMOS EN LA MODALIDAD
              DE PAGO POR EVENTO, para la atención de los afiliados, al Sistema General de Seguridad Social en Salud
              Régimen Subsidiado/Contributivo a través de CAJACOPI EPS SAS, el cual se regirá por el acuerdo contenido
              en las siguientes cláusulas y en lo no previsto por ellas, por la normatividad legal que resulte aplicable
              según la naturaleza de los servicios contratados, en especial Decreto 2200 de 2005, la Ley 1122 de 2007,
              el Decreto 4747 de 2007, la Ley 1438 de 2011, el Decreto 1683 de 2013, Resolución 1604 de 2013, la
              Resolución 1841 de 2013, la Ley 1751 del 2015, el Decreto 780 de 2016, la Resolución 429 del 2016, la
              Resolución 2515 del 2018, la Resolución 1885 del 2018 de la Administradora de los Recursos del Sistema de
              Seguridad Social en Salud -ADRES-, Resolución 205 de 2020, la Resolución 535 de 2020 del Ministerio de
              Salud y Protección Social, la Circular 013 de 2020 de la ADRES y el Decreto 441 de 2022, la Resolución 1403 de 2007,
              acceso a la prestación y provisión de servicios y tecnologías de salud a toda la población perteneciente a la etnia wayuu
              y lo dispuesto en los articulos 4 y 5 de la resolución 2811 de 2022 por aquellas que
              las adicionen, modifiquen, aclaren o sustituyan, así como las que posteriormente se expidan y que sean
              aplicables a la naturaleza de las partes, y de los servicios objeto del presente contrato a las cuales las
              partes se acogerán automáticamente, una vez entren en vigencia.
            </div>
            <div class="minuta_titulo">CLAUSULADO</div>

            <div class="minuta_clausula">Cláusula 1. Objeto.</div>
            <div class="minuta_texto">
              El objeto del presente contrato o acuerdo de voluntades es el de realizar el
              suministro de medicamentos, dispositivos e insumos contenidos en los anexos 14 y 15; para la Población
              descrita en el anexo 4, que se encuentra afiliada a la ERP y caracterizada en el Anexo 4 (Caracterización
              de la población afiliada a Cajacopi EPS), según el Modelo de Atención de la ERP contenido en el Anexo 3. y
              el modelo de prestación de servicios del PTS que se describe en el Anexo 6. Los servicios se sujetan a los
              contenidos en el Plan de Beneficios financiado con la Unidad de Pago por Capitación y los financiados con
              los presupuestos máximos que defina el Ministerio de Salud y Protección Social.</div>
            <div class="minuta_texto"><span class="minuta_paragrafo">PARÁGRAFO. </span>
              Las tecnologías en salud serán
              prestados a los afiliados activos en la base de datos entregada los diez (10) primeros días de cada mes,
              ubicados en el departamento descrito en la portada, incluyendo los afiliados en portabilidad, considerando
              los grupos poblacionales vulnerables (personas con discapacidad, víctimas del conflicto armado y
              comunidades indígenas) para hacer efectivo el enfoque diferencial de territorio y poblacional, como
              estrategia para la ampliación gradual y continua del acceso a los servicios de poblaciones vulnerables a
              su cargo, acorde a las necesidades en salud, de conformidad con los datos sobre la ubicación geográfica y
              caracterización poblacional disponible en el Anexo 4.</div>



            <div class="minuta_clausula">Cláusula 2. Obligaciones del PSS/PTS.</div>
            <div class="minuta_texto">
              EL PSS/PTS se obliga para con la ERP a: 1. A dispensar las tecnologías objeto del presente contrato, a los
              afiliados debidamente identificados y reportados en la base de datos de la ERP. 2. Permitir a la ERP o a
              quien este delegue, el acceso a la información relacionada con el afiliado y la prestación del servicio de
              dispensación de medicamentos, así mismo, permitirle el acceso a los documentos que requiera, de acuerdo
              con lo reglamentado en la Ley y en el presente contrato. 3. Suministrar información sobre la atención en
              salud prestada a los afiliados de la ERP que requiera cualquiera de los Organismos de dirección,
              inspección, vigilancia y control, en especial los indicadores de calidad de que trata la Circular Única de
              la Superintendencia Nacional de Salud, los eventos de salud pública, evidencia del cargue efectivo de
              Indicadores de monitoreo de la calidad en salud según el marco normativo del Anexo 1. 4. Cumplimiento de
              la calidad esperada establecida para cada indicador. 5. Vigilar que su personal asistencial y
              administrativo cumpla con lo estipulado en la normatividad legal vigente según la formulación académica de
              acuerdo con los perfiles profesionales. 6. Cumplir y mantener las condiciones de habilitación y
              suficiencia declaradas, permitiendo que la ERP las pueda verificar cuando así lo determine, según el PAMEC
              y el “Proceso de verificación de condiciones de habilitación”. El producto de esta verificación podrá dar
              como resultado el acompañamiento de la ERP a través de su auditoría para mejorar las condiciones de los
              servicios que lo ameriten. 7. Garantizar el suministro de los medicamentos, materiales e insumos que
              requieran los afiliados durante su atención, de acuerdo con los servicios contratados y descritos en los
              Anexos 14 y 15 y en la Nota Técnica. 8. Recibir las glosas, responderlas, conciliarlas o en su defecto
              aceptarlas, dentro de los plazos definidos en la normatividad vigente. 9. Gestionar las inquietudes,
              reclamos y/o derechos de petición de los usuarios por la mala calidad en los servicios o la no prestación
              de estos, respondiendo directamente al usuario con copia a la ERP, acorde a lo establecido en la Circular
              008 de la Superintendencia Nacional de Salud. 10. Atender los requerimientos derivados del cumplimiento de
              la supervisión del presente contrato. 11. Garantizar la calidad de los insumos, materiales y medicamentos
              utilizados en la atención de los usuarios y responder por los costos en que se incurra por
              reintervenciones y complicaciones donde se demuestre que la causa de estos sea debida a la mala calidad de
              los materiales, insumos o medicamentos utilizados durante la prestación de los servicios. Igualmente
              responderá en estos casos por la responsabilidad civil o penal que se deriven de estas complicaciones. 12.
              En el caso que un afiliado solicite los servicios incluidos en el presente contrato, pero no se encuentre
              en la base de datos entregada, EL PSS/PTS podrá brindar la atención solicitada siempre y cuando dicho
              afiliado se encuentre activo en verificación realizada a través del Portal Genesis / Opción Prestador
              (Consulta Afiliado), donde debe reportar la atención, o en la página web de la ERP. EL PSS/PTS reportará
              dicha inconsistencia en el marco normativo vigente descrito en el Anexo 1. Las atenciones prestadas serán
              facturadas mediante la modalidad de eventos y serán canceladas a las tarifas pactadas.13. Cumplir los
              protocolos de atención de los programas de Gestión del Riesgo de la ERP y las guías de atención integral
              del Ministerio de Salud y Protección Social, previamente concertadas con la ERP, en el marco de las
              actividades contratadas. 14. Brindar atención preferencial a las poblaciones especiales tales como
              víctimas de violencia, población en condición de desplazamiento forzado, reinsertados, minorías étnicas,
              discapacitados, embarazadas, personas de la tercera edad y demás que establezca la Ley. 15. Facilitar la
              información sobre notificación, clasificación, intervención y estudio de casos en los eventos de
              vigilancia epidemiológica. 16.Implementar el modelo servicios de salud amigables para adolescentes jóvenes
              y la estrategia Atención Integral de las Enfermedades Prevalentes de la Infancia - AIEPI acorde con lo
              definido en el marco normativo vigente descrito en el Anexo 1. 17. Entregar copia de los archivos en medio
              magnético en la misma estructura exigida en la Circular Única de la Superintendencia Nacional de Salud de
              los reportes de los indicadores mensuales y trimestrales de oportunidad y satisfacción de los usuarios.
              18. Diseñar e implementar el modelo de gestión del servicio farmacéutico, según lo establecen las normas
              vigentes. 19. Implementar los diferentes comités reglamentados por la normatividad vigente, que le
              apliquen. 20. Implementar el Sistema de Información y Atención al Usuario para suministrar información,
              orientación y atención a los afiliados. 21. Informar a la ERP sobre cualquier novedad en los datos del
              afiliado, tales como teléfonos, correos electrónicos, dirección u otros. 22. Cumplir con las condiciones
              sanitarias y el plan de gestión de residuos hospitalarios PGHIRS, régimen de habilitación, nombramiento de
              revisor Fiscal (o demostrar que no está obligado), pago de la Tasa de Contribución a la Superintendencia
              Nacional de Salud, mantener vigente el Registro Mercantil y demás obligaciones propias. 23. Garantizar la
              afiliación de sus trabajadores a la Seguridad Social y cumplir con los pagos que de ella se deriven, así
              como de los aportes parafiscales. 24. Diligenciar según aplique de manera completa y clara la historia clínica y demás
              registros obligatorios de atención, garantizando medidas de seguridad adoptadas para el tratamiento de uso
              de datos personales, en especial de datos sensibles, con sujeción a lo dispuesto en la Ley Estatutaria
              1581 de 2012 y sus normas reglamentarias. 25. Reportar de manera inmediata a la ERP, so pena de
              terminación unilateral del contrato, la toma de medidas de seguridad sobre las sanciones impuestas por las
              autoridades de salud y las de Inspección, Vigilancia y Control. Para esto, la ERP verificará mensualmente
              en el Registro Especial de Prestadores de Servicios de Salud, la vigencia de los servicios incluidos en el
              presente acuerdo de voluntades, y en caso de no encontrar algún servicio habilitado, este será
              inhabilitado del contrato sin previo aviso y no podrá ser facturado por el PSS. 26. Reportar de manera
              inmediata a la ERP, so pena de terminación unilateral del contrato, la toma de medidas correctivas o
              sanciones impuestas por las autoridades de Inspección, Vigilancia y Control, y de aquellas que por sus
              competencias son atribuidas a otras autoridades. Para esto, la ERP verificará mensualmente la dispensación
              efectiva y oportuna del servicio tal como se encuentra descrito en la cláusula 17 supervisión del contrato
              y clausula 19 indicador de evaluación de la ejecución. 27. Brindar atención preferencial a las poblaciones
              especiales tales como víctimas de violencia, población en condición de desplazamiento forzado,
              reinsertados, minorías étnicas, discapacitados, embarazadas, personas de la tercera edad y demás que
              establezca la Ley, ofreciendo especiales garantías y esfuerzos encaminados a garantizar el derecho a la
              salud de las poblaciones vulnerables consideradas de especial protección. 28. Realizar el fortalecimiento
              de la dispensación de medicamentos, dispositivos médicos e insumos en la zona rural y rural dispersa, a
              partir del reconocimiento de las particularidades del territorio a través del enfoque participativo y el
              dimensionamiento de las necesidades, de acuerdo con las dinámicas poblacionales y epidemiológicas,
              adaptando y adecuando los servicios y las modalidades de prestación requeridos para garantizar la atención
              integral con calidad, teniendo en cuenta los ámbitos territoriales urbano, rural y con población dispersa,
              así como los aspectos sociales y culturales. 29. Garantizar el ejercicio efectivo de los derechos de las
              personas con discapacidad, y adoptar medidas de inclusión que faciliten el acceso y la movilidad,
              eliminando toda forma de discriminación por razón de discapacidad. 30. Garantizar la atención integral,
              acceso, oportunidad e inclusión de las personas con discapacidad a cada uno de sus servicios de salud en
              todos los componentes de atención, de acuerdo con sus competencias, responsabilidades y funciones en el
              marco de operación del Modelo de Atención Integral en Salud -MIAS- dentro de la Política de Atención
              Integral en Salud - PAIS-. 31. Enviar a la ERP los estados de cartera cuando esta lo solicite, y expedir
              los Paz y Salvo correspondientes cuando las obligaciones sean satisfechas o concertadas mediante acta de
              saneamiento de deudas, liquidación de contratos o cualquier medio que ponga fin a las diferencias
              derivadas de la ejecución del presente contrato. 32. El PSS/PTS deberá cumplir con el reporte oportuno de
              los indicadores de calidad. En caso de incumplimiento la ERP realizará un descuento del 20% del valor del
              pago del mes siguiente al corte del reporte incumplido. El pago del 20% descontado, se realizará hasta que
              el PSS/PTS realice el reporte de la información. Asimismo, el pantallazo de validación en la página de la
              Superintendencia Nacional de Salud deberá ser enviado a la ERP por correo electrónico, como constancia de
              la realización del reporte de la información. 33.EL PSS/PTS se obliga a las demás obligaciones derivadas
              del presente contrato y del contenido de la normatividad vigente.
            </div>

            <div class="minuta_clausula">Cláusula 3. Obligaciones relacionadas con los contratos de dispensación de
              medicamentos, insumos y dispositivos médicos.</div>
            <div class="minuta_texto">
              Los PSS/PTS con contratos bajo la modalidad de cápita para la dispensación de medicamentos, insumos y
              dispositivos médicos se obligan a: 1. Suministrar los medicamentos garantizando su calidad, seguridad y
              oportunidad. 2. Suministrar los medicamentos, insumos y dispositivos médicos incluidos en este acuerdo de
              voluntades descritos en los anexos 14 y 15. 3. Presentar información de dispensación diariamente en el
              momento que la ERP lo requiera, de todos los medicamentos, dispositivos e insumos dispensados ya sean
              completos, parciales y /o pendientes. 4. Garantizar el suministro de todos los medicamentos, materiales e
              insumos que requieran los afiliados para la atención ambulatoria. 5. Garantizar la entrega completa y
              oportuna de los medicamentos, materiales e insumos según las prescripciones médicas. 6. Cumplir con
              relación a la distribución y entrega de los medicamentos con las siguientes obligaciones: a. Suministrar
              los medicamentos que les sean formulados por profesionales de la salud de la Red de Prestadores de la ERP.
              b. Garantizar el suministro de medicamentos correspondientes a lo ordenado en la fórmula médica. c.
              Mantener un stock de medicamentos suficientes que duplique la rotación mensual calculada de los
              establecido en la nota técnica para atender oportunamente los requerimientos de los usuarios. d.
              Abstenerse de entregar medicamentos de fórmulas no diligenciadas completamente o que presenten
              enmendaduras, borrones, incongruencias o tachones. De presentarse el primer hecho, el PSS/PTS queda
              obligado a retener la fórmula y remitirla a la ERP, acompañada de la comunicación escrita informando sobre
              el hecho presentado; e. Verificar que la fórmula o prescripción esté elaborada por el personal de salud
              competente. f. Abstenerse de cambiar medicamentos prescritos. g. Garantizar la trazabilidad e idoneidad de
              la distribución interna de los medicamentos suministrados según las características técnicas establecidas
              por el laboratorio fabricante. h. En caso de no contar con los medicamentos formulados, deberá expedir un
              comprobante de medicamento pendiente por entregar y dispondrá de cuarenta y ocho (48) horas para la
              consecución y entrega en el lugar de residencia o lugar que autorice el usuario. i. Contar con una
              herramienta informática que permita el normal desarrollo de los procesos inherentes al servicio contratado
              y que estén integrados con la tecnología de la ERP. Reportar a la ERP diariamente los medicamentos no
              entregados o pendientes y motivo de la no entrega; en el evento que el PSS/PTS tenga medicamentos
              pendientes o no entregados, la ERP podrá garantizar la entrega con otro proveedor y descontarlos al
              PSS/PTS. 8. Reportar con periodicidad semanal los medicamentos, insumos y dispositivos para los cuales se
              reporte desabastecimiento por parte de los proveedores.

              <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. REPORTE DE INFORMACIÓN. </span>
              Para el reporte de detallados de dispensación el contratista deberá disponer con una herramienta
              tecnológica que permita visualizar en medio digital una relación consolidada de los medicamentos
              entregados que contenga entre otros: código CUM, valor unitario y valor total, la fecha de la fórmula, el
              nombre del usuario, número de documento de identificación, nombre del medicamento, nombre comercial del
              medicamento, laboratorio, cantidad entregada, y las demás que defina la ERP, para esto se cuenta con dos
              mecanismos de reporte: 1. <span class="text-bold7">Link de reportería</span> alojado en el sistema
              Génesis en el cual deberá disponerse
              diariamente el archivo señalado en formato txt, en caso de errores en la construcción del reporte ya sea
              de calidad o de estructura la herramienta notificará el origen y naturaleza de error para su corrección
              inmediata, el sistema no aceptara el archivo hasta que la corrección quede efectuada; 2. <span
                class="text-bold7">archivo tipo FTP</span>
              de actualización diaria acumulativa, que deberá alojarse en una carpeta tipo drive para consultas manuales
              y masivas por parte de la ERP, al mismo tiempo entregará un usuario de ingreso a la herramienta
              tecnológica propia para la ERP para consultas del histórico de dispensación de pacientes.
              <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. PARÁGRAFO SEGUNDO. INCUMPLIMIENTO EN EL REPORTE DE
                INFORMACIÓN. </span>
              El incumplimiento en el reporte de información, así como la presentación de informes incompletos o
              inconsistentes, con llevará a la aplicación de los descuentos detallados en la cláusula 18, párrafo
              tercero, relativa a los descuentos. Además, la falta reiterada en la entrega de medicamentos y en la
              presentación oportuna de los informes, constituirá motivo de terminación del presente acuerdo de
              voluntades.
            </div>

            <div class="minuta_clausula">Cláusula 4. Obligaciones de la ERP.</div>
            <div class="minuta_texto">
              Las ERP se obliga a: 1. Garantizar el acceso oportuno a la información de la población a ser atendida,
              asegurando su calidad, depuración y la actualización oportuna de las novedades, a través de bases de datos
              georreferenciadas y mediante los mecanismos de verificación de derechos al momento de la atención, la cual
              deberá corresponder con lo registrado en la Base de Datos Única de Afiliados BDUA-, así como la requerida
              para el cumplimiento de las disposiciones que reglamentan la factura electrónica de venta en el sector
              salud, 2. Pagar las facturas debidamente radicadas, auditadas y conciliadas según los plazos establecidos
              en el marco normativo del Anexo 1. 3. Hacer seguimiento a la ejecución del presente contrato de
              conformidad con el manual de auditoría adjunto. 4. Publicar en la página web dentro de los primeros cinco
              días hábiles de cada mes, la base de datos en la que aparecerán los afiliados actualizados, que incluye
              las novedades del mes anterior. 5. Entregar al PSS/PTS la caracterización de la población afiliada objeto
              del contrato 6. Garantizar la depuración, el correcto y oportuno registro de las novedades, así como la
              disponibilidad en línea de la base de datos de afiliados desde la página web de la ERP o a través del
              Portal Genesis / Opción Prestador (Consulta Afiliado), para la verificación de derechos. 7. Entregar al
              PSS/PTS la red de servicios de salud contratada por la ERP para garantizar la oportunidad, integralidad,
              continuidad y accesibilidad en la prestación de servicios de los afiliados y publicar de manera permanente
              en la página web el listado actualizado de prestadores de servicios de salud que conforman dicha red. 8.
              Inscribir al PSS/PTS como parte de la red de prestadores de salud, una vez inicie el presente contrato,
              como prestador primario, complementario u oncológico, según sea el caso. 9. Verificar la permanencia de
              las condiciones de habilitación y de suficiencia (capacidad instalada) del PSS, 10. Concertar con El
              PSS/PTS los estándares de calidad de la atención en salud y realizar la evaluación a través de indicadores
              de calidad, de gestión y de resultados, según los mecanismos que establezca el Ministerio de la Protección
              Social. 11. Realizar seguimiento a la implementación de los protocolos y/o guías de manejo conciliados
              entre el PSS/PTS y la ERP.12. Reportar a la Superintendencia Nacional de Salud los prestadores que no
              cumplan con el reporte oportuno, confiable, suficiente y con la calidad mínima aceptable de la información
              necesaria para la operación del sistema de monitoreo, de los sistemas de información del sector salud, o
              de las prestaciones de salud (Registros Individuales de Prestación de Servicios) 13. Realizar la
              evaluación de desempeño del prestador primario y reportar los resultados al finalizar el periodo
              contractual al PSS/PTS14. Verificar la veracidad de la información reportada por el PSS/PTS en el marco de
              las obligaciones definidas en el presente contrato.
            </div>

            <div class="minuta_clausula">Cláusula 5. Plazo de duración y vigencia.</div>
            <div class="minuta_texto">
              El plazo de duración y vigencia del presente acuerdo de voluntades es el que se describe en la portada del
              presente contrato. En el evento que ninguna de las partes comunique a la otra su voluntad con una
              antelación no inferior a 30 días calendario, de darlo por terminado o no renovarlo, se entenderá
              prorrogado automáticamente por el término inicialmente pactado.
              <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. </span>
              Las condiciones del servicio de dispensación de medicamentos, dispositivos médicos e insumos deben
              mantenerse durante la suscripción, ejecución y hasta la expiración del presente acuerdo de voluntades.
              <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. </span>
              En caso de prórrogas o renovaciones automáticas de los acuerdos de voluntades, antes del inicio del
              periodo de prórroga o renovación, se deberá actualizar el anexo de tarifas en los casos que aplique, de
              acuerdo con el periodo contractual, igualmente se tendrá en cuenta el incremento de tarifa en el marco de
              la negociación entre las partes, sobre el límite determinado por el gobierno nacional, para cada vigencia.
              A falta de acuerdo se aplicará lo dispuesto en el parágrafo primero del artículo 2.5.3.5.3 del Decreto 780
              de 2016, sin perjuicio de los acuerdos que surjan de la autonomía de la voluntad, la libertad de
              contratación y la libertad de configuración contractual entre las partes.
            </div>

            <div class="minuta_clausula">Cláusula 6. Valor del contrato.</div>
            <div class="minuta_texto">
              El valor estimado del presente acuerdo de voluntades es el que se describe en la portada del contrato, sin
              perjuicio de los ajustes que se generan como consecuencia del proceso normal de glosas conciliadas y
              debidamente aceptadas o valores a favor que la ERP reconozca como incentivos por cumplimiento de
              indicadores.
              <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. </span>
              Las partes acuerdan establecer como valor del contrato la suma establecida en la carátula del contrato.
            </div>

            <div class="minuta_clausula">Cláusula 7. Lugar donde se prestarán los servicios.</div>
            <div class="minuta_texto">
              Los servicios descritos en la portada del presente acuerdo de voluntades se prestarán en las sedes del
              PSS/PTS según se describen en el Anexo 7.
            </div>

            <div class="minuta_clausula">Cláusula 8. Base de datos de afiliados usuarios del servicio.</div>
            <div class="minuta_texto">
              La base de datos de afiliados a la ERP, que serán usuarios de los servicios objeto del presente acuerdo de
              voluntades se genera a través de archivo plano y radicado físico o electrónico, el cual podrá ser accedido
              por el PSS, previa asignación de usuario y clave de acceso. La ERP se compromete a cargar mensualmente las
              actualizaciones dentro de los primeros 5 días del mes.
            </div>

            <div class="minuta_clausula">Cláusula 9. Relación de servicios de salud contratados.</div>
            <div class="minuta_texto">
              La relación de servicios contratados es la que se describe en la Nota Técnica, y se detalla por grupo REPS
              por cada una de las sedes del PSS/PTS en el Anexo 7.
            </div>

            <div class="minuta_clausula">Cláusula 10. Relación de tecnologías de salud objeto de contratación.</div>
            <div class="minuta_texto">
              En el marco de la prestación de servicios que se describen en el Anexo 7, el PSS/PTS suministrará según
              los criterios científicos de las Guías de Práctica Clínica que se alistan en el Anexo 12 (Relación de
              Guías de Práctica Clínica y Protocolos de Atención) y de las Rutas de Atención Integral que se alistan en
              el Anexo 13, los medicamentos según sus presentaciones y precios contenidos en el Anexo 14 y los insumos,
              suministros y demás tecnologías que se alistan en el anexo 15.
            </div>

            <div class="minuta_clausula">Cláusula 11. Red Integral de Prestadores de Servicios de Salud.</div>
            <div class="minuta_texto">
              Para efectos de garantizar la integralidad y la continuidad en la atención de los usuarios y el acceso
              efectivo a la atención, los servicios objeto del presente contrato se complementan con los servicios
              contratados con otros prestadores y proveedores de tecnologías en salud que se describen en el Anexo 16
              (Red integral de prestadores de servicios de salud), en el marco de las Redes Integradas de Prestadores de
              Servicios de Salud registrada en el módulo Especial del Registro Especial de Prestadores; para lo cual los
              prestadores deberán utilizar los procesos de referencia y contrarreferencia así como las tecnologías de
              información para transferencia de datos clínicos de los pacientes y las herramientas de comunicación que
              permitan la trazabilidad de la información y evidencien la diligencia y oportunidad en la gestión, de
              conformidad con los estándares descritos en el (Anexo 9) del presente acuerdo de voluntades.
            </div>

            <div class="minuta_clausula">Cláusula 12. Modalidad de pago.</div>
            <div class="minuta_texto">
              Los servicios y tecnologías en salud facturados con objeto del presente acuerdo de voluntades se pagarán
              según la modalidad descrita en la portada del acuerdo de voluntades. Los plazos de pago son los
              establecidos en la Ley 1122 de 2007, artículo 13, literal d; Ley 1438 de 2011, artículo 56 y 57; Ley 1231
              de 2008; Ley 2024 de 2020; Decreto 1733 de 2020; Decreto 441 de 2022, y demás normas que modifiquen,
              adicionen o sustituyan.
              <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. </span>
              El pago se realizará mediante transferencia electrónica al número de cuenta donde el PSS/PTS sea titular y
              que haya sido reportada por el PSS/PTS dentro de los anexos contractuales.
            </div>

            <div class="minuta_clausula">Cláusula 13. Tarifas.</div>
            <div class="minuta_texto">
              Las tarifas de los servicios son las pactadas en el anexo tarifario suscrito entre las partes.
              <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. </span>
              Las tarifas detalladas en los anexos tarifarios podrán ser modificadas durante la vigencia contractual a
              través de un Otrosí al contrato, suscrito por los representantes legales de las partes.
              <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. </span>
              Si dentro de la vigencia contractual se solicitan medicamentos, insumos y/o dispositivos médicos no
              pactados en los anexos tarifarios, estos se cotizarán previamente a la prestación del servicio, y una vez
              concertado, las partes podrán modificar los anexos tarifarios a través de un Otrosí al contrato, suscrito
              por los representantes legales de las partes.
              <span class="minuta_paragrafo">PARÁGRAFO TERCERO. </span>
              Los precios de los medicamentos, insumos y dispositivos médicos pactados entre las partes no podrán
              exceder el valor establecido en las Circulares sujetas al régimen de control directo de precios, mediante
              las cuales se fija el precio máximo de venta por parte del Ministerio de Salud y Protección Social.
            </div>

            <div class="minuta_clausula">Cláusula 14. Recaudo de pagos compartidos – Copagos, Cuotas Moderadoras y de
              Recuperación.</div>
            <div class="minuta_texto">
              Los servicios están sujetos al régimen de pagos compartidos o copagos y cuotas moderadoras y para su
              aplicación se debe tener en cuenta lo establecido en el Decreto 1652 de 2022 y demás normas que lo
              modifiquen, adicionen o sustituyan. EL PSS/PTS realizará el recaudo del copago, cuotas moderadoras o
              cuotas de recuperación y deberá descontarlo del valor de la factura, especificando este ítem en la misma y
              en los RIPS de la factura. Será obligación especial del PSS, llevar un registro del recaudo de dichos
              copagos y cuotas moderadoras en los tiempos definidos por las normas legales con el fin de soportar los
              procesos de auditoría que haya lugar.
              <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. </span>
              En el evento y ante la imposibilidad de pago por parte del afiliado, el PSS/PTS está obligado a soportar y
              reportar ante la ERP el no pago por parte del usuario, evento en el cual corresponderá a esta reconocer y
              pagar dicha suma y adelantar el cobro al usuario. El PSS/PTS reportará a la ERP dicha situación mediante
              formato de notificación que maneje el PSS/PTS o el formato que sea definido por la ERP. El formato de no
              recaudo debe adjuntarse a la factura y sus soportes. Este formato de notificación deberá ir firmado por el
              afiliado y por el funcionario encargado del PSS, con los datos mínimos de identificación y de contacto
              actualizados, como constancia, y en señal del conocimiento previamente informado, sobre la aplicación de
              las cuotas moderadoras y/o copagos a que está sujeto por los servicios prestados.
              <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. </span>
              El PSS/PTS en todos los casos que el afiliado manifieste la imposibilidad de pago, propondrá la
              suscripción de acuerdo de pago a los afiliados. Sólo podrá considerarse como parte del pago a estas cuando
              exista un recaudo efectivo de su valor.
              <span class="minuta_paragrafo">PARÁGRAFO TERCERO. </span>
              El PSS/PTS deberá abstenerse de cobrar a los afiliados copagos, cuotas moderadoras y de recuperación, de
              conformidad con las exclusiones establecidas en el Acuerdo 260 de 2004 y el Decreto 1562 de 2022 y demás
              normas que lo modifiquen, adicionen o sustituyan.
            </div>

            <div class="minuta_clausula">Cláusula 15. Listado de GPC y Protocolos de Atención.</div>
            <div class="minuta_texto">
              El PSS/PTS se compromete a prestar los servicios de conformidad con las Guías de Práctica Clínica (GPC) y
              los Protocolos de Atención que se describen en el Anexo 12 del presente contrato, las cuales fueron
              conciliadas entre las partes. Para los servicios asociados con Rutas Integrales de Atención en Salud, las
              cantidades, periodicidad y oportunidad se ajustarán a las RIAS alistadas en el Anexo 13, que se ajustan a
              la normatividad vigente.
              <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. CORRESPONDENCIA ENTRE RIPS CON GPC, PROTOCOLOS Y
                RIAS.</span>
              Los servicios y tecnologías reportadas en los RIPS que se anexen mensualmente a la factura corresponderán
              a las GPC, Protocolos y RIAS contenidas en estos Anexos en cuanto a las cantidades y dosis recomendadas.
              <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. ACTUALIZACIÓN DE LAS GPC Y RIAS.</span>
              Las partes del contrato revisarán cada año los listados anexos según las nuevas evidencias científicas
              surgidas. Se entenderán automáticamente adoptados los servicios y tecnologías a que se refieren las GPC y
              las RIAS del Ministerio de Salud / Instituto de Evaluación de Tecnologías en Salud IETS, en la medida en
              que se vayan actualizado, no obstante, los precios de los nuevos servicios o tecnologías sugeridas por las
              actualizaciones deberán pactarse mediante un otrosí que modifique los Anexos 14 y 15 del presente
              contrato.
            </div>

            <div class="minuta_clausula">Cláusula 16. Rutas Integrales de Atención en Salud.</div>
            <div class="minuta_texto">
              El PSS/PTS garantizará la dispensación de medicamentos, insumos y demás tecnologías en salud según los
              listados definidos en los anexos 14 y 15. El PSS/PTS se compromete a cumplir con los lineamientos técnicos
              y operativos de las RIAS adoptadas por el ministerio de salud y protección social y que forman parte
              integral del presente contrato. La prestación o provisión de servicios y tecnologías de salud relacionados
              con la implementación de las RIAS que el Ministerio de Salud y Protección Social haya definido como de
              obligatorio cumplimiento; las priorizadas por la entidad responsable de pago de acuerdo con la
              caracterización poblacional o el análisis de la situación en salud que esta realice; la gestión de eventos
              y condiciones en salud priorizados a través de la política pública, y todos aquellos que así se haya
              previsto por la normatividad.
            </div>

            <div class="minuta_clausula">Cláusula 17. Autorización de servicios.</div>
            <div class="minuta_texto">
              Para los servicios pactados bajo la modalidad de evento, el PSS solicitará autorización del servicio según
              los tiempos y mecanismos descritos en el marco normativo vigente, mediante los canales de contacto
              descritos en el Anexo 17. La ERP expedirá la autorización a través de un canal informático transaccional y
              notificará al PSS/PTS y usuario dentro de los tiempos establecidos por el marco normativo vigente.
              <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. AUTORIZACIÓN DE SERVICIOS POR EVENTO. </span>
              Para los servicios no incluidos en el presente acuerdo de voluntades, y que se encuentran contratados con
              el PSS/PTS mediante la modalidad de evento, la duración de las autorizaciones expedidas para estos será de
              90 días luego de su expedición. En caso de no haber sido prestado el servicio en ese término, el PSS/PTS
              deberá justificar a la ERP los motivos por los que el servicio no se prestó durante la vigencia de esta, y
              la ERP definirá la renovación de dicha autorización.
              <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. PROHIBICIÓN DE EXPEDICIÓN DE AUTORIZACIONES. </span>
              En aras de garantizar el acceso continuo de los usuarios a la prestación o provisión de los servicios o
              tecnologías en salud, sin interrupciones por razones administrativas, de conformidad con el marco
              normativo vigente descrito en el Anexo 1. La atención se brindará procurando eliminar barreras
              administrativas que afecten la prestación o provisión de los servicios o tecnologías, priorizando la
              atención integral del usuario y quitándole la carga administrativa de tramitar autorizaciones, las cuales
              se tramitarán entre las partes a través de un canal transaccional electrónico, de manera transparente para
              los usuarios. No habrá lugar a la solicitud de autorización para la atención integral del cáncer infantil
              o de adultos o de VIH/Sida y lo dispuesto en los articulos 4 y 5 de la resolución 2811 de 2022 de conformidad con el marco normativo vigente descrito en el Anexo 1.
            </div>

            <div class="minuta_clausula">Cláusula 18. Supervisión del contrato.</div>
            <div class="minuta_texto">
              La ERP ejercerá la supervisión sobre la ejecución de los servicios objeto del presente contrato, a través
              de su personal delegado, el cual se designa en la portada del presente contrato. La ERP, se reserva el
              derecho de realizar las visitas de monitoreo y la supervisión que estime convenientes. De igual forma, con
              la finalidad de asegurar que la prestación por parte del PSS/PTS se realice en condiciones óptimas de
              calidad, La ERP podrá inspeccionar, verificar el servicio e igualmente hacer sugerencias por escrito para
              que EL PSS/PTS corrija las deficiencias en la prestación del servicio.
              <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. DECLARACIONES DEL SUPERVISOR. </span>
              Con su visto bueno y en calidad de responsable técnico del contrato, el supervisor declara que: 1. El
              PSS/PTS se encuentra inscrita en el Registro Especial de Prestadores de Servicios de Salud -REPS- y dicho
              registro está vigente. 2. El PSS/PTS cumple con los requisitos legales que en materia de habilitación para
              la prestación de servicios de salud establece la Resolución 3100 de 2019 o aquella norma vigente que la
              modifique, adicione o sustituya, y garantiza la prestación de la totalidad de los servicios contratados.
              3. El PSS/PTS cuenta con sedes habilitadas en los municipios descritos en el Anexo 7, para garantizar la
              prestación de los servicios objeto del contrato a sus afiliados en las condiciones de cobertura que exige
              la ley a las aseguradoras del SGSSS. 4. Las sedes en las cuales se prestarán los servicios de salud objeto
              del contrato cuentan con la evaluación realizada de conformidad con lo establecido en los procedimientos
              internos de la ERP y se encuentran vigentes al momento de la firma del acuerdo de voluntades. 5.
              Considerando el cumplimiento de los requisitos técnicos y legales específicamente respecto de la
              habilitación para la prestación de servicios de salud, gestionó ante el órgano competente de la ERP la
              aprobación de la presente contratación. 6. El operador logístico cuenta con el concepto técnico sanitario
              favorable para la prestación del servicio de dispensación de medicamentos, dispositivos médicos e insumos.
              7. El acuerdo de servicios, el contrato y sus anexos, corresponden a lo negociado y autorizado por la ERP,
              y por lo tanto da visto bueno a la suscripción del presente documento.
              <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. RESPONSABILIDADES DEL SUPERVISOR. </span>
              Las responsabilidades del supervisor del contrato son las siguientes: 1. Gestionar de manera oportuna ante
              los órganos correspondientes de la ERP la aprobación de las modificaciones al presente contrato cuando a
              ello hubiere lugar. 2. Vigilar la correcta ejecución de lo pactado, realizando el seguimiento técnico,
              administrativo y financiero correspondiente. 3. En caso de darse cualquier situación que pueda llegar a
              modificar las condiciones pactadas, o de presentarse incumplimiento de las obligaciones a cargo del
              PSS/PTS que pongan en riesgo el cumplimiento del contrato, adelantar las acciones de mitigación que
              correspondan para evitar que se cause un perjuicio a la organización, gestionando si fuere necesario, y de
              conformidad con el Manual de Contratación, la terminación del contrato. 4. Suministrar al área financiera
              la información de la ejecución del contrato necesaria para su liquidación. 5. En general, dar cumplimiento
              a las disposiciones del Manual de Contratación.
            </div>

            <div class="minuta_clausula">Cláusula 19. Indicadores de evaluación de la ejecución.</div>
            <div class="minuta_texto">
              El PSS/PTS se obliga en cumplimiento del presente contrato a la atención de todo lo dispuesto en el
              Sistema Obligatorio de Garantía de la Calidad de SGSSS, contenido en el Decreto 1011 de 2006, la Ley 1438
              de 2011, Resolución 256 de 2016 de la Superintendencia Nacional de Salud, así como aquellas que la
              modifiquen, adicionen o sustituyan. Durante la vigencia del contrato, la ERP verificará que la prestación
              de servicios de salud objeto del presente contrato, se cumpla por parte del PSS/PTS, bajo las condiciones
              de accesibilidad, oportunidad, seguridad, pertinencia y continuidad establecidas en la normatividad
              aplicable en la materia. Para efectos de evaluar el cumplimiento del presente acuerdo de voluntades, el
              PSS/PTS se obliga a reportar a la ERP la informacion necesaria para la medición de los indicadores de
              calidad, de gestión y de resultados descritos en el Anexo 9 y en el marco normativo vigente descrito en el
              Anexo 1.
              <span class="minuta_paragrafo">PARÁGRAFO. ACTUALIZACIÓN DE INDICADORES E IMPREVISTOS. </span>
              En caso de eventos imprevisibles, fuerza mayor o caso fortuito, que afecten la prestación o provisión de
              servicios y tecnologías en salud y el cumplimiento de los indicadores pactados, estos deberán ser
              ajustados de acuerdo con las nuevas condiciones mediante la celebración de un otrosí. Sin perjuicio de lo
              anterior, cualquier evento imprevisto que surja en el desarrollo del presente contrato y que amerite la
              revisión de sus condiciones se someterá a las normas de imprevisión del Código Civil y del Código del
              Comercio.
            </div>

            <div class="minuta_clausula">Cláusula 20. Proceso periódico de evaluación.</div>
            <div class="minuta_texto">
              El contrato se evaluará de conformidad con el Modelo de Auditoría descrito en el Anexo 10 y de conformidad
              con las cláusulas 17 a 20 del presente acuerdo de voluntades.
              <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. MODELO DE AUDITORÍA DE CALIDAD. </span>
              El modelo de auditoría contempla los aspectos administrativos, financieros, técnico-científicos y de
              calidad del servicio que hacen parte del Sistema Obligatorio de Garantía de Calidad en Salud -SOGCS. La
              auditoría de la calidad de la atención de los servicios deberá desarrollarse de acuerdo con el Programa de
              Auditoría para el Mejoramiento de la Calidad -PAMEC- de cada uno de los agentes, de conformidad con lo
              establecido en el Capítulo 4 "Auditoría para el mejoramiento de la calidad de la atención de salud" del
              Título 1 de la Parte 5 del Libro 2 de Decreto 780 de 2016 o según la norma que los modifique, adicione o
              sustituya.
              <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. MODELO DE AUDITORÍA DE CUENTAS MÉDICAS. </span>
              La auditoría de las cuentas médicas se realizará con base en los soportes definidos en el marco normativo
              vigente, con sujeción a los estándares establecidos en el Manual Único de Devoluciones, Glosas y
              Respuestas expedido por el Ministerio de Salud y Protección Social, conforme a los términos señalados en
              el trámite de glosas establecido en el mismo y de acuerdo con la información reportada y validada en el
              Registro Individual de Prestaciones de Salud.
            </div>

            <div class="minuta_clausula">Cláusula 21. Reportes obligatorios.</div>
            <div class="minuta_texto">
              PSS/PTS reportará a la ERP dentro de los primero cinco (5) días HÁBILES de cada mes vencido: 1. Los
              Indicadores de calidad de la atención de salud establecidos en el Anexo 9, a través de los mecanismos que
              la ERP establezca; especialmente el reporte de la resolución 1552 de 2013 deben hacerlo a través de la
              plataforma Genesis en el módulo salud/1552. 2. Los Indicadores de reporte obligatorio en las normas
              vigentes de la Superintendencia Nacional de Salud;3. Los casos de sospecha de reacciones adversas a
              medicamentos deben ser notificados en el formato del INVIMA. 4. Todos los reportes obligatorios del
              SIVIGILA según las pautas, formatos, manuales de vigilancia epidemiológica vigentes del Instituto;
              5. La información de las actividades de protección específica y detección temprana (PEDT) en la
              estructura, formato y periodicidad que determinada por el Ministerio de Salud y Protección Social, dentro
              de los 20 primeros días de cada mes. 6. Reportes detallados de dispensación.
            </div>

            <div class="minuta_clausula">Cláusula 22. Mecanismos y plazos para la entrega y actualización de la
              información de los afiliados.</div>
            <div class="minuta_texto">
              En cumplimiento de lo establecido en el Decreto 780 de 2016 en su artículo 2.1.3.5, Decreto 1427 de 2022,
              y en el Decreto 441 de 2022, donde se establece la obligación a las entidades de implementar estrategias
              que permitan garantizar la actualización de la base de contactos de los afiliados, se establecen los
              mecanismos y plazos para la entrega y actualización de la información de los afiliados a la ERP: 1. El
              PSS/PTS reportará los soportes de documento de identidad legible de los afiliados que al momento de la
              atención registren documento evolucionado y/o distinto a la información reportada por el sistema de
              información de la ERP, esto con el fin de realizar las novedades a que haya lugar y así lograr mantener el
              documento actualizado de cada uno de nuestros afiliados al correo notificaciones@cajacopieps.com, con el
              asunto Reporte de novedades - Actualización de documento. 2. El reporte deberá ir acompañado de una tabla
              en Excel con los siguientes datos del afiliado que presente la novedad: tipo de documento, número de
              documento, nombres y apellidos completos, dirección de residencia, teléfono (s), e-mail y soporte.
            </div>

            <div class="minuta_clausula">Cláusula 23. Facturación y glosas.</div>
            <div class="minuta_texto">
              EL PSS/PTS radicará antes a la ERP la Factura Electrónica de Venta (FEV) dentro de los plazos y
              condiciones establecidos en la ley y reglamentos vigentes, utilizando el canal transaccional descrito en
              el Anexo 17 del presente contrato. La FEV deberá contener los RIPS y soportes completos exigidos por el
              marco normativo vigente descrito en el Anexo 1, so pena de devolución.
              <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. FACTURACIÓN INDIVIDUAL POR USUARIO. </span>
              La facturación se debe presentar de manera discriminada por cada usuario e ítem con el valor unitario
              según las tarifas definidas en la nota técnica.
              <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. CIRCULARES SOBRE REPORTES DE INFORMACIÓN. </span>
              Para todos los efectos hace parte integral de este contrato las circulares expedidas por la ERP, mediante
              las cuales se imparten indicaciones respecto a los soportes requeridos para la presentación de facturas de
              tecnologías en salud no cubiertas en el Plan de Beneficios en Salud.
              <span class="minuta_paragrafo">PARÁGRAFO TERCERO. REPORTE DE RIPS. </span>
              PSS/PTS reportará a la ERP como requisito obligatorio para la radicación de la factura, los Registros
              Individuales de Prestación de Servicios de Salud RIPS utilizando: 1. La clasificación única de
              procedimientos CUPS, 2. La codificación única que determine el Ministerio de La Protección Social para los
              insumos y dispositivos médicos, a los cuales el INVIMA haya otorgado registro sanitario. 3. Todos los
              medicamentos deberán ser reportados en códigos CUMS (expediente + consecutivo) según base de datos Invima
              vigente. Adicionalmente, los RIPS deben corresponder con los códigos y valores de los servicios,
              medicamentos e insumos definidos en la Nota Técnica.
              <span class="minuta_paragrafo">PARÁGRAFO CUARTO. FACTURACIÓN DEL ÚLTIMO MES DEL CONTRATO. </span>
              EL PSS/PTS deberá presentar las facturas por la prestación de servicios dentro de la misma vigencia del
              contrato y las atenciones del último mes, a más tardar al mes siguiente.
              <span class="minuta_paragrafo">PARÁGRAFO QUINTO. NOTIFICACIÓN DE PRESTACIÓN. </span>
              La prestación del servicio, entrega del medicamento o insumo, se deberá realizar finalizada la atención
              del afiliado en un periodo no mayor a tres días posteriores a esta, en el portal dispuesto para tal fin.
              Sin dicha validación se dará por no prestado el servicio o entregado el medicamento o insumo, lo que
              impedirá la radicación de la factura.
              <span class="minuta_paragrafo">PARÁGRAFO SEXTO. DESCUENTOS. </span>
              Las partes acuerdan que se realizarán descuentos sobre el valor del presente contrato en los eventos
              especificados a continuación los cuales se concretarán en el acta de negociación: 1. Si el PTS no cumple
              con las metas establecidas en los anexos de evaluación de indicadores y con el reporte de los mismos en
              los tiempos estipulados. 2. Se estipula un descuento del 3.5% por no cumplimiento del indicador de
              oportunidad y 3.5% por no cumplimiento en el reporte oportuno y de calidad de información de 3. Para la
              aplicación de los descuentos se seguirá el procedimiento establecido en la Resolución 3253 de 2009 en el
              Anexo Técnico Manual Único de Glosas, Devoluciones y respuestas, de acuerdo con la Resolución 3047 de 2008
              modificada por la Resolución 416 de 2009 y las demás normas que lo adicionen, modifiquen o sustituyan.
            </div>

            <div class="minuta_clausula">Cláusula 24. Plazos de pago.</div>
            <div class="minuta_texto">
              Los plazos de pago son los establecidos en la Ley 1122 de 2007, artículo 13, literal d; Ley 1438 de 2011,
              artículo 56 y 57; Ley 1231 de 2008; Ley 2024 de 2020; Decreto 1733 de 2020; Decreto 441 de 2022, y demás
              normas que modifiquen, adicionen o sustituyan.
            </div>

            <div class="minuta_clausula">Cláusula 25. Mecanismos de solución de conflicto.</div>
            <div class="minuta_texto">
              Cuando surjan discrepancias como consecuencia de la suscripción, ejecución, terminación y/o liquidación
              del presente contrato, o en la interpretación de las normas aplicables, se utilizarán como mecanismos de
              solución en la primera instancia la búsqueda de soluciones ágiles y rápidas y en forma directa, por lo que
              deberán efectuarse dos (2) reuniones entre las partes, que pueden ser solicitadas por cualquiera de éstas
              con diferencia de treinta (30) días entre cada una de ellas. En caso de no llegar a un acuerdo en la
              primera instancia, se podrá hacer uso en segunda instancia del proceso de conciliación ante la
              Superintendencia Nacional de Salud una vez trascurrido el término anterior. En caso de fracasar la segunda
              instancia, toda controversia o diferencia relativa a este acuerdo de voluntades, se resolverá ante la
              justicia ordinaria.
            </div>

            <div class="minuta_clausula">Cláusula 26. Causales de terminación del contrato.</div>
            <div class="minuta_texto">
              El presente contrato podrá terminarse por: 1. Por mutuo acuerdo. 2. Por incumplimiento de las obligaciones
              del PSS/PTS contenidas o emanadas del presente contrato. 3. Por fuerza mayor o caso fortuito demostrado.
              4. Cuando el término de suspensión supere los 4 meses, sin que se haya reanudado el contrato, 5. Por
              revocatoria de funcionamiento de una de las partes. 6. Por orden de autoridad pertinente y/o competente.
              7. Cuando la ERP documente no conformidades graves en los procesos de atención y/o facturación de los
              servicios. 8. Cualquier sanción impuesta por parte de las Autoridades de Inspección, Vigilancia y Control
              al PSS/PTS y que tengan que ver con hechos o actos que afecten la calidad de los servicios contratados. 9.
              La ERP podrá terminar el contrato derivado de la no ejecución de los planes de mejoramiento solicitados en
              debida forma y por escrito al PSS/PTS sin que medie justa causa para dicha omisión. 10. Por cualquier
              situación donde alguna de las partes deje de hacer presencia en el municipio de prestación del servicio.
              11. Cuando haya operado la condición resolutoria expresa. 12. Por resolución judicial debidamente
              ejecutoriada. 13. La ERP podrá terminar el contrato de manera unilateral si por causa de investigación
              administrativa, judicial o de vigilancia y control, el PSS/PTS resulte sancionado por acto que afecte el
              Código del buen Gobierno, la transparencia, la lealtad y confianza legítima de las partes. 14. La ERP
              podrá terminar el contrato de manera unilateral, cuando el PSS/PTS subcontrate sin su autorización. 15.
              Por las malas prácticas en las que pueda incurrir el PSS, por la inoportunidad en el servicio, falta de
              calidad, por cierre de las instalaciones donde presta servicio el PSS/PTS debido al paro, huelga promovida
              por trabajadores o por la comunidad, caso en el cual se podrá dar por terminado el presente acuerdo de
              voluntades con la simple comunicación expedida por la ERP. 16. Por vencimiento del plazo pactado. 17. Por
              la no entrega de informes requeridos por la ERP para el cumplimiento de sus funciones como aseguradora
              dentro del SGSSS, o la entrega inoportuna o incompleta de estos por parte del PSS. 18. Por el uso indebido
              de las bases de datos de la ERP por parte del PSS. 19. La ERP podrá dar por terminado unilateralmente el
              contrato sin que esto de lugar a indemnización, cuando el PSS/PTS no diere cumplimiento a las
              disposiciones legales relacionadas con la prevención y control al lavado de activos, el financiamiento del
              terrorismo y la financiación de la proliferación de armas de destrucción masiva nacionales o
              internacionales que les sean aplicables. 20. Cuando el PSS/PTS figure en las listas de la OFAC y/o en las
              listas nacionales e internacionales relacionadas con actividades ilícitas, estando la ERP facultado para
              efectuar las verificaciones que considere pertinentes en bases de datos públicos o privadas (de orden
              nacional o internacional) donde se relacionan personas presuntamente vinculadas a cualquier actividad
              ilícita. 21. Cuando exista en contra del PSS/PTS una sentencia judicial en firme que lo condene por la
              comisión de los delitos de lavado de activos, financiación del terrorismo y la financiación de la
              proliferación de armas de destrucción masiva nacionales o internacionales o se encuentren vinculados en
              investigaciones o procesos penales por dichos delitos, o exista información pública con respecto a tales
              personas que puedan colocar a la ERP frente a un riesgo legal o reputacional. 22. Cuando se presenten
              elementos que puedan representar para la ERP, riesgos reputacionales, legales, operativos o de contagio
              relacionados con el lavado de activos la financiación del terrorismo y la financiación de la proliferación
              de armas de destrucción masiva nacionales o internacionales. 23. Cuando se presenten elementos que
              conlleven a dudas fundadas sobre la legalidad de las operaciones del PSS, la licitud de sus recursos o que
              el PSS/PTS ha efectuado transacciones u operaciones destinadas a dichas actividades o a favor de personas
              relacionadas con las mismas. 24. Cuando se presenten inconsistencias, discrepancias o falsedades en la
              documentación e información aportada por el PSS/PTS para la celebración y ejecución del contrato y que
              conlleve a dudas fundadas sobre la legalidad de las operaciones del PSS. 25. Por decisión unilateral de la
              ERP, con previo aviso de treinta (30) días calendario, sin que haya lugar a indemnización alguna.
              <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. REQUERIMIENTO PARA TERMINACIÓN DEL CONTRATO. </span>
              La ERP a través del supervisor de este contrato, requerirá por escrito al PSS/PTS precisándole el
              incumplimiento de una o varias de las obligaciones pactadas, exigiéndole que en un plazo no mayor a cinco
              (5) días hábiles contados a partir del recibo de la comunicación, presente las explicaciones
              correspondientes o según el caso, cumpla con lo pactado, informándole las consecuencias de no atender el
              requerimiento. Si vencido el plazo el PSS/PTS no responde, o sus explicaciones no son satisfactorias para
              la ERP, o no realiza las actividades correctivas solicitadas, la ERP quedará en libertad de terminar
              unilateralmente el contrato, y en este caso lo anunciará al PSS/PTS mediante comunicación escrita con una
              antelación no menor a 30 días calendario respecto de la fecha de terminación deseada.
              <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. CESACIÓN EN LA PRESTACIÓN DE SERVICIOS. </span>
              EL PSS/PTS en ninguna circunstancia podrá suspender, retirar servicios de salud objeto del presente
              contrato o cesar la prestación de estos, conducta que se considerará como incumplimiento grave en las
              obligaciones del PSS. Para que la suspensión, retiro o cesación de los servicios se entienda válida y no
              constituya incumplimiento alguno, debe ser notificada mediante escrito y dentro de los sesenta (60) días
              anteriores a la fecha de suspensión, cesación o retiro del servicio, en donde deberá justificar el motivo
              de la suspensión, debiendo esta solicitud ser aceptada por la ERP para que pueda realizarse por parte del
              PSS. De lo contrario, éste deberá continuar prestando los servicios contratados.
              <span class="minuta_paragrafo">PARÁGRAFO TERCERO. </span>
              Cualquiera sea la causa de terminación del presente contrato, para todos los efectos de este, se surtirán
              todos los alcances de la terminación del artículo 2.5.3.4.16 del Decreto 780 de 2016, sin detrimento de la
              resolución y/o conciliación de cuentas que eventualmente queden pendientes y que serán resueltas en los
              tiempos dispuestos por la legislación especial sobre la materia.
            </div>

            <div class="minuta_clausula">Cláusula 27. Liquidación del contrato.</div>
            <div class="minuta_texto">
              El presente acuerdo de voluntades se liquidará por mutuo acuerdo de las partes, dentro de los cuatro (4)
              meses siguientes a esta. La ERP y el PSS/PTS suscribirán acta de liquidación en la cual se consignarán los
              ajustes, revisiones y reconocimientos a que haya lugar, los acuerdos, conciliaciones y transacciones a que
              llegaren las partes, para dirimir las divergencias presentadas y poder declararse a paz y salvo por todo
              concepto. De no haberse liquidado el presente contrato de común acuerdo en los plazos establecidos, será
              liquidado unilateralmente por EL CONTRATANTE dentro de los 12 meses siguientes a la terminación del
              contrato. Si ninguna de las partes muestra su interés efectivo por liquidar el contrato, y no realiza ni
              una comunicación física o electrónica durante los doce (12) meses siguientes a la terminación del
              contrato, se entiende que ambas partes aceptan estar a paz y salvo por todo concepto y condonar toda deuda
              existente entre ellas.
            </div>

            <div class="minuta_clausula">Cláusula 28. Incentivos pactados.</div>
            <div class="minuta_texto">
              Las partes pactarán en el acta de Iniciación del Contrato el reconocimiento de incentivos de tipo
              económico o no económico por la mejoría, logro y mantenimiento de resultados de los indicadores pactados,
              eligiendo un mecanismo que estimule la prestación y provisión de servicios y tecnologías basado en valor,
              de acuerdo con el objeto del acuerdo de voluntades.
            </div>

            <div class="minuta_clausula">Cláusula 29. Canales de relacionamiento.</div>
            <div class="minuta_texto">
              Los canales de relacionamiento entre las partes son los establecidos en el Anexo 17.
            </div>

            <div class="minuta_clausula">Cláusula 30. Garantías.</div>
            <div class="minuta_texto">
              El PSS/PTS mantendrá vigente una Póliza de responsabilidad civil, contractual y extracontractual médica
              para amparo a terceros por servicios derivados de la atención en salud, por un valor asegurado que
              corresponda al 10% del presente contrato y que ampare el tiempo de ejecución de este, quedando obligada a
              responder con recursos propios por la diferencia que pueda existir entre el valor asegurado y el valor de
              las eventuales indemnizaciones derivadas del daño ocurrido. El PSS/PTS hará entrega de la póliza a la ERP
              dentro de los tres (3) días siguientes a la suscripción del contrato.
              <span class="minuta_paragrafo">PARÁGRAFO. </span>
              La aprobación de la póliza aportada será remitida por parte de la ERP al PSS/PTS en los 5 días hábiles
              siguientes.
            </div>

            <div class="minuta_clausula">Cláusula 31. Cesión.</div>
            <div class="minuta_texto">
              El PSS/PTS no podrá ceder total o parcialmente el presente contrato sin la autorización de la ERP.
              <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. </span>
              El presente contrato al igual que los derechos y obligaciones emanados de la ejecución de este, será
              cedido de conformidad a lo establecido en el Artículo 2.1.13.9. Procesos de reorganización institucional
              del Decreto 780 de 2016 Decreto único reglamentario del sector salud y sus modificaciones, conforme a lo
              establecido en el numeral 87.2 del artículo 87 del Decreto 2353 de 2015, a la entidad promotora de salud
              resultante del proceso de Reorganización institucional.
              <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. </span>
              Las cesiones de créditos que suscriba la ERP con un tercero NO surtirán efectos sobre los créditos, saldos
              y/o facturas que se generen con ocasión de la ejecución del presente contrato, si no cuentan con la
              autorización expresa y por escrito de la ERP. La cesión requerirá de la suscripción de un contrato de
              cesión con las mismas disposiciones del actual sin que represente costo alguno para la ERP.
            </div>

            <div class="minuta_clausula">Cláusula 32. Régimen jurídico del contrato.</div>
            <div class="minuta_texto">
              El presente acuerdo de voluntades se rige por el derecho privado y el marco normativo descrito en el Anexo
              1. Le son aplicables los procesos precontractuales, contractuales y post contractuales descritos en el
              Decreto 441 de 2022, adoptados en el Manual de Contratación de la ERP.
            </div>

            <div class="minuta_clausula">Cláusula 33. Cláusula penal pecuniaria.</div>
            <div class="minuta_texto">
              A) COMPENSATORIA: El incumplimiento parcial o total de las obligaciones derivadas de este contrato por el
              PSS, genera el derecho para Ia ERP a exigir el pago de una suma equivalente al 10% del valor estimado del
              contrato.
              <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. </span>
              El PSS/PTS autoriza a la ERP para que el valor de la CLÁUSULA PENAL a que se refiere esta cláusula sea
              descontado del saldo pendiente de pago a su favor en virtud del presente acuerdo de voluntades o por
              cualquier relación comercial entre las partes. Si no lo hubiese, podrá cobrarse por la vía ejecutiva,
              renunciando el PSS/PTS con la suscripción del presente contrato a requerimientos judiciales o
              extrajudiciales, de manera que este documento y la liquidación de los perjuicios constituye título
              ejecutivo para el cumplimiento de la sanción pecuniaria, para lo cual este acuerdo de voluntades prestará
              mérito ejecutivo. Asimismo, en el evento en que se causen intereses de mora por cualquier concepto, la
              tasa de interés aplicable será la máxima legal comercial certificada por la Superintendencia Financiera, o
              quien haga sus veces, a la fecha de la causación de estos.
              <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. </span>
              La ERP podrá cobrar la pena establecida en la presente cláusula, y a su vez exigir el cumplimiento del
              acuerdo de voluntades, por tanto, el pago de la pena no extingue el cumplimiento de las obligaciones
              pactadas.
            </div>

            <div class="minuta_clausula">Cláusula 34. Prevención del lavado de activos y financiación del terrorismo.
            </div>
            <div class="minuta_texto">
              El PSS/PTS y la ERP certifican que sus recursos no provienen ni se destinan al ejercicio de ninguna
              actividad ilícita o de actividades de lavado de activos provenientes de éstas o de actividades
              relacionadas con la financiación del terrorismo. Las partes se obligan a realizar todas las actividades
              encaminadas a asegurar que sus administradores y empleados y los recursos de estos, no se encuentren
              relacionados o provengan, de actividades ilícitas, particularmente de lavado de activos o financiación del
              terrorismo. En todo caso, si durante el plazo de vigencia del contrato las partes, algunos de sus
              administradores, socios o empleados llegaren a resultar involucrados en una investigación de cualquier
              tipo (penal, administrativa, etc.) relacionada con actividades ilícitas, lavado de dinero o financiamiento
              del terrorismo, o fuese incluido en listas nacionales o internacionales como las de la ONU, OFAC, entre
              otras, la ERP o el PSS/PTS pueden terminar unilateralmente el acuerdo de voluntades sin que por este hecho
              esté obligado a indemnizar ningún tipo de perjuicio a la otra parte. De la misma forma, el PSS/PTS declara
              que los recursos que incorpora para el logro de la ejecución del contrato proceden de actividades
              completamente lícitas. Durante la vigencia del presente acuerdo de voluntades, el PSS/PTS no podrá
              vincular como trabajador o empleado a personas que se encuentren vinculadas en la planta de la ERP, o
              ejerza auditoría para este, so pena de multa por el valor del 20% del presente acuerdo de voluntades. Así
              mismo, se reportará tal acción ante los entes de control, judiciales, fiscales y disciplinarios para que
              se inicien las investigaciones que correspondan.
              <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. CONSULTA DE ANTECEDENTES. </span>
              El PSS/PTS autoriza a la ERP, la consulta, verificación en cualquier base de datos, listas restrictivas y
              públicas. El PSS/PTS deberá suministrar a la ERP toda la información acerca del origen de los fondos,
              composición accionaria y beneficiario final de la empresa cuando este así lo requiera.
              <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. COMPROMISOS RELACIONADOS. </span>
              Cada una de las partes se compromete a cumplir la Constitución, leyes y reglamentos aplicables a la
              prevención del soborno y a favor de la transparencia, así como a involucrarse únicamente en negocios
              legítimos y prácticas éticas en sus operaciones comerciales, sus relaciones o transacciones con cualquier
              empleado o funcionario vinculado con cualquiera de las partes o de cualquier otra entidad que pertenezca o
              sea dirigida o controlada por alguna de las partes, o con partidos políticos o sus candidatos. Ninguna de
              las partes ni sus directivos, directores, empleados o agentes pagará, ofrecerá, entregará, prometerá o
              autorizará el pago, directa o indirectamente, de cualquier importe, regalo u objeto o actividad valorable
              económicamente a ningún contacto comercial o Empleado gubernamental con la intención o propósito de
              inducir a dicha persona a ejercer su autoridad para ayudar a la otra parte o a cualquier afiliado de la
              otra parte a cambio de una ganancia personal. El Pago prohibido no incluye el pago de gastos razonables
              efectuados de buena fe, como los costos de desplazamiento y alojamiento que estén directamente
              relacionados con la promoción, demostración o explicación de productos o servicios o con la ejecución o
              realización de un contrato, siempre y cuando dichos pagos estén permitidos por las Leyes aplicables.
            </div>

            <div class="minuta_clausula">Cláusula 35. Autorización del tratamiento de datos personales.</div>
            <div class="minuta_texto">
              La ERP como responsable del tratamiento de los datos personales objeto del presente contrato, autoriza al
              PSS/PTS en calidad de encargado del tratamiento de datos personales, para realizar el tratamiento de la
              información personal contenida en la(s) base(s) de datos a las que se tenga acceso en desarrollo del
              acuerdo de voluntades respecto de las cuales la ERP declara contar con la autorización previa, libre,
              informada, expresa e inequívoca de sus titulares, garantizando el suministro de la información de forma
              veraz, completa, exacta, actualizada, comprobable y comprensible para las finalidades propias de la
              presente contratación.
              <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. </span>
              El PSS/PTS se compromete a tratar los datos personales que reciba con ocasión de la relación contractual
              que tiene con la compañía única y exclusivamente para las finalidades necesarias para desarrollar el
              objeto del presente acuerdo de voluntades, respetando el derecho a la vida privada y a la intimidad de los
              titulares de los datos personales de quienes hará tratamiento, a implementar las medidas de seguridad
              necesarias, a cumplir con todas las obligaciones del artículo 18 de la ley 1581 de 2012 y a no divulgar
              los datos personales ni la información que sea suministrada a lo largo de la relación con la compañía. En
              caso de que se presente un incidente de seguridad con los datos personales deberá reportarlo de inmediato
              a la ERP. Al momento de la terminación del acuerdo de voluntades, el PSS/PTS deberá devolver o destruir la
              información de las bases de datos personales de acuerdo con las indicaciones de la ERP.
              <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. HABEAS DATA. </span>
              En cumplimiento de lo dispuesto en el marco normativo vigente en lo correspondiente a la protección de
              datos personales, las partes declaran que son conocedoras y aceptan que en caso que en desarrollo del
              objeto de este contrato las partes lleguen a realizar tratamiento de datos personales o sensibles en los
              términos de la normatividad, se obligan a respetar, mantener absoluta reserva y confidencialidad y de
              cualquier manera garantizar la seguridad y privacidad de la información y/o datos personales sensibles que
              le sean transmitidos o que de cualquier forma o medio llegue a conocer y/o que sean por éste recolectados,
              almacenados, usados, objeto de circulación o en general de cualquier operación o conjunto de operaciones,
              bajo los términos y/o condiciones que indique tanto la normatividad vigente como la Política para el
              Tratamiento de la Información y/o datos personales que haya sido adoptada por cada una de las partes. Así
              mismo, se obligan a contar con los medios técnicos, humanos y administrativos que sean necesarios para
              otorgar confidencialidad y seguridad a los datos evitando su adulteración, pérdida, consulta, uso o acceso
              no autorizado o fraudulento y garantizando que la información es veraz, completa, exacta, actualizada,
              comprobable y comprensible. Así entonces, queda expresamente prohibido disponer, usar, difundir y/o
              transmitir de cualquier modo la información y/o datos sensibles o personales a los que tenga acceso en
              desarrollo del presente contrato, ya que dicha información debe ser recolectada, conservada y usada única
              y exclusivamente para el desarrollo de este y bajo la confidencialidad y seguridad antes anotada.
              <span class="minuta_paragrafo">PARÁGRAFO TERCERO. MECANISMO DE ENTREGA Y ACTUALIZACIÓN DE INFORMACIÓN.
              </span>
              EL PSS/PTS deberá reportar e informar mensualmente a la ERP las novedades en la actualización de los datos
              de identificación, dirección, contacto, etc, de los usuarios que identifique, mediante el mecanismo que
              las partes adopten para la entrega y actualización de información. LAS PARTES pactan que recibirán
              notificaciones en los correos electrónicos reportados en el presente acuerdo de voluntades.
            </div>

            <div class="minuta_clausula">Cláusula 36. Póliza de Responsabilidad Civil.</div>
            <div class="minuta_texto">
              En consonancia y cumplimiento de la Clausula 30 (Garantías) de este contrato, el PSS/PTS responderá por
              todos los daños patrimoniales y extrapatrimoniales que sean causados a los usuarios a su cargo en el nivel
              asistencial, así como también por toda reclamación administrativa y judicial que contra esta se llegare a
              presentar de forma directa o indirecta con ocasión de los servicios objeto del presente contrato. Es
              obligación del PSS, la eficiente prestación de los servicios contratados, en todo caso, mantendrá indemne
              a la ERP, de cualquier reclamación proveniente de terceros que tenga como causa las actuaciones del
              PSS/PTS o del personal designado para el cumplimiento del Contrato. En el evento, de acciones jurídicas
              legales contra la ERP, se entenderá que el proceso no se puede desarrollar sin la presencia procesal del
              PSS.
              <span class="minuta_paragrafo">PARÁGRAFO. LLAMAMIENTO EN GARANTÍA. </span>
              Salvo la responsabilidad inherente a cada parte con relación a las obligaciones contraídas en el presente
              contrato. La ERP no asumirá ninguna responsabilidad civil o penal derivada de la deficiencia o inadecuada
              prestación de los servicios objeto del contrato por parte de EL PSS, o del personal a su cargo. En el
              evento de que la ERP sea requerida judicial o extrajudicialmente para asumir responsabilidades o
              indemnizaciones derivadas de tales eventos, llamará en garantía a EL PSS/PTS y, si es condenado repetirá
              contra EL PSS/PTS para el reembolso de las sumas que por tal motivo haya tenido que cancelar.
            </div>

            <div class="minuta_clausula">Cláusula 37. No relación laboral.</div>
            <div class="minuta_texto">
              Este contrato no constituye vínculo de trabajo entre la ERP y el PSS/PTS ni el personal que el contrate
              para el desarrollo del acuerdo de voluntades. En consecuencia, la ERP sólo responderá por los emolumentos
              pactados en el mismo. Son de su exclusiva responsabilidad los salarios, prestaciones o cualquier otro pago
              similar que se cause o deba hacerse a las personas que emplee PSS/PTS para el cumplimiento de sus
              obligaciones.
            </div>

            <div class="minuta_clausula">Cláusula 38. Modificación, adición y cesión.</div>
            <div class="minuta_texto">
              Las modificaciones y las adiciones del presente contrato podrán elaborarse como Otrosí, el cual hará parte
              de este contrato y donde deberán consignarse los nombres de las partes, su documento de identidad y fecha
              en que se efectúe la modificación y su aceptación clara y expresa mediante sus firmas.
              <span class="minuta_paragrafo">PARÁGRAFO. ESCISIÓN. </span>
              La ERP se encuentra debidamente habilitada para operar en el Sistema General de Seguridad Social en Salud
              mediante oficio con radicado 20223100101662251 del 28 de noviembre de 2022 emanado de la Superintendencia
              Nacional de Salud a partir del 01 de diciembre de 2022, por lo que el único obligado en el presente
              contrato en calidad de CONTRATANTE es CAJACOPI EPS S.A.S.
            </div>

            <div class="minuta_clausula">Cláusula 39. Prohibiciones.</div>
            <div class="minuta_texto">
              EL PSS/PTS no podrá: 1. Realizar prácticas discriminatorias en su atención a los usuarios; 2. Divulgar
              cualquier información relacionada con los pacientes, salvo la que requiera la ERP para efectos de este
              contrato o la autoridad competente o que sea solicitada directamente por el afiliado, siendo obligación de
              EL PSS/PTS obtener las autorizaciones del caso por parte de la paciente previa o durante la prestación de
              los servicios de salud;3. Ceder el presente contrato en todo o en parte. 4. Subcontratar los servicios
              objeto del presente contrato.
            </div>

            <div class="minuta_clausula">Cláusula 40. Restricciones para contratar.</div>
            <div class="minuta_texto">
              Las partes afirman bajo la gravedad del juramento que se entiende prestado con la suscripción de este
              contrato que no se encuentran incursos en Conflictos de tipo financieros, Conflictos que revelen
              favoritismo o nepotismo y Conflicto de Roles o funciones, que puedan contaminar la suscripción, ejecución,
              terminación y liquidación del presente acuerdo de voluntades.
              <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. INHABILIDADES E INCOMPATIBILIDADES. </span>
              Las partes afirman bajo la gravedad del juramento que se entiende prestando con la firma del presente
              contrato que no se hallan incursos en ninguna de las causales de inhabilidades e incompatibilidades
              descritas en el marco legal vigente. La violación a la norma jurídica citada es causal de terminación
              unilateral del presente contrato por parte de la ERP.
              <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. AUTORIZACION DE TOPES PRESUPUESTALES DEL PSS. </span>
              El PSS/PTS a través de su Representante Legal o quien haga sus veces, afirma bajo la gravedad del
              juramento que cuenta con la autorización respectiva para comprometerse con el valor del presente contrato
              y lo establecido en el objeto contractual. En caso de que el valor de presente contrato supere los topes
              presupuestales autorizados, deberá presentar los documentos o información adicional ante la ERP, que los
              habilite para obligarse con el valor contratado. la ERP.
            </div>

            <div class="minuta_clausula">Cláusula 41. Causales de suspensión.</div>
            <div class="minuta_texto">
              Además de las causales de terminación previstas por la ley, el presente contrato se suspenderá en todos
              sus efectos, cuando quiera que ocurra una de las siguientes causas: 1) Cuando se adelante investigación
              administrativa, disciplinaria, civil o penal o adelantada por un ente de vigilancia y control por
              irregularidades cometidas por EL PSS/PTS y dependencias y dependientes, a discreción de la ERP y en
              consideración a la gravedad de los hechos motivo de la investigación. 2) Imposibilidad de carácter
              temporal de cualquiera de las partes para el cumplimiento de sus obligaciones contractuales, siempre que
              se informe a la otra parte con una antelación no inferior a treinta (30) días. Salvo en el caso del
              numeral 1 de esta cláusula y solo en lo que legalmente pueda corresponder, la suspensión del contrato no
              genera indemnización a favor de alguna de las partes.
            </div>

            <div class="minuta_clausula">Cláusula 42. Origen de los recursos.</div>
            <div class="minuta_texto">
              Los recursos para la ejecución del presente contrato son provenientes del Sistema General de Seguridad
              Social en Salud mediante la ADRES y se incorporan al presupuesto de la ERP bajo las reglas establecidas en
              el marco legal vigente, respetando siempre su destinación.
            </div>

            <div class="minuta_clausula">Cláusula 43. Régimen de transparencia.</div>
            <div class="minuta_texto">
              Las partes manifiestan bajo la gravedad del juramento que no se encuentra incumpliendo el Régimen de
              transparencia y no existe conflicto de interés para contratar.
            </div>


            <div class="minuta_clausula">Cláusula 44. Anexos</div>
            <div class="minuta_texto">
              Hacen parte del presente contrato, los siguientes anexos los cuales la ERP y el PSS/PTS aceptan con la
              suscripción:
            </div>




            <div class="minuta_texto page_break_after display_none">Son anexos del presente contrato, además de la
              documentación legal de cada una de las partes, los siguientes:</div>
            <br>

            <table id="table_anexos" class="">
              <thead>
                <tr class="">
                  <th>ANEXO CONTRACTUAL</th>
                  <th class="text-center">APLICA (SI/NO)</th>
                  <th>ANEXO CONTRACTUAL</th>
                  <th class="text-center">APLICA (SI/NO)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Anexo 1. Marco normativo</td>
                  <td class="text-center">SI</td>
                  <td>Anexo 11. Mecanismos de ajuste de riesgo</td>
                  <td class="text-center">NO</td>
                </tr>
                <tr>
                  <td>Anexo 2. Glosario de términos</td>
                  <td class="text-center">SI</td>
                  <td>Anexo 12. Relación de GPC y protocolos de atención</td>
                  <td class="text-center">SI</td>
                </tr>
                <tr>
                  <td>Anexo 3. Modelo de atención de Cajacopi EPS</td>
                  <td class="text-center">SI</td>
                  <td>Anexo 13. Enlace de Redes Integrales de Atención en Salud</td>
                  <td class="text-center">NO</td>
                </tr>
                <tr>
                  <td>Anexo 4. Caracterización de la población afiliada</td>
                  <td class="text-center">SI</td>
                  <td>Anexo 14. Listado de precios de medicamentos</td>
                  <td class="text-center">{{DATA.SERVICIO_714}}</td>
                </tr>
                <tr>
                  <td>Anexo 5. Nota Técnica</td>
                  <td class="text-center">NO</td>
                  <td>Anexo 15. Listado de precios de insumos, dispositivos y otras tecnologías</td>
                  <td class="text-center">SI</td>
                </tr>
                <tr>
                  <td>Anexo 6. Modelo de prestación de servicios</td>
                  <td class="text-center">SI</td>
                  <td>Anexo 16. Red integral de prestadores de servicios de salud</td>
                  <td class="text-center">SI</td>
                </tr>
                <tr>
                  <td>Anexo 7. Relación de sedes de atención y servicios</td>
                  <td class="text-center">SI</td>
                  <td>Anexo 17. Canales transaccionales y de contacto</td>
                  <td class="text-center">SI</td>
                </tr>
                <tr>
                  <td>Anexo 8. Capacidad instalada disponible</td>
                  <td class="text-center">NO</td>
                  <td>Anexo 18. Acuerdo de confidencialidad</td>
                  <td class="text-center">SI</td>
                </tr>
                <tr>
                  <td>Anexo 9. Indicadores de operación del acuerdo de voluntades</td>
                  <td class="text-center">SI</td>
                  <td>Anexo 19. Estimación poblacional para el contrato</td>
                  <td class="text-center">NO</td>
                </tr>
                <tr>
                  <td>Anexo 10. Formato de supervisión de los contratos</td>
                  <td class="text-center">SI</td>
                  <td>Anexo 20. Población objeto del contrato</td>
                  <td class="text-center">SI</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Anexo 21. Anexo Técnico</td>
                  <td class="text-center">NO</td>
                </tr>
                <tr ng-show="mostrar_anexo22">
                  <td></td>
                  <td></td>
                  <td>Anexo 22. Incentivos no económicos</td>
                  <td class="text-center">SI</td>
                </tr>

              </tbody>
            </table>

            <br>
            <div class="minuta_clausula">Cláusula 45. Domicilio contractual.</div>
            <div class="minuta_texto">Para todos los efectos del presente contrato, se tendrá como domicilio contractual
              el descrito en la portada del presente contrato.</div>

            <div class="minuta_clausula">Cláusula 46. Perfeccionamiento del contrato.</div>
            <div class="minuta_texto">
              El presente Contrato se considerará perfeccionado en el instante en que sea suscrito por las partes
              contratantes. Con el fin de agilizar y simplificar este procedimiento, se determina que el contrato
              también alcanzará su pleno perfeccionamiento y validez cuando los representantes legales de las personas
              jurídicas involucradas introduzcan una firma manuscrita, la cual puede ser una firma escaneada. Se
              establece de manera expresa que estas firmas electrónicas poseerán la misma fuerza legal y efectos
              jurídicos que una firma manuscrita tradicional."
            </div>

            <div class="minuta_clausula">Cláusula 47. Efecto</div>
            <div class="minuta_texto">
              El presente acuerdo de voluntades deja sin efecto cualquier otro acuerdo de voluntades verbal o escrito
              entre las partes, efectuado con anterioridad, en relación con el mismo objeto y bajo el mismo mecanismo de
              pago aquí establecido, sin perjuicio que se sigan cumpliendo las obligaciones económicas derivadas de la
              prestación de servicios con ocasión del contrato anterior, hasta extinguirse por cumplimiento.
            </div>
            <br>
            <div class="minuta_texto">Leído el presente documento lo suscriben las partes como aparecen, en señal de
              conformidad, en dos originales, en la ciudad de Barranquilla,
              entendiéndose perfeccionado con la firma de este.</div>

          </div>

          <!--  -->
          <div id="firma2">
            <div style="width:49%">
              <div>
                <span> _________________________________________________________</span>
                <br>
                <span class="text-left text-bold7">CONTRATANTE</span>
                <br>
                <span>Nombre: {{DATA.REPRESENTANTE}}</span>
                <br>
                <span>Tipo ID: <span>CC</span></span>
                <br>
                <span>Número ID: <span>{{DATA.DOCUMENTO_REPRESENTANTE}} expedida en la ciudad de
                    Barranquilla</span></span>
                <br>
                <!-- <span>Cargo: <span>REPRESENTANTE LEGAL</span></span> -->
              </div>
            </div>
            <div style="width:50%">
              <div>
                <span> _________________________________________________________</span>
                <br>
                <span class="text-left text-bold7">CONTRATISTA</span>
                <br>
                <span>Nombre: <span>{{DATA.NOM_REPRESENTANTE}}</span></span>
                <br>
                <span>Tipo ID: <span>CC</span></span>
                <br>
                <span>Número ID: <span>{{DATA.COD_REPRESENTANTE}}</span> expedida en la ciudad de
                  {{DATA.EXPEDICION}}</span>
                <br>
                <!-- <span>Cargo: <span>GERENTE</span></span> -->
              </div>
            </div>
          </div>
          <!--  -->
          <!--  -->

          <!--  -->
        </td>
      </tr>
    </tbody>
  </table>

  <!--  -->

</body>

</html>
