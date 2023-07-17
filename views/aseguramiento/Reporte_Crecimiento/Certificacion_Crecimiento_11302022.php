<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Formato de Certificación</title>
    <link rel="icon" href="../../../assets/images/icon.ico" />
    <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
    <style type="text/css">
        @page {
            size: auto;
            margin: 3em;
        }

        * {
            font-family: 'Open Sans', sans-serif;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            text-align: justify;
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
            padding-right: 3em;
            padding-top: 1em;
            border-style: none !important;
        }
    </style>
    <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
    <script src="../../../bower_components/angular/angular.js"></script>
    <script src="../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../scripts/controllers/aseguramiento/Reporte_Crecimiento/certificadoRPCtrl.js"></script>
</head>

<body ng-controller="certificadorpctrl">
    <table id="table1" width="100%" style="border: #FFF;">

        <tr style="font-weight:600;">
            <td colspan="1" rowspan="3" style="text-align: center;width:20%">
                <img src="https://genesis.cajacopieps.com//assets/images/cajacopi.png" width=100px; height="40px"></td>
            <td colspan="1" rowspan="2" style="width: 55%;text-align: center;font-weight:600;padding:0.1% 0%;">FORMATO DE CERTIFICACIÓN</td>
            <td colspan="1">
                <!-- Código GPB-FR-06-AU -->
            </td>
        </tr>
        <tr style="font-weight:600;">
            <td colspan="1">
                <!-- Versión: 01 -->
            </td>
        </tr>
        <tr style="font-weight:600;">
            <td colspan="1" style="text-align: center;padding:1% 0%;">
                REPORTE DE AFILIACIONES E INSCRIPCIONES ENTE TERRITORIAL</td>
            <td colspan="1">
                <!-- Fecha: Mayo 2019 -->
            </td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                Día {{datosFormatos.dia}} del mes {{datosFormatos.mes}} del año {{datosFormatos.anno}}. </td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                Secretaria Local de Salud<br>
                Municipio de {{municipio}}
            </td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                <b>Referencia: Reporte de Inscripciones y Afiliaciones correspondientes a la {{semana}} Semana del mes {{datosFormatos.mes}} del Año {{datosFormatos.anno}}.</b></td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">Cordial Saludo. </td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                Dando cumplimiento a la Normatividad vigente del Sistema En Seguridad Social en Salud se reporta 
                en medio físico y magnético las afiliaciones e ingresos realizados por esta entidad en el mes de {{nombreSemana}}, 
                que fueron reportadas a la Administradora de los Recursos del Sistema General de Seguridad Social en Salud - ADRES 
                en los procesos de BDUA, de acuerdo a la resolución 4622 del 2016, para que sean validadas y cargadas 
                según la relación detallada en la parte inferior, las cuales llevan anexas: 
            </td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                <ul>
                    <li>Formulario Único de Afiliación y novedades.</li>
                    <li>Copia del documento.</li>
                    <li>Copia de la Ficha  Sisben y/o DNP.</li>
                    <li>Acta de Entrega debidamente diligenciada con firma y huella del usuario.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td colspan="6" style="border:none;">
                <table id="table2" style="margin:0 auto;">
                    <tr>
                        <th>TIPO DE INGRESO</th>
                        <th># REGISTROS</th>
                    </tr>
                    <tr>
                        <td>MS</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>S1</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>TRASLADOS</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>RECUPERACIONES</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>TOTAL</td>
                        <td></td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6"><b>ANEXOS:</b></td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                <ul>
                    <li>REPORTE Y FORMULARIOS ÚNICOS DE AFILIACIÓN DE S1, MS.</li>
                    <li>CD BASE DE DATOS S1, MS.</li>
                    <li>BASE DE DATOS DE MOVILIDAD.</li>
                    <li>LISTADO.</li>
                </ul>
            </td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">Atentamente,<br><br><br>
            _________________________________________<br>
            COORDINADOR SECCIONAL<br>
            <b>Proyecto: </b> Asistente Seccional de Afiliación Registro y Mercadeo.<br><br>
            <b>ESTRUCTURA LISTADO</b><br>
            <span>No. | </span><span>TIPODOC | </span><span>NUMDOC | </span><span>PAPELL | </span><span>SAPELL | </span>
            <span>PNOMB | </span><span>SNOMB | </span><span>MUNICIPIO | </span><span>TIPO_INGRESO | </span>
            <span>OBSERVACION</span>
            </td>
        </tr>
    </table>

</body>

</html>