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
#apDiv1 {
	position: absolute;
	left: 547px;
	top: 422px;
	width: 311px;
	height: 27px;
	z-index: 1;
}
#apDiv2 {
	position: absolute;
	left: 135px;
	top: 344px;
	width: 794px;
	height: 43px;
	z-index: 2;
}
#apDiv3 {
	position: absolute;
	left: 547px;
	top: 449px;
	width: 311px;
	height: 22px;
	z-index: 3;
}
#apDiv4 {
	position: absolute;
	left: 547px;
	top: 476px;
	width: 311px;
	height: 24px;
	z-index: 4;
}
#apDiv5 {
	position: absolute;
	left: 547px;
	top: 503px;
	width: 311px;
	height: 25px;
	z-index: 5;
}
#apDiv6 {
	position: absolute;
	left: 547px;
	top: 533px;
	width: 311px;
	height: 23px;
	z-index: 6;
}
#apDiv7 {
	position: absolute;
	left: 547px;
	top: 563px;
	width: 311px;
	height: 22px;
	z-index: 7;
}
#apDiv8 {
	position: absolute;
	left: 547px;
	top: 590px;
	width: 311px;
	height: 23px;
	z-index: 8;
}
#apDiv9 {
	position: absolute;
	left: 547px;
	top: 620px;
	width: 311px;
	height: 25px;
	z-index: 9;
}
#apDiv10 {
	position: absolute;
	left: 547px;
	top: 648px;
	width: 311px;
	height: 24px;
	z-index: 10;
}
#apDiv11 {
	position: absolute;
	left: 547px;
	top: 677px;
	width: 311px;
	height: 26px;
	z-index: 11;
}
#apDiv12 {
	position: absolute;
	left: 135px;
	top: 730px;
	width: 727px;
	height: 33px;
	z-index: 12;
}
</style>
<script src="../../../bower_components/angular/angular.js"></script>
<script src="../../../bower_components/jquery/dist/jquery.js"></script>
<script src="../../../scripts/controllers/consultaafiliados/soportes/cert_afiliacioncontroller.js"></script>
</head>

<body ng-controller="cert_afiliacioncontroller">

<div id="apDiv1">{{cert.NACIMIENTO}}</div>
<div id="apDiv2">{{cert.TEXT1}}</div>
<div id="apDiv3">{{cert.SEXO}}</div>
<div id="apDiv4">{{cert.REGIMEN}}</div>
<div id="apDiv5">{{cert.ESTADO}}</div>
<div id="apDiv6">{{cert.TIPO}}</div>
<div id="apDiv7">{{cert.DEPARTAMENTO}}</div>
<div id="apDiv8">{{cert.MUNICIPIO}}</div>
<div id="apDiv9">{{cert.FECHAAFILIACION}}</div>
<div id="apDiv10">{{cert.FECHARETIRO}}</div>
<div id="apDiv11">{{cert.NIVELSISBEN}}</div>
<div id="apDiv12">{{cert.TEXT2}}</div>
<!-- <img src="cert_afiliacion_sinfirma.jpg"/> -->
<img src="cert_afiliacion_temporal.jpg"/>

</body>
</html>