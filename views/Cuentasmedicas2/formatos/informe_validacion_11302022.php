<!doctype html>
<html ng-app="GenesisApp" lang="es">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Informe</title>


  <link rel="stylesheet" href="../../../styles/mara.min.css" />
  <script src="../../../bower_components/materialize/bin/materialize.css"></script>
  <style src="../../../style/genesis-style/genesis-style.css"></style>
  <style type="text/css" href="../../../style/cuentasmedicas/acta.css"></style>
  <script src="../../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../../bower_components/angular/angular.js"></script>
  <script src="../../../scripts/controllers/cuentasmedicas/formatos/informe_validacion_capitaController.js"></script>
  <style>
    table,
    tr,
    th,
    td {
      border: 1px solid black !important;
      border-radius: 0 !important;
      font-size: 15px;
    }

    table * {
      font-size: 10px !important;
    }

    #contenido-factura tr,
    #contenido-factura th,
    #contenido-factura td {
      padding: 5px 10px
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

<body class="white position-relative" ng-controller="informe_validacion_capitaController">
  <div class="row">
    <div class="col s12">
      <div class="row">
        <table class="table-bordered white w-100 border-none">
          <thead>
            <tr>
              <th rowspan="3" class="center-align" style="width: 110px;">
                <img src="../../../assets/images/cajacopi.png" alt="cajacopi">
              </th>
              <th colspan="4" class="center-align">INFORME TECNICO DE VALIDACIÓN DE RIPS</th>
              <th>Código: {{detalle.Codigo}}</th>
            </tr>
            <tr>
              <th colspan="4" rowspan="2" class="center-align">IPS: {{detalle.Nombre}}</th>
              <th style="padding: 0 10px;">Recibo: {{detalle.Recibo}}</th>
            </tr>
            <tr>
              <th style="padding: 0 10px;">Fecha: {{detalle.Fecha}}</th>
            </tr>
            <!-- <tr>
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
              </tr> -->
            <tr>
              <th colspan="6" style="font-weight: 700;font-size: 10px;">
                <b>CAJACOPI EPS</b> por medio de la presente se permite entregar informe técnico con respecto a la validacion del rips de tipo [capita] {{detalle.Tipo_contrato}} de regimen {{detalle.Regimen}} con codigo de proceso {{detalle.Codigo}} y numero de recibo {{detalle.Recibo}} {{detalle.Estado}} El dia {{detalle.Fecha}} para el periodo {{detalle.Periodo}}
                con un valor total de ${{formatPeso2(detalle.Total.toString().replace(',', '.'))}}, indicando que la calidad de dato del rips es de {{detalle.Calidad}}% con un total de registros de {{detalle.Registros}} y un total de errores de {{detalle.Errores}} los cual se detallan a continuación:
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-none">
              <td colspan="6" class="border-none no-padding">
                <table id="contenido-factura" class="table-bordered white w-100">
                  <thead class="default-background white-text">
                    <tr>
                      <th class="center-align">No.</th>
                      <th class="center-align">Archivo</th>
                      <th class="center-align">Registros</th>
                      <th class="center-align">Filas con Error</th>
                      <th class="center-align">Porcentaje Error</th>
                      <th class="center-align">Calidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr ng-repeat="dato in datos track by $index">
                      <th class="center-align">{{($index+1)}}</th>
                      <td class="center-align">{{dato.Archivo}}</td>
                      <td class="center-align">{{dato.Registros}}</td>
                      <td class="center-align">{{dato.Filas_Error}}</td>
                      <td class="center-align">{{dato.Porcentaje}}%</td>
                      <td class="center-align">{{dato.Calidad}}%</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <div class="col s12">
      <div class="row">
        <p style="font-weight: 700;font-size: 10px;">Una vez resuelta la causal de devolución las facturas deben ser presentadas
          nuevamente en Cajacopi
          EPS oficina Seccional que corresponda, para ser radicadas en los primeros 20 dias calendario de cada
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
    </div> -->
  </div>
  <input id="btn_imprimir" class="btn" style="margin: 0 auto;" type="button" name="imprimir" value="Imprimir" onclick="window.print();">
</body>

</html>