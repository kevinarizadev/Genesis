<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Orden de compra</title>
    <link rel="icon" href="../../../assets/images/icon.ico" />
    <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
    <style type="text/css">
        @page {
            size: auto;
            margin: 1em;
        }

        * {
            font-family: 'Open Sans', sans-serif;
        }

        #table1,
        #table1 th,
        #table1 td {
            border: 0px solid black;
            font-family: 'Open Sans', sans-serif;
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
            font-size: 13px;
        }

        /* ///////////////////// */
        #table5,
        #table5 th,
        #table5 td {
            border-collapse: collapse;
        }

        #table5>tbody tr {
            border-collapse: collapse;
            font-size: 8px;
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

        /* ///////////////////// */
        #table9,
        #table9 th,
        #table9 td {
            border-collapse: collapse;
            font-size: 11px;
        }

        /* ///////////////////// */
        #table10,
        #table10 th,
        #table10 td {
            border-collapse: collapse;
            font-size: 11px;
        }

        /* ///////////////////// */
        #table11,
        #table11 th,
        #table11 td {
            border-collapse: collapse;
            font-size: 11px;
        }
    </style>
    <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
    <script src="../../../bower_components/angular/angular.js"></script>
    <script src="../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../scripts/controllers/gestiondocumental/soporte/ControladorIMP.js"></script>
</head>

<body ng-controller="ControladorIMP" ng-init="Hoja='OORD'">
    <table id="table1" width="100%">
        <tr>
            <th rowspan="2" style="width: 10%"><img src="../../../assets/images/logo_cajacopieps.png" width=100px; height="30px"></th>
            <th rowspan="2" style="text-align: left;font-family: 'Open Sans', sans-serif;font-size: 13px;">CAJACOPI EPS SAS
                <div style="font-family: 'Open Sans', sans-serif;font-weight: 500;">NIT 901.543.211 - 6</div>
            </th>
            <td style="width: 22%;font-weight:600;">{{Oord_Ubicacion_Nom}}</td>
        </tr>
        <td style="font-weight:600;">{{Oord_Ubicacion_Dir}}</td>
        <tr>
            <td rowspan="2"></td>
            <th rowspan="4"> </th>
            <td style="font-weight:600;">{{Oord_Ubicacion_Tel}}</td>
        </tr>
        <tr>
            <td style="font-weight:600;">{{Oord_Ubicacion_Nom}}</td>
        </tr>
    </table>

    <table id="table2" width="100%">
        <tr>
            <th rowspan="2" style="width: 78%;font-family: 'Open Sans', sans-serif;padding-left:20%;font-size: 19px;">ORDEN DE COMPRA</th>
            <th rowspan="2" style="text-align: left;font-family: 'Open Sans', sans-serif;">
                <span style="font-size: 15px;border:2px solid black;border-radius:5px;padding-left:5px;padding-right:25px;">Numero: {{Oord_Numero}}</span>
            </th>
        </tr>
    </table>

    <table id="table3" width="100%">
        <tr>
            <td style="width: 1%;font-family: 'Open Sans', sans-serif;font-size: 12px;font-weight:600;">ALMACEN:</td>
            <td style="width: 68%;font-family: 'Open Sans', sans-serif;font-size: 12px;">{{Oord_Ubicacion_Num}} {{Oord_Ubicacion_Nom}}</td>
        </tr>
    </table>
    <table id="table44" width="19%" style="position:absolute;left:77.5%;    margin-top: -23px;">
        <tr>
            <td style="width:2%;font-family: 'Open Sans', sans-serif;font-size: 12px;">Fecha: {{Oord_Fecha}}</td>
        </tr>
        <tr>
        </tr>
        <tr>
            <td style="font-family: 'Open Sans', sans-serif;font-size: 12px;">Requerimiento: {{Oord_Num_Req}}</td>
        </tr>
        <tr>
            <td style="font-family: 'Open Sans', sans-serif;font-size: 12px;">Cotización: {{Oord_Cotizacion}}</td>
        </tr>
    </table>
    <table id="table4" width="75%" style="border: 2px solid darkgray;">
        <tr>
            <td style="width:25%;font-family: 'Open Sans', sans-serif;font-size: 12px;font-weight: 600;">Proveedor:</td>
            <td style="font-family: 'Open Sans', sans-serif;font-size: 12px;font-weight: 600;">{{Oord_Proveedor_Cod}} {{Oord_Proveedor_Nom}}</td>
        </tr>
        <tr>
            <td style="font-family: 'Open Sans', sans-serif;font-size: 12px;font-weight: 600;">Condición de pago:</td>
            <td style="font-family: 'Open Sans', sans-serif;font-size: 12px;">{{Oord_Condicion}}</td>
        </tr>
        <tr>
            <td style="font-family: 'Open Sans', sans-serif;font-size: 12px;font-weight: 600;">Dirección:</td>
            <td style="font-family: 'Open Sans', sans-serif;font-size: 12px;">{{Oord_Proveedor_Dir}} {{Oord_Proveedor_Ubi}} Tel: {{Oord_Proveedor_Tel}} Fax: {{Oord_Proveedor_Fax}}</td>
        </tr>
    </table>

    <table id="table5" width="100%" style="font-family: 'Open Sans', sans-serif;">
        <thead style="border-top: 2px solid black;border-bottom: 2px solid black;font-weight:600;font-size: 10px;">
            <tr>
                <td style="">N°Req</td>
                <td style="width:1%;">Codigo</td>
                <td style="text-align:center;">Descripcion del producto</td>
                <td style="">Cod Ant</td>
                <td style="">Uso</td>
                <td style="">Uni.</td>
                <td style="">Cantidad</td>
                <td style="">Precio</td>
                <td style="">Desc</td>
                <td style="">%</td>
                <td style="">Imp</td>
                <td style="">Entrega</td>
                <td style="">Total COP</td>
            </tr>
        </thead>
        <tbody>
            <tr ng-repeat="x in Oord_Productos">
                <td style="">{{x.COD_OREQ}}</td>
                <td style="text-align:center;">{{x.COD_PRO}}</td>
                <td style="">{{x.NOM_PRO}}</td>
                <td style="text-align:center;">{{x.COD_ANT}}</td>
                <td style="text-align:center;">0</td>
                <td style="text-align:center;">{{x.UNIDAD}}</td>
                <td style="text-align:center;">{{x.CANTIDAD}}</td>
                <td style="text-align:center;">{{formatPeso2(x.PRECIO)}}</td>
                <td style="text-align:center;">{{x.DESCUENTO}}</td>
                <td style="text-align:center;">%</td>
                <td style="text-align:center;">{{x.IVA}}</td>
                <td style="text-align:center;"></td>
                <td style="text-align:center;">{{formatPeso2(x.CANTIDAD * x.PRECIO)}}</td>
            </tr>
        </tbody>
        <tfoot style="font-size: 10px;">
            <tr>
                <td style="text-align:center;"></td>
                <td style="text-align:center;"></td>
                <td style="text-align:center;"></td>
                <td style="text-align:center;"></td>
                <td style="text-align:center;"></td>
                <td style="text-align:center;">Total</td>
                <td style="text-align:center;">{{Oord_Cantidad}}</td>
                <td style="text-align:center;"></td>
                <td style="text-align:center;"></td>
                <td style="text-align:center;"></td>
                <td style="text-align:center;"></td>
                <td style="text-align:center;"></td>
                <td style="text-align:center;"></td>
            </tr>
        </tfoot>
    </table>

    <table id="table6" width="100%" style="font-family: 'Open Sans', sans-serif;margin-top:10px">
        <tbody>
            <tr style="width:30%;">
                <td style="width: 70%;" rowspan="10"><b>Observación: </b>{{Oord_Observacion1}}</td>
            </tr>
            <tr>
                <td style="font-weight:600;text-align: right;">Bruto:</td>
                <td style="    text-align: right;">{{formatPeso2(Oord_Bruto)}}</td>
            </tr>
            <tr>
                <td style="font-weight:600;text-align: right;">Descuento 1 ({{formatPeso2(Oord_Descuento_Num)}})%:</td>
                <td style="    text-align: right;">{{formatPeso2(Oord_Descuento_Val)}}</td>
            </tr>
            <tr>
                <td style="font-weight:600;text-align: right;">Subtotal:</td>
                <td style="    text-align: right;">{{formatPeso2(Oord_Subtotal)}}</td>
            </tr>
            <tr>
                <td style="font-weight:600;text-align: right;">Descuento Item:</td>
                <td style="    text-align: right;">{{formatPeso2(Oord_Descuento_Item)}}</td>
            </tr>
            <tr>
                <td style="font-weight:600;text-align: right;">Subtotal 1:</td>
                <td style="    text-align: right;">{{formatPeso2(Oord_Subtotal1)}}</td>
            </tr>
            <tr>
                <td style="font-weight:600;text-align: right;">Descuento 2 ({{formatPeso2(Oord_Descuento2_Num)}})%:</td>
                <td style="    text-align: right;">{{formatPeso2(Oord_Descuento2_Val)}}</td>
            </tr>
            <tr>
                <td style="font-weight:600;text-align: right;">Subtotal 2:</td>
                <td style="    text-align: right;">{{formatPeso2(Oord_Subtotal2)}}</td>
            </tr>
            <tr>
                <td style="font-weight:600;text-align: right;">Impuesto:</td>
                <td style="    text-align: right;">{{formatPeso2(Oord_Impuesto)}}</td>
            </tr>
            <tr>
                <td style="font-weight:600;text-align: right;">Total:</td>
                <td style="    text-align: right;">{{formatPeso2(Oord_Total)}}</td>
            </tr>
        </tbody>
    </table>
    <table id="table7" width="80%" style="font-family: 'Open Sans', sans-serif;margin-top:10px">
        <tbody>
            <tr>
                <td style="width: 27%;">
                    <hr style="border:0.7px solid black;width: 80%;">
                </td>
                <td style="width: 27%;">
                    <hr style="border:0.7px solid black;width: 80%;">
                </td>
                <td style="width: 27%;">
                    <hr style="border:0.7px solid black;width: 80%;">
                </td>
            </tr>
            <tr>
                <td style="text-align:center;">ELABORO</td>
                <td style="text-align:center;">REVISO</td>
                <td style="text-align:center;">APROBO</td>
            </tr>
            <br>

        </tbody>
    </table>
    <br>
    <table id="table8" width="100%" style="border-top:1px solid black;margin-top:10px;border-bottom:1px solid black;font-weight:600;text-align:center">
        <td>CONDICIONES DE ENTREGA</td>
    </table>

    <table id="table9" width="100%" style="">
        <tr>
            <td style="width: 41%;"><b>ALMACEN:</b> {{Oord_Ubicacion_Nom}}</td>
            <td><b>DIRECCION:</b> {{Oord_Ubicacion_Dir}}</td>
            <td><b>TELEFONO:</b> {{Oord_Ubicacion_Tel}}</td>
        </tr>
    </table>

    <table id="table10" width="100%" style="">
        <tr style="text-align: left;">
            <td style="width: 77.5%;">
                <div>
                    <b>Favor relacionar en su factura el número de esta orden de Compra.</b>
                </div>
                <div>
                    <b>La mercancía le será recibida si está acompañada de la factura correspondiente.</b>
                </div>
                <div>
                    <b>La aceptación de esta Orden de Compra, implica cumplir con todas las condiciones aquí estipuladas.</b>
                </div>
                <div>
                    <b>FAVOR CUMPLIR CON LOS PLAZOS DE ENTREGA.</b>
                    <b style="margin-left:10%;">GRACIAS</b>
                </div>
            </td>
            <td>
                <div>
                    <b>FECHAS DE ENTREGA</b>
                </div>
                <div>
                    <b>FECHA MINIMA: </b> {{Oord_Fecha_Min}}
                </div>
                <div>
                    <b>FECHA MÁXIMA:</b> {{Oord_Fecha_Max}}
                </div>
            </td>
        </tr>
    </table>
    <br>
    <span style="padding-right: 15px; font-size:11px;font-family: 'Open Sans', sans-serif;">
        Fecha y Hora de Impresión: {{FechayHora}} Impreso por: <b>{{Cedula}} </b> Estado: <b> {{Oord_Estado}}</b></span>
</body>

</html>