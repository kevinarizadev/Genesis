<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Formato de Anexo 3</title>
  <!-- <link rel="icon" href="../../../../assets/images/icon.ico" /> -->
  <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
  <style type="text/css">
    @page {
      size: auto;
      margin: 1em 2em 2em 2em;
      /* margin-left: 0.5em; */
    }

    @media print {
      #btnprint {
        display: none !important;
      }
    }

    * {
      font-family: 'Open Sans', sans-serif;
      /* font-size: px; */
      /* border: 0.5px solid black; */
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      text-align: justify;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .bold {
      font-weight: 600;
    }

    .text7 {
      text-align: justify;
      font-size: 14px;
    }

    table {
      width: 100%;
    }

    #table1,
    #table1 tr th,
    #table1 tr td {
      border: .5px solid #111;
      /* border-collapse: collapse; */
      font-size: 13px;
      /* border-spacing: 0 0 !important; */
    }

    #table2,
    #table2 tr th,
    #table2 tr td {
      border: .5px solid #111;
      border-collapse: collapse;
      font-size: 11px;
      border-spacing: 0 0 !important;
    }
  </style>

  <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <script src="../../../bower_components/angular/angular.js"></script>
  <script src="../../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../../scripts/controllers/contratacion/formatos/anexo3.js"></script>

</head>

<body ng-controller="anexo3Controller">
  <table id="table1" style="border: #fff;">


  </table>
  <br />
  <br />
  <table id="table2">
    <thead>
      <tr style="font-weight:600;">
        <td rowspan="3" style="text-align: center;width:10%;">
          <img src="../../../assets/images/logo_cajacopieps.png" width=100px; height="50px">
        </td>
        <td colspan="4" style="text-align: center;font-weight:600;padding:0.1% 0%;">
          CONTRATO DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE {{impresion.nombre_asunto.substring(4,200)}}
        </td>
      </tr>
      <tr>
        <td style="text-align: center;font-weight:600;padding:0.1% 0%;" colspan="4">
          <span> ANEXO TECNICO N°3. TECNOLOGÍAS, TARIFAS Y PRECIOS</span>
        </td>
      </tr>
      <tr>
        <td style="text-align: center;font-weight:600;padding:0.1% 0%;" colspan="4">
          <span>CONTRATO Nº {{impresion.documento=='KS'?'RS':'RC'}}-{{impresion.numero}}-{{impresion.fecha.substr(-4)}}</span>
        </td>
      </tr>
      <tr>
        <th style=" width: 10%;">
          PRODUCTOS
        </th>
        <th>
          SUBCATEGORIA
        </th>
        <th>
          DESCRIPCION
        </th>

        <th>
          VALOR
        </th>
      </tr>
    </thead>
    <tbody>
      <tr ng-repeat="x in productos">
        <td>
          {{x.codigo_producto}}
        </td>
        <td>
          {{x.cod_subcategoria}}
        </td>
        <td>
          {{x.cod_subcategoria==""?x.nombre_producto:x.nombre_subcategoria}}
        </td>

        <td style="text-align: right;">
          {{x.valor}}
        </td>
      </tr>
    </tbody>
  </table>

  <div style="text-align: center;" id="btnprint">
    <button onclick="window.print();">Imprimir</button>
  </div>

</body>


</html>
