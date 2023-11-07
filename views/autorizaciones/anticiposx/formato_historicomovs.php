<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Histórico de Movimientos Anticipo N° {{Numero}}</title>
    <link rel="icon" href="../../../assets/images/icon.ico" />
    <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
    <style type="text/css">
        @page {
            size: auto;
            margin: 1em 2em -3em 2em;
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
            text-align: center;
            margin-top: 2em;
            border-collapse: collapse;
            font-size: 11px;
            border-bottom: 2px solid #ddd;
        }
    </style>
    <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
    <script src="../../../bower_components/angular/angular.js"></script>
    <script src="../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../scripts/controllers/autorizaciones/anticipos/soportes/historico_Controller.js"></script>
    <link href="../../styles/fonts-material-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="../../../assets/css/fontello.css">
</head>

<body ng-controller="historico_Controller">
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
            <th style="font-family: 'Open Sans', sans-serif;padding-top:10px;font-size: 19px;">Histórico de Movimientos Anticipo N°{{Numero}}</th>
        </tr>
    </table>

    <table id="table5" width="100%" style="font-family: 'Open Sans', sans-serif;">
        <thead>
            <th class="center" style="cursor:pointer;background-color: white;">#</th>
            <th class="center" style="cursor:pointer;background-color: white;">Fecha</th>
            <th class="center" style="cursor:pointer;background-color: white;">Estado</th>
            <th class="center" style="cursor:pointer;background-color: white;">Status</th>
            <th class="center" style="cursor:pointer;background-color: white;">Responsable</th>
            <th class="center" style="cursor:pointer;background-color: white;">Comentario</th>
        </thead>
        <tbody id="idpro">
            <tr ng-repeat="x in Datos">
                <td class="center">{{$index + 1}}</td>
                <td class="center">{{x.Fecha}}</td>
                <td class="center">
                    <!-- <i class="icon-circle" style="font-size: 9px;{x.Estado}" ng-style="Estado_Solicitud_Color(x.Estado)"></i> -->
                    <i class="icon-circle" ng-style="{'color': (x.Estado == 'A') ? 'rgb(3, 197, 20)' : (x.Estado == 'P') ? 'rgb(71, 71, 165)' : (x.Estado == 'D') ? 'rgb(235, 156, 5)' : 'rgb(245, 75,75)' }"></i>
                    <!-- {{x.Estado}} -->
                </td>
                <td class="center">
                    <!-- <div class="tooltip"> -->
                    <i ng-class="(x.Estado == 'A') ? (x.Status == 0) ? 'icon-circle-empty' :'icon-ok-circled2' : (x.Estado == 'P') ? 'icon-thumbs-up' : (x.Estado == 'D') ? 'icon-ccw-1' : 'icon-cancel-circled2'" style="font-size: 15px"></i>
                    <!-- <span class="tooltiptext" style="font-size: 12px;width: 70px;margin-left: -36px;">{{Estatus_Solicitud_Tooltip(x.Estado,x.Status)}}</span> -->
                    <!-- </div> -->
                </td>

                <td class="center">{{x.Nombre}}</td>
                <td class="center" style="max-width: 28vw;">{{x.Comentario}}</td>
            </tr>
        </tbody>
    </table>

</body>

</html>