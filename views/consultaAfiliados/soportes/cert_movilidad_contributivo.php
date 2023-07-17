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

   #titulocertificado {
	position: absolute;
    left: 20%;
    top: 160px;
}
#texto_certificado {
	position: absolute;
	left: 50px;
	top: 260px;
	width: 794px;
	height: 43px;
	z-index: 2;
	font-weight: bold;
}
#tipo_documento {
	position: absolute;
    left: 50px;
    top: 350px;
	font-weight: bold;
}
#tipo_documento1 {
	position: absolute;
	left: 547px;
	top: 350px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#nombres_apellidos {
	position: absolute;
    top: 375px;
    left: 50px;
	font-weight: bold;
}
#nombres_apellidos1 {
	position: absolute;
	top: 375px;
	left: 547px;
	width: 400px;
	height: 24px;
	z-index: 4;
}
#tipo_afiliacion {
	position: absolute;
    top: 400px;
    left: 50px;
	font-weight: bold;
}
#tipo_afiliacion1 {
	position: absolute;
	top: 400px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#estado {
	position: absolute;
    top: 425px;
    left: 50px;
	font-weight: bold;
}
#estado1 {
	position: absolute;
	top: 425px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#fecha_afiliacion {
	position: absolute;
    top: 450px;
    left: 50px;
	font-weight: bold;
}
#fecha_afiliacion1 {
	position: absolute;
	top: 450px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#fecha_retiro {
	position: absolute;
    top: 475px;
    left: 50px;
	font-weight: bold;
}
#fecha_retiro1 {
	position: absolute;
	top: 475px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#discapacidad {
	position: absolute;
    top: 500px;
    left: 50px;
	font-weight: bold;
}
#discapacidad1 {
	position: absolute;
	top: 500px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#regimen {
	position: absolute;
    top: 525px;
    left: 50px;
	font-weight: bold;
}
#regimen1 {
	position: absolute;
	top: 525px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#nivel {
	position: absolute;
    top: 550px;
    left: 50px;
	font-weight: bold;
}
#nivel1 {
	position: absolute;
	top: 550px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#departamento {
	position: absolute;
    top: 575px;
    left: 50px;
	font-weight: bold;
}
#departamento1 {
	position: absolute;
	top: 575px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
.subdireccion {
	position: absolute;
    top: 880px;
    left: 50px;
	font-weight: bold;
}
.subraya{
      text-decoration: underline;
      font-size:15px;
      position: absolute;
    top: 540px;
    left: 300px;
	font-weight: bold;
   }
.beneficiariosclase {
	position: absolute;
    top: 600px;
    width: 98%;
}
</style>
<body ng-controller="cert_afiliacionmovilidadcontroller">


<div id="titulocertificado">
	<h1 style="font-size: 22px;">CERTIFICADO DE AFILIACION DE CAJACOPI EPS SAS</h1>
</div>

<div id="texto_certificado"><p>Que, el usuario  (a) <strong>{{nombre}}</strong>,  identificado(a) con cédula ciudadanía número {{numeroid}}, aparece registrado  (a) con la siguiente información:</p>
</div>

<div id="tipo_documento">TIPO Y NUMERO DE IDENTIFICACION:</div> <div id="tipo_documento1">{{tipoid}} {{numeroid}}</div>
<div id="nombres_apellidos">NOMBRES Y APELLIDOS:</div> <div id="nombres_apellidos1">{{nombre}}</div>
<div id="tipo_afiliacion">TIPO DE AFILIADO:</div> <div id="tipo_afiliacion1">{{tipoafiliado.toString().toUpperCase()}}</div>
<div id="estado">ESTADO DE AFILIACIÓN:</div> <div id="estado1">{{estado.toString().toUpperCase()}}</div>
<div id="fecha_afiliacion">FECHA DE INGRESO A CAJACOPI EPS SAS:</div> <div id="fecha_afiliacion1">{{fechaafi}}</div>
<div id="fecha_retiro">FECHA RETIRO CAJACOPI EPS SAS:</div> <div id="fecha_retiro1">{{fecharet}}</div>
<div id="discapacidad">DISCAPACIDAD:</div> <div id="discapacidad1">NINGUNA</div>
<div id="regimen">REGIMEN:</div> <div id="regimen1">CONTRIBUTIVO</div>

<p class="subraya"><strong><u>Información  del Aportante:</u></strong></p>
<table class="beneficiariosclase" width="70%">
      <tr>
        <td align="center"><strong>DOCUMENTO</strong></td>
        <td align="center"><strong>RAZÓN SOCIAL</strong></td>
        <td align="center"><strong>FECHA INICIO</strong></td>
        <td align="center"><strong>FECHA FIN</strong></td>
        <td align="center"><strong>ESTADO</strong></td>
      </tr>
      <tr data-ng-repeat="datas in certapo track by $index">
        <td align="center">{{datas.codigo}}</td>
        <td align="center">{{datas.razonsocial}}</td>
        <td align="center">{{datas.fechainicio}}</td>
        <td align="center">{{datas.fechafin}}</td>
        <td align="center">{{datas.estadoaporte}}</td>
      </tr>
</table>
<!-- ------------------------------------------------------------------------- -->
 
<div class="subdireccion">
	<div>SUBDIRECCION NACIONAL OPERACIONES</div>
	<div>Fecha de generacion: {{dia}}/{{mes}}/{{anno}}</div>
	<div>Codigo de verificacion: {{Codigo_QR}}</div>
	<div>Generado por: {{usuariogenera}}</div>
	<br>
	<div>ESTE DOCUMENTO NO ES VALIDO PARA LA PRESTACION DEL SERVICIO, NI PARA TRASLADO</div>
</div>
<!-- ----------------------------------------------------------- -->
<img src="marca_de_agua_certificado_afiliacion.jpg" style="width: 100%;"/>
</body>
</html>
