<?php 
  session_start();
  if (!isset($_SESSION['nombre'])) {
      header("Location: ../../../index.html");
  }
?>
<html ng-app="GenesisApp">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Formulario Único de Afiliación</title>
		<link rel="icon" href="../../../assets/images/icon.ico" />
		<style type="text/css">
		*{
			font-size : 18px;
			font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
			font-weight: bold;
		}
		#apDiv1 {
			position: absolute;
			left: 178px;
			top: 240px;
			width: 203px;
			height: 28px;
			z-index: 1;
		}
					#apDiv2 {
			position: absolute;
			left: 30px;
			top: 362px;
			width: 267px;
			height: 31px;
			z-index: 2;
					}
					#apDiv3 {
			position: absolute;
			left: 306px;
			top: 362px;
			width: 260px;
			height: 34px;
			z-index: 3;
					}
					#apDiv4 {
			position: absolute;
			left: 579px;
			top: 362px;
			width: 444px;
			height: 34px;
			z-index: 4;
					}
					#apDiv5 {
			position: absolute;
			left: 249px;
			top: 401px;
			width: 56px;
			height: 25px;
			z-index: 5;
					}
					#apDiv6 {
			position: absolute;
			left: 508px;
			top: 401px;
			width: 135px;
			height: 27px;
			z-index: 6;
					}
					#apDiv7 {
			position: absolute;
			left: 700px;
			top: 401px;
			width: 44px;
			height: 28px;
			z-index: 7;
					}
					#apDiv8 {
			position: absolute;
			left: 851px;
			top: 403px;
			width: 176px;
			height: 28px;
			z-index: 8;
					}
					#apDiv9 {
			position: absolute;
			left: 123px;
			top: 435px;
			width: 859px;
			height: 27px;
			z-index: 9;
					}
					#apDiv10 {
			position: absolute;
			left: 123px;
			top: 468px;
			width: 395px;
			height: 26px;
			z-index: 10;
					}
					#apDiv11 {
			position: absolute;
			left: 161px;
			top: 503px;
			width: 207px;
			height: 29px;
			z-index: 11;
					}
					#apDiv12 {
			position: absolute;
			left: 468px;
			top: 502px;
			width: 265px;
			height: 24px;
			z-index: 12;
					}
					#apDiv13 {
			position: absolute;
			left: 534px;
			top: 569px;
			width: 162px;
			height: 27px;
			z-index: 13;
					}
					#apDiv14 {
			position: absolute;
			left: 862px;
			top: 1068px;
			width: 187px;
			height: 38px;
			z-index: 14;
					}
					#apDiv15 {
			position: absolute;
			left: 286px;
			top: 1202px;
			width: 275px;
			height: 27px;
			z-index: 15;
					}
					#apDiv16 {
			position: absolute;
			left: 631px;
			top: 471px;
			width: 134px;
			height: 28px;
			z-index: 16;
					}
					#apDiv17 {
			position: absolute;
			left: 922px;
			top: 470px;
			width: 106px;
			height: 28px;
			z-index: 17;
					}
					#apDiv18 {
			position: absolute;
			left: 581px;
			top: 243px;
			width: 445px;
			height: 27px;
			z-index: 18;
		}
		#apDiv19 {
	position: absolute;
	left: 818px;
	top: 203px;
	width: 204px;
	height: 31px;
	z-index: 19;
	color: red;
}
        </style>
		<script src="../../../bower_components/angular/angular.js"></script>
		<script src="../../../bower_components/jquery/dist/jquery.js"></script>
		<script src="../../../scripts/controllers/consultaafiliados/soportes/fuarancontroller.js"></script>
	</head>
	<body ng-controller="fuarancontroller">
		<div id="apDiv1">{{info.FECHAAFILIACION}}</div>
		<div id="apDiv2">{{info.PRIMER_APELLIDO}}</div>
		<div id="apDiv3">{{info.SEGUNDO_APELLIDO}}</div>
		<div id="apDiv4">{{info.NOMBRES}}</div>
		<div id="apDiv5">{{info.TIPODOCUMENTO}}</div>
		<div id="apDiv6">{{info.NUMERODOCUMENTO}}</div>
		<div id="apDiv7">{{info.SEXO}}</div>
		<div id="apDiv8">{{info.NACIMIENTO}}</div>
		<div id="apDiv9">{{info.DIRECCION}}</div>
		<div id="apDiv10">{{info.TELEFONO}}</div>
		<div id="apDiv11">{{info.DEPARTAMENTO}}</div>
		<div id="apDiv12">{{info.MUNICIPIO}}</div>
		<div id="apDiv13">{{info.CANTBENEFICIARIOS}}</div>
		<div id="apDiv14">{{info.FECHACARNETIZADO}}</div>
		<div id="apDiv15">{{usergenera}}</div>
		<div id="apDiv16">{{info.CELULAR}}</div>
		<div id="apDiv17">{{info.ZONA}}</div>
	<div id="apDiv18">{{ubicaciongenera}}</div>
    <div id="apDiv19"><center>{{info.NUMERO}}</center></div>
    <img src="fuar_antiguo.jpg" width="1037" height="1267">
    </body>
</html>