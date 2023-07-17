<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Inventario Actual Bodega</title>
    <link rel="icon" href="../../../assets/images/icon.ico" />
    <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
    <style type="text/css">
        @page {
            size: auto;
            margin: 1em 2em 3em 2em;
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
        }

        /* ///////////////////// */
        #table5,
        #table5 th,
        #table5 td {
            margin-top: 2em;
            border-collapse: collapse;
            font-size: 8px;
            border-bottom: 1px solid #ddd;
        }

    </style>
    <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
    <script src="../../../bower_components/angular/angular.js"></script>
    <script src="../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../scripts/controllers/gestiondocumental/soporte/ControladorIMP.js"></script>
</head>

<body ng-controller="ControladorIMP" ng-init="Hoja='BODEGA'">
    <table id="table1" width="100%">
        <tr>
            <th rowspan="2" style="width: 10%"><img src="../../../assets/images/logo_cajacopieps.png" width=100px; height="30px"></th>
            <th rowspan="2" style="text-align: left;font-family: 'Open Sans', sans-serif;font-size: 13px;">CAJACOPI EPS SAS
                <div style="font-family: 'Open Sans', sans-serif;font-weight: 500;">NIT 901.543.211 - 6</div>
                <div style="text-align:right;font-size: 10px;">Fecha de Impresión: {{FechayHora}}</div>
            </th>
        </tr>
    </table>

    <table id="table2" width="100%">
        <tr>
        <th style="font-family: 'Open Sans', sans-serif;padding-top:10px;font-size: 19px;">INVENTARIO DE BODEGAS</th>
        </tr>
    </table>

    <table id="table5" width="100%" style="font-family: 'Open Sans', sans-serif;">
        <thead style="border-bottom: 2px solid black;font-weight:600;">
            
            <tr>
                <td style="">Bodega</td>
                <td style="">Concepto</td>
                <td style="">Código</td>
                <td style="text-align:center;">Nombre del producto</td>
                <td style="">Cantidad</td>
                <td style="text-align:right;">Fecha de último cargue</td>
            </tr>
        </thead>
        <tbody>
            <tr ng-repeat="x in Productos">
                <td style="">{{x.BODEGA}}</td>
                <td style="">{{x.CONCEPTO}}</td>
                <td style="">{{x.COD_PRO}}</td>
                <td style="">{{x.NOM_PRO}}</td>
                <td style="">{{x.CANTIDAD}}</td>
                <td style="text-align:right;">{{x.FECHA}}</td>
            </tr>
        </tbody>
    </table>

</body>

</html>