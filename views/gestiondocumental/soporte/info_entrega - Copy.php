<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Acta de entrega</title>
    <link rel="icon" href="../../../assets/images/icon.ico" />
    <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
    <style type="text/css">
        @page {
            size: auto;
            margin: 1em;
        }

        * {
            font-family: 'Open Sans', sans-serif;
            font-size: 12px;
        }

        body {
            padding: 3em;
        }

        #table1,
        #table1 th,
        #table1 td {
            border: 0px solid black;
            font-size: 12px;
            border-spacing: 0 0 !important;
        }

        /* ///////////////////// */
        #table2,
        #table2 th,
        #table2 td {
            border: 1px solid black;
            border-collapse: collapse;
            font-size: 12px;
            text-align: center;
        }
    </style>
    <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
    <script src="../../../bower_components/angular/angular.js"></script>
    <script src="../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../scripts/controllers/gestiondocumental/soporte/ControladorIMP.js"></script>
</head>

<body ng-controller="ControladorIMP" ng-init="Hoja='ENTREGA'">
    <table id="table1" width="100%" style="text-align:left;">
        <tr>
            <th style="width: 10%"><img src="https://www.cajacopieps.com/wp-content/uploads/logo_cajacopieps.png" ></th>
        </tr>
    </table>

    <div class="col s12">
        <div class="col s10">
            <!-- Barranquilla 03 de abril del 2019 -->
            {{Ubi_sol}} {{FechayHora}}
            <span style="float: right;"><b> Mesa de ayuda:</b> {{Mesadeayuda}}</span>
        </div>
    </div>

    <div style="text-align:center;">
        <h3 style="font-size:15px">ACTA DE ENTREGA</h3>
    </div>
    <div>
        <span>Se hace entrega a <b>{{Nombre_sol}} - {{Cargo_sol}}</b>
        </span>
    </div>

    <div>
        <span>El (los) siguiente (s) elemento (s) que relacionan a continuación:
        </span>
    </div>
    <br>

    <table id="table2" width="100%">
        <thead>
            <th style="width: 50%;">DETALLE</th>
            <th>CANTIDAD</th>
        </thead>
        <tr ng-repeat="x in Productos">
            <td>{{x.NOM_PRO}}</td>
            <td>{{x.CANTIDAD}}</td>
        </tr>
    </table>
    <br>
    <div>
        <span>Se recuerda al funcionario en mención que debe responder por el buen uso de este (estos) recurso (s).
        </span>
        <br><br>
        <span>En caso de pérdida o mal uso se debe responder económicamente por el (los) mismo (s).
        </span>
        <br><br>
        <span>Si es víctima de hurto con respecto a este (estos) elemento (s) de trabajo se debe notificar a la
            Coordinación Nacional Administrativa para iniciar las investigaciones y denuncias pertinentes.
        </span>
    </div>
    <br>
    <br>

    <table id="table3" width="100%">
        <td style="width: 50%;">Entrega:</td>
        <td>Recibe:</td>
    </table>
    <br><br><br>
    <table id="table3" width="100%">
        <tr>
            <td style="width: 50%;">
            <hr style="border-top:1px solid black;width:70%;margin-left: 0;">
                <b>{{Nombre_ent}}</b>
                <div>
                {{Cargo_ent}}
                </div>
            </td>
            <td >
            <hr style="border-top:1px solid black;width:70%;margin-left: 0;">
                <b>{{Nombre_sol}}</b>
                <div>
                {{Cargo_sol}}
                </div>
                <div>
                    UBICACIÓN: <b>{{Ubi_sol}}</b>
                </div>
            </td>
        <tr>
    </table>

</body>

</html>