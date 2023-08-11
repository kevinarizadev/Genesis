<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
      font-style: italic;
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
    }

    .div_firmas {
      width: 97%;
      position: absolute;
      bottom: 0;

    }

    .mt_1 {
      position: relative;
      display: block;
      float: left;
    }

    .div_firmas_2 {
      margin-top: 10vh;
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
  <script src="../../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <script src="../../../../bower_components/angular/angular.js"></script>
  <script src="../../../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../../../scripts/controllers/contratacion/formatos/formatominutacontratoController.js"></script>
</head>

<body ng-controller="formatominutacontratoController">
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
              <td colspan="1" rowspan="3" class="text-center">
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
          <div class="div_firmas" ng-if="mostrar_div_firmas">
            <table class="table_firma mt_1" width="100%" style="border: #FFF;">
              <tr class="border_white">
                <td colspan="1" style="width: 25%"></td>
                <td colspan="1" style="width: 25%"></td>
                <td colspan="1" style="width: 25%"></td>
                <td colspan="1" style="width: 25%"></td>
              </tr>
              <tr>
                <td colspan="1" class="text-center">
                  ELABORO: Asistente Nacional de Contratación de Red y/o Auxiliar Nacional de Contratacion de Red.
                </td>
                <td colspan="1" class="text-center">
                  REVISÓ: Subdirección Nacional de redes de PSS.
                </td>
                <td colspan="1" class="text-center">
                  REVISO Y APROBO ASPECTOS JURIDICOS: Coordinación Nacional Jurídica
                </td>
                <td colspan="1" class="text-center">
                  APROBO: Director Nacional de Salud
                </td>
              </tr>
              <tr>
                <td><br><br></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
          <!--  -->
          <div class="div_firmas" ng-if="!mostrar_div_firmas">
            <table class="table_firma mt_1" width="100%" style="border: #FFF;">
              <tr class="border_white">
                <td colspan="1" style="width: 33%"></td>
                <td colspan="1" style="width: 33%"></td>
                <td colspan="1" style="width: 33%"></td>
                <!-- <td colspan="1" style="width: 25%"></td> -->
              </tr>
              <tr>
                <td colspan="1" class="text-center">
                  ELABORO: Asistente Nacional de Contratación de Red y/o Auxiliar Nacional de Contratacion de Red.
                </td>
                <td colspan="1" class="text-center">
                  REVISÓ: Subgerencia Nacional de Salud.
                </td>
                <td colspan="1" class="text-center">
                  REVISO Y APROBO ASPECTOS JURIDICOS: Jefe de Oficina jurídica Nacional.
                </td>
                <!-- <td colspan="1" class="text-center">
                  APROBO: Director Nacional de Salud
                </td> -->
              </tr>
              <tr>
                <td><br><br></td>
                <td></td>
                <td></td>
                <!-- <td></td> -->
              </tr>
            </table>
          </div>
          <!--  -->
          <div id="minuta_contrato">
            <div class="minuta_titulo">MINUTA DEL CONTRATO - NUMERO: {{DATA.NUMERO_CONTRATO}}</div>
            <div class="minuta_texto_1 mb">
              Entre los suscritos a saber: {{DATA.REPRESENTANTE}} identificado con cédula de ciudadanía Nº {{DATA.DOCUMENTO_REPRESENTANTE}} expedida en la ciudad de Barranquilla en su calidad de representante legal de {{DATA.RAZON_SOCIAL}} entidad identificada con NIT: {{DATA.EPS}}, según consta en el certificado de existencia y representación legal adjunto, quien en adelante se denominará LA ERP y {{DATA.NOM_REPRESENTANTE}} identificado(a) con cédula de ciudadanía Nº {{DATA.COD_REPRESENTANTE}} expedida en la ciudad de {{DATA.EXPEDICION}} en su calidad de representante legal de {{DATA.RAZON_SOCIAL_IPS}} entidad identificada con NIT: {{DATA.NIT}}, según consta en el certificado de existencia y representación legal adjunto, entidad debidamente habilitada para operar en el Sistema General de Seguridad Social en Salud, quien en adelante se denominará EL PSS o EL PTS; hemos decidido suscribir el presente acuerdo de voluntades, el cual se regirá por las siguientes cláusulas:
            </div>
            <div class="minuta_titulo">CLAUSULADO</div>

            <div class="minuta_clausula">Cláusula 1. Objeto</div>
            <div class="minuta_texto">El objeto del presente contrato o acuerdo de voluntades es el de prestar servicios de salud descritos en la portada del presente contrato y en el Anexo 7; para la Población descrita en el Anexo 4 que se encuentra afiliada a la ERP, según el Modelo de Atención de la ERP contenido en el Anexo 3, el Modelo de Prestación de Servicios del PSS que se describe en el Anexo 6, y de acuerdo a la población objeto se describe en el anexo 20. Los servicios se sujetan a los contenidos en el Plan de Beneficios financiado con la Unidad de Pago por Capitación y los servicios financiados con Presupuestos Máximos que defina el Ministerio de Salud.</div>

            <div class="minuta_clausula">Cláusula 2. Obligaciones del PSS</div>
            <div class="minuta_texto">EL PSS se obliga para con la ERP a: 1. Prestar los servicios objeto del presente contrato, a los afiliados debidamente identificados y reportados en la base de datos de la ERP. 2. Permitir a la ERP o a quien este delegue el acceso a la información relacionada con el estado de salud del afiliado y la prestación de los servicios de salud, así mismo, permitirle el acceso a los documentos que requiera, de acuerdo con lo reglamentado en la Ley y en el presente contrato. 3. Suministrar información sobre la atención en salud prestada a los afiliados de la ERP que requieran cualquiera de los Organismos de dirección, inspección, vigilancia y control, en especial los indicadores de calidad de que trata la Circular Única de la Superintendencia Nacional de Salud, los eventos de salud pública, evidencia del cargue efectivo de Indicadores de monitores de la calidad en salud según el marco normativo del Anexo 1. 4., así mismo el cumplimiento de la calidad esperada establecida para cada indicador, Diligenciar la historia clínica de conformidad con las normas vigentes. 5.Vigilar que su personal asistencial y administrativo cumpla con lo estipulado en el Manual de Referencia y Contrarreferencia de la ERP, 6. Cumplir y mantener las condiciones de habilitación y suficiencia declaradas. Igualmente permitirá que la ERP las pueda verificar cuando así lo determine, según el PAMEC y el “Proceso de verificación de condiciones de habilitación”. El producto de esta verificación podrá dar como resultado el acompañamiento de la ERP a través de su auditoría para mejorar las condiciones de los servicios que lo ameriten. 7. Garantizar el suministro de los medicamentos, materiales e insumos que requieran los afiliados durante su atención, de acuerdo con los servicios contratados y descritos en los Anexos 14 y 15. 8. Recibir las glosas, responderlas, conciliarlas o en su defecto aceptarlas, dentro de los plazos definidos en la normatividad vigente. 9. Gestionar las inquietudes, reclamos y/o derechos de petición de los usuarios por la mala calidad en los servicios o la no prestación de estos, respondiendo directamente al usuario con copia a la ERP, dentro de los cinco (5) días calendario siguientes a la recepción del reclamo, inquietud o derecho de petición del usuario. 10. Atender los requerimientos derivados del cumplimiento de la supervisión del presente contrato. 11. Garantizar la calidad de los insumos, materiales y medicamentos utilizados en la atención de los usuarios y responder por los costos en que se incurra por reintervenciones y complicaciones donde se demuestre que la causa de estos sea debida a la mala calidad de los materiales, insumos o medicamentos utilizados durante la prestación de los servicios. Igualmente responderá en estos casos por la responsabilidad civil o penal que se deriven de estas complicaciones. 12. En el caso que un afiliado solicite los servicios incluidos en el presente contrato, pero no se encuentre en la base de datos entregada, EL PSS podrá brindar la atención solicitada siempre y cuando dicho afiliado se encuentre activo en verificación realizada a través del Portal Genesis / Opción Prestador (Consulta Afiliado), donde debe reportar la atención, o en la página web de la ERP. EL PSS reportará dicha inconsistencia en el marco normativo vigente descrito en el Anexo 1. Las atenciones prestadas serán facturadas mediante la modalidad de eventos y serán canceladas a las tarifas pactadas. 13. Cumplir los protocolos de atención de los programas de Gestión de Riesgos de la ERP y las guías de atención integral del Ministerio de Salud y Protección Social, concertadas con la ERP, en el marco de las actividades contratadas. 14. Brindar atención preferencial a las poblaciones especiales tales como víctimas de violencia, población en condición de desplazamiento forzado, reinsertados, minorías étnicas, discapacitados, embarazadas, personas de la tercera edad y demás que establezca la Ley. 15. Facilitar la información sobre notificación, clasificación, intervención y estudio de casos en los eventos de vigilancia epidemiológica. 16.Implementar el modelo servicios de salud amigables para adolescentes jóvenes y la estrategia Atención Integral de las Enfermedades Prevalentes de la Infancia - AIEPI acorde con lo definido en el marco normativo vigente descrito en el Anexo 1. 17. Entregar copia de los archivos en medio magnético en la misma estructura exigida en la Circular Única de la Superintendencia Nacional de Salud de los reportes de los indicadores mensuales y trimestrales de oportunidad y satisfacción de los usuarios. 18. Notificar los casos de los pacientes de grupos especiales: Renales, VIH, Cáncer, Tuberculosis, Hemofilia, Artritis, Enfermedades Huérfanas, Hipertensión Arterial y Diabetes Mellitus, con información y soportes clínicos concernientes a su atención y que es requerida para el reporte de la cuenta de Alto Costo ; para ello, la IPS deberá diligenciar el archivo de reporte de información de la cuenta de alto costo el cual debe ser entregado mensualmente junto con la factura de cobro o cargado en la herramienta que se determine para tal fin, en las fechas establecidas por la ERP. 19. Diseñar e implementar el modelo de gestión del servicio farmacéutico, según lo establecen las normas vigentes. 20. Implementar los diferentes comités reglamentados por la normatividad vigente, que le apliquen. 21. Implementar el Sistema de Información y Atención al Usuario para suministrar información, orientación y atención a los afiliados. 22. Derivar a los afiliados a los programas de promoción y prevención e inducir su demanda de servicios de estos programas y dar especial énfasis a la atención de pacientes sospechosos de eventos de interés en salud pública. 23. Contar en urgencias con el kit de atención a usuarios víctimas de violencia o agresión sexual, incluyendo especialmente anticoncepción de emergencia. 24. Informar a la ERP sobre cualquier novedad en los datos del afiliado, tales como teléfonos, correos electrónicos, dirección, nacimiento o fallecimiento de usuarios que se produzca bajo su atención, enviando copia del certificado de defunción dentro de las veinticuatro (24) horas siguientes al hecho. La información de fallecidos deberá ser suministrada a la dirección médica de la ERP, utilizando los formatos establecidos en la normatividad vigente. 25. Cumplir con las condiciones sanitarias y el plan de gestión de residuos hospitalarios PGHIRS, régimen de habilitación, nombramiento de revisor Fiscal (o demostrar que no está obligado), pago de la Tasa de Contribución a la Superintendencia Nacional de Salud, mantener vigente el Registro Mercantil y demás obligaciones propias. 26. Garantizar la afiliación de sus trabajadores a la Seguridad Social y cumplir con los pagos que de ella se deriven, así como de los aportes parafiscales. 27. Garantizar los servicios para la rehabilitación física y mental de los niños, niñas y adolescentes víctimas de violencia física o sexual y todas las formas de maltrato, que estén certificadas por la autoridad competente, garantizando la atención integral para cada caso, hasta que se certifique medicamente la recuperación de las victimas según en el marco normativo vigente descrito en el Anexo 1. Cumplir con lo establecido en el numeral 1.4 de la circular 026 de 2020 del ministerio de salud y Protección Social establece que “se debe aplicar, según corresponda, las guías de práctica clínica, la Guía de Intervención mhGAP, para los trastornos mentales, neurológicos y por uso de sustancias en el nivel de atención de la salud no especializada y los protocolos vigentes, a las personas con riesgos específicos en salud mental como conducta suicida, trastornos mentales y que requieren tratamientos continuos(…)” 32. EL PSS se obliga a las demás obligaciones derivadas del presente contrato y del contenido de la normatividad vigente. 33. Gestionar oportunamente los Eventos adversos y alertas tempranas reportadas por parte de la ERP 34. Activar la ruta de morir dignamente cuando reciba la solicitud por parte de algún afiliado.</div>

            <div class="minuta_clausula">Cláusula 3. Obligaciones de la ERP</div>
            <div class="minuta_texto">Las ERP se obliga a: 1. Garantizar el acceso oportuno a la información de la población a ser atendida, asegurando su calidad, depuración y la actualización oportuna de las novedades, a través de bases de datos georreferenciadas y mediante los mecanismos de verificación de derechos al momento de la atención, la cual deberá corresponder con lo registrado en la Base de Datos Única de Afiliados ­ BDUA-, así como la requerida para el cumplimiento de las disposiciones que reglamentan la factura electrónica de venta en el sector salud, 2. Pagar de manera oportuna las facturas debidamente radicadas, auditadas y conciliadas según los plazos establecidos en el marco normativo del Anexo 1. 3. Hacer seguimiento a la ejecución del presente contrato de conformidad con el manual de auditoría adjunto, 4. Publicar en la página web dentro de los primeros cinco días de cada mes, la base de datos en la que aparecerán los afiliados actualizados, que incluye las novedades del mes anterior. 5. Entregar al PSS la caracterización de la población afiliada usuaria del contrato 6. Garantizar la depuración, el correcto y oportuno registro de las novedades, así como la disponibilidad en línea de la base de datos de afiliados desde la página web de la ERP o a través del Portal Genesis / Opción Prestador (Consulta Afiliado), para la verificación de derechos. 7. Entregar al PSS la red de servicios de salud contratada por la ERP para garantizar la oportunidad, integralidad, continuidad y accesibilidad en la prestación de servicios de los afiliados y publicar de manera permanente en la página web el listado actualizado de prestadores de servicios de salud que conforman dicha red. 8. Dar respuesta a las solicitudes de autorización de servicios posteriores a la atención inicial de urgencias, autorización adicional y servicios electivos, según lo establecido en el marco normativo vigente descrito en el Anexo 1 y demás normas que modifiquen, adicionen, aclaren o sustituyan 9. Verificar la permanencia de las condiciones de habilitación y de suficiencia (capacidad instalada) del PSS, 10. Concertar con El PSS los estándares de calidad de la atención en salud y realizar la evaluación a través de indicadores de calidad, de gestión y de resultados, según los mecanismos que establezca el Ministerio de la Protección Social. 11. Verificar la documentación e implementación de los protocolos y/o guías de manejo que haya adoptado, adaptado o aprobado El PSS, 12. Reportar a la Superintendencia Nacional de Salud los prestadores que no cumplan con el reporte oportuno, confiable, suficiente y con la calidad mínima aceptable de la información necesaria para la operación del sistema de monitoreo, de los sistemas de información del sector salud, o de las prestaciones de salud (Registros Individuales de Prestación de Servicios) 13. El cumplimiento del reporte oportuno de los indicadores de calidad será pre requisito para el pago del mes siguiente al corte del reporte. El pantallazo de validación en la página de la Superintendencia deberá ser enviado a la ERP por correo electrónico. 14. Los copagos y cuotas moderadoras serán recaudados por el PSS y se hará el descuento por el monto total de copagos y cuotas moderadoras sobre las facturas que se expidan; los que se comportarán como abono a las facturas que por prestación de servicios emita el prestador. En caso de no realizar el recaudo por pate del PSS se deberá contar con la previa autorización de CAJACOPI EPS para proceder con el servicio.</div>

            <div class="minuta_clausula">Cláusula 4. Plazo de duración y vigencia</div>
            <div class="minuta_texto">El plazo de duración y vigencia del presente acuerdo de voluntades es el que se describe en la portada del presente contrato. En el evento que ninguna de las partes comunique a la otra su voluntad con una antelación no inferior a 30 días calendarios, de darlo por terminado o no renovado, se entenderá prorrogado automáticamente por el término inicialmente pactado, este se liquidará por mutuo acuerdo de las partes, quienes para tal efecto suscribirán acta de liquidación en la cual se consignarán los ajustes, revisiones y reconocimientos a que haya lugar, los acuerdos, conciliaciones y transacciones a que llegaren las partes, para dirimir las divergencias presentadas y poder declararse a paz y salvo por todo concepto. El Acta de liquidación deberá suscribirse dentro de los cuatro (4) meses siguientes a la causal de terminación. PARÁGRAFO PRIMERO: De no haberse liquidado el presente contrato de común acuerdo dentro de los cuatro (4) meses siguientes a su finalización, será liquidado unilateralmente por EL CONTRATANTE. Si ninguna de las partes muestra su interés efectivo por liquidar el contrato y no realiza ni una comunicación física o electrónica durante los doce (12) meses siguientes a la terminación del contrato, se entiende que ambas partes aceptan estar a paz y salvo por todo concepto y condonar toda deuda existente entre ellas.</div>

            <div class="minuta_clausula">Cláusula 5. Valor del contrato.</div>
            <div class="minuta_texto">El valor estimado del presente acuerdo de voluntades es el que se describe en la portada del contrato, sin perjuicio de los ajustes que se generan como consecuencia del proceso normal de glosas conciliadas y debidamente aceptadas o valores a favor que la ERP reconozca como incentivos por cumplimiento de indicadores.</div>

            <div class="minuta_clausula">Cláusula 6. Lugar donde se prestarán los servicios</div>
            <div class="minuta_texto">Los servicios descritos en la portada del presente acuerdo de voluntades se prestarán en las sedes del PSS según se describen en el Anexo 7.</div>

            <div class="minuta_clausula">Cláusula 7. Base de datos de afiliados usuarios del servicio</div>
            <div class="minuta_texto">La base de datos de afiliados a la ERP que serán usuarios de los servicios objeto del presente acuerdo de voluntades se genera a través de archivo plano y radicado físico o electrónico, el cual podrá ser accedido por el PSS, previa asignación de usuario y clave de acceso. La ERP se compromete a cargar mensualmente las actualizaciones dentro de los primeros 5 días del mes.</div>

            <div class="minuta_clausula">Cláusula 8. Relación de servicios de salud contratados</div>
            <div class="minuta_texto">La relación de servicios contratados es la que se describe en la portada del contrato y se detalla por cada una de las sedes del PSS en el Anexo 7.</div>

            <div class="minuta_clausula">Cláusula 9. Relación de tecnologías de salud objeto de contratación</div>
            <div class="minuta_texto">En el marco de la prestación de servicios que se describen en el Anexo 7, el PSS suministrará según los criterios científicos de las Guías de Práctica Clínica que se alistan en el Anexo 12 y de las Rutas de Atención Integral que se alistan en el Anexo 13, los medicamentos según sus presentaciones y precios contenidos en el Anexo 14 y los insumos, suministros y demás tecnologías que se alistan en el anexo 15.</div>

            <div class="minuta_clausula">Cláusula 10. Red Integral de Prestadores de Servicios de Salud</div>
            <div class="minuta_texto">Para efectos de garantizar la integralidad y la continuidad en la atención de los usuarios y el acceso efectivo a la atención, los servicios objeto del presente contrato se complementan con los servicios contratados con otros prestadores y proveedores de tecnologías en salud que se describen en el Anexo 16, en el marco de las Redes Integradas de Prestadores de Servicios de Salud registrada en el módulo Especial del Registro Especial de Prestadores; para lo cual los prestadores deberán utilizar los procesos de referencia y contrarreferencia así como las tecnologías de información para transferencia de datos clínicos de los pacientes y las herramientas de comunicación que permitan la trazabilidad de la información y evidencien la diligencia y oportunidad en la gestión, de conformidad con los estándares descritos en el (Anexo 9) del presente acuerdo de voluntades.</div>

            <div class="minuta_clausula">Cláusula 11. Modalidad de pago</div>
            <div class="minuta_texto">El presente acuerdo de voluntades se pagará según la modalidad descrita en la portada del contrato.</div>

            <div class="minuta_clausula">Cláusula 12. Tarifas</div>
            <div class="minuta_texto">Las tarifas de los servicios son las pactadas en la nota técnica para las modalidades de pago prospectivo y para los servicios y tecnologías no incluidos en la misma se reconocerán bajo la modalidad de pago por evento según las tarifas pactadas en los Anexos 14 y 15. Para cualquier otro servicio que no se incluya ni en la nota técnica ni en los Anexos 14 y 15 se liquidarán según las tarifas pactadas.</div>

            <div class="minuta_clausula">Cláusula 13. Listado de GPC y Protocolos de Atención</div>
            <div class="minuta_texto">El PSS se compromete a prestar los servicios de conformidad con las Guías de Práctica Clínica (GPC) y los Protocolos de Atención que se describen en el Anexo 12 del presente contrato. Para los servicios asociados con Rutas Integrales de Atención en Salud, las cantidades, periodicidad y oportunidad se ajustarán a las RIAS alistadas en el Anexo 13.</div>
            <div class="minuta_paragrafo">Parágrafo 1. Correspondencia entre RIPS con GPC, protocolos y RIAS</div>
            <div class="minuta_texto">Los servicios y tecnologías reportadas en los RIPS que se anexen mensualmente a la factura corresponderán a las GPC, Protocolos y RIAS contenidas en estos Anexos en cuanto a las cantidades y dosis recomendadas.</div>
            <div class="minuta_paragrafo">Parágrafo 2. Actualización de las GPC y RIAS</div>
            <div class="minuta_texto">Las partes del contrato revisarán cada año los listados anexos según las nuevas evidencias científicas surgidas. Se entenderán automáticamente adoptados los servicios y tecnologías a que se refieren las GPC y las RIAS del Ministerio de Salud / Instituto de Evaluación de Tecnologías en Salud IETS, en la medida en que se vayan actualizado, no obstante, los precios de nuevos servicios o tecnologías sugeridas por las actualizaciones deberán pactarse mediante un otrosí que modifique los Anexos 14 y 15 del presente contrato.</div>

            <div class="minuta_clausula">Cláusula 14. Rutas Integrales de Atención en Salud</div>
            <div class="minuta_texto">El PSS garantizará la prestación de los servicios de salud y el suministro de medicamentos, insumos y demás tecnologías en salud según el listado de RIAS del Anexo 13. El PSS se compromete a cumplir con los lineamientos técnicos y operativos de las RIAS adoptadas por el ministerio de salud y protección social y que forman parte integral del presente contrato. La prestación o provisión de servicios y tecnologías de salud relacionados con la implementación de las RIAS que el Ministerio de Salud y Protección Social haya definido como de obligatorio cumplimiento; las priorizadas por la entidad responsable de pago de acuerdo con la caracterización poblacional o el análisis de la situación en salud que esta realice; la gestión de eventos y condiciones en salud priorizados a través de la política pública, y todos aquellos que así se haya previsto por la normatividad.</div>
            <div class="minuta_paragrafo">Parágrafo 1. Vigencia de la autorización</div>
            <div class="minuta_texto">Para los casos en que se requiera autorización, ésta será expedida con una vigencia de 90 días, tiempo en el cual el PSS o PTS deberá prestar el servicio o proveer la tecnología autorizada y facturar a la ERP. Una vez expirada la vigencia, deberá solicitarse una nueva autorización.</div>
            <div class="minuta_paragrafo">Parágrafo 2. Prohibición de expedición de autorizaciones</div>
            <div class="minuta_texto">En aras de garantizar el acceso continuo de los usuarios a la prestación o provisión de los servicios o tecnologías en salud, sin interrupciones por razones administrativas, de conformidad con el marco normativo vigente descrito en el Anexo 1. La atención se brindará procurando eliminar barreras administrativas que afecten la prestación o provisión de los servicios o tecnologías, priorizando la atención integral del usuario y quitándole la carga administrativa de tramitar autorizaciones, las cuales se tramitarán entre las partes a través de un canal transaccional electrónico, de manera transparente para los usuarios. No habrá lugar a la solicitud de autorización para la atención integral del cáncer infantil o de adultos o de VIH/Sida de conformidad con el marco normativo vigente descrito en el Anexo 1.</div>

            <div class="minuta_clausula">Cláusula 15. Autorización de servicios</div>
            <div class="minuta_texto">Para los servicios pactados bajo modalidades de pago prospectivas no se requerirá ninguna autorización previa de servicios. Para los servicios por fuera de la nota técnica, pactados bajo la modalidad de evento, el PSS solicitará autorización del servicio según los tiempos y mecanismos descritos en el marco normativo vigente, mediante los canales de contacto descritos en el Anexo 17. La ERP expedirá la autorización a través de un canal informático transaccional y notificará al PSS/PTS y usuario dentro de los tiempos establecidos por el marco normativo vigente.</div>

            <div class="minuta_clausula">Cláusula 16. Nota técnica</div>
            <div class="minuta_texto">El presente acuerdo de voluntades incluye la nota técnica (Anexo 5) que hace parte integral del mismo y contiene los siguientes elementos: 1. Población objeto total y susceptible de cada servicio o tecnología en salud de acuerdo con la caracterización poblacional, el nivel de acceso de las poblaciones, los aspectos operativos de la prestación y los modelos diferenciales; 2. Frecuencias de uso de los servicios y tecnologías en salud, de acuerdo con el plazo del acuerdo de voluntades y sus probabilidades de uso; 3. Costos acordados para cada servicio o tecnología en salud, de acuerdo con las diferentes modalidades de prestación de los servicios de salud.</div>

            <div class="minuta_clausula">Cláusula 17. Mecanismos de evaluación de nota técnica</div>
            <div class="minuta_texto">En los contratos de modalidades de pago prospectivo la nota técnica se evaluará mensualmente de conformidad con los RIPS y/o el reporte de Actividades registrado por el prestador a través de la Herramienta Genesis para los contratos por modalidad PGP, validados que se radiquen con las facturas, y de manera trimestral se determinará su cumplimiento o desviación en cuanto a población susceptible, frecuencias y valores, con el fin de determinar la necesidad de ajustes en los mismos, a través de mecanismos de corrección de riesgo frente a las desviaciones de la nota técnica descritos en el Anexo 5 y el Anexo 11.</div>
            <div class="minuta_paragrafo">Parágrafo 1: Liquidación parcial trimestral</div>
            <div class="minuta_texto">En los contratos de modalidades de pago prospectivo la liquidación parcial trimestral los saldos a favor y en contra identificados para cada servicio se irán acumulando hasta el final del contrato dejando actas de liquidación parcial trimestral suscritas por las partes autorizadas por cada entidad y durante la liquidación final del mismo, a su terminación, se conciliarán los saldos a favor o en contra de la ERP. Los saldos a favor de la ERP se cancelarán por parte del PSS mediante una nota crédito que se aplicará en el último pago y si el saldo es en contra se pagará contra una factura adicional que el prestador radicará adjuntando como soporte el acta de liquidación del contrato.</div>

            <div class="minuta_clausula">Cláusula 18. Mecanismos de equilibrio financiero</div>
            <div class="minuta_texto">Los riesgos primarios de incidencia y de severidad se equilibrarán de conformidad con los mecanismos establecidos en el Anexo 11. Los riesgos técnicos serán objeto de negociación en la liquidación de cada contrato.</div>

            <div class="minuta_clausula">Cláusula 19. Supervisión del contrato</div>
            <div class="minuta_texto">La ERP ejercerá la supervisión sobre la ejecución de los servicios objeto del presente contrato, a través de su personal delegado, el cual se designa en la portada del presente contrato. La ERP, se reserva el derecho de realizar las visitas de monitoreo y la supervisión que estime convenientes. De igual forma, con la finalidad de asegurar que la prestación por parte del PSS se realice en condiciones óptimas de calidad, La ERP podrá inspeccionar, verificar el servicio e igualmente hacer sugerencias por escrito para que EL PSS corrija las deficiencias en la prestación del servicio.</div>

            <div class="minuta_clausula">Cláusula 20. Coordinación de referencia y contrarreferencia</div>
            <div class="minuta_texto">El PSS aplicará el Manual de Referencia y Contrarreferencia suministrado por la ERP de conformidad con los prestadores descritos en el Anexo 16 y utilizando los contactos descritos en el Anexo 17.</div>

            <div class="minuta_clausula">Cláusula 21. Indicadores de evaluación de la ejecución</div>
            <div class="minuta_texto">Para efectos de evaluar el cumplimiento del presente acuerdo de voluntades, el PSS se obliga a reportar a la ERP los indicadores de calidad, de gestión y de resultados descritos en el Anexo 9 y en el marco normativo vigente descrito en el Anexo 1. La ERP realizará una medición inicial en la visita de verificación precontractual que se considerará su línea de base al momento de iniciar la ejecución del acuerdo de voluntades y en caso de prórrogas, los avances en su gestión durante el término ejecutado serán la nueva línea de base para su continuidad.</div>
            <div class="minuta_paragrafo">Parágrafo 1. Actualización de indicadores e imprevistos</div>
            <div class="minuta_texto">En caso de eventos imprevisibles, fuerza mayor o caso fortuito, que afecten la prestación o provisión de servicios y tecnologías en salud y el cumplimiento de los indicadores pactados, estos deberán ser ajustados de acuerdo con las nuevas condiciones mediante la celebración de un otrosí.</div>

            <div class="minuta_clausula">Cláusula 22. Proceso periódico de evaluación</div>
            <div class="minuta_texto">El contrato se evaluará de conformidad con el Modelo de Auditoría descrito en el Anexo 10 y de conformidad con las cláusulas 17 a 20 del presente acuerdo de voluntades.</div>
            <div class="minuta_paragrafo">Parágrafo 1. Modelo de auditoría de calidad</div>
            <div class="minuta_texto">El modelo de auditoría contempla los aspectos administrativos, financieros, técnico-científicos y de calidad del servicio que hacen parte del Sistema Obligatorio de Garantía de Calidad en Salud -SOGCS. La auditoría de la calidad de la atención de los servicios deberá desarrollarse de acuerdo con el Programa de Auditoría para el Mejoramiento de la Calidad -PAMEC- de cada uno de los agentes, de conformidad con lo establecido en el Capítulo 4 "Auditoría para el mejoramiento de la calidad de la atención de salud" del Título 1 de la Parte 5 del Libro 2 de Decreto 780 de 2016 o según la norma que los modifique, adicione o sustituya.</div>
            <div class="minuta_paragrafo">Parágrafo 2. Modelo de auditoría de cuentas médicas</div>
            <div class="minuta_texto">La auditoría de las cuentas médicas se realizará con base en los soportes definidos en el marco normativo vigente, con sujeción a los estándares establecidos en el Manual Único de Devoluciones, Glosas y Respuestas expedido por el Ministerio de Salud y Protección Social, conforme a los términos señalados en el trámite de glosas establecido en el mismo y de acuerdo con la información reportada y validada en el Registro Individual de Prestaciones de Salud.</div>
            <div class="minuta_paragrafo">Parágrafo 3. Acceso a la historia clínica</div>
            <div class="minuta_texto">Para los efectos previstos en esta cláusula, el PSS deberá garantizar a la ERP el acceso a la historia clínica del usuario a través de medios electrónicos o digitales, con el fin de facilitar los procesos de auditoría y seguimiento. La ERP deberá cumplir con las condiciones de seguridad adoptadas por el prestador o proveedor para la guarda y custodia de los datos personales y datos sensibles contenidos en esta. El tratamiento de los datos personales, en especial de los datos sensibles, se realizará con sujeción a lo dispuesto en la Ley Estatutaria de salud y en el marco normativo vigente en materia de protección de datos confidenciales y sensibles.</div>

            <div class="minuta_clausula">Cláusula 23. Reportes obligatorios</div>
            <div class="minuta_texto">PSS reportará a la ERP dentro de los primero cinco (5) días HÁBILES de cada mes vencido: 1. Los Indicadores de calidad de la atención de salud establecidos en el Anexo 9, a través de los mecanismos que CAJACOPI EPS establezca; especialmente el reporte de la resolución 1552 de 2013 deben hacerlo a través de la plataforma Genesis en el módulo salud/1552. 2. Los Indicadores de reporte obligatorio en las normas vigentes de la Superintendencia Nacional de Salud;3. Los casos de sospecha de reacciones adversas a medicamentos deben ser notificados en el formato del INVIMA. 4. Todos los reportes obligatorios del SIVIGILA según las pautas, formatos, manuales de vigilancia epidemiológica vigentes del Instituto; 5. La información de las actividades de protección específica y detección temprana (PEDT) en la estructura, formato y periodicidad que determinada por el Ministerio de Salud y Protección Social, dentro de los 20 primeros días de cada mes.</div>

            <div class="minuta_clausula">Cláusula 24. Facturación y glosas</div>
            <div class="minuta_texto">EL PSS o PTS radicará antes a la ERP la Factura Electrónica de Venta (FEV) dentro de los plazos y condiciones establecidos en la ley y reglamentos vigentes, utilizando el canal transaccional descrito en el Anexo 17 del presente contrato. La FEV deberá contener los RIPS y soportes completos exigidos por el marco normativo vigente descrito en el Anexo 1, so pena de devolución.</div>
            <div class="minuta_paragrafo">Parágrafo 1. Facturación individual por usuario</div>
            <div class="minuta_texto">La facturación se debe presentar de manera discriminada por cada usuario e ítem con el valor unitario según las tarifas pactadas en el presente contrato y cuando se trate de servicios contenidos en la nota técnica, el valor deberá corresponder a la tarifa pactada en la misma.</div>
            <div class="minuta_paragrafo">Parágrafo 2. Circulares sobre reportes de información</div>
            <div class="minuta_texto">Para todos los efectos hace parte integral de este contrato las circulares expedidas por la ERP, mediante las cuales se imparten indicaciones respecto a los soportes requeridos para la presentación de facturas de tecnologías en salud no cubiertas en el Plan de Beneficios en Salud.</div>
            <div class="minuta_paragrafo">Parágrafo 3. Facturación del mes de diciembre</div>
            <div class="minuta_texto">EL PSS deberá presentar las facturas por la prestación de servicios dentro de la misma vigencia del contrato y las atenciones del último mes, a más tardar al mes siguiente.</div>
            <div class="minuta_paragrafo">Parágrafo 4. Reporte de RIPS</div>
            <div class="minuta_texto">PSS reportará a la ERP como requisito obligatorio para la radicación de la factura, los Registros Individuales de Prestación de Servicios de Salud RIPS utilizando: 1. La clasificación única de procedimientos CUPS, 2. La codificación única que determine el Ministerio de La Protección Social para los insumos y dispositivos médicos, a los cuales el INVIMA haya otorgado registro sanitario. 3. Todos los medicamentos deberán ser reportados en códigos Cums (expediente + consecutivo) según base de datos Invima vigente, Adicionalmente, los RIPS deben corresponder con los códigos y valores de los servicios, medicamentos e insumos contratados.</div>
            <div class="minuta_paragrafo">Parágrafo 5. Notificación de Prestación</div>
            <div class="minuta_texto">La prestación del servicio, entrega del medicamento o insumo, se deberá realizar con previa validación del número de autorización emitido por la EPS en el portal transaccional de CAJACOPI EPS que se disponga para tal fin, finalizada la atención en un periodo no mayor a tres días posteriores. Sin dicha validación se dará por no prestado el servicio o entregado el medicamento o insumo, lo que impedirá la radicación de la factura.</div>

            <div class="minuta_clausula">Cláusula 25. Plazos de pago</div>
            <div class="minuta_texto">Los plazos de pago son los establecidos en las normas vigentes descritas en el anexo normativo N° 1 del presente contrato.</div>

            <div class="minuta_clausula">Cláusula 26. Mecanismos de solución de conflicto</div>
            <div class="minuta_texto">Las partes se comprometen a recurrir inicialmente a la conciliación directa de sus diferencias antes de recurrir a los organismos de vigilancia y control. Los temas no conciliados luego de al menos dos intentos podrán dirimirse ante la Superintendencia Nacional de Salud mediante el proceso de Conciliación Extrajudicial en Derecho, según sus competencias legales.</div>

            <div class="minuta_clausula">Cláusula 27. Causales de terminación del contrato</div>
            <div class="minuta_texto">El presente contrato podrá terminarse por: 1. Por mutuo acuerdo. 2. Por incumplimiento de las obligaciones de <b>EL CONTRATISTA</b> contenidas o emanadas del presente contrato. 3. Por fuerza mayor o caso fortuito demostrado. 4. Cuando el término de suspensión supere los 4 meses, sin que se haya reanudado el contrato, 5. Por revocatoria de funcionamiento de una de las partes. 6. Por orden de autoridad pertinente y/o competente. 7. Por decisión unilateral de cualquiera las partes, con previo aviso de treinta (30) días calendario. 8. Cuando <b>EL CONTRATANTE</b> documente no conformidades graves en los procesos de atención y/o facturación de los servicios. 9. Cualquier sanción impuesta por parte de las Autoridades de Inspección, Vigilancia y Control a <b>EL CONTRATISTA</b> y que tengan que ver con hechos o actos que afecten la calidad de los servicios contratados. 10. <b>EL CONTRATANTE</b> podrá terminar el contrato derivado de la no ejecución de los planes de mejoramiento solicitados en debida forma y por escrito a <b>EL CONTRATISTA</b> sin que medie justa causa para dicha omisión. 11. Por cualquier situación donde alguna de las partes deje de hacer presencia en el municipio de prestación del servicio. 12. Cuando haya operado la condición resolutoria expresa. 13. Por resolución judicial debidamente ejecutoriada. 14. <b>El CONTRATANTE</b> podrá terminar el contrato de manera unilateral si por causa de investigación administrativa, judicial o de vigilancia y control, <b>EL CONTRATISTA</b> resulte sancionado por acto que afecte el Código del buen Gobierno, la transparencia, la lealtad y confianza legítima de las partes. 15. <b>El CONTRATANTE</b> podrá terminar el contrato de manera unilateral, cuando <b>EL CONTRATISTA</b> subcontrate sin su autorización.</div>
            <div class="minuta_paragrafo">PARÁGRAFO PRIMERO: CESACIÓN EN LA PRESTACIÓN DE SERVICIOS: EL CONTRATISTA</div>
            <div class="minuta_texto">en ninguna circunstancia podrá suspender, retirar servicios de salud objeto del presente contrato o cesar la prestación de estos, conducta que se considerará como incumplimiento grave en las obligaciones de <b>EL CONTRATISTA</b>. Para que la suspensión, retiro o cesación de los servicios se entienda válida y no constituya incumplimiento alguno, debe ser notificada por <b>EL CONTRATISTA a EL CONTRATANTE</b>, mediante escrito y dentro de los sesenta (60) días anteriores a la fecha de suspensión, cesación o retiro del servicio, en donde deberá justificar el motivo de la suspensión, debiendo esta solicitud ser aceptada por <b>EL CONTRATANTE</b> para que pueda realizarse por parte de <b>EL CONTRATISTA</b>. De lo contrario, éste deberá continuar prestando los servicios contratados.</div>
            <div class="minuta_paragrafo">PARÁGRAFO SEGUNDO:</div>
            <div class="minuta_texto">Cualquiera sea la causa de terminación del presente contrato, para todos los efectos de este, se surtirán todos los alcances de la terminación del artículo 2.5.3.4.16 del Decreto 780 de 2016, sin detrimento de la resolución y/o conciliación de cuentas que eventualmente queden pendientes y que serán resueltas en los tiempos dispuestos por la legislación especial sobre la materia.</div>
            <div class="minuta_paragrafo">PARÁGRAFO TERCERO:</div>
            <div class="minuta_texto">En cualquier caso, <b>EL CONTRATANTE</b>, se reserva el derecho de dar por terminado el contrato sin justa causa en cualquier momento notificando a <b>EL CONTRATISTA</b>, con treinta días de anticipación, sin que haya lugar a indemnización alguna.</div>

            <div class="minuta_clausula">Cláusula 28. Incentivos pactados</div>
            <div class="minuta_texto">Las partes pactarán en el acta de Iniciación del Contrato el reconocimiento de incentivos de tipo económico o no económico por la mejoría, logro y mantenimiento de resultados de los indicadores pactados, eligiendo un mecanismo que estimule la prestación y provisión de servicios y tecnologías basado en valor, de acuerdo con el objeto del acuerdo de voluntades.</div>

            <div class="minuta_clausula">Cláusula 29. Canales de relacionamiento</div>
            <div class="minuta_texto">Los canales de relacionamiento entre las partes son los establecidos en el Anexo 17.</div>

            <div class="minuta_clausula">Cláusula 30. Póliza de responsabilidad civil</div>
            <div class="minuta_texto">El PSS mantendrá vigente una Póliza de responsabilidad civil, contractual y extracontractual médica para amparo a terceros por servicios derivados de la atención en salud, por un valor asegurado que corresponda al 10% del presente contrato y que ampare el tiempo de ejecución de este, quedando obligada a responder con recursos propios por la diferencia que pueda existir entre el valor asegurado y el valor de las eventuales indemnizaciones derivadas del daño ocurrido. El PSS hará entrega de la póliza a la ERP dentro de los tres (3) días siguientes a la suscripción del contrato.</div>

            <!-- <div class="minuta_clausula">Cláusula 31. Garantía Única</div> -->
            <!-- <div class="minuta_texto"><i>El PSS constituirá a sus costas y ante una compañía aseguradora debidamente autorizada por la Superintendencia Financiera una garantía única a favor de la ERP con los siguientes amparos: <b>1) CUMPLIMIENTO</b> por el <b><u>5%</u></b> del valor del contrato que ampare el tiempo de ejecución del contrato y cuatro meses posteriores a la terminación. <b><u>2) CALIDAD DEL SERVICIO</b></u> por el <b><u>5%</b></u> del valor del contrato que ampare el tiempo de ejecución del contrato y cuatro meses posteriores a la terminación. <b><u>3) PAGO DE SALARIOS, PRESTACIONES SOCIALES, INDEMNIZACIONES LABORALES</b></u> por el <b><u>5%</b></u> del valor del contrato que ampare el tiempo de ejecución del contrato y treinta y seis (36) meses posteriores a la terminación.</i></div> -->
            <!-- <div class="minuta_paragrafo">Parágrafo 1. Entrega de las garantías</div> -->
            <!-- <div class="minuta_texto">EL PSS deberá constituir las garantías a más tardar dentro de los ocho (8) días siguientes a la firma del acuerdo de voluntades y se requiere de la aprobación por parte de la ERP. Estas garantías podrán hacerse efectivas por parte de la ERP si se verifica incumplimiento, previo aviso del siniestro ante la aseguradora.</div> -->

            <div class="minuta_clausula">Cláusula 31. Cesión.</div>
            <div class="minuta_texto">El PSS no podrá ceder total o parcialmente el presente contrato sin la autorización de la ERP.</div>

            <div class="minuta_paragrafo">PARÁGRAFO PRIMERO:</div>
            <div class="minuta_texto">El presente contrato al igual que los derechos y obligaciones emanados de la ejecución de este, será cedido de conformidad a lo establecido en el Artículo 2.1.13.9. Procesos de reorganización institucional del Decreto 780 de 2016 Decreto único reglamentario del sector salud y sus modificaciones, conforme a lo establecido en el numeral 87.2 del artículo 87 del Decreto 2353 de 2015, a la entidad promotora de salud resultante del proceso de Reorganización institucional.</div>
            <div class="minuta_paragrafo">PARÁGRAFO SEGUNDO:</div>
            <div class="minuta_texto">Las cesiones de créditos que suscriba EL CONTRATISTA con un tercero, NO surtirán efectos sobre los créditos, saldos y/o facturas que se generen con ocasión de la ejecución del presente contrato, si no cuentan con la autorización expresa y por escrito de <b>EL CONTRATANTE</b></div>

            <div class="minuta_texto">La cesión requerirá de la suscripción de un contrato de cesión con las mismas disposiciones del actual sin que represente costo alguno para la ERP.</div>

            <div class="minuta_clausula">Cláusula 32. Régimen jurídico del contrato</div>
            <div class="minuta_texto">El presente acuerdo de voluntades se rige por el derecho privado y el marco normativo descrito en el Anexo 1. Le son aplicables los procesos precontractuales, contractuales y post contractuales descritos en el Decreto 441 de 2022, adoptados en el Manual de Contratación de la ERP.</div>

            <div class="minuta_clausula">Cláusula 33. Prevención del lavado de activos y financiación del terrorismo:</div>
            <div class="minuta_texto">En cumplimiento del marco normativo vigente en el Sistema de Administración de Riesgos de Lavado de Activos y Financiación del Terrorismo (SARLAFT)Cláusula 1. Prevención del lavado de activos y financiación del terrorismo y financiación de la proliferación de armas de destrucción masiva: En cumplimiento del marco normativo vigente en el Sistema de Administración de Riesgos de Lavado de Activos y Financiación del Terrorismo (SARLAFT), Las partes certifican que sus recursos no provienen ni se destinan al ejercicio de ninguna actividad ilícita o de actividades conexas al lavado de activos provenientes de éstas o de actividades relacionadas con la financiación del terrorismo, narcotráfico, proliferación de armas de destrucción masiva o corrupción. LAS PARTES SE OBLIGAN: A realizar todas las actividades encaminadas a asegurar que las mismas, todos sus socios, administradores, clientes, proveedores, empleados, etc., y los recursos de estos, no se encuentren relacionados, provengan, de actividades ilícitas, particularmente de lavado de activos, financiación del terrorismo y financiación de la proliferación de armas de destrucción masiva. En todo caso, si durante el plazo de vigencia del contrato, las partes, algunos de sus administradores, socios o administradores llegaren a ser I) vinculado por parte de las autoridades competentes a cualquier tipo de investigación por delitos de narcotráfico, terrorismo, secuestro, lavado de activos, financiación del terrorismo, financiación de la proliferación de armas de destrucción masiva y administración de recursos relacionados con actividades terroristas y otros delitos relacionados con el lavado de activos, financiación del terrorismo y financiación de la proliferación de armas de destrucción masiva. II) Incluido en listas para el control de lavado de activos y financiación del terrorismo administradas por cualquier autoridad nacional o extranjera, tales como las listas de la Oficina de Control de Activos en el Exterior OFAC emitida por las oficinas del Tesoro de los Estados Unidos de Norte América, la lista de la organización de las Naciones Unidas y otras listas públicas relacionadas con el tema del lavado de activos y financiación del terrorismo. III) Condenado por parte de las autoridades competentes en cualquier tipo de proceso judicial relacionado con la comisión de los anteriores delitos; o IV) llegare a ser señalado públicamente por cualquier medio de amplia difusión nacional (prensa, radio, televisión, etc.) como investigados por delitos de narcotráfico, terrorismo, secuestro, lavado de activos, financiación del terrorismo, financiación de la proliferación de armas de destrucción masiva y/o administración de recursos relacionados con actividades terroristas u otros delitos relacionados con el lavado de activos y financiación del terrorismo y/o cualquier delito, colateral o subyacente a estos; la otra parte tiene el derecho de terminar unilateralmente el contrato en cualquier tiempo sin que por este hecho esté obligado a indemnizar ningún tipo de eventual perjuicio. De la misma forma, declaran que los recursos que incorporan para el desarrollo del objeto del presente contrato proceden de actividades completamente lícitas. Igualmente, LAS PARTES se obligan expresamente a entregar la información veraz y verificable que se le exija para el cumplimiento de la normativa relacionada con prevención de lavado de activos, financiación del terrorismo, financiación de la proliferación de armas de destrucción masiva y a actualizar sus datos regularmente, suministrando la totalidad de los soportes que se requieran. En el evento en que no se cumpla con la obligación consagrada en la presente cláusula, LA PARTE cumplida tendrá la facultad de dar por terminada la relación jurídica surgida.</div>
            <div class="minuta_paragrafo">Parágrafo 1. Aceptación de la política de protección de datos</div>
            <div class="minuta_texto">El PSS o PTS declara que conoce, acepta y acatará la Política de privacidad y protección de datos personales de la ERP, la cual puede descargarse de su sitio de internet.</div>
            <div class="minuta_paragrafo">Parágrafo 2. Compromisos relacionados</div>
            <div class="minuta_texto">Cada una de las partes se compromete a cumplir la Constitución, leyes y reglamentos aplicables a la prevención del soborno y a favor de la transparencia, así como a involucrarse únicamente en negocios legítimos y prácticas éticas en sus operaciones comerciales, sus relaciones o transacciones con cualquier empleado o funcionario vinculado con cualquiera de las partes o de cualquier otra entidad que pertenezca o sea dirigida o controlada por alguna de las partes, o con partidos políticos o sus candidatos. Ninguna de las partes ni sus directivos, directores, empleados o agentes pagará, ofrecerá, entregará, prometerá o autorizará el pago, directa o indirectamente, de cualquier importe, regalo u objeto o actividad valorable económicamente a ningún contacto comercial o Empleado gubernamental con la intención o propósito de inducir a dicha persona a ejercer su autoridad para ayudar a la otra parte o a cualquier afiliado de la otra parte a cambio de una ganancia personal. El Pago prohibido no incluye el pago de gastos razonables efectuados de buena fe, como los costos de desplazamiento y alojamiento que estén directamente relacionados con la promoción, demostración o explicación de productos o servicios o con la ejecución o realización de un contrato, siempre y cuando dichos pagos estén permitidos por las Leyes aplicables.</div>

            <div class="minuta_clausula">Cláusula 34. Indemnización de perjuicios frente a reclamaciones administrativas y judiciales.</div>
            <div class="minuta_texto">En consonancia y cumplimiento de la Clausula 30 Póliza de Responsabilidad Civil de este contrato, el PSS responderá por todos los daños patrimoniales y extrapatrimoniales que sean causados a los usuarios a su cargo en el nivel asistencial, así como también por toda reclamación administrativa y judicial que contra esta se llegare a presentar de forma directa o indirecta con ocasión de los servicios objeto del presente contrato.</div>
            <div class="minuta_texto">Es obligación de <b>EL CONTRATISTA</b>, la eficiente prestación de los servicios contratados, en todo caso, mantendrá indemne a <b>EL CONTRATANTE</b>, de cualquier reclamación proveniente de terceros que tenga como causa las actuaciones de <b>EL CONTRATISTA</b> o del personal designado para el cumplimiento del Contrato. En el evento, de acciones jurídicas legales contra <b>EL CONTRATANTE</b>, se entenderá que el proceso no se puede desarrollar sin la presencia procesal de <b>EL CONTRATISTA</b>.</div>

            <div class="minuta_clausula">Cláusula 35. Habeas data:</div>
            <div class="minuta_texto">En cumplimiento de lo dispuesto en el marco normativo vigente en lo correspondiente a la protección de datos personales, las partes declaran que son conocedoras y aceptan que en caso que en desarrollo del objeto de este contrato las partes lleguen a realizar tratamiento de datos personales o sensibles en los términos de la normatividad, se obligan a respetar, mantener absoluta reserva y confidencialidad y de cualquier manera garantizar la seguridad y privacidad de la información y/o datos personales sensibles que le sean transmitidos o que de cualquier forma o medio llegue a conocer y/o que sean por éste recolectados, almacenados, usados, objeto de circulación o en general de cualquier operación o conjunto de operaciones, bajo los términos y/o condiciones que indique tanto la normatividad vigente como la Política para el Tratamiento de la Información y/o datos personales que haya sido adoptada por cada una de las partes. Así mismo, se obligan a contar con los medios técnicos, humanos y administrativos que sean necesarios para otorgar confidencialidad y seguridad a los datos evitando su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento y garantizando que la información es veraz, completa, exacta, actualizada, comprobable y comprensible. Así entonces, queda expresamente prohibido disponer, usar, difundir y/o transmitir de cualquier modo la información y/o datos sensibles o personales a los que tenga acceso en desarrollo del presente contrato, ya que dicha información debe ser recolectada, conservada y usada única y exclusivamente para el desarrollo de este y bajo la confidencialidad y seguridad antes anotada. Al finalizar la relación acordada EL PSS se obligan a garantizar la confidencialidad de la información y/o datos personales o sensibles que hayan sido conocidos en la ejecución de este contrato, quedando expresamente prohibida la utilización y/o tratamiento de estos con posterioridad a la terminación del acuerdo para ningún fin.</div>

            <div class="minuta_clausula">Cláusula 36. Modificación, adición y cesión:</div>
            <div class="minuta_texto">Las modificaciones y las adiciones del presente contrato podrán elaborarse en hoja anexa al presente documento, como Otro sí, la que hará parte de este y donde deberán consignarse los nombres de las partes, su documento de identidad y fecha en que se efectúe la modificación y su aceptación clara y expresa mediante sus firmas.</div>

            <div class="minuta_paragrafo">Parágrafo 1. Plan de Reorganización Institucional</div>
            <div class="minuta_texto">La ERP ha iniciado los trámites ante la Superintendencia Nacional de Salud de un Plan de Reorganización Institucional, de conformidad con lo establecido en el Artículo 68 de la Ley 1753 de 2015 y la Circular 07 de 2017 emanada de la misma Superintendencia. Una vez aprobado el Plan de Reorganización por parte de la Supersalud, la ERP, cederá el Contrato a la nueva entidad que se genere como consecuencia de dicho Plan en las actuales condiciones pactadas por las partes.</div>

            <div class="minuta_clausula">Cláusula 37. Prohibiciones.</div>
            <div class="minuta_texto">EL PSS no podrá: 1. Realizar prácticas discriminatorias en su atención a los usuarios; 2. Divulgar cualquier información relacionada con los pacientes, salvo la que requiera la ERP para efectos de este contrato o la autoridad competente o que sea solicitada directamente por el afiliado, siendo obligación de EL PSS obtener las autorizaciones del caso por parte de la paciente previa o durante la prestación de los servicios de salud; 3. Ceder el presente contrato en todo o en parte. 4. Subcontratar los servicios objeto del presente contrato.</div>

            <div class="minuta_clausula">Cláusula 38. Inhabilidades e incompatibilidades.</div>
            <div class="minuta_texto">Las partes afirman bajo la gravedad del juramento que se entiende prestando con la firma del presente contrato que no se hallan incursos en ninguna de las causales de inhabilidades e incompatibilidades descritas en el marco legal vigente. La violación a la norma jurídica citada es causal de terminación unilateral del presente contrato por parte de la ERP.</div>

            <div class="minuta_clausula">Cláusula 39. Causales de suspensión:</div>
            <div class="minuta_texto">Además de las causales de terminación previstas por la ley, el presente contrato se suspenderá en todos sus efectos, cuando quiera que ocurra una de las siguientes causas: 1) Cuando se adelante investigación administrativa, disciplinaria, civil o penal o adelantada por un ente de vigilancia y control por irregularidades cometidas por EL PSS y dependencias y dependientes, a discreción de la ERP y en consideración a la gravedad de los hechos motivo de la investigación. 2) Imposibilidad de carácter temporal de cualquiera de las partes para el cumplimiento de sus obligaciones contractuales, siempre que se informe a la otra parte con una antelación no inferior a treinta (30) días. Salvo en el caso del numeral 1 de esta cláusula y solo en lo que legalmente pueda corresponder, la suspensión del contrato no genera indemnización a favor de alguna de las partes.</div>

            <div class="minuta_clausula">Cláusula 40. Liquidación:</div>
            <div class="minuta_texto">Cuando quiera que ocurra la terminación del presente contrato o por cualquiera de las causas previstas en el mismo, se procederá a su liquidación final de todas las cuentas y obligaciones derivadas del contrato dentro de los cuatro (4) meses siguientes a la terminación y en las demás circunstancias que prevé el marco normativo vigente. Posteriormente a su liquidación el PSS o PTS no podrá radicar facturas adicionales ante la ERP por prestaciones de servicios</div>

            <div class="minuta_clausula">Cláusula 41. Origen de los recursos:</div>
            <div class="minuta_texto">Los recursos para la ejecución del presente contrato son provenientes del Sistema General de Seguridad Social en Salud mediante la ADRES y se incorporan al presupuesto de la ERP bajo las reglas establecidas en el marco legal vigente, respetando siempre su destinación.</div>

            <div class="minuta_clausula">Cláusula 42. Domicilio contractual:</div>
            <div class="minuta_texto">Para todos los efectos del presente contrato, se tendrá como domicilio contractual el descrito en la portada del presente contrato.</div>

            <div class="minuta_clausula">Cláusula 43. Responsabilidad profesional.</div>
            <div class="minuta_texto">Salvo la responsabilidad inherente a cada parte con relación a las obligaciones contraídas en el presente contrato. La ERP no asumirá ninguna responsabilidad civil o penal derivada de la deficiencia o inadecuada prestación de los servicios objeto del contrato por parte de EL PSS, o del personal a su cargo. En el evento de que la ERP sea requerida judicial o extrajudicialmente para asumir responsabilidades o indemnizaciones derivadas de tales eventos, llamará en garantía a EL PSS y, si es condenado repetirá contra EL PSS para el reembolso de las sumas que por tal motivo haya tenido que cancelar.</div>

            <div class="minuta_clausula">Cláusula 44. Régimen de transparencia.</div>
            <div class="minuta_texto">Las partes manifiestan bajo la gravedad del juramento que no se encuentra incumpliendo el Régimen de transparencia y no existe conflicto de interés para contratar.</div>

            <div class="minuta_clausula">Cláusula 45. No relación laboral:</div>
            <div class="minuta_texto">Este contrato no constituye vínculo de trabajo entre la ERP y el PSS ni el personal que el contrate para el desarrollo del acuerdo de voluntades. En consecuencia, la ERP sólo responderá por los emolumentos pactados en el mismo. Son de su exclusiva responsabilidad los salarios, prestaciones o cualquier otro pago similar que se cause o deba hacerse a las personas que emplee PSS para el cumplimiento de sus obligaciones.</div>

            <div class="minuta_clausula">Cláusula 46. Perfeccionamiento del contrato</div>
            <div class="minuta_texto">El presente Contrato se perfecciona con la suscripción del mismo por las partes contratantes.</div>
            <!-- <div class="minuta_texto">El presente acuerdo de voluntades se entiende perfeccionado cuando la ERP expida el acta de aprobación de la Garantía Única.</div> -->

            <div class="minuta_clausula display_none">Cláusula 47. Anexos del contrato</div>
            <div class="minuta_texto page_break_after display_none">Son anexos del presente contrato, además de la documentación legal de cada una de las partes, los siguientes:</div>
            <br>
            <table id="table_anexos" class="display_none">
              <thead>
                <tr class="minuta_titulo">
                  <td>ANEXOS</td>
                  <td>DESCRIPCION</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Anexo 1.</td>
                  <td>Marco normativo</td>
                </tr>
                <tr>
                  <td>Anexo 2.</td>
                  <td>Glosario de términos</td>
                </tr>
                <tr>
                  <td>Anexo 3.</td>
                  <td>Modelo de atención de la ERP</td>
                </tr>
                <tr>
                  <td>Anexo 4.</td>
                  <td>Caracterización poblacional </td>
                </tr>
                <tr>
                  <td>Anexo 5.</td>
                  <td>Nota técnica</td>
                </tr>
                <tr>
                  <td>Anexo 6.</td>
                  <td>Modelo de Prestación de Servicios del PSS</td>
                </tr>
                <tr>
                  <td>Anexo 7.</td>
                  <td>Relación de sedes de atención y servicios de salud habilitados en REPS</td>
                </tr>
                <tr>
                  <td>Anexo 8.</td>
                  <td>Capacidad instalada disponible</td>
                </tr>
                <tr>
                  <td>Anexo 9.</td>
                  <td>Indicadores de evaluación de cumplimiento del contrato </td>
                </tr>
                <tr>
                  <td>Anexo 10.</td>
                  <td>Modelo de auditoría del contrato </td>
                </tr>
                <tr>
                  <td>Anexo 11.</td>
                  <td>Identificación de riesgos previsibles y ecuación de equilibrio financiero</td>
                </tr>
                <tr>
                  <td>Anexo 12.</td>
                  <td>Relación de Guías de Práctica Clínica y Protocolos de Atención </td>
                </tr>
                <tr>
                  <td>Anexo 13.</td>
                  <td>Relación de RIAS asociadas al Contrato </td>
                </tr>
                <tr>
                  <td>Anexo 14.</td>
                  <td>Listado de precios de Medicamentos </td>
                </tr>
                <tr>
                  <td>Anexo 15.</td>
                  <td>Listo de precios de suministros, insumos, materiales y otras tecnologías en salud</td>
                </tr>
                <tr>
                  <td>Anexo 16.</td>
                  <td>Red Integral de Prestadores de Servicios de Salud</td>
                </tr>
                <tr>
                  <td>Anexo 17.</td>
                  <td>Canales de contacto</td>
                </tr>
                <tr>
                  <td>Anexo 18.</td>
                  <td>Acuerdo de confidencialidad</td>
                </tr>
                <tr>
                  <td>Anexo 19.</td>
                  <td>Póliza única de garantías</td>
                </tr>

              </tbody>
            </table>

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
          <div class="div_firmas_2" ng-if="mostrar_div_firmas">
            <table class="table_firma" width="100%" style="border: #FFF;">
              <tr class="border_white">
                <td colspan="1" style="width: 25%"></td>
                <td colspan="1" style="width: 25%"></td>
                <td colspan="1" style="width: 25%"></td>
                <td colspan="1" style="width: 25%"></td>
              </tr>

              <tr>
                <td colspan="1" class="text-center">
                  ELABORO: Asistente Nacional de Contratación de Red y/o Auxiliar Nacional de Contratacion de Red.
                </td>
                <td colspan="1" class="text-center">
                  REVISÓ: Subdirección Nacional de redes de PSS.
                </td>
                <td colspan="1" class="text-center">
                  REVISO Y APROBO ASPECTOS JURIDICOS: Coordinación Nacional Jurídica
                </td>
                <td colspan="1" class="text-center">
                  APROBO: Director Nacional de Salud
                </td>
              </tr>
              <tr>

                <td><br><br></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
          <!--  -->
          <div class="div_firmas_2" ng-if="!mostrar_div_firmas">
            <table class="table_firma" width="100%" style="border: #FFF;">
              <tr class="border_white">
                <td colspan="1" style="width: 33%"></td>
                <td colspan="1" style="width: 33%"></td>
                <td colspan="1" style="width: 33%"></td>
                <!-- <td colspan="1" style="width: 25%"></td> -->
              </tr>

              <tr>
                <td colspan="1" class="text-center">
                  ELABORO: Asistente Nacional de Contratación de Red y/o Auxiliar Nacional de Contratacion de Red.
                </td>
                <td colspan="1" class="text-center">
                  REVISÓ: Subgerencia Nacional de Salud.
                </td>
                <td colspan="1" class="text-center">
                  REVISO Y APROBO ASPECTOS JURIDICOS: Jefe de Oficina jurídica Nacional.
                </td>
                <!-- <td colspan="1" class="text-center">
                  APROBO: Director Nacional de Salud
                </td> -->
              </tr>
              <tr>

                <td><br><br></td>
                <td></td>
                <td></td>
                <!-- <td></td> -->
              </tr>
            </table>
          </div>

          <!--  -->
        </td>
      </tr>
    </tbody>
  </table>


  <!-- ANEXOS EPS VIEJA -->
  <table class="report-container" style="page-break-before:always">
    <thead class="report-header">
      <tr>
        <th class="report-header-cell">
          <div class="header-info text-left d-flex">
            <img style="width: 8em;" src="../../../../assets/images/logo_cajacopieps.png" alt="cajacopi">
            <div class="text-bold7">
              CONTRATO {{DATA.DOC_CONTRATO}}-{{DATA.NUMERO_CONTRATO}}-{{DATA.INICIA.split('/')[2]}} DE
              PRESTACION DE SERVICIOS DE SALUD PARA LA RECUPERACIÓN DE LA SALUD MEDIANTE LA {{tipoMinuta}}
              SUSCRITO ENTRE {{DATA.RAZON_SOCIAL}} Y {{DATA.RAZON_SOCIAL_IPS}}</div>
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

              </table>
            </div>
            <!--  -->
            <!--  -->

            <div class="minuta_anexo_subtitulo">CONSIDERACIONES</div>


            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">Primera. </span>
              Que la ley colombiana establece que el tratamiento de los datos personales deberá
              someterse a los principios señalados en ella, entre ellos el de CONFIDENCIALIDAD, en el marco de la
              FINALIDAD para la cual se tratan los datos de conformidad con la ley o con lo autorizado por el titular de
              los datos.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">Segunda. </span>
              Que la ley colombiana establece una prohibición general frente al tratamiento de
              datos personales de menores de edad, así como respecto de la información sensible de las personas;
              entendiendo como sensible según la ley colombiana la información relativa a la salud, creencias
              religiosas, filiación política, orientación sexual, origen étnico, información biométrica, y cualquiera
              otra que pueda generar discriminación, exclusión o peligro. Lo anterior sin perjuicio de las excepciones
              de ley que son de aplicación restrictiva.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">Tercera. </span>
              Que en virtud del contrato de prestación de servicios celebrado entre
              CAJACOPI EPS y {{DATA.RAZON_SOCIAL_IPS}}, esta entidad de prestación de servicios de salud debe
              acceder a los datos
              personales de los afiliados a CAJACOPI EPS, justamente para brindar los servicios de salud contratados
              y cuya prestación está prevista en el régimen de seguridad social vigente en Colombia.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">Cuarta. </span>
              Que, en virtud de las normas sobre prestación de servicios de salud por parte de CAJACOPI EPS, también
              CAJACOPI EPS debe acceder a las historias clínicas de los pacientes que, en condición paralela de
              afiliados, acceden a los servicios que requieren en materia de salud.
            </div>
            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">Quinta. </span>
              Que los datos de salud, en tanto se consideran datos sensibles, deben ser tratados de una manera especial
              y con los mayores niveles de seguridad por las personas naturales o jurídicas que acceden a ellos. En este
              sentido el presente acuerdo constituye una medida de seguridad de carácter
              administrativo que se acuerda por las partes otorgar a los datos de salud de los afiliados y pacientes de
              cada una de ellas.
            </div>
            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">Sexta. </span>
              Que el tratamiento de estos datos tanto por parte de la entidad prestadora de los servicios de salud como
              por parte de CAJACOPI EPS, se realiza en el marco de la ley, y por ende ambas entidades asumen la
              condición de RESPONSABLES frente a los titulares cuyos datos recolectan en el desarrollo de su objeto
              social.
            </div>
            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">Séptima. </span>
              Que de acuerdo a la condición de responsables de tratamiento que asume CAJACOPI EPS frente a sus
              afiliados, y que asume la entidad prestadora del servicio de salud frente a los pacientes que trata por
              cuenta de la EPS, entidades deben cumplir con el principio de confidencialidad y seguridad sobre los datos
              personales a los cuales acceden, confidencialidad que dejan explícitamente regulada a través del presente
              acuerdo que hace parte integral del contrato de prestación de servicios suscrito entre ellas.
            </div>
            <div class="minuta_anexo_parrafo mb">
              <span class="text-bold7">Octava. </span>
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
              CAJACOPI EPS que acceden a sus servicios, en ejecución de las actividades contratadas. En este
              sentido, EL PRESTADOR DE SERVICIOS DE SALUD asume una obligación de reserva, confidencialidad y buen
              manejo de los datos personales a los que accede para la prestación de sus servicios; y a su vez CAJACOPI
              EPS SAS, asume una obligación de reserva, confidencialidad y buen manejo de los datos personales
              consignados en la Historia Clínica o no de los pacientes de EL PRESTADOR DE SERVICIOS DE SALUD.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">Parágrafo. ALCANCE DE LAS OBLIGACIONES ASUMIDAS POR LAS PARTES.</span>
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7"></span>
              Por parte de CAJACOPI EPS, el acceso a la información personal y de salud de los pacientes de EL
              PRESTADOR DE SERVICIOS DE SALUD, se efectuará en el marco de la ley, con la finalidad principal de llevar
              a cabo la auditoría y control sobre la prestación de los servicios, atender las quejas de los pacientes,
              realizar las glosas que correspondan y demás acciones previstas legalmente para las EPS en el marco del
              Decreto 780 de mayo 6 de 2016; Resolución 1995 de 1999; Ley 1122 de 2007; Ley 23 de 1981; Sentencia T 158
              A de 2008 y demás normas concordantes. Por parte de EL PRESTADOR DE SERVICIOS DE SALUD, el acceso a la
              información personal de los afiliados de
              CAJACOPI EPS, se realizará en el marco de la ley y únicamente con la finalidad principal de prestar
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
              <span class="text-bold7">SEGUNDA. OBLIGACIONES ESPECIALES DEL PRESTADOR DE SERVICIOS DE SALUD.</span>
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7"></span>
              De manera especial y como medidas para el adecuado tratamiento de datos personales, EL PRESTADOR DE
              SERVICIOS DE SALUD se obliga a lo siguiente:
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">2.1. </span>
              Instruir a sus colaboradores y demás personas que accedan a los datos personales de los afiliados de
              CAJACOPI EPS sobre su deber de confidencialidad y reserva en relación con cualquier tipo de dato
              personal que deba tratarse para la prestación de los servicios, tales como los datos de identificación,
              ubicación, identidad, gustos o hábitos, patrimoniales, de comportamiento crediticio, entre otros, de
              manera que el espectro de reserva no solo se le otorgue a la historia clínica de los pacientes sino
              también a todo tipo de información personal que se recolecte POR EL PRESTADOR DE SERVICIOS DE SALUD.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">2.2. </span>
              A adoptar las medidas de seguridad de carácter técnico, administrativo e informático, que le permitan
              mantener el carácter de reservada a la información personal a la que se accede, y que impidan cualquier
              tratamiento o uso no autorizado de la información personal, y concretamente frente a la información
              sensible como lo son los datos de salud así como la información especialmente protegida de los menores de
              edad, adoptar estas medidas de seguridad en los niveles más altos que determine la autoridad de control o
              bien las buenas prácticas en materia de seguridad de la información.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">2.3. </span>
              Adoptar los marcos normativos necesarios en materia de seguridad de la información de carácter personal
              qué se exigen por la autoridad de control Superintendencia de Industria y Comercio en el Registro Nacional
              de Bases de datos.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">2.4. </span>
              Como parte del marco normativo de seguridad de la información antes mencionado, EL PRESTADOR DE SERVICIOS
              DE SALUD deberá adoptar un procedimiento para la atención de incidentes de seguridad de la información que
              le permita atender este tipo de incidencias que deben ser resueltas de forma inmediata cuando comprometen
              datos de carácter personal.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">2.5. </span>
              Comunicar a CAJACOPI EPS, en los ocho (8) días calendario siguientes al momento en el que tenga
              conocimiento de manera directa o a través de terceras personas, de cualquier indicio o hecho cierto que
              implique un incidente de seguridad, o una violación a las medidas de seguridad adoptadas para proteger la
              información personal o que impliquen un tratamiento inadecuado de la información personal o un uso no
              autorizado de ella.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">2.6. </span>
              Comunicar a CAJACOPI EPS, una vez le sea notificada, cualquier solicitud de orden de autoridad
              competente que pretenda acceder a los datos personales objeto de este acuerdo.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">2.7. </span>
              Colaborar con CAJACOPI EPS en la gestión de cualquier incidente de seguridad que llegare a comprometer
              los datos personales objeto de este acuerdo; sea que esta la realice directamente CAJACOPI EPS o un
              tercero por ella contratada o una autoridad competente.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">TERCERA. PROHIBICIONES. </span>
              En relación con los datos de los afiliados de CAJACOPI EPS que acceden a los servicios de salud, son
              prohibiciones para EL PRESTADOR DE SERVICIOS DE SALUD las siguientes:
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">3.1. </span>
              Usar los datos personales en provecho propio o de un tercero en forma contraria a lo pactado en este
              acuerdo.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">3.2. </span>
              Permitir el acceso a la información personal a empleados y/o terceros no autorizados, tales como las ligas
              de usuarios, organizaciones no gubernamentales, entidades para la atención de usuarios, entre otros.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">3.4. </span>
              Entregar los datos personales tratados a cualquier autoridad sin haber notificado el requerimiento a
              CAJACOPI EPS, con el fin de que esta pueda analizar de manera previa la competencia de la autoridad
              solicitante y la correlación directa de la orden y el hecho objeto de investigación y/o requerimiento.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">3.5. </span>
              Alterar cualquiera de los atributos de la información personal a la que se accede debido a este contrato,
              como su autenticidad, integridad, confiabilidad y confidencialidad.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">CUARTA. INDEMNIDAD. </span>
              EL PRESTADOR DE SERVICIOS DE SALUD mantendrá indemne a CAJACOPI EPS en caso de que se presente una
              investigación y/o una acción por parte de la autoridad de control en materia de Protección de Datos
              personales, ocasionada en un indebido tratamiento de datos personales por la falta de diligencia, cuidado
              y prudencia por parte de EL PRESTADOR DE SERVICIOS DE SALUD, investigación o acción que pueda generar para
              CAJACOPI EPS cualquier perjuicio en forma directa, o indirecta, como pueden serlo reclamaciones de los
              afiliados al momento de ser atendidos por EL PRESTADOR DE SERVICIOS DE SALUD. Así mismo, será responsable
              de cualquier sanción que pudiera imponerse a CAJACOPI EPS por parte de la Superintendencia de
              Industria y Comercio - SIC, como autoridad en materia de protección de datos personales y que fuera
              imputable a EL PRESTADOR DE SERVICIOS DE SALUD como resultado de la investigación que adelante la
              mencionada autoridad.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">QUINTA. OBLIGACION ESPECIAL DE DEVOLUCIÓN Y/O ELIMINACIÓN DE LOS DATOS E
                INFORMACION PERSONAL. </span>
              De manera especial EL PRESTADOR DE SERVICIOS DE SALUD se obliga, en el momento de la finalización de su
              contrato con CAJACOPI EPS a lo siguiente:
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">5.1. </span>
              A destruir, eliminar y/o devolver los datos e información personales a la cual accedió o trató durante el
              término de la relación contractual vigente entre las partes involucradas, exceptuando aquella que deba
              conservar por su propia obligación como prestador de servicios de salud, a saber, la Historia Clínica de
              los afiliados que se convierten en sus pacientes.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">5.2. </span>
              A remitir en forma segura la información de los pacientes que deben pasar a otra entidad prestadora de
              servicios de salud por indicación de CAJACOPI EPS, una vez culmina el contrato suscrito entre las
              partes.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">5.3. </span>
              En relación con la información que deba eliminar o restituir, se obliga a garantizar que tampoco ha dejado
              copia de ésta de ninguna manera ni bajo ningún tipo de tecnología.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7">5.4. </span>
              A mantener la confidencialidad y reserva de la información personal a la cual accedió durante la vigencia
              del contrato de prestación de servicios suscrito entre las partes, posteriormente a la terminación de este
              y por término indefinido, atendiendo a que de conformidad con la Ley 1581 de 2012 los datos personales,
              por principio, son confidenciales y reservados.
            </div>

            <div class="minuta_anexo_parrafo">
              <span class="text-bold7"></span>
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
              <span class="text-bold7"></span>
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
                      CAJA DE COMPENSACIÓN FAMILIAR CAJACOPI ATLÁNTICO
                    </div>
                    <br><br><br><br>

                    <div class="ml_1">{{DATA.REPRESENTANTE}}</div>
                    <div class="ml_1">CC N°: {{DATA.DOCUMENTO_REPRESENTANTE}} DE BARRANQUILLA</div>

                  </td>
                  <td colspan="1">
                    <div class="text-bold7 ml_1">
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
  <!-- ANEXOS EPS VIEJA -->

  <!--  -->
  <!-- ANEXOS EPS NUEVA -->
  <table class="report-container" style="page-break-before:always" ng-if="!mostrar_div_firmas">
    <thead class="report-header">
      <tr>
        <th class="report-header-cell">
          <div class="header-info text-left d-flex">
            <img style="width: 8em;" src="../../../../assets/images/logo_cajacopieps.png" alt="cajacopi">
            <div class="text-bold7">
              ANEXO N° 18 CONTRATO {{DATA.DOC_CONTRATO}}-{{DATA.NUMERO_CONTRATO}}-{{DATA.INICIA.split('/')[2]}} DE PRESTACION DE SERVICIOS DE SALUD MEDIANTE LA {{tipoMinuta}}
              SUSCRITO ENTRE {{DATA.RAZON_SOCIAL}} Y {{DATA.RAZON_SOCIAL_IPS}}</div>
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

            <div class="minuta_anexo_subtitulo">CONSIDERACIONES</div>


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
