<!doctype html>
<html ng-app="GenesisApp" lang="es">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Acta</title>


	<link rel="stylesheet" href="../../../styles/mara.min.css"/>
	<script src="../../../bower_components/materialize/bin/materialize.css"></script>
	<style src="../../../style/genesis-style/genesis-style.css"></style>
	<style type="text/css" href="../../../style/cuentasmedicas/acta.css"></style>
	<script src="../../../bower_components/jquery/dist/jquery.js"></script>
	<script src="../../../bower_components/angular/angular.js"></script>
	<script src="../../../scripts/controllers/cuentasmedicas/formatos/facturas_sin_radicarController.js"></script>
	<style>
      table,
      tr,
      th,
      td {
        border: 1px solid black !important;
        border-radius: 0 !important;
        font-size: 12px;
      }

      table * {
        font-size: 10px!important;
      }

      #contenido-factura tr,
      #contenido-factura th {
        padding: 0 10px
      }
      #contenido-factura {
        width: calc(100% + 1px);
      }

      @media print {

        @page {
          size: auto;
          margin-top: 1em;
          margin-right: 1.3em;
          margin-left: 0.8em;
          margin-bottom: 13%;
        }

        body {
          background-color: white;
          -webkit-print-color-adjust: exact;
        }
        #btn_imprimir {
          display: none;
        }
      }
    </style>
</head>

<body class="white position-relative"  ng-controller="facturas_sin_radicarController">
    <div class="row">
      <div class="col s12">
        <div class="row">
          <table class="table-bordered white w-100 border-none">
            <thead>
              <tr>
                <th rowspan="3" class="center-align" style="width: 110px;">
                  <img src="../../../assets/images/logo_cajacopieps.png" alt="cajacopi">
                </th>
                <th colspan="4" class="center-align">FORMATO DE DEVOLUCION DE FACTURAS SIN RADICAR</th>
                <th>CODIGO: GAC-FR-03</th>
              </tr>
              <tr>
                <th colspan="4" rowspan="2" class="center-align">PROCEDIMIENTO RECEPCIÓN Y RADICACIÓN DE
                  CUENTAS
                  MÉDICAS</th>
                <th style="padding: 0 10px;">Versión: 02</th>
              </tr>
              <tr>
                <th style="padding: 0 10px;">Fecha: mayo 2019</th>
              </tr>
              <tr>
                <th>
                  CONSECUTIVO:
                </th>
                <th colspan="5" class="no-padding">
                  <table class="border-none">
                    <thead>
                      <tr class="border-none">
                        <th class="border-none">{{consecutivo}}</th>
                        <th class="border-none" style="border-left: 1px solid black!important;">FECHA: {{fecha}}
                        </th>
                      </tr>
                    </thead>
                  </table>
                </th>
              </tr>
              <tr>
                <th colspan="6" style="font-weight: 700;font-size: 10px;">
                  <b>CAJACOPI EPS SAS</b> informa la devolución de facturas no radicadas fundamentado en la
                  Resolución 3047 de 2008: "Devolución es una no conformidad que afecta en forma total
                  por
                  prestación de servicios de salud encontrada por la entidad responsable de pago durante la
                  revisión preliminar que impíde dar por presentada la factura".
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-none">
                <td colspan="6" class="border-none no-padding">
                  <table id="contenido-factura" class="table-bordered white w-100">
                    <thead class="default-background white-text">
                      <tr>
                        <th rowspan="2" class="center-align">No.</th>
                        <th rowspan="2" class="center-align">Seccional</th>
                        <th rowspan="2" class="center-align">Prestador</th>
                        <th rowspan="2" class="center-align">NIT</th>
                        <th colspan="2" class="center-align" style="width: 63px;">Tipo de Factura</th>
                        <th rowspan="2" class="center-align">N°. Factura</th>
                        <th rowspan="2" class="center-align">Valor Factura</th>
                        <th colspan="2" class="center-align">Motivo de Devolución</th>
                      </tr>
                      <tr>
                        <th class="center-align">C</th>
                        <th class="center-align">E</th>
                        <th class="center-align">Código</th>
                        <th class="center-align">Descripción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr ng-repeat="dato in datos track by $index">
                        <th>{{($index+1)}}</th>
                        <td>{{dato.seccional}}</td>
                        <td>{{dato.prestador}}</td>
                        <td>{{dato.nit}}</td>
                        <td>{{(dato.tipofact!="EV")?'X':''}}</td>
                        <td>{{(dato.tipofact=="EV")?'X':''}}</td>
                        <td>{{dato.nfact}}</td>
                        <td>{{"$"+formatPeso2(dato.valor_fact.toString().trim())}}</td>
                        <td>{{dato.cod_rechazo}}</td>
                        <td>{{dato.motivo_rechazo}}</td>
                      </tr>
                      <tr>
                        <td colspan="5" class="default-background white-text center-align" style="padding: 0 10px;">
                          TOTAL</td>
                        <td colspan="5" class="center-align" style="padding: 0 10px;">{{"$"+formatPeso2(total.toString().trim())}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col s12">
        <div class="row">
          <p style="font-weight: 700;font-size: 10px;">Una vez resuelta la causal de devolución las facturas deben ser presentadas
            nuevamente en CAJACOPI EPS SAS
            oficina Seccional que corresponda, para ser radicadas en los primeros 20 dias calendario de cada
            mes y poder continuar con el procedimiento de radicaión de cuentas.</p>
          <br>
          <br>
          <br>
          <div class="col s6 no-padding">
            <hr class="border-none" style="max-width: 90%;margin-left: 0;border-top: 1px solid!important;">
            <b style="font-size: 12px;">Auxiliar Nacional de Cuentas Médicas</b>
          </div>
          <div class="col s6 no-padding">
          <hr class="border-none" style="max-width: 90%;margin-left: 0;border-top: 1px solid!important;">
            <b style="font-size: 12px;">Representante de la EPS</b>
          </div>
        </div>
      </div>
  </div>
  <input id="btn_imprimir" class="btn" style="margin: 0 auto;" type="button" name="imprimir" value="Imprimir" onclick="window.print();">
</body>

</html>