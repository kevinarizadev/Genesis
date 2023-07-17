<?php 
  session_start();
  if (!isset($_SESSION['nombre'])) {
      header("Location: ../../../index.html");
  }
?>
<html ng-app = "GenesisApp">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Carnet - Regimen Contributivo</title>
		<link rel="icon" href="../../../assets/images/icon.ico" />
		<script src="../../../bower_components/angular/angular.js"></script>
		<script src="../../../bower_components/jquery/dist/jquery.js"></script>
		<script src="../../../bower_components/angular-route/angular-route.js"></script>
		<script src="../../../scripts/controllers/consultaafiliados/soportes/carnetcontroller.js"></script>
	<script src="../../../scripts/services/util/communication.js"></script>
		<style type="text/css">
			* {
			    font-size: 11px;
			    font-family: Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif;
			}
			#nombre {
			    position: absolute;
			    left: 544px;
			    top: 119px;
			    width: 386px;
			    height: 20px;
			    z-index: 1;
			}
			#id {
			    position: absolute;
			    left: 606px;
			    top: 142px;
			    width: 254px;
			    height: 18px;
			    z-index: 2;
			}
			#fecha_nacimiento {
	position: absolute;
	left: 629px;
	top: 169px;
	width: 89px;
	height: 16px;
	z-index: 3;
			}
			#ficha_sisben {
	position: absolute;
	left: 625px;
	top: 189px;
	width: 96px;
	height: 17px;
	z-index: 4;
			}
			#fecha_afiliacion {
	position: absolute;
	left: 628px;
	top: 211px;
	width: 82px;
	height: 17px;
	z-index: 5;
			}
			#apDiv1 {
			    position: absolute;
			    left: 626px;
			    top: 222px;
			    width: 305px;
			    height: 20px;
			    z-index: 6;
			}
			#ips_asignada {
	position: absolute;
	left: 633px;
	top: 233px;
	width: 309px;
	height: 18px;
	z-index: 6;
			}
			#ips {
			    position: absolute;
			    left: 626px;
			    top: 249px;
			    width: 307px;
			    height: 18px;
			    z-index: 7;
			}
			#tipo_discapacidad {
	position: absolute;
	left: 623px;
	top: 255px;
	width: 113px;
	height: 19px;
	z-index: 8;
			}
			#sexo {
	position: absolute;
	left: 825px;
	top: 169px;
	width: 114px;
	height: 19px;
	z-index: 9;
			}
			#nivel_sisben {
			    position: absolute;
			    left: 806px;
			    top: 185px;
			    width: 129px;
			    height: 18px;
			    z-index: 10;
			}
			#municipio {
	position: absolute;
	left: 821px;
	top: 217px;
	width: 121px;
	height: 18px;
	z-index: 11;
			}
			#bnombre {
			    position: absolute;
			    left: 544px;
			    top: 111px;
			    width: 386px;
			    height: 20px;
			    z-index: 1;
			}
			#bid {
			    position: absolute;
			    left: 606px;
			    top: 136px;
			    width: 254px;
			    height: 18px;
			    z-index: 2;
			}
			#bfecha_nacimiento {
			    position: absolute;
			    left: 632px;
			    top: 157px;
			    width: 89px;
			    height: 16px;
			    z-index: 3;
			}
			#bficha_sisben {
			    position: absolute;
			    left: 603px;
			    top: 176px;
			    width: 96px;
			    height: 17px;
			    z-index: 4;
			}
			#bfecha_afiliacion {
			    position: absolute;
			    left: 628px;
			    top: 199px;
			    width: 82px;
			    height: 17px;
			    z-index: 5;
			}
			#bapDiv1 {
			    position: absolute;
			    left: 626px;
			    top: 222px;
			    width: 305px;
			    height: 20px;
			    z-index: 6;
			}
			#bips_asignada {
				position: absolute;
				left: 622px;
				top: 217px;
				width: 309px;
				height: 18px;
				z-index: 6;
						}
						#bips {
				position: absolute;
				left: 617px;
				top: 239px;
				width: 307px;
				height: 18px;
				z-index: 7;
			}
			#btipo_discapacidad {
				position: absolute;
				left: 638px;
				top: 260px;
				width: 142px;
				height: 19px;
				z-index: 8;
			}
			#bsexo {
			    position: absolute;
			    left: 785px;
			    top: 155px;
			    width: 140px;
			    height: 19px;
			    z-index: 9;
			}
			#bnivel_sisben {
			    position: absolute;
			    left: 798px;
			    top: 176px;
			    width: 129px;
			    height: 18px;
			    z-index: 10;
			}
			#bmunicipio {
			    position: absolute;
			    left: 788px;
			    top: 197px;
			    width: 141px;
			    height: 18px;
			    z-index: 11;
			}
		</style>
	</head>
	<body ng-controller="carnetcontroller">
		<div ng-init="obtenerParam()">
			<div id="nombre"><center>{{cabeza.NOMBRE}}</center></div>
			<div id="id"><center>{{cabeza.TIPODOCUMENTO + ' ' +cabeza.DOCUMENTO}}</center></div>
			<div id="fecha_nacimiento"><center>{{cabeza.NACIMIENTO}}</center></div>
			<div id="ficha_sisben"><center>{{cabeza.FICHASISBEN}}</center></div>
		  <div id="fecha_afiliacion"><center>{{cabeza.FECHAAFILIACION}}</center></div>
		  <div id="ips_asignada">{{cabeza.IPS}}</div>
		  <div id="tipo_discapacidad"><center>{{cabeza.DISCAPACIDAD}}</center></div>
			<div id="sexo"><center>{{cabeza.SEXO}}</center></div>
			<div id="municipio"><center>{{cabeza.MUNICIPIO}}</div>
			<img src="carnet_contributivo.png" width="950" height="325" /><br><br>
		</div>
	</body>
</html>