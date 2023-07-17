<?php 
  session_start();
  if (!isset($_SESSION['nombre'])) {
      header("Location: ../../../index.html");
  }
?>
<html ng-app="GenesisApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Acta de entrega</title>
<link rel="icon" href="../../../assets/images/icon.ico" />
<script src="../../../bower_components/angular/angular.js"></script>
<script src="../../../bower_components/jquery/dist/jquery.js"></script>
<script src="../../../scripts/controllers/consultaafiliados/soportes/CambioIPSController.js"></script>
<script src="../../../scripts/const/const.js"></script>
<script type="text/javascript" src="../../../js/ngStorage.js"></script>

</head>
<body ng-controller="CambioIPSController">

<table style="border-collapse: collapse; border: none; height: 39px;" width="672">
    <tbody>
        <tr style="page-break-inside: avoid; height: 7.15pt;">
            <!-- <td style="width: 143.688px; border: 1pt solid windowtext; padding: 0cm 3.5pt; height: 39px;" rowspan="4">&nbsp;</td> -->
            <td style="width: 143.688px; border: 1pt solid windowtext; padding: 0cm 3.5pt; height: 39px;" rowspan="4">&nbsp;
                <img src="cajacopi.jpg" alt="Logo" title="Logo" style="height: 50px;text-align: center;position: initial;">
            </td>
            <td style="width: 315.688px; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; padding: 0cm 3.5pt; height: 17px;"
                rowspan="2">
                <p style="text-align: center;"><strong><span style="font-size: 10.0pt; font-family: 'Arial',sans-serif;">FORMATO
                            SOLICITUD DE CAMBIO DE IPS</span></strong></p>
            </td>
            <td style="width: 180.688px; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; padding: 0cm 3.5pt; height: 7px;">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">C&oacute;digo: GMAI-FR-4</span></p>
            </td>
        </tr>
        <tr style="page-break-inside: avoid; height: 7.15pt;">
            <td style="width: 180.688px; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 3.5pt; height: 10px;">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">Versi&oacute;n: 4</span></p>
            </td>
        </tr>
        <tr style="page-break-inside: avoid; height: 11.75pt;">
            <td style="width: 315.688px; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 3.5pt; height: 22px;"
                rowspan="2">
                <p style="text-align: center; text-indent: 0cm; margin: 0cm 0cm 12.0pt 0cm;"><span style="font-size: 10.0pt; font-family: 'Arial',sans-serif;">PROCEDIMIENTO
                        DE INSCRIPCI&Oacute;N Y REGISTRO</span></p>
            </td>
            <td style="width: 180.688px; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 3.5pt; height: 11px;">
                <p style="text-indent: 0cm; margin: 0cm 0cm 12.0pt 0cm;"><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">Fecha:
                        Diciembre 2018.</span></p>
            </td>
        </tr>
        <tr style="page-break-inside: avoid; height: 11.5pt;">
            <td style="width: 180.688px; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 3.5pt; height: 11px;">
                <p style="text-indent: 0cm; margin: 0cm 0cm 12.0pt 0cm;"><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">Aprobado:
                        Representante de Calidad</span></p>
            </td>
        </tr>
    </tbody>
</table>
<p></p>
<table style="width: 508.65pt; border-collapse: collapse; border: none;" width="678">
    <tbody>
        <tr>
            <td style="width: 203.85pt; border: solid black 1.0pt; background: #D9D9D9; padding: 0cm 5.4pt 0cm 5.4pt;"
                width="272">
                <p style="text-align: center;"><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;"><strong>Nombre
                            del Solicitante</strong></span></p>
            </td>
            <td style="width: 55.1pt; border-top: solid black 1.0pt; border-left: none; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; background: #D9D9D9; padding: 0cm 5.4pt 0cm 5.4pt;"
                width="73">
                <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">Tipo
                            Doc.</span></strong></p>
            </td>
            <td style="width: 136.3pt; border: solid black 1.0pt; border-left: none; background: #D9D9D9; padding: 0cm 5.4pt 0cm 5.4pt;"
                width="182">
                <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">No
                            Documento</span></strong></p>
            </td>
            <td style="width: 4.0cm; border: solid black 1.0pt; border-left: none; background: #D9D9D9; padding: 0cm 5.4pt 0cm 5.4pt;"
                colspan="3" width="151">
                <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">Fecha
                            Solicitud</span></strong></p>
            </td>
        </tr>
        <tr>
            <td style="width: 203.85pt; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt; text-align: center; height: 2em;"
                width="272">
                <span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">{{info.NOMBRE}}&nbsp;</span>
            </td>
            <td style="width: 55.1pt; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; text-align: center;"
                width="73">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">{{info.TIPODOCUMENTO}}&nbsp;</span></p>
            </td>
            <td style="width: 136.3pt; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt; text-align: center;"
                width="182">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">{{info.DOCUMENTO}}&nbsp;</span></p>
            </td>
            <td style="width: 35.4pt; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; text-align: center;"
                width="47">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">{{dia}}&nbsp;</span></p>
            </td>
            <td style="width: 35.45pt; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; text-align: center;"
                width="47">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">{{mes}}&nbsp;</span></p>
            </td>
            <td style="width: 42.55pt; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt; text-align: center;"
                width="57">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">{{ano}}&nbsp;</span></p>
            </td>
        </tr>

        <tr>
            <td style="width: 203.85pt; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; background: #d9d9d9; padding: 0cm 5.4pt; text-align: center;"
                width="272">
                <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">Barrio
                        </span></strong></p>
            </td>
            <td style="width: 191.4pt; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; background: #d9d9d9; padding: 0cm 5.4pt; text-align: center;"
                colspan="2" width="255">
                <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">Direcci&oacute;n
                            Correspondencia</span></strong></p>
            </td>
            <td style="width: 4cm; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; background: #d9d9d9; padding: 0cm 5.4pt; text-align: center;"
                colspan="3" width="151">
                <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">Municipio</span></strong></p>
            </td>
        </tr>

        <tr>
            <td style="width: 203.85pt; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt; text-align: center; height:2em;"
                width="272">

                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">{{info.LOCALIDAD}}&nbsp;</span></p>
            </td>
            <td style="width: 191.4pt; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt; text-align: center;"
                colspan="2" width="255">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">{{info.DIRECCION}}&nbsp;</span></p>
            </td>
            <td style="width: 4cm; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt; text-align: center;"
                colspan="3" width="151">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">{{info.MUNICIPIO}}&nbsp;</span></p>
            </td>
        </tr>

        <tr>
            <td style="width: 203.85pt; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; background: #bfbfbf; padding: 0cm 5.4pt; text-align: center;"
                width="272">
                <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">Direcci&oacute;n
                            correo electr&oacute;nico</span></strong></p>
            </td>
            <td style="width: 191.4pt; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; background: #bfbfbf; padding: 0cm 5.4pt; text-align: center;"
                colspan="2" width="255">
                <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">Tel&eacute;fono
                            Celular</span></strong></p>
            </td>
            <td style="width: 4cm; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; background: #bfbfbf; padding: 0cm 5.4pt; text-align: center;"
                colspan="3" width="151">
                <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">Tel&eacute;fono
                            Fijo</span></strong></p>
            </td>
        </tr>

        <tr>
            <td style="width: 203.85pt; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt; text-align: center; height: 2em;"
                width="272">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;{{info.CORREO}}</span></p>
            </td>
            <td style="width: 191.4pt; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt; text-align: center;"
                colspan="2" width="255">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">{{info.TELEFONO}}&nbsp;</span></p>
            </td>
            <td style="width: 4cm; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt; text-align: center;"
                colspan="3" width="151">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">{{info.TELEFONO}}&nbsp;</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 258.95pt; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; background: #d9d9d9; padding: 0cm 5.4pt; text-align: center;"
                colspan="2" width="345">
                <p><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">IPS en la Cual se encuentra
                            Asignado</span></strong></p>
            </td>
            <td style="width: 249.7pt; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; background: #d9d9d9; padding: 0cm 5.4pt; text-align: center;"
                colspan="4" width="333">
                <p><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">IPS para la cual se desea
                            trasladar</span></strong></p>
            </td>
        </tr>
        <tr style="height: 21.95pt;">
            <td style="width: 258.95pt; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt; height: 21.95pt; text-align: center;"
                colspan="2" width="345">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;{{info.IPS}}</span></p>
            </td>
            <td style="width: 249.7pt; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt; height: 21.95pt; text-align: center;"
                colspan="4" width="333">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">{{ips.solicitada}}&nbsp;</span></p>
            </td>
        </tr>
    </tbody>
</table>
<strong><span style="font-size: 8.0pt; font-family: 'Arial',sans-serif;">Tipo de Documento: &nbsp;&nbsp;&nbsp;CC.</span></strong><span
    style="font-size: 8.0pt; font-family: 'Arial',sans-serif;"> Cedula &nbsp;&nbsp;&nbsp;&nbsp; <strong>RC</strong>.
    Registro Civil&nbsp;&nbsp; <strong>TI.</strong> Tarjeta de
    Identidad&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>CE.</strong> Cedula de Extranjer&iacute;a</span>
<table style="border-collapse: collapse; border: none;" width="678">
    <tbody>
        <tr>
            <td style="width: 203.85pt; border: solid black 1.0pt; background: #D9D9D9; padding: 0cm 5.4pt 0cm 5.4pt;"
                colspan="2" rowspan="2" width="272">
                <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">Nombre
                            Usuario / Afiliado</span></strong></p>
            </td>
            <td style="width: 155.95pt; border: solid black 1.0pt; border-left: none; background: #D9D9D9; padding: 0cm 5.4pt 0cm 5.4pt;"
                colspan="2" width="208">
                <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">Doc.
                            Identificaci&oacute;n</span></strong></p>
            </td>
            <td style="width: 63.8pt; border: solid black 1.0pt; border-left: none; background: #D9D9D9; padding: 0cm 5.4pt 0cm 5.4pt;"
                colspan="3" width="85">
                <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">Parentesco</span></strong></p>
            </td>
            <td style="width: 3.0cm; border: solid black 1.0pt; border-left: none; background: #D9D9D9; padding: 0cm 5.4pt 0cm 5.4pt;"
                colspan="2" width="113">
                <p style="text-align: center;"><strong><span style="font-size: 8.0pt; font-family: 'Arial',sans-serif;">Motivo
                            de Solicitud</span></strong></p>
            </td>
        </tr>
        <tr>
            <td style="width: 42.55pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; background: #D9D9D9; padding: 0cm 5.4pt 0cm 5.4pt;"
                width="57">
                <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">T.
                            Doc.</span></strong></p>
            </td>
            <td style="width: 4.0cm; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; background: #D9D9D9; padding: 0cm 5.4pt 0cm 5.4pt;"
                width="151">
                <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">Numero
                            Identificaci&oacute;n</span></strong></p>
            </td>
            <td style="width: 21.25pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; background: #D9D9D9; padding: 0cm 5.4pt 0cm 5.4pt;"
                width="28">
                <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">H</span></strong></p>
            </td>
            <td style="width: 21.25pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; background: #D9D9D9; padding: 0cm 5.4pt 0cm 5.4pt;"
                width="28">
                <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">C</span></strong></p>
            </td>
            <td style="width: 21.3pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; background: #D9D9D9; padding: 0cm 5.4pt 0cm 5.4pt;"
                width="28">
                <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">O</span></strong></p>
            </td>
            <td style="width: 42.5pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; background: #D9D9D9; padding: 0cm 5.4pt 0cm 5.4pt;"
                width="57">
                <p style="text-align: center;"><strong><span style="font-size: 7.0pt; font-family: 'Arial',sans-serif;">CD</span></strong></p>
            </td>
            <td style="width: 42.55pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; background: #D9D9D9; padding: 0cm 5.4pt 0cm 5.4pt;"
                width="57">
                <p style="text-align: center;"><strong><span style="font-size: 7.0pt; font-family: 'Arial',sans-serif;">IS</span></strong></p>
            </td>
        </tr>


        <tr style="height: 18.15pt; text-align: center;">
            <td style="width: 20.25pt; border-top: none; border-left: solid black 1.0pt; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;"
                width="27">
                <p style="text-align: center;">
                    <strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">1</span></strong>
                </p>
            </td>
            <td style="width: 183.6pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;"
                width="245">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;{{info.NOMBRE}}</span></p>
            </td>
            <td style="width: 42.55pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;"
                width="57">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">{{info.TIPODOCUMENTO}}&nbsp;</span></p>
            </td>
            <td style="width: 4.0cm; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;"
                width="151">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">{{info.DOCUMENTO}}&nbsp;</span></p>
            </td>
            <td style="width: 21.25pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;"
                width="28">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;{{info.PARENTESCO==2?'X':''}}</span></p>
            </td>
            <td style="width: 21.25pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;"
                width="28">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;{{info.PARENTESCO==1?'X':''}}</span></p>
            </td>
            <td style="width: 21.3pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;"
                width="28">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;{{info.PARENTESCO==3?'X':''}}</span></p>
            </td>
            <td style="width: 42.5pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;"
                width="57">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
            </td>
            <td style="width: 42.55pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;"
                width="57">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
            </td>
        </tr>
        

        <!-- <tr style="height: 18.15pt;">
    <td style="width: 20.25pt; border-top: none; border-left: solid black 1.0pt; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="27">
    <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">2</span></strong></p>
    </td>
    <td style="width: 183.6pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="245">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 42.55pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="57">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 4.0cm; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="151">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 21.25pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="28">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 21.25pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="28">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 21.3pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="28">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 42.5pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="57">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 42.55pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="57">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    </tr> -->
        <!-- <tr style="height: 18.15pt;">
    <td style="width: 20.25pt; border-top: none; border-left: solid black 1.0pt; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="27">
    <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">3</span></strong></p>
    </td>
    <td style="width: 183.6pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="245">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 42.55pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="57">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 4.0cm; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="151">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 21.25pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="28">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 21.25pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="28">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 21.3pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="28">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 42.5pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="57">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 42.55pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="57">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    </tr> -->
        <!-- <tr style="height: 18.15pt;">
    <td style="width: 20.25pt; border-top: none; border-left: solid black 1.0pt; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="27">
    <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">4</span></strong></p>
    </td>
    <td style="width: 183.6pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="245">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 42.55pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="57">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 4.0cm; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="151">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 21.25pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="28">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 21.25pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="28">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 21.3pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="28">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 42.5pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="57">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 42.55pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="57">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    </tr> -->
        <!-- <tr style="height: 18.15pt;">
    <td style="width: 20.25pt; border-top: none; border-left: solid black 1.0pt; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="27">
    <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">5</span></strong></p>
    </td>
    <td style="width: 183.6pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="245">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 42.55pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="57">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 4.0cm; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="151">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 21.25pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="28">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 21.25pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="28">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 21.3pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="28">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 42.5pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="57">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 42.55pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="57">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    </tr> -->
        <!-- <tr style="height: 18.15pt;">
    <td style="width: 20.25pt; border-top: none; border-left: solid black 1.0pt; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="27">
    <p style="text-align: center;"><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">6</span></strong></p>
    </td>
    <td style="width: 183.6pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="245">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 42.55pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="57">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 4.0cm; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="151">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 21.25pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="28">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 21.25pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid windowtext 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="28">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 21.3pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="28">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 42.5pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="57">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    <td style="width: 42.55pt; border-top: none; border-left: none; border-bottom: solid black 1.0pt; border-right: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 18.15pt;" width="57">
    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
    </td>
    </tr> -->
    </tbody>
</table>
<strong><span style="font-size: 8.0pt; font-family: 'Arial',sans-serif;">CD: </span></strong><span style="font-size: 8.0pt; font-family: 'Arial',sans-serif;">Cambio
    de Domicilio de Residencia&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>IS:
    </strong>Inconformada con el Servicio&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
    <strong>H:</strong> Hijo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>C:</strong> C&oacute;nyuge&nbsp;&nbsp;&nbsp;
    <strong>O:</strong> Otro</span>
<table style="width: 508.65pt; border-collapse: collapse; border: none;" width="678">
    <tbody>
        <tr>
            <td style="width: 508.65pt; border: solid black 1.0pt; background: #D9D9D9; padding: 0cm 5.4pt 0cm 5.4pt;"
                width="678">
                <p><strong><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">Observaci&oacute;n: (Motivo
                            por el cual solicita el cambio de la IPS de primer nivel de atenci&oacute;n)</span></strong></p>
            </td>
        </tr>
        <tr style="height: 17.1pt;">
            <td style="width: 508.65pt; border: solid black 1.0pt; border-top: none; padding: 0cm 5.4pt 0cm 5.4pt; height: 17.1pt;"
                width="678">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
            </td>
        </tr>
        <tr style="height: 17.1pt;">
            <td style="width: 508.65pt; border: solid black 1.0pt; border-top: none; padding: 0cm 5.4pt 0cm 5.4pt; height: 17.1pt;"
                width="678">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
            </td>
        </tr>
        <tr style="height: 17.1pt;">
            <td style="width: 508.65pt; border: solid black 1.0pt; border-top: none; padding: 0cm 5.4pt 0cm 5.4pt; height: 17.1pt;"
                width="678">
                <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></p>
            </td>
        </tr>
    </tbody>
</table>
<table>
    <tbody>
        <tr>
            <td style="vertical-align: top;" width="311">
                &nbsp;</td>
        </tr>
    </tbody>
</table>
<table style="width: 508.65pt; border-collapse: collapse; border: none;" width="678">
    <tbody>
        <tr style="height: 52.7pt;">
            <td style="width: 274.75pt; border: solid black 1.0pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 52.7pt;" width="366">
            <p style="text-align: center;position: absolute;left: 7em;"><strong><span style="font-size: 8.0pt; font-family: 'Arial',sans-serif;">Firma
                            de Quien Recibe la Solicitud</span></strong></p>
            </td>
            <td style="width: 233.9pt; border: solid black 1.0pt; border-left: none; padding: 0cm 5.4pt 0cm 5.4pt; height: 52.7pt;"
                width="312">
                
                <p style="text-align: right;"><strong><span style="font-size: 8.0pt; font-family: 'Arial',sans-serif;">Fecha
                            de Recibido:&nbsp; <span style="color: gray;">DIA&nbsp; / MES&nbsp; / A&Ntilde;O</span>
                        </span></strong></p>
                <p style="text-align: center; margin-top:40px"><strong><span style="font-size: 8.0pt; font-family: 'Arial',sans-serif;">Firma
                            de Quien Realiza la Solicitud</span></strong></p>
            </td>
        </tr>
    </tbody>
</table>
<p style="text-align: center;"><strong><span style="font-size: 8.0pt; font-family: 'Arial',sans-serif;">&nbsp;</span></strong></p>


</body>
</html>