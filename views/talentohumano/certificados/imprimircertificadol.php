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
<title>Certificado de Portabilidad</title>
<link rel="icon" href="../../../assets/images/icon.ico" />
<style type="text/css">
*{
	font-size : 16px;
	font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
}
#apDiv1 {
	position: absolute;
	left: 39px;
	top: 180px;
	width: 567px;
	height: 30px;
	z-index: 1;
}
#apDiv2 {
	position: absolute;
	left: 39px;
	top: 202px;
	width: 701px;
	height: 114px;
	z-index: 2;
}
#apDiv3 {
	position: absolute;
	left: 40px;
	top: 225px;
	width: 773px;
	height: 39px;
	z-index: 3;
}
#titulocertificado {
	position: absolute;
    left: 20%;
    top: 292px;
    text-align: center;
}
#apDiv4 {
	position: absolute;
	left: 40px;
	top: 580px;
	width: 804px;
	height: 265px;
	z-index: 5;
	line-height: 140%;
}
#apDiv5 {
	position: absolute;
	left: 40px;
	top: 690px;
	width: 804px;
	height: 265px;
	z-index: 5;
	line-height: 140%;
}
#apDiv6 {
    position: absolute;
	left: 40px;
	top: 890px;
	width: 804px;
	height: 265px;
	z-index: 5;
	line-height: 140%;
}
#apDiv7 {
	position: absolute;
	left: 40px;
	top: 748px;
	width: 804px;
	height: 265px;
	z-index: 5;
	line-height: 140%;
}
</style>
<script src="../../../bower_components/angular/angular.js"></script>
<script src="../../../bower_components/jquery/dist/jquery.js"></script>
<script src="../../../scripts/controllers/talentohumano/certificados/imprimircertificadolCtr.js"></script>
</head>
<body ng-controller="imprimircertificadolCtr">
<div id="apDiv1">Señores</div>
<div ng-if="interesado == 'undefined'"  id="apDiv2"><b>A QUIEN INTERESE</b></div>
<div ng-if="interesado != 'undefined'"  id="apDiv2"><b>{{interesado}}</b></div>
<div id="apDiv3">Barranquilla (Atlantico),</div>
<div id="titulocertificado">
	<h1 style="font-size: 22px;">LA CAJA DE COMPENSACIÓN FAMILIAR</h1>
    <h1 style="font-size: 22px;">CAJACOPI ATLÁNTICO</h1>
    <br>
    <h1 style="font-size: 22px;">-PROGRAMA EPS-</h1>
    <br>
    <h1 style="font-size: 22px;">HACE CONSTAR</h1>
</div>


<div id="apDiv4">Que el (la) señor (a), <b>{{datacert.nombre}}</b>, identificado (a) con documento de identidad tipo cedula de
    ciudadania <b>N.{{datacert.documento}}</b> se encuentra vinculado (a) a la empresa en calidad de <b>{{datacert.cargo}}</b>, mediante un contrato a
    termino <b>{{datacert.tipo_contrato}}</b> que inicio el dia <b>{{datacert.inicio}}</b>, y se encuentra vigente a la fecha.
</div>
<div ng-if="tipo=='S'" id="apDiv5">Que su cargo implica una dedicación de tiempo completo y tiene una asignación salarial mensual de 
    <b>{{datacert.valor_letra}}</b> m.l (<b>{{datacert.valor_numero}}</b>).
</div>
<br>
<div id="apDiv7">
Se expide este constancia a solicitud de la parte interesada, en la ciudad de <b>Barranquilla (Atlantico)</b>, a los <b>{{fechacertificado}}</b>.
<br><br><br>
Atentamente,
</div>


<!-- ------------------------------------------------------------------------- -->
<div id="apDiv6" style="font-weight: bold;">
	<div><img src="{{tipoempleado.firma}}" alt="GENESIS" style="width: 240px;height: auto;margin-left: 18px;margin-top: 7px;"></div>
	<div>CARGO: {{tipoempleado.Cargo}}</div>
	<div>CORREO: {{tipoempleado.Correo}}</div>
	<div>PBX: 318 5930 - 3860032</div>
</div>
<!-- ----------------------------------------------------------- -->
<img src="marca_de_agua_certificado_afiliacion.jpg" style="width: 100%;"/>
</body>
</html>