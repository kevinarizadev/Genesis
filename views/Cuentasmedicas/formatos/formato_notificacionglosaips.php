<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>NOTIFICACION DE GLOSA</title>
  <link rel="icon" href="../../../assets/images/icon.ico" />
  <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
  <style type="text/css">
    @page {
      size: auto;
      margin: 1em 2em 2em 2em;
    }

    @media print {
      @page {
        size: landscape;
      }

      #btn_imprimir {
        display: none;
      }

      body {
        margin-bottom: 5em;
        height: 107mm;
      }
    }

    #table1,
    #table1 th,
    #table1 td {
      border: 0px solid black;
      border-collapse: separate;
      font-size: 11px;
      border-spacing: 0 0 !important;
    }

    /* ///////////////////// */
    #table2,
    #table2 th,
    #table2 td {
      border: 0px solid black;
      border-collapse: collapse;
      font-size: 12px;
    }

    /* ///////////////////// */
    #table4,
    #table4 th,
    #table4 td {
      border-collapse: collapse;
      font-size: 12px;
      border-top: 2px solid black;
    }

    /* ///////////////////// */
    #table5,
    #table5 th,
    #table5 td {
      margin-top: 2em;
      border-collapse: collapse;
      font-size: 11px;
      border-bottom: 1px solid #ddd;
    }

    #table5 tbody {
      border-bottom: 20px solid white;
    }

    table.report-container {
      page-break-after: always;
    }

    thead.report-header {
      display: table-header-group;
    }

    tfoot.report-footer {
      display: table-footer-group;
    }
  </style>
  <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <script src="../../../bower_components/angular/angular.js"></script>
  <script src="../../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../../scripts/controllers/cuentasmedicas/formatos/formato_notificacionglosaipsController.js"></script>
</head>

<body ng-controller="formato_notificacionglosaipsController">
  <table class="report-container">
    <thead class="report-header">
      <tr>
        <th class="report-header-cell">
          <div class="header-info">

          </div>
        </th>
      </tr>
    </thead>
    <tfoot class="report-footer">
      <tr>
        <td class="report-footer-cell">
          <div class="footer-info">
            <table width="100%" style="border-collapse: collapse;">
              <tr>
                <td style="font-family: 'Open Sans', sans-serif;text-align:right;font-size: 11px;text-align: left;">Consecutivo: {{documentoNG +'-'+numero +'-'+ ubicacion}}</td>
                <td style="font-family: 'Open Sans', sans-serif;text-align:right;font-size: 11px;text-align: center;">Fecha Impresión: {{FechayHora}}</td>
                <td style="font-family: 'Open Sans', sans-serif;text-align:right;font-size: 11px;text-align: center;">Funcionario Imprime: {{Nombre}}</td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
    </tfoot>
    <tbody class="report-content">
      <tr>
        <td class="report-content-cell">

          <table id="table1" width="100%">
            <tr>
              <th colspan="4" style="width: 10%"><img src="../../../assets/images/logo_cajacopieps.png" width=120px; height="50px"></th>
              <td style="text-align: left;font-family: 'Open Sans', sans-serif;font-size: 11px;">Nit 901.543.211 - 6
                <div style="font-family: 'Open Sans', sans-serif;font-weight: 500;">Calle 44 # 46 - 32 Piso 3</div>
                <div style="font-family: 'Open Sans', sans-serif;font-weight: 500;">Teléfonos 3185930 - 3860032</div>
                <div style="font-family: 'Open Sans', sans-serif;font-weight: 500;">Barranquilla</div>
              </td>
              <th colspan="4" style="font-family: 'Open Sans', sans-serif;padding-top:10px;font-size: 19px;font-weight: 700;">NOTIFICACION DE GLOSA</th>
              <th colspan="4" style="font-family: 'Open Sans', sans-serif;padding-top:10px;font-size: 19px;text-decoration: underline;    font-weight: 800;"> {{documentoNG +'-'+ numero +'-'+ ubicacion}}</th>
            </tr>
          </table>

          <table id="table2" width="100%">
            <div style="font-family: 'Open Sans', sans-serif;font-weight: 600;font-size: 12px;">Señores:</div>
            <tr>
              <th style="font-family: 'Open Sans', sans-serif;padding-top:10px;font-size: 12px;text-transform: uppercase;font-weight: 600;">{{datos[0].NIT}}</th>
              <th style="font-family: 'Open Sans', sans-serif;padding-top:10px;font-size: 12px;text-transform: uppercase;font-weight: 600;">{{datos[0].RAZON_SOCIAL}}</th>
              <th style="font-family: 'Open Sans', sans-serif;padding-top:10px;font-size: 12px;text-transform: uppercase;font-weight: 600;">{{direccion}}</th>
            </tr>
            <tr>
              <td colspan="3" style="font-family: 'Open Sans', sans-serif;font-size: 12px;">
                Mediante la presente informamos a ustedes, las glosas encontradas en facturación radicada por ustedes, de acuerdo al siguiente listado:
              </td>
            </tr>
          </table>
          <table id="table5" width="100%" style="font-family: 'Open Sans', sans-serif;margin-bottom:2em">
            <tbody ng-repeat="x in datos">
              <tr style="border-top: 2px solid black;border-bottom: 2px solid black;font-weight:600;">
                <td>Recibo</td>
                <td>No Factura</td>
                <td>V/r Factura</td>
                <td>V/r Glosado</td>
                <td>Código Producto</td>
                <td>Producto</td>
                <td>Código Glosa</td>
                <td>Tipo Glosa</td>
                <td>Valor Glosa</td>
              </tr>
              <tr>
                <td>{{x.RECIBO}}</td>
                <td>{{x.NUM_FACTURA}}</td>
                <td>${{formatPeso2(x.VALOR_FACTURA.toString().replace(',', '.'))}}</td>
                <td>${{formatPeso2(x.VALOR_GLOSADO.toString().replace(',', '.'))}}</td>
                <td>{{x.CODIGO_PRODUCTO}}</td>
                <td>{{x.NOMBRE_PRODUCTO}}</td>
                <td>{{x.CODIGO_GLOSA}}</td>
                <td>{{x.TIPO_GLOSA}}</td>
                <td>${{formatPeso2(x.VALOR_GLOSA.toString().replace(',', '.'))}}</td>
              </tr>
              <tr>
                <td colspan="9" style="font-weight:600;padding-top:3px;">Observaciones</td>
              </tr>
              <tr>
                <td colspan="9" style="text-align: justify;text-transform:uppercase;border-bottom: 2px solid black;">{{x.OBSERVACION}}
                </td>
              </tr>
            </tbody>
          </table>

          <table id="table4" width="100%">
            <tr>
              <th style="font-family: 'Open Sans', sans-serif;padding-top:10px;font-size: 12px;
            font-weight: 600;">Número Facturas >> <span style="font-weight: 500;"></span>{{datos2.CANTIDAD_FACTURAS}} </th>
              <th style="font-family: 'Open Sans', sans-serif;padding-top:10px;font-size: 12px;
            font-weight: 600;">Valor Facturas >> <span style="font-weight: 500;"></span>${{formatPeso2(datos2.VALOR_FACTURAS.toString().replace(',', '.'))}}</th>
              <th style="font-family: 'Open Sans', sans-serif;padding-top:10px;font-size: 12px;
            font-weight: 600;">Valor Glosado >> <span style="font-weight: 500;"></span>${{formatPeso2(datos2.VALOR_GLOSAS.toString().replace(',', '.'))}}</th>
            </tr>
            <tr>
              <td colspan="3" style="font-family: 'Open Sans', sans-serif;padding-top:10px;font-size: 12px;">
                DE ACUERDO LA "ARTÍCULO 57. TRÁMITE DE GLOSAS DE LA LEY 1438 DE 2011", EL PRESTADOR DE SERVICIOS DE SALUD DEBERÁ DAR RESPUESTA A LAS GLOSAS PRESENTADAS POR LAS ENTIDADES RESPONSABLES DEL PAGO DE SERVICIOS DE SALUD, DENTRO DE LOS QUINCE (15) DÍAS HÁBILES SIGUIENTES A SU RECEPCÍON.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>

<div style="width: 100%; text-align:center;margin-top:1em;">
  <input id="btn_imprimir" style="margin: 0 auto;padding:1em;background:#1a2e63;color:white;margin:auto;border-radius: 20px;cursor: pointer;    border: none;" type="button" name="imprimir" value="Imprimir" onclick="window.print();">
</div>


</html>
