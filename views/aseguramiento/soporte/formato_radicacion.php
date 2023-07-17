<?php
session_start();
if (!isset($_SESSION['nombre'])) {
    header("Location: ../../../index.html");
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Información de Empresa</title>
    <link rel="icon" href="../../../assets/images/icon.ico" />
    <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
    <style type="text/css">
        table,
        th,
        td {
            border: 1px solid black;
            border-collapse: collapse;
            font-family: 'Open Sans', sans-serif;
            font-size: 12px;
        }

        td {
            padding: 2px;
            text-align: left;
            height: 9px;
            font-weight: 600;
        }

        th {

            text-align: center;
        }

        .respo {
            text-align: center;
            font-weight: 300;
        }
    </style>
    <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
    <script src="../../../bower_components/angular/angular.js"></script>
    <script src="../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../scripts/controllers/aseguramiento/liquidacion_soporteController.js"></script>
</head>

<body ng-controller="liquidacion_soporteController" >
    <table width="100%">
        <tr>
            <th style="width: 15%"><img src="https://genesis.cajacopieps.com//assets/images/cajacopi.png " width=100px;></th>
            <th>RADICADO SOLICITUD DE RECONOCIMIENTO DE PRESTACIONES ECONOMICA
                RECONOCIMIENTO SUJETO AL PLENO DE LOS REQUISITOS ESTABLECIDOS POR LA LEY</th>
        </tr>
    </table>

    <table style="width: 100%;">
        <tr>
            <th style="  text-align: center;  width: 25%;">Fecha y Hora Radicacion:</th>
            <th class="respo" style=" width: 25%;  text-align: center;  ">{{impresion.fecha_hora_radicado}}</th>
            <td style="  width: 25%; text-align: center;  ">Numero Radicado:</td>
            <td class="respo" style="   width: 25%;text-align: center;  ">{{impresion.radicado}}</td>
        </tr>
    </table>

    <table style="width: 100%;">
        <tr>
            <th colspan="8" style=" width: 100% text-align: center;  ">Datos de Aportante y/o Cotizante Independiente</th>
        </tr>
        <tr>
            <th colspan="2" style=" width: 25%; text-align: center;  ">Razon Social:</th>
            <th colspan="2" class="respo" style="  width: 25%;  text-align: center;  ">{{impresion.nombre_empleador}}</th>
            <td colspan="2" style=" width: 25%;  text-align: center;  ">Tipo y Numero Documento:</td>
            <td colspan="2" class="respo" style="  width: 25%;  text-align: center;  ">{{impresion.tipo_doc_empleador}} - {{impresion.tercero}}</td>
        </tr>
        <tr>
            <th style=" width: 12.5%; text-align: center;  ">Dirección:</th>
            <th class="respo" style=" width: 12.5%;  text-align: center;  ">{{impresion.direccion_empleador}}</th>
            <td style=" width: 12.5%; text-align: center;  ">Ciudad:</td>
            <td class="respo" style=" width: 12.5%; text-align: center;  ">{{impresion.ubicacion_empleador}}</td>
            <th style="width: 12.5%; text-align: center;  ">Celular:</th>
            <th class="respo" style=" width: 12.5%; text-align: center;  ">{{impresion.telefono_empleador}}</th>
            <td style="width: 12.5%;  text-align: center;  ">Email:</td>
            <td class="respo" style=" width: 12.5%; text-align: center;  ">{{impresion.email_empleador}}</td>
        </tr>
    </table>

    <table style="width: 100%;">
        <tr>
            <th colspan="8" style=" width: 100% text-align: center;  ">Datos de la prestacion economica radicada</th>
        </tr>
        <tr>
            <th colspan="2" style="text-align: center;  width: 25%; ">Tipo y Número Documento Cotizante:</th>
            <th colspan="2" class="respo" style="  text-align: center; width: 25%;  ">{{impresion.documento}}</th>
            <td colspan="2" style=" text-align: center; width: 25%;  ">Nombres y Apellidos:</td>
            <td colspan="2" class="respo" style="  text-align: center;  width: 25%; ">{{impresion.nombre}}</td>
        </tr>
        <tr>
            <th colspan="2" style="text-align: center; width: 25%;  ">Tipo Prestacion:</th>
            <th colspan="2" class="respo" style="  text-align: center; width: 25%;  ">{{impresion.concepto_nombre}}</th>
            <td style=" text-align: center;  width: 12.5%; ">Fecha Inicio:</td>
            <td class="respo" style="  text-align: center;  width: 12.5%; ">{{impresion.fecha_incapacidad | date : "y-MM-dd"}}</td>
            <th style="text-align: center;   width: 12.5%;">Fecha Fin:</th>
            <th class="respo" style="  text-align: center;   width: 12.5%;">{{impresion.fecha_final_incapacidad}}</th>
        </tr>
        <!-- <th style="text-align: center; width: 50%;  ">Nombre del diagnostico</th>
            <th class="respo" style="  text-align: center; width: 25%;  ">{{impresion.nombre_diagnostico}}*</th> -->
            
        <tr>
            
        </tr>
    </table>

    <table style="width: 100%;">
        <tr>
            <th style="width: 100%;text-align:left;" ><strong>Nombre del diagnostico:</strong> <span style=" font-weight: 300;">{{impresion.nombre_diagnostico}}*</span></th>
        </tr>
    </table>

    <table style="width: 100%;">
        <tr>
            <th style="width: 100%;text-align:left;" ><strong>Nota:</strong> <span style=" font-weight: 300;">*El Diagnóstico relacionado en el presente documento está sujeto a Revisión y/o Auditoría Médica, el cual podría modificarse de acuerdo al resultado de la misma.</span></th>
        </tr>

    </table>


    <table style="width: 100%;">
        <tr>
            <th style="width: 100%; text-align:left; border:0">Observacion:</th>
        </tr>
        <tr>
            <th style="width: 100%; padding-top: 35px;border:0"></th>
        </tr>
    </table>

    <table style="width: 100%;">
        <tr>
            <th style="width: 100%;text-align:left;" ><strong>Generado Por:</strong> <span style=" font-weight: 300;"> {{nombre_funcionario}}</span></th>
        </tr>
        <tr>
        <th class="respo" style="width: 100%;text-align:justify;border:0; font-size:9px">Señor Aportante!!! Le recordamos que este tramite muy pronto lo podrá realizar por nuestra oficina virtual. Lo invitamos a registrarse y actualizar su datos en el link www.cajacopieps.com/genesis opción Empresas.  Para mayor informacion nuestra linea de atención www.cajacopieps.com/contactos-de-movilidad</th>
        </tr>
        <tr>
        <th class="respo" style="width: 100%;text-align:justify;border:0; font-size:9px">Decreto 1333 del 2018 Artículo 2.2.3.1.1. Pago de prestaciones económicas. A partir de la fecha de entrada en vigencia de las cuentas maestras de recaudo los aportantes y trabajadores independientes no podrán deducir de las cotizaciones en salud los valores correspondientes a incapacidades por enfermedad general y licencias de maternidad y/o paternidad. El pago de estas prestaciones económicas al aportante será realizado directamente por la EPS y EOC, a través de reconocimiento directo o transferencia electrónica en un plazo no mayor a cinco (5) días hábiles contados a partir de la autorización de la prestación económica por parte de la EPS o EOC. La revisión y liquidación de las solicitudes de reconocimiento de prestaciones económicas se efectuará dentro de los quince (15) días hábiles siguientes a la solicitud del aportante. En todo caso, para la autorización y pago de las prestaciones económicas, las EPS y las EOC deberán verificar la cotización al Régimen Contributivo del SGSSS, efectuada por el aportante beneficiario de las mismas.</th>
        </tr>
    </table>

</body>

</html>