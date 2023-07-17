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
    <title>Formato de Transcripciones</title>
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
            <th rowspan="4" style="width: 15%"><img src="https://genesis.cajacopieps.com/assets/images/logo_cajacopieps.png " width=100px;></th>
            <th rowspan="2" colspan="2">FORMATO PARA CERTIFICACION DE TRANSCRIPCIONES</th>
        </tr>
        <tr>
        </tr>
        <tr>
            <th colspan="2">INCAPACIDADES Y LICENCIAS DE MATERNIDAD Y PATERNIDAD (LM)</th>
        </tr>
    </table>

    <table style="width: 100%;">
        <tr>
            <th style=" width: 12.5%; text-align: center;  ">Fecha:</th>
            <th class="respo" style=" width: 12.5%;  text-align: center;  ">{{impresion.fecha_hora_radicado}}</th>
            <td style=" width: 12.5%; text-align: center;  ">Ciudad:</td>
            <td class="respo" style=" width: 12.5%; text-align: center;  ">{{impresion.ciudad_afiliado}}</td>
            <th colspan="2"  style="width: 12.5%; text-align: center;  ">Numero incapacidades:</th>
            <th colspan="2" class="respo" style=" width: 12.5%; text-align: center;  ">{{impresion.radicado}}</th>
            
        </tr>
        <tr>
            <th colspan="1" style=" text-align: center;  ">Nombre y Apellido</th>
            <td colspan="2" class="respo" style="  text-align: center;  width: 25%; ">{{impresion.nombre}}</td>
            <th colspan="1" style=" text-align: center;  ">Documento de Identidad</th>
            <td colspan="2" class="respo" style="  text-align: center;  width: 25%; ">{{impresion.tipo_documento}} -- {{impresion.documento}}</td>
            <th colspan="1" style=" text-align: center;  ">Genero</th>
            <td colspan="1" class="respo" style="  text-align: center;  width: 25%; ">{{impresion.sexo_nombre}}</td>
        </tr>
        <tr>
            <th colspan="2" style=" width: 25%; text-align: center;  ">Dirreccion de residencia</th>
            <th colspan="2" class="respo" style="  width: 25%;  text-align: center;  ">{{impresion.direccion_afiliado}}</th>
            <td colspan="2" style=" width: 25%;  text-align: center;  ">Telefono de residencia</td>
            <td colspan="2" class="respo" style="  width: 25%;  text-align: center;  ">{{impresion.nit}}</td>
        </tr>
        <tr>
            <th style=" width: 12.5%; text-align: center;  ">Empresa</th>
            <th class="respo" style=" width: 12.5%;  text-align: center;  ">{{impresion.nombre_empleador}}</th>
            <td style=" width: 12.5%; text-align: center;  ">Telefono Empresa</td>
            <td class="respo" style=" width: 12.5%; text-align: center;  ">{{impresion.telefono_empleador}}</td>
            <th style="width: 12.5%; text-align: center;  ">Documento de Empresa</th>
            <th class="respo" style=" width: 12.5%; text-align: center;  ">{{impresion.tipo_doc_empleador}}--{{impresion.tercero}}</th>
            <td style="width: 12.5%;  text-align: center;  ">Dirrección de Empresa</td>
            <td class="respo" style=" width: 12.5%; text-align: center;  ">{{impresion.direccion_empleador}}</td>
        </tr>
        <tr>
            <th colspan="2" style=" text-align: center;  ">PRORROGA</th>
            <th colspan="2" class="respo" style="  text-align: center;  ">{{(impresion.prec_prorroga=='S')?'SI':'NO'}}</th>
            <td colspan="2" style=" text-align: center;  ">IPS</td>
            <td colspan="2" class="respo" style=" text-align: center;  ">{{impresion.nombre_ips}}</td>
        </tr>
        <tr>
            <th colspan="2" style=" text-align: center;  ">CODIGO DE DIAGNOSTICO</th>
            <th colspan="2" class="respo" style="  text-align: center;  ">{{impresion.codigo_diagnostico}}</th>
            <td colspan="2" style=" text-align: center;  ">CODIGO REPS</td>
            <td colspan="2" class="respo" style=" text-align: center;  ">{{impresion.cod_habilitacion_ips}}</td>
        </tr>
    </table>

    <table style="width: 100%;">
        <!-- <tr>
            <th colspan="4" style=" width: 50%; text-align:center;">DIAGNOSTICO RELACIONAL</th>
            <th colspan="4" style=" width: 50%; text-align:center;">{{impresion.nombre_diagnostico}}</th> -->

            <th colspan="2" style="text-align: center;    width: 50%;">DIAGNOSTICO RELACIONAL</th>
            <th colspan="2" class="respo" style="  text-align: center;   width: 50%; ">{{impresion.nombre_diagnostico}}</th>


        </tr>
     
        <tr>
            <th colspan="2" style="text-align: center;    width: 50%;">Grupo de servicio</th>
            <th colspan="2" class="respo" style="  text-align: center;   width: 50%; ">{{impresion.grupo_servicio}}</th>
      
        </tr>
        <tr>
            <th colspan="2" style="text-align: center;   ">Modalidad de la prestación del servicio </th>
            <th colspan="2" class="respo" style="  text-align: center;   ">{{impresion.mod_prestacion_servicio}}</th>
         
        </tr>
        <tr>
            <th colspan="2" style="text-align: center;   ">Incapacidad Retroactiva</th>
            <th colspan="2" class="respo" style="  text-align: center;   ">{{impresion.incapacidad_retroactiva}}</th>
         

    </table>





    <table style="width: 100%;">
        <tr>
            <th style=" width: 12.5%; text-align: center;  ">Fecha:</th>
            <th class="respo" style=" width: 12.5%;  text-align: center;  ">{{impresion.fecha_hora_radicado}}</th>
            <td style=" width: 12.5%; text-align: center;  ">Ciudad:</td>
            <td class="respo" style=" width: 12.5%; text-align: center;  ">{{impresion.ciudad_afiliado}}</td>
            <th colspan="2"  style="width: 12.5%; text-align: center;  ">Numero incapacidades:</th>
            <th colspan="2" class="respo" style=" width: 12.5%; text-align: center;  ">{{impresion.radicado}}</th>
            
        </tr>
        <tr>
            <th colspan="1" style=" text-align: center;  ">Nombre y Apellido</th>
            <td colspan="2" class="respo" style="  text-align: center;  width: 25%; ">{{impresion.nombre}}</td>
            <th colspan="1" style=" text-align: center;  ">Documento de Identidad</th>
            <td colspan="2" class="respo" style="  text-align: center;  width: 25%; ">{{impresion.tipo_documento}} -- {{impresion.documento}}</td>
            <th colspan="1" style=" text-align: center;  ">Genero</th>
            <td colspan="1" class="respo" style="  text-align: center;  width: 25%; ">{{impresion.sexo_nombre}}</td>
        </tr>
        <tr>
            <th colspan="2" style=" width: 25%; text-align: center;  ">Dirreccion de residencia</th>
            <th colspan="2" class="respo" style="  width: 25%;  text-align: center;  ">{{impresion.direccion_afiliado}}</th>
            <td colspan="2" style=" width: 25%;  text-align: center;  ">Telefono de residencia</td>
            <td colspan="2" class="respo" style="  width: 25%;  text-align: center;  ">{{impresion.nit}}</td>
        </tr>
        <tr>
            <th style=" width: 12.5%; text-align: center;  ">Empresa</th>
            <th class="respo" style=" width: 12.5%;  text-align: center;  ">{{impresion.nombre_empleador}}</th>
            <td style=" width: 12.5%; text-align: center;  ">Telefono Empresa</td>
            <td class="respo" style=" width: 12.5%; text-align: center;  ">{{impresion.telefono_empleador}}</td>
            <th style="width: 12.5%; text-align: center;  ">Documento de Empresa</th>
            <th class="respo" style=" width: 12.5%; text-align: center;  ">{{impresion.tipo_doc_empleador}}--{{impresion.tercero}}</th>
            <td style="width: 12.5%;  text-align: center;  ">Dirrección de Empresa</td>
            <td class="respo" style=" width: 12.5%; text-align: center;  ">{{impresion.direccion_empleador}}</td>
        </tr>

    </table>

    <table style="width: 100%;">
        <tr>
            <th colspan="8" style=" width: 100%; text-align:center;">ORIGEN DE INCAPACIDAD O LICENCIA</th>
        </tr>
        <tr>
            <th colspan="4" style="text-align: center;   ">INCAPACIDAD</th>
            <td colspan="4" style=" text-align: center;  ">LICENCIA</td>
        </tr>
        <tr>
            <th colspan="2" style="text-align: center;    width: 25%;">Enfermedad Profesional</th>
            <th colspan="2" class="respo" style="  text-align: center;   width: 25%; ">{{impresion.concepto=='EP'?'X':''}}</th>
            <td rowspan="5" style=" text-align: center;   width: 12.5%;">Licencias de Maternidad</td>
            <th style="text-align: center;  width:25%; ">Parto Termino</th>
            <th class="respo" style="  text-align: center;  width: 12.5%; "></th>
        </tr>
        <tr>
            <th colspan="2" style="text-align: center;   ">Accidente de Trabajo</th>
            <th colspan="2" class="respo" style="  text-align: center;   ">{{impresion.concepto=='AT'?'X':''}}</th>
            <th style="text-align: center;  ">Parto Prematuro</th>
            <th class="respo" style="  text-align: center;  "></th>
        </tr>
        <tr>
            <th colspan="2" style="text-align: center;   ">Enfermedad General</th>
            <th colspan="2" class="respo" style="  text-align: center;   ">{{impresion.concepto=='EG'?'X':''}}</th>
            <th style="text-align: center;  ">Parto Multiple</th>
            <th class="respo" style="  text-align: center;  "></th>
        </tr>
        <tr>
            <th colspan="2" rowspan="3" style="text-align: center;   ">Accidente de Transito</th>
            <th colspan="2" rowspan="3" class="respo" style="  text-align: center;   ">{{impresion.concepto=='TT'?'X':''}}</th>
            <th style="text-align: center;  ">Parto Multiple y Prematuro</th>
            <th  style="  text-align: center;  "></th>
        </tr>
        <tr>
            <th  style="  text-align: center;   ">Aborto</th>
            <th colspan="2" style="text-align: center;"></th>
        </tr>
        <tr>
            <th  style="  text-align: center;   ">Licencia de Paternidad</th>
            <th colspan="3" style="text-align: center;  ">{{impresion.concepto=='LP'?'X':''}}</th>
        </tr>
    </table>
    <table style="width: 100%;">
        <tr>
            <th style=" width: 12.5%; text-align: center;  ">Días totales otorgados:</th>
            <th colspan="7" class="respo" style=" text-align: center;  ">{{impresion.duracion_letras}}</th>
            
        </tr>
        <tr>
            <th  style=" text-align: center;  width: 12.5%;">Fecha de Inicio</th>
            <td  class="respo" style="  text-align: center;   width: 12.5%;">{{impresion.fecha_incapacidad   | date : "y-MM-dd"}}</td>
            <th  style=" text-align: center;  ">Fecha Final</th>
            <td  class="respo" style="  text-align: center;  width: 12.5%;">{{impresion.fecha_final_incapacidad}}</td>
            <th  style=" text-align: center; width: 12.5%; ">Fecha Probable de Parto</th>
            <td class="respo" style="  text-align: center;   width: 12.5%;">{{impresion.concepto=='LM'?impresion.probable_parto:''}}</td>
            <th  style=" text-align: center;  width: 12.5%;">MOTIVO</th>
            <td  style="  text-align: center;   width: 12.5%;"  class="respo">{{impresion.motivo_nombre}}</td>
        </tr>
        <tr>
            <th colspan="2" style=" text-align: center;  ">Nombre del Médico </th>
            <th colspan="2" class="respo" style="  text-align: center;  ">{{impresion.nombre_medico | uppercase}}</th>
            <!-- <td colspan="2" style=" text-align: center;  ">Registro del Médico</td> -->
            <td colspan="2" style=" text-align: center;  ">Tipo Y Numero del Documento del Medico</td>
            <td colspan="2" class="respo" style=" text-align: center;  ">{{impresion.doc_medico}}</td>
        </tr>
    </table>

    <table style="width: 100%;">
        <tr>
            <th style="width: 50%;text-align:left;" ><strong>Generado Por:</strong> <span style=" font-weight: 300;"> {{nombre_funcionario}}</span></th>
              <th style="width: 50%;text-align:left;" ><strong>Fecha de Impresion </strong> <span style=" font-weight: 300;"> {{hoy  | date: "dd/MM/yyyy  hh:mm:ss"}}</span></th>
        </tr>
    <table style="width: 100%;">
        <tr>
            <th style="width: 50%; text-align:center;     height: 10em;border-bottom: 0px;"></th>
            <th style="width: 50%; text-align:center;     height: 10em;border-bottom: 0px;"><img src="firma_diana_matilde.png" ng-if="doc_funcionario == '22651452'"></th>
        </tr>
        <tr>
            <th style="width: 50%; text-align:center; border-top: 0px;">SUBDIRECION NACIONAL DE SERVICIOS DE SALUD</th>
            <th style="width: 50%; text-align:center; border-top:0">{{cargo}}</th>
        </tr>
    </table>


</body>

</html>