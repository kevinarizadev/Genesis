<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Formato Minuta Contrato</title>
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

    /* table.report-container {
      page-break-after: avoid;
    } */


    .page_break_after {
      page-break-after: always;
    }

    /* table.report-container {
      page-break-after: always;
    } */

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
  </style>
  <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <script src="../../../bower_components/angular/angular.js"></script>
  <script src="../../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../../scripts/controllers/contratacion/formatos/formatominutacontrato_nuevoformatoController.js"></script>
</head>

<body ng-controller="formatominutacontrato_nuevoformatoController">
  <table class="report-container">
    <thead class="report-header">
      <tr>
        <th class="report-header-cell">
          <div class="header-info">
            <img style="width: 8em;" src="../../../assets/images/logo_cajacopieps.png" alt="cajacopi">
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
                    <input type="checkbox" id="regimen_1" name="regimen_1" ng-checked="DATA.SUBSIDIADO != ''" onclick="return false;">
                  </div>
                  <div style="margin: 0px 3vw;">
                    <label for="regimen_2">Contributivo:</label>
                    <input type="checkbox" id="regimen_2" name="regimen_2" ng-checked="DATA.CONTRIBUTIVO != ''" onclick="return false;">
                  </div>
                  <div style="margin: 0px 3vw;">
                    <label for="regimen_3">Contributivo Movilidad:</label>
                    <input type="checkbox" id="regimen_3" name="regimen_3" ng-checked="DATA.MOVILIDAD != ''" onclick="return false;">
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
              <td colspan="1" rowspan="{{DATA.union_temporal.length + 1}}" ng-show="DATA.union_temporal != null" class="text-center">
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
                    <input type="checkbox" id="tipo_1" name="tipo_1" ng-checked="DATA.PRESTADOR_SALUD != ''" onclick="return false;">
                  </div>
                  <div style="width: 55%;">
                    <label for="tipo_2" class="text-bold7">Proveedor de Tecnologias en Salud (PTS)</label>
                    <input type="checkbox" id="tipo_2" name="tipo_2" ng-checked="DATA.PRESTADOR_TECNOLOGIAS != ''" onclick="return false;">
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
                    <input type="checkbox" id="clase_1" name="clase_1" ng-checked="DATA.IPS != ''" onclick="return false;">
                  </div>
                  <div style="width: 55%;">
                    <label for="clase_2">IPS INDÍGENA (IPSI)</label>
                    <input type="checkbox" id="clase_2" name="clase_2" ng-checked="DATA.IPSI != ''" onclick="return false;">
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="5" class="text-center text-size8 text-right">
                <div style="display: inline-flex;width: 100%;">
                  <div style="width: 45%;">
                    <label for="clase_3">TRANSPORTE ESPECIAL DE PACIENTES (PSS)</label>
                    <input type="checkbox" id="clase_3" name="clase_3" ng-checked="DATA.PSS != ''" onclick="return false;">
                  </div>
                  <div style="width: 55%;">
                    <label for="clase_4">PROFESIÓNAL INDEPENDIENTE (PI)</label>
                    <input type="checkbox" id="clase_4" name="clase_4" ng-checked="DATA.PI != ''" onclick="return false;">
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="5" class="text-center text-size8 text-right">
                <div style="display: inline-flex;width: 100%;">
                  <div style="width: 45%;">
                    <label for="clase_5">GESTOR FARMACÉUTICO (GF)</label>
                    <input type="checkbox" id="clase_5" name="clase_5" ng-checked="DATA.GF != ''" onclick="return false;">
                  </div>
                  <div style="width: 55%;">
                    <label for="clase_6">OPERADOR LOGÍSTICO DE TECNOLOGÍAS EN SALUD (OLTS)</label>
                    <input type="checkbox" id="clase_6" name="clase_6" ng-checked="DATA.OLTS != ''" onclick="return false;">
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="5" class="text-center text-size8 text-right">
                <div style="display: inline-flex;width: 100%;">
                  <div style="width: 45%;">
                    <label for="clase_7">ORGANIZACIÓN NO GUBERNAMENTAL (ONG)</label>
                    <input type="checkbox" id="clase_7" name="clase_7" ng-checked="DATA.ONG != ''" onclick="return false;">
                  </div>
                  <div style="width: 55%;">
                    <label for="clase_8">UNIVERSIDAD (UN)</label>
                    <input type="checkbox" id="clase_8" name="clase_8" ng-checked="DATA.UN != ''" onclick="return false;">
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="5" class="text-center text-size8 text-right">
                <div style="display: inline-flex;width: 100%;">
                  <div style="width: 45%;">
                    <label for="clase_9">OBJETO SOCIAL DIFERENTE (OS)</label>
                    <input type="checkbox" id="clase_9" name="clase_9" ng-checked="DATA.OS != ''" onclick="return false;">
                  </div>
                  <div style="width: 55%;">
                    <label for="clase_10">OTROS (OT)</label>
                    <input type="checkbox" id="clase_10" name="clase_10" ng-checked="DATA.UN != ''" onclick="return false;">
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
                    <input type="checkbox" id="naturaleza_1" name="naturaleza_1" ng-checked="DATA.NATURALEZA == 'PRIVADA'" onclick="return false;">
                  </div>
                  <div style="margin: 0px 3vw;">
                    <label for="naturaleza_2">Pública:</label>
                    <input type="checkbox" id="naturaleza_2" name="naturaleza_2" ng-checked="DATA.NATURALEZA == 'PUBLICA'" onclick="return false;">
                  </div>
                  <div style="margin: 0px 3vw;">
                    <label for="naturaleza_3">Mixta:</label>
                    <input type="checkbox" id="naturaleza_3" name="naturaleza_3" ng-checked="DATA.NATURALEZA == 'MIXTA'" onclick="return false;">
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
                    <input type="checkbox" id="modalidad_1" name="modalidad_1" ng-checked="DATA.P_CAPITACION != ''" onclick="return false;">
                    <span ng-show="DATA.P_CAPITACION != ''" style="float: left;line-height: 2.2;">{{DATA.TIPO_CAPITA}}</span>
                  </div>
                  <div style="width: 55%;">
                    <label for="modalidad_2">PAQUETE</label>
                    <input type="checkbox" id="modalidad_2" name="modalidad_2" ng-checked="DATA.P_PAQUETE != ''" onclick="return false;">
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
                      <input type="checkbox" id="tipo_capita_1" name="tipo_capita_1" ng-checked="DATA.TIPO_CAPITA_X != ''" onclick="return false;">
                    </li>
                    <li>
                      <label for="tipo_capita_2">PROMOCIÓN Y MANTENIMIENTO</label>
                      <input type="checkbox" id="tipo_capita_2" name="tipo_capita_2" ng-checked="DATA.TIPO_CAPITA_X != ''" onclick="return false;">
                    </li>
                    <li>
                      <div style="width: 100%;">
                        <label for="tipo_capita_3">MEDICAMENTOS</label>
                        <input type="checkbox" id="tipo_capita_3" name="tipo_capita_3" ng-checked="DATA.TIPO_CAPITA_X != ''" onclick="return false;">
                      </div>
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
                    <input type="checkbox" id="modalidad_3" name="modalidad_3" ng-checked="DATA.P_CANASTA != ''" onclick="return false;">
                  </div>
                  <div style="width: 55%;">
                    <label for="modalidad_4">CONJUNTO INTEGRAL</label>
                    <input type="checkbox" id="modalidad_4" name="modalidad_4" ng-checked="DATA.P_CONJ_INTEGRAL != ''" onclick="return false;">
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="5" class="text-center text-right">
                <div style="display: inline-flex;width: 100%;">
                  <div style="width: 45%;">
                    <label for="modalidad_5">PAGO GLOBAL PROSPECTIVO</label>
                    <input type="checkbox" id="modalidad_5" name="modalidad_5" ng-checked="DATA.P_GLOBAL_PROSP != ''" onclick="return false;">
                  </div>
                  <div style="width: 55%;">
                    <label for="modalidad_6">PAGO POR EVENTO</label>
                    <input type="checkbox" id="modalidad_6" name="modalidad_6" ng-checked="DATA.P_EVENTO != ''" onclick="return false;">
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
                <span>Número ID: <span>{{DATA.DOCUMENTO_REPRESENTANTE}}</span> expedida en la ciudad de Barranquilla</span>
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
                <span>Número ID: <span>{{DATA.COD_REPRESENTANTE}}</span> expedida en la ciudad de {{DATA.EXPEDICION}}</span>
                <br>
                <!-- <span>Cargo: <span>GERENTE</span></span> -->
              </div>
            </div>
          </div>
          <!--  -->
          <div class="div_firmas">
            <table class="table_firma" width="100%" style="border: #FFF;">
              <tr class="border_white">
                <td colspan="1" style="width: 33%"></td>
                <td colspan="1" style="width: 33%"></td>
                <td colspan="1" style="width: 33%"></td>
              </tr>

              <tr>
                <td colspan="1" class="text-center">
                  ELABORO: Asistente Nacional de Contratación de Red y/o Auxiliar Nacional de Contratacion de Red.
                </td>
                <td colspan="1" class="text-center">
                  REVISÓ: Subgerente de Salud
                </td>
                <td colspan="1" class="text-center">
                  REVISO Y APROBO ASPECTOS JURIDICOS: Jefe de Oficina Jurídica
                </td>
              </tr>
              <tr>

                <td><br><br></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
          <!--  -->
          <div id="minuta_contrato">
            <div class="minuta_titulo">MINUTA DEL CONTRATO - NUMERO: {{DATA.NUMERO_CONTRATO}}</div>
            <div class="minuta_texto_1 mb">
              Entre los suscritos a saber: {{DATA.REPRESENTANTE}} identificado con cédula de ciudadanía Nº {{DATA.DOCUMENTO_REPRESENTANTE}} expedida en la ciudad de Barranquilla en su calidad de representante legal de {{DATA.RAZON_SOCIAL}} entidad identificada con NIT: {{DATA.EPS}}, según consta en el certificado de existencia y representación legal adjunto, quien en adelante se denominará LA ERP y {{DATA.NOM_REPRESENTANTE}} identificado(a) con cédula de ciudadanía Nº {{DATA.COD_REPRESENTANTE}} expedida en la ciudad de {{DATA.EXPEDICION}} en su calidad de representante legal de {{DATA.RAZON_SOCIAL_IPS}} entidad identificada con NIT: {{DATA.NIT}}, según consta en el certificado de existencia y representación legal y/o acta de nombramiento expedido por la Junta Directiva designada conforme a lo establecido en los estatutos y normatividad que regula la materia, entidad debidamente habilitada para operar en el Sistema General de Seguridad Social en Salud, quien en adelante se denominará EL PSS; hemos decidido suscribir el presente CONTRATO DE PRESTACIÓN DE SERVICIOS DE SALUD EN LA MODALIDAD DE PAGO POR EVENTO, tipo de contrato RECUPERACIÓN DE LA SALUD, de común acuerdo para la atención de los afiliados, al Sistema General de Seguridad Social en Salud Régimen Subsidiado/Contributivo a través de CAJACOPI EPS S.A.S., el cual se regirá por el acuerdo contenido en las siguientes cláusulas y en lo no previsto por ellas, por la normatividad legal que resulte aplicable según la naturaleza de los servicios contratados, en especial la Ley 1122 de 2007, el Decreto 4747 de 2007, , la Ley 1438 de 2011, el Decreto 1683 de 2013, la Resolución 1841 de 2013, la Ley 1751 del 2015, el Decreto 780 de 2016, la Resolución 429 del 2016, la Resolución 2515 del 2018, la Resolución 1885 del 2018 de la Administradora de los Recursos del Sistema de Seguridad Social en Salud -ADRES-, Resolución 205 de 2020, la Resolución 535 de 2020 del Ministerio de Salud y Protección Social, la Circular 013 de 2020 de la ADRES, la Resolución 2350 de 2020, el Decreto 441 de 2022, la Resolución 2811 de 2022, y por aquellas que las adicionen, modifiquen, aclaren o sustituyan, así como las que posteriormente se expidan y que sean aplicables a la naturaleza de las partes, y de los servicios objeto del presente contrato a las cuales las partes se acogerán automáticamente, una vez entren en vigencia.
            </div>
            <div class="minuta_titulo">CLAUSULADO</div>

            <div class="minuta_clausula">Cláusula 1. Objeto.</div>
            <div class="minuta_texto">El objeto del presente contrato o acuerdo de voluntades es el de prestar servicios de salud descritos en el Anexo 7 (Relación de sedes de atención y servicios de salud habilitados en REPS); para la población que se encuentra afiliada a la ERP y caracterizada en el Anexo 4 (Caracterización de la población afiliada a Cajacopi EPS), según el Modelo de Atención de la ERP contenido en el Anexo 3, según el Modelo de Prestación de Servicios del PSS que se describe en el Anexo 6, y de acuerdo a la población objeto se describe en el Anexo 20. Los servicios se sujetan a los contenidos en el Plan de Beneficios financiado con la Unidad de Pago por Capitación y los financiados con los presupuestos máximos que defina el Ministerio de Salud y Protección Social.</div>
            <div class="minuta_texto"><span class="minuta_paragrafo">PARÁGRAFO.</span> Las tecnologías en salud serán prestados a los afiliados activos al momento de la prestación de los servicios, ubicados en el territorio nacional, incluyendo los afiliados en portabilidad, considerando los grupos poblacionales vulnerables (personas con discapacidad, víctimas del conflicto armado y comunidades indígenas) para hacer efectivo el enfoque diferencial de territorio y poblacional, como estrategia para la ampliación gradual y continua del acceso a los servicios de poblaciones vulnerables a su cargo, acorde a las necesidades en salud, de conformidad con los datos sobre la ubicación geográfica y caracterización poblacional disponible en el Anexo 4.</div>

            <div class="minuta_clausula">Cláusula 2. Obligaciones del PSS.</div>
            <div class="minuta_texto">EL PSS se obliga para con la ERP a: 1. Prestar los servicios objeto del presente contrato, a los afiliados debidamente identificados y validados en la base de datos de la ERP mediante el mecanismo dispuesto para dicha verificación. 2. Permitir a la ERP o a quien este delegue el acceso a la información relacionada con el estado de salud del afiliado y la prestación de los servicios de salud, así mismo, permitirle el acceso a los documentos que requiera, de acuerdo con lo reglamentado en la Ley y en el presente contrato. 3. Suministrar información sobre la atención en salud prestada a los afiliados de la ERP que requiera cualquiera de los Organismos de dirección, inspección, vigilancia y control, en especial los indicadores de calidad de que trata la Circular Única de la Superintendencia Nacional de Salud, los eventos de salud pública, evidencia del cargue efectivo de Indicadores de monitoreo de la calidad en salud según el marco normativo del Anexo 1. 4. Cumplimiento de la calidad esperada establecida para cada indicador. 5. Vigilar que su personal asistencial y administrativo cumpla con lo estipulado en el Manual de Referencia y Contrarreferencia de la ERP. 6. Cumplir y mantener las condiciones de habilitación y suficiencia declaradas, permitiendo que la ERP las pueda verificar cuando así lo determine, según el PAMEC y el “Proceso de verificación de condiciones de habilitación”. El producto de esta verificación podrá dar como resultado el acompañamiento de la ERP a través de su auditoría para mejorar las condiciones de los servicios que lo ameriten. 7. Garantizar el suministro de los medicamentos, materiales e insumos que requieran los afiliados durante su atención, de acuerdo con los servicios contratados y descritos en los Anexos 14 y 15 y en la Nota Técnica. 8. Recibir las glosas, responderlas, conciliarlas o en su defecto aceptarlas, dentro de los plazos definidos en la normatividad vigente. 9. Gestionar las inquietudes, reclamos y/o derechos de petición de los usuarios por la mala calidad en los servicios o la no prestación de estos, respondiendo directamente al usuario con copia a la ERP, acorde a lo establecido en la Circular 008 de la Superintendencia Nacional de Salud. 10. Atender los requerimientos derivados del cumplimiento de la supervisión del presente contrato. 11. Garantizar la calidad de los insumos, materiales y medicamentos utilizados en la atención de los usuarios y responder por los costos en que se incurra por reintervenciones y complicaciones donde se demuestre que la causa de estos sea debida a la mala calidad de los materiales, insumos o medicamentos utilizados durante la prestación de los servicios. Igualmente responderá en estos casos por la responsabilidad civil o penal que se deriven de estas complicaciones. 12. Cumplir los protocolos de atención de los programas de Gestión del Riesgo de la ERP y las guías de atención integral del Ministerio de Salud y Protección Social, previamente concertadas con la ERP, en el marco de las actividades contratadas. 13. Brindar atención preferencial a las poblaciones especiales tales como víctimas de violencia, población en condición de desplazamiento forzado, reinsertados, minorías étnicas, personas con discapacidad, embarazadas, personas de la tercera edad y demás que establezca la Ley. 14. Facilitar la información sobre notificación, clasificación, intervención y estudio de casos en los eventos de vigilancia epidemiológica. 15. Entregar copia de los archivos en medio magnético a través de los mecanismos que la ERP establezca, para los reportes de los indicadores mensuales y trimestrales de oportunidad y satisfacción de los usuarios, teniendo en cuenta la estructura exigida en la Circular Única de la Superintendencia Nacional de Salud. 16. Notificar los casos de los pacientes de grupos especiales: Renales, VIH, Cáncer, Tuberculosis, Hemofilia y otras coagulopatías, Artritis, Enfermedades Huérfanas, Hipertensión Arterial, Gestantes y Diabetes Mellitus,TRasplantesy Hepatitis C, con información y soportes clínicos concernientes a su diagnóstico y atneción que es requerida para el reporte de la cuenta de Alto Costo ; para ello, la IPS deberá diligenciar el archivo de reporte de información de la cuenta de alto costo el cual debe ser entregado mensualmente dentro de los primros cinco (5) días mes vencido, cargado en la herramienta SISCAC o en la que se determine para tal fin según la normatividad vigente. 17. Diseñar e implementar el modelo de gestión del servicio farmacéutico, según lo establecen las normas vigentes. 18. Implementar los diferentes comités reglamentados por la normatividad vigente, que le apliquen. 19. Implementar el Sistema de Información y Atención al Usuario para suministrar información, orientación y atención a los afiliados. 20. Derivar a los afiliados a los programas de promoción y prevención e inducir su demanda de servicios de estos programas y dar especial énfasis a la atención de pacientes sospechosos de eventos de interés en salud pública. 21. Contar en urgencias con el kit de atención a usuarios víctimas de violencia o agresión sexual, incluyendo especialmente anticoncepción de emergencia. 22. Informar a la ERP sobre cualquier novedad en los datos del afiliado, tales como teléfonos, correos electrónicos, dirección, nacimiento o fallecimiento de usuarios que se produzca bajo su atención, enviando copia del certificado de defunción dentro de las veinticuatro (24) horas siguientes al hecho. La información de fallecidos deberá ser suministrada a la dirección médica de la ERP, utilizando los formatos establecidos en la normatividad vigente. 23. Cumplir con las condiciones sanitarias y el plan de gestión de residuos hospitalarios PGHIRS, régimen de habilitación, nombramiento de revisor Fiscal (o demostrar que no está obligado), pago de la Tasa de Contribución a la Superintendencia Nacional de Salud, mantener vigente el Registro Mercantil y demás obligaciones propias. 24. Garantizar la afiliación de sus trabajadores a la Seguridad Social y cumplir con los pagos que de ella se deriven, así como de los aportes parafiscales. 25. Garantizar los servicios para la rehabilitación física y mental de los niños, niñas y adolescentes víctimas de violencia física o sexual y todas las formas de maltrato, que esté certificadas por la autoridad competente, garantizando la atención integral para cada caso, hasta que se certifique medicamente la recuperación de las victimas según en el marco normativo vigente descrito en el Anexo 1. 26. Cumplir con lo establecido en el numeral 1.4 de la circular 026 de 2020 del ministerio de salud y Protección Social establece que “se debe aplicar, según corresponda, las guías de práctica clínica, la Guía de Intervención mhGAP, para los trastornos mentales, neurológicos y por uso de sustancias en el nivel de atención de la salud no especializada y los protocolos vigentes, a las personas con riesgos específicos en salud mental como conducta suicida, trastornos mentales y que requieren tratamientos continuos(…)” 27. Diligenciar de manera completa y clara la historia clínica y demás registros obligatorios de atención, garantizando medidas de seguridad adoptadas para el tratamiento de uso de datos personales, en especial de datos sensibles, con sujeción a lo dispuesto en la Ley Estatutaria 1581 de 2012 y sus normas reglamentarias. 28. Reportar de manera inmediata a la ERP, so pena de terminación unilateral del contrato, las novedades que se reporten en el Registro Especial de Prestadores (REPS) y la toma de medidas de seguridad sobre las sanciones impuestas por las autoridades de salud y las de Inspección, Vigilancia y Control. Para esto, la ERP verificará periódicamente en el Registro Especial de Prestadores de Servicios de Salud, la vigencia de los servicios incluidos en el presente acuerdo de voluntades, y en caso de no encontrar algún servicio habilitado, este será inhabilitado del contrato sin previo aviso y no podrá ser facturado por el PSS. 29. Gestionar oportunamente los Eventos adversos y alertas tempranas reportadas por parte de la ERP. 30. Activar la ruta de morir dignamente cuando reciba la solicitud por parte de algún afiliado. 31. Activar las rutas de protección y justicia (Instituto Colombiano de Bienestar Familiar -ICBF-, Comisarías de Familia, o Inspectores de Policía, Personerías municipales o distritales), para los casos en que pueda existir negligencia de los padres o adultos responsables en la atención de los niños, niñas y adolescentes al detectar casos de maltrato físico, psicológico, gestacional o sexual, acorde con la Ley 1438 de 2011 y la Resolución 459 de 2012, y la normatividad de la modifique y/o adicione. 32. Brindar atención preferencial a las poblaciones especiales tales como víctimas de violencia, población en condición de desplazamiento forzado, reinsertados, minorías étnicas, personas con discapacidad, embarazadas, personas de la tercera edad y demás que establezca la Ley, ofreciendo especiales garantías y esfuerzos encaminados a garantizar el derecho a la salud de las poblaciones vulnerables consideradas de especial protección. 33. Realizar el fortalecimiento de la oferta de servicios de salud en la zona rural y rural dispersa, a partir del reconocimiento de las particularidades del territorio a través del enfoque participativo y el dimensionamiento de las necesidades, de acuerdo con las dinámicas poblacionales y epidemiológicas, adaptando y adecuando los servicios y las modalidades de prestación requeridos para garantizar la atención integral con calidad, teniendo en cuenta los ámbitos territoriales urbano, rural y con población dispersa, así como los aspectos sociales y culturales. 34. Garantizar el ejercicio efectivo de los derechos de las personas en condición de discapacidad, y adoptar medidas de inclusión que faciliten el acceso y la movilidad, eliminando toda forma de discriminación por razón de la condición de discapacidad. 35. Garantizar la atención integral, acceso, oportunidad e inclusión de las personas con discapacidad a cada uno de sus servicios de salud en todos los componentes de atención, de acuerdo con sus competencias, responsabilidades y funciones en el marco de operación del Modelo de Atención Integral en Salud -MIAS- dentro de la Política Integral de Atención en Salud -PAIS-. 36. Facilitar el proceso de concertación/empalme en el caso que la ERP designe un nuevo prestador para los servicios objeto del presente contrato, respetando en todo caso, los tiempos que cada usuario requiera de acuerdo con sus necesidades en salud, a fin de que se garantice la continuidad en la prestación de los servicios. 37. Implementar la estrategia de Atención Integral de las enfermedades prevalentes de la Infancia - AIEPI e Instituciones Amigas de la Mujer y la Infancia IAMI, acorde con lo definido por el Ministerio de Salud y Protección Social, contando con la certificación expedida por la entidad competente y garantizando la prestación del servicio con todos los componentes de la estrategia. 38. Dar cumplimiento a las actividades descritas en la resolución 3280 de 2018 o la norma que modifique, Buscar las gestantes inasistentes al control prenatal e investigar las causas de la inasistencia y reportar de manera mensual a la EAPB, cumplimiento de lo dispuesto en la Estrategia para la eliminación de la trasmisión materno infantil del VIH, SIFILIS, HEPATITIS B y ENFERMEDAD DE CHAGAS (ETMI PLUS),adoptar y adaptar la estrategia de información y comunicación en salud para la promoción y cuidado de la salud materna neonatal y la reducción de la mortalidad materna. 39. El PSS deberá cumplir con el reporte inmediato a la EAPB de los resultados de citologías, mamografía, PSA y otros resultados de laboratorios o estudios alteradas que inicien la activación de la ruta de cáncer. 40. Suministrar la información de seguimiento a la vigilancia epidemiológica sobre enfermedades de interés en salud pública, definidas por el INS en el SIVIGILA, cuando sea requerida y Participación en Comités de Vigilancia Epidemiológica (COVE) y/o Unidades de Análisis en caso de presentarse casos de interés en salud pública. 41. El PSS deberá reportar de forma obligatoria la resolución 202 de 2021 en las formas y tiempos establecidos en la resolución y el presente contrato. 42. Enviar a la ERP los estados de cartera cuando esta lo solicite, y expedir los Paz y Salvo correspondientes cuando las obligaciones sean satisfechas o concertadas mediante acta de saneamiento de deudas, liquidación de contratos o cualquier medio que ponga fin a las diferencias derivadas de la ejecución del presente contrato. 43. Realizar las fórmulas de medicamentos en la denominación común internacional tal como se encuentra descrito en el decreto 2200 de 2005 art. 16 y demás normas que la modifiquen, adicionen o sustituyan y acorde a las guías y protocolos de manejo establecidos según cada caso. Para prescribir un medicamento por fuera del listado único de la institución deberá agotar las opciones terapéuticas incluidas en el mismo. 44. El PSS deberá cumplir con el reporte oportuno de los indicadores de calidad y demás reportes obligatorios a la ERP. Asimismo, deberá remitir el pantallazo de validación en la página de la Superintendencia Nacional de Salud a la ERP al correo descrito en el Anexo 17 como constancia de la realización del reporte de la información, so pena del traslado de las sanciones pecuniarias interpuestas en cualquier tiempo por parte de los entes de Inspección, Vigilancia y Control, por el no reporte de la información dentro de la vigencia del contrato. 45. El PSS se obliga al cumplimiento de lo establecido en el Decreto 1427 de 2022, en el que se reglamentan las prestaciones económicas del Sistema General de Seguridad Social en Salud –SGSSS-, respecto a las condiciones de la expedición de las licencias de maternidad, licencias de paternidad y certificados de incapacidad, realizando el reporte a la ERP que deberá contener las variables mínimas establecidas en dicho Decreto, con la periodicidad definida por la ERP. 46. El PSS reportará el primer día hábil de cada semana, un archivo detallado en formato Excel con las incapacidades o licencias que hayan sido expedidas a cotizantes de la ERP, en la semana inmediatamente anterior al correo nacional.arm1@cajacopieps.com, con el asunto Reporte de Incapacidades y Licencias – Corte DD/MM/AAAA, en cumplimiento de la Ley Antitrámite 019 del 2012 de 2016 y Decreto 1333 del 2018 donde se reglamenta el procedimiento de revisiones periódicas de las incapacidades por enfermedad general de origen común por parte de las EPS, el momento de calificación definitiva, y las situaciones de abuso del derecho que generen la suspensión del pago de las incapacidades. 47. El PSS se obliga a las demás obligaciones derivadas del presente contrato y del contenido de la normatividad vigente.</div>

            <div class="minuta_clausula">Cláusula 3. Obligaciones de la ERP.</div>
            <div class="minuta_texto">Las ERP se obliga a: 1. Garantizar el acceso oportuno a la información de la población a ser atendida, asegurando su calidad, depuración y la actualización oportuna de las novedades, a través de bases de datos georreferenciadas y mediante los mecanismos de verificación de derechos al momento de la atención, la cual deberá corresponder con lo registrado en la Base de Datos Única de Afiliados BDUA-, así como la requerida para el cumplimiento de las disposiciones que reglamentan la factura electrónica de venta en el sector salud, 2. Pagar las facturas debidamente radicadas, auditadas y conciliadas según los plazos establecidos en el marco normativo del Anexo 1. 3. Hacer seguimiento a la ejecución del presente contrato de conformidad con el manual de auditoría adjunto. 4. Publicar en la página web dentro de los primeros cinco días hábiles de cada mes, la base de datos en la que aparecerán los afiliados actualizados, que incluye las novedades del mes anterior. 5. Entregar al PSS la caracterización de la población afiliada objeto del contrato 6. Garantizar la depuración, el correcto y oportuno registro de las novedades, así como la disponibilidad en línea de la base de datos de afiliados desde la página web de la ERP o a través del Portal Genesis / Opción Prestador (Consulta Afiliado), para la verificación de derechos. 7. Entregar al PSS la red de servicios de salud contratada por la ERP para garantizar la oportunidad, integralidad, continuidad y accesibilidad en la prestación de servicios de los afiliados y publicar de manera permanente en la página web el listado actualizado de prestadores de servicios de salud que conforman dicha red. 8. Inscribir al PSS como parte de la red de prestadores de salud, una vez inicie el presente contrato, como prestador primario, complementario u oncológico, según sea el caso. 9. Verificar la permanencia de las condiciones de habilitación y de suficiencia (capacidad instalada) del PSS, 10. Concertar con El PSS los estándares de calidad de la atención en salud y realizar la evaluación a través de indicadores de calidad, de gestión y de resultados, según los mecanismos que establezca el Ministerio de la Protección Social. 11. Realizar seguimiento a la implementación de los protocolos y/o guías de manejo conciliados entre el PSS y la ERP.12. Reportar a la Superintendencia Nacional de Salud los prestadores que no cumplan con el reporte oportuno, confiable, suficiente y con la calidad mínima aceptable de la información necesaria para la operación del sistema de monitoreo, de los sistemas de información del sector salud, o de las prestaciones de salud (Registros Individuales de Prestación de Servicios) 13. Realizar la evaluación de desempeño del prestador primario, complementario u oncológico y reportar los resultados al finalizar el periodo contractual al PSS. 14. Verificar la veracidad de la información reportada por el PSS en el marco de las obligaciones definidas en el presente contrato. </div>

            <div class="minuta_clausula">Cláusula 4. Plazo de duración y vigencia.</div>
            <div class="minuta_texto">El plazo de duración y vigencia del presente acuerdo de voluntades es el que se describe en la portada del presente contrato. En el evento que ninguna de las partes comunique a la otra su voluntad con una antelación no inferior a 30 días calendario, de darlo por terminado o no renovarlo, se entenderá prorrogado automáticamente por el término inicialmente pactado. <span class="minuta_paragrafo">PARÁGRAFO PRIMERO:</span> La habilitación del servicio prestado debe mantenerse durante la suscripción, ejecución y hasta la expiración del presente acuerdo de voluntades y de sus prórrogas. <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO:</span> En caso de prórrogas o renovaciones automáticas de los acuerdos de voluntades, antes del inicio del periodo de prórroga o renovación, se deberá actualizar el listado de tarifas en los casos que aplique, de acuerdo con el periodo contractual, igualmente se tendrá en cuenta el ajuste de tarifa en el marco de la negociación entre las partes, sobre el límite determinado por el gobierno nacional, para cada vigencia. A falta de acuerdo, se aplicará lo dispuesto en el parágrafo primero del artículo 2.5.3.5.3 del Decreto 780 de 2016, sin perjuicio de los acuerdos que surjan de la autonomía de la voluntad, la libertad de contratación y la libertad de configuración contractual entre las partes.</div>

            <div class="minuta_clausula">Cláusula 5. Valor del contrato.</div>
            <div class="minuta_texto">El valor estimado del presente acuerdo de voluntades es el que se describe en la portada del contrato, sin perjuicio de los ajustes que se generan como consecuencia del proceso normal de glosas conciliadas y debidamente aceptadas o valores a favor que la ERP reconozca como incentivos por cumplimiento de indicadores, según sea pactado en el Acta de Iniciación del Contrato.</div>

            <div class="minuta_clausula">Cláusula 6. Lugar donde se prestarán los servicios.</div>
            <div class="minuta_texto">Los servicios descritos en la portada del presente acuerdo de voluntades se prestarán en las sedes del PSS según se describen en el Anexo 7.</div>

            <div class="minuta_clausula">Cláusula 7. Población objeto del contrato.</div>
            <div class="minuta_texto">Los afiliados a la ERP activos en la base de datos serán objeto del presente acuerdo de voluntades, la cual podrá ser accedidoa por el PSS, acorde al proceso definido por la ERP.</div>

            <div class="minuta_clausula">Cláusula 8. Relación de servicios de salud contratados.</div>
            <div class="minuta_texto">La relación de servicios contratados es la que se describe en la portada del contrato, y se detalla por grupo REPS por cada una de las sedes del PSS en el Anexo 7.</div>

            <div class="minuta_clausula">Cláusula 9. Relación de tecnologías de salud objeto de contratación.</div>
            <div class="minuta_texto">En el marco de la prestación de servicios que se describen en el Anexo 7, el PSS suministrará según los criterios científicos de las Guías de Práctica Clínica que se enlistan en el Anexo 12 (Relación de Guías de Práctica Clínica y Protocolos de Atención) y de las Rutas de Atención Integral que se enlistan en el Anexo 13, los medicamentos según sus presentaciones y precios contenidos en el Anexo 14 y los insumos, suministros y demás tecnologías que se enlistan en el anexo 15.</div>

            <div class="minuta_clausula">Cláusula 10. Red Integral de Prestadores de Servicios de Salud.</div>
            <div class="minuta_texto">Para efectos de garantizar la integralidad y la continuidad en la atención de los usuarios y el acceso efectivo a la atención, los servicios objeto del presente contrato se complementan con los servicios contratados con otros prestadores y proveedores de tecnologías en salud que se describen en el Anexo 16 (Red integral de prestadores de servicios de salud), en el marco de las Redes Integradas de Prestadores de Servicios de Salud registrada en el módulo Especial del Registro Especial de Prestadores; para lo cual los prestadores deberán utilizar los procesos de referencia y contrarreferencia así como las tecnologías de información para transferencia de datos clínicos de los pacientes y las herramientas de comunicación que permitan la trazabilidad de la información y evidencien la diligencia y oportunidad en la gestión, de conformidad con los estándares descritos en el (Anexo 9) del presente acuerdo de voluntades.</div>

            <div class="minuta_clausula">Cláusula 11. Modalidad de pago.</div>
            <div class="minuta_texto">Los servicios y tecnologías en salud facturados con objeto del presente acuerdo de voluntades se pagarán según la modalidad descrita en la portada del acuerdo de voluntades. Los plazos de pago son los establecidos en la Ley 1122 de 2007, artículo 13, literal d; Ley 1438 de 2011, artículo 56 y 57; Ley 1231 de 2008; Ley 2024 de 2020; Decreto 1733 de 2020; Decreto 441 de 2022, y demás normas que modifiquen, adicionen o sustituyan. <span class="minuta_paragrafo">PARÁGRAFO PRIMERO.</span> El pago se realizará mediante transferencia electrónica al número de cuenta donde el PSS sea titular y que haya sido reportada por el PSS dentro de los anexos contractuales.</div>

            <div class="minuta_clausula">Cláusula 12. Tarifas.</div>
            <div class="minuta_texto">Las tarifas de los servicios son las pactadas en el anexo tarifario suscrito entre las partes. <span class="minuta_paragrafo">PARÁGRAFO PRIMERO.</span> Las tarifas detalladas en los anexos tarifarios podrán ser modificadas durante la vigencia contractual a través de un Otrosí al contrato, suscrito por los representantes legales de las partes. <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO.</span> Si dentro de la vigencia contractual se solicitan servicios o tecnologías no pactados en los anexos tarifarios, estos se cotizarán previamente a la prestación del servicio, y una vez concertado, las partes podrán modificar los anexos tarifarios a través de un Otrosí al contrato, suscrito por los representantes legales de las partes. <span class="minuta_paragrafo">PARÁGRAFO TERCERO:</span> Los servicios, medicamentos y/o insumos no financiados con la Unidad de Pago por Capitación - UPC serán pagados al valor negociado según el acuerdo de tarifas pactado entre las partes, que en ningún caso podrá ser superior al valor especificado en las circulares de regulación de precios o en la nota técnica de presupuestos máximos expedidas por el Ministerio de Salud y Protección Social.</div>

            <div class="minuta_clausula">Cláusula 13. Listado de GPC y Protocolos de Atención.</div>
            <div class="minuta_texto">Los servicios están sujetos al régimen de pagos compartidos o copagos y cuotas moderadoras y para su aplicación se debe tener en cuenta lo establecido en el Decreto 1652 de 2022 y demás normas que lo modifiquen, adicionen o sustituyan. EL PSS realizará el recaudo del copago, cuotas moderadoras o cuotas de recuperación y deberá descontarlo del valor de la factura, especificando este ítem en la misma y en los RIPS de la factura. Será obligación especial del PSS, llevar un registro del recaudo de dichos copagos y cuotas moderadoras en los tiempos definidos por las normas legales con el fin de soportar los procesos de auditoría que haya lugar. El PSS está obligado a registrar en el aplicativo Génesis las cuotas moderadoras y copagos realmente cobrados y adjuntar el soporte correspondiente. <span class="minuta_paragrafo">PARÁGRAFO PRIMERO.</span> En el evento y ante la imposibilidad de pago por parte del afiliado, evento en el cual corresponderá a esta reconocer y pagar dicha suma y adelantar el cobro al usuario. El PSS reportará a la ERP dicha situación mediante el aplicativo Genesis. El formato de no recaudo debe adjuntarse a la factura y sus soportes. Este formato de notificación deberá ir firmado por el afiliado y por el funcionario encargado del PSS, con los datos mínimos de identificación y de contacto actualizados, como constancia, y en señal del conocimiento previamente informado, sobre la aplicación de las cuotas moderadoras y/o copagos a que está sujeto por los servicios prestados. <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO.</span> El PSS en todos los casos que el afiliado manifieste la imposibilidad de pago, propondrá la suscripción de acuerdo de pago a los afiliados. Sólo podrá considerarse como parte del pago a estas cuando exista un recaudo efectivo de su valor. <span class="minuta_paragrafo">PARÁGRAFO TERCERO.</span> El PSS deberá abstenerse de cobrar a los afiliados copagos, cuotas moderadoras y de recuperación, de conformidad con las exclusiones establecidas en el Acuerdo 260 de 2004 y el Decreto 1562 de 2022 y demás normas que lo modifiquen, adicionen o sustituyan.</div>

            <div class="minuta_clausula">Cláusula 14. Listado de GPC y Protocolos de Atención.</div>
            <div class="minuta_texto">El PSS se compromete a prestar los servicios de conformidad con las Guías de Práctica Clínica (GPC) y los Protocolos de Atención que se describen en el Anexo 12 del presente contrato, las cuales fueron conciliadas entre las partes. Para los servicios asociados con Rutas Integrales de Atención en Salud, las cantidades, periodicidad y oportunidad se ajustarán a las RIAS enlistadas en el Anexo 13, que se ajustan a la normatividad vigente. <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. CORRESPONDENCIA ENTRE RIPS CON GPC, PROTOCOLOS Y RIAS. </span>Los servicios y tecnologías reportadas en los RIPS que se anexen mensualmente a la factura corresponderán a las GPC, Protocolos y RIAS contenidas en estos Anexos en cuanto a las cantidades y dosis recomendadas. <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. ACTUALIZACIÓN DE LAS GPC Y RIAS.</span> Las partes del contrato revisarán cada año los listados anexos según las nuevas evidencias científicas surgidas. Se entenderán automáticamente adoptados los servicios y tecnologías a que se refieren las GPC y las RIAS del Ministerio de Salud / Instituto de Evaluación de Tecnologías en Salud IETS, en la medida en que se vayan actualizado, no obstante, los precios de los nuevos servicios o tecnologías sugeridas por las actualizaciones deberán pactarse mediante un otrosí que modifique los Anexos 14 y 15 del presente contrato.</div>

            <div class="minuta_clausula">Cláusula 15. Rutas Integrales de Atención en Salud.</div>
            <div class="minuta_texto">El PSS garantizará la prestación de los servicios de salud y el suministro de medicamentos, insumos y demás tecnologías en salud según el listado de RIAS del Anexo 13. El PSS se compromete a cumplir con los lineamientos técnicos y operativos de las RIAS adoptadas por el ministerio de salud y protección social y que forman parte integral del presente contrato. La prestación o provisión de servicios y tecnologías de salud relacionados con la implementación de las RIAS que el Ministerio de Salud y Protección Social haya definido como de obligatorio cumplimiento; las priorizadas por la entidad responsable de pago de acuerdo con la caracterización poblacional, el análisis de la situación en salud que esta realice y el Modelo de Atención de Salud descrito en el Anexo 3 según aplique; la gestión de eventos y condiciones en salud priorizados a través de la política pública, y todos aquellos que así se haya previsto por la normatividad.</div>

            <div class="minuta_clausula">Cláusula 16. Autorización de servicios.</div>
            <div class="minuta_texto">Para los servicios pactados bajo la modalidad de evento, el PSS solicitará autorización del servicio según los tiempos y mecanismos descritos en el marco normativo vigente, mediante los canales de contacto descritos en el Anexo 17. La ERP expedirá la autorización a través de un canal informático transaccional y notificará al PSS/PTS y usuario dentro de los tiempos establecidos por el marco normativo vigente. <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. VIGENCIA DE LAS AUTORIZACIONES.</span> La duración de las autorizaciones expedidas para estos será de 90 días luego de su expedición. En caso de no haber sido prestado el servicio en ese término, el PSS deberá justificar a la ERP los motivos por los que el servicio no se prestó durante la vigencia de esta, y la ERP definirá la renovación de dicha autorización. <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. PROHIBICIÓN DE EXPEDICIÓN DE AUTORIZACIONES.</span> En aras de garantizar el acceso continuo de los usuarios a la prestación o provisión de los servicios o tecnologías en salud, sin interrupciones por razones administrativas, de conformidad con el marco normativo vigente descrito en el Anexo 1. La atención se brindará procurando eliminar barreras administrativas que afecten la prestación o provisión de los servicios o tecnologías, priorizando la atención integral del usuario y quitándole la carga administrativa de tramitar autorizaciones, las cuales se tramitarán entre las partes a través de un canal transaccional electrónico, de manera transparente para los usuarios. No habrá lugar a la solicitud de autorización para la atención integral del cáncer infantil o de adultos o de VIH/Sida de conformidad con el marco normativo vigente descrito en el Anexo 1. Tampoco se requerirá de autorización previa para la prestación y provisión de los servicios y tecnologías de salud a los afiliados pertenecientes a la etnia Wayuu habitante de municipios del departamento de La Guajira, en las siguientes situaciones: 1 Cuando se trate de eventos y condiciones en salud señalados en el artículo 2.5.3.4.7.4 del Decreto 780 de 2016, o la norma que lo modifique o sustituya. 2. Para la atención de urgencias y los servicios y tecnologías en salud posteriores a la atención en urgencias sin egreso hospitalario. 3. Para la atención integral de la desnutrición aguda moderada y severa en niños menores de 5 años, según lo establecido en la resolución 2350 de 2020, que incluye: identificación de casos de desnutrición aguda moderada y severa, remisión de casos de atención hospitalaria o ambulatoria, tratamiento con fórmula terapéutica, seguimiento y monitoreo a los casos identificados. 4. Cuando se trate de atenciones en salud de madres gestantes, incluidas las complicaciones durante el embarazo. <span class="minuta_paragrafo">PARÁGRAFO TERCERO. NOTIFICACIÓN DE PRESTACIÓN.</span> La prestación efectiva del servicio, entrega del medicamento o insumo, prestado por evento se deberá realizar previa validación del número de autorización emitido por la ERP en su portal transaccional dispuesto para tal fin, y registrar la fecha real de prestación del servicio una vez finalizada la atención, o en un periodo no mayor a tres días posteriores a la entrega total de la fórmula según cantidad autorizada, so pena de dar traslado de las sanciones pecuniarias impuestas a la ERP por incumplimiento a lo dispuesto en la Resolución 497 de 2021 dentro de las obligaciones de la ERP.</div>

            <div class="minuta_clausula">Cláusula 17. Supervisión del contrato.</div>
            <div class="minuta_texto">La ERP ejercerá la supervisión sobre la ejecución de los servicios objeto del presente contrato, a través de su personal delegado, el cual se designa en la portada del presente contrato. La ERP, se reserva el derecho de realizar las visitas de monitoreo y la supervisión que estime convenientes. De igual forma, con la finalidad de asegurar que la prestación por parte del PSS se realice en condiciones óptimas de calidad, La ERP podrá inspeccionar, verificar el servicio e igualmente hacer sugerencias por escrito para que EL PSS corrija las deficiencias en la prestación del servicio. <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. DECLARACIONES DEL SUPERVISOR. </span>Con su visto bueno y en calidad de responsable técnico del contrato, el supervisor declara que: 1. La IPS se encuentra inscrita en el Registro Especial de Prestadores de Servicios de Salud -REPS- y dicho registro está vigente. 2. La IPS cumple con los requisitos legales que en materia de habilitación para la prestación de servicios de salud establece la Resolución 3100 de 2019 o aquella norma vigente que la modifique, adicione o sustituya, y garantiza la prestación de la totalidad de los servicios contratados. 3. La IPS cuenta con sedes habilitadas en los municipios descritos en el Anexo 7, para garantizar la prestación de los servicios objeto del contrato a sus afiliados en las condiciones de cobertura que exige la ley a las aseguradoras del SGSSS. 4. Las sedes en las cuales se prestarán los servicios de salud objeto del contrato cuentan con la evaluación realizada de conformidad con lo establecido en los procedimientos internos de la ERP y se encuentran vigentes al momento de la firma del acuerdo de voluntades. 5. Considerando el cumplimiento de los requisitos técnicos y legales específicamente respecto de la habilitación para la prestación de servicios de salud, gestionó ante el órgano competente de la ERP la aprobación de la presente contratación. 6. El acuerdo de servicios, el contrato y sus anexos, corresponden a lo negociado y autorizado por la ERP, y por lo tanto da visto bueno a la suscripción del presente documento. 7. Se realizarán las validaciones pertinentes definidas en la normatividad vigente que apliquen al objeto del contrato definido entre las partes, según el Anexo 10 (Formato de supervisión del contrato) definido por la ERP. <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. RESPONSABILIDADES DEL SUPERVISOR.</span> Las responsabilidades del supervisor del contrato son las siguientes: 1. Gestionar de manera oportuna ante los órganos correspondientes de la ERP la aprobación de las modificaciones al presente contrato cuando a ello hubiere lugar. 2. Vigilar la correcta ejecución de lo pactado, realizando el seguimiento técnico, administrativo y financiero correspondiente. 3. En caso de darse cualquier situación que pueda llegar a modificar las condiciones pactadas, o de presentarse incumplimiento de las obligaciones a cargo del PSS que pongan en riesgo el cumplimiento del contrato, adelantar las acciones de mitigación que correspondan para evitar que se cause un perjuicio a la organización, gestionando si fuere necesario, y de conformidad con el Manual de planeación, conformación, contratación y evaluación de la red de prestadores de servicios de salud, la terminación del contrato. 4. Suministrar la información para liquidar el contrato dentro de los 4 meses siguientes a su terminación y gestionar la suscripción del acta respectiva. 5. En general, dar cumplimiento a las disposiciones del Manual de planeación, conformación, contratación y evaluación de la red de prestadores de servicios de salud.</div>

            <div class="minuta_clausula">Cláusula 18. Coordinación de referencia y contrarreferencia.</div>
            <div class="minuta_texto">El PSS aplicará el Manual de Referencia y Contrarreferencia suministrado por la ERP de conformidad con los prestadores descritos en el Anexo 16 y utilizando los contactos descritos en el Anexo 17.</div>

            <div class="minuta_clausula">Cláusula 19. Indicadores de evaluación de la ejecución.</div>
            <div class="minuta_texto">El PSS se obliga en cumplimiento del presente contrato a la atención de todo lo dispuesto en el Sistema Obligatorio de Garantía de la Calidad de SGSSS, contenido en el Decreto 1011 de 2006, la Ley 1438 de 2011, Resolución 256 de 2016 de la Superintendencia Nacional de Salud, así como aquellas que la modifiquen, adicionen o sustituyan. Durante la vigencia del contrato, la ERP verificará que la prestación de servicios de salud objeto del presente contrato, se cumpla por parte del PSS, bajo las condiciones de accesibilidad, oportunidad, seguridad, pertinencia y continuidad establecidas en la normatividad aplicable en la materia. Para efectos de evaluar el cumplimiento del presente acuerdo de voluntades, el PSS se obliga a reportar a la ERP los indicadores de calidad, de gestión y de resultados descritos en el Anexo 9 y en el marco normativo vigente descrito en el Anexo 1. <span class="minuta_paragrafo">PARÁGRAFO. ACTUALIZACIÓN DE INDICADORES E IMPREVISTOS.</span> En caso de eventos imprevisibles, fuerza mayor o caso fortuito, que afecten la prestación o provisión de servicios y tecnologías en salud y el cumplimiento de los indicadores pactados, estos deberán ser ajustados de acuerdo con las nuevas condiciones mediante la celebración de un otrosí. Sin perjuicio de lo anterior, cualquier evento imprevisto que surja en el desarrollo del presente contrato y que amerite la revisión de sus condiciones se someterá a las normas de imprevisión del Código Civil y del Código del Comercio.</div>

            <div class="minuta_clausula">Cláusula 20. Proceso periódico de evaluación.</div>
            <div class="minuta_texto">El contrato se evaluará de conformidad con el Modelo de Auditoría descrito en el Anexo 10 y de conformidad con las cláusulas 17 a 20 del presente acuerdo de voluntades. <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. MODELO DE AUDITORÍA DE CALIDAD.</span> El modelo de auditoría contempla los aspectos administrativos, financieros, técnico-científicos y de calidad del servicio que hacen parte del Sistema Obligatorio de Garantía de Calidad en Salud -SOGCS. La auditoría de la calidad de la atención de los servicios deberá desarrollarse de acuerdo con el Programa de Auditoría para el Mejoramiento de la Calidad -PAMEC- de cada uno de los agentes, de conformidad con lo establecido en el Capítulo 4 "Auditoría para el mejoramiento de la calidad de la atención de salud" del Título 1 de la Parte 5 del Libro 2 de Decreto 780 de 2016 o según la norma que los modifique, adicione o sustituya Y Manual de Auditoría de Calidad de la ERP.</div>
            <div class="minuta_texto"><span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. MODELO DE AUDITORÍA DE CUENTAS MÉDICAS.</span> La auditoría de las cuentas médicas se realizará con base en los soportes definidos en el marco normativo vigente, con sujeción a los estándares establecidos en el Manual Único de Devoluciones, Glosas y Respuestas expedido por el Ministerio de Salud y Protección Social, conforme a los términos señalados en el trámite de glosas establecido en el mismo y de acuerdo con la información reportada y validada en el Registro Individual de Prestaciones de Salud. <span class="minuta_paragrafo">PARÁGRAFO TERCERO. PROCEDIMIENTO AUDITORÍA HOSPITALARIA.</span> La auditoría hospitalaria se realizará con base en lo descrito en el Procedimiento de Auditoría Hospitalaria de la ERP el cual se encuentra ajustado al marco normativo que regula la relación contractual. El PSS garantizará el acceso del equipo auditor extramural de la ERP a los pacientes que se encuentren bajo atención hospitalaria en cualquiera de las sedes del PSS y en todos los niveles de atención.<span class="minuta_paragrafo">PARÁGRAFO CUARTO. ACCESO A LA HISTORIA CLÍNICA.</span> Para los efectos previstos en esta cláusula, el PSS deberá garantizar a la ERP el acceso a la historia clínica del usuario a través de medios electrónicos o digitales, con el fin de facilitar los procesos de auditoría y seguimiento. La ERP deberá cumplir con las condiciones de seguridad adoptadas por el prestador o proveedor para la guarda y custodia de los datos personales y datos sensibles contenidos en esta. El tratamiento de los datos personales, en especial de los datos sensibles, se realizará con sujeción a lo dispuesto en la Ley Estatutaria de salud y en el marco normativo vigente en materia de protección de datos confidenciales y sensibles.</div>

            <div class="minuta_clausula">Cláusula 21. Reportes obligatorios.</div>
            <div class="minuta_texto">El PSS reportará a la ERP dentro de los primero cinco (5) días HÁBILES de cada mes vencido: 1. Los Indicadores de calidad de la atención de salud establecidos en el Anexo 9, a través de los mecanismos que la ERP establezca; especialmente el reporte de la resolución 1552 de 2013 deben hacerlo a través de la plataforma Genesis en el módulo salud/1552. 2. El reporte obligatorio de la Resolución 202 de 2021. 3. Los Indicadores de reportes obligatorios en las normas vigentes de la Superintendencia Nacional de Salud 4. Los casos de sospecha de reacciones adversas a medicamentos deben ser notificados en el formato del INVIMA. 5. Todos los reportes obligatorios del SIVIGILA según las pautas, formatos, manuales de vigilancia epidemiológica vigentes del Instituto. 6. La información de las actividades de protección específica y detección temprana (PEDT) en la estructura, formato y periodicidad que determinada por el Ministerio de Salud y Protección Social, dentro de los 20 primeros días de cada mes. <span class="minuta_paragrafo">PARÁGRAFO.</span> Para los PSS de gestión del riesgo se trasladarán los descuentos aplicados a la ERP por la Cuenta de Alto Costo - CAC por no cumplimiento de los indicadores de gestión.</div>

            <div class="minuta_clausula">Cláusula 22. Mecanismos y plazos para la entrega y actualización de la información de los afiliados.</div>
            <div class="minuta_texto">En cumplimiento de lo establecido en el Decreto 780 de 2016 en su artículo 2.1.3.5, Decreto 1427 de 2022, y en el Decreto 441 de 2022, donde se establece la obligación a las entidades de implementar estrategias que permitan garantizar la actualización de la base de contactos de los afiliados, se establecen los mecanismos y plazos para la entrega y actualización de la información de los afiliados a la ERP: 1. El PSS reportará los soportes de documento de identidad legible de los afiliados que al momento de la atención registren documento evolucionado y/o distinto a la información reportada por el sistema de información de la ERP, esto con el fin de realizar las novedades a que haya lugar y así lograr mantener el documento actualizado de cada uno de nuestros afiliados al correo nacional.arm1@cajacopieps.com, con el asunto Reporte de novedades - Actualización de documento. 2. El reporte deberá ir acompañado de una tabla en Excel con los siguientes datos del afiliado que presente la novedad: tipo de documento, número de documento, nombres y apellidos completos, dirección de residencia, teléfono (s), e-mail y soporte.</div>

            <div class="minuta_clausula">Cláusula 23. Facturación y glosas</div>
            <div class="minuta_texto">EL PSS radicará antes a la ERP la Factura Electrónica de Venta (FEV) dentro de los plazos y condiciones establecidos en la ley y reglamentos vigentes, utilizando el canal transaccional descrito en el Anexo 17 del presente contrato. La FEV deberá contener los RIPS y soportes completos exigidos por el marco normativo vigente descrito en el Anexo 1, so pena de devolución. <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. FACTURACIÓN INDIVIDUAL POR USUARIO.</span> La facturación se debe presentar de manera discriminada por cada usuario e ítem con el valor unitario según las tarifas definidas en la nota técnica. <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. CIRCULARES SOBRE REPORTES DE INFORMACIÓN.</span> Para todos los efectos hace parte integral de este contrato las circulares expedidas por la ERP, mediante las cuales se imparten indicaciones respecto a los soportes requeridos para la presentación de facturas de tecnologías en salud no cubiertas en el Plan de Beneficios en Salud. <span class="minuta_paragrafo">PARÁGRAFO TERCERO. REPORTE DE RIPS.</span> PSS reportará a la ERP como requisito obligatorio para la radicación de la factura, los Registros Individuales de Prestación de Servicios de Salud RIPS utilizando: 1. La clasificación única de procedimientos CUPS, 2. La codificación única que determine el Ministerio de La Protección Social para los insumos y dispositivos médicos, a los cuales el INVIMA haya otorgado registro sanitario. 3. Todos los medicamentos deberán ser reportados en códigos CUMS (expediente + consecutivo) según base de datos Invima vigente. Adicionalmente, los RIPS deben corresponder con los códigos y valores de los servicios, medicamentos e insumos definidos en la Nota Técnica. <span class="minuta_paragrafo">PARÁGRAFO CUARTO. FACTURACIÓN DEL ÚLTIMO MES DEL CONTRATO.</span> EL PSS deberá presentar las facturas por la prestación de servicios dentro de la misma vigencia del contrato y las atenciones del último mes, a más tardar al mes siguiente.</div>

            <div class="minuta_clausula">Cláusula 24. Plazos de pago.</div>
            <div class="minuta_texto">Los plazos de pago son los establecidos en la Ley 1122 de 2007, artículo 13, literal d; Ley 1438 de 2011, artículo 56 y 57; Ley 1231 de 2008; Ley 2024 de 2020; Decreto 1733 de 2020; Decreto 441 de 2022, y demás normas que modifiquen, adicionen o sustituyan.</div>

            <div class="minuta_clausula">Cláusula 25. Plazos de pago</div>
            <div class="minuta_texto">Cuando surjan discrepancias como consecuencia de la suscripción, ejecución, terminación y/o liquidación del presente contrato, o en la interpretación de las normas aplicables, se utilizarán como mecanismos de solución en la primera instancia la búsqueda de soluciones ágiles y rápidas y en forma directa, por lo que deberán efectuarse dos (2) reuniones entre las partes, que pueden ser solicitadas por cualquiera de éstas con diferencia de treinta (30) días entre cada una de ellas. En caso de no llegar a un acuerdo en la primera instancia, se podrá hacer uso en segunda instancia del proceso de conciliación ante la Superintendencia Nacional de Salud una vez trascurrido el término anterior. En caso de fracasar la segunda instancia, toda controversia o diferencia relativa a este acuerdo de voluntades, se resolverá ante la justicia ordinaria.</div>

            <div class="minuta_clausula">Cláusula 26. Causales de terminación del contrato.</div>
            <div class="minuta_texto">El presente contrato podrá terminarse por: 1. Por mutuo acuerdo. 2. Por incumplimiento de las obligaciones del PSS contenidas o emanadas del presente contrato. 3. Por fuerza mayor o caso fortuito demostrado. 4. Cuando el término de suspensión supere los 4 meses, sin que se haya reanudado el contrato, 5. Por revocatoria de funcionamiento de una de las partes. 6. Por orden de autoridad pertinente y/o competente. 7. Cuando la ERP documente no conformidades graves en los procesos de atención y/o facturación de los servicios. 8. Cualquier sanción impuesta por parte de las Autoridades de Inspección, Vigilancia y Control al PSS y que tengan que ver con hechos o actos que afecten la calidad de los servicios contratados. 9. La ERP podrá terminar el contrato derivado de la no ejecución de los planes de mejoramiento solicitados en debida forma y por escrito al PSS sin que medie justa causa para dicha omisión. 10. Por cualquier situación donde alguna de las partes deje de hacer presencia en el municipio de prestación del servicio. 11. Cuando haya operado la condición resolutoria expresa. 12. Por resolución judicial debidamente ejecutoriada. 13. La ERP podrá terminar el contrato de manera unilateral si por causa de investigación administrativa, judicial o de vigilancia y control, el PSS resulte sancionado por acto que afecte el Código del buen Gobierno, la transparencia, la lealtad y confianza legítima de las partes. 14. La ERP podrá terminar el contrato de manera unilateral, cuando el PSS subcontrate sin su autorización. 15. Por las malas prácticas en las que pueda incurrir el PSS, por la inoportunidad en el servicio, falta de calidad, por cierre de las instalaciones donde presta servicio el PSS debido al paro, huelga promovida por trabajadores o por la comunidad, caso en el cual se podrá dar por terminado el presente acuerdo de voluntades con la simple comunicación expedida por la ERP. 16. Por vencimiento del plazo pactado. 17. Por la no entrega de informes requeridos por la ERP para el cumplimiento de sus funciones como aseguradora dentro del SGSSS, o la entrega inoportuna o incompleta de estos por parte del PSS. 18. Por el uso indebido de las bases de datos de la ERP por parte del PSS. 19. La ERP podrá dar por terminado unilateralmente el contrato sin que esto de lugar a indemnización, cuando el PSS no diere cumplimiento a las disposiciones legales relacionadas con la prevención y control al lavado de activos, el financiamiento del terrorismo y la financiación de la proliferación de armas de destrucción masiva nacionales o internacionales que les sean aplicables. 20. Cuando el PSS figure en las listas de la OFAC y/o en las listas nacionales e internacionales relacionadas con actividades ilícitas, estando la ERP facultado para efectuar las verificaciones que considere pertinentes en bases de datos públicos o privadas (de orden nacional o internacional) donde se relacionan personas presuntamente vinculadas a cualquier actividad ilícita. 21. Cuando exista en contra del PSS una sentencia judicial en firme que lo condene por la comisión de los delitos de lavado de activos, financiación del terrorismo y la financiación de la proliferación de armas de destrucción masiva nacionales o internacionales o se encuentren vinculados en investigaciones o procesos penales por dichos delitos, o exista información pública con respecto a tales personas que puedan colocar a la ERP frente a un riesgo legal o reputacional. 22. Cuando se presenten elementos que puedan representar para la ERP, riesgos reputacionales, legales, operativos o de contagio relacionados con el lavado de activos la financiación del terrorismo y la financiación de la proliferación de armas de destrucción masiva nacionales o internacionales. 23. Cuando se presenten elementos que conlleven a dudas fundadas sobre la legalidad de las operaciones del PSS, la licitud de sus recursos o que el PSS ha efectuado transacciones u operaciones destinadas a dichas actividades o a favor de personas relacionadas con las mismas. 24. Cuando se presenten inconsistencias, discrepancias o falsedades en la documentación e información aportada por el PSS para la celebración y ejecución del contrato y que conlleve a dudas fundadas sobre la legalidad de las operaciones del PSS. 25. Por decisión unilateral de cualquiera las partes, con previo aviso de treinta (30) días calendario, sin que haya lugar a indemnización alguna. <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. REQUERIMIENTO PARA TERMINACIÓN DEL CONTRATO.</span> La ERP a través del supervisor de este contrato, requerirá por escrito al PSS precisándole el incumplimiento de una o varias de las obligaciones pactadas, exigiéndole que en un plazo no mayor a cinco (5) días hábiles contados a partir del recibo de la comunicación, presente las explicaciones correspondientes o según el caso, cumpla con lo pactado, informándole las consecuencias de no atender el requerimiento. Si vencido el plazo el PSS no responde, o sus explicaciones no son satisfactorias para la ERP, o no realiza las actividades correctivas solicitadas, la ERP quedará en libertad de terminar unilateralmente el contrato, y en este caso lo anunciará al PSS mediante comunicación escrita con una antelación no menor a 30 días calendario respecto de la fecha de terminación deseada.<span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. CESACIÓN EN LA PRESTACIÓN DE SERVICIOS.</span> EL PSS en ninguna circunstancia podrá suspender, retirar servicios de salud objeto del presente contrato o cesar la prestación de estos, conducta que se considerará como incumplimiento grave en las obligaciones del PSS. Para que la suspensión, retiro o cesación de los servicios se entienda válida y no constituya incumplimiento alguno, debe ser notificada mediante escrito y dentro de los sesenta (60) días anteriores a la fecha de suspensión, cesación o retiro del servicio, en donde deberá justificar el motivo de la suspensión, debiendo esta solicitud ser aceptada por la ERP para que pueda realizarse por parte del PSS. De lo contrario, éste deberá continuar prestando los servicios contratados.<span class="minuta_paragrafo">PARÁGRAFO TERCERO.</span> Cualquiera sea la causa de terminación del presente contrato, para todos los efectos de este, se surtirán todos los alcances de la terminación del artículo 2.5.3.4.16 del Decreto 780 de 2016, sin detrimento de la resolución y/o conciliación de cuentas que eventualmente queden pendientes y que serán resueltas en los tiempos dispuestos por la legislación especial sobre la materia.</div>

            <div class="minuta_clausula">Cláusula 27. Liquidación del contrato.</div>
            <div class="minuta_texto">El presente acuerdo de voluntades se liquidará por mutuo acuerdo de las partes, dentro de los cuatro (4) meses siguientes a esta. La ERP y el PSS suscribirán acta de liquidación en la cual se consignarán los ajustes, revisiones y reconocimientos a que haya lugar, los acuerdos, conciliaciones y transacciones a que llegaren las partes, para dirimir las divergencias presentadas y poder declararse a paz y salvo por todo concepto. De no haberse liquidado el presente contrato de común acuerdo en los plazos establecidos, será liquidado unilateralmente por EL CONTRATANTE dentro de los 12 meses siguientes a la terminación del contrato. Si ninguna de las partes muestra su interés efectivo por liquidar el contrato, y no realiza ni una comunicación física o electrónica durante los doce (12) meses siguientes a la terminación del contrato, se entiende que ambas partes aceptan estar a paz y salvo por todo concepto y condonar toda deuda existente entre ellas.</div>

            <div class="minuta_clausula">Cláusula 28. Incentivos pactados.</div>
            <div class="minuta_texto">Las partes pactarán en el acta de Iniciación del Contrato el reconocimiento de incentivos de tipo económico o no económico por la mejoría, logro y mantenimiento de resultados de los indicadores pactados, eligiendo un mecanismo que estimule la prestación y provisión de servicios y tecnologías basado en valor, de acuerdo con el objeto del acuerdo de voluntades.</div>

            <div class="minuta_clausula">Cláusula 29. Canales de relacionamiento.</div>
            <div class="minuta_texto">Los canales de relacionamiento entre las partes son los establecidos en el Anexo 17</div>

            <div class="minuta_clausula">Cláusula 30. Cesión.</div>
            <div class="minuta_texto">El PSS no podrá ceder total o parcialmente el presente contrato sin la autorización de la ERP. <span class="minuta_paragrafo">PARÁGRAFO PRIMERO.</span> El presente contrato al igual que los derechos y obligaciones emanados de la ejecución de este, será cedido de conformidad a lo establecido en el Artículo 2.1.13.9. Procesos de reorganización institucional del Decreto 780 de 2016 Decreto único reglamentario del sector salud y sus modificaciones, conforme a lo establecido en el numeral 87.2 del artículo 87 del Decreto 2353 de 2015, a la entidad promotora de salud resultante del proceso de Reorganización institucional. <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO.</span> Las cesiones de créditos que suscriba la ERP con un tercero NO surtirán efectos sobre los créditos, saldos y/o facturas que se generen con ocasión de la ejecución del presente contrato, si no cuentan con la autorización expresa y por escrito de la ERP. La cesión requerirá de la suscripción de un contrato de cesión con las mismas disposiciones del actual sin que represente costo alguno para la ERP.</div>

            <div class="minuta_clausula">Cláusula 31. Régimen jurídico del contrato.</div>
            <div class="minuta_texto">El presente acuerdo de voluntades se rige por el derecho privado y el marco normativo descrito en el Anexo 1. Le son aplicables los procesos precontractuales, contractuales y post contractuales descritos en el Decreto 441 de 2022, adoptados en el Manual de planeación, conformación, contratación y evaluación de la red de Prestadores de Servicios de Salud.</div>

            <div class="minuta_clausula">Cláusula 32. Cláusula penal pecuniaria.</div>
            <div class="minuta_texto">A) COMPENSATORIA: El incumplimiento parcial o total de las obligaciones derivadas de este contrato por el PSS, genera el derecho para Ia ERP a exigir el pago de una suma equivalente al 10% del valor estimado del contrato, previa declaración judicial. <span class="minuta_paragrafo">PARÁGRAFO PRIMERO.</span> El PSS autoriza a la ERP para que el valor de la CLÁUSULA PENAL a que se refiere esta cláusula sea descontado del saldo pendiente de pago a su favor en virtud del presente acuerdo de voluntades o por cualquier relación comercial entre las partes. Si no lo hubiese, podrá cobrarse por la vía ejecutiva, renunciando el PSS con la suscripción del presente contrato a requerimientos judiciales o extrajudiciales, de manera que este documento y la liquidación de los perjuicios constituye título ejecutivo para el cumplimiento de la sanción pecuniaria, para lo cual este acuerdo de voluntades prestará mérito ejecutivo. Asimismo, en el evento en que se causen intereses de mora por cualquier concepto, la tasa de interés aplicable será la máxima legal comercial certificada por la Superintendencia Financiera, o quien haga sus veces, a la fecha de la causación de estos. <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO.</span> La ERP podrá cobrar la pena establecida en la presente cláusula, y a su vez exigir el cumplimiento del acuerdo de voluntades, por tanto, el pago de la pena no extingue el cumplimiento de las obligaciones pactadas. </div>

            <div class="minuta_clausula">Cláusula 33. Prevención del lavado de activos y financiación del terrorismo.</div>
            <div class="minuta_texto">El PSS y la ERP certifican que sus recursos no provienen ni se destinan al ejercicio de ninguna actividad ilícita o de actividades de lavado de activos provenientes de éstas o de actividades relacionadas con la financiación del terrorismo. Las partes se obligan a realizar todas las actividades encaminadas a asegurar que sus administradores y empleados y los recursos de estos, no se encuentren relacionados o provengan, de actividades ilícitas, particularmente de lavado de activos o financiación del terrorismo. En todo caso, si durante el plazo de vigencia del contrato las partes, algunos de sus administradores, socios o empleados llegaren a resultar involucrados en una investigación de cualquier tipo (penal, administrativa, etc.) relacionada con actividades ilícitas, lavado de dinero o financiamiento del terrorismo, o fuese incluido en listas nacionales o internacionales como las de la ONU, OFAC, entre otras, la ERP o el PSS pueden terminar unilateralmente el acuerdo de voluntades sin que por este hecho esté obligado a indemnizar ningún tipo de perjuicio a la otra parte. De la misma forma, el PSS declara que los recursos que incorpora para el logro de la ejecución del contrato proceden de actividades completamente lícitas. Durante la vigencia del presente acuerdo de voluntades, el PSS no podrá vincular como trabajador o empleado a personas que se encuentren vinculadas en la planta de la ERP, o ejerza auditoría para este, so pena de multa por el valor del 20% del presente acuerdo de voluntades. Así mismo, se reportará tal acción ante los entes de control, judiciales, fiscales y disciplinarios para que se inicien las investigaciones que correspondan. <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. CONSULTA DE ANTECEDENTES.</span> El PSS autoriza a la ERP, la consulta, verificación en cualquier base de datos, listas restrictivas y públicas. El PSS deberá suministrar a la ERP toda la información acerca del origen de los fondos, composición accionaria y beneficiario final de la empresa cuando este así lo requiera. <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. COMPROMISOS RELACIONADOS.</span> Cada una de las partes se compromete a cumplir la Constitución, leyes y reglamentos aplicables a la prevención del soborno y a favor de la transparencia, así como a involucrarse únicamente en negocios legítimos y prácticas éticas en sus operaciones comerciales, sus relaciones o transacciones con cualquier empleado o funcionario vinculado con cualquiera de las partes o de cualquier otra entidad que pertenezca o sea dirigida o controlada por alguna de las partes, o con partidos políticos o sus candidatos. Ninguna de las partes ni sus directivos, directores, empleados o agentes pagará, ofrecerá, entregará, prometerá o autorizará el pago, directa o indirectamente, de cualquier importe, regalo u objeto o actividad valorable económicamente a ningún contacto comercial o Empleado gubernamental con la intención o propósito de inducir a dicha persona a ejercer su autoridad para ayudar a la otra parte o a cualquier afiliado de la otra parte a cambio de una ganancia personal. El Pago prohibido no incluye el pago de gastos razonables efectuados de buena fe, como los costos de desplazamiento y alojamiento que estén directamente relacionados con la promoción, demostración o explicación de productos o servicios o con la ejecución o realización de un contrato, siempre y cuando dichos pagos estén permitidos por las Leyes aplicables.</div>

            <div class="minuta_clausula">Cláusula 34. Autorización del tratamiento de datos personales.</div>
            <div class="minuta_texto">La ERP como responsable del tratamiento de los datos personales objeto del presente contrato, autoriza al PSS en calidad de encargado del tratamiento de datos personales, para realizar el tratamiento de la información personal contenida en la(s) base(s) de datos a las que se tenga acceso en desarrollo del acuerdo de voluntades respecto de las cuales la ERP declara contar con la autorización previa, libre, informada, expresa e inequívoca de sus titulares, garantizando el suministro de la información de forma veraz, completa, exacta, actualizada, comprobable y comprensible para las finalidades propias de la presente contratación. <span class="minuta_paragrafo">PARÁGRAFO PRIMERO.</span> El PSS se compromete a tratar los datos personales que reciba con ocasión de la relación contractual que tiene con la compañía única y exclusivamente para las finalidades necesarias para desarrollar el objeto del presente acuerdo de voluntades, respetando el derecho a la vida privada y a la intimidad de los titulares de los datos personales de quienes hará tratamiento, a implementar las medidas de seguridad necesarias, a cumplir con todas las obligaciones del artículo 18 de la ley 1581 de 2012 y a no divulgar los datos personales ni la información que sea suministrada a lo largo de la relación con la compañía. En caso de que se presente un incidente de seguridad con los datos personales deberá reportarlo de inmediato a la ERP. Al momento de la terminación del acuerdo de voluntades, el PSS deberá devolver o destruir la información de las bases de datos personales de acuerdo con las indicaciones de la ERP. <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. HABEAS DATA.</span> En cumplimiento de lo dispuesto en el marco normativo vigente en lo correspondiente a la protección de datos personales, las partes declaran que son conocedoras y aceptan que en caso que en desarrollo del objeto de este contrato las partes lleguen a realizar tratamiento de datos personales o sensibles en los términos de la normatividad, se obligan a respetar, mantener absoluta reserva y confidencialidad y de cualquier manera garantizar la seguridad y privacidad de la información y/o datos personales sensibles que le sean transmitidos o que de cualquier forma o medio llegue a conocer y/o que sean por éste recolectados, almacenados, usados, objeto de circulación o en general de cualquier operación o conjunto de operaciones, bajo los términos y/o condiciones que indique tanto la normatividad vigente como la Política para el Tratamiento de la Información y/o datos personales que haya sido adoptada por cada una de las partes. Así mismo, se obligan a contar con los medios técnicos, humanos y administrativos que sean necesarios para otorgar confidencialidad y seguridad a los datos evitando su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento y garantizando que la información es veraz, completa, exacta, actualizada, comprobable y comprensible. Así entonces, queda expresamente prohibido disponer, usar, difundir y/o transmitir de cualquier modo la información y/o datos sensibles o personales a los que tenga acceso en desarrollo del presente contrato, ya que dicha información debe ser recolectada, conservada y usada única y exclusivamente para el desarrollo de este y bajo la confidencialidad y seguridad antes anotada. <span class="minuta_paragrafo">PARÁGRAFO TERCERO. MECANISMO DE ENTREGA Y ACTUALIZACIÓN DE INFORMACIÓN.</span> EL PSS deberá reportar e informar mensualmente a la ERP las novedades en la actualización de los datos de identificación, dirección, contacto, etc, de los usuarios que identifique, mediante el mecanismo que las partes adopten para la entrega y actualización de información. LAS PARTES pactan que recibirán notificaciones en los correos electrónicos reportados en el presente acuerdo de voluntades.</div>

            <div class="minuta_clausula">Cláusula 35. Pólizas del contrato.</div>
            <div class="minuta_texto">El PSS mantendrá vigente una Póliza de responsabilidad civil, contractual y extracontractual médica para amparo a terceros por servicios derivados de la atención en salud, por un valor asegurado que corresponda al 10% del presente contrato y que ampare el tiempo de ejecución de este, quedando obligada a responder con recursos propios por la diferencia que pueda existir entre el valor asegurado y el valor de las eventuales indemnizaciones derivadas del daño ocurrido. El PSS hará entrega de la póliza a la ERP dentro de los tres (3) días siguientes a la suscripción del contrato. <span class="minuta_paragrafo">PARÁGRAFO PRIMERO.</span> La aprobación de la póliza aportada será remitida por parte de la ERP al PSS en los 5 días hábiles siguientes.<span class="minuta_paragrafo">PARÁGRAFO SEGUNDO.</span> El PSS responderá por todos los daños patrimoniales y extrapatrimoniales que sean causados a los usuarios a su cargo en el nivel asistencial, así como también por toda reclamación administrativa y judicial que contra esta se llegare a presentar de forma directa o indirecta con ocasión de los servicios objeto del presente contrato. Es obligación del PSS, la eficiente prestación de los servicios contratados, en todo caso, mantendrá indemne a la ERP, de cualquier reclamación proveniente de terceros que tenga como causa las actuaciones del PSS o del personal designado para el cumplimiento del Contrato. En el evento, de acciones jurídicas legales contra la ERP, se entenderá que el proceso no se puede desarrollar sin la presencia procesal del PSS.</div>

            <div class="minuta_clausula">Cláusula 36. No relación laboral.</div>
            <div class="minuta_texto">Este contrato no constituye vínculo de trabajo entre la ERP y el PSS ni el personal que el contrate para el desarrollo del acuerdo de voluntades. En consecuencia, la ERP sólo responderá por los emolumentos pactados en el mismo. Son de su exclusiva responsabilidad los salarios, prestaciones o cualquier otro pago similar que se cause o deba hacerse a las personas que emplee PSS para el cumplimiento de sus obligaciones. <span class="minuta_paragrafo">PARÁGRAFO TERCERO. LLAMAMIENTO EN GARANTÍA.</span> Salvo la responsabilidad inherente a cada parte con relación a las obligaciones contraídas en el presente contrato. La ERP no asumirá ninguna responsabilidad civil o penal derivada de la deficiencia o inadecuada prestación de los servicios objeto del contrato por parte de EL PSS, o del personal a su cargo. En el evento de que la ERP sea requerida judicial o extrajudicialmente para asumir responsabilidades o indemnizaciones derivadas de tales eventos, llamará en garantía a EL PSS y, si es condenado repetirá contra EL PSS para el reembolso de las sumas que por tal motivo haya tenido que cancelar.</div>

            <div class="minuta_clausula">Cláusula 37. Prohibiciones.</div>
            <div class="minuta_texto">Las modificaciones y las adiciones del presente contrato podrán elaborarse como Otrosí, el cual hará parte de este contrato y donde deberán consignarse los nombres de las partes, su documento de identidad y fecha en que se efectúe la modificación y su aceptación clara y expresa mediante sus firmas. <span class="minuta_paragrafo">PARÁGRAFO. ESCISIÓN.</span> La ERP se encuentra debidamente habilitada para operar en el Sistema General de Seguridad Social en Salud mediante oficio con radicado 20223100101662251 del 28 de noviembre de 2022 emanado de la Superintendencia Nacional de Salud a partir del 01 de diciembre de 2022, por lo que el único obligado en el presente contrato en calidad de CONTRATANTE es CAJACOPI EPS S.A.S.</div>

            <div class="minuta_clausula">Cláusula 38. Prohibiciones.</div>
            <div class="minuta_texto">EL PSS no podrá: 1. Realizar prácticas discriminatorias en su atención a los usuarios; 2. Divulgar cualquier información relacionada con los pacientes, salvo la que requiera la ERP para efectos de este contrato o la autoridad competente o que sea solicitada directamente por el afiliado, siendo obligación de EL PSS obtener las autorizaciones del caso por parte de la paciente previa o durante la prestación de los servicios de salud; 3. Ceder el presente contrato en todo o en parte. 4. Subcontratar los servicios objeto del presente contrato.</div>

            <div class="minuta_clausula">Cláusula 39. Restricciones para contratar.</div>
            <div class="minuta_texto">Las partes afirman bajo la gravedad del juramento que se entiende prestado con la suscripción de este contrato que no se encuentran incursos en Conflictos de tipo financieros, Conflictos que revelen favoritismo o nepotismo y Conflicto de Roles o funciones, que puedan contaminar la suscripción, ejecución, terminación y liquidación del presente acuerdo de voluntades. <span class="minuta_paragrafo">PARÁGRAFO PRIMERO. INHABILIDADES E INCOMPATIBILIDADES.</span> Las partes afirman bajo la gravedad del juramento que se entiende prestando con la firma del presente contrato que no se hallan incursos en ninguna de las causales de inhabilidades e incompatibilidades descritas en el marco legal vigente. La violación a la norma jurídica citada es causal de terminación unilateral del presente contrato por parte de la ERP. <span class="minuta_paragrafo">PARÁGRAFO SEGUNDO. AUTORIZACION DE TOPES PRESUPUESTALES DEL PSS.</span> El PSS a través de su Representante Legal o quien haga sus veces, afirma bajo la gravedad del juramento que cuenta con la autorización respectiva para comprometerse con el valor del presente contrato y lo establecido en el objeto contractual. En caso de que el valor de presente contrato supere los topes presupuestales autorizados, deberá presentar los documentos o información adicional ante la ERP, que los habilite para obligarse con el valor contratado. la ERP</div>
            <span class="minuta_paragrafo">PARÁGRAFO PRIMERO.</span>

            <div class="minuta_clausula">Cláusula 40. Causales de suspensión</div>
            <div class="minuta_texto">Además de las causales de terminación previstas por la ley, el presente contrato se suspenderá en todos sus efectos, cuando quiera que ocurra una de las siguientes causas: 1) Cuando se adelante investigación administrativa, disciplinaria, civil o penal o adelantada por un ente de vigilancia y control por irregularidades cometidas por EL PSS y dependencias y dependientes, a discreción de la ERP y en consideración a la gravedad de los hechos motivo de la investigación. 2) Imposibilidad de carácter temporal de cualquiera de las partes para el cumplimiento de sus obligaciones contractuales, siempre que se informe a la otra parte con una antelación no inferior a treinta (30) días. Salvo en el caso del numeral 1 de esta cláusula y solo en lo que legalmente pueda corresponder, la suspensión del contrato no genera indemnización a favor de alguna de las partes.</div>

            <div class="minuta_clausula">Cláusula 41. Origen de los recursos</div>
            <div class="minuta_texto">Los recursos para la ejecución del presente contrato son provenientes del Sistema General de Seguridad Social en Salud mediante la ADRES y se incorporan al presupuesto de la ERP bajo las reglas establecidas en el marco legal vigente, respetando siempre su destinación.</div>

            <div class="minuta_clausula">Cláusula 42. Régimen de transparencia.</div>
            <div class="minuta_texto">Las partes manifiestan bajo la gravedad del juramento que no se encuentra incumpliendo el Régimen de transparencia y no existe conflicto de interés para contratar.</div>

            <div class="minuta_clausula">Cláusula 43. Anexos</div>
            <div class="minuta_texto">Hacen parte del presente contrato, los siguientes anexos los cuales la ERP y el PSS aceptan con la suscripción:</div>



            <div class="minuta_texto page_break_after display_none">Son anexos del presente contrato, además de la documentación legal de cada una de las partes, los siguientes:</div>
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
                  <td>1. Marco normativo</td>
                  <td class="text-center">SI</td>
                  <td>11. Mecanismos de ajuste de riesgo</td>
                  <td class="text-center">NO</td>
                </tr>
                <tr>
                  <td>2. Glosario de términos</td>
                  <td class="text-center">SI</td>
                  <td>12. Relación de GPC y protocolos de atención</td>
                  <td class="text-center">SI</td>
                </tr>
                <tr>
                  <td>3. Modelo de atención de Cajacopi EPS</td>
                  <td class="text-center">SI</td>
                  <td>13. Link de Redes Integrales de Atención en Salud</td>
                  <td class="text-center">SI</td>
                </tr>
                <tr>
                  <td>4. Caracterización de la población afiliada</td>
                  <td class="text-center">SI</td>
                  <td>14. Listado de precios de medicamentos</td>
                  <td class="text-center">SI</td>
                </tr>
                <tr>
                  <td>5. Nota Técnica</td>
                  <td class="text-center">NO</td>
                  <td>15. Listado de precios de insumos, dispositivos y otras tecnologías</td>
                  <td class="text-center">SI</td>
                </tr>
                <tr>
                  <td>6. Modelo de prestación de servicios</td>
                  <td class="text-center">SI</td>
                  <td>16. Red integral de prestadores de servicios de salud</td>
                  <td class="text-center">SI</td>
                </tr>
                <tr>
                  <td>7. Relación de sedes de atención y servicios</td>
                  <td class="text-center">SI</td>
                  <td>17. Canales transaccionales y de contacto</td>
                  <td class="text-center">SI</td>
                </tr>
                <tr>
                  <td>8. Capacidad instalada disponible</td>
                  <td class="text-center">SI</td>
                  <td>18. Acuerdo de confidencialidad</td>
                  <td class="text-center">SI</td>
                </tr>
                <tr>
                  <td>9. Indicadores de operación del acuerdo de voluntades</td>
                  <td class="text-center">SI</td>
                  <td>19. Estimación poblacional para el contrato</td>
                  <td class="text-center">NO</td>
                </tr>
                <tr>
                  <td>10. Formato de supervisión de los contratos</td>
                  <td class="text-center">SI</td>
                  <td>20. Población objeto del contrato</td>
                  <td class="text-center">SI</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>21. Anexo Técnico</td>
                  <td class="text-center">NO</td>
                </tr>

              </tbody>
            </table>

            <br>
            <div class="minuta_clausula">Cláusula 44. Domicilio contractual.</div>
            <div class="minuta_texto">Para todos los efectos del presente contrato, se tendrá como domicilio contractual el descrito en la portada del presente contrato.</div>

            <div class="minuta_clausula">Cláusula 45. Perfeccionamiento del contrato.</div>
            <div class="minuta_texto">El presente Contrato se perfecciona con la suscripción de este por las partes contratantes.</div>

            <div class="minuta_clausula">Cláusula 46. Efecto</div>
            <div class="minuta_texto">El presente acuerdo de voluntades deja sin efecto cualquier otro acuerdo de voluntades verbal o escrito entre las partes, efectuado con anterioridad, en relación con el mismo objeto y bajo el mismo mecanismo de pago aquí establecido, sin perjuicio que se sigan cumpliendo las obligaciones económicas derivadas de la prestación de servicios con ocasión del contrato anterior, hasta extinguirse por cumplimiento.</div>
            <br>
            <div class="minuta_texto">Leído el presente documento lo suscriben las partes como aparecen, en señal de conformidad, en dos originales, en la ciudad de Barranquilla el {{dia}} de {{mes}} de {{anio}}, entendiéndose perfeccionado con la firma de este.</div>

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
                <span>Número ID: <span>{{DATA.DOCUMENTO_REPRESENTANTE}} expedida en la ciudad de Barranquilla</span></span>
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
                <span>Número ID: <span>{{DATA.COD_REPRESENTANTE}}</span> expedida en la ciudad de {{DATA.EXPEDICION}}</span>
                <br>
                <!-- <span>Cargo: <span>GERENTE</span></span> -->
              </div>
            </div>
          </div>
          <!--  -->
          <div class="div_firmas_2">
            <table class="table_firma" width="100%" style="border: #FFF;">
              <tr class="border_white">
                <td colspan="1" style="width: 33%"></td>
                <td colspan="1" style="width: 33%"></td>
                <td colspan="1" style="width: 33%"></td>
              </tr>

              <tr>
                <td colspan="1" class="text-center">
                  ELABORO: Asistente Nacional de Contratación de Red y/o Auxiliar Nacional de Contratacion de Red.
                </td>
                <td colspan="1" class="text-center">
                  REVISÓ: Subgerente de Salud
                </td>
                <td colspan="1" class="text-center">
                  REVISO Y APROBO ASPECTOS JURIDICOS: Jefe de Oficina Jurídica
                </td>
              </tr>
              <tr>

                <td><br><br></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
          <!--  -->

          <!--  -->
        </td>
      </tr>
    </tbody>
  </table>
</body>

</html>
