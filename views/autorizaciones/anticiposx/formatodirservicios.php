<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Formato de Direccionamiento</title>
    <link rel="icon" href="../../../../assets/images/icon.ico" />
    <link rel="stylesheet" type="text/css" href="../../../../bower_components/sweetalert/css/sweetalert2.css">
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
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        table {
            width: 100%;
        }

        table,
        table tr th,
        table tr td {
            border: .5px solid black;
            font-size: 10px;
            border: #FFF;
            border-collapse: collapse;
        }

        /* ///////////////////////////////////////////////////////////CSS TABLA 1*/
        #table1 th {
            font-size: 11px;
            text-decoration: underline;
            text-align: center;
        }

        #table1 td {
            padding-top: 2.5em;
            font-size: 10px;
            text-align: center;
        }

        #table1 {
            margin-top: 2.5em;
            font-weight: 600;
            border: #FFF;
            text-align: center;
        }

        /* ///////////////////////////////////////////////////////////CSS TABLA 2*/

        #table2 {
            margin-top: 1.5em;
        }

        #table3 {
            margin-top: 1.5em;
        }

        #table4 {
            margin-top: 2.5em;
        }

        #table5 {
            margin-top: 1.5em;
        }

        #table6 {
            margin-top: 2.5em;
        }

        #table7 {
            margin-top: 1.5em;
        }

        #table7,
        #table7 tr th,
        #table7 tr td {
            border: .5px solid black;
            /* font-size: 10px; */
            /* border: black !important; */
            border-collapse: collapse;
        }

        #table8 {
            margin-top: 1.5em;
        }
    </style>
    <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
    <script src="../../../bower_components/angular/angular.js"></script>
    <script src="../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../scripts/controllers/autorizaciones/anticipos/formatodirserviciosController.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.4.1/jspdf.min.js"></script>

</head>

<body ng-controller="ControladorIMP" id="body">
    <div style="width: 100%">
        <table id="table1">
            <tr>
                <th>DIRECCIONAMIENTO DE SERVICIOS</th>
            </tr>
            <tr>
                <td>SERVICIO NUEVO</td>
            </tr>
        </table>
        <!-- //////////////////////////////////////////////// -->
        <table id="table2">
            <tr>
                <td style="width:15%;">
                    <strong>Solicitada el:</strong>
                </td>
                <td style="width:40%;">
                    {{Servicio.FECHA_SOLICITADA}}
                </td>
                <td style="width:20%;">
                    <strong>No. Prescipción:</strong>
                </td>
                <td style=" width:30%;">
                    {{Servicio.NUM_PRESCRIPCION}}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Direccionada el:</strong>
                </td>
                <td>
                    {{Servicio.FECHA_DIRECCIONADA}}
                </td>
                <td>
                    <strong>No. Direccionamiento:</strong>
                </td>
                <td>
                    {{Servicio.NUM_DIRECCIONAMIENTO}}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Impresa el:</strong>
                </td>
                <td>
                    {{Servicio.FECHA_IMPRESA}}
                </td>
                <td>
                    <strong>Código EPS:</strong>
                </td>
                <td>
                    {{Servicio.NUM_EPS}}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Afiliado:</strong>
                </td>
                <td>
                    {{Servicio.AFILIADO}}
                </td>
            </tr>
        </table>
        <!-- //////////////////////////////////////////////// -->
        <table id="table3">
            <tr>
                <td style="width:20%;">
                    <strong>Edad:</strong>
                </td>
                <td style="width:20%;">
                    {{Servicio.AFI_EDAD}}
                </td>
                <td style="width:20%;">
                    <strong>Fecha de Nacimiento:</strong>
                </td>
                <td style=" width:20%;">
                    {{Servicio.AFI_FEC_NACI}}
                </td>
                <td style="width:20%;">
                    <strong>Tipo Afiliado:</strong>
                </td>
                <td style=" width:20%;">
                    {{Servicio.AFI_TIPO}}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Dirección del Afiliado:</strong>
                </td>
                <td>
                    {{Servicio.AFI_DIRECCION}}
                </td>
                <td>
                    <strong>Departamento:</strong>
                </td>
                <td>
                    {{Servicio.AFI_DPTO}}
                </td>
                <td>
                    <strong>Municipio:</strong>
                </td>
                <td>
                    {{Servicio.AFI_MUNICIPIO}}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Teléfono del Afiliado:</strong>
                </td>
                <td>
                    {{Servicio.AFI_TELEFONO}}
                </td>
                <td>
                    <strong>Teléfono/Celular Afiliado:</strong>
                </td>
                <td>
                    {{Servicio.AFI_CELULAR}}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Correo Electrónico:</strong>
                </td>
                <td colspan="6">
                    {{Servicio.AFI_CORREO}}
                </td>
            </tr>
        </table>
        <!-- //////////////////////////////////////////////// -->
        <table id="table4">
            <tr>
                <td style="width:20%;">
                    <strong>Solicitada Por:</strong>
                </td>

                <td style="width:20%;" colspan="6">
                    {{Servicio.SOL_NOMBRE}}
                </td>
            </tr>
            <tr>
                <td style="width:20%;">
                    <strong>Nit:</strong>
                </td>
                <td style="width:20%;">
                    {{Servicio.SOL_NIT}}
                </td>
                <td style="width:20%;">
                    <strong>Código:</strong>
                </td>
                <td style="width:20%;" colspan="3">
                    {{Servicio.SOL_CODIGO}}
                </td>

            </tr>
            <tr>
                <td>
                    <strong>Dirección:</strong>
                </td>
                <td>
                    {{Servicio.SOL_DIRECCION}}
                </td>
                <td>
                    <strong>Departamento:</strong>
                </td>
                <td style="width:20%;">
                    {{Servicio.SOL_DPTO}}
                </td>
                <td style="width:20%;">
                    <strong>Municipio:</strong>
                </td>
                <td style="width:20%;">
                    {{Servicio.SOL_MUNICIPIO}}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Teléfono:</strong>
                </td>
                <td colspan="6">
                    {{Servicio.SOL_TELEFONO}}
                </td>
            </tr>
        </table>
        <!-- //////////////////////////////////////////////// -->
        <table id="table5">
            <tr>
                <td style="width:20%;">
                    <strong>Ordenado Por:</strong>
                </td>

                <td style="width:20%;" colspan="6">
                    {{Servicio.REM_NOMBRE}}
                </td>
            </tr>
            <tr>
                <td style="width:20%;">
                    <strong>Remitido a:</strong>
                </td>

                <td style="width:20%;" colspan="6">
                    {{Servicio.REM_NOMBRE_IPS}}
                </td>
            </tr>
            <tr>
                <td style="width:20%;">
                    <strong>Nit:</strong>
                </td>
                <td style="width:20%;">
                    {{Servicio.REM_NIT}}
                </td>
                <td style="width:20%;">
                    <strong>Código:</strong>
                </td>
                <td style="width:20%;" colspan="3">
                    {{Servicio.REM_CODIGO}}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Dirección:</strong>
                </td>
                <td>
                    {{Servicio.REM_DIRECCION}}
                </td>
                <td>
                    <strong>Departamento:</strong>
                </td>
                <td style="width:20%;">
                    {{Servicio.REM_DPTO}}
                </td>
                <td style="width:20%;">
                    <strong>Municipio:</strong>
                </td>
                <td style="width:20%;">
                    {{Servicio.REM_MUNICIPIO}}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Teléfono:</strong>
                </td>
                <td colspan="6">
                    {{Servicio.REM_TELEFONO}}
                </td>
            </tr>
        </table>
        <!-- //////////////////////////////////////////////// -->
        <table id="table6">
            <tr>
                <td style="width:20%;">
                    <strong>Ubicacion de Paciente:</strong>
                </td>

                <td style="width:80%;">
                    {{Servicio.UBICACION_PACIENTE}}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Origen:</strong>
                </td>

                <td>
                    {{Servicio.ORIGEN}}
                </td>
            </tr>
        </table>

        <!-- //////////////////////////////////////////////// -->
        <table id="table7">
            <tr style="background-color: lightgray;">
                <td style="width:25%;text-align:center;">
                    <strong>CÓDIGO:</strong>
                </td>

                <td style="width:10%;text-align:center;">
                    <strong>CANTIDAD:</strong>
                </td>
                <td style="width:75%;text-align:center;">
                    <strong>DESCRIPCIÓN:</strong>
                </td>
            </tr>
            <tr ng-repeat="x in Servicio.Productos">
                <td>{{x.CODIGO}}</td>
                <td>{{x.CANTIDAD}}</td>
                <td>{{x.DESCRIPCION}}</td>
            </tr>
        </table>
        <!-- //////////////////////////////////////////////// -->
        <div width=100% style="font-size:10px; margin-top: 1.5em;">
            <span>
                Afiliado no cancela ningún valor por concepto de pago moderador o copago
            </span>
            <br>
            <span>
                Entrega número: {{Servicios.ENT_NUMERO}} Valida para reclamar servicios desde el {{Servicios.ENT_FECHA_INI}} y hasta el {{Servicios.ENT_FECHA_FINAL}} [AUTORIZACIÓN EN FORMATO PDF, VALIDA SIN SELLO NI FIRMA]
            </span>
        </div>
        <!-- //////////////////////////////////////////////// -->
        <table id="table8" style="width: 30%;border:1px solid black">
            <tr>
                <td style="width:25%;">
                    {{Servicio.PIE_NUMERO}}
                </td>

                <td style="width:10%;">
                    {{Servicio.PIE_CODIGO}}
                </td>
            </tr>
        </table>
        <!-- //////////////////////////////////////////////// -->
        <div style="width:100%;font-size:10px; margin-top: 4.5em;font-weight:600;">
            <div style="width:50%;text-align: center;float: left;">
                <span>
                    ________________________________________
                </span>
                <br>
                <span>
                    Firma Afiliado o Acudiente
                </span>
            </div>

            <div style="width:39%;font-weight:600;float: right;text-align: center;margin-right:4em">
                <table>
                    <tr>
                        <td></td>
                        <td>{{Servicio.PIE_EPS}}</td>
                    </tr>
                    <tr>
                        <td>Funcionario:</td>
                        <td>{{Servicio.PIE_FUNCIONARIO}}</td>
                    </tr>
                    <tr>
                        <td>Cargo o Actividad:</td>
                        <td>{{Servicio.PIE_CARGO}}</td>
                    </tr>
                </table>

            </div>
        </div>
    </div>
</body>

</html>