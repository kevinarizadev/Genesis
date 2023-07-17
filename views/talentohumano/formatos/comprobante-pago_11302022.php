<html>
	<head>
		<title>Comprobante de Pago</title>
	</head>
	<link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">
	<link rel="icon" href="../../../assets/images/icon.ico" />
	<style type="text/css">
		@page { size: landscape; }
		body{
			margin: 0;
		}
		*{
			font-family: 'PT Sans', sans-serif;
			font-size: 12px;
		}
		.header{
			height: 14%;
			width: 100%;
			position: relative;
			padding-bottom: 6px;
		}
		.leftheader{
			width: 50%;
			text-align: left;
			height: 100%;
			float: left;
		}
		.leftheader .left{
			float: left;
		}
		.rightheader{
			width: 50%;
			text-align: left;
			height: 100%;
			float: right;
			text-align: right;
		}
		.infoSection{
			position: relative;
			height: 25%;
			border: 1px solid;
			padding: 10px;
		}
		.infoEmpleado{
			float: left;
			width: 50%;
			height: 100%;
		}
		.infoAportes{
			float: right;
			width: 50%;
			height: 100%;
		}
		.infoPagos{
			width: 100%;
			margin-top: 10px;
		}
		#tabledata{
			border-collapse: collapse;
		}
		#tabledata, th, td{
			padding: 2px;
		}
		#tabledata td{
			text-align: center;
		}
		#tabletotales{
			border-collapse: collapse;
		}
		#tabletotales, th, td{
			border: 1px solid;
			padding: 2px;
		}
		.totales{
			width: 100%;
			text-align: right;
			height: 10%;
		}
		.totalletras{
			width: 100%;
			text-align: center;
			background-color: #b7b7b7e0;
			margin-top: 20px;
			position: relative;
		}
		.ultimomsj{
			width: 100%;
			text-align: center;
		}
		#valorletra{
			margin: 0;
			padding: 5px;
			font-weight: bold; 
		}
		#tableempleado{
			border-collapse: collapse;
		}
		#tableempleado td{
			border-color: white;
		}
		.l{
			text-align: right !important;
			font-weight: bold !important;
		}
		.r{
			text-align: left !important;
		}
		.totaltxt{
			font-size: 17px;
			padding-right: 10px;
		}
		.titulo{
			text-align: center; 
			font-size: 23px; 
			font-weight: bold; 
			border: 1px solid;
		}
	</style>
	<script src="../../../bower_components/angular/angular.js"></script>
	<script src="../../../bower_components/jquery/dist/jquery.js"></script>
	<script src="../../../scripts/controllers/talentohumano/formatos/comprobantenomina.js"></script>
	<body style="height: 80%" ng-controller="comprobanteCtrl" ng-app="GenesisApp">
		<div class="header">
			<div class="leftheader">
				<img class="left" src="https://www.cajacopieps.com:81/genesis/images/cajacopi_logo.png" width="110">
				<div class="left" style="padding-left: 20px;">
					<p style="font-size: 20px; margin-bottom: 5px;"><b>CAJACOPI EPS-S</b></p>
					<p style="font-size: 18px;margin-top: 0px;margin-bottom: 0px;"><b>890.102.044-1</b></p>
				</div>
			</div>
			<div class="rightheader">
				<img class="left" src="https://www.cajacopieps.com:81/genesis/assets/images/black_logo.png" width="300">
			</div>
		</div>
		<div class="titulo">
			COMPROBANTE DE PAGO DE NÓMINA
		</div>
		<div class="infoSection">
			<div class="infoEmpleado">
				<table id="tableempleado">
					<tr>
						<td class="l">Apellidos y Nombres: </td>
						<td class="r">{{Afiliaciones.nombre}}</td>
					</tr>
					<tr>
						<td class="l">Identificación: </td>
						<td class="r">{{Afiliaciones.documento}}</td>
					</tr>
					<tr>
						<td class="l">Tipo Contrato: </td>
						<td class="r">{{Afiliaciones.tipocontrato}}</td>
					</tr>
					<tr>
						<td class="l">Cargo: </td>
						<td class="r">{{Afiliaciones.cargo}}</td>
					</tr>
					<tr>
						<td class="l">Salario Basico: </td>
						<td class="r">{{Afiliaciones.salariobase}}</td>
					</tr>
					<tr>
						<td class="l">Fecha Ingreso: </td>
						<td class="r">{{Afiliaciones.fechaingreso}}</td>
					</tr>
					<tr>
						<td class="l">Periodo de Pago: </td>
						<td class="r">{{periodo_pago}} - Nómina {{Afiliaciones.numnomina}}</td>
					</tr>
				</table>
			</div>
			<div class="infoAportes">
				<table id="tableempleado">
					<tr>
						<td class="l">EPS: </td>
						<td class="r">{{Afiliaciones.eps}}</td>
					</tr>
					<tr>
						<td class="l">AFP: </td>
						<td class="r">{{Afiliaciones.afp}}</td>
					</tr>
					<tr>
						<td class="l">ARL: </td>
						<td class="r">{{Afiliaciones.arl}}</td>
					</tr>
					<tr>
						<td class="l">Cesantías: </td>
						<td class="r">{{Afiliaciones.cesantias}}</td>
					</tr>
					<tr>
						<td class="l">Caja: </td>
						<td class="r">{{Afiliaciones.caja}}</td>
					</tr>
					<tr>
						<td class="l">Banco: </td>
						<td class="r">{{Afiliaciones.banco}}</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="infoPagos">
			<table id="tabledata" width="100%">
				<tr>
					<th>CONCEPTO</th>
					<th>DESCRIPCIÓN</th>
					<th>CANTIDAD</th>
					<th>DEVENGADOS</th>
					<th>DEDUCIDOS</th>
				</tr>
				<tr ng-repeat="reg in Conceptos">
					<td>{{reg.concepto}}</td>
					<td>{{reg.descripcion}}</td>
					<td>{{reg.cantidad}}</td>
					<td>{{reg.valordev}}</td>
					<td>{{reg.valorded}}</td>
				</tr>
				<tr>
					<td class="l totaltxt" colspan="3">TOTAL</td>
					<td class="totaltxt" style="text-align: center;">{{totalesDev}}</td>
					<td class="totaltxt" style="text-align: center;">{{totalesDed}}</td>
				</tr>
				<tr>
					<td class="l totaltxt" colspan="3" >NETO A PAGAR</td>
					<td class="totaltxt" colspan="2" style="text-align: center;">{{Totales.totales[0].neto}}</td>
				</tr>
			</table>
		</div>
		<div class="totalletras">
			<p id="valorletra">{{Totales.totales[0].letras}}</p>
		</div>
	</body>
</html>