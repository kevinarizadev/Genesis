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
<script src="../../../scripts/controllers/consultaafiliados/soportes/SolicitudPortabilidad.js"></script>
<script src="../../../scripts/const/const.js"></script>
<script type="text/javascript" src="../../../js/ngStorage.js"></script>

</head>
<body ng-controller="SolicitudPortabilidad">
    <table style="border-collapse: collapse; border: none; height: 39px;" width="678">
        <tbody>
            <tr style="page-break-inside: avoid; height: 7.15pt;">
                <!-- <td style="width: 143.688px; border: 1pt solid windowtext; padding: 0cm 3.5pt; height: 39px;" rowspan="4">&nbsp;</td> -->
                <td style="width: 143.688px; border: 1pt solid windowtext; padding: 0cm 3.5pt; height: 39px;" rowspan="4">&nbsp;
                    <img src="cajacopi.jpg" alt="Logo" title="Logo" style="height: 50px;text-align: center;position: initial;">
                </td>
                <td style="width: 315.688px; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; padding: 0cm 3.5pt; height: 17px;"
                    rowspan="2">
                    <p style="text-align: center;"><strong><span style="font-size: 10.0pt; font-family: 'Arial',sans-serif;">FORMATO
                                SOLICITUD DE PORTABILIDAD</span></strong></p>
                </td>
                <td style="width: 180.688px; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; padding: 0cm 3.5pt; height: 7px;">
                    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">C&oacute;digo: GMAI-FR-005</span></p>
                </td>
            </tr>
            <tr style="page-break-inside: avoid; height: 7.15pt;">
                <td style="width: 180.688px; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 3.5pt; height: 10px;">
                    <p><span style="font-size: 9.0pt; font-family: 'Arial',sans-serif;">Versi&oacute;n: 2</span></p>
                </td>
            </tr>
            <tr style="page-break-inside: avoid; height: 11.75pt;">
                <td style="width: 315.688px; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 3.5pt; height: 22px;"
                    rowspan="2">
                    <p style="text-align: center; text-indent: 0cm; margin: 0cm 0cm 12.0pt 0cm;"><span style="font-size: 10.0pt; font-family: 'Arial',sans-serif;">
                            PROCEDIMIENTO PARA SOLICITUD Y TRAMITE DE PORTABILIDAD</span></p>
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
    <p style="margin-left: 30px;">Fecha de Solicitud
        <span style="border-bottom: 1px solid;padding: 0 15px;">
            {{dia}}-{{mes}}-{{ano}}
        </span>
    </p>
    <br>
    <table width="678" style="font-size: 11px;">
        <tr>
            <th style="border: 2px solid #111; padding: 3px">
                DATOS DE IDENTIFICACION
            </th>
        </tr>
    </table>
    <table width="678" style="font-size: 11px;border-spacing: 0px;margin: 30px 0;text-align: center;">
        <tr>
            <td></td>
            <td style="border: 1px solid #111; ">CC</td>
            <td style="border: 1px solid #111; ">{{datos.TIPODOCUMENTO=='CC'?'X':''}}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            
            <td>Tipo de Documento</td>
            <td style="border: 1px solid #111; ">TI</td>
            <td style="border: 1px solid #111; ">{{datos.TIPODOCUMENTO=='TI'?'X':''}}</td>
            <td style="padding-left: 5px">N°<span style="border-bottom: 1px solid;padding: 0 1px;">{{datos.DOCUMENTO}}</span></td>
            <td style="border: 2px solid #111; ">{{datos.PRIMER_NOMBRE}}</td>
            <td style="border: 2px solid #111; ">{{datos.SEGUNDO_NOMBRE}}</td>
            <td style="border: 2px solid #111; ">{{datos.PRIMER_APELLIDO}}</td>
            <td style="border: 2px solid #111; ">{{datos.SEGUNDO_APELLIDO}}</td>
        </tr>
        <tr>
            <td></td>
            <td style="border: 1px solid #111; ">RC</td>
            <td style="border: 1px solid #111;">{{datos.TIPODOCUMENTO=='RC'?'X':''}}</td>
            <td></td>
            <td style="text-align: left;padding-right: 14px;">Primer Nombre</td>
            <td style="text-align: left;padding-right: 14px;">Segundo Nombre</td>
            <td style="text-align: left;padding-right: 14px;">Primer Apellido</td>
            <td style="text-align: left;padding-right: 14px;">Segundo Apellido</td>
        </tr>
    </table>
    <table width="678" style="font-size: 11px;">
        <tr>
            <th style="border: 2px solid #111; padding: 3px">
                DATOS DE AFILIACION INICIAL (AFILIACION ACTUAL)
            </th>
        </tr>
    </table>
    <table width="678" style="font-size: 11px;border-spacing: 0px;margin: 30px 0;text-align: center;">
            <tr>
                <td style="border: 2px solid #111; ">{{datos.MUNICIPIO}}</td>
                <td style="border: 2px solid #111; ">{{datos.DEPARTAMENTO}}</td>
                <td style="border: 2px solid #111; ">{{datos.DIRECCION}}</td>
                <td style="border: 2px solid #111; ">{{datos.CELULAR}}</td>
                <td style="border: 2px solid #111; ">{{datos.CORREO}}</td>
            </tr>
            <tr>
                <td style="padding-right: 14px;">Municipio de Afiliación</td>
                <td style="padding-right: 14px;">Departamento de Afiliación</td>
                <td style="padding-right: 14px;">Dirección</td>
                <td style="padding-right: 14px;">Telefono</td>
                <td style="padding-right: 14px;">Correo Electrónico</td>
            </tr>
    </table>

    <table width="678" style="font-size: 11px;">
        <tr>
            <th style="border: 2px solid #111; padding: 3px">
                DATOS PARA PORTABILIDAD (AFILIACION A REALIZAR)
            </th>
        </tr>
    </table>
    <table width="678" style="font-size: 11px;border-spacing: 0px;margin: 30px 0;text-align: center;">
        <tr>
            <td style="border: 2px solid #111;padding: 8px;"></td>
            <td style="border: 2px solid #111;padding: 8px;"></td>
            <td style="border: 2px solid #111;padding: 8px; "></td>
            <td style="border: 2px solid #111;padding: 8px;"></td>
            <td style="border: 2px solid #111;padding: 8px; "></td>
        </tr>
        <tr>
            <td style="padding-right: 14px;">Municipio de Afiliación</td>
            <td style="padding-right: 14px;">Departamento de Afiliación</td>
            <td style="padding-right: 14px;">Direccion</td>
            <td style="padding-right: 14px;">Telefono</td>
            <td style="padding-right: 14px;">Correo Electrónico</td>
        </tr>
    </table>
    <table width="678" style="font-size: 11px; margin-bottom: 30px">
        <tr>
            <th style="border: 2px solid #111;">Tiempo de la Portabilidad</th>
            <th>Emigracion Ocasional (menos de 1 mes en municipio receptor)</th>
            <th style="border: 2px solid #111;  padding:10px;"></th>
            <th>Emigracion Temporal (1 mes a 12 meses)</th>
            <th style="border: 2px solid #111;  padding:10px;"></th>
            <th>Emigracion Permanente (mayor a 12 meses)</th>
            <th style="border: 2px solid #111;  padding:10px;"></th>
            <th >No sabe</th>
            <th style="border: 2px solid #111;  padding:10px;"></th>
        </tr>
    </table style="">
    <table width="678" style="font-size: 10px;margin-bottom: -5PX;">
        <tr>
            <th style="border: 2px solid #111; padding: 3px">
                DATOS PARA PORTABILIDAD (AFILIACION A REALIZAR)
            </th>
        </tr>
    </table>
    <table style="font-size: 10px; border-spacing: 0px;text-align: center;    margin-left: 2px;
    width: 674px;">
        <tr style="border-spacing: 0px;">
            <td style="width: 335px;margin-right:10px ; border: 1px solid #111; ">
                <table width="" style="font-size: 11px;">
                    <tr>
                        <th>
                            INFORMACION IPS EN LA QUE ESTABA ASIGNADO(A)
                        </th>
                    </tr>
                </table>
                <table style="font-size: 11px;border-top: 1px solid;padding-top: 9px;">
                    <tr style="border-spacing: 100px; text-align: center;">
                        <th style="border-bottom: 1px solid;padding: 0 15px;width: 226px;">{{datos.IPS}}</th>
                        <td style=" padding:10px;"></td>
                        <th style="border-bottom: 1px solid;padding: 0 15px;width: 70px;">{{datos.UBICACION_IPS}}</th>
                    </tr>
                    <tr style="text-align: center">
                        <td>Nombre</td>
                        <td style=" padding:10px;"></td>
                        <td>Ciudad</td>
                    </tr>
                </table>
                <table style="font-size: 11px;">
                    <tr style="border-spacing: 100px; text-align: center">
                        <th style="border-bottom: 1px solid;padding: 0 15px;width: 226px;">{{datos.DIRECCION_IPS}}</th>
                        <td style=" padding:10px;"></td>
                        <th style="border-bottom: 1px solid;padding: 0 15px;width: 70px;">{{datos.TELEFONO_IPS}}</th>
                    </tr>
                    <tr style="text-align: center">
                        <td>Dirección</td>
                        <td style=" padding:10px;"></td>
                        <td>Telefono</td>
                    </tr>
                </table>
                <table style="font-size: 11px;">
                    <tr style="border-spacing: 100px; text-align: center">
                        <th style="border-bottom: 1px solid;padding: 0 15px; width: 180px;">{{datos.EMAIL_IPS}}</th>
                        <td style=" padding:10px;"></td>
                        <th></th>
                    </tr>
                    <tr style="text-align: center">
                        <td>Correo Electrónico</td>
                        <td></td>
                    </tr>
                </table>

            </td>
            <td style="width: 335px;border: 1px solid #111; ">
                <table width="" style="font-size: 11px;">
                    <tr>
                        <th>INFORMACION IPS RECEPTORA (NUEVA)</th>
                    </tr>
                </table>
                <table style="font-size: 11px;border-top: 1px solid; padding-top: 9px;" >
                    <tr style="border-spacing: 100px; text-align: center">
                        <th style="border-bottom: 1px solid;padding: 0 15px;width: 226px;"></th>
                        <td style=" padding:10px;"></td>
                        <th style="border-bottom: 1px solid;padding: 0 15px;width: 70px;"></th>
                    </tr>
                    <tr style="text-align: center">
                        <td>Nombre</td>
                        <td style=" padding:10px;"></td>
                        <td>Ciudad</td>
                    </tr>
                </table>
                <table style="font-size: 11px;">
                    <tr style="border-spacing: 100px; text-align: center">
                        <th style="border-bottom: 1px solid;padding: 0 15px;width: 226px;"></th>
                        <td style=" padding:10px;"></td>
                        <th style="border-bottom: 1px solid;padding: 0 15px;width: 70px;">
                    </th>
                    </tr>
                    <tr style="text-align: center">
                        <td>Dirección</td>
                        <td style=" padding:10px;"></td>
                        <td>Telefono</td>
                    </tr>
                </table>
                <table style="font-size: 11px;">
                    <tr style="border-spacing: 100px; text-align: center">
                        <th style="border-bottom: 1px solid;padding: 0 15px; width: 180px;"></th>
                        <td style=" padding:10px;"></td>
                        <th></th>
                    </tr>
                    <tr style="text-align: center">
                        <td>Correo Electrónico</td>
                        <td></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table width="670" style="margin: 20px 0 ;font-size: 11px;">
        <tr style="border-spacing: 100px; text-align: center">
            <th style="border-bottom: 1px solid;padding: 0 15px; width: 245px;"></th>
            <td style=" padding:10px;"></td>
            <td style=" padding-right:40px"></td>
            <th style="border-bottom: 1px solid;padding: 0 15px; width: 180px;"></th>
        </tr>
        <tr style="text-align: center">
            <td>Firma del Solicitante</td>
            <td style=" padding:10px;"></td>
            <td style=" padding-right:40px;"></td>
            <td>Firma del Represante de Cajacopi EPS en Portabilidad</td>
        </tr>
    </table>




</body>

</html>