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
   *{
			font-size : 16px;
			font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
		}
   table {
      border-collapse: collapse;
      font-size: 12px;
   }
   table, th, td {
      text-align: center;
      border: 1px solid black;
      font-size: 12px;
   }
   td{
      padding: 2px 4px 2px 4px;
      
   }
   thead{
      font-weight: bold;
      font-size: 12px;
   }
   .subraya{
      text-decoration: underline;
      font-size:15px;
      position: absolute;
    top: 671px;
    left: 300px;
	font-weight: bold;
   }
   #titulocertificado {
	position: absolute;
    left: 20%;
    top: 218px;
}
#texto_certificado {
	position: absolute;
	left: 50px;
	top: 344px;
	width: 794px;
	height: 43px;
	z-index: 2;
	font-weight: bold;
}
#tipo_documento {
	position: absolute;
    left: 50px;
    top: 472px;
	font-weight: bold;
}
#tipo_documento1 {
	position: absolute;
	left: 547px;
	top: 472px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#nombres_apellidos {
	position: absolute;
    top: 497px;
    left: 50px;
	font-weight: bold;
}
#nombres_apellidos1 {
	position: absolute;
	top: 497px;
	left: 547px;
	width: 400px;
	height: 24px;
	z-index: 4;
}
#tipo_afiliacion {
	position: absolute;
    top: 522px;
    left: 50px;
	font-weight: bold;
}
#tipo_afiliacion1 {
	position: absolute;
	top: 522px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#estado {
	position: absolute;
    top: 547px;
    left: 50px;
	font-weight: bold;
}
#estado1 {
	position: absolute;
	top: 547px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#fecha_afiliacion {
	position: absolute;
    top: 572px;
    left: 50px;
	font-weight: bold;
}
#fecha_afiliacion1 {
	position: absolute;
	top: 572px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#fecha_retiro {
	position: absolute;
    top: 597px;
    left: 50px;
	font-weight: bold;
}
#fecha_retiro1 {
	position: absolute;
	top: 597px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#discapacidad {
	position: absolute;
    top: 622px;
    left: 50px;
	font-weight: bold;
}
#discapacidad1 {
	position: absolute;
	top: 622px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#regimen {
	position: absolute;
    top: 647px;
    left: 50px;
	font-weight: bold;
}
#regimen1 {
	position: absolute;
	top: 647px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#nivel {
	position: absolute;
    top: 672px;
    left: 50px;
	font-weight: bold;
}
#nivel1 {
	position: absolute;
	top: 672px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#departamento {
	position: absolute;
    top: 697px;
    left: 50px;
	font-weight: bold;
}
#departamento1 {
	position: absolute;
	top: 697px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
.subdireccion {
	position: absolute;
    top: 990px;
    left: 50px;
	font-weight: bold;
}
.beneficiariosclase {
	position: absolute;
    top: 725px;
    width: 98%;
}
</style>
<body  ng-controller="cert_beneficiariomovilidadcontroller">
   <div id="titulocertificado">
	<h1 style="font-size: 22px;">CERTIFICADO DE AFILIACION DE CAJACOPI EPS SAS</h1>
</div>
<div id="texto_certificado">Que, el usuario (a) {{NOMBRE}}, identificado(a) con 
	<b ng-if="TIPOID=='CC'">Cedula de Ciudadanía</b>
	<b ng-if="TIPOID=='TI'">Tarjeta de identidad</b>
	<b ng-if="TIPOID=='RC'">Registro Civil</b>
	<b ng-if="TIPOID=='CN'">Certificado Nacido Vivo</b>
	<b ng-if="TIPOID=='CE'">Cedula de Extranjería</b>
	<b ng-if="TIPOID=='PA'">Pasaporte</b>
	<b ng-if="TIPOID=='PE'">Permiso Especial de Permanencia</b>
	<b ng-if="TIPOID=='AS'">Adulto sin Identificación</b>
	<b ng-if="TIPOID=='MS'">Menor sin Identificación</b>
	<b ng-if="TIPOID=='SC'">Salvo Conducto</b>
	<b ng-if="TIPOID=='PT'">Permiso por Protección Temporal</b>
número {{id}}, aparece registrado (a) con la siguiente información:</div>
<div id="tipo_documento">TIPO Y NUMERO DE IDENTIFICACION:</div> <div id="tipo_documento1">{{TIPOID}} {{NUMID}}</div>
<div id="nombres_apellidos">NOMBRES Y APELLIDOS:</div> <div id="nombres_apellidos1">{{NOMBRE}}</div>
<div id="tipo_afiliacion">TIPO DE AFILIADO:</div> <div id="tipo_afiliacion1">COTIZANTE</div>
<div id="estado">ESTADO DE AFILIACIÓN:</div> <div id="estado1">{{ESTADO.toString().toUpperCase()}}</div>
<div id="fecha_afiliacion">FECHA DE INGRESO A CAJACOPI EPS SAS:</div> <div id="fecha_afiliacion1">{{F_AFILIACION}}</div>
<div id="fecha_retiro">FECHA RETIRO CAJACOPI EPS SAS:</div> <div id="fecha_retiro1">{{F_RETIRO}}</div>
<div id="discapacidad">DISCAPACIDAD:</div> <div id="discapacidad1">NINGUNA</div>
<div id="regimen">REGIMEN:</div> <div id="regimen1">CONTRIBUTIVO</div>
<!-- ------------------------------------------------------------------------- -->
<p class="subraya">INFORMACION DEL BENEFICIARIO:</p>
   <table class="beneficiariosclase">
      <thead>
         <td>TIPO DE AFILIADO</td>
         <td>REGIMEN</td>
         <td>NOMBRE</td>
         <td>TIPO ID</td>
         <td>NUMERO ID</td>
         <td>FECHA AFILIACION</td>
         <td>FECHA RETIRO</td>
         <td>PARENTESCO</td>
         <td>DISCAPACIDAD</td>
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
         <td>
         	<span ng-if="b.parentesco =='AB'">ABUELO</span>
	<span ng-if="b.parentesco =='CY'">CONYUGE</span>
	<span ng-if="b.parentesco =='HI'">HIJO</span>
	<span ng-if="b.parentesco =='NI'">NIETO</span>
	<span ng-if="b.parentesco =='PA'">PADRE</span>
	<span ng-if="b.parentesco =='SU'">SUEGRO</span>
	<span ng-if="b.parentesco =='MA'">MADRE</span>
         </td>
         <td>
		<span ng-if="b.discapacidad =='N' || b.discapacidad ==''">
		NINGUNA
</span>
		<span ng-if="b.discapacidad =='D'">
		DISCAPACITADO
</span>	 
		 </td>
         <td>{{b.estado}}</td>
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
