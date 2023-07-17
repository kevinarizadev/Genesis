<?php 
  session_start();
  if (!isset($_SESSION['nombre'])) {
      header("Location: ../../../index.html");
  }
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <title>Certificado de Afiliación</title>
   <link rel="icon" href="../../../assets/images/icon.ico" />
   <script src="../../../bower_components/angular/angular.js"></script>
   <script src="../../../bower_components/jquery/dist/jquery.js"></script>
   <script src="../../../scripts/controllers/consultaafiliados/soportes/cert_beneficiariomovilidadcontroller.js"></script>
   <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
<link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
</head>
<style type="text/css">
   body{
      font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
      font-size: 15px;
   }
   table {
      border-collapse: collapse;
      font-size: 12px;
   }
   table, th, td {
      text-align: center;
      border: 1px solid black;
   }
   td{
      padding: 2px 4px 2px 4px;
      
   }
   thead{
      font-weight: bold;
   }
   .subraya{
      text-decoration: underline;
      font-size:15px;
      font-weight: bold;
   }
</style>
<body ng-controller="cert_beneficiariomovilidadcontroller">
   <div style="float:right;">
   <img src="../../../assets/images/logo_horizontal.png" alt="" width="300px"  /></p>
   <strong style="font-size: x-small;">CAJA DE COMPENSACIÓN FAMILIAR DEL ATLÁNTICO </strong>
   <br><strong style="font-size: x-small;">N I T.  8 9 0 1 0 2 0 4 4 - 1</strong>
</div>

<div style="padding-top: 170px;" >
   <center><p style="font-size: 25px;">CERTIFICADO DE AFILIACION</p></center>
   <center>
      <div style="text-align: justify; font-size: 15px;">
         <p>Que, el usuario (a) {{NOMBRE}}, identificado(a) con {{p_tipo}} número {{id}}, aparece registrado (a) con la siguiente información:</p>
      </div>
   </center>
   <br>
   <p class="subraya">Información del Beneficiario:</p>
   <table>
      <thead>
         <td>TIPO DE AFILIADO</td>
         <td>REGIMEN</td>
         <td>NOMBRE</td>
         <td>TIPO ID</td>
         <td>NUMERO ID</td>
         <td>FECHA AFILIACION</td>
         <td>FECHA RETIRO</td>
         <td>PARENTESCO</td>
         <td>ESTADO</td>
      </thead>
      <tr ng-repeat="b in ben">
         <td>BENEFICIARIO</td>
         <td>CONTRIBUTIVO</td>
         <td>{{b.nombre_completo}}</td>
         <td>{{b.tipo_documento}}</td>
         <td>{{b.documento}}</td>
         <td>{{b.fechaafiliacion}}</td>
         <td>{{b.fecha_retiro}}</td>
         <td>{{b.parentesco}}</td>
         <td>{{b.estado}}</td>
      </tr>
   </table>
   <br>
   <p class="subraya">Información del Cotizante:</p>
   <table>
      <thead>
         <td>TIPO DE AFILIADO</td>
         <td>REGIMEN</td>
         <td>NOMBRE</td>
         <td>TIPO ID</td>
         <td>NUMERO ID</td>
         <td>FECHA AFILIACION</td>
         <td>FECHA RETIRO</td>
         <td>ESTADO</td>
      </thead>
      <tr>
         <td>COTIZANTE</td>
         <td>CONTRIBUTIVO</td>
         <td>{{NOMBRE}}</td>
         <td>{{TIPOID}}</td>
         <td>{{NUMID}}</td>
         <td>{{F_AFILIACION}}</td>
         <td>{{F_RETIRO}}</td>
         <td>{{ESTADO}}</td>
      </tr>
   </table>
   <br>
   <div style="text-align: justify; font-size: 14px">
      En constancia se firma y expide en Barranquilla a los {{dia}} días del mes de {{mes}} de {{anno}}, a solicitud del interesado.
      <br><br><br>
      <p>Atentamente,</p>
      <img src="../../../images/firma_elkin.png" style="width: 108px; z-index: 999999; position: absolute;">
      <p style="padding-top: 76px;">
      <br/><strong>SUBDIRECCION NACIONAL DE REGIMEN CONTRIBUTIVO</strong><br/>Generado Por: {{usuariogenera}}</p>
   </div>
   <div style="margin-top: 35px;">
      <p align="center" style="color: gray; font-weight: bold;">INFORMACIÓN NO VALIDA PARA TRASLADO ENTRE EPS</p>
      <br>
      <p align="center">Sede  Nacional: Calle 44 No. 46 - 56<br />
         www.cajacopieps.com<br />
         Línea  gratuita 01-8000-111446<br />
         Barranquilla – Colombia</p>
      <p><img src="supersalud.jpg" alt="" width="148" height="43" /></p>
      <p align="center">&nbsp;</p>
   </div>
</div>
</body>
</html>
