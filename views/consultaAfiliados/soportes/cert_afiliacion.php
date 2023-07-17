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
<style type="text/css">
*{
			font-size : 16px;
			font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
		}


/* ---------------------------------------------------------------- */
.claseqr {
	position: absolute;
	top: 25px;
	right: 57px;
	z-index: 12;
	text-align:center;
	font-size: 15px;
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
    top: 445px;
	font-weight: bold;
}
#tipo_documento0 {
	position: absolute;
    left: 50px;
    top: 472px;
	font-weight: bold;
}
#tipo_documento1 {
	position: absolute;
	left: 547px;
	top: 445px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#tipo_documento11 {
	position: absolute;
	left: 547px;
	top: 472px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#nombres_apellidos {
	position: absolute;
    top: 470px;
    left: 50px;
	font-weight: bold;
}
#nombres_apellidos0 {
	position: absolute;
    top: 497px;
    left: 50px;
	font-weight: bold;
}
#nombres_apellidos1 {
	position: absolute;
	top: 470px;
	left: 547px;
	width: 400px;
	height: 24px;
	z-index: 4;
}
#nombres_apellidos11 {
	position: absolute;
	top: 497px;
	left: 547px;
	width: 400px;
	height: 24px;
	z-index: 4;
}
#tipo_afiliacion {
	position: absolute;
    top: 495px;
    left: 50px;
	font-weight: bold;
}
#tipo_afiliacion0 {
	position: absolute;
    top: 522px;
    left: 50px;
	font-weight: bold;
}
#tipo_afiliacion1 {
	position: absolute;
	top: 495px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#tipo_afiliacion11 {
	position: absolute;
	top: 522px;
	left: 547px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#parentesco {
	position: absolute;
    top: 522px;
    left: 50px;
	font-weight: bold;
}
#parentesco1 {
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
    top: 807px;
    left: 50px;
	font-weight: bold;
}
</style>
<script src="../../../bower_components/angular/angular.js"></script>
<script src="../../../bower_components/jquery/dist/jquery.js"></script>
<script type="text/javascript" src="../../../js/qr-code-styling@1.5.0.js"></script>
<!-- <script type="text/javascript" src="https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js"></script> -->
<script src="../../../scripts/controllers/consultaafiliados/soportes/cert_afiliacioncontroller.js"></script>
</head>

<body ng-controller="cert_afiliacioncontroller">

<div id="titulocertificado">
	<h1 style="font-size: 22px;">CERTIFICADO DE AFILIACION DE CAJACOPI EPS SAS</h1>
</div>
<div id="texto_certificado">{{cert.TEXT1}}</div>
<div  ng-if="cert.REGIMEN=='Contributivo' && cert.TIPO =='Beneficiario' || cert.REGIMEN =='Subsidiado' && cert.TIPO=='Beneficiario'">
<div id="tipo_documento">TIPO Y NUMERO DE IDENTIFICACION:</div> <div id="tipo_documento1">{{cert.NUMERODOCUMENTO}}</div>
<div id="nombres_apellidos">NOMBRES Y APELLIDOS:</div> <div id="nombres_apellidos1">{{cert.NOMBRE}}</div>
<div id="tipo_afiliacion">TIPO DE AFILIADO:</div> <div id="tipo_afiliacion1">{{cert.TIPO.toString().toUpperCase()}}</div>
	<div id="parentesco">PARENTESCO:</div> 
	<div ng-if="cert.REGIMEN =='Contributivo' && cert.TIPO =='Beneficiario' && cert.PARENTESCO_CONT =='AB'"id="parentesco1">ABUELO</div>
	<div ng-if="cert.REGIMEN =='Contributivo' && cert.TIPO =='Beneficiario' && cert.PARENTESCO_CONT =='CY'"id="parentesco1">CONYUGE</div>
	<div ng-if="cert.REGIMEN =='Contributivo' && cert.TIPO =='Beneficiario' && cert.PARENTESCO_CONT =='HI'"id="parentesco1">HIJO</div>
	<div ng-if="cert.REGIMEN =='Contributivo' && cert.TIPO =='Beneficiario' && cert.PARENTESCO_CONT =='NI'"id="parentesco1">NIETO</div>
	<div ng-if="cert.REGIMEN =='Contributivo' && cert.TIPO =='Beneficiario' && cert.PARENTESCO_CONT =='PA'"id="parentesco1">PADRE</div>
	<div ng-if="cert.REGIMEN =='Contributivo' && cert.TIPO =='Beneficiario' && cert.PARENTESCO_CONT =='SU'"id="parentesco1">SUEGRO</div>
	<div ng-if="cert.REGIMEN =='Contributivo' && cert.TIPO =='Beneficiario' && cert.PARENTESCO_CONT =='MA'"id="parentesco1">MADRE</div>
	
	<div ng-if="cert.REGIMEN =='Subsidiado' && cert.TIPO =='Beneficiario' && cert.PARENTESCO_SUB =='1'"id="parentesco1">CONYUGE</div>
	<div ng-if="cert.REGIMEN =='Subsidiado' && cert.TIPO =='Beneficiario' && cert.PARENTESCO_SUB =='2'"id="parentesco1">HIJO</div>
	<div ng-if="cert.REGIMEN =='Subsidiado' && cert.TIPO =='Beneficiario' && cert.PARENTESCO_SUB =='3'"id="parentesco1">PADRE</div>
	<div ng-if="cert.REGIMEN =='Subsidiado' && cert.TIPO =='Beneficiario' && cert.PARENTESCO_SUB =='4'"id="parentesco1">NIETO</div>
	<div ng-if="cert.REGIMEN =='Subsidiado' && cert.TIPO =='Beneficiario' && cert.PARENTESCO_SUB =='5'"id="parentesco1">NIETO</div>
</div>
<div  ng-if="cert.REGIMEN=='Contributivo' && cert.TIPO !='Beneficiario' || cert.REGIMEN =='Subsidiado' && cert.TIPO!='Beneficiario'">
<div id="tipo_documento0">TIPO Y NUMERO DE IDENTIFICACION:</div> <div id="tipo_documento11">{{cert.NUMERODOCUMENTO}}</div>
<div id="nombres_apellidos0">NOMBRES Y APELLIDOS:</div> <div id="nombres_apellidos11">{{cert.NOMBRE}}</div>
<div id="tipo_afiliacion0">TIPO DE AFILIADO:</div> <div id="tipo_afiliacion11">{{cert.TIPO.toString().toUpperCase()}}</div>
</div>

<div id="estado">ESTADO DE AFILIACIÓN:</div> <div id="estado1">{{cert.ESTADO}}</div>
<div id="fecha_afiliacion">FECHA DE INGRESO A CAJACOPI EPS SAS:</div> 

<!-- <div id="fecha_afiliacion1">{{cert.FECHAAFILIACION}}</div> -->
<div id="fecha_afiliacion1">{{fechadeafiliacion}}</div>

<div id="fecha_retiro">FECHA RETIRO CAJACOPI EPS SAS:</div> <div id="fecha_retiro1">{{cert.FECHARETIRO}}</div>
<div id="discapacidad">DISCAPACIDAD:</div> 
<div ng-if="cert.DISCAPACIDAD_AFI =='D'" id="discapacidad1">DISCAPACITADO</div>
<div ng-if="cert.DISCAPACIDAD_AFI =='N'" id="discapacidad1">NINGUNA</div>
<div ng-if="cert.DISCAPACIDAD_AFI ==''" id="discapacidad1">NINGUNA</div>
<div id="regimen">REGIMEN:</div> <div id="regimen1">{{cert.REGIMEN.toString().toUpperCase()}}</div>
<div id="nivel">NIVEL:</div> <div id="nivel1">{{cert.NIVELSISBEN}}</div>
<div id="departamento">MUNICIPIO / DEPARTAMENTO:</div> <div id="departamento1">{{cert.MUNICIPIO}} / {{cert.DEPARTAMENTO_AFI}}</div>
<!-- ------------------------------------------------------------------------- -->
<div class="subdireccion">
	<div>SUBDIRECCION NACIONAL OPERACIONES</div>
	<div>Fecha de generacion: {{fechahoy}}</div>
	<div>Codigo de verificacion: {{Codigo_QR}}</div>
	<div>Generado por: {{funcionario}}</div>
	<br>
	<div>ESTE DOCUMENTO NO ES VALIDO PARA LA PRESTACION DEL SERVICIO, NI PARA TRASLADO</div>
</div>
<!-- ----------------------------------------------------------- -->
<!-- <div id="qrcode" class="claseqr"></div> -->
<!-- <img src="cert_afiliacion_temporal.jpg"/> -->
<img src="marca_de_agua_certificado_afiliacion.jpg" style="width: 100%;"/>

</body>
</html>