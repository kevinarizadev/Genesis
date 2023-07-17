<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Certificado de Retención</title>
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
    }

    #table1,
    #table1 th,
    #table1 td {
      border: 0px solid black;

      border-collapse: separate;
      /* font-size: 11px; */
      border-spacing: 0 0 !important;
    }

    /* ///////////////////// */
    #table2,
    #table2 th,
    #table2 td {
      border: 0px solid black;
      border-collapse: collapse;
      font-size: 11px;
    }

    #table3,
    #table3 th,
    #table3 td {
      border: 0px solid black;
      border-collapse: collapse;
      font-size: 11px;
      text-align: center;
      padding: 5px
    }


    .fw600 {
      font-weight: 600;
    }

    .fw700 {
      font-weight: 700;
    }

    .fs15 {
      font-size: 15px;
    }

    .fs11 {
      font-size: 11px;
    }

    .fs17 {
      font-size: 17px;
    }

    .fs20 {
      font-size: 20px;
    }

    .ta-r {
      text-align: right !important;
    }

    .ta-l {
      text-align: left !important;
    }

    .ta-c {
      text-align: center !important;
    }
  </style>
  <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <script src="../../../bower_components/angular/angular.js"></script>
  <script src="../../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../../scripts/controllers/financiera/formatos/formato_certificado_retencionController.js"></script>
</head>

<body ng-controller="formato_certificado_retencionController">
  <table id="table1" width="90%" style="margin: 0 5%">
    <tr>
      <th style="width: 10%;" rowspan="5" ng-if="empresa == '890102044'"><img src="https://genesis.cajacopieps.com/assets/images/cajacopi.png" style="width:100px;height:40px"></th>
      <th style="width: 10%;" rowspan="5" ng-if="empresa == '901543211'"><img src="https://genesis.cajacopieps.com/assets/images/logo_cajacopieps.png" style="width:100px;height:40px"></th>
      <td style="width: 40%;" class="fs11 ta-l">CAJACOPI EPS-S
      </td>
      <td style="width: 50%;" class="fs20 fw600 ta-c" rowspan="3">
        <span style="border:2px solid black;border-radius:5px;padding-left:5px;padding-right:25px;">Certificado de Retención</span>
      </td>
    </tr>
    <tr>
      <td class="fs11 ta-l" ng-if="empresa == '890102044'">NIT 890.102.044-1</td>
      <td class="fs11 ta-l" ng-if="empresa == '901543211'">NIT 901.543.211-6</td>
    </tr>
    <tr>
      <td class="fs11 ta-l">Dirección CALLE 44 N 46 - 32</td>

    </tr>
    <tr>
      <td class="fs11">Teléfono 3185930 - 018000111446 - fax 3850032</td>
      <td class="fs17 fw600 ta-c">Año Gravable: {{anno}}</td>
    </tr>
  </table>


  <div>
    <hr style="border:0.7px solid black;width: 90%;">
  </div>

  <div style="margin-bottom:10px" class="ta-c">
    <span class="fs15 fw600">Certificamos que durante el periodo gravable se efectuaron las siguientes retenciones a:</span>
  </div>

  <table id="table2" width="100%">
    <tr>
      <td style="width:10%">Cedula o NIT</td>
      <td style="width:20%">{{proveedor}}</td>
      <td style="width:10%">Nombre:</td>
      <td style="width:60%">{{proveedorNombre}}</td>
    </tr>
    <tr>
      <td>Dirección</td>
      <td>{{proveedorDireccion}}</td>
      <td>Teléfono</td>
      <td>{{proveedorTelefono}}</td>
    </tr>
  </table>



  <table id="table3" width="100%" style="margin-top:15px">
    <thead>
      <tr style="border-top:2px solid black;border-bottom:2px solid black;">
        <td style="width:40%;">Concepto</td>
        <td style="width:10%;">%</td>
        <td style="width:20%;">Base</td>
        <td style="width:20%;">Retención</td>
      </tr>
    </thead>
    <tbody>
      <!--  -->
      <!--  -->
      <tr>
        <td class="fw600 ta-l">RETENCION DE ICA</td>
      </tr>
      <tr ng-if="!list_RetICA.length">
        <td>I C A BARRANQUILLA</td>
        <td>0,00</td>
        <td>0,00</td>
        <td>0,00</td>
      </tr>
      <tr ng-repeat="x in list_RetICA">
        <td>{{x.CUEC_NOMBRE}}</td>
        <td>{{formatPeso2(x.CUEP_RETENCION)}}</td>
        <td>{{formatPeso2(x.SALDO_BASE)}}</td>
        <td>{{formatPeso2(x.SALDO)}}</td>
      </tr>
      <tr class="fw600">
        <td>TOTAL RETENCION DE ICA</td>
        <td></td>
        <td>{{formatPeso2(total_BaseICA)}}</td>
        <td>{{formatPeso2(total_RetICA)}}</td>
      </tr>
      <!--  -->
      <!--  -->
      <tr>
        <td class="fw600 ta-l">RETENCION DE IVA</td>
      </tr>
      <tr ng-if="!list_RetIVA.length">
        <td>A RESPONSABLES DEL REGIMEN COMUN</td>
        <td>15,00</td>
        <td>0,00</td>
        <td>0,00</td>
      </tr>
      <tr ng-repeat="x in list_RetIVA">
        <td>{{x.CUEC_NOMBRE}}</td>
        <td>{{formatPeso2(x.CUEP_RETENCION)}}</td>
        <td>{{formatPeso2(x.SALDO_BASE)}}</td>
        <td>{{formatPeso2(x.SALDO)}}</td>
      </tr>
      <tr class="fw600">
        <td>TOTAL RETENCION DE IVA</td>
        <td></td>
        <td>{{formatPeso2(total_BaseIVA)}}</td>
        <td>{{formatPeso2(total_RetIVA)}}</td>
      </tr>
      <!--  -->
      <!--  -->
      <tr>
        <td class="fw600 ta-l">RETENCION DE RENTA</td>
      </tr>
      <tr ng-repeat="x in list_RetRenta">
        <td>{{x.CUEC_NOMBRE}}</td>
        <td>{{formatPeso2(x.CUEP_RETENCION)}}</td>
        <td>{{formatPeso2(x.SALDO_BASE)}}</td>
        <td>{{formatPeso2(x.SALDO)}}</td>
      </tr>
      <tr class="fw600">
        <td>TOTAL RETENCION DE RENTA</td>
        <td></td>
        <td>{{formatPeso2(total_BaseRenta)}}</td>
        <td>{{formatPeso2(total_RetRenta)}}</td>
      </tr>
    </tbody>
    <tfoot style="font-size: 10px;" class="ta-l">
      <tr style="border-top:2px solid black;">
        <td class="ta-l">Retención consignada en: {{retUbicacion}}</td>
        <td class="ta-l"></td>
        <td class="fw600">Total Retención:</td>
        <td class="fw600" style="border-bottom:2px solid black;">{{formatPeso2(retConsignada)}}</td>
      </tr>
      <tr>
        <td class="ta-l">Fecha de Expedicion: {{FechayHora}}</td>
        <td class="ta-l"></td>
      </tr>
    </tfoot>
  </table>
  <!-- <span style="padding-right: 15px; font-size:11px;">
        Fecha y Hora de Impresión: {{FechayHora}} Impreso por: <b>{{Cedula}} </b> Estado: <b> {{Oord_Estado}}</b></span> -->
</body>

</html>
