<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Requerimiento</title>
    <link rel="icon" href="../../../assets/images/icon.ico" />
    <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
    <style type="text/css">
        @page {
            size: auto;
            margin: 1em;
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
            border-collapse: collapse;
            font-size: 11px;
        }

        /* ///////////////////// */
        #table6,
        #table6 th,
        #table6 td {
            border-collapse: collapse;
            font-size: 11px;
        }

        /* ///////////////////// */
        #table7,
        #table7 th,
        #table7 td {
            border-collapse: collapse;
            font-size: 11px;
        }

        /* ///////////////////// */
        #table8,
        #table8 th,
        #table8 td {
            border-collapse: collapse;
            font-size: 11px;
        }
    </style>
    <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
    <script src="../../../bower_components/angular/angular.js"></script>
    <script src="../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../scripts/controllers/gestiondocumental/soporte/ControladorIMP.js"></script>
</head>

<body ng-controller="ControladorIMP" ng-init="Hoja='OREQ'">
    <table id="table1" width="100%">
        <tr>
            <th rowspan="2" style="width: 10%"><img src="https://genesis.cajacopieps.com//assets/images/cajacopi.png " width=100px; height="30px"></th>
            <th rowspan="2" style="text-align: left;font-family: 'Open Sans', sans-serif;font-size: 13px;">CAJACOPI EPS-S
                <div style="font-family: 'Open Sans', sans-serif;font-weight: 500;">NIT 890.102.044-1</div>
            </th>
            <td style="width: 22%">CALLE 44 N 46 - 32</td>
        </tr>
        <td>Tel: 3185930 - 018000111446 - fax 385003x</td>
        <tr>
            <td rowspan="2"></td>
            <th rowspan="4"> </th>
            <td>ATLANTICO</td>
        </tr>
        <tr>
            <td>BARRANQUILLA</td>
        </tr>
    </table>

    <table id="table2" width="100%">
        <tr>
            <th rowspan="2" style="width: 78%;font-family: 'Open Sans', sans-serif;padding-left:20%;font-size: 19px;">REQUERIMIENTO</th>
            <th rowspan="2" style="text-align: left;font-family: 'Open Sans', sans-serif;">
                <span style="font-size: 15px;border:2px solid black;border-radius:5px;padding-left:5px;padding-right:25px;">Numero: {{Oreq_Numero}}</span>
            </th>
        </tr>
    </table>

    <table id="table3" width="100%">
        <tr>
            <td style="width: 9%;font-family: 'Open Sans', sans-serif;font-size: 11px;">Ubicacion:</td>
            <td style="width: 68%;font-family: 'Open Sans', sans-serif;font-size: 11px;">{{Oreq_Ubicacion_Num}} {{Oreq_Ubicacion_Nom}}</td>
            <td style="text-align: left;font-family: 'Open Sans', sans-serif;">
                <span style="font-size: 13px;padding-left:5px;padding-right:25px;font-weight: 600;">Fecha: {{Oreq_Fecha}}</span>
            </td>
        </tr>
        <tr>
            <td style="width: 9%;font-family: 'Open Sans', sans-serif;font-size: 11px;">Ubic Uso:</td>
            <td style="width: 68%;font-family: 'Open Sans', sans-serif;font-size: 11px;">{{Oreq_UbicacionUso_Num}} {{Oreq_UbicacionUso_Nom}}</td>
            <td style="text-align: left;font-family: 'Open Sans', sans-serif;">
            </td>
        </tr>
    </table>

    <table id="table4" width="100%" style="border: 2px solid darkgray;border-bottom: 2px solid black;">
        <tr>
            <td style="width: 15%;font-family: 'Open Sans', sans-serif;font-size: 10px;font-weight: 600;background-color:darkgray; !important">Datos:</td>
            <td style="width: 38%;font-family: 'Open Sans', sans-serif;font-size: 10px;font-weight: 600;">SOLICITUD N°</td>
            <td style="text-align: left;font-family: 'Open Sans', sans-serif;"></td>
            <td style="text-align: left;font-family: 'Open Sans', sans-serif;"></td>
        </tr>
        <tr>
            <td style="font-family: 'Open Sans', sans-serif;font-size: 10px;font-weight: 600;">Solicitante:</td>
            <td style="font-family: 'Open Sans', sans-serif;font-size: 10px;">{{Oreq_Solicitante_Ced}} {{Oreq_Solicitante_Nom}}</td>
            <td style="text-align: left;font-family: 'Open Sans', sans-serif;"></td>
            <td style="text-align: left;font-family: 'Open Sans', sans-serif;"></td>
        </tr>
        <tr>
            <td style="font-family: 'Open Sans', sans-serif;font-size: 10px;font-weight: 600;">Fecha Requerida:</td>
            <td style="font-family: 'Open Sans', sans-serif;font-size: 10px;">{{Oreq_FechaReq}}</td>
            <td style="text-align: left;font-family: 'Open Sans', sans-serif;font-weight: 600;">PRIORIDAD:
                <span style="font-size: 11px;padding-left:5px;padding-right:25px;font-weight: 500;">{{Oreq_Prioridad}}</span>
            </td>
            <td style="text-align: left;font-family: 'Open Sans', sans-serif;">
                <span style="font-size: 11px;padding-left:5px;padding-right:25px;font-weight: 600;">COTIZACIONES</span>
            </td>
        </tr>
    </table>
    <table id="table5" width="100%" style="font-family: 'Open Sans', sans-serif;">
        <thead style="border-bottom: 2px solid black;font-weight:600;">
            <tr>
                <td style="width: 5%;"></td>
                <td style="width: 45%;"></td>
                <td style=""></td>
                <td colspan="6" style="font-weight:600;text-align:center">{{Oreq_Proveedor_Nom}}</td>
            </tr>
            <tr>
                <td style="">Codigo</td>
                <td style="text-align:center;">Descripcion</td>
                <td style="">Uso</td>
                <td style="">Uni.</td>
                <td style="">Cantidad</td>
                <td style="">{{Oreq_Proveedor_Num}}</td>
                <td style="">1</td>
                <td style="">0</td>
                <td style="">2</td>
                <td style=""></td>
            </tr>
        </thead>
        <tbody>
            <tr ng-repeat="x in Oreq_Productos">
                <td style="">{{x.COD_PRO}}</td>
                <td style="">{{x.NOM_PRO}}</td>
                <td style="">0 INDEFINIDO</td>
                <td style="">{{x.UNIDAD}}</td>
                <td style="">{{x.CANTIDAD}}</td>
                <td style="">0,00</td>
                <td style="">0,00</td>
                <td style="">0,00</td>
                <td style="">0,00</td>
                <td style="">0,00</td>
            </tr>
        </tbody>
    </table>

    <table id="table6" width="100%" style="font-family: 'Open Sans', sans-serif;margin-top:10px">
        <tbody>
            <tr>
                <td style="width:70%" colspan="4"></td>
                <td style="font-weight:600;">Subtotal</td>
                <td style=""></td>
                <td style="">0,00</td>
                <td style=""></td>
                <td style="">0,00</td>
            </tr>
            <tr>
                <td style="" colspan="4"></td>
                <td style="font-weight:600;">Impuesto</td>
                <td style=""></td>
                <td style="">0,00</td>
                <td style=""></td>
                <td style="">0,00</td>
            </tr>
            <tr>
                <td style="" colspan="4"></td>
                <td style="font-weight:600;">Total</td>
                <td style=""></td>
                <td style="">0,0000</td>
                <td style=""></td>
                <td style="">0,0000</td>
            </tr>
        </tbody>
    </table>
    <table id="table7" width="100%" style="font-family: 'Open Sans', sans-serif;margin-top:10px">
        <tbody>
            <tr>
                <td style="width:1%;"><b> Observación:</b> {{Oreq_Observacion1}}</td>
            </tr>
            <td><b style="border-bottom:1px solid black;">Observación Cotización:</b> <span style="line-height: 15.5px;">{{Oreq_Observacion2}}</span></td>

        </tbody>
    </table>
    <table id="table8" width="100%" style="font-family: 'Open Sans', sans-serif;margin-top:40px">
        <tbody>
            <tr>
                <td style="width: 40%;">
                    <hr style="border:0.7px solid black;    width: 80%;">
                </td>
                <td style="width: 40%;">
                    <hr style="border:0.7px solid black;    width: 80%;">
                </td>
            </tr>
            <tr>
                <td style="text-align:center;">Responsable de Compras</td>
                <td style="text-align:center;">Cotizador</td>
            </tr>
            <tr>
                <td style="text-align:center;"><br></td>
                <td style="text-align:center;"></td>
            </tr>
        </tbody>
    </table>
    <span style="padding-right: 15px; font-size:11px;font-family: 'Open Sans', sans-serif;">
        Fecha y Hora de Impresión: {{FechayHora}} Impreso por: <b>{{Cedula}} </b> Estado: <b> {{Oreq_Estado}}</b></span>
</body>

</html>