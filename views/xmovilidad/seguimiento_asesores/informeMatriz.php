<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>REPORTE GENERAL DE AFILIACIONES</title>
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
            text-align: center;
        }
        
        .padding-interno{
            padding: 5px 5px;
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
    <script src="../../../scripts/controllers/movilidad/seguimiento_asesores/informeMatrizCtrl.js"></script>
</head>

<body ng-controller="informeMatrizCtrl">
    <table id="table1" width="100%" style="border: #FFF;" ng-show="tipo_proceso == 'A'">
        <tr style="font-weight:600;">
            <td colspan="1" rowspan="3" style="text-align: center;width:20%">
                <img src="https://genesis.cajacopieps.com//assets/images/cajacopi.png" width=100px; height="40px"></td>
            <td colspan="1" rowspan="2" style="width: 55%;text-align: center;font-weight:600;padding:0.1% 0%;">MATRIZ</td>
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
                REPORTE GENERAL DE AFILIACIONES</td>
            <td colspan="1">
                <!-- Fecha: Mayo 2019 -->
            </td>
        </tr>
        <!-- <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                Día {{datosFormatos.dia}} del mes {{datosFormatos.mes}} del año {{datosFormatos.anno}}. </td>
        </tr> -->
        <tr>
            <td colspan="6" style="border:none;">
                <table id="table2" style="margin:0 auto;margin-top: 20px;">
                    <thead>
                        <th>Número De Formulario</th>
                        <th>Fecha</th>
                        <th>Seccional</th>
                        <th>Código de Asesor</th>
                        <th>Identificación Usuario</th>
                        <th>Identificación Empresa</th>
                        <th>Observación</th>
                    </thead>
                    <tr ng-repeat="regAfiliacion in dataRegistrosAfiliacion">
                        <td class="padding-interno">8001 - {{regAfiliacion.num_formulario}}</td>
                        <td class="padding-interno">{{regAfiliacion.fecha}}</td>
                        <td class="padding-interno">{{regAfiliacion.ubi_nombre}}</td>
                        <td class="padding-interno">{{regAfiliacion.codigo_asesor}}</td>
                        <td class="padding-interno">{{regAfiliacion.id_usuario}}</td>
                        <td class="padding-interno">{{regAfiliacion.cod_empresa}}</td>
                        <td class="padding-interno">{{regAfiliacion.observacion}}</td>
                    </tr>
                    <tfoot>
                        <td colspan="7" style="text-align: right;font-style: italic;">Total de Formularios: {{totalFormularios}}</td>
                    </tfoot>
                </table>
            </td>
        </tr>
    </table>
    <table id="table1" width="100%" style="border: #FFF;" ng-show="tipo_proceso == 'E'">
        <tr style="font-weight:600;">
            <td colspan="1" rowspan="3" style="text-align: center;width:20%">
                <img src="https://genesis.cajacopieps.com//assets/images/cajacopi.png" width=100px; height="40px"></td>
            <td colspan="1" rowspan="2" style="width: 55%;text-align: center;font-weight:600;padding:0.1% 0%;">MATRIZ</td>
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
                REPORTE GENERAL DE EMPRESAS</td>
            <td colspan="1">
                <!-- Fecha: Mayo 2019 -->
            </td>
        </tr>
        <tr>
            <td colspan="6" style="border:none;">
                <table id="table2" style="margin:0 auto;margin-top: 20px;">
                    <thead>
                        <th>Número De Formulario</th>
                        <th>Fecha</th>
                        <th>Seccional</th>
                        <th>Código de Asesor</th>
                        <!-- <th>Identificación Usuario</th> -->
                        <th>Identificación Empresa</th>
                        <th>Observación</th>
                    </thead>
                    <tr ng-repeat="regAfiliacion in dataRegistrosAfiliacion">
                        <td class="padding-interno">8001 - {{regAfiliacion.num_formulario}}</td>
                        <td class="padding-interno">{{regAfiliacion.fecha}}</td>
                        <td class="padding-interno">{{regAfiliacion.ubi_nombre}}</td>
                        <td class="padding-interno">{{regAfiliacion.codigo_asesor}}</td>
                        <!-- <td class="padding-interno">{{regAfiliacion.id_usuario}}</td> -->
                        <td class="padding-interno">{{regAfiliacion.cod_empresa}}</td>
                        <td class="padding-interno">{{regAfiliacion.observacion}}</td>
                    </tr>
                    <tfoot>
                        <td colspan="7" style="text-align: right;font-style: italic;">Total de Formularios: {{totalFormularios}}</td>
                    </tfoot>
                </table>
            </td>
        </tr>
    </table>

</body>

</html>