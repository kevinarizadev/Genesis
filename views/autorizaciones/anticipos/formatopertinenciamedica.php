<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Formato de Pertinencia Médica</title>
    <link rel="icon" href="../../../../assets/images/icon.ico" />
    <link rel="stylesheet" type="text/css" href="../../../../bower_components/sweetalert/css/sweetalert2.css">
    <style type="text/css">
        @page {
            size: auto;
            margin: 3em;
            /* margin-left: 0.5em; */
        }

        * {
            font-family: 'Open Sans', sans-serif;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        table,
        table tr th,
        table tr td {
            border: .5px solid black;
            font-size: 12px;
        }

        .paddingleft td {
            font-size: 13px !important;
            padding-left: 3em;
            padding-top: 1em;
            border-style: none !important;
        }


        .axe {
            padding-right: 4em;
        }

        .axe:after {
            content: "";
            display: block;
            border-bottom: 1px solid black;
        }

        .Firma {
            background-size: cover;
            width: 200px;
            height: 85px;
            /* margin: auto; */
            background-position-y: 0;
            filter: grayscale(100%);
        }

        .fs_12 {
          font-size: 12px !important;
        }
        .fondoAzul {
          background-color: #1a2e63;
          color: white !important;
        }
        #table4,
        #table4 tr th,
        #table4 tr td {
          border: .5px solid black;
          font-size: 12px;
          border-spacing: 0 0 !important;
        }

    </style>
    <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
    <script src="../../../bower_components/angular/angular.js"></script>
    <script src="../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../scripts/controllers/autorizaciones/anticipos/formatoanticipoController.js"></script>
</head>

<body ng-controller="ControladorIMP" ng-init="Hoja='PER'">
    <table id="table1" width="100%" style="border: #FFF;">

        <tr style="font-weight:600;">
            <td colspan="1" rowspan="3" style="text-align: center;width:20%">
                <!-- <img src="https://genesis.cajacopieps.com//assets/images/cajacopi.png" width=100px; height="40px"></td> -->
                <!-- <img src="../../../assets/images/cajacopi.png" width=100px; height="40px"></td> -->
                <img style="width: 8em;" src="../../../assets/images/logo_cajacopieps.png">

            <td colspan="1" rowspan="2" style="width: 55%;text-align: center;font-weight:600;padding:0.1% 0%;">FORMATO DE PERTINENCIA MÉDICA PARA ANTICIPOS</td>
            <td colspan="1">
                Código: RP-FR-12
            </td>
        </tr>
        <tr style="font-weight:600;">
            <td colspan="1">Versión: 02</td>
        </tr>
        <tr style="font-weight:600;">
            <td colspan="1" style="text-align: center;padding:1% 0%;">
                PROCEDIMIENTO DE ANTICIPOS PARA PRESTACION DE SERVICIOS DE SALUD</td>
            <td colspan="1">Fecha: Enero 2024</td>
        </tr>

        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6" class="axe">
                NOMBRE DEL USUARIO: {{Pert_USUARIO}}
                <br>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                PROCEDIMIENTO Y/O MEDICAMENTO NO INCLUIDO EN EL PBS SI__{{(Pert_PBS=='S')?'X':''}}__ NO__{{(Pert_PBS=='N')?'X':''}}__</td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                FORMATO DE SOLICITUD NO POS/PRESCRIPCIÓN MIPRES SI __{{(Pert_MIPRES=='S')?'X':''}}__ NO__{{(Pert_MIPRES=='N')?'X':''}}__ NO APLICA__{{(Pert_MIPRES=='NA')?'X':''}}__</td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                COMITÉ TÉCNICO CIENTÍFICO SI __{{(Pert_COMITE=='S')?'X':''}}__ NO__{{(Pert_COMITE=='N')?'X':''}}_  NO APLICA__{{(Pert_COMITE=='NA')?'X':''}}__</td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                TUTELA__{{(Pert_CUMPLIMIENTO=='TUT')?'X':''}}__ QUEJA__{{(Pert_CUMPLIMIENTO=='QUE')?'X':''}}__ DERECHO DE PETICIÓN__{{(Pert_CUMPLIMIENTO=='DER')?'X':''}}__</td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                INCIDENTE__{{(Pert_CUMPLIMIENTO=='INC')?'X':''}}__ DESACATO_____ MEDIDA PROVISIONAL__{{(Pert_CUMPLIMIENTO=='MED')?'X':''}}__</td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                FECHA ORDEN MÉDICA: {{Pert_FECHAORDEN}}</td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                FECHA DE RECIBIDO: {{Pert_FECHARECIBIDO}}</td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                FECHA DE ENVÍO A LA NACIONAL: {{Pert_FECHAENVIO}}</td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                AUTORIZADO SI _{{(Pert_AUTORIZADO=='S')?'X':''}}_ NO_{{(Pert_AUTORIZADO=='N')?'X':''}}_</td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                PERTINENCIA MÉDICA:</td>
        </tr>
    </table>

    <table style="width:93%;height:10%;border-collapse: collapse;margin-left:3em;margin-top:2em;">
        <tr>
            <td style="font-size:14px !important;text-align: justify;">
                {{Pert_PERTINENCIA}}
            </td>
        </tr>
    </table>
    <div style="margin-top:2em;margin-left:3em;">
        <div>
            <div>
                <div class="Firma" style="background-image:url({{Firma.Val}});"></div>
            </div>
            <div>
                <span> ______________________________________</span>
                <br>
                <span>FIRMA DEL AUDITOR MÉDICO REGIONAL</span>
            </div>
        </div>

    </div>

    <div class="fs_12" style="margin: 1 0vw;margin-top: 9vw;">
      <p><b>CONTROL DE CAMBIOS</b></p>
    </div>
    <!--  -->
    <table id="table4" width="100%">
      <tr>
        <th class="fondoAzul">VERSIÓN</th>
        <th class="fondoAzul">FECHA</th>
        <th class="fondoAzul">DESCRIPCIÓN</th>
      </tr>
      <tr>
        <td>01</td>
        <td>Febrero 2023.</td>
        <td>Emisión del Formato.</td>
      </tr>
      <tr>
        <td>02</td>
        <td>Enero 2024.</td>
        <td>Se agregó cuadro de Control de Cambio.</td>
      </tr>
    </table>

</body>

</html>
