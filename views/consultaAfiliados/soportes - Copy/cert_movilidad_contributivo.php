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
<title>Certificado de Afiliación</title>
<link rel="icon" href="../../../assets/images/icon.ico" />
<script src="../../../bower_components/angular/angular.js"></script>
<script src="../../../bower_components/jquery/dist/jquery.js"></script>
<script src="../../../scripts/controllers/consultaafiliados/soportes/cert_afiliacionmovilidadcontroller.js"></script>
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
      border: 1px solid black;
   }
   td{
      padding:2px 4px 2px 4px;;
   }
   thead{
      font-weight: bold;
   }
</style>
<body ng-controller="cert_afiliacionmovilidadcontroller">
<div style="float:right">
<img src="../../../assets/images/logo_horizontal.png" alt="" width="250px"  /></p>
 <strong style="font-size: x-small;">CAJA DE COMPENSACIÓN FAMILIAR DEL ATLÁNTICO </strong>
 <br><strong style="font-size: x-small;">N I T.  8 9 0 1 0 2 0 4 4 - 1</strong>
</div>

<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>


<div>
<center><h1 style="margin-top: 30px;"> CERTIFICADO DE AFILIACIÓN</h1></center>

<center><p>Que, el usuario  (a) <strong>{{nombre}}</strong>,  identificado(a) con cédula ciudadanía número {{numeroid}}, aparece registrado  (a) con la siguiente información:</p></center>

</div>
<p><strong><u>Información  del Afiliado:</u></strong></p>
<table>
  <tr>
    <td  align="center"><strong>TIPO DE AFILIADO</strong></td>
    <td  align="center"><strong>REGIMEN</strong></td>
    <td  align="center"><strong>NOMBRE</strong></td>
    <td  align="center"><strong>TIPO ID</strong></td>
    <td  align="center"><strong>NÚMERO ID</strong></td>
    <td  align="center"><strong>FECHA AFILIACION</strong></td>
    <td  align="center"><strong>FECHA DE RETIRO</strong></td>
    <td  align="center"><strong>ESTADO</strong></td>
  </tr>
  <tr>
    <td align="center">{{tipoafiliado}}</td>
    <td align="center">CONTRIBUTIVO</td>
    <td align="center">{{nombre}}</td>
    <td align="center">{{tipoid}}</td>
    <td align="center">{{numeroid}}</td>
    <td align="center">{{fechaafi}}</td>
    <td align="center">{{fecharet}}</td>
    <td align="center">{{estado}}</td>
  </tr>
</table>
<br>
<center><table width="70%">
      <tr>
        <td align="center"><strong>Documento Aportante</strong></td>
        <td align="center"><strong>Razón Social Aportante</strong></td>
        <td align="center"><strong>Fecha Inicio</strong></td>
        <td align="center"><strong>Fecha Fin</strong></td>
        <td align="center"><strong>Estado</strong></td>
      </tr>
      <tr data-ng-repeat="datas in certapo track by $index">
        <td align="center">{{datas.codigo}}</td>
        <td align="center">{{datas.razonsocial}}</td>
        <td align="center">{{datas.fechainicio}}</td>
        <td align="center">{{datas.fechafin}}</td>
        <td align="center">{{datas.estadoaporte}}</td>
      </tr>
</table></center>
<p><strong><u>Información  del los Beneficiarios:</u></strong></p>
<center><table border="0" cellspacing="0" cellpadding="0" width="80%">
  <tr>
        <td align="center"><strong>PARENTESCO</strong></td>
        <td align="center"><strong>TIPO ID</strong></td>
        <td align="center"><strong>NÚMERO ID</strong></td>
        <td align="center"><strong>NOMBRE</strong></td>
        <td align="center"><strong>ESTADO</strong></td>
        <td align="center"><strong>FECHA AFILIACIÓN</strong></td>
        <td align="center"><strong>FECHA RETIRO</strong></td>
      </tr>
      <tr  ng-repeat="data in cert" >
        <td align="center">{{data.parentesco}}</td>
        <td align="center">{{data.tipo_documento}}</td>
        <td align="center">{{data.documento}}</td>
        <td align="center">{{data.nombre_completo}}</td>
        <td align="center">{{data.estado}}</td>
        <td align="center">{{data.fechaafiliacion}}</td>
        <td align="center">{{data.fecharetiro_ben}}</td>
      </tr>
</table></center>
<p>En constancia se firma y  expide en Barranquilla a los {{dia}} días del mes de {{mes}} de {{anno}}, a solicitud del  interesado.</p>
<p>Atentamente,</p>
<img src="../../../images/firma_elkin.png" style="width: 111px; z-index: 999999; position: absolute;">
<p style="padding-top: 76px;"><br/> <strong> SUBDIRECCION NACIONAL DE REGIMEN CONTRIBUTIVO</strong><br/>Generado Por: {{usuariogenera}}</p>
<p align="center"><strong>INFORMACIÓN NO VALIDA PARA TRASLADO ENTRE EPS</strong></p>
<p align="center">Sede  Nacional: Calle 44 No. 46 - 56<br />
  www.cajacopieps.com<br />
  Línea  gratuita 01-8000-111446<br />
Barranquilla – Colombia</p>
<p><img src="supersalud.jpg" alt="" width="148" height="43" /></p>
<p align="center">&nbsp;</p>
</body>
</html>
